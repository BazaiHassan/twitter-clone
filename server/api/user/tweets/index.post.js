import formidable from "formidable";
import { craeteMediaFile } from "~/server/db/mediaFiles";
import { createTweet } from "~/server/db/tweets";
import { tweetTransformer } from "~/server/transformers/tweet";

export default defineEventHandler(async (event) => {
  const form = formidable({});

  const response = await new Promise((resolve, reject) => {
    form.parse(event.node.req, (err, fields, files) => {
      if (err) {
        reject(err);
      }
      resolve({ fields, files });
    });
  });

  const { fields, files } = response;

  const userId = event.context?.auth?.user?.id;

  const tweetData = {
    text: Array.isArray(fields.text) ? fields.text.join(" ") : fields.text, // I used chatgpt to fix this part
    authorId: userId,
  };

  const tweet = await createTweet(tweetData);

  // Create MediaFile
  const filePromises = Object.keys(files).map(async (key) => {

    const file = files[key]

    const cloudinaryResource =await uploadToCloudinary(file.filePath)


    return craeteMediaFile({
      url: cloudinaryResource.secure_url,
      providerPublicId: cloudinaryResource.public_id,
      userId: userId,
      tweetId: tweet.id,
    });
  });

  await Promise.all(filePromises)

  return {
    tweet: tweetTransformer(tweet),
  };
});

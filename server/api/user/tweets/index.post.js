import formidable from "formidable";
import { craeteMediaFile } from "~/server/db/mediaFiles";
import { createTweet } from "~/server/db/tweets";
import { tweetTransformer } from "~/server/transformers/tweet";

export default defineEventHandler(async (event) => {
  // Initialize formidable with options
  const form = formidable({
    multiples: true, // Enable multiple file uploads if needed
    keepExtensions: true,
  });

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
    text: Array.isArray(fields.text) ? fields.text.join(" ") : fields.text,
    authorId: userId,
  };

  // Fix replyTo handling
  const replyTo = Array.isArray(fields.replyTo) ? fields.replyTo[0] : fields.replyTo;
  
  // Clean and validate replyTo value
  if (replyTo && replyTo !== 'null' && replyTo !== 'undefined') {
    // Remove any quotes and trim whitespace
    const cleanReplyToId = replyTo.replace(/['"]+/g, '').trim();
    if (cleanReplyToId) {
      tweetData.replyToId = cleanReplyToId;
    }
  }

  const tweet = await createTweet(tweetData);

  // Handle files correctly
  const filePromises = Object.values(files).map(async (fileArray) => {
    // In newer versions of formidable, files are always returned in an array
    const file = Array.isArray(fileArray) ? fileArray[0] : fileArray;

    if (!file) {
      console.log("No file found in the request");
      return null;
    }

    try {
      const cloudinaryResource = await uploadToCloudinary(file.filepath);

      return await craeteMediaFile({
        url: cloudinaryResource.secure_url,
        providerPublicId: cloudinaryResource.public_id,
        userId: userId,
        tweetId: tweet.id,
      });
    } catch (error) {
      console.error("Error processing file:", error);
      throw error;
    }
  });

  await Promise.all(filePromises);

  return {
    tweet: tweetTransformer(tweet),
  };
});

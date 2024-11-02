import { sendError } from "h3";
import { getUserByUsername } from "~/server/db/users";
import bcrypt from "bcrypt";
import { generateTokens, sendRefreshToken } from "~/server/utils/jwt";
import { userTransformer } from "~/server/transformers/user";
import { createRefreshToken } from "~/server/db/refreshToken";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  const { username, password } = body;

  // Validation
  if (!username || !password) {
    return sendError(
      event,
      createError({
        statusCode: 400,
        statusMessage: "Invalid params",
      })
    );
  }

  // step.1 Check if the email is in db
  const user = await getUserByUsername(username);

  if (!user) {
    return sendError(
      event,
      createError({
        statusCode: 400,
        statusMessage: "Username or Password is invalid!",
      })
    );
  }
  // step.2 Check the password is match
  const checkPasswordsAreMatched = await bcrypt.compare(
    password,
    user.password
  );

  if(!checkPasswordsAreMatched){
    return sendError(
        event,
        createError({
          statusCode: 400,
          statusMessage: "Passwords do not match!",
        })
      );
  }

  // step.3 Generate token
  const { accessToken, refreshToken } = generateTokens(user);

  // step.4 save refresh_token in db
  await createRefreshToken({
    token:refreshToken,
    userId:user.id
  })

  // step.5 add http only cookie
  sendRefreshToken(event, refreshToken)


  return { access_token:accessToken, user:userTransformer(user) };
});

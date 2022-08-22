import { APIGatewaySimpleAuthorizerResult, APIGatewayRequestAuthorizerEventV2 } from 'aws-lambda';

export const main = async (
  event: APIGatewayRequestAuthorizerEventV2
): Promise<APIGatewaySimpleAuthorizerResult> => {
  const { headers } = event;

  let isAuthorized = false;

  try {
    const encodedCredentials = headers.authorization.split(' ')[1];
    const buffer = Buffer.from(encodedCredentials, 'base64');
    const [username, password] = buffer.toString('utf-8').split(':');
    if (username && password) {
      isAuthorized = process.env[username] === password;
    }
  } catch (e) {
    console.log(e);
  }

  return {
    isAuthorized,
  };
};

/**
 * Configuration used for the Cognito UserPool
 */
import Config from "react-native-config";

export const cognitoAuthConfig = {
    // REQUIRED - Amazon Cognito Region
    region: Config['COGNITO_REGION'],
    userPoolId: Config['USER_POOL_ID'],
    userPoolWebClientId: Config['CLIENT_ID']
};
import { Amplify } from 'aws-amplify';
import { AuthProvider } from '@kubo-dev/kubo-auth';
import AppRoutes from "../routes/MainNavigation";

const cognitoAuthConfig = {
  // REQUIRED - Amazon Cognito Region
  region: "us-east-2",
  userPoolId: "us-east-2_5l0QFRJaO",
  userPoolWebClientId: "3f3iedsrc6fn92aul1umjvlstd"
};

Amplify.configure({
  Auth: cognitoAuthConfig
});

export function App() {
  return (
    <AuthProvider>
      <AppRoutes />
    </AuthProvider>
  );
}

export default App;

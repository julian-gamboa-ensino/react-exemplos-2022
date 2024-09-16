import { Authenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css'

const CognitoLogin = () => {
  return (
    <Authenticator>
      {({ signOut, user }) => (
        user ? (
          <div>
            <h1>Olá, {user.username}</h1>
            <button onClick={signOut}>Sair</button>
          </div>
        ) : (
          <div>Faça login para continuar</div>
        )
      )}
    </Authenticator>
  );
};

export default CognitoLogin;


import { Amplify } from 'aws-amplify';
import { Authenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css'
import awsconfig from '../../../aws-exports';

import { getCurrentUser } from 'aws-amplify/auth';
import { fetchAuthSession } from 'aws-amplify/auth';

Amplify.configure(awsconfig);

async function currentSession() {
    try {
      const { tokens } = await fetchAuthSession({ forceRefresh: true });
      console.log(tokens);
    } catch (err) {
      console.log(err);
    }
  }

async function currentAuthenticatedUser() {
    try {
      const { username, userId, signInDetails } = await getCurrentUser();
      console.log(`The username: ${username}`);
      console.log(`The userId: ${userId}`);
      console.log(`The signInDetails: ${signInDetails}`);
    } catch (err) {
      console.log(err);
    }
  }

const CognitoLogin = () => {
    return (
        <Authenticator>
            {({ signOut, user }) => {
                if (user) {
                    // Inspecionar o objeto completo
                    console.log("User object:", user);

                    // Verificar propriedades principais do objeto
                    console.log("Username:", user.username);
                    console.log("User ID:", user.userId);
                    console.log("Sign-in Details:", user.signInDetails);

                    //currentAuthenticatedUser();
                    currentSession();
                }

                

                return user ? (
                    <div>
                        <h1>Olá, {user.username}</h1>
                        <button onClick={signOut}>Sair</button>
                    </div>
                ) : (
                    <div>Faça login para continuar</div>
                );
            }}
        </Authenticator>
    );
};

export default CognitoLogin;

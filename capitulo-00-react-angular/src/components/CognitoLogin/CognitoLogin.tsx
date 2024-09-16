import { Amplify } from 'aws-amplify';
import { Authenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css'
import awsconfig from '../../../aws-exports';   

Amplify.configure(awsconfig);

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


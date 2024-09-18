import { useEffect } from 'react';
import { Amplify } from 'aws-amplify';
import { Authenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css'
import awsconfig from '../../../aws-exports';

import { fetchAuthSession } from 'aws-amplify/auth';

Amplify.configure(awsconfig);

async function currentSession() {
    try {
        const { tokens } = await fetchAuthSession({ forceRefresh: true });
        console.log(tokens?.accessToken);
    } catch (err) {
        console.log(err);
    }
}


const CognitoLogin = () => {


    useEffect(() => {
        currentSession();
    }, []);

    return (
        <Authenticator>
            {({ signOut, user }) => {
                if (user) {


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

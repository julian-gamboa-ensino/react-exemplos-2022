import { useEffect, useState } from 'react';

import Certificado from './models/Certificados';
import ListaDeCertficados from './SubComponents/ListaDeProdutos';
import MensagemDeErro from './SubComponents/MensagemDeErro';
import LoadingSpinner from './SubComponents/LoadingSpinner';
import { buscarCertificados } from './services/buscarCertficados';

import styles from './CvReactSetembro2024.module.css';

function CvReactSetembro2024() {

    const [certificados, setProdutos] = useState<Certificado[]>([]);

    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);


    useEffect(() => {
        setIsLoading(true);

        buscarCertificados()
            .then(data => {
                setProdutos(data);
                setIsLoading(false);
            })
            .catch(error => {
                console.error('Erro ao buscar dados:', error);
                setError(error);
                setIsLoading(false);
            });
    }, []);

    return (
        <div >
            <h2 className={styles.titulo} >
                Certificados
            </h2>

            {isLoading && <LoadingSpinner />}

            {error && <MensagemDeErro error={error} />}

            {!isLoading && !error && (
                <ListaDeCertficados
                produtos={certificados}
                />
            )}


        </div>
    );
}


export default CvReactSetembro2024;
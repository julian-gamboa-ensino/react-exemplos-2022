import { useEffect, useState } from 'react';

import Certificado from '../models/Certificados';
import ListaDeCertficados from '../CommonComponents/ListaDeCertificados';
import MensagemDeErro from '../CommonComponents/MensagemDeErro';
import LoadingSpinner from '../CommonComponents/LoadingSpinner';
import { buscarCertificados } from '../services/BootCampCertificatesAPiFecth';


function BootcampCertificates() {

    const [certificados, setCertificados] = useState<Certificado[]>([]);

    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);


    useEffect(() => {
        setIsLoading(true);

        buscarCertificados()
            .then(data => {
                setCertificados(data);
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


            {isLoading && <LoadingSpinner />}

            {error && <MensagemDeErro error={error} />}



            {!isLoading && !error && (

                <ListaDeCertficados
                    certificados={certificados} 
                    title='Bootcamps'
                />

            )}


        </div>
    );
}


export default BootcampCertificates;
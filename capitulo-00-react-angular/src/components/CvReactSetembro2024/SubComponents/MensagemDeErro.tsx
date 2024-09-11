
interface MensagemDeErroProps {
  error: Error;
}

const MensagemDeErro: React.FC<MensagemDeErroProps> = ({ error }) => {
  return (
    <p>
      Ocorreu um erro ao carregar os Certificados. 
      
      Por favor, verifique sua conexão
      com a internet e tente novamente. Detalhes do erro: {error.message}
    </p>
  );
};

export default MensagemDeErro;
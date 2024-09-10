import { useEffect, useState } from 'react';

export default function ListandoApi() {

  const [dados, setDados] = useState<{ id: number; title: string }[]>([]); 
  
  const [isLoading, setIsLoading] = useState(true); // Indicador de carregamento
  
  const [error, setError] = useState<Error | null>(null); 



  useEffect(() => {
    setIsLoading(true); // Inicia o carregamento

    fetch('http://localhost:3000/posts')
      .then(response => response.json())
      .then(data => {
        setDados(data);
        setIsLoading(false); // Finaliza o carregamento
      })
      .catch(error => {
        console.error('Erro ao buscar dados:', error);
        setError(error); // Define o erro
        setIsLoading(false); // Finaliza o carregamento
      });
  }, []);

  return (
    <div>
      <h1>Listando dados da API (local)</h1>

      {isLoading && <p>Carregando...</p>} {/* Indicador de carregamento */}

      {error && <p>Ocorreu um erro: {error.message}</p>} {/* Mensagem de erro */}

      {!isLoading && !error && ( 
        <ul> {/* Lista de dados */}
          {dados.map(item => (
            <li key={item.id}>{item.title}</li>
          ))}
        </ul>
      )}
    </div>
  );
}
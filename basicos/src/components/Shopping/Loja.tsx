import { useEffect, useState } from 'react';

import Produto from './models/Produto'
import ListaDeProdutos from './SubComponents/ListaDeProdutos';
import CarrinhoDeCompras from './SubComponents/CarrinhoDeCompras';
import MensagemDeErro from './SubComponents/MensagemDeErro';
import LoadingSpinner from './SubComponents/LoadingSpinner';



function Loja() {

    const [produtos, setProdutos] = useState<Produto[]>([]);
    const [carrinho, setCarrinho] = useState<Produto[]>([]);
    const [isLoading, setIsLoading] = useState(true); 
    const [error, setError] = useState<Error | null>(null);

    const adicionarAoCarrinho = (produto: Produto) => {
        setCarrinho([...carrinho, produto]);
    };

    useEffect(() => {
        setIsLoading(true); // Inicia o carregamento

        fetch('http://localhost:3000/produtos')
            .then(response => response.json())
            .then(data => {
                setProdutos(data);
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
            <h2>Produtos</h2>

            {isLoading && <LoadingSpinner />}

            {error && <MensagemDeErro error={error} />}

            {!isLoading && !error && (
                <ListaDeProdutos
                    produtos={produtos}
                    onAdicionarAoCarrinho={adicionarAoCarrinho}
                />
            )}

            <h2>Carrinho de Compras</h2>
            <CarrinhoDeCompras carrinho={carrinho} /> {/* Passa o carrinho para o componente */}        </div>
    );
}

export default Loja;
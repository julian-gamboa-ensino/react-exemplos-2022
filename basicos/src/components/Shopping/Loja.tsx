import { useEffect, useState } from 'react';

import Produto from './models/Produto'
import ListaDeProdutos from './SubComponents/ListaDeProdutos';
import CarrinhoDeCompras from './SubComponents/CarrinhoDeCompras';
import MensagemDeErro from './SubComponents/MensagemDeErro';
import LoadingSpinner from './SubComponents/LoadingSpinner';

import {buscarProdutos} from './services/buscarProdutos';

import styles from './Loja.module.css';

function Loja() {

    const [produtos, setProdutos] = useState<Produto[]>([]);
    const [carrinho, setCarrinho] = useState<Produto[]>([]);

    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    const adicionarAoCarrinho = (produto: Produto) => {
        setCarrinho([...carrinho, produto]);
    };

    const removerDoCarrinho = (produto: Produto) => {
        setCarrinho(carrinho.filter((item) => item.id !== produto.id));
    };

    useEffect(() => {
        setIsLoading(true);
      
        buscarProdutos()
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
                Produtos
            </h2>

            {isLoading && <LoadingSpinner />}

            {error && <MensagemDeErro error={error} />}

            {!isLoading && !error && (
                <ListaDeProdutos
                    produtos={produtos}
                    onAdicionarAoCarrinho={adicionarAoCarrinho}
                />
            )}

            <h2>Carrinho de Compras</h2>
            <CarrinhoDeCompras
                carrinho={carrinho}
                onRemoverDoCarrinho={removerDoCarrinho}
            />         </div>
    );
}

export default Loja;
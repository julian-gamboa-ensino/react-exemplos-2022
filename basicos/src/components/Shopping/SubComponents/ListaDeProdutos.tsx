import Produto from '../models/Produto'
import styles from './ListaDeProdutos.module.css';
import { List, ListItem, ListItemText, Button, Link } from '@mui/material';

interface ListaDeProdutosProps {
  produtos: Produto[];
  onAdicionarAoCarrinho: (produto: Produto) => void;
}

const ListaDeProdutos: React.FC<ListaDeProdutosProps> = ({ produtos, onAdicionarAoCarrinho }) => {
  return (
    <List component="ul" className={styles.lista}>
      {produtos.map((produto) => (
        <ListItem
          key={produto.id}
          component="li" //ListaDeProdutos.module.css
          className={styles.item} // ListaDeProdutos.module.css
        >


          <ListItemText
            primary={
              <Link href={`/produto/${produto.id}`} underline="hover">
                {produto.nome}
              </Link>
            }
            secondary={`R$ ${produto.preco.toFixed(2)}`}
          />
          <Button variant="contained" color="primary" onClick={() => onAdicionarAoCarrinho(produto)}>
            Adicionar ao Carrinho
          </Button>
        </ListItem>
      ))}
    </List>
  );
};

export default ListaDeProdutos;
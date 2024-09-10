import Produto from '../models/Produto';
import styles from './ListaDeProdutos.module.css';
import { List, ListItem, ListItemText, Button, Link, Grid } from '@mui/material';

interface ListaDeProdutosProps {
  produtos: Produto[];
  onAdicionarAoCarrinho: (produto: Produto) => void;
}

const ListaDeProdutos: React.FC<ListaDeProdutosProps> = ({ produtos, onAdicionarAoCarrinho }) => {
  return (
    <List component="ul" className={styles.lista}>
      {produtos.map((produto) => (
        <ListItem key={produto.id} component="li" className={styles.item}>
          <Grid container alignItems="center" spacing={2}> {/* Usando Grid para melhor layout */}
            <Grid item xs={8}> {/* Nome do produto ocupa mais espaço */}  
              <ListItemText
                primary={
                  <Link href={`/produto/${produto.id}`} underline="hover">
                    {produto.nome}
                  </Link>
                }
                secondary={`R$ ${produto.preco.toFixed(2)}`}
              />
            </Grid>
            <Grid item xs={4}> {/* Botão alinhado à direita */}
              <Button 
                variant="contained" 
                color="primary" 
                onClick={() => onAdicionarAoCarrinho(produto)}
                fullWidth  // Botão ocupa toda a largura da coluna
              >
                Adicionar ao Carrinho
              </Button>
            </Grid>
          </Grid>
        </ListItem>
      ))}
    </List>
  );
};

export default ListaDeProdutos;
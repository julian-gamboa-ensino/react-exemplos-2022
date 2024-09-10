import Produto from '../models/Produto';
import { Button,List, ListItem, ListItemText, Typography } from '@mui/material';

interface CarrinhoDeComprasProps {
  carrinho: Produto[];
  onRemoverDoCarrinho: (produto: Produto) => void; 
}

const CarrinhoDeCompras: React.FC<CarrinhoDeComprasProps> = ({ carrinho,onRemoverDoCarrinho }) => {
  const calcularTotal = () => {
    return carrinho.reduce((total, item) => total + item.preco, 0).toFixed(2);
  };
  return (
    <div>
      <Typography variant="h6">Carrinho de Compras</Typography>
      {carrinho.length === 0 && <p>Seu carrinho está vazio.</p>}
      {carrinho.length > 0 && (
        <List>
          {carrinho.map((item) => (
            <ListItem key={item.id}>
              <ListItemText
                primary={item.nome}
                secondary={`R$ ${item.preco.toFixed(2)}`}
              />
              <Button onClick={() => onRemoverDoCarrinho(item)}>Remover</Button>
            </ListItem>
          ))}
          <Typography variant="subtitle1">
            Total: R$ {calcularTotal()}
          </Typography>

        </List>
      )}
    </div>
  );
};

export default CarrinhoDeCompras;

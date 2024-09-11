import Certificado from '../models/Certificados';
import styles from './ListaDeCertificados.module.css';
import { List, ListItem, ListItemText,  Link } from '@mui/material';

interface ListaDeProdutosProps {
  produtos: Certificado[];
}

const ListaDeProdutos: React.FC<ListaDeProdutosProps> = ({ produtos }) => {
  return (
    <List component="ul" className={styles.lista}>
      {produtos.map((produto) => (
        <ListItem key={produto.id} component="li" className={styles.item} alignItems="center">
              <ListItemText
                primary={
                  <Link href={`${produto.url}`} underline="hover" target="_blank" >
                    {produto.title}
                  </Link>
                }
              />
        </ListItem>
      ))}
    </List>
  );
};

export default ListaDeProdutos;
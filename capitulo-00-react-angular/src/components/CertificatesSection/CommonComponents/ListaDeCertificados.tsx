import Certificado from '../models/Certificados';
import styles from './ListaDeCertificados.module.css';
import { List, ListItem, ListItemText, Link } from '@mui/material';

interface ListaDeCertificadosProps {
  certificados: Certificado[];
  title: string;
}

const ListaDeCertificados: React.FC<ListaDeCertificadosProps> = ({ certificados: certificados, title }) => {
  return (
    <details>

      <summary className={styles.titulo}
      >
        <h2>          {title} </h2>
      </summary>
      <List component="ul" className={styles.lista}>
        {certificados.map((certificado) => (
          <ListItem key={certificado.id} component="li" className={styles.item} alignItems="center">
            <ListItemText
              primary={
                <Link href={`${certificado.url}`} underline="hover" target="_blank" >
                  {certificado.title}
                </Link>
              }
            />
          </ListItem>
        ))}
      </List>
    </details>
  );
};

export default ListaDeCertificados;
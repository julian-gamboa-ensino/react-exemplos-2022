import Avatar from '@mui/material/Avatar';
import Grid from '@mui/material/Grid';


interface BasicInfoProps {
  name: string;
  email: string;
  linkedinUrl: string;
  gitUrl: string;
  photoUrl:string;
}

const BasicInfo: React.FC<BasicInfoProps> = ({ name, email, linkedinUrl, gitUrl,photoUrl }) => {
  return (
      <Grid container spacing={2} alignItems="center"> {/* Use Grid container */}
        <Grid item xs={12} sm={4}> {/* Avatar column */}
          <Avatar
            alt={name}
            src={photoUrl} 
            sx={{ width: 150, height: 150 }} 
          />
        </Grid>
        <Grid item xs={12} sm={8}> {/* Info column */}
          <h2>{name}</h2>
          <p><a href={`mailto:${email}`}>{email}</a></p>
          <p><a href={linkedinUrl} target="_blank" rel="noopener noreferrer">LinkedIn</a></p>
          <p><a href={gitUrl} target="_blank" rel="noopener noreferrer">Github</a></p>
        </Grid>
      </Grid>
    );  
};

export default BasicInfo;
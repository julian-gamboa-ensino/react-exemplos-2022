import AllCertificates from './AllCertificates/AllCertificates';
import BootcampCertificates from './BootcampCertificates/BootcampCertificates';
import Grid from '@mui/material/Grid';

function CertificatesSection() {
  return (
    <Grid container spacing={2}> {/* Remove justifyContent from here */}
      {/* First Row */}
      <Grid item xs={12} >
        <AllCertificates />
      </Grid>      

      {/* Second Row */}
      <Grid item xs={12}> {/* This will take the full width on all screen sizes */}
        <BootcampCertificates />
      </Grid>
    </Grid>
  );
}

export default CertificatesSection;

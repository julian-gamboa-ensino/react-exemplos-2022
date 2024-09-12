import BasicInfo from './components/BasicInfo/BasicInfo';
import CertificatesSection from './components/CertificatesSection/CertificatesSection';

import Grid from '@mui/material/Grid';

function App() {
  return (
    <Grid container spacing={2} justifyContent="space-between"> 
      <Grid item xs={12} sm={6}> 
        <BasicInfo
          name="Julian Gamboa"
          email="julian.gamboa.ms.2021@gmail.com"
          linkedinUrl="https://www.linkedin.com/in/julian-gamboa-bahia/"
          gitUrl="https://github.com/julian-gamboa-ensino/"
          photoUrl="https://avatars.githubusercontent.com/u/35019237?v=4"
        />
      </Grid>
      <Grid item xs={12} sm={3}> {/* Use the same width as the first column */}
        <CertificatesSection />
      </Grid>
    </Grid>
  );
}

export default App;

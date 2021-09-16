import { Grid } from "@mui/material";
import MainLayout from "../src/layout/MainLayout/MainLayout";

const AboutPage = () => {
  return (
    <Grid container>
      <Grid item xs={12}>
        About me
      </Grid>
    </Grid>
  );
};

AboutPage.getLayout = (page) => {
  return <MainLayout>{page}</MainLayout>;
};

export default AboutPage;

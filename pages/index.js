import { Grid } from "@mui/material";
import Head from "next/head";
import BlogEditor from "../src/components/BlogEditor/BlogEditor";
import MainLayout from "../src/layout/MainLayout/MainLayout";

const HomePage = () => {
  return (
    <>
      <Head>
        <title key="title">Home</title>
      </Head>

      <Grid container>
        <Grid item xs={12}>
          <BlogEditor />
        </Grid>
      </Grid>
    </>
  );
};

HomePage.getLayout = (page) => {
  return <MainLayout>{page}</MainLayout>;
};

export default HomePage;

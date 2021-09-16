import { Grid } from "@mui/material";
import Head from "next/head";
import BlogEditor from "../src/components/BlogEditor/BlogEditor";
import MainLayout from "../src/layout/MainLayout/MainLayout";

const SubscriptionsPage = () => {
  return (
    <>
      <Head>
        <title key="title">Subscriptions</title>
      </Head>

      <Grid container>
        <Grid item xs={12}>
          <BlogEditor />
        </Grid>
      </Grid>
    </>
  );
};

SubscriptionsPage.getLayout = (page) => {
  return <MainLayout>{page}</MainLayout>;
};

export default SubscriptionsPage;

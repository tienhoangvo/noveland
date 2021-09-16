// mui components
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

// mui icons
import FacebookIcon from "@mui/icons-material/Facebook";
import GoogleIcon from "@mui/icons-material/Google";
import TwitterIcon from "@mui/icons-material/Twitter";

// custom
import MainLayout from "../src/layout/MainLayout/MainLayout";

const LoginPage = () => {
  return (
    <Stack justifyContent="center">
      <Container maxWidth="xs" sx={{ textAlign: "center" }}>
        <Stack spacing={2}>
          {" "}
          <Typography variant="h3" component="h1">
            Login
          </Typography>
          <Button
            size="large"
            variant="outlined"
            color="primary"
            startIcon={<GoogleIcon />}
            fullWidth
            component="a"
            href="/api/auth/google"
            sx={{
              color: (theme) => theme.palette.google,
              borderColor: (theme) => theme.palette.google,
            }}
          >
            Continue with Google
          </Button>
          <Button
            size="large"
            variant="outlined"
            color="primary"
            startIcon={<FacebookIcon />}
            fullWidth
            component="a"
            href="/api/auth/facebook"
            sx={{
              color: (theme) => theme.palette.facebook,
              borderColor: (theme) => theme.palette.facebook,
            }}
          >
            Continue with Facebook
          </Button>
          <Button
            size="large"
            variant="outlined"
            color="primary"
            startIcon={<TwitterIcon />}
            fullWidth
            component="a"
            href="/api/auth/twitter"
            sx={{
              color: (theme) => theme.palette.twitter,
              borderColor: (theme) => theme.palette.twitter,
            }}
            disabled
          >
            Continue with Twitter
          </Button>
        </Stack>
      </Container>
    </Stack>
  );
};

LoginPage.getLayout = (page) => <MainLayout>{page}</MainLayout>;

export default LoginPage;

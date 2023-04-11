import {
  Facebook as FacebookIcon,
  Google as GoogleIcon,
  Visibility,
  VisibilityOff,
} from "@mui/icons-material";
import {
  Box,
  Button,
  CircularProgress,
  Divider,
  IconButton,
  InputAdornment,
  Link as MuiLink,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { Form, FormikProvider, useFormik } from "formik";
import { useTranslation } from "next-i18next";
import React from "react";
import type { LoginRequest } from "types/auth";
import getErrorProps from "utils/getErrorProps";
import * as Yup from "yup";

import { Logo } from "components/common/Logo";
import { FirebaseError } from "firebase/app";
import {
  getAuth,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import Link from "next/link";
import { useRouter } from "next/router";
import { toast } from "react-hot-toast";
import { googleProvider } from "utils/firebase";

export const UserLogin = () => {
  const { t } = useTranslation("common");
  const [showPassword, setShowPassword] = React.useState<boolean>(false);
  const router = useRouter();

  const formik = useFormik<LoginRequest>({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object().shape({
      email: Yup.string()
        .email("Please enter a valid email")
        .required("Please enter email"),
      password: Yup.string()
        .required("Please enter password")
        .min(8, "Password must be minimum 8 characters"),
    }) as Yup.SchemaOf<LoginRequest>,
    onSubmit: async (values, actions) => {
      actions.setSubmitting(true);
      try {
        await signInWithEmailAndPassword(
          getAuth(),
          values.email,
          values.password
        );
        router.replace(
          router.query.redirect ? (router.query.redirect as string) : "/"
        );
      } catch (error: unknown) {
        const errorMessage =
          error instanceof FirebaseError && error.code === "auth/wrong-password"
            ? "Incorrect email and/or password"
            : "Something went wrong";

        toast.error(errorMessage);
      }
    },
    validateOnMount: true,
  });

  const googleSignIn = () => {
    const auth = getAuth();
    signInWithPopup(auth, googleProvider)
      .then(() => {
        router.replace(
          router.query.redirect ? (router.query.redirect as string) : "/"
        );
      })
      .catch(() => {
        toast.error("Something went wrong");
      });
  };

  return (
    <FormikProvider value={formik}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100%",
        }}
      >
        <Box component={Form} width={371}>
          <Stack gap={3}>
            <Box display="flex" justifyContent="center">
              <Logo />
            </Box>
            <Typography variant="h4" color="text.secondary" textAlign="center">
              {t("Login")}
            </Typography>
            <Box display="flex" gap={2}>
              <Button
                fullWidth
                onClick={() => googleSignIn()}
                startIcon={<GoogleIcon />}
              >
                Google
              </Button>
              <Button fullWidth startIcon={<FacebookIcon />}>
                Facebook
              </Button>
            </Box>
            <Box display="flex" alignItems="center" gap={1}>
              <Divider sx={{ flex: 1 }} />
              <Typography fontWeight={500} color="text.secondary">
                Or
              </Typography>
              <Divider sx={{ flex: 1 }} />
            </Box>
            <TextField
              size="small"
              {...formik.getFieldProps("email")}
              {...getErrorProps(formik, "email")}
              label="Email"
              type="email"
            />
            <TextField
              size="small"
              {...formik.getFieldProps("password")}
              {...getErrorProps(formik, "password")}
              label="Password"
              type={showPassword ? "text" : "password"}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowPassword((prev) => !prev)}
                    >
                      {showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <Button
              type="submit"
              disabled={formik.isSubmitting || !formik.isValid}
              color="primary"
            >
              {formik.isSubmitting ? <CircularProgress /> : "Login"}
            </Button>
          </Stack>
          <Typography mt={1} variant="caption" color="text.secondary">
            Still don&apos;t have an account?{" "}
            <MuiLink underline="none" component={Link} href="/register">
              Register
            </MuiLink>
          </Typography>
        </Box>
      </Box>
    </FormikProvider>
  );
};

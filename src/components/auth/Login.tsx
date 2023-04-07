import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  Box,
  Button,
  CircularProgress,
  IconButton,
  InputAdornment,
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
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import Router from "next/router";
import { toast } from "react-hot-toast";

export const Login = () => {
  const { t } = useTranslation("common");
  const [showPassword, setShowPassword] = React.useState<boolean>(false);

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
        Router.push("/admin");
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
              {t("Admin Login")}
            </Typography>
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
        </Box>
      </Box>
    </FormikProvider>
  );
};

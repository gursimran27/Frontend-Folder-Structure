import { yupResolver } from "@hookform/resolvers/yup";
import {
  Box,
  Button,
  Card,
  CardContent,
  TextField,
  Theme,
  Typography,
  useTheme,
} from "@mui/material";
import { createStyles } from "@mui/styles";
import { CSSProperties } from "react";
import { useForm } from "react-hook-form";
import { NavLink, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import * as yup from "yup";
import { useRegisterMutation } from "../services/api";
import PasswordInput from "./PasswordInput";
import { motion } from "motion/react";

const validation = yup.object({
  email: yup.string().email("Email is invalid").required("Email is required"),
  password: yup
    .string()
    .required("Password is required")
    .min(5, "Minimumn 5 chars are required")
    .max(16, "Miximumn 16 chars allowed"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password")], "Passwords must match")
    .required("Comfirm password is required"),
  name: yup.string().required("Name is required"),
});

const useStyle = (theme: Theme) =>
  createStyles({
    root: {
      maxWidth: 400,
      flex: 1,
      mx: "auto",
    },
    input: {
      mt: 2,
    },
    button: {
      my: 2,
    },
    link: {
      color: theme.palette.primary.main,
    },
  });

type FormData = typeof validation.__outputType;

export default function SignupForm() {
  const theme = useTheme();
  const style = useStyle(theme);
  const [registerUser, { isLoading }] = useRegisterMutation();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<FormData>({
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
    resolver: yupResolver(validation),
  });

  const onSubmit = async (data: FormData) => {
    const id = toast.loading("loading...");
    try {
      await registerUser(data).unwrap();
      toast.dismiss(id);
      toast.success("User register successfully!");
      navigate("/");
    } catch (error: any) {
      const validationError = error?.data?.data?.errors?.[0].msg;
      toast.dismiss(id);
      toast.error(
        validationError ?? error?.data?.message ?? "Something went wrong!"
      );
    }
  };

  return (
    <Box
      height="100vh"
      width="100vw"
      display="flex"
      justifyContent="center"
      alignItems="center"
    >
      <motion.div
        initial={{ opacity: 0, y: -100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        style={{ width: "100%" }}
      >
        <Card variant="outlined" sx={style.root}>
          <CardContent>
            <Box component="form" onSubmit={handleSubmit(onSubmit)}>
              <Box>
                <Typography variant="h4" component="h1">
                  <b>Signup</b>
                </Typography>
              </Box>
              <motion.div
                initial={{ opacity: 0, y: -100 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <TextField
                  sx={style.input}
                  fullWidth
                  type="text"
                  placeholder="Name"
                  label="Name"
                  {...register("name")}
                  error={Boolean(errors.name?.message)}
                  helperText={errors.name?.message}
                />
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: -100 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                <TextField
                  sx={style.input}
                  fullWidth
                  type="text"
                  placeholder="Email"
                  label="Email"
                  {...register("email")}
                  error={Boolean(errors.email?.message)}
                  helperText={errors.email?.message}
                />
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: -100 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
              >
                <PasswordInput
                  sx={style.input}
                  fullWidth
                  type="password"
                  placeholder="password"
                  label="Password"
                  error={Boolean(errors.password?.message)}
                  helperText={errors.password?.message}
                  {...register("password")}
                />
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: -100 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.8 }}
              >
                <PasswordInput
                  sx={style.input}
                  fullWidth
                  type="password"
                  placeholder="Confirm Password"
                  label="Confirm password"
                  error={Boolean(errors.confirmPassword?.message)}
                  helperText={errors.confirmPassword?.message}
                  {...register("confirmPassword")}
                />
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: -100 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.10 }}
              >
                <Button
                  type="submit"
                  sx={style.button}
                  variant="contained"
                  fullWidth
                  disabled={!isValid}
                  loading={isLoading}
                >
                  Signup
                </Button>
              </motion.div>
              <Typography>
                Already have an account?{" "}
                <NavLink style={style.link as CSSProperties} to="/auth">
                  Sign in
                </NavLink>
              </Typography>
            </Box>
          </CardContent>
        </Card>
      </motion.div>
    </Box>
  );
}

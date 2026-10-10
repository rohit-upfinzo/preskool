import {
  Anchor,
  Box,
  Button,
  Checkbox,
  Group,
  LoadingOverlay,
  Paper,
  PasswordInput,
  Stack,
  Text,
  TextInput,
  ThemeIcon,
  Title,
} from "@mantine/core";
import { Link } from "react-router-dom";
import classes from "./Login.module.css";
import { login } from "../../services/authService";
import { useState } from "react";
import { useDisclosure } from "@mantine/hooks";
import { useDispatch, useSelector } from "react-redux";
import { addError, addUser } from "../../redux/slices/userSlice";
import { notifications } from "@mantine/notifications";

const Login = () => {
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });
  const [visible, { open, close }] = useDisclosure(false);

  const dispatch = useDispatch();
  const { error } = useSelector((store) => store.user);

  const handlelogin = async () => {
    open();
    const res = await login(loginData.email, loginData.password);

    if (!res.ok) {
      close();

      dispatch(addError(res?.message));

      return;
    }

    dispatch(addUser(res?.data?.token));
    close();
    notifications.show({
      color: "green",
      title: "Success",
      message: "Login Successfully 🌟",
    });
  };

  return (
    <main className={classes.page}>
      <Group gap="sm" justify="center" className={classes.brand}>
        <ThemeIcon size={36} radius="xl" color="brand.8">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            aria-hidden="true"
          >
            <path
              d="m3 8 9-4 9 4-9 4-9-4Z"
              stroke="currentColor"
              strokeWidth="1.7"
              strokeLinejoin="round"
            />
            <path
              d="M6 10v6c3 3 9 3 12 0v-6M21 8v7"
              stroke="currentColor"
              strokeWidth="1.7"
              strokeLinecap="round"
            />
          </svg>
        </ThemeIcon>
        <Text size="24px" c="brand.8">
          <Text component="span" inherit fw={700}>
            Pre
          </Text>
          Skool
        </Text>
      </Group>
      <Paper
        component="section"
        className={classes.card}
        radius="lg"
        withBorder
        aria-labelledby="login-title"
      >
        <Stack gap={20} pos="relative">
          <LoadingOverlay
            visible={visible}
            zIndex={1000}
            overlayProps={{ radius: "sm", blur: 2 }}
            loaderProps={{ color: "#1E3A8A", type: "bars" }}
          />
          <Box>
            <Title id="login-title" order={1} size={24} c="brand.8" mb={6}>
              Welcome
            </Title>
            <Text c="dimmed" size="sm">
              Please enter your details to sign in
            </Text>
          </Box>
          {/* Add your state and API submit handler here. */}
          <Box component="form" onSubmit={(event) => event.preventDefault()}>
            <Stack gap={16}>
              <TextInput
                label="Email Address"
                name="email"
                type="email"
                autoComplete="username"
                size="sm"
                radius="sm"
                required
                withAsterisk={false}
                classNames={{ input: classes.input, label: classes.label }}
                value={loginData?.email}
                onChange={(e) => {
                  setLoginData({
                    ...loginData,
                    email: e.target.value,
                  });
                }}
                rightSection={
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    aria-hidden="true"
                  >
                    <rect
                      x="3"
                      y="5"
                      width="18"
                      height="14"
                      rx="2"
                      stroke="currentColor"
                      strokeWidth="1.6"
                    />
                    <path
                      d="m4 7 8 6 8-6"
                      stroke="currentColor"
                      strokeWidth="1.6"
                      strokeLinejoin="round"
                    />
                  </svg>
                }
                rightSectionPointerEvents="none"
              />
              <PasswordInput
                label="Password"
                name="password"
                autoComplete="current-password"
                size="sm"
                radius="sm"
                required
                withAsterisk={false}
                classNames={{ input: classes.input, label: classes.label }}
                onChange={(e) => {
                  setLoginData({
                    ...loginData,
                    password: e.target.value,
                  });
                }}
              />
              <Group justify="space-between" gap="sm">
                <Checkbox
                  label="Remember Me"
                  name="rememberMe"
                  size="sm"
                  radius="sm"
                  styles={{ label: { color: "var(--mantine-color-gray-6)" } }}
                />
                <Anchor
                  component={Link}
                  type="button"
                  size="sm"
                  c="brand.8"
                  to="/forget-password"
                >
                  Forgot Password?
                </Anchor>
              </Group>
              <Button
                type="submit"
                fullWidth
                size="sm"
                radius="md"
                className={classes.submit}
                onClick={handlelogin}
              >
                Sign In
              </Button>
              {error && (
                <Text size="sm" style={{ color: "red", textAlign: "center" }}>
                  {error}
                </Text>
              )}
            </Stack>
          </Box>
          {/* <Text ta="center" size="sm" c="brand.8">
            Don't have an account?{" "}
            <Anchor component={Link} to="/signup" size="sm">
              Create Account
            </Anchor>
          </Text> */}
        </Stack>
      </Paper>
      <Text
        component="footer"
        ta="center"
        size="sm"
        c="dimmed"
        className={classes.footer}
      >
        Copyright &copy; {new Date().getFullYear()} - Preskool
      </Text>
    </main>
  );
};

export default Login;

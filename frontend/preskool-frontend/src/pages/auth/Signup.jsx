import {
  Anchor,
  Box,
  Button,
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
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import classes from "./Login.module.css";
import { useState } from "react";
import { signup } from "../../services/authService";
import { notifications } from "@mantine/notifications";
import { useDispatch } from "react-redux";
import { useDisclosure } from "@mantine/hooks";
import { addUser } from "../../redux/slices/userSlice";

const Signup = () => {
  const [userData, setUserData] = useState({
    name: "",
    password: "",
    confirmPassword: "",
  });

  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const email = searchParams.get("email");

  console.log({ token, email });

  const navigate = useNavigate();
  const [visible, { open, close }] = useDisclosure(false);

  const dispatch = useDispatch();

  const handleChange = (e) => {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSignup = async () => {
    open();
    const res = await signup({ ...userData, email, invitedTokenHash: token });
    if (!res.ok) {
      close();
      return;
    }
    close();

    dispatch(addUser(res?.data?.token));
    notifications.show({
      color: "green",
      title: "Success",
      message: "Signup Successfully 🌟",
    });
    navigate("/");
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
        aria-labelledby="signup-title"
      >
        <Stack gap={20}>
          <LoadingOverlay
            visible={visible}
            zIndex={1000}
            overlayProps={{ radius: "sm", blur: 2 }}
            loaderProps={{ color: "#1E3A8A", type: "bars" }}
          />
          <Box>
            <Title id="signup-title" order={1} size={24} c="brand.8" mb={6}>
              Create Account
            </Title>
            <Text c="dimmed" size="sm">
              Enter your details to get started
            </Text>
          </Box>

          {/* Add your state, password validation, and API submit handler here. */}
          <Box component="form" onSubmit={(event) => event.preventDefault()}>
            <Stack gap={16}>
              <TextInput
                label="Name"
                name="name"
                autoComplete="name"
                value={userData.name}
                onChange={handleChange}
                size="sm"
                radius="sm"
                required
                withAsterisk={false}
                classNames={{ input: classes.input, label: classes.label }}
              />
              <TextInput
                label="Email Address"
                name="email"
                type="email"
                autoComplete="email"
                size="sm"
                radius="sm"
                required
                withAsterisk={false}
                value={email}
                disabled={true}
                onChange={handleChange}
                classNames={{ input: classes.input, label: classes.label }}
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
                value={userData.password}
                label="Password"
                name="password"
                autoComplete="new-password"
                size="sm"
                radius="sm"
                required
                withAsterisk={false}
                onChange={handleChange}
                classNames={{ input: classes.input, label: classes.label }}
              />
              <PasswordInput
                label="Confirm Password"
                name="confirmPassword"
                autoComplete="new-password"
                value={userData.confirmPassword}
                size="sm"
                radius="sm"
                required
                withAsterisk={false}
                onChange={handleChange}
                classNames={{ input: classes.input, label: classes.label }}
              />
              <Button
                type="submit"
                fullWidth
                size="sm"
                radius="md"
                className={classes.submit}
                onClick={handleSignup}
              >
                Sign Up
              </Button>
            </Stack>
          </Box>

          <Text ta="center" size="sm" c="brand.8">
            Already have an account?{" "}
            <Anchor component={Link} to="/login" size="sm">
              Sign In
            </Anchor>
          </Text>
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

export default Signup;

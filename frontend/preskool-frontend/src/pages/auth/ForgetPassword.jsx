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
import { Link, Navigate, useNavigate } from "react-router-dom";
import classes from "./Login.module.css";
import {
  login,
  resetPassword,
  sendOtp,
  verifyOtp,
} from "../../services/authService";
import { useState } from "react";
import { useDisclosure } from "@mantine/hooks";
import { useDispatch, useSelector } from "react-redux";
import { addError, addUser } from "../../redux/slices/userSlice";
import { notifications } from "@mantine/notifications";
import OTP from "./OTP";
import ResetPassword from "./ResetPassword";

const ForgetPassword = () => {
  const [email, setEmail] = useState("");

  const [visible, { open, close }] = useDisclosure(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const [isOtpSend, setIsOtpSend] = useState({
    next: localStorage.getItem("next-step") || "send_otp",
    resetToken: "",
  });

  const handleSendOtp = async () => {
    open();
    const res = await sendOtp(email);
    if (!res.ok) {
      console.log("error respons==>", res);

      setError(res.message);
      close();
      return;
    }
    setIsOtpSend({
      ...isOtpSend,
      next: res?.data?.next,
    });
    localStorage.setItem("next-step", res?.data?.next);
    localStorage.setItem("email", email);

    close();
    notifications.show({
      color: "green",
      title: "Success",
      message: "Password Reset Successfully 🌟",
    });
    setError("");
    setEmail("");
    console.log("res==>", res);
  };

  const handleBack = () => {
    setIsOtpSend((prev) => {
      return {
        ...prev,
        next: "send_otp",
      };
    });
    localStorage.removeItem("next-step");
    localStorage.removeItem("email");
    setError("");
  };

  const handleVerifyOtp = async (otp) => {
    const email = localStorage.getItem("email");
    console.log({ otp, email });

    open();
    const res = await verifyOtp({ email, otp });
    if (!res.ok) {
      setError(res.message);
      close();
      return;
    }
    setIsOtpSend({
      ...isOtpSend,
      next: res?.data?.next,
    });
    localStorage.setItem("next-step", res?.data?.next);
    localStorage.setItem("token", res?.data?.token);
    localStorage.removeItem("email");
    // setIsOtpSend((prev)=> {{...prev, next : res?.data?.next}})
    close();
    notifications.show({
      color: "green",
      title: "Success",
      message: "OTP Verified successfully 🌟",
    });
    setError("");
  };

  const handleResetPassword = async (password, confirmPassword) => {
    console.log(password, confirmPassword);

    open();
    const res = await resetPassword({
      password,
      confirmPassword,
      resetToken: localStorage.getItem("token"),
    });
    if (!res.ok) {
      setError(res.message);
      close();
      return;
    }

    localStorage.removeItem("next-step");
    localStorage.removeItem("token");
    localStorage.removeItem("email");
    navigate("/login");
    close();
    notifications.show({
      color: "green",
      title: "Success",
      message: "OTP Verified successfully 🌟",
    });
    setError("");
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

          {(() => {
            switch (isOtpSend.next) {
              case "send_otp":
                return (
                  <>
                    <Box>
                      <Title
                        id="login-title"
                        order={1}
                        size={24}
                        c="brand.8"
                        mb={6}
                      >
                        Forget Password
                      </Title>
                      <Text c="dimmed" size="sm">
                        Please enter your email to send otp
                      </Text>
                    </Box>
                    <Box
                      component="form"
                      onSubmit={(event) => event.preventDefault()}
                    >
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
                          classNames={{
                            input: classes.input,
                            label: classes.label,
                          }}
                          value={email}
                          onChange={(e) => {
                            setEmail(e.target.value);
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
                        {error && (
                          <Text size="sm" style={{ color: "red" }}>
                            {error}
                          </Text>
                        )}
                        <Button
                          type="submit"
                          fullWidth
                          size="sm"
                          radius="md"
                          className={classes.submit}
                          onClick={handleSendOtp}
                        >
                          Submit
                        </Button>
                      </Stack>
                    </Box>
                  </>
                );
              case "verify_otp":
                return (
                  <OTP
                    handleVerifyOtp={handleVerifyOtp}
                    handleBack={handleBack}
                    error={error}
                  />
                );
              case "RESET_PASSWORD":
                return (
                  <ResetPassword
                    handleResetPassword={handleResetPassword}
                    error={error}
                  />
                );
              default:
                return null;
            }
          })()}
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

export default ForgetPassword;

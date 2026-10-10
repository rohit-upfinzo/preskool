import { Box, Button, PasswordInput, Stack, Text, Title } from "@mantine/core";
import classes from "./Login.module.css";
import { useState } from "react";

const ResetPassword = ({ handleResetPassword, error }) => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleUpdatePassword = () => {
    handleResetPassword(password, confirmPassword);
  };

  return (
    <Stack gap={20}>
      <Box>
        <Title id="reset-password-title" order={1} size={24} c="brand.8" mb={6}>
          Reset Password
        </Title>
        <Text c="dimmed" size="sm">
          Enter your new password and confirm it below.
        </Text>
      </Box>

      <Stack gap={16}>
        <PasswordInput
          label="New Password"
          name="newPassword"
          placeholder="Enter new password"
          autoComplete="new-password"
          size="sm"
          radius="sm"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          classNames={{ input: classes.input, label: classes.label }}
        />
        <PasswordInput
          label="Confirm Password"
          name="confirmPassword"
          placeholder="Confirm new password"
          autoComplete="new-password"
          size="sm"
          radius="sm"
          value={confirmPassword}
          onChange={(e) => {
            setConfirmPassword(e.target.value);
          }}
          classNames={{ input: classes.input, label: classes.label }}
        />
        {error && (
          <Text size="sm" style={{ color: "red", textAlign: "center" }}>
            {error}
          </Text>
        )}
        <Button
          type="button"
          fullWidth
          size="sm"
          radius="md"
          onClick={handleUpdatePassword}
          className={classes.submit}
        >
          Reset Password
        </Button>
      </Stack>
    </Stack>
  );
};

export default ResetPassword;

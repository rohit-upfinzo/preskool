import {
  Anchor,
  Box,
  Button,
  Group,
  Paper,
  PinInput,
  Stack,
  Text,
  ThemeIcon,
  Title,
} from "@mantine/core";
import classes from "./Login.module.css";
import { useState } from "react";

const OTP = ({ handleVerifyOtp, handleBack, error }) => {
  const [otp, setOtp] = useState("");

  return (
    <Stack gap={20}>
      <Box>
        <Title id="otp-title" order={1} size={24} c="brand.8" mb={6}>
          Verify OTP
        </Title>
        <Text c="dimmed" size="sm">
          Enter the 6-digit verification code sent to your email address.
        </Text>
      </Box>

      <Stack gap={16}>
        <Text id="otp-label" className={classes.label}>
          Verification Code
        </Text>
        <Group justify="center">
          <PinInput
            value={otp}
            onChange={setOtp}
            name="otp"
            length={6}
            size="sm"
            gap={6}
            radius="sm"
            placeholder=""
            ariaLabel="Verification code digit"
            classNames={{ input: classes.input }}
          />
        </Group>
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
          className={classes.submit}
          onClick={() => {
            handleVerifyOtp(otp);
          }}
        >
          Verify OTP
        </Button>
        {/* <Group justify="center" gap={4}>
          <Text size="sm" c="dimmed">
            Didn't receive the code?
          </Text>
          <Anchor component="button" type="button" size="sm" c="brand.8">
            Resend OTP
          </Anchor>
        </Group> */}
        <Anchor
          component="button"
          type="button"
          size="sm"
          c="brand.8"
          ta="center"
          onClick={handleBack}
        >
          {error == "OTP expired"
            ? "Back to otp send page"
            : "Change email address"}
        </Anchor>
      </Stack>
    </Stack>
  );
};

export default OTP;

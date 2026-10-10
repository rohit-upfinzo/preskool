import client from "../utils/api";
import axios from "axios";

function getErrorMessage(error, fallback) {
  if (axios.isAxiosError(error)) {
    if (error.code === "ECONNABORTED") return "Request timed out";
    return error.response?.data?.message ?? fallback;
  }
  return fallback;
}

export async function login(email, password) {
  try {
    const { data } = await client.post("/user/login", { email, password });
    return { ok: true, data };
  } catch (error) {
    return { ok: false, message: getErrorMessage(error, "Login failed") };
  }
}
export async function signup(data) {
  const { name, email, password, confirmPassword, invitedTokenHash } = data;
  try {
    const { data } = await client.post("/user/signup", {
      name,
      email,
      password,
      confirmPassword,
      invitedTokenHash,
    });
    return { ok: true, data };
  } catch (error) {
    return { ok: false, message: getErrorMessage(error, "Signup failed") };
  }
}

export async function verifyUser() {
  try {
    const { data } = await client.get("/user/verify");
    return { ok: true, data };
  } catch (error) {
    return {
      ok: false,
      message: getErrorMessage(error, "User verificatiion failed"),
    };
  }
}

export async function sendOtp(email) {
  try {
    const { data } = await client.post("/user/send-otp", { email });
    return { ok: true, data };
  } catch (error) {
    return {
      ok: false,
      message: getErrorMessage(error, "User verificatiion failed"),
    };
  }
}

export async function verifyOtp(data) {
  const { email, otp } = data;
  try {
    const { data } = await client.post("/user/verify-otp", { email, otp });
    return { ok: true, data };
  } catch (error) {
    return {
      ok: false,
      message: getErrorMessage(error, "User verificatiion failed"),
    };
  }
}

export async function resetPassword(data) {
  const { resetToken, password, confirmPassword } = data;
  try {
    const { data } = await client.post("/user/reset-password", {
      resetToken,
      password,
      confirmPassword,
    });
    return { ok: true, data };
  } catch (error) {
    return {
      ok: false,
      message: getErrorMessage(error, "User verificatiion failed"),
    };
  }
}

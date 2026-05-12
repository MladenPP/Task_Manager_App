import axios from "axios";
import { Dispatch, SetStateAction } from "react";

type ApiErrorResponse = {
  message?: string | string[];
};

export function getErrorMessage(
  err: unknown,
  setError: Dispatch<SetStateAction<string>>,
) {
  if (axios.isAxiosError(err) && err.name === "CanceledError") return;
  if (axios.isAxiosError(err)) {
    const data = err.response?.data as ApiErrorResponse;

    const message = data?.message || err.message || "Something went wrong";

    setError(Array.isArray(message) ? message[0] : message);
  } else {
    setError("Something went wrong");
  }
}

import { notifyError } from "../utils/notify";

export default async function handleError(error, { errorToast = true } = {}) {
  if (error.message === "Network Error") {
    if (localStorage.getItem("user")) {
      localStorage.clear();
      window.location.reload();
      // return notifyError("Network Error");
    }
  }
  const code = (error && error.response && error.response.status) || 404;
  console.log('error?.response?.data', error?.response?.data)
  const errData = error?.response?.data;

  const message = error?.response?.data?.error || error?.message || ERROR_PLACEHOLDER
  const err = {
    message: typeof message === "object" ? JSON.stringify(message) : message,
    code,
    ...(error || {})
  };
  const isUnauthorized = error?.response?.status === 401 && !error?.config?.url?.includes("login");

  if (err.message === "Network Error" || error.message === "Network Error") {
    if (localStorage.getItem("user")) {
      localStorage.clear();
      window.location.reload();
      //return notifyError("Network Error");
    }
  }
  if (error?.response?.data?.error === "User not found.") {
    return notifyError("Please create account first");
  }
  if (error?.response?.data?.error === "Code not found") {
    return notifyError("Provided Code is Invalid");
  }
  if (error?.response?.data?.error === "Email not verified") {
    return notifyError("Your Email not verified");
  }
  if (errData?.error === "Something went wrong!") {
    return notifyError("Something went wrong!");
  }
  if (errData?.error === "Limit reached") {
    return notifyError("Download Limit Reached Upgrade your plan!");
  }
  console.log("error", err);

  if (errorToast && !isUnauthorized) notifyError(error?.response?.data?.error || err.message);

  throw err;
}
export const ERROR_PLACEHOLDER = "Oops! Something went wrong...";

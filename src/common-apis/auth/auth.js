import Api from "../../services/Api";

export async function userLimit(data) {
  const response = await Api.get(`/user/limit`, data, { skipError: true });
  return response.data.data;
}

export async function login(data) {
  const response = await Api.post(`/services/login`, data);
  return response.data.data;
}
export async function setFigmaLoginId(data) {
  const response = await Api.post(`/user/setFigmaLoginId`, data);
  return response.data.data;
}
export async function socialLogin(data) {
  const response = await Api.post(`/services/social-login`, data);
  return response.data.data;
}

export async function verifyMail(data) {
  const response = await Api.post(`/services/verify-email`, data);
  return response.data.data;
}

export async function setupNewPassword(data) {
  const response = await Api.post(`/services/set-password`, data);
  return response.data.data;
}

export async function forgotPassword(data) {
  const response = await Api.post(`/services/forgot-password`, data);
  return response.data.data;
}

// New On-boarding flow v3 //

export async function findEmailInDB(data) {
  const response = await Api.post(`/services/handle-login`, data);
  return response.data.data;
}
export async function verifyEmailOTP(data) {
  const response = await Api.post(`/services/verify-account`, data);
  return response.data.data;
}

import axios from "axios";
import Api from "../../services/Api";

export async function setupProfile(data) {
  const response = await Api.put(`/user/setup-account`, data);
  return response.data.data;
}

export async function registerUser(data) {
  const response = await Api.post(`/services/register`, data);
  return response.data.data;
}

export async function getProfile(url) {
  const response = await Api.get(url);
  return response.data.data;
}

export async function updateProfile(data) {
  const response = await Api.put(`/user/update`, data);
  return response.data.data;
}

export async function updatePassword(data) {
  const response = await Api.put(`/user/change-password`, data);
  return response.data.data;
}

export async function getDownloadHistory(url) {
  const response = await Api.get(url);
  return response.data.data;
}

export async function updateBillingAddrs(data) {
  const response = await Api.post(`/user/billing-addrs`, data);
  return response.data.data;
}

export async function getBillingAddrs(url) {
  const response = await Api.get(url);
  return response.data.data;
}
export async function getCustomerList(url) {
  const response = await Api.get(url);
  return response.data.data;
}

export async function updateEmail(data) {
  const response = await Api.post("/user/update-email", data);
  return response.data.data;
}

export async function updateSetNewMail(data) {
  const response = await Api.post("/services/new-email", data);
  return response.data.data;
}

export async function userInvite(data) {
  const response = await Api.post("/user/invite", data);
  return response.data.data;
}

export async function archiveUser(data) {
  const response = await Api.delete(`/user/archive/${data.id}`);
  return response.data.data;
}

export async function unArchiveUser(data) {
  const response = await Api.put(`/user/unarchive/${data.id}`);
  return response.data.data;
}

export async function getReportList(url) {
  const response = await Api.get(url);
  return response.data.data;
}
export async function getInvoicetList(url) {
  const response = await Api.get(url);
  return response.data.data;
}

export async function getInvoiceDetail(url){
  const response = await Api.get(url);
  return response.data.data
}

export async function getContactUs(data) {
  const response = await Api.post("/services/user/contact-us", data);
  return response.data.data;
}

export async function getUserDetail(id) {
  const response = await Api.get(`/user/${id}/detail`);
  return response.data.data;
}

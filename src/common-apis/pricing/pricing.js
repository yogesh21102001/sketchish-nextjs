import Api from "../../services/Api";

export async function getPlansList(url) {
  const response = await Api.get(url);
  return response.data.data;
}

export async function getSubscribe(url) {
  const response = await Api.get(url);
  return response.data.data;
}

export async function getPurchase(url) {
  const response = await Api.get(url);
  return response.data.data;
}

export async function getPurchaseStatus(url) {
  const response = await Api.get(url);
  return response.data.data;
}

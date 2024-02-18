import Api from "../../services/Api";

export async function getCountries(url) {
  const response = await Api.get(url);
  return response.data.data;
}

export async function getStates(url) {
  const response = await Api.get(url);
  return response.data.data;
}

export async function getCities(url) {
  const response = await Api.get(url);
  return response.data.data;
}

import Api from "../../services/Api";

export async function getPlansList(url) {
  const response = await Api.get(url);
  return response.data.data;
}

import Api from "../../services/Api";

export async function getCategories(url) {
  const response = await Api.get(url);
  return response.data.data;
}

export async function getTagList(url) {
  const response = await Api.get(url);
  return response.data.data;
}

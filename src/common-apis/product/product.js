import Api from "../../services/Api";

export async function searchSuggestion({ search }) {
  let url = `/services/suggestion-search`;

  if (search) {
    url += `?word=${search}`;
  }

  const response = await Api.get(url);
  return response.data.data;
}

export async function deleteReviewIcon(url) {
  const response = await Api.delete(url);
  return response.data.data;
}
export async function productSearch(url) {
  const response = await Api.get(url);
  return response.data.data;
}
export async function getStatistic(url) {
  const response = await Api.get(url);
  return response.data.data;
}
export async function productDetail(url) {
  const response = await Api.get(url);
  return response.data.data;
}

export async function productPopular(url) {
  const response = await Api.get(url);
  return response.data.data;
}

export async function statistics(url) {
  const response = await Api.get(url);
  return response.data.data;
}

export async function types(url) {
  const response = await Api.get(url);
  return response.data.data;
}

export async function productDownload({ id, params }) {
  let url = `/product/download/${id}`;
  const response = await Api.get(url, params, { responseType: "blob" });
  return response;
}

export async function relativeProduct(url) {
  const response = await Api.get(url);
  return response.data.data;
}

export async function productList(url) {
  const response = await Api.get(url);
  return response.data.data;
}

export async function uploadIcon(data) {
  const response = await Api.post("/product/create", data);
  return response.data.data;
}

export async function getStyleSet(data) {
  const response = await Api.post("/product/create", data);
  return response.data.data;
}

export async function getStyleSetTopFoure() {
  try {
  const response = await Api.get("/services/styleset/top");
  return response.data.data;
  } catch (e) { }
}

export async function getStyleSetAll() {
  const response = await Api.get("/services/product/all-style-set");
  return response.data.data;
}
export async function getAllStylesAndTypes() {
  const response = await Api.get("/services/product/all-styles");
  return response.data.data;
}
// /services/product / all - styles

export async function getAllCategory(data) {
  const response = await Api.get(`/services/categoryDD-List?styleSet=${data?.styleSet || ''}&search=${data?.search || ''}&type=${data?.type}`);
  return response.data.data;
}
export async function getAllSubCategory() {
  const response = await Api.get("/admin/sub-category-get-all");
  return response.data.data;
}

export async function getAllProduct(url) {
  const response = await Api.get(url);
  return response.data.data;
}

export async function getTitleByStyleSet(url) {
  const response = await Api.get(url);
  return response.data.data;
}


export async function getAllCatregoryWithTags(url) {
  const response = await Api.get(url);
  return response.data.data;
}


export async function getDataSearchByTag(url) {
  const response = await Api.get(url);
  return response.data.data;
}

export async function Publish() {
  const response = await Api.get('/admin/publishIcons');
  return response.data.data;
}

export async function UseGetProductByLabel(url) {
  const response = await Api.get(url);
  return response.data.data;
}
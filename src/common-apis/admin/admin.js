import Api from "../../services/Api";

export async function CreateStyleSet(data) {
  const response = await Api.post("/admin/style-set/create", data);
  return response.data.data;
}


export async function UpdateStyleSet(data) {
  const response = await Api.put("/admin/style-set/update", data);
  return response.data.data;
}

export async function StyleSetall(url) {
  const response = await Api.get(url);
  return response.data.data;
}


export async function Typeall(url) {
  const response = await Api.get(url);
  return response.data.data;
}

export async function TypeAdd(data) {
  const response = await Api.post(`admin/create-type` , data);
  return response.data.data;
}

export async function TypeUpdate(data) {
  const response = await Api.put(`admin/update-type` , data);
  return response.data.data;
}

export async function TypeDelete(typeId) {
  const response = await Api.delete(`admin/type-delete/${typeId}`);
  return response.data.data;
}

export async function Categoryall(url) {
  const response = await Api.get(url);
  return response.data.data;
}

export async function CategoryAdd(data) {
  const response = await Api.post(`admin/create-category` , data);
  return response.data.data;
}

export async function CategoryUpdate(data) {
  const response = await Api.put(`admin/update-category` , data);
  return response.data.data;
}

export async function CategoryDelete(categoryId) { 
  const response = await Api.delete(`admin/category-delete/${categoryId}`);
  return response.data.data;
}

export async function Subcategoryall(url) {
  const response = await Api.get(url);
  return response.data.data;
}

export async function SubCategoryAdd(data) {
  const response = await Api.post(`admin/create-sub-category` , data);
  return response.data.data;
}

export async function SubCategoryUpdate(data) {
  const response = await Api.put(`admin/update-sub-category` , data);
  return response.data.data;
}

export async function SubCategoryDelete(subCategoryId) {
  const response = await Api.delete(`admin/sub-category-delete/${subCategoryId}`);
  return response.data.data;
}

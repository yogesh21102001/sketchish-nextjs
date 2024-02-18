import Api from "../../services/Api";

export async function getKeywords(url) {
    const response = await Api.get(url);
    return response.data.data;
}
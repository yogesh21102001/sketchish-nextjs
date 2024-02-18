import Api from "../../services/Api";

export async function getBucketList(data) {
    const response = await Api.get(`/services/list-bucketname/${data.id}`);
    return response.data.data
}

export async function addBucketName(data) {
    const response = await Api.post("/services/add-bucketname", data);
    return response.data.data
}

export async function addEditBucket(data) {
    const response = await Api.put('/services/edit-bucketname', data);
    return response.data.data
}

export async function deleteBuckName(data) {
    const response = await Api.delete(`/services/delete-bucketname/${data.id}`)
    return response.data.data
}

export async function addBucketIcons(data) {
    const response = await Api.post(`/services/add-bucketicons`, data);
    return response.data.data
}

export async function getBucketIcons(data) {
    const queryParams = new URLSearchParams();
    queryParams.append("userId", data.userId);
    queryParams.append("bucketId", data.bucketId);
    const response = await Api.get(`/services/list-product-bucket?${queryParams.toString()}`)
    return response.data.data
}

export async function addBucketIconsFav(data) {
    const response = await Api.post(`/services/add-bucketicons-fav`, data);
    return response.data.data
}

export async function getBucketIconsFav(data) {
    const queryParams = new URLSearchParams();
    queryParams.append("userId", data.userId);
    const response = await Api.get(`/services/list-product-bucket-fav?${queryParams.toString()}`)
    return response.data.data
}

export async function deleteBuckIcon(data) {
    const response = await Api.delete(`/services/delete-bucket-icon/${data.bucketId}/${data.userId}/${data.productVariantId}`)
    return response.data.data
}

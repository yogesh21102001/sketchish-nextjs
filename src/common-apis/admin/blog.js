import Api from "../../services/Api";

export async function getBlogList(data) {
    const response = await Api.get(`/services/blogs/list/`);
    return response.data.data;
}

export async function addBlog(data) {
    const response = await Api.post(`/services/blogs/create`, data);
    return response.data.data
}

export async function getBlogDetail(data) {
    console.log('data::2', data);
    const response = await Api.get(`/services/blogs/detail/${data}`);
    return response.data.data;
}

export async function editBlog(data) {
    console.log('data::2', data);
    const response = await Api.post(`/services/blogs/update/`, data);
    return response.data.data;
}

export async function deleteBlog(data) {
    console.log('data::2', data);
    const response = await Api.delete(`/services/blogs/delete/${data}`, );
    return response.data.data;
}

import useSWR from "swr";
import { getBlogList, addBlog, getBlogDetail, editBlog, deleteBlog } from "../../common-apis/admin/blog"; 

export default function UseBlog() {
    const UseBlogList = async (data) => {
        const response  = await getBlogList(data);
        return response;
    }

    const UseAddBlog = async (data) => {
        const response = await addBlog(data)
        return response
    }

    const UseBlogDetail = async (data) => {
        console.log('data::', data);
        const response = await getBlogDetail(data);
        return response;
    }

    const UseBlogupdate = async (data) => {
        const response = await editBlog(data);
        return response;
    }

    const UseBlogDelete = async (data) => {
        const response = await deleteBlog(data);
        return response;
    }

    return { UseBlogList, UseAddBlog, UseBlogDetail, UseBlogupdate, UseBlogDelete };
}
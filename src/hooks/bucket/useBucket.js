import useSWR from "swr";
import { addBucketName, addEditBucket, deleteBuckName, getBucketList, addBucketIcons, getBucketIcons, addBucketIconsFav, getBucketIconsFav, deleteBuckIcon } from "../../common-apis/bucket/bucket";

export default function UseBucket() {
    const UseBucketList = async (data) => {
        const response = await getBucketList(data)
        return response
    };

    const UseAddBucket = async (data) => {
        const response = await addBucketName(data)
        return response
    }

    const UseEditBucket = async (data) => {
        const response = await addEditBucket(data)
        return response
    }

    const UseDeleteBucket = async (data) => {
        const response = await deleteBuckName(data)
        return response
    }

    const UseAddBucketIcons = async (data) => {
        const response = await addBucketIcons(data)
        return response
    }
    const UseGetBucketIcon = async (data) => {
        const response = await getBucketIcons(data)
        return response
    }
    const UseAddBucketIconsFav = async (data) => {
        const response = await addBucketIconsFav(data)
        return response
    }

    const UseGetBucketIconFav = async (data) => {
        const response = await getBucketIconsFav(data)
        return response
    }

    const UseDeleteBucketIcon = async (data) => {
        console.log("dataaaaaa",data);
        const response = await deleteBuckIcon(data)
        console.log("response",response);
        return response
    }

    return { UseBucketList, UseAddBucket, UseEditBucket, UseDeleteBucket, UseAddBucketIcons, UseGetBucketIcon, UseAddBucketIconsFav, UseGetBucketIconFav, UseDeleteBucketIcon };
}

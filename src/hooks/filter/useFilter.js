import useSWR from "swr";
import { getCategories, getTagList } from "../../common-apis/filter/filter";

const formatApiResponse = (resp) => {
  return resp.map((data) => {
    return { value: data.name, label: data.name };
  });
};

export default function useFilters() {
  const useGetCategory = () => {
    const queryParams = new URLSearchParams();

    const url = `/services/categoryDD-List` + queryParams.toString();

    const { data } = useSWR(url, getCategories);

    return {
      categories: data && formatApiResponse(data),
      isLoading: !data,
    };
  };

  const useGetTag = () => {
    const queryParams = new URLSearchParams();

    const url = `/services/tagDD-List` + queryParams.toString();

    const { data } = useSWR(url, getTagList);

    return {
      tags: data && formatApiResponse(data),
      isLoading: !data,
    };
  };
  return { useGetCategory, useGetTag };
}

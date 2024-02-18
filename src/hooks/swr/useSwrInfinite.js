import useSWRInfinite from "swr";
import { stringifyURL } from "../../services/url";

function getKey(url, page, params, deep) {
  return stringifyURL(url, { page: page + 1, ...params }, deep);
}

export default function useSwrInfinite(url, params, fetcher, config = {}) {
  const { error, data, size, setSize, mutate } = useSWRInfinite(
    (page) => (url ? getKey(url, page, params, config.stringifyDeep) : null),
    fetcher,
    {
      ...(config.onSuccess && {
        onSuccess: config.onSuccess,
      }),
    }
  );
  const loadMore = () => {
    setSize(size + 1);
  };

  const resetPage = () => {
    setSize(1);
  };

  const isLoading = !error && !data;
  const isLoadingMore =
    isLoading || (data && typeof data[size - 1] === "undefined");
  const isEmpty = data ? !data[0]?.length : true;
  const hasMore =
    !isEmpty && data && data[size - 1]
      ? data[size - 1].length === params.limit
      : false;

  return {
    loadMore,
    resetPage,
    data: data || [],
    isLoading: isLoadingMore,
    isEmpty,
    hasMore,
    page: size + 1,
    mutate,
  };
}

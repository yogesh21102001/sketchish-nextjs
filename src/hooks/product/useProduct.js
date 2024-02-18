import { useState } from "react";
import useSWR from "swr";
import {
  searchSuggestion,
  productSearch,
  productDetail,
  productPopular,
  productDownload,
  relativeProduct,
  productList,
  uploadIcon,
  getStyleSetTopFoure,
  getStyleSetAll,
  getAllProduct,
  getTitleByStyleSet,
  getDataSearchByTag,
  getAllCatregoryWithTags,
  getAllCategory,
  getAllSubCategory,
  Publish,
  getStatistic,
  deleteReviewIcon,
  types,
  getAllStylesAndTypes
} from "../../common-apis/product/product";
import useAuth from "../common/useAuth";
import { notifyError, notifySuccess } from "../../utils/notify";
import fileDownload from "js-file-download";

export default function useProduct() {
  const { getUserLimit } = useAuth();
  const [isLoading, setLoading] = useState(false);
  const [isLoadingDown, setLoadingDown] = useState(false);
  const [isLoadingCopy, setLoadingCopy] = useState(false);
  const [isLoadingCopied, setLoadingCopied] = useState(false);

  const setSearchSuggestion = async ({ search }) => {
    try {
      setLoading(true);

      if (search) {
        const searchSuggestionData = await searchSuggestion({ search });

        const result = [];
        for (const elem of searchSuggestionData) {
          result.push({
            id: elem._id,
            value: elem.name,
            label: elem.name,
          });
        }

        return result;
      }
    } catch (e) {
      setLoading(false);
      notifyError(e.message);
      return false;
    }
  };

  const useSetSearch = ({ search, page, limit }) => {
    // const [isType, onProdType] = useState();
    const [isCategory, onProdCategory] = useState();
    // const [isTag, onProdTag] = useState();
    const [isFree, onProdFree] = useState();

    const queryParams = new URLSearchParams();

    if (search) queryParams.append("word", search.replace("%20", " "));
    // if (isType) queryParams.append("type", isType);
    if (isCategory) queryParams.append("category", isCategory);
    if (isFree) queryParams.append("isFree", isFree);
    if (isFree === false) queryParams.append("isFree", isFree);

    // queryParams.append("page", page || 1);
    // queryParams.append("limit", limit || 30);

    const url = `/services/search?` + queryParams.toString();

    const { data, mutate } = useSWR(url, productSearch);

    return {
      searchData: data,
      isLoading: !data,
      mutate,
      // onProdType,
      onProdCategory,
      // onProdTag,
      onProdFree,
    };
  };

  const useRelativeProduct = ({ id, rmId, page, limit }) => {
    const queryParams = new URLSearchParams();

    queryParams.append("id", id);
    queryParams.append("rmId", rmId);
    queryParams.append("page", page || 1);
    queryParams.append("limit", limit || 10);

    const url = `/services/relative-product?` + queryParams.toString();

    const { data, mutate } = useSWR(url, relativeProduct);

    return {
      relatedProduct: data,
      isLoading: !data,
      mutate,
    };
  };


  const UseSetProdDet = async (id) => {
    try {
      const url = `/product-variant/${id}`;
      const response = await productDetail(url)
      return response
    } catch (error) {
      return null
    }

  };


  const UseGetStatistics = async () => {
    const url = `/services/statistics`;
    const response = await getStatistic(url)
    return response

    // return useSWR(url, statistics);

  };

  const useGetProductPupulars = () => {
    const url = `/services/product-popular`;
    const { data } = useSWR(url, productPopular);
    return {
      prodPupular: data,
      isLoading: !data,
    };
  };
  const useGetTypes = () => {
    const url = `/services/type-get-all`;
    const { data } = useSWR(url, types);
    return {
      data,
      isLoading: !data,
    };
  };

  const getDownloadProduct = async ({
    id,
    name,
    size = "512",
    type = "png",
    isCopy = false,
    fill,
    strokeWidth,
    strokeColor,
    bgColor,
    brokeStroke,
    newColors,
    oldColors,
    animated
  }) => {
    try {
      if (isCopy) setLoadingCopy(true);
      else setLoadingDown(true);

      const params = new URLSearchParams();

      params.append("type", type);
      params.append("animated", true)
      params.append("size", size);
      params.append("strokeWidth", strokeWidth);

      if (strokeColor && strokeColor !== "#000000")
        params.append("strokeColor", strokeColor);
      if (bgColor && bgColor !== "notset") params.append("bgColor", bgColor);
      if (fill && fill !== "notset") params.append("fill", fill);
      if (brokeStroke) params.append("brokeStroke", brokeStroke);

      if (
        newColors &&
        oldColors &&
        oldColors.length === newColors.length &&
        oldColors.length > 0 &&
        newColors.length > 0
      ) {
        params.append("oldColors", oldColors);
        params.append("newColors", newColors);
      }

      productDownload({ id, params }).then(async function (res) {

        if (animated) {
          getUserLimit();
          return;
        }
        if (isCopy) {
          let blob = res.data;

          if (type !== "png") {
            const outurl = URL.createObjectURL(blob);
            await fetch(outurl)
              .then((res) => res.text())
              .then((data) => {
                let output = data;
                blob = new Blob([output], { type: "text/plain" });
              });
          }

          await navigator.clipboard.write([
            new window.ClipboardItem({
              [blob.type]: blob,
            }),
          ]);
          setLoadingCopy(false);
          notifySuccess("Copied to your clipboard");
          setLoadingCopied(true);
          setInterval(() => {
            setLoadingCopied(false);
          }, 3000);
        } else {
          fileDownload(res.data, `${name}-${size}.${type}`);
          setLoadingDown(false);
          notifySuccess("Icon Downloaded");
        }
        getUserLimit();
      }).catch((error) => {
        console.log("error", error);
        console.log("error", error.data);

      });
    } catch (e) {
      if (isCopy) setLoadingCopy(false);
      else setLoadingDown(false);
      notifyError(e.message);
      return false;
    }
  };


  const useGetProductList = () => {
    const [search, onSearch] = useState("");
    const [page, setPage] = useState(1);
    const [category, setCategory] = useState();
    const [subCategory, setSubCategoty] = useState();
    const [styleSet, setStyleSet] = useState();
    const PAGE_SIZE = 100;
    const order = "desc";
    const orderBy = "date";
    const isArchived = false;
    const { data, mutate } = useSWR(() => {
      if (search === "") {
        return `/product/list?page=${page}&category=${category}&subCategory=${subCategory}&styleSet=${styleSet}&limit=${PAGE_SIZE}&order=${order}&orderBy=${orderBy}&isArchived=${isArchived}`;
      }
      if (search !== "") {
        return `/product/list?search=${search}&page=${page}&category=${category}&subCategory=${subCategory}&styleSet=${styleSet}&limit=${PAGE_SIZE}&order=${order}&orderBy=${orderBy}&isArchived=${isArchived}`;
      }
      return null;
    }, productList);

    if (data && data.length === 0 && page > 1) setPage((pre) => pre - 1);
    return {
      product: data,
      search,
      isLoading: !data,
      onSearch,
      setPage,
      pageSize: PAGE_SIZE,
      getProdListMutate: mutate,
      page,
      setCategory, setSubCategoty, setStyleSet
    };
  };
  const useGetReivewProductList = () => {
    const [search, onSearch] = useState("");
    const [page, setPage] = useState(1);
    const [category, setCategory] = useState();
    const [subCategory, setSubCategoty] = useState();
    const [styleSet, setStyleSet] = useState();
    const PAGE_SIZE = 100;
    const order = "desc";
    const orderBy = "date";
    const isArchived = false;
    const { data, mutate } = useSWR(() => {
      if (search === "") {
        return `/reviewicons/list?page=${page}&category=${category}&subCategory=${subCategory}&styleSet=${styleSet}&limit=${PAGE_SIZE}&order=${order}&orderBy=${orderBy}&isArchived=${isArchived}`;
      }
      if (search !== "") {
        return `/reviewicons/list?search=${search}&page=${page}&category=${category}&subCategory=${subCategory}&styleSet=${styleSet}&limit=${PAGE_SIZE}&order=${order}&orderBy=${orderBy}&isArchived=${isArchived}`;
      }
      return null;
    }, productList);

    if (data && data.length === 0 && page > 1) setPage((pre) => pre - 1);
    return {
      product: data,
      search,
      isLoading: !data,
      onSearch,
      setPage,
      pageSize: PAGE_SIZE,
      getProdListMutate: mutate,
      page,
      setCategory, setSubCategoty, setStyleSet
    };
  };
  const UseGetStyleSetTop = async (data) => {
    const response = await getStyleSetTopFoure(data)
    return response
  }

  const UseGetStyleSetAll = async (data) => {
    const response = await getStyleSetAll(data)
    return response
  }

  const UseGetAllStyleAndTypes = async (data) => {
    const response = await getAllStylesAndTypes(data)
    return response
  }

  const UseGetCategoryAll = async (data) => {
    const response = await getAllCategory(data)
    return response
  }
  const UseGetAllSubCatregory = async (data) => {
    const response = await getAllSubCategory(data)
    return response
  }

  const UseProductGet = async (data) => {
    const response = await getAllProduct(`/services/products?type=${data.type}&page=${data.page}&styleSet=${data.styleSet}&category=${data.category}&subCategory=${data.subCategory}&search=${data.search}&sortBy=${data?.sortBy}&isPaid=${data.isPaid}`)
    return response
  }

  const UseSearch = async(data)=>{
    const response = await getAllProduct(`/services/product/category-wise-search/${data}`)
    return response
  }

  const UseGetTitleByStyleSet = async (styleSet) => {
    if (!styleSet) {
      styleSet = sessionStorage.getItem("styleSet")
    }
    const response = await getTitleByStyleSet(`/services/search-styleSet/${styleSet}`)
    return response
  }
  const publishIcons = async () => {
    const response = await Publish()
    return response
  }
  const UseSearchByTag = async (data) => {
    const response = await getDataSearchByTag(`/services/product/tagsWise/${data}`)
    return response
  }

  const UseGetAllCatregoryWithTags = async (data) => {
    const response = await getAllCatregoryWithTags(`/services/product/tags-styleSet-Wise/${data.tags}/${data.styleSet}/${data.category}`)
    return response
  }
  const deleteReviewIconById = async (id) => {
    const response = await deleteReviewIcon(`/reviewicon/${id}`)
    return response
  }
  const deleteAllReviewIcons = async () => {
    const response = await deleteReviewIcon(`/reviewicons/all`)
    return response
  }
  const UseGetProductByLabel = async (data) => {
    const response = await getAllCatregoryWithTags(`/services/get-by-label/${data}`)
    return response
  }
  const UseGetSimilarProduct = async (data) => {
    const response = await getAllCatregoryWithTags(`/services/similar-icons/${data?.id}?page=${data.page}`)
    return response
  }

  const setUploadIcon = async ({
    name,
    tags,
    type,
    category,
    styleSet,
    subCategory,
    assets,
  }) => {
    try {
      setLoading(true);

      const formData = new FormData();

      if (assets && assets.length > 0) {
        for (const asset of assets) formData.append("assets", asset);
      }

      const docData = JSON.stringify(
        JSON.stringify({
          name: name,
          label: name,
          type,
          subCategory,
          styleSet,
          category,
          tags,
        })
      );

      formData.append("document", docData);

      const response = await uploadIcon(formData);

      setLoading(false);

      return response;
    } catch (e) {
      setLoading(false);
      notifyError(e.message);
      return false;
    }
  };

  return {
    isLoading,
    isLoadingDown,
    isLoadingCopy,
    setLoadingDown,
    setLoadingCopy,
    isLoadingCopied,
    setSearchSuggestion,
    useSetSearch,
    UseSetProdDet,
    UseGetTitleByStyleSet,
    UseProductGet,
    UseSearchByTag,
    UseGetCategoryAll,
    useRelativeProduct,
    UseGetAllCatregoryWithTags,
    UseGetAllSubCatregory,
    useGetProductPupulars,
    getDownloadProduct,
    useGetProductList,
    UseGetStyleSetAll,
    UseGetAllStyleAndTypes,
    UseGetStyleSetTop,
    setUploadIcon,
    UseGetProductByLabel,
    UseGetSimilarProduct,
    useGetTypes,
    UseGetStatistics,
    useGetReivewProductList,
    publishIcons,
    deleteReviewIconById,
    deleteAllReviewIcons,
    UseSearch
  };
}

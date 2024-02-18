import React, { useCallback, useEffect, useRef, useState } from "react";
import ReactPaginate from "react-paginate";
import { ClipLoader } from "react-spinners";
import AdsComponent from "../../components/AdsComponent";
import CommonStyle from "../../style/commonStyle.module.css";
import { CloseIcon } from "./assets/icons";
import Styles from "./style.module.css";

// Comonnents
import {
  isAuthenticated,
  replaceHyphensWithSpaces,
  replaceSpacesWithHyphens,
} from "../../../src/utils/helpers";
import BucketSideBar from "../../components/BucketSideBar/BucketSideBar";
import PricingModal from "../../components/Pricing/PricingModal";
import { ResponsiveModal } from "../../components/ResponsiveModal";
import SearchAndFilterBar from "../../components/SearchAndFilterBar/SearchAndFilterBar";
import Spinner from "../../components/spinner/spinner";
import useUser from "../../hooks/user/user";
import { Button, IconCard } from "../../ui";
import { FilterSideBar, IconResultNotFound } from "./components";

// Hooks
import { useLocation, useNavigate, useParams, useSearchParams } from "react-router-dom";
import UseBucket from "../../hooks/bucket/useBucket";
import useProduct from "../../hooks/product/useProduct";

import { isEmpty } from "lodash";
import Modal from "../../containers/modal/modals";
import NavBar from "../../components/NavBar/NavBar";

export const IconSearchResult = () => {
  // Hooks
  const { search } = useParams();
  const keyWord = replaceHyphensWithSpaces(search);
  const {
    UseProductGet,
    UseGetAllStyleAndTypes,
    UseGetSimilarProduct,
    UseSearch,
  } = useProduct();
  const [searchParams, setSearchParams] = useSearchParams();
  const q = searchParams.get("search");
  const type = searchParams.get("t");
  const style = searchParams.get("s");
  const cat = searchParams.get("cat");
  const [currentCate, setCurrentCat] = useState(cat ? cat.split(",") : []);
  const [isPriceModalOpen, setIsPriceModalOpen] = useState(false);
   let location = useLocation();
  const path = location?.pathname?.split("/");
  console.log(":::::", path[2]);

  const [productLoading, setProductLoading] = useState(false);
  const [getAllProdData, setGetAllProd] = useState([]);
  const [page, setPage] = useState(1);
  const [totalIcons, setTotalIcons] = useState("");
  const navigator = useNavigate();
  const windowWidth = useRef(window.innerWidth);
  const memberShip = searchParams.get("m");
  const { ModalMain, setIsLoginOpen } = Modal();
  const [isFilter, setFilter] = useState(
    windowWidth.current > 600 ? true : false
  );

  const [searchResult, setSearchResult] = useState([]);
  const [searchResultCount, setSearchResultCount] = useState("");

  const handleCheckNewIcons = (obj) => {
    const currentDate = new Date();

    const createdAtDate = new Date(obj.updatedAt);
    const timeDifference = currentDate - createdAtDate;
    const sevenDaysInMillis = 7 * 24 * 60 * 60 * 1000;

    return timeDifference <= sevenDaysInMillis;
  };

  const { UseBucketList } = UseBucket();

  const Userid = JSON.parse(localStorage.getItem("user"));
  const [bucketData, setBucketData] = useState([]);
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const [sortBy, setSortBy] = useState("Recent");
  const [similarIcons, setSimilarIcons] = useState({});
  const [firstIcon, setFirstIcon] = useState("");
  const [pageNumber, setPageNumber] = useState(1);
  const [loadingMore, setLoadingMore] = useState(false);
  const { useGetProfile } = useUser();
  const { userDet, mutate } = useGetProfile();
  const styleSet = searchParams.get("style-set");
  const [isAllStyles, setIsAllStyles] = useState(false);
  const [combinedPairs, setCombinedPairs] = useState([]);
  const [organizedData, setOrganizedData] = useState([]);

  const gradientArray = [
    {
      gradient:
        "linear-gradient(327deg, #E5EEFF 1.11%, rgba(229, 238, 255, 0.10) 100%)",
      border: "#E0F5FF",
      shadow: "0px 10px 10px 0px rgba(230, 247, 255, 0.50)",
    },
    {
      gradient:
        "linear-gradient(327deg, #E5EEFF 1.11%, rgba(229, 238, 255, 0.10) 100%)",
      border: "#E0EBFF",
      shadow: " 0px 10px 10px 0px rgba(229, 238, 255, 0.50)",
    },
    {
      gradient:
        "linear-gradient(327deg, #EEE5FF 1.11%, rgba(238, 229, 255, 0.10) 100%)",
      border: "#EBE0FF",
      shadow: "0px 10px 10px 0px rgba(235, 224, 255, 0.50)",
    },
    {
      gradient:
        "linear-gradient(327deg, #FBE5FF 1.11%, rgba(251, 229, 255, 0.10) 100%)",
      border: "#FAE0FF",
      shadow: "0px 10px 10px 0px rgba(250, 224, 255, 0.50)",
    },
    {
      gradient:
        "linear-gradient(327deg, #FFE5F6 1.11%, rgba(255, 229, 246, 0.10) 100%)",
      border: "#FFE0F4",
      shadow: "0px 10px 10px 0px rgba(255, 224, 244, 0.50)",
    },
    {
      gradient:
        "linear-gradient(327deg, #FFE5EA 1.11%, rgba(255, 229, 234, 0.10) 100%)",
      border: "#FFE0E6",
      shadow: "0px 10px 10px 0px rgba(255, 224, 230, 0.50)",
    },
    {
      gradient:
        "linear-gradient(327deg, #FFE5EA 1.11%, rgba(255, 229, 234, 0.10) 100%)",
      border: "#E0FFFF",
      shadow: "0px 10px 10px 0px rgba(224, 255, 255, 0.50)",
    },
    {
      gradient:
        "linear-gradient(327deg, #E5FFFF 1.11%, rgba(229, 255, 255, 0.10) 100%)",
      border: "#CCFFE5",
      shadow: "0px 10px 10px 0px rgba(204, 255, 229, 0.50)",
    },
    {
      gradient:
        "linear-gradient(327deg, #E5FFF2 1.11%, rgba(229, 255, 242, 0.10) 100%)",
      border: "#E0FFE0",
      shadow: "0px 10px 10px 0px rgba(224, 255, 224, 0.50)",
    },
    {
      gradient:
        "linear-gradient(327deg, #E5FFE5 1.11%, rgba(229, 255, 229, 0.10) 100%)",
      border: "#EFFFE0",
      shadow: "0px 10px 10px 0px rgba(239, 255, 224, 0.50)",
    },
    {
      gradient:
        "linear-gradient(327deg, #F2FFE5 1.11%, rgba(242, 255, 229, 0.10) 100%)",
      border: "#FFFFE0",
      shadow: "0px 10px 10px 0px rgba(255, 255, 224, 0.50",
    },
    {
      gradient:
        "linear-gradient(327deg, #FFFFE5 1.11%, rgba(255, 255, 229, 0.10) 100%)",
      border: "#FFEFE0",
      shadow: "0px 10px 10px 0px rgba(255, 239, 224, 0.50)",
    },
  ];

  const getAllBucketData = async () => {
    if (!isEmpty(Userid)) {
      const response = await UseBucketList({
        id: Userid.id ? Userid.id : Userid._id,
      });
      if (response && typeof response == "object") {
        setBucketData(response);
      } else {
        setBucketData([]);
      }
    }
  };

  const getAllStylesAndTypes = async () => {
    setProductLoading(true);
    const resp = await UseGetAllStyleAndTypes();
    const groupedByType = new Map();

    resp.forEach((item) => {
      const type = item.type.trim();

      if (groupedByType.has(type)) {
        groupedByType.get(type).allStyles.push(item);
      } else {
        groupedByType.set(type, {
          type: type,
          allStyles: [item],
        });
      }
    });

    setOrganizedData(Array.from(groupedByType.values()));
    setProductLoading(false);
  };

  useEffect(() => {
    getAllBucketData();
    getAllStylesAndTypes();
  }, []);

  // API Calls

  const handelPricingModal = () => {
    if (!isAuthenticated()) {
      setIsLoginOpen(true);
    } else {
      if (windowWidth?.current > 600) {
        setIsPriceModalOpen(true);
      } else {
        navigator("/pricing");
      }
    }
  };

  const getSimilarIcons = async (v, page) => {
    if (q) {
      const data = {
        id: v,
      };
      if (page) {
        data["page"] = page;
      }

      if (firstIcon && getAllProdData?.length > 0) {
        const getData = await UseGetSimilarProduct(data);
        setSimilarIcons(getData);
      }
    }
  };

  const getIcons = async (page) => {
    const data = {
      // type: type == "all" ? "Free" : !type ? "Classic" : type,
      type: !type ? "Classic" : type,
      search: keyWord ? keyWord : !q ? "null" : q,
      styleSet: style == undefined ? "null" : style,
      category: currentCate?.length == 0 ? "null" : currentCate?.join(","),
    };
    data["page"] = 1;
    if (sortBy == "A-Z") {
      data["sortBy"] = "label";
    }

    if (memberShip) {
      data["isPaid"] = memberShip?.toLowerCase() == "free" ? false : true;
    }
    setProductLoading(true);
    const getData = await UseProductGet(data);

    console.log("All products", getData?.products);

    getData?.products.forEach((obj) => {
      obj.isNew = handleCheckNewIcons(obj);
    });
    setTotalIcons(getData?.totalCount);
    setGetAllProd(getData?.products);
    setFirstIcon(getData?.products[0]);
    if (getData?.products[0]?._id)
      getSimilarIcons(getData?.products[0]?._id, 1);

    setProductLoading(false);
  };

  const fatchData = async (page) => {
    setLoadingMore(true);
    const data = {
      type: type,
      search: keyWord ? keyWord : !q ? "null" : q,
      styleSet: style == undefined ? "null" : style,
      category: currentCate?.length == 0 ? "null" : currentCate?.join(","),
    };
    if (page > 1) {
      data["page"] = page;
    } else {
      data["page"] = 2;
    }
    if (sortBy == "A-Z") {
      data["sortBy"] = "label";
    }
    if (memberShip) {
      data["isPaid"] = memberShip?.toLowerCase() == "free" ? false : true;
    }
    const getData = await UseProductGet(data);
    if (getData) setLoadingMore(false);

    getData?.products.forEach((obj) => {
      obj.isNew = handleCheckNewIcons(obj);
    });

    setGetAllProd((prevItems) => {
      return [...prevItems, ...getData?.products];
    });
  };
  const observer = useRef();

  const lastIconCard = useCallback(
    (node) => {
      if (productLoading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          setPageNumber((prevPageNumber) => prevPageNumber + 1);
        }
      });
      if (node) {
        return observer.current.observe(node);
      }
    },
    [productLoading]
  );

  //  Handlers

  const handelPageChange = (event) => {
    setPage(Number(event.selected + 1));
    getSimilarIcons(firstIcon?._id, Number(event.selected + 1));
  };

  const scrollTop = (v) => {
    window.scrollTo({
      top: 0,
      behavior: v || "instant",
    });
  };

  const typeAndStyleHandler = (type, style) => {
    setIsAllStyles(false);
    scrollTop();
    setPage(1);
    const params = new URLSearchParams(searchParams);
    params.set("s", style);
    params.set("t", type);
    params.delete("style-set");
    setSearchParams(params.toString());
  };

  const getSearchResult = async (value) => {
    setProductLoading(true);
    const resp = await UseSearch(value);
    const transformedArray = resp?.products
      ?.map((item) => {
        return item?.categories.map((category) => {
          return {
            type: item?.type,
            styleSet: category?.styleSet,
            results: category?.results,
            count: category?.count,
          };
        });
      })
      .reduce((acc, val) => acc.concat(val), []);
    setSearchResult(transformedArray);
    setSearchResultCount(resp?.totalCount);
    setProductLoading(false);
  };

  // UseEffect
  useEffect(() => {
    scrollTop();
  }, [styleSet]);

  useEffect(() => {
    if (!style && !type && !q && !memberShip && !keyWord) {
      setIsAllStyles(true);
    } else {
      setIsAllStyles(false);
      if (style && type) {
        getIcons(page);
      }
    }
  }, [style, type, q, keyWord, sortBy, memberShip]);

  useEffect(() => {
    if (q && !style && !type && !keyWord && !memberShip) getSearchResult(q);
    if(keyWord)getSearchResult(keyWord);
  }, [q]);

  useEffect(() => {
    if (pageNumber > 1) fatchData(pageNumber);
  }, [pageNumber]);

  return (
    <div>
      <NavBar />
      {page >= 3 && window.scrollY != 0 && (
        <Button
          onClick={() => scrollTop("smooth")}
          className={Styles.floating_btn}
        >
          Scroll To Top
        </Button>
      )}
      {productLoading && (
        <div class="loader">
          <Spinner></Spinner>
        </div>
      )}
      <div className={Styles.main_cont}>
        {isFilter && (
          <FilterSideBar
            setPage={setPage}
            currentWondow={windowWidth.current}
            isFilter={isFilter}
            isAllStyles={isAllStyles}
            setIsAllStyles={setIsAllStyles}
            combinedPairs={organizedData}
          />
        )}
        <div className={Styles.rgt_sec}>
          {isAllStyles && !style && !type && !q && !memberShip && !keyWord && (
            <>
              <div className={Styles.icon_results_cont}>
                <div className={Styles.search_filter}>
                  <div className={Styles.top}>
                    <div className={Styles.dictonary_header}>
                      <h1>All Styles</h1>
                      <p>
                        Explore 90,000+ icons in 20+ unique styles. Download
                        icons in PNG, SVG, Animated SVG.
                      </p>
                    </div>
                  </div>
                </div>
                <div className={Styles.all_styles_wraper}>
                  {organizedData?.length > 0 &&
                    !productLoading &&
                    organizedData?.map((item, index) => (
                      <div>
                        <h3 className={Styles.all_styles_header}>
                          {item?.type}
                        </h3>
                        <div key={index} className={Styles.all_styles_cont}>
                          {item?.allStyles.map((style, i) => (
                            <div
                              onClick={() =>
                                typeAndStyleHandler(
                                  style?.type,
                                  style?.styleSet.toLowerCase()
                                )
                              }
                              key={i}
                              className={Styles.style_card}
                              style={{
                                background:
                                  gradientArray[i % gradientArray?.length]
                                    ?.gradient,
                                borderColor:
                                  gradientArray[i % gradientArray?.length]
                                    ?.border,
                                boxShadow:
                                  gradientArray[i % gradientArray?.length]
                                    ?.shadow,
                              }}
                            >
                              <img
                                className={Styles.all_styles_image}
                                src={
                                  "/icons/allStyleSets/" +
                                  item?.type.toLowerCase() +
                                  "-" +
                                  style?.styleSet.toLowerCase() +
                                  ".svg"
                                }
                                alt=""
                              />
                              <div className={Styles.all_style_text_cont}>
                                <h4>{`${item?.type} ${style?.styleSet}`}</h4>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            </>
          )}
          {!isAllStyles && style && type && (
            <div className={Styles.icon_results_cont}>
              <div className={Styles.search_filter}>
                <div className={Styles.top}>
                  {getAllProdData?.length > 0 && (
                    <div className={Styles.mobile_side_bar_btn_cont}>
                      {keyWord ? (
                        <div className={Styles.dictonary_header}>
                          <h1>{keyWord} icons</h1>
                          <p>
                            Explore {totalIcons.toLocaleString()} {keyWord}
                            icons in various styles. Available in Static SVG,
                            Animated SVG, and PNG.
                          </p>
                        </div>
                      ) : (
                        <div className={Styles.my_bucket_btn_cont}>
                          <div className={Styles.dictonary_header}>
                            <h1>
                              {totalIcons?.toLocaleString()} {q?.toLowerCase()}{" "}
                              icons in {type?.toLowerCase()}{" "}
                              {style?.toLowerCase()}
                            </h1>
                            <p>
                              Explore 20 unique design styles. Download{" "}
                              {q?.toLowerCase()} icons in PNG, SVG, Animated
                              SVG.
                            </p>
                          </div>

                          {windowWidth.current <= 600 && !isFilter && (
                            <div
                              className={Styles.my_bucket_mobile}
                              onClick={() => {
                                setFilter(false);
                              }}
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="20"
                                height="20"
                                viewBox="0 0 20 20"
                                fill="none"
                              >
                                <path
                                  d="M2.99986 7C2.99986 7 1.33173 14.3856 5.32559 17C8.37564 18.9966 11.6092 18.995 14.6603 17C18.6564 14.3871 16.9999 7 16.9999 7"
                                  stroke="#1E3050"
                                  stroke-width="1.8"
                                  stroke-linecap="square"
                                  stroke-linejoin="round"
                                />
                                <path
                                  d="M1 7H19"
                                  stroke="#1E3050"
                                  stroke-width="1.8"
                                  stroke-linecap="square"
                                  stroke-linejoin="round"
                                />
                                <path
                                  d="M5.1001 6C5.56337 3.71776 7.58112 2 10.0001 2C12.419 2 14.4368 3.71776 14.9001 6"
                                  stroke="#1E3050"
                                  stroke-width="1.8"
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                />
                              </svg>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
              <div className={Styles.icon_result}>
                {getAllProdData?.length == 0 &&
                  !productLoading &&
                  !isAllStyles && <IconResultNotFound />}

                <div className={CommonStyle.icon_cards_wraper}>
                  {getAllProdData?.length > 0 &&
                    getAllProdData?.map((icon, index) => {
                      if (getAllProdData.length === index + 1) {
                        return (
                          <div ref={lastIconCard}>
                            <IconCard
                              key={index}
                              lable={icon?.label}
                              pro={icon?.paid === 1 ? true : false}
                              newIcon={icon?.isNew}
                              preView={
                                icon?.webpUrl ? icon?.webpUrl : icon?.previewUrl
                              }
                              addToBucket={true}
                              isPopoverOpen={isPopoverOpen}
                              setIsPopoverOpen={setIsPopoverOpen}
                              bucketData={bucketData}
                              isAuthenticated={isAuthenticated}
                              productId={icon?._id}
                              onClick={() =>
                                navigator(
                                  `/icons/${replaceSpacesWithHyphens(
                                    icon?.label
                                  )}?t=${type == "all" ? "Classic" : type}&s=${
                                    icon?.styleSet
                                  }`
                                )
                              }
                            />
                          </div>
                        );
                      } else {
                        return (
                          <>
                            <IconCard
                              key={index}
                              lable={icon?.label}
                              pro={icon?.paid === 1 ? true : false}
                              newIcon={icon?.isNew}
                              preView={
                                icon?.webpUrl ? icon?.webpUrl : icon?.previewUrl
                              }
                              addToBucket={true}
                              isPopoverOpen={isPopoverOpen}
                              setIsPopoverOpen={setIsPopoverOpen}
                              bucketData={bucketData}
                              isAuthenticated={isAuthenticated}
                              productId={icon?._id}
                              onClick={() =>
                                navigator(
                                  `/icons/${replaceSpacesWithHyphens(
                                    icon?.label
                                  )}?t=${type == "all" ? "Classic" : type}&s=${
                                    icon?.styleSet
                                  }`
                                )
                              }
                            />
                            <>
                              {userDet?.plan?.toLowerCase() == "basic" && (
                                <>
                                  {(index + 1) % 100 === 0 && (
                                    <div className={Styles.ad_cont}>
                                      <div className={Styles.ad_box}>
                                        <div
                                          className={Styles.close}
                                          onClick={() => handelPricingModal()}
                                        >
                                          <CloseIcon />
                                        </div>
                                        <AdsComponent
                                          width={"100%"}
                                          height={"150px"}
                                          // adSize={"fix"}
                                          className={Styles.ad}
                                          adBy={"google"}
                                          dataAdSlot={"6613630953"}
                                        />
                                      </div>
                                    </div>
                                  )}
                                </>
                              )}
                              {!isAuthenticated() && (
                                <>
                                  {(index + 1) % 100 === 0 && (
                                    <div className={Styles.ad_cont}>
                                      <div className={Styles.ad_box}>
                                        <div
                                          className={Styles.close}
                                          onClick={() => handelPricingModal()}
                                        >
                                          <CloseIcon />
                                        </div>
                                        <AdsComponent
                                          width={"100%"}
                                          height={"150px"}
                                          // adSize={"fix"}
                                          className={Styles.ad}
                                          adBy={"google"}
                                          dataAdSlot={"6613630953"}
                                        />
                                      </div>
                                    </div>
                                  )}
                                </>
                              )}
                              {userDet?.plan?.toLowerCase() == "basic" && (
                                <>
                                  {index === 9 - 1 && (
                                    <div className={Styles.ad_cont}>
                                      <div className={Styles.ad_box}>
                                        <div
                                          className={Styles.close}
                                          onClick={() => handelPricingModal()}
                                        >
                                          <CloseIcon />
                                        </div>
                                        <AdsComponent
                                          width={"100%"}
                                          height={"150px"}
                                          // adSize={"fix"}
                                          className={Styles.ad}
                                          adBy={"google"}
                                          dataAdSlot={"6613630953"}
                                        />
                                      </div>
                                    </div>
                                  )}
                                </>
                              )}
                              {!isAuthenticated() && (
                                <>
                                  {index === 8 - 1 && (
                                    <div className={Styles.ad_cont}>
                                      <div className={Styles.ad_box}>
                                        <div
                                          className={Styles.close}
                                          onClick={() => handelPricingModal()}
                                        >
                                          <CloseIcon />
                                        </div>
                                        <AdsComponent
                                          width={"100%"}
                                          height={"150px"}
                                          // adSize={"fix"}
                                          className={Styles.ad}
                                          adBy={"google"}
                                          dataAdSlot={"6613630953"}
                                        />
                                      </div>
                                    </div>
                                  )}
                                </>
                              )}
                            </>
                          </>
                        );
                      }
                    })}
                </div>
                {loadingMore && !productLoading && (
                  <div className={Styles.loadMoreLoader}>
                    <ClipLoader color={"#123abc"} />
                  </div>
                )}
              </div>
              <div className={Styles.similar_icons_cont}>
                {firstIcon && q && (
                  <>
                    <h3>Similar Icons</h3>
                    <div className={CommonStyle.icon_cards_wraper}>
                      {similarIcons?.products?.map((elem, index) => (
                        <IconCard
                          key={index}
                          lable={elem.label}
                          pro={elem.paid === 1 ? true : 0}
                          preView={
                            elem?.webpUrl ? elem?.webpUrl : elem?.previewUrl
                          }
                          addToBucket={true}
                          bucketData={bucketData}
                          isAuthenticated={isAuthenticated}
                          productId={elem?._id}
                          onClick={() => {
                            navigator(
                              `/icons/${replaceSpacesWithHyphens(
                                elem.label
                              )}?t=${type}&s=${elem.styleSet}`
                            );
                          }}
                        />
                      ))}
                    </div>
                  </>
                )}
                <div className={CommonStyle.pagination_cont}>
                  {getAllProdData.length > 0 &&
                  q &&
                  similarIcons?.pagination?.totalPages > 1 ? (
                    <ReactPaginate
                      breakLabel="..."
                      containerClassName={CommonStyle.pagination}
                      nextLabel={
                        <div className={CommonStyle.pagination_btn}>
                          <span>Next</span>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="21"
                            height="20"
                            viewBox="0 0 21 20"
                            fill="none"
                          >
                            <path
                              d="M7.5 4L13.5 10.5L7.5 17"
                              stroke="#7238FA"
                              stroke-width="2"
                            />
                          </svg>
                        </div>
                      }
                      onPageChange={handelPageChange}
                      pageRangeDisplayed={3}
                      pageCount={similarIcons?.pagination?.totalPages}
                      previousLabel={
                        <div className={CommonStyle.pagination_btn}>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="21"
                            height="20"
                            viewBox="0 0 21 20"
                            fill="none"
                          >
                            <path
                              d="M13.5 4L7.5 10.5L13.5 17"
                              stroke="#7238FA"
                              stroke-width="2"
                            />
                          </svg>
                          <span>Prev</span>
                        </div>
                      }
                      renderOnZeroPageCount={null}
                      activeClassName={CommonStyle.selected}
                      marginPagesDisplayed={2}
                    />
                  ) : (
                    ""
                  )}
                </div>
              </div>
            </div>
          )}
          {(q || keyWord) && !style && !type && !memberShip && (
            <div className={Styles.icon_results_cont}>
              {searchResultCount != 0 && !productLoading && (
                <div className={Styles.search_filter}>
                  <div className={Styles.top}>
                    <div className={Styles.dictonary_header}>
                      <h1>
                        {searchResultCount?.toLocaleString()} {q} icons
                      </h1>
                      <p>
                        Explore 90,000+ icons in 20+ unique styles. Download
                        icons in PNG, SVG, Animated SVG.
                      </p>
                    </div>
                  </div>
                </div>
              )}
              <div className={Styles.search_result_cont}>
                {searchResultCount == 0 && searchResultCount && (
                  <IconResultNotFound />
                )}
                {searchResult?.map((item, i) => (
                  <>
                    <div key={i} className={Styles.styleSet_wraper}>
                      <div className={Styles.search_result_icons_header}>
                        <h3
                          className={Styles.all_styles_header}
                        >{`${item?.type} ${item?.styleSet}  (${item?.count}) `}</h3>
                        <p
                          onClick={() =>
                            navigator(
                              `/icons?s=${item?.styleSet?.toLowerCase()}&t=${
                                item?.type
                              }&search=${q}`
                            )
                          }
                          className={Styles.view_all_icons}
                        >
                          View all results
                        </p>
                      </div>
                      <div className={CommonStyle.icon_cards_wraper}>
                        {item?.results.map((results, index) => (
                          <IconCard
                            key={index}
                            lable={results.label}
                            pro={results.paid === 1 ? true : 0}
                            preView={
                              results?.webpUrl
                                ? results?.webpUrl
                                : results?.previewUrl
                            }
                            addToBucket={true}
                            bucketData={bucketData}
                            isAuthenticated={isAuthenticated}
                            productId={results?._id}
                            onClick={() => {
                              navigator(
                                `/icons/${replaceSpacesWithHyphens(
                                  results.label
                                )}?t=${item?.type}&s=${item?.styleSet}`
                              );
                            }}
                          />
                        ))}
                      </div>
                      {!isAuthenticated() && (
                        <AdsComponent
                          width={"100%"}
                          height={"150px"}
                          // adSize={"fix"}
                          className={Styles.ad}
                          adBy={"google"}
                          dataAdSlot={"6613630953"}
                        />
                      )}
                      {userDet?.plan?.toLowerCase() == "basic" && (
                        <AdsComponent
                          width={"100%"}
                          height={"150px"}
                          // adSize={"fix"}
                          className={Styles.ad}
                          adBy={"google"}
                          dataAdSlot={"6613630953"}
                        />
                      )}
                    </div>
                  </>
                ))}
              </div>
            </div>
          )}
        </div>
        {isAllStyles && !style && !type && !q && !memberShip && !keyWord && (
          <>
            {userDet?.plan?.toLowerCase() == "basic" && (
              <div className={Styles.styleSet_ad_cont}>
                {/* <AdsComponent
                  dataAdSlot={"1677000018"}
                  height={"800px"}
                  width={"100%"}
                  adBy={"google"}
                  adSize={"fix"}
                /> */}
                <AdsComponent
                  width={"100%"}
                  height={"150px"}
                  // adSize={"fix"}
                  className={Styles.ad}
                  adBy={"google"}
                  dataAdSlot={"6613630953"}
                />
              </div>
            )}
            {!isAuthenticated() && (
              <div className={Styles.styleSet_ad_cont}>
                {/* <AdsComponent
                  dataAdSlot={"1677000018"}
                  height={"800px"}
                  width={"15rem"}
                  adBy={"google"}
                  adSize={"fix"}
                /> */}
                <AdsComponent
                  width={"100%"}
                  height={"150px"}
                  // adSize={"fix"}
                  className={Styles.ad}
                  adBy={"google"}
                  dataAdSlot={"6613630953"}
                />
              </div>
            )}
          </>
        )}
      </div>
      {ModalMain()}
      <ResponsiveModal
        isOpen={isPriceModalOpen}
        onClose={() => setIsPriceModalOpen(false)}
        closeOnOverlayClick={false}
        component={
          <PricingModal
            // iconName={iconDetails?.label}
            setIsPriceModalOpen={setIsPriceModalOpen}
          />
        }
      />
    </div>
  );
};

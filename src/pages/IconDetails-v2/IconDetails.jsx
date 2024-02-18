import React, { useState, useEffect, useRef } from "react";
import Styles from "./style.module.css";
import CommonStyle from "../../style/commonStyle.module.css";
import { format } from "date-fns";
import AdsComponent from "../../components/AdsComponent";

// Assets
import { CloseIcon, I } from "./assets/icons";

// Comonnents
import { LandingPageHeader } from "../LandingPage/LandingPageHeader";
import { IconPreview } from "./components";
import { IconCard } from "../../ui";
import LandingPageFooter from "../LandingPage/LandingPageFooter";
import PricingModal from "../../components/Pricing/PricingModal";

// Hooks
import { Helmet } from "react-helmet";
import {
  useParams,
  useNavigate,
  useSearchParams,
  Link,
} from "react-router-dom";
import { ResponsiveModal } from "../../components/ResponsiveModal";
import Modal from "../../containers/modal/modals";
import useProduct from "../../hooks/product/useProduct";
import ReactPaginate from "react-paginate";

import {
  isAuthenticated,
  replaceHyphensWithSpaces,
  replaceSpacesWithHyphens,
} from "../../../src/utils/helpers";
import UseBucket from "../../hooks/bucket/useBucket";
import useUser from "../../hooks/user/user";
import NavBar from "../../components/NavBar/NavBar";

export const IconDetails = () => {
  // Hooks
  const [isUserAuthenticated, setUserAuthenticated] = useState(
    isAuthenticated()
  );
  const [searchParams, setSearchParams] = useSearchParams();
  const { style, icon: qry } = useParams();
  const search = replaceHyphensWithSpaces(qry);
  const [label, setLabel] = useState(search);
  const { ModalMain, setIsLoginOpen } = Modal();
  const styleset = searchParams.get("s");
  const p = searchParams.get("p") || 1;
  const [iconStyleSet, setIconStyleSet] = useState(
    styleset ? styleset : "Standard"
  );
  const cat = searchParams.get("cat");
  const [currentCate, setCurrentCat] = useState(cat ? cat.split(",") : []);
  const type = searchParams.get("t");
  const [selectedType, setSelectedType] = useState(type || "Classic");
  const { UseProductGet } = useProduct();
  const [similarIcons, setSimilarIcons] = useState({});
  const [category, setCategory] = useState([]);
  const { UseGetProductByLabel, UseGetSimilarProduct } = useProduct();
  const navigator = useNavigate();
  const [loading, setLoading] = useState(false);
  const [iconDetails, setIconDetails] = useState(null);
  const [otherStyles, setOtherStyles] = useState([]);
  const [isAnimated, setAnimated] = useState(false);
  const [isPriceModalOpen, setIsPriceModalOpen] = useState(false);
  const windowWidth = useRef(window.innerWidth);
  const [bucketData, setBucketData] = useState([]);
  // Consts
  const tags = searchParams.get("tags");
  const [page, setPage] = useState(0);
  const { UseBucketList } = UseBucket();
  const { useGetProfile } = useUser();
  const { userDet, mutate } = useGetProfile();

  // /API Call

  const getAllBucketData = async (id) => {
    if (id) {
      const response = await UseBucketList({
        id: id.id ? id.id : id._id,
      });

      if (response && typeof response === "object") {
        setBucketData(response);
      }
    }
  };

  const getIcons = async (v, page) => {
    const data = {
      id: v,
    };
    if (page) {
      data["page"] = page;
    }

    const getData = await UseGetSimilarProduct(data);
    console.log(getData);
    setSimilarIcons(getData);
  };

  const getProductByLabel = async (label) => {
    setLoading(true);
    const data = await UseGetProductByLabel(label);
    const _icon =
      data?.find((_i) => _i.styleSet == styleset && _i.type == type) ||
      data?.[0];
    getIcons(_icon?._id, 1);
    setCategory(_icon?.category || []);
    setIconDetails(_icon);
    setLoading(false);
  };

  const scrollTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handelPricingModal = () => {
    if (windowWidth?.current > 600) {
      setIsPriceModalOpen(true);
    } else {
      navigator("/pricing");
    }
  };

  const handelPageChange = (event) => {
    setPage(Number(event.selected + 1));
    getIcons(iconDetails?._id, Number(event.selected + 1));
  };

  // UseEffect
  useEffect(() => {
    getProductByLabel(search);
    scrollTop();
  }, [search]);

  useEffect(() => {
    const id = JSON.parse(localStorage.getItem("user"));
    getAllBucketData(id);
  }, []);

  return (
    <div>
      <Helmet>
        <meta
          name="description"
          content={`${search} icon in the ${iconStyleSet} style. Best match with your design style. Available at openstroke icons now | The only atomic icon design system.`}
        />
        <title>{`${search} ${selectedType} ${iconStyleSet} Icon | Openstrokeicons.com`}</title>
        <meta
          property="og:title"
          content={`${search} ${selectedType} ${iconStyleSet} Icon Free Download Vector Svg | openstrokeicons.com`}
        />
        <meta
          property="og:description"
          content={`${search} icon in the ${iconStyleSet} style. Best match with your design style. Available at openstroke icons now | The only atomic icon design system.`}
        />
        <meta
          property="og:image"
          content={`https://openstroke-api-hgsvh.ondigitalocean.app/media/social/${search}?t=${selectedType}&s=${iconStyleSet}`}
        />
      </Helmet>
      <NavBar />
      {userDet?.plan?.toLowerCase() == "basic" && (
        <div className={CommonStyle.body_padding}>
          <div className={Styles.ad_box}>
            <div className={Styles.close} onClick={() => handelPricingModal()}>
              <CloseIcon />
            </div>
            <AdsComponent
              height={"5.625rem"}
              width={"100%"}
              adSize={"fix"}
              className={Styles.ad}
              adBy={"google"}
              dataAdSlot={"5049946463"}
            />
          </div>
        </div>
      )}

      {!isAuthenticated() && (
        <div className={CommonStyle.body_padding}>
          <div className={Styles.ad_box}>
            <div className={Styles.close} onClick={() => handelPricingModal()}>
              <CloseIcon />
            </div>
            <AdsComponent
              height={"5.625rem"}
              width={"100%"}
              adSize={"fix"}
              className={Styles.ad}
              adBy={"google"}
              dataAdSlot={"5049946463"}
            />
          </div>
        </div>
    
      )}

      <div className={`${CommonStyle.body_padding}`}>
        <IconPreview
          label={search}
          tags={tags}
          setIsLoginOpen={setIsLoginOpen}
          setOtherStyles={setOtherStyles}
          isAnimated={isAnimated}
          setAnimated={setAnimated}
          setIsPriceModalOpen={handelPricingModal}
          bucketData={bucketData}
          setBucketData={setBucketData}
        />
      </div>
      <div className={`${Styles.section_cont} ${CommonStyle.body_padding}`}>
        <h3>Similar Icons</h3>
        <div className={CommonStyle.icon_cards_wraper}>
          {similarIcons?.products?.map((elem, index) => (
            <IconCard
              key={index}
              lable={elem.label}
              pro={elem.paid === 1 ? true : 0}
              preView={elem?.webpUrl ? elem?.webpUrl : elem?.previewUrl}
              addToBucket={true}
              bucketData={bucketData}
              isAuthenticated={isAuthenticated}
              productId={elem?._id}
              onClick={() => {
                setAnimated(false);
                navigator(
                  `/icons/${replaceSpacesWithHyphens(
                    elem.label
                  )}?t=${selectedType}&s=${elem.styleSet}`
                );
              }}
            />
          ))}
        </div>
        <div className={CommonStyle.pagination_cont}>
          {similarIcons?.pagination?.totalPages > 1 ? (
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
      <div className={Styles.bottom_sec}>
        <div className={CommonStyle.body_padding}>
          <div className={Styles.icon_info_cont}>
            <h3>
              Icon Information <I />
            </h3>
            <p>
              This icon named “
              <span>
                <Link
                  to={`https://openstrokeicons.com/icons/${iconDetails?.label}?t=${iconDetails?.type}&s=${iconDetails?.styleSet}`}
                >
                  {iconDetails?.label}
                </Link>
              </span>
              ”is having{" "}
              <span onClick={() => navigator(`/pricing`)}>
                {iconDetails?.licence
                  ? iconDetails?.licence
                  : iconDetails?.paid == 1
                  ? "Royalty Free"
                  : "Creative Commons"}
              </span>{" "}
              license. It is available to be downloaded in SVG and PNG file
              formats (available sizes are 96, 72, 48, 32, 24, 16 pixel square
              sizes). <br /> <br /> This icons can be search by the following
              keywords:{" "}
              {iconDetails?.tags?.map((tag, i) => (
                <>
                  <span
                    key={i}
                    onClick={() =>
                      navigator(`/icons?t=Classic&s=standard&search=${tag}`)
                    }
                  >
                    {tag},
                  </span>{" "}
                </>
              ))}
              . <br /> <br /> This icon is also available in other styles:{" "}
              {otherStyles.map((icon, i) => (
                <span
                  key={i}
                  onClick={() => {
                    scrollTop();
                    navigator(
                      `/icons/${icon.label}?t=${icon?.type}&s=${icon?.styleSet}`
                    );
                  }}
                >{`${icon?.type} ${icon?.styleSet}, `}</span>
              ))}
              . <br /> <br /> This icon can be also Animated svg any of our
              styles:{" "}
              <span
                onClick={() => {
                  scrollTop();
                  setAnimated(true);
                  navigator(
                    `/icons/${iconDetails?.label}?t=Classic&s=Standard&an=draw`
                  );
                }}
              >
                Draw
              </span>
              ,{" "}
              <span
                onClick={() => {
                  scrollTop();
                  setAnimated(true);
                  navigator(
                    `/icons/${iconDetails?.label}?t=Classic&s=Standard&an=bumping`
                  );
                }}
              >
                Bumping
              </span>
              ,{" "}
              <span
                onClick={() => {
                  scrollTop();
                  setAnimated(true);
                  navigator(
                    `/icons/${iconDetails?.label}?t=Classic&s=Standard&an=beat`
                  );
                }}
              >
                Beat
              </span>
              ,{" "}
              <span
                onClick={() => {
                  scrollTop();
                  setAnimated(true);
                  navigator(
                    `/icons/${iconDetails?.label}?t=Classic&s=Standard&an=beatfade`
                  );
                }}
              >
                Beatfade
              </span>
              ,{" "}
              <span
                onClick={() => {
                  scrollTop();
                  setAnimated(true);
                  navigator(
                    `/icons/${iconDetails?.label}?t=Classic&s=Standard&an=shake`
                  );
                }}
              >
                Shake
              </span>
              ,{" "}
              <span
                onClick={() => {
                  scrollTop();
                  setAnimated(true);
                  navigator(
                    `/icons/${iconDetails?.label}?t=Classic&s=Standard&an=flip`
                  );
                }}
              >
                Flip
              </span>{" "}
              and{" "}
              <span
                onClick={() => {
                  scrollTop();
                  setAnimated(true);
                  navigator(
                    `/icons/${iconDetails?.label}?t=Classic&s=Standard&an=rotate`
                  );
                }}
              >
                Rotate
              </span>
              . <br />
              Note: All vector software does’t support animated SVG but you can
              use for production or on web and it will work pretty smooth.
              <br />
              <br /> This icon is part of “
              <span onClick={() => navigator(`/category/${category}`)}>
                {category}
              </span>
              ” category. All Free icons with Creative Commons 4.0 license
              attribution required (Example a link back to our website named “
              <Link to={"https://openstrokeicons.com/"}>
                <span>openstrokeicons.com</span>
              </Link>
              ”) and can be used for personal and commercial use while paid
              icons required{" "}
              <span onClick={() => navigator(`/pricing`)}>subscription </span>
              and icons will be Royalty Free. <br /> <br /> This icon is updated
              on{" "}
              {iconDetails?.updatedAt
                ? format(new Date(iconDetails?.updatedAt), "dd MMM, yyyy")
                : ""}
              . <br /> <br /> If you want this icon in other file format, It is
              very easy to copy SVG file and paste it other software like Figma,
              Adobe Illustrator, Adobe XD else simply download it SVG supports
              all of your favorite vector software.
              <br />
              <br />
              Best usage for: User interface design, user experience design,
              graphic design, print media, social media banners on facebook,
              twitter, instagram, logo design.
            </p>
          </div>
        </div>
      </div>
      {ModalMain()}
      <ResponsiveModal
        isOpen={isPriceModalOpen}
        onClose={() => setIsPriceModalOpen(false)}
        closeOnOverlayClick={false}
        component={
          <PricingModal
            iconName={iconDetails?.label}
            setIsPriceModalOpen={setIsPriceModalOpen}
          />
        }
      />
    </div>
  );
};

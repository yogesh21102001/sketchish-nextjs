import React, { useEffect, useState, useContext } from "react";
import Styles from "./style.module.css";
import CommonStyle from "../../../../style/commonStyle.module.css";
import { IconCard } from "../../../../ui";

// assets
import { AddIcon, LinkIcon, DownArrowFill, Reset, I } from "../../assets/icons";

// Hooks
import useProductProcessor from "../../../../hooks/product/useProductProcessor";
import useProduct from "../../../../hooks/product/useProduct";
import { isAuthenticated } from "../../../../utils/helpers";
import { useSearchParams } from "react-router-dom";
import AnimateController from "./MyAnimater/index";
import useUser from "../../../../hooks/user/user";
import AuthContext from "../../../../context/AuthProvider";
import { useNavigate } from "react-router-dom";
import UseBucket from "../../../../hooks/bucket/useBucket";
import { isEmpty } from "lodash";

// Componrnts
import { Popover } from "react-tiny-popover";
import { notifyError, notifySuccess } from "../../../../utils/notify";
import { Button } from "../../../../ui";
import ColorPicker from "../../../../components/ColorPicker/ColorPicker";
import Spinner from "../../../../components/spinner/spinner";
import { Link } from "react-router-dom";
import BucketList from "../../../../components/BucketList/BucketList";

const StrokeWidth = ({ isStrokeSize, setStrokeSize }) => {
  return (
    <div className={Styles.stroke_width_cont}>
      <button
        className={`${Styles.edit_btn} ${
          isStrokeSize == "4" ? Styles.stroke_active : ""
        }`}
        onClick={() => setStrokeSize(4)}
      >
        <p className={Styles.stroke_value}>4</p>
        <div className={`${Styles.stroke}`} style={{ width: "4px" }}></div>
      </button>
      <button
        className={`${Styles.edit_btn} ${
          isStrokeSize == "3.5" ? Styles.stroke_active : ""
        }`}
        onClick={() => setStrokeSize(3.5)}
      >
        <p className={Styles.stroke_value}>3.5</p>
        <div className={Styles.stroke} style={{ width: "3.5px" }}></div>
      </button>
      <button
        className={`${Styles.edit_btn} ${
          isStrokeSize == "3" ? Styles.stroke_active : ""
        }`}
        onClick={() => setStrokeSize(3)}
      >
        <p className={Styles.stroke_value}>3</p>
        <div className={Styles.stroke} style={{ width: "3px" }}></div>
      </button>
      <button
        className={`${Styles.edit_btn} ${
          isStrokeSize == "2.5" ? Styles.stroke_active : ""
        }`}
        onClick={() => setStrokeSize(2.5)}
      >
        <p className={Styles.stroke_value}>2.5</p>
        <div className={Styles.stroke} style={{ width: "2.5px" }}></div>
      </button>
      <button
        className={`${Styles.edit_btn} ${
          isStrokeSize == "2" ? Styles.stroke_active : ""
        }`}
        onClick={() => setStrokeSize(2)}
      >
        <p className={Styles.stroke_value}>2</p>
        <div className={Styles.stroke} style={{ width: "2px" }}></div>
      </button>
      <button
        className={`${Styles.edit_btn} ${
          isStrokeSize == "1.5" ? Styles.stroke_active : ""
        }`}
        onClick={() => setStrokeSize(1.5)}
      >
        <p className={Styles.stroke_value}>1.5</p>
        <div className={Styles.stroke} style={{ width: "1.5px" }}></div>
      </button>
      <button
        className={`${Styles.edit_btn} ${
          isStrokeSize == "1" ? Styles.stroke_active : ""
        }`}
        onClick={() => setStrokeSize(1)}
      >
        <p className={Styles.stroke_value}>1</p>
        <div className={Styles.stroke} style={{ width: "1px" }}></div>
      </button>
      <button
        className={`${Styles.edit_btn} ${
          isStrokeSize == "0.5" ? Styles.stroke_active : ""
        }`}
        onClick={() => setStrokeSize(0.5)}
      >
        <p className={Styles.stroke_value}>0.5</p>
        <div className={Styles.stroke} style={{ width: "0.5px" }}></div>
      </button>
    </div>
  );
};

export const IconPreview = ({
  setIsPriceModalOpen,
  label,
  tags,
  setIsLoginOpen,
  setOtherStyles,
  setAnimated,
  isAnimated,
  bucketData,
  setBucketData,
}) => {
  // Hooks
  const navigate = useNavigate();
  const { auth } = useContext(AuthContext);
  const [searchParams, setSearchParams] = useSearchParams();
  const [iconDetail, setIconDetail] = useState();
  const [isSize, setSize] = useState(48);
  const [isFileType, setFileType] = useState("svg");
  const [animatedOption, setAnimatedOption] = useState("synchronous");
  const [isPreview, setPreview] = useState();
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const [isStrokePopoverOpen, setIsStrokePopoverOpen] = useState(false);
  const { UseGetProductByLabel, UseSetProdDet, getDownloadProduct } =
    useProduct();

  const [productId, setProductId] = useState(false);
  const [productRelatedIcon, setProductRelatedIcon] = useState([]);
  const styleset = searchParams.get("s");
  const animation = searchParams.get("an");
  const type = searchParams.get("t");
  const { processSimpSVG } = useProductProcessor();
  const [detailOfProduct, setDetailOfProduct] = useState(null);
  const [userHistory, setUserHistory] = useState([]);
  const { UseDownloadHistory } = useUser();
  const [colors, setColors] = useState(["rgb(30, 48, 80)"]);
  const [newColors, setNewColors] = useState([]);
  const [isBGColor, setBGColor] = useState("notset");
  const [isStrokeSize, setStrokeSize] = useState(
    styleset?.toLowerCase() == "slim"
      ? 1.0
      : styleset?.toLowerCase() == "light"
      ? 1.5
      : 2.0
  );
  const [AnimateC, setAnimateC] = useState();
  const [paid, setPaid] = useState();
  const [licenceType, setLicenceType] = useState("");
  const [open, setOpen] = useState(false);
  const [moreStyles, setMoreStyles] = useState([]);
  const [colorPickerIndex, setColorPickerIndex] = useState(null);
  const { UseBucketList, UseAddBucketIcons, UseAddBucketIconsFav } =
    UseBucket();
  const [loading, setLoading] = useState(false);
  const [id, setId] = useState("");
  const [isUserAuthenticated, setUserAuthenticated] = useState(
    isAuthenticated()
  );
  const [animationType, setAnimationType] = useState(
    styleset != "Solid" && styleset != "Duotone" ? "draw" : "bumping"
  );

  // API Calls
  const getProductByLabel = async (label) => {
    setNewColors(colors);
    setLoading(true);
    const data = await UseGetProductByLabel(label);

    const _icon =
      data?.find((_i) => _i.styleSet == styleset && _i.type == type) ||
      data?.[0];
    setMoreStyles(data);
    setOtherStyles(data);
    setProductRelatedIcon(data);
    setPaid(_icon?.paid);
    setLicenceType(_icon?.licence);
    setIconDetail(_icon);
    setPreview(_icon?.previewUrl);
    setProductId(_icon?._id);
    setLoading(false);
  };

  const getDetailProduct = async (id) => {
    try {
      if (isUserAuthenticated) {
        const data = await UseSetProdDet(id);
        if (data) setDetailOfProduct(data);
      } else {
        console.log("User is not authenticated.");
      }
    } catch (error) {
      console.log("Error occurred:", error);
    }
  };

  const addBucketIcons = async (userId, buketId) => {
    const payloadData = {
      userId: userId,
      bucketId: buketId,
      productVariantId: productId,
    };
    const response = await UseAddBucketIcons(payloadData);
    if (response == "Product already in bucket!") {
      notifySuccess(response);
    } else if (response == "OK") {
      notifySuccess("Product Icon added to Bucket.");
    }
  };

  const addBucketIconsFav = async () => {
    const payloadData = {
      userId: id.id ? id.id : id._id,
      productVariantId: productId,
    };
    const response = await UseAddBucketIconsFav(payloadData);
    if (response == "Product already in bucket!") {
      notifySuccess(response);
    } else if (response == "OK") {
      notifySuccess("Product Icon add your Bucket!");
    }
  };

  const getUserHistory = async () => {
    try {
      if (isUserAuthenticated) {
        const data = await UseDownloadHistory();
        const filteredData = data?.filter((e) => e?.productId == productId);
        setUserHistory(filteredData);
      }
    } catch (err) {}
  };

  // Handlers
  const checkAuth = () => {
    if (!isAuthenticated()) {
      setIsLoginOpen(true);
      return false;
    }
    return true;
  };
  const { userLimit } = auth;

  const checkLimit = () => {
    if (!isAuthenticated()) {
      setIsLoginOpen(true);
      return false;
    }
    if (!userLimit?.isDownloadble) {
      notifyError("Limit exceeded! Upgrade to Continue");
    }
    return userLimit?.isDownloadble;
  };

  const handleSizeChange = (v) => {
    if (checkAuth()) {
      setSize(v);
    }
  };

  const handleFormate = (v) => {
    if (checkAuth()) {
      setFileType(v);
      const params = new URLSearchParams(searchParams);
      params.delete("an");
      setSearchParams(params?.toString());
      setAnimated(false);
    }
  };

  const handleOptions = (v) => {
    if (checkAuth()) {
      setAnimatedOption(v);
    }
  };

  const resetAll = () => {
    setSize(48);
    setStrokeSize(
      styleset?.toLowerCase() == "slim"
        ? 1.0
        : styleset?.toLowerCase() == "light"
        ? 1.5
        : 2.0
    );
    setNewColors(colors);
  };

  const handleAnimater = (v) => {
    if (checkAuth()) {
      if (userLimit?.planName?.toLowerCase() != "basic") {
        if (paid) {
          if (userLimit?.isDownloadble) {
            if (v == "static") {
              const params = new URLSearchParams(searchParams);
              params.delete("an");
              setSearchParams(params?.toString());
              setAnimated(false);
            } else {
              const res = _productRelatedIcon.find(
                (_p) => _p.styleSet?.toLowerCase() == styleset?.toLowerCase()
              );
              if (res) {
                setProductId(res._id);
                setPaid(res?.paid);
                setLicenceType(res?.licence);
                setIconDetail(res);
                setPreview(res.previewUrl);
                resetAll();
                const params = new URLSearchParams(searchParams);
                if (paid) {
                  if (checkLimit()) {
                    params.set("an", animationType);
                    setAnimated(true);
                  }
                } else {
                  params.set("an", animationType);
                  setAnimated(true);
                }
                setSearchParams(params?.toString());
              }
            }
          } else {
            setIsPriceModalOpen();
          }
        } else {
          if (v == "static") {
            const params = new URLSearchParams(searchParams);
            params.delete("an");
            setSearchParams(params?.toString());
            setAnimated(false);
          } else {
            const res = _productRelatedIcon.find(
              (_p) => _p.styleSet?.toLowerCase() == styleset?.toLowerCase()
            );
            if (res) {
              setProductId(res._id);
              setPaid(res?.paid);
              setLicenceType(res?.licence);
              setIconDetail(res);
              setPreview(res.previewUrl);
              resetAll();
              const params = new URLSearchParams(searchParams);
              if (paid) {
                if (checkLimit()) {
                  params.set("an", animationType);
                  setAnimated(true);
                }
              } else {
                params.set("an", animationType);
                setAnimated(true);
              }
              setSearchParams(params?.toString());
            }
          }
        }
      } else {
        setIsPriceModalOpen(true);
      }
    }
  };

  const handleAnimaterType = (v) => {
    const params = new URLSearchParams(searchParams);
    params.set("an", v);
    setSearchParams(params?.toString());
    setAnimationType(v);
  };

  const handleDownload = async ({ id, isCopy }) => {
    const setPreferences = {
      id,
      name: label,
      type: isFileType,
      size: isSize,
      isCopy,
      searchKeyword: tags,
      strokeWidth: isStrokeSize,
      bgColor: isBGColor,
      brokeStroke: false,
      oldColors: colors,
      newColors: newColors,
      animated: isAnimated,
    };
    if (checkAuth()) {
      const usr = isAuthenticated();
      getDownloadProduct(setPreferences);
      if (isAnimated) {
        if (isCopy) {
          AnimateC.copy();
          notifySuccess("Copied to your clipboard");
        } else {
          AnimateC.download();
        }
      }
    }
  };

  const handleCopyPng = async ({ id, isSize, isCopy = true }) => {
    const setPreferences = {
      id,
      name: label,
      type: "png",
      size: isSize,
      isCopy: isCopy,
      searchKeyword: tags,
      strokeWidth: isStrokeSize,
      bgColor: isBGColor,
      brokeStroke: false,
      oldColors: colors,
      newColors: newColors,
      animated: false,
    };
    if (checkAuth()) {
      getDownloadProduct(setPreferences);
    }
  };

  const copyUrl = async (url) => {
    await navigator.clipboard.writeText(
      window.location.protocol +
        "//" +
        window.location.host +
        "/icons/" +
        iconDetail?.label +
        "?t=" +
        type +
        "&s=" +
        iconDetail?.styleSet
    );
    notifySuccess("Copied to your clipboard");
  };

  const handleStyleChange = (v) => {
    const params = new URLSearchParams(searchParams);
    params.set("s", v?.s);
    params.set("t", v?.t);
    params.delete("a");
    setSearchParams(params?.toString());
    setAnimated(false);
    setStrokeSize(
      v?.s?.toLowerCase() == "slim"
        ? 1.0
        : v?.s?.toLowerCase() == "light"
        ? 1.5
        : 2.0
    );
  };

  const handleStrokeChange = (v) => {
    if (checkAuth()) {
      if (paid) {
        if (userLimit?.isDownloadble) {
          setStrokeSize(v);
        } else {
          setIsPriceModalOpen();
        }
      } else {
        setStrokeSize(v);
      }
    }
  };

  const handleColorChange = (index, color) => {
    const newColorsCopy = [...newColors];
    newColorsCopy[index] = color;

    setNewColors(newColorsCopy);
  };

  const handleBucketChange = async (v) => {
    setIsPopoverOpen(false);
    if (checkAuth()) {
      if (v === "Favorite") {
        await addBucketIconsFav();
      } else {
        const localUser = JSON.parse(localStorage.getItem("user"));
        await addBucketIcons(localUser.id || localUser._id, v);
      }
    }
  };

  const hendleDefaultAnimation = (animation) => {
    const params = new URLSearchParams(searchParams);
    if (animation && isAuthenticated()) {
       if (userLimit?.planName?.toLowerCase() != "basic") {
         setAnimated(true);
         setAnimationType(animation);
       } else {
         setIsPriceModalOpen(true);
         params.delete("an");
         setSearchParams(params?.toString());
       }
      
    }else{
      params.delete("an");
      setSearchParams(params?.toString());
    }
  };

  // UseEffects//

  useEffect(() => {
    getProductByLabel(label);
  }, [label, styleset, type]);

  useEffect(() => {
    getUserHistory();
  }, [auth, productId]);

  const previewHandler = () => {
    if (detailOfProduct?.variant?.svg) {
      const res = processSimpSVG(
        detailOfProduct?.variant?.svg,
        isBGColor,
        isStrokeSize,
        colors,
        newColors
      );
      if (isAnimated) {
        const _animate = new AnimateController(
          label,
          "IconPage_iconWraper_svg"
        );
        setAnimateC(_animate);

        if (animationType == "draw") {
          if (animatedOption == "oneByOne") {
            _animate.draw({ type: "oneByOne" });
          } else {
            _animate.draw({});
          }
        } else {
          _animate.otherAntmationType({ type: animationType });
        }
      }
      if (res && userLimit?.isDownloadble) {
        setPreview(res.svg);
        setColors(res.oldColor);
        if (newColors.length === 0) setNewColors(res.oldColor);
        if (newColors.length !== 0 && res.oldColor.length !== newColors.length)
          setNewColors(res.oldColor);
      } else {
        if (paid) {
          setColors(["#1E3050"]);
          setPreview(
            iconDetail?.previewUrl
              ? iconDetail?.previewUrl
              : iconDetail?.variant?.previewUrl
          );
        } else {
          setPreview(res.svg);
          setColors(res.oldColor);
          if (newColors.length === 0) setNewColors(res.oldColor);
          if (
            newColors.length !== 0 &&
            res.oldColor.length !== newColors.length
          )
            setNewColors(res.oldColor);
        }
      }
    }
  };

  useEffect(() => {
    previewHandler();
  }, [
    animatedOption,
    animationType,
    isAnimated,
    isBGColor,
    newColors,
    isStrokeSize,
    userLimit?.isDownloadble,
    detailOfProduct?.variant?.svg,
  ]);

  useEffect(() => {
    if (productId) {
      getDetailProduct(productId);
      setUserAuthenticated(isAuthenticated());
    }
  }, [productId, auth]);

  useEffect(() => {
    const id = JSON.parse(localStorage.getItem("user"));
    setId(id);
    console.log(!type && !styleset);
    if (!type && !styleset) {
      const params = new URLSearchParams(searchParams);
      params.set("t", "Classic");
      params.set("s", "Standard");
      setSearchParams(params?.toString());
    }

  }, []);

  useEffect(() => {
    hendleDefaultAnimation(animation);
  }, [animation]);

  // Check paid icon in history of user

  const _productRelatedIcon = productRelatedIcon?.filter(
    (_pI) => _pI.type?.toLowerCase() === type?.toLowerCase()
  );
  return (
    <div className={Styles.wraper}>
      <div className={Styles.icon_preview_cont}>
        <div className={Styles.icon_preview}>
          <div className={Styles.preview_header}>
            <div className={Styles.name}>
              <h1>{label}</h1>
              <div
                data-tooltip-id="stroke"
                data-tooltip-content={licenceType}
                className={Styles.badg}
              >
                {paid ? " Pro" : "Free"}
              </div>
              <div
                className={Styles.copy_link_btn}
                data-tooltip-id="stroke"
                data-tooltip-content="Copy Link"
                onClick={() => copyUrl()}
              >
                <LinkIcon />
              </div>
            </div>
            <div className={Styles.sub_heading}>
              <div className={Styles.tags}>
                {iconDetail?.category.map((category, index) => (
                  <p
                    key={index}
                    data-tooltip-id="stroke"
                    data-tooltip-content={`${category} icons`}
                    onClick={() => navigate(`/category/${category}`)}
                  >
                    {category}
                  </p>
                ))}
              </div>
              <p
                data-tooltip-id="stroke"
                data-tooltip-content="Something wrong? We’ll fix it. "
              >
                <Link to={"https://discord.com/invite/QN3Zwf4KWK"}>report</Link>
              </p>
            </div>
          </div>
          <div className={Styles.preview}>
            <div className={Styles.btn_cont}>
              <Popover
                isOpen={isPopoverOpen}
                content={
                  <BucketList
                    bucketData={bucketData}
                    handleBucketChange={handleBucketChange}
                  />
                }
                onClickOutside={() => setIsPopoverOpen(false)}
                positions={["bottom", "right"]}
              >
                <button
                  className={Styles.add_btn}
                  onClick={() => {
                    setIsPopoverOpen(!isPopoverOpen);
                  }}
                >
                  <AddIcon
                    className={`${Styles.add_icon} ${
                      isPopoverOpen ? Styles.rotate : ""
                    }`}
                  />
                </button>
              </Popover>
            </div>
            <div className={Styles.icon_cont}>
              <div
                id="IconPage_iconWraper_svg"
                className={
                  isAnimated
                    ? `IconPage_iconWraper i${isSize}px`
                    : "IconPage_iconWraper hidden"
                }
              ></div>
              {loading && !isAnimated ? (
                <Spinner />
              ) : (
                <>
                  {!isAnimated ? (
                    <img
                      className={Styles[`i${isSize}px`]}
                      src={
                        isPreview === undefined
                          ? iconDetail?.previewUrl?.replace(
                              "prod2/prod2",
                              "prod2"
                            )
                          : isPreview?.replace("prod2/prod2", "prod2")
                      }
                      alt=""
                    />
                  ) : (
                    ""
                  )}
                </>
              )}
            </div>
            <div className={Styles.edit_cont}>
              <div className={Styles.lft}>
                {styleset == "Solid" || styleset == "Duotone" ? (
                  ""
                ) : (
                  <>
                    <div className={Styles.stroke_cont}>
                      <Popover
                        isOpen={isStrokePopoverOpen}
                        content={
                          <StrokeWidth
                            setIsPopoverOpen={setIsStrokePopoverOpen}
                            setStrokeSize={handleStrokeChange}
                            isStrokeSize={isStrokeSize}
                          />
                        }
                        onClickOutside={() => setIsStrokePopoverOpen(false)}
                        positions={["top", "right"]}
                      >
                        <button
                          className={Styles.edit_btn}
                          data-tooltip-id="stroke"
                          data-tooltip-content="Stroke Weight"
                          onClick={() =>
                            setIsStrokePopoverOpen(!isStrokePopoverOpen)
                          }
                        >
                          <DownArrowFill
                            className={`${Styles.color_btn_svg}  ${
                              Styles.stroke_btn_svg
                            } ${
                              isStrokePopoverOpen
                                ? Styles.stroke_svg_rotate
                                : ""
                            }`}
                          />
                        </button>
                      </Popover>
                    </div>
                    <div className={Styles.devide_line}></div>
                  </>
                )}

                <div className={Styles.stroke_cont}>
                  {colors?.map((color, index) => {
                    return (
                      <Popover
                        key={index}
                        isOpen={colorPickerIndex === index}
                        positions={["top"]}
                        padding={10}
                        onClickOutside={() => setColorPickerIndex(null)}
                        content={
                          <ColorPicker
                            initialColor={newColors[index]}
                            picker={"sketch"}
                            onChange={(e) => {
                              if (!isAuthenticated())
                                return setIsLoginOpen(true);
                              // if (!userLimit?.isDownloadble) {
                              //   setOpen(false);
                              //   return;
                              // }
                              handleColorChange(index, e);
                            }}
                          />
                        }
                      >
                        <button
                          className={Styles.edit_btn}
                          data-tooltip-id="stroke"
                          data-tooltip-content="Change Color"
                          style={{ backgroundColor: `${newColors[index]}` }}
                          onClick={() => {
                            if (!isAuthenticated()) return setIsLoginOpen(true);
                            if (paid) {
                              if (!userLimit?.isDownloadble) {
                                setOpen(false);
                                setIsPriceModalOpen();
                                return;
                              } else {
                                setColorPickerIndex(
                                  colorPickerIndex === index ? null : index
                                );
                              }
                            } else {
                              setColorPickerIndex(
                                colorPickerIndex === index ? null : index
                              );
                            }
                          }}
                        >
                          <DownArrowFill className={Styles.color_btn_svg} />
                        </button>
                      </Popover>
                    );
                  })}
                </div>
              </div>
              <button
                className={Styles.edit_btn}
                data-tooltip-id="stroke"
                data-tooltip-content="Reset All"
                onClick={() => resetAll()}
              >
                <Reset />
              </button>
            </div>
          </div>
        </div>
        <div className={Styles.icon_customize}>
          <div className={Styles.edit_Options_cont}>
            <div className={Styles.edit_Options}>
              <p>file format</p>
              <div className={Styles.options}>
                <div
                  className={`${Styles.option} ${
                    isFileType == "svg" ? Styles.option_active : ""
                  }`}
                  onClick={() => handleFormate("svg")}
                >
                  .SVG
                </div>
                <div
                  className={`${Styles.option} ${
                    isFileType == "png" ? Styles.option_active : ""
                  }`}
                  onClick={() => handleFormate("png")}
                >
                  .PNG
                </div>
                {/* <div
                  className={`${Styles.option} ${
                    isFileType == "gif" ? Styles.option_active : ""
                  }`}
                  onClick={() => handleFormate("gif")}
                >
                  .GIF
                </div> */}
              </div>
            </div>
            {isFileType == "svg" ? (
              <>
                <div className={Styles.edit_Options}>
                  <p>file type</p>
                  <div className={Styles.options}>
                    <div
                      className={`${Styles.option} ${
                        !isAnimated ? Styles.option_active : ""
                      }`}
                      onClick={() => handleAnimater("static")}
                    >
                      Static
                    </div>
                    <div
                      className={`${Styles.option} ${
                        isAnimated ? Styles.option_active : ""
                      }`}
                      onClick={() => handleAnimater("animated")}
                    >
                      Animated
                    </div>
                  </div>
                </div>
                {isAnimated ? (
                  <>
                    <div className={Styles.edit_Options}>
                      <p>style</p>
                      <div className={Styles.options}>
                        {styleset != "Solid" && styleset != "Duotone" ? (
                          <div
                            className={`${Styles.option} ${
                              animationType == "draw"
                                ? Styles.option_active
                                : ""
                            }`}
                            onClick={() => handleAnimaterType("draw")}
                          >
                            Draw
                          </div>
                        ) : (
                          ""
                        )}

                        <div
                          className={`${Styles.option} ${
                            animationType == "bumping"
                              ? Styles.option_active
                              : ""
                          }`}
                          onClick={() => handleAnimaterType("bumping")}
                        >
                          Bumping
                        </div>
                        <div
                          className={`${Styles.option} ${
                            animationType == "beat" ? Styles.option_active : ""
                          }`}
                          onClick={() => handleAnimaterType("beat")}
                        >
                          Beat
                        </div>
                        <div
                          className={`${Styles.option} ${
                            animationType == "beatfade"
                              ? Styles.option_active
                              : ""
                          }`}
                          onClick={() => handleAnimaterType("beatfade")}
                        >
                          Beatfade
                        </div>
                        <div
                          className={`${Styles.option} ${
                            animationType == "shake" ? Styles.option_active : ""
                          }`}
                          onClick={() => handleAnimaterType("shake")}
                        >
                          Shake
                        </div>
                        <div
                          className={`${Styles.option} ${
                            animationType == "flip" ? Styles.option_active : ""
                          }`}
                          onClick={() => handleAnimaterType("flip")}
                        >
                          Flip
                        </div>
                        <div
                          className={`${Styles.option} ${
                            animationType == "rotate"
                              ? Styles.option_active
                              : ""
                          }`}
                          onClick={() => handleAnimaterType("rotate")}
                        >
                          Rotate
                        </div>
                      </div>
                    </div>
                    {animationType == "draw" && (
                      <div className={Styles.edit_Options}>
                        <p>animated options</p>
                        <div className={Styles.options}>
                          <div
                            className={`${Styles.option} ${
                              animatedOption == "synchronous"
                                ? Styles.option_active
                                : ""
                            }`}
                            onClick={() => handleOptions("synchronous")}
                          >
                            Synchronous
                          </div>
                          <div
                            className={`${Styles.option} ${
                              animatedOption == "oneByOne"
                                ? Styles.option_active
                                : ""
                            }`}
                            onClick={() => handleOptions("oneByOne")}
                          >
                            One by one
                          </div>
                        </div>
                      </div>
                    )}
                  </>
                ) : (
                  ""
                )}
              </>
            ) : (
              ""
            )}
            <div className={`${Styles.edit_Options} ${Styles.icon_size}`}>
              <p>icon size</p>
              <div className={Styles.options}>
                <div
                  className={`${Styles.option} ${
                    isSize == 16 ? Styles.option_active : ""
                  }`}
                  onClick={() => handleSizeChange(16)}
                >
                  16
                </div>
                <div
                  className={`${Styles.option} ${
                    isSize == 24 ? Styles.option_active : ""
                  }`}
                  onClick={() => handleSizeChange(24)}
                >
                  24
                </div>
                <div
                  className={`${Styles.option} ${
                    isSize == 32 ? Styles.option_active : ""
                  }`}
                  onClick={() => handleSizeChange(32)}
                >
                  32
                </div>
                <div
                  className={`${Styles.option} ${
                    isSize == 48 ? Styles.option_active : ""
                  }`}
                  onClick={() => handleSizeChange(48)}
                >
                  48
                </div>
                <div
                  className={`${Styles.option} ${
                    isSize == 72 ? Styles.option_active : ""
                  }`}
                  onClick={() => handleSizeChange(72)}
                >
                  72
                </div>
                <div
                  className={`${Styles.option} ${
                    isSize == 96 ? Styles.option_active : ""
                  }`}
                  onClick={() => handleSizeChange(96)}
                >
                  96
                </div>
              </div>
            </div>
          </div>
          <div className={Styles.action_btns}>
            {paid ? (
              <>
                <Button
                  onClick={() => {
                    if (checkAuth()) {
                      if (isFileType == "png") {
                        handleDownload({ id: productId, isCopy: false });
                      } else if (userHistory.length > 0) {
                        handleDownload({ id: productId, isCopy: false });
                      } else {
                        if (userLimit?.isDownloadble) {
                          handleDownload({ id: productId, isCopy: false });
                        } else {
                          setIsPriceModalOpen();
                        }
                      }
                    }
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
                      d="M3 8.6L9.99999 15M9.99999 15L17 8.6M9.99999 15V1"
                      stroke="#1E3050"
                      stroke-width="2"
                    />
                    <path d="M17 19H3" stroke="#1E3050" stroke-width="2" />
                  </svg>
                  {isFileType}
                </Button>
                {isFileType != "gif" ? (
                  <>
                    <Button
                      style={{ flex: 1 }}
                      highlight={true}
                      onClick={() => {
                        if (checkAuth()) {
                          if (isFileType == "png") {
                            handleDownload({ id: productId, isCopy: true });
                          } else if (userHistory.length > 0) {
                            handleDownload({ id: productId, isCopy: true });
                          } else {
                            if (userLimit?.isDownloadble) {
                              handleDownload({ id: productId, isCopy: true });
                            } else {
                              setIsPriceModalOpen();
                            }
                          }
                        }
                      }}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="21"
                        height="20"
                        viewBox="0 0 21 20"
                        fill="none"
                      >
                        <path
                          d="M5.5 3H2.5V17C2.5 18.1046 3.39543 19 4.5 19H16.5V16"
                          stroke="white"
                          stroke-width="2"
                          stroke-linejoin="round"
                        />
                        <path
                          d="M5.5 16H18.5V4L15.5 1H5.5V16Z"
                          stroke="white"
                          stroke-width="2"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                      </svg>
                      Copy {isFileType}
                    </Button>
                  </>
                ) : (
                  ""
                )}
              </>
            ) : (
              <>
                <Button
                  highlight={isFileType == "gif" ? true : false}
                  onClick={() =>
                    handleDownload({ id: productId, isCopy: false })
                  }
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                  >
                    <path
                      d="M3 8.6L9.99999 15M9.99999 15L17 8.6M9.99999 15V1"
                      stroke="#1E3050"
                      stroke-width="2"
                    />
                    <path d="M17 19H3" stroke="#1E3050" stroke-width="2" />
                  </svg>
                  {isFileType} free
                </Button>

                {isFileType != "gif" && (
                  <Button
                    style={{ flex: 1 }}
                    highlight={true}
                    onClick={() =>
                      handleDownload({ id: productId, isCopy: true })
                    }
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="21"
                      height="20"
                      viewBox="0 0 21 20"
                      fill="none"
                    >
                      <path
                        d="M5.5 3H2.5V17C2.5 18.1046 3.39543 19 4.5 19H16.5V16"
                        stroke="white"
                        stroke-width="2"
                        stroke-linejoin="round"
                      />
                      <path
                        d="M5.5 16H18.5V4L15.5 1H5.5V16Z"
                        stroke="white"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>{" "}
                    Copy {isFileType}
                  </Button>
                )}
              </>
            )}
          </div>
        </div>
      </div>
      {!isAuthenticated() ? (
        <div className={Styles.preview_bottom}>
          <I />
          <p>Login to customise this icon for better experience.</p>
        </div>
      ) : (
        ""
      )}
      <div className={`${CommonStyle.body_padding} ${Styles.more_style}`}>
        <h3>MORE STYLES</h3>
        <div className={CommonStyle.icon_cards_wraper}>
          {moreStyles?.map((elem, index) => (
            <IconCard
              key={index}
              pro={elem?.paid ? true : false}
              preView={elem?.webpUrl ? elem?.webpUrl : elem?.previewUrl}
              lable={`${elem?.type} ${elem?.styleSet}`}
              onClick={() =>
                handleStyleChange({ t: elem?.type, s: elem?.styleSet })
              }
              active={
                styleset == elem?.styleSet && type == elem?.type ? true : false
              }
              hover={false}
            />
          ))}
        </div>
      </div>
      <div
        className={`${Styles.png_download_sec} ${CommonStyle.body_padding} ${Styles.more_style}`}
        id="copypng"
      >
        <h3>COPY PNG FILE FOR FREE</h3>
        <div className={CommonStyle.icon_cards_wraper}>
          <div
            className={Styles.png_card}
            onClick={() => handleCopyPng({ id: productId, isSize: 96 })}
          >
            <div className={Styles.png_img_cont}>
              <img
                // className={Styles[`i96px`]}
                style={{ height: "96px", width: "96px" }}
                src={iconDetail?.webpUrl?.replace("prod2/prod2", "prod2")}
                alt=""
              />
            </div>
            <div className={Styles.png_img_action}>
              <div className={Styles.copy_png}>
                <p className={Styles.ratio}>96 x 96</p>

                <p className={Styles.copy_text}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="21"
                    height="20"
                    viewBox="0 0 21 20"
                    fill="none"
                  >
                    <path
                      d="M5.5 3H2.5V17C2.5 18.1046 3.39543 19 4.5 19H16.5V16"
                      stroke="#1E3050"
                      stroke-width="2"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M5.5 16H18.5V4L15.5 1H5.5V16Z"
                      stroke="#1E3050"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                  COPY FILE
                </p>
              </div>
            </div>
          </div>
          <div
            className={Styles.png_card}
            onClick={() => handleCopyPng({ id: productId, isSize: 72 })}
          >
            <div className={Styles.png_img_cont}>
              <img
                // className={Styles[`i96px`]}
                style={{ height: "72px", width: "72px" }}
                src={iconDetail?.webpUrl?.replace("prod2/prod2", "prod2")}
                alt=""
              />
            </div>
            <div className={Styles.png_img_action}>
              <div className={Styles.copy_png}>
                <p className={Styles.ratio}>72 x 72</p>

                <p className={Styles.copy_text}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="21"
                    height="20"
                    viewBox="0 0 21 20"
                    fill="none"
                  >
                    <path
                      d="M5.5 3H2.5V17C2.5 18.1046 3.39543 19 4.5 19H16.5V16"
                      stroke="#1E3050"
                      stroke-width="2"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M5.5 16H18.5V4L15.5 1H5.5V16Z"
                      stroke="#1E3050"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                  COPY FILE
                </p>
              </div>
            </div>
          </div>
          <div
            className={Styles.png_card}
            onClick={() => handleCopyPng({ id: productId, isSize: 48 })}
          >
            <div className={Styles.png_img_cont}>
              <img
                // className={Styles[`i96px`]}
                style={{ height: "48px", width: "48px" }}
                src={iconDetail?.webpUrl?.replace("prod2/prod2", "prod2")}
                alt=""
              />
            </div>
            <div className={Styles.png_img_action}>
              <div className={Styles.copy_png}>
                <p className={Styles.ratio}>48 x 48</p>

                <p className={Styles.copy_text}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="21"
                    height="20"
                    viewBox="0 0 21 20"
                    fill="none"
                  >
                    <path
                      d="M5.5 3H2.5V17C2.5 18.1046 3.39543 19 4.5 19H16.5V16"
                      stroke="#1E3050"
                      stroke-width="2"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M5.5 16H18.5V4L15.5 1H5.5V16Z"
                      stroke="#1E3050"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                  COPY FILE
                </p>
              </div>
            </div>
          </div>
          <div
            className={Styles.png_card}
            onClick={() => handleCopyPng({ id: productId, isSize: 32 })}
          >
            <div className={Styles.png_img_cont}>
              <img
                // className={Styles[`i96px`]}
                style={{ height: "32px", width: "32px" }}
                src={iconDetail?.webpUrl?.replace("prod2/prod2", "prod2")}
                alt=""
              />
            </div>
            <div className={Styles.png_img_action}>
              <div className={Styles.copy_png}>
                <p className={Styles.ratio}>32 x 32</p>

                <p className={Styles.copy_text}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="21"
                    height="20"
                    viewBox="0 0 21 20"
                    fill="none"
                  >
                    <path
                      d="M5.5 3H2.5V17C2.5 18.1046 3.39543 19 4.5 19H16.5V16"
                      stroke="#1E3050"
                      stroke-width="2"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M5.5 16H18.5V4L15.5 1H5.5V16Z"
                      stroke="#1E3050"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                  COPY FILE
                </p>
              </div>
            </div>
          </div>
          <div
            className={Styles.png_card}
            onClick={() => handleCopyPng({ id: productId, isSize: 24 })}
          >
            <div className={Styles.png_img_cont}>
              <img
                // className={Styles[`i96px`]}
                style={{ height: "24px", width: "24px" }}
                src={iconDetail?.webpUrl?.replace("prod2/prod2", "prod2")}
                alt=""
              />
            </div>
            <div className={Styles.png_img_action}>
              <div className={Styles.copy_png}>
                <p className={Styles.ratio}>24 x 24</p>

                <p className={Styles.copy_text}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="21"
                    height="20"
                    viewBox="0 0 21 20"
                    fill="none"
                  >
                    <path
                      d="M5.5 3H2.5V17C2.5 18.1046 3.39543 19 4.5 19H16.5V16"
                      stroke="#1E3050"
                      stroke-width="2"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M5.5 16H18.5V4L15.5 1H5.5V16Z"
                      stroke="#1E3050"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                  COPY FILE
                </p>
              </div>
            </div>
          </div>
          <div
            className={Styles.png_card}
            onClick={() => handleCopyPng({ id: productId, isSize: 16 })}
          >
            <div className={Styles.png_img_cont}>
              <img
                // className={Styles[`i96px`]}
                style={{ height: "16px", width: "16px" }}
                src={iconDetail?.webpUrl?.replace("prod2/prod2", "prod2")}
                alt=""
              />
            </div>
            <div className={Styles.png_img_action}>
              <div className={Styles.copy_png}>
                <p className={Styles.ratio}>16 x 16</p>

                <p className={Styles.copy_text}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="21"
                    height="20"
                    viewBox="0 0 21 20"
                    fill="none"
                  >
                    <path
                      d="M5.5 3H2.5V17C2.5 18.1046 3.39543 19 4.5 19H16.5V16"
                      stroke="#1E3050"
                      stroke-width="2"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M5.5 16H18.5V4L15.5 1H5.5V16Z"
                      stroke="#1E3050"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                  COPY FILE
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

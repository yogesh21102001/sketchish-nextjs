import "./style.css";
import { CloseBtnSVG } from "../../assets/ossvg";

import { Button } from "../Buttons/Button";

import TpBg from "../../assets/imgs/tp-bg.png";
import TpBgSm from "../../assets/imgs/tp-bg-sm.png";
import {
  AddIcon,
  BucketSVG,
  OSColorSVG,
  OutInfoSVG,
  ShareStrokeSVG,
} from "../../assets/svg";
import { motion } from "framer-motion";

import { BrokenStrokePPO } from "../popovers/BrokenStrockPPO";

import { decodeSvgBuffer, isAuthenticated } from "../../utils/helpers";

import ColorPicker from "../ColorPicker/ColorPicker";
import { Popover } from "react-tiny-popover";
import { ToggleSwitch } from "../FormControles";
import useProduct from "../../hooks/product/useProduct";
import useProductProcessor from "../../hooks/product/useProductProcessor";
import useUser from "../../hooks/user/user";
import { useState } from "react";
import ReactSlider from "../Slider/Slider";
import { RadioButton } from "../FormControles/RadioButton/radioButton";
import { Typography } from "../Typography";
import Modal from "../../containers/modal/modals";
import { useEffect } from "react";
import useToggle from "../../hooks/useToggle";
import UseBucket from '../../hooks/bucket/useBucket';
import { notifySuccess } from "../../utils/notify";


export function NewSearchDetail({
  setOpen,
  handelClose,
  productInfo,
  setPriceSideBarVisible,
  setFinalDownload,
  searchKeyword,
  rowPosition,
  innerIndex,
  isSideBarVisible,
}) {
  const {
    isLoadingDown,
    isLoadingCopy,
    isLoadingCopied,
    setBucketData,
    setLoadingDown,
    setLoadingCopy,
    getDownloadProduct,
    useRelativeProduct,
    useSetProdDet,
  } = useProduct();
  const { useGetProfile } = useUser();
  const { UseBucketList, UseAddBucketIcons, UseAddBucketIconsFav } = UseBucket();
  const { ModalMain, setIsLoginOpen } = Modal();
  const { prodDet } = useSetProdDet(productInfo._id);
  const pro_id = productInfo.productId;
  const rm_id = productInfo._id;
  const { relatedProduct } = useRelativeProduct({
    id: pro_id,
    rmId: rm_id,
  });


  // const [listOfBucket, setListOfBucket] = useState()
  const id = JSON.parse(localStorage.getItem("user"))
  // setListOfBucket(bucketList)

  const { userDet, mutate } = useGetProfile();
  const [brokeStroke, setBrokeStroke] = useState(false);
  const [colorPickerIndex, setColorPickerIndex] = useState(null);
  const [bucketFlag, setBucketFlag] = useToggle(false);
  const [bucktListData, setBucketListData] = useState([]);

  const { processSimpSVG } = useProductProcessor();

  const [isPreview, setPreview] = useState(productInfo?.previewUrl);

  //colors
  const [colors, setColors] = useState([]);
  const [newColors, setNewColors] = useState([]);

  const getBucktList = async () => {
    const response = await UseBucketList({
      id: id.id ? id.id : id._id
    })
    setBucketListData(response)
  }

  useEffect(() => {
    getBucktList()
  }, [])

  const handleColorChange = (index, color) => {
    if (!isAuthenticated()) return setIsLoginOpen(true);
    if (!userDet?.downloadAble) {
      setOpen(false);
      setPriceSideBarVisible(true);
      return;
    }
    const newColorsCopy = [...newColors];
    newColorsCopy[index] = color;

    setNewColors(newColorsCopy);
  };

  //BG Box
  const [isColorBoxBG, setColorBoxBG] = useState(false);
  const [isBGColor, setBGColor] = useState("notset");

  //Stroke Width
  const [isStrokeSize, setStrokeSize] = useState(2.0);

  //Size
  const [isSize, setSize] = useState(24);

  //File Type
  const [isFileType, setFileType] = useState("svg");

  const [isShown, setIsShown] = useState(false);

  const handleDownload = async ({ id, isCopy }) => {
    const setPreferences = {
      id,
      name: productInfo?.label,
      type: isFileType,
      size: isSize,
      isCopy,
      searchKeyword: searchKeyword,
      strokeWidth: isStrokeSize,
      bgColor: isBGColor,
      brokeStroke: false,
      oldColors: colors,
      newColors: newColors,
    };
    if (!isAuthenticated()) return setIsLoginOpen(true);
    else {
      const usr = isAuthenticated();
      if (
        productInfo &&
        productInfo.productDetails &&
        productInfo.productDetails.isFree
      ) {
        getDownloadProduct(setPreferences);
      } else {
        if (
          userDet &&
          userDet?.subscription &&
          userDet?.subscription.isSubscribed
        ) {
          getDownloadProduct(setPreferences);
        } else {
          if (isFileType === "svg") {
            if (userDet?.downloadAble) {
              getDownloadProduct(setPreferences).then(() => {
                mutate();
              });
            } else {
              setFinalDownload(setPreferences);
              setOpen(false);
              setPriceSideBarVisible(true);
            }
          } else {
            getDownloadProduct({
              id,
              name: productInfo?.label,
              type: isFileType,
              size: isSize,
              isCopy,
            });
          }
        }
      }
    }
  };

  const addBucketIcons = async (userId, buketId) => {
    const payloadData = {
      userId: userId,
      bucketId: buketId,
      productVariantId: rm_id,
    }
    const response = await UseAddBucketIcons(payloadData);
    if (response == "Product already in bucket!") {
      notifySuccess(response)
    } else if (response == "OK") {
      notifySuccess("Product Icon add your Bucket!")
    }
  }

  const addBucketIconsFav = async () => {
    const payloadData = {
      userId: id.id ? id.id : id._id,
      productVariantId: rm_id,
    }
    const response = await UseAddBucketIconsFav(payloadData);
    if (response == "Product already in bucket!") {
      notifySuccess(response)
    } else if (response == "OK") {
      notifySuccess("Product Icon add your Bucket!")
    }
  }


  useEffect(() => {
    setPreview(productInfo?.previewUrl);
    setLoadingDown(false);
    setLoadingCopy(false);
    if (prodDet?.variant?.svg && userDet?.downloadAble) {
      const res = processSimpSVG(
        prodDet?.variant?.svg,
        isBGColor,
        isStrokeSize,
        colors,
        newColors
      );

      setPreview(res.svg);
      setColors(res.oldColor);

      if (newColors.length === 0) setNewColors(res.oldColor);
      if (newColors.length !== 0 && res.oldColor.length !== newColors.length)
        setNewColors(res.oldColor);
    }
  }, [
    newColors,
    isBGColor,
    isStrokeSize,
    productInfo?.previewUrl,
    userDet?.downloadAble,
  ]);

  useEffect(() => {
    if (isSideBarVisible && innerIndex >= 0) {
      setNewColors([]);
      if (prodDet?.variant?.svg && userDet?.downloadAble) {
        const res = processSimpSVG(
          prodDet?.variant?.svg,
          isBGColor,
          isStrokeSize,
          colors,
          newColors
        );

        setPreview(res.svg);
        setColors(res.oldColor);

        if (newColors.length === 0) setNewColors(res.oldColor);
        if (newColors.length !== 0 && res.oldColor.length !== newColors.length)
          setNewColors(res.oldColor);
      }
    }
  }, [isSideBarVisible, innerIndex, prodDet?.variant?.svg]);



  return (
    <>
      <div
        className="sr-det-con"
        style={{
          gridRow: rowPosition,
        }}
      >
        <div className="sr-det-main">
          <div className="sr-main detailView_grid">
            <div className="sr-det-preview">
              <div
                className="sr-det-preview-con"
                style={{
                  background: `url(${TpBg})`,
                }}
              >
                <img
                  src={isPreview}
                  alt=""
                  className={"sr-prod-preview"}
                  loading="lazy"
                  draggable="false"
                />
              </div>
            </div>
            <div className="sr-det-custmi">
              <div className="sr-cust-icon-lable">
                {productInfo?.label}
                <ShareStrokeSVG className="sr-share-svg" />
              </div>

              <div className="sr-cust-items-keys">
                <div className="cust-item">
                  <span className="sr-item-key-txt">Color</span>
                  <div className="cust-value">
                    {colors.map((color, index) => {
                      return (
                        <Popover
                          key={index}
                          isOpen={colorPickerIndex === index}
                          positions={["bottom"]}
                          padding={10}
                          onClickOutside={() => setColorPickerIndex(null)}
                          content={
                            <ColorPicker
                              initialColor={newColors[index]}
                              picker={"sketch"}
                              onChange={(e) => {
                                if (!isAuthenticated())
                                  return setIsLoginOpen(true);
                                if (!userDet?.downloadAble) {
                                  setOpen(false);
                                  setPriceSideBarVisible(true);
                                  return;
                                }
                                handleColorChange(index, e);
                              }}
                            />
                          }
                        >
                          <div
                            key={index}
                            className="sr-cust-colr-dot"
                            style={{ background: newColors[index] }}
                            onClick={() => {
                              if (!isAuthenticated())
                                return setIsLoginOpen(true);
                              if (!userDet?.downloadAble) {
                                setOpen(false);
                                setPriceSideBarVisible(true);
                                return;
                              }
                              setColorPickerIndex(
                                colorPickerIndex === index ? null : index
                              );
                            }}
                          />
                        </Popover>
                      );
                    })}
                  </div>
                </div>
                <div className="cust-item">
                  <span className="sr-item-key-txt">Background</span>
                  <div className="cust-value">
                    <Popover
                      isOpen={isColorBoxBG}
                      positions={["bottom"]}
                      padding={10}
                      onClickOutside={() => setColorBoxBG(false)}
                      content={
                        <ColorPicker
                          initialColor={isBGColor}
                          picker={"sketch"}
                          onChange={(e) => {
                            if (!isAuthenticated()) return setIsLoginOpen(true);
                            if (!userDet?.downloadAble) {
                              setOpen(false);
                              setPriceSideBarVisible(true);
                              return;
                            }
                            setBGColor(e);
                          }}
                        />
                      }
                    >
                      <div
                        className="sr-cust-colr-dot"
                        style={{
                          background:
                            isBGColor === "notset"
                              ? `url(${TpBgSm})`
                              : isBGColor,
                        }}
                        onClick={() => {
                          if (!isAuthenticated()) return setIsLoginOpen(true);
                          if (!userDet?.downloadAble) {
                            setOpen(false);
                            setPriceSideBarVisible(true);
                            return;
                          }
                          setColorBoxBG(true);
                        }}
                      />
                    </Popover>
                    {isBGColor !== "notset" && (
                      <span
                        className="sr-reset-txt"
                        onClick={() => setBGColor("notset")}
                      >
                        Reset
                      </span>
                    )}
                  </div>
                </div>
                {productInfo.styleSet !== "solid" &&
                ((productInfo &&
                  !Object.keys(productInfo).includes("isCustStroke")) ||
                  productInfo?.isCustStroke == "true") ? (
                  <div className="cust-item">
                    <span className="sr-item-key-txt">Stroke weight</span>
                    <input
                      type="number"
                      className="sr-input-box"
                      value={isStrokeSize}
                      onChange={(e) => {
                        if (!isAuthenticated()) return setIsLoginOpen(true);
                        if (!userDet?.downloadAble) {
                          setOpen(false);
                          setPriceSideBarVisible(true);
                          return;
                        }
                        if (e.target.value >= 0 && e.target.value <= 4)
                          if (e.target.value === 0) setStrokeSize(0.1);
                          else setStrokeSize(e.target.value);
                      }}
                      noValidate
                    />
                    <ReactSlider
                      value={isStrokeSize}
                      setValue={setStrokeSize}
                    />
                  </div>
                ) : (
                  <></>
                )}
                <div className="cust-item">
                  <span className="sr-item-key-txt">Size</span>
                  <input
                    type="number"
                    className="sr-input-box"
                    onChange={(e) => {
                      setSize(Number(e.target.value));
                    }}
                    value={isSize}
                  />
                  {isSize !== 24 && (
                    <span className="sr-reset-txt" onClick={() => setSize(24)}>
                      Reset
                    </span>
                  )}
                </div>
                <div className="cust-item">
                  <div className="sr-item-key-txt">File</div>
                  <div className="sr-file-sec-con">
                    <div className="sr-cust-file-con">
                      <div className="sr-cust-file-radio">
                        <RadioButton
                          id={"rb-svg"}
                          name={"rb-files"}
                          onClick={() => setFileType("svg")}
                          defaultChecked={isFileType === "svg" && true}
                        />
                        <label htmlFor="rb-svg">
                          <Typography variant={"body1"}>SVG</Typography>
                        </label>
                      </div>
                      <div className="sr-cust-file-radio">
                        <RadioButton
                          id={"rb-png"}
                          name={"rb-files"}
                          onClick={() => setFileType("png")}
                          defaultChecked={isFileType === "png" && true}
                        />
                        <label htmlFor="rb-png">
                          <Typography variant={"body1"}>PNG</Typography>
                        </label>
                      </div>
                      <div className="sr-cust-file-radio">
                        <RadioButton
                          id={"rb-pdf"}
                          name={"rb-files"}
                          onClick={() => setFileType("pdf")}
                          defaultChecked={isFileType === "pdf" && true}
                        />
                        <label htmlFor="rb-pdf">
                          <Typography variant={"body1"}>PDF</Typography>
                        </label>
                      </div>
                    </div>
                    {/* broken stroke */}
                    {isFileType === "svg" &&
                      productInfo.styleSet !== "solid" &&
                      false && (
                        <div className="sr-cust-br-con">
                          <div className="sr-cust-br-lbl">
                            <p className="brs-con-lbl-text">BrokenStroke</p>
                            <Popover
                              isOpen={isShown}
                              positions={["top"]}
                              padding={10}
                              content={<BrokenStrokePPO />}
                              onClickOutside={() => {
                                setIsShown(false);
                              }}
                            >
                              <OutInfoSVG
                                className="info-svg"
                                onMouseEnter={() => setIsShown(true)}
                                onMouseLeave={() => setIsShown(false)}
                              />
                            </Popover>
                          </div>
                          <ToggleSwitch
                            isOn={brokeStroke}
                            id={"set-renew"}
                            onChange={(e) => setBrokeStroke(e.target.checked)}
                            changeColor={true}
                          />  </div>
                      )}
                  </div>
                </div>
                <div className="cust-item">
                  <span className="sr-item-key-txt">Keywords</span>
                  <div className="sr-keyword-value">
                    {productInfo?.tags && productInfo.tags.join(", ")}
                  </div>
                </div>
                <div className="cust-item-ext">
                  <motion.div
                    whileTap={{ scale: 0.9 }}
                    transition={{ type: "spring", stiffness: 400, damping: 17 }}
                  >
                    <Button
                      lable={
                        userDet?.downloadAble
                          ? isLoadingDown
                            ? "Downloading..."
                            : "Download"
                          : "Download"
                      }
                      type={"submit"}
                      btnSize="hug"
                      fixHeight={true}
                      onClick={() =>
                        handleDownload({ id: productInfo?._id, isCopy: false })
                      }
                    />
                  </motion.div>

                  <motion.div
                    whileTap={{ scale: 0.9 }}
                    transition={{ type: "spring", stiffness: 400, damping: 17 }}
                  >
                    <Button
                      lable={
                        isLoadingCopy
                          ? "Copying..."
                          : isLoadingCopied
                            ? "Copied!"
                            : "Copy"
                      }
                      type={"submit"}
                      btnSize="hug"
                      fixHeight={true}
                      onClick={() =>
                        handleDownload({ id: productInfo?._id, isCopy: true })
                      }
                      outlined={true}
                    />
                  </motion.div>

                  <motion.div
                    whileTap={{ scale: 0.9 }}
                    transition={{ type: "spring", stiffness: 400, damping: 17 }}
                  >
                    <Button
                      type={"submit"}
                      iconMain={<BucketSVG />}
                      btnSize="hug"
                      fixHeight={true}
                      onClick={() => { setBucketFlag(); }}
                      outlined={true}
                    />
                  </motion.div>
                  {bucketFlag && (
                    <div className="add-to-bucket-root">
                      <div className="add-to-bucket-inner">
                        <div>
                          <p>Add to Bucket</p>
                          <div className="add-to-bucket-grid">
                            <div className="add-to-bucket-item">
                              <div className="add-to-buckt-img">
                                <BucketSVG />
                                <h5>Favorites</h5>
                              </div>
                              <AddIcon onClick={() => { addBucketIconsFav() }} />
                            </div>
                            {bucktListData && bucktListData.map((bucketName, index) => {
                              return (
                                <>
                                  <div className="add-to-bucket-item" key={index}>
                                    <div className="add-to-buckt-img">
                                      <BucketSVG />
                                      <h5>{bucketName.bucketName}</h5>
                                    </div>
                                    <AddIcon onClick={() => { addBucketIcons(bucketName.userId, bucketName._id) }} />
                                  </div>
                                </>
                              )
                            })}

                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
              <div className="sr-close-ico">
                <CloseBtnSVG onClick={handelClose} />
              </div>
            </div>
            <motion.div className="related-product">
              <h1 className="related-icon">Related icons</h1>
              {relatedProduct?.length > 1 ? (
                <div id="grid" className="search-res-icon">
                  {relatedProduct?.map((data, index) => (
                    <>
                      <div className={`related-res-item`} key={data._id}>
                        {data?.productDetails?.isFree ? (
                          <div></div>
                        ) : (
                          <div>
                            <OSColorSVG className={`os-color-svg `} />
                          </div>
                        )}

                        <img
                          src={data.previewUrl}
                          className="search-res-png"
                          alt=""
                          loading="lazy"
                        />
                        <label className="icon-text">{data?.label}</label>
                      </div>
                    </>
                  ))}
                </div>
              ) : (
                <h2>Icon Not Found</h2>
              )}
            </motion.div>
          </div>
        </div>
        {ModalMain()}
      </div>
    </>
  );
}

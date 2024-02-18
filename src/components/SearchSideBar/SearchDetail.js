import "./style.css";
import { CloseBtnSVG } from "../../assets/ossvg";

import { Button } from "../Buttons/Button";
import { Selectdrop } from "../DropDown/dropdown";
import TpBg from "../../assets/imgs/tp-bg.png";
import TpBgSm from "../../assets/imgs/tp-bg-sm.png";
import { DownloadWSVG, LockSVG, InfoSVG } from "../../assets/svg";
// import useProduct from "../../hooks/product/useProduct";
import { motion } from "framer-motion";
import Modal from "../../containers/modal/modals";
import { BrokenStrokePPO } from "../popovers/BrokenStrockPPO";
import { useState } from "react";
import { decodeSvgBuffer, isAuthenticated } from "../../utils/helpers";
import useProduct from "../../hooks/product/useProduct";
import { notifySuccess } from "../../utils/notify";
import useUser from "../../hooks/user/user";
import ColorPicker from "../ColorPicker/ColorPicker";
import { Popover } from "react-tiny-popover";
import { ToggleSwitch } from "../FormControles";

export function SearchDetail({
  setOpen,
  handelClose,
  productInfo,
  setPriceSideBarVisible,
  setFinalDownload,
  searchKeyword,
}) {
  const { isLoadingDown, isLoadingCopy, getDownloadProduct, useSetProdDet } =
    useProduct();
  const { ModalMain, setIsLoginOpen } = Modal();
  const [getFileType, setFileType] = useState("svg");
  const [getSize, setSize] = useState("24");
  const { useGetProfile } = useUser();
  const { userDet, mutate } = useGetProfile();

  const [brokeStroke, setBrokeStroke] = useState(false);

  //Fill Box
  const [isColorBoxFill, setColorBoxFill] = useState(false);
  const [isFillColor, setFillColor] = useState("notset");

  //Stroke Box
  const [isColorBoxStroke, setColorBoxStroke] = useState(false);
  const [isStrokeColor, setStrokeColor] = useState("#000000");

  //BG Box
  const [isColorBoxBG, setColorBoxBG] = useState(false);
  const [isBGColor, setBGColor] = useState("notset");

  //Stroke Width
  const [isStrokeSize, setStrokeSize] = useState(2);

  const { prodDet } = useSetProdDet(productInfo._id);
  const [isShown, setIsShown] = useState(false);
  const fileOptions = [
    { value: "png", label: "PNG" },
    // { value: "svg", label: "SVG", isDisabled: true },
    { value: "svg", label: "SVG" },
    { value: "pdf", label: "PDF", isDisabled: false },
  ];

  const sizeOptions = [
    { value: "16", label: "16px" },
    { value: "24", label: "24px" },
    { value: "32", label: "32px" },
    { value: "64", label: "64px" },
    { value: "128", label: "128px" },
    { value: "256", label: "256px" },
    { value: "512", label: "512px" },
  ];

  const handleDownload = async ({ id, isCopy }) => {
    if (!isAuthenticated()) return setIsLoginOpen(true);
    else {
      const usr = isAuthenticated();
      if (
        productInfo &&
        productInfo.productDetails &&
        productInfo.productDetails.isFree
      ) {
        getDownloadProduct({
          id,
          name: productInfo?.label,
          type: getFileType,
          size: getSize,
          isCopy,
          strokeWidth: isStrokeSize,
          strokeColor: isStrokeColor,
          bgColor: isBGColor,
          fill: isFillColor,
          brokeStroke: false,
        }).then(() => {
          notifySuccess("Downloaded successfully.");
        });
      } else {
        if (usr && usr.subscription && usr.subscription.isSubscribed) {
          getDownloadProduct({
            id,
            name: productInfo?.label,
            type: getFileType,
            size: getSize,
            isCopy,
            strokeWidth: isStrokeSize,
            strokeColor: isStrokeColor,
            bgColor: isBGColor,
            fill: isFillColor,
            brokeStroke: false,
          });
        } else {
          if (getFileType === "svg") {
            if (userDet?.downloadAble) {
              getDownloadProduct({
                id,
                name: productInfo?.label,
                type: getFileType,
                size: getSize,
                isCopy,
                strokeWidth: isStrokeSize,
                strokeColor: isStrokeColor,
                bgColor: isBGColor,
                fill: isFillColor,
                brokeStroke: false,
              }).then(() => {
                mutate();
                notifySuccess("Downloaded successfully.");
              });
            } else {
              setFinalDownload({
                id,
                name: productInfo?.label,
                type: getFileType,
                size: getSize,
                searchKeyword: searchKeyword,
                isCopy,
                strokeWidth: isStrokeSize,
                strokeColor: isStrokeColor,
                bgColor: isBGColor,
                fill: isFillColor,
                brokeStroke: false,
              });
              setOpen(false);
              setPriceSideBarVisible(true);
            }
          } else {
            getDownloadProduct({
              id,
              name: productInfo?.label,
              type: getFileType,
              size: getSize,
              isCopy,
            });
          }
        }
      }
    }
  };

  return (
    <>
      <motion.div className="search-result" animate={{ opacity: 1 }}>
        <div className="search-header">
          <h2 className="hrading-primary">{productInfo?.label}</h2>
          <div className="menu-item">
            {/* <Bucket /> */}
            {/* <Share /> */}
            <CloseBtnSVG className="search-ico" onClick={handelClose} />
          </div>
        </div>
        <div>
          <ul className="ser-res-list">
            {productInfo?.tags && productInfo.tags.length > 0
              ? productInfo.tags.map((tags, index) => {
                return (
                  <motion.li className="ser-res-list-item" key={index}>
                    {tags}
                  </motion.li>
                );
              })
              : ""}
          </ul>
        </div>

        <div className="dropdown-menu">
          <motion.div
            className="sd-product-con"
            style={{
              background: true ? `url(${TpBg})` : isBGColor,
            }}
          >
            {/* {prodDet?.isFree === true ? "" : <TagSVG className="tag-icon" />} */}
            {prodDet?.variant?.svg && userDet?.downloadAble ? (
              <img
                src={decodeSvgBuffer(
                  prodDet?.variant?.svg,
                  isFillColor,
                  isStrokeSize,
                  isStrokeColor,
                  isBGColor
                )}
                alt=""
                className={"sd-prod-preview"}
                loading="lazy"
                draggable="false"
              />
            ) : (
              <img
                src={productInfo?.previewUrl}
                alt=""
                className={"sd-prod-preview"}
                loading="lazy"
                draggable="false"
              />
            )}
          </motion.div>
          <div
            className="ser-res-color"
            style={
              {
                // visibility: "hidden",
              }
            }
          >
            <div className="color-primary">
              <div className="edt-menu-con">
                <Popover
                  isOpen={isColorBoxFill}
                  positions={["bottom"]}
                  padding={10}
                  onClickOutside={() => setColorBoxFill(false)}
                  content={
                    <ColorPicker
                      initialColor={isFillColor}
                      onChange={(e) => {
                        setFillColor(e);
                      }}
                    />
                  }
                >
                  <p
                    className="fill-color"
                    style={{
                      backgroundColor:
                        isFillColor === "notset"
                          ? `url(${TpBgSm})`
                          : isFillColor,
                    }}
                    onClick={() => {
                      if (!isAuthenticated()) return setIsLoginOpen(true);
                      setColorBoxFill(true);
                    }}
                  ></p>
                </Popover>
                <p className="text-primary">Fill</p>
              </div>
              <div className="edt-menu-con">
                <Popover
                  isOpen={isColorBoxStroke}
                  positions={["bottom"]}
                  padding={10}
                  onClickOutside={() => setColorBoxStroke(false)}
                  content={
                    <ColorPicker
                      initialColor={isStrokeColor}
                      onChange={(e) => {
                        setStrokeColor(e);
                      }}
                    />
                  }
                >
                  <p
                    className="strock-color"
                    style={{
                      backgroundColor: isStrokeColor,
                    }}
                    onClick={() => {
                      if (!isAuthenticated()) return setIsLoginOpen(true);
                      if (!userDet?.downloadAble) {
                        setOpen(false);
                        setPriceSideBarVisible(true);
                        return;
                      }
                      setColorBoxStroke(true);
                    }}
                  ></p>
                </Popover>
                <p className="text-primary">STROCK</p>
              </div>
              <div className="edt-menu-con">
                <Popover
                  isOpen={isColorBoxBG}
                  positions={["bottom"]}
                  padding={10}
                  onClickOutside={() => setColorBoxBG(false)}
                  content={
                    <ColorPicker
                      initialColor={isBGColor}
                      onChange={(e) => {
                        setBGColor(e);
                      }}
                    />
                  }
                >
                  <p
                    className="strock-color-bg"
                    style={{
                      background:
                        isBGColor === "notset" ? `url(${TpBgSm})` : isBGColor,
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
                  ></p>
                </Popover>
                <div className="text-primary">BG</div>
              </div>
            </div>
            <div>
              <div className="search-inc-dec">
                <div
                  className="search-result-main-list"
                  onClick={() => {
                    if (!isAuthenticated()) return setIsLoginOpen(true);
                    if (!userDet?.downloadAble) {
                      setOpen(false);
                      setPriceSideBarVisible(true);
                      return;
                    }
                    if (isStrokeSize > 0.5) setStrokeSize(isStrokeSize - 0.5);
                  }}
                >
                  -
                </div>
                <p className="search-result-main-list">{isStrokeSize}</p>
                <div
                  className="search-result-main-list"
                  onClick={() => {
                    if (!userDet?.downloadAble) {
                      setOpen(false);
                      setPriceSideBarVisible(true);
                      return;
                    }
                    if (!isAuthenticated()) return setIsLoginOpen(true);
                    if (isStrokeSize < 4.0) setStrokeSize(isStrokeSize + 0.5);
                  }}
                >
                  +
                </div>
              </div>
              <p className="text-primary">Stroke SIZE</p>
            </div>
          </div>
        </div>

        <div className="dropdown-menu">
          <div style={{ width: "130px" }}>
            <p className="text-primary">FILE</p>
            <Selectdrop
              selSize="sm"
              options={fileOptions}
              defaultValue={fileOptions[1]}
              onChange={(opt) => setFileType(opt.value)}
            />
            <div className={"brs-con"}>
              <div className={"brs-con-lbl"}>
                <div>
                  <Popover
                    isOpen={isShown}
                    positions={["top"]}
                    padding={10}
                    content={<BrokenStrokePPO />}
                    onClickOutside={() => {
                      setIsShown(false);
                    }}
                  >
                    <InfoSVG
                      className="info-svg"
                      onMouseEnter={() => setIsShown(true)}
                      onMouseLeave={() => setIsShown(false)}
                    />
                  </Popover>
                </div>
                <p className="brs-con-lbl-text">BrokenStroke</p>
              </div>
              <ToggleSwitch
                isOn={brokeStroke}
                id={"set-renew"}
                onChange={(e) => setBrokeStroke(false)}
                changeColor={true}
              />
            </div>
          </div>
          <div>
            <p className="text-primary">SIZE (PX)</p>
            <Selectdrop
              options={sizeOptions}
              defaultValue={sizeOptions[1]}
              onChange={(opt) => setSize(opt.value)}
            />
            <div className={"brs-con"}>
              <p className="brs-con-lbl-text">
                Base:
                {productInfo?.width && productInfo?.height
                  ? `${productInfo?.width}px`
                  : "24px"}
              </p>
            </div>
          </div>
        </div>

        <motion.div
          className="dropdown-menu"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.9 }}
          transition={{ type: "spring", stiffness: 400, damping: 17 }}
        >
          <Button
            lable={
              userDet?.downloadAble
                ? isLoadingDown
                  ? "Downloading..."
                  : "Download"
                : "Get this icon"
            }
            type={"submit"}
            iconPre={<DownloadWSVG />}
            btnSize="full"
            fixHeight={true}
            onClick={() =>
              handleDownload({ id: productInfo?._id, isCopy: false })
            }
          />
        </motion.div>

        <motion.div
          className="dropdown-menu"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.9 }}
          transition={{ type: "spring", stiffness: 400, damping: 17 }}
        >
          <Button
            lable={isLoadingCopy ? "Copying..." : "Copy"}
            type={"submit"}
            iconPre={false && <LockSVG />}
            btnSize="full"
            fixHeight={true}
            onClick={() =>
              handleDownload({ id: productInfo?._id, isCopy: true })
            }
          />
        </motion.div>
      </motion.div>
      {ModalMain()}
    </>
  );
}

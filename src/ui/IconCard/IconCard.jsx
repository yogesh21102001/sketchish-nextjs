import React, { useEffect, useState } from "react";
import Styles from "./style.module.css";
import BucketList from "../../components/BucketList/BucketList";
import { Popover } from "react-tiny-popover";
import { ResponsiveModal } from "../../components/ResponsiveModal";
import UseBucket from "../../hooks/bucket/useBucket";
import { notifyError, notifySuccess } from "../../utils/notify";

const Premimum = ({ className }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      className={className}
    >
      <path
        d="M7.46735 7.73586C7.1687 8.2943 6.43277 8.43804 5.94595 8.03301L3.98131 6.39844C3.27958 5.8146 2.22672 6.39903 2.35105 7.30337L3.44669 15.2724C3.5828 16.2624 4.42875 17 5.42805 17H14.5719C15.5713 17 16.4172 16.2624 16.5533 15.2724L17.6095 7.58994C17.7385 6.65176 16.6124 6.0765 15.9279 6.73089L14.3572 8.23242C13.8844 8.68432 13.1123 8.56832 12.7932 7.99747L10.8923 4.5964C10.5066 3.9063 9.51038 3.91556 9.13755 4.61271L7.46735 7.73586Z"
        fill="#FFCE00"
      />
    </svg>
  );
};

const Delete = ({ className, onClick }) => {
  return (
    <svg
      onClick={onClick}
      className={className}
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M8 4C8 2.89543 8.89543 2 10 2H14C15.1046 2 16 2.89543 16 4H20H22V6H20V20C20 21.1046 19.1046 22 18 22H6C4.89543 22 4 21.1046 4 20V6H2V4H4H8ZM11 8V18H9V8H11ZM13 8V18H15V8H13Z"
        fill="#808080"
      ></path>
    </svg>
  );
};

const AddToBucket = ({ className, onClick }) => {
  return (
    <svg
      onClick={() => onClick()}
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
    >
      <path
        d="M19 10L10 10M0.999999 10L10 10M10 10L10 1M10 10L10 19"
        stroke="#1E3050"
        stroke-width="2"
        stroke-linecap="square"
        stroke-linejoin="round"
      />
    </svg>
  );
};

export const IconCard = ({
  pro,
  newIcon,
  preView,
  lable,
  onClick,
  active,
  hover = true,
  deleate = false,
  onDelete,
  addToBucket,
  bucketData,
  isAuthenticated,
  productId,
  lastBookElementRef,
}) => {
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const { UseBucketList, UseAddBucketIcons, UseAddBucketIconsFav } =
    UseBucket();

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

  const addBucketIconsFav = async (id) => {
    const payloadData = {
      userId: id,
      productVariantId: productId,
    };
    const response = await UseAddBucketIconsFav(payloadData);
    if (response == "Product already in bucket!") {
      notifySuccess(response);
    } else if (response == "OK") {
      notifySuccess("Product Icon add your Bucket!");
    }
  };

  const handleBucketChange = async (v) => {
    setIsPopoverOpen(false);
    const localUser = JSON.parse(localStorage.getItem("user"));
    if (isAuthenticated()) {
      if (v === "Favorite") {
        await addBucketIconsFav(localUser.id || localUser._id);
      } else {
        await addBucketIcons(localUser.id || localUser._id, v);
      }
    }
  };

  return (
    <div
      ref={lastBookElementRef}
      className={`${Styles.icon_card} ${active ? Styles.active : ""} ${
        hover ? Styles.hover : ""
      }`}
    >
      {newIcon ? (
        <div className={Styles.new_flag}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="15"
            height="15"
            viewBox="0 0 15 15"
            fill="none"
          >
            <path d="M15 0H0V15L15 0Z" fill="#36DC5E" />
          </svg>
        </div>
      ) : (
        ""
      )}
      <div className={Styles.header}>
        {pro ? <Premimum className={Styles.pro} /> : ""}
        {deleate ? (
          <Delete
            className={`${Styles.add}  ${Styles.add_to_bucket}`}
            onClick={onDelete}
          />
        ) : (
          ""
        )}
        {addToBucket && isAuthenticated() ? (
          <AddToBucket
            className={`${Styles.add} ${Styles.add_to_bucket}`}
            onClick={() => setIsPopoverOpen(!isPopoverOpen)}
          />
        ) : (
          ""
        )}
      </div>
      <div className={Styles.icon_preview} onClick={() => onClick()}>
        <img
          src={
            preView
              ? preView
              : "https://openstroke.nyc3.digitaloceanspaces.com/Classic/Solid/png/alarm-bell-emergency.png"
          }
          alt="Icon Image"
        />
      </div>
      <div className={Styles.lable}>
        <p>{lable ? lable : "Icone Name"}</p>
      </div>
      <ResponsiveModal
        isOpen={isPopoverOpen}
        onClose={() => setIsPopoverOpen(false)}
        component={
          <BucketList
            bucketData={bucketData}
            handleBucketChange={handleBucketChange}
            containerStyle={{
              width: "20rem",
              height: "20rem",
              padding: "1.5rem",
            }}
            style={{
              marginTop: "2rem",
              width: "100%",
              padding: "initial",
              border: "none",
            }}
          />
        }
      />
    </div>
  );
};

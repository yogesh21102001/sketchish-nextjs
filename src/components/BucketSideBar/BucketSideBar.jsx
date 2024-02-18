import React, { useEffect, useState, useContext } from "react";
import Styles from "./style.module.css";
import UseBucket from "../../hooks/bucket/useBucket";
import { isEmpty } from "lodash";
import { replaceSpacesWithHyphens } from "../../utils/helpers";
import { useNavigate } from "react-router-dom";
import { notifySuccess } from "../../utils/notify";
import AuthContext from "../../context/AuthProvider";
import { ClipLoader } from "react-spinners";
import CustomDropDown from "../custom-dropdown/CustomDropDown";

const IconCard = ({ preView, pro, onClick, onDelete }) => {
  return (
    <div className={Styles.icon_card} onClick={() => onClick()}>
      <div className={Styles.icon_card_header}>
        {pro == 1 && (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="12"
            height="12"
            viewBox="0 0 12 12"
            fill="none"
          >
            <path
              d="M4.4806 4.64157C4.30142 4.97663 3.85985 5.06287 3.56776 4.81985L2.38898 3.83911C1.96794 3.48881 1.33623 3.83946 1.41083 4.38207L2.06821 9.1635C2.14988 9.75749 2.65744 10.2 3.25703 10.2H8.74336C9.34295 10.2 9.85052 9.75749 9.93218 9.1635L10.5659 4.55401C10.6433 3.9911 9.96763 3.64595 9.55691 4.03858L8.61449 4.9395C8.33086 5.21064 7.86758 5.14104 7.67614 4.79853L6.53556 2.75789C6.30413 2.34383 5.70642 2.34938 5.48273 2.76767L4.4806 4.64157Z"
              fill="#FFCE00"
            />
          </svg>
        )}
      </div>
      <div className={Styles.img_cont}>
        <img src={preView} alt="" />
      </div>
    </div>
  );
};
const BucketProjects = ({
  label,
  Userid,
  bucketId,
  bucketData,
  setSelectedBucket,
  selectedBucket,
  handleOnAdd,
  hadnleOnDelete,
  index,
}) => {
  const [listing, setListing] = useState(false);
  const [bucketIcons, setBucketIcons] = useState([]);
  const [isEdit, setIsEdit] = useState(false);
  const navigator = useNavigate();
  const [editValue, setEditValue] = useState(label);
  const [loading, setLoading] = useState(false);

  const {
    UseDeleteBucket,
    UseGetBucketIcon,
    UseGetBucketIconFav,
    UseDeleteBucketIcon,
  } = UseBucket();

  const handleEnterKeyPress = (event) => {
    if (event.key === "Enter" || event.key === "Return") {
      handleOnAdd({
        selectedBucketId: bucketId,
        bucktInput: editValue,
        Userid: Userid,
      });
      setIsEdit(false);
    } else if (event.key === "Escape") {
      setIsEdit(false);
    }
  };

  const handleCheckNewIcons = (obj) => {
    const currentDate = new Date();

    const createdAtDate = new Date(obj.updatedAt);
    const timeDifference = currentDate - createdAtDate;
    const sevenDaysInMillis = 7 * 24 * 60 * 60 * 1000;

    return timeDifference <= sevenDaysInMillis;
  };

  const getAllBucketIconFav = async (Userid) => {
    setLoading(true);
    if (!isEmpty(Userid)) {
      const data = await UseGetBucketIconFav({
        userId: Userid.id ? Userid.id : Userid._id,
      });
      if (data) {
        setLoading(false);
      }
      if (data && typeof data == "object") {
        // setFavBucketCount(data?.length || 0);
        const sortedData = data.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );

        sortedData.forEach((obj) => {
          obj.isNew = handleCheckNewIcons(obj);
        });
        setBucketIcons(sortedData);
      } else {
        // setFavBucketCount(0);
        setBucketIcons([]);
      }
    }
  };

  const getAllBucketIcon = async (Userid, bucketId) => {
    setLoading(true);
    if (!bucketId) {
      await getAllBucketIconFav();
    } else {
      const data = await UseGetBucketIcon({
        userId: Userid.id ? Userid.id : Userid._id,
        bucketId: bucketId,
      });
      if (data) {
        setLoading(false);
      }
      setSelectedBucket(bucketData?.find((_b) => _b.id == bucketId).bucketName);
      if (data && typeof data == "object") {
        setBucketIcons(data);
      } else {
        setBucketIcons([]);
      }
    }
  };

  const handelIconListing = (bucket, bucketId) => {
    setListing(!listing);
    setSelectedBucket(bucket);
    if (bucket == "Favorite") {
      getAllBucketIconFav(Userid);
    } else {
      getAllBucketIcon(Userid, bucketId);
    }
  };

  return (
    <div style={{ width: "100%" }}>
      {!isEdit ? (
        <div
          className={`${Styles.bucket_header} ${
            selectedBucket.toLowerCase() == label.toLowerCase() && listing
              ? Styles.active
              : ""
          }`}
        >
          <div>
            <span onClick={() => handelIconListing(label, bucketId)}>
              {label}
            </span>
            {label != "Favorite" && (
              <svg
                className={Styles.edit_btn}
                onClick={() => setIsEdit(true)}
                xmlns="http://www.w3.org/2000/svg"
                width="12"
                height="12"
                viewBox="0 0 12 12"
                fill="none"
              >
                <path
                  d="M7.04211 2.67151L9.32841 4.95782M3.04108 11.2452L0.754972 11.2453L0.754816 8.95889L8.75684 0.956787L11.0431 3.24309L3.04108 11.2452Z"
                  stroke="#676F7E"
                  stroke-linecap="square"
                />
              </svg>
            )}
          </div>
          <div
            style={{ flex: 1 }}
            onClick={() => handelIconListing(label, bucketId)}
          ></div>
          {label != "Favorite" && (
            <CustomDropDown
              alert={true}
              onSelect={() =>
                hadnleOnDelete({
                  bucketId: bucketId,
                  Userid: Userid,
                })
              }
              dropDownZindex={index}
              width={"11%"}
              positionLeft={"-200%"}
              dropdownWidth={"5rem"}
              options={["Delete"]}
              IconBtn={() => (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                >
                  <ellipse cx="10" cy="6" rx="1" ry="1" fill="#1E3050" />
                  <circle cx="10" cy="10" r="1" fill="#1E3050" />
                  <circle cx="10" cy="14" r="1" fill="#1E3050" />
                </svg>
              )}
            />
          )}
        </div>
      ) : (
        <div
          className={`${Styles.bucket_header} ${Styles.active} ${Styles.edit_cont}`}
        >
          <input
            onKeyDown={handleEnterKeyPress}
            type="text"
            className={Styles.edit_inp}
            value={editValue}
            autoFocus={true}
            onChange={(e) => setEditValue(e.target.value)}
          />
          <div className={Styles.action_btn}>
            <svg
              onClick={() => setIsEdit(false)}
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
            >
              <circle cx="10" cy="10" r="10" fill="#676F7E" />
              <path
                d="M12.9998 7.00003L9.96344 10.0364M6.99984 13L9.96344 10.0364M9.96344 10.0364L6.92709 7.00003M9.96344 10.0364L12.9998 13.0727"
                stroke="white"
                stroke-width="1.8"
                stroke-linecap="square"
                stroke-linejoin="round"
              />
            </svg>

            <svg
              onClick={() => {
                handleOnAdd({
                  selectedBucketId: bucketId,
                  bucktInput: editValue,
                  Userid: Userid,
                });
                setIsEdit(false);
              }}
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
            >
              <circle cx="10" cy="10" r="10" fill="#0D802D" />
              <path
                d="M5.5 9.5L7.85714 13L15 8"
                stroke="white"
                stroke-width="1.8"
              />
            </svg>
          </div>
        </div>
      )}
      {loading && bucketIcons?.length == 0 && (
        <div className={Styles.loading_cont}>
          <ClipLoader color={"#123abc"} size={"20"} />
        </div>
      )}
      {bucketIcons?.length > 0 ? (
        <div
          className={`${Styles.bucket_icons} ${
            selectedBucket.toLowerCase() == label.toLowerCase() && listing
              ? Styles.open
              : ""
          }`}
        >
          {bucketIcons.map((icon, i) => (
            <IconCard
              key={i}
              lable={icon?.label}
              pro={icon?.paid == 1 ? true : false}
              preView={icon?.webpUrl ? icon?.webpUrl : icon?.previewUrl}
              onClick={() =>
                navigator(
                  `/icons/${replaceSpacesWithHyphens(icon?.label)}?t=${
                    icon?.type
                  }&s=${icon?.styleSet}`
                )
              }
            />
          ))}
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

const BucketSideBar = ({
  isAuthenticated,
  setIsLoginOpen,
  setIsBcket,
  currentWindowWidth,
}) => {
  const [bucketData, setBucketData] = useState([]);
  const [Userid, setUserId] = useState("");
  const [selectedBucket, setSelectedBucket] = useState("");
  const [isNewBucket, setIsNewBucket] = useState(false);
  const [newBucketValue, setNewBucketValue] = useState("");
  const { auth } = useContext(AuthContext);

  const { UseBucketList, UseEditBucket, UseAddBucket, UseDeleteBucket } =
    UseBucket();

  const getAllBucketData = async (Userid) => {
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

  const handleOnAdd = async ({ selectedBucketId, bucktInput, Userid }) => {
    if (selectedBucketId) {
      const payloadData = {
        bucketId: selectedBucketId,
        bucketName: bucktInput,
      };
      const data = await UseEditBucket(payloadData);
      if (data == "Bucket updated succesfully.") {
        notifySuccess(data);
      }
      const response = await UseBucketList({
        id: Userid.id ? Userid.id : Userid._id,
      });

      if (response) {
        setNewBucketValue("");
      }

      setSelectedBucket(bucktInput);
      setBucketData(response);
    } else {
      const payloadData = {
        userId: Userid.id ? Userid.id : Userid._id,
        bucketName: bucktInput,
      };
      const data = await UseAddBucket(payloadData);
      const response = await UseBucketList({
        id: Userid.id ? Userid.id : Userid._id,
      });
      if (response) {
        setNewBucketValue("");
      }
      if (data == "OK") {
        notifySuccess("Bucket Add Successfully");
      }
      setBucketData(response);
    }
    setIsNewBucket(false);
  };

  const hadnleOnDelete = async ({ bucketId, Userid }) => {
    const data = await UseDeleteBucket({
      id: bucketId,
    });
    if (data == "Bucket deleted successfully.") {
      notifySuccess(data);
    }
    const response = await UseBucketList({
      id: Userid.id ? Userid.id : Userid._id,
    });
    if (data && typeof response == "object") {
      setBucketData(response);
    } else {
      setBucketData([]);
    }
  };

  const handleEnterKeyPress = (event) => {
    if (event.key === "Enter" || event.key === "Return") {
      handleOnAdd({
        selectedBucketId: "",
        bucktInput: newBucketValue,
        Userid: Userid,
      });
    } else if (event.key === "Escape") {
      setIsNewBucket(false);
    }
  };

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    setUserId(user);
    getAllBucketData(user);
  }, [auth]);

  return (
    <div className={Styles.bucket_sidebar_wraper}>
      <div className={Styles.bucket_sidebar}>
        {currentWindowWidth <= 600 && (
          <h3 className={Styles.my_bucket_heading}>My Bucket</h3>
        )}
        <div
          className={Styles.bucket_header}
          onClick={() => {
            if (isAuthenticated()) {
              setIsNewBucket(true);
            } else {
              setIsLoginOpen(true);
            }
          }}
        >
          <span style={{ color: "#7238FA" }}>Create New</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
          >
            <path
              d="M19 10L10 10M0.999999 10L10 10M10 10L10 1M10 10L10 19"
              stroke="#7238FA"
              stroke-width="2"
              stroke-linecap="square"
              stroke-linejoin="round"
            />
          </svg>
        </div>
        {isAuthenticated() && (
          <>
            {" "}
            <BucketProjects
              label={"Favorite"}
              Userid={Userid}
              bucketData={bucketData}
              selectedBucket={selectedBucket}
              setSelectedBucket={setSelectedBucket}
            />
            {bucketData?.map((bucket, i) => (
              <BucketProjects
                index={bucketData?.length - i}
                Userid={Userid}
                label={bucket?.bucketName}
                key={i}
                bucketData={bucketData}
                bucketId={bucket?.id}
                selectedBucket={selectedBucket}
                setSelectedBucket={setSelectedBucket}
                handleOnAdd={handleOnAdd}
                hadnleOnDelete={hadnleOnDelete}
              />
            ))}
            {isNewBucket && (
              <div
                className={`${Styles.bucket_header} ${Styles.active} ${Styles.edit_cont}`}
              >
                <input
                  onKeyDown={handleEnterKeyPress}
                  type="text"
                  className={Styles.edit_inp}
                  value={newBucketValue}
                  autoFocus={true}
                  onChange={(e) => setNewBucketValue(e.target.value)}
                />
                <div className={Styles.action_btn}>
                  <svg
                    onClick={() => setIsNewBucket(false)}
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                  >
                    <circle cx="10" cy="10" r="10" fill="#676F7E" />
                    <path
                      d="M12.9998 7.00003L9.96344 10.0364M6.99984 13L9.96344 10.0364M9.96344 10.0364L6.92709 7.00003M9.96344 10.0364L12.9998 13.0727"
                      stroke="white"
                      stroke-width="1.8"
                      stroke-linecap="square"
                      stroke-linejoin="round"
                    />
                  </svg>

                  <svg
                    onClick={() =>
                      handleOnAdd({
                        selectedBucketId: "",
                        bucktInput: newBucketValue,
                        Userid: Userid,
                      })
                    }
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                  >
                    <circle cx="10" cy="10" r="10" fill="#0D802D" />
                    <path
                      d="M5.5 9.5L7.85714 13L15 8"
                      stroke="white"
                      stroke-width="1.8"
                    />
                  </svg>
                </div>
              </div>
            )}
          </>
        )}

        {currentWindowWidth <= 600 && (
          <div className={Styles.close_btn}>
            <svg
              onClick={() => setIsBcket(false)}
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
            >
              <circle cx="10" cy="10" r="10" fill="#676F7E" />
              <path
                d="M12.9998 7.00003L9.96344 10.0364M6.99984 13L9.96344 10.0364M9.96344 10.0364L6.92709 7.00003M9.96344 10.0364L12.9998 13.0727"
                stroke="white"
                stroke-width="1.8"
                stroke-linecap="square"
                stroke-linejoin="round"
              />
            </svg>
          </div>
        )}
      </div>
    </div>
  );
};

export default BucketSideBar;

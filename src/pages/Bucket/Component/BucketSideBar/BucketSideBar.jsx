import React, { useContext, useState } from "react";
import CustomDropDown from "../../../../components/custom-dropdown/CustomDropDown";
import AuthContext from "../../../../context/AuthProvider";
import UseBucket from "../../../../hooks/bucket/useBucket";
import { notifySuccess } from "../../../../utils/notify";
import Styles from "./style.module.css";

const BucketProjects = ({
  label,
  Userid,
  bucketId,
  setSelectedBucket,
  handleOnAdd,
  hadnleOnDelete,
  index,
  getAllBucketIcon,
  selectedBucket,
  setEditLable,
  editLable,
  setSelectedBucketId,
}) => {
  const [isEdit, setIsEdit] = useState(false);
  const [editValue, setEditValue] = useState(label);

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

  const handelIconListing = (bucket, bucketId) => {
    setSelectedBucket(bucket);
    if (bucket == "Favorite") {
      getAllBucketIcon(Userid);
      setSelectedBucketId(null);

    } else {
      setSelectedBucketId(bucketId);
      getAllBucketIcon(Userid, bucketId);
    }
  };

  const handleEdit = (label) => {
    setEditLable(label);
    setIsEdit(true);
  };

  return (
    <div style={{ width: "100%" }}>
      {editLable == label && isEdit ? (
        <div
          className={`${Styles.bucket_header} ${
            selectedBucket?.toLowerCase() == label?.toLowerCase() &&
            Styles.active
          } ${Styles.edit_cont}`}
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
      ) : (
        <div
          className={`${Styles.bucket_header} ${
            selectedBucket?.toLowerCase() == label?.toLowerCase() &&
            Styles.active
          }`}
        >
          <div className={Styles.label_cont}>
            <span onClick={() => handelIconListing(label, bucketId)}>
              {label}
            </span>
            {label != "Favorite" && (
              <svg
                className={Styles.edit_btn}
                onClick={() => handleEdit(label)}
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
          <div className={Styles.three_dots}>
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
                width={"100%"}
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
        </div>
      )}
    </div>
  );
};

const BucketSideBar = ({
  isAuthenticated,
  setIsLoginOpen,
  setIsBcket,
  currentWindowWidth,
  Userid,
  bucketData,
  setBucketData,
  setBucketIcons,
  getAllBucketIcon,
  selectedBucket,
  setSelectedBucket,
  setSelectedBucketId,
}) => {
  const [isNewBucket, setIsNewBucket] = useState(false);
  const [newBucketValue, setNewBucketValue] = useState("");
  const { auth } = useContext(AuthContext);
  const [editLable, setEditLable] = useState("");

  const { UseBucketList, UseEditBucket, UseAddBucket, UseDeleteBucket } =
    UseBucket();

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

  return (
    <div className={Styles.bucket_sidebar_wraper}>
      <div className={Styles.bucket_sidebar}>
        {currentWindowWidth <= 600 && (
          <h3 className={Styles.my_bucket_heading}>My Bucket</h3>
        )}
        <div
          className={Styles.bucket_header}
          style={{ padding: ".6rem 1.25rem" }}
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
              setBucketIcons={setBucketIcons}
              getAllBucketIcon={getAllBucketIcon}
              setSelectedBucketId={setSelectedBucketId}
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
                setBucketIcons={setBucketIcons}
                getAllBucketIcon={getAllBucketIcon}
                setEditLable={setEditLable}
                editLable={editLable}
                setSelectedBucketId={setSelectedBucketId}
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

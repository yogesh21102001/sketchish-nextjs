import React, { useState, useEffect } from "react";
import Styles from "../IconSearchResult-v2/style.module.css";
import CommonStyle from "../../style/commonStyle.module.css";

import NavBar from "../../components/NavBar/NavBar";
import BucketSideBar from "./Component/BucketSideBar/BucketSideBar";
import Spinner from "../../components/spinner/spinner";

import { isAuthenticated, replaceSpacesWithHyphens } from "../../utils/helpers";
import { IconCard } from "../../ui";
import UseBucket from "../../hooks/bucket/useBucket";
import { isEmpty } from "lodash";
import { IconResultNotFound } from "../IconSearchResult-v2/components";
import { notifySuccess } from "../../utils/notify";
import { useNavigate } from "react-router-dom";

export const Bucket = () => {
  const [bucketIcons, setBucketIcons] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedBucket, setSelectedBucket] = useState("Favorite");
  const [selectedBucketId, setSelectedBucketId] = useState();
  const [bucketData, setBucketData] = useState([]);
  const [Userid, setUserId] = useState("");

  const navigate = useNavigate();

  const {
    UseGetBucketIcon,
    UseGetBucketIconFav,
    UseBucketList,
    UseDeleteBucketIcon,
  } = UseBucket();

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
      await getAllBucketIconFav(Userid);
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

  const deleteBucketIcon = async (id) => {
    const data = await UseDeleteBucketIcon({
      userId: Userid._id ? Userid._id : Userid.id,
      bucketId: selectedBucket == "Favorite" ? null : selectedBucketId,
      productVariantId: id,
    });

    setLoading(false);
    notifySuccess(data);
    if (selectedBucket == "Favorite") {
      getAllBucketIconFav(Userid);
    } else {
      getAllBucketIcon(Userid, selectedBucketId);
    }
  };

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    setUserId(user);
    getAllBucketData(user);
    getAllBucketIcon(user);
  }, []);

  return (
    <div>
      <NavBar />
      {loading && (
        <div class="loader">
          <Spinner></Spinner>
        </div>
      )}
      <div className={Styles.main_cont}>
        <BucketSideBar
          isAuthenticated={isAuthenticated}
          bucketData={bucketData}
          setBucketData={setBucketData}
          Userid={Userid}
          bucketIcons={bucketIcons}
          setBucketIcons={setBucketIcons}
          getAllBucketIcon={getAllBucketIcon}
          setSelectedBucket={setSelectedBucket}
          selectedBucket={selectedBucket}
          setSelectedBucketId={setSelectedBucketId}
        />
        <div className={Styles.rgt_sec}>
          <div className={Styles.icon_results_cont}>
            <div className={Styles.search_filter}>
              <div className={Styles.top}>
                <h1>{selectedBucket}</h1>
              </div>
            </div>
            <div className={Styles.icon_result}>
              {bucketIcons?.length == 0 && !loading && (
                <IconResultNotFound fromBucket={true} />
              )}
              <div className={CommonStyle.icon_cards_wraper}>
                {bucketIcons?.length > 0 &&
                  bucketIcons?.map((icon, index) => (
                    <IconCard
                      key={index}
                      lable={icon?.label}
                      pro={icon?.paid === 1 ? true : false}
                      newIcon={icon?.isNew}
                      preView={icon?.webpUrl ? icon?.webpUrl : icon?.previewUrl}
                      isAuthenticated={isAuthenticated}
                      productId={icon?._id}
                      deleate={true}
                      onDelete={() => deleteBucketIcon(icon?._id)}
                      onClick={() =>
                        navigate(
                          `/icons/${replaceSpacesWithHyphens(icon?.label)}?t=${
                            icon?.type
                          }&s=${icon?.styleSet}`
                        )
                      }
                    />
                  ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

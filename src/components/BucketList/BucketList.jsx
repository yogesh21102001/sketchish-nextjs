import React, {useState} from 'react'
import Styles from "./style.module.css"

const BucketList = ({ bucketData, handleBucketChange, width, containerStyle, style }) => {
  return (
    <div
      className={Styles.add_to_bucket_wraper}
      style={{ width: width, ...containerStyle }}
    >
      <div className={Styles.add_to_bucket_cont} style={{ width: width, ...style }}>
        <div className={Styles.add_to_bucket_header}>
          <p>Add to bucket</p>
        </div>
        <div className={Styles.options_cont}>
          <div
            className={Styles.option}
            onClick={() => handleBucketChange("Favorite")}
          >
            <p>Favorite</p>
          </div>
          {typeof bucketData == "object" &&
            bucketData?.map((bucket) => (
              <div
                className={Styles.option}
                onClick={() => handleBucketChange(bucket?.id)}
              >
                <p>{bucket?.bucketName}</p>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default BucketList
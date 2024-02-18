import { useEffect, useState } from "react";
import UseBucket from "../../../../hooks/bucket/useBucket";
import { notifySuccess } from "../../../../utils/notify";
import './mybucket.css'

export default function BucketDialog({
  onClose,
  setBucketData,
  editBucketData,
  setSelectedBucket,
  setEditBucketData,
}) {
  const [bucktInput, setBucketInput] = useState();
  const [disabledBtn, setDisabledBtn] = useState(true);
  const { UseAddBucket, UseEditBucket, UseBucketList } = UseBucket();
  const id = JSON.parse(localStorage.getItem("user"))

  const handleOnAdd = async () => {
    if (editBucketData?.editIndex && editBucketData) {
      const payloadData = {
        bucketId: editBucketData?.editIndex,
        bucketName: bucktInput
      }
      const data = await UseEditBucket(payloadData);
      if (data == "Bucket updated succesfully.") {
        notifySuccess(data)
      }
      const response = await UseBucketList({
        id: id.id ? id.id : id._id
      })
      setSelectedBucket(bucktInput)
      setBucketData(response)

    } else {
      const payloadData = {
        userId: id.id ? id.id : id._id,
        bucketName: bucktInput
      }
      const data = await UseAddBucket(payloadData);
      const response = await UseBucketList({
        id: id.id ? id.id : id._id
      })
      if (data == "OK") {
        notifySuccess("Bucket Add Successfully")
      }
      setBucketData(response)
    }
    handleOnClose();
  };

  useEffect(() => {
    if (bucktInput) {
      setDisabledBtn(false);
    } else {
      setDisabledBtn(true);
    }
  }, [bucktInput]);

  useEffect(() => {
    if (editBucketData) {
      setBucketInput(editBucketData?.obj);
    }
  }, [editBucketData]);

  const handleOnClose = () => {
    setEditBucketData();
    onClose();
  };

  return (
    <div className="bucket-dialog-root">
      <div className="bucket-dialog-body">
        <div className="bucket-title">
          <h1>Bucket</h1>
        </div>
        <div className="bucktet-form">
          <input
            placeholder={editBucketData ? "New Bucket Name" : "Bucket Name"}
            className="bucket-input"
            value={bucktInput}
            onChange={(e) => setBucketInput(e.target.value)}
          />
          <div className="bucket-footer">
            <button className="bucket-cancel-btn" onClick={handleOnClose}>
              Cancel
            </button>
            <button
              disabled={disabledBtn}
              className={disabledBtn ? "create-btn disabled" : "create-btn"}
              onClick={handleOnAdd}
            >
              {editBucketData ? "Update" : "Create"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

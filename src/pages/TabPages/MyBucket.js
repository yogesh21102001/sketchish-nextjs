import { useEffect, useState } from "react";
import { AddIcon, DeleteRedIcon, MoreInfo, OSColorSVG } from "../../assets/svg";
import { ResponsiveModal } from "../../components/ResponsiveModal";
import useToggle from "../../hooks/useToggle";
import BucketDialog from "./BucketDialog";
import "./mybucket.css";
import UseBucket from "../../hooks/bucket/useBucket";
import { notifySuccess } from "../../utils/notify";

export default function MyBucket() {

  const [bucketPopUp, setBucketPopUp] = useToggle(false);
  const [editBucketData, setEditBucketData] = useState();

  const { UseBucketList, UseDeleteBucket, UseGetBucketIcon, UseGetBucketIconFav, UseDeleteBucketIcon } = UseBucket();

  const Userid = JSON.parse(localStorage.getItem("user"))
  const [bucketData, setBucketData] = useState([])
  const getAllBucketData = async () => {
    const response = await UseBucketList({
      id: Userid.id ? Userid.id : Userid._id
    })
    setBucketData(response)
  }

  const hadnleOnDelete = async (id) => {
    const data = await UseDeleteBucket({
      id: id
    })
    if (data == 'Bucket deleted successfully.') {
      notifySuccess(data)
    }
    const response = await UseBucketList({
      id: Userid.id ? Userid.id : Userid._id
    })
    setBucketData(response)
  };

  const [bucketIcons, setBucketIcons] = useState([])

  const getAllBucketIcon = async () => {
    const bucketId = localStorage.getItem('bucketId')
    const data = await UseGetBucketIcon({
      userId: Userid.id ? Userid.id : Userid._id,
      bucketId: bucketId
    })
    setBucketIcons(data)
  }

  const getAllBucketIconFav = async () => {
    const data = await UseGetBucketIconFav({
      userId: Userid.id ? Userid.id : Userid._id,
    })


    setBucketIcons(data)
  }
 const bucketId = localStorage.getItem('bucketId')

  const deleteBucketIcon = async (id) => {
    const data = await UseDeleteBucketIcon({
      userId: Userid._id ? Userid._id : Userid.id ,
      bucketId: bucketId,
      productVariantId: id
    })
    notifySuccess(data)
    if (bucketId == "null" || bucketId == null) {
      getAllBucketIconFav()
    } else {
      getAllBucketIcon()
    }
  }
  useEffect(() => {
    getAllBucketData()
  }, [])

  useEffect(() => {
    getAllBucketIconFav()
  }, [])
  return (
    <div className="mybucket-root">
      <div className="mybucket-title">
        <h1>My Bucket</h1>
      </div>
      <div className="myBucket-grid">
        <div className="myBucket-left">
          <div className="myBucket-left-inner">
            <div className="myBucker-left-item favorit-item" onClick={() => { localStorage.setItem('bucketId', null); getAllBucketIconFav() }}>
              <p>Favourite Icons</p>
            </div>
            {bucketData !== "User not have this bucket" ?
              bucketData?.map((obj, index) => (

                <div className="myBucker-left-item" onClick={() => { localStorage.setItem('bucketId', obj._id); getAllBucketIcon() }}>
                  <p>{obj.bucketName}</p>
                  <div className="submenu-root">
                    <button className="more-info-btn">
                      <MoreInfo />
                    </button>
                    <div className="sub-menu">
                      <div className="sub-menu-inner">
                        <button
                          className="rename-btn"
                          onClick={() => {
                            // eslint-disable-next-line no-unused-expressions
                            setEditBucketData({ bucketName: obj.bucketName, editIndex: obj._id });
                            setBucketPopUp();
                          }}
                        >
                          Rename
                        </button>
                        <button
                          className="delete-btn"
                          onClick={() => hadnleOnDelete(obj._id)}
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )) : ""}
            <div
              className="myBucker-left-item new-buckt"
              onClick={setBucketPopUp}
            >
              <p>New Bucket</p>
              <AddIcon />
            </div>
          </div>
        </div>
        <div className="myBucket-right">
          <div className="myBucket-right-grid">
            {bucketIcons !== "User not add any product in bucket" ?
              bucketIcons?.map((obj) => (
                <div className="myBucket-right-item">

                  <div className="icon-bucket">
                    <img src={obj?.previewUrl} alt="img" />
                  </div>
                  <p className="label-icon">{obj?.label}</p>
                  <div className="action-icon">
                    <OSColorSVG />
                    <button>
                      <DeleteRedIcon onClick={() => { deleteBucketIcon(obj?._id) }} />
                    </button>
                  </div>
                </div>
              )) : ""}
          </div>
        </div>
      </div>
      <ResponsiveModal
        isOpen={bucketPopUp}
        onClose={setBucketPopUp}
        closeOnOverlayClick={false}
        component={
          <BucketDialog
            onClose={setBucketPopUp}
            setBucketData={setBucketData}
            editBucketData={editBucketData}
            setEditBucketData={setEditBucketData}
          />
        }
      />
    </div>
  );
}

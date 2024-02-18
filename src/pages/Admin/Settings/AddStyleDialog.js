import { CloseBtnSVG } from "../../../assets/ossvg";
import Dialog from "./Dialog";
import "./style.css";
import upload from "./img/upload.svg";
import { ToggleSwitch } from "../../../components/FormControles";
import { useEffect, useRef, useState } from "react";
import useAdmin from '../../../hooks/admin/useAdmin'
import { notifySuccess } from "../../../utils/notify";


export default function AddStyleDialog({
  open,
  onClose,
  setStyleIcon,
  editStyleIcon,
}) {
  const { setStyleSetIcon, UpdateStyleSetIcon, GetStyleIcon } = useAdmin();
  const [file, setFile] = useState([]);
  const [stylesIcon, setStylesIcon] = useState({
    title: "",
    description: "",
    paid: 1
  })

  const handleOnFile = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      setFile(reader.result);
    };
    reader.readAsDataURL(file);
  };


  const icon = useRef(null);

  const handleOnAdd = async () => {
    if (editStyleIcon?._id) {
      const payloadData = {
        styleSetId: editStyleIcon?._id,
        title: stylesIcon.title,
        description: stylesIcon.description,
        paid: stylesIcon.paid,
        assets: file,
      }

      const updateTableRes = await UpdateStyleSetIcon(payloadData)
      if (updateTableRes === 'Style set Updated.') {
        setStylesIcon({
          title: "",
          description: "",
          paid: 1
        })
        const allTypeList = await GetStyleIcon()
        setStyleIcon(allTypeList)
        notifySuccess("Type Updated Successfully");
      }
    } else {

      const payloadData = {
        title: stylesIcon.title,
        description: stylesIcon.description,
        paid: stylesIcon.paid,
        assets: file,
      };

      const createTableRes = await setStyleSetIcon(payloadData)
      if (createTableRes === "OK") {
        setStylesIcon({
          title: "",
          description: "",
          paid: 1
        })
        const allTypeList = await GetStyleIcon()
        setStyleIcon(allTypeList)
        notifySuccess("Style Set Created Successfully.");
      }
    }
    onClose();
  };

  useEffect(() => {
    if (editStyleIcon?._id) {
      setStylesIcon({
        title: editStyleIcon?.title,
        description: editStyleIcon?.description,
        paid: editStyleIcon?.paid
      })
      setFile(editStyleIcon?.iconUrl);
    }else{
      setStylesIcon({
        title: '',
        description: '',
        paid: 1
      })
       setFile([]);
    }
  }, [editStyleIcon]);

  return (
    <Dialog open={open} onClose={onClose}>
      <div>
        <div className="addStyle-dialog-root">
          <div className="dialog-header">
            <p>Add New Style</p>
            <div className="header-close" onClick={onClose}>
              <CloseBtnSVG />
            </div>
          </div>
          <div className="style-dialg-grid">
            <div className="style-dialog-left">
              <div
                onClick={() => {
                  icon.current.click();
                }}
              >
                {editStyleIcon?._id ? <img src={file[0] == undefined ? upload : file[1]?.name ? URL.createObjectURL(file[1]) : file } /> : <img src={file[0] == undefined ? upload : URL.createObjectURL(file[1])} />}
              </div>
              <input
                type="file"
                style={{ display: "none" }}
                ref={icon}
                onChange={async (event) => {
                  if (
                    event.currentTarget.files &&
                    event.currentTarget.files.length > 0
                  ) {
                    const file = event.currentTarget.files;
                    let tempArr = [file];
                    for (const elem of file) {
                      tempArr.push(elem);
                    }
                    setFile(tempArr);
                  }
                }}
              />
              <p>240px, PNG file format.</p>
            </div>
            <div className="style-dialog-right">
              <div className="style-dialog-input">
                <input
                  type="text"
                  id="fname"
                  name="title"
                  placeholder="icon name"
                  className="icon-name"
                  onChange={(e) => setStylesIcon({ ...stylesIcon, title: e.target.value })}
                  value={stylesIcon.title}
                />
                <textarea
                  type="text"
                  id="fname"
                  name="description"
                  placeholder="icon description"
                  className="icon-brief"
                  onChange={(e) => setStylesIcon({ ...stylesIcon, description: e.target.value })}
                  value={stylesIcon.description}
                />
              </div>
              <div className="paid-unpaid">
                <p>Paid</p>
                <ToggleSwitch
                  isOn={stylesIcon.paid === 1 ? true : false}
                  id={"set-renew"}
                  onChange={(e) => setStylesIcon({ ...stylesIcon, paid: e.target.checked ? 1 : 0 })}
                />
              </div>
            </div>
          </div>
          <div className="style-dialog-footer">
            <button className="cancel-btn" onClick={onClose}>
              Cancel
            </button>
            <button className="add-btn" onClick={handleOnAdd}>
              {editStyleIcon?._id ? "Update" : "Add"}
            </button>
          </div>
        </div>
      </div>
    </Dialog>
  );
}

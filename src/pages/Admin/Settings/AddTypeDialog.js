import React from 'react'
import { CloseBtnSVG } from "../../../assets/ossvg";
import Dialog from "./Dialog";
import { useEffect, useState } from "react";
import { notifySuccess } from "../../../utils/notify";
import useAdmin from '../../../hooks/admin/useAdmin'
function AddTypeDialog({
  open,
  onClose,
  setListAllType,
  editType,
}) {

  const [typeName, setTypeName] = useState();
  const { CreateType, TypeGetAll, UpdateType } = useAdmin();

  const handleOnAdd = async () => {
    if (editType?._id) {
      const payloadData = {
        typeId: editType?._id,
        typeName: typeName
      }

      const updateTableRes = await UpdateType(payloadData)
      if (updateTableRes === 'Type Updated Successfully') {
        setTypeName(null)
        const allTypeList = await TypeGetAll()
        setListAllType(allTypeList)
          notifySuccess("Type Updated Successfully");
      }
    } else {
      const createTableRes = await CreateType({ typeName })
      if (createTableRes === "Type Created Successfully.") {
        setTypeName(null)
        const allTypeList = await TypeGetAll()
        setListAllType(allTypeList)
        notifySuccess("Type Created Successfully.");
      }
    }
    onClose();
  };

    useEffect(() => {
    if (editType?._id) {
      setTypeName(editType?.name);
    }
  }, [editType]);
  return (
    <Dialog open={open} onClose={onClose}>
      <div>
        <div className="addStyle-dialog-root">
          <div className="dialog-header">
            <p>{editType?._id ? 'Update type' : 'Add New Type'}</p>
            <div className="header-close" onClick={onClose}>
              <CloseBtnSVG />
            </div>
          </div>
          <div className='inputdiv'>
            <div className=''>
              <input type='text' name='name' value={typeName} onChange={(e) => { setTypeName(e.target.value) }} style={{ height: "38px", width: "350px", border: "1px solid #C8C9D0" }} />
            </div>
          </div>
          <div className="style-dialog-footer">
            <button className="cancel-btn" onClick={onClose}>
              Cancel
            </button>
            <button className="add-btn" onClick={handleOnAdd}>
              {editType?._id ? "Update" : "Add"}
            </button>
          </div>
        </div>
      </div>
    </Dialog>
  )
}

export default AddTypeDialog
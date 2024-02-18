import React from 'react'
import { CloseBtnSVG } from "../../../assets/ossvg";
import Dialog from "./Dialog";
import { useEffect, useState } from "react";
import { notifySuccess } from "../../../utils/notify";
import useAdmin from '../../../hooks/admin/useAdmin'
function AddSubCategoryDialog({
  open,
  onClose,
  setListAllSubCategory,
  editSubCategory,
}) {
   
   const [subCategoryName, setSubCategoryName] = useState();
  const { SubCreateCategory, SubCategoryGetAll, SubUpdateCategory } = useAdmin();



  const handleOnAdd = async() => {
     if (editSubCategory?._id) {
      const payloadData = {
        subCategoryId: editSubCategory?._id,
        subCategoryName: subCategoryName
      }

      const updateTableRes = await SubUpdateCategory(payloadData)
      if (updateTableRes === 'Sub Category Updated Successfully') {
        setSubCategoryName(null)
        const allSubCategory = await SubCategoryGetAll()
        setListAllSubCategory(allSubCategory)
          notifySuccess("Sub Category Updated Successfully");
      }
    } else {
      
      const createTableRes = await SubCreateCategory({ subCategoryName })
      if (createTableRes === "Sub Category Created Successfully.") {
        setSubCategoryName(null)
        const allSubCategory = await SubCategoryGetAll()
        setListAllSubCategory(allSubCategory)
        notifySuccess("Sub Category Created Successfully.");
      }
    }
    onClose();
  };

  useEffect(() => {
    if (editSubCategory?._id) {
      setSubCategoryName(editSubCategory?.name);
    }
  }, [editSubCategory]);
  return (
    <Dialog open={open} onClose={onClose}>
      <div>
        <div className="addStyle-dialog-root">
          <div className="dialog-header">
            <p>Add New Sub Category</p>
            <div className="header-close" onClick={onClose}>
              <CloseBtnSVG />
            </div>
          </div>
          <div className='inputdiv'>
         <div className=''>
          <input type='text' name="name" value={subCategoryName} onChange={(e) => {setSubCategoryName(e.target.value)}} style={{height:"38px",width:"350px",border:"1px solid #C8C9D0"}}/>
         </div>
         </div>
          <div className="style-dialog-footer">
            <button className="cancel-btn" onClick={onClose}>
              Cancel
            </button>
            <button className="add-btn" onClick={handleOnAdd}>
              {editSubCategory?._id ? "Update" : "Add"}
            </button>
          </div>
        </div>
      </div>
    </Dialog>
  )
}

export default AddSubCategoryDialog
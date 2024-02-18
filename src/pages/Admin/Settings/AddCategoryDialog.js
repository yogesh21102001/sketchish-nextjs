import React from 'react'
import { CloseBtnSVG } from "../../../assets/ossvg";
import Dialog from "./Dialog";
import { useEffect, useState } from "react";
import { notifySuccess } from "../../../utils/notify";
import useAdmin from '../../../hooks/admin/useAdmin'
function AddCategoryDialog({
  open,
  onClose,
  setListAllCategory,
  editCategory,
}) {

  const [categoryName, setCategoryName] = useState();
    const { CreateCategory, CategoryGetAll, UpdateCategory } = useAdmin();

  const handleOnAdd = async() => {
     if (editCategory?._id) {
      const payloadData = {
        categoryId: editCategory?._id,
        categoryName: categoryName
      }

      const updateTableRes = await UpdateCategory(payloadData)
      if (updateTableRes == 'Category Updated Successfully') {
        setCategoryName(null)
        const allTypeList = await CategoryGetAll()
        setListAllCategory(allTypeList)
          notifySuccess("Category Updated Successfully");
      }
    } else {
      const createTableRes = await CreateCategory({ categoryName })
      if (createTableRes == "Category Created Successfully.") {
        setCategoryName(null)
        const allTypeList = await CategoryGetAll()
        setListAllCategory(allTypeList)
        notifySuccess("Category Created Successfully.");
      }
    }
    onClose();
  };

  useEffect(() => {
    if (editCategory?._id) {
      setCategoryName(editCategory?.name);
    }
  }, [editCategory]);
  return (
    <Dialog open={open} onClose={onClose}>
      <div>
        <div className="addStyle-dialog-root">
          <div className="dialog-header">
            <p>Add New Category</p>
            <div className="header-close" onClick={onClose}>
              <CloseBtnSVG />
            </div>
          </div>
          <div className='inputdiv'>
         <div className=''>
          <input type='text' name="name" value={categoryName} onChange={(e) => { setCategoryName(e.target.value) }} style={{height:"38px",width:"350px",border:"1px solid #C8C9D0"}}/>
         </div>
         </div>
          <div className="style-dialog-footer">
            <button className="cancel-btn" onClick={onClose}>
              Cancel
            </button>
            <button className="add-btn" onClick={handleOnAdd}>
              {editCategory?._id ? "Update" : "Add"}
            </button>
          </div>
        </div>
      </div>
    </Dialog>
  )
}

export default AddCategoryDialog
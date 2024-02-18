import React, { useEffect, useState } from 'react'
import ModeEditOutlineOutlinedIcon from '@mui/icons-material/ModeEditOutlineOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import useAdmin from '../../../hooks/admin/useAdmin'
import { notifySuccess } from "../../../utils/notify";

const AdminSubCategory = ({
  setListAllSubCategory,
  listAllSubCategory,
  setEditSubCategory,
  setAddSubCategoryOpen,
}) => {
  const [isHovering, setIsHovering] = useState(false);
  const [desc, setDesc] = useState()
  const [asc, setAsc] = useState()
  const [id, setId] = useState();
  const { SubDelteCategory, SubCategoryGetAll } = useAdmin();


  useEffect(() => {
    ascOrder()
  }, [asc])

  useEffect(() => {
    descOrder()
  }, [desc])



  const ascOrder = () => {
    setListAllSubCategory(
      listAllSubCategory.sort(function (a, b) {
        const nameA = a.name.toUpperCase();
        const nameB = b.name.toUpperCase();
        if (nameA > nameB) {
          return -1;
        }
        if (nameA < nameB) {
          return 1;
        }

        return 0;
      })
    )

  }


  const descOrder = () => {
    const data = listAllSubCategory.sort(function (a, b) {
      const nameA = a.name.toUpperCase();
      const nameB = b.name.toUpperCase();
      if (nameA > nameB) {
        return 1;
      }
      if (nameA < nameB) {
        return -1;
      }

      return 0;
    });
    setListAllSubCategory(data)
  }


  const handleMouseOver = (id) => {
    setIsHovering(true);
    setId(id)
  };

  const handleMouseOut = () => {
    setIsHovering(false);
  };

  const deleteSubCtegory = async (subCatId) => {
    const deleteData = await SubDelteCategory(subCatId)
    if (deleteData === 'Sub Category not Found!') {
      notifySuccess(deleteData);
    } else if (deleteData === 'Sub Category Deleted Successfully') {
      const allSubCategoryList = await SubCategoryGetAll()
      setListAllSubCategory(allSubCategoryList)
      notifySuccess(deleteData);
    }
  }

  return (
    <>
      <div className=''>
        <div className="style-root-page">
          <div class="">
            <div className='w-full box-shadow-0 type-title'>
              <div className='order-div py-[12px]'>
                <div>
                  <h1 className='font-13' style={{ padding: "6px 0" }}>Sub Category</h1>
                </div>
                <div>
                  <div className='relative' style={{ display: "flex", flexDirection: "column", position: "relative" }}>
                    <div style={{ position: "absolute", top: "3px" }} onClick={() => { setDesc(desc ? false : true) }}> <ArrowDropUpIcon /></div>
                    <div style={{ position: "absolute", top: "10px" }} onClick={() => { setAsc(asc ? false : true) }}> <ArrowDropDownIcon /></div>
                  </div>
                </div>
              </div>


            </div>
            {listAllSubCategory?.map((name, index) => {
              return (
                <>
                  <div key={index} className='type-list' onMouseOver={() => { handleMouseOver(index + 1) }}
                    onMouseOut={handleMouseOut}>
                    <div className='parent-type-list'>
                      <div className='inner-type-div'>
                        <p className='font-12'>{name.name}</p>
                      </div>
                      <div>
                        {isHovering && id == index + 1 && (
                          <div className='icon-div'>
                            <div className='inner-type-div'>
                              <ModeEditOutlineOutlinedIcon onClick={() => {
                                setAddSubCategoryOpen(true);
                                setEditSubCategory(name);
                              }} />
                            </div>
                            <div className='inner-type-div'>
                              <DeleteOutlineOutlinedIcon onClick={() => {
                                deleteSubCtegory(name._id)
                              }} />
                            </div>
                          </div>
                        )}

                      </div>
                    </div>

                  </div>
                </>
              )
            })}
          </div>
        </div>
      </div>
    </>
  )
}

export default AdminSubCategory
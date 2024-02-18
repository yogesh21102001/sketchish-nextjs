import { React, useEffect, useState } from 'react'
import ModeEditOutlineOutlinedIcon from '@mui/icons-material/ModeEditOutlineOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import useAdmin from '../../../hooks/admin/useAdmin'
import { notifySuccess } from "../../../utils/notify";

function AdminType({
  setListAllType,
  listAllType,
  setEditType,
  setAddTypeDialog,
}) {
  const [isHovering, setIsHovering] = useState(false);
  const [id, setId] = useState();
  const { DelteType, TypeGetAll } = useAdmin();
  const [desc, setDesc] = useState()
  const [asc, setAsc] = useState()

  // console.log("check", check);

  const handleMouseOver = (id) => {
    setIsHovering(true);
    setId(id)
  };

  useEffect(() => { 
    ascOrder()
  }, [asc])

  useEffect(() => {
    descOrder()
  }, [desc])

  const handleMouseOut = () => {
    setIsHovering(false);
  };

  const ascOrder = () => {
    setListAllType(
      listAllType.sort(function (a, b) {
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
    const data = listAllType.sort(function (a, b) {
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
    setListAllType(data)
  }

  const deleteType = async (typeId) => {
    const deleteData = await DelteType(typeId)
    if (deleteData === 'Type not Found!') {
      notifySuccess(deleteData);
    } else if (deleteData === 'Type Deleted Successfully') {
      const allTypeList = await TypeGetAll()
      setListAllType(allTypeList)
      notifySuccess(deleteData);
    }
  }
  return (
    <div>
      <div className="style-root-page">
        <div class="">
          <div className='w-full box-shadow-0 type-title'>
            <div className='order-div py-[12px]'>
              <div>
                <h1 className='font-13' style={{ padding: "6px 0" }}>Type</h1>
              </div>
              <div>
                <div className='relative' style={{ display: "flex", flexDirection: "column", position: "relative" }}>
                  <div style={{ position: "absolute", top: "3px" }} onClick={() => { setDesc(desc ? false : true) }}> <ArrowDropUpIcon /></div>
                  <div style={{ position: "absolute", top: "10px" }} onClick={() => { setAsc(asc ? false : true) }}> <ArrowDropDownIcon /></div>
                </div>
              </div>
            </div>
          </div>
          {listAllType?.map((name, index) => {
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
                              setAddTypeDialog(true);
                              setEditType(name);
                            }} />
                          </div>
                          <div className='inner-type-div' >
                            <DeleteOutlineOutlinedIcon onClick={() => {
                              deleteType(name._id)
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
  )
}

export default AdminType
import { useEffect, useState } from "react";
import { Navigation } from "../../../components/FormControles/Navigation/navigation";
import AdminStyle from "./AdminStyle";
import "./style.css";
import { Tabs } from "./Tabs";
import AddStyleDialog from "./AddStyleDialog";
import useToggle from "../../../hooks/useToggle";
import AdminType from "./AdminType";
import AddTypeDialog from "./AddTypeDialog";
import AdminCategory from "./AdminCategory";
import AdminSubCategory from "./AdminSubCategory";
import AddCategoryDialog from "./AddCategoryDialog";
import AddSubCategoryDialog from "./AddSubCategoryDialog";
import useAdmin from '../../../hooks/admin/useAdmin'
import { AdminSidebar } from '../components';
export function AdminSettings() {
  const [tab, setTab] = useState(0);

  const TabsList = [
    { tabIndex: 0, name: "Style Set" },
    { tabIndex: 1, name: "Type" },
    { tabIndex: 2, name: "Category" },
    { tabIndex: 3, name: "Sub Category" },
  ];

  const handleChange = (event, newValue) => {
    setTab(newValue);
  };
  const [addStyleDialogOpen, setAddStyleDialogOpen] = useToggle(false);
  const [addTypeDialog, setAddTypeDialog] = useToggle(false);
  const [addcategoryOpen, setAddCategoryOpen] = useToggle(false);
  const [addsubcategoryOpen, setAddSubCategoryOpen] = useToggle(false)
  const [styleIcon, setStyleIcon] = useState([]);
  const [editType, setEditType] = useState([]);
  const [editCategory, setEditCategory] = useState([]);
  const [editSubCategory, setEditSubCategory] = useState([]);
  const [listAllType, setListAllType] = useState([]);
  const [listAllCategory, setListAllCategory] = useState([]);
  const [listAllSubCategory, setListAllSubCategory] = useState([]);
  const [editStyleIcon, setEditStyleIcon] = useState();
  const { TypeGetAll, CategoryGetAll, SubCategoryGetAll, GetStyleIcon } = useAdmin();

  useEffect(() => {
    getType();
    getCategory();
    getSubCategory();
    getStyleSet();
  }, [])

  const getType = async () => {
    const allTypeList = await TypeGetAll()
    setListAllType(allTypeList)
  }

  const getCategory = async () => {
    const allCategoryList = await CategoryGetAll()
    setListAllCategory(allCategoryList)
  }

  const getSubCategory = async () => {
    const allSubCategoryList = await SubCategoryGetAll()
    setListAllSubCategory(allSubCategoryList)
  }

  const getStyleSet = async () => {
    const allStyleSet = await GetStyleIcon()
    setStyleIcon(allStyleSet)
  }

  return (
    <div>
      <div className="cust-container">
        <div className="cust-list-nav-bar">
          <Navigation lable={"settings"} />
          <div className="container-body" style={{ marginTop: 76, display: 'flex' }}>
            <AdminSidebar></AdminSidebar>
            <div className="admin-container-body">
              <div className="style-body ">
                <div className="style-tabs-root">
                  <Tabs value={tab} onchange={handleChange} array={TabsList} />
                  <button
                    className="add-btn "
                    onClick={() => {
                      setEditStyleIcon('');
                      setEditSubCategory('');
                      setEditType('');
                      setEditCategory('')
                      {
                        tab === 0 && (
                          setAddStyleDialogOpen(true)
                        )
                        tab === 1 && (
                          setAddTypeDialog(true)
                        )
                        tab === 2 && (
                          setAddCategoryOpen(true)
                        )
                        tab === 3 && (
                          setAddSubCategoryOpen(true)
                        )
                      }


                    }}
                  >
                    Add
                  </button>
                </div>
                <div className="tabs-contain">
                  {tab === 0 && (
                    <AdminStyle
                      setStyleIcon={setStyleIcon}
                      styleIcon={styleIcon}
                      setAddStyleDialogOpen={setAddStyleDialogOpen}
                      setEditStyleIcon={setEditStyleIcon}
                    />
                  )}
                  {tab === 1 && (
                    <AdminType
                      listAllType={listAllType}
                      setAddTypeDialog={setAddTypeDialog}
                      setEditType={setEditType}
                      setListAllType={setListAllType}
                    />
                  )}
                  {
                    tab === 2 && (
                      <AdminCategory
                        listAllCategory={listAllCategory}
                        setAddCategoryOpen={setAddCategoryOpen}
                        setEditCategory={setEditCategory}
                        setListAllCategory={setListAllCategory}
                      />
                    )
                  }
                  {
                    tab === 3 && (
                      <AdminSubCategory
                        listAllSubCategory={listAllSubCategory}
                        setAddSubCategoryOpen={setAddSubCategoryOpen}
                        setEditSubCategory={setEditSubCategory}
                        setListAllSubCategory={setListAllSubCategory}
                      />
                    )
                  }
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <AddStyleDialog
        open={addStyleDialogOpen}
        onClose={setAddStyleDialogOpen}
        setStyleIcon={setStyleIcon}
        editStyleIcon={editStyleIcon}
      />
      <AddTypeDialog
        open={addTypeDialog}
        setListAllType={setListAllType}
        onClose={setAddTypeDialog}
        editType={editType}
      />
      <AddCategoryDialog
        open={addcategoryOpen}
        setListAllCategory={setListAllCategory}
        onClose={setAddCategoryOpen}
        editCategory={editCategory}
      />
      <AddSubCategoryDialog
        open={addsubcategoryOpen}
        onClose={setAddSubCategoryOpen}
        setListAllSubCategory={setListAllSubCategory}
        editSubCategory={editSubCategory}
      />
    </div>
  );
}

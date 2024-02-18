import ProductCard from "./ProductCard";
import { Controller, useForm } from "react-hook-form";
import Checkbox from "@mui/material/Checkbox";
import { makeStyles } from "@mui/styles";
import Select from "../../../components/select/Select";
import { DeleteIcon } from "../../../assets/svg";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import useProduct from "../../../hooks/product/useProduct";
import EditProductCard from "./EditProductCard";
import useAdmin from '../../../hooks/admin/useAdmin';
import { notifySuccess } from "../../../utils/notify";

const useStyles = makeStyles(() => ({
  checkbox: {
    padding: "5px",

    "&.Mui-checked": {
      color: "#7238FA!important",
    },
    "& svg": {
      fontSize: "inherit",
      width: 25,
      height: 25,
      border: "1.5px",
      borderRadius: "2px",
    },
  },
}));

export function AddProductIcon() {

  const [require, setReuire] = useState(false);

  const classes = useStyles();
  const [iconsData, setIconsData] = useState();

  const [iconDetails, setIconDetails] = useState();

  const [checkCount, setCheckCount] = useState(0);

  const { setUploadIcon } = useProduct();

  useEffect(() => {
    getType();
    getCategory();
    getSubCategory();
    getStyleSet();
  }, [])

  const [styleIcon, setStyleIcon] = useState([]);
  const [listAllType, setListAllType] = useState([]);
  const [listAllCategory, setListAllCategory] = useState([]);
  const [listAllSubCategory, setListAllSubCategory] = useState([]);
  const { TypeGetAll, CategoryGetAll, SubCategoryGetAll, GetStyleIcon } = useAdmin();

  const getType = async () => {
    const allTypeList = await TypeGetAll()

    allTypeList && allTypeList.map((res) => {
      setListAllType((listAllType) => [...listAllType, {
        label: res.name,
        value: res.name
      }])
    })
  }


  const getCategory = async () => {
    const allCategoryList = await CategoryGetAll()
    allCategoryList && allCategoryList.map((res) => {
      setListAllCategory((listAllCategory) => [
        ...listAllCategory,
        { label: res.name, value: res.name }
      ])
    })
  }


  const getSubCategory = async () => {
    const allSubCategoryList = await SubCategoryGetAll()
    allSubCategoryList && allSubCategoryList.map((res) => {
      setListAllSubCategory((listAllSubCategory) => [...listAllSubCategory, {
        label: res.name,
        value: res.name
      }])
    })
  }

  const getStyleSet = async () => {
    const allStyleSet = await GetStyleIcon()
    allStyleSet && allStyleSet.map((res) => {
      setStyleIcon((styleIcon) => [...styleIcon, {
        label: res.title,
        value: res.title,
      }])
    })
  }

  const { control, handleSubmit, setValue } = useForm({
    mode: "onChange",
  });

  // const [msrp, qty, available_in, brandname, partdesp, partno] = useWatch({
  //   control,
  //   name: ["msrp", "qty", "available_in", "brand_name", "part_desp", "part_no"],
  // });

  // const onSubmit = (data) => {
  //   console.log(data);
  // };

  const iconDetailsHandler = (e, idx) => {
    if (e === "delete") {
      setIconDetails(iconDetails?.filter((detail, index) => index !== idx));
      setIconsData(iconsData?.filter((file, index) => index !== idx));
      return;
    }

    let tmpDetails = [...iconDetails];

    if (e.target.name === "productCheck") {
      tmpDetails[idx][e.target.name] = e.target.checked;
      setCheckCount(checkCount + (e.target.checked ? 1 : -1));
    } else {
      tmpDetails[idx][e.target.name] = e.target.value || e.target.e;
    }
    setIconDetails(tmpDetails);
    //tmpDetails[idx][e.target.name] = e.target.value;
  };

  const checkBulkState = (e) => {
    setCheckCount(e.target.checked ? iconDetails?.length : 0);
    setIconDetails(
      iconDetails?.map((detail) => {
        return { ...detail, productCheck: e.target.checked };
      })
    );
  };

  const bulkChangeHandler = (e, name) => {
    if (e === "delete") {
      setIconDetails(
        iconDetails?.filter((detail, index) => detail.productCheck !== true)
      );
      // setIconsData(iconsData.filter((file, index) => detail.productCheck!==true));
      return;
    }

    if (name === "paid") {
      setIconDetails(
        iconDetails?.map((detail) => {
          return detail.productCheck ? { ...detail, [name]: e } : detail;
        })
      );
      return;
    }
    setIconDetails(
      iconDetails?.map((detail) => {
        return detail.productCheck ? { ...detail, [name]: e } : detail;
      })
    );
  };

  const location = useLocation();
  const navigate = useNavigate();
  const [able, setDisable] = useState([])

  useEffect(() => {
    if (location) {
      setIconsData(Array.from(location?.state?.iconsData));

      const files = location?.state?.iconsData;
      const details = [];
      for (let i = 0; i < files?.length; i++) {
        details.push({
          iconname: files.item(i).name?.split(".")[0],
          fileName: [files.item(i)],
          productCheck: false,
        });
      }
      setIconDetails(details);
    }
  }, [location]);

  const getAbleValue = (val) => {
    setDisable([...able, val])
  }




  const publishIcon = async () => {
    iconDetails.map(async (res) => {
      let categoryRes = [];
      res?.Category.forEach((e) => categoryRes.push(e.value));
      let subCategoryRes = [];
      res?.SubCategory.forEach((e) => subCategoryRes.push(e.value));
      const payloadData = {
        name: res.iconname,
        styleSet: res.styleSet.value,
        label: res.iconname.toUpperCase(),
        category: categoryRes.join(),
        type: res.Type.value,
        subCategory: subCategoryRes.join(),
        tags: res.Tag
          ?.split(",")
          .map((e) => e.trim())
          .join(),
        assets: res.fileName,
      };
      await setUploadIcon(payloadData);
    })
    notifySuccess("Upload Icons Successfully");
    navigate("/admin")
  }
  const editMode = false;
  return (
    <div className="product-icon-section">
      <div className="product-icon-inner ">
        <div className="product-header ">
          <div className="product-header-grid inner-container">
            <p>Add Icon</p>
            <div>
              <button className="cancel-btn" onClick={() => navigate("/admin")}>
                Cancel
              </button>
              <button className="publish-btn" type="submit" onClick={() => { publishIcon() }}>
                Publish
              </button>
            </div>
          </div>
        </div>
        {editMode ? (
          <div className="edit-card inner-container">
            <EditProductCard />
          </div>
        ) : (
          <form id={"add-form"}>
            <div className="product-grid inner-container">
              <div className="bulk-root">
                <div className="bulk-select">
                  <Controller
                    name={"dock_available"}
                    control={control}
                    render={({ field: { name, value, onChange } }) => (
                      <Checkbox
                        name={name}
                        id={name}
                        value={value}
                        checked={checkCount !== 0}
                        indeterminate={
                          checkCount !== 0 && checkCount !== iconDetails?.length
                        }
                        className={classes.checkbox}
                        onChange={checkBulkState}
                      />
                    )}
                  />
                  <p>Bulk Select</p>
                </div>
                {checkCount > 0 && (
                  <div className="bulk-right-side">
                    <div className="delte-right-side">
                      <div
                        className="delete-btn"
                        onClick={() => bulkChangeHandler("delete")}
                      >
                        <DeleteIcon />
                      </div>
                    </div>
                    <div className="product-second-div">
                      <Controller
                        name={"Category"}
                        control={control}
                        render={({ field: { name, value, onChange } }) => (
                          <>
                            <Select
                              options={listAllCategory}
                              multi
                              id={name}
                              name={name}
                              value={value}
                              onChange={(e) => {
                                onChange(e);
                                bulkChangeHandler(e, name);
                              }}
                              label={"Category"}
                              width="290px  "
                            />
                          </>
                        )}
                      />
                      <Controller
                        name={"SubCategory"}
                        control={control}
                        render={({ field: { name, value, onChange } }) => (
                          <Select
                            options={listAllSubCategory}
                            multi
                            id={name}
                            name={name}
                            value={value}
                            onChange={(e) => {
                              onChange(e);
                              bulkChangeHandler(e, name);
                            }}
                            width="180px"
                            label={"SubCategory"}
                          />
                        )}
                      />
                      <Controller
                        name={"Type"}
                        control={control}
                        render={({ field: { name, value, onChange } }) => (
                          <Select
                            options={listAllType}
                            id={name}
                            name={name}
                            value={value}
                            onChange={(e) => {
                              onChange(e);
                              bulkChangeHandler(e, name);
                            }}
                            label={"Type"}
                            width="116px"
                          />
                        )}
                      />
                      <Controller
                        name={"styleSet"}
                        control={control}
                        render={({ field: { name, value, onChange } }) => (
                          <Select
                            options={styleIcon}
                            id={name}
                            name={name}
                            value={value}
                            onChange={(e) => {
                              onChange(e);
                              bulkChangeHandler(e, name);
                            }}
                            label={"Style Set"}
                            width="116px"
                          />
                        )}
                      />
                    </div>
                  </div>
                )}
              </div>
              <div className="product-flex">
                {iconDetails?.map((iconDetail, index) => (
                  <ProductCard
                    iconDetail={iconDetail}
                    id={index}
                    handler={iconDetailsHandler}
                    iconFile={iconsData[index]}
                    sendToParent={getAbleValue}
                    setReuire={() => { setReuire(false) }}

                  />
                ))}
              </div>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

import Checkbox from "@mui/material/Checkbox";
import { Controller, useForm, useWatch } from "react-hook-form";
import { DeleteIcon } from "../../../assets/svg";
import Select from "../../../components/select/Select";
import { makeStyles } from "@mui/styles";
import useAdmin from '../../../hooks/admin/useAdmin'
import { useEffect, useState } from "react";


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

export default function ProductCard({ iconDetail, id, handler, iconFile, setLog, sendToParent }) {
  useEffect(() => {
    getType();
    getCategory();
    getSubCategory();
    getStyleSet();
  }, [])
  const [checkIconTrue, setCheckIconTrue] = useState(false);

  const [styleIcon, setStyleIcon] = useState([]);
  const [listAllType, setListAllType] = useState([]);
  const [listAllCategory, setListAllCategory] = useState([]);
  const [listAllSubCategory, setListAllSubCategory] = useState([]);
  const { TypeGetAll, CategoryGetAll, SubCategoryGetAll, GetStyleIcon } = useAdmin();

  const [require, setReuire] = useState(true);
  console.log("require>>>>>", require);
  useEffect(() => {
    if (iconDetail.Category && iconDetail.SubCategory && iconDetail.Tag && iconDetail.Type && iconDetail.styleSet !== undefined) {
      setCheckIconTrue(true)
    }
  }, [require])

  useEffect(() => {
    if (checkIconTrue == true) {
      sendToParent(true)
    }
  }, [checkIconTrue])

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

  const [msrp, qty, available_in, brandname, partdesp, partno] = useWatch({
    control,
    name: ["msrp", "qty", "available_in", "brand_name", "part_desp", "part_no"],
  });

  const Status = [
    { value: "active", label: "Active" },
    { value: "inactive", label: "Inactive" },
  ];

  const classes = useStyles();
  return (
    <div className="product-card-root">
      <div className="product-card-inner">
        <div className="product-card-gird">
          <Controller
            name={"productCheck"}
            control={control}
            render={({ field: { name, value, onChange } }) => (
              <Checkbox
                name={name}
                id={name}
                value={value ? value : iconDetail.productCheck}
                className={classes.checkbox}
                checked={iconDetail[name]}
                onChange={(e) => {
                  handler(e, id); setReuire(false)
                }}
              />
            )}
          />
          <div className="icon-img">
            <img src={URL.createObjectURL(iconFile)} alt="Icon" />
            {/* <img src={dummyIcon} alt="dummyIcon" /> */}
          </div>
          <div className="product-form">
            <div className="product-first-div">
              <Controller
                name={"iconname"}
                control={control}
                rules={{ required: "Icon Name is Required" }}
                render={({ field: { name, value, onChange } }) => (
                  <input
                    id={name}
                    value={iconDetail.iconname}
                    className="icon-name"
                    placeholder={"Icon Name"}
                    name={name}
                    tyoe="text"
                    onChange={(e) => {
                      handler(e, id); setReuire(false)
                    }}
                  />

                )}

              />
              {iconDetail.iconname === undefined && <><p className="text-[red]" style={{ margin: "0px", padding: "0px", color: "red" }}>Tag is required</p></>}

              <div>
                <div
                  className="delete-btn"
                  onClick={(e) => {
                    e.stopPropagation();
                    handler("delete", id);
                  }}
                >
                  <DeleteIcon />
                </div>

              </div>
            </div>
            <div className="product-second-div">
              <div className="flex">
                <Controller
                  name={"Category"}
                  control={control}
                  render={({ field: { name, value, onChange } }) => (
                    <div className="d-flex" style={{ flexDirection: "column" }}>
                      <Select
                        options={listAllCategory && listAllCategory}
                        id={name}
                        name={name}
                        multi
                        value={iconDetail[name] || ""}
                        onChange={(selectedOptions) => {
                          const event = {
                            target: {
                              name,
                              value: selectedOptions.map((option) => ({
                                label: option.label,
                                value: option.value,
                              })),
                            },
                          };
                          handler(event, id); setReuire(false)
                        }}
                        defaultValue={""}
                        label={"Category"}
                        width="290px  "
                      />
                      {iconDetail[name] === undefined && <><p className="text-[red]" style={{ margin: "0px", padding: "0px", color: "red" }}>Tag is required</p></>}
                    </div>
                  )}
                />
              </div>

              <Controller
                name={"SubCategory"}
                control={control}
                render={({ field: { name, value, onChange } }) => (
                  <div className="d-flex" style={{ flexDirection: "column" }}>
                    <Select
                      options={listAllSubCategory && listAllSubCategory}
                      id={name}
                      name={name}
                      multi
                      value={iconDetail[name] ? iconDetail[name] : value}
                      onChange={(selectedOptions) => {
                        const event = {
                          target: {
                            name,
                            value: selectedOptions.map((option) => ({
                              label: option.label,
                              value: option.value,
                            })),
                          },
                        };
                        handler(event, id); setReuire(false)
                      }}
                      defaultValue={""}
                      width="180px"
                      label={"Sub Category"}
                    />
                    {iconDetail[name] === undefined && <><p className="text-[red]" style={{ margin: "0px", padding: "0px", color: "red" }}>Tag is required</p></>}
                  </div>


                )}
              />

              <Controller
                name={"Type"}
                control={control}
                render={({ field: { name, value, onChange } }) => (
                  <div className="d-flex" style={{ flexDirection: "column" }}>
                    <Select
                      options={listAllType && listAllType}
                      id={name}
                      name={name}
                      value={iconDetail[name] || ""}
                      onChange={(e) => {
                        e.target = {
                          name,
                          value: { label: e.label, value: e.value },
                        };
                        handler(e, id); setReuire(false)
                      }}
                      label={"Type"}
                      defaultValue={""}
                      width="116px"
                    />
                    {iconDetail[name] === undefined && <> <p className="text-[red]" style={{ margin: "0px", padding: "0px", color: "red" }}>Tag is required</p></>}
                  </div>

                )}

              />

              <Controller
                name={"styleSet"}
                control={control}
                render={({ field: { name, value, onChange } }) => (
                  <div className="d-flex" style={{ flexDirection: "column" }}>
                    <Select
                      options={styleIcon && styleIcon}
                      id={name}
                      name={name}
                      value={iconDetail[name] || ""}
                      onChange={(e) => {
                        e.target = {
                          name,
                          value: { label: e.label, value: e.value },
                        };
                        handler(e, id); setReuire(false)
                      }}
                      label={"Style Set"}
                      defaultValue={""}
                      width="116px"
                    />
                    {iconDetail[name] === undefined && <><p className="text-[red]" style={{ margin: "0px", padding: "0px", color: "red" }}>Tag is required</p></>}
                  </div>

                )}
              />
            </div>
            <Controller
              name={"Tag"}
              control={control}
              render={({ field: { name, value, onChange } }) => (
                <div className="d-flex" style={{ flexDirection: "column" }}>
                  <input
                    id={name}
                    value={iconDetail[name] || ""}
                    className="category-type"
                    placeholder={"Tag"}
                    name={name}
                    type="text"
                    onChange={(e) => {
                      handler(e, id); setReuire(false)
                    }}
                  />
                  {iconDetail[name] === undefined && <><p className="text-[red]" style={{ margin: "0px", padding: "0px", color: "red" }}>Tag is required</p></>}
                </div>

              )}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

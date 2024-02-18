import dummyIcon from "../../../assets/svg/dummyIcon.svg";
import { Controller, useForm } from "react-hook-form";
import Select from "../../../components/select/Select";
import { category, styleSet, type } from "./productUtils";
import hoverArrow from "../../../assets/svg/hoverArrow.svg";
import { makeStyles } from "@mui/styles";
import SwitchToggle from "../../../components/SwitchToggle";
import { useRef, useState } from "react";

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

export default function EditProductCard() {
  const { control, handleSubmit } = useForm({
    mode: "onChange",
  });
  const [iconFile, setFile] = useState(dummyIcon);
  // const [msrp, qty, available_in, brandname, partdesp, partno] = useWatch({
  //   control,
  //   name: ["msrp", "qty", "available_in", "brand_name", "part_desp", "part_no"],
  // });

  const Status = [
    { value: "active", label: "Active" },
    { value: "inactive", label: "Inactive" },
  ];
  const onSubmit = (data) => {
    console.log(data);
  };
  const inputFile = useRef(null);

  const handleAddProduct = () => {
    inputFile.current.click();
  };

  const handleOnFile = (e) => {
    const fileList = e.target.files;

    for (const file of fileList) {
      if (file.type.startsWith("image/")) {
        const imageUrl = URL.createObjectURL(file);
        setFile(imageUrl);
      }
    }
  };

  const classes = useStyles();
  return (
    <form id={"editform"} onSubmit={handleSubmit(onSubmit)}>
      <div className="product-card-root">
        <div className="product-card-inner">
          <div className="product-card-gird">
            <div className="icon-img">
              {/* <img src={URL.createObjectURL(iconFile)} alt="Icon" /> */}
              <img src={iconFile} alt="dummyIcon" />

              <input
                type="file"
                id="imgupload"
                ref={inputFile}
                onChange={handleOnFile}
                style={{ display: "none" }}
                multiple="multiple"
              />
              <div className="hover-on-icon" onClick={handleAddProduct}>
                <img src={hoverArrow} alt="hoverArrow" />
              </div>
            </div>
            <div className="product-form">
              <div className="product-first-div">
                <Controller
                  name={"iconname"}
                  control={control}
                  render={({ field: { name, value, onChange } }) => (
                    <input
                      id={name}
                      value={value}
                      className="icon-name"
                      placeholder={"Icon Name"}
                      name={name}
                      tyoe="text"
                      onChange={onChange}
                    />
                  )}
                />
                <div>
                  <div>
                    <p>Paid</p>

                    <Controller
                      name={"paid"}
                      control={control}
                      render={({ field: { name, value, onChange } }) => (
                        <SwitchToggle
                          name={name}
                          value={value}
                          //   defaultChecked={iconDetail.paid}
                          onChange={onChange}
                        />
                      )}
                    />
                  </div>
                </div>
              </div>
              <div className="product-second-div">
                <Controller
                  name={"Category"}
                  control={control}
                  render={({ field: { name, value, onChange } }) => (
                    <Select
                      options={category}
                      id={name}
                      name={name}
                      value={value}
                      muk
                      onChange={onChange}
                      defaultValue={""}
                      label={"Category"}
                      width="290px  "
                    />
                  )}
                />
                <Controller
                  name={"SubCategory"}
                  control={control}
                  render={({ field: { name, value, onChange } }) => (
                    <Select
                      options={Status}
                      id={name}
                      name={name}
                      value={value}
                      onChange={onChange}
                      defaultValue={""}
                      width="180px"
                      label={"Sub Category"}
                    />
                  )}
                />
                <Controller
                  name={"Type"}
                  control={control}
                  render={({ field: { name, value, onChange } }) => (
                    <Select
                      options={type}
                      id={name}
                      name={name}
                      value={value}
                      onChange={onChange}
                      label={"Type"}
                      defaultValue={""}
                      width="116px"
                    />
                  )}
                />
                <Controller
                  name={"styleSet"}
                  control={control}
                  render={({ field: { name, value, onChange } }) => (
                    <Select
                      options={styleSet}
                      id={name}
                      name={name}
                      value={value}
                      onChange={onChange}
                      label={"Sub Type"}
                      defaultValue={""}
                      width="116px"
                    />
                  )}
                />
              </div>
              <Controller
                name={"categoryType"}
                control={control}
                render={({ field: { name, value, onChange } }) => (
                  <input
                    id={name}
                    value={value}
                    className="category-type"
                    placeholder={"Types"}
                    name={name}
                    tyoe="text"
                    onChange={onChange}
                  />
                )}
              />
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}

import { Field, Form, Formik } from "formik";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { CloseBtnSVG } from "../../../assets/ossvg";
import * as Yup from "yup";
import { UploadSpaceHolder } from "../../../assets/svg";
import { Button } from "../../../components/Buttons/Button";
import { ImageSwitch } from "../../../components/FormControles/ImageSwitch/ImageSwitch";
import { LabledInputBox } from "../../../components/FormControles/LabledInputBox/LabledInputBox";
import useProduct from "../../../hooks/product/useProduct";
import useFilters from "../../../hooks/filter/useFilter";
import { ProgressBar } from "react-loader-spinner";

export function AddProduct() {
  const [isPaid, setPaid] = useState(true);
  const [isDisabled, setDisabled] = useState(false);
  const { useGetCategory } = useFilters();
  const { categories } = useGetCategory();

  const [iconFiels, setIconFiels] = useState([]);
  const [variantType, setvariantType] = useState([]);
  const { setUploadIcon, useGetProductList } = useProduct();

  const { getProdListMutate } = useGetProductList();

  const variantTypes = [
    { value: "curve", label: "Curve" },
    { value: "sharp", label: "Sharp" },
    { value: "soft", label: "Soft" },
  ];

  const handleClear = (e, index, values) => {
    let tempArr = [...iconFiels];
    let tempArrVal = [...values.variantTags];
    delete tempArr[index];
    delete tempArrVal[index];
    const newArr = [];
    const newArrVal = [];
    for (const i of tempArr) if (i) newArr.push(i);
    for (const i of tempArrVal) if (i) newArrVal.push(i);

    values.variantTags = newArrVal;
    setIconFiels(newArr);
  };

  const navigate = useNavigate();
  return (
    <div>
      <div className="product-section">
        <Formik
          initialValues={{
            name: "",
            mainTags: "",
            category: [],
            variantType: "",
            variantTags: [],
          }}
          validationSchema={Yup.object({
            name: Yup.string().required("name address is require"),
            mainTags: Yup.string().required("tags is require"),
            variantType: Yup.string().required("variantType is require"),
          })}
          onSubmit={async (values) => {
            let categoryRes = [];
            values.category.forEach((e) => categoryRes.push(e.value));

            const payloadData = {
              name: values.name,
              label: values.name.toUpperCase(),
              category: categoryRes.join(),
              variantType: values.variantType,
              // variantTags: variantTagRes,
              mainTags: values.mainTags
                ?.split(",")
                ?.map((e) => e.trim())
                ?.join(),
              isFree: !isPaid,
              assets: iconFiels,
            };

            setDisabled(true);
            await setUploadIcon(payloadData);
            setDisabled(false);
            getProdListMutate();
            navigate("/admin");
          }}
        >
          {({ values, setFieldValue, isValid }) => {
            const isEnabled =
              isValid && iconFiels && iconFiels.length > 0 ? true : false;
            return (
              <Form>
                <div>
                  <div className="add-product-sec">
                    <div className="product-container">
                      <div className="add-product-text">Add Icon</div>
                      <div className="product-btn">
                        <Button
                          styleName={""}
                          lable={"cancel"}
                          type={"submit"}
                          btnSize="md"
                          onClick={() => navigate("/admin")}
                          disabled={isDisabled}
                          outlined={true}
                        />
                        <Button
                          styleName={""}
                          lable={"Publish"}
                          type={"submit"}
                          btnSize="md"
                          outlined={false}
                          disabled={!isEnabled}
                        />
                      </div>
                    </div>

                    <div
                      className={`add-product-body ${
                        isDisabled ? "disabled" : ""
                      }`}
                    >
                      <ProgressBar
                        height="80"
                        width="80"
                        ariaLabel="progress-bar-loading"
                        wrapperStyle={{
                          zIndex: "10",
                          position: "absolute",
                          top: "50%",
                          left: "44%",
                        }}
                        wrapperClass="progress-bar-wrapper"
                        borderColor="#7238fa"
                        barColor="#51E5FF"
                        visible={isDisabled}
                      />
                      <div className="tab-page-con">
                        <div className="form-add-product-con">
                          <div className="margin-bottom">
                            <LabledInputBox
                              name="mainTags"
                              className={"add-product-height"}
                              type="text"
                              placeholder="Max. 10 keywords"
                              autoComplete="off"
                            />
                          </div>
                          <div className=" margin-bottom">
                            <LabledInputBox
                              name="email"
                              type="select"
                              isCreatable={true}
                              isClearable={true}
                              isMulti={true}
                              placeholder="Select Category - add, edit, delete"
                              autoComplete="off"
                              options={categories && categories}
                              onChange={(val) => setFieldValue("category", val)}
                            />
                          </div>
                          <div className="margin-bottom add-product-secton">
                            <div>
                              <LabledInputBox
                                name="name"
                                type="text"
                                placeholder="Name (first tag as default name)"
                                defaultValue={values.mainTags.split(",")[0]}
                                inputSize="md"
                              />
                            </div>
                            <div>
                              <ImageSwitch
                                isOn={isPaid}
                                onChange={setPaid}
                                tLable={"Paid"}
                                fLable={"Free"}
                              />
                            </div>
                          </div>
                          <div className=" margin-bottom curve-line-secton">
                            <div>
                              <LabledInputBox
                                type={"select"}
                                autoComplete="off"
                                selSize="sm"
                                isCreatable={true}
                                isClearable={true}
                                options={variantTypes}
                                onChange={(value) => {
                                  setvariantType(value.value);
                                  setFieldValue("variantType", value.value);
                                }}
                              />
                            </div>
                            <div className="curve-line"></div>
                          </div>
                          <div className="ap-icon-up-con-main">
                            <Field
                              name="asset"
                              id="asset"
                              type="file"
                              accept="image/svg+xml"
                              multiple
                              onChange={async (event) => {
                                if (
                                  event.currentTarget.files &&
                                  event.currentTarget.files.length > 0
                                ) {
                                  const file = event.currentTarget.files;
                                  let tempArr = [...iconFiels];
                                  for (const elem of file) {
                                    tempArr.push(elem);
                                  }
                                  setIconFiels(tempArr);
                                }
                              }}
                              hidden
                            />

                            {iconFiels.length > 0 &&
                              iconFiels?.map((data, index) => {
                                if (!values.variantTags[index])
                                  values.variantTags[
                                    index
                                  ] = `#${variantType} `;
                                return (
                                  <div
                                    className={"ap-icon-up-con-s-main"}
                                    key={index}
                                  >
                                    <div>
                                      <CloseBtnSVG
                                        className={`ap-close-icon`}
                                        onClick={(e) =>
                                          handleClear(e, index, values)
                                        }
                                      />
                                    </div>
                                    <div className="ap-icon-up-con">
                                      <img
                                        src={URL.createObjectURL(data)}
                                        alt=""
                                        className="pl-ls-ico"
                                      />
                                    </div>
                                    <div className="ap-icon-up-input-tags">
                                      <Field
                                        type={"text"}
                                        name={`variantTags.${index}`}
                                        defaultValue={`#${variantType} `}
                                      />
                                    </div>
                                  </div>
                                );
                              })}

                            <label htmlFor="asset">
                              <div>
                                <div className="ap-icon-up-con">
                                  <UploadSpaceHolder />
                                </div>
                              </div>
                            </label>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Form>
            );
          }}
        </Formik>
      </div>
    </div>
  );
}

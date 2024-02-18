import "./style.css";
import { Navigation } from "../../../components/FormControles/Navigation/navigation";
import { Form, Formik } from "formik";
import { DataTableBase } from "../../../components/DataTableBase";
import { LabledInputBox } from "../../../components/FormControles/index";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FloatingButton, ProductSidebar, AdminSidebar, PaginationBar } from '../components';
import ProductGridView from "./ProductGridView";
import { ImageSwitch } from "../../../components/FormControles/ImageSwitch/ImageSwitch";
import useProduct from "../../../hooks/product/useProduct";
import { Popover } from "react-tiny-popover";
import { MoreSVG } from "../../../assets/svg";
import { ProdLstPPO } from "../../../components/popovers";
import { Button } from "../../../components/Buttons/Button";

export function ProductList() {
  const [getToggle, setIsToggle] = useState(true);
  const [isClickedMore, setClickedMore] = useState("");
  const { useGetProductList, UseGetAllSubCatregory } = useProduct();
  const { product, pageSize, onSearch, setPage } = useGetProductList();
  const [, setIconData] = useState();
  const [allSubCategory, setAllSubCategory] = useState()
  const navigate = useNavigate();
  const inputFile = useRef(null);
  const handleAddProduct = () => {
    inputFile.current.click();
  };
  const handleOnFile = (e) => {
    setIconData(e.target.files);
    if (e.target.files?.length > 0) {
      navigate("/addProductIcon", { state: { iconsData: e.target.files } });
    }
  };
  const handlePageClick = (e) => {
    setPage(e.selected + 1)
  }
  const totalCount = pageSize * product?.totalPages
  const columns = [
    {
      name: "Name",
      selector: (row) => {
        return (
          <div className={"pl-ls-ico-con"}>
            <img src={row.previewUrl} alt="" className={"pl-ls-ico"} />
            <span>{row?.label}</span>
          </div>
        );
      },
      sortable: true,
      minWidth: "80px",
    },
    {
      name: "type",
      selector: (row) => row?.type || "",
      sortable: true,
      minWidth: "80px",
      maxWidth: "100px",
    },
    {
      name: "Style",
      selector: (row) => row.styleSet,
      sortable: true,
      minWidth: "80px",
      maxWidth: "100px",
    },
    {
      name: "Price",
      selector: (row) => row.paid == 1 ? 'Paid' : 'Free',
      sortable: true,
      minWidth: "80px",
      maxWidth: "100px",
    },
    {
      name: "category",
      selector: (row) => row.category.join(","),
      sortable: true,
      minWidth: "80px",
    },

    {
      name: "Keywords",
      selector: (row) => row.tags.join(", "),
      sortable: true,
      minWidth: "80px",
    },
    {
      name: "Updated on",
      selector: (row) => new Date(row.updatedAt).toLocaleDateString(),
      sortable: true,
      minWidth: "80px",
      maxWidth: "100px",
    },
    // {
    //   name: "price",
    //   selector: (row) => (row.paid === 0 ? "Free" : "Paid"),
    //   sortable: true,
    //   minWidth: "80px",
    // },
    {
      cell: (row) => {
        return (
          <Popover
            isOpen={isClickedMore === row?._id}
            positions={["bottom", "left", "right", "top"]}
            content={
              <ProdLstPPO setClickedMore={setClickedMore} productData={row} />
            }
            onClickOutside={() => {
              setClickedMore("");
            }}
          >
            <MoreSVG
              id={row.id}
              style={{
                cursor: "pointer",
              }}
              onClick={() => {
                setClickedMore(row?._id);
              }}
            />
          </Popover>
        );
      },
      // ignoreRowClick: true,
      maxWidth: "10%",
      minWidth: "30px",
      allowOverflow: true,
      button: true,
    },
  ];
  useEffect(() => {
    (async () => {
      const subCat = await UseGetAllSubCatregory()
      setAllSubCategory(subCat?.map(_s => { return { label: _s.name, value: _s.name } }))
    })();
  }, [])
  return (
    <>
      <div className="cust-container">
        <div className="cust-list-nav-bar">
          <Navigation lable={"product"} />
          <div className="container-body" style={{ marginTop: 76 }}>
            <div className="product-list-body">
              <AdminSidebar  ></AdminSidebar>
              <div style={{ flex: 1, flexDirection: 'column' }}>
                <div className="admin-container-body">
                  <div className="padding">
                    <Formik initialValues={{ search: "" }}>
                      {({ values, isValid, setFieldValue }) => {
                        if (values.search !== "") onSearch(values.search);
                        return (
                          <Form>
                            <div className="prod-search-sec" style={{ justifyContent: 'flex-end' }}>
                              <div className="search-input-con">
                                <div>
                                  <div className="admin-search-bar">
                                    <svg
                                      className="m"
                                      width="24"
                                      height="24"
                                      viewBox="0 0 24 24"
                                      fill="none"
                                      xmlns="http://www.w3.org/2000/svg"
                                    >
                                      <path
                                        d="M19 11C19 13.2022 18.1102 15.1966 16.6705 16.6432C15.2217 18.0989 13.2161 19 11 19C6.58172 19 3 15.4183 3 11C3 6.58172 6.58172 3 11 3C15.4183 3 19 6.58172 19 11Z"
                                        stroke="#1E3050"
                                        strokeWidth="2"
                                      />
                                      <path
                                        d="M16.6719 16.6436L21.2983 21.2961"
                                        stroke="#1E3050"
                                        strokeWidth="2"
                                      />
                                    </svg>
                                    <LabledInputBox
                                      name="search"
                                      type={"search"}
                                      placeholder="Search by id, tags, name"
                                      autoComplete="off"
                                      values={values.search}
                                      inputSize="md"
                                    />
                                  </div>
                                </div>
                              </div>
                              <div className="product-view">
                                <ImageSwitch isOn={getToggle} onChange={setIsToggle} />
                                <div className="search-input-con">
                                  <input
                                    type="file"
                                    id="imgupload"
                                    ref={inputFile}
                                    accept="image/svg+xml"
                                    onChange={handleOnFile}
                                    style={{ display: "none" }}
                                    multiple="multiple"
                                  />
                                </div>
                              </div>
                              <Button
                                className="new-btn"
                                lable={"Add"}
                                type={"submit"}
                                btnSize="md"
                                onClick={handleAddProduct}
                              />
                            </div>
                          </Form>
                        );
                      }}
                    </Formik>
                    {getToggle ? (
                      <DataTableBase
                        columns={columns}
                        data={product?.products}
                        progressPending={!product}
                      />
                    ) : (
                      <ProductGridView productList={product?.products} />
                    )}
                  </div>
                </div>
                <PaginationBar currentPage={product?.currentPage - 1 || 0} totalCount={totalCount} handlePageClick={handlePageClick} pageCount={product?.totalPages}></PaginationBar>
              </div>
            </div>
          </div>
          {/* <FloatingButton onClick={handleAddProduct}></FloatingButton> */}
        </div>
      </div>
    </>
  );
}

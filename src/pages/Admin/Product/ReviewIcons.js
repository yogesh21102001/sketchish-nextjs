import "./style.css";
import { Navigation } from "../../../components/FormControles/Navigation/navigation";
import { Form, Formik } from "formik";
import { DataTableBase } from "../../../components/DataTableBase";
import { LabledInputBox } from "../../../components/FormControles/index";
import { useEffect, useRef, useState } from "react";
import { AdminSidebar, PaginationBar } from '../components';
import useProduct from "../../../hooks/product/useProduct";
import { DeleteIcon } from "../../../assets/svg";
import { Button } from "../../../components/Buttons/Button";
import { FallingLines } from 'react-loader-spinner'
import { notifySuccess } from "../../../utils/notify";
export function ReviewIcons() {
    const [set, reset] = useState(false)
    const { useGetReivewProductList, publishIcons, deleteReviewIconById, deleteAllReviewIcons } = useProduct();
    const { product, pageSize, onSearch, setPage, getProdListMutate } = useGetReivewProductList();
    const [isLoading, setLoading] = useState(false);
    const handlePublishProduct = async () => {
        setLoading(true);
        await publishIcons()
        setLoading(false);
        getProdListMutate();
        setPage(1);
        notifySuccess('Icons Published.');
    };
    const deleteReviewIcons = async (id) => {
        await deleteReviewIconById(id);
        getProdListMutate()
        reset(true)
        notifySuccess('Icon Deleted.')
    }
    const deleteReviewIconsAll = async () => {
        await deleteAllReviewIcons();
        getProdListMutate()
        reset(true)
        notifySuccess('Icon Deleted.')
    }

    const handlePageClick = (e) => {
        setPage(e.selected + 1)
    }
    let totalCount = pageSize * product?.totalPages
    if (product?.totalPages == 1) {
        totalCount = product?.products?.length || 0
    }
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

                    <DeleteIcon
                            id={row.id}
                            style={{
                                cursor: "pointer",
                            }}
                            onClick={() => {
                                deleteReviewIcons(row?._id);
                            }}
                    />
                );
            },
            // ignoreRowClick: true,
            maxWidth: "10%",
            minWidth: "30px",
            allowOverflow: true,
            button: true,
        },
    ];

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
                                                            <span style={{ cursor: 'pointer' }} onClick={() => deleteReviewIconsAll()}>Delete All</span>
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
                                                            {isLoading && <FallingLines
                                                                color="#4fa94d"
                                                                width="100"
                                                                visible={true}
                                                                ariaLabel='falling-lines-loading'
                                                            />}
                                                            {!isLoading && <Button
                                                                className="new-btn"
                                                                lable={"Publish"}
                                                                type={"submit"}
                                                                btnSize="md"
                                                                onClick={handlePublishProduct}
                                                            />}
                                                        </div>
                                                    </Form>
                                                );
                                            }}
                                        </Formik>

                                        <DataTableBase
                                            columns={columns}
                                            data={product?.products}
                                            progressPending={!product}
                                        />
                                    </div>
                                </div>
                                <PaginationBar currentPage={product?.currentPage - 1 || 0} totalCount={totalCount} handlePageClick={handlePageClick} pageCount={product?.totalPages}></PaginationBar>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

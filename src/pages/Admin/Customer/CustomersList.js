import "./style.css";
import { Navigation } from "../../../components/FormControles/Navigation/navigation";
import { Form, Formik } from "formik";
import React, { useState } from "react";
import { DataTableBase } from "../../../components/DataTableBase";
import useUser from "../../../hooks/user/user";
import { LabledInputBox } from "../../../components/FormControles/index";
import { Button } from "../../../components/Buttons/Button";
import { MoreSVG } from "../../../assets/svg";
import { format } from "date-fns";
import { AdminSidebar, PaginationBar } from '../components';
import { ResponsiveModal } from "../../../components/ResponsiveModal";
import { InvitePopovcer } from "../../../components/Invite/Invite";
import ProfileView from './ProfileView'
import { Popover } from "react-tiny-popover";
import { CustLstPPO } from "../../../components/popovers";
// import InfiniteScroll from "react-infinite-scroll-component";

// import { Form, Formik } from "formik";

export function CustomersList() {
  const [isInvitePopovcerOpen, setIsInvitePopovcerOpen] = useState(false);
  const [isProfileView, setProfileView] = useState(false);
  const [userId, setUserId] = useState("");
  const [isClickedMore, setClickedMore] = useState("");

  const { useGetCustomerList } = useUser();

  const handelOnClick = async () => setIsInvitePopovcerOpen(true);

  const columns = [
    {
      name: "Name",
      selector: (row) => {
        return (
          <div className="account-name-con">
            <label className="account-name">
              {row?.firstName && row?.lastName
                ? row?.firstName[0] + row?.lastName[0]
                : row?.email[0]}
            </label>
            {row?.firstName && row?.lastName
              ? `${row?.firstName || ""} ${row?.lastName || ""}`
              : "-"}
          </div>
        );
      },
      maxWidth: "18%",
      sortable: true,
      minWidth: "80px",
    },
    {
      name: "Email",
      selector: (row) => row.email,
      sortable: true,
      minWidth: "100px",
    },
    {
      name: "Plan",
      selector: (row) => row.plan,
      sortable: true,
      maxWidth: "18%",
      minWidth: "80px",
    },
    {
      name: "Country",
      selector: (row) => row.country,
      sortable: true,
      maxWidth: "18%",
      minWidth: "80px",
    },
    {
      name: "Last Activity",
      selector: (row) => format(new Date(row.lastActivity), "hh:mm MM/dd/yy"),
      sortable: true,
      minWidth: "80px",
    },
    {
      name: "",
      selector: (row) => {
        return (
          <div>
            <label className={row?.status && "status-con"}>{row.status}</label>{" "}
          </div>
        );
      },
      sortable: true,
      textAlign: "right",
      maxWidth: "10%",
      minWidth: "30px",
    },
    {
      cell: (row) => {
        return (
          <Popover
            isOpen={isClickedMore === row?._id}
            positions={["bottom", "left", "right", "top"]}
            content={
              <CustLstPPO setClickedMore={setClickedMore} customerData={row} />
            }
            onClickOutside={() => {
              if (isClickedMore !== row?._id) setClickedMore("");
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
      maxWidth: "5%",
      minWidth: "30px",
      allowOverflow: true,
      button: true,
    },
  ];

  const { customer, onSearch, setArchived, setPage, isArchived } = useGetCustomerList();
  const handlePageClick = (e) => {
    setPage(e.selected + 1)
  }
  return (
    <>
      <div className="cust-container">
        <div className="cust-list-nav-bar">
          <Navigation lable={"customer"} />
          <div className="container-body" style={{ marginTop: 76, display: 'flex' }}>
            <AdminSidebar  ></AdminSidebar>
            <div style={{ flex: 1, flexDirection: 'column' }}>
              <div className="admin-container-body">
                <Formik initialValues={{ search: "" }}>
                  {({ values, isValid, setFieldValue }) => {
                    if (values.search !== "") onSearch(values.search);
                    return (
                      <Form>
                        <div className="cust-search-sec">
                          <div className="search-input-con switch-btn">
                            <div
                              className={`cust-heading-text ${!isArchived && "chtext-active"
                                }`}
                              onClick={() => { setPage(1); setArchived(false) }}
                            >
                              Active
                            </div>
                            <div className="sep"></div>
                            <div
                              className={`cust-heading-text ${isArchived && "chtext-active"
                                }`}
                              onClick={() => { setPage(1); setArchived(true) }}
                            >
                              Archived
                            </div>
                          </div>
                          <div className="search-input-con">
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
                                placeholder="Search"
                                autoComplete="off"
                                values={values.search}
                                inputSize="md"
                              />
                            </div>
                            <Button
                              className="new-btn"
                              lable={"Add"}
                              type={"submit"}
                              btnSize="md"
                              onClick={handelOnClick}
                            />
                          </div>
                        </div>
                      </Form>
                    );
                  }}
                </Formik>
                <div className="padding">
                  <DataTableBase
                    columns={columns}
                    data={customer && customer.users}
                    progressPending={!customer}
                    onRowClicked={(row) => {
                      console.log('row', row)
                      setProfileView(true)
                      setUserId(row?._id)
                      setClickedMore("");
                    }}
                  />
                </div>
              </div>
              <PaginationBar handlePageClick={handlePageClick} pageCount={customer?.totalPages} currentPage={customer?.currentPage - 1} totalCount={customer?.totalCount || Number(customer?.totalPages) * 30}></PaginationBar>
            </div>
          </div>
        </div>
      </div>

      {/* Popup Modals */}
      <ResponsiveModal
        isOpen={isInvitePopovcerOpen}
        onClose={() => setIsInvitePopovcerOpen(false)}
        showCloseIcon={false}
        component={<InvitePopovcer setOpen={setIsInvitePopovcerOpen} />}
      />
      {/* Popup Modals */}
      <ResponsiveModal
        isOpen={isProfileView}
        onClose={() => setProfileView(false)}
        showCloseIcon={true}
        component={<ProfileView userId={userId} />}
      />
    </>
  );
}

import "./style.css";
import React from "react";
import { DataTableBase } from "../../../components/DataTableBase";
import useUser from "../../../hooks/user/user";
import { Typography } from "../../../components/Typography";

export function HistoryTab() {
  const { UseDownloadHistory } = useUser();

  // const handleButtonClick = (state) => {
  //   console.log(state.target.id);
  // };

  const columns = [
    {
      name: "Name",
      selector: (row) => {
        return (
          <div className="ht-ico-tb-con">
            <img src={row.url} alt="" className="ht-ico-tb-preview" />
            <Typography variant={"body1"}>
              {row.label || row.mainLabel}
            </Typography>
          </div>
        );
      },
      sortable: true,
      minWidth: "470px",
    },
    {
      name: "Type",
      selector: (row) => row.type,
      sortable: true,
      minWidth: "80px",
    },
    {
      name: "Price",
      selector: (row) => row.price,
      sortable: true,
      minWidth: "80px",
    },
    {
      name: "Date",
      selector: (row) => row.date,
      sortable: true,
      minWidth: "80px",
    },
    // {
    //   cell: (row) => (
    //     <DownloadSVG
    //       className="ht-download-btn"
    //       onClick={handleButtonClick}
    //       id={row.id}
    //     />
    //   ),
    //   ignoreRowClick: true,
    //   allowOverflow: true,
    //   button: true,
    // },
  ];

  const [userHis, setUserHis] = useState([])
  const getUserHistory = async () => {
    try {
      const data = await UseDownloadHistory();
      setUserHis(data)
    } catch (err) { }
  }
  useEffect(() => {
    getUserHistory()
  }, [])

  return (
    <div className="tab-page-main">
      <div className="tab-page-header">
        <h4>History</h4>
      </div>
      <div className="tab-page-body">
        <div className="ptab-form-con">
          <DataTableBase
            columns={columns}
            data={userHis}
            progressPending={!userHis}
          />
        </div>
      </div>
    </div>
  );
}

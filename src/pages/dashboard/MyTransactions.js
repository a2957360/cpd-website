import React, { useState, useEffect } from "react";
import moment from 'moment';
//components
import DashboardWrapper from "../../components/Dashboard/DashboardWrapper";
import { Input, Row, Table, Pagination, Tooltip } from "antd";
import EmptyListElement from "../../components/Dashboard/EmptyListElement";
//packages
import _ from "lodash";
import {
  getTransactions,
} from "../../redux/actions";
import { useDispatch, useSelector } from "react-redux";

const columns = [
  {
    title: "Course Title",
    dataIndex: "CourseTitle",
    key: "CourseTitle",
    className: "dashboard-table-column",
    align: "center",
    sorter: (a, b) => (a.courseTitle < b.courseTitle ? -1 : 1),
    ellipsis: {
      showTitle: false,
    },
    render: function courseTitleRender(courseTitle) {
      return (
        <Tooltip placement="topLeft" title={courseTitle}>
          {courseTitle}
        </Tooltip>
      );
    },
  },
  {
    title: "Customer Name",
    dataIndex: "CustomerName",
    key: "CustomerName",
    className: "dashboard-table-column",
    align: "center",
    ellipsis: true,
    sorter: (a, b) => (a.date < b.date ? -1 : 1),
  },
  {
    title: "Order Date",
    dataIndex: "OrderDate",
    key: "OrderDate",
    className: "dashboard-table-column",
    align: "center",
    ellipsis: true,
    sorter: (a, b) => (a.date < b.date ? -1 : 1),
    render: function orderdateRender(orderdate) {
      return <span>{moment(orderdate).format('YYYY/MM/DD')}</span>;
    },
  },
  {
    title: "Subtotal",
    dataIndex: "SubTotal",
    key: "SubTotal",
    className: "dashboard-table-column",
    align: "center",
    ellipsis: true,
    sorter: (a, b) => (a.subtotal < b.subtotal ? -1 : 1),
    render: function subtotalRender(subtotal) {
      if(subtotal==null){
        return "";
      }
      return <span>CA ${subtotal}</span>;
    },
  },
  {
    title: "Discount",
    dataIndex: "Discount",
    key: "Discount",
    className: "dashboard-table-column",
    align: "center",
    sorter: (a, b) => (a.discount < b.discount ? -1 : 1),
    render: function discountRender(discount) {
      if(discount==null){
        return "";
      }
      return <span>CA ${discount}</span>;
    },
  },
  {
    title: "Tax",
    dataIndex: "Tax",
    key: "Tax",
    className: "dashboard-table-column",
    align: "center",
    sorter: (a, b) => (a.tax < b.tax ? -1 : 1),
    render: function taxRender(tax) {
      if(tax==""){
        return null;
      }
      return <span>CA ${tax}</span>;
    },
  },
  {
    title: "Coupon Used",
    dataIndex: "CouponUsed",
    key: "CouponUsed",
    className: "dashboard-table-column",
    align: "center",
    sorter: (a, b) => (a.credits < b.credits ? -1 : 1),
  },
  {
    title: "Use Credit",
    dataIndex: "CreditUsed",
    key: "CreditUsed",
    className: "dashboard-table-column",
    align: "center",
    sorter: (a, b) => (a.credits < b.credits ? -1 : 1),
  },
  {
    title: "Credits Used",
    dataIndex: "CourseDuration",
    key: "CourseDuration",
    className: "dashboard-table-column",
    align: "center",
    sorter: (a, b) => (a.credits < b.credits ? -1 : 1),
    render: function creditsRender(credits) {
      return <span>{credits}</span>;
    },
  },
  {
    title: "Credits Used",
    dataIndex: "CourseDuration",
    key: "CourseDuration",
    className: "dashboard-table-column",
    align: "center",
    sorter: (a, b) => (a.credits < b.credits ? -1 : 1),
    render: function creditsRender(credits) {
      return <span>{credits}</span>;
    },
  },
  {
    title: "Status",
    dataIndex: "PaymentStatus",
    key: "PaymentStatus",
    className: "dashboard-table-column",
    align: "center",
    filters: [
      { text: "Completed", value: "completed" },
      { text: "Pending", value: "pending" },
    ],
    onFilter: (value, record) =>
      record.status.toLowerCase().indexOf(value) !== -1,
  },
];

const MyTrans = (props) => {
  const [searchQuery, setSearchQeury] = useState("");
 
  const [pagination, setPagination] = useState({
    currentPage: 1,
    pageSize: 10,
  });
  const dispatch = useDispatch();
  const { myTransactions } = useSelector((state) => state.courseData);
  useEffect(() => {
    console.log("1111");
    dispatch(getTransactions(localStorage.getItem('CPDUserID')));
  }, [searchQuery]);

  useEffect(() => {
    console.log("1111");
    // dispatch(getTransactions(localStorage.getItem('CPDUserID')));
  }, []);

  // useEffect(() => {
  //   handleSearchOrder();
  // }, [searchQuery]);

  // const handleSearchOrder = () => {
  //   if (searchQuery === "") {
  //     setDisplayData(myTransactions);
  //   } else {
  //     setDisplayData(
  //       myTransactions.filter((order) =>
  //         order.courseTitle.toLowerCase().includes(searchQuery.toLowerCase())
  //       )
  //     );
  //   }
  // };

  const onChange = (pagination, filters, sorter, extra) => {
    // console.log("params", pagination, filters, sorter, extra);
  };
  if(myTransactions == null){
    return "loading"
  }

  return (
    <DashboardWrapper>
      <div className="dashboard-content-wrapper">
        {myTransactions.length === 0 ? (
          <div className="d-flex justify-content-center align-items-center pt-5 mt-5">
            <EmptyListElement
              line1="You did not have any Transations"
            />
          </div>
        ) : (
          <div className="w-100 pl-5 ">
            {/* <Row justify="end" align="middle" className="mb-4">
              <Input
                addonAfter={<i className="fas fa-search"></i>}
                placeholder="Search by Course Title"
                value={searchQuery}
                onChange={(e) => setSearchQeury(e.target.value)}
                bordered={false}
                className="w-50 bg-light-grey-1 border-radius-24 pl-3"
              />
            </Row> */}
            <Table
              className="dashboard-order-wrapper"
              columns={columns}
              dataSource={myTransactions}
              onChange={onChange}
              showSorterTooltip={false}
              pagination={{ ...pagination, position: ["bottomCenter"] }}
            />
          </div>
        )}
      </div>
    </DashboardWrapper>
  );
};

export default MyTrans;

import React, { useState, useEffect } from "react";
import moment from 'moment';
import { useHistory, useLocation } from "react-router-dom";
//components
import DashboardWrapper from "../../components/Dashboard/DashboardWrapper";
import { Input, Row, Table, Pagination, Tooltip } from "antd";
import EmptyListElement from "../../components/Dashboard/EmptyListElement";
//packages
import _ from "lodash";
import {
  getCustomerOrders,updateCheckoutResult,clearCheckout,getCartList,getUserSettings
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
    title: "Order Date",
    dataIndex: "OrderDate",
    key: "OrderDate",
    className: "dashboard-table-column",
    align: "center",
    ellipsis: true,
    defaultSortOrder: 'descend',
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
      if(subtotal==""){
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
      if(discount==""){
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
        return "";
      }
      return <span>CA ${tax}</span>;
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

const MyOrders = (props) => {
  const history = useHistory();
  const params = Object.fromEntries(
    new URLSearchParams(window.location.search)
  );

  const [searchQuery, setSearchQeury] = useState("");
 
  const [pagination, setPagination] = useState({
    currentPage: 1,
    pageSize: 10,
  });
  const dispatch = useDispatch();
  const { myCustomerOrders,updateCheckoutSuccess } = useSelector((state) => state.courseData);
  const [displayData, setDisplayData] = useState(myCustomerOrders);
  useEffect(() => {
    dispatch(getCustomerOrders(localStorage.getItem('CPDUserID')));
  }, [searchQuery]);
  useEffect(() => {
    handleSearchOrder();
  }, [searchQuery]);
  useEffect(() => {
    myCustomerOrders.forEach(element => {
    });
  })
  useEffect(() => {
    if(params.result != null && params.session_id != null){
      let data = {
        "result": params.result,
        "response_code": "",
        "avs_response_code": "",
        "cvd_response_code": "",
        "response_order_id": params.session_id
      };
      dispatch(updateCheckoutResult(data));
      setTimeout(() => {
        dispatch(getCustomerOrders(localStorage.getItem('CPDUserID')));
        dispatch(getUserSettings());
      }, 2000);
      //清空cart
      dispatch(clearCheckout())
      localStorage.setItem("cartData", JSON.stringify([]));
      dispatch(getCartList());
      history.push("/dashboard/orders")
    }
  }, [params]);

  useEffect(() => {
    if(updateCheckoutSuccess){
      setTimeout(() => {
        dispatch(getCustomerOrders(localStorage.getItem('CPDUserID')));

      }, 500);
    }
  }, [updateCheckoutSuccess]);

  const handleSearchOrder = () => {
    if (searchQuery === "") {
      setDisplayData(myCustomerOrders);
    } else {
      setDisplayData(
        myCustomerOrders.filter((order) =>
          order.courseTitle.toLowerCase().includes(searchQuery.toLowerCase())
        )
      );
    }
  };

  const onChange = (pagination, filters, sorter, extra) => {
    // console.log("params", pagination, filters, sorter, extra);
  };

  return (
    <DashboardWrapper>
      <div className="dashboard-content-wrapper">
        {myCustomerOrders.length === 0 ? (
          <div className="d-flex justify-content-center align-items-center pt-5 mt-5">
            <EmptyListElement
              line1="You did not buy anything"
              line2="Please browse course first"
              btnTitle="Browse course"
            />
          </div>
        ) : (
          <div className="w-100 pl-5 ">
            <Row justify="end" align="middle" className="mb-4">
              <Input
                addonAfter={<i className="fas fa-search"></i>}
                placeholder="Search by Course Title"
                value={searchQuery}
                onChange={(e) => setSearchQeury(e.target.value)}
                bordered={false}
                className="w-50 bg-light-grey-1 border-radius-24 pl-3"
              />
            </Row>
            <Table
              className="dashboard-order-wrapper"
              columns={columns}
              dataSource={myCustomerOrders}
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

export default MyOrders;

import React, { useState,useEffect } from "react";
import { withRouter } from "react-router-dom";
//components
import { Layout, Menu, message } from "antd";
import PageHeader from "../../components/PageHeader";
import {
  LeftOutlined,
  HomeOutlined,
  ReadOutlined,
  WalletOutlined,
  FileProtectOutlined,
  BookOutlined,
  MessageOutlined,
  MailOutlined,
  ReloadOutlined,
  FileDoneOutlined,
  UserOutlined,
  SafetyCertificateOutlined,
  ExportOutlined,
} from "@ant-design/icons";
//redux
import { useDispatch, useSelector } from "react-redux";
import { getUserSettings, saveUserInfo } from "../../redux/actions";

const dashboardMenu = [
  {
    key: "My Home",
    icon: <HomeOutlined />,
    path: "/dashboard"
  },
  {
    key: "My Courses",
    icon: <ReadOutlined />,
    path: "/dashboard/courses",
  },
  {
    key: "My Packages",
    icon: <WalletOutlined />,
    path: "/dashboard/packages",
  },
  {
    key: "My Certificates",
    icon: <FileProtectOutlined />,
    path: "/dashboard/certificates",
  },
  { key: "My Bookmarks", icon: <BookOutlined />, path: "/dashboard/bookmarks" },
  // {
  //   key: "My Reviews",
  //   icon: <MessageOutlined />,
  //   path: "/dashboard/reviews",
  // },
  // {
  //   key: "My Registered Events",
  //   icon: <MailOutlined />,
  //   path: "/dashboard/events",
  // },
  {
    key: "Recent View",
    icon: <ReloadOutlined />,
    path: "/dashboard/recentviews",
  },
  {
    key: "My Orders",
    icon: <FileDoneOutlined />,
    path: "/dashboard/orders",
  },

];

const accountMenu = [
  { key: "Profile", icon: <UserOutlined />, path: "/dashboard/profile" },
  {
    key: "Account Security",
    icon: <SafetyCertificateOutlined />,
    path: "/dashboard/security",
  },
  { key: "Logout", icon: <ExportOutlined />, path: "/dashboard/logout" },
];

const DashboardWrapper = ({ children, history }) => {
  const dispatch = useDispatch();
  const currentLocation = window.location.pathname.split("/").slice(1);
  const { userSettings } = useSelector((state) => state.authData);

  const [menuCollapse, setMenuCollapse] = useState(false);
  const [sectionName, setSectionName] = useState(
    currentLocation.length == 1
      ? "dashboard"
      : [...dashboardMenu, ...accountMenu].filter(
        (menu) => menu.path === window.location.pathname
      )[0].key
  );


  const [breadcrumbs, setBreadcrumbs] = useState(
    currentLocation.map((path) => {
      if (path == "dashboard") {
        return ({
          title: path,
          path: `/${path}`,
        })
      } else {
        return ({
          title: path,
          path: `/dashboard/${path}`,
        })
      }
    })
  );

  const handleMenuCollapse = () => {
    setMenuCollapse(!menuCollapse);
  };

  const handleMenuClick = (key, path) => {
    // setSectionName(key);
    // setBreadcrumbs([breadcrumbs[0], { title: key, path: `/dashboard/${key}` }]);
    key === "Logout" ? logoutUser() : history.push(path);
  };

  const logoutUser = () => {
    dispatch(saveUserInfo(null));
    console.log("login-out")
    localStorage.clear();
    message.success("Successfully logout");
    history.push("/");
  };

  useEffect(() => {
    if (userSettings == null) {
      dispatch(getUserSettings());
    } else {
      if (userSettings.RoleId == 2) {
        dashboardMenu.push({
          key: "My Transactions",
          icon: <FileDoneOutlined />,
          path: "/dashboard/transactions",
        })
      }
    }
  }, [userSettings])

  return (
    <div className="d-flex justify-content-center">
      <div className="content-container pb-5 w-80">
        {breadcrumbs && <PageHeader data={breadcrumbs} theme="light-theme" />}
        <Layout className="dashboard-wrapper">
          <Layout.Sider
            collapsible
            collapsed={menuCollapse}
            onCollapse={handleMenuCollapse}
            // collapsedWidth={0}
            // trigger={
            //   menuCollapse ? (
            //     <RightOutlined className="fs-30" />
            //   ) : (
            //     <LeftOutlined className="fs-30" />
            //   )
            // }
            trigger={null}
            className="dashboard-side-menu-wrapper"
            width="12.5vw"
          >
            {/* <div className="logo" /> */}
            {/* <p
              className={`fw-400 fs-20 color-dark-grey-2 ${
                menuCollapse ? 'd-none' : ''
              }`}
            >
              My Dashboard
            </p> */}
            <Menu mode="vertical" selectedKeys={[sectionName]}>
              <Menu.Item
                title="My Dashboard"
                className="pl-0 fw-400 fs-20 color-dark-grey-2 menu-item-title"
              >
                My Dashboard
              </Menu.Item>
              {dashboardMenu.map((menu) => (
                <Menu.Item
                  key={menu.key}
                  icon={menu.icon}
                  onClick={() => handleMenuClick(menu.key, menu.path)}
                  className="side-menu-item"
                >
                  {menu.key}
                </Menu.Item>
              ))}
              <Menu.Item
                title="My Dashboard"
                className="pl-0 fw-400 fs-20 color-dark-grey-2 menu-item-title"
              >
                Account
              </Menu.Item>
              {accountMenu.map((menu) => (
                <Menu.Item
                  key={menu.key}
                  icon={menu.icon}
                  onClick={() => {
                    console.log(menu.key, menu.path);
                    handleMenuClick(menu.key, menu.path);
                  }}
                  className="side-menu-item"
                >
                  {menu.key}
                </Menu.Item>
              ))}
            </Menu>

            {/* <p
              className={`fw-400 fs-20 mt-5 color-dark-grey-2 ${
                menuCollapse ? 'd-none' : ''
              }`}
            >
              Account
            </p>
            <Menu mode='vertical' selectedKeys={acctSectionName}>
              {accountMenu.map((menu) => (
                <Menu.Item
                  key={menu.key}
                  icon={menu.icon}
                  onClick={() => handleAcctMenuClick(menu.key, menu.path)}
                >
                  {menu.key}
                </Menu.Item>
              ))}
            </Menu> */}
          </Layout.Sider>
          {breadcrumbs && <Layout.Content>{children}</Layout.Content>}
        </Layout>
      </div>
    </div>
  );
};

export default withRouter(DashboardWrapper);

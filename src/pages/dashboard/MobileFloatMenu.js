import React, { useState, useEffect } from 'react';
//packages
import { useHistory } from 'react-router-dom';
//components
import { Drawer, Menu, message } from 'antd';
import {
  LeftOutlined,
  RightOutlined,
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
  MenuUnfoldOutlined,
} from '@ant-design/icons';

const dashboardMenu = [
  {
    key: 'My Courses',
    icon: <ReadOutlined />,
    path: '/dashboard/courses',
  },
  {
    key: 'My Packages',
    icon: <WalletOutlined />,
    path: '/dashboard/packages',
  },
  {
    key: 'My Certificates',
    icon: <FileProtectOutlined />,
    path: '/dashboard/certificates',
  },
  { key: 'My Bookmarks', icon: <BookOutlined />, path: '/dashboard/bookmarks' },
  // {
  //   key: 'My Reviews',
  //   icon: <MessageOutlined />,
  //   path: '/dashboard/reviews',
  // },
  // {
  //   key: 'My Registered Events',
  //   icon: <MailOutlined />,
  //   path: '/dashboard/events',
  // },
  {
    key: 'Recent View',
    icon: <ReloadOutlined />,
    path: '/dashboard/recentviews',
  },
  {
    key: 'My Orders',
    icon: <FileDoneOutlined />,
    path: '/dashboard/orders',
  },
  {
    key: "My Transactions",
    icon: <FileDoneOutlined />,
    path: "/dashboard/transactions",
  },
];

const accountMenu = [
  { key: 'Profile', icon: <UserOutlined />, path: '/dashboard/profile' },
  {
    key: 'Account Security',
    icon: <SafetyCertificateOutlined />,
    path: '/dashboard/security',
  },
  { key: 'Logout', icon: <ExportOutlined />, path: '/dashboard/logout' },
];

const MobileFloatMenu = (props) => {
  const currentLocation = window.location.pathname.split('/').slice(1);
  const history = useHistory();
  const [sectionName, setSectionName] = useState('dashboard');
  const [floatMenu, setFloatMenu] = useState({
    visible: false,
  });

  useEffect(() => {
    setSectionName(
      currentLocation.length === 1
        ? 'dashboard'
        : [...dashboardMenu, ...accountMenu].filter(
            (menu) => menu.path === window.location.pathname
          )[0].key
    );
  }, [window.location.pathname]);

  const handleMenuClick = (key, path) => {
    console.log(key);
    setFloatMenu({ ...floatMenu, visible: false });
    key === 'Logout' ? logoutUser() : history.push(path);
  };

  const logoutUser = () => {
    console.log('logging out');
    localStorage.removeItem('user');
    message.success('Successfully logout');
    history.push('/');
  };

  return (
    <div
      className={`dashboard-float-menu-wrapper hide-on-pc ${
        floatMenu.visible && 'd-none'
      }`}
    >
      <MenuUnfoldOutlined
        className='fs-30'
        onClick={() => setFloatMenu({ ...floatMenu, visible: true })}
      />
      <Drawer
        closable={false}
        visible={floatMenu.visible}
        placement='left'
        onClose={() => setFloatMenu({ ...floatMenu, visible: false })}
        className='dashboard-float-menu'
      >
        <Menu mode='vertical' selectedKeys={[sectionName]}>
          <Menu.Item
            title='My Dashboard'
            className='pl-0 fw-400 fs-20 color-dark-grey-2 menu-item-title'
          >
            My Dashboard
          </Menu.Item>
          {dashboardMenu.map((menu) => (
            <Menu.Item
              key={menu.key}
              icon={menu.icon}
              onClick={() => handleMenuClick(menu.key, menu.path)}
              className='side-menu-item'
            >
              {menu.key}
            </Menu.Item>
          ))}
          <Menu.Item
            title='My Dashboard'
            className='pl-0 fw-400 fs-20 color-dark-grey-2 menu-item-title'
          >
            Account
          </Menu.Item>
          {accountMenu.map((menu) => (
            <Menu.Item
              key={menu.key}
              icon={menu.icon}
              onClick={() => handleMenuClick(menu.key, menu.path)}
              className='side-menu-item'
            >
              {menu.key}
            </Menu.Item>
          ))}
        </Menu>
      </Drawer>
    </div>
  );
};

export default MobileFloatMenu;

'use client';
import { Layout, Menu } from 'antd';
import React, { useState } from 'react';
import HeaderComponent from '../header/HeaderComponent';
import HeaderMobile from '../header/header-mobile/HeaderMobile';
import { useRouter } from 'next/navigation';
import {
  AppstoreOutlined,
  EditOutlined,
  LogoutOutlined,
  QuestionCircleOutlined,
  ShoppingCartOutlined,
} from '@ant-design/icons';
import Link from 'next/link';
import { useSelector } from 'react-redux';
import Auth from '@/utils/store/Authentication';

const HomePage = () => {
  const router = useRouter();
  const [isShowConnectShopify, setIsShowConnectShopify] = useState(false);
  const [isShowProfile, setIsShowProfile] = useState(Auth.isAuthenticated());
  const myApps = useSelector((state) => state.myAppsReducer.getMyAppsResponse);
  const isMobile = useSelector((state) => state.uiReducer.device.isMobile);
  const CMS_URL = process.env.NEXT_PUBLIC_REACT_APP_CMS_URL ?? 'https://cms.letsmetrix.com';
  const accessToken = Auth.getAccessToken();

  const onSearch = (value) => {
    if (value) {
      router.push({
        pathname: '/search',
        search: '?q=' + value,
      });
      // router.refresh();
    }
  };

  const handleChangePass = () => {
    router.push('/auth/change-password');
    router.refresh();
  };

  const handleConnectShopify = () => {
    setIsShowConnectShopify(true);
  };

  const handleLogout = () => {
    setIsShowProfile(false);
    router.push('/auth/login-app');
    router.refresh();
  };

  const menu = (
    <Menu className="apps-dropdown">
      {Auth.isAuthenticated() && (
        <Menu.Item key="cms" icon={<AppstoreOutlined />}>
          <Link target="_blank" href={`${CMS_URL}/login?accessToken=` + accessToken}>
            Cms
          </Link>
        </Menu.Item>
      )}
      <Menu.Item key="changePass" onClick={handleChangePass} icon={<EditOutlined />}>
        Change password
      </Menu.Item>
      <Menu.Item key="connectShopifyApi" onClick={handleConnectShopify} icon={<ShoppingCartOutlined />}>
        Connect shopify api
      </Menu.Item>
      <Menu.Item key="help" icon={<QuestionCircleOutlined />}>
        <Link target="_blank" rel="noopener noreferrer" href="https://docs.letsmetrix.com/">
          Help
        </Link>
      </Menu.Item>
      <Menu.Item key="logout" onClick={handleLogout} icon={<LogoutOutlined />}>
        Logout
      </Menu.Item>
    </Menu>
  );

  return (
    <Layout className="container">
      {!isMobile ? (
        <HeaderComponent myApps={myApps} menu={menu} isShowProfile={isShowProfile}/>
      ) : (
        <HeaderMobile onSearch={onSearch} menu={menu} isShowProfile={isShowProfile} myApps={myApps} />
      )}
    </Layout>
  );
};

export default HomePage;

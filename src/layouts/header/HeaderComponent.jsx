'use client';
import { Avatar, Button, Dropdown, Input, Layout, Menu, Tooltip } from 'antd';
import './HeaderComponent.scss';
import { CaretDownOutlined, CloseOutlined, LoadingOutlined, SearchOutlined } from '@ant-design/icons';
import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

const { Header } = Layout;

const menuItems = [
  {
    key: 'apps',
    title: 'Apps',
    hasSub: true,
    linkTo: '/dashboard',
  },
  {
    key: 'topApps',
    title: 'Top Apps',
    hasSub: true,
    linkTo: '/top-new-apps',
  },
  {
    key: 'blogs',
    title: 'Blogs',
    linkTo: '/blogs',
  },
  {
    key: 'developers',
    title: 'Developers',
    linkTo: '/developers',
  },

  {
    key: 'watching-apps',
    title: 'Watching',
    linkTo: '/watching-apps',
  },
  {
    key: 'my-apps',
    title: 'My Apps',
    nameShow: 'My Apps',
    isShowPopupMyApp: true,
    isCheckAuth: true,
  },
];

const HeaderComponent = () => {
  const [selectedKey, setSelectedKey] = useState(null);

  const onClickHomepage = () => {
    setSelectedKey(null);
  };

  return (
    <Header className="sasi-layout-background">
      <div className="header-sasi container">
        <div className="menu-sasi">
          <div className="menu-content">
            <div className="logo-sasi">
              <Menu>
                <Menu.Item key="homepage" onClick={onClickHomepage}>
                  <Image src="/image/logo_update.png" className="img-responsive" alt="Logo" width={75} height={45} />
                  <a href="/" />
                </Menu.Item>
              </Menu>
            </div>
            <div className="menu-right">
              <div className="list-menu">
                <Menu mode="horizontal" defaultSelectedKeys={['4']} selectedKeys={[selectedKey]}>
                  {menuItems.map((item, index) => {
                    if (item.hasSub) {
                      return (
                        <Menu.Item key={item.key} className="menu-item-detail">
                          <Dropdown
                            placement="bottomCenter"
                            // overlay={item.key === 'topApps' ? topAppsSubmenu : popupSubmenu}
                            className="box-shadow"
                            arrow
                          >
                            <Link href={item.linkTo} className="menu-link">
                              {item.title}
                              <CaretDownOutlined style={{ marginLeft: '5px' }} />
                            </Link>
                          </Dropdown>
                        </Menu.Item>
                      );
                    }
                    {
                      /* if (item.isCheckAuth) {
                      if (Auth.isAuthenticated() && item.isShowPopupMyApp) {
                        return (
                          <Menu.Item key="my-apps" className="menu-item-detail">
                            <Dropdown placement="bottomCenter" overlay={popupMyApp} arrow>
                              <span className="menu-link">{item.title}</span>
                            </Dropdown>
                          </Menu.Item>
                        );
                      }
                    } else {
                      return (
                        <Menu.Item key={item.key} className="menu-item-detail">
                          <Link href={item.linkTo} className="menu-link">
                            {item.title}
                          </Link>
                        </Menu.Item>
                      );
                    } */
                    }
                  })}
                  {/* <Menu.Item key="search" onClick={handleMenuItemClick} className="menu-item-search">
                    {isShowSearch ? (
                      <Dropdown overlay={listAppsSearch} trigger={['click']}>
                        <Input
                          placeholder="Application name"
                          className="search-data"
                          onChange={onSearchApps}
                          onClick={(e) => e.stopPropagation()}
                          suffix={loadingSearch ? <LoadingOutlined /> : <></>}
                        />
                      </Dropdown>
                    ) : (
                      <>
                        <SearchOutlined
                          className="search-icon"
                          onClick={(e) => {
                            setIsShowSearch(true);
                            e.stopPropagation();
                          }}
                        />
                        <div
                          className="search-text"
                          onClick={(e) => {
                            setIsShowSearch(true);
                            e.stopPropagation();
                          }}
                        >
                          Search
                        </div>
                      </>
                    )}
                    {isShowSearch && <CloseOutlined className="close-icon" onClick={() => setIsShowSearch(false)} />}
                  </Menu.Item> */}
                </Menu>
              </div>
            </div>
          </div>
          {/* {isShowProfile ? (
            <div className="header-profile flex items-center">
              <Dropdown overlay={menu} trigger={['click']}>
                <Tooltip title={userName ? userName : ''} className="flex items-center" placement="right">
                  <Avatar className="avatar-profile-header" style={{ backgroundColor: '#FFC225' }}>
                    {userName ? userName.substring(0, 1).toLocaleUpperCase() : ''}
                  </Avatar>
                </Tooltip>
              </Dropdown>
              <div className="model-connect-shopify"></div>
            </div>
          ) : (
            <div className="button-login">
              <Button className="button-login-styled" size={'medium'} onClick={handleLogin}>
                Get Started
              </Button>
            </div>
          )} */}
        </div>
      </div>
    </Header>
  );
};

export default HeaderComponent;

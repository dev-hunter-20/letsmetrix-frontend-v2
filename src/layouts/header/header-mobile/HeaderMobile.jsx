'use client';

import { MENU_APP_ITEM, MENU_ITEMS, MENU_TOP_APP_ITEM } from '@/constants/MenuItem';
import Auth from '@/utils/store/Authentication';
import { UserOutlined } from '@ant-design/icons';
import { Avatar, Button, Dropdown, Input } from 'antd';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import './HeaderMobile.scss'

const { Search } = Input;

const HeaderMobile = ({ onSearch, isShowProfile, myApps, menu }) => {
  const [active, setActive] = useState(false);
  const router = useRouter();
  const [activeDropdown, setActiveDropdown] = useState(false);
  const [activeMenu, setActiveMenu] = useState(false);
  const [activeTopApp, setActiveTopApp] = useState(false);

  const handlerClick = () => {
    setActive(!active);
  };

  const handleLogin = () => {
    router.push({
      pathname: '/auth/login-app',
    });
    router.refresh();
  };

  const handlerClickDropdown = (item) => {
    if (item.hasSub) {
      item.key === 'apps' ? setActiveMenu(!activeMenu) : setActiveTopApp(!activeTopApp);
      return;
    }
    if (item.isCheckAuth) {
      setActiveDropdown(!activeDropdown);
    }
  };

  return (
    <div className="Header-mobile">
      <div className="Header-mobile-logo">
        <Link href="/">
          <Image src="/image/logo_update.png" alt="Logo" width={80} height={60} />
        </Link>
      </div>
      <div className="Header-mobile-bottom">
        <div className="Header-mobile-bottom-bars" onClick={handlerClick}>
          <svg xmlns="http://www.w3.org/2000/svg" width="26" height="23" viewBox="0 0 26 23" fill="none">
            <path
              d="M25.2496 0.994263H0.749634C0.612134 0.994263 0.499634 1.10676 0.499634 1.24426V3.24426C0.499634 3.38176 0.612134 3.49426 0.749634 3.49426H25.2496C25.3871 3.49426 25.4996 3.38176 25.4996 3.24426V1.24426C25.4996 1.10676 25.3871 0.994263 25.2496 0.994263ZM25.2496 20.4943H0.749634C0.612134 20.4943 0.499634 20.6068 0.499634 20.7443V22.7443C0.499634 22.8818 0.612134 22.9943 0.749634 22.9943H25.2496C25.3871 22.9943 25.4996 22.8818 25.4996 22.7443V20.7443C25.4996 20.6068 25.3871 20.4943 25.2496 20.4943ZM25.2496 10.7443H0.749634C0.612134 10.7443 0.499634 10.8568 0.499634 10.9943V12.9943C0.499634 13.1318 0.612134 13.2443 0.749634 13.2443H25.2496C25.3871 13.2443 25.4996 13.1318 25.4996 12.9943V10.9943C25.4996 10.8568 25.3871 10.7443 25.2496 10.7443Z"
              fill="#F5F5F5"
            />
          </svg>
        </div>
        <div className="Header-mobile-search">
          <Search placeholder="Search for apps and developer" onSearch={onSearch} />
        </div>
        <div className="Header-mobile-login">
          {isShowProfile ? (
            <div className="header-profile">
              <Dropdown overlay={menu} trigger={['click']}>
                <div className="profile-header">
                  <Avatar
                    className="avatar-profile-header"
                    style={{ backgroundColor: '#FFC225' }}
                    icon={<UserOutlined />}
                  />
                  {/* <div className="profile-name">{userName}</div> */}
                </div>
              </Dropdown>
              <div className="model-connect-shopify"></div>
            </div>
          ) : (
            <div className="button-login">
              <Button type="primary" size={'medium'} onClick={handleLogin}>
                Login
              </Button>
            </div>
          )}
        </div>
        <ul className={`Header-mobile-list ${active ? 'active' : ''}`}>
          {MENU_ITEMS &&
            MENU_ITEMS.map((item, index) => (
              <li
                key={item.key}
                className={`${item.isCheckAuth || item.hasSub ? 'has-sub-menu' : ''}`}
                onClick={() => handlerClickDropdown(item)}
              >
                {item.isCheckAuth && Auth.isAuthenticated() && item.isShowPopupMyApp ? (
                  <Link href="javascript:void(0)">{item.nameShow}</Link>
                ) : (
                  <Link href={item.hasSub ? 'javascript:void(0)' : item.linkTo}>{item.title}</Link>
                )}
                {item.hasSub && item.key === 'apps' ? (
                  <ul className={`dropdownMenu ${activeMenu ? 'active' : ''}`}>
                    {MENU_APP_ITEM.map((item) => (
                      <li key={item.key}>
                        <Link href={item.linkTo}>{item.title}</Link>
                      </li>
                    ))}
                  </ul>
                ) : (
                  ''
                )}
                {item.hasSub && item.key !== 'apps' ? (
                  <ul className={`dropdownMenu ${activeTopApp ? 'active' : ''}`}>
                    {MENU_TOP_APP_ITEM.map((item) => (
                      <li key={item.key}>
                        <Link href={item.linkTo}>{item.title}</Link>
                      </li>
                    ))}
                  </ul>
                ) : (
                  ''
                )}
                {item.isCheckAuth && Auth.isAuthenticated() && item.isShowPopupMyApp ? (
                  <ul className={`dropdownMenu ${activeDropdown ? 'active' : ''}`}>
                    {myApps &&
                      myApps.map((item, index) => (
                        <li key={index}>
                          <Link href={'/app/' + item.app_id}>
                            {item.detail && item.detail.name ? item.detail.name : ''}
                          </Link>
                        </li>
                      ))}
                  </ul>
                ) : (
                  ''
                )}
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
};

export default HeaderMobile;

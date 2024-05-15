'use client';

import { Breadcrumb, Layout } from 'antd';
import ModalConnectShopify from './../../components/modal/ModalConnectShopify';
import { BREADCRUMB_ROUTES } from '../../constants/MenuItem';
import ScrollToTop from '../../components/scroll-to-top/ScrollToTop';
import { usePathname } from 'next/navigation';
import Link from 'next/link';

const { Content } = Layout;

const Container = ({ children, isShowConnectShopify, setIsShowConnectShopify }) => {
  const pathname = usePathname();

  const disableModalConnectShopifyApi = () => {
    setIsShowConnectShopify(false);
  };

  const getLabelBreadcrumb = () => {
    const currentPage = BREADCRUMB_ROUTES.find((item) => item.path == pathname);
    return currentPage ? currentPage.label : '';
  };

  return (
    <Content className="container-content">
      {isShowConnectShopify && (
        <div className="modal-connect-shopify">
          <ModalConnectShopify disableModal={disableModalConnectShopifyApi} />
        </div>
      )}
      {BREADCRUMB_ROUTES.map((item) => item.path).includes(pathname) && (
        <div className="breadcrumb-header">
          <div className="container">
            <Breadcrumb>
              <Breadcrumb.Item>
                <Link href={`/`}>Home</Link>
              </Breadcrumb.Item>
              <Breadcrumb.Item style={{ color: 'white' }}>{getLabelBreadcrumb()}</Breadcrumb.Item>
            </Breadcrumb>
          </div>
        </div>
      )}

      <div
        className="content-menu"
        style={{
          marginBottom: `${pathname === '/' || pathname === '/explore' ? 0 : '50px'}`,
        }}
      >
        {children}
      </div>
      <ScrollToTop />
    </Content>
  );
};

export default Container;

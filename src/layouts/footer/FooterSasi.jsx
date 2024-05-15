/* eslint-disable @next/next/no-img-element */
'use client';

import { MailOutlined } from '@ant-design/icons';
import { Col, Layout, Row, Typography } from 'antd';
import { menuLinks, linkUnderline } from '../../constants/MenuItem';
import Image from 'next/image';
import './FooterSasi.scss';

const { Footer } = Layout;

const FooterSasi = () => {
  return (
    <Footer className="footer-content">
      <div className="footer-sasi container">
        <Row gutter={50} className="flex-width" justify="space-between">
          <Col lg={5} sm={8} xs={16}>
            <Row justify="end">
              <Typography.Text>Copyright © 2023 Lets Metrix LTD</Typography.Text>
            </Row>
            <Row justify="end">
              <Image
                src="/image/footer-sasi.png"
                style={{ marginTop: '10px' }}
                width={75}
                height={50}
                className="img-fluid"
                alt="Logo"
              />
            </Row>
          </Col>
          <Col lg={2} sm={8} xs={8} className="flex flex-col justify-start">
            {menuLinks.map((item, index) => (
              <a key={index} href={item.href} className={`link ${item.class} text-start`}>
                {item.title}
              </a>
            ))}
          </Col>
          <Col lg={5} sm={8} xs={24}>
            <div className="footer-email">
              <MailOutlined className="footer-email-icon" />
              <span>
                <a href="mailto:contact@letsmetrix.com">contact@letsmetrix.com</a>
              </span>
            </div>
          </Col>
          {linkUnderline.map((item, index) => (
            <Col key={index} lg={3} sm={8} xs={8} className="footer-mobile">
              <a className="link__underline" href={item.href}>
                {item.title}
              </a>
            </Col>
          ))}
        </Row>
      </div>
    </Footer>
  );
};

export default FooterSasi;

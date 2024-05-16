'use client';

import React from 'react';
import './DataManage.scss';
import { Row, Col, Button } from 'antd';
import { dataTracking } from '../Data';
import { CheckOutlined } from '@ant-design/icons';
import LandingPageApiService from './../../../api-services/api/LandingPageApiService';
import Image from 'next/image';
import { footerButton } from '../../../utils/functions';

const DataManage = (props) => {
  const backAction = () => {
    props.backToMain();
  };

  const skipAction = async () => {
    await LandingPageApiService.handleShowOnboard(false, 'data-management');
    props.handleSuccess();
  };

  return (
    <>
      <Row className="tracking" justify="space-between">
        <Col span={16}>
          <Image className="search-img" src="/image/data-manage.gif" alt="" loading="lazy" />
        </Col>
        <Col span={7} className="tracking-desc">
          Access data management
          {dataTracking.map((item) => (
            <Row key={item.addApp} className="tracking-feature">
              <Col span={3}>
                <Image src="/image/arrow-feature.png" alt="" loading="lazy" />
              </Col>
              <Col span={21} style={{ marginTop: '3px' }}>
                {item.dataManage}
              </Col>
            </Row>
          ))}
          <Row style={{ marginLeft: '35px' }}>...</Row>
        </Col>
      </Row>
      {footerButton(
        <div className="flex">
          <div className="onboarding-skip" onClick={backAction}>
            Back
          </div>
          <Button style={{ marginLeft: '20px' }} type="primary" onClick={backAction}>
            Done <CheckOutlined />
          </Button>
        </div>,
        skipAction,
      )}
    </>
  );
};

export default DataManage;

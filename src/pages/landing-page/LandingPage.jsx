'use client';

import { ArrowRightOutlined, LeftOutlined, RightOutlined, SearchOutlined, StarFilled } from '@ant-design/icons';
import {
  Button,
  Carousel,
  Col,
  Divider,
  Form,
  Input,
  Progress,
  Row,
  Spin,
  Tooltip,
  TreeSelect,
  Typography,
} from 'antd';
import './LandingPage.scss';
import { useRouter } from 'next/navigation';
import Auth from './../../utils/store/Authentication';
import Image from 'next/image';
import LandingPageApiService from '../../api-services/api/LandingPageApiService';
import { useEffect, useRef, useState } from 'react';
import FadeInSection from './../../components/fade-in-section/FadeInSection';
import TableApp from './../../components/table-app/TableApp';
import moment from 'moment';
import Link from 'next/link';
import { COLUMNS } from '@/constants/MenuItem';
import MainBlog from './../../components/blog/MainBlog';
import SecondaryBlog from './../../components/blog/SecondaryBlog';

const LandingPage = () => {
  const router = useRouter();
  const [categories, setCategories] = useState();
  const [topApp, setTopApp] = useState();
  const [blogs, setBlogs] = useState();
  const [count, setCount] = useState();
  const [top5Apps, setTop5Apps] = useState();
  const [showOnboard, setShowOnboard] = useState(false);
  const [loading, setLoading] = useState(false);
  const [valueFilter, setValueFilter] = useState('finding-products');
  const features = useRef(null);
  const [goToSlide, setGoToSlice] = useState(0);

  const onSearchApp = (values) => {
    router.push({
      pathname: '/search',
      search: '?q=' + values.appName,
    });
    router.refresh();
  };

  const handleSignUp = () => {
    if (Auth.getAccessToken()) {
      router.push({
        pathname: '/pricing',
      });
      return;
    }
    router.push({
      pathname: '/auth/register',
    });
    router.refresh();
  };

  const dataCategory = (allCategory) => {
    if (allCategory) {
      return allCategory.map((item) => {
        return {
          value: item.slug,
          title: item.text,
          children: dataCategory(item.child),
        };
      });
    }
  };

  const fetchDetailApp = async () => {
    const [top5Apps, dataCategoryPos, dataTopMover, dataTopReview, dataTopRelease, count, dataBlogs, isShowOnboard] =
      await Promise.all([
        LandingPageApiService.getTop5Apps('finding-products'),
        LandingPageApiService.getCategoriesHome('uk'),
        LandingPageApiService.getGrowthRateApps(1, 3),
        LandingPageApiService.getTopReviewHome(),
        LandingPageApiService.getTopReleaseHome(1, 9),
        LandingPageApiService.getCount(),
        LandingPageApiService.getBlog(1, 3),
        Auth.getAccessToken() && LandingPageApiService.handleShowOnboard(),
      ]);
    if (dataCategoryPos) {
      setCategories(dataCategory(dataCategoryPos.category));
    }
    setTopApp({
      topMovers: dataTopMover.data,
      topReviews: dataTopReview.most_reviewed,
      topRelease: dataTopRelease.top_release,
    });
    setBlogs(dataBlogs.data);
    setCount(count);
    setTop5Apps(top5Apps.data && top5Apps.data.apps ? top5Apps.data.apps.sort((a, b) => a.star - b.star) : []);
    if (isShowOnboard && isShowOnboard.show_onboarding) {
      setShowOnboard(true);
    }
  };

  useEffect(() => {
    fetchDetailApp();
  }, []);

  const filterByCat = async (id) => {
    setLoading(true);
    const top5Apps = await LandingPageApiService.getTop5Apps(id);
    setTop5Apps(top5Apps.data.apps.sort((a, b) => a.star - b.star));
    setLoading(false);
  };

  const onChangeFilter = (value) => {
    setValueFilter(value);
    filterByCat(value);
  };

  const slides = [0, 1, 2, 3, 4, 5].map((item, index) => {
    return {
      key: index,
      content: (
        <Row className={`${goToSlide !== index ? 'width-sm' : 'width-lg'} contain-slide`}>
          <Col className="slide-img" lg={12} md={24}>
            <Image src={'/image/image1.png'} alt="trending" width={'90%'} height={'90%'} />
          </Col>
          <Col lg={12} md={24} style={{ padding: '20px' }}>
            <Row>
              <Typography.Text style={{ fontSize: '36px' }}>New trending category Q2 2023</Typography.Text>
            </Row>
            <Row>
              <Typography.Text style={{ fontSize: '16px' }} className="mt-20">
                The Shopify App Store is a marketplace where Shopify merchants can browse and install apps that extend
                the functionality of their online stores. The App Store offers a wide
              </Typography.Text>
            </Row>
            <Row>
              <Button icon={<ArrowRightOutlined />} className="wrapper__button" type="primary">
                Explore more
              </Button>
            </Row>
          </Col>
        </Row>
      ),
    };
  });

  const renderDataSource = (data) => {
    if (data) {
      return data.map((item) => {
        return {
          app: {
            img: item.detail.app_icon,
            name: item.detail.name || '--',
            desc: item.detail.metatitle || '--',
            slug: item.detail.app_id,
          },
          diffRank: item.count || item.review_count || moment(item.detail.launched).fromNow(),
        };
      });
    }
    return [];
  };

  const viewDashboard = () => {
    router.push('/dashboard');
  };

  return (
    <div className="layout-landing-page">
      <div className="layout-landing-page-intro">
        <div className="container">
          <Row type="flex" style={{ alignItems: 'center' }}>
            <Col lg={12} span={24}>
              <h1 className="title">All you need to win Shopify Apps market</h1>
              <h2 className="description">Insights and data across thousands Shopify Apps</h2>
              <div className="input">
                <Form onFinish={onSearchApp}>
                  <Form.Item name="appName">
                    <Input
                      className="input-style"
                      size="large"
                      placeholder="Find an app by name, categories and more"
                      prefix={<SearchOutlined />}
                    />
                  </Form.Item>
                </Form>
              </div>
              <div className="divider">
                <Divider />
              </div>
              <h2 className="description">Want a deeper insights?</h2>
              <div className="cta-btn">
                <Button className="wrapper__button" onClick={handleSignUp}>
                  Start your free trial
                </Button>
              </div>
            </Col>
            <Col lg={12} span={24} className="flex flex-col items-center">
              <div className={`progress flex ${top5Apps ? 'flex-col justify-between' : 'justify-center items-center'}`}>
                {top5Apps ? (
                  top5Apps.map((item, index) => {
                    return (
                      <div key={item.id} style={{ display: 'flex', alignItems: 'center' }}>
                        <Progress
                          className={`progress-${index}`}
                          percent={60}
                          showInfo={false}
                          strokeColor={{
                            '0%': 'rgba(182, 131, 0, 1)',
                            '100%': 'rgba(255, 194, 37, 1)',
                          }}
                        />

                        <Tooltip title={item.name}>
                          <Typography.Text ellipsis={1} className="progress-name">
                            {item.name} <br /> {item.star} <StarFilled style={{ color: 'yellow' }} />
                          </Typography.Text>
                        </Tooltip>
                        <a href={`/app/${item.id}`}>
                          <Image className="progress-image" src={item.app_icon} alt="logoo" width={48} height={48} />
                        </a>
                      </div>
                    );
                  })
                ) : (
                  <Spin size="large" />
                )}
              </div>
              {categories && (
                <div className="sort-by">
                  <TreeSelect
                    showSearch
                    value={valueFilter}
                    placeholder="Please select"
                    onChange={onChangeFilter}
                    treeData={categories}
                    virtual={false}
                    loading={loading}
                  />
                </div>
              )}
            </Col>
          </Row>
        </div>
      </div>

      <FadeInSection>
        <div className="layout-landing-page-features" ref={features}>
          <div className="container">
            <Row justify={'center'}>
              <Col span={24} className="text-center">
                <Typography.Title className="primary-color" level={3}>
                  Trending Statistics
                </Typography.Title>
              </Col>
              <Col span={24} className="text-center">
                <Typography.Text style={{ fontSize: '42px' }}>
                  Get Ahead of Your Competition with Our Trending Statistics
                </Typography.Text>
              </Col>
              <Col span={24} style={{ marginTop: '50px' }}>
                <Row className="fetures-slide">
                  <Col span={1}>
                    <Button
                      onClick={() => {
                        setGoToSlice((prev) => (prev === 0 ? 5 : prev - 1));
                      }}
                      shape="circle"
                      icon={<LeftOutlined />}
                    />
                  </Col>
                  <Col span={22}>
                    <Carousel
                      slides={slides.map((element, index) => {
                        return {
                          ...element,
                          onClick: () => setGoToSlice(index),
                        };
                      })}
                      goToSlide={goToSlide}
                    />
                  </Col>
                  <Col span={1}>
                    <Button
                      onClick={() => {
                        setGoToSlice((prev) => (prev === 5 ? 0 : prev + 1));
                      }}
                      shape="circle"
                      icon={<RightOutlined />}
                    />
                  </Col>
                </Row>
              </Col>
            </Row>
          </div>
        </div>
      </FadeInSection>

      <FadeInSection>
        <div className="layout-landing-page-collection">
          <div className="container">
            <Row justify="center">
              <Typography.Title className="primary-color" level={3}>
                App Collection
              </Typography.Title>
            </Row>
            <Row justify="space-between">
              <Col className="bordered">
                <TableApp
                  item={{
                    title: 'New Release',
                    data: renderDataSource(topApp && topApp.topRelease),
                  }}
                />
              </Col>
              <Col className="bordered-left">
                {[
                  {
                    title: 'Top Movers',
                    data: renderDataSource(topApp && topApp.topMovers),
                  },
                  {
                    title: 'Most Reviewed',
                    data: renderDataSource(topApp && topApp.topReviews),
                  },
                ].map((item) => (
                  <div key={item.id} className="bordered-left-styled">
                    <TableApp item={item} />
                  </div>
                ))}
              </Col>
            </Row>
          </div>
        </div>
      </FadeInSection>

      <div className="layout-landing-page-param">
        <Row className="detail">
          <Col xl={8} lg={10} md={10} className="image">
            <Image src="/image/anhnen.png" alt="anhnen" className="image--padding" width={600} height={450} />
          </Col>
          <Col lg={12} sm={18} xs={22}>
            <FadeInSection>
              <Row>
                <Typography.Title className="primary-color" level={3}>
                  Market Insights
                </Typography.Title>
              </Row>
              <Row>
                <Typography.Text style={{ fontSize: '42px' }}>Understand what rules the market</Typography.Text>
              </Row>
              <Row>
                <Typography.Text className="detail__text">
                  Let’s Metrix helps marketers, developers and product managers to understand insights and data across
                  thousands Shopify Apps
                </Typography.Text>
              </Row>
              {count && (
                <Row justify={'space-between'}>
                  {[
                    {
                      title: 'Apps',
                      value: count.app_count,
                      href: '/dashboard',
                    },
                    {
                      title: 'Reviews',
                      value: count.review_count,
                      href: '/dashboard/reviews',
                    },
                    {
                      title: 'Categories',
                      value: count.category_count,
                      href: '/categories',
                    },
                    {
                      title: 'Developers',
                      value: count.partner_count,
                      href: '/developers',
                    },
                  ].map((item) => (
                    <Col key={item.id} className="detail__box">
                      <Row>
                        <Link href={item.href}>
                          <Typography.Text className="total-title" level={1}>
                            {item?.value?.toLocaleString('en-US') ?? ''}
                          </Typography.Text>
                        </Link>
                      </Row>
                      <Row>
                        <Typography.Text className="total-desc">{item.title}</Typography.Text>
                      </Row>
                    </Col>
                  ))}
                </Row>
              )}
              <Row>
                <Button onClick={viewDashboard} className="wrapper__button mt-30" type="primary">
                  Explore what you can get
                </Button>
              </Row>
            </FadeInSection>
          </Col>
        </Row>
      </div>

      <FadeInSection>
        <div className="layout-landing-page-blog">
          <div className="container">
            <Row justify={'center'}>
              <Col span={24}>
                <Row>
                  <Typography.Title className="primary-color" level={3}>
                    Blog
                  </Typography.Title>
                </Row>
                <Row>
                  <Typography.Text style={{ fontSize: '42px' }}>Insights and Inspiration</Typography.Text>
                </Row>
                <Row gutter={60} style={{ marginTop: '30px' }}>
                  {blogs && (
                    <>
                      <MainBlog slug={blogs[0].slug} />
                      <Col lg={13} md={24} className="blog-column">
                        {[blogs[1].slug, blogs[2].slug].map((item) => (
                          <SecondaryBlog key={item.id} slug={item} />
                        ))}
                      </Col>
                    </>
                  )}
                </Row>
              </Col>
            </Row>
          </div>
        </div>
      </FadeInSection>

      <FadeInSection>
        <div className="layout-landing-page-download">
          <div className="container">
            <Row justify={'center'}>
              <Row style={{ height: '100%' }}>
                <Col xl={12} lg={24} className="mt-30">
                  <Row>
                    <Typography.Text className="download-title">Ready to win your App Market?</Typography.Text>
                  </Row>
                  <Row>
                    <Button className="button-getKey">Get your key to success</Button>
                  </Row>
                </Col>
                <Col xl={12} className="download-cols">
                  <Row align="bottom" justify="center" style={{ height: '100%' }}>
                    {COLUMNS.map((item) => (
                      <Col
                        key={item.id}
                        className="cols"
                        style={{
                          height: item.height,
                          background: item.color,
                        }}
                      />
                    ))}
                  </Row>
                </Col>
              </Row>
            </Row>
          </div>
        </div>
      </FadeInSection>
    </div>
  );
};

export default LandingPage;

'use client';
import { useEffect, useState } from 'react';
import { Button, Col, Row, Typography } from 'antd';
import { ArrowRightOutlined } from '@ant-design/icons';
import { useRouter } from 'next/navigation';
import LandingPageApiService from './../../api-services/api/LandingPageApiService';
import Image from 'next/image';

const SecondaryBlog = (props) => {
  const [blogDetail, setBlogDetail] = useState({
    title: '',
    date: '',
    content: '',
    author: '',
    imgUrl: '',
  });

  const router = useRouter();

  const viewBlog = () => {
    router.push(`blogs/${props.slug}`);
    router.refresh();
  };

  useEffect(() => {
    fetchBlogDetail();
  }, [props]);

  const fetchBlogDetail = async () => {
    let blog = await LandingPageApiService.getBlogSlug(props.slug);
    const { featured_media, author } = blog[0];
    let authorFromAPI = await LandingPageApiService.getAuthor(author);
    let imageUrl = await LandingPageApiService.getImageUrl(featured_media);

    if (blog && authorFromAPI && imageUrl) {
      setBlogDetail({
        title: blog[0].title.rendered,
        date: blog[0].date,
        content: blog[0].content.rendered,
        author: authorFromAPI?.name,
        imgUrl: imageUrl?.source_url,
      });
    }
  };

  const customDiv = (html) => <div dangerouslySetInnerHTML={{ __html: html }}></div>;

  return (
    <Row className="blog-right" gutter={20}>
      <Col span={10}>
        <Image src={blogDetail.imgUrl} alt="avt-blog" width={500} height={210} />
      </Col>
      <Col span={14}>
        <Row>
          <Typography.Text className="blog-title">{blogDetail.title}</Typography.Text>
        </Row>
        <Row>
          <Typography.Text type="secondary" className="blog-info">
            Created by: {blogDetail.author} at {new Date(blogDetail.date).toLocaleDateString('en-GB')}
          </Typography.Text>
        </Row>
        <Row>
          <Typography.Text className="blog-text">{customDiv(blogDetail.content)}</Typography.Text>
        </Row>
        <Row>
          <Button onClick={viewBlog} icon={<ArrowRightOutlined />} className="wrapper__button">
            Explore more
          </Button>
        </Row>
      </Col>
    </Row>
  );
};

export default SecondaryBlog;

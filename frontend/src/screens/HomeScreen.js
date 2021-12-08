import React from "react";
import { Row, Col, Container } from "react-bootstrap";
import Product from "../components/Product";
import BlogPost from "../components/BlogPost";
import PillarCarousel from "../components/PillarCarousel";
import blogs from "../blog";
import products from "../products";

const HomeScreen = () => {
  return (
    <>
      <h1>Top Products</h1>
      <Row className="mb-3">
        {products &&
          products.map((product) => (
            <Col sm={12} md={6} lg={4} xl={3}>
              <Product product={product} />
            </Col>
          ))}
      </Row>

      <Row>
        <h1>Community Writing Blog</h1>
        <Col>
          {blogs &&
            blogs.map((blog) => (
              <Row md={8}>
                <BlogPost blog={blog} />
              </Row>
            ))}
        </Col>

        <Col md={4}>
          <PillarCarousel className="my-3" />
        </Col>
      </Row>
    </>
  );
};

export default HomeScreen;

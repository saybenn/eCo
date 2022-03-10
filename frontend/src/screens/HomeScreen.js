import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Container from "../components/Container";
import Loader from "../components/Loader";
import Message from "../components/Message";
import Product from "../components/Product";
import BlogPost from "../components/BlogPost";
import PillarCarousel from "../components/PillarCarousel";
import { getTopProducts } from "../actions/productActions";
import { topBlogs } from "../actions/blogActions";

const HomeScreen = () => {
  const dispatch = useDispatch();

  const topProducts = useSelector((state) => state.topProducts);
  const { loading, error, products } = topProducts;
  const blogLike = useSelector((state) => state.blogLike);
  const { success: likeSuccess } = blogLike;
  const blogComment = useSelector((state) => state.blogComment);
  const { success: commentSuccess } = blogComment;
  const blogCommentDelete = useSelector((state) => state.blogCommentDelete);
  const { success: deleteCommentSuccess } = blogCommentDelete;
  const blogDeletePost = useSelector((state) => state.blogDeletePost);
  const { success: deleteBlogSuccess } = blogDeletePost;
  const topBlog = useSelector((state) => state.topBlog);
  const { loading: blogLoading, error: blogError, blogs } = topBlog;

  useEffect(() => {
    if (
      likeSuccess ||
      commentSuccess ||
      deleteCommentSuccess ||
      deleteBlogSuccess
    ) {
      dispatch(topBlogs());
    } else {
      dispatch(topBlogs());
      dispatch(getTopProducts());
    }
  }, [
    dispatch,
    likeSuccess,
    deleteBlogSuccess,
    commentSuccess,
    deleteCommentSuccess,
  ]);
  return (
    <>
      <Container>
        <h1 className="mt-3">Top Products</h1>
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant="danger">{error}</Message>
        ) : (
          <>
            <Row className="mb-3">
              {products &&
                products.map((product) => (
                  <Col sm={12} md={6} lg={4} xl={3}>
                    <Product key={product._id} product={product} />
                  </Col>
                ))}
              <Col
                className="d-flex align-items-center home-col"
                sm={12}
                md={6}
                lg={4}
                xl={3}
              >
                <Link to="/shop" className="home-link">
                  <h4>SHOP ALL</h4>
                  <div className="btn btn-dark link-slider">
                    <i className="fas fa-chevron-right fa-7x"></i>
                  </div>
                </Link>
              </Col>
            </Row>
            <h1>Top Blog Posts</h1>
            {blogLoading ? (
              <Loader />
            ) : blogError ? (
              <Message variant="danger">{blogError}</Message>
            ) : (
              <Row>
                <Col>
                  {blogs &&
                    blogs
                      .sort((a, b) => b.numLikes - a.numLikes)
                      .map((blog) => {
                        return <BlogPost key={blog._id} blog={blog} />;
                      })}{" "}
                </Col>

                <Col md={4}>
                  <PillarCarousel className="my-3" />
                </Col>
              </Row>
            )}
          </>
        )}
      </Container>
    </>
  );
};

export default HomeScreen;

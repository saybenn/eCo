import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col, Modal, Button, Form, Image, Toast } from "react-bootstrap";
import BlogPost from "../components/BlogPost";
import FormContainer from "../components/FormContainer";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { listBlogs, createBlogPost } from "../actions/blogActions";

const BlogScreen = () => {
  const [message, setMessage] = useState("false");
  const [toastShow, setToastShow] = useState(false);
  const [postShow, setPostShow] = useState(false);
  const [postBody, setPostBody] = useState("");
  const [postTitle, setPostTitle] = useState("");

  const handlePostClose = () => setPostShow(false);
  const handlePostShow = () => setPostShow(true);

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const blogList = useSelector((state) => state.blogList);
  const { loading, error, blogs } = blogList;

  const createBlog = useSelector((state) => state.createBlog);
  const { success } = createBlog;

  const blogDeletePost = useSelector((state) => state.blogDeletePost);
  const { success: deleteSuccess } = blogDeletePost;

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(listBlogs());
  }, [dispatch, success, deleteSuccess]);

  const submitHandler = (e) => {
    e.preventDefault();
    if (!userInfo.isAuthor) {
      setToastShow(true);
      setMessage(`Must be an author to make a post.`);
      setTimeout(() => {
        setMessage(false);
      }, 5000);
    } else {
      dispatch(createBlogPost(postTitle, postBody));
    }
  };
  return (
    <>
      <Row className="d-flex align-items-center">
        <Col md={10}>
          <h1>Community Writing Blog</h1>{" "}
        </Col>
        <Col>
          <Button variant="outline-dark like-btn" onClick={handlePostShow}>
            Create a Post <i className="fas fa-4x fa-edit"></i>
          </Button>
        </Col>
      </Row>
      <hr
        style={{
          color: "black",
          backgroundColor: "black",
          height: 5,
        }}
      />
      <Modal show={postShow} onHide={handlePostClose}>
        <Modal.Header closeButton>
          <Modal.Title>Leave a Comment</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <FormContainer>
            <Form onSubmit={submitHandler}>
              <Form.Label>Post Title</Form.Label>
              <Form.Group controlId="title">
                <Form.Control
                  value={postTitle}
                  onChange={(e) => setPostTitle(e.target.value)}
                ></Form.Control>
              </Form.Group>
              <Form.Label>Post Body</Form.Label>
              <Form.Group controlId="body">
                <Form.Control
                  value={postBody}
                  onChange={(e) => setPostBody(e.target.value)}
                  as="textarea"
                ></Form.Control>
              </Form.Group>
              <Button
                variant="dark-btn"
                type="submit"
                onClick={handlePostClose}
              >
                Submit Blog Post
              </Button>
            </Form>
          </FormContainer>
        </Modal.Body>
      </Modal>
      {loading && <Loader />}
      {error && <Message variant="danger">{error}</Message>}
      <Toast
        onClose={() => setToastShow(false)}
        show={toastShow}
        delay={5000}
        autohide
      >
        <Toast.Header>{message}</Toast.Header>
      </Toast>
      <Row>
        <Col>
          {blogs &&
            blogs
              .sort((a, b) => Date.parse(b.createdAt) - Date.parse(a.createdAt))
              .map((blog) => {
                return (
                  <Row key={blog._id} md={10}>
                    <Col md={10}>
                      <BlogPost blog={blog} />
                    </Col>
                    {blog.img && (
                      <Col md={2}>
                        <Image
                          fluid
                          rounded
                          src={blog.img}
                          alt={blog.title}
                        ></Image>
                      </Col>
                    )}
                  </Row>
                );
              })}
        </Col>
      </Row>
    </>
  );
};

export default BlogScreen;

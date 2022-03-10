import React, { useState, useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import {
  Row,
  Col,
  Modal,
  Button,
  Form,
  Image,
  Toast,
  Card,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import Container from "../components/Container";
import BlogScreenBlogPosts from "../components/BlogScreenBlogPosts";
import FormContainer from "../components/FormContainer";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { listBlogs, createBlogPost } from "../actions/blogActions";
import Tippy from "@tippy.js/react";
import { requestAuthorship } from "../actions/userActions";
import { BLOG_LIKE_RESET } from "../constants/blogConstants";

const BlogScreen = () => {
  const [message, setMessage] = useState("false");
  const [toastShow, setToastShow] = useState(false);
  const [postShow, setPostShow] = useState(false);
  const [postBody, setPostBody] = useState("");
  const [postTitle, setPostTitle] = useState("");
  const [uploading, setUploading] = useState(false);
  const [image, setImage] = useState("");

  const handlePostClose = () => setPostShow(false);
  const handlePostShow = () => setPostShow(true);

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userAuthor = useSelector((state) => state.userAuthor);
  const { success: authorSuccess } = userAuthor;

  const blogList = useSelector((state) => state.blogList);
  const { loading, error, blogs } = blogList;

  const createBlog = useSelector((state) => state.createBlog);
  const { success } = createBlog;

  const blogDeletePost = useSelector((state) => state.blogDeletePost);
  const { success: deleteSuccess } = blogDeletePost;

  const blogLike = useSelector((state) => state.blogLike);
  const { success: likeSuccess } = blogLike;
  const blogComment = useSelector((state) => state.blogComment);
  const { success: commentSuccess } = blogComment;

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(listBlogs());

    if (authorSuccess) {
      setMessage(`Your request for the author role has been received.`);
      setTimeout(() => {
        setMessage(false);
      }, 5000);
    }
  }, [
    dispatch,
    success,
    deleteSuccess,
    likeSuccess,
    authorSuccess,
    commentSuccess,
  ]);

  const submitHandler = (e) => {
    e.preventDefault();
    if (!userInfo.isAuthor) {
      setToastShow(true);
      setMessage(`Must be an author to make a post.`);
      setTimeout(() => {
        setMessage(false);
      }, 5000);
    } else {
      dispatch(createBlogPost(postTitle, postBody, image));
      setPostBody("");
      setPostTitle("");
    }
  };

  const authorHandler = () => {
    dispatch(requestAuthorship(userInfo._id));
  };

  const uploadFileHandler = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("image", file);
    setUploading(true);

    try {
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };
      const { data } = await axios.post("/api/upload", formData, config);

      setImage(data);
      setUploading(false);
    } catch (error) {
      console.error(error);
      setUploading(false);
    }
  };
  return (
    <>
      <Container>
        <Row className="d-flex justify-content-between">
          <Col md={9} className="d-flex align-items-end">
            <h1>Community Writing Blog</h1>{" "}
            {authorSuccess && <Message variant="info">{message}</Message>}
          </Col>
          <Col md={3} className="d-flex justify-content-end align-items-end">
            {userInfo.isAuthor && (
              <Button variant="" onClick={handlePostShow}>
                Create a Post <i className="fas fa-4x fa-edit"></i>
              </Button>
            )}
            {!userInfo.isAuthor && !userInfo.authorRequest && (
              <Button variant="" onClick={authorHandler}>
                Request Author Role <i className="fas fa-4x fa-edit"></i>
                <Tippy
                  content="The Author role allows users to contribute their own blog post to the community. Requests must be approved by an Administrator."
                  placement="top"
                  arrow={false}
                  delay={300}
                >
                  <i className="fas fa-info-circle mx-1"></i>
                </Tippy>
              </Button>
            )}
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
            <Modal.Title>Create A Post</Modal.Title>
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
                <Form.Group controlId="image">
                  <Form.Label>Image</Form.Label>
                  <Form.Control
                    type="text"
                    value={image}
                    placeholder="Enter image url"
                    onChange={(e) => setImage(e.target.value)}
                  ></Form.Control>
                  <Form.Control
                    id="image-file"
                    label="Choose File"
                    type="file"
                    onChange={uploadFileHandler}
                  ></Form.Control>
                  {uploading && <Loader />}
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
        </Toast>{" "}
        <Card>
          <Row className="mb-3">
            {blogs &&
              blogs
                .sort(
                  (a, b) => Date.parse(b.createdAt) - Date.parse(a.createdAt)
                )
                .map((blog) => {
                  return (
                    <Col key={blog._id} sm={12} md={6} lg={4} xl={4}>
                      <BlogScreenBlogPosts blog={blog} />
                    </Col>
                  );
                })}
          </Row>
        </Card>
      </Container>
    </>
  );
};

export default BlogScreen;

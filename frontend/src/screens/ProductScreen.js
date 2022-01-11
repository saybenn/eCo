import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Image, Row, Col, Card, ListGroup, Form } from "react-bootstrap";
import Rating from "../components/Rating";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { getProductDetails } from "../actions/productActions";
import { addItemToCart } from "../actions/cartActions";
import { ADD_CART_RESET } from "../constants/cartConstants";
const ProductScreen = () => {
  const [options, setOptions] = useState("");
  const [qty, setQty] = useState(1);
  const [message, setMessage] = useState("");
  const { id } = useParams();
  const dispatch = useDispatch();

  const productDetails = useSelector((state) => state.productDetails);
  const { loading, error, product } = productDetails;
  const cartAdd = useSelector((state) => state.cartAdd);
  const { error: cartError, success } = cartAdd;

  useEffect(() => {
    dispatch(getProductDetails(id));

    if (success) {
      setMessage(`${product.name} has been added to your cart.`);
      setTimeout(() => {
        setMessage(false);
      }, 3000);
    }
    if (cartError) {
      setMessage(
        `There was a problem adding ${product.name} to your cart. Try again or check if you are logged in.`
      );
      setTimeout(() => {
        setMessage(false);
        dispatch({ type: ADD_CART_RESET });
      }, 3000);
    }
  }, [dispatch, success, cartError]);

  const addToCartHandler = () => {
    if (product.optionName && !options) {
      setMessage(`Please select ${product.optionName}`);
      setTimeout(() => {
        setMessage(false);
      }, 5000);
    } else {
      dispatch(
        addItemToCart(
          product.name,
          product.price,
          product.image,
          product._id,
          qty,
          options,
          product.optionName
        )
      );
    }
  };
  return (
    <>
      <Link to="/" type="button" className="btn btn-dark my-3">
        Back
      </Link>
      {message && <Message variant="light">{message}</Message>}
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Row className="d-flex ">
          <Col md={4} fluid>
            <Image
              src={product.image}
              alt={product.name}
              className="mb-3"
              fluid
            />
            <Rating
              value={product.rating}
              text={`${product.numReviews} reviews`}
            />
            <h2 className="my-3">Reviews</h2>
            {product.reviews.length === 0 ? (
              <Message variant="info">No Reviews</Message>
            ) : (
              product.reviews.map((review) => (
                <ListGroup.Item key={review._id}>
                  <Row className="justify-space-between">
                    <strong>{review.name}</strong>
                    <Rating value={review.rating} />
                  </Row>
                  <p>{review.createdAt.substring(0, 10)}</p>
                  <p>{review.comment}</p>
                </ListGroup.Item>
              ))
            )}
          </Col>
          <Col md={5}>
            <Card>
              <Card.Body>
                <Card.Title>
                  <h2> {product.name}</h2>
                </Card.Title>
                <Card.Subtitle className="mb-2">${product.price}</Card.Subtitle>
                <Card.Text>{product.description}</Card.Text>
                <Row className="align-items-center my-3">
                  <Col>
                    <Card.Text>
                      <strong>Status:</strong>{" "}
                      {product.countInStock > 0 ? "In Stock" : "Out of Stock"}{" "}
                    </Card.Text>
                  </Col>
                  {product.optionName && (
                    <Col className="d-inline-flex align-items-center">
                      <strong className="mx-1">{`${product.optionName}: `}</strong>

                      <Form.Control
                        value={options}
                        as="select"
                        onChange={(e) => setOptions(e.target.value)}
                      >
                        <option value="caution">Select a Value</option>
                        {product.options.map((o) => (
                          <option key={o++} value={o}>
                            {o}
                          </option>
                        ))}
                      </Form.Control>
                    </Col>
                  )}
                </Row>
                <Row className="align-items-center my-3">
                  <Col className="d-inline-flex align-items-center">
                    <strong>Qty:</strong>
                    <Form.Control
                      as="select"
                      value={qty}
                      onChange={(e) => setQty(e.target.value)}
                    >
                      {[...Array(product.countInStock).keys()].map((x) => (
                        <option key={x + 1} value={x + 1}>
                          {x + 1}
                        </option>
                      ))}
                    </Form.Control>
                  </Col>
                  <Col>
                    <button
                      type="button"
                      className="btn btn-dark"
                      onClick={addToCartHandler}
                      disabled={product.countInStock === 0}
                    >
                      Add To Cart
                    </button>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      )}
    </>
  );
};

export default ProductScreen;

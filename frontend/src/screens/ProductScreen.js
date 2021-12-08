import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useHistory } from "react-router";
import {
  Image,
  Row,
  Col,
  Card,
  Button,
  ListGroup,
  Form,
} from "react-bootstrap";
import Rating from "../components/Rating";
import Message from "../components/Message";
import products from "../products";

const ProductScreen = ({ history }) => {
  const [options, setOptions] = useState("");
  const [qty, setQty] = useState(0);
  const { id } = useParams();
  const product = products.find((p) => p._id === id);

  const addToCartHandler = () => {
    //hey
  };
  return (
    <>
      <Link to="/" type="button" className="btn btn-dark my-3">
        Back
      </Link>
      <Row className="d-flex ">
        <Col md={6} fluid>
          <Image
            src={product.image}
            alt={product.name}
            className="my-3"
            fluid
          />
          <Rating
            value={product.rating}
            text={`${product.numReviews} reviews`}
          />
          <h2 className="my-3">Reviews</h2>
          {product.numReviews === 0 ? (
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
        <Col md={4}>
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
                {product.options && (
                  <Col className="d-inline-flex align-items-center">
                    <strong>{`${product.optionName}:`}</strong>

                    <Form.Control
                      as="select"
                      onChange={(e) => setOptions(e.target.value)}
                    >
                      {Object.entries(product.options).map(([k, v]) => (
                        <option key={k} value={v}>
                          {v}
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
    </>
  );
};

export default ProductScreen;

import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Col, Row, Button, Image, ListGroup, Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { getCart, controlCart } from "../actions/cartActions";

const CartScreen = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const cartGet = useSelector((state) => state.cartGet);
  const { cartItems, loading, error } = cartGet;

  const cartControl = useSelector((state) => state.cartControl);
  const { success } = cartControl;

  useEffect(() => {
    if (!userInfo) {
      navigate("/login");
    }
    dispatch(getCart());
  }, [dispatch, success, userInfo]);

  const checkoutHandler = () => {
    navigate("/shipping");
  };

  return (
    <>
      <h1>Shopping Cart</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : cartItems.length === 0 ? (
        <Message>
          You cart is empty <Link to="/">Go Back</Link>
        </Message>
      ) : (
        <Row>
          <Col md={9}>
            <Card>
              <ListGroup variant="flush">
                {cartItems.map((item) => (
                  <ListGroup.Item key={item._id}>
                    <Row className="d-flex justify-content-between align-items-center">
                      <Col md={2}>
                        <Image
                          src={item.image}
                          alt={item.name}
                          fluid
                          rounded
                          sm={1}
                        />
                      </Col>
                      <Col md={2}>
                        <Link to={`/product/${item.productId}`}>
                          {item.name}
                        </Link>
                      </Col>
                      <Col md={1}>${item.price}</Col>
                      <Col md={1}>
                        <Row className="d-flex justify-content-center align-items-center">
                          <Col md={1}>{item.qty}</Col>

                          <Col md={1}>
                            {" "}
                            <Button
                              variant="link"
                              onClick={() =>
                                dispatch(controlCart(item._id, "up"))
                              }
                            >
                              <i className="fas fa-sort-up"></i>
                            </Button>{" "}
                            <Button
                              variant="link"
                              onClick={() =>
                                dispatch(controlCart(item._id, "down"))
                              }
                            >
                              <i className="fas fa-sort-down"></i>
                            </Button>
                          </Col>
                        </Row>
                      </Col>
                      <Col className="d-flex justify-content-center" md={2}>
                        {item.totalPrice}
                      </Col>
                      <Col md={1}>
                        {" "}
                        <Button
                          onClick={() =>
                            dispatch(controlCart(item._id, "trash"))
                          }
                        >
                          <i className="fas fa-trash-alt"></i>
                        </Button>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                ))}
              </ListGroup>
            </Card>
          </Col>

          <Col md={3}>
            <Card>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <h2>
                    {` Subtotal 
                    ${
                      cartItems &&
                      cartItems.reduce((acc, item) => acc + item.qty, 0)
                    }
                    items`}
                  </h2>
                  $
                  {cartItems &&
                    cartItems
                      .reduce((acc, item) => acc + item.qty * item.price, 0)
                      .toFixed(2)}
                </ListGroup.Item>
                <ListGroup.Item>
                  <Button
                    type="button"
                    className="btn-block"
                    disabled={cartItems && cartItems.length === 0}
                    onClick={checkoutHandler}
                  >
                    Proceed to Checkout
                  </Button>
                </ListGroup.Item>
              </ListGroup>
            </Card>
          </Col>
        </Row>
      )}
    </>
  );
};

export default CartScreen;

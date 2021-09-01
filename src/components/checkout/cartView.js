import React, { useEffect, useState } from 'react';
import {
  Button,
  ButtonToolbar,
  Container,
  Spinner,
  Table,
} from 'react-bootstrap';
import { Link } from 'react-router-dom';

function CartView(props) {
  const [isLoading, setLoading] = useState(true);
  const [cartItems, setCartItems] = useState(null);

  useEffect(async () => {
    let cart = await props.API.getCart();
    setCartItems(cart.items);
    setLoading(false);
  }, [props.API]);
  if (isLoading)
    return (
      <Container fluid className="text-center">
        <Spinner animation="border" role="status" variant="primary">
          <span className="sr-only">Loading...</span>
        </Spinner>
      </Container>
    );
  return (
    <Container fluid>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Artikel</th>
            <th>Wert</th>
            <th>Anzahl</th>
          </tr>
        </thead>
        <tbody>
          {cartItems.map((item) => {
            return (
              <tr key={item.item_id}>
                <td>{item.name}</td>
                <td>{item.price}</td>
                <td>{item.qty}</td>
              </tr>
            );
          })}
        </tbody>
      </Table>
      <Link to="/payment" style={{ textDecoration: 'none' }}>
        <Button variant="primary">Zur Zahlung</Button>
      </Link>
    </Container>
  );
}
export default CartView;

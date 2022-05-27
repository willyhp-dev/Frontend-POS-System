import { faMoneyBill } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Card, Table } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function CartPage() {

  const Thead = () => {
    return (
      <thead>
        <tr>
          <th width="5%">No</th>
          <th>Image</th>
          <th>Nama Product</th>
          <th>Price</th>
          <th>Qty</th>
        </tr>
      </thead>
    );
  };
  const Tbody = () => {
    return (
      <tbody>
        <tr>
          <td>1</td>
          <td>Amanah.png</td>
          <td>Potato</td>
          <td>Rp 20.000</td>
          <td>12</td>
        </tr>
      </tbody>
    );
  };
  return (
    <div>
      <Card className="mt-3">
        <Card.Header className="bg-primary text-white">CART</Card.Header>
        <Card.Body>
          <Table striped bordered hover size="sm" className="w-100">
            <Thead />
            <Tbody />
          </Table>
        </Card.Body>
        <Card.Footer>
          <Link to="/checkout">
            <Button className="float-right btn btn-secondary ">
              <FontAwesomeIcon icon={faMoneyBill} /> CheckOut
            </Button>
          </Link>
        </Card.Footer>
      </Card>
    </div>
  );
}

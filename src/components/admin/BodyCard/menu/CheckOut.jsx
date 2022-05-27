import { faMoneyBill } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Card, Col, Form, FormControl, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./index.css";

export default function CheckoutPage() {
  return (
    <div>
      <Card className="mt-3">
        <Card.Header className="bg-primary text-white"> CHECKOUT</Card.Header>
        <Card.Body>
          <Row>
            <Col sm={3}>
              <b>ALAMAT</b>
            </Col>
            <Col sm={1}>
              <b>:</b>
            </Col>
            <Col sm={8}>Alamat</Col>
          </Row>
          <div className="border mb-2 mt-2"></div>
          <Row>
            <Col sm={3}>
              <b>Sub Total</b>
            </Col>
            <Col sm={1}>
              <b>:</b>
            </Col>
            <Col sm={8}>
              <Row className="borderhigh">
                <Col sm={3}>
                  <b>Nama Product</b>
                </Col>
                <Col sm={3}>
                  <b>Harga Product</b>
                </Col>
                <Col sm={3}>
                  <b>QTY Product</b>
                </Col>
                <Col sm={3}>
                  <b>Jumlah Harga</b>
                </Col>
              </Row>
              <Row className="borderhigh">
                <Col sm={3}>Nama Product</Col>
                <Col sm={3}>Harga Product</Col>
                <Col sm={3}>QTY Product</Col>
                <Col sm={3}>Jumlah Harga</Col>
                <Col sm={3}>Nama Product</Col>
                <Col sm={3}>Harga Product</Col>
                <Col sm={3}>QTY Product</Col>
                <Col sm={3}>Jumlah Harga</Col>
              </Row>
              <Row>
                <Col sm={3}></Col>
                <Col sm={3}></Col>
                <Col sm={3}>
                  <b>SubTotal </b>
                </Col>
                <Col sm={3}>(Jumlah Keseluruhan Harga)</Col>
              </Row>
            </Col>
          </Row>
          <div className="border  mb-2 mt-2"></div>
          <Row>
            <Col sm={3}>
              <b>Ongkir</b>
            </Col>
            <Col sm={1}>
              <b>:</b>
            </Col>
            <Col sm={8}>
              <Form.Control
                size="sm"
                type="number"
                className="w-25"
                placeholder="Small text"
              />
            </Col>
          </Row>
          <div className="border mb-2 mt-2"></div>
          <Row>
            <Col sm={3}>
              <b>TOTAL</b>
            </Col>
            <Col sm={1}>
              <b>:</b>
            </Col>
            <Col sm={8}>Rp 250.000</Col>
          </Row>
        </Card.Body>
        <Card.Footer>
          <Link to="/InvoiceForm">
            <Button className="float-right">
              <FontAwesomeIcon icon={faMoneyBill} /> CheckOut
            </Button>
          </Link>
        </Card.Footer>
      </Card>
    </div>
  );
}

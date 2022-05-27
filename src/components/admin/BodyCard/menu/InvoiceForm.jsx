import { Card, Col, Row } from "react-bootstrap";

export default function InvoiceFormPage() {
  return (
    <div>
      <Card className="mt-3">
        <Card.Header className="bg-success text-white">
          Invoice Document
        </Card.Header>
        <Card.Body>
          <Row>
            <Col sm={3}>
              <b>STATUS</b>
            </Col>
            <Col sm={1}>
              <b>:</b>
            </Col>
            <Col sm={8}></Col>
          </Row>

          <div className="border mt-2 mb-2"></div>
          <Row>
            <Col sm={3}>
              <b>ORDER ID</b>
            </Col>
            <Col sm={1}>
              <b>:</b>
            </Col>
            <Col sm={8}></Col>
          </Row>
          <Row>
            <Col sm={3}>
              <b></b>
            </Col>
            <Col sm={1}>
              <b>:</b>
            </Col>
            <Col sm={8}></Col>
          </Row>

          <div className="border mt-2 mb-2"></div>
          <Row>
            <Col sm={3}>
              <b>Billed to</b>
            </Col>
            <Col sm={1}>
              <b>:</b>
            </Col>
            <Col sm={8}></Col>
          </Row>
          <Row>
            <Col sm={3}>
              <b></b>
            </Col>
            <Col sm={1}>
              <b>:</b>
            </Col>
            <Col sm={8}></Col>
          </Row>

          <div className="border mt-2 mb-2"></div>
          <Row>
            <Col sm={3}>
              <b>Payment to</b>
            </Col>
            <Col sm={1}>
              <b>:</b>
            </Col>
            <Col sm={8}></Col>
          </Row>
          <Row>
            <Col sm={3}>
              <b></b>
            </Col>
            <Col sm={1}>
              <b>:</b>
            </Col>
            <Col sm={8}></Col>
          </Row>

          <div className="border mt-2 mb-2"></div>
        </Card.Body>
        <Card.Footer></Card.Footer>
      </Card>
    </div>
  );
}

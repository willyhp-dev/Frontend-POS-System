import { Card, Col, Row } from "react-bootstrap";

export default function AddressDetail() {
  return (
    <Card className="mt-3">
      <Card.Header className="bg-secondary text-white">
        Detail Address
      </Card.Header>
      <Card.Body>
        <Row>
          <Col sm={2}>Kabupaten</Col>
          <Col sm={1}>:</Col>
          <Col sm={9}></Col>
        </Row>
        <Row>
          <Col sm={2}>Kelurahan</Col>
          <Col sm={1}>:</Col>
          <Col sm={9}></Col>
        </Row>
        <Row>
          <Col sm={2}>Kecamatan</Col>
          <Col sm={1}>:</Col>
          <Col sm={9}></Col>
        </Row>
        <Row>
          <Col sm={2}>Provinsi</Col>
          <Col sm={1}>:</Col>
          <Col sm={9}></Col>
        </Row>
        <Row>
          <Col sm={2}>Alamat Detail</Col>
          <Col sm={1}>:</Col>
          <Col sm={9}></Col>
        </Row>
      </Card.Body>
      <Card.Footer></Card.Footer>
    </Card>
  );
}

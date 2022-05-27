import { faBackspace, faEdit } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Card, Col, Form, Row } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function AddressEdit() {
  return (
    <div>
      <Card className="mt-3">
        <Card.Header className="bg-warning text-white">
          {" "}
          Edit Product
        </Card.Header>
        <Card.Body>
          <Row>
            <Col sm={6}>
              <Form.Group>
                <Form.Label>Kabupaten</Form.Label>
                <Form.Select className="form-control form-sm w-50">
                  <option>Pilih Kabupaten</option>
                </Form.Select>
              </Form.Group>
              <Form.Group>
                <Form.Label>Kelurahan</Form.Label>
                <Form.Select className="form-control form-sm w-50">
                  <option>Pilih Kelurahan</option>
                </Form.Select>
              </Form.Group>
              <Form.Group>
                <Form.Label>Kecamatan</Form.Label>
                <Form.Select className="form-control form-sm w-50">
                  <option>Pilih Kecamatan</option>
                </Form.Select>
              </Form.Group>
              <Form.Group>
                <Form.Label>Provinsi</Form.Label>
                <Form.Select className="form-control form-sm w-50">
                  <option>Pilih Provinsi</option>
                </Form.Select>
              </Form.Group>
            </Col>
            <Col sm={6}>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlTextarea1"
              >
                <Form.Label>Alamat Detail</Form.Label>
                <Form.Control as="textarea" rows={3} />
              </Form.Group>
            </Col>
          </Row>
        </Card.Body>
        <Card.Footer>
          <Link to="/address">
            <Button className="btn btn-secondary btn-sm">
              <FontAwesomeIcon icon={faBackspace} /> Kembali
            </Button>
          </Link>
          <Button className="btn btn-warning btn-sm ml-2">
            <FontAwesomeIcon icon={faEdit} /> Edit
          </Button>
        </Card.Footer>
      </Card>
    </div>
  );
}

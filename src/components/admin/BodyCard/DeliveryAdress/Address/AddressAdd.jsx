import { faBackspace, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Card, Col, Form, Row } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function AddressAdd() {
  return (
    <div>
      <Card className="mt-3">
        <Card.Header className="bg-primary text-white">Address Add</Card.Header>
        <Card.Body>
          <Form>
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
          </Form>
        </Card.Body>
        <Card.Footer>
          <Link to="/address">
            <Button className="btn btn-secondary btn-sm">
              <FontAwesomeIcon icon={faBackspace} /> Kembali
            </Button>
          </Link>
          <Button className="btn btn-primary btn-sm ml-2">
            <FontAwesomeIcon icon={faPlus} /> Add Address
          </Button>
        </Card.Footer>
      </Card>
    </div>
  );
}

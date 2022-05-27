import { faBackspace, faEdit } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Card, Col, Form, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import {
  ArrayForm,
  FormControl,
  Imagefiles,
  categoryarray,
  TagArray,
  TagForm,
} from "./CustomHook";

export default function ProductEdit() {
  return (
    <div>
      <Card className="mt-3">
        <Card.Header className="bg-warning">EDIT PRODUCT</Card.Header>
        <Form>
          <Card.Body>
            <Row>
              <Col sm>
                {ArrayForm.map((form) => (
                  <FormControl
                    key={form.index}
                    name={form.name}
                    placeholder={form.placeholder}
                    label={form.label}
                  />
                ))}
              </Col>
              <Col sm>
                <Imagefiles label="Image Product" />
                <Form.Group as={Row}>
                  <Form.Label column sm="3">
                    Category
                  </Form.Label>
                  <Col sm="10">
                    <Form.Select className="form-control">
                      {categoryarray.map((category) => (
                        <option>{category.name}</option>
                      ))}
                    </Form.Select>
                  </Col>
                </Form.Group>
                <Form.Group as={Row}>
                  <Form.Label column sm="3">
                    Tag
                  </Form.Label>

                  <Col sm="10">
                    <Row>
                      {TagArray.map((tag) => (
                        <TagForm name={tag.name} />
                      ))}
                    </Row>
                  </Col>
                </Form.Group>
              </Col>
            </Row>
          </Card.Body>
        </Form>
        <Card.Footer>
          <Button className="btn btn-warning btn-sm">
            <FontAwesomeIcon icon={faEdit} /> Update
          </Button>
          <Link to="/product">
            <Button className="btn btn-secondary btn-sm ml-2">
              <FontAwesomeIcon icon={faBackspace} /> Kembali
            </Button>
          </Link>
        </Card.Footer>
      </Card>
    </div>
  );
}

import { faBackspace, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Card, Col, Form, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { TagArray, TagForm, Imagefiles, categoryarray, FormControl, ArrayForm } from "./CustomHook";
export default function ProductAdd() {
 

  return (
    <div>
      <Card className="mt-3">
        <Card.Header className="bg-primary text-white">ADD PRODUCT</Card.Header>
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
          <Card.Footer>
            <Button className =" btn btn-sm">
              <FontAwesomeIcon icon={faPlus} /> Add
            </Button>
            <Link to="/product">
              <Button className="ml-2 btn btn-secondary btn-sm">
                <FontAwesomeIcon icon={faBackspace} /> Kembali
              </Button>
            </Link>
          </Card.Footer>
        </Form>
      </Card>
    </div>
  );
}

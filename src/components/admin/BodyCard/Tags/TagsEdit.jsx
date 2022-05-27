import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Col, Form, FormControl, Row } from "react-bootstrap";

export default function TagEdit() {
  return (
    <div>
      <Form>
        <Row>
          <Col sm>
            {" "}
            <FormControl placeholder="Example : Bread" />
          </Col>
          <Col sm>
            <Button className="btn btn-warning btn-sm">
              <FontAwesomeIcon icon={faEdit} /> Edit
            </Button>
          </Col>
        </Row>
      </Form>
    </div>
  );
}

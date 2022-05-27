import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { Button, Col, Form, FormControl, Row } from "react-bootstrap";

export default function TagAdd() {
  return (
    <div>
      <Form>
        <Row>
          <Col sm>
            {" "}
            <FormControl placeholder="Example : Bread" />
          </Col>
          <Col sm>
            <Button className="btn btn-sm">
              <FontAwesomeIcon icon={faPlus} /> Add
            </Button>
          </Col>

          {/* <div className="float-right">
              <FormControl  placeholder="Search Tag..." />
            </div> */}
        </Row>
      </Form>
    </div>
  );
}

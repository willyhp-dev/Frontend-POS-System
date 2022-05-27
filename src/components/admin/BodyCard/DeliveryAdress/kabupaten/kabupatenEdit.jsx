import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Col, Form, FormControl, Row } from "react-bootstrap";

export default function KabupatenEdit() {
  return (
    <div>
      <Form>
        <Row>
          <Col sm>
            {" "}
            <FormControl placeholder="Example : Utama" />
          </Col>
          <Col sm>
            <Button className="btn btn-sm btn-warning">
              <FontAwesomeIcon icon={faEdit} /> Update
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

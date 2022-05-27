import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Col, FormControl, Row } from "react-bootstrap";

export default function ProvinsiEdit() {
  return (
    <div>
      <Row>
        <Col sm>
          {" "}
          <FormControl placeholder="Example : Pontianak" />
        </Col>
        <Col sm>
          <Button className="btn btn-sm btn-warning">
            <FontAwesomeIcon icon={faEdit} /> Update
          </Button>
        </Col>
      </Row>
    </div>
  );
}

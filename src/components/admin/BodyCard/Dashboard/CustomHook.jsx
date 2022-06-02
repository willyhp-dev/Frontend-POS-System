import {
  faRightLong,
 
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { Card, Col, Row } from "react-bootstrap";




const CardDashboard = ({ key, variant, number, name, icon }) => {
  return (
      <Col sm={3} key={key}>
      <Card bg={variant} className="text-white shadow mb-3 ">
        <Row className="pt-2 pl-5">
          <Col className="mt-1">
            <h3>{number}</h3>
            <div className="mb-2">{name}</div>
          </Col>
          <Col>
            <div className="mt-2 pt-1"></div>
            <FontAwesomeIcon icon={icon} fontSize={45} />
          </Col>
        </Row>
        <Card.Footer className="p-0 m-0">
          <center>
            More Info <FontAwesomeIcon icon={faRightLong} fontSize={20} />
          </center>
        </Card.Footer>
      </Card>
    </Col>
  );
};
export {  CardDashboard };

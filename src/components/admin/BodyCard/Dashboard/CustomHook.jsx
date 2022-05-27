import {
  faRightLong,
  faShop,
  faTags,
  faUser,
  faWarehouse,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Card, Col, Row } from "react-bootstrap";

const DataPage = [
  {
    index: 1,
    variant: "primary",
    number: 100,
    name: "product",
    icon: faWarehouse,
  },
  { index: 2, variant: "danger", number: 100, name: "Tag", icon: faTags },
  {
    index: 3,
    variant: "success",
    number: 100,
    name: "Category",
    icon: faShop,
  },
  { index: 4, variant: "secondary", number: 100, name: "User", icon: faUser },
  { index: 5, variant: "secondary", number: 100, name: "Invoices", icon: faUser },
];
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
export { DataPage, CardDashboard };

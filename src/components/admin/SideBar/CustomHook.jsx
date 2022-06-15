import {
  faAddressBook,
  faBowlFood,
  faDashboard,
  faFileInvoice,
  faShop,
  faTags,
  faWarehouse,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";

const SubBar = [
  { index: 6, name: "Menu", icon: faBowlFood, link: "/" },
  { index: 7, name: "Invoice", icon: faFileInvoice, link: "/Invoice" },
];
const SubQuestBar = [
  { index: 2, name: "Menu", icon: faBowlFood, link: "/menu" },
];
const subBarAdmin = [
  { index: 1, name: "Dashboard", icon: faDashboard, link: "/" },
  { index: 2, name: "Product", icon: faWarehouse, link: "/product" },
  { index: 3, name: "Tag", icon: faTags, link: "/tag" },
  { index: 4, name: "Category", icon: faShop, link: "/category" },
  { index: 5, name: "DeliveryAddress", icon: faAddressBook, link: "/address" },
  { index: 7, name: "Invoice", icon: faFileInvoice, link: "/Invoice" },
]

const SubSizeBar = ({ icon, name, link }) => {
  return (
    <Link to={link} element="">
      <Button
        variant="primary"
        className="btn rounded-0 w-100"
      >
        <Row>
          <Col sm={1} className="marginIcon">
            <FontAwesomeIcon icon={icon} fontSize={20} />
          </Col>
          <Col sm={10}>{name}</Col>
        </Row>
      </Button>
    </Link>
  );
};

export { SubSizeBar, SubBar, SubQuestBar,subBarAdmin };

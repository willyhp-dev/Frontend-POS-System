import "bootstrap/dist/css/bootstrap.min.css";
import { Card, Col, FormControl, Pagination, Row, Table } from "react-bootstrap";
import { ArrayLink, Links, Thead, Tbody } from "./CustomHooks";

import 'bootstrap/dist/css/bootstrap.min.css';
export default function AddressPage() {
  let active = 1;
  let items = [];
  for (let number = 1; number <= 5; number++) {
    items.push(
      <Pagination.Item key={number} active={number === active}>
        {number}
      </Pagination.Item>
    );
  }
  return (
    <div>
      <Card className="mt-3">
        <Card.Header>
          <Row>
            <Col sm={6}>
              {ArrayLink.map((link) => (
                <Links
                  key={link.key}
                  variant={link.variant}
                  name={link.name}
                  link={link.link}
                  icon={link.icon}
                />
              ))}
            </Col>
            <Col sm={6}>
              <FormControl
                className="w-50 float-right"
                placeholder="Search Address"
              />
            </Col>
          </Row>
        </Card.Header>
        <Card.Body>
          <Table striped bordered hover size="sm">
            <Thead />
            <Tbody />
          </Table>
          <Pagination className="float-right" size="sm">
            {items}
          </Pagination>
        </Card.Body>
        <Card.Footer></Card.Footer>
      </Card>
    </div>
  );
}

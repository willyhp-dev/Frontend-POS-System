import "bootstrap/dist/css/bootstrap.min.css";
import { Card, Col, FormControl, Row, Table } from "react-bootstrap";
import { ArrayLink, Links, Thead, Tbody } from "./CustomHooks";

import 'bootstrap/dist/css/bootstrap.min.css';
export default function AddressPage() {
 
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
          <Table striped  hover size="sm">
            <Thead />
            <Tbody />
          </Table>
        
        </Card.Body>
        <Card.Footer></Card.Footer>
      </Card>
    </div>
  );
}

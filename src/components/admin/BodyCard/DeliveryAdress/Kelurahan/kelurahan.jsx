import {
  faBackspace,
  faEdit,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import {
  Button,
  Card,
  Col,
  FormControl,
  Pagination,
  Row,
  Table,
} from "react-bootstrap";
import { Link } from "react-router-dom";

import KelurahanAdd from "./kelurahanAdd";
import KelurahanEdit from "./kelurahanEdit";

export default function KeluarahanPage() {
  let active = 1;
  let items = [];
  for (let number = 1; number <= 5; number++) {
    items.push(
      <Pagination.Item key={number} active={number === active}>
        {number}
      </Pagination.Item>
    );
  }
  const [open, setopen] = useState();
  const Thead = () => {
    return (
      <thead>
        <tr>
          <th width="5%">No</th>
          <th>Nama Kelurahan</th>
          <th width="15%">Action</th>
        </tr>
      </thead>
    );
  };
  const Tbody = () => {
    return (
      <tbody>
        <tr>
          <td>1</td>
          <td>Pontianak</td>
          <td>
            <Button
              className="btn btn-warning btn-sm mr-2"
              onClick={() => setopen(!open)}
            >
              <FontAwesomeIcon icon={faEdit} />
            </Button>
            <Button className="btn btn-danger btn-sm">
              <FontAwesomeIcon icon={faTrash} />
            </Button>
          </td>
        </tr>
      </tbody>
    );
  };
  return (
    <div>
      <Card className="mt-3">
        <Card.Header className="bg-secondary text-white">
          <Row>
            <Col sm={8}>{open ? <KelurahanAdd /> : <KelurahanEdit />}</Col>
            <Col sm={4}>
              <FormControl placeholder="Search Kecamatan...." />
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
        <Card.Footer>
          <Link to="/address">
            <Button className="btn btn-secondary btn-sm">
              <FontAwesomeIcon icon={faBackspace} /> Kembali
            </Button>
          </Link>
        </Card.Footer>
      </Card>
    </div>
  );
}

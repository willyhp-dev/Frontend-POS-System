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
import KecamatanAdd from "./kecamatanAdd";
import KecamatanEdit from "./kecamatanEdit";

export default function KecamatanPage() {
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
          <th>No</th>
          <th>Nama Kecamatan</th>
          <th>Action</th>
        </tr>
      </thead>
    );
  };
  const Tbody = () => {
    return (
      <tbody>
        <tr>
          <td width="5%">1</td>
          <td>Nama Kecamatan</td>
          <td width="15%">
            {" "}
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
      {" "}
      <Card className="mt-3">
        <Card.Header className="bg-secondary text-white">
          <Row>
            <Col sm={8}>{open ? <KecamatanAdd /> : <KecamatanEdit />}</Col>
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

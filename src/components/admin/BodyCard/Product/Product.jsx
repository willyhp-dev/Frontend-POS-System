import { faEdit, faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  Button,
  Card,
  Col,
  Form,
  Pagination,
  Row,
  Table,
} from "react-bootstrap";
import { Link } from "react-router-dom";

export default function ProductPage() {
  let active = 1;
  let items = [];
  for (let number = 1; number <= 5; number++) {
    items.push(
      <Pagination.Item key={number} active={number === active}>
        {number}
      </Pagination.Item>
    );
  }
  const Thead = () => {
    return (
      <tr>
        <th>No</th>
        <th>Nama Product</th>
        <th>Harga Product</th>
        <th>Description</th>
        <th>Image Product</th>
        <th>Category</th>
        <th>Tag</th>
        <th>Action</th>
      </tr>
    );
  };
  const Tbody = () => {
    return (
      <tr>
        <td width="5%">1</td>
        <td>Nama Product</td>
        <td>Harga Product</td>
        <td>Penjelasan</td>
        <td>Description</td>
        <td>Category</td>
        <td>Tag</td>
        <td width="10%">
          <Link to="/product/edit/:id">
            <Button className="btn btn-warning btn-sm mr-1">
              <FontAwesomeIcon icon={faEdit} />
            </Button>
          </Link>
          <Link to="/product/delete/:id">
            <Button className="btn btn-danger btn-sm  ml-1">
              <FontAwesomeIcon icon={faTrash} />
            </Button>
          </Link>
        </td>
      </tr>
    );
  };
  return (
    <div>
      <Card className="mt-3">
        <Card.Header>
          <Row>
            <Col sm={2}>
              <Link to="/product/store">
                <Button variant="primary" className ="btn btn-sm">
                  <FontAwesomeIcon icon={faPlus} /> Add
                </Button>
              </Link>
            </Col>
            <Col sm>
              <div className="float-right">
                <Form.Control placeholder="Search Product...."></Form.Control>
              </div>
            </Col>
          </Row>
        </Card.Header>
        <Card.Body>
          <Table striped bordered hover size="sm">
            <thead>
              <Thead />
            </thead>
            <tbody>
              <Tbody />
            </tbody>
          </Table>
          <Pagination className ="float-right" size="sm">{ items}</Pagination>
        </Card.Body>
      </Card>
    </div>
  );
}

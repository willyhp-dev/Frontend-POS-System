import { faEdit, faEye } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { Button, Card, Col, Modal, Row, Spinner, Table } from "react-bootstrap";
import swal from "sweetalert";

export default function InvoicePage() {
  const [loading, setloading] = useState(false);
  const currentUser = JSON.parse(localStorage.getItem("user"));
  const [status, setstatus] = useState();
  const [Invoice, setInvoice] = useState([]);
  const [id, setid] = useState();

  const [show, setShow] = useState(false);
  const [showUpdate, setShowUpdate] = useState(false);

  const [currentPage, setcurrentPage] = useState(1);
  const [itemPerPage] = useState(5);
  let items = [];
  for (
    let number = 1;
    number <= Math.ceil(Invoice.length / itemPerPage);
    number++
  ) {
    items.push(number);
  }
  const handleClick = (event) => {
    setcurrentPage(Number(event.target.id));
  };
  const indexofLastItem = currentPage * itemPerPage;
  const indexofFirstItem = indexofLastItem - itemPerPage;
  const currentItem = Invoice.slice(indexofFirstItem, indexofLastItem);
  const paginations = items.map((numbers) => (
    <li
      className={`btn btn-outline-primary btn-sm mr-1 ${
        currentPage === numbers ? "active" : null
      } `}
      key={numbers}
      id={numbers}
      onClick={handleClick}
    >
      {numbers}
    </li>
  ));

  let total = 0;
  Invoice.forEach((items, index) => {
    const hasil = items.order_items[index].price * items.order_items[index].qty;
    total += hasil;
  });

  const AxiosInvoice = useCallback(async (value) => {
    try {
      if (value === undefined) {
        value = "";
      }
      setloading(true);
      const currentUser = JSON.parse(localStorage.getItem("user"));
      const url = `${process.env.REACT_APP_SERVER_API}/api/orders?search=${value}`;
      let response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${currentUser.token}`,
        },
      });
      console.log(response.data.data);
      setInvoice(response.data.data);
      setloading(false);
    } catch (error) {
      setloading(false);
      swal("error", error.message, "error");
    }
  }, []);
  useEffect(() => {
    AxiosInvoice();
  }, [AxiosInvoice]);

  const ModalUpdate = (id) => {
    setid(id);
    setShowUpdate(true);
  };

  const AxiosUpdate = async (e) => {
    e.preventDefault();
    try {
      setShowUpdate(true);
      setloading(true);
      const url = `${process.env.REACT_APP_SERVER_API}/api/orders/update/${id}`;
      await axios
        .patch(
          url,
          { status: status },
          {
            headers: {
              Authorization: `Bearer ${currentUser.token}`,
            },
          }
        )
        .then(() => AxiosInvoice());
      swal("Success", "Congrate Updated Invoice Data", "success");
      setShowUpdate(false);
    } catch (error) {
      swal("Error", error.message, "error");
      setloading(false);
    }
  };

  const Thead = () => {
    return (
      <thead>
        <tr>
          <th width="5%">No</th>
          <th width="10%">Order ID</th>
          <th>Total Harga</th>
          <th>Status</th>
          <th width="15%">Action</th>
        </tr>
      </thead>
    );
  };
  const Tbody = () => {
    return loading ? (
      <tr>
        <td colSpan={5}>
          <Button className="btn btn-secondary w-100" disabled>
            <Spinner
              as="span"
              animation="grow"
              size="sm"
              role="status"
              aria-hidden="true"
            />
            Loading...
          </Button>
        </td>
      </tr>
    ) : currentItem.length === 0 ? (
      <tr>
        <td colSpan={5}>
          <div className="alert alert-danger">
            Data Empty / Data Not Response
          </div>
        </td>
      </tr>
    ) : (
      currentItem.map((items, index) => (
        <tr>
          <td>{(index += 1)}</td>
          <td>{items.order_number}</td>
          <td>{ items.items_count + items.delivery_fee}</td>
          <td>{items.status}</td>
          <td width="15%">
            <Button
              onClick={() => ModalUpdate(items._id)}
              className=" btn btn-sm btn-outline-warning btn-light ml-1"
            >
              <FontAwesomeIcon icon={faEdit} />
            </Button>
            <Button
              onClick={() => setShow(true)}
              className="btn btn-sm btn-outline-secondary btn-light ml-1"
            >
              <FontAwesomeIcon icon={faEye} />
            </Button>

            <Modal show={show} animation={false} size="lg" onHide={!show}>
              <Modal.Header closeButton>
                <Modal.Title>Order Detail</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Row>
                  <Col sm={2}>Provinsi</Col>
                  <Col sm={1}>:</Col>
                  <Col sm>{items.delivery_address.provinsi}</Col>
                </Row>
                <Row>
                  <Col sm={2}>Kelurahan</Col>
                  <Col sm={1}>:</Col>
                  <Col sm>{items.delivery_address.kelurahan}</Col>
                </Row>
                <Row>
                  <Col sm={2}>Kecamatan</Col>
                  <Col sm={1}>:</Col>
                  <Col sm>{items.delivery_address.kecamatan}</Col>
                </Row>
                <Row>
                  <Col sm={2}>Kabupaten</Col>
                  <Col sm={1}>:</Col>
                  <Col sm>{items.delivery_address.kabupaten}</Col>
                </Row>
                <Row>
                  <Col sm={2}>Detail</Col>
                  <Col sm={1}>:</Col>
                  <Col sm>{items.delivery_address.detail}</Col>
                </Row>
                <br />
                <Table striped bordered hover size="sm">
                  <thead>
                    <th>No</th>
                    <th>Nama Product</th>
                    <th>Harga Satuan</th>
                    <th>Qty</th>
                    <th>SubTotal</th>
                  </thead>
                  <tbody>
                    {items.order_items.map((order, indez) => (
                      <tr>
                        <td>{(indez = +1)}</td>
                        <td>{order.name}</td>
                        <td>{order.price}</td>
                        <td>{order.qty}</td>
                        <td>{order.price}</td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={() => setShow(false)}>
                  Close
                </Button>
              </Modal.Footer>
            </Modal>

            <Modal show={showUpdate} animation={false} onHide={!showUpdate}>
              <Modal.Header closeButton>
                <Modal.Title>Update Status</Modal.Title>
              </Modal.Header>
              <form onSubmit={AxiosUpdate}>
                <Modal.Body>
                  <select
                    onChange={(e) => setstatus(e.target.value)}
                    value={status}
                    className="form-control w-100"
                  >
                    <option>{items.status}</option>
                    <option>processing</option>
                    <option>In Delivering</option>
                    <option>Delivered</option>
                  </select>
                </Modal.Body>
                <Modal.Footer>
                  <Button type="submit" className="btn btn-warning">
                    <FontAwesomeIcon icon={faEdit} /> Update
                  </Button>
                  <Button
                    variant="secondary"
                    onClick={() => setShowUpdate(false)}
                  >
                    Close
                  </Button>
                </Modal.Footer>
              </form>
            </Modal>
          </td>
        </tr>
      ))
    );
  };
  return (
    <div>
      <Card className="mt-3">
        <Card.Header className="bg-success text-white">
          <Row>
            <Col sm> Invoice</Col>
            <Col sm>
              <div className="float-right">
                <select
                  className="form-control"
                  onChange={(e) => AxiosInvoice(e.target.value)}
                >
                  <option value ="">---Search Status Order---</option>
                  <option>waiting payment</option>
                  <option>processing</option>
                  <option>in delivery</option>
                  <option>delivered</option>
                </select>
              </div>
            </Col>
          </Row>
        </Card.Header>
        <Card.Body>
          <Table striped bordered hover size="sm">
            <Thead />
            <Tbody />
          </Table>
          <ul className="float-right">{paginations}</ul>
        </Card.Body>
        <Card.Footer></Card.Footer>
      </Card>
    </div>
  );
}

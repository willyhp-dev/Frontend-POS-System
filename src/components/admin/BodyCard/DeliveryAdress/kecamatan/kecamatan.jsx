import {
  faBackspace,
  faEdit,
  faPlus,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import {
  Button,
  Card,
  Col,
  FormControl,
  Row,
  Spinner,
  Table,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import swal from "sweetalert";

export default function KecamatanPage() {
  const [open, setopen] = useState();
  const [loading, setloading] = useState();
  const [kecamatan, setkecamatan] = useState([]);
  const [currentPage, setcurrentPage] = useState(1);
  const [itemPerPage] = useState(5);

  let items = [];
  for (
    let number = 1;
    number <= Math.ceil(kecamatan.length / itemPerPage);
    number++
  ) {
    items.push(number);
  }

  const handleClick = (event) => {
    setcurrentPage(Number(event.target.id));
  };

  const indexofLastItem = currentPage * itemPerPage;
  const indexofFirstItem = indexofLastItem - itemPerPage;
  const currentItem = kecamatan.slice(indexofFirstItem, indexofLastItem);
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

  const AxiosData = useCallback(async (value) => {
    try {
      if (value == null) {
        value = "";
      }
      const currentUser = JSON.parse(localStorage.getItem("user"));
      setloading(true);
      const url = `http://localhost:4000/api/kecamatan?search=${value}`;
      const response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${currentUser.token}`,
        },
      });
      setkecamatan(response.data.data);
      setloading(false);
    } catch (error) {
      swal("Error", error.message, "error");
    }
  }, []);
  useEffect(() => {
    AxiosData();
  }, [AxiosData]);

  const AxiosDelete = (id) => {
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this Data!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then(async (willDelete) => {
      if (willDelete) {
        try {
          setloading(true);
          const currentUser = JSON.parse(localStorage.getItem("user"));
          const url = `http://localhost:4000/api/kecamatan/delete/${id}`;
          await axios
            .delete(url, {
              headers: {
                Authorization: `Bearer ${currentUser.token}`,
              },
            })
            .then(AxiosData());
          setloading(false);
          swal("Success", "Congrate You Deleted Kecamatan Data", "success");
        } catch (error) {
          setloading(false);
          swal("Error", error.message, "error");
        }
      } else {
        swal("Your Data is safe!");
      }
    });
  };

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
        {loading ? (
          <tr>
            <td colSpan={3}>
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
            <td colSpan={3}>
              <div className="alert alert-danger">
                <center>Data Empty / Data Not Response</center>
              </div>
            </td>
          </tr>
        ) : (
          currentItem.map((item, index) => (
            <tr>
              <td width="5%">{(index += 1)}</td>
              <td>{item.name}</td>
              <td width="15%">
                {" "}
                <Link to={`/address/kecamatan/update/${item._id}`}>
                  <Button className="btn btn-warning btn-sm mr-2">
                    <FontAwesomeIcon icon={faEdit} />
                  </Button>
                </Link>
                <Button
                  className="btn btn-danger btn-sm"
                  onClick={() => AxiosDelete(item._id)}
                >
                  <FontAwesomeIcon icon={faTrash} />
                </Button>
              </td>
            </tr>
          ))
        )}
      </tbody>
    );
  };
  return (
    <div>
      {" "}
      <Card className="mt-3">
        <Card.Header className="bg-secondary text-white">
          <Row>
            <Col sm={8}>
              <Link to="/address/kecamatan/store">
                <Button className="btn btn-primary btn-sm">
                  <FontAwesomeIcon icon={faPlus} /> Add
                </Button>
              </Link>
            </Col>
            <Col sm={4}>
              <FormControl
                placeholder="Search Kecamatan...."
                onChange={(e) => AxiosData(e.target.value)}
              />
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

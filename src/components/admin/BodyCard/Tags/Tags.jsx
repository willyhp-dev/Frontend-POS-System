import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
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
import TagAdd from "./TagAdd";

export default function TagPage() {
  const [tags, settags] = useState([]);
  const [loading, setloading] = useState(false);

  const [currentPage, setcurrentPage] = useState(1);
  const [itemPerPage] = useState(5);
  const indexofLastItem = currentPage * itemPerPage;
  const indexofFirstItem = indexofLastItem - itemPerPage;
  const currentItem = tags.slice(indexofFirstItem, indexofLastItem);
  let items = [];
  for (
    let number = 1;
    number <= Math.ceil(tags.length / itemPerPage);
    number++
  ) {
    items.push(number);
  }
  const handleClick = (event) => {
    setcurrentPage(Number(event.target.id));
  };
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
  const AxiosDelete = (id) => {
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this imaginary file!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then(async (willDelete) => {
      if (willDelete) {
        try {
          setloading(true);
          const currentUser = JSON.parse(localStorage.getItem("user"));
          const url = `http://localhost:4000/api/tag/${id}`;
          await axios.delete(url, {
            headers: {
              Authorization: ` Bearer ${currentUser}`,
            },
          });
          setloading(false);
          swal("Congrate you deleted Tag Data", {
            icon: "success",
          });
        } catch (error) {
          setloading(false);
          swal("Error", error.message, "error");
        }
      } else {
        swal("Your imaginary file is safe!");
      }
    });
  };
  const AxiosData = useCallback(async (value) => {
    try {
      setloading(true);
      if (value == null) {
        value = "";
      }
      const currentUser = JSON.parse(localStorage.getItem("user"));
      const url = `http://localhost:4000/api/tag?search=${value}`;
      const response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${currentUser.token}`,
        },
      });
      setloading(false);
      setTimeout(2000);
      settags(response.data);
    } catch (error) {
      setloading(false);
      console.log(error);
    }
  }, []);
  useEffect(() => {
    AxiosData();
  }, [AxiosData]);

  const Thead = () => {
    return (
      <thead>
        <tr>
          <th width="5%">No</th>
          <th>Name Tag</th>
          <th width="15%">Action</th>
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
              <td>{(index += 1)}</td>
              <td>{item.name}</td>
              <td>
                <Link to={`/tag/edit/${item._id}`}>
                  <Button className="btn btn-warning btn-sm">
                    <FontAwesomeIcon icon={faEdit} />
                  </Button>
                </Link>
                <Button
                  onClick={() => AxiosDelete(item._id)}
                  className="btn btn-danger btn-sm ml-2"
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
      <Card className="mt-3">
        <Card.Header>
          <Row>
            <Col sm>
              {" "}
              <TagAdd />
            </Col>
            <Col sm>
              <div className="float-right">
                <FormControl
                  placeholder="Search Tag..."
                  onChange={(e) => AxiosData(e.target.value)}
                />
              </div>
            </Col>
          </Row>
        </Card.Header>
        <Card.Body>
          <Table striped bordered hover>
            <Thead />
            <Tbody />
          </Table>
          <ul className="float-right">{paginations}</ul>
        </Card.Body>
      </Card>
    </div>
  );
}

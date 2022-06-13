import {
  faEdit,
  faEye,
  faPlus,
  faShop,
  faTags,
  faToggleOff,
  faToggleOn,
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
import { Thead } from "./CustomHook";

export default function ProductPage() {
  const [product, setproduct] = useState([]);
  const [loading, setloading] = useState(false);
  const [currentPage, setcurrentPage] = useState(1);
  const [itemPerPage] = useState(5);
  let items = [];
  for (
    let number = 1;
    number <= Math.ceil(product.length / itemPerPage);
    number++
  ) {
    items.push(number);
  }
  const handleClick = (event) => {
    setcurrentPage(Number(event.target.id));
  };
  const indexofLastItem = currentPage * itemPerPage;
  const indexofFirstItem = indexofLastItem - itemPerPage;
  const currentItem = product.slice(indexofFirstItem, indexofLastItem);
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
      setloading(true);
      const currentUser = JSON.parse(localStorage.getItem("user"));
      const url = `${process.env.REACT_APP_SERVER_API}/api/products?q=${value}`;
      let response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${currentUser.token}`,
        },
      });
      setproduct(response.data.data);
      setloading(false);
    } catch (error) {
      setloading(false);
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
          const url = `${process.env.REACT_APP_SERVER_API}/api/products/delete/${id}`;
          await axios
            .delete(url, {
              headers: {
                Authorization: `Bearer ${currentUser.token}`,
              },
            })
            .then(() => AxiosData());
          setloading(false);
          swal("Success", "Congrate Deleted Product Data", "success");
        } catch (error) {
          setloading(false);
          swal("Error", error.message, "error");        }
      } else {
        swal("Your Data is safe!");
      }
    });
  };

  const AxiosPublic = async (id) => {
    try {
      setloading(true);
      const url = `${process.env.REACT_APP_SERVER_API}/api/products/public/${id}`;
      const currentUser = JSON.parse(localStorage.getItem("user"));
      await axios
        .patch(
          url,
          { public: "" },
          {
            headers: {
              Authorization: `Bearer ${currentUser.token}`,
            },
          }
        )
        .then(() => AxiosData());
      setloading(false);
      swal("Success", "Congrate Public Product Data", "success");
    } catch (error) {
      setloading(false);
      swal("Error", error.message, "error");
    }
  };

  const Tbody = () => {
    return loading ? (
      <tr>
        <td colSpan={6}>
          <Button
            className="btn btn-secondary w-100"
            variant="primary"
            disabled
          >
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
        <td colSpan={6}>
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
          <td>{item.price}</td>
          <td>{item.description}</td>
          <td>
            <img
              src={`${process.env.REACT_APP_SERVER_API}/images/products/${item.image_url}`}
              width="100px"
              height="100px"
              alt=""
            ></img>
          </td>
          <td width="10%">
            <Link to={`/product/edit/${item._id}`}>
              <Button className="btn btn-warning btn-sm mr-1">
                <FontAwesomeIcon icon={faEdit} />
              </Button>
            </Link>
            <Button
              className="btn btn-danger btn-sm  ml-1"
              onClick={() => AxiosDelete(item._id)}
            >
              <FontAwesomeIcon icon={faTrash} />
            </Button>
            <Link to={`/product/detail/${item._id}`}>
              <Button className="btn btn-secondary btn-sm mt-1 mr-1 ">
                <FontAwesomeIcon icon={faEye} /> 
              </Button>
            </Link>
            {item.public === "Not Public" ? (
              <Button
                className="btn btn-danger btn-sm mt-1"
                onClick={() => AxiosPublic(item._id)}
              >
                <FontAwesomeIcon icon={faToggleOff} />
              </Button>
            ) : (
              
              <Button className="btn btn-primary btn-sm mt-1">
                <FontAwesomeIcon icon={faToggleOn} />
              </Button>
            )}
            <Link to={`/product/tag/${item._id}`}>
              <Button className="btn btn-secondary btn-sm mt-1">
                <FontAwesomeIcon icon={faTags} />
              </Button>
            </Link>
            <Link to={`/product/category/${item._id}`}>
              <Button className="btn btn-secondary btn-sm mt-1 ml-1">
              <FontAwesomeIcon icon={faShop} />
            </Button>
            </Link>
            
          </td>
        </tr>
      ))
    );
  };
  return (
    <div>
      <Card className="mt-3">
        <Card.Header>
          <Row>
            <Col sm={2}>
              <Link to="/product/store">
                <Button variant="primary" className="btn btn-sm">
                  <FontAwesomeIcon icon={faPlus} /> Add
                </Button>
              </Link>
            </Col>
            <Col sm>
              <div className="float-right">
                <FormControl
                  placeholder="Search Product...."
                  onChange={(e) => AxiosData(e.target.value)}
                />
              </div>
            </Col>
          </Row>
        </Card.Header>
        <Card.Body>
          <Table striped bordered hover size="sm">
            <Thead />

            <tbody>
              <Tbody />
            </tbody>
          </Table>
          <ul className="float-right">{paginations}</ul>
        </Card.Body>
      </Card>
    </div>
  );
}

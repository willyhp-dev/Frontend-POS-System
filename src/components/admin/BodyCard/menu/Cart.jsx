import {
  faBackspace,
  faMoneyBill,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { Button, Card, Spinner, Table } from "react-bootstrap";

import { Link } from "react-router-dom";
import swal from "sweetalert";

export default function CartPage() {
  const [cart, setcart] = useState([]);
  const [loading, setloading] = useState(false);
  const [currentPage, setcurrentPage] = useState(1);
  const [itemPerPage] = useState(5);
  let items = [];
  for (
    let number = 1;
    number <= Math.ceil(cart.length / itemPerPage);
    number++
  ) {
    items.push(number);
  }
  const handleClick = (event) => {
    setcurrentPage(Number(event.target.id));
  };
  const indexofLastItem = currentPage * itemPerPage;
  const indexofFirstItem = indexofLastItem - itemPerPage;
  const currentItem = cart.slice(indexofFirstItem, indexofLastItem);
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

  const currentUser = JSON.parse(localStorage.getItem("user"));
  const AxiosData = useCallback(async () => {
    try {
      setloading(true);
      const currentUser = JSON.parse(localStorage.getItem("user"));
      const url = `${process.env.REACT_APP_SERVER_API}/api/carts`;
      let response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${currentUser.token}`,
        },
      });
      setloading(false);
      setcart(response.data.data);
    } catch (error) {
      swal("error", error.message, "error");
      setloading(false);
    }
  }, []);
  useEffect(() => {
    AxiosData();
  }, [AxiosData]);

  const AxiosArray = async () => {
    try {
      // const url = ``;
      // await axios.patch(url,)
    } catch (error) {}
  };

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
          const url = `${process.env.REACT_APP_SERVER_API}/api/carts/delete/${id}`;
          await axios
            .delete(url, {
              headers: {
                Authorization: `Bearer ${currentUser.token}`,
              },
            })
            .then(() => AxiosData());
          swal("Success", "congrate Deleted Cart Data", "success");
        } catch (error) {
          setloading(false);
          swal("Error", error.message, "error");
        }
      } else {
        swal("Your Data is safe!");
      }
    });
  };

  const AxiosQty = async (param1, id, qty, price) => {
    try {
      
      let hasil = 0;
      if (param1 === "DEC") {
         hasil = qty - 1;
      }
      if (param1 === "INC") {
         hasil = qty + 1;
      }
      setloading(true);
      const url = `${process.env.REACT_APP_SERVER_API}/api/carts/updateqty/${id}`;
      await axios.patch(url,{qty:hasil}, {
        headers: {
          Authorization: `Bearer ${currentUser.token}`
        }
      }).then(()=>AxiosData());
    } catch (error) {
      setloading(false);
      swal("Error", error.message, "error");
    }
  };

  const Thead = () => {
    return (
      <thead>
        <tr>
          <th width="5%">No</th>
          <th>Image</th>
          <th>Nama Product</th>
          <th>Price</th>
          <th>Qty</th>
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
            <td colSpan={6}>
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
            <td colSpan={6}>
              <div className="alert alert-danger">
                <center>Data Empty / Data Not Response</center>
              </div>
            </td>
          </tr>
        ) : (
          currentItem.map((item, index) => (
            <tr>
              <td>{(index += 1)}</td>
              <td>
                <img
                  src={`${process.env.REACT_APP_SERVER_API}/images/products/${item.product.image_url}`}
                  width={100}
                  height={100}
                  alt=""
                  srcset=""
                />
              </td>
              <td>{item.product.name}</td>
              <td>{item.product.price}</td>
              <td>
                <Button
                  onClick={() =>
                    AxiosQty("DEC", item._id, item.qty, item.product.price)
                  }
                >
                  {" "}
                  -{" "}
                </Button>{" "}
                <span>{item.qty} </span>{" "}
                <Button onClick={() => AxiosQty("INC", item._id, item.qty, item.product.price)}>
                  {" "}
                  +{" "}
                </Button>
              </td>
              <td>
                <Button
                  onClick={() => AxiosDelete(item._id)}
                  className="btn btn-danger btn-sm"
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
        <Card.Header className="bg-primary text-white">CART</Card.Header>
        <Card.Body>
          <Table striped bordered hover size="sm" className="w-100">
            <Thead />
            <Tbody />
          </Table>
          <ul className="float-right">{paginations}</ul>
        </Card.Body>
        <Card.Footer>
          <Link to="/menu">
            <Button className="btn btn-secondary btn-sm">
              <FontAwesomeIcon icon={faBackspace} /> Back
            </Button>
          </Link>

          <Link to="/checkout">
            <Button
              onClick={AxiosArray}
              className="float-right btn btn-secondary btn-sm"
            >
              <FontAwesomeIcon icon={faMoneyBill} /> CheckOut
            </Button>
          </Link>
        </Card.Footer>
      </Card>
    </div>
  );
}

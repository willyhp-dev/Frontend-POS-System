import { faEdit, faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { Thead,LengthNull,Spinners } from "./CustomHooks";
import {
  Button,
  Card,
  Col,
  FormControl,
  Row,

  Table,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import swal from "sweetalert";

export default function CategoryPage() {
  const [category, setCategory] = useState([]);
  const [loading, setloading] = useState(false);
  const [currentPage, setcurrentPage] = useState(1);
  const [itemPerPage] = useState(5);
  let items = [];
  for (
    let number = 1;
    number <= Math.ceil(category.length / itemPerPage);
    number++
  ) {
    items.push(number);
  }
  const handleClick = (event) => {
    setcurrentPage(Number(event.target.id));
  };
  const indexofLastItem = currentPage * itemPerPage;
  const indexofFirstItem = indexofLastItem - itemPerPage;
  const currentItem = category.slice(indexofFirstItem, indexofLastItem);
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

  //--------------------GetDATA Axios------------------//
  const AxiosData = useCallback(async (value) => {
    setloading(true);
    if (value == null) {
      value = "";
    }
    const currentUser = JSON.parse(localStorage.getItem("user"));
    const url = `http://localhost:4000/api/category?search=${value}`;
    await axios
      .get(url, {
        headers: {
          Authorization: `Bearer ${currentUser.token}`,
        },
      })
      .then((response) => {
        setloading(false);
        setCategory(response.data.data);
      })
      .catch((error) => {
        setloading(false);
        swal("Error", error.message, "error");
      });
  }, []);
  useEffect(() => {
    AxiosData();
  }, [AxiosData]);

    //-------------------Delete Data Axios--------------------------//
    const AxiosDelete = (id) => {
      swal({
        title: "Are you sure?",
        text: "Once deleted, you will not be able to recover This Category Data!",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      }).then(async (willDelete) => {
        if (willDelete) {
          try {
            setloading(true);
            const currentUser = JSON.parse(localStorage.getItem("user"));
            await axios.delete(
              `http://localhost:4000/api/category/delete/${id}`,
              {
                headers: {
                  Authorization: `Bearer ${currentUser.token}`,
                },
              }
            );
            setloading(false);
          
            swal("Success", "Congrate Deleted Category Data", {
              icon: "success",
            });
          } catch (error) {
            swal("Error", "Something Wrong", {
              icon: "error",
            });
          }
        } else {
          setloading(false);
          swal("Your Category Data is safe!");
        }
      }).then(() => AxiosData());
    };
  
  const Tbody = () => {
    return (
      <tbody>
        {loading ? (
          <Spinners />
        ) : currentItem.length === 0 ? (
         <LengthNull/>
        ) : (
          currentItem.map((item, i) => (
            <tr>
              <td>{(i += 1)}</td>
              <td>{item.name}</td>
              <td>
                <Link to={`/category/edit/${item._id}`}>
                  <Button className="btn btn-warning btn-sm mr-2">
                    <FontAwesomeIcon icon={faEdit} />
                  </Button>
                </Link>
                { 
                  <Button
                    className="btn btn-danger btn-sm"
                    type="submit"
                    onClick={() => AxiosDelete(item._id)}
                  >
                    <FontAwesomeIcon icon={faTrash} />
                  </Button>
                }
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
              <Link to="/category/store">
                <Button className ="btn btn-primary btn-sm">
                  <FontAwesomeIcon icon={ faPlus}/> Add
                </Button>
             </Link>
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
          <Table striped bordered hover size="sm" className="w-100">
            <Thead />
            <Tbody />
          </Table>
          <ul className="float-right">{paginations}</ul>
        </Card.Body>
      </Card>
    </div>
  );
}

import { faCartPlus, faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  Button,
  Card,
  Col,
  FormControl,
  FormSelect,
  Row,
  Spinner,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import swal from "sweetalert";

export default function MenuPage() {
  const [product, setproduct] = useState([]);
  const [loading, setloading] = useState(false);
  const [loadingcart, setloadingcart] = useState(false);
  const [category, setcategory] = useState([]);
  const [tag, settag] = useState([]);
  const [search, setsearch] = useState();
  const [searchCategory, setsearchCategory] = useState();
  const [cart, setcart] = useState([]);
  const [searchTag, setsearchTag] = useState();
  const [currentPage, setcurrentPage] = useState(1);
  const [itemPerPage] = useState(5);
  const currentUser = JSON.parse(localStorage.getItem("user"));
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

  const AxiosCategory = useCallback(async () => {
    try {
      setloading(true);
      const currentUser = JSON.parse(localStorage.getItem("user"));
      const url = `http://localhost:4000/api/category`;
      let response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${currentUser.token}`,
        },
      });
      setcategory(response.data.data);
      // setloading(false);
    } catch (error) {
      swal("error", "Category :" + error.message, "error");
      // setloading(false);
    }
  }, []);
  useEffect(() => {
    AxiosCategory();
  }, [AxiosCategory]);

  const AxiosTag = useCallback(async () => {
    try {
      setloading(true);
      const currentUser = JSON.parse(localStorage.getItem("user"));
      const url = `http://localhost:4000/api/tag`;
      let response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${currentUser.token}`,
        },
      });

      settag(response.data.data);
      // setloading(false);
    } catch (error) {
      swal("error", "Tag :" + error.message, "errror");
      // setloading(false);
    }
  }, []);
  useEffect(() => {
    AxiosTag();
  }, [AxiosTag]);

  const AxiosCartUpdate = async (id) => {
    try {
      setloadingcart(true);
      const url = `http://localhost:4000/api/updates/carts`;
      await axios
        .patch(
          url,
          { id: id },
          {
            headers: {
              Authorization: `Bearer ${currentUser.token}`,
            },
          }
        )
        .then(() => AxiosCart());
      setloadingcart(false);
    } catch (error) {
      setloadingcart(false);
      swal("Error", error.message, "error");
    }
  };
  useEffect(() => {});

  const AxiosCart = useCallback(async () => {
    try {
      setloading(true);
      const currentUser = JSON.parse(localStorage.getItem("user"));
      const url = `http://localhost:4000/api/carts`;
      let response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${currentUser.token}`,
        },
      });
    setcart(response.data.data);

      // setloading(false);
    } catch (error) {
      swal("Error", "cart:" + error.message, "error");
      // setloading(false);
    }
  }, []);
  useEffect(() => {
    AxiosCart();
  }, [AxiosCart]);

  const AxiosData = useCallback(async () => {
    try {
      setloading(true);
      if (searchCategory === undefined) {
        setsearchCategory("");
      } else if (searchTag === undefined) {
        setsearchTag("");
      } else if (search === undefined) {
        setsearch("");
      } else {

        const currentUser = JSON.parse(localStorage.getItem("user"));
        const url = `http://localhost:4000/api/products?q=${search}&category=${searchCategory}&tag=${searchTag}`;
        let response = await axios.get(url, {
          headers: {
            authorization: `Bearer ${currentUser.token}`,
          },
        });
        setloading(false);
        setproduct(response.data.data);
      
      }
    } catch (error) {
      swal("Error", error.message, "error");
      setloading(false);
    }
  }, [searchCategory, searchTag, search]);
  useEffect(() => {
    AxiosData();
  }, [AxiosData]);

  const MenuItem = ({ title, category, tag, price, image, id }) => {
    return (
      <Col sm={4}>
        <Card className="shadow" style={{ width: "18rem" }}>
          <Card.Img variant="top" height={200} src={image} />
          <Card.Body>
            <Card.Title className="p-0 m-0">{title}</Card.Title>
            <Card.Text className="p-0 m-0">
              <small>{category}</small>
            </Card.Text>
            <Card.Text className="p-0 m-0">
              <small className="bg-secondary text-white rounded p-1">
                {tag}
              </small>
            </Card.Text>
            <Card.Text className="p-0 m-0 mb-2">
              <small>
                <b>{price}</b>
              </small>
            </Card.Text>
            {currentUser === null ? (
              <div>
                <small>Please Login Your Account first</small>
              </div>
            ) : loadingcart ? (
              <Button variant="primary" disabled>
                <Spinner
                  as="span"
                  animation="grow"
                  size="sm"
                  role="status"
                  aria-hidden="true"
                />
                Loading...
              </Button>
            ) : (
              <Button
                variant="primary"
                className="btn btn-sm"
                onClick={() => AxiosCartUpdate(id)}
              >
                <FontAwesomeIcon icon={faCartPlus} />
              </Button>
            )}
          </Card.Body>
        </Card>
      </Col>
    );
  };
  return (
    <div>
      <Card className="mt-3">
        <Card.Header>
          <Row>
            <Col sm={10}>
              <Row>
                <Col sm>
                  <FormControl
                    onChange={(e) => setsearch(e.target.value)}
                    className="form-control "
                    placeholder="Search Product..."
                  />
                </Col>
                <Col sm>
                  <select
                    onChange={(e) => setsearchCategory(e.target.value)}
                    className="form-control "
                    size="sm"
                  >
                    <option>Search Category</option>
                    {category.map((item) => (
                      <option>{item.name}</option>
                    ))}
                  </select>
                </Col>
                <Col sm>
                  <select
                    onChange={(e) => setsearchTag(e.target.value)}
                    className="form-control "
                    size="sm"
                  >
                    <option>Search Tag</option>
                    {tag.map((item) => (
                      <option>{item.name}</option>
                    ))}
                  </select>
                </Col>
              </Row>
            </Col>
            <Col sm={2}>
              <div className="float-right">
                <Link to="/cart">
                  <Button className="btn btn-sm">
                    <FontAwesomeIcon icon={faCartShopping} />
                    <span className="badge badge-primary align-text-top">
                      {cart === undefined ? 0 : (cart.map((item, index) =>
                        index+=1
                      ))}{" "}
                    </span>
                  </Button>
                </Link>
              </div>
            </Col>
          </Row>
        </Card.Header>

        <Card.Body>
          <Row>
            {console.log(loading,product)
           
            }
            {
              loading ? (
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
            ) : product.length === 0 ? (
              <div className="alert alert-danger w-100">
                <center>Data Empty / Data Not Response</center>
              </div>
            ) : (
              product.map((menu) => (
                <MenuItem
                  title={menu.name}
                  category={menu.category.name}
                  tag={menu.tag.name}
                  price={menu.price}
                  image={`http://localhost:4000/images/products/${menu.image_url}`}
                  id={menu._id}
                />
              ))
            )}
          </Row>
          <ul className="float-right">{paginations}</ul>
        </Card.Body>

        <Card.Footer></Card.Footer>
      </Card>
    </div>
  );
}

import { faBackspace, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { Button, Card, Col, Form, Row, Spinner } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import swal from "sweetalert";

export default function ProductAdd() {
  const [name, setname] = useState();
  const [price, setprice] = useState();
  const [description, setdescription] = useState();
  const [image, setimage] = useState(null);
  const [loading, setloading] = useState(false);
  const Navigate = useNavigate();
  const [category, setcategory] = useState([]);
  const [tag, settag] = useState([]);
  const [inputcategory, setinputcategory] = useState();
  const [inputtag, setinputtag] = useState();

  const handleFileChange = (e) => {
    setimage(e.target.files[0]);
  };

  const AxiosCategory = useCallback(async () => {
    try {
      const url = `${process.env.REACT_APP_SERVER_API}/api/category`;
      const currentUser = JSON.parse(localStorage.getItem("user"));
      let response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${currentUser.token}`,
        },
      });

      setcategory(response.data.data);
    } catch (error) {
      swal("Error", error.message, "error");
    }
  }, []);
  useEffect(() => {
    AxiosCategory();
  }, [AxiosCategory]);

  const AxiosTag = useCallback(async () => {
    try {
      const url = `${process.env.REACT_APP_SERVER_API}/api/tag`;
      const currentUser = JSON.parse(localStorage.getItem("user"));
      let response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${currentUser.token}`,
        },
      });

      settag(response.data.data);
    } catch (error) {
      swal("Error", error.message, "error");
    }
  }, []);
  useEffect(() => {
    AxiosTag();
  }, [AxiosTag]);

  const AxiosAdd = async (e) => {
    e.preventDefault();
    try {
      setloading(true);

      const currentUser = JSON.parse(localStorage.getItem("user"));
      const url = `${process.env.REACT_APP_SERVER_API}/api/products/store`;
      await axios.post(
        url,
        {
          name: name,
          price: price,
          description: description,
          image: image,
          tag: inputtag,
          category: inputcategory,
        },
        {
          headers: {
            Authorization: `Bearer ${currentUser.token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setloading(false);
      swal("Success", "Congrate You Created Product Data", "success");
      Navigate("/product");
    } catch (error) {
      setloading(false);
      swal("Error", error.message, "error");
    }
  };

  return (
    <div>
      <Card className="mt-3">
        <Card.Header className="bg-primary text-white">ADD PRODUCT</Card.Header>
        <Form onSubmit={AxiosAdd}>
          <Card.Body>
            <Row>
              <Col sm>
                <Form.Group as={Row}>
                  <Form.Label column sm="3">
                    Nama Product
                  </Form.Label>
                  <Col sm="10">
                    <Form.Control
                      type="text"
                      name="name"
                      onChange={(e) => setname(e.target.value)}
                      value={name}
                      id="name"
                      placeholder="Nama Product"
                    />
                  </Col>
                </Form.Group>
                <Form.Group as={Row}>
                  <Form.Label column sm="3">
                    Price
                  </Form.Label>
                  <Col sm="10">
                    <Form.Control
                      onChange={(e) => setprice(e.target.value)}
                      value={price}
                      type="text"
                      name="price"
                      placeholder="Harga Product"
                    />
                  </Col>
                </Form.Group>
                <Form.Group as={Row}>
                  <Form.Label column sm="3">
                    Description
                  </Form.Label>
                  <Col sm="10">
                    <textarea
                      type="text"
                      className="form-control h-100"
                      onChange={(e) => setdescription(e.target.value)}
                      value={description}
                      name="description"
                      placeholder="Description"
                    />
                  </Col>
                </Form.Group>
              </Col>
              <Col sm>
                <Form.Group>
                  <Form.Label>Image file</Form.Label>
                  <br />
                  {/* {image.preview && (
                    <img src={image.preview} width="100" height="100" alt="" />
                  )} */}
                  <input
                    type="file"
                    name="file"
                    id="file"
                    onChange={(e) => handleFileChange(e)}
                  ></input>
                </Form.Group>
                <Form.Group>
                  <Form.Label className="mt-1">Category</Form.Label>
                  <Form.Select
                    onChange={(e) => setinputcategory(e.target.value)}
                    value={inputcategory}
                    className="form-control w-100"
                  >
                    <option>---Pilih Category---</option>
                    {category.map((item) => (
                      <option>{item.name}</option>
                    ))}
                  </Form.Select>
                </Form.Group>

                <Form.Group>
                  <Form.Label>Tag</Form.Label>
                  <Form.Select
                    onChange={(e) => setinputtag(e.target.value)}
                    value={inputtag}
                    id="inputtag"
                    className="form-control w-100"
                  >
                    <option>---Pilih Tag---</option>
                    {tag.map((tagz) => (
                      <option>{tagz.name}</option>
                    ))}
                  </Form.Select>
                </Form.Group>
              </Col>
            </Row>
          </Card.Body>
          <Card.Footer>
            {loading ? (
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
              <Button type="submit" className=" btn btn-sm">
                <FontAwesomeIcon icon={faPlus} /> Add
              </Button>
            )}

            <Link to="/product">
              <Button className="ml-2 btn btn-secondary btn-sm ml-2">
                <FontAwesomeIcon icon={faBackspace} /> Kembali
              </Button>
            </Link>
          </Card.Footer>
        </Form>
      </Card>
    </div>
  );
}

import { faBackspace, faEdit } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { Button, Card, Col, Form, Row, Spinner } from "react-bootstrap";
import { Link, useNavigate, useParams } from "react-router-dom";
import swal from "sweetalert";

export default function ProductEdit() {
  const [name, setname] = useState();
  const [price, setprice] = useState();
  const [description, setdescription] = useState();
  const [image, setimage] = useState(null);
  const [loading, setloading] = useState(false);
  const [loadings, setloadings] = useState(false);
  const { id } = useParams();
  const Navigate = useNavigate();

  const handleFileChange = (e) => {
    setimage(e.target.files[0]);
  };

  const AxiosDetail = useCallback(async () => {
    try {
      setloadings(true);
      const currentUser = JSON.parse(localStorage.getItem("user"));
      const url = `http://localhost:4000/api/products/${id}`;
      let response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${currentUser.token}`,
        },
      });
      setname(response.data[0].name);
      setprice(response.data[0].price);
      setdescription(response.data[0].description);
      setimage(response.data[0].image_url);
      setloadings(false);
    } catch (error) {
      setloadings(false);
      swal("Error", error.message, "error");
    }
  }, [id]);
  useEffect(() => {
    AxiosDetail();
  }, [AxiosDetail]);

  const AxiosUpdate = async (e) => {
    e.preventDefault();
    try {
      setloading(true);
      const currentUser = JSON.parse(localStorage.getItem("user"));
      const url = `http://localhost:4000/api/products/update/${id}`;
      await axios.patch(
        url,
        { name: name, price: price, description: description, image: image },
        {
          headers: {
            Authorization: `Bearer ${currentUser.token}`,
            "Content-Type": "multipart/form-data"
          },
        }
      );
      setloading(false);
      swal("Success", "Congrate Updated Product Data","success");
      Navigate("/product");
    } catch (error) {
      setloading(false);
      swal("Error", error.message, "error");
    }
  };

  return (
    <div>
      <Card className="mt-3">
        <Card.Header className="bg-warning text-white">
          EDIT PRODUCT
        </Card.Header>
        <Form onSubmit={AxiosUpdate}>
          {loadings ? (
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
          ) : (
            <div>
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
                        <Form.Control
                          type="text"
                          onChange={(e) => setdescription(e.target.value)}
                          value={description}
                          name="description"
                          placeholder="Description"
                        />
                      </Col>
                    </Form.Group>
                  </Col>
                  <Col sm>
                    <img
                      src={`http://localhost:4000/images/products/${image}`}
                      width="100px"
                      height="100px"
                      alt=""
                    />
                    <br />
                    <br />
                    <input
                      type="file"
                      name="file"
                      id="file"
                      onChange={(e) => handleFileChange(e)}
                    />
                  </Col>
                </Row>
              </Card.Body>

              <Card.Footer>
                {loading ? (
                  <Button className="btn btn-warning" disabled>
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
                  <Button type="submit" className="btn btn-warning btn-sm">
                    <FontAwesomeIcon icon={faEdit} /> Update
                  </Button>
                )}

                <Link to="/product">
                  <Button className="btn btn-secondary btn-sm ml-2">
                    <FontAwesomeIcon icon={faBackspace} /> Kembali
                  </Button>
                </Link>
              </Card.Footer>
            </div>
          )}
        </Form>
      </Card>
    </div>
  );
}

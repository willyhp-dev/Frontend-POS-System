import { faBackspace, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { useState } from "react";
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


  const handleFileChange = (e) => {
    
    setimage(e.target.files[0])
  };
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
        },
        {
          headers: {
            Authorization: `Bearer ${currentUser.token}`,
            "Content-Type": "multipart/form-data"
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
                    onChange={(e)=>handleFileChange(e)}
                  ></input>
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

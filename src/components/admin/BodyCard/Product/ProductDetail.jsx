import { faBackspace } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { Button, Card, Col, Row, Spinner } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import swal from "sweetalert";

export default function ProductDetail() {
  const { id } = useParams();
  const [loading, setloading] = useState(false);

  const [name, setname] = useState();
  const [price, setprice] = useState();
  const [description, setdescription] = useState();
  const [category, setcategory] = useState();
  const [tag, settag] = useState();
  const [image, setimage] = useState();
  const AxiosDetail = useCallback(async () => {
    try {
      setloading(true);
      const currentUser = JSON.parse(localStorage.getItem("user"));
      const url = `${process.env.REACT_APP_SERVER_API}/api/products/${id}`;
      let response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${currentUser.token}`,
        },
      });
      setname(response.data[0].name);
      setprice(response.data[0].price);
      setdescription(response.data[0].description);
      setcategory(response.data[0].category.name);
      settag(response.data[0].tag.name);
      setimage(response.data[0].image_url);
      setloading(false);
    } catch (error) {
      setloading(false);
      swal("error", error.message, "error");
    }
  }, [id]);
  useEffect(() => {
    AxiosDetail();
  }, [AxiosDetail]);

  return (
    <Card className="mt-3">
      <Card.Header className="bg-secondary text-white">
        Detail Product
      </Card.Header>
      <Card.Body>
        {loading ? (
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
          <Row>
            <Col sm={3}>
              <img
                src={`${process.env.REACT_APP_SERVER_API}/images/products/${image}`}
                width="150px"
                height="150px"
                alt=""
              />
            </Col>
            <Col sm>
              <Row>
                <Col sm={3}>Name Product</Col>
                <Col sm={1}>:</Col>
                <Col sm>{name}</Col>
              </Row>
              <Row>
                <Col sm={3}>Price</Col>
                <Col sm={1}>:</Col>
                <Col sm>{price}</Col>
              </Row>
              <Row>
                <Col sm={3}>Description</Col>
                <Col sm={1}>:</Col>
                <Col sm>{description}</Col>
              </Row>
              <Row>
                <Col sm={3}>Category</Col>
                <Col sm={1}>:</Col>
                <Col sm>{category}</Col>
              </Row>
              <Row>
                <Col sm={3}>Tag</Col>
                <Col sm={1}>:</Col>
                <Col sm>{tag}</Col>
              </Row>
            </Col>
          </Row>
        )}
      </Card.Body>
      <Card.Footer>
        <Link to="/product">
          <Button className="btn btn-secondary">
            <FontAwesomeIcon icon={faBackspace} /> Back
          </Button>
        </Link>
      </Card.Footer>
    </Card>
  );
}

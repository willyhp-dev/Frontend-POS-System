import { faBackspace, faRefresh } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { Button, Card, Col, Form, FormControl, Spinner } from "react-bootstrap";
import { Link, useNavigate, useParams } from "react-router-dom";
import swal from "sweetalert";

export default function TagProduct() {
  const [tag, settag] = useState([]);
  const [inputtag, setinputtag] = useState();
  const [loading, setloading] = useState(false);
  const { id } = useParams();
  const Navigate = useNavigate();

  const AxiosData = useCallback(async () => {
    try {
      const url = `http://localhost:4000/api/tag`;
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
    AxiosData();
  }, [AxiosData]);

  const AxiosUpdate = async (e) => {
    e.preventDefault();
    try {
      setloading(true);
      const currentUser = JSON.parse(localStorage.getItem("user"));
      const url = `http://localhost:4000/api/products/tag/${id}`;
      await axios.patch(url,{tag:inputtag}, {
        headers: {
          Authorization: `Bearer ${currentUser.token}`,
        },
      });
      setloading(false);
      swal("Success", "Congrate Updated Tag Product ", "success");
      Navigate("/product");
    } catch (error) {
      setloading(false);
      swal("Error", error.message, "error");
    }
  };

  return (
    <Card className="mt-3">
      <Card.Header className="bg-secondary text-white">TAGS</Card.Header>
      <Form onSubmit={AxiosUpdate}>
        <Card.Body>
          <row>
            <Col sm>
              <Form.Select
                onChange={(e) => setinputtag(e.target.value)}
                value={inputtag}
                id="inputtag"
                className="form-control w-25"
              >
                <option>---Pilih Tag---</option>
                {tag.map((tagz) => (
                  <option>{tagz.name}</option>
                ))}
              </Form.Select>
            </Col>
            <Col sm></Col>
          </row>
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
            <Button type ="submit" className="btn btn-primary btn-sm">
              <FontAwesomeIcon icon={faRefresh} /> Save Changes
            </Button>
          )}

          <Link to="/product">
            <Button className="btn btn-secondary btn-sm ml-1">
              <FontAwesomeIcon icon={faBackspace} /> Back
            </Button>
          </Link>
        </Card.Footer>
      </Form>
    </Card>
  );
}

import { faBackspace, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { useState } from "react";
import {
  Button,
  Card,
  Col,
  Form,
  FormControl,
  Row,
  Spinner,
} from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import swal from "sweetalert";

export default function KelurahanAdd() {
  const [name, setname] = useState();
  const [loading, setloading] = useState(false);
  const Navigate = useNavigate();
  const AxiosAdd = async (e) => {
    e.preventDefault();
    try {
      setloading(true);
      const currentUser = JSON.parse(localStorage.getItem("user"));
      const url = `http://localhost:4000/api/kelurahan/store`;
      await axios.post(
        url,
        { name: name },
        {
          headers: {
            Authorization: `Bearer ${currentUser.token}`,
          },
        }
      );
      setloading(false);
      swal("Success", "Congrate You Created Kelurahan Data", "success");
      Navigate("/address/kelurahan");
    } catch (error) {
      setloading(false);
    }
  };

  return (
    <div>
      <Card className="mt-3">
        <Card.Header className="bg-primary text-white">
          Add Kelurahan
        </Card.Header>
        <Form onSubmit={AxiosAdd}>
          <Card.Body>
            <Row>
              <Col sm>
                {" "}
                <FormControl
                  type="text"
                  className="w-50"
                  onChange={(e) => setname(e.targer.value)}
                  value={name}
                  placeholder="Example : Sungai Raya"
                />
              </Col>
              <Col sm></Col>
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
              <Button type="submit" className="btn btn-sm">
                <FontAwesomeIcon icon={faPlus} /> Add
              </Button>
            )}
            <Link to="/address/kelurahan">
              <Button className ="btn btn-secondary btn-sm ml-2">
                <FontAwesomeIcon icon={faBackspace} /> Back
              </Button>
            </Link>
            
          </Card.Footer>
        </Form>
      </Card>
    </div>
  );
}

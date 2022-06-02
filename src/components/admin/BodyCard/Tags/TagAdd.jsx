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

export default function TagAdd() {
  const [name, setname] = useState("");
  const [loading, setloading] = useState(false);
  const currentUser = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();
  const AxiosAdd = async (e) => {
    e.preventDefault();
    try {
      setloading(true);
      const url = `http://localhost:4000/api/tag/store`;
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
      swal("Success", "You Created Tag Data", "success");
      navigate("/tag");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <Card className="mt-3">
        <Card.Header className="bg-primary text-white">Add Tag</Card.Header>
        <Form onSubmit={AxiosAdd}>
          <Card.Body>
            <Row>
              <Col sm>
                {" "}
                <FormControl
                  type="text"
                  placeholder="Example : Bread"
                  id="name"
                  className="w-50"
                  onChange={(e) => setname(e.target.value)}
                  value={name}
                />
              </Col>
              <Col sm></Col>

              {/* <div className="float-right">
              <FormControl  placeholder="Search Tag..." />
            </div> */}
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
            <Link to="/tag" element="">
              <Button className="btn btn-secondary btn-sm ml-2">
                <FontAwesomeIcon icon={faBackspace} /> Back
              </Button>
            </Link>
          </Card.Footer>
        </Form>
      </Card>
    </div>
  );
}

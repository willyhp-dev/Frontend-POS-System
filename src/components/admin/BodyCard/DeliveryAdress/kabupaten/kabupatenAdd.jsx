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
export default function KabupatenAdd() {
  const [name, setname] = useState();
  const [loading, setloading] = useState();
  const currentUser = JSON.parse(localStorage.getItem("user"));
  const Navigate = useNavigate();
  const AxiosAdd = async (e) => {
    e.preventDefault();

    try {
      setloading(true);
      const url = `http://localhost:4000/api/kabupaten/store`;
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
      swal("Sukses", "Congrate you Created Kabupaten Data","success");
      Navigate("/address/kabupaten");
    } catch (error) {
      setloading(false);
      swal("Error", error.message, "error");
    }
  };
  return (
    <div>
      <Card className ="mt-3">
        <Card.Header className="bg-primary text-white">
          Add Kabupaten
        </Card.Header>
        <Form onSubmit={AxiosAdd}>
          <Card.Body>
            <Row>
              <Col sm>
                {" "}
                <FormControl
                  placeholder="Example : Utama"
                  type="text"
                  onChange={(e) => setname(e.target.value)}
                  value={name}
                  className="w-50"
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
              <Button type ="submit" className="btn btn-sm">
                <FontAwesomeIcon icon={faPlus} /> Add
              </Button>
            )}
            <Link to="/address/kabupaten">
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

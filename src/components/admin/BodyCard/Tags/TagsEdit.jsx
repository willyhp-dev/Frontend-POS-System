import { faBackspace, faEdit } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import {
  Button,
  Card,
  Col,
  Form,
  FormControl,
  Row,
  Spinner,
} from "react-bootstrap";
import { Link, useNavigate, useParams } from "react-router-dom";
import swal from "sweetalert";

export default function TagEdit() {
  const [name, setname] = useState("");
  const [loading, setloading] = useState(false);
  const { id } = useParams();
  const Navigate = useNavigate()
  const AxiosDetail = useCallback(async () => {
    try {
      const currentUser = JSON.parse(localStorage.getItem("user"));
      const url = `${process.env.REACT_APP_SERVER_API}/api/tag/${id}`;
      let Response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${currentUser.token}`,
        },
      });
      setname(Response.data[0].name);
    } catch (error) {
      console.log(error);
    }
  }, [id]);
  useEffect(() => {
    AxiosDetail();
  }, [AxiosDetail]);

  const AxiosEdit = async (e) => {
    e.preventDefault();
    try {
      setloading(true);
      const currentUser = JSON.parse(localStorage.getItem("user"));
      const url = `${process.env.REACT_APP_SERVER_API}/api/tag/update/${id}`;
      await axios.patch(
        url, {
          name: name,
        },
        {
          headers: {
            Authorization: `Bearer ${currentUser.token}`,
          },
        }
       
      );
      setloading(false);
      Navigate("/tag")
      swal("Sukses", "Congrate you Updated Tag Data", "success");
    } catch (error) {
      setloading(false);
      swal("Error", error.message, "error");
    }
  };

  return (
    <div>
      <Card>
        <Card.Header className="bg-warning text-white"> Edit Tag</Card.Header>
        <Form onSubmit={AxiosEdit}>
          <Card.Body>
            <Row>
              <Col sm>
                {" "}
                <FormControl
                  id="name"
                  placeholder="Example : Bread"
                  value={name}
                  className="w-50"
                  onChange={(e) => setname(e.target.value)}
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
              <Button type="submit" className="btn btn-warning btn-sm">
                <FontAwesomeIcon icon={faEdit} /> Edit
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

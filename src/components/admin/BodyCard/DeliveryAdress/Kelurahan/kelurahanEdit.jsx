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

export default function KelurahanEdit() {
  const [name, setname] = useState();
  const [loading, setloading] = useState(false);
  const { id } = useParams();
  const Navigate = useNavigate();
  const AxiosDetail = useCallback(async () => {
    try {
      const currentUser = JSON.parse(localStorage.getItem("user"));
      const url = `${process.env.REACT_APP_SERVER_API}/api/kelurahan/detail/${id}`;
      let response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${currentUser.token}`,
        },
      });
      setname(response.data[0].name);
    } catch (error) {
      swal("Error", error.message, "error");
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
      const url = `${process.env.REACT_APP_SERVER_API}/api/kelurahan/update/${id}`;
      await axios.patch(
        url,
        { name: name },
        {
          headers: {
            Authorization: `Bearer ${currentUser.token}`,
          },
        }
      );
      setloading(false);
      Navigate("/address/kelurahan");
      swal("Success", "Congrate You Updated Kelurahan", "success");
    } catch (error) {
      setloading(false);
      swal("Error", error.message, "error");
    }
  };
  return (
    <Card className="mt-3">
      <Card.Header className="bg-warning text-white">
        {" "}
        Edit Kelurahan
      </Card.Header>
      <Form onSubmit={AxiosEdit}>
        <Card.Body>
          <Row>
            <Col sm>
              {" "}
              <FormControl
                type="text"
                className="w-50"
                onChange={(e) => setname(e.target.value)}
                value={name}
                placeholder="Example : Sungai Raya"
              />
            </Col>
            <Col sm></Col>
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
            <Button type="submit" className="btn btn-sm btn-warning">
              <FontAwesomeIcon icon={faEdit} /> Update
            </Button>
          )}
          <Link to="/address/kelurahan">
            <Button className="btn btn-secondary btn-sm ml-2">
              <FontAwesomeIcon icon={faBackspace} /> Back
            </Button>
          </Link>
        </Card.Footer>
      </Form>
    </Card>
  );
}

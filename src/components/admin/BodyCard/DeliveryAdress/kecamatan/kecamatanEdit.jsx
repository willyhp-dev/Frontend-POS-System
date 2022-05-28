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

export default function KecamatanEdit() {
  const [name, setname] = useState();
  const [loading, setloading] = useState(false);
  const { id } = useParams();
  const Navigate = useNavigate();

  const AxiosDetail = useCallback(async () => {
    try {
      const currentUser = JSON.parse(localStorage.getItem("user"));
      const url = `http://localhost:4000/api/kecamatan/detail/${id}`;
      let response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${currentUser.token}`,
        },
      });
      setname(response.data[0].name);
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
      const url = `http://localhost:4000/api/kecamatan/update/${id}`;
      await axios.patch(url,{name:name}, {
        headers: {
          Authorization: `Bearer ${currentUser.token}`,
        },
      });
      setloading(false);
      swal("Success", "Congrate you Updated Kecamatan Data", "success");
      Navigate("/address/kecamatan");
    } catch (error) {
      setloading(false);
      swal("Error", error.message, "error");
    }
  };

  return (
    <Card className="mt-3">
      <Card.Header className="bg-warning text-white">
        Edit Kecamatan
      </Card.Header>
      <Form onSubmit={AxiosEdit}>
        <Card.Body>
          <Row>
            <Col sm>
              {" "}
              <FormControl
                type="text"
                onChange={(e) => setname(e.target.value)}
                value={name}
                className="w-50"
                placeholder="Example : Utama"
              />
            </Col>
            <Col sm></Col>
          </Row>
        </Card.Body>
        <Card.Footer>
          {loading ? (
            <Button className="btn btn-sm btn-warning" disabled>
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
          <Link to="/address/kecamatan">
            <Button className="btn btn-secondary  btn-sm ml-2">
              <FontAwesomeIcon icon={faBackspace} /> Back
            </Button>
          </Link>
        </Card.Footer>
      </Form>
    </Card>
  );
}

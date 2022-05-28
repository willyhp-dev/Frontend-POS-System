import { faEdit } from "@fortawesome/free-solid-svg-icons";
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
import { useNavigate, useParams } from "react-router-dom";
import swal from "sweetalert";

export default function KabupatenEdit() {
  const [name, setname] = useState();
  const [loading, setloading] = useState(false);
  const { id } = useParams();
  const Navigate = useNavigate();

  const AxiosDetail = useCallback(async () => {
    const currentUser = JSON.parse(localStorage.getItem("user"));
    const url = `http://localhost:4000/api/kabupaten/${id}`;
    let response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${currentUser.token}`,
      },
    });
    setname(response.data[0].name);
  }, [id]);
  useEffect(() => {
    AxiosDetail();
  }, [AxiosDetail]);

  const AxiosEdit = async (e) => {
    e.preventDefault();
    try {
      const currentUser = JSON.parse(localStorage.getItem("user"));
      setloading(true);
      const url = `http://localhost:4000/api/kabupaten/update/${id}`;
      await axios.patch(url,{name:name}, {
        headers: {
          Authorization: `Bearer ${currentUser.token}`,
        },
      });
      setloading(false);
      swal("Success", "Congrate you Updated Kabupaten Data", "success");
      Navigate("/address/kabupaten");
    } catch (error) {
      setloading(false);
      swal("Error", "Something Wrong", "error");
    }
  };

  return (
    <div>
      <Card className="mt-3">
        <Card.Header className="bg-warning text-white">
          {" "}
          Edit Kabupaten
        </Card.Header>
        <Form onSubmit={AxiosEdit}>
          <Card.Body>
            <Row>
              <Col sm>
                {" "}
                <FormControl
                  placeholder="Example : Utama"
                  type="text"
                  className="w-50"
                  onChange={(e) => setname(e.target.value)}
                  value={name}
                />
              </Col>
              <Col sm></Col>
            </Row>
          </Card.Body>
          <Card.Footer>
            {loading ? (
              <Button className = "btn btn-warning" disabled>
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
          </Card.Footer>
        </Form>
      </Card>
    </div>
  );
}

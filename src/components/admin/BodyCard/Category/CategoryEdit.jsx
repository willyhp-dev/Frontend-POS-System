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
import { Link, useParams } from "react-router-dom";
import swal from "sweetalert";
import { useNavigate } from "react-router-dom";
export default function CategoryEdit() {
  const { id } = useParams();
  const [name, setname] = useState("");
  const [loading, setloading] = useState(false);
  const navigate = useNavigate();
  const AxiosDetail = useCallback(async () => {
    const currentUser = JSON.parse(localStorage.getItem("user"));
    const url = `${process.env.REACT_APP_SERVER_API}/api/category/detail/${id}`;
    await axios
      .get(url, {
        headers: {
          Authorization: `Bearer ${currentUser.token}`,
        },
      })
      .then((result) => {
        setname(result.data.name);
      });
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
  useEffect(() => {
    AxiosDetail();
  }, [AxiosDetail]);
  const AxiosEdit = async (e) => {
    e.preventDefault();
    setloading(true);
   
      const currentUser = JSON.parse(localStorage.getItem("user"));
      const url = `${process.env.REACT_APP_SERVER_API}/api/category/edit/${id}`;
      await axios.patch(
        url,
        { name:name },
        {
          headers: {
            Authorization: `Bearer ${currentUser.token}`,
          },
        }
      ).then(result => {
        setloading(false);
        swal("sukses", "Congrate you did update Category Data", "success");
        navigate("/category");
      }).catch(error => {
        setloading(false);
        swal("error", error.message, "error");
      });

     
   
     
   
  };
  return (
    <div>
      <Card>
        <Card.Header className="bg-warning text-white mt-3">
          {" "}
          Edit Category
        </Card.Header>
        <Form onSubmit={AxiosEdit}>
          <Card.Body>
            <Row>
              <Col sm>
                {" "}
                <FormControl
                  id="name"
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
              <Button className="btn btn-warning btn-sm" disabled>
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

            <Link to="/category">
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

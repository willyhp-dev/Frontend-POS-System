import { faBackspace, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { useState } from "react";
import swal from "sweetalert";
import {
  Button,
  Col,
  Form,
  FormControl,
  Row,
  Card,
  Spinner,
} from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
export default function CategoryAdd() {
  const [name, setname] = useState();
  const [loading, setloading] = useState();
  const currentUser = JSON.parse(localStorage.getItem("user"));
  const Navigate = useNavigate();
  const CategoryForm = async (e) => {
    e.preventDefault();
    setloading(true);
    await axios
      .post(
        `${process.env.REACT_APP_SERVER_API}/api/category/store`,
        { name: name },
        {
          headers: {
            Authorization: `Bearer ${currentUser.token}`,
          },
        }
      )
      .then((result) => {
        setloading(false);
        Navigate("/category");
        swal("Sukses", "You Did Add Category Data", "success");

        return result;
      })
      .catch((error) => {
        swal("error", error.message, "error");
        return error;
      });
  };
  return (
    <div>
      <Card className="mt-3">
        <Card.Header className="bg-primary text-white">
          {" "}
          Add Category
        </Card.Header>
        <Form onSubmit={CategoryForm}>
          <Card.Body>
            <Row>
              <Col sm>
                {" "}
                <FormControl
                  placeholder="Example : Utama"
                  id="name"
                  name="name"
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
            <Link to="/category">
              <Button className="btn btn-secondary btn-sm ml-2">
                <FontAwesomeIcon icon={faBackspace }/> Back
              </Button>
            </Link>

          </Card.Footer>
        </Form>
      </Card>
    </div>
  );
}

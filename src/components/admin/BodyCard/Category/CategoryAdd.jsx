import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { useState } from "react";
import swal from "sweetalert";
import { Button, Col, Form, FormControl, Row } from "react-bootstrap";

export default function CategoryAdd() {
  const [name, setname] = useState();
  const currentUser = JSON.parse(localStorage.getItem("user"));

  const CategoryForm = async (e) => {
    e.preventDefault();
    await axios
      .post(
        "http://localhost:4000/api/category/store",
        { name: name },
        {
          headers: {
            Authorization: `Bearer ${currentUser.token}`,
          },
        }
      )
      .then((result) => {
        swal("Sukses", "You Did Add Category Data", "success");
        const refresh = () => {
          window.location.reload();
        };
        setInterval(refresh, 3000);
        return result;
      })
      .catch((error) => {
        swal("error", error.message, "error");
        return error;
      });
  };
  return (
    <div>
      <Form onSubmit={CategoryForm}>
        <Row>
          <Col sm>
            {" "}
            <FormControl
              placeholder="Example : Utama"
              id="name"
              name="name"
              onChange={(e) => setname(e.target.value)}
              value={name}
            />
          </Col>
          <Col sm>
            <Button type="submit" className="btn btn-sm">
              <FontAwesomeIcon icon={faPlus} /> Add
            </Button>
          </Col>

          {/* <div className="float-right">
              <FormControl  placeholder="Search Tag..." />
            </div> */}
        </Row>
      </Form>
    </div>
  );
}

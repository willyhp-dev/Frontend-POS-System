import axios from "axios";
import { useState } from "react";
import { Button, Form,  Spinner } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import swal from "sweetalert";

export default function PageLogin() {
  const [email, setemail] = useState();
  const [password, setpassword] = useState();
  const [loading, setloading] = useState(false);
  const navigate = useNavigate();

  const loginform = async (e) => {
    e.preventDefault();
    setloading(true);

    let url = "http://localhost:4000/api/auth/login";
    axios
      .post(url, {
        email: email,
        password: password,
      })
      .then((result) => {
        if (result.data.token) {
          localStorage.setItem("user", JSON.stringify(result.data));
        }
        swal("Sukses", "Anda Berhasil Login Akun", "success");
        setloading(false);

        navigate("/");
        return result.data;
      })
      .catch((error) => {
        setloading(false);
        swal("ERROR", "Anda Gagal Login Akun", "error");
        console.log(error);
      });
  };
  return (
    <div>
      <div className="border mb-2"></div>
      <Form onSubmit={loginform}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            id="email"
            onChange={(e) => setemail(e.target.value)}
            placeholder="Enter email"
          />
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            id="password"
            onChange={(e) => setpassword(e.target.value)}
            placeholder="Password"
          />
        </Form.Group>
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
          <Button variant="primary" type="submit">
            Submit
          </Button>
        )}
      </Form>
    </div>
  );
}

import axios from "axios";
import { useState } from "react";
import { Button, Form,  Spinner } from "react-bootstrap";
import swal from "sweetalert";
import { useNavigate } from "react-router-dom";
export default function RegisterPage() {
  const [full_name, setfull_name] = useState();
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
    
        navigate("/");
        return result.data;
      })
      .catch((error) => {
        setloading(false);
        swal("ERROR", "Anda Gagal Login Akun", "error");
        console.log(error);
      });
  };

  const RegisterForm = async (e) => {
    e.preventDefault();
    setloading(true);
    try {
      let url = "http://localhost:4000/api/auth/register";
      await axios.post(url, {
        full_name: full_name,
        email: email,
        password: password,
      });
      let urls = "http://localhost:4000/api/auth/login";
      await axios
        .post(urls, {
          email: email,
          password: password,
        })
        .then((result) => {
          if (result.data.token) {
            localStorage.setItem("user", JSON.stringify(result.data));
          }
          setloading(false);
          swal("Sukses", "Anda Berhasil buat akun User", "success");
          navigate("/");
          return result.data;
        });
     
    } catch (error) {
      console.log(error);
      setloading(false);
      swal("Gagal", "Anda Gagal buat akun User", "error");
    }
  };
  return (
    <div>
        <div className="border mb-2"></div>
        <Form onSubmit={RegisterForm}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              id="email"
              type="email"
              onChange={(e) => setemail(e.target.value)}
              value={email}
              placeholder="Enter email"
            />
            <Form.Text className="text-muted">
              We'll never share your email with anyone else.
            </Form.Text>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Full Name</Form.Label>
            <Form.Control
              id="full_name"
              type="text"
              placeholder="Full Name"
              onChange={(e) => setfull_name(e.target.value)}
              value={full_name}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Password</Form.Label>
            <Form.Control
              id="password"
              type="password"
              placeholder="Password"
              onChange={(e) => setpassword(e.target.value)}
              value={password}
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

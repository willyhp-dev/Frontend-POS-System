import axios from "axios";
import { useState } from "react";
import { Button, Card, Col, Form, Row, Spinner } from "react-bootstrap";
import swal from "sweetalert";

export default function RegisterPage() {
  const [full_name, setfull_name] = useState();
  const [email, setemail] = useState();
  const [password, setpassword] = useState();
  const [loading, setloading] = useState(false);
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
      setloading(false);
      swal("Sukses", "Anda Berhasil buat akun User", "sukses");
    } catch (error) {
      console.log(error);
      setloading(false);
      swal("Gagal", "Anda Gagal buat akun User", "error");
    }
  };
  return (
    <div>
      <Row className="mt-5">
        <Col sm={4}></Col>
        <Col sm={4}>
          <Card className="p-3 shadow">
            <center>
              <h4>RegisterForm Page</h4>
            </center>
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
          </Card>
        </Col>
        <Col sm={4}></Col>
      </Row>
    </div>
  );
}

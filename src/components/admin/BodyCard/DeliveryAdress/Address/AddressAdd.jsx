import { faBackspace, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { useState } from "react";
import { Button, Card, Col, Form, Row, Spinner } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import swal from "sweetalert";
import {
  AxiosKabupaten,
  AxiosKecamatan,
  AxiosKelurahan,
  AxiosProvinsi,
} from "./CustomHooks";

export default function AddressAdd() {
  const [kabupaten, setkabupaten] = useState();
  const [kecamatan, setkecamatan] = useState();
  const [kelurahan, setkelurahan] = useState();
  const [provinsi, setprovinsi] = useState();
  const [detail, setdetail] = useState();
  const [name, setname] = useState();
  const [loading, setloading] = useState();
  const Navigate = useNavigate();

  const AxiosAdd = async (e) => {
    e.preventDefault();
    try {
      const currentUser = JSON.parse(localStorage.getItem("user"));
      setloading(true);
      const url = `http://localhost:4000/api/address`;
      await axios.post(
        url,
        {
          name: name,
          kabupaten: kabupaten,
          kecamatan: kecamatan,
          kelurahan: kelurahan,
          provinsi: provinsi,
          detail: detail,
        },
        {
          headers: {
            Authorization: `Bearer ${currentUser.token}`,
          },
        }
      );
      setloading(false);
      swal("Success", "Congrate You Created Address Data","success");
      Navigate("/address");
    } catch (error) {
      setloading(false);
      swal("Error", error.message, "error");
    }
  };
  return (
    <div>
      <Card className="mt-3">
        <Card.Header className="bg-primary text-white">Address Add</Card.Header>
        <Form onSubmit={AxiosAdd}>
          <Card.Body>
            <Row>
              <Col sm={6}>
                <Form.Group>
                  <Form.Label>Kabupaten</Form.Label>
                  <Form.Select
                    onChange={(e) => setkabupaten(e.target.value)}
                    value={kabupaten}
                    id="kabupaten"
                    className="form-control form-sm w-50"
                  >
                    <option>Pilih Kabupaten</option>
                    <AxiosKabupaten />
                  </Form.Select>
                </Form.Group>
                <Form.Group>
                  <Form.Label>Kelurahan</Form.Label>
                  <Form.Select
                    onChange={(e) => setkelurahan(e.target.value)}
                    value={kelurahan}
                    id="kelurahan"
                    className="form-control form-sm w-50"
                  >
                    <option>Pilih Kelurahan</option>
                    <AxiosKelurahan />
                  </Form.Select>
                </Form.Group>
                <Form.Group>
                  <Form.Label>Kecamatan</Form.Label>
                  <Form.Select
                    onChange={(e) => setkecamatan(e.target.value)}
                    value={kecamatan}
                    id="kecamatan"
                    className="form-control form-sm w-50"
                  >
                    <option>Pilih Kecamatan</option>
                    <AxiosKecamatan />
                  </Form.Select>
                </Form.Group>
                <Form.Group>
                  <Form.Label>Provinsi</Form.Label>
                  <Form.Select
                    onChange={(e) => setprovinsi(e.target.value)}
                    value ={provinsi}
                    id = "provinsi"
                    className="form-control form-sm w-50">
                    <option>Pilih Provinsi</option>
                    <AxiosProvinsi />
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col sm={6}>
                <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlTextarea1"
                >
                  <Form.Label>Alamat Detail</Form.Label>
                  <Form.Control
                    onChange={(e) => setdetail(e.target.value)}
                    value={detail}
                    id ="detail"
                    as="textarea"
                    rows={3}
                  />
                </Form.Group>
                <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlTextarea1"
                >
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    onChange={(e) => setname(e.target.value)}
                    value={name}
                    id = "name"
                    rows={3}
                  />
                </Form.Group>
              </Col>
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
              <Button type="submit" className="btn btn-primary btn-sm">
                <FontAwesomeIcon icon={faPlus} /> Add Address
              </Button>
            )}

            <Link to="/address">
              <Button className="btn btn-secondary btn-sm ml-2">
                <FontAwesomeIcon icon={faBackspace} /> Kembali
              </Button>
            </Link>
          </Card.Footer>
        </Form>
      </Card>
    </div>
  );
}

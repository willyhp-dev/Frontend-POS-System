import { faBackspace, faEdit } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { Button, Card, Col, Form, Row, Spinner } from "react-bootstrap";
import { Link, useNavigate, useParams } from "react-router-dom";
import swal from "sweetalert";
import {
  AxiosKabupaten,
  AxiosKecamatan,
  AxiosKelurahan,
  AxiosProvinsi,
} from "./CustomHooks";

export default function AddressEdit() {
  const [loading, setloading] = useState(false);
  const [loadings, setloadings] = useState(false);
  const [name, setname] = useState();
  const [kabupaten, setkabupaten] = useState();
  const [kelurahan, setkelurahan] = useState();
  const [kecamatan, setkecamatan] = useState();
  const [provinsi, setprovinsi] = useState();
  const [detail, setdetail] = useState();
  const { id } = useParams();
  const Navigate = useNavigate();

  const AxiosDetail = useCallback(async () => {
    try {
      setloading(true);
      const currentUser = JSON.parse(localStorage.getItem("user"));
      const url = `http://localhost:4000/api/address/${id}`;
      let response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${currentUser.token}`,
        },
      });
      setname(response.data[0].name);
      setkabupaten(response.data[0].kabupaten);
      setkelurahan(response.data[0].kelurahan);
      setkecamatan(response.data[0].kecamatan);
      setprovinsi(response.data[0].provinsi);
      setdetail(response.data[0].detail);
      setloading(false);
    } catch (error) {
      swal("Error", error.message, "error");
      setloading(false);
    }
  }, [id]);
  useEffect(() => {
    AxiosDetail();
  }, [AxiosDetail]);

  const AxiosEdit = async (e) => {
    e.preventDefault();
    try {
      setloadings(true);
      const url = `${process.env.REACT_APP_SERVER_API}/api/address/update/${id}`;
      const currentUser = JSON.parse(localStorage.getItem("user"));
      await axios.patch(
        url,
        {
          name: name,
          detail: detail,
          kabupaten: kabupaten,
          kelurahan: kelurahan,
          provinsi: provinsi,
          kecamatan: kecamatan,
        },
        {
          headers: {
            Authorization: `Bearer ${currentUser.token}`,
          },
        }
      );
      setloadings(false);
      swal("Success", "Congrate you Updated Data", "success");
      Navigate("/address");
    } catch (error) {
      setloadings(false);
      swal("Error", error.message, "error");
    }
  };

  return (
    <div>
      <Card className="mt-3">
        <Card.Header className="bg-warning text-white">
          {" "}
          Edit Product
        </Card.Header>
        <Form onSubmit={AxiosEdit}>
          <Card.Body>
            {loading ? (
              <Button className="btn btn-secondary w-100" disabled>
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
              <Row>
                <Col sm={6}>
                  <Form.Group>
                    <Form.Label>Kabupaten</Form.Label>
                    <Form.Select
                      className="form-control form-sm w-50"
                      onChange={(e) => setkabupaten(e.target.value)}
                      value={kabupaten}
                      id="kabupaten"
                    >
                      <option>{kabupaten}</option>
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
                      <option>{kelurahan}</option>
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
                      <option>{kecamatan}</option>
                      <AxiosKecamatan />
                    </Form.Select>
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>Provinsi</Form.Label>
                    <Form.Select
                      onChange={(e) => setprovinsi(e.target.value)}
                      value={provinsi}
                      id="provinsi"
                      className="form-control form-sm w-50"
                    >
                      <option>{provinsi}</option>
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
                      id="detail"
                      as="textarea"
                      rows={3}
                    />
                  </Form.Group>
                </Col>
              </Row>
            )}
          </Card.Body>
          <Card.Footer>
            {loadings ? (
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
              <Button type ="submit" className="btn btn-warning btn-sm">
                <FontAwesomeIcon icon={faEdit} /> Edit
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

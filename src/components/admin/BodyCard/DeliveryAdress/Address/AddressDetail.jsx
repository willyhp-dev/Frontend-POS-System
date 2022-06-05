import { faBackspace } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { Button, Card, Col, Row, Spinner } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import swal from "sweetalert";

export default function AddressDetail() {
  const [kabupaten, setkabupaten] = useState();
  const [kelurahan, setkelurahan] = useState();
  const [kecamatan, setkecamatan] = useState();
  const [name, setname] = useState();
  const [provinsi, setprovinsi] = useState();
  const [detail, setdetail] = useState();
  const [loading, setloading] = useState(false);

  const { id } = useParams();
  const AxiosDetail = useCallback(async () => {
    try {
      setloading(true);
      const currentUser = JSON.parse(localStorage.getItem("user"));
      const url = `${process.env.REACT_APP_SERVER_API}/api/address/${id}`;
      let response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${currentUser.token}`,
        },
      });
      setloading(false);
      setdetail(response.data[0].detail);
      setkabupaten(response.data[0].kabupaten);
      setkelurahan(response.data[0].kelurahan);
      setprovinsi(response.data[0].provinsi);
      setkecamatan(response.data[0].kecamatan);
      setname(response.data[0].name);
    } catch (error) {
      swal("error", error.message, "error");
    }
  }, [id]);
  useEffect(() => {
    AxiosDetail();
  }, [AxiosDetail]);

  return (
    <Card className="mt-3">
      <Card.Header className="bg-secondary text-white">
        Detail Address
      </Card.Header>
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
          <div>
            <Row>
              <Col sm={2}>Name</Col>
              <Col sm={1}>:</Col>
              <Col sm={9}>{name}</Col>
            </Row>
            <Row>
              <Col sm={2}>Kabupaten</Col>
              <Col sm={1}>:</Col>
              <Col sm={9}>{kabupaten}</Col>
            </Row>
            <Row>
              <Col sm={2}>Kelurahan</Col>
              <Col sm={1}>:</Col>
              <Col sm={9}>{kelurahan}</Col>
            </Row>
            <Row>
              <Col sm={2}>Kecamatan</Col>
              <Col sm={1}>:</Col>
              <Col sm={9}>{kecamatan}</Col>
            </Row>
            <Row>
              <Col sm={2}>Provinsi</Col>
              <Col sm={1}>:</Col>
              <Col sm={9}>{provinsi}</Col>
            </Row>
            <Row>
              <Col sm={2}>Alamat Detail</Col>
              <Col sm={1}>:</Col>
              <Col sm={9}>{detail}</Col>
            </Row>
          </div>
        )}
      </Card.Body>
      <Card.Footer>
        <Link to ="/address">
          <Button className="btn btn-secondary btn-sm">
            <FontAwesomeIcon icon={faBackspace} /> Kembali
          </Button>
        </Link>
      </Card.Footer>
    </Card>
  );
}

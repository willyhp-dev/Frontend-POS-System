import {
  faBackspace,
  faEye,
  faMoneyBill,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { Button, Card, Col, Form, Modal, Row, Spinner } from "react-bootstrap";
import { Link } from "react-router-dom";
import swal from "sweetalert";
import "./index.css";

export default function CheckoutPage() {
  const [loading, setloading] = useState(false);
  const [loadingDetail, setloadingDetail] = useState(false);
  const [alamat, setalamat] = useState([]);
  const [alamatdetail, setalamatdetail] = useState([]);
  const [alamatform, setalamatform] = useState();
  const [cart, setcart] = useState([]);
  const [show, setShow] = useState(false);
  const [hasil, sethasil] = useState([]);
  console.log(hasil);

  const currentUser = JSON.parse(localStorage.getItem("user"));
  const AxiosAddress = useCallback(async () => {
    try {
      setloading(true);
      const currentUser = JSON.parse(localStorage.getItem("user"));
      const url = `http://localhost:4000/api/address`;
      let response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${currentUser.token}`,
        },
      });
      console.log("Alamat");
      setalamat(response.data.data);
      setloading(false);
    } catch (error) {
      swal("Error", error.message, "error");
      setloading(false);
    }
  }, []);
  useEffect(() => {
    AxiosAddress();
  }, [AxiosAddress]);

  const AlamatForm = ({ option }) => {
    return (
      <select
        onChange={(e) => setalamatform(e.target.value)}
        value={alamatform}
        className="form-control"
      >
        <option value="">--pilih Alamat---</option>
        {alamat.map((item) => (
          <option value={item.name}>
            <p>{item.name}</p> {""}
          </option>
        ))}
      </select>
    );
  };

  const AxiosAddressDetail = async (name) => {
    try {
      console.log(name);
      if (name !== undefined) {
        setShow(true);
        setloadingDetail(true);
        const url = `http://localhost:4000/api/address?search=${name}`;
        let response = await axios.get(url, {
          headers: {
            Authorization: `Bearer ${currentUser.token}`,
          },
        });

        setalamatdetail(response.data.data);
        setloadingDetail(false);
      } else {
        setShow(true);
      }
    } catch (error) {
      setloadingDetail(false);
      swal("Error", error.message, "error");
    }
  };

  const Modalforms = () => {
    return (
      <Modal show={show} animation={false} onHide={!show}>
        <Modal.Header closeButton>
          <Modal.Title>Alamat Detail</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {loadingDetail ? (
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
          ) : alamatdetail.length === 0 ? (
            <>
              <div className="alert alert-danger">Data Tidak Ditemukan</div>
            </>
          ) : (
            <>
              <Row>
                <Col sm={3}>Provinsi</Col>
                <Col sm={1}>:</Col>
                <Col sm>{alamatdetail[0].provinsi}</Col>
              </Row>
              <Row>
                <Col sm={3}>Kabupaten</Col>
                <Col sm={1}>:</Col>
                <Col sm>{alamatdetail[0].kabupaten}</Col>
              </Row>
              <Row>
                <Col sm={3}>Kecamatan</Col>
                <Col sm={1}>:</Col>
                <Col sm>{alamatdetail[0].kecamatan}</Col>
              </Row>
              <Row>
                <Col sm={3}>Kelurahan</Col>
                <Col sm={1}>:</Col>
                <Col sm>{alamatdetail[0].kelurahan}</Col>
              </Row>
              <Row>
                <Col sm={3}>Alamat Detail</Col>
                <Col sm={1}>:</Col>
                <Col sm={8}>{alamatdetail[0].detail}</Col>
              </Row>
            </>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShow(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    );
  };
  
  const AxiosCart = useCallback(async () => {
    try {
      setloading(true);
      const currentUser = JSON.parse(localStorage.getItem("user"));
      const url = `http://localhost:4000/api/carts`;
      let response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${currentUser.token}`,
        },
      });
      setcart(response.data.data);
      

      setloading(false);
    } catch (error) {
      swal("Error", error.message, "error");
      setloading(false);
    }
  }, []);
  useEffect(() => {
    AxiosCart();
  }, [AxiosCart]);

  const CartArray = () => {
    return (
      <Row>
        <Col sm={3}>
          <b>Sub Total</b>
        </Col>
        <Col sm={1}>
          <b>:</b>
        </Col>
        <Col sm={8}>
          <Row className="borderhigh">
            <Col sm={3}>
              <b>Nama Product</b>
            </Col>
            <Col sm={3}>
              <b>Harga Product</b>
            </Col>
            <Col sm={3}>
              <b>QTY Product</b>
            </Col>
            <Col sm={3}>
              <b>Jumlah Harga</b>
            </Col>
          </Row>
          <Row className="borderhigh">
            {cart.map((item,index) => (
              <>
                <Col sm={3}>{item.product.name}</Col>
                <Col sm={3}>{item.product.price}</Col>
                <Col sm={3}>{item.qty}</Col>
                <Col sm={3}>{item.product.price * item.qty}</Col>
                {sethasil(item.product.price * item.qty)}
                 {sethasil(item.product.price * item.qty)}
                
              </>
            ))}
          </Row>
          <Row>
            <Col sm={3}></Col>
            <Col sm={3}></Col>
            <Col sm={3}>
              <b>SubTotal </b>
            </Col>
            <Col>{hasil}</Col>
          </Row>
        </Col>
      </Row>
    );
  };

  

  return (
    <div>
      <Card className="mt-3">
        <Card.Header className="bg-primary text-white"> CHECKOUT</Card.Header>
        <Card.Body>
          <Row>
            <Col sm={3}>
              <b>ALAMAT</b>
            </Col>
            <Col sm={1}>
              <b>:</b>
            </Col>
            <Col sm={8}>
              <Row>
                <Col sm={10}>
                  <AlamatForm />
                </Col>
                <Col sm>
                  <Button
                    onClick={() => AxiosAddressDetail(alamatform)}
                    className="btn btn-secondary btn-sm"
                  >
                    <FontAwesomeIcon icon={faEye} />
                  </Button>
                  <Modalforms />
                </Col>
              </Row>
            </Col>
          </Row>
          <div className="border mb-2 mt-2"></div>
          <CartArray />
          <div className="border  mb-2 mt-2"></div>
          <Row>
            <Col sm={3}>
              <b>Ongkir</b>
            </Col>
            <Col sm={1}>
              <b>:</b>
            </Col>
            <Col sm={8}>
              20000
            </Col>
          </Row>
          <div className="border mb-2 mt-2"></div>
          <Row>
            <Col sm={3}>
              <b>TOTAL</b>
            </Col>
            <Col sm={1}>
              <b>:</b>
            </Col>
            <Col sm={8}>{ }</Col>
          </Row>
        </Card.Body>
        <Card.Footer>
          <Link to="/cart">
            <Button className="btn btn-secondary btn-sm">
              <FontAwesomeIcon icon={faBackspace} /> Back
            </Button>
          </Link>
          <Link to="/InvoiceForm">
            <Button className="float-right btn btn-secondary btn-sm">
              <FontAwesomeIcon icon={faMoneyBill} /> CheckOut
            </Button>
          </Link>
        </Card.Footer>
      </Card>
    </div>
  );
}

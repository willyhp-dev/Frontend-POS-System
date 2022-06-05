import {
  faBackspace,
  faEye,
  faMoneyBill,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { Button, Card, Col, Modal, Row, Spinner } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import swal from "sweetalert";
import "./index.css";

export default function CheckoutPage() {

  const [loadingDetail, setloadingDetail] = useState(false);
  const [loadingCheckOut, setloadingCheckOut] = useState(false);
  const [alamat, setalamat] = useState([]);
  const [alamatdetail, setalamatdetail] = useState([]);
  const [alamatform, setalamatform] = useState();
  const [cart, setcart] = useState([]);
  const [show, setShow] = useState(false);
  const deliveryFee = 20000;
  const Navigate = useNavigate();

  let total = 0;

  cart.forEach((element) => {
    const hasil = element.product.price * element.qty;
    total += hasil;
  });
  let allTotal = total + deliveryFee;

  const currentUser = JSON.parse(localStorage.getItem("user"));
  const AxiosAddress = useCallback(async () => {
    try {
     
      const currentUser = JSON.parse(localStorage.getItem("user"));
      const url = `${process.env.REACT_APP_SERVER_API}/api/address`;
      let response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${currentUser.token}`,
        },
      });
      setalamat(response.data.data);
    
    } catch (error) {
      swal("Error", error.message, "error");

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
          <option value={item._id}>
            <p>{item.name}</p> {""}
          </option>
        ))}
      </select>
    );
  };

  const AxiosAddressDetail = async (id) => {
    try {
      if (id !== undefined) {
        setShow(true);
        
        const url = `${process.env.REACT_APP_SERVER_API}/api/address/${id}`;
        let response = await axios.get(url, {
          headers: {
            Authorization: `Bearer ${currentUser.token}`,
          },
        });

        setalamatdetail(response.data.data);
       
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
  
      const currentUser = JSON.parse(localStorage.getItem("user"));
      const url = `${process.env.REACT_APP_SERVER_API}/api/carts`;
      let response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${currentUser.token}`,
        },
      });
      setcart(response.data.data);


    } catch (error) {
      swal("Error", error.message, "error");

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
            {cart.map((item, index) => (
              <>
                <Col sm={3}>{item.product.name}</Col>
                <Col sm={3}>{item.product.price}</Col>
                <Col sm={3}>{item.qty}</Col>
                <Col sm={3}>{item.product.price * item.qty}</Col>
              </>
            ))}
          </Row>
          <Row>
            <Col sm={3}></Col>
            <Col sm={3}></Col>
            <Col sm={3}>
              <b>SubTotal </b>
            </Col>
            <Col>{total}</Col>
          </Row>
        </Col>
      </Row>
    );
  };

  const CheckOut = async () => {
    try {
      setloadingCheckOut(true);
      if (alamatform === undefined) {
        swal("Error", "Wajib Input Alamat", "error");
        setloadingCheckOut(false);
      } else {
        const url = `${process.env.REACT_APP_SERVER_API}/api/orders`;
        await axios.post(
          url,
          { delivery_fee: deliveryFee, delivery_address: alamatform },
          {
            headers: {
              Authorization: `Bearer ${currentUser.token}`,
            },
          }
        );
        swal("Success", "Success Created OrderCart", "success");
        setloadingCheckOut(false);
        Navigate("/Invoice");
      }
    } catch (error) {
      swal("Error", error.message, "error");
    }
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
            <Col sm={8}>{deliveryFee}</Col>
          </Row>
          <div className="border mb-2 mt-2"></div>
          <Row>
            <Col sm={3}>
              <b>TOTAL</b>
            </Col>
            <Col sm={1}>
              <b>:</b>
            </Col>
            <Col sm={8}>{allTotal}</Col>
          </Row>
        </Card.Body>
        <Card.Footer>
          <Link to="/cart">
            <Button className="btn btn-secondary btn-sm">
              <FontAwesomeIcon icon={faBackspace} /> Back
            </Button>
          </Link>
          {loadingCheckOut ? (
            <Button className="btn btn-secondary" disabled>
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
            <Button
              onClick={() => CheckOut()}
              className="float-right btn btn-secondary btn-sm"
            >
              <FontAwesomeIcon icon={faMoneyBill} /> CheckOut
            </Button>
          )}
        </Card.Footer>
      </Card>
    </div>
  );
}

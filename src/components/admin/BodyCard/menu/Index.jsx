import { faCartPlus, faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Card, Col, Form, Row } from "react-bootstrap";
import { Link } from "react-router-dom";


export default function MenuPage() {
  const currentUser = JSON.parse(localStorage.getItem("user"));
  const ArrayMenu = [
    {
      index: 1,
      title: "Beef",
      category: "Utama",
      tag: " Seafood",
      price: "Rp 20.000",
    },
    {
      index: 2,
      title: "Potato",
      category: "Utama",
      tag: " Seafood",
      price: "Rp 20.000",
    },
    {
      index: 3,
      title: "Chitato",
      category: "Utama",
      tag: " Snack",
      price: "Rp 20.000",
    },
  ];
  const MenuItem = ({ title, category, tag, price }) => {
    return (
      <Col sm={4}>
        <Card className="shadow" style={{ width: "18rem" }}>
          <Card.Img variant="top" height={200} src="holder.js/100px180" />
          <Card.Body>
            <Card.Title className="p-0 m-0">{title}</Card.Title>
            <Card.Text className="p-0 m-0">
              <small>{category}</small>
            </Card.Text>
            <Card.Text className="p-0 m-0">
              <small className="bg-secondary text-white rounded p-1">
                {tag}
              </small>
            </Card.Text>
            <Card.Text className="p-0 m-0 mb-2">
              <small>
                <b>{price}</b>
              </small>
            </Card.Text>
        {
              currentUser === null ? (
                <div><small>Please Login Your Account first</small></div>
              ):(
                <Button variant="primary" className="btn btn-sm">
                <FontAwesomeIcon icon={faCartPlus} />
              </Button>
          )
        }
            
          </Card.Body>
        </Card>
      </Col>
    );
  };
  return (
    <div>
      <Card className="mt-3">
        <Card.Header>
          <Row>
            <Col sm={6}>
              <Form.Select className="form-control w-50" size="sm">
                <option>Search Category</option>
              </Form.Select>
            </Col>
            <Col sm={6}>
              <div className="float-right">
                <Link to="/cart">
                  <Button className="btn btn-sm">
                    <FontAwesomeIcon icon={faCartShopping} />
                  </Button>
                </Link>
              </div>
            </Col>
          </Row>
        </Card.Header>
    
          <Card.Body>
            <Row>
              {ArrayMenu.map((menu) => (
                <MenuItem
                  title={menu.title}
                  category={menu.category}
                  tag={menu.tag}
                  price={menu.price}
                />
              ))}
            </Row>
          </Card.Body>
        
        <Card.Footer></Card.Footer>
      </Card>
    </div>
  );
}

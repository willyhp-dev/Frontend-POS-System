import { Button, Card, Col, Row } from "react-bootstrap";
export default function PageBody() {
    return (
         <Card className="shadow">
          <Card.Body>
            <Row>
              <Col sm={4}>
                <Card className="shadow" style={{ width: "18rem" }}>
                  <Card.Img
                    variant="top"
                    height={200}
                    src="holder.js/100px180"
                  />
                  <Card.Body>
                    <Card.Title className="p-0 m-0">Beef</Card.Title>
                    <Card.Text className="p-0 m-0">
                      <small>Utama</small>
                    </Card.Text>
                    <Card.Text className="p-0 m-0">
                      <small className="bg-secondary text-white rounded p-1">
                        Seafood
                      </small>
                    </Card.Text>
                    <Card.Text className="p-0 m-0 mb-2">
                      <small>
                        <b>Rp 12.000</b>
                      </small>
                    </Card.Text>
                    <Button variant="primary" className="btn btn-sm">Cart</Button>
                  </Card.Body>
                </Card>
              </Col>
              <Col sm={4}>
              <Card className="shadow" style={{ width: "18rem" }}>
                  <Card.Img
                    variant="top"
                    height={200}
                    src="holder.js/100px180"
                  />
                  <Card.Body>
                    <Card.Title className="p-0 m-0">Beef</Card.Title>
                    <Card.Text className="p-0 m-0">
                      <small>Utama</small>
                    </Card.Text>
                    <Card.Text className="p-0 m-0">
                      <small className="bg-secondary text-white rounded p-1">
                        Seafood
                      </small>
                    </Card.Text>
                    <Card.Text className="p-0 m-0 mb-2">
                      <small>
                        <b>Rp 12.000</b>
                      </small>
                    </Card.Text>
                    <Button variant="primary" className="btn btn-sm">Cart</Button>
                  </Card.Body>
                </Card>
              </Col>
                          <Col sm={4}>
                          <Card className="shadow" style={{ width: "18rem" }}>
                  <Card.Img
                    variant="top"
                    height={200}
                    src="holder.js/100px180"
                  />
                  <Card.Body>
                    <Card.Title className="p-0 m-0">Beef</Card.Title>
                    <Card.Text className="p-0 m-0">
                      <small>Utama</small>
                    </Card.Text>
                    <Card.Text className="p-0 m-0">
                      <small className="bg-secondary text-white rounded p-1">
                        Seafood
                      </small>
                    </Card.Text>
                    <Card.Text className="p-0 m-0 mb-2">
                      <small>
                        <b>Rp 12.000</b>
                      </small>
                    </Card.Text>
                    <Button variant="primary" className="btn btn-sm">Cart</Button>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </Card.Body>
        </Card>
    )
}
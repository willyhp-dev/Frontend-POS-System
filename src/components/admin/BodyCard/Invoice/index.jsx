import { Card, Table } from "react-bootstrap";

export default function InvoicePage() {
  const Thead = () => {
    return (
      <thead>
        <tr>
          <th>No</th>
          <th>Sub Total</th>
          <th>Delivery Fee</th>
          <th>Delivery Address</th>
          <th>Total</th>
          <th>Status</th>
        </tr>
      </thead>
    );
  };
  const Tbody = () => {};
  return (
    <div>
      <Card className="mt-3">
        <Card.Header className="bg-success text-white">Invoice</Card.Header>
        <Card.Body>
          <Table striped bordered hover size="sm">
            <Thead />
            <Tbody />
          </Table>
        </Card.Body>
        <Card.Footer></Card.Footer>
      </Card>
    </div>
  );
}

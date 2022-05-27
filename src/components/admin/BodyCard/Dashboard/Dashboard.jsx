import { Card, Row } from "react-bootstrap";
import { DataPage, CardDashboard } from "./CustomHook";

export default function DashboardPage() {
  return (
    <Card className="mt-3">
      <Card.Header>DASHBOARD</Card.Header>
      <Card.Body>
        <Row className=" mr-2">
          {DataPage.map((page) => (
            <CardDashboard
              key={page.index}
              variant={page.variant}
              number={page.number}
              name={page.name}
              icon={page.icon}
            />
          ))}
        </Row>
      </Card.Body>
    </Card>
  );
}

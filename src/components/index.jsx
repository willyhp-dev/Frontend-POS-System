
import { Container} from "react-bootstrap";
import PageBody from "./Body";
import PageNavbar from "./navbar";

export default function MainPage() {
  return (
    <div>
      <PageNavbar />
      <Container className="mt-4">
       <PageBody/>
      </Container>
    </div>
  );
}

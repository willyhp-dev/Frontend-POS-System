import { Col, Form, Row } from "react-bootstrap";

const ArrayForm = [
  {
    index: 1,
    name: "name",
    placeholder: "Example: CocaCola",
    label: "Nama Product",
  },
  {
    index: 2,
    name: "price",
    placeholder: "Example:  20000",
    label: "Harga Product",
  },
  {
    index: 3,
    name: "description",
    placeholder: "Menjelaskan Value Product",
    label: "Description",
  },
];
const TagArray = [
  { index: 1, name: "Manisan" },
  { index: 2, name: "Mainan" },
  { index: 3, name: "Minuman" },
  { index: 4, name: "Bread" },
];
const categoryarray = [
  { index: 1, name: "Utama" },
  { index: 2, name: "Makanan" },
  { index: 3, name: "Minuman" },
  { index: 4, name: "Manisan" },
];

const FormControl = ({ name, key, placeholder, label }) => {
  return (
    <Form.Group as={Row} key={key}>
      <Form.Label column sm="3">
        {label}
      </Form.Label>
      <Col sm="10">
        <Form.Control type="text" name={name} placeholder={placeholder} />
      </Col>
    </Form.Group>
  );
};
const Imagefiles = ({ label }) => {
  return (
    <Form.Group as={Row}>
      <Form.Label column sm="3">
        {label}
      </Form.Label>
      <Col sm="10">
        <Form.Control type="file" />
      </Col>
    </Form.Group>
  );
};
const TagForm = ({ name }) => {
  return (
    <Col sm={3}>
      <div key="checkbox" className="mb-3">
        <Form.Check type="checkbox">
          <Form.Check.Input type="checkbox" />
          <Form.Check.Label>{name}</Form.Check.Label>
        </Form.Check>
      </div>
    </Col>
  );
};
export { TagArray, TagForm, Imagefiles,categoryarray,FormControl,ArrayForm };

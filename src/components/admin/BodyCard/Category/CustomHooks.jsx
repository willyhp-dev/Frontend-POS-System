import { Button, Spinner } from "react-bootstrap";

const Thead = () => {
    return (
      <thead>
        <tr>
          <th width="5%">No</th>
          <th>Name</th>
          <th width="15%">Action</th>
        </tr>
      </thead>
    );
  };
  const Spinners = () => {
    return (
      <tr>
        <td colSpan={3}>
          {" "}
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
        </td>
      </tr>
    );
  };
  const LengthNull = () => {
    return(
      <tr>
      <td colSpan={3}>
        <div className="alert alert-danger">
          <center>Data Empty / Data Not Response</center>
        </div>
      </td>
    </tr>
    )
};
export {
      LengthNull,Spinners,Thead
  }
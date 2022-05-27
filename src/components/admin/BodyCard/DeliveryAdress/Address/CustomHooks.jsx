import {
  faEdit,
  faEye,
  faLocation,
  faPlus,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
const ArrayLink = [
  {
    index: 1,
    link: "/address/store",
    icon: faPlus,
    name: "Add",
    variant: "primary",
  },
  {
    index: 2,
    link: "/address/kabupaten",
    name: "kabupaten",
    icon: faLocation,
    variant: "secondary",
  },
  {
    index: 3,
    link: "/address/kecamatan",
    name: "kecamatan",
    icon: faLocation,
    variant: "secondary",
  },
  {
    index: 4,
    link: "/address/kelurahan",
    name: "kelurahan",
    icon: faLocation,
    variant: "secondary",
  },
  {
    index: 5,
    link: "/address/provinsi",
    name: "Provinsi",
    icon: faLocation,
    variant: "secondary",
  },
];
const Links = ({ link, key, name, icon, variant }) => {
  return (
    <Link bg="secondary" key={key} to={link}>
      <Button className={`btn btn-${variant} btn-sm mr-2`}>
        <FontAwesomeIcon icon={icon} /> {name}
      </Button>
    </Link>
  );
};
const Thead = () => {
  return (
    <thead>
      <tr>
        <th width="5%">No</th>
        <th width="20%">Name</th>
        <th>Alamat Detail</th>
        <th width="15%">Action</th>
      </tr>
    </thead>
  );
};
const Tbody = () => {
  return (
    <tbody>
      <tr>
        <td>1</td>
        <td>Name</td>
        <td>Alamat Detail</td>
        <td>
          <Link to="/address/edit/:id">
            <Button className="btn btn-warning btn-sm mr-2">
              {" "}
              <FontAwesomeIcon icon={faEdit} />
            </Button>
            <Button className="btn btn-danger btn-sm mr-2">
              {" "}
              <FontAwesomeIcon icon={faTrash} />
            </Button>
            <Link to="/address/detail/:id">
              <Button className="btn btn-secondary btn-sm">
                {" "}
                <FontAwesomeIcon icon={faEye} />
              </Button>
            </Link>
          </Link>
        </td>
      </tr>
    </tbody>
  );
};

export { ArrayLink, Links, Tbody, Thead };

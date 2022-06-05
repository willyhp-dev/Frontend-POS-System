import {
  faEdit,
  faEye,
  faLocation,
  faPlus,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { Button, Spinner } from "react-bootstrap";
import { Link } from "react-router-dom";
import swal from "sweetalert";
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

const AxiosKecamatan = () => {
  const [name, setname] = useState([]);
  const AxiosData = useCallback(async () => {
    const currentUser = JSON.parse(localStorage.getItem("user"));
    const url = `http://localhost:4000/api/kecamatan`;
    let response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${currentUser.token}`,
      },
    });
    setname(response.data.data);
  }, []);
  useEffect(() => {
    AxiosData();
  }, [AxiosData]);

  return name.map((item) => <option>{item.name}</option>);
};

const AxiosKelurahan = () => {
  const [name, setname] = useState([]);
  const AxiosData = useCallback(async () => {
    const currentUser = JSON.parse(localStorage.getItem("user"));
    const url = `http://localhost:4000/api/kelurahan`;
    let response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${currentUser.token}`,
      },
    });
    setname(response.data.data);
  }, []);
  useEffect(() => {
    AxiosData();
  }, [AxiosData]);
  return name.map((item) => <option>{item.name}</option>);
};

const AxiosKabupaten = () => {
  const [names, setnames] = useState([]);
  const AxiosDatas = useCallback(async () => {
    const currentUser = JSON.parse(localStorage.getItem("user"));
    const url = `http://localhost:4000/api/kabupaten`;
    let response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${currentUser.token}`,
      },
    });
    setnames(response.data.data);
  }, []);
  useEffect(() => {
    AxiosDatas();
  }, [AxiosDatas]);

  return names.map((item) => <option>{item.name}</option>);
};
const AxiosProvinsi = () => {
  const [name, setname] = useState([]);
  const AxiosData = useCallback(async () => {
    const currentUser = JSON.parse(localStorage.getItem("user"));
    const url = `http://localhost:4000/api/provinsi`;
    let response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${currentUser.token}`,
      },
    });
    setname(response.data.data);
  }, []);
  useEffect(() => {
    AxiosData();
  }, [AxiosData]);
  return name.map((item) => <option>{item.name}</option>);
};

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
        <th>Alamat</th>
        <th>Alamat Detail</th>
        <th width="15%">Action</th>
      </tr>
    </thead>
  );
};
const Tbody = () => {
  const [address, setaddress] = useState([]);
  const [loading, setloading] = useState(false);
  const [currentPage, setcurrentPage] = useState(1);
  const [itemPerPage] = useState(5);
  let items = [];
  for (
    let number = 1;
    number <= Math.ceil(address.length / itemPerPage);
    number++
  ) {
    items.push(number);
  }
  const handleClick = (event) => {
    setcurrentPage(Number(event.target.id));
  };

  const indexofLastItem = currentPage * itemPerPage;
  const indexofFirstItem = indexofLastItem - itemPerPage;
  const currentItem = address.slice(indexofFirstItem, indexofLastItem);
  const paginations = items.map((numbers) => (
    <li
      className={`btn btn-outline-primary btn-sm m-0 ${
        currentPage === numbers ? "active" : null
      } `}
      key={numbers}
      id={numbers}
      onClick={handleClick}
    >
      {numbers}
    </li>
  ));
  const AxiosData = useCallback(async () => {
    try {
      setloading(true);
      const currentUser = JSON.parse(localStorage.getItem("user"));
      const url = `${process.env.REACT_APP_SERVER_API}/api/address`;
      let response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${currentUser.token}`,
        },
      });
      setloading(false);
      setaddress(response.data.data);
    } catch (error) {
      setloading(false);
      swal("Error", error.message, "error");
    }
  }, []);
  useEffect(() => {
    AxiosData();
  }, [AxiosData]);

  const AxiosDelete = (id) => {
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this Data!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then(async (willDelete) => {
      if (willDelete) {
        try {
          setloading(true);
          const currentUser = JSON.parse(localStorage.getItem("user"));
          const url = `${process.env.REACT_APP_SERVER_API}/api/address/delete/${id}`;
          await axios
            .delete(url, {
              headers: {
                Authorization: `Bearer ${currentUser.token}`,
              },
            })
            .then(() => AxiosData());
          setloading(false);
          swal("Success", "Congrate you Deleted Address Data", "success");
        } catch (error) {
          setloading(false);
          swal("Error", error.message, "error");
        }
      } else {
        swal("Your Data is safe!");
      }
    });
  };

  return (
    <tbody>
      {loading ? (
        <tr>
          <td colSpan={5}>
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
      ) : currentItem.length === 0 ? (
        <tr>
          <td colSpan={5}>
            <div className="alert alert-danger">
              <center>Data Empty / Data Not Response</center>
            </div>
          </td>
        </tr>
      ) : (
        currentItem.map((item, index) => (
          <tr>
            <td>{(index += 1)}</td>
            <td>{item.name}</td>
            <td>
              {item.kecamatan} {item.kabupaten} {item.kelurahan},{" "}
              {item.provinsi}
            </td>
            <td>{item.detail}</td>
            <td>
              <Link to={`/address/edit/${item._id}`}>
                <Button className="btn btn-warning btn-sm mr-2">
                  {" "}
                  <FontAwesomeIcon icon={faEdit} />
                </Button>
              </Link>
              <Button
                onClick={() => AxiosDelete(item._id)}
                className="btn btn-danger btn-sm mr-2"
              >
                {" "}
                <FontAwesomeIcon icon={faTrash} />
              </Button>
              <Link to={`/address/detail/${item._id}`}>
                <Button className="btn btn-secondary btn-sm">
                  {" "}
                  <FontAwesomeIcon icon={faEye} />
                </Button>
              </Link>
            </td>
          </tr>
        ))
      )}
      <ul className=" mt-3">{paginations}</ul>
    </tbody>
  );
};

export {
  ArrayLink,
  Links,
  Tbody,
  Thead,
  AxiosKabupaten,
  AxiosKelurahan,
  AxiosKecamatan,
  AxiosProvinsi,
};

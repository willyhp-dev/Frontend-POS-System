import {
  faShop,
  faTags,
  faUser,
  faWarehouse,
} from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { Button, Card, Row, Spinner } from "react-bootstrap";
import swal from "sweetalert";
import { CardDashboard } from "./CustomHook";

export default function DashboardPage() {
  const [product, setproduct] = useState([]);
  const [tag, settag] = useState([]);
  const [category, setcategory] = useState([]);
  const [user, setuser] = useState([]);
  const [Invoice, setInvoice] = useState([]);
  const [loading, setloading] = useState(false);

  const currentUser = JSON.parse(localStorage.getItem("user"));
  
 
  const AxiosProduct = useCallback(async () => {
    try {
      setloading(true);
      const currentUser = JSON.parse(localStorage.getItem("user"));
      const url = `${process.env.REACT_APP_SERVER_API}/api/products`;
      let response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${currentUser.token}`,
        },
      });
    
      setproduct(response.data.count);
      setloading(false);
    } catch (error) {
      setloading(false);
      swal("Error", error.message, "error");
    }
  }, []);
  useEffect(() => {
    AxiosProduct();
  }, [AxiosProduct]);

 

  const AxiosTag = useCallback(async () => {
    try {
      setloading(true);
      const currentUser = JSON.parse(localStorage.getItem("user"));
      const url = `${process.env.REACT_APP_SERVER_API}/api/tag`;
      let response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${currentUser.token}`,
        },
      });
      
      settag(response.data.count);
      setloading(false);
    } catch (error) {
      setloading(false);
      swal("Error", error.message, "error");
    }
  }, []);
  useEffect(() => {
    AxiosTag();
  }, [AxiosTag]);

  const AxiosCategory = useCallback(async () => {
    try {
      setloading(true);
      const currentUser = JSON.parse(localStorage.getItem("user"));
      const url = `${process.env.REACT_APP_SERVER_API}/api/category`;
      let response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${currentUser.token}`,
        },
      });
     
      setcategory(response.data.count);
      setloading(false);
    } catch (error) {
      setloading(false);
      swal("Error", error.message, "error");
    }
  }, []);
  useEffect(() => {
    AxiosCategory();
  }, [AxiosCategory]);

  const AxiosUser = useCallback(async () => {
    try {
      setloading(true);
      const currentUser = JSON.parse(localStorage.getItem("user"));
      const url = `${process.env.REACT_APP_SERVER_API}/api/auth/user`;
      let response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${currentUser.token}`,
        },
      });
    
      setuser(response.data.count);
      setloading(false);
    } catch (error) {
      setloading(false);
      swal("Error", error.message, "error");
    }
  }, []);
  useEffect(() => {
    AxiosUser();
  }, [AxiosUser]);

  const AxiosInvoice = useCallback(async () => {
    try {
      setloading(true);
      const currentUser = JSON.parse(localStorage.getItem("user"));
      const url = `${process.env.REACT_APP_SERVER_API}/api/orders`;
      let response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${currentUser.token}`,
        },
      });
  
      setInvoice(response.data.count);
      setloading(false);
    } catch (error) {
      setloading(false);
      swal("Error", error.message, "error");
    }
  }, []);
  useEffect(() => {
    AxiosInvoice();
  }, [AxiosInvoice]);

  const DataPage = [
    {
      index: 1,
      variant: "primary",
      number: product,
      name: "product",
      icon: faWarehouse,
    },
    { index: 2, variant: "danger", number: tag, name: "Tag", icon: faTags },
    {
      index: 3,
      variant: "success",
      number: category,
      name: "Category",
      icon: faShop,
    },
    {
      index: 4,
      variant: "secondary",
      number: user,
      name: "User",
      icon: faUser,
    },
    {
      index: 5,
      variant: "secondary",
      number: Invoice,
      name: "Invoices",
      icon: faUser,
    },
  ];

  return (
    <Card className="mt-3">
      <Card.Header>{ currentUser.user.role}</Card.Header>
      <Card.Body>
        <Row className=" mr-2">
          {loading ?(
            <Button className ="btn btn-secondary w-100" disabled>
              <Spinner
                as="span"
                animation="grow"
                size="sm"
                role="status"
                aria-hidden="true"
              />
              Loading...
            </Button>
          ) : (currentUser.user.role ==="admin"?(DataPage.map((page) => (
            <CardDashboard
              key={page.index}
              variant={page.variant}
              number={page.number}
              name={page.name}
              icon={page.icon}
            />
          ))) : (
                <div>Selamat Datang POS System</div>
          )
            
          )}
        </Row>
      </Card.Body>
    </Card>
  );
}

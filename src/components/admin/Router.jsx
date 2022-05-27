import { Route, Routes } from "react-router-dom";
import CategoryPage from "./BodyCard/Category/Category";
import CategoryAdd from "./BodyCard/Category/CategoryAdd";
import CategoryEdit from "./BodyCard/Category/CategoryEdit";
import DashboardPage from "./BodyCard/Dashboard/Dashboard";
import AddressPage from "./BodyCard/DeliveryAdress/Address/Address";
import AddressAdd from "./BodyCard/DeliveryAdress/Address/AddressAdd";
import AddressDetail from "./BodyCard/DeliveryAdress/Address/AddressDetail";
import AddressEdit from "./BodyCard/DeliveryAdress/Address/AddressEdit";
import KabupatenPage from "./BodyCard/DeliveryAdress/kabupaten/kabupaten";
import KecamatanPage from "./BodyCard/DeliveryAdress/kecamatan/kecamatan";
import KeluarahanPage from "./BodyCard/DeliveryAdress/Kelurahan/kelurahan";
import ProvinsiPage from "./BodyCard/DeliveryAdress/provinsi/provinsi";
import InvoicePage from "./BodyCard/Invoice";
import PageLogin from "./BodyCard/LoginRegister";
import RegisterPage from "./BodyCard/LoginRegister/Register";
import CartPage from "./BodyCard/menu/Cart";
import CheckoutPage from "./BodyCard/menu/CheckOut";
import MenuPage from "./BodyCard/menu/Index";
import InvoiceFormPage from "./BodyCard/menu/InvoiceForm";
import ProductPage from "./BodyCard/Product/Product";
import ProductAdd from "./BodyCard/Product/ProductAdd";
import ProductDetail from "./BodyCard/Product/ProductDetail";
import ProductEdit from "./BodyCard/Product/ProductEdit";
import TagAdd from "./BodyCard/Tags/TagAdd";
import TagPage from "./BodyCard/Tags/Tags";
import TagDetail from "./BodyCard/Tags/TagsDetail";
import TagEdit from "./BodyCard/Tags/TagsEdit";

export default function RouterPage() {
  const currentUser = JSON.parse(localStorage.getItem("user"));

  return (
    <div>
      {currentUser === null ? (
        <Routes>
          <Route path="/" element={<DashboardPage />}>
            Dashboard
          </Route>
          <Route path="/login" element={<PageLogin />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/menu" element={<MenuPage />} />
        </Routes>
      ) : currentUser.user.role === "user" ? (
        <Routes>
          <Route path="/" element={<DashboardPage />}>
            Dashboard
          </Route>
          <Route path="/menu" element={<MenuPage />} />
          <Route path="/Invoice" element={<InvoicePage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/InvoiceForm" element={<InvoiceFormPage />} />
        </Routes>
      ) : (
        <Routes>
          <Route path="/" element={<DashboardPage />}>
            Dashboard
          </Route>
          <Route path="/product" element={<ProductPage />} />
          <Route path="/product/store" element={<ProductAdd />} />
          <Route path="/product/edit/:id" element={<ProductEdit />} />
          <Route path="/product/detail/:id" element={<ProductDetail />} />
          <Route path="/tag" element={<TagPage />} />
          <Route path="/tag/store" element={<TagAdd />} />
          <Route path="/tag/edit/:id" element={<TagEdit />} />
          <Route path="/tag/detail/:id" element={<TagDetail />} />
          <Route path="/category" element={<CategoryPage />} />
          <Route path="/category/store" element={<CategoryAdd />} />
          <Route path="/category/edit/:id" element={<CategoryEdit />} />
          <Route path="/address" element={<AddressPage />} />
          <Route path="/address/store" element={<AddressAdd />} />
          <Route path="/address/edit/:id" element={<AddressEdit />} />
          <Route path="/address/detail/:id" element={<AddressDetail />} />
          <Route path="/address/kabupaten" element={<KabupatenPage />} />
          <Route path="/address/kelurahan" element={<KeluarahanPage />} />
          <Route path="/address/kecamatan" element={<KecamatanPage />} />
          <Route path="/address/provinsi" element={<ProvinsiPage />} />
        </Routes>
      )}
    </div>
  );
}

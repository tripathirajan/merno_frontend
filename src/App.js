import { Routes, Route, Navigate } from "react-router-dom";
import PersistLogin from "./components/PersistLogin";
import AuthLayout from "./layout/AuthLayout";
import DashboardLayout from "./layout/DashboardLayout";
import ChangePassword from "./pages/Auth/ChangePassword";
import ForgotPassword from "./pages/Auth/ForgotPassword";
import Login from "./pages/Auth/Login";
import Dashboard from "./pages/Dashboard";
import ProductList from "./pages/Products";
import AddProduct from "./pages/Products/AddProduct";

import Brand from "./pages/Master/Brand";
import ProductCategory from "./pages/Master/ProductCategory";
import PackageType from "./pages/Master/PackageType";
import Unit from "./pages/Master/Unit";
import Currency from "./pages/Master/Currency";
import Vendor from "./pages/Vendor";
import AddVendor from "./pages/Vendor/AddVendor";
import ViewVendor from "./pages/Vendor/ViewVendor";
import { AuthProvider } from "./contexts/AuthContext";
import Profile from "./pages/MyPage/Profile";
import Settings from "./pages/MyPage/Settings";
import Users from "./pages/Users";
import AddUser from "./pages/Users/AddUser";
import Toaster from "./components/Toaster";
import ViewUser from "./pages/Users/ViewUser";
import Roles from "./pages/Roles";

function App() {
  return (
    <AuthProvider>
      <Toaster />
      <Routes>
        <Route path="/">
          <Route index element={<Navigate to="/login" replace />} />
          <Route element={<AuthLayout />}>
            <Route path='login' element={<Login />} />
            <Route path="forgotPassword" element={<ForgotPassword />} />
            <Route path="changePassword/:token" element={<ChangePassword />} />
            <Route index element={<Navigate to="/login" replace />} />
          </Route>
          <Route element={<PersistLogin />}>
            <Route element={<DashboardLayout />}>
              <Route path='dashboard' element={<Dashboard />} />
              {/* product section */}
              <Route path="product">
                <Route index={true} element={<ProductList />} />
                <Route path="add" element={<AddProduct />} />
                <Route path="edit/:productId" element={<>edit</>} />
              </Route>
              {/* vendor section */}
              <Route path="vendor">
                <Route index={true} element={<Vendor />} />
                <Route path="add" element={<AddVendor />} />
                <Route path="view/:vendorId" element={<ViewVendor />} />
              </Route>
              {/* master section */}
              <Route path="product-category" element={<ProductCategory />} />
              <Route path="brand" element={<Brand />} />
              <Route path="package-type" element={<PackageType />} />
              <Route path="unit" element={<Unit />} />
              <Route path="currency" element={<Currency />} />

              {/* my-page  */}
              <Route path="profile" element={<Profile />} />
              <Route path="settings" element={<Settings />} />
              <Route path="user-mgt">
                <Route index element={<Users />} />
                <Route path="add" element={<AddUser />} />
                <Route path="view/:userId" element={<ViewUser />} />
              </Route>
              <Route path="role-mgt" element={<Roles />} />
            </Route>
          </Route>
          <Route
            path="*"
            element={<h3>404 Not Found!</h3>}
          />
        </Route>
        <Route
          path="*"
          element={<h3>404 Not Found!</h3>}
        />
      </Routes>
    </AuthProvider>

  );
}

export default App;

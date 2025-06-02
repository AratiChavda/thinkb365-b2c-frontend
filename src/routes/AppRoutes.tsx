import { Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "@/pages/dashboard";
import UserManagement from "@/pages/dashboard/UserManagement";
import LandingPage from "@/pages/LandingPage";
import Products from "@/pages/Products";
import ComparePage from "@/pages/ComparePage";
import CheckoutPage from "@/pages/CheckoutPage";
import { Login } from "@/pages/loginPage";
import { PaymentPage } from "@/pages/payment/PaymentPage";
import BillingPage from "@/pages/dashboard/billingPage";
import PaymentMethodsPage from "@/pages/dashboard/paymentMethodMangement";
import AdminLayout from "@/components/admin/layout";
import PublicLayout from "@/pages/publicLayout";
import BrandPage from "@/pages/dashboard/admin/brandPage";
import CategoryPage from "@/pages/dashboard/admin/categoryPage";
import ProductPage from "@/pages/dashboard/admin/productPage";
import SubscriptionPage from "@/pages/dashboard/admin/subscriptionPage";
import OfferPage from "@/pages/dashboard/admin/offerPage";
import PromoCodePage from "@/pages/dashboard/admin/promoCodePage";
import AddOnPage from "@/pages/dashboard/admin/addOnsPage";
import HouseHoldLayout from "@/components/houseHold/layout";
import PlansPage from "@/pages/plansPage";
import ProductDetailPage from "@/pages/productDetailPage";
import SuccessPage from "@/pages/successPage";
import { useSelector } from "react-redux";

export default function AppRoutes() {
  const isAuthenticated = useSelector((state: any) => state.auth?.accessToken);
  const userRole: any = useSelector((state: any) => state.auth?.user?.role);
  
  const RoleBasedLayout = () => {
    switch (userRole) {
      case "administrator":
        return <AdminLayout />;
      case "household_subscriber":
        return <HouseHoldLayout />;
      default:
        return <div>Unauthorized</div>;
    }
  };

  return (
    <Routes>
      <Route
        path="/login"
        element={!isAuthenticated ? <Login /> : <Navigate to="/dashboard" />}
      />
      <Route element={<PublicLayout />}>
        <Route path="/" element={<LandingPage />} />
        <Route path="/plans" element={<PlansPage />} />
        <Route path="/products/:id" element={<ProductDetailPage />} />
        <Route path="/success" element={<SuccessPage />} />

        <Route path="/products" element={<Products />} />
        <Route path="/payment" element={<PaymentPage />} />
        <Route path="/compare" element={<ComparePage />} />
        <Route path="/checkout" element={<CheckoutPage />} />
      </Route>
      <Route
        path="/dashboard"
        element={
          isAuthenticated ? <RoleBasedLayout /> : <Navigate to="/login" />
        }
      >
        {userRole === "administrator" && (
          <>
            <Route index element={<Dashboard />} />
            <Route path="users" element={<UserManagement />} />
            <Route path="brands" element={<BrandPage />} />
            <Route path="categories" element={<CategoryPage />} />
            <Route path="products" element={<ProductPage />} />
            <Route path="offers" element={<OfferPage />} />
            <Route path="subscriptions" element={<SubscriptionPage />} />
            <Route path="billing" element={<BillingPage />} />
            <Route path="payment-methods" element={<PaymentMethodsPage />} />
            <Route path="add-ons" element={<AddOnPage />} />
            <Route path="promotions" element={<PromoCodePage />} />
            {/* <Route path="*" element={<div>404 Not Found</div>} /> */}
          </>
        )}

        {userRole === "household_subscriber" && (
          <>
            <Route index element={<Dashboard />} />
            <Route path="subscriptions" element={<SubscriptionPage />} />
            <Route path="billing" element={<BillingPage />} />
            <Route path="payment-methods" element={<PaymentMethodsPage />} />
            {/* <Route path="*" element={<div>404 Not Found</div>} /> */}
          </>
        )}
      </Route>
      <Route path="*" element={<div>404 Not Found</div>} />
    </Routes>
  );
}

import { useLocation } from "react-router-dom";
import PaymentSuccess from "./PaymentSuccess";
import PaymentFailure from "./PaymentFailed";

export const PaymentPage = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const type = searchParams.get("type");

  if (type === "success") {
    return <PaymentSuccess />;
  } else {
    return <PaymentFailure />;
  }
};

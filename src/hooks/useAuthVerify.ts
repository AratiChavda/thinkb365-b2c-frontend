import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { userAPI } from "@/lib/api";
import { setCredentials, logout } from "@/store/slices/authSlice";

export const useAuthVerify = () => {
  const dispatch = useDispatch();
  const userId = JSON.parse(localStorage.getItem("user") || "{}")?.id;
  const accessToken = localStorage.getItem("access_token");
  
  useEffect(() => {
    const verifyAuth = async () => {
      if (userId && accessToken) {
        try {
          const { data } = await userAPI.getUserById(Number(userId));
          if (data) {
            dispatch(
              setCredentials({
                id: data.id,
                email: data.email,
                role: data.role,
                name: data.name,
              })
            );
          } else {
            dispatch(logout());
          }
        } catch (error) {
          console.error("Authentication verification failed:", error);
          dispatch(logout());
        }
      }
    };

    verifyAuth();
  }, [userId, accessToken, dispatch]);
};

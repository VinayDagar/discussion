import axios from "axios";
import { toast } from "@/components/ui/use-toast";

const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_API_URL,
});

// Alter defaults after instance has been created
instance.defaults.headers.post["Content-Type"] = "application/json";

instance.interceptors.request.use(
  (request) => {
    const AuthToken = localStorage.getItem("x-access-token");
    if (AuthToken) request.headers["x-access-token"] = AuthToken;

    return request;
  },
  (error) => {
    console.error(error);
    toast({
      title: error.message,
      variant: "destructive",
    });
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  (response) => {
    console.log(response);
    // Edit response config
    return response.data.object;
  },
  (error) => {
    console.error(error);
    toast({
      title: error.message,
      variant: "destructive",
    });
    return Promise.reject(error);
  }
);

export default instance
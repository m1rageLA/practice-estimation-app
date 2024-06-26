import axios from "axios";
import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";

export default async function deleteItem(path) {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.delete(`${process.env.API_URL}/api/${path}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.ok) {
      toast("Client deleted successfully!", {
        theme: "auto",
        type: "info",
        position: "top-center",
        autoClose: 1800,
        dangerouslyHTMLString: true,
      });
      return response.data;
    }
  } catch (error) {
    if (error.response) {
      toast(
        `The issue is on the server side, status: ${error.response.status}`,
        {
          theme: "auto",
          type: "error",
          position: "top-center",
          autoClose: 1800,
          dangerouslyHTMLString: true,
        }
      );
      throw error;
    } else if (error.request) {
      toast(error.request, {
        theme: "auto",
        type: "error",
        position: "top-center",
        autoClose: 1800,
        dangerouslyHTMLString: true,
      });
      throw error;
    } else {
      toast(error.message, {
        theme: "auto",
        type: "error",
        position: "top-center",
        autoClose: 1800,
        dangerouslyHTMLString: true,
      });
      throw error;
    }
  }
}

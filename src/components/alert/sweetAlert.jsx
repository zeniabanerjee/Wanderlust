import Swal from "sweetalert2";

const SweetAlert = (type, data, warningText) => {
  try {
    if (type === "success") {
      Swal.fire({
        position: "center",
        width: "40vw",
        icon: "success",
        title: "Success",
        text: data,
        showConfirmButton: false,
        toast: false,
        timer: 2000,
        timerProgressBar: true,
      });
    } else if (type === "error") {
      Swal.fire({
        position: "center",
        width: "40vw",
        icon: "error",
        title: "Failed",
        text: data,
        showConfirmButton: false,
        toast: false,
        timer: 2000,
        timerProgressBar: true,
      });
    } else if (type === "warning") {
      Swal.fire({
        className: "pop-top",
        icon: "warning",
        title: "Oops...",
        text: warningText,
        showConfirmButton: false,
        width: "40vh",
        timer: 1500,
        timerProgressBar: true,
      });
    }
  } catch (error) {}
};

export default SweetAlert;

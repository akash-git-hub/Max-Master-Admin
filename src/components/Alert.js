import toastr from 'toastr';
import 'toastr/build/toastr.min.css';

export const successAlert = ({ message, positionClass }) => {
  toastr.options = {
    positionClass: positionClass || 'toast-top-right',
    closeButton: true,
    timeOut: 5000, // Set the timeout to 0 to make notifications stay indefinitely
    toastClass: "animate__animated animate__bounceInRight"

  };
  toastr.success(message || "NO Msg");
}

//successAlert for fire toast/...
export const errorAlert = ({ message, positionClass }) => {

  toastr.options = {
    positionClass: positionClass || 'toast-top-right',
    closeButton: true,
    timeOut: 5000, // Set the timeout to 0 to make notifications stay indefinitely
    toastClass: "animate__animated animate__bounceInRight"
  };
  toastr.error(message || "NO Msg");
}
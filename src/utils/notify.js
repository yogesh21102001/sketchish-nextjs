import { toast } from "react-toastify";

let toastId = null;

export function notify(message) {
  if (!toast.isActive(toastId)) {
    toastId = toast(message, { icon: false });
  }
}

export function notifySuccess(message) {
  if (!toast.isActive(toastId)) {
    toastId = toast(
      <p>
        {/* <span className="success-clr">Success! </span> */}
        {message}
      </p>,
      { autoClose: 2500 }
    );
  }
}

export function notifyConfirm(message) {
  if (!toast.isActive(toastId)) {
    toastId = toast(message, { autoClose: 2500 });
  }
}

export function notifyError(message) {
  if (!toast.isActive(toastId)) {
    toastId = toast.error(message, { autoClose: 2500 });
  }
}

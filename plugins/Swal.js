import Swal from "sweetalert2";
import Vue from "vue";

const plugin = {
  install() {
    Vue._swal = Swal;
    Vue.prototype.$_swal = Swal;
  },
};

Vue.use(plugin);

let confirm = ({
  icon,
  title,
  text,
  allowOutsideClick,
  showCancelButton,
  confirmButtonText,
  cancelButtonText,
}) => {
  return Swal.fire({
    title: `${title || "Title"}`,
    text: `${text || "Text"}`,
    icon: `${icon || "question"}`,
    allowOutsideClick: allowOutsideClick || false,
    showCancelButton: showCancelButton || true,
    confirmButtonText: `${confirmButtonText || "Submit"}`,
    cancelButtonText: `${cancelButtonText || "Close"}`,
  });
};

let preConfirm = ({
  icon,
  title,
  text,
  allowOutsideClick,
  showCancelButton,
  confirmButtonText,
  cancelButtonText,
  showLoaderOnConfirm,
  preConfirm,
}) => {
  return Swal.fire({
    title: `${title || "Title"}`,
    text: `${text || "Text"}`,
    icon: `${icon || "question"}`,
    allowOutsideClick: allowOutsideClick || false,
    showCancelButton: showCancelButton || true,
    confirmButtonText: `${confirmButtonText || "Submit"}`,
    cancelButtonText: `${cancelButtonText || "Cancel"}`,
    showLoaderOnConfirm: showLoaderOnConfirm || true,
    preConfirm: preConfirm,
  });
};

let warning = ({ title, text }) => {
  return Swal.fire({
    title: `${title || "Field Error!"}`,
    text: `${text || "Please provide required fields."}`,
    icon: "error",
    allowOutsideClick: true,
  });
};

let success = ({ text, title, allowOutsideClick }) => {
  return Swal.fire({
    title: `${title || "Success!"}`,
    text: `${text || "Successfully saved changes!"}`,
    icon: "success",
    allowOutsideClick: allowOutsideClick || false,
  });
};

let error = ({ text, title }) => {
  return Swal.fire({
    title: `${title || "Oops!"}`,
    text: `${text || "Something went wrong."}`,
    icon: "error",
    allowOutsideClick: false,
    showCancelButton: false,
    confirmButtonText: "Close",
  });
};

let loading = ({ html, title }) => {
  return Swal.fire({
    title: `${title || "Submit"}`,
    html: `${html || "Processing your request. Please wait..."}`,
    timerProgressBar: true,
    allowOutsideClick: false,
    didOpen: () => {
      Swal.showLoading();
    },
  });
};

export default (ctx, inject) => {
  const swalFn = {
    preConfirm,
    confirm,
    warning,
    success,
    error,
    loading,
  };

  inject("swal", swalFn);

  ctx.$swal = swalFn;
};

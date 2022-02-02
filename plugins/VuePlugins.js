import Vue from "vue";
import moment from "moment";
import Swal from "sweetalert2";

const plugin = {
  install() {
    Vue._swal = Swal;
    Vue.moment = moment;
    Vue.prototype.$_swal = Swal;
    Vue.prototype.$moment = moment;
  },
};

Vue.use(plugin);

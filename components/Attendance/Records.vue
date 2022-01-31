<template>
  <div class="content">
    <div class="container pt-5 pb-2">
      <form id="create-account-form">
        <div class="row">
          <div class="col-sm-4 col-md-3 col-lg-3">
            <div class="card card-primary card-outline">
              <div class="card-body box-profile">
                <div class="text-center" style="position: relative">
                  <p class="text-muted text-center" style="font-size: 11px">
                    <i>** Uploaded Profile Picture **</i>
                  </p>
                  <img
                    id="user-pp"
                    class="profile-user-img img-fluid img-circle"
                    src="/img/icons/avatar.jpg"
                    alt="User profile picture"
                    style="
                      border-radius: 0;
                      width: 100%;
                      border: 2px solid #adb5bd;
                    "
                  />
                </div>

                <p class="text-muted text-center mt-3">ID: RRD-2021-001</p>
              </div>
            </div>

            <div class="form-group mb-3">
              <span class="form-control" style="height: auto">
                Ronald R. Dogomeo
              </span>
              <label class="bottom-label" v-show="true"> Full Name </label>
            </div>

            <div class="form-group mb-3">
              <span class="form-control" style="height: auto">
                Toboso, Neg. Occ. Phil.
              </span>
              <label class="bottom-label" v-show="true"> Address </label>
            </div>

            <div class="form-group mb-3">
              <span class="form-control" style="height: auto">
                BSIT / 3rd - A
              </span>
              <label class="bottom-label" v-show="true">
                Course / Year - Section
              </label>
            </div>

            <div class="form-group mb-3">
              <span class="form-control" style="height: auto"> SAMPLE </span>
              <label class="bottom-label" v-show="true"> OJT Office </label>
            </div>

            <div class="form-group mb-3">
              <span class="form-control" style="height: auto">
                Sample sample sample
              </span>
              <label class="bottom-label" v-show="true">
                OJT Office Address
              </label>
            </div>
          </div>

          <div class="col-sm-8 col-md-9 col-lg-9">
            <div class="card">
              <!-- <div class="card card-danger card-outline"> -->
              <div class="card-header">
                <h3 class="card-title">Attendance Records</h3>
              </div>
              <div class="card-body p-0 table-responsive">
                <table
                  class="table table-sm table-bordered table-head-fixed text-nowrap"
                  style="table-layout: fixed"
                >
                  <thead>
                    <tr>
                      <th class="text-center text-sm" style="width: 140px"></th>
                      <th
                        class="text-center text-sm"
                        colspan="2"
                        style="width: 200px"
                      >
                        AM
                      </th>
                      <th
                        class="text-center text-sm"
                        colspan="2"
                        style="width: 200px"
                      >
                        PM
                      </th>
                      <th class="text-center text-sm" style="width: 120px"></th>
                    </tr>
                    <tr>
                      <th
                        class="text-center text-sm"
                        style="vertical-align: middle"
                      >
                        Date
                      </th>
                      <th class="text-center text-sm">In</th>
                      <th class="text-center text-sm">Out</th>
                      <th class="text-center text-sm">In</th>
                      <th class="text-center text-sm">Out</th>
                      <th
                        class="text-center text-sm"
                        style="vertical-align: middle"
                      >
                        Total Hours
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr
                      v-for="(item, key) in [
                        1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 1, 2, 3, 4, 5, 6, 7, 8,
                        9, 10,
                      ]"
                      :key="key"
                    >
                      <td class="text-left">9/21/2021</td>
                      <td class="text-center">8:00 AM</td>
                      <td class="text-center">11:30 AM</td>
                      <td class="text-center">1:00 PM</td>
                      <td class="text-center">5:30 PM</td>
                      <td class="text-right">{{ key }}</td>
                    </tr>

                    <tr>
                      <td colspan="5" class="text-right">Total</td>
                      <td class="text-right">00:00</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <button class="btn btn-outline-success float-right">
              <i class="fas fa-file-excel"></i> Export
            </button>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import phil from "phil-reg-prov-mun-brgy";
export default {
  data: () => ({
    isLoading: false,
    first_name: "",
    middle_name: "",
    last_name: "",
    birthday: "",
    contact_no: "",
    email: "",

    password: "",

    region: "",
    regionList: [],
    province: "",
    provinceList: [],
    city: "",
    cityList: [],
    barangay: "",
    barangayList: [],
    street: "",

    company_id: "",
    user_group: "admin",

    token: "",
    unique_key: "",
    reference_id: "",
  }),

  watch: {
    async region(newVal) {
      this.province = "";
      this.provinceList = await phil.getProvincesByRegion(newVal.reg_code);
      console.log("this.cityList", this.provinceList);
      this.$nextTick(() =>
        $(`[name="province"]`)
          .selectpicker("refresh")
          .change(function () {
            let el = $(this).closest(".dropdown.bootstrap-select.v_spicker");
            $(this).valid() ? el.removeClass("is-invalid") : "";
          })
      );
    },
    async province(newVal) {
      this.city = "";
      this.cityList = await phil.getCityMunByProvince(newVal.prov_code);
      console.log("this.cityList", this.cityList);
      this.$nextTick(() =>
        $(`[name="city"]`)
          .selectpicker("refresh")
          .change(function () {
            let el = $(this).closest(".dropdown.bootstrap-select.v_spicker");
            $(this).valid() ? el.removeClass("is-invalid") : "";
          })
      );
    },
    async city(newVal) {
      this.barangay = "";
      this.barangayList = await phil.getBarangayByMun(newVal.mun_code);
      this.$nextTick(() =>
        $(`[name="barangay"]`)
          .selectpicker("refresh")
          .change(function () {
            let el = $(this).closest(".dropdown.bootstrap-select.v_spicker");
            $(this).valid() ? el.removeClass("is-invalid") : "";
          })
      );
    },
  },

  computed: {
    ...mapGetters({
      baseUrl: "getBaseUrl",
      assetUrl: "getAssetUrl",
      session: "getSession",
    }),
  },

  mounted() {
    console.log("route", this.$route);

    let key = this.$route?.query?.uid || "";
    let rid = this.$route?.query?.rid || "";
    // if (key !== 'uamadmin-unique-2021-001' && rid !== 'ojt-team-2021-001') {
    //   this.$router.push({
    //     name: "Page Not Found"
    //   })
    //   return;
    // }

    this.token = this.$route?.query?.token || "";
    this.unique_key = this.$route?.query?.uid || "";
    this.reference_id = this.$route?.query?.rid || "";

    this.regionList = phil.regions;
    this.$nextTick(() => {
      $(`.selectpicker, [name="region"]`)
        .selectpicker("refresh")
        .change(function () {
          let el = $(this).closest(".dropdown.bootstrap-select.v_spicker");
          $(this).valid() ? el.removeClass("is-invalid") : "";
        });

      $(`[name="birthday"]`).change(function () {
        $(this).valid();
      });
    });
  },

  methods: {
    validateForm() {},

    submitAccount() {
      const valid = this.validateForm();
      if (this.isLoading === true || !valid) return;
      this.isLoading = true;
      let address = [this.barangay, this.city, this.province, this.region];
      let payload = {
        company_id: this.company_id,
        first_name: this.first_name,
        middle_name: this.middle_name,
        last_name: this.last_name,
        birthday: this.birthday,
        contact_no: this.contact_no,
        email: this.email,
        address: `${this.street ? this.street + ", " : ""}${address
          .map((item) => item.name)
          .join(", ")}`,
        role: "uam-admin",
        user_group: this.user_group,
        password: this.password,
        password_confirmation: this.password, //this.confirmPassword,
        _token: this._token,
        unique_key: this.unique_key,
        reference_id: this.reference_id,
      };

      console.log("payload", payload);

      this.$swal
        .preConfirm({
          title: `Submit Registration`,
          text: `Are you sure you want to submit your account registration?`,
          preConfirm: () => {
            return this.$store
              .dispatch("UAM/createStaffAccount", payload)
              .then((response) => {
                console.log("response", response);
                if (response.status !== 200) {
                  let errors = [];
                  for (let idx in response.data) {
                    errors.push(response.data[idx]);
                  }
                  this.$swal.showValidationMessage(
                    `The following error(s) occurred: ${
                      errors?.[0] ||
                      response.status + " - Something went wrong."
                    }`
                  );
                }
              })
              .catch((error) => {
                this.$swal.showValidationMessage(
                  `The following error(s) occurred: ${errors}`
                );
              });
          },
        })
        .then((result) => {
          this.isLoading = false;
          if (!result.isConfirmed) return;
          this.$swal
            .success({
              text: "Your account was successfully created. Go to the login page to Sign in to your account",
            })
            .then(({ isConfirmed }) => {
              this.$router.push({
                name: "uam-login",
              });
            });
        });
    },

    confirmedSaveAccount(payload) {
      this.isLoading = true;
    },
  },

  beforeMount() {
    document.body.className = "";
    document.body.classList.add("hold-transition", "layout-top-nav");
    // document.body.style = "";
    // document.body.style = "min-height: 272.76px";
  },
};
</script>

<style scoped>
.bottom-label {
  display: block;
  width: 100%;
  /* margin-top: .25rem; */
  font-size: 11px;
  color: #948f8f;
  font-style: italic;
}
</style>

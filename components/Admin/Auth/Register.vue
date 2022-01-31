<template>
  <NotFound v-if="is_found_admin === true" />
  <div class="wrapper" v-else-if="is_found_admin === false">
    <nav class="main-header navbar navbar-expand-md navbar-light navbar-white">
      <div class="container">
        <span class="navbar-brand">
          <img
            :src="`${assetUrl}/img/AdminLTELogo.png`"
            alt="AdminLTE Logo"
            class="brand-image img-circle elevation-3"
            style="opacity: 0.8"
          />
          <span class="brand-text font-weight-light">Admin Registration</span>
        </span>
      </div>
    </nav>
    <div class="content-wrapper">
      <div class="content">
        <div class="container pt-5 pb-2">
          <form id="create-account-form">
            <div class="row">
              <div class="col-lg-12">
                <div class="callout callout-danger">
                  <h5>Reminders!</h5>
                  <p>
                    This registration is only visible on the first use of the
                    system and the registration is no longer available after
                    creating the first admin account
                  </p>
                </div>
              </div>
              <div class="col-sm-4 col-md-3 col-lg-3">
                <div class="card card-primary card-outline">
                  <div class="card-body box-profile">
                    <div class="text-center" style="position: relative">
                      <p class="text-muted text-center" style="font-size: 11px">
                        <i>** upload 2x2 picture(png/jpeg) only **</i>
                      </p>
                      <img
                        id="user-pp"
                        class="profile-user-img img-fluid img-circle"
                        :src="`${assetUrl}/img/icons/avatar.jpg`"
                        alt="User profile picture"
                        style="
                          border-radius: 0;
                          width: 100%;
                          border: 2px solid #adb5bd;
                        "
                      />

                      <button
                        type="button"
                        class="btn btn-xs btn-default btn-block btn-flat button-upload mt-1"
                      >
                        <i class="fas fa-camera"></i> Upload
                      </button>
                      <input
                        type="file"
                        name="upload-photo"
                        style="display: none"
                      />
                    </div>

                    <p class="text-muted text-center mt-3">Profile Picture</p>
                  </div>
                </div>
              </div>

              <div class="col-sm-8 col-md-9 col-lg-9">
                <div class="card">
                  <!-- <div class="card card-danger card-outline"> -->
                  <!-- <div class="card-header">
                    <h3 class="card-title">UAM Admin Information</h3>
                  </div> -->
                  <div class="card-body">
                    <div class="row">
                      <div class="col-lg-6">
                        <div class="form-group">
                          <label>Company ID</label>
                          <input
                            type="text"
                            class="form-control"
                            placeholder=""
                            data-rules="{ required: true }"
                            name="company_id"
                            v-model="company_id"
                          />
                        </div>
                      </div>
                      <div class="col-lg-6">
                        <div class="form-group">
                          <label>Password</label>
                          <input
                            type="password"
                            class="form-control"
                            placeholder=""
                            data-rules="{ required: true }"
                            name="password"
                            v-model="password"
                          />
                        </div>

                        <div class="form-group">
                          <label>Confirm Password</label>
                          <input
                            type="password"
                            class="form-control"
                            placeholder=""
                            data-rules="{ required: true }"
                            name="confirm_password"
                            v-model="confirm_password"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div class="card-header">
                    <h3 class="card-title">
                      <span
                        style="
                          font-weight: 600;
                          font-size: 15px;
                          color: #565656;
                          font-style: italic;
                        "
                      >
                        Admin Information
                      </span>
                    </h3>
                  </div>
                  <div class="card-body">
                    <div class="row">
                      <div class="col-lg-4">
                        <div class="form-group">
                          <label>First Name</label>
                          <input
                            type="text"
                            class="form-control"
                            placeholder="Enter First Name"
                            data-rules="{ required: true, regex: /^[a-zA-Z\s-Ññ]*$/ }"
                            data-messages="{ regex: 'Only letters and space allowed.' }"
                            name="first_name"
                            v-model="first_name"
                          />
                        </div>
                      </div>
                      <div class="col-lg-4">
                        <div class="form-group">
                          <label>Middle Name</label>
                          <input
                            type="text"
                            class="form-control"
                            placeholder="Enter Middle Name"
                            data-rules="{ required: true, regex: /^[a-zA-Z\s-Ññ]*$/ }"
                            data-messages="{ regex: 'Only letters and space allowed.' }"
                            name="middle_name"
                            v-model="middle_name"
                          />
                        </div>
                      </div>
                      <div class="col-lg-4">
                        <div class="form-group">
                          <label>Last Name</label>
                          <input
                            type="text"
                            class="form-control"
                            placeholder="Enter Last Name"
                            data-rules="{ required: true, regex: /^[a-zA-Z\s-Ññ]*$/ }"
                            data-messages="{ regex: 'Only letters and space allowed.' }"
                            name="last_name"
                            v-model="last_name"
                          />
                        </div>
                      </div>
                      <div class="col-lg-4">
                        <div class="form-group">
                          <label>Birthday</label>
                          <input
                            type="date"
                            class="form-control"
                            placeholder=""
                            data-rules="{ required: true }"
                            name="birthday"
                            v-model="birthday"
                          />
                        </div>
                      </div>
                      <div class="col-lg-4">
                        <div class="form-group">
                          <label>Contact No.</label>
                          <input
                            type="text"
                            class="form-control"
                            placeholder="Cellphone / Telephone No."
                            data-rules="{ required: true, regex: /^[0-9]*$/, maxlength: 12 }"
                            data-messages="{ regex: 'Only numbers allowed.' }"
                            maxlength="12"
                            name="contact_no"
                            v-model="contact_no"
                          />
                        </div>
                      </div>
                      <div class="col-lg-4">
                        <div class="form-group">
                          <label>Email</label>
                          <input
                            type="email"
                            class="form-control"
                            placeholder="Enter email"
                            data-rules="{ required: true, emailvalid: true }"
                            name="email"
                            v-model="email"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div class="card-header">
                    <h3 class="card-title">
                      <span
                        style="
                          font-weight: 600;
                          font-size: 15px;
                          color: #565656;
                          font-style: italic;
                        "
                      >
                        Admin Address
                      </span>
                    </h3>
                  </div>
                  <div class="card-body">
                    <div class="row">
                      <div class="col-lg-6">
                        <div class="form-group">
                          <label>Region</label>
                          <select
                            name="region"
                            class="selectpicker v_spicker"
                            data-width="100%"
                            data-style="btn-default"
                            data-live-search="true"
                            data-size="5"
                            data-rules="{ required: true }"
                            v-model="region"
                          >
                            <option
                              v-for="(i, k) in regionList"
                              :key="k"
                              :value="i"
                            >
                              {{ i.name }}
                            </option>
                          </select>
                        </div>
                      </div>

                      <div class="col-lg-6">
                        <div class="form-group">
                          <label>Province</label>
                          <select
                            name="province"
                            class="selectpicker v_spicker"
                            data-width="100%"
                            data-style="btn-default"
                            data-live-search="true"
                            data-size="5"
                            data-rules="{ required: true }"
                            v-model="province"
                          >
                            <option
                              v-for="(i, k) in provinceList"
                              :key="k"
                              :value="i"
                            >
                              {{ i.name }}
                            </option>
                          </select>
                        </div>
                      </div>
                      <div class="col-lg-6">
                        <div class="form-group">
                          <label>City</label>
                          <select
                            name="city"
                            class="selectpicker v_spicker"
                            data-width="100%"
                            data-style="btn-default"
                            data-live-search="true"
                            data-size="5"
                            data-rules="{ required: true }"
                            v-model="city"
                          >
                            <option
                              v-for="(i, k) in cityList"
                              :key="k"
                              :value="i"
                            >
                              {{ i.name }}
                            </option>
                          </select>
                        </div>
                      </div>
                      <div class="col-lg-6">
                        <div class="form-group">
                          <label>Barangay</label>
                          <select
                            name="barangay"
                            class="selectpicker v_spicker"
                            data-width="100%"
                            data-style="btn-default"
                            data-live-search="true"
                            data-size="5"
                            data-rules="{ required: true }"
                            v-model="barangay"
                          >
                            <option
                              v-for="(i, k) in barangayList"
                              :key="k"
                              :value="i"
                            >
                              {{ i.name }}
                            </option>
                          </select>
                        </div>
                      </div>
                      <div class="col-lg-12">
                        <div class="form-group">
                          <label>Household/Street</label>
                          <input
                            type="text"
                            class="form-control"
                            placeholder="Street No. / Household / subdivision"
                            data-rules="{ required: false, regex: /^[a-zA-Z\s-Ññ0-9.]*$/ }"
                            data-messages="{ regex: 'Only letters and numbers allowed.' }"
                            name="street"
                            v-model="street"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div class="card-footer clearfix border-top text-right">
                    <Loading :isLoading="isLoading" :size="'small'" />
                    <button
                      class="btn btn-outline-primary"
                      type="button"
                      @click.prevent="submitAccount"
                      :disabled="isLoading"
                      :style="`${isLoading ? 'pointer-events: none' : ''}`"
                    >
                      <i class="fas fa-check-circle"></i>
                      Submit Registration
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import phil from "phil-reg-prov-mun-brgy";
export default {
  data: () => ({
    isLoading: false,
    is_found_admin: null,
    start_loading: false,

    region: "",
    province: "",
    city: "",
    barangay: "",
    street: "",
    first_name: "",
    middle_name: "",
    last_name: "",
    birthday: "",
    contact_no: "",
    email: "",

    company_id: "",
    username: "",
    password: "",
    confirm_password: "",

    regionList: [],
    provinceList: [],
    cityList: [],
    barangayList: [],
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

    this.checkFreshApp();
  },

  methods: {
    validateForm() {},

    submitAccount() {
      const valid = this.validateForm();
      if (this.isLoading === true || !valid) return;
      this.isLoading = true;

      let payload = {
        company_id: this.company_id || null,
        region: this.region?.name || null,
        province: this.province?.name || null,
        city: this.city?.name || null,
        barangay: this.barangay?.name || null,
        street: this.street || null,
        first_name: this.first_name || null,
        middle_name: this.middle_name || null,
        last_name: this.last_name || null,
        birthday: this.birthday || null,
        contact_no: this.contact_no || null,
        email: this.email || null,
        username: this.company_id || null,
        password: this.password || null,
        confirm_password: this.confirm_password || null,
        role: "uam-admin",
        user_type: "admin",
        registration_type: "admin",
      };

      console.log("payload", payload);

      this.swal
        .preConfirm({
          title: `Submit Registration`,
          text: `Are you sure you want to submit your account registration?`,
          preConfirm: () => {
            return this.$store
              .dispatch("Account/Register", payload)
              .then((response) => {
                console.log("response", response);
                if (response.status !== 200) {
                  let errors = [];
                  for (let idx in response.data) {
                    errors.push(response.data[idx]);
                  }
                  Swal.showValidationMessage(
                    `The following error(s) occurred: ${
                      errors?.[0] ||
                      response.status + " - Something went wrong."
                    }`
                  );
                }
              })
              .catch((error) => {
                Swal.showValidationMessage(
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
                name: "admin-login",
              });
            });
        });
    },

    async onSearchOffice() {
      if (this.office_registration_id.trim("") === "") return;
      this.search_loading = true;
      let payload = {
        office_registration_id: this.office_registration_id,
      };
      try {
        const { data, status } = await this.$store.dispatch(
          "Account/SearchOffice",
          payload
        );
        console.log("data", data);
        if (status !== 200) {
          this.is_found_office = false;
        } else {
          this.is_found_office = true;
          this.office_detail_id = data.id || "";
        }
        this.search_loading = false;
      } catch (error) {
        this.search_loading = false;
        this.is_found_office = false;
        console.log("error", error);
      }
    },

    async checkFreshApp() {
      this.start_loading = true;
      let payload = {};
      try {
        const { data, status } = await this.$store.dispatch(
          "Account/CheckFreshApp",
          payload
        );
        console.log("data", data);
        if (status !== 200) {
          this.is_found_admin = false;
          this.initPage();
        } else {
          this.is_found_admin = true;
          // this.$router.push({
          //   name: "Page Not Found"
          // })
        }
        this.start_loading = false;
      } catch (error) {
        this.start_loading = false;
        this.is_found_admin = false;
        this.initPage();
        console.log("error", error);
      }
    },

    initPage() {
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

    confirmedSaveAccount(payload) {
      this.isLoading = true;
    },
  },
};
</script>

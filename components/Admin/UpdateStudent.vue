<template>
  <h5 class="text-center" v-if="isLoading">Loading....</h5>
  <NoDataFound v-else-if="!isLoading && respStatusCode === 404" />
  <form id="create-account-form" @submit.prevent="" v-else>
    <div class="row">
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
                style="border-radius: 0; width: 100%; border: 2px solid #adb5bd"
              />

              <button
                class="btn btn-xs btn-default btn-block btn-flat button-upload mt-1"
              >
                <i class="fas fa-camera"></i> Upload
              </button>
              <input type="file" name="upload-photo" style="display: none" />
            </div>

            <p class="text-muted text-center mt-3">Student Profile</p>
          </div>
        </div>

        <div class="card">
          <div
            class="card-body box-profile"
            :style="`${
              qr_code.trim('') == '' ? 'opacity: 0.5;' : 'padding: 0;'
            }`"
          >
            <div class="text-center" style="position: relative">
              <img
                id="user-pp"
                class="profile-user-img img-fluid img-circle"
                :src="`${
                  qr_code.trim('') == ''
                    ? `${assetUrl}/img/icons/qr-avatar.png`
                    : qr_code
                }`"
                alt="User profile picture"
                style="border-radius: 0; width: 100%; border: none"
              />
            </div>
          </div>
        </div>
      </div>

      <div class="col-sm-8 col-md-9 col-lg-9">
        <div class="card">
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
                School Information
              </span>
            </h3>
          </div>
          <div class="card-body">
            <div class="row">
              <div class="col-lg-6">
                <div class="form-group" style="opacity: 0.5">
                  <label>Student ID</label>
                  <span class="form-control" style="height: auto">{{
                    school_id || "---"
                  }}</span>
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col-lg-6">
                <div class="form-group">
                  <label
                    >Course Code
                    <small style="font-style: italic"
                      >( optional )</small
                    ></label
                  >
                  <input
                    type="text"
                    class="form-control"
                    placeholder="Course Code"
                    data-rules="{ required: false }"
                    name="course_code"
                    v-model="course_code"
                  />
                </div>
              </div>
              <div class="col-lg-6">
                <div class="form-group">
                  <label
                    >Course Name
                    <small style="font-style: italic"
                      >( optional )</small
                    ></label
                  >
                  <input
                    type="text"
                    class="form-control"
                    placeholder="Course Name"
                    data-rules="{ required: false }"
                    name="course_name"
                    v-model="course_name"
                  />
                </div>
              </div>
              <div class="col-lg-6">
                <div class="form-group">
                  <label
                    >Section
                    <small style="font-style: italic"
                      >( optional )</small
                    ></label
                  >
                  <input
                    type="text"
                    class="form-control"
                    placeholder="Section"
                    data-rules="{ required: false }"
                    name="section"
                    v-model="section"
                  />
                </div>
              </div>
              <div class="col-lg-6">
                <div class="form-group">
                  <label
                    >Year level
                    <small style="font-style: italic"
                      >( optional )</small
                    ></label
                  >
                  <input
                    type="text"
                    class="form-control"
                    placeholder="Year level"
                    data-rules="{ required: false }"
                    name="year_level"
                    v-model="year_level"
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
                Student Information
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
                <div class="form-group" style="opacity: 0.5">
                  <label>Email</label>
                  <span class="form-control" style="height: auto">{{
                    email || "---"
                  }}</span>
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
                Student Address
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
                    <option v-for="(i, k) in regionList" :key="k" :value="i">
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
                    <option v-for="(i, k) in provinceList" :key="k" :value="i">
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
                    <option v-for="(i, k) in cityList" :key="k" :value="i">
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
                    data-rules="{ required: false }"
                    v-model="barangay"
                  >
                    <option v-for="(i, k) in barangayList" :key="k" :value="i">
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
              class="btn btn-sm btn-outline-danger"
              type="button"
              @click.prevent="submitCreatedStudent"
              :disabled="isLoading"
              :style="`${isLoading ? 'pointer-events: none' : ''}`"
            >
              <i class="fas fa-check-circle"></i>
              Save changes information
            </button>
          </div>
        </div>
      </div>
    </div>
  </form>
</template>

<script>
import { mapGetters } from "vuex";
import phil from "phil-reg-prov-mun-brgy";
import QRCode from "qrcode";
export default {
  data: () => ({
    isLoading: false,

    regionList: [],
    provinceList: [],
    cityList: [],
    barangayList: [],

    respStatusCode: null,
    qr_code: "",
    office: [],
    barangay: "",
    birthday: "",
    city: "",
    contact_no: "",
    course_code: "",
    course_name: "",
    created_at: "",
    email: "",
    first_name: "",
    id: "",
    last_name: "",
    middle_name: "",
    province: "",
    region: "",
    school_id: "",
    section: "",
    street: "",
    updated_at: "",
    year_level: "",
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

    school_id(newVal) {
      const qr_string = newVal.trim("");
      if (qr_string === "") {
        this.qr_code = "";
        return;
      }
      this.generateQRCode(qr_string);
    },
  },

  computed: {
    ...mapGetters({
      baseUrl: "getBaseUrl",
      assetUrl: "getAssetUrl",
      session: "getSession",
    }),

    getStudentId() {
      return this.$route?.params?.id || "";
    },
  },

  mounted() {
    this.getStudentInfo();
  },

  methods: {
    generateQRCode(string) {
      QRCode.toDataURL(string, { version: 3 })
        .then((url) => {
          this.qr_code = url;
        })
        .catch((err) => {
          this.qr_code = "";
        });
    },

    async getStudentInfo() {
      this.isLoading = true;
      try {
        let payload = {
          school_id: this.getStudentId,
        };
        const { data, status } = await this.$store.dispatch(
          "Student/CollectStudentInfo",
          payload
        );
        this.respStatusCode = status;
        if ([200, 201].indexOf(status) > -1) {
          for (let key in data) {
            this._data[key] = data[key];
          }

          if (data.office.length > 0) {
            const active_office = data.office.find(
              (i) => i.pivot.duty_status === "active"
            );
            console.log("active_office", active_office);
            if (!active_office) return;
            this.office_reg_id = active_office?.office_registration_id || "";
            this.office_name = active_office?.office_name || "";
            let i = active_office;
            this.office_address = `${i.street ? i.street + ", " : ""}${
              i.barangay ? i.barangay + ", " : ""
            }${i.city}, ${i.province} ${i.region}`;
          }
        }
        console.log("data", data);
        console.log("status", status);
        this.regionList = phil.regions;
        this.$nextTick(() =>
          $(`.selectpicker, [name="region"]`)
            .selectpicker("refresh")
            .change(function () {
              let el = $(this).closest(".dropdown.bootstrap-select.v_spicker");
              $(this).valid() ? el.removeClass("is-invalid") : "";
            })
        );
        this.isLoading = false;
      } catch (err) {
        this.isLoading = false;
        console.log("error", error);
      }
    },

    resetForm() {
      this.isLoading = false;
      this.course_code = "";
      this.course_name = "";
      this.section = "";
      this.year_level = "";
      this.school_id = "";
      this.qr_code = "";
      this.first_name = "";
      this.middle_name = "";
      this.last_name = "";
      this.birthday = "";
      this.contact_no = "";
      this.email = "";
      this.region = "";
      this.regionList = [];
      this.province = "";
      this.provinceList = [];
      this.city = "";
      this.cityList = [];
      this.barangay = "";
      this.barangayList = [];
      this.street = "";

      this.regionList = phil.regions;
      this.$nextTick(() =>
        $(`.selectpicker, [name="region"]`)
          .selectpicker("refresh")
          .change(function () {
            let el = $(this).closest(".dropdown.bootstrap-select.v_spicker");
            $(this).valid() ? el.removeClass("is-invalid") : "";
          })
      );
    },

    validateForm() {},

    submitCreatedStudent() {
      const valid = this.validateForm();
      console.log("valid", valid);
      if (this.isLoading === true || !valid) return;

      let payload = {
        course_code: this.course_code,
        course_name: this.course_name,
        section: this.section,
        year_level: this.year_level,
        school_id: this.school_id,
        first_name: this.first_name,
        middle_name: this.middle_name,
        last_name: this.last_name,
        birthday: this.birthday,
        contact_no: this.contact_no,
        email: this.email,
        region: this.region?.name || "",
        province: this.province?.name || "",
        city: this.city?.name || "",
        barangay: this.barangay?.name || "",
        street: this.street?.name || "",
      };

      console.log("payload", payload);

      this.$swal
        .preConfirm({
          title: `Create Student`,
          text: `Are you sure you want to create student info.?`,
          preConfirm: () => {
            return this.$store
              .dispatch("Student/CreateStudent", payload)
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
          if (!result.isConfirmed) return;

          this.$swal
            .fire({
              title: "Success!",
              text: "Student information created successfully. Here is the generated QR code for this student.",
              imageUrl: this.qr_code,
              imageWidth: 400,
              imageHeight: 400,
              imageAlt: "Student generated QR Code",
              showDenyButton: true,
              showCancelButton: true,
              confirmButtonText: "Add New",
              cancelButtonText: "Download QR Code",
              cancelButtonColor: "#b2ad7f",
              denyButtonText: `Student List`,
              denyButtonColor: "#6b5b95",
            })
            .then((result) => {
              if (result.isConfirmed) {
                this.resetForm();
              } else if (result.isDenied) {
                this.$router.push({
                  name: "admin-student-list",
                });
              } else {
                this.downloadQRCode(this.qr_code);
                this.$nextTick(() => {
                  this.resetForm();
                });
              }
            });
        });
    },

    confirmedSaveAccount(payload) {
      this.isLoading = true;
    },
  },
};
</script>

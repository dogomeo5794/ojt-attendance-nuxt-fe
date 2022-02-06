<template>
  <ValidationObserver ref="form">
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
                :src="`${profile || '/img/icons/avatar.jpg'}`"
                alt="User profile picture"
                style="border-radius: 0; width: 100%; border: 2px solid #adb5bd"
              />

              <input
                type="file"
                name="profile"
                id=""
                ref="profile"
                accept=".png,.jpg,jpeg"
                @change="onChangeProfile"
                v-show="false"
              />

              <button
                class="btn btn-xs btn-danger btn-block btn-flat my-2"
                @click="profile = null"
                v-if="profile"
              >
                <i class="fas fa-times"></i> Cancel
              </button>

              <button
                class="btn btn-xs btn-default btn-block btn-flat button-upload mt-1"
                @click="$refs.profile.click()"
              >
                <i class="fas fa-camera"></i> Upload
              </button>
            </div>

            <p class="text-muted text-center mt-3">Student Profile</p>
          </div>
        </div>

        <div class="card">
          <div
            class="card-body box-profile"
            :style="`${!qr_code ? 'opacity: 0.5;' : 'padding: 0;'}`"
          >
            <div class="text-center" style="position: relative">
              <img
                id="user-pp"
                class="profile-user-img img-fluid img-circle"
                :src="`${!qr_code ? `/img/icons/qr-avatar.png` : qr_code}`"
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
                <ValidationProvider
                  :rules="{ required: true }"
                  v-slot="{ errors, failed }"
                  name="student_id"
                  slim
                >
                  <div class="form-group">
                    <label>Student ID</label>
                    <input
                      type="text"
                      class="form-control"
                      :class="{ 'is-invalid': failed }"
                      placeholder="Student ID"
                      name="student_id"
                      v-model="student_id"
                    />
                    <label class="error invalid-feedback" v-if="failed">
                      {{ errors[0] }}
                    </label>
                  </div>
                </ValidationProvider>
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
                <ValidationProvider
                  :rules="{ required: true, regex: /^[a-zA-Z\s-Ññ]*$/ }"
                  v-slot="{ errors, failed, failedRules }"
                  name="first_name"
                  slim
                >
                  <div class="form-group">
                    <label>First Name</label>
                    <input
                      type="text"
                      class="form-control"
                      :class="{ 'is-invalid': failed }"
                      placeholder="Enter First Name"
                      name="first_name"
                      v-model="first_name"
                    />
                    <label class="error invalid-feedback" v-if="failed">
                      {{
                        failedRules.regex
                          ? "Only letters and space allowed."
                          : errors[0]
                      }}
                    </label>
                  </div>
                </ValidationProvider>
              </div>
              <div class="col-lg-4">
                <ValidationProvider
                  :rules="{ required: true, regex: /^[a-zA-Z\s-Ññ]*$/ }"
                  v-slot="{ errors, failed, failedRules }"
                  name="middle_name"
                  slim
                >
                  <div class="form-group">
                    <label>Middle Name</label>
                    <input
                      type="text"
                      class="form-control"
                      :class="{ 'is-invalid': failed }"
                      placeholder="Enter Middle Name"
                      name="middle_name"
                      v-model="middle_name"
                    />
                    <label class="error invalid-feedback" v-if="failed">
                      {{
                        failedRules.regex
                          ? "Only letters and space allowed."
                          : errors[0]
                      }}
                    </label>
                  </div>
                </ValidationProvider>
              </div>
              <div class="col-lg-4">
                <ValidationProvider
                  :rules="{ required: true, regex: /^[a-zA-Z\s-Ññ]*$/ }"
                  v-slot="{ errors, failed, failedRules }"
                  name="last_name"
                  slim
                >
                  <div class="form-group">
                    <label>Last Name</label>
                    <input
                      type="text"
                      class="form-control"
                      :class="{ 'is-invalid': failed }"
                      placeholder="Enter Last Name"
                      name="last_name"
                      v-model="last_name"
                    />
                    <label class="error invalid-feedback" v-if="failed">
                      {{
                        failedRules.regex
                          ? "Only letters and space allowed."
                          : errors[0]
                      }}
                    </label>
                  </div>
                </ValidationProvider>
              </div>
              <div class="col-lg-4">
                <ValidationProvider
                  :rules="{ required: true }"
                  v-slot="{ errors, failed }"
                  name="birthday"
                  slim
                >
                  <div class="form-group">
                    <label>Birthday</label>
                    <input
                      type="date"
                      class="form-control"
                      :class="{ 'is-invalid': failed }"
                      placeholder=""
                      data-rules="{ required: true }"
                      name="birthday"
                      v-model="birthday"
                    />
                    <label class="error invalid-feedback" v-if="failed">
                      {{ errors[0] }}
                    </label>
                  </div>
                </ValidationProvider>
              </div>
              <div class="col-lg-4">
                <ValidationProvider
                  :rules="{ required: true, regex: /^[0-9]*$/, max: 12 }"
                  v-slot="{ errors, failed, failedRules }"
                  name="contact_no"
                  slim
                >
                  <div class="form-group">
                    <label>Contact No.</label>
                    <input
                      type="text"
                      class="form-control"
                      :class="{ 'is-invalid': failed }"
                      placeholder="Cellphone / Telephone No."
                      maxlength="12"
                      name="contact_no"
                      v-model="contact_no"
                    />
                    <label class="error invalid-feedback" v-if="failed">
                      {{
                        failedRules.regex ? "Only numbers allowed." : errors[0]
                      }}
                    </label>
                  </div>
                </ValidationProvider>
              </div>
              <div class="col-lg-4">
                <ValidationProvider
                  :rules="{ required: true, email: true }"
                  v-slot="{ errors, failed }"
                  name="email"
                  slim
                >
                  <div class="form-group">
                    <label>Email</label>
                    <input
                      type="email"
                      class="form-control"
                      :class="{ 'is-invalid': failed }"
                      placeholder="Enter email"
                      name="email"
                      v-model="email"
                    />
                    <label class="error invalid-feedback" v-if="failed">
                      {{ errors[0] }}
                    </label>
                  </div>
                </ValidationProvider>
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
                <ValidationProvider
                  :rules="{ required: true }"
                  v-slot="{ errors, failed }"
                  name="region"
                  slim
                >
                  <div class="form-group">
                    <label>Region</label>
                    <select
                      name="region"
                      class="selectpicker"
                      :class="{ 'is-invalid': failed }"
                      data-width="100%"
                      data-style="btn-default"
                      data-live-search="true"
                      data-size="5"
                      v-model="region"
                    >
                      <option v-for="(i, k) in regionList" :key="k" :value="i">
                        {{ i.name }}
                      </option>
                    </select>
                    <label class="error invalid-label" v-if="failed">
                      {{ errors[0] }}
                    </label>
                  </div>
                </ValidationProvider>
              </div>

              <div class="col-lg-6">
                <ValidationProvider
                  :rules="{ required: true }"
                  v-slot="{ errors, failed }"
                  name="province"
                  slim
                >
                  <div class="form-group">
                    <label>Province</label>
                    <select
                      name="province"
                      class="selectpicker"
                      :class="{ 'is-invalid': failed }"
                      data-width="100%"
                      data-style="btn-default"
                      data-live-search="true"
                      data-size="5"
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
                    <label class="error invalid-label" v-if="failed">
                      {{ errors[0] }}
                    </label>
                  </div>
                </ValidationProvider>
              </div>
              <div class="col-lg-6">
                <ValidationProvider
                  :rules="{ required: true }"
                  v-slot="{ errors, failed }"
                  name="city"
                  slim
                >
                  <div class="form-group">
                    <label>City</label>
                    <select
                      name="city"
                      class="selectpicker"
                      :class="{ 'is-invalid': failed }"
                      data-width="100%"
                      data-style="btn-default"
                      data-live-search="true"
                      data-size="5"
                      v-model="city"
                    >
                      <option v-for="(i, k) in cityList" :key="k" :value="i">
                        {{ i.name }}
                      </option>
                    </select>
                    <label class="error invalid-label" v-if="failed">
                      {{ errors[0] }}
                    </label>
                  </div>
                </ValidationProvider>
              </div>
              <div class="col-lg-6">
                <div class="form-group">
                  <label>Barangay</label>
                  <select
                    name="barangay"
                    class="selectpicker"
                    data-width="100%"
                    data-style="btn-default"
                    data-live-search="true"
                    data-size="5"
                    v-model="barangay"
                  >
                    <option v-for="(i, k) in barangayList" :key="k" :value="i">
                      {{ i.name }}
                    </option>
                  </select>
                </div>
              </div>
              <div class="col-lg-12">
                <ValidationProvider
                  :rules="{ required: false, regex: /^[a-zA-Z\s-Ññ0-9.]*$/ }"
                  v-slot="{ errors, failed, failedRules }"
                  name="street"
                  slim
                >
                  <div class="form-group">
                    <label>Household/Street</label>
                    <input
                      type="text"
                      class="form-control"
                      :class="{ 'is-invalid': failed }"
                      placeholder="Street No. / Household / subdivision"
                      name="street"
                      v-model="street"
                    />
                    <label class="error invalid-feedback" v-if="failed">
                      {{
                        failedRules.regex
                          ? "Only letters and numbers allowed."
                          : errors[0]
                      }}
                    </label>
                  </div>
                </ValidationProvider>
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
              Save Created Student
            </button>
          </div>
        </div>
      </div>
    </div>
  </ValidationObserver>
</template>

<script>
import phil from "phil-reg-prov-mun-brgy";
import QRCode from "qrcode";
export default {
  data: () => ({
    isLoading: false,
    course_code: "",
    course_name: "",
    section: "",
    year_level: "",
    student_id: "",
    qr_code: "",
    first_name: "",
    middle_name: "",
    last_name: "",
    birthday: "",
    contact_no: "",
    email: "",

    region: "",
    regionList: [],
    province: "",
    provinceList: [],
    city: "",
    cityList: [],
    barangay: "",
    barangayList: [],
    street: "",

    profile: null,
  }),

  watch: {
    async region(newVal) {
      this.province = "";
      this.provinceList = await phil.getProvincesByRegion(newVal.reg_code);
      console.log("this.cityList", this.provinceList);
      this.$nextTick(() => $(`[name="province"]`).selectpicker("refresh"));
    },
    async province(newVal) {
      this.city = "";
      this.cityList = await phil.getCityMunByProvince(newVal.prov_code);
      console.log("this.cityList", this.cityList);
      this.$nextTick(() => $(`[name="city"]`).selectpicker("refresh"));
    },
    async city(newVal) {
      this.barangay = "";
      this.barangayList = await phil.getBarangayByMun(newVal.mun_code);
      this.$nextTick(() => $(`[name="barangay"]`).selectpicker("refresh"));
    },

    student_id(newVal) {
      const qr_string = newVal.trim("");
      if (qr_string === "") {
        this.qr_code = "";
        return;
      }
      this.generateQRCode(qr_string);
    },
  },

  computed: {},

  mounted() {
    this.regionList = phil.regions;
    this.$nextTick(() =>
      $(`.selectpicker, [name="region"]`).selectpicker("refresh")
    );
  },

  methods: {
    async onChangeProfile(e) {
      const toBase64 = (fileObject) =>
        new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.readAsDataURL(fileObject);
          reader.onload = () => resolve(reader.result);
          reader.onerror = (error) => reject(error);
        });

      const files = this.$refs.profile.files;

      if (files.length == 0) {
        this.profile = null;
        this.$refs.profile.value = null;
        return;
      } else {
        const file = files[0];

        let t = file.type.split("/").pop().toLowerCase();
        if (!["jpeg", "jpg", "png"].includes(t)) {
          this.profile = null;
          return this.$_swal
            .fire({
              title: "Not allowed",
              text: "Please select a valid image file (PNG, JPEG, and JPG).",
              icon: "error",
              confirmButtonText: "Close",
            })
            .then((result) => {
              this.$refs.profile.value = null;
            });
        }

        this.profile = await toBase64(file);
        this.$refs.profile.value = null;
      }
    },

    generateQRCode(string) {
      QRCode.toDataURL(string, { version: 3 })
        .then((url) => {
          this.qr_code = url;
        })
        .catch((err) => {
          this.qr_code = "";
        });
    },

    downloadQRCode(base64) {
      let fileDownload = require("js-file-download");
      const BASE64_MARKER = ";base64,";
      const parts = base64.split(BASE64_MARKER);
      const contentType = parts[0].split(":")[1];
      const raw = window.atob(parts[1]);
      const rawLength = raw.length;
      const uInt8Array = new Uint8Array(rawLength);

      for (let i = 0; i < rawLength; ++i) {
        uInt8Array[i] = raw.charCodeAt(i);
      }

      let extParts = "image/png".split("/");
      let ext = extParts?.[1] || "png";

      const blob = new Blob([uInt8Array], { type: contentType });
      fileDownload(blob, `qr_code_${this.student_id}.${ext}`);
    },

    resetForm() {
      this.isLoading = false;
      this.course_code = "";
      this.course_name = "";
      this.section = "";
      this.year_level = "";
      this.student_id = "";
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
      this.profile = null;

      this.regionList = phil.regions;
      this.$nextTick(() => {
        $(`.selectpicker, [name="region"]`).selectpicker("refresh");
        this.$refs.form.reset();
      });
    },

    async validate() {
      let valid = await this.$refs.form.validate();
      let err = Object.values(this.$refs.form.fields).find(
        (el) => el.valid === false
      ) || { name: undefined };
      if (err.name !== null && typeof err.name !== "undefined") {
        this.$nextTick(() => $(`[name="${err.name}"]`).focus());
      }
      return valid;
    },

    async submitCreatedStudent() {
      const valid = await this.validate();
      console.log("valid", valid);
      if (this.isLoading === true || !valid) return;

      let payload = {
        course_code: this.course_code,
        course_name: this.course_name,
        section: this.section,
        year_level: this.year_level,
        school_id: this.student_id,
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
        qr_code: this.qr_code || null,
      };

      if (this.profile) {
        payload.profile = this.profile;
      }

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
                  this.$_swal.showValidationMessage(
                    `The following error(s) occurred: ${
                      errors?.[0] ||
                      response.status + " - Something went wrong."
                    }`
                  );
                }
              })
              .catch((error) => {
                this.$_swal.showValidationMessage(
                  `The following error(s) occurred: ${error}`
                );
              });
          },
        })
        .then((result) => {
          if (!result.isConfirmed) return;

          this.$_swal
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
                  name: "admin-dashboard-students",
                });
              } else {
                this.downloadQRCode(this.qr_code);
                this.$nextTick(() => {
                  this.$router.push({
                    name: "admin-dashboard-students-student_id-view",
                    params: {
                      student_id: this.student_id,
                    },
                    query: {
                      tab: "information",
                    },
                  });
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

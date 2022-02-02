<template>
  <h5 class="text-center" v-if="isLoading">Loading....</h5>
  <NoDataFound v-else-if="!isLoading && respStatusCode === 404" />
  <ValidationObserver ref="form" v-else>
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
                  name="birthday"
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
                <div class="form-group" style="opacity: 0.5">
                  <label>Email</label>
                  <span class="form-control" style="height: auto">
                    {{ email || "---" }}
                  </span>
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
              |
              <a
                href="#"
                class="btn-link text-sm"
                :class="{ 'text-danger': is_update_address }"
                @click.prevent="is_update_address = !is_update_address"
              >
                <i
                  :class="`fas ${is_update_address ? 'fa-times' : 'fa-edit'}`"
                ></i>
                {{ is_update_address ? "Cancel update" : "Update" }}
              </a>
            </h3>
          </div>
          <div class="card-body">
            <div class="row" v-if="!is_update_address">
              <div class="col-lg-6">
                <div class="form-group">
                  <label>Region</label>
                  <span class="form-control" style="height: auto">
                    {{ old_region || "---" }}
                  </span>
                </div>
              </div>

              <div class="col-lg-6">
                <div class="form-group">
                  <label>Province</label>
                  <span class="form-control" style="height: auto">
                    {{ old_province || "---" }}
                  </span>
                </div>
              </div>

              <div class="col-lg-6">
                <div class="form-group">
                  <label>City</label>
                  <span class="form-control" style="height: auto">
                    {{ old_city || "---" }}
                  </span>
                </div>
              </div>

              <div class="col-lg-6">
                <div class="form-group">
                  <label>Barangay</label>
                  <span class="form-control" style="height: auto">
                    {{ old_barangay || "---" }}
                  </span>
                </div>
              </div>

              <div class="col-lg-12">
                <div class="form-group">
                  <label>Household/Street</label>
                  <span class="form-control" style="height: auto">
                    {{ old_street || "---" }}
                  </span>
                </div>
              </div>
            </div>
            <div class="row" v-else>
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
                <ValidationProvider
                  :rules="{ required: false }"
                  v-slot="{ errors, failed }"
                  name="barangay"
                  slim
                >
                  <div class="form-group">
                    <label>Barangay</label>
                    <select
                      name="barangay"
                      class="selectpicker"
                      :class="{ 'is-invalid': failed }"
                      data-width="100%"
                      data-style="btn-default"
                      data-live-search="true"
                      data-size="5"
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
                    <label class="error invalid-label" v-if="failed">
                      {{ errors[0] }}
                    </label>
                  </div>
                </ValidationProvider>
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
              Save changes information
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

    is_update_address: false,
    old_barangay: "",
    old_city: "",
    old_province: "",
    old_region: "",
    old_street: "",

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

    school_id(newVal) {
      if (!newVal) return;
      this.generateQRCode(newVal);
    },

    is_update_address(newVal) {
      if (newVal) {
        this.$nextTick(() => $(`.selectpicker`).selectpicker("refresh"));
      }
    },
  },

  computed: {
    getStudentId() {
      return this.$route?.params?.student_id || "";
    },
  },

  mounted() {
    this.getStudentInfo();
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
            if (
              ["barangay", "city", "province", "region", "street"].indexOf(
                key
              ) > -1
            ) {
              this._data[`old_${key}`] = data[key];
            }
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
          $(`.selectpicker, [name="region"]`).selectpicker("refresh")
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
        $(`.selectpicker, [name="region"]`).selectpicker("refresh")
      );
    },

    async validateForm() {
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
      const valid = await this.validateForm();
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
      };

      if (this.is_update_address) {
        payload = {
          ...payload,
          region: this.region?.name || "",
          province: this.province?.name || "",
          city: this.city?.name || "",
          barangay: this.barangay?.name || "",
          street: this.street || "",
        };
      }

      if (this.profile) {
        payload.profile = this.profile;
      }

      console.log("payload", payload);

      this.$swal
        .preConfirm({
          title: `Update Information`,
          text: `Are you sure you want to update student info.?`,
          preConfirm: () => {
            return this.$store
              .dispatch("Student/UpdateStudent", payload)
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
                  `The following error(s) occurred: ${errors}`
                );
              });
          },
        })
        .then((result) => {
          this.$_swal
            .fire({
              title: "Success!",
              text: "Student information updated successfully.",
              icon: "success",
              confirmButtonText: "OK",
            })
            .then((result) => {
              this.$router.push({
                name: "admin-dashboard-students-student_id-view",
                params: {
                  student_id: this.school_id,
                },
                query: {
                  tab: "information",
                },
              });
            });
        });
    },

    confirmedSaveAccount(payload) {
      this.isLoading = true;
    },
  },
};
</script>

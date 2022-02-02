<template>
  <ValidationObserver ref="form">
    <div class="content">
      <div class="container pt-5 pb-2">
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
                    style="
                      border-radius: 0;
                      width: 100%;
                      border: 2px solid #adb5bd;
                    "
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

                <p class="text-muted text-center mt-3">Profile Picture</p>
              </div>
            </div>

            <div class="form-group mb-3">
              <span
                class="form-control"
                style="height: auto; text-align: justify; font-size: 12px"
              >
                <i>
                  <b>Note:</b> The Authorized personnel are the person who
                  checks the attendance of OJTs on a daily basis
                </i>
              </span>
            </div>

            <hr class="mt-4 mb-3" />
            <ValidationProvider
              :rules="{ required: true }"
              v-slot="{ errors, failed }"
              name="company_id"
              slim
            >
              <div class="form-group">
                <label>Company ID</label>
                <input
                  type="text"
                  class="form-control"
                  :class="{ 'is-invalid': failed }"
                  placeholder=""
                  name="company_id"
                  v-model="company_id"
                />
                <label class="error invalid-feedback" v-if="failed">
                  {{ errors[0] }}
                </label>
              </div>
            </ValidationProvider>

            <ValidationProvider
              :rules="{ required: true }"
              v-slot="{ errors, failed }"
              name="username"
              slim
            >
              <div class="form-group">
                <label>Username</label>
                <input
                  type="text"
                  class="form-control"
                  placeholder=""
                  :class="{ 'is-invalid': failed }"
                  name="username"
                  v-model="username"
                />
                <label class="error invalid-feedback" v-if="failed">
                  {{ errors[0] }}
                </label>
              </div>
            </ValidationProvider>

            <ValidationProvider
              :rules="{ required: true }"
              v-slot="{ errors, failed }"
              name="password"
              slim
            >
              <div class="form-group">
                <label>Password</label>
                <input
                  type="password"
                  class="form-control"
                  placeholder=""
                  :class="{ 'is-invalid': failed }"
                  name="password"
                  v-model="password"
                />
                <label class="error invalid-feedback" v-if="failed">
                  {{ errors[0] }}
                </label>
              </div>
            </ValidationProvider>

            <ValidationProvider
              rules="required|password:@password"
              v-slot="{ errors, failed }"
              name="confirm_password"
              slim
            >
              <div class="form-group">
                <label>Confirm Password</label>
                <input
                  type="password"
                  class="form-control"
                  placeholder=""
                  :class="{ 'is-invalid': failed }"
                  name="confirm_password"
                  v-model="confirm_password"
                />
                <label class="error invalid-feedback" v-if="failed">
                  {{ errors[0] }}
                </label>
              </div>
            </ValidationProvider>
          </div>

          <div class="col-sm-8 col-md-9 col-lg-9">
            <div class="card">
              <!-- <div class="card card-danger card-outline"> -->
              <!-- <div class="card-header">
                    <h3 class="card-title">UAM Admin Information</h3>
                  </div> -->
              <div class="card-body">
                <div class="row">
                  <div class="col-lg-12">
                    <div class="form-group">
                      <label>Company/Office Registration ID</label>
                      <div class="row">
                        <div class="col-10 col-sm-8">
                          <input
                            type="text"
                            class="form-control"
                            placeholder=""
                            data-rules="{ required: true, regex: /^[a-zA-Z0-9-]*$/, maxlength: 20 }"
                            data-messages="{ regex: 'Only letters and numbers allowed.' }"
                            name="office_registration_id"
                            ref="office_registration_id"
                            v-model="office_registration_id"
                            @keyup.enter="onSearchOffice"
                          />
                          <span
                            class="btn btn-outline-default"
                            style="
                              padding: 0;
                              font-size: 15px;
                              pointer-events: none;
                              margin-left: 10px;
                            "
                            v-if="!search_loading"
                          >
                            <i class="fas fa-check-circle text-success"></i>
                            {{
                              is_found_office
                                ? "Found office"
                                : "Add as new Office"
                            }}
                          </span>
                        </div>
                        <div class="col-2 col-sm-4">
                          <span
                            class="btn btn-outline-default"
                            style="
                              padding: 0;
                              font-size: 20px;
                              pointer-events: none;
                            "
                            v-if="search_loading"
                          >
                            <i class="fas fa-spinner fa-pulse"></i>
                          </span>

                          <button
                            class="btn btn-outline-primary"
                            @click.prevent="onSearchOffice"
                            v-if="!search_loading"
                          >
                            <i class="fas fa-search"></i>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                  <!-- <div class="col-lg-6"></div> -->
                  <div class="col-lg-12">
                    <div class="form-group">
                      <label>Company/Office Name</label>
                      <span
                        class="form-control"
                        style="height: auto"
                        v-if="is_found_office"
                      >
                        {{ office_name || "---" }}
                      </span>
                      <input
                        type="text"
                        class="form-control"
                        placeholder=""
                        data-rules="{ required: true }"
                        name="office_name"
                        v-model="office_name"
                        v-else
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
                    Company/Office Address
                  </span>
                </h3>
              </div>
              <div class="card-body">
                <div
                  class="row"
                  style="opacity: 0.8; cursor: not-allowed"
                  v-if="is_found_office"
                >
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
                          <option
                            v-for="(i, k) in regionList"
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
                          <option
                            v-for="(i, k) in cityList"
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
                      :rules="{
                        required: false,
                        regex: /^[a-zA-Z\s-Ññ0-9.]*$/,
                      }"
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
                    Authorized Personnel Information
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
                      :rules="{ required: false, regex: /^[a-zA-Z\s-Ññ]*$/ }"
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
                            failedRules.regex
                              ? "Only numbers allowed."
                              : errors[0]
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
      </div>
    </div>
  </ValidationObserver>
</template>

<script>
import { mapGetters } from "vuex";
import phil from "phil-reg-prov-mun-brgy";
export default {
  data: () => ({
    isLoading: false,
    search_loading: false,
    is_found_office: null,

    office_detail_id: "",
    office_registration_id: "",
    office_name: "",
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

    profile: null,

    old_region: "",
    old_province: "",
    old_city: "",
    old_barangay: "",
    old_street: "",
  }),

  watch: {
    async region(newVal) {
      if (!newVal || this.is_found_office) return;
      this.province = "";
      this.provinceList = await phil.getProvincesByRegion(
        newVal?.reg_code || null
      );
      console.log("this.cityList", this.provinceList);
      this.$nextTick(() => $(`[name="province"]`).selectpicker("refresh"));
    },
    async province(newVal) {
      if (!newVal || this.is_found_office) return;
      this.city = "";
      this.cityList = await phil.getCityMunByProvince(
        newVal?.prov_code || null
      );
      console.log("this.cityList", this.cityList);
      this.$nextTick(() => $(`[name="city"]`).selectpicker("refresh"));
    },
    async city(newVal) {
      if (!newVal || this.is_found_office) return;
      this.barangay = "";
      this.barangayList = await phil.getBarangayByMun(newVal?.mun_code || null);
      this.$nextTick(() => $(`[name="barangay"]`).selectpicker("refresh"));
    },
  },

  computed: {},

  mounted() {
    console.log("route", this.$route);

    this.initApp();
  },

  methods: {
    initApp() {
      this.regionList = phil.regions;
      this.$nextTick(() => {
        $(`.selectpicker, [name="region"]`).selectpicker("refresh");
      });
    },
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

    async submitAccount() {
      const valid = await this.validateForm();
      if (this.isLoading === true || !valid) return;
      this.isLoading = true;

      let payload = {
        company_id: this.company_id || null,
        office_registration_id: this.office_registration_id || null,
        office_name: this.office_name || null,
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
        username: this.username || null,
        password: this.password || null,
        confirm_password: this.confirm_password || null,
        role: "attendance-checker",
        user_type: "authorized-personnel",
        registration_type: "personnel",

        office_detail_id: this.office_detail_id || null,
        is_new_company: this.is_found_office === true ? false : true,
      };

      if (this.profile) {
        payload.profile = this.profile;
      }

      console.log("payload", payload);

      this.$swal
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
                  this.$_swal.showValidationMessage(
                    `The following error(s) occurred: ${
                      errors?.[0] ||
                      response.status + " - Something went wrong."
                    }`
                  );
                }
                this.isLoading = false;
              })
              .catch((error) => {
                this.isLoading = false;
                this.$_swal.showValidationMessage(
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
                name: "login",
              });
            });
        });
    },

    async onSearchOffice() {
      if (this.office_registration_id.trim("") === "") return;
      this.search_loading = true;
      let payload = {
        office_registration_id: this.office_registration_id,
        request_from: "register",
      };
      try {
        const { data, status } = await this.$store.dispatch(
          "Account/SearchOffice",
          payload
        );
        console.log("data", data);
        if (status !== 200) {
          this.is_found_office = false;
          this.office_detail_id = null;
          this.office_name = null;
          this.old_region = null;
          this.old_province = null;
          this.old_city = null;
          this.old_barangay = null;
          this.old_street = null;
          this.$nextTick(() => {
            this.initApp();
          });
        } else {
          this.is_found_office = true;
          this.office_detail_id = data.id || "";
          this.office_name = data.office_name || null;
          this.old_region = data.region || null;
          this.old_province = data.province || null;
          this.old_city = data.city || null;
          this.old_barangay = data.barangay || null;
          this.old_street = data.street || null;
          // this.$nextTick(() => {
          //   $(".selectpicker").selectpicker("destroy");
          // });
        }
        this.search_loading = false;
      } catch (error) {
        this.search_loading = false;
        this.is_found_office = false;
        console.log("error", error);
      }
    },

    confirmedSaveAccount(payload) {
      this.isLoading = true;
    },
  },
};
</script>

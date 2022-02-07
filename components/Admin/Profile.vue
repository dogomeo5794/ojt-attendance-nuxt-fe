<template>
  <ValidationObserver ref="form">
    <Loading :is_loading="true" :size="'small'" v-if="is_loading" />
    <div class="row" v-else>
      <div class="col-sm-4 col-md-3 col-lg-3">
        <div class="card card-primary card-outline">
          <div class="card-body box-profile">
            <div class="text-center" style="position: relative">
              <p class="text-muted text-center" style="font-size: 11px">
                <i>** uploaded Profile Picture **</i>
              </p>
              <img
                id="user-pp"
                class="profile-user-img img-fluid img-circle"
                :src="`${getProfile || '/img/icons/avatar.jpg'}`"
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
                @click="newProfile = null"
                v-if="newProfile"
              >
                <i class="fas fa-times"></i> Cancel
              </button>

              <button
                class="btn btn-xs btn-default btn-block btn-flat button-upload mt-1"
                @click="$refs.profile.click()"
                v-if="!newProfile"
              >
                <i class="fas fa-camera"></i> Upload
              </button>
            </div>

            <p class="text-muted text-center mt-1">Profile Picture</p>
          </div>
        </div>

        <hr class="mt-4 mb-3" />

        <div class="form-group disabled-fields">
          <label>Account Type</label>
          <span class="form-control" style="height: auto"> Admin </span>
        </div>

        <div class="form-group disabled-fields">
          <label>Username</label>
          <span class="form-control" style="height: auto">
            {{ account.username || "---" }}
          </span>
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
                My Information
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
                      v-model="admin.first_name"
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
                      v-model="admin.middle_name"
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
                      v-model="admin.last_name"
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
                      v-model="admin.birthday"
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
                      v-model="admin.contact_no"
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
                <div class="form-group disabled-fields">
                  <label>Email</label>
                  <span class="form-control" style="height: auto">
                    {{ account.email || "---" }}
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
                My Address |
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
              </span>
            </h3>
          </div>
          <div
            class="card-body"
            :class="{ 'disabled-fields': !is_update_address }"
          >
            <div class="row" v-if="!is_update_address">
              <div class="col-lg-6">
                <div class="form-group">
                  <label>Region</label>
                  <span class="form-control" style="height: auto">
                    {{ admin.region || "---" }}
                  </span>
                </div>
              </div>

              <div class="col-lg-6">
                <div class="form-group">
                  <label>Province</label>
                  <span class="form-control" style="height: auto">
                    {{ admin.province || "---" }}
                  </span>
                </div>
              </div>

              <div class="col-lg-6">
                <div class="form-group">
                  <label>City</label>
                  <span class="form-control" style="height: auto">
                    {{ admin.city || "---" }}
                  </span>
                </div>
              </div>

              <div class="col-lg-6">
                <div class="form-group">
                  <label>Barangay</label>
                  <span class="form-control" style="height: auto">
                    {{ admin.barangay || "---" }}
                  </span>
                </div>
              </div>

              <div class="col-lg-12">
                <div class="form-group">
                  <label>Household/Street</label>
                  <span class="form-control" style="height: auto">
                    {{ admin.street || "---" }}
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
                      v-model="new_region"
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
                      v-model="new_province"
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
                      v-model="new_city"
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
                      v-model="new_barangay"
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
                      v-model="new_street"
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
            <button
              class="btn btn-outline-primary"
              type="button"
              @click="submitChanges"
            >
              <i class="fas fa-check"></i>
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  </ValidationObserver>
</template>

<script>
import phil from "phil-reg-prov-mun-brgy";
export default {
  data: () => ({
    is_loading: false,
    is_submit_loading: false,
    office: {},
    account: {},
    admin: {
      first_name: null,
      middle_name: null,
      last_name: null,
      birthday: null,
      contact_no: null,
    },

    newProfile: null,

    is_update_address: false,
    new_barangay: "",
    new_city: "",
    new_province: "",
    new_region: "",
    new_street: "",

    regionList: [],
    provinceList: [],
    cityList: [],
    barangayList: [],
  }),

  watch: {
    async new_region(newVal) {
      this.province = "";
      this.provinceList = await phil.getProvincesByRegion(newVal.reg_code);
      console.log("this.cityList", this.provinceList);
      this.$nextTick(() => $(`[name="province"]`).selectpicker("refresh"));
    },
    async new_province(newVal) {
      this.city = "";
      this.cityList = await phil.getCityMunByProvince(newVal.prov_code);
      console.log("this.cityList", this.cityList);
      this.$nextTick(() => $(`[name="city"]`).selectpicker("refresh"));
    },
    async new_city(newVal) {
      this.barangay = "";
      this.barangayList = await phil.getBarangayByMun(newVal.mun_code);
      this.$nextTick(() => $(`[name="barangay"]`).selectpicker("refresh"));
    },
    is_update_address(newVal) {
      if (newVal) {
        this.regionList = phil.regions;
        this.$nextTick(() => $(`.selectpicker`).selectpicker("refresh"));
      }
    },
  },

  computed: {
    getPersonnelID() {
      return this.$store.state.user?.company_id || null;
    },

    getAccountStatus() {
      return this.personnel?.evaluated?.action_perform || null;
    },
    getProfile() {
      return this.newProfile || this.account.profile;
    },
  },
  mounted() {
    // this.personnelInfo();
    this.resetForm();
  },

  methods: {
    resetForm() {
      this.is_loading = false;
      this.is_submit_loading = false;
      this.office = {};
      this.account = {};
      this.personnel = {};

      this.newProfile = null;

      this.$nextTick(() => {
        // this.personnelInfo();
        this.account = this.$store.state.userAccount || {};
        this.admin = {
          ...(this.$store.state.user || {}),
          first_name: this.$store.state?.user?.first_name || null,
          middle_name: this.$store.state?.user?.middle_name || null,
          last_name: this.$store.state?.user?.last_name || null,
          birthday: this.$store.state?.user?.birthday || null,
          contact_no: this.$store.state?.user?.contact_no || null,
        };
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

        this.newProfile = await toBase64(file);
        this.$refs.profile.value = null;
      }
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

    async submitChanges() {
      const valid = await this.validate();
      if (this.is_submit_loading === true || !valid) return;
      this.is_submit_loading = true;

      let payload = {
        first_name: this.admin.first_name || null,
        middle_name: this.admin.middle_name || null,
        last_name: this.admin.last_name || null,
        birthday: this.admin.birthday || null,
        contact_no: this.admin.contact_no || null,
        profile: this.getProfile || null,
        account_id: this.account.id || null,
        company_id: this.admin.company_id || null,
        account: "admin",
      };

      if (this.is_update_address) {
        payload.barangay = this.new_barangay?.name || null;
        payload.city = this.new_city?.name || null;
        payload.province = this.new_province?.name || null;
        payload.region = this.new_region?.name || null;
        payload.street = this.new_street || null;
      }

      console.log("payload", payload);

      this.$swal
        .preConfirm({
          title: `Confirmation`,
          text: `Are you sure you want to submit the changes?`,
          preConfirm: () => {
            return this.$store
              .dispatch("Account/UpdateInformation", payload)
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
          this.is_submit_loading = false;
          if (!result.isConfirmed) return;
          // this.resetForm();
          localStorage.clear();
          this.$store.commit("setUserAccount", {});
          this.$store.commit("setIsLogged", false);
          this.$store.commit("setUser", {});
          this.$swal
            .success({
              text: "Your information was successfully updated. Your session has stop. Please re-login again your again.",
            })
            .then(() => {
              let vm = this;
              setTimeout(() => {
                vm.$router.push({
                  name: "login",
                });
                resolve(true);
              }, 300);
            });
        });
    },

    async personnelInfo() {
      this.is_loading = true;
      let payload = {
        personnel_id: this.getPersonnelID,
      };

      try {
        const { data, status } = await this.$store.dispatch(
          "Account/AuthPersonnelInfo",
          payload
        );
        if ([200, 201].includes(status)) {
          this.office = data.office_details;
          this.account = data?.account || {};
          this.personnel = data;
        } else {
          this.office = {};
          this.account = {};
          this.personnel = {};
        }
        this.is_loading = false;
        console.log("data", data);
      } catch (error) {
        this.is_loading = false;
        console.log("error", error);
      }
    },
  },

  beforeMount() {},
};
</script>

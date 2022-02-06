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

            <h6
              class="heading-small text-muted text-center mt-3 text-uppercase"
            >
              <span
                :class="`badge badge-${
                  getAccountStatus === 'approved' ? 'success' : 'warning'
                }`"
              >
                {{ getAccountStatus || "Pending" }}
              </span>
            </h6>

            <p class="text-muted text-center mt-1">Profile Picture</p>
          </div>
        </div>

        <hr class="mt-4 mb-3" />

        <div class="form-group disabled-fields">
          <label>Company ID</label>
          <span class="form-control" style="height: auto">
            {{ personnel.company_id || "---" }}
          </span>
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
          <!-- <div class="card card-danger card-outline"> -->
          <!-- <div class="card-header">
            <h3 class="card-title">UAM Admin Information</h3>
          </div> -->
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
                My Office Information
              </span>
            </h3>
          </div>
          <div class="card-body disabled-fields">
            <div class="row">
              <div class="col-lg-4">
                <div class="form-group">
                  <label>Registration ID</label>
                  <span class="form-control" style="height: auto">
                    {{ office.office_registration_id || "---" }}
                  </span>
                </div>
              </div>
              <!-- <div class="col-lg-6"></div> -->
              <div class="col-lg-8">
                <div class="form-group">
                  <label>Office Name</label>
                  <span class="form-control" style="height: auto">
                    {{ office.office_name || "---" }}
                  </span>
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col-lg-12">
                <div class="form-group">
                  <label>Complete Address</label>
                  <span class="form-control" style="height: auto">
                    {{ office.street ? office.street + ", " : "" }}
                    {{ office.barangay ? office.barangay + ", " : "" }}
                    {{ office.city ? office.city + ", " : "" }}
                    {{ office.province ? office.province + ", " : "" }}
                    {{ office.region ? office.region : "" }}
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
                      v-model="personnel.first_name"
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
                      v-model="personnel.middle_name"
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
                      v-model="personnel.last_name"
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
                      v-model="personnel.birthday"
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
                      v-model="personnel.contact_no"
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
export default {
  data: () => ({
    is_loading: false,
    is_submit_loading: false,
    office: {},
    account: {},
    personnel: {},

    newProfile: null,
  }),

  watch: {},

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
    this.personnelInfo();
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
        this.personnelInfo();
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
        company_id: this.personnel.company_id || null,
        first_name: this.personnel.first_name || null,
        middle_name: this.personnel.middle_name || null,
        last_name: this.personnel.last_name || null,
        birthday: this.personnel.birthday || null,
        contact_no: this.personnel.contact_no || null,
        profile: this.getProfile || null,
        account_id: this.account.id || null,
      };

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
          this.resetForm();
          this.$swal.success({
            text: "Your information was successfully updated.",
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

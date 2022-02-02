<template>
  <div>
    <Loading :is_loading="true" :size="'small'" v-if="is_loading" />
    <div class="row" v-else>
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
                src="/img/icons/avatar.jpg"
                alt="User profile picture"
                style="border-radius: 0; width: 100%; border: 2px solid #adb5bd"
              />
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

        <div class="form-group">
          <label>Company ID</label>
          <span class="form-control" style="height: auto">
            {{ personnel.company_id || "---" }}
          </span>
        </div>

        <div class="form-group">
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
                Company/Office Information
              </span>
            </h3>
          </div>
          <div class="card-body">
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
                Authorized Personnel Information
              </span>
            </h3>
          </div>
          <div class="card-body">
            <div class="row">
              <div class="col-lg-4">
                <div class="form-group">
                  <label>First Name</label>
                  <span class="form-control" style="height: auto">
                    {{ personnel.first_name || "---" }}
                  </span>
                </div>
              </div>
              <div class="col-lg-4">
                <div class="form-group">
                  <label>Middle Name</label>
                  <span class="form-control" style="height: auto">
                    {{ personnel.middle_name || "---" }}
                  </span>
                </div>
              </div>
              <div class="col-lg-4">
                <div class="form-group">
                  <label>Last Name</label>
                  <span class="form-control" style="height: auto">
                    {{ personnel.last_name || "---" }}
                  </span>
                </div>
              </div>
              <div class="col-lg-4">
                <div class="form-group">
                  <label>Birthday</label>
                  <span class="form-control" style="height: auto">
                    {{ personnel.birthday || "---" }}
                  </span>
                </div>
              </div>
              <div class="col-lg-4">
                <div class="form-group">
                  <label>Contact No.</label>
                  <span class="form-control" style="height: auto">
                    {{ personnel.contact_no || "---" }}
                  </span>
                </div>
              </div>
              <div class="col-lg-4">
                <div class="form-group">
                  <label>Email</label>
                  <span class="form-control" style="height: auto">
                    {{ account.email || "---" }}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div
            class="card-footer clearfix border-top text-right"
            v-if="!getAccountStatus"
          >
            <button
              class="btn btn-outline-primary"
              type="button"
              @click="changeAccountStatus('approved')"
            >
              <i class="fas fa-check-circle"></i>
              Approve
            </button>

            <button
              class="btn btn-outline-danger"
              type="button"
              @click="changeAccountStatus('disapproved')"
            >
              <i class="fas fa-ban"></i>
              Disapprove
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data: () => ({
    is_loading: false,
    office: {},
    account: {},
    personnel: {},
  }),

  watch: {},

  computed: {
    getPersonnelID() {
      return this.$route.params.personnel_id || null;
    },

    getAccountStatus() {
      return this.personnel?.evaluated?.action_perform || null;
    },
  },
  mounted() {
    this.personnelInfo();
  },

  methods: {
    validateForm() {},

    submitAccount() {
      const valid = this.validateForm();
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
                name: "user-login",
              });
            });
        });
    },

    async changeAccountStatus(status) {
      if (["approved", "disapproved"].indexOf(status) === -1) {
        toastr.error("Invalid selected status!");
        return;
      }

      let payload = {
        company_id: this.personnel.company_id,
        admin_id: this.$store.state?.user?.id || null,
        status: status,
      };
      // try {
      //   const { status, data } = await this.$store.dispatch(
      //     `Account/ChangeAccountStatus`,
      //     payload
      //   );
      //   console.log("status", status);
      //   console.log("data", data);
      //   if (status === 200) {
      //     toastr.success(data);
      //   } else {
      //     toastr.error(data);
      //   }
      // } catch (error) {
      //   toastr.error(error.response || "Error for changing account status!");
      //   console.log("error", error);
      // }

      this.$swal
        .preConfirm({
          title: `Confirmation`,
          text: `Are you sure you want to "${status.toUpperCase()}" this account?`,
          confirmButtonText: "Continue",
          preConfirm: () => {
            return this.$store
              .dispatch("Account/ChangeAccountStatus", payload)
              .then((response) => {
                if (response.status !== 200) {
                  return this.$_swal.showValidationMessage(
                    `The following error(s) occurred: ${
                      response.data || "Something went wrong."
                    }`
                  );
                }
                return response.data;
              })
              .catch((error) => {
                return this.$_swal.showValidationMessage(
                  `The following error(s) occurred: ${error}`
                );
              });
          },
        })
        .then((result) => {
          if (!result.isConfirmed) return;
          toastr.success(result.value);
          this.personnelInfo();
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

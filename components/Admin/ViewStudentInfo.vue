<template>
  <h5 class="text-center" v-if="isLoading">Loading...</h5>
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
            </div>

            <p class="text-muted text-center mt-3">Student Profile</p>
          </div>
        </div>

        <div class="card">
          <div class="card-body box-profile">
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
                :style="`border-radius: 0;width: 100%;${
                  qr_code.trim('') == ''
                    ? 'opacity: 0.5;border: none;'
                    : 'padding: 0;border: 1px solid;'
                }`"
              />
              <button
                type="button"
                class="btn btn-xs btn-default btn-block btn-flat button-upload mt-4"
                :style="`${
                  qr_code.trim('') == '' ? 'pointer-events: none;' : ''
                }`"
                :disabled="qr_code.trim('') == ''"
                @click.prevent="downloadQRCode"
              >
                <i class="fas fa-download"></i> Download
              </button>
            </div>
          </div>
        </div>

        <button
          class="btn btn-outline-primary"
          type="button"
          @click.prevent="editStudentInfo"
        >
          <i class="fas fa-edit"></i>
          Edit Information
        </button>
      </div>

      <div class="col-sm-8 col-md-9 col-lg-9">
        <div class="card">
          <!-- <div class="card-header">
            <h3 class="card-title">
              <span style="
                font-weight: 600;
                font-size: 15px;
                color: #565656;
                font-style: italic;
              ">
                School Information
              </span>
            </h3>
          </div> -->
          <div class="card-header">
            <ul class="nav nav-pills ml-auto">
              <li class="nav-item">
                <a
                  :class="`nav-link ${
                    getActiveTab === 'information' ? 'active' : ''
                  }`"
                  href="#"
                  data-toggle="tab"
                  style="font-weight: bold"
                  @click.prevent="changeTab('information')"
                  :style="`${
                    getActiveTab === 'information' ? 'pointer-events:none;' : ''
                  }`"
                >
                  <i class="fas fa-user-cog"></i> School Information
                </a>
              </li>
              <li class="nav-item">
                <a
                  :class="`nav-link ${
                    getActiveTab === 'attendance' ? 'active' : ''
                  }`"
                  href="#"
                  data-toggle="tab"
                  style="font-weight: bold"
                  @click.prevent="changeTab('attendance')"
                  :style="`${
                    getActiveTab === 'attendance' ? 'pointer-events:none;' : ''
                  }`"
                >
                  <i class="fas fa-file-excel"></i> Attendance Records
                </a>
              </li>
            </ul>
          </div>
          <h6 class="text-center" v-if="isFetchLoading">Loading...</h6>
          <div
            class="card-body"
            v-if="getActiveTab === 'information' && !isFetchLoading"
          >
            <div class="row">
              <div class="col-lg-6">
                <div class="form-group">
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
                  <label>Course Code</label>
                  <span class="form-control" style="height: auto">{{
                    course_code || "---"
                  }}</span>
                </div>
              </div>
              <div class="col-lg-6">
                <div class="form-group">
                  <label>Course Name</label>
                  <span class="form-control" style="height: auto">{{
                    course_name || "---"
                  }}</span>
                </div>
              </div>
              <div class="col-lg-6">
                <div class="form-group">
                  <label>Section</label>
                  <span class="form-control" style="height: auto">{{
                    section || "---"
                  }}</span>
                </div>
              </div>
              <div class="col-lg-6">
                <div class="form-group">
                  <label>Year level</label>
                  <span class="form-control" style="height: auto">{{
                    year_level || "---"
                  }}</span>
                </div>
              </div>
            </div>
          </div>
          <div
            class="card-header"
            v-if="getActiveTab === 'information' && !isFetchLoading"
          >
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
          <div
            class="card-body"
            v-if="getActiveTab === 'information' && !isFetchLoading"
          >
            <div class="row">
              <div class="col-lg-4">
                <div class="form-group">
                  <label>First Name</label>
                  <span class="form-control" style="height: auto">{{
                    first_name || "---"
                  }}</span>
                </div>
              </div>
              <div class="col-lg-4">
                <div class="form-group">
                  <label>Middle Name</label>
                  <span class="form-control" style="height: auto">{{
                    middle_name || "---"
                  }}</span>
                </div>
              </div>
              <div class="col-lg-4">
                <div class="form-group">
                  <label>Last Name</label>
                  <span class="form-control" style="height: auto">{{
                    last_name || "---"
                  }}</span>
                </div>
              </div>
              <div class="col-lg-4">
                <div class="form-group">
                  <label>Birthday</label>
                  <span class="form-control" style="height: auto">{{
                    birthday || "---"
                  }}</span>
                </div>
              </div>
              <div class="col-lg-4">
                <div class="form-group">
                  <label>Contact No.</label>
                  <span class="form-control" style="height: auto">{{
                    contact_no || "---"
                  }}</span>
                </div>
              </div>
              <div class="col-lg-4">
                <div class="form-group">
                  <label>Email</label>
                  <span class="form-control" style="height: auto">{{
                    email || "---"
                  }}</span>
                </div>
              </div>
            </div>
          </div>
          <div
            class="card-header"
            v-if="getActiveTab === 'information' && !isFetchLoading"
          >
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
          <div
            class="card-body"
            v-if="getActiveTab === 'information' && !isFetchLoading"
          >
            <div class="row">
              <div class="col-lg-6">
                <div class="form-group">
                  <label>Region</label>
                  <span class="form-control" style="height: auto">{{
                    region || "---"
                  }}</span>
                </div>
              </div>

              <div class="col-lg-6">
                <div class="form-group">
                  <label>Province</label>
                  <span class="form-control" style="height: auto">{{
                    province || "---"
                  }}</span>
                </div>
              </div>
              <div class="col-lg-6">
                <div class="form-group">
                  <label>City</label>
                  <span class="form-control" style="height: auto">{{
                    city || "---"
                  }}</span>
                </div>
              </div>
              <div class="col-lg-6">
                <div class="form-group">
                  <label>Barangay</label>
                  <span class="form-control" style="height: auto">{{
                    barangay || "---"
                  }}</span>
                </div>
              </div>
              <div class="col-lg-12">
                <div class="form-group">
                  <label>Household/Street</label>
                  <span class="form-control" style="height: auto">{{
                    street || "---"
                  }}</span>
                </div>
              </div>
            </div>
          </div>

          <div
            class="card-header"
            v-if="getActiveTab === 'information' && !isFetchLoading"
          >
            <h3 class="card-title">
              <span
                style="
                  font-weight: 600;
                  font-size: 15px;
                  color: #565656;
                  font-style: italic;
                "
              >
                Office assigned to OJT
              </span>
            </h3>
          </div>
          <div
            class="card-body"
            :style="`${
              office.length === 0 ? 'border: 1px solid #6b5b95;' : ''
            }`"
            v-if="getActiveTab === 'information' && !isFetchLoading"
          >
            <div class="row">
              <div class="col-lg-12" v-if="office.length === 0">
                <div class="form-group">
                  <label>Company/Office Registration ID or Name</label>
                  <div class="row">
                    <div class="col-lg-8">
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
                        @blur.prevent="onSearchOffice"
                      />
                    </div>
                    <div class="col-lg-4">
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
                        :style="`${
                          office_registration_id.trim('') === ''
                            ? 'pointer-events: none'
                            : ''
                        }`"
                        :disabled="office_registration_id.trim('') === ''"
                      >
                        <i class="fas fa-search"></i>
                      </button>
                      <span
                        :class="`btn btn-outline-default ${
                          is_found_office === true
                            ? 'text-success'
                            : 'text-danger'
                        }`"
                        style="
                          padding: 0;
                          font-size: 15px;
                          pointer-events: none;
                          margin-left: 10px;
                        "
                        v-if="!search_loading && is_found_office !== null"
                      >
                        <i
                          :class="`fas ${
                            is_found_office === true
                              ? 'fa-check-circle text-success'
                              : 'fa-times-circle text-danger'
                          }`"
                        ></i>
                        {{
                          is_found_office === true
                            ? "Office found"
                            : "No office found"
                        }}
                      </span>
                    </div>
                  </div>
                </div>

                <hr class="mt-4 mb-3" />
              </div>
              <div class="col-lg-6">
                <div class="form-group">
                  <label>Company/Office Registration ID</label>
                  <span class="form-control" style="height: auto">{{
                    office_reg_id || "---"
                  }}</span>
                </div>
              </div>
              <div class="col-lg-12">
                <div class="form-group">
                  <label>Company/Office Name</label>
                  <span class="form-control" style="height: auto">{{
                    office_name || "---"
                  }}</span>
                </div>
              </div>
              <div class="col-lg-12">
                <div class="form-group">
                  <label>Company/Office Address</label>
                  <span class="form-control" style="height: auto">{{
                    office_address || "---"
                  }}</span>
                </div>
              </div>

              <div class="col-lg-12 text-right" v-if="office.length === 0">
                <hr />
                <button
                  class="btn btn-sm btn-outline-danger"
                  type="button"
                  @click.prevent="saveAssignedOffice"
                  :disabled="!is_found_office"
                  :style="`${is_found_office ? '' : 'pointer-events: none'}`"
                >
                  <i class="fas fa-edit"></i>
                  Save Office
                </button>
              </div>
            </div>
          </div>

          <div
            class="card-body p-0 table-responsive"
            v-if="getActiveTab === 'attendance' && !isFetchLoading"
          >
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
                <tr v-for="(i, k) in attendanceRecords" :key="k">
                  <td class="text-left">
                    {{ toDate(i.attendance_date) || "---" }}
                  </td>
                  <td class="text-center">
                    {{ toTime(i.time_in_am) || "---" }}
                  </td>
                  <td class="text-center">
                    {{ toTime(i.time_out_am) || "---" }}
                  </td>
                  <td class="text-center">
                    {{ toTime(i.time_in_pm) || "---" }}
                  </td>
                  <td class="text-center">
                    {{ toTime(i.time_out_pm) || "---" }}
                  </td>
                  <td class="text-right">{{ i.total_hours || 0 }}</td>
                </tr>

                <tr>
                  <td colspan="5" class="text-right">Total</td>
                  <td class="text-right">00:00</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </form>
</template>

<script>
import { mapGetters } from "vuex";
import QRCode from "qrcode";
import moment from "moment";
export default {
  data: () => ({
    isLoading: false,
    regionList: [],
    provinceList: [],
    cityList: [],
    barangayList: [],
    respStatusCode: null,

    qr_code: "",
    office_registration_id: "",
    search_loading: false,
    is_found_office: null,

    office_sys_id: "",
    office_reg_id: "",
    office_name: "",
    office_address: "",

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

    activeTab: "",
    isFetchLoading: false,
    attendanceRecords: [],
    studentInfo: {},
  }),

  watch: {
    school_id(newVal) {
      const qr_string = newVal.trim("");
      if (qr_string === "") {
        this.qr_code = "";
        return;
      }
      this.generateQRCode(qr_string);
    },
    $route(route) {
      console.log("route", route);
      console.log(route?.query?.tab || "");
      this.activeTab = route?.query?.tab || "";
      this.collectData(route?.query?.tab || "");
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

    getActiveTab() {
      return this.$route?.query?.tab || "information";
    },

    toDate() {
      return (d) => {
        return d ? moment(new Date(d)).format("MM/DD/YYYY") : null;
      };
    },
    toTime() {
      return (d) => {
        return d ? moment(new Date(d)).format("hh:mm A") : null;
      };
    },
  },

  mounted() {
    this.getStudentInfo();
    this.collectData(this.$route?.query?.tab || "");
  },

  methods: {
    changeTab(tab = "") {
      this.$router.push({
        name: "view-student-info",
        query: {
          tab: tab,
        },
      });
    },

    collectData(tab) {
      console.log("tab is ", tab);
      this.isFetchLoading = true;
      if (tab === "attendance") {
        console.log("active tab is attendance");
        this.getAttendance();
      } else {
        console.log("active tab is information");
        this.getInformation();
      }
    },

    getInformation() {
      this.studentInfo = {};
      setTimeout(() => {
        this.isFetchLoading = false;
      }, 2000);
    },

    async getAttendance() {
      try {
        let payload = {
          student_id: this.getStudentId,
        };
        const { data, status } = await this.$store.dispatch(
          "Attendance/CollectAttendanceByStudent",
          payload
        );
        console.log("data", data);
        console.log("status", status);
        this.attendanceRecords = [200, 201].indexOf(status) > -1 ? data : [];
        this.isFetchLoading = false;
      } catch (error) {
        this.isFetchLoading = false;
        console.log("error", error);
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

    downloadQRCode() {
      if (this.qr_code.trim("") == "") return;
      let fileDownload = require("js-file-download");
      const BASE64_MARKER = ";base64,";
      const parts = this.qr_code.split(BASE64_MARKER);
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
      fileDownload(blob, `qr_code_${this.school_id}.${ext}`);
    },

    resetForm() {},

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
        this.isLoading = false;
      } catch (err) {
        this.isLoading = false;
        console.log("error", error);
      }
    },

    async onSearchOffice() {
      if (this.office_registration_id.trim("") === "") return;
      this.search_loading = true;
      let payload = {
        office_registration_id: this.office_registration_id,
        request_from: "student_assign_office",
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

          this.office_sys_id = data?.id || "";
          this.office_reg_id = data?.office_registration_id || "";
          this.office_name = data?.office_name || "";

          let i = data;
          this.office_address = `${i.street ? i.street + ", " : ""}${
            i.barangay ? i.barangay + ", " : ""
          }${i.city}, ${i.province} ${i.region}`;
        }
        this.search_loading = false;
      } catch (error) {
        this.search_loading = false;
        this.is_found_office = false;
        console.log("error", error);
      }
    },

    async saveAssignedOffice() {
      let payload = {
        office_id: this.office_sys_id,
        student_id: this.id,
      };

      this.$swal
        .preConfirm({
          title: `Assigning Office`,
          text: `Are you sure you want to submit an office assignment?`,
          preConfirm: () => {
            return this.$store
              .dispatch("Student/AssigningOffice", payload)
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

          this.$swal.fire({
            title: "Success!",
            text: "Successfully assigned to office.",
            confirmButtonText: "OK",
          });

          this.getStudentInfo();
        });
    },

    editStudentInfo() {
      this.$router.push({
        name: "update-student",
        params: { id: this.getStudentId },
      });
    },

    confirmedSaveAccount(payload) {
      this.isLoading = true;
    },
  },
};
</script>

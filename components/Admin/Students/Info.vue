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
                :src="`/img/icons/avatar.jpg`"
                alt="User profile picture"
                style="border-radius: 0; width: 100%; border: 2px solid #adb5bd"
              />
            </div>

            <p class="text-muted text-center mt-3">Student Profile</p>

            <p class="text-muted text-center mt-3">
              ID: {{ student.school_id || "---" }}
            </p>
          </div>
        </div>

        <div class="card">
          <div class="card-body box-profile">
            <div class="text-center" style="position: relative">
              <img
                id="user-pp"
                class="profile-user-img img-fluid img-circle"
                :src="`${qr_code || `/img/icons/qr-avatar.png`}`"
                alt="User profile picture"
                :style="`border-radius: 0;width: 100%;${
                  qr_code
                    ? 'padding: 0;border: 1px solid;'
                    : 'opacity: 0.5;border: none;'
                }`"
              />
              <button
                type="button"
                class="btn btn-xs btn-default btn-block btn-flat button-upload mt-4"
                :style="`${qr_code ? '' : 'pointer-events: none;'}`"
                :disabled="qr_code ? false : true"
                @click.prevent="downloadQRCode"
              >
                <i class="fas fa-download"></i> Download
              </button>
            </div>
          </div>
        </div>

        <button
          class="btn btn-outline-primary mb-5"
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

          <!-- <div
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
          </div> -->
          <div
            class="card-body"
            v-if="getActiveTab === 'information' && !isFetchLoading"
          >
            <h6 class="heading-small text-muted mb-4">
              <span class="badge badge-info">Student Information</span>
            </h6>
            <div class="text-muted">
              <div class="">
                <!-- <h6 class="heading-small text-muted mb-4">
                      <span class="badge badge-info">Student Details</span>
                    </h6> -->
                <div class="row">
                  <div class="col-12">
                    <p class="text-sm">
                      Course Code: Course Name / Year - Section
                      <b class="d-block">
                        {{ student.course_code || "---" }}:
                        {{ student.course_name || "---" }} /
                        {{ student.year_level || "---" }} -
                        {{ student.section || "---" }}
                      </b>
                    </p>
                  </div>
                </div>

                <div class="row">
                  <div class="col-12">
                    <p class="text-sm">
                      Full Name
                      <b class="d-block">
                        {{ student.first_name || "---" }}
                        {{ student.last_name || "---" }}
                      </b>
                    </p>
                  </div>
                  <div class="col-6">
                    <p class="text-sm">
                      Birthday
                      <b class="d-block">
                        {{ student.birthday || "---" }}
                      </b>
                    </p>
                  </div>
                  <div class="col-6">
                    <p class="text-sm">
                      Contact
                      <b class="d-block">
                        {{ student.contact_no || "---" }}
                      </b>
                    </p>
                  </div>
                  <div class="col-12">
                    <p class="text-sm">
                      Email
                      <b class="d-block">
                        {{ student.email || "---" }}
                      </b>
                    </p>
                  </div>
                </div>

                <div class="row">
                  <div class="col-12">
                    <p class="text-sm">
                      Address
                      <b class="d-block">
                        {{ student.street ? student.street + ", " : "" }}
                        {{ student.barangay ? student.barangay + ", " : "" }}
                        {{ student.city ? student.city + ", " : "" }}
                        {{ student.province ? student.province + ", " : "" }}
                        {{ student.region ? student.region : "" }}
                      </b>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div
            class="card-header"
            v-if="getActiveTab === 'information' && !isFetchLoading"
          >
            <!-- <h3 class="card-title">
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
            </h3> -->
          </div>
          <div
            class="card-body"
            :style="`${
              office.length === 0 ? 'border: 1px solid #6b5b95;' : ''
            }`"
            v-if="getActiveTab === 'information' && !isFetchLoading"
          >
            <h6 class="heading-small text-muted mb-4">
              <span class="badge badge-info">Office assigned to OJT</span>
            </h6>
            <div class="row" v-if="office.length > 0">
              <div class="col-sm-12">
                <div class="text-muted">
                  <div class="">
                    <div class="row">
                      <div class="col-sm-6">
                        <p class="text-sm">
                          Company/Office Registration ID
                          <b class="d-block">
                            {{ office_reg_id || "---" }}
                          </b>
                        </p>
                      </div>
                      <div class="col-sm-12">
                        <p class="text-sm">
                          Company/Office Name
                          <b class="d-block">
                            {{ office_name || "---" }}
                          </b>
                        </p>
                      </div>
                      <div class="col-sm-12">
                        <p class="text-sm">
                          Company/Office Address
                          <b class="d-block">
                            {{ office_address || "---" }}
                          </b>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="row" v-else>
              <div class="col-lg-12" v-if="office.length === 0">
                <div class="form-group">
                  <label>Company/Office Registration ID or Name</label>
                  <div class="row">
                    <div class="col-lg-10 col-10">
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
                    <div class="col-lg-2 col-2">
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
                          office_registration_id ? '' : 'pointer-events: none'
                        }`"
                        :disabled="!office_registration_id"
                      >
                        <i class="fas fa-search"></i>
                      </button>
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

    attendance: [],
    student: {},
    office: {},
  }),

  watch: {
    school_id(newVal) {
      if (!newVal) {
        this.qr_code = "";
        return;
      }
      this.generateQRCode(newVal);
    },
    $route(route) {
      this.activeTab = route?.query?.tab || "";
      this.collectData(route?.query?.tab || "");
    },
  },

  computed: {
    getStudentId() {
      return this.$route?.params?.student_id || "";
    },

    getActiveTab() {
      return this.$route?.query?.tab || "information";
    },

    toDate() {
      return (d) => {
        return d ? this.$moment(new Date(d)).format("MM/DD/YYYY") : null;
      };
    },
    toTime() {
      return (d) => {
        return d ? this.$moment(new Date(d)).format("hh:mm A") : null;
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
        name: "admin-dashboard-students-student_id-view",
        query: {
          tab: tab,
        },
      });
    },

    collectData(tab) {
      console.log("tab is ", tab);
      // this.isFetchLoading = true;
      if (tab === "attendance") {
        console.log("active tab is attendance");
        this.getAttendance();
      } else {
        console.log("active tab is information");
        this.getInformation();
      }
    },

    getInformation() {
      // this.studentInfo = {};
      // setTimeout(() => {
      //   this.isFetchLoading = false;
      // }, 2000);
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
      if (!this.qr_code) return;
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

          this.attendance = data.attendance_list || [];
          this.office = data?.office || [];
          delete data.attendance_list;
          delete data.office;
          this.student = data || {};
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
      if (!this.office_registration_id) return;
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
          this.office_reg_id = null;
          this.office_name = null;
          this.office_address = null;
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
          if (!result.isConfirmed) return;

          this.$_swal.fire({
            title: "Success!",
            text: "Successfully assigned to office.",
            icon: "success",
            confirmButtonText: "OK",
          });

          this.getStudentInfo();
        });
    },

    editStudentInfo() {
      this.$router.push({
        name: "admin-dashboard-students-student_id-update",
        params: { student_id: this.getStudentId },
      });
    },

    confirmedSaveAccount(payload) {
      this.isLoading = true;
    },
  },
};
</script>

<template>
  <div class="container mb-5">
    <div class="row">
      <div class="col-12">
        <div class="row">
          <div class="col-sm-4 col-md-3 col-lg-3">
            <div class="card card-primary card-outline">
              <div class="card-body box-profile">
                <div class="text-center" style="position: relative">
                  <p class="text-muted text-center" style="font-size: 11px">
                    <i>** Uploaded Profile Picture **</i>
                  </p>
                  <img
                    id="user-pp"
                    class="profile-user-img img-fluid img-circle"
                    :src="`${student.profile || '/img/icons/avatar.jpg'}`"
                    alt="User profile picture"
                    style="
                      border-radius: 0;
                      width: 100%;
                      border: 2px solid #adb5bd;
                    "
                  />
                </div>

                <p class="text-muted text-center mt-3">
                  ID: {{ student.school_id || "---" }}
                </p>

                <button
                  type="button"
                  class="btn btn-xs btn-default btn-block btn-flat button-upload mt-1"
                  @click="viewQRCode"
                >
                  <i class="fas fa-qrcode"></i> View QR Code
                </button>
              </div>
            </div>
          </div>

          <div class="col-sm-8 col-md-9 col-lg-9">
            <div class="text-muted">
              <hr class="mb-4" />
              <div class="pl-lg-4 pl-sm-2">
                <h6 class="heading-small text-muted mb-4">
                  <span class="badge badge-primary">Student Details</span>
                </h6>
                <div class="row">
                  <div class="col-6">
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
                      Course / Year - Section
                      <b class="d-block">
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

              <hr class="my-4" />
              <div class="pl-lg-4 pl-sm-2">
                <h6 class="heading-small text-muted mb-4">
                  <span class="badge badge-primary">Office Details</span>
                  <span
                    class="badge badge-danger"
                    v-if="Object.keys(office).length === 0"
                  >
                    <i class="fas fa-times"></i> No office assigned yet
                  </span>
                </h6>

                <div class="row">
                  <div class="col-12">
                    <p class="text-sm">
                      OJT Office
                      <b class="d-block">
                        {{ office.office_name || "" }}
                        {{
                          Object.keys(office).length === 0
                            ? "-- No office --"
                            : ""
                        }}
                      </b>
                    </p>
                  </div>
                </div>
                <div class="row">
                  <div class="col-12">
                    <p class="text-sm">
                      OJT Office Address
                      <b class="d-block">
                        {{ office.street ? office.street + ", " : "" }}
                        {{ office.barangay ? office.barangay + ", " : "" }}
                        {{ office.city ? office.city + ", " : "" }}
                        {{ office.province ? office.province + ", " : "" }}
                        {{ office.region ? office.region : "" }}
                        {{
                          Object.keys(office).length === 0
                            ? "-- No office --"
                            : ""
                        }}
                      </b>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="col-sm-12">
        <hr class="my-4" />
        <h6 class="heading-small text-muted mb-4">
          <span class="badge badge-primary">Attendance Records</span>
        </h6>
        <div class="card">
          <!-- <div class="card-header">
            <h3 class="card-title">
              <span class="badge badge-primary">Attendance Records</span>
            </h3>
          </div> -->
          <div class="card-body p-0 table-responsive">
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
                <tr v-if="attendance.length === 0">
                  <td colspan="6" class="text-center">
                    <i class="fas fa-exclamation-triangle"></i>
                    No data found!
                  </td>
                </tr>
                <tr v-for="(i, k) in attendance" :key="k">
                  <td class="text-left">
                    {{ toDateOnly(i.attendance_date) || "---" }}
                  </td>
                  <td class="text-center">
                    {{ toTimeOnly(i.time_in_am) || "---" }}
                  </td>
                  <td class="text-center">
                    {{ toTimeOnly(i.time_out_am) || "---" }}
                  </td>
                  <td class="text-center">
                    {{ toTimeOnly(i.time_in_pm) || "---" }}
                  </td>
                  <td class="text-center">
                    {{ toTimeOnly(i.time_out_pm) || "---" }}
                  </td>
                  <td class="text-right">
                    {{ formattedTime(i.total, "HH:mm") || "00:00" }} hrs
                  </td>
                </tr>

                <tr v-if="attendance.length > 0">
                  <!-- <td>
                    Page:
                    <select style="padding: 0 5px" name="page">
                      <option value="">1</option>
                      <option value="">2</option>
                      <option value="">3</option>
                    </select>
                  </td> -->
                  <td colspan="5" class="text-center">Total</td>
                  <td class="text-right">{{ total_time || "00:00" }} hrs</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div class="">
          <button class="btn btn-outline-danger" @click="$router.go(-1)">
            <i class="fas fa-arrow-left"></i> Back
          </button>
          <!-- <button class="btn btn-outline-success">
            <i class="fas fa-file-excel"></i> Export
          </button> -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data: () => ({
    isLoading: false,

    attendance: [],
    student: {},
    office: [],
    total_time: null,
  }),

  props: ["student_id"],

  computed: {
    toDateOnly() {
      return (d) => {
        return d ? this.$moment(new Date(d)).format("MM/DD/YYYY") : null;
      };
    },
    toTimeOnly() {
      return (d) => {
        return d ? this.$moment(new Date(d)).format("hh:mm A") : null;
      };
    },
  },

  mounted() {
    this.getStudentByID();
  },

  methods: {
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
    viewQRCode() {
      this.$_swal
        .fire({
          title: "QR Code",
          text: "",
          imageUrl: this.student.qr_code,
          imageWidth: 400,
          imageHeight: 400,
          imageAlt: "Student QR Code",
          showCancelButton: true,
          confirmButtonText: "Download QR Code",
          confirmButtonColor: "#b2ad7f",
          cancelButtonText: "Close",
        })
        .then((result) => {
          if (result.isConfirmed) {
            this.downloadQRCode(this.student.qr_code);
          }
        });
    },
    async getStudentByID() {
      this.isLoading = true;
      const payload = {
        school_id: this.student_id,
      };
      try {
        const { status, data } = await this.$store.dispatch(
          `Student/CollectStudentInfo`,
          payload
        );
        console.log("status", status);
        console.log("data", data);
        if ([200, 201].indexOf(status) > -1) {
          this.attendance =
            data.attendance_list.map((i) => {
              let am = this.calculateDiff(i.time_in_am, i.time_out_am);
              let pm = this.calculateDiff(i.time_in_pm, i.time_out_pm);
              let total = this.calculateTime(am, pm);
              // total = this.formattedTime(total, "HH:mm");
              i.total = total;
              return i;
            }) || [];
          // this.office = data?.office?.[0] || {};

          this.office =
            data?.office?.find((i) => i.pivot.duty_status === "active") || {};
          delete data.attendance_list;
          delete data.office;
          this.student = data || {};
        }
        this.$nextTick(() => {
          this.isLoading = false;
          this.total_time = this.attendance.reduce((prev, cur) => {
            let c = this.formattedTime(cur.total);
            let p = prev == "00:00:00" ? prev : this.formattedTime(prev);
            return this.$moment.duration(c).add(p);
          }, "00:00:00");
          this.$nextTick(() => {
            this.total_time =
              this.total_time === "00:00:00"
                ? this.total_time
                : this.formattedTime(this.total_time, "HH:mm");
          });
        });
      } catch (error) {
        this.isLoading = false;
      }
    },

    toTime(d) {
      return d ? this.$moment(d).format("HH:mm:ss") : null;
    },

    calculateTime(prev, cur) {
      return this.$moment.duration(cur).add(prev) || null;
    },

    calculateDiff(start, end) {
      if (!start || !end) return null;
      let start_date = this.$moment(start, "YYYY-MM-DD HH:mm:ss");
      let end_date = this.$moment(end, "YYYY-MM-DD HH:mm:ss");
      var ms = end_date.diff(start_date);
      var d = this.$moment.duration(ms);
      var s = Math.floor(d.asHours()) + this.$moment.utc(ms).format(":mm:ss");
      return s;
    },

    formattedTime(time, format = "HH:mm:ss") {
      if (!time) return null;
      return this.$moment.utc(time.asMilliseconds()).format(format) || null;
    },
  },
};
</script>

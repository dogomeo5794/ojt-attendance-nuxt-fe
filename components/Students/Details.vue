<template>
  <div class="container mb-3">
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
                src="/img/icons/avatar.jpg"
                alt="User profile picture"
                style="border-radius: 0; width: 100%; border: 2px solid #adb5bd"
              />
            </div>

            <p class="text-muted text-center mt-3">ID: RRD-2021-001</p>

            <button
              type="button"
              class="btn btn-xs btn-default btn-block btn-flat button-upload mt-1"
              @click="viewQRCode"
            >
              <i class="fas fa-qrcode"></i> View QR Code
            </button>
          </div>
        </div>

        <div class="form-group mb-3">
          <span class="form-control" style="height: auto">
            {{ student.first_name || "---" }} {{ student.last_name || "---" }}
          </span>
          <label class="bottom-label" v-show="true"> Full Name </label>
        </div>

        <div class="form-group mb-3">
          <span class="form-control" style="height: auto">
            {{ student.street ? student.street + ", " : "" }}
            {{ student.barangay ? student.barangay + ", " : "" }}
            {{ student.city ? student.city + ", " : "" }}
            {{ student.province ? student.province + ", " : "" }}
            {{ student.region ? student.region : "" }}
          </span>
          <label class="bottom-label" v-show="true"> Address </label>
        </div>

        <div class="form-group mb-3">
          <span class="form-control" style="height: auto">
            BSIT / 3rd - A
          </span>
          <label class="bottom-label" v-show="true">
            Course / Year - Section
          </label>
        </div>

        <div class="form-group mb-3">
          <span class="form-control" style="height: auto"> SAMPLE </span>
          <label class="bottom-label" v-show="true"> OJT Office </label>
        </div>

        <div class="form-group mb-3">
          <span class="form-control" style="height: auto">
            Sample sample sample
          </span>
          <label class="bottom-label" v-show="true"> OJT Office Address </label>
        </div>
      </div>

      <div class="col-sm-8 col-md-9 col-lg-9">
        <div class="card">
          <!-- <div class="card card-danger card-outline"> -->
          <div class="card-header">
            <h3 class="card-title">Attendance Records</h3>
          </div>
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
                <tr
                  v-for="(item, key) in [
                    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 1, 2, 3, 4, 5, 6, 7, 8, 9,
                    10,
                  ]"
                  :key="key"
                >
                  <td class="text-left">9/21/2021</td>
                  <td class="text-center">8:00 AM</td>
                  <td class="text-center">11:30 AM</td>
                  <td class="text-center">1:00 PM</td>
                  <td class="text-center">5:30 PM</td>
                  <td class="text-right">{{ key }}</td>
                </tr>

                <tr>
                  <!-- <td>
                    Page:
                    <select style="padding: 0 5px" name="page">
                      <option value="">1</option>
                      <option value="">2</option>
                      <option value="">3</option>
                    </select>
                  </td> -->
                  <td colspan="5" class="text-center">Total</td>
                  <td class="text-right">00:00</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <button class="btn btn-outline-success float-right">
          <i class="fas fa-file-excel"></i> Export
        </button>
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
    office: {},
  }),

  props: ["student_id"],

  computed: {},

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
          this.attendance = data.attendance_list || [];
          this.office = data.office || {};
          delete data.attendance;
          delete data.office;
          this.student = data || {};
        }
        this.$nextTick(() => (this.isLoading = false));
      } catch (error) {
        this.isLoading = false;
      }
    },
  },
};
</script>

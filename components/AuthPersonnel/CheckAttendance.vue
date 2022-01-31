<template>
  <div class="my-auto" style="padding: 20px 0 20px 0;">
    <div class="col-lg-8 col-sm-10 mx-auto">
      <div class="callout callout-danger" v-if="error">
        <h5>
          <i class="fas fa-exclamation-triangle text-danger"></i> Something went wrong!
        </h5>
        <p>{{ error }}</p>
      </div>

      <div class="callout callout-danger" v-if="scanError">
        <h5>
          <i class="fas fa-exclamation-triangle text-danger"></i> Failed to scan
        </h5>
        <p>{{ scanError }}</p>
      </div>

      <div class="callout callout-success" v-if="isValid===true">
        <h5>
          Attendance Checked
        </h5>
        <ul>
          <li>
            <i class="fas fa-check-circle text-success"></i> Present
          </li>
          <li>
            <i class="fas fa-user"></i> {{ studentInfo.name||"---" }}
          </li>
          <li>
            <i class="fas fa-clock"></i> {{ studentInfo.time||"---" }}
          </li>
        </ul>
      </div>
      
      <div class="card" v-if="!startScan">
        <div class="card-body box-profile text-center">
          <div class="mx-auto" style="position: relative;width: 50%;opacity: 0.6;">
            <span class="label" style="
              background: white;
              border: 1px dotted;
              padding: 10px;
              position: absolute;
              top: 50%;
              left: 50%;
              transform: translate(-50%, -50%);
              font-size: 13px;
              font-weight: bold;
            ">OJT Attendance</span>
            <img id="user-pp" class="profile-user-img img-fluid img-circle" 
              :src="`${assetUrl}/img/icons/scan-qrcode.png`" alt="User profile picture"
              style="border-radius: 0;width: 100%;border: none;"
            >
          </div>

          <button class="btn btn-primary mt-5" @click.prevent="onStartScan">
            <i class="fas fa-camera"></i> Click to Scan QR Code
          </button>
        </div>
      </div>
    </div>


    <qrcode-stream :camera="camera" @decode="onDecode" @init="onInit" v-if="startScan">
      <button class="btn btn-danger btn-flat"
        @click.prevent="cancelScan"
        style="top: 0;right: 0;position: absolute;"
      >
        <i class="fas fa-times"></i>
      </button>
      <div class="validation-pending"
        style="
          top: 50%;
          left: 50%;
          position: absolute;
          background: white;
          transform: translate(-50%, -50%);
          padding: 20px 25px;
          font-weight: bold;
          border: 2px solid dodgerblue;
        "
        v-if="scanLoading"
      >
        <i class="fas fa-spinner fa-pulse"></i> Scanning QR Code
      </div>
    </qrcode-stream>

  </div>
</template>

<script>
import { QrcodeStream, QrcodeDropZone, QrcodeCapture } from 'vue-qrcode-reader'
import { mapGetters } from "vuex";
export default {

  components: { QrcodeStream },

  data () {
    return {
      isValid: undefined,
      camera: 'auto',
      result: null,
      error: '',
      scanError: '',
      isLoading: false,
      studentInfo: "",
      startScan: false,
      scanLoading: false,
    }
  },

  computed: {
    ...mapGetters({
      baseUrl: "getBaseUrl",
      assetUrl: "getAssetUrl",
      session: "getSession",
      userDetails: "getUserDetails",
    }),

    validationPending () {
      return this.isValid === undefined
        && this.camera === 'off'
    },

    validationSuccess () {
      return this.isValid === true
    },

    validationFailure () {
      return this.isValid === false
    },
  },

  methods: {

    onStartScan() {
      this.startScan = true;
      this.isValid = undefined;
      this.result = null;
      this.error = "";
      this.scanError = "";
      this.studentInfo = "";
      this.turnCameraOn();
      console.log("userDetails", this.userDetails)
    },

    cancelScan() {
      this.startScan = false;
      this.isValid = undefined;
      this.result = null;
      this.error = "";
      this.scanError = "";
      this.studentInfo = "";
      this.scanLoading = false;
    },

    async onInit (promise) {
      // promise
      //   .catch(console.error)
      //   .then(this.resetValidationState)
      try {
        await promise
      } catch (error) {
        if (error.name === 'NotAllowedError') {
          this.error = "ERROR: you need to grant camera access permission"
        } else if (error.name === 'NotFoundError') {
          this.error = "ERROR: no camera on this device"
        } else if (error.name === 'NotSupportedError') {
          this.error = "ERROR: secure context required (HTTPS, localhost)"
        } else if (error.name === 'NotReadableError') {
          this.error = "ERROR: is the camera already in use?"
        } else if (error.name === 'OverconstrainedError') {
          this.error = "ERROR: installed cameras are not suitable"
        } else if (error.name === 'StreamApiNotSupportedError') {
          this.error = "ERROR: Stream API is not supported in this browser"
        } else if (error.name === 'InsecureContextError') {
          this.error = 'ERROR: Camera access is only permitted in secure context. Use HTTPS or localhost rather than HTTP.';
        } else {
          this.error = `ERROR: Camera error (${error.name})`;
        }
      }
    },

    resetValidationState () {
      this.isValid = undefined
    },

    async onDecode (content) {
      this.result = content;
      this.turnCameraOff();
      this.scanLoading = true;

      try {
        let payload = {
          student_id: content,
          personnel_id: this.userDetails?.company_id||"",
          token: "sample token"
        }
        const {data, status} = await this.$store.dispatch("Attendance/CheckingAttendance", payload);
        console.log('data', data)
        console.log('status', status)
        if ([200, 201].indexOf(status) > -1) {
          this.isValid = true;
          this.studentInfo = data;
        }
        else {
          this.scanError = data;
          this.isValid = false;
        }
        this.scanLoading = false;
        this.startScan = false;
      } catch (error) {
        console.log("error", data);
        this.scanError = error;
        this.isValid = false;
        this.scanLoading = false;
        this.startScan = false;
      }

    },

    turnCameraOn () {
      this.camera = 'auto'
    },

    turnCameraOff () {
      this.camera = 'off'
    },

  }
}
</script>

<style>
.error {
  font-weight: bold;
  color: red;
}

.main-scanner .body {
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  position: absolute;
}

.main-scanner .body .btn-app {
  padding: 30px;
  height: auto;
  font-size: 15px;
  font-weight: bold;
}
</style>
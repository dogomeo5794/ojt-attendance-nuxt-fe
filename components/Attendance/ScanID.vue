<template>
  <div
    :class="{ fullscreen: fullscreen }"
    ref="wrapper"
    @fullscreenchange="onFullscreenChange"
  >
    <div class="qr-code-wrapper" v-if="hasCamera">
      <qrcode-stream
        :camera="camera"
        @decode="onDecode"
        @init="onInit"
        :torch="hasTorch"
        :track="paintBoundingBox"
      >
        <div class="my-2 mx-2">
          <button
            class="btn btn-sm btn-outline-success btn-flat"
            @click="toggleTorch"
            :disabled="torchNotSupported"
          >
            <i class="fas fa-bolt"></i> {{ this.hasTorch ? "ON" : "OFF" }}
          </button>

          <button
            class="btn btn-sm btn-outline-success btn-flat"
            @click="switchCamera"
            :disabled="noRearCamera || noFrontCamera"
          >
            <i class="fas fa-camera"></i>
            {{
              camera === "auto" ? "Auto" : camera === "front" ? "Front" : "Rear"
            }}
          </button>

          <button
            class="btn btn-sm btn-outline-success btn-flat"
            @click="fullscreen = !fullscreen"
          >
            <i :class="fullscreenIcon"></i>
            {{ fullscreen ? "Expand" : "Compress" }}
          </button>

          <button
            class="btn btn-sm btn-outline-danger float-right btn-close"
            @click="closeButton"
          >
            <i class="fas fa-times"></i>
          </button>
        </div>

        <div class="validation-pending" v-if="is_loading">
          <div class="validation-content">
            <i class="fas fa-spinner fa-pulse"></i>
            Processing...
          </div>
        </div>
      </qrcode-stream>
    </div>
    <div class="text-center" v-else>
      <h3>
        <i class="fas fa-exclamation-triangle"></i>
        No Camera found.
      </h3>
    </div>
  </div>
</template>

<script>
import { QrcodeStream } from "vue-qrcode-reader";

export default {
  components: { QrcodeStream },

  props: {
    callbackResult: Function,
    closeButton: Function,
  },

  data: () => ({
    is_loading: false,
    isValid: undefined,
    camera: "auto",
    result: null,

    hasTorch: false,
    torchNotSupported: false,
    fullscreen: false,

    noRearCamera: false,
    noFrontCamera: false,
    hasCamera: true,
  }),

  computed: {
    validationPending() {
      return this.isValid === undefined && this.camera === "off";
    },

    validationSuccess() {
      return this.isValid === true;
    },

    validationFailure() {
      return this.isValid === false;
    },

    fullscreenIcon() {
      if (this.fullscreen) {
        return "fas fa-compress";
      } else {
        return "fas fa-expand";
      }
    },
  },

  watch: {
    fullscreen(enterFullscreen) {
      if (enterFullscreen) {
        this.requestFullscreen();
      } else {
        this.exitFullscreen();
      }
    },
  },

  methods: {
    paintOutline(detectedCodes, ctx) {
      for (const detectedCode of detectedCodes) {
        const [firstPoint, ...otherPoints] = detectedCode.cornerPoints;

        ctx.strokeStyle = "red";

        ctx.beginPath();
        ctx.moveTo(firstPoint.x, firstPoint.y);
        for (const { x, y } of otherPoints) {
          ctx.lineTo(x, y);
        }
        ctx.lineTo(firstPoint.x, firstPoint.y);
        ctx.closePath();
        ctx.stroke();
      }
    },

    paintBoundingBox(detectedCodes, ctx) {
      for (const detectedCode of detectedCodes) {
        const {
          boundingBox: { x, y, width, height },
        } = detectedCode;

        ctx.lineWidth = 2;
        ctx.strokeStyle = "#007bff";
        ctx.strokeRect(x, y, width, height);
      }
    },

    onFullscreenChange(event) {
      // This becomes important when the user doesn't use the button to exit
      // fullscreen but hits ESC on desktop, pushes a physical back button on
      // mobile etc.

      this.fullscreen = document.fullscreenElement !== null;
    },

    requestFullscreen() {
      const elem = this.$refs.wrapper;

      if (elem.requestFullscreen) {
        elem.requestFullscreen();
      } else if (elem.mozRequestFullScreen) {
        /* Firefox */
        elem.mozRequestFullScreen();
      } else if (elem.webkitRequestFullscreen) {
        /* Chrome, Safari and Opera */
        elem.webkitRequestFullscreen();
      } else if (elem.msRequestFullscreen) {
        /* IE/Edge */
        elem.msRequestFullscreen();
      }
    },

    exitFullscreen() {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.mozCancelFullScreen) {
        /* Firefox */
        document.mozCancelFullScreen();
      } else if (document.webkitExitFullscreen) {
        /* Chrome, Safari and Opera */
        document.webkitExitFullscreen();
      } else if (document.msExitFullscreen) {
        /* IE/Edge */
        document.msExitFullscreen();
      }
    },

    switchCamera() {
      switch (this.camera) {
        case "front":
          this.camera = "rear";
          break;
        case "rear":
        case "auto":
          this.camera = "front";
          break;
      }
    },

    async onInit(promise) {
      promise.catch(console.error).then(this.resetValidationState);

      try {
        await promise;
        const { capabilities } = await promise;
        this.torchNotSupported = !capabilities.torch;
      } catch (error) {
        const triedFrontCamera = this.camera === "front";
        const triedRearCamera = this.camera === "rear";

        const cameraMissingError = error.name === "OverconstrainedError";

        if (triedRearCamera && cameraMissingError) {
          this.noRearCamera = true;
          this.showError("rear");
        }

        if (triedFrontCamera && cameraMissingError) {
          this.noFrontCamera = true;
          this.showError("front");
        }

        if (error.name === "NotFoundError") {
          this.hasCamera = false;
        }

        console.error(error);
      }
    },

    showError(camera) {
      this.$_swal
        .fire({
          title: `Not supported`,
          html: `Device no ${camera} camera.`,
          icon: "error",
          confirmButtonText: "OK",
        })
        .then((result) => {
          this.camera = "auto";
        });
    },

    toggleTorch() {
      if (this.torchNotSupported) return;
      this.hasTorch = !this.hasTorch;
    },

    setLoadingState(state = false) {
      this.is_loading = state;
    },

    resetValidationState() {
      this.isValid = undefined;
    },

    async onDecode(content) {
      if (this.is_loading) return;
      this.is_loading = true;
      this.result = content;
      this.turnCameraOff();

      // pretend it's taking really long
      // await this.timeout(3000);
      // this.isValid = content.startsWith("http");

      this.callbackResult(content);

      // some more delay, so users have time to read the message
      // await this.timeout(2000)

      // this.turnCameraOn()
    },

    scanAgain() {
      this.turnCameraOn();
    },

    turnCameraOn() {
      this.is_loading = false;
      this.camera = "auto";
    },

    turnCameraOff() {
      this.is_loading = false;
      this.camera = "off";
    },

    timeout(ms) {
      return new Promise((resolve) => {
        window.setTimeout(resolve, ms);
      });
    },
  },
};
</script>

<style scoped>
.qr-code-wrapper {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  top: 0;
}
.validation-success,
.validation-failure,
.validation-pending {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  /* width: 100%;
  height: 100%; */

  background-color: rgba(255, 255, 255, 0.8);
  text-align: center;
  font-weight: bold;
  font-size: 1.4rem;
  padding: 10px;

  /* display: flex; */
  /* flex-flow: column nowrap; */
  /* justify-content: center; */
}
.validation-success {
  color: green;
}
.validation-failure {
  color: red;
}

.validation-content {
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  position: absolute;
}

.btn.btn-close {
  width: 35px;
  height: 35px;
  border-radius: 50%;
  border: 3px solid red;
  outline: none;
}
</style>

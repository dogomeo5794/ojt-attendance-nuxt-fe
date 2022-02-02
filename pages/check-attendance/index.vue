<template>
  <!-- <Faker404 v-if="notFound" /> -->
  <AttendanceScanID
    ref="scan_id"
    :callbackResult="result"
    :closeButton="closeButton"
  />
</template>

<script>
export default {
  data: () => ({
    personnel_id: null,
    notFound: false,
  }),

  watch: {
    notFound(newVal) {
      const error = this.$nuxt.context.error;
      if (
        newVal === true &&
        Object.prototype.toString.call(error) === "[object Function]"
      ) {
        error({
          statusCode: 404,
          message: "Request timeout",
        });
      }
    },
  },

  computed: {
    getPersonnelID() {
      return this.$route.params.personnel_id || null;
    },
  },

  mounted() {
    this.initApp();
  },

  methods: {
    initApp() {
      // this.personnel_id = this.$route.params.personnel_id || null;
      if (!this.getPersonnelID) {
        this.notFound = true;
      } else {
        this.notFound = false;
      }
    },

    closeButton() {
      this.$router.go(-1);
    },

    async result(content) {
      console.log("checking... result content", content);
      this.$refs.scan_id.setLoadingState(true);
      try {
        let payload = {
          student_id: content,
          personnel_id: this.getPersonnelID,
          token: "sample token",
        };
        const { data, status } = await this.$store.dispatch(
          "Attendance/CheckingAttendance",
          payload
        );
        console.log("data", data);
        console.log("status", status);
        if ([200, 201].indexOf(status) > -1) {
          this.$_swal
            .fire({
              title: "Attendance",
              html: `
            <div class="text-left">
              <h5>ID: ${data.id}</h5>
              <h5>Name: ${data.name}</h5>
              <h5>Time: ${data.time}</h5>
            </div>
              `,
              icon: "success",
              showCancelButton: true,
              confirmButtonText: "Done",
              cancelButtonText: "Re-scan",
            })
            .then((result) => {
              console.log("result", result);
              if (result.isConfirmed) {
                this.closeButton();
              } else if (result.isDismissed) {
                this.$refs.scan_id.turnCameraOn();
              }
            });
        } else {
          this.$_swal
            .fire({
              title: `${status === 404 ? "Not Found" : "Attendance Closed"}`,
              html: `${
                typeof data === "string"
                  ? data
                  : `${content} has attendance for today (TIME IN - TIME OUT).`
              }`,
              icon: "error",
              showCancelButton: true,
              confirmButtonText: "OK",
              cancelButtonText: "Re-scan",
            })
            .then((result) => {
              if (result.isConfirmed) {
                this.$router.go(-1);
              } else if (result.isDismissed) {
                this.$refs.scan_id.turnCameraOn();
              }
            });
        }
        this.$refs.scan_id.setLoadingState(false);
      } catch (error) {
        this.$refs.scan_id.setLoadingState(false);
        console.log("error", data);
      }
    },
  },
};
</script>

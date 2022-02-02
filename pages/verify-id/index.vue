<template>
  <AttendanceScanID
    :callbackResult="result"
    :closeButton="closeButton"
    ref="scan_id"
  />
</template>

<script>
export default {
  data: () => ({}),

  watch: {},

  computed: {},

  mounted() {},

  methods: {
    closeButton() {
      this.$router.push({ name: "login" });
    },
    async result(resp) {
      console.log("result", resp);
      this.$refs.scan_id.setLoadingState(true);
      const payload = {
        qrcode: resp,
      };
      try {
        const { status, data } = await this.$store.dispatch(
          `Attendance/validateQRCode`,
          payload
        );

        if ([200, 201].indexOf(status) > -1) {
          this.$nextTick(() => {
            this.redirect(resp);
          });
        } else {
          this.$_swal
            .fire({
              title: `Not Found`,
              html: `The QR code is not found in our database! Please scan correctly`,
              icon: "error",
              showCancelButton: true,
              confirmButtonText: "Close",
              cancelButtonText: "Re-scan",
            })
            .then((result) => {
              if (result.isConfirmed) {
                this.closeButton();
              } else if (result.isDismissed) {
                this.$refs.scan_id.turnCameraOn();
              }
            });
        }
        this.$refs.scan_id.setLoadingState(false);
      } catch (error) {
        this.$refs.scan_id.setLoadingState(false);
      }
    },

    redirect(resp) {
      this.$router.push({
        name: "my-attendance",
        params: {
          student_id: resp,
        },
        query: {
          rid: Math.random().toString(36).substring(2),
        },
      });
    },
  },
};
</script>

const { serialize } = require("~/lib/Serializer");
const { to } = require("await-to-js");

const prefix = "/api/v1";

export const actions = {
  async CheckingAttendance(ctx, payload) {
    const [err, data] = await to(
      this.$axios.post(`${prefix}/checking-attendance`, payload)
    );
    return serialize(err ? err.response : data);
  },

  async CollectAttendanceByStudent(ctx, payload) {
    const [err, data] = await to(
      this.$axios.post(`${prefix}/fetch-attendance`, payload)
    );
    return serialize(err ? err.response : data);
  },

  async validateQRCode(ctx, payload) {
    const [err, data] = await to(
      this.$axios.post(`${prefix}/validate-qrcode`, payload)
    );
    return serialize(err ? err.response : data);
  },
};

const { serialize } = require("~/lib/Serializer");
const { to } = require("await-to-js");

const prefix = "/api/v1";

export const actions = {
  async Register(ctx, payload) {
    const [err, data] = await to(
      this.$axios.post(`${prefix}/registration`, payload)
    );
    return serialize(err ? err.response : data);
  },

  async SearchOffice(ctx, payload) {
    const [err, data] = await to(
      this.$axios.post(`${prefix}/search-existing-office`, payload)
    );
    return serialize(err ? err.response : data);
  },

  async CheckFreshApp(ctx, payload) {
    const [err, data] = await to(
      this.$axios.post(`${prefix}/check-fresh-app`, payload)
    );
    return serialize(err ? err.response : data);
  },

  async userLogin(ctx, payload) {
    const [err, data] = await to(
      this.$axios.post(`${prefix}/user-login`, payload)
    );
    return serialize(err ? err.response : data);
  },

  async AuthPersonnelList(ctx, payload) {
    const [err, data] = await to(
      this.$axios.get(`${prefix}/auth-personnel-list`, {
        params: payload,
      })
    );
    return serialize(err ? err.response : data);
  },

  async AuthPersonnelInfo(ctx, payload) {
    const [err, data] = await to(
      this.$axios.post(`${prefix}/auth-personnel-info`, payload)
    );
    return serialize(err ? err.response : data);
  },

  async ChangeAccountStatus(ctx, payload) {
    const [err, data] = await to(
      this.$axios.post(`${prefix}/change-account-status`, payload)
    );
    return serialize(err ? err.response : data);
  },

  async generateUAMCode(ctx, payload) {
    const [err, data] = await to(
      this.$axios.post(`${prefix}/generate-code`, payload)
    );
    return serialize(err ? err.response : data);
  },

  async getGeneratedUAMCode(ctx, payload) {
    const [err, data] = await to(
      this.$axios.get(`${prefix}/generated-code`, { params: payload })
    );
    return serialize(err ? err.response : data);
  },

  async validateInitReg(ctx, payload) {
    const [err, data] = await to(
      this.$axios.post(`${prefix}/validate-init-reg`, payload)
    );
    return serialize(err ? err.response : data);
  },

  async staffLogin(ctx, payload) {
    const [err, data] = await to(
      this.$axios.post(`${prefix}/staff-login`, payload)
    );
    return serialize(err ? err.response : data);
  },

  async createStaffAccount(ctx, payload) {
    const [err, data] = await to(
      this.$axios.post(`${prefix}/create-staff-account`, payload)
    );
    return serialize(err ? err.response : data);
  },

  async collectUsers(ctx, payload) {
    const [err, data] = await to(
      this.$axios.get(`${prefix}/user-list`, { params: payload })
    );
    return serialize(err ? err.response : data);
  },
};

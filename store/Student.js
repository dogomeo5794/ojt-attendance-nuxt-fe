const { serialize } = require("~/lib/Serializer");
const { to } = require("await-to-js");

const prefix = "/api/v1";

export const actions = {
  async CreateStudent(ctx, payload) {
    const [err, data] = await to(
      this.$axios.post(`${prefix}/create-student`, payload)
    );
    return serialize(err ? err.response : data);
  },

  async UpdateStudent(ctx, payload) {
    const [err, data] = await to(
      this.$axios.post(`${prefix}/update-student`, payload)
    );
    return serialize(err ? err.response : data);
  },

  async CreatedStudentList(ctx, payload) {
    const [err, data] = await to(
      this.$axios.get(`${prefix}/created-student-list`, { params: payload })
    );
    return serialize(err ? err.response : data);
  },

  async CollectStudentInfo(ctx, payload) {
    const [err, data] = await to(
      this.$axios.post(`${prefix}/student-info`, payload)
    );
    return serialize(err ? err.response : data);
  },

  async AssigningOffice(ctx, payload) {
    const [err, data] = await to(
      this.$axios.post(`${prefix}/assigning-office`, payload)
    );
    return serialize(err ? err.response : data);
  },
};

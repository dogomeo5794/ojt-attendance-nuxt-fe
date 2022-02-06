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
                :src="`${assetUrl}/img/icons/avatar.jpg`"
                alt="User profile picture"
                style="border-radius: 0; width: 100%; border: 2px solid #adb5bd"
              />
            </div>

            <p class="text-muted text-center mt-3">ID: RRD-2021-001</p>
          </div>
        </div>

        <div class="form-group mb-3">
          <span class="form-control" style="height: auto">
            Ronald R. Dogomeo
          </span>
          <label class="bottom-label" v-show="true"> Full Name </label>
        </div>

        <div class="form-group mb-3">
          <span class="form-control" style="height: auto">
            Toboso, Neg. Occ. Phil.
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
                  <td>
                    Page:
                    <select style="padding: 0 5px" name="page">
                      <option value="">1</option>
                      <option value="">2</option>
                      <option value="">3</option>
                    </select>
                  </td>
                  <td colspan="4" class="text-right">Total</td>
                  <td class="text-right">00:00</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div class="float-right">
          <button class="btn btn-outline-danger">
            <i class="fas fa-arrow-back"></i> Back
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
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      user_list: [],
      isLoading: false,
      per_page: 6,
      pages: 0,
      page: 0,

      user_id: "",
      first_name: "",
      last_name: "",
    };
  },

  computed: {
    ...mapGetters({
      baseUrl: "getBaseUrl",
      assetUrl: "getAssetUrl",
      session: "getSession",
    }),
  },

  mounted() {
    this.getUserList();
  },

  methods: {
    onSearch() {},

    async getUserList(page = 1) {
      this.isLoading = true;
      const payload = {
        page: page,
        per_page: this.per_page,
      };
      try {
        const { status, data } = await this.$store.dispatch(
          `UAM/collectUsers`,
          payload
        );
        console.log("status", status);
        console.log("data", data);
        if ([200, 201].indexOf(status) > -1) {
          this.user_list = data.data.map((item) => {
            console.log("item", item);
            item.information =
              item.role === "user"
                ? item.user_information || {}
                : item.staff_information || {};
            item.user_id =
              item.role === "user"
                ? item?.user_information?.clinic_user_id || null
                : item?.staff_information?.company_id || null;
            return item;
          });
          this.pages = data.last_page;
          this.page = page;
        }
        this.$nextTick(() => (this.isLoading = false));
      } catch (error) {
        this.isLoading = false;
      }
    },
  },
};
</script>

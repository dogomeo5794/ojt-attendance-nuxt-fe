<template>
  <div class="row">
    <div class="col-lg-12 mx-auto my-auto">
      <div class="card">
        <!-- <div class="card-header">
          <h3 class="card-title">Created Student List</h3>
        </div> -->
        <div class="card-body">
          <div class="row">
            <div class="col-lg-6 col-md-6 col-sm-6">
              <div class="form-group">
                <!-- <label for="">User ID</label> -->
                <input
                  type="text"
                  class="form-control"
                  id=""
                  placeholder="Company or Auth. Personnel ID"
                  @keyup.enter="searchStudentIdNum"
                  v-model="id_value"
                />
              </div>
            </div>
            <div class="col-lg-4 col-md-4 col-sm-6">
              <span
                class="btn btn-outline-default btn-sm"
                disabled="true"
                style="pointer-events: none"
                v-if="isSearchLoading"
              >
                <i class="fas fa-spinner fa-pulse"></i>
              </span>
              <button
                type="button"
                class="btn btn-outline-primary"
                @click.prevent="searchStudentIdNum"
                v-if="!isSearchLoading"
              >
                <i class="fas fa-search"></i>
              </button>
            </div>
          </div>
        </div>
        <div
          class="card-body table-responsive p-0"
          style="max-height: calc(100vh - 350px)"
        >
          <table
            class="table-image table table-sm table-hover table-head-fixed"
            v-if="isLoading === true || auth_personnel_list.length > 0"
          >
            <thead>
              <tr>
                <th style="width: 10px">#</th>
                <th scope="col">Auth. Personnel Name</th>
                <th scope="col">Office Name</th>
                <th scope="col" style="width: 160px" class="text-center">
                  Account Status
                </th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(i, k) in auth_personnel_list" :key="k">
                <td>{{ (page - 1) * per_page + (k + 1) }}</td>
                <td class="text-nowrap">
                  <a
                    href="#"
                    class="btn-link"
                    @click.prevent="viewPersonnelInfo(i)"
                    style="display: block"
                    v-if="i.company_id"
                  >
                    {{ i.company_id }}
                  </a>
                  <span class="student-address-span">{{
                    i.personnel_name
                  }}</span>
                </td>
                <td>
                  <span style="display: block"
                    >{{ i.office_reg_id }} | {{ i.office_name }}</span
                  >
                  <span class="student-address-span">{{
                    i.office_address
                  }}</span>
                </td>
                <td class="text-right">
                  <span
                    class="form-control text-center"
                    style="pointer-events: none"
                    v-if="i.loading"
                  >
                    <i class="fas fa-spinner fa-spin"></i> Loading...
                  </span>
                  <select
                    name="account_status"
                    id=""
                    class="form-control"
                    style="text-transform: uppercase"
                    v-if="i.evaluated === 'pending' && !i.loading"
                    @change.prevent="changeAccountStatus($event, i, k)"
                  >
                    <option value="" :disabled="true" :selected="true">
                      Pending
                    </option>
                    <option value="approved">Approve</option>
                    <option value="disapproved">Disapprove</option>
                  </select>
                  <span
                    class="student-address-span"
                    v-if="i.evaluated !== 'pending' && !i.loading"
                    >{{ i.evaluated }}</span
                  >
                </td>
              </tr>
              <tr v-if="isLoading">
                <td colspan="5" class="text-center">Loading...</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div class="card-footer" v-if="auth_personnel_list.length > 0">
          <span
            class="text-center mb-2"
            style="display: block"
            v-if="isLoading"
          >
            Loading...
          </span>
          <Paginate
            :page-count="pages"
            :container-class="'pagination pagination-sm m-0'"
            :click-handler="getPaginateList"
            v-model="page"
            :page-class="'page-item'"
            :page-link-class="'page-link'"
            :prev-class="'page-item'"
            :next-class="'page-item'"
            :next-link-class="'page-link'"
            :prev-link-class="'page-link'"
            :hide-prev-next="true"
            :prev-text="`<i class='fas fa-angle-left' />`"
            :next-text="`<i class='fas fa-angle-right' />`"
          />
        </div>
      </div>
      <NoDataFound v-if="!isLoading && auth_personnel_list.length === 0" />
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import QRCode from "qrcode";
export default {
  props: [],
  data() {
    return {
      auth_personnel_list: [],
      id_value: "",
      isLoading: false,
      isSearchLoading: false,
      pages: 0,
      page: 0,
      per_page: 5,
    };
  },

  computed: {
    ...mapGetters({
      baseUrl: "getBaseUrl",
      assetUrl: "getAssetUrl",
      session: "getSession",
    }),

    hasOffice() {
      return (office) => {
        const active_office = office.find(
          (i) => i.pivot.duty_status === "active"
        );
        return active_office
          ? {
              id: active_office.office_registration_id,
              name: active_office.office_name,
            }
          : {
              id: null,
              name: "No office",
            };
      };
    },
  },

  mounted() {
    this.getGeneratedCode();
  },

  methods: {
    searchStudentIdNum() {},

    getPaginateList(page) {
      this.getGeneratedCode(page);
    },

    viewPersonnelInfo(i) {
      this.$router.push({
        name: "personnel-view",
        params: {
          id: i.company_id,
        },
      });
    },

    async changeAccountStatus(e, item, key) {
      let value = e.target.value;
      this.auth_personnel_list[key].loading = true;

      // toastr.options = {
      //   "positionClass": "toast-top-right",
      //   "hideDuration": "1000",
      //   "timeOut": "2000",
      // }
      if (["approved", "disapproved"].indexOf(value) === -1) {
        toastr.error("Invalid selected status!");
        return;
      }

      let payload = {
        company_id: item.company_id,
        admin_id: 1,
        status: value,
      };
      try {
        const { status, data } = await this.$store.dispatch(
          `Account/ChangeAccountStatus`,
          payload
        );
        console.log("status", status);
        console.log("data", data);
        if (status === 200) {
          toastr.success(data);
          this.auth_personnel_list[key].evaluated = value;
        } else {
          toastr.error(data);
        }
        this.auth_personnel_list[key].loading = false;
      } catch (error) {
        toastr.error(error.response || "Error for changing account status!");
        this.auth_personnel_list[key].loading = false;
        console.log("error", error);
      }
    },

    async getGeneratedCode(page = 1) {
      this.isLoading = true;
      try {
        const payload = {
          page: page,
          per_page: this.per_page,
        };
        const { status, data } = await this.$store.dispatch(
          `Account/AuthPersonnelList`,
          payload
        );
        console.log("status", status);
        console.log("data", data);
        if ([200, 201].indexOf(status) > -1) {
          let filteredList = await Promise.all(
            data.data.map(async (i) => {
              let add = i.office_details || {};
              return {
                ...i,
                loading: false,
                personnel_name: `${i.first_name} ${i.middle_name} ${i.last_name}`,
                office_name: `${i.office_details?.office_name || null}`,
                office_reg_id: `${
                  i.office_details?.office_registration_id || null
                }`,
                office_address: `${add.street ? add.street + ", " : ""}${
                  add.barangay ? add.barangay + ", " : ""
                }${add.city || ""}, ${add.province || ""}, ${add.region || ""}`,
                evaluated:
                  i.evaluated === null
                    ? "pending"
                    : i.evaluated?.action_perform?.toLowerCase() || "pending",
              };
            })
          );
          console.log("filteredList", filteredList);
          this.auth_personnel_list = filteredList;
          this.pages = data.last_page;
          this.page = page;
        }
        this.isLoading = false;
      } catch (error) {
        this.isLoading = false;
      }
    },

    copyItem(key) {
      // this.auth_personnel_list.splice(key, 1);
    },
  },

  async created() {
    // this.sockets.subscribe("getGeneratedUAMCode", async () => {
    //   try {
    //     const payload = {
    //       "page": this.page,
    //       "per_page": this.per_page
    //     };
    //     const { status, data } = await this.$store.dispatch(`UAM/getGeneratedUAMCode`, payload);
    //     console.log("status load socket", status);
    //     console.log("data load socket", data);
    //     if ([200, 201].indexOf(status) > -1) {
    //       this.auth_personnel_list = data.data;
    //       this.pages = data.last_page;
    //       this.page = page;
    //     }
    //   } catch (error) {
    //   }
    // });
  },

  destroyed() {
    // this.sockets.unsubscribe("getGeneratedUAMCode");
  },
};
</script>

<style scoped>
.table-image td,
.table-image th {
  vertical-align: middle;
}
.student-address-span {
  background-color: rgb(223, 225, 230);
  color: rgb(66, 82, 110);
  display: inline-block;
  box-sizing: border-box;
  max-width: 100%;
  padding: 4px 5px;
  border-radius: 3px;
  font-size: 11px;
  font-weight: 700;
  /* line-height: 1; */
  text-transform: uppercase;
  vertical-align: baseline;
}
</style>

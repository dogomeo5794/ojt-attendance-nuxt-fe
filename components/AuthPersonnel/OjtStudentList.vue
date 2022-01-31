<template>
  <div class="row">
    <div class="col-lg-12 mx-auto my-auto">
      <div class="card">
        <!-- <div class="card-header">
          <h3 class="card-title">Created Student List</h3>
        </div> -->
        <div class="card-body">
          <div class="row">
            <div class="col-lg-4 col-md-4 col-sm-6 col-10">
              <div class="form-group">
                <!-- <label for="">User ID</label> -->
                <input
                  type="text"
                  class="form-control"
                  id=""
                  placeholder="Student ID Number"
                  @keyup.enter="searchStudentIdNum"
                  v-model="id_value"
                />
              </div>
            </div>
            <div class="col-lg-4 col-md-4 col-sm-6 col-2">
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
            v-if="isLoading === true || created_student_list.length > 0"
          >
            <thead>
              <tr>
                <th style="width: 10px">#</th>
                <th scope="col" class="text-center">QR Code</th>
                <th scope="col">Student ID No.</th>
                <th scope="col">Full Name</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(i, k) in created_student_list" :key="k">
                <td>{{ (page - 1) * per_page + (k + 1) }}</td>
                <td style="text-align: center">
                  <img
                    :src="`${
                      i.student_qrcode ||
                      `${assetUrl}/img/icons/qr-code-error.png`
                    }`"
                    class="img-fluid img-thumbnail"
                    :alt="`QR Code for ${i.school_id}`"
                    :style="`width: 100px;${
                      i.student_qrcode
                        ? 'border: 1px solid;border-radius: 0;padding: 0;'
                        : 'opacity: 0.5;'
                    }`"
                  />
                </td>
                <td class="text-nowrap">
                  <a
                    href="#"
                    class="btn-link"
                    @click.prevent="viewStudentInfo(i)"
                  >
                    {{ i.school_id }}
                  </a>
                </td>
                <td>
                  <span style="display: block">{{ i.student_name }}</span>
                  <span class="student-address-span">{{ i.address }}</span>
                </td>
              </tr>
              <tr v-if="created_student_list.length === 0 && isLoading">
                <td colspan="5" class="text-center">Loading...</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div class="card-footer" v-if="created_student_list.length > 0">
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
      <NoDataFound v-if="!isLoading && created_student_list.length === 0" />
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
      created_student_list: [],
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
  },

  mounted() {
    this.getGeneratedCode();
  },

  methods: {
    searchStudentIdNum() {},

    getPaginateList(page) {
      this.getGeneratedCode(page);
    },

    viewStudentInfo(i) {
      this.$router.push({
        name: "student-info",
        params: {
          student_id: i.school_id,
        },
      });
    },

    async getGeneratedCode(page = 1) {
      console.log("session", this.session);
      this.isLoading = true;
      try {
        const payload = {
          page: page,
          per_page: this.per_page,
          company_id: this.session?.company_id || null,
        };
        const { status, data } = await this.$store.dispatch(
          `Student/CreatedStudentList`,
          payload
        );
        console.log("status", status);
        console.log("data", data);
        if ([200, 201].indexOf(status) > -1) {
          let filteredList = await Promise.all(
            data.data.map(async (i) => {
              try {
                let student_qrcode = await QRCode.toDataURL(i.school_id);
                return {
                  ...i,
                  student_qrcode: student_qrcode,
                  student_name: `${i.first_name} ${i.middle_name} ${i.last_name}`,
                  address: `${i.street ? i.street + ", " : ""}${
                    i.barangay ? i.barangay + ", " : ""
                  }${i.city}, ${i.province} ${i.region}`,
                };
              } catch (err) {
                return {
                  ...i,
                  student_qrcode: null,
                  student_name: `${i.first_name} ${i.middle_name} ${i.last_name}`,
                  address: `${i.street ? i.street + ", " : ""}${
                    i.barangay ? i.barangay + ", " : ""
                  }${i.city}, ${i.province}, ${i.region}`,
                };
              }
            })
          );
          console.log("filteredList", filteredList);
          this.created_student_list = filteredList;
          this.pages = data.last_page;
          this.page = page;
        }
        this.isLoading = false;
      } catch (error) {
        this.isLoading = false;
      }
    },

    copyItem(key) {
      // this.created_student_list.splice(key, 1);
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
    //       this.created_student_list = data.data;
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
  line-height: 1;
  text-transform: uppercase;
  vertical-align: baseline;
}
</style>

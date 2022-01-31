<template>
  <div class="container">
    <div class="row my-3">
      <div class="col-lg-3 col-md-3 col-sm-3 col-xs-6 mb-2">
        <div class="form-group">
          <!-- <label for="">User ID</label> -->
          <input
            type="search"
            class="form-control"
            id=""
            placeholder="ID Number"
            @keyup.enter="onSearch"
            v-model="user_id"
            :disabled="first_name.trim('') !== '' || last_name.trim('') !== ''"
          />
        </div>
      </div>
      <div class="col-lg-4 col-md-4 col-sm-4 mb-2">
        <div class="form-group">
          <!-- <label for="">User ID</label> -->
          <input
            type="search"
            class="form-control"
            id=""
            placeholder="First Name"
            @keyup.enter="onSearch"
            v-model="first_name"
            :disabled="user_id.trim('') !== ''"
          />
        </div>
      </div>
      <div class="col-lg-4 col-md-4 col-sm-4 mb-2">
        <div class="form-group">
          <!-- <label for="">User ID</label> -->
          <input
            type="search"
            class="form-control"
            id=""
            placeholder="Last Name"
            @keyup.enter="onSearch"
            v-model="last_name"
            :disabled="user_id.trim('') !== ''"
          />
        </div>
      </div>
      <div class="col-lg-1 col-md-1 col-sm-1">
        <button
          type="button"
          class="btn btn-outline-primary"
          @click.prevent="onSearch"
        >
          <i class="fas fa-search"></i>
        </button>
      </div>
    </div>

    <div class="row">
      <NoDataFound v-if="!isLoading && user_list.length === 0" />
      <div
        class="col-12 col-sm-6 col-md-4 d-flex align-items-stretch"
        v-for="(i, k) in user_list"
        :key="k"
      >
        <div class="card bg-light">
          <div class="card-header text-muted border-bottom-0">
            [{{ i.user_type.toUpperCase() }}] - {{ i.user_id || "None" }}
          </div>
          <div class="card-body pt-0">
            <div class="row">
              <div class="col-7">
                <h2 class="lead">
                  <b
                    >{{ i.information.firstname.toUpperCase() || "---" }}
                    {{ i.information.lastname.toUpperCase() || "---" }}</b
                  >
                </h2>
                <p class="text-muted text-sm">
                  <b>Birthday: </b> {{ i.information.birthday }}
                </p>
                <ul class="ml-4 mb-0 fa-ul text-muted">
                  <li class="small">
                    <span class="fa-li">
                      <i class="fas fa-lg fa-building"></i>
                    </span>
                    Address: {{ i.information.address || "n/a" }}
                  </li>
                  <li class="small">
                    <span class="fa-li">
                      <i class="fas fa-lg fa-phone"></i>
                    </span>
                    Phone #: {{ i.information.contact || "n/a" }}
                  </li>
                  <li class="small">
                    <span class="fa-li">
                      <i class="fas fa-lg fa-envelope"></i>
                    </span>
                    Email: {{ i.email || "n/a" }}
                  </li>
                </ul>
              </div>
              <div class="col-5 text-center">
                <img
                  :src="`${assetUrl}/img/icons/avatar.jpg`"
                  alt=""
                  class="img-circle img-fluid"
                />
              </div>
            </div>
          </div>
          <div class="card-footer">
            <div class="text-right">
              <button type="button" class="btn btn-xs btn-danger">
                <i class="fas fa-clipboard"></i> Records
              </button>
              <button type="button" class="btn btn-xs btn-primary">
                <i class="fas fa-id-card"></i> Profile
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- <Loading :isLoading="isLoading" :size="'small'" /> -->
    </div>

    <div class="row text-right" v-if="user_list.length > 0">
      <div class="col-12 pt-3 pb-4">
        <Paginate
          :page-count="pages"
          :container-class="'pagination m-0'"
          :click-handler="getUserList"
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

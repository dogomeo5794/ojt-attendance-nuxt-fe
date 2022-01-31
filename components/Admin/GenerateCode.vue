<template>
  <div class="row">
    <div class="col-lg-12 mx-auto my-auto">
      <div class="card card-danger card-outline">
        <div class="card-header">
          <h3 class="card-title">Generate Code</h3>
        </div>
        <div class="card-body">
          <div class="row">
            <div class="col-lg-4 col-md-4 col-sm-6">
              <div class="form-group">
                <!-- <label for="">User ID</label> -->
                <input type="text" class="form-control" id="" placeholder="ID Number"
                  @keyup.enter="addIdNumber"
                  v-model="id_value"
                  maxlength="16"
                  :disabled="disableAll"
                >
              </div>
            </div>
            <div class="col-lg-4 col-md-4 col-sm-6">
              <button type="button" class="btn btn-outline-primary"
                @click.prevent="addIdNumber"
                :disabled="disableAll"
              >
                <i class="fas fa-check"></i>
              </button>
            </div>
          </div>
        </div>
        <div class="card-body table-responsive p-0" style="max-height: 300px">
          <table class="table table-sm table-head-fixed text-nowrap">
            <thead>
              <tr>
                <th style="width: 10px">#</th>
                <th>ID Number</th>
                <th>Unique Code</th>
                <th style="width: 10px">{{ disableAll?'':'Action'}}</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item,key) in user_id_list" :key="key">
                <td>{{ key+1 }}</td>
                <td>{{ item.clinic_user_id }}</td>
                <td>{{ item.unique_code||"---" }}</td>
                <td>
                  <i class="fas fa-check text-success" v-if="disableAll"></i>
                  <a href="#" class="btn-link text-danger text-right text-xs"
                    @click.prevent="removeItem(key)"
                    v-if="!disableAll"
                  >
                    <i class="fas fa-times"></i> Remove
                  </a>
                </td>
              </tr>
              <tr v-if="user_id_list.length===0">
                <td colspan="4" class="text-center">
                  <i class="fas fa-exclamation-triangle"></i> No data.
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div class="card-footer">
          <span class="btn btn-outline-default btn-sm" disabled="true" style="pointer-events: none;"
            v-if="isSubmitLoading&&!disableAll"
          >
            <i class="fas fa-spinner fa-pulse"></i>
          </span>
          <button type="button" class="btn-sm btn btn-primary"
            :disabled="user_id_list.length===0||isSubmitLoading"
            @click.prevent="generateCode"
            v-if="!disableAll"
          >Generate Unique Code</button>

          <button type="button" class="btn-sm btn btn-success"
            @click.prevent="generateNew"
            v-if="disableAll"
          >Generate New</button>

          <button type="button" class="btn-sm btn btn-default"
            @click.prevent=""
            v-if="disableAll"
          >
            <i class="fas fa-download"></i>
            Export
          </button>
        </div>
      </div>

      <div class="alert alert-danger alert-dismissible text-sm" v-if="error_response.code!=null">
        <h6>
          <i class="icon fas fa-exclamation-triangle"></i> The following error(s) occurred
        </h6>
        {{ error_response.message }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: [],
  data() {
    return {
      user_id_list: [],
      id_value: "",
      isSubmitLoading: false,
      disableAll: false,
      error_response: {
        code: null,
        message: null
      }
    };
  },

  mounted() {},

  methods: {
    addIdNumber() {
      if (this.id_value.trim("")==="" || this.user_id_list.filter(i => i.clinic_user_id===this.id_value).length > 0 || this.isSubmitLoading || this.disableAll) return;
      this.user_id_list.push({
        "unique_code": "",
        "clinic_user_id": this.id_value
      });
    },

    async generateCode() {
      if (this.user_id_list.length===0 || this.isSubmitLoading || this.disableAll) return;
      this.isSubmitLoading = true;
      try {
        const payload = {
          "user_id_numbers": this.user_id_list,
        };
        const { status, data } = await this.$store.dispatch(`UAM/generateUAMCode`,payload);
        console.log("status", status);
        console.log("data", data);
        if ([200, 201].indexOf(status) > -1) {
          this.disableAll = true;
          this.user_id_list = data;
          return this.isSubmitLoading = false;
        }
        this.error_response = {
          code: status,
          message: data
        }
        this.isSubmitLoading = false;
      } catch (error) {
        this.isSubmitLoading = false;
      }
    },

    generateNew() {
      this.disableAll = false;
      this.user_id_list = [];
      this.id_value = "";
      this.isSubmitLoading = false;
    },

    removeItem(key) {
      this.user_id_list.splice(key, 1);
    }
  },
};
</script>

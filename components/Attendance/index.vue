<template>
  <div class="login-box">
    <div class="login-logo">
      <a href="#"><b>EA-OJT</b></a>
    </div>
    <div class="alert alert-danger alert-dismissible text-sm" v-if="loginError.code!=null">
      <h6>
        <i class="icon fas fa-exclamation-triangle"></i> The following error(s) occurred
      </h6>
      {{ loginError.message }}
    </div>
    <div class="card">
      <div class="card-body login-card-body">
        <p class="login-box-msg">Input your valid School ID to verify your identity</p>

        <div class="input-group mb-3">
          <input type="text" :class="`form-control ${loginError.code!==null?'is-invalid':''}`" placeholder="School ID"
            v-model="school_id"
          >
          <div class="input-group-append">
            <div class="input-group-text">
              <span class="fas fa-envelope"></span>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-7">
            
          </div>
          <div class="col-5 text-right">
            <button type="submit" @click.prevent="verifyStudentId" class="btn btn-primary"
              :disabled="isLoading"
            >
              <i class="fas fa-spinner fa-pulse" v-if="isLoading"></i> 
              {{ isLoading?" Verifying...":" Verify ID" }}
            </button>
          </div>
        </div>

        <div class="social-auth-links text-center mb-3"></div>

        <p class="mb-1"></p>
        
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      school_id: "",

      username: "",
      password: "",
      isLoading: false,
      loginError: {
        code: null,
        message: null
      }
    }
  },

  computed: {
    loginLabel() {
      return this.originPage==='UAM' ? 'UAM-Admin' : 'USER'
    }
  },

  props: ["originPage"],

  beforeMount() {
    document.body.className = "";
    document.body.classList.add('hold-transition','login-page');
  },

  methods: {
    async verifyStudentId() {  
      this.$router.push({
        name: "view-attendance-qr-scan",
        params: {
          student_id: this.school_id
        }
      })
      return;
      if (this.isLoading) return;
      this.isLoading = true;
      try {
        const payload = {
          "username": this.username,
          "password": this.password,
        };
        const { status, data } = await this.$store.dispatch(`UAM/userLogin`, payload);
        console.log("status", status);
        console.log("data", data);
        if ([200, 201].indexOf(status) > -1) {
          localStorage.setItem("_token", data.access_token);
          localStorage.setItem("_user_logged", JSON.stringify(data.user));
          this.$router.push({
            name: "user-dashboard"
          })
          this.isLoading = false;
          return;
        }
        this.loginError = {
          code: status,
          message: "Incorrect username or password."
        }
        this.isLoading = false;
      } catch (error) {
        this.isLoading = false;
      }
    },
  },

};
</script>

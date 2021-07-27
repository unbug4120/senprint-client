<template>
  <div class="columns is-centered">
    <div class="column is-5-tablet is-4-desktop is-3-widescreen">
      <form action="" class="box" @submit.prevent="onSubmit">
        <div class="field">
          <label for="" class="label">Email</label>
          <div class="control has-icons-left">
            <input
              v-model="form.email"
              type="email"
              placeholder="e.g. admin@gmail.com"
              class="input"
              required=""
            />
            <span class="icon is-small is-left">
              <i class="fa fa-envelope"></i>
            </span>
          </div>
        </div>
        <div class="field">
          <label for="" class="label">Password</label>
          <div class="control has-icons-left">
            <input
              v-model="form.password"
              type="password"
              placeholder="*******"
              class="input"
              required=""
            />
            <span class="icon is-small is-left">
              <i class="fa fa-lock"></i>
            </span>
          </div>
        </div>
        <div class="field">
          <button class="button is-success" type="submit">Login</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import * as bulmaToast from "bulma-toast";
export default {
  name: "Login",
  data() {
    return {
      form: {
        email: "",
        password: "",
      },
      errors: [],
    };
  },
  created() {
    this.token = localStorage.getItem("jwt");
    if (this.token) {
      this.$router.push("/userboard");
    }
  },
  methods: {
    onSubmit() {
      if (this.form.email && this.form.password) {
        this.$http
          .post(`http://localhost:8000/api/auth/login`, this.form)
          .then((response) => {
            let is_admin = response.data.user.is_admin;
            localStorage.setItem("user", JSON.stringify(response.data.user));
            localStorage.setItem("jwt", response.data.access_token);

            if (localStorage.getItem("jwt") != null) {
              this.$emit("loggedIn");
              if (this.$route.params.nextUrl != null) {
                this.$router.push(this.$route.params.nextUrl);
              } else {
                if (is_admin == 1) {
                  this.$router.push("userboard");
                } else {
                  this.$router.push("home");
                }
              }
            }
          })
          .catch((e) => {
            bulmaToast.toast({ message: "Login Fail", type: "is-danger" });
            this.errors.push(e);
          });
      }
    },
  },
};
</script>
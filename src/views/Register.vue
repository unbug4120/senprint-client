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
          <label for="" class="label">Name</label>
          <div class="control has-icons-left">
            <input
              v-model="form.name"
              type="text"
              placeholder="e.g. Admin"
              class="input"
              required=""
            />
            <span class="icon is-small is-left">
              <i class="fa fa-user"></i>
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
          <label for="" class="label">Confirm Password</label>
          <div class="control has-icons-left">
            <input
              v-model="form.password_confirmation"
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
          <button class="button is-success" type="submit">Register</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import * as bulmaToast from "bulma-toast";
export default {
  name: "Register",
  data() {
    return {
      form: {
        email: "",
        password: "",
        password_confirmation: "",
        name: "",
      }
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
      if (this.password === this.password_confirmation && this.password.length > 0) {
        this.$http.post(`http://localhost:8000/api/auth/register`, this.form)
          .then((response) => {
            localStorage.setItem("user", JSON.stringify(response.data.user));
            localStorage.setItem("jwt", response.data.token);

            if (localStorage.getItem("jwt") != null) {
              this.$emit("loggedIn");
              if (this.$route.params.nextUrl != null) {
                this.$router.push(this.$route.params.nextUrl);
              } else {
                this.$router.push("/");
              }
            }
          })

          .catch(() => {
            bulmaToast.toast({
            message: "Register Fail!!!",
            type: "is-danger",
          });
          });
      }else {
            this.password = ""
            this.passwordConfirm = ""
            return alert("Passwords do not match")
      }
    },
  },
};
</script>
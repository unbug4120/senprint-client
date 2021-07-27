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
        <div class="field is-grouped">
          <div class="control">
            <button class="button is-success" type="submit">Save</button>
          </div>
          <div class="control">
            <button class="button is-light" @click.prevent="onCancel">
              Cancel
            </button>
          </div>
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
      },
      errors: []
    };
  },
  created() {
      this.token = localStorage.getItem("jwt");
  },
  methods: {
    onSubmit() {
      this.$http
        .post(`http://localhost:8000/api/auth/user/create`, this.form, {
          headers: { Authorization: `Bearer ` + this.token },
        })
        .then((response) => {
          bulmaToast.toast({ message: response.data, type: "is-success" });
          this.$router.push("/userboard");
        })
        .catch(() => {
          bulmaToast.toast({
            message: "Create Fail!!!",
            type: "is-danger",
          });
        });
    },
    onCancel() {
      this.$router.push("/userboard");
    },
  },
};
</script>
<template>
  <div class="columns is-centered">
    <div class="column is-5-tablet is-4-desktop is-3-widescreen">
      <form action="" class="box" @submit.prevent="onSubmit">
        <div class="field">
          <label for="" class="label">Email</label>
          <div class="control has-icons-left">
            <input v-model="data.email" type="email" class="input" disabled />
            <span class="icon is-small is-left">
              <i class="fa fa-envelope"></i>
            </span>
          </div>
        </div>
        <div class="field">
          <label for="" class="label">Name</label>
          <div class="control has-icons-left">
            <input v-model="data.name" type="text" class="input" />
            <span class="icon is-small is-left">
              <i class="fa fa-user"></i>
            </span>
          </div>
        </div>
        <div class="field">
          <label for="" class="label">Password</label>
          <div class="control has-icons-left">
            <input v-model="data.password" type="text" class="input" />
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
            <button class="button is-light" @click.prevent="onCancel">Cancel</button>
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
      data: {},
    };
  },
  created() {
    this.token = localStorage.getItem("jwt");
    this.$http
      .get(
        `http://localhost:8000/api/auth/user/edit/${this.$route.params.id}`,
        {
          headers: { Authorization: `Bearer ` + this.token },
        }
      )
      .then((response) => {
        this.data = response.data;
      });
  },
  methods: {
    onSubmit() {
      this.$http
        .post(
          `http://localhost:8000/api/auth/user/update/${this.$route.params.id}`,
          this.data,
          {
            headers: { Authorization: `Bearer ` + this.token },
          }
        )
        .then((response) => {
          bulmaToast.toast({ message: response.data, type: "is-success" });
          this.$router.push("/userboard");
        });
    },
    onCancel(){
        this.$router.push("/userboard");
    }
  },
};
</script>
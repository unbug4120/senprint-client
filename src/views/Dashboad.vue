<template>
  <div class="b-table has-pagination">
    <div class="buttons">
      <button class="button is-success"><a href="/create">Add</a></button>
      <button class="button is-danger" @click.prevent="logUserOut()">
        Logout
      </button>
    </div>
    <div class="table-wrapper has-mobile-cards">
      <table class="table is-fullwidth is-striped is-hoverable is-fullwidth">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Created At</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in data.data" v-bind:key="item.id">
            <td data-label="Name">{{ item.name }}</td>
            <td data-label="Email">{{ item.email }}</td>
            <td data-label="Created">
              <small
                class="has-text-grey is-abbr-like"
                :title="item.created_at"
                >{{ item.created_at }}</small
              >
            </td>
            <td class="is-actions-cell">
              <div class="buttons is-right">
                <a v-bind:href="'/edit/' + item.id">
                  <button class="button is-small is-primary" type="button">
                    <span class="icon"><i class="fas fa-pencil-alt"></i></span>
                  </button>
                </a>
                <button
                  class="button is-small is-danger jb-modal"
                  data-target="sample-modal"
                  type="button"
                  @click.prevent="deleteUser(item.id)"
                >
                  <span class="icon"><i class="fas fa-trash"></i></span>
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
      <nav class="pagination" role="navigation" aria-label="pagination">
        <pagination :data="data" @pagination-change-page="getResults">
        </pagination>
      </nav>
    </div>
  </div>
</template>

<script>
import * as bulmaToast from "bulma-toast";
export default {
  name: "Dashboad",
  data() {
    return {
      user: {},
      data: {},
      errors: [],
      fields: [
        "id",
        "name",
        "created_at",
        { key: "actions", label: "Actions" },
      ],
    };
  },
  created() {
    this.getUserDetails();
  },
  methods: {
    deleteUser(id) {
      this.$http
        .delete(`http://localhost:8000/api/auth/user/delete/${id}`, {
          headers: { Authorization: `Bearer ` + this.token },
        })
        .then((response) => {
          bulmaToast.toast({ message: response.data, type: "is-danger" });
          setTimeout(function () {
            location.reload();
          }, 2000);
        });
    },
    getResults(page = 1) {
      this.token = localStorage.getItem("jwt");
      this.$http("http://localhost:8000/api/auth/getAllUser?page=" + page, {
        headers: { Authorization: `Bearer ` + this.token },
      }).then((response) => {
        this.data = response.data.data;
      });
    },
    getUserDetails() {
      this.user = localStorage.getItem("user");
    },
    logUserOut() {
      localStorage.removeItem("jwt");
      this.$router.push("/login");
    },
  },
  mounted() {
    this.token = localStorage.getItem("jwt");
    if (this.token == null) {
      this.$router.push("/login");
    }else {
        this.getResults();
    }
  },
};
</script>
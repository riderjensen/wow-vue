<template>
  <div>
    <Welcome/>
    <p v-if="error" style="color: red;">{{error}}</p>
    <div>
      <v-btn color="info" @click="getAll">All</v-btn>
      <v-btn color="success" @click="getFlying">Flying</v-btn>
      <v-btn color="error" @click="getGround">Ground</v-btn>
      <v-btn color="warning" @click="getJumping">Jumping</v-btn>
      <v-btn color="info" @click="getWater">Water</v-btn>
    </div>
    <div>
      <v-btn color="info" @click="getAllGraphql">GraphQL All</v-btn>
      <v-btn color="success" @click="getFlyingGraphql">GraphQL Flying</v-btn>
      <v-btn color="error" @click="getGroundGraphql">GraphQL Ground</v-btn>
      <v-btn color="warning" @click="getJumpingGraphql">GraphQL Jumping</v-btn>
      <v-btn color="info" @click="getWaterGraphql">GraphQL Water</v-btn>
    </div>
    <v-layout>
      <v-flex xs12 sm10 offset-sm1>
        <v-card>
          <v-progress-circular v-if="loading" indeterminate color="primary"></v-progress-circular>
          <v-container v-bind="{ [`grid-list-md`]: true }" fluid>
            <v-layout v-if="!loading" row wrap>
              <v-flex v-for="(item, index) in items" :key="index" xs3>
                <v-card min-height="100%">
                  <v-card-title primary-title>
                    <h3 class="headline mb-0">{{item.name}}</h3>
                  </v-card-title>
                  <v-card-actions>
                    <v-btn class="my-button" flat color="blue" :to="item._id">View</v-btn>
                  </v-card-actions>
                </v-card>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
import axios from 'axios';
import gql from 'graphql-tag';
import Welcome from '../components/home/Welcome';

export default {
  components: {
    Welcome,
  },
  data() {
    return {
      skipQuery: true,
      error: '',
      items: [],
      loading: true,
    };
  },
  created() {
    axios
      .get('https://mighty-lake-67625.herokuapp.com')
      .then((resp) => {
        this.items = resp.data;
        this.loading = false;
      })
      .catch(err => console.log(err));
  },
  methods: {
    getAll: function() {
          this.loading = true;
      this.clearError();
      axios
        .get('https://mighty-lake-67625.herokuapp.com')
        .then((resp) => {
          this.items = resp.data;
          this.loading = false;
        })
        .catch(err => (this.error = err));
    },
    getFlying: function() {
      this.clearError();
      this.loading = true;
      axios
        .get('https://mighty-lake-67625.herokuapp.com/find/isFlying')
        .then((resp) => {
          this.items = resp.data;
          this.loading = false;
        })
        .catch(err => (this.error = err));
    },
    getGround: function() {
      this.clearError();
      this.loading = true;
      axios
        .get('https://mighty-lake-67625.herokuapp.com/find/isGround')
        .then((resp) => {
          this.items = resp.data;
          this.loading = false;
        })
        .catch(err => (this.error = err));
    },
    getJumping: function() {
      this.clearError();
      this.loading = true;
      axios
        .get('https://mighty-lake-67625.herokuapp.com/find/isJumping')
        .then((resp) => {
          this.items = resp.data;
          this.loading = false;
        })
        .catch(err => (this.error = err));
    },
    getWater: function() {
      this.clearError();
      this.loading = true;
      axios
        .get('https://mighty-lake-67625.herokuapp.com/find/isAquatic')
        .then((resp) => {
          this.items = resp.data;
          this.loading = false;
        })
        .catch(err => (this.error = err));
    },
    getAllGraphql: function() {
      this.clearError();
      this.loading = true;
      this.$apollo
        .query({
          query: gql`
            query {
              mounts {
                name
              }
            }
          `,
        })
        .then((res) => {
          this.myItem = res.data;
          this.loading = false;
        })
        .catch((err) => {
          this.error = err;
        });
    },
    getFlyingGraphql: function() {
      this.clearError();
      this.loading = true;
      this.$apollo
        .query({
          query: gql`
            query {
              mounts (where: {
                isFlying: true
              }){
                name
              }
            }
          `,
        })
        .then((res) => {
          this.myItem = res.data;
          this.loading = false;
        })
        .catch((err) => {
          this.error = err;
        });
    },
    getGroundGraphql: function() {
      this.clearError();
      this.loading = true;
      this.$apollo
        .query({
          query: gql`
            query {
              mounts (where: {
                isGround: true
              }){
                name
              }
            }
          `,
        })
        .then((res) => {
          this.myItem = res.data;
          this.loading = false;
        })
        .catch((err) => {
          this.error = err;
        });
    },
    getJumpingGraphql: function() {
      this.clearError();
      this.loading = true;
      this.$apollo
        .query({
          query: gql`
            query {
              mounts (where: {
                isJumping: true
              }){
                name
              }
            }
          `,
        })
        .then((res) => {
          this.myItem = res.data;
          this.loading = false;
        })
        .catch((err) => {
          this.error = err;
        });
    },
    getWaterGraphql: function() {
      this.clearError();
      this.loading = true;
      this.$apollo
        .query({
          query: gql`
            query {
              mounts (where: {
                isAquatic: true
              }){
                name
              }
            }
          `,
        })
        .then((res) => {
          this.myItem = res.data;
          this.loading = false;
        })
        .catch((err) => {
          this.error = err;
        });
    },
    clearError() {
      this.error = '';
    },
  },
};
</script>
<style scoped>
h3 {
  width: 100%;
  text-align: center;
}
.v-card__actions {
  position: absolute;
  bottom: 0;
  width: 100%;
}

.my-button {
  width: 100%;
}

.v-card__title--primary {
  margin-bottom: 40px;
}
</style>

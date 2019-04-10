<template>
  <div>
    <Welcome/>
    <p v-if="error" style="color: red;">{{error}}</p>
    <div>
      <v-btn color="info" v-on:click="getAll()">All</v-btn>
      <v-btn color="success" v-on:click="getFlying()">Flying</v-btn>
      <v-btn color="error" v-on:click="getGround()">Ground</v-btn>
      <v-btn color="warning" v-on:click="getJumping()">Jumping</v-btn>
      <v-btn color="info" v-on:click="getWater()">Water</v-btn>
    </div>
    <v-layout>
      <v-flex xs12 sm10 offset-sm1>
        <v-card>
                         <v-progress-circular v-if="loading"
      indeterminate
      color="primary"
    ></v-progress-circular>
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
import Welcome from "../components/home/Welcome";
import axios from "axios";
import gql from 'graphql-tag';

export default {
  apollo: {
    // Simple query that will update the 'hello' vue property
    items: gql`query {
      mounts {
        name,
        icon,
        isAquatic,
        isFlying,
        isGround,
        isJumping,
        spellId
      }
    }`,
  },
  components: {
    Welcome
  },
  data() {
    return {
      error: '',
      items: [],
      loading: true
    };
  },
  created() {
    axios
      .get("https://mighty-lake-67625.herokuapp.com")
      .then(resp => {
        this.items = resp.data;
        this.loading = false;
      })
      .catch(err => console.log(err));
  },
  methods: {
    getAll: function() {
      axios
        .get("https://mighty-lake-67625.herokuapp.com")
        .then(resp => {
          this.items = resp.data;
          this.loading = false;
        })
        .catch(err => this.error = err);
    },
    getFlying: function() {
      this.loading = true;
      axios
        .get("https://mighty-lake-67625.herokuapp.com/find/isFlying")
        .then(resp => {
          this.items = resp.data;
          this.loading = false;
        })
        .catch(err => this.error = err);
    },
    getGround: function() {
      this.loading = true;
      axios
        .get("https://mighty-lake-67625.herokuapp.com/find/isGround")
        .then(resp => {
          this.items = resp.data;
          this.loading = false;
        })
        .catch(err => this.error = err);
    },
    getJumping: function() {
      this.loading = true;
      axios
        .get("https://mighty-lake-67625.herokuapp.com/find/isJumping")
        .then(resp => {
          this.items = resp.data;
          this.loading = false;
        })
        .catch(err => this.error = err);
    },
    getWater: function() {
      this.loading = true;
      axios
        .get("https://mighty-lake-67625.herokuapp.com/find/isAquatic")
        .then(resp => {
          this.items = resp.data;
          this.loading = false;
        })
        .catch(err => this.error = err);
    }
  }
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


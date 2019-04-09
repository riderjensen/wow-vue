<template>
  <div>
    <Welcome/>
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
          <v-container v-bind="{ [`grid-list-md`]: true }" fluid>
            <v-layout row wrap>
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

export default {
  components: {
    Welcome
  },
  data() {
    return {
      items: []
    };
  },
  created() {
    axios
      .get("https://mighty-lake-67625.herokuapp.com")
      .then(resp => {
        this.items = resp.data;
      })
      .catch(err => console.log(err));
  },
  methods: {
    getAll: function() {
      axios
        .get("https://mighty-lake-67625.herokuapp.com")
        .then(resp => {
          this.items = resp.data;
        })
        .catch(err => console.log(err));
    },
    getFlying: function() {
      axios
        .get("https://mighty-lake-67625.herokuapp.com/find/isFlying")
        .then(resp => {
          this.items = resp.data;
        })
        .catch(err => console.log(err));
    },
    getGround: function() {
      axios
        .get("https://mighty-lake-67625.herokuapp.com/find/isGround")
        .then(resp => {
          this.items = resp.data;
        })
        .catch(err => console.log(err));
    },
    getJumping: function() {
      axios
        .get("https://mighty-lake-67625.herokuapp.com/find/isJumping")
        .then(resp => {
          this.items = resp.data;
        })
        .catch(err => console.log(err));
    },
    getWater: function() {
      axios
        .get("https://mighty-lake-67625.herokuapp.com/find/isAquatic")
        .then(resp => {
          this.items = resp.data;
        })
        .catch(err => console.log(err));
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


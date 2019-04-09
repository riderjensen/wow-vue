<template>
  <div class="about" style="max-width: 400px; margin: 50px auto;">
    <v-layout row wrap>
      <v-flex xs12>
        <v-card>
          <v-layout>
            <v-flex xs5>
              <v-img
                v-if="item.icon"
                style="margin-top: 20px;"
                :src="'https://render-us.worldofwarcraft.com/icons/56/' +item.icon +'.jpg'"
                height="100px"
                contain
              ></v-img>
            </v-flex>
            <v-flex xs7>
              <v-card-title primary-title>
                <div>
                  <div class="headline">{{item.name}}</div>
                  <div v-if="item.qualityId === 1">Common Mount</div>
                  <div v-if="item.qualityId === 2" class="uncommon">Uncommon Mount</div>
                  <div v-if="item.qualityId === 3" class="rare">Rare Mount</div>
                  <div v-if="item.qualityId === 4" class="epic">Epic Mount</div>
                  <div>Creature ID: {{ item.creatureId }}</div>
                  <div>Item ID: {{ item.itemId }}</div>
                  <div>Spell ID: {{ item.spellId }}</div>
                </div>
              </v-card-title>
            </v-flex>
          </v-layout>
          <v-divider light></v-divider>
          <v-card-actions class="pa-3">
            <v-img
              v-if="item.isFlying"
              :src="require('@/assets/flight.png')"
              height="20px"
              contain
              alt="Flying"
            ></v-img>
            <v-img
              v-if="item.isGround"
              :src="require('@/assets/ground.png')"
              height="20px"
              contain
              alt="Ground"
            ></v-img>
            <v-img
              v-if="item.isJumping"
              :src="require('@/assets/jump.png')"
              height="20px"
              contain
              alt="Jumping"
            ></v-img>
            <v-img
              v-if="item.isAquatic"
              :src="require('@/assets/water.png')"
              height="20px"
              contain
              alt="Water"
            ></v-img>
          </v-card-actions>
        </v-card>

        <div class="text-xs-center">
          <v-dialog v-model="updateDialog" width="500">
            <template v-slot:activator="{ on }">
              <v-btn color="warning" v-on="on">Update</v-btn>
            </template>

            <v-card>
              <v-card-title class="headline grey lighten-2" primary-title>Update</v-card-title>
              <v-card-text>
                <v-form v-model="valid">
                  <v-container>
                    <v-flex xs12>
                      <v-text-field v-model="item.name" :rules="nameRules" label="Name" required></v-text-field>
                    </v-flex>
                    <v-flex xs12>
                      <v-checkbox v-model="item.isFlying" label="Flying Mount?"></v-checkbox>
                    </v-flex>
                    <v-flex xs12>
                      <v-checkbox v-model="item.isGround" label="Ground Mount?"></v-checkbox>
                    </v-flex>
                    <v-flex xs12>
                      <v-checkbox v-model="item.isJumping" label="Can this mount jump?"></v-checkbox>
                    </v-flex>
                    <v-flex xs12>
                      <v-checkbox v-model="item.isAquatic" label="Can this mount go in water?"></v-checkbox>
                    </v-flex>
                  </v-container>
                </v-form>
              </v-card-text>
              <v-divider></v-divider>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="error" flat @click="updateDialog = false">Cancel</v-btn>
                <v-btn color="primary" flat @click="updateOne()">Update</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </div>
        <div class="text-xs-center">
          <v-dialog v-model="deleteDialog" width="500">
            <template v-slot:activator="{ on }">
              <v-btn color="error" v-on="on">Delete</v-btn>
            </template>

            <v-card>
              <v-card-title class="headline grey lighten-2" primary-title>Delete</v-card-title>
              <v-card-text>Are you sure you want to delete this item?</v-card-text>
              <v-divider></v-divider>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="error" flat @click="deleteDialog = false">Cancel</v-btn>
                <v-btn color="primary" flat @click="deleteOne()">Delete</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </div>

        <br>
        <br>
        {{error}}
        {{updated ? 'The item has been updated' : null}}
        {{deleted ? 'The item has been deleted' : null}}
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      deleteDialog: false,
      updateDialog: false,
      error: "",
      item: {},
      valid: false,
      nameRules: [v => !!v || "Name is required"],
      updated: false,
      deleted: false
    };
  },
  created() {
    axios
      .get(
        `https://mighty-lake-67625.herokuapp.com/find/${
          this._routerRoot._route.params.id
        }`
      )
      .then(resp => {
        console.log(resp.data);
        this.item = resp.data;
      })
      .catch(err => {
        this.error = err;
      });
  },
  methods: {
    deleteOne: function() {
      axios
        .delete(
          `https://mighty-lake-67625.herokuapp.com/edit/${
            this._routerRoot._route.params.id
          }`
        )
        .then(resp => {
          this.deleted = true;
          this.deleteDialog = false;
        })
        .catch(err => {
          this.error = err;
        });
    },
    updateOne: function() {
      axios
        .put(
          `http://localhost:5000/edit/${this._routerRoot._route.params.id}`, this.item      
        )
        .then(resp => {
          this.updated = true;
          this.updateDialog = false;
        })
        .catch(err => {
          this.error = err;
        });
    }
  }
};
</script>

<style scoped>
.about {
  margin-top: 50px;
}
.common {
  color: green;
}
.rare {
  color: blue;
}
.epic {
  color: purple;
}
</style>

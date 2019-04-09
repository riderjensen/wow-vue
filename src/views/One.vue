<template>
  <div class="about" style="max-width: 400px; margin: 50px auto;">
 
      <v-layout row wrap>
        <v-flex xs12>
          <v-card>
            <v-layout>
              <v-flex xs5>
                <v-img style="margin-top: 20px;"
                  :src="'https://render-us.worldofwarcraft.com/icons/56/' +item.icon +'.jpg'"
                  height="100px"
                  contain
                ></v-img>
              </v-flex>
              <v-flex xs7>
                <v-card-title primary-title>
                  <div>
                    <div class="headline">{{item.name}}</div>
                    <div>{{item.qualityId ? item.qualityId : null}}</div>
                    <div>Creature ID: {{ item.creatureId }}</div>
                    <div>Item ID: {{ item.itemId }}</div>
                    <div>Spell ID: {{ item.spellId }}</div>
                  </div>
                </v-card-title>
              </v-flex>
            </v-layout>
            <v-divider light></v-divider>
            <v-card-actions class="pa-3">
              Format
              <v-spacer></v-spacer>
              <v-img v-if="item.isFlying" :src="imgFlight" height="20px" contain ></v-img>
              <v-img v-if="item.isGround" :src="imgGround" height="20px" contain ></v-img>
              <v-img v-if="item.isJumping" :src="imgJump" height="20px" contain ></v-img>
              <v-img v-if="item.isAquatic" :src="imgWater" height="20px" contain ></v-img>
            </v-card-actions>
          </v-card>
        </v-flex>
      </v-layout>
    </div>
</template>

<script>
import axios from "axios";
import defIcon from "../assets/default.jpg";
import flightIcon from "../assets/flight.png";
import groundIcon from "../assets/ground.png";
import jumpIcon from "../assets/jump.png";
import waterIcon from "../assets/water.png";

export default {
  data() {
    return {
      imgFlight: flightIcon,
      imgGround: groundIcon,
      imgJump: jumpIcon,
      imgWater: waterIcon,
      item: {
        icon: defIcon
      }
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
        console.log(resp.data)
        this.item = resp.data;
      })
      .catch(err => console.log(err));
  }
};
</script>

<style scoped>
.about{
  margin-top: 50px;
}
</style>

<template>
  <div class="about">
    <v-form v-model="valid">
      <p v-if="created" style="color: green;">Your item has been created</p>
      <v-container  v-if="!created">
        {{error}}
        <v-flex xs12>
          <v-text-field v-model="item.name" :rules="nameRules" label="Name" required></v-text-field>
        </v-flex>
        <v-flex xs12>
          <v-text-field v-model="item.icon" :rules="nameRules" label="Icon" required></v-text-field>
        </v-flex>
        <v-flex xs12>
          <v-text-field v-model="item.spellId" label="Spell ID" required></v-text-field>
        </v-flex>
        <v-flex xs12>
          <v-text-field v-model="item.creatureId" label="Creature ID" required></v-text-field>
        </v-flex>
        <v-flex xs12>
          <v-text-field v-model="item.itemId" label="Item ID" required></v-text-field>
        </v-flex>
        <v-flex xs12>
          <v-text-field v-model="item.qualityId" label="Quality ID" required></v-text-field>
        </v-flex>
        <v-flex xs12>
          <v-checkbox v-model="item.isGround" label="Ground mount" required></v-checkbox>
        </v-flex>
        <v-flex xs12>
          <v-checkbox v-model="item.isFlying" label="Flying mount" required></v-checkbox>
        </v-flex>
        <v-flex xs12>
          <v-checkbox v-model="item.isAquatic" label="Water mount" required></v-checkbox>
        </v-flex>
        <v-flex xs12>
          <v-checkbox v-model="item.isJumping" label="Jumping mount" required></v-checkbox>
        </v-flex>
      </v-container>
      <v-btn v-if="!created" @click="submitCreate()">Submit</v-btn>
    </v-form>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data: () => ({
    error: '',
    created: false,
    valid: false,
    item: {
      name: "",
      icon: "",
      spellId: 0,
      creatureId: 0,
      itemId: 0,
      qualityId: 0,
      isGround: false,
      isFlying: false,
      isAquatic: false,
      isJumping: false
    },
    nameRules: [v => !!v || "Name is required"],
    // numberRules: [v => v.isNumber() || "Must be a number"]
  }),
  methods: {
    submitCreate: function() {
      axios.post('https://mighty-lake-67625.herokuapp.com/edit', this.item).then(resp => {
        this.created = true;
      }).catch(err => this.error = err)
    }
  }
};
</script>
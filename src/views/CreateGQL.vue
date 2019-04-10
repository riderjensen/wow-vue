<template>
  <div class="about">
    <v-form v-model="valid">
      <v-container>
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
      <v-btn @click="submitCreate()">Submit</v-btn>
    </v-form>
  </div>
</template>

<script>
import gql from "graphql-tag";

export default {
  data: () => ({
    error: "",
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
    nameRules: [v => !!v || "Name is required"]
  }),
  methods: {
    submitCreate: function() {
      this.$apollo
        .mutate({
          mutation: gql`
            mutation createMt($name: String, $spellId: Int, $creatureId: Int, $itemId: Int, $qualityId: Int, icon: String, isGround: Bool, isFlying: Bool, isAquatic: Bool, isJumping: Bool){
              createMount(
                data: {
                  name: $name,
                  icon: $icon,
                  spellId: $spellId,
                  creatureId: $creatureId,
                  itemId: $itemId,
                  qualityId: $qualityId,
                  isGround: $isGround,
                  isFlying: $isFlying,
                  isAquatic: $isAquatic,
                  isJumping: $isJumping
                }
              ) {
                name
              }
            }
          `,
          variables: {
            name: name,
            icon: icon,
            spellId: spellId,
            creatureId: creatureId,
            itemId: itemId,
            qualityId: qualityId,
            isGround: isGround,
            isFlying: isFlying,
            isAquatic: isAquatic,
            isJumping: isJumping
          }
        })
        .then(res => {
          this.error =
            '<p style="color: green;">Your item has been created</p>';
        })
        .catch(err => {
          this.error = err;
        });
    }
  }
};
</script>
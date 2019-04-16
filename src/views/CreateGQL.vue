<template>
  <div class="about">
    <v-form v-model="valid">
      <p v-if="created" style="color: green;">Your item has been created</p>
      <v-container v-if="!created">
        {{error}}
        <v-flex xs12>
          <v-text-field v-model="item.name" :rules="nameRules" label="Name" required></v-text-field>
        </v-flex>
        <v-flex xs12>
          <v-text-field v-model="item.icon" :rules="nameRules" label="Icon" required></v-text-field>
          <br />
          <p>Browse all the possible icons <a target="_blank" href="https://wow.gamepedia.com/Wowpedia:WoW_Icons">here</a>.</p>
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
import gql from 'graphql-tag';

export default {
  data: () => ({
    error: '',
    created: false,
    valid: false,
    item: {
      name: '',
      icon: '',
      spellId: 0,
      creatureId: 0,
      itemId: 0,
      qualityId: 0,
      isGround: false,
      isFlying: false,
      isAquatic: false,
      isJumping: false,
    },
    nameRules: [v => !!v || 'Name is required'],
  }),
  methods: {
    submitCreate() {
      this.item.icon = this.item.icon.toLowerCase();
      this.$apollo.mutate({
        mutation: gql`
            mutation createMt(
              $name: String
              $icon: String
              $spellId: Int
              $creatureId: Int
              $itemId: Int
              $qualityId: Int
              $isGround: Boolean
              $isFlying: Boolean
              $isAquatic: Boolean
              $isJumping: Boolean
            ) {
              createMount(
                data: {
                  name: $name
                  icon: $icon
                  spellId: $spellId
                  creatureId: $creatureId
                  itemId: $itemId
                  qualityId: $qualityId
                  isGround: $isGround
                  isFlying: $isFlying
                  isAquatic: $isAquatic
                  isJumping: $isJumping
                }
              ) {
                name
              }
            }
          `,
        variables: {
          name: this.item.name,
          icon: this.item.icon,
          spellId: this.item.spellId,
          creatureId: this.item.creatureId,
          itemId: this.item.itemId,
          qualityId: this.item.qualityId,
          isGround: this.item.isGround,
          isFlying: this.item.isFlying,
          isAquatic: this.item.isAquatic,
          isJumping: this.item.isJumping,
        },
      })
        .then((res) => {
          this.created = true;
        })
        .catch((err) => {
          this.error = err;
        });
    },
  },
};
</script>

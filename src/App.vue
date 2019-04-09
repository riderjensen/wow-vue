<template>
  <v-app>
    <v-toolbar app>
      <v-toolbar-title class="headline text-uppercase">
        <router-link to="/">
        <span>WOW</span>
        <span class="font-weight-light">Mount Finder</span>
        </router-link>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items class="hidden-sm-and-down">
        <v-btn flat to="/create">
         Create
        </v-btn>
        <v-btn flat to="/delete">
          Delete
        </v-btn>
        <v-btn flat to="update">
          Update
        </v-btn>
      </v-toolbar-items>
    </v-toolbar>
    <v-content>
      <v-container style="padding: 0; padding-bottom: 20px" fluid fill-height>
        <v-layout justify-center>
          <v-flex text-xs-center>
            <router-view/>
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>
  </v-app>
</template>
<script>
export default {
  name: "App",
  data() {
    return {
      //
    };
  }
};
</script>

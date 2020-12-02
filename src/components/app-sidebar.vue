<template>
  <v-navigation-drawer clipped app permanent width="550">
    <router-view v-on="$listeners" />
  </v-navigation-drawer>
</template>

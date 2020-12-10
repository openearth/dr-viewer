<template>
  <v-navigation-drawer clipped app permanent width="550">
    <router-view v-on="$listeners" :key="$route.path" />
  </v-navigation-drawer>
</template>

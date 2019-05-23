<template lang="pug">
  #app
    //- #firebaseui-auth-container(v-if="!$store.state.user")
    transition(name="fade" mode="out-in")
      router-view
  
</template>

<style lang="sass">
@import './assets/style'

body
  font-family: sans-serif
  color: #333
  background-color: #f5f5f5
</style>

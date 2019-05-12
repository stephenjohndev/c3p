<template lang="pug">
  #app
    //- #firebaseui-auth-container(v-if="!$store.state.user")
    router-view
    
</template>

<script>
export default {
  mounted(){
    this.$store.dispatch('getFeed') 
    this.$store.dispatch('initUser') // Load current user whether existing or null
    this.$store.dispatch('initFBUI') // Initialize Firebase Auth UI
  },
  data(){
    return{
    }
  }
};
</script>

<style lang="sass">
body
  font-family: sans-serif
  color: #333
  background-color: #f5f5f5
</style>

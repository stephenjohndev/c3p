<template lang="pug">
  #app
    transition(name="fade" mode="out-in")
      router-view
  
</template>

<style lang="sass">
@import './assets/style'
html
  overflow-y: auto !important
body
  font-family: sans-serif
  color: #333
  background-color: #f5f5f5
</style>

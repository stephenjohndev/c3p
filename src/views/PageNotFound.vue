<template lang="pug">
  #PageNotFound
    div
      h1 404
      h2 Page not found
      br
      br
      router-link(:to="{name: 'Home'}").pageNotFound__backlink
        fa(icon="home")
        span &nbsp; Back to home

</template>

<style lang="sass" scoped>
@import '../assets/style'

#PageNotFound
  display: flex
  align-items: center
  justify-content: center
  text-align: center
  height: 100vh

  h1
    font-size: 5rem
    color: $color-primary

.pageNotFound__backlink
  color: $color-primary
  text-decoration: none
  padding: 0.5rem $pad
  border: 2px solid $color-layout-border
  border-radius: 3rem
  transition: 0.2s background-color

  &:hover
    background-color: #00000011
</style>
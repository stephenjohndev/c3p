<template lang="pug">
  #homeAbout
    div.homeAbout__banner
    .homeAbout__content
      h2.homeAbout__title About C3P
      span.homeAbout__titleDivider
      p.homeAbout__body Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.

    

</template>

<style lang="sass" scoped>
@import '../assets/style'
#homeAbout
  background-color: $color-background-light
  @include from($tablet-landscape)
    display: flex
    align-items: center


.homeAbout__banner
  background-color: #aaaaaa
  width: 100%
  height: 60vw
  background-image: url('/images/banner.jpg')
  background-size: cover
  background-position: center
  @include from($tablet-landscape)
    width: 50vw !important
    height: 30rem

.homeAbout__content
  padding: $pad
  @include from($tablet-landscape)
    padding: $pad*2

.homeAbout__title
  color: $color-primary
  margin-bottom: 1rem

.homeAbout__titleDivider
  width: 5rem
  height: 0.35rem
  background-color: $color-primary
  display: inline-block
  margin-bottom: $pad

.homeAbout__body
  opacity: 0.7
  @include from($tablet-landscape)
    line-height: 1.75rem
    display: block
    max-width: 40vw

</style>


<script>
import layoutContainer from "@/components/layoutContainer";
export default {
  components: {
    layoutContainer
  }
}
</script>

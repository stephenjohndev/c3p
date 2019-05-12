<template lang="pug">
  #homeHighlight
    carousel.homeHighlight__bannerContainer(ref="carousel" :perPage="1" :paginationEnabled="false" :autoplay="true" :loop="true" :autoplayTimeout="4000")
      slide
        .homeHighlight__banner
      slide
        .homeHighlight__banner
      slide
        .homeHighlight__banner

    .homeHighlight__contents
      layoutContainer
        .homeHighlight__label Highlights
        h2.homeHighlight__title Cisco Network Academy Conference 2019
        p.homeHighlight__content(v-line-clamp:80="2") Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam pretium velit ipsum, id pretium urna egestas gravida. Sed quis lorem rhoncus, porta eros sed, iaculis sem. Suspendisse augue nisi, imperdiet ac dictum sed, placerat vitae lorem. Vivamus cursus lacus mauris, id dapibus orci convallis a. Nulla facilisi. Donec quis ante at turpis dignissim pretium. Cras vel maximus metus. Aliquam molestie, libero sed consectetur ornare, leo lectus sagittis quam, in viverra felis risus et orci. Maecenas quis eros sit amet ipsum mattis egestas. Fusce molestie ipsum arcu, sit amet dignissim eros vehicula eu.
        a.homeHighlight__readmore(href="#") Read more
      layoutContainer(extendleft)
        .homeHighlight__navigators
          .homeHighlight__navigator(@click="$refs.carousel.goToPage($refs.carousel.getPreviousPage())")
            fa(icon="angle-left")
          .homeHighlight__navigator(@click="$refs.carousel.advancePage()")
            fa(icon="angle-right")
</template>

<style lang="sass" scoped>
@import '../assets/style'

#homeHighlight
  position: relative
  background-color: $color-primary
  @include from($tablet-landscape)
    height: calc(100vh - 6rem)
    max-height: calc(768px - 6rem)


.homeHighlight__bannerContainer
  @include from($tablet-landscape)
    width: 70%
    margin-left: auto

.homeHighlight__banner
  height: 60vw
  background: url('https://picsum.photos/700/500')
  background-size: cover
  @include from($tablet-landscape)
    height: calc(100vh - 6rem)
    max-height: calc(768px - 6rem)

.homeHighlight__contents
  padding-top: $pad
  padding-bottom: $pad
  @include from($tablet-landscape)
    position: absolute
    top: 50%
    transform: translateY(-50%)
    width: 100%
    pointer-events: none

  @include to($tablet-portrait)
    @include actionable-primary

.homeHighlight__label
  color: $color-accent
  text-transform: uppercase
  letter-spacing: 0.25rem
  @include from($tablet-landscape)
    font-size: 1rem
    margin-bottom: 1rem

.homeHighlight__title
  color: $color-against-primary
  line-height: 2rem
  margin-top: 0.5rem
  margin-bottom: 0.5rem
  @include from($tablet-landscape)
    width: 70%
    max-width: 35rem
    pointer-events: initial
    font-size: 3rem
    line-height: 3.5rem

.homeHighlight__content
  color: $color-against-primary
  opacity: 0.5
  @include from($tablet-landscape)
    width: 50%
    max-width: 30rem
    pointer-events: initial
    opacity: 1

.homeHighlight__readmore
  color: white
  font-weight: bold
  text-decoration: none
  margin-top: 0.5rem
  display: inline-block

.homeHighlight__navigators
  pointer-events: initial
  height: 2rem
  display: inline-block
  margin-top: 1rem
  @include to($tablet-portrait)
    display: none

.homeHighlight__navigator
  color: white
  font-size: 2rem
  padding-left: $pad
  padding-right: $pad
  display: inline-block
  border-radius: 4rem
  @include actionable-primary



</style>

<script>
import layoutContainer from '@/components/layoutContainer'
export default {
  components: {
    layoutContainer
  }
}
</script>



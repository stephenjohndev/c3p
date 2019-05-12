<template lang="pug">
  #homeLatest
    layout-container
      .homeLatest__nav
        h2.homeLatest__label Latest
        .homeLatest__controls
          .homeLatest__control(@click="$refs.carousel.goToPage($refs.carousel.getPreviousPage())")
            fa(icon="angle-left")
          .homeLatest__control(@click="$refs.carousel.advancePage()")
            fa(icon="angle-right")
    .homeHighlight__navigator
    layout-container(extendboth)
      .homeLatest__items
        carousel(ref="carousel" :loop="true" :perPage="1" :perPageCustom="[[600, 3]]" :paginationEnabled="false")
          each val in [1, 2, 3]
            slide(style="display: flex; justify-content: center")
              .homeLatest__item
                .homeLatest__banner
                h3.homeLatest__title The quick brown fox
                p.homeLatest__content(v-line-clamp:80="2") The quick brown fox jumps over the lazy dog lorem ipsum dolor sit amet.
                a.homeLatest__readmore(href="#") Read more
    center: button.homeLatest__seeAll See all news
</template>

<style lang="sass" scoped>
@import '../assets/style'

#homeLatest
  padding-top: $pad
  padding-bottom: $pad
  border-bottom: 1px solid $color-layout-border
  background-color: $color-accent-dark
  color: $color-against-primary

.homeLatest__nav
  display: flex
  align-items: center
  justify-content: space-between
  @include from($tablet-portrait)
    justify-content: center

.homeLatest__label
  

.homeLatest__controls
  display: flex
  @include from($tablet-portrait)
    display: none
  

.homeLatest__control
  background-color: $color-primary-translucent
  color: $color-against-primary
  width: 3rem
  height: 3rem
  margin-left: 0.5rem
  display: flex
  align-items: center
  justify-content: center
  border-radius: 50%
  font-size: 1.5rem
  @include actionable-primary-dark

.homeLatest__item
  padding: 0rem $pad 0.5rem $pad
  margin-bottom: $pad
  margin-top: 0.5rem
  @include actionable-primary-dark

.homeLatest__item + .homeLatest__item
  @include from($tablet-portrait)
    border-left: 1px solid $color-layout-border-inverted

.homeLatest__banner
  border-radius: 0.5rem
  height: 60vw
  background: url('http://lorempixel.com/400/200')
  margin-top: 1rem
  margin-bottom: 1rem
  @include from($tablet-portrait)
    height: 10rem

.homeLatest__content
  opacity: 0.5

.homeLatest__readmore
  text-decoration: none
  color: $color-against-primary
  font-weight: bold
  display: inline-block

.homeLatest__seeAll
  padding: 0.5rem 1.5rem
  text-align: center
  background-color: white
  color: $color-primary
  font-weight: bold
  border-radius: 2rem
      
</style>


<script>
import layoutContainer from '@/components/layoutContainer'
export default {
  components: {
    layoutContainer
  }
}
</script>

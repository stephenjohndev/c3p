<template lang="pug">
  #homeLatest
    layout-container
      .homeLatest__nav
        h2.homeLatest__label Latest News
        .homeLatest__controls
          .homeLatest__control(@click="$refs.carousel.goToPage($refs.carousel.getPreviousPage())")
            fa(icon="angle-left")
          .homeLatest__control(@click="$refs.carousel.advancePage()")
            fa(icon="angle-right")
    .homeHighlight__navigator
    layout-container(extendboth)
      .homeLatest__items
        carousel(ref="carousel" v-model="currentSlide" :loop="true" :perPage="1" :perPageCustom="[[600, $store.state.feed.latest.length >=3 ? 3 : $store.state.feed.latest.length]]" :paginationEnabled="false")
          slide(v-for="latest, index in $store.state.feed.latest" :key="index")
            router-link.homeLatest__item(:to="'/news/' + latest.id")
              .homeLatest__banner(:style="{backgroundImage: 'url(' + latest.cover + ')'}")
              h3.homeLatest__title {{ latest.title }}
              p.homeLatest__content.unsetNodes(v-line-clamp:24="2" v-html="latest.body")
              a.homeLatest__readmore(href="#") Read more
    center: router-link(:to="{name: 'Feed'}").homeLatest__seeAll See all news
</template>

<style lang="sass" scoped>
@import '../assets/style'

#homeLatest
  padding-top: $pad*2
  padding-bottom: $pad*2
  background-color: $color-background-light

.homeLatest__nav
  display: flex
  align-items: center
  justify-content: space-between
  @include from($tablet-portrait)
    justify-content: center

.homeLatest__label
  color: $color-primary
  font-size: 1.5rem
  font-weight: lighter
  

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

.homeLatest__items
  @include from($tablet-portrait)
    max-width: 1024px
    margin-left: auto
    margin-right: auto
    margin-top: 1rem

.homeLatest__item
  padding: 0.25rem $pad 1rem $pad
  color: inherit
  display: block
  text-decoration: none
  
  &:hover
    background-color: $color-background

.homeLatest__item + .homeLatest__item
  @include from($tablet-portrait)
    border-left: 1px solid $color-layout-border-inverted


.homeLatest__banner
  height: 50vw
  background-image: url('http://lorempixel.com/400/200')
  background-size: cover
  background-position: center
  margin-top: 1rem
  margin-bottom: 1rem
  @include from($tablet-portrait)
    height: 10rem

.homeLatest__title
  font-weight: lighter
  font-size: 1.2em


.homeLatest__content
  opacity: 0.5
  margin: 0.5rem 0

.homeLatest__readmore
  text-decoration: none
  color: $color-text-unactive
  font-weight: 500
  display: inline-block

.homeLatest__seeAll
  padding: 0.5rem 1.5rem
  text-align: center
  background-color: $color-green-accent
  color: $color-against-primary
  font-weight: 500
  border-radius: 2rem
  display: inline-block
  text-decoration: none
  @include actionable-green

  @include from($tablet-portrait)
    margin-top: $pad
      
</style>


<script>
import layoutContainer from '@/components/layoutContainer'
export default {
  mounted() {
    this.$store.dispatch('loadLatest')
  },
  components: {
    layoutContainer
  },
  data(){
    return{
      currentSlide: 0
    }
  }
}
</script>

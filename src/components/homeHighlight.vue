<template lang="pug">
  #homeHighlight(v-if="hasHighlights")

    //- Carousel Slideshow
    carousel.homeHighlight__bannerContainer(ref="carousel" v-model="currentSlide" :perPage="1" :paginationEnabled="false" :autoplay="true" :loop="true" :autoplayTimeout="4000")
      slide(v-for="highlight,index in $store.state.feed.highlights" :key="index")
        .homeHighlight__banner(:style="{backgroundImage: 'url(' + highlight.cover + ')'}")

    .homeHighlight__contents
      layoutContainer
        .homeHighlight__label(v-if="$store.state.feed.highlights.length > 1") Highlights
        h2.homeHighlight__title {{ currentHighlight.title }}
        p.homeHighlight__content(v-line-clamp:24="2") {{ currentHighlight.body }}



      layoutContainer(extendleft)
        router-link.homeHighlight__readMore(:to="'/feed/' + currentHighlight.id") Read more
      layoutContainer(extendleft)
        .homeHighlight__navigators(v-if="$store.state.feed.highlights.length > 1")
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
  position: relative
  height: 60vw
  background-size: cover
  background-color: $color-accent-dark
  opacity: 0.9
  filter: brightness(0.9)
  
  @include from($tablet-landscape)
    height: calc(100vh - 6rem)
    max-height: calc(768px - 6rem)

.homeHighlight__banner::after
  position: absolute
  width: 100%
  height: 100%
  background-color: black

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
    max-width: 38rem
    pointer-events: initial
    font-size: 3rem
    line-height: 3.5rem

.homeHighlight__content
  word-break: initial !important
  color: $color-against-primary
  opacity: 0.5
  
  @include from($tablet-landscape)
    max-width: 35rem
    pointer-events: initial
    opacity: 1
    font-size: 1.2rem

.homeHighlight__readMore
  color: $color-against-primary
  padding: 0.5rem 1rem
  margin-left: 0.5rem
  cursor: pointer
  pointer-events: initial
  border-radius: 4rem
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
import layoutContainer from "@/components/layoutContainer";
export default {
  mounted(){
    this.$store.dispatch('loadHighlights')
  },
	components: {
		layoutContainer
  },
  computed: {
    hasHighlights(){
      return this.$store.state.feed.highlights.length > 0
    },
    currentHighlight(){
      return this.$store.state.feed.highlights[this.currentSlide]
    }
  },
	data() {
		return {
			currentSlide: 0
		};
	}
};
</script>



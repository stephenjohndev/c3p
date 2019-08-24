<template lang="pug">
  #homeHighlight(v-if="hasHighlights")

    //- Carousel Slideshow
    carousel.homeHighlight__bannerContainer(ref="carousel" v-model="currentSlide" :perPage="1" :paginationEnabled="false" :autoplay="true" :loop="true" :autoplayTimeout="4000")
      slide(v-for="highlight,index in $store.state.feed.highlights" :key="index")
        clazy-load(:src="highlight.cover")
          transition(name="fade" appear)
            .homeHighlight__banner(:style="{backgroundImage: 'url(' + highlight.cover + ')'}")
            .preloader(slot="placeholder")

  
    transition(name="longer-fade" mode="out-in")
      .homeHighlight__contents(:key="currentHighlight.id" v-if="!$store.state.feed.isPreloaderShown")
        layoutContainer
          //- .homeHighlight__label(v-if="$store.state.feed.highlights.length > 1") Highlights
          router-link.homeHighlight__contentLink(:to="'/news/' + currentHighlight.id")
            transition(name="rise-up" mode="out-in" appear)
              h2.homeHighlight__title(:key="currentHighlight.id" style="transition-delay: 0s") {{ currentHighlight.title }}
            transition(name="rise-up" mode="out-in" appear)
              p.homeHighlight__content.unsetNodes(:key="currentHighlight.id" style="transition-delay: 0.2s" v-line-clamp:24="2" v-html="currentHighlight.body")



        layoutContainer(extendleft)
          router-link.homeHighlight__readMore(:to="'/news/' + currentHighlight.id") Read more
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
  background: $color-primary
  @include to($phone)
    min-height: 30rem
  @include from($tablet-landscape)
    height: calc(100vh - 8em)
    max-height: calc(768px - 8rem)


.homeHighlight__bannerContainer
  height: 60vw
  @include from($tablet-landscape)
    width: 100%
    margin-left: auto
  @include from($tablet-landscape)
    height: calc(100vh - 8rem)
    max-height: calc(768px - 8rem)

.homeHighlight__banner
  position: relative
  height: 60vw
  background-size: cover
  background-color: $color-primary
  
  @include from($tablet-landscape)
    height: calc(100vh - 6rem)
    max-height: calc(768px - 6rem)

.homeHighlight__banner::after
  @include from($tablet-landscape)
    content: ''
    background: linear-gradient(to right,transparentize($color-primary,0.35) 50%,transparent 100%)
    width: 100%
    height: 100%
    display: block
    // mix-blend-mode: multiply

.homeHighlight__contents
  display: block
  text-decoration: none
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

.homeHighlight__contentLink
  text-decoration: none

.homeHighlight__title
  color: $color-against-primary
  font-size: 2rem
  line-height: 2rem
  margin-top: 0.5rem
  margin-bottom: 0.5rem
  font-weight: lighter
  @include from($tablet-landscape)
    width: calc(100% - 4rem)
    pointer-events: initial
    font-size: 3.5rem
    line-height: 3.5rem
    margin-top: 1rem
    margin-bottom: 1rem
  @include from($desktop)
    max-width: 60vw
    font-size: 5rem
    line-height: 5rem

.homeHighlight__content
  word-break: initial !important
  color: transparentize($color-against-primary, 0.2)
  
  @include from($tablet-landscape)
    max-width: 35rem
    pointer-events: initial
    color: $color-against-primary
    font-size: 1.2rem

.homeHighlight__readMore
  color: $color-against-primary
  background-color: $color-green-accent
  padding: 0.5rem 1rem
  margin-left: 1rem
  margin-top: 1rem
  cursor: pointer
  pointer-events: initial
  border-radius: 4rem
  text-decoration: none
  display: inline-block
  @include actionable-green

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
  cursor: pointer



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



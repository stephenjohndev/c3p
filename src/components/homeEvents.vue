<template lang="pug">
  #homeEvents
    layout-container
      .homeEvents__nav
        h2.homeEvents__label Upcoming Events
        .homeEvents__controls
          .homeEvents__control(@click="$refs.carousel.goToPage($refs.carousel.getPreviousPage())")
            fa(icon="angle-left")
          .homeEvents__control(@click="$refs.carousel.advancePage()")
            fa(icon="angle-right")
    .homeHighlight__navigator
    layout-container(extendboth)
      .homeEvents__items
        carousel(ref="carousel" v-model="currentSlide" :loop="true" :perPage="1" :perPageCustom="[[600, $store.state.events.upcomingEvents.length >=3 ? 3 : $store.state.events.upcomingEvents.length]]" :paginationEnabled="false")
          slide(v-for="event, index in $store.state.events.upcomingEvents" :key="index")
            router-link.homeEvents__item(:to="'/events/' + event.id")
              .homeEvents__banner(:style="{backgroundImage: 'url(' + event.cover + ')'}")
              .homeEvents__contentWrapper
                .homeEvents__left
                  h3.homeEvents__title {{ event.title }}
                  p.homeEvents__venue {{ event.venue }}
                .homeEvents__right
                  span {{ getDisplayDate(event) }}
    center: router-link.homeEvents__seeAll(:to="{name: 'Events'}") See all events
</template>

<style lang="sass" scoped>
@import '../assets/style'

#homeEvents
  padding-top: $pad*2
  padding-bottom: $pad*2
  border-bottom: 1px solid $color-layout-border
  background-color: $color-background

.homeEvents__nav
  display: flex
  align-items: center
  justify-content: space-between
  @include from($tablet-portrait)
    justify-content: center

.homeEvents__label
  color: $color-primary
  

.homeEvents__controls
  display: flex
  @include from($tablet-portrait)
    display: none
  

.homeEvents__control
  background-color: $color-primary-translucent
  color: $color-primary
  width: 3rem
  height: 3rem
  margin-left: 0.5rem
  display: flex
  align-items: center
  justify-content: center
  border-radius: 50%
  font-size: 1.5rem
  @include actionable-primary-dark
  
.homeEvents__items
  @include from($tablet-portrait)
    max-width: 1024px
    margin-left: auto
    margin-right: auto
    margin-top: 2rem
    margin-bottom: 2rem
    

.homeEvents__item
  margin: auto
  color: inherit
  text-decoration: none
  display: block

  @include to($phone)
    padding: $pad
  
  @include from($tablet-portrait)
    margin: 0 $pad
    border: 1px solid $color-layout-border
    border-radius: 0.5rem
    overflow: hidden
    background-color: $color-background-light


.homeEvents__item + .homeEvents__item
  @include from($tablet-portrait)
    border-left: 1px solid $color-layout-border-inverted

.homeEvents__banner
  height: 50vw
  background-image: url('http://lorempixel.com/400/200')
  background-size: cover
  background-position: center
  margin-bottom: 1rem
  @include from($tablet-portrait)
    height: 10rem

.homeEvents__title
  margin-bottom: 0
  font-weight: 500

.homeEvents__contentWrapper
  display: flex
  @include from($tablet-portrait)
    @include to($tablet-portrait)
      flex-direction: column
  justify-content: space-between
  align-items: flex-start
  margin: 1rem
  .homeEvents__venue
    opacity: 0.7
    font-size: 0.9rem
    margin-top: 0.25rem
  .homeEvents__right
    font-weight: 500
    color: $color-primary
  

.homeEvents__seeAll
  padding: 0.5rem 1.5rem
  text-align: center
  background-color: $color-primary
  text-decoration: none
  color: $color-against-primary
  font-weight: 500
  border-radius: 2rem
  @include actionable-primary
      
</style>


<script>
import layoutContainer from '@/components/layoutContainer'
export default {
  mounted() {
    this.$store.dispatch('loadUpcomingEvents')
  },
  components: {
    layoutContainer
  },
  data(){
    return{
      currentSlide: 0
    }
  },
  methods: {
    getDisplayDate(event){
      var startSymbolArray = event.start.toDate().toString().split(" ")
      var start = startSymbolArray[1] + " " + startSymbolArray[2].replace(/^0+/, '')
      var endSymbolArray = event.end.toDate().toString().split(" ")
      var end = endSymbolArray[1] + " " + endSymbolArray[2].replace(/^0+/, '')

      if(start == end)
        return start
      else
        return start + "-" + endSymbolArray[2].replace(/^0+/, '')
      
    }
  }
}
</script>

<template lang="pug">
  #events
    homeNav
    
    div.events
      layout-container
        h1(style="margin-top: 1.5rem").title Events
        router-link.event(v-for="event, index in $store.state.events.events" :to="'/events/' + event.id" :key="event.id")
          div.event__banner(:style="{backgroundImage: 'url(' + event.cover + ')'}")
          div.event__contents
            h2.title.is-3.event__title {{ event.title }}
            h4.subtitle.is-5.feedPost__subtitle {{ event.venue}}
            h3.feedPost__date {{ event.start.toDate().toDateString()}}

</template>

<style lang="sass" scoped>
@import '../assets/style'

.eventsHeader
  background-color: $color-primary
  color: $color-against-primary

.eventsNav
  display: flex
  align-items: center
  justify-content: space-between
  height: 4rem

.event__title
  font-weight: lighter
  margin-bottom: 1.5rem
  

.eventsNav__action
  padding: 1rem
  @include actionable-primary
  display: flex
  align-items: center
  justify-content: center
  border-radius: 3rem
  height: 3rem
  margin: 0.5rem
  text-decoration: none
  color: inherit

.eventsNav__action--small
  width: 3rem



.event
  border-radius: 0.5rem
  background-color: $color-background-light
  margin: $pad 0
  border: 1px solid $color-layout-border
  overflow: hidden
  display: grid
  grid-template-columns: 1fr
  cursor: pointer
  text-decoration: none
  color: inherit

  @include from($tablet-portrait)
    grid-template-columns: 1fr 1fr




.event__banner
  width: 100%
  background-color: #ddd
  background-size: cover
  background-position: center

  height: 60vw
  @include from($tablet-portrait)
    height: 20rem

.feedPost__subtitle
  font-weight: normal
  color: #555

.feedPost__date
  margin-top: 2rem
  font-weight: normal
  color: $color-primary

.event__contents
  padding: $pad


</style>



<script>
import layoutContainer from '@/components/layoutContainer'
import homeNav from '@/components/homeNav'
export default {
  name: 'events',
  components: {
    layoutContainer,
    homeNav
  },
  mounted() {
    window.scrollTo(0, 0);
    this.$store.dispatch('loadEvents');
  }
}
</script>
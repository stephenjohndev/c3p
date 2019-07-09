<template lang="pug">
#feedPost
  header.feedPost__header
    button.feedPost__back(@click="$router.push('/')")
      fa(icon="home")
      span &nbsp; Home
    router-link.title.is-4(to="/events" style="margin: 0; padding: 0; font-weight: lighter; font-size: 1.5rem; text-transform: uppercase")
      i(style="color: #049FD9") Events
    span(style="display: inline-block; width: 4rem")
  header.feedPost__contentHeader
    div
      h2.title.is-2.feedPost__title(style="margin-bottom: 1rem") {{ event.title }}
      h4.subtitle.is-4.feedPost__subtitle(style="margin-bottom: 1rem;") {{ event.venue}}
      b(style="color: #049FD9") {{ event.start.toDate().toDateString()}}
    div
      a.feedPost__register(:href="event.registrationLink" target="_blank" v-if="event.registrationAllowed") Register
      a.feedPost__feedback(:href="event.registrationLink" target="_blank" v-if="event.feedbackAllowed") Feedback
  div.feedPost__cover(:style="{backgroundImage: 'url(' + event.cover + ')'}")
  p.feedPost__body(v-html="event.description")
</template>

<style lang="sass" scoped>
@import '../assets/style'
#feedPost
  background-color: white
  border-top: 5px solid $color-primary
  

.feedPost__header
  max-width: 900px
  padding: $pad 0
  margin-left: auto
  margin-right: auto
  display: flex
  align-items: center
  justify-content: space-between
  width: 100%
  border-bottom: 1px solid #dddddd

.feedPost__contentHeader
  @include to($tablet-portrait)
    display: block
  display: flex
  align-items: flex-start
  justify-content: space-between
  padding: $pad*2 $pad
  max-width: 900px
  margin-left: auto
  margin-right: auto

.feedPost__register,.feedPost__feedback
  text-align: center
  display: block
  border-radius: 5rem !important
  padding: 0.5rem 3rem
  
  text-decoration: none
  border-radius: 0.25rem
  
  @include to($tablet-portrait)
    margin-top: $pad

.feedPost__register
  background-color: $color-green-accent
  color: $color-against-primary
  @include actionable-primary

.feedPost__feedback
  margin-top: 0.5rem
  background-color: transparent
  color: $color-primary
  border: 1px solid $color-primary

.feedPost__cover
  width: 100%
  height: 20rem
  background-size: cover
  background-position: center
  border: none
  max-width: calc(900px - 3rem)
  margin: auto

.feedPost__subtitle
  opacity: 0.5
  font-weight: normal

.feedPost__body
  padding: $pad*2 $pad
  line-height: 1.5rem
  max-width: 900px
  margin-left: auto
  margin-right: auto

  @include from($tablet-landscape)
    font-size: 1.2rem
    text-align: justify
    line-height: 2.25rem

.feedPost__back
  background-color: transparent
</style>


<script>
import layoutContainer from '@/components/layoutContainer.vue';
import {db} from '../firebase';

import { type } from 'os';
export default {
  components: {
    layoutContainer,
  },
  data(){
    return{
      event: {}
    }
  },
  mounted() {

    window.scrollTo(0, 0);

    // Check if stored data exists
    if(this.$store.getters.mergedEvents.length > 0){
      var event = this.$store.getters.mergedEvents.find(post => post.id == this.$route.params.id)
      if(typeof event != 'undefined'){
        this.event = event
        return;
      }
    }

    // Else, retrieve from server
    db.collection('events')
    .doc(this.$route.params.id)
    .get()
    .then(doc => {
      var data = doc.data()
      if(typeof data !='undefined')
        this.event =  doc.data()
    })
    
  }
}
</script>

<template lang="pug">
#feedPost
  header.feedPost__header
    button.feedPost__back(@click="$router.back('/')")
      fa(icon="angle-left")
      span &nbsp; Back to Home
  header.feedPost__contentHeader
    div
      h1.feedPost__title {{ event.title }}
      h3.feedPost__subtitle {{ event.venue}}
      h3.feedPost__subtitle {{ event.start.toDate().toDateString()}}
    a.feedPost__register(:href="event.registrationLink" target="_blank") Register
  div.feedPost__cover(:style="{backgroundImage: 'url(' + event.cover + ')'}")
  p.feedPost__body(v-html="event.description")
</template>

<style lang="sass" scoped>
@import '../assets/style'

.feedPost__header
  max-width: 900px
  padding: 0 $pad
  margin-left: auto
  margin-right: auto

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

.feedPost__register
  text-align: center
  background-color: $color-primary
  display: block
  padding: 0.5rem 3rem
  color: $color-against-primary
  text-decoration: none
  border-radius: 0.25rem
  @include actionable-primary
  @include to($tablet-portrait)
    margin-top: $pad

.feedPost__cover
  width: 100%
  height: 20rem
  background-size: cover
  background-position: center
  border: none

.feedPost__subtitle
  opacity: 0.5
  font-weight: normal

.feedPost__body
  padding: $pad*2 $pad
  font-size: 1.2rem
  line-height: 2.25rem
  text-align: justify
  max-width: 900px
  margin-left: auto
  margin-right: auto

.feedPost__back
  margin-top: $pad
  background-color: transparent
  border: 1px solid $color-layout-border
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

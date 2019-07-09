<template lang="pug">
#feedPost
  header.feedPost__header
    button.feedPost__back(@click="$router.back('/')")
      fa(icon="angle-left")
      span &nbsp; Back
    router-link.title.is-4.is-paddingless(to="/news" style="margin: 0; padding: 0; font-weight: lighter; font-size: 1.5rem; text-transform: uppercase")
      i(style="color: #049FD9") News
    span(style="display: inline-block; width: 4rem")
  h2.title.is-2.feedPost__title {{ currentPost.title }}
  div.feedPost__cover(:style="{backgroundImage: 'url(' + currentPost.cover + ')'}")
  p.feedPost__body(v-html="currentPost.body")
</template>

<style lang="sass" scoped>
@import '../assets/style'

#feedPost
  border-top: 5px solid $color-primary
  background-color: $color-background-light

.feedPost__header
  max-width: 900px
  margin-left: auto
  padding: $pad 0
  margin-right: auto
  display: flex
  align-items: center
  justify-content: space-between
  width: 100%
  border-bottom: 1px solid #dddddd
  
  
  width: 100%
.feedPost__title
  padding: $pad*2 $pad
  max-width: 900px
  margin-left: auto
  margin-right: auto
  font-weight: lighter
.feedPost__cover
  width: 100%
  max-width: calc(900px - 3rem)
  margin: auto
  height: 20rem
  background-size: cover
  background-position: center
  border: none

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
      currentPost: {}
    }
  },
  mounted() {

    window.scrollTo(0, 0);

    // Check if stored data exists
    if(this.$store.getters.mergedFeed.length > 0){
      var post = this.$store.getters.mergedFeed.find(post => post.id == this.$route.params.id)
      if(typeof post != 'undefined'){
        this.currentPost = post
        return;
      }
    }

    // Else, retrieve from server
    db.collection('feed')
    .doc(this.$route.params.id)
    .get()
    .then(doc => {
      var data = doc.data()
      if(typeof data !='undefined')
        this.currentPost =  doc.data()
    })
    
  }
}
</script>

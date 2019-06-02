<template lang="pug">
#feedPost
  header.feedPost__header
    button.feedPost__back(@click="$router.back('/')")
      fa(icon="angle-left")
      span &nbsp; Back to Home
  h1.feedPost__title {{ currentPost.title }}
  div.feedPost__cover(:style="{backgroundImage: 'url(' + currentPost.cover + ')'}")
  p.feedPost__body(v-html="currentPost.body")
</template>

<style lang="sass" scoped>
@import '../assets/style'

.feedPost__header
  max-width: 900px
  padding: 0 $pad
  margin-left: auto
  margin-right: auto
.feedPost__title
  padding: $pad*2 $pad
  max-width: 900px
  margin-left: auto
  margin-right: auto
.feedPost__cover
  width: 100%
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

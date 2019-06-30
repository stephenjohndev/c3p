<template lang="pug">
#album
  header.album__header
    button.album__back(@click="$router.back('/')")
      fa(icon="angle-left")
      span &nbsp; Back to Home
  h1.album__title {{ album.title }}
  layoutContainer
    .photos
      .photo(v-for="photo in photos" :style="{ backgroundImage: `url('${photo.url}')` }")
</template>

<style lang="sass" scoped>
@import '../assets/style'

.album__header
  max-width: 900px
  padding: 0 $pad
  margin-left: auto
  margin-right: auto
.album__title
  padding: $pad*2 $pad
  max-width: 900px
  margin-left: auto
  margin-right: auto

.photos
  display: flex
  flex-wrap: wrap

.photo
  flex-grow: 1
  width: 16rem
  height: 12rem
  border: 1px solid $color-background-light
  float: left
  background-size: cover
  background-position: center
  cursor: pointer

.album__back
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
      album: {},
      photos: [],
    }
  },
  mounted() {

    window.scrollTo(0, 0);

    db.collection('gallery')
    .doc(this.$route.params.id)
    .get()
    .then(doc => {
      this.album = doc.data()
    })


    db.collection('gallery')
    .doc(this.$route.params.id)
    .collection('photos')
    .get()
    .then(snapshot => {
      var photos = snapshot.docs.map(doc => {
         // Get document data object
            var docObject = doc.data();
            // Add id key to data object
            docObject.id = doc.id;
            // Return the new data object
            return docObject;
      });

      this.photos = photos;
    })
    
  }
}
</script>

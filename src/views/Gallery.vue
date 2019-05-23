<template lang="pug">
  #gallery
    homeNav
    layout-container
      h1.title Gallery
      div.album(v-for="album in $store.state.gallery.gallery")
        h3.album__title
          span {{ album.title }}
          button.viewAlbum(@click="$router.push('/gallery/' + album.id)") See All
        div.photos
          div.photo(@click="album.photos.length > 4 && index == 4 ? $router.push('/gallery/' + album.id) : $router.push('/gallery/' + album.id + '/' + photo.id)" :style="{backgroundImage: 'url(' + photo.url + ')'}" :key="photo.id" :more="album.photos.length - 4" v-for="photo, index in album.photos" :class="{'more': album.photos.length > 4 && index == 4}")
</template>

<style lang="sass" scoped>
@import '../assets/style'

.title,
  margin: $pad 0

.album__title
  padding: $pad 0.5rem
  display: flex
  align-items: center
  justify-content: space-between

.album
  background-color: $color-background-light
  padding: 0 1rem $pad
  border-radius: 0.5rem
  border: 1px solid $color-layout-border
.photos
  display: flex
  flex-wrap: wrap
  flex-direction: column
  height: 10rem
  cursor: pointer

  @include to($tablet-portrait)
    margin: 0.5rem
    border: 2px solid $color-background-light

  @include from($tablet-landscape)
    height: 10vw

.photo
  flex-basis: 15vw
  max-width: 100%
  flex-grow: 1

  @include to($tablet-portrait)
    border: 2px solid $color-background-light
  
  @include from($tablet-landscape)
    flex-basis: 10rem
    margin: 0.5rem
  background-size: cover
  background-position: center

.more::after
  content: '+' attr(more) ' more'
  color: white
  display: block
  display: flex
  align-items: center
  justify-content: center
  height: 100%
  width: 100%
  background-color: transparentize(black, 0.25)
  transition: 0.2s background-color
.more:hover::after
  background-color: transparentize(black, 0.1)
  
.viewAlbum
  @include to($tablet-portrait)
    display: none
  
</style>


<script>
import homeNav from '@/components/homeNav'
import layoutContainer from "@/components/layoutContainer";
export default {
  components: {
    layoutContainer,
    homeNav
  },
  mounted(){
    this.$store.dispatch("loadGallery");
  }
}
</script>

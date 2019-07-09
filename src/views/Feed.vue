<template lang="pug">
  #feed
    header.feedPost__header
      button.feedPost__back(@click="$router.back('/')")
        fa(icon="home")
        span &nbsp; Home
      router-link.title.is-4(to="/news" style="margin: 0; padding: 0; font-weight: lighter; font-size: 1.5rem; text-transform: uppercase")
        i(style="color: #049FD9") News
      span(style="display: inline-block; width: 8rem")
    
    div.feeds
      layout-container(style="max-width: 900px")
        router-link.feed(v-for="post, index in $store.state.feed.feed" :to="'/news/' + post.id" :key="post.id")
          div.feed__banner(:style="{backgroundImage: 'url(' + post.cover + ')'}")
          div.feed__contents
            h3.title.is-3.feed__title {{ post.title }}
            p.feed__content.unsetNodes(v-line-clamp:32="6" v-html="post.body")


</template>

<style lang="sass" scoped>
@import '../assets/style'

#feed
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

.feedPost__title
  padding: $pad*2 $pad
  max-width: 900px
  margin-left: auto
  margin-right: auto
  font-weight: lighter

.feed__title
  font-weight: lighter
  margin-bottom: 1.5rem

.feedNav
  display: flex
  align-items: center
  justify-content: space-between
  height: 4rem
  

.feedNav__action
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

.feedNav__action--small
  width: 3rem

.feeds
  margin-top: $pad*2

.feed
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
  &:hover
    background-color: rgba(0,0,0,0.025)

  @include from($tablet-portrait)
    grid-template-columns: 1fr 1fr




.feed__banner
  width: 100%
  background-color: #ddd
  background-size: cover
  background-position: center

  height: 40vw
  @include from($tablet-portrait)
    height: 100%
  

.feed__contents
  padding: $pad*2
  

.feedPost__back
  background-color: transparent

</style>



<script>
import layoutContainer from '@/components/layoutContainer'

export default {
  name: 'Feed',
  components: {
    layoutContainer
  },
  mounted() {
    window.scrollTo(0, 0);
    this.$store.dispatch('loadFeed');
  }
}
</script>
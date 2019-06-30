<template lang="pug">
  #feed
    header.feedHeader
      layout-container(extendboth)
        nav.feedNav
          router-link.feedNav__action(:to="{name: 'Home'}")
            fa(icon="home")
            span &nbsp; Home
          h1.title.is-4(style="color: white; font-weight: lighter; margin-bottom: 0")
            b C3P
            i &nbsp;News
          .feedNav__action.feedNav__action--small(style="margin-left: 3rem")
            fa(icon="ellipsis-v")
    
    div.feeds
      layout-container
        router-link.feed(v-for="post, index in $store.state.feed.feed" :to="'/news/' + post.id" :key="post.id")
          div.feed__banner(:style="{backgroundImage: 'url(' + post.cover + ')'}")
          div.feed__contents
            h3.title.is-3.feed__title {{ post.title }}
            p.feed__content.unsetNodes(v-line-clamp:72="6" v-html="post.body")

</template>

<style lang="sass" scoped>
@import '../assets/style'

.feedHeader
  background-color: $color-primary
  color: $color-against-primary

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

  @include from($tablet-portrait)
    grid-template-columns: 1fr 1fr




.feed__banner
  width: 100%
  background-color: #ddd
  background-size: cover
  background-position: center

  height: 60vw
  @include from($tablet-portrait)
    height: 20rem
  

.feed__contents
  padding: $pad*2
  

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
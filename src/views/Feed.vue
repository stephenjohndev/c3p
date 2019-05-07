<template lang="pug">
  center
    router-link(:to="{name: 'FeedAdd'}") Add
    h1 Feed

    .card(v-for="post, key in $store.state.feed")
      h2 {{post.title}}
      p(v-html="post.body")
      a(:href="post.cover") {{post.cover}}
</template>

<script>
export default {
  name: 'Feed'
}
</script>

<style lang="sass" scoped>
*
  box-sizing: border-box
// dummy style
.card
  background-color: white
  box-shadow: 0px 3px 3px rgba(0,0,0,0.1)
  border-radius: 0.25rem
  margin-top: 0.5rem
  padding: 1rem

h2, p
  margin: 0
</style>


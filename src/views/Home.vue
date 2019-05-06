<template lang="pug">
  #home
    router-link(to="events") Events
    router-link(to="feed") Feed
    h3 Authentication status: {{ $store.getters.isAuthenticated }}
    h3 Authorized status: {{ $store.state.isAuthorized }}

    template(v-if="$store.state.isAuthorized")
      h3 Admin Control
      quill-editor(
        v-model="content"
        ref="myQuillEditor")
      button(@click="submitPost") Post
      
      

    template(v-for="post, key in $store.state.feed")
      h1 {{post.title}}
      p(v-html="post.body")
      hr
</template>


<script>
export default {
	name: "home",
	data() {
		return {
			content: ""
		};
  },
  methods: {
    submitPost(){
      this.$store.dispatch('post', this.content)
    }
  }
};
</script>

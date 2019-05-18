<template lang="pug">
  #admin-feed

    section.feedControl
      header.feedControl__header
        button(@click="$router.push('/admin/feed/new')").--primary Add New
      section.feedControl__feeds
        router-link.feedCard(:to="'/admin/feed/' + post.id" v-for="post,index in $store.state.feed.feed" :key="index")
          h1.feedCard__title {{ post.title }}
          p.feedCard__body(v-line-clamp:24="2") {{ post.body }}

    section.selectedPost(v-if="typeof(activePost) != 'undefined'")
      header.selectedPost__header(:class="{'selectedPost__header--editing':$store.getters.hasPendingActivity}")
        div.action_group
          .selectedPost__action.selectedPost__back(@click="$router.back()")
            fa(icon="angle-left")
        div.action_group
          .selectedPost__action(v-show="!$store.getters.hasPendingActivity && $route.params.id != 'new'")
            fa(icon="trash")
            span &nbsp Delete
          .selectedPost__action(v-show="$store.getters.hasPendingActivity" @click="resetPost")
            fa(icon="times")
            span &nbsp Cancel
          .selectedPost__action(v-show="$store.getters.hasPendingActivity && $route.params.id != 'new'" @click="save")
            fa(icon="save")
            span &nbsp Save
          .selectedPost__action(v-show="$route.params.id == 'new'" @click="publish")
            fa(icon="save")
            span &nbsp Publish
            
      label(for="upload")
        div.selectedPost__cover(:style="{backgroundImage: 'url(' + cover + ')'}")
      input(type="file" accept="image/*" id="upload" @change="previewFile(); setPending();" style="display: none")
      div(style="flex-grow: 1; display: flex; flex-direction: column")
        input.selectedPost__titleInput(ref="titleInput" @input="setPending" type="text" v-model="title" placeholder="Title")
        textarea.selectedPost__bodyInput(ref="bodyInput" @input="setPending" v-model="body" placeholder="Start writing here...")

</template>

<script>
export default {
	mounted() {
		this.$store.dispatch("loadFeed");
	},
	data() {
		return {
			cover: "",
			title: "",
			body: ""
		};
	},
	watch: {
		activePost() {
			if (typeof this.activePost != "undefined") {
				this.resetPost();
			}
		}
	},
	computed: {
		activePost() {
			if (typeof this.$route.params.id != "undefined") {
				if (this.$route.params.id == "new") {
					return {
						title: "",
						body: "",
						cover: ""
					};
				} else {
					return this.$store.state.feed.feed.find(
						post => post.id == this.$route.params.id
					);
				}
			}
			return undefined;
		}
	},
	methods: {
		async publish() {
			if (this.cover == "" || this.title == "" || this.body == "") {
				if (this.cover == "") {
					alert("Please add a cover photo");
					return;
				}
				if (this.title == "") {
					alert("Please add a title");
					return;
				}
				if (this.body == "") {
					alert("Please add some content");
					return;
				}
			} else {
				this.$store
					.dispatch("addFeed", {
						title: this.title,
						body: this.body,
						cover: this.cover
					})
					.then(() => {
            alert("Published!");
            this.resetPost()
            this.$router.replace('/admin/feed')
					})
					.catch(error => {
						alert("Error: " + error);
					});
			}
		},
		save() {
			this.$store.dispatch("updateFeed", {
				id: this.activePost.id,
				title: this.title,
				body: this.body,
				cover: this.cover
			});
		},
		setPending() {
			this.$store.commit("setHasPendingActivity", true);
		},
		resetPost() {
			if (this.$store.getters.hasPendingActivity) {
				this.$store.commit("setHasPendingActivity", false);
			}

			if (this.$route.params == "new") {
				alert("new");
			} else {
				this.title = this.activePost.title;
				this.body = this.activePost.body;
				this.cover = this.activePost.cover;
			}
		},
		previewFile() {
			var preview = document.querySelector(".selectedPost__cover");
			var file = document.querySelector("input[type=file]").files[0];
			var reader = new FileReader();

			reader.addEventListener(
				"load",
				() => {
					preview.style.backgroundImage = "url(" + reader.result + ")";
				},
				false
			);

			if (file) {
				reader.readAsDataURL(file);
				this.cover = file;
			}
		}
	}
};
</script>


<style lang="sass" scoped>
@import ../../assets/style

#admin-feed
  width: 100%
  height: 100%
  display: flex
  @include from($tablet-landscape)
    display: grid
    grid-template-columns: 3fr 5fr
  align-items: stretch

.feedControl
  @include from($tablet-landscape)
    border-right: 1px solid $color-layout-border
  padding: 1rem
  overflow-y: auto
  overflow-x: hidden

.feedCard
  margin-top: 1rem
  background-color: $color-background-light
  box-shadow: $shadow
  border-radius: 0.25rem
  display: block
  text-decoration: none
  color: $color-text
  border-left: 4px solid transparent
  padding-bottom: 1rem

.feedCard.router-link-active
  border-left: 4px solid $color-primary

.feedCard__title
  padding-top: 1rem
  padding-left: 1rem
  padding-right: 1rem
.feedCard__body
  padding-left: 1rem
  padding-right: 1rem

.selectedPost
  overflow-x: hidden
  display: flex
  flex-direction: column
  @include to($tablet-portrait)
    position: absolute
    width: 100vw
    height: 100vh
    max-width: 100vw
    max-height: 100vh
    top: 0
    left: 0
  

.selectedPost__header
  height: 3.5rem
  display: flex
  align-items: center
  justify-content: space-between
  background-color: $color-background-light
  transition: 0.2s background-color

.selectedPost__header--editing
  background-color: $color-primary
  color: $color-against-primary

.selectedPost__action
  padding: 1rem

.selectedPost__back
  @include from($desktop)
    display: none


.action_group
  display: flex
  align-items: center
  cursor: pointer

.selectedPost__cover
  height: 15rem
  background-color: $color-placeholder
  background-size: cover
  position: relative
  background-position: center

.selectedPost__cover::after
  content: 'Change photo'
  color: white
  font-weight: bold
  display: flex
  align-items: center
  justify-content: center
  width: 100%
  height: 100%
  cursor: pointer
  transition: 0.2s opacity
  opacity: 0
  background-color: #00000077

.selectedPost__cover:hover::after
  opacity: 1

.selectedPost__titleInput
  padding: 1rem
  padding-bottom: 0.5rem
  font-weight: bold
  font-size: 1.5rem
  border: none
  color: inherit
  width: 100%
  outline: none

.selectedPost__bodyInput
  border: none
  padding: 1rem
  padding-top: 0.5rem
  width: 100%
  height: 100%
  outline: none
  flex-grow: 1
</style>

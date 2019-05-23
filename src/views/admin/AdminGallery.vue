<template lang="pug">
  #admin-gallery

    section.galleryControl
      header.galleryControl__header
        button(@click="$router.push('/admin/gallery/new')").--primary Add New
      section.galleryControl__albums
        router-link.galleryCard(:to="'/admin/gallery/' + post.id" v-for="post,index in $store.state.gallery.gallery" :key="index" :class="{'gallerycard--isHighlight': post.isHighlight}")
          h1.galleryCard__header
            div.galleryCard__title {{ post.title }}
          p.galleryCard__body.unsetNodes(v-line-clamp:24="2" v-html="post.description")

    section.selectedPost(v-if="activePost")
      header.selectedPost__header(:class="{'selectedPost__header--editing':$store.getters.preventLeave}")
        div.action_group
          .selectedPost__action.selectedPost__back(@click="$router.back()")
            fa(icon="angle-left")
        div.action_group
          .selectedPost__action(@click="deletePost" v-show="!$store.getters.preventLeave && $route.params.id != 'new'")
            fa(icon="trash")
            span &nbsp Delete
          .selectedPost__action(v-show="$store.getters.preventLeave" @click="cancel")
            fa(icon="times")
            span &nbsp Cancel
          .selectedPost__action(v-show="$store.getters.preventLeave && $route.params.id != 'new'" @click="save")
            fa(icon="save")
            span &nbsp Save
          .selectedPost__action(v-show="$route.params.id == 'new'" @click="publish")
            fa(icon="save")
            span &nbsp Publish
            
      label(for="upload")
        div.selectedPost__cover(:class="{'selectedPost__cover--hidden': editorFocused}" :style="{backgroundImage: 'url(' + cover + ')'}")
      input(type="file" accept="image/*" id="upload" @change="previewFile(); $store.commit('setPreventLeave', true);" style="display: none")
      div(style="flex-grow: 1; display: flex; flex-direction: column")
        input.selectedPost__titleInput(ref="titleInput" @input="setPending" type="text" v-model="title" placeholder="Title")
        quill-editor(:key="$route.params.id" v-model="body"
                ref="myQuillEditor"
                :options="editorOption"
                @blur="editorFocused=false"
                @focus="editorFocused=true"
                @change="setPending")

</template>

<script>
export default {
	mounted() {
		this.$store.dispatch("loadGallery");
	},
	data() {
		return {
			cover: "",
			title: "",
			body: "",
			readyForChange: true,
			editorFocused: false,

			editorOption: {
				modules: {
					toolbar: [
						[{ header: 1 }, { header: 2 }, "bold", "italic", "link", "image"]
					]
				},
				theme: "snow"
			}
		};
	},
	watch: {
		activePost() {
			if (typeof this.activePost != "undefined") {
				this.resetPost();
				this.editorFocused = false;
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
					return this.$store.state.gallery.gallery.find(
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
					.dispatch("addgallery", {
						title: this.title,
						body: this.body,
						cover: this.cover
					})
					.then(() => {
						alert("Published!");
						this.resetPost();
						this.$router.replace("/admin/gallery");
					})
					.catch(error => {
						alert("Error: " + error);
					});
			}
		},
		save() {
			this.$store.dispatch("updategallery", {
				id: this.activePost.id,
				title: this.title,
				body: this.body,
				cover: this.cover
			});
    },
    cancel(){
      if(confirm('Discard changes?')){
        this.resetPost();
      }
    },
		setPending() {
			if (this.readyForChange) {
				this.$store.commit("setPreventLeave", true);
			}
			this.readyForChange = true;
		},
		deletePost() {
			if (confirm("Are you sure to delete? This action cannot be undone.")) {
				this.$store.dispatch('deletePost',this.activePost.id)
			}
		},
		resetPost() {
			if (this.$store.getters.preventLeave) {
        this.readyForChange = false;
				this.$store.commit("setPreventLeave", false);
			}

			if (this.$route.params == "new") {
			} else {
				this.title = this.activePost.title;
				this.body = this.activePost.body;
				this.cover = this.activePost.cover;
				try {
					document.querySelector("input[type=file]").value = "";
				} catch {}
			}
		},
		invertHighlight(id, currentState) {
			if (currentState) this.$store.dispatch("unsetHighlight", id);
			else this.$store.dispatch("setHighlight", id);
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

#admin-gallery
  width: 100%
  height: 100%
  display: flex
  @include from($tablet-landscape)
    display: grid
    grid-template-columns: 3fr 5fr
  align-items: stretch

.galleryControl
  @include from($tablet-landscape)
    border-right: 1px solid $color-layout-border
  padding: 1rem
  overflow-y: auto
  overflow-x: hidden

.galleryCard
  margin-top: 1rem
  background-color: $color-background-light
  box-shadow: $shadow
  border-radius: 0.25rem
  display: block
  text-decoration: none
  color: $color-text
  border-left: 4px solid transparent
  padding-bottom: 1rem

  &:hover .galleryCard__highlightStar
    color: #00000011

.galleryCard.gallerycard--isHighlight
  .galleryCard__highlightStar
    color: orange !important

.galleryCard.router-link-active
  border-left: 4px solid $color-primary

  .galleryCard__title
    color: $color-primary

.galleryCard__header
  display: flex
  padding-top: 1rem
  padding-left: 1rem
  padding-right: 1rem
  justify-content: space-between
  align-items: flex-start

.galleryCard__highlightStar
  color: #00000000

  &:hover
    color: #00000022 !important

  &:active
    color: #00000033 !important



.galleryCard__title
  font-weight: normal
  margin-bottom: 0.25rem
.galleryCard__body
  padding-left: 1rem
  padding-right: 1rem
  opacity: 0.5
  font-size: 0.9rem

.selectedPost
  display: flex
  flex-direction: column
  overflow-y: auto
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
  flex-basis: 3.5rem
  min-height: 3.5rem
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
  transition: 0.2s height
  background-color: $color-placeholder
  background-size: cover
  position: relative
  background-position: center

.selectedPost__cover--hidden
  height: 0

.selectedPost__cover::after
  content: 'Change photo'
  color: white
  font-weight: 500
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
  padding: 0.5rem 1rem
  font-weight: 500
  font-size: 1.5rem
  border: none
  color: inherit
  width: 100%
  outline: none
  border-bottom: 1px solid $color-layout-border

.selectedPost__bodyInput
  border: none
  padding: 1rem
  padding-top: 0.5rem
  width: 100%
  height: 100%
  outline: none
  flex-grow: 1

.quill-editor
  flex-grow: 1
  background-color: $color-background-light
  display: flex
  flex-direction: column
  font-family: inherit
</style>

<style lang="sass">

.ql-container
  flex-grow: 1
  display: flex
  flex-direction: column
  border: none !important
  font-family: inherit !important

.ql-editor
  flex-grow: 1
  font-family: inherit
  font-size: 1rem

.ql-toolbar
  border: none !important
</style>


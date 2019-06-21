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

    section.selectedPost(v-if="c_activePost")
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
      div(style="padding: 1rem; background-color: white")
        label Title
        input.field(type="text" :value="c_activePost.title" style="display: block")
        label Description
        input.field(type="text" :value="c_activePost.description" style="display: block")
        br
        .grid
          div.grid__img(style="display: flex; align-items: center; justify-content: center; cursor: pointer") + Add photos
          img.grid__img(:src="photo.url" v-for="photo in c_activePost.photos")

        div(style="position: fixed; top: 0; width: 100%; height: 100%; left: 0; display: flex; align-items: center; justify-content: center; background-color: #00000055")
          div(style="background-color: white; width: 100%; max-width: 700px; border-radius: 0.25rem; padding: 1rem")
            h3 Choose photo:
            br
            input(type="file" multiple @change="previewFile();")
            br
            #preview
            br
            center
              button.--primary Upload (1) Photos
        

</template>

<script>

import { db, firebaseui, storageRef } from '../../firebase';
import { firestore } from 'firebase';
export default {
	mounted() {
		this.$store.dispatch("loadGallery");
	},
	data() {
		return {
			files: null
		};
	},
	methods: {
		deletePost() {},
		cancel() {},
		save() {},
		publish() {},
		uploadFiles() {
      for(file in Object.values(this.files))
			var file = feed.cover;
        var randomInt = Math.floor(Math.random() * 1000000);
        var filename = randomInt + "_" + feed.cover.name;
        var fileRef = storageRef.child("images/" + filename);

        fileRef.put(file).then(function(snapshot) {
          fileRef.getDownloadURL().then(fileURL => {
            dispatch("addPost", {
              title: feed.title,
              body: feed.body,
              cover: fileURL
            })
              .then(() => {
                resolve();
              })
              .catch(error => {
                reject(error);
              });
          });
        });
		},
		previewFile() {
			var preview = document.querySelector("#preview");
			var files = document.querySelector("input[type=file]").files;

			function readAndPreview(file) {
				// Make sure `file.name` matches our extensions criteria
				if (/\.(jpe?g|png|gif)$/i.test(file.name)) {
					var reader = new FileReader();

					reader.addEventListener(
						"load",
						function() {
							var image = new Image();
							image.height = 100;
							image.title = file.name;
							image.src = this.result;
							preview.appendChild(image);
						},
						false
					);

					reader.readAsDataURL(file);
				}
			}

			if (files) {
				[].forEach.call(files, readAndPreview);
				this.files = files;
			}
		}
	},
	computed: {
		c_activePost() {
			return this.$store.state.gallery.gallery.find(
				album => album.id == this.$route.params.id
			);
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

input.field
  width: 100%
  padding: 0.5rem 0
  border: none
  border-bottom: 1px solid $color-layout-border
  margin-bottom: 0.5rem
  margin-top: 0.25rem
  font-weight: 500
  color: inherit
  outline: none

input.field::placeholder
  font-weight: normal

input.field:disabled
  opacity: 0.5
  background-color: transparent

input:focus
  border-bottom-color: $color-primary



.galleryCard__title
  font-weight: normal
  margin-bottom: 0.25rem
.galleryCard__body
  padding-left: 1rem
  padding-right: 1rem
  opacity: 0.5
  font-size: 0.9rem

.grid__img
  background-color: #ccc
  min-height: 5rem

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

.grid
  display: grid
  grid-template-columns: 1fr 1fr 1fr
  grid-gap: 1rem

label
  color: #00000088
  font-size: 0.9rem

</style>
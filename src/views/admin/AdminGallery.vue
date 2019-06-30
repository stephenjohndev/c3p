<template lang="pug">
  #admin-gallery
    b-loading(:active.sync="isUploading" :can-cancel="true")
      span Uploading {{ uploadedCount }} of {{ Object.values(files).length }} photos...
                
    section.galleryControl
      header.galleryControl__header
        button(@click="$router.push('/admin/gallery/new')").--primary New Album
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
      div(style="padding: 1rem; background-color: white")
        label Title
        input.field(type="text" v-model="title" style="display: block" @input="isDifferent")
        label Description
        input.field(type="text" v-model="description" style="display: block" @input="isDifferent")
        br
        .grid(v-if="$route.params.id != 'new'")
          div.grid__img(style="display: flex; align-items: center; justify-content: center; cursor: pointer" @click="files = {}; uploadModalShown = true") + Add photos
          img.grid__img(:src="photo.url" v-for="photo in c_activePost.photos")
        div(style="display: flex")
          b-button.is-primary(@click="publish" v-if="$route.params.id == 'new'" style="line-height: initial !important; margin-left: auto") Create album

        div( v-if="uploadModalShown" style="position: fixed; top: 0; width: 100%; height: 100%; left: 0; display: flex; align-items: center; justify-content: center; background-color: #00000055")
          div(style="background-color: white; width: 100%; max-width: 700px; border-radius: 0.25rem; padding: 1rem")
            div(style="display: flex; justify-content: space-between; align-items: center")
              h3 Choose photo
              button(@click="uploadModalShown = false" style="background-color: #ee3344; color: white") Close
            br
            input(type="file" multiple @change="previewFile();")
            br
            br
            #preview
            br
            center
              button(@click="uploadFiles()").--primary Upload ({{Object.values(files).length}}) Photos
        

</template>

<script>
import { db, firebaseui, storageRef } from "../../firebase";
import { Toast } from "buefy/dist/components/toast";
import { Snackbar } from "buefy/dist/components/snackbar";
import { firestore } from "firebase";

export default {
	mounted() {
		this.$store.dispatch("loadGallery");
	},
	data() {
		return {
			files: {},
			uploadModalShown: false,
			title: "",
      description: "",
      uploadedCount: 0,
      isUploading: false
		};
	},
	methods: {
		isDifferent() {
			if (
				this.$route.params.id != "new" &&
				this.title + this.description !=
					this.c_activePost.title + this.c_activePost.description
			) {
				this.$store.commit("setPreventLeave", true);
			} else {
				this.$store.commit("setPreventLeave", false);
			}
		},
		deletePost() {
			db.collection("gallery")
        .doc(this.c_activePost.id)
				.delete()
				.then(() => {
					Toast.open("Album deleted");
				});
		},
		cancel() {
			this.$store.commit("setPreventLeave", false);
			this.title = this.c_activePost.title;
			this.description = this.c_activePost.description;
		},
		save() {
			db.collection("gallery")
				.doc(this.c_activePost.id)
				.set({
					title: this.title,
					description: this.description
				})
				.then(() => {
					Toast.open("Updated");
				});
		},
		publish() {
			db.collection("gallery")
				.add({
					title: this.title,
					description: this.description
				})
				.then(doc => {
					Toast.open("Album created");
					this.$router.push("/admin/gallery/" + doc.id);
				});
		},
		uploadFiles() {
      this.isUploading = true
			var readyFiles = Object.values(this.files);
			readyFiles.forEach(file => {
				var randomInt = Math.floor(Math.random() * 1000000);
				var filename = randomInt + "_" + file.name;
				var fileRef = storageRef.child("images/" + filename);

				fileRef.put(file).then(snapshow => {
					fileRef.getDownloadURL().then(fileURL => {
						this.$store
							.dispatch("pushToAlbum", {
								id: this.c_activePost.id,
								url: fileURL
							})
							.then(() => {
                this.uploadedCount++;
                if(this.uploadedCount == readyFiles.length){
                  this.isUploading = false
                  this.uploadedCount = 0
                  this.files = {}
                  this.uploadModalShown = false
                  Toast.open('Done uploading photos')

                }
							})
							.catch(error => {
								window.alert(error);
							});
					});
				});
			});
		},
		previewFile() {
			var preview = document.querySelector("#preview");
			preview.innerHTML = "";
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
							image.style.margin = "2px";
							preview.appendChild(image);
							width = 100;
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
			if (this.$route.params.id == "new") {
				return {
					title: "",
					description: "",
					photos: []
				};
			}
			return this.$store.state.gallery.gallery.find(
				album => album.id == this.$route.params.id
			);
		}
	},
	watch: {
		c_activePost(value) {
			this.title = value.title;
			this.description = value.description;
			this.photos = value.photos;
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
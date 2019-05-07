<template lang="pug">
  #FeedAdd

    label(for="upload")
      div.post__coverUploader
    input(type="file" accept="image/*" id="upload" @change="previewFile" style="display: none")
    br
    input(type="text" placeholder="Title" v-model="title").post__titleInput
    br
    br
    quill-editor(v-model="body" ref="myQuillEditor").post__bodyInput
    br
    button(@click="submitPost").post__submit Post
</template>

<script>
export default {
	data() {
		return {
			title: "",
			body: "",
			cover: {}
		};
	},
	methods: {
		submitPost() {
			this.$store.dispatch("postFeed", {
				title: this.title,
				body: this.body,
				cover: this.cover
			});
		},

		previewFile() {
			var preview = document.querySelector(".post__coverUploader");
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
        this.cover = file
			}
		}
	}
};
</script>

<style lang="sass">
*
  box-sizing: border-box
.post__coverUploader
  height: 15rem
  background-color: #ddf
  cursor: pointer
  background-position: center
  background-size: cover

.post__titleInput
  font-size: 1.5rem
  padding: 1rem
  width: 100%
  background-color: transparent
  border-type: solid
  border-color: #ccc
  border-width: 0px 0px 1px 0px

.post__submit
  padding: 0.75rem
  width: 100%
  background-color: cornflowerblue
  color: white
  border: none
  cursor: pointer
</style>
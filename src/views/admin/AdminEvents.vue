<template lang="pug">
  #admin-events

    section.eventsControl
      header.eventsControl__header
        button(@click="$router.push('/admin/events/new')").--primary Add New
      section.eventsControl__eventss
        router-link.eventsCard(:to="'/admin/events/' + event.id" v-for="event,index in $store.state.events.events" :key="index")
          h1.eventsCard__title {{ event.title }}
          span.eventsCard__body {{ event.venue }}

    section.selectedPost(v-if="activePost")
      header.selectedPost__header(:class="{'selectedPost__header--editing':$store.getters.preventLeave}")
        div.action_group
          .selectedPost__action.selectedPost__back(@click="$router.replace('./')")
            fa(icon="angle-left")
        div.action_group
          .selectedPost__action(v-show="!$store.getters.preventLeave && $route.params.id != 'new'" @click="deletePost")
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
      div
        button.selectedPost__tab(@click="activeTab = 0" :class="{'selectedPost__tab--active': activeTab == 0}") Basic Info
        button.selectedPost__tab(@click="activeTab = 1" :class="{'selectedPost__tab--active': activeTab == 1}") Description
        button.selectedPost__tab(@click="activeTab = 2" :class="{'selectedPost__tab--active': activeTab == 2}") Registration
      div.selectedPost__page(v-show="activeTab == 0")
        label(for="cover" :style="{ backgroundImage: 'url(' + cover + ')' }").selectedPost__cover
          input(type="file" id="cover" @change="previewFile(); $store.commit('setPreventLeave', true);")
        .selectedPost__info
          label Title:
          input.selectedPost__title.field(type="text" v-model="title" placeholder="Name of event")
          label Venue:
          input.selectedPost__venue.field(type="text" v-model="venue" placeholder="Location")
          label Start date:
          input.selectedPost__start.field(type="datetime-local" v-model="start" @change="$store.commit('setPreventLeave', true)")
          label End date:
          input.selectedPost__end.field(type="datetime-local" v-model="end" @change="$store.commit('setPreventLeave', true)")
      div.selectedPost__page(v-if="activeTab == 1")
        quill-editor(:key="$route.params.id" v-model="description"
                  ref="myQuillEditor"
                  :options="editorOption"
                  @blur="editorFocused=false"
                  @focus="editorFocused=true"
                  )
      div.selectedPost__page(v-if="activeTab == 2")
        .selectedPost__info
          label
            input(type="checkbox" v-model="registrationAllowed")
            span &nbsp; Registration
          br
          input.field(type="text" v-model="registrationLink" placeholder="Registration form URL" :disabled="!registrationAllowed")
          label
            input(type="checkbox" v-model="feedbackAllowed")
            span &nbsp; Feedback
          input.field(type="text" v-model="feedbackLink"  placeholder="Feedback form URL" :disabled="!feedbackAllowed")


</template>

<script>
export default {
	mounted() {
		this.$store.dispatch("loadEvents");
	},
	data() {
		return {
			activeTab: 0,
			cover: "",
			title: "",
			description: "",
			venue: "",
			start: "",
			end: "",
			registrationLink: "",
			feedbackLink: "",
			registrationAllowed: false,
			feedbackAllowed: false,

			editorOption: {
				modules: {
					toolbar: [
						[{ header: 1 }, { header: 2 }, "bold", "italic", "link", "image"]
					]
				},
				theme: "snow",
				placeholder: "Tell something about the event..."
			}
		};
	},
	watch: {
		activePost() {
			if (typeof this.activePost != "undefined") {
				this.resetPost();
				this.editorFocused = false;
			}
    },
    isDifferent(value){
      if (value) {
				this.$store.commit("setPreventLeave", true);
      }
      else {
        this.$store.commit("setPreventLeave", false);
      }
    }
	},
	computed: {
		activePost() {
			if (typeof this.$route.params.id != "undefined") {
				if (this.$route.params.id == "new") {
					return {
						title: "",
						description: "",
						cover: "",
						venue: "",
						registrationLink: "",
						feedbackLink: "",
						start: null,
						end: null,
						registrationAllowed: false,
						feedbackAllowed: false
					};
				} else {
					return this.$store.state.events.events.find(
						post => post.id == this.$route.params.id
					);
				}
			}
			return undefined;
    },
    isDifferent() {
      return this.title + this.description + this.cover + this.venue + this.registrationLink + this.feedbackLink + this.registrationAllowed + this.feedbackAllowed != this.activePost.title + this.activePost.description + this.activePost.cover + this.activePost.venue + this.activePost.registrationLink + this.activePost.feedbackLink + this.activePost.registrationAllowed + this.activePost.feedbackAllowed
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
					.dispatch("prepareAddEvent", {
						id: this.activePost.id,
						title: this.title,
						body: this.body,
						cover: this.cover,
						description: this.description,
						venue: this.venue,
						start: this.start,
						end: this.end,
						registrationLink: this.registrationLink,
						feedbackLink: this.feedbackLink,
						registrationAllowed: this.registrationAllowed,
						feedbackAllowed: this.feedbackAllowed
					})
					.then(() => {
						alert("Published!");
						this.resetPost();
						this.$router.replace("/admin/events");
					})
					.catch(error => {
						alert("Error: " + error);
					});
			}
		},
		save() {
			this.$store.dispatch("prepareUpdateEvent", {
				id: this.activePost.id,
				title: this.title,
				body: this.body,
				cover: this.cover,
				description: this.description,
				venue: this.venue,
				start: this.start,
				end: this.end,
				registrationLink: this.registrationLink,
				feedbackLink: this.feedbackLink,
				registrationAllowed: this.registrationAllowed,
				feedbackAllowed: this.feedbackAllowed
			});
		},
		cancel() {
			if (confirm("Discard changes?")) {
				this.resetPost();
			}
    },
    deletePost () {
      if (confirm('Are you sure to delete? This action cannot be undone.')) {
        this.$store.dispatch('deleteEvent', this.activePost.id)
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
				this.description = this.activePost.description;
				this.cover = this.activePost.cover;
				this.venue = this.activePost.venue;
				this.registrationLink = this.activePost.registrationLink;
				this.feedbackLink = this.activePost.feedbackLink;
				this.registrationAllowed = this.activePost.registrationAllowed;
				this.feedbackAllowed = this.activePost.feedbackAllowed;
				if (this.activePost.start != null || this.activePost.end != null) {
					this.start = new Date(
						this.activePost.start.toDate() -
							new Date().getTimezoneOffset() * 60000
					)
						.toISOString()
						.slice(0, 16);
					this.end = new Date(
						this.activePost.end.toDate() -
							new Date().getTimezoneOffset() * 60000
					)
						.toISOString()
						.slice(0, 16);
				} else {
					this.start = "";
					this.end = "";
				}
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

#admin-events
  width: 100%
  height: 100%
  display: flex
  @include from($tablet-landscape)
    display: grid
    grid-template-columns: 3fr 5fr
  align-items: stretch

.eventsControl
  @include from($tablet-landscape)
    border-right: 1px solid $color-layout-border
  padding: 1rem
  overflow-y: auto
  overflow-x: hidden

.eventsCard
  margin-top: 1rem
  background-color: $color-background-light
  box-shadow: $shadow
  border-radius: 0.25rem
  display: block
  text-decoration: none
  color: $color-text
  border-left: 4px solid transparent
  padding-bottom: 1rem

.eventsCard.router-link-active
  border-left: 4px solid $color-primary

.eventsCard__title
  padding-top: 1rem
  padding-left: 1rem
  padding-right: 1rem
  font-weight: normal
  
.eventsCard__body
  padding-left: 1rem
  padding-right: 1rem
  opacity: 0.5

.selectedPost
  display: flex
  flex-direction: column
  overflow-y: auto
  background-color: $color-background-light
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

.selectedPost__tab
  background-color: transparent
  border-radius: 0

  &:hover
    color: $color-primary

.selectedPost__tab--active
  border-bottom: 2px solid $color-primary
  color: $color-primary

.selectedPost__page
  flex-grow: 1
  display: flex
  flex-direction: column

.selectedPost__info
  padding: $pad

.selectedPost__cover
  width: 100%
  height: 12rem
  transition: 0.2s height
  background-color: $color-placeholder
  background-size: cover
  position: relative
  background-position: center

  > *
    display: none

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

.quill-editor
  flex-grow: 1
  background-color: $color-background-light
  display: flex
  flex-direction: column
  font-family: inherit

label
  color: #00000088
  font-size: 0.9rem
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


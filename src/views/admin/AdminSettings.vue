<template lang="pug">
  section.section

    h1.title.is-6 About C3P
    b-input(maxlength="500" type="textarea" @input="description = arguments[0]" :value="$store.state.config.about" ref="description")
    b-button(type="is-primary" @click="save") Save
</template>

<script>
export default {
  data(){
    return{
      description: ""
    }
  },
  mounted(){
    this.$store.dispatch('loadAbout')
  },
  computed: {
    about: function(){
      return this.$store.state.config.about
    }
  },
  watch: {
    about: {
      immediate: true,
      handler: function(value){
        this.description = value
      }
    }
  },
  methods: {
    save: function(){
      this.$store.dispatch('saveAbout', this.description)
    }
  }
}
</script>

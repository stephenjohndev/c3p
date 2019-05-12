<template lang="pug">
  .container(:class="appliedClasses")
    slot
</template>

<style lang="sass" scoped>
@import '../assets/style'


// Container Variables
$phone-width: 100%
$tablet-width: 900px
$desktop-width: 1200px

.container
  width: calc(100% - #{$pad*2})
  margin-left: auto
  margin-right: auto

  @include from($phone)
    max-width: $phone-width
  @include from($tablet-landscape)
    width: 90vw
    // max-width: $tablet-width
  @include from($desktop)
    width: 90vw
    max-width: $desktop-width

.container.container--extend
  width: 100%
  @include from($phone)
    max-width: calc(#{$phone-width} + #{$pad * 2})
  @include from($tablet-landscape)
    width: calc(90vw + #{$pad * 2})
    // max-width: calc(#{$tablet-width} + #{$pad * 2})
  @include from($desktop)
    width: calc(90vw + #{$pad * 2})
    max-width: calc(#{$desktop-width} + #{$pad * 2})
  
.container.container--extendright
  padding-left: $pad

.container.container--extendleft
  padding-right: $pad



</style>

<script>
export default {
  props: {
    extendleft: {
      type: Boolean
    },
    extendright: {
      type: Boolean
    },
    extendboth: {
      type: Boolean
    },
  },
  computed: {
    appliedClasses(){
      var classes = []
      if(this.extendright || this.extendleft || this.extendboth)
        classes.push('container--extend')
      if(this.extendright)
        classes.push('container--extendright')
      if(this.extendleft)
        classes.push('container--extendleft')
      return classes
      
    }
  }
}
</script>



<template lang="pug">
  #home
    home-nav
    home-highlight
    home-latest
</template>



<script>
import layoutContainer from '@/components/layoutContainer'
import homeNav from '@/components/homeNav'
import homeHighlight from '@/components/homeHighlight'
import homeLatest from '@/components/homeLatest'
export default {
  name: "home",
  components: {
    layoutContainer,
    homeNav,
    homeHighlight,
    homeLatest
  },
	data() {
    return {}
  },
  methods: {
  }
};
</script>

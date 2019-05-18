<template lang="pug">
  #home
    home-nav
    home-highlight
    home-latest
    home-events
    home-stats
    home-about
</template>



<script>
import layoutContainer from '@/components/layoutContainer'
import homeNav from '@/components/homeNav'
import homeHighlight from '@/components/homeHighlight'
import homeLatest from '@/components/homeLatest'
import homeEvents from '@/components/homeEvents'
import homeStats from '@/components/homeStats'
import homeAbout from '@/components/homeAbout'
export default {
  name: "home",
  components: {
    layoutContainer,
    homeNav,
    homeHighlight,
    homeLatest,
    homeEvents,
    homeStats,
    homeAbout
  },
};
</script>


<template lang="pug">
  #home
    transition(name="slide-up")
      home-preloader(v-if="$store.state.feed.isPreloaderShown")
    home-nav
    home-highlight
    home-latest
    home-events(v-if="$store.state.events.upcomingEvents")
    home-stats
    home-about
    home-footer
</template>

<style lang="sass" scoped>
@import '../assets/style'
</style>


<script>
import homePreloader from '@/components/homePreloader'
import homeNav from '@/components/homeNav'
import homeHighlight from '@/components/homeHighlight'
import homeLatest from '@/components/homeLatest'
import homeEvents from '@/components/homeEvents'
import homeStats from '@/components/homeStats'
import homeAbout from '@/components/homeAbout'
import homeFooter from '@/components/homeFooter'
export default {
  name: "home",

  components: {
    homePreloader,
    homeNav,
    homeHighlight,
    homeLatest,
    homeEvents,
    homeStats,
    homeAbout,
    homeFooter
  },
};
</script>


<template lang="pug">
#admin
  div.adminDrawer__sidebarCover(v-if="sidebarShown" @click="sidebarShown = false")
  transition(name="drawer")
    aside.adminDrawer__sidebar(v-if="sidebarShown")
      header.adminDrawer__header
      nav.adminDrawer__nav
        ul(@click="sidebarShown = false")
          li: router-link.adminDrawer__link(:to="{name: 'admin-feed'}")
            fa.adminDrawer__link__icon(icon="bullhorn" fixed-width)
            span Feed
          li: router-link.adminDrawer__link(:to="{name: 'admin-events'}")
            fa.adminDrawer__link__icon(icon="calendar-alt" fixed-width)
            span Events
          li: router-link.adminDrawer__link(:to="{name: 'admin-gallery'}")
            fa.adminDrawer__link__icon(icon="images" fixed-width)
            span Gallery
          li: router-link.adminDrawer__link(:to="{name: 'admin-settings'}")
            fa.adminDrawer__link__icon(icon="cog" fixed-width)
            span Settings
          li: router-link.adminDrawer__link(:to="{name: 'admin-editors'}")
            fa.adminDrawer__link__icon(icon="users" fixed-width)
            span Editors
  aside.adminDrawer
    header.adminDrawer__header
    nav.adminDrawer__nav
      ul
        li: router-link.adminDrawer__link(:to="{name: 'admin-feed'}")
          fa.adminDrawer__link__icon(icon="bullhorn" fixed-width)
          span Feed
        li: router-link.adminDrawer__link(:to="{name: 'admin-events'}")
          fa.adminDrawer__link__icon(icon="calendar-alt" fixed-width)
          span Events
        li: router-link.adminDrawer__link(:to="{name: 'admin-gallery'}")
          fa.adminDrawer__link__icon(icon="images" fixed-width)
          span Gallery
        li: router-link.adminDrawer__link(:to="{name: 'admin-settings'}")
          fa.adminDrawer__link__icon(icon="cog" fixed-width)
          span Settings
        li: router-link.adminDrawer__link(:to="{name: 'admin-editors'}")
          fa.adminDrawer__link__icon(icon="users" fixed-width)
          span Editors
  main.adminMain
    header.adminHeader
      .adminHeader__action.adminHeader__menu(@click="sidebarShown = true")
        fa(icon="bars")
      span
      button.adminHeader__backToHome(@click="$router.push('/')")
        span Back to Home &nbsp;
        fa(icon="sign-out-alt")
    router-view
    
</template>


<script>
export default {
  data(){
    return {
      sidebarShown: false
    }
  }
}
</script>


<style lang="sass" scoped>
@import ../assets/style


  

#admin
  display: flex
  background-color: $color-background
  height: 100vh
  width: 100vw
  overflow-x: hidden
  max-height: 100vh
  overflow-y: hidden
  

.adminDrawer
  @include to($tablet-portrait)
    display: none
  display: flex
  flex-direction: column
  flex-basis: 18rem
  border-right: 1px solid $color-layout-border
  background-color: $color-background-light

.adminDrawer__link
  padding: 0.5rem 2rem
  margin-top: 0.5rem
  display: block
  border-left: 4px solid transparent
  color: $color-text-unactive
  text-decoration: none

  svg
    margin-right: 1rem
    path
      fill: $color-graphic-unactive

.router-link-active
  font-weight: 500
  color: $color-text
  border-left: 4px solid $color-primary
  svg
    path
      fill: $color-primary

.adminDrawer__header
  border-bottom: 1px solid $color-layout-border
  height: 3.5rem

.adminDrawer__nav
  height: 100%

.adminDrawer__sidebarCover
  width: 100%
  height: 100%
  background-color: #00000077
  position: fixed
  top: 0
  left: 0
  z-index: 10000

  @include from($tablet-landscape)
    display: none

.adminDrawer__sidebar
  z-index: 10000
  position: fixed
  top: 0
  left: 0
  width: 100%
  max-width: 15rem
  background-color: $color-background-light
  height: 100%

  @include from($tablet-landscape)
    display: none

.adminHeader
  display: flex
  align-items: center
  justify-content: space-between
  height: 3.5rem
  background-color: $color-background-light
  border-bottom: 1px solid $color-layout-border

.adminHeader__action
  padding: 1rem

.adminHeader__menu
  @include from($tablet-landscape)
    display: none

.adminHeader__backToHome
  background-color: transparent
  margin-right: 0.25rem

  &:hover
    background-color: #00000011

.adminMain
  width: 100%
  display: flex
  flex-direction: column



</style>

<template lang="pug">
#admin
  aside.adminDrawer
    header.adminDrawer__header
    nav.adminDrawer__nav
      ul
        li: router-link.adminDrawer__link.adminDrawer__link--active(:to="{name: 'admin-feed'}")
          fa.adminDrawer__link__icon(icon="bullhorn" fixed-width)
          span Feed
        li: router-link.adminDrawer__link(:to="{name: 'admin-events'}")
          fa.adminDrawer__link__icon(icon="calendar-alt" fixed-width)
          span Events
  main.adminMain
    header.adminHeader
      .adminHeader__action.adminHeader__menu
        fa(icon="bars")
      span
      .adminHeader__action
        fa(icon="sign-out-alt")
    router-view
    
            
          



</template>

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

.adminDrawer__link--active
  font-weight: bold
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

.adminMain
  width: 100%
  display: flex
  flex-direction: column



</style>

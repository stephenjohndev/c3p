<template lang="pug">
#adminWrapper
  div(v-show="!$store.state.auth.user" style="background-color: #eeeeee; height: 100vh;")
    #firebaseui-auth-container(style="position: absolute; top: 30%; left: 50%; transform: translate(-50%,-50%)")
  #admin(v-if="$store.state.auth.user && $store.state.auth.isAuthorized")
    b-loading(:is-full-page="true" :active.sync="$store.state.isSlightLoaderShown" :can-cancel="true")
    div.adminDrawer__sidebarCover(v-if="sidebarShown" @click="sidebarShown = false")
    transition(name="drawer")
      aside.adminDrawer__sidebar(v-if="sidebarShown")
        nav.adminDrawer__nav
          ul(@click="sidebarShown = false")
            li: router-link.adminDrawer__link(to="/" style="border-left-color: transparent; margin-top: 1rem; margin-bottom: 1rem;")
              fa.adminDrawer__link__icon(icon="home")
              span(style="color: #049FD9") Back to Home
            li: router-link.adminDrawer__link(:to="{name: 'admin-feed'}")
              fa.adminDrawer__link__icon(icon="bullhorn" fixed-width)
              span News
            li: router-link.adminDrawer__link(:to="{name: 'admin-events'}")
              fa.adminDrawer__link__icon(icon="calendar-alt" fixed-width)
              span Events
            li: router-link.adminDrawer__link(:to="{name: 'admin-gallery'}")
              fa.adminDrawer__link__icon(icon="images" fixed-width)
              span Gallery
            //- li: router-link.adminDrawer__link(:to="{name: 'admin-settings'}")
            //-   fa.adminDrawer__link__icon(icon="cog" fixed-width)
            //-   span Settings
            li: router-link.adminDrawer__link(:to="{name: 'admin-editors'}")
              fa.adminDrawer__link__icon(icon="users" fixed-width)
              span Editors
    aside.adminDrawer
      
          
      nav.adminDrawer__nav
        ul
          li: router-link.adminDrawer__link(to="/" style="border-left-color: transparent; margin-top: 1rem; margin-bottom: 1rem;")
            fa.adminDrawer__link__icon(icon="home")
            span(style="color: #049FD9") Back to Home
          li: router-link.adminDrawer__link(:to="{name: 'admin-feed'}")
            fa.adminDrawer__link__icon(icon="bullhorn" fixed-width)
            span News
          li: router-link.adminDrawer__link(:to="{name: 'admin-events'}")
            fa.adminDrawer__link__icon(icon="calendar-alt" fixed-width)
            span Events
          li: router-link.adminDrawer__link(:to="{name: 'admin-gallery'}")
            fa.adminDrawer__link__icon(icon="images" fixed-width)
            span Gallery
          //- li: router-link.adminDrawer__link(:to="{name: 'admin-settings'}")
          //-   fa.adminDrawer__link__icon(icon="cog" fixed-width)
          //-   span Settings
          li: router-link.adminDrawer__link(:to="{name: 'admin-editors'}")
            fa.adminDrawer__link__icon(icon="users" fixed-width)
            span Editors
    main.adminMain
      header.adminHeader
        .adminHeader__action.adminHeader__menu(@click="sidebarShown = true")
          fa(icon="bars")
        b-button.is-danger.is-outlined(@click="$store.dispatch('signOut'); $router.push('/')" style="margin-left: auto;border-width: 1px")
          span Sign out &nbsp;
          fa(icon="sign-out-alt")
        
      router-view
    

  div.notAuthenticated(v-else-if="$store.state.auth.user != null && $store.state.auth.isAuthorized == false")
    h3.title.is-1 Sorry :(
    p You are not allowed to access this feature. Please contact the administrator.
    br
    b-button(@click="$store.dispatch('signOut'); $router.push('/')") Back to Home
  div(v-else)
    h6 Please wait...
</template>


<script>
export default {
  data(){
    return {
      sidebarShown: false
    }
  },
  mounted(){
    this.$store.dispatch('initializeUI')
  }
}
</script>


<style lang="sass" scoped>
@import ../assets/style


#adminWrapper
  background-color: white

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

  &:hover
    background-color: #00000011

.adminMain
  width: 100%
  display: flex
  flex-direction: column

.notAuthenticated
  width: 100vw
  height: 100vh
  display: flex
  flex-direction: column
  align-items: center
  justify-content: center

</style>

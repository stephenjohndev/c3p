<template lang="pug">
  #admin
    aside.adminDrawer
      header.adminDrawer__header

      nav.adminDrawer__nav
        ul
          li: router-link(:to="{name: 'admin-feed'}").adminDrawer__link.adminDrawer__link--active
            fa(icon="bullhorn" fixed-width).--margin-right
            span Feed
          li: router-link(:to="{name: 'admin-events'}").adminDrawer__link
            fa(icon="calendar-alt" fixed-width).--margin-right
            span Events
          li: router-link(:to="{name: 'admin-gallery'}").adminDrawer__link
            fa(icon="images" fixed-width).--margin-right
            span Gallery
    main.adminMain
      header.adminMain__header
      .adminMain__sectionWrapper
        section
          button.button--primary
            fa(icon="plus").--margin-right-xsmall
            span Add a new post
          .card
            .--flex
              div.--grow
                h4 Cisco Networking Academy Conference 2019
                p Lorem ipsum dolor sit amet...
              div
                fa(icon="star" style="cursor: pointer; color: #ffdd55; ")
          .card.card--active
            .--flex
              div.--grow
                h4 Cisco Networking Academy Conference 2019
                p Lorem ipsum dolor sit amet...
              div
                fa(icon="star" style="cursor: pointer; color: transparent; ")
          .card
            .--flex
              div.--grow
                h4 Cisco Networking Academy Conference 2019
                p Lorem ipsum dolor sit amet...
              div
                fa(icon="star" style="cursor: pointer; color: #ddd; ")
        section(style="flex-grow: 1; padding: 1rem; padding-left: 0")
          .card(style="height: 100%; margin: 0")
            h4 Cisco Networking Academy Conference 2019
            p Lorem ipsum dolor sit amet...


</template>

<style lang="sass" scoped>
#admin
  // Layout
  display: flex
  height: 100vh
  width: 100vw
  max-height: 100vh
  max-width: 100vw
  color: #333
  overflow: hidden

.adminDrawer
  // Layout
  width: 15rem

  // Look
  background-color: white
  border-right: 1px solid #00000011

.adminDrawer__header
  height: 3.5rem
  display: flex
  align-items: center
  border-bottom: 1px solid #00000011
.adminDrawer__nav
  margin-top: 1rem

.adminDrawer__link
  padding: 0.5rem 2rem
  margin-top: 0.5rem
  border-left: 4px solid transparent
  text-decoration: none
  display: block
  color: #888
  
  svg > path
    fill: #aaa

  &:hover
    color: #333
    svg > path
      fill: #43a3ce

.adminDrawer__link--active
  font-weight: bold
  border-left: 4px solid #43a3ce
  color: #333
  svg > path
    fill: #43a3ce

.adminMain
  // Layout
  flex-grow: 1
  display: flex
  flex-direction: column

  // Look
  background-color: #f6f7fb
  color: #333
  

.adminMain__header
  // Layout
  height: 3.5rem
  display: flex
  align-items: center
  padding-left: 1rem
  padding-right: 1rem
  background-color: white
  
  // Look
  border-bottom: 1px solid #00000011

.adminMain__sectionWrapper
  display: flex
  align-items: stretch
  flex-grow: 1

  > :first-child
    width: 25rem
    padding: 1rem

.card
  background-color: white
  padding: 1rem
  margin-top: 1rem
  border-radius: 0.25rem
  box-shadow: 0 2px 0.5rem #00000011

.card--active
  border-left: 4px solid #43a3ce


.button--primary
  background-color: #43a3ce
  color: white
  padding: 0.5rem 1rem
  border: none
  border-radius: 0.25rem
  margin-bottom: 0
  width: 100%
  cursor: pointer
  transition: 0.2s background-color
  outline: none
  
  &:hover
    background-color: mix(black,#43a3ce,10%)

  &:active
    background-color: mix(black,#43a3ce,20%)

</style>


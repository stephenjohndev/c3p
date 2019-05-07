<template lang="pug">
  #admin-feed
    .adminFeed__sectionWrapper
      section.feedControl
        header.feedControl__header
          button.--primary Add New
        section.feedControl__feeds
          .feedCard
            h1.feedCard__title Title
            p.feedCard__body body
          .feedCard.feedCard--active
            h1.feedCard__title Title
            p.feedCard__body body
          .feedCard
            h1.feedCard__title Title
            p.feedCard__body body
          .feedCard
            h1.feedCard__title Title
            p.feedCard__body body
          .feedCard
            h1.feedCard__title Title
            p.feedCard__body body
      section.selectedPost
        header.selectedPost__header
          div.action_group
            .selectedPost__action.selectedPost__back
              fa(icon="angle-left")
          div.action_group
            .selectedPost__action
              fa(icon="trash")
            .selectedPost__action
              fa(icon="edit")
        div.selectedPost__cover
        h1.selectedPost__title Title
        div.selectedPost__body

</template>

<style lang="sass" scoped>
@import ../../assets/style

#admin-feed
  height: 100%
.adminFeed__sectionWrapper
  display: flex
  width: 100%
  align-items: stretch
  height: 100%

.feedControl
  @include from($desktop)
    flex-basis: 25rem
    border-right: 1px solid $color-layout-border
  padding: 1rem
  width: 100%
  overflow-y: auto
  overflow-x: hidden

.feedCard
  margin-top: 1rem
  background-color: $color-background-light
  box-shadow: $shadow
  border-radius: 0.25rem
.feedCard--active
  border-left: 4px solid $color-primary

.feedCard__title
  padding-top: 1rem
  padding-left: 1rem
  padding-right: 1rem
.feedCard__body
  padding-left: 1rem
  padding-right: 1rem
  padding-bottom: 1rem

.selectedPost
  // @include to($tablet-landscape)
  //   position: absolute
  //   width: 100vw
  //   height: 100vh
  //   max-width: 100vw
  //   max-height: 100vh
  //   top: 0
  //   left: 0
  flex-grow: 1
  background-color: $color-background-light
  overflow-x: hidden

.selectedPost__header
  height: 3.5rem
  display: flex
  align-items: center
  justify-content: space-between

.selectedPost__action
  padding: 1rem

.selectedPost__back
  @include from($desktop)
    display: none


.action_group
  display: flex
  align-items: center

.selectedPost__cover
  height: 15rem
  background-color: $color-placeholder
  background: url('https://picsum.photos/900/400')

.selectedPost__title
  padding-left: 1rem
  padding-right: 1rem
  padding-top: 1rem

.selectedPost__body
  padding-left: 1rem
  padding-right: 1rem
  padding-bottom: 1rem
  display: flex

.selectedPost__body::-webkit-scrollbar
  display: none
</style>

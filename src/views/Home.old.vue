<template lang="pug">
  #home
    nav.home__nav
      .nav__actionGroup
        .nav__action.nav__bars
          fa(icon="bars")
        .nav__logo
          h2(style="margin-left: 6.5rem; color: white") C3P
      .nav__actionGroup
        ul.nav__links
          li: a(href="#").nav__link Home
          li: a(href="#").nav__link About
          li: a(href="#").nav__link Events
          li: a(href="#").nav__link Resources
        .nav__action
          fa(icon="search")
          button.nav__cta Contact us
    main
      div.highlights
        div.highlights__banner
        div.highlight
          div.highlight__label Highlights
          h1.highlight__title Cisco Network Academy Conference 2019
          p.highlight__bodyPreview(v-line-clamp:80="3") Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam pretium velit ipsum, id pretium urna egestas gravida. Sed quis lorem rhoncus, porta eros sed, iaculis sem. Suspendisse augue nisi, imperdiet ac dictum sed, placerat vitae lorem. Vivamus cursus lacus mauris, id dapibus orci convallis a. Nulla facilisi. Donec quis ante at turpis dignissim pretium. Cras vel maximus metus. Aliquam molestie, libero sed consectetur ornare, leo lectus sagittis quam, in viverra felis risus et orci. Maecenas quis eros sit amet ipsum mattis egestas. Fusce molestie ipsum arcu, sit amet dignissim eros vehicula eu.
          router-link(to="").highlight__readMore Read more
          br
          br
          //- button.highlight__navigator
          //-   fa(icon="angle-left")
          //-   span Prev
          //- button.highlight__navigator
          //-   span Next
          //-   fa(icon="angle-right")
          div.dot
          div.dot
          div.dot
          div.dot
            

      div.latest
        nav.latest__nav
          h3.latest__label Latest
          .latest__actionGroup
            .latest__action
              fa(icon="angle-left")
            .latest__action
              fa(icon="angle-right")
        div.latest__items
          div.latest__item
            div.latest__banner
            h3.latest__title Cisco Network Academy Conference 2019
            p.latest__bodyPreview(v-line-clamp:80="3") Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam pretium velit ipsum, id pretium urna egestas gravida. Sed quis lorem rhoncus, porta eros sed, iaculis sem. Suspendisse augue nisi, imperdiet ac dictum sed, placerat vitae lorem. Vivamus cursus lacus mauris, id dapibus orci convallis a. Nulla facilisi. Donec quis ante at turpis dignissim pretium. Cras vel maximus metus. Aliquam molestie, libero sed consectetur ornare, leo lectus sagittis quam, in viverra felis risus et orci. Maecenas quis eros sit amet ipsum mattis egestas. Fusce molestie ipsum arcu, sit amet dignissim eros vehicula eu.
            router-link(to="").highlight__readMore Read more
          div.latest__item
            div.latest__banner
            h3.latest__title Cisco Network Academy Conference 2019
            p.latest__bodyPreview(v-line-clamp:80="3") Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam pretium velit ipsum, id pretium urna egestas gravida. Sed quis lorem rhoncus, porta eros sed, iaculis sem. Suspendisse augue nisi, imperdiet ac dictum sed, placerat vitae lorem. Vivamus cursus lacus mauris, id dapibus orci convallis a. Nulla facilisi. Donec quis ante at turpis dignissim pretium. Cras vel maximus metus. Aliquam molestie, libero sed consectetur ornare, leo lectus sagittis quam, in viverra felis risus et orci. Maecenas quis eros sit amet ipsum mattis egestas. Fusce molestie ipsum arcu, sit amet dignissim eros vehicula eu.
            router-link(to="").highlight__readMore Read more
          div.latest__item
            div.latest__banner
            h3.latest__title Cisco Network Academy Conference 2019
            p.latest__bodyPreview(v-line-clamp:80="3") Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam pretium velit ipsum, id pretium urna egestas gravida. Sed quis lorem rhoncus, porta eros sed, iaculis sem. Suspendisse augue nisi, imperdiet ac dictum sed, placerat vitae lorem. Vivamus cursus lacus mauris, id dapibus orci convallis a. Nulla facilisi. Donec quis ante at turpis dignissim pretium. Cras vel maximus metus. Aliquam molestie, libero sed consectetur ornare, leo lectus sagittis quam, in viverra felis risus et orci. Maecenas quis eros sit amet ipsum mattis egestas. Fusce molestie ipsum arcu, sit amet dignissim eros vehicula eu.
            router-link(to="").highlight__readMore Read more
        center
          a.latest__seeAll See all news
      div.events
        nav.events__nav
          h3.events__label Upcoming Events
          .events__actionGroup
            .events__action
              fa(icon="angle-left")
            .events__action
              fa(icon="angle-right")
        div.events__items
          div.event
            div.event__banner
            header.event__header
              div.event__mainDetail
                h4.event__title Cisco Network Academy Conference 2019
                p.event__location Mapua University
              div.event__date
                h4 APR 1-2
          div.event
            div.event__banner
            header.event__header
              div.event__mainDetail
                h4.event__title Cisco Network Academy Conference 2019
                p.event__location Mapua University
              div.event__date
                h4 APR 1-2
         
        center
          a.events__seeAll See all events
      div.footer



      


</template>

<style lang="sass">
@import '../assets/style'

.home__nav
  background-color: $color-primary
  display: flex
  align-items: center
  justify-content: space-between
  position: sticky
  top: 0
  z-index: 10
  border-bottom: 1px solid $color-layout-border-inverted

  @include from($tablet-landscape)
    height: 6rem
.nav__actionGroup
  display: flex
  align-items: center
.nav__action
  padding: 1.5rem
  color: white
  cursor: pointer

.nav__logo
  @include to($tablet-portrait)
    display: none
.nav__bars
  @include from($tablet-landscape)
    display: none

.nav__links
  display: flex
  list-style-type: none
  margin: 0
  padding: 0
  @include to($tablet-portrait)
    display: none
.nav__link
  padding: 1rem
  color: $color-against-primary
  text-decoration: none
  margin-left: 1rem

.nav__cta
  margin-left: 2rem
  border-radius: 3rem
  background-color: transparent
  color: white
  border: 2px solid transparentize(white, 0.7)
  @include to($tablet-portrait)
    display: none

.highlights
  background-color: $color-primary
  position: relative

.highlights__banner
  height: 66vw
  background: url('https://picsum.photos/700')
  background-size: cover

  @include from($tablet-landscape)
    max-width: 70%
    margin-left: auto
    height: calc(100vh - 6rem)

.highlight
  padding: 1.5rem

  @include from($tablet-landscape)
    position: absolute
    top: 50%
    left: 5rem
    transform: translateY(-50%)
    width: 100%
    max-width: 50rem

.highlight__label
  text-transform: uppercase
  color: $color-accent
  letter-spacing: 0.25rem
  @include from($tablet-landscape)
    font-size: 1.5rem

.highlight__title
  font-weight: 700
  color: $color-against-primary
  line-height: 2.5rem
  @include from($tablet-landscape)
    font-size: 3.5rem
    line-height: 3.75rem
    margin-top: 1.5rem
    margin-bottom: 1.5rem

.highlight__bodyPreview
  opacity: 0.7
  margin-top: 0.5rem
  width: 100%
  color: white
  @include from($tablet-landscape)
    max-width: 75%
    opacity: 1

.highlight__readMore
  text-decoration: none
  color: white
  font-weight: 700
  display: inline-block
  margin-top: 0.5rem

.highlight__navigator
  display: none
  background-color: $color-against-primary-translucent
  color: $color-against-primary
  border-radius: 3rem
  padding: 1rem 1.5rem
  
  span + svg, svg + span
    margin-left: 1rem
  svg
    transform: scale(1.5)

  @include from($tablet-landscape)
    display: inline-block

.dot
  display: inline-block
  width: 1rem
  height: 1rem
  background-color: $color-against-primary
  border-radius: 50%
  margin-right: 1rem

.dot + .dot
  background-color: transparentize(white, 0.8)
  
.highlight__navigator + .highlight__navigator
  margin-left: 0.5rem

.latest
  background-color: $color-accent-dark
  border-top: 1px solid $color-layout-border-inverted

.latest__nav
  display: flex
  align-items: center
  justify-content: space-between
  
.latest__label
  color: white
  margin: 1.5rem
  @include from($tablet-landscape)
    margin-left: auto
    margin-right: auto
    font-size: 2rem

.latest__actionGroup
  display: flex
  align-items: center
  margin-right: 1.5rem
  @include from($tablet-landscape)
    display: none

.latest__action
  width: 2.5rem
  height: 2.5rem
  display: flex
  align-items: center
  font-size: 1.5rem
  justify-content: center
  color: white
  background-color: $color-against-primary-translucent
  border-radius: 3rem

.latest__action + .latest__action
  margin-left: 0.5rem

.latest__items
  @include from($tablet-landscape)
    display: flex
    justify-content: center

.latest__item
  padding-left: 2rem
  padding-right: 2rem
  @include from($tablet-landscape)
    max-width: 22.5rem

.latest__item + .latest__item
  @include from($tablet-landscape)
    border-left: 2px solid $color-layout-border-inverted
    

.latest__banner
  background: url('https://picsum.photos/700')
  border-radius: 0.5rem
  background-size: cover
  height: 10rem

.latest__title
  color: $color-against-primary
  margin-top: 0.5rem
.latest__bodyPreview
  margin-top: 0.5rem
  color: $color-against-primary
  opacity: 0.7

.latest__seeAll
  padding: 0.5rem 1.5rem
  margin-left: auto
  display: inline-block
  background-color: $color-against-primary
  color: $color-primary
  width: initial
  margin-top: 1rem
  margin-bottom: 1.5rem
  border-radius: 3rem
  font-weight: bold
.events
  padding-top: 2rem
  padding-bottom: 2rem
.events__nav
  display: flex
  align-items: center
  justify-content: space-between
  
.events__label
  color: $color-primary
  margin: 1.5rem
  @include from($tablet-landscape)
    margin-left: auto
    margin-right: auto
    font-size: 2rem


.events__actionGroup
  display: flex
  align-items: center
  margin-right: 1.5rem
  @include from($tablet-landscape)
    display: none

.events__action
  width: 2.5rem
  height: 2.5rem
  display: flex
  align-items: center
  font-size: 1.5rem
  justify-content: center
  color: $color-primary
  background-color: $color-primary-translucent
  border-radius: 3rem

.events__action + .events__action
  margin-left: 0.5rem

.events__items
  @include from($tablet-landscape)
    display: flex
    justify-content: center

.event
  padding-left: 2rem
  padding-right: 2rem
  @include from($tablet-landscape)
    max-width: 22.5rem

div.event__banner
  background: url('https://picsum.photos/700')
  border-radius: 0.5rem
  background-size: cover
  height: 10rem
  margin-bottom: 0.5rem

.event__header
  display: flex
  justify-content: space-between

.event__mainDetail
  width: 80%

.event__location
  color: $color-text-unactive

.event__date
  font-weight: 700
  color: $color-primary

.events__seeAll
  padding: 0.5rem 1.5rem
  margin-left: auto
  display: inline-block
  background-color: $color-primary
  color: $color-against-primary
  width: initial
  margin-top: 1rem
  margin-bottom: 1.5rem
  border-radius: 3rem
  font-weight: bold

.footer
  height: 20rem
  background-color: #444444
  


</style>


<script>
export default {
	name: "home",
	data() {
    return {}
  },
  methods: {
  }
};
</script>

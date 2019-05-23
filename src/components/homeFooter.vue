<template lang="pug">
  
  #homeFooter
    layoutContainer
      .footer_wrapper
        div
          div CNAP Core Council of the
          div Philippines, Inc.
          br
          div &copy; 2019
          div All rights reserved
        div
          nav.footer_nav
            ul.footer_links.footer_links--primary
              li: a(href="/") Home
              li: a(href="/events") Events
              li: a(href="/programs") Programs
              li: a(href="/gallery") Gallery
            ul.footer_links.footer_links--secondary
              li: a(href="/contact") Contact
              li: a(href="/terms") Terms of Service
              li: a(href="/privacypolicy") Privacy Policy
        div
          h4.footer__header Follow us
          ul.footer_links
            li: a(href="https://www.facebook.com/NetAcadPH/" target="_blank")
              fa(:icon="['fab', 'facebook']")
              span &nbsp; Cisco Network Academy PH
            li: a(href="https://www.facebook.com/groups/CiscoPHNetacad/" target="_blank")
              fa(:icon="['fab', 'facebook']")
              span &nbsp; Administrators and Instructors Group

</template>

<script>
import layoutContainer from '@/components/layoutContainer'
import companyLogo from "@/components/companyLogo";
export default {
  components: {
    layoutContainer,
    companyLogo
  },
}
</script>


<style lang="sass" scoped>
@import '../assets/style'

#homeFooter
  background-color: $color-accent-dark
  color: white

.footer_wrapper
  display: grid
  grid-template-columns: 1fr

  @include from($tablet-portrait)
    grid-template-columns: 1fr 1fr 1fr
    padding: $pad*2 0

  > div
    padding: $pad*2 0
    @include from($tablet-portrait)
      padding: 0 $pad*2

  > div + div
    @include to($phone)
      border-top: 1px solid $color-accent
    @include from($tablet-portrait)
      border-left: 1px solid $color-accent

.footer_nav
  display: flex
  flex-direction: column

  @include from($desktop)
    flex-direction: row

.footer__header
  color: $color-accent
  text-transform: uppercase

.footer_links
  list-style: none
  margin-right: $pad*2

.footer_links a
  padding: 0.35rem 0
  display: inline-block
  font-weight: 500
  text-wrap: nowrap
  text-decoration: none
  color: inherit
  
.footer_links--primary
  font-weight: 500

.footer_links--secondary
  color: $color-accent
</style>


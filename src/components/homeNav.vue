<template lang="pug">
  #homeNav
    headroom(style='width: 100%' :speed="200")
      header
        layout-container.homeNav__innerWrapper(extendboth)
          .homeNav__actionGroup
            .homeNav__action.homeNav__bars(@click="sidebarShown = true")
              fa(icon="bars")
            company-logo
          .homeNav__actionGroup
            ul.homeNav__links
              li(v-for="link in links")
                a.homeNav__link(:href="link.link") {{ link.name }}
                  fa(icon="angle-down" v-if="link.child.length > 0")
                ul.homeNav__sublinks(v-if="link.child.length > 0")
                  li(v-for="sublink in link.child")
                    a.homeNav__sublink(:href="sublink.link")  {{ sublink.name }}
              

            .homeNav__action
              fa(icon="search" @click="search")
            .homeNav__action
              fa(icon="ellipsis-v")
          

    
    div.homeNav__sidebarCover(v-if="sidebarShown" @click="sidebarShown = false")
    transition(name="drawer")
      aside.homeSidebar(v-if="sidebarShown")
        ul.homeSidebar__links
            li(v-for="link in links")
              a.homeSidebar__link(:href="link.child.length > 0 ? '#!' : link.link") {{ link.name }}
                fa(icon="angle-down" v-if="link.child.length > 0")
              ul.homeSidebar__sublinks(v-if="link.child.length > 0")
                li(v-for="sublink in link.child")
                  a.homeSidebar__sublink(:href="sublink.link")  {{ sublink.name }}
</template>

<style lang="sass" scoped>
@import '../assets/style'

#homeNav
  z-index: 10
  background-color: $color-primary
  // position: sticky
  // top: 0
  
    

header
  background-color: $color-primary
  border-bottom: 1px solid $color-layout-border-inverted
  @include from($tablet-landscape)
    height: 6rem
    display: flex

.homeNav__innerWrapper
  display: flex
  align-items: center
  justify-content: space-between

.homeNav__actionGroup
  display: flex
  align-items: center

.homeNav__links
  list-style: none
  padding: none
  display: flex

  @include to($tablet-portrait)
    display: none

.homeNav__sublinks
  list-style: none
  border-radius: 1rem
  padding: 0.5rem 0rem
  opacity: 0
  pointer-events: none
  transition: 0.2s opacity
  position: absolute
  background-color: $color-against-primary


.homeNav__link:hover + .homeNav__sublinks
  opacity: 1
  pointer-events: initial

.homeNav__link
  padding-left: $pad
  padding-right: $pad
  height: 3rem
  display: inline-block
  display: flex
  align-items: center
  border-radius: 2rem
  color: $color-against-primary
  text-decoration: none
  @include actionable-primary

  svg
    margin-left: 0.5rem
  
.homeNav__sublinks:hover
  opacity: 1
  pointer-events: initial

.homeNav__sublink
  text-decoration: none
  padding: 0.5rem 1rem
  display: inline-block
  width: 100%
  color: $color-primary

  &:hover
    background-color: $color-primary-translucent

.homeNav__action
  color: $color-against-primary
  padding: $pad
  width: 3rem
  margin: 0.5rem
  margin-right: 0
  height: 3rem
  display: flex
  align-items: center
  justify-content: center
  border-radius: 50%
  @include actionable-primary

.homeNav__action + .homeNav__action
  margin-left: 0

.homeNav__action:last-child
  margin-right: 0.5rem

.homeNav__bars
  @include from($tablet-landscape)
    display: none

.homeNav__sidebarCover
  width: 100%
  height: 100%
  background-color: #00000077
  position: fixed
  top: 0
  left: 0
  z-index: 10000

  @include from($tablet-landscape)
    display: none

.homeSidebar
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

.homeSidebar__links
  margin: 0.5rem 0

.homeSidebar__link
  padding: 0.75rem 1.5rem
  display: block
  text-decoration: none
  color: $color-primary
  font-weight: bold
  transition: 0.2s background-color
  &:hover
    background-color: $color-primary-translucent

  svg
    margin-left: 0.5rem

.homeSidebar__link:focus + .homeSidebar__sublinks
  max-height: 15rem
  

.homeSidebar__sublinks
  height: 100%
  max-height: 0
  transition: 0.3s max-height
  overflow: hidden

.homeSidebar__sublink
  padding: 0.75rem 1.5rem 0.5rem 2rem
  display: block
  text-decoration: none
  color: $color-primary
  transition: 0.2s background-color
  &:hover
    background-color: $color-primary-translucent
</style>


<script>
import { headroom } from 'vue-headroom'
 
import layoutContainer from "@/components/layoutContainer";
import companyLogo from "@/components/companyLogo";
export default {
	components: {
		layoutContainer,
    companyLogo,
    headroom
  },
  methods:{
    search(){
      alert('Not yet available')
    }
  },
	data() {
		return {
      sidebarShown: false,
			links: [
				{
					name: "Home",
					link: "/home",
					child: []
				},
				{
					name: "Events",
					link: "/events",
					child: []
				},
				{
					name: "Programs",
					link: "/#!",
					child: [
						{
							name: "Women Rock IT",
							link: "/programs/WomenRockIT",
							child: []
						},
						{
							name: "Find Yourself in the Future",
							link: "/programs/FindYourselfintheFuture",
							child: []
						},
						{
							name: "NetAcad Talent Bridge",
							link: "/programs/NetAcadTalentBridge",
							child: []
						},
						{
							name: "CyberSecurity Student Competition",
							link: "/programs/CyberSecurityStudentCompetition",
							child: []
						}
					]
				},
				{
					name: "Gallery",
					link: "/gallery",
					child: []
				},
				{
					name: "Resources",
					link: "/resources",
					child: []
				}
			]
		};
	}
};
</script>


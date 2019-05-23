<template lang="pug">
  router-link#companyLogo(to="/")
    div
      img.logo(src="/images/logo-white.png")
    div.text
      div CNAP Core Council
      div of the Philippines
</template>

<style lang="sass" scoped>
@import '../assets/style'

#companyLogo
  display: flex
  align-items: center
  text-decoration: none
  
.logo
  width: 5rem
  margin-left: $pad

.text
  margin-left: $pad
  padding-left: $pad
  color: $color-against-primary
  border-left: 1px solid $color-against-primary
  

</style>



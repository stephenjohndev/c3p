<template lang="pug">
  section.section
    b-field(grouped)  
      b-field(label="Add New Editor" expanded)
        b-field
          b-input(type="email" placeholder="e.g. johnsmith@email.com" expanded v-model="email")
          .control
            b-button(type="is-primary" :disabled="!email"  @click="$store.dispatch('addUser', email)")
              fa(icon="plus")
              span &nbsp; Add Editor

    br
      
    b-table(:data="$store.state.users.users")
      template(slot-scope="props")
        b-table-column(field="email" label="Email") {{ props.row.email }}
        b-table-column(label="Action"): b-button(type="is-danger" @click="$store.dispatch('removeUser',props.row.id)") Remove
</template>

<script>
export default {
  data(){
    return{
      email: ""
    }
  },
  mounted(){
    this.$store.dispatch('loadUsers')
  }
}
</script>

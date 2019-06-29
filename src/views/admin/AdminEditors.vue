<template lang="pug">
  section.section#AdminEditors
    b-table(:data="users")
      template(slot-scope="props")
        b-table-column(field="name" label="Name") {{ props.row.name }}
        b-table-column(field="email" label="Email") {{ props.row.email }}
        b-table-column(label="Action"): b-button(type="is-danger") Remove
</template>

<script>
export default {
  data(){
    return{
      users: [
        {
          userid: 1,
          name: 'John Smith',
          email: 'johnsmith@email.com'
        },
        {
          userid: 2,
          name: 'Peter Pan',
          email: 'peterpan@email.com'
        }
      ]
    }
  }
}
</script>

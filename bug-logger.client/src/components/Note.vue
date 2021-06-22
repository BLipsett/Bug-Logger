<template>
  <div class="col-md-12 border">
    <div class="row align-content-center">
      <div class="col-md-4 d-flex align-content-center">
        <img class="user-pic mr-2" :src="note.creator.picture">
        <p>{{ note.creator.name }}</p><p />
      </div>
      <div class="col-md-4">
        <p>
          {{ note.body }}
        </p>
      </div>
      <div class="col-md-4 ml-auto">
        <button v-if="note.creator.id === state.account.id" class="ml-auto" @click="deleteNote(note.id)">
          Delete
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { reactive } from '@vue/reactivity'
import { notesService } from '../services/NotesService'
import { computed } from '@vue/runtime-core'
import { AppState } from '../AppState'
export default {
  props: {
    note: { type: Object, required: true }
  },
  setup() {
    const state = reactive({
      account: computed(() => AppState.account)
    })
    return {
      state,
      async deleteNote(id) {
        if (window.confirm('Do you want to delete this note?')) { await notesService.deleteNote(id) }
      }
    }
  }

}
</script>

<style scoped>
.user-pic{
  height: 2rem;
  width: 2rem;
  border-radius: 50%;
}

</style>

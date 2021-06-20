<template>
  <div class="container">
    <div class="row">
      <div class="col-md-6">
        <h3>title</h3>
        <div v-if="activeBug">
          <p>{{ activeBug.title }}</p>
          <h3>Reported by:</h3>
          <p>{{ activeBug.creator.name }}</p>
        </div>
        <div class="col-md-6">
          <p v-if="activeBug.closed" class="closed">
            Closed
          </p>
          <p v-else class="open">
            Open
          </p>
        </div>
        <div class="col-md-12 border">
          <p>{{ activeBug.description }}</p>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-md-12">
        <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#noteModal">
          Add Note
        </button>
        <h2>Notes</h2>
        <Note v-for="n in state.notes" :key="n.id" :note="n" />
      </div>
    </div>
  </div>
  <CreateNoteModal />
</template>

<script>
import { reactive } from '@vue/reactivity'
import { AppState } from '../AppState'
import { computed, onMounted } from '@vue/runtime-core'
import { bugsService } from '../services/BugsService'
import { useRoute } from 'vue-router'
import Notification from '../utils/Notification'

export default {
  props: {
    // activeBug: { type: Object, required: true }
  },
  setup() {
    const route = useRoute()
    const state = reactive({
      activeBug: computed(() => AppState.activeBug),
      notes: computed(() => AppState.notes)
    })
    onMounted(async() => {
      try {
        await bugsService.getBug(route.params.id)
        await bugsService.getNotes(route.params.id)
      } catch (error) {
        Notification.toast('uh oh')
      }
    }
    )

    return {
      state,
      activeBug: computed(() => AppState.activeBug)

    }
  }

}
</script>

<style>

</style>

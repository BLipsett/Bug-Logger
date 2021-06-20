<template>
  <div class="container">
    <div class="row">
      <div class="col-md-6">
        <h2>title</h2>
        <p class="bug-title">
          {{ activeBug.title }}
        </p>
        <h3>Reported by:</h3>
        <p>{{ activeBug.creator.name }}</p>
      </div>
      <div class="col-md-6">
        <button @click="closeBug(activeBug.id)">
          CLOSE
        </button>
        <p v-if="activeBug.closed" class="closed">
          Closed
        </p>
        <p v-else class="open">
          Open
        </p>
      </div>
      <div class="col-md-12 bug-description">
        <p>{{ activeBug.description }}</p>
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
      activeBug: computed(() => AppState.activeBug),
      async closeBug(id) {
        state.activeBug.closed = true
        await bugsService.closeBug(id, state.activeBug)
      }

    }
  }

}
</script>

<style scoped>
.bug-title {
  font-size: 3rem;
}

.closed {
  color: red;

}
.open {
  color: green
}

.bug-description {
  border: 1px solid black;
  height: 20vh;
}

</style>

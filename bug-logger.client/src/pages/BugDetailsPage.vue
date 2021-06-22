<template>
  <div class="container">
    <div v-if="activeBug" class="row">
      <div class="col-md-6">
        <h2>title</h2>
        <p class="bug-title">
          {{ activeBug.title }}
        </p>
        <h3>Reported by:</h3>
        <img class="user-pic" :src="activeBug.creator.picture">
        <p>{{ activeBug.creator.name }}</p>
      </div>
      <div class="col-md-6">
        <button @click="closeBug(activeBug.id)">
          CLOSE
        </button>
        <p v-if="activeBug.closed === true" class="closed">
          Closed
        </p>
        <p v-else class="open">
          Open
        </p>
        <button v-if="activeBug.creatorId === state.account.id" @click="showEditForm = !showEditForm">
          edit bug
        </button>
        <form @submit.prevent="editBug(activeBug.id)" v-if="showEditForm">
          <textarea class="form-control" placeholder="New Bug Title" v-model="newBug.title"></textarea>
          <textarea class="form-control" placeholder="New Bug description" v-model="newBug.description"></textarea>

          <button type="submit">
            edit title
          </button>
        </form>
      </div>
      <div class="col-md-12 bug-description">
        <p>{{ activeBug.description }}</p>
      </div>
    </div>
    <div class="row">
      <div v-if="activeBug" class="col-md-12">
        <button v-if="activeBug.closed === false" type="button" class="btn btn-primary" data-toggle="modal" data-target="#noteModal">
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
import { reactive, ref } from '@vue/reactivity'
import { AppState } from '../AppState'
import { computed, watchEffect } from '@vue/runtime-core'
import { bugsService } from '../services/BugsService'
import { useRoute } from 'vue-router'
import { logger } from '../utils/Logger'

export default {

  setup() {
    const route = useRoute()
    const state = reactive({
      activeBug: computed(() => AppState.activeBug),
      notes: computed(() => AppState.notes),
      account: computed(() => AppState.account)

    })
    const newBug = ref({})
    let showEditForm = ref(false)
    watchEffect(async() => {
      try {
        await bugsService.getBug(route.params.id)
        await bugsService.getNotes(route.params.id)
      } catch (error) {
        logger.log(error)
      }
    }
    )

    return {
      state,
      newBug,
      showEditForm,
      activeBug: computed(() => AppState.activeBug),
      async closeBug(id) {
        if (window.confirm('Do you want to close this bug?')) {
          state.activeBug.closed = true
          await bugsService.closeBug(id, state.activeBug)
        }
      },

      async editBug(id) {
        try {
          bugsService.editBug(id, newBug.value)
          newBug.value = {}
          showEditForm = ref(false)
        } catch (error) {
          logger.log(error)
        }
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

.user-pic{
  height: 4rem;
  width: 4rem;
  border-radius: 50%;
}

</style>

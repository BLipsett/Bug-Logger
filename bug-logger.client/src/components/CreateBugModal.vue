<template>
  <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">
            Report-A-Bug
          </h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <form @submit.prevent="createBug">
            <div class="form-group">
              <label for="bug-title">Bug Title</label>
              <input v-model="state.bugInfo.title" type="text" class="form-control" id="bug-title" placeholder="title">
            </div>
            <div class="form-group">
              <label for="bug-description">Bug Description</label>
              <textarea v-model="state.bugInfo.description" class="form-control" id="bug-description" rows="7"></textarea>
            </div>
            <button type="button" class="btn btn-secondary" data-dismiss="modal">
              Discard
            </button>
            <button type="submit" class="btn btn-primary">
              Add Bug
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { reactive } from '@vue/reactivity'
import Notification from '../utils/Notification'
import { bugsService } from '../services/BugsService'
import { router } from '../router'
import { computed } from '@vue/runtime-core'
import { AppState } from '../AppState'
import $ from 'jquery'
export default {
  setup() {
    const state = reactive({
      bugInfo: {},
      activeBug: computed(() => AppState.activeBug)
    })
    return {
      state,
      async createBug() {
        try {
          await bugsService.createBug(state.bugInfo)
          router.push({ name: 'BugDetails', params: { id: state.activeBug.id } })
          $('#exampleModal').modal('toggle')
          state.bugInfo = {}
        } catch (error) {
          Notification.toast(error)
        }
      }
    }
  }

}
</script>

<style>

</style>

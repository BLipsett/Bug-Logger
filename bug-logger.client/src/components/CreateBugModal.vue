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
              <label for="exampleFormControlInput1">Bug Title</label>
              <input v-model="state.bugInfo.title" type="text" class="form-control" id="exampleFormControlInput1" placeholder="title">
            </div>
            <div class="form-group">
              <label for="exampleFormControlTextarea1">Bug Description</label>
              <textarea v-model="state.bugInfo.description" class="form-control" id="exampleFormControlTextarea1" rows="7"></textarea>
            </div>

            <button type="button" class="btn btn-secondary" data-dismiss="modal">
              Discard
            </button>
            <button type="submit" class="btn btn-primary">
              Add Bug
            </button>
          </form>
        </div><div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
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
                    <label for="exampleFormControlInput1">Bug Title</label>
                    <input v-model="state.bugInfo.title" type="text" class="form-control" id="exampleFormControlInput1" placeholder="title">
                  </div>
                  <div class="form-group">
                    <label for="exampleFormControlTextarea1">Bug Description</label>
                    <textarea v-model="state.bugInfo.description" class="form-control" id="exampleFormControlTextarea1" rows="7"></textarea>
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
      </div>
    </div>
  </div>
</template>

<script>
import { reactive } from '@vue/reactivity'
import Notification from '../utils/Notification'
import { bugsService } from '../services/BugsService'
export default {
  setup() {
    const state = reactive({
      bugInfo: {}
    })
    return {
      state,
      async createBug() {
        try {
          await bugsService.createBug(state.bugInfo)
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

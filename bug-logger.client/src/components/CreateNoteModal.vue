<template>
  <div class="modal fade" id="noteModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">
            Add-A-Note
          </h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <form>
            <div class="form-group">
              <label for="exampleFormControlTextarea1">Note Description</label>
              <textarea v-model="state.noteInfo.body" class="form-control" id="exampleFormControlTextarea1" rows="7"></textarea>
            </div>

            <button type="button" class="btn btn-secondary" data-dismiss="modal">
              Discard
            </button>
            <button type="submit" class="btn btn-primary">
              Add Note
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { reactive } from '@vue/reactivity'
export default {
  setup() {
    const state = reactive({
      noteInfo: {}
    })
    return {
      state

    }
  }

}
</script>

<style>

</style>

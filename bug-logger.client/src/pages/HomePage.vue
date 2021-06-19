<template>
  <div class="container">
    <div class="row">
      <div class="col-md-3">
        <h1>Current Bugs</h1>
        <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#exampleModal">
          report bug
        </button>
        <CreateBugModal />
      </div>
      <div class="col-12">
        <div class="bug-box border shadow">
          <div class="row table-header">
            <div class="col-md-3">
              <p>Bug Title</p>
            </div>
            <div class="col-md-3">
              <p> Creator Name </p>
            </div>
            <div class="col-md-3">
              <p>Status</p>
            </div>
            <div class="col-md-3">
              <p>Date Created</p>
            </div>
          </div>
          <Bug v-for="b in bugs" :key="b.id" :bug="b" />
        </div>
        <div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed } from '@vue/runtime-core'
import { AppState } from '../AppState'
// import { onMounted } from '@vue/runtime-core'
// import { bugsService } from '../services/BugsService'
export default {
  setup() {
    // onMounted(async() => await bugsService.getBugs())
    return {
      bugs: computed(() => AppState.bugs)
    }
  }
}
</script>

<style scoped lang="scss">
.bug-box {
  height: 70vh;
}

.table-header {
  border-bottom: 2px solid black;
}
</style>

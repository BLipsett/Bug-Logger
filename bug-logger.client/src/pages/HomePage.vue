<template>
  <div class="container">
    <div class="row">
      <div class="col-md-3">
        <h1>Current Bugs</h1>
        <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#exampleModal">
          report bug
        </button>
      </div>
      <div class="col-md-3 ml-auto">
        <button @click="sortByOpen">
          Sort by open bugs
        </button>
        <button @click="sortByClosed">
          Sort by closed bugs
        </button>
      </div>
      <CreateBugModal />
      <div class="col-12">
        <div class="bug-box border shadow">
          <div class="row table-header">
            <div class="col-md-3">
              <p class="pl-2">
                Bug Title
              </p>
            </div>
            <div class="col-md-3">
              <p> Creator Name </p>
            </div>
            <div class="col-md-3">
              <p>Status</p>
            </div>
            <div class="col-md-3">
              <p>Last Modified</p>
            </div>
          </div>
          <Bug v-for="b in state.bugs" :key="b.id" :bug="b" />
        </div>
        <div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, reactive, watchEffect } from '@vue/runtime-core'
import { AppState } from '../AppState'
import { bugsService } from '../services/BugsService'
export default {
  setup() {
    const state = reactive({
      bugs: computed(() => AppState.bugs)

    })
    watchEffect(async() => await bugsService.getBugs())
    return {
      state,
      async sortByOpen() {
        state.bugs.sort(function(a, b) {
          return a.closed - b.closed
        })
      },
      async sortByClosed() {
        state.bugs.sort(function(a, b) {
          return b.closed - a.closed
        })
      }
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

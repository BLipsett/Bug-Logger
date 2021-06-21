<template>
  <div v-if="bugIndex % 2 == 0" class="light-bg">
    <router-link class="router-text"
                 :to="{name:'BugDetails', params: { id: bug.id }}"
                 :key="bug.id"
                 :active-bug="state.activeBug"
                 @click="setActiveBug(bug)"
    >
      <div class="row d-flex align-items-center bug-row">
        <div class="col-md-3">
          <h4>{{ bug.title }}</h4>
        </div>
        <div class="col-md-3 d-flex">
          <img class="user-pic" :src="bug.creator.picture">
          <p>
            {{ bug.creator.name }}
          </p>
        </div>
        <div class="col-md-3">
          <p v-if="bug.closed" class="closed">
            Closed
          </p>
          <p v-else class="open">
            Open
          </p>
        </div>
        <div class="col-md-3">
          <p>
            {{ posted }}
          </p>
        </div>
      </div>
    </router-link>
  </div>
  <div v-else>
    <router-link class="router-text"
                 :to="{name:'BugDetails', params: { id: bug.id }}"
                 :key="bug.id"
                 :active-bug="state.activeBug"
                 @click="setActiveBug(bug)"
    >
      <div class="row d-flex align-items-center bug-row">
        <div class="col-md-3 d-flex">
          <h4>{{ bug.title }}</h4>
        </div>
        <div class="col-md-3 d-flex">
          <img class="user-pic" :src="bug.creator.picture">

          <p>
            {{ bug.creator.name }}
          </p>
        </div>
        <div class="col-md-3">
          <p v-if="bug.closed" class="closed">
            Closed
          </p>
          <p v-else class="open">
            Open
          </p>
        </div>
        <div class="col-md-3">
          <p>
            {{ posted }}
          </p>
        </div>
      </div>
    </router-link>
  </div>
</template>

<script>
import moment from 'moment'
import { reactive } from '@vue/runtime-core'
import { AppState } from '../AppState'
// import { bugsService } from '../services/BugsService'
export default {
  props: {
    bug: { type: Object, required: true }
  },
  setup(props) {
    const state = reactive({
      bugs: AppState.bugs,
      activeBug: AppState.activeBug
    })
    const posted = moment(props.bug.updatedAt).format('MMM Do YY')
    const bugIndex = state.bugs.indexOf(props.bug)

    return {
      posted,
      state,
      bugIndex,
      async setActiveBug(bug) {
        // await bugsService.setActiveBug(props.bug.id)
        AppState.activeBug = bug
        console.log('click this?', AppState.activeBug)
      }

    }
  }

}
</script>

<style lang="scss" scoped>

.router-text {
  text-decoration: none;
  color: rgb(7, 7, 7);
}
.closed {
  color: red
}

.open {
  color: green
}

.bug-row {
  height: 5rem;
}

.light-bg {
  background-color: rgb(182, 182, 182);
}

.user-pic {
  height: 2rem;
  width: 2rem;
  border-radius: 50%;
  margin-right: 5px;
}

</style>

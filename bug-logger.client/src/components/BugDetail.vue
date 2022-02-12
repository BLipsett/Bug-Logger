<template>
  <h3>Bug detail</h3>
  <div class="col-md-6">
    <h3>title</h3>
    <p>{{ state.activeBug.title }}</p>
    <h3>Reported by:</h3>
    <p>{{ state.activeBug.creator.name }}</p>
  </div>
  <div class="col-md-6">
    <p v-if="state.activeBug.closed" class="closed">
      Closed
    </p>
    <p v-else class="open">
      Open
    </p>
  </div>
  <div class="col-lg-12 border">
    <p>{{ state.activeBug.description }}</p>
  </div>
</template>

<script>
export default {
  props: {
    bugDetail: { type: Object, required: true }
  }

}
</script>

<style>

</style>

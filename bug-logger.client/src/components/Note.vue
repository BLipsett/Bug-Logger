<template>
  <div class="col-md-2">
    <b>
      <h3>notes</h3>
    </b>
  </div>
  <div class="col-md-12 my-3 border">
    <p>
      {{ note.body }}
    </p>
  </div>
</template>

<script>
export default {
  props: {
    note: { type: Object, required: true }
  }

}
</script>

<style>

</style>

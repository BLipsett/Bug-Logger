<template>
  <div class="col-md-12 border">
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

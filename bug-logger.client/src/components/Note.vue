<template>
  <div class="col-md-12 border">
    <div class="row align-content-center">
      <div class="col-md-4 d-flex align-content-center">
        <img class="user-pic mr-2" :src="note.creator.picture">
        <p>{{ note.creator.name }}</p><p />
      </div>
      <div class="col-md-4">
        <p>
          {{ note.body }}
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    note: { type: Object, required: true }
  }

}
</script>

<style scoped>
.user-pic{
  height: 2rem;
  width: 2rem;
  border-radius: 50%;
}

</style>

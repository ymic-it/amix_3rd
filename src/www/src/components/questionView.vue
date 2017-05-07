<template>
<div>
<h3>{{ getQuestion.main.text }}</h3>
<div class="row">
  <div class="col-md-6" @click="$store.commit('changeModal', 'true')">OK</div>
  <div class="col-md-6" @click="$store.commit('changeModal', 'false')">NG</div>
</div>
</div>
</template>
<script>
export default{
  computed: {
    getQuestion () {
      return this.$store.state.question
    },
    showModal () {
      return this.$store.state.showModal
    }
  }
}
</script>

<template>
<div>
<div class="col-md-10">
  <h2>Question:</h2>
  <h3>{{ getQuestion.main.text }}</h3>
</div>
<div class="row">
  <div class="col-xs-6" @click="$store.commit('changeModal', 'true'), $store.commit('setAnswer', 'true')"><img  class="img-responsive" src="/static/T.png"></div>
  <div class="col-xs-6" @click="$store.commit('changeModal', 'false'), $store.commit('setAnswer', 'false')"><img src="/static/F.png"></div>
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

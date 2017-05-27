<template>
<div>
  <div v-if="getQuestion.status === '200'" >
    <div class="col-md-10">
      <h2>Question:</h2>
      <h3>{{ getQuestion.main.text }}</h3>
    </div>
    <div class="row">
      <div class="col-xs-6" @click="$store.commit('changeModal', 'true'), $store.commit('setAnswer', 'true')"><img  class="img-responsive" src="/static/T.png"></div>
      <div class="col-xs-6" @click="$store.commit('changeModal', 'false'), $store.commit('setAnswer', 'false')"><img src="/static/F.png"></div>
    </div>
  </div>
  <div v-else>
  <p class=text>
  {{ getQuestion }}
  </p>
  <div class="container bt-center">
    <router-link class="mdl-navigation__link" to="/select">
      <button class="bt-center mdl-button--raised mdl-button--colored mdl-button mdl-js-button mdl-js-ripple-effect mdl-button--primary" >戻る</button>
      </router-link>
  </div>
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
<style>
.text {
  font-size: 1.9rem;
}
</style>

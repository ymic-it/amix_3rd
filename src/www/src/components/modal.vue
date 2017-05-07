<template>
<div>
    <div class="modal" v-bind:class="{show: $store.getters.modalState}">
    <div class="modal-header">
    <h3 v-show="$store.getters.result == true">正解</h3>
    <h3 v-show="$store.getters.result == false">不正解</h3>
  </div>

            <div class="body">
            <h3>問題</h3>
            <div id=app>{{$store.getters.question.main.text}}</div>
            <h3>解説</h3>
            {{$store.getters.question.main.commentary}}

          </div>
    <div class="modal-footer">
        問題番号: {{$store.getters.question.main.id}}
        問題ジャンル: {{$store.getters.question.main.genre}}
        問題出題年: {{$store.getters.question.main.sourceNo}}
        <button class="modal-default-button" @click="$store.commit('changeModal'),$store.commit('increment')">
          次へ
        </button>
    </div>
  </div>

  <div class="bg" v-bind:class="{show: $store.getters.modalState}" v-on:click="$store.commit('changeModal'),$store.commit('increment')"></div>
</div>

</template>
<script>
export default{
  computed: {
    count () {
      return this.$store.getters.question
    }
  }
}
</script>
<style scoped>
.mdl-layout__header-row {
  padding: 0 16px;
}
i {
  padding-right: 16px
}
</style>

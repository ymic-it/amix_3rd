<template>
<div>
    <div class="modal" v-bind:class="{show: $store.getters.modalState}">
    <div class="modal-header">
      <h3>回答</h3>
  </div>

            <div class="body">
              <div v-if="Boolean($store.getters.result)">
              <img class="img-responsive" src="/static/t-msg.png" />
              </div>
              <div v-else>
              <img class="img-responsive" src="/static/f-msg.png" />
              </div>

              <div v-if="! Boolean($store.getters.result)" >
                <div class="text-center" v-if="$store.getters.answer">
                    <p>あなたの正答は<img class="one-line img-responsive-answer" src="/static/T.png" />でした</p>
                </div>
                <div class="text-center" v-else>
                  <p>あなたの正答は<img class="one-line img-responsive-answer" src="/static/F.png" />でした</P>
                </div>
            </div>

            <h3>問題</h3>
            <div class="modal-text" id=app>{{$store.getters.question.main.text}}</div>
            <h3>解説</h3>
            <div class="modal-text">
            {{$store.getters.question.main.commentary}}
            </div>

          </div>
    <div class="modal-footer">
        問題番号: {{$store.getters.question.main.id}}
        問題ジャンル: {{$store.getters.question.main.genre}}
        問題出題年: {{$store.getters.question.main.sourceNo}}
    </div>
    <div class="container bt-center">
    <button class="bt-center mdl-button--raised mdl-button--colored mdl-button mdl-js-button mdl-js-ripple-effect mdl-button--primary" @click="$store.commit('changeModal'),$store.commit('increment')">次へ</button>
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
    },
    getAnswer () {
      console.log(this.$store.state.answer)
      return this.$store.state.answer
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

.bt-center {
    text-align:center;
    font-size: 1.4em;
    width: 70%;
    height: 35%

}

.modal-text{
line-height: 1.5;
font-size: 40px;
}
.img-responsive {
  display: block;
  height: auto;
  max-width: 3o%;
  text-align:center;
  margin: auto;
}
.img-responsive-answer {
  display: block;
  height: 30px;
  max-width: 30%;
  text-align:center;
  margin: auto;
}
.one-line {
  vertical-align: middle;
  display: inline;
}
</style>

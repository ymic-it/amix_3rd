import Vue from 'vue'
import Vuex from 'vuex'
import VueRouter from 'vue-router'
import modal from './components/modal'
import questionView from './components/questionView'
import 'babel-polyfill'

Vue.use(Vuex)
Vue.use(VueRouter)
// Counter コンポーネントをつくってみましょう

const store = new Vuex.Store({
  state: {
    question: {main: {text: ''}},
    showModal: false,
    result: false
  },
  getters: {
    modalState: state => {
      return state.showModal
    },
    question: state => {
      return state.question
    },
    result: state => {
      return state.result
    }
  },
  mutations: {
    increment (state, payload) {
      fetch('http://amix.api.ymic-it.com/question/rand/0/0')
          .then(res => res.json()).then(res => (
            state.question = res))
    },
    changeModal (state, answer) {
      if (Boolean(answer) === Boolean(state.question.main.correct)) {
        state.result = true
      } else {
        state.result = false
      }
      state.showModal = !state.showModal
    }
  },
  actions: {
    increment (context) {
      context.commit('increment')
    },
    changeModal (context) {
      context.commit('changeModal')
    }
  }
})

var main = Vue.component('app', {
  store,
  components: { questionView, modal },
  template: `
    <div class="app">
    <questionView></questionView>
    <modal></modal>
    </div>
  `
})

export default {
  components: {
    modal,
    questionView
  }
}

Vue.component('modal', {
  template: '#modal-template'
})

Vue.component('questionView', {
  template: '#question-view-template'
})

window.store = store

const Bar = { template: '<div>bar</div>' }

// 2. ルートをいくつか定義します
// 各ルートは 1 つのコンポーネントとマッピングされる必要があります。
// このコンポーネントは実際の Vue.extend()、
// またはコンポーネントオプションのオブジェクトでも構いません。
// ネストされたルートに関しては後で説明します
const routes = [
  { path: '/main', component: main },
  { path: '/bar', component: Bar }
]

// 3. ルーターインスタンスを作成して、ルートオプションを渡します
// 追加のオプションをここで指定できますが、
// この例ではシンプルにしましょう
const router = new VueRouter({
  routes // routes: routes の短縮表記
})

// 4. root となるインスタンスを作成してマウントします
// アプリケーション全体がルーターを認知できるように、
// ルーターをインジェクトすることを忘れないでください。
var app = new Vue({
  router
}).$mount('#app')

window.app = app
store.commit('increment')

import Vue from 'vue'
import Vuex from 'vuex'
import VueRouter from 'vue-router'
import modal from './components/modal'
import questionSelect from './components/questionSelect'
import questionView from './components/questionView'
import 'babel-polyfill'

Vue.use(Vuex)
Vue.use(VueRouter)
// Counter コンポーネントをつくってみましょう

const store = new Vuex.Store({
  state: {
    question: {main: {text: ''}},
    showModal: false,
    result: false,
    questionSelect: {genre: null, source: null},
    questionList: {},
    isActive: false,
    sourceList: []
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
    },
    questionSelect: state => {
      console.log(state.questionSelect)
      if (state.questionSelect == null) {
        var array = {genre: [-1], source: [-1]}
        return array
      }
      return state.questionSelect
    },
    questionList: state => {
      return state.questionList
    },
    sourceList: state => {
      return state.sourceList
    }
  },
  mutations: {
    increment (state, payload) {
      var url = 'http://amix.api.ymic-it.com/question/rand/a?/b?'
      var selectGenreOption = state.questionSelect.genre
      var selectSourceOption = state.questionSelect.source
      if (selectGenreOption == null || selectGenreOption === undefined) {
        selectGenreOption = [0]
      }
      if (selectSourceOption == null || selectSourceOption === undefined) {
        selectSourceOption = [0]
      }
      url = url.replace('a?', randAry(selectGenreOption))
      url = url.replace('b?', randAry(selectSourceOption))
      fetch(url)
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
    },
    getGenre (state) {
      fetch('http://amix.api.ymic-it.com/genre/list').then(res => res.json()).then(res => (
            state.questionList = res))
    },
    selectGenre (state, id) {
      if (state.questionSelect.genre == null) {
        state.questionSelect.genre = []
      }
      if (state.questionSelect.genre.indexOf(id) === -1) {
        state.questionSelect.genre.push(id)
      } else {
        state.questionSelect.genre = state.questionSelect.genre.filter(function (val) { return val !== id }).filter(function (val) { return val !== 0 })
      }
      console.log(state.questionSelect.genre)
    },
    selectSource (state, id) {
      if (state.questionSelect.source == null) {
        state.questionSelect.source = []
      }
      if (state.questionSelect.source.indexOf(id) === -1) {
        state.questionSelect.source.push(id)
      } else {
        state.questionSelect.source = state.questionSelect.source.filter(function (val) { return val !== id }).filter(function (val) { return val !== 0 })
      }
      console.log(state.questionSelect.source)
    },
    getSource (state) {
      fetch('http://amix.api.ymic-it.com/source/list').then(res => res.json()).then(res => (
            state.sourceList = res))
    }
  },
  actions: {
    increment (context) {
      context.commit('increment')
    },
    changeModal (context) {
      context.commit('changeModal')
    },
    selectGenre (context) {
      context.commit('selectGenre')
    },
    selectSource (context) {
      context.commit('selectSource')
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

var select = Vue.component('app', {
  store,
  components: { questionSelect },
  template: `
    <div class="app">
    <questionSelect></questionSelect>
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
  { path: '/select', component: select },
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
console.log(store.state.questionList.main)
function randAry (array) {
  var aryKeys = Object.keys(array)
  var index = aryKeys[Math.floor(Math.random() * aryKeys.length)]
  return array[index]
}
store.commit('getGenre')
store.commit('getSource')

store.commit('increment')

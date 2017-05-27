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
    sourceList: [],
    answer: false,
    now: 'index',
    exam: false,
    queueList: ['']
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
    },
    answer: state => {
      return state.answer
    },
    getNow: state => {
      return state.now
    },
    questionStatus: state => {
      return state.questionStatus
    },
    exam: state => {
      return state.exam
    }
  },
  mutations: {
    increment (state, payload) {
      var url = 'http://amix.api.ymic-it.com/question/rand/a?/b?'
      if (state.exam === false) {
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
        fetch(url, {mode: 'cors'})
            .then(res => res.json()).then(function (res) {
              if (res.status === '200') {
                state.question = res
              } else {
                if (selectSourceOption.length === 1) {
                  // 今後エラーコードが増えた際はここで分岐させる
                  state.question = res
                  state.question = `この回には○×問題がありません。過去問を自分で確認しよう！`
                  return false
                }
                store.commit('increment')
              }
            })
      } else {
        url = 'http://amix.api.localhost/question/?'
        var id = state.queueList.shift()
        if (state.queueList.length > 0) {
          url = url.replace('?', id)
          console.log(url)
          fetch(url, {mode: 'cors'})
              .then(res => res.json()).then(function (res) {
                state.question = res
                console.log(state.question)
              })
        } else {
          state.question = `すべての問題が終了しました`
          return false
        }
      }
    },
    changeModal (state, answer) {
      if (answer === String(Boolean(state.question.main.correct))) {
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
      store.commit('increment')
      store.commit('getQueueList')
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
      store.commit('increment')
      store.commit('getQueueList')
    },
    getSource (state) {
      fetch('http://amix.api.ymic-it.com/source/list').then(res => res.json()).then(res => (
            state.sourceList = res))
    },
    allGenreSelect (state) {
      state.questionSelect.genre = ['1', '2', '3']
      store.commit('getQueueList')
    },
    allSourceSelect (state) {
      state.questionSelect.source = state.sourceList.main
    },
    clearSelect (state) {
      state.questionSelect = {genre: [0], source: [0]}
    },
    setAnswer (state, answer) {
      state.answer = answer
    },
    setNow (state, now) {
      state.now = now
    },
    setExamMode (state, bool) {
      state.exam = bool
      console.log(state.exam)
    },
    getQueueList (state) {
      // 模擬試験モードなら試験内容のリストを取得する
      if (state.exam === true) {
        var url = 'http://amix.api.ymic-it.com/question/list/a?/b?'
        state.queueList = []

        var selectGenreOption = state.questionSelect.genre
        var selectSourceOption = state.questionSelect.source
        if (selectGenreOption == null || selectGenreOption === undefined) {
          selectGenreOption = [0]
        }
        if (selectSourceOption == null || selectSourceOption === undefined) {
          selectSourceOption = [0]
        }
        selectGenreOption.forEach(function (genreVal, genreIndex, genreArray) {
          selectSourceOption.forEach(function (sourceVal, souceIndex, sourceArray) {
            url = 'http://amix.api.ymic-it.com/question/list/a?/b?'
            url = url.replace('a?', genreVal)
            url = url.replace('b?', sourceVal)
            console.log(url)
            fetch(url, {mode: 'cors'})
                .then(res => res.json()).then(function (res) {
                  res.main.forEach(function (value, index, array) {
                    state.queueList[state.queueList.length] = value.id
                  })
                })
          })
        })
      }

      console.log(state.queueList)
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
      context.commit('getQueueList')
    },
    selectSource (context) {
      context.commit('selectSource')
      context.commit('getQueueList')
    },
    allSelect (context) {
      context.commit('allSourceSelect')
      context.commit('allGenreSelect')
      context.commit('getQueueList')
    }
  }
})

var main = Vue.component('app', {
  store,
  components: { questionView, modal },
  template: `
    <div class="app">
    <questionView></questionView>
    <modal  v-if="$store.getters.question.status === '200'"></modal>
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

var top = Vue.component('app', {
  store,
  template: `
    <div class="app">
    <div class="max">
    <div class="top"></div>
    </div>
    </div>
  `
})

Vue.component('modal', {
  template: '#modal-template'
})

Vue.component('questionView', {
  template: '#question-view-template'
})

window.store = store

// 2. ルートをいくつか定義します
// 各ルートは 1 つのコンポーネントとマッピングされる必要があります。
// このコンポーネントは実際の Vue.extend()、
// またはコンポーネントオプションのオブジェクトでも構いません。
// ネストされたルートに関しては後で説明します
const routes = [
  { path: '/', component: top },
  { path: '/main', component: main },
  { path: '/select', component: select }
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

export default {
  components: {
    modal,
    questionView,
    router
  }
}

window.app = app
function randAry (array) {
  var aryKeys = Object.keys(array)
  var index = aryKeys[Math.floor(Math.random() * aryKeys.length)]
  return array[index]
}
store.commit('getGenre')
store.commit('getSource')

store.commit('increment')

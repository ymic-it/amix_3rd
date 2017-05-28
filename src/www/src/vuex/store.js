import Vuex from 'vuex'
import Vue from 'vue'
import {
  INCREMENT
} from './mutation-types'

Vue.use(Vuex)
const question = {
  txt: '',
  answer: false,
  genre: '',
  souse: ''
}
const state = {
  keyword: '',
  gifs: [],
  txt: '',
  answer: false,
  genre: '',
  souse: '',
  coount: 0
}

function getGIFs (query) {
  const params = encodeURIComponent(query).replace(/%20/g, '+')
  return fetch('http://api.giphy.com/v1/gifs/search?q=' + params + '&api_key=dc6zaTOxFJmzC')
          .then(res => res.json())
}

function getQuestion () {
  return fetch('http://db.ymic-it.com/question/rand/0/0')
          .then(res => res.json())
}

const actions = {
  [CHANGE_KEYWORD] ({ commit }, keyword) {
    commit(CHANGE_KEYWORD, keyword)
  },

  [SEARCH] ({ commit, state }) {
    getGIFs(state.keyword)
      .then(data => {
        commit(SEARCH, data)
      })
  },

  [ANSWER] () {

  },

  [GET_QUESTION] ({commit}) {
    getQuestion()
      .then(data => {
        commit(GET_QUESTION, data)
      })
  },
  [INCREMENT] (state) {
    state.count++
  }
}
const getters = {
  gifs: state => state.gifs
}
const mutations = {
  [CHANGE_KEYWORD] (state, keyword) {
    state.keyword = keyword
  },
  [SEARCH] (state, gifs) {
    state.gifs = gifs.data
  },
  [ANSWER] () {

  },
  [GET_QUESTION] (state, data) {
    state.txt = data.text
  },
  [INCREMENT] (state) {
    state.count++
  }
}

export default new Vuex.Store({
  state,

})

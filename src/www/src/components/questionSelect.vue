<template>
<div class="row">
<div class="col-xs-6">
<h6>問題ジャンル選択</h6>
<table class="mdl-data-table mdl-js-data-table mdl-data-table mdl-shadow--2dp">
  <thead>
    <tr>
      <th class="mdl-data-table__cell--non-numeric">ID</th>
      <th>ジャンル</th>
    </tr>
  </thead>
  <tbody>
    <tr v-for="(genre, id) in questionList.main"  @click="$store.commit('selectGenre', id)"  v-bind:class="{ active: getGenre.indexOf(id) >= 0}">
      <td class="mdl-data-table__cell--non-numeric">{{ id }}</td>
      <td class="mdl-data-table__cell--non-numeric">{{ genre }}</td>
    </tr>
  </tbody>
</table>
</div>
<div class="col-xs-6">
<h6>問題出題年次選択</h6>
<table class="mdl-data-table mdl-js-data-table mdl-data-table mdl-shadow--2dp">
  <thead>
    <tr>
      <th class="mdl-data-table__cell--non-numeric">ID</th>
      <th>ジャンル</th>
    </tr>
  </thead>
  <tbody>
    <tr v-for="sourceNo in sourceList.main"  @click="$store.commit('selectSource', sourceNo)"  v-bind:class="{ active: getSource.indexOf(sourceNo) >= 0}">
      <td class="mdl-data-table__cell--non-numeric">{{ sourceNo }}</td>
      <td class="mdl-data-table__cell--non-numeric">第{{ sourceNo }}回</td>
    </tr>
  </tbody>
</table>
</div>
</div>
</template>
<script>
export default{
  computed: {
    questionList () {
      return this.$store.state.questionList
    },
    sourceList () {
      return this.$store.state.sourceList
    },
    getGenre () {
      if (this.$store.getters.questionSelect.genre == null) {
        var array = [-1]
        return array
      }
      return this.$store.getters.questionSelect.genre
    },
    isShow: function (id) {
      var data = this.getGenre
      if (data !== null && data.indexOf(id) === -1) {
        return true
      }
      return false
    },
    getSource () {
      if (this.$store.getters.questionSelect.source == null) {
        var array = [-1]
        return array
      }
      return this.$store.getters.questionSelect.source
    }
  }
}
</script>
<style scoped>
.active{
  background: #3ed37d;
  color: #fff;
}
</style>

const state = {
  aaa: 1,
  bbb: 'teststring'
}

const mutaions = {
  increment () {
    state.aaa++
  },
  change (state, options) {
    state.bbb = options.bbb
  }
}

const actions = {

}

export default {
  state,
  mutaions,
  actions
}

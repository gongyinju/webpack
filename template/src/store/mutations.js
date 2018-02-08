export default {
  increment (state, options) {
    if (options.hasOwnProperty('user')) {
      state.user = options.user
    }
  }
}

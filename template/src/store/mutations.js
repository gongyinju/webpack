export default {
  setCurrentUser (state, user) {
    if (user !== undefined) {
      state.currentUser = user
    }
  },
  setCurrentDealer (state, dealer) {
  	if (dealer !== undefined) {
  	  state.currentDealer = dealer
  	}
  },
  setCurrentCompany (state, company) {
  	if (company !== undefined) {
  	  state.currentCompany = company
  	}
  },
  setCurrentRole (state, role) {
  	if (role !== undefined) {
  	  state.currentRole = role
  	}
  },
  userLogin (state) {
  	state.isLogedIn = true
  },
  userLogout (state) {
  	state.isLogedIn = false
  },

  increment (state,user){
    state.user = user
  }
}

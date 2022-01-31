// import Vue from "vue";
// import Vuex from "vuex";

// Vue.use(Vuex);

const local = localStorage.getItem("_user_logged");
const user_logged = JSON.parse(local || "{}");
const userAccount = user_logged?.account || {};
delete user_logged.account;
const user = user_logged || {};

export const state = () => ({
  userAccount: userAccount,
  user: user,
  isLogged: local ? true : false,
});

export const mutations = {
  setUserAccount: (state, userAccount) => {
    state.userAccount = userAccount;
  },
  setUser: (state, user) => {
    state.user = user;
  },
  setIsLogged: (state, isLogged) => {
    state.isLogged = isLogged;
  },
};

// export const store = new Vuex.Store({
//   state: {
//     account: account,
//     user: user,
//     isLogged: local ? true : false,
//   },
//   mutations: {
//     setAccount: (state, account) => {
//       state.account = account;
//     },
//     setUser: (state, user) => {
//       state.user = user;
//     },
//     setIsLogged: (state, isLogged) => {
//       state.isLogged = isLogged;
//     },
//   },
//   getters: {
//     getAccount: (state) => state.account,
//     getUser: (state) => state.user,
//     getIsLogged: (state) => state.isLogged,
//   },
// });

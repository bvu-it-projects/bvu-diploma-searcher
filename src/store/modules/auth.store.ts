import firebase from 'firebase/app';

export default {
  namespaced: true,
  state: {
    returnUrl: '',
    user: null,
  },
  mutations: {
    updateReturnUrl(state: any, url: string) {
      state.returnUrl = url;
    },
    updateUserInfo(state: any, user: firebase.User) {
      state.user = user;
    },
  },
  actions: {
    getCurrentUser({ commit }: any) {
      return new Promise((resolve, reject) => {
        firebase.auth().onAuthStateChanged((user) => {
          commit('updateUserInfo', user);
          resolve(user);
        }, reject);
      });
    },
    login({ commit }: any): Promise<any> {
      return new Promise((resolve, reject) => {
        //
      });
    },
    logOut({ commit }: any) {
      firebase
        .auth()
        .signOut()
        .then(() => {
          commit('updateUserInfo', null);
        });
    },
  },
};

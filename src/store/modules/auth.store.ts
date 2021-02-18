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
        const provider = new firebase.auth.FacebookAuthProvider();
        provider.addScope('pages_messaging');

        // start login process
        commit('updateLoginInProcess', true);

        firebase
          .auth()
          .signInWithPopup(provider)
          .then((result: any) => {
            /** @type {firebase.auth.OAuthCredential} */
            const { credential }: any = result;

            // The signed-in user info.
            const { user } = result;

            // Update the user to the App
            commit('updateUserInfo', user);

            return resolve(null);

            // This gives you a Facebook Access Token. You can use it to access the Facebook API.
            const { accessToken } = credential;
          })
          .catch((error: any) => {
            // Delete the user from the App
            commit('updateUserInfo', null);

            // Handle Errors here.
            const errorCode = error.code;
            const errorMessage = error.message;

            // The email of the user's account used.
            const { email } = error;

            // The firebase.auth.AuthCredential type that was used.
            const { credential } = error;

            console.log(errorMessage);
          })
          .finally(() => {
            // Emit that the login process has completed
            commit('updateLoginInProcess', false);
          });
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

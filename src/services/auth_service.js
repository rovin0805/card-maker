import {
  getAuth,
  GithubAuthProvider,
  GoogleAuthProvider,
  signInWithPopup,
} from 'firebase/auth';

class AuthService {
  constructor() {
    this.firebaseAuth = getAuth();
    this.googleProvider = new GoogleAuthProvider();
    this.githubProvider = new GithubAuthProvider();
  }

  login(providerName) {
    const authProvider = this.getProvider(providerName);
    return signInWithPopup(this.firebaseAuth, authProvider);
  }

  logout() {
    this.firebaseAuth.signOut();
  }

  getProvider(providerName) {
    switch (providerName) {
      case 'Google':
        return this.googleProvider;
      case 'Github':
        return this.githubProvider;
      default:
        throw new Error(`noe supported provider : ${providerName}`);
    }
  }

  onnAuthChanged(onUserChanged) {
    this.firebaseAuth.onAuthStateChanged(user => onUserChanged(user));
  }
}

export default AuthService;

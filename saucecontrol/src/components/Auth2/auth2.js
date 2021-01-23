
class Auth2 {
    constructor() {
        console.log("made it");
        this.auth2 = null; // The Sign-In object.
        this.googleUser= null; // The current user.
        gapi.load('auth2', this.initSigninV2);
    }
    /**
     * Initializes Signin v2 and sets up listeners.
     */
    initSigninV2 = () => {
        
        this.auth2 = gapi.auth2.init({
            client_id: "680067494074-6prk74r4md0u4emgb4k5i2803t6i8pjf",
            scope: 'profile email'
        });
    
        // Listen for sign-in state changes.
        this.auth2.isSignedIn.listen(signinChanged);
    
        // Listen for changes to current user.
        this.auth2.currentUser.listen(userChanged);
    
        // Sign in the user if they are currently signed in.
        if (this.auth2.isSignedIn.get() == true) {
        this.auth2.signIn();
        }
    
        // Start with the current live values.
        this.refreshValues();
    };
    /**
 * Listener method for sign-out live value.
 *
 * @param {boolean} val the updated signed out state.
 */
    signinChanged =  (val) => {
    console.log('Signin state changed to ', val);
    document.getElementById('signed-in-cell').innerText = val;
  };
  
  
  /**
   * Listener method for when the user changes.
   *
   * @param {GoogleUser} user the updated user.
   */
  userChanged = (user) => {
    console.log('User now: ', user);
    this.googleUser = user;
    this.updateGoogleUser();
    document.getElementById('curr-user-cell').innerText =
      JSON.stringify(user, undefined, 2);
  };
  
  
  /**
   * Updates the properties in the Google User table using the current user.
   */
  updateGoogleUser = () =>{
    if (this.googleUser) {
      document.getElementById('user-id').innerText = this.googleUser.getId();
      document.getElementById('user-scopes').innerText =
        this.googleUser.getGrantedScopes();
      document.getElementById('auth-response').innerText =
        JSON.stringify(this.googleUser.getAuthResponse(), undefined, 2);
    } else {
      document.getElementById('user-id').innerText = '--';
      document.getElementById('user-scopes').innerText = '--';
      document.getElementById('auth-response').innerText = '--';
    }
  };
  
  
  /**
   * Retrieves the current user and signed in states from the GoogleAuth
   * object.
   */
  refreshValues = () => {
    if (this.auth2){
      console.log('Refreshing values...');
  
      this.googleUser = this.auth2.currentUser.get();
  
      document.getElementById('curr-user-cell').innerText =
        JSON.stringify(this.googleUser, undefined, 2);
      document.getElementById('signed-in-cell').innerText =
        this.auth2.isSignedIn.get();
  
      updateGoogleUser();
    }
  }
  getGoogleUser = () => {
      return this.googleUser;
  }
}
export default Auth2;







alert("hello") 
// Initialize Firebase
const googleProvider = new firebase.auth.GoogleAuthProvider();

// Function to authenticate with Google
function authenticateWithGoogle() {
  firebase.auth().signInWithPopup(googleProvider)
    .then((result) => {
      // User is signed in
      const user = result.user;
      console.log("User:", user.displayName);
      console.log("Email:", user.email);
      console.log("UID:", user.uid);
    })
    .catch((error) => {
      console.error("Google authentication failed:", error.message);
    });
}

// Event listener for the Google Sign-in button
document.getElementById("googleSignInBtn").addEventListener("click", authenticateWithGoogle);

// Event listener for the Google Sign-in button
document.getElementById("googlesignin").addEventListener("click", authenticateWithGoogle);

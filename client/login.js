import { initializeApp } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-app.js";
import { getAuth, signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyBA43kPx6g_ukZJkVjiLfptL7CtkydCOoo",
  authDomain: "tripnest-46c69.firebaseapp.com",
  projectId: "tripnest-46c69",
  storageBucket: "tripnest-46c69.firebasestorage.app",
  messagingSenderId: "1064898830914",
  appId: "1:1064898830914:web:404269dc683e82a97383db",
  measurementId: "G-69MJB0WJQ2"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

document.getElementById("login-form").addEventListener("submit", async (e) => {
  e.preventDefault();

  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value;

  try {
    await signInWithEmailAndPassword(auth, email, password);
    alert("✅ Login successful!");
    window.location.href = "index.html";
  } catch (error) {
    const msg = error.message || "❌ Login failed.";
    alert(msg);
    document.getElementById("login-error").textContent = msg;
  }
});

document.getElementById("google-login").addEventListener("click", async () => {
  const provider = new GoogleAuthProvider();

  try {
    await signInWithPopup(auth, provider);
    alert("✅ Google Login successful!");
    window.location.href = "index.html";
  } catch (error) {
    alert("❌ Google login failed: " + error.message);
  }
});
function showPopup(message) {
  const popup = document.getElementById("popup");
  popup.textContent = message;
  popup.style.display = "block";
  popup.style.opacity = 1;

  setTimeout(() => {
    popup.style.opacity = 0;
    setTimeout(() => popup.style.display = "none", 300);
  }, 2000); 
}

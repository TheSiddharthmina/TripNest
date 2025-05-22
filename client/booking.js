import { initializeApp } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-app.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-auth.js";

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

document.getElementById("booking-form").addEventListener("submit", async (e) => {
  e.preventDefault();

  const user = auth.currentUser;
  if (!user) {
    showPopup("Please login to book.");
    return;
  }

  const token = await user.getIdToken();
  const data = {
    name: document.getElementById("name").value,
    email: document.getElementById("email").value,
    destination: document.getElementById("destination").value,
    travelDate: document.getElementById("date").value,
    numPeople: document.getElementById("people").value,
    message: document.getElementById("message").value
  };

  try {
    await axios.post("http://localhost:5000/api/bookings", data, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    showPopup("✅ Booking submitted!");
    document.getElementById("booking-form").reset();
  } catch (err) {
    showPopup("❌ Error submitting booking.");
    console.error(err);
  }
});

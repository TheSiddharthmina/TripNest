import { initializeApp } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-app.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyBA43kPx6g_ukZJkVjiLfptL7CtkydCOoo",
  authDomain: "tripnest-46c69.firebaseapp.com",
  projectId: "tripnest-46c69",
  storageBucket: "tripnest-46c69.firebasestorage.app",
  messagingSenderId: "1064898830914",
  appId: "1:1064898830914:web:404269dc683e82a97383db"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

onAuthStateChanged(auth, async (user) => {
  if (!user || user.email !== "siddharthmina121@gmail.com") {
    alert("Access denied. Only admin can view this page.");
    window.location.href = "index.html";
    return;
  }

  const token = await user.getIdToken();
  loadBookings(token);
});

async function loadBookings(token) {
  try {
    const res = await axios.get("http://localhost:5000/api/bookings/all", {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    const tbody = document.querySelector("#booking-table tbody");
    tbody.innerHTML = "";

    res.data.bookings.forEach((b) => {
      const tr = document.createElement("tr");
      tr.innerHTML = `
        <td>${b.name}</td>
        <td>${b.destination}</td>
        <td>${b.travelDate}</td>
        <td>${b.checkoutDate}</td>
        <td>${b.numPeople}</td>
        <td>${b.roomType || "—"}</td>
        <td><button onclick="deleteBooking('${b._id}')">Delete</button></td>
      `;
      tbody.appendChild(tr);
    });
  } catch (err) {
    alert("Failed to load bookings.");
    console.error(err);
  }
}

window.deleteBooking = async (id) => {
  if (!confirm("Are you sure you want to delete this booking?")) return;
  try {
    const user = auth.currentUser;
    const token = await user.getIdToken();

    await axios.delete(`http://localhost:5000/api/bookings/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    alert("Deleted!");
    window.location.reload();
  } catch (err) {
    alert("Delete failed.");
    console.error(err);
  }
};

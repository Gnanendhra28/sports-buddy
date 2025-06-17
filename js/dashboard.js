import { auth, db } from './firebase-config.js';
import { onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-auth.js";
import { 
    collection, addDoc, query, where, getDocs, doc, deleteDoc 
} from "https://www.gstatic.com/firebasejs/9.6.1/firebase-firestore.js";

// Simple logging for every action
const logAction = (action, details) => {
    console.log(`[LOG] Action: ${action}`, details);
};

onAuthStateChanged(auth, async (user) => {
    if (user) {
        // User is signed in
        document.getElementById('user-email').textContent = user.email;
        await loadUserEvents(user.uid);
    } else {
        // No user is signed in, redirect to login page
        window.location.href = 'index.html';
    }
});

// Load and display user's events
const loadUserEvents = async (userId) => {
    const eventsList = document.getElementById('events-list');
    eventsList.innerHTML = ''; // Clear current list
    const q = query(collection(db, "sportsEvents"), where("userId", "==", userId));
    const querySnapshot = await getDocs(q);
    
    if (querySnapshot.empty) {
        eventsList.innerHTML = '<p>You have not added any events yet.</p>';
        return;
    }

    querySnapshot.forEach((doc) => {
        const event = doc.data();
        const eventElement = document.createElement('div');
        eventElement.className = 'event-item';
        eventElement.innerHTML = `
            <div>
                <strong>${event.name}</strong><br>
                Location: ${event.location}<br>
                Time: ${new Date(event.time).toLocaleString()}
            </div>
            <button class="delete-button" data-id="${doc.id}">Delete Sport </button>
        `;
        eventsList.appendChild(eventElement);
    });

    // Add event listeners to delete buttons
    document.querySelectorAll('.delete-button').forEach(button => {
        button.addEventListener('click', async (e) => {
            const eventId = e.target.dataset.id;
            await deleteSportEvent(eventId);
            await loadUserEvents(userId); // Refresh list
        });
    });
};

// Add a new sports event
const addEventButton = document.getElementById('add-event-button');
addEventButton.addEventListener('click', async () => {
    const eventName = document.getElementById('event-name').value;
    const eventLocation = document.getElementById('event-location').value;
    const eventTime = document.getElementById('event-time').value;
    const user = auth.currentUser;

    if (!eventName || !eventLocation || !eventTime) {
        alert('Please fill out all fields.');
        return;
    }

    try {
        const docRef = await addDoc(collection(db, "sportsEvents"), {
            userId: user.uid,
            name: eventName,
            location: eventLocation,
            time: eventTime
        });
        logAction('Add Sport Event', { id: docRef.id, name: eventName });
        alert('Event added successfully!');
        // Clear fields and reload events
        document.getElementById('event-name').value = '';
        document.getElementById('event-location').value = '';
        document.getElementById('event-time').value = '';
        await loadUserEvents(user.uid);
    } catch (e) {
        logAction('Add Event Error', { error: e.message });
        console.error("Error adding document: ", e);
    }
});

// Delete a sports event
const deleteSportEvent = async (eventId) => {
    try {
        await deleteDoc(doc(db, "sportsEvents", eventId));
        logAction('Delete Sport Event', { id: eventId });
        alert('Event deleted successfully.');
    } catch (error) {
        logAction('Delete Event Error', { error: error.message });
        alert(`Error deleting event: ${error.message}`);
    }
};

// Logout
const logoutButton = document.getElementById('logout-button');
logoutButton.addEventListener('click', async () => {
    try {
        await signOut(auth);
        logAction('User Logout', {});
        window.location.href = 'index.html';
    } catch (error) {
        logAction('Logout Error', { error: error.message });
        alert(`Logout failed: ${error.message}`);
    }
});
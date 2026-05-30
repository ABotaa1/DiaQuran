import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getDatabase, ref, onValue } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-database.js";

const firebaseConfig = {
    databaseURL: "https://diaqurann-default-rtdb.firebaseio.com"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
const statsRef = ref(db, 'bot_stats');

// دالة العداد الحركي
function animateCount(elementId, targetValue, duration) {
    const element = document.getElementById(elementId);
    if (!element) return;
    
    let startValue = 0;
    const stepTime = Math.max(1, Math.floor(duration / 50));
    
    const timer = setInterval(() => {
        startValue += Math.ceil(targetValue / 50);
        if (startValue >= targetValue) {
            element.textContent = "+" + targetValue.toLocaleString();
            clearInterval(timer);
        } else {
            element.textContent = "+" + startValue.toLocaleString();
        }
    }, stepTime);
}

// الاستماع للبيانات (تحديث العدادات فقط)
onValue(statsRef, (snapshot) => {
    const data = snapshot.val();
    if (!data) return;

    // تحديث الأرقام فقط
    animateCount('servers-count', data.servers || 0, 1500);
    animateCount('users-count', data.users || 0, 1500);
});

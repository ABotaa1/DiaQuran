import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getDatabase, ref, onValue } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-database.js";

// 1. إعداد الاتصال
const firebaseConfig = {
    databaseURL: "https://diaqurann-default-rtdb.firebaseio.com"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
const statsRef = ref(db, 'bot_stats');

// 2. دالة العداد الحركي
function animateCount(elementId, targetValue, duration) {
    const element = document.getElementById(elementId);
    if (!element) return;
    
    let startValue = 0;
    if (targetValue <= 10) {
        element.textContent = "+" + targetValue.toLocaleString();
        return;
    }

    const stepTime = Math.abs(Math.floor(duration / (targetValue / (targetValue / 50))));
    const timer = setInterval(() => {
        startValue += Math.ceil(targetValue / 50);
        if (startValue >= targetValue) {
            element.textContent = "+" + targetValue.toLocaleString();
            clearInterval(timer);
        } else {
            element.textContent = "+" + startValue.toLocaleString();
        }
    }, stepTime > 0 ? stepTime : 20);
}

// 3. الاستماع الموحد للبيانات (يحدث العدادات والحالة معاً)
onValue(statsRef, (snapshot) => {
    const data = snapshot.val();
    const statusCard = document.getElementById('status-card');
    const botStatus = document.getElementById('bot-status');
    const statusText = document.getElementById('status-text');

    if (!data) {
        console.log("⚠️ لم يتم العثور على بيانات.");
        return;
    }

    // تحديث العدادات
    animateCount('servers-count', data.servers || 0, 1500);
    animateCount('users-count', data.users || 0, 1500);

    // تحديث الحالة (الحل الجذري لمشكلة "جاري التحقق")
    if (data.status === "online") {
        botStatus.textContent = "24/7";
        statusText.textContent = "يعمل الآن";
        statusCard.style.borderColor = "#4fc0b0";
        botStatus.style.color = "#4fc0b0";
    } else {
        botStatus.textContent = "OFF";
        statusText.textContent = "البوت متوقف حالياً";
        statusCard.style.borderColor = "#ff4d4d";
        botStatus.style.color = "#ff4d4d";
    }
    
    console.log("📊 تم تحديث الحالة والعدادات:", data);
});

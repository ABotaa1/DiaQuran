// دالة العداد الحركي الذكي
function animateCount(elementId, targetValue, duration) {
    const element = document.getElementById(elementId);
    if (!element) return;
    
    let startValue = 0;
    // إذا كانت الأرقام صغيرة (مثل 2 سيرفر)، تظهر مباشرة بدون انتظار طويل
    if (targetValue <= 10) {
        element.textContent = "+" + targetValue.toLocaleString();
        return;
    }

    const stepTime = Math.abs(Math.floor(duration / targetValue));
    const timer = setInterval(() => {
        startValue += Math.ceil(targetValue / 50); // سرعة عد متناسقة
        if (startValue >= targetValue) {
            element.textContent = "+" + targetValue.toLocaleString();
            clearInterval(timer);
        } else {
            element.textContent = "+" + startValue.toLocaleString();
        }
    }, stepTime > 0 ? stepTime : 1);
}

// 🔗 ربط الموقع بـ Firebase عبر الـ Web CDN المتوافق مع الـ Modules
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getDatabase, ref, onValue } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-database.js";

// ⚠️ تم تعديل الرابط هنا ليتطابق مع صورتك الحقيقية بالملي (diaqurann بنون مضاعفة)
const firebaseConfig = {
    databaseURL: "https://diaqurann-default-rtdb.firebaseio.com"
};

import { get, ref as dbRef, onValue } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-database.js";

// الاستماع لتغيرات الحالة
onValue(statsRef, (snapshot) => {
    const data = snapshot.val();
    const statusCard = document.getElementById('status-card');
    const botStatus = document.getElementById('bot-status');
    const statusText = document.getElementById('status-text');

    if (data && data.status === "online") {
        botStatus.textContent = "24/7";
        statusText.textContent = "البوت يعمل الآن";
        statusCard.style.borderColor = "var(--accent-color)"; // حدود تركواز للبوت الشغال
    } else {
        botStatus.textContent = "OFF";
        statusText.textContent = "البوت متوقف حالياً";
        statusCard.style.borderColor = "#ff4d4d"; // حدود حمراء للبوت المتوقف
        botStatus.style.color = "#ff4d4d";
    }
});


const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
const statsRef = ref(db, 'bot_stats');

// الاستماع للتغييرات الحية في قاعدة البيانات
onValue(statsRef, (snapshot) => {
    const data = snapshot.val();
    if (data) {
        // طباعة البيانات في الكونسول للمطور للتأكد من وصولها للمتصفح
        console.log("📊 البيانات المستلمة من Firebase:", data);
        
        // تشغيل العدادات بناءً على أرقام الفايربيز الحية
        animateCount('servers-count', data.servers || 0, 1500);
        animateCount('users-count', data.users || 0, 1500);
    } else {
        console.log("⚠️ لم يتم العثور على بيانات في المسار المحدّد.");
    }
});

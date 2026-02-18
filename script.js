// i18n object
const translations = {
    en: {
        appTitle: "Safe Space Journal",
        moodTitle: "How are you feeling today?",
        journalTitle: "Your Journal Entry",
        journalPlaceholder: "Express your thoughts freely. This space is safe and judgment-free.",
        privacyNote: "This journal is private and stored only on your device.",
        saveEntry: "Save Entry",
        historyTitle: "Journal History",
        analyticsTitle: "Mood Analytics",
        tipsTitle: "Emotional Tips",
        reminderTitle: "Daily Reminder",
        setReminder: "Set Reminder",
        modalTitle: "You’re Not Alone.",
        modalText: "It’s okay to feel tired, sad, or overwhelmed. Asking for help or simply talking to a psychologist is normal and healthy. You don’t have to go through everything alone.",
        emergencyText: "If this is an emergency, please contact local emergency services.",
        breathingTip: "Try 4-4-6 breathing: Inhale for 4 seconds, hold for 4, exhale for 6.",
        compassionTip: "Be kind to yourself. Treat yourself as you would a friend.",
        groundingTip: "Use 5-4-3-2-1: Name 5 things you see, 4 you can touch, 3 you hear, 2 you smell, 1 you taste.",
        selectedPrimary: "Primary Mood: ",
        selectedTags: "Tags: ",
        reflectionPrompt: "What might help you feel slightly better?",
        supportBtn: "Need Support?",
        modalLink: "Contact UGM Counseling"
    },
    id: {
        appTitle: "Jurnal Ruang Aman",
        moodTitle: "Bagaimana perasaanmu hari ini?",
        journalTitle: "Entri Jurnalmu",
        journalPlaceholder: "Tuangkan isi hatimu di sini. Ceritakan apa yang kamu rasakan tanpa takut dihakimi.",
        privacyNote: "Jurnal ini bersifat pribadi dan hanya tersimpan di perangkatmu.",
        saveEntry: "Simpan Entri",
        historyTitle: "Riwayat Jurnal",
        analyticsTitle: "Analitik Suasana Hati",
        tipsTitle: "Tips Mengelola Emosi",
        reminderTitle: "Pengingat Harian",
        setReminder: "Atur Pengingat",
        modalTitle: "Kamu Tidak Sendiri.",
        modalText: "Tidak apa-apa merasa lelah, sedih, atau kewalahan. Meminta bantuan atau sekadar berbicara dengan psikolog adalah hal yang normal dan sehat. Kamu tidak harus menghadapi semuanya sendirian.",
        emergencyText: "Jika ini adalah keadaan darurat, silakan hubungi layanan darurat setempat.",
        breathingTip: "Coba pernapasan 4-4-6: Tarik napas selama 4 detik, tahan 4, hembuskan 6.",
        compassionTip: "Bersikap baik pada dirimu sendiri. Perlakukan dirimu seperti kamu memperlakukan teman.",
        groundingTip: "Gunakan 5-4-3-2-1: Sebutkan 5 hal yang kamu lihat, 4 yang bisa disentuh, 3 yang didengar, 2 yang dicium, 1 yang dirasakan.",
        selectedPrimary: "Suasana Hati Utama: ",
        selectedTags: "Tag: ",
        reflectionPrompt: "Apa yang paling kamu butuhkan saat ini?",
        supportBtn: "Butuh Bantuan?",
        modalLink: "Hubungi Konseling UGM"
    }
};

// Emotions data
const emotions = [
    { name: "Happy", emoji: "😊", svg: '<svg viewBox="0 0 100 100"><circle cx="50" cy="50" r="40" fill="#ffd700"/><circle cx="35" cy="40" r="5"/><circle cx="65" cy="40" r="5"/><path d="M30 60 Q50 75 70 60" stroke="#000" stroke-width="3" fill="none"/></svg>' },
    { name: "Calm", emoji: "😌", svg: '<svg viewBox="0 0 100 100"><circle cx="50" cy="50" r="40" fill="#87ceeb"/><circle cx="35" cy="40" r="5"/><circle cx="65" cy="40" r="5"/><path d="M35 65 L65 65" stroke="#000" stroke-width="3"/></svg>' },
    // Add more emotions similarly...
    { name: "Sad", emoji: "😢", svg: '<svg viewBox="0 0 100 100"><circle cx="50" cy="50" r="40" fill="#add8e6"/><circle cx="35" cy="40" r="5"/><circle cx="65" cy="40" r="5"/><path d="M30 70 Q50 55 70 70" stroke="#000" stroke-width="3" fill="none"/></svg>' },
    // ... (include all emotions as per list)
];

// Motivational messages mapping
const motivationalMessages = {
    en: {
        Happy: "I'm glad you're feeling this way. Take a moment to appreciate this feeling.",
        Sad: "It’s okay to feel sad. Your feelings are valid. Be gentle with yourself today.",
        // ... map for all
    },
    id: {
        Happy: "Senang mendengarnya. Ambillah waktu untuk menghargai perasaan ini.",
        Sad: "Tidak apa-apa merasa sedih. Perasaanmu valid. Bersikap lembut pada dirimu hari ini.",
        // ... map for all
    }
};

// Global variables
let currentLang = localStorage.getItem('lang') || 'en';
let currentTheme = localStorage.getItem('theme') || 'light';
let selectedPrimaryMood = null;
let selectedTags = [];
let entries = JSON.parse(localStorage.getItem('journalEntries')) || [];

// DOM elements
const appTitle = document.getElementById('app-title');
const moodTitle = document.getElementById('mood-title');
const journalTitle = document.getElementById('journal-title');
const journalText = document.getElementById('journal-text');
const saveEntryBtn = document.getElementById('save-entry');
const mascot = document.getElementById('mascot');
const mascotMessage = document.getElementById('mascot-message');
const responseCard = document.getElementById('response-card');
const motivationalMessage = document.getElementById('motivational-message');
const reflectionPrompt = document.getElementById('reflection-prompt');
const themeToggle = document.getElementById('theme-toggle');
const langToggle = document.getElementById('lang-toggle');
const supportBtn = document.getElementById('support-btn');
const supportModal = document.getElementById('support-modal');
const modalClose = document.getElementById('modal-close');
const navBtns = document.querySelectorAll('.nav-btn');
const sections = document.querySelectorAll('.section');

// Initialize app
function init() {
    setTheme(currentTheme);
    setLanguage(currentLang);
    renderMoodSelector();
    renderHistory();
    renderAnalytics();
    updateMascot();
    setReminderStatus();
}

// Theme functions
function setTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
    themeToggle.textContent = theme === 'light' ? '🌙' : '☀️';
}

themeToggle.addEventListener('click', () => {
    currentTheme = currentTheme === 'light' ? 'dark' : 'light';
    setTheme(currentTheme);
});

// Language functions
function setLanguage(lang) {
    currentLang = lang;
    localStorage.setItem('lang', lang);
    updateTexts();
    langToggle.textContent = lang === 'en' ? 'ID' : 'EN';
}

langToggle.addEvent

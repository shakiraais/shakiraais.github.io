// i18n object for bilingual support
const translations = {
    en: {
        appTitle: "Interactive Journal",
        moodTitle: "How are you feeling today?",
        primaryEmotionLabel: "Primary Emotion:",
        tagsLabel: "Additional Tags:",
        journalTitle: "Write Your Journal",
        saveEntry: "Save Entry",
        historyTitle: "Journal History",
        clearFilters: "Clear Filters",
        analyticsTitle: "Mood Analytics",
        reminderTitle: "Daily Reminder",
        setReminder: "Set Reminder",
        supportTitle: "You’re Not Alone.",
        supportText: "It’s okay to feel tired, sad, or overwhelmed. Asking for help or simply talking to a psychologist is normal and healthy. You don’t have to go through everything alone.",
        contactCounseling: "Contact UGM Counseling",
        emergencyNote: "If this is an emergency, please contact local emergency services.",
        mascotWelcome: "Welcome to your safe space.",
        placeholder: "Share your thoughts..."
    },
    id: {
        appTitle: "Jurnal Interaktif",
        moodTitle: "Bagaimana perasaanmu hari ini?",
        primaryEmotionLabel: "Emosi Utama:",
        tagsLabel: "Tag Tambahan:",
        journalTitle: "Tulis Jurnalmu",
        saveEntry: "Simpan Entri",
        historyTitle: "Riwayat Jurnal",
        clearFilters: "Hapus Filter",
        analyticsTitle: "Analitik Suasana Hati",
        reminderTitle: "Pengingat Harian",
        setReminder: "Atur Pengingat",
        supportTitle: "Kamu Tidak Sendiri.",
        supportText: "Tidak apa-apa merasa lelah, sedih, atau kewalahan. Meminta bantuan atau sekadar berbicara dengan psikolog adalah hal yang normal dan sehat. Kamu tidak harus menghadapi semuanya sendirian.",
        contactCounseling: "Hubungi Konseling UGM",
        emergencyNote: "Jika ini adalah keadaan darurat, silakan hubungi layanan darurat setempat.",
        mascotWelcome: "Selamat datang di ruang amanmu.",
        placeholder: "Bagikan pikiranmu..."
    }
};

// Emotion data with SVG illustrations
const emotions = [
    { name: "Happy", emoji: "😊", svg: '<circle cx="50" cy="50" r="40" fill="#fef3c7"/><circle cx="35" cy="35" r="5" fill="#f59e0b"/><circle cx="65" cy="35" r="5" fill="#f59e0b"/><path d="M30 60 Q50 75 70 60" stroke="#f59e0b" stroke-width="3" fill="none"/>' },
    { name: "Calm", emoji: "😌", svg: '<circle cx="50" cy="50" r="40" fill="#dbeafe"/><circle cx="35" cy="35" r="5" fill="#3b82f6"/><circle cx="65" cy="35" r="5" fill="#3b82f6"/><path d="M40 60 Q50 65 60 60" stroke="#3b82f6" stroke-width="2" fill="none"/>' },
    { name: "Grateful", emoji: "🙏", svg: '<circle cx="50" cy="50" r="40" fill="#dcfce7"/><circle cx="35" cy="35" r="5" fill="#10b981"/><circle cx="65" cy="35" r="5" fill="#10b981"/><path d="M45 55 Q50 60 55 55" stroke="#10b981" stroke-width="2" fill="none"/>' },
    { name: "Excited", emoji: "🤩", svg: '<circle cx="50" cy="50" r="40" fill="#fef3c7"/><circle cx="35" cy="30" r="6" fill="#f59e0b"/><circle cx="65" cy="30" r="6" fill="#f59e0b"/><path d="M25 65 Q50 80 75 65" stroke="#f59e0b" stroke-width="3" fill="none"/><circle cx="30" cy="25" r="2" fill="#f59e0b"/><circle cx="70" cy="25" r="2" fill="#f59e0b"/>' },
    { name: "Proud", emoji: "😊", svg: '<circle cx="50" cy="50" r="40" fill="#fef3c7"/><circle cx="35" cy="35" r="5" fill="#f59e0b"/><circle cx="65" cy="35" r="5" fill="#f59e0b"/><path d="M35 60 Q50 70 65 60" stroke="#f59e0b" stroke-width="3" fill="none"/>' },
    { name: "Loved", emoji: "🥰", svg: '<circle cx="50" cy="50" r="40" fill="#fce7f3"/><circle cx="35" cy="35" r="5" fill="#ec4899"/><circle cx="65" cy="35" r="5" fill="#ec4899"/><path d="M45 55 Q50 60 55 55" stroke="#ec4899" stroke-width="2" fill="none"/><path d="M25 45 Q50 35 75 45" stroke="#ec4899" stroke-width="2" fill="none"/>' },
    { name: "Sad", emoji: "😢", svg: '<circle cx="50" cy="50" r="40" fill="#dbeafe"/><circle cx="35" cy="40" r="5" fill="#3b82f6"/><circle cx="65" cy="40" r="5" fill="#3b82f6"/><path d="M35 65 Q50 55 65 65" stroke="#3b82f6" stroke-width="3" fill="none"/>' },
    { name: "Lonely", emoji: "😔", svg: '<circle cx="50" cy="50" r="40" fill="#e5e7eb"/><circle cx="35" cy="40" r="5" fill="#6b7280"/><circle cx="65" cy="40" r="5" fill="#6b7280"/><path d="M40 60 Q50 55 60 60" stroke="#6b7280" stroke-width="2" fill="none"/>' },
    { name: "Anxious", emoji: "😰", svg: '<circle cx="50" cy="50" r="40" fill="#fef3c7"/><circle cx="35" cy="35" r="6" fill="#f59e0b"/><circle cx="65" cy="35" r="6" fill="#f59e0b"/><path d="M35 65 Q50 60 65 65" stroke="#f59e0b" stroke-width="3" fill="none"/><circle cx="25" cy="30" r="2" fill="#f59e0b"/><circle cx="75" cy="30" r="2" fill="#f59e0b"/>' },
    { name: "Overwhelmed", emoji: "😵", svg: '<circle cx="50" cy="50" r="40" fill="#fef3c7"/><circle cx="35" cy="35" r="5" fill="#f59e0b"/><circle cx="65" cy="35" r="5" fill="#f59e0b"/><path d="M30 60 Q50 50 70 60" stroke="#f59e0b" stroke-width="3" fill="none"/>' },
    { name: "Angry", emoji: "😠", svg: '<circle cx="50" cy="50" r="40" fill="#fee2e2"/><circle cx="35" cy="35

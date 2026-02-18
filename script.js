document.addEventListener("DOMContentLoaded", function() {
    // Elements
    const langToggle = document.getElementById('lang-toggle');
    const themeToggle = document.getElementById('theme-toggle');
    const emotionGrid = document.getElementById('emotion-grid');
    const journalText = document.getElementById('journal-text');
    const saveBtn = document.getElementById('save-btn');
    const historyList = document.getElementById('history-list');
    const messageModal = document.getElementById('message-modal');
    const motivationalMsg = document.getElementById('motivational-msg');
    const closeMsg = document.getElementById('close-msg');

    // Data
    let currentLang = localStorage.getItem('lang') || 'en';
    let currentTheme = localStorage.getItem('theme') || 'light';
    let selectedEmotion = null;
    let entries = JSON.parse(localStorage.getItem('entries')) || [];

    // Text mappings
    const texts = {
        en: {
            title: 'Journaling App',
            emotionTitle: 'How are you feeling today?',
            inputTitle: 'Write Your Journal',
            historyTitle: 'Journal History',
            placeholder: 'Write what you\'re feeling today...',
            save: 'Save',
            ok: 'OK'
        },
        id: {
            title: 'Aplikasi Jurnal',
            emotionTitle: 'Bagaimana perasaanmu hari ini?',
            inputTitle: 'Tulis Jurnalmu',
            historyTitle: 'Riwayat Jurnal',
            placeholder: 'Ceritakan apa yang kamu rasakan hari ini...',
            save: 'Simpan',
            ok: 'OK'
        }
    };

    const emotions = [
        { key: 'happy', emoji: '😊', label: { en: 'Happy', id: 'Bahagia' } },
        { key: 'calm', emoji: '😌', label: { en: 'Calm', id: 'Tenang' } },
        { key: 'grateful', emoji: '🙏', label: { en: 'Grateful', id: 'Bersyukur' } },
        { key: 'excited', emoji: '🤩', label: { en: 'Excited', id: 'Bergairah' } },
        { key: 'sad', emoji: '😢', label: { en: 'Sad', id: 'Sedih' } },
        { key: 'lonely', emoji: '😔', label: { en: 'Lonely', id: 'Kesepian' } },
        { key: 'anxious', emoji: '😰', label: { en: 'Anxious', id: 'Cemas' } },
        { key: 'overwhelmed', emoji: '😵', label: { en: 'Overwhelmed', id: 'Kewalahan' } },
        { key: 'angry', emoji: '😠', label: { en: 'Angry', id: 'Marah' } },
        { key: 'tired', emoji: '😴', label: { en: 'Tired', id: 'Lelah' } },
        { key: 'neutral', emoji: '😐', label: { en: 'Neutral', id: 'Netral' } }
    ];

    const motivationalMessages = {
        happy: { en: "I’m glad you’re feeling good today.", id: "Senang mendengar kamu merasa baik hari ini." },
        calm: { en: "Keep that peace within you.", id: "Jaga ketenangan itu di dalam dirimu." },
        grateful: { en: "Gratitude is a powerful emotion.", id: "Syukur adalah emosi yang kuat." },
        excited: { en: "Embrace that excitement!", id: "Peluk kegembiraan itu!" },
        sad: { en: "It’s okay to feel sad. Be gentle with yourself.", id: "Tidak apa-apa merasa sedih. Bersikaplah lembut pada dirimu." },
        lonely: { en: "You’re not alone; reach out if you need.", id: "Kamu tidak sendirian; hubungi jika perlu." },
        anxious: { en: "One small step at a time.", id: "Satu langkah kecil dalam satu waktu." },
        overwhelmed: { en: "Take a deep breath and prioritize.", id: "Tarik napas dalam dan prioritaskan." },
        angry: { en: "Take a breath before reacting.", id: "Tarik napas sebelum bereaksi." },
        tired: { en: "Rest is important; take care of yourself.", id: "Istirahat itu penting; jaga dirimu." },
        neutral: { en: "Thank you for checking in with yourself.", id: "Terima kasih telah memeriksa dirimu." }
    };

    // Initialize
    setLanguage(currentLang);
    setTheme(currentTheme);
    renderEmotions();
    renderHistory();

    // Event Listeners
    langToggle.addEventListener('click', () => {
        currentLang = currentLang === 'en' ? 'id' : 'en';
        setLanguage(currentLang);
    });

    themeToggle.addEventListener('click', () => {
        currentTheme = currentTheme === 'light' ? 'dark' : 'light';
        setTheme(currentTheme);
    });

    saveBtn.addEventListener('click', saveEntry);
    closeMsg.addEventListener('click', () => messageModal.classList.add('hidden'));

    // Functions
    function setLanguage(lang) {
        localStorage.setItem('lang', lang);
        document.getElementById('app-title').textContent = texts[lang].title;
        document.getElementById('emotion-title').textContent = texts[lang].emotionTitle;
        document.getElementById('input-title').textContent = texts[lang].inputTitle;
        document.getElementById('history-title').textContent = texts[lang].historyTitle;
        journalText.placeholder = texts[lang].placeholder;
        saveBtn.textContent = texts[lang].save;
        closeMsg.textContent = texts[lang].ok;
        renderEmotions();
        renderHistory();
    }

    function setTheme(theme) {
        localStorage.setItem('theme', theme);
        document.body.classList.toggle('dark', theme === 'dark');
        themeToggle.textContent = theme === 'light' ? '🌙' : '☀️';
    }

    function renderEmotions() {
        emotionGrid.innerHTML = '';
        emotions.forEach(emotion => {
            const div = document.createElement('div');
            div.className = 'emotion-item';
            if (selectedEmotion === emotion.key) div.classList.add('selected');
            div.innerHTML = `<span>${emotion.emoji}</span><span>${emotion.label[currentLang]}</span>`;
            div.addEventListener('click', () => {
                selectedEmotion = emotion.key;
                renderEmotions();
            });
            emotionGrid.appendChild(div);
        });
    }

    function saveEntry() {
        if (!selectedEmotion || !journalText.value.trim()) return;
        const entry = {
            id: Date.now(),
            date: new Date().toLocaleString(),
            emotion: selectedEmotion,
            content: journalText.value.trim()
        };
        entries.unshift(entry);
        localStorage.setItem('entries', JSON.stringify(entries));
        journalText.value = '';
        selectedEmotion = null;
        renderEmotions();
        renderHistory();
        showMessage(entry.emotion);
    }

    function renderHistory() {
        historyList.innerHTML = '';
        entries.forEach(entry => {
            const card = document.createElement('div');
            card.className = 'history-card';
            const emotion = emotions.find(e => e.key === entry.emotion);
            card.innerHTML = `
                <p><strong>${emotion.emoji} ${emotion.label[currentLang]}</strong> - ${entry.date}</p>
                <p>${entry.content}</p>
                <button class="delete-btn">×</button>
            `;
            card.querySelector('.delete-btn').addEventListener('click', () => deleteEntry(entry.id));
            historyList.appendChild(card);
        });
    }

    function deleteEntry(id) {
        entries = entries.filter(entry => entry.id !== id);
        localStorage.setItem('entries', JSON.stringify(entries));
        renderHistory();
    }

    function showMessage(emotion) {
        motivationalMsg.textContent = motivationalMessages[emotion][currentLang];
        messageModal.classList.remove('hidden');
    }
});

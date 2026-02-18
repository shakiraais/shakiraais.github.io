document.addEventListener('DOMContentLoaded', () => {
    // Navigation
    const sections = document.querySelectorAll('section');
    const navButtons = document.querySelectorAll('nav button');
    
    navButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const target = btn.id.replace('-btn', '');
            showSection(target);
        });
    });
    
    function showSection(id) {
        sections.forEach(sec => sec.classList.remove('active'));
        document.getElementById(id).classList.add('active');
    }
    
    // Homepage
    const quotes = [
        "Nggak harus kuat terus kok.",
        "Minta bantuan itu bukan tanda lemah.",
        "Istirahat juga bagian dari progres.",
        "Kamu nggak sendirian."
    ];
    document.getElementById('quote').textContent = quotes[Math.floor(Math.random() * quotes.length)];
    
    document.getElementById('start-checkin').addEventListener('click', () => showSection('checkin'));
    document.getElementById('need-help').addEventListener('click', () => showSection('help'));
    
    // Check-in
    let selectedMood = '';
    let selectedCategory = '';
    document.querySelectorAll('.mood-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            selectedMood = btn.dataset.mood;
            document.getElementById('followup').style.display = 'block';
        });
    });
    
    document.querySelectorAll('.category-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            selectedCategory = btn.dataset.category;
        });
    });
    
    document.getElementById('submit-checkin').addEventListener('click', () => {
        const journal = document.getElementById('journal').value;
        const checkin = {
            mood: selectedMood,
            date: new Date().toISOString().split('T')[0],
            category: selectedCategory,
            journal: journal
        };
        
        let checkins = JSON.parse(localStorage.getItem('checkins')) || [];
        checkins.push(checkin);
        localStorage.setItem('checkins', JSON.stringify(checkins));
        
        const feedbacks = {
            overwhelmed: "Kayaknya kamu lagi banyak beban ya. Semoga hari ini kamu bisa ambil jeda sebentar.",
            biasa: "Kadang hari terasa flat, dan itu juga nggak apa-apa.",
            lumayan: "Semoga energi kecil ini bisa kamu jaga pelan-pelan.",
            oke: "Senang dengar kamu lagi oke. Jangan lupa tetap jaga diri."
        };
        
        document.getElementById('feedback').textContent = feedbacks[selectedMood];
        document.getElementById('feedback').style.display = 'block';
        document.getElementById('followup').style.display = 'none';
    });
    
    // Toolkit
    const prompts = [
        "Apa 1 hal kecil yang bisa kamu kontrol hari ini?",
        "Apa yang sebenarnya kamu butuhkan sekarang?",
        "Kalau kamu bisa istirahat tanpa rasa bersalah, apa yang akan kamu lakukan?"
    ];
    
    document.getElementById('new-prompt').addEventListener('click', () => {
        document.getElementById('prompt').textContent = prompts[Math.floor(Math.random() * prompts.length)];
    });
    document.getElementById('new-prompt').click(); // Initial prompt
    
    document.getElementById('start-breathing').addEventListener('click', () => {
        const circle = document.getElementById('breathing-circle');
        circle.style.transform = 'scale(1.5)';
        setTimeout(() => circle.style.transform = 'scale(1)', 4000);
    });
    
    document.getElementById('pause-btn').addEventListener('click', () => {
        document.getElementById('pause-overlay').style.display = 'flex';
        let time = 60;
        const countdown = document.getElementById('countdown');
        const interval = setInterval(() => {
            countdown.textContent = time;
            time--;
            if (time < 0) {
                clearInterval(interval);
                document.getElementById('pause-overlay').style.display = 'none';
            }
        }, 1000);
    });
    
    // Insight
    function drawChart() {
        const checkins = JSON.parse(localStorage.getItem('checkins')) || [];
        const canvas = document.getElementById('mood-chart');
        const ctx = canvas.getContext('2d');
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        const moodEmojis = { overwhelmed: '😵', biasa: '😐', lumayan: '🙂', oke: '😄' };
        const recent = checkins.slice(-7); // Last 7 checkins
        
        recent.forEach((checkin, i) => {
            const x = (i + 1) * (canvas.width / 8);
            const y = canvas.height / 2;
            ctx.font = '30px Arial';
            ctx.fillText(moodEmojis[checkin.mood], x, y);
        });
        
        // Simple insight
        const overwhelmedCount = recent.filter(c => c.mood === 'overwhelmed').length;
        if (overwhelmedCount > 3) {
            document.getElementById('insight-text').textContent = "Dalam beberapa minggu terakhir, kamu sering merasa overwhelmed menjelang deadline.";
        } else {
            document.getElementById('insight-text').textContent = "Terus jaga ritme yang baik!";
        }
    }
    
    if (document.getElementById('insight').classList.contains('active')) drawChart();
    document.getElementById('insight-btn').addEventListener('click', drawChart);
});
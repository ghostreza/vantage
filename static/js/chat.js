// static/js/chat.js
(function() {
    const toggleBtn = document.getElementById('toggle-chat');
    const chatBox = document.getElementById('chat-box');
    const closeBtn = document.getElementById('close-chat');
    const messagesDiv = document.getElementById('chat-messages');
    const input = document.getElementById('chat-input');
    const sendBtn = document.getElementById('send-chat');

    function openChat() {
        chatBox.classList.remove('hidden');
        toggleBtn.classList.add('hidden');
    }

    function closeChat() {
        chatBox.classList.add('hidden');
        toggleBtn.classList.remove('hidden');
    }

    toggleBtn.addEventListener('click', openChat);
    closeBtn.addEventListener('click', closeChat);

    function addMessage(text, sender = 'bot') {
        const wrapper = document.createElement('div');
        wrapper.className = 'flex gap-3 ' + (sender === 'user' ? 'justify-end' : '');

        if (sender === 'bot') {
            wrapper.innerHTML = `
                <div class="w-8 h-8 bg-gradient-to-br from-mint to-teal rounded-full flex items-center justify-center text-white text-xs shrink-0">VS</div>
                <div class="bg-white p-3 rounded-2xl rounded-tl-none shadow-sm text-sm text-gray-700 max-w-[80%]">${text}</div>
            `;
        } else {
            wrapper.innerHTML = `
                <div class="bg-navy text-white p-3 rounded-2xl rounded-tr-none shadow-sm text-sm max-w-[80%]">${text}</div>
                <div class="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center text-gray-600 text-xs shrink-0">U</div>
            `;
        }
        messagesDiv.appendChild(wrapper);
        messagesDiv.scrollTop = messagesDiv.scrollHeight;
    }

    function getMockResponse(query) {
        const q = query.toLowerCase();
        if (q.includes('harga') || q.includes('biaya') || q.includes('tarif')) {
            return "Untuk estimasi harga: <br><br>📌 <b>Starter</b>: Rp150K–400K (data cleaning & visualisasi)<br>📌 <b>Growth</b>: Rp800K–2,5Jt (dashboard + integrasi)<br>📌 <b>Scale</b>: Rp2,5Jt–6Jt+ (sistem end-to-end)<br><br>Harga final tergantung kompleksitas proyek. Kalau mau estimasi spesifik, boleh ceritakan kebutuhan Anda.";
        } else if (q.includes('layanan') || q.includes('jasa') || q.includes('bisa')) {
            return "Kami menyediakan 3 layanan utama:<br><br>📊 <b>Data Analytics</b> — dashboard, laporan, analisis statistik<br>⚙️ <b>Data Engineering</b> — pipeline data, integrasi sistem<br>🤖 <b>Process Automation</b> — bot WhatsApp/Telegram, otomatisasi laporan<br><br>Mau tahu lebih detail yang mana?";
        } else if (q.includes('proses') || q.includes('cara') || q.includes('kerja')) {
            return "Proses kerja kami simpel:<br><br>1️⃣ <b>Konsultasi awal</b> (gratis) — ceritakan kebutuhan<br>2️⃣ <b>Proposal & estimasi</b> — kami kirim dalam 1x24 jam<br>3️⃣ <b>Pengerjaan</b> — 2–10 hari tergantung scope<br>4️⃣ <b>Delivery & revisi</b> — Anda terima hasil + panduan<br><br>Mau langsung konsultasi? Klik link WhatsApp di halaman utama.";
        } else if (q.includes('wa') || q.includes('whatsapp') || q.includes('hubungi') || q.includes('kontak')) {
            return "Silakan hubungi kami langsung via WhatsApp di <b>+62 8xxxxxx</b> atau klik tombol WhatsApp di bagian bawah halaman. Tim kami siap bantu!";
        } else if (q.includes('hai') || q.includes('halo') || q.includes('test')) {
            return "Halo! Saya asisten AI Vantage Solutions. Ada yang bisa saya bantu terkait layanan Data Analytics, Data Engineering, atau Process Automation?";
        } else {
            return "Maaf, saya masih asisten AI dengan pengetahuan terbatas. Untuk pertanyaan lebih detail, silakan hubungi kami via WhatsApp ya. 😊";
        }
    }

    async function sendMessage() {
        const text = input.value.trim();
        if (!text) return;
        
        addMessage(text, 'user');
        input.value = '';

        const typingDiv = document.createElement('div');
        typingDiv.className = 'flex gap-3';
        typingDiv.innerHTML = `
            <div class="w-8 h-8 bg-gradient-to-br from-mint to-teal rounded-full flex items-center justify-center text-white text-xs shrink-0">VS</div>
            <div class="bg-white p-3 rounded-2xl rounded-tl-none shadow-sm text-sm text-gray-400 max-w-[80%]">Mengetik...</div>
        `;
        messagesDiv.appendChild(typingDiv);
        messagesDiv.scrollTop = messagesDiv.scrollHeight;

        await new Promise(resolve => setTimeout(resolve, 800 + Math.random() * 1200));
        typingDiv.remove();

        const reply = getMockResponse(text);
        addMessage(reply, 'bot');
    }

    sendBtn.addEventListener('click', sendMessage);
    input.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') sendMessage();
    });
})();
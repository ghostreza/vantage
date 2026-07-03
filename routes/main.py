# routes/main.py
from flask import Blueprint, render_template

main_bp = Blueprint("main", __name__)

@main_bp.route("/")
def home():
    services = [
        {
            "id": "analytics",
            "title": "Data Analytics & Business Intelligence",
            "icon": '<svg class="w-10 h-10 text-mint" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M3 3v18h18M7 16l4-4 4 4 5-5"/></svg>',
            "desc": "Mengubah data bisnis Anda menjadi keputusan nyata — bukan sekadar grafik.",
            "details": [
                "Data berantakan? Kami rapikan & strukturkan",
                "Belum punya dashboard? Dashboard interaktif real-time, akses dari HP",
                "Laporan cuma angka? Analisis statistik + insight bisnis tertulis",
                "Belum monitoring KPI? Tracking otomatis & alerting"
            ],
            "outputs": [
                {"icon": "📊", "text": "Dashboard interaktif (web-based, akses dari HP)"},
                {"icon": "📄", "text": "Laporan analisis siap presentasi (PDF/PPT)"},
                {"icon": "💡", "text": "Insight tertulis: \"apa artinya untuk bisnis Anda\""},
                {"icon": "📈", "text": "Rekomendasi tindakan berdasarkan data"}
            ]
        },
        {
            "id": "engineering",
            "title": "Data Engineering & Integrasi Sistem",
            "icon": '<svg class="w-10 h-10 text-mint" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M4 7v10c0 2 1 3 3 3h10c2 0 3-1 3-3V7M4 7c0-2 1-3 3-3h10c2 0 3 1 3 3M4 7h16M9 11h6"/></svg>',
            "desc": "Membangun infrastruktur data yang rapi dan terpadu — tanpa copy-paste manual antar platform.",
            "details": [
                "Data tercecer di banyak platform? Integrasi multi-sumber (API, DB, Google Sheets)",
                "Database tidak terstruktur? Database design & optimasi",
                "Pipeline data masih manual? Pipeline otomatis (ETL)",
                "Butuh data warehouse? Data warehouse ringan sesuai kebutuhan"
            ],
            "outputs": [
                {"icon": "🔗", "text": "Pipeline data berjalan otomatis"},
                {"icon": "🗄️", "text": "Database terstruktur & terdokumentasi"},
                {"icon": "📋", "text": "Panduan akses & maintenance sederhana"},
                {"icon": "📊", "text": "Data warehouse siap pakai"}
            ]
        },
        {
            "id": "automation",
            "title": "Process Automation & AI Solutions",
            "icon": '<svg class="w-10 h-10 text-mint" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M13 10V3L4 14h7v7l9-11h-7z"/></svg>',
            "desc": "Mengganti pekerjaan manual berulang dengan sistem cerdas yang bekerja untuk tim Anda.",
            "details": [
                "Laporan rutin masih manual? Otomatisasi laporan (email, Drive, Slack)",
                "Tim tidak dapat notifikasi real-time? Bot WhatsApp/Telegram custom",
                "Proses administrasi makan waktu? Web app ringan untuk internal",
                "Tidak ada sistem follow-up? Integrasi CRM + WhatsApp API"
            ],
            "outputs": [
                {"icon": "🤖", "text": "Bot siap pakai di WhatsApp/Telegram (interaktif)"},
                {"icon": "⚡", "text": "Proses otomatis berjalan terjadwal (cron/scheduler)"},
                {"icon": "📘", "text": "Panduan penggunaan & troubleshooting"},
                {"icon": "🔌", "text": "Integrasi CRM & WhatsApp API"}
            ]
        },
        {
            "id": "consulting",
            "title": "Konsultasi Data & IT",
            "icon": '<svg class="w-10 h-10 text-mint" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"/></svg>',
            "desc": "Bukan hanya mengerjakan, tapi juga membantu Anda merancang solusi yang tepat sejak awal.",
            "is_new": True,
            "is_core": True,
            "details": [
                "Tidak tahu harus mulai dari mana? Konsultasi awal gratis 15 menit",
                "Budget terbatas? Rekomendasi solusi cost-effective",
                "Tim tidak paham tools baru? Pelatihan & dokumentasi lengkap",
                "Proyek macet di tengah jalan? Troubleshooting & pendampingan teknis"
            ],
            "outputs": [
                {"icon": "📝", "text": "Peta solusi (flowchart, arsitektur sistem)"},
                {"icon": "🛠️", "text": "Rekomendasi tools yang tepat (Google, open-source, atau custom)"},
                {"icon": "📚", "text": "Dokumentasi & video tutorial singkat"},
                {"icon": "☎️", "text": "Pendampingan 3 bulan untuk proyek skala besar"}
            ]
        }
    ]

    cases = [
        {
            "title": "Dashboard Penjualan UMKM Retail",
            "before": "Pemilik toko memantau stok dan omzet dari catatan kertas & Excel terpisah, butuh 2 jam/hari untuk rekap manual.",
            "after": "Satu dashboard real-time menampilkan stok terkini, omzet harian, dan tren produk. Waktu rekap: 5 menit, zero kesalahan input."
        },
        {
            "title": "Otomatisasi Laporan Mutasi Bank",
            "before": "Staf keuangan koperasi mengunduh CSV dari mobile banking setiap pagi, format ulang, lalu kirim email ke manajemen — total 2 jam/hari.",
            "after": "Bot Telegram otomatis mengirim ringkasan mutasi terformat setiap pukul 08.00. Staf hemat 8 jam/minggu, manajemen dapat info real-time."
        },
        {
            "title": "Integrasi Data Multi-Platform Distributor",
            "before": "Data penjualan dari Tokopedia, Shopee, dan web sendiri dikumpulkan manual lewat copy-paste ke Excel. Sering tidak sinkron, laporan bulanan telat 1 minggu.",
            "after": "Pipeline otomatis menyatukan data 3 platform setiap 1 jam. Laporan penjualan harian akurat tanpa intervensi manusia, keputusan restok lebih cepat."
        }
    ]
    
    return render_template("index.html", services=services, cases=cases)

@main_bp.route("/animation")
def animation():
    return render_template("animation.html")
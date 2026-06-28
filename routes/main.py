# routes/main.py
from flask import Blueprint, render_template

main_bp = Blueprint("main", __name__)

@main_bp.route("/")
def home():
    services = [
        {
            "id": "analytics",
            "title": "Data Analytics",
            "icon": '<svg class="w-10 h-10 text-mint" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M3 3v18h18M7 16l4-4 4 4 5-5"/></svg>',
            "desc": "Dashboard interaktif, laporan analisis statistik, dan visualisasi data yang langsung bisa dipakai mengambil keputusan bisnis, bukan sekadar grafik cantik.",
            "details": ["Dashboard real-time", "Analisis statistik kuantitatif", "Visualisasi custom (bukan template)", "Laporan otomatis PDF/PPT"]
        },
        {
            "id": "engineering",
            "title": "Data Engineering",
            "icon": '<svg class="w-10 h-10 text-mint" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M4 7v10c0 2 1 3 3 3h10c2 0 3-1 3-3V7M4 7c0-2 1-3 3-3h10c2 0 3 1 3 3M4 7h16M9 11h6"/></svg>',
            "desc": "Pipeline data yang merapikan alur dari sumber (database, API, spreadsheet) ke satu sistem terpadu. Tidak ada lagi copy-paste data antar platform.",
            "details": ["Integrasi multi-sumber (API, DB, Sheet)", "Database design & optimasi", "Pipeline otomatis (Airflow/dbt)", "Data warehouse sederhana"]
        },
        {
            "id": "automation",
            "title": "Process Automation",
            "icon": '<svg class="w-10 h-10 text-mint" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M13 10V3L4 14h7v7l9-11h-7z"/></svg>',
            "desc": "Otomatisasi proses manual yang menghabiskan waktu: laporan rutin, notifikasi, hingga bot WhatsApp/Telegram untuk tim Anda.",
            "details": ["Bot WhatsApp / Telegram", "Otomatisasi laporan harian/mingguan", "Web app custom (ringan)", "Integrasi notifikasi real-time"]
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
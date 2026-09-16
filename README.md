# TodoApp - Aplikasi Manajemen Tugas Modern

Aplikasi To-Do List yang modern dan responsive dengan fitur local storage untuk menyimpan data di browser.

## ✨ Fitur Utama

### 📝 Manajemen Tugas
- ✅ Tambah tugas baru dengan mudah
- 🎯 Prioritas tugas (Rendah, Sedang, Tinggi)
- 📅 Tenggat waktu untuk setiap tugas
- ✔️ Tandai tugas sebagai selesai
- ✏️ Edit tugas yang ada
- 🗑️ Hapus tugas individual

### 🔍 Filter & Pencarian
- 📋 Filter: Semua, Pending, Selesai, Prioritas Tinggi
- 📊 Statistik real-time (Total, Selesai, Pending)
- 🔄 Urutkan berdasarkan prioritas atau waktu

### 💾 Penyimpanan Data
- 💿 Local Storage untuk penyimpanan data persisten
- 📥 Export tugas ke file JSON
- 📤 Import tugas dari file JSON
- 🔄 Backup dan restore otomatis

### 🎨 Desain Modern
- 🌙 Dark theme yang elegan
- 📱 Responsive design (mobile, tablet, desktop)
- 🎬 Animasi smooth
- 🌈 Gradient colors dan visual effects
- ⚡ Interface intuitif dan user-friendly

## 🚀 Cara Menggunakan

### Instalasi

1. Clone repository
```bash
git clone https://github.com/saskamods/todo-list-app.git
cd todo-list-app
```

2. Buka file `index.html` di browser
```bash
# Menggunakan live server (VSCode)
open index.html

# Atau buka langsung di browser
file:///path/to/todo-list-app/index.html
```

### Penggunaan Aplikasi

#### Menambah Tugas
1. Ketik tugas Anda di input field
2. Pilih prioritas (Rendah, Sedang, Tinggi)
3. Klik tombol "Tambah" atau tekan Enter
4. Atau gunakan tombol Quick Add untuk tugas cepat

#### Menyelesaikan Tugas
1. Centang checkbox di sebelah tugas
2. Tugas akan berubah status menjadi "Selesai"
3. Atau klik tombol Filter "Selesai" untuk melihat tugas yang selesai

#### Mengedit Tugas
1. Klik tombol Edit (🖊️) pada tugas
2. Ubah teks, prioritas, atau tenggat waktu
3. Klik "Simpan Perubahan"

#### Menghapus Tugas
1. Klik tombol Hapus (🗑️) pada tugas
2. Konfirmasi penghapusan
3. Tugas akan dihapus dari daftar

#### Filter & Urutkan
1. Gunakan tombol Filter untuk melihat tugas spesifik
2. Klik tombol Urutkan untuk mengubah urutan (Prioritas/Waktu)

#### Export & Import
- **Export**: Klik "Download" untuk mengunduh semua tugas dalam format JSON
- **Import**: Klik "Upload" dan pilih file JSON yang sudah pernah diexport

## 🛠️ Fitur Technical

### Local Storage Implementation
```javascript
// Menyimpan data
localStorage.setItem('todoTasks', JSON.stringify(tasks));

// Mengambil data
const tasks = JSON.parse(localStorage.getItem('todoTasks'));
```

### Struktur Data Task
```javascript
{
    id: 1234567890,           // Timestamp unik
    text: "Nama tugas",       // Deskripsi tugas
    priority: "medium",       // low, medium, high
    completed: false,         // Status penyelesaian
    createdAt: "16 Sep 2024", // Waktu dibuat
    dueDate: "2024-09-20"     // Tenggat waktu (opsional)
}
```

## 📁 Struktur File

```
todo-list-app/
├── index.html      # File HTML utama
├── styles.css      # Stylesheet (dark theme)
├── script.js       # JavaScript (logika aplikasi)
└── README.md       # Dokumentasi
```

## 🎨 Palet Warna

```css
--primary-color: #6366f1      (Indigo)
--secondary-color: #8b5cf6    (Purple)
--accent-color: #ec4899       (Pink)
--success-color: #10b981      (Green)
--warning-color: #f59e0b      (Amber)
--danger-color: #ef4444       (Red)
--dark-bg: #0f172a            (Dark Blue)
--card-bg: #1e293b            (Slate)
--text-light: #e2e8f0         (Light Gray)
--text-muted: #94a3b8         (Muted Gray)
```

## 📱 Responsive Breakpoints

- **Desktop**: > 768px
- **Tablet**: 568px - 768px  
- **Mobile**: < 568px

## 🔄 Fitur Priority

### Priority Levels
- 🟢 **Rendah** - Tugas yang bisa ditunda
- 🟡 **Sedang** - Tugas reguler (default)
- 🔴 **Tinggi** - Tugas yang mendesak

### Visual Indicators
- Border warna berbeda untuk setiap prioritas
- Badge pada setiap tugas menunjukkan prioritas
- Urutkan otomatis berdasarkan prioritas

## 💡 Tips & Trik

1. **Quick Add Buttons**: Gunakan tombol quick add untuk tugas yang sering diulangi
2. **Export Reguler**: Export tugas Anda secara berkala untuk backup
3. **Filter View**: Gunakan filter untuk fokus pada tugas spesifik
4. **Prioritas**: Tetapkan prioritas tinggi untuk tugas penting
5. **Tenggat Waktu**: Gunakan fitur due date untuk tracking deadline

## 🐛 Troubleshooting

### Data tidak tersimpan
- Pastikan browser mendukung Local Storage
- Cek apakah cookies/storage tidak diblokir
- Clear cache dan refresh halaman

### File import tidak bekerja
- Pastikan file dalam format JSON yang valid
- File harus merupakan hasil export dari aplikasi ini
- Cek console browser untuk error messages

## 🔐 Privacy & Storage

- **Semua data disimpan di browser lokal** (tidak ada server)
- Data tidak pernah dikirim ke internet
- Local Storage menyimpan hingga ~5-10MB per domain
- Data tetap ada meskipun browser ditutup
- Clear browser cache akan menghapus data

## 📈 Rencana Pengembangan

- [ ] Dark/Light mode toggle
- [ ] Kategori tugas
- [ ] Recurring tasks
- [ ] Reminders & notifications
- [ ] Search functionality
- [ ] Cloud sync (Firebase/Supabase)
- [ ] Multi-user support
- [ ] Mobile app version
- [ ] Voice input
- [ ] Time tracking

## 🤝 Kontribusi

Kontribusi sangat diterima! Silakan:

1. Fork repository
2. Buat branch untuk fitur Anda (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add some AmazingFeature'`)
4. Push ke branch (`git push origin feature/AmazingFeature`)
5. Buat Pull Request

## 📄 Lisensi

Proyek ini dilisensikan di bawah MIT License - lihat file LICENSE untuk detail.

## 👨‍💻 Author

Dibuat oleh **saskamods**

---

**Terima kasih telah menggunakan TodoApp! Jadilah produktif! 🚀**
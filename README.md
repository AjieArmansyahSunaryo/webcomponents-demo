# Hands-on: Web Components

Implementasi tiga komponen **Web Components** sesuai instruksi tugas dosen.

---

## Komponen yang Diimplementasikan

1. **Komponen 1 & 2**  
   - `<counter-display>` → menampilkan nilai.  
   - `<counter-controls>` → tombol **− / + / Reset**, terhubung melalui event `count-change`.

2. **Komponen 3 (gabungan)**  
   - `<combined-counter>` → menggabungkan display & controls dalam satu komponen mandiri.

3. **Komponen 1 & 2 Varian B**  
   - `<counter-display-b>` dan `<counter-controls-b>` → komunikasi melalui atribut `target` tanpa event.

4. **Komponen Custom Identitas**  
   - `<identity-badge>` → menampilkan **Nama dan NIM** sebagai custom component.

---

## Fitur Utama

- **Tombol fungsional**: − / + / Reset.  
- **Tekan-tahan (press/hold)** untuk auto-repeat.  
- **Hint keyboard** di setiap kontrol:  
  `Keyboard: +/-, 0 untuk reset. Tahan tombol untuk repeat.`  
- **UI gelap** (dark theme), responsif, dan rapi.  

---

## Struktur Proyek

```plaintext
webcomponents-demo/
├── index.html
├── counter-display.js          # Komponen 1
├── counter-controls.js         # Komponen 2
├── combined-counter.js         # Komponen 3 (gabungan)
├── counter-display-b.js        # Varian B - display
├── counter-controls-b.js       # Varian B - controls (target attribute)
└── identity-badge.js           # Komponen identitas (Nama & NIM)

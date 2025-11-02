Nama: Ajie Armansyah Sunaryo
NIM: 24/545286/PA/23170

# Hands-on: Web Components

## Implementasi tiga komponen Web Components:
1. Komponen 1 & 2 – <counter-display> (menampilkan nilai) + <counter-controls> (tombol − / + / Reset) terhubung via event.
2. Komponen 3 (gabungan) – <combined-counter> yang menggabungkan display & controls dalam satu komponen.
3. Komponen 1 & 2 Varian B – <counter-controls-b> mengontrol <counter-display-b> via atribut target.

## Struktur:
webcomponents-demo/
├── index.html
├── counter-display.js          # Komponen 1
├── counter-controls.js         # Komponen 2
├── combined-counter.js         # Komponen 3 (gabungan)
├── counter-display-b.js        # Varian B - display
├── counter-controls-b.js       # Varian B - controls (target attribute)
└── identity-badge.js           # Custom komponen identitas (Nama & NIM)

## Fitur & Catatan:
- Tombol: − / + / Reset, dengan press/hold (tahan = auto-repeat).
- Hint Keyboard: + / -, 0 untuk reset (ditampilkan di tiap kontrol).
- Encapsulation: semua komponen memakai Shadow DOM.
- Identitas: gunakan komponen <identity-badge> untuk menampilkan Nama & NIM.

## Cara pakai (lokal):
Buka index.html langsung di browser.

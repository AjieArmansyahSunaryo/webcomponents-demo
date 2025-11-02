class CounterDisplayB extends HTMLElement {
  static get observedAttributes() { return ['title', 'value', 'storage-key']; }
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    const title = this.getAttribute('title') || 'Title';
    const value = Number.parseInt(this.getAttribute('value')) || 0;
    this.shadowRoot.innerHTML = `
      <style>
        .display {
          background: linear-gradient(180deg, #fca5a5, #ef8891);
          color: #111827;
          padding: 12px;
          border: 1px solid #000;
          font-family: inherit;
          border-radius: 12px;
          box-shadow: inset 0 1px 0 rgba(255,255,255,.6);
        }
        .title { font-size: .9rem; margin-bottom: 4px; opacity: .85; }
        .value { font-size: 1rem; }
        .number { font-weight: 800; }
        .bump { animation: bump .22s ease; display:inline-block; }
        @keyframes bump { 0%{ transform: scale(1); } 40%{ transform: scale(1.18);} 100%{ transform: scale(1);} }
      </style>
      <div class="display">
        <div class="title">${title}</div>
        <div class="value">Value: <span class="number">${value}</span></div>
      </div>
    `;
  }

  connectedCallback() {
    const k = this.getAttribute('storage-key');
    if (k) {
      const saved = window.localStorage.getItem(k);
      if (saved !== null && !Number.isNaN(Number(saved))) this.count = Number(saved);
    }
  }

  attributeChangedCallback(name, oldVal, newVal) {
    if (name === 'value' && oldVal !== newVal) this.count = Number(newVal || 0);
  }

  set count(val) {
    this._value = Number(val) || 0;
    const n = this.shadowRoot.querySelector('.number');
    if (n) {
      n.textContent = this._value;
      n.classList.remove('bump');
      void n.offsetWidth;
      n.classList.add('bump');
    }
    const k = this.getAttribute('storage-key');
    if (k) window.localStorage.setItem(k, String(this._value));
  }
  get count() { return this._value ?? 0; }
}
customElements.define('counter-display-b', CounterDisplayB);

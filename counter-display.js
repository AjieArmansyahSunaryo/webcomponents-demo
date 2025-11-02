class CounterDisplay extends HTMLElement {
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
        .sr-only { position:absolute; left:-9999px; }
      </style>
      <div class="display" part="container">
        <div class="title" part="title">${title}</div>
        <div class="value" aria-live="polite" role="status" part="value">
          Value: <span class="number" part="number">${value}</span>
        </div>
        <span class="sr-only" id="a11yValue">${value}</span>
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
    if (name === 'title') {
      const t = this.shadowRoot.querySelector('.title');
      if (t) t.textContent = newVal || 'Title';
    }
  }

  set count(val) {
    this._value = Number(val) || 0;
    const n = this.shadowRoot.querySelector('.number');
    const a11y = this.shadowRoot.getElementById('a11yValue');
    if (n) {
      n.textContent = this._value;
      n.classList.remove('bump');
      void n.offsetWidth;
      n.classList.add('bump');
    }
    if (a11y) a11y.textContent = this._value;

    const k = this.getAttribute('storage-key');
    if (k) window.localStorage.setItem(k, String(this._value));
  }

  get count() { return this._value ?? (Number(this.getAttribute('value')) || 0); }
}
customElements.define('counter-display', CounterDisplay);

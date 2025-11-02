class CombinedCounter extends HTMLElement {
  static get observedAttributes() { return ['title', 'value', 'storage-key', 'step', 'min', 'max', 'sound']; }

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    const title = this.getAttribute('title') || 'Title';
    const value = Number.parseInt(this.getAttribute('value')) || 0;

    const stepAttr = this.hasAttribute('step') ? ` step="${this.getAttribute('step')}"` : '';
    const minAttr  = this.hasAttribute('min')  ? ` min="${this.getAttribute('min')}"`   : '';
    const maxAttr  = this.hasAttribute('max')  ? ` max="${this.getAttribute('max')}"`   : '';
    const soundAttr = this.hasAttribute('sound') ? ' sound' : '';
    const storage = this.getAttribute('storage-key') || '';

    this.shadowRoot.innerHTML = `
      <style>
        .wrapper {
          border: 1px solid #000;
          padding: 10px;
          width: 100%;
          font-family: inherit;
          border-radius: 14px;
          background:#0b1220;
        }
        counter-display { display:block; margin-bottom: 10px; }
        .hint { color:#94a3b8; font-size:.85rem; margin-top:6px; }
      </style>
      <div class="wrapper">
        <counter-display id="display" title="${title}" value="${value}" storage-key="${storage}"></counter-display>
        <counter-controls id="controls"${stepAttr}${minAttr}${maxAttr}${soundAttr}></counter-controls>
</div>
    `;
  }

  connectedCallback() {
    const display = this.shadowRoot.getElementById('display');
    const controls = this.shadowRoot.getElementById('controls');
    const clamp = (v, min, max) => Math.min(max, Math.max(min, v));

    controls.addEventListener('count-change', e => {
      const { delta, min = -Infinity, max = Infinity } = e.detail || {};
      const next = clamp(display.count + delta, min, max);
      display.count = next;
    });
    controls.addEventListener('set-count', e => {
      const { value } = e.detail || { value: 0 };
      display.count = value;
    });
  }
}
customElements.define('combined-counter', CombinedCounter);

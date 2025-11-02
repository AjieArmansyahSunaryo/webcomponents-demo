class IdentityBadge extends HTMLElement {
  static get observedAttributes() { return ['name', 'nim']; }
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    const name = this.getAttribute('name') || 'Nama Anda';
    const nim = this.getAttribute('nim') || 'NIM Anda';
    this.shadowRoot.innerHTML = `
      <style>
        .badge {
          display:flex; align-items:center; gap:10px;
          background: radial-gradient(1200px 1200px at -10% -50%, rgba(59,130,246,.25), transparent),
                      radial-gradient(1000px 1000px at 120% 120%, rgba(236,72,153,.25), transparent);
          border: 1px solid #1f2937; padding:10px 14px; border-radius: 999px;
          box-shadow: 0 10px 30px rgba(0,0,0,.3);
          font-family: inherit;
        }
        .avatar {
          inline-size: 36px; block-size: 36px; border-radius: 999px;
          background: #6366f1; display:grid; place-items:center; color:#fff; font-weight: 800;
          box-shadow: 0 6px 15px rgba(79,70,229,.45);
        }
        .meta { display:flex; flex-direction:column; line-height:1.1; }
        .name { font-weight: 700; }
        .nim { color:#93a3b8; font-size: .9rem; }
      </style>
      <div class="badge" role="contentinfo" aria-label="Identitas Mahasiswa">
        <div class="avatar"></div>
        <div class="meta"><div class="name"></div><div class="nim"></div></div>
      </div>
    `;
    this._apply(name, nim);
  }
  attributeChangedCallback() {
    this._apply(this.getAttribute('name') || 'Nama Anda', this.getAttribute('nim') || 'NIM Anda');
  }
  _apply(name, nim) {
    const initials = name.split(' ').filter(Boolean).slice(0,2).map(s => s[0].toUpperCase()).join('') || 'ID';
    this.shadowRoot.querySelector('.avatar').textContent = initials;
    this.shadowRoot.querySelector('.name').textContent = name;
    this.shadowRoot.querySelector('.nim').textContent = nim;
  }
}
customElements.define('identity-badge', IdentityBadge);

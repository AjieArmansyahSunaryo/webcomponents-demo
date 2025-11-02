
class CounterControlsB extends HTMLElement {
  static get observedAttributes() { return ['target','step','min','max']; }
  constructor(){
    super();
    this.attachShadow({mode:'open'});
    this._step=1; this._min=-Infinity; this._max=Infinity;
    this.shadowRoot.innerHTML=`
      <style>
        .controls{display:block;border:1px solid #000;background:#111827;padding:8px;border-radius:12px;width:100%;box-sizing:border-box;}
        .row{display:flex;gap:8px;}
        button{flex:1;background:#0b1220;color:#e5e7eb;border:1px solid #1f2937;border-radius:10px;font-size:1rem;height:38px;cursor:pointer;}
        button:hover{background:#0f172a;}
        .hint{color:#94a3b8;font-size:.85rem;margin-top:6px}
      </style>
      <div class="controls" tabindex="0" aria-label="Counter controls (targeted)">
        <div class="row">
          <button id="minus" aria-label="Kurangi">-</button>
          <button id="plus" aria-label="Tambah">+</button>
          <button id="reset" aria-label="Reset">Reset</button>
        </div>
        <div class="hint">Keyboard: +/-, 0 untuk reset. Tahan tombol untuk repeat.</div>
      </div>`;
  }
  connectedCallback(){
    const targetId=this.getAttribute('target');
    const target=()=>document.getElementById(targetId);
    const clamp=(v)=>Math.min(this._max,Math.max(this._min,v));
    const setVal=(v)=>{ const t=target(); if(t) t.count=clamp(v); };
    const add=(d)=>{ const t=target(); if(t) setVal(t.count + d); };

    const $=s=>this.shadowRoot.querySelector(s);
    const plus=$('#plus'), minus=$('#minus'), reset=$('#reset');

    const pressHold=(btn,sign)=>{
      let repeating=false, holdTimer=null, repeatTimer=null;
      const onDown=(e)=>{ btn.setPointerCapture?.(e.pointerId||1);
        holdTimer=setTimeout(()=>{repeating=true; repeatTimer=setInterval(()=>add(sign*(this._step||1)),110);},260); };
      const clear=()=>{ clearTimeout(holdTimer); holdTimer=null; clearInterval(repeatTimer); repeatTimer=null; repeating=false; };
      const onUp=()=>{ if(!repeating) add(sign*(this._step||1)); clear(); };
      btn.addEventListener('pointerdown',onDown);
      btn.addEventListener('pointerup',onUp);
      btn.addEventListener('pointerleave',clear);
      btn.addEventListener('blur',clear);
    };
    pressHold(plus,+1);
    pressHold(minus,-1);
    reset.addEventListener('click',()=>setVal(0));

    this.shadowRoot.querySelector('.controls').addEventListener('keydown',(e)=>{
      if(e.key==='+'||e.key==='='){e.preventDefault(); add(+ (this._step||1));}
      else if(e.key==='-'){e.preventDefault(); add(- (this._step||1));}
      else if(e.key==='0'){e.preventDefault(); setVal(0);}
    });
  }
  attributeChangedCallback(name,ov,nv){
    if(name==='step') this._step=Math.max(1,Number(nv)||1);
    if(name==='min') this._min=nv!==null?Number(nv):-Infinity;
    if(name==='max') this._max=nv!==null?Number(nv):Infinity;
  }
}
customElements.define('counter-controls-b', CounterControlsB);


class CounterControls extends HTMLElement {
  static get observedAttributes() { return ['step','min','max']; }
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
      <div class="controls" tabindex="0" aria-label="Counter controls">
        <div class="row">
          <button id="minus" aria-label="Kurangi">-</button>
          <button id="plus" aria-label="Tambah">+</button>
          <button id="reset" aria-label="Reset">Reset</button>
        </div>
        <div class="hint">Keyboard: +/-, 0 untuk reset. Tahan tombol untuk repeat.</div>
      </div>`;
  }
  connectedCallback(){
    const $=s=>this.shadowRoot.querySelector(s);
    const plus=$('#plus'), minus=$('#minus'), reset=$('#reset');
    const single=(sign)=>{
      const delta=sign*(this._step||1);
      this.dispatchEvent(new CustomEvent('count-change',{detail:{delta,min:this._min,max:this._max},bubbles:true,composed:true}));
    };
    const pressHold=(btn,sign)=>{
      let repeating=false, holdTimer=null, repeatTimer=null;
      const onDown=(e)=>{ btn.setPointerCapture?.(e.pointerId||1);
        holdTimer=setTimeout(()=>{repeating=true; repeatTimer=setInterval(()=>single(sign),110);},260); };
      const clear=()=>{ clearTimeout(holdTimer); holdTimer=null; clearInterval(repeatTimer); repeatTimer=null; repeating=false; };
      const onUp=()=>{ if(!repeating) single(sign); clear(); };
      btn.addEventListener('pointerdown',onDown);
      btn.addEventListener('pointerup',onUp);
      btn.addEventListener('pointerleave',clear);
      btn.addEventListener('blur',clear);
    };
    pressHold(plus,+1);
    pressHold(minus,-1);
    reset.addEventListener('click',()=>{
      this.dispatchEvent(new CustomEvent('set-count',{detail:{value:0},bubbles:true,composed:true}));
    });
    this.shadowRoot.querySelector('.controls').addEventListener('keydown',(e)=>{
      if(e.key==='+'||e.key==='='){e.preventDefault(); single(+1);}
      else if(e.key==='-'){e.preventDefault(); single(-1);}
      else if(e.key==='0'){e.preventDefault(); reset.click();}
    });
  }
  attributeChangedCallback(name,ov,nv){
    if(name==='step') this._step=Math.max(1,Number(nv)||1);
    if(name==='min') this._min=nv!==null?Number(nv):-Infinity;
    if(name==='max') this._max=nv!==null?Number(nv):Infinity;
  }
}
customElements.define('counter-controls', CounterControls);

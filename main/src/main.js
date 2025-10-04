import './styles.css';

// ---------------------------------------------------------
// UI TEMPLATE
// ---------------------------------------------------------
const app = document.getElementById('app');
app.innerHTML = `
  <div class="container">
    <div class="title">Panel akcji — wybierz jedną decyzję na ten rok</div>
    <p class="hint">Decyzja wpływa na <strong>zdrowie</strong>, <strong>szczęście</strong> i <strong>oszczędności</strong>. Podglądaj w skali roku lub miesiąca.</p>

    <section class="panel" role="radiogroup" aria-label="Wybór akcji na ten rok">
      <div class="scenario" style="grid-column:1/-1;display:flex;align-items:flex-start;gap:12px;justify-content:space-between;">
        <div>
          <div style="display:flex;align-items:center;gap:8px;margin-bottom:4px;">
            <span style="display:inline-block;width:8px;height:8px;border-radius:999px;background:var(--accent-2);"></span>
            <strong>Scenariusz: Równowaga życiowa</strong>
          </div>
          <div style="color:var(--muted);font-size:13px;">Cel: średnie <strong>szczęście ≥ 70</strong>, brak lat z <strong>zdrowie &lt; 30</strong>, oszczędności ≥ 0.</div>
        </div>
        <div class="unit-toggle" aria-label="Przełącz jednostki wpływu">
          <button class="chip" id="unitYear" data-active="true" type="button">Rocznie</button>
          <button class="chip" id="unitMonth" data-active="false" type="button">Miesięcznie</button>
        </div>
      </div>

      <div class="cards" id="cards">
        <!-- KARTA A -->
        <article class="card" id="card-a" role="radio" tabindex="0" aria-checked="false" aria-labelledby="a-title">
          <div class="hs" data-rarity="epic">
            <div class="ribbon risk">Ryzyko ↑</div>
            <div class="flip">
              <div class="face front">
                <div class="radio" aria-hidden="true"></div>
                <div class="hs-header">
                  <div class="mana">2</div>
                  <span class="badge" data-cat="PRACA" aria-hidden="true">PRACA</span>
                </div>
                <div class="art" aria-hidden="true"></div>
                <div class="title-row"><h3 id="a-title">Pracuj nadgodziny</h3></div>
                <p>Większy dochód kosztem zdrowia i satysfakcji.</p>
                <div class="impact" id="impact-a" aria-label="Wpływ"></div>
              </div>
              <div class="face back">
                <div style="font-size:42px">✅</div>
                <div>Decyzja przyjęta</div>
              </div>
            </div>
          </div>
        </article>

        <!-- KARTA B -->
        <article class="card" id="card-b" role="radio" tabindex="0" aria-checked="false" aria-labelledby="b-title">
          <div class="hs" data-rarity="rare">
            <div class="ribbon wellbeing">Well-being ↑</div>
            <div class="flip">
              <div class="face front">
                <div class="radio" aria-hidden="true"></div>
                <div class="hs-header">
                  <div class="mana">1</div>
                  <span class="badge" data-cat="ZDROWIE" aria-hidden="true">ZDROWIE</span>
                </div>
                <div class="art" aria-hidden="true"></div>
                <div class="title-row"><h3 id="b-title">Zadbaj o zdrowie i bliskich</h3></div>
                <p>Odpoczynek i aktywność. Mniej środków teraz, lepszy dobrostan.</p>
                <div class="impact" id="impact-b" aria-label="Wpływ"></div>
              </div>
              <div class="face back">
                <div style="font-size:42px">✅</div>
                <div>Decyzja przyjęta</div>
              </div>
            </div>
          </div>
        </article>

        <!-- KARTA LOSOWA (PUŁAPKA) -->
        <article class="card trap-pop hidden" id="card-trap" aria-label="Wydarzenie losowe — pułapka" tabindex="0">
          <div class="hs" data-rarity="legendary">
            <div class="ribbon risk">Pułapka</div>
            <div class="flip">
              <div class="face front">
                <div class="radio" aria-hidden="true"></div>
                <div class="hs-header">
                  <div class="mana">?</div>
                  <span class="badge" data-cat="PUŁAPKA" aria-hidden="true">PUŁAPKA</span>
                </div>
                <div class="art" aria-hidden="true"></div>
                <div class="title-row"><h3>Wydarzenie losowe</h3></div>
                <p>Kliknij, aby odkryć efekt.</p>
                <div class="impact" id="impact-trap" aria-label="Wpływ">???</div>
              </div>
              <div class="face back">
                <div style="font-size:36px" id="trap-emoji">⚠️</div>
                <div id="trap-result">Zdarzenie!</div>
              </div>
            </div>
          </div>
        </article>
      </div>

      <div class="actions">
        <div class="summary" id="summary">Wybierz kartę — akceptacja nastąpi natychmiast.</div>
        <div><button class="btn ghost" id="resetBtn" type="button">Reset</button></div>
      </div>
    </section>
  </div>

  <div class="timeline-wrap">
    <div class="timeline" aria-label="Oś życia">
      <div class="axis" id="axis">
        <div class="tick" style="left: 13.5%"></div><div class="tick-label" style="left: 13.5%">30</div>
        <div class="tick" style="left: 43.2%"></div><div class="tick-label" style="left: 43.2%">50</div>
        <div class="ret-line" id="retTick" style="left: 63.5%"></div>
        <div class="ret-label" id="retLabel" style="left: 63.5%">65 → Emerytura</div>
        <div class="marker" id="marker" style="left: 0%" aria-label="Aktualny wiek">👤</div>
      </div>
      <div class="labels"><span id="startLbl">18</span><span id="endLbl">RIP →</span></div>
      <div style="position: relative; height: 26px; max-width: 1000px; margin: 2px auto 0;">
        <div class="phase-label" style="left: 3%">Młodość</div>
        <div class="phase-label" style="left: 23%">Wczesna dorosłość</div>
        <div class="phase-label" style="left: 53%">Późna dorosłość</div>
        <div class="phase-label" style="left: 73%">Wczesna starość</div>
        <div class="phase-label" style="left: 92%">Późna starość</div>
      </div>
      <div class="age-ctrl">
        <button type="button" id="minusYr">−1 rok</button>
        <button type="button" id="plusYr">+1 rok</button>
      </div>
    </div>
  </div>
`;

// ---------------------------------------------------------
// STAN (makieta front-only, zgodna z dokumentem)
// ---------------------------------------------------------
const state = {
  age: 18, startAge: 18, maxAge: 90, retirementAge: 65,
  health: 80, happiness: 70, savings: 5000,
  selected: null, unit: 'year', // 'year' | 'month'
};

const impactsYear = {
  a: { savings: +6000, health: -5, happiness: -3 },
  b: { savings: -2000, health: +8, happiness: +6 },
};

// ---------------------------------------------------------
// ELEMENTY
// ---------------------------------------------------------
const el = {
  cards: { a: document.getElementById('card-a'), b: document.getElementById('card-b') },
  impact: { a: document.getElementById('impact-a'), b: document.getElementById('impact-b') },
  summary: document.getElementById('summary'),
  reset: document.getElementById('resetBtn'),
  marker: document.getElementById('marker'),
  retTick: document.getElementById('retTick'),
  retLabel: document.getElementById('retLabel'),
  minusYr: document.getElementById('minusYr'),
  plusYr: document.getElementById('plusYr'),
  unitYear: document.getElementById('unitYear'),
  unitMonth: document.getElementById('unitMonth'),
  trap: {
    card: document.getElementById('card-trap'),
    backText: document.getElementById('trap-result'),
    backEmoji: document.getElementById('trap-emoji'),
  }
};

// ---------------------------------------------------------
// UTILS
// ---------------------------------------------------------
const clamp = (v,min,max)=> Math.max(min, Math.min(max, v));
const span = ()=> state.maxAge - state.startAge;
const pctAge = ()=> ((state.age - state.startAge) / span()) * 100;
const pctRet = ()=> ((state.retirementAge - state.startAge) / span()) * 100;

function updateTimeline(){
  el.marker.style.left = `${clamp(pctAge(), 0, 100)}%`;
  const pr = clamp(pctRet(), 0, 100);
  el.retTick.style.left = `${pr}%`;
  el.retLabel.style.left = `${pr}%`;
}

function getImpacts(){
  if (state.unit === 'year') return impactsYear;
  return {
    a: { savings: Math.round(impactsYear.a.savings/12), health: +(impactsYear.a.health/12).toFixed(1), happiness: +(impactsYear.a.happiness/12).toFixed(1) },
    b: { savings: Math.round(impactsYear.b.savings/12), health: +(impactsYear.b.health/12).toFixed(1), happiness: +(impactsYear.b.happiness/12).toFixed(1) },
  };
}

function renderCardImpacts(){
  const imp = getImpacts();
  const unitLbl = state.unit === 'year' ? 'rok' : 'm-c';
  const fmt = (v, kind) => kind==='savings'
    ? `${v>0?'+':''}${v.toLocaleString('pl-PL')} zł/${unitLbl}`
    : `${v>0?'+':''}${v} ${kind==='health'?'zdrowie':'szczęście'}`;
  el.impact.a.innerHTML = `
    <span class="${imp.a.savings>=0?'pos':'neg'}">${fmt(imp.a.savings,'savings')}</span>
    <span class="${imp.a.health>=0?'pos':'neg'}">${fmt(imp.a.health,'health')}</span>
    <span class="${imp.a.happiness>=0?'pos':'neg'}">${fmt(imp.a.happiness,'happiness')}</span>`;
  el.impact.b.innerHTML = `
    <span class="${imp.b.savings>=0?'pos':'neg'}">${fmt(imp.b.savings,'savings')}</span>
    <span class="${imp.b.health>=0?'pos':'neg'}">${fmt(imp.b.health,'health')}</span>
    <span class="${imp.b.happiness>=0?'pos':'neg'}">${fmt(imp.b.happiness,'happiness')}</span>`;
}

function formatImpactSummary(i){
  const unitLbl = state.unit === 'year' ? 'rok' : 'm-c';
  const parts = [];
  if (i.savings) parts.push(`${i.savings>0?'+':''}${i.savings.toLocaleString('pl-PL')} zł/${unitLbl}`);
  if (i.health) parts.push(`${i.health>0?'+':''}${i.health} zdrowie`);
  if (i.happiness) parts.push(`${i.happiness>0?'+':''}${i.happiness} szczęście`);
  return parts.join(', ');
}

function refreshSummary(){
  if (!state.selected){ el.summary.textContent = 'Wybierz kartę — akceptacja nastąpi natychmiast.'; return; }
  const i = getImpacts()[state.selected];
  el.summary.innerHTML = `Wybrano: <strong>${state.selected==='a'?'Pracuj nadgodziny':'Zadbaj o zdrowie i bliskich'}</strong> · Wpływ: ${formatImpactSummary(i)}`;
}

function setSelected(which){
  state.selected = which;
  el.cards.a.setAttribute('aria-checked', which==='a' ? 'true':'false');
  el.cards.b.setAttribute('aria-checked', which==='b' ? 'true':'false');
  refreshSummary();
}

function applyDecision(){
  const iYear = impactsYear[state.selected];
  if (!iYear) return;
  state.savings = Math.max(0, state.savings + (iYear.savings || 0));
  state.health = clamp(state.health + (iYear.health || 0), 0, 100);
  state.happiness = clamp(state.happiness + (iYear.happiness || 0), 0, 100);
  state.age = clamp(state.age + 1, state.startAge, state.maxAge);
  updateTimeline();
  el.summary.innerHTML = `Zastosowano decyzję. Wiek: <strong>${state.age}</strong> · Zdrowie: <strong>${state.health}</strong> · Szczęście: <strong>${state.happiness}</strong> · Oszczędności: <strong>${state.savings.toLocaleString('pl-PL')} zł</strong>`;
  setSelected(null);
  spawnTrap(0.45);
}

// ---------------------------------------------------------
// PUŁAPKA (losowa karta)
// ---------------------------------------------------------
const trap = {
  el: el.trap.card,
  backText: el.trap.backText,
  backEmoji: el.trap.backEmoji,
  visible: false,
  hideTimeout: null,
};

const trapOutcomes = [
  { label: 'Mandat za prędkość', emoji: '🚓', impact: { savings: -500, happiness: -2 } },
  { label: 'Choroba sezonowa', emoji: '🤒', impact: { health: -10, happiness: -3, savings: -200 } },
  { label: 'Awaria auta', emoji: '🛠️', impact: { savings: -2000, happiness: -2 } },
  { label: 'Zwrot podatku', emoji: '💸', impact: { savings: +1500, happiness: +2 } },
];

function showTrap(){
  if (trap.visible) return;
  trap.el.classList.remove('hidden');
  trap.visible = true;
  clearTimeout(trap.hideTimeout);
  trap.hideTimeout = setTimeout(()=> hideTrap(), 8000);
}
function hideTrap(){
  trap.el.classList.add('hidden');
  trap.visible = false;
}
function spawnTrap(prob=0.45){ if (Math.random() < prob) showTrap(); }

function applyTrapOutcome(){
  const o = trapOutcomes[Math.floor(Math.random()*trapOutcomes.length)];
  trap.backText.textContent = `${o.label}`;
  trap.backEmoji.textContent = o.emoji;
  const node = trap.el.querySelector('.hs');
  node.classList.add('accept');
  const imp = o.impact;
  state.savings = Math.max(0, state.savings + (imp.savings||0));
  state.health = clamp(state.health + (imp.health||0), 0, 100);
  state.happiness = clamp(state.happiness + (imp.happiness||0), 0, 100);
  el.summary.innerHTML = `Wydarzenie losowe: <strong>${o.label}</strong> · Wpływ: ${formatImpactSummary({
    savings: imp.savings||0, health: imp.health||0, happiness: imp.happiness||0
  })}`;
  setTimeout(()=>{ node.classList.remove('accept'); hideTrap(); }, 900);
}

// ---------------------------------------------------------
// ZDARZENIA
// ---------------------------------------------------------
function instantAccept(which){
  setSelected(which);
  const node = which==='a' ? el.cards.a.querySelector('.hs') : el.cards.b.querySelector('.hs');
  node.classList.add('accept');
  setTimeout(()=>{ applyDecision(); node.classList.remove('accept'); }, 520);
}

el.cards.a.addEventListener('click', () => instantAccept('a'));
el.cards.b.addEventListener('click', () => instantAccept('b'));
el.reset.addEventListener('click', () => setSelected(null));
trap.el.addEventListener('click', ()=> { if (trap.visible) applyTrapOutcome(); });

// Jednostki
function setUnit(u){
  state.unit = u;
  document.getElementById('unitYear').dataset.active = (u==='year');
  document.getElementById('unitMonth').dataset.active = (u==='month');
  renderCardImpacts(); refreshSummary();
}
document.getElementById('unitYear').addEventListener('click', ()=> setUnit('year'));
document.getElementById('unitMonth').addEventListener('click', ()=> setUnit('month'));

// Oś wieku
el.minusYr.addEventListener('click', () => { state.age = clamp(state.age - 1, state.startAge, state.maxAge); updateTimeline(); });
el.plusYr.addEventListener('click', () => { state.age = clamp(state.age + 1, state.startAge, state.maxAge); updateTimeline(); });

// Idle spawn pułapki co ~12s
setInterval(()=> spawnTrap(0.25), 12000);

// start
setSelected(null);
setUnit('year');
updateTimeline();
renderCardImpacts();


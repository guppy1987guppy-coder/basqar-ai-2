import React, { useMemo, useState } from 'react';
import {
  LayoutDashboard, School, Users, GraduationCap, ChartNoAxesCombined,
  ClipboardCheck, BookOpen, FolderOpen, BrainCircuit, Settings, Bell,
  Search, ChevronDown, Plus, ArrowUpRight, CalendarDays, CircleAlert,
  CheckCircle2, Clock3, Menu, X, Pencil, Save, RotateCcw, Sparkles,
  FileText, ClipboardList, Building2, TrendingUp
} from 'lucide-react';

const initialData = {
  school: 'В.И.Шубин атындағы жалпы орта білім беретін мектебі',
  district: 'БҚО, Сырым ауданы',
  year: '2026–2027 оқу жылы',
  students: 96,
  teachers: 24,
  quality: 51,
  classes: 11,
  mib: 8
};

const nav = [
  { title: 'БАСҚАРУ', items: [
    ['Басты бет', LayoutDashboard],
    ['Мектеп паспорты', School],
    ['Педагогтер базасы', Users],
    ['Оқушылар контингенті', GraduationCap],
  ]},
  { title: 'МОНИТОРИНГ', items: [
    ['Білім сапасы', ChartNoAxesCombined],
    ['Мектепішілік бақылау', ClipboardCheck],
    ['Әдістемелік жұмыс', BookOpen],
  ]},
  { title: 'ҚҰРАЛДАР', items: [
    ['Құжаттар архиві', FolderOpen],
    ['AI-аналитика', BrainCircuit],
  ]},
];

function App() {
  const [data, setData] = useState(() => {
    try { return { ...initialData, ...JSON.parse(localStorage.getItem('basqar-demo-data') || '{}') }; }
    catch { return initialData; }
  });
  const [active, setActive] = useState('Басты бет');
  const [editOpen, setEditOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [notice, setNotice] = useState('');
  const [query, setQuery] = useState('');

  const save = (next) => {
    setData(next);
    localStorage.setItem('basqar-demo-data', JSON.stringify(next));
    setNotice('Өзгерістер осы браузерде сақталды');
    setTimeout(() => setNotice(''), 2800);
  };

  const filteredNav = useMemo(() => nav.map(group => ({
    ...group, items: group.items.filter(([label]) => label.toLowerCase().includes(query.toLowerCase()))
  })).filter(group => group.items.length), [query]);

  const contentTitle = active === 'Басты бет' ? 'Басқару панелі' : active;
  const sidebar = (
    <aside className={`sidebar ${mobileOpen ? 'open' : ''}`}>
      <div className="brand">
        <div className="brand-mark"><Building2 size={22}/></div>
        <div><div className="brand-name">BASQAR <span>AI</span></div><div className="brand-sub">DIRECTOR 2.0</div></div>
        <button className="mobile-close icon-btn" onClick={() => setMobileOpen(false)}><X size={19}/></button>
      </div>
      <div className="school-mini">
        <div className="school-avatar">М</div>
        <div className="school-mini-text"><strong>Менің мектебім</strong><small>{data.district}</small></div>
        <ChevronDown size={15}/>
      </div>
      <div className="nav-search"><Search size={15}/><input value={query} onChange={e=>setQuery(e.target.value)} placeholder="Бөлімді іздеу"/></div>
      <nav>
        {filteredNav.map(group => <div className="nav-group" key={group.title}>
          <div className="nav-caption">{group.title}</div>
          {group.items.map(([label, Icon]) => <button key={label} className={`nav-link ${active===label?'selected':''}`} onClick={()=>{setActive(label);setMobileOpen(false);}}>
            <Icon size={18}/><span>{label}</span>{label==='AI-аналитика' && <span className="new-tag">AI</span>}
          </button>)}
        </div>)}
      </nav>
      <div className="sidebar-bottom">
        <div className="help-card"><div className="help-icon"><Sparkles size={17}/></div><strong>Көмек керек пе?</strong><p>Платформаны пайдалану жөніндегі нұсқаулық.</p><button onClick={()=>setNotice('Нұсқаулық келесі әзірлеу кезеңінде қосылады')}>Нұсқаулықты ашу <ArrowUpRight size={14}/></button></div>
        <button className="nav-link"><Settings size={18}/><span>Баптаулар</span></button>
        <div className="profile"><div className="profile-avatar">Д</div><div><strong>Мектеп директоры</strong><small>Әкімші</small></div><ChevronDown size={15}/></div>
      </div>
    </aside>
  );

  return <div className="app-shell">
    {sidebar}
    {mobileOpen && <button className="scrim" onClick={()=>setMobileOpen(false)} aria-label="Мәзірді жабу"/>}
    <main className="main">
      <header className="topbar">
        <div className="top-left"><button className="mobile-menu icon-btn" onClick={()=>setMobileOpen(true)}><Menu size={21}/></button><div className="breadcrumbs">BASQAR AI <span>/</span> <b>{contentTitle}</b></div></div>
        <div className="top-actions"><div className="year-pill"><CalendarDays size={15}/>{data.year}</div><button className="icon-btn notification" onClick={()=>setNotice('Әзірге жаңа хабарлама жоқ')}><Bell size={19}/><i/></button><div className="top-avatar">Д</div></div>
      </header>

      <div className="page-wrap">
        <section className="welcome-row">
          <div><div className="eyebrow">ДИРЕКТОР КАБИНЕТІ <span className="live-dot"/> ДЕМО-НҰСҚА</div>
            <h1>{active==='Басты бет'?'Қайырлы күн!':contentTitle}</h1>
            <p className="school-title">{data.school}</p>
            <p className="muted">{data.district} · {data.year}</p>
          </div>
          <button className="primary-btn" onClick={()=>setEditOpen(true)}><Pencil size={16}/> Мектеп деректерін өзгерту</button>
        </section>

        {active !== 'Басты бет' ? <section className="placeholder-panel">
          <div className="placeholder-icon"><LayoutDashboard size={26}/></div><h2>{active}</h2>
          <p>Бұл бөлім BASQAR AI 2.0 платформасының келесі әзірлеу кезеңінде іске қосылады.</p>
          <button className="outline-btn" onClick={()=>setActive('Басты бет')}>Басты бетке қайту</button>
        </section> : <>
          <section className="stats-grid">
            <Stat icon={GraduationCap} label="Оқушылар саны" value={data.students} foot="Жалпы контингент" tone="blue"/>
            <Stat icon={Users} label="Педагогтер саны" value={data.teachers} foot="Кадрлық құрам" tone="violet"/>
            <Stat icon={TrendingUp} label="Білім сапасы" value={`${data.quality}%`} foot="Ағымдағы көрсеткіш" tone="green"/>
            <Stat icon={School} label="Сынып-жинақ" value={data.classes} foot="Оқу контингенті" tone="orange"/>
          </section>

          <section className="content-grid">
            <div className="panel quality-panel">
              <div className="panel-head"><div><h2>Білім сапасының динамикасы</h2><p>Тоқсандар бойынша көрсеткіштер</p></div><span className="subtle-tag">Мониторинг</span></div>
              <div className="chart-area">
                <div className="y-labels"><span>60%</span><span>45%</span><span>30%</span><span>15%</span><span>0%</span></div>
                <div className="chart">
                  <div className="grid-line l1"/><div className="grid-line l2"/><div className="grid-line l3"/><div className="grid-line l4"/>
                  <svg viewBox="0 0 600 205" preserveAspectRatio="none" role="img" aria-label="Білім сапасы динамикасы">
                    <defs><linearGradient id="areaFill" x1="0" x2="0" y1="0" y2="1"><stop offset="0%" stopColor="#4779c8" stopOpacity=".22"/><stop offset="100%" stopColor="#4779c8" stopOpacity="0"/></linearGradient></defs>
                    <path d="M25 93 L205 80 L385 62 L565 48 L565 190 L25 190 Z" fill="url(#areaFill)"/>
                    <path d="M25 93 L205 80 L385 62 L565 48" fill="none" stroke="#4779c8" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
                    {[[25,93],[205,80],[385,62],[565,48]].map(([x,y],i)=><g key={i}><circle cx={x} cy={y} r="5" fill="#fff" stroke="#4779c8" strokeWidth="3"/></g>)}
                  </svg>
                  <div className="chart-x"><span>I тоқсан</span><span>II тоқсан</span><span>III тоқсан</span><span>IV тоқсан</span></div>
                  <div className="chart-values"><span>48%</span><span>50%</span><span>53%</span><b>{data.quality}%</b></div>
                </div>
              </div>
              <div className="chart-foot"><span><i className="legend-dot"/> Білім сапасы</span><span className="trend"><TrendingUp size={15}/> Деректерді жаңарту қажет</span></div>
            </div>

            <div className="panel tasks-panel">
              <div className="panel-head"><div><h2>Басқарушылық міндеттер</h2><p>Назар аударуды қажет ететін жұмыстар</p></div><button className="more-btn" onClick={()=>setNotice('Міндеттер тізімі келесі кезеңде кеңейтіледі')}>•••</button></div>
              <div className="task-item"><div className="task-icon amber"><Clock3 size={17}/></div><div className="task-copy"><strong>МІБ жоспарын бақылау</strong><small>Орындалу барысын тексеру</small></div><span className="status pending">Жоспарда</span></div>
              <div className="task-item"><div className="task-icon blue"><FileText size={17}/></div><div className="task-copy"><strong>Әдістемелік жоспар</strong><small>Іс-шаралар есебін жаңарту</small></div><span className="status progress">Жұмыста</span></div>
              <div className="task-item"><div className="task-icon green"><ChartNoAxesCombined size={17}/></div><div className="task-copy"><strong>Білім сапасын талдау</strong><small>Тоқсандық көрсеткіштер</small></div><span className="status done">Бақылауда</span></div>
              <button className="add-task" onClick={()=>setNotice('Жаңа міндет енгізу формасы келесі кезеңде қосылады')}><Plus size={16}/> Міндет қосу</button>
            </div>
          </section>

          <section className="bottom-grid">
            <div className="panel quick-panel"><div className="panel-head"><div><h2>Жылдам қолжетімділік</h2><p>Жиі қолданылатын бөлімдер</p></div></div>
              <div className="quick-grid">
                <Quick icon={School} title="Мектеп паспорты" desc="Негізгі мәліметтер" onClick={()=>setActive('Мектеп паспорты')}/>
                <Quick icon={Users} title="Педагогтер" desc="Кадрлық ақпарат" onClick={()=>setActive('Педагогтер базасы')}/>
                <Quick icon={ClipboardList} title="МІБ жоспары" desc="Бақылау іс-шаралары" onClick={()=>setActive('Мектепішілік бақылау')}/>
                <Quick icon={BrainCircuit} title="AI-аналитика" desc="Деректерді талдау" onClick={()=>setActive('AI-аналитика')}/>
              </div>
            </div>
            <div className="panel ai-panel"><div className="ai-heading"><div className="ai-spark"><Sparkles size={19}/></div><div><h2>AI-аналитика</h2><span>Зияткерлік көмекші</span></div><span className="coming">КЕЛЕСІ КЕЗЕҢ</span></div>
              <p>Мектеп деректерін талдау және басқарушылық шешімдерге ұсыныстар беру мүмкіндігі әзірленуде.</p>
              <button className="ai-link" onClick={()=>setActive('AI-аналитика')}>Толығырақ <ArrowUpRight size={15}/></button>
            </div>
          </section>
          <div className="demo-note"><CircleAlert size={15}/><span>Демо-нұсқа: көрсеткіштер үлгі ретінде берілген. Өзгерістер осы құрылғының браузерінде ғана сақталады. Бірнеше мектепке ортақ деректер базасы әлі қосылмаған.</span></div>
        </>}
        <footer>© 2026 BASQAR AI 2.0 <span>Мектепті басқарудың цифрлық кеңістігі</span></footer>
      </div>
    </main>

    {editOpen && <EditModal data={data} onClose={()=>setEditOpen(false)} onSave={next=>{save(next);setEditOpen(false)}}/>}
    {notice && <div className="toast"><CheckCircle2 size={17}/>{notice}<button onClick={()=>setNotice('')}><X size={15}/></button></div>}
  </div>;
}

function Stat({icon:Icon,label,value,foot,tone}) {
  return <div className="stat-card"><div className={`stat-icon ${tone}`}><Icon size={19}/></div><div className="stat-label">{label}</div><div className="stat-value">{value}</div><div className="stat-foot">{foot}</div></div>;
}
function Quick({icon:Icon,title,desc,onClick}) {
  return <button className="quick-link" onClick={onClick}><div className="quick-icon"><Icon size={19}/></div><div><strong>{title}</strong><small>{desc}</small></div><ArrowUpRight size={15} className="quick-arrow"/></button>;
}
function EditModal({data,onClose,onSave}) {
  const [form,setForm] = useState(data);
  const update = (key,value) => setForm(p=>({...p,[key]:value}));
  return <div className="modal-backdrop" onMouseDown={e=>{if(e.target===e.currentTarget)onClose()}}>
    <div className="modal"><div className="modal-head"><div><h2>Мектеп деректерін өзгерту</h2><p>Демо-мектептің негізгі көрсеткіштері</p></div><button className="icon-btn" onClick={onClose}><X size={19}/></button></div>
      <div className="form-fields">
        <label>Мектеп атауы<input value={form.school} onChange={e=>update('school',e.target.value)}/></label>
        <label>Орналасқан жері<input value={form.district} onChange={e=>update('district',e.target.value)}/></label>
        <div className="form-row">
          <label>Оқушылар саны<input type="number" min="0" value={form.students} onChange={e=>update('students',Number(e.target.value))}/></label>
          <label>Педагогтер саны<input type="number" min="0" value={form.teachers} onChange={e=>update('teachers',Number(e.target.value))}/></label>
        </div>
        <div className="form-row">
          <label>Білім сапасы (%)<input type="number" min="0" max="100" value={form.quality} onChange={e=>update('quality',Number(e.target.value))}/></label>
          <label>Сынып-жинақ саны<input type="number" min="0" value={form.classes} onChange={e=>update('classes',Number(e.target.value))}/></label>
        </div>
      </div>
      <div className="modal-actions"><button className="outline-btn" onClick={()=>setForm(initialData)}><RotateCcw size={15}/> Бастапқы деректер</button><button className="primary-btn" onClick={()=>onSave(form)}><Save size={16}/> Сақтау</button></div>
    </div>
  </div>;
}

export default App;

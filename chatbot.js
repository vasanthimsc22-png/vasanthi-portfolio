// ===== Portfolio Chatbot (client-side, no backend) =====
(function(){
  var fab=document.getElementById('botFab'),panel=document.getElementById('botPanel'),close=document.getElementById('bpClose');
  var chat=document.getElementById('bpChat'),inp=document.getElementById('bpQ'),send=document.getElementById('bpSend');

  function openPanel(){panel.classList.add('open');fab.classList.add('active');setTimeout(function(){inp.focus()},300)}
  function closePanel(){panel.classList.remove('open');fab.classList.remove('active')}
  function toggle(){if(panel.classList.contains('open')){closePanel()}else{openPanel()}}

  // === Draggable FAB ===
  var isDragging=false,hasMoved=false,startX,startY,fabX,fabY,dragStartedOnFab=false;
  function onDown(e){
    dragStartedOnFab=true;
    isDragging=true;hasMoved=false;
    var ev=e.touches?e.touches[0]:e;
    startX=ev.clientX;startY=ev.clientY;
    var rect=fab.getBoundingClientRect();
    fabX=rect.left;fabY=rect.top;
    fab.style.transition='none';
  }
  function onMove(e){
    if(!isDragging||!dragStartedOnFab)return;
    var ev=e.touches?e.touches[0]:e;
    var dx=ev.clientX-startX,dy=ev.clientY-startY;
    if(Math.abs(dx)>4||Math.abs(dy)>4)hasMoved=true;
    var nx=fabX+dx,ny=fabY+dy;
    nx=Math.max(0,Math.min(window.innerWidth-60,nx));
    ny=Math.max(0,Math.min(window.innerHeight-60,ny));
    fab.style.left=nx+'px';fab.style.top=ny+'px';
    fab.style.right='auto';fab.style.bottom='auto';
  }
  function onUp(){
    if(!dragStartedOnFab){return;}
    isDragging=false;dragStartedOnFab=false;
    fab.style.transition='box-shadow .3s';
    if(!hasMoved)toggle();
  }
  fab.addEventListener('mousedown',onDown);
  document.addEventListener('mousemove',onMove);
  document.addEventListener('mouseup',onUp);
  fab.addEventListener('touchstart',onDown,{passive:true});
  document.addEventListener('touchmove',onMove,{passive:true});
  document.addEventListener('touchend',onUp);

  close.addEventListener('click', function(e){e.stopPropagation();e.preventDefault();closePanel();});

  function typeEffect(el, html, callback) {
    // Strip HTML tags for character-by-character typing, then set full HTML at end
    var temp = document.createElement('div');
    temp.innerHTML = html;
    var plainText = temp.textContent || temp.innerText;
    var i = 0;
    el.textContent = '';
    function tick() {
      if (i < plainText.length) {
        el.textContent += plainText[i];
        i++;
        chat.scrollTop = chat.scrollHeight;
        setTimeout(tick, 12 + Math.random() * 18);
      } else {
        // Set the full HTML (with formatting) once done
        el.innerHTML = html;
        chat.scrollTop = chat.scrollHeight;
        if (callback) callback();
      }
    }
    tick();
  }

  function addBotMsg(html){var d=document.createElement('div');d.className='bp-msg';d.innerHTML='<div class="bp-bub"></div>';chat.appendChild(d);var bub=d.querySelector('.bp-bub');typeEffect(bub,html);chat.scrollTop=chat.scrollHeight}
  function addUserMsg(text){var d=document.createElement('div');d.className='bp-msg user';d.innerHTML='<div class="bp-bub">'+text+'</div>';chat.appendChild(d);chat.scrollTop=chat.scrollHeight}

  // Knowledge base (portfolio + cloud content) — comprehensive & engaging
  var kb={
    skills:'<strong>🛠️ Technical Skills</strong><br><br><strong>AI & LLM:</strong> Gemini Models, LLMs, RAG Pipeline, Prompt Engineering, Agentic AI, AI Agents<br><strong>Frameworks:</strong> LangChain, LlamaIndex, MCP (Model Context Protocol), Google ADK<br><strong>Cloud:</strong> Azure, AWS, GCP, Docker, Kubernetes, Linux<br><strong>Databases:</strong> PostgreSQL, PgVector (Vector DB), SQL<br><strong>Languages:</strong> Python, Java<br><strong>Tools:</strong> VS Code, Kiro IDE, KQL, Git<br><br>💡 <em>Most comfortable with Python + AI/LLM stack — that\'s where the magic happens!</em>',
    experience:'<strong>💼 Work Experience</strong><br><br><strong>Corent Technology</strong> — Generative AI Engineer<br>📅 June 2023 – Present (3 Years)<br><br>✅ NL-to-SQL Engine with Gemini + PostgreSQL<br>✅ Multi-Cloud AI Chatbot (Azure, AWS, GCP)<br>✅ Dynamic AI Workflow with MCP tools<br>✅ Google ADK Integration<br>✅ Cloud Observability with KQL<br>✅ Web Scraping & RAG Chatbot<br>✅ DevOps: Docker, Kubernetes<br><br>📌 <em>3 years of building production AI systems!</em>',
    projects:'<strong>🚀 Key Projects</strong><br><br>1️⃣ <strong>AI-Powered Web Intelligence & RAG</strong><br>&nbsp;&nbsp;&nbsp;Semantic search + AI answers from large documents<br><br>2️⃣ <strong>Dynamic Workflow with MCP</strong><br>&nbsp;&nbsp;&nbsp;Multi-step AI task orchestration<br><br>3️⃣ <strong>Google ADK Integration</strong><br>&nbsp;&nbsp;&nbsp;AI agents connecting to external services<br><br>4️⃣ <strong>NL-to-SQL Engine</strong><br>&nbsp;&nbsp;&nbsp;English → PostgreSQL with intent classification<br><br>5️⃣ <strong>Multi-Cloud Resource Chatbot</strong><br>&nbsp;&nbsp;&nbsp;Real-time VM pricing across Azure/AWS/GCP<br><br>💬 <em>Want details on any specific project? Just ask!</em>',
    contact:'<strong>📬 Let\'s Connect!</strong><br><br>📧 <a href="mailto:vasanthimsc22@gmail.com" style="color:var(--accent)">vasanthimsc22@gmail.com</a><br>🔗 <a href="https://www.linkedin.com/in/vasanthi-s-74914124b" target="_blank" style="color:var(--accent)">LinkedIn Profile</a><br>📍 Chennai, India<br><br>💼 <em>Open to full-time roles, contracts & remote opportunities in AI/ML and Cloud engineering!</em><br><br>👉 You can also use the <strong>Contact page</strong> to send a message directly!',
    education:'<strong>🎓 Education</strong><br><br>🏛️ <strong>M.Sc Computer Science</strong><br>&nbsp;&nbsp;&nbsp;Bharathidasan University, Trichy (2022) — 85.58%<br><br>🏛️ <strong>B.Sc Computer Science</strong><br>&nbsp;&nbsp;&nbsp;Shrimathi Indira Gandhi College, Trichy (2020) — 85.77%<br><br>📚 <em>Strong academic foundation + 3 years of industry experience!</em>',
    about:'<strong>👩‍💻 About Vasanthi S</strong><br><br>I\'m a <strong>Generative AI Engineer</strong> with 3 years of experience building intelligent systems.<br><br>🎯 <strong>What I do:</strong> Build AI-powered chatbots, RAG systems, NL-to-SQL engines, and multi-cloud solutions<br><br>🔧 <strong>Tech:</strong> Python, Gemini, LangChain, MCP, Azure/AWS/GCP<br><br>💡 <strong>Passionate about:</strong> Making AI solve real business problems — not just demos, but production-ready systems<br><br>🌟 <em>Fun fact: This chatbot you\'re talking to? I built that too! 😄</em>',
    cloud:'<strong>☁️ Cloud Experience</strong><br><br>I work across all 3 major cloud platforms:<br><br>🔷 <strong>Azure:</strong> KQL observability, VM pricing, monitoring dashboards<br>🟠 <strong>AWS:</strong> Metadata ingestion, Knowledge Base automation<br>🔴 <strong>GCP:</strong> Gemini AI, Google ADK, resource costing<br><br>🐳 <strong>DevOps:</strong> Docker, Kubernetes, Linux, CI/CD<br><br>🌐 Built a <strong>Multi-Cloud AI Chatbot</strong> that provides real-time resource details across all 3!',
    azure:'<strong>🔷 Azure Work</strong><br><br>• Cloud Observability & Security with <strong>KQL</strong> (Kusto Query Language)<br>• Automated live account detail retrieval<br>• Real-time monitoring dashboards<br>• Azure VM pricing intelligence tool<br>• Metadata ingestion from Azure APIs<br><br>📊 <em>KQL is powerful for log analysis — I use it daily!</em>',
    aws:'<strong>🟠 AWS Work</strong><br><br>• Multi-Cloud Knowledge Base from AWS APIs<br>• Resource costing & pricing data automation<br>• AI Chatbot supporting AWS specs and flavor names<br>• Metadata ingestion pipeline<br><br>☁️ <em>AWS has the widest VM selection — my chatbot helps find the best one!</em>',
    gcp:'<strong>🔴 GCP Work</strong><br><br>• <strong>Gemini AI</strong> integration for NL-to-SQL & chatbots<br>• <strong>Google ADK</strong> for third-party service connectivity<br>• GCP resource details in Multi-Cloud Chatbot<br>• Vertex AI exploration<br><br>🤖 <em>Gemini is my go-to model for SQL generation!</em>',
    docker:'<strong>🐳 DevOps & Containerization</strong><br><br>• Docker containerization for production<br>• Kubernetes orchestration for scalable services<br>• Linux service creation & management<br>• Python automation scripts<br>• CI/CD pipeline experience<br><br>📦 <em>Everything I build goes through Docker → production!</em>',
    rag:'<strong>🧠 RAG (Retrieval-Augmented Generation)</strong><br><br>• Built an AI-Powered Web Intelligence & RAG System<br>• PgVector embedding database for semantic search<br>• Web scraping → chunk → embed → query pipeline<br>• Cosine Similarity for efficient retrieval<br>• Accurate AI answers from large document sets<br><br>🔍 <em>RAG = giving LLMs real knowledge, not just training data!</em>',
    mcp:'<strong>🤖 MCP & Agentic AI</strong><br><br>• Dynamic Workflow Automation with <strong>MCP</strong> (Model Context Protocol)<br>• Intelligent multi-step task orchestration<br>• <strong>Google ADK</strong> client-server architecture<br>• AI agents interacting with external services<br>• Real-time tool use by AI models<br><br>🚀 <em>Agentic AI = AI that doesn\'t just answer, it ACTS!</em>',
    hire:'<strong>💼 Why Hire Vasanthi?</strong><br><br>✅ 3 years production AI experience (not just tutorials)<br>✅ Built 5+ end-to-end AI systems in production<br>✅ Multi-cloud (Azure, AWS, GCP) — not locked to one<br>✅ Full stack AI: from prompts → RAG → deployment<br>✅ Strong fundamentals: CS degree, 85%+ scores<br>✅ Quick learner: MCP, Google ADK — adopted early<br><br>🎯 <em>I don\'t just build AI demos — I build systems that ship!</em><br><br>📧 <a href="mailto:vasanthimsc22@gmail.com" style="color:var(--accent)">Reach out!</a>',
    strength:'<strong>💪 Key Strengths</strong><br><br>• <strong>Problem solver:</strong> Turn business needs into AI solutions<br>• <strong>Quick learner:</strong> Adopted MCP, ADK early<br>• <strong>Production mindset:</strong> Docker, K8s, monitoring<br>• <strong>Full-stack AI:</strong> Prompt → RAG → Deploy<br>• <strong>Multi-cloud:</strong> Not limited to one platform<br>• <strong>Clean code:</strong> Maintainable, documented',
    fun:'<strong>🎉 Fun Facts</strong><br><br>🤖 This chatbot? Built by me — pure JS, no frameworks!<br>✨ The sparkle effect when you move your mouse? Also me!<br>☁️ I\'ve processed 30,000+ cloud VM pricing records<br>🐍 Python is my superpower — 3 years strong<br>🌏 Based in Chennai, love Tamil & English<br>💡 I believe AI should solve real problems, not just impress<br><br>😄 <em>Ask me anything else — I\'m quite chatty!</em>',
    salary:'I appreciate the question! 💼 Salary expectations depend on the role, location, and company. Let\'s connect to discuss!<br><br>📧 <a href="mailto:vasanthimsc22@gmail.com" style="color:var(--accent)">vasanthimsc22@gmail.com</a>',
    available:'<strong>✅ Yes, I\'m available!</strong><br><br>Open to:<br>• Full-time positions<br>• Contract / Remote roles<br>• AI/ML & Cloud Engineering opportunities<br><br>📍 Chennai, India (open to remote/relocation)<br>⏰ Can join within notice period<br><br>📧 <a href="mailto:vasanthimsc22@gmail.com" style="color:var(--accent)">Let\'s talk!</a>',
  };

  function getReply(q){
    q=q.toLowerCase().trim();
    // Greetings
    if(/^(hi|hello|hey|hii+|vanakkam|yo|sup|good (morning|evening|afternoon))/.test(q))return"Hey! 👋 Welcome to Vasanthi's portfolio. I can tell you about her <strong>skills, projects, cloud work, experience</strong> — or just chat! What interests you?";
    if(/^(bye|goodbye|see you|take care)/.test(q))return"Goodbye! 👋 Thanks for visiting. Feel free to come back anytime. All the best! 🌟";
    if(/thank|thx|thanks/.test(q))return"You're welcome! 😊 Happy to help. Anything else you'd like to know?";
    
    // Identity
    if(/(who|what) (are you|is this|r u)|(your name)/.test(q))return"I'm Vasanthi's AI assistant 🤖 — built right into this portfolio! I can tell you about her skills, experience, projects, and more. Try asking!";
    if(/who (built|made|created|developed) (you|this)/.test(q))return"I was built by <strong>Vasanthi S</strong> herself! 👩‍💻 Pure JavaScript, no frameworks — embedded right in this portfolio. Pretty cool, right? 😄";
    
    // WHY HIRE — must come BEFORE contact (because "hire" matches both)
    if(/why.*hire|why.*choose|why.*pick|what makes her|standout|different/.test(q))return kb.hire;
    
    // Professional topics
    if(/skill|tech|stack|language|framework|tool|what (can|does) (she|vasanthi) (do|know)/.test(q))return kb.skills;
    if(/experience|work history|job|company|corent|career/.test(q))return kb.experience;
    if(/project|built|made|portfolio|what.*build/.test(q))return kb.projects;
    if(/contact|email|reach|phone|linkedin|connect/.test(q))return kb.contact;
    if(/edu|degree|university|college|school|study|qualification/.test(q))return kb.education;
    if(/(who is|about|vasanthi|introduce|tell me about|background)/.test(q))return kb.about;
    if(/strength|strong point|good at|best at|superpower/.test(q))return kb.strength;
    if(/available|notice|join|when.*start|open to/.test(q))return kb.available;
    if(/salary|pay|compensation|ctc|package/.test(q))return kb.salary;
    if(/hire\b/.test(q))return kb.contact;
    
    // Cloud topics
    if(/azure|kql|kusto|observ|monitor/.test(q))return kb.azure;
    if(/\baws\b|amazon|s3/.test(q))return kb.aws;
    if(/gcp|google cloud|gemini|adk|vertex/.test(q))return kb.gcp;
    if(/cloud|multi.cloud/.test(q))return kb.cloud;
    if(/docker|kubernetes|k8s|devops|linux|container|deploy|ci.?cd/.test(q))return kb.docker;
    if(/rag|vector|embed|scraping|web.*intelligence|retrieval/.test(q))return kb.rag;
    if(/mcp|agent|agentic|workflow|orchestr|automat/.test(q))return kb.mcp;
    if(/sql|query|database|postgres|pgvector|nl.to.sql/.test(q))return"<strong>🗄️ Database & NL-to-SQL</strong><br><br>• NL-to-SQL Engine using <strong>Gemini models</strong><br>• Natural language → PostgreSQL query conversion<br>• <strong>PgVector</strong> for vector embeddings & semantic search<br>• Cosine Similarity for retrieval<br>• Intent Classification for accurate queries<br><br>🎯 <em>Ask in English, get SQL results — that's the dream!</em>";
    if(/python|java|code|programming/.test(q))return"<strong>💻 Programming</strong><br><br>🐍 <strong>Python</strong> — Primary language (3 years)<br>&nbsp;&nbsp;&nbsp;FastAPI, Flask, automation, AI/ML pipelines<br><br>☕ <strong>Java</strong> — Secondary language<br>&nbsp;&nbsp;&nbsp;Backend systems<br><br>📝 <em>Python is home — everything from scripts to production AI!</em>";
    if(/ai|artificial|machine learning|ml|deep|llm|model/.test(q))return"<strong>🧠 AI & Machine Learning</strong><br><br>• <strong>Gemini Models</strong> — primary LLM for generation<br>• <strong>RAG Pipelines</strong> — retrieval-augmented generation<br>• <strong>Prompt Engineering</strong> — getting the best from LLMs<br>• <strong>Agentic AI</strong> — AI that acts autonomously<br>• <strong>NLP</strong> — natural language processing<br>• <strong>Vector Search</strong> — semantic similarity<br><br>🚀 <em>AI isn't just a buzzword for me — it's what I build every day!</em>";
    if(/resume|cv|download/.test(q))return"📄 You can download Vasanthi's resume by clicking the <strong>'Download CV'</strong> button on the home page!<br><br>It auto-generates from portfolio content — always up to date! 📋";
    if(/location|where|city|place|from/.test(q))return"📍 <strong>Chennai, Tamil Nadu, India</strong><br><br>Open to remote work and relocation if needed! 🌏";
    if(/year|how long|how many year/.test(q))return"<strong>3 years</strong> of professional experience (June 2023 – Present) at Corent Technology as a Generative AI Engineer! 💼";
    if(/intern/.test(q))return"<strong>🎓 Internship</strong><br><br>Integrass, Trichy — Software Development Intern<br>June 2022 – September 2022<br><br>• SDLC & Agile methodologies<br>• Functional, Integration & System Testing<br>• Test Plans, Test Cases, Test Scenarios";
    
    // Catch-all
    return"Hmm, interesting question! 🤔 I'm best at answering about:<br><br>• 🛠️ <strong>Skills</strong> & tech stack<br>• 💼 <strong>Experience</strong> & work history<br>• 🚀 <strong>Projects</strong> built<br>• ☁️ <strong>Cloud</strong> (Azure/AWS/GCP)<br>• 🧠 <strong>AI/RAG/MCP</strong> expertise<br>• 📬 <strong>Contact</strong> info<br>• 🎓 <strong>Education</strong><br>• 💪 <strong>Why hire</strong> Vasanthi<br><br>Try one of these! 😊";
  }

  function handleQ(){
    var q=inp.value.trim();if(!q)return;inp.value='';
    addUserMsg(q);
    setTimeout(function(){addBotMsg(getReply(q))},400);
  }
  send.addEventListener('click',function(e){e.stopPropagation();handleQ()});
  inp.addEventListener('keydown',function(e){if(e.key==='Enter'){e.stopPropagation();handleQ()}});
  chat.addEventListener('click',function(e){if(e.target.classList.contains('bp-chip')){e.stopPropagation();inp.value=e.target.textContent;handleQ()}});
})();

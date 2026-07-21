// ========== PAGE NAVIGATION ==========
document.addEventListener('DOMContentLoaded', function() {
  var navLinks = document.querySelectorAll('[data-page]');
  var pages = document.querySelectorAll('.page');

  function goToPage(pageId) {
    for (var i = 0; i < pages.length; i++) { pages[i].classList.remove('active'); }
    var target = document.getElementById('page-' + pageId);
    if (target) { target.classList.add('active'); }
    var links = document.querySelectorAll('.nav-link');
    for (var j = 0; j < links.length; j++) {
      links[j].classList.remove('active');
      if (links[j].getAttribute('data-page') === pageId) { links[j].classList.add('active'); }
    }
    document.getElementById('navItems').classList.remove('open');
    document.getElementById('pageContainer').scrollTop = 0;
  }

  // Make goToPage global so it works everywhere
  window.goToPage = goToPage;

  for (var i = 0; i < navLinks.length; i++) {
    (function(el) {
      el.addEventListener('click', function(e) {
        e.preventDefault();
        goToPage(el.getAttribute('data-page'));
      });
    })(navLinks[i]);
  }

  document.getElementById('logo').addEventListener('click', function() { goToPage('hero'); });
  document.getElementById('menuToggle').addEventListener('click', function() { document.getElementById('navItems').classList.toggle('open'); });
  document.getElementById('themeBtn').addEventListener('click', function() {
    var html = document.documentElement;
    var isDark = html.getAttribute('data-theme') === 'dark';
    html.setAttribute('data-theme', isDark ? 'light' : 'dark');
    document.getElementById('themeBtn').textContent = isDark ? '🌙' : '☀️';
    localStorage.setItem('theme', isDark ? 'light' : 'dark');
  });

  var saved = localStorage.getItem('theme');
  if (saved) { document.documentElement.setAttribute('data-theme', saved); document.getElementById('themeBtn').textContent = saved === 'dark' ? '☀️' : '🌙'; }

  // ========== PATTASU EFFECT ==========
  var canvas = document.createElement('canvas');
  canvas.style.cssText = 'position:fixed;top:0;left:0;width:100%;height:100%;pointer-events:none;z-index:9999';
  document.body.appendChild(canvas);
  var ctx = canvas.getContext('2d');
  canvas.width = window.innerWidth; canvas.height = window.innerHeight;
  window.addEventListener('resize', function() { canvas.width = window.innerWidth; canvas.height = window.innerHeight; });
  var sparks = [];
  var sparkColors = ['#38bdf8','#a78bfa','#34d399','#fbbf24','#fb7185','#f472b6','#60a5fa'];
  document.addEventListener('mousemove', function(e) {
    for (var j = 0; j < 3; j++) {
      sparks.push({x:e.clientX,y:e.clientY,vx:(Math.random()-.5)*5,vy:(Math.random()-.5)*5,life:1,color:sparkColors[Math.floor(Math.random()*sparkColors.length)],size:Math.random()*3.5+1.5});
    }
  });
  function renderSparks() {
    ctx.clearRect(0,0,canvas.width,canvas.height);
    for (var i=sparks.length-1;i>=0;i--) {
      var s=sparks[i]; s.x+=s.vx; s.y+=s.vy; s.vy+=0.1; s.life-=0.025;
      if(s.life<=0){sparks.splice(i,1);continue;}
      ctx.globalAlpha=s.life; ctx.fillStyle=s.color;
      ctx.beginPath(); ctx.arc(s.x,s.y,s.size*s.life,0,Math.PI*2); ctx.fill();
    }
    ctx.globalAlpha=1; requestAnimationFrame(renderSparks);
  }
  renderSparks();
});


// ========== DOWNLOAD CV (mobile + desktop) ==========
function downloadCV() {
  // Check if mobile
  var isMobile = /Android|iPhone|iPad|iPod|Opera Mini|IEMobile/i.test(navigator.userAgent);
  
  if (isMobile) {
    // Mobile: open print resume in new tab (user can share/save as PDF)
    var resumeHTML = document.getElementById('resume').innerHTML;
    var win = window.open('', '_blank');
    win.document.write('<!DOCTYPE html><html><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Vasanthi S - Resume</title><style>body{font-family:-apple-system,sans-serif;padding:20px;font-size:14px;line-height:1.6;color:#000}h1{font-size:22px;color:#0f766e;margin-bottom:2px}h2{font-size:15px;color:#0f766e;border-bottom:1.5px solid #0f766e;padding-bottom:3px;margin:16px 0 8px}h3{font-size:13px;margin-bottom:2px}ul{padding-left:18px}li{margin-bottom:3px;font-size:13px}p{font-size:13px;margin-bottom:5px}.r-title{font-size:13px;color:#0f766e;font-weight:600}.r-contact{font-size:11px;color:#444;margin-bottom:14px}.r-meta{font-size:11px;color:#0f766e;font-weight:600;margin-bottom:4px}.r-skill{margin-bottom:4px;font-size:12px}.r-skill strong{color:#0f766e}.r-proj{margin-bottom:6px;font-size:12px}</style></head><body>' + resumeHTML + '<br><p style="text-align:center;color:#999;font-size:11px">Tip: Use browser menu → Share → Save as PDF</p></body></html>');
    win.document.close();
  } else {
    // Desktop: use print dialog (Save as PDF)
    window.print();
  }
}
// Make it global
window.downloadCV = downloadCV;

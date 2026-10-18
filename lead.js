/* MN Home Sale Pros (ported from Radon Roster by tools/netport.py): quote form (progressive enhancement) + anonymous contact-link click counts. */
(function(){var API="https://leads.radonroster.com",SITE="mnhome";
function beacon(f,t){try{var b=JSON.stringify({f:f,t:t,s:SITE});if(navigator.sendBeacon)navigator.sendBeacon(API+"/api/click?site="+SITE,new Blob([b],{type:"text/plain"}));else fetch(API+"/api/click?site="+SITE,{method:"POST",body:b,keepalive:true,mode:"no-cors"})}catch(e){}}
document.addEventListener("click",function(e){var a=e.target.closest&&e.target.closest("a[data-fid]");if(a)beacon(a.getAttribute("data-fid"),a.getAttribute("data-ct"))},true);
var forms=document.querySelectorAll("form[data-lead]");if(!forms.length)return;
var ts=false;function loadTS(){if(ts)return;ts=true;var s=document.createElement("script");s.src="https://challenges.cloudflare.com/turnstile/v0/api.js";s.async=true;s.defer=true;document.head.appendChild(s)}
var q=new URLSearchParams(location.search),pl=window.RR_PLACES||{},pre=pl[q.get("county")]||pl[q.get("city")];
function esc(x){return String(x==null?"":x).replace(/[&<>"]/g,function(c){return{"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]})}
function uid(){try{return crypto.randomUUID()}catch(e){return "k"+Date.now().toString(36)+Math.random().toString(36).slice(2,12)}}
function cslug(c){return String(c||"").toLowerCase().replace(/[^a-z]+/g,"-")}
var NEXT="<h3 class=\"lf-h\">What happens next</h3><ol><li>Pros usually reply by phone or email within 1-2 business days.</li><li>Ask each for its licence number (MPCA, MDH or Saint Paul TISH) and a written quote. Tell them your closing or listing date.</li></ol>";
forms.forEach(function(f){var src=f.querySelector("[name=source]");if(src)src.value=location.pathname;
 var id=f.querySelector("[name=idem]");if(id&&!id.value)id.value=uid();
 f.addEventListener("focusin",loadTS,{once:true});f.addEventListener("pointerenter",loadTS,{once:true});
 var cs=f.querySelector("select[name=county]");if(cs&&pre&&!cs.value)cs.value=pre;
 var fi=f.querySelector("input[name=firm]"),fid=q.get("firm"),fr=fid&&(window.NET_FIRMS||{})[fid];
 if(fi&&fr){var SL={"s": "septic inspection", "t": "radon testing", "m": "radon mitigation", "h": "Saint Paul TISH evaluation"},SN={"s": "septic", "t": "radon_test", "m": "radon_mitigation", "h": "tish"},fn=fr[0],sv=fr[1];fi.value=fid;var fl=f.querySelector(".lf-firm");if(fl){fl.innerHTML='Your request goes to <strong>'+esc(fn)+'</strong> and up to 2 other nearby pros. '+esc(fn)+' offers: '+sv.split("").map(function(c){return SL[c]}).join(", ")+'.';fl.hidden=false}var r0=f.querySelector('input[name=need][value="'+SN[sv[0]]+'"]');if(r0&&!f.querySelector("input[name=need]:checked"))r0.checked=true}
 if(fi&&fn&&/^F[0-9]{1,6}$/.test(fid)){fi.value=fid;var fl=f.querySelector(".lf-firm");if(fl){fl.innerHTML='Your request goes to <strong>'+esc(fn)+'</strong> and up to 2 other nearby certified pros.';fl.hidden=false}}
 f.addEventListener("submit",function(e){if(!window.fetch)return;e.preventDefault();var out=f.querySelector(".lf-out"),btn=f.querySelector("button[type=submit]"),d={},sent=false;
  new FormData(f).forEach(function(v,k){d[k]=v});d.consent=!!f.querySelector("[name=consent]").checked;var mk=f.querySelector("[name=marketing_opt_in]");d.marketing_opt_in=!!(mk&&mk.checked);
  if(!String(d.email||"").trim()&&!String(d.phone||"").trim()){out.textContent="Please enter an email address or a phone number so firms can reach you.";(f.querySelector("[name=email]")||{focus:function(){}}).focus();return}
  btn.disabled=true;out.textContent="Sending...";
  fetch(f.action,{method:"POST",headers:{"content-type":"application/json",accept:"application/json"},body:JSON.stringify(d)}).then(function(r){sent=true;return r.json()}).then(function(j){
   if(j.ok){f.innerHTML='<div class="lf-done" tabindex="-1"><h2 class="lf-h">'+(j.duplicate?'We already have your request':'Request sent')+'</h2><p>We sent your request to '+j.firms.length+' pro'+(j.firms.length==1?'':'s')+':</p><ul>'+j.firms.map(function(x){return'<li><strong>'+esc(x.name)+'</strong>'+(x.phone?' · <a href="tel:'+esc(String(x.phone).replace(/[^0-9+]/g,""))+'">'+esc(x.phone)+'</a>':'')+'</li>'}).join('')+'</ul><p class="muted">They will contact you directly.'+(d.email?' We emailed you this list.':' Keep this page or note the reference below.')+'</p>'+NEXT+'<p class="muted">Reference: '+esc(j.lead_id||"")+'</p>'+'</div>';
    try{history.replaceState(null,"",location.pathname+"?sent=1"+location.hash)}catch(x){}var dn=f.querySelector(".lf-done");if(dn)dn.focus();return}
   btn.disabled=false;
   if(j.error&&/couldn't find/.test(j.error)){out.innerHTML=esc(j.error)+' <a href="/counties/">Browse licensed pros by county</a>.';}
   else out.textContent=j.fields?Object.keys(j.fields).map(function(k){return j.fields[k]}).join(" "):(j.error||"Something went wrong.");
   if(window.turnstile)try{turnstile.reset()}catch(x){}
  }).catch(function(){btn.disabled=false;
   /* Same idem key: the Worker won't route this request twice even if the first post got through. */
   if(!sent)f.submit();else out.innerHTML='We couldn\'t confirm your request. Please don\'t resend it. <a href="/counties/">Browse licensed pros by county</a>.'})})})})();

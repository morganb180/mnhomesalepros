/* Credential chip from text already on the card or firm page. No new facts. */
(function(){
  function chip(text, title){
    var el=document.createElement("span");
    el.className="cred";
    el.textContent=text;
    if(title)el.title=title;
    return el;
  }
  function idsIn(text){
    var out=[], re=/([A-Z]{2,6}-\d{3,6})/g, m;
    while((m=re.exec(text))){ if(out.indexOf(m[1])<0) out.push(m[1]); }
    return out;
  }
  function licenseNo(text){
    var m=text.match(/Licen[cs]e\s+(L\d+)/i);
    return m?m[1]:"";
  }
  var cards=document.querySelectorAll(".card");
  for(var i=0;i<cards.length;i++){
    var card=cards[i];
    if(card.querySelector(".cred"))continue;
    var text=(card.textContent||"").replace(/\s+/g," ").trim();
    var slot=card.querySelector("h3")||card;
    var ids=idsIn(text), lic=licenseNo(text), el=null;
    if(lic && /MPCA|SSTS|Septic/i.test(text)){
      el=chip("MPCA "+lic, "MPCA SSTS license "+lic);
    }else if(ids.length){
      el=chip("MDH "+ids[0]+(ids.length>1?" · +"+(ids.length-1)+" more":""), "Credential IDs: "+ids.join(", "));
    }else if(/Saint Paul/i.test(text) && /TISH/i.test(text)){
      el=chip("Saint Paul TISH", "Saint Paul-approved TISH evaluator");
    }
    if(el)slot.parentNode.insertBefore(el, slot.nextSibling);
  }
  var pills=document.querySelector(".fp-pills");
  if(pills && !pills.querySelector(".cred")){
    var body=(document.body.textContent||"").replace(/\s+/g," ");
    var ids=idsIn(body), lic=licenseNo(body), el=null;
    if(lic) el=chip("MPCA "+lic, "MPCA SSTS license "+lic);
    else if(ids.length) el=chip("MDH "+ids[0]+(ids.length>1?" · +"+(ids.length-1)+" more":""), "Credential IDs: "+ids.join(", "));
    else if(/Saint Paul/i.test(body) && /TISH/i.test(body)) el=chip("Saint Paul TISH");
    if(el)pills.appendChild(el);
  }
})();

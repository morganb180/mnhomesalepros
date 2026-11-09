/* Rotating sample of firms that already have a Google rating in /assets/showcase.json.
   No-JS markup in the page is the fallback. This script only replaces those three cards. */
(function(){
  var root=document.getElementById("showcase");
  if(!root)return;
  var slots=root.querySelectorAll(".pcard");
  var note=document.getElementById("showcase-note");
  if(slots.length<1)return;
  fetch("/assets/showcase.json").then(function(r){return r.json()}).then(function(data){
    var pool=(data.firms||[]).slice();
    if(pool.length<slots.length)return;
    for(var i=pool.length-1;i>0;i--){var j=Math.floor(Math.random()*(i+1));var t=pool[i];pool[i]=pool[j];pool[j]=t}
    var n=pool.length, cursor=0;
    function fill(){
      for(var s=0;s<slots.length;s++){
        var f=pool[(cursor+s)%n], card=slots[s];
        card.href=f.href;
        var name=card.querySelector(".pname");if(name)name.textContent=f.name;
        var cred=card.querySelector(".cred");if(cred)cred.textContent=f.cred;
        var meta=card.querySelector(".pmeta");if(meta)meta.textContent=f.service+(f.town?" · "+f.town:"");
        var rate=card.querySelector(".prate");if(rate)rate.innerHTML="<b>★ "+f.rating.toFixed(1)+"</b> ("+f.reviews+" Google reviews)";
      }
    }
    fill();
    var reduce=window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if(note){
      note.textContent="Ratings as of "+data.as_of+". Firms at "+data.min_rating+" or higher with at least "+data.min_reviews+" Google reviews ("+data.count+" firms). Three cards are chosen at random from that set"+(reduce?" when the page loads.":" and change every few seconds.")+" Not a ranking and not paid placement. County and service lists stay ordered by location and name.";
    }
    if(!reduce){
      setInterval(function(){cursor=(cursor+1)%n;fill()},6000);
    }
  }).catch(function(){});
})();

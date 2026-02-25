import{a as L,S as P,i as a}from"./assets/vendor--6n4cVRZ.js";(function(){const o=document.createElement("link").relList;if(o&&o.supports&&o.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))c(t);new MutationObserver(t=>{for(const s of t)if(s.type==="childList")for(const l of s.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&c(l)}).observe(document,{childList:!0,subtree:!0});function e(t){const s={};return t.integrity&&(s.integrity=t.integrity),t.referrerPolicy&&(s.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?s.credentials="include":t.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function c(t){if(t.ep)return;t.ep=!0;const s=e(t);fetch(t.href,s)}})();const w="https://pixabay.com/api/",S="54665175-71b46f9aabf89f8cddeeb37be",v=15;async function u(r,o=1){return(await L.get(w,{params:{key:S,q:r,image_type:"photo",orientation:"horizontal",safesearch:!0,page:o,per_page:v}})).data}const f=document.querySelector(".gallery"),p=document.querySelector(".loader"),R=new P(".gallery a");function h(r){const o=r.map(e=>`
    <li class="gallery-item">
      <a href="${e.largeImageURL}">
        <img 
          src="${e.webformatURL}" 
          alt="${e.tags}" 
        />
      </a>
      <div class="info">
        <p><b>Likes</b> ${e.likes}</p>
        <p><b>Views</b> ${e.views}</p>
        <p><b>Comments</b> ${e.comments}</p>
        <p><b>Downloads</b> ${e.downloads}</p>
      </div>
    </li>
  `).join("");f.insertAdjacentHTML("beforeend",o),R.refresh()}function E(){f.innerHTML=""}function m(){p.classList.remove("is-hidden")}function g(){p.classList.add("is-hidden")}let d="",n=1,y=15;const i=document.querySelector(".load-more"),b=document.querySelector(".form");b.addEventListener("submit",q);async function q(r){r.preventDefault();const o=r.target.elements["search-text"].value.trim();if(!o){a.error({message:"Please enter a search query!",position:"topRight"});return}d=o,n=1,E(),i.classList.add("hidden"),m();try{const e=await u(d,n);if(e.hits.length===0){a.error({message:"Sorry, there are no images matching your search query. Please try again!",position:"topRight"});return}h(e.hits),Math.ceil(e.totalHits/y)>1&&i.classList.remove("hidden")}catch(e){a.error({message:"Something went wrong. Please try again later.",position:"topRight"}),console.error(e)}finally{g()}b.reset()}i.addEventListener("click",async()=>{n+=1,m();try{const r=await u(d,n);h(r.hits);const o=Math.ceil(r.totalHits/y);n>=o&&(i.classList.add("hidden"),a.info({message:"You've reached the end of search results.",position:"topRight"}))}catch(r){a.error({message:"Something went wrong. Please try again later.",position:"topRight"}),console.error(r)}finally{g()}});
//# sourceMappingURL=index.js.map

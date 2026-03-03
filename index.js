import{a as P,S,i as n}from"./assets/vendor--6n4cVRZ.js";(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))a(t);new MutationObserver(t=>{for(const s of t)if(s.type==="childList")for(const c of s.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&a(c)}).observe(document,{childList:!0,subtree:!0});function e(t){const s={};return t.integrity&&(s.integrity=t.integrity),t.referrerPolicy&&(s.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?s.credentials="include":t.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function a(t){if(t.ep)return;t.ep=!0;const s=e(t);fetch(t.href,s)}})();const v="https://pixabay.com/api/",R="54665175-71b46f9aabf89f8cddeeb37be",q=15;async function d(o,r=1){return(await P.get(v,{params:{key:R,q:o,image_type:"photo",orientation:"horizontal",safesearch:!0,page:r,per_page:q}})).data}const u=document.querySelector(".gallery"),f=document.querySelector(".loader"),h=document.querySelector(".load-more"),M=new S(".gallery a");function p(o){const r=o.map(e=>`
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
  `).join("");u.insertAdjacentHTML("beforeend",r),M.refresh()}function E(){u.innerHTML=""}function m(){f.classList.remove("is-hidden")}function g(){f.classList.add("is-hidden")}function y(){h.classList.add("hidden")}function b(){h.classList.remove("hidden")}let l="",i=1,L=15;const w=document.querySelector(".form"),$=document.querySelector(".load-more");w.addEventListener("submit",B);$.addEventListener("click",A);async function B(o){o.preventDefault();const r=o.target.elements["search-text"].value.trim();if(!r){n.error({message:"Please enter a search query!",position:"topRight"});return}l=r,i=1,E(),y(),m();try{const e=await d(l,i);if(e.hits.length===0){n.error({message:"Sorry, there are no images matching your search query. Please try again!",position:"topRight"});return}p(e.hits),Math.ceil(e.totalHits/L)>1?b():n.info({message:"You've reached the end of search results.",position:"topRight"})}catch(e){n.error({message:"Something went wrong. Please try again later.",position:"topRight"}),console.error(e)}finally{g()}w.reset()}async function A(){i+=1,y(),m();try{const o=await d(l,i);p(o.hits);const r=Math.ceil(o.totalHits/L);i<r?b():n.info({message:"You've reached the end of search results.",position:"topRight"});const e=document.querySelectorAll(".gallery-item"),{height:a}=e[0].getBoundingClientRect();window.scrollBy({top:a*2,behavior:"smooth"})}catch(o){n.error({message:"Something went wrong. Please try again later.",position:"topRight"}),console.error(o)}finally{g()}}
//# sourceMappingURL=index.js.map

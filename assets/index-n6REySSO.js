(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))i(r);new MutationObserver(r=>{for(const s of r)if(s.type==="childList")for(const o of s.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&i(o)}).observe(document,{childList:!0,subtree:!0});function t(r){const s={};return r.integrity&&(s.integrity=r.integrity),r.referrerPolicy&&(s.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?s.credentials="include":r.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function i(r){if(r.ep)return;r.ep=!0;const s=t(r);fetch(r.href,s)}})();/**
* @vue/shared v3.5.21
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/function xl(n){const e=Object.create(null);for(const t of n.split(","))e[t]=1;return t=>t in e}const ht={},or=[],wn=()=>{},ef=()=>!1,ao=n=>n.charCodeAt(0)===111&&n.charCodeAt(1)===110&&(n.charCodeAt(2)>122||n.charCodeAt(2)<97),yl=n=>n.startsWith("onUpdate:"),Ft=Object.assign,Sl=(n,e)=>{const t=n.indexOf(e);t>-1&&n.splice(t,1)},ih=Object.prototype.hasOwnProperty,st=(n,e)=>ih.call(n,e),Ge=Array.isArray,ar=n=>lo(n)==="[object Map]",tf=n=>lo(n)==="[object Set]",Xe=n=>typeof n=="function",Et=n=>typeof n=="string",mi=n=>typeof n=="symbol",gt=n=>n!==null&&typeof n=="object",nf=n=>(gt(n)||Xe(n))&&Xe(n.then)&&Xe(n.catch),rf=Object.prototype.toString,lo=n=>rf.call(n),rh=n=>lo(n).slice(8,-1),sf=n=>lo(n)==="[object Object]",Ml=n=>Et(n)&&n!=="NaN"&&n[0]!=="-"&&""+parseInt(n,10)===n,Or=xl(",key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted"),co=n=>{const e=Object.create(null);return(t=>e[t]||(e[t]=n(t)))},sh=/-\w/g,cn=co(n=>n.replace(sh,e=>e.slice(1).toUpperCase())),oh=/\B([A-Z])/g,Oi=co(n=>n.replace(oh,"-$1").toLowerCase()),uo=co(n=>n.charAt(0).toUpperCase()+n.slice(1)),Ao=co(n=>n?`on${uo(n)}`:""),li=(n,e)=>!Object.is(n,e),wo=(n,...e)=>{for(let t=0;t<n.length;t++)n[t](...e)},of=(n,e,t,i=!1)=>{Object.defineProperty(n,e,{configurable:!0,enumerable:!1,writable:i,value:t})},ah=n=>{const e=parseFloat(n);return isNaN(e)?n:e};let ac;const fo=()=>ac||(ac=typeof globalThis<"u"?globalThis:typeof self<"u"?self:typeof window<"u"?window:typeof global<"u"?global:{});function El(n){if(Ge(n)){const e={};for(let t=0;t<n.length;t++){const i=n[t],r=Et(i)?fh(i):El(i);if(r)for(const s in r)e[s]=r[s]}return e}else if(Et(n)||gt(n))return n}const lh=/;(?![^(]*\))/g,ch=/:([^]+)/,uh=/\/\*[^]*?\*\//g;function fh(n){const e={};return n.replace(uh,"").split(lh).forEach(t=>{if(t){const i=t.split(ch);i.length>1&&(e[i[0].trim()]=i[1].trim())}}),e}function rs(n){let e="";if(Et(n))e=n;else if(Ge(n))for(let t=0;t<n.length;t++){const i=rs(n[t]);i&&(e+=i+" ")}else if(gt(n))for(const t in n)n[t]&&(e+=t+" ");return e.trim()}const dh="itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly",hh=xl(dh);function af(n){return!!n||n===""}const lf=n=>!!(n&&n.__v_isRef===!0),Tt=n=>Et(n)?n:n==null?"":Ge(n)||gt(n)&&(n.toString===rf||!Xe(n.toString))?lf(n)?Tt(n.value):JSON.stringify(n,cf,2):String(n),cf=(n,e)=>lf(e)?cf(n,e.value):ar(e)?{[`Map(${e.size})`]:[...e.entries()].reduce((t,[i,r],s)=>(t[Ro(i,s)+" =>"]=r,t),{})}:tf(e)?{[`Set(${e.size})`]:[...e.values()].map(t=>Ro(t))}:mi(e)?Ro(e):gt(e)&&!Ge(e)&&!sf(e)?String(e):e,Ro=(n,e="")=>{var t;return mi(n)?`Symbol(${(t=n.description)!=null?t:e})`:n};/**
* @vue/reactivity v3.5.21
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/let Wt;class ph{constructor(e=!1){this.detached=e,this._active=!0,this._on=0,this.effects=[],this.cleanups=[],this._isPaused=!1,this.parent=Wt,!e&&Wt&&(this.index=(Wt.scopes||(Wt.scopes=[])).push(this)-1)}get active(){return this._active}pause(){if(this._active){this._isPaused=!0;let e,t;if(this.scopes)for(e=0,t=this.scopes.length;e<t;e++)this.scopes[e].pause();for(e=0,t=this.effects.length;e<t;e++)this.effects[e].pause()}}resume(){if(this._active&&this._isPaused){this._isPaused=!1;let e,t;if(this.scopes)for(e=0,t=this.scopes.length;e<t;e++)this.scopes[e].resume();for(e=0,t=this.effects.length;e<t;e++)this.effects[e].resume()}}run(e){if(this._active){const t=Wt;try{return Wt=this,e()}finally{Wt=t}}}on(){++this._on===1&&(this.prevScope=Wt,Wt=this)}off(){this._on>0&&--this._on===0&&(Wt=this.prevScope,this.prevScope=void 0)}stop(e){if(this._active){this._active=!1;let t,i;for(t=0,i=this.effects.length;t<i;t++)this.effects[t].stop();for(this.effects.length=0,t=0,i=this.cleanups.length;t<i;t++)this.cleanups[t]();if(this.cleanups.length=0,this.scopes){for(t=0,i=this.scopes.length;t<i;t++)this.scopes[t].stop(!0);this.scopes.length=0}if(!this.detached&&this.parent&&!e){const r=this.parent.scopes.pop();r&&r!==this&&(this.parent.scopes[this.index]=r,r.index=this.index)}this.parent=void 0}}}function mh(){return Wt}let dt;const Co=new WeakSet;class uf{constructor(e){this.fn=e,this.deps=void 0,this.depsTail=void 0,this.flags=5,this.next=void 0,this.cleanup=void 0,this.scheduler=void 0,Wt&&Wt.active&&Wt.effects.push(this)}pause(){this.flags|=64}resume(){this.flags&64&&(this.flags&=-65,Co.has(this)&&(Co.delete(this),this.trigger()))}notify(){this.flags&2&&!(this.flags&32)||this.flags&8||df(this)}run(){if(!(this.flags&1))return this.fn();this.flags|=2,lc(this),hf(this);const e=dt,t=gn;dt=this,gn=!0;try{return this.fn()}finally{pf(this),dt=e,gn=t,this.flags&=-3}}stop(){if(this.flags&1){for(let e=this.deps;e;e=e.nextDep)Al(e);this.deps=this.depsTail=void 0,lc(this),this.onStop&&this.onStop(),this.flags&=-2}}trigger(){this.flags&64?Co.add(this):this.scheduler?this.scheduler():this.runIfDirty()}runIfDirty(){ga(this)&&this.run()}get dirty(){return ga(this)}}let ff=0,Br,kr;function df(n,e=!1){if(n.flags|=8,e){n.next=kr,kr=n;return}n.next=Br,Br=n}function bl(){ff++}function Tl(){if(--ff>0)return;if(kr){let e=kr;for(kr=void 0;e;){const t=e.next;e.next=void 0,e.flags&=-9,e=t}}let n;for(;Br;){let e=Br;for(Br=void 0;e;){const t=e.next;if(e.next=void 0,e.flags&=-9,e.flags&1)try{e.trigger()}catch(i){n||(n=i)}e=t}}if(n)throw n}function hf(n){for(let e=n.deps;e;e=e.nextDep)e.version=-1,e.prevActiveLink=e.dep.activeLink,e.dep.activeLink=e}function pf(n){let e,t=n.depsTail,i=t;for(;i;){const r=i.prevDep;i.version===-1?(i===t&&(t=r),Al(i),gh(i)):e=i,i.dep.activeLink=i.prevActiveLink,i.prevActiveLink=void 0,i=r}n.deps=e,n.depsTail=t}function ga(n){for(let e=n.deps;e;e=e.nextDep)if(e.dep.version!==e.version||e.dep.computed&&(mf(e.dep.computed)||e.dep.version!==e.version))return!0;return!!n._dirty}function mf(n){if(n.flags&4&&!(n.flags&16)||(n.flags&=-17,n.globalVersion===jr)||(n.globalVersion=jr,!n.isSSR&&n.flags&128&&(!n.deps&&!n._dirty||!ga(n))))return;n.flags|=2;const e=n.dep,t=dt,i=gn;dt=n,gn=!0;try{hf(n);const r=n.fn(n._value);(e.version===0||li(r,n._value))&&(n.flags|=128,n._value=r,e.version++)}catch(r){throw e.version++,r}finally{dt=t,gn=i,pf(n),n.flags&=-3}}function Al(n,e=!1){const{dep:t,prevSub:i,nextSub:r}=n;if(i&&(i.nextSub=r,n.prevSub=void 0),r&&(r.prevSub=i,n.nextSub=void 0),t.subs===n&&(t.subs=i,!i&&t.computed)){t.computed.flags&=-5;for(let s=t.computed.deps;s;s=s.nextDep)Al(s,!0)}!e&&!--t.sc&&t.map&&t.map.delete(t.key)}function gh(n){const{prevDep:e,nextDep:t}=n;e&&(e.nextDep=t,n.prevDep=void 0),t&&(t.prevDep=e,n.nextDep=void 0)}let gn=!0;const gf=[];function Xn(){gf.push(gn),gn=!1}function jn(){const n=gf.pop();gn=n===void 0?!0:n}function lc(n){const{cleanup:e}=n;if(n.cleanup=void 0,e){const t=dt;dt=void 0;try{e()}finally{dt=t}}}let jr=0;class _h{constructor(e,t){this.sub=e,this.dep=t,this.version=t.version,this.nextDep=this.prevDep=this.nextSub=this.prevSub=this.prevActiveLink=void 0}}class wl{constructor(e){this.computed=e,this.version=0,this.activeLink=void 0,this.subs=void 0,this.map=void 0,this.key=void 0,this.sc=0,this.__v_skip=!0}track(e){if(!dt||!gn||dt===this.computed)return;let t=this.activeLink;if(t===void 0||t.sub!==dt)t=this.activeLink=new _h(dt,this),dt.deps?(t.prevDep=dt.depsTail,dt.depsTail.nextDep=t,dt.depsTail=t):dt.deps=dt.depsTail=t,_f(t);else if(t.version===-1&&(t.version=this.version,t.nextDep)){const i=t.nextDep;i.prevDep=t.prevDep,t.prevDep&&(t.prevDep.nextDep=i),t.prevDep=dt.depsTail,t.nextDep=void 0,dt.depsTail.nextDep=t,dt.depsTail=t,dt.deps===t&&(dt.deps=i)}return t}trigger(e){this.version++,jr++,this.notify(e)}notify(e){bl();try{for(let t=this.subs;t;t=t.prevSub)t.sub.notify()&&t.sub.dep.notify()}finally{Tl()}}}function _f(n){if(n.dep.sc++,n.sub.flags&4){const e=n.dep.computed;if(e&&!n.dep.subs){e.flags|=20;for(let i=e.deps;i;i=i.nextDep)_f(i)}const t=n.dep.subs;t!==n&&(n.prevSub=t,t&&(t.nextSub=n)),n.dep.subs=n}}const _a=new WeakMap,Li=Symbol(""),va=Symbol(""),qr=Symbol("");function Lt(n,e,t){if(gn&&dt){let i=_a.get(n);i||_a.set(n,i=new Map);let r=i.get(t);r||(i.set(t,r=new wl),r.map=i,r.key=t),r.track()}}function Hn(n,e,t,i,r,s){const o=_a.get(n);if(!o){jr++;return}const a=l=>{l&&l.trigger()};if(bl(),e==="clear")o.forEach(a);else{const l=Ge(n),c=l&&Ml(t);if(l&&t==="length"){const u=Number(i);o.forEach((f,d)=>{(d==="length"||d===qr||!mi(d)&&d>=u)&&a(f)})}else switch((t!==void 0||o.has(void 0))&&a(o.get(t)),c&&a(o.get(qr)),e){case"add":l?c&&a(o.get("length")):(a(o.get(Li)),ar(n)&&a(o.get(va)));break;case"delete":l||(a(o.get(Li)),ar(n)&&a(o.get(va)));break;case"set":ar(n)&&a(o.get(Li));break}}Tl()}function Hi(n){const e=rt(n);return e===n?e:(Lt(e,"iterate",qr),ln(n)?e:e.map(Pt))}function ho(n){return Lt(n=rt(n),"iterate",qr),n}const vh={__proto__:null,[Symbol.iterator](){return Po(this,Symbol.iterator,Pt)},concat(...n){return Hi(this).concat(...n.map(e=>Ge(e)?Hi(e):e))},entries(){return Po(this,"entries",n=>(n[1]=Pt(n[1]),n))},every(n,e){return In(this,"every",n,e,void 0,arguments)},filter(n,e){return In(this,"filter",n,e,t=>t.map(Pt),arguments)},find(n,e){return In(this,"find",n,e,Pt,arguments)},findIndex(n,e){return In(this,"findIndex",n,e,void 0,arguments)},findLast(n,e){return In(this,"findLast",n,e,Pt,arguments)},findLastIndex(n,e){return In(this,"findLastIndex",n,e,void 0,arguments)},forEach(n,e){return In(this,"forEach",n,e,void 0,arguments)},includes(...n){return Do(this,"includes",n)},indexOf(...n){return Do(this,"indexOf",n)},join(n){return Hi(this).join(n)},lastIndexOf(...n){return Do(this,"lastIndexOf",n)},map(n,e){return In(this,"map",n,e,void 0,arguments)},pop(){return Tr(this,"pop")},push(...n){return Tr(this,"push",n)},reduce(n,...e){return cc(this,"reduce",n,e)},reduceRight(n,...e){return cc(this,"reduceRight",n,e)},shift(){return Tr(this,"shift")},some(n,e){return In(this,"some",n,e,void 0,arguments)},splice(...n){return Tr(this,"splice",n)},toReversed(){return Hi(this).toReversed()},toSorted(n){return Hi(this).toSorted(n)},toSpliced(...n){return Hi(this).toSpliced(...n)},unshift(...n){return Tr(this,"unshift",n)},values(){return Po(this,"values",Pt)}};function Po(n,e,t){const i=ho(n),r=i[e]();return i!==n&&!ln(n)&&(r._next=r.next,r.next=()=>{const s=r._next();return s.value&&(s.value=t(s.value)),s}),r}const xh=Array.prototype;function In(n,e,t,i,r,s){const o=ho(n),a=o!==n&&!ln(n),l=o[e];if(l!==xh[e]){const f=l.apply(n,s);return a?Pt(f):f}let c=t;o!==n&&(a?c=function(f,d){return t.call(this,Pt(f),d,n)}:t.length>2&&(c=function(f,d){return t.call(this,f,d,n)}));const u=l.call(o,c,i);return a&&r?r(u):u}function cc(n,e,t,i){const r=ho(n);let s=t;return r!==n&&(ln(n)?t.length>3&&(s=function(o,a,l){return t.call(this,o,a,l,n)}):s=function(o,a,l){return t.call(this,o,Pt(a),l,n)}),r[e](s,...i)}function Do(n,e,t){const i=rt(n);Lt(i,"iterate",qr);const r=i[e](...t);return(r===-1||r===!1)&&Pl(t[0])?(t[0]=rt(t[0]),i[e](...t)):r}function Tr(n,e,t=[]){Xn(),bl();const i=rt(n)[e].apply(n,t);return Tl(),jn(),i}const yh=xl("__proto__,__v_isRef,__isVue"),vf=new Set(Object.getOwnPropertyNames(Symbol).filter(n=>n!=="arguments"&&n!=="caller").map(n=>Symbol[n]).filter(mi));function Sh(n){mi(n)||(n=String(n));const e=rt(this);return Lt(e,"has",n),e.hasOwnProperty(n)}class xf{constructor(e=!1,t=!1){this._isReadonly=e,this._isShallow=t}get(e,t,i){if(t==="__v_skip")return e.__v_skip;const r=this._isReadonly,s=this._isShallow;if(t==="__v_isReactive")return!r;if(t==="__v_isReadonly")return r;if(t==="__v_isShallow")return s;if(t==="__v_raw")return i===(r?s?Dh:Ef:s?Mf:Sf).get(e)||Object.getPrototypeOf(e)===Object.getPrototypeOf(i)?e:void 0;const o=Ge(e);if(!r){let l;if(o&&(l=vh[t]))return l;if(t==="hasOwnProperty")return Sh}const a=Reflect.get(e,t,Nt(e)?e:i);return(mi(t)?vf.has(t):yh(t))||(r||Lt(e,"get",t),s)?a:Nt(a)?o&&Ml(t)?a:a.value:gt(a)?r?Tf(a):po(a):a}}class yf extends xf{constructor(e=!1){super(!1,e)}set(e,t,i,r){let s=e[t];if(!this._isShallow){const l=fi(s);if(!ln(i)&&!fi(i)&&(s=rt(s),i=rt(i)),!Ge(e)&&Nt(s)&&!Nt(i))return l||(s.value=i),!0}const o=Ge(e)&&Ml(t)?Number(t)<e.length:st(e,t),a=Reflect.set(e,t,i,Nt(e)?e:r);return e===rt(r)&&(o?li(i,s)&&Hn(e,"set",t,i):Hn(e,"add",t,i)),a}deleteProperty(e,t){const i=st(e,t);e[t];const r=Reflect.deleteProperty(e,t);return r&&i&&Hn(e,"delete",t,void 0),r}has(e,t){const i=Reflect.has(e,t);return(!mi(t)||!vf.has(t))&&Lt(e,"has",t),i}ownKeys(e){return Lt(e,"iterate",Ge(e)?"length":Li),Reflect.ownKeys(e)}}class Mh extends xf{constructor(e=!1){super(!0,e)}set(e,t){return!0}deleteProperty(e,t){return!0}}const Eh=new yf,bh=new Mh,Th=new yf(!0);const xa=n=>n,hs=n=>Reflect.getPrototypeOf(n);function Ah(n,e,t){return function(...i){const r=this.__v_raw,s=rt(r),o=ar(s),a=n==="entries"||n===Symbol.iterator&&o,l=n==="keys"&&o,c=r[n](...i),u=t?xa:e?Ys:Pt;return!e&&Lt(s,"iterate",l?va:Li),{next(){const{value:f,done:d}=c.next();return d?{value:f,done:d}:{value:a?[u(f[0]),u(f[1])]:u(f),done:d}},[Symbol.iterator](){return this}}}}function ps(n){return function(...e){return n==="delete"?!1:n==="clear"?void 0:this}}function wh(n,e){const t={get(r){const s=this.__v_raw,o=rt(s),a=rt(r);n||(li(r,a)&&Lt(o,"get",r),Lt(o,"get",a));const{has:l}=hs(o),c=e?xa:n?Ys:Pt;if(l.call(o,r))return c(s.get(r));if(l.call(o,a))return c(s.get(a));s!==o&&s.get(r)},get size(){const r=this.__v_raw;return!n&&Lt(rt(r),"iterate",Li),r.size},has(r){const s=this.__v_raw,o=rt(s),a=rt(r);return n||(li(r,a)&&Lt(o,"has",r),Lt(o,"has",a)),r===a?s.has(r):s.has(r)||s.has(a)},forEach(r,s){const o=this,a=o.__v_raw,l=rt(a),c=e?xa:n?Ys:Pt;return!n&&Lt(l,"iterate",Li),a.forEach((u,f)=>r.call(s,c(u),c(f),o))}};return Ft(t,n?{add:ps("add"),set:ps("set"),delete:ps("delete"),clear:ps("clear")}:{add(r){!e&&!ln(r)&&!fi(r)&&(r=rt(r));const s=rt(this);return hs(s).has.call(s,r)||(s.add(r),Hn(s,"add",r,r)),this},set(r,s){!e&&!ln(s)&&!fi(s)&&(s=rt(s));const o=rt(this),{has:a,get:l}=hs(o);let c=a.call(o,r);c||(r=rt(r),c=a.call(o,r));const u=l.call(o,r);return o.set(r,s),c?li(s,u)&&Hn(o,"set",r,s):Hn(o,"add",r,s),this},delete(r){const s=rt(this),{has:o,get:a}=hs(s);let l=o.call(s,r);l||(r=rt(r),l=o.call(s,r)),a&&a.call(s,r);const c=s.delete(r);return l&&Hn(s,"delete",r,void 0),c},clear(){const r=rt(this),s=r.size!==0,o=r.clear();return s&&Hn(r,"clear",void 0,void 0),o}}),["keys","values","entries",Symbol.iterator].forEach(r=>{t[r]=Ah(r,n,e)}),t}function Rl(n,e){const t=wh(n,e);return(i,r,s)=>r==="__v_isReactive"?!n:r==="__v_isReadonly"?n:r==="__v_raw"?i:Reflect.get(st(t,r)&&r in i?t:i,r,s)}const Rh={get:Rl(!1,!1)},Ch={get:Rl(!1,!0)},Ph={get:Rl(!0,!1)};const Sf=new WeakMap,Mf=new WeakMap,Ef=new WeakMap,Dh=new WeakMap;function Ih(n){switch(n){case"Object":case"Array":return 1;case"Map":case"Set":case"WeakMap":case"WeakSet":return 2;default:return 0}}function Lh(n){return n.__v_skip||!Object.isExtensible(n)?0:Ih(rh(n))}function po(n){return fi(n)?n:Cl(n,!1,Eh,Rh,Sf)}function bf(n){return Cl(n,!1,Th,Ch,Mf)}function Tf(n){return Cl(n,!0,bh,Ph,Ef)}function Cl(n,e,t,i,r){if(!gt(n)||n.__v_raw&&!(e&&n.__v_isReactive))return n;const s=Lh(n);if(s===0)return n;const o=r.get(n);if(o)return o;const a=new Proxy(n,s===2?i:t);return r.set(n,a),a}function lr(n){return fi(n)?lr(n.__v_raw):!!(n&&n.__v_isReactive)}function fi(n){return!!(n&&n.__v_isReadonly)}function ln(n){return!!(n&&n.__v_isShallow)}function Pl(n){return n?!!n.__v_raw:!1}function rt(n){const e=n&&n.__v_raw;return e?rt(e):n}function Uh(n){return!st(n,"__v_skip")&&Object.isExtensible(n)&&of(n,"__v_skip",!0),n}const Pt=n=>gt(n)?po(n):n,Ys=n=>gt(n)?Tf(n):n;function Nt(n){return n?n.__v_isRef===!0:!1}function Dl(n){return Af(n,!1)}function Nh(n){return Af(n,!0)}function Af(n,e){return Nt(n)?n:new Fh(n,e)}class Fh{constructor(e,t){this.dep=new wl,this.__v_isRef=!0,this.__v_isShallow=!1,this._rawValue=t?e:rt(e),this._value=t?e:Pt(e),this.__v_isShallow=t}get value(){return this.dep.track(),this._value}set value(e){const t=this._rawValue,i=this.__v_isShallow||ln(e)||fi(e);e=i?e:rt(e),li(e,t)&&(this._rawValue=e,this._value=i?e:Pt(e),this.dep.trigger())}}function tt(n){return Nt(n)?n.value:n}const Oh={get:(n,e,t)=>e==="__v_raw"?n:tt(Reflect.get(n,e,t)),set:(n,e,t,i)=>{const r=n[e];return Nt(r)&&!Nt(t)?(r.value=t,!0):Reflect.set(n,e,t,i)}};function wf(n){return lr(n)?n:new Proxy(n,Oh)}class Bh{constructor(e,t,i){this.fn=e,this.setter=t,this._value=void 0,this.dep=new wl(this),this.__v_isRef=!0,this.deps=void 0,this.depsTail=void 0,this.flags=16,this.globalVersion=jr-1,this.next=void 0,this.effect=this,this.__v_isReadonly=!t,this.isSSR=i}notify(){if(this.flags|=16,!(this.flags&8)&&dt!==this)return df(this,!0),!0}get value(){const e=this.dep.track();return mf(this),e&&(e.version=this.dep.version),this._value}set value(e){this.setter&&this.setter(e)}}function kh(n,e,t=!1){let i,r;return Xe(n)?i=n:(i=n.get,r=n.set),new Bh(i,r,t)}const ms={},$s=new WeakMap;let Ai;function zh(n,e=!1,t=Ai){if(t){let i=$s.get(t);i||$s.set(t,i=[]),i.push(n)}}function Hh(n,e,t=ht){const{immediate:i,deep:r,once:s,scheduler:o,augmentJob:a,call:l}=t,c=M=>r?M:ln(M)||r===!1||r===0?oi(M,1):oi(M);let u,f,d,p,v=!1,x=!1;if(Nt(n)?(f=()=>n.value,v=ln(n)):lr(n)?(f=()=>c(n),v=!0):Ge(n)?(x=!0,v=n.some(M=>lr(M)||ln(M)),f=()=>n.map(M=>{if(Nt(M))return M.value;if(lr(M))return c(M);if(Xe(M))return l?l(M,2):M()})):Xe(n)?e?f=l?()=>l(n,2):n:f=()=>{if(d){Xn();try{d()}finally{jn()}}const M=Ai;Ai=u;try{return l?l(n,3,[p]):n(p)}finally{Ai=M}}:f=wn,e&&r){const M=f,C=r===!0?1/0:r;f=()=>oi(M(),C)}const m=mh(),h=()=>{u.stop(),m&&m.active&&Sl(m.effects,u)};if(s&&e){const M=e;e=(...C)=>{M(...C),h()}}let w=x?new Array(n.length).fill(ms):ms;const T=M=>{if(!(!(u.flags&1)||!u.dirty&&!M))if(e){const C=u.run();if(r||v||(x?C.some((D,R)=>li(D,w[R])):li(C,w))){d&&d();const D=Ai;Ai=u;try{const R=[C,w===ms?void 0:x&&w[0]===ms?[]:w,p];w=C,l?l(e,3,R):e(...R)}finally{Ai=D}}}else u.run()};return a&&a(T),u=new uf(f),u.scheduler=o?()=>o(T,!1):T,p=M=>zh(M,!1,u),d=u.onStop=()=>{const M=$s.get(u);if(M){if(l)l(M,4);else for(const C of M)C();$s.delete(u)}},e?i?T(!0):w=u.run():o?o(T.bind(null,!0),!0):u.run(),h.pause=u.pause.bind(u),h.resume=u.resume.bind(u),h.stop=h,h}function oi(n,e=1/0,t){if(e<=0||!gt(n)||n.__v_skip||(t=t||new Map,(t.get(n)||0)>=e))return n;if(t.set(n,e),e--,Nt(n))oi(n.value,e,t);else if(Ge(n))for(let i=0;i<n.length;i++)oi(n[i],e,t);else if(tf(n)||ar(n))n.forEach(i=>{oi(i,e,t)});else if(sf(n)){for(const i in n)oi(n[i],e,t);for(const i of Object.getOwnPropertySymbols(n))Object.prototype.propertyIsEnumerable.call(n,i)&&oi(n[i],e,t)}return n}/**
* @vue/runtime-core v3.5.21
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/function ss(n,e,t,i){try{return i?n(...i):n()}catch(r){mo(r,e,t)}}function Pn(n,e,t,i){if(Xe(n)){const r=ss(n,e,t,i);return r&&nf(r)&&r.catch(s=>{mo(s,e,t)}),r}if(Ge(n)){const r=[];for(let s=0;s<n.length;s++)r.push(Pn(n[s],e,t,i));return r}}function mo(n,e,t,i=!0){const r=e?e.vnode:null,{errorHandler:s,throwUnhandledErrorInProduction:o}=e&&e.appContext.config||ht;if(e){let a=e.parent;const l=e.proxy,c=`https://vuejs.org/error-reference/#runtime-${t}`;for(;a;){const u=a.ec;if(u){for(let f=0;f<u.length;f++)if(u[f](n,l,c)===!1)return}a=a.parent}if(s){Xn(),ss(s,null,10,[n,l,c]),jn();return}}Vh(n,t,r,i,o)}function Vh(n,e,t,i=!0,r=!1){if(r)throw n;console.error(n)}const zt=[];let Sn=-1;const cr=[];let ii=null,nr=0;const Rf=Promise.resolve();let Ks=null;function Cf(n){const e=Ks||Rf;return n?e.then(this?n.bind(this):n):e}function Gh(n){let e=Sn+1,t=zt.length;for(;e<t;){const i=e+t>>>1,r=zt[i],s=Yr(r);s<n||s===n&&r.flags&2?e=i+1:t=i}return e}function Il(n){if(!(n.flags&1)){const e=Yr(n),t=zt[zt.length-1];!t||!(n.flags&2)&&e>=Yr(t)?zt.push(n):zt.splice(Gh(e),0,n),n.flags|=1,Pf()}}function Pf(){Ks||(Ks=Rf.then(If))}function Wh(n){Ge(n)?cr.push(...n):ii&&n.id===-1?ii.splice(nr+1,0,n):n.flags&1||(cr.push(n),n.flags|=1),Pf()}function uc(n,e,t=Sn+1){for(;t<zt.length;t++){const i=zt[t];if(i&&i.flags&2){if(n&&i.id!==n.uid)continue;zt.splice(t,1),t--,i.flags&4&&(i.flags&=-2),i(),i.flags&4||(i.flags&=-2)}}}function Df(n){if(cr.length){const e=[...new Set(cr)].sort((t,i)=>Yr(t)-Yr(i));if(cr.length=0,ii){ii.push(...e);return}for(ii=e,nr=0;nr<ii.length;nr++){const t=ii[nr];t.flags&4&&(t.flags&=-2),t.flags&8||t(),t.flags&=-2}ii=null,nr=0}}const Yr=n=>n.id==null?n.flags&2?-1:1/0:n.id;function If(n){try{for(Sn=0;Sn<zt.length;Sn++){const e=zt[Sn];e&&!(e.flags&8)&&(e.flags&4&&(e.flags&=-2),ss(e,e.i,e.i?15:14),e.flags&4||(e.flags&=-2))}}finally{for(;Sn<zt.length;Sn++){const e=zt[Sn];e&&(e.flags&=-2)}Sn=-1,zt.length=0,Df(),Ks=null,(zt.length||cr.length)&&If()}}let pn=null,Lf=null;function Zs(n){const e=pn;return pn=n,Lf=n&&n.type.__scopeId||null,e}function rr(n,e=pn,t){if(!e||n._n)return n;const i=(...r)=>{i._d&&eo(-1);const s=Zs(e);let o;try{o=n(...r)}finally{Zs(s),i._d&&eo(1)}return o};return i._n=!0,i._c=!0,i._d=!0,i}function vi(n,e,t,i){const r=n.dirs,s=e&&e.dirs;for(let o=0;o<r.length;o++){const a=r[o];s&&(a.oldValue=s[o].value);let l=a.dir[i];l&&(Xn(),Pn(l,t,8,[n.el,a,n,e]),jn())}}const Xh=Symbol("_vte"),jh=n=>n.__isTeleport,qh=Symbol("_leaveCb");function Ll(n,e){n.shapeFlag&6&&n.component?(n.transition=e,Ll(n.component.subTree,e)):n.shapeFlag&128?(n.ssContent.transition=e.clone(n.ssContent),n.ssFallback.transition=e.clone(n.ssFallback)):n.transition=e}function Uf(n,e){return Xe(n)?Ft({name:n.name},e,{setup:n}):n}function Nf(n){n.ids=[n.ids[0]+n.ids[2]+++"-",0,0]}const Js=new WeakMap;function zr(n,e,t,i,r=!1){if(Ge(n)){n.forEach((v,x)=>zr(v,e&&(Ge(e)?e[x]:e),t,i,r));return}if(Hr(i)&&!r){i.shapeFlag&512&&i.type.__asyncResolved&&i.component.subTree.component&&zr(n,e,t,i.component.subTree);return}const s=i.shapeFlag&4?zl(i.component):i.el,o=r?null:s,{i:a,r:l}=n,c=e&&e.r,u=a.refs===ht?a.refs={}:a.refs,f=a.setupState,d=rt(f),p=f===ht?ef:v=>st(d,v);if(c!=null&&c!==l){if(fc(e),Et(c))u[c]=null,p(c)&&(f[c]=null);else if(Nt(c)){c.value=null;const v=e;v.k&&(u[v.k]=null)}}if(Xe(l))ss(l,a,12,[o,u]);else{const v=Et(l),x=Nt(l);if(v||x){const m=()=>{if(n.f){const h=v?p(l)?f[l]:u[l]:l.value;if(r)Ge(h)&&Sl(h,s);else if(Ge(h))h.includes(s)||h.push(s);else if(v)u[l]=[s],p(l)&&(f[l]=u[l]);else{const w=[s];l.value=w,n.k&&(u[n.k]=w)}}else v?(u[l]=o,p(l)&&(f[l]=o)):x&&(l.value=o,n.k&&(u[n.k]=o))};if(o){const h=()=>{m(),Js.delete(n)};h.id=-1,Js.set(n,h),Jt(h,t)}else fc(n),m()}}}function fc(n){const e=Js.get(n);e&&(e.flags|=8,Js.delete(n))}fo().requestIdleCallback;fo().cancelIdleCallback;const Hr=n=>!!n.type.__asyncLoader,Ff=n=>n.type.__isKeepAlive;function Yh(n,e){Of(n,"a",e)}function $h(n,e){Of(n,"da",e)}function Of(n,e,t=Ut){const i=n.__wdc||(n.__wdc=()=>{let r=t;for(;r;){if(r.isDeactivated)return;r=r.parent}return n()});if(go(e,i,t),t){let r=t.parent;for(;r&&r.parent;)Ff(r.parent.vnode)&&Kh(i,e,t,r),r=r.parent}}function Kh(n,e,t,i){const r=go(e,n,i,!0);kf(()=>{Sl(i[e],r)},t)}function go(n,e,t=Ut,i=!1){if(t){const r=t[n]||(t[n]=[]),s=e.__weh||(e.__weh=(...o)=>{Xn();const a=os(t),l=Pn(e,t,n,o);return a(),jn(),l});return i?r.unshift(s):r.push(s),s}}const $n=n=>(e,t=Ut)=>{(!Kr||n==="sp")&&go(n,(...i)=>e(...i),t)},Zh=$n("bm"),Ul=$n("m"),Jh=$n("bu"),Qh=$n("u"),Bf=$n("bum"),kf=$n("um"),ep=$n("sp"),tp=$n("rtg"),np=$n("rtc");function ip(n,e=Ut){go("ec",n,e)}const rp="components";function Nl(n,e){return op(rp,n,!0,e)||n}const sp=Symbol.for("v-ndc");function op(n,e,t=!0,i=!1){const r=pn||Ut;if(r){const s=r.type;{const a=Yp(s,!1);if(a&&(a===e||a===cn(e)||a===uo(cn(e))))return s}const o=dc(r[n]||s[n],e)||dc(r.appContext[n],e);return!o&&i?s:o}}function dc(n,e){return n&&(n[e]||n[cn(e)]||n[uo(cn(e))])}function Gt(n,e,t,i){let r;const s=t,o=Ge(n);if(o||Et(n)){const a=o&&lr(n);let l=!1,c=!1;a&&(l=!ln(n),c=fi(n),n=ho(n)),r=new Array(n.length);for(let u=0,f=n.length;u<f;u++)r[u]=e(l?c?Ys(Pt(n[u])):Pt(n[u]):n[u],u,void 0,s)}else if(typeof n=="number"){r=new Array(n);for(let a=0;a<n;a++)r[a]=e(a+1,a,void 0,s)}else if(gt(n))if(n[Symbol.iterator])r=Array.from(n,(a,l)=>e(a,l,void 0,s));else{const a=Object.keys(n);r=new Array(a.length);for(let l=0,c=a.length;l<c;l++){const u=a[l];r[l]=e(n[u],u,l,s)}}else r=[];return r}const ya=n=>n?sd(n)?zl(n):ya(n.parent):null,Vr=Ft(Object.create(null),{$:n=>n,$el:n=>n.vnode.el,$data:n=>n.data,$props:n=>n.props,$attrs:n=>n.attrs,$slots:n=>n.slots,$refs:n=>n.refs,$parent:n=>ya(n.parent),$root:n=>ya(n.root),$host:n=>n.ce,$emit:n=>n.emit,$options:n=>Hf(n),$forceUpdate:n=>n.f||(n.f=()=>{Il(n.update)}),$nextTick:n=>n.n||(n.n=Cf.bind(n.proxy)),$watch:n=>wp.bind(n)}),Io=(n,e)=>n!==ht&&!n.__isScriptSetup&&st(n,e),ap={get({_:n},e){if(e==="__v_skip")return!0;const{ctx:t,setupState:i,data:r,props:s,accessCache:o,type:a,appContext:l}=n;let c;if(e[0]!=="$"){const p=o[e];if(p!==void 0)switch(p){case 1:return i[e];case 2:return r[e];case 4:return t[e];case 3:return s[e]}else{if(Io(i,e))return o[e]=1,i[e];if(r!==ht&&st(r,e))return o[e]=2,r[e];if((c=n.propsOptions[0])&&st(c,e))return o[e]=3,s[e];if(t!==ht&&st(t,e))return o[e]=4,t[e];Sa&&(o[e]=0)}}const u=Vr[e];let f,d;if(u)return e==="$attrs"&&Lt(n.attrs,"get",""),u(n);if((f=a.__cssModules)&&(f=f[e]))return f;if(t!==ht&&st(t,e))return o[e]=4,t[e];if(d=l.config.globalProperties,st(d,e))return d[e]},set({_:n},e,t){const{data:i,setupState:r,ctx:s}=n;return Io(r,e)?(r[e]=t,!0):i!==ht&&st(i,e)?(i[e]=t,!0):st(n.props,e)||e[0]==="$"&&e.slice(1)in n?!1:(s[e]=t,!0)},has({_:{data:n,setupState:e,accessCache:t,ctx:i,appContext:r,propsOptions:s,type:o}},a){let l,c;return!!(t[a]||n!==ht&&a[0]!=="$"&&st(n,a)||Io(e,a)||(l=s[0])&&st(l,a)||st(i,a)||st(Vr,a)||st(r.config.globalProperties,a)||(c=o.__cssModules)&&c[a])},defineProperty(n,e,t){return t.get!=null?n._.accessCache[e]=0:st(t,"value")&&this.set(n,e,t.value,null),Reflect.defineProperty(n,e,t)}};function hc(n){return Ge(n)?n.reduce((e,t)=>(e[t]=null,e),{}):n}let Sa=!0;function lp(n){const e=Hf(n),t=n.proxy,i=n.ctx;Sa=!1,e.beforeCreate&&pc(e.beforeCreate,n,"bc");const{data:r,computed:s,methods:o,watch:a,provide:l,inject:c,created:u,beforeMount:f,mounted:d,beforeUpdate:p,updated:v,activated:x,deactivated:m,beforeDestroy:h,beforeUnmount:w,destroyed:T,unmounted:M,render:C,renderTracked:D,renderTriggered:R,errorCaptured:k,serverPrefetch:b,expose:E,inheritAttrs:L,components:X,directives:K,filters:le}=e;if(c&&cp(c,i,null),o)for(const Q in o){const z=o[Q];Xe(z)&&(i[Q]=z.bind(t))}if(r){const Q=r.call(t,t);gt(Q)&&(n.data=po(Q))}if(Sa=!0,s)for(const Q in s){const z=s[Q],me=Xe(z)?z.bind(t,t):Xe(z.get)?z.get.bind(t,t):wn,ve=!Xe(z)&&Xe(z.set)?z.set.bind(t):wn,Re=Xt({get:me,set:ve});Object.defineProperty(i,Q,{enumerable:!0,configurable:!0,get:()=>Re.value,set:Oe=>Re.value=Oe})}if(a)for(const Q in a)zf(a[Q],i,t,Q);if(l){const Q=Xe(l)?l.call(t):l;Reflect.ownKeys(Q).forEach(z=>{Bs(z,Q[z])})}u&&pc(u,n,"c");function J(Q,z){Ge(z)?z.forEach(me=>Q(me.bind(t))):z&&Q(z.bind(t))}if(J(Zh,f),J(Ul,d),J(Jh,p),J(Qh,v),J(Yh,x),J($h,m),J(ip,k),J(np,D),J(tp,R),J(Bf,w),J(kf,M),J(ep,b),Ge(E))if(E.length){const Q=n.exposed||(n.exposed={});E.forEach(z=>{Object.defineProperty(Q,z,{get:()=>t[z],set:me=>t[z]=me,enumerable:!0})})}else n.exposed||(n.exposed={});C&&n.render===wn&&(n.render=C),L!=null&&(n.inheritAttrs=L),X&&(n.components=X),K&&(n.directives=K),b&&Nf(n)}function cp(n,e,t=wn){Ge(n)&&(n=Ma(n));for(const i in n){const r=n[i];let s;gt(r)?"default"in r?s=Rn(r.from||i,r.default,!0):s=Rn(r.from||i):s=Rn(r),Nt(s)?Object.defineProperty(e,i,{enumerable:!0,configurable:!0,get:()=>s.value,set:o=>s.value=o}):e[i]=s}}function pc(n,e,t){Pn(Ge(n)?n.map(i=>i.bind(e.proxy)):n.bind(e.proxy),e,t)}function zf(n,e,t,i){let r=i.includes(".")?ed(t,i):()=>t[i];if(Et(n)){const s=e[n];Xe(s)&&ks(r,s)}else if(Xe(n))ks(r,n.bind(t));else if(gt(n))if(Ge(n))n.forEach(s=>zf(s,e,t,i));else{const s=Xe(n.handler)?n.handler.bind(t):e[n.handler];Xe(s)&&ks(r,s,n)}}function Hf(n){const e=n.type,{mixins:t,extends:i}=e,{mixins:r,optionsCache:s,config:{optionMergeStrategies:o}}=n.appContext,a=s.get(e);let l;return a?l=a:!r.length&&!t&&!i?l=e:(l={},r.length&&r.forEach(c=>Qs(l,c,o,!0)),Qs(l,e,o)),gt(e)&&s.set(e,l),l}function Qs(n,e,t,i=!1){const{mixins:r,extends:s}=e;s&&Qs(n,s,t,!0),r&&r.forEach(o=>Qs(n,o,t,!0));for(const o in e)if(!(i&&o==="expose")){const a=up[o]||t&&t[o];n[o]=a?a(n[o],e[o]):e[o]}return n}const up={data:mc,props:gc,emits:gc,methods:Ur,computed:Ur,beforeCreate:Bt,created:Bt,beforeMount:Bt,mounted:Bt,beforeUpdate:Bt,updated:Bt,beforeDestroy:Bt,beforeUnmount:Bt,destroyed:Bt,unmounted:Bt,activated:Bt,deactivated:Bt,errorCaptured:Bt,serverPrefetch:Bt,components:Ur,directives:Ur,watch:dp,provide:mc,inject:fp};function mc(n,e){return e?n?function(){return Ft(Xe(n)?n.call(this,this):n,Xe(e)?e.call(this,this):e)}:e:n}function fp(n,e){return Ur(Ma(n),Ma(e))}function Ma(n){if(Ge(n)){const e={};for(let t=0;t<n.length;t++)e[n[t]]=n[t];return e}return n}function Bt(n,e){return n?[...new Set([].concat(n,e))]:e}function Ur(n,e){return n?Ft(Object.create(null),n,e):e}function gc(n,e){return n?Ge(n)&&Ge(e)?[...new Set([...n,...e])]:Ft(Object.create(null),hc(n),hc(e??{})):e}function dp(n,e){if(!n)return e;if(!e)return n;const t=Ft(Object.create(null),n);for(const i in e)t[i]=Bt(n[i],e[i]);return t}function Vf(){return{app:null,config:{isNativeTag:ef,performance:!1,globalProperties:{},optionMergeStrategies:{},errorHandler:void 0,warnHandler:void 0,compilerOptions:{}},mixins:[],components:{},directives:{},provides:Object.create(null),optionsCache:new WeakMap,propsCache:new WeakMap,emitsCache:new WeakMap}}let hp=0;function pp(n,e){return function(i,r=null){Xe(i)||(i=Ft({},i)),r!=null&&!gt(r)&&(r=null);const s=Vf(),o=new WeakSet,a=[];let l=!1;const c=s.app={_uid:hp++,_component:i,_props:r,_container:null,_context:s,_instance:null,version:Kp,get config(){return s.config},set config(u){},use(u,...f){return o.has(u)||(u&&Xe(u.install)?(o.add(u),u.install(c,...f)):Xe(u)&&(o.add(u),u(c,...f))),c},mixin(u){return s.mixins.includes(u)||s.mixins.push(u),c},component(u,f){return f?(s.components[u]=f,c):s.components[u]},directive(u,f){return f?(s.directives[u]=f,c):s.directives[u]},mount(u,f,d){if(!l){const p=c._ceVNode||xt(i,r);return p.appContext=s,d===!0?d="svg":d===!1&&(d=void 0),n(p,u,d),l=!0,c._container=u,u.__vue_app__=c,zl(p.component)}},onUnmount(u){a.push(u)},unmount(){l&&(Pn(a,c._instance,16),n(null,c._container),delete c._container.__vue_app__)},provide(u,f){return s.provides[u]=f,c},runWithContext(u){const f=ur;ur=c;try{return u()}finally{ur=f}}};return c}}let ur=null;function Bs(n,e){if(Ut){let t=Ut.provides;const i=Ut.parent&&Ut.parent.provides;i===t&&(t=Ut.provides=Object.create(i)),t[n]=e}}function Rn(n,e,t=!1){const i=Gp();if(i||ur){let r=ur?ur._context.provides:i?i.parent==null||i.ce?i.vnode.appContext&&i.vnode.appContext.provides:i.parent.provides:void 0;if(r&&n in r)return r[n];if(arguments.length>1)return t&&Xe(e)?e.call(i&&i.proxy):e}}const Gf={},Wf=()=>Object.create(Gf),Xf=n=>Object.getPrototypeOf(n)===Gf;function mp(n,e,t,i=!1){const r={},s=Wf();n.propsDefaults=Object.create(null),jf(n,e,r,s);for(const o in n.propsOptions[0])o in r||(r[o]=void 0);t?n.props=i?r:bf(r):n.type.props?n.props=r:n.props=s,n.attrs=s}function gp(n,e,t,i){const{props:r,attrs:s,vnode:{patchFlag:o}}=n,a=rt(r),[l]=n.propsOptions;let c=!1;if((i||o>0)&&!(o&16)){if(o&8){const u=n.vnode.dynamicProps;for(let f=0;f<u.length;f++){let d=u[f];if(_o(n.emitsOptions,d))continue;const p=e[d];if(l)if(st(s,d))p!==s[d]&&(s[d]=p,c=!0);else{const v=cn(d);r[v]=Ea(l,a,v,p,n,!1)}else p!==s[d]&&(s[d]=p,c=!0)}}}else{jf(n,e,r,s)&&(c=!0);let u;for(const f in a)(!e||!st(e,f)&&((u=Oi(f))===f||!st(e,u)))&&(l?t&&(t[f]!==void 0||t[u]!==void 0)&&(r[f]=Ea(l,a,f,void 0,n,!0)):delete r[f]);if(s!==a)for(const f in s)(!e||!st(e,f))&&(delete s[f],c=!0)}c&&Hn(n.attrs,"set","")}function jf(n,e,t,i){const[r,s]=n.propsOptions;let o=!1,a;if(e)for(let l in e){if(Or(l))continue;const c=e[l];let u;r&&st(r,u=cn(l))?!s||!s.includes(u)?t[u]=c:(a||(a={}))[u]=c:_o(n.emitsOptions,l)||(!(l in i)||c!==i[l])&&(i[l]=c,o=!0)}if(s){const l=rt(t),c=a||ht;for(let u=0;u<s.length;u++){const f=s[u];t[f]=Ea(r,l,f,c[f],n,!st(c,f))}}return o}function Ea(n,e,t,i,r,s){const o=n[t];if(o!=null){const a=st(o,"default");if(a&&i===void 0){const l=o.default;if(o.type!==Function&&!o.skipFactory&&Xe(l)){const{propsDefaults:c}=r;if(t in c)i=c[t];else{const u=os(r);i=c[t]=l.call(null,e),u()}}else i=l;r.ce&&r.ce._setProp(t,i)}o[0]&&(s&&!a?i=!1:o[1]&&(i===""||i===Oi(t))&&(i=!0))}return i}const _p=new WeakMap;function qf(n,e,t=!1){const i=t?_p:e.propsCache,r=i.get(n);if(r)return r;const s=n.props,o={},a=[];let l=!1;if(!Xe(n)){const u=f=>{l=!0;const[d,p]=qf(f,e,!0);Ft(o,d),p&&a.push(...p)};!t&&e.mixins.length&&e.mixins.forEach(u),n.extends&&u(n.extends),n.mixins&&n.mixins.forEach(u)}if(!s&&!l)return gt(n)&&i.set(n,or),or;if(Ge(s))for(let u=0;u<s.length;u++){const f=cn(s[u]);_c(f)&&(o[f]=ht)}else if(s)for(const u in s){const f=cn(u);if(_c(f)){const d=s[u],p=o[f]=Ge(d)||Xe(d)?{type:d}:Ft({},d),v=p.type;let x=!1,m=!0;if(Ge(v))for(let h=0;h<v.length;++h){const w=v[h],T=Xe(w)&&w.name;if(T==="Boolean"){x=!0;break}else T==="String"&&(m=!1)}else x=Xe(v)&&v.name==="Boolean";p[0]=x,p[1]=m,(x||st(p,"default"))&&a.push(f)}}const c=[o,a];return gt(n)&&i.set(n,c),c}function _c(n){return n[0]!=="$"&&!Or(n)}const Fl=n=>n==="_"||n==="_ctx"||n==="$stable",Ol=n=>Ge(n)?n.map(Mn):[Mn(n)],vp=(n,e,t)=>{if(e._n)return e;const i=rr((...r)=>Ol(e(...r)),t);return i._c=!1,i},Yf=(n,e,t)=>{const i=n._ctx;for(const r in n){if(Fl(r))continue;const s=n[r];if(Xe(s))e[r]=vp(r,s,i);else if(s!=null){const o=Ol(s);e[r]=()=>o}}},$f=(n,e)=>{const t=Ol(e);n.slots.default=()=>t},Kf=(n,e,t)=>{for(const i in e)(t||!Fl(i))&&(n[i]=e[i])},xp=(n,e,t)=>{const i=n.slots=Wf();if(n.vnode.shapeFlag&32){const r=e._;r?(Kf(i,e,t),t&&of(i,"_",r,!0)):Yf(e,i)}else e&&$f(n,e)},yp=(n,e,t)=>{const{vnode:i,slots:r}=n;let s=!0,o=ht;if(i.shapeFlag&32){const a=e._;a?t&&a===1?s=!1:Kf(r,e,t):(s=!e.$stable,Yf(e,r)),o=e}else e&&($f(n,e),o={default:1});if(s)for(const a in r)!Fl(a)&&o[a]==null&&delete r[a]},Jt=Np;function Sp(n){return Mp(n)}function Mp(n,e){const t=fo();t.__VUE__=!0;const{insert:i,remove:r,patchProp:s,createElement:o,createText:a,createComment:l,setText:c,setElementText:u,parentNode:f,nextSibling:d,setScopeId:p=wn,insertStaticContent:v}=n,x=(A,g,N,H=null,V=null,F=null,ce=void 0,Y=null,ne=!!g.dynamicChildren)=>{if(A===g)return;A&&!Ar(A,g)&&(H=P(A),Oe(A,V,F,!0),A=null),g.patchFlag===-2&&(ne=!1,g.dynamicChildren=null);const{type:oe,ref:Se,shapeFlag:y}=g;switch(oe){case vo:m(A,g,N,H);break;case di:h(A,g,N,H);break;case zs:A==null&&w(g,N,H,ce);break;case mt:X(A,g,N,H,V,F,ce,Y,ne);break;default:y&1?C(A,g,N,H,V,F,ce,Y,ne):y&6?K(A,g,N,H,V,F,ce,Y,ne):(y&64||y&128)&&oe.process(A,g,N,H,V,F,ce,Y,ne,se)}Se!=null&&V?zr(Se,A&&A.ref,F,g||A,!g):Se==null&&A&&A.ref!=null&&zr(A.ref,null,F,A,!0)},m=(A,g,N,H)=>{if(A==null)i(g.el=a(g.children),N,H);else{const V=g.el=A.el;g.children!==A.children&&c(V,g.children)}},h=(A,g,N,H)=>{A==null?i(g.el=l(g.children||""),N,H):g.el=A.el},w=(A,g,N,H)=>{[A.el,A.anchor]=v(A.children,g,N,H,A.el,A.anchor)},T=({el:A,anchor:g},N,H)=>{let V;for(;A&&A!==g;)V=d(A),i(A,N,H),A=V;i(g,N,H)},M=({el:A,anchor:g})=>{let N;for(;A&&A!==g;)N=d(A),r(A),A=N;r(g)},C=(A,g,N,H,V,F,ce,Y,ne)=>{g.type==="svg"?ce="svg":g.type==="math"&&(ce="mathml"),A==null?D(g,N,H,V,F,ce,Y,ne):b(A,g,V,F,ce,Y,ne)},D=(A,g,N,H,V,F,ce,Y)=>{let ne,oe;const{props:Se,shapeFlag:y,transition:_,dirs:I}=A;if(ne=A.el=o(A.type,F,Se&&Se.is,Se),y&8?u(ne,A.children):y&16&&k(A.children,ne,null,H,V,Lo(A,F),ce,Y),I&&vi(A,null,H,"created"),R(ne,A,A.scopeId,ce,H),Se){for(const ee in Se)ee!=="value"&&!Or(ee)&&s(ne,ee,null,Se[ee],F,H);"value"in Se&&s(ne,"value",null,Se.value,F),(oe=Se.onVnodeBeforeMount)&&yn(oe,H,A)}I&&vi(A,null,H,"beforeMount");const G=Ep(V,_);G&&_.beforeEnter(ne),i(ne,g,N),((oe=Se&&Se.onVnodeMounted)||G||I)&&Jt(()=>{oe&&yn(oe,H,A),G&&_.enter(ne),I&&vi(A,null,H,"mounted")},V)},R=(A,g,N,H,V)=>{if(N&&p(A,N),H)for(let F=0;F<H.length;F++)p(A,H[F]);if(V){let F=V.subTree;if(g===F||nd(F.type)&&(F.ssContent===g||F.ssFallback===g)){const ce=V.vnode;R(A,ce,ce.scopeId,ce.slotScopeIds,V.parent)}}},k=(A,g,N,H,V,F,ce,Y,ne=0)=>{for(let oe=ne;oe<A.length;oe++){const Se=A[oe]=Y?ri(A[oe]):Mn(A[oe]);x(null,Se,g,N,H,V,F,ce,Y)}},b=(A,g,N,H,V,F,ce)=>{const Y=g.el=A.el;let{patchFlag:ne,dynamicChildren:oe,dirs:Se}=g;ne|=A.patchFlag&16;const y=A.props||ht,_=g.props||ht;let I;if(N&&xi(N,!1),(I=_.onVnodeBeforeUpdate)&&yn(I,N,g,A),Se&&vi(g,A,N,"beforeUpdate"),N&&xi(N,!0),(y.innerHTML&&_.innerHTML==null||y.textContent&&_.textContent==null)&&u(Y,""),oe?E(A.dynamicChildren,oe,Y,N,H,Lo(g,V),F):ce||z(A,g,Y,null,N,H,Lo(g,V),F,!1),ne>0){if(ne&16)L(Y,y,_,N,V);else if(ne&2&&y.class!==_.class&&s(Y,"class",null,_.class,V),ne&4&&s(Y,"style",y.style,_.style,V),ne&8){const G=g.dynamicProps;for(let ee=0;ee<G.length;ee++){const W=G[ee],Ee=y[W],ue=_[W];(ue!==Ee||W==="value")&&s(Y,W,Ee,ue,V,N)}}ne&1&&A.children!==g.children&&u(Y,g.children)}else!ce&&oe==null&&L(Y,y,_,N,V);((I=_.onVnodeUpdated)||Se)&&Jt(()=>{I&&yn(I,N,g,A),Se&&vi(g,A,N,"updated")},H)},E=(A,g,N,H,V,F,ce)=>{for(let Y=0;Y<g.length;Y++){const ne=A[Y],oe=g[Y],Se=ne.el&&(ne.type===mt||!Ar(ne,oe)||ne.shapeFlag&198)?f(ne.el):N;x(ne,oe,Se,null,H,V,F,ce,!0)}},L=(A,g,N,H,V)=>{if(g!==N){if(g!==ht)for(const F in g)!Or(F)&&!(F in N)&&s(A,F,g[F],null,V,H);for(const F in N){if(Or(F))continue;const ce=N[F],Y=g[F];ce!==Y&&F!=="value"&&s(A,F,Y,ce,V,H)}"value"in N&&s(A,"value",g.value,N.value,V)}},X=(A,g,N,H,V,F,ce,Y,ne)=>{const oe=g.el=A?A.el:a(""),Se=g.anchor=A?A.anchor:a("");let{patchFlag:y,dynamicChildren:_,slotScopeIds:I}=g;I&&(Y=Y?Y.concat(I):I),A==null?(i(oe,N,H),i(Se,N,H),k(g.children||[],N,Se,V,F,ce,Y,ne)):y>0&&y&64&&_&&A.dynamicChildren?(E(A.dynamicChildren,_,N,V,F,ce,Y),(g.key!=null||V&&g===V.subTree)&&Zf(A,g,!0)):z(A,g,N,Se,V,F,ce,Y,ne)},K=(A,g,N,H,V,F,ce,Y,ne)=>{g.slotScopeIds=Y,A==null?g.shapeFlag&512?V.ctx.activate(g,N,H,ce,ne):le(g,N,H,V,F,ce,ne):ie(A,g,ne)},le=(A,g,N,H,V,F,ce)=>{const Y=A.component=Vp(A,H,V);if(Ff(A)&&(Y.ctx.renderer=se),Wp(Y,!1,ce),Y.asyncDep){if(V&&V.registerDep(Y,J,ce),!A.el){const ne=Y.subTree=xt(di);h(null,ne,g,N),A.placeholder=ne.el}}else J(Y,A,g,N,V,F,ce)},ie=(A,g,N)=>{const H=g.component=A.component;if(Lp(A,g,N))if(H.asyncDep&&!H.asyncResolved){Q(H,g,N);return}else H.next=g,H.update();else g.el=A.el,H.vnode=g},J=(A,g,N,H,V,F,ce)=>{const Y=()=>{if(A.isMounted){let{next:y,bu:_,u:I,parent:G,vnode:ee}=A;{const Te=Jf(A);if(Te){y&&(y.el=ee.el,Q(A,y,ce)),Te.asyncDep.then(()=>{A.isUnmounted||Y()});return}}let W=y,Ee;xi(A,!1),y?(y.el=ee.el,Q(A,y,ce)):y=ee,_&&wo(_),(Ee=y.props&&y.props.onVnodeBeforeUpdate)&&yn(Ee,G,y,ee),xi(A,!0);const ue=xc(A),be=A.subTree;A.subTree=ue,x(be,ue,f(be.el),P(be),A,V,F),y.el=ue.el,W===null&&Up(A,ue.el),I&&Jt(I,V),(Ee=y.props&&y.props.onVnodeUpdated)&&Jt(()=>yn(Ee,G,y,ee),V)}else{let y;const{el:_,props:I}=g,{bm:G,m:ee,parent:W,root:Ee,type:ue}=A,be=Hr(g);xi(A,!1),G&&wo(G),!be&&(y=I&&I.onVnodeBeforeMount)&&yn(y,W,g),xi(A,!0);{Ee.ce&&Ee.ce._def.shadowRoot!==!1&&Ee.ce._injectChildStyle(ue);const Te=A.subTree=xc(A);x(null,Te,N,H,A,V,F),g.el=Te.el}if(ee&&Jt(ee,V),!be&&(y=I&&I.onVnodeMounted)){const Te=g;Jt(()=>yn(y,W,Te),V)}(g.shapeFlag&256||W&&Hr(W.vnode)&&W.vnode.shapeFlag&256)&&A.a&&Jt(A.a,V),A.isMounted=!0,g=N=H=null}};A.scope.on();const ne=A.effect=new uf(Y);A.scope.off();const oe=A.update=ne.run.bind(ne),Se=A.job=ne.runIfDirty.bind(ne);Se.i=A,Se.id=A.uid,ne.scheduler=()=>Il(Se),xi(A,!0),oe()},Q=(A,g,N)=>{g.component=A;const H=A.vnode.props;A.vnode=g,A.next=null,gp(A,g.props,H,N),yp(A,g.children,N),Xn(),uc(A),jn()},z=(A,g,N,H,V,F,ce,Y,ne=!1)=>{const oe=A&&A.children,Se=A?A.shapeFlag:0,y=g.children,{patchFlag:_,shapeFlag:I}=g;if(_>0){if(_&128){ve(oe,y,N,H,V,F,ce,Y,ne);return}else if(_&256){me(oe,y,N,H,V,F,ce,Y,ne);return}}I&8?(Se&16&&te(oe,V,F),y!==oe&&u(N,y)):Se&16?I&16?ve(oe,y,N,H,V,F,ce,Y,ne):te(oe,V,F,!0):(Se&8&&u(N,""),I&16&&k(y,N,H,V,F,ce,Y,ne))},me=(A,g,N,H,V,F,ce,Y,ne)=>{A=A||or,g=g||or;const oe=A.length,Se=g.length,y=Math.min(oe,Se);let _;for(_=0;_<y;_++){const I=g[_]=ne?ri(g[_]):Mn(g[_]);x(A[_],I,N,null,V,F,ce,Y,ne)}oe>Se?te(A,V,F,!0,!1,y):k(g,N,H,V,F,ce,Y,ne,y)},ve=(A,g,N,H,V,F,ce,Y,ne)=>{let oe=0;const Se=g.length;let y=A.length-1,_=Se-1;for(;oe<=y&&oe<=_;){const I=A[oe],G=g[oe]=ne?ri(g[oe]):Mn(g[oe]);if(Ar(I,G))x(I,G,N,null,V,F,ce,Y,ne);else break;oe++}for(;oe<=y&&oe<=_;){const I=A[y],G=g[_]=ne?ri(g[_]):Mn(g[_]);if(Ar(I,G))x(I,G,N,null,V,F,ce,Y,ne);else break;y--,_--}if(oe>y){if(oe<=_){const I=_+1,G=I<Se?g[I].el:H;for(;oe<=_;)x(null,g[oe]=ne?ri(g[oe]):Mn(g[oe]),N,G,V,F,ce,Y,ne),oe++}}else if(oe>_)for(;oe<=y;)Oe(A[oe],V,F,!0),oe++;else{const I=oe,G=oe,ee=new Map;for(oe=G;oe<=_;oe++){const Le=g[oe]=ne?ri(g[oe]):Mn(g[oe]);Le.key!=null&&ee.set(Le.key,oe)}let W,Ee=0;const ue=_-G+1;let be=!1,Te=0;const fe=new Array(ue);for(oe=0;oe<ue;oe++)fe[oe]=0;for(oe=I;oe<=y;oe++){const Le=A[oe];if(Ee>=ue){Oe(Le,V,F,!0);continue}let Ae;if(Le.key!=null)Ae=ee.get(Le.key);else for(W=G;W<=_;W++)if(fe[W-G]===0&&Ar(Le,g[W])){Ae=W;break}Ae===void 0?Oe(Le,V,F,!0):(fe[Ae-G]=oe+1,Ae>=Te?Te=Ae:be=!0,x(Le,g[Ae],N,null,V,F,ce,Y,ne),Ee++)}const ye=be?bp(fe):or;for(W=ye.length-1,oe=ue-1;oe>=0;oe--){const Le=G+oe,Ae=g[Le],_e=g[Le+1],Ve=Le+1<Se?_e.el||_e.placeholder:H;fe[oe]===0?x(null,Ae,N,Ve,V,F,ce,Y,ne):be&&(W<0||oe!==ye[W]?Re(Ae,N,Ve,2):W--)}}},Re=(A,g,N,H,V=null)=>{const{el:F,type:ce,transition:Y,children:ne,shapeFlag:oe}=A;if(oe&6){Re(A.component.subTree,g,N,H);return}if(oe&128){A.suspense.move(g,N,H);return}if(oe&64){ce.move(A,g,N,se);return}if(ce===mt){i(F,g,N);for(let y=0;y<ne.length;y++)Re(ne[y],g,N,H);i(A.anchor,g,N);return}if(ce===zs){T(A,g,N);return}if(H!==2&&oe&1&&Y)if(H===0)Y.beforeEnter(F),i(F,g,N),Jt(()=>Y.enter(F),V);else{const{leave:y,delayLeave:_,afterLeave:I}=Y,G=()=>{A.ctx.isUnmounted?r(F):i(F,g,N)},ee=()=>{F._isLeaving&&F[qh](!0),y(F,()=>{G(),I&&I()})};_?_(F,G,ee):ee()}else i(F,g,N)},Oe=(A,g,N,H=!1,V=!1)=>{const{type:F,props:ce,ref:Y,children:ne,dynamicChildren:oe,shapeFlag:Se,patchFlag:y,dirs:_,cacheIndex:I}=A;if(y===-2&&(V=!1),Y!=null&&(Xn(),zr(Y,null,N,A,!0),jn()),I!=null&&(g.renderCache[I]=void 0),Se&256){g.ctx.deactivate(A);return}const G=Se&1&&_,ee=!Hr(A);let W;if(ee&&(W=ce&&ce.onVnodeBeforeUnmount)&&yn(W,g,A),Se&6)$e(A.component,N,H);else{if(Se&128){A.suspense.unmount(N,H);return}G&&vi(A,null,g,"beforeUnmount"),Se&64?A.type.remove(A,g,N,se,H):oe&&!oe.hasOnce&&(F!==mt||y>0&&y&64)?te(oe,g,N,!1,!0):(F===mt&&y&384||!V&&Se&16)&&te(ne,g,N),H&&Ze(A)}(ee&&(W=ce&&ce.onVnodeUnmounted)||G)&&Jt(()=>{W&&yn(W,g,A),G&&vi(A,null,g,"unmounted")},N)},Ze=A=>{const{type:g,el:N,anchor:H,transition:V}=A;if(g===mt){et(N,H);return}if(g===zs){M(A);return}const F=()=>{r(N),V&&!V.persisted&&V.afterLeave&&V.afterLeave()};if(A.shapeFlag&1&&V&&!V.persisted){const{leave:ce,delayLeave:Y}=V,ne=()=>ce(N,F);Y?Y(A.el,F,ne):ne()}else F()},et=(A,g)=>{let N;for(;A!==g;)N=d(A),r(A),A=N;r(g)},$e=(A,g,N)=>{const{bum:H,scope:V,job:F,subTree:ce,um:Y,m:ne,a:oe}=A;vc(ne),vc(oe),H&&wo(H),V.stop(),F&&(F.flags|=8,Oe(ce,A,g,N)),Y&&Jt(Y,g),Jt(()=>{A.isUnmounted=!0},g)},te=(A,g,N,H=!1,V=!1,F=0)=>{for(let ce=F;ce<A.length;ce++)Oe(A[ce],g,N,H,V)},P=A=>{if(A.shapeFlag&6)return P(A.component.subTree);if(A.shapeFlag&128)return A.suspense.next();const g=d(A.anchor||A.el),N=g&&g[Xh];return N?d(N):g};let Z=!1;const re=(A,g,N)=>{A==null?g._vnode&&Oe(g._vnode,null,null,!0):x(g._vnode||null,A,g,null,null,null,N),g._vnode=A,Z||(Z=!0,uc(),Df(),Z=!1)},se={p:x,um:Oe,m:Re,r:Ze,mt:le,mc:k,pc:z,pbc:E,n:P,o:n};return{render:re,hydrate:void 0,createApp:pp(re)}}function Lo({type:n,props:e},t){return t==="svg"&&n==="foreignObject"||t==="mathml"&&n==="annotation-xml"&&e&&e.encoding&&e.encoding.includes("html")?void 0:t}function xi({effect:n,job:e},t){t?(n.flags|=32,e.flags|=4):(n.flags&=-33,e.flags&=-5)}function Ep(n,e){return(!n||n&&!n.pendingBranch)&&e&&!e.persisted}function Zf(n,e,t=!1){const i=n.children,r=e.children;if(Ge(i)&&Ge(r))for(let s=0;s<i.length;s++){const o=i[s];let a=r[s];a.shapeFlag&1&&!a.dynamicChildren&&((a.patchFlag<=0||a.patchFlag===32)&&(a=r[s]=ri(r[s]),a.el=o.el),!t&&a.patchFlag!==-2&&Zf(o,a)),a.type===vo&&a.patchFlag!==-1&&(a.el=o.el),a.type===di&&!a.el&&(a.el=o.el)}}function bp(n){const e=n.slice(),t=[0];let i,r,s,o,a;const l=n.length;for(i=0;i<l;i++){const c=n[i];if(c!==0){if(r=t[t.length-1],n[r]<c){e[i]=r,t.push(i);continue}for(s=0,o=t.length-1;s<o;)a=s+o>>1,n[t[a]]<c?s=a+1:o=a;c<n[t[s]]&&(s>0&&(e[i]=t[s-1]),t[s]=i)}}for(s=t.length,o=t[s-1];s-- >0;)t[s]=o,o=e[o];return t}function Jf(n){const e=n.subTree.component;if(e)return e.asyncDep&&!e.asyncResolved?e:Jf(e)}function vc(n){if(n)for(let e=0;e<n.length;e++)n[e].flags|=8}const Tp=Symbol.for("v-scx"),Ap=()=>Rn(Tp);function ks(n,e,t){return Qf(n,e,t)}function Qf(n,e,t=ht){const{immediate:i,deep:r,flush:s,once:o}=t,a=Ft({},t),l=e&&i||!e&&s!=="post";let c;if(Kr){if(s==="sync"){const p=Ap();c=p.__watcherHandles||(p.__watcherHandles=[])}else if(!l){const p=()=>{};return p.stop=wn,p.resume=wn,p.pause=wn,p}}const u=Ut;a.call=(p,v,x)=>Pn(p,u,v,x);let f=!1;s==="post"?a.scheduler=p=>{Jt(p,u&&u.suspense)}:s!=="sync"&&(f=!0,a.scheduler=(p,v)=>{v?p():Il(p)}),a.augmentJob=p=>{e&&(p.flags|=4),f&&(p.flags|=2,u&&(p.id=u.uid,p.i=u))};const d=Hh(n,e,a);return Kr&&(c?c.push(d):l&&d()),d}function wp(n,e,t){const i=this.proxy,r=Et(n)?n.includes(".")?ed(i,n):()=>i[n]:n.bind(i,i);let s;Xe(e)?s=e:(s=e.handler,t=e);const o=os(this),a=Qf(r,s.bind(i),t);return o(),a}function ed(n,e){const t=e.split(".");return()=>{let i=n;for(let r=0;r<t.length&&i;r++)i=i[t[r]];return i}}const Rp=(n,e)=>e==="modelValue"||e==="model-value"?n.modelModifiers:n[`${e}Modifiers`]||n[`${cn(e)}Modifiers`]||n[`${Oi(e)}Modifiers`];function Cp(n,e,...t){if(n.isUnmounted)return;const i=n.vnode.props||ht;let r=t;const s=e.startsWith("update:"),o=s&&Rp(i,e.slice(7));o&&(o.trim&&(r=t.map(u=>Et(u)?u.trim():u)),o.number&&(r=t.map(ah)));let a,l=i[a=Ao(e)]||i[a=Ao(cn(e))];!l&&s&&(l=i[a=Ao(Oi(e))]),l&&Pn(l,n,6,r);const c=i[a+"Once"];if(c){if(!n.emitted)n.emitted={};else if(n.emitted[a])return;n.emitted[a]=!0,Pn(c,n,6,r)}}const Pp=new WeakMap;function td(n,e,t=!1){const i=t?Pp:e.emitsCache,r=i.get(n);if(r!==void 0)return r;const s=n.emits;let o={},a=!1;if(!Xe(n)){const l=c=>{const u=td(c,e,!0);u&&(a=!0,Ft(o,u))};!t&&e.mixins.length&&e.mixins.forEach(l),n.extends&&l(n.extends),n.mixins&&n.mixins.forEach(l)}return!s&&!a?(gt(n)&&i.set(n,null),null):(Ge(s)?s.forEach(l=>o[l]=null):Ft(o,s),gt(n)&&i.set(n,o),o)}function _o(n,e){return!n||!ao(e)?!1:(e=e.slice(2).replace(/Once$/,""),st(n,e[0].toLowerCase()+e.slice(1))||st(n,Oi(e))||st(n,e))}function xc(n){const{type:e,vnode:t,proxy:i,withProxy:r,propsOptions:[s],slots:o,attrs:a,emit:l,render:c,renderCache:u,props:f,data:d,setupState:p,ctx:v,inheritAttrs:x}=n,m=Zs(n);let h,w;try{if(t.shapeFlag&4){const M=r||i,C=M;h=Mn(c.call(C,M,u,f,p,d,v)),w=a}else{const M=e;h=Mn(M.length>1?M(f,{attrs:a,slots:o,emit:l}):M(f,null)),w=e.props?a:Dp(a)}}catch(M){Gr.length=0,mo(M,n,1),h=xt(di)}let T=h;if(w&&x!==!1){const M=Object.keys(w),{shapeFlag:C}=T;M.length&&C&7&&(s&&M.some(yl)&&(w=Ip(w,s)),T=hr(T,w,!1,!0))}return t.dirs&&(T=hr(T,null,!1,!0),T.dirs=T.dirs?T.dirs.concat(t.dirs):t.dirs),t.transition&&Ll(T,t.transition),h=T,Zs(m),h}const Dp=n=>{let e;for(const t in n)(t==="class"||t==="style"||ao(t))&&((e||(e={}))[t]=n[t]);return e},Ip=(n,e)=>{const t={};for(const i in n)(!yl(i)||!(i.slice(9)in e))&&(t[i]=n[i]);return t};function Lp(n,e,t){const{props:i,children:r,component:s}=n,{props:o,children:a,patchFlag:l}=e,c=s.emitsOptions;if(e.dirs||e.transition)return!0;if(t&&l>=0){if(l&1024)return!0;if(l&16)return i?yc(i,o,c):!!o;if(l&8){const u=e.dynamicProps;for(let f=0;f<u.length;f++){const d=u[f];if(o[d]!==i[d]&&!_o(c,d))return!0}}}else return(r||a)&&(!a||!a.$stable)?!0:i===o?!1:i?o?yc(i,o,c):!0:!!o;return!1}function yc(n,e,t){const i=Object.keys(e);if(i.length!==Object.keys(n).length)return!0;for(let r=0;r<i.length;r++){const s=i[r];if(e[s]!==n[s]&&!_o(t,s))return!0}return!1}function Up({vnode:n,parent:e},t){for(;e;){const i=e.subTree;if(i.suspense&&i.suspense.activeBranch===n&&(i.el=n.el),i===n)(n=e.vnode).el=t,e=e.parent;else break}}const nd=n=>n.__isSuspense;function Np(n,e){e&&e.pendingBranch?Ge(n)?e.effects.push(...n):e.effects.push(n):Wh(n)}const mt=Symbol.for("v-fgt"),vo=Symbol.for("v-txt"),di=Symbol.for("v-cmt"),zs=Symbol.for("v-stc"),Gr=[];let Qt=null;function we(n=!1){Gr.push(Qt=n?null:[])}function Fp(){Gr.pop(),Qt=Gr[Gr.length-1]||null}let $r=1;function eo(n,e=!1){$r+=n,n<0&&Qt&&e&&(Qt.hasOnce=!0)}function id(n){return n.dynamicChildren=$r>0?Qt||or:null,Fp(),$r>0&&Qt&&Qt.push(n),n}function Pe(n,e,t,i,r,s){return id(Be(n,e,t,i,r,s,!0))}function Bl(n,e,t,i,r){return id(xt(n,e,t,i,r,!0))}function to(n){return n?n.__v_isVNode===!0:!1}function Ar(n,e){return n.type===e.type&&n.key===e.key}const rd=({key:n})=>n??null,Hs=({ref:n,ref_key:e,ref_for:t})=>(typeof n=="number"&&(n=""+n),n!=null?Et(n)||Nt(n)||Xe(n)?{i:pn,r:n,k:e,f:!!t}:n:null);function Be(n,e=null,t=null,i=0,r=null,s=n===mt?0:1,o=!1,a=!1){const l={__v_isVNode:!0,__v_skip:!0,type:n,props:e,key:e&&rd(e),ref:e&&Hs(e),scopeId:Lf,slotScopeIds:null,children:t,component:null,suspense:null,ssContent:null,ssFallback:null,dirs:null,transition:null,el:null,anchor:null,target:null,targetStart:null,targetAnchor:null,staticCount:0,shapeFlag:s,patchFlag:i,dynamicProps:r,dynamicChildren:null,appContext:null,ctx:pn};return a?(kl(l,t),s&128&&n.normalize(l)):t&&(l.shapeFlag|=Et(t)?8:16),$r>0&&!o&&Qt&&(l.patchFlag>0||s&6)&&l.patchFlag!==32&&Qt.push(l),l}const xt=Op;function Op(n,e=null,t=null,i=0,r=null,s=!1){if((!n||n===sp)&&(n=di),to(n)){const a=hr(n,e,!0);return t&&kl(a,t),$r>0&&!s&&Qt&&(a.shapeFlag&6?Qt[Qt.indexOf(n)]=a:Qt.push(a)),a.patchFlag=-2,a}if($p(n)&&(n=n.__vccOpts),e){e=Bp(e);let{class:a,style:l}=e;a&&!Et(a)&&(e.class=rs(a)),gt(l)&&(Pl(l)&&!Ge(l)&&(l=Ft({},l)),e.style=El(l))}const o=Et(n)?1:nd(n)?128:jh(n)?64:gt(n)?4:Xe(n)?2:0;return Be(n,e,t,i,r,o,s,!0)}function Bp(n){return n?Pl(n)||Xf(n)?Ft({},n):n:null}function hr(n,e,t=!1,i=!1){const{props:r,ref:s,patchFlag:o,children:a,transition:l}=n,c=e?kp(r||{},e):r,u={__v_isVNode:!0,__v_skip:!0,type:n.type,props:c,key:c&&rd(c),ref:e&&e.ref?t&&s?Ge(s)?s.concat(Hs(e)):[s,Hs(e)]:Hs(e):s,scopeId:n.scopeId,slotScopeIds:n.slotScopeIds,children:a,target:n.target,targetStart:n.targetStart,targetAnchor:n.targetAnchor,staticCount:n.staticCount,shapeFlag:n.shapeFlag,patchFlag:e&&n.type!==mt?o===-1?16:o|16:o,dynamicProps:n.dynamicProps,dynamicChildren:n.dynamicChildren,appContext:n.appContext,dirs:n.dirs,transition:l,component:n.component,suspense:n.suspense,ssContent:n.ssContent&&hr(n.ssContent),ssFallback:n.ssFallback&&hr(n.ssFallback),placeholder:n.placeholder,el:n.el,anchor:n.anchor,ctx:n.ctx,ce:n.ce};return l&&i&&Ll(u,l.clone(u)),u}function on(n=" ",e=0){return xt(vo,null,n,e)}function no(n,e){const t=xt(zs,null,n);return t.staticCount=e,t}function bt(n="",e=!1){return e?(we(),Bl(di,null,n)):xt(di,null,n)}function Mn(n){return n==null||typeof n=="boolean"?xt(di):Ge(n)?xt(mt,null,n.slice()):to(n)?ri(n):xt(vo,null,String(n))}function ri(n){return n.el===null&&n.patchFlag!==-1||n.memo?n:hr(n)}function kl(n,e){let t=0;const{shapeFlag:i}=n;if(e==null)e=null;else if(Ge(e))t=16;else if(typeof e=="object")if(i&65){const r=e.default;r&&(r._c&&(r._d=!1),kl(n,r()),r._c&&(r._d=!0));return}else{t=32;const r=e._;!r&&!Xf(e)?e._ctx=pn:r===3&&pn&&(pn.slots._===1?e._=1:(e._=2,n.patchFlag|=1024))}else Xe(e)?(e={default:e,_ctx:pn},t=32):(e=String(e),i&64?(t=16,e=[on(e)]):t=8);n.children=e,n.shapeFlag|=t}function kp(...n){const e={};for(let t=0;t<n.length;t++){const i=n[t];for(const r in i)if(r==="class")e.class!==i.class&&(e.class=rs([e.class,i.class]));else if(r==="style")e.style=El([e.style,i.style]);else if(ao(r)){const s=e[r],o=i[r];o&&s!==o&&!(Ge(s)&&s.includes(o))&&(e[r]=s?[].concat(s,o):o)}else r!==""&&(e[r]=i[r])}return e}function yn(n,e,t,i=null){Pn(n,e,7,[t,i])}const zp=Vf();let Hp=0;function Vp(n,e,t){const i=n.type,r=(e?e.appContext:n.appContext)||zp,s={uid:Hp++,vnode:n,type:i,parent:e,appContext:r,root:null,next:null,subTree:null,effect:null,update:null,job:null,scope:new ph(!0),render:null,proxy:null,exposed:null,exposeProxy:null,withProxy:null,provides:e?e.provides:Object.create(r.provides),ids:e?e.ids:["",0,0],accessCache:null,renderCache:[],components:null,directives:null,propsOptions:qf(i,r),emitsOptions:td(i,r),emit:null,emitted:null,propsDefaults:ht,inheritAttrs:i.inheritAttrs,ctx:ht,data:ht,props:ht,attrs:ht,slots:ht,refs:ht,setupState:ht,setupContext:null,suspense:t,suspenseId:t?t.pendingId:0,asyncDep:null,asyncResolved:!1,isMounted:!1,isUnmounted:!1,isDeactivated:!1,bc:null,c:null,bm:null,m:null,bu:null,u:null,um:null,bum:null,da:null,a:null,rtg:null,rtc:null,ec:null,sp:null};return s.ctx={_:s},s.root=e?e.root:s,s.emit=Cp.bind(null,s),n.ce&&n.ce(s),s}let Ut=null;const Gp=()=>Ut||pn;let io,ba;{const n=fo(),e=(t,i)=>{let r;return(r=n[t])||(r=n[t]=[]),r.push(i),s=>{r.length>1?r.forEach(o=>o(s)):r[0](s)}};io=e("__VUE_INSTANCE_SETTERS__",t=>Ut=t),ba=e("__VUE_SSR_SETTERS__",t=>Kr=t)}const os=n=>{const e=Ut;return io(n),n.scope.on(),()=>{n.scope.off(),io(e)}},Sc=()=>{Ut&&Ut.scope.off(),io(null)};function sd(n){return n.vnode.shapeFlag&4}let Kr=!1;function Wp(n,e=!1,t=!1){e&&ba(e);const{props:i,children:r}=n.vnode,s=sd(n);mp(n,i,s,e),xp(n,r,t||e);const o=s?Xp(n,e):void 0;return e&&ba(!1),o}function Xp(n,e){const t=n.type;n.accessCache=Object.create(null),n.proxy=new Proxy(n.ctx,ap);const{setup:i}=t;if(i){Xn();const r=n.setupContext=i.length>1?qp(n):null,s=os(n),o=ss(i,n,0,[n.props,r]),a=nf(o);if(jn(),s(),(a||n.sp)&&!Hr(n)&&Nf(n),a){if(o.then(Sc,Sc),e)return o.then(l=>{Mc(n,l)}).catch(l=>{mo(l,n,0)});n.asyncDep=o}else Mc(n,o)}else od(n)}function Mc(n,e,t){Xe(e)?n.type.__ssrInlineRender?n.ssrRender=e:n.render=e:gt(e)&&(n.setupState=wf(e)),od(n)}function od(n,e,t){const i=n.type;n.render||(n.render=i.render||wn);{const r=os(n);Xn();try{lp(n)}finally{jn(),r()}}}const jp={get(n,e){return Lt(n,"get",""),n[e]}};function qp(n){const e=t=>{n.exposed=t||{}};return{attrs:new Proxy(n.attrs,jp),slots:n.slots,emit:n.emit,expose:e}}function zl(n){return n.exposed?n.exposeProxy||(n.exposeProxy=new Proxy(wf(Uh(n.exposed)),{get(e,t){if(t in e)return e[t];if(t in Vr)return Vr[t](n)},has(e,t){return t in e||t in Vr}})):n.proxy}function Yp(n,e=!0){return Xe(n)?n.displayName||n.name:n.name||e&&n.__name}function $p(n){return Xe(n)&&"__vccOpts"in n}const Xt=(n,e)=>kh(n,e,Kr);function ad(n,e,t){const i=(s,o,a)=>{eo(-1);try{return xt(s,o,a)}finally{eo(1)}},r=arguments.length;return r===2?gt(e)&&!Ge(e)?to(e)?i(n,null,[e]):i(n,e):i(n,null,e):(r>3?t=Array.prototype.slice.call(arguments,2):r===3&&to(t)&&(t=[t]),i(n,e,t))}const Kp="3.5.21";/**
* @vue/runtime-dom v3.5.21
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/let Ta;const Ec=typeof window<"u"&&window.trustedTypes;if(Ec)try{Ta=Ec.createPolicy("vue",{createHTML:n=>n})}catch{}const ld=Ta?n=>Ta.createHTML(n):n=>n,Zp="http://www.w3.org/2000/svg",Jp="http://www.w3.org/1998/Math/MathML",zn=typeof document<"u"?document:null,bc=zn&&zn.createElement("template"),Qp={insert:(n,e,t)=>{e.insertBefore(n,t||null)},remove:n=>{const e=n.parentNode;e&&e.removeChild(n)},createElement:(n,e,t,i)=>{const r=e==="svg"?zn.createElementNS(Zp,n):e==="mathml"?zn.createElementNS(Jp,n):t?zn.createElement(n,{is:t}):zn.createElement(n);return n==="select"&&i&&i.multiple!=null&&r.setAttribute("multiple",i.multiple),r},createText:n=>zn.createTextNode(n),createComment:n=>zn.createComment(n),setText:(n,e)=>{n.nodeValue=e},setElementText:(n,e)=>{n.textContent=e},parentNode:n=>n.parentNode,nextSibling:n=>n.nextSibling,querySelector:n=>zn.querySelector(n),setScopeId(n,e){n.setAttribute(e,"")},insertStaticContent(n,e,t,i,r,s){const o=t?t.previousSibling:e.lastChild;if(r&&(r===s||r.nextSibling))for(;e.insertBefore(r.cloneNode(!0),t),!(r===s||!(r=r.nextSibling)););else{bc.innerHTML=ld(i==="svg"?`<svg>${n}</svg>`:i==="mathml"?`<math>${n}</math>`:n);const a=bc.content;if(i==="svg"||i==="mathml"){const l=a.firstChild;for(;l.firstChild;)a.appendChild(l.firstChild);a.removeChild(l)}e.insertBefore(a,t)}return[o?o.nextSibling:e.firstChild,t?t.previousSibling:e.lastChild]}},em=Symbol("_vtc");function tm(n,e,t){const i=n[em];i&&(e=(e?[e,...i]:[...i]).join(" ")),e==null?n.removeAttribute("class"):t?n.setAttribute("class",e):n.className=e}const Tc=Symbol("_vod"),nm=Symbol("_vsh"),im=Symbol(""),rm=/(?:^|;)\s*display\s*:/;function sm(n,e,t){const i=n.style,r=Et(t);let s=!1;if(t&&!r){if(e)if(Et(e))for(const o of e.split(";")){const a=o.slice(0,o.indexOf(":")).trim();t[a]==null&&Vs(i,a,"")}else for(const o in e)t[o]==null&&Vs(i,o,"");for(const o in t)o==="display"&&(s=!0),Vs(i,o,t[o])}else if(r){if(e!==t){const o=i[im];o&&(t+=";"+o),i.cssText=t,s=rm.test(t)}}else e&&n.removeAttribute("style");Tc in n&&(n[Tc]=s?i.display:"",n[nm]&&(i.display="none"))}const Ac=/\s*!important$/;function Vs(n,e,t){if(Ge(t))t.forEach(i=>Vs(n,e,i));else if(t==null&&(t=""),e.startsWith("--"))n.setProperty(e,t);else{const i=om(n,e);Ac.test(t)?n.setProperty(Oi(i),t.replace(Ac,""),"important"):n[i]=t}}const wc=["Webkit","Moz","ms"],Uo={};function om(n,e){const t=Uo[e];if(t)return t;let i=cn(e);if(i!=="filter"&&i in n)return Uo[e]=i;i=uo(i);for(let r=0;r<wc.length;r++){const s=wc[r]+i;if(s in n)return Uo[e]=s}return e}const Rc="http://www.w3.org/1999/xlink";function Cc(n,e,t,i,r,s=hh(e)){i&&e.startsWith("xlink:")?t==null?n.removeAttributeNS(Rc,e.slice(6,e.length)):n.setAttributeNS(Rc,e,t):t==null||s&&!af(t)?n.removeAttribute(e):n.setAttribute(e,s?"":mi(t)?String(t):t)}function Pc(n,e,t,i,r){if(e==="innerHTML"||e==="textContent"){t!=null&&(n[e]=e==="innerHTML"?ld(t):t);return}const s=n.tagName;if(e==="value"&&s!=="PROGRESS"&&!s.includes("-")){const a=s==="OPTION"?n.getAttribute("value")||"":n.value,l=t==null?n.type==="checkbox"?"on":"":String(t);(a!==l||!("_value"in n))&&(n.value=l),t==null&&n.removeAttribute(e),n._value=t;return}let o=!1;if(t===""||t==null){const a=typeof n[e];a==="boolean"?t=af(t):t==null&&a==="string"?(t="",o=!0):a==="number"&&(t=0,o=!0)}try{n[e]=t}catch{}o&&n.removeAttribute(r||e)}function am(n,e,t,i){n.addEventListener(e,t,i)}function lm(n,e,t,i){n.removeEventListener(e,t,i)}const Dc=Symbol("_vei");function cm(n,e,t,i,r=null){const s=n[Dc]||(n[Dc]={}),o=s[e];if(i&&o)o.value=i;else{const[a,l]=um(e);if(i){const c=s[e]=hm(i,r);am(n,a,c,l)}else o&&(lm(n,a,o,l),s[e]=void 0)}}const Ic=/(?:Once|Passive|Capture)$/;function um(n){let e;if(Ic.test(n)){e={};let i;for(;i=n.match(Ic);)n=n.slice(0,n.length-i[0].length),e[i[0].toLowerCase()]=!0}return[n[2]===":"?n.slice(3):Oi(n.slice(2)),e]}let No=0;const fm=Promise.resolve(),dm=()=>No||(fm.then(()=>No=0),No=Date.now());function hm(n,e){const t=i=>{if(!i._vts)i._vts=Date.now();else if(i._vts<=t.attached)return;Pn(pm(i,t.value),e,5,[i])};return t.value=n,t.attached=dm(),t}function pm(n,e){if(Ge(e)){const t=n.stopImmediatePropagation;return n.stopImmediatePropagation=()=>{t.call(n),n._stopped=!0},e.map(i=>r=>!r._stopped&&i&&i(r))}else return e}const Lc=n=>n.charCodeAt(0)===111&&n.charCodeAt(1)===110&&n.charCodeAt(2)>96&&n.charCodeAt(2)<123,mm=(n,e,t,i,r,s)=>{const o=r==="svg";e==="class"?tm(n,i,o):e==="style"?sm(n,t,i):ao(e)?yl(e)||cm(n,e,t,i,s):(e[0]==="."?(e=e.slice(1),!0):e[0]==="^"?(e=e.slice(1),!1):gm(n,e,i,o))?(Pc(n,e,i),!n.tagName.includes("-")&&(e==="value"||e==="checked"||e==="selected")&&Cc(n,e,i,o,s,e!=="value")):n._isVueCE&&(/[A-Z]/.test(e)||!Et(i))?Pc(n,cn(e),i,s,e):(e==="true-value"?n._trueValue=i:e==="false-value"&&(n._falseValue=i),Cc(n,e,i,o))};function gm(n,e,t,i){if(i)return!!(e==="innerHTML"||e==="textContent"||e in n&&Lc(e)&&Xe(t));if(e==="spellcheck"||e==="draggable"||e==="translate"||e==="autocorrect"||e==="form"||e==="list"&&n.tagName==="INPUT"||e==="type"&&n.tagName==="TEXTAREA")return!1;if(e==="width"||e==="height"){const r=n.tagName;if(r==="IMG"||r==="VIDEO"||r==="CANVAS"||r==="SOURCE")return!1}return Lc(e)&&Et(t)?!1:e in n}const _m=Ft({patchProp:mm},Qp);let Uc;function vm(){return Uc||(Uc=Sp(_m))}const xm=((...n)=>{const e=vm().createApp(...n),{mount:t}=e;return e.mount=i=>{const r=Sm(i);if(!r)return;const s=e._component;!Xe(s)&&!s.render&&!s.template&&(s.template=r.innerHTML),r.nodeType===1&&(r.textContent="");const o=t(r,!1,ym(r));return r instanceof Element&&(r.removeAttribute("v-cloak"),r.setAttribute("data-v-app","")),o},e});function ym(n){if(n instanceof SVGElement)return"svg";if(typeof MathMLElement=="function"&&n instanceof MathMLElement)return"mathml"}function Sm(n){return Et(n)?document.querySelector(n):n}const Aa="/images/logo/logowhite.svg",Mm={class:"header__nav",id:"HeaderNav","aria-label":"Primary"},Em=["aria-expanded"],bm={class:"header__list"},Tm={class:"header__item"},Am={class:"header__item"},wm={class:"header__item"},Rm={class:"header__item"},Cm={__name:"Header",setup(n){const e=Dl(!1);function t(){e.value=!e.value}function i(r){r.key==="Escape"&&(e.value=!1)}return Ul(()=>{window.addEventListener("keydown",i)}),Bf(()=>{window.removeEventListener("keydown",i)}),(r,s)=>{const o=Nl("router-link");return we(),Pe("header",{class:rs(["header",{"header--open":e.value}]),id:"Header"},[s[5]||(s[5]=Be("a",{href:"/",class:"header__home"},[Be("img",{src:Aa,alt:"My Logo",class:"header__logo"})],-1)),Be("nav",Mm,[Be("button",{class:"header__toggle","aria-expanded":e.value.toString(),onClick:t},[...s[0]||(s[0]=[Be("img",{src:Aa,alt:"Menu",class:"header__menu"},null,-1)])],8,Em),Be("ul",bm,[Be("li",Tm,[xt(o,{to:"/",class:"header__link","aria-current":"page"},{default:rr(()=>[...s[1]||(s[1]=[on(" Home ",-1)])]),_:1})]),Be("li",Am,[xt(o,{to:"/projects",class:"header__link"},{default:rr(()=>[...s[2]||(s[2]=[on("Projects",-1)])]),_:1})]),Be("li",wm,[xt(o,{to:"/blog",class:"header__link"},{default:rr(()=>[...s[3]||(s[3]=[on("Blog",-1)])]),_:1})]),Be("li",Rm,[xt(o,{to:"/about",class:"header__link"},{default:rr(()=>[...s[4]||(s[4]=[on("About",-1)])]),_:1})])])])],2)}}},Pm="/images/contact/linkedin2.svg",Dm="/images/contact/ins1.svg",Im="/images/contact/personal1.svg",Lm="/images/contact/github.svg",Bi=(n,e)=>{const t=n.__vccOpts||n;for(const[i,r]of e)t[i]=r;return t},Um={},Nm={class:"footer"};function Fm(n,e){return we(),Pe("footer",Nm,[...e[0]||(e[0]=[no('<div class="container footer__inner"><div class="footer__copy animate" id="Footer"><h2 class="footer__heading copy__heading animate-copy"> Let’s get connected </h2><p class="footer__p animate-copy"> I’m always looking to connect with creators in interactive media and creative engineering. </p><p class="footer__p animate-copy"> Let’s explore how technology and design can tell great stories together. </p><p class="footer__p animate-copy">lange Briefe schreiben</p></div><div class="footer__contact animate" id="Contact"><a href="mailto:ruohanlew@gmail.com" rel="external noopener" target="_blank" class="footer__link footer__link--email animate-copy"><span class="footer__label">ruohanlew@gmail.com</span></a><a href="https://www.google.com/maps/place/Durham,+NC" rel="external noopener" target="_blank" class="footer__link footer__link--place animate-copy"><span class="footer__label footer__label--address">Durham, North Carolina, United States</span></a><a href="https://www.google.com/maps/place/Shanghai,+China" rel="external noopener" target="_blank" class="footer__link footer__link--place animate-copy"><span class="footer__label footer__label--address">Shanghai, China</span></a><div class="footer__social social animate-icons"><a href="https://www.linkedin.com/in/rhlu/" target="_blank" rel="external noopener" class="social__site social__site--linkedin animate-icon"><img src="'+Pm+'" alt="Ruohan on LinkedIn" loading="lazy" width="50" height="50" class="social__icon"></a><a href="https://www.instagram.com/kerrylew01/" target="_blank" rel="external noopener" class="social__site social__site--instagram animate-icon"><img src="'+Dm+'" alt="Ruohan on Personal Website" loading="lazy" width="45" height="31" class="social__icon"></a><a href="https://ruohanlu.github.io/" target="_blank" rel="external noopener" class="social__site social__site--youtube animate-icon"><img src="'+Im+'" alt="Ruohan on Personal Website" loading="lazy" width="45" height="31" class="social__icon"></a><a href="https://github.com/ruohanlu" target="_blank" rel="external noopener" class="social__site social__site--twitter animate-icon"><img src="'+Lm+'" alt="Ruohan on Github" loading="lazy" width="400" height="346" class="social__icon"></a></div><p class="footer__acknowledgement animate-copy"> Thanks to my mentors, teammates, friends, and family for their support along my game development journey. And a special thanks to everyone who plays and enjoys the games and interactive media—I create for YOU. </p></div><small class="footer__legal animate-copy"><a href="https://ruohanlu.github.io/" class="footer__home"><img src="'+Aa+'" width="98716" height="50197" alt="RuohanLu" class="footer__logo"></a><span class="footer__copyright">© Ruohan Lu 2025</span><a class="footer__disclaimer"> All rights reserved</a></small></div>',1)])])}const Om=Bi(Um,[["render",Fm]]),Bm={__name:"App",setup(n){return(e,t)=>{const i=Nl("router-view");return we(),Pe(mt,null,[xt(Cm),xt(i),xt(Om)],64)}}};/*!
  * vue-router v4.5.1
  * (c) 2025 Eduardo San Martin Morote
  * @license MIT
  */const ir=typeof document<"u";function cd(n){return typeof n=="object"||"displayName"in n||"props"in n||"__vccOpts"in n}function km(n){return n.__esModule||n[Symbol.toStringTag]==="Module"||n.default&&cd(n.default)}const it=Object.assign;function Fo(n,e){const t={};for(const i in e){const r=e[i];t[i]=vn(r)?r.map(n):n(r)}return t}const Wr=()=>{},vn=Array.isArray,ud=/#/g,zm=/&/g,Hm=/\//g,Vm=/=/g,Gm=/\?/g,fd=/\+/g,Wm=/%5B/g,Xm=/%5D/g,dd=/%5E/g,jm=/%60/g,hd=/%7B/g,qm=/%7C/g,pd=/%7D/g,Ym=/%20/g;function Hl(n){return encodeURI(""+n).replace(qm,"|").replace(Wm,"[").replace(Xm,"]")}function $m(n){return Hl(n).replace(hd,"{").replace(pd,"}").replace(dd,"^")}function wa(n){return Hl(n).replace(fd,"%2B").replace(Ym,"+").replace(ud,"%23").replace(zm,"%26").replace(jm,"`").replace(hd,"{").replace(pd,"}").replace(dd,"^")}function Km(n){return wa(n).replace(Vm,"%3D")}function Zm(n){return Hl(n).replace(ud,"%23").replace(Gm,"%3F")}function Jm(n){return n==null?"":Zm(n).replace(Hm,"%2F")}function Zr(n){try{return decodeURIComponent(""+n)}catch{}return""+n}const Qm=/\/$/,eg=n=>n.replace(Qm,"");function Oo(n,e,t="/"){let i,r={},s="",o="";const a=e.indexOf("#");let l=e.indexOf("?");return a<l&&a>=0&&(l=-1),l>-1&&(i=e.slice(0,l),s=e.slice(l+1,a>-1?a:e.length),r=n(s)),a>-1&&(i=i||e.slice(0,a),o=e.slice(a,e.length)),i=rg(i??e,t),{fullPath:i+(s&&"?")+s+o,path:i,query:r,hash:Zr(o)}}function tg(n,e){const t=e.query?n(e.query):"";return e.path+(t&&"?")+t+(e.hash||"")}function Nc(n,e){return!e||!n.toLowerCase().startsWith(e.toLowerCase())?n:n.slice(e.length)||"/"}function ng(n,e,t){const i=e.matched.length-1,r=t.matched.length-1;return i>-1&&i===r&&pr(e.matched[i],t.matched[r])&&md(e.params,t.params)&&n(e.query)===n(t.query)&&e.hash===t.hash}function pr(n,e){return(n.aliasOf||n)===(e.aliasOf||e)}function md(n,e){if(Object.keys(n).length!==Object.keys(e).length)return!1;for(const t in n)if(!ig(n[t],e[t]))return!1;return!0}function ig(n,e){return vn(n)?Fc(n,e):vn(e)?Fc(e,n):n===e}function Fc(n,e){return vn(e)?n.length===e.length&&n.every((t,i)=>t===e[i]):n.length===1&&n[0]===e}function rg(n,e){if(n.startsWith("/"))return n;if(!n)return e;const t=e.split("/"),i=n.split("/"),r=i[i.length-1];(r===".."||r===".")&&i.push("");let s=t.length-1,o,a;for(o=0;o<i.length;o++)if(a=i[o],a!==".")if(a==="..")s>1&&s--;else break;return t.slice(0,s).join("/")+"/"+i.slice(o).join("/")}const Kn={path:"/",name:void 0,params:{},query:{},hash:"",fullPath:"/",matched:[],meta:{},redirectedFrom:void 0};var Jr;(function(n){n.pop="pop",n.push="push"})(Jr||(Jr={}));var Xr;(function(n){n.back="back",n.forward="forward",n.unknown=""})(Xr||(Xr={}));function sg(n){if(!n)if(ir){const e=document.querySelector("base");n=e&&e.getAttribute("href")||"/",n=n.replace(/^\w+:\/\/[^\/]+/,"")}else n="/";return n[0]!=="/"&&n[0]!=="#"&&(n="/"+n),eg(n)}const og=/^[^#]+#/;function ag(n,e){return n.replace(og,"#")+e}function lg(n,e){const t=document.documentElement.getBoundingClientRect(),i=n.getBoundingClientRect();return{behavior:e.behavior,left:i.left-t.left-(e.left||0),top:i.top-t.top-(e.top||0)}}const xo=()=>({left:window.scrollX,top:window.scrollY});function cg(n){let e;if("el"in n){const t=n.el,i=typeof t=="string"&&t.startsWith("#"),r=typeof t=="string"?i?document.getElementById(t.slice(1)):document.querySelector(t):t;if(!r)return;e=lg(r,n)}else e=n;"scrollBehavior"in document.documentElement.style?window.scrollTo(e):window.scrollTo(e.left!=null?e.left:window.scrollX,e.top!=null?e.top:window.scrollY)}function Oc(n,e){return(history.state?history.state.position-e:-1)+n}const Ra=new Map;function ug(n,e){Ra.set(n,e)}function fg(n){const e=Ra.get(n);return Ra.delete(n),e}let dg=()=>location.protocol+"//"+location.host;function gd(n,e){const{pathname:t,search:i,hash:r}=e,s=n.indexOf("#");if(s>-1){let a=r.includes(n.slice(s))?n.slice(s).length:1,l=r.slice(a);return l[0]!=="/"&&(l="/"+l),Nc(l,"")}return Nc(t,n)+i+r}function hg(n,e,t,i){let r=[],s=[],o=null;const a=({state:d})=>{const p=gd(n,location),v=t.value,x=e.value;let m=0;if(d){if(t.value=p,e.value=d,o&&o===v){o=null;return}m=x?d.position-x.position:0}else i(p);r.forEach(h=>{h(t.value,v,{delta:m,type:Jr.pop,direction:m?m>0?Xr.forward:Xr.back:Xr.unknown})})};function l(){o=t.value}function c(d){r.push(d);const p=()=>{const v=r.indexOf(d);v>-1&&r.splice(v,1)};return s.push(p),p}function u(){const{history:d}=window;d.state&&d.replaceState(it({},d.state,{scroll:xo()}),"")}function f(){for(const d of s)d();s=[],window.removeEventListener("popstate",a),window.removeEventListener("beforeunload",u)}return window.addEventListener("popstate",a),window.addEventListener("beforeunload",u,{passive:!0}),{pauseListeners:l,listen:c,destroy:f}}function Bc(n,e,t,i=!1,r=!1){return{back:n,current:e,forward:t,replaced:i,position:window.history.length,scroll:r?xo():null}}function pg(n){const{history:e,location:t}=window,i={value:gd(n,t)},r={value:e.state};r.value||s(i.value,{back:null,current:i.value,forward:null,position:e.length-1,replaced:!0,scroll:null},!0);function s(l,c,u){const f=n.indexOf("#"),d=f>-1?(t.host&&document.querySelector("base")?n:n.slice(f))+l:dg()+n+l;try{e[u?"replaceState":"pushState"](c,"",d),r.value=c}catch(p){console.error(p),t[u?"replace":"assign"](d)}}function o(l,c){const u=it({},e.state,Bc(r.value.back,l,r.value.forward,!0),c,{position:r.value.position});s(l,u,!0),i.value=l}function a(l,c){const u=it({},r.value,e.state,{forward:l,scroll:xo()});s(u.current,u,!0);const f=it({},Bc(i.value,l,null),{position:u.position+1},c);s(l,f,!1),i.value=l}return{location:i,state:r,push:a,replace:o}}function mg(n){n=sg(n);const e=pg(n),t=hg(n,e.state,e.location,e.replace);function i(s,o=!0){o||t.pauseListeners(),history.go(s)}const r=it({location:"",base:n,go:i,createHref:ag.bind(null,n)},e,t);return Object.defineProperty(r,"location",{enumerable:!0,get:()=>e.location.value}),Object.defineProperty(r,"state",{enumerable:!0,get:()=>e.state.value}),r}function gg(n){return typeof n=="string"||n&&typeof n=="object"}function _d(n){return typeof n=="string"||typeof n=="symbol"}const vd=Symbol("");var kc;(function(n){n[n.aborted=4]="aborted",n[n.cancelled=8]="cancelled",n[n.duplicated=16]="duplicated"})(kc||(kc={}));function mr(n,e){return it(new Error,{type:n,[vd]:!0},e)}function Ln(n,e){return n instanceof Error&&vd in n&&(e==null||!!(n.type&e))}const zc="[^/]+?",_g={sensitive:!1,strict:!1,start:!0,end:!0},vg=/[.+*?^${}()[\]/\\]/g;function xg(n,e){const t=it({},_g,e),i=[];let r=t.start?"^":"";const s=[];for(const c of n){const u=c.length?[]:[90];t.strict&&!c.length&&(r+="/");for(let f=0;f<c.length;f++){const d=c[f];let p=40+(t.sensitive?.25:0);if(d.type===0)f||(r+="/"),r+=d.value.replace(vg,"\\$&"),p+=40;else if(d.type===1){const{value:v,repeatable:x,optional:m,regexp:h}=d;s.push({name:v,repeatable:x,optional:m});const w=h||zc;if(w!==zc){p+=10;try{new RegExp(`(${w})`)}catch(M){throw new Error(`Invalid custom RegExp for param "${v}" (${w}): `+M.message)}}let T=x?`((?:${w})(?:/(?:${w}))*)`:`(${w})`;f||(T=m&&c.length<2?`(?:/${T})`:"/"+T),m&&(T+="?"),r+=T,p+=20,m&&(p+=-8),x&&(p+=-20),w===".*"&&(p+=-50)}u.push(p)}i.push(u)}if(t.strict&&t.end){const c=i.length-1;i[c][i[c].length-1]+=.7000000000000001}t.strict||(r+="/?"),t.end?r+="$":t.strict&&!r.endsWith("/")&&(r+="(?:/|$)");const o=new RegExp(r,t.sensitive?"":"i");function a(c){const u=c.match(o),f={};if(!u)return null;for(let d=1;d<u.length;d++){const p=u[d]||"",v=s[d-1];f[v.name]=p&&v.repeatable?p.split("/"):p}return f}function l(c){let u="",f=!1;for(const d of n){(!f||!u.endsWith("/"))&&(u+="/"),f=!1;for(const p of d)if(p.type===0)u+=p.value;else if(p.type===1){const{value:v,repeatable:x,optional:m}=p,h=v in c?c[v]:"";if(vn(h)&&!x)throw new Error(`Provided param "${v}" is an array but it is not repeatable (* or + modifiers)`);const w=vn(h)?h.join("/"):h;if(!w)if(m)d.length<2&&(u.endsWith("/")?u=u.slice(0,-1):f=!0);else throw new Error(`Missing required param "${v}"`);u+=w}}return u||"/"}return{re:o,score:i,keys:s,parse:a,stringify:l}}function yg(n,e){let t=0;for(;t<n.length&&t<e.length;){const i=e[t]-n[t];if(i)return i;t++}return n.length<e.length?n.length===1&&n[0]===80?-1:1:n.length>e.length?e.length===1&&e[0]===80?1:-1:0}function xd(n,e){let t=0;const i=n.score,r=e.score;for(;t<i.length&&t<r.length;){const s=yg(i[t],r[t]);if(s)return s;t++}if(Math.abs(r.length-i.length)===1){if(Hc(i))return 1;if(Hc(r))return-1}return r.length-i.length}function Hc(n){const e=n[n.length-1];return n.length>0&&e[e.length-1]<0}const Sg={type:0,value:""},Mg=/[a-zA-Z0-9_]/;function Eg(n){if(!n)return[[]];if(n==="/")return[[Sg]];if(!n.startsWith("/"))throw new Error(`Invalid path "${n}"`);function e(p){throw new Error(`ERR (${t})/"${c}": ${p}`)}let t=0,i=t;const r=[];let s;function o(){s&&r.push(s),s=[]}let a=0,l,c="",u="";function f(){c&&(t===0?s.push({type:0,value:c}):t===1||t===2||t===3?(s.length>1&&(l==="*"||l==="+")&&e(`A repeatable param (${c}) must be alone in its segment. eg: '/:ids+.`),s.push({type:1,value:c,regexp:u,repeatable:l==="*"||l==="+",optional:l==="*"||l==="?"})):e("Invalid state to consume buffer"),c="")}function d(){c+=l}for(;a<n.length;){if(l=n[a++],l==="\\"&&t!==2){i=t,t=4;continue}switch(t){case 0:l==="/"?(c&&f(),o()):l===":"?(f(),t=1):d();break;case 4:d(),t=i;break;case 1:l==="("?t=2:Mg.test(l)?d():(f(),t=0,l!=="*"&&l!=="?"&&l!=="+"&&a--);break;case 2:l===")"?u[u.length-1]=="\\"?u=u.slice(0,-1)+l:t=3:u+=l;break;case 3:f(),t=0,l!=="*"&&l!=="?"&&l!=="+"&&a--,u="";break;default:e("Unknown state");break}}return t===2&&e(`Unfinished custom RegExp for param "${c}"`),f(),o(),r}function bg(n,e,t){const i=xg(Eg(n.path),t),r=it(i,{record:n,parent:e,children:[],alias:[]});return e&&!r.record.aliasOf==!e.record.aliasOf&&e.children.push(r),r}function Tg(n,e){const t=[],i=new Map;e=Xc({strict:!1,end:!0,sensitive:!1},e);function r(f){return i.get(f)}function s(f,d,p){const v=!p,x=Gc(f);x.aliasOf=p&&p.record;const m=Xc(e,f),h=[x];if("alias"in f){const M=typeof f.alias=="string"?[f.alias]:f.alias;for(const C of M)h.push(Gc(it({},x,{components:p?p.record.components:x.components,path:C,aliasOf:p?p.record:x})))}let w,T;for(const M of h){const{path:C}=M;if(d&&C[0]!=="/"){const D=d.record.path,R=D[D.length-1]==="/"?"":"/";M.path=d.record.path+(C&&R+C)}if(w=bg(M,d,m),p?p.alias.push(w):(T=T||w,T!==w&&T.alias.push(w),v&&f.name&&!Wc(w)&&o(f.name)),yd(w)&&l(w),x.children){const D=x.children;for(let R=0;R<D.length;R++)s(D[R],w,p&&p.children[R])}p=p||w}return T?()=>{o(T)}:Wr}function o(f){if(_d(f)){const d=i.get(f);d&&(i.delete(f),t.splice(t.indexOf(d),1),d.children.forEach(o),d.alias.forEach(o))}else{const d=t.indexOf(f);d>-1&&(t.splice(d,1),f.record.name&&i.delete(f.record.name),f.children.forEach(o),f.alias.forEach(o))}}function a(){return t}function l(f){const d=Rg(f,t);t.splice(d,0,f),f.record.name&&!Wc(f)&&i.set(f.record.name,f)}function c(f,d){let p,v={},x,m;if("name"in f&&f.name){if(p=i.get(f.name),!p)throw mr(1,{location:f});m=p.record.name,v=it(Vc(d.params,p.keys.filter(T=>!T.optional).concat(p.parent?p.parent.keys.filter(T=>T.optional):[]).map(T=>T.name)),f.params&&Vc(f.params,p.keys.map(T=>T.name))),x=p.stringify(v)}else if(f.path!=null)x=f.path,p=t.find(T=>T.re.test(x)),p&&(v=p.parse(x),m=p.record.name);else{if(p=d.name?i.get(d.name):t.find(T=>T.re.test(d.path)),!p)throw mr(1,{location:f,currentLocation:d});m=p.record.name,v=it({},d.params,f.params),x=p.stringify(v)}const h=[];let w=p;for(;w;)h.unshift(w.record),w=w.parent;return{name:m,path:x,params:v,matched:h,meta:wg(h)}}n.forEach(f=>s(f));function u(){t.length=0,i.clear()}return{addRoute:s,resolve:c,removeRoute:o,clearRoutes:u,getRoutes:a,getRecordMatcher:r}}function Vc(n,e){const t={};for(const i of e)i in n&&(t[i]=n[i]);return t}function Gc(n){const e={path:n.path,redirect:n.redirect,name:n.name,meta:n.meta||{},aliasOf:n.aliasOf,beforeEnter:n.beforeEnter,props:Ag(n),children:n.children||[],instances:{},leaveGuards:new Set,updateGuards:new Set,enterCallbacks:{},components:"components"in n?n.components||null:n.component&&{default:n.component}};return Object.defineProperty(e,"mods",{value:{}}),e}function Ag(n){const e={},t=n.props||!1;if("component"in n)e.default=t;else for(const i in n.components)e[i]=typeof t=="object"?t[i]:t;return e}function Wc(n){for(;n;){if(n.record.aliasOf)return!0;n=n.parent}return!1}function wg(n){return n.reduce((e,t)=>it(e,t.meta),{})}function Xc(n,e){const t={};for(const i in n)t[i]=i in e?e[i]:n[i];return t}function Rg(n,e){let t=0,i=e.length;for(;t!==i;){const s=t+i>>1;xd(n,e[s])<0?i=s:t=s+1}const r=Cg(n);return r&&(i=e.lastIndexOf(r,i-1)),i}function Cg(n){let e=n;for(;e=e.parent;)if(yd(e)&&xd(n,e)===0)return e}function yd({record:n}){return!!(n.name||n.components&&Object.keys(n.components).length||n.redirect)}function Pg(n){const e={};if(n===""||n==="?")return e;const i=(n[0]==="?"?n.slice(1):n).split("&");for(let r=0;r<i.length;++r){const s=i[r].replace(fd," "),o=s.indexOf("="),a=Zr(o<0?s:s.slice(0,o)),l=o<0?null:Zr(s.slice(o+1));if(a in e){let c=e[a];vn(c)||(c=e[a]=[c]),c.push(l)}else e[a]=l}return e}function jc(n){let e="";for(let t in n){const i=n[t];if(t=Km(t),i==null){i!==void 0&&(e+=(e.length?"&":"")+t);continue}(vn(i)?i.map(s=>s&&wa(s)):[i&&wa(i)]).forEach(s=>{s!==void 0&&(e+=(e.length?"&":"")+t,s!=null&&(e+="="+s))})}return e}function Dg(n){const e={};for(const t in n){const i=n[t];i!==void 0&&(e[t]=vn(i)?i.map(r=>r==null?null:""+r):i==null?i:""+i)}return e}const Ig=Symbol(""),qc=Symbol(""),Vl=Symbol(""),Gl=Symbol(""),Ca=Symbol("");function wr(){let n=[];function e(i){return n.push(i),()=>{const r=n.indexOf(i);r>-1&&n.splice(r,1)}}function t(){n=[]}return{add:e,list:()=>n.slice(),reset:t}}function si(n,e,t,i,r,s=o=>o()){const o=i&&(i.enterCallbacks[r]=i.enterCallbacks[r]||[]);return()=>new Promise((a,l)=>{const c=d=>{d===!1?l(mr(4,{from:t,to:e})):d instanceof Error?l(d):gg(d)?l(mr(2,{from:e,to:d})):(o&&i.enterCallbacks[r]===o&&typeof d=="function"&&o.push(d),a())},u=s(()=>n.call(i&&i.instances[r],e,t,c));let f=Promise.resolve(u);n.length<3&&(f=f.then(c)),f.catch(d=>l(d))})}function Bo(n,e,t,i,r=s=>s()){const s=[];for(const o of n)for(const a in o.components){let l=o.components[a];if(!(e!=="beforeRouteEnter"&&!o.instances[a]))if(cd(l)){const u=(l.__vccOpts||l)[e];u&&s.push(si(u,t,i,o,a,r))}else{let c=l();s.push(()=>c.then(u=>{if(!u)throw new Error(`Couldn't resolve component "${a}" at "${o.path}"`);const f=km(u)?u.default:u;o.mods[a]=u,o.components[a]=f;const p=(f.__vccOpts||f)[e];return p&&si(p,t,i,o,a,r)()}))}}return s}function Yc(n){const e=Rn(Vl),t=Rn(Gl),i=Xt(()=>{const l=tt(n.to);return e.resolve(l)}),r=Xt(()=>{const{matched:l}=i.value,{length:c}=l,u=l[c-1],f=t.matched;if(!u||!f.length)return-1;const d=f.findIndex(pr.bind(null,u));if(d>-1)return d;const p=$c(l[c-2]);return c>1&&$c(u)===p&&f[f.length-1].path!==p?f.findIndex(pr.bind(null,l[c-2])):d}),s=Xt(()=>r.value>-1&&Og(t.params,i.value.params)),o=Xt(()=>r.value>-1&&r.value===t.matched.length-1&&md(t.params,i.value.params));function a(l={}){if(Fg(l)){const c=e[tt(n.replace)?"replace":"push"](tt(n.to)).catch(Wr);return n.viewTransition&&typeof document<"u"&&"startViewTransition"in document&&document.startViewTransition(()=>c),c}return Promise.resolve()}return{route:i,href:Xt(()=>i.value.href),isActive:s,isExactActive:o,navigate:a}}function Lg(n){return n.length===1?n[0]:n}const Ug=Uf({name:"RouterLink",compatConfig:{MODE:3},props:{to:{type:[String,Object],required:!0},replace:Boolean,activeClass:String,exactActiveClass:String,custom:Boolean,ariaCurrentValue:{type:String,default:"page"},viewTransition:Boolean},useLink:Yc,setup(n,{slots:e}){const t=po(Yc(n)),{options:i}=Rn(Vl),r=Xt(()=>({[Kc(n.activeClass,i.linkActiveClass,"router-link-active")]:t.isActive,[Kc(n.exactActiveClass,i.linkExactActiveClass,"router-link-exact-active")]:t.isExactActive}));return()=>{const s=e.default&&Lg(e.default(t));return n.custom?s:ad("a",{"aria-current":t.isExactActive?n.ariaCurrentValue:null,href:t.href,onClick:t.navigate,class:r.value},s)}}}),Ng=Ug;function Fg(n){if(!(n.metaKey||n.altKey||n.ctrlKey||n.shiftKey)&&!n.defaultPrevented&&!(n.button!==void 0&&n.button!==0)){if(n.currentTarget&&n.currentTarget.getAttribute){const e=n.currentTarget.getAttribute("target");if(/\b_blank\b/i.test(e))return}return n.preventDefault&&n.preventDefault(),!0}}function Og(n,e){for(const t in e){const i=e[t],r=n[t];if(typeof i=="string"){if(i!==r)return!1}else if(!vn(r)||r.length!==i.length||i.some((s,o)=>s!==r[o]))return!1}return!0}function $c(n){return n?n.aliasOf?n.aliasOf.path:n.path:""}const Kc=(n,e,t)=>n??e??t,Bg=Uf({name:"RouterView",inheritAttrs:!1,props:{name:{type:String,default:"default"},route:Object},compatConfig:{MODE:3},setup(n,{attrs:e,slots:t}){const i=Rn(Ca),r=Xt(()=>n.route||i.value),s=Rn(qc,0),o=Xt(()=>{let c=tt(s);const{matched:u}=r.value;let f;for(;(f=u[c])&&!f.components;)c++;return c}),a=Xt(()=>r.value.matched[o.value]);Bs(qc,Xt(()=>o.value+1)),Bs(Ig,a),Bs(Ca,r);const l=Dl();return ks(()=>[l.value,a.value,n.name],([c,u,f],[d,p,v])=>{u&&(u.instances[f]=c,p&&p!==u&&c&&c===d&&(u.leaveGuards.size||(u.leaveGuards=p.leaveGuards),u.updateGuards.size||(u.updateGuards=p.updateGuards))),c&&u&&(!p||!pr(u,p)||!d)&&(u.enterCallbacks[f]||[]).forEach(x=>x(c))},{flush:"post"}),()=>{const c=r.value,u=n.name,f=a.value,d=f&&f.components[u];if(!d)return Zc(t.default,{Component:d,route:c});const p=f.props[u],v=p?p===!0?c.params:typeof p=="function"?p(c):p:null,m=ad(d,it({},v,e,{onVnodeUnmounted:h=>{h.component.isUnmounted&&(f.instances[u]=null)},ref:l}));return Zc(t.default,{Component:m,route:c})||m}}});function Zc(n,e){if(!n)return null;const t=n(e);return t.length===1?t[0]:t}const kg=Bg;function zg(n){const e=Tg(n.routes,n),t=n.parseQuery||Pg,i=n.stringifyQuery||jc,r=n.history,s=wr(),o=wr(),a=wr(),l=Nh(Kn);let c=Kn;ir&&n.scrollBehavior&&"scrollRestoration"in history&&(history.scrollRestoration="manual");const u=Fo.bind(null,P=>""+P),f=Fo.bind(null,Jm),d=Fo.bind(null,Zr);function p(P,Z){let re,se;return _d(P)?(re=e.getRecordMatcher(P),se=Z):se=P,e.addRoute(se,re)}function v(P){const Z=e.getRecordMatcher(P);Z&&e.removeRoute(Z)}function x(){return e.getRoutes().map(P=>P.record)}function m(P){return!!e.getRecordMatcher(P)}function h(P,Z){if(Z=it({},Z||l.value),typeof P=="string"){const N=Oo(t,P,Z.path),H=e.resolve({path:N.path},Z),V=r.createHref(N.fullPath);return it(N,H,{params:d(H.params),hash:Zr(N.hash),redirectedFrom:void 0,href:V})}let re;if(P.path!=null)re=it({},P,{path:Oo(t,P.path,Z.path).path});else{const N=it({},P.params);for(const H in N)N[H]==null&&delete N[H];re=it({},P,{params:f(N)}),Z.params=f(Z.params)}const se=e.resolve(re,Z),Ie=P.hash||"";se.params=u(d(se.params));const A=tg(i,it({},P,{hash:$m(Ie),path:se.path})),g=r.createHref(A);return it({fullPath:A,hash:Ie,query:i===jc?Dg(P.query):P.query||{}},se,{redirectedFrom:void 0,href:g})}function w(P){return typeof P=="string"?Oo(t,P,l.value.path):it({},P)}function T(P,Z){if(c!==P)return mr(8,{from:Z,to:P})}function M(P){return R(P)}function C(P){return M(it(w(P),{replace:!0}))}function D(P){const Z=P.matched[P.matched.length-1];if(Z&&Z.redirect){const{redirect:re}=Z;let se=typeof re=="function"?re(P):re;return typeof se=="string"&&(se=se.includes("?")||se.includes("#")?se=w(se):{path:se},se.params={}),it({query:P.query,hash:P.hash,params:se.path!=null?{}:P.params},se)}}function R(P,Z){const re=c=h(P),se=l.value,Ie=P.state,A=P.force,g=P.replace===!0,N=D(re);if(N)return R(it(w(N),{state:typeof N=="object"?it({},Ie,N.state):Ie,force:A,replace:g}),Z||re);const H=re;H.redirectedFrom=Z;let V;return!A&&ng(i,se,re)&&(V=mr(16,{to:H,from:se}),Re(se,se,!0,!1)),(V?Promise.resolve(V):E(H,se)).catch(F=>Ln(F)?Ln(F,2)?F:ve(F):z(F,H,se)).then(F=>{if(F){if(Ln(F,2))return R(it({replace:g},w(F.to),{state:typeof F.to=="object"?it({},Ie,F.to.state):Ie,force:A}),Z||H)}else F=X(H,se,!0,g,Ie);return L(H,se,F),F})}function k(P,Z){const re=T(P,Z);return re?Promise.reject(re):Promise.resolve()}function b(P){const Z=et.values().next().value;return Z&&typeof Z.runWithContext=="function"?Z.runWithContext(P):P()}function E(P,Z){let re;const[se,Ie,A]=Hg(P,Z);re=Bo(se.reverse(),"beforeRouteLeave",P,Z);for(const N of se)N.leaveGuards.forEach(H=>{re.push(si(H,P,Z))});const g=k.bind(null,P,Z);return re.push(g),te(re).then(()=>{re=[];for(const N of s.list())re.push(si(N,P,Z));return re.push(g),te(re)}).then(()=>{re=Bo(Ie,"beforeRouteUpdate",P,Z);for(const N of Ie)N.updateGuards.forEach(H=>{re.push(si(H,P,Z))});return re.push(g),te(re)}).then(()=>{re=[];for(const N of A)if(N.beforeEnter)if(vn(N.beforeEnter))for(const H of N.beforeEnter)re.push(si(H,P,Z));else re.push(si(N.beforeEnter,P,Z));return re.push(g),te(re)}).then(()=>(P.matched.forEach(N=>N.enterCallbacks={}),re=Bo(A,"beforeRouteEnter",P,Z,b),re.push(g),te(re))).then(()=>{re=[];for(const N of o.list())re.push(si(N,P,Z));return re.push(g),te(re)}).catch(N=>Ln(N,8)?N:Promise.reject(N))}function L(P,Z,re){a.list().forEach(se=>b(()=>se(P,Z,re)))}function X(P,Z,re,se,Ie){const A=T(P,Z);if(A)return A;const g=Z===Kn,N=ir?history.state:{};re&&(se||g?r.replace(P.fullPath,it({scroll:g&&N&&N.scroll},Ie)):r.push(P.fullPath,Ie)),l.value=P,Re(P,Z,re,g),ve()}let K;function le(){K||(K=r.listen((P,Z,re)=>{if(!$e.listening)return;const se=h(P),Ie=D(se);if(Ie){R(it(Ie,{replace:!0,force:!0}),se).catch(Wr);return}c=se;const A=l.value;ir&&ug(Oc(A.fullPath,re.delta),xo()),E(se,A).catch(g=>Ln(g,12)?g:Ln(g,2)?(R(it(w(g.to),{force:!0}),se).then(N=>{Ln(N,20)&&!re.delta&&re.type===Jr.pop&&r.go(-1,!1)}).catch(Wr),Promise.reject()):(re.delta&&r.go(-re.delta,!1),z(g,se,A))).then(g=>{g=g||X(se,A,!1),g&&(re.delta&&!Ln(g,8)?r.go(-re.delta,!1):re.type===Jr.pop&&Ln(g,20)&&r.go(-1,!1)),L(se,A,g)}).catch(Wr)}))}let ie=wr(),J=wr(),Q;function z(P,Z,re){ve(P);const se=J.list();return se.length?se.forEach(Ie=>Ie(P,Z,re)):console.error(P),Promise.reject(P)}function me(){return Q&&l.value!==Kn?Promise.resolve():new Promise((P,Z)=>{ie.add([P,Z])})}function ve(P){return Q||(Q=!P,le(),ie.list().forEach(([Z,re])=>P?re(P):Z()),ie.reset()),P}function Re(P,Z,re,se){const{scrollBehavior:Ie}=n;if(!ir||!Ie)return Promise.resolve();const A=!re&&fg(Oc(P.fullPath,0))||(se||!re)&&history.state&&history.state.scroll||null;return Cf().then(()=>Ie(P,Z,A)).then(g=>g&&cg(g)).catch(g=>z(g,P,Z))}const Oe=P=>r.go(P);let Ze;const et=new Set,$e={currentRoute:l,listening:!0,addRoute:p,removeRoute:v,clearRoutes:e.clearRoutes,hasRoute:m,getRoutes:x,resolve:h,options:n,push:M,replace:C,go:Oe,back:()=>Oe(-1),forward:()=>Oe(1),beforeEach:s.add,beforeResolve:o.add,afterEach:a.add,onError:J.add,isReady:me,install(P){const Z=this;P.component("RouterLink",Ng),P.component("RouterView",kg),P.config.globalProperties.$router=Z,Object.defineProperty(P.config.globalProperties,"$route",{enumerable:!0,get:()=>tt(l)}),ir&&!Ze&&l.value===Kn&&(Ze=!0,M(r.location).catch(Ie=>{}));const re={};for(const Ie in Kn)Object.defineProperty(re,Ie,{get:()=>l.value[Ie],enumerable:!0});P.provide(Vl,Z),P.provide(Gl,bf(re)),P.provide(Ca,l);const se=P.unmount;et.add(P),P.unmount=function(){et.delete(P),et.size<1&&(c=Kn,K&&K(),K=null,l.value=Kn,Ze=!1,Q=!1),se()}}};function te(P){return P.reduce((Z,re)=>Z.then(()=>b(re)),Promise.resolve())}return $e}function Hg(n,e){const t=[],i=[],r=[],s=Math.max(e.matched.length,n.matched.length);for(let o=0;o<s;o++){const a=e.matched[o];a&&(n.matched.find(c=>pr(c,a))?i.push(a):t.push(a));const l=n.matched[o];l&&(e.matched.find(c=>pr(c,l))||r.push(l))}return[t,i,r]}function Vg(n){return Rn(Gl)}const Gg="/videos/runner1.mp4",Wg="/videos/runner2.mp4",Xg="/videos/runner3.mp4";/**
 * @license
 * Copyright 2010-2025 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const Wl="180",jg=0,Jc=1,qg=2,Sd=1,Yg=2,kn=3,hi=0,jt=1,Vn=2,ci=0,fr=1,Qc=2,eu=3,tu=4,$g=5,Ci=100,Kg=101,Zg=102,Jg=103,Qg=104,e_=200,t_=201,n_=202,i_=203,Pa=204,Da=205,r_=206,s_=207,o_=208,a_=209,l_=210,c_=211,u_=212,f_=213,d_=214,Ia=0,La=1,Ua=2,gr=3,Na=4,Fa=5,Oa=6,Ba=7,Md=0,h_=1,p_=2,ui=0,m_=1,g_=2,__=3,v_=4,x_=5,y_=6,S_=7,Ed=300,_r=301,vr=302,ka=303,za=304,yo=306,Ha=1e3,Di=1001,Va=1002,_n=1003,M_=1004,gs=1005,bn=1006,ko=1007,Ii=1008,qn=1009,bd=1010,Td=1011,Qr=1012,Xl=1013,Ni=1014,Gn=1015,as=1016,jl=1017,ql=1018,es=1020,Ad=35902,wd=35899,Rd=1021,Cd=1022,mn=1023,ts=1026,ns=1027,Pd=1028,Yl=1029,Dd=1030,$l=1031,Kl=1033,Gs=33776,Ws=33777,Xs=33778,js=33779,Ga=35840,Wa=35841,Xa=35842,ja=35843,qa=36196,Ya=37492,$a=37496,Ka=37808,Za=37809,Ja=37810,Qa=37811,el=37812,tl=37813,nl=37814,il=37815,rl=37816,sl=37817,ol=37818,al=37819,ll=37820,cl=37821,ul=36492,fl=36494,dl=36495,hl=36283,pl=36284,ml=36285,gl=36286,E_=3200,b_=3201,T_=0,A_=1,ai="",sn="srgb",xr="srgb-linear",ro="linear",at="srgb",Vi=7680,nu=519,w_=512,R_=513,C_=514,Id=515,P_=516,D_=517,I_=518,L_=519,iu=35044,ru="300 es",Tn=2e3,so=2001;class Sr{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});const i=this._listeners;i[e]===void 0&&(i[e]=[]),i[e].indexOf(t)===-1&&i[e].push(t)}hasEventListener(e,t){const i=this._listeners;return i===void 0?!1:i[e]!==void 0&&i[e].indexOf(t)!==-1}removeEventListener(e,t){const i=this._listeners;if(i===void 0)return;const r=i[e];if(r!==void 0){const s=r.indexOf(t);s!==-1&&r.splice(s,1)}}dispatchEvent(e){const t=this._listeners;if(t===void 0)return;const i=t[e.type];if(i!==void 0){e.target=this;const r=i.slice(0);for(let s=0,o=r.length;s<o;s++)r[s].call(this,e);e.target=null}}}const Dt=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],zo=Math.PI/180,_l=180/Math.PI;function ls(){const n=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,i=Math.random()*4294967295|0;return(Dt[n&255]+Dt[n>>8&255]+Dt[n>>16&255]+Dt[n>>24&255]+"-"+Dt[e&255]+Dt[e>>8&255]+"-"+Dt[e>>16&15|64]+Dt[e>>24&255]+"-"+Dt[t&63|128]+Dt[t>>8&255]+"-"+Dt[t>>16&255]+Dt[t>>24&255]+Dt[i&255]+Dt[i>>8&255]+Dt[i>>16&255]+Dt[i>>24&255]).toLowerCase()}function Ke(n,e,t){return Math.max(e,Math.min(t,n))}function U_(n,e){return(n%e+e)%e}function Ho(n,e,t){return(1-t)*n+t*e}function Rr(n,e){switch(e.constructor){case Float32Array:return n;case Uint32Array:return n/4294967295;case Uint16Array:return n/65535;case Uint8Array:return n/255;case Int32Array:return Math.max(n/2147483647,-1);case Int16Array:return Math.max(n/32767,-1);case Int8Array:return Math.max(n/127,-1);default:throw new Error("Invalid component type.")}}function Vt(n,e){switch(e.constructor){case Float32Array:return n;case Uint32Array:return Math.round(n*4294967295);case Uint16Array:return Math.round(n*65535);case Uint8Array:return Math.round(n*255);case Int32Array:return Math.round(n*2147483647);case Int16Array:return Math.round(n*32767);case Int8Array:return Math.round(n*127);default:throw new Error("Invalid component type.")}}class ct{constructor(e=0,t=0){ct.prototype.isVector2=!0,this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){const t=this.x,i=this.y,r=e.elements;return this.x=r[0]*t+r[3]*i+r[6],this.y=r[1]*t+r[4]*i+r[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=Ke(this.x,e.x,t.x),this.y=Ke(this.y,e.y,t.y),this}clampScalar(e,t){return this.x=Ke(this.x,e,t),this.y=Ke(this.y,e,t),this}clampLength(e,t){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Ke(i,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const i=this.dot(e)/t;return Math.acos(Ke(i,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,i=this.y-e.y;return t*t+i*i}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){const i=Math.cos(t),r=Math.sin(t),s=this.x-e.x,o=this.y-e.y;return this.x=s*i-o*r+e.x,this.y=s*r+o*i+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class cs{constructor(e=0,t=0,i=0,r=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=i,this._w=r}static slerpFlat(e,t,i,r,s,o,a){let l=i[r+0],c=i[r+1],u=i[r+2],f=i[r+3];const d=s[o+0],p=s[o+1],v=s[o+2],x=s[o+3];if(a===0){e[t+0]=l,e[t+1]=c,e[t+2]=u,e[t+3]=f;return}if(a===1){e[t+0]=d,e[t+1]=p,e[t+2]=v,e[t+3]=x;return}if(f!==x||l!==d||c!==p||u!==v){let m=1-a;const h=l*d+c*p+u*v+f*x,w=h>=0?1:-1,T=1-h*h;if(T>Number.EPSILON){const C=Math.sqrt(T),D=Math.atan2(C,h*w);m=Math.sin(m*D)/C,a=Math.sin(a*D)/C}const M=a*w;if(l=l*m+d*M,c=c*m+p*M,u=u*m+v*M,f=f*m+x*M,m===1-a){const C=1/Math.sqrt(l*l+c*c+u*u+f*f);l*=C,c*=C,u*=C,f*=C}}e[t]=l,e[t+1]=c,e[t+2]=u,e[t+3]=f}static multiplyQuaternionsFlat(e,t,i,r,s,o){const a=i[r],l=i[r+1],c=i[r+2],u=i[r+3],f=s[o],d=s[o+1],p=s[o+2],v=s[o+3];return e[t]=a*v+u*f+l*p-c*d,e[t+1]=l*v+u*d+c*f-a*p,e[t+2]=c*v+u*p+a*d-l*f,e[t+3]=u*v-a*f-l*d-c*p,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,i,r){return this._x=e,this._y=t,this._z=i,this._w=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){const i=e._x,r=e._y,s=e._z,o=e._order,a=Math.cos,l=Math.sin,c=a(i/2),u=a(r/2),f=a(s/2),d=l(i/2),p=l(r/2),v=l(s/2);switch(o){case"XYZ":this._x=d*u*f+c*p*v,this._y=c*p*f-d*u*v,this._z=c*u*v+d*p*f,this._w=c*u*f-d*p*v;break;case"YXZ":this._x=d*u*f+c*p*v,this._y=c*p*f-d*u*v,this._z=c*u*v-d*p*f,this._w=c*u*f+d*p*v;break;case"ZXY":this._x=d*u*f-c*p*v,this._y=c*p*f+d*u*v,this._z=c*u*v+d*p*f,this._w=c*u*f-d*p*v;break;case"ZYX":this._x=d*u*f-c*p*v,this._y=c*p*f+d*u*v,this._z=c*u*v-d*p*f,this._w=c*u*f+d*p*v;break;case"YZX":this._x=d*u*f+c*p*v,this._y=c*p*f+d*u*v,this._z=c*u*v-d*p*f,this._w=c*u*f-d*p*v;break;case"XZY":this._x=d*u*f-c*p*v,this._y=c*p*f-d*u*v,this._z=c*u*v+d*p*f,this._w=c*u*f+d*p*v;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+o)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){const i=t/2,r=Math.sin(i);return this._x=e.x*r,this._y=e.y*r,this._z=e.z*r,this._w=Math.cos(i),this._onChangeCallback(),this}setFromRotationMatrix(e){const t=e.elements,i=t[0],r=t[4],s=t[8],o=t[1],a=t[5],l=t[9],c=t[2],u=t[6],f=t[10],d=i+a+f;if(d>0){const p=.5/Math.sqrt(d+1);this._w=.25/p,this._x=(u-l)*p,this._y=(s-c)*p,this._z=(o-r)*p}else if(i>a&&i>f){const p=2*Math.sqrt(1+i-a-f);this._w=(u-l)/p,this._x=.25*p,this._y=(r+o)/p,this._z=(s+c)/p}else if(a>f){const p=2*Math.sqrt(1+a-i-f);this._w=(s-c)/p,this._x=(r+o)/p,this._y=.25*p,this._z=(l+u)/p}else{const p=2*Math.sqrt(1+f-i-a);this._w=(o-r)/p,this._x=(s+c)/p,this._y=(l+u)/p,this._z=.25*p}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let i=e.dot(t)+1;return i<1e-8?(i=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=i):(this._x=0,this._y=-e.z,this._z=e.y,this._w=i)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=i),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(Ke(this.dot(e),-1,1)))}rotateTowards(e,t){const i=this.angleTo(e);if(i===0)return this;const r=Math.min(1,t/i);return this.slerp(e,r),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){const i=e._x,r=e._y,s=e._z,o=e._w,a=t._x,l=t._y,c=t._z,u=t._w;return this._x=i*u+o*a+r*c-s*l,this._y=r*u+o*l+s*a-i*c,this._z=s*u+o*c+i*l-r*a,this._w=o*u-i*a-r*l-s*c,this._onChangeCallback(),this}slerp(e,t){if(t===0)return this;if(t===1)return this.copy(e);const i=this._x,r=this._y,s=this._z,o=this._w;let a=o*e._w+i*e._x+r*e._y+s*e._z;if(a<0?(this._w=-e._w,this._x=-e._x,this._y=-e._y,this._z=-e._z,a=-a):this.copy(e),a>=1)return this._w=o,this._x=i,this._y=r,this._z=s,this;const l=1-a*a;if(l<=Number.EPSILON){const p=1-t;return this._w=p*o+t*this._w,this._x=p*i+t*this._x,this._y=p*r+t*this._y,this._z=p*s+t*this._z,this.normalize(),this}const c=Math.sqrt(l),u=Math.atan2(c,a),f=Math.sin((1-t)*u)/c,d=Math.sin(t*u)/c;return this._w=o*f+this._w*d,this._x=i*f+this._x*d,this._y=r*f+this._y*d,this._z=s*f+this._z*d,this._onChangeCallback(),this}slerpQuaternions(e,t,i){return this.copy(e).slerp(t,i)}random(){const e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),i=Math.random(),r=Math.sqrt(1-i),s=Math.sqrt(i);return this.set(r*Math.sin(e),r*Math.cos(e),s*Math.sin(t),s*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class q{constructor(e=0,t=0,i=0){q.prototype.isVector3=!0,this.x=e,this.y=t,this.z=i}set(e,t,i){return i===void 0&&(i=this.z),this.x=e,this.y=t,this.z=i,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(su.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(su.setFromAxisAngle(e,t))}applyMatrix3(e){const t=this.x,i=this.y,r=this.z,s=e.elements;return this.x=s[0]*t+s[3]*i+s[6]*r,this.y=s[1]*t+s[4]*i+s[7]*r,this.z=s[2]*t+s[5]*i+s[8]*r,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){const t=this.x,i=this.y,r=this.z,s=e.elements,o=1/(s[3]*t+s[7]*i+s[11]*r+s[15]);return this.x=(s[0]*t+s[4]*i+s[8]*r+s[12])*o,this.y=(s[1]*t+s[5]*i+s[9]*r+s[13])*o,this.z=(s[2]*t+s[6]*i+s[10]*r+s[14])*o,this}applyQuaternion(e){const t=this.x,i=this.y,r=this.z,s=e.x,o=e.y,a=e.z,l=e.w,c=2*(o*r-a*i),u=2*(a*t-s*r),f=2*(s*i-o*t);return this.x=t+l*c+o*f-a*u,this.y=i+l*u+a*c-s*f,this.z=r+l*f+s*u-o*c,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){const t=this.x,i=this.y,r=this.z,s=e.elements;return this.x=s[0]*t+s[4]*i+s[8]*r,this.y=s[1]*t+s[5]*i+s[9]*r,this.z=s[2]*t+s[6]*i+s[10]*r,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=Ke(this.x,e.x,t.x),this.y=Ke(this.y,e.y,t.y),this.z=Ke(this.z,e.z,t.z),this}clampScalar(e,t){return this.x=Ke(this.x,e,t),this.y=Ke(this.y,e,t),this.z=Ke(this.z,e,t),this}clampLength(e,t){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Ke(i,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this.z=e.z+(t.z-e.z)*i,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){const i=e.x,r=e.y,s=e.z,o=t.x,a=t.y,l=t.z;return this.x=r*l-s*a,this.y=s*o-i*l,this.z=i*a-r*o,this}projectOnVector(e){const t=e.lengthSq();if(t===0)return this.set(0,0,0);const i=e.dot(this)/t;return this.copy(e).multiplyScalar(i)}projectOnPlane(e){return Vo.copy(this).projectOnVector(e),this.sub(Vo)}reflect(e){return this.sub(Vo.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const i=this.dot(e)/t;return Math.acos(Ke(i,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,i=this.y-e.y,r=this.z-e.z;return t*t+i*i+r*r}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,i){const r=Math.sin(t)*e;return this.x=r*Math.sin(i),this.y=Math.cos(t)*e,this.z=r*Math.cos(i),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,i){return this.x=e*Math.sin(t),this.y=i,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){const t=this.setFromMatrixColumn(e,0).length(),i=this.setFromMatrixColumn(e,1).length(),r=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=i,this.z=r,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const e=Math.random()*Math.PI*2,t=Math.random()*2-1,i=Math.sqrt(1-t*t);return this.x=i*Math.cos(e),this.y=t,this.z=i*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const Vo=new q,su=new cs;class je{constructor(e,t,i,r,s,o,a,l,c){je.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,i,r,s,o,a,l,c)}set(e,t,i,r,s,o,a,l,c){const u=this.elements;return u[0]=e,u[1]=r,u[2]=a,u[3]=t,u[4]=s,u[5]=l,u[6]=i,u[7]=o,u[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){const t=this.elements,i=e.elements;return t[0]=i[0],t[1]=i[1],t[2]=i[2],t[3]=i[3],t[4]=i[4],t[5]=i[5],t[6]=i[6],t[7]=i[7],t[8]=i[8],this}extractBasis(e,t,i){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),i.setFromMatrix3Column(this,2),this}setFromMatrix4(e){const t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const i=e.elements,r=t.elements,s=this.elements,o=i[0],a=i[3],l=i[6],c=i[1],u=i[4],f=i[7],d=i[2],p=i[5],v=i[8],x=r[0],m=r[3],h=r[6],w=r[1],T=r[4],M=r[7],C=r[2],D=r[5],R=r[8];return s[0]=o*x+a*w+l*C,s[3]=o*m+a*T+l*D,s[6]=o*h+a*M+l*R,s[1]=c*x+u*w+f*C,s[4]=c*m+u*T+f*D,s[7]=c*h+u*M+f*R,s[2]=d*x+p*w+v*C,s[5]=d*m+p*T+v*D,s[8]=d*h+p*M+v*R,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){const e=this.elements,t=e[0],i=e[1],r=e[2],s=e[3],o=e[4],a=e[5],l=e[6],c=e[7],u=e[8];return t*o*u-t*a*c-i*s*u+i*a*l+r*s*c-r*o*l}invert(){const e=this.elements,t=e[0],i=e[1],r=e[2],s=e[3],o=e[4],a=e[5],l=e[6],c=e[7],u=e[8],f=u*o-a*c,d=a*l-u*s,p=c*s-o*l,v=t*f+i*d+r*p;if(v===0)return this.set(0,0,0,0,0,0,0,0,0);const x=1/v;return e[0]=f*x,e[1]=(r*c-u*i)*x,e[2]=(a*i-r*o)*x,e[3]=d*x,e[4]=(u*t-r*l)*x,e[5]=(r*s-a*t)*x,e[6]=p*x,e[7]=(i*l-c*t)*x,e[8]=(o*t-i*s)*x,this}transpose(){let e;const t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){const t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,i,r,s,o,a){const l=Math.cos(s),c=Math.sin(s);return this.set(i*l,i*c,-i*(l*o+c*a)+o+e,-r*c,r*l,-r*(-c*o+l*a)+a+t,0,0,1),this}scale(e,t){return this.premultiply(Go.makeScale(e,t)),this}rotate(e){return this.premultiply(Go.makeRotation(-e)),this}translate(e,t){return this.premultiply(Go.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){const t=Math.cos(e),i=Math.sin(e);return this.set(t,-i,0,i,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){const t=this.elements,i=e.elements;for(let r=0;r<9;r++)if(t[r]!==i[r])return!1;return!0}fromArray(e,t=0){for(let i=0;i<9;i++)this.elements[i]=e[i+t];return this}toArray(e=[],t=0){const i=this.elements;return e[t]=i[0],e[t+1]=i[1],e[t+2]=i[2],e[t+3]=i[3],e[t+4]=i[4],e[t+5]=i[5],e[t+6]=i[6],e[t+7]=i[7],e[t+8]=i[8],e}clone(){return new this.constructor().fromArray(this.elements)}}const Go=new je;function Ld(n){for(let e=n.length-1;e>=0;--e)if(n[e]>=65535)return!0;return!1}function oo(n){return document.createElementNS("http://www.w3.org/1999/xhtml",n)}function N_(){const n=oo("canvas");return n.style.display="block",n}const ou={};function is(n){n in ou||(ou[n]=!0,console.warn(n))}function F_(n,e,t){return new Promise(function(i,r){function s(){switch(n.clientWaitSync(e,n.SYNC_FLUSH_COMMANDS_BIT,0)){case n.WAIT_FAILED:r();break;case n.TIMEOUT_EXPIRED:setTimeout(s,t);break;default:i()}}setTimeout(s,t)})}const au=new je().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),lu=new je().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function O_(){const n={enabled:!0,workingColorSpace:xr,spaces:{},convert:function(r,s,o){return this.enabled===!1||s===o||!s||!o||(this.spaces[s].transfer===at&&(r.r=Wn(r.r),r.g=Wn(r.g),r.b=Wn(r.b)),this.spaces[s].primaries!==this.spaces[o].primaries&&(r.applyMatrix3(this.spaces[s].toXYZ),r.applyMatrix3(this.spaces[o].fromXYZ)),this.spaces[o].transfer===at&&(r.r=dr(r.r),r.g=dr(r.g),r.b=dr(r.b))),r},workingToColorSpace:function(r,s){return this.convert(r,this.workingColorSpace,s)},colorSpaceToWorking:function(r,s){return this.convert(r,s,this.workingColorSpace)},getPrimaries:function(r){return this.spaces[r].primaries},getTransfer:function(r){return r===ai?ro:this.spaces[r].transfer},getToneMappingMode:function(r){return this.spaces[r].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(r,s=this.workingColorSpace){return r.fromArray(this.spaces[s].luminanceCoefficients)},define:function(r){Object.assign(this.spaces,r)},_getMatrix:function(r,s,o){return r.copy(this.spaces[s].toXYZ).multiply(this.spaces[o].fromXYZ)},_getDrawingBufferColorSpace:function(r){return this.spaces[r].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(r=this.workingColorSpace){return this.spaces[r].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(r,s){return is("THREE.ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),n.workingToColorSpace(r,s)},toWorkingColorSpace:function(r,s){return is("THREE.ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),n.colorSpaceToWorking(r,s)}},e=[.64,.33,.3,.6,.15,.06],t=[.2126,.7152,.0722],i=[.3127,.329];return n.define({[xr]:{primaries:e,whitePoint:i,transfer:ro,toXYZ:au,fromXYZ:lu,luminanceCoefficients:t,workingColorSpaceConfig:{unpackColorSpace:sn},outputColorSpaceConfig:{drawingBufferColorSpace:sn}},[sn]:{primaries:e,whitePoint:i,transfer:at,toXYZ:au,fromXYZ:lu,luminanceCoefficients:t,outputColorSpaceConfig:{drawingBufferColorSpace:sn}}}),n}const Qe=O_();function Wn(n){return n<.04045?n*.0773993808:Math.pow(n*.9478672986+.0521327014,2.4)}function dr(n){return n<.0031308?n*12.92:1.055*Math.pow(n,.41666)-.055}let Gi;class B_{static getDataURL(e,t="image/png"){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let i;if(e instanceof HTMLCanvasElement)i=e;else{Gi===void 0&&(Gi=oo("canvas")),Gi.width=e.width,Gi.height=e.height;const r=Gi.getContext("2d");e instanceof ImageData?r.putImageData(e,0,0):r.drawImage(e,0,0,e.width,e.height),i=Gi}return i.toDataURL(t)}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){const t=oo("canvas");t.width=e.width,t.height=e.height;const i=t.getContext("2d");i.drawImage(e,0,0,e.width,e.height);const r=i.getImageData(0,0,e.width,e.height),s=r.data;for(let o=0;o<s.length;o++)s[o]=Wn(s[o]/255)*255;return i.putImageData(r,0,0),t}else if(e.data){const t=e.data.slice(0);for(let i=0;i<t.length;i++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[i]=Math.floor(Wn(t[i]/255)*255):t[i]=Wn(t[i]);return{data:t,width:e.width,height:e.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}}let k_=0;class Zl{constructor(e=null){this.isSource=!0,Object.defineProperty(this,"id",{value:k_++}),this.uuid=ls(),this.data=e,this.dataReady=!0,this.version=0}getSize(e){const t=this.data;return typeof HTMLVideoElement<"u"&&t instanceof HTMLVideoElement?e.set(t.videoWidth,t.videoHeight,0):t instanceof VideoFrame?e.set(t.displayHeight,t.displayWidth,0):t!==null?e.set(t.width,t.height,t.depth||0):e.set(0,0,0),e}set needsUpdate(e){e===!0&&this.version++}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];const i={uuid:this.uuid,url:""},r=this.data;if(r!==null){let s;if(Array.isArray(r)){s=[];for(let o=0,a=r.length;o<a;o++)r[o].isDataTexture?s.push(Wo(r[o].image)):s.push(Wo(r[o]))}else s=Wo(r);i.url=s}return t||(e.images[this.uuid]=i),i}}function Wo(n){return typeof HTMLImageElement<"u"&&n instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&n instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&n instanceof ImageBitmap?B_.getDataURL(n):n.data?{data:Array.from(n.data),width:n.width,height:n.height,type:n.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}let z_=0;const Xo=new q;class qt extends Sr{constructor(e=qt.DEFAULT_IMAGE,t=qt.DEFAULT_MAPPING,i=Di,r=Di,s=bn,o=Ii,a=mn,l=qn,c=qt.DEFAULT_ANISOTROPY,u=ai){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:z_++}),this.uuid=ls(),this.name="",this.source=new Zl(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=i,this.wrapT=r,this.magFilter=s,this.minFilter=o,this.anisotropy=c,this.format=a,this.internalFormat=null,this.type=l,this.offset=new ct(0,0),this.repeat=new ct(1,1),this.center=new ct(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new je,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=u,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(e&&e.depth&&e.depth>1),this.pmremVersion=0}get width(){return this.source.getSize(Xo).x}get height(){return this.source.getSize(Xo).y}get depth(){return this.source.getSize(Xo).z}get image(){return this.source.data}set image(e=null){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.renderTarget=e.renderTarget,this.isRenderTargetTexture=e.isRenderTargetTexture,this.isArrayTexture=e.isArrayTexture,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}setValues(e){for(const t in e){const i=e[t];if(i===void 0){console.warn(`THREE.Texture.setValues(): parameter '${t}' has value of undefined.`);continue}const r=this[t];if(r===void 0){console.warn(`THREE.Texture.setValues(): property '${t}' does not exist.`);continue}r&&i&&r.isVector2&&i.isVector2||r&&i&&r.isVector3&&i.isVector3||r&&i&&r.isMatrix3&&i.isMatrix3?r.copy(i):this[t]=i}}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];const i={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(i.userData=this.userData),t||(e.textures[this.uuid]=i),i}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==Ed)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case Ha:e.x=e.x-Math.floor(e.x);break;case Di:e.x=e.x<0?0:1;break;case Va:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case Ha:e.y=e.y-Math.floor(e.y);break;case Di:e.y=e.y<0?0:1;break;case Va:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}}qt.DEFAULT_IMAGE=null;qt.DEFAULT_MAPPING=Ed;qt.DEFAULT_ANISOTROPY=1;class St{constructor(e=0,t=0,i=0,r=1){St.prototype.isVector4=!0,this.x=e,this.y=t,this.z=i,this.w=r}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,i,r){return this.x=e,this.y=t,this.z=i,this.w=r,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){const t=this.x,i=this.y,r=this.z,s=this.w,o=e.elements;return this.x=o[0]*t+o[4]*i+o[8]*r+o[12]*s,this.y=o[1]*t+o[5]*i+o[9]*r+o[13]*s,this.z=o[2]*t+o[6]*i+o[10]*r+o[14]*s,this.w=o[3]*t+o[7]*i+o[11]*r+o[15]*s,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);const t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,i,r,s;const l=e.elements,c=l[0],u=l[4],f=l[8],d=l[1],p=l[5],v=l[9],x=l[2],m=l[6],h=l[10];if(Math.abs(u-d)<.01&&Math.abs(f-x)<.01&&Math.abs(v-m)<.01){if(Math.abs(u+d)<.1&&Math.abs(f+x)<.1&&Math.abs(v+m)<.1&&Math.abs(c+p+h-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;const T=(c+1)/2,M=(p+1)/2,C=(h+1)/2,D=(u+d)/4,R=(f+x)/4,k=(v+m)/4;return T>M&&T>C?T<.01?(i=0,r=.707106781,s=.707106781):(i=Math.sqrt(T),r=D/i,s=R/i):M>C?M<.01?(i=.707106781,r=0,s=.707106781):(r=Math.sqrt(M),i=D/r,s=k/r):C<.01?(i=.707106781,r=.707106781,s=0):(s=Math.sqrt(C),i=R/s,r=k/s),this.set(i,r,s,t),this}let w=Math.sqrt((m-v)*(m-v)+(f-x)*(f-x)+(d-u)*(d-u));return Math.abs(w)<.001&&(w=1),this.x=(m-v)/w,this.y=(f-x)/w,this.z=(d-u)/w,this.w=Math.acos((c+p+h-1)/2),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this.w=t[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=Ke(this.x,e.x,t.x),this.y=Ke(this.y,e.y,t.y),this.z=Ke(this.z,e.z,t.z),this.w=Ke(this.w,e.w,t.w),this}clampScalar(e,t){return this.x=Ke(this.x,e,t),this.y=Ke(this.y,e,t),this.z=Ke(this.z,e,t),this.w=Ke(this.w,e,t),this}clampLength(e,t){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Ke(i,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this.z=e.z+(t.z-e.z)*i,this.w=e.w+(t.w-e.w)*i,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class H_ extends Sr{constructor(e=1,t=1,i={}){super(),i=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:bn,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1},i),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=i.depth,this.scissor=new St(0,0,e,t),this.scissorTest=!1,this.viewport=new St(0,0,e,t);const r={width:e,height:t,depth:i.depth},s=new qt(r);this.textures=[];const o=i.count;for(let a=0;a<o;a++)this.textures[a]=s.clone(),this.textures[a].isRenderTargetTexture=!0,this.textures[a].renderTarget=this;this._setTextureOptions(i),this.depthBuffer=i.depthBuffer,this.stencilBuffer=i.stencilBuffer,this.resolveDepthBuffer=i.resolveDepthBuffer,this.resolveStencilBuffer=i.resolveStencilBuffer,this._depthTexture=null,this.depthTexture=i.depthTexture,this.samples=i.samples,this.multiview=i.multiview}_setTextureOptions(e={}){const t={minFilter:bn,generateMipmaps:!1,flipY:!1,internalFormat:null};e.mapping!==void 0&&(t.mapping=e.mapping),e.wrapS!==void 0&&(t.wrapS=e.wrapS),e.wrapT!==void 0&&(t.wrapT=e.wrapT),e.wrapR!==void 0&&(t.wrapR=e.wrapR),e.magFilter!==void 0&&(t.magFilter=e.magFilter),e.minFilter!==void 0&&(t.minFilter=e.minFilter),e.format!==void 0&&(t.format=e.format),e.type!==void 0&&(t.type=e.type),e.anisotropy!==void 0&&(t.anisotropy=e.anisotropy),e.colorSpace!==void 0&&(t.colorSpace=e.colorSpace),e.flipY!==void 0&&(t.flipY=e.flipY),e.generateMipmaps!==void 0&&(t.generateMipmaps=e.generateMipmaps),e.internalFormat!==void 0&&(t.internalFormat=e.internalFormat);for(let i=0;i<this.textures.length;i++)this.textures[i].setValues(t)}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}set depthTexture(e){this._depthTexture!==null&&(this._depthTexture.renderTarget=null),e!==null&&(e.renderTarget=this),this._depthTexture=e}get depthTexture(){return this._depthTexture}setSize(e,t,i=1){if(this.width!==e||this.height!==t||this.depth!==i){this.width=e,this.height=t,this.depth=i;for(let r=0,s=this.textures.length;r<s;r++)this.textures[r].image.width=e,this.textures[r].image.height=t,this.textures[r].image.depth=i,this.textures[r].isArrayTexture=this.textures[r].image.depth>1;this.dispose()}this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let t=0,i=e.textures.length;t<i;t++){this.textures[t]=e.textures[t].clone(),this.textures[t].isRenderTargetTexture=!0,this.textures[t].renderTarget=this;const r=Object.assign({},e.textures[t].image);this.textures[t].source=new Zl(r)}return this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class Fi extends H_{constructor(e=1,t=1,i={}){super(e,t,i),this.isWebGLRenderTarget=!0}}class Ud extends qt{constructor(e=null,t=1,i=1,r=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:i,depth:r},this.magFilter=_n,this.minFilter=_n,this.wrapR=Di,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}}class V_ extends qt{constructor(e=null,t=1,i=1,r=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:i,depth:r},this.magFilter=_n,this.minFilter=_n,this.wrapR=Di,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class us{constructor(e=new q(1/0,1/0,1/0),t=new q(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,i=e.length;t<i;t+=3)this.expandByPoint(un.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,i=e.count;t<i;t++)this.expandByPoint(un.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,i=e.length;t<i;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){const i=un.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(i),this.max.copy(e).add(i),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);const i=e.geometry;if(i!==void 0){const s=i.getAttribute("position");if(t===!0&&s!==void 0&&e.isInstancedMesh!==!0)for(let o=0,a=s.count;o<a;o++)e.isMesh===!0?e.getVertexPosition(o,un):un.fromBufferAttribute(s,o),un.applyMatrix4(e.matrixWorld),this.expandByPoint(un);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),_s.copy(e.boundingBox)):(i.boundingBox===null&&i.computeBoundingBox(),_s.copy(i.boundingBox)),_s.applyMatrix4(e.matrixWorld),this.union(_s)}const r=e.children;for(let s=0,o=r.length;s<o;s++)this.expandByObject(r[s],t);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,un),un.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,i;return e.normal.x>0?(t=e.normal.x*this.min.x,i=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,i=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,i+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,i+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,i+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,i+=e.normal.z*this.min.z),t<=-e.constant&&i>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(Cr),vs.subVectors(this.max,Cr),Wi.subVectors(e.a,Cr),Xi.subVectors(e.b,Cr),ji.subVectors(e.c,Cr),Zn.subVectors(Xi,Wi),Jn.subVectors(ji,Xi),yi.subVectors(Wi,ji);let t=[0,-Zn.z,Zn.y,0,-Jn.z,Jn.y,0,-yi.z,yi.y,Zn.z,0,-Zn.x,Jn.z,0,-Jn.x,yi.z,0,-yi.x,-Zn.y,Zn.x,0,-Jn.y,Jn.x,0,-yi.y,yi.x,0];return!jo(t,Wi,Xi,ji,vs)||(t=[1,0,0,0,1,0,0,0,1],!jo(t,Wi,Xi,ji,vs))?!1:(xs.crossVectors(Zn,Jn),t=[xs.x,xs.y,xs.z],jo(t,Wi,Xi,ji,vs))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,un).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(un).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(Un[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),Un[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),Un[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),Un[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),Un[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),Un[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),Un[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),Un[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(Un),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(e){return this.min.fromArray(e.min),this.max.fromArray(e.max),this}}const Un=[new q,new q,new q,new q,new q,new q,new q,new q],un=new q,_s=new us,Wi=new q,Xi=new q,ji=new q,Zn=new q,Jn=new q,yi=new q,Cr=new q,vs=new q,xs=new q,Si=new q;function jo(n,e,t,i,r){for(let s=0,o=n.length-3;s<=o;s+=3){Si.fromArray(n,s);const a=r.x*Math.abs(Si.x)+r.y*Math.abs(Si.y)+r.z*Math.abs(Si.z),l=e.dot(Si),c=t.dot(Si),u=i.dot(Si);if(Math.max(-Math.max(l,c,u),Math.min(l,c,u))>a)return!1}return!0}const G_=new us,Pr=new q,qo=new q;class Jl{constructor(e=new q,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){const i=this.center;t!==void 0?i.copy(t):G_.setFromPoints(e).getCenter(i);let r=0;for(let s=0,o=e.length;s<o;s++)r=Math.max(r,i.distanceToSquared(e[s]));return this.radius=Math.sqrt(r),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){const t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){const i=this.center.distanceToSquared(e);return t.copy(e),i>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;Pr.subVectors(e,this.center);const t=Pr.lengthSq();if(t>this.radius*this.radius){const i=Math.sqrt(t),r=(i-this.radius)*.5;this.center.addScaledVector(Pr,r/i),this.radius+=r}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(qo.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(Pr.copy(e.center).add(qo)),this.expandByPoint(Pr.copy(e.center).sub(qo))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(e){return this.radius=e.radius,this.center.fromArray(e.center),this}}const Nn=new q,Yo=new q,ys=new q,Qn=new q,$o=new q,Ss=new q,Ko=new q;class W_{constructor(e=new q,t=new q(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,Nn)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);const i=t.dot(this.direction);return i<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,i)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){const t=Nn.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(Nn.copy(this.origin).addScaledVector(this.direction,t),Nn.distanceToSquared(e))}distanceSqToSegment(e,t,i,r){Yo.copy(e).add(t).multiplyScalar(.5),ys.copy(t).sub(e).normalize(),Qn.copy(this.origin).sub(Yo);const s=e.distanceTo(t)*.5,o=-this.direction.dot(ys),a=Qn.dot(this.direction),l=-Qn.dot(ys),c=Qn.lengthSq(),u=Math.abs(1-o*o);let f,d,p,v;if(u>0)if(f=o*l-a,d=o*a-l,v=s*u,f>=0)if(d>=-v)if(d<=v){const x=1/u;f*=x,d*=x,p=f*(f+o*d+2*a)+d*(o*f+d+2*l)+c}else d=s,f=Math.max(0,-(o*d+a)),p=-f*f+d*(d+2*l)+c;else d=-s,f=Math.max(0,-(o*d+a)),p=-f*f+d*(d+2*l)+c;else d<=-v?(f=Math.max(0,-(-o*s+a)),d=f>0?-s:Math.min(Math.max(-s,-l),s),p=-f*f+d*(d+2*l)+c):d<=v?(f=0,d=Math.min(Math.max(-s,-l),s),p=d*(d+2*l)+c):(f=Math.max(0,-(o*s+a)),d=f>0?s:Math.min(Math.max(-s,-l),s),p=-f*f+d*(d+2*l)+c);else d=o>0?-s:s,f=Math.max(0,-(o*d+a)),p=-f*f+d*(d+2*l)+c;return i&&i.copy(this.origin).addScaledVector(this.direction,f),r&&r.copy(Yo).addScaledVector(ys,d),p}intersectSphere(e,t){Nn.subVectors(e.center,this.origin);const i=Nn.dot(this.direction),r=Nn.dot(Nn)-i*i,s=e.radius*e.radius;if(r>s)return null;const o=Math.sqrt(s-r),a=i-o,l=i+o;return l<0?null:a<0?this.at(l,t):this.at(a,t)}intersectsSphere(e){return e.radius<0?!1:this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){const t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;const i=-(this.origin.dot(e.normal)+e.constant)/t;return i>=0?i:null}intersectPlane(e,t){const i=this.distanceToPlane(e);return i===null?null:this.at(i,t)}intersectsPlane(e){const t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let i,r,s,o,a,l;const c=1/this.direction.x,u=1/this.direction.y,f=1/this.direction.z,d=this.origin;return c>=0?(i=(e.min.x-d.x)*c,r=(e.max.x-d.x)*c):(i=(e.max.x-d.x)*c,r=(e.min.x-d.x)*c),u>=0?(s=(e.min.y-d.y)*u,o=(e.max.y-d.y)*u):(s=(e.max.y-d.y)*u,o=(e.min.y-d.y)*u),i>o||s>r||((s>i||isNaN(i))&&(i=s),(o<r||isNaN(r))&&(r=o),f>=0?(a=(e.min.z-d.z)*f,l=(e.max.z-d.z)*f):(a=(e.max.z-d.z)*f,l=(e.min.z-d.z)*f),i>l||a>r)||((a>i||i!==i)&&(i=a),(l<r||r!==r)&&(r=l),r<0)?null:this.at(i>=0?i:r,t)}intersectsBox(e){return this.intersectBox(e,Nn)!==null}intersectTriangle(e,t,i,r,s){$o.subVectors(t,e),Ss.subVectors(i,e),Ko.crossVectors($o,Ss);let o=this.direction.dot(Ko),a;if(o>0){if(r)return null;a=1}else if(o<0)a=-1,o=-o;else return null;Qn.subVectors(this.origin,e);const l=a*this.direction.dot(Ss.crossVectors(Qn,Ss));if(l<0)return null;const c=a*this.direction.dot($o.cross(Qn));if(c<0||l+c>o)return null;const u=-a*Qn.dot(Ko);return u<0?null:this.at(u/o,s)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class At{constructor(e,t,i,r,s,o,a,l,c,u,f,d,p,v,x,m){At.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,i,r,s,o,a,l,c,u,f,d,p,v,x,m)}set(e,t,i,r,s,o,a,l,c,u,f,d,p,v,x,m){const h=this.elements;return h[0]=e,h[4]=t,h[8]=i,h[12]=r,h[1]=s,h[5]=o,h[9]=a,h[13]=l,h[2]=c,h[6]=u,h[10]=f,h[14]=d,h[3]=p,h[7]=v,h[11]=x,h[15]=m,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new At().fromArray(this.elements)}copy(e){const t=this.elements,i=e.elements;return t[0]=i[0],t[1]=i[1],t[2]=i[2],t[3]=i[3],t[4]=i[4],t[5]=i[5],t[6]=i[6],t[7]=i[7],t[8]=i[8],t[9]=i[9],t[10]=i[10],t[11]=i[11],t[12]=i[12],t[13]=i[13],t[14]=i[14],t[15]=i[15],this}copyPosition(e){const t=this.elements,i=e.elements;return t[12]=i[12],t[13]=i[13],t[14]=i[14],this}setFromMatrix3(e){const t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,i){return e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),i.setFromMatrixColumn(this,2),this}makeBasis(e,t,i){return this.set(e.x,t.x,i.x,0,e.y,t.y,i.y,0,e.z,t.z,i.z,0,0,0,0,1),this}extractRotation(e){const t=this.elements,i=e.elements,r=1/qi.setFromMatrixColumn(e,0).length(),s=1/qi.setFromMatrixColumn(e,1).length(),o=1/qi.setFromMatrixColumn(e,2).length();return t[0]=i[0]*r,t[1]=i[1]*r,t[2]=i[2]*r,t[3]=0,t[4]=i[4]*s,t[5]=i[5]*s,t[6]=i[6]*s,t[7]=0,t[8]=i[8]*o,t[9]=i[9]*o,t[10]=i[10]*o,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){const t=this.elements,i=e.x,r=e.y,s=e.z,o=Math.cos(i),a=Math.sin(i),l=Math.cos(r),c=Math.sin(r),u=Math.cos(s),f=Math.sin(s);if(e.order==="XYZ"){const d=o*u,p=o*f,v=a*u,x=a*f;t[0]=l*u,t[4]=-l*f,t[8]=c,t[1]=p+v*c,t[5]=d-x*c,t[9]=-a*l,t[2]=x-d*c,t[6]=v+p*c,t[10]=o*l}else if(e.order==="YXZ"){const d=l*u,p=l*f,v=c*u,x=c*f;t[0]=d+x*a,t[4]=v*a-p,t[8]=o*c,t[1]=o*f,t[5]=o*u,t[9]=-a,t[2]=p*a-v,t[6]=x+d*a,t[10]=o*l}else if(e.order==="ZXY"){const d=l*u,p=l*f,v=c*u,x=c*f;t[0]=d-x*a,t[4]=-o*f,t[8]=v+p*a,t[1]=p+v*a,t[5]=o*u,t[9]=x-d*a,t[2]=-o*c,t[6]=a,t[10]=o*l}else if(e.order==="ZYX"){const d=o*u,p=o*f,v=a*u,x=a*f;t[0]=l*u,t[4]=v*c-p,t[8]=d*c+x,t[1]=l*f,t[5]=x*c+d,t[9]=p*c-v,t[2]=-c,t[6]=a*l,t[10]=o*l}else if(e.order==="YZX"){const d=o*l,p=o*c,v=a*l,x=a*c;t[0]=l*u,t[4]=x-d*f,t[8]=v*f+p,t[1]=f,t[5]=o*u,t[9]=-a*u,t[2]=-c*u,t[6]=p*f+v,t[10]=d-x*f}else if(e.order==="XZY"){const d=o*l,p=o*c,v=a*l,x=a*c;t[0]=l*u,t[4]=-f,t[8]=c*u,t[1]=d*f+x,t[5]=o*u,t[9]=p*f-v,t[2]=v*f-p,t[6]=a*u,t[10]=x*f+d}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(X_,e,j_)}lookAt(e,t,i){const r=this.elements;return Kt.subVectors(e,t),Kt.lengthSq()===0&&(Kt.z=1),Kt.normalize(),ei.crossVectors(i,Kt),ei.lengthSq()===0&&(Math.abs(i.z)===1?Kt.x+=1e-4:Kt.z+=1e-4,Kt.normalize(),ei.crossVectors(i,Kt)),ei.normalize(),Ms.crossVectors(Kt,ei),r[0]=ei.x,r[4]=Ms.x,r[8]=Kt.x,r[1]=ei.y,r[5]=Ms.y,r[9]=Kt.y,r[2]=ei.z,r[6]=Ms.z,r[10]=Kt.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const i=e.elements,r=t.elements,s=this.elements,o=i[0],a=i[4],l=i[8],c=i[12],u=i[1],f=i[5],d=i[9],p=i[13],v=i[2],x=i[6],m=i[10],h=i[14],w=i[3],T=i[7],M=i[11],C=i[15],D=r[0],R=r[4],k=r[8],b=r[12],E=r[1],L=r[5],X=r[9],K=r[13],le=r[2],ie=r[6],J=r[10],Q=r[14],z=r[3],me=r[7],ve=r[11],Re=r[15];return s[0]=o*D+a*E+l*le+c*z,s[4]=o*R+a*L+l*ie+c*me,s[8]=o*k+a*X+l*J+c*ve,s[12]=o*b+a*K+l*Q+c*Re,s[1]=u*D+f*E+d*le+p*z,s[5]=u*R+f*L+d*ie+p*me,s[9]=u*k+f*X+d*J+p*ve,s[13]=u*b+f*K+d*Q+p*Re,s[2]=v*D+x*E+m*le+h*z,s[6]=v*R+x*L+m*ie+h*me,s[10]=v*k+x*X+m*J+h*ve,s[14]=v*b+x*K+m*Q+h*Re,s[3]=w*D+T*E+M*le+C*z,s[7]=w*R+T*L+M*ie+C*me,s[11]=w*k+T*X+M*J+C*ve,s[15]=w*b+T*K+M*Q+C*Re,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){const e=this.elements,t=e[0],i=e[4],r=e[8],s=e[12],o=e[1],a=e[5],l=e[9],c=e[13],u=e[2],f=e[6],d=e[10],p=e[14],v=e[3],x=e[7],m=e[11],h=e[15];return v*(+s*l*f-r*c*f-s*a*d+i*c*d+r*a*p-i*l*p)+x*(+t*l*p-t*c*d+s*o*d-r*o*p+r*c*u-s*l*u)+m*(+t*c*f-t*a*p-s*o*f+i*o*p+s*a*u-i*c*u)+h*(-r*a*u-t*l*f+t*a*d+r*o*f-i*o*d+i*l*u)}transpose(){const e=this.elements;let t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,i){const r=this.elements;return e.isVector3?(r[12]=e.x,r[13]=e.y,r[14]=e.z):(r[12]=e,r[13]=t,r[14]=i),this}invert(){const e=this.elements,t=e[0],i=e[1],r=e[2],s=e[3],o=e[4],a=e[5],l=e[6],c=e[7],u=e[8],f=e[9],d=e[10],p=e[11],v=e[12],x=e[13],m=e[14],h=e[15],w=f*m*c-x*d*c+x*l*p-a*m*p-f*l*h+a*d*h,T=v*d*c-u*m*c-v*l*p+o*m*p+u*l*h-o*d*h,M=u*x*c-v*f*c+v*a*p-o*x*p-u*a*h+o*f*h,C=v*f*l-u*x*l-v*a*d+o*x*d+u*a*m-o*f*m,D=t*w+i*T+r*M+s*C;if(D===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const R=1/D;return e[0]=w*R,e[1]=(x*d*s-f*m*s-x*r*p+i*m*p+f*r*h-i*d*h)*R,e[2]=(a*m*s-x*l*s+x*r*c-i*m*c-a*r*h+i*l*h)*R,e[3]=(f*l*s-a*d*s-f*r*c+i*d*c+a*r*p-i*l*p)*R,e[4]=T*R,e[5]=(u*m*s-v*d*s+v*r*p-t*m*p-u*r*h+t*d*h)*R,e[6]=(v*l*s-o*m*s-v*r*c+t*m*c+o*r*h-t*l*h)*R,e[7]=(o*d*s-u*l*s+u*r*c-t*d*c-o*r*p+t*l*p)*R,e[8]=M*R,e[9]=(v*f*s-u*x*s-v*i*p+t*x*p+u*i*h-t*f*h)*R,e[10]=(o*x*s-v*a*s+v*i*c-t*x*c-o*i*h+t*a*h)*R,e[11]=(u*a*s-o*f*s-u*i*c+t*f*c+o*i*p-t*a*p)*R,e[12]=C*R,e[13]=(u*x*r-v*f*r+v*i*d-t*x*d-u*i*m+t*f*m)*R,e[14]=(v*a*r-o*x*r-v*i*l+t*x*l+o*i*m-t*a*m)*R,e[15]=(o*f*r-u*a*r+u*i*l-t*f*l-o*i*d+t*a*d)*R,this}scale(e){const t=this.elements,i=e.x,r=e.y,s=e.z;return t[0]*=i,t[4]*=r,t[8]*=s,t[1]*=i,t[5]*=r,t[9]*=s,t[2]*=i,t[6]*=r,t[10]*=s,t[3]*=i,t[7]*=r,t[11]*=s,this}getMaxScaleOnAxis(){const e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],i=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],r=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,i,r))}makeTranslation(e,t,i){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,i,0,0,0,1),this}makeRotationX(e){const t=Math.cos(e),i=Math.sin(e);return this.set(1,0,0,0,0,t,-i,0,0,i,t,0,0,0,0,1),this}makeRotationY(e){const t=Math.cos(e),i=Math.sin(e);return this.set(t,0,i,0,0,1,0,0,-i,0,t,0,0,0,0,1),this}makeRotationZ(e){const t=Math.cos(e),i=Math.sin(e);return this.set(t,-i,0,0,i,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){const i=Math.cos(t),r=Math.sin(t),s=1-i,o=e.x,a=e.y,l=e.z,c=s*o,u=s*a;return this.set(c*o+i,c*a-r*l,c*l+r*a,0,c*a+r*l,u*a+i,u*l-r*o,0,c*l-r*a,u*l+r*o,s*l*l+i,0,0,0,0,1),this}makeScale(e,t,i){return this.set(e,0,0,0,0,t,0,0,0,0,i,0,0,0,0,1),this}makeShear(e,t,i,r,s,o){return this.set(1,i,s,0,e,1,o,0,t,r,1,0,0,0,0,1),this}compose(e,t,i){const r=this.elements,s=t._x,o=t._y,a=t._z,l=t._w,c=s+s,u=o+o,f=a+a,d=s*c,p=s*u,v=s*f,x=o*u,m=o*f,h=a*f,w=l*c,T=l*u,M=l*f,C=i.x,D=i.y,R=i.z;return r[0]=(1-(x+h))*C,r[1]=(p+M)*C,r[2]=(v-T)*C,r[3]=0,r[4]=(p-M)*D,r[5]=(1-(d+h))*D,r[6]=(m+w)*D,r[7]=0,r[8]=(v+T)*R,r[9]=(m-w)*R,r[10]=(1-(d+x))*R,r[11]=0,r[12]=e.x,r[13]=e.y,r[14]=e.z,r[15]=1,this}decompose(e,t,i){const r=this.elements;let s=qi.set(r[0],r[1],r[2]).length();const o=qi.set(r[4],r[5],r[6]).length(),a=qi.set(r[8],r[9],r[10]).length();this.determinant()<0&&(s=-s),e.x=r[12],e.y=r[13],e.z=r[14],fn.copy(this);const c=1/s,u=1/o,f=1/a;return fn.elements[0]*=c,fn.elements[1]*=c,fn.elements[2]*=c,fn.elements[4]*=u,fn.elements[5]*=u,fn.elements[6]*=u,fn.elements[8]*=f,fn.elements[9]*=f,fn.elements[10]*=f,t.setFromRotationMatrix(fn),i.x=s,i.y=o,i.z=a,this}makePerspective(e,t,i,r,s,o,a=Tn,l=!1){const c=this.elements,u=2*s/(t-e),f=2*s/(i-r),d=(t+e)/(t-e),p=(i+r)/(i-r);let v,x;if(l)v=s/(o-s),x=o*s/(o-s);else if(a===Tn)v=-(o+s)/(o-s),x=-2*o*s/(o-s);else if(a===so)v=-o/(o-s),x=-o*s/(o-s);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+a);return c[0]=u,c[4]=0,c[8]=d,c[12]=0,c[1]=0,c[5]=f,c[9]=p,c[13]=0,c[2]=0,c[6]=0,c[10]=v,c[14]=x,c[3]=0,c[7]=0,c[11]=-1,c[15]=0,this}makeOrthographic(e,t,i,r,s,o,a=Tn,l=!1){const c=this.elements,u=2/(t-e),f=2/(i-r),d=-(t+e)/(t-e),p=-(i+r)/(i-r);let v,x;if(l)v=1/(o-s),x=o/(o-s);else if(a===Tn)v=-2/(o-s),x=-(o+s)/(o-s);else if(a===so)v=-1/(o-s),x=-s/(o-s);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+a);return c[0]=u,c[4]=0,c[8]=0,c[12]=d,c[1]=0,c[5]=f,c[9]=0,c[13]=p,c[2]=0,c[6]=0,c[10]=v,c[14]=x,c[3]=0,c[7]=0,c[11]=0,c[15]=1,this}equals(e){const t=this.elements,i=e.elements;for(let r=0;r<16;r++)if(t[r]!==i[r])return!1;return!0}fromArray(e,t=0){for(let i=0;i<16;i++)this.elements[i]=e[i+t];return this}toArray(e=[],t=0){const i=this.elements;return e[t]=i[0],e[t+1]=i[1],e[t+2]=i[2],e[t+3]=i[3],e[t+4]=i[4],e[t+5]=i[5],e[t+6]=i[6],e[t+7]=i[7],e[t+8]=i[8],e[t+9]=i[9],e[t+10]=i[10],e[t+11]=i[11],e[t+12]=i[12],e[t+13]=i[13],e[t+14]=i[14],e[t+15]=i[15],e}}const qi=new q,fn=new At,X_=new q(0,0,0),j_=new q(1,1,1),ei=new q,Ms=new q,Kt=new q,cu=new At,uu=new cs;class Yn{constructor(e=0,t=0,i=0,r=Yn.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=i,this._order=r}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,i,r=this._order){return this._x=e,this._y=t,this._z=i,this._order=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,i=!0){const r=e.elements,s=r[0],o=r[4],a=r[8],l=r[1],c=r[5],u=r[9],f=r[2],d=r[6],p=r[10];switch(t){case"XYZ":this._y=Math.asin(Ke(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(-u,p),this._z=Math.atan2(-o,s)):(this._x=Math.atan2(d,c),this._z=0);break;case"YXZ":this._x=Math.asin(-Ke(u,-1,1)),Math.abs(u)<.9999999?(this._y=Math.atan2(a,p),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-f,s),this._z=0);break;case"ZXY":this._x=Math.asin(Ke(d,-1,1)),Math.abs(d)<.9999999?(this._y=Math.atan2(-f,p),this._z=Math.atan2(-o,c)):(this._y=0,this._z=Math.atan2(l,s));break;case"ZYX":this._y=Math.asin(-Ke(f,-1,1)),Math.abs(f)<.9999999?(this._x=Math.atan2(d,p),this._z=Math.atan2(l,s)):(this._x=0,this._z=Math.atan2(-o,c));break;case"YZX":this._z=Math.asin(Ke(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-u,c),this._y=Math.atan2(-f,s)):(this._x=0,this._y=Math.atan2(a,p));break;case"XZY":this._z=Math.asin(-Ke(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(d,c),this._y=Math.atan2(a,s)):(this._x=Math.atan2(-u,p),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,i===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,i){return cu.makeRotationFromQuaternion(e),this.setFromRotationMatrix(cu,t,i)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return uu.setFromEuler(this),this.setFromQuaternion(uu,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}Yn.DEFAULT_ORDER="XYZ";class Nd{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}}let q_=0;const fu=new q,Yi=new cs,Fn=new At,Es=new q,Dr=new q,Y_=new q,$_=new cs,du=new q(1,0,0),hu=new q(0,1,0),pu=new q(0,0,1),mu={type:"added"},K_={type:"removed"},$i={type:"childadded",child:null},Zo={type:"childremoved",child:null};class en extends Sr{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:q_++}),this.uuid=ls(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=en.DEFAULT_UP.clone();const e=new q,t=new Yn,i=new cs,r=new q(1,1,1);function s(){i.setFromEuler(t,!1)}function o(){t.setFromQuaternion(i,void 0,!1)}t._onChange(s),i._onChange(o),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:i},scale:{configurable:!0,enumerable:!0,value:r},modelViewMatrix:{value:new At},normalMatrix:{value:new je}}),this.matrix=new At,this.matrixWorld=new At,this.matrixAutoUpdate=en.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=en.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new Nd,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return Yi.setFromAxisAngle(e,t),this.quaternion.multiply(Yi),this}rotateOnWorldAxis(e,t){return Yi.setFromAxisAngle(e,t),this.quaternion.premultiply(Yi),this}rotateX(e){return this.rotateOnAxis(du,e)}rotateY(e){return this.rotateOnAxis(hu,e)}rotateZ(e){return this.rotateOnAxis(pu,e)}translateOnAxis(e,t){return fu.copy(e).applyQuaternion(this.quaternion),this.position.add(fu.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(du,e)}translateY(e){return this.translateOnAxis(hu,e)}translateZ(e){return this.translateOnAxis(pu,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(Fn.copy(this.matrixWorld).invert())}lookAt(e,t,i){e.isVector3?Es.copy(e):Es.set(e,t,i);const r=this.parent;this.updateWorldMatrix(!0,!1),Dr.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?Fn.lookAt(Dr,Es,this.up):Fn.lookAt(Es,Dr,this.up),this.quaternion.setFromRotationMatrix(Fn),r&&(Fn.extractRotation(r.matrixWorld),Yi.setFromRotationMatrix(Fn),this.quaternion.premultiply(Yi.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(mu),$i.child=e,this.dispatchEvent($i),$i.child=null):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let i=0;i<arguments.length;i++)this.remove(arguments[i]);return this}const t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(K_),Zo.child=e,this.dispatchEvent(Zo),Zo.child=null),this}removeFromParent(){const e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),Fn.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),Fn.multiply(e.parent.matrixWorld)),e.applyMatrix4(Fn),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(mu),$i.child=e,this.dispatchEvent($i),$i.child=null,this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let i=0,r=this.children.length;i<r;i++){const o=this.children[i].getObjectByProperty(e,t);if(o!==void 0)return o}}getObjectsByProperty(e,t,i=[]){this[e]===t&&i.push(this);const r=this.children;for(let s=0,o=r.length;s<o;s++)r[s].getObjectsByProperty(e,t,i);return i}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Dr,e,Y_),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Dr,$_,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);const t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}traverse(e){e(this);const t=this.children;for(let i=0,r=t.length;i<r;i++)t[i].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);const t=this.children;for(let i=0,r=t.length;i<r;i++)t[i].traverseVisible(e)}traverseAncestors(e){const t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);const t=this.children;for(let i=0,r=t.length;i<r;i++)t[i].updateMatrixWorld(e)}updateWorldMatrix(e,t){const i=this.parent;if(e===!0&&i!==null&&i.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),t===!0){const r=this.children;for(let s=0,o=r.length;s<o;s++)r[s].updateWorldMatrix(!1,!0)}}toJSON(e){const t=e===void 0||typeof e=="string",i={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},i.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});const r={};r.uuid=this.uuid,r.type=this.type,this.name!==""&&(r.name=this.name),this.castShadow===!0&&(r.castShadow=!0),this.receiveShadow===!0&&(r.receiveShadow=!0),this.visible===!1&&(r.visible=!1),this.frustumCulled===!1&&(r.frustumCulled=!1),this.renderOrder!==0&&(r.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(r.userData=this.userData),r.layers=this.layers.mask,r.matrix=this.matrix.toArray(),r.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(r.matrixAutoUpdate=!1),this.isInstancedMesh&&(r.type="InstancedMesh",r.count=this.count,r.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(r.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(r.type="BatchedMesh",r.perObjectFrustumCulled=this.perObjectFrustumCulled,r.sortObjects=this.sortObjects,r.drawRanges=this._drawRanges,r.reservedRanges=this._reservedRanges,r.geometryInfo=this._geometryInfo.map(a=>({...a,boundingBox:a.boundingBox?a.boundingBox.toJSON():void 0,boundingSphere:a.boundingSphere?a.boundingSphere.toJSON():void 0})),r.instanceInfo=this._instanceInfo.map(a=>({...a})),r.availableInstanceIds=this._availableInstanceIds.slice(),r.availableGeometryIds=this._availableGeometryIds.slice(),r.nextIndexStart=this._nextIndexStart,r.nextVertexStart=this._nextVertexStart,r.geometryCount=this._geometryCount,r.maxInstanceCount=this._maxInstanceCount,r.maxVertexCount=this._maxVertexCount,r.maxIndexCount=this._maxIndexCount,r.geometryInitialized=this._geometryInitialized,r.matricesTexture=this._matricesTexture.toJSON(e),r.indirectTexture=this._indirectTexture.toJSON(e),this._colorsTexture!==null&&(r.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(r.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(r.boundingBox=this.boundingBox.toJSON()));function s(a,l){return a[l.uuid]===void 0&&(a[l.uuid]=l.toJSON(e)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?r.background=this.background.toJSON():this.background.isTexture&&(r.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(r.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){r.geometry=s(e.geometries,this.geometry);const a=this.geometry.parameters;if(a!==void 0&&a.shapes!==void 0){const l=a.shapes;if(Array.isArray(l))for(let c=0,u=l.length;c<u;c++){const f=l[c];s(e.shapes,f)}else s(e.shapes,l)}}if(this.isSkinnedMesh&&(r.bindMode=this.bindMode,r.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(s(e.skeletons,this.skeleton),r.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const a=[];for(let l=0,c=this.material.length;l<c;l++)a.push(s(e.materials,this.material[l]));r.material=a}else r.material=s(e.materials,this.material);if(this.children.length>0){r.children=[];for(let a=0;a<this.children.length;a++)r.children.push(this.children[a].toJSON(e).object)}if(this.animations.length>0){r.animations=[];for(let a=0;a<this.animations.length;a++){const l=this.animations[a];r.animations.push(s(e.animations,l))}}if(t){const a=o(e.geometries),l=o(e.materials),c=o(e.textures),u=o(e.images),f=o(e.shapes),d=o(e.skeletons),p=o(e.animations),v=o(e.nodes);a.length>0&&(i.geometries=a),l.length>0&&(i.materials=l),c.length>0&&(i.textures=c),u.length>0&&(i.images=u),f.length>0&&(i.shapes=f),d.length>0&&(i.skeletons=d),p.length>0&&(i.animations=p),v.length>0&&(i.nodes=v)}return i.object=r,i;function o(a){const l=[];for(const c in a){const u=a[c];delete u.metadata,l.push(u)}return l}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let i=0;i<e.children.length;i++){const r=e.children[i];this.add(r.clone())}return this}}en.DEFAULT_UP=new q(0,1,0);en.DEFAULT_MATRIX_AUTO_UPDATE=!0;en.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;const dn=new q,On=new q,Jo=new q,Bn=new q,Ki=new q,Zi=new q,gu=new q,Qo=new q,ea=new q,ta=new q,na=new St,ia=new St,ra=new St;class hn{constructor(e=new q,t=new q,i=new q){this.a=e,this.b=t,this.c=i}static getNormal(e,t,i,r){r.subVectors(i,t),dn.subVectors(e,t),r.cross(dn);const s=r.lengthSq();return s>0?r.multiplyScalar(1/Math.sqrt(s)):r.set(0,0,0)}static getBarycoord(e,t,i,r,s){dn.subVectors(r,t),On.subVectors(i,t),Jo.subVectors(e,t);const o=dn.dot(dn),a=dn.dot(On),l=dn.dot(Jo),c=On.dot(On),u=On.dot(Jo),f=o*c-a*a;if(f===0)return s.set(0,0,0),null;const d=1/f,p=(c*l-a*u)*d,v=(o*u-a*l)*d;return s.set(1-p-v,v,p)}static containsPoint(e,t,i,r){return this.getBarycoord(e,t,i,r,Bn)===null?!1:Bn.x>=0&&Bn.y>=0&&Bn.x+Bn.y<=1}static getInterpolation(e,t,i,r,s,o,a,l){return this.getBarycoord(e,t,i,r,Bn)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(s,Bn.x),l.addScaledVector(o,Bn.y),l.addScaledVector(a,Bn.z),l)}static getInterpolatedAttribute(e,t,i,r,s,o){return na.setScalar(0),ia.setScalar(0),ra.setScalar(0),na.fromBufferAttribute(e,t),ia.fromBufferAttribute(e,i),ra.fromBufferAttribute(e,r),o.setScalar(0),o.addScaledVector(na,s.x),o.addScaledVector(ia,s.y),o.addScaledVector(ra,s.z),o}static isFrontFacing(e,t,i,r){return dn.subVectors(i,t),On.subVectors(e,t),dn.cross(On).dot(r)<0}set(e,t,i){return this.a.copy(e),this.b.copy(t),this.c.copy(i),this}setFromPointsAndIndices(e,t,i,r){return this.a.copy(e[t]),this.b.copy(e[i]),this.c.copy(e[r]),this}setFromAttributeAndIndices(e,t,i,r){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,i),this.c.fromBufferAttribute(e,r),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return dn.subVectors(this.c,this.b),On.subVectors(this.a,this.b),dn.cross(On).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return hn.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return hn.getBarycoord(e,this.a,this.b,this.c,t)}getInterpolation(e,t,i,r,s){return hn.getInterpolation(e,this.a,this.b,this.c,t,i,r,s)}containsPoint(e){return hn.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return hn.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){const i=this.a,r=this.b,s=this.c;let o,a;Ki.subVectors(r,i),Zi.subVectors(s,i),Qo.subVectors(e,i);const l=Ki.dot(Qo),c=Zi.dot(Qo);if(l<=0&&c<=0)return t.copy(i);ea.subVectors(e,r);const u=Ki.dot(ea),f=Zi.dot(ea);if(u>=0&&f<=u)return t.copy(r);const d=l*f-u*c;if(d<=0&&l>=0&&u<=0)return o=l/(l-u),t.copy(i).addScaledVector(Ki,o);ta.subVectors(e,s);const p=Ki.dot(ta),v=Zi.dot(ta);if(v>=0&&p<=v)return t.copy(s);const x=p*c-l*v;if(x<=0&&c>=0&&v<=0)return a=c/(c-v),t.copy(i).addScaledVector(Zi,a);const m=u*v-p*f;if(m<=0&&f-u>=0&&p-v>=0)return gu.subVectors(s,r),a=(f-u)/(f-u+(p-v)),t.copy(r).addScaledVector(gu,a);const h=1/(m+x+d);return o=x*h,a=d*h,t.copy(i).addScaledVector(Ki,o).addScaledVector(Zi,a)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}}const Fd={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},ti={h:0,s:0,l:0},bs={h:0,s:0,l:0};function sa(n,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?n+(e-n)*6*t:t<1/2?e:t<2/3?n+(e-n)*6*(2/3-t):n}class lt{constructor(e,t,i){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,i)}set(e,t,i){if(t===void 0&&i===void 0){const r=e;r&&r.isColor?this.copy(r):typeof r=="number"?this.setHex(r):typeof r=="string"&&this.setStyle(r)}else this.setRGB(e,t,i);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=sn){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,Qe.colorSpaceToWorking(this,t),this}setRGB(e,t,i,r=Qe.workingColorSpace){return this.r=e,this.g=t,this.b=i,Qe.colorSpaceToWorking(this,r),this}setHSL(e,t,i,r=Qe.workingColorSpace){if(e=U_(e,1),t=Ke(t,0,1),i=Ke(i,0,1),t===0)this.r=this.g=this.b=i;else{const s=i<=.5?i*(1+t):i+t-i*t,o=2*i-s;this.r=sa(o,s,e+1/3),this.g=sa(o,s,e),this.b=sa(o,s,e-1/3)}return Qe.colorSpaceToWorking(this,r),this}setStyle(e,t=sn){function i(s){s!==void 0&&parseFloat(s)<1&&console.warn("THREE.Color: Alpha component of "+e+" will be ignored.")}let r;if(r=/^(\w+)\(([^\)]*)\)/.exec(e)){let s;const o=r[1],a=r[2];switch(o){case"rgb":case"rgba":if(s=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return i(s[4]),this.setRGB(Math.min(255,parseInt(s[1],10))/255,Math.min(255,parseInt(s[2],10))/255,Math.min(255,parseInt(s[3],10))/255,t);if(s=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return i(s[4]),this.setRGB(Math.min(100,parseInt(s[1],10))/100,Math.min(100,parseInt(s[2],10))/100,Math.min(100,parseInt(s[3],10))/100,t);break;case"hsl":case"hsla":if(s=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return i(s[4]),this.setHSL(parseFloat(s[1])/360,parseFloat(s[2])/100,parseFloat(s[3])/100,t);break;default:console.warn("THREE.Color: Unknown color model "+e)}}else if(r=/^\#([A-Fa-f\d]+)$/.exec(e)){const s=r[1],o=s.length;if(o===3)return this.setRGB(parseInt(s.charAt(0),16)/15,parseInt(s.charAt(1),16)/15,parseInt(s.charAt(2),16)/15,t);if(o===6)return this.setHex(parseInt(s,16),t);console.warn("THREE.Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=sn){const i=Fd[e.toLowerCase()];return i!==void 0?this.setHex(i,t):console.warn("THREE.Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=Wn(e.r),this.g=Wn(e.g),this.b=Wn(e.b),this}copyLinearToSRGB(e){return this.r=dr(e.r),this.g=dr(e.g),this.b=dr(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=sn){return Qe.workingToColorSpace(It.copy(this),e),Math.round(Ke(It.r*255,0,255))*65536+Math.round(Ke(It.g*255,0,255))*256+Math.round(Ke(It.b*255,0,255))}getHexString(e=sn){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=Qe.workingColorSpace){Qe.workingToColorSpace(It.copy(this),t);const i=It.r,r=It.g,s=It.b,o=Math.max(i,r,s),a=Math.min(i,r,s);let l,c;const u=(a+o)/2;if(a===o)l=0,c=0;else{const f=o-a;switch(c=u<=.5?f/(o+a):f/(2-o-a),o){case i:l=(r-s)/f+(r<s?6:0);break;case r:l=(s-i)/f+2;break;case s:l=(i-r)/f+4;break}l/=6}return e.h=l,e.s=c,e.l=u,e}getRGB(e,t=Qe.workingColorSpace){return Qe.workingToColorSpace(It.copy(this),t),e.r=It.r,e.g=It.g,e.b=It.b,e}getStyle(e=sn){Qe.workingToColorSpace(It.copy(this),e);const t=It.r,i=It.g,r=It.b;return e!==sn?`color(${e} ${t.toFixed(3)} ${i.toFixed(3)} ${r.toFixed(3)})`:`rgb(${Math.round(t*255)},${Math.round(i*255)},${Math.round(r*255)})`}offsetHSL(e,t,i){return this.getHSL(ti),this.setHSL(ti.h+e,ti.s+t,ti.l+i)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,i){return this.r=e.r+(t.r-e.r)*i,this.g=e.g+(t.g-e.g)*i,this.b=e.b+(t.b-e.b)*i,this}lerpHSL(e,t){this.getHSL(ti),e.getHSL(bs);const i=Ho(ti.h,bs.h,t),r=Ho(ti.s,bs.s,t),s=Ho(ti.l,bs.l,t);return this.setHSL(i,r,s),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){const t=this.r,i=this.g,r=this.b,s=e.elements;return this.r=s[0]*t+s[3]*i+s[6]*r,this.g=s[1]*t+s[4]*i+s[7]*r,this.b=s[2]*t+s[5]*i+s[8]*r,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const It=new lt;lt.NAMES=Fd;let Z_=0;class So extends Sr{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:Z_++}),this.uuid=ls(),this.name="",this.type="Material",this.blending=fr,this.side=hi,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=Pa,this.blendDst=Da,this.blendEquation=Ci,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new lt(0,0,0),this.blendAlpha=0,this.depthFunc=gr,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=nu,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=Vi,this.stencilZFail=Vi,this.stencilZPass=Vi,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(const t in e){const i=e[t];if(i===void 0){console.warn(`THREE.Material: parameter '${t}' has value of undefined.`);continue}const r=this[t];if(r===void 0){console.warn(`THREE.Material: '${t}' is not a property of THREE.${this.type}.`);continue}r&&r.isColor?r.set(i):r&&r.isVector3&&i&&i.isVector3?r.copy(i):this[t]=i}}toJSON(e){const t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});const i={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};i.uuid=this.uuid,i.type=this.type,this.name!==""&&(i.name=this.name),this.color&&this.color.isColor&&(i.color=this.color.getHex()),this.roughness!==void 0&&(i.roughness=this.roughness),this.metalness!==void 0&&(i.metalness=this.metalness),this.sheen!==void 0&&(i.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(i.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(i.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(i.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(i.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(i.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(i.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(i.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(i.shininess=this.shininess),this.clearcoat!==void 0&&(i.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(i.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(i.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(i.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(i.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,i.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(i.sheenColorMap=this.sheenColorMap.toJSON(e).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(i.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(e).uuid),this.dispersion!==void 0&&(i.dispersion=this.dispersion),this.iridescence!==void 0&&(i.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(i.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(i.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(i.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(i.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(i.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(i.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(i.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(i.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(i.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(i.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(i.lightMap=this.lightMap.toJSON(e).uuid,i.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(i.aoMap=this.aoMap.toJSON(e).uuid,i.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(i.bumpMap=this.bumpMap.toJSON(e).uuid,i.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(i.normalMap=this.normalMap.toJSON(e).uuid,i.normalMapType=this.normalMapType,i.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(i.displacementMap=this.displacementMap.toJSON(e).uuid,i.displacementScale=this.displacementScale,i.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(i.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(i.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(i.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(i.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(i.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(i.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(i.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(i.combine=this.combine)),this.envMapRotation!==void 0&&(i.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(i.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(i.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(i.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(i.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(i.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(i.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(i.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(i.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(i.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(i.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(i.size=this.size),this.shadowSide!==null&&(i.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(i.sizeAttenuation=this.sizeAttenuation),this.blending!==fr&&(i.blending=this.blending),this.side!==hi&&(i.side=this.side),this.vertexColors===!0&&(i.vertexColors=!0),this.opacity<1&&(i.opacity=this.opacity),this.transparent===!0&&(i.transparent=!0),this.blendSrc!==Pa&&(i.blendSrc=this.blendSrc),this.blendDst!==Da&&(i.blendDst=this.blendDst),this.blendEquation!==Ci&&(i.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(i.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(i.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(i.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(i.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(i.blendAlpha=this.blendAlpha),this.depthFunc!==gr&&(i.depthFunc=this.depthFunc),this.depthTest===!1&&(i.depthTest=this.depthTest),this.depthWrite===!1&&(i.depthWrite=this.depthWrite),this.colorWrite===!1&&(i.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(i.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==nu&&(i.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(i.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(i.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==Vi&&(i.stencilFail=this.stencilFail),this.stencilZFail!==Vi&&(i.stencilZFail=this.stencilZFail),this.stencilZPass!==Vi&&(i.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(i.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(i.rotation=this.rotation),this.polygonOffset===!0&&(i.polygonOffset=!0),this.polygonOffsetFactor!==0&&(i.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(i.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(i.linewidth=this.linewidth),this.dashSize!==void 0&&(i.dashSize=this.dashSize),this.gapSize!==void 0&&(i.gapSize=this.gapSize),this.scale!==void 0&&(i.scale=this.scale),this.dithering===!0&&(i.dithering=!0),this.alphaTest>0&&(i.alphaTest=this.alphaTest),this.alphaHash===!0&&(i.alphaHash=!0),this.alphaToCoverage===!0&&(i.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(i.premultipliedAlpha=!0),this.forceSinglePass===!0&&(i.forceSinglePass=!0),this.wireframe===!0&&(i.wireframe=!0),this.wireframeLinewidth>1&&(i.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(i.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(i.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(i.flatShading=!0),this.visible===!1&&(i.visible=!1),this.toneMapped===!1&&(i.toneMapped=!1),this.fog===!1&&(i.fog=!1),Object.keys(this.userData).length>0&&(i.userData=this.userData);function r(s){const o=[];for(const a in s){const l=s[a];delete l.metadata,o.push(l)}return o}if(t){const s=r(e.textures),o=r(e.images);s.length>0&&(i.textures=s),o.length>0&&(i.images=o)}return i}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;const t=e.clippingPlanes;let i=null;if(t!==null){const r=t.length;i=new Array(r);for(let s=0;s!==r;++s)i[s]=t[s].clone()}return this.clippingPlanes=i,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}}class Ql extends So{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new lt(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Yn,this.combine=Md,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}}const Mt=new q,Ts=new ct;let J_=0;class Cn{constructor(e,t,i=!1){if(Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:J_++}),this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=i,this.usage=iu,this.updateRanges=[],this.gpuType=Gn,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,i){e*=this.itemSize,i*=t.itemSize;for(let r=0,s=this.itemSize;r<s;r++)this.array[e+r]=t.array[i+r];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,i=this.count;t<i;t++)Ts.fromBufferAttribute(this,t),Ts.applyMatrix3(e),this.setXY(t,Ts.x,Ts.y);else if(this.itemSize===3)for(let t=0,i=this.count;t<i;t++)Mt.fromBufferAttribute(this,t),Mt.applyMatrix3(e),this.setXYZ(t,Mt.x,Mt.y,Mt.z);return this}applyMatrix4(e){for(let t=0,i=this.count;t<i;t++)Mt.fromBufferAttribute(this,t),Mt.applyMatrix4(e),this.setXYZ(t,Mt.x,Mt.y,Mt.z);return this}applyNormalMatrix(e){for(let t=0,i=this.count;t<i;t++)Mt.fromBufferAttribute(this,t),Mt.applyNormalMatrix(e),this.setXYZ(t,Mt.x,Mt.y,Mt.z);return this}transformDirection(e){for(let t=0,i=this.count;t<i;t++)Mt.fromBufferAttribute(this,t),Mt.transformDirection(e),this.setXYZ(t,Mt.x,Mt.y,Mt.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let i=this.array[e*this.itemSize+t];return this.normalized&&(i=Rr(i,this.array)),i}setComponent(e,t,i){return this.normalized&&(i=Vt(i,this.array)),this.array[e*this.itemSize+t]=i,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=Rr(t,this.array)),t}setX(e,t){return this.normalized&&(t=Vt(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=Rr(t,this.array)),t}setY(e,t){return this.normalized&&(t=Vt(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=Rr(t,this.array)),t}setZ(e,t){return this.normalized&&(t=Vt(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=Rr(t,this.array)),t}setW(e,t){return this.normalized&&(t=Vt(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,i){return e*=this.itemSize,this.normalized&&(t=Vt(t,this.array),i=Vt(i,this.array)),this.array[e+0]=t,this.array[e+1]=i,this}setXYZ(e,t,i,r){return e*=this.itemSize,this.normalized&&(t=Vt(t,this.array),i=Vt(i,this.array),r=Vt(r,this.array)),this.array[e+0]=t,this.array[e+1]=i,this.array[e+2]=r,this}setXYZW(e,t,i,r,s){return e*=this.itemSize,this.normalized&&(t=Vt(t,this.array),i=Vt(i,this.array),r=Vt(r,this.array),s=Vt(s,this.array)),this.array[e+0]=t,this.array[e+1]=i,this.array[e+2]=r,this.array[e+3]=s,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(e.name=this.name),this.usage!==iu&&(e.usage=this.usage),e}}class Od extends Cn{constructor(e,t,i){super(new Uint16Array(e),t,i)}}class Bd extends Cn{constructor(e,t,i){super(new Uint32Array(e),t,i)}}class Ui extends Cn{constructor(e,t,i){super(new Float32Array(e),t,i)}}let Q_=0;const rn=new At,oa=new en,Ji=new q,Zt=new us,Ir=new us,Ct=new q;class ki extends Sr{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:Q_++}),this.uuid=ls(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(Ld(e)?Bd:Od)(e,1):this.index=e,this}setIndirect(e){return this.indirect=e,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,i=0){this.groups.push({start:e,count:t,materialIndex:i})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){const t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);const i=this.attributes.normal;if(i!==void 0){const s=new je().getNormalMatrix(e);i.applyNormalMatrix(s),i.needsUpdate=!0}const r=this.attributes.tangent;return r!==void 0&&(r.transformDirection(e),r.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(e){return rn.makeRotationFromQuaternion(e),this.applyMatrix4(rn),this}rotateX(e){return rn.makeRotationX(e),this.applyMatrix4(rn),this}rotateY(e){return rn.makeRotationY(e),this.applyMatrix4(rn),this}rotateZ(e){return rn.makeRotationZ(e),this.applyMatrix4(rn),this}translate(e,t,i){return rn.makeTranslation(e,t,i),this.applyMatrix4(rn),this}scale(e,t,i){return rn.makeScale(e,t,i),this.applyMatrix4(rn),this}lookAt(e){return oa.lookAt(e),oa.updateMatrix(),this.applyMatrix4(oa.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Ji).negate(),this.translate(Ji.x,Ji.y,Ji.z),this}setFromPoints(e){const t=this.getAttribute("position");if(t===void 0){const i=[];for(let r=0,s=e.length;r<s;r++){const o=e[r];i.push(o.x,o.y,o.z||0)}this.setAttribute("position",new Ui(i,3))}else{const i=Math.min(e.length,t.count);for(let r=0;r<i;r++){const s=e[r];t.setXYZ(r,s.x,s.y,s.z||0)}e.length>t.count&&console.warn("THREE.BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),t.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new us);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new q(-1/0,-1/0,-1/0),new q(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let i=0,r=t.length;i<r;i++){const s=t[i];Zt.setFromBufferAttribute(s),this.morphTargetsRelative?(Ct.addVectors(this.boundingBox.min,Zt.min),this.boundingBox.expandByPoint(Ct),Ct.addVectors(this.boundingBox.max,Zt.max),this.boundingBox.expandByPoint(Ct)):(this.boundingBox.expandByPoint(Zt.min),this.boundingBox.expandByPoint(Zt.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Jl);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new q,1/0);return}if(e){const i=this.boundingSphere.center;if(Zt.setFromBufferAttribute(e),t)for(let s=0,o=t.length;s<o;s++){const a=t[s];Ir.setFromBufferAttribute(a),this.morphTargetsRelative?(Ct.addVectors(Zt.min,Ir.min),Zt.expandByPoint(Ct),Ct.addVectors(Zt.max,Ir.max),Zt.expandByPoint(Ct)):(Zt.expandByPoint(Ir.min),Zt.expandByPoint(Ir.max))}Zt.getCenter(i);let r=0;for(let s=0,o=e.count;s<o;s++)Ct.fromBufferAttribute(e,s),r=Math.max(r,i.distanceToSquared(Ct));if(t)for(let s=0,o=t.length;s<o;s++){const a=t[s],l=this.morphTargetsRelative;for(let c=0,u=a.count;c<u;c++)Ct.fromBufferAttribute(a,c),l&&(Ji.fromBufferAttribute(e,c),Ct.add(Ji)),r=Math.max(r,i.distanceToSquared(Ct))}this.boundingSphere.radius=Math.sqrt(r),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const i=t.position,r=t.normal,s=t.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new Cn(new Float32Array(4*i.count),4));const o=this.getAttribute("tangent"),a=[],l=[];for(let k=0;k<i.count;k++)a[k]=new q,l[k]=new q;const c=new q,u=new q,f=new q,d=new ct,p=new ct,v=new ct,x=new q,m=new q;function h(k,b,E){c.fromBufferAttribute(i,k),u.fromBufferAttribute(i,b),f.fromBufferAttribute(i,E),d.fromBufferAttribute(s,k),p.fromBufferAttribute(s,b),v.fromBufferAttribute(s,E),u.sub(c),f.sub(c),p.sub(d),v.sub(d);const L=1/(p.x*v.y-v.x*p.y);isFinite(L)&&(x.copy(u).multiplyScalar(v.y).addScaledVector(f,-p.y).multiplyScalar(L),m.copy(f).multiplyScalar(p.x).addScaledVector(u,-v.x).multiplyScalar(L),a[k].add(x),a[b].add(x),a[E].add(x),l[k].add(m),l[b].add(m),l[E].add(m))}let w=this.groups;w.length===0&&(w=[{start:0,count:e.count}]);for(let k=0,b=w.length;k<b;++k){const E=w[k],L=E.start,X=E.count;for(let K=L,le=L+X;K<le;K+=3)h(e.getX(K+0),e.getX(K+1),e.getX(K+2))}const T=new q,M=new q,C=new q,D=new q;function R(k){C.fromBufferAttribute(r,k),D.copy(C);const b=a[k];T.copy(b),T.sub(C.multiplyScalar(C.dot(b))).normalize(),M.crossVectors(D,b);const L=M.dot(l[k])<0?-1:1;o.setXYZW(k,T.x,T.y,T.z,L)}for(let k=0,b=w.length;k<b;++k){const E=w[k],L=E.start,X=E.count;for(let K=L,le=L+X;K<le;K+=3)R(e.getX(K+0)),R(e.getX(K+1)),R(e.getX(K+2))}}computeVertexNormals(){const e=this.index,t=this.getAttribute("position");if(t!==void 0){let i=this.getAttribute("normal");if(i===void 0)i=new Cn(new Float32Array(t.count*3),3),this.setAttribute("normal",i);else for(let d=0,p=i.count;d<p;d++)i.setXYZ(d,0,0,0);const r=new q,s=new q,o=new q,a=new q,l=new q,c=new q,u=new q,f=new q;if(e)for(let d=0,p=e.count;d<p;d+=3){const v=e.getX(d+0),x=e.getX(d+1),m=e.getX(d+2);r.fromBufferAttribute(t,v),s.fromBufferAttribute(t,x),o.fromBufferAttribute(t,m),u.subVectors(o,s),f.subVectors(r,s),u.cross(f),a.fromBufferAttribute(i,v),l.fromBufferAttribute(i,x),c.fromBufferAttribute(i,m),a.add(u),l.add(u),c.add(u),i.setXYZ(v,a.x,a.y,a.z),i.setXYZ(x,l.x,l.y,l.z),i.setXYZ(m,c.x,c.y,c.z)}else for(let d=0,p=t.count;d<p;d+=3)r.fromBufferAttribute(t,d+0),s.fromBufferAttribute(t,d+1),o.fromBufferAttribute(t,d+2),u.subVectors(o,s),f.subVectors(r,s),u.cross(f),i.setXYZ(d+0,u.x,u.y,u.z),i.setXYZ(d+1,u.x,u.y,u.z),i.setXYZ(d+2,u.x,u.y,u.z);this.normalizeNormals(),i.needsUpdate=!0}}normalizeNormals(){const e=this.attributes.normal;for(let t=0,i=e.count;t<i;t++)Ct.fromBufferAttribute(e,t),Ct.normalize(),e.setXYZ(t,Ct.x,Ct.y,Ct.z)}toNonIndexed(){function e(a,l){const c=a.array,u=a.itemSize,f=a.normalized,d=new c.constructor(l.length*u);let p=0,v=0;for(let x=0,m=l.length;x<m;x++){a.isInterleavedBufferAttribute?p=l[x]*a.data.stride+a.offset:p=l[x]*u;for(let h=0;h<u;h++)d[v++]=c[p++]}return new Cn(d,u,f)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const t=new ki,i=this.index.array,r=this.attributes;for(const a in r){const l=r[a],c=e(l,i);t.setAttribute(a,c)}const s=this.morphAttributes;for(const a in s){const l=[],c=s[a];for(let u=0,f=c.length;u<f;u++){const d=c[u],p=e(d,i);l.push(p)}t.morphAttributes[a]=l}t.morphTargetsRelative=this.morphTargetsRelative;const o=this.groups;for(let a=0,l=o.length;a<l;a++){const c=o[a];t.addGroup(c.start,c.count,c.materialIndex)}return t}toJSON(){const e={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.type,this.name!==""&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0){const l=this.parameters;for(const c in l)l[c]!==void 0&&(e[c]=l[c]);return e}e.data={attributes:{}};const t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});const i=this.attributes;for(const l in i){const c=i[l];e.data.attributes[l]=c.toJSON(e.data)}const r={};let s=!1;for(const l in this.morphAttributes){const c=this.morphAttributes[l],u=[];for(let f=0,d=c.length;f<d;f++){const p=c[f];u.push(p.toJSON(e.data))}u.length>0&&(r[l]=u,s=!0)}s&&(e.data.morphAttributes=r,e.data.morphTargetsRelative=this.morphTargetsRelative);const o=this.groups;o.length>0&&(e.data.groups=JSON.parse(JSON.stringify(o)));const a=this.boundingSphere;return a!==null&&(e.data.boundingSphere=a.toJSON()),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const t={};this.name=e.name;const i=e.index;i!==null&&this.setIndex(i.clone());const r=e.attributes;for(const c in r){const u=r[c];this.setAttribute(c,u.clone(t))}const s=e.morphAttributes;for(const c in s){const u=[],f=s[c];for(let d=0,p=f.length;d<p;d++)u.push(f[d].clone(t));this.morphAttributes[c]=u}this.morphTargetsRelative=e.morphTargetsRelative;const o=e.groups;for(let c=0,u=o.length;c<u;c++){const f=o[c];this.addGroup(f.start,f.count,f.materialIndex)}const a=e.boundingBox;a!==null&&(this.boundingBox=a.clone());const l=e.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}const _u=new At,Mi=new W_,As=new Jl,vu=new q,ws=new q,Rs=new q,Cs=new q,aa=new q,Ps=new q,xu=new q,Ds=new q;class An extends en{constructor(e=new ki,t=new Ql){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){const t=this.geometry.morphAttributes,i=Object.keys(t);if(i.length>0){const r=t[i[0]];if(r!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,o=r.length;s<o;s++){const a=r[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=s}}}}getVertexPosition(e,t){const i=this.geometry,r=i.attributes.position,s=i.morphAttributes.position,o=i.morphTargetsRelative;t.fromBufferAttribute(r,e);const a=this.morphTargetInfluences;if(s&&a){Ps.set(0,0,0);for(let l=0,c=s.length;l<c;l++){const u=a[l],f=s[l];u!==0&&(aa.fromBufferAttribute(f,e),o?Ps.addScaledVector(aa,u):Ps.addScaledVector(aa.sub(t),u))}t.add(Ps)}return t}raycast(e,t){const i=this.geometry,r=this.material,s=this.matrixWorld;r!==void 0&&(i.boundingSphere===null&&i.computeBoundingSphere(),As.copy(i.boundingSphere),As.applyMatrix4(s),Mi.copy(e.ray).recast(e.near),!(As.containsPoint(Mi.origin)===!1&&(Mi.intersectSphere(As,vu)===null||Mi.origin.distanceToSquared(vu)>(e.far-e.near)**2))&&(_u.copy(s).invert(),Mi.copy(e.ray).applyMatrix4(_u),!(i.boundingBox!==null&&Mi.intersectsBox(i.boundingBox)===!1)&&this._computeIntersections(e,t,Mi)))}_computeIntersections(e,t,i){let r;const s=this.geometry,o=this.material,a=s.index,l=s.attributes.position,c=s.attributes.uv,u=s.attributes.uv1,f=s.attributes.normal,d=s.groups,p=s.drawRange;if(a!==null)if(Array.isArray(o))for(let v=0,x=d.length;v<x;v++){const m=d[v],h=o[m.materialIndex],w=Math.max(m.start,p.start),T=Math.min(a.count,Math.min(m.start+m.count,p.start+p.count));for(let M=w,C=T;M<C;M+=3){const D=a.getX(M),R=a.getX(M+1),k=a.getX(M+2);r=Is(this,h,e,i,c,u,f,D,R,k),r&&(r.faceIndex=Math.floor(M/3),r.face.materialIndex=m.materialIndex,t.push(r))}}else{const v=Math.max(0,p.start),x=Math.min(a.count,p.start+p.count);for(let m=v,h=x;m<h;m+=3){const w=a.getX(m),T=a.getX(m+1),M=a.getX(m+2);r=Is(this,o,e,i,c,u,f,w,T,M),r&&(r.faceIndex=Math.floor(m/3),t.push(r))}}else if(l!==void 0)if(Array.isArray(o))for(let v=0,x=d.length;v<x;v++){const m=d[v],h=o[m.materialIndex],w=Math.max(m.start,p.start),T=Math.min(l.count,Math.min(m.start+m.count,p.start+p.count));for(let M=w,C=T;M<C;M+=3){const D=M,R=M+1,k=M+2;r=Is(this,h,e,i,c,u,f,D,R,k),r&&(r.faceIndex=Math.floor(M/3),r.face.materialIndex=m.materialIndex,t.push(r))}}else{const v=Math.max(0,p.start),x=Math.min(l.count,p.start+p.count);for(let m=v,h=x;m<h;m+=3){const w=m,T=m+1,M=m+2;r=Is(this,o,e,i,c,u,f,w,T,M),r&&(r.faceIndex=Math.floor(m/3),t.push(r))}}}}function ev(n,e,t,i,r,s,o,a){let l;if(e.side===jt?l=i.intersectTriangle(o,s,r,!0,a):l=i.intersectTriangle(r,s,o,e.side===hi,a),l===null)return null;Ds.copy(a),Ds.applyMatrix4(n.matrixWorld);const c=t.ray.origin.distanceTo(Ds);return c<t.near||c>t.far?null:{distance:c,point:Ds.clone(),object:n}}function Is(n,e,t,i,r,s,o,a,l,c){n.getVertexPosition(a,ws),n.getVertexPosition(l,Rs),n.getVertexPosition(c,Cs);const u=ev(n,e,t,i,ws,Rs,Cs,xu);if(u){const f=new q;hn.getBarycoord(xu,ws,Rs,Cs,f),r&&(u.uv=hn.getInterpolatedAttribute(r,a,l,c,f,new ct)),s&&(u.uv1=hn.getInterpolatedAttribute(s,a,l,c,f,new ct)),o&&(u.normal=hn.getInterpolatedAttribute(o,a,l,c,f,new q),u.normal.dot(i.direction)>0&&u.normal.multiplyScalar(-1));const d={a,b:l,c,normal:new q,materialIndex:0};hn.getNormal(ws,Rs,Cs,d.normal),u.face=d,u.barycoord=f}return u}class Mr extends ki{constructor(e=1,t=1,i=1,r=1,s=1,o=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:i,widthSegments:r,heightSegments:s,depthSegments:o};const a=this;r=Math.floor(r),s=Math.floor(s),o=Math.floor(o);const l=[],c=[],u=[],f=[];let d=0,p=0;v("z","y","x",-1,-1,i,t,e,o,s,0),v("z","y","x",1,-1,i,t,-e,o,s,1),v("x","z","y",1,1,e,i,t,r,o,2),v("x","z","y",1,-1,e,i,-t,r,o,3),v("x","y","z",1,-1,e,t,i,r,s,4),v("x","y","z",-1,-1,e,t,-i,r,s,5),this.setIndex(l),this.setAttribute("position",new Ui(c,3)),this.setAttribute("normal",new Ui(u,3)),this.setAttribute("uv",new Ui(f,2));function v(x,m,h,w,T,M,C,D,R,k,b){const E=M/R,L=C/k,X=M/2,K=C/2,le=D/2,ie=R+1,J=k+1;let Q=0,z=0;const me=new q;for(let ve=0;ve<J;ve++){const Re=ve*L-K;for(let Oe=0;Oe<ie;Oe++){const Ze=Oe*E-X;me[x]=Ze*w,me[m]=Re*T,me[h]=le,c.push(me.x,me.y,me.z),me[x]=0,me[m]=0,me[h]=D>0?1:-1,u.push(me.x,me.y,me.z),f.push(Oe/R),f.push(1-ve/k),Q+=1}}for(let ve=0;ve<k;ve++)for(let Re=0;Re<R;Re++){const Oe=d+Re+ie*ve,Ze=d+Re+ie*(ve+1),et=d+(Re+1)+ie*(ve+1),$e=d+(Re+1)+ie*ve;l.push(Oe,Ze,$e),l.push(Ze,et,$e),z+=6}a.addGroup(p,z,b),p+=z,d+=Q}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Mr(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}}function yr(n){const e={};for(const t in n){e[t]={};for(const i in n[t]){const r=n[t][i];r&&(r.isColor||r.isMatrix3||r.isMatrix4||r.isVector2||r.isVector3||r.isVector4||r.isTexture||r.isQuaternion)?r.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][i]=null):e[t][i]=r.clone():Array.isArray(r)?e[t][i]=r.slice():e[t][i]=r}}return e}function kt(n){const e={};for(let t=0;t<n.length;t++){const i=yr(n[t]);for(const r in i)e[r]=i[r]}return e}function tv(n){const e=[];for(let t=0;t<n.length;t++)e.push(n[t].clone());return e}function kd(n){const e=n.getRenderTarget();return e===null?n.outputColorSpace:e.isXRRenderTarget===!0?e.texture.colorSpace:Qe.workingColorSpace}const nv={clone:yr,merge:kt};var iv=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,rv=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class pi extends So{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=iv,this.fragmentShader=rv,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=yr(e.uniforms),this.uniformsGroups=tv(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this}toJSON(e){const t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(const r in this.uniforms){const o=this.uniforms[r].value;o&&o.isTexture?t.uniforms[r]={type:"t",value:o.toJSON(e).uuid}:o&&o.isColor?t.uniforms[r]={type:"c",value:o.getHex()}:o&&o.isVector2?t.uniforms[r]={type:"v2",value:o.toArray()}:o&&o.isVector3?t.uniforms[r]={type:"v3",value:o.toArray()}:o&&o.isVector4?t.uniforms[r]={type:"v4",value:o.toArray()}:o&&o.isMatrix3?t.uniforms[r]={type:"m3",value:o.toArray()}:o&&o.isMatrix4?t.uniforms[r]={type:"m4",value:o.toArray()}:t.uniforms[r]={value:o}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;const i={};for(const r in this.extensions)this.extensions[r]===!0&&(i[r]=!0);return Object.keys(i).length>0&&(t.extensions=i),t}}class zd extends en{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new At,this.projectionMatrix=new At,this.projectionMatrixInverse=new At,this.coordinateSystem=Tn,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(e,t){super.updateWorldMatrix(e,t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}const ni=new q,yu=new ct,Su=new ct;class an extends zd{constructor(e=50,t=1,i=.1,r=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=i,this.far=r,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){const t=.5*this.getFilmHeight()/e;this.fov=_l*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){const e=Math.tan(zo*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return _l*2*Math.atan(Math.tan(zo*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,i){ni.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set(ni.x,ni.y).multiplyScalar(-e/ni.z),ni.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),i.set(ni.x,ni.y).multiplyScalar(-e/ni.z)}getViewSize(e,t){return this.getViewBounds(e,yu,Su),t.subVectors(Su,yu)}setViewOffset(e,t,i,r,s,o){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=i,this.view.offsetY=r,this.view.width=s,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=this.near;let t=e*Math.tan(zo*.5*this.fov)/this.zoom,i=2*t,r=this.aspect*i,s=-.5*r;const o=this.view;if(this.view!==null&&this.view.enabled){const l=o.fullWidth,c=o.fullHeight;s+=o.offsetX*r/l,t-=o.offsetY*i/c,r*=o.width/l,i*=o.height/c}const a=this.filmOffset;a!==0&&(s+=e*a/this.getFilmWidth()),this.projectionMatrix.makePerspective(s,s+r,t,t-i,e,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}}const Qi=-90,er=1;class sv extends en{constructor(e,t,i){super(),this.type="CubeCamera",this.renderTarget=i,this.coordinateSystem=null,this.activeMipmapLevel=0;const r=new an(Qi,er,e,t);r.layers=this.layers,this.add(r);const s=new an(Qi,er,e,t);s.layers=this.layers,this.add(s);const o=new an(Qi,er,e,t);o.layers=this.layers,this.add(o);const a=new an(Qi,er,e,t);a.layers=this.layers,this.add(a);const l=new an(Qi,er,e,t);l.layers=this.layers,this.add(l);const c=new an(Qi,er,e,t);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){const e=this.coordinateSystem,t=this.children.concat(),[i,r,s,o,a,l]=t;for(const c of t)this.remove(c);if(e===Tn)i.up.set(0,1,0),i.lookAt(1,0,0),r.up.set(0,1,0),r.lookAt(-1,0,0),s.up.set(0,0,-1),s.lookAt(0,1,0),o.up.set(0,0,1),o.lookAt(0,-1,0),a.up.set(0,1,0),a.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(e===so)i.up.set(0,-1,0),i.lookAt(-1,0,0),r.up.set(0,-1,0),r.lookAt(1,0,0),s.up.set(0,0,1),s.lookAt(0,1,0),o.up.set(0,0,-1),o.lookAt(0,-1,0),a.up.set(0,-1,0),a.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(const c of t)this.add(c),c.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();const{renderTarget:i,activeMipmapLevel:r}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());const[s,o,a,l,c,u]=this.children,f=e.getRenderTarget(),d=e.getActiveCubeFace(),p=e.getActiveMipmapLevel(),v=e.xr.enabled;e.xr.enabled=!1;const x=i.texture.generateMipmaps;i.texture.generateMipmaps=!1,e.setRenderTarget(i,0,r),e.render(t,s),e.setRenderTarget(i,1,r),e.render(t,o),e.setRenderTarget(i,2,r),e.render(t,a),e.setRenderTarget(i,3,r),e.render(t,l),e.setRenderTarget(i,4,r),e.render(t,c),i.texture.generateMipmaps=x,e.setRenderTarget(i,5,r),e.render(t,u),e.setRenderTarget(f,d,p),e.xr.enabled=v,i.texture.needsPMREMUpdate=!0}}class Hd extends qt{constructor(e=[],t=_r,i,r,s,o,a,l,c,u){super(e,t,i,r,s,o,a,l,c,u),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}}class ov extends Fi{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;const i={width:e,height:e,depth:1},r=[i,i,i,i,i,i];this.texture=new Hd(r),this._setTextureOptions(t),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;const i={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},r=new Mr(5,5,5),s=new pi({name:"CubemapFromEquirect",uniforms:yr(i.uniforms),vertexShader:i.vertexShader,fragmentShader:i.fragmentShader,side:jt,blending:ci});s.uniforms.tEquirect.value=t;const o=new An(r,s),a=t.minFilter;return t.minFilter===Ii&&(t.minFilter=bn),new sv(1,10,this).update(e,o),t.minFilter=a,o.geometry.dispose(),o.material.dispose(),this}clear(e,t=!0,i=!0,r=!0){const s=e.getRenderTarget();for(let o=0;o<6;o++)e.setRenderTarget(this,o),e.clear(t,i,r);e.setRenderTarget(s)}}class Ls extends en{constructor(){super(),this.isGroup=!0,this.type="Group"}}const av={type:"move"};class la{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new Ls,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new Ls,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new q,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new q),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new Ls,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new q,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new q),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){const t=this._hand;if(t)for(const i of e.hand.values())this._getHandJoint(t,i)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,i){let r=null,s=null,o=null;const a=this._targetRay,l=this._grip,c=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(c&&e.hand){o=!0;for(const x of e.hand.values()){const m=t.getJointPose(x,i),h=this._getHandJoint(c,x);m!==null&&(h.matrix.fromArray(m.transform.matrix),h.matrix.decompose(h.position,h.rotation,h.scale),h.matrixWorldNeedsUpdate=!0,h.jointRadius=m.radius),h.visible=m!==null}const u=c.joints["index-finger-tip"],f=c.joints["thumb-tip"],d=u.position.distanceTo(f.position),p=.02,v=.005;c.inputState.pinching&&d>p+v?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!c.inputState.pinching&&d<=p-v&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else l!==null&&e.gripSpace&&(s=t.getPose(e.gripSpace,i),s!==null&&(l.matrix.fromArray(s.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,s.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(s.linearVelocity)):l.hasLinearVelocity=!1,s.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(s.angularVelocity)):l.hasAngularVelocity=!1));a!==null&&(r=t.getPose(e.targetRaySpace,i),r===null&&s!==null&&(r=s),r!==null&&(a.matrix.fromArray(r.transform.matrix),a.matrix.decompose(a.position,a.rotation,a.scale),a.matrixWorldNeedsUpdate=!0,r.linearVelocity?(a.hasLinearVelocity=!0,a.linearVelocity.copy(r.linearVelocity)):a.hasLinearVelocity=!1,r.angularVelocity?(a.hasAngularVelocity=!0,a.angularVelocity.copy(r.angularVelocity)):a.hasAngularVelocity=!1,this.dispatchEvent(av)))}return a!==null&&(a.visible=r!==null),l!==null&&(l.visible=s!==null),c!==null&&(c.visible=o!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){const i=new Ls;i.matrixAutoUpdate=!1,i.visible=!1,e.joints[t.jointName]=i,e.add(i)}return e.joints[t.jointName]}}class lv extends en{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new Yn,this.environmentIntensity=1,this.environmentRotation=new Yn,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){const t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(t.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(t.object.backgroundIntensity=this.backgroundIntensity),t.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(t.object.environmentIntensity=this.environmentIntensity),t.object.environmentRotation=this.environmentRotation.toArray(),t}}const ca=new q,cv=new q,uv=new je;class wi{constructor(e=new q(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,i,r){return this.normal.set(e,t,i),this.constant=r,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,i){const r=ca.subVectors(i,t).cross(cv.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(r,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){const e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t){const i=e.delta(ca),r=this.normal.dot(i);if(r===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;const s=-(e.start.dot(this.normal)+this.constant)/r;return s<0||s>1?null:t.copy(e.start).addScaledVector(i,s)}intersectsLine(e){const t=this.distanceToPoint(e.start),i=this.distanceToPoint(e.end);return t<0&&i>0||i<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){const i=t||uv.getNormalMatrix(e),r=this.coplanarPoint(ca).applyMatrix4(e),s=this.normal.applyMatrix3(i).normalize();return this.constant=-r.dot(s),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}}const Ei=new Jl,fv=new ct(.5,.5),Us=new q;class Vd{constructor(e=new wi,t=new wi,i=new wi,r=new wi,s=new wi,o=new wi){this.planes=[e,t,i,r,s,o]}set(e,t,i,r,s,o){const a=this.planes;return a[0].copy(e),a[1].copy(t),a[2].copy(i),a[3].copy(r),a[4].copy(s),a[5].copy(o),this}copy(e){const t=this.planes;for(let i=0;i<6;i++)t[i].copy(e.planes[i]);return this}setFromProjectionMatrix(e,t=Tn,i=!1){const r=this.planes,s=e.elements,o=s[0],a=s[1],l=s[2],c=s[3],u=s[4],f=s[5],d=s[6],p=s[7],v=s[8],x=s[9],m=s[10],h=s[11],w=s[12],T=s[13],M=s[14],C=s[15];if(r[0].setComponents(c-o,p-u,h-v,C-w).normalize(),r[1].setComponents(c+o,p+u,h+v,C+w).normalize(),r[2].setComponents(c+a,p+f,h+x,C+T).normalize(),r[3].setComponents(c-a,p-f,h-x,C-T).normalize(),i)r[4].setComponents(l,d,m,M).normalize(),r[5].setComponents(c-l,p-d,h-m,C-M).normalize();else if(r[4].setComponents(c-l,p-d,h-m,C-M).normalize(),t===Tn)r[5].setComponents(c+l,p+d,h+m,C+M).normalize();else if(t===so)r[5].setComponents(l,d,m,M).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),Ei.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{const t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),Ei.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(Ei)}intersectsSprite(e){Ei.center.set(0,0,0);const t=fv.distanceTo(e.center);return Ei.radius=.7071067811865476+t,Ei.applyMatrix4(e.matrixWorld),this.intersectsSphere(Ei)}intersectsSphere(e){const t=this.planes,i=e.center,r=-e.radius;for(let s=0;s<6;s++)if(t[s].distanceToPoint(i)<r)return!1;return!0}intersectsBox(e){const t=this.planes;for(let i=0;i<6;i++){const r=t[i];if(Us.x=r.normal.x>0?e.max.x:e.min.x,Us.y=r.normal.y>0?e.max.y:e.min.y,Us.z=r.normal.z>0?e.max.z:e.min.z,r.distanceToPoint(Us)<0)return!1}return!0}containsPoint(e){const t=this.planes;for(let i=0;i<6;i++)if(t[i].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}class Gd extends qt{constructor(e,t,i=Ni,r,s,o,a=_n,l=_n,c,u=ts,f=1){if(u!==ts&&u!==ns)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");const d={width:e,height:t,depth:f};super(d,r,s,o,a,l,u,i,c),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.source=new Zl(Object.assign({},e.image)),this.compareFunction=e.compareFunction,this}toJSON(e){const t=super.toJSON(e);return this.compareFunction!==null&&(t.compareFunction=this.compareFunction),t}}class Wd extends qt{constructor(e=null){super(),this.sourceTexture=e,this.isExternalTexture=!0}copy(e){return super.copy(e),this.sourceTexture=e.sourceTexture,this}}class Mo extends ki{constructor(e=1,t=1,i=1,r=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:i,heightSegments:r};const s=e/2,o=t/2,a=Math.floor(i),l=Math.floor(r),c=a+1,u=l+1,f=e/a,d=t/l,p=[],v=[],x=[],m=[];for(let h=0;h<u;h++){const w=h*d-o;for(let T=0;T<c;T++){const M=T*f-s;v.push(M,-w,0),x.push(0,0,1),m.push(T/a),m.push(1-h/l)}}for(let h=0;h<l;h++)for(let w=0;w<a;w++){const T=w+c*h,M=w+c*(h+1),C=w+1+c*(h+1),D=w+1+c*h;p.push(T,M,D),p.push(M,C,D)}this.setIndex(p),this.setAttribute("position",new Ui(v,3)),this.setAttribute("normal",new Ui(x,3)),this.setAttribute("uv",new Ui(m,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Mo(e.width,e.height,e.widthSegments,e.heightSegments)}}class dv extends So{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=E_,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}}class hv extends So{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}}class pv extends zd{constructor(e=-1,t=1,i=1,r=-1,s=.1,o=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=i,this.bottom=r,this.near=s,this.far=o,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,i,r,s,o){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=i,this.view.offsetY=r,this.view.width=s,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),i=(this.right+this.left)/2,r=(this.top+this.bottom)/2;let s=i-e,o=i+e,a=r+t,l=r-t;if(this.view!==null&&this.view.enabled){const c=(this.right-this.left)/this.view.fullWidth/this.zoom,u=(this.top-this.bottom)/this.view.fullHeight/this.zoom;s+=c*this.view.offsetX,o=s+c*this.view.width,a-=u*this.view.offsetY,l=a-u*this.view.height}this.projectionMatrix.makeOrthographic(s,o,a,l,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}}class mv extends an{constructor(e=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=e}}function Mu(n,e,t,i){const r=gv(i);switch(t){case Rd:return n*e;case Pd:return n*e/r.components*r.byteLength;case Yl:return n*e/r.components*r.byteLength;case Dd:return n*e*2/r.components*r.byteLength;case $l:return n*e*2/r.components*r.byteLength;case Cd:return n*e*3/r.components*r.byteLength;case mn:return n*e*4/r.components*r.byteLength;case Kl:return n*e*4/r.components*r.byteLength;case Gs:case Ws:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*8;case Xs:case js:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*16;case Wa:case ja:return Math.max(n,16)*Math.max(e,8)/4;case Ga:case Xa:return Math.max(n,8)*Math.max(e,8)/2;case qa:case Ya:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*8;case $a:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*16;case Ka:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*16;case Za:return Math.floor((n+4)/5)*Math.floor((e+3)/4)*16;case Ja:return Math.floor((n+4)/5)*Math.floor((e+4)/5)*16;case Qa:return Math.floor((n+5)/6)*Math.floor((e+4)/5)*16;case el:return Math.floor((n+5)/6)*Math.floor((e+5)/6)*16;case tl:return Math.floor((n+7)/8)*Math.floor((e+4)/5)*16;case nl:return Math.floor((n+7)/8)*Math.floor((e+5)/6)*16;case il:return Math.floor((n+7)/8)*Math.floor((e+7)/8)*16;case rl:return Math.floor((n+9)/10)*Math.floor((e+4)/5)*16;case sl:return Math.floor((n+9)/10)*Math.floor((e+5)/6)*16;case ol:return Math.floor((n+9)/10)*Math.floor((e+7)/8)*16;case al:return Math.floor((n+9)/10)*Math.floor((e+9)/10)*16;case ll:return Math.floor((n+11)/12)*Math.floor((e+9)/10)*16;case cl:return Math.floor((n+11)/12)*Math.floor((e+11)/12)*16;case ul:case fl:case dl:return Math.ceil(n/4)*Math.ceil(e/4)*16;case hl:case pl:return Math.ceil(n/4)*Math.ceil(e/4)*8;case ml:case gl:return Math.ceil(n/4)*Math.ceil(e/4)*16}throw new Error(`Unable to determine texture byte length for ${t} format.`)}function gv(n){switch(n){case qn:case bd:return{byteLength:1,components:1};case Qr:case Td:case as:return{byteLength:2,components:1};case jl:case ql:return{byteLength:2,components:4};case Ni:case Xl:case Gn:return{byteLength:4,components:1};case Ad:case wd:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${n}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:Wl}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=Wl);/**
 * @license
 * Copyright 2010-2025 Three.js Authors
 * SPDX-License-Identifier: MIT
 */function Xd(){let n=null,e=!1,t=null,i=null;function r(s,o){t(s,o),i=n.requestAnimationFrame(r)}return{start:function(){e!==!0&&t!==null&&(i=n.requestAnimationFrame(r),e=!0)},stop:function(){n.cancelAnimationFrame(i),e=!1},setAnimationLoop:function(s){t=s},setContext:function(s){n=s}}}function _v(n){const e=new WeakMap;function t(a,l){const c=a.array,u=a.usage,f=c.byteLength,d=n.createBuffer();n.bindBuffer(l,d),n.bufferData(l,c,u),a.onUploadCallback();let p;if(c instanceof Float32Array)p=n.FLOAT;else if(typeof Float16Array<"u"&&c instanceof Float16Array)p=n.HALF_FLOAT;else if(c instanceof Uint16Array)a.isFloat16BufferAttribute?p=n.HALF_FLOAT:p=n.UNSIGNED_SHORT;else if(c instanceof Int16Array)p=n.SHORT;else if(c instanceof Uint32Array)p=n.UNSIGNED_INT;else if(c instanceof Int32Array)p=n.INT;else if(c instanceof Int8Array)p=n.BYTE;else if(c instanceof Uint8Array)p=n.UNSIGNED_BYTE;else if(c instanceof Uint8ClampedArray)p=n.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+c);return{buffer:d,type:p,bytesPerElement:c.BYTES_PER_ELEMENT,version:a.version,size:f}}function i(a,l,c){const u=l.array,f=l.updateRanges;if(n.bindBuffer(c,a),f.length===0)n.bufferSubData(c,0,u);else{f.sort((p,v)=>p.start-v.start);let d=0;for(let p=1;p<f.length;p++){const v=f[d],x=f[p];x.start<=v.start+v.count+1?v.count=Math.max(v.count,x.start+x.count-v.start):(++d,f[d]=x)}f.length=d+1;for(let p=0,v=f.length;p<v;p++){const x=f[p];n.bufferSubData(c,x.start*u.BYTES_PER_ELEMENT,u,x.start,x.count)}l.clearUpdateRanges()}l.onUploadCallback()}function r(a){return a.isInterleavedBufferAttribute&&(a=a.data),e.get(a)}function s(a){a.isInterleavedBufferAttribute&&(a=a.data);const l=e.get(a);l&&(n.deleteBuffer(l.buffer),e.delete(a))}function o(a,l){if(a.isInterleavedBufferAttribute&&(a=a.data),a.isGLBufferAttribute){const u=e.get(a);(!u||u.version<a.version)&&e.set(a,{buffer:a.buffer,type:a.type,bytesPerElement:a.elementSize,version:a.version});return}const c=e.get(a);if(c===void 0)e.set(a,t(a,l));else if(c.version<a.version){if(c.size!==a.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");i(c.buffer,a,l),c.version=a.version}}return{get:r,remove:s,update:o}}var vv=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,xv=`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,yv=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,Sv=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Mv=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,Ev=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,bv=`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,Tv=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,Av=`#ifdef USE_BATCHING
	#if ! defined( GL_ANGLE_multi_draw )
	#define gl_DrawID _gl_DrawID
	uniform int _gl_DrawID;
	#endif
	uniform highp sampler2D batchingTexture;
	uniform highp usampler2D batchingIdTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
	float getIndirectIndex( const in int i ) {
		int size = textureSize( batchingIdTexture, 0 ).x;
		int x = i % size;
		int y = i / size;
		return float( texelFetch( batchingIdTexture, ivec2( x, y ), 0 ).r );
	}
#endif
#ifdef USE_BATCHING_COLOR
	uniform sampler2D batchingColorTexture;
	vec3 getBatchingColor( const in float i ) {
		int size = textureSize( batchingColorTexture, 0 ).x;
		int j = int( i );
		int x = j % size;
		int y = j / size;
		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 ).rgb;
	}
#endif`,wv=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,Rv=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,Cv=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,Pv=`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,Dv=`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,Iv=`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,Lv=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#ifdef ALPHA_TO_COVERAGE
		float distanceToPlane, distanceGradient;
		float clipOpacity = 1.0;
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
			distanceGradient = fwidth( distanceToPlane ) / 2.0;
			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			if ( clipOpacity == 0.0 ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			float unionClipOpacity = 1.0;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
				distanceGradient = fwidth( distanceToPlane ) / 2.0;
				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			}
			#pragma unroll_loop_end
			clipOpacity *= 1.0 - unionClipOpacity;
		#endif
		diffuseColor.a *= clipOpacity;
		if ( diffuseColor.a == 0.0 ) discard;
	#else
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			bool clipped = true;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
			}
			#pragma unroll_loop_end
			if ( clipped ) discard;
		#endif
	#endif
#endif`,Uv=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,Nv=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,Fv=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,Ov=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,Bv=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,kv=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec3 vColor;
#endif`,zv=`#if defined( USE_COLOR_ALPHA )
	vColor = vec4( 1.0 );
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	vColor = vec3( 1.0 );
#endif
#ifdef USE_COLOR
	vColor *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.xyz *= instanceColor.xyz;
#endif
#ifdef USE_BATCHING_COLOR
	vec3 batchingColor = getBatchingColor( getIndirectIndex( gl_DrawID ) );
	vColor.xyz *= batchingColor.xyz;
#endif`,Hv=`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
vec3 inverseTransformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( vec4( dir, 0.0 ) * matrix ).xyz );
}
mat3 transposeMat3( const in mat3 m ) {
	mat3 tmp;
	tmp[ 0 ] = vec3( m[ 0 ].x, m[ 1 ].x, m[ 2 ].x );
	tmp[ 1 ] = vec3( m[ 0 ].y, m[ 1 ].y, m[ 2 ].y );
	tmp[ 2 ] = vec3( m[ 0 ].z, m[ 1 ].z, m[ 2 ].z );
	return tmp;
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,Vv=`#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,Gv=`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
	#ifdef FLIP_SIDED
		transformedTangent = - transformedTangent;
	#endif
#endif`,Wv=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,Xv=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,jv=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,qv=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,Yv="gl_FragColor = linearToOutputTexel( gl_FragColor );",$v=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,Kv=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * vec3( flipEnvMap * reflectVec.x, reflectVec.yz ) );
	#else
		vec4 envColor = vec4( 0.0 );
	#endif
	#ifdef ENVMAP_BLENDING_MULTIPLY
		outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_MIX )
		outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_ADD )
		outgoingLight += envColor.xyz * specularStrength * reflectivity;
	#endif
#endif`,Zv=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,Jv=`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,Qv=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,ex=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,tx=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,nx=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,ix=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,rx=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,sx=`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,ox=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,ax=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,lx=`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,cx=`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
	if ( cutoffDistance > 0.0 ) {
		distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
	}
	return distanceFalloff;
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif`,ux=`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, roughness * roughness) );
			reflectVec = inverseTransformDirection( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
#endif`,fx=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,dx=`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,hx=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,px=`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,mx=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb * ( 1.0 - metalnessFactor );
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = mix( min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = mix( vec3( 0.04 ), diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_DISPERSION
	material.dispersion = dispersion;
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.07, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,gx=`struct PhysicalMaterial {
	vec3 diffuseColor;
	float roughness;
	vec3 specularColor;
	float specularF90;
	float dispersion;
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		float v = 0.5 / ( gv + gl );
		return saturate(v);
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColor;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transposeMat3( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float a = roughness < 0.25 ? -339.2 * r2 + 161.4 * roughness - 25.9 : -8.48 * r2 + 14.3 * roughness - 9.95;
	float b = roughness < 0.25 ? 44.0 * r2 - 23.7 * roughness + 3.26 : 1.97 * r2 - 3.27 * roughness + 0.72;
	float DG = exp( a * dotNV + b ) + ( roughness < 0.25 ? 0.0 : 0.1 * ( roughness - 0.25 ) );
	return saturate( DG * RECIPROCAL_PI );
}
vec2 DFGApprox( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	const vec4 c0 = vec4( - 1, - 0.0275, - 0.572, 0.022 );
	const vec4 c1 = vec4( 1, 0.0425, 1.04, - 0.04 );
	vec4 r = roughness * c0 + c1;
	float a004 = min( r.x * r.x, exp2( - 9.28 * dotNV ) ) * r.x + r.y;
	vec2 fab = vec2( - 1.04, 1.04 ) * a004 + r.zw;
	return fab;
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColor * t2.x + ( vec3( 1.0 ) - material.specularColor ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseColor * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
	#endif
	reflectedLight.directSpecular += irradiance * BRDF_GGX( directLight.direction, geometryViewDir, geometryNormal, material );
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
	#endif
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.iridescence, material.iridescenceFresnel, material.roughness, singleScattering, multiScattering );
	#else
		computeMultiscattering( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.roughness, singleScattering, multiScattering );
	#endif
	vec3 totalScattering = singleScattering + multiScattering;
	vec3 diffuse = material.diffuseColor * ( 1.0 - max( max( totalScattering.r, totalScattering.g ), totalScattering.b ) );
	reflectedLight.indirectSpecular += radiance * singleScattering;
	reflectedLight.indirectSpecular += multiScattering * cosineWeightedIrradiance;
	reflectedLight.indirectDiffuse += diffuse * cosineWeightedIrradiance;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,_x=`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		material.iridescenceFresnel = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		material.iridescenceF0 = Schlick_to_F0( material.iridescenceFresnel, 1.0, dotNVi );
	}
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowIntensity, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowIntensity, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowIntensity, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,vx=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD ) && defined( ENVMAP_TYPE_CUBE_UV )
		iblIrradiance += getIBLIrradiance( geometryNormal );
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		radiance += getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		radiance += getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,xx=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,yx=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,Sx=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Mx=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Ex=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,bx=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,Tx=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,Ax=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,wx=`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Rx=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,Cx=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,Px=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,Dx=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,Ix=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Lx=`#ifdef USE_MORPHTARGETS
	#ifndef USE_INSTANCING_MORPH
		uniform float morphTargetBaseInfluence;
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	#endif
	uniform sampler2DArray morphTargetsTexture;
	uniform ivec2 morphTargetsTextureSize;
	vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
		int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
		int y = texelIndex / morphTargetsTextureSize.x;
		int x = texelIndex - y * morphTargetsTextureSize.x;
		ivec3 morphUV = ivec3( x, y, morphTargetIndex );
		return texelFetch( morphTargetsTexture, morphUV, 0 );
	}
#endif`,Ux=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Nx=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,Fx=`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,Ox=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Bx=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,kx=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,zx=`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,Hx=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,Vx=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,Gx=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,Wx=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,Xx=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,jx=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;const float ShiftRight8 = 1. / 256.;
const float Inv255 = 1. / 255.;
const vec4 PackFactors = vec4( 1.0, 256.0, 256.0 * 256.0, 256.0 * 256.0 * 256.0 );
const vec2 UnpackFactors2 = vec2( UnpackDownscale, 1.0 / PackFactors.g );
const vec3 UnpackFactors3 = vec3( UnpackDownscale / PackFactors.rg, 1.0 / PackFactors.b );
const vec4 UnpackFactors4 = vec4( UnpackDownscale / PackFactors.rgb, 1.0 / PackFactors.a );
vec4 packDepthToRGBA( const in float v ) {
	if( v <= 0.0 )
		return vec4( 0., 0., 0., 0. );
	if( v >= 1.0 )
		return vec4( 1., 1., 1., 1. );
	float vuf;
	float af = modf( v * PackFactors.a, vuf );
	float bf = modf( vuf * ShiftRight8, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec4( vuf * Inv255, gf * PackUpscale, bf * PackUpscale, af );
}
vec3 packDepthToRGB( const in float v ) {
	if( v <= 0.0 )
		return vec3( 0., 0., 0. );
	if( v >= 1.0 )
		return vec3( 1., 1., 1. );
	float vuf;
	float bf = modf( v * PackFactors.b, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec3( vuf * Inv255, gf * PackUpscale, bf );
}
vec2 packDepthToRG( const in float v ) {
	if( v <= 0.0 )
		return vec2( 0., 0. );
	if( v >= 1.0 )
		return vec2( 1., 1. );
	float vuf;
	float gf = modf( v * 256., vuf );
	return vec2( vuf * Inv255, gf );
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors4 );
}
float unpackRGBToDepth( const in vec3 v ) {
	return dot( v, UnpackFactors3 );
}
float unpackRGToDepth( const in vec2 v ) {
	return v.r * UnpackFactors2.r + v.g * UnpackFactors2.g;
}
vec4 pack2HalfToRGBA( const in vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( const in vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return depth * ( near - far ) - near;
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return ( near * far ) / ( ( far - near ) * depth - far );
}`,qx=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,Yx=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,$x=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,Kx=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,Zx=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,Jx=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,Qx=`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform sampler2D pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	float texture2DCompare( sampler2D depths, vec2 uv, float compare ) {
		float depth = unpackRGBAToDepth( texture2D( depths, uv ) );
		#ifdef USE_REVERSED_DEPTH_BUFFER
			return step( depth, compare );
		#else
			return step( compare, depth );
		#endif
	}
	vec2 texture2DDistribution( sampler2D shadow, vec2 uv ) {
		return unpackRGBATo2Half( texture2D( shadow, uv ) );
	}
	float VSMShadow( sampler2D shadow, vec2 uv, float compare ) {
		float occlusion = 1.0;
		vec2 distribution = texture2DDistribution( shadow, uv );
		#ifdef USE_REVERSED_DEPTH_BUFFER
			float hard_shadow = step( distribution.x, compare );
		#else
			float hard_shadow = step( compare, distribution.x );
		#endif
		if ( hard_shadow != 1.0 ) {
			float distance = compare - distribution.x;
			float variance = max( 0.00000, distribution.y * distribution.y );
			float softness_probability = variance / (variance + distance * distance );			softness_probability = clamp( ( softness_probability - 0.3 ) / ( 0.95 - 0.3 ), 0.0, 1.0 );			occlusion = clamp( max( hard_shadow, softness_probability ), 0.0, 1.0 );
		}
		return occlusion;
	}
	float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
		float shadow = 1.0;
		shadowCoord.xyz /= shadowCoord.w;
		shadowCoord.z += shadowBias;
		bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
		bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
		if ( frustumTest ) {
		#if defined( SHADOWMAP_TYPE_PCF )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx0 = - texelSize.x * shadowRadius;
			float dy0 = - texelSize.y * shadowRadius;
			float dx1 = + texelSize.x * shadowRadius;
			float dy1 = + texelSize.y * shadowRadius;
			float dx2 = dx0 / 2.0;
			float dy2 = dy0 / 2.0;
			float dx3 = dx1 / 2.0;
			float dy3 = dy1 / 2.0;
			shadow = (
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy1 ), shadowCoord.z )
			) * ( 1.0 / 17.0 );
		#elif defined( SHADOWMAP_TYPE_PCF_SOFT )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx = texelSize.x;
			float dy = texelSize.y;
			vec2 uv = shadowCoord.xy;
			vec2 f = fract( uv * shadowMapSize + 0.5 );
			uv -= f * texelSize;
			shadow = (
				texture2DCompare( shadowMap, uv, shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( dx, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( 0.0, dy ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + texelSize, shadowCoord.z ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, 0.0 ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 0.0 ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, dy ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( 0.0, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 0.0, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( texture2DCompare( shadowMap, uv + vec2( dx, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( dx, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( mix( texture2DCompare( shadowMap, uv + vec2( -dx, -dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, -dy ), shadowCoord.z ),
						  f.x ),
					 mix( texture2DCompare( shadowMap, uv + vec2( -dx, 2.0 * dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 2.0 * dy ), shadowCoord.z ),
						  f.x ),
					 f.y )
			) * ( 1.0 / 9.0 );
		#elif defined( SHADOWMAP_TYPE_VSM )
			shadow = VSMShadow( shadowMap, shadowCoord.xy, shadowCoord.z );
		#else
			shadow = texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z );
		#endif
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	vec2 cubeToUV( vec3 v, float texelSizeY ) {
		vec3 absV = abs( v );
		float scaleToCube = 1.0 / max( absV.x, max( absV.y, absV.z ) );
		absV *= scaleToCube;
		v *= scaleToCube * ( 1.0 - 2.0 * texelSizeY );
		vec2 planar = v.xy;
		float almostATexel = 1.5 * texelSizeY;
		float almostOne = 1.0 - almostATexel;
		if ( absV.z >= almostOne ) {
			if ( v.z > 0.0 )
				planar.x = 4.0 - v.x;
		} else if ( absV.x >= almostOne ) {
			float signX = sign( v.x );
			planar.x = v.z * signX + 2.0 * signX;
		} else if ( absV.y >= almostOne ) {
			float signY = sign( v.y );
			planar.x = v.x + 2.0 * signY + 2.0;
			planar.y = v.z * signY - 2.0;
		}
		return vec2( 0.125, 0.25 ) * planar + vec2( 0.375, 0.75 );
	}
	float getPointShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		
		float lightToPositionLength = length( lightToPosition );
		if ( lightToPositionLength - shadowCameraFar <= 0.0 && lightToPositionLength - shadowCameraNear >= 0.0 ) {
			float dp = ( lightToPositionLength - shadowCameraNear ) / ( shadowCameraFar - shadowCameraNear );			dp += shadowBias;
			vec3 bd3D = normalize( lightToPosition );
			vec2 texelSize = vec2( 1.0 ) / ( shadowMapSize * vec2( 4.0, 2.0 ) );
			#if defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_PCF_SOFT ) || defined( SHADOWMAP_TYPE_VSM )
				vec2 offset = vec2( - 1, 1 ) * shadowRadius * texelSize.y;
				shadow = (
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxx, texelSize.y ), dp )
				) * ( 1.0 / 9.0 );
			#else
				shadow = texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp );
			#endif
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
#endif`,e0=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,t0=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	vec3 shadowWorldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,n0=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowIntensity, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowIntensity, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowIntensity, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,i0=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,r0=`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,s0=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,o0=`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,a0=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,l0=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,c0=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,u0=`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 CineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color *= toneMappingExposure;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	color = clamp( color, 0.0, 1.0 );
	return color;
}
vec3 NeutralToneMapping( vec3 color ) {
	const float StartCompression = 0.8 - 0.04;
	const float Desaturation = 0.15;
	color *= toneMappingExposure;
	float x = min( color.r, min( color.g, color.b ) );
	float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;
	color -= offset;
	float peak = max( color.r, max( color.g, color.b ) );
	if ( peak < StartCompression ) return color;
	float d = 1. - StartCompression;
	float newPeak = 1. - d * d / ( peak + d - StartCompression );
	color *= newPeak / peak;
	float g = 1. - 1. / ( Desaturation * ( peak - newPeak ) + 1. );
	return mix( color, vec3( newPeak ), g );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,f0=`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = inverseTransformDirection( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseColor, material.specularColor, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,d0=`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float dispersion, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec4 transmittedLight;
		vec3 transmittance;
		#ifdef USE_DISPERSION
			float halfSpread = ( ior - 1.0 ) * 0.025 * dispersion;
			vec3 iors = vec3( ior - halfSpread, ior, ior + halfSpread );
			for ( int i = 0; i < 3; i ++ ) {
				vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, iors[ i ], modelMatrix );
				vec3 refractedRayExit = position + transmissionRay;
				vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
				vec2 refractionCoords = ndcPos.xy / ndcPos.w;
				refractionCoords += 1.0;
				refractionCoords /= 2.0;
				vec4 transmissionSample = getTransmissionSample( refractionCoords, roughness, iors[ i ] );
				transmittedLight[ i ] = transmissionSample[ i ];
				transmittedLight.a += transmissionSample.a;
				transmittance[ i ] = diffuseColor[ i ] * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance )[ i ];
			}
			transmittedLight.a /= 3.0;
		#else
			vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
			vec3 refractedRayExit = position + transmissionRay;
			vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
			vec2 refractionCoords = ndcPos.xy / ndcPos.w;
			refractionCoords += 1.0;
			refractionCoords /= 2.0;
			transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
			transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		#endif
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,h0=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,p0=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,m0=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,g0=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const _0=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,v0=`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,x0=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,y0=`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float flipEnvMap;
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, backgroundRotation * vec3( flipEnvMap * vWorldDirection.x, vWorldDirection.yz ) );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, backgroundRotation * vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,S0=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,M0=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,E0=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,b0=`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	#ifdef USE_REVERSED_DEPTH_BUFFER
		float fragCoordZ = vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ];
	#else
		float fragCoordZ = 0.5 * vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ] + 0.5;
	#endif
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#elif DEPTH_PACKING == 3202
		gl_FragColor = vec4( packDepthToRGB( fragCoordZ ), 1.0 );
	#elif DEPTH_PACKING == 3203
		gl_FragColor = vec4( packDepthToRG( fragCoordZ ), 0.0, 1.0 );
	#endif
}`,T0=`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,A0=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main () {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = packDepthToRGBA( dist );
}`,w0=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,R0=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,C0=`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,P0=`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,D0=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,I0=`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,L0=`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,U0=`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,N0=`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,F0=`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,O0=`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,B0=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <packing>
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( packNormalToRGB( normal ), diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,k0=`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,z0=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,H0=`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,V0=`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_DISPERSION
	uniform float dispersion;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
		float sheenEnergyComp = 1.0 - 0.157 * max3( material.sheenColor );
		outgoingLight = outgoingLight * sheenEnergyComp + sheenSpecularDirect + sheenSpecularIndirect;
	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,G0=`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,W0=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,X0=`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,j0=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,q0=`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Y0=`uniform vec3 color;
uniform float opacity;
#include <common>
#include <packing>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,$0=`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix[ 3 ];
	vec2 scale = vec2( length( modelMatrix[ 0 ].xyz ), length( modelMatrix[ 1 ].xyz ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,K0=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,qe={alphahash_fragment:vv,alphahash_pars_fragment:xv,alphamap_fragment:yv,alphamap_pars_fragment:Sv,alphatest_fragment:Mv,alphatest_pars_fragment:Ev,aomap_fragment:bv,aomap_pars_fragment:Tv,batching_pars_vertex:Av,batching_vertex:wv,begin_vertex:Rv,beginnormal_vertex:Cv,bsdfs:Pv,iridescence_fragment:Dv,bumpmap_pars_fragment:Iv,clipping_planes_fragment:Lv,clipping_planes_pars_fragment:Uv,clipping_planes_pars_vertex:Nv,clipping_planes_vertex:Fv,color_fragment:Ov,color_pars_fragment:Bv,color_pars_vertex:kv,color_vertex:zv,common:Hv,cube_uv_reflection_fragment:Vv,defaultnormal_vertex:Gv,displacementmap_pars_vertex:Wv,displacementmap_vertex:Xv,emissivemap_fragment:jv,emissivemap_pars_fragment:qv,colorspace_fragment:Yv,colorspace_pars_fragment:$v,envmap_fragment:Kv,envmap_common_pars_fragment:Zv,envmap_pars_fragment:Jv,envmap_pars_vertex:Qv,envmap_physical_pars_fragment:ux,envmap_vertex:ex,fog_vertex:tx,fog_pars_vertex:nx,fog_fragment:ix,fog_pars_fragment:rx,gradientmap_pars_fragment:sx,lightmap_pars_fragment:ox,lights_lambert_fragment:ax,lights_lambert_pars_fragment:lx,lights_pars_begin:cx,lights_toon_fragment:fx,lights_toon_pars_fragment:dx,lights_phong_fragment:hx,lights_phong_pars_fragment:px,lights_physical_fragment:mx,lights_physical_pars_fragment:gx,lights_fragment_begin:_x,lights_fragment_maps:vx,lights_fragment_end:xx,logdepthbuf_fragment:yx,logdepthbuf_pars_fragment:Sx,logdepthbuf_pars_vertex:Mx,logdepthbuf_vertex:Ex,map_fragment:bx,map_pars_fragment:Tx,map_particle_fragment:Ax,map_particle_pars_fragment:wx,metalnessmap_fragment:Rx,metalnessmap_pars_fragment:Cx,morphinstance_vertex:Px,morphcolor_vertex:Dx,morphnormal_vertex:Ix,morphtarget_pars_vertex:Lx,morphtarget_vertex:Ux,normal_fragment_begin:Nx,normal_fragment_maps:Fx,normal_pars_fragment:Ox,normal_pars_vertex:Bx,normal_vertex:kx,normalmap_pars_fragment:zx,clearcoat_normal_fragment_begin:Hx,clearcoat_normal_fragment_maps:Vx,clearcoat_pars_fragment:Gx,iridescence_pars_fragment:Wx,opaque_fragment:Xx,packing:jx,premultiplied_alpha_fragment:qx,project_vertex:Yx,dithering_fragment:$x,dithering_pars_fragment:Kx,roughnessmap_fragment:Zx,roughnessmap_pars_fragment:Jx,shadowmap_pars_fragment:Qx,shadowmap_pars_vertex:e0,shadowmap_vertex:t0,shadowmask_pars_fragment:n0,skinbase_vertex:i0,skinning_pars_vertex:r0,skinning_vertex:s0,skinnormal_vertex:o0,specularmap_fragment:a0,specularmap_pars_fragment:l0,tonemapping_fragment:c0,tonemapping_pars_fragment:u0,transmission_fragment:f0,transmission_pars_fragment:d0,uv_pars_fragment:h0,uv_pars_vertex:p0,uv_vertex:m0,worldpos_vertex:g0,background_vert:_0,background_frag:v0,backgroundCube_vert:x0,backgroundCube_frag:y0,cube_vert:S0,cube_frag:M0,depth_vert:E0,depth_frag:b0,distanceRGBA_vert:T0,distanceRGBA_frag:A0,equirect_vert:w0,equirect_frag:R0,linedashed_vert:C0,linedashed_frag:P0,meshbasic_vert:D0,meshbasic_frag:I0,meshlambert_vert:L0,meshlambert_frag:U0,meshmatcap_vert:N0,meshmatcap_frag:F0,meshnormal_vert:O0,meshnormal_frag:B0,meshphong_vert:k0,meshphong_frag:z0,meshphysical_vert:H0,meshphysical_frag:V0,meshtoon_vert:G0,meshtoon_frag:W0,points_vert:X0,points_frag:j0,shadow_vert:q0,shadow_frag:Y0,sprite_vert:$0,sprite_frag:K0},xe={common:{diffuse:{value:new lt(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new je},alphaMap:{value:null},alphaMapTransform:{value:new je},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new je}},envmap:{envMap:{value:null},envMapRotation:{value:new je},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new je}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new je}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new je},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new je},normalScale:{value:new ct(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new je},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new je}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new je}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new je}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new lt(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new lt(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new je},alphaTest:{value:0},uvTransform:{value:new je}},sprite:{diffuse:{value:new lt(16777215)},opacity:{value:1},center:{value:new ct(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new je},alphaMap:{value:null},alphaMapTransform:{value:new je},alphaTest:{value:0}}},En={basic:{uniforms:kt([xe.common,xe.specularmap,xe.envmap,xe.aomap,xe.lightmap,xe.fog]),vertexShader:qe.meshbasic_vert,fragmentShader:qe.meshbasic_frag},lambert:{uniforms:kt([xe.common,xe.specularmap,xe.envmap,xe.aomap,xe.lightmap,xe.emissivemap,xe.bumpmap,xe.normalmap,xe.displacementmap,xe.fog,xe.lights,{emissive:{value:new lt(0)}}]),vertexShader:qe.meshlambert_vert,fragmentShader:qe.meshlambert_frag},phong:{uniforms:kt([xe.common,xe.specularmap,xe.envmap,xe.aomap,xe.lightmap,xe.emissivemap,xe.bumpmap,xe.normalmap,xe.displacementmap,xe.fog,xe.lights,{emissive:{value:new lt(0)},specular:{value:new lt(1118481)},shininess:{value:30}}]),vertexShader:qe.meshphong_vert,fragmentShader:qe.meshphong_frag},standard:{uniforms:kt([xe.common,xe.envmap,xe.aomap,xe.lightmap,xe.emissivemap,xe.bumpmap,xe.normalmap,xe.displacementmap,xe.roughnessmap,xe.metalnessmap,xe.fog,xe.lights,{emissive:{value:new lt(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:qe.meshphysical_vert,fragmentShader:qe.meshphysical_frag},toon:{uniforms:kt([xe.common,xe.aomap,xe.lightmap,xe.emissivemap,xe.bumpmap,xe.normalmap,xe.displacementmap,xe.gradientmap,xe.fog,xe.lights,{emissive:{value:new lt(0)}}]),vertexShader:qe.meshtoon_vert,fragmentShader:qe.meshtoon_frag},matcap:{uniforms:kt([xe.common,xe.bumpmap,xe.normalmap,xe.displacementmap,xe.fog,{matcap:{value:null}}]),vertexShader:qe.meshmatcap_vert,fragmentShader:qe.meshmatcap_frag},points:{uniforms:kt([xe.points,xe.fog]),vertexShader:qe.points_vert,fragmentShader:qe.points_frag},dashed:{uniforms:kt([xe.common,xe.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:qe.linedashed_vert,fragmentShader:qe.linedashed_frag},depth:{uniforms:kt([xe.common,xe.displacementmap]),vertexShader:qe.depth_vert,fragmentShader:qe.depth_frag},normal:{uniforms:kt([xe.common,xe.bumpmap,xe.normalmap,xe.displacementmap,{opacity:{value:1}}]),vertexShader:qe.meshnormal_vert,fragmentShader:qe.meshnormal_frag},sprite:{uniforms:kt([xe.sprite,xe.fog]),vertexShader:qe.sprite_vert,fragmentShader:qe.sprite_frag},background:{uniforms:{uvTransform:{value:new je},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:qe.background_vert,fragmentShader:qe.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new je}},vertexShader:qe.backgroundCube_vert,fragmentShader:qe.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:qe.cube_vert,fragmentShader:qe.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:qe.equirect_vert,fragmentShader:qe.equirect_frag},distanceRGBA:{uniforms:kt([xe.common,xe.displacementmap,{referencePosition:{value:new q},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:qe.distanceRGBA_vert,fragmentShader:qe.distanceRGBA_frag},shadow:{uniforms:kt([xe.lights,xe.fog,{color:{value:new lt(0)},opacity:{value:1}}]),vertexShader:qe.shadow_vert,fragmentShader:qe.shadow_frag}};En.physical={uniforms:kt([En.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new je},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new je},clearcoatNormalScale:{value:new ct(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new je},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new je},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new je},sheen:{value:0},sheenColor:{value:new lt(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new je},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new je},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new je},transmissionSamplerSize:{value:new ct},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new je},attenuationDistance:{value:0},attenuationColor:{value:new lt(0)},specularColor:{value:new lt(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new je},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new je},anisotropyVector:{value:new ct},anisotropyMap:{value:null},anisotropyMapTransform:{value:new je}}]),vertexShader:qe.meshphysical_vert,fragmentShader:qe.meshphysical_frag};const Ns={r:0,b:0,g:0},bi=new Yn,Z0=new At;function J0(n,e,t,i,r,s,o){const a=new lt(0);let l=s===!0?0:1,c,u,f=null,d=0,p=null;function v(T){let M=T.isScene===!0?T.background:null;return M&&M.isTexture&&(M=(T.backgroundBlurriness>0?t:e).get(M)),M}function x(T){let M=!1;const C=v(T);C===null?h(a,l):C&&C.isColor&&(h(C,1),M=!0);const D=n.xr.getEnvironmentBlendMode();D==="additive"?i.buffers.color.setClear(0,0,0,1,o):D==="alpha-blend"&&i.buffers.color.setClear(0,0,0,0,o),(n.autoClear||M)&&(i.buffers.depth.setTest(!0),i.buffers.depth.setMask(!0),i.buffers.color.setMask(!0),n.clear(n.autoClearColor,n.autoClearDepth,n.autoClearStencil))}function m(T,M){const C=v(M);C&&(C.isCubeTexture||C.mapping===yo)?(u===void 0&&(u=new An(new Mr(1,1,1),new pi({name:"BackgroundCubeMaterial",uniforms:yr(En.backgroundCube.uniforms),vertexShader:En.backgroundCube.vertexShader,fragmentShader:En.backgroundCube.fragmentShader,side:jt,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),u.geometry.deleteAttribute("normal"),u.geometry.deleteAttribute("uv"),u.onBeforeRender=function(D,R,k){this.matrixWorld.copyPosition(k.matrixWorld)},Object.defineProperty(u.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),r.update(u)),bi.copy(M.backgroundRotation),bi.x*=-1,bi.y*=-1,bi.z*=-1,C.isCubeTexture&&C.isRenderTargetTexture===!1&&(bi.y*=-1,bi.z*=-1),u.material.uniforms.envMap.value=C,u.material.uniforms.flipEnvMap.value=C.isCubeTexture&&C.isRenderTargetTexture===!1?-1:1,u.material.uniforms.backgroundBlurriness.value=M.backgroundBlurriness,u.material.uniforms.backgroundIntensity.value=M.backgroundIntensity,u.material.uniforms.backgroundRotation.value.setFromMatrix4(Z0.makeRotationFromEuler(bi)),u.material.toneMapped=Qe.getTransfer(C.colorSpace)!==at,(f!==C||d!==C.version||p!==n.toneMapping)&&(u.material.needsUpdate=!0,f=C,d=C.version,p=n.toneMapping),u.layers.enableAll(),T.unshift(u,u.geometry,u.material,0,0,null)):C&&C.isTexture&&(c===void 0&&(c=new An(new Mo(2,2),new pi({name:"BackgroundMaterial",uniforms:yr(En.background.uniforms),vertexShader:En.background.vertexShader,fragmentShader:En.background.fragmentShader,side:hi,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),c.geometry.deleteAttribute("normal"),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),r.update(c)),c.material.uniforms.t2D.value=C,c.material.uniforms.backgroundIntensity.value=M.backgroundIntensity,c.material.toneMapped=Qe.getTransfer(C.colorSpace)!==at,C.matrixAutoUpdate===!0&&C.updateMatrix(),c.material.uniforms.uvTransform.value.copy(C.matrix),(f!==C||d!==C.version||p!==n.toneMapping)&&(c.material.needsUpdate=!0,f=C,d=C.version,p=n.toneMapping),c.layers.enableAll(),T.unshift(c,c.geometry,c.material,0,0,null))}function h(T,M){T.getRGB(Ns,kd(n)),i.buffers.color.setClear(Ns.r,Ns.g,Ns.b,M,o)}function w(){u!==void 0&&(u.geometry.dispose(),u.material.dispose(),u=void 0),c!==void 0&&(c.geometry.dispose(),c.material.dispose(),c=void 0)}return{getClearColor:function(){return a},setClearColor:function(T,M=1){a.set(T),l=M,h(a,l)},getClearAlpha:function(){return l},setClearAlpha:function(T){l=T,h(a,l)},render:x,addToRenderList:m,dispose:w}}function Q0(n,e){const t=n.getParameter(n.MAX_VERTEX_ATTRIBS),i={},r=d(null);let s=r,o=!1;function a(E,L,X,K,le){let ie=!1;const J=f(K,X,L);s!==J&&(s=J,c(s.object)),ie=p(E,K,X,le),ie&&v(E,K,X,le),le!==null&&e.update(le,n.ELEMENT_ARRAY_BUFFER),(ie||o)&&(o=!1,M(E,L,X,K),le!==null&&n.bindBuffer(n.ELEMENT_ARRAY_BUFFER,e.get(le).buffer))}function l(){return n.createVertexArray()}function c(E){return n.bindVertexArray(E)}function u(E){return n.deleteVertexArray(E)}function f(E,L,X){const K=X.wireframe===!0;let le=i[E.id];le===void 0&&(le={},i[E.id]=le);let ie=le[L.id];ie===void 0&&(ie={},le[L.id]=ie);let J=ie[K];return J===void 0&&(J=d(l()),ie[K]=J),J}function d(E){const L=[],X=[],K=[];for(let le=0;le<t;le++)L[le]=0,X[le]=0,K[le]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:L,enabledAttributes:X,attributeDivisors:K,object:E,attributes:{},index:null}}function p(E,L,X,K){const le=s.attributes,ie=L.attributes;let J=0;const Q=X.getAttributes();for(const z in Q)if(Q[z].location>=0){const ve=le[z];let Re=ie[z];if(Re===void 0&&(z==="instanceMatrix"&&E.instanceMatrix&&(Re=E.instanceMatrix),z==="instanceColor"&&E.instanceColor&&(Re=E.instanceColor)),ve===void 0||ve.attribute!==Re||Re&&ve.data!==Re.data)return!0;J++}return s.attributesNum!==J||s.index!==K}function v(E,L,X,K){const le={},ie=L.attributes;let J=0;const Q=X.getAttributes();for(const z in Q)if(Q[z].location>=0){let ve=ie[z];ve===void 0&&(z==="instanceMatrix"&&E.instanceMatrix&&(ve=E.instanceMatrix),z==="instanceColor"&&E.instanceColor&&(ve=E.instanceColor));const Re={};Re.attribute=ve,ve&&ve.data&&(Re.data=ve.data),le[z]=Re,J++}s.attributes=le,s.attributesNum=J,s.index=K}function x(){const E=s.newAttributes;for(let L=0,X=E.length;L<X;L++)E[L]=0}function m(E){h(E,0)}function h(E,L){const X=s.newAttributes,K=s.enabledAttributes,le=s.attributeDivisors;X[E]=1,K[E]===0&&(n.enableVertexAttribArray(E),K[E]=1),le[E]!==L&&(n.vertexAttribDivisor(E,L),le[E]=L)}function w(){const E=s.newAttributes,L=s.enabledAttributes;for(let X=0,K=L.length;X<K;X++)L[X]!==E[X]&&(n.disableVertexAttribArray(X),L[X]=0)}function T(E,L,X,K,le,ie,J){J===!0?n.vertexAttribIPointer(E,L,X,le,ie):n.vertexAttribPointer(E,L,X,K,le,ie)}function M(E,L,X,K){x();const le=K.attributes,ie=X.getAttributes(),J=L.defaultAttributeValues;for(const Q in ie){const z=ie[Q];if(z.location>=0){let me=le[Q];if(me===void 0&&(Q==="instanceMatrix"&&E.instanceMatrix&&(me=E.instanceMatrix),Q==="instanceColor"&&E.instanceColor&&(me=E.instanceColor)),me!==void 0){const ve=me.normalized,Re=me.itemSize,Oe=e.get(me);if(Oe===void 0)continue;const Ze=Oe.buffer,et=Oe.type,$e=Oe.bytesPerElement,te=et===n.INT||et===n.UNSIGNED_INT||me.gpuType===Xl;if(me.isInterleavedBufferAttribute){const P=me.data,Z=P.stride,re=me.offset;if(P.isInstancedInterleavedBuffer){for(let se=0;se<z.locationSize;se++)h(z.location+se,P.meshPerAttribute);E.isInstancedMesh!==!0&&K._maxInstanceCount===void 0&&(K._maxInstanceCount=P.meshPerAttribute*P.count)}else for(let se=0;se<z.locationSize;se++)m(z.location+se);n.bindBuffer(n.ARRAY_BUFFER,Ze);for(let se=0;se<z.locationSize;se++)T(z.location+se,Re/z.locationSize,et,ve,Z*$e,(re+Re/z.locationSize*se)*$e,te)}else{if(me.isInstancedBufferAttribute){for(let P=0;P<z.locationSize;P++)h(z.location+P,me.meshPerAttribute);E.isInstancedMesh!==!0&&K._maxInstanceCount===void 0&&(K._maxInstanceCount=me.meshPerAttribute*me.count)}else for(let P=0;P<z.locationSize;P++)m(z.location+P);n.bindBuffer(n.ARRAY_BUFFER,Ze);for(let P=0;P<z.locationSize;P++)T(z.location+P,Re/z.locationSize,et,ve,Re*$e,Re/z.locationSize*P*$e,te)}}else if(J!==void 0){const ve=J[Q];if(ve!==void 0)switch(ve.length){case 2:n.vertexAttrib2fv(z.location,ve);break;case 3:n.vertexAttrib3fv(z.location,ve);break;case 4:n.vertexAttrib4fv(z.location,ve);break;default:n.vertexAttrib1fv(z.location,ve)}}}}w()}function C(){k();for(const E in i){const L=i[E];for(const X in L){const K=L[X];for(const le in K)u(K[le].object),delete K[le];delete L[X]}delete i[E]}}function D(E){if(i[E.id]===void 0)return;const L=i[E.id];for(const X in L){const K=L[X];for(const le in K)u(K[le].object),delete K[le];delete L[X]}delete i[E.id]}function R(E){for(const L in i){const X=i[L];if(X[E.id]===void 0)continue;const K=X[E.id];for(const le in K)u(K[le].object),delete K[le];delete X[E.id]}}function k(){b(),o=!0,s!==r&&(s=r,c(s.object))}function b(){r.geometry=null,r.program=null,r.wireframe=!1}return{setup:a,reset:k,resetDefaultState:b,dispose:C,releaseStatesOfGeometry:D,releaseStatesOfProgram:R,initAttributes:x,enableAttribute:m,disableUnusedAttributes:w}}function ey(n,e,t){let i;function r(c){i=c}function s(c,u){n.drawArrays(i,c,u),t.update(u,i,1)}function o(c,u,f){f!==0&&(n.drawArraysInstanced(i,c,u,f),t.update(u,i,f))}function a(c,u,f){if(f===0)return;e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(i,c,0,u,0,f);let p=0;for(let v=0;v<f;v++)p+=u[v];t.update(p,i,1)}function l(c,u,f,d){if(f===0)return;const p=e.get("WEBGL_multi_draw");if(p===null)for(let v=0;v<c.length;v++)o(c[v],u[v],d[v]);else{p.multiDrawArraysInstancedWEBGL(i,c,0,u,0,d,0,f);let v=0;for(let x=0;x<f;x++)v+=u[x]*d[x];t.update(v,i,1)}}this.setMode=r,this.render=s,this.renderInstances=o,this.renderMultiDraw=a,this.renderMultiDrawInstances=l}function ty(n,e,t,i){let r;function s(){if(r!==void 0)return r;if(e.has("EXT_texture_filter_anisotropic")===!0){const R=e.get("EXT_texture_filter_anisotropic");r=n.getParameter(R.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else r=0;return r}function o(R){return!(R!==mn&&i.convert(R)!==n.getParameter(n.IMPLEMENTATION_COLOR_READ_FORMAT))}function a(R){const k=R===as&&(e.has("EXT_color_buffer_half_float")||e.has("EXT_color_buffer_float"));return!(R!==qn&&i.convert(R)!==n.getParameter(n.IMPLEMENTATION_COLOR_READ_TYPE)&&R!==Gn&&!k)}function l(R){if(R==="highp"){if(n.getShaderPrecisionFormat(n.VERTEX_SHADER,n.HIGH_FLOAT).precision>0&&n.getShaderPrecisionFormat(n.FRAGMENT_SHADER,n.HIGH_FLOAT).precision>0)return"highp";R="mediump"}return R==="mediump"&&n.getShaderPrecisionFormat(n.VERTEX_SHADER,n.MEDIUM_FLOAT).precision>0&&n.getShaderPrecisionFormat(n.FRAGMENT_SHADER,n.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let c=t.precision!==void 0?t.precision:"highp";const u=l(c);u!==c&&(console.warn("THREE.WebGLRenderer:",c,"not supported, using",u,"instead."),c=u);const f=t.logarithmicDepthBuffer===!0,d=t.reversedDepthBuffer===!0&&e.has("EXT_clip_control"),p=n.getParameter(n.MAX_TEXTURE_IMAGE_UNITS),v=n.getParameter(n.MAX_VERTEX_TEXTURE_IMAGE_UNITS),x=n.getParameter(n.MAX_TEXTURE_SIZE),m=n.getParameter(n.MAX_CUBE_MAP_TEXTURE_SIZE),h=n.getParameter(n.MAX_VERTEX_ATTRIBS),w=n.getParameter(n.MAX_VERTEX_UNIFORM_VECTORS),T=n.getParameter(n.MAX_VARYING_VECTORS),M=n.getParameter(n.MAX_FRAGMENT_UNIFORM_VECTORS),C=v>0,D=n.getParameter(n.MAX_SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:s,getMaxPrecision:l,textureFormatReadable:o,textureTypeReadable:a,precision:c,logarithmicDepthBuffer:f,reversedDepthBuffer:d,maxTextures:p,maxVertexTextures:v,maxTextureSize:x,maxCubemapSize:m,maxAttributes:h,maxVertexUniforms:w,maxVaryings:T,maxFragmentUniforms:M,vertexTextures:C,maxSamples:D}}function ny(n){const e=this;let t=null,i=0,r=!1,s=!1;const o=new wi,a=new je,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(f,d){const p=f.length!==0||d||i!==0||r;return r=d,i=f.length,p},this.beginShadows=function(){s=!0,u(null)},this.endShadows=function(){s=!1},this.setGlobalState=function(f,d){t=u(f,d,0)},this.setState=function(f,d,p){const v=f.clippingPlanes,x=f.clipIntersection,m=f.clipShadows,h=n.get(f);if(!r||v===null||v.length===0||s&&!m)s?u(null):c();else{const w=s?0:i,T=w*4;let M=h.clippingState||null;l.value=M,M=u(v,d,T,p);for(let C=0;C!==T;++C)M[C]=t[C];h.clippingState=M,this.numIntersection=x?this.numPlanes:0,this.numPlanes+=w}};function c(){l.value!==t&&(l.value=t,l.needsUpdate=i>0),e.numPlanes=i,e.numIntersection=0}function u(f,d,p,v){const x=f!==null?f.length:0;let m=null;if(x!==0){if(m=l.value,v!==!0||m===null){const h=p+x*4,w=d.matrixWorldInverse;a.getNormalMatrix(w),(m===null||m.length<h)&&(m=new Float32Array(h));for(let T=0,M=p;T!==x;++T,M+=4)o.copy(f[T]).applyMatrix4(w,a),o.normal.toArray(m,M),m[M+3]=o.constant}l.value=m,l.needsUpdate=!0}return e.numPlanes=x,e.numIntersection=0,m}}function iy(n){let e=new WeakMap;function t(o,a){return a===ka?o.mapping=_r:a===za&&(o.mapping=vr),o}function i(o){if(o&&o.isTexture){const a=o.mapping;if(a===ka||a===za)if(e.has(o)){const l=e.get(o).texture;return t(l,o.mapping)}else{const l=o.image;if(l&&l.height>0){const c=new ov(l.height);return c.fromEquirectangularTexture(n,o),e.set(o,c),o.addEventListener("dispose",r),t(c.texture,o.mapping)}else return null}}return o}function r(o){const a=o.target;a.removeEventListener("dispose",r);const l=e.get(a);l!==void 0&&(e.delete(a),l.dispose())}function s(){e=new WeakMap}return{get:i,dispose:s}}const sr=4,Eu=[.125,.215,.35,.446,.526,.582],Pi=20,ua=new pv,bu=new lt;let fa=null,da=0,ha=0,pa=!1;const Ri=(1+Math.sqrt(5))/2,tr=1/Ri,Tu=[new q(-Ri,tr,0),new q(Ri,tr,0),new q(-tr,0,Ri),new q(tr,0,Ri),new q(0,Ri,-tr),new q(0,Ri,tr),new q(-1,1,-1),new q(1,1,-1),new q(-1,1,1),new q(1,1,1)],ry=new q;class Au{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(e,t=0,i=.1,r=100,s={}){const{size:o=256,position:a=ry}=s;fa=this._renderer.getRenderTarget(),da=this._renderer.getActiveCubeFace(),ha=this._renderer.getActiveMipmapLevel(),pa=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(o);const l=this._allocateTargets();return l.depthBuffer=!0,this._sceneToCubeUV(e,i,r,l,a),t>0&&this._blur(l,0,0,t),this._applyPMREM(l),this._cleanup(l),l}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=Cu(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=Ru(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodPlanes.length;e++)this._lodPlanes[e].dispose()}_cleanup(e){this._renderer.setRenderTarget(fa,da,ha),this._renderer.xr.enabled=pa,e.scissorTest=!1,Fs(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===_r||e.mapping===vr?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),fa=this._renderer.getRenderTarget(),da=this._renderer.getActiveCubeFace(),ha=this._renderer.getActiveMipmapLevel(),pa=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const i=t||this._allocateTargets();return this._textureToCubeUV(e,i),this._applyPMREM(i),this._cleanup(i),i}_allocateTargets(){const e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,i={magFilter:bn,minFilter:bn,generateMipmaps:!1,type:as,format:mn,colorSpace:xr,depthBuffer:!1},r=wu(e,t,i);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=wu(e,t,i);const{_lodMax:s}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=sy(s)),this._blurMaterial=oy(s,e,t)}return r}_compileMaterial(e){const t=new An(this._lodPlanes[0],e);this._renderer.compile(t,ua)}_sceneToCubeUV(e,t,i,r,s){const l=new an(90,1,t,i),c=[1,-1,1,1,1,1],u=[1,1,1,-1,-1,-1],f=this._renderer,d=f.autoClear,p=f.toneMapping;f.getClearColor(bu),f.toneMapping=ui,f.autoClear=!1,f.state.buffers.depth.getReversed()&&(f.setRenderTarget(r),f.clearDepth(),f.setRenderTarget(null));const x=new Ql({name:"PMREM.Background",side:jt,depthWrite:!1,depthTest:!1}),m=new An(new Mr,x);let h=!1;const w=e.background;w?w.isColor&&(x.color.copy(w),e.background=null,h=!0):(x.color.copy(bu),h=!0);for(let T=0;T<6;T++){const M=T%3;M===0?(l.up.set(0,c[T],0),l.position.set(s.x,s.y,s.z),l.lookAt(s.x+u[T],s.y,s.z)):M===1?(l.up.set(0,0,c[T]),l.position.set(s.x,s.y,s.z),l.lookAt(s.x,s.y+u[T],s.z)):(l.up.set(0,c[T],0),l.position.set(s.x,s.y,s.z),l.lookAt(s.x,s.y,s.z+u[T]));const C=this._cubeSize;Fs(r,M*C,T>2?C:0,C,C),f.setRenderTarget(r),h&&f.render(m,l),f.render(e,l)}m.geometry.dispose(),m.material.dispose(),f.toneMapping=p,f.autoClear=d,e.background=w}_textureToCubeUV(e,t){const i=this._renderer,r=e.mapping===_r||e.mapping===vr;r?(this._cubemapMaterial===null&&(this._cubemapMaterial=Cu()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=Ru());const s=r?this._cubemapMaterial:this._equirectMaterial,o=new An(this._lodPlanes[0],s),a=s.uniforms;a.envMap.value=e;const l=this._cubeSize;Fs(t,0,0,3*l,2*l),i.setRenderTarget(t),i.render(o,ua)}_applyPMREM(e){const t=this._renderer,i=t.autoClear;t.autoClear=!1;const r=this._lodPlanes.length;for(let s=1;s<r;s++){const o=Math.sqrt(this._sigmas[s]*this._sigmas[s]-this._sigmas[s-1]*this._sigmas[s-1]),a=Tu[(r-s-1)%Tu.length];this._blur(e,s-1,s,o,a)}t.autoClear=i}_blur(e,t,i,r,s){const o=this._pingPongRenderTarget;this._halfBlur(e,o,t,i,r,"latitudinal",s),this._halfBlur(o,e,i,i,r,"longitudinal",s)}_halfBlur(e,t,i,r,s,o,a){const l=this._renderer,c=this._blurMaterial;o!=="latitudinal"&&o!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");const u=3,f=new An(this._lodPlanes[r],c),d=c.uniforms,p=this._sizeLods[i]-1,v=isFinite(s)?Math.PI/(2*p):2*Math.PI/(2*Pi-1),x=s/v,m=isFinite(s)?1+Math.floor(u*x):Pi;m>Pi&&console.warn(`sigmaRadians, ${s}, is too large and will clip, as it requested ${m} samples when the maximum is set to ${Pi}`);const h=[];let w=0;for(let R=0;R<Pi;++R){const k=R/x,b=Math.exp(-k*k/2);h.push(b),R===0?w+=b:R<m&&(w+=2*b)}for(let R=0;R<h.length;R++)h[R]=h[R]/w;d.envMap.value=e.texture,d.samples.value=m,d.weights.value=h,d.latitudinal.value=o==="latitudinal",a&&(d.poleAxis.value=a);const{_lodMax:T}=this;d.dTheta.value=v,d.mipInt.value=T-i;const M=this._sizeLods[r],C=3*M*(r>T-sr?r-T+sr:0),D=4*(this._cubeSize-M);Fs(t,C,D,3*M,2*M),l.setRenderTarget(t),l.render(f,ua)}}function sy(n){const e=[],t=[],i=[];let r=n;const s=n-sr+1+Eu.length;for(let o=0;o<s;o++){const a=Math.pow(2,r);t.push(a);let l=1/a;o>n-sr?l=Eu[o-n+sr-1]:o===0&&(l=0),i.push(l);const c=1/(a-2),u=-c,f=1+c,d=[u,u,f,u,f,f,u,u,f,f,u,f],p=6,v=6,x=3,m=2,h=1,w=new Float32Array(x*v*p),T=new Float32Array(m*v*p),M=new Float32Array(h*v*p);for(let D=0;D<p;D++){const R=D%3*2/3-1,k=D>2?0:-1,b=[R,k,0,R+2/3,k,0,R+2/3,k+1,0,R,k,0,R+2/3,k+1,0,R,k+1,0];w.set(b,x*v*D),T.set(d,m*v*D);const E=[D,D,D,D,D,D];M.set(E,h*v*D)}const C=new ki;C.setAttribute("position",new Cn(w,x)),C.setAttribute("uv",new Cn(T,m)),C.setAttribute("faceIndex",new Cn(M,h)),e.push(C),r>sr&&r--}return{lodPlanes:e,sizeLods:t,sigmas:i}}function wu(n,e,t){const i=new Fi(n,e,t);return i.texture.mapping=yo,i.texture.name="PMREM.cubeUv",i.scissorTest=!0,i}function Fs(n,e,t,i,r){n.viewport.set(e,t,i,r),n.scissor.set(e,t,i,r)}function oy(n,e,t){const i=new Float32Array(Pi),r=new q(0,1,0);return new pi({name:"SphericalGaussianBlur",defines:{n:Pi,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${n}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:i},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:r}},vertexShader:ec(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform int samples;
			uniform float weights[ n ];
			uniform bool latitudinal;
			uniform float dTheta;
			uniform float mipInt;
			uniform vec3 poleAxis;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			vec3 getSample( float theta, vec3 axis ) {

				float cosTheta = cos( theta );
				// Rodrigues' axis-angle rotation
				vec3 sampleDirection = vOutputDirection * cosTheta
					+ cross( axis, vOutputDirection ) * sin( theta )
					+ axis * dot( axis, vOutputDirection ) * ( 1.0 - cosTheta );

				return bilinearCubeUV( envMap, sampleDirection, mipInt );

			}

			void main() {

				vec3 axis = latitudinal ? poleAxis : cross( poleAxis, vOutputDirection );

				if ( all( equal( axis, vec3( 0.0 ) ) ) ) {

					axis = vec3( vOutputDirection.z, 0.0, - vOutputDirection.x );

				}

				axis = normalize( axis );

				gl_FragColor = vec4( 0.0, 0.0, 0.0, 1.0 );
				gl_FragColor.rgb += weights[ 0 ] * getSample( 0.0, axis );

				for ( int i = 1; i < n; i++ ) {

					if ( i >= samples ) {

						break;

					}

					float theta = dTheta * float( i );
					gl_FragColor.rgb += weights[ i ] * getSample( -1.0 * theta, axis );
					gl_FragColor.rgb += weights[ i ] * getSample( theta, axis );

				}

			}
		`,blending:ci,depthTest:!1,depthWrite:!1})}function Ru(){return new pi({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:ec(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,blending:ci,depthTest:!1,depthWrite:!1})}function Cu(){return new pi({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:ec(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:ci,depthTest:!1,depthWrite:!1})}function ec(){return`

		precision mediump float;
		precision mediump int;

		attribute float faceIndex;

		varying vec3 vOutputDirection;

		// RH coordinate system; PMREM face-indexing convention
		vec3 getDirection( vec2 uv, float face ) {

			uv = 2.0 * uv - 1.0;

			vec3 direction = vec3( uv, 1.0 );

			if ( face == 0.0 ) {

				direction = direction.zyx; // ( 1, v, u ) pos x

			} else if ( face == 1.0 ) {

				direction = direction.xzy;
				direction.xz *= -1.0; // ( -u, 1, -v ) pos y

			} else if ( face == 2.0 ) {

				direction.x *= -1.0; // ( -u, v, 1 ) pos z

			} else if ( face == 3.0 ) {

				direction = direction.zyx;
				direction.xz *= -1.0; // ( -1, v, -u ) neg x

			} else if ( face == 4.0 ) {

				direction = direction.xzy;
				direction.xy *= -1.0; // ( -u, -1, v ) neg y

			} else if ( face == 5.0 ) {

				direction.z *= -1.0; // ( u, v, -1 ) neg z

			}

			return direction;

		}

		void main() {

			vOutputDirection = getDirection( uv, faceIndex );
			gl_Position = vec4( position, 1.0 );

		}
	`}function ay(n){let e=new WeakMap,t=null;function i(a){if(a&&a.isTexture){const l=a.mapping,c=l===ka||l===za,u=l===_r||l===vr;if(c||u){let f=e.get(a);const d=f!==void 0?f.texture.pmremVersion:0;if(a.isRenderTargetTexture&&a.pmremVersion!==d)return t===null&&(t=new Au(n)),f=c?t.fromEquirectangular(a,f):t.fromCubemap(a,f),f.texture.pmremVersion=a.pmremVersion,e.set(a,f),f.texture;if(f!==void 0)return f.texture;{const p=a.image;return c&&p&&p.height>0||u&&p&&r(p)?(t===null&&(t=new Au(n)),f=c?t.fromEquirectangular(a):t.fromCubemap(a),f.texture.pmremVersion=a.pmremVersion,e.set(a,f),a.addEventListener("dispose",s),f.texture):null}}}return a}function r(a){let l=0;const c=6;for(let u=0;u<c;u++)a[u]!==void 0&&l++;return l===c}function s(a){const l=a.target;l.removeEventListener("dispose",s);const c=e.get(l);c!==void 0&&(e.delete(l),c.dispose())}function o(){e=new WeakMap,t!==null&&(t.dispose(),t=null)}return{get:i,dispose:o}}function ly(n){const e={};function t(i){if(e[i]!==void 0)return e[i];let r;switch(i){case"WEBGL_depth_texture":r=n.getExtension("WEBGL_depth_texture")||n.getExtension("MOZ_WEBGL_depth_texture")||n.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":r=n.getExtension("EXT_texture_filter_anisotropic")||n.getExtension("MOZ_EXT_texture_filter_anisotropic")||n.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":r=n.getExtension("WEBGL_compressed_texture_s3tc")||n.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||n.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":r=n.getExtension("WEBGL_compressed_texture_pvrtc")||n.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:r=n.getExtension(i)}return e[i]=r,r}return{has:function(i){return t(i)!==null},init:function(){t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance"),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture"),t("WEBGL_render_shared_exponent")},get:function(i){const r=t(i);return r===null&&is("THREE.WebGLRenderer: "+i+" extension not supported."),r}}}function cy(n,e,t,i){const r={},s=new WeakMap;function o(f){const d=f.target;d.index!==null&&e.remove(d.index);for(const v in d.attributes)e.remove(d.attributes[v]);d.removeEventListener("dispose",o),delete r[d.id];const p=s.get(d);p&&(e.remove(p),s.delete(d)),i.releaseStatesOfGeometry(d),d.isInstancedBufferGeometry===!0&&delete d._maxInstanceCount,t.memory.geometries--}function a(f,d){return r[d.id]===!0||(d.addEventListener("dispose",o),r[d.id]=!0,t.memory.geometries++),d}function l(f){const d=f.attributes;for(const p in d)e.update(d[p],n.ARRAY_BUFFER)}function c(f){const d=[],p=f.index,v=f.attributes.position;let x=0;if(p!==null){const w=p.array;x=p.version;for(let T=0,M=w.length;T<M;T+=3){const C=w[T+0],D=w[T+1],R=w[T+2];d.push(C,D,D,R,R,C)}}else if(v!==void 0){const w=v.array;x=v.version;for(let T=0,M=w.length/3-1;T<M;T+=3){const C=T+0,D=T+1,R=T+2;d.push(C,D,D,R,R,C)}}else return;const m=new(Ld(d)?Bd:Od)(d,1);m.version=x;const h=s.get(f);h&&e.remove(h),s.set(f,m)}function u(f){const d=s.get(f);if(d){const p=f.index;p!==null&&d.version<p.version&&c(f)}else c(f);return s.get(f)}return{get:a,update:l,getWireframeAttribute:u}}function uy(n,e,t){let i;function r(d){i=d}let s,o;function a(d){s=d.type,o=d.bytesPerElement}function l(d,p){n.drawElements(i,p,s,d*o),t.update(p,i,1)}function c(d,p,v){v!==0&&(n.drawElementsInstanced(i,p,s,d*o,v),t.update(p,i,v))}function u(d,p,v){if(v===0)return;e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(i,p,0,s,d,0,v);let m=0;for(let h=0;h<v;h++)m+=p[h];t.update(m,i,1)}function f(d,p,v,x){if(v===0)return;const m=e.get("WEBGL_multi_draw");if(m===null)for(let h=0;h<d.length;h++)c(d[h]/o,p[h],x[h]);else{m.multiDrawElementsInstancedWEBGL(i,p,0,s,d,0,x,0,v);let h=0;for(let w=0;w<v;w++)h+=p[w]*x[w];t.update(h,i,1)}}this.setMode=r,this.setIndex=a,this.render=l,this.renderInstances=c,this.renderMultiDraw=u,this.renderMultiDrawInstances=f}function fy(n){const e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function i(s,o,a){switch(t.calls++,o){case n.TRIANGLES:t.triangles+=a*(s/3);break;case n.LINES:t.lines+=a*(s/2);break;case n.LINE_STRIP:t.lines+=a*(s-1);break;case n.LINE_LOOP:t.lines+=a*s;break;case n.POINTS:t.points+=a*s;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",o);break}}function r(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:r,update:i}}function dy(n,e,t){const i=new WeakMap,r=new St;function s(o,a,l){const c=o.morphTargetInfluences,u=a.morphAttributes.position||a.morphAttributes.normal||a.morphAttributes.color,f=u!==void 0?u.length:0;let d=i.get(a);if(d===void 0||d.count!==f){let E=function(){k.dispose(),i.delete(a),a.removeEventListener("dispose",E)};var p=E;d!==void 0&&d.texture.dispose();const v=a.morphAttributes.position!==void 0,x=a.morphAttributes.normal!==void 0,m=a.morphAttributes.color!==void 0,h=a.morphAttributes.position||[],w=a.morphAttributes.normal||[],T=a.morphAttributes.color||[];let M=0;v===!0&&(M=1),x===!0&&(M=2),m===!0&&(M=3);let C=a.attributes.position.count*M,D=1;C>e.maxTextureSize&&(D=Math.ceil(C/e.maxTextureSize),C=e.maxTextureSize);const R=new Float32Array(C*D*4*f),k=new Ud(R,C,D,f);k.type=Gn,k.needsUpdate=!0;const b=M*4;for(let L=0;L<f;L++){const X=h[L],K=w[L],le=T[L],ie=C*D*4*L;for(let J=0;J<X.count;J++){const Q=J*b;v===!0&&(r.fromBufferAttribute(X,J),R[ie+Q+0]=r.x,R[ie+Q+1]=r.y,R[ie+Q+2]=r.z,R[ie+Q+3]=0),x===!0&&(r.fromBufferAttribute(K,J),R[ie+Q+4]=r.x,R[ie+Q+5]=r.y,R[ie+Q+6]=r.z,R[ie+Q+7]=0),m===!0&&(r.fromBufferAttribute(le,J),R[ie+Q+8]=r.x,R[ie+Q+9]=r.y,R[ie+Q+10]=r.z,R[ie+Q+11]=le.itemSize===4?r.w:1)}}d={count:f,texture:k,size:new ct(C,D)},i.set(a,d),a.addEventListener("dispose",E)}if(o.isInstancedMesh===!0&&o.morphTexture!==null)l.getUniforms().setValue(n,"morphTexture",o.morphTexture,t);else{let v=0;for(let m=0;m<c.length;m++)v+=c[m];const x=a.morphTargetsRelative?1:1-v;l.getUniforms().setValue(n,"morphTargetBaseInfluence",x),l.getUniforms().setValue(n,"morphTargetInfluences",c)}l.getUniforms().setValue(n,"morphTargetsTexture",d.texture,t),l.getUniforms().setValue(n,"morphTargetsTextureSize",d.size)}return{update:s}}function hy(n,e,t,i){let r=new WeakMap;function s(l){const c=i.render.frame,u=l.geometry,f=e.get(l,u);if(r.get(f)!==c&&(e.update(f),r.set(f,c)),l.isInstancedMesh&&(l.hasEventListener("dispose",a)===!1&&l.addEventListener("dispose",a),r.get(l)!==c&&(t.update(l.instanceMatrix,n.ARRAY_BUFFER),l.instanceColor!==null&&t.update(l.instanceColor,n.ARRAY_BUFFER),r.set(l,c))),l.isSkinnedMesh){const d=l.skeleton;r.get(d)!==c&&(d.update(),r.set(d,c))}return f}function o(){r=new WeakMap}function a(l){const c=l.target;c.removeEventListener("dispose",a),t.remove(c.instanceMatrix),c.instanceColor!==null&&t.remove(c.instanceColor)}return{update:s,dispose:o}}const jd=new qt,Pu=new Gd(1,1),qd=new Ud,Yd=new V_,$d=new Hd,Du=[],Iu=[],Lu=new Float32Array(16),Uu=new Float32Array(9),Nu=new Float32Array(4);function Er(n,e,t){const i=n[0];if(i<=0||i>0)return n;const r=e*t;let s=Du[r];if(s===void 0&&(s=new Float32Array(r),Du[r]=s),e!==0){i.toArray(s,0);for(let o=1,a=0;o!==e;++o)a+=t,n[o].toArray(s,a)}return s}function wt(n,e){if(n.length!==e.length)return!1;for(let t=0,i=n.length;t<i;t++)if(n[t]!==e[t])return!1;return!0}function Rt(n,e){for(let t=0,i=e.length;t<i;t++)n[t]=e[t]}function Eo(n,e){let t=Iu[e];t===void 0&&(t=new Int32Array(e),Iu[e]=t);for(let i=0;i!==e;++i)t[i]=n.allocateTextureUnit();return t}function py(n,e){const t=this.cache;t[0]!==e&&(n.uniform1f(this.addr,e),t[0]=e)}function my(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(n.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(wt(t,e))return;n.uniform2fv(this.addr,e),Rt(t,e)}}function gy(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(n.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(n.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(wt(t,e))return;n.uniform3fv(this.addr,e),Rt(t,e)}}function _y(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(n.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(wt(t,e))return;n.uniform4fv(this.addr,e),Rt(t,e)}}function vy(n,e){const t=this.cache,i=e.elements;if(i===void 0){if(wt(t,e))return;n.uniformMatrix2fv(this.addr,!1,e),Rt(t,e)}else{if(wt(t,i))return;Nu.set(i),n.uniformMatrix2fv(this.addr,!1,Nu),Rt(t,i)}}function xy(n,e){const t=this.cache,i=e.elements;if(i===void 0){if(wt(t,e))return;n.uniformMatrix3fv(this.addr,!1,e),Rt(t,e)}else{if(wt(t,i))return;Uu.set(i),n.uniformMatrix3fv(this.addr,!1,Uu),Rt(t,i)}}function yy(n,e){const t=this.cache,i=e.elements;if(i===void 0){if(wt(t,e))return;n.uniformMatrix4fv(this.addr,!1,e),Rt(t,e)}else{if(wt(t,i))return;Lu.set(i),n.uniformMatrix4fv(this.addr,!1,Lu),Rt(t,i)}}function Sy(n,e){const t=this.cache;t[0]!==e&&(n.uniform1i(this.addr,e),t[0]=e)}function My(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(n.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(wt(t,e))return;n.uniform2iv(this.addr,e),Rt(t,e)}}function Ey(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(n.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(wt(t,e))return;n.uniform3iv(this.addr,e),Rt(t,e)}}function by(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(n.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(wt(t,e))return;n.uniform4iv(this.addr,e),Rt(t,e)}}function Ty(n,e){const t=this.cache;t[0]!==e&&(n.uniform1ui(this.addr,e),t[0]=e)}function Ay(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(n.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(wt(t,e))return;n.uniform2uiv(this.addr,e),Rt(t,e)}}function wy(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(n.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(wt(t,e))return;n.uniform3uiv(this.addr,e),Rt(t,e)}}function Ry(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(n.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(wt(t,e))return;n.uniform4uiv(this.addr,e),Rt(t,e)}}function Cy(n,e,t){const i=this.cache,r=t.allocateTextureUnit();i[0]!==r&&(n.uniform1i(this.addr,r),i[0]=r);let s;this.type===n.SAMPLER_2D_SHADOW?(Pu.compareFunction=Id,s=Pu):s=jd,t.setTexture2D(e||s,r)}function Py(n,e,t){const i=this.cache,r=t.allocateTextureUnit();i[0]!==r&&(n.uniform1i(this.addr,r),i[0]=r),t.setTexture3D(e||Yd,r)}function Dy(n,e,t){const i=this.cache,r=t.allocateTextureUnit();i[0]!==r&&(n.uniform1i(this.addr,r),i[0]=r),t.setTextureCube(e||$d,r)}function Iy(n,e,t){const i=this.cache,r=t.allocateTextureUnit();i[0]!==r&&(n.uniform1i(this.addr,r),i[0]=r),t.setTexture2DArray(e||qd,r)}function Ly(n){switch(n){case 5126:return py;case 35664:return my;case 35665:return gy;case 35666:return _y;case 35674:return vy;case 35675:return xy;case 35676:return yy;case 5124:case 35670:return Sy;case 35667:case 35671:return My;case 35668:case 35672:return Ey;case 35669:case 35673:return by;case 5125:return Ty;case 36294:return Ay;case 36295:return wy;case 36296:return Ry;case 35678:case 36198:case 36298:case 36306:case 35682:return Cy;case 35679:case 36299:case 36307:return Py;case 35680:case 36300:case 36308:case 36293:return Dy;case 36289:case 36303:case 36311:case 36292:return Iy}}function Uy(n,e){n.uniform1fv(this.addr,e)}function Ny(n,e){const t=Er(e,this.size,2);n.uniform2fv(this.addr,t)}function Fy(n,e){const t=Er(e,this.size,3);n.uniform3fv(this.addr,t)}function Oy(n,e){const t=Er(e,this.size,4);n.uniform4fv(this.addr,t)}function By(n,e){const t=Er(e,this.size,4);n.uniformMatrix2fv(this.addr,!1,t)}function ky(n,e){const t=Er(e,this.size,9);n.uniformMatrix3fv(this.addr,!1,t)}function zy(n,e){const t=Er(e,this.size,16);n.uniformMatrix4fv(this.addr,!1,t)}function Hy(n,e){n.uniform1iv(this.addr,e)}function Vy(n,e){n.uniform2iv(this.addr,e)}function Gy(n,e){n.uniform3iv(this.addr,e)}function Wy(n,e){n.uniform4iv(this.addr,e)}function Xy(n,e){n.uniform1uiv(this.addr,e)}function jy(n,e){n.uniform2uiv(this.addr,e)}function qy(n,e){n.uniform3uiv(this.addr,e)}function Yy(n,e){n.uniform4uiv(this.addr,e)}function $y(n,e,t){const i=this.cache,r=e.length,s=Eo(t,r);wt(i,s)||(n.uniform1iv(this.addr,s),Rt(i,s));for(let o=0;o!==r;++o)t.setTexture2D(e[o]||jd,s[o])}function Ky(n,e,t){const i=this.cache,r=e.length,s=Eo(t,r);wt(i,s)||(n.uniform1iv(this.addr,s),Rt(i,s));for(let o=0;o!==r;++o)t.setTexture3D(e[o]||Yd,s[o])}function Zy(n,e,t){const i=this.cache,r=e.length,s=Eo(t,r);wt(i,s)||(n.uniform1iv(this.addr,s),Rt(i,s));for(let o=0;o!==r;++o)t.setTextureCube(e[o]||$d,s[o])}function Jy(n,e,t){const i=this.cache,r=e.length,s=Eo(t,r);wt(i,s)||(n.uniform1iv(this.addr,s),Rt(i,s));for(let o=0;o!==r;++o)t.setTexture2DArray(e[o]||qd,s[o])}function Qy(n){switch(n){case 5126:return Uy;case 35664:return Ny;case 35665:return Fy;case 35666:return Oy;case 35674:return By;case 35675:return ky;case 35676:return zy;case 5124:case 35670:return Hy;case 35667:case 35671:return Vy;case 35668:case 35672:return Gy;case 35669:case 35673:return Wy;case 5125:return Xy;case 36294:return jy;case 36295:return qy;case 36296:return Yy;case 35678:case 36198:case 36298:case 36306:case 35682:return $y;case 35679:case 36299:case 36307:return Ky;case 35680:case 36300:case 36308:case 36293:return Zy;case 36289:case 36303:case 36311:case 36292:return Jy}}class eS{constructor(e,t,i){this.id=e,this.addr=i,this.cache=[],this.type=t.type,this.setValue=Ly(t.type)}}class tS{constructor(e,t,i){this.id=e,this.addr=i,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=Qy(t.type)}}class nS{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,i){const r=this.seq;for(let s=0,o=r.length;s!==o;++s){const a=r[s];a.setValue(e,t[a.id],i)}}}const ma=/(\w+)(\])?(\[|\.)?/g;function Fu(n,e){n.seq.push(e),n.map[e.id]=e}function iS(n,e,t){const i=n.name,r=i.length;for(ma.lastIndex=0;;){const s=ma.exec(i),o=ma.lastIndex;let a=s[1];const l=s[2]==="]",c=s[3];if(l&&(a=a|0),c===void 0||c==="["&&o+2===r){Fu(t,c===void 0?new eS(a,n,e):new tS(a,n,e));break}else{let f=t.map[a];f===void 0&&(f=new nS(a),Fu(t,f)),t=f}}}class qs{constructor(e,t){this.seq=[],this.map={};const i=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let r=0;r<i;++r){const s=e.getActiveUniform(t,r),o=e.getUniformLocation(t,s.name);iS(s,o,this)}}setValue(e,t,i,r){const s=this.map[t];s!==void 0&&s.setValue(e,i,r)}setOptional(e,t,i){const r=t[i];r!==void 0&&this.setValue(e,i,r)}static upload(e,t,i,r){for(let s=0,o=t.length;s!==o;++s){const a=t[s],l=i[a.id];l.needsUpdate!==!1&&a.setValue(e,l.value,r)}}static seqWithValue(e,t){const i=[];for(let r=0,s=e.length;r!==s;++r){const o=e[r];o.id in t&&i.push(o)}return i}}function Ou(n,e,t){const i=n.createShader(e);return n.shaderSource(i,t),n.compileShader(i),i}const rS=37297;let sS=0;function oS(n,e){const t=n.split(`
`),i=[],r=Math.max(e-6,0),s=Math.min(e+6,t.length);for(let o=r;o<s;o++){const a=o+1;i.push(`${a===e?">":" "} ${a}: ${t[o]}`)}return i.join(`
`)}const Bu=new je;function aS(n){Qe._getMatrix(Bu,Qe.workingColorSpace,n);const e=`mat3( ${Bu.elements.map(t=>t.toFixed(4))} )`;switch(Qe.getTransfer(n)){case ro:return[e,"LinearTransferOETF"];case at:return[e,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space: ",n),[e,"LinearTransferOETF"]}}function ku(n,e,t){const i=n.getShaderParameter(e,n.COMPILE_STATUS),s=(n.getShaderInfoLog(e)||"").trim();if(i&&s==="")return"";const o=/ERROR: 0:(\d+)/.exec(s);if(o){const a=parseInt(o[1]);return t.toUpperCase()+`

`+s+`

`+oS(n.getShaderSource(e),a)}else return s}function lS(n,e){const t=aS(e);return[`vec4 ${n}( vec4 value ) {`,`	return ${t[1]}( vec4( value.rgb * ${t[0]}, value.a ) );`,"}"].join(`
`)}function cS(n,e){let t;switch(e){case m_:t="Linear";break;case g_:t="Reinhard";break;case __:t="Cineon";break;case v_:t="ACESFilmic";break;case y_:t="AgX";break;case S_:t="Neutral";break;case x_:t="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",e),t="Linear"}return"vec3 "+n+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}const Os=new q;function uS(){Qe.getLuminanceCoefficients(Os);const n=Os.x.toFixed(4),e=Os.y.toFixed(4),t=Os.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${n}, ${e}, ${t} );`,"	return dot( weights, rgb );","}"].join(`
`)}function fS(n){return[n.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",n.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(Nr).join(`
`)}function dS(n){const e=[];for(const t in n){const i=n[t];i!==!1&&e.push("#define "+t+" "+i)}return e.join(`
`)}function hS(n,e){const t={},i=n.getProgramParameter(e,n.ACTIVE_ATTRIBUTES);for(let r=0;r<i;r++){const s=n.getActiveAttrib(e,r),o=s.name;let a=1;s.type===n.FLOAT_MAT2&&(a=2),s.type===n.FLOAT_MAT3&&(a=3),s.type===n.FLOAT_MAT4&&(a=4),t[o]={type:s.type,location:n.getAttribLocation(e,o),locationSize:a}}return t}function Nr(n){return n!==""}function zu(n,e){const t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return n.replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function Hu(n,e){return n.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}const pS=/^[ \t]*#include +<([\w\d./]+)>/gm;function vl(n){return n.replace(pS,gS)}const mS=new Map;function gS(n,e){let t=qe[e];if(t===void 0){const i=mS.get(e);if(i!==void 0)t=qe[i],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,i);else throw new Error("Can not resolve #include <"+e+">")}return vl(t)}const _S=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function Vu(n){return n.replace(_S,vS)}function vS(n,e,t,i){let r="";for(let s=parseInt(e);s<parseInt(t);s++)r+=i.replace(/\[\s*i\s*\]/g,"[ "+s+" ]").replace(/UNROLLED_LOOP_INDEX/g,s);return r}function Gu(n){let e=`precision ${n.precision} float;
	precision ${n.precision} int;
	precision ${n.precision} sampler2D;
	precision ${n.precision} samplerCube;
	precision ${n.precision} sampler3D;
	precision ${n.precision} sampler2DArray;
	precision ${n.precision} sampler2DShadow;
	precision ${n.precision} samplerCubeShadow;
	precision ${n.precision} sampler2DArrayShadow;
	precision ${n.precision} isampler2D;
	precision ${n.precision} isampler3D;
	precision ${n.precision} isamplerCube;
	precision ${n.precision} isampler2DArray;
	precision ${n.precision} usampler2D;
	precision ${n.precision} usampler3D;
	precision ${n.precision} usamplerCube;
	precision ${n.precision} usampler2DArray;
	`;return n.precision==="highp"?e+=`
#define HIGH_PRECISION`:n.precision==="mediump"?e+=`
#define MEDIUM_PRECISION`:n.precision==="lowp"&&(e+=`
#define LOW_PRECISION`),e}function xS(n){let e="SHADOWMAP_TYPE_BASIC";return n.shadowMapType===Sd?e="SHADOWMAP_TYPE_PCF":n.shadowMapType===Yg?e="SHADOWMAP_TYPE_PCF_SOFT":n.shadowMapType===kn&&(e="SHADOWMAP_TYPE_VSM"),e}function yS(n){let e="ENVMAP_TYPE_CUBE";if(n.envMap)switch(n.envMapMode){case _r:case vr:e="ENVMAP_TYPE_CUBE";break;case yo:e="ENVMAP_TYPE_CUBE_UV";break}return e}function SS(n){let e="ENVMAP_MODE_REFLECTION";if(n.envMap)switch(n.envMapMode){case vr:e="ENVMAP_MODE_REFRACTION";break}return e}function MS(n){let e="ENVMAP_BLENDING_NONE";if(n.envMap)switch(n.combine){case Md:e="ENVMAP_BLENDING_MULTIPLY";break;case h_:e="ENVMAP_BLENDING_MIX";break;case p_:e="ENVMAP_BLENDING_ADD";break}return e}function ES(n){const e=n.envMapCubeUVHeight;if(e===null)return null;const t=Math.log2(e)-2,i=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,t),112)),texelHeight:i,maxMip:t}}function bS(n,e,t,i){const r=n.getContext(),s=t.defines;let o=t.vertexShader,a=t.fragmentShader;const l=xS(t),c=yS(t),u=SS(t),f=MS(t),d=ES(t),p=fS(t),v=dS(s),x=r.createProgram();let m,h,w=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(m=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,v].filter(Nr).join(`
`),m.length>0&&(m+=`
`),h=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,v].filter(Nr).join(`
`),h.length>0&&(h+=`
`)):(m=[Gu(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,v,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.batchingColor?"#define USE_BATCHING_COLOR":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.instancingMorph?"#define USE_INSTANCING_MORPH":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+u:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(Nr).join(`
`),h=[Gu(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,v,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+c:"",t.envMap?"#define "+u:"",t.envMap?"#define "+f:"",d?"#define CUBEUV_TEXEL_WIDTH "+d.texelWidth:"",d?"#define CUBEUV_TEXEL_HEIGHT "+d.texelHeight:"",d?"#define CUBEUV_MAX_MIP "+d.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.dispersion?"#define USE_DISPERSION":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor||t.batchingColor?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==ui?"#define TONE_MAPPING":"",t.toneMapping!==ui?qe.tonemapping_pars_fragment:"",t.toneMapping!==ui?cS("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",qe.colorspace_pars_fragment,lS("linearToOutputTexel",t.outputColorSpace),uS(),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(Nr).join(`
`)),o=vl(o),o=zu(o,t),o=Hu(o,t),a=vl(a),a=zu(a,t),a=Hu(a,t),o=Vu(o),a=Vu(a),t.isRawShaderMaterial!==!0&&(w=`#version 300 es
`,m=[p,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+m,h=["#define varying in",t.glslVersion===ru?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===ru?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+h);const T=w+m+o,M=w+h+a,C=Ou(r,r.VERTEX_SHADER,T),D=Ou(r,r.FRAGMENT_SHADER,M);r.attachShader(x,C),r.attachShader(x,D),t.index0AttributeName!==void 0?r.bindAttribLocation(x,0,t.index0AttributeName):t.morphTargets===!0&&r.bindAttribLocation(x,0,"position"),r.linkProgram(x);function R(L){if(n.debug.checkShaderErrors){const X=r.getProgramInfoLog(x)||"",K=r.getShaderInfoLog(C)||"",le=r.getShaderInfoLog(D)||"",ie=X.trim(),J=K.trim(),Q=le.trim();let z=!0,me=!0;if(r.getProgramParameter(x,r.LINK_STATUS)===!1)if(z=!1,typeof n.debug.onShaderError=="function")n.debug.onShaderError(r,x,C,D);else{const ve=ku(r,C,"vertex"),Re=ku(r,D,"fragment");console.error("THREE.WebGLProgram: Shader Error "+r.getError()+" - VALIDATE_STATUS "+r.getProgramParameter(x,r.VALIDATE_STATUS)+`

Material Name: `+L.name+`
Material Type: `+L.type+`

Program Info Log: `+ie+`
`+ve+`
`+Re)}else ie!==""?console.warn("THREE.WebGLProgram: Program Info Log:",ie):(J===""||Q==="")&&(me=!1);me&&(L.diagnostics={runnable:z,programLog:ie,vertexShader:{log:J,prefix:m},fragmentShader:{log:Q,prefix:h}})}r.deleteShader(C),r.deleteShader(D),k=new qs(r,x),b=hS(r,x)}let k;this.getUniforms=function(){return k===void 0&&R(this),k};let b;this.getAttributes=function(){return b===void 0&&R(this),b};let E=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return E===!1&&(E=r.getProgramParameter(x,rS)),E},this.destroy=function(){i.releaseStatesOfProgram(this),r.deleteProgram(x),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=sS++,this.cacheKey=e,this.usedTimes=1,this.program=x,this.vertexShader=C,this.fragmentShader=D,this}let TS=0;class AS{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e){const t=e.vertexShader,i=e.fragmentShader,r=this._getShaderStage(t),s=this._getShaderStage(i),o=this._getShaderCacheForMaterial(e);return o.has(r)===!1&&(o.add(r),r.usedTimes++),o.has(s)===!1&&(o.add(s),s.usedTimes++),this}remove(e){const t=this.materialCache.get(e);for(const i of t)i.usedTimes--,i.usedTimes===0&&this.shaderCache.delete(i.code);return this.materialCache.delete(e),this}getVertexShaderID(e){return this._getShaderStage(e.vertexShader).id}getFragmentShaderID(e){return this._getShaderStage(e.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){const t=this.materialCache;let i=t.get(e);return i===void 0&&(i=new Set,t.set(e,i)),i}_getShaderStage(e){const t=this.shaderCache;let i=t.get(e);return i===void 0&&(i=new wS(e),t.set(e,i)),i}}class wS{constructor(e){this.id=TS++,this.code=e,this.usedTimes=0}}function RS(n,e,t,i,r,s,o){const a=new Nd,l=new AS,c=new Set,u=[],f=r.logarithmicDepthBuffer,d=r.vertexTextures;let p=r.precision;const v={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function x(b){return c.add(b),b===0?"uv":`uv${b}`}function m(b,E,L,X,K){const le=X.fog,ie=K.geometry,J=b.isMeshStandardMaterial?X.environment:null,Q=(b.isMeshStandardMaterial?t:e).get(b.envMap||J),z=Q&&Q.mapping===yo?Q.image.height:null,me=v[b.type];b.precision!==null&&(p=r.getMaxPrecision(b.precision),p!==b.precision&&console.warn("THREE.WebGLProgram.getParameters:",b.precision,"not supported, using",p,"instead."));const ve=ie.morphAttributes.position||ie.morphAttributes.normal||ie.morphAttributes.color,Re=ve!==void 0?ve.length:0;let Oe=0;ie.morphAttributes.position!==void 0&&(Oe=1),ie.morphAttributes.normal!==void 0&&(Oe=2),ie.morphAttributes.color!==void 0&&(Oe=3);let Ze,et,$e,te;if(me){const nt=En[me];Ze=nt.vertexShader,et=nt.fragmentShader}else Ze=b.vertexShader,et=b.fragmentShader,l.update(b),$e=l.getVertexShaderID(b),te=l.getFragmentShaderID(b);const P=n.getRenderTarget(),Z=n.state.buffers.depth.getReversed(),re=K.isInstancedMesh===!0,se=K.isBatchedMesh===!0,Ie=!!b.map,A=!!b.matcap,g=!!Q,N=!!b.aoMap,H=!!b.lightMap,V=!!b.bumpMap,F=!!b.normalMap,ce=!!b.displacementMap,Y=!!b.emissiveMap,ne=!!b.metalnessMap,oe=!!b.roughnessMap,Se=b.anisotropy>0,y=b.clearcoat>0,_=b.dispersion>0,I=b.iridescence>0,G=b.sheen>0,ee=b.transmission>0,W=Se&&!!b.anisotropyMap,Ee=y&&!!b.clearcoatMap,ue=y&&!!b.clearcoatNormalMap,be=y&&!!b.clearcoatRoughnessMap,Te=I&&!!b.iridescenceMap,fe=I&&!!b.iridescenceThicknessMap,ye=G&&!!b.sheenColorMap,Le=G&&!!b.sheenRoughnessMap,Ae=!!b.specularMap,_e=!!b.specularColorMap,Ve=!!b.specularIntensityMap,U=ee&&!!b.transmissionMap,pe=ee&&!!b.thicknessMap,ge=!!b.gradientMap,De=!!b.alphaMap,de=b.alphaTest>0,ae=!!b.alphaHash,Ne=!!b.extensions;let We=ui;b.toneMapped&&(P===null||P.isXRRenderTarget===!0)&&(We=n.toneMapping);const ft={shaderID:me,shaderType:b.type,shaderName:b.name,vertexShader:Ze,fragmentShader:et,defines:b.defines,customVertexShaderID:$e,customFragmentShaderID:te,isRawShaderMaterial:b.isRawShaderMaterial===!0,glslVersion:b.glslVersion,precision:p,batching:se,batchingColor:se&&K._colorsTexture!==null,instancing:re,instancingColor:re&&K.instanceColor!==null,instancingMorph:re&&K.morphTexture!==null,supportsVertexTextures:d,outputColorSpace:P===null?n.outputColorSpace:P.isXRRenderTarget===!0?P.texture.colorSpace:xr,alphaToCoverage:!!b.alphaToCoverage,map:Ie,matcap:A,envMap:g,envMapMode:g&&Q.mapping,envMapCubeUVHeight:z,aoMap:N,lightMap:H,bumpMap:V,normalMap:F,displacementMap:d&&ce,emissiveMap:Y,normalMapObjectSpace:F&&b.normalMapType===A_,normalMapTangentSpace:F&&b.normalMapType===T_,metalnessMap:ne,roughnessMap:oe,anisotropy:Se,anisotropyMap:W,clearcoat:y,clearcoatMap:Ee,clearcoatNormalMap:ue,clearcoatRoughnessMap:be,dispersion:_,iridescence:I,iridescenceMap:Te,iridescenceThicknessMap:fe,sheen:G,sheenColorMap:ye,sheenRoughnessMap:Le,specularMap:Ae,specularColorMap:_e,specularIntensityMap:Ve,transmission:ee,transmissionMap:U,thicknessMap:pe,gradientMap:ge,opaque:b.transparent===!1&&b.blending===fr&&b.alphaToCoverage===!1,alphaMap:De,alphaTest:de,alphaHash:ae,combine:b.combine,mapUv:Ie&&x(b.map.channel),aoMapUv:N&&x(b.aoMap.channel),lightMapUv:H&&x(b.lightMap.channel),bumpMapUv:V&&x(b.bumpMap.channel),normalMapUv:F&&x(b.normalMap.channel),displacementMapUv:ce&&x(b.displacementMap.channel),emissiveMapUv:Y&&x(b.emissiveMap.channel),metalnessMapUv:ne&&x(b.metalnessMap.channel),roughnessMapUv:oe&&x(b.roughnessMap.channel),anisotropyMapUv:W&&x(b.anisotropyMap.channel),clearcoatMapUv:Ee&&x(b.clearcoatMap.channel),clearcoatNormalMapUv:ue&&x(b.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:be&&x(b.clearcoatRoughnessMap.channel),iridescenceMapUv:Te&&x(b.iridescenceMap.channel),iridescenceThicknessMapUv:fe&&x(b.iridescenceThicknessMap.channel),sheenColorMapUv:ye&&x(b.sheenColorMap.channel),sheenRoughnessMapUv:Le&&x(b.sheenRoughnessMap.channel),specularMapUv:Ae&&x(b.specularMap.channel),specularColorMapUv:_e&&x(b.specularColorMap.channel),specularIntensityMapUv:Ve&&x(b.specularIntensityMap.channel),transmissionMapUv:U&&x(b.transmissionMap.channel),thicknessMapUv:pe&&x(b.thicknessMap.channel),alphaMapUv:De&&x(b.alphaMap.channel),vertexTangents:!!ie.attributes.tangent&&(F||Se),vertexColors:b.vertexColors,vertexAlphas:b.vertexColors===!0&&!!ie.attributes.color&&ie.attributes.color.itemSize===4,pointsUvs:K.isPoints===!0&&!!ie.attributes.uv&&(Ie||De),fog:!!le,useFog:b.fog===!0,fogExp2:!!le&&le.isFogExp2,flatShading:b.flatShading===!0&&b.wireframe===!1,sizeAttenuation:b.sizeAttenuation===!0,logarithmicDepthBuffer:f,reversedDepthBuffer:Z,skinning:K.isSkinnedMesh===!0,morphTargets:ie.morphAttributes.position!==void 0,morphNormals:ie.morphAttributes.normal!==void 0,morphColors:ie.morphAttributes.color!==void 0,morphTargetsCount:Re,morphTextureStride:Oe,numDirLights:E.directional.length,numPointLights:E.point.length,numSpotLights:E.spot.length,numSpotLightMaps:E.spotLightMap.length,numRectAreaLights:E.rectArea.length,numHemiLights:E.hemi.length,numDirLightShadows:E.directionalShadowMap.length,numPointLightShadows:E.pointShadowMap.length,numSpotLightShadows:E.spotShadowMap.length,numSpotLightShadowsWithMaps:E.numSpotLightShadowsWithMaps,numLightProbes:E.numLightProbes,numClippingPlanes:o.numPlanes,numClipIntersection:o.numIntersection,dithering:b.dithering,shadowMapEnabled:n.shadowMap.enabled&&L.length>0,shadowMapType:n.shadowMap.type,toneMapping:We,decodeVideoTexture:Ie&&b.map.isVideoTexture===!0&&Qe.getTransfer(b.map.colorSpace)===at,decodeVideoTextureEmissive:Y&&b.emissiveMap.isVideoTexture===!0&&Qe.getTransfer(b.emissiveMap.colorSpace)===at,premultipliedAlpha:b.premultipliedAlpha,doubleSided:b.side===Vn,flipSided:b.side===jt,useDepthPacking:b.depthPacking>=0,depthPacking:b.depthPacking||0,index0AttributeName:b.index0AttributeName,extensionClipCullDistance:Ne&&b.extensions.clipCullDistance===!0&&i.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(Ne&&b.extensions.multiDraw===!0||se)&&i.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:i.has("KHR_parallel_shader_compile"),customProgramCacheKey:b.customProgramCacheKey()};return ft.vertexUv1s=c.has(1),ft.vertexUv2s=c.has(2),ft.vertexUv3s=c.has(3),c.clear(),ft}function h(b){const E=[];if(b.shaderID?E.push(b.shaderID):(E.push(b.customVertexShaderID),E.push(b.customFragmentShaderID)),b.defines!==void 0)for(const L in b.defines)E.push(L),E.push(b.defines[L]);return b.isRawShaderMaterial===!1&&(w(E,b),T(E,b),E.push(n.outputColorSpace)),E.push(b.customProgramCacheKey),E.join()}function w(b,E){b.push(E.precision),b.push(E.outputColorSpace),b.push(E.envMapMode),b.push(E.envMapCubeUVHeight),b.push(E.mapUv),b.push(E.alphaMapUv),b.push(E.lightMapUv),b.push(E.aoMapUv),b.push(E.bumpMapUv),b.push(E.normalMapUv),b.push(E.displacementMapUv),b.push(E.emissiveMapUv),b.push(E.metalnessMapUv),b.push(E.roughnessMapUv),b.push(E.anisotropyMapUv),b.push(E.clearcoatMapUv),b.push(E.clearcoatNormalMapUv),b.push(E.clearcoatRoughnessMapUv),b.push(E.iridescenceMapUv),b.push(E.iridescenceThicknessMapUv),b.push(E.sheenColorMapUv),b.push(E.sheenRoughnessMapUv),b.push(E.specularMapUv),b.push(E.specularColorMapUv),b.push(E.specularIntensityMapUv),b.push(E.transmissionMapUv),b.push(E.thicknessMapUv),b.push(E.combine),b.push(E.fogExp2),b.push(E.sizeAttenuation),b.push(E.morphTargetsCount),b.push(E.morphAttributeCount),b.push(E.numDirLights),b.push(E.numPointLights),b.push(E.numSpotLights),b.push(E.numSpotLightMaps),b.push(E.numHemiLights),b.push(E.numRectAreaLights),b.push(E.numDirLightShadows),b.push(E.numPointLightShadows),b.push(E.numSpotLightShadows),b.push(E.numSpotLightShadowsWithMaps),b.push(E.numLightProbes),b.push(E.shadowMapType),b.push(E.toneMapping),b.push(E.numClippingPlanes),b.push(E.numClipIntersection),b.push(E.depthPacking)}function T(b,E){a.disableAll(),E.supportsVertexTextures&&a.enable(0),E.instancing&&a.enable(1),E.instancingColor&&a.enable(2),E.instancingMorph&&a.enable(3),E.matcap&&a.enable(4),E.envMap&&a.enable(5),E.normalMapObjectSpace&&a.enable(6),E.normalMapTangentSpace&&a.enable(7),E.clearcoat&&a.enable(8),E.iridescence&&a.enable(9),E.alphaTest&&a.enable(10),E.vertexColors&&a.enable(11),E.vertexAlphas&&a.enable(12),E.vertexUv1s&&a.enable(13),E.vertexUv2s&&a.enable(14),E.vertexUv3s&&a.enable(15),E.vertexTangents&&a.enable(16),E.anisotropy&&a.enable(17),E.alphaHash&&a.enable(18),E.batching&&a.enable(19),E.dispersion&&a.enable(20),E.batchingColor&&a.enable(21),E.gradientMap&&a.enable(22),b.push(a.mask),a.disableAll(),E.fog&&a.enable(0),E.useFog&&a.enable(1),E.flatShading&&a.enable(2),E.logarithmicDepthBuffer&&a.enable(3),E.reversedDepthBuffer&&a.enable(4),E.skinning&&a.enable(5),E.morphTargets&&a.enable(6),E.morphNormals&&a.enable(7),E.morphColors&&a.enable(8),E.premultipliedAlpha&&a.enable(9),E.shadowMapEnabled&&a.enable(10),E.doubleSided&&a.enable(11),E.flipSided&&a.enable(12),E.useDepthPacking&&a.enable(13),E.dithering&&a.enable(14),E.transmission&&a.enable(15),E.sheen&&a.enable(16),E.opaque&&a.enable(17),E.pointsUvs&&a.enable(18),E.decodeVideoTexture&&a.enable(19),E.decodeVideoTextureEmissive&&a.enable(20),E.alphaToCoverage&&a.enable(21),b.push(a.mask)}function M(b){const E=v[b.type];let L;if(E){const X=En[E];L=nv.clone(X.uniforms)}else L=b.uniforms;return L}function C(b,E){let L;for(let X=0,K=u.length;X<K;X++){const le=u[X];if(le.cacheKey===E){L=le,++L.usedTimes;break}}return L===void 0&&(L=new bS(n,E,b,s),u.push(L)),L}function D(b){if(--b.usedTimes===0){const E=u.indexOf(b);u[E]=u[u.length-1],u.pop(),b.destroy()}}function R(b){l.remove(b)}function k(){l.dispose()}return{getParameters:m,getProgramCacheKey:h,getUniforms:M,acquireProgram:C,releaseProgram:D,releaseShaderCache:R,programs:u,dispose:k}}function CS(){let n=new WeakMap;function e(o){return n.has(o)}function t(o){let a=n.get(o);return a===void 0&&(a={},n.set(o,a)),a}function i(o){n.delete(o)}function r(o,a,l){n.get(o)[a]=l}function s(){n=new WeakMap}return{has:e,get:t,remove:i,update:r,dispose:s}}function PS(n,e){return n.groupOrder!==e.groupOrder?n.groupOrder-e.groupOrder:n.renderOrder!==e.renderOrder?n.renderOrder-e.renderOrder:n.material.id!==e.material.id?n.material.id-e.material.id:n.z!==e.z?n.z-e.z:n.id-e.id}function Wu(n,e){return n.groupOrder!==e.groupOrder?n.groupOrder-e.groupOrder:n.renderOrder!==e.renderOrder?n.renderOrder-e.renderOrder:n.z!==e.z?e.z-n.z:n.id-e.id}function Xu(){const n=[];let e=0;const t=[],i=[],r=[];function s(){e=0,t.length=0,i.length=0,r.length=0}function o(f,d,p,v,x,m){let h=n[e];return h===void 0?(h={id:f.id,object:f,geometry:d,material:p,groupOrder:v,renderOrder:f.renderOrder,z:x,group:m},n[e]=h):(h.id=f.id,h.object=f,h.geometry=d,h.material=p,h.groupOrder=v,h.renderOrder=f.renderOrder,h.z=x,h.group=m),e++,h}function a(f,d,p,v,x,m){const h=o(f,d,p,v,x,m);p.transmission>0?i.push(h):p.transparent===!0?r.push(h):t.push(h)}function l(f,d,p,v,x,m){const h=o(f,d,p,v,x,m);p.transmission>0?i.unshift(h):p.transparent===!0?r.unshift(h):t.unshift(h)}function c(f,d){t.length>1&&t.sort(f||PS),i.length>1&&i.sort(d||Wu),r.length>1&&r.sort(d||Wu)}function u(){for(let f=e,d=n.length;f<d;f++){const p=n[f];if(p.id===null)break;p.id=null,p.object=null,p.geometry=null,p.material=null,p.group=null}}return{opaque:t,transmissive:i,transparent:r,init:s,push:a,unshift:l,finish:u,sort:c}}function DS(){let n=new WeakMap;function e(i,r){const s=n.get(i);let o;return s===void 0?(o=new Xu,n.set(i,[o])):r>=s.length?(o=new Xu,s.push(o)):o=s[r],o}function t(){n=new WeakMap}return{get:e,dispose:t}}function IS(){const n={};return{get:function(e){if(n[e.id]!==void 0)return n[e.id];let t;switch(e.type){case"DirectionalLight":t={direction:new q,color:new lt};break;case"SpotLight":t={position:new q,direction:new q,color:new lt,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new q,color:new lt,distance:0,decay:0};break;case"HemisphereLight":t={direction:new q,skyColor:new lt,groundColor:new lt};break;case"RectAreaLight":t={color:new lt,position:new q,halfWidth:new q,halfHeight:new q};break}return n[e.id]=t,t}}}function LS(){const n={};return{get:function(e){if(n[e.id]!==void 0)return n[e.id];let t;switch(e.type){case"DirectionalLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ct};break;case"SpotLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ct};break;case"PointLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ct,shadowCameraNear:1,shadowCameraFar:1e3};break}return n[e.id]=t,t}}}let US=0;function NS(n,e){return(e.castShadow?2:0)-(n.castShadow?2:0)+(e.map?1:0)-(n.map?1:0)}function FS(n){const e=new IS,t=LS(),i={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let c=0;c<9;c++)i.probe.push(new q);const r=new q,s=new At,o=new At;function a(c){let u=0,f=0,d=0;for(let b=0;b<9;b++)i.probe[b].set(0,0,0);let p=0,v=0,x=0,m=0,h=0,w=0,T=0,M=0,C=0,D=0,R=0;c.sort(NS);for(let b=0,E=c.length;b<E;b++){const L=c[b],X=L.color,K=L.intensity,le=L.distance,ie=L.shadow&&L.shadow.map?L.shadow.map.texture:null;if(L.isAmbientLight)u+=X.r*K,f+=X.g*K,d+=X.b*K;else if(L.isLightProbe){for(let J=0;J<9;J++)i.probe[J].addScaledVector(L.sh.coefficients[J],K);R++}else if(L.isDirectionalLight){const J=e.get(L);if(J.color.copy(L.color).multiplyScalar(L.intensity),L.castShadow){const Q=L.shadow,z=t.get(L);z.shadowIntensity=Q.intensity,z.shadowBias=Q.bias,z.shadowNormalBias=Q.normalBias,z.shadowRadius=Q.radius,z.shadowMapSize=Q.mapSize,i.directionalShadow[p]=z,i.directionalShadowMap[p]=ie,i.directionalShadowMatrix[p]=L.shadow.matrix,w++}i.directional[p]=J,p++}else if(L.isSpotLight){const J=e.get(L);J.position.setFromMatrixPosition(L.matrixWorld),J.color.copy(X).multiplyScalar(K),J.distance=le,J.coneCos=Math.cos(L.angle),J.penumbraCos=Math.cos(L.angle*(1-L.penumbra)),J.decay=L.decay,i.spot[x]=J;const Q=L.shadow;if(L.map&&(i.spotLightMap[C]=L.map,C++,Q.updateMatrices(L),L.castShadow&&D++),i.spotLightMatrix[x]=Q.matrix,L.castShadow){const z=t.get(L);z.shadowIntensity=Q.intensity,z.shadowBias=Q.bias,z.shadowNormalBias=Q.normalBias,z.shadowRadius=Q.radius,z.shadowMapSize=Q.mapSize,i.spotShadow[x]=z,i.spotShadowMap[x]=ie,M++}x++}else if(L.isRectAreaLight){const J=e.get(L);J.color.copy(X).multiplyScalar(K),J.halfWidth.set(L.width*.5,0,0),J.halfHeight.set(0,L.height*.5,0),i.rectArea[m]=J,m++}else if(L.isPointLight){const J=e.get(L);if(J.color.copy(L.color).multiplyScalar(L.intensity),J.distance=L.distance,J.decay=L.decay,L.castShadow){const Q=L.shadow,z=t.get(L);z.shadowIntensity=Q.intensity,z.shadowBias=Q.bias,z.shadowNormalBias=Q.normalBias,z.shadowRadius=Q.radius,z.shadowMapSize=Q.mapSize,z.shadowCameraNear=Q.camera.near,z.shadowCameraFar=Q.camera.far,i.pointShadow[v]=z,i.pointShadowMap[v]=ie,i.pointShadowMatrix[v]=L.shadow.matrix,T++}i.point[v]=J,v++}else if(L.isHemisphereLight){const J=e.get(L);J.skyColor.copy(L.color).multiplyScalar(K),J.groundColor.copy(L.groundColor).multiplyScalar(K),i.hemi[h]=J,h++}}m>0&&(n.has("OES_texture_float_linear")===!0?(i.rectAreaLTC1=xe.LTC_FLOAT_1,i.rectAreaLTC2=xe.LTC_FLOAT_2):(i.rectAreaLTC1=xe.LTC_HALF_1,i.rectAreaLTC2=xe.LTC_HALF_2)),i.ambient[0]=u,i.ambient[1]=f,i.ambient[2]=d;const k=i.hash;(k.directionalLength!==p||k.pointLength!==v||k.spotLength!==x||k.rectAreaLength!==m||k.hemiLength!==h||k.numDirectionalShadows!==w||k.numPointShadows!==T||k.numSpotShadows!==M||k.numSpotMaps!==C||k.numLightProbes!==R)&&(i.directional.length=p,i.spot.length=x,i.rectArea.length=m,i.point.length=v,i.hemi.length=h,i.directionalShadow.length=w,i.directionalShadowMap.length=w,i.pointShadow.length=T,i.pointShadowMap.length=T,i.spotShadow.length=M,i.spotShadowMap.length=M,i.directionalShadowMatrix.length=w,i.pointShadowMatrix.length=T,i.spotLightMatrix.length=M+C-D,i.spotLightMap.length=C,i.numSpotLightShadowsWithMaps=D,i.numLightProbes=R,k.directionalLength=p,k.pointLength=v,k.spotLength=x,k.rectAreaLength=m,k.hemiLength=h,k.numDirectionalShadows=w,k.numPointShadows=T,k.numSpotShadows=M,k.numSpotMaps=C,k.numLightProbes=R,i.version=US++)}function l(c,u){let f=0,d=0,p=0,v=0,x=0;const m=u.matrixWorldInverse;for(let h=0,w=c.length;h<w;h++){const T=c[h];if(T.isDirectionalLight){const M=i.directional[f];M.direction.setFromMatrixPosition(T.matrixWorld),r.setFromMatrixPosition(T.target.matrixWorld),M.direction.sub(r),M.direction.transformDirection(m),f++}else if(T.isSpotLight){const M=i.spot[p];M.position.setFromMatrixPosition(T.matrixWorld),M.position.applyMatrix4(m),M.direction.setFromMatrixPosition(T.matrixWorld),r.setFromMatrixPosition(T.target.matrixWorld),M.direction.sub(r),M.direction.transformDirection(m),p++}else if(T.isRectAreaLight){const M=i.rectArea[v];M.position.setFromMatrixPosition(T.matrixWorld),M.position.applyMatrix4(m),o.identity(),s.copy(T.matrixWorld),s.premultiply(m),o.extractRotation(s),M.halfWidth.set(T.width*.5,0,0),M.halfHeight.set(0,T.height*.5,0),M.halfWidth.applyMatrix4(o),M.halfHeight.applyMatrix4(o),v++}else if(T.isPointLight){const M=i.point[d];M.position.setFromMatrixPosition(T.matrixWorld),M.position.applyMatrix4(m),d++}else if(T.isHemisphereLight){const M=i.hemi[x];M.direction.setFromMatrixPosition(T.matrixWorld),M.direction.transformDirection(m),x++}}}return{setup:a,setupView:l,state:i}}function ju(n){const e=new FS(n),t=[],i=[];function r(u){c.camera=u,t.length=0,i.length=0}function s(u){t.push(u)}function o(u){i.push(u)}function a(){e.setup(t)}function l(u){e.setupView(t,u)}const c={lightsArray:t,shadowsArray:i,camera:null,lights:e,transmissionRenderTarget:{}};return{init:r,state:c,setupLights:a,setupLightsView:l,pushLight:s,pushShadow:o}}function OS(n){let e=new WeakMap;function t(r,s=0){const o=e.get(r);let a;return o===void 0?(a=new ju(n),e.set(r,[a])):s>=o.length?(a=new ju(n),o.push(a)):a=o[s],a}function i(){e=new WeakMap}return{get:t,dispose:i}}const BS=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,kS=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
#include <packing>
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = unpackRGBATo2Half( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ) );
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = unpackRGBAToDepth( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ) );
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( squared_mean - mean * mean );
	gl_FragColor = pack2HalfToRGBA( vec2( mean, std_dev ) );
}`;function zS(n,e,t){let i=new Vd;const r=new ct,s=new ct,o=new St,a=new dv({depthPacking:b_}),l=new hv,c={},u=t.maxTextureSize,f={[hi]:jt,[jt]:hi,[Vn]:Vn},d=new pi({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new ct},radius:{value:4}},vertexShader:BS,fragmentShader:kS}),p=d.clone();p.defines.HORIZONTAL_PASS=1;const v=new ki;v.setAttribute("position",new Cn(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const x=new An(v,d),m=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=Sd;let h=this.type;this.render=function(D,R,k){if(m.enabled===!1||m.autoUpdate===!1&&m.needsUpdate===!1||D.length===0)return;const b=n.getRenderTarget(),E=n.getActiveCubeFace(),L=n.getActiveMipmapLevel(),X=n.state;X.setBlending(ci),X.buffers.depth.getReversed()===!0?X.buffers.color.setClear(0,0,0,0):X.buffers.color.setClear(1,1,1,1),X.buffers.depth.setTest(!0),X.setScissorTest(!1);const K=h!==kn&&this.type===kn,le=h===kn&&this.type!==kn;for(let ie=0,J=D.length;ie<J;ie++){const Q=D[ie],z=Q.shadow;if(z===void 0){console.warn("THREE.WebGLShadowMap:",Q,"has no shadow.");continue}if(z.autoUpdate===!1&&z.needsUpdate===!1)continue;r.copy(z.mapSize);const me=z.getFrameExtents();if(r.multiply(me),s.copy(z.mapSize),(r.x>u||r.y>u)&&(r.x>u&&(s.x=Math.floor(u/me.x),r.x=s.x*me.x,z.mapSize.x=s.x),r.y>u&&(s.y=Math.floor(u/me.y),r.y=s.y*me.y,z.mapSize.y=s.y)),z.map===null||K===!0||le===!0){const Re=this.type!==kn?{minFilter:_n,magFilter:_n}:{};z.map!==null&&z.map.dispose(),z.map=new Fi(r.x,r.y,Re),z.map.texture.name=Q.name+".shadowMap",z.camera.updateProjectionMatrix()}n.setRenderTarget(z.map),n.clear();const ve=z.getViewportCount();for(let Re=0;Re<ve;Re++){const Oe=z.getViewport(Re);o.set(s.x*Oe.x,s.y*Oe.y,s.x*Oe.z,s.y*Oe.w),X.viewport(o),z.updateMatrices(Q,Re),i=z.getFrustum(),M(R,k,z.camera,Q,this.type)}z.isPointLightShadow!==!0&&this.type===kn&&w(z,k),z.needsUpdate=!1}h=this.type,m.needsUpdate=!1,n.setRenderTarget(b,E,L)};function w(D,R){const k=e.update(x);d.defines.VSM_SAMPLES!==D.blurSamples&&(d.defines.VSM_SAMPLES=D.blurSamples,p.defines.VSM_SAMPLES=D.blurSamples,d.needsUpdate=!0,p.needsUpdate=!0),D.mapPass===null&&(D.mapPass=new Fi(r.x,r.y)),d.uniforms.shadow_pass.value=D.map.texture,d.uniforms.resolution.value=D.mapSize,d.uniforms.radius.value=D.radius,n.setRenderTarget(D.mapPass),n.clear(),n.renderBufferDirect(R,null,k,d,x,null),p.uniforms.shadow_pass.value=D.mapPass.texture,p.uniforms.resolution.value=D.mapSize,p.uniforms.radius.value=D.radius,n.setRenderTarget(D.map),n.clear(),n.renderBufferDirect(R,null,k,p,x,null)}function T(D,R,k,b){let E=null;const L=k.isPointLight===!0?D.customDistanceMaterial:D.customDepthMaterial;if(L!==void 0)E=L;else if(E=k.isPointLight===!0?l:a,n.localClippingEnabled&&R.clipShadows===!0&&Array.isArray(R.clippingPlanes)&&R.clippingPlanes.length!==0||R.displacementMap&&R.displacementScale!==0||R.alphaMap&&R.alphaTest>0||R.map&&R.alphaTest>0||R.alphaToCoverage===!0){const X=E.uuid,K=R.uuid;let le=c[X];le===void 0&&(le={},c[X]=le);let ie=le[K];ie===void 0&&(ie=E.clone(),le[K]=ie,R.addEventListener("dispose",C)),E=ie}if(E.visible=R.visible,E.wireframe=R.wireframe,b===kn?E.side=R.shadowSide!==null?R.shadowSide:R.side:E.side=R.shadowSide!==null?R.shadowSide:f[R.side],E.alphaMap=R.alphaMap,E.alphaTest=R.alphaToCoverage===!0?.5:R.alphaTest,E.map=R.map,E.clipShadows=R.clipShadows,E.clippingPlanes=R.clippingPlanes,E.clipIntersection=R.clipIntersection,E.displacementMap=R.displacementMap,E.displacementScale=R.displacementScale,E.displacementBias=R.displacementBias,E.wireframeLinewidth=R.wireframeLinewidth,E.linewidth=R.linewidth,k.isPointLight===!0&&E.isMeshDistanceMaterial===!0){const X=n.properties.get(E);X.light=k}return E}function M(D,R,k,b,E){if(D.visible===!1)return;if(D.layers.test(R.layers)&&(D.isMesh||D.isLine||D.isPoints)&&(D.castShadow||D.receiveShadow&&E===kn)&&(!D.frustumCulled||i.intersectsObject(D))){D.modelViewMatrix.multiplyMatrices(k.matrixWorldInverse,D.matrixWorld);const K=e.update(D),le=D.material;if(Array.isArray(le)){const ie=K.groups;for(let J=0,Q=ie.length;J<Q;J++){const z=ie[J],me=le[z.materialIndex];if(me&&me.visible){const ve=T(D,me,b,E);D.onBeforeShadow(n,D,R,k,K,ve,z),n.renderBufferDirect(k,null,K,ve,D,z),D.onAfterShadow(n,D,R,k,K,ve,z)}}}else if(le.visible){const ie=T(D,le,b,E);D.onBeforeShadow(n,D,R,k,K,ie,null),n.renderBufferDirect(k,null,K,ie,D,null),D.onAfterShadow(n,D,R,k,K,ie,null)}}const X=D.children;for(let K=0,le=X.length;K<le;K++)M(X[K],R,k,b,E)}function C(D){D.target.removeEventListener("dispose",C);for(const k in c){const b=c[k],E=D.target.uuid;E in b&&(b[E].dispose(),delete b[E])}}}const HS={[Ia]:La,[Ua]:Oa,[Na]:Ba,[gr]:Fa,[La]:Ia,[Oa]:Ua,[Ba]:Na,[Fa]:gr};function VS(n,e){function t(){let U=!1;const pe=new St;let ge=null;const De=new St(0,0,0,0);return{setMask:function(de){ge!==de&&!U&&(n.colorMask(de,de,de,de),ge=de)},setLocked:function(de){U=de},setClear:function(de,ae,Ne,We,ft){ft===!0&&(de*=We,ae*=We,Ne*=We),pe.set(de,ae,Ne,We),De.equals(pe)===!1&&(n.clearColor(de,ae,Ne,We),De.copy(pe))},reset:function(){U=!1,ge=null,De.set(-1,0,0,0)}}}function i(){let U=!1,pe=!1,ge=null,De=null,de=null;return{setReversed:function(ae){if(pe!==ae){const Ne=e.get("EXT_clip_control");ae?Ne.clipControlEXT(Ne.LOWER_LEFT_EXT,Ne.ZERO_TO_ONE_EXT):Ne.clipControlEXT(Ne.LOWER_LEFT_EXT,Ne.NEGATIVE_ONE_TO_ONE_EXT),pe=ae;const We=de;de=null,this.setClear(We)}},getReversed:function(){return pe},setTest:function(ae){ae?P(n.DEPTH_TEST):Z(n.DEPTH_TEST)},setMask:function(ae){ge!==ae&&!U&&(n.depthMask(ae),ge=ae)},setFunc:function(ae){if(pe&&(ae=HS[ae]),De!==ae){switch(ae){case Ia:n.depthFunc(n.NEVER);break;case La:n.depthFunc(n.ALWAYS);break;case Ua:n.depthFunc(n.LESS);break;case gr:n.depthFunc(n.LEQUAL);break;case Na:n.depthFunc(n.EQUAL);break;case Fa:n.depthFunc(n.GEQUAL);break;case Oa:n.depthFunc(n.GREATER);break;case Ba:n.depthFunc(n.NOTEQUAL);break;default:n.depthFunc(n.LEQUAL)}De=ae}},setLocked:function(ae){U=ae},setClear:function(ae){de!==ae&&(pe&&(ae=1-ae),n.clearDepth(ae),de=ae)},reset:function(){U=!1,ge=null,De=null,de=null,pe=!1}}}function r(){let U=!1,pe=null,ge=null,De=null,de=null,ae=null,Ne=null,We=null,ft=null;return{setTest:function(nt){U||(nt?P(n.STENCIL_TEST):Z(n.STENCIL_TEST))},setMask:function(nt){pe!==nt&&!U&&(n.stencilMask(nt),pe=nt)},setFunc:function(nt,Dn,xn){(ge!==nt||De!==Dn||de!==xn)&&(n.stencilFunc(nt,Dn,xn),ge=nt,De=Dn,de=xn)},setOp:function(nt,Dn,xn){(ae!==nt||Ne!==Dn||We!==xn)&&(n.stencilOp(nt,Dn,xn),ae=nt,Ne=Dn,We=xn)},setLocked:function(nt){U=nt},setClear:function(nt){ft!==nt&&(n.clearStencil(nt),ft=nt)},reset:function(){U=!1,pe=null,ge=null,De=null,de=null,ae=null,Ne=null,We=null,ft=null}}}const s=new t,o=new i,a=new r,l=new WeakMap,c=new WeakMap;let u={},f={},d=new WeakMap,p=[],v=null,x=!1,m=null,h=null,w=null,T=null,M=null,C=null,D=null,R=new lt(0,0,0),k=0,b=!1,E=null,L=null,X=null,K=null,le=null;const ie=n.getParameter(n.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let J=!1,Q=0;const z=n.getParameter(n.VERSION);z.indexOf("WebGL")!==-1?(Q=parseFloat(/^WebGL (\d)/.exec(z)[1]),J=Q>=1):z.indexOf("OpenGL ES")!==-1&&(Q=parseFloat(/^OpenGL ES (\d)/.exec(z)[1]),J=Q>=2);let me=null,ve={};const Re=n.getParameter(n.SCISSOR_BOX),Oe=n.getParameter(n.VIEWPORT),Ze=new St().fromArray(Re),et=new St().fromArray(Oe);function $e(U,pe,ge,De){const de=new Uint8Array(4),ae=n.createTexture();n.bindTexture(U,ae),n.texParameteri(U,n.TEXTURE_MIN_FILTER,n.NEAREST),n.texParameteri(U,n.TEXTURE_MAG_FILTER,n.NEAREST);for(let Ne=0;Ne<ge;Ne++)U===n.TEXTURE_3D||U===n.TEXTURE_2D_ARRAY?n.texImage3D(pe,0,n.RGBA,1,1,De,0,n.RGBA,n.UNSIGNED_BYTE,de):n.texImage2D(pe+Ne,0,n.RGBA,1,1,0,n.RGBA,n.UNSIGNED_BYTE,de);return ae}const te={};te[n.TEXTURE_2D]=$e(n.TEXTURE_2D,n.TEXTURE_2D,1),te[n.TEXTURE_CUBE_MAP]=$e(n.TEXTURE_CUBE_MAP,n.TEXTURE_CUBE_MAP_POSITIVE_X,6),te[n.TEXTURE_2D_ARRAY]=$e(n.TEXTURE_2D_ARRAY,n.TEXTURE_2D_ARRAY,1,1),te[n.TEXTURE_3D]=$e(n.TEXTURE_3D,n.TEXTURE_3D,1,1),s.setClear(0,0,0,1),o.setClear(1),a.setClear(0),P(n.DEPTH_TEST),o.setFunc(gr),V(!1),F(Jc),P(n.CULL_FACE),N(ci);function P(U){u[U]!==!0&&(n.enable(U),u[U]=!0)}function Z(U){u[U]!==!1&&(n.disable(U),u[U]=!1)}function re(U,pe){return f[U]!==pe?(n.bindFramebuffer(U,pe),f[U]=pe,U===n.DRAW_FRAMEBUFFER&&(f[n.FRAMEBUFFER]=pe),U===n.FRAMEBUFFER&&(f[n.DRAW_FRAMEBUFFER]=pe),!0):!1}function se(U,pe){let ge=p,De=!1;if(U){ge=d.get(pe),ge===void 0&&(ge=[],d.set(pe,ge));const de=U.textures;if(ge.length!==de.length||ge[0]!==n.COLOR_ATTACHMENT0){for(let ae=0,Ne=de.length;ae<Ne;ae++)ge[ae]=n.COLOR_ATTACHMENT0+ae;ge.length=de.length,De=!0}}else ge[0]!==n.BACK&&(ge[0]=n.BACK,De=!0);De&&n.drawBuffers(ge)}function Ie(U){return v!==U?(n.useProgram(U),v=U,!0):!1}const A={[Ci]:n.FUNC_ADD,[Kg]:n.FUNC_SUBTRACT,[Zg]:n.FUNC_REVERSE_SUBTRACT};A[Jg]=n.MIN,A[Qg]=n.MAX;const g={[e_]:n.ZERO,[t_]:n.ONE,[n_]:n.SRC_COLOR,[Pa]:n.SRC_ALPHA,[l_]:n.SRC_ALPHA_SATURATE,[o_]:n.DST_COLOR,[r_]:n.DST_ALPHA,[i_]:n.ONE_MINUS_SRC_COLOR,[Da]:n.ONE_MINUS_SRC_ALPHA,[a_]:n.ONE_MINUS_DST_COLOR,[s_]:n.ONE_MINUS_DST_ALPHA,[c_]:n.CONSTANT_COLOR,[u_]:n.ONE_MINUS_CONSTANT_COLOR,[f_]:n.CONSTANT_ALPHA,[d_]:n.ONE_MINUS_CONSTANT_ALPHA};function N(U,pe,ge,De,de,ae,Ne,We,ft,nt){if(U===ci){x===!0&&(Z(n.BLEND),x=!1);return}if(x===!1&&(P(n.BLEND),x=!0),U!==$g){if(U!==m||nt!==b){if((h!==Ci||M!==Ci)&&(n.blendEquation(n.FUNC_ADD),h=Ci,M=Ci),nt)switch(U){case fr:n.blendFuncSeparate(n.ONE,n.ONE_MINUS_SRC_ALPHA,n.ONE,n.ONE_MINUS_SRC_ALPHA);break;case Qc:n.blendFunc(n.ONE,n.ONE);break;case eu:n.blendFuncSeparate(n.ZERO,n.ONE_MINUS_SRC_COLOR,n.ZERO,n.ONE);break;case tu:n.blendFuncSeparate(n.DST_COLOR,n.ONE_MINUS_SRC_ALPHA,n.ZERO,n.ONE);break;default:console.error("THREE.WebGLState: Invalid blending: ",U);break}else switch(U){case fr:n.blendFuncSeparate(n.SRC_ALPHA,n.ONE_MINUS_SRC_ALPHA,n.ONE,n.ONE_MINUS_SRC_ALPHA);break;case Qc:n.blendFuncSeparate(n.SRC_ALPHA,n.ONE,n.ONE,n.ONE);break;case eu:console.error("THREE.WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case tu:console.error("THREE.WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:console.error("THREE.WebGLState: Invalid blending: ",U);break}w=null,T=null,C=null,D=null,R.set(0,0,0),k=0,m=U,b=nt}return}de=de||pe,ae=ae||ge,Ne=Ne||De,(pe!==h||de!==M)&&(n.blendEquationSeparate(A[pe],A[de]),h=pe,M=de),(ge!==w||De!==T||ae!==C||Ne!==D)&&(n.blendFuncSeparate(g[ge],g[De],g[ae],g[Ne]),w=ge,T=De,C=ae,D=Ne),(We.equals(R)===!1||ft!==k)&&(n.blendColor(We.r,We.g,We.b,ft),R.copy(We),k=ft),m=U,b=!1}function H(U,pe){U.side===Vn?Z(n.CULL_FACE):P(n.CULL_FACE);let ge=U.side===jt;pe&&(ge=!ge),V(ge),U.blending===fr&&U.transparent===!1?N(ci):N(U.blending,U.blendEquation,U.blendSrc,U.blendDst,U.blendEquationAlpha,U.blendSrcAlpha,U.blendDstAlpha,U.blendColor,U.blendAlpha,U.premultipliedAlpha),o.setFunc(U.depthFunc),o.setTest(U.depthTest),o.setMask(U.depthWrite),s.setMask(U.colorWrite);const De=U.stencilWrite;a.setTest(De),De&&(a.setMask(U.stencilWriteMask),a.setFunc(U.stencilFunc,U.stencilRef,U.stencilFuncMask),a.setOp(U.stencilFail,U.stencilZFail,U.stencilZPass)),Y(U.polygonOffset,U.polygonOffsetFactor,U.polygonOffsetUnits),U.alphaToCoverage===!0?P(n.SAMPLE_ALPHA_TO_COVERAGE):Z(n.SAMPLE_ALPHA_TO_COVERAGE)}function V(U){E!==U&&(U?n.frontFace(n.CW):n.frontFace(n.CCW),E=U)}function F(U){U!==jg?(P(n.CULL_FACE),U!==L&&(U===Jc?n.cullFace(n.BACK):U===qg?n.cullFace(n.FRONT):n.cullFace(n.FRONT_AND_BACK))):Z(n.CULL_FACE),L=U}function ce(U){U!==X&&(J&&n.lineWidth(U),X=U)}function Y(U,pe,ge){U?(P(n.POLYGON_OFFSET_FILL),(K!==pe||le!==ge)&&(n.polygonOffset(pe,ge),K=pe,le=ge)):Z(n.POLYGON_OFFSET_FILL)}function ne(U){U?P(n.SCISSOR_TEST):Z(n.SCISSOR_TEST)}function oe(U){U===void 0&&(U=n.TEXTURE0+ie-1),me!==U&&(n.activeTexture(U),me=U)}function Se(U,pe,ge){ge===void 0&&(me===null?ge=n.TEXTURE0+ie-1:ge=me);let De=ve[ge];De===void 0&&(De={type:void 0,texture:void 0},ve[ge]=De),(De.type!==U||De.texture!==pe)&&(me!==ge&&(n.activeTexture(ge),me=ge),n.bindTexture(U,pe||te[U]),De.type=U,De.texture=pe)}function y(){const U=ve[me];U!==void 0&&U.type!==void 0&&(n.bindTexture(U.type,null),U.type=void 0,U.texture=void 0)}function _(){try{n.compressedTexImage2D(...arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function I(){try{n.compressedTexImage3D(...arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function G(){try{n.texSubImage2D(...arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function ee(){try{n.texSubImage3D(...arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function W(){try{n.compressedTexSubImage2D(...arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function Ee(){try{n.compressedTexSubImage3D(...arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function ue(){try{n.texStorage2D(...arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function be(){try{n.texStorage3D(...arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function Te(){try{n.texImage2D(...arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function fe(){try{n.texImage3D(...arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function ye(U){Ze.equals(U)===!1&&(n.scissor(U.x,U.y,U.z,U.w),Ze.copy(U))}function Le(U){et.equals(U)===!1&&(n.viewport(U.x,U.y,U.z,U.w),et.copy(U))}function Ae(U,pe){let ge=c.get(pe);ge===void 0&&(ge=new WeakMap,c.set(pe,ge));let De=ge.get(U);De===void 0&&(De=n.getUniformBlockIndex(pe,U.name),ge.set(U,De))}function _e(U,pe){const De=c.get(pe).get(U);l.get(pe)!==De&&(n.uniformBlockBinding(pe,De,U.__bindingPointIndex),l.set(pe,De))}function Ve(){n.disable(n.BLEND),n.disable(n.CULL_FACE),n.disable(n.DEPTH_TEST),n.disable(n.POLYGON_OFFSET_FILL),n.disable(n.SCISSOR_TEST),n.disable(n.STENCIL_TEST),n.disable(n.SAMPLE_ALPHA_TO_COVERAGE),n.blendEquation(n.FUNC_ADD),n.blendFunc(n.ONE,n.ZERO),n.blendFuncSeparate(n.ONE,n.ZERO,n.ONE,n.ZERO),n.blendColor(0,0,0,0),n.colorMask(!0,!0,!0,!0),n.clearColor(0,0,0,0),n.depthMask(!0),n.depthFunc(n.LESS),o.setReversed(!1),n.clearDepth(1),n.stencilMask(4294967295),n.stencilFunc(n.ALWAYS,0,4294967295),n.stencilOp(n.KEEP,n.KEEP,n.KEEP),n.clearStencil(0),n.cullFace(n.BACK),n.frontFace(n.CCW),n.polygonOffset(0,0),n.activeTexture(n.TEXTURE0),n.bindFramebuffer(n.FRAMEBUFFER,null),n.bindFramebuffer(n.DRAW_FRAMEBUFFER,null),n.bindFramebuffer(n.READ_FRAMEBUFFER,null),n.useProgram(null),n.lineWidth(1),n.scissor(0,0,n.canvas.width,n.canvas.height),n.viewport(0,0,n.canvas.width,n.canvas.height),u={},me=null,ve={},f={},d=new WeakMap,p=[],v=null,x=!1,m=null,h=null,w=null,T=null,M=null,C=null,D=null,R=new lt(0,0,0),k=0,b=!1,E=null,L=null,X=null,K=null,le=null,Ze.set(0,0,n.canvas.width,n.canvas.height),et.set(0,0,n.canvas.width,n.canvas.height),s.reset(),o.reset(),a.reset()}return{buffers:{color:s,depth:o,stencil:a},enable:P,disable:Z,bindFramebuffer:re,drawBuffers:se,useProgram:Ie,setBlending:N,setMaterial:H,setFlipSided:V,setCullFace:F,setLineWidth:ce,setPolygonOffset:Y,setScissorTest:ne,activeTexture:oe,bindTexture:Se,unbindTexture:y,compressedTexImage2D:_,compressedTexImage3D:I,texImage2D:Te,texImage3D:fe,updateUBOMapping:Ae,uniformBlockBinding:_e,texStorage2D:ue,texStorage3D:be,texSubImage2D:G,texSubImage3D:ee,compressedTexSubImage2D:W,compressedTexSubImage3D:Ee,scissor:ye,viewport:Le,reset:Ve}}function GS(n,e,t,i,r,s,o){const a=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),c=new ct,u=new WeakMap;let f;const d=new WeakMap;let p=!1;try{p=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function v(y,_){return p?new OffscreenCanvas(y,_):oo("canvas")}function x(y,_,I){let G=1;const ee=Se(y);if((ee.width>I||ee.height>I)&&(G=I/Math.max(ee.width,ee.height)),G<1)if(typeof HTMLImageElement<"u"&&y instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&y instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&y instanceof ImageBitmap||typeof VideoFrame<"u"&&y instanceof VideoFrame){const W=Math.floor(G*ee.width),Ee=Math.floor(G*ee.height);f===void 0&&(f=v(W,Ee));const ue=_?v(W,Ee):f;return ue.width=W,ue.height=Ee,ue.getContext("2d").drawImage(y,0,0,W,Ee),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+ee.width+"x"+ee.height+") to ("+W+"x"+Ee+")."),ue}else return"data"in y&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+ee.width+"x"+ee.height+")."),y;return y}function m(y){return y.generateMipmaps}function h(y){n.generateMipmap(y)}function w(y){return y.isWebGLCubeRenderTarget?n.TEXTURE_CUBE_MAP:y.isWebGL3DRenderTarget?n.TEXTURE_3D:y.isWebGLArrayRenderTarget||y.isCompressedArrayTexture?n.TEXTURE_2D_ARRAY:n.TEXTURE_2D}function T(y,_,I,G,ee=!1){if(y!==null){if(n[y]!==void 0)return n[y];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+y+"'")}let W=_;if(_===n.RED&&(I===n.FLOAT&&(W=n.R32F),I===n.HALF_FLOAT&&(W=n.R16F),I===n.UNSIGNED_BYTE&&(W=n.R8)),_===n.RED_INTEGER&&(I===n.UNSIGNED_BYTE&&(W=n.R8UI),I===n.UNSIGNED_SHORT&&(W=n.R16UI),I===n.UNSIGNED_INT&&(W=n.R32UI),I===n.BYTE&&(W=n.R8I),I===n.SHORT&&(W=n.R16I),I===n.INT&&(W=n.R32I)),_===n.RG&&(I===n.FLOAT&&(W=n.RG32F),I===n.HALF_FLOAT&&(W=n.RG16F),I===n.UNSIGNED_BYTE&&(W=n.RG8)),_===n.RG_INTEGER&&(I===n.UNSIGNED_BYTE&&(W=n.RG8UI),I===n.UNSIGNED_SHORT&&(W=n.RG16UI),I===n.UNSIGNED_INT&&(W=n.RG32UI),I===n.BYTE&&(W=n.RG8I),I===n.SHORT&&(W=n.RG16I),I===n.INT&&(W=n.RG32I)),_===n.RGB_INTEGER&&(I===n.UNSIGNED_BYTE&&(W=n.RGB8UI),I===n.UNSIGNED_SHORT&&(W=n.RGB16UI),I===n.UNSIGNED_INT&&(W=n.RGB32UI),I===n.BYTE&&(W=n.RGB8I),I===n.SHORT&&(W=n.RGB16I),I===n.INT&&(W=n.RGB32I)),_===n.RGBA_INTEGER&&(I===n.UNSIGNED_BYTE&&(W=n.RGBA8UI),I===n.UNSIGNED_SHORT&&(W=n.RGBA16UI),I===n.UNSIGNED_INT&&(W=n.RGBA32UI),I===n.BYTE&&(W=n.RGBA8I),I===n.SHORT&&(W=n.RGBA16I),I===n.INT&&(W=n.RGBA32I)),_===n.RGB&&(I===n.UNSIGNED_INT_5_9_9_9_REV&&(W=n.RGB9_E5),I===n.UNSIGNED_INT_10F_11F_11F_REV&&(W=n.R11F_G11F_B10F)),_===n.RGBA){const Ee=ee?ro:Qe.getTransfer(G);I===n.FLOAT&&(W=n.RGBA32F),I===n.HALF_FLOAT&&(W=n.RGBA16F),I===n.UNSIGNED_BYTE&&(W=Ee===at?n.SRGB8_ALPHA8:n.RGBA8),I===n.UNSIGNED_SHORT_4_4_4_4&&(W=n.RGBA4),I===n.UNSIGNED_SHORT_5_5_5_1&&(W=n.RGB5_A1)}return(W===n.R16F||W===n.R32F||W===n.RG16F||W===n.RG32F||W===n.RGBA16F||W===n.RGBA32F)&&e.get("EXT_color_buffer_float"),W}function M(y,_){let I;return y?_===null||_===Ni||_===es?I=n.DEPTH24_STENCIL8:_===Gn?I=n.DEPTH32F_STENCIL8:_===Qr&&(I=n.DEPTH24_STENCIL8,console.warn("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):_===null||_===Ni||_===es?I=n.DEPTH_COMPONENT24:_===Gn?I=n.DEPTH_COMPONENT32F:_===Qr&&(I=n.DEPTH_COMPONENT16),I}function C(y,_){return m(y)===!0||y.isFramebufferTexture&&y.minFilter!==_n&&y.minFilter!==bn?Math.log2(Math.max(_.width,_.height))+1:y.mipmaps!==void 0&&y.mipmaps.length>0?y.mipmaps.length:y.isCompressedTexture&&Array.isArray(y.image)?_.mipmaps.length:1}function D(y){const _=y.target;_.removeEventListener("dispose",D),k(_),_.isVideoTexture&&u.delete(_)}function R(y){const _=y.target;_.removeEventListener("dispose",R),E(_)}function k(y){const _=i.get(y);if(_.__webglInit===void 0)return;const I=y.source,G=d.get(I);if(G){const ee=G[_.__cacheKey];ee.usedTimes--,ee.usedTimes===0&&b(y),Object.keys(G).length===0&&d.delete(I)}i.remove(y)}function b(y){const _=i.get(y);n.deleteTexture(_.__webglTexture);const I=y.source,G=d.get(I);delete G[_.__cacheKey],o.memory.textures--}function E(y){const _=i.get(y);if(y.depthTexture&&(y.depthTexture.dispose(),i.remove(y.depthTexture)),y.isWebGLCubeRenderTarget)for(let G=0;G<6;G++){if(Array.isArray(_.__webglFramebuffer[G]))for(let ee=0;ee<_.__webglFramebuffer[G].length;ee++)n.deleteFramebuffer(_.__webglFramebuffer[G][ee]);else n.deleteFramebuffer(_.__webglFramebuffer[G]);_.__webglDepthbuffer&&n.deleteRenderbuffer(_.__webglDepthbuffer[G])}else{if(Array.isArray(_.__webglFramebuffer))for(let G=0;G<_.__webglFramebuffer.length;G++)n.deleteFramebuffer(_.__webglFramebuffer[G]);else n.deleteFramebuffer(_.__webglFramebuffer);if(_.__webglDepthbuffer&&n.deleteRenderbuffer(_.__webglDepthbuffer),_.__webglMultisampledFramebuffer&&n.deleteFramebuffer(_.__webglMultisampledFramebuffer),_.__webglColorRenderbuffer)for(let G=0;G<_.__webglColorRenderbuffer.length;G++)_.__webglColorRenderbuffer[G]&&n.deleteRenderbuffer(_.__webglColorRenderbuffer[G]);_.__webglDepthRenderbuffer&&n.deleteRenderbuffer(_.__webglDepthRenderbuffer)}const I=y.textures;for(let G=0,ee=I.length;G<ee;G++){const W=i.get(I[G]);W.__webglTexture&&(n.deleteTexture(W.__webglTexture),o.memory.textures--),i.remove(I[G])}i.remove(y)}let L=0;function X(){L=0}function K(){const y=L;return y>=r.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+y+" texture units while this GPU supports only "+r.maxTextures),L+=1,y}function le(y){const _=[];return _.push(y.wrapS),_.push(y.wrapT),_.push(y.wrapR||0),_.push(y.magFilter),_.push(y.minFilter),_.push(y.anisotropy),_.push(y.internalFormat),_.push(y.format),_.push(y.type),_.push(y.generateMipmaps),_.push(y.premultiplyAlpha),_.push(y.flipY),_.push(y.unpackAlignment),_.push(y.colorSpace),_.join()}function ie(y,_){const I=i.get(y);if(y.isVideoTexture&&ne(y),y.isRenderTargetTexture===!1&&y.isExternalTexture!==!0&&y.version>0&&I.__version!==y.version){const G=y.image;if(G===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(G.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{te(I,y,_);return}}else y.isExternalTexture&&(I.__webglTexture=y.sourceTexture?y.sourceTexture:null);t.bindTexture(n.TEXTURE_2D,I.__webglTexture,n.TEXTURE0+_)}function J(y,_){const I=i.get(y);if(y.isRenderTargetTexture===!1&&y.version>0&&I.__version!==y.version){te(I,y,_);return}t.bindTexture(n.TEXTURE_2D_ARRAY,I.__webglTexture,n.TEXTURE0+_)}function Q(y,_){const I=i.get(y);if(y.isRenderTargetTexture===!1&&y.version>0&&I.__version!==y.version){te(I,y,_);return}t.bindTexture(n.TEXTURE_3D,I.__webglTexture,n.TEXTURE0+_)}function z(y,_){const I=i.get(y);if(y.version>0&&I.__version!==y.version){P(I,y,_);return}t.bindTexture(n.TEXTURE_CUBE_MAP,I.__webglTexture,n.TEXTURE0+_)}const me={[Ha]:n.REPEAT,[Di]:n.CLAMP_TO_EDGE,[Va]:n.MIRRORED_REPEAT},ve={[_n]:n.NEAREST,[M_]:n.NEAREST_MIPMAP_NEAREST,[gs]:n.NEAREST_MIPMAP_LINEAR,[bn]:n.LINEAR,[ko]:n.LINEAR_MIPMAP_NEAREST,[Ii]:n.LINEAR_MIPMAP_LINEAR},Re={[w_]:n.NEVER,[L_]:n.ALWAYS,[R_]:n.LESS,[Id]:n.LEQUAL,[C_]:n.EQUAL,[I_]:n.GEQUAL,[P_]:n.GREATER,[D_]:n.NOTEQUAL};function Oe(y,_){if(_.type===Gn&&e.has("OES_texture_float_linear")===!1&&(_.magFilter===bn||_.magFilter===ko||_.magFilter===gs||_.magFilter===Ii||_.minFilter===bn||_.minFilter===ko||_.minFilter===gs||_.minFilter===Ii)&&console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),n.texParameteri(y,n.TEXTURE_WRAP_S,me[_.wrapS]),n.texParameteri(y,n.TEXTURE_WRAP_T,me[_.wrapT]),(y===n.TEXTURE_3D||y===n.TEXTURE_2D_ARRAY)&&n.texParameteri(y,n.TEXTURE_WRAP_R,me[_.wrapR]),n.texParameteri(y,n.TEXTURE_MAG_FILTER,ve[_.magFilter]),n.texParameteri(y,n.TEXTURE_MIN_FILTER,ve[_.minFilter]),_.compareFunction&&(n.texParameteri(y,n.TEXTURE_COMPARE_MODE,n.COMPARE_REF_TO_TEXTURE),n.texParameteri(y,n.TEXTURE_COMPARE_FUNC,Re[_.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(_.magFilter===_n||_.minFilter!==gs&&_.minFilter!==Ii||_.type===Gn&&e.has("OES_texture_float_linear")===!1)return;if(_.anisotropy>1||i.get(_).__currentAnisotropy){const I=e.get("EXT_texture_filter_anisotropic");n.texParameterf(y,I.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(_.anisotropy,r.getMaxAnisotropy())),i.get(_).__currentAnisotropy=_.anisotropy}}}function Ze(y,_){let I=!1;y.__webglInit===void 0&&(y.__webglInit=!0,_.addEventListener("dispose",D));const G=_.source;let ee=d.get(G);ee===void 0&&(ee={},d.set(G,ee));const W=le(_);if(W!==y.__cacheKey){ee[W]===void 0&&(ee[W]={texture:n.createTexture(),usedTimes:0},o.memory.textures++,I=!0),ee[W].usedTimes++;const Ee=ee[y.__cacheKey];Ee!==void 0&&(ee[y.__cacheKey].usedTimes--,Ee.usedTimes===0&&b(_)),y.__cacheKey=W,y.__webglTexture=ee[W].texture}return I}function et(y,_,I){return Math.floor(Math.floor(y/I)/_)}function $e(y,_,I,G){const W=y.updateRanges;if(W.length===0)t.texSubImage2D(n.TEXTURE_2D,0,0,0,_.width,_.height,I,G,_.data);else{W.sort((fe,ye)=>fe.start-ye.start);let Ee=0;for(let fe=1;fe<W.length;fe++){const ye=W[Ee],Le=W[fe],Ae=ye.start+ye.count,_e=et(Le.start,_.width,4),Ve=et(ye.start,_.width,4);Le.start<=Ae+1&&_e===Ve&&et(Le.start+Le.count-1,_.width,4)===_e?ye.count=Math.max(ye.count,Le.start+Le.count-ye.start):(++Ee,W[Ee]=Le)}W.length=Ee+1;const ue=n.getParameter(n.UNPACK_ROW_LENGTH),be=n.getParameter(n.UNPACK_SKIP_PIXELS),Te=n.getParameter(n.UNPACK_SKIP_ROWS);n.pixelStorei(n.UNPACK_ROW_LENGTH,_.width);for(let fe=0,ye=W.length;fe<ye;fe++){const Le=W[fe],Ae=Math.floor(Le.start/4),_e=Math.ceil(Le.count/4),Ve=Ae%_.width,U=Math.floor(Ae/_.width),pe=_e,ge=1;n.pixelStorei(n.UNPACK_SKIP_PIXELS,Ve),n.pixelStorei(n.UNPACK_SKIP_ROWS,U),t.texSubImage2D(n.TEXTURE_2D,0,Ve,U,pe,ge,I,G,_.data)}y.clearUpdateRanges(),n.pixelStorei(n.UNPACK_ROW_LENGTH,ue),n.pixelStorei(n.UNPACK_SKIP_PIXELS,be),n.pixelStorei(n.UNPACK_SKIP_ROWS,Te)}}function te(y,_,I){let G=n.TEXTURE_2D;(_.isDataArrayTexture||_.isCompressedArrayTexture)&&(G=n.TEXTURE_2D_ARRAY),_.isData3DTexture&&(G=n.TEXTURE_3D);const ee=Ze(y,_),W=_.source;t.bindTexture(G,y.__webglTexture,n.TEXTURE0+I);const Ee=i.get(W);if(W.version!==Ee.__version||ee===!0){t.activeTexture(n.TEXTURE0+I);const ue=Qe.getPrimaries(Qe.workingColorSpace),be=_.colorSpace===ai?null:Qe.getPrimaries(_.colorSpace),Te=_.colorSpace===ai||ue===be?n.NONE:n.BROWSER_DEFAULT_WEBGL;n.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,_.flipY),n.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,_.premultiplyAlpha),n.pixelStorei(n.UNPACK_ALIGNMENT,_.unpackAlignment),n.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,Te);let fe=x(_.image,!1,r.maxTextureSize);fe=oe(_,fe);const ye=s.convert(_.format,_.colorSpace),Le=s.convert(_.type);let Ae=T(_.internalFormat,ye,Le,_.colorSpace,_.isVideoTexture);Oe(G,_);let _e;const Ve=_.mipmaps,U=_.isVideoTexture!==!0,pe=Ee.__version===void 0||ee===!0,ge=W.dataReady,De=C(_,fe);if(_.isDepthTexture)Ae=M(_.format===ns,_.type),pe&&(U?t.texStorage2D(n.TEXTURE_2D,1,Ae,fe.width,fe.height):t.texImage2D(n.TEXTURE_2D,0,Ae,fe.width,fe.height,0,ye,Le,null));else if(_.isDataTexture)if(Ve.length>0){U&&pe&&t.texStorage2D(n.TEXTURE_2D,De,Ae,Ve[0].width,Ve[0].height);for(let de=0,ae=Ve.length;de<ae;de++)_e=Ve[de],U?ge&&t.texSubImage2D(n.TEXTURE_2D,de,0,0,_e.width,_e.height,ye,Le,_e.data):t.texImage2D(n.TEXTURE_2D,de,Ae,_e.width,_e.height,0,ye,Le,_e.data);_.generateMipmaps=!1}else U?(pe&&t.texStorage2D(n.TEXTURE_2D,De,Ae,fe.width,fe.height),ge&&$e(_,fe,ye,Le)):t.texImage2D(n.TEXTURE_2D,0,Ae,fe.width,fe.height,0,ye,Le,fe.data);else if(_.isCompressedTexture)if(_.isCompressedArrayTexture){U&&pe&&t.texStorage3D(n.TEXTURE_2D_ARRAY,De,Ae,Ve[0].width,Ve[0].height,fe.depth);for(let de=0,ae=Ve.length;de<ae;de++)if(_e=Ve[de],_.format!==mn)if(ye!==null)if(U){if(ge)if(_.layerUpdates.size>0){const Ne=Mu(_e.width,_e.height,_.format,_.type);for(const We of _.layerUpdates){const ft=_e.data.subarray(We*Ne/_e.data.BYTES_PER_ELEMENT,(We+1)*Ne/_e.data.BYTES_PER_ELEMENT);t.compressedTexSubImage3D(n.TEXTURE_2D_ARRAY,de,0,0,We,_e.width,_e.height,1,ye,ft)}_.clearLayerUpdates()}else t.compressedTexSubImage3D(n.TEXTURE_2D_ARRAY,de,0,0,0,_e.width,_e.height,fe.depth,ye,_e.data)}else t.compressedTexImage3D(n.TEXTURE_2D_ARRAY,de,Ae,_e.width,_e.height,fe.depth,0,_e.data,0,0);else console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else U?ge&&t.texSubImage3D(n.TEXTURE_2D_ARRAY,de,0,0,0,_e.width,_e.height,fe.depth,ye,Le,_e.data):t.texImage3D(n.TEXTURE_2D_ARRAY,de,Ae,_e.width,_e.height,fe.depth,0,ye,Le,_e.data)}else{U&&pe&&t.texStorage2D(n.TEXTURE_2D,De,Ae,Ve[0].width,Ve[0].height);for(let de=0,ae=Ve.length;de<ae;de++)_e=Ve[de],_.format!==mn?ye!==null?U?ge&&t.compressedTexSubImage2D(n.TEXTURE_2D,de,0,0,_e.width,_e.height,ye,_e.data):t.compressedTexImage2D(n.TEXTURE_2D,de,Ae,_e.width,_e.height,0,_e.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):U?ge&&t.texSubImage2D(n.TEXTURE_2D,de,0,0,_e.width,_e.height,ye,Le,_e.data):t.texImage2D(n.TEXTURE_2D,de,Ae,_e.width,_e.height,0,ye,Le,_e.data)}else if(_.isDataArrayTexture)if(U){if(pe&&t.texStorage3D(n.TEXTURE_2D_ARRAY,De,Ae,fe.width,fe.height,fe.depth),ge)if(_.layerUpdates.size>0){const de=Mu(fe.width,fe.height,_.format,_.type);for(const ae of _.layerUpdates){const Ne=fe.data.subarray(ae*de/fe.data.BYTES_PER_ELEMENT,(ae+1)*de/fe.data.BYTES_PER_ELEMENT);t.texSubImage3D(n.TEXTURE_2D_ARRAY,0,0,0,ae,fe.width,fe.height,1,ye,Le,Ne)}_.clearLayerUpdates()}else t.texSubImage3D(n.TEXTURE_2D_ARRAY,0,0,0,0,fe.width,fe.height,fe.depth,ye,Le,fe.data)}else t.texImage3D(n.TEXTURE_2D_ARRAY,0,Ae,fe.width,fe.height,fe.depth,0,ye,Le,fe.data);else if(_.isData3DTexture)U?(pe&&t.texStorage3D(n.TEXTURE_3D,De,Ae,fe.width,fe.height,fe.depth),ge&&t.texSubImage3D(n.TEXTURE_3D,0,0,0,0,fe.width,fe.height,fe.depth,ye,Le,fe.data)):t.texImage3D(n.TEXTURE_3D,0,Ae,fe.width,fe.height,fe.depth,0,ye,Le,fe.data);else if(_.isFramebufferTexture){if(pe)if(U)t.texStorage2D(n.TEXTURE_2D,De,Ae,fe.width,fe.height);else{let de=fe.width,ae=fe.height;for(let Ne=0;Ne<De;Ne++)t.texImage2D(n.TEXTURE_2D,Ne,Ae,de,ae,0,ye,Le,null),de>>=1,ae>>=1}}else if(Ve.length>0){if(U&&pe){const de=Se(Ve[0]);t.texStorage2D(n.TEXTURE_2D,De,Ae,de.width,de.height)}for(let de=0,ae=Ve.length;de<ae;de++)_e=Ve[de],U?ge&&t.texSubImage2D(n.TEXTURE_2D,de,0,0,ye,Le,_e):t.texImage2D(n.TEXTURE_2D,de,Ae,ye,Le,_e);_.generateMipmaps=!1}else if(U){if(pe){const de=Se(fe);t.texStorage2D(n.TEXTURE_2D,De,Ae,de.width,de.height)}ge&&t.texSubImage2D(n.TEXTURE_2D,0,0,0,ye,Le,fe)}else t.texImage2D(n.TEXTURE_2D,0,Ae,ye,Le,fe);m(_)&&h(G),Ee.__version=W.version,_.onUpdate&&_.onUpdate(_)}y.__version=_.version}function P(y,_,I){if(_.image.length!==6)return;const G=Ze(y,_),ee=_.source;t.bindTexture(n.TEXTURE_CUBE_MAP,y.__webglTexture,n.TEXTURE0+I);const W=i.get(ee);if(ee.version!==W.__version||G===!0){t.activeTexture(n.TEXTURE0+I);const Ee=Qe.getPrimaries(Qe.workingColorSpace),ue=_.colorSpace===ai?null:Qe.getPrimaries(_.colorSpace),be=_.colorSpace===ai||Ee===ue?n.NONE:n.BROWSER_DEFAULT_WEBGL;n.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,_.flipY),n.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,_.premultiplyAlpha),n.pixelStorei(n.UNPACK_ALIGNMENT,_.unpackAlignment),n.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,be);const Te=_.isCompressedTexture||_.image[0].isCompressedTexture,fe=_.image[0]&&_.image[0].isDataTexture,ye=[];for(let ae=0;ae<6;ae++)!Te&&!fe?ye[ae]=x(_.image[ae],!0,r.maxCubemapSize):ye[ae]=fe?_.image[ae].image:_.image[ae],ye[ae]=oe(_,ye[ae]);const Le=ye[0],Ae=s.convert(_.format,_.colorSpace),_e=s.convert(_.type),Ve=T(_.internalFormat,Ae,_e,_.colorSpace),U=_.isVideoTexture!==!0,pe=W.__version===void 0||G===!0,ge=ee.dataReady;let De=C(_,Le);Oe(n.TEXTURE_CUBE_MAP,_);let de;if(Te){U&&pe&&t.texStorage2D(n.TEXTURE_CUBE_MAP,De,Ve,Le.width,Le.height);for(let ae=0;ae<6;ae++){de=ye[ae].mipmaps;for(let Ne=0;Ne<de.length;Ne++){const We=de[Ne];_.format!==mn?Ae!==null?U?ge&&t.compressedTexSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ae,Ne,0,0,We.width,We.height,Ae,We.data):t.compressedTexImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ae,Ne,Ve,We.width,We.height,0,We.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):U?ge&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ae,Ne,0,0,We.width,We.height,Ae,_e,We.data):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ae,Ne,Ve,We.width,We.height,0,Ae,_e,We.data)}}}else{if(de=_.mipmaps,U&&pe){de.length>0&&De++;const ae=Se(ye[0]);t.texStorage2D(n.TEXTURE_CUBE_MAP,De,Ve,ae.width,ae.height)}for(let ae=0;ae<6;ae++)if(fe){U?ge&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ae,0,0,0,ye[ae].width,ye[ae].height,Ae,_e,ye[ae].data):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ae,0,Ve,ye[ae].width,ye[ae].height,0,Ae,_e,ye[ae].data);for(let Ne=0;Ne<de.length;Ne++){const ft=de[Ne].image[ae].image;U?ge&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ae,Ne+1,0,0,ft.width,ft.height,Ae,_e,ft.data):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ae,Ne+1,Ve,ft.width,ft.height,0,Ae,_e,ft.data)}}else{U?ge&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ae,0,0,0,Ae,_e,ye[ae]):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ae,0,Ve,Ae,_e,ye[ae]);for(let Ne=0;Ne<de.length;Ne++){const We=de[Ne];U?ge&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ae,Ne+1,0,0,Ae,_e,We.image[ae]):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ae,Ne+1,Ve,Ae,_e,We.image[ae])}}}m(_)&&h(n.TEXTURE_CUBE_MAP),W.__version=ee.version,_.onUpdate&&_.onUpdate(_)}y.__version=_.version}function Z(y,_,I,G,ee,W){const Ee=s.convert(I.format,I.colorSpace),ue=s.convert(I.type),be=T(I.internalFormat,Ee,ue,I.colorSpace),Te=i.get(_),fe=i.get(I);if(fe.__renderTarget=_,!Te.__hasExternalTextures){const ye=Math.max(1,_.width>>W),Le=Math.max(1,_.height>>W);ee===n.TEXTURE_3D||ee===n.TEXTURE_2D_ARRAY?t.texImage3D(ee,W,be,ye,Le,_.depth,0,Ee,ue,null):t.texImage2D(ee,W,be,ye,Le,0,Ee,ue,null)}t.bindFramebuffer(n.FRAMEBUFFER,y),Y(_)?a.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,G,ee,fe.__webglTexture,0,ce(_)):(ee===n.TEXTURE_2D||ee>=n.TEXTURE_CUBE_MAP_POSITIVE_X&&ee<=n.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&n.framebufferTexture2D(n.FRAMEBUFFER,G,ee,fe.__webglTexture,W),t.bindFramebuffer(n.FRAMEBUFFER,null)}function re(y,_,I){if(n.bindRenderbuffer(n.RENDERBUFFER,y),_.depthBuffer){const G=_.depthTexture,ee=G&&G.isDepthTexture?G.type:null,W=M(_.stencilBuffer,ee),Ee=_.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,ue=ce(_);Y(_)?a.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,ue,W,_.width,_.height):I?n.renderbufferStorageMultisample(n.RENDERBUFFER,ue,W,_.width,_.height):n.renderbufferStorage(n.RENDERBUFFER,W,_.width,_.height),n.framebufferRenderbuffer(n.FRAMEBUFFER,Ee,n.RENDERBUFFER,y)}else{const G=_.textures;for(let ee=0;ee<G.length;ee++){const W=G[ee],Ee=s.convert(W.format,W.colorSpace),ue=s.convert(W.type),be=T(W.internalFormat,Ee,ue,W.colorSpace),Te=ce(_);I&&Y(_)===!1?n.renderbufferStorageMultisample(n.RENDERBUFFER,Te,be,_.width,_.height):Y(_)?a.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,Te,be,_.width,_.height):n.renderbufferStorage(n.RENDERBUFFER,be,_.width,_.height)}}n.bindRenderbuffer(n.RENDERBUFFER,null)}function se(y,_){if(_&&_.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(t.bindFramebuffer(n.FRAMEBUFFER,y),!(_.depthTexture&&_.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");const G=i.get(_.depthTexture);G.__renderTarget=_,(!G.__webglTexture||_.depthTexture.image.width!==_.width||_.depthTexture.image.height!==_.height)&&(_.depthTexture.image.width=_.width,_.depthTexture.image.height=_.height,_.depthTexture.needsUpdate=!0),ie(_.depthTexture,0);const ee=G.__webglTexture,W=ce(_);if(_.depthTexture.format===ts)Y(_)?a.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,n.DEPTH_ATTACHMENT,n.TEXTURE_2D,ee,0,W):n.framebufferTexture2D(n.FRAMEBUFFER,n.DEPTH_ATTACHMENT,n.TEXTURE_2D,ee,0);else if(_.depthTexture.format===ns)Y(_)?a.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,n.DEPTH_STENCIL_ATTACHMENT,n.TEXTURE_2D,ee,0,W):n.framebufferTexture2D(n.FRAMEBUFFER,n.DEPTH_STENCIL_ATTACHMENT,n.TEXTURE_2D,ee,0);else throw new Error("Unknown depthTexture format")}function Ie(y){const _=i.get(y),I=y.isWebGLCubeRenderTarget===!0;if(_.__boundDepthTexture!==y.depthTexture){const G=y.depthTexture;if(_.__depthDisposeCallback&&_.__depthDisposeCallback(),G){const ee=()=>{delete _.__boundDepthTexture,delete _.__depthDisposeCallback,G.removeEventListener("dispose",ee)};G.addEventListener("dispose",ee),_.__depthDisposeCallback=ee}_.__boundDepthTexture=G}if(y.depthTexture&&!_.__autoAllocateDepthBuffer){if(I)throw new Error("target.depthTexture not supported in Cube render targets");const G=y.texture.mipmaps;G&&G.length>0?se(_.__webglFramebuffer[0],y):se(_.__webglFramebuffer,y)}else if(I){_.__webglDepthbuffer=[];for(let G=0;G<6;G++)if(t.bindFramebuffer(n.FRAMEBUFFER,_.__webglFramebuffer[G]),_.__webglDepthbuffer[G]===void 0)_.__webglDepthbuffer[G]=n.createRenderbuffer(),re(_.__webglDepthbuffer[G],y,!1);else{const ee=y.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,W=_.__webglDepthbuffer[G];n.bindRenderbuffer(n.RENDERBUFFER,W),n.framebufferRenderbuffer(n.FRAMEBUFFER,ee,n.RENDERBUFFER,W)}}else{const G=y.texture.mipmaps;if(G&&G.length>0?t.bindFramebuffer(n.FRAMEBUFFER,_.__webglFramebuffer[0]):t.bindFramebuffer(n.FRAMEBUFFER,_.__webglFramebuffer),_.__webglDepthbuffer===void 0)_.__webglDepthbuffer=n.createRenderbuffer(),re(_.__webglDepthbuffer,y,!1);else{const ee=y.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,W=_.__webglDepthbuffer;n.bindRenderbuffer(n.RENDERBUFFER,W),n.framebufferRenderbuffer(n.FRAMEBUFFER,ee,n.RENDERBUFFER,W)}}t.bindFramebuffer(n.FRAMEBUFFER,null)}function A(y,_,I){const G=i.get(y);_!==void 0&&Z(G.__webglFramebuffer,y,y.texture,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,0),I!==void 0&&Ie(y)}function g(y){const _=y.texture,I=i.get(y),G=i.get(_);y.addEventListener("dispose",R);const ee=y.textures,W=y.isWebGLCubeRenderTarget===!0,Ee=ee.length>1;if(Ee||(G.__webglTexture===void 0&&(G.__webglTexture=n.createTexture()),G.__version=_.version,o.memory.textures++),W){I.__webglFramebuffer=[];for(let ue=0;ue<6;ue++)if(_.mipmaps&&_.mipmaps.length>0){I.__webglFramebuffer[ue]=[];for(let be=0;be<_.mipmaps.length;be++)I.__webglFramebuffer[ue][be]=n.createFramebuffer()}else I.__webglFramebuffer[ue]=n.createFramebuffer()}else{if(_.mipmaps&&_.mipmaps.length>0){I.__webglFramebuffer=[];for(let ue=0;ue<_.mipmaps.length;ue++)I.__webglFramebuffer[ue]=n.createFramebuffer()}else I.__webglFramebuffer=n.createFramebuffer();if(Ee)for(let ue=0,be=ee.length;ue<be;ue++){const Te=i.get(ee[ue]);Te.__webglTexture===void 0&&(Te.__webglTexture=n.createTexture(),o.memory.textures++)}if(y.samples>0&&Y(y)===!1){I.__webglMultisampledFramebuffer=n.createFramebuffer(),I.__webglColorRenderbuffer=[],t.bindFramebuffer(n.FRAMEBUFFER,I.__webglMultisampledFramebuffer);for(let ue=0;ue<ee.length;ue++){const be=ee[ue];I.__webglColorRenderbuffer[ue]=n.createRenderbuffer(),n.bindRenderbuffer(n.RENDERBUFFER,I.__webglColorRenderbuffer[ue]);const Te=s.convert(be.format,be.colorSpace),fe=s.convert(be.type),ye=T(be.internalFormat,Te,fe,be.colorSpace,y.isXRRenderTarget===!0),Le=ce(y);n.renderbufferStorageMultisample(n.RENDERBUFFER,Le,ye,y.width,y.height),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+ue,n.RENDERBUFFER,I.__webglColorRenderbuffer[ue])}n.bindRenderbuffer(n.RENDERBUFFER,null),y.depthBuffer&&(I.__webglDepthRenderbuffer=n.createRenderbuffer(),re(I.__webglDepthRenderbuffer,y,!0)),t.bindFramebuffer(n.FRAMEBUFFER,null)}}if(W){t.bindTexture(n.TEXTURE_CUBE_MAP,G.__webglTexture),Oe(n.TEXTURE_CUBE_MAP,_);for(let ue=0;ue<6;ue++)if(_.mipmaps&&_.mipmaps.length>0)for(let be=0;be<_.mipmaps.length;be++)Z(I.__webglFramebuffer[ue][be],y,_,n.COLOR_ATTACHMENT0,n.TEXTURE_CUBE_MAP_POSITIVE_X+ue,be);else Z(I.__webglFramebuffer[ue],y,_,n.COLOR_ATTACHMENT0,n.TEXTURE_CUBE_MAP_POSITIVE_X+ue,0);m(_)&&h(n.TEXTURE_CUBE_MAP),t.unbindTexture()}else if(Ee){for(let ue=0,be=ee.length;ue<be;ue++){const Te=ee[ue],fe=i.get(Te);let ye=n.TEXTURE_2D;(y.isWebGL3DRenderTarget||y.isWebGLArrayRenderTarget)&&(ye=y.isWebGL3DRenderTarget?n.TEXTURE_3D:n.TEXTURE_2D_ARRAY),t.bindTexture(ye,fe.__webglTexture),Oe(ye,Te),Z(I.__webglFramebuffer,y,Te,n.COLOR_ATTACHMENT0+ue,ye,0),m(Te)&&h(ye)}t.unbindTexture()}else{let ue=n.TEXTURE_2D;if((y.isWebGL3DRenderTarget||y.isWebGLArrayRenderTarget)&&(ue=y.isWebGL3DRenderTarget?n.TEXTURE_3D:n.TEXTURE_2D_ARRAY),t.bindTexture(ue,G.__webglTexture),Oe(ue,_),_.mipmaps&&_.mipmaps.length>0)for(let be=0;be<_.mipmaps.length;be++)Z(I.__webglFramebuffer[be],y,_,n.COLOR_ATTACHMENT0,ue,be);else Z(I.__webglFramebuffer,y,_,n.COLOR_ATTACHMENT0,ue,0);m(_)&&h(ue),t.unbindTexture()}y.depthBuffer&&Ie(y)}function N(y){const _=y.textures;for(let I=0,G=_.length;I<G;I++){const ee=_[I];if(m(ee)){const W=w(y),Ee=i.get(ee).__webglTexture;t.bindTexture(W,Ee),h(W),t.unbindTexture()}}}const H=[],V=[];function F(y){if(y.samples>0){if(Y(y)===!1){const _=y.textures,I=y.width,G=y.height;let ee=n.COLOR_BUFFER_BIT;const W=y.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,Ee=i.get(y),ue=_.length>1;if(ue)for(let Te=0;Te<_.length;Te++)t.bindFramebuffer(n.FRAMEBUFFER,Ee.__webglMultisampledFramebuffer),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+Te,n.RENDERBUFFER,null),t.bindFramebuffer(n.FRAMEBUFFER,Ee.__webglFramebuffer),n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0+Te,n.TEXTURE_2D,null,0);t.bindFramebuffer(n.READ_FRAMEBUFFER,Ee.__webglMultisampledFramebuffer);const be=y.texture.mipmaps;be&&be.length>0?t.bindFramebuffer(n.DRAW_FRAMEBUFFER,Ee.__webglFramebuffer[0]):t.bindFramebuffer(n.DRAW_FRAMEBUFFER,Ee.__webglFramebuffer);for(let Te=0;Te<_.length;Te++){if(y.resolveDepthBuffer&&(y.depthBuffer&&(ee|=n.DEPTH_BUFFER_BIT),y.stencilBuffer&&y.resolveStencilBuffer&&(ee|=n.STENCIL_BUFFER_BIT)),ue){n.framebufferRenderbuffer(n.READ_FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.RENDERBUFFER,Ee.__webglColorRenderbuffer[Te]);const fe=i.get(_[Te]).__webglTexture;n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,fe,0)}n.blitFramebuffer(0,0,I,G,0,0,I,G,ee,n.NEAREST),l===!0&&(H.length=0,V.length=0,H.push(n.COLOR_ATTACHMENT0+Te),y.depthBuffer&&y.resolveDepthBuffer===!1&&(H.push(W),V.push(W),n.invalidateFramebuffer(n.DRAW_FRAMEBUFFER,V)),n.invalidateFramebuffer(n.READ_FRAMEBUFFER,H))}if(t.bindFramebuffer(n.READ_FRAMEBUFFER,null),t.bindFramebuffer(n.DRAW_FRAMEBUFFER,null),ue)for(let Te=0;Te<_.length;Te++){t.bindFramebuffer(n.FRAMEBUFFER,Ee.__webglMultisampledFramebuffer),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+Te,n.RENDERBUFFER,Ee.__webglColorRenderbuffer[Te]);const fe=i.get(_[Te]).__webglTexture;t.bindFramebuffer(n.FRAMEBUFFER,Ee.__webglFramebuffer),n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0+Te,n.TEXTURE_2D,fe,0)}t.bindFramebuffer(n.DRAW_FRAMEBUFFER,Ee.__webglMultisampledFramebuffer)}else if(y.depthBuffer&&y.resolveDepthBuffer===!1&&l){const _=y.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT;n.invalidateFramebuffer(n.DRAW_FRAMEBUFFER,[_])}}}function ce(y){return Math.min(r.maxSamples,y.samples)}function Y(y){const _=i.get(y);return y.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&_.__useRenderToTexture!==!1}function ne(y){const _=o.render.frame;u.get(y)!==_&&(u.set(y,_),y.update())}function oe(y,_){const I=y.colorSpace,G=y.format,ee=y.type;return y.isCompressedTexture===!0||y.isVideoTexture===!0||I!==xr&&I!==ai&&(Qe.getTransfer(I)===at?(G!==mn||ee!==qn)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",I)),_}function Se(y){return typeof HTMLImageElement<"u"&&y instanceof HTMLImageElement?(c.width=y.naturalWidth||y.width,c.height=y.naturalHeight||y.height):typeof VideoFrame<"u"&&y instanceof VideoFrame?(c.width=y.displayWidth,c.height=y.displayHeight):(c.width=y.width,c.height=y.height),c}this.allocateTextureUnit=K,this.resetTextureUnits=X,this.setTexture2D=ie,this.setTexture2DArray=J,this.setTexture3D=Q,this.setTextureCube=z,this.rebindTextures=A,this.setupRenderTarget=g,this.updateRenderTargetMipmap=N,this.updateMultisampleRenderTarget=F,this.setupDepthRenderbuffer=Ie,this.setupFrameBufferTexture=Z,this.useMultisampledRTT=Y}function WS(n,e){function t(i,r=ai){let s;const o=Qe.getTransfer(r);if(i===qn)return n.UNSIGNED_BYTE;if(i===jl)return n.UNSIGNED_SHORT_4_4_4_4;if(i===ql)return n.UNSIGNED_SHORT_5_5_5_1;if(i===Ad)return n.UNSIGNED_INT_5_9_9_9_REV;if(i===wd)return n.UNSIGNED_INT_10F_11F_11F_REV;if(i===bd)return n.BYTE;if(i===Td)return n.SHORT;if(i===Qr)return n.UNSIGNED_SHORT;if(i===Xl)return n.INT;if(i===Ni)return n.UNSIGNED_INT;if(i===Gn)return n.FLOAT;if(i===as)return n.HALF_FLOAT;if(i===Rd)return n.ALPHA;if(i===Cd)return n.RGB;if(i===mn)return n.RGBA;if(i===ts)return n.DEPTH_COMPONENT;if(i===ns)return n.DEPTH_STENCIL;if(i===Pd)return n.RED;if(i===Yl)return n.RED_INTEGER;if(i===Dd)return n.RG;if(i===$l)return n.RG_INTEGER;if(i===Kl)return n.RGBA_INTEGER;if(i===Gs||i===Ws||i===Xs||i===js)if(o===at)if(s=e.get("WEBGL_compressed_texture_s3tc_srgb"),s!==null){if(i===Gs)return s.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(i===Ws)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(i===Xs)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(i===js)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(s=e.get("WEBGL_compressed_texture_s3tc"),s!==null){if(i===Gs)return s.COMPRESSED_RGB_S3TC_DXT1_EXT;if(i===Ws)return s.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(i===Xs)return s.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(i===js)return s.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(i===Ga||i===Wa||i===Xa||i===ja)if(s=e.get("WEBGL_compressed_texture_pvrtc"),s!==null){if(i===Ga)return s.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(i===Wa)return s.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(i===Xa)return s.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(i===ja)return s.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(i===qa||i===Ya||i===$a)if(s=e.get("WEBGL_compressed_texture_etc"),s!==null){if(i===qa||i===Ya)return o===at?s.COMPRESSED_SRGB8_ETC2:s.COMPRESSED_RGB8_ETC2;if(i===$a)return o===at?s.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:s.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(i===Ka||i===Za||i===Ja||i===Qa||i===el||i===tl||i===nl||i===il||i===rl||i===sl||i===ol||i===al||i===ll||i===cl)if(s=e.get("WEBGL_compressed_texture_astc"),s!==null){if(i===Ka)return o===at?s.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:s.COMPRESSED_RGBA_ASTC_4x4_KHR;if(i===Za)return o===at?s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:s.COMPRESSED_RGBA_ASTC_5x4_KHR;if(i===Ja)return o===at?s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:s.COMPRESSED_RGBA_ASTC_5x5_KHR;if(i===Qa)return o===at?s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:s.COMPRESSED_RGBA_ASTC_6x5_KHR;if(i===el)return o===at?s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:s.COMPRESSED_RGBA_ASTC_6x6_KHR;if(i===tl)return o===at?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:s.COMPRESSED_RGBA_ASTC_8x5_KHR;if(i===nl)return o===at?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:s.COMPRESSED_RGBA_ASTC_8x6_KHR;if(i===il)return o===at?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:s.COMPRESSED_RGBA_ASTC_8x8_KHR;if(i===rl)return o===at?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:s.COMPRESSED_RGBA_ASTC_10x5_KHR;if(i===sl)return o===at?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:s.COMPRESSED_RGBA_ASTC_10x6_KHR;if(i===ol)return o===at?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:s.COMPRESSED_RGBA_ASTC_10x8_KHR;if(i===al)return o===at?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:s.COMPRESSED_RGBA_ASTC_10x10_KHR;if(i===ll)return o===at?s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:s.COMPRESSED_RGBA_ASTC_12x10_KHR;if(i===cl)return o===at?s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:s.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(i===ul||i===fl||i===dl)if(s=e.get("EXT_texture_compression_bptc"),s!==null){if(i===ul)return o===at?s.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:s.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(i===fl)return s.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(i===dl)return s.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(i===hl||i===pl||i===ml||i===gl)if(s=e.get("EXT_texture_compression_rgtc"),s!==null){if(i===hl)return s.COMPRESSED_RED_RGTC1_EXT;if(i===pl)return s.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(i===ml)return s.COMPRESSED_RED_GREEN_RGTC2_EXT;if(i===gl)return s.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return i===es?n.UNSIGNED_INT_24_8:n[i]!==void 0?n[i]:null}return{convert:t}}const XS=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,jS=`
uniform sampler2DArray depthColor;
uniform float depthWidth;
uniform float depthHeight;

void main() {

	vec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );

	if ( coord.x >= 1.0 ) {

		gl_FragDepth = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;

	} else {

		gl_FragDepth = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;

	}

}`;class qS{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t){if(this.texture===null){const i=new Wd(e.texture);(e.depthNear!==t.depthNear||e.depthFar!==t.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=i}}getMesh(e){if(this.texture!==null&&this.mesh===null){const t=e.cameras[0].viewport,i=new pi({vertexShader:XS,fragmentShader:jS,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new An(new Mo(20,20),i)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class YS extends Sr{constructor(e,t){super();const i=this;let r=null,s=1,o=null,a="local-floor",l=1,c=null,u=null,f=null,d=null,p=null,v=null;const x=typeof XRWebGLBinding<"u",m=new qS,h={},w=t.getContextAttributes();let T=null,M=null;const C=[],D=[],R=new ct;let k=null;const b=new an;b.viewport=new St;const E=new an;E.viewport=new St;const L=[b,E],X=new mv;let K=null,le=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(te){let P=C[te];return P===void 0&&(P=new la,C[te]=P),P.getTargetRaySpace()},this.getControllerGrip=function(te){let P=C[te];return P===void 0&&(P=new la,C[te]=P),P.getGripSpace()},this.getHand=function(te){let P=C[te];return P===void 0&&(P=new la,C[te]=P),P.getHandSpace()};function ie(te){const P=D.indexOf(te.inputSource);if(P===-1)return;const Z=C[P];Z!==void 0&&(Z.update(te.inputSource,te.frame,c||o),Z.dispatchEvent({type:te.type,data:te.inputSource}))}function J(){r.removeEventListener("select",ie),r.removeEventListener("selectstart",ie),r.removeEventListener("selectend",ie),r.removeEventListener("squeeze",ie),r.removeEventListener("squeezestart",ie),r.removeEventListener("squeezeend",ie),r.removeEventListener("end",J),r.removeEventListener("inputsourceschange",Q);for(let te=0;te<C.length;te++){const P=D[te];P!==null&&(D[te]=null,C[te].disconnect(P))}K=null,le=null,m.reset();for(const te in h)delete h[te];e.setRenderTarget(T),p=null,d=null,f=null,r=null,M=null,$e.stop(),i.isPresenting=!1,e.setPixelRatio(k),e.setSize(R.width,R.height,!1),i.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(te){s=te,i.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(te){a=te,i.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||o},this.setReferenceSpace=function(te){c=te},this.getBaseLayer=function(){return d!==null?d:p},this.getBinding=function(){return f===null&&x&&(f=new XRWebGLBinding(r,t)),f},this.getFrame=function(){return v},this.getSession=function(){return r},this.setSession=async function(te){if(r=te,r!==null){if(T=e.getRenderTarget(),r.addEventListener("select",ie),r.addEventListener("selectstart",ie),r.addEventListener("selectend",ie),r.addEventListener("squeeze",ie),r.addEventListener("squeezestart",ie),r.addEventListener("squeezeend",ie),r.addEventListener("end",J),r.addEventListener("inputsourceschange",Q),w.xrCompatible!==!0&&await t.makeXRCompatible(),k=e.getPixelRatio(),e.getSize(R),x&&"createProjectionLayer"in XRWebGLBinding.prototype){let Z=null,re=null,se=null;w.depth&&(se=w.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,Z=w.stencil?ns:ts,re=w.stencil?es:Ni);const Ie={colorFormat:t.RGBA8,depthFormat:se,scaleFactor:s};f=this.getBinding(),d=f.createProjectionLayer(Ie),r.updateRenderState({layers:[d]}),e.setPixelRatio(1),e.setSize(d.textureWidth,d.textureHeight,!1),M=new Fi(d.textureWidth,d.textureHeight,{format:mn,type:qn,depthTexture:new Gd(d.textureWidth,d.textureHeight,re,void 0,void 0,void 0,void 0,void 0,void 0,Z),stencilBuffer:w.stencil,colorSpace:e.outputColorSpace,samples:w.antialias?4:0,resolveDepthBuffer:d.ignoreDepthValues===!1,resolveStencilBuffer:d.ignoreDepthValues===!1})}else{const Z={antialias:w.antialias,alpha:!0,depth:w.depth,stencil:w.stencil,framebufferScaleFactor:s};p=new XRWebGLLayer(r,t,Z),r.updateRenderState({baseLayer:p}),e.setPixelRatio(1),e.setSize(p.framebufferWidth,p.framebufferHeight,!1),M=new Fi(p.framebufferWidth,p.framebufferHeight,{format:mn,type:qn,colorSpace:e.outputColorSpace,stencilBuffer:w.stencil,resolveDepthBuffer:p.ignoreDepthValues===!1,resolveStencilBuffer:p.ignoreDepthValues===!1})}M.isXRRenderTarget=!0,this.setFoveation(l),c=null,o=await r.requestReferenceSpace(a),$e.setContext(r),$e.start(),i.isPresenting=!0,i.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(r!==null)return r.environmentBlendMode},this.getDepthTexture=function(){return m.getDepthTexture()};function Q(te){for(let P=0;P<te.removed.length;P++){const Z=te.removed[P],re=D.indexOf(Z);re>=0&&(D[re]=null,C[re].disconnect(Z))}for(let P=0;P<te.added.length;P++){const Z=te.added[P];let re=D.indexOf(Z);if(re===-1){for(let Ie=0;Ie<C.length;Ie++)if(Ie>=D.length){D.push(Z),re=Ie;break}else if(D[Ie]===null){D[Ie]=Z,re=Ie;break}if(re===-1)break}const se=C[re];se&&se.connect(Z)}}const z=new q,me=new q;function ve(te,P,Z){z.setFromMatrixPosition(P.matrixWorld),me.setFromMatrixPosition(Z.matrixWorld);const re=z.distanceTo(me),se=P.projectionMatrix.elements,Ie=Z.projectionMatrix.elements,A=se[14]/(se[10]-1),g=se[14]/(se[10]+1),N=(se[9]+1)/se[5],H=(se[9]-1)/se[5],V=(se[8]-1)/se[0],F=(Ie[8]+1)/Ie[0],ce=A*V,Y=A*F,ne=re/(-V+F),oe=ne*-V;if(P.matrixWorld.decompose(te.position,te.quaternion,te.scale),te.translateX(oe),te.translateZ(ne),te.matrixWorld.compose(te.position,te.quaternion,te.scale),te.matrixWorldInverse.copy(te.matrixWorld).invert(),se[10]===-1)te.projectionMatrix.copy(P.projectionMatrix),te.projectionMatrixInverse.copy(P.projectionMatrixInverse);else{const Se=A+ne,y=g+ne,_=ce-oe,I=Y+(re-oe),G=N*g/y*Se,ee=H*g/y*Se;te.projectionMatrix.makePerspective(_,I,G,ee,Se,y),te.projectionMatrixInverse.copy(te.projectionMatrix).invert()}}function Re(te,P){P===null?te.matrixWorld.copy(te.matrix):te.matrixWorld.multiplyMatrices(P.matrixWorld,te.matrix),te.matrixWorldInverse.copy(te.matrixWorld).invert()}this.updateCamera=function(te){if(r===null)return;let P=te.near,Z=te.far;m.texture!==null&&(m.depthNear>0&&(P=m.depthNear),m.depthFar>0&&(Z=m.depthFar)),X.near=E.near=b.near=P,X.far=E.far=b.far=Z,(K!==X.near||le!==X.far)&&(r.updateRenderState({depthNear:X.near,depthFar:X.far}),K=X.near,le=X.far),X.layers.mask=te.layers.mask|6,b.layers.mask=X.layers.mask&3,E.layers.mask=X.layers.mask&5;const re=te.parent,se=X.cameras;Re(X,re);for(let Ie=0;Ie<se.length;Ie++)Re(se[Ie],re);se.length===2?ve(X,b,E):X.projectionMatrix.copy(b.projectionMatrix),Oe(te,X,re)};function Oe(te,P,Z){Z===null?te.matrix.copy(P.matrixWorld):(te.matrix.copy(Z.matrixWorld),te.matrix.invert(),te.matrix.multiply(P.matrixWorld)),te.matrix.decompose(te.position,te.quaternion,te.scale),te.updateMatrixWorld(!0),te.projectionMatrix.copy(P.projectionMatrix),te.projectionMatrixInverse.copy(P.projectionMatrixInverse),te.isPerspectiveCamera&&(te.fov=_l*2*Math.atan(1/te.projectionMatrix.elements[5]),te.zoom=1)}this.getCamera=function(){return X},this.getFoveation=function(){if(!(d===null&&p===null))return l},this.setFoveation=function(te){l=te,d!==null&&(d.fixedFoveation=te),p!==null&&p.fixedFoveation!==void 0&&(p.fixedFoveation=te)},this.hasDepthSensing=function(){return m.texture!==null},this.getDepthSensingMesh=function(){return m.getMesh(X)},this.getCameraTexture=function(te){return h[te]};let Ze=null;function et(te,P){if(u=P.getViewerPose(c||o),v=P,u!==null){const Z=u.views;p!==null&&(e.setRenderTargetFramebuffer(M,p.framebuffer),e.setRenderTarget(M));let re=!1;Z.length!==X.cameras.length&&(X.cameras.length=0,re=!0);for(let g=0;g<Z.length;g++){const N=Z[g];let H=null;if(p!==null)H=p.getViewport(N);else{const F=f.getViewSubImage(d,N);H=F.viewport,g===0&&(e.setRenderTargetTextures(M,F.colorTexture,F.depthStencilTexture),e.setRenderTarget(M))}let V=L[g];V===void 0&&(V=new an,V.layers.enable(g),V.viewport=new St,L[g]=V),V.matrix.fromArray(N.transform.matrix),V.matrix.decompose(V.position,V.quaternion,V.scale),V.projectionMatrix.fromArray(N.projectionMatrix),V.projectionMatrixInverse.copy(V.projectionMatrix).invert(),V.viewport.set(H.x,H.y,H.width,H.height),g===0&&(X.matrix.copy(V.matrix),X.matrix.decompose(X.position,X.quaternion,X.scale)),re===!0&&X.cameras.push(V)}const se=r.enabledFeatures;if(se&&se.includes("depth-sensing")&&r.depthUsage=="gpu-optimized"&&x){f=i.getBinding();const g=f.getDepthInformation(Z[0]);g&&g.isValid&&g.texture&&m.init(g,r.renderState)}if(se&&se.includes("camera-access")&&x){e.state.unbindTexture(),f=i.getBinding();for(let g=0;g<Z.length;g++){const N=Z[g].camera;if(N){let H=h[N];H||(H=new Wd,h[N]=H);const V=f.getCameraImage(N);H.sourceTexture=V}}}}for(let Z=0;Z<C.length;Z++){const re=D[Z],se=C[Z];re!==null&&se!==void 0&&se.update(re,P,c||o)}Ze&&Ze(te,P),P.detectedPlanes&&i.dispatchEvent({type:"planesdetected",data:P}),v=null}const $e=new Xd;$e.setAnimationLoop(et),this.setAnimationLoop=function(te){Ze=te},this.dispose=function(){}}}const Ti=new Yn,$S=new At;function KS(n,e){function t(m,h){m.matrixAutoUpdate===!0&&m.updateMatrix(),h.value.copy(m.matrix)}function i(m,h){h.color.getRGB(m.fogColor.value,kd(n)),h.isFog?(m.fogNear.value=h.near,m.fogFar.value=h.far):h.isFogExp2&&(m.fogDensity.value=h.density)}function r(m,h,w,T,M){h.isMeshBasicMaterial||h.isMeshLambertMaterial?s(m,h):h.isMeshToonMaterial?(s(m,h),f(m,h)):h.isMeshPhongMaterial?(s(m,h),u(m,h)):h.isMeshStandardMaterial?(s(m,h),d(m,h),h.isMeshPhysicalMaterial&&p(m,h,M)):h.isMeshMatcapMaterial?(s(m,h),v(m,h)):h.isMeshDepthMaterial?s(m,h):h.isMeshDistanceMaterial?(s(m,h),x(m,h)):h.isMeshNormalMaterial?s(m,h):h.isLineBasicMaterial?(o(m,h),h.isLineDashedMaterial&&a(m,h)):h.isPointsMaterial?l(m,h,w,T):h.isSpriteMaterial?c(m,h):h.isShadowMaterial?(m.color.value.copy(h.color),m.opacity.value=h.opacity):h.isShaderMaterial&&(h.uniformsNeedUpdate=!1)}function s(m,h){m.opacity.value=h.opacity,h.color&&m.diffuse.value.copy(h.color),h.emissive&&m.emissive.value.copy(h.emissive).multiplyScalar(h.emissiveIntensity),h.map&&(m.map.value=h.map,t(h.map,m.mapTransform)),h.alphaMap&&(m.alphaMap.value=h.alphaMap,t(h.alphaMap,m.alphaMapTransform)),h.bumpMap&&(m.bumpMap.value=h.bumpMap,t(h.bumpMap,m.bumpMapTransform),m.bumpScale.value=h.bumpScale,h.side===jt&&(m.bumpScale.value*=-1)),h.normalMap&&(m.normalMap.value=h.normalMap,t(h.normalMap,m.normalMapTransform),m.normalScale.value.copy(h.normalScale),h.side===jt&&m.normalScale.value.negate()),h.displacementMap&&(m.displacementMap.value=h.displacementMap,t(h.displacementMap,m.displacementMapTransform),m.displacementScale.value=h.displacementScale,m.displacementBias.value=h.displacementBias),h.emissiveMap&&(m.emissiveMap.value=h.emissiveMap,t(h.emissiveMap,m.emissiveMapTransform)),h.specularMap&&(m.specularMap.value=h.specularMap,t(h.specularMap,m.specularMapTransform)),h.alphaTest>0&&(m.alphaTest.value=h.alphaTest);const w=e.get(h),T=w.envMap,M=w.envMapRotation;T&&(m.envMap.value=T,Ti.copy(M),Ti.x*=-1,Ti.y*=-1,Ti.z*=-1,T.isCubeTexture&&T.isRenderTargetTexture===!1&&(Ti.y*=-1,Ti.z*=-1),m.envMapRotation.value.setFromMatrix4($S.makeRotationFromEuler(Ti)),m.flipEnvMap.value=T.isCubeTexture&&T.isRenderTargetTexture===!1?-1:1,m.reflectivity.value=h.reflectivity,m.ior.value=h.ior,m.refractionRatio.value=h.refractionRatio),h.lightMap&&(m.lightMap.value=h.lightMap,m.lightMapIntensity.value=h.lightMapIntensity,t(h.lightMap,m.lightMapTransform)),h.aoMap&&(m.aoMap.value=h.aoMap,m.aoMapIntensity.value=h.aoMapIntensity,t(h.aoMap,m.aoMapTransform))}function o(m,h){m.diffuse.value.copy(h.color),m.opacity.value=h.opacity,h.map&&(m.map.value=h.map,t(h.map,m.mapTransform))}function a(m,h){m.dashSize.value=h.dashSize,m.totalSize.value=h.dashSize+h.gapSize,m.scale.value=h.scale}function l(m,h,w,T){m.diffuse.value.copy(h.color),m.opacity.value=h.opacity,m.size.value=h.size*w,m.scale.value=T*.5,h.map&&(m.map.value=h.map,t(h.map,m.uvTransform)),h.alphaMap&&(m.alphaMap.value=h.alphaMap,t(h.alphaMap,m.alphaMapTransform)),h.alphaTest>0&&(m.alphaTest.value=h.alphaTest)}function c(m,h){m.diffuse.value.copy(h.color),m.opacity.value=h.opacity,m.rotation.value=h.rotation,h.map&&(m.map.value=h.map,t(h.map,m.mapTransform)),h.alphaMap&&(m.alphaMap.value=h.alphaMap,t(h.alphaMap,m.alphaMapTransform)),h.alphaTest>0&&(m.alphaTest.value=h.alphaTest)}function u(m,h){m.specular.value.copy(h.specular),m.shininess.value=Math.max(h.shininess,1e-4)}function f(m,h){h.gradientMap&&(m.gradientMap.value=h.gradientMap)}function d(m,h){m.metalness.value=h.metalness,h.metalnessMap&&(m.metalnessMap.value=h.metalnessMap,t(h.metalnessMap,m.metalnessMapTransform)),m.roughness.value=h.roughness,h.roughnessMap&&(m.roughnessMap.value=h.roughnessMap,t(h.roughnessMap,m.roughnessMapTransform)),h.envMap&&(m.envMapIntensity.value=h.envMapIntensity)}function p(m,h,w){m.ior.value=h.ior,h.sheen>0&&(m.sheenColor.value.copy(h.sheenColor).multiplyScalar(h.sheen),m.sheenRoughness.value=h.sheenRoughness,h.sheenColorMap&&(m.sheenColorMap.value=h.sheenColorMap,t(h.sheenColorMap,m.sheenColorMapTransform)),h.sheenRoughnessMap&&(m.sheenRoughnessMap.value=h.sheenRoughnessMap,t(h.sheenRoughnessMap,m.sheenRoughnessMapTransform))),h.clearcoat>0&&(m.clearcoat.value=h.clearcoat,m.clearcoatRoughness.value=h.clearcoatRoughness,h.clearcoatMap&&(m.clearcoatMap.value=h.clearcoatMap,t(h.clearcoatMap,m.clearcoatMapTransform)),h.clearcoatRoughnessMap&&(m.clearcoatRoughnessMap.value=h.clearcoatRoughnessMap,t(h.clearcoatRoughnessMap,m.clearcoatRoughnessMapTransform)),h.clearcoatNormalMap&&(m.clearcoatNormalMap.value=h.clearcoatNormalMap,t(h.clearcoatNormalMap,m.clearcoatNormalMapTransform),m.clearcoatNormalScale.value.copy(h.clearcoatNormalScale),h.side===jt&&m.clearcoatNormalScale.value.negate())),h.dispersion>0&&(m.dispersion.value=h.dispersion),h.iridescence>0&&(m.iridescence.value=h.iridescence,m.iridescenceIOR.value=h.iridescenceIOR,m.iridescenceThicknessMinimum.value=h.iridescenceThicknessRange[0],m.iridescenceThicknessMaximum.value=h.iridescenceThicknessRange[1],h.iridescenceMap&&(m.iridescenceMap.value=h.iridescenceMap,t(h.iridescenceMap,m.iridescenceMapTransform)),h.iridescenceThicknessMap&&(m.iridescenceThicknessMap.value=h.iridescenceThicknessMap,t(h.iridescenceThicknessMap,m.iridescenceThicknessMapTransform))),h.transmission>0&&(m.transmission.value=h.transmission,m.transmissionSamplerMap.value=w.texture,m.transmissionSamplerSize.value.set(w.width,w.height),h.transmissionMap&&(m.transmissionMap.value=h.transmissionMap,t(h.transmissionMap,m.transmissionMapTransform)),m.thickness.value=h.thickness,h.thicknessMap&&(m.thicknessMap.value=h.thicknessMap,t(h.thicknessMap,m.thicknessMapTransform)),m.attenuationDistance.value=h.attenuationDistance,m.attenuationColor.value.copy(h.attenuationColor)),h.anisotropy>0&&(m.anisotropyVector.value.set(h.anisotropy*Math.cos(h.anisotropyRotation),h.anisotropy*Math.sin(h.anisotropyRotation)),h.anisotropyMap&&(m.anisotropyMap.value=h.anisotropyMap,t(h.anisotropyMap,m.anisotropyMapTransform))),m.specularIntensity.value=h.specularIntensity,m.specularColor.value.copy(h.specularColor),h.specularColorMap&&(m.specularColorMap.value=h.specularColorMap,t(h.specularColorMap,m.specularColorMapTransform)),h.specularIntensityMap&&(m.specularIntensityMap.value=h.specularIntensityMap,t(h.specularIntensityMap,m.specularIntensityMapTransform))}function v(m,h){h.matcap&&(m.matcap.value=h.matcap)}function x(m,h){const w=e.get(h).light;m.referencePosition.value.setFromMatrixPosition(w.matrixWorld),m.nearDistance.value=w.shadow.camera.near,m.farDistance.value=w.shadow.camera.far}return{refreshFogUniforms:i,refreshMaterialUniforms:r}}function ZS(n,e,t,i){let r={},s={},o=[];const a=n.getParameter(n.MAX_UNIFORM_BUFFER_BINDINGS);function l(w,T){const M=T.program;i.uniformBlockBinding(w,M)}function c(w,T){let M=r[w.id];M===void 0&&(v(w),M=u(w),r[w.id]=M,w.addEventListener("dispose",m));const C=T.program;i.updateUBOMapping(w,C);const D=e.render.frame;s[w.id]!==D&&(d(w),s[w.id]=D)}function u(w){const T=f();w.__bindingPointIndex=T;const M=n.createBuffer(),C=w.__size,D=w.usage;return n.bindBuffer(n.UNIFORM_BUFFER,M),n.bufferData(n.UNIFORM_BUFFER,C,D),n.bindBuffer(n.UNIFORM_BUFFER,null),n.bindBufferBase(n.UNIFORM_BUFFER,T,M),M}function f(){for(let w=0;w<a;w++)if(o.indexOf(w)===-1)return o.push(w),w;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function d(w){const T=r[w.id],M=w.uniforms,C=w.__cache;n.bindBuffer(n.UNIFORM_BUFFER,T);for(let D=0,R=M.length;D<R;D++){const k=Array.isArray(M[D])?M[D]:[M[D]];for(let b=0,E=k.length;b<E;b++){const L=k[b];if(p(L,D,b,C)===!0){const X=L.__offset,K=Array.isArray(L.value)?L.value:[L.value];let le=0;for(let ie=0;ie<K.length;ie++){const J=K[ie],Q=x(J);typeof J=="number"||typeof J=="boolean"?(L.__data[0]=J,n.bufferSubData(n.UNIFORM_BUFFER,X+le,L.__data)):J.isMatrix3?(L.__data[0]=J.elements[0],L.__data[1]=J.elements[1],L.__data[2]=J.elements[2],L.__data[3]=0,L.__data[4]=J.elements[3],L.__data[5]=J.elements[4],L.__data[6]=J.elements[5],L.__data[7]=0,L.__data[8]=J.elements[6],L.__data[9]=J.elements[7],L.__data[10]=J.elements[8],L.__data[11]=0):(J.toArray(L.__data,le),le+=Q.storage/Float32Array.BYTES_PER_ELEMENT)}n.bufferSubData(n.UNIFORM_BUFFER,X,L.__data)}}}n.bindBuffer(n.UNIFORM_BUFFER,null)}function p(w,T,M,C){const D=w.value,R=T+"_"+M;if(C[R]===void 0)return typeof D=="number"||typeof D=="boolean"?C[R]=D:C[R]=D.clone(),!0;{const k=C[R];if(typeof D=="number"||typeof D=="boolean"){if(k!==D)return C[R]=D,!0}else if(k.equals(D)===!1)return k.copy(D),!0}return!1}function v(w){const T=w.uniforms;let M=0;const C=16;for(let R=0,k=T.length;R<k;R++){const b=Array.isArray(T[R])?T[R]:[T[R]];for(let E=0,L=b.length;E<L;E++){const X=b[E],K=Array.isArray(X.value)?X.value:[X.value];for(let le=0,ie=K.length;le<ie;le++){const J=K[le],Q=x(J),z=M%C,me=z%Q.boundary,ve=z+me;M+=me,ve!==0&&C-ve<Q.storage&&(M+=C-ve),X.__data=new Float32Array(Q.storage/Float32Array.BYTES_PER_ELEMENT),X.__offset=M,M+=Q.storage}}}const D=M%C;return D>0&&(M+=C-D),w.__size=M,w.__cache={},this}function x(w){const T={boundary:0,storage:0};return typeof w=="number"||typeof w=="boolean"?(T.boundary=4,T.storage=4):w.isVector2?(T.boundary=8,T.storage=8):w.isVector3||w.isColor?(T.boundary=16,T.storage=12):w.isVector4?(T.boundary=16,T.storage=16):w.isMatrix3?(T.boundary=48,T.storage=48):w.isMatrix4?(T.boundary=64,T.storage=64):w.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",w),T}function m(w){const T=w.target;T.removeEventListener("dispose",m);const M=o.indexOf(T.__bindingPointIndex);o.splice(M,1),n.deleteBuffer(r[T.id]),delete r[T.id],delete s[T.id]}function h(){for(const w in r)n.deleteBuffer(r[w]);o=[],r={},s={}}return{bind:l,update:c,dispose:h}}class JS{constructor(e={}){const{canvas:t=N_(),context:i=null,depth:r=!0,stencil:s=!1,alpha:o=!1,antialias:a=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:c=!1,powerPreference:u="default",failIfMajorPerformanceCaveat:f=!1,reversedDepthBuffer:d=!1}=e;this.isWebGLRenderer=!0;let p;if(i!==null){if(typeof WebGLRenderingContext<"u"&&i instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");p=i.getContextAttributes().alpha}else p=o;const v=new Uint32Array(4),x=new Int32Array(4);let m=null,h=null;const w=[],T=[];this.domElement=t,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=ui,this.toneMappingExposure=1,this.transmissionResolutionScale=1;const M=this;let C=!1;this._outputColorSpace=sn;let D=0,R=0,k=null,b=-1,E=null;const L=new St,X=new St;let K=null;const le=new lt(0);let ie=0,J=t.width,Q=t.height,z=1,me=null,ve=null;const Re=new St(0,0,J,Q),Oe=new St(0,0,J,Q);let Ze=!1;const et=new Vd;let $e=!1,te=!1;const P=new At,Z=new q,re=new St,se={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let Ie=!1;function A(){return k===null?z:1}let g=i;function N(S,O){return t.getContext(S,O)}try{const S={alpha:!0,depth:r,stencil:s,antialias:a,premultipliedAlpha:l,preserveDrawingBuffer:c,powerPreference:u,failIfMajorPerformanceCaveat:f};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${Wl}`),t.addEventListener("webglcontextlost",ge,!1),t.addEventListener("webglcontextrestored",De,!1),t.addEventListener("webglcontextcreationerror",de,!1),g===null){const O="webgl2";if(g=N(O,S),g===null)throw N(O)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(S){throw console.error("THREE.WebGLRenderer: "+S.message),S}let H,V,F,ce,Y,ne,oe,Se,y,_,I,G,ee,W,Ee,ue,be,Te,fe,ye,Le,Ae,_e,Ve;function U(){H=new ly(g),H.init(),Ae=new WS(g,H),V=new ty(g,H,e,Ae),F=new VS(g,H),V.reversedDepthBuffer&&d&&F.buffers.depth.setReversed(!0),ce=new fy(g),Y=new CS,ne=new GS(g,H,F,Y,V,Ae,ce),oe=new iy(M),Se=new ay(M),y=new _v(g),_e=new Q0(g,y),_=new cy(g,y,ce,_e),I=new hy(g,_,y,ce),fe=new dy(g,V,ne),ue=new ny(Y),G=new RS(M,oe,Se,H,V,_e,ue),ee=new KS(M,Y),W=new DS,Ee=new OS(H),Te=new J0(M,oe,Se,F,I,p,l),be=new zS(M,I,V),Ve=new ZS(g,ce,V,F),ye=new ey(g,H,ce),Le=new uy(g,H,ce),ce.programs=G.programs,M.capabilities=V,M.extensions=H,M.properties=Y,M.renderLists=W,M.shadowMap=be,M.state=F,M.info=ce}U();const pe=new YS(M,g);this.xr=pe,this.getContext=function(){return g},this.getContextAttributes=function(){return g.getContextAttributes()},this.forceContextLoss=function(){const S=H.get("WEBGL_lose_context");S&&S.loseContext()},this.forceContextRestore=function(){const S=H.get("WEBGL_lose_context");S&&S.restoreContext()},this.getPixelRatio=function(){return z},this.setPixelRatio=function(S){S!==void 0&&(z=S,this.setSize(J,Q,!1))},this.getSize=function(S){return S.set(J,Q)},this.setSize=function(S,O,j=!0){if(pe.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}J=S,Q=O,t.width=Math.floor(S*z),t.height=Math.floor(O*z),j===!0&&(t.style.width=S+"px",t.style.height=O+"px"),this.setViewport(0,0,S,O)},this.getDrawingBufferSize=function(S){return S.set(J*z,Q*z).floor()},this.setDrawingBufferSize=function(S,O,j){J=S,Q=O,z=j,t.width=Math.floor(S*j),t.height=Math.floor(O*j),this.setViewport(0,0,S,O)},this.getCurrentViewport=function(S){return S.copy(L)},this.getViewport=function(S){return S.copy(Re)},this.setViewport=function(S,O,j,$){S.isVector4?Re.set(S.x,S.y,S.z,S.w):Re.set(S,O,j,$),F.viewport(L.copy(Re).multiplyScalar(z).round())},this.getScissor=function(S){return S.copy(Oe)},this.setScissor=function(S,O,j,$){S.isVector4?Oe.set(S.x,S.y,S.z,S.w):Oe.set(S,O,j,$),F.scissor(X.copy(Oe).multiplyScalar(z).round())},this.getScissorTest=function(){return Ze},this.setScissorTest=function(S){F.setScissorTest(Ze=S)},this.setOpaqueSort=function(S){me=S},this.setTransparentSort=function(S){ve=S},this.getClearColor=function(S){return S.copy(Te.getClearColor())},this.setClearColor=function(){Te.setClearColor(...arguments)},this.getClearAlpha=function(){return Te.getClearAlpha()},this.setClearAlpha=function(){Te.setClearAlpha(...arguments)},this.clear=function(S=!0,O=!0,j=!0){let $=0;if(S){let B=!1;if(k!==null){const he=k.texture.format;B=he===Kl||he===$l||he===Yl}if(B){const he=k.texture.type,Me=he===qn||he===Ni||he===Qr||he===es||he===jl||he===ql,Ue=Te.getClearColor(),Ce=Te.getClearAlpha(),ze=Ue.r,He=Ue.g,Fe=Ue.b;Me?(v[0]=ze,v[1]=He,v[2]=Fe,v[3]=Ce,g.clearBufferuiv(g.COLOR,0,v)):(x[0]=ze,x[1]=He,x[2]=Fe,x[3]=Ce,g.clearBufferiv(g.COLOR,0,x))}else $|=g.COLOR_BUFFER_BIT}O&&($|=g.DEPTH_BUFFER_BIT),j&&($|=g.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),g.clear($)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){t.removeEventListener("webglcontextlost",ge,!1),t.removeEventListener("webglcontextrestored",De,!1),t.removeEventListener("webglcontextcreationerror",de,!1),Te.dispose(),W.dispose(),Ee.dispose(),Y.dispose(),oe.dispose(),Se.dispose(),I.dispose(),_e.dispose(),Ve.dispose(),G.dispose(),pe.dispose(),pe.removeEventListener("sessionstart",xn),pe.removeEventListener("sessionend",tc),gi.stop()};function ge(S){S.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),C=!0}function De(){console.log("THREE.WebGLRenderer: Context Restored."),C=!1;const S=ce.autoReset,O=be.enabled,j=be.autoUpdate,$=be.needsUpdate,B=be.type;U(),ce.autoReset=S,be.enabled=O,be.autoUpdate=j,be.needsUpdate=$,be.type=B}function de(S){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",S.statusMessage)}function ae(S){const O=S.target;O.removeEventListener("dispose",ae),Ne(O)}function Ne(S){We(S),Y.remove(S)}function We(S){const O=Y.get(S).programs;O!==void 0&&(O.forEach(function(j){G.releaseProgram(j)}),S.isShaderMaterial&&G.releaseShaderCache(S))}this.renderBufferDirect=function(S,O,j,$,B,he){O===null&&(O=se);const Me=B.isMesh&&B.matrixWorld.determinant()<0,Ue=Zd(S,O,j,$,B);F.setMaterial($,Me);let Ce=j.index,ze=1;if($.wireframe===!0){if(Ce=_.getWireframeAttribute(j),Ce===void 0)return;ze=2}const He=j.drawRange,Fe=j.attributes.position;let Ye=He.start*ze,ot=(He.start+He.count)*ze;he!==null&&(Ye=Math.max(Ye,he.start*ze),ot=Math.min(ot,(he.start+he.count)*ze)),Ce!==null?(Ye=Math.max(Ye,0),ot=Math.min(ot,Ce.count)):Fe!=null&&(Ye=Math.max(Ye,0),ot=Math.min(ot,Fe.count));const yt=ot-Ye;if(yt<0||yt===1/0)return;_e.setup(B,$,Ue,j,Ce);let pt,ut=ye;if(Ce!==null&&(pt=y.get(Ce),ut=Le,ut.setIndex(pt)),B.isMesh)$.wireframe===!0?(F.setLineWidth($.wireframeLinewidth*A()),ut.setMode(g.LINES)):ut.setMode(g.TRIANGLES);else if(B.isLine){let ke=$.linewidth;ke===void 0&&(ke=1),F.setLineWidth(ke*A()),B.isLineSegments?ut.setMode(g.LINES):B.isLineLoop?ut.setMode(g.LINE_LOOP):ut.setMode(g.LINE_STRIP)}else B.isPoints?ut.setMode(g.POINTS):B.isSprite&&ut.setMode(g.TRIANGLES);if(B.isBatchedMesh)if(B._multiDrawInstances!==null)is("THREE.WebGLRenderer: renderMultiDrawInstances has been deprecated and will be removed in r184. Append to renderMultiDraw arguments and use indirection."),ut.renderMultiDrawInstances(B._multiDrawStarts,B._multiDrawCounts,B._multiDrawCount,B._multiDrawInstances);else if(H.get("WEBGL_multi_draw"))ut.renderMultiDraw(B._multiDrawStarts,B._multiDrawCounts,B._multiDrawCount);else{const ke=B._multiDrawStarts,_t=B._multiDrawCounts,Je=B._multiDrawCount,Yt=Ce?y.get(Ce).bytesPerElement:1,zi=Y.get($).currentProgram.getUniforms();for(let $t=0;$t<Je;$t++)zi.setValue(g,"_gl_DrawID",$t),ut.render(ke[$t]/Yt,_t[$t])}else if(B.isInstancedMesh)ut.renderInstances(Ye,yt,B.count);else if(j.isInstancedBufferGeometry){const ke=j._maxInstanceCount!==void 0?j._maxInstanceCount:1/0,_t=Math.min(j.instanceCount,ke);ut.renderInstances(Ye,yt,_t)}else ut.render(Ye,yt)};function ft(S,O,j){S.transparent===!0&&S.side===Vn&&S.forceSinglePass===!1?(S.side=jt,S.needsUpdate=!0,ds(S,O,j),S.side=hi,S.needsUpdate=!0,ds(S,O,j),S.side=Vn):ds(S,O,j)}this.compile=function(S,O,j=null){j===null&&(j=S),h=Ee.get(j),h.init(O),T.push(h),j.traverseVisible(function(B){B.isLight&&B.layers.test(O.layers)&&(h.pushLight(B),B.castShadow&&h.pushShadow(B))}),S!==j&&S.traverseVisible(function(B){B.isLight&&B.layers.test(O.layers)&&(h.pushLight(B),B.castShadow&&h.pushShadow(B))}),h.setupLights();const $=new Set;return S.traverse(function(B){if(!(B.isMesh||B.isPoints||B.isLine||B.isSprite))return;const he=B.material;if(he)if(Array.isArray(he))for(let Me=0;Me<he.length;Me++){const Ue=he[Me];ft(Ue,j,B),$.add(Ue)}else ft(he,j,B),$.add(he)}),h=T.pop(),$},this.compileAsync=function(S,O,j=null){const $=this.compile(S,O,j);return new Promise(B=>{function he(){if($.forEach(function(Me){Y.get(Me).currentProgram.isReady()&&$.delete(Me)}),$.size===0){B(S);return}setTimeout(he,10)}H.get("KHR_parallel_shader_compile")!==null?he():setTimeout(he,10)})};let nt=null;function Dn(S){nt&&nt(S)}function xn(){gi.stop()}function tc(){gi.start()}const gi=new Xd;gi.setAnimationLoop(Dn),typeof self<"u"&&gi.setContext(self),this.setAnimationLoop=function(S){nt=S,pe.setAnimationLoop(S),S===null?gi.stop():gi.start()},pe.addEventListener("sessionstart",xn),pe.addEventListener("sessionend",tc),this.render=function(S,O){if(O!==void 0&&O.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(C===!0)return;if(S.matrixWorldAutoUpdate===!0&&S.updateMatrixWorld(),O.parent===null&&O.matrixWorldAutoUpdate===!0&&O.updateMatrixWorld(),pe.enabled===!0&&pe.isPresenting===!0&&(pe.cameraAutoUpdate===!0&&pe.updateCamera(O),O=pe.getCamera()),S.isScene===!0&&S.onBeforeRender(M,S,O,k),h=Ee.get(S,T.length),h.init(O),T.push(h),P.multiplyMatrices(O.projectionMatrix,O.matrixWorldInverse),et.setFromProjectionMatrix(P,Tn,O.reversedDepth),te=this.localClippingEnabled,$e=ue.init(this.clippingPlanes,te),m=W.get(S,w.length),m.init(),w.push(m),pe.enabled===!0&&pe.isPresenting===!0){const he=M.xr.getDepthSensingMesh();he!==null&&bo(he,O,-1/0,M.sortObjects)}bo(S,O,0,M.sortObjects),m.finish(),M.sortObjects===!0&&m.sort(me,ve),Ie=pe.enabled===!1||pe.isPresenting===!1||pe.hasDepthSensing()===!1,Ie&&Te.addToRenderList(m,S),this.info.render.frame++,$e===!0&&ue.beginShadows();const j=h.state.shadowsArray;be.render(j,S,O),$e===!0&&ue.endShadows(),this.info.autoReset===!0&&this.info.reset();const $=m.opaque,B=m.transmissive;if(h.setupLights(),O.isArrayCamera){const he=O.cameras;if(B.length>0)for(let Me=0,Ue=he.length;Me<Ue;Me++){const Ce=he[Me];ic($,B,S,Ce)}Ie&&Te.render(S);for(let Me=0,Ue=he.length;Me<Ue;Me++){const Ce=he[Me];nc(m,S,Ce,Ce.viewport)}}else B.length>0&&ic($,B,S,O),Ie&&Te.render(S),nc(m,S,O);k!==null&&R===0&&(ne.updateMultisampleRenderTarget(k),ne.updateRenderTargetMipmap(k)),S.isScene===!0&&S.onAfterRender(M,S,O),_e.resetDefaultState(),b=-1,E=null,T.pop(),T.length>0?(h=T[T.length-1],$e===!0&&ue.setGlobalState(M.clippingPlanes,h.state.camera)):h=null,w.pop(),w.length>0?m=w[w.length-1]:m=null};function bo(S,O,j,$){if(S.visible===!1)return;if(S.layers.test(O.layers)){if(S.isGroup)j=S.renderOrder;else if(S.isLOD)S.autoUpdate===!0&&S.update(O);else if(S.isLight)h.pushLight(S),S.castShadow&&h.pushShadow(S);else if(S.isSprite){if(!S.frustumCulled||et.intersectsSprite(S)){$&&re.setFromMatrixPosition(S.matrixWorld).applyMatrix4(P);const Me=I.update(S),Ue=S.material;Ue.visible&&m.push(S,Me,Ue,j,re.z,null)}}else if((S.isMesh||S.isLine||S.isPoints)&&(!S.frustumCulled||et.intersectsObject(S))){const Me=I.update(S),Ue=S.material;if($&&(S.boundingSphere!==void 0?(S.boundingSphere===null&&S.computeBoundingSphere(),re.copy(S.boundingSphere.center)):(Me.boundingSphere===null&&Me.computeBoundingSphere(),re.copy(Me.boundingSphere.center)),re.applyMatrix4(S.matrixWorld).applyMatrix4(P)),Array.isArray(Ue)){const Ce=Me.groups;for(let ze=0,He=Ce.length;ze<He;ze++){const Fe=Ce[ze],Ye=Ue[Fe.materialIndex];Ye&&Ye.visible&&m.push(S,Me,Ye,j,re.z,Fe)}}else Ue.visible&&m.push(S,Me,Ue,j,re.z,null)}}const he=S.children;for(let Me=0,Ue=he.length;Me<Ue;Me++)bo(he[Me],O,j,$)}function nc(S,O,j,$){const B=S.opaque,he=S.transmissive,Me=S.transparent;h.setupLightsView(j),$e===!0&&ue.setGlobalState(M.clippingPlanes,j),$&&F.viewport(L.copy($)),B.length>0&&fs(B,O,j),he.length>0&&fs(he,O,j),Me.length>0&&fs(Me,O,j),F.buffers.depth.setTest(!0),F.buffers.depth.setMask(!0),F.buffers.color.setMask(!0),F.setPolygonOffset(!1)}function ic(S,O,j,$){if((j.isScene===!0?j.overrideMaterial:null)!==null)return;h.state.transmissionRenderTarget[$.id]===void 0&&(h.state.transmissionRenderTarget[$.id]=new Fi(1,1,{generateMipmaps:!0,type:H.has("EXT_color_buffer_half_float")||H.has("EXT_color_buffer_float")?as:qn,minFilter:Ii,samples:4,stencilBuffer:s,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:Qe.workingColorSpace}));const he=h.state.transmissionRenderTarget[$.id],Me=$.viewport||L;he.setSize(Me.z*M.transmissionResolutionScale,Me.w*M.transmissionResolutionScale);const Ue=M.getRenderTarget(),Ce=M.getActiveCubeFace(),ze=M.getActiveMipmapLevel();M.setRenderTarget(he),M.getClearColor(le),ie=M.getClearAlpha(),ie<1&&M.setClearColor(16777215,.5),M.clear(),Ie&&Te.render(j);const He=M.toneMapping;M.toneMapping=ui;const Fe=$.viewport;if($.viewport!==void 0&&($.viewport=void 0),h.setupLightsView($),$e===!0&&ue.setGlobalState(M.clippingPlanes,$),fs(S,j,$),ne.updateMultisampleRenderTarget(he),ne.updateRenderTargetMipmap(he),H.has("WEBGL_multisampled_render_to_texture")===!1){let Ye=!1;for(let ot=0,yt=O.length;ot<yt;ot++){const pt=O[ot],ut=pt.object,ke=pt.geometry,_t=pt.material,Je=pt.group;if(_t.side===Vn&&ut.layers.test($.layers)){const Yt=_t.side;_t.side=jt,_t.needsUpdate=!0,rc(ut,j,$,ke,_t,Je),_t.side=Yt,_t.needsUpdate=!0,Ye=!0}}Ye===!0&&(ne.updateMultisampleRenderTarget(he),ne.updateRenderTargetMipmap(he))}M.setRenderTarget(Ue,Ce,ze),M.setClearColor(le,ie),Fe!==void 0&&($.viewport=Fe),M.toneMapping=He}function fs(S,O,j){const $=O.isScene===!0?O.overrideMaterial:null;for(let B=0,he=S.length;B<he;B++){const Me=S[B],Ue=Me.object,Ce=Me.geometry,ze=Me.group;let He=Me.material;He.allowOverride===!0&&$!==null&&(He=$),Ue.layers.test(j.layers)&&rc(Ue,O,j,Ce,He,ze)}}function rc(S,O,j,$,B,he){S.onBeforeRender(M,O,j,$,B,he),S.modelViewMatrix.multiplyMatrices(j.matrixWorldInverse,S.matrixWorld),S.normalMatrix.getNormalMatrix(S.modelViewMatrix),B.onBeforeRender(M,O,j,$,S,he),B.transparent===!0&&B.side===Vn&&B.forceSinglePass===!1?(B.side=jt,B.needsUpdate=!0,M.renderBufferDirect(j,O,$,B,S,he),B.side=hi,B.needsUpdate=!0,M.renderBufferDirect(j,O,$,B,S,he),B.side=Vn):M.renderBufferDirect(j,O,$,B,S,he),S.onAfterRender(M,O,j,$,B,he)}function ds(S,O,j){O.isScene!==!0&&(O=se);const $=Y.get(S),B=h.state.lights,he=h.state.shadowsArray,Me=B.state.version,Ue=G.getParameters(S,B.state,he,O,j),Ce=G.getProgramCacheKey(Ue);let ze=$.programs;$.environment=S.isMeshStandardMaterial?O.environment:null,$.fog=O.fog,$.envMap=(S.isMeshStandardMaterial?Se:oe).get(S.envMap||$.environment),$.envMapRotation=$.environment!==null&&S.envMap===null?O.environmentRotation:S.envMapRotation,ze===void 0&&(S.addEventListener("dispose",ae),ze=new Map,$.programs=ze);let He=ze.get(Ce);if(He!==void 0){if($.currentProgram===He&&$.lightsStateVersion===Me)return oc(S,Ue),He}else Ue.uniforms=G.getUniforms(S),S.onBeforeCompile(Ue,M),He=G.acquireProgram(Ue,Ce),ze.set(Ce,He),$.uniforms=Ue.uniforms;const Fe=$.uniforms;return(!S.isShaderMaterial&&!S.isRawShaderMaterial||S.clipping===!0)&&(Fe.clippingPlanes=ue.uniform),oc(S,Ue),$.needsLights=Qd(S),$.lightsStateVersion=Me,$.needsLights&&(Fe.ambientLightColor.value=B.state.ambient,Fe.lightProbe.value=B.state.probe,Fe.directionalLights.value=B.state.directional,Fe.directionalLightShadows.value=B.state.directionalShadow,Fe.spotLights.value=B.state.spot,Fe.spotLightShadows.value=B.state.spotShadow,Fe.rectAreaLights.value=B.state.rectArea,Fe.ltc_1.value=B.state.rectAreaLTC1,Fe.ltc_2.value=B.state.rectAreaLTC2,Fe.pointLights.value=B.state.point,Fe.pointLightShadows.value=B.state.pointShadow,Fe.hemisphereLights.value=B.state.hemi,Fe.directionalShadowMap.value=B.state.directionalShadowMap,Fe.directionalShadowMatrix.value=B.state.directionalShadowMatrix,Fe.spotShadowMap.value=B.state.spotShadowMap,Fe.spotLightMatrix.value=B.state.spotLightMatrix,Fe.spotLightMap.value=B.state.spotLightMap,Fe.pointShadowMap.value=B.state.pointShadowMap,Fe.pointShadowMatrix.value=B.state.pointShadowMatrix),$.currentProgram=He,$.uniformsList=null,He}function sc(S){if(S.uniformsList===null){const O=S.currentProgram.getUniforms();S.uniformsList=qs.seqWithValue(O.seq,S.uniforms)}return S.uniformsList}function oc(S,O){const j=Y.get(S);j.outputColorSpace=O.outputColorSpace,j.batching=O.batching,j.batchingColor=O.batchingColor,j.instancing=O.instancing,j.instancingColor=O.instancingColor,j.instancingMorph=O.instancingMorph,j.skinning=O.skinning,j.morphTargets=O.morphTargets,j.morphNormals=O.morphNormals,j.morphColors=O.morphColors,j.morphTargetsCount=O.morphTargetsCount,j.numClippingPlanes=O.numClippingPlanes,j.numIntersection=O.numClipIntersection,j.vertexAlphas=O.vertexAlphas,j.vertexTangents=O.vertexTangents,j.toneMapping=O.toneMapping}function Zd(S,O,j,$,B){O.isScene!==!0&&(O=se),ne.resetTextureUnits();const he=O.fog,Me=$.isMeshStandardMaterial?O.environment:null,Ue=k===null?M.outputColorSpace:k.isXRRenderTarget===!0?k.texture.colorSpace:xr,Ce=($.isMeshStandardMaterial?Se:oe).get($.envMap||Me),ze=$.vertexColors===!0&&!!j.attributes.color&&j.attributes.color.itemSize===4,He=!!j.attributes.tangent&&(!!$.normalMap||$.anisotropy>0),Fe=!!j.morphAttributes.position,Ye=!!j.morphAttributes.normal,ot=!!j.morphAttributes.color;let yt=ui;$.toneMapped&&(k===null||k.isXRRenderTarget===!0)&&(yt=M.toneMapping);const pt=j.morphAttributes.position||j.morphAttributes.normal||j.morphAttributes.color,ut=pt!==void 0?pt.length:0,ke=Y.get($),_t=h.state.lights;if($e===!0&&(te===!0||S!==E)){const Ot=S===E&&$.id===b;ue.setState($,S,Ot)}let Je=!1;$.version===ke.__version?(ke.needsLights&&ke.lightsStateVersion!==_t.state.version||ke.outputColorSpace!==Ue||B.isBatchedMesh&&ke.batching===!1||!B.isBatchedMesh&&ke.batching===!0||B.isBatchedMesh&&ke.batchingColor===!0&&B.colorTexture===null||B.isBatchedMesh&&ke.batchingColor===!1&&B.colorTexture!==null||B.isInstancedMesh&&ke.instancing===!1||!B.isInstancedMesh&&ke.instancing===!0||B.isSkinnedMesh&&ke.skinning===!1||!B.isSkinnedMesh&&ke.skinning===!0||B.isInstancedMesh&&ke.instancingColor===!0&&B.instanceColor===null||B.isInstancedMesh&&ke.instancingColor===!1&&B.instanceColor!==null||B.isInstancedMesh&&ke.instancingMorph===!0&&B.morphTexture===null||B.isInstancedMesh&&ke.instancingMorph===!1&&B.morphTexture!==null||ke.envMap!==Ce||$.fog===!0&&ke.fog!==he||ke.numClippingPlanes!==void 0&&(ke.numClippingPlanes!==ue.numPlanes||ke.numIntersection!==ue.numIntersection)||ke.vertexAlphas!==ze||ke.vertexTangents!==He||ke.morphTargets!==Fe||ke.morphNormals!==Ye||ke.morphColors!==ot||ke.toneMapping!==yt||ke.morphTargetsCount!==ut)&&(Je=!0):(Je=!0,ke.__version=$.version);let Yt=ke.currentProgram;Je===!0&&(Yt=ds($,O,B));let zi=!1,$t=!1,br=!1;const vt=Yt.getUniforms(),tn=ke.uniforms;if(F.useProgram(Yt.program)&&(zi=!0,$t=!0,br=!0),$.id!==b&&(b=$.id,$t=!0),zi||E!==S){F.buffers.depth.getReversed()&&S.reversedDepth!==!0&&(S._reversedDepth=!0,S.updateProjectionMatrix()),vt.setValue(g,"projectionMatrix",S.projectionMatrix),vt.setValue(g,"viewMatrix",S.matrixWorldInverse);const Ht=vt.map.cameraPosition;Ht!==void 0&&Ht.setValue(g,Z.setFromMatrixPosition(S.matrixWorld)),V.logarithmicDepthBuffer&&vt.setValue(g,"logDepthBufFC",2/(Math.log(S.far+1)/Math.LN2)),($.isMeshPhongMaterial||$.isMeshToonMaterial||$.isMeshLambertMaterial||$.isMeshBasicMaterial||$.isMeshStandardMaterial||$.isShaderMaterial)&&vt.setValue(g,"isOrthographic",S.isOrthographicCamera===!0),E!==S&&(E=S,$t=!0,br=!0)}if(B.isSkinnedMesh){vt.setOptional(g,B,"bindMatrix"),vt.setOptional(g,B,"bindMatrixInverse");const Ot=B.skeleton;Ot&&(Ot.boneTexture===null&&Ot.computeBoneTexture(),vt.setValue(g,"boneTexture",Ot.boneTexture,ne))}B.isBatchedMesh&&(vt.setOptional(g,B,"batchingTexture"),vt.setValue(g,"batchingTexture",B._matricesTexture,ne),vt.setOptional(g,B,"batchingIdTexture"),vt.setValue(g,"batchingIdTexture",B._indirectTexture,ne),vt.setOptional(g,B,"batchingColorTexture"),B._colorsTexture!==null&&vt.setValue(g,"batchingColorTexture",B._colorsTexture,ne));const nn=j.morphAttributes;if((nn.position!==void 0||nn.normal!==void 0||nn.color!==void 0)&&fe.update(B,j,Yt),($t||ke.receiveShadow!==B.receiveShadow)&&(ke.receiveShadow=B.receiveShadow,vt.setValue(g,"receiveShadow",B.receiveShadow)),$.isMeshGouraudMaterial&&$.envMap!==null&&(tn.envMap.value=Ce,tn.flipEnvMap.value=Ce.isCubeTexture&&Ce.isRenderTargetTexture===!1?-1:1),$.isMeshStandardMaterial&&$.envMap===null&&O.environment!==null&&(tn.envMapIntensity.value=O.environmentIntensity),$t&&(vt.setValue(g,"toneMappingExposure",M.toneMappingExposure),ke.needsLights&&Jd(tn,br),he&&$.fog===!0&&ee.refreshFogUniforms(tn,he),ee.refreshMaterialUniforms(tn,$,z,Q,h.state.transmissionRenderTarget[S.id]),qs.upload(g,sc(ke),tn,ne)),$.isShaderMaterial&&$.uniformsNeedUpdate===!0&&(qs.upload(g,sc(ke),tn,ne),$.uniformsNeedUpdate=!1),$.isSpriteMaterial&&vt.setValue(g,"center",B.center),vt.setValue(g,"modelViewMatrix",B.modelViewMatrix),vt.setValue(g,"normalMatrix",B.normalMatrix),vt.setValue(g,"modelMatrix",B.matrixWorld),$.isShaderMaterial||$.isRawShaderMaterial){const Ot=$.uniformsGroups;for(let Ht=0,To=Ot.length;Ht<To;Ht++){const _i=Ot[Ht];Ve.update(_i,Yt),Ve.bind(_i,Yt)}}return Yt}function Jd(S,O){S.ambientLightColor.needsUpdate=O,S.lightProbe.needsUpdate=O,S.directionalLights.needsUpdate=O,S.directionalLightShadows.needsUpdate=O,S.pointLights.needsUpdate=O,S.pointLightShadows.needsUpdate=O,S.spotLights.needsUpdate=O,S.spotLightShadows.needsUpdate=O,S.rectAreaLights.needsUpdate=O,S.hemisphereLights.needsUpdate=O}function Qd(S){return S.isMeshLambertMaterial||S.isMeshToonMaterial||S.isMeshPhongMaterial||S.isMeshStandardMaterial||S.isShadowMaterial||S.isShaderMaterial&&S.lights===!0}this.getActiveCubeFace=function(){return D},this.getActiveMipmapLevel=function(){return R},this.getRenderTarget=function(){return k},this.setRenderTargetTextures=function(S,O,j){const $=Y.get(S);$.__autoAllocateDepthBuffer=S.resolveDepthBuffer===!1,$.__autoAllocateDepthBuffer===!1&&($.__useRenderToTexture=!1),Y.get(S.texture).__webglTexture=O,Y.get(S.depthTexture).__webglTexture=$.__autoAllocateDepthBuffer?void 0:j,$.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(S,O){const j=Y.get(S);j.__webglFramebuffer=O,j.__useDefaultFramebuffer=O===void 0};const eh=g.createFramebuffer();this.setRenderTarget=function(S,O=0,j=0){k=S,D=O,R=j;let $=!0,B=null,he=!1,Me=!1;if(S){const Ce=Y.get(S);if(Ce.__useDefaultFramebuffer!==void 0)F.bindFramebuffer(g.FRAMEBUFFER,null),$=!1;else if(Ce.__webglFramebuffer===void 0)ne.setupRenderTarget(S);else if(Ce.__hasExternalTextures)ne.rebindTextures(S,Y.get(S.texture).__webglTexture,Y.get(S.depthTexture).__webglTexture);else if(S.depthBuffer){const Fe=S.depthTexture;if(Ce.__boundDepthTexture!==Fe){if(Fe!==null&&Y.has(Fe)&&(S.width!==Fe.image.width||S.height!==Fe.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");ne.setupDepthRenderbuffer(S)}}const ze=S.texture;(ze.isData3DTexture||ze.isDataArrayTexture||ze.isCompressedArrayTexture)&&(Me=!0);const He=Y.get(S).__webglFramebuffer;S.isWebGLCubeRenderTarget?(Array.isArray(He[O])?B=He[O][j]:B=He[O],he=!0):S.samples>0&&ne.useMultisampledRTT(S)===!1?B=Y.get(S).__webglMultisampledFramebuffer:Array.isArray(He)?B=He[j]:B=He,L.copy(S.viewport),X.copy(S.scissor),K=S.scissorTest}else L.copy(Re).multiplyScalar(z).floor(),X.copy(Oe).multiplyScalar(z).floor(),K=Ze;if(j!==0&&(B=eh),F.bindFramebuffer(g.FRAMEBUFFER,B)&&$&&F.drawBuffers(S,B),F.viewport(L),F.scissor(X),F.setScissorTest(K),he){const Ce=Y.get(S.texture);g.framebufferTexture2D(g.FRAMEBUFFER,g.COLOR_ATTACHMENT0,g.TEXTURE_CUBE_MAP_POSITIVE_X+O,Ce.__webglTexture,j)}else if(Me){const Ce=O;for(let ze=0;ze<S.textures.length;ze++){const He=Y.get(S.textures[ze]);g.framebufferTextureLayer(g.FRAMEBUFFER,g.COLOR_ATTACHMENT0+ze,He.__webglTexture,j,Ce)}}else if(S!==null&&j!==0){const Ce=Y.get(S.texture);g.framebufferTexture2D(g.FRAMEBUFFER,g.COLOR_ATTACHMENT0,g.TEXTURE_2D,Ce.__webglTexture,j)}b=-1},this.readRenderTargetPixels=function(S,O,j,$,B,he,Me,Ue=0){if(!(S&&S.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Ce=Y.get(S).__webglFramebuffer;if(S.isWebGLCubeRenderTarget&&Me!==void 0&&(Ce=Ce[Me]),Ce){F.bindFramebuffer(g.FRAMEBUFFER,Ce);try{const ze=S.textures[Ue],He=ze.format,Fe=ze.type;if(!V.textureFormatReadable(He)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!V.textureTypeReadable(Fe)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}O>=0&&O<=S.width-$&&j>=0&&j<=S.height-B&&(S.textures.length>1&&g.readBuffer(g.COLOR_ATTACHMENT0+Ue),g.readPixels(O,j,$,B,Ae.convert(He),Ae.convert(Fe),he))}finally{const ze=k!==null?Y.get(k).__webglFramebuffer:null;F.bindFramebuffer(g.FRAMEBUFFER,ze)}}},this.readRenderTargetPixelsAsync=async function(S,O,j,$,B,he,Me,Ue=0){if(!(S&&S.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let Ce=Y.get(S).__webglFramebuffer;if(S.isWebGLCubeRenderTarget&&Me!==void 0&&(Ce=Ce[Me]),Ce)if(O>=0&&O<=S.width-$&&j>=0&&j<=S.height-B){F.bindFramebuffer(g.FRAMEBUFFER,Ce);const ze=S.textures[Ue],He=ze.format,Fe=ze.type;if(!V.textureFormatReadable(He))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!V.textureTypeReadable(Fe))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");const Ye=g.createBuffer();g.bindBuffer(g.PIXEL_PACK_BUFFER,Ye),g.bufferData(g.PIXEL_PACK_BUFFER,he.byteLength,g.STREAM_READ),S.textures.length>1&&g.readBuffer(g.COLOR_ATTACHMENT0+Ue),g.readPixels(O,j,$,B,Ae.convert(He),Ae.convert(Fe),0);const ot=k!==null?Y.get(k).__webglFramebuffer:null;F.bindFramebuffer(g.FRAMEBUFFER,ot);const yt=g.fenceSync(g.SYNC_GPU_COMMANDS_COMPLETE,0);return g.flush(),await F_(g,yt,4),g.bindBuffer(g.PIXEL_PACK_BUFFER,Ye),g.getBufferSubData(g.PIXEL_PACK_BUFFER,0,he),g.deleteBuffer(Ye),g.deleteSync(yt),he}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(S,O=null,j=0){const $=Math.pow(2,-j),B=Math.floor(S.image.width*$),he=Math.floor(S.image.height*$),Me=O!==null?O.x:0,Ue=O!==null?O.y:0;ne.setTexture2D(S,0),g.copyTexSubImage2D(g.TEXTURE_2D,j,0,0,Me,Ue,B,he),F.unbindTexture()};const th=g.createFramebuffer(),nh=g.createFramebuffer();this.copyTextureToTexture=function(S,O,j=null,$=null,B=0,he=null){he===null&&(B!==0?(is("WebGLRenderer: copyTextureToTexture function signature has changed to support src and dst mipmap levels."),he=B,B=0):he=0);let Me,Ue,Ce,ze,He,Fe,Ye,ot,yt;const pt=S.isCompressedTexture?S.mipmaps[he]:S.image;if(j!==null)Me=j.max.x-j.min.x,Ue=j.max.y-j.min.y,Ce=j.isBox3?j.max.z-j.min.z:1,ze=j.min.x,He=j.min.y,Fe=j.isBox3?j.min.z:0;else{const nn=Math.pow(2,-B);Me=Math.floor(pt.width*nn),Ue=Math.floor(pt.height*nn),S.isDataArrayTexture?Ce=pt.depth:S.isData3DTexture?Ce=Math.floor(pt.depth*nn):Ce=1,ze=0,He=0,Fe=0}$!==null?(Ye=$.x,ot=$.y,yt=$.z):(Ye=0,ot=0,yt=0);const ut=Ae.convert(O.format),ke=Ae.convert(O.type);let _t;O.isData3DTexture?(ne.setTexture3D(O,0),_t=g.TEXTURE_3D):O.isDataArrayTexture||O.isCompressedArrayTexture?(ne.setTexture2DArray(O,0),_t=g.TEXTURE_2D_ARRAY):(ne.setTexture2D(O,0),_t=g.TEXTURE_2D),g.pixelStorei(g.UNPACK_FLIP_Y_WEBGL,O.flipY),g.pixelStorei(g.UNPACK_PREMULTIPLY_ALPHA_WEBGL,O.premultiplyAlpha),g.pixelStorei(g.UNPACK_ALIGNMENT,O.unpackAlignment);const Je=g.getParameter(g.UNPACK_ROW_LENGTH),Yt=g.getParameter(g.UNPACK_IMAGE_HEIGHT),zi=g.getParameter(g.UNPACK_SKIP_PIXELS),$t=g.getParameter(g.UNPACK_SKIP_ROWS),br=g.getParameter(g.UNPACK_SKIP_IMAGES);g.pixelStorei(g.UNPACK_ROW_LENGTH,pt.width),g.pixelStorei(g.UNPACK_IMAGE_HEIGHT,pt.height),g.pixelStorei(g.UNPACK_SKIP_PIXELS,ze),g.pixelStorei(g.UNPACK_SKIP_ROWS,He),g.pixelStorei(g.UNPACK_SKIP_IMAGES,Fe);const vt=S.isDataArrayTexture||S.isData3DTexture,tn=O.isDataArrayTexture||O.isData3DTexture;if(S.isDepthTexture){const nn=Y.get(S),Ot=Y.get(O),Ht=Y.get(nn.__renderTarget),To=Y.get(Ot.__renderTarget);F.bindFramebuffer(g.READ_FRAMEBUFFER,Ht.__webglFramebuffer),F.bindFramebuffer(g.DRAW_FRAMEBUFFER,To.__webglFramebuffer);for(let _i=0;_i<Ce;_i++)vt&&(g.framebufferTextureLayer(g.READ_FRAMEBUFFER,g.COLOR_ATTACHMENT0,Y.get(S).__webglTexture,B,Fe+_i),g.framebufferTextureLayer(g.DRAW_FRAMEBUFFER,g.COLOR_ATTACHMENT0,Y.get(O).__webglTexture,he,yt+_i)),g.blitFramebuffer(ze,He,Me,Ue,Ye,ot,Me,Ue,g.DEPTH_BUFFER_BIT,g.NEAREST);F.bindFramebuffer(g.READ_FRAMEBUFFER,null),F.bindFramebuffer(g.DRAW_FRAMEBUFFER,null)}else if(B!==0||S.isRenderTargetTexture||Y.has(S)){const nn=Y.get(S),Ot=Y.get(O);F.bindFramebuffer(g.READ_FRAMEBUFFER,th),F.bindFramebuffer(g.DRAW_FRAMEBUFFER,nh);for(let Ht=0;Ht<Ce;Ht++)vt?g.framebufferTextureLayer(g.READ_FRAMEBUFFER,g.COLOR_ATTACHMENT0,nn.__webglTexture,B,Fe+Ht):g.framebufferTexture2D(g.READ_FRAMEBUFFER,g.COLOR_ATTACHMENT0,g.TEXTURE_2D,nn.__webglTexture,B),tn?g.framebufferTextureLayer(g.DRAW_FRAMEBUFFER,g.COLOR_ATTACHMENT0,Ot.__webglTexture,he,yt+Ht):g.framebufferTexture2D(g.DRAW_FRAMEBUFFER,g.COLOR_ATTACHMENT0,g.TEXTURE_2D,Ot.__webglTexture,he),B!==0?g.blitFramebuffer(ze,He,Me,Ue,Ye,ot,Me,Ue,g.COLOR_BUFFER_BIT,g.NEAREST):tn?g.copyTexSubImage3D(_t,he,Ye,ot,yt+Ht,ze,He,Me,Ue):g.copyTexSubImage2D(_t,he,Ye,ot,ze,He,Me,Ue);F.bindFramebuffer(g.READ_FRAMEBUFFER,null),F.bindFramebuffer(g.DRAW_FRAMEBUFFER,null)}else tn?S.isDataTexture||S.isData3DTexture?g.texSubImage3D(_t,he,Ye,ot,yt,Me,Ue,Ce,ut,ke,pt.data):O.isCompressedArrayTexture?g.compressedTexSubImage3D(_t,he,Ye,ot,yt,Me,Ue,Ce,ut,pt.data):g.texSubImage3D(_t,he,Ye,ot,yt,Me,Ue,Ce,ut,ke,pt):S.isDataTexture?g.texSubImage2D(g.TEXTURE_2D,he,Ye,ot,Me,Ue,ut,ke,pt.data):S.isCompressedTexture?g.compressedTexSubImage2D(g.TEXTURE_2D,he,Ye,ot,pt.width,pt.height,ut,pt.data):g.texSubImage2D(g.TEXTURE_2D,he,Ye,ot,Me,Ue,ut,ke,pt);g.pixelStorei(g.UNPACK_ROW_LENGTH,Je),g.pixelStorei(g.UNPACK_IMAGE_HEIGHT,Yt),g.pixelStorei(g.UNPACK_SKIP_PIXELS,zi),g.pixelStorei(g.UNPACK_SKIP_ROWS,$t),g.pixelStorei(g.UNPACK_SKIP_IMAGES,br),he===0&&O.generateMipmaps&&g.generateMipmap(_t),F.unbindTexture()},this.initRenderTarget=function(S){Y.get(S).__webglFramebuffer===void 0&&ne.setupRenderTarget(S)},this.initTexture=function(S){S.isCubeTexture?ne.setTextureCube(S,0):S.isData3DTexture?ne.setTexture3D(S,0):S.isDataArrayTexture||S.isCompressedArrayTexture?ne.setTexture2DArray(S,0):ne.setTexture2D(S,0),F.unbindTexture()},this.resetState=function(){D=0,R=0,k=null,F.reset(),_e.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return Tn}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;const t=this.getContext();t.drawingBufferColorSpace=Qe._getDrawingBufferColorSpace(e),t.unpackColorSpace=Qe._getUnpackColorSpace()}}const QS={class:"home__main",id:"Main"},eM={__name:"Home",setup(n){return Ul(()=>{const e=document.getElementById("S1Rect"),t=document.getElementById("T2Rect");e&&e.animate([{strokeDashoffset:1565},{strokeDashoffset:0}],{duration:2e3,fill:"forwards"}),t&&t.animate([{strokeDashoffset:1565},{strokeDashoffset:0}],{duration:2e3,fill:"forwards",delay:500});const i=document.getElementById("HomeIdleCanvas");if(i){let l=function(){a.clearRect(0,0,i.width,i.height),a.fillStyle="rgba(79,54,232,0.3)",a.beginPath(),a.arc(Math.random()*i.width,Math.random()*i.height,50,0,Math.PI*2),a.fill(),requestAnimationFrame(l)};var s=l;const a=i.getContext("2d");i.width=window.innerWidth,i.height=window.innerHeight,l()}const r=document.getElementById("MarsCanvas");if(r){let p=function(){requestAnimationFrame(p),d.rotation.x+=.01,d.rotation.y+=.01,a.render(l,c)};var o=p;const a=new JS({canvas:r});a.setSize(window.innerWidth,window.innerHeight);const l=new lv,c=new an(75,window.innerWidth/window.innerHeight,.1,1e3);c.position.z=5;const u=new Mr,f=new Ql({color:5191400,wireframe:!0}),d=new An(u,f);l.add(d),p()}}),(e,t)=>(we(),Pe("main",QS,[...t[0]||(t[0]=[no('<div class="home__ui"><svg class="home__part" id="S1" viewBox="0 0 391 391"><rect id="S1Rect" width="391" height="391" fill="none" stroke="#FFF" stroke-width="26" stroke-dasharray="1565" stroke-dashoffset="1565"></rect></svg><svg class="home__part" id="T2" viewBox="0 0 391 391"><rect id="T2Rect" width="391" height="391" fill="none" stroke="#FFF" stroke-width="26" stroke-dasharray="1565" stroke-dashoffset="1565"></rect></svg><header class="home__title" id="Title"><div class="home__flip" id="TitleInner"><h1 class="home__heading">My Interactive Page</h1><div class="home__instructions">Pull to play</div></div></header><div class="home__light-bg" id="HomeIdleBG"></div><canvas class="home__light" id="HomeIdleCanvas"></canvas></div><canvas class="mars__canvas" id="MarsCanvas"></canvas><canvas class="musicbox__canvas" id="HomeMusicboxCanvas"></canvas>',3),Be("video",{loop:"",muted:"",playsinline:"",preload:"",class:"runner__source",id:"RunnerPeekForeground"},[Be("source",{src:Gg,type:"video/mp4"})],-1),Be("video",{loop:"",muted:"",playsinline:"",preload:"",class:"runner__source",id:"RunnerRunForeground"},[Be("source",{src:Wg,type:"video/mp4"})],-1),Be("video",{loop:"",muted:"",playsinline:"",preload:"",class:"runner__source",id:"RunnerSkateForeground"},[Be("source",{src:Xg,type:"video/mp4"})],-1),no('<div class="runner" id="Runner"><div class="runner__blinds" id="RunnerBlinds"><div class="runner__left"><div class="runner__blind"></div></div><div class="runner__right"><div class="runner__blind"></div></div></div><div class="runner__stripes" id="RunnerStripes"></div><div class="runner__lights" id="RunnerLights"></div><canvas class="runner__compositor" id="RunnerBox"></canvas></div><h1 style="color:red;position:relative;z-index:9999;">TEST</h1>',2)])]))}},tM={class:"main"},nM={class:"container page-header"},iM={class:"filter-bar"},rM=["onClick"],sM={class:"article-grid"},oM={class:"media media--image animate-media"},aM=["src","alt"],lM={class:"article-card__content"},cM={class:"article-card__title"},uM={class:"article-card__desc"},fM={class:"article-card__year"},dM={class:"article-card__tags"},hM={__name:"PageGrid",props:{items:{type:Array,required:!0}},setup(n){const e=n,t=Dl("All"),i=Xt(()=>{const o=new Set;return e.items.forEach(a=>a.tags.forEach(l=>o.add(l))),["All",...o]});function r(o){t.value=o}const s=Xt(()=>t.value==="All"?e.items:e.items.filter(o=>o.tags.includes(t.value)));return(o,a)=>{const l=Nl("router-link");return we(),Pe("main",tM,[Be("header",nM,[Be("section",iM,[(we(!0),Pe(mt,null,Gt(i.value,c=>(we(),Pe("button",{key:c,class:rs(["filter-btn",{active:t.value===c}]),onClick:u=>r(c)},Tt(c),11,rM))),128))]),Be("section",sM,[(we(!0),Pe(mt,null,Gt(s.value,c=>(we(),Bl(l,{key:c.slug,to:`/projects/${c.slug}`,class:"article-card animate"},{default:rr(()=>[Be("div",oM,[Be("img",{src:c.image,alt:c.title},null,8,aM)]),Be("div",lM,[Be("h2",cM,Tt(c.title),1),Be("p",uM,Tt(c.desc),1),Be("span",fM,Tt(c.year),1),Be("div",dM,[(we(!0),Pe(mt,null,Gt(c.tags,u=>(we(),Pe("span",{key:u}," //"+Tt(u),1))),128))])])]),_:2},1032,["to"]))),128))])])])}}},pM=Bi(hM,[["__scopeId","data-v-af857b05"]]),mM={__name:"Projects",setup(n){const e=[{slug:"stayforeverhome",title:"Stay: Forever Home",desc:"A relationship that's going to evolve over time",year:2025,image:"/images/projects/covers/StayForeverHome.jpg",tags:["Published","Unity","C#","VR","Tech Design"]},{slug:"interstellar",title:"Interstellar Drive",desc:"An unforgettable co-op experience begin from stories",year:2025,image:"/images/projects/covers/InterstellarDrive.png",tags:["Unreal5","Blueprint","C++","Tech Design","CI/CD"]},{slug:"sandcastle",title:"Sandcastle 3D",desc:"A tool designed by artist, for history",year:2025,image:"/images/projects/covers/SandCastle.png",tags:["Unreal5","Blueprint","Houdini","Python","C++","Automation"]},{slug:"nightoffullmoon",title:"Night of Full Moon",desc:"Unfold a magic journey with Little Red",year:2024,image:"/images/projects/covers/NightofFullMoon1.png",tags:["Published","Unity","C#","Lua"]},{slug:"ferrous",title:"Ferrous",desc:"A Unity 3D Adventure Puzzle Game",year:2023,image:"/images/projects/covers/FerrousHigh.gif",tags:["Unity","C#","Tech Design"]},{slug:"vivra",title:"VIVRA",desc:"Enhancing Virtual Reality Note-taking with LLMs and Users’ Voices",year:2023,image:"/images/projects/covers/VIVRA.png",tags:["Unity","C#","VR"]},{slug:"gamecollection",title:"Game Collection",desc:"All other games since I started",year:2022,image:"/images/projects/covers/gamecollection.png",tags:["Unreal5","Unity","Blueprint","C++","C#"]}],t=Xt(()=>{const i=new Set;return e.forEach(r=>r.tags.forEach(s=>i.add(s))),["All",...i]});return(i,r)=>(we(),Bl(pM,{items:e,tags:t.value},null,8,["tags"]))}},gM=Bi(mM,[["__scopeId","data-v-021a7291"]]),qu={slug:"interstellar",title:"Interstellar Drive",subtitle:"**Unforgettable Co-op Experience**",description:"**Interstellar Drive** is a co-op road trip adventure where players embody two musicians—a 1970s guitarist and a futuristic singer—driving a space car across surreal worlds. Together, they recruit unique band members and create groundbreaking music to perform at the **Interstellar Music Festival**.",info:{platform:"Windows",tools:"Unreal Engine 5, C++, Blueprint",controller:"Mouse & Keyboard & Controller",artStyle:"Realistic",role:"Technical & Design Director",publisher:"Voyager Studios",downloadLink:{label:"Voyager Studios - Interstellar Drive",url:"https://voyagerstudios.games/"}},sections:[{id:"intro-media",title:"",layout:"image-bottom",content:[],media:{type:"image",src:"/images/projects/projects/interstellar/id1.png",alt:"Interstellar Drive cover image"}},{id:"intro-video1",title:"",layout:"image-bottom",content:[],media:{type:"video",src:"/images/projects/projects/interstellar/idV1.mp4",alt:"Intro cinematic demo"}},{id:"intro-video2",title:"",layout:"image-bottom",content:[],media:{type:"video",src:"/images/projects/projects/interstellar/idV2.mov",alt:"Gameplay demo"}},{id:"my-contributions",title:"My Contributions",layout:"image-bottom",content:["Architected **C++ class hierarchy, data flow**, and **MVVM-based UI framework**.","Designed and implemented a **Gameplay Ability System (GAS)** for modular vehicle abilities.","Developed **enemy AI with behavior trees**, enabling adaptive chase encounters.","Acted as **Technical Producer**, managing schedules, playtests, and cross-team collaboration."],media:{type:"image",src:"/images/projects/projects/interstellar/id2.png",alt:"Gameplay systems overview"}},{id:"vehicle-energy",title:"1. Vehicle Energy & Oxygen Management",layout:"image-bottom",content:["**Energy**: consumed by abilities & collisions, regenerates near planets.","**Oxygen**: drains when energy is gone or off-road; reaching zero = fail state.","**Dynamic environment integration**: planetary boosts vs. off-road penalties."],media:{type:"image",src:"/images/projects/projects/interstellar/id3.png",alt:"Energy & Oxygen system"}},{id:"gas",title:"2. Gameplay Ability System (GAS)",layout:"image-bottom",content:["Modular design for **driver & copilot powers**: boost, shield, gravity grabbing, teleport ghost-car.","Balanced via **resource costs & cooldowns**.","Scalable: new co-pilots/band members = new unlockable abilities."],media:{type:"image",src:"/images/projects/projects/interstellar/id4.png",alt:"GAS abilities overview"}},{id:"coop-role",title:"3. Co-op Role Switching (Driver & Copilot)",layout:"image-bottom",content:["**Driver**: controls throttle, boost, steering.","**Copilot**: supports with aimed lasers, gravity grab, shields, teleport ghost-car.","Built with a **state machine** (`Enum_CopilotState`) and **Enhanced Input**.","**Design Iteration Story**","We run **bi-weekly playtests**. Early feedback revealed that:","Drivers felt overwhelmed by **difficult vehicle handling**.","Copilots, limited to just shooting, found their role **less engaging**.","This led us to **rebalance the co-op dynamic**, exploring new mechanics that make both roles equally meaningful—such as shared rhythm-based inputs or coordinated combo abilities."],media:{type:"video",src:"/images/projects/projects/interstellar/idV3.mov",alt:"Driver & Copilot demo"}},{id:"enemy-ai",title:"4. Enemy AI – Planet 1 Chase Battle",layout:"image-bottom",content:["Inspired by **Star Wars**’ AT-AT entanglement scene.","AI uses **Behavior Trees** to pursue players—not too fast, allowing players to strategize.","Designed for **chase-and-entangle** sequences where teamwork matters (driver evades, copilot disables)."],media:{type:"image",src:"/images/projects/projects/interstellar/id5.jpg",alt:"Enemy AI chase battle"},subsections:[{title:"",layout:"sub-single",content:[],media:{type:"image",src:"/images/projects/projects/interstellar/id6.png",alt:"Enemy AI sequence"}}]},{id:"vehicle-physics",title:"5. Advanced Vehicle Physics",layout:"image-bottom",content:["Designed with three pillars: **Flexible – Stable – Fun**.","**Flexible**: car can jump, fly, teleport, smash.","**Stable**: custom corrective forces prevent flipping; auto-upright assists on landings.","**Fun**: arcade-style forgiveness (ignore shallow side-collisions, playful bounce on frontal crash).","**Camera**: spring-arm lag, FOV zoom at high speed, impact shakes for weight.","**Tuning Example**","We adjusted advanced parameters (acceleration curves, collision forgiveness, upright assists) inspired by lessons from *Rocket League*, *Skylanders*, and *Need for Speed*. This helped transform the car from a frustrating “physics toy” into a **responsive, enjoyable vehicle**."],media:{type:"image",src:"/images/projects/projects/interstellar/id7.png",alt:"Vehicle physics system"},subsections:[{title:"",layout:"sub-single",content:[],media:{type:"video",src:"/images/projects/projects/interstellar/idV4.mp4",alt:"Vehicle physics demo"}}]},{id:"music-gameplay",title:"6. Music Gameplay (In Development)",layout:"image-bottom",content:["Currently prototyping **music-rhythm integration**, where co-op actions sync with soundtrack beats.","Goal: driving and combat not only progress the journey but also **compose the music** of the interstellar band."],media:{type:"video",src:"/images/projects/projects/interstellar/idV5.mp4",alt:"Music gameplay prototype"}},{id:"tech-producer",title:"Tech Producer Role",layout:"image-bottom",content:["In the early phase of development, our team faced a common challenge: everyone was prototyping **their own ideas** without alignment, which left us with **no coherent or playable game**.","To address this, I stepped in as **Tech Producer** and initiated a more structured workflow:","**Scope Alignment** – Proposed and defined a **vertical slice milestone** that clearly outlined what our first playable build must include.","**System Breakdown** – Using Notion, I documented the **core systems** required (vehicle physics, ability system, UI with MVVM, enemy AI, co-op role mechanics) and decomposed them into concrete technical features.","**Task Tracking** – Migrated these tasks into **Jira**, adding time estimates and dependencies to establish a transparent roadmap.","**Interest-based Assignment** – Matched tasks to teammates based on their skills and enthusiasm, keeping motivation high while ensuring coverage of all systems.","**Daily Standups** – Facilitated short syncs each day, identifying blockers early and offering direct technical support when needed.","**Outcome:** Within just **two months**, the team delivered the **first playable demo**, enabling us to begin our **bi-weekly playtests**. These playtests immediately revealed design imbalances (driver vs. copilot roles), which became the foundation for the next iteration cycle."],media:{type:"image",src:"/images/projects/projects/interstellar/id8.png",alt:"Tech Producer coordination workflow"}},{id:"key-learnings",title:"Key Learnings",layout:"image-bottom",content:["**Iterative Playtesting**: frequent tests highlighted imbalances (driver vs copilot), guiding role redesign.","**Narrative-Gameplay Fusion**: AI chase scenes bring cinematic inspirations (*Star Wars*) into gameplay.","**Scalable Architecture**: GAS + MVVM ensured new abilities and UI features were easy to expand.","**Physics Tuning**: balancing arcade accessibility and simulation depth was critical for player fun."],media:{type:"image",src:"/images/projects/projects/interstellar/id9.png",alt:"Team playtesting insights"}},{id:"future-directions",title:"Future Directions",layout:"image-bottom",content:["Finalize **Driver-Copilot balance** with rhythm-based mechanics.","Expand **enemy AI behaviors** across planets.","Full integration of **music performance mechanics**.","Large-scale multiplayer **Interstellar Festival** mode."]}]},Yu={slug:"stayforeverhome",title:"Stay: Forever Home",subtitle:"**A relationship that’s going to evolve over time**",description:"**Stay: Forever Home** is a mixed reality and virtual reality companion experience where players build a bond with a magical creature named Ember. Blending everyday interactions in the player’s real space with exploration in a fantastical virtual world, the project focuses on connection, comfort, and presence over traditional gameplay.",info:{platform:"Android & Meta Quest",tools:"Unity & C#",role:"Technical Designer & Gameplay Programmer",publisher:"Windup Minds",links:[{label:"Stay: Forever Home (Meta Store)",url:"https://www.meta.com/experiences/stay-forever-home/8870151916378062/"},{label:"Official Website",url:"https://stay-forever-home.com/"}]},sections:[{id:"my-work",title:"What Have I Done",layout:"image-bottom",content:["Designed and implemented a utility-based, designer-friendly AI pet behavior model, serving as the core gameplay mechanic and selling point, including 34 utility actions and reactions for pet.","Refactored VR AI logic for mobile, and adapted gameplay to short session loops."],media:{type:"image",src:"/images/projects/projects/stay/stay1.jpg",alt:"AI design overview"}},{id:"retro-context",title:"Retro & Context",layout:"image-bottom",content:["During my internship, I worked on adapting the VR-based **Stay: Forever Home** into a **mobile prototype** reimagined as a “pet cam” experience.","This required rethinking the core AI design and interaction loop to fit mobile constraints."],media:{type:"image",src:"/images/projects/projects/stay/stay2.png",alt:"Mobile prototype adaptation"}},{id:"role",title:"My Role: Technical Designer & Gameplay Developer",layout:"image-bottom",content:["Designed and implemented a **dual AI model** for Ember:","**Idle Mode**: Ember autonomously explores, rests, or plays when unobserved.","**Interactive Mode**: Ember responds to player engagement (e.g. fetch, playing with toys, responding to voice).","Implemented **34 actions** (fetch, play with player, wandering, sleep, short rest, interacting with visitors, etc.) driven by a utility-based system.","Tuned gameplay pacing for short mobile sessions by integrating **energy-based logic** to balance activity levels.","Created an **AI utility score editor tool** enhancing action tuning flow, empowering non-programmers to quickly prototype and balance Ember’s behaviors without digging into code."],media:{type:"image",src:"/images/projects/projects/stay/stay4.gif",alt:"AI interaction demo"},subsections:[{title:"Dual AI Mode",layout:"sub-single",content:[],media:{type:"image",src:"/images/projects/projects/stay/stay3.png",alt:"Utility score editor interface"}},{title:"Utility Score Editor",layout:"sub-single",content:["Built a designer-friendly editor that visualizes utility scoring and decision-making in real-time, significantly improving iteration speed."],media:{type:"image",src:"/images/projects/projects/stay/stay5.png",alt:"Utility score editor interface"}}]},{id:"key-learnings",title:"Key Learnings",layout:"image-bottom",content:["**AI Design & Architecture**","Built scalable, modular utility-based behavior systems.","Learned to re-architect VR AI logic for mobile constraints.","**Production & Workflow**","Experienced agile processes with daily standups and sprint goals.","Improved iteration through playtests and design reviews.","**Cross-Functional Collaboration**","Worked closely with design and gameplay teams to refine behaviors.","Used Git and regular feedback loops for smooth collaboration."]},{id:"technical-challenges",title:"Technical Challenges & Solutions",layout:"image-bottom",content:["**Platform Shift (VR → Mobile)**","VR allows direct interaction (grabbing, throwing).","Mobile limited to screen-based input (slingshot toys, tapping, pet cam observation).","**Solution**: Created a **dual-mode AI system** that adapts Ember’s responses based on whether the player is passively watching or actively engaging.","**State Conflicts**","Idle vs. interactive behaviors initially overlapped.","**Solution**: Introduced a clear state boundary and custom state management layer.","**Feeling Natural vs. Mechanical**","Early behaviors felt too scripted.","**Solution**: Added dynamic weighting, contextual memory, and energy constraints for lifelike spontaneity.","**AI Behavior Debug**","Utility actions are picked based on current condition, hard to debug.","**Solution**: Added a debug panel, providing real-time visualization of Ember’s decision-making process."]},{title:"What Went Well & What Could Be Improved",layout:"sub-two-col",cols:[{content:["**What Went Well**","Successfully reinterpreted VR AI for a mobile-friendly design without losing personality.","Internal testers described Ember’s behavior as *natural* and *charming*.","Built extensible systems for both autonomous and player-driven actions.","Early debug tools boosted iteration speed."]},{content:["**What Could Be Improved**","Reuse of legacy logic caused cleanup inconsistencies.","State boundaries were unclear in early prototypes.","Large, poorly documented VR codebase slowed onboarding.","Lack of visual debugging/editing tools increased tuning difficulty."]}]},{id:"reflection",title:"Reflection",layout:"image-bottom",content:["The hardest part of this project was **translating a VR interaction paradigm into a mobile one**.","In VR, the space is the interaction medium: players throw, grab, and directly touch Ember.","On mobile, interaction shrinks to a **flat screen + pet cam**, requiring indirect mechanics (slingshot toys, tap-to-feed, passive observation).","The challenge was not just technical, but experiential—how to preserve the **bond with Ember** despite platform and interaction limitations.","This led me to design the **dual AI model**, where Ember naturally shifts between idle autonomy and interactive responsiveness, creating an illusion of life and presence even in a passive mobile setting."]},{id:"key-takeaways",title:"Key Takeaways",layout:"image-bottom",content:["Learned how to **adapt AI systems across platforms** while retaining believability.","Understood the importance of **interaction design shaped by platform constraints**.","Developed skills in navigating legacy codebases and refactoring for new use cases.","Discovered that **player perception** (naturalness, responsiveness, emotional resonance) matters as much as technical correctness."]},{id:"future-directions",title:"Future Directions",layout:"image-bottom",content:["Add **context-sensitive actions** (time of day, environment).","Enable **personalized behaviors** based on long-term player patterns.","Develop a **visual behavior editing tool** for designers to fine-tune actions faster.","One of my favorite new behaviors is the **gift-giving action**, where a Mossling offers the player a present. This small but emotionally rich gesture demonstrates how AI-driven characters can move beyond utility into **meaningful, memorable moments**."],media:{type:"image",src:"/images/projects/projects/stay/stay6.gif",alt:"Gift-giving behavior demo"}}]},$u={slug:"sandcastle",title:"Sandcastle3D V2",subtitle:"A malleable **3D mapping system** for pre-modern maps and views",description:'Sandcastle is a digital humanities project that rethinks how scholars can study premodern cartography. Instead of treating historical maps as "inaccurate" distortions of modern Cartesian basemaps, Sandcastle enables researchers to enter these maps on their own terms—visualizing itineraries, panoramas, chorographies, and views as navigable, malleable 3D spaces.',info:{platform:"Windows",tools:"Unreal Engine 5, Houdini, C++, Python",role:"Technical Artist (Tool Development) & Producer",downloadLink:{label:"Visit Sandcastle 3D",url:"https://www.sandcastle3d.org/"}},sections:[{id:"intro-image",title:"",layout:"image-bottom",content:[],media:{type:"image",src:"/images/projects/projects/sandcastle/sd1.png",alt:"Sandcastle 3D interface overview"}},{id:"research-context",title:"Research Context",layout:"image-bottom",content:["For decades, historians of cartography have emphasized that maps are interpretive texts, not neutral depictions of space. Yet most digital approaches rely on georectification—warping old maps onto modern basemaps—which implicitly assumes that modern maps are objective and historical ones flawed.",'This approach fails for chorographies and perspectival maps—ubiquitous in the medieval and early modern periods—which depict cities and landscapes in richly three-dimensional, often theatrical ways. Traditionally dismissed as "illustrations," these sources actually encode spatial, political, and cultural arguments.',"Sandcastle was created to ask a new set of questions: Can we read maps computationally without forcing them into Cartesian space? What if we could step inside historical views and experience them interactively? How might a malleable 3D toolkit help scholars compare, annotate, and analyze such maps on their own visual and conceptual terms?"],media:{type:"image",src:"/images/projects/projects/sandcastle/sd2.png",alt:"Historical map comparison showing traditional vs Sandcastle approach"}},{id:"my-contributions",title:"My Contributions",layout:"image-bottom",content:[],subsections:[{title:"1. Tower Generation System",layout:"sub-single",content:["Designed a procedural tower generator based on JSON annotations. Towers could be spawned automatically with fully editable parameters exposed through Houdini multiparms, such as:","Number of merlons (battlements)","Shape of merlons (flat, triangular, rounded)","Number of sides (polygonal towers vs. circular towers)","Width and height parameters","The iteration process involved two major versions:","V1: Towers regenerated only after placement—artists had no live preview during the editing process.","V2: Implemented a bounding box + raycast placement system (via Python and Houdini API). Using the principle of similar triangles, tower movement maintained a consistent visual size from the camera's perspective, giving artists real-time visual feedback."],media:{type:"image",src:"/images/projects/projects/sandcastle/sd3.png",alt:"Tower generation system interface"}},{title:"Tower Placement Demo",layout:"sub-two-col",cols:[{content:["This video demonstrates the bounding box + raycast placement system in action, showing how artists can intuitively place and adjust towers with real-time feedback."]},{content:["The system maintains consistent visual scaling as towers are moved, making the placement process much more intuitive than traditional 3D modeling workflows."]}],media:{type:"video",src:"/images/projects/projects/sandcastle/sdV1.mp4",alt:"Tower placement system demonstration"}},{title:"Tower Examples",layout:"sub-two-col",cols:[{content:["Various tower configurations showing the flexibility of the procedural system:"]},{content:["Each tower can be customized with different merlon styles, wall heights, and architectural details while maintaining historical accuracy."]}],media:{type:"image",src:"/images/projects/projects/sandcastle/sd4.png",alt:"Various tower configurations and styles"}},{title:"Tower Variations",layout:"sub-two-col",cols:[{content:["The system supports multiple architectural styles:"]},{content:["From simple circular towers to complex polygonal fortifications, all generated procedurally with artist-friendly controls."]}],media:{type:"image",src:"/images/projects/projects/sandcastle/sd5.png",alt:"Different tower architectural variations"}},{title:"2. Terrain Generation Workflow",layout:"sub-two-col",cols:[{content:["Built a comprehensive pipeline to convert 2D annotated maps into editable 3D landscapes:","1. Trace points on 2D images → export to JSON format","2. Houdini generates initial terrain via rotation and heightfield processing","3. Export per-hill heightfield maps + transforms into JSON","4. Houdini rebuilds terrain from JSON data","5. Unreal integration: each hill linked to a gizmo for independent editing"]},{content:["Why this approach mattered: Unreal's native brush tool only allows regional sculpting, and plugins like Landmass only apply spline curves to deform existing terrain. My system enabled per-hill editing, something no existing tool provided.","Impact: Artists could reposition, reshape, and refine individual hills in real time, with edits written back into JSON and re-cooked in Houdini. This gave them unprecedented control and drastically improved iteration speed."]}],media:{type:"image",src:"/images/projects/projects/sandcastle/sd6.png",alt:"Terrain generation workflow pipeline"}},{title:"Terrain Editing Interface",layout:"sub-two-col",cols:[{content:["The terrain editing interface allows for intuitive manipulation of individual landscape elements."]},{content:["Artists can move mountains, adjust hill heights, and reshape terrain while maintaining the overall geographical coherence of the historical map."]}],media:{type:"image",src:"/images/projects/projects/sandcastle/sd7.png",alt:"Terrain editing interface in action"}},{title:"3. Production & Pipeline Coordination",layout:"sub-two-col",cols:[{content:["Coordinated workflows between historians, engineers, and artists to ensure the technical tools served the research goals effectively.","Translated complex research needs into modular development tasks that could be implemented incrementally."]},{content:["Streamlined Houdini–Unreal data flow, reducing manual iteration overhead from hours to minutes.","Established version control and asset management practices for a multidisciplinary team."]}]}]},{id:"reflections",title:"Reflections & Learning",layout:"image-bottom",content:["**Exploring API limits:** Many challenges required pushing Houdini's Python API beyond typical use cases, which taught me how to innovate under technical constraints and find creative solutions to complex problems.","**Designing for users:** A major lesson was to prioritize artist experience over technical elegance. For example, in the terrain editor: initially, Unreal's brush tools forced artists to approximate hill shapes by manually sculpting regions. With my per-hill gizmo workflow, one artist commented that they could 'finally move mountains instead of painting them.' This transformed editing from a slow, imprecise process into an intuitive drag-and-drop experience.","**Bridging disciplines:** I learned to connect research-driven requirements with technical possibilities, making tools that satisfy both scholarly rigor and artistic intuition. This required constant communication and iteration between different stakeholder groups."]},{id:"future-directions",title:"Future Directions",layout:"image-bottom",content:["**Expanded toolkit:** Extend procedural capabilities to walls, gates, courtyards, and other architectural archetypes commonly found in historical maps.","**AI-assisted annotation:** Explore machine learning approaches for automated annotation of hand-drawn maps to accelerate the data preparation process.","**Immersive exploration:** Add VR and AR modes to let researchers literally walk inside historical maps and experience them from a first-person perspective.","**Collaborative features:** Implement real-time collaborative editing so multiple scholars can work on the same historical reconstruction simultaneously."]}]},Ku={slug:"nightoffullmoon",title:"Night of Full Moon",subtitle:"**Commercial-Scale** Card Battler Development Experience",description:"**Night of Full Moon** is a fairy-tale themed card strategy game based on the story of **Little Red Riding Hood**. The game offers multiple modes:",info:{platform:"Windows & Mac, iOS, Android",tools:"Unity, C#, Lua, PrefDog",controller:"Mouse & Keyboard",artStyle:"Cartoon + realistic",role:"Gameplay Programmer Intern",downloadLink:{label:"Night of Full Moon - Steam",url:"https://store.steampowered.com/app/769560/_Night_of_Full_Moon/"}},sections:[{id:"intro-image",title:"",layout:"image-bottom",content:[],media:{type:"image",src:"/images/projects/projects/nightoffullmoon/nom1.png",alt:"Night of Full Moon cover image"}},{id:"my-contributions",title:"My Contributions",layout:"image-bottom",content:["**VFX Optimization with Object Pooling**","Built a **Lua-based object pooling system** for frequent fire effect calls during damage multiplier calculations.","Avoided destroying commonly reused VFX, reducing CPU spikes and improving runtime stability."],media:{type:"image",src:"/images/projects/projects/nightoffullmoon/nom2.png",alt:"VFX optimization illustration"},subsections:[{title:"Card Scoring & Poker Hand Judgement",layout:"sub-single",content:["Implemented logic for **evaluating card hands and scoring** in Lua.","Designed modular functions for rule checking (pair, straight, flush equivalents) to support future content expansion."],media:{type:"image",src:"/images/projects/projects/nightoffullmoon/nom3.png",alt:"Card scoring system"}},{title:"WeChat SDK Integration",layout:"sub-single",content:["Integrated **Tencent WeChat SDK** for in-game advertising and platform services.","Handled platform-specific edge cases such as asynchronous ad callbacks."]},{title:"Asset Cleanup & Optimization Tool",layout:"sub-single",content:["Built a **duplicate asset detection tool**: initially used **MD5 hashing**, later optimized to **hash comparison** for faster detection.","Reduced package size by **52%**, improving load times and distribution efficiency.","Limitation: cleanup didn’t auto-relink removed textures back in Unity—highlighting a future improvement area."]}]},{id:"key-learnings",title:"Key Learnings",layout:"image-bottom",content:["**First Experience on a Large-Scale Commercial Project**","Learned to navigate team pipelines, follow coding conventions, and adapt to enterprise workflows.","**Lua & xLua Framework**","Gained proficiency with **xLua** (Tencent’s Unity-Lua binding), understanding how scripting enables fast iteration.","**UI Modularity**","Experienced the benefits of a **layered, modular UI system**, which streamlined both development and future content updates.","**Importance of Tools**","Realized that **internal tools (like asset checkers)** are as impactful as gameplay features for shipping and maintaining large projects."],media:{type:"image",src:"/images/projects/projects/nightoffullmoon/nom4.png",alt:"Team collaboration and learning"}},{id:"reflection",title:"Reflection",layout:"image-bottom",content:["This project marked my **first foray into a large-scale commercial title**. It taught me:","How scripting frameworks like Lua integrate into Unity for flexible feature development.","The critical role of **performance optimization** in card games with heavy VFX usage.","Why **scope-friendly, modular UI architecture** is invaluable for long-term support.","The importance of building **practical dev tools** to streamline workflows and reduce costs.","Due to NDA, I cannot share in-game content, but this internship remains a cornerstone in my growth as both a **technical gameplay programmer** and a **developer aware of production-scale challenges**."]}]},Zu={slug:"gamecollection",title:"Game Collections",subtitle:"Showcase of Personal and Team Projects",description:"This section showcases a selection of personal and team game projects I have completed over time. Covering Unity, Unreal Engine, multiplayer, 2D/3D, and Game Jam works, it highlights the breadth of my experience across programming, design, art, and tool development.",info:{platform:"Windows & Mac",tools:"Unity, Unreal, C#, C++, Blueprint, Maya",date:"2023-2025"},sections:[{id:"gridmaster-info",title:"2025 · GridMaster",layout:"sub-single",content:["**Type:** Multiplayer 3rd-person Shooter + Tic-Tac-Toe Mechanics","**Tools:** Unreal Engine 5","**Role:** Gameplay Programmer & Designer","**Controller:** Mouse & Keyboard & Controller","**Art Style:** Cartoon","[GridMaster – itch.io](https://kerrylu.itch.io/gridmaster)","","A multiplayer battle game across **nine time dimensions**, where players capture zones by shooting markers and win with a Tic-Tac-Toe alignment. Includes **power-ups to manipulate time** and disrupt opponents."],media:{type:"image",src:"/images/projects/projects/gamecollection/gridmaster1.png",alt:"GridMaster screenshot 1"}},{id:"gridmaster-img2",title:"",layout:"image-bottom",content:[],media:{type:"image",src:"/images/projects/projects/gamecollection/gridmaster2.png",alt:"GridMaster screenshot 2"}},{id:"grid-master-video1",title:"",layout:"image-bottom",content:[],media:{type:"iframe",src:"https://www.youtube.com/embed/exgdB-X7hsw?si=vQsyPNiX1oxPOrUJ",alt:"Gridmaster's gameplay video"}},{id:"bubble-drift-info",title:"2025 · Bubble Drift – Multiverse Racer",layout:"sub-single",content:["**Type:** Global Game Jam Project (Theme: “Multiverse”)","**Tools:** Unreal Engine 5","**Role:** Game Programmer & Designer","**Controller:** Mouse & Keyboard & Controller","**Art Style:** Cyber, surreal","[Bubble Drift – Global Game Jam](https://globalgamejam.org/games/2025/bubble-drift-multiverse-racer-6)","","A racing game where each “bubble” opens a **different dimension** with unique roads, visuals, and music. Combines **fast-paced racing** with **procedural world transformations**."],media:{type:"image",src:"/images/projects/projects/gamecollection/bubble1.png",alt:"Bubble Drift screenshot 1"}},{id:"bubble-drift-img2",title:"",layout:"image-bottom",content:[],media:{type:"image",src:"/images/projects/projects/gamecollection/bubble2.png",alt:"Bubble Drift screenshot 2"}},{id:"bubble-drift-img3",title:"",layout:"image-bottom",content:[],media:{type:"image",src:"/images/projects/projects/gamecollection/bubble3.png",alt:"Bubble Drift screenshot 3"}},{id:"bubble-drift-img4",title:"",layout:"image-bottom",content:[],media:{type:"image",src:"/images/projects/projects/gamecollection/bubble4.png",alt:"Bubble Drift screenshot 4"}},{id:"bubble-drift-video1",title:"",layout:"image-bottom",content:[],media:{type:"video",src:"/images/projects/projects/gamecollection/bubbleV1.mp4",alt:"Bubble Drift gameplay video"}},{id:"scratch-it-info",title:"2024 · Scratch It!",layout:"sub-singlee",content:["**Type:** Game Jam Project (Theme: “From Scratch”)","**Tools:** Unreal Engine 5","**Role:** Game Programmer","**Controller:** Mouse & Keyboard","**Art Style:** Realistic + Doodle","[Scratch It! – itch.io](https://solarim.itch.io/scratch-it)","","A puzzle game where you literally **scratch surfaces** to trap a bouncing ball inside a spinning circle. Made in 48h jam at Duke."],media:{type:"image",src:"/images/projects/projects/gamecollection/scratch1.png",alt:"Scratch It screenshot 1"}},{id:"scratch-it-img2",title:"",layout:"image-bottom",content:[],media:{type:"image",src:"/images/projects/projects/gamecollection/scratch2.png",alt:"Scratch It screenshot 2"}},{id:"scratch-it-img3",title:"",layout:"image-bottom",content:[],media:{type:"image",src:"/images/projects/projects/gamecollection/scratch3.png",alt:"Scratch It screenshot 3"}},{id:"scratch-it-img4",title:"",layout:"image-bottom",content:[],media:{type:"image",src:"/images/projects/projects/gamecollection/scratch4.png",alt:"Scratch It screenshot 4"}},{id:"art-of-racing-info",title:"2023 · The Art of Racing",layout:"sub-single",content:["**Type:** Endless Runner + Knowledge Popularization","**Tools:** Unity, C#, Maya","**Role:** Solo Developer (Programming, Design, Art)","**Platform:** Windows PC","**Art Style:** Low Poly","[The Art of Racing – Download](https://drive.google.com/file/d/1OMqLvzIdqWWDc_RhuWSpm92uTlztrq4N/view?usp=sharing)","","An endless racing game focused on **safety education in motorsports**. Players experience how different safety devices (Halo, HANS, crash structures) protect drivers, and learn racing history while playing.","- Modes: **Endless Mode** (apply safety devices) / **Pure Driving Mode** (race without protection).","- Dedicated sections like “Institute of Mechanics” & “Temple of Speed” combine **gameplay + learning**.","- Iterated based on user feedback: improved FOV, added obstacle feedback, rebalanced speeds."],media:{type:"image",src:"/images/projects/projects/gamecollection/aor1.png",alt:"The Art of Racing screenshot 1"}},{id:"art-of-racing-img2",title:"",layout:"image-bottom",content:[],media:{type:"image",src:"/images/projects/projects/gamecollection/aor2.png",alt:"The Art of Racing screenshot 2"}},{id:"art-of-racing-img3",title:"",layout:"image-bottom",content:[],media:{type:"image",src:"/images/projects/projects/gamecollection/aor3.png",alt:"The Art of Racing screenshot 3"}},{id:"art-of-racing-img4",title:"",layout:"image-bottom",content:[],media:{type:"image",src:"/images/projects/projects/gamecollection/aor4.png",alt:"The Art of Racing screenshot 4"}},{id:"aqua-will-info",title:"2023 · Aqua’s Will",layout:"sub-single",content:["**Type:** 2D Platform Adventure","**Team Size:** 6 (Shanghai University)","**Tools:** Unity, C#, Photoshop","**Role:** Lead Programmer & Designer","**Platform:** Windows PC","**Art Style:** Cartoon","[Aqua’s Will – Download](https://drive.google.com/file/d/1x-bFBS7N48f4qFOddTvIqgVvTzysDRsQ/view?usp=sharingd)","","An ocean-themed platformer where players embody **Aqua, a sea spirit** fighting to purify polluted oceans. Game designed to raise environmental awareness."],media:{type:"image",src:"/images/projects/projects/gamecollection/aqw1.png",alt:"Aqua’s Will screenshot 1"}},{id:"aqua-will-img2",title:"",layout:"image-bottom",content:[],media:{type:"image",src:"/images/projects/projects/gamecollection/aqw2.png",alt:"Aqua’s Will screenshot 2"}},{id:"aqua-will-img3",title:"",layout:"image-bottom",content:[],media:{type:"image",src:"/images/projects/projects/gamecollection/aqw3.png",alt:"Aqua’s Will screenshot 3"}},{id:"aqua-will-video1",title:"",layout:"image-bottom",content:[],media:{type:"iframe",src:"https://www.youtube.com/embed/gspIyN3kA_I?si=evm8nGpSNEKLqDPH",alt:"Aqua’s Will gameplay video"}},{id:"summary",title:"Summary of Experience",layout:"sub-single",cols:[{content:["Delivered **5+ complete games** across Unity & Unreal, in both solo and team settings.","Explored **multiple genres**: Endless Runner, Platformer, Puzzle, Racing, Multiplayer Shooter.","Led **programming of AI systems, procedural tools, and core gameplay mechanics**.","Iterated designs with **user testing and feedback integration**.","Balanced **creative vision + technical execution**, from Game Jam prototypes to educational projects."]}],media:{type:"image",src:"/images/projects/projects/gamecollection/gamecollection1.png",alt:"Game collection summary"}}]},Ju={slug:"vivra",title:"VIVRA: Voice Interactive VR Annotation",subtitle:"**Research** on Enhancing Virtual Reality Note-taking with LLMs and Users’ Voices",description:"**VIVRA** is a research-driven VR system that explores how **voice input + Large Language Models (LLMs)** can transform note-taking in immersive environments. Instead of relying on virtual keyboards or controllers—which are slow, error-prone, and unintuitive in VR—VIVRA enables users to **speak their notes aloud**, have them **transcribed, summarized, and visualized as interactive 3D balloons** in real time.",info:{platform:"Meta Quest Pro / Quest 2",tools:"Unity (C#), Azure Speech-to-Text, OpenAI GPT-3.5",controller:"Voice + Controller",artStyle:"Research Prototype / VR UI",role:"VR Developer & Researcher",publisher:"Academic / Research Project"},sections:[{id:"intro-image",title:"",layout:"image-bottom",content:[],media:{type:"image",src:"/images/projects/projects/vivra/vivra1.png",alt:"VIVRA cover image"}},{id:"research-context",title:"Research Context",layout:"image-bottom",content:["Note-taking in VR is notoriously difficult:","Traditional keyboards and touchscreens are not visible in immersive environments.","Virtual keyboards operated by controllers or pointers are slow and imprecise.","Existing alternatives (gestures, haptics, gaze input) are often unintuitive or require extra hardware.","With the rise of **LLMs** and robust **speech-to-text services**, VIVRA asks:","Can we make VR note-taking **faster and more natural** by using voice?","Can AI automatically **summarize and structure** spoken ideas into usable notes?","What does an **intelligent, multimodal interface** for VR writing look like?"],media:{type:"image",src:"/images/projects/projects/vivra/vivra2.png",alt:"VIVRA research context diagram"}},{id:"system-design",title:"System Design",layout:"image-bottom",content:["**Architecture**","Speech Detection: Real-time transcription using Microsoft Azure Speech-to-Text.","LLM Summarization: Prompts tuned for concise keyword/topic extraction with GPT-3.5.","Visualization in VR: Each detected topic appears as a **3D balloon** in Unity, holding related voice notes.","Interactive Editing: Users can add, delete, modify, or merge balloons via **voice commands or controller input**.","**Interaction Highlights**","New topics rise from a **portal animation**, reinforcing the metaphor of “ideas taking shape.”","Balloons **resize dynamically** based on how many notes they contain, offering a quick visual overview of idea density.","Balloons are **grabbable and movable**, giving users spatial organization tools."],media:{type:"image",src:"/images/projects/projects/vivra/vivra3.png",alt:"Balloon-based note visualization"},subsections:[{title:"Balloon Interaction",layout:"sub-two-col",cols:[{content:["3D balloons act as **containers for notes**, growing in size with more content."]},{content:["Players can **move, merge, and delete balloons**, organizing notes spatially in VR."]}],media:{type:"image",src:"/images/projects/projects/vivra/vivra4.png",alt:"Interactive balloon editing"}}]},{id:"my-contributions",title:"My Contributions",layout:"image-bottom",content:["System Implementation: Built the VR app in **Unity (C#)**, integrated **Azure Speech API** and **OpenAI GPT-3.5** for transcription and summarization.","Prompt Engineering: Designed structured prompts to ensure consistent topic extraction and short keyword outputs.","Interaction Design: Implemented the balloon-based visualization and editing mechanics (voice commands + controller).","Optimization: Improved responsiveness by only sending incremental speech segments to the LLM, reducing latency.","Testing: Deployed on **Meta Quest Pro / Quest 2** and iteratively refined animations, transitions, and usability."]},{id:"key-takeaways",title:"Key Takeaways",layout:"image-bottom",content:["LLM Integration in VR: Demonstrated how LLMs can support **summarization and structuring tasks** in immersive contexts.","Voice as Input: Showed that voice-based note-taking can be more natural than controllers or virtual keyboards.","Visualization Matters: Turning abstract text into **spatial, interactive objects** (balloons) helps users organize and recall ideas.","User-Centered Design: Learned the importance of **real-time feedback, intuitive editing, and playful metaphors** (e.g., portals, balloons) in making research prototypes engaging."],media:{type:"image",src:"/images/projects/projects/vivra/vivra5.png",alt:"User-centered design highlights"},subsections:[{title:"",layout:"sub-single",content:[],media:{type:"image",src:"/images/projects/projects/vivra/vivra6.png",alt:"Balloon-based interface in action"}}]},{id:"future-directions",title:"Future Directions",layout:"image-bottom",content:["Conduct **user studies** to evaluate usability vs. traditional VR note-taking methods.","Extend to **collaborative note-taking in multi-user VR spaces**.","Explore **multimodal AI support** (gesture + voice + LLMs) for richer writing workflows.","Integrate **persistent storage & cross-platform sync** for long-term VR knowledge work."]},{id:"personal-reflection",title:"Why This Matters for Me",layout:"image-bottom",content:["This project allowed me to combine my **VR development experience** with cutting-edge **LLM integration**, and to contribute to **HCI research** that pushes VR beyond entertainment into productivity and knowledge work."]}]},Qu={slug:"ferrous",title:"Ferrous",subtitle:"**Adventure Puzzle Game** with Magnetism",description:"Ferrous is a student program at University of Toronto. By creating a single-player game, our goal is to build an attractive adventure game.",coverImage:"/images/projects/projects/ferrous/ferrouspro.png",info:{platform:"Windows & Mac",tools:"Unity, C#, Maya",date:"2023.12",controller:"Controller; Mouse & Keyboard",artStyle:"Cartoon & Realistic",contribution:"Game Programmer & Game Designer",downloadLink:{label:"Ferrous on itch.io",url:"https://sameerk9.itch.io/ferrous"}},sections:[{id:"summary",title:"Summary",layout:"title-image",content:["Ferrous is an extraordinary adventure puzzle game that immerses players in a world where magnetism reigns supreme. With its captivating gameplay mechanics, intricately designed levels, and an array of challenges that evolve in complexity, it promises an unforgettable journey."],media:{type:"image",src:"/images/projects/projects/ferrous/ferrouspro.png"}},{id:"key-feature",title:"Key Feature",layout:"image-bottom",content:["A key feature of the game lies in the ingenious ways players can employ their magnetic prowess to interact with the environment. In this magnetic adventure, players can effortlessly attract (pull) or repel (push) objects to overcome obstacles, explore the surroundings, and advance through levels."]},{id:"problem1",title:"Problem During Development 1",layout:"image-bottom",content:["The biggest challenge revolved around code merging, leading to dysfunction and confusion in the game scenes. This culminated in a broken scenario, preventing us from presenting at the Game Design & Development Club's testing session."],subsections:[{title:"Solution",layout:"image-bottom",content:["We established a standardized process for task assignment and code merging. Tasks were split into modules, ensuring one person worked on scenarios at a time, while others focused on UI, Gameplay, or SFX. We used Trello to manage tasks and track blocked issues."],media:{type:"image",src:"/images/projects/projects/ferrous/mergeprocess.png"}}]},{id:"problem2",title:"Problem During Development 2",layout:"image-bottom",content:["We often reused scripts. If a script handled different inputs/outputs but shared the same detection, hard-coding caused redundancy. This was ignored early, so programmers had to copy/rewrite scripts for every new level."],subsections:[{title:"Solution",layout:"image-bottom",content:["We refactored the scripts using UnityEvent. For example, detecting door opening was abstracted to a base class, so developers could easily pass new logic without rewriting redundant code. This greatly reduced time and improved flexibility."],media:{type:"image",src:"/images/projects/projects/ferrous/script.png"}}]},{id:"things-i-did",title:"Things I Did",layout:"image-bottom",content:["Design of game levels","Level triggers and components","Game UI design and implementation"]},{id:"what-i-learned",title:"What I Learned",layout:"image-bottom",content:["Split development into modules with clear alignment rules to minimize merge conflicts.","Design detail hints to guide players to use skills instead of confusing them.","Player feedback and playtests are crucial to improve the game.","Trello task planning system helped organize development efficiently."]},{id:"meet-the-team",title:"Meet the Team!",layout:"title-image",media:{type:"image",src:"/images/projects/projects/ferrous/team.jpg"}}]},_M={[qu.slug]:qu,[Yu.slug]:Yu,[$u.slug]:$u,[Ku.slug]:Ku,[Zu.slug]:Zu,[Ju.slug]:Ju,[Qu.slug]:Qu},vM={class:"media-wrapper"},xM=["src","alt"],yM=["src"],SM=["src"],MM={key:3,class:"media-error"},EM={__name:"MediaComponent",props:{section:{type:Object,required:!0}},setup(n){const e=i=>{console.error("Image failed to load:",i.target.src),i.target.style.display="none"},t=i=>{console.error("Video failed to load:",i.target.src)};return(i,r)=>(we(),Pe("div",vM,[n.section.media.type==="image"||n.section.media.type==="gif"?(we(),Pe("img",{key:0,src:n.section.media.src,alt:n.section.media.alt||n.section.title||"Project image",class:"media__item",onError:e,onLoad:r[0]||(r[0]=()=>console.log("Image loaded successfully:",n.section.media.src))},null,40,xM)):n.section.media.type==="video"?(we(),Pe("video",{key:1,muted:"",loop:"",playsinline:"",controls:"",preload:"metadata",class:"media__item media__item--video",onError:t},[Be("source",{src:n.section.media.src,type:"video/mp4"},null,8,yM),r[1]||(r[1]=on(" Your browser does not support the video tag. ",-1))],32)):n.section.media.type==="iframe"?(we(),Pe("iframe",{key:2,src:n.section.media.src,frameborder:"0",allowfullscreen:"",class:"media__item media__item--iframe"},null,8,SM)):(we(),Pe("div",MM,[Be("p",null,"Unsupported media type: "+Tt(n.section.media.type),1),Be("p",null,"Source: "+Tt(n.section.media.src),1)]))]))}},Lr=Bi(EM,[["__scopeId","data-v-e37eebc9"]]),bM={key:0,class:"main"},TM={class:"case-header"},AM={class:"case-header__inner container"},wM={class:"case-header__title"},RM=["innerHTML"],CM={class:"case-description container"},PM=["innerHTML"],DM={class:"case-info container"},IM={class:"case-info__list"},LM={key:0},UM={key:1},NM={key:2},FM={key:3},OM={key:4},BM={key:5},kM={key:6},zM=["href"],HM=["id"],VM={class:"container"},GM={key:0,class:"case-section__title"},WM={key:1,class:"case-row"},XM={class:"case-col text"},jM=["innerHTML"],qM={key:0,class:"case-col media"},YM={key:2,class:"case-row reverse"},$M={class:"case-col text"},KM=["innerHTML"],ZM={key:0,class:"case-col media"},JM={key:3,class:"case-stack"},QM={key:0,class:"text"},eE=["innerHTML"],tE={key:1,class:"media"},nE={key:4,class:"case-sub-two-col"},iE=["innerHTML"],rE={key:5,class:"case-default"},sE={key:0,class:"text"},oE=["innerHTML"],aE={key:1,class:"media"},lE={key:6,class:"case-subsections"},cE={key:0,class:"case-subsection__title"},uE={key:1,class:"case-sub-two-col"},fE=["innerHTML"],dE={key:2,class:"case-sub-single"},hE=["innerHTML"],pE={key:3,class:"subsection-media"},mE={__name:"ProjectDetail",setup(n){const t=Vg().params.slug,i=_M[t];i||console.error(`Project with slug "${t}" not found`);const r=o=>o?o.replace(/\*\*(.*?)\*\*/g,'<span class="highlight">$1</span>'):"",s=o=>o?o.replace(/\*\*(.*?)\*\*/g,"<strong>$1</strong>"):"";return(o,a)=>tt(i)?(we(),Pe("main",bM,[Be("section",TM,[Be("div",AM,[Be("h1",wM,Tt(tt(i).title),1),Be("p",{class:"case-header__subtitle",innerHTML:r(tt(i).subtitle)},null,8,RM)])]),Be("section",CM,[Be("p",{class:"case-header__description",innerHTML:s(tt(i).description)},null,8,PM)]),Be("section",DM,[Be("ul",IM,[tt(i).info.platform||tt(i).info.platformdefault?(we(),Pe("li",LM,[a[0]||(a[0]=Be("strong",null,"Platform:",-1)),on(" "+Tt(tt(i).info.platform||tt(i).info.platformdefault),1)])):bt("",!0),tt(i).info.tools?(we(),Pe("li",UM,[a[1]||(a[1]=Be("strong",null,"Tools:",-1)),on(" "+Tt(tt(i).info.tools),1)])):bt("",!0),tt(i).info.date?(we(),Pe("li",NM,[a[2]||(a[2]=Be("strong",null,"Date:",-1)),on(" "+Tt(tt(i).info.date),1)])):bt("",!0),tt(i).info.controller?(we(),Pe("li",FM,[a[3]||(a[3]=Be("strong",null,"Controller:",-1)),on(" "+Tt(tt(i).info.controller),1)])):bt("",!0),tt(i).info.artStyle?(we(),Pe("li",OM,[a[4]||(a[4]=Be("strong",null,"Art Style:",-1)),on(" "+Tt(tt(i).info.artStyle),1)])):bt("",!0),tt(i).info.contribution||tt(i).info.role?(we(),Pe("li",BM,[Be("strong",null,Tt(tt(i).info.contribution?"Contribution":"Role")+": ",1),on(" "+Tt(tt(i).info.contribution||tt(i).info.role),1)])):bt("",!0),tt(i).info.downloadLink?(we(),Pe("li",kM,[Be("a",{href:tt(i).info.downloadLink.url,target:"_blank",rel:"noopener"},Tt(tt(i).info.downloadLink.label),9,zM)])):bt("",!0)])]),(we(!0),Pe(mt,null,Gt(tt(i).sections,l=>(we(),Pe("section",{id:l.id,key:l.id,class:"case-section"},[Be("div",VM,[l.title?(we(),Pe("h2",GM,Tt(l.title),1)):bt("",!0),l.layout==="text-left"?(we(),Pe("div",WM,[Be("div",XM,[(we(!0),Pe(mt,null,Gt(l.content,(c,u)=>(we(),Pe("p",{key:u,innerHTML:s(c)},null,8,jM))),128))]),l.media?(we(),Pe("div",qM,[xt(Lr,{section:l},null,8,["section"])])):bt("",!0)])):l.layout==="text-right"?(we(),Pe("div",YM,[Be("div",$M,[(we(!0),Pe(mt,null,Gt(l.content,(c,u)=>(we(),Pe("p",{key:u,innerHTML:s(c)},null,8,KM))),128))]),l.media?(we(),Pe("div",ZM,[xt(Lr,{section:l},null,8,["section"])])):bt("",!0)])):l.layout==="image-bottom"?(we(),Pe("div",JM,[l.content&&l.content.length?(we(),Pe("div",QM,[(we(!0),Pe(mt,null,Gt(l.content,(c,u)=>(we(),Pe("p",{key:u,innerHTML:s(c)},null,8,eE))),128))])):bt("",!0),l.media?(we(),Pe("div",tE,[xt(Lr,{section:l},null,8,["section"])])):bt("",!0)])):l.layout==="sub-two-col"?(we(),Pe("div",nE,[(we(!0),Pe(mt,null,Gt(l.cols,(c,u)=>(we(),Pe("div",{class:"case-col",key:u},[Be("ul",null,[(we(!0),Pe(mt,null,Gt(c.content,(f,d)=>(we(),Pe("li",{key:d,innerHTML:s(f)},null,8,iE))),128))])]))),128))])):(we(),Pe("div",rE,[l.content&&l.content.length?(we(),Pe("div",sE,[(we(!0),Pe(mt,null,Gt(l.content,(c,u)=>(we(),Pe("p",{key:u,innerHTML:s(c)},null,8,oE))),128))])):bt("",!0),l.media?(we(),Pe("div",aE,[xt(Lr,{section:l},null,8,["section"])])):bt("",!0)])),l.subsections?(we(),Pe("div",lE,[(we(!0),Pe(mt,null,Gt(l.subsections,(c,u)=>(we(),Pe("div",{key:u,class:"case-subsection"},[c.title?(we(),Pe("h3",cE,Tt(c.title),1)):bt("",!0),c.layout==="sub-two-col"?(we(),Pe("div",uE,[(we(!0),Pe(mt,null,Gt(c.cols,(f,d)=>(we(),Pe("div",{class:"case-col",key:d},[Be("ul",null,[(we(!0),Pe(mt,null,Gt(f.content,(p,v)=>(we(),Pe("li",{key:v,innerHTML:s(p)},null,8,fE))),128))])]))),128))])):c.content&&c.content.length?(we(),Pe("div",dE,[Be("ul",null,[(we(!0),Pe(mt,null,Gt(c.content,(f,d)=>(we(),Pe("li",{key:d,innerHTML:s(f)},null,8,hE))),128))])])):bt("",!0),c.media?(we(),Pe("div",pE,[xt(Lr,{section:c},null,8,["section"])])):bt("",!0)]))),128))])):bt("",!0)])],8,HM))),128))])):bt("",!0)}},gE=Bi(mE,[["__scopeId","data-v-e49204b3"]]),_E={},vE={class:"contact container"};function xE(n,e){return we(),Pe("main",vE)}const yE=Bi(_E,[["render",xE]]),Fr="/images/about/About-Me.png",SE=Fr+" 400w, "+Fr+" 700w, "+Fr+" 1000w, "+Fr+" 1300w",ME={class:"main"},EE={__name:"About",setup(n){return(e,t)=>(we(),Pe("main",ME,[...t[0]||(t[0]=[no('<header class="container page-header" data-v-85b3c5c0><section class="contact__block" data-v-85b3c5c0><h1 class="contact__heading" data-v-85b3c5c0>Hi, this is Ruohan</h1><div class="contact__copy" data-v-85b3c5c0><p data-v-85b3c5c0> Hello and welcome! I&#39;m Ruohan (Kerry) Lu, a gameplay programmer currently pursuing a Master&#39;s degree in Game Design, Development &amp; Innovation at Duke University. </p><p data-v-85b3c5c0> I have nearly three years of experience in the game industry, having worked as a gameplay development intern at Giant Interactive, where I contributed to the game Night of the Full Moon. </p><p data-v-85b3c5c0> With around five years of game development experience, I am proficient in game engines like Unreal and Unity Engine, programming languages including C++, C#, and Lua, and DCC tools like Houdini, Maya, and Blender. I have worked on multiple game projects, both independently and in diverse teams, developing a deep passion for creating immersive gameplay experiences. </p><p data-v-85b3c5c0> I look forward to pushing the boundaries of interactive entertainment and crafting engaging games that bring joy to players worldwide! </p><p data-v-85b3c5c0> In leisure time, I enjoy running, cycling, badminton, and rock climbing. Feel free to look around and reach out. :) </p></div><div class="contact__media" data-v-85b3c5c0><div class="media media--image" data-v-85b3c5c0><img src="'+Fr+'" alt="Ruohan Lu Personal Photo." loading="lazy" style="max-width:500px;width:100%;height:auto;display:block;" srcset="'+SE+'" sizes="(max-width: 640px) 100vw, (max-width: 800px) 70vw, 40vw" data-v-85b3c5c0></div></div></section><section class="contact__intro" data-v-85b3c5c0><p data-v-85b3c5c0> Feel free to contact me about any opportunity, or just to chat about gamedev, coding, or anything else :) </p></section><section class="contact__cards" data-v-85b3c5c0><a href="mailto:ruohanlew@gmail.com" class="locations__link locations__link--email" data-v-85b3c5c0><span class="locations__label" data-v-85b3c5c0>ruohanlew@gmail.com</span></a><a href="tel:+19196728443" class="locations__link locations__link--phone" data-v-85b3c5c0><span class="locations__label" data-v-85b3c5c0>+1-919-672-8443</span></a><a href="https://linkedin.com/in/ruohan-lu" class="locations__link locations__link--linkedin" target="_blank" data-v-85b3c5c0><span class="locations__label" data-v-85b3c5c0>linkedin.com/in/ruohan-lu</span></a><a href="https://github.com/RuohanLu" class="locations__link locations__link--github" target="_blank" data-v-85b3c5c0><span class="locations__label" data-v-85b3c5c0>github.com/RuohanLu</span></a><a href="https://ruohanlu.github.io" class="locations__link locations__link--personal" target="_blank" data-v-85b3c5c0><span class="locations__label" data-v-85b3c5c0>ruohanlu.github.io</span></a></section></header>',1)])]))}},bE=Bi(EE,[["__scopeId","data-v-85b3c5c0"]]),TE=[{path:"/",component:eM},{path:"/projects",component:gM},{path:"/projects/:slug",component:gE,props:!0},{path:"/blog",component:yE},{path:"/about",component:bE},{path:"/projects/ferrous.html",redirect:"/projects/ferrous"},{path:"/projects.html",redirect:"/projects"},{path:"/sideprojects/studentchefmarket/",redirect:"/projects"},{path:"/:pathMatch(.*)*",redirect:"/"}],AE=zg({history:mg("/"),routes:TE,scrollBehavior(n,e,t){return t||{left:0,top:0}}}),Kd=xm(Bm);Kd.use(AE);Kd.mount("#app");

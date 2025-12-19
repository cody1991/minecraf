(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))n(i);new MutationObserver(i=>{for(const r of i)if(r.type==="childList")for(const o of r.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&n(o)}).observe(document,{childList:!0,subtree:!0});function e(i){const r={};return i.integrity&&(r.integrity=i.integrity),i.referrerPolicy&&(r.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?r.credentials="include":i.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function n(i){if(i.ep)return;i.ep=!0;const r=e(i);fetch(i.href,r)}})();/**
 * @license
 * Copyright 2010-2024 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const za="170",Ru=0,fl=1,Iu=2,_h=1,Du=2,Un=3,gn=0,Be=1,Ve=2,ii=0,ji=1,Ko=2,pl=3,ml=4,Pu=5,_i=100,Lu=101,Ou=102,Nu=103,ku=104,Uu=200,Fu=201,Bu=202,zu=203,Yo=204,qo=205,Gu=206,Hu=207,Wu=208,Vu=209,Xu=210,Ku=211,Yu=212,qu=213,$u=214,$o=0,Zo=1,jo=2,is=3,Jo=4,Qo=5,ta=6,ea=7,Ga=0,Zu=1,ju=2,si=0,Ju=1,Qu=2,td=3,ed=4,nd=5,id=6,sd=7,vh=300,ss=301,rs=302,na=303,ia=304,Xr=306,Ns=1e3,Si=1001,sa=1002,Je=1003,rd=1004,Xs=1005,En=1006,Jr=1007,Mi=1008,Wn=1009,Sh=1010,Mh=1011,ks=1012,Ha=1013,Ti=1014,Fn=1015,Fs=1016,Wa=1017,Va=1018,os=1020,xh=35902,Eh=1021,bh=1022,mn=1023,Th=1024,Ah=1025,Ji=1026,as=1027,Ch=1028,Xa=1029,wh=1030,Ka=1031,Ya=1033,Tr=33776,Ar=33777,Cr=33778,wr=33779,ra=35840,oa=35841,aa=35842,la=35843,ca=36196,ha=37492,ua=37496,da=37808,fa=37809,pa=37810,ma=37811,ga=37812,ya=37813,_a=37814,va=37815,Sa=37816,Ma=37817,xa=37818,Ea=37819,ba=37820,Ta=37821,Rr=36492,Aa=36494,Ca=36495,Rh=36283,wa=36284,Ra=36285,Ia=36286,od=3200,ad=3201,Ih=0,ld=1,Qn="",je="srgb",ds="srgb-linear",Kr="linear",re="srgb",Ri=7680,gl=519,cd=512,hd=513,ud=514,Dh=515,dd=516,fd=517,pd=518,md=519,yl=35044,_l="300 es",Bn=2e3,Or=2001;class fs{addEventListener(t,e){this._listeners===void 0&&(this._listeners={});const n=this._listeners;n[t]===void 0&&(n[t]=[]),n[t].indexOf(e)===-1&&n[t].push(e)}hasEventListener(t,e){if(this._listeners===void 0)return!1;const n=this._listeners;return n[t]!==void 0&&n[t].indexOf(e)!==-1}removeEventListener(t,e){if(this._listeners===void 0)return;const i=this._listeners[t];if(i!==void 0){const r=i.indexOf(e);r!==-1&&i.splice(r,1)}}dispatchEvent(t){if(this._listeners===void 0)return;const n=this._listeners[t.type];if(n!==void 0){t.target=this;const i=n.slice(0);for(let r=0,o=i.length;r<o;r++)i[r].call(this,t);t.target=null}}}const De=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"];let vl=1234567;const Qi=Math.PI/180,Us=180/Math.PI;function ps(){const s=Math.random()*4294967295|0,t=Math.random()*4294967295|0,e=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(De[s&255]+De[s>>8&255]+De[s>>16&255]+De[s>>24&255]+"-"+De[t&255]+De[t>>8&255]+"-"+De[t>>16&15|64]+De[t>>24&255]+"-"+De[e&63|128]+De[e>>8&255]+"-"+De[e>>16&255]+De[e>>24&255]+De[n&255]+De[n>>8&255]+De[n>>16&255]+De[n>>24&255]).toLowerCase()}function Fe(s,t,e){return Math.max(t,Math.min(e,s))}function qa(s,t){return(s%t+t)%t}function gd(s,t,e,n,i){return n+(s-t)*(i-n)/(e-t)}function yd(s,t,e){return s!==t?(e-s)/(t-s):0}function Ls(s,t,e){return(1-e)*s+e*t}function _d(s,t,e,n){return Ls(s,t,1-Math.exp(-e*n))}function vd(s,t=1){return t-Math.abs(qa(s,t*2)-t)}function Sd(s,t,e){return s<=t?0:s>=e?1:(s=(s-t)/(e-t),s*s*(3-2*s))}function Md(s,t,e){return s<=t?0:s>=e?1:(s=(s-t)/(e-t),s*s*s*(s*(s*6-15)+10))}function xd(s,t){return s+Math.floor(Math.random()*(t-s+1))}function Ed(s,t){return s+Math.random()*(t-s)}function bd(s){return s*(.5-Math.random())}function Td(s){s!==void 0&&(vl=s);let t=vl+=1831565813;return t=Math.imul(t^t>>>15,t|1),t^=t+Math.imul(t^t>>>7,t|61),((t^t>>>14)>>>0)/4294967296}function Ad(s){return s*Qi}function Cd(s){return s*Us}function wd(s){return(s&s-1)===0&&s!==0}function Rd(s){return Math.pow(2,Math.ceil(Math.log(s)/Math.LN2))}function Id(s){return Math.pow(2,Math.floor(Math.log(s)/Math.LN2))}function Dd(s,t,e,n,i){const r=Math.cos,o=Math.sin,a=r(e/2),l=o(e/2),c=r((t+n)/2),h=o((t+n)/2),u=r((t-n)/2),d=o((t-n)/2),f=r((n-t)/2),y=o((n-t)/2);switch(i){case"XYX":s.set(a*h,l*u,l*d,a*c);break;case"YZY":s.set(l*d,a*h,l*u,a*c);break;case"ZXZ":s.set(l*u,l*d,a*h,a*c);break;case"XZX":s.set(a*h,l*y,l*f,a*c);break;case"YXY":s.set(l*f,a*h,l*y,a*c);break;case"ZYZ":s.set(l*y,l*f,a*h,a*c);break;default:console.warn("THREE.MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+i)}}function Yi(s,t){switch(t.constructor){case Float32Array:return s;case Uint32Array:return s/4294967295;case Uint16Array:return s/65535;case Uint8Array:return s/255;case Int32Array:return Math.max(s/2147483647,-1);case Int16Array:return Math.max(s/32767,-1);case Int8Array:return Math.max(s/127,-1);default:throw new Error("Invalid component type.")}}function Ne(s,t){switch(t.constructor){case Float32Array:return s;case Uint32Array:return Math.round(s*4294967295);case Uint16Array:return Math.round(s*65535);case Uint8Array:return Math.round(s*255);case Int32Array:return Math.round(s*2147483647);case Int16Array:return Math.round(s*32767);case Int8Array:return Math.round(s*127);default:throw new Error("Invalid component type.")}}const Ii={DEG2RAD:Qi,RAD2DEG:Us,generateUUID:ps,clamp:Fe,euclideanModulo:qa,mapLinear:gd,inverseLerp:yd,lerp:Ls,damp:_d,pingpong:vd,smoothstep:Sd,smootherstep:Md,randInt:xd,randFloat:Ed,randFloatSpread:bd,seededRandom:Td,degToRad:Ad,radToDeg:Cd,isPowerOfTwo:wd,ceilPowerOfTwo:Rd,floorPowerOfTwo:Id,setQuaternionFromProperEuler:Dd,normalize:Ne,denormalize:Yi};class Qt{constructor(t=0,e=0){Qt.prototype.isVector2=!0,this.x=t,this.y=e}get width(){return this.x}set width(t){this.x=t}get height(){return this.y}set height(t){this.y=t}set(t,e){return this.x=t,this.y=e,this}setScalar(t){return this.x=t,this.y=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y)}copy(t){return this.x=t.x,this.y=t.y,this}add(t){return this.x+=t.x,this.y+=t.y,this}addScalar(t){return this.x+=t,this.y+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this}subScalar(t){return this.x-=t,this.y-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this}multiply(t){return this.x*=t.x,this.y*=t.y,this}multiplyScalar(t){return this.x*=t,this.y*=t,this}divide(t){return this.x/=t.x,this.y/=t.y,this}divideScalar(t){return this.multiplyScalar(1/t)}applyMatrix3(t){const e=this.x,n=this.y,i=t.elements;return this.x=i[0]*e+i[3]*n+i[6],this.y=i[1]*e+i[4]*n+i[7],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this}clampLength(t,e){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(t,Math.min(e,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(t){return this.x*t.x+this.y*t.y}cross(t){return this.x*t.y-this.y*t.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(t){const e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;const n=this.dot(t)/e;return Math.acos(Fe(n,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const e=this.x-t.x,n=this.y-t.y;return e*e+n*n}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this}equals(t){return t.x===this.x&&t.y===this.y}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this}rotateAround(t,e){const n=Math.cos(e),i=Math.sin(e),r=this.x-t.x,o=this.y-t.y;return this.x=r*n-o*i+t.x,this.y=r*i+o*n+t.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class Gt{constructor(t,e,n,i,r,o,a,l,c){Gt.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],t!==void 0&&this.set(t,e,n,i,r,o,a,l,c)}set(t,e,n,i,r,o,a,l,c){const h=this.elements;return h[0]=t,h[1]=i,h[2]=a,h[3]=e,h[4]=r,h[5]=l,h[6]=n,h[7]=o,h[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(t){const e=this.elements,n=t.elements;return e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=n[7],e[8]=n[8],this}extractBasis(t,e,n){return t.setFromMatrix3Column(this,0),e.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(t){const e=t.elements;return this.set(e[0],e[4],e[8],e[1],e[5],e[9],e[2],e[6],e[10]),this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){const n=t.elements,i=e.elements,r=this.elements,o=n[0],a=n[3],l=n[6],c=n[1],h=n[4],u=n[7],d=n[2],f=n[5],y=n[8],_=i[0],g=i[3],p=i[6],x=i[1],b=i[4],S=i[7],L=i[2],C=i[5],w=i[8];return r[0]=o*_+a*x+l*L,r[3]=o*g+a*b+l*C,r[6]=o*p+a*S+l*w,r[1]=c*_+h*x+u*L,r[4]=c*g+h*b+u*C,r[7]=c*p+h*S+u*w,r[2]=d*_+f*x+y*L,r[5]=d*g+f*b+y*C,r[8]=d*p+f*S+y*w,this}multiplyScalar(t){const e=this.elements;return e[0]*=t,e[3]*=t,e[6]*=t,e[1]*=t,e[4]*=t,e[7]*=t,e[2]*=t,e[5]*=t,e[8]*=t,this}determinant(){const t=this.elements,e=t[0],n=t[1],i=t[2],r=t[3],o=t[4],a=t[5],l=t[6],c=t[7],h=t[8];return e*o*h-e*a*c-n*r*h+n*a*l+i*r*c-i*o*l}invert(){const t=this.elements,e=t[0],n=t[1],i=t[2],r=t[3],o=t[4],a=t[5],l=t[6],c=t[7],h=t[8],u=h*o-a*c,d=a*l-h*r,f=c*r-o*l,y=e*u+n*d+i*f;if(y===0)return this.set(0,0,0,0,0,0,0,0,0);const _=1/y;return t[0]=u*_,t[1]=(i*c-h*n)*_,t[2]=(a*n-i*o)*_,t[3]=d*_,t[4]=(h*e-i*l)*_,t[5]=(i*r-a*e)*_,t[6]=f*_,t[7]=(n*l-c*e)*_,t[8]=(o*e-n*r)*_,this}transpose(){let t;const e=this.elements;return t=e[1],e[1]=e[3],e[3]=t,t=e[2],e[2]=e[6],e[6]=t,t=e[5],e[5]=e[7],e[7]=t,this}getNormalMatrix(t){return this.setFromMatrix4(t).invert().transpose()}transposeIntoArray(t){const e=this.elements;return t[0]=e[0],t[1]=e[3],t[2]=e[6],t[3]=e[1],t[4]=e[4],t[5]=e[7],t[6]=e[2],t[7]=e[5],t[8]=e[8],this}setUvTransform(t,e,n,i,r,o,a){const l=Math.cos(r),c=Math.sin(r);return this.set(n*l,n*c,-n*(l*o+c*a)+o+t,-i*c,i*l,-i*(-c*o+l*a)+a+e,0,0,1),this}scale(t,e){return this.premultiply(Qr.makeScale(t,e)),this}rotate(t){return this.premultiply(Qr.makeRotation(-t)),this}translate(t,e){return this.premultiply(Qr.makeTranslation(t,e)),this}makeTranslation(t,e){return t.isVector2?this.set(1,0,t.x,0,1,t.y,0,0,1):this.set(1,0,t,0,1,e,0,0,1),this}makeRotation(t){const e=Math.cos(t),n=Math.sin(t);return this.set(e,-n,0,n,e,0,0,0,1),this}makeScale(t,e){return this.set(t,0,0,0,e,0,0,0,1),this}equals(t){const e=this.elements,n=t.elements;for(let i=0;i<9;i++)if(e[i]!==n[i])return!1;return!0}fromArray(t,e=0){for(let n=0;n<9;n++)this.elements[n]=t[n+e];return this}toArray(t=[],e=0){const n=this.elements;return t[e]=n[0],t[e+1]=n[1],t[e+2]=n[2],t[e+3]=n[3],t[e+4]=n[4],t[e+5]=n[5],t[e+6]=n[6],t[e+7]=n[7],t[e+8]=n[8],t}clone(){return new this.constructor().fromArray(this.elements)}}const Qr=new Gt;function Ph(s){for(let t=s.length-1;t>=0;--t)if(s[t]>=65535)return!0;return!1}function Nr(s){return document.createElementNS("http://www.w3.org/1999/xhtml",s)}function Pd(){const s=Nr("canvas");return s.style.display="block",s}const Sl={};function Is(s){s in Sl||(Sl[s]=!0,console.warn(s))}function Ld(s,t,e){return new Promise(function(n,i){function r(){switch(s.clientWaitSync(t,s.SYNC_FLUSH_COMMANDS_BIT,0)){case s.WAIT_FAILED:i();break;case s.TIMEOUT_EXPIRED:setTimeout(r,e);break;default:n()}}setTimeout(r,e)})}function Od(s){const t=s.elements;t[2]=.5*t[2]+.5*t[3],t[6]=.5*t[6]+.5*t[7],t[10]=.5*t[10]+.5*t[11],t[14]=.5*t[14]+.5*t[15]}function Nd(s){const t=s.elements;t[11]===-1?(t[10]=-t[10]-1,t[14]=-t[14]):(t[10]=-t[10],t[14]=-t[14]+1)}const jt={enabled:!0,workingColorSpace:ds,spaces:{},convert:function(s,t,e){return this.enabled===!1||t===e||!t||!e||(this.spaces[t].transfer===re&&(s.r=Gn(s.r),s.g=Gn(s.g),s.b=Gn(s.b)),this.spaces[t].primaries!==this.spaces[e].primaries&&(s.applyMatrix3(this.spaces[t].toXYZ),s.applyMatrix3(this.spaces[e].fromXYZ)),this.spaces[e].transfer===re&&(s.r=ts(s.r),s.g=ts(s.g),s.b=ts(s.b))),s},fromWorkingColorSpace:function(s,t){return this.convert(s,this.workingColorSpace,t)},toWorkingColorSpace:function(s,t){return this.convert(s,t,this.workingColorSpace)},getPrimaries:function(s){return this.spaces[s].primaries},getTransfer:function(s){return s===Qn?Kr:this.spaces[s].transfer},getLuminanceCoefficients:function(s,t=this.workingColorSpace){return s.fromArray(this.spaces[t].luminanceCoefficients)},define:function(s){Object.assign(this.spaces,s)},_getMatrix:function(s,t,e){return s.copy(this.spaces[t].toXYZ).multiply(this.spaces[e].fromXYZ)},_getDrawingBufferColorSpace:function(s){return this.spaces[s].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(s=this.workingColorSpace){return this.spaces[s].workingColorSpaceConfig.unpackColorSpace}};function Gn(s){return s<.04045?s*.0773993808:Math.pow(s*.9478672986+.0521327014,2.4)}function ts(s){return s<.0031308?s*12.92:1.055*Math.pow(s,.41666)-.055}const Ml=[.64,.33,.3,.6,.15,.06],xl=[.2126,.7152,.0722],El=[.3127,.329],bl=new Gt().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),Tl=new Gt().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);jt.define({[ds]:{primaries:Ml,whitePoint:El,transfer:Kr,toXYZ:bl,fromXYZ:Tl,luminanceCoefficients:xl,workingColorSpaceConfig:{unpackColorSpace:je},outputColorSpaceConfig:{drawingBufferColorSpace:je}},[je]:{primaries:Ml,whitePoint:El,transfer:re,toXYZ:bl,fromXYZ:Tl,luminanceCoefficients:xl,outputColorSpaceConfig:{drawingBufferColorSpace:je}}});let Di;class kd{static getDataURL(t){if(/^data:/i.test(t.src)||typeof HTMLCanvasElement>"u")return t.src;let e;if(t instanceof HTMLCanvasElement)e=t;else{Di===void 0&&(Di=Nr("canvas")),Di.width=t.width,Di.height=t.height;const n=Di.getContext("2d");t instanceof ImageData?n.putImageData(t,0,0):n.drawImage(t,0,0,t.width,t.height),e=Di}return e.width>2048||e.height>2048?(console.warn("THREE.ImageUtils.getDataURL: Image converted to jpg for performance reasons",t),e.toDataURL("image/jpeg",.6)):e.toDataURL("image/png")}static sRGBToLinear(t){if(typeof HTMLImageElement<"u"&&t instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&t instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&t instanceof ImageBitmap){const e=Nr("canvas");e.width=t.width,e.height=t.height;const n=e.getContext("2d");n.drawImage(t,0,0,t.width,t.height);const i=n.getImageData(0,0,t.width,t.height),r=i.data;for(let o=0;o<r.length;o++)r[o]=Gn(r[o]/255)*255;return n.putImageData(i,0,0),e}else if(t.data){const e=t.data.slice(0);for(let n=0;n<e.length;n++)e instanceof Uint8Array||e instanceof Uint8ClampedArray?e[n]=Math.floor(Gn(e[n]/255)*255):e[n]=Gn(e[n]);return{data:e,width:t.width,height:t.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),t}}let Ud=0;class Lh{constructor(t=null){this.isSource=!0,Object.defineProperty(this,"id",{value:Ud++}),this.uuid=ps(),this.data=t,this.dataReady=!0,this.version=0}set needsUpdate(t){t===!0&&this.version++}toJSON(t){const e=t===void 0||typeof t=="string";if(!e&&t.images[this.uuid]!==void 0)return t.images[this.uuid];const n={uuid:this.uuid,url:""},i=this.data;if(i!==null){let r;if(Array.isArray(i)){r=[];for(let o=0,a=i.length;o<a;o++)i[o].isDataTexture?r.push(to(i[o].image)):r.push(to(i[o]))}else r=to(i);n.url=r}return e||(t.images[this.uuid]=n),n}}function to(s){return typeof HTMLImageElement<"u"&&s instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&s instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&s instanceof ImageBitmap?kd.getDataURL(s):s.data?{data:Array.from(s.data),width:s.width,height:s.height,type:s.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}let Fd=0;class ze extends fs{constructor(t=ze.DEFAULT_IMAGE,e=ze.DEFAULT_MAPPING,n=Si,i=Si,r=En,o=Mi,a=mn,l=Wn,c=ze.DEFAULT_ANISOTROPY,h=Qn){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:Fd++}),this.uuid=ps(),this.name="",this.source=new Lh(t),this.mipmaps=[],this.mapping=e,this.channel=0,this.wrapS=n,this.wrapT=i,this.magFilter=r,this.minFilter=o,this.anisotropy=c,this.format=a,this.internalFormat=null,this.type=l,this.offset=new Qt(0,0),this.repeat=new Qt(1,1),this.center=new Qt(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Gt,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=h,this.userData={},this.version=0,this.onUpdate=null,this.isRenderTargetTexture=!1,this.pmremVersion=0}get image(){return this.source.data}set image(t=null){this.source.data=t}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}clone(){return new this.constructor().copy(this)}copy(t){return this.name=t.name,this.source=t.source,this.mipmaps=t.mipmaps.slice(0),this.mapping=t.mapping,this.channel=t.channel,this.wrapS=t.wrapS,this.wrapT=t.wrapT,this.magFilter=t.magFilter,this.minFilter=t.minFilter,this.anisotropy=t.anisotropy,this.format=t.format,this.internalFormat=t.internalFormat,this.type=t.type,this.offset.copy(t.offset),this.repeat.copy(t.repeat),this.center.copy(t.center),this.rotation=t.rotation,this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrix.copy(t.matrix),this.generateMipmaps=t.generateMipmaps,this.premultiplyAlpha=t.premultiplyAlpha,this.flipY=t.flipY,this.unpackAlignment=t.unpackAlignment,this.colorSpace=t.colorSpace,this.userData=JSON.parse(JSON.stringify(t.userData)),this.needsUpdate=!0,this}toJSON(t){const e=t===void 0||typeof t=="string";if(!e&&t.textures[this.uuid]!==void 0)return t.textures[this.uuid];const n={metadata:{version:4.6,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(t).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),e||(t.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(t){if(this.mapping!==vh)return t;if(t.applyMatrix3(this.matrix),t.x<0||t.x>1)switch(this.wrapS){case Ns:t.x=t.x-Math.floor(t.x);break;case Si:t.x=t.x<0?0:1;break;case sa:Math.abs(Math.floor(t.x)%2)===1?t.x=Math.ceil(t.x)-t.x:t.x=t.x-Math.floor(t.x);break}if(t.y<0||t.y>1)switch(this.wrapT){case Ns:t.y=t.y-Math.floor(t.y);break;case Si:t.y=t.y<0?0:1;break;case sa:Math.abs(Math.floor(t.y)%2)===1?t.y=Math.ceil(t.y)-t.y:t.y=t.y-Math.floor(t.y);break}return this.flipY&&(t.y=1-t.y),t}set needsUpdate(t){t===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(t){t===!0&&this.pmremVersion++}}ze.DEFAULT_IMAGE=null;ze.DEFAULT_MAPPING=vh;ze.DEFAULT_ANISOTROPY=1;class oe{constructor(t=0,e=0,n=0,i=1){oe.prototype.isVector4=!0,this.x=t,this.y=e,this.z=n,this.w=i}get width(){return this.z}set width(t){this.z=t}get height(){return this.w}set height(t){this.w=t}set(t,e,n,i){return this.x=t,this.y=e,this.z=n,this.w=i,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this.w=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setW(t){return this.w=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;case 3:this.w=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this.w=t.w!==void 0?t.w:1,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this.w+=t.w,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this.w+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this.w=t.w+e.w,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this.w+=t.w*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this.w-=t.w,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this.w-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this.w=t.w-e.w,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this.w*=t.w,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this.w*=t,this}applyMatrix4(t){const e=this.x,n=this.y,i=this.z,r=this.w,o=t.elements;return this.x=o[0]*e+o[4]*n+o[8]*i+o[12]*r,this.y=o[1]*e+o[5]*n+o[9]*i+o[13]*r,this.z=o[2]*e+o[6]*n+o[10]*i+o[14]*r,this.w=o[3]*e+o[7]*n+o[11]*i+o[15]*r,this}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this.w/=t.w,this}divideScalar(t){return this.multiplyScalar(1/t)}setAxisAngleFromQuaternion(t){this.w=2*Math.acos(t.w);const e=Math.sqrt(1-t.w*t.w);return e<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=t.x/e,this.y=t.y/e,this.z=t.z/e),this}setAxisAngleFromRotationMatrix(t){let e,n,i,r;const l=t.elements,c=l[0],h=l[4],u=l[8],d=l[1],f=l[5],y=l[9],_=l[2],g=l[6],p=l[10];if(Math.abs(h-d)<.01&&Math.abs(u-_)<.01&&Math.abs(y-g)<.01){if(Math.abs(h+d)<.1&&Math.abs(u+_)<.1&&Math.abs(y+g)<.1&&Math.abs(c+f+p-3)<.1)return this.set(1,0,0,0),this;e=Math.PI;const b=(c+1)/2,S=(f+1)/2,L=(p+1)/2,C=(h+d)/4,w=(u+_)/4,P=(y+g)/4;return b>S&&b>L?b<.01?(n=0,i=.707106781,r=.707106781):(n=Math.sqrt(b),i=C/n,r=w/n):S>L?S<.01?(n=.707106781,i=0,r=.707106781):(i=Math.sqrt(S),n=C/i,r=P/i):L<.01?(n=.707106781,i=.707106781,r=0):(r=Math.sqrt(L),n=w/r,i=P/r),this.set(n,i,r,e),this}let x=Math.sqrt((g-y)*(g-y)+(u-_)*(u-_)+(d-h)*(d-h));return Math.abs(x)<.001&&(x=1),this.x=(g-y)/x,this.y=(u-_)/x,this.z=(d-h)/x,this.w=Math.acos((c+f+p-1)/2),this}setFromMatrixPosition(t){const e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this.w=e[15],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this.w=Math.min(this.w,t.w),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this.w=Math.max(this.w,t.w),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this.z=Math.max(t.z,Math.min(e.z,this.z)),this.w=Math.max(t.w,Math.min(e.w,this.w)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this.z=Math.max(t,Math.min(e,this.z)),this.w=Math.max(t,Math.min(e,this.w)),this}clampLength(t,e){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(t,Math.min(e,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z+this.w*t.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this.w+=(t.w-this.w)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this.z=t.z+(e.z-t.z)*n,this.w=t.w+(e.w-t.w)*n,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z&&t.w===this.w}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this.w=t[e+3],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t[e+3]=this.w,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this.w=t.getW(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class Bd extends fs{constructor(t=1,e=1,n={}){super(),this.isRenderTarget=!0,this.width=t,this.height=e,this.depth=1,this.scissor=new oe(0,0,t,e),this.scissorTest=!1,this.viewport=new oe(0,0,t,e);const i={width:t,height:e,depth:1};n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:En,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1},n);const r=new ze(i,n.mapping,n.wrapS,n.wrapT,n.magFilter,n.minFilter,n.format,n.type,n.anisotropy,n.colorSpace);r.flipY=!1,r.generateMipmaps=n.generateMipmaps,r.internalFormat=n.internalFormat,this.textures=[];const o=n.count;for(let a=0;a<o;a++)this.textures[a]=r.clone(),this.textures[a].isRenderTargetTexture=!0;this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this.depthTexture=n.depthTexture,this.samples=n.samples}get texture(){return this.textures[0]}set texture(t){this.textures[0]=t}setSize(t,e,n=1){if(this.width!==t||this.height!==e||this.depth!==n){this.width=t,this.height=e,this.depth=n;for(let i=0,r=this.textures.length;i<r;i++)this.textures[i].image.width=t,this.textures[i].image.height=e,this.textures[i].image.depth=n;this.dispose()}this.viewport.set(0,0,t,e),this.scissor.set(0,0,t,e)}clone(){return new this.constructor().copy(this)}copy(t){this.width=t.width,this.height=t.height,this.depth=t.depth,this.scissor.copy(t.scissor),this.scissorTest=t.scissorTest,this.viewport.copy(t.viewport),this.textures.length=0;for(let n=0,i=t.textures.length;n<i;n++)this.textures[n]=t.textures[n].clone(),this.textures[n].isRenderTargetTexture=!0;const e=Object.assign({},t.texture.image);return this.texture.source=new Lh(e),this.depthBuffer=t.depthBuffer,this.stencilBuffer=t.stencilBuffer,this.resolveDepthBuffer=t.resolveDepthBuffer,this.resolveStencilBuffer=t.resolveStencilBuffer,t.depthTexture!==null&&(this.depthTexture=t.depthTexture.clone()),this.samples=t.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class Ai extends Bd{constructor(t=1,e=1,n={}){super(t,e,n),this.isWebGLRenderTarget=!0}}class Oh extends ze{constructor(t=null,e=1,n=1,i=1){super(null),this.isDataArrayTexture=!0,this.image={data:t,width:e,height:n,depth:i},this.magFilter=Je,this.minFilter=Je,this.wrapR=Si,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(t){this.layerUpdates.add(t)}clearLayerUpdates(){this.layerUpdates.clear()}}class zd extends ze{constructor(t=null,e=1,n=1,i=1){super(null),this.isData3DTexture=!0,this.image={data:t,width:e,height:n,depth:i},this.magFilter=Je,this.minFilter=Je,this.wrapR=Si,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class Bs{constructor(t=0,e=0,n=0,i=1){this.isQuaternion=!0,this._x=t,this._y=e,this._z=n,this._w=i}static slerpFlat(t,e,n,i,r,o,a){let l=n[i+0],c=n[i+1],h=n[i+2],u=n[i+3];const d=r[o+0],f=r[o+1],y=r[o+2],_=r[o+3];if(a===0){t[e+0]=l,t[e+1]=c,t[e+2]=h,t[e+3]=u;return}if(a===1){t[e+0]=d,t[e+1]=f,t[e+2]=y,t[e+3]=_;return}if(u!==_||l!==d||c!==f||h!==y){let g=1-a;const p=l*d+c*f+h*y+u*_,x=p>=0?1:-1,b=1-p*p;if(b>Number.EPSILON){const L=Math.sqrt(b),C=Math.atan2(L,p*x);g=Math.sin(g*C)/L,a=Math.sin(a*C)/L}const S=a*x;if(l=l*g+d*S,c=c*g+f*S,h=h*g+y*S,u=u*g+_*S,g===1-a){const L=1/Math.sqrt(l*l+c*c+h*h+u*u);l*=L,c*=L,h*=L,u*=L}}t[e]=l,t[e+1]=c,t[e+2]=h,t[e+3]=u}static multiplyQuaternionsFlat(t,e,n,i,r,o){const a=n[i],l=n[i+1],c=n[i+2],h=n[i+3],u=r[o],d=r[o+1],f=r[o+2],y=r[o+3];return t[e]=a*y+h*u+l*f-c*d,t[e+1]=l*y+h*d+c*u-a*f,t[e+2]=c*y+h*f+a*d-l*u,t[e+3]=h*y-a*u-l*d-c*f,t}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get w(){return this._w}set w(t){this._w=t,this._onChangeCallback()}set(t,e,n,i){return this._x=t,this._y=e,this._z=n,this._w=i,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(t){return this._x=t.x,this._y=t.y,this._z=t.z,this._w=t.w,this._onChangeCallback(),this}setFromEuler(t,e=!0){const n=t._x,i=t._y,r=t._z,o=t._order,a=Math.cos,l=Math.sin,c=a(n/2),h=a(i/2),u=a(r/2),d=l(n/2),f=l(i/2),y=l(r/2);switch(o){case"XYZ":this._x=d*h*u+c*f*y,this._y=c*f*u-d*h*y,this._z=c*h*y+d*f*u,this._w=c*h*u-d*f*y;break;case"YXZ":this._x=d*h*u+c*f*y,this._y=c*f*u-d*h*y,this._z=c*h*y-d*f*u,this._w=c*h*u+d*f*y;break;case"ZXY":this._x=d*h*u-c*f*y,this._y=c*f*u+d*h*y,this._z=c*h*y+d*f*u,this._w=c*h*u-d*f*y;break;case"ZYX":this._x=d*h*u-c*f*y,this._y=c*f*u+d*h*y,this._z=c*h*y-d*f*u,this._w=c*h*u+d*f*y;break;case"YZX":this._x=d*h*u+c*f*y,this._y=c*f*u+d*h*y,this._z=c*h*y-d*f*u,this._w=c*h*u-d*f*y;break;case"XZY":this._x=d*h*u-c*f*y,this._y=c*f*u-d*h*y,this._z=c*h*y+d*f*u,this._w=c*h*u+d*f*y;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+o)}return e===!0&&this._onChangeCallback(),this}setFromAxisAngle(t,e){const n=e/2,i=Math.sin(n);return this._x=t.x*i,this._y=t.y*i,this._z=t.z*i,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(t){const e=t.elements,n=e[0],i=e[4],r=e[8],o=e[1],a=e[5],l=e[9],c=e[2],h=e[6],u=e[10],d=n+a+u;if(d>0){const f=.5/Math.sqrt(d+1);this._w=.25/f,this._x=(h-l)*f,this._y=(r-c)*f,this._z=(o-i)*f}else if(n>a&&n>u){const f=2*Math.sqrt(1+n-a-u);this._w=(h-l)/f,this._x=.25*f,this._y=(i+o)/f,this._z=(r+c)/f}else if(a>u){const f=2*Math.sqrt(1+a-n-u);this._w=(r-c)/f,this._x=(i+o)/f,this._y=.25*f,this._z=(l+h)/f}else{const f=2*Math.sqrt(1+u-n-a);this._w=(o-i)/f,this._x=(r+c)/f,this._y=(l+h)/f,this._z=.25*f}return this._onChangeCallback(),this}setFromUnitVectors(t,e){let n=t.dot(e)+1;return n<Number.EPSILON?(n=0,Math.abs(t.x)>Math.abs(t.z)?(this._x=-t.y,this._y=t.x,this._z=0,this._w=n):(this._x=0,this._y=-t.z,this._z=t.y,this._w=n)):(this._x=t.y*e.z-t.z*e.y,this._y=t.z*e.x-t.x*e.z,this._z=t.x*e.y-t.y*e.x,this._w=n),this.normalize()}angleTo(t){return 2*Math.acos(Math.abs(Fe(this.dot(t),-1,1)))}rotateTowards(t,e){const n=this.angleTo(t);if(n===0)return this;const i=Math.min(1,e/n);return this.slerp(t,i),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(t){return this._x*t._x+this._y*t._y+this._z*t._z+this._w*t._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let t=this.length();return t===0?(this._x=0,this._y=0,this._z=0,this._w=1):(t=1/t,this._x=this._x*t,this._y=this._y*t,this._z=this._z*t,this._w=this._w*t),this._onChangeCallback(),this}multiply(t){return this.multiplyQuaternions(this,t)}premultiply(t){return this.multiplyQuaternions(t,this)}multiplyQuaternions(t,e){const n=t._x,i=t._y,r=t._z,o=t._w,a=e._x,l=e._y,c=e._z,h=e._w;return this._x=n*h+o*a+i*c-r*l,this._y=i*h+o*l+r*a-n*c,this._z=r*h+o*c+n*l-i*a,this._w=o*h-n*a-i*l-r*c,this._onChangeCallback(),this}slerp(t,e){if(e===0)return this;if(e===1)return this.copy(t);const n=this._x,i=this._y,r=this._z,o=this._w;let a=o*t._w+n*t._x+i*t._y+r*t._z;if(a<0?(this._w=-t._w,this._x=-t._x,this._y=-t._y,this._z=-t._z,a=-a):this.copy(t),a>=1)return this._w=o,this._x=n,this._y=i,this._z=r,this;const l=1-a*a;if(l<=Number.EPSILON){const f=1-e;return this._w=f*o+e*this._w,this._x=f*n+e*this._x,this._y=f*i+e*this._y,this._z=f*r+e*this._z,this.normalize(),this}const c=Math.sqrt(l),h=Math.atan2(c,a),u=Math.sin((1-e)*h)/c,d=Math.sin(e*h)/c;return this._w=o*u+this._w*d,this._x=n*u+this._x*d,this._y=i*u+this._y*d,this._z=r*u+this._z*d,this._onChangeCallback(),this}slerpQuaternions(t,e,n){return this.copy(t).slerp(e,n)}random(){const t=2*Math.PI*Math.random(),e=2*Math.PI*Math.random(),n=Math.random(),i=Math.sqrt(1-n),r=Math.sqrt(n);return this.set(i*Math.sin(t),i*Math.cos(t),r*Math.sin(e),r*Math.cos(e))}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._w===this._w}fromArray(t,e=0){return this._x=t[e],this._y=t[e+1],this._z=t[e+2],this._w=t[e+3],this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._w,t}fromBufferAttribute(t,e){return this._x=t.getX(e),this._y=t.getY(e),this._z=t.getZ(e),this._w=t.getW(e),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class I{constructor(t=0,e=0,n=0){I.prototype.isVector3=!0,this.x=t,this.y=e,this.z=n}set(t,e,n){return n===void 0&&(n=this.z),this.x=t,this.y=e,this.z=n,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this}multiplyVectors(t,e){return this.x=t.x*e.x,this.y=t.y*e.y,this.z=t.z*e.z,this}applyEuler(t){return this.applyQuaternion(Al.setFromEuler(t))}applyAxisAngle(t,e){return this.applyQuaternion(Al.setFromAxisAngle(t,e))}applyMatrix3(t){const e=this.x,n=this.y,i=this.z,r=t.elements;return this.x=r[0]*e+r[3]*n+r[6]*i,this.y=r[1]*e+r[4]*n+r[7]*i,this.z=r[2]*e+r[5]*n+r[8]*i,this}applyNormalMatrix(t){return this.applyMatrix3(t).normalize()}applyMatrix4(t){const e=this.x,n=this.y,i=this.z,r=t.elements,o=1/(r[3]*e+r[7]*n+r[11]*i+r[15]);return this.x=(r[0]*e+r[4]*n+r[8]*i+r[12])*o,this.y=(r[1]*e+r[5]*n+r[9]*i+r[13])*o,this.z=(r[2]*e+r[6]*n+r[10]*i+r[14])*o,this}applyQuaternion(t){const e=this.x,n=this.y,i=this.z,r=t.x,o=t.y,a=t.z,l=t.w,c=2*(o*i-a*n),h=2*(a*e-r*i),u=2*(r*n-o*e);return this.x=e+l*c+o*u-a*h,this.y=n+l*h+a*c-r*u,this.z=i+l*u+r*h-o*c,this}project(t){return this.applyMatrix4(t.matrixWorldInverse).applyMatrix4(t.projectionMatrix)}unproject(t){return this.applyMatrix4(t.projectionMatrixInverse).applyMatrix4(t.matrixWorld)}transformDirection(t){const e=this.x,n=this.y,i=this.z,r=t.elements;return this.x=r[0]*e+r[4]*n+r[8]*i,this.y=r[1]*e+r[5]*n+r[9]*i,this.z=r[2]*e+r[6]*n+r[10]*i,this.normalize()}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this}divideScalar(t){return this.multiplyScalar(1/t)}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this.z=Math.max(t.z,Math.min(e.z,this.z)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this.z=Math.max(t,Math.min(e,this.z)),this}clampLength(t,e){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(t,Math.min(e,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this.z=t.z+(e.z-t.z)*n,this}cross(t){return this.crossVectors(this,t)}crossVectors(t,e){const n=t.x,i=t.y,r=t.z,o=e.x,a=e.y,l=e.z;return this.x=i*l-r*a,this.y=r*o-n*l,this.z=n*a-i*o,this}projectOnVector(t){const e=t.lengthSq();if(e===0)return this.set(0,0,0);const n=t.dot(this)/e;return this.copy(t).multiplyScalar(n)}projectOnPlane(t){return eo.copy(this).projectOnVector(t),this.sub(eo)}reflect(t){return this.sub(eo.copy(t).multiplyScalar(2*this.dot(t)))}angleTo(t){const e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;const n=this.dot(t)/e;return Math.acos(Fe(n,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const e=this.x-t.x,n=this.y-t.y,i=this.z-t.z;return e*e+n*n+i*i}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)+Math.abs(this.z-t.z)}setFromSpherical(t){return this.setFromSphericalCoords(t.radius,t.phi,t.theta)}setFromSphericalCoords(t,e,n){const i=Math.sin(e)*t;return this.x=i*Math.sin(n),this.y=Math.cos(e)*t,this.z=i*Math.cos(n),this}setFromCylindrical(t){return this.setFromCylindricalCoords(t.radius,t.theta,t.y)}setFromCylindricalCoords(t,e,n){return this.x=t*Math.sin(e),this.y=n,this.z=t*Math.cos(e),this}setFromMatrixPosition(t){const e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this}setFromMatrixScale(t){const e=this.setFromMatrixColumn(t,0).length(),n=this.setFromMatrixColumn(t,1).length(),i=this.setFromMatrixColumn(t,2).length();return this.x=e,this.y=n,this.z=i,this}setFromMatrixColumn(t,e){return this.fromArray(t.elements,e*4)}setFromMatrix3Column(t,e){return this.fromArray(t.elements,e*3)}setFromEuler(t){return this.x=t._x,this.y=t._y,this.z=t._z,this}setFromColor(t){return this.x=t.r,this.y=t.g,this.z=t.b,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const t=Math.random()*Math.PI*2,e=Math.random()*2-1,n=Math.sqrt(1-e*e);return this.x=n*Math.cos(t),this.y=e,this.z=n*Math.sin(t),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const eo=new I,Al=new Bs;class oi{constructor(t=new I(1/0,1/0,1/0),e=new I(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=t,this.max=e}set(t,e){return this.min.copy(t),this.max.copy(e),this}setFromArray(t){this.makeEmpty();for(let e=0,n=t.length;e<n;e+=3)this.expandByPoint(un.fromArray(t,e));return this}setFromBufferAttribute(t){this.makeEmpty();for(let e=0,n=t.count;e<n;e++)this.expandByPoint(un.fromBufferAttribute(t,e));return this}setFromPoints(t){this.makeEmpty();for(let e=0,n=t.length;e<n;e++)this.expandByPoint(t[e]);return this}setFromCenterAndSize(t,e){const n=un.copy(e).multiplyScalar(.5);return this.min.copy(t).sub(n),this.max.copy(t).add(n),this}setFromObject(t,e=!1){return this.makeEmpty(),this.expandByObject(t,e)}clone(){return new this.constructor().copy(this)}copy(t){return this.min.copy(t.min),this.max.copy(t.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(t){return this.isEmpty()?t.set(0,0,0):t.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(t){return this.isEmpty()?t.set(0,0,0):t.subVectors(this.max,this.min)}expandByPoint(t){return this.min.min(t),this.max.max(t),this}expandByVector(t){return this.min.sub(t),this.max.add(t),this}expandByScalar(t){return this.min.addScalar(-t),this.max.addScalar(t),this}expandByObject(t,e=!1){t.updateWorldMatrix(!1,!1);const n=t.geometry;if(n!==void 0){const r=n.getAttribute("position");if(e===!0&&r!==void 0&&t.isInstancedMesh!==!0)for(let o=0,a=r.count;o<a;o++)t.isMesh===!0?t.getVertexPosition(o,un):un.fromBufferAttribute(r,o),un.applyMatrix4(t.matrixWorld),this.expandByPoint(un);else t.boundingBox!==void 0?(t.boundingBox===null&&t.computeBoundingBox(),Ks.copy(t.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),Ks.copy(n.boundingBox)),Ks.applyMatrix4(t.matrixWorld),this.union(Ks)}const i=t.children;for(let r=0,o=i.length;r<o;r++)this.expandByObject(i[r],e);return this}containsPoint(t){return t.x>=this.min.x&&t.x<=this.max.x&&t.y>=this.min.y&&t.y<=this.max.y&&t.z>=this.min.z&&t.z<=this.max.z}containsBox(t){return this.min.x<=t.min.x&&t.max.x<=this.max.x&&this.min.y<=t.min.y&&t.max.y<=this.max.y&&this.min.z<=t.min.z&&t.max.z<=this.max.z}getParameter(t,e){return e.set((t.x-this.min.x)/(this.max.x-this.min.x),(t.y-this.min.y)/(this.max.y-this.min.y),(t.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(t){return t.max.x>=this.min.x&&t.min.x<=this.max.x&&t.max.y>=this.min.y&&t.min.y<=this.max.y&&t.max.z>=this.min.z&&t.min.z<=this.max.z}intersectsSphere(t){return this.clampPoint(t.center,un),un.distanceToSquared(t.center)<=t.radius*t.radius}intersectsPlane(t){let e,n;return t.normal.x>0?(e=t.normal.x*this.min.x,n=t.normal.x*this.max.x):(e=t.normal.x*this.max.x,n=t.normal.x*this.min.x),t.normal.y>0?(e+=t.normal.y*this.min.y,n+=t.normal.y*this.max.y):(e+=t.normal.y*this.max.y,n+=t.normal.y*this.min.y),t.normal.z>0?(e+=t.normal.z*this.min.z,n+=t.normal.z*this.max.z):(e+=t.normal.z*this.max.z,n+=t.normal.z*this.min.z),e<=-t.constant&&n>=-t.constant}intersectsTriangle(t){if(this.isEmpty())return!1;this.getCenter(_s),Ys.subVectors(this.max,_s),Pi.subVectors(t.a,_s),Li.subVectors(t.b,_s),Oi.subVectors(t.c,_s),Kn.subVectors(Li,Pi),Yn.subVectors(Oi,Li),li.subVectors(Pi,Oi);let e=[0,-Kn.z,Kn.y,0,-Yn.z,Yn.y,0,-li.z,li.y,Kn.z,0,-Kn.x,Yn.z,0,-Yn.x,li.z,0,-li.x,-Kn.y,Kn.x,0,-Yn.y,Yn.x,0,-li.y,li.x,0];return!no(e,Pi,Li,Oi,Ys)||(e=[1,0,0,0,1,0,0,0,1],!no(e,Pi,Li,Oi,Ys))?!1:(qs.crossVectors(Kn,Yn),e=[qs.x,qs.y,qs.z],no(e,Pi,Li,Oi,Ys))}clampPoint(t,e){return e.copy(t).clamp(this.min,this.max)}distanceToPoint(t){return this.clampPoint(t,un).distanceTo(t)}getBoundingSphere(t){return this.isEmpty()?t.makeEmpty():(this.getCenter(t.center),t.radius=this.getSize(un).length()*.5),t}intersect(t){return this.min.max(t.min),this.max.min(t.max),this.isEmpty()&&this.makeEmpty(),this}union(t){return this.min.min(t.min),this.max.max(t.max),this}applyMatrix4(t){return this.isEmpty()?this:(Pn[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(t),Pn[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(t),Pn[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(t),Pn[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(t),Pn[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(t),Pn[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(t),Pn[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(t),Pn[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(t),this.setFromPoints(Pn),this)}translate(t){return this.min.add(t),this.max.add(t),this}equals(t){return t.min.equals(this.min)&&t.max.equals(this.max)}}const Pn=[new I,new I,new I,new I,new I,new I,new I,new I],un=new I,Ks=new oi,Pi=new I,Li=new I,Oi=new I,Kn=new I,Yn=new I,li=new I,_s=new I,Ys=new I,qs=new I,ci=new I;function no(s,t,e,n,i){for(let r=0,o=s.length-3;r<=o;r+=3){ci.fromArray(s,r);const a=i.x*Math.abs(ci.x)+i.y*Math.abs(ci.y)+i.z*Math.abs(ci.z),l=t.dot(ci),c=e.dot(ci),h=n.dot(ci);if(Math.max(-Math.max(l,c,h),Math.min(l,c,h))>a)return!1}return!0}const Gd=new oi,vs=new I,io=new I;class zs{constructor(t=new I,e=-1){this.isSphere=!0,this.center=t,this.radius=e}set(t,e){return this.center.copy(t),this.radius=e,this}setFromPoints(t,e){const n=this.center;e!==void 0?n.copy(e):Gd.setFromPoints(t).getCenter(n);let i=0;for(let r=0,o=t.length;r<o;r++)i=Math.max(i,n.distanceToSquared(t[r]));return this.radius=Math.sqrt(i),this}copy(t){return this.center.copy(t.center),this.radius=t.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(t){return t.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(t){return t.distanceTo(this.center)-this.radius}intersectsSphere(t){const e=this.radius+t.radius;return t.center.distanceToSquared(this.center)<=e*e}intersectsBox(t){return t.intersectsSphere(this)}intersectsPlane(t){return Math.abs(t.distanceToPoint(this.center))<=this.radius}clampPoint(t,e){const n=this.center.distanceToSquared(t);return e.copy(t),n>this.radius*this.radius&&(e.sub(this.center).normalize(),e.multiplyScalar(this.radius).add(this.center)),e}getBoundingBox(t){return this.isEmpty()?(t.makeEmpty(),t):(t.set(this.center,this.center),t.expandByScalar(this.radius),t)}applyMatrix4(t){return this.center.applyMatrix4(t),this.radius=this.radius*t.getMaxScaleOnAxis(),this}translate(t){return this.center.add(t),this}expandByPoint(t){if(this.isEmpty())return this.center.copy(t),this.radius=0,this;vs.subVectors(t,this.center);const e=vs.lengthSq();if(e>this.radius*this.radius){const n=Math.sqrt(e),i=(n-this.radius)*.5;this.center.addScaledVector(vs,i/n),this.radius+=i}return this}union(t){return t.isEmpty()?this:this.isEmpty()?(this.copy(t),this):(this.center.equals(t.center)===!0?this.radius=Math.max(this.radius,t.radius):(io.subVectors(t.center,this.center).setLength(t.radius),this.expandByPoint(vs.copy(t.center).add(io)),this.expandByPoint(vs.copy(t.center).sub(io))),this)}equals(t){return t.center.equals(this.center)&&t.radius===this.radius}clone(){return new this.constructor().copy(this)}}const Ln=new I,so=new I,$s=new I,qn=new I,ro=new I,Zs=new I,oo=new I;class Yr{constructor(t=new I,e=new I(0,0,-1)){this.origin=t,this.direction=e}set(t,e){return this.origin.copy(t),this.direction.copy(e),this}copy(t){return this.origin.copy(t.origin),this.direction.copy(t.direction),this}at(t,e){return e.copy(this.origin).addScaledVector(this.direction,t)}lookAt(t){return this.direction.copy(t).sub(this.origin).normalize(),this}recast(t){return this.origin.copy(this.at(t,Ln)),this}closestPointToPoint(t,e){e.subVectors(t,this.origin);const n=e.dot(this.direction);return n<0?e.copy(this.origin):e.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(t){return Math.sqrt(this.distanceSqToPoint(t))}distanceSqToPoint(t){const e=Ln.subVectors(t,this.origin).dot(this.direction);return e<0?this.origin.distanceToSquared(t):(Ln.copy(this.origin).addScaledVector(this.direction,e),Ln.distanceToSquared(t))}distanceSqToSegment(t,e,n,i){so.copy(t).add(e).multiplyScalar(.5),$s.copy(e).sub(t).normalize(),qn.copy(this.origin).sub(so);const r=t.distanceTo(e)*.5,o=-this.direction.dot($s),a=qn.dot(this.direction),l=-qn.dot($s),c=qn.lengthSq(),h=Math.abs(1-o*o);let u,d,f,y;if(h>0)if(u=o*l-a,d=o*a-l,y=r*h,u>=0)if(d>=-y)if(d<=y){const _=1/h;u*=_,d*=_,f=u*(u+o*d+2*a)+d*(o*u+d+2*l)+c}else d=r,u=Math.max(0,-(o*d+a)),f=-u*u+d*(d+2*l)+c;else d=-r,u=Math.max(0,-(o*d+a)),f=-u*u+d*(d+2*l)+c;else d<=-y?(u=Math.max(0,-(-o*r+a)),d=u>0?-r:Math.min(Math.max(-r,-l),r),f=-u*u+d*(d+2*l)+c):d<=y?(u=0,d=Math.min(Math.max(-r,-l),r),f=d*(d+2*l)+c):(u=Math.max(0,-(o*r+a)),d=u>0?r:Math.min(Math.max(-r,-l),r),f=-u*u+d*(d+2*l)+c);else d=o>0?-r:r,u=Math.max(0,-(o*d+a)),f=-u*u+d*(d+2*l)+c;return n&&n.copy(this.origin).addScaledVector(this.direction,u),i&&i.copy(so).addScaledVector($s,d),f}intersectSphere(t,e){Ln.subVectors(t.center,this.origin);const n=Ln.dot(this.direction),i=Ln.dot(Ln)-n*n,r=t.radius*t.radius;if(i>r)return null;const o=Math.sqrt(r-i),a=n-o,l=n+o;return l<0?null:a<0?this.at(l,e):this.at(a,e)}intersectsSphere(t){return this.distanceSqToPoint(t.center)<=t.radius*t.radius}distanceToPlane(t){const e=t.normal.dot(this.direction);if(e===0)return t.distanceToPoint(this.origin)===0?0:null;const n=-(this.origin.dot(t.normal)+t.constant)/e;return n>=0?n:null}intersectPlane(t,e){const n=this.distanceToPlane(t);return n===null?null:this.at(n,e)}intersectsPlane(t){const e=t.distanceToPoint(this.origin);return e===0||t.normal.dot(this.direction)*e<0}intersectBox(t,e){let n,i,r,o,a,l;const c=1/this.direction.x,h=1/this.direction.y,u=1/this.direction.z,d=this.origin;return c>=0?(n=(t.min.x-d.x)*c,i=(t.max.x-d.x)*c):(n=(t.max.x-d.x)*c,i=(t.min.x-d.x)*c),h>=0?(r=(t.min.y-d.y)*h,o=(t.max.y-d.y)*h):(r=(t.max.y-d.y)*h,o=(t.min.y-d.y)*h),n>o||r>i||((r>n||isNaN(n))&&(n=r),(o<i||isNaN(i))&&(i=o),u>=0?(a=(t.min.z-d.z)*u,l=(t.max.z-d.z)*u):(a=(t.max.z-d.z)*u,l=(t.min.z-d.z)*u),n>l||a>i)||((a>n||n!==n)&&(n=a),(l<i||i!==i)&&(i=l),i<0)?null:this.at(n>=0?n:i,e)}intersectsBox(t){return this.intersectBox(t,Ln)!==null}intersectTriangle(t,e,n,i,r){ro.subVectors(e,t),Zs.subVectors(n,t),oo.crossVectors(ro,Zs);let o=this.direction.dot(oo),a;if(o>0){if(i)return null;a=1}else if(o<0)a=-1,o=-o;else return null;qn.subVectors(this.origin,t);const l=a*this.direction.dot(Zs.crossVectors(qn,Zs));if(l<0)return null;const c=a*this.direction.dot(ro.cross(qn));if(c<0||l+c>o)return null;const h=-a*qn.dot(oo);return h<0?null:this.at(h/o,r)}applyMatrix4(t){return this.origin.applyMatrix4(t),this.direction.transformDirection(t),this}equals(t){return t.origin.equals(this.origin)&&t.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class le{constructor(t,e,n,i,r,o,a,l,c,h,u,d,f,y,_,g){le.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],t!==void 0&&this.set(t,e,n,i,r,o,a,l,c,h,u,d,f,y,_,g)}set(t,e,n,i,r,o,a,l,c,h,u,d,f,y,_,g){const p=this.elements;return p[0]=t,p[4]=e,p[8]=n,p[12]=i,p[1]=r,p[5]=o,p[9]=a,p[13]=l,p[2]=c,p[6]=h,p[10]=u,p[14]=d,p[3]=f,p[7]=y,p[11]=_,p[15]=g,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new le().fromArray(this.elements)}copy(t){const e=this.elements,n=t.elements;return e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=n[7],e[8]=n[8],e[9]=n[9],e[10]=n[10],e[11]=n[11],e[12]=n[12],e[13]=n[13],e[14]=n[14],e[15]=n[15],this}copyPosition(t){const e=this.elements,n=t.elements;return e[12]=n[12],e[13]=n[13],e[14]=n[14],this}setFromMatrix3(t){const e=t.elements;return this.set(e[0],e[3],e[6],0,e[1],e[4],e[7],0,e[2],e[5],e[8],0,0,0,0,1),this}extractBasis(t,e,n){return t.setFromMatrixColumn(this,0),e.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this}makeBasis(t,e,n){return this.set(t.x,e.x,n.x,0,t.y,e.y,n.y,0,t.z,e.z,n.z,0,0,0,0,1),this}extractRotation(t){const e=this.elements,n=t.elements,i=1/Ni.setFromMatrixColumn(t,0).length(),r=1/Ni.setFromMatrixColumn(t,1).length(),o=1/Ni.setFromMatrixColumn(t,2).length();return e[0]=n[0]*i,e[1]=n[1]*i,e[2]=n[2]*i,e[3]=0,e[4]=n[4]*r,e[5]=n[5]*r,e[6]=n[6]*r,e[7]=0,e[8]=n[8]*o,e[9]=n[9]*o,e[10]=n[10]*o,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromEuler(t){const e=this.elements,n=t.x,i=t.y,r=t.z,o=Math.cos(n),a=Math.sin(n),l=Math.cos(i),c=Math.sin(i),h=Math.cos(r),u=Math.sin(r);if(t.order==="XYZ"){const d=o*h,f=o*u,y=a*h,_=a*u;e[0]=l*h,e[4]=-l*u,e[8]=c,e[1]=f+y*c,e[5]=d-_*c,e[9]=-a*l,e[2]=_-d*c,e[6]=y+f*c,e[10]=o*l}else if(t.order==="YXZ"){const d=l*h,f=l*u,y=c*h,_=c*u;e[0]=d+_*a,e[4]=y*a-f,e[8]=o*c,e[1]=o*u,e[5]=o*h,e[9]=-a,e[2]=f*a-y,e[6]=_+d*a,e[10]=o*l}else if(t.order==="ZXY"){const d=l*h,f=l*u,y=c*h,_=c*u;e[0]=d-_*a,e[4]=-o*u,e[8]=y+f*a,e[1]=f+y*a,e[5]=o*h,e[9]=_-d*a,e[2]=-o*c,e[6]=a,e[10]=o*l}else if(t.order==="ZYX"){const d=o*h,f=o*u,y=a*h,_=a*u;e[0]=l*h,e[4]=y*c-f,e[8]=d*c+_,e[1]=l*u,e[5]=_*c+d,e[9]=f*c-y,e[2]=-c,e[6]=a*l,e[10]=o*l}else if(t.order==="YZX"){const d=o*l,f=o*c,y=a*l,_=a*c;e[0]=l*h,e[4]=_-d*u,e[8]=y*u+f,e[1]=u,e[5]=o*h,e[9]=-a*h,e[2]=-c*h,e[6]=f*u+y,e[10]=d-_*u}else if(t.order==="XZY"){const d=o*l,f=o*c,y=a*l,_=a*c;e[0]=l*h,e[4]=-u,e[8]=c*h,e[1]=d*u+_,e[5]=o*h,e[9]=f*u-y,e[2]=y*u-f,e[6]=a*h,e[10]=_*u+d}return e[3]=0,e[7]=0,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromQuaternion(t){return this.compose(Hd,t,Wd)}lookAt(t,e,n){const i=this.elements;return qe.subVectors(t,e),qe.lengthSq()===0&&(qe.z=1),qe.normalize(),$n.crossVectors(n,qe),$n.lengthSq()===0&&(Math.abs(n.z)===1?qe.x+=1e-4:qe.z+=1e-4,qe.normalize(),$n.crossVectors(n,qe)),$n.normalize(),js.crossVectors(qe,$n),i[0]=$n.x,i[4]=js.x,i[8]=qe.x,i[1]=$n.y,i[5]=js.y,i[9]=qe.y,i[2]=$n.z,i[6]=js.z,i[10]=qe.z,this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){const n=t.elements,i=e.elements,r=this.elements,o=n[0],a=n[4],l=n[8],c=n[12],h=n[1],u=n[5],d=n[9],f=n[13],y=n[2],_=n[6],g=n[10],p=n[14],x=n[3],b=n[7],S=n[11],L=n[15],C=i[0],w=i[4],P=i[8],T=i[12],E=i[1],D=i[5],H=i[9],B=i[13],K=i[2],Z=i[6],q=i[10],Q=i[14],W=i[3],rt=i[7],ht=i[11],yt=i[15];return r[0]=o*C+a*E+l*K+c*W,r[4]=o*w+a*D+l*Z+c*rt,r[8]=o*P+a*H+l*q+c*ht,r[12]=o*T+a*B+l*Q+c*yt,r[1]=h*C+u*E+d*K+f*W,r[5]=h*w+u*D+d*Z+f*rt,r[9]=h*P+u*H+d*q+f*ht,r[13]=h*T+u*B+d*Q+f*yt,r[2]=y*C+_*E+g*K+p*W,r[6]=y*w+_*D+g*Z+p*rt,r[10]=y*P+_*H+g*q+p*ht,r[14]=y*T+_*B+g*Q+p*yt,r[3]=x*C+b*E+S*K+L*W,r[7]=x*w+b*D+S*Z+L*rt,r[11]=x*P+b*H+S*q+L*ht,r[15]=x*T+b*B+S*Q+L*yt,this}multiplyScalar(t){const e=this.elements;return e[0]*=t,e[4]*=t,e[8]*=t,e[12]*=t,e[1]*=t,e[5]*=t,e[9]*=t,e[13]*=t,e[2]*=t,e[6]*=t,e[10]*=t,e[14]*=t,e[3]*=t,e[7]*=t,e[11]*=t,e[15]*=t,this}determinant(){const t=this.elements,e=t[0],n=t[4],i=t[8],r=t[12],o=t[1],a=t[5],l=t[9],c=t[13],h=t[2],u=t[6],d=t[10],f=t[14],y=t[3],_=t[7],g=t[11],p=t[15];return y*(+r*l*u-i*c*u-r*a*d+n*c*d+i*a*f-n*l*f)+_*(+e*l*f-e*c*d+r*o*d-i*o*f+i*c*h-r*l*h)+g*(+e*c*u-e*a*f-r*o*u+n*o*f+r*a*h-n*c*h)+p*(-i*a*h-e*l*u+e*a*d+i*o*u-n*o*d+n*l*h)}transpose(){const t=this.elements;let e;return e=t[1],t[1]=t[4],t[4]=e,e=t[2],t[2]=t[8],t[8]=e,e=t[6],t[6]=t[9],t[9]=e,e=t[3],t[3]=t[12],t[12]=e,e=t[7],t[7]=t[13],t[13]=e,e=t[11],t[11]=t[14],t[14]=e,this}setPosition(t,e,n){const i=this.elements;return t.isVector3?(i[12]=t.x,i[13]=t.y,i[14]=t.z):(i[12]=t,i[13]=e,i[14]=n),this}invert(){const t=this.elements,e=t[0],n=t[1],i=t[2],r=t[3],o=t[4],a=t[5],l=t[6],c=t[7],h=t[8],u=t[9],d=t[10],f=t[11],y=t[12],_=t[13],g=t[14],p=t[15],x=u*g*c-_*d*c+_*l*f-a*g*f-u*l*p+a*d*p,b=y*d*c-h*g*c-y*l*f+o*g*f+h*l*p-o*d*p,S=h*_*c-y*u*c+y*a*f-o*_*f-h*a*p+o*u*p,L=y*u*l-h*_*l-y*a*d+o*_*d+h*a*g-o*u*g,C=e*x+n*b+i*S+r*L;if(C===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const w=1/C;return t[0]=x*w,t[1]=(_*d*r-u*g*r-_*i*f+n*g*f+u*i*p-n*d*p)*w,t[2]=(a*g*r-_*l*r+_*i*c-n*g*c-a*i*p+n*l*p)*w,t[3]=(u*l*r-a*d*r-u*i*c+n*d*c+a*i*f-n*l*f)*w,t[4]=b*w,t[5]=(h*g*r-y*d*r+y*i*f-e*g*f-h*i*p+e*d*p)*w,t[6]=(y*l*r-o*g*r-y*i*c+e*g*c+o*i*p-e*l*p)*w,t[7]=(o*d*r-h*l*r+h*i*c-e*d*c-o*i*f+e*l*f)*w,t[8]=S*w,t[9]=(y*u*r-h*_*r-y*n*f+e*_*f+h*n*p-e*u*p)*w,t[10]=(o*_*r-y*a*r+y*n*c-e*_*c-o*n*p+e*a*p)*w,t[11]=(h*a*r-o*u*r-h*n*c+e*u*c+o*n*f-e*a*f)*w,t[12]=L*w,t[13]=(h*_*i-y*u*i+y*n*d-e*_*d-h*n*g+e*u*g)*w,t[14]=(y*a*i-o*_*i-y*n*l+e*_*l+o*n*g-e*a*g)*w,t[15]=(o*u*i-h*a*i+h*n*l-e*u*l-o*n*d+e*a*d)*w,this}scale(t){const e=this.elements,n=t.x,i=t.y,r=t.z;return e[0]*=n,e[4]*=i,e[8]*=r,e[1]*=n,e[5]*=i,e[9]*=r,e[2]*=n,e[6]*=i,e[10]*=r,e[3]*=n,e[7]*=i,e[11]*=r,this}getMaxScaleOnAxis(){const t=this.elements,e=t[0]*t[0]+t[1]*t[1]+t[2]*t[2],n=t[4]*t[4]+t[5]*t[5]+t[6]*t[6],i=t[8]*t[8]+t[9]*t[9]+t[10]*t[10];return Math.sqrt(Math.max(e,n,i))}makeTranslation(t,e,n){return t.isVector3?this.set(1,0,0,t.x,0,1,0,t.y,0,0,1,t.z,0,0,0,1):this.set(1,0,0,t,0,1,0,e,0,0,1,n,0,0,0,1),this}makeRotationX(t){const e=Math.cos(t),n=Math.sin(t);return this.set(1,0,0,0,0,e,-n,0,0,n,e,0,0,0,0,1),this}makeRotationY(t){const e=Math.cos(t),n=Math.sin(t);return this.set(e,0,n,0,0,1,0,0,-n,0,e,0,0,0,0,1),this}makeRotationZ(t){const e=Math.cos(t),n=Math.sin(t);return this.set(e,-n,0,0,n,e,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(t,e){const n=Math.cos(e),i=Math.sin(e),r=1-n,o=t.x,a=t.y,l=t.z,c=r*o,h=r*a;return this.set(c*o+n,c*a-i*l,c*l+i*a,0,c*a+i*l,h*a+n,h*l-i*o,0,c*l-i*a,h*l+i*o,r*l*l+n,0,0,0,0,1),this}makeScale(t,e,n){return this.set(t,0,0,0,0,e,0,0,0,0,n,0,0,0,0,1),this}makeShear(t,e,n,i,r,o){return this.set(1,n,r,0,t,1,o,0,e,i,1,0,0,0,0,1),this}compose(t,e,n){const i=this.elements,r=e._x,o=e._y,a=e._z,l=e._w,c=r+r,h=o+o,u=a+a,d=r*c,f=r*h,y=r*u,_=o*h,g=o*u,p=a*u,x=l*c,b=l*h,S=l*u,L=n.x,C=n.y,w=n.z;return i[0]=(1-(_+p))*L,i[1]=(f+S)*L,i[2]=(y-b)*L,i[3]=0,i[4]=(f-S)*C,i[5]=(1-(d+p))*C,i[6]=(g+x)*C,i[7]=0,i[8]=(y+b)*w,i[9]=(g-x)*w,i[10]=(1-(d+_))*w,i[11]=0,i[12]=t.x,i[13]=t.y,i[14]=t.z,i[15]=1,this}decompose(t,e,n){const i=this.elements;let r=Ni.set(i[0],i[1],i[2]).length();const o=Ni.set(i[4],i[5],i[6]).length(),a=Ni.set(i[8],i[9],i[10]).length();this.determinant()<0&&(r=-r),t.x=i[12],t.y=i[13],t.z=i[14],dn.copy(this);const c=1/r,h=1/o,u=1/a;return dn.elements[0]*=c,dn.elements[1]*=c,dn.elements[2]*=c,dn.elements[4]*=h,dn.elements[5]*=h,dn.elements[6]*=h,dn.elements[8]*=u,dn.elements[9]*=u,dn.elements[10]*=u,e.setFromRotationMatrix(dn),n.x=r,n.y=o,n.z=a,this}makePerspective(t,e,n,i,r,o,a=Bn){const l=this.elements,c=2*r/(e-t),h=2*r/(n-i),u=(e+t)/(e-t),d=(n+i)/(n-i);let f,y;if(a===Bn)f=-(o+r)/(o-r),y=-2*o*r/(o-r);else if(a===Or)f=-o/(o-r),y=-o*r/(o-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+a);return l[0]=c,l[4]=0,l[8]=u,l[12]=0,l[1]=0,l[5]=h,l[9]=d,l[13]=0,l[2]=0,l[6]=0,l[10]=f,l[14]=y,l[3]=0,l[7]=0,l[11]=-1,l[15]=0,this}makeOrthographic(t,e,n,i,r,o,a=Bn){const l=this.elements,c=1/(e-t),h=1/(n-i),u=1/(o-r),d=(e+t)*c,f=(n+i)*h;let y,_;if(a===Bn)y=(o+r)*u,_=-2*u;else if(a===Or)y=r*u,_=-1*u;else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+a);return l[0]=2*c,l[4]=0,l[8]=0,l[12]=-d,l[1]=0,l[5]=2*h,l[9]=0,l[13]=-f,l[2]=0,l[6]=0,l[10]=_,l[14]=-y,l[3]=0,l[7]=0,l[11]=0,l[15]=1,this}equals(t){const e=this.elements,n=t.elements;for(let i=0;i<16;i++)if(e[i]!==n[i])return!1;return!0}fromArray(t,e=0){for(let n=0;n<16;n++)this.elements[n]=t[n+e];return this}toArray(t=[],e=0){const n=this.elements;return t[e]=n[0],t[e+1]=n[1],t[e+2]=n[2],t[e+3]=n[3],t[e+4]=n[4],t[e+5]=n[5],t[e+6]=n[6],t[e+7]=n[7],t[e+8]=n[8],t[e+9]=n[9],t[e+10]=n[10],t[e+11]=n[11],t[e+12]=n[12],t[e+13]=n[13],t[e+14]=n[14],t[e+15]=n[15],t}}const Ni=new I,dn=new le,Hd=new I(0,0,0),Wd=new I(1,1,1),$n=new I,js=new I,qe=new I,Cl=new le,wl=new Bs;class Xe{constructor(t=0,e=0,n=0,i=Xe.DEFAULT_ORDER){this.isEuler=!0,this._x=t,this._y=e,this._z=n,this._order=i}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get order(){return this._order}set order(t){this._order=t,this._onChangeCallback()}set(t,e,n,i=this._order){return this._x=t,this._y=e,this._z=n,this._order=i,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(t){return this._x=t._x,this._y=t._y,this._z=t._z,this._order=t._order,this._onChangeCallback(),this}setFromRotationMatrix(t,e=this._order,n=!0){const i=t.elements,r=i[0],o=i[4],a=i[8],l=i[1],c=i[5],h=i[9],u=i[2],d=i[6],f=i[10];switch(e){case"XYZ":this._y=Math.asin(Fe(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(-h,f),this._z=Math.atan2(-o,r)):(this._x=Math.atan2(d,c),this._z=0);break;case"YXZ":this._x=Math.asin(-Fe(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(a,f),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-u,r),this._z=0);break;case"ZXY":this._x=Math.asin(Fe(d,-1,1)),Math.abs(d)<.9999999?(this._y=Math.atan2(-u,f),this._z=Math.atan2(-o,c)):(this._y=0,this._z=Math.atan2(l,r));break;case"ZYX":this._y=Math.asin(-Fe(u,-1,1)),Math.abs(u)<.9999999?(this._x=Math.atan2(d,f),this._z=Math.atan2(l,r)):(this._x=0,this._z=Math.atan2(-o,c));break;case"YZX":this._z=Math.asin(Fe(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-h,c),this._y=Math.atan2(-u,r)):(this._x=0,this._y=Math.atan2(a,f));break;case"XZY":this._z=Math.asin(-Fe(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(d,c),this._y=Math.atan2(a,r)):(this._x=Math.atan2(-h,f),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+e)}return this._order=e,n===!0&&this._onChangeCallback(),this}setFromQuaternion(t,e,n){return Cl.makeRotationFromQuaternion(t),this.setFromRotationMatrix(Cl,e,n)}setFromVector3(t,e=this._order){return this.set(t.x,t.y,t.z,e)}reorder(t){return wl.setFromEuler(this),this.setFromQuaternion(wl,t)}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._order===this._order}fromArray(t){return this._x=t[0],this._y=t[1],this._z=t[2],t[3]!==void 0&&(this._order=t[3]),this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._order,t}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}Xe.DEFAULT_ORDER="XYZ";class $a{constructor(){this.mask=1}set(t){this.mask=(1<<t|0)>>>0}enable(t){this.mask|=1<<t|0}enableAll(){this.mask=-1}toggle(t){this.mask^=1<<t|0}disable(t){this.mask&=~(1<<t|0)}disableAll(){this.mask=0}test(t){return(this.mask&t.mask)!==0}isEnabled(t){return(this.mask&(1<<t|0))!==0}}let Vd=0;const Rl=new I,ki=new Bs,On=new le,Js=new I,Ss=new I,Xd=new I,Kd=new Bs,Il=new I(1,0,0),Dl=new I(0,1,0),Pl=new I(0,0,1),Ll={type:"added"},Yd={type:"removed"},Ui={type:"childadded",child:null},ao={type:"childremoved",child:null};class Ce extends fs{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:Vd++}),this.uuid=ps(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=Ce.DEFAULT_UP.clone();const t=new I,e=new Xe,n=new Bs,i=new I(1,1,1);function r(){n.setFromEuler(e,!1)}function o(){e.setFromQuaternion(n,void 0,!1)}e._onChange(r),n._onChange(o),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:t},rotation:{configurable:!0,enumerable:!0,value:e},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:i},modelViewMatrix:{value:new le},normalMatrix:{value:new Gt}}),this.matrix=new le,this.matrixWorld=new le,this.matrixAutoUpdate=Ce.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=Ce.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new $a,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(t){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(t),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(t){return this.quaternion.premultiply(t),this}setRotationFromAxisAngle(t,e){this.quaternion.setFromAxisAngle(t,e)}setRotationFromEuler(t){this.quaternion.setFromEuler(t,!0)}setRotationFromMatrix(t){this.quaternion.setFromRotationMatrix(t)}setRotationFromQuaternion(t){this.quaternion.copy(t)}rotateOnAxis(t,e){return ki.setFromAxisAngle(t,e),this.quaternion.multiply(ki),this}rotateOnWorldAxis(t,e){return ki.setFromAxisAngle(t,e),this.quaternion.premultiply(ki),this}rotateX(t){return this.rotateOnAxis(Il,t)}rotateY(t){return this.rotateOnAxis(Dl,t)}rotateZ(t){return this.rotateOnAxis(Pl,t)}translateOnAxis(t,e){return Rl.copy(t).applyQuaternion(this.quaternion),this.position.add(Rl.multiplyScalar(e)),this}translateX(t){return this.translateOnAxis(Il,t)}translateY(t){return this.translateOnAxis(Dl,t)}translateZ(t){return this.translateOnAxis(Pl,t)}localToWorld(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(this.matrixWorld)}worldToLocal(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(On.copy(this.matrixWorld).invert())}lookAt(t,e,n){t.isVector3?Js.copy(t):Js.set(t,e,n);const i=this.parent;this.updateWorldMatrix(!0,!1),Ss.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?On.lookAt(Ss,Js,this.up):On.lookAt(Js,Ss,this.up),this.quaternion.setFromRotationMatrix(On),i&&(On.extractRotation(i.matrixWorld),ki.setFromRotationMatrix(On),this.quaternion.premultiply(ki.invert()))}add(t){if(arguments.length>1){for(let e=0;e<arguments.length;e++)this.add(arguments[e]);return this}return t===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",t),this):(t&&t.isObject3D?(t.removeFromParent(),t.parent=this,this.children.push(t),t.dispatchEvent(Ll),Ui.child=t,this.dispatchEvent(Ui),Ui.child=null):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",t),this)}remove(t){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}const e=this.children.indexOf(t);return e!==-1&&(t.parent=null,this.children.splice(e,1),t.dispatchEvent(Yd),ao.child=t,this.dispatchEvent(ao),ao.child=null),this}removeFromParent(){const t=this.parent;return t!==null&&t.remove(this),this}clear(){return this.remove(...this.children)}attach(t){return this.updateWorldMatrix(!0,!1),On.copy(this.matrixWorld).invert(),t.parent!==null&&(t.parent.updateWorldMatrix(!0,!1),On.multiply(t.parent.matrixWorld)),t.applyMatrix4(On),t.removeFromParent(),t.parent=this,this.children.push(t),t.updateWorldMatrix(!1,!0),t.dispatchEvent(Ll),Ui.child=t,this.dispatchEvent(Ui),Ui.child=null,this}getObjectById(t){return this.getObjectByProperty("id",t)}getObjectByName(t){return this.getObjectByProperty("name",t)}getObjectByProperty(t,e){if(this[t]===e)return this;for(let n=0,i=this.children.length;n<i;n++){const o=this.children[n].getObjectByProperty(t,e);if(o!==void 0)return o}}getObjectsByProperty(t,e,n=[]){this[t]===e&&n.push(this);const i=this.children;for(let r=0,o=i.length;r<o;r++)i[r].getObjectsByProperty(t,e,n);return n}getWorldPosition(t){return this.updateWorldMatrix(!0,!1),t.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Ss,t,Xd),t}getWorldScale(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Ss,Kd,t),t}getWorldDirection(t){this.updateWorldMatrix(!0,!1);const e=this.matrixWorld.elements;return t.set(e[8],e[9],e[10]).normalize()}raycast(){}traverse(t){t(this);const e=this.children;for(let n=0,i=e.length;n<i;n++)e[n].traverse(t)}traverseVisible(t){if(this.visible===!1)return;t(this);const e=this.children;for(let n=0,i=e.length;n<i;n++)e[n].traverseVisible(t)}traverseAncestors(t){const e=this.parent;e!==null&&(t(e),e.traverseAncestors(t))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(t){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||t)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,t=!0);const e=this.children;for(let n=0,i=e.length;n<i;n++)e[n].updateMatrixWorld(t)}updateWorldMatrix(t,e){const n=this.parent;if(t===!0&&n!==null&&n.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),e===!0){const i=this.children;for(let r=0,o=i.length;r<o;r++)i[r].updateWorldMatrix(!1,!0)}}toJSON(t){const e=t===void 0||typeof t=="string",n={};e&&(t={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.6,type:"Object",generator:"Object3D.toJSON"});const i={};i.uuid=this.uuid,i.type=this.type,this.name!==""&&(i.name=this.name),this.castShadow===!0&&(i.castShadow=!0),this.receiveShadow===!0&&(i.receiveShadow=!0),this.visible===!1&&(i.visible=!1),this.frustumCulled===!1&&(i.frustumCulled=!1),this.renderOrder!==0&&(i.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(i.userData=this.userData),i.layers=this.layers.mask,i.matrix=this.matrix.toArray(),i.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(i.matrixAutoUpdate=!1),this.isInstancedMesh&&(i.type="InstancedMesh",i.count=this.count,i.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(i.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(i.type="BatchedMesh",i.perObjectFrustumCulled=this.perObjectFrustumCulled,i.sortObjects=this.sortObjects,i.drawRanges=this._drawRanges,i.reservedRanges=this._reservedRanges,i.visibility=this._visibility,i.active=this._active,i.bounds=this._bounds.map(a=>({boxInitialized:a.boxInitialized,boxMin:a.box.min.toArray(),boxMax:a.box.max.toArray(),sphereInitialized:a.sphereInitialized,sphereRadius:a.sphere.radius,sphereCenter:a.sphere.center.toArray()})),i.maxInstanceCount=this._maxInstanceCount,i.maxVertexCount=this._maxVertexCount,i.maxIndexCount=this._maxIndexCount,i.geometryInitialized=this._geometryInitialized,i.geometryCount=this._geometryCount,i.matricesTexture=this._matricesTexture.toJSON(t),this._colorsTexture!==null&&(i.colorsTexture=this._colorsTexture.toJSON(t)),this.boundingSphere!==null&&(i.boundingSphere={center:i.boundingSphere.center.toArray(),radius:i.boundingSphere.radius}),this.boundingBox!==null&&(i.boundingBox={min:i.boundingBox.min.toArray(),max:i.boundingBox.max.toArray()}));function r(a,l){return a[l.uuid]===void 0&&(a[l.uuid]=l.toJSON(t)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?i.background=this.background.toJSON():this.background.isTexture&&(i.background=this.background.toJSON(t).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(i.environment=this.environment.toJSON(t).uuid);else if(this.isMesh||this.isLine||this.isPoints){i.geometry=r(t.geometries,this.geometry);const a=this.geometry.parameters;if(a!==void 0&&a.shapes!==void 0){const l=a.shapes;if(Array.isArray(l))for(let c=0,h=l.length;c<h;c++){const u=l[c];r(t.shapes,u)}else r(t.shapes,l)}}if(this.isSkinnedMesh&&(i.bindMode=this.bindMode,i.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(t.skeletons,this.skeleton),i.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const a=[];for(let l=0,c=this.material.length;l<c;l++)a.push(r(t.materials,this.material[l]));i.material=a}else i.material=r(t.materials,this.material);if(this.children.length>0){i.children=[];for(let a=0;a<this.children.length;a++)i.children.push(this.children[a].toJSON(t).object)}if(this.animations.length>0){i.animations=[];for(let a=0;a<this.animations.length;a++){const l=this.animations[a];i.animations.push(r(t.animations,l))}}if(e){const a=o(t.geometries),l=o(t.materials),c=o(t.textures),h=o(t.images),u=o(t.shapes),d=o(t.skeletons),f=o(t.animations),y=o(t.nodes);a.length>0&&(n.geometries=a),l.length>0&&(n.materials=l),c.length>0&&(n.textures=c),h.length>0&&(n.images=h),u.length>0&&(n.shapes=u),d.length>0&&(n.skeletons=d),f.length>0&&(n.animations=f),y.length>0&&(n.nodes=y)}return n.object=i,n;function o(a){const l=[];for(const c in a){const h=a[c];delete h.metadata,l.push(h)}return l}}clone(t){return new this.constructor().copy(this,t)}copy(t,e=!0){if(this.name=t.name,this.up.copy(t.up),this.position.copy(t.position),this.rotation.order=t.rotation.order,this.quaternion.copy(t.quaternion),this.scale.copy(t.scale),this.matrix.copy(t.matrix),this.matrixWorld.copy(t.matrixWorld),this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrixWorldAutoUpdate=t.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=t.matrixWorldNeedsUpdate,this.layers.mask=t.layers.mask,this.visible=t.visible,this.castShadow=t.castShadow,this.receiveShadow=t.receiveShadow,this.frustumCulled=t.frustumCulled,this.renderOrder=t.renderOrder,this.animations=t.animations.slice(),this.userData=JSON.parse(JSON.stringify(t.userData)),e===!0)for(let n=0;n<t.children.length;n++){const i=t.children[n];this.add(i.clone())}return this}}Ce.DEFAULT_UP=new I(0,1,0);Ce.DEFAULT_MATRIX_AUTO_UPDATE=!0;Ce.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;const fn=new I,Nn=new I,lo=new I,kn=new I,Fi=new I,Bi=new I,Ol=new I,co=new I,ho=new I,uo=new I,fo=new oe,po=new oe,mo=new oe;class on{constructor(t=new I,e=new I,n=new I){this.a=t,this.b=e,this.c=n}static getNormal(t,e,n,i){i.subVectors(n,e),fn.subVectors(t,e),i.cross(fn);const r=i.lengthSq();return r>0?i.multiplyScalar(1/Math.sqrt(r)):i.set(0,0,0)}static getBarycoord(t,e,n,i,r){fn.subVectors(i,e),Nn.subVectors(n,e),lo.subVectors(t,e);const o=fn.dot(fn),a=fn.dot(Nn),l=fn.dot(lo),c=Nn.dot(Nn),h=Nn.dot(lo),u=o*c-a*a;if(u===0)return r.set(0,0,0),null;const d=1/u,f=(c*l-a*h)*d,y=(o*h-a*l)*d;return r.set(1-f-y,y,f)}static containsPoint(t,e,n,i){return this.getBarycoord(t,e,n,i,kn)===null?!1:kn.x>=0&&kn.y>=0&&kn.x+kn.y<=1}static getInterpolation(t,e,n,i,r,o,a,l){return this.getBarycoord(t,e,n,i,kn)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(r,kn.x),l.addScaledVector(o,kn.y),l.addScaledVector(a,kn.z),l)}static getInterpolatedAttribute(t,e,n,i,r,o){return fo.setScalar(0),po.setScalar(0),mo.setScalar(0),fo.fromBufferAttribute(t,e),po.fromBufferAttribute(t,n),mo.fromBufferAttribute(t,i),o.setScalar(0),o.addScaledVector(fo,r.x),o.addScaledVector(po,r.y),o.addScaledVector(mo,r.z),o}static isFrontFacing(t,e,n,i){return fn.subVectors(n,e),Nn.subVectors(t,e),fn.cross(Nn).dot(i)<0}set(t,e,n){return this.a.copy(t),this.b.copy(e),this.c.copy(n),this}setFromPointsAndIndices(t,e,n,i){return this.a.copy(t[e]),this.b.copy(t[n]),this.c.copy(t[i]),this}setFromAttributeAndIndices(t,e,n,i){return this.a.fromBufferAttribute(t,e),this.b.fromBufferAttribute(t,n),this.c.fromBufferAttribute(t,i),this}clone(){return new this.constructor().copy(this)}copy(t){return this.a.copy(t.a),this.b.copy(t.b),this.c.copy(t.c),this}getArea(){return fn.subVectors(this.c,this.b),Nn.subVectors(this.a,this.b),fn.cross(Nn).length()*.5}getMidpoint(t){return t.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(t){return on.getNormal(this.a,this.b,this.c,t)}getPlane(t){return t.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(t,e){return on.getBarycoord(t,this.a,this.b,this.c,e)}getInterpolation(t,e,n,i,r){return on.getInterpolation(t,this.a,this.b,this.c,e,n,i,r)}containsPoint(t){return on.containsPoint(t,this.a,this.b,this.c)}isFrontFacing(t){return on.isFrontFacing(this.a,this.b,this.c,t)}intersectsBox(t){return t.intersectsTriangle(this)}closestPointToPoint(t,e){const n=this.a,i=this.b,r=this.c;let o,a;Fi.subVectors(i,n),Bi.subVectors(r,n),co.subVectors(t,n);const l=Fi.dot(co),c=Bi.dot(co);if(l<=0&&c<=0)return e.copy(n);ho.subVectors(t,i);const h=Fi.dot(ho),u=Bi.dot(ho);if(h>=0&&u<=h)return e.copy(i);const d=l*u-h*c;if(d<=0&&l>=0&&h<=0)return o=l/(l-h),e.copy(n).addScaledVector(Fi,o);uo.subVectors(t,r);const f=Fi.dot(uo),y=Bi.dot(uo);if(y>=0&&f<=y)return e.copy(r);const _=f*c-l*y;if(_<=0&&c>=0&&y<=0)return a=c/(c-y),e.copy(n).addScaledVector(Bi,a);const g=h*y-f*u;if(g<=0&&u-h>=0&&f-y>=0)return Ol.subVectors(r,i),a=(u-h)/(u-h+(f-y)),e.copy(i).addScaledVector(Ol,a);const p=1/(g+_+d);return o=_*p,a=d*p,e.copy(n).addScaledVector(Fi,o).addScaledVector(Bi,a)}equals(t){return t.a.equals(this.a)&&t.b.equals(this.b)&&t.c.equals(this.c)}}const Nh={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},Zn={h:0,s:0,l:0},Qs={h:0,s:0,l:0};function go(s,t,e){return e<0&&(e+=1),e>1&&(e-=1),e<1/6?s+(t-s)*6*e:e<1/2?t:e<2/3?s+(t-s)*6*(2/3-e):s}class Dt{constructor(t,e,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(t,e,n)}set(t,e,n){if(e===void 0&&n===void 0){const i=t;i&&i.isColor?this.copy(i):typeof i=="number"?this.setHex(i):typeof i=="string"&&this.setStyle(i)}else this.setRGB(t,e,n);return this}setScalar(t){return this.r=t,this.g=t,this.b=t,this}setHex(t,e=je){return t=Math.floor(t),this.r=(t>>16&255)/255,this.g=(t>>8&255)/255,this.b=(t&255)/255,jt.toWorkingColorSpace(this,e),this}setRGB(t,e,n,i=jt.workingColorSpace){return this.r=t,this.g=e,this.b=n,jt.toWorkingColorSpace(this,i),this}setHSL(t,e,n,i=jt.workingColorSpace){if(t=qa(t,1),e=Fe(e,0,1),n=Fe(n,0,1),e===0)this.r=this.g=this.b=n;else{const r=n<=.5?n*(1+e):n+e-n*e,o=2*n-r;this.r=go(o,r,t+1/3),this.g=go(o,r,t),this.b=go(o,r,t-1/3)}return jt.toWorkingColorSpace(this,i),this}setStyle(t,e=je){function n(r){r!==void 0&&parseFloat(r)<1&&console.warn("THREE.Color: Alpha component of "+t+" will be ignored.")}let i;if(i=/^(\w+)\(([^\)]*)\)/.exec(t)){let r;const o=i[1],a=i[2];switch(o){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,e);if(r=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(r[4]),this.setRGB(Math.min(100,parseInt(r[1],10))/100,Math.min(100,parseInt(r[2],10))/100,Math.min(100,parseInt(r[3],10))/100,e);break;case"hsl":case"hsla":if(r=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,e);break;default:console.warn("THREE.Color: Unknown color model "+t)}}else if(i=/^\#([A-Fa-f\d]+)$/.exec(t)){const r=i[1],o=r.length;if(o===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,e);if(o===6)return this.setHex(parseInt(r,16),e);console.warn("THREE.Color: Invalid hex color "+t)}else if(t&&t.length>0)return this.setColorName(t,e);return this}setColorName(t,e=je){const n=Nh[t.toLowerCase()];return n!==void 0?this.setHex(n,e):console.warn("THREE.Color: Unknown color "+t),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(t){return this.r=t.r,this.g=t.g,this.b=t.b,this}copySRGBToLinear(t){return this.r=Gn(t.r),this.g=Gn(t.g),this.b=Gn(t.b),this}copyLinearToSRGB(t){return this.r=ts(t.r),this.g=ts(t.g),this.b=ts(t.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(t=je){return jt.fromWorkingColorSpace(Pe.copy(this),t),Math.round(Fe(Pe.r*255,0,255))*65536+Math.round(Fe(Pe.g*255,0,255))*256+Math.round(Fe(Pe.b*255,0,255))}getHexString(t=je){return("000000"+this.getHex(t).toString(16)).slice(-6)}getHSL(t,e=jt.workingColorSpace){jt.fromWorkingColorSpace(Pe.copy(this),e);const n=Pe.r,i=Pe.g,r=Pe.b,o=Math.max(n,i,r),a=Math.min(n,i,r);let l,c;const h=(a+o)/2;if(a===o)l=0,c=0;else{const u=o-a;switch(c=h<=.5?u/(o+a):u/(2-o-a),o){case n:l=(i-r)/u+(i<r?6:0);break;case i:l=(r-n)/u+2;break;case r:l=(n-i)/u+4;break}l/=6}return t.h=l,t.s=c,t.l=h,t}getRGB(t,e=jt.workingColorSpace){return jt.fromWorkingColorSpace(Pe.copy(this),e),t.r=Pe.r,t.g=Pe.g,t.b=Pe.b,t}getStyle(t=je){jt.fromWorkingColorSpace(Pe.copy(this),t);const e=Pe.r,n=Pe.g,i=Pe.b;return t!==je?`color(${t} ${e.toFixed(3)} ${n.toFixed(3)} ${i.toFixed(3)})`:`rgb(${Math.round(e*255)},${Math.round(n*255)},${Math.round(i*255)})`}offsetHSL(t,e,n){return this.getHSL(Zn),this.setHSL(Zn.h+t,Zn.s+e,Zn.l+n)}add(t){return this.r+=t.r,this.g+=t.g,this.b+=t.b,this}addColors(t,e){return this.r=t.r+e.r,this.g=t.g+e.g,this.b=t.b+e.b,this}addScalar(t){return this.r+=t,this.g+=t,this.b+=t,this}sub(t){return this.r=Math.max(0,this.r-t.r),this.g=Math.max(0,this.g-t.g),this.b=Math.max(0,this.b-t.b),this}multiply(t){return this.r*=t.r,this.g*=t.g,this.b*=t.b,this}multiplyScalar(t){return this.r*=t,this.g*=t,this.b*=t,this}lerp(t,e){return this.r+=(t.r-this.r)*e,this.g+=(t.g-this.g)*e,this.b+=(t.b-this.b)*e,this}lerpColors(t,e,n){return this.r=t.r+(e.r-t.r)*n,this.g=t.g+(e.g-t.g)*n,this.b=t.b+(e.b-t.b)*n,this}lerpHSL(t,e){this.getHSL(Zn),t.getHSL(Qs);const n=Ls(Zn.h,Qs.h,e),i=Ls(Zn.s,Qs.s,e),r=Ls(Zn.l,Qs.l,e);return this.setHSL(n,i,r),this}setFromVector3(t){return this.r=t.x,this.g=t.y,this.b=t.z,this}applyMatrix3(t){const e=this.r,n=this.g,i=this.b,r=t.elements;return this.r=r[0]*e+r[3]*n+r[6]*i,this.g=r[1]*e+r[4]*n+r[7]*i,this.b=r[2]*e+r[5]*n+r[8]*i,this}equals(t){return t.r===this.r&&t.g===this.g&&t.b===this.b}fromArray(t,e=0){return this.r=t[e],this.g=t[e+1],this.b=t[e+2],this}toArray(t=[],e=0){return t[e]=this.r,t[e+1]=this.g,t[e+2]=this.b,t}fromBufferAttribute(t,e){return this.r=t.getX(e),this.g=t.getY(e),this.b=t.getZ(e),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const Pe=new Dt;Dt.NAMES=Nh;let qd=0;class Oe extends fs{static get type(){return"Material"}get type(){return this.constructor.type}set type(t){}constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:qd++}),this.uuid=ps(),this.name="",this.blending=ji,this.side=gn,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=Yo,this.blendDst=qo,this.blendEquation=_i,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new Dt(0,0,0),this.blendAlpha=0,this.depthFunc=is,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=gl,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=Ri,this.stencilZFail=Ri,this.stencilZPass=Ri,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(t){this._alphaTest>0!=t>0&&this.version++,this._alphaTest=t}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(t){if(t!==void 0)for(const e in t){const n=t[e];if(n===void 0){console.warn(`THREE.Material: parameter '${e}' has value of undefined.`);continue}const i=this[e];if(i===void 0){console.warn(`THREE.Material: '${e}' is not a property of THREE.${this.type}.`);continue}i&&i.isColor?i.set(n):i&&i.isVector3&&n&&n.isVector3?i.copy(n):this[e]=n}}toJSON(t){const e=t===void 0||typeof t=="string";e&&(t={textures:{},images:{}});const n={metadata:{version:4.6,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,this.name!==""&&(n.name=this.name),this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(t).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(t).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(t).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(t).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(t).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(t).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(t).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(t).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(t).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(t).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(t).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(t).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(t).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(t).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(t).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(t).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(t).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(t).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(t).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(t).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(t).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(t).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(t).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(t).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.shadowSide!==null&&(n.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),this.blending!==ji&&(n.blending=this.blending),this.side!==gn&&(n.side=this.side),this.vertexColors===!0&&(n.vertexColors=!0),this.opacity<1&&(n.opacity=this.opacity),this.transparent===!0&&(n.transparent=!0),this.blendSrc!==Yo&&(n.blendSrc=this.blendSrc),this.blendDst!==qo&&(n.blendDst=this.blendDst),this.blendEquation!==_i&&(n.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(n.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(n.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(n.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(n.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(n.blendAlpha=this.blendAlpha),this.depthFunc!==is&&(n.depthFunc=this.depthFunc),this.depthTest===!1&&(n.depthTest=this.depthTest),this.depthWrite===!1&&(n.depthWrite=this.depthWrite),this.colorWrite===!1&&(n.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(n.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==gl&&(n.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(n.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(n.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==Ri&&(n.stencilFail=this.stencilFail),this.stencilZFail!==Ri&&(n.stencilZFail=this.stencilZFail),this.stencilZPass!==Ri&&(n.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(n.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(n.rotation=this.rotation),this.polygonOffset===!0&&(n.polygonOffset=!0),this.polygonOffsetFactor!==0&&(n.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(n.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(n.linewidth=this.linewidth),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.dithering===!0&&(n.dithering=!0),this.alphaTest>0&&(n.alphaTest=this.alphaTest),this.alphaHash===!0&&(n.alphaHash=!0),this.alphaToCoverage===!0&&(n.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(n.premultipliedAlpha=!0),this.forceSinglePass===!0&&(n.forceSinglePass=!0),this.wireframe===!0&&(n.wireframe=!0),this.wireframeLinewidth>1&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(n.flatShading=!0),this.visible===!1&&(n.visible=!1),this.toneMapped===!1&&(n.toneMapped=!1),this.fog===!1&&(n.fog=!1),Object.keys(this.userData).length>0&&(n.userData=this.userData);function i(r){const o=[];for(const a in r){const l=r[a];delete l.metadata,o.push(l)}return o}if(e){const r=i(t.textures),o=i(t.images);r.length>0&&(n.textures=r),o.length>0&&(n.images=o)}return n}clone(){return new this.constructor().copy(this)}copy(t){this.name=t.name,this.blending=t.blending,this.side=t.side,this.vertexColors=t.vertexColors,this.opacity=t.opacity,this.transparent=t.transparent,this.blendSrc=t.blendSrc,this.blendDst=t.blendDst,this.blendEquation=t.blendEquation,this.blendSrcAlpha=t.blendSrcAlpha,this.blendDstAlpha=t.blendDstAlpha,this.blendEquationAlpha=t.blendEquationAlpha,this.blendColor.copy(t.blendColor),this.blendAlpha=t.blendAlpha,this.depthFunc=t.depthFunc,this.depthTest=t.depthTest,this.depthWrite=t.depthWrite,this.stencilWriteMask=t.stencilWriteMask,this.stencilFunc=t.stencilFunc,this.stencilRef=t.stencilRef,this.stencilFuncMask=t.stencilFuncMask,this.stencilFail=t.stencilFail,this.stencilZFail=t.stencilZFail,this.stencilZPass=t.stencilZPass,this.stencilWrite=t.stencilWrite;const e=t.clippingPlanes;let n=null;if(e!==null){const i=e.length;n=new Array(i);for(let r=0;r!==i;++r)n[r]=e[r].clone()}return this.clippingPlanes=n,this.clipIntersection=t.clipIntersection,this.clipShadows=t.clipShadows,this.shadowSide=t.shadowSide,this.colorWrite=t.colorWrite,this.precision=t.precision,this.polygonOffset=t.polygonOffset,this.polygonOffsetFactor=t.polygonOffsetFactor,this.polygonOffsetUnits=t.polygonOffsetUnits,this.dithering=t.dithering,this.alphaTest=t.alphaTest,this.alphaHash=t.alphaHash,this.alphaToCoverage=t.alphaToCoverage,this.premultipliedAlpha=t.premultipliedAlpha,this.forceSinglePass=t.forceSinglePass,this.visible=t.visible,this.toneMapped=t.toneMapped,this.userData=JSON.parse(JSON.stringify(t.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(t){t===!0&&this.version++}onBuild(){console.warn("Material: onBuild() has been removed.")}}class Gs extends Oe{static get type(){return"MeshBasicMaterial"}constructor(t){super(),this.isMeshBasicMaterial=!0,this.color=new Dt(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Xe,this.combine=Ga,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.fog=t.fog,this}}const ve=new I,tr=new Qt;class Qe{constructor(t,e,n=!1){if(Array.isArray(t))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,this.name="",this.array=t,this.itemSize=e,this.count=t!==void 0?t.length/e:0,this.normalized=n,this.usage=yl,this.updateRanges=[],this.gpuType=Fn,this.version=0}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}setUsage(t){return this.usage=t,this}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.name=t.name,this.array=new t.array.constructor(t.array),this.itemSize=t.itemSize,this.count=t.count,this.normalized=t.normalized,this.usage=t.usage,this.gpuType=t.gpuType,this}copyAt(t,e,n){t*=this.itemSize,n*=e.itemSize;for(let i=0,r=this.itemSize;i<r;i++)this.array[t+i]=e.array[n+i];return this}copyArray(t){return this.array.set(t),this}applyMatrix3(t){if(this.itemSize===2)for(let e=0,n=this.count;e<n;e++)tr.fromBufferAttribute(this,e),tr.applyMatrix3(t),this.setXY(e,tr.x,tr.y);else if(this.itemSize===3)for(let e=0,n=this.count;e<n;e++)ve.fromBufferAttribute(this,e),ve.applyMatrix3(t),this.setXYZ(e,ve.x,ve.y,ve.z);return this}applyMatrix4(t){for(let e=0,n=this.count;e<n;e++)ve.fromBufferAttribute(this,e),ve.applyMatrix4(t),this.setXYZ(e,ve.x,ve.y,ve.z);return this}applyNormalMatrix(t){for(let e=0,n=this.count;e<n;e++)ve.fromBufferAttribute(this,e),ve.applyNormalMatrix(t),this.setXYZ(e,ve.x,ve.y,ve.z);return this}transformDirection(t){for(let e=0,n=this.count;e<n;e++)ve.fromBufferAttribute(this,e),ve.transformDirection(t),this.setXYZ(e,ve.x,ve.y,ve.z);return this}set(t,e=0){return this.array.set(t,e),this}getComponent(t,e){let n=this.array[t*this.itemSize+e];return this.normalized&&(n=Yi(n,this.array)),n}setComponent(t,e,n){return this.normalized&&(n=Ne(n,this.array)),this.array[t*this.itemSize+e]=n,this}getX(t){let e=this.array[t*this.itemSize];return this.normalized&&(e=Yi(e,this.array)),e}setX(t,e){return this.normalized&&(e=Ne(e,this.array)),this.array[t*this.itemSize]=e,this}getY(t){let e=this.array[t*this.itemSize+1];return this.normalized&&(e=Yi(e,this.array)),e}setY(t,e){return this.normalized&&(e=Ne(e,this.array)),this.array[t*this.itemSize+1]=e,this}getZ(t){let e=this.array[t*this.itemSize+2];return this.normalized&&(e=Yi(e,this.array)),e}setZ(t,e){return this.normalized&&(e=Ne(e,this.array)),this.array[t*this.itemSize+2]=e,this}getW(t){let e=this.array[t*this.itemSize+3];return this.normalized&&(e=Yi(e,this.array)),e}setW(t,e){return this.normalized&&(e=Ne(e,this.array)),this.array[t*this.itemSize+3]=e,this}setXY(t,e,n){return t*=this.itemSize,this.normalized&&(e=Ne(e,this.array),n=Ne(n,this.array)),this.array[t+0]=e,this.array[t+1]=n,this}setXYZ(t,e,n,i){return t*=this.itemSize,this.normalized&&(e=Ne(e,this.array),n=Ne(n,this.array),i=Ne(i,this.array)),this.array[t+0]=e,this.array[t+1]=n,this.array[t+2]=i,this}setXYZW(t,e,n,i,r){return t*=this.itemSize,this.normalized&&(e=Ne(e,this.array),n=Ne(n,this.array),i=Ne(i,this.array),r=Ne(r,this.array)),this.array[t+0]=e,this.array[t+1]=n,this.array[t+2]=i,this.array[t+3]=r,this}onUpload(t){return this.onUploadCallback=t,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const t={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(t.name=this.name),this.usage!==yl&&(t.usage=this.usage),t}}class kh extends Qe{constructor(t,e,n){super(new Uint16Array(t),e,n)}}class Uh extends Qe{constructor(t,e,n){super(new Uint32Array(t),e,n)}}class Re extends Qe{constructor(t,e,n){super(new Float32Array(t),e,n)}}let $d=0;const nn=new le,yo=new Ce,zi=new I,$e=new oi,Ms=new oi,Ee=new I;class Ke extends fs{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:$d++}),this.uuid=ps(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(t){return Array.isArray(t)?this.index=new(Ph(t)?Uh:kh)(t,1):this.index=t,this}setIndirect(t){return this.indirect=t,this}getIndirect(){return this.indirect}getAttribute(t){return this.attributes[t]}setAttribute(t,e){return this.attributes[t]=e,this}deleteAttribute(t){return delete this.attributes[t],this}hasAttribute(t){return this.attributes[t]!==void 0}addGroup(t,e,n=0){this.groups.push({start:t,count:e,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(t,e){this.drawRange.start=t,this.drawRange.count=e}applyMatrix4(t){const e=this.attributes.position;e!==void 0&&(e.applyMatrix4(t),e.needsUpdate=!0);const n=this.attributes.normal;if(n!==void 0){const r=new Gt().getNormalMatrix(t);n.applyNormalMatrix(r),n.needsUpdate=!0}const i=this.attributes.tangent;return i!==void 0&&(i.transformDirection(t),i.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(t){return nn.makeRotationFromQuaternion(t),this.applyMatrix4(nn),this}rotateX(t){return nn.makeRotationX(t),this.applyMatrix4(nn),this}rotateY(t){return nn.makeRotationY(t),this.applyMatrix4(nn),this}rotateZ(t){return nn.makeRotationZ(t),this.applyMatrix4(nn),this}translate(t,e,n){return nn.makeTranslation(t,e,n),this.applyMatrix4(nn),this}scale(t,e,n){return nn.makeScale(t,e,n),this.applyMatrix4(nn),this}lookAt(t){return yo.lookAt(t),yo.updateMatrix(),this.applyMatrix4(yo.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(zi).negate(),this.translate(zi.x,zi.y,zi.z),this}setFromPoints(t){const e=this.getAttribute("position");if(e===void 0){const n=[];for(let i=0,r=t.length;i<r;i++){const o=t[i];n.push(o.x,o.y,o.z||0)}this.setAttribute("position",new Re(n,3))}else{for(let n=0,i=e.count;n<i;n++){const r=t[n];e.setXYZ(n,r.x,r.y,r.z||0)}t.length>e.count&&console.warn("THREE.BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),e.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new oi);const t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new I(-1/0,-1/0,-1/0),new I(1/0,1/0,1/0));return}if(t!==void 0){if(this.boundingBox.setFromBufferAttribute(t),e)for(let n=0,i=e.length;n<i;n++){const r=e[n];$e.setFromBufferAttribute(r),this.morphTargetsRelative?(Ee.addVectors(this.boundingBox.min,$e.min),this.boundingBox.expandByPoint(Ee),Ee.addVectors(this.boundingBox.max,$e.max),this.boundingBox.expandByPoint(Ee)):(this.boundingBox.expandByPoint($e.min),this.boundingBox.expandByPoint($e.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new zs);const t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new I,1/0);return}if(t){const n=this.boundingSphere.center;if($e.setFromBufferAttribute(t),e)for(let r=0,o=e.length;r<o;r++){const a=e[r];Ms.setFromBufferAttribute(a),this.morphTargetsRelative?(Ee.addVectors($e.min,Ms.min),$e.expandByPoint(Ee),Ee.addVectors($e.max,Ms.max),$e.expandByPoint(Ee)):($e.expandByPoint(Ms.min),$e.expandByPoint(Ms.max))}$e.getCenter(n);let i=0;for(let r=0,o=t.count;r<o;r++)Ee.fromBufferAttribute(t,r),i=Math.max(i,n.distanceToSquared(Ee));if(e)for(let r=0,o=e.length;r<o;r++){const a=e[r],l=this.morphTargetsRelative;for(let c=0,h=a.count;c<h;c++)Ee.fromBufferAttribute(a,c),l&&(zi.fromBufferAttribute(t,c),Ee.add(zi)),i=Math.max(i,n.distanceToSquared(Ee))}this.boundingSphere.radius=Math.sqrt(i),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const t=this.index,e=this.attributes;if(t===null||e.position===void 0||e.normal===void 0||e.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const n=e.position,i=e.normal,r=e.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new Qe(new Float32Array(4*n.count),4));const o=this.getAttribute("tangent"),a=[],l=[];for(let P=0;P<n.count;P++)a[P]=new I,l[P]=new I;const c=new I,h=new I,u=new I,d=new Qt,f=new Qt,y=new Qt,_=new I,g=new I;function p(P,T,E){c.fromBufferAttribute(n,P),h.fromBufferAttribute(n,T),u.fromBufferAttribute(n,E),d.fromBufferAttribute(r,P),f.fromBufferAttribute(r,T),y.fromBufferAttribute(r,E),h.sub(c),u.sub(c),f.sub(d),y.sub(d);const D=1/(f.x*y.y-y.x*f.y);isFinite(D)&&(_.copy(h).multiplyScalar(y.y).addScaledVector(u,-f.y).multiplyScalar(D),g.copy(u).multiplyScalar(f.x).addScaledVector(h,-y.x).multiplyScalar(D),a[P].add(_),a[T].add(_),a[E].add(_),l[P].add(g),l[T].add(g),l[E].add(g))}let x=this.groups;x.length===0&&(x=[{start:0,count:t.count}]);for(let P=0,T=x.length;P<T;++P){const E=x[P],D=E.start,H=E.count;for(let B=D,K=D+H;B<K;B+=3)p(t.getX(B+0),t.getX(B+1),t.getX(B+2))}const b=new I,S=new I,L=new I,C=new I;function w(P){L.fromBufferAttribute(i,P),C.copy(L);const T=a[P];b.copy(T),b.sub(L.multiplyScalar(L.dot(T))).normalize(),S.crossVectors(C,T);const D=S.dot(l[P])<0?-1:1;o.setXYZW(P,b.x,b.y,b.z,D)}for(let P=0,T=x.length;P<T;++P){const E=x[P],D=E.start,H=E.count;for(let B=D,K=D+H;B<K;B+=3)w(t.getX(B+0)),w(t.getX(B+1)),w(t.getX(B+2))}}computeVertexNormals(){const t=this.index,e=this.getAttribute("position");if(e!==void 0){let n=this.getAttribute("normal");if(n===void 0)n=new Qe(new Float32Array(e.count*3),3),this.setAttribute("normal",n);else for(let d=0,f=n.count;d<f;d++)n.setXYZ(d,0,0,0);const i=new I,r=new I,o=new I,a=new I,l=new I,c=new I,h=new I,u=new I;if(t)for(let d=0,f=t.count;d<f;d+=3){const y=t.getX(d+0),_=t.getX(d+1),g=t.getX(d+2);i.fromBufferAttribute(e,y),r.fromBufferAttribute(e,_),o.fromBufferAttribute(e,g),h.subVectors(o,r),u.subVectors(i,r),h.cross(u),a.fromBufferAttribute(n,y),l.fromBufferAttribute(n,_),c.fromBufferAttribute(n,g),a.add(h),l.add(h),c.add(h),n.setXYZ(y,a.x,a.y,a.z),n.setXYZ(_,l.x,l.y,l.z),n.setXYZ(g,c.x,c.y,c.z)}else for(let d=0,f=e.count;d<f;d+=3)i.fromBufferAttribute(e,d+0),r.fromBufferAttribute(e,d+1),o.fromBufferAttribute(e,d+2),h.subVectors(o,r),u.subVectors(i,r),h.cross(u),n.setXYZ(d+0,h.x,h.y,h.z),n.setXYZ(d+1,h.x,h.y,h.z),n.setXYZ(d+2,h.x,h.y,h.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){const t=this.attributes.normal;for(let e=0,n=t.count;e<n;e++)Ee.fromBufferAttribute(t,e),Ee.normalize(),t.setXYZ(e,Ee.x,Ee.y,Ee.z)}toNonIndexed(){function t(a,l){const c=a.array,h=a.itemSize,u=a.normalized,d=new c.constructor(l.length*h);let f=0,y=0;for(let _=0,g=l.length;_<g;_++){a.isInterleavedBufferAttribute?f=l[_]*a.data.stride+a.offset:f=l[_]*h;for(let p=0;p<h;p++)d[y++]=c[f++]}return new Qe(d,h,u)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const e=new Ke,n=this.index.array,i=this.attributes;for(const a in i){const l=i[a],c=t(l,n);e.setAttribute(a,c)}const r=this.morphAttributes;for(const a in r){const l=[],c=r[a];for(let h=0,u=c.length;h<u;h++){const d=c[h],f=t(d,n);l.push(f)}e.morphAttributes[a]=l}e.morphTargetsRelative=this.morphTargetsRelative;const o=this.groups;for(let a=0,l=o.length;a<l;a++){const c=o[a];e.addGroup(c.start,c.count,c.materialIndex)}return e}toJSON(){const t={metadata:{version:4.6,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(t.uuid=this.uuid,t.type=this.type,this.name!==""&&(t.name=this.name),Object.keys(this.userData).length>0&&(t.userData=this.userData),this.parameters!==void 0){const l=this.parameters;for(const c in l)l[c]!==void 0&&(t[c]=l[c]);return t}t.data={attributes:{}};const e=this.index;e!==null&&(t.data.index={type:e.array.constructor.name,array:Array.prototype.slice.call(e.array)});const n=this.attributes;for(const l in n){const c=n[l];t.data.attributes[l]=c.toJSON(t.data)}const i={};let r=!1;for(const l in this.morphAttributes){const c=this.morphAttributes[l],h=[];for(let u=0,d=c.length;u<d;u++){const f=c[u];h.push(f.toJSON(t.data))}h.length>0&&(i[l]=h,r=!0)}r&&(t.data.morphAttributes=i,t.data.morphTargetsRelative=this.morphTargetsRelative);const o=this.groups;o.length>0&&(t.data.groups=JSON.parse(JSON.stringify(o)));const a=this.boundingSphere;return a!==null&&(t.data.boundingSphere={center:a.center.toArray(),radius:a.radius}),t}clone(){return new this.constructor().copy(this)}copy(t){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const e={};this.name=t.name;const n=t.index;n!==null&&this.setIndex(n.clone(e));const i=t.attributes;for(const c in i){const h=i[c];this.setAttribute(c,h.clone(e))}const r=t.morphAttributes;for(const c in r){const h=[],u=r[c];for(let d=0,f=u.length;d<f;d++)h.push(u[d].clone(e));this.morphAttributes[c]=h}this.morphTargetsRelative=t.morphTargetsRelative;const o=t.groups;for(let c=0,h=o.length;c<h;c++){const u=o[c];this.addGroup(u.start,u.count,u.materialIndex)}const a=t.boundingBox;a!==null&&(this.boundingBox=a.clone());const l=t.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=t.drawRange.start,this.drawRange.count=t.drawRange.count,this.userData=t.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}const Nl=new le,hi=new Yr,er=new zs,kl=new I,nr=new I,ir=new I,sr=new I,_o=new I,rr=new I,Ul=new I,or=new I;class V extends Ce{constructor(t=new Ke,e=new Gs){super(),this.isMesh=!0,this.type="Mesh",this.geometry=t,this.material=e,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),t.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=t.morphTargetInfluences.slice()),t.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},t.morphTargetDictionary)),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}updateMorphTargets(){const e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){const i=e[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=i.length;r<o;r++){const a=i[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}getVertexPosition(t,e){const n=this.geometry,i=n.attributes.position,r=n.morphAttributes.position,o=n.morphTargetsRelative;e.fromBufferAttribute(i,t);const a=this.morphTargetInfluences;if(r&&a){rr.set(0,0,0);for(let l=0,c=r.length;l<c;l++){const h=a[l],u=r[l];h!==0&&(_o.fromBufferAttribute(u,t),o?rr.addScaledVector(_o,h):rr.addScaledVector(_o.sub(e),h))}e.add(rr)}return e}raycast(t,e){const n=this.geometry,i=this.material,r=this.matrixWorld;i!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),er.copy(n.boundingSphere),er.applyMatrix4(r),hi.copy(t.ray).recast(t.near),!(er.containsPoint(hi.origin)===!1&&(hi.intersectSphere(er,kl)===null||hi.origin.distanceToSquared(kl)>(t.far-t.near)**2))&&(Nl.copy(r).invert(),hi.copy(t.ray).applyMatrix4(Nl),!(n.boundingBox!==null&&hi.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(t,e,hi)))}_computeIntersections(t,e,n){let i;const r=this.geometry,o=this.material,a=r.index,l=r.attributes.position,c=r.attributes.uv,h=r.attributes.uv1,u=r.attributes.normal,d=r.groups,f=r.drawRange;if(a!==null)if(Array.isArray(o))for(let y=0,_=d.length;y<_;y++){const g=d[y],p=o[g.materialIndex],x=Math.max(g.start,f.start),b=Math.min(a.count,Math.min(g.start+g.count,f.start+f.count));for(let S=x,L=b;S<L;S+=3){const C=a.getX(S),w=a.getX(S+1),P=a.getX(S+2);i=ar(this,p,t,n,c,h,u,C,w,P),i&&(i.faceIndex=Math.floor(S/3),i.face.materialIndex=g.materialIndex,e.push(i))}}else{const y=Math.max(0,f.start),_=Math.min(a.count,f.start+f.count);for(let g=y,p=_;g<p;g+=3){const x=a.getX(g),b=a.getX(g+1),S=a.getX(g+2);i=ar(this,o,t,n,c,h,u,x,b,S),i&&(i.faceIndex=Math.floor(g/3),e.push(i))}}else if(l!==void 0)if(Array.isArray(o))for(let y=0,_=d.length;y<_;y++){const g=d[y],p=o[g.materialIndex],x=Math.max(g.start,f.start),b=Math.min(l.count,Math.min(g.start+g.count,f.start+f.count));for(let S=x,L=b;S<L;S+=3){const C=S,w=S+1,P=S+2;i=ar(this,p,t,n,c,h,u,C,w,P),i&&(i.faceIndex=Math.floor(S/3),i.face.materialIndex=g.materialIndex,e.push(i))}}else{const y=Math.max(0,f.start),_=Math.min(l.count,f.start+f.count);for(let g=y,p=_;g<p;g+=3){const x=g,b=g+1,S=g+2;i=ar(this,o,t,n,c,h,u,x,b,S),i&&(i.faceIndex=Math.floor(g/3),e.push(i))}}}}function Zd(s,t,e,n,i,r,o,a){let l;if(t.side===Be?l=n.intersectTriangle(o,r,i,!0,a):l=n.intersectTriangle(i,r,o,t.side===gn,a),l===null)return null;or.copy(a),or.applyMatrix4(s.matrixWorld);const c=e.ray.origin.distanceTo(or);return c<e.near||c>e.far?null:{distance:c,point:or.clone(),object:s}}function ar(s,t,e,n,i,r,o,a,l,c){s.getVertexPosition(a,nr),s.getVertexPosition(l,ir),s.getVertexPosition(c,sr);const h=Zd(s,t,e,n,nr,ir,sr,Ul);if(h){const u=new I;on.getBarycoord(Ul,nr,ir,sr,u),i&&(h.uv=on.getInterpolatedAttribute(i,a,l,c,u,new Qt)),r&&(h.uv1=on.getInterpolatedAttribute(r,a,l,c,u,new Qt)),o&&(h.normal=on.getInterpolatedAttribute(o,a,l,c,u,new I),h.normal.dot(n.direction)>0&&h.normal.multiplyScalar(-1));const d={a,b:l,c,normal:new I,materialIndex:0};on.getNormal(nr,ir,sr,d.normal),h.face=d,h.barycoord=u}return h}class st extends Ke{constructor(t=1,e=1,n=1,i=1,r=1,o=1){super(),this.type="BoxGeometry",this.parameters={width:t,height:e,depth:n,widthSegments:i,heightSegments:r,depthSegments:o};const a=this;i=Math.floor(i),r=Math.floor(r),o=Math.floor(o);const l=[],c=[],h=[],u=[];let d=0,f=0;y("z","y","x",-1,-1,n,e,t,o,r,0),y("z","y","x",1,-1,n,e,-t,o,r,1),y("x","z","y",1,1,t,n,e,i,o,2),y("x","z","y",1,-1,t,n,-e,i,o,3),y("x","y","z",1,-1,t,e,n,i,r,4),y("x","y","z",-1,-1,t,e,-n,i,r,5),this.setIndex(l),this.setAttribute("position",new Re(c,3)),this.setAttribute("normal",new Re(h,3)),this.setAttribute("uv",new Re(u,2));function y(_,g,p,x,b,S,L,C,w,P,T){const E=S/w,D=L/P,H=S/2,B=L/2,K=C/2,Z=w+1,q=P+1;let Q=0,W=0;const rt=new I;for(let ht=0;ht<q;ht++){const yt=ht*D-B;for(let kt=0;kt<Z;kt++){const $t=kt*E-H;rt[_]=$t*x,rt[g]=yt*b,rt[p]=K,c.push(rt.x,rt.y,rt.z),rt[_]=0,rt[g]=0,rt[p]=C>0?1:-1,h.push(rt.x,rt.y,rt.z),u.push(kt/w),u.push(1-ht/P),Q+=1}}for(let ht=0;ht<P;ht++)for(let yt=0;yt<w;yt++){const kt=d+yt+Z*ht,$t=d+yt+Z*(ht+1),$=d+(yt+1)+Z*(ht+1),et=d+(yt+1)+Z*ht;l.push(kt,$t,et),l.push($t,$,et),W+=6}a.addGroup(f,W,T),f+=W,d+=Q}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new st(t.width,t.height,t.depth,t.widthSegments,t.heightSegments,t.depthSegments)}}function ls(s){const t={};for(const e in s){t[e]={};for(const n in s[e]){const i=s[e][n];i&&(i.isColor||i.isMatrix3||i.isMatrix4||i.isVector2||i.isVector3||i.isVector4||i.isTexture||i.isQuaternion)?i.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),t[e][n]=null):t[e][n]=i.clone():Array.isArray(i)?t[e][n]=i.slice():t[e][n]=i}}return t}function Ue(s){const t={};for(let e=0;e<s.length;e++){const n=ls(s[e]);for(const i in n)t[i]=n[i]}return t}function jd(s){const t=[];for(let e=0;e<s.length;e++)t.push(s[e].clone());return t}function Fh(s){const t=s.getRenderTarget();return t===null?s.outputColorSpace:t.isXRRenderTarget===!0?t.texture.colorSpace:jt.workingColorSpace}const Jd={clone:ls,merge:Ue};var Qd=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,tf=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class wn extends Oe{static get type(){return"ShaderMaterial"}constructor(t){super(),this.isShaderMaterial=!0,this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=Qd,this.fragmentShader=tf,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,t!==void 0&&this.setValues(t)}copy(t){return super.copy(t),this.fragmentShader=t.fragmentShader,this.vertexShader=t.vertexShader,this.uniforms=ls(t.uniforms),this.uniformsGroups=jd(t.uniformsGroups),this.defines=Object.assign({},t.defines),this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.fog=t.fog,this.lights=t.lights,this.clipping=t.clipping,this.extensions=Object.assign({},t.extensions),this.glslVersion=t.glslVersion,this}toJSON(t){const e=super.toJSON(t);e.glslVersion=this.glslVersion,e.uniforms={};for(const i in this.uniforms){const o=this.uniforms[i].value;o&&o.isTexture?e.uniforms[i]={type:"t",value:o.toJSON(t).uuid}:o&&o.isColor?e.uniforms[i]={type:"c",value:o.getHex()}:o&&o.isVector2?e.uniforms[i]={type:"v2",value:o.toArray()}:o&&o.isVector3?e.uniforms[i]={type:"v3",value:o.toArray()}:o&&o.isVector4?e.uniforms[i]={type:"v4",value:o.toArray()}:o&&o.isMatrix3?e.uniforms[i]={type:"m3",value:o.toArray()}:o&&o.isMatrix4?e.uniforms[i]={type:"m4",value:o.toArray()}:e.uniforms[i]={value:o}}Object.keys(this.defines).length>0&&(e.defines=this.defines),e.vertexShader=this.vertexShader,e.fragmentShader=this.fragmentShader,e.lights=this.lights,e.clipping=this.clipping;const n={};for(const i in this.extensions)this.extensions[i]===!0&&(n[i]=!0);return Object.keys(n).length>0&&(e.extensions=n),e}}class Bh extends Ce{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new le,this.projectionMatrix=new le,this.projectionMatrixInverse=new le,this.coordinateSystem=Bn}copy(t,e){return super.copy(t,e),this.matrixWorldInverse.copy(t.matrixWorldInverse),this.projectionMatrix.copy(t.projectionMatrix),this.projectionMatrixInverse.copy(t.projectionMatrixInverse),this.coordinateSystem=t.coordinateSystem,this}getWorldDirection(t){return super.getWorldDirection(t).negate()}updateMatrixWorld(t){super.updateMatrixWorld(t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(t,e){super.updateWorldMatrix(t,e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}const jn=new I,Fl=new Qt,Bl=new Qt;class We extends Bh{constructor(t=50,e=1,n=.1,i=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=t,this.zoom=1,this.near=n,this.far=i,this.focus=10,this.aspect=e,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.fov=t.fov,this.zoom=t.zoom,this.near=t.near,this.far=t.far,this.focus=t.focus,this.aspect=t.aspect,this.view=t.view===null?null:Object.assign({},t.view),this.filmGauge=t.filmGauge,this.filmOffset=t.filmOffset,this}setFocalLength(t){const e=.5*this.getFilmHeight()/t;this.fov=Us*2*Math.atan(e),this.updateProjectionMatrix()}getFocalLength(){const t=Math.tan(Qi*.5*this.fov);return .5*this.getFilmHeight()/t}getEffectiveFOV(){return Us*2*Math.atan(Math.tan(Qi*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(t,e,n){jn.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),e.set(jn.x,jn.y).multiplyScalar(-t/jn.z),jn.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(jn.x,jn.y).multiplyScalar(-t/jn.z)}getViewSize(t,e){return this.getViewBounds(t,Fl,Bl),e.subVectors(Bl,Fl)}setViewOffset(t,e,n,i,r,o){this.aspect=t/e,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=n,this.view.offsetY=i,this.view.width=r,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=this.near;let e=t*Math.tan(Qi*.5*this.fov)/this.zoom,n=2*e,i=this.aspect*n,r=-.5*i;const o=this.view;if(this.view!==null&&this.view.enabled){const l=o.fullWidth,c=o.fullHeight;r+=o.offsetX*i/l,e-=o.offsetY*n/c,i*=o.width/l,n*=o.height/c}const a=this.filmOffset;a!==0&&(r+=t*a/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+i,e,e-n,t,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const e=super.toJSON(t);return e.object.fov=this.fov,e.object.zoom=this.zoom,e.object.near=this.near,e.object.far=this.far,e.object.focus=this.focus,e.object.aspect=this.aspect,this.view!==null&&(e.object.view=Object.assign({},this.view)),e.object.filmGauge=this.filmGauge,e.object.filmOffset=this.filmOffset,e}}const Gi=-90,Hi=1;class ef extends Ce{constructor(t,e,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;const i=new We(Gi,Hi,t,e);i.layers=this.layers,this.add(i);const r=new We(Gi,Hi,t,e);r.layers=this.layers,this.add(r);const o=new We(Gi,Hi,t,e);o.layers=this.layers,this.add(o);const a=new We(Gi,Hi,t,e);a.layers=this.layers,this.add(a);const l=new We(Gi,Hi,t,e);l.layers=this.layers,this.add(l);const c=new We(Gi,Hi,t,e);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){const t=this.coordinateSystem,e=this.children.concat(),[n,i,r,o,a,l]=e;for(const c of e)this.remove(c);if(t===Bn)n.up.set(0,1,0),n.lookAt(1,0,0),i.up.set(0,1,0),i.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),o.up.set(0,0,1),o.lookAt(0,-1,0),a.up.set(0,1,0),a.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(t===Or)n.up.set(0,-1,0),n.lookAt(-1,0,0),i.up.set(0,-1,0),i.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),o.up.set(0,0,-1),o.lookAt(0,-1,0),a.up.set(0,-1,0),a.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+t);for(const c of e)this.add(c),c.updateMatrixWorld()}update(t,e){this.parent===null&&this.updateMatrixWorld();const{renderTarget:n,activeMipmapLevel:i}=this;this.coordinateSystem!==t.coordinateSystem&&(this.coordinateSystem=t.coordinateSystem,this.updateCoordinateSystem());const[r,o,a,l,c,h]=this.children,u=t.getRenderTarget(),d=t.getActiveCubeFace(),f=t.getActiveMipmapLevel(),y=t.xr.enabled;t.xr.enabled=!1;const _=n.texture.generateMipmaps;n.texture.generateMipmaps=!1,t.setRenderTarget(n,0,i),t.render(e,r),t.setRenderTarget(n,1,i),t.render(e,o),t.setRenderTarget(n,2,i),t.render(e,a),t.setRenderTarget(n,3,i),t.render(e,l),t.setRenderTarget(n,4,i),t.render(e,c),n.texture.generateMipmaps=_,t.setRenderTarget(n,5,i),t.render(e,h),t.setRenderTarget(u,d,f),t.xr.enabled=y,n.texture.needsPMREMUpdate=!0}}class zh extends ze{constructor(t,e,n,i,r,o,a,l,c,h){t=t!==void 0?t:[],e=e!==void 0?e:ss,super(t,e,n,i,r,o,a,l,c,h),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(t){this.image=t}}class nf extends Ai{constructor(t=1,e={}){super(t,t,e),this.isWebGLCubeRenderTarget=!0;const n={width:t,height:t,depth:1},i=[n,n,n,n,n,n];this.texture=new zh(i,e.mapping,e.wrapS,e.wrapT,e.magFilter,e.minFilter,e.format,e.type,e.anisotropy,e.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.generateMipmaps=e.generateMipmaps!==void 0?e.generateMipmaps:!1,this.texture.minFilter=e.minFilter!==void 0?e.minFilter:En}fromEquirectangularTexture(t,e){this.texture.type=e.type,this.texture.colorSpace=e.colorSpace,this.texture.generateMipmaps=e.generateMipmaps,this.texture.minFilter=e.minFilter,this.texture.magFilter=e.magFilter;const n={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},i=new st(5,5,5),r=new wn({name:"CubemapFromEquirect",uniforms:ls(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:Be,blending:ii});r.uniforms.tEquirect.value=e;const o=new V(i,r),a=e.minFilter;return e.minFilter===Mi&&(e.minFilter=En),new ef(1,10,this).update(t,o),e.minFilter=a,o.geometry.dispose(),o.material.dispose(),this}clear(t,e,n,i){const r=t.getRenderTarget();for(let o=0;o<6;o++)t.setRenderTarget(this,o),t.clear(e,n,i);t.setRenderTarget(r)}}const vo=new I,sf=new I,rf=new Gt;class gi{constructor(t=new I(1,0,0),e=0){this.isPlane=!0,this.normal=t,this.constant=e}set(t,e){return this.normal.copy(t),this.constant=e,this}setComponents(t,e,n,i){return this.normal.set(t,e,n),this.constant=i,this}setFromNormalAndCoplanarPoint(t,e){return this.normal.copy(t),this.constant=-e.dot(this.normal),this}setFromCoplanarPoints(t,e,n){const i=vo.subVectors(n,e).cross(sf.subVectors(t,e)).normalize();return this.setFromNormalAndCoplanarPoint(i,t),this}copy(t){return this.normal.copy(t.normal),this.constant=t.constant,this}normalize(){const t=1/this.normal.length();return this.normal.multiplyScalar(t),this.constant*=t,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(t){return this.normal.dot(t)+this.constant}distanceToSphere(t){return this.distanceToPoint(t.center)-t.radius}projectPoint(t,e){return e.copy(t).addScaledVector(this.normal,-this.distanceToPoint(t))}intersectLine(t,e){const n=t.delta(vo),i=this.normal.dot(n);if(i===0)return this.distanceToPoint(t.start)===0?e.copy(t.start):null;const r=-(t.start.dot(this.normal)+this.constant)/i;return r<0||r>1?null:e.copy(t.start).addScaledVector(n,r)}intersectsLine(t){const e=this.distanceToPoint(t.start),n=this.distanceToPoint(t.end);return e<0&&n>0||n<0&&e>0}intersectsBox(t){return t.intersectsPlane(this)}intersectsSphere(t){return t.intersectsPlane(this)}coplanarPoint(t){return t.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(t,e){const n=e||rf.getNormalMatrix(t),i=this.coplanarPoint(vo).applyMatrix4(t),r=this.normal.applyMatrix3(n).normalize();return this.constant=-i.dot(r),this}translate(t){return this.constant-=t.dot(this.normal),this}equals(t){return t.normal.equals(this.normal)&&t.constant===this.constant}clone(){return new this.constructor().copy(this)}}const ui=new zs,lr=new I;class qr{constructor(t=new gi,e=new gi,n=new gi,i=new gi,r=new gi,o=new gi){this.planes=[t,e,n,i,r,o]}set(t,e,n,i,r,o){const a=this.planes;return a[0].copy(t),a[1].copy(e),a[2].copy(n),a[3].copy(i),a[4].copy(r),a[5].copy(o),this}copy(t){const e=this.planes;for(let n=0;n<6;n++)e[n].copy(t.planes[n]);return this}setFromProjectionMatrix(t,e=Bn){const n=this.planes,i=t.elements,r=i[0],o=i[1],a=i[2],l=i[3],c=i[4],h=i[5],u=i[6],d=i[7],f=i[8],y=i[9],_=i[10],g=i[11],p=i[12],x=i[13],b=i[14],S=i[15];if(n[0].setComponents(l-r,d-c,g-f,S-p).normalize(),n[1].setComponents(l+r,d+c,g+f,S+p).normalize(),n[2].setComponents(l+o,d+h,g+y,S+x).normalize(),n[3].setComponents(l-o,d-h,g-y,S-x).normalize(),n[4].setComponents(l-a,d-u,g-_,S-b).normalize(),e===Bn)n[5].setComponents(l+a,d+u,g+_,S+b).normalize();else if(e===Or)n[5].setComponents(a,u,_,b).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+e);return this}intersectsObject(t){if(t.boundingSphere!==void 0)t.boundingSphere===null&&t.computeBoundingSphere(),ui.copy(t.boundingSphere).applyMatrix4(t.matrixWorld);else{const e=t.geometry;e.boundingSphere===null&&e.computeBoundingSphere(),ui.copy(e.boundingSphere).applyMatrix4(t.matrixWorld)}return this.intersectsSphere(ui)}intersectsSprite(t){return ui.center.set(0,0,0),ui.radius=.7071067811865476,ui.applyMatrix4(t.matrixWorld),this.intersectsSphere(ui)}intersectsSphere(t){const e=this.planes,n=t.center,i=-t.radius;for(let r=0;r<6;r++)if(e[r].distanceToPoint(n)<i)return!1;return!0}intersectsBox(t){const e=this.planes;for(let n=0;n<6;n++){const i=e[n];if(lr.x=i.normal.x>0?t.max.x:t.min.x,lr.y=i.normal.y>0?t.max.y:t.min.y,lr.z=i.normal.z>0?t.max.z:t.min.z,i.distanceToPoint(lr)<0)return!1}return!0}containsPoint(t){const e=this.planes;for(let n=0;n<6;n++)if(e[n].distanceToPoint(t)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}function Gh(){let s=null,t=!1,e=null,n=null;function i(r,o){e(r,o),n=s.requestAnimationFrame(i)}return{start:function(){t!==!0&&e!==null&&(n=s.requestAnimationFrame(i),t=!0)},stop:function(){s.cancelAnimationFrame(n),t=!1},setAnimationLoop:function(r){e=r},setContext:function(r){s=r}}}function of(s){const t=new WeakMap;function e(a,l){const c=a.array,h=a.usage,u=c.byteLength,d=s.createBuffer();s.bindBuffer(l,d),s.bufferData(l,c,h),a.onUploadCallback();let f;if(c instanceof Float32Array)f=s.FLOAT;else if(c instanceof Uint16Array)a.isFloat16BufferAttribute?f=s.HALF_FLOAT:f=s.UNSIGNED_SHORT;else if(c instanceof Int16Array)f=s.SHORT;else if(c instanceof Uint32Array)f=s.UNSIGNED_INT;else if(c instanceof Int32Array)f=s.INT;else if(c instanceof Int8Array)f=s.BYTE;else if(c instanceof Uint8Array)f=s.UNSIGNED_BYTE;else if(c instanceof Uint8ClampedArray)f=s.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+c);return{buffer:d,type:f,bytesPerElement:c.BYTES_PER_ELEMENT,version:a.version,size:u}}function n(a,l,c){const h=l.array,u=l.updateRanges;if(s.bindBuffer(c,a),u.length===0)s.bufferSubData(c,0,h);else{u.sort((f,y)=>f.start-y.start);let d=0;for(let f=1;f<u.length;f++){const y=u[d],_=u[f];_.start<=y.start+y.count+1?y.count=Math.max(y.count,_.start+_.count-y.start):(++d,u[d]=_)}u.length=d+1;for(let f=0,y=u.length;f<y;f++){const _=u[f];s.bufferSubData(c,_.start*h.BYTES_PER_ELEMENT,h,_.start,_.count)}l.clearUpdateRanges()}l.onUploadCallback()}function i(a){return a.isInterleavedBufferAttribute&&(a=a.data),t.get(a)}function r(a){a.isInterleavedBufferAttribute&&(a=a.data);const l=t.get(a);l&&(s.deleteBuffer(l.buffer),t.delete(a))}function o(a,l){if(a.isInterleavedBufferAttribute&&(a=a.data),a.isGLBufferAttribute){const h=t.get(a);(!h||h.version<a.version)&&t.set(a,{buffer:a.buffer,type:a.type,bytesPerElement:a.elementSize,version:a.version});return}const c=t.get(a);if(c===void 0)t.set(a,e(a,l));else if(c.version<a.version){if(c.size!==a.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");n(c.buffer,a,l),c.version=a.version}}return{get:i,remove:r,update:o}}class Ci extends Ke{constructor(t=1,e=1,n=1,i=1){super(),this.type="PlaneGeometry",this.parameters={width:t,height:e,widthSegments:n,heightSegments:i};const r=t/2,o=e/2,a=Math.floor(n),l=Math.floor(i),c=a+1,h=l+1,u=t/a,d=e/l,f=[],y=[],_=[],g=[];for(let p=0;p<h;p++){const x=p*d-o;for(let b=0;b<c;b++){const S=b*u-r;y.push(S,-x,0),_.push(0,0,1),g.push(b/a),g.push(1-p/l)}}for(let p=0;p<l;p++)for(let x=0;x<a;x++){const b=x+c*p,S=x+c*(p+1),L=x+1+c*(p+1),C=x+1+c*p;f.push(b,S,C),f.push(S,L,C)}this.setIndex(f),this.setAttribute("position",new Re(y,3)),this.setAttribute("normal",new Re(_,3)),this.setAttribute("uv",new Re(g,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Ci(t.width,t.height,t.widthSegments,t.heightSegments)}}var af=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,lf=`#ifdef USE_ALPHAHASH
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
#endif`,cf=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,hf=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,uf=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,df=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,ff=`#ifdef USE_AOMAP
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
#endif`,pf=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,mf=`#ifdef USE_BATCHING
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
#endif`,gf=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,yf=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,_f=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,vf=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,Sf=`#ifdef USE_IRIDESCENCE
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
#endif`,Mf=`#ifdef USE_BUMPMAP
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
#endif`,xf=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,Ef=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,bf=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,Tf=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,Af=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,Cf=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,wf=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec3 vColor;
#endif`,Rf=`#if defined( USE_COLOR_ALPHA )
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
#endif`,If=`#define PI 3.141592653589793
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
} // validated`,Df=`#ifdef ENVMAP_TYPE_CUBE_UV
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
#endif`,Pf=`vec3 transformedNormal = objectNormal;
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
#endif`,Lf=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,Of=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,Nf=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,kf=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,Uf="gl_FragColor = linearToOutputTexel( gl_FragColor );",Ff=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,Bf=`#ifdef USE_ENVMAP
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
#endif`,zf=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,Gf=`#ifdef USE_ENVMAP
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
#endif`,Hf=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,Wf=`#ifdef USE_ENVMAP
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
#endif`,Vf=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,Xf=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,Kf=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,Yf=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,qf=`#ifdef USE_GRADIENTMAP
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
}`,$f=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,Zf=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,jf=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,Jf=`uniform bool receiveShadow;
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
#endif`,Qf=`#ifdef USE_ENVMAP
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
#endif`,tp=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,ep=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,np=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,ip=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,sp=`PhysicalMaterial material;
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
#endif`,rp=`struct PhysicalMaterial {
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
}`,op=`
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
#endif`,ap=`#if defined( RE_IndirectDiffuse )
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
#endif`,lp=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,cp=`#if defined( USE_LOGDEPTHBUF )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,hp=`#if defined( USE_LOGDEPTHBUF )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,up=`#ifdef USE_LOGDEPTHBUF
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,dp=`#ifdef USE_LOGDEPTHBUF
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,fp=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,pp=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,mp=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,gp=`#if defined( USE_POINTS_UV )
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
#endif`,yp=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,_p=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,vp=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,Sp=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,Mp=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,xp=`#ifdef USE_MORPHTARGETS
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
#endif`,Ep=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,bp=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 nonPerturbedNormal = normal;`,Tp=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
#endif`,Ap=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Cp=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,wp=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,Rp=`#ifdef USE_NORMALMAP
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
#endif`,Ip=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,Dp=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,Pp=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,Lp=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,Op=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,Np=`vec3 packNormalToRGB( const in vec3 normal ) {
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
}`,kp=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,Up=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,Fp=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,Bp=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,zp=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,Gp=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,Hp=`#if NUM_SPOT_LIGHT_COORDS > 0
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
		return step( compare, unpackRGBAToDepth( texture2D( depths, uv ) ) );
	}
	vec2 texture2DDistribution( sampler2D shadow, vec2 uv ) {
		return unpackRGBATo2Half( texture2D( shadow, uv ) );
	}
	float VSMShadow (sampler2D shadow, vec2 uv, float compare ){
		float occlusion = 1.0;
		vec2 distribution = texture2DDistribution( shadow, uv );
		float hard_shadow = step( compare , distribution.x );
		if (hard_shadow != 1.0 ) {
			float distance = compare - distribution.x ;
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
#endif`,Wp=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,Vp=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
#endif`,Xp=`float getShadowMask() {
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
}`,Kp=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,Yp=`#ifdef USE_SKINNING
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
#endif`,qp=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,$p=`#ifdef USE_SKINNING
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
#endif`,Zp=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,jp=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,Jp=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,Qp=`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,tm=`#ifdef USE_TRANSMISSION
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
#endif`,em=`#ifdef USE_TRANSMISSION
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
#endif`,nm=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,im=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,sm=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,rm=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const om=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,am=`uniform sampler2D t2D;
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
}`,lm=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,cm=`#ifdef ENVMAP_TYPE_CUBE
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
}`,hm=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,um=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,dm=`#include <common>
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
}`,fm=`#if DEPTH_PACKING == 3200
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
	float fragCoordZ = 0.5 * vHighPrecisionZW[0] / vHighPrecisionZW[1] + 0.5;
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#elif DEPTH_PACKING == 3202
		gl_FragColor = vec4( packDepthToRGB( fragCoordZ ), 1.0 );
	#elif DEPTH_PACKING == 3203
		gl_FragColor = vec4( packDepthToRG( fragCoordZ ), 0.0, 1.0 );
	#endif
}`,pm=`#define DISTANCE
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
}`,mm=`#define DISTANCE
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
}`,gm=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,ym=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,_m=`uniform float scale;
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
}`,vm=`uniform vec3 diffuse;
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
}`,Sm=`#include <common>
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
}`,Mm=`uniform vec3 diffuse;
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
}`,xm=`#define LAMBERT
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
}`,Em=`#define LAMBERT
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
}`,bm=`#define MATCAP
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
}`,Tm=`#define MATCAP
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
}`,Am=`#define NORMAL
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
}`,Cm=`#define NORMAL
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
}`,wm=`#define PHONG
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
}`,Rm=`#define PHONG
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
}`,Im=`#define STANDARD
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
}`,Dm=`#define STANDARD
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
}`,Pm=`#define TOON
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
}`,Lm=`#define TOON
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
}`,Om=`uniform float size;
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
}`,Nm=`uniform vec3 diffuse;
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
}`,km=`#include <common>
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
}`,Um=`uniform vec3 color;
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
}`,Fm=`uniform float rotation;
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
}`,Bm=`uniform vec3 diffuse;
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
}`,Wt={alphahash_fragment:af,alphahash_pars_fragment:lf,alphamap_fragment:cf,alphamap_pars_fragment:hf,alphatest_fragment:uf,alphatest_pars_fragment:df,aomap_fragment:ff,aomap_pars_fragment:pf,batching_pars_vertex:mf,batching_vertex:gf,begin_vertex:yf,beginnormal_vertex:_f,bsdfs:vf,iridescence_fragment:Sf,bumpmap_pars_fragment:Mf,clipping_planes_fragment:xf,clipping_planes_pars_fragment:Ef,clipping_planes_pars_vertex:bf,clipping_planes_vertex:Tf,color_fragment:Af,color_pars_fragment:Cf,color_pars_vertex:wf,color_vertex:Rf,common:If,cube_uv_reflection_fragment:Df,defaultnormal_vertex:Pf,displacementmap_pars_vertex:Lf,displacementmap_vertex:Of,emissivemap_fragment:Nf,emissivemap_pars_fragment:kf,colorspace_fragment:Uf,colorspace_pars_fragment:Ff,envmap_fragment:Bf,envmap_common_pars_fragment:zf,envmap_pars_fragment:Gf,envmap_pars_vertex:Hf,envmap_physical_pars_fragment:Qf,envmap_vertex:Wf,fog_vertex:Vf,fog_pars_vertex:Xf,fog_fragment:Kf,fog_pars_fragment:Yf,gradientmap_pars_fragment:qf,lightmap_pars_fragment:$f,lights_lambert_fragment:Zf,lights_lambert_pars_fragment:jf,lights_pars_begin:Jf,lights_toon_fragment:tp,lights_toon_pars_fragment:ep,lights_phong_fragment:np,lights_phong_pars_fragment:ip,lights_physical_fragment:sp,lights_physical_pars_fragment:rp,lights_fragment_begin:op,lights_fragment_maps:ap,lights_fragment_end:lp,logdepthbuf_fragment:cp,logdepthbuf_pars_fragment:hp,logdepthbuf_pars_vertex:up,logdepthbuf_vertex:dp,map_fragment:fp,map_pars_fragment:pp,map_particle_fragment:mp,map_particle_pars_fragment:gp,metalnessmap_fragment:yp,metalnessmap_pars_fragment:_p,morphinstance_vertex:vp,morphcolor_vertex:Sp,morphnormal_vertex:Mp,morphtarget_pars_vertex:xp,morphtarget_vertex:Ep,normal_fragment_begin:bp,normal_fragment_maps:Tp,normal_pars_fragment:Ap,normal_pars_vertex:Cp,normal_vertex:wp,normalmap_pars_fragment:Rp,clearcoat_normal_fragment_begin:Ip,clearcoat_normal_fragment_maps:Dp,clearcoat_pars_fragment:Pp,iridescence_pars_fragment:Lp,opaque_fragment:Op,packing:Np,premultiplied_alpha_fragment:kp,project_vertex:Up,dithering_fragment:Fp,dithering_pars_fragment:Bp,roughnessmap_fragment:zp,roughnessmap_pars_fragment:Gp,shadowmap_pars_fragment:Hp,shadowmap_pars_vertex:Wp,shadowmap_vertex:Vp,shadowmask_pars_fragment:Xp,skinbase_vertex:Kp,skinning_pars_vertex:Yp,skinning_vertex:qp,skinnormal_vertex:$p,specularmap_fragment:Zp,specularmap_pars_fragment:jp,tonemapping_fragment:Jp,tonemapping_pars_fragment:Qp,transmission_fragment:tm,transmission_pars_fragment:em,uv_pars_fragment:nm,uv_pars_vertex:im,uv_vertex:sm,worldpos_vertex:rm,background_vert:om,background_frag:am,backgroundCube_vert:lm,backgroundCube_frag:cm,cube_vert:hm,cube_frag:um,depth_vert:dm,depth_frag:fm,distanceRGBA_vert:pm,distanceRGBA_frag:mm,equirect_vert:gm,equirect_frag:ym,linedashed_vert:_m,linedashed_frag:vm,meshbasic_vert:Sm,meshbasic_frag:Mm,meshlambert_vert:xm,meshlambert_frag:Em,meshmatcap_vert:bm,meshmatcap_frag:Tm,meshnormal_vert:Am,meshnormal_frag:Cm,meshphong_vert:wm,meshphong_frag:Rm,meshphysical_vert:Im,meshphysical_frag:Dm,meshtoon_vert:Pm,meshtoon_frag:Lm,points_vert:Om,points_frag:Nm,shadow_vert:km,shadow_frag:Um,sprite_vert:Fm,sprite_frag:Bm},at={common:{diffuse:{value:new Dt(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Gt},alphaMap:{value:null},alphaMapTransform:{value:new Gt},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Gt}},envmap:{envMap:{value:null},envMapRotation:{value:new Gt},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Gt}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Gt}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Gt},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Gt},normalScale:{value:new Qt(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Gt},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Gt}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Gt}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Gt}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new Dt(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new Dt(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Gt},alphaTest:{value:0},uvTransform:{value:new Gt}},sprite:{diffuse:{value:new Dt(16777215)},opacity:{value:1},center:{value:new Qt(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Gt},alphaMap:{value:null},alphaMapTransform:{value:new Gt},alphaTest:{value:0}}},Mn={basic:{uniforms:Ue([at.common,at.specularmap,at.envmap,at.aomap,at.lightmap,at.fog]),vertexShader:Wt.meshbasic_vert,fragmentShader:Wt.meshbasic_frag},lambert:{uniforms:Ue([at.common,at.specularmap,at.envmap,at.aomap,at.lightmap,at.emissivemap,at.bumpmap,at.normalmap,at.displacementmap,at.fog,at.lights,{emissive:{value:new Dt(0)}}]),vertexShader:Wt.meshlambert_vert,fragmentShader:Wt.meshlambert_frag},phong:{uniforms:Ue([at.common,at.specularmap,at.envmap,at.aomap,at.lightmap,at.emissivemap,at.bumpmap,at.normalmap,at.displacementmap,at.fog,at.lights,{emissive:{value:new Dt(0)},specular:{value:new Dt(1118481)},shininess:{value:30}}]),vertexShader:Wt.meshphong_vert,fragmentShader:Wt.meshphong_frag},standard:{uniforms:Ue([at.common,at.envmap,at.aomap,at.lightmap,at.emissivemap,at.bumpmap,at.normalmap,at.displacementmap,at.roughnessmap,at.metalnessmap,at.fog,at.lights,{emissive:{value:new Dt(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Wt.meshphysical_vert,fragmentShader:Wt.meshphysical_frag},toon:{uniforms:Ue([at.common,at.aomap,at.lightmap,at.emissivemap,at.bumpmap,at.normalmap,at.displacementmap,at.gradientmap,at.fog,at.lights,{emissive:{value:new Dt(0)}}]),vertexShader:Wt.meshtoon_vert,fragmentShader:Wt.meshtoon_frag},matcap:{uniforms:Ue([at.common,at.bumpmap,at.normalmap,at.displacementmap,at.fog,{matcap:{value:null}}]),vertexShader:Wt.meshmatcap_vert,fragmentShader:Wt.meshmatcap_frag},points:{uniforms:Ue([at.points,at.fog]),vertexShader:Wt.points_vert,fragmentShader:Wt.points_frag},dashed:{uniforms:Ue([at.common,at.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Wt.linedashed_vert,fragmentShader:Wt.linedashed_frag},depth:{uniforms:Ue([at.common,at.displacementmap]),vertexShader:Wt.depth_vert,fragmentShader:Wt.depth_frag},normal:{uniforms:Ue([at.common,at.bumpmap,at.normalmap,at.displacementmap,{opacity:{value:1}}]),vertexShader:Wt.meshnormal_vert,fragmentShader:Wt.meshnormal_frag},sprite:{uniforms:Ue([at.sprite,at.fog]),vertexShader:Wt.sprite_vert,fragmentShader:Wt.sprite_frag},background:{uniforms:{uvTransform:{value:new Gt},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Wt.background_vert,fragmentShader:Wt.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new Gt}},vertexShader:Wt.backgroundCube_vert,fragmentShader:Wt.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Wt.cube_vert,fragmentShader:Wt.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Wt.equirect_vert,fragmentShader:Wt.equirect_frag},distanceRGBA:{uniforms:Ue([at.common,at.displacementmap,{referencePosition:{value:new I},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Wt.distanceRGBA_vert,fragmentShader:Wt.distanceRGBA_frag},shadow:{uniforms:Ue([at.lights,at.fog,{color:{value:new Dt(0)},opacity:{value:1}}]),vertexShader:Wt.shadow_vert,fragmentShader:Wt.shadow_frag}};Mn.physical={uniforms:Ue([Mn.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Gt},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Gt},clearcoatNormalScale:{value:new Qt(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Gt},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Gt},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Gt},sheen:{value:0},sheenColor:{value:new Dt(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Gt},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Gt},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Gt},transmissionSamplerSize:{value:new Qt},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Gt},attenuationDistance:{value:0},attenuationColor:{value:new Dt(0)},specularColor:{value:new Dt(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Gt},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Gt},anisotropyVector:{value:new Qt},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Gt}}]),vertexShader:Wt.meshphysical_vert,fragmentShader:Wt.meshphysical_frag};const cr={r:0,b:0,g:0},di=new Xe,zm=new le;function Gm(s,t,e,n,i,r,o){const a=new Dt(0);let l=r===!0?0:1,c,h,u=null,d=0,f=null;function y(x){let b=x.isScene===!0?x.background:null;return b&&b.isTexture&&(b=(x.backgroundBlurriness>0?e:t).get(b)),b}function _(x){let b=!1;const S=y(x);S===null?p(a,l):S&&S.isColor&&(p(S,1),b=!0);const L=s.xr.getEnvironmentBlendMode();L==="additive"?n.buffers.color.setClear(0,0,0,1,o):L==="alpha-blend"&&n.buffers.color.setClear(0,0,0,0,o),(s.autoClear||b)&&(n.buffers.depth.setTest(!0),n.buffers.depth.setMask(!0),n.buffers.color.setMask(!0),s.clear(s.autoClearColor,s.autoClearDepth,s.autoClearStencil))}function g(x,b){const S=y(b);S&&(S.isCubeTexture||S.mapping===Xr)?(h===void 0&&(h=new V(new st(1,1,1),new wn({name:"BackgroundCubeMaterial",uniforms:ls(Mn.backgroundCube.uniforms),vertexShader:Mn.backgroundCube.vertexShader,fragmentShader:Mn.backgroundCube.fragmentShader,side:Be,depthTest:!1,depthWrite:!1,fog:!1})),h.geometry.deleteAttribute("normal"),h.geometry.deleteAttribute("uv"),h.onBeforeRender=function(L,C,w){this.matrixWorld.copyPosition(w.matrixWorld)},Object.defineProperty(h.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),i.update(h)),di.copy(b.backgroundRotation),di.x*=-1,di.y*=-1,di.z*=-1,S.isCubeTexture&&S.isRenderTargetTexture===!1&&(di.y*=-1,di.z*=-1),h.material.uniforms.envMap.value=S,h.material.uniforms.flipEnvMap.value=S.isCubeTexture&&S.isRenderTargetTexture===!1?-1:1,h.material.uniforms.backgroundBlurriness.value=b.backgroundBlurriness,h.material.uniforms.backgroundIntensity.value=b.backgroundIntensity,h.material.uniforms.backgroundRotation.value.setFromMatrix4(zm.makeRotationFromEuler(di)),h.material.toneMapped=jt.getTransfer(S.colorSpace)!==re,(u!==S||d!==S.version||f!==s.toneMapping)&&(h.material.needsUpdate=!0,u=S,d=S.version,f=s.toneMapping),h.layers.enableAll(),x.unshift(h,h.geometry,h.material,0,0,null)):S&&S.isTexture&&(c===void 0&&(c=new V(new Ci(2,2),new wn({name:"BackgroundMaterial",uniforms:ls(Mn.background.uniforms),vertexShader:Mn.background.vertexShader,fragmentShader:Mn.background.fragmentShader,side:gn,depthTest:!1,depthWrite:!1,fog:!1})),c.geometry.deleteAttribute("normal"),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),i.update(c)),c.material.uniforms.t2D.value=S,c.material.uniforms.backgroundIntensity.value=b.backgroundIntensity,c.material.toneMapped=jt.getTransfer(S.colorSpace)!==re,S.matrixAutoUpdate===!0&&S.updateMatrix(),c.material.uniforms.uvTransform.value.copy(S.matrix),(u!==S||d!==S.version||f!==s.toneMapping)&&(c.material.needsUpdate=!0,u=S,d=S.version,f=s.toneMapping),c.layers.enableAll(),x.unshift(c,c.geometry,c.material,0,0,null))}function p(x,b){x.getRGB(cr,Fh(s)),n.buffers.color.setClear(cr.r,cr.g,cr.b,b,o)}return{getClearColor:function(){return a},setClearColor:function(x,b=1){a.set(x),l=b,p(a,l)},getClearAlpha:function(){return l},setClearAlpha:function(x){l=x,p(a,l)},render:_,addToRenderList:g}}function Hm(s,t){const e=s.getParameter(s.MAX_VERTEX_ATTRIBS),n={},i=d(null);let r=i,o=!1;function a(E,D,H,B,K){let Z=!1;const q=u(B,H,D);r!==q&&(r=q,c(r.object)),Z=f(E,B,H,K),Z&&y(E,B,H,K),K!==null&&t.update(K,s.ELEMENT_ARRAY_BUFFER),(Z||o)&&(o=!1,S(E,D,H,B),K!==null&&s.bindBuffer(s.ELEMENT_ARRAY_BUFFER,t.get(K).buffer))}function l(){return s.createVertexArray()}function c(E){return s.bindVertexArray(E)}function h(E){return s.deleteVertexArray(E)}function u(E,D,H){const B=H.wireframe===!0;let K=n[E.id];K===void 0&&(K={},n[E.id]=K);let Z=K[D.id];Z===void 0&&(Z={},K[D.id]=Z);let q=Z[B];return q===void 0&&(q=d(l()),Z[B]=q),q}function d(E){const D=[],H=[],B=[];for(let K=0;K<e;K++)D[K]=0,H[K]=0,B[K]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:D,enabledAttributes:H,attributeDivisors:B,object:E,attributes:{},index:null}}function f(E,D,H,B){const K=r.attributes,Z=D.attributes;let q=0;const Q=H.getAttributes();for(const W in Q)if(Q[W].location>=0){const ht=K[W];let yt=Z[W];if(yt===void 0&&(W==="instanceMatrix"&&E.instanceMatrix&&(yt=E.instanceMatrix),W==="instanceColor"&&E.instanceColor&&(yt=E.instanceColor)),ht===void 0||ht.attribute!==yt||yt&&ht.data!==yt.data)return!0;q++}return r.attributesNum!==q||r.index!==B}function y(E,D,H,B){const K={},Z=D.attributes;let q=0;const Q=H.getAttributes();for(const W in Q)if(Q[W].location>=0){let ht=Z[W];ht===void 0&&(W==="instanceMatrix"&&E.instanceMatrix&&(ht=E.instanceMatrix),W==="instanceColor"&&E.instanceColor&&(ht=E.instanceColor));const yt={};yt.attribute=ht,ht&&ht.data&&(yt.data=ht.data),K[W]=yt,q++}r.attributes=K,r.attributesNum=q,r.index=B}function _(){const E=r.newAttributes;for(let D=0,H=E.length;D<H;D++)E[D]=0}function g(E){p(E,0)}function p(E,D){const H=r.newAttributes,B=r.enabledAttributes,K=r.attributeDivisors;H[E]=1,B[E]===0&&(s.enableVertexAttribArray(E),B[E]=1),K[E]!==D&&(s.vertexAttribDivisor(E,D),K[E]=D)}function x(){const E=r.newAttributes,D=r.enabledAttributes;for(let H=0,B=D.length;H<B;H++)D[H]!==E[H]&&(s.disableVertexAttribArray(H),D[H]=0)}function b(E,D,H,B,K,Z,q){q===!0?s.vertexAttribIPointer(E,D,H,K,Z):s.vertexAttribPointer(E,D,H,B,K,Z)}function S(E,D,H,B){_();const K=B.attributes,Z=H.getAttributes(),q=D.defaultAttributeValues;for(const Q in Z){const W=Z[Q];if(W.location>=0){let rt=K[Q];if(rt===void 0&&(Q==="instanceMatrix"&&E.instanceMatrix&&(rt=E.instanceMatrix),Q==="instanceColor"&&E.instanceColor&&(rt=E.instanceColor)),rt!==void 0){const ht=rt.normalized,yt=rt.itemSize,kt=t.get(rt);if(kt===void 0)continue;const $t=kt.buffer,$=kt.type,et=kt.bytesPerElement,gt=$===s.INT||$===s.UNSIGNED_INT||rt.gpuType===Ha;if(rt.isInterleavedBufferAttribute){const ot=rt.data,Et=ot.stride,xt=rt.offset;if(ot.isInstancedInterleavedBuffer){for(let Vt=0;Vt<W.locationSize;Vt++)p(W.location+Vt,ot.meshPerAttribute);E.isInstancedMesh!==!0&&B._maxInstanceCount===void 0&&(B._maxInstanceCount=ot.meshPerAttribute*ot.count)}else for(let Vt=0;Vt<W.locationSize;Vt++)g(W.location+Vt);s.bindBuffer(s.ARRAY_BUFFER,$t);for(let Vt=0;Vt<W.locationSize;Vt++)b(W.location+Vt,yt/W.locationSize,$,ht,Et*et,(xt+yt/W.locationSize*Vt)*et,gt)}else{if(rt.isInstancedBufferAttribute){for(let ot=0;ot<W.locationSize;ot++)p(W.location+ot,rt.meshPerAttribute);E.isInstancedMesh!==!0&&B._maxInstanceCount===void 0&&(B._maxInstanceCount=rt.meshPerAttribute*rt.count)}else for(let ot=0;ot<W.locationSize;ot++)g(W.location+ot);s.bindBuffer(s.ARRAY_BUFFER,$t);for(let ot=0;ot<W.locationSize;ot++)b(W.location+ot,yt/W.locationSize,$,ht,yt*et,yt/W.locationSize*ot*et,gt)}}else if(q!==void 0){const ht=q[Q];if(ht!==void 0)switch(ht.length){case 2:s.vertexAttrib2fv(W.location,ht);break;case 3:s.vertexAttrib3fv(W.location,ht);break;case 4:s.vertexAttrib4fv(W.location,ht);break;default:s.vertexAttrib1fv(W.location,ht)}}}}x()}function L(){P();for(const E in n){const D=n[E];for(const H in D){const B=D[H];for(const K in B)h(B[K].object),delete B[K];delete D[H]}delete n[E]}}function C(E){if(n[E.id]===void 0)return;const D=n[E.id];for(const H in D){const B=D[H];for(const K in B)h(B[K].object),delete B[K];delete D[H]}delete n[E.id]}function w(E){for(const D in n){const H=n[D];if(H[E.id]===void 0)continue;const B=H[E.id];for(const K in B)h(B[K].object),delete B[K];delete H[E.id]}}function P(){T(),o=!0,r!==i&&(r=i,c(r.object))}function T(){i.geometry=null,i.program=null,i.wireframe=!1}return{setup:a,reset:P,resetDefaultState:T,dispose:L,releaseStatesOfGeometry:C,releaseStatesOfProgram:w,initAttributes:_,enableAttribute:g,disableUnusedAttributes:x}}function Wm(s,t,e){let n;function i(c){n=c}function r(c,h){s.drawArrays(n,c,h),e.update(h,n,1)}function o(c,h,u){u!==0&&(s.drawArraysInstanced(n,c,h,u),e.update(h,n,u))}function a(c,h,u){if(u===0)return;t.get("WEBGL_multi_draw").multiDrawArraysWEBGL(n,c,0,h,0,u);let f=0;for(let y=0;y<u;y++)f+=h[y];e.update(f,n,1)}function l(c,h,u,d){if(u===0)return;const f=t.get("WEBGL_multi_draw");if(f===null)for(let y=0;y<c.length;y++)o(c[y],h[y],d[y]);else{f.multiDrawArraysInstancedWEBGL(n,c,0,h,0,d,0,u);let y=0;for(let _=0;_<u;_++)y+=h[_]*d[_];e.update(y,n,1)}}this.setMode=i,this.render=r,this.renderInstances=o,this.renderMultiDraw=a,this.renderMultiDrawInstances=l}function Vm(s,t,e,n){let i;function r(){if(i!==void 0)return i;if(t.has("EXT_texture_filter_anisotropic")===!0){const w=t.get("EXT_texture_filter_anisotropic");i=s.getParameter(w.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else i=0;return i}function o(w){return!(w!==mn&&n.convert(w)!==s.getParameter(s.IMPLEMENTATION_COLOR_READ_FORMAT))}function a(w){const P=w===Fs&&(t.has("EXT_color_buffer_half_float")||t.has("EXT_color_buffer_float"));return!(w!==Wn&&n.convert(w)!==s.getParameter(s.IMPLEMENTATION_COLOR_READ_TYPE)&&w!==Fn&&!P)}function l(w){if(w==="highp"){if(s.getShaderPrecisionFormat(s.VERTEX_SHADER,s.HIGH_FLOAT).precision>0&&s.getShaderPrecisionFormat(s.FRAGMENT_SHADER,s.HIGH_FLOAT).precision>0)return"highp";w="mediump"}return w==="mediump"&&s.getShaderPrecisionFormat(s.VERTEX_SHADER,s.MEDIUM_FLOAT).precision>0&&s.getShaderPrecisionFormat(s.FRAGMENT_SHADER,s.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let c=e.precision!==void 0?e.precision:"highp";const h=l(c);h!==c&&(console.warn("THREE.WebGLRenderer:",c,"not supported, using",h,"instead."),c=h);const u=e.logarithmicDepthBuffer===!0,d=e.reverseDepthBuffer===!0&&t.has("EXT_clip_control"),f=s.getParameter(s.MAX_TEXTURE_IMAGE_UNITS),y=s.getParameter(s.MAX_VERTEX_TEXTURE_IMAGE_UNITS),_=s.getParameter(s.MAX_TEXTURE_SIZE),g=s.getParameter(s.MAX_CUBE_MAP_TEXTURE_SIZE),p=s.getParameter(s.MAX_VERTEX_ATTRIBS),x=s.getParameter(s.MAX_VERTEX_UNIFORM_VECTORS),b=s.getParameter(s.MAX_VARYING_VECTORS),S=s.getParameter(s.MAX_FRAGMENT_UNIFORM_VECTORS),L=y>0,C=s.getParameter(s.MAX_SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:r,getMaxPrecision:l,textureFormatReadable:o,textureTypeReadable:a,precision:c,logarithmicDepthBuffer:u,reverseDepthBuffer:d,maxTextures:f,maxVertexTextures:y,maxTextureSize:_,maxCubemapSize:g,maxAttributes:p,maxVertexUniforms:x,maxVaryings:b,maxFragmentUniforms:S,vertexTextures:L,maxSamples:C}}function Xm(s){const t=this;let e=null,n=0,i=!1,r=!1;const o=new gi,a=new Gt,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(u,d){const f=u.length!==0||d||n!==0||i;return i=d,n=u.length,f},this.beginShadows=function(){r=!0,h(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(u,d){e=h(u,d,0)},this.setState=function(u,d,f){const y=u.clippingPlanes,_=u.clipIntersection,g=u.clipShadows,p=s.get(u);if(!i||y===null||y.length===0||r&&!g)r?h(null):c();else{const x=r?0:n,b=x*4;let S=p.clippingState||null;l.value=S,S=h(y,d,b,f);for(let L=0;L!==b;++L)S[L]=e[L];p.clippingState=S,this.numIntersection=_?this.numPlanes:0,this.numPlanes+=x}};function c(){l.value!==e&&(l.value=e,l.needsUpdate=n>0),t.numPlanes=n,t.numIntersection=0}function h(u,d,f,y){const _=u!==null?u.length:0;let g=null;if(_!==0){if(g=l.value,y!==!0||g===null){const p=f+_*4,x=d.matrixWorldInverse;a.getNormalMatrix(x),(g===null||g.length<p)&&(g=new Float32Array(p));for(let b=0,S=f;b!==_;++b,S+=4)o.copy(u[b]).applyMatrix4(x,a),o.normal.toArray(g,S),g[S+3]=o.constant}l.value=g,l.needsUpdate=!0}return t.numPlanes=_,t.numIntersection=0,g}}function Km(s){let t=new WeakMap;function e(o,a){return a===na?o.mapping=ss:a===ia&&(o.mapping=rs),o}function n(o){if(o&&o.isTexture){const a=o.mapping;if(a===na||a===ia)if(t.has(o)){const l=t.get(o).texture;return e(l,o.mapping)}else{const l=o.image;if(l&&l.height>0){const c=new nf(l.height);return c.fromEquirectangularTexture(s,o),t.set(o,c),o.addEventListener("dispose",i),e(c.texture,o.mapping)}else return null}}return o}function i(o){const a=o.target;a.removeEventListener("dispose",i);const l=t.get(a);l!==void 0&&(t.delete(a),l.dispose())}function r(){t=new WeakMap}return{get:n,dispose:r}}class Hh extends Bh{constructor(t=-1,e=1,n=1,i=-1,r=.1,o=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=t,this.right=e,this.top=n,this.bottom=i,this.near=r,this.far=o,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.left=t.left,this.right=t.right,this.top=t.top,this.bottom=t.bottom,this.near=t.near,this.far=t.far,this.zoom=t.zoom,this.view=t.view===null?null:Object.assign({},t.view),this}setViewOffset(t,e,n,i,r,o){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=n,this.view.offsetY=i,this.view.width=r,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=(this.right-this.left)/(2*this.zoom),e=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,i=(this.top+this.bottom)/2;let r=n-t,o=n+t,a=i+e,l=i-e;if(this.view!==null&&this.view.enabled){const c=(this.right-this.left)/this.view.fullWidth/this.zoom,h=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=c*this.view.offsetX,o=r+c*this.view.width,a-=h*this.view.offsetY,l=a-h*this.view.height}this.projectionMatrix.makeOrthographic(r,o,a,l,this.near,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const e=super.toJSON(t);return e.object.zoom=this.zoom,e.object.left=this.left,e.object.right=this.right,e.object.top=this.top,e.object.bottom=this.bottom,e.object.near=this.near,e.object.far=this.far,this.view!==null&&(e.object.view=Object.assign({},this.view)),e}}const qi=4,zl=[.125,.215,.35,.446,.526,.582],vi=20,So=new Hh,Gl=new Dt;let Mo=null,xo=0,Eo=0,bo=!1;const yi=(1+Math.sqrt(5))/2,Wi=1/yi,Hl=[new I(-yi,Wi,0),new I(yi,Wi,0),new I(-Wi,0,yi),new I(Wi,0,yi),new I(0,yi,-Wi),new I(0,yi,Wi),new I(-1,1,-1),new I(1,1,-1),new I(-1,1,1),new I(1,1,1)];class Wl{constructor(t){this._renderer=t,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(t,e=0,n=.1,i=100){Mo=this._renderer.getRenderTarget(),xo=this._renderer.getActiveCubeFace(),Eo=this._renderer.getActiveMipmapLevel(),bo=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(256);const r=this._allocateTargets();return r.depthBuffer=!0,this._sceneToCubeUV(t,n,i,r),e>0&&this._blur(r,0,0,e),this._applyPMREM(r),this._cleanup(r),r}fromEquirectangular(t,e=null){return this._fromTexture(t,e)}fromCubemap(t,e=null){return this._fromTexture(t,e)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=Kl(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=Xl(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(t){this._lodMax=Math.floor(Math.log2(t)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let t=0;t<this._lodPlanes.length;t++)this._lodPlanes[t].dispose()}_cleanup(t){this._renderer.setRenderTarget(Mo,xo,Eo),this._renderer.xr.enabled=bo,t.scissorTest=!1,hr(t,0,0,t.width,t.height)}_fromTexture(t,e){t.mapping===ss||t.mapping===rs?this._setSize(t.image.length===0?16:t.image[0].width||t.image[0].image.width):this._setSize(t.image.width/4),Mo=this._renderer.getRenderTarget(),xo=this._renderer.getActiveCubeFace(),Eo=this._renderer.getActiveMipmapLevel(),bo=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const n=e||this._allocateTargets();return this._textureToCubeUV(t,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){const t=3*Math.max(this._cubeSize,112),e=4*this._cubeSize,n={magFilter:En,minFilter:En,generateMipmaps:!1,type:Fs,format:mn,colorSpace:ds,depthBuffer:!1},i=Vl(t,e,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==t||this._pingPongRenderTarget.height!==e){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=Vl(t,e,n);const{_lodMax:r}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=Ym(r)),this._blurMaterial=qm(r,t,e)}return i}_compileMaterial(t){const e=new V(this._lodPlanes[0],t);this._renderer.compile(e,So)}_sceneToCubeUV(t,e,n,i){const a=new We(90,1,e,n),l=[1,-1,1,1,1,1],c=[1,1,1,-1,-1,-1],h=this._renderer,u=h.autoClear,d=h.toneMapping;h.getClearColor(Gl),h.toneMapping=si,h.autoClear=!1;const f=new Gs({name:"PMREM.Background",side:Be,depthWrite:!1,depthTest:!1}),y=new V(new st,f);let _=!1;const g=t.background;g?g.isColor&&(f.color.copy(g),t.background=null,_=!0):(f.color.copy(Gl),_=!0);for(let p=0;p<6;p++){const x=p%3;x===0?(a.up.set(0,l[p],0),a.lookAt(c[p],0,0)):x===1?(a.up.set(0,0,l[p]),a.lookAt(0,c[p],0)):(a.up.set(0,l[p],0),a.lookAt(0,0,c[p]));const b=this._cubeSize;hr(i,x*b,p>2?b:0,b,b),h.setRenderTarget(i),_&&h.render(y,a),h.render(t,a)}y.geometry.dispose(),y.material.dispose(),h.toneMapping=d,h.autoClear=u,t.background=g}_textureToCubeUV(t,e){const n=this._renderer,i=t.mapping===ss||t.mapping===rs;i?(this._cubemapMaterial===null&&(this._cubemapMaterial=Kl()),this._cubemapMaterial.uniforms.flipEnvMap.value=t.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=Xl());const r=i?this._cubemapMaterial:this._equirectMaterial,o=new V(this._lodPlanes[0],r),a=r.uniforms;a.envMap.value=t;const l=this._cubeSize;hr(e,0,0,3*l,2*l),n.setRenderTarget(e),n.render(o,So)}_applyPMREM(t){const e=this._renderer,n=e.autoClear;e.autoClear=!1;const i=this._lodPlanes.length;for(let r=1;r<i;r++){const o=Math.sqrt(this._sigmas[r]*this._sigmas[r]-this._sigmas[r-1]*this._sigmas[r-1]),a=Hl[(i-r-1)%Hl.length];this._blur(t,r-1,r,o,a)}e.autoClear=n}_blur(t,e,n,i,r){const o=this._pingPongRenderTarget;this._halfBlur(t,o,e,n,i,"latitudinal",r),this._halfBlur(o,t,n,n,i,"longitudinal",r)}_halfBlur(t,e,n,i,r,o,a){const l=this._renderer,c=this._blurMaterial;o!=="latitudinal"&&o!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");const h=3,u=new V(this._lodPlanes[i],c),d=c.uniforms,f=this._sizeLods[n]-1,y=isFinite(r)?Math.PI/(2*f):2*Math.PI/(2*vi-1),_=r/y,g=isFinite(r)?1+Math.floor(h*_):vi;g>vi&&console.warn(`sigmaRadians, ${r}, is too large and will clip, as it requested ${g} samples when the maximum is set to ${vi}`);const p=[];let x=0;for(let w=0;w<vi;++w){const P=w/_,T=Math.exp(-P*P/2);p.push(T),w===0?x+=T:w<g&&(x+=2*T)}for(let w=0;w<p.length;w++)p[w]=p[w]/x;d.envMap.value=t.texture,d.samples.value=g,d.weights.value=p,d.latitudinal.value=o==="latitudinal",a&&(d.poleAxis.value=a);const{_lodMax:b}=this;d.dTheta.value=y,d.mipInt.value=b-n;const S=this._sizeLods[i],L=3*S*(i>b-qi?i-b+qi:0),C=4*(this._cubeSize-S);hr(e,L,C,3*S,2*S),l.setRenderTarget(e),l.render(u,So)}}function Ym(s){const t=[],e=[],n=[];let i=s;const r=s-qi+1+zl.length;for(let o=0;o<r;o++){const a=Math.pow(2,i);e.push(a);let l=1/a;o>s-qi?l=zl[o-s+qi-1]:o===0&&(l=0),n.push(l);const c=1/(a-2),h=-c,u=1+c,d=[h,h,u,h,u,u,h,h,u,u,h,u],f=6,y=6,_=3,g=2,p=1,x=new Float32Array(_*y*f),b=new Float32Array(g*y*f),S=new Float32Array(p*y*f);for(let C=0;C<f;C++){const w=C%3*2/3-1,P=C>2?0:-1,T=[w,P,0,w+2/3,P,0,w+2/3,P+1,0,w,P,0,w+2/3,P+1,0,w,P+1,0];x.set(T,_*y*C),b.set(d,g*y*C);const E=[C,C,C,C,C,C];S.set(E,p*y*C)}const L=new Ke;L.setAttribute("position",new Qe(x,_)),L.setAttribute("uv",new Qe(b,g)),L.setAttribute("faceIndex",new Qe(S,p)),t.push(L),i>qi&&i--}return{lodPlanes:t,sizeLods:e,sigmas:n}}function Vl(s,t,e){const n=new Ai(s,t,e);return n.texture.mapping=Xr,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function hr(s,t,e,n,i){s.viewport.set(t,e,n,i),s.scissor.set(t,e,n,i)}function qm(s,t,e){const n=new Float32Array(vi),i=new I(0,1,0);return new wn({name:"SphericalGaussianBlur",defines:{n:vi,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/e,CUBEUV_MAX_MIP:`${s}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:n},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:i}},vertexShader:Za(),fragmentShader:`

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
		`,blending:ii,depthTest:!1,depthWrite:!1})}function Xl(){return new wn({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:Za(),fragmentShader:`

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
		`,blending:ii,depthTest:!1,depthWrite:!1})}function Kl(){return new wn({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:Za(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:ii,depthTest:!1,depthWrite:!1})}function Za(){return`

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
	`}function $m(s){let t=new WeakMap,e=null;function n(a){if(a&&a.isTexture){const l=a.mapping,c=l===na||l===ia,h=l===ss||l===rs;if(c||h){let u=t.get(a);const d=u!==void 0?u.texture.pmremVersion:0;if(a.isRenderTargetTexture&&a.pmremVersion!==d)return e===null&&(e=new Wl(s)),u=c?e.fromEquirectangular(a,u):e.fromCubemap(a,u),u.texture.pmremVersion=a.pmremVersion,t.set(a,u),u.texture;if(u!==void 0)return u.texture;{const f=a.image;return c&&f&&f.height>0||h&&f&&i(f)?(e===null&&(e=new Wl(s)),u=c?e.fromEquirectangular(a):e.fromCubemap(a),u.texture.pmremVersion=a.pmremVersion,t.set(a,u),a.addEventListener("dispose",r),u.texture):null}}}return a}function i(a){let l=0;const c=6;for(let h=0;h<c;h++)a[h]!==void 0&&l++;return l===c}function r(a){const l=a.target;l.removeEventListener("dispose",r);const c=t.get(l);c!==void 0&&(t.delete(l),c.dispose())}function o(){t=new WeakMap,e!==null&&(e.dispose(),e=null)}return{get:n,dispose:o}}function Zm(s){const t={};function e(n){if(t[n]!==void 0)return t[n];let i;switch(n){case"WEBGL_depth_texture":i=s.getExtension("WEBGL_depth_texture")||s.getExtension("MOZ_WEBGL_depth_texture")||s.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":i=s.getExtension("EXT_texture_filter_anisotropic")||s.getExtension("MOZ_EXT_texture_filter_anisotropic")||s.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":i=s.getExtension("WEBGL_compressed_texture_s3tc")||s.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||s.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":i=s.getExtension("WEBGL_compressed_texture_pvrtc")||s.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:i=s.getExtension(n)}return t[n]=i,i}return{has:function(n){return e(n)!==null},init:function(){e("EXT_color_buffer_float"),e("WEBGL_clip_cull_distance"),e("OES_texture_float_linear"),e("EXT_color_buffer_half_float"),e("WEBGL_multisampled_render_to_texture"),e("WEBGL_render_shared_exponent")},get:function(n){const i=e(n);return i===null&&Is("THREE.WebGLRenderer: "+n+" extension not supported."),i}}}function jm(s,t,e,n){const i={},r=new WeakMap;function o(u){const d=u.target;d.index!==null&&t.remove(d.index);for(const y in d.attributes)t.remove(d.attributes[y]);for(const y in d.morphAttributes){const _=d.morphAttributes[y];for(let g=0,p=_.length;g<p;g++)t.remove(_[g])}d.removeEventListener("dispose",o),delete i[d.id];const f=r.get(d);f&&(t.remove(f),r.delete(d)),n.releaseStatesOfGeometry(d),d.isInstancedBufferGeometry===!0&&delete d._maxInstanceCount,e.memory.geometries--}function a(u,d){return i[d.id]===!0||(d.addEventListener("dispose",o),i[d.id]=!0,e.memory.geometries++),d}function l(u){const d=u.attributes;for(const y in d)t.update(d[y],s.ARRAY_BUFFER);const f=u.morphAttributes;for(const y in f){const _=f[y];for(let g=0,p=_.length;g<p;g++)t.update(_[g],s.ARRAY_BUFFER)}}function c(u){const d=[],f=u.index,y=u.attributes.position;let _=0;if(f!==null){const x=f.array;_=f.version;for(let b=0,S=x.length;b<S;b+=3){const L=x[b+0],C=x[b+1],w=x[b+2];d.push(L,C,C,w,w,L)}}else if(y!==void 0){const x=y.array;_=y.version;for(let b=0,S=x.length/3-1;b<S;b+=3){const L=b+0,C=b+1,w=b+2;d.push(L,C,C,w,w,L)}}else return;const g=new(Ph(d)?Uh:kh)(d,1);g.version=_;const p=r.get(u);p&&t.remove(p),r.set(u,g)}function h(u){const d=r.get(u);if(d){const f=u.index;f!==null&&d.version<f.version&&c(u)}else c(u);return r.get(u)}return{get:a,update:l,getWireframeAttribute:h}}function Jm(s,t,e){let n;function i(d){n=d}let r,o;function a(d){r=d.type,o=d.bytesPerElement}function l(d,f){s.drawElements(n,f,r,d*o),e.update(f,n,1)}function c(d,f,y){y!==0&&(s.drawElementsInstanced(n,f,r,d*o,y),e.update(f,n,y))}function h(d,f,y){if(y===0)return;t.get("WEBGL_multi_draw").multiDrawElementsWEBGL(n,f,0,r,d,0,y);let g=0;for(let p=0;p<y;p++)g+=f[p];e.update(g,n,1)}function u(d,f,y,_){if(y===0)return;const g=t.get("WEBGL_multi_draw");if(g===null)for(let p=0;p<d.length;p++)c(d[p]/o,f[p],_[p]);else{g.multiDrawElementsInstancedWEBGL(n,f,0,r,d,0,_,0,y);let p=0;for(let x=0;x<y;x++)p+=f[x]*_[x];e.update(p,n,1)}}this.setMode=i,this.setIndex=a,this.render=l,this.renderInstances=c,this.renderMultiDraw=h,this.renderMultiDrawInstances=u}function Qm(s){const t={geometries:0,textures:0},e={frame:0,calls:0,triangles:0,points:0,lines:0};function n(r,o,a){switch(e.calls++,o){case s.TRIANGLES:e.triangles+=a*(r/3);break;case s.LINES:e.lines+=a*(r/2);break;case s.LINE_STRIP:e.lines+=a*(r-1);break;case s.LINE_LOOP:e.lines+=a*r;break;case s.POINTS:e.points+=a*r;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",o);break}}function i(){e.calls=0,e.triangles=0,e.points=0,e.lines=0}return{memory:t,render:e,programs:null,autoReset:!0,reset:i,update:n}}function tg(s,t,e){const n=new WeakMap,i=new oe;function r(o,a,l){const c=o.morphTargetInfluences,h=a.morphAttributes.position||a.morphAttributes.normal||a.morphAttributes.color,u=h!==void 0?h.length:0;let d=n.get(a);if(d===void 0||d.count!==u){let E=function(){P.dispose(),n.delete(a),a.removeEventListener("dispose",E)};var f=E;d!==void 0&&d.texture.dispose();const y=a.morphAttributes.position!==void 0,_=a.morphAttributes.normal!==void 0,g=a.morphAttributes.color!==void 0,p=a.morphAttributes.position||[],x=a.morphAttributes.normal||[],b=a.morphAttributes.color||[];let S=0;y===!0&&(S=1),_===!0&&(S=2),g===!0&&(S=3);let L=a.attributes.position.count*S,C=1;L>t.maxTextureSize&&(C=Math.ceil(L/t.maxTextureSize),L=t.maxTextureSize);const w=new Float32Array(L*C*4*u),P=new Oh(w,L,C,u);P.type=Fn,P.needsUpdate=!0;const T=S*4;for(let D=0;D<u;D++){const H=p[D],B=x[D],K=b[D],Z=L*C*4*D;for(let q=0;q<H.count;q++){const Q=q*T;y===!0&&(i.fromBufferAttribute(H,q),w[Z+Q+0]=i.x,w[Z+Q+1]=i.y,w[Z+Q+2]=i.z,w[Z+Q+3]=0),_===!0&&(i.fromBufferAttribute(B,q),w[Z+Q+4]=i.x,w[Z+Q+5]=i.y,w[Z+Q+6]=i.z,w[Z+Q+7]=0),g===!0&&(i.fromBufferAttribute(K,q),w[Z+Q+8]=i.x,w[Z+Q+9]=i.y,w[Z+Q+10]=i.z,w[Z+Q+11]=K.itemSize===4?i.w:1)}}d={count:u,texture:P,size:new Qt(L,C)},n.set(a,d),a.addEventListener("dispose",E)}if(o.isInstancedMesh===!0&&o.morphTexture!==null)l.getUniforms().setValue(s,"morphTexture",o.morphTexture,e);else{let y=0;for(let g=0;g<c.length;g++)y+=c[g];const _=a.morphTargetsRelative?1:1-y;l.getUniforms().setValue(s,"morphTargetBaseInfluence",_),l.getUniforms().setValue(s,"morphTargetInfluences",c)}l.getUniforms().setValue(s,"morphTargetsTexture",d.texture,e),l.getUniforms().setValue(s,"morphTargetsTextureSize",d.size)}return{update:r}}function eg(s,t,e,n){let i=new WeakMap;function r(l){const c=n.render.frame,h=l.geometry,u=t.get(l,h);if(i.get(u)!==c&&(t.update(u),i.set(u,c)),l.isInstancedMesh&&(l.hasEventListener("dispose",a)===!1&&l.addEventListener("dispose",a),i.get(l)!==c&&(e.update(l.instanceMatrix,s.ARRAY_BUFFER),l.instanceColor!==null&&e.update(l.instanceColor,s.ARRAY_BUFFER),i.set(l,c))),l.isSkinnedMesh){const d=l.skeleton;i.get(d)!==c&&(d.update(),i.set(d,c))}return u}function o(){i=new WeakMap}function a(l){const c=l.target;c.removeEventListener("dispose",a),e.remove(c.instanceMatrix),c.instanceColor!==null&&e.remove(c.instanceColor)}return{update:r,dispose:o}}class Wh extends ze{constructor(t,e,n,i,r,o,a,l,c,h=Ji){if(h!==Ji&&h!==as)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");n===void 0&&h===Ji&&(n=Ti),n===void 0&&h===as&&(n=os),super(null,i,r,o,a,l,h,n,c),this.isDepthTexture=!0,this.image={width:t,height:e},this.magFilter=a!==void 0?a:Je,this.minFilter=l!==void 0?l:Je,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(t){return super.copy(t),this.compareFunction=t.compareFunction,this}toJSON(t){const e=super.toJSON(t);return this.compareFunction!==null&&(e.compareFunction=this.compareFunction),e}}const Vh=new ze,Yl=new Wh(1,1),Xh=new Oh,Kh=new zd,Yh=new zh,ql=[],$l=[],Zl=new Float32Array(16),jl=new Float32Array(9),Jl=new Float32Array(4);function ms(s,t,e){const n=s[0];if(n<=0||n>0)return s;const i=t*e;let r=ql[i];if(r===void 0&&(r=new Float32Array(i),ql[i]=r),t!==0){n.toArray(r,0);for(let o=1,a=0;o!==t;++o)a+=e,s[o].toArray(r,a)}return r}function Me(s,t){if(s.length!==t.length)return!1;for(let e=0,n=s.length;e<n;e++)if(s[e]!==t[e])return!1;return!0}function xe(s,t){for(let e=0,n=t.length;e<n;e++)s[e]=t[e]}function $r(s,t){let e=$l[t];e===void 0&&(e=new Int32Array(t),$l[t]=e);for(let n=0;n!==t;++n)e[n]=s.allocateTextureUnit();return e}function ng(s,t){const e=this.cache;e[0]!==t&&(s.uniform1f(this.addr,t),e[0]=t)}function ig(s,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(s.uniform2f(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Me(e,t))return;s.uniform2fv(this.addr,t),xe(e,t)}}function sg(s,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(s.uniform3f(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else if(t.r!==void 0)(e[0]!==t.r||e[1]!==t.g||e[2]!==t.b)&&(s.uniform3f(this.addr,t.r,t.g,t.b),e[0]=t.r,e[1]=t.g,e[2]=t.b);else{if(Me(e,t))return;s.uniform3fv(this.addr,t),xe(e,t)}}function rg(s,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(s.uniform4f(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Me(e,t))return;s.uniform4fv(this.addr,t),xe(e,t)}}function og(s,t){const e=this.cache,n=t.elements;if(n===void 0){if(Me(e,t))return;s.uniformMatrix2fv(this.addr,!1,t),xe(e,t)}else{if(Me(e,n))return;Jl.set(n),s.uniformMatrix2fv(this.addr,!1,Jl),xe(e,n)}}function ag(s,t){const e=this.cache,n=t.elements;if(n===void 0){if(Me(e,t))return;s.uniformMatrix3fv(this.addr,!1,t),xe(e,t)}else{if(Me(e,n))return;jl.set(n),s.uniformMatrix3fv(this.addr,!1,jl),xe(e,n)}}function lg(s,t){const e=this.cache,n=t.elements;if(n===void 0){if(Me(e,t))return;s.uniformMatrix4fv(this.addr,!1,t),xe(e,t)}else{if(Me(e,n))return;Zl.set(n),s.uniformMatrix4fv(this.addr,!1,Zl),xe(e,n)}}function cg(s,t){const e=this.cache;e[0]!==t&&(s.uniform1i(this.addr,t),e[0]=t)}function hg(s,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(s.uniform2i(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Me(e,t))return;s.uniform2iv(this.addr,t),xe(e,t)}}function ug(s,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(s.uniform3i(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(Me(e,t))return;s.uniform3iv(this.addr,t),xe(e,t)}}function dg(s,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(s.uniform4i(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Me(e,t))return;s.uniform4iv(this.addr,t),xe(e,t)}}function fg(s,t){const e=this.cache;e[0]!==t&&(s.uniform1ui(this.addr,t),e[0]=t)}function pg(s,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(s.uniform2ui(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Me(e,t))return;s.uniform2uiv(this.addr,t),xe(e,t)}}function mg(s,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(s.uniform3ui(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(Me(e,t))return;s.uniform3uiv(this.addr,t),xe(e,t)}}function gg(s,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(s.uniform4ui(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Me(e,t))return;s.uniform4uiv(this.addr,t),xe(e,t)}}function yg(s,t,e){const n=this.cache,i=e.allocateTextureUnit();n[0]!==i&&(s.uniform1i(this.addr,i),n[0]=i);let r;this.type===s.SAMPLER_2D_SHADOW?(Yl.compareFunction=Dh,r=Yl):r=Vh,e.setTexture2D(t||r,i)}function _g(s,t,e){const n=this.cache,i=e.allocateTextureUnit();n[0]!==i&&(s.uniform1i(this.addr,i),n[0]=i),e.setTexture3D(t||Kh,i)}function vg(s,t,e){const n=this.cache,i=e.allocateTextureUnit();n[0]!==i&&(s.uniform1i(this.addr,i),n[0]=i),e.setTextureCube(t||Yh,i)}function Sg(s,t,e){const n=this.cache,i=e.allocateTextureUnit();n[0]!==i&&(s.uniform1i(this.addr,i),n[0]=i),e.setTexture2DArray(t||Xh,i)}function Mg(s){switch(s){case 5126:return ng;case 35664:return ig;case 35665:return sg;case 35666:return rg;case 35674:return og;case 35675:return ag;case 35676:return lg;case 5124:case 35670:return cg;case 35667:case 35671:return hg;case 35668:case 35672:return ug;case 35669:case 35673:return dg;case 5125:return fg;case 36294:return pg;case 36295:return mg;case 36296:return gg;case 35678:case 36198:case 36298:case 36306:case 35682:return yg;case 35679:case 36299:case 36307:return _g;case 35680:case 36300:case 36308:case 36293:return vg;case 36289:case 36303:case 36311:case 36292:return Sg}}function xg(s,t){s.uniform1fv(this.addr,t)}function Eg(s,t){const e=ms(t,this.size,2);s.uniform2fv(this.addr,e)}function bg(s,t){const e=ms(t,this.size,3);s.uniform3fv(this.addr,e)}function Tg(s,t){const e=ms(t,this.size,4);s.uniform4fv(this.addr,e)}function Ag(s,t){const e=ms(t,this.size,4);s.uniformMatrix2fv(this.addr,!1,e)}function Cg(s,t){const e=ms(t,this.size,9);s.uniformMatrix3fv(this.addr,!1,e)}function wg(s,t){const e=ms(t,this.size,16);s.uniformMatrix4fv(this.addr,!1,e)}function Rg(s,t){s.uniform1iv(this.addr,t)}function Ig(s,t){s.uniform2iv(this.addr,t)}function Dg(s,t){s.uniform3iv(this.addr,t)}function Pg(s,t){s.uniform4iv(this.addr,t)}function Lg(s,t){s.uniform1uiv(this.addr,t)}function Og(s,t){s.uniform2uiv(this.addr,t)}function Ng(s,t){s.uniform3uiv(this.addr,t)}function kg(s,t){s.uniform4uiv(this.addr,t)}function Ug(s,t,e){const n=this.cache,i=t.length,r=$r(e,i);Me(n,r)||(s.uniform1iv(this.addr,r),xe(n,r));for(let o=0;o!==i;++o)e.setTexture2D(t[o]||Vh,r[o])}function Fg(s,t,e){const n=this.cache,i=t.length,r=$r(e,i);Me(n,r)||(s.uniform1iv(this.addr,r),xe(n,r));for(let o=0;o!==i;++o)e.setTexture3D(t[o]||Kh,r[o])}function Bg(s,t,e){const n=this.cache,i=t.length,r=$r(e,i);Me(n,r)||(s.uniform1iv(this.addr,r),xe(n,r));for(let o=0;o!==i;++o)e.setTextureCube(t[o]||Yh,r[o])}function zg(s,t,e){const n=this.cache,i=t.length,r=$r(e,i);Me(n,r)||(s.uniform1iv(this.addr,r),xe(n,r));for(let o=0;o!==i;++o)e.setTexture2DArray(t[o]||Xh,r[o])}function Gg(s){switch(s){case 5126:return xg;case 35664:return Eg;case 35665:return bg;case 35666:return Tg;case 35674:return Ag;case 35675:return Cg;case 35676:return wg;case 5124:case 35670:return Rg;case 35667:case 35671:return Ig;case 35668:case 35672:return Dg;case 35669:case 35673:return Pg;case 5125:return Lg;case 36294:return Og;case 36295:return Ng;case 36296:return kg;case 35678:case 36198:case 36298:case 36306:case 35682:return Ug;case 35679:case 36299:case 36307:return Fg;case 35680:case 36300:case 36308:case 36293:return Bg;case 36289:case 36303:case 36311:case 36292:return zg}}class Hg{constructor(t,e,n){this.id=t,this.addr=n,this.cache=[],this.type=e.type,this.setValue=Mg(e.type)}}class Wg{constructor(t,e,n){this.id=t,this.addr=n,this.cache=[],this.type=e.type,this.size=e.size,this.setValue=Gg(e.type)}}class Vg{constructor(t){this.id=t,this.seq=[],this.map={}}setValue(t,e,n){const i=this.seq;for(let r=0,o=i.length;r!==o;++r){const a=i[r];a.setValue(t,e[a.id],n)}}}const To=/(\w+)(\])?(\[|\.)?/g;function Ql(s,t){s.seq.push(t),s.map[t.id]=t}function Xg(s,t,e){const n=s.name,i=n.length;for(To.lastIndex=0;;){const r=To.exec(n),o=To.lastIndex;let a=r[1];const l=r[2]==="]",c=r[3];if(l&&(a=a|0),c===void 0||c==="["&&o+2===i){Ql(e,c===void 0?new Hg(a,s,t):new Wg(a,s,t));break}else{let u=e.map[a];u===void 0&&(u=new Vg(a),Ql(e,u)),e=u}}}class Ir{constructor(t,e){this.seq=[],this.map={};const n=t.getProgramParameter(e,t.ACTIVE_UNIFORMS);for(let i=0;i<n;++i){const r=t.getActiveUniform(e,i),o=t.getUniformLocation(e,r.name);Xg(r,o,this)}}setValue(t,e,n,i){const r=this.map[e];r!==void 0&&r.setValue(t,n,i)}setOptional(t,e,n){const i=e[n];i!==void 0&&this.setValue(t,n,i)}static upload(t,e,n,i){for(let r=0,o=e.length;r!==o;++r){const a=e[r],l=n[a.id];l.needsUpdate!==!1&&a.setValue(t,l.value,i)}}static seqWithValue(t,e){const n=[];for(let i=0,r=t.length;i!==r;++i){const o=t[i];o.id in e&&n.push(o)}return n}}function tc(s,t,e){const n=s.createShader(t);return s.shaderSource(n,e),s.compileShader(n),n}const Kg=37297;let Yg=0;function qg(s,t){const e=s.split(`
`),n=[],i=Math.max(t-6,0),r=Math.min(t+6,e.length);for(let o=i;o<r;o++){const a=o+1;n.push(`${a===t?">":" "} ${a}: ${e[o]}`)}return n.join(`
`)}const ec=new Gt;function $g(s){jt._getMatrix(ec,jt.workingColorSpace,s);const t=`mat3( ${ec.elements.map(e=>e.toFixed(4))} )`;switch(jt.getTransfer(s)){case Kr:return[t,"LinearTransferOETF"];case re:return[t,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space: ",s),[t,"LinearTransferOETF"]}}function nc(s,t,e){const n=s.getShaderParameter(t,s.COMPILE_STATUS),i=s.getShaderInfoLog(t).trim();if(n&&i==="")return"";const r=/ERROR: 0:(\d+)/.exec(i);if(r){const o=parseInt(r[1]);return e.toUpperCase()+`

`+i+`

`+qg(s.getShaderSource(t),o)}else return i}function Zg(s,t){const e=$g(t);return[`vec4 ${s}( vec4 value ) {`,`	return ${e[1]}( vec4( value.rgb * ${e[0]}, value.a ) );`,"}"].join(`
`)}function jg(s,t){let e;switch(t){case Ju:e="Linear";break;case Qu:e="Reinhard";break;case td:e="Cineon";break;case ed:e="ACESFilmic";break;case id:e="AgX";break;case sd:e="Neutral";break;case nd:e="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",t),e="Linear"}return"vec3 "+s+"( vec3 color ) { return "+e+"ToneMapping( color ); }"}const ur=new I;function Jg(){jt.getLuminanceCoefficients(ur);const s=ur.x.toFixed(4),t=ur.y.toFixed(4),e=ur.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${s}, ${t}, ${e} );`,"	return dot( weights, rgb );","}"].join(`
`)}function Qg(s){return[s.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",s.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(Ds).join(`
`)}function t0(s){const t=[];for(const e in s){const n=s[e];n!==!1&&t.push("#define "+e+" "+n)}return t.join(`
`)}function e0(s,t){const e={},n=s.getProgramParameter(t,s.ACTIVE_ATTRIBUTES);for(let i=0;i<n;i++){const r=s.getActiveAttrib(t,i),o=r.name;let a=1;r.type===s.FLOAT_MAT2&&(a=2),r.type===s.FLOAT_MAT3&&(a=3),r.type===s.FLOAT_MAT4&&(a=4),e[o]={type:r.type,location:s.getAttribLocation(t,o),locationSize:a}}return e}function Ds(s){return s!==""}function ic(s,t){const e=t.numSpotLightShadows+t.numSpotLightMaps-t.numSpotLightShadowsWithMaps;return s.replace(/NUM_DIR_LIGHTS/g,t.numDirLights).replace(/NUM_SPOT_LIGHTS/g,t.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,t.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,e).replace(/NUM_RECT_AREA_LIGHTS/g,t.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,t.numPointLights).replace(/NUM_HEMI_LIGHTS/g,t.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,t.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,t.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,t.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,t.numPointLightShadows)}function sc(s,t){return s.replace(/NUM_CLIPPING_PLANES/g,t.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,t.numClippingPlanes-t.numClipIntersection)}const n0=/^[ \t]*#include +<([\w\d./]+)>/gm;function Da(s){return s.replace(n0,s0)}const i0=new Map;function s0(s,t){let e=Wt[t];if(e===void 0){const n=i0.get(t);if(n!==void 0)e=Wt[n],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',t,n);else throw new Error("Can not resolve #include <"+t+">")}return Da(e)}const r0=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function rc(s){return s.replace(r0,o0)}function o0(s,t,e,n){let i="";for(let r=parseInt(t);r<parseInt(e);r++)i+=n.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return i}function oc(s){let t=`precision ${s.precision} float;
	precision ${s.precision} int;
	precision ${s.precision} sampler2D;
	precision ${s.precision} samplerCube;
	precision ${s.precision} sampler3D;
	precision ${s.precision} sampler2DArray;
	precision ${s.precision} sampler2DShadow;
	precision ${s.precision} samplerCubeShadow;
	precision ${s.precision} sampler2DArrayShadow;
	precision ${s.precision} isampler2D;
	precision ${s.precision} isampler3D;
	precision ${s.precision} isamplerCube;
	precision ${s.precision} isampler2DArray;
	precision ${s.precision} usampler2D;
	precision ${s.precision} usampler3D;
	precision ${s.precision} usamplerCube;
	precision ${s.precision} usampler2DArray;
	`;return s.precision==="highp"?t+=`
#define HIGH_PRECISION`:s.precision==="mediump"?t+=`
#define MEDIUM_PRECISION`:s.precision==="lowp"&&(t+=`
#define LOW_PRECISION`),t}function a0(s){let t="SHADOWMAP_TYPE_BASIC";return s.shadowMapType===_h?t="SHADOWMAP_TYPE_PCF":s.shadowMapType===Du?t="SHADOWMAP_TYPE_PCF_SOFT":s.shadowMapType===Un&&(t="SHADOWMAP_TYPE_VSM"),t}function l0(s){let t="ENVMAP_TYPE_CUBE";if(s.envMap)switch(s.envMapMode){case ss:case rs:t="ENVMAP_TYPE_CUBE";break;case Xr:t="ENVMAP_TYPE_CUBE_UV";break}return t}function c0(s){let t="ENVMAP_MODE_REFLECTION";if(s.envMap)switch(s.envMapMode){case rs:t="ENVMAP_MODE_REFRACTION";break}return t}function h0(s){let t="ENVMAP_BLENDING_NONE";if(s.envMap)switch(s.combine){case Ga:t="ENVMAP_BLENDING_MULTIPLY";break;case Zu:t="ENVMAP_BLENDING_MIX";break;case ju:t="ENVMAP_BLENDING_ADD";break}return t}function u0(s){const t=s.envMapCubeUVHeight;if(t===null)return null;const e=Math.log2(t)-2,n=1/t;return{texelWidth:1/(3*Math.max(Math.pow(2,e),112)),texelHeight:n,maxMip:e}}function d0(s,t,e,n){const i=s.getContext(),r=e.defines;let o=e.vertexShader,a=e.fragmentShader;const l=a0(e),c=l0(e),h=c0(e),u=h0(e),d=u0(e),f=Qg(e),y=t0(r),_=i.createProgram();let g,p,x=e.glslVersion?"#version "+e.glslVersion+`
`:"";e.isRawShaderMaterial?(g=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,y].filter(Ds).join(`
`),g.length>0&&(g+=`
`),p=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,y].filter(Ds).join(`
`),p.length>0&&(p+=`
`)):(g=[oc(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,y,e.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",e.batching?"#define USE_BATCHING":"",e.batchingColor?"#define USE_BATCHING_COLOR":"",e.instancing?"#define USE_INSTANCING":"",e.instancingColor?"#define USE_INSTANCING_COLOR":"",e.instancingMorph?"#define USE_INSTANCING_MORPH":"",e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.map?"#define USE_MAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+h:"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.displacementMap?"#define USE_DISPLACEMENTMAP":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.mapUv?"#define MAP_UV "+e.mapUv:"",e.alphaMapUv?"#define ALPHAMAP_UV "+e.alphaMapUv:"",e.lightMapUv?"#define LIGHTMAP_UV "+e.lightMapUv:"",e.aoMapUv?"#define AOMAP_UV "+e.aoMapUv:"",e.emissiveMapUv?"#define EMISSIVEMAP_UV "+e.emissiveMapUv:"",e.bumpMapUv?"#define BUMPMAP_UV "+e.bumpMapUv:"",e.normalMapUv?"#define NORMALMAP_UV "+e.normalMapUv:"",e.displacementMapUv?"#define DISPLACEMENTMAP_UV "+e.displacementMapUv:"",e.metalnessMapUv?"#define METALNESSMAP_UV "+e.metalnessMapUv:"",e.roughnessMapUv?"#define ROUGHNESSMAP_UV "+e.roughnessMapUv:"",e.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+e.anisotropyMapUv:"",e.clearcoatMapUv?"#define CLEARCOATMAP_UV "+e.clearcoatMapUv:"",e.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+e.clearcoatNormalMapUv:"",e.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+e.clearcoatRoughnessMapUv:"",e.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+e.iridescenceMapUv:"",e.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+e.iridescenceThicknessMapUv:"",e.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+e.sheenColorMapUv:"",e.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+e.sheenRoughnessMapUv:"",e.specularMapUv?"#define SPECULARMAP_UV "+e.specularMapUv:"",e.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+e.specularColorMapUv:"",e.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+e.specularIntensityMapUv:"",e.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+e.transmissionMapUv:"",e.thicknessMapUv?"#define THICKNESSMAP_UV "+e.thicknessMapUv:"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.flatShading?"#define FLAT_SHADED":"",e.skinning?"#define USE_SKINNING":"",e.morphTargets?"#define USE_MORPHTARGETS":"",e.morphNormals&&e.flatShading===!1?"#define USE_MORPHNORMALS":"",e.morphColors?"#define USE_MORPHCOLORS":"",e.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+e.morphTextureStride:"",e.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+e.morphTargetsCount:"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+l:"",e.sizeAttenuation?"#define USE_SIZEATTENUATION":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",e.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(Ds).join(`
`),p=[oc(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,y,e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",e.map?"#define USE_MAP":"",e.matcap?"#define USE_MATCAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+c:"",e.envMap?"#define "+h:"",e.envMap?"#define "+u:"",d?"#define CUBEUV_TEXEL_WIDTH "+d.texelWidth:"",d?"#define CUBEUV_TEXEL_HEIGHT "+d.texelHeight:"",d?"#define CUBEUV_MAX_MIP "+d.maxMip+".0":"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoat?"#define USE_CLEARCOAT":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.dispersion?"#define USE_DISPERSION":"",e.iridescence?"#define USE_IRIDESCENCE":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaTest?"#define USE_ALPHATEST":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.sheen?"#define USE_SHEEN":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors||e.instancingColor||e.batchingColor?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.gradientMap?"#define USE_GRADIENTMAP":"",e.flatShading?"#define FLAT_SHADED":"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+l:"",e.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",e.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",e.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",e.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",e.toneMapping!==si?"#define TONE_MAPPING":"",e.toneMapping!==si?Wt.tonemapping_pars_fragment:"",e.toneMapping!==si?jg("toneMapping",e.toneMapping):"",e.dithering?"#define DITHERING":"",e.opaque?"#define OPAQUE":"",Wt.colorspace_pars_fragment,Zg("linearToOutputTexel",e.outputColorSpace),Jg(),e.useDepthPacking?"#define DEPTH_PACKING "+e.depthPacking:"",`
`].filter(Ds).join(`
`)),o=Da(o),o=ic(o,e),o=sc(o,e),a=Da(a),a=ic(a,e),a=sc(a,e),o=rc(o),a=rc(a),e.isRawShaderMaterial!==!0&&(x=`#version 300 es
`,g=[f,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+g,p=["#define varying in",e.glslVersion===_l?"":"layout(location = 0) out highp vec4 pc_fragColor;",e.glslVersion===_l?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+p);const b=x+g+o,S=x+p+a,L=tc(i,i.VERTEX_SHADER,b),C=tc(i,i.FRAGMENT_SHADER,S);i.attachShader(_,L),i.attachShader(_,C),e.index0AttributeName!==void 0?i.bindAttribLocation(_,0,e.index0AttributeName):e.morphTargets===!0&&i.bindAttribLocation(_,0,"position"),i.linkProgram(_);function w(D){if(s.debug.checkShaderErrors){const H=i.getProgramInfoLog(_).trim(),B=i.getShaderInfoLog(L).trim(),K=i.getShaderInfoLog(C).trim();let Z=!0,q=!0;if(i.getProgramParameter(_,i.LINK_STATUS)===!1)if(Z=!1,typeof s.debug.onShaderError=="function")s.debug.onShaderError(i,_,L,C);else{const Q=nc(i,L,"vertex"),W=nc(i,C,"fragment");console.error("THREE.WebGLProgram: Shader Error "+i.getError()+" - VALIDATE_STATUS "+i.getProgramParameter(_,i.VALIDATE_STATUS)+`

Material Name: `+D.name+`
Material Type: `+D.type+`

Program Info Log: `+H+`
`+Q+`
`+W)}else H!==""?console.warn("THREE.WebGLProgram: Program Info Log:",H):(B===""||K==="")&&(q=!1);q&&(D.diagnostics={runnable:Z,programLog:H,vertexShader:{log:B,prefix:g},fragmentShader:{log:K,prefix:p}})}i.deleteShader(L),i.deleteShader(C),P=new Ir(i,_),T=e0(i,_)}let P;this.getUniforms=function(){return P===void 0&&w(this),P};let T;this.getAttributes=function(){return T===void 0&&w(this),T};let E=e.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return E===!1&&(E=i.getProgramParameter(_,Kg)),E},this.destroy=function(){n.releaseStatesOfProgram(this),i.deleteProgram(_),this.program=void 0},this.type=e.shaderType,this.name=e.shaderName,this.id=Yg++,this.cacheKey=t,this.usedTimes=1,this.program=_,this.vertexShader=L,this.fragmentShader=C,this}let f0=0;class p0{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(t){const e=t.vertexShader,n=t.fragmentShader,i=this._getShaderStage(e),r=this._getShaderStage(n),o=this._getShaderCacheForMaterial(t);return o.has(i)===!1&&(o.add(i),i.usedTimes++),o.has(r)===!1&&(o.add(r),r.usedTimes++),this}remove(t){const e=this.materialCache.get(t);for(const n of e)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(t),this}getVertexShaderID(t){return this._getShaderStage(t.vertexShader).id}getFragmentShaderID(t){return this._getShaderStage(t.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(t){const e=this.materialCache;let n=e.get(t);return n===void 0&&(n=new Set,e.set(t,n)),n}_getShaderStage(t){const e=this.shaderCache;let n=e.get(t);return n===void 0&&(n=new m0(t),e.set(t,n)),n}}class m0{constructor(t){this.id=f0++,this.code=t,this.usedTimes=0}}function g0(s,t,e,n,i,r,o){const a=new $a,l=new p0,c=new Set,h=[],u=i.logarithmicDepthBuffer,d=i.vertexTextures;let f=i.precision;const y={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function _(T){return c.add(T),T===0?"uv":`uv${T}`}function g(T,E,D,H,B){const K=H.fog,Z=B.geometry,q=T.isMeshStandardMaterial?H.environment:null,Q=(T.isMeshStandardMaterial?e:t).get(T.envMap||q),W=Q&&Q.mapping===Xr?Q.image.height:null,rt=y[T.type];T.precision!==null&&(f=i.getMaxPrecision(T.precision),f!==T.precision&&console.warn("THREE.WebGLProgram.getParameters:",T.precision,"not supported, using",f,"instead."));const ht=Z.morphAttributes.position||Z.morphAttributes.normal||Z.morphAttributes.color,yt=ht!==void 0?ht.length:0;let kt=0;Z.morphAttributes.position!==void 0&&(kt=1),Z.morphAttributes.normal!==void 0&&(kt=2),Z.morphAttributes.color!==void 0&&(kt=3);let $t,$,et,gt;if(rt){const ie=Mn[rt];$t=ie.vertexShader,$=ie.fragmentShader}else $t=T.vertexShader,$=T.fragmentShader,l.update(T),et=l.getVertexShaderID(T),gt=l.getFragmentShaderID(T);const ot=s.getRenderTarget(),Et=s.state.buffers.depth.getReversed(),xt=B.isInstancedMesh===!0,Vt=B.isBatchedMesh===!0,ce=!!T.map,Xt=!!T.matcap,he=!!Q,R=!!T.aoMap,Ft=!!T.lightMap,Lt=!!T.bumpMap,_t=!!T.normalMap,Rt=!!T.displacementMap,ne=!!T.emissiveMap,lt=!!T.metalnessMap,A=!!T.roughnessMap,v=T.anisotropy>0,U=T.clearcoat>0,Y=T.dispersion>0,J=T.iridescence>0,j=T.sheen>0,Ct=T.transmission>0,ut=v&&!!T.anisotropyMap,vt=U&&!!T.clearcoatMap,Zt=U&&!!T.clearcoatNormalMap,nt=U&&!!T.clearcoatRoughnessMap,St=J&&!!T.iridescenceMap,Pt=J&&!!T.iridescenceThicknessMap,Ot=j&&!!T.sheenColorMap,Mt=j&&!!T.sheenRoughnessMap,qt=!!T.specularMap,Ht=!!T.specularColorMap,ue=!!T.specularIntensityMap,O=Ct&&!!T.transmissionMap,ct=Ct&&!!T.thicknessMap,X=!!T.gradientMap,tt=!!T.alphaMap,pt=T.alphaTest>0,dt=!!T.alphaHash,Bt=!!T.extensions;let ye=si;T.toneMapped&&(ot===null||ot.isXRRenderTarget===!0)&&(ye=s.toneMapping);const Ie={shaderID:rt,shaderType:T.type,shaderName:T.name,vertexShader:$t,fragmentShader:$,defines:T.defines,customVertexShaderID:et,customFragmentShaderID:gt,isRawShaderMaterial:T.isRawShaderMaterial===!0,glslVersion:T.glslVersion,precision:f,batching:Vt,batchingColor:Vt&&B._colorsTexture!==null,instancing:xt,instancingColor:xt&&B.instanceColor!==null,instancingMorph:xt&&B.morphTexture!==null,supportsVertexTextures:d,outputColorSpace:ot===null?s.outputColorSpace:ot.isXRRenderTarget===!0?ot.texture.colorSpace:ds,alphaToCoverage:!!T.alphaToCoverage,map:ce,matcap:Xt,envMap:he,envMapMode:he&&Q.mapping,envMapCubeUVHeight:W,aoMap:R,lightMap:Ft,bumpMap:Lt,normalMap:_t,displacementMap:d&&Rt,emissiveMap:ne,normalMapObjectSpace:_t&&T.normalMapType===ld,normalMapTangentSpace:_t&&T.normalMapType===Ih,metalnessMap:lt,roughnessMap:A,anisotropy:v,anisotropyMap:ut,clearcoat:U,clearcoatMap:vt,clearcoatNormalMap:Zt,clearcoatRoughnessMap:nt,dispersion:Y,iridescence:J,iridescenceMap:St,iridescenceThicknessMap:Pt,sheen:j,sheenColorMap:Ot,sheenRoughnessMap:Mt,specularMap:qt,specularColorMap:Ht,specularIntensityMap:ue,transmission:Ct,transmissionMap:O,thicknessMap:ct,gradientMap:X,opaque:T.transparent===!1&&T.blending===ji&&T.alphaToCoverage===!1,alphaMap:tt,alphaTest:pt,alphaHash:dt,combine:T.combine,mapUv:ce&&_(T.map.channel),aoMapUv:R&&_(T.aoMap.channel),lightMapUv:Ft&&_(T.lightMap.channel),bumpMapUv:Lt&&_(T.bumpMap.channel),normalMapUv:_t&&_(T.normalMap.channel),displacementMapUv:Rt&&_(T.displacementMap.channel),emissiveMapUv:ne&&_(T.emissiveMap.channel),metalnessMapUv:lt&&_(T.metalnessMap.channel),roughnessMapUv:A&&_(T.roughnessMap.channel),anisotropyMapUv:ut&&_(T.anisotropyMap.channel),clearcoatMapUv:vt&&_(T.clearcoatMap.channel),clearcoatNormalMapUv:Zt&&_(T.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:nt&&_(T.clearcoatRoughnessMap.channel),iridescenceMapUv:St&&_(T.iridescenceMap.channel),iridescenceThicknessMapUv:Pt&&_(T.iridescenceThicknessMap.channel),sheenColorMapUv:Ot&&_(T.sheenColorMap.channel),sheenRoughnessMapUv:Mt&&_(T.sheenRoughnessMap.channel),specularMapUv:qt&&_(T.specularMap.channel),specularColorMapUv:Ht&&_(T.specularColorMap.channel),specularIntensityMapUv:ue&&_(T.specularIntensityMap.channel),transmissionMapUv:O&&_(T.transmissionMap.channel),thicknessMapUv:ct&&_(T.thicknessMap.channel),alphaMapUv:tt&&_(T.alphaMap.channel),vertexTangents:!!Z.attributes.tangent&&(_t||v),vertexColors:T.vertexColors,vertexAlphas:T.vertexColors===!0&&!!Z.attributes.color&&Z.attributes.color.itemSize===4,pointsUvs:B.isPoints===!0&&!!Z.attributes.uv&&(ce||tt),fog:!!K,useFog:T.fog===!0,fogExp2:!!K&&K.isFogExp2,flatShading:T.flatShading===!0,sizeAttenuation:T.sizeAttenuation===!0,logarithmicDepthBuffer:u,reverseDepthBuffer:Et,skinning:B.isSkinnedMesh===!0,morphTargets:Z.morphAttributes.position!==void 0,morphNormals:Z.morphAttributes.normal!==void 0,morphColors:Z.morphAttributes.color!==void 0,morphTargetsCount:yt,morphTextureStride:kt,numDirLights:E.directional.length,numPointLights:E.point.length,numSpotLights:E.spot.length,numSpotLightMaps:E.spotLightMap.length,numRectAreaLights:E.rectArea.length,numHemiLights:E.hemi.length,numDirLightShadows:E.directionalShadowMap.length,numPointLightShadows:E.pointShadowMap.length,numSpotLightShadows:E.spotShadowMap.length,numSpotLightShadowsWithMaps:E.numSpotLightShadowsWithMaps,numLightProbes:E.numLightProbes,numClippingPlanes:o.numPlanes,numClipIntersection:o.numIntersection,dithering:T.dithering,shadowMapEnabled:s.shadowMap.enabled&&D.length>0,shadowMapType:s.shadowMap.type,toneMapping:ye,decodeVideoTexture:ce&&T.map.isVideoTexture===!0&&jt.getTransfer(T.map.colorSpace)===re,decodeVideoTextureEmissive:ne&&T.emissiveMap.isVideoTexture===!0&&jt.getTransfer(T.emissiveMap.colorSpace)===re,premultipliedAlpha:T.premultipliedAlpha,doubleSided:T.side===Ve,flipSided:T.side===Be,useDepthPacking:T.depthPacking>=0,depthPacking:T.depthPacking||0,index0AttributeName:T.index0AttributeName,extensionClipCullDistance:Bt&&T.extensions.clipCullDistance===!0&&n.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(Bt&&T.extensions.multiDraw===!0||Vt)&&n.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:n.has("KHR_parallel_shader_compile"),customProgramCacheKey:T.customProgramCacheKey()};return Ie.vertexUv1s=c.has(1),Ie.vertexUv2s=c.has(2),Ie.vertexUv3s=c.has(3),c.clear(),Ie}function p(T){const E=[];if(T.shaderID?E.push(T.shaderID):(E.push(T.customVertexShaderID),E.push(T.customFragmentShaderID)),T.defines!==void 0)for(const D in T.defines)E.push(D),E.push(T.defines[D]);return T.isRawShaderMaterial===!1&&(x(E,T),b(E,T),E.push(s.outputColorSpace)),E.push(T.customProgramCacheKey),E.join()}function x(T,E){T.push(E.precision),T.push(E.outputColorSpace),T.push(E.envMapMode),T.push(E.envMapCubeUVHeight),T.push(E.mapUv),T.push(E.alphaMapUv),T.push(E.lightMapUv),T.push(E.aoMapUv),T.push(E.bumpMapUv),T.push(E.normalMapUv),T.push(E.displacementMapUv),T.push(E.emissiveMapUv),T.push(E.metalnessMapUv),T.push(E.roughnessMapUv),T.push(E.anisotropyMapUv),T.push(E.clearcoatMapUv),T.push(E.clearcoatNormalMapUv),T.push(E.clearcoatRoughnessMapUv),T.push(E.iridescenceMapUv),T.push(E.iridescenceThicknessMapUv),T.push(E.sheenColorMapUv),T.push(E.sheenRoughnessMapUv),T.push(E.specularMapUv),T.push(E.specularColorMapUv),T.push(E.specularIntensityMapUv),T.push(E.transmissionMapUv),T.push(E.thicknessMapUv),T.push(E.combine),T.push(E.fogExp2),T.push(E.sizeAttenuation),T.push(E.morphTargetsCount),T.push(E.morphAttributeCount),T.push(E.numDirLights),T.push(E.numPointLights),T.push(E.numSpotLights),T.push(E.numSpotLightMaps),T.push(E.numHemiLights),T.push(E.numRectAreaLights),T.push(E.numDirLightShadows),T.push(E.numPointLightShadows),T.push(E.numSpotLightShadows),T.push(E.numSpotLightShadowsWithMaps),T.push(E.numLightProbes),T.push(E.shadowMapType),T.push(E.toneMapping),T.push(E.numClippingPlanes),T.push(E.numClipIntersection),T.push(E.depthPacking)}function b(T,E){a.disableAll(),E.supportsVertexTextures&&a.enable(0),E.instancing&&a.enable(1),E.instancingColor&&a.enable(2),E.instancingMorph&&a.enable(3),E.matcap&&a.enable(4),E.envMap&&a.enable(5),E.normalMapObjectSpace&&a.enable(6),E.normalMapTangentSpace&&a.enable(7),E.clearcoat&&a.enable(8),E.iridescence&&a.enable(9),E.alphaTest&&a.enable(10),E.vertexColors&&a.enable(11),E.vertexAlphas&&a.enable(12),E.vertexUv1s&&a.enable(13),E.vertexUv2s&&a.enable(14),E.vertexUv3s&&a.enable(15),E.vertexTangents&&a.enable(16),E.anisotropy&&a.enable(17),E.alphaHash&&a.enable(18),E.batching&&a.enable(19),E.dispersion&&a.enable(20),E.batchingColor&&a.enable(21),T.push(a.mask),a.disableAll(),E.fog&&a.enable(0),E.useFog&&a.enable(1),E.flatShading&&a.enable(2),E.logarithmicDepthBuffer&&a.enable(3),E.reverseDepthBuffer&&a.enable(4),E.skinning&&a.enable(5),E.morphTargets&&a.enable(6),E.morphNormals&&a.enable(7),E.morphColors&&a.enable(8),E.premultipliedAlpha&&a.enable(9),E.shadowMapEnabled&&a.enable(10),E.doubleSided&&a.enable(11),E.flipSided&&a.enable(12),E.useDepthPacking&&a.enable(13),E.dithering&&a.enable(14),E.transmission&&a.enable(15),E.sheen&&a.enable(16),E.opaque&&a.enable(17),E.pointsUvs&&a.enable(18),E.decodeVideoTexture&&a.enable(19),E.decodeVideoTextureEmissive&&a.enable(20),E.alphaToCoverage&&a.enable(21),T.push(a.mask)}function S(T){const E=y[T.type];let D;if(E){const H=Mn[E];D=Jd.clone(H.uniforms)}else D=T.uniforms;return D}function L(T,E){let D;for(let H=0,B=h.length;H<B;H++){const K=h[H];if(K.cacheKey===E){D=K,++D.usedTimes;break}}return D===void 0&&(D=new d0(s,E,T,r),h.push(D)),D}function C(T){if(--T.usedTimes===0){const E=h.indexOf(T);h[E]=h[h.length-1],h.pop(),T.destroy()}}function w(T){l.remove(T)}function P(){l.dispose()}return{getParameters:g,getProgramCacheKey:p,getUniforms:S,acquireProgram:L,releaseProgram:C,releaseShaderCache:w,programs:h,dispose:P}}function y0(){let s=new WeakMap;function t(o){return s.has(o)}function e(o){let a=s.get(o);return a===void 0&&(a={},s.set(o,a)),a}function n(o){s.delete(o)}function i(o,a,l){s.get(o)[a]=l}function r(){s=new WeakMap}return{has:t,get:e,remove:n,update:i,dispose:r}}function _0(s,t){return s.groupOrder!==t.groupOrder?s.groupOrder-t.groupOrder:s.renderOrder!==t.renderOrder?s.renderOrder-t.renderOrder:s.material.id!==t.material.id?s.material.id-t.material.id:s.z!==t.z?s.z-t.z:s.id-t.id}function ac(s,t){return s.groupOrder!==t.groupOrder?s.groupOrder-t.groupOrder:s.renderOrder!==t.renderOrder?s.renderOrder-t.renderOrder:s.z!==t.z?t.z-s.z:s.id-t.id}function lc(){const s=[];let t=0;const e=[],n=[],i=[];function r(){t=0,e.length=0,n.length=0,i.length=0}function o(u,d,f,y,_,g){let p=s[t];return p===void 0?(p={id:u.id,object:u,geometry:d,material:f,groupOrder:y,renderOrder:u.renderOrder,z:_,group:g},s[t]=p):(p.id=u.id,p.object=u,p.geometry=d,p.material=f,p.groupOrder=y,p.renderOrder=u.renderOrder,p.z=_,p.group=g),t++,p}function a(u,d,f,y,_,g){const p=o(u,d,f,y,_,g);f.transmission>0?n.push(p):f.transparent===!0?i.push(p):e.push(p)}function l(u,d,f,y,_,g){const p=o(u,d,f,y,_,g);f.transmission>0?n.unshift(p):f.transparent===!0?i.unshift(p):e.unshift(p)}function c(u,d){e.length>1&&e.sort(u||_0),n.length>1&&n.sort(d||ac),i.length>1&&i.sort(d||ac)}function h(){for(let u=t,d=s.length;u<d;u++){const f=s[u];if(f.id===null)break;f.id=null,f.object=null,f.geometry=null,f.material=null,f.group=null}}return{opaque:e,transmissive:n,transparent:i,init:r,push:a,unshift:l,finish:h,sort:c}}function v0(){let s=new WeakMap;function t(n,i){const r=s.get(n);let o;return r===void 0?(o=new lc,s.set(n,[o])):i>=r.length?(o=new lc,r.push(o)):o=r[i],o}function e(){s=new WeakMap}return{get:t,dispose:e}}function S0(){const s={};return{get:function(t){if(s[t.id]!==void 0)return s[t.id];let e;switch(t.type){case"DirectionalLight":e={direction:new I,color:new Dt};break;case"SpotLight":e={position:new I,direction:new I,color:new Dt,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":e={position:new I,color:new Dt,distance:0,decay:0};break;case"HemisphereLight":e={direction:new I,skyColor:new Dt,groundColor:new Dt};break;case"RectAreaLight":e={color:new Dt,position:new I,halfWidth:new I,halfHeight:new I};break}return s[t.id]=e,e}}}function M0(){const s={};return{get:function(t){if(s[t.id]!==void 0)return s[t.id];let e;switch(t.type){case"DirectionalLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Qt};break;case"SpotLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Qt};break;case"PointLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Qt,shadowCameraNear:1,shadowCameraFar:1e3};break}return s[t.id]=e,e}}}let x0=0;function E0(s,t){return(t.castShadow?2:0)-(s.castShadow?2:0)+(t.map?1:0)-(s.map?1:0)}function b0(s){const t=new S0,e=M0(),n={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let c=0;c<9;c++)n.probe.push(new I);const i=new I,r=new le,o=new le;function a(c){let h=0,u=0,d=0;for(let T=0;T<9;T++)n.probe[T].set(0,0,0);let f=0,y=0,_=0,g=0,p=0,x=0,b=0,S=0,L=0,C=0,w=0;c.sort(E0);for(let T=0,E=c.length;T<E;T++){const D=c[T],H=D.color,B=D.intensity,K=D.distance,Z=D.shadow&&D.shadow.map?D.shadow.map.texture:null;if(D.isAmbientLight)h+=H.r*B,u+=H.g*B,d+=H.b*B;else if(D.isLightProbe){for(let q=0;q<9;q++)n.probe[q].addScaledVector(D.sh.coefficients[q],B);w++}else if(D.isDirectionalLight){const q=t.get(D);if(q.color.copy(D.color).multiplyScalar(D.intensity),D.castShadow){const Q=D.shadow,W=e.get(D);W.shadowIntensity=Q.intensity,W.shadowBias=Q.bias,W.shadowNormalBias=Q.normalBias,W.shadowRadius=Q.radius,W.shadowMapSize=Q.mapSize,n.directionalShadow[f]=W,n.directionalShadowMap[f]=Z,n.directionalShadowMatrix[f]=D.shadow.matrix,x++}n.directional[f]=q,f++}else if(D.isSpotLight){const q=t.get(D);q.position.setFromMatrixPosition(D.matrixWorld),q.color.copy(H).multiplyScalar(B),q.distance=K,q.coneCos=Math.cos(D.angle),q.penumbraCos=Math.cos(D.angle*(1-D.penumbra)),q.decay=D.decay,n.spot[_]=q;const Q=D.shadow;if(D.map&&(n.spotLightMap[L]=D.map,L++,Q.updateMatrices(D),D.castShadow&&C++),n.spotLightMatrix[_]=Q.matrix,D.castShadow){const W=e.get(D);W.shadowIntensity=Q.intensity,W.shadowBias=Q.bias,W.shadowNormalBias=Q.normalBias,W.shadowRadius=Q.radius,W.shadowMapSize=Q.mapSize,n.spotShadow[_]=W,n.spotShadowMap[_]=Z,S++}_++}else if(D.isRectAreaLight){const q=t.get(D);q.color.copy(H).multiplyScalar(B),q.halfWidth.set(D.width*.5,0,0),q.halfHeight.set(0,D.height*.5,0),n.rectArea[g]=q,g++}else if(D.isPointLight){const q=t.get(D);if(q.color.copy(D.color).multiplyScalar(D.intensity),q.distance=D.distance,q.decay=D.decay,D.castShadow){const Q=D.shadow,W=e.get(D);W.shadowIntensity=Q.intensity,W.shadowBias=Q.bias,W.shadowNormalBias=Q.normalBias,W.shadowRadius=Q.radius,W.shadowMapSize=Q.mapSize,W.shadowCameraNear=Q.camera.near,W.shadowCameraFar=Q.camera.far,n.pointShadow[y]=W,n.pointShadowMap[y]=Z,n.pointShadowMatrix[y]=D.shadow.matrix,b++}n.point[y]=q,y++}else if(D.isHemisphereLight){const q=t.get(D);q.skyColor.copy(D.color).multiplyScalar(B),q.groundColor.copy(D.groundColor).multiplyScalar(B),n.hemi[p]=q,p++}}g>0&&(s.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=at.LTC_FLOAT_1,n.rectAreaLTC2=at.LTC_FLOAT_2):(n.rectAreaLTC1=at.LTC_HALF_1,n.rectAreaLTC2=at.LTC_HALF_2)),n.ambient[0]=h,n.ambient[1]=u,n.ambient[2]=d;const P=n.hash;(P.directionalLength!==f||P.pointLength!==y||P.spotLength!==_||P.rectAreaLength!==g||P.hemiLength!==p||P.numDirectionalShadows!==x||P.numPointShadows!==b||P.numSpotShadows!==S||P.numSpotMaps!==L||P.numLightProbes!==w)&&(n.directional.length=f,n.spot.length=_,n.rectArea.length=g,n.point.length=y,n.hemi.length=p,n.directionalShadow.length=x,n.directionalShadowMap.length=x,n.pointShadow.length=b,n.pointShadowMap.length=b,n.spotShadow.length=S,n.spotShadowMap.length=S,n.directionalShadowMatrix.length=x,n.pointShadowMatrix.length=b,n.spotLightMatrix.length=S+L-C,n.spotLightMap.length=L,n.numSpotLightShadowsWithMaps=C,n.numLightProbes=w,P.directionalLength=f,P.pointLength=y,P.spotLength=_,P.rectAreaLength=g,P.hemiLength=p,P.numDirectionalShadows=x,P.numPointShadows=b,P.numSpotShadows=S,P.numSpotMaps=L,P.numLightProbes=w,n.version=x0++)}function l(c,h){let u=0,d=0,f=0,y=0,_=0;const g=h.matrixWorldInverse;for(let p=0,x=c.length;p<x;p++){const b=c[p];if(b.isDirectionalLight){const S=n.directional[u];S.direction.setFromMatrixPosition(b.matrixWorld),i.setFromMatrixPosition(b.target.matrixWorld),S.direction.sub(i),S.direction.transformDirection(g),u++}else if(b.isSpotLight){const S=n.spot[f];S.position.setFromMatrixPosition(b.matrixWorld),S.position.applyMatrix4(g),S.direction.setFromMatrixPosition(b.matrixWorld),i.setFromMatrixPosition(b.target.matrixWorld),S.direction.sub(i),S.direction.transformDirection(g),f++}else if(b.isRectAreaLight){const S=n.rectArea[y];S.position.setFromMatrixPosition(b.matrixWorld),S.position.applyMatrix4(g),o.identity(),r.copy(b.matrixWorld),r.premultiply(g),o.extractRotation(r),S.halfWidth.set(b.width*.5,0,0),S.halfHeight.set(0,b.height*.5,0),S.halfWidth.applyMatrix4(o),S.halfHeight.applyMatrix4(o),y++}else if(b.isPointLight){const S=n.point[d];S.position.setFromMatrixPosition(b.matrixWorld),S.position.applyMatrix4(g),d++}else if(b.isHemisphereLight){const S=n.hemi[_];S.direction.setFromMatrixPosition(b.matrixWorld),S.direction.transformDirection(g),_++}}}return{setup:a,setupView:l,state:n}}function cc(s){const t=new b0(s),e=[],n=[];function i(h){c.camera=h,e.length=0,n.length=0}function r(h){e.push(h)}function o(h){n.push(h)}function a(){t.setup(e)}function l(h){t.setupView(e,h)}const c={lightsArray:e,shadowsArray:n,camera:null,lights:t,transmissionRenderTarget:{}};return{init:i,state:c,setupLights:a,setupLightsView:l,pushLight:r,pushShadow:o}}function T0(s){let t=new WeakMap;function e(i,r=0){const o=t.get(i);let a;return o===void 0?(a=new cc(s),t.set(i,[a])):r>=o.length?(a=new cc(s),o.push(a)):a=o[r],a}function n(){t=new WeakMap}return{get:e,dispose:n}}class A0 extends Oe{static get type(){return"MeshDepthMaterial"}constructor(t){super(),this.isMeshDepthMaterial=!0,this.depthPacking=od,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(t)}copy(t){return super.copy(t),this.depthPacking=t.depthPacking,this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this}}class C0 extends Oe{static get type(){return"MeshDistanceMaterial"}constructor(t){super(),this.isMeshDistanceMaterial=!0,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(t)}copy(t){return super.copy(t),this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this}}const w0=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,R0=`uniform sampler2D shadow_pass;
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
}`;function I0(s,t,e){let n=new qr;const i=new Qt,r=new Qt,o=new oe,a=new A0({depthPacking:ad}),l=new C0,c={},h=e.maxTextureSize,u={[gn]:Be,[Be]:gn,[Ve]:Ve},d=new wn({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new Qt},radius:{value:4}},vertexShader:w0,fragmentShader:R0}),f=d.clone();f.defines.HORIZONTAL_PASS=1;const y=new Ke;y.setAttribute("position",new Qe(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const _=new V(y,d),g=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=_h;let p=this.type;this.render=function(C,w,P){if(g.enabled===!1||g.autoUpdate===!1&&g.needsUpdate===!1||C.length===0)return;const T=s.getRenderTarget(),E=s.getActiveCubeFace(),D=s.getActiveMipmapLevel(),H=s.state;H.setBlending(ii),H.buffers.color.setClear(1,1,1,1),H.buffers.depth.setTest(!0),H.setScissorTest(!1);const B=p!==Un&&this.type===Un,K=p===Un&&this.type!==Un;for(let Z=0,q=C.length;Z<q;Z++){const Q=C[Z],W=Q.shadow;if(W===void 0){console.warn("THREE.WebGLShadowMap:",Q,"has no shadow.");continue}if(W.autoUpdate===!1&&W.needsUpdate===!1)continue;i.copy(W.mapSize);const rt=W.getFrameExtents();if(i.multiply(rt),r.copy(W.mapSize),(i.x>h||i.y>h)&&(i.x>h&&(r.x=Math.floor(h/rt.x),i.x=r.x*rt.x,W.mapSize.x=r.x),i.y>h&&(r.y=Math.floor(h/rt.y),i.y=r.y*rt.y,W.mapSize.y=r.y)),W.map===null||B===!0||K===!0){const yt=this.type!==Un?{minFilter:Je,magFilter:Je}:{};W.map!==null&&W.map.dispose(),W.map=new Ai(i.x,i.y,yt),W.map.texture.name=Q.name+".shadowMap",W.camera.updateProjectionMatrix()}s.setRenderTarget(W.map),s.clear();const ht=W.getViewportCount();for(let yt=0;yt<ht;yt++){const kt=W.getViewport(yt);o.set(r.x*kt.x,r.y*kt.y,r.x*kt.z,r.y*kt.w),H.viewport(o),W.updateMatrices(Q,yt),n=W.getFrustum(),S(w,P,W.camera,Q,this.type)}W.isPointLightShadow!==!0&&this.type===Un&&x(W,P),W.needsUpdate=!1}p=this.type,g.needsUpdate=!1,s.setRenderTarget(T,E,D)};function x(C,w){const P=t.update(_);d.defines.VSM_SAMPLES!==C.blurSamples&&(d.defines.VSM_SAMPLES=C.blurSamples,f.defines.VSM_SAMPLES=C.blurSamples,d.needsUpdate=!0,f.needsUpdate=!0),C.mapPass===null&&(C.mapPass=new Ai(i.x,i.y)),d.uniforms.shadow_pass.value=C.map.texture,d.uniforms.resolution.value=C.mapSize,d.uniforms.radius.value=C.radius,s.setRenderTarget(C.mapPass),s.clear(),s.renderBufferDirect(w,null,P,d,_,null),f.uniforms.shadow_pass.value=C.mapPass.texture,f.uniforms.resolution.value=C.mapSize,f.uniforms.radius.value=C.radius,s.setRenderTarget(C.map),s.clear(),s.renderBufferDirect(w,null,P,f,_,null)}function b(C,w,P,T){let E=null;const D=P.isPointLight===!0?C.customDistanceMaterial:C.customDepthMaterial;if(D!==void 0)E=D;else if(E=P.isPointLight===!0?l:a,s.localClippingEnabled&&w.clipShadows===!0&&Array.isArray(w.clippingPlanes)&&w.clippingPlanes.length!==0||w.displacementMap&&w.displacementScale!==0||w.alphaMap&&w.alphaTest>0||w.map&&w.alphaTest>0){const H=E.uuid,B=w.uuid;let K=c[H];K===void 0&&(K={},c[H]=K);let Z=K[B];Z===void 0&&(Z=E.clone(),K[B]=Z,w.addEventListener("dispose",L)),E=Z}if(E.visible=w.visible,E.wireframe=w.wireframe,T===Un?E.side=w.shadowSide!==null?w.shadowSide:w.side:E.side=w.shadowSide!==null?w.shadowSide:u[w.side],E.alphaMap=w.alphaMap,E.alphaTest=w.alphaTest,E.map=w.map,E.clipShadows=w.clipShadows,E.clippingPlanes=w.clippingPlanes,E.clipIntersection=w.clipIntersection,E.displacementMap=w.displacementMap,E.displacementScale=w.displacementScale,E.displacementBias=w.displacementBias,E.wireframeLinewidth=w.wireframeLinewidth,E.linewidth=w.linewidth,P.isPointLight===!0&&E.isMeshDistanceMaterial===!0){const H=s.properties.get(E);H.light=P}return E}function S(C,w,P,T,E){if(C.visible===!1)return;if(C.layers.test(w.layers)&&(C.isMesh||C.isLine||C.isPoints)&&(C.castShadow||C.receiveShadow&&E===Un)&&(!C.frustumCulled||n.intersectsObject(C))){C.modelViewMatrix.multiplyMatrices(P.matrixWorldInverse,C.matrixWorld);const B=t.update(C),K=C.material;if(Array.isArray(K)){const Z=B.groups;for(let q=0,Q=Z.length;q<Q;q++){const W=Z[q],rt=K[W.materialIndex];if(rt&&rt.visible){const ht=b(C,rt,T,E);C.onBeforeShadow(s,C,w,P,B,ht,W),s.renderBufferDirect(P,null,B,ht,C,W),C.onAfterShadow(s,C,w,P,B,ht,W)}}}else if(K.visible){const Z=b(C,K,T,E);C.onBeforeShadow(s,C,w,P,B,Z,null),s.renderBufferDirect(P,null,B,Z,C,null),C.onAfterShadow(s,C,w,P,B,Z,null)}}const H=C.children;for(let B=0,K=H.length;B<K;B++)S(H[B],w,P,T,E)}function L(C){C.target.removeEventListener("dispose",L);for(const P in c){const T=c[P],E=C.target.uuid;E in T&&(T[E].dispose(),delete T[E])}}}const D0={[$o]:Zo,[jo]:ta,[Jo]:ea,[is]:Qo,[Zo]:$o,[ta]:jo,[ea]:Jo,[Qo]:is};function P0(s,t){function e(){let O=!1;const ct=new oe;let X=null;const tt=new oe(0,0,0,0);return{setMask:function(pt){X!==pt&&!O&&(s.colorMask(pt,pt,pt,pt),X=pt)},setLocked:function(pt){O=pt},setClear:function(pt,dt,Bt,ye,Ie){Ie===!0&&(pt*=ye,dt*=ye,Bt*=ye),ct.set(pt,dt,Bt,ye),tt.equals(ct)===!1&&(s.clearColor(pt,dt,Bt,ye),tt.copy(ct))},reset:function(){O=!1,X=null,tt.set(-1,0,0,0)}}}function n(){let O=!1,ct=!1,X=null,tt=null,pt=null;return{setReversed:function(dt){if(ct!==dt){const Bt=t.get("EXT_clip_control");ct?Bt.clipControlEXT(Bt.LOWER_LEFT_EXT,Bt.ZERO_TO_ONE_EXT):Bt.clipControlEXT(Bt.LOWER_LEFT_EXT,Bt.NEGATIVE_ONE_TO_ONE_EXT);const ye=pt;pt=null,this.setClear(ye)}ct=dt},getReversed:function(){return ct},setTest:function(dt){dt?ot(s.DEPTH_TEST):Et(s.DEPTH_TEST)},setMask:function(dt){X!==dt&&!O&&(s.depthMask(dt),X=dt)},setFunc:function(dt){if(ct&&(dt=D0[dt]),tt!==dt){switch(dt){case $o:s.depthFunc(s.NEVER);break;case Zo:s.depthFunc(s.ALWAYS);break;case jo:s.depthFunc(s.LESS);break;case is:s.depthFunc(s.LEQUAL);break;case Jo:s.depthFunc(s.EQUAL);break;case Qo:s.depthFunc(s.GEQUAL);break;case ta:s.depthFunc(s.GREATER);break;case ea:s.depthFunc(s.NOTEQUAL);break;default:s.depthFunc(s.LEQUAL)}tt=dt}},setLocked:function(dt){O=dt},setClear:function(dt){pt!==dt&&(ct&&(dt=1-dt),s.clearDepth(dt),pt=dt)},reset:function(){O=!1,X=null,tt=null,pt=null,ct=!1}}}function i(){let O=!1,ct=null,X=null,tt=null,pt=null,dt=null,Bt=null,ye=null,Ie=null;return{setTest:function(ie){O||(ie?ot(s.STENCIL_TEST):Et(s.STENCIL_TEST))},setMask:function(ie){ct!==ie&&!O&&(s.stencilMask(ie),ct=ie)},setFunc:function(ie,cn,In){(X!==ie||tt!==cn||pt!==In)&&(s.stencilFunc(ie,cn,In),X=ie,tt=cn,pt=In)},setOp:function(ie,cn,In){(dt!==ie||Bt!==cn||ye!==In)&&(s.stencilOp(ie,cn,In),dt=ie,Bt=cn,ye=In)},setLocked:function(ie){O=ie},setClear:function(ie){Ie!==ie&&(s.clearStencil(ie),Ie=ie)},reset:function(){O=!1,ct=null,X=null,tt=null,pt=null,dt=null,Bt=null,ye=null,Ie=null}}}const r=new e,o=new n,a=new i,l=new WeakMap,c=new WeakMap;let h={},u={},d=new WeakMap,f=[],y=null,_=!1,g=null,p=null,x=null,b=null,S=null,L=null,C=null,w=new Dt(0,0,0),P=0,T=!1,E=null,D=null,H=null,B=null,K=null;const Z=s.getParameter(s.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let q=!1,Q=0;const W=s.getParameter(s.VERSION);W.indexOf("WebGL")!==-1?(Q=parseFloat(/^WebGL (\d)/.exec(W)[1]),q=Q>=1):W.indexOf("OpenGL ES")!==-1&&(Q=parseFloat(/^OpenGL ES (\d)/.exec(W)[1]),q=Q>=2);let rt=null,ht={};const yt=s.getParameter(s.SCISSOR_BOX),kt=s.getParameter(s.VIEWPORT),$t=new oe().fromArray(yt),$=new oe().fromArray(kt);function et(O,ct,X,tt){const pt=new Uint8Array(4),dt=s.createTexture();s.bindTexture(O,dt),s.texParameteri(O,s.TEXTURE_MIN_FILTER,s.NEAREST),s.texParameteri(O,s.TEXTURE_MAG_FILTER,s.NEAREST);for(let Bt=0;Bt<X;Bt++)O===s.TEXTURE_3D||O===s.TEXTURE_2D_ARRAY?s.texImage3D(ct,0,s.RGBA,1,1,tt,0,s.RGBA,s.UNSIGNED_BYTE,pt):s.texImage2D(ct+Bt,0,s.RGBA,1,1,0,s.RGBA,s.UNSIGNED_BYTE,pt);return dt}const gt={};gt[s.TEXTURE_2D]=et(s.TEXTURE_2D,s.TEXTURE_2D,1),gt[s.TEXTURE_CUBE_MAP]=et(s.TEXTURE_CUBE_MAP,s.TEXTURE_CUBE_MAP_POSITIVE_X,6),gt[s.TEXTURE_2D_ARRAY]=et(s.TEXTURE_2D_ARRAY,s.TEXTURE_2D_ARRAY,1,1),gt[s.TEXTURE_3D]=et(s.TEXTURE_3D,s.TEXTURE_3D,1,1),r.setClear(0,0,0,1),o.setClear(1),a.setClear(0),ot(s.DEPTH_TEST),o.setFunc(is),Lt(!1),_t(fl),ot(s.CULL_FACE),R(ii);function ot(O){h[O]!==!0&&(s.enable(O),h[O]=!0)}function Et(O){h[O]!==!1&&(s.disable(O),h[O]=!1)}function xt(O,ct){return u[O]!==ct?(s.bindFramebuffer(O,ct),u[O]=ct,O===s.DRAW_FRAMEBUFFER&&(u[s.FRAMEBUFFER]=ct),O===s.FRAMEBUFFER&&(u[s.DRAW_FRAMEBUFFER]=ct),!0):!1}function Vt(O,ct){let X=f,tt=!1;if(O){X=d.get(ct),X===void 0&&(X=[],d.set(ct,X));const pt=O.textures;if(X.length!==pt.length||X[0]!==s.COLOR_ATTACHMENT0){for(let dt=0,Bt=pt.length;dt<Bt;dt++)X[dt]=s.COLOR_ATTACHMENT0+dt;X.length=pt.length,tt=!0}}else X[0]!==s.BACK&&(X[0]=s.BACK,tt=!0);tt&&s.drawBuffers(X)}function ce(O){return y!==O?(s.useProgram(O),y=O,!0):!1}const Xt={[_i]:s.FUNC_ADD,[Lu]:s.FUNC_SUBTRACT,[Ou]:s.FUNC_REVERSE_SUBTRACT};Xt[Nu]=s.MIN,Xt[ku]=s.MAX;const he={[Uu]:s.ZERO,[Fu]:s.ONE,[Bu]:s.SRC_COLOR,[Yo]:s.SRC_ALPHA,[Xu]:s.SRC_ALPHA_SATURATE,[Wu]:s.DST_COLOR,[Gu]:s.DST_ALPHA,[zu]:s.ONE_MINUS_SRC_COLOR,[qo]:s.ONE_MINUS_SRC_ALPHA,[Vu]:s.ONE_MINUS_DST_COLOR,[Hu]:s.ONE_MINUS_DST_ALPHA,[Ku]:s.CONSTANT_COLOR,[Yu]:s.ONE_MINUS_CONSTANT_COLOR,[qu]:s.CONSTANT_ALPHA,[$u]:s.ONE_MINUS_CONSTANT_ALPHA};function R(O,ct,X,tt,pt,dt,Bt,ye,Ie,ie){if(O===ii){_===!0&&(Et(s.BLEND),_=!1);return}if(_===!1&&(ot(s.BLEND),_=!0),O!==Pu){if(O!==g||ie!==T){if((p!==_i||S!==_i)&&(s.blendEquation(s.FUNC_ADD),p=_i,S=_i),ie)switch(O){case ji:s.blendFuncSeparate(s.ONE,s.ONE_MINUS_SRC_ALPHA,s.ONE,s.ONE_MINUS_SRC_ALPHA);break;case Ko:s.blendFunc(s.ONE,s.ONE);break;case pl:s.blendFuncSeparate(s.ZERO,s.ONE_MINUS_SRC_COLOR,s.ZERO,s.ONE);break;case ml:s.blendFuncSeparate(s.ZERO,s.SRC_COLOR,s.ZERO,s.SRC_ALPHA);break;default:console.error("THREE.WebGLState: Invalid blending: ",O);break}else switch(O){case ji:s.blendFuncSeparate(s.SRC_ALPHA,s.ONE_MINUS_SRC_ALPHA,s.ONE,s.ONE_MINUS_SRC_ALPHA);break;case Ko:s.blendFunc(s.SRC_ALPHA,s.ONE);break;case pl:s.blendFuncSeparate(s.ZERO,s.ONE_MINUS_SRC_COLOR,s.ZERO,s.ONE);break;case ml:s.blendFunc(s.ZERO,s.SRC_COLOR);break;default:console.error("THREE.WebGLState: Invalid blending: ",O);break}x=null,b=null,L=null,C=null,w.set(0,0,0),P=0,g=O,T=ie}return}pt=pt||ct,dt=dt||X,Bt=Bt||tt,(ct!==p||pt!==S)&&(s.blendEquationSeparate(Xt[ct],Xt[pt]),p=ct,S=pt),(X!==x||tt!==b||dt!==L||Bt!==C)&&(s.blendFuncSeparate(he[X],he[tt],he[dt],he[Bt]),x=X,b=tt,L=dt,C=Bt),(ye.equals(w)===!1||Ie!==P)&&(s.blendColor(ye.r,ye.g,ye.b,Ie),w.copy(ye),P=Ie),g=O,T=!1}function Ft(O,ct){O.side===Ve?Et(s.CULL_FACE):ot(s.CULL_FACE);let X=O.side===Be;ct&&(X=!X),Lt(X),O.blending===ji&&O.transparent===!1?R(ii):R(O.blending,O.blendEquation,O.blendSrc,O.blendDst,O.blendEquationAlpha,O.blendSrcAlpha,O.blendDstAlpha,O.blendColor,O.blendAlpha,O.premultipliedAlpha),o.setFunc(O.depthFunc),o.setTest(O.depthTest),o.setMask(O.depthWrite),r.setMask(O.colorWrite);const tt=O.stencilWrite;a.setTest(tt),tt&&(a.setMask(O.stencilWriteMask),a.setFunc(O.stencilFunc,O.stencilRef,O.stencilFuncMask),a.setOp(O.stencilFail,O.stencilZFail,O.stencilZPass)),ne(O.polygonOffset,O.polygonOffsetFactor,O.polygonOffsetUnits),O.alphaToCoverage===!0?ot(s.SAMPLE_ALPHA_TO_COVERAGE):Et(s.SAMPLE_ALPHA_TO_COVERAGE)}function Lt(O){E!==O&&(O?s.frontFace(s.CW):s.frontFace(s.CCW),E=O)}function _t(O){O!==Ru?(ot(s.CULL_FACE),O!==D&&(O===fl?s.cullFace(s.BACK):O===Iu?s.cullFace(s.FRONT):s.cullFace(s.FRONT_AND_BACK))):Et(s.CULL_FACE),D=O}function Rt(O){O!==H&&(q&&s.lineWidth(O),H=O)}function ne(O,ct,X){O?(ot(s.POLYGON_OFFSET_FILL),(B!==ct||K!==X)&&(s.polygonOffset(ct,X),B=ct,K=X)):Et(s.POLYGON_OFFSET_FILL)}function lt(O){O?ot(s.SCISSOR_TEST):Et(s.SCISSOR_TEST)}function A(O){O===void 0&&(O=s.TEXTURE0+Z-1),rt!==O&&(s.activeTexture(O),rt=O)}function v(O,ct,X){X===void 0&&(rt===null?X=s.TEXTURE0+Z-1:X=rt);let tt=ht[X];tt===void 0&&(tt={type:void 0,texture:void 0},ht[X]=tt),(tt.type!==O||tt.texture!==ct)&&(rt!==X&&(s.activeTexture(X),rt=X),s.bindTexture(O,ct||gt[O]),tt.type=O,tt.texture=ct)}function U(){const O=ht[rt];O!==void 0&&O.type!==void 0&&(s.bindTexture(O.type,null),O.type=void 0,O.texture=void 0)}function Y(){try{s.compressedTexImage2D.apply(s,arguments)}catch(O){console.error("THREE.WebGLState:",O)}}function J(){try{s.compressedTexImage3D.apply(s,arguments)}catch(O){console.error("THREE.WebGLState:",O)}}function j(){try{s.texSubImage2D.apply(s,arguments)}catch(O){console.error("THREE.WebGLState:",O)}}function Ct(){try{s.texSubImage3D.apply(s,arguments)}catch(O){console.error("THREE.WebGLState:",O)}}function ut(){try{s.compressedTexSubImage2D.apply(s,arguments)}catch(O){console.error("THREE.WebGLState:",O)}}function vt(){try{s.compressedTexSubImage3D.apply(s,arguments)}catch(O){console.error("THREE.WebGLState:",O)}}function Zt(){try{s.texStorage2D.apply(s,arguments)}catch(O){console.error("THREE.WebGLState:",O)}}function nt(){try{s.texStorage3D.apply(s,arguments)}catch(O){console.error("THREE.WebGLState:",O)}}function St(){try{s.texImage2D.apply(s,arguments)}catch(O){console.error("THREE.WebGLState:",O)}}function Pt(){try{s.texImage3D.apply(s,arguments)}catch(O){console.error("THREE.WebGLState:",O)}}function Ot(O){$t.equals(O)===!1&&(s.scissor(O.x,O.y,O.z,O.w),$t.copy(O))}function Mt(O){$.equals(O)===!1&&(s.viewport(O.x,O.y,O.z,O.w),$.copy(O))}function qt(O,ct){let X=c.get(ct);X===void 0&&(X=new WeakMap,c.set(ct,X));let tt=X.get(O);tt===void 0&&(tt=s.getUniformBlockIndex(ct,O.name),X.set(O,tt))}function Ht(O,ct){const tt=c.get(ct).get(O);l.get(ct)!==tt&&(s.uniformBlockBinding(ct,tt,O.__bindingPointIndex),l.set(ct,tt))}function ue(){s.disable(s.BLEND),s.disable(s.CULL_FACE),s.disable(s.DEPTH_TEST),s.disable(s.POLYGON_OFFSET_FILL),s.disable(s.SCISSOR_TEST),s.disable(s.STENCIL_TEST),s.disable(s.SAMPLE_ALPHA_TO_COVERAGE),s.blendEquation(s.FUNC_ADD),s.blendFunc(s.ONE,s.ZERO),s.blendFuncSeparate(s.ONE,s.ZERO,s.ONE,s.ZERO),s.blendColor(0,0,0,0),s.colorMask(!0,!0,!0,!0),s.clearColor(0,0,0,0),s.depthMask(!0),s.depthFunc(s.LESS),o.setReversed(!1),s.clearDepth(1),s.stencilMask(4294967295),s.stencilFunc(s.ALWAYS,0,4294967295),s.stencilOp(s.KEEP,s.KEEP,s.KEEP),s.clearStencil(0),s.cullFace(s.BACK),s.frontFace(s.CCW),s.polygonOffset(0,0),s.activeTexture(s.TEXTURE0),s.bindFramebuffer(s.FRAMEBUFFER,null),s.bindFramebuffer(s.DRAW_FRAMEBUFFER,null),s.bindFramebuffer(s.READ_FRAMEBUFFER,null),s.useProgram(null),s.lineWidth(1),s.scissor(0,0,s.canvas.width,s.canvas.height),s.viewport(0,0,s.canvas.width,s.canvas.height),h={},rt=null,ht={},u={},d=new WeakMap,f=[],y=null,_=!1,g=null,p=null,x=null,b=null,S=null,L=null,C=null,w=new Dt(0,0,0),P=0,T=!1,E=null,D=null,H=null,B=null,K=null,$t.set(0,0,s.canvas.width,s.canvas.height),$.set(0,0,s.canvas.width,s.canvas.height),r.reset(),o.reset(),a.reset()}return{buffers:{color:r,depth:o,stencil:a},enable:ot,disable:Et,bindFramebuffer:xt,drawBuffers:Vt,useProgram:ce,setBlending:R,setMaterial:Ft,setFlipSided:Lt,setCullFace:_t,setLineWidth:Rt,setPolygonOffset:ne,setScissorTest:lt,activeTexture:A,bindTexture:v,unbindTexture:U,compressedTexImage2D:Y,compressedTexImage3D:J,texImage2D:St,texImage3D:Pt,updateUBOMapping:qt,uniformBlockBinding:Ht,texStorage2D:Zt,texStorage3D:nt,texSubImage2D:j,texSubImage3D:Ct,compressedTexSubImage2D:ut,compressedTexSubImage3D:vt,scissor:Ot,viewport:Mt,reset:ue}}function hc(s,t,e,n){const i=L0(n);switch(e){case Eh:return s*t;case Th:return s*t;case Ah:return s*t*2;case Ch:return s*t/i.components*i.byteLength;case Xa:return s*t/i.components*i.byteLength;case wh:return s*t*2/i.components*i.byteLength;case Ka:return s*t*2/i.components*i.byteLength;case bh:return s*t*3/i.components*i.byteLength;case mn:return s*t*4/i.components*i.byteLength;case Ya:return s*t*4/i.components*i.byteLength;case Tr:case Ar:return Math.floor((s+3)/4)*Math.floor((t+3)/4)*8;case Cr:case wr:return Math.floor((s+3)/4)*Math.floor((t+3)/4)*16;case oa:case la:return Math.max(s,16)*Math.max(t,8)/4;case ra:case aa:return Math.max(s,8)*Math.max(t,8)/2;case ca:case ha:return Math.floor((s+3)/4)*Math.floor((t+3)/4)*8;case ua:return Math.floor((s+3)/4)*Math.floor((t+3)/4)*16;case da:return Math.floor((s+3)/4)*Math.floor((t+3)/4)*16;case fa:return Math.floor((s+4)/5)*Math.floor((t+3)/4)*16;case pa:return Math.floor((s+4)/5)*Math.floor((t+4)/5)*16;case ma:return Math.floor((s+5)/6)*Math.floor((t+4)/5)*16;case ga:return Math.floor((s+5)/6)*Math.floor((t+5)/6)*16;case ya:return Math.floor((s+7)/8)*Math.floor((t+4)/5)*16;case _a:return Math.floor((s+7)/8)*Math.floor((t+5)/6)*16;case va:return Math.floor((s+7)/8)*Math.floor((t+7)/8)*16;case Sa:return Math.floor((s+9)/10)*Math.floor((t+4)/5)*16;case Ma:return Math.floor((s+9)/10)*Math.floor((t+5)/6)*16;case xa:return Math.floor((s+9)/10)*Math.floor((t+7)/8)*16;case Ea:return Math.floor((s+9)/10)*Math.floor((t+9)/10)*16;case ba:return Math.floor((s+11)/12)*Math.floor((t+9)/10)*16;case Ta:return Math.floor((s+11)/12)*Math.floor((t+11)/12)*16;case Rr:case Aa:case Ca:return Math.ceil(s/4)*Math.ceil(t/4)*16;case Rh:case wa:return Math.ceil(s/4)*Math.ceil(t/4)*8;case Ra:case Ia:return Math.ceil(s/4)*Math.ceil(t/4)*16}throw new Error(`Unable to determine texture byte length for ${e} format.`)}function L0(s){switch(s){case Wn:case Sh:return{byteLength:1,components:1};case ks:case Mh:case Fs:return{byteLength:2,components:1};case Wa:case Va:return{byteLength:2,components:4};case Ti:case Ha:case Fn:return{byteLength:4,components:1};case xh:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${s}.`)}function O0(s,t,e,n,i,r,o){const a=t.has("WEBGL_multisampled_render_to_texture")?t.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),c=new Qt,h=new WeakMap;let u;const d=new WeakMap;let f=!1;try{f=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function y(A,v){return f?new OffscreenCanvas(A,v):Nr("canvas")}function _(A,v,U){let Y=1;const J=lt(A);if((J.width>U||J.height>U)&&(Y=U/Math.max(J.width,J.height)),Y<1)if(typeof HTMLImageElement<"u"&&A instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&A instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&A instanceof ImageBitmap||typeof VideoFrame<"u"&&A instanceof VideoFrame){const j=Math.floor(Y*J.width),Ct=Math.floor(Y*J.height);u===void 0&&(u=y(j,Ct));const ut=v?y(j,Ct):u;return ut.width=j,ut.height=Ct,ut.getContext("2d").drawImage(A,0,0,j,Ct),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+J.width+"x"+J.height+") to ("+j+"x"+Ct+")."),ut}else return"data"in A&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+J.width+"x"+J.height+")."),A;return A}function g(A){return A.generateMipmaps}function p(A){s.generateMipmap(A)}function x(A){return A.isWebGLCubeRenderTarget?s.TEXTURE_CUBE_MAP:A.isWebGL3DRenderTarget?s.TEXTURE_3D:A.isWebGLArrayRenderTarget||A.isCompressedArrayTexture?s.TEXTURE_2D_ARRAY:s.TEXTURE_2D}function b(A,v,U,Y,J=!1){if(A!==null){if(s[A]!==void 0)return s[A];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+A+"'")}let j=v;if(v===s.RED&&(U===s.FLOAT&&(j=s.R32F),U===s.HALF_FLOAT&&(j=s.R16F),U===s.UNSIGNED_BYTE&&(j=s.R8)),v===s.RED_INTEGER&&(U===s.UNSIGNED_BYTE&&(j=s.R8UI),U===s.UNSIGNED_SHORT&&(j=s.R16UI),U===s.UNSIGNED_INT&&(j=s.R32UI),U===s.BYTE&&(j=s.R8I),U===s.SHORT&&(j=s.R16I),U===s.INT&&(j=s.R32I)),v===s.RG&&(U===s.FLOAT&&(j=s.RG32F),U===s.HALF_FLOAT&&(j=s.RG16F),U===s.UNSIGNED_BYTE&&(j=s.RG8)),v===s.RG_INTEGER&&(U===s.UNSIGNED_BYTE&&(j=s.RG8UI),U===s.UNSIGNED_SHORT&&(j=s.RG16UI),U===s.UNSIGNED_INT&&(j=s.RG32UI),U===s.BYTE&&(j=s.RG8I),U===s.SHORT&&(j=s.RG16I),U===s.INT&&(j=s.RG32I)),v===s.RGB_INTEGER&&(U===s.UNSIGNED_BYTE&&(j=s.RGB8UI),U===s.UNSIGNED_SHORT&&(j=s.RGB16UI),U===s.UNSIGNED_INT&&(j=s.RGB32UI),U===s.BYTE&&(j=s.RGB8I),U===s.SHORT&&(j=s.RGB16I),U===s.INT&&(j=s.RGB32I)),v===s.RGBA_INTEGER&&(U===s.UNSIGNED_BYTE&&(j=s.RGBA8UI),U===s.UNSIGNED_SHORT&&(j=s.RGBA16UI),U===s.UNSIGNED_INT&&(j=s.RGBA32UI),U===s.BYTE&&(j=s.RGBA8I),U===s.SHORT&&(j=s.RGBA16I),U===s.INT&&(j=s.RGBA32I)),v===s.RGB&&U===s.UNSIGNED_INT_5_9_9_9_REV&&(j=s.RGB9_E5),v===s.RGBA){const Ct=J?Kr:jt.getTransfer(Y);U===s.FLOAT&&(j=s.RGBA32F),U===s.HALF_FLOAT&&(j=s.RGBA16F),U===s.UNSIGNED_BYTE&&(j=Ct===re?s.SRGB8_ALPHA8:s.RGBA8),U===s.UNSIGNED_SHORT_4_4_4_4&&(j=s.RGBA4),U===s.UNSIGNED_SHORT_5_5_5_1&&(j=s.RGB5_A1)}return(j===s.R16F||j===s.R32F||j===s.RG16F||j===s.RG32F||j===s.RGBA16F||j===s.RGBA32F)&&t.get("EXT_color_buffer_float"),j}function S(A,v){let U;return A?v===null||v===Ti||v===os?U=s.DEPTH24_STENCIL8:v===Fn?U=s.DEPTH32F_STENCIL8:v===ks&&(U=s.DEPTH24_STENCIL8,console.warn("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):v===null||v===Ti||v===os?U=s.DEPTH_COMPONENT24:v===Fn?U=s.DEPTH_COMPONENT32F:v===ks&&(U=s.DEPTH_COMPONENT16),U}function L(A,v){return g(A)===!0||A.isFramebufferTexture&&A.minFilter!==Je&&A.minFilter!==En?Math.log2(Math.max(v.width,v.height))+1:A.mipmaps!==void 0&&A.mipmaps.length>0?A.mipmaps.length:A.isCompressedTexture&&Array.isArray(A.image)?v.mipmaps.length:1}function C(A){const v=A.target;v.removeEventListener("dispose",C),P(v),v.isVideoTexture&&h.delete(v)}function w(A){const v=A.target;v.removeEventListener("dispose",w),E(v)}function P(A){const v=n.get(A);if(v.__webglInit===void 0)return;const U=A.source,Y=d.get(U);if(Y){const J=Y[v.__cacheKey];J.usedTimes--,J.usedTimes===0&&T(A),Object.keys(Y).length===0&&d.delete(U)}n.remove(A)}function T(A){const v=n.get(A);s.deleteTexture(v.__webglTexture);const U=A.source,Y=d.get(U);delete Y[v.__cacheKey],o.memory.textures--}function E(A){const v=n.get(A);if(A.depthTexture&&(A.depthTexture.dispose(),n.remove(A.depthTexture)),A.isWebGLCubeRenderTarget)for(let Y=0;Y<6;Y++){if(Array.isArray(v.__webglFramebuffer[Y]))for(let J=0;J<v.__webglFramebuffer[Y].length;J++)s.deleteFramebuffer(v.__webglFramebuffer[Y][J]);else s.deleteFramebuffer(v.__webglFramebuffer[Y]);v.__webglDepthbuffer&&s.deleteRenderbuffer(v.__webglDepthbuffer[Y])}else{if(Array.isArray(v.__webglFramebuffer))for(let Y=0;Y<v.__webglFramebuffer.length;Y++)s.deleteFramebuffer(v.__webglFramebuffer[Y]);else s.deleteFramebuffer(v.__webglFramebuffer);if(v.__webglDepthbuffer&&s.deleteRenderbuffer(v.__webglDepthbuffer),v.__webglMultisampledFramebuffer&&s.deleteFramebuffer(v.__webglMultisampledFramebuffer),v.__webglColorRenderbuffer)for(let Y=0;Y<v.__webglColorRenderbuffer.length;Y++)v.__webglColorRenderbuffer[Y]&&s.deleteRenderbuffer(v.__webglColorRenderbuffer[Y]);v.__webglDepthRenderbuffer&&s.deleteRenderbuffer(v.__webglDepthRenderbuffer)}const U=A.textures;for(let Y=0,J=U.length;Y<J;Y++){const j=n.get(U[Y]);j.__webglTexture&&(s.deleteTexture(j.__webglTexture),o.memory.textures--),n.remove(U[Y])}n.remove(A)}let D=0;function H(){D=0}function B(){const A=D;return A>=i.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+A+" texture units while this GPU supports only "+i.maxTextures),D+=1,A}function K(A){const v=[];return v.push(A.wrapS),v.push(A.wrapT),v.push(A.wrapR||0),v.push(A.magFilter),v.push(A.minFilter),v.push(A.anisotropy),v.push(A.internalFormat),v.push(A.format),v.push(A.type),v.push(A.generateMipmaps),v.push(A.premultiplyAlpha),v.push(A.flipY),v.push(A.unpackAlignment),v.push(A.colorSpace),v.join()}function Z(A,v){const U=n.get(A);if(A.isVideoTexture&&Rt(A),A.isRenderTargetTexture===!1&&A.version>0&&U.__version!==A.version){const Y=A.image;if(Y===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(Y.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{$(U,A,v);return}}e.bindTexture(s.TEXTURE_2D,U.__webglTexture,s.TEXTURE0+v)}function q(A,v){const U=n.get(A);if(A.version>0&&U.__version!==A.version){$(U,A,v);return}e.bindTexture(s.TEXTURE_2D_ARRAY,U.__webglTexture,s.TEXTURE0+v)}function Q(A,v){const U=n.get(A);if(A.version>0&&U.__version!==A.version){$(U,A,v);return}e.bindTexture(s.TEXTURE_3D,U.__webglTexture,s.TEXTURE0+v)}function W(A,v){const U=n.get(A);if(A.version>0&&U.__version!==A.version){et(U,A,v);return}e.bindTexture(s.TEXTURE_CUBE_MAP,U.__webglTexture,s.TEXTURE0+v)}const rt={[Ns]:s.REPEAT,[Si]:s.CLAMP_TO_EDGE,[sa]:s.MIRRORED_REPEAT},ht={[Je]:s.NEAREST,[rd]:s.NEAREST_MIPMAP_NEAREST,[Xs]:s.NEAREST_MIPMAP_LINEAR,[En]:s.LINEAR,[Jr]:s.LINEAR_MIPMAP_NEAREST,[Mi]:s.LINEAR_MIPMAP_LINEAR},yt={[cd]:s.NEVER,[md]:s.ALWAYS,[hd]:s.LESS,[Dh]:s.LEQUAL,[ud]:s.EQUAL,[pd]:s.GEQUAL,[dd]:s.GREATER,[fd]:s.NOTEQUAL};function kt(A,v){if(v.type===Fn&&t.has("OES_texture_float_linear")===!1&&(v.magFilter===En||v.magFilter===Jr||v.magFilter===Xs||v.magFilter===Mi||v.minFilter===En||v.minFilter===Jr||v.minFilter===Xs||v.minFilter===Mi)&&console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),s.texParameteri(A,s.TEXTURE_WRAP_S,rt[v.wrapS]),s.texParameteri(A,s.TEXTURE_WRAP_T,rt[v.wrapT]),(A===s.TEXTURE_3D||A===s.TEXTURE_2D_ARRAY)&&s.texParameteri(A,s.TEXTURE_WRAP_R,rt[v.wrapR]),s.texParameteri(A,s.TEXTURE_MAG_FILTER,ht[v.magFilter]),s.texParameteri(A,s.TEXTURE_MIN_FILTER,ht[v.minFilter]),v.compareFunction&&(s.texParameteri(A,s.TEXTURE_COMPARE_MODE,s.COMPARE_REF_TO_TEXTURE),s.texParameteri(A,s.TEXTURE_COMPARE_FUNC,yt[v.compareFunction])),t.has("EXT_texture_filter_anisotropic")===!0){if(v.magFilter===Je||v.minFilter!==Xs&&v.minFilter!==Mi||v.type===Fn&&t.has("OES_texture_float_linear")===!1)return;if(v.anisotropy>1||n.get(v).__currentAnisotropy){const U=t.get("EXT_texture_filter_anisotropic");s.texParameterf(A,U.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(v.anisotropy,i.getMaxAnisotropy())),n.get(v).__currentAnisotropy=v.anisotropy}}}function $t(A,v){let U=!1;A.__webglInit===void 0&&(A.__webglInit=!0,v.addEventListener("dispose",C));const Y=v.source;let J=d.get(Y);J===void 0&&(J={},d.set(Y,J));const j=K(v);if(j!==A.__cacheKey){J[j]===void 0&&(J[j]={texture:s.createTexture(),usedTimes:0},o.memory.textures++,U=!0),J[j].usedTimes++;const Ct=J[A.__cacheKey];Ct!==void 0&&(J[A.__cacheKey].usedTimes--,Ct.usedTimes===0&&T(v)),A.__cacheKey=j,A.__webglTexture=J[j].texture}return U}function $(A,v,U){let Y=s.TEXTURE_2D;(v.isDataArrayTexture||v.isCompressedArrayTexture)&&(Y=s.TEXTURE_2D_ARRAY),v.isData3DTexture&&(Y=s.TEXTURE_3D);const J=$t(A,v),j=v.source;e.bindTexture(Y,A.__webglTexture,s.TEXTURE0+U);const Ct=n.get(j);if(j.version!==Ct.__version||J===!0){e.activeTexture(s.TEXTURE0+U);const ut=jt.getPrimaries(jt.workingColorSpace),vt=v.colorSpace===Qn?null:jt.getPrimaries(v.colorSpace),Zt=v.colorSpace===Qn||ut===vt?s.NONE:s.BROWSER_DEFAULT_WEBGL;s.pixelStorei(s.UNPACK_FLIP_Y_WEBGL,v.flipY),s.pixelStorei(s.UNPACK_PREMULTIPLY_ALPHA_WEBGL,v.premultiplyAlpha),s.pixelStorei(s.UNPACK_ALIGNMENT,v.unpackAlignment),s.pixelStorei(s.UNPACK_COLORSPACE_CONVERSION_WEBGL,Zt);let nt=_(v.image,!1,i.maxTextureSize);nt=ne(v,nt);const St=r.convert(v.format,v.colorSpace),Pt=r.convert(v.type);let Ot=b(v.internalFormat,St,Pt,v.colorSpace,v.isVideoTexture);kt(Y,v);let Mt;const qt=v.mipmaps,Ht=v.isVideoTexture!==!0,ue=Ct.__version===void 0||J===!0,O=j.dataReady,ct=L(v,nt);if(v.isDepthTexture)Ot=S(v.format===as,v.type),ue&&(Ht?e.texStorage2D(s.TEXTURE_2D,1,Ot,nt.width,nt.height):e.texImage2D(s.TEXTURE_2D,0,Ot,nt.width,nt.height,0,St,Pt,null));else if(v.isDataTexture)if(qt.length>0){Ht&&ue&&e.texStorage2D(s.TEXTURE_2D,ct,Ot,qt[0].width,qt[0].height);for(let X=0,tt=qt.length;X<tt;X++)Mt=qt[X],Ht?O&&e.texSubImage2D(s.TEXTURE_2D,X,0,0,Mt.width,Mt.height,St,Pt,Mt.data):e.texImage2D(s.TEXTURE_2D,X,Ot,Mt.width,Mt.height,0,St,Pt,Mt.data);v.generateMipmaps=!1}else Ht?(ue&&e.texStorage2D(s.TEXTURE_2D,ct,Ot,nt.width,nt.height),O&&e.texSubImage2D(s.TEXTURE_2D,0,0,0,nt.width,nt.height,St,Pt,nt.data)):e.texImage2D(s.TEXTURE_2D,0,Ot,nt.width,nt.height,0,St,Pt,nt.data);else if(v.isCompressedTexture)if(v.isCompressedArrayTexture){Ht&&ue&&e.texStorage3D(s.TEXTURE_2D_ARRAY,ct,Ot,qt[0].width,qt[0].height,nt.depth);for(let X=0,tt=qt.length;X<tt;X++)if(Mt=qt[X],v.format!==mn)if(St!==null)if(Ht){if(O)if(v.layerUpdates.size>0){const pt=hc(Mt.width,Mt.height,v.format,v.type);for(const dt of v.layerUpdates){const Bt=Mt.data.subarray(dt*pt/Mt.data.BYTES_PER_ELEMENT,(dt+1)*pt/Mt.data.BYTES_PER_ELEMENT);e.compressedTexSubImage3D(s.TEXTURE_2D_ARRAY,X,0,0,dt,Mt.width,Mt.height,1,St,Bt)}v.clearLayerUpdates()}else e.compressedTexSubImage3D(s.TEXTURE_2D_ARRAY,X,0,0,0,Mt.width,Mt.height,nt.depth,St,Mt.data)}else e.compressedTexImage3D(s.TEXTURE_2D_ARRAY,X,Ot,Mt.width,Mt.height,nt.depth,0,Mt.data,0,0);else console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else Ht?O&&e.texSubImage3D(s.TEXTURE_2D_ARRAY,X,0,0,0,Mt.width,Mt.height,nt.depth,St,Pt,Mt.data):e.texImage3D(s.TEXTURE_2D_ARRAY,X,Ot,Mt.width,Mt.height,nt.depth,0,St,Pt,Mt.data)}else{Ht&&ue&&e.texStorage2D(s.TEXTURE_2D,ct,Ot,qt[0].width,qt[0].height);for(let X=0,tt=qt.length;X<tt;X++)Mt=qt[X],v.format!==mn?St!==null?Ht?O&&e.compressedTexSubImage2D(s.TEXTURE_2D,X,0,0,Mt.width,Mt.height,St,Mt.data):e.compressedTexImage2D(s.TEXTURE_2D,X,Ot,Mt.width,Mt.height,0,Mt.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):Ht?O&&e.texSubImage2D(s.TEXTURE_2D,X,0,0,Mt.width,Mt.height,St,Pt,Mt.data):e.texImage2D(s.TEXTURE_2D,X,Ot,Mt.width,Mt.height,0,St,Pt,Mt.data)}else if(v.isDataArrayTexture)if(Ht){if(ue&&e.texStorage3D(s.TEXTURE_2D_ARRAY,ct,Ot,nt.width,nt.height,nt.depth),O)if(v.layerUpdates.size>0){const X=hc(nt.width,nt.height,v.format,v.type);for(const tt of v.layerUpdates){const pt=nt.data.subarray(tt*X/nt.data.BYTES_PER_ELEMENT,(tt+1)*X/nt.data.BYTES_PER_ELEMENT);e.texSubImage3D(s.TEXTURE_2D_ARRAY,0,0,0,tt,nt.width,nt.height,1,St,Pt,pt)}v.clearLayerUpdates()}else e.texSubImage3D(s.TEXTURE_2D_ARRAY,0,0,0,0,nt.width,nt.height,nt.depth,St,Pt,nt.data)}else e.texImage3D(s.TEXTURE_2D_ARRAY,0,Ot,nt.width,nt.height,nt.depth,0,St,Pt,nt.data);else if(v.isData3DTexture)Ht?(ue&&e.texStorage3D(s.TEXTURE_3D,ct,Ot,nt.width,nt.height,nt.depth),O&&e.texSubImage3D(s.TEXTURE_3D,0,0,0,0,nt.width,nt.height,nt.depth,St,Pt,nt.data)):e.texImage3D(s.TEXTURE_3D,0,Ot,nt.width,nt.height,nt.depth,0,St,Pt,nt.data);else if(v.isFramebufferTexture){if(ue)if(Ht)e.texStorage2D(s.TEXTURE_2D,ct,Ot,nt.width,nt.height);else{let X=nt.width,tt=nt.height;for(let pt=0;pt<ct;pt++)e.texImage2D(s.TEXTURE_2D,pt,Ot,X,tt,0,St,Pt,null),X>>=1,tt>>=1}}else if(qt.length>0){if(Ht&&ue){const X=lt(qt[0]);e.texStorage2D(s.TEXTURE_2D,ct,Ot,X.width,X.height)}for(let X=0,tt=qt.length;X<tt;X++)Mt=qt[X],Ht?O&&e.texSubImage2D(s.TEXTURE_2D,X,0,0,St,Pt,Mt):e.texImage2D(s.TEXTURE_2D,X,Ot,St,Pt,Mt);v.generateMipmaps=!1}else if(Ht){if(ue){const X=lt(nt);e.texStorage2D(s.TEXTURE_2D,ct,Ot,X.width,X.height)}O&&e.texSubImage2D(s.TEXTURE_2D,0,0,0,St,Pt,nt)}else e.texImage2D(s.TEXTURE_2D,0,Ot,St,Pt,nt);g(v)&&p(Y),Ct.__version=j.version,v.onUpdate&&v.onUpdate(v)}A.__version=v.version}function et(A,v,U){if(v.image.length!==6)return;const Y=$t(A,v),J=v.source;e.bindTexture(s.TEXTURE_CUBE_MAP,A.__webglTexture,s.TEXTURE0+U);const j=n.get(J);if(J.version!==j.__version||Y===!0){e.activeTexture(s.TEXTURE0+U);const Ct=jt.getPrimaries(jt.workingColorSpace),ut=v.colorSpace===Qn?null:jt.getPrimaries(v.colorSpace),vt=v.colorSpace===Qn||Ct===ut?s.NONE:s.BROWSER_DEFAULT_WEBGL;s.pixelStorei(s.UNPACK_FLIP_Y_WEBGL,v.flipY),s.pixelStorei(s.UNPACK_PREMULTIPLY_ALPHA_WEBGL,v.premultiplyAlpha),s.pixelStorei(s.UNPACK_ALIGNMENT,v.unpackAlignment),s.pixelStorei(s.UNPACK_COLORSPACE_CONVERSION_WEBGL,vt);const Zt=v.isCompressedTexture||v.image[0].isCompressedTexture,nt=v.image[0]&&v.image[0].isDataTexture,St=[];for(let tt=0;tt<6;tt++)!Zt&&!nt?St[tt]=_(v.image[tt],!0,i.maxCubemapSize):St[tt]=nt?v.image[tt].image:v.image[tt],St[tt]=ne(v,St[tt]);const Pt=St[0],Ot=r.convert(v.format,v.colorSpace),Mt=r.convert(v.type),qt=b(v.internalFormat,Ot,Mt,v.colorSpace),Ht=v.isVideoTexture!==!0,ue=j.__version===void 0||Y===!0,O=J.dataReady;let ct=L(v,Pt);kt(s.TEXTURE_CUBE_MAP,v);let X;if(Zt){Ht&&ue&&e.texStorage2D(s.TEXTURE_CUBE_MAP,ct,qt,Pt.width,Pt.height);for(let tt=0;tt<6;tt++){X=St[tt].mipmaps;for(let pt=0;pt<X.length;pt++){const dt=X[pt];v.format!==mn?Ot!==null?Ht?O&&e.compressedTexSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+tt,pt,0,0,dt.width,dt.height,Ot,dt.data):e.compressedTexImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+tt,pt,qt,dt.width,dt.height,0,dt.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):Ht?O&&e.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+tt,pt,0,0,dt.width,dt.height,Ot,Mt,dt.data):e.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+tt,pt,qt,dt.width,dt.height,0,Ot,Mt,dt.data)}}}else{if(X=v.mipmaps,Ht&&ue){X.length>0&&ct++;const tt=lt(St[0]);e.texStorage2D(s.TEXTURE_CUBE_MAP,ct,qt,tt.width,tt.height)}for(let tt=0;tt<6;tt++)if(nt){Ht?O&&e.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+tt,0,0,0,St[tt].width,St[tt].height,Ot,Mt,St[tt].data):e.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+tt,0,qt,St[tt].width,St[tt].height,0,Ot,Mt,St[tt].data);for(let pt=0;pt<X.length;pt++){const Bt=X[pt].image[tt].image;Ht?O&&e.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+tt,pt+1,0,0,Bt.width,Bt.height,Ot,Mt,Bt.data):e.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+tt,pt+1,qt,Bt.width,Bt.height,0,Ot,Mt,Bt.data)}}else{Ht?O&&e.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+tt,0,0,0,Ot,Mt,St[tt]):e.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+tt,0,qt,Ot,Mt,St[tt]);for(let pt=0;pt<X.length;pt++){const dt=X[pt];Ht?O&&e.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+tt,pt+1,0,0,Ot,Mt,dt.image[tt]):e.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+tt,pt+1,qt,Ot,Mt,dt.image[tt])}}}g(v)&&p(s.TEXTURE_CUBE_MAP),j.__version=J.version,v.onUpdate&&v.onUpdate(v)}A.__version=v.version}function gt(A,v,U,Y,J,j){const Ct=r.convert(U.format,U.colorSpace),ut=r.convert(U.type),vt=b(U.internalFormat,Ct,ut,U.colorSpace),Zt=n.get(v),nt=n.get(U);if(nt.__renderTarget=v,!Zt.__hasExternalTextures){const St=Math.max(1,v.width>>j),Pt=Math.max(1,v.height>>j);J===s.TEXTURE_3D||J===s.TEXTURE_2D_ARRAY?e.texImage3D(J,j,vt,St,Pt,v.depth,0,Ct,ut,null):e.texImage2D(J,j,vt,St,Pt,0,Ct,ut,null)}e.bindFramebuffer(s.FRAMEBUFFER,A),_t(v)?a.framebufferTexture2DMultisampleEXT(s.FRAMEBUFFER,Y,J,nt.__webglTexture,0,Lt(v)):(J===s.TEXTURE_2D||J>=s.TEXTURE_CUBE_MAP_POSITIVE_X&&J<=s.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&s.framebufferTexture2D(s.FRAMEBUFFER,Y,J,nt.__webglTexture,j),e.bindFramebuffer(s.FRAMEBUFFER,null)}function ot(A,v,U){if(s.bindRenderbuffer(s.RENDERBUFFER,A),v.depthBuffer){const Y=v.depthTexture,J=Y&&Y.isDepthTexture?Y.type:null,j=S(v.stencilBuffer,J),Ct=v.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT,ut=Lt(v);_t(v)?a.renderbufferStorageMultisampleEXT(s.RENDERBUFFER,ut,j,v.width,v.height):U?s.renderbufferStorageMultisample(s.RENDERBUFFER,ut,j,v.width,v.height):s.renderbufferStorage(s.RENDERBUFFER,j,v.width,v.height),s.framebufferRenderbuffer(s.FRAMEBUFFER,Ct,s.RENDERBUFFER,A)}else{const Y=v.textures;for(let J=0;J<Y.length;J++){const j=Y[J],Ct=r.convert(j.format,j.colorSpace),ut=r.convert(j.type),vt=b(j.internalFormat,Ct,ut,j.colorSpace),Zt=Lt(v);U&&_t(v)===!1?s.renderbufferStorageMultisample(s.RENDERBUFFER,Zt,vt,v.width,v.height):_t(v)?a.renderbufferStorageMultisampleEXT(s.RENDERBUFFER,Zt,vt,v.width,v.height):s.renderbufferStorage(s.RENDERBUFFER,vt,v.width,v.height)}}s.bindRenderbuffer(s.RENDERBUFFER,null)}function Et(A,v){if(v&&v.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(e.bindFramebuffer(s.FRAMEBUFFER,A),!(v.depthTexture&&v.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");const Y=n.get(v.depthTexture);Y.__renderTarget=v,(!Y.__webglTexture||v.depthTexture.image.width!==v.width||v.depthTexture.image.height!==v.height)&&(v.depthTexture.image.width=v.width,v.depthTexture.image.height=v.height,v.depthTexture.needsUpdate=!0),Z(v.depthTexture,0);const J=Y.__webglTexture,j=Lt(v);if(v.depthTexture.format===Ji)_t(v)?a.framebufferTexture2DMultisampleEXT(s.FRAMEBUFFER,s.DEPTH_ATTACHMENT,s.TEXTURE_2D,J,0,j):s.framebufferTexture2D(s.FRAMEBUFFER,s.DEPTH_ATTACHMENT,s.TEXTURE_2D,J,0);else if(v.depthTexture.format===as)_t(v)?a.framebufferTexture2DMultisampleEXT(s.FRAMEBUFFER,s.DEPTH_STENCIL_ATTACHMENT,s.TEXTURE_2D,J,0,j):s.framebufferTexture2D(s.FRAMEBUFFER,s.DEPTH_STENCIL_ATTACHMENT,s.TEXTURE_2D,J,0);else throw new Error("Unknown depthTexture format")}function xt(A){const v=n.get(A),U=A.isWebGLCubeRenderTarget===!0;if(v.__boundDepthTexture!==A.depthTexture){const Y=A.depthTexture;if(v.__depthDisposeCallback&&v.__depthDisposeCallback(),Y){const J=()=>{delete v.__boundDepthTexture,delete v.__depthDisposeCallback,Y.removeEventListener("dispose",J)};Y.addEventListener("dispose",J),v.__depthDisposeCallback=J}v.__boundDepthTexture=Y}if(A.depthTexture&&!v.__autoAllocateDepthBuffer){if(U)throw new Error("target.depthTexture not supported in Cube render targets");Et(v.__webglFramebuffer,A)}else if(U){v.__webglDepthbuffer=[];for(let Y=0;Y<6;Y++)if(e.bindFramebuffer(s.FRAMEBUFFER,v.__webglFramebuffer[Y]),v.__webglDepthbuffer[Y]===void 0)v.__webglDepthbuffer[Y]=s.createRenderbuffer(),ot(v.__webglDepthbuffer[Y],A,!1);else{const J=A.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT,j=v.__webglDepthbuffer[Y];s.bindRenderbuffer(s.RENDERBUFFER,j),s.framebufferRenderbuffer(s.FRAMEBUFFER,J,s.RENDERBUFFER,j)}}else if(e.bindFramebuffer(s.FRAMEBUFFER,v.__webglFramebuffer),v.__webglDepthbuffer===void 0)v.__webglDepthbuffer=s.createRenderbuffer(),ot(v.__webglDepthbuffer,A,!1);else{const Y=A.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT,J=v.__webglDepthbuffer;s.bindRenderbuffer(s.RENDERBUFFER,J),s.framebufferRenderbuffer(s.FRAMEBUFFER,Y,s.RENDERBUFFER,J)}e.bindFramebuffer(s.FRAMEBUFFER,null)}function Vt(A,v,U){const Y=n.get(A);v!==void 0&&gt(Y.__webglFramebuffer,A,A.texture,s.COLOR_ATTACHMENT0,s.TEXTURE_2D,0),U!==void 0&&xt(A)}function ce(A){const v=A.texture,U=n.get(A),Y=n.get(v);A.addEventListener("dispose",w);const J=A.textures,j=A.isWebGLCubeRenderTarget===!0,Ct=J.length>1;if(Ct||(Y.__webglTexture===void 0&&(Y.__webglTexture=s.createTexture()),Y.__version=v.version,o.memory.textures++),j){U.__webglFramebuffer=[];for(let ut=0;ut<6;ut++)if(v.mipmaps&&v.mipmaps.length>0){U.__webglFramebuffer[ut]=[];for(let vt=0;vt<v.mipmaps.length;vt++)U.__webglFramebuffer[ut][vt]=s.createFramebuffer()}else U.__webglFramebuffer[ut]=s.createFramebuffer()}else{if(v.mipmaps&&v.mipmaps.length>0){U.__webglFramebuffer=[];for(let ut=0;ut<v.mipmaps.length;ut++)U.__webglFramebuffer[ut]=s.createFramebuffer()}else U.__webglFramebuffer=s.createFramebuffer();if(Ct)for(let ut=0,vt=J.length;ut<vt;ut++){const Zt=n.get(J[ut]);Zt.__webglTexture===void 0&&(Zt.__webglTexture=s.createTexture(),o.memory.textures++)}if(A.samples>0&&_t(A)===!1){U.__webglMultisampledFramebuffer=s.createFramebuffer(),U.__webglColorRenderbuffer=[],e.bindFramebuffer(s.FRAMEBUFFER,U.__webglMultisampledFramebuffer);for(let ut=0;ut<J.length;ut++){const vt=J[ut];U.__webglColorRenderbuffer[ut]=s.createRenderbuffer(),s.bindRenderbuffer(s.RENDERBUFFER,U.__webglColorRenderbuffer[ut]);const Zt=r.convert(vt.format,vt.colorSpace),nt=r.convert(vt.type),St=b(vt.internalFormat,Zt,nt,vt.colorSpace,A.isXRRenderTarget===!0),Pt=Lt(A);s.renderbufferStorageMultisample(s.RENDERBUFFER,Pt,St,A.width,A.height),s.framebufferRenderbuffer(s.FRAMEBUFFER,s.COLOR_ATTACHMENT0+ut,s.RENDERBUFFER,U.__webglColorRenderbuffer[ut])}s.bindRenderbuffer(s.RENDERBUFFER,null),A.depthBuffer&&(U.__webglDepthRenderbuffer=s.createRenderbuffer(),ot(U.__webglDepthRenderbuffer,A,!0)),e.bindFramebuffer(s.FRAMEBUFFER,null)}}if(j){e.bindTexture(s.TEXTURE_CUBE_MAP,Y.__webglTexture),kt(s.TEXTURE_CUBE_MAP,v);for(let ut=0;ut<6;ut++)if(v.mipmaps&&v.mipmaps.length>0)for(let vt=0;vt<v.mipmaps.length;vt++)gt(U.__webglFramebuffer[ut][vt],A,v,s.COLOR_ATTACHMENT0,s.TEXTURE_CUBE_MAP_POSITIVE_X+ut,vt);else gt(U.__webglFramebuffer[ut],A,v,s.COLOR_ATTACHMENT0,s.TEXTURE_CUBE_MAP_POSITIVE_X+ut,0);g(v)&&p(s.TEXTURE_CUBE_MAP),e.unbindTexture()}else if(Ct){for(let ut=0,vt=J.length;ut<vt;ut++){const Zt=J[ut],nt=n.get(Zt);e.bindTexture(s.TEXTURE_2D,nt.__webglTexture),kt(s.TEXTURE_2D,Zt),gt(U.__webglFramebuffer,A,Zt,s.COLOR_ATTACHMENT0+ut,s.TEXTURE_2D,0),g(Zt)&&p(s.TEXTURE_2D)}e.unbindTexture()}else{let ut=s.TEXTURE_2D;if((A.isWebGL3DRenderTarget||A.isWebGLArrayRenderTarget)&&(ut=A.isWebGL3DRenderTarget?s.TEXTURE_3D:s.TEXTURE_2D_ARRAY),e.bindTexture(ut,Y.__webglTexture),kt(ut,v),v.mipmaps&&v.mipmaps.length>0)for(let vt=0;vt<v.mipmaps.length;vt++)gt(U.__webglFramebuffer[vt],A,v,s.COLOR_ATTACHMENT0,ut,vt);else gt(U.__webglFramebuffer,A,v,s.COLOR_ATTACHMENT0,ut,0);g(v)&&p(ut),e.unbindTexture()}A.depthBuffer&&xt(A)}function Xt(A){const v=A.textures;for(let U=0,Y=v.length;U<Y;U++){const J=v[U];if(g(J)){const j=x(A),Ct=n.get(J).__webglTexture;e.bindTexture(j,Ct),p(j),e.unbindTexture()}}}const he=[],R=[];function Ft(A){if(A.samples>0){if(_t(A)===!1){const v=A.textures,U=A.width,Y=A.height;let J=s.COLOR_BUFFER_BIT;const j=A.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT,Ct=n.get(A),ut=v.length>1;if(ut)for(let vt=0;vt<v.length;vt++)e.bindFramebuffer(s.FRAMEBUFFER,Ct.__webglMultisampledFramebuffer),s.framebufferRenderbuffer(s.FRAMEBUFFER,s.COLOR_ATTACHMENT0+vt,s.RENDERBUFFER,null),e.bindFramebuffer(s.FRAMEBUFFER,Ct.__webglFramebuffer),s.framebufferTexture2D(s.DRAW_FRAMEBUFFER,s.COLOR_ATTACHMENT0+vt,s.TEXTURE_2D,null,0);e.bindFramebuffer(s.READ_FRAMEBUFFER,Ct.__webglMultisampledFramebuffer),e.bindFramebuffer(s.DRAW_FRAMEBUFFER,Ct.__webglFramebuffer);for(let vt=0;vt<v.length;vt++){if(A.resolveDepthBuffer&&(A.depthBuffer&&(J|=s.DEPTH_BUFFER_BIT),A.stencilBuffer&&A.resolveStencilBuffer&&(J|=s.STENCIL_BUFFER_BIT)),ut){s.framebufferRenderbuffer(s.READ_FRAMEBUFFER,s.COLOR_ATTACHMENT0,s.RENDERBUFFER,Ct.__webglColorRenderbuffer[vt]);const Zt=n.get(v[vt]).__webglTexture;s.framebufferTexture2D(s.DRAW_FRAMEBUFFER,s.COLOR_ATTACHMENT0,s.TEXTURE_2D,Zt,0)}s.blitFramebuffer(0,0,U,Y,0,0,U,Y,J,s.NEAREST),l===!0&&(he.length=0,R.length=0,he.push(s.COLOR_ATTACHMENT0+vt),A.depthBuffer&&A.resolveDepthBuffer===!1&&(he.push(j),R.push(j),s.invalidateFramebuffer(s.DRAW_FRAMEBUFFER,R)),s.invalidateFramebuffer(s.READ_FRAMEBUFFER,he))}if(e.bindFramebuffer(s.READ_FRAMEBUFFER,null),e.bindFramebuffer(s.DRAW_FRAMEBUFFER,null),ut)for(let vt=0;vt<v.length;vt++){e.bindFramebuffer(s.FRAMEBUFFER,Ct.__webglMultisampledFramebuffer),s.framebufferRenderbuffer(s.FRAMEBUFFER,s.COLOR_ATTACHMENT0+vt,s.RENDERBUFFER,Ct.__webglColorRenderbuffer[vt]);const Zt=n.get(v[vt]).__webglTexture;e.bindFramebuffer(s.FRAMEBUFFER,Ct.__webglFramebuffer),s.framebufferTexture2D(s.DRAW_FRAMEBUFFER,s.COLOR_ATTACHMENT0+vt,s.TEXTURE_2D,Zt,0)}e.bindFramebuffer(s.DRAW_FRAMEBUFFER,Ct.__webglMultisampledFramebuffer)}else if(A.depthBuffer&&A.resolveDepthBuffer===!1&&l){const v=A.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT;s.invalidateFramebuffer(s.DRAW_FRAMEBUFFER,[v])}}}function Lt(A){return Math.min(i.maxSamples,A.samples)}function _t(A){const v=n.get(A);return A.samples>0&&t.has("WEBGL_multisampled_render_to_texture")===!0&&v.__useRenderToTexture!==!1}function Rt(A){const v=o.render.frame;h.get(A)!==v&&(h.set(A,v),A.update())}function ne(A,v){const U=A.colorSpace,Y=A.format,J=A.type;return A.isCompressedTexture===!0||A.isVideoTexture===!0||U!==ds&&U!==Qn&&(jt.getTransfer(U)===re?(Y!==mn||J!==Wn)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",U)),v}function lt(A){return typeof HTMLImageElement<"u"&&A instanceof HTMLImageElement?(c.width=A.naturalWidth||A.width,c.height=A.naturalHeight||A.height):typeof VideoFrame<"u"&&A instanceof VideoFrame?(c.width=A.displayWidth,c.height=A.displayHeight):(c.width=A.width,c.height=A.height),c}this.allocateTextureUnit=B,this.resetTextureUnits=H,this.setTexture2D=Z,this.setTexture2DArray=q,this.setTexture3D=Q,this.setTextureCube=W,this.rebindTextures=Vt,this.setupRenderTarget=ce,this.updateRenderTargetMipmap=Xt,this.updateMultisampleRenderTarget=Ft,this.setupDepthRenderbuffer=xt,this.setupFrameBufferTexture=gt,this.useMultisampledRTT=_t}function N0(s,t){function e(n,i=Qn){let r;const o=jt.getTransfer(i);if(n===Wn)return s.UNSIGNED_BYTE;if(n===Wa)return s.UNSIGNED_SHORT_4_4_4_4;if(n===Va)return s.UNSIGNED_SHORT_5_5_5_1;if(n===xh)return s.UNSIGNED_INT_5_9_9_9_REV;if(n===Sh)return s.BYTE;if(n===Mh)return s.SHORT;if(n===ks)return s.UNSIGNED_SHORT;if(n===Ha)return s.INT;if(n===Ti)return s.UNSIGNED_INT;if(n===Fn)return s.FLOAT;if(n===Fs)return s.HALF_FLOAT;if(n===Eh)return s.ALPHA;if(n===bh)return s.RGB;if(n===mn)return s.RGBA;if(n===Th)return s.LUMINANCE;if(n===Ah)return s.LUMINANCE_ALPHA;if(n===Ji)return s.DEPTH_COMPONENT;if(n===as)return s.DEPTH_STENCIL;if(n===Ch)return s.RED;if(n===Xa)return s.RED_INTEGER;if(n===wh)return s.RG;if(n===Ka)return s.RG_INTEGER;if(n===Ya)return s.RGBA_INTEGER;if(n===Tr||n===Ar||n===Cr||n===wr)if(o===re)if(r=t.get("WEBGL_compressed_texture_s3tc_srgb"),r!==null){if(n===Tr)return r.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===Ar)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===Cr)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===wr)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(r=t.get("WEBGL_compressed_texture_s3tc"),r!==null){if(n===Tr)return r.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===Ar)return r.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===Cr)return r.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===wr)return r.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(n===ra||n===oa||n===aa||n===la)if(r=t.get("WEBGL_compressed_texture_pvrtc"),r!==null){if(n===ra)return r.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===oa)return r.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===aa)return r.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===la)return r.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(n===ca||n===ha||n===ua)if(r=t.get("WEBGL_compressed_texture_etc"),r!==null){if(n===ca||n===ha)return o===re?r.COMPRESSED_SRGB8_ETC2:r.COMPRESSED_RGB8_ETC2;if(n===ua)return o===re?r.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:r.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(n===da||n===fa||n===pa||n===ma||n===ga||n===ya||n===_a||n===va||n===Sa||n===Ma||n===xa||n===Ea||n===ba||n===Ta)if(r=t.get("WEBGL_compressed_texture_astc"),r!==null){if(n===da)return o===re?r.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:r.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===fa)return o===re?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:r.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===pa)return o===re?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:r.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===ma)return o===re?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:r.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===ga)return o===re?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:r.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===ya)return o===re?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:r.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===_a)return o===re?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:r.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===va)return o===re?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:r.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===Sa)return o===re?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:r.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===Ma)return o===re?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:r.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===xa)return o===re?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:r.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===Ea)return o===re?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:r.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===ba)return o===re?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:r.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===Ta)return o===re?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:r.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(n===Rr||n===Aa||n===Ca)if(r=t.get("EXT_texture_compression_bptc"),r!==null){if(n===Rr)return o===re?r.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:r.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===Aa)return r.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===Ca)return r.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(n===Rh||n===wa||n===Ra||n===Ia)if(r=t.get("EXT_texture_compression_rgtc"),r!==null){if(n===Rr)return r.COMPRESSED_RED_RGTC1_EXT;if(n===wa)return r.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===Ra)return r.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===Ia)return r.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return n===os?s.UNSIGNED_INT_24_8:s[n]!==void 0?s[n]:null}return{convert:e}}class k0 extends We{constructor(t=[]){super(),this.isArrayCamera=!0,this.cameras=t}}class an extends Ce{constructor(){super(),this.isGroup=!0,this.type="Group"}}const U0={type:"move"};class Ao{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new an,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new an,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new I,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new I),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new an,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new I,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new I),this._grip}dispatchEvent(t){return this._targetRay!==null&&this._targetRay.dispatchEvent(t),this._grip!==null&&this._grip.dispatchEvent(t),this._hand!==null&&this._hand.dispatchEvent(t),this}connect(t){if(t&&t.hand){const e=this._hand;if(e)for(const n of t.hand.values())this._getHandJoint(e,n)}return this.dispatchEvent({type:"connected",data:t}),this}disconnect(t){return this.dispatchEvent({type:"disconnected",data:t}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(t,e,n){let i=null,r=null,o=null;const a=this._targetRay,l=this._grip,c=this._hand;if(t&&e.session.visibilityState!=="visible-blurred"){if(c&&t.hand){o=!0;for(const _ of t.hand.values()){const g=e.getJointPose(_,n),p=this._getHandJoint(c,_);g!==null&&(p.matrix.fromArray(g.transform.matrix),p.matrix.decompose(p.position,p.rotation,p.scale),p.matrixWorldNeedsUpdate=!0,p.jointRadius=g.radius),p.visible=g!==null}const h=c.joints["index-finger-tip"],u=c.joints["thumb-tip"],d=h.position.distanceTo(u.position),f=.02,y=.005;c.inputState.pinching&&d>f+y?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:t.handedness,target:this})):!c.inputState.pinching&&d<=f-y&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:t.handedness,target:this}))}else l!==null&&t.gripSpace&&(r=e.getPose(t.gripSpace,n),r!==null&&(l.matrix.fromArray(r.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,r.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(r.linearVelocity)):l.hasLinearVelocity=!1,r.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(r.angularVelocity)):l.hasAngularVelocity=!1));a!==null&&(i=e.getPose(t.targetRaySpace,n),i===null&&r!==null&&(i=r),i!==null&&(a.matrix.fromArray(i.transform.matrix),a.matrix.decompose(a.position,a.rotation,a.scale),a.matrixWorldNeedsUpdate=!0,i.linearVelocity?(a.hasLinearVelocity=!0,a.linearVelocity.copy(i.linearVelocity)):a.hasLinearVelocity=!1,i.angularVelocity?(a.hasAngularVelocity=!0,a.angularVelocity.copy(i.angularVelocity)):a.hasAngularVelocity=!1,this.dispatchEvent(U0)))}return a!==null&&(a.visible=i!==null),l!==null&&(l.visible=r!==null),c!==null&&(c.visible=o!==null),this}_getHandJoint(t,e){if(t.joints[e.jointName]===void 0){const n=new an;n.matrixAutoUpdate=!1,n.visible=!1,t.joints[e.jointName]=n,t.add(n)}return t.joints[e.jointName]}}const F0=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,B0=`
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

}`;class z0{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(t,e,n){if(this.texture===null){const i=new ze,r=t.properties.get(i);r.__webglTexture=e.texture,(e.depthNear!=n.depthNear||e.depthFar!=n.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=i}}getMesh(t){if(this.texture!==null&&this.mesh===null){const e=t.cameras[0].viewport,n=new wn({vertexShader:F0,fragmentShader:B0,uniforms:{depthColor:{value:this.texture},depthWidth:{value:e.z},depthHeight:{value:e.w}}});this.mesh=new V(new Ci(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class G0 extends fs{constructor(t,e){super();const n=this;let i=null,r=1,o=null,a="local-floor",l=1,c=null,h=null,u=null,d=null,f=null,y=null;const _=new z0,g=e.getContextAttributes();let p=null,x=null;const b=[],S=[],L=new Qt;let C=null;const w=new We;w.viewport=new oe;const P=new We;P.viewport=new oe;const T=[w,P],E=new k0;let D=null,H=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function($){let et=b[$];return et===void 0&&(et=new Ao,b[$]=et),et.getTargetRaySpace()},this.getControllerGrip=function($){let et=b[$];return et===void 0&&(et=new Ao,b[$]=et),et.getGripSpace()},this.getHand=function($){let et=b[$];return et===void 0&&(et=new Ao,b[$]=et),et.getHandSpace()};function B($){const et=S.indexOf($.inputSource);if(et===-1)return;const gt=b[et];gt!==void 0&&(gt.update($.inputSource,$.frame,c||o),gt.dispatchEvent({type:$.type,data:$.inputSource}))}function K(){i.removeEventListener("select",B),i.removeEventListener("selectstart",B),i.removeEventListener("selectend",B),i.removeEventListener("squeeze",B),i.removeEventListener("squeezestart",B),i.removeEventListener("squeezeend",B),i.removeEventListener("end",K),i.removeEventListener("inputsourceschange",Z);for(let $=0;$<b.length;$++){const et=S[$];et!==null&&(S[$]=null,b[$].disconnect(et))}D=null,H=null,_.reset(),t.setRenderTarget(p),f=null,d=null,u=null,i=null,x=null,$t.stop(),n.isPresenting=!1,t.setPixelRatio(C),t.setSize(L.width,L.height,!1),n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function($){r=$,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function($){a=$,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||o},this.setReferenceSpace=function($){c=$},this.getBaseLayer=function(){return d!==null?d:f},this.getBinding=function(){return u},this.getFrame=function(){return y},this.getSession=function(){return i},this.setSession=async function($){if(i=$,i!==null){if(p=t.getRenderTarget(),i.addEventListener("select",B),i.addEventListener("selectstart",B),i.addEventListener("selectend",B),i.addEventListener("squeeze",B),i.addEventListener("squeezestart",B),i.addEventListener("squeezeend",B),i.addEventListener("end",K),i.addEventListener("inputsourceschange",Z),g.xrCompatible!==!0&&await e.makeXRCompatible(),C=t.getPixelRatio(),t.getSize(L),i.renderState.layers===void 0){const et={antialias:g.antialias,alpha:!0,depth:g.depth,stencil:g.stencil,framebufferScaleFactor:r};f=new XRWebGLLayer(i,e,et),i.updateRenderState({baseLayer:f}),t.setPixelRatio(1),t.setSize(f.framebufferWidth,f.framebufferHeight,!1),x=new Ai(f.framebufferWidth,f.framebufferHeight,{format:mn,type:Wn,colorSpace:t.outputColorSpace,stencilBuffer:g.stencil})}else{let et=null,gt=null,ot=null;g.depth&&(ot=g.stencil?e.DEPTH24_STENCIL8:e.DEPTH_COMPONENT24,et=g.stencil?as:Ji,gt=g.stencil?os:Ti);const Et={colorFormat:e.RGBA8,depthFormat:ot,scaleFactor:r};u=new XRWebGLBinding(i,e),d=u.createProjectionLayer(Et),i.updateRenderState({layers:[d]}),t.setPixelRatio(1),t.setSize(d.textureWidth,d.textureHeight,!1),x=new Ai(d.textureWidth,d.textureHeight,{format:mn,type:Wn,depthTexture:new Wh(d.textureWidth,d.textureHeight,gt,void 0,void 0,void 0,void 0,void 0,void 0,et),stencilBuffer:g.stencil,colorSpace:t.outputColorSpace,samples:g.antialias?4:0,resolveDepthBuffer:d.ignoreDepthValues===!1})}x.isXRRenderTarget=!0,this.setFoveation(l),c=null,o=await i.requestReferenceSpace(a),$t.setContext(i),$t.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(i!==null)return i.environmentBlendMode},this.getDepthTexture=function(){return _.getDepthTexture()};function Z($){for(let et=0;et<$.removed.length;et++){const gt=$.removed[et],ot=S.indexOf(gt);ot>=0&&(S[ot]=null,b[ot].disconnect(gt))}for(let et=0;et<$.added.length;et++){const gt=$.added[et];let ot=S.indexOf(gt);if(ot===-1){for(let xt=0;xt<b.length;xt++)if(xt>=S.length){S.push(gt),ot=xt;break}else if(S[xt]===null){S[xt]=gt,ot=xt;break}if(ot===-1)break}const Et=b[ot];Et&&Et.connect(gt)}}const q=new I,Q=new I;function W($,et,gt){q.setFromMatrixPosition(et.matrixWorld),Q.setFromMatrixPosition(gt.matrixWorld);const ot=q.distanceTo(Q),Et=et.projectionMatrix.elements,xt=gt.projectionMatrix.elements,Vt=Et[14]/(Et[10]-1),ce=Et[14]/(Et[10]+1),Xt=(Et[9]+1)/Et[5],he=(Et[9]-1)/Et[5],R=(Et[8]-1)/Et[0],Ft=(xt[8]+1)/xt[0],Lt=Vt*R,_t=Vt*Ft,Rt=ot/(-R+Ft),ne=Rt*-R;if(et.matrixWorld.decompose($.position,$.quaternion,$.scale),$.translateX(ne),$.translateZ(Rt),$.matrixWorld.compose($.position,$.quaternion,$.scale),$.matrixWorldInverse.copy($.matrixWorld).invert(),Et[10]===-1)$.projectionMatrix.copy(et.projectionMatrix),$.projectionMatrixInverse.copy(et.projectionMatrixInverse);else{const lt=Vt+Rt,A=ce+Rt,v=Lt-ne,U=_t+(ot-ne),Y=Xt*ce/A*lt,J=he*ce/A*lt;$.projectionMatrix.makePerspective(v,U,Y,J,lt,A),$.projectionMatrixInverse.copy($.projectionMatrix).invert()}}function rt($,et){et===null?$.matrixWorld.copy($.matrix):$.matrixWorld.multiplyMatrices(et.matrixWorld,$.matrix),$.matrixWorldInverse.copy($.matrixWorld).invert()}this.updateCamera=function($){if(i===null)return;let et=$.near,gt=$.far;_.texture!==null&&(_.depthNear>0&&(et=_.depthNear),_.depthFar>0&&(gt=_.depthFar)),E.near=P.near=w.near=et,E.far=P.far=w.far=gt,(D!==E.near||H!==E.far)&&(i.updateRenderState({depthNear:E.near,depthFar:E.far}),D=E.near,H=E.far),w.layers.mask=$.layers.mask|2,P.layers.mask=$.layers.mask|4,E.layers.mask=w.layers.mask|P.layers.mask;const ot=$.parent,Et=E.cameras;rt(E,ot);for(let xt=0;xt<Et.length;xt++)rt(Et[xt],ot);Et.length===2?W(E,w,P):E.projectionMatrix.copy(w.projectionMatrix),ht($,E,ot)};function ht($,et,gt){gt===null?$.matrix.copy(et.matrixWorld):($.matrix.copy(gt.matrixWorld),$.matrix.invert(),$.matrix.multiply(et.matrixWorld)),$.matrix.decompose($.position,$.quaternion,$.scale),$.updateMatrixWorld(!0),$.projectionMatrix.copy(et.projectionMatrix),$.projectionMatrixInverse.copy(et.projectionMatrixInverse),$.isPerspectiveCamera&&($.fov=Us*2*Math.atan(1/$.projectionMatrix.elements[5]),$.zoom=1)}this.getCamera=function(){return E},this.getFoveation=function(){if(!(d===null&&f===null))return l},this.setFoveation=function($){l=$,d!==null&&(d.fixedFoveation=$),f!==null&&f.fixedFoveation!==void 0&&(f.fixedFoveation=$)},this.hasDepthSensing=function(){return _.texture!==null},this.getDepthSensingMesh=function(){return _.getMesh(E)};let yt=null;function kt($,et){if(h=et.getViewerPose(c||o),y=et,h!==null){const gt=h.views;f!==null&&(t.setRenderTargetFramebuffer(x,f.framebuffer),t.setRenderTarget(x));let ot=!1;gt.length!==E.cameras.length&&(E.cameras.length=0,ot=!0);for(let xt=0;xt<gt.length;xt++){const Vt=gt[xt];let ce=null;if(f!==null)ce=f.getViewport(Vt);else{const he=u.getViewSubImage(d,Vt);ce=he.viewport,xt===0&&(t.setRenderTargetTextures(x,he.colorTexture,d.ignoreDepthValues?void 0:he.depthStencilTexture),t.setRenderTarget(x))}let Xt=T[xt];Xt===void 0&&(Xt=new We,Xt.layers.enable(xt),Xt.viewport=new oe,T[xt]=Xt),Xt.matrix.fromArray(Vt.transform.matrix),Xt.matrix.decompose(Xt.position,Xt.quaternion,Xt.scale),Xt.projectionMatrix.fromArray(Vt.projectionMatrix),Xt.projectionMatrixInverse.copy(Xt.projectionMatrix).invert(),Xt.viewport.set(ce.x,ce.y,ce.width,ce.height),xt===0&&(E.matrix.copy(Xt.matrix),E.matrix.decompose(E.position,E.quaternion,E.scale)),ot===!0&&E.cameras.push(Xt)}const Et=i.enabledFeatures;if(Et&&Et.includes("depth-sensing")){const xt=u.getDepthInformation(gt[0]);xt&&xt.isValid&&xt.texture&&_.init(t,xt,i.renderState)}}for(let gt=0;gt<b.length;gt++){const ot=S[gt],Et=b[gt];ot!==null&&Et!==void 0&&Et.update(ot,et,c||o)}yt&&yt($,et),et.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:et}),y=null}const $t=new Gh;$t.setAnimationLoop(kt),this.setAnimationLoop=function($){yt=$},this.dispose=function(){}}}const fi=new Xe,H0=new le;function W0(s,t){function e(g,p){g.matrixAutoUpdate===!0&&g.updateMatrix(),p.value.copy(g.matrix)}function n(g,p){p.color.getRGB(g.fogColor.value,Fh(s)),p.isFog?(g.fogNear.value=p.near,g.fogFar.value=p.far):p.isFogExp2&&(g.fogDensity.value=p.density)}function i(g,p,x,b,S){p.isMeshBasicMaterial||p.isMeshLambertMaterial?r(g,p):p.isMeshToonMaterial?(r(g,p),u(g,p)):p.isMeshPhongMaterial?(r(g,p),h(g,p)):p.isMeshStandardMaterial?(r(g,p),d(g,p),p.isMeshPhysicalMaterial&&f(g,p,S)):p.isMeshMatcapMaterial?(r(g,p),y(g,p)):p.isMeshDepthMaterial?r(g,p):p.isMeshDistanceMaterial?(r(g,p),_(g,p)):p.isMeshNormalMaterial?r(g,p):p.isLineBasicMaterial?(o(g,p),p.isLineDashedMaterial&&a(g,p)):p.isPointsMaterial?l(g,p,x,b):p.isSpriteMaterial?c(g,p):p.isShadowMaterial?(g.color.value.copy(p.color),g.opacity.value=p.opacity):p.isShaderMaterial&&(p.uniformsNeedUpdate=!1)}function r(g,p){g.opacity.value=p.opacity,p.color&&g.diffuse.value.copy(p.color),p.emissive&&g.emissive.value.copy(p.emissive).multiplyScalar(p.emissiveIntensity),p.map&&(g.map.value=p.map,e(p.map,g.mapTransform)),p.alphaMap&&(g.alphaMap.value=p.alphaMap,e(p.alphaMap,g.alphaMapTransform)),p.bumpMap&&(g.bumpMap.value=p.bumpMap,e(p.bumpMap,g.bumpMapTransform),g.bumpScale.value=p.bumpScale,p.side===Be&&(g.bumpScale.value*=-1)),p.normalMap&&(g.normalMap.value=p.normalMap,e(p.normalMap,g.normalMapTransform),g.normalScale.value.copy(p.normalScale),p.side===Be&&g.normalScale.value.negate()),p.displacementMap&&(g.displacementMap.value=p.displacementMap,e(p.displacementMap,g.displacementMapTransform),g.displacementScale.value=p.displacementScale,g.displacementBias.value=p.displacementBias),p.emissiveMap&&(g.emissiveMap.value=p.emissiveMap,e(p.emissiveMap,g.emissiveMapTransform)),p.specularMap&&(g.specularMap.value=p.specularMap,e(p.specularMap,g.specularMapTransform)),p.alphaTest>0&&(g.alphaTest.value=p.alphaTest);const x=t.get(p),b=x.envMap,S=x.envMapRotation;b&&(g.envMap.value=b,fi.copy(S),fi.x*=-1,fi.y*=-1,fi.z*=-1,b.isCubeTexture&&b.isRenderTargetTexture===!1&&(fi.y*=-1,fi.z*=-1),g.envMapRotation.value.setFromMatrix4(H0.makeRotationFromEuler(fi)),g.flipEnvMap.value=b.isCubeTexture&&b.isRenderTargetTexture===!1?-1:1,g.reflectivity.value=p.reflectivity,g.ior.value=p.ior,g.refractionRatio.value=p.refractionRatio),p.lightMap&&(g.lightMap.value=p.lightMap,g.lightMapIntensity.value=p.lightMapIntensity,e(p.lightMap,g.lightMapTransform)),p.aoMap&&(g.aoMap.value=p.aoMap,g.aoMapIntensity.value=p.aoMapIntensity,e(p.aoMap,g.aoMapTransform))}function o(g,p){g.diffuse.value.copy(p.color),g.opacity.value=p.opacity,p.map&&(g.map.value=p.map,e(p.map,g.mapTransform))}function a(g,p){g.dashSize.value=p.dashSize,g.totalSize.value=p.dashSize+p.gapSize,g.scale.value=p.scale}function l(g,p,x,b){g.diffuse.value.copy(p.color),g.opacity.value=p.opacity,g.size.value=p.size*x,g.scale.value=b*.5,p.map&&(g.map.value=p.map,e(p.map,g.uvTransform)),p.alphaMap&&(g.alphaMap.value=p.alphaMap,e(p.alphaMap,g.alphaMapTransform)),p.alphaTest>0&&(g.alphaTest.value=p.alphaTest)}function c(g,p){g.diffuse.value.copy(p.color),g.opacity.value=p.opacity,g.rotation.value=p.rotation,p.map&&(g.map.value=p.map,e(p.map,g.mapTransform)),p.alphaMap&&(g.alphaMap.value=p.alphaMap,e(p.alphaMap,g.alphaMapTransform)),p.alphaTest>0&&(g.alphaTest.value=p.alphaTest)}function h(g,p){g.specular.value.copy(p.specular),g.shininess.value=Math.max(p.shininess,1e-4)}function u(g,p){p.gradientMap&&(g.gradientMap.value=p.gradientMap)}function d(g,p){g.metalness.value=p.metalness,p.metalnessMap&&(g.metalnessMap.value=p.metalnessMap,e(p.metalnessMap,g.metalnessMapTransform)),g.roughness.value=p.roughness,p.roughnessMap&&(g.roughnessMap.value=p.roughnessMap,e(p.roughnessMap,g.roughnessMapTransform)),p.envMap&&(g.envMapIntensity.value=p.envMapIntensity)}function f(g,p,x){g.ior.value=p.ior,p.sheen>0&&(g.sheenColor.value.copy(p.sheenColor).multiplyScalar(p.sheen),g.sheenRoughness.value=p.sheenRoughness,p.sheenColorMap&&(g.sheenColorMap.value=p.sheenColorMap,e(p.sheenColorMap,g.sheenColorMapTransform)),p.sheenRoughnessMap&&(g.sheenRoughnessMap.value=p.sheenRoughnessMap,e(p.sheenRoughnessMap,g.sheenRoughnessMapTransform))),p.clearcoat>0&&(g.clearcoat.value=p.clearcoat,g.clearcoatRoughness.value=p.clearcoatRoughness,p.clearcoatMap&&(g.clearcoatMap.value=p.clearcoatMap,e(p.clearcoatMap,g.clearcoatMapTransform)),p.clearcoatRoughnessMap&&(g.clearcoatRoughnessMap.value=p.clearcoatRoughnessMap,e(p.clearcoatRoughnessMap,g.clearcoatRoughnessMapTransform)),p.clearcoatNormalMap&&(g.clearcoatNormalMap.value=p.clearcoatNormalMap,e(p.clearcoatNormalMap,g.clearcoatNormalMapTransform),g.clearcoatNormalScale.value.copy(p.clearcoatNormalScale),p.side===Be&&g.clearcoatNormalScale.value.negate())),p.dispersion>0&&(g.dispersion.value=p.dispersion),p.iridescence>0&&(g.iridescence.value=p.iridescence,g.iridescenceIOR.value=p.iridescenceIOR,g.iridescenceThicknessMinimum.value=p.iridescenceThicknessRange[0],g.iridescenceThicknessMaximum.value=p.iridescenceThicknessRange[1],p.iridescenceMap&&(g.iridescenceMap.value=p.iridescenceMap,e(p.iridescenceMap,g.iridescenceMapTransform)),p.iridescenceThicknessMap&&(g.iridescenceThicknessMap.value=p.iridescenceThicknessMap,e(p.iridescenceThicknessMap,g.iridescenceThicknessMapTransform))),p.transmission>0&&(g.transmission.value=p.transmission,g.transmissionSamplerMap.value=x.texture,g.transmissionSamplerSize.value.set(x.width,x.height),p.transmissionMap&&(g.transmissionMap.value=p.transmissionMap,e(p.transmissionMap,g.transmissionMapTransform)),g.thickness.value=p.thickness,p.thicknessMap&&(g.thicknessMap.value=p.thicknessMap,e(p.thicknessMap,g.thicknessMapTransform)),g.attenuationDistance.value=p.attenuationDistance,g.attenuationColor.value.copy(p.attenuationColor)),p.anisotropy>0&&(g.anisotropyVector.value.set(p.anisotropy*Math.cos(p.anisotropyRotation),p.anisotropy*Math.sin(p.anisotropyRotation)),p.anisotropyMap&&(g.anisotropyMap.value=p.anisotropyMap,e(p.anisotropyMap,g.anisotropyMapTransform))),g.specularIntensity.value=p.specularIntensity,g.specularColor.value.copy(p.specularColor),p.specularColorMap&&(g.specularColorMap.value=p.specularColorMap,e(p.specularColorMap,g.specularColorMapTransform)),p.specularIntensityMap&&(g.specularIntensityMap.value=p.specularIntensityMap,e(p.specularIntensityMap,g.specularIntensityMapTransform))}function y(g,p){p.matcap&&(g.matcap.value=p.matcap)}function _(g,p){const x=t.get(p).light;g.referencePosition.value.setFromMatrixPosition(x.matrixWorld),g.nearDistance.value=x.shadow.camera.near,g.farDistance.value=x.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:i}}function V0(s,t,e,n){let i={},r={},o=[];const a=s.getParameter(s.MAX_UNIFORM_BUFFER_BINDINGS);function l(x,b){const S=b.program;n.uniformBlockBinding(x,S)}function c(x,b){let S=i[x.id];S===void 0&&(y(x),S=h(x),i[x.id]=S,x.addEventListener("dispose",g));const L=b.program;n.updateUBOMapping(x,L);const C=t.render.frame;r[x.id]!==C&&(d(x),r[x.id]=C)}function h(x){const b=u();x.__bindingPointIndex=b;const S=s.createBuffer(),L=x.__size,C=x.usage;return s.bindBuffer(s.UNIFORM_BUFFER,S),s.bufferData(s.UNIFORM_BUFFER,L,C),s.bindBuffer(s.UNIFORM_BUFFER,null),s.bindBufferBase(s.UNIFORM_BUFFER,b,S),S}function u(){for(let x=0;x<a;x++)if(o.indexOf(x)===-1)return o.push(x),x;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function d(x){const b=i[x.id],S=x.uniforms,L=x.__cache;s.bindBuffer(s.UNIFORM_BUFFER,b);for(let C=0,w=S.length;C<w;C++){const P=Array.isArray(S[C])?S[C]:[S[C]];for(let T=0,E=P.length;T<E;T++){const D=P[T];if(f(D,C,T,L)===!0){const H=D.__offset,B=Array.isArray(D.value)?D.value:[D.value];let K=0;for(let Z=0;Z<B.length;Z++){const q=B[Z],Q=_(q);typeof q=="number"||typeof q=="boolean"?(D.__data[0]=q,s.bufferSubData(s.UNIFORM_BUFFER,H+K,D.__data)):q.isMatrix3?(D.__data[0]=q.elements[0],D.__data[1]=q.elements[1],D.__data[2]=q.elements[2],D.__data[3]=0,D.__data[4]=q.elements[3],D.__data[5]=q.elements[4],D.__data[6]=q.elements[5],D.__data[7]=0,D.__data[8]=q.elements[6],D.__data[9]=q.elements[7],D.__data[10]=q.elements[8],D.__data[11]=0):(q.toArray(D.__data,K),K+=Q.storage/Float32Array.BYTES_PER_ELEMENT)}s.bufferSubData(s.UNIFORM_BUFFER,H,D.__data)}}}s.bindBuffer(s.UNIFORM_BUFFER,null)}function f(x,b,S,L){const C=x.value,w=b+"_"+S;if(L[w]===void 0)return typeof C=="number"||typeof C=="boolean"?L[w]=C:L[w]=C.clone(),!0;{const P=L[w];if(typeof C=="number"||typeof C=="boolean"){if(P!==C)return L[w]=C,!0}else if(P.equals(C)===!1)return P.copy(C),!0}return!1}function y(x){const b=x.uniforms;let S=0;const L=16;for(let w=0,P=b.length;w<P;w++){const T=Array.isArray(b[w])?b[w]:[b[w]];for(let E=0,D=T.length;E<D;E++){const H=T[E],B=Array.isArray(H.value)?H.value:[H.value];for(let K=0,Z=B.length;K<Z;K++){const q=B[K],Q=_(q),W=S%L,rt=W%Q.boundary,ht=W+rt;S+=rt,ht!==0&&L-ht<Q.storage&&(S+=L-ht),H.__data=new Float32Array(Q.storage/Float32Array.BYTES_PER_ELEMENT),H.__offset=S,S+=Q.storage}}}const C=S%L;return C>0&&(S+=L-C),x.__size=S,x.__cache={},this}function _(x){const b={boundary:0,storage:0};return typeof x=="number"||typeof x=="boolean"?(b.boundary=4,b.storage=4):x.isVector2?(b.boundary=8,b.storage=8):x.isVector3||x.isColor?(b.boundary=16,b.storage=12):x.isVector4?(b.boundary=16,b.storage=16):x.isMatrix3?(b.boundary=48,b.storage=48):x.isMatrix4?(b.boundary=64,b.storage=64):x.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",x),b}function g(x){const b=x.target;b.removeEventListener("dispose",g);const S=o.indexOf(b.__bindingPointIndex);o.splice(S,1),s.deleteBuffer(i[b.id]),delete i[b.id],delete r[b.id]}function p(){for(const x in i)s.deleteBuffer(i[x]);o=[],i={},r={}}return{bind:l,update:c,dispose:p}}class qh{constructor(t={}){const{canvas:e=Pd(),context:n=null,depth:i=!0,stencil:r=!1,alpha:o=!1,antialias:a=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:c=!1,powerPreference:h="default",failIfMajorPerformanceCaveat:u=!1,reverseDepthBuffer:d=!1}=t;this.isWebGLRenderer=!0;let f;if(n!==null){if(typeof WebGLRenderingContext<"u"&&n instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");f=n.getContextAttributes().alpha}else f=o;const y=new Uint32Array(4),_=new Int32Array(4);let g=null,p=null;const x=[],b=[];this.domElement=e,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this._outputColorSpace=je,this.toneMapping=si,this.toneMappingExposure=1;const S=this;let L=!1,C=0,w=0,P=null,T=-1,E=null;const D=new oe,H=new oe;let B=null;const K=new Dt(0);let Z=0,q=e.width,Q=e.height,W=1,rt=null,ht=null;const yt=new oe(0,0,q,Q),kt=new oe(0,0,q,Q);let $t=!1;const $=new qr;let et=!1,gt=!1;const ot=new le,Et=new le,xt=new I,Vt=new oe,ce={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let Xt=!1;function he(){return P===null?W:1}let R=n;function Ft(M,N){return e.getContext(M,N)}try{const M={alpha:!0,depth:i,stencil:r,antialias:a,premultipliedAlpha:l,preserveDrawingBuffer:c,powerPreference:h,failIfMajorPerformanceCaveat:u};if("setAttribute"in e&&e.setAttribute("data-engine",`three.js r${za}`),e.addEventListener("webglcontextlost",tt,!1),e.addEventListener("webglcontextrestored",pt,!1),e.addEventListener("webglcontextcreationerror",dt,!1),R===null){const N="webgl2";if(R=Ft(N,M),R===null)throw Ft(N)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(M){throw console.error("THREE.WebGLRenderer: "+M.message),M}let Lt,_t,Rt,ne,lt,A,v,U,Y,J,j,Ct,ut,vt,Zt,nt,St,Pt,Ot,Mt,qt,Ht,ue,O;function ct(){Lt=new Zm(R),Lt.init(),Ht=new N0(R,Lt),_t=new Vm(R,Lt,t,Ht),Rt=new P0(R,Lt),_t.reverseDepthBuffer&&d&&Rt.buffers.depth.setReversed(!0),ne=new Qm(R),lt=new y0,A=new O0(R,Lt,Rt,lt,_t,Ht,ne),v=new Km(S),U=new $m(S),Y=new of(R),ue=new Hm(R,Y),J=new jm(R,Y,ne,ue),j=new eg(R,J,Y,ne),Ot=new tg(R,_t,A),nt=new Xm(lt),Ct=new g0(S,v,U,Lt,_t,ue,nt),ut=new W0(S,lt),vt=new v0,Zt=new T0(Lt),Pt=new Gm(S,v,U,Rt,j,f,l),St=new I0(S,j,_t),O=new V0(R,ne,_t,Rt),Mt=new Wm(R,Lt,ne),qt=new Jm(R,Lt,ne),ne.programs=Ct.programs,S.capabilities=_t,S.extensions=Lt,S.properties=lt,S.renderLists=vt,S.shadowMap=St,S.state=Rt,S.info=ne}ct();const X=new G0(S,R);this.xr=X,this.getContext=function(){return R},this.getContextAttributes=function(){return R.getContextAttributes()},this.forceContextLoss=function(){const M=Lt.get("WEBGL_lose_context");M&&M.loseContext()},this.forceContextRestore=function(){const M=Lt.get("WEBGL_lose_context");M&&M.restoreContext()},this.getPixelRatio=function(){return W},this.setPixelRatio=function(M){M!==void 0&&(W=M,this.setSize(q,Q,!1))},this.getSize=function(M){return M.set(q,Q)},this.setSize=function(M,N,z=!0){if(X.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}q=M,Q=N,e.width=Math.floor(M*W),e.height=Math.floor(N*W),z===!0&&(e.style.width=M+"px",e.style.height=N+"px"),this.setViewport(0,0,M,N)},this.getDrawingBufferSize=function(M){return M.set(q*W,Q*W).floor()},this.setDrawingBufferSize=function(M,N,z){q=M,Q=N,W=z,e.width=Math.floor(M*z),e.height=Math.floor(N*z),this.setViewport(0,0,M,N)},this.getCurrentViewport=function(M){return M.copy(D)},this.getViewport=function(M){return M.copy(yt)},this.setViewport=function(M,N,z,G){M.isVector4?yt.set(M.x,M.y,M.z,M.w):yt.set(M,N,z,G),Rt.viewport(D.copy(yt).multiplyScalar(W).round())},this.getScissor=function(M){return M.copy(kt)},this.setScissor=function(M,N,z,G){M.isVector4?kt.set(M.x,M.y,M.z,M.w):kt.set(M,N,z,G),Rt.scissor(H.copy(kt).multiplyScalar(W).round())},this.getScissorTest=function(){return $t},this.setScissorTest=function(M){Rt.setScissorTest($t=M)},this.setOpaqueSort=function(M){rt=M},this.setTransparentSort=function(M){ht=M},this.getClearColor=function(M){return M.copy(Pt.getClearColor())},this.setClearColor=function(){Pt.setClearColor.apply(Pt,arguments)},this.getClearAlpha=function(){return Pt.getClearAlpha()},this.setClearAlpha=function(){Pt.setClearAlpha.apply(Pt,arguments)},this.clear=function(M=!0,N=!0,z=!0){let G=0;if(M){let k=!1;if(P!==null){const it=P.texture.format;k=it===Ya||it===Ka||it===Xa}if(k){const it=P.texture.type,ft=it===Wn||it===Ti||it===ks||it===os||it===Wa||it===Va,bt=Pt.getClearColor(),Tt=Pt.getClearAlpha(),Ut=bt.r,zt=bt.g,At=bt.b;ft?(y[0]=Ut,y[1]=zt,y[2]=At,y[3]=Tt,R.clearBufferuiv(R.COLOR,0,y)):(_[0]=Ut,_[1]=zt,_[2]=At,_[3]=Tt,R.clearBufferiv(R.COLOR,0,_))}else G|=R.COLOR_BUFFER_BIT}N&&(G|=R.DEPTH_BUFFER_BIT),z&&(G|=R.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),R.clear(G)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){e.removeEventListener("webglcontextlost",tt,!1),e.removeEventListener("webglcontextrestored",pt,!1),e.removeEventListener("webglcontextcreationerror",dt,!1),vt.dispose(),Zt.dispose(),lt.dispose(),v.dispose(),U.dispose(),j.dispose(),ue.dispose(),O.dispose(),Ct.dispose(),X.dispose(),X.removeEventListener("sessionstart",rl),X.removeEventListener("sessionend",ol),ai.stop()};function tt(M){M.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),L=!0}function pt(){console.log("THREE.WebGLRenderer: Context Restored."),L=!1;const M=ne.autoReset,N=St.enabled,z=St.autoUpdate,G=St.needsUpdate,k=St.type;ct(),ne.autoReset=M,St.enabled=N,St.autoUpdate=z,St.needsUpdate=G,St.type=k}function dt(M){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",M.statusMessage)}function Bt(M){const N=M.target;N.removeEventListener("dispose",Bt),ye(N)}function ye(M){Ie(M),lt.remove(M)}function Ie(M){const N=lt.get(M).programs;N!==void 0&&(N.forEach(function(z){Ct.releaseProgram(z)}),M.isShaderMaterial&&Ct.releaseShaderCache(M))}this.renderBufferDirect=function(M,N,z,G,k,it){N===null&&(N=ce);const ft=k.isMesh&&k.matrixWorld.determinant()<0,bt=Au(M,N,z,G,k);Rt.setMaterial(G,ft);let Tt=z.index,Ut=1;if(G.wireframe===!0){if(Tt=J.getWireframeAttribute(z),Tt===void 0)return;Ut=2}const zt=z.drawRange,At=z.attributes.position;let Jt=zt.start*Ut,de=(zt.start+zt.count)*Ut;it!==null&&(Jt=Math.max(Jt,it.start*Ut),de=Math.min(de,(it.start+it.count)*Ut)),Tt!==null?(Jt=Math.max(Jt,0),de=Math.min(de,Tt.count)):At!=null&&(Jt=Math.max(Jt,0),de=Math.min(de,At.count));const pe=de-Jt;if(pe<0||pe===1/0)return;ue.setup(k,G,bt,z,Tt);let Ge,te=Mt;if(Tt!==null&&(Ge=Y.get(Tt),te=qt,te.setIndex(Ge)),k.isMesh)G.wireframe===!0?(Rt.setLineWidth(G.wireframeLinewidth*he()),te.setMode(R.LINES)):te.setMode(R.TRIANGLES);else if(k.isLine){let wt=G.linewidth;wt===void 0&&(wt=1),Rt.setLineWidth(wt*he()),k.isLineSegments?te.setMode(R.LINES):k.isLineLoop?te.setMode(R.LINE_LOOP):te.setMode(R.LINE_STRIP)}else k.isPoints?te.setMode(R.POINTS):k.isSprite&&te.setMode(R.TRIANGLES);if(k.isBatchedMesh)if(k._multiDrawInstances!==null)te.renderMultiDrawInstances(k._multiDrawStarts,k._multiDrawCounts,k._multiDrawCount,k._multiDrawInstances);else if(Lt.get("WEBGL_multi_draw"))te.renderMultiDraw(k._multiDrawStarts,k._multiDrawCounts,k._multiDrawCount);else{const wt=k._multiDrawStarts,Dn=k._multiDrawCounts,ee=k._multiDrawCount,hn=Tt?Y.get(Tt).bytesPerElement:1,wi=lt.get(G).currentProgram.getUniforms();for(let Ye=0;Ye<ee;Ye++)wi.setValue(R,"_gl_DrawID",Ye),te.render(wt[Ye]/hn,Dn[Ye])}else if(k.isInstancedMesh)te.renderInstances(Jt,pe,k.count);else if(z.isInstancedBufferGeometry){const wt=z._maxInstanceCount!==void 0?z._maxInstanceCount:1/0,Dn=Math.min(z.instanceCount,wt);te.renderInstances(Jt,pe,Dn)}else te.render(Jt,pe)};function ie(M,N,z){M.transparent===!0&&M.side===Ve&&M.forceSinglePass===!1?(M.side=Be,M.needsUpdate=!0,Vs(M,N,z),M.side=gn,M.needsUpdate=!0,Vs(M,N,z),M.side=Ve):Vs(M,N,z)}this.compile=function(M,N,z=null){z===null&&(z=M),p=Zt.get(z),p.init(N),b.push(p),z.traverseVisible(function(k){k.isLight&&k.layers.test(N.layers)&&(p.pushLight(k),k.castShadow&&p.pushShadow(k))}),M!==z&&M.traverseVisible(function(k){k.isLight&&k.layers.test(N.layers)&&(p.pushLight(k),k.castShadow&&p.pushShadow(k))}),p.setupLights();const G=new Set;return M.traverse(function(k){if(!(k.isMesh||k.isPoints||k.isLine||k.isSprite))return;const it=k.material;if(it)if(Array.isArray(it))for(let ft=0;ft<it.length;ft++){const bt=it[ft];ie(bt,z,k),G.add(bt)}else ie(it,z,k),G.add(it)}),b.pop(),p=null,G},this.compileAsync=function(M,N,z=null){const G=this.compile(M,N,z);return new Promise(k=>{function it(){if(G.forEach(function(ft){lt.get(ft).currentProgram.isReady()&&G.delete(ft)}),G.size===0){k(M);return}setTimeout(it,10)}Lt.get("KHR_parallel_shader_compile")!==null?it():setTimeout(it,10)})};let cn=null;function In(M){cn&&cn(M)}function rl(){ai.stop()}function ol(){ai.start()}const ai=new Gh;ai.setAnimationLoop(In),typeof self<"u"&&ai.setContext(self),this.setAnimationLoop=function(M){cn=M,X.setAnimationLoop(M),M===null?ai.stop():ai.start()},X.addEventListener("sessionstart",rl),X.addEventListener("sessionend",ol),this.render=function(M,N){if(N!==void 0&&N.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(L===!0)return;if(M.matrixWorldAutoUpdate===!0&&M.updateMatrixWorld(),N.parent===null&&N.matrixWorldAutoUpdate===!0&&N.updateMatrixWorld(),X.enabled===!0&&X.isPresenting===!0&&(X.cameraAutoUpdate===!0&&X.updateCamera(N),N=X.getCamera()),M.isScene===!0&&M.onBeforeRender(S,M,N,P),p=Zt.get(M,b.length),p.init(N),b.push(p),Et.multiplyMatrices(N.projectionMatrix,N.matrixWorldInverse),$.setFromProjectionMatrix(Et),gt=this.localClippingEnabled,et=nt.init(this.clippingPlanes,gt),g=vt.get(M,x.length),g.init(),x.push(g),X.enabled===!0&&X.isPresenting===!0){const it=S.xr.getDepthSensingMesh();it!==null&&jr(it,N,-1/0,S.sortObjects)}jr(M,N,0,S.sortObjects),g.finish(),S.sortObjects===!0&&g.sort(rt,ht),Xt=X.enabled===!1||X.isPresenting===!1||X.hasDepthSensing()===!1,Xt&&Pt.addToRenderList(g,M),this.info.render.frame++,et===!0&&nt.beginShadows();const z=p.state.shadowsArray;St.render(z,M,N),et===!0&&nt.endShadows(),this.info.autoReset===!0&&this.info.reset();const G=g.opaque,k=g.transmissive;if(p.setupLights(),N.isArrayCamera){const it=N.cameras;if(k.length>0)for(let ft=0,bt=it.length;ft<bt;ft++){const Tt=it[ft];ll(G,k,M,Tt)}Xt&&Pt.render(M);for(let ft=0,bt=it.length;ft<bt;ft++){const Tt=it[ft];al(g,M,Tt,Tt.viewport)}}else k.length>0&&ll(G,k,M,N),Xt&&Pt.render(M),al(g,M,N);P!==null&&(A.updateMultisampleRenderTarget(P),A.updateRenderTargetMipmap(P)),M.isScene===!0&&M.onAfterRender(S,M,N),ue.resetDefaultState(),T=-1,E=null,b.pop(),b.length>0?(p=b[b.length-1],et===!0&&nt.setGlobalState(S.clippingPlanes,p.state.camera)):p=null,x.pop(),x.length>0?g=x[x.length-1]:g=null};function jr(M,N,z,G){if(M.visible===!1)return;if(M.layers.test(N.layers)){if(M.isGroup)z=M.renderOrder;else if(M.isLOD)M.autoUpdate===!0&&M.update(N);else if(M.isLight)p.pushLight(M),M.castShadow&&p.pushShadow(M);else if(M.isSprite){if(!M.frustumCulled||$.intersectsSprite(M)){G&&Vt.setFromMatrixPosition(M.matrixWorld).applyMatrix4(Et);const ft=j.update(M),bt=M.material;bt.visible&&g.push(M,ft,bt,z,Vt.z,null)}}else if((M.isMesh||M.isLine||M.isPoints)&&(!M.frustumCulled||$.intersectsObject(M))){const ft=j.update(M),bt=M.material;if(G&&(M.boundingSphere!==void 0?(M.boundingSphere===null&&M.computeBoundingSphere(),Vt.copy(M.boundingSphere.center)):(ft.boundingSphere===null&&ft.computeBoundingSphere(),Vt.copy(ft.boundingSphere.center)),Vt.applyMatrix4(M.matrixWorld).applyMatrix4(Et)),Array.isArray(bt)){const Tt=ft.groups;for(let Ut=0,zt=Tt.length;Ut<zt;Ut++){const At=Tt[Ut],Jt=bt[At.materialIndex];Jt&&Jt.visible&&g.push(M,ft,Jt,z,Vt.z,At)}}else bt.visible&&g.push(M,ft,bt,z,Vt.z,null)}}const it=M.children;for(let ft=0,bt=it.length;ft<bt;ft++)jr(it[ft],N,z,G)}function al(M,N,z,G){const k=M.opaque,it=M.transmissive,ft=M.transparent;p.setupLightsView(z),et===!0&&nt.setGlobalState(S.clippingPlanes,z),G&&Rt.viewport(D.copy(G)),k.length>0&&Ws(k,N,z),it.length>0&&Ws(it,N,z),ft.length>0&&Ws(ft,N,z),Rt.buffers.depth.setTest(!0),Rt.buffers.depth.setMask(!0),Rt.buffers.color.setMask(!0),Rt.setPolygonOffset(!1)}function ll(M,N,z,G){if((z.isScene===!0?z.overrideMaterial:null)!==null)return;p.state.transmissionRenderTarget[G.id]===void 0&&(p.state.transmissionRenderTarget[G.id]=new Ai(1,1,{generateMipmaps:!0,type:Lt.has("EXT_color_buffer_half_float")||Lt.has("EXT_color_buffer_float")?Fs:Wn,minFilter:Mi,samples:4,stencilBuffer:r,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:jt.workingColorSpace}));const it=p.state.transmissionRenderTarget[G.id],ft=G.viewport||D;it.setSize(ft.z,ft.w);const bt=S.getRenderTarget();S.setRenderTarget(it),S.getClearColor(K),Z=S.getClearAlpha(),Z<1&&S.setClearColor(16777215,.5),S.clear(),Xt&&Pt.render(z);const Tt=S.toneMapping;S.toneMapping=si;const Ut=G.viewport;if(G.viewport!==void 0&&(G.viewport=void 0),p.setupLightsView(G),et===!0&&nt.setGlobalState(S.clippingPlanes,G),Ws(M,z,G),A.updateMultisampleRenderTarget(it),A.updateRenderTargetMipmap(it),Lt.has("WEBGL_multisampled_render_to_texture")===!1){let zt=!1;for(let At=0,Jt=N.length;At<Jt;At++){const de=N[At],pe=de.object,Ge=de.geometry,te=de.material,wt=de.group;if(te.side===Ve&&pe.layers.test(G.layers)){const Dn=te.side;te.side=Be,te.needsUpdate=!0,cl(pe,z,G,Ge,te,wt),te.side=Dn,te.needsUpdate=!0,zt=!0}}zt===!0&&(A.updateMultisampleRenderTarget(it),A.updateRenderTargetMipmap(it))}S.setRenderTarget(bt),S.setClearColor(K,Z),Ut!==void 0&&(G.viewport=Ut),S.toneMapping=Tt}function Ws(M,N,z){const G=N.isScene===!0?N.overrideMaterial:null;for(let k=0,it=M.length;k<it;k++){const ft=M[k],bt=ft.object,Tt=ft.geometry,Ut=G===null?ft.material:G,zt=ft.group;bt.layers.test(z.layers)&&cl(bt,N,z,Tt,Ut,zt)}}function cl(M,N,z,G,k,it){M.onBeforeRender(S,N,z,G,k,it),M.modelViewMatrix.multiplyMatrices(z.matrixWorldInverse,M.matrixWorld),M.normalMatrix.getNormalMatrix(M.modelViewMatrix),k.onBeforeRender(S,N,z,G,M,it),k.transparent===!0&&k.side===Ve&&k.forceSinglePass===!1?(k.side=Be,k.needsUpdate=!0,S.renderBufferDirect(z,N,G,k,M,it),k.side=gn,k.needsUpdate=!0,S.renderBufferDirect(z,N,G,k,M,it),k.side=Ve):S.renderBufferDirect(z,N,G,k,M,it),M.onAfterRender(S,N,z,G,k,it)}function Vs(M,N,z){N.isScene!==!0&&(N=ce);const G=lt.get(M),k=p.state.lights,it=p.state.shadowsArray,ft=k.state.version,bt=Ct.getParameters(M,k.state,it,N,z),Tt=Ct.getProgramCacheKey(bt);let Ut=G.programs;G.environment=M.isMeshStandardMaterial?N.environment:null,G.fog=N.fog,G.envMap=(M.isMeshStandardMaterial?U:v).get(M.envMap||G.environment),G.envMapRotation=G.environment!==null&&M.envMap===null?N.environmentRotation:M.envMapRotation,Ut===void 0&&(M.addEventListener("dispose",Bt),Ut=new Map,G.programs=Ut);let zt=Ut.get(Tt);if(zt!==void 0){if(G.currentProgram===zt&&G.lightsStateVersion===ft)return ul(M,bt),zt}else bt.uniforms=Ct.getUniforms(M),M.onBeforeCompile(bt,S),zt=Ct.acquireProgram(bt,Tt),Ut.set(Tt,zt),G.uniforms=bt.uniforms;const At=G.uniforms;return(!M.isShaderMaterial&&!M.isRawShaderMaterial||M.clipping===!0)&&(At.clippingPlanes=nt.uniform),ul(M,bt),G.needsLights=wu(M),G.lightsStateVersion=ft,G.needsLights&&(At.ambientLightColor.value=k.state.ambient,At.lightProbe.value=k.state.probe,At.directionalLights.value=k.state.directional,At.directionalLightShadows.value=k.state.directionalShadow,At.spotLights.value=k.state.spot,At.spotLightShadows.value=k.state.spotShadow,At.rectAreaLights.value=k.state.rectArea,At.ltc_1.value=k.state.rectAreaLTC1,At.ltc_2.value=k.state.rectAreaLTC2,At.pointLights.value=k.state.point,At.pointLightShadows.value=k.state.pointShadow,At.hemisphereLights.value=k.state.hemi,At.directionalShadowMap.value=k.state.directionalShadowMap,At.directionalShadowMatrix.value=k.state.directionalShadowMatrix,At.spotShadowMap.value=k.state.spotShadowMap,At.spotLightMatrix.value=k.state.spotLightMatrix,At.spotLightMap.value=k.state.spotLightMap,At.pointShadowMap.value=k.state.pointShadowMap,At.pointShadowMatrix.value=k.state.pointShadowMatrix),G.currentProgram=zt,G.uniformsList=null,zt}function hl(M){if(M.uniformsList===null){const N=M.currentProgram.getUniforms();M.uniformsList=Ir.seqWithValue(N.seq,M.uniforms)}return M.uniformsList}function ul(M,N){const z=lt.get(M);z.outputColorSpace=N.outputColorSpace,z.batching=N.batching,z.batchingColor=N.batchingColor,z.instancing=N.instancing,z.instancingColor=N.instancingColor,z.instancingMorph=N.instancingMorph,z.skinning=N.skinning,z.morphTargets=N.morphTargets,z.morphNormals=N.morphNormals,z.morphColors=N.morphColors,z.morphTargetsCount=N.morphTargetsCount,z.numClippingPlanes=N.numClippingPlanes,z.numIntersection=N.numClipIntersection,z.vertexAlphas=N.vertexAlphas,z.vertexTangents=N.vertexTangents,z.toneMapping=N.toneMapping}function Au(M,N,z,G,k){N.isScene!==!0&&(N=ce),A.resetTextureUnits();const it=N.fog,ft=G.isMeshStandardMaterial?N.environment:null,bt=P===null?S.outputColorSpace:P.isXRRenderTarget===!0?P.texture.colorSpace:ds,Tt=(G.isMeshStandardMaterial?U:v).get(G.envMap||ft),Ut=G.vertexColors===!0&&!!z.attributes.color&&z.attributes.color.itemSize===4,zt=!!z.attributes.tangent&&(!!G.normalMap||G.anisotropy>0),At=!!z.morphAttributes.position,Jt=!!z.morphAttributes.normal,de=!!z.morphAttributes.color;let pe=si;G.toneMapped&&(P===null||P.isXRRenderTarget===!0)&&(pe=S.toneMapping);const Ge=z.morphAttributes.position||z.morphAttributes.normal||z.morphAttributes.color,te=Ge!==void 0?Ge.length:0,wt=lt.get(G),Dn=p.state.lights;if(et===!0&&(gt===!0||M!==E)){const en=M===E&&G.id===T;nt.setState(G,M,en)}let ee=!1;G.version===wt.__version?(wt.needsLights&&wt.lightsStateVersion!==Dn.state.version||wt.outputColorSpace!==bt||k.isBatchedMesh&&wt.batching===!1||!k.isBatchedMesh&&wt.batching===!0||k.isBatchedMesh&&wt.batchingColor===!0&&k.colorTexture===null||k.isBatchedMesh&&wt.batchingColor===!1&&k.colorTexture!==null||k.isInstancedMesh&&wt.instancing===!1||!k.isInstancedMesh&&wt.instancing===!0||k.isSkinnedMesh&&wt.skinning===!1||!k.isSkinnedMesh&&wt.skinning===!0||k.isInstancedMesh&&wt.instancingColor===!0&&k.instanceColor===null||k.isInstancedMesh&&wt.instancingColor===!1&&k.instanceColor!==null||k.isInstancedMesh&&wt.instancingMorph===!0&&k.morphTexture===null||k.isInstancedMesh&&wt.instancingMorph===!1&&k.morphTexture!==null||wt.envMap!==Tt||G.fog===!0&&wt.fog!==it||wt.numClippingPlanes!==void 0&&(wt.numClippingPlanes!==nt.numPlanes||wt.numIntersection!==nt.numIntersection)||wt.vertexAlphas!==Ut||wt.vertexTangents!==zt||wt.morphTargets!==At||wt.morphNormals!==Jt||wt.morphColors!==de||wt.toneMapping!==pe||wt.morphTargetsCount!==te)&&(ee=!0):(ee=!0,wt.__version=G.version);let hn=wt.currentProgram;ee===!0&&(hn=Vs(G,N,k));let wi=!1,Ye=!1,gs=!1;const me=hn.getUniforms(),yn=wt.uniforms;if(Rt.useProgram(hn.program)&&(wi=!0,Ye=!0,gs=!0),G.id!==T&&(T=G.id,Ye=!0),wi||E!==M){Rt.buffers.depth.getReversed()?(ot.copy(M.projectionMatrix),Od(ot),Nd(ot),me.setValue(R,"projectionMatrix",ot)):me.setValue(R,"projectionMatrix",M.projectionMatrix),me.setValue(R,"viewMatrix",M.matrixWorldInverse);const Vn=me.map.cameraPosition;Vn!==void 0&&Vn.setValue(R,xt.setFromMatrixPosition(M.matrixWorld)),_t.logarithmicDepthBuffer&&me.setValue(R,"logDepthBufFC",2/(Math.log(M.far+1)/Math.LN2)),(G.isMeshPhongMaterial||G.isMeshToonMaterial||G.isMeshLambertMaterial||G.isMeshBasicMaterial||G.isMeshStandardMaterial||G.isShaderMaterial)&&me.setValue(R,"isOrthographic",M.isOrthographicCamera===!0),E!==M&&(E=M,Ye=!0,gs=!0)}if(k.isSkinnedMesh){me.setOptional(R,k,"bindMatrix"),me.setOptional(R,k,"bindMatrixInverse");const en=k.skeleton;en&&(en.boneTexture===null&&en.computeBoneTexture(),me.setValue(R,"boneTexture",en.boneTexture,A))}k.isBatchedMesh&&(me.setOptional(R,k,"batchingTexture"),me.setValue(R,"batchingTexture",k._matricesTexture,A),me.setOptional(R,k,"batchingIdTexture"),me.setValue(R,"batchingIdTexture",k._indirectTexture,A),me.setOptional(R,k,"batchingColorTexture"),k._colorsTexture!==null&&me.setValue(R,"batchingColorTexture",k._colorsTexture,A));const ys=z.morphAttributes;if((ys.position!==void 0||ys.normal!==void 0||ys.color!==void 0)&&Ot.update(k,z,hn),(Ye||wt.receiveShadow!==k.receiveShadow)&&(wt.receiveShadow=k.receiveShadow,me.setValue(R,"receiveShadow",k.receiveShadow)),G.isMeshGouraudMaterial&&G.envMap!==null&&(yn.envMap.value=Tt,yn.flipEnvMap.value=Tt.isCubeTexture&&Tt.isRenderTargetTexture===!1?-1:1),G.isMeshStandardMaterial&&G.envMap===null&&N.environment!==null&&(yn.envMapIntensity.value=N.environmentIntensity),Ye&&(me.setValue(R,"toneMappingExposure",S.toneMappingExposure),wt.needsLights&&Cu(yn,gs),it&&G.fog===!0&&ut.refreshFogUniforms(yn,it),ut.refreshMaterialUniforms(yn,G,W,Q,p.state.transmissionRenderTarget[M.id]),Ir.upload(R,hl(wt),yn,A)),G.isShaderMaterial&&G.uniformsNeedUpdate===!0&&(Ir.upload(R,hl(wt),yn,A),G.uniformsNeedUpdate=!1),G.isSpriteMaterial&&me.setValue(R,"center",k.center),me.setValue(R,"modelViewMatrix",k.modelViewMatrix),me.setValue(R,"normalMatrix",k.normalMatrix),me.setValue(R,"modelMatrix",k.matrixWorld),G.isShaderMaterial||G.isRawShaderMaterial){const en=G.uniformsGroups;for(let Vn=0,Xn=en.length;Vn<Xn;Vn++){const dl=en[Vn];O.update(dl,hn),O.bind(dl,hn)}}return hn}function Cu(M,N){M.ambientLightColor.needsUpdate=N,M.lightProbe.needsUpdate=N,M.directionalLights.needsUpdate=N,M.directionalLightShadows.needsUpdate=N,M.pointLights.needsUpdate=N,M.pointLightShadows.needsUpdate=N,M.spotLights.needsUpdate=N,M.spotLightShadows.needsUpdate=N,M.rectAreaLights.needsUpdate=N,M.hemisphereLights.needsUpdate=N}function wu(M){return M.isMeshLambertMaterial||M.isMeshToonMaterial||M.isMeshPhongMaterial||M.isMeshStandardMaterial||M.isShadowMaterial||M.isShaderMaterial&&M.lights===!0}this.getActiveCubeFace=function(){return C},this.getActiveMipmapLevel=function(){return w},this.getRenderTarget=function(){return P},this.setRenderTargetTextures=function(M,N,z){lt.get(M.texture).__webglTexture=N,lt.get(M.depthTexture).__webglTexture=z;const G=lt.get(M);G.__hasExternalTextures=!0,G.__autoAllocateDepthBuffer=z===void 0,G.__autoAllocateDepthBuffer||Lt.has("WEBGL_multisampled_render_to_texture")===!0&&(console.warn("THREE.WebGLRenderer: Render-to-texture extension was disabled because an external texture was provided"),G.__useRenderToTexture=!1)},this.setRenderTargetFramebuffer=function(M,N){const z=lt.get(M);z.__webglFramebuffer=N,z.__useDefaultFramebuffer=N===void 0},this.setRenderTarget=function(M,N=0,z=0){P=M,C=N,w=z;let G=!0,k=null,it=!1,ft=!1;if(M){const Tt=lt.get(M);if(Tt.__useDefaultFramebuffer!==void 0)Rt.bindFramebuffer(R.FRAMEBUFFER,null),G=!1;else if(Tt.__webglFramebuffer===void 0)A.setupRenderTarget(M);else if(Tt.__hasExternalTextures)A.rebindTextures(M,lt.get(M.texture).__webglTexture,lt.get(M.depthTexture).__webglTexture);else if(M.depthBuffer){const At=M.depthTexture;if(Tt.__boundDepthTexture!==At){if(At!==null&&lt.has(At)&&(M.width!==At.image.width||M.height!==At.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");A.setupDepthRenderbuffer(M)}}const Ut=M.texture;(Ut.isData3DTexture||Ut.isDataArrayTexture||Ut.isCompressedArrayTexture)&&(ft=!0);const zt=lt.get(M).__webglFramebuffer;M.isWebGLCubeRenderTarget?(Array.isArray(zt[N])?k=zt[N][z]:k=zt[N],it=!0):M.samples>0&&A.useMultisampledRTT(M)===!1?k=lt.get(M).__webglMultisampledFramebuffer:Array.isArray(zt)?k=zt[z]:k=zt,D.copy(M.viewport),H.copy(M.scissor),B=M.scissorTest}else D.copy(yt).multiplyScalar(W).floor(),H.copy(kt).multiplyScalar(W).floor(),B=$t;if(Rt.bindFramebuffer(R.FRAMEBUFFER,k)&&G&&Rt.drawBuffers(M,k),Rt.viewport(D),Rt.scissor(H),Rt.setScissorTest(B),it){const Tt=lt.get(M.texture);R.framebufferTexture2D(R.FRAMEBUFFER,R.COLOR_ATTACHMENT0,R.TEXTURE_CUBE_MAP_POSITIVE_X+N,Tt.__webglTexture,z)}else if(ft){const Tt=lt.get(M.texture),Ut=N||0;R.framebufferTextureLayer(R.FRAMEBUFFER,R.COLOR_ATTACHMENT0,Tt.__webglTexture,z||0,Ut)}T=-1},this.readRenderTargetPixels=function(M,N,z,G,k,it,ft){if(!(M&&M.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let bt=lt.get(M).__webglFramebuffer;if(M.isWebGLCubeRenderTarget&&ft!==void 0&&(bt=bt[ft]),bt){Rt.bindFramebuffer(R.FRAMEBUFFER,bt);try{const Tt=M.texture,Ut=Tt.format,zt=Tt.type;if(!_t.textureFormatReadable(Ut)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!_t.textureTypeReadable(zt)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}N>=0&&N<=M.width-G&&z>=0&&z<=M.height-k&&R.readPixels(N,z,G,k,Ht.convert(Ut),Ht.convert(zt),it)}finally{const Tt=P!==null?lt.get(P).__webglFramebuffer:null;Rt.bindFramebuffer(R.FRAMEBUFFER,Tt)}}},this.readRenderTargetPixelsAsync=async function(M,N,z,G,k,it,ft){if(!(M&&M.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let bt=lt.get(M).__webglFramebuffer;if(M.isWebGLCubeRenderTarget&&ft!==void 0&&(bt=bt[ft]),bt){const Tt=M.texture,Ut=Tt.format,zt=Tt.type;if(!_t.textureFormatReadable(Ut))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!_t.textureTypeReadable(zt))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");if(N>=0&&N<=M.width-G&&z>=0&&z<=M.height-k){Rt.bindFramebuffer(R.FRAMEBUFFER,bt);const At=R.createBuffer();R.bindBuffer(R.PIXEL_PACK_BUFFER,At),R.bufferData(R.PIXEL_PACK_BUFFER,it.byteLength,R.STREAM_READ),R.readPixels(N,z,G,k,Ht.convert(Ut),Ht.convert(zt),0);const Jt=P!==null?lt.get(P).__webglFramebuffer:null;Rt.bindFramebuffer(R.FRAMEBUFFER,Jt);const de=R.fenceSync(R.SYNC_GPU_COMMANDS_COMPLETE,0);return R.flush(),await Ld(R,de,4),R.bindBuffer(R.PIXEL_PACK_BUFFER,At),R.getBufferSubData(R.PIXEL_PACK_BUFFER,0,it),R.deleteBuffer(At),R.deleteSync(de),it}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")}},this.copyFramebufferToTexture=function(M,N=null,z=0){M.isTexture!==!0&&(Is("WebGLRenderer: copyFramebufferToTexture function signature has changed."),N=arguments[0]||null,M=arguments[1]);const G=Math.pow(2,-z),k=Math.floor(M.image.width*G),it=Math.floor(M.image.height*G),ft=N!==null?N.x:0,bt=N!==null?N.y:0;A.setTexture2D(M,0),R.copyTexSubImage2D(R.TEXTURE_2D,z,0,0,ft,bt,k,it),Rt.unbindTexture()},this.copyTextureToTexture=function(M,N,z=null,G=null,k=0){M.isTexture!==!0&&(Is("WebGLRenderer: copyTextureToTexture function signature has changed."),G=arguments[0]||null,M=arguments[1],N=arguments[2],k=arguments[3]||0,z=null);let it,ft,bt,Tt,Ut,zt,At,Jt,de;const pe=M.isCompressedTexture?M.mipmaps[k]:M.image;z!==null?(it=z.max.x-z.min.x,ft=z.max.y-z.min.y,bt=z.isBox3?z.max.z-z.min.z:1,Tt=z.min.x,Ut=z.min.y,zt=z.isBox3?z.min.z:0):(it=pe.width,ft=pe.height,bt=pe.depth||1,Tt=0,Ut=0,zt=0),G!==null?(At=G.x,Jt=G.y,de=G.z):(At=0,Jt=0,de=0);const Ge=Ht.convert(N.format),te=Ht.convert(N.type);let wt;N.isData3DTexture?(A.setTexture3D(N,0),wt=R.TEXTURE_3D):N.isDataArrayTexture||N.isCompressedArrayTexture?(A.setTexture2DArray(N,0),wt=R.TEXTURE_2D_ARRAY):(A.setTexture2D(N,0),wt=R.TEXTURE_2D),R.pixelStorei(R.UNPACK_FLIP_Y_WEBGL,N.flipY),R.pixelStorei(R.UNPACK_PREMULTIPLY_ALPHA_WEBGL,N.premultiplyAlpha),R.pixelStorei(R.UNPACK_ALIGNMENT,N.unpackAlignment);const Dn=R.getParameter(R.UNPACK_ROW_LENGTH),ee=R.getParameter(R.UNPACK_IMAGE_HEIGHT),hn=R.getParameter(R.UNPACK_SKIP_PIXELS),wi=R.getParameter(R.UNPACK_SKIP_ROWS),Ye=R.getParameter(R.UNPACK_SKIP_IMAGES);R.pixelStorei(R.UNPACK_ROW_LENGTH,pe.width),R.pixelStorei(R.UNPACK_IMAGE_HEIGHT,pe.height),R.pixelStorei(R.UNPACK_SKIP_PIXELS,Tt),R.pixelStorei(R.UNPACK_SKIP_ROWS,Ut),R.pixelStorei(R.UNPACK_SKIP_IMAGES,zt);const gs=M.isDataArrayTexture||M.isData3DTexture,me=N.isDataArrayTexture||N.isData3DTexture;if(M.isRenderTargetTexture||M.isDepthTexture){const yn=lt.get(M),ys=lt.get(N),en=lt.get(yn.__renderTarget),Vn=lt.get(ys.__renderTarget);Rt.bindFramebuffer(R.READ_FRAMEBUFFER,en.__webglFramebuffer),Rt.bindFramebuffer(R.DRAW_FRAMEBUFFER,Vn.__webglFramebuffer);for(let Xn=0;Xn<bt;Xn++)gs&&R.framebufferTextureLayer(R.READ_FRAMEBUFFER,R.COLOR_ATTACHMENT0,lt.get(M).__webglTexture,k,zt+Xn),M.isDepthTexture?(me&&R.framebufferTextureLayer(R.DRAW_FRAMEBUFFER,R.COLOR_ATTACHMENT0,lt.get(N).__webglTexture,k,de+Xn),R.blitFramebuffer(Tt,Ut,it,ft,At,Jt,it,ft,R.DEPTH_BUFFER_BIT,R.NEAREST)):me?R.copyTexSubImage3D(wt,k,At,Jt,de+Xn,Tt,Ut,it,ft):R.copyTexSubImage2D(wt,k,At,Jt,de+Xn,Tt,Ut,it,ft);Rt.bindFramebuffer(R.READ_FRAMEBUFFER,null),Rt.bindFramebuffer(R.DRAW_FRAMEBUFFER,null)}else me?M.isDataTexture||M.isData3DTexture?R.texSubImage3D(wt,k,At,Jt,de,it,ft,bt,Ge,te,pe.data):N.isCompressedArrayTexture?R.compressedTexSubImage3D(wt,k,At,Jt,de,it,ft,bt,Ge,pe.data):R.texSubImage3D(wt,k,At,Jt,de,it,ft,bt,Ge,te,pe):M.isDataTexture?R.texSubImage2D(R.TEXTURE_2D,k,At,Jt,it,ft,Ge,te,pe.data):M.isCompressedTexture?R.compressedTexSubImage2D(R.TEXTURE_2D,k,At,Jt,pe.width,pe.height,Ge,pe.data):R.texSubImage2D(R.TEXTURE_2D,k,At,Jt,it,ft,Ge,te,pe);R.pixelStorei(R.UNPACK_ROW_LENGTH,Dn),R.pixelStorei(R.UNPACK_IMAGE_HEIGHT,ee),R.pixelStorei(R.UNPACK_SKIP_PIXELS,hn),R.pixelStorei(R.UNPACK_SKIP_ROWS,wi),R.pixelStorei(R.UNPACK_SKIP_IMAGES,Ye),k===0&&N.generateMipmaps&&R.generateMipmap(wt),Rt.unbindTexture()},this.copyTextureToTexture3D=function(M,N,z=null,G=null,k=0){return M.isTexture!==!0&&(Is("WebGLRenderer: copyTextureToTexture3D function signature has changed."),z=arguments[0]||null,G=arguments[1]||null,M=arguments[2],N=arguments[3],k=arguments[4]||0),Is('WebGLRenderer: copyTextureToTexture3D function has been deprecated. Use "copyTextureToTexture" instead.'),this.copyTextureToTexture(M,N,z,G,k)},this.initRenderTarget=function(M){lt.get(M).__webglFramebuffer===void 0&&A.setupRenderTarget(M)},this.initTexture=function(M){M.isCubeTexture?A.setTextureCube(M,0):M.isData3DTexture?A.setTexture3D(M,0):M.isDataArrayTexture||M.isCompressedArrayTexture?A.setTexture2DArray(M,0):A.setTexture2D(M,0),Rt.unbindTexture()},this.resetState=function(){C=0,w=0,P=null,Rt.reset(),ue.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return Bn}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(t){this._outputColorSpace=t;const e=this.getContext();e.drawingBufferColorspace=jt._getDrawingBufferColorSpace(t),e.unpackColorSpace=jt._getUnpackColorSpace()}}class ja{constructor(t,e=25e-5){this.isFogExp2=!0,this.name="",this.color=new Dt(t),this.density=e}clone(){return new ja(this.color,this.density)}toJSON(){return{type:"FogExp2",name:this.name,color:this.color.getHex(),density:this.density}}}class $h extends Ce{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new Xe,this.environmentIntensity=1,this.environmentRotation=new Xe,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(t,e){return super.copy(t,e),t.background!==null&&(this.background=t.background.clone()),t.environment!==null&&(this.environment=t.environment.clone()),t.fog!==null&&(this.fog=t.fog.clone()),this.backgroundBlurriness=t.backgroundBlurriness,this.backgroundIntensity=t.backgroundIntensity,this.backgroundRotation.copy(t.backgroundRotation),this.environmentIntensity=t.environmentIntensity,this.environmentRotation.copy(t.environmentRotation),t.overrideMaterial!==null&&(this.overrideMaterial=t.overrideMaterial.clone()),this.matrixAutoUpdate=t.matrixAutoUpdate,this}toJSON(t){const e=super.toJSON(t);return this.fog!==null&&(e.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(e.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(e.object.backgroundIntensity=this.backgroundIntensity),e.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(e.object.environmentIntensity=this.environmentIntensity),e.object.environmentRotation=this.environmentRotation.toArray(),e}}class Zh extends Oe{static get type(){return"LineBasicMaterial"}constructor(t){super(),this.isLineBasicMaterial=!0,this.color=new Dt(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.linewidth=t.linewidth,this.linecap=t.linecap,this.linejoin=t.linejoin,this.fog=t.fog,this}}const kr=new I,Ur=new I,uc=new le,xs=new Yr,dr=new zs,Co=new I,dc=new I;class X0 extends Ce{constructor(t=new Ke,e=new Zh){super(),this.isLine=!0,this.type="Line",this.geometry=t,this.material=e,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}computeLineDistances(){const t=this.geometry;if(t.index===null){const e=t.attributes.position,n=[0];for(let i=1,r=e.count;i<r;i++)kr.fromBufferAttribute(e,i-1),Ur.fromBufferAttribute(e,i),n[i]=n[i-1],n[i]+=kr.distanceTo(Ur);t.setAttribute("lineDistance",new Re(n,1))}else console.warn("THREE.Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(t,e){const n=this.geometry,i=this.matrixWorld,r=t.params.Line.threshold,o=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),dr.copy(n.boundingSphere),dr.applyMatrix4(i),dr.radius+=r,t.ray.intersectsSphere(dr)===!1)return;uc.copy(i).invert(),xs.copy(t.ray).applyMatrix4(uc);const a=r/((this.scale.x+this.scale.y+this.scale.z)/3),l=a*a,c=this.isLineSegments?2:1,h=n.index,d=n.attributes.position;if(h!==null){const f=Math.max(0,o.start),y=Math.min(h.count,o.start+o.count);for(let _=f,g=y-1;_<g;_+=c){const p=h.getX(_),x=h.getX(_+1),b=fr(this,t,xs,l,p,x);b&&e.push(b)}if(this.isLineLoop){const _=h.getX(y-1),g=h.getX(f),p=fr(this,t,xs,l,_,g);p&&e.push(p)}}else{const f=Math.max(0,o.start),y=Math.min(d.count,o.start+o.count);for(let _=f,g=y-1;_<g;_+=c){const p=fr(this,t,xs,l,_,_+1);p&&e.push(p)}if(this.isLineLoop){const _=fr(this,t,xs,l,y-1,f);_&&e.push(_)}}}updateMorphTargets(){const e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){const i=e[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=i.length;r<o;r++){const a=i[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}}function fr(s,t,e,n,i,r){const o=s.geometry.attributes.position;if(kr.fromBufferAttribute(o,i),Ur.fromBufferAttribute(o,r),e.distanceSqToSegment(kr,Ur,Co,dc)>n)return;Co.applyMatrix4(s.matrixWorld);const l=t.ray.origin.distanceTo(Co);if(!(l<t.near||l>t.far))return{distance:l,point:dc.clone().applyMatrix4(s.matrixWorld),index:i,face:null,faceIndex:null,barycoord:null,object:s}}const fc=new I,pc=new I;class K0 extends X0{constructor(t,e){super(t,e),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){const t=this.geometry;if(t.index===null){const e=t.attributes.position,n=[];for(let i=0,r=e.count;i<r;i+=2)fc.fromBufferAttribute(e,i),pc.fromBufferAttribute(e,i+1),n[i]=i===0?0:n[i-1],n[i+1]=n[i]+fc.distanceTo(pc);t.setAttribute("lineDistance",new Re(n,1))}else console.warn("THREE.LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}}class Ja extends Oe{static get type(){return"PointsMaterial"}constructor(t){super(),this.isPointsMaterial=!0,this.color=new Dt(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.alphaMap=t.alphaMap,this.size=t.size,this.sizeAttenuation=t.sizeAttenuation,this.fog=t.fog,this}}const mc=new le,Pa=new Yr,pr=new zs,mr=new I;class jh extends Ce{constructor(t=new Ke,e=new Ja){super(),this.isPoints=!0,this.type="Points",this.geometry=t,this.material=e,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}raycast(t,e){const n=this.geometry,i=this.matrixWorld,r=t.params.Points.threshold,o=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),pr.copy(n.boundingSphere),pr.applyMatrix4(i),pr.radius+=r,t.ray.intersectsSphere(pr)===!1)return;mc.copy(i).invert(),Pa.copy(t.ray).applyMatrix4(mc);const a=r/((this.scale.x+this.scale.y+this.scale.z)/3),l=a*a,c=n.index,u=n.attributes.position;if(c!==null){const d=Math.max(0,o.start),f=Math.min(c.count,o.start+o.count);for(let y=d,_=f;y<_;y++){const g=c.getX(y);mr.fromBufferAttribute(u,g),gc(mr,g,l,i,t,e,this)}}else{const d=Math.max(0,o.start),f=Math.min(u.count,o.start+o.count);for(let y=d,_=f;y<_;y++)mr.fromBufferAttribute(u,y),gc(mr,y,l,i,t,e,this)}}updateMorphTargets(){const e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){const i=e[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=i.length;r<o;r++){const a=i[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}}function gc(s,t,e,n,i,r,o){const a=Pa.distanceSqToPoint(s);if(a<e){const l=new I;Pa.closestPointToPoint(s,l),l.applyMatrix4(n);const c=i.ray.origin.distanceTo(l);if(c<i.near||c>i.far)return;r.push({distance:c,distanceToRay:Math.sqrt(a),point:l,index:t,face:null,faceIndex:null,barycoord:null,object:o})}}class Y0 extends ze{constructor(t,e,n,i,r,o,a,l,c){super(t,e,n,i,r,o,a,l,c),this.isCanvasTexture=!0,this.needsUpdate=!0}}const gr=new I,yr=new I,wo=new I,_r=new on;class q0 extends Ke{constructor(t=null,e=1){if(super(),this.type="EdgesGeometry",this.parameters={geometry:t,thresholdAngle:e},t!==null){const i=Math.pow(10,4),r=Math.cos(Qi*e),o=t.getIndex(),a=t.getAttribute("position"),l=o?o.count:a.count,c=[0,0,0],h=["a","b","c"],u=new Array(3),d={},f=[];for(let y=0;y<l;y+=3){o?(c[0]=o.getX(y),c[1]=o.getX(y+1),c[2]=o.getX(y+2)):(c[0]=y,c[1]=y+1,c[2]=y+2);const{a:_,b:g,c:p}=_r;if(_.fromBufferAttribute(a,c[0]),g.fromBufferAttribute(a,c[1]),p.fromBufferAttribute(a,c[2]),_r.getNormal(wo),u[0]=`${Math.round(_.x*i)},${Math.round(_.y*i)},${Math.round(_.z*i)}`,u[1]=`${Math.round(g.x*i)},${Math.round(g.y*i)},${Math.round(g.z*i)}`,u[2]=`${Math.round(p.x*i)},${Math.round(p.y*i)},${Math.round(p.z*i)}`,!(u[0]===u[1]||u[1]===u[2]||u[2]===u[0]))for(let x=0;x<3;x++){const b=(x+1)%3,S=u[x],L=u[b],C=_r[h[x]],w=_r[h[b]],P=`${S}_${L}`,T=`${L}_${S}`;T in d&&d[T]?(wo.dot(d[T].normal)<=r&&(f.push(C.x,C.y,C.z),f.push(w.x,w.y,w.z)),d[T]=null):P in d||(d[P]={index0:c[x],index1:c[b],normal:wo.clone()})}}for(const y in d)if(d[y]){const{index0:_,index1:g}=d[y];gr.fromBufferAttribute(a,_),yr.fromBufferAttribute(a,g),f.push(gr.x,gr.y,gr.z),f.push(yr.x,yr.y,yr.z)}this.setAttribute("position",new Re(f,3))}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}}class Fr extends Ke{constructor(t=1,e=32,n=16,i=0,r=Math.PI*2,o=0,a=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:t,widthSegments:e,heightSegments:n,phiStart:i,phiLength:r,thetaStart:o,thetaLength:a},e=Math.max(3,Math.floor(e)),n=Math.max(2,Math.floor(n));const l=Math.min(o+a,Math.PI);let c=0;const h=[],u=new I,d=new I,f=[],y=[],_=[],g=[];for(let p=0;p<=n;p++){const x=[],b=p/n;let S=0;p===0&&o===0?S=.5/e:p===n&&l===Math.PI&&(S=-.5/e);for(let L=0;L<=e;L++){const C=L/e;u.x=-t*Math.cos(i+C*r)*Math.sin(o+b*a),u.y=t*Math.cos(o+b*a),u.z=t*Math.sin(i+C*r)*Math.sin(o+b*a),y.push(u.x,u.y,u.z),d.copy(u).normalize(),_.push(d.x,d.y,d.z),g.push(C+S,1-b),x.push(c++)}h.push(x)}for(let p=0;p<n;p++)for(let x=0;x<e;x++){const b=h[p][x+1],S=h[p][x],L=h[p+1][x],C=h[p+1][x+1];(p!==0||o>0)&&f.push(b,S,C),(p!==n-1||l<Math.PI)&&f.push(S,L,C)}this.setIndex(f),this.setAttribute("position",new Re(y,3)),this.setAttribute("normal",new Re(_,3)),this.setAttribute("uv",new Re(g,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Fr(t.radius,t.widthSegments,t.heightSegments,t.phiStart,t.phiLength,t.thetaStart,t.thetaLength)}}class It extends Oe{static get type(){return"MeshLambertMaterial"}constructor(t){super(),this.isMeshLambertMaterial=!0,this.color=new Dt(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Dt(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Ih,this.normalScale=new Qt(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Xe,this.combine=Ga,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.emissive.copy(t.emissive),this.emissiveMap=t.emissiveMap,this.emissiveIntensity=t.emissiveIntensity,this.bumpMap=t.bumpMap,this.bumpScale=t.bumpScale,this.normalMap=t.normalMap,this.normalMapType=t.normalMapType,this.normalScale.copy(t.normalScale),this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.flatShading=t.flatShading,this.fog=t.fog,this}}class Qa extends Ce{constructor(t,e=1){super(),this.isLight=!0,this.type="Light",this.color=new Dt(t),this.intensity=e}dispose(){}copy(t,e){return super.copy(t,e),this.color.copy(t.color),this.intensity=t.intensity,this}toJSON(t){const e=super.toJSON(t);return e.object.color=this.color.getHex(),e.object.intensity=this.intensity,this.groundColor!==void 0&&(e.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(e.object.distance=this.distance),this.angle!==void 0&&(e.object.angle=this.angle),this.decay!==void 0&&(e.object.decay=this.decay),this.penumbra!==void 0&&(e.object.penumbra=this.penumbra),this.shadow!==void 0&&(e.object.shadow=this.shadow.toJSON()),this.target!==void 0&&(e.object.target=this.target.uuid),e}}const Ro=new le,yc=new I,_c=new I;class Jh{constructor(t){this.camera=t,this.intensity=1,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new Qt(512,512),this.map=null,this.mapPass=null,this.matrix=new le,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new qr,this._frameExtents=new Qt(1,1),this._viewportCount=1,this._viewports=[new oe(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(t){const e=this.camera,n=this.matrix;yc.setFromMatrixPosition(t.matrixWorld),e.position.copy(yc),_c.setFromMatrixPosition(t.target.matrixWorld),e.lookAt(_c),e.updateMatrixWorld(),Ro.multiplyMatrices(e.projectionMatrix,e.matrixWorldInverse),this._frustum.setFromProjectionMatrix(Ro),n.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),n.multiply(Ro)}getViewport(t){return this._viewports[t]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(t){return this.camera=t.camera.clone(),this.intensity=t.intensity,this.bias=t.bias,this.radius=t.radius,this.mapSize.copy(t.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){const t={};return this.intensity!==1&&(t.intensity=this.intensity),this.bias!==0&&(t.bias=this.bias),this.normalBias!==0&&(t.normalBias=this.normalBias),this.radius!==1&&(t.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(t.mapSize=this.mapSize.toArray()),t.camera=this.camera.toJSON(!1).object,delete t.camera.matrix,t}}const vc=new le,Es=new I,Io=new I;class $0 extends Jh{constructor(){super(new We(90,1,.5,500)),this.isPointLightShadow=!0,this._frameExtents=new Qt(4,2),this._viewportCount=6,this._viewports=[new oe(2,1,1,1),new oe(0,1,1,1),new oe(3,1,1,1),new oe(1,1,1,1),new oe(3,0,1,1),new oe(1,0,1,1)],this._cubeDirections=[new I(1,0,0),new I(-1,0,0),new I(0,0,1),new I(0,0,-1),new I(0,1,0),new I(0,-1,0)],this._cubeUps=[new I(0,1,0),new I(0,1,0),new I(0,1,0),new I(0,1,0),new I(0,0,1),new I(0,0,-1)]}updateMatrices(t,e=0){const n=this.camera,i=this.matrix,r=t.distance||n.far;r!==n.far&&(n.far=r,n.updateProjectionMatrix()),Es.setFromMatrixPosition(t.matrixWorld),n.position.copy(Es),Io.copy(n.position),Io.add(this._cubeDirections[e]),n.up.copy(this._cubeUps[e]),n.lookAt(Io),n.updateMatrixWorld(),i.makeTranslation(-Es.x,-Es.y,-Es.z),vc.multiplyMatrices(n.projectionMatrix,n.matrixWorldInverse),this._frustum.setFromProjectionMatrix(vc)}}class Z0 extends Qa{constructor(t,e,n=0,i=2){super(t,e),this.isPointLight=!0,this.type="PointLight",this.distance=n,this.decay=i,this.shadow=new $0}get power(){return this.intensity*4*Math.PI}set power(t){this.intensity=t/(4*Math.PI)}dispose(){this.shadow.dispose()}copy(t,e){return super.copy(t,e),this.distance=t.distance,this.decay=t.decay,this.shadow=t.shadow.clone(),this}}class j0 extends Jh{constructor(){super(new Hh(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class Qh extends Qa{constructor(t,e){super(t,e),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(Ce.DEFAULT_UP),this.updateMatrix(),this.target=new Ce,this.shadow=new j0}dispose(){this.shadow.dispose()}copy(t){return super.copy(t),this.target=t.target.clone(),this.shadow=t.shadow.clone(),this}}class tu extends Qa{constructor(t,e){super(t,e),this.isAmbientLight=!0,this.type="AmbientLight"}}const Sc=new le;let eu=class{constructor(t,e,n=0,i=1/0){this.ray=new Yr(t,e),this.near=n,this.far=i,this.camera=null,this.layers=new $a,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(t,e){this.ray.set(t,e)}setFromCamera(t,e){e.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(e.matrixWorld),this.ray.direction.set(t.x,t.y,.5).unproject(e).sub(this.ray.origin).normalize(),this.camera=e):e.isOrthographicCamera?(this.ray.origin.set(t.x,t.y,(e.near+e.far)/(e.near-e.far)).unproject(e),this.ray.direction.set(0,0,-1).transformDirection(e.matrixWorld),this.camera=e):console.error("THREE.Raycaster: Unsupported camera type: "+e.type)}setFromXRController(t){return Sc.identity().extractRotation(t.matrixWorld),this.ray.origin.setFromMatrixPosition(t.matrixWorld),this.ray.direction.set(0,0,-1).applyMatrix4(Sc),this}intersectObject(t,e=!0,n=[]){return La(t,this,n,e),n.sort(Mc),n}intersectObjects(t,e=!0,n=[]){for(let i=0,r=t.length;i<r;i++)La(t[i],this,n,e);return n.sort(Mc),n}};function Mc(s,t){return s.distance-t.distance}function La(s,t,e,n){let i=!0;if(s.layers.test(t.layers)&&s.raycast(t,e)===!1&&(i=!1),i===!0&&n===!0){const r=s.children;for(let o=0,a=r.length;o<a;o++)La(r[o],t,e,!0)}}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:za}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=za);var m=(s=>(s[s.AIR=0]="AIR",s[s.GRASS=1]="GRASS",s[s.DIRT=2]="DIRT",s[s.STONE=3]="STONE",s[s.WOOD=4]="WOOD",s[s.SAND=5]="SAND",s[s.COBBLESTONE=6]="COBBLESTONE",s[s.BRICK=7]="BRICK",s[s.GLASS=8]="GLASS",s[s.WATER=9]="WATER",s[s.LEAVES=10]="LEAVES",s[s.LOG=11]="LOG",s[s.PLANKS=12]="PLANKS",s[s.SNOW=13]="SNOW",s[s.FLOWER_RED=14]="FLOWER_RED",s[s.FLOWER_YELLOW=15]="FLOWER_YELLOW",s[s.TALL_GRASS=16]="TALL_GRASS",s[s.MUSHROOM_RED=17]="MUSHROOM_RED",s[s.MUSHROOM_BROWN=18]="MUSHROOM_BROWN",s[s.DEAD_BUSH=19]="DEAD_BUSH",s[s.CACTUS=20]="CACTUS",s[s.ROSE=21]="ROSE",s[s.TULIP=22]="TULIP",s[s.DAISY=23]="DAISY",s[s.CORNFLOWER=24]="CORNFLOWER",s[s.OAK_LOG=25]="OAK_LOG",s[s.BIRCH_LOG=26]="BIRCH_LOG",s[s.SPRUCE_LOG=27]="SPRUCE_LOG",s[s.OAK_LEAVES=28]="OAK_LEAVES",s[s.BIRCH_LEAVES=29]="BIRCH_LEAVES",s[s.SPRUCE_LEAVES=30]="SPRUCE_LEAVES",s[s.SANDSTONE=31]="SANDSTONE",s[s.SANDSTONE_CARVED=32]="SANDSTONE_CARVED",s[s.RED_BRICK=33]="RED_BRICK",s[s.GOLD_BLOCK=34]="GOLD_BLOCK",s[s.DARK_STONE=35]="DARK_STONE",s[s.MOSSY_STONE=36]="MOSSY_STONE",s[s.TORCH=37]="TORCH",s[s.LAVA=38]="LAVA",s[s.CAMPFIRE=39]="CAMPFIRE",s[s.RAW_BEEF=50]="RAW_BEEF",s[s.RAW_PORKCHOP=51]="RAW_PORKCHOP",s[s.RAW_MUTTON=52]="RAW_MUTTON",s[s.RAW_CHICKEN=53]="RAW_CHICKEN",s[s.RAW_RABBIT=54]="RAW_RABBIT",s[s.COOKED_BEEF=60]="COOKED_BEEF",s[s.COOKED_PORKCHOP=61]="COOKED_PORKCHOP",s[s.COOKED_MUTTON=62]="COOKED_MUTTON",s[s.COOKED_CHICKEN=63]="COOKED_CHICKEN",s[s.COOKED_RABBIT=64]="COOKED_RABBIT",s[s.CRAFTING_TABLE=70]="CRAFTING_TABLE",s[s.FURNACE=71]="FURNACE",s[s.FURNACE_LIT=72]="FURNACE_LIT",s[s.COAL=80]="COAL",s[s.CHARCOAL=81]="CHARCOAL",s[s.IRON_ORE=82]="IRON_ORE",s[s.IRON_INGOT=83]="IRON_INGOT",s[s.DIAMOND=84]="DIAMOND",s[s.STICK=85]="STICK",s[s.WOODEN_PICKAXE=100]="WOODEN_PICKAXE",s[s.WOODEN_AXE=101]="WOODEN_AXE",s[s.WOODEN_SHOVEL=102]="WOODEN_SHOVEL",s[s.WOODEN_SWORD=103]="WOODEN_SWORD",s[s.WOODEN_HOE=104]="WOODEN_HOE",s[s.STONE_PICKAXE=110]="STONE_PICKAXE",s[s.STONE_AXE=111]="STONE_AXE",s[s.STONE_SHOVEL=112]="STONE_SHOVEL",s[s.STONE_SWORD=113]="STONE_SWORD",s[s.STONE_HOE=114]="STONE_HOE",s[s.IRON_PICKAXE=120]="IRON_PICKAXE",s[s.IRON_AXE=121]="IRON_AXE",s[s.IRON_SHOVEL=122]="IRON_SHOVEL",s[s.IRON_SWORD=123]="IRON_SWORD",s[s.IRON_HOE=124]="IRON_HOE",s[s.DIAMOND_PICKAXE=130]="DIAMOND_PICKAXE",s[s.DIAMOND_AXE=131]="DIAMOND_AXE",s[s.DIAMOND_SHOVEL=132]="DIAMOND_SHOVEL",s[s.DIAMOND_SWORD=133]="DIAMOND_SWORD",s[s.DIAMOND_HOE=134]="DIAMOND_HOE",s))(m||{});const tl={0:"空气",1:"草地",2:"泥土",3:"石头",4:"木头",5:"沙子",6:"圆石",7:"砖块",8:"玻璃",9:"水",10:"树叶",11:"原木",12:"木板",13:"雪",14:"红花",15:"黄花",16:"高草",17:"红蘑菇",18:"棕蘑菇",19:"枯灌木",20:"仙人掌",21:"玫瑰",22:"郁金香",23:"雏菊",24:"矢车菊",25:"橡木原木",26:"桦木原木",27:"云杉原木",28:"橡树树叶",29:"桦树树叶",30:"云杉树叶",31:"沙石",32:"雕刻沙石",33:"红砖",34:"金块",35:"深色石头",36:"苔藓石头",37:"火把",38:"岩浆",39:"篝火",50:"生牛肉",51:"生猪排",52:"生羊肉",53:"生鸡肉",54:"生兔肉",60:"熟牛肉",61:"熟猪排",62:"熟羊肉",63:"熟鸡肉",64:"熟兔肉",70:"工作台",71:"熔炉",72:"熔炉",80:"煤炭",81:"木炭",82:"铁矿石",83:"铁锭",84:"钻石",85:"木棍",100:"木镐",101:"木斧",102:"木锹",103:"木剑",104:"木锄",110:"石镐",111:"石斧",112:"石锹",113:"石剑",114:"石锄",120:"铁镐",121:"铁斧",122:"铁锹",123:"铁剑",124:"铁锄",130:"钻石镐",131:"钻石斧",132:"钻石锹",133:"钻石剑",134:"钻石锄"},He={0:0,1:8174141,2:9132587,3:8421504,4:9127187,5:16049318,6:7039851,7:10242618,8:13166847,9:3368652,10:4034880,11:7029795,12:12357466,13:16448250,14:16729156,15:16777028,16:5934909,17:13382451,18:9136404,19:9136967,20:2976557,21:13369395,22:16738740,23:16777215,24:6591981,25:7029795,26:13943976,27:4863784,28:4034880,29:5939018,30:2972205,31:13940886,32:12888182,33:9118499,34:16766720,35:4868682,36:5925706,37:16763904,38:16729344,39:16737792,50:12852794,51:16758465,52:9109504,53:16767673,54:13808780,60:9127187,61:13468991,62:10506797,63:14329120,64:12092939,70:12357466,71:8421504,72:16737792,80:2763306,81:3815994,82:13935988,83:13948116,84:4910553,85:9136404,100:12357466,101:12357466,102:12357466,103:12357466,104:12357466,110:8421504,111:8421504,112:8421504,113:8421504,114:8421504,120:13948116,121:13948116,122:13948116,123:13948116,124:13948116,130:4910553,131:4910553,132:4910553,133:4910553,134:4910553},nu={0:{name:"空气",nameEn:"Air",color:0,transparent:!0,opacity:0,solid:!1},1:{name:"草地",nameEn:"Grass",color:8174141,transparent:!1,opacity:1,solid:!0},2:{name:"泥土",nameEn:"Dirt",color:9132587,transparent:!1,opacity:1,solid:!0},3:{name:"石头",nameEn:"Stone",color:8421504,transparent:!1,opacity:1,solid:!0},4:{name:"木头",nameEn:"Wood",color:9127187,transparent:!1,opacity:1,solid:!0},5:{name:"沙子",nameEn:"Sand",color:16049318,transparent:!1,opacity:1,solid:!0},6:{name:"圆石",nameEn:"Cobblestone",color:7039851,transparent:!1,opacity:1,solid:!0},7:{name:"砖块",nameEn:"Brick",color:10242618,transparent:!1,opacity:1,solid:!0},8:{name:"玻璃",nameEn:"Glass",color:13166847,transparent:!0,opacity:.3,solid:!0},9:{name:"水",nameEn:"Water",color:3368652,transparent:!0,opacity:.6,solid:!1},10:{name:"树叶",nameEn:"Leaves",color:4034880,transparent:!0,opacity:.8,solid:!0},11:{name:"原木",nameEn:"Log",color:7029795,transparent:!1,opacity:1,solid:!0},12:{name:"木板",nameEn:"Planks",color:12357466,transparent:!1,opacity:1,solid:!0},13:{name:"雪",nameEn:"Snow",color:16448250,transparent:!1,opacity:1,solid:!0},14:{name:"红花",nameEn:"Red Flower",color:16729156,transparent:!0,opacity:1,solid:!1},15:{name:"黄花",nameEn:"Yellow Flower",color:16777028,transparent:!0,opacity:1,solid:!1},16:{name:"高草",nameEn:"Tall Grass",color:5934909,transparent:!0,opacity:1,solid:!1},17:{name:"红蘑菇",nameEn:"Red Mushroom",color:13382451,transparent:!0,opacity:1,solid:!1},18:{name:"棕蘑菇",nameEn:"Brown Mushroom",color:9136404,transparent:!0,opacity:1,solid:!1},19:{name:"枯灌木",nameEn:"Dead Bush",color:9136967,transparent:!0,opacity:1,solid:!1},20:{name:"仙人掌",nameEn:"Cactus",color:2976557,transparent:!0,opacity:1,solid:!0},21:{name:"玫瑰",nameEn:"Rose",color:13369395,transparent:!0,opacity:1,solid:!1},22:{name:"郁金香",nameEn:"Tulip",color:16738740,transparent:!0,opacity:1,solid:!1},23:{name:"雏菊",nameEn:"Daisy",color:16777215,transparent:!0,opacity:1,solid:!1},24:{name:"矢车菊",nameEn:"Cornflower",color:6591981,transparent:!0,opacity:1,solid:!1},25:{name:"橡木原木",nameEn:"Oak Log",color:7029795,transparent:!1,opacity:1,solid:!0},26:{name:"桦木原木",nameEn:"Birch Log",color:13943976,transparent:!1,opacity:1,solid:!0},27:{name:"云杉原木",nameEn:"Spruce Log",color:4863784,transparent:!1,opacity:1,solid:!0},28:{name:"橡树树叶",nameEn:"Oak Leaves",color:4034880,transparent:!0,opacity:.8,solid:!0},29:{name:"桦树树叶",nameEn:"Birch Leaves",color:5939018,transparent:!0,opacity:.8,solid:!0},30:{name:"云杉树叶",nameEn:"Spruce Leaves",color:2972205,transparent:!0,opacity:.8,solid:!0},31:{name:"沙石",nameEn:"Sandstone",color:13940886,transparent:!1,opacity:1,solid:!0},32:{name:"雕刻沙石",nameEn:"Carved Sandstone",color:12888182,transparent:!1,opacity:1,solid:!0},33:{name:"红砖",nameEn:"Red Brick",color:9118499,transparent:!1,opacity:1,solid:!0},34:{name:"金块",nameEn:"Gold Block",color:16766720,transparent:!1,opacity:1,solid:!0},35:{name:"深色石头",nameEn:"Dark Stone",color:4868682,transparent:!1,opacity:1,solid:!0},36:{name:"苔藓石头",nameEn:"Mossy Stone",color:5925706,transparent:!1,opacity:1,solid:!0},37:{name:"火把",nameEn:"Torch",color:16763904,transparent:!0,opacity:1,solid:!1},38:{name:"岩浆",nameEn:"Lava",color:16729344,transparent:!0,opacity:.9,solid:!1},50:{name:"生牛肉",nameEn:"Raw Beef",color:12852794,transparent:!1,opacity:1,solid:!1},51:{name:"生猪排",nameEn:"Raw Porkchop",color:16758465,transparent:!1,opacity:1,solid:!1},52:{name:"生羊肉",nameEn:"Raw Mutton",color:9109504,transparent:!1,opacity:1,solid:!1},53:{name:"生鸡肉",nameEn:"Raw Chicken",color:16767673,transparent:!1,opacity:1,solid:!1},54:{name:"生兔肉",nameEn:"Raw Rabbit",color:13808780,transparent:!1,opacity:1,solid:!1},39:{name:"篝火",nameEn:"Campfire",color:16737792,transparent:!0,opacity:1,solid:!0},60:{name:"熟牛肉",nameEn:"Cooked Beef",color:9127187,transparent:!1,opacity:1,solid:!1},61:{name:"熟猪排",nameEn:"Cooked Porkchop",color:13468991,transparent:!1,opacity:1,solid:!1},62:{name:"熟羊肉",nameEn:"Cooked Mutton",color:10506797,transparent:!1,opacity:1,solid:!1},63:{name:"熟鸡肉",nameEn:"Cooked Chicken",color:14329120,transparent:!1,opacity:1,solid:!1},64:{name:"熟兔肉",nameEn:"Cooked Rabbit",color:12092939,transparent:!1,opacity:1,solid:!1},70:{name:"工作台",nameEn:"Crafting Table",color:12357466,transparent:!1,opacity:1,solid:!0},71:{name:"熔炉",nameEn:"Furnace",color:8421504,transparent:!1,opacity:1,solid:!0},72:{name:"熔炉",nameEn:"Furnace",color:16737792,transparent:!1,opacity:1,solid:!0},80:{name:"煤炭",nameEn:"Coal",color:2763306,transparent:!1,opacity:1,solid:!1},81:{name:"木炭",nameEn:"Charcoal",color:3815994,transparent:!1,opacity:1,solid:!1},82:{name:"铁矿石",nameEn:"Iron Ore",color:13935988,transparent:!1,opacity:1,solid:!0},83:{name:"铁锭",nameEn:"Iron Ingot",color:13948116,transparent:!1,opacity:1,solid:!1},84:{name:"钻石",nameEn:"Diamond",color:4910553,transparent:!1,opacity:1,solid:!1},85:{name:"木棍",nameEn:"Stick",color:9136404,transparent:!1,opacity:1,solid:!1},100:{name:"木镐",nameEn:"Wooden Pickaxe",color:12357466,transparent:!1,opacity:1,solid:!1},101:{name:"木斧",nameEn:"Wooden Axe",color:12357466,transparent:!1,opacity:1,solid:!1},102:{name:"木锹",nameEn:"Wooden Shovel",color:12357466,transparent:!1,opacity:1,solid:!1},103:{name:"木剑",nameEn:"Wooden Sword",color:12357466,transparent:!1,opacity:1,solid:!1},104:{name:"木锄",nameEn:"Wooden Hoe",color:12357466,transparent:!1,opacity:1,solid:!1},110:{name:"石镐",nameEn:"Stone Pickaxe",color:8421504,transparent:!1,opacity:1,solid:!1},111:{name:"石斧",nameEn:"Stone Axe",color:8421504,transparent:!1,opacity:1,solid:!1},112:{name:"石锹",nameEn:"Stone Shovel",color:8421504,transparent:!1,opacity:1,solid:!1},113:{name:"石剑",nameEn:"Stone Sword",color:8421504,transparent:!1,opacity:1,solid:!1},114:{name:"石锄",nameEn:"Stone Hoe",color:8421504,transparent:!1,opacity:1,solid:!1},120:{name:"铁镐",nameEn:"Iron Pickaxe",color:13948116,transparent:!1,opacity:1,solid:!1},121:{name:"铁斧",nameEn:"Iron Axe",color:13948116,transparent:!1,opacity:1,solid:!1},122:{name:"铁锹",nameEn:"Iron Shovel",color:13948116,transparent:!1,opacity:1,solid:!1},123:{name:"铁剑",nameEn:"Iron Sword",color:13948116,transparent:!1,opacity:1,solid:!1},124:{name:"铁锄",nameEn:"Iron Hoe",color:13948116,transparent:!1,opacity:1,solid:!1},130:{name:"钻石镐",nameEn:"Diamond Pickaxe",color:4910553,transparent:!1,opacity:1,solid:!1},131:{name:"钻石斧",nameEn:"Diamond Axe",color:4910553,transparent:!1,opacity:1,solid:!1},132:{name:"钻石锹",nameEn:"Diamond Shovel",color:4910553,transparent:!1,opacity:1,solid:!1},133:{name:"钻石剑",nameEn:"Diamond Sword",color:4910553,transparent:!1,opacity:1,solid:!1},134:{name:"钻石锄",nameEn:"Diamond Hoe",color:4910553,transparent:!1,opacity:1,solid:!1}};function ln(s){return nu[s]?.solid??s!==0}function ti(s){return nu[s]?.transparent??!1}function J0(s){return s===14||s===15||s===16||s===17||s===18||s===19||s===21||s===22||s===23||s===24}function Q0(s){return s===25||s===26||s===27||s===11}function Oa(s){return s===28||s===29||s===30||s===10}const Vi=[1,2,3,4,5,6,7,8,9,10,11,12,13,39,70,71],Yt=16,Ps=Yt*Yt*Yt,iu=128,Br=iu/Yt,ty=0,ey=iu;var Na=(s=>(s[s.UNLOADED=0]="UNLOADED",s[s.LOADING=1]="LOADING",s[s.LOADED=2]="LOADED",s[s.UNLOADING=3]="UNLOADING",s))(Na||{});const ny={loadRadius:8,unloadRadius:10,maxLoadsPerFrame:2},su={baseHeight:64,heightVariation:32,octaves:4,persistence:.5,lacunarity:2,scale:.01,stoneDepth:4,dirtDepth:3},es=59,iy=.005,sy=60,Do=50,zr=200,xc={x:100,z:0},Ec={x:-70,z:80},bc={x:-70,z:-80},ru={threshold:.6,scale:.05,minHeight:8,maxHeight:56};function _e(s,t,e){return`${s},${t},${e}`}function $i(s,t,e){return t*256+e*16+s}function Gr(s,t,e){return{x:Math.floor(s/Yt),y:Math.floor(t/Yt),z:Math.floor(e/Yt)}}function Po(s,t,e){return{x:s*Yt,y:t*Yt,z:e*Yt}}function Tc(s,t,e){const n=(i,r)=>(i%r+r)%r;return{x:n(Math.floor(s),Yt),y:n(Math.floor(t),Yt),z:n(Math.floor(e),Yt)}}function Ac(s){return s>=0&&s<Br}function Lo(s){return s>=ty&&s<ey}const Cc=1718876,ry=.04,oy=8900331;class ay{coord;blocks;state=Na.UNLOADED;isDirty=!0;isModified=!1;boundingBox;mesh=null;solidBlockCount=0;constructor(t,e,n){this.coord={x:t,y:e,z:n},this.blocks=new Uint8Array(Ps);const i=Po(t,e,n);this.boundingBox=new oi(new I(i.x,i.y,i.z),new I(i.x+Yt,i.y+Yt,i.z+Yt))}getBlock(t,e,n){return this.isValidLocal(t,e,n)?this.blocks[$i(t,e,n)]:m.AIR}setBlock(t,e,n,i){if(!this.isValidLocal(t,e,n))return;const r=$i(t,e,n),o=this.blocks[r];o!==i&&(o===m.AIR&&i!==m.AIR?this.solidBlockCount++:o!==m.AIR&&i===m.AIR&&this.solidBlockCount--,this.blocks[r]=i,this.isDirty=!0,this.isModified=!0)}fillBlocks(t){if(t.length!==Ps)throw new Error(`Invalid block data length: ${t.length}, expected ${Ps}`);this.blocks.set(t),this.isDirty=!0,this.solidBlockCount=0;for(let e=0;e<Ps;e++)this.blocks[e]!==m.AIR&&this.solidBlockCount++}isValidLocal(t,e,n){return t>=0&&t<Yt&&e>=0&&e<Yt&&n>=0&&n<Yt}isEmpty(){return this.solidBlockCount===0}getSolidBlockCount(){return this.solidBlockCount}getWorldPosition(){const t=Po(this.coord.x,this.coord.y,this.coord.z);return new I(t.x,t.y,t.z)}getWorldCenter(){const t=Po(this.coord.x,this.coord.y,this.coord.z),e=Yt/2;return new I(t.x+e,t.y+e,t.z+e)}forEachSolidBlock(t){for(let e=0;e<Yt;e++)for(let n=0;n<Yt;n++)for(let i=0;i<Yt;i++){const r=this.getBlock(i,e,n);r!==m.AIR&&t(i,e,n,r)}}isFaceExposed(t,e,n,i){let r=t,o=e,a=n;switch(i){case"top":o++;break;case"bottom":o--;break;case"left":r--;break;case"right":r++;break;case"front":a++;break;case"back":a--;break}if(!this.isValidLocal(r,o,a))return!0;const l=this.getBlock(t,e,n),c=this.getBlock(r,o,a);if(c===m.AIR)return!0;const h=ti(l),u=ti(c);return h?c!==l:u}dispose(){this.mesh&&(this.mesh=null),this.state=Na.UNLOADED}}const ly=[151,160,137,91,90,15,131,13,201,95,96,53,194,233,7,225,140,36,103,30,69,142,8,99,37,240,21,10,23,190,6,148,247,120,234,75,0,26,197,62,94,252,219,203,117,35,11,32,57,177,33,88,237,149,56,87,174,20,125,136,171,168,68,175,74,165,71,134,139,48,27,166,77,146,158,231,83,111,229,122,60,211,133,230,220,105,92,41,55,46,245,40,244,102,143,54,65,25,63,161,1,216,80,73,209,76,132,187,208,89,18,169,200,196,135,130,116,188,159,86,164,100,109,198,173,186,3,64,52,217,226,250,124,123,5,202,38,147,118,126,255,82,85,212,207,206,59,227,47,16,58,17,182,189,28,42,223,183,170,213,119,248,152,2,44,154,163,70,221,153,101,155,167,43,172,9,129,22,39,253,19,98,108,110,79,113,224,232,178,185,112,104,218,246,97,228,251,34,242,193,238,210,144,12,191,179,162,241,81,51,145,235,249,14,239,107,49,192,214,31,181,199,106,157,184,84,204,176,115,121,50,45,127,4,150,254,138,236,205,93,222,114,67,29,24,72,243,141,128,195,78,66,215,61,156,180],Oo=[[1,1],[-1,1],[1,-1],[-1,-1],[1,0],[-1,0],[0,1],[0,-1]],vr=[[1,1,0],[-1,1,0],[1,-1,0],[-1,-1,0],[1,0,1],[-1,0,1],[1,0,-1],[-1,0,-1],[0,1,1],[0,-1,1],[0,1,-1],[0,-1,-1]],cy=.5*(Math.sqrt(3)-1),bs=(3-Math.sqrt(3))/6,hy=1/3,_n=1/6;class el{perm=[];permMod12=[];constructor(t=0){this.initPermutation(t)}initPermutation(t){const e=[...ly],n=this.seededRandom(t);for(let i=e.length-1;i>0;i--){const r=Math.floor(n()*(i+1)),o=e[i];e[i]=e[r],e[r]=o}this.perm=new Array(512),this.permMod12=new Array(512);for(let i=0;i<512;i++)this.perm[i]=e[i&255],this.permMod12[i]=this.perm[i]%12}seededRandom(t){let e=t;return()=>(e=e*1103515245+12345&2147483647,e/2147483647)}noise2D(t,e){const n=(t+e)*cy,i=Math.floor(t+n),r=Math.floor(e+n),o=(i+r)*bs,a=i-o,l=r-o,c=t-a,h=e-l;let u,d;c>h?(u=1,d=0):(u=0,d=1);const f=c-u+bs,y=h-d+bs,_=c-1+2*bs,g=h-1+2*bs,p=i&255,x=r&255,b=this.permMod12[p+this.perm[x]]%8,S=this.permMod12[p+u+this.perm[x+d]]%8,L=this.permMod12[p+1+this.perm[x+1]]%8;let C=0,w=0,P=0,T=.5-c*c-h*h;if(T>=0){T*=T;const H=Oo[b];C=T*T*(H[0]*c+H[1]*h)}let E=.5-f*f-y*y;if(E>=0){E*=E;const H=Oo[S];w=E*E*(H[0]*f+H[1]*y)}let D=.5-_*_-g*g;if(D>=0){D*=D;const H=Oo[L];P=D*D*(H[0]*_+H[1]*g)}return 70*(C+w+P)}noise3D(t,e,n){const i=(t+e+n)*hy,r=Math.floor(t+i),o=Math.floor(e+i),a=Math.floor(n+i),l=(r+o+a)*_n,c=r-l,h=o-l,u=a-l,d=t-c,f=e-h,y=n-u;let _,g,p,x,b,S;d>=f?f>=y?(_=1,g=0,p=0,x=1,b=1,S=0):d>=y?(_=1,g=0,p=0,x=1,b=0,S=1):(_=0,g=0,p=1,x=1,b=0,S=1):f<y?(_=0,g=0,p=1,x=0,b=1,S=1):d<y?(_=0,g=1,p=0,x=0,b=1,S=1):(_=0,g=1,p=0,x=1,b=1,S=0);const L=d-_+_n,C=f-g+_n,w=y-p+_n,P=d-x+2*_n,T=f-b+2*_n,E=y-S+2*_n,D=d-1+3*_n,H=f-1+3*_n,B=y-1+3*_n,K=r&255,Z=o&255,q=a&255,Q=this.permMod12[K+this.perm[Z+this.perm[q]]],W=this.permMod12[K+_+this.perm[Z+g+this.perm[q+p]]],rt=this.permMod12[K+x+this.perm[Z+b+this.perm[q+S]]],ht=this.permMod12[K+1+this.perm[Z+1+this.perm[q+1]]];let yt=0,kt=0,$t=0,$=0,et=.6-d*d-f*f-y*y;if(et>=0){et*=et;const xt=vr[Q];yt=et*et*(xt[0]*d+xt[1]*f+xt[2]*y)}let gt=.6-L*L-C*C-w*w;if(gt>=0){gt*=gt;const xt=vr[W];kt=gt*gt*(xt[0]*L+xt[1]*C+xt[2]*w)}let ot=.6-P*P-T*T-E*E;if(ot>=0){ot*=ot;const xt=vr[rt];$t=ot*ot*(xt[0]*P+xt[1]*T+xt[2]*E)}let Et=.6-D*D-H*H-B*B;if(Et>=0){Et*=Et;const xt=vr[ht];$=Et*Et*(xt[0]*D+xt[1]*H+xt[2]*B)}return 32*(yt+kt+$t+$)}fractal2D(t,e,n,i=.5,r=2){let o=0,a=1,l=1,c=0;for(let h=0;h<n;h++)o+=this.noise2D(t*l,e*l)*a,c+=a,a*=i,l*=r;return o/c}fractal3D(t,e,n,i,r=.5,o=2){let a=0,l=1,c=1,h=0;for(let u=0;u<i;u++)a+=this.noise3D(t*c,e*c,n*c)*l,h+=l,l*=r,c*=o;return a/h}}const uy={outerRadiusX:45,outerRadiusZ:35,wallThickness:6,levelCount:4,levelHeight:5,archCount:48,arenaRadiusX:28,arenaRadiusZ:18,tierCount:5,centerX:0,centerZ:0,baseHeight:64,enableRuins:!0,ruinsAngleStart:Math.PI*.6,ruinsAngleEnd:Math.PI*1.2};function ka(s,t,e,n){return e<=0||n<=0?!1:s*s/(e*e)+t*t/(n*n)<=1}function No(s,t,e,n,i,r){return ka(s,t,i,r)&&!ka(s,t,e,n)}function wc(s,t,e){const n=Math.cos(s),i=Math.sin(s);return t*e/Math.sqrt(e*e*n*n+t*t*i*i)}function Ts(s){for(;s<0;)s+=2*Math.PI;for(;s>=2*Math.PI;)s-=2*Math.PI;return s}class dy{config;totalHeight;archAngleStep;innerWallRadiusX;innerWallRadiusZ;pillarWidth;archWidth;constructor(t={}){this.config={...uy,...t},this.totalHeight=this.config.levelCount*this.config.levelHeight,this.archAngleStep=2*Math.PI/this.config.archCount,this.innerWallRadiusX=this.config.outerRadiusX-this.config.wallThickness,this.innerWallRadiusZ=this.config.outerRadiusZ-this.config.wallThickness,this.pillarWidth=.3,this.archWidth=.7}seededRandom(t,e){const n=t*73856093^e*19349663,i=Math.sin(n)*43758.5453;return i-Math.floor(i)}isCornicePosition(t){return t===0||t===this.config.levelHeight-1}isInColosseumBounds(t,e){const n=t-this.config.centerX,i=e-this.config.centerZ,r=Math.max(this.config.outerRadiusX,this.config.outerRadiusZ)+5;return Math.abs(n)<=r&&Math.abs(i)<=r}isInRuins(t,e){if(!this.config.enableRuins)return!1;const n=Ts(t),i=Ts(this.config.ruinsAngleStart),r=Ts(this.config.ruinsAngleEnd);let o=!1;if(i<r?o=n>=i&&n<=r:o=n>=i||n<=r,!o)return!1;const a=Math.floor(e/this.config.levelHeight),c=[.2,.4,.7,1][Math.min(a,3)]??1,h=Ts(r-i);let u;i<r||n>=i?u=(n-i)/h:u=(n+2*Math.PI-i)/h;const d=Math.sin(n*10)*.12,f=Math.sin(n*23+1.5)*.08,y=Math.sin(n*47+3.2)*.04,_=Math.sin(e*.5+n*7)*.06,g=d+f+y+_,p=c+g;return 1-Math.abs(u-.5)*2>1-p}getLevel(t){return t<0?-1:Math.floor(t/this.config.levelHeight)}getLevelY(t){return t%this.config.levelHeight}getArchPosition(t){const e=Ts(t),n=Math.floor(e/this.archAngleStep),i=e%this.archAngleStep/this.archAngleStep,r=i<this.pillarWidth||i>1-this.pillarWidth;return{archIndex:n,posInUnit:i,isPillar:r}}isInArchOpening(t,e,n,i){const{levelHeight:r}=this.config,o=this.getLevelY(n);if(o===0||o>=r-1)return!1;const a=Math.atan2(e,t),{isPillar:l,posInUnit:c}=this.getArchPosition(a);if(l)return!1;if(i===3)return o<2||o>=r-1?!1:Math.abs(c-.5)<.2;const h=r-2;return o<=h-1?!0:o===h?Math.abs(c-.5)/(this.archWidth/2)<.8:!1}isInOuterWall(t,e){const{outerRadiusX:n,outerRadiusZ:i}=this.config;return No(t,e,this.innerWallRadiusX,this.innerWallRadiusZ,n,i)}getTierIndex(t,e){const{arenaRadiusX:n,arenaRadiusZ:i,tierCount:r}=this.config,o=(this.innerWallRadiusX-n)/r,a=(this.innerWallRadiusZ-i)/r;for(let l=0;l<r;l++){const c=n+l*o,h=i+l*a,u=n+(l+1)*o,d=i+(l+1)*a;if(No(t,e,c,h,u,d))return l}return-1}isInArena(t,e){return ka(t,e,this.config.arenaRadiusX,this.config.arenaRadiusZ)}getBlockAt(t,e,n){if(!this.isInColosseumBounds(t,n))return null;const i=t-this.config.centerX,r=n-this.config.centerZ,o=e-this.config.baseHeight;if(o<0)return null;const a=Math.atan2(r,i);if(this.isInRuins(a,o)){const u=this.seededRandom(t,n);if(o===0){if(u<.1)return m.COBBLESTONE;if(u<.25)return u<.2?m.TALL_GRASS:m.LEAVES}return null}if(o>=this.totalHeight){if(o===this.totalHeight&&this.isInOuterWall(i,r)){const{isPillar:u,archIndex:d}=this.getArchPosition(a);if(u||d%2===0)return m.STONE}if(o===this.totalHeight+1){const{isPillar:u}=this.getArchPosition(a);if(u){const{archIndex:d}=this.getArchPosition(a);if(d%4===0)return m.BRICK}}return null}const l=this.getLevel(o),c=this.getLevelY(o);if(this.isInOuterWall(i,r)){const u=wc(a,this.config.outerRadiusX,this.config.outerRadiusZ),d=wc(a,this.innerWallRadiusX,this.innerWallRadiusZ),f=Math.sqrt(i*i+r*r),y=u-f,_=u-d,{isPillar:g,posInUnit:p}=this.getArchPosition(a);if(y<=2)return this.isInArchOpening(i,r,o,l)?c===this.config.levelHeight-2&&Math.abs(p-.5)<.15?m.BRICK:m.AIR:g&&y<=1?c===this.config.levelHeight-2||c===1?m.BRICK:m.COBBLESTONE:!g&&y<=1&&Math.min(p,1-p)<.15&&c>0&&c<this.config.levelHeight-1?m.COBBLESTONE:this.isCornicePosition(c)?m.BRICK:m.STONE;if(y>2&&y<_-1){if(c===0)return m.STONE;const x=(2+_-1)/2,b=Math.abs(y-x),S=(_-3)/2,L=b/S,C=Math.sqrt(Math.max(0,1-L*L)),w=this.config.levelHeight-1-Math.floor(C*2);if(c>=w)return m.STONE;const P=this.getArchPosition(a);return P.archIndex%4===0&&P.isPillar&&y>3&&y<_-2?m.COBBLESTONE:m.AIR}if(y>=_-1){if(c>0&&c<this.config.levelHeight-1){const x=this.getArchPosition(a);if(x.archIndex%2===0&&!x.isPillar&&Math.abs(x.posInUnit-.5)<.25)return m.AIR}return m.STONE}return m.STONE}if(this.isInArena(i,r)){if(o===0){const u=Math.sqrt(i*i+r*r);if(u>=3&&u<=5)return m.DIRT;const f=(Math.atan2(r,i)%(Math.PI/4)+Math.PI/4)%(Math.PI/4);return(f<.08||f>Math.PI/4-.08)&&u>5?m.DIRT:m.SAND}if(o===-1){const u=Math.abs(i)%6,d=Math.abs(r)%6;if(u===0||d===0)return m.STONE}return m.AIR}const h=this.getTierIndex(i,r);if(h>=0){const u=h*2,d=u+1,y=[m.STONE,m.COBBLESTONE,m.BRICK][h%3];if(o<u)return m.STONE;if(o===u)return y;if(o===d){const{arenaRadiusX:_,arenaRadiusZ:g,tierCount:p}=this.config,x=(this.innerWallRadiusX-_)/p,b=(this.innerWallRadiusZ-g)/p,S=_+(h+1)*x,L=g+(h+1)*b,C=S-1,w=L-1;return No(i,r,C,w,S,L)?y:m.AIR}return m.AIR}return null}getSpawnHeight(){return this.config.baseHeight+1}getTotalRadius(){return Math.max(this.config.outerRadiusX,this.config.outerRadiusZ)}}const fy={centerX:100,centerZ:0,baseHeight:64,baseSize:50,height:35,entranceSide:"north",corridorWidth:3,roomCount:4,deadEndCount:3,torchSpacing:5},py=[{id:"entrance",name:"入口厅",type:"entrance",minX:-3,maxX:3,minY:1,maxY:5,minZ:-22,maxZ:-16},{id:"descending",name:"下降走廊",type:"corridor",minX:-2,maxX:2,minY:1,maxY:4,minZ:-15,maxZ:-8},{id:"grand_gallery",name:"大走廊",type:"chamber",minX:-4,maxX:4,minY:1,maxY:8,minZ:-7,maxZ:3},{id:"treasure",name:"宝藏室",type:"treasure",minX:6,maxX:12,minY:1,maxY:5,minZ:-5,maxZ:1},{id:"tomb",name:"墓室",type:"tomb",minX:-5,maxX:5,minY:1,maxY:7,minZ:5,maxZ:15}],my=[{id:"main_1",fromRoom:"entrance",toRoom:"descending",segments:[{x1:0,y1:2,z1:-16,x2:0,y2:2,z2:-15}],hasTorches:!0},{id:"main_2",fromRoom:"descending",toRoom:"grand_gallery",segments:[{x1:0,y1:2,z1:-8,x2:0,y2:2,z2:-7}],hasTorches:!0},{id:"main_3",fromRoom:"grand_gallery",toRoom:"tomb",segments:[{x1:0,y1:2,z1:3,x2:0,y2:2,z2:5}],hasTorches:!0},{id:"branch_1",fromRoom:"descending",toRoom:"treasure",segments:[{x1:2,y1:2,z1:-12,x2:6,y2:2,z2:-12},{x1:6,y1:2,z1:-12,x2:6,y2:2,z2:-5}],hasTorches:!0},{id:"dead_1",fromRoom:"grand_gallery",toRoom:null,segments:[{x1:-4,y1:2,z1:-2,x2:-10,y2:2,z2:-2}],hasTorches:!1},{id:"dead_2",fromRoom:"descending",toRoom:null,segments:[{x1:2,y1:2,z1:-10,x2:8,y2:2,z2:-10},{x1:8,y1:2,z1:-10,x2:8,y2:2,z2:-14}],hasTorches:!1}];class gy{config;rooms;corridors;constructor(t={}){this.config={...fy,...t},this.rooms=py,this.corridors=my}isInBounds(t,e){const n=Math.abs(t-this.config.centerX),i=Math.abs(e-this.config.centerZ),r=this.config.baseSize/2;return n<=r&&i<=r}getBoundingBox(){const t=this.config.baseSize/2;return{minX:this.config.centerX-t,maxX:this.config.centerX+t,minY:this.config.baseHeight,maxY:this.config.baseHeight+this.config.height,minZ:this.config.centerZ-t,maxZ:this.config.centerZ+t}}getBlockAt(t,e,n){if(!this.isInBounds(t,n))return null;const i=t-this.config.centerX,r=e-this.config.baseHeight,o=n-this.config.centerZ;if(r<0||r>=this.config.height)return null;if(this.isInEntrance(i,r,o))return m.AIR;const a=this.getRoomAt(i,r,o);if(a)return r===a.minY-1?m.SANDSTONE_CARVED:m.AIR;const l=this.getCorridorAt(i,r,o);return l?l.hasTorches&&this.isTorchPosition(i,r,o)?m.TORCH:m.AIR:this.isInPyramidShell(i,r,o)?this.isDecorativePosition(i,r,o)?m.SANDSTONE_CARVED:m.SANDSTONE:null}isInEntrance(t,e,n){const{baseSize:i,corridorWidth:r}=this.config,o=i/2,a=r/2;return n<-o+3?!1:n>=-o&&n<=-o+3&&Math.abs(t)<=a&&e>=1&&e<=4}getRoomAt(t,e,n){for(const i of this.rooms)if(t>=i.minX&&t<=i.maxX&&e>=i.minY&&e<=i.maxY&&n>=i.minZ&&n<=i.maxZ)return i;return null}getCorridorAt(t,e,n){const i=this.config.corridorWidth,r=Math.floor(i/2),o=4;for(const a of this.corridors)for(const l of a.segments){const c=Math.min(l.x1,l.x2)-r,h=Math.max(l.x1,l.x2)+r,u=Math.min(l.z1,l.z2)-r,d=Math.max(l.z1,l.z2)+r,f=Math.min(l.y1,l.y2),y=Math.max(l.y1,l.y2)+o;if(t>=c&&t<=h&&e>=f&&e<=y&&n>=u&&n<=d)return a}return null}isTorchPosition(t,e,n){const{torchSpacing:i}=this.config;if(e!==3)return!1;const r=Math.abs(t)%i,o=Math.abs(n)%i;return(r===0||o===0)&&(Math.abs(t)>1||Math.abs(n)>1)}isInPyramidShell(t,e,n){const{baseSize:i,height:r}=this.config,a=i/2*(1-e/r);if(Math.abs(t)>a||Math.abs(n)>a)return!1;const l=a-2;return l<=0||Math.abs(t)>=l||Math.abs(n)>=l||e===0}isDecorativePosition(t,e,n){const{baseSize:i,height:r}=this.config,o=i/2,a=o*(1-e/r);return e%5===0||Math.abs(Math.abs(t)-Math.abs(n))<2&&Math.abs(t)>=a-1||n<-o+4&&Math.abs(t)<=4&&e<=5&&(Math.abs(t)>=2||e>=4)}}const yy={centerX:-70,centerZ:80,baseHeight:64,compoundWidth:60,compoundDepth:80,wallHeight:6,wallThickness:2,mainHallWidth:20,mainHallDepth:15,mainHallHeight:12,gateWidth:6};class _y{config;constructor(t={}){this.config={...yy,...t}}isInBounds(t,e){const n=Math.abs(t-this.config.centerX),i=Math.abs(e-this.config.centerZ),r=this.config.compoundWidth/2,o=this.config.compoundDepth/2;return n<=r&&i<=o}getBoundingBox(){const t=this.config.compoundWidth/2,e=this.config.compoundDepth/2;return{minX:this.config.centerX-t,maxX:this.config.centerX+t,minY:this.config.baseHeight,maxY:this.config.baseHeight+this.config.mainHallHeight+5,minZ:this.config.centerZ-e,maxZ:this.config.centerZ+e}}getBlockAt(t,e,n){if(!this.isInBounds(t,n))return null;const i=t-this.config.centerX,r=e-this.config.baseHeight,o=n-this.config.centerZ;if(r<0)return null;const a=this.config.mainHallHeight+5;if(r>a)return null;if(r===0)return m.STONE;if(this.isInGate(i,r,o))return m.AIR;const l=this.getMainHallBlock(i,r,o);if(l!==null)return l;const c=this.getSideHallBlock(i,r,o);if(c!==null)return c;const h=this.getWallBlock(i,r,o);return h!==null?h:this.isInCourtyard(i,o)&&r>0?m.AIR:null}isInGate(t,e,n){const{compoundDepth:i,wallThickness:r,gateWidth:o,wallHeight:a}=this.config,l=i/2,c=o/2;return n>=l-r&&n<=l&&Math.abs(t)<=c&&e>=1&&e<=a-1||n>=-l&&n<=-l+r&&Math.abs(t)<=c&&e>=1&&e<=a-1}getMainHallBlock(t,e,n){const{mainHallWidth:i,mainHallDepth:r,mainHallHeight:o}=this.config,a=i/2,l=r/2;return Math.abs(t)>a||Math.abs(n)>l?null:e===1?m.SANDSTONE_CARVED:(Math.abs(t)>=a-1||Math.abs(n)>=l-1)&&e>=1&&e<=o?e>=2&&e<=4&&(n>=l-1&&Math.abs(t)<=2||n<=-l+1&&Math.abs(t)<=2)?m.AIR:m.RED_BRICK:e>=2&&e<o?this.isPillarPosition(t,n,a-2,l-2)?m.RED_BRICK:m.AIR:e>=o&&e<=o+3?this.getRoofBlock(t,n,e-o,a,l):null}getSideHallBlock(t,e,n){const l=this.getSingleSideHall(t-20,e,n,10,12,8);if(l!==null)return l;const c=this.getSingleSideHall(t+20,e,n,10,12,8);return c!==null?c:null}getSingleSideHall(t,e,n,i,r,o){const a=i/2,l=r/2;return Math.abs(t)>a||Math.abs(n)>l?null:e===1?m.STONE:(Math.abs(t)>=a-1||Math.abs(n)>=l-1)&&e>=1&&e<=o?e>=2&&e<=4&&Math.abs(n)<=1&&Math.abs(t)>=a-1?m.AIR:m.RED_BRICK:e>=2&&e<o?m.AIR:e>=o&&e<=o+2?this.getRoofBlock(t,n,e-o,a,l):null}getRoofBlock(t,e,n,i,r){const o=n*2,a=i+2-o,l=r+2-o;return a<=0||l<=0?null:Math.abs(t)<=a&&Math.abs(e)<=l?m.GOLD_BLOCK:null}getWallBlock(t,e,n){const{compoundWidth:i,compoundDepth:r,wallHeight:o,wallThickness:a}=this.config,l=i/2,c=r/2;if(e<1||e>o)return null;const h=n<=-c+a&&n>=-c,u=n>=c-a&&n<=c,d=t>=l-a&&t<=l,f=t<=-l+a&&t>=-l;return h||u||d||f?e===o?m.GOLD_BLOCK:m.RED_BRICK:null}isInCourtyard(t,e){const{compoundWidth:n,compoundDepth:i,wallThickness:r}=this.config,o=n/2-r,a=i/2-r;return Math.abs(t)<o&&Math.abs(e)<a}isPillarPosition(t,e,n,i){const o=Math.abs(t)%4,a=Math.abs(e)%4;return o===0&&a===0&&Math.abs(t)<=n&&Math.abs(e)<=i}}const vy={centerX:-70,centerZ:-80,baseHeight:64,wallSize:60,wallHeight:10,wallThickness:3,towerRadius:5,towerHeight:18,gateWidth:6,moatWidth:4,moatDepth:3,hallWidth:20,hallDepth:15,hallHeight:10};class Sy{config;constructor(t={}){this.config={...vy,...t}}isInBounds(t,e){const n=Math.abs(t-this.config.centerX),i=Math.abs(e-this.config.centerZ),r=this.config.wallSize/2+this.config.moatWidth+2;return n<=r&&i<=r}getBoundingBox(){const t=this.config.wallSize/2+this.config.moatWidth+2;return{minX:this.config.centerX-t,maxX:this.config.centerX+t,minY:this.config.baseHeight-this.config.moatDepth,maxY:this.config.baseHeight+this.config.towerHeight,minZ:this.config.centerZ-t,maxZ:this.config.centerZ+t}}getBlockAt(t,e,n){if(!this.isInBounds(t,n))return null;const i=t-this.config.centerX,r=e-this.config.baseHeight,o=n-this.config.centerZ,a=this.getMoatBlock(i,r,o);if(a!==null)return a;if(r<0||r>this.config.towerHeight)return null;if(this.isInGate(i,r,o))return m.AIR;const l=this.getTowerBlock(i,r,o);if(l!==null)return l;const c=this.getGreatHallBlock(i,r,o);if(c!==null)return c;const h=this.getWallBlock(i,r,o);return h!==null?h:this.isInCourtyard(i,o)?r===0?m.STONE:m.AIR:null}getMoatBlock(t,e,n){const{wallSize:i,moatWidth:r,moatDepth:o}=this.config,a=i/2,l=Math.max(Math.abs(t),Math.abs(n))-a;if(l>0&&l<=r){if(this.isOnBridge(t,n))return e>=0?m.STONE:null;if(e>=-o&&e<0)return m.WATER}return null}isOnBridge(t,e){const{wallSize:n,gateWidth:i}=this.config,r=n/2,o=i/2;return e>r&&Math.abs(t)<=o+1}isInGate(t,e,n){const{wallSize:i,wallThickness:r,gateWidth:o,wallHeight:a}=this.config,l=i/2,c=o/2;return n>=l-r&&n<=l&&Math.abs(t)<=c&&e>=1&&e<=a-2}getTowerBlock(t,e,n){const{wallSize:i,towerRadius:r,towerHeight:o}=this.config,a=i/2,l=[{x:a,z:a},{x:-a,z:a},{x:a,z:-a},{x:-a,z:-a}];for(const c of l){const h=t-c.x,u=n-c.z,d=Math.sqrt(h*h+u*u);if(d<=r){if(e===0)return m.DARK_STONE;if(d>=r-1.5&&e<=o)return e>=o-2?e===o&&Math.floor(d*2)%2===0?m.AIR:m.DARK_STONE:e%4===0&&d>=r-.5?m.AIR:m.DARK_STONE;if(d<r-1.5&&e>0&&e<o-2)return this.isOnStaircase(h,u,e)?m.STONE:m.AIR;if(e>=o-2&&e<=o&&d<=r-1)return m.DARK_STONE}}return null}isOnStaircase(t,e,n){const o=((Math.atan2(e,t)+Math.PI)/(2*Math.PI)*16+n)%4;return Math.sqrt(t*t+e*e)<=2&&o<1}getGreatHallBlock(t,e,n){const{hallWidth:i,hallDepth:r,hallHeight:o}=this.config,a=i/2,l=r/2;if(Math.abs(t)>a||Math.abs(n)>l)return null;if(e===0)return m.STONE;if((Math.abs(t)>=a-1||Math.abs(n)>=l-1)&&e>=1&&e<=o)return n>=l-1&&Math.abs(t)<=2&&e>=1&&e<=4||e>=3&&e<=5&&(Math.abs(t)===a-1||Math.abs(n)===l-1)&&(Math.floor(t)+Math.floor(n))%4===0?m.AIR:m.DARK_STONE;if(e>=1&&e<o)return this.isHallPillar(t,n)?m.DARK_STONE:this.isTorchPosition(t,e,n)?m.TORCH:m.AIR;if(e>=o&&e<=o+2){const u=(e-o)*2;if(Math.abs(t)<=a-u&&Math.abs(n)<=l)return m.DARK_STONE}return null}isHallPillar(t,e){const{hallWidth:n,hallDepth:i}=this.config,r=n/2-3,o=i/2-3;return Math.abs(t)<=r&&Math.abs(e)<=o&&Math.abs(t)%5===0&&Math.abs(e)%5===0&&(Math.abs(t)>0||Math.abs(e)>0)}isTorchPosition(t,e,n){if(e!==3)return!1;const{hallWidth:i,hallDepth:r}=this.config,o=i/2-2,a=r/2-2;return(Math.abs(t)===o||Math.abs(n)===a)&&(Math.floor(t)+Math.floor(n))%6===0}getWallBlock(t,e,n){const{wallSize:i,wallHeight:r,wallThickness:o}=this.config,a=i/2;if(e<0||e>r)return null;const l=n<=-a+o&&n>=-a,c=n>=a-o&&n<=a,h=t>=a-o&&t<=a,u=t<=-a+o&&t>=-a;if(Math.abs(t)>=a-this.config.towerRadius&&Math.abs(n)>=a-this.config.towerRadius)return null;if(l||c||h||u){if(e===r)return Math.floor(t+n)%2===0?m.DARK_STONE:m.AIR;if(e===r-1)return m.DARK_STONE;if(e<r-1)return e<=2?m.MOSSY_STONE:m.DARK_STONE}return null}isInCourtyard(t,e){const{wallSize:n,wallThickness:i}=this.config,r=n/2-i;return Math.abs(t)<r&&Math.abs(e)<r}}class My{generators=[];baseHeight;constructor(t){this.baseHeight=t,this.initializeGenerators()}initializeGenerators(){const t={centerX:xc.x,centerZ:xc.z,baseHeight:this.baseHeight};this.registerGenerator("Pyramid",new gy(t));const e={centerX:Ec.x,centerZ:Ec.z,baseHeight:this.baseHeight};this.registerGenerator("ForbiddenCity",new _y(e));const n={centerX:bc.x,centerZ:bc.z,baseHeight:this.baseHeight};this.registerGenerator("Castle",new Sy(n))}registerGenerator(t,e){this.generators.push({name:t,generator:e})}getBlockAt(t,e,n){for(const{generator:i}of this.generators){const r=i.getBlockAt(t,e,n);if(r!==null)return r}return null}isInLandmarkZone(t,e){return Math.sqrt(t*t+e*e)<=zr}isInAnyLandmark(t,e){for(const{generator:n}of this.generators)if(n.isInBounds(t,e))return!0;return!1}getAllBoundingBoxes(){return this.generators.map(({name:t,generator:e})=>({name:t,box:e.getBoundingBox()}))}getLandmarkZoneRadius(){return zr}}var ae=(s=>(s[s.PLAINS=0]="PLAINS",s[s.LAKE=1]="LAKE",s[s.MOUNTAIN=2]="MOUNTAIN",s))(ae||{});const Rc={0:{type:0,baseHeightOffset:0,heightVariationScale:1,surfaceBlock:m.GRASS},1:{type:1,baseHeightOffset:-10,heightVariationScale:.3,surfaceBlock:m.SAND},2:{type:2,baseHeightOffset:15,heightVariationScale:2.5,surfaceBlock:m.STONE}};class xy{noise;biomeScale;spawnSafeRadius;biomeCache=new Map;maxCacheSize=1e4;constructor(t,e=iy,n=sy){this.noise=new el(t+1e3),this.biomeScale=e,this.spawnSafeRadius=n}getBiomeAt(t,e){const n=`${t},${e}`,i=this.biomeCache.get(n);if(i!==void 0)return i;const r=this.calculateBiome(t,e);if(this.biomeCache.size>=this.maxCacheSize){const o=Array.from(this.biomeCache.keys());for(let a=0;a<o.length/2;a++)this.biomeCache.delete(o[a])}return this.biomeCache.set(n,r),r}calculateBiome(t,e){if(Math.sqrt(t*t+e*e)<this.spawnSafeRadius)return ae.PLAINS;const i=this.noise.noise2D(t*this.biomeScale,e*this.biomeScale),r=this.noise.noise2D(t*this.biomeScale+1e3,e*this.biomeScale+1e3);return i>.3?ae.LAKE:r<-.2?ae.MOUNTAIN:ae.PLAINS}clearCache(){this.biomeCache.clear()}}m.FLOWER_RED,m.FLOWER_YELLOW,m.TALL_GRASS,m.MUSHROOM_RED,m.MUSHROOM_BROWN,m.DEAD_BUSH,m.CACTUS,m.ROSE,m.TULIP,m.DAISY,m.CORNFLOWER;const Ic={[ae.PLAINS]:[{type:m.TALL_GRASS,weight:10},{type:m.FLOWER_RED,weight:2},{type:m.FLOWER_YELLOW,weight:2},{type:m.ROSE,weight:1.5},{type:m.TULIP,weight:1.5},{type:m.DAISY,weight:1.5},{type:m.CORNFLOWER,weight:1}],[ae.LAKE]:[{type:m.TALL_GRASS,weight:3},{type:m.DAISY,weight:1}],[ae.MOUNTAIN]:[{type:m.TALL_GRASS,weight:4},{type:m.DEAD_BUSH,weight:2},{type:m.CORNFLOWER,weight:1}]},ko=[{type:m.CACTUS,weight:2,requiresBase:[m.SAND]},{type:m.DEAD_BUSH,weight:3,requiresBase:[m.SAND]}];m.MUSHROOM_RED,m.MUSHROOM_BROWN;function Ey(s){switch(s){case ae.PLAINS:return .15;case ae.LAKE:return .05;case ae.MOUNTAIN:return .08;default:return .1}}class by{seed;constructor(t){this.seed=t}seededRandom(t,e){const n=Math.sin(t*12.9898+e*78.233+this.seed*43758.5453)*43758.5453;return n-Math.floor(n)}shouldSpawnPlant(t,e,n){const i=Ey(n);return this.seededRandom(t,e)<i}getPlantType(t,e,n,i){const r=this.seededRandom(t+1e3,e+1e3);if(i===m.SAND){if(ko.length>0){const c=ko.reduce((u,d)=>u+d.weight,0);let h=r*c;for(const u of ko)if(h-=u.weight,h<=0)return u.type}return null}const o=Ic[n]||Ic[ae.PLAINS];if(o.length===0)return null;const a=o.reduce((c,h)=>c+h.weight,0);let l=r*a;for(const c of o)if(l-=c.weight,l<=0)return c.type;return o[0]?.type??null}isValidSurface(t){return t===m.GRASS||t===m.DIRT||t===m.SAND||t===m.STONE}getCactusHeight(t,e){const n=this.seededRandom(t+2e3,e+2e3);return 1+Math.floor(n*3)}}var Dr=(s=>(s[s.OAK=0]="OAK",s[s.BIRCH=1]="BIRCH",s[s.SPRUCE=2]="SPRUCE",s))(Dr||{});const Ty={0:{type:0,name:"橡树",nameEn:"Oak",trunkBlock:m.OAK_LOG,leavesBlock:m.OAK_LEAVES,minTrunkHeight:4,maxTrunkHeight:5,leavesRadius:2,leavesHeight:3},1:{type:1,name:"桦树",nameEn:"Birch",trunkBlock:m.BIRCH_LOG,leavesBlock:m.BIRCH_LEAVES,minTrunkHeight:5,maxTrunkHeight:6,leavesRadius:2,leavesHeight:2},2:{type:2,name:"云杉",nameEn:"Spruce",trunkBlock:m.SPRUCE_LOG,leavesBlock:m.SPRUCE_LEAVES,minTrunkHeight:4,maxTrunkHeight:6,leavesRadius:2,leavesHeight:4}},Dc={[ae.PLAINS]:[{type:0,weight:5},{type:1,weight:2}],[ae.LAKE]:[{type:0,weight:1}],[ae.MOUNTAIN]:[{type:2,weight:5},{type:0,weight:1}]};function Ay(s){switch(s){case ae.PLAINS:return .02;case ae.LAKE:return .005;case ae.MOUNTAIN:return .015;default:return .01}}const Cy=30;function nl(s,t){return Math.sqrt(s*s+t*t)<Cy}const Sr=8;class wy{seed;treePositions=new Map;constructor(t){this.seed=t}seededRandom(t,e,n=0){const i=Math.sin(t*12.9898+e*78.233+this.seed*43758.5453+n*12345.6789)*43758.5453;return i-Math.floor(i)}getPositionKey(t,e){return`${t},${e}`}canPlaceTree(t,e){if(nl(t,e))return!1;for(let n=-Sr;n<=Sr;n++)for(let i=-Sr;i<=Sr;i++){const r=this.getPositionKey(t+n,e+i);if(this.treePositions.has(r))return!1}return!0}shouldSpawnTree(t,e,n){const i=Ay(n);return this.seededRandom(t,e,3e3)<i}getTreeType(t,e,n){const i=Dc[n]||Dc[ae.PLAINS];if(i.length===0)return null;const r=i.reduce((a,l)=>a+l.weight,0);if(r===0)return null;let o=this.seededRandom(t+4e3,e+4e3)*r;for(const a of i)if(o-=a.weight,o<=0)return a.type;return i[0]?.type??null}getTrunkHeight(t,e,n){const i=this.seededRandom(t+5e3,e+5e3);return n.minTrunkHeight+Math.floor(i*(n.maxTrunkHeight-n.minTrunkHeight+1))}generateTree(t,e,n,i,r){const o=Ty[i],a=this.getTrunkHeight(t,n,o);this.treePositions.set(this.getPositionKey(t,n),!0);for(let c=0;c<a;c++)r(t,e+c+1,n,o.trunkBlock);const l=e+a+1;switch(i){case Dr.OAK:this.generateOakLeaves(t,l,n,o,r);break;case Dr.BIRCH:this.generateBirchLeaves(t,l,n,o,r);break;case Dr.SPRUCE:this.generateSpruceLeaves(t,l,n,a,o,r);break}}generateOakLeaves(t,e,n,i,r){const o=i.leavesRadius;for(let a=-1;a<i.leavesHeight;a++)for(let l=-o;l<=o;l++)for(let c=-o;c<=o;c++)if(Math.sqrt(l*l+a*a*.5+c*c)<=o+.5){if(Math.abs(l)===o&&Math.abs(c)===o&&a===-1)continue;r(t+l,e+a,n+c,i.leavesBlock)}}generateBirchLeaves(t,e,n,i,r){const o=i.leavesRadius;for(let a=-1;a<i.leavesHeight;a++){const l=a===i.leavesHeight-1?1:o;for(let c=-l;c<=l;c++)for(let h=-l;h<=l;h++)Math.abs(c)===l&&Math.abs(h)===l||r(t+c,e+a,n+h,i.leavesBlock)}}generateSpruceLeaves(t,e,n,i,r,o){const a=r.leavesHeight;for(let l=0;l<a;l++){const c=e-l,h=Math.min(l,r.leavesRadius);for(let u=-h;u<=h;u++)for(let d=-h;d<=h;d++)Math.abs(u)+Math.abs(d)<=h&&o(t+u,c,n+d,r.leavesBlock)}o(t,e+1,n,r.leavesBlock)}clearChunk(t,e){const n=t*16,i=e*16;for(let r=n;r<n+16;r++)for(let o=i;o<i+16;o++)this.treePositions.delete(this.getPositionKey(r,o))}reset(){this.treePositions.clear()}}class Ry{seed;config;noise;biomeGenerator;plantGenerator;treeGenerator;caveGenerator=null;colosseumGenerator=null;landmarkManager=null;heightCache=new Map;maxCacheSize=1e4;constructor(t,e={}){this.seed=t,this.config={...su,...e},this.noise=new el(t),this.biomeGenerator=new xy(t),this.plantGenerator=new by(t),this.treeGenerator=new wy(t)}enableCaves(t){this.caveGenerator=t}enableColosseum(t){const e=this.getHeightAt(0,0);this.colosseumGenerator=new dy({...t,baseHeight:e})}getColosseumGenerator(){return this.colosseumGenerator}enableLandmarks(){const t=this.getHeightAt(0,0);this.landmarkManager=new My(t)}getLandmarkManager(){return this.landmarkManager}generateChunk(t,e,n){const i=new Uint8Array(Ps),r=t*Yt,o=e*Yt,a=n*Yt,l=[];for(let c=0;c<Yt;c++)for(let h=0;h<Yt;h++){const u=r+c,d=a+h,f=this.getHeightAt(u,d),y=this.biomeGenerator.getBiomeAt(u,d);for(let _=0;_<Yt;_++){const g=o+_,p=$i(c,_,h),x=this.getBlockTypeAt(u,g,d,f);i[p]=x,g===f&&x!==m.AIR&&x!==m.WATER&&l.push({x:c,z:h,y:_+1,biome:y,surface:x})}}return this.generatePlants(i,l,r,a),this.generateTrees(i,l,r,o,a),i}generateTrees(t,e,n,i,r){for(const o of e){if(o.surface!==m.GRASS)continue;const a=n+o.x,l=r+o.z,c=i+o.y-1;if(!this.treeGenerator.shouldSpawnTree(a,l,o.biome)||!this.treeGenerator.canPlaceTree(a,l))continue;const h=this.treeGenerator.getTreeType(a,l,o.biome);h!==null&&this.treeGenerator.generateTree(a,c,l,h,(u,d,f,y)=>{const _=u-n,g=d-i,p=f-r;if(_>=0&&_<Yt&&g>=0&&g<Yt&&p>=0&&p<Yt){const x=$i(_,g,p),b=t[x];(b===m.AIR||b===m.TALL_GRASS||b===m.FLOWER_RED||b===m.FLOWER_YELLOW||b===m.ROSE||b===m.TULIP||b===m.DAISY||b===m.CORNFLOWER)&&(t[x]=y)}})}}generatePlants(t,e,n,i){for(const r of e){if(r.y<0||r.y>=Yt||!this.plantGenerator.isValidSurface(r.surface))continue;const o=n+r.x,a=i+r.z,l=Math.sqrt(o*o+a*a),c=this.landmarkManager?zr:Do;if(l<c||!this.plantGenerator.shouldSpawnPlant(o,a,r.biome))continue;const h=this.plantGenerator.getPlantType(o,a,r.biome,r.surface);if(!h)continue;const u=$i(r.x,r.y,r.z);if(h===m.CACTUS){const d=this.plantGenerator.getCactusHeight(o,a);for(let f=0;f<d&&r.y+f<Yt;f++){const y=$i(r.x,r.y+f,r.z);t[y]=m.CACTUS}}else t[u]=h}}getHeightAt(t,e){const n=`${t},${e}`,i=this.heightCache.get(n);if(i!==void 0)return i;const r=Math.sqrt(t*t+e*e),o=this.landmarkManager?zr:Do;if(r<o){const f=this.config.baseHeight;return this.heightCache.set(n,f),f}const a=this.biomeGenerator.getBiomeAt(t,e),l=Rc[a],c=this.config.baseHeight+l.baseHeightOffset,h=this.config.heightVariation*l.heightVariationScale,u=this.noise.fractal2D(t*this.config.scale,e*this.config.scale,this.config.octaves,this.config.persistence,this.config.lacunarity),d=Math.floor(c+u*h);if(this.heightCache.size>=this.maxCacheSize){const f=Array.from(this.heightCache.keys());for(let y=0;y<f.length/2;y++)this.heightCache.delete(f[y])}return this.heightCache.set(n,d),d}getBlockTypeAt(t,e,n,i){if(this.landmarkManager){const l=this.landmarkManager.getBlockAt(t,e,n);if(l!==null)return l}if(this.colosseumGenerator){const l=this.colosseumGenerator.getBlockAt(t,e,n);if(l!==null)return l}if(e<=es&&e>i)return m.WATER;if(e>i)return m.AIR;if(this.caveGenerator&&this.caveGenerator.shouldCarve(t,e,n))return e<=es?m.WATER:m.AIR;const r=i-e,o=this.biomeGenerator.getBiomeAt(t,n),a=Rc[o];return r===0?i<es||Math.sqrt(t*t+n*n)<Do?m.SAND:a.surfaceBlock:r<=this.config.dirtDepth?m.DIRT:m.STONE}getMinHeight(){return this.config.baseHeight-this.config.heightVariation}getMaxHeight(){return this.config.baseHeight+this.config.heightVariation}getBiomeAt(t,e){return this.biomeGenerator.getBiomeAt(t,e)}clearCache(){this.heightCache.clear()}}class Iy{seed;config;noise;constructor(t,e={}){this.seed=t,this.config={...ru,...e},this.noise=new el(t+12345)}shouldCarve(t,e,n){return e<this.config.minHeight||e>this.config.maxHeight?!1:this.noise.noise3D(t*this.config.scale,e*this.config.scale,n*this.config.scale)>this.config.threshold}getCaveDensity(t,e,n){return(this.noise.noise3D(t*this.config.scale,e*this.config.scale,n*this.config.scale)+1)/2}}class Dy{seed;chunks=new Map;terrainGenerator;caveGenerator=null;dirtyChunks=new Set;onChunkLoaded=null;onChunkUnloaded=null;constructor(t={}){this.seed=t.seed??Date.now();const e={...su,...t.terrainConfig};if(this.terrainGenerator=new Ry(this.seed,e),t.enableCaves??!0){const o={...ru,...t.caveConfig};this.caveGenerator=new Iy(this.seed,o),this.terrainGenerator.enableCaves(this.caveGenerator)}(t.enableColosseum??!0)&&this.terrainGenerator.enableColosseum(t.colosseumConfig),(t.enableLandmarks??!0)&&this.terrainGenerator.enableLandmarks()}getBlock(t,e,n){const i=Math.floor(t),r=Math.floor(e),o=Math.floor(n);if(!Lo(r))return m.AIR;const a=Gr(i,r,o),l=this.getChunk(a.x,a.y,a.z);if(!l)return m.AIR;const c=Tc(i,r,o);return l.getBlock(c.x,c.y,c.z)}setBlock(t,e,n,i){const r=Math.floor(t),o=Math.floor(e),a=Math.floor(n);if(!Lo(o))return!1;const l=Gr(r,o,a),c=this.getChunk(l.x,l.y,l.z);if(!c)return!1;const h=Tc(r,o,a);c.setBlock(h.x,h.y,h.z,i);const u=_e(l.x,l.y,l.z);return this.dirtyChunks.add(u),this.markAdjacentChunksDirty(h.x,h.y,h.z,l),!0}markAdjacentChunksDirty(t,e,n,i){const{x:r,y:o,z:a}=i;t===0&&this.dirtyChunks.add(_e(r-1,o,a)),t===Yt-1&&this.dirtyChunks.add(_e(r+1,o,a)),e===0&&o>0&&this.dirtyChunks.add(_e(r,o-1,a)),e===Yt-1&&o<Br-1&&this.dirtyChunks.add(_e(r,o+1,a)),n===0&&this.dirtyChunks.add(_e(r,o,a-1)),n===Yt-1&&this.dirtyChunks.add(_e(r,o,a+1))}getChunk(t,e,n){if(Ac(e))return this.chunks.get(_e(t,e,n))}isChunkLoaded(t,e,n){return this.chunks.has(_e(t,e,n))}loadChunk(t,e,n){const i=_e(t,e,n);let r=this.chunks.get(i);if(r)return r;if(!Ac(e))throw new Error(`Invalid chunk Y coordinate: ${e}`);r=new ay(t,e,n);const o=this.terrainGenerator.generateChunk(t,e,n);return r.fillBlocks(o),this.chunks.set(i,r),this.onChunkLoaded&&this.onChunkLoaded(r),r}unloadChunk(t,e,n){const i=_e(t,e,n),r=this.chunks.get(i);r&&(this.onChunkUnloaded&&this.onChunkUnloaded(r),r.dispose(),this.chunks.delete(i),this.dirtyChunks.delete(i))}getHeightAt(t,e){return this.terrainGenerator.getHeightAt(t,e)}getBiomeAt(t,e){return this.terrainGenerator.getBiomeAt(t,e)}isWaterAt(t,e,n){return this.getBlock(t,e,n)===m.WATER}getSpawnPosition(){const n=this.terrainGenerator.getColosseumGenerator();if(n)return{x:0+.5,y:n.getSpawnHeight()+.8,z:0+.5};const i=this.getHeightAt(0,0);return{x:0+.5,y:i+1.8,z:0+.5}}getLoadedChunks(){return Array.from(this.chunks.values())}getLoadedChunkCount(){return this.chunks.size}getDirtyChunks(){const t=[];for(const e of this.dirtyChunks){const n=this.chunks.get(e);n&&(n.isDirty=!0,t.push(n))}return this.dirtyChunks.clear(),t}isValidPosition(t,e,n){return Lo(Math.floor(e))}getTerrainGenerator(){return this.terrainGenerator}getSeed(){return this.seed}dispose(){for(const t of this.chunks.values())t.dispose();this.chunks.clear(),this.dirtyChunks.clear()}getModifiedChunks(){const t=[];for(const[e,n]of this.chunks)if(n.isModified){const i=new Uint8Array(n.blocks.length);i.set(n.blocks),t.push({key:e,blocks:i})}return t}restoreFromSave(t){for(const e of t){const[n,i,r]=e.chunkKey.split(","),o=parseInt(n,10),a=parseInt(i,10),l=parseInt(r,10),c=this.loadChunk(o,a,l);c.blocks.set(e.blocks),c.isModified=!0,c.isDirty=!0;const h=_e(o,a,l);this.dirtyChunks.add(h)}}resetWorld(){for(const t of this.chunks.values())this.onChunkUnloaded&&this.onChunkUnloaded(t),t.dispose();this.chunks.clear(),this.dirtyChunks.clear()}}class Py{renderer;scene;container;ambientLight;directionalLight;baseAmbientIntensity=.6;baseDirectionalIntensity=.8;constructor(t){this.container=t,this.scene=new $h,this.scene.background=null,this.renderer=new qh({antialias:!1,powerPreference:"high-performance"}),this.renderer.setPixelRatio(Math.min(window.devicePixelRatio,2)),this.renderer.setSize(t.clientWidth,t.clientHeight),t.appendChild(this.renderer.domElement),this.ambientLight=new tu(16777215,this.baseAmbientIntensity),this.scene.add(this.ambientLight),this.directionalLight=new Qh(16777215,this.baseDirectionalIntensity),this.directionalLight.position.set(50,100,50),this.scene.add(this.directionalLight),window.addEventListener("resize",this.handleResize.bind(this))}handleResize(){const t=this.container.clientWidth,e=this.container.clientHeight;this.renderer.setSize(t,e)}setAmbientIntensity(t){this.ambientLight.intensity=this.baseAmbientIntensity*t,this.directionalLight.intensity=this.baseDirectionalIntensity*t}setSunPosition(t,e,n){this.directionalLight.position.set(t,e,n)}getScene(){return this.scene}getDomElement(){return this.renderer.domElement}render(t){this.renderer.render(this.scene,t)}add(t){this.scene.add(t)}remove(t){this.scene.remove(t)}getSize(){return{width:this.container.clientWidth,height:this.container.clientHeight}}dispose(){window.removeEventListener("resize",this.handleResize.bind(this)),this.renderer.dispose()}}const F={GRASS_TOP:0,GRASS_SIDE:1,DIRT:2,STONE:3,WOOD:4,SAND:5,COBBLESTONE:6,BRICK:7,GLASS:8,WATER:9,LEAVES:10,LOG_TOP:11,LOG_SIDE:12,PLANKS:13,SNOW:14,SANDSTONE:15,SANDSTONE_CARVED:16,RED_BRICK:17,GOLD_BLOCK:18,DARK_STONE:19,MOSSY_STONE:20,TORCH:21,RAW_BEEF:22,RAW_PORKCHOP:23,COOKED_BEEF:22,COOKED_PORKCHOP:23,COOKED_MUTTON:22,COOKED_CHICKEN:23,COOKED_RABBIT:22,CAMPFIRE:21,CRAFTING_TABLE_TOP:24,CRAFTING_TABLE_SIDE:25,FURNACE_TOP:26,FURNACE_FRONT:27,FURNACE_SIDE:28,FURNACE_FRONT_LIT:29},Ly={[m.GRASS]:{top:F.GRASS_TOP,bottom:F.DIRT,side:F.GRASS_SIDE},[m.DIRT]:{top:F.DIRT,bottom:F.DIRT,side:F.DIRT},[m.STONE]:{top:F.STONE,bottom:F.STONE,side:F.STONE},[m.WOOD]:{top:F.WOOD,bottom:F.WOOD,side:F.WOOD},[m.SAND]:{top:F.SAND,bottom:F.SAND,side:F.SAND},[m.COBBLESTONE]:{top:F.COBBLESTONE,bottom:F.COBBLESTONE,side:F.COBBLESTONE},[m.BRICK]:{top:F.BRICK,bottom:F.BRICK,side:F.BRICK},[m.GLASS]:{top:F.GLASS,bottom:F.GLASS,side:F.GLASS},[m.WATER]:{top:F.WATER,bottom:F.WATER,side:F.WATER},[m.LEAVES]:{top:F.LEAVES,bottom:F.LEAVES,side:F.LEAVES},[m.LOG]:{top:F.LOG_TOP,bottom:F.LOG_TOP,side:F.LOG_SIDE},[m.PLANKS]:{top:F.PLANKS,bottom:F.PLANKS,side:F.PLANKS},[m.SNOW]:{top:F.SNOW,bottom:F.SNOW,side:F.SNOW},[m.OAK_LOG]:{top:F.LOG_TOP,bottom:F.LOG_TOP,side:F.LOG_SIDE},[m.BIRCH_LOG]:{top:F.LOG_TOP,bottom:F.LOG_TOP,side:F.LOG_SIDE},[m.SPRUCE_LOG]:{top:F.LOG_TOP,bottom:F.LOG_TOP,side:F.LOG_SIDE},[m.OAK_LEAVES]:{top:F.LEAVES,bottom:F.LEAVES,side:F.LEAVES},[m.BIRCH_LEAVES]:{top:F.LEAVES,bottom:F.LEAVES,side:F.LEAVES},[m.SPRUCE_LEAVES]:{top:F.LEAVES,bottom:F.LEAVES,side:F.LEAVES},[m.SANDSTONE]:{top:F.SANDSTONE,bottom:F.SANDSTONE,side:F.SANDSTONE},[m.SANDSTONE_CARVED]:{top:F.SANDSTONE_CARVED,bottom:F.SANDSTONE_CARVED,side:F.SANDSTONE_CARVED},[m.RED_BRICK]:{top:F.RED_BRICK,bottom:F.RED_BRICK,side:F.RED_BRICK},[m.GOLD_BLOCK]:{top:F.GOLD_BLOCK,bottom:F.GOLD_BLOCK,side:F.GOLD_BLOCK},[m.DARK_STONE]:{top:F.DARK_STONE,bottom:F.DARK_STONE,side:F.DARK_STONE},[m.MOSSY_STONE]:{top:F.MOSSY_STONE,bottom:F.MOSSY_STONE,side:F.MOSSY_STONE},[m.TORCH]:{top:F.TORCH,bottom:F.TORCH,side:F.TORCH},[m.RAW_BEEF]:{top:F.RAW_BEEF,bottom:F.RAW_BEEF,side:F.RAW_BEEF},[m.RAW_PORKCHOP]:{top:F.RAW_PORKCHOP,bottom:F.RAW_PORKCHOP,side:F.RAW_PORKCHOP},[m.RAW_MUTTON]:{top:F.RAW_BEEF,bottom:F.RAW_BEEF,side:F.RAW_BEEF},[m.RAW_CHICKEN]:{top:F.RAW_PORKCHOP,bottom:F.RAW_PORKCHOP,side:F.RAW_PORKCHOP},[m.RAW_RABBIT]:{top:F.RAW_BEEF,bottom:F.RAW_BEEF,side:F.RAW_BEEF},[m.COOKED_BEEF]:{top:F.COOKED_BEEF,bottom:F.COOKED_BEEF,side:F.COOKED_BEEF},[m.COOKED_PORKCHOP]:{top:F.COOKED_PORKCHOP,bottom:F.COOKED_PORKCHOP,side:F.COOKED_PORKCHOP},[m.COOKED_MUTTON]:{top:F.COOKED_MUTTON,bottom:F.COOKED_MUTTON,side:F.COOKED_MUTTON},[m.COOKED_CHICKEN]:{top:F.COOKED_CHICKEN,bottom:F.COOKED_CHICKEN,side:F.COOKED_CHICKEN},[m.COOKED_RABBIT]:{top:F.COOKED_RABBIT,bottom:F.COOKED_RABBIT,side:F.COOKED_RABBIT},[m.CAMPFIRE]:{top:F.CAMPFIRE,bottom:F.CAMPFIRE,side:F.CAMPFIRE},[m.CRAFTING_TABLE]:{top:F.CRAFTING_TABLE_TOP,bottom:F.PLANKS,side:F.CRAFTING_TABLE_SIDE},[m.FURNACE]:{top:F.FURNACE_TOP,bottom:F.FURNACE_TOP,side:F.FURNACE_FRONT},[m.FURNACE_LIT]:{top:F.FURNACE_TOP,bottom:F.FURNACE_TOP,side:F.FURNACE_FRONT_LIT}};function Cn(s,t){const e=Ly[s];if(!e)return 0;switch(t){case"top":return e.top;case"bottom":return e.bottom;case"front":case"back":case"left":case"right":return e.side;default:return e.side}}const Oy={imagePath:"textures/blocks.png",tileSize:16,columns:30,rows:3};class Ny{texture;loadState="unloaded";config;canvas;constructor(t={}){this.config={...Oy,...t},this.canvas=document.createElement("canvas"),this.texture=this.createProceduralAtlas(),this.loadState="fallback"}createProceduralAtlas(){const{tileSize:t,columns:e,rows:n}=this.config;this.canvas.width=t*e,this.canvas.height=t*n;const i=this.canvas.getContext("2d");i.fillStyle="#ff00ff",i.fillRect(0,0,this.canvas.width,this.canvas.height),this.generateGrassTop(i,F.GRASS_TOP,0),this.generateGrassSide(i,F.GRASS_SIDE,0),this.generateSolidTexture(i,F.DIRT,0,He[m.DIRT],"dirt"),this.generateSolidTexture(i,F.STONE,0,He[m.STONE],"stone"),this.generateSolidTexture(i,F.WOOD,0,He[m.WOOD],"planks"),this.generateSolidTexture(i,F.SAND,0,He[m.SAND],"sand"),this.generateSolidTexture(i,F.COBBLESTONE,0,He[m.COBBLESTONE],"cobble"),this.generateBrickTexture(i,F.BRICK,0),this.generateGlassTexture(i,F.GLASS,0),this.generateWaterTexture(i,F.WATER,0),this.generateLeavesTexture(i,F.LEAVES,0),this.generateLogTop(i,F.LOG_TOP,0),this.generateLogSide(i,F.LOG_SIDE,0),this.generateSolidTexture(i,F.PLANKS,0,He[m.PLANKS],"planks"),this.generateSolidTexture(i,F.SNOW,0,He[m.SNOW],"snow"),this.generateSandstoneTexture(i,F.SANDSTONE,0),this.generateCarvedSandstoneTexture(i,F.SANDSTONE_CARVED,0),this.generateRedBrickTexture(i,F.RED_BRICK,0),this.generateGoldBlockTexture(i,F.GOLD_BLOCK,0),this.generateDarkStoneTexture(i,F.DARK_STONE,0),this.generateMossyStoneTexture(i,F.MOSSY_STONE,0),this.generateTorchTexture(i,F.TORCH,0),this.generateRawBeefTexture(i,F.RAW_BEEF,0),this.generateRawPorkchopTexture(i,F.RAW_PORKCHOP,0),this.generateCraftingTableTopTexture(i,F.CRAFTING_TABLE_TOP,0),this.generateCraftingTableSideTexture(i,F.CRAFTING_TABLE_SIDE,0),this.generateFurnaceTopTexture(i,F.FURNACE_TOP,0),this.generateFurnaceFrontTexture(i,F.FURNACE_FRONT,0),this.generateFurnaceSideTexture(i,F.FURNACE_SIDE,0),this.generateFurnaceFrontLitTexture(i,F.FURNACE_FRONT_LIT,0);const r=new Y0(this.canvas);return r.magFilter=Je,r.minFilter=Je,r.wrapS=Ns,r.wrapT=Ns,r.colorSpace=je,r.needsUpdate=!0,r}generateGrassTop(t,e,n){const{tileSize:i}=this.config,r=e*i,o=n*i;t.fillStyle="#7cba3d",t.fillRect(r,o,i,i);for(let a=0;a<i*i/4;a++){const l=r+Math.floor(Math.random()*i),c=o+Math.floor(Math.random()*i),h=Math.random()>.5?"#6aa32e":"#8cc94d";t.fillStyle=h,t.fillRect(l,c,1,1)}}generateGrassSide(t,e,n){const{tileSize:i}=this.config,r=e*i,o=n*i;t.fillStyle="#8b5a2b",t.fillRect(r,o,i,i);for(let a=0;a<i*i/3;a++){const l=r+Math.floor(Math.random()*i),c=o+Math.floor(Math.random()*i),h=Math.random()>.5?"#7a4f26":"#9c6530";t.fillStyle=h,t.fillRect(l,c,1,1)}t.fillStyle="#7cba3d";for(let a=0;a<i;a++){const l=2+Math.floor(Math.random()*2);t.fillRect(r+a,o,1,l)}}generateSolidTexture(t,e,n,i,r){const{tileSize:o}=this.config,a=e*o,l=n*o,c=i>>16&255,h=i>>8&255,u=i&255;t.fillStyle=`rgb(${c}, ${h}, ${u})`,t.fillRect(a,l,o,o);const d=r==="snow"?10:20;for(let f=0;f<o;f++)for(let y=0;y<o;y++){const _=(Math.random()-.5)*d,g=Math.max(0,Math.min(255,c+_)),p=Math.max(0,Math.min(255,h+_)),x=Math.max(0,Math.min(255,u+_));t.fillStyle=`rgb(${g}, ${p}, ${x})`,t.fillRect(a+f,l+y,1,1)}t.strokeStyle="rgba(0, 0, 0, 0.15)",t.lineWidth=1,t.strokeRect(a+.5,l+.5,o-1,o-1)}generateBrickTexture(t,e,n){const{tileSize:i}=this.config,r=e*i,o=n*i;t.fillStyle="#a0a0a0",t.fillRect(r,o,i,i);const a=4,l=8;for(let c=0;c<i/a;c++){const h=c%2*(l/2);for(let u=0;u<i/l+1;u++){const d=r+u*l-h,f=o+c*a,y=Math.random()>.5?"#8c3a2a":"#ac5a4a";t.fillStyle=y,t.fillRect(Math.max(r,d+1),f+1,Math.min(l-1,r+i-d-1),a-1)}}}generateGlassTexture(t,e,n){const{tileSize:i}=this.config,r=e*i,o=n*i;t.fillStyle="rgba(200, 232, 255, 0.3)",t.fillRect(r,o,i,i),t.strokeStyle="rgba(150, 200, 230, 0.8)",t.lineWidth=1,t.strokeRect(r+.5,o+.5,i-1,i-1),t.fillStyle="rgba(255, 255, 255, 0.4)",t.fillRect(r+2,o+2,3,3)}generateWaterTexture(t,e,n){const{tileSize:i}=this.config,r=e*i,o=n*i;t.fillStyle="rgba(51, 102, 204, 0.7)",t.fillRect(r,o,i,i);for(let a=0;a<i;a+=4){t.fillStyle="rgba(80, 130, 220, 0.5)";for(let l=0;l<i;l++)Math.sin((l+a)*.5)>0&&t.fillRect(r+l,o+a,1,2)}}generateLeavesTexture(t,e,n){const{tileSize:i}=this.config,r=e*i,o=n*i;t.clearRect(r,o,i,i);for(let a=0;a<i;a++)for(let l=0;l<i;l++)if(Math.random()>.2){const c=Math.random()>.5?"#3d9140":"#2d8130";t.fillStyle=c,t.fillRect(r+a,o+l,1,1)}}generateLogTop(t,e,n){const{tileSize:i}=this.config,r=e*i,o=n*i,a=r+i/2,l=o+i/2;t.fillStyle="#6b4423",t.fillRect(r,o,i,i),t.fillStyle="#bc8f5a",t.beginPath(),t.arc(a,l,i/2-2,0,Math.PI*2),t.fill(),t.strokeStyle="#a07848",t.lineWidth=1;for(let c=2;c<i/2-2;c+=2)t.beginPath(),t.arc(a,l,c,0,Math.PI*2),t.stroke();t.fillStyle="#8b6538",t.beginPath(),t.arc(a,l,1,0,Math.PI*2),t.fill()}generateLogSide(t,e,n){const{tileSize:i}=this.config,r=e*i,o=n*i;t.fillStyle="#6b4423",t.fillRect(r,o,i,i),t.strokeStyle="#5a3818",t.lineWidth=1;for(let a=0;a<i;a+=3){t.beginPath(),t.moveTo(r,o+a+Math.random()*2);for(let l=0;l<i;l+=4)t.lineTo(r+l,o+a+Math.random()*2);t.stroke()}for(let a=0;a<i*2;a++){const l=r+Math.floor(Math.random()*i),c=o+Math.floor(Math.random()*i);t.fillStyle=Math.random()>.5?"#7b5433":"#5b3413",t.fillRect(l,c,1,1)}}generateSandstoneTexture(t,e,n){const{tileSize:i}=this.config,r=e*i,o=n*i;t.fillStyle="#d4b896",t.fillRect(r,o,i,i);for(let a=0;a<i;a++)for(let l=0;l<i;l++){const c=(Math.random()-.5)*25,h=Math.max(0,Math.min(255,212+c)),u=Math.max(0,Math.min(255,184+c)),d=Math.max(0,Math.min(255,150+c));t.fillStyle=`rgb(${h}, ${u}, ${d})`,t.fillRect(r+a,o+l,1,1)}t.strokeStyle="rgba(160, 130, 100, 0.3)",t.lineWidth=1;for(let a=4;a<i;a+=4)t.beginPath(),t.moveTo(r,o+a),t.lineTo(r+i,o+a),t.stroke()}generateCarvedSandstoneTexture(t,e,n){const{tileSize:i}=this.config,r=e*i,o=n*i;t.fillStyle="#c4a876",t.fillRect(r,o,i,i);for(let a=0;a<i;a++)for(let l=0;l<i;l++){const c=(Math.random()-.5)*20,h=Math.max(0,Math.min(255,196+c)),u=Math.max(0,Math.min(255,168+c)),d=Math.max(0,Math.min(255,118+c));t.fillStyle=`rgb(${h}, ${u}, ${d})`,t.fillRect(r+a,o+l,1,1)}t.strokeStyle="rgba(100, 80, 50, 0.5)",t.lineWidth=1,t.strokeRect(r+2,o+2,i-4,i-4),t.strokeRect(r+4,o+4,i-8,i-8)}generateRedBrickTexture(t,e,n){const{tileSize:i}=this.config,r=e*i,o=n*i;t.fillStyle="#4a2020",t.fillRect(r,o,i,i);const a=4,l=8;for(let c=0;c<i/a;c++){const h=c%2*(l/2);for(let u=0;u<i/l+1;u++){const d=r+u*l-h,f=o+c*a,y=Math.random()>.5?"#8b2323":"#7a1f1f";t.fillStyle=y,t.fillRect(Math.max(r,d+1),f+1,Math.min(l-1,r+i-d-1),a-1)}}}generateGoldBlockTexture(t,e,n){const{tileSize:i}=this.config,r=e*i,o=n*i;t.fillStyle="#ffd700",t.fillRect(r,o,i,i);for(let a=0;a<i;a++)for(let l=0;l<i;l++){const c=(Math.random()-.5)*40,h=Math.max(0,Math.min(255,255+c*.3)),u=Math.max(0,Math.min(255,215+c)),d=Math.max(0,Math.min(255,0+Math.abs(c)*.5));t.fillStyle=`rgb(${h}, ${u}, ${d})`,t.fillRect(r+a,o+l,1,1)}t.fillStyle="rgba(255, 255, 200, 0.4)",t.fillRect(r+2,o+2,4,4),t.strokeStyle="rgba(180, 150, 0, 0.5)",t.lineWidth=1,t.strokeRect(r+.5,o+.5,i-1,i-1)}generateDarkStoneTexture(t,e,n){const{tileSize:i}=this.config,r=e*i,o=n*i;t.fillStyle="#4a4a4a",t.fillRect(r,o,i,i);for(let a=0;a<i;a++)for(let l=0;l<i;l++){const c=(Math.random()-.5)*30,h=Math.max(0,Math.min(255,74+c));t.fillStyle=`rgb(${h}, ${h}, ${h})`,t.fillRect(r+a,o+l,1,1)}t.strokeStyle="rgba(30, 30, 30, 0.4)",t.lineWidth=1,t.beginPath(),t.moveTo(r,o+8),t.lineTo(r+i,o+8),t.stroke(),t.beginPath(),t.moveTo(r+8,o),t.lineTo(r+8,o+8),t.moveTo(r+4,o+8),t.lineTo(r+4,o+i),t.moveTo(r+12,o+8),t.lineTo(r+12,o+i),t.stroke()}generateMossyStoneTexture(t,e,n){const{tileSize:i}=this.config,r=e*i,o=n*i;t.fillStyle="#4a4a4a",t.fillRect(r,o,i,i);for(let a=0;a<i;a++)for(let l=0;l<i;l++){const c=(Math.random()-.5)*25,h=Math.max(0,Math.min(255,74+c));t.fillStyle=`rgb(${h}, ${h}, ${h})`,t.fillRect(r+a,o+l,1,1)}for(let a=0;a<i*3;a++){const l=r+Math.floor(Math.random()*i),c=o+Math.floor(Math.random()*i),h=Math.random()>.5?"#5a6b4a":"#4a5b3a";t.fillStyle=h,t.fillRect(l,c,1+Math.floor(Math.random()*2),1+Math.floor(Math.random()*2))}}generateTorchTexture(t,e,n){const{tileSize:i}=this.config,r=e*i,o=n*i,a=r+i/2,l=o+i/2;t.clearRect(r,o,i,i),t.fillStyle="#6b4423",t.fillRect(a-1,l,2,i/2),t.fillStyle="rgba(255, 200, 50, 0.6)",t.beginPath(),t.arc(a,l-2,4,0,Math.PI*2),t.fill(),t.fillStyle="#ffcc00",t.beginPath(),t.ellipse(a,l-2,2,3,0,0,Math.PI*2),t.fill(),t.fillStyle="#ff6600",t.beginPath(),t.ellipse(a,l-4,1,2,0,0,Math.PI*2),t.fill()}generateRawBeefTexture(t,e,n){const{tileSize:i}=this.config,r=e*i,o=n*i;t.fillStyle="#c41e3a",t.fillRect(r,o,i,i);for(let a=0;a<i;a++)for(let l=0;l<i;l++){const c=(Math.random()-.5)*30,h=Math.max(0,Math.min(255,196+c)),u=Math.max(0,Math.min(255,30+c*.5)),d=Math.max(0,Math.min(255,58+c*.5));t.fillStyle=`rgb(${h}, ${u}, ${d})`,t.fillRect(r+a,o+l,1,1)}for(let a=0;a<8;a++){const l=r+2+Math.floor(Math.random()*(i-4)),c=o+2+Math.floor(Math.random()*(i-4));t.fillStyle="rgba(255, 255, 255, 0.7)",t.fillRect(l,c,2,1)}}generateRawPorkchopTexture(t,e,n){const{tileSize:i}=this.config,r=e*i,o=n*i;t.fillStyle="#ffb6c1",t.fillRect(r,o,i,i);for(let a=0;a<i;a++)for(let l=0;l<i;l++){const c=(Math.random()-.5)*25,h=Math.max(0,Math.min(255,255+c*.3)),u=Math.max(0,Math.min(255,182+c)),d=Math.max(0,Math.min(255,193+c));t.fillStyle=`rgb(${h}, ${u}, ${d})`,t.fillRect(r+a,o+l,1,1)}t.fillStyle="#f5f5dc",t.fillRect(r+i-4,o+4,3,i-8),t.fillStyle="#d4d4aa",t.fillRect(r+i-3,o+4,1,i-8)}generateCraftingTableTopTexture(t,e,n){const{tileSize:i}=this.config,r=e*i,o=n*i;t.fillStyle="#bc8f5a",t.fillRect(r,o,i,i);for(let h=0;h<i;h++)for(let u=0;u<i;u++){const d=(Math.random()-.5)*20,f=Math.max(0,Math.min(255,188+d)),y=Math.max(0,Math.min(255,143+d)),_=Math.max(0,Math.min(255,90+d));t.fillStyle=`rgb(${f}, ${y}, ${_})`,t.fillRect(r+h,o+u,1,1)}const a=10,l=(i-a)/2,c=a/3;t.fillStyle="#8b6914",t.fillRect(r+l,o+l,a,a),t.strokeStyle="#5a4510",t.lineWidth=1;for(let h=0;h<=3;h++)t.beginPath(),t.moveTo(r+l,o+l+h*c),t.lineTo(r+l+a,o+l+h*c),t.stroke(),t.beginPath(),t.moveTo(r+l+h*c,o+l),t.lineTo(r+l+h*c,o+l+a),t.stroke();t.strokeStyle="rgba(0, 0, 0, 0.3)",t.lineWidth=1,t.strokeRect(r+.5,o+.5,i-1,i-1)}generateCraftingTableSideTexture(t,e,n){const{tileSize:i}=this.config,r=e*i,o=n*i;t.fillStyle="#bc8f5a",t.fillRect(r,o,i,i);for(let a=0;a<i;a++)for(let l=0;l<i;l++){const c=(Math.random()-.5)*20,h=Math.max(0,Math.min(255,188+c)),u=Math.max(0,Math.min(255,143+c)),d=Math.max(0,Math.min(255,90+c));t.fillStyle=`rgb(${h}, ${u}, ${d})`,t.fillRect(r+a,o+l,1,1)}t.fillStyle="#808080",t.fillRect(r+2,o+6,5,1),t.fillRect(r+2,o+7,5,1);for(let a=0;a<5;a++)t.fillRect(r+2+a,o+8,1,1);t.fillStyle="#6b4423",t.fillRect(r+1,o+5,2,4),t.fillStyle="#808080",t.fillRect(r+10,o+5,4,2),t.fillStyle="#6b4423",t.fillRect(r+11,o+7,2,5),t.strokeStyle="rgba(90, 70, 40, 0.5)",t.lineWidth=1,t.beginPath(),t.moveTo(r,o+i/2),t.lineTo(r+i,o+i/2),t.stroke(),t.strokeStyle="rgba(0, 0, 0, 0.3)",t.lineWidth=1,t.strokeRect(r+.5,o+.5,i-1,i-1)}generateFurnaceTopTexture(t,e,n){const{tileSize:i}=this.config,r=e*i,o=n*i;t.fillStyle="#808080",t.fillRect(r,o,i,i);for(let a=0;a<i;a++)for(let l=0;l<i;l++){const c=(Math.random()-.5)*25,h=Math.max(0,Math.min(255,128+c));t.fillStyle=`rgb(${h}, ${h}, ${h})`,t.fillRect(r+a,o+l,1,1)}t.fillStyle="#4a4a4a",t.fillRect(r+5,o+5,2,2),t.fillRect(r+9,o+5,2,2),t.fillRect(r+5,o+9,2,2),t.fillRect(r+9,o+9,2,2),t.strokeStyle="rgba(0, 0, 0, 0.3)",t.lineWidth=1,t.strokeRect(r+.5,o+.5,i-1,i-1)}generateFurnaceFrontTexture(t,e,n){const{tileSize:i}=this.config,r=e*i,o=n*i;t.fillStyle="#808080",t.fillRect(r,o,i,i);for(let a=0;a<i;a++)for(let l=0;l<i;l++){const c=(Math.random()-.5)*25,h=Math.max(0,Math.min(255,128+c));t.fillStyle=`rgb(${h}, ${h}, ${h})`,t.fillRect(r+a,o+l,1,1)}t.fillStyle="#2a2a2a",t.fillRect(r+4,o+6,8,7),t.strokeStyle="#4a4a4a",t.lineWidth=1,t.strokeRect(r+3.5,o+5.5,9,8),t.strokeStyle="#1a1a1a",t.beginPath(),t.moveTo(r+4,o+9),t.lineTo(r+12,o+9),t.moveTo(r+4,o+11),t.lineTo(r+12,o+11),t.stroke(),t.strokeStyle="rgba(0, 0, 0, 0.3)",t.lineWidth=1,t.strokeRect(r+.5,o+.5,i-1,i-1)}generateFurnaceSideTexture(t,e,n){const{tileSize:i}=this.config,r=e*i,o=n*i;t.fillStyle="#808080",t.fillRect(r,o,i,i);for(let a=0;a<i;a++)for(let l=0;l<i;l++){const c=(Math.random()-.5)*25,h=Math.max(0,Math.min(255,128+c));t.fillStyle=`rgb(${h}, ${h}, ${h})`,t.fillRect(r+a,o+l,1,1)}t.strokeStyle="rgba(60, 60, 60, 0.4)",t.lineWidth=1,t.beginPath(),t.moveTo(r,o+8),t.lineTo(r+i,o+8),t.stroke(),t.beginPath(),t.moveTo(r+8,o),t.lineTo(r+8,o+8),t.moveTo(r+4,o+8),t.lineTo(r+4,o+i),t.moveTo(r+12,o+8),t.lineTo(r+12,o+i),t.stroke(),t.strokeStyle="rgba(0, 0, 0, 0.3)",t.lineWidth=1,t.strokeRect(r+.5,o+.5,i-1,i-1)}generateFurnaceFrontLitTexture(t,e,n){const{tileSize:i}=this.config,r=e*i,o=n*i;t.fillStyle="#808080",t.fillRect(r,o,i,i);for(let a=0;a<i;a++)for(let l=0;l<i;l++){const c=(Math.random()-.5)*25,h=Math.max(0,Math.min(255,128+c));t.fillStyle=`rgb(${h}, ${h}, ${h})`,t.fillRect(r+a,o+l,1,1)}t.fillStyle="rgba(255, 100, 0, 0.3)",t.fillRect(r+2,o+4,12,10),t.fillStyle="#ff6600",t.fillRect(r+4,o+6,8,7),t.fillStyle="#ff9933",t.fillRect(r+5,o+7,6,5),t.fillStyle="#ffcc00",t.fillRect(r+6,o+8,4,3),t.strokeStyle="#4a4a4a",t.lineWidth=1,t.strokeRect(r+3.5,o+5.5,9,8),t.strokeStyle="rgba(0, 0, 0, 0.3)",t.beginPath(),t.moveTo(r+4,o+9),t.lineTo(r+12,o+9),t.moveTo(r+4,o+11),t.lineTo(r+12,o+11),t.stroke(),t.strokeStyle="rgba(0, 0, 0, 0.3)",t.lineWidth=1,t.strokeRect(r+.5,o+.5,i-1,i-1)}getTexture(){return this.texture}getLoadState(){return this.loadState}getUVs(t){return this.getUVsForFace(t,"side")}getUVsForFace(t,e){if(t===m.AIR)return[0,0,0,0];const n=Cn(t,e);return this.getUVsForIndex(n)}getUVsForIndex(t){const{columns:e,rows:n}=this.config,i=t/e,r=(t+1)/e,o=(n-1)/n;return[i,o,r,1]}getTextureCount(){return this.config.columns}getConfig(){return{...this.config}}getCanvas(){return this.canvas}dispose(){this.texture.dispose()}}let ns=null;function Hn(){return ns||(ns=new Ny),ns}const ky={top:{vertices:[[0,1,1],[1,1,1],[1,1,0],[0,1,0]],normal:[0,1,0]},bottom:{vertices:[[0,0,0],[1,0,0],[1,0,1],[0,0,1]],normal:[0,-1,0]},front:{vertices:[[0,0,1],[1,0,1],[1,1,1],[0,1,1]],normal:[0,0,1]},back:{vertices:[[1,0,0],[0,0,0],[0,1,0],[1,1,0]],normal:[0,0,-1]},left:{vertices:[[0,0,0],[0,0,1],[0,1,1],[0,1,0]],normal:[-1,0,0]},right:{vertices:[[1,0,1],[1,0,0],[1,1,0],[1,1,1]],normal:[1,0,0]}},Pc=[[0,0],[1,0],[1,1],[0,1]],Lc=[0,1,2,0,2,3];class Uy{chunk;opaqueMesh=null;transparentMesh=null;waterMesh=null;scene;textureAtlas;worldBlockGetter=null;constructor(t,e,n){this.chunk=t,this.scene=e,this.textureAtlas=Hn(),this.worldBlockGetter=n??null}build(){if(this.dispose(),this.chunk.isEmpty()){this.chunk.isDirty=!1;return}const t=this.buildGeometryData("opaque"),e=this.buildGeometryData("transparent"),n=this.buildGeometryData("water");t.positions.length>0&&(this.opaqueMesh=this.createMesh(t,"opaque"),this.scene.add(this.opaqueMesh)),e.positions.length>0&&(this.transparentMesh=this.createMesh(e,"transparent"),this.scene.add(this.transparentMesh)),n.positions.length>0&&(this.waterMesh=this.createMesh(n,"water"),this.scene.add(this.waterMesh)),this.chunk.mesh=this.opaqueMesh,this.chunk.isDirty=!1}buildGeometryData(t){const e=[],n=[],i=[],r=[],o=[],a=this.chunk.getWorldPosition();let l=0;return this.chunk.forEachSolidBlock((c,h,u,d)=>{const f=d===m.WATER,y=ti(d);if(t==="water"){if(!f)return}else if(t==="transparent"){if(!y||f)return}else if(y)return;const _=a.x+c,g=a.y+h,p=a.z+u;if(J0(d)){l=this.addCrossPlant(e,n,i,r,o,_,g,p,d,l);return}const x=["top","bottom","front","back","left","right"];for(const b of x){if(!this.isFaceExposed(c,h,u,_,g,p,d,b))continue;const S=ky[b],[L,C,w,P]=this.textureAtlas.getUVsForFace(d,b),T=He[d]??16777215,E=(T>>16&255)/255,D=(T>>8&255)/255,H=(T&255)/255;for(let B=0;B<4;B++){const K=S.vertices[B];if(!K||K.length<3)continue;const Z=K[0]??0,q=K[1]??0,Q=K[2]??0;e.push(_+Z,g+q,p+Q),n.push(...S.normal);const W=Pc[B];if(!W||W.length<2)continue;const rt=W[0]??0,ht=W[1]??0,yt=L+(w-L)*rt,kt=C+(P-C)*ht;i.push(yt,kt),r.push(E,D,H)}for(const B of Lc)o.push(l+B);l+=4}}),{positions:e,normals:n,uvs:i,colors:r,indices:o}}addCrossPlant(t,e,n,i,r,o,a,l,c,h){const[u,d,f,y]=this.textureAtlas.getUVsForFace(c,"front"),_=He[c]??16777215,g=(_>>16&255)/255,p=(_>>8&255)/255,x=(_&255)/255,b=[[[0,0,0],[1,0,1],[1,1,1],[0,1,0]],[[1,0,1],[0,0,0],[0,1,0],[1,1,1]],[[1,0,0],[0,0,1],[0,1,1],[1,1,0]],[[0,0,1],[1,0,0],[1,1,0],[0,1,1]]];for(const S of b){for(let L=0;L<4;L++){const C=S[L];if(!C||C.length<3)continue;t.push(o+(C[0]??0),a+(C[1]??0),l+(C[2]??0)),e.push(0,1,0);const w=Pc[L];if(!w||w.length<2)continue;const P=u+(f-u)*(w[0]??0),T=d+(y-d)*(w[1]??0);n.push(P,T),i.push(g,p,x)}for(const L of Lc)r.push(h+L);h+=4}return h}isFaceExposed(t,e,n,i,r,o,a,l){let c=i,h=r,u=o;switch(l){case"top":h++;break;case"bottom":h--;break;case"left":c--;break;case"right":c++;break;case"front":u++;break;case"back":u--;break}let d,f=t,y=e,_=n;switch(l){case"top":y++;break;case"bottom":y--;break;case"left":f--;break;case"right":f++;break;case"front":_++;break;case"back":_--;break}if(this.chunk.isValidLocal(f,y,_))d=this.chunk.getBlock(f,y,_);else if(this.worldBlockGetter){const x=this.worldBlockGetter(c,h,u);if(x===null)return!ti(a);d=x}else return!ti(a);if(d===m.AIR)return!0;const g=ti(a),p=ti(d);return g?Oa(a)&&Oa(d)?!1:d!==a:p}createMesh(t,e){const n=new Ke;n.setAttribute("position",new Re(t.positions,3)),n.setAttribute("normal",new Re(t.normals,3)),n.setAttribute("uv",new Re(t.uvs,2)),n.setAttribute("color",new Re(t.colors,3)),n.setIndex(t.indices);let i;e==="opaque"?i=new It({map:this.textureAtlas.getTexture(),vertexColors:!1,transparent:!1,side:gn}):e==="water"?i=new It({map:this.textureAtlas.getTexture(),vertexColors:!1,transparent:!0,opacity:.7,side:Ve,depthWrite:!0,polygonOffset:!0,polygonOffsetFactor:1,polygonOffsetUnits:1}):i=new It({map:this.textureAtlas.getTexture(),vertexColors:!1,transparent:!0,opacity:.9,side:Ve,alphaTest:.5,depthWrite:!0});const r=new V(n,i);return r.frustumCulled=!1,e==="opaque"?r.renderOrder=0:e==="transparent"?r.renderOrder=1:r.renderOrder=2,r}update(){this.chunk.isDirty&&this.build()}getMesh(){return this.opaqueMesh}getTransparentMesh(){return this.transparentMesh}getWaterMesh(){return this.waterMesh}setVisible(t){this.opaqueMesh&&(this.opaqueMesh.visible=t),this.transparentMesh&&(this.transparentMesh.visible=t),this.waterMesh&&(this.waterMesh.visible=t)}isVisible(){return this.opaqueMesh?.visible??!1}dispose(){this.opaqueMesh&&(this.scene.remove(this.opaqueMesh),this.opaqueMesh.geometry.dispose(),this.opaqueMesh.material instanceof Oe&&this.opaqueMesh.material.dispose(),this.opaqueMesh=null),this.transparentMesh&&(this.scene.remove(this.transparentMesh),this.transparentMesh.geometry.dispose(),this.transparentMesh.material instanceof Oe&&this.transparentMesh.material.dispose(),this.transparentMesh=null),this.waterMesh&&(this.scene.remove(this.waterMesh),this.waterMesh.geometry.dispose(),this.waterMesh.material instanceof Oe&&this.waterMesh.material.dispose(),this.waterMesh=null),this.chunk.mesh=null}}function Fy(){ns&&(ns.dispose(),ns=null)}class By{scene;chunkMeshes=new Map;frustum=new qr;projScreenMatrix=new le;worldBlockGetter=null;visibleChunkCount=0;totalChunkCount=0;constructor(t){this.scene=t}setWorldBlockGetter(t){this.worldBlockGetter=t}addChunk(t){const e=_e(t.coord.x,t.coord.y,t.coord.z);if(this.chunkMeshes.has(e)){this.chunkMeshes.get(e).update();return}const n=new Uy(t,this.scene,this.worldBlockGetter??void 0);n.build(),this.chunkMeshes.set(e,n),this.totalChunkCount++}removeChunk(t){const e=_e(t.coord.x,t.coord.y,t.coord.z),n=this.chunkMeshes.get(e);n&&(n.dispose(),this.chunkMeshes.delete(e),this.totalChunkCount--)}updateChunkMesh(t){const e=_e(t.coord.x,t.coord.y,t.coord.z),n=this.chunkMeshes.get(e);n&&n.update()}update(t){this.projScreenMatrix.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),this.frustum.setFromProjectionMatrix(this.projScreenMatrix),this.visibleChunkCount=0;for(const[e,n]of this.chunkMeshes){if(!n.getMesh())continue;const[r,o,a]=e.split(",").map(Number),l=new oi(new I(r*16,o*16,a*16),new I((r+1)*16,(o+1)*16,(a+1)*16)),c=this.frustum.intersectsBox(l);n.setVisible(c),c&&this.visibleChunkCount++}}getVisibleChunkCount(){return this.visibleChunkCount}getTotalChunkCount(){return this.totalChunkCount}getVisibleChunks(){const t=[];for(const e of this.chunkMeshes.values())e.isVisible()&&t.push(e);return t}hasChunk(t,e,n){return this.chunkMeshes.has(_e(t,e,n))}rebuildAll(){for(const t of this.chunkMeshes.values())t.build()}clear(){for(const t of this.chunkMeshes.values())t.dispose();this.chunkMeshes.clear(),this.totalChunkCount=0,this.visibleChunkCount=0}dispose(){for(const t of this.chunkMeshes.values())t.dispose();this.chunkMeshes.clear(),this.totalChunkCount=0,this.visibleChunkCount=0,Fy()}}class zy{heap=[];get size(){return this.heap.length}get isEmpty(){return this.heap.length===0}enqueue(t,e){this.heap.push({item:t,priority:e}),this.bubbleUp(this.heap.length-1)}dequeue(){if(this.heap.length===0)return;if(this.heap.length===1)return this.heap.pop().item;const t=this.heap[0].item;return this.heap[0]=this.heap.pop(),this.bubbleDown(0),t}peek(){return this.heap[0]?.item}clear(){this.heap=[]}contains(t){return this.heap.some(e=>t(e.item))}remove(t){const e=this.heap.findIndex(n=>t(n.item));return e===-1?!1:(e===this.heap.length-1?this.heap.pop():(this.heap[e]=this.heap.pop(),this.bubbleDown(e),this.bubbleUp(e)),!0)}toArray(){return this.heap.map(t=>t.item)}bubbleUp(t){for(;t>0;){const e=Math.floor((t-1)/2);if(this.heap[e].priority<=this.heap[t].priority)break;this.swap(t,e),t=e}}bubbleDown(t){const e=this.heap.length;for(;;){const n=2*t+1,i=2*t+2;let r=t;if(n<e&&this.heap[n].priority<this.heap[r].priority&&(r=n),i<e&&this.heap[i].priority<this.heap[r].priority&&(r=i),r===t)break;this.swap(t,r),t=r}}swap(t,e){const n=this.heap[t];this.heap[t]=this.heap[e],this.heap[e]=n}}class Gy{config;world;chunkRenderer;loadedChunks=new Set;loadQueue=new zy;lastPlayerChunkX=1/0;lastPlayerChunkZ=1/0;onChunkLoaded=null;onChunkUnloaded=null;constructor(t,e,n={}){this.world=t,this.chunkRenderer=e,this.config={...ny,...n}}update(t,e,n){const i=Gr(t,e,n);(i.x!==this.lastPlayerChunkX||i.z!==this.lastPlayerChunkZ)&&(this.lastPlayerChunkX=i.x,this.lastPlayerChunkZ=i.z,this.updateChunkQueues(i.x,i.z)),this.processLoadQueue(t,n)}updateChunkQueues(t,e){const{loadRadius:n,unloadRadius:i}=this.config;this.loadQueue.clear();for(let o=-n;o<=n;o++)for(let a=-n;a<=n;a++){const l=o*o+a*a;if(l>n*n)continue;const c=t+o,h=e+a;for(let u=0;u<Br;u++){const d=_e(c,u,h);this.loadedChunks.has(d)||this.loadQueue.enqueue({x:c,y:u,z:h},l)}}const r=[];for(const o of this.loadedChunks){const[a,,l]=o.split(",").map(Number),c=a-t,h=l-e;c*c+h*h>i*i&&r.push(o)}for(const o of r){const[a,l,c]=o.split(",").map(Number);this.unloadChunk(a,l,c)}}processLoadQueue(t,e){let n=0;for(;!this.loadQueue.isEmpty&&n<this.config.maxLoadsPerFrame;){const i=this.loadQueue.dequeue();if(!i)break;const r=_e(i.x,i.y,i.z);this.loadedChunks.has(r)||(this.loadChunk(i.x,i.y,i.z),n++)}}loadChunk(t,e,n){const i=_e(t,e,n);if(this.loadedChunks.has(i))return;const r=this.world.loadChunk(t,e,n);this.chunkRenderer.addChunk(r),this.loadedChunks.add(i),this.onChunkLoaded&&this.onChunkLoaded(t,e,n)}unloadChunk(t,e,n){const i=_e(t,e,n);if(!this.loadedChunks.has(i))return;this.onChunkUnloaded&&this.onChunkUnloaded(t,e,n);const r=this.world.getChunk(t,e,n);r&&this.chunkRenderer.removeChunk(r),this.world.unloadChunk(t,e,n),this.loadedChunks.delete(i)}getLoadedCount(){return this.loadedChunks.size}getLoadedChunkCoords(){return Array.from(this.loadedChunks).map(t=>{const[e,n,i]=t.split(",").map(Number);return{x:e,y:n,z:i}})}forceLoadChunk(t,e,n){return this.loadChunk(t,e,n),this.world.getChunk(t,e,n)}forceUnloadChunk(t,e,n){this.unloadChunk(t,e,n)}isChunkLoaded(t,e,n){return this.loadedChunks.has(_e(t,e,n))}reset(){this.chunkRenderer.clear(),this.loadedChunks.clear(),this.loadQueue.clear(),this.lastPlayerChunkX=1/0,this.lastPlayerChunkZ=1/0}forceLoadRadius(t,e,n,i=2){const r=Gr(t,e,n);for(let o=-i;o<=i;o++)for(let a=-i;a<=i;a++){if(o*o+a*a>i*i)continue;const c=r.x+o,h=r.z+a;for(let u=0;u<Br;u++){const d=_e(c,u,h);this.loadedChunks.has(d)||this.loadChunk(c,u,h)}}this.lastPlayerChunkX=r.x,this.lastPlayerChunkZ=r.z}}class Hy{scene;isActive=!1;underwaterColor;normalColor;underwaterFog;constructor(t){this.scene=t,this.underwaterColor=new Dt(Cc),this.normalColor=new Dt(oy),this.underwaterFog=new ja(Cc,ry)}update(t){t&&!this.isActive?this.enable():!t&&this.isActive&&this.disable()}enable(){this.isActive||(this.scene.fog=this.underwaterFog,this.scene.background=this.underwaterColor,this.isActive=!0)}disable(){this.isActive&&(this.scene.fog=null,this.scene.background=this.normalColor,this.isActive=!1)}getIsActive(){return this.isActive}dispose(){this.disable()}}var ke=(s=>(s[s.CLEAR=0]="CLEAR",s[s.RAIN=1]="RAIN",s))(ke||{}),Se=(s=>(s[s.SUNRISE=0]="SUNRISE",s[s.DAY=1]="DAY",s[s.SUNSET=2]="SUNSET",s[s.NIGHT=3]="NIGHT",s))(Se||{});const we={TICKS_PER_DAY:24e3,TICKS_PER_SECOND:24e3/1200,SUNRISE_END:2e3,DAY_END:1e4,SUNSET_START:1e4,SUNSET_END:12e3},vn={RAIN_DURATION_MIN:120,RAIN_DURATION_MAX:300,CLEAR_DURATION_MIN:300,CLEAR_DURATION_MAX:600,RAIN_CHANCE:.3,TRANSITION_DURATION:5,RAIN_PARTICLE_COUNT:8e3,RAIN_AMBIENT_DIM:.3},Mr={0:{top:1981554,horizon:16744031,ambient:.5},1:{top:8900331,horizon:11393254,ambient:1},2:{top:1710650,horizon:13918763,ambient:.5},3:{top:657946,horizon:989738,ambient:.2}},xr={0:{core:16747520,glow:16737095},1:{core:16775920,glow:16775388},2:{core:16739125,glow:16729344},3:{core:15658734,glow:13421772}};function ou(s){const t=s%we.TICKS_PER_DAY;return t<we.SUNRISE_END?0:t<we.DAY_END?1:t<we.SUNSET_END?2:3}function Wy(s){const t=ou(s);return t===1||t===0}function Vy(s){switch(s){case 0:return"晴天";case 1:return"下雨";default:return"Unknown"}}class Xy{ticks=0;dayCount=0;timeScale=1;isPaused=!1;constructor(t=6e3){this.ticks=t%we.TICKS_PER_DAY}update(t){if(this.isPaused)return;const e=t*we.TICKS_PER_SECOND*this.timeScale;for(this.ticks+=e;this.ticks>=we.TICKS_PER_DAY;)this.ticks-=we.TICKS_PER_DAY,this.dayCount++}getTicks(){return this.ticks}getDayCount(){return this.dayCount}getTimePeriod(){return ou(this.ticks)}isDay(){return Wy(this.ticks)}getSunAngle(){return this.ticks/we.TICKS_PER_DAY*Math.PI*2}getMoonAngle(){return this.getSunAngle()+Math.PI}getNormalizedTime(){return this.ticks/we.TICKS_PER_DAY}getAmbientIntensity(){const t=this.getTimePeriod(),e=this.ticks%we.TICKS_PER_DAY;switch(t){case Se.DAY:return 1;case Se.NIGHT:return .2;case Se.SUNRISE:return .2+e/we.SUNRISE_END*.8;case Se.SUNSET:return 1-(e-we.SUNSET_START)/(we.SUNSET_END-we.SUNSET_START)*.8;default:return 1}}setTime(t){this.ticks=t%we.TICKS_PER_DAY}setTimeScale(t){this.timeScale=Math.max(0,t)}getTimeScale(){return this.timeScale}pause(){this.isPaused=!0}resume(){this.isPaused=!1}togglePause(){this.isPaused=!this.isPaused}getIsPaused(){return this.isPaused}getFormattedTime(){const t=we.TICKS_PER_DAY/24,n=(this.ticks/t+6)%24,i=Math.floor(n),r=Math.floor((n-i)*60);return`${i.toString().padStart(2,"0")}:${r.toString().padStart(2,"0")}`}}class il{id;position;rotation;chunkX;chunkZ;isActive=!0;constructor(t,e,n,i){this.id=t,this.position=new I(e,n,i),this.rotation=0,this.chunkX=Math.floor(e/16),this.chunkZ=Math.floor(i/16)}updateChunkCoordinates(){this.chunkX=Math.floor(this.position.x/16),this.chunkZ=Math.floor(this.position.z/16)}distanceTo(t){return this.position.distanceTo(t)}horizontalDistanceTo(t){const e=this.position.x-t.x,n=this.position.z-t.z;return Math.sqrt(e*e+n*n)}}let Ky=0;function sl(){return`entity_${Date.now()}_${Ky++}`}var Kt=(s=>(s[s.COW=0]="COW",s[s.SHEEP=1]="SHEEP",s[s.PIG=2]="PIG",s[s.CHICKEN=3]="CHICKEN",s[s.RABBIT=4]="RABBIT",s[s.WOLF=5]="WOLF",s[s.FOX=6]="FOX",s))(Kt||{}),Te=(s=>(s[s.IDLE=0]="IDLE",s[s.WANDERING=1]="WANDERING",s[s.FLEEING=2]="FLEEING",s))(Te||{});const Yy={0:{type:0,name:"牛",nameEn:"Cow",moveSpeed:1.5,fleeSpeed:3,idleTimeMin:2,idleTimeMax:5,wanderTimeMin:3,wanderTimeMax:8,fleeDistance:5,safeDistance:10,maxHealth:10,dropsFood:!0},1:{type:1,name:"羊",nameEn:"Sheep",moveSpeed:1.5,fleeSpeed:3.5,idleTimeMin:2,idleTimeMax:5,wanderTimeMin:3,wanderTimeMax:8,fleeDistance:5,safeDistance:10,maxHealth:10,dropsFood:!0},2:{type:2,name:"猪",nameEn:"Pig",moveSpeed:1.5,fleeSpeed:3,idleTimeMin:2,idleTimeMax:5,wanderTimeMin:3,wanderTimeMax:8,fleeDistance:5,safeDistance:10,maxHealth:10,dropsFood:!0},3:{type:3,name:"鸡",nameEn:"Chicken",moveSpeed:2,fleeSpeed:4,idleTimeMin:1,idleTimeMax:4,wanderTimeMin:2,wanderTimeMax:6,fleeDistance:4,safeDistance:8,maxHealth:4,dropsFood:!0},4:{type:4,name:"兔子",nameEn:"Rabbit",moveSpeed:3,fleeSpeed:6,idleTimeMin:1,idleTimeMax:3,wanderTimeMin:2,wanderTimeMax:5,fleeDistance:5,safeDistance:10,maxHealth:4,dropsFood:!0},5:{type:5,name:"狼",nameEn:"Wolf",moveSpeed:2.5,fleeSpeed:5,idleTimeMin:2,idleTimeMax:5,wanderTimeMin:3,wanderTimeMax:7,fleeDistance:4,safeDistance:8,maxHealth:10,dropsFood:!1},6:{type:6,name:"狐狸",nameEn:"Fox",moveSpeed:2.8,fleeSpeed:5.5,idleTimeMin:1,idleTimeMax:4,wanderTimeMin:2,wanderTimeMax:6,fleeDistance:5,safeDistance:10,maxHealth:10,dropsFood:!1}};function qy(s){return Yy[s]}function $y(s,t,e,n,i,r){const o=n.distanceTo(i);if(s!==Te.FLEEING&&o<r.fleeDistance){const a=new I().subVectors(n,i).normalize(),l=new I().copy(n).add(a.multiplyScalar(r.safeDistance+5));return{newState:Te.FLEEING,targetPosition:l}}switch(s){case Te.IDLE:return Zy(t,e,n);case Te.WANDERING:return jy(t,e);case Te.FLEEING:return Jy(t,e,o,r);default:return{newState:null,targetPosition:null}}}function Zy(s,t,e,n){if(s-t<=0){const r=Qy(e);return{newState:Te.WANDERING,targetPosition:r}}return{newState:null,targetPosition:null}}function jy(s,t,e,n){return s-t<=0?{newState:Te.IDLE,targetPosition:null}:{newState:null,targetPosition:null}}function Jy(s,t,e,n){const i=s-t;return e>n.safeDistance||i<=0?{newState:Te.IDLE,targetPosition:null}:{newState:null,targetPosition:null}}function Qy(s){const t=Math.random()*Math.PI*2,e=3+Math.random()*5;return new I(s.x+Math.cos(t)*e,s.y,s.z+Math.sin(t)*e)}function Oc(s,t){switch(s){case Te.IDLE:return t.idleTimeMin+Math.random()*(t.idleTimeMax-t.idleTimeMin);case Te.WANDERING:return t.wanderTimeMin+Math.random()*(t.wanderTimeMax-t.wanderTimeMin);case Te.FLEEING:return 5;default:return 3}}function t_(s,t){switch(s){case Te.WANDERING:return t.moveSpeed;case Te.FLEEING:return t.fleeSpeed;default:return 0}}function cs(s,t,e,n,i,r){const o=n/2,a=i/2,l=r/2;return{minX:s-o,maxX:s+o,minY:t-a,maxY:t+a,minZ:e-l,maxZ:e+l}}function hs(s,t,e){return{minX:s,maxX:s+1,minY:t,maxY:t+1,minZ:e,maxZ:e+1}}function us(s,t){return s.minX<t.maxX&&s.maxX>t.minX&&s.minY<t.maxY&&s.maxY>t.minY&&s.minZ<t.maxZ&&s.maxZ>t.minZ}const au=32,e_=9,lu=78,Pr=.01,Hr=0,n_=4,cu=8,i_=8,s_={gravity:au,jumpVelocity:e_,terminalVelocity:lu,groundCheckOffset:Pr,waterGravity:n_,waterTerminalVelocity:cu,waterBuoyancy:i_};function Ua(s,t){const e=s.width/2,n=s.height/2,i=s.position.y-n-Pr,r=Math.floor(s.position.x-e),o=Math.floor(s.position.x+e),a=Math.floor(s.position.z-e),l=Math.floor(s.position.z+e),c=Math.floor(i);for(let h=r;h<=o;h++)for(let u=a;u<=l;u++){const d=t.getBlock(h,c,u);if(ln(d)){const f=c+1,y=s.position.y-n;if(Math.abs(y-f)<=Pr*2)return!0}}return s.position.y-n<=Hr+Pr}function hu(s,t,e){if(e===0)return{collided:!1,newPosition:s.position.y,newVelocity:s.velocity.y};const n=s.width/2,i=s.height/2;let r=s.position.y+e,o=!1,a=s.velocity.y;const l=Math.floor(s.position.x-n),c=Math.floor(s.position.x+n),h=Math.floor(s.position.z-n),u=Math.floor(s.position.z+n);if(e<0){const d=r-i,f=Math.floor(d),y=Math.floor(s.position.y-i);for(let _=y;_>=f&&!o;_--)for(let g=l;g<=c&&!o;g++)for(let p=h;p<=u&&!o;p++)if(ln(t.getBlock(g,_,p))){const x=cs(s.position.x,r,s.position.z,s.width,s.height,s.width),b=hs(g,_,p);us(x,b)&&(r=_+1+i,a=0,o=!0)}r-i<Hr&&(r=Hr+i,a=0,o=!0)}else{const d=r+i,f=Math.floor(s.position.y+i),y=Math.floor(d);for(let _=f;_<=y&&!o;_++)for(let g=l;g<=c&&!o;g++)for(let p=h;p<=u&&!o;p++)if(ln(t.getBlock(g,_,p))){const x=cs(s.position.x,r,s.position.z,s.width,s.height,s.width),b=hs(g,_,p);us(x,b)&&(r=_-i,a=0,o=!0)}}return{collided:o,newPosition:r,newVelocity:a}}function uu(s,t,e){if(e===0)return{collided:!1,newPosition:s.position.x,newVelocity:s.velocity.x};const n=s.width/2,i=s.height/2;let r=s.position.x+e,o=!1,a=s.velocity.x;const l=Math.floor(s.position.y-i),c=Math.floor(s.position.y+i),h=Math.floor(s.position.z-n),u=Math.floor(s.position.z+n);if(e<0){const d=r-n,f=Math.floor(d),y=Math.floor(s.position.x-n);for(let _=y;_>=f&&!o;_--)for(let g=l;g<=c&&!o;g++)for(let p=h;p<=u&&!o;p++)if(ln(t.getBlock(_,g,p))){const x=cs(r,s.position.y,s.position.z,s.width,s.height,s.width),b=hs(_,g,p);us(x,b)&&(r=_+1+n,a=0,o=!0)}}else{const d=r+n,f=Math.floor(s.position.x+n),y=Math.floor(d);for(let _=f;_<=y&&!o;_++)for(let g=l;g<=c&&!o;g++)for(let p=h;p<=u&&!o;p++)if(ln(t.getBlock(_,g,p))){const x=cs(r,s.position.y,s.position.z,s.width,s.height,s.width),b=hs(_,g,p);us(x,b)&&(r=_-n,a=0,o=!0)}}return{collided:o,newPosition:r,newVelocity:a}}function du(s,t,e){if(e===0)return{collided:!1,newPosition:s.position.z,newVelocity:s.velocity.z};const n=s.width/2,i=s.height/2;let r=s.position.z+e,o=!1,a=s.velocity.z;const l=Math.floor(s.position.y-i),c=Math.floor(s.position.y+i),h=Math.floor(s.position.x-n),u=Math.floor(s.position.x+n);if(e<0){const d=r-n,f=Math.floor(d),y=Math.floor(s.position.z-n);for(let _=y;_>=f&&!o;_--)for(let g=l;g<=c&&!o;g++)for(let p=h;p<=u&&!o;p++)if(ln(t.getBlock(p,g,_))){const x=cs(s.position.x,s.position.y,r,s.width,s.height,s.width),b=hs(p,g,_);us(x,b)&&(r=_+1+n,a=0,o=!0)}}else{const d=r+n,f=Math.floor(s.position.z+n),y=Math.floor(d);for(let _=f;_<=y&&!o;_++)for(let g=l;g<=c&&!o;g++)for(let p=h;p<=u&&!o;p++)if(ln(t.getBlock(p,g,_))){const x=cs(s.position.x,s.position.y,r,s.width,s.height,s.width),b=hs(p,g,_);us(x,b)&&(r=_-n,a=0,o=!0)}}return{collided:o,newPosition:r,newVelocity:a}}function fu(s,t){const e=s.width/2,n=s.height/2,i=Math.floor(s.position.x-e),r=Math.floor(s.position.x+e),o=Math.floor(s.position.z-e),a=Math.floor(s.position.z+e),l=Math.floor(s.position.y-n),c=Math.floor(s.position.y);for(let h=l;h<=c;h++)for(let u=i;u<=r;u++)for(let d=o;d<=a;d++)if(t.getBlock(u,h,d)===m.WATER)return!0;return!1}function r_(s,t){const e=s.height/2,n=Math.floor(s.position.y+e*.8),i=Math.floor(s.position.x),r=Math.floor(s.position.z);return t.getBlock(i,n,r)===m.WATER}const Nc=4;function pu(s,t,e=au){s.isGrounded||(s.velocity.y-=e*t,a_(s))}function o_(s,t,e,n,i=cu,r=!1,o=!1){if(r)s.velocity.y=Nc;else if(o)s.velocity.y=-Nc;else{const a=e-n*.3;s.velocity.y-=a*t,s.velocity.y*=1-.5*t}s.velocity.y<-i&&(s.velocity.y=-i),s.velocity.y>i&&(s.velocity.y=i)}function a_(s,t=lu){s.velocity.y<-t&&(s.velocity.y=-t)}function l_(s){s.velocity.y<0&&(s.velocity.y=0)}const kc={masterVolume:.7,musicVolume:.5,sfxVolume:.8,muted:!1},As=[{name:"ambient",path:"audio/music/ambient.mp3",type:"music",preload:!0},{name:"footstep_grass",path:"audio/footsteps/grass.mp3",type:"sfx",preload:!0},{name:"footstep_stone",path:"audio/footsteps/stone.mp3",type:"sfx",preload:!0},{name:"footstep_sand",path:"audio/footsteps/sand.mp3",type:"sfx",preload:!0},{name:"footstep_wood",path:"audio/footsteps/wood.mp3",type:"sfx",preload:!0},{name:"fall_light",path:"audio/effects/fall_light.mp3",type:"sfx",preload:!0},{name:"fall_heavy",path:"audio/effects/fall_heavy.mp3",type:"sfx",preload:!0},{name:"cow",path:"audio/animals/cow.mp3",type:"sfx",preload:!1},{name:"pig",path:"audio/animals/pig.mp3",type:"sfx",preload:!1},{name:"sheep",path:"audio/animals/sheep.mp3",type:"sfx",preload:!1},{name:"chicken",path:"audio/animals/chicken.mp3",type:"sfx",preload:!1},{name:"wolf",path:"audio/animals/wolf.mp3",type:"sfx",preload:!1},{name:"fox",path:"audio/animals/fox.mp3",type:"sfx",preload:!1}],c_={stone:{baseFrequency:300,frequencyRange:100,decayRate:50,noiseMix:.3,duration:.12},wood:{baseFrequency:200,frequencyRange:50,decayRate:30,noiseMix:.2,duration:.15},dirt:{baseFrequency:100,frequencyRange:50,decayRate:20,noiseMix:.5,duration:.18},sand:{baseFrequency:150,frequencyRange:50,decayRate:25,noiseMix:.6,duration:.15},glass:{baseFrequency:1e3,frequencyRange:200,decayRate:60,noiseMix:.1,duration:.1},plant:{baseFrequency:400,frequencyRange:100,decayRate:35,noiseMix:.4,duration:.12}};function h_(s){switch(s){case m.STONE:case m.COBBLESTONE:case m.BRICK:case m.SANDSTONE:case m.SANDSTONE_CARVED:case m.DARK_STONE:case m.MOSSY_STONE:case m.RED_BRICK:case m.GOLD_BLOCK:return"stone";case m.WOOD:case m.LOG:case m.PLANKS:case m.OAK_LOG:case m.BIRCH_LOG:case m.SPRUCE_LOG:return"wood";case m.GRASS:case m.DIRT:return"dirt";case m.SAND:case m.SNOW:return"sand";case m.GLASS:return"glass";case m.LEAVES:case m.OAK_LEAVES:case m.BIRCH_LEAVES:case m.SPRUCE_LEAVES:case m.FLOWER_RED:case m.FLOWER_YELLOW:case m.TALL_GRASS:case m.MUSHROOM_RED:case m.MUSHROOM_BROWN:case m.DEAD_BUSH:case m.CACTUS:case m.ROSE:case m.TULIP:case m.DAISY:case m.CORNFLOWER:return"plant";case m.WATER:case m.TORCH:case m.AIR:default:return"dirt"}}const mu="webcraft_audio_settings";function u_(){try{const s=localStorage.getItem(mu);if(s){const t=JSON.parse(s);return{...kc,...t}}}catch(s){console.warn("[AudioSettings] Failed to load settings:",s)}return{...kc}}function Xi(s){try{localStorage.setItem(mu,JSON.stringify(s))}catch(t){console.warn("[AudioSettings] Failed to save settings:",t)}}class Jn{source;gainNode;pannerNode;_isPlaying=!0;constructor(t,e,n=null){this.source=t,this.gainNode=e,this.pannerNode=n,this.source.onended=()=>{this._isPlaying=!1}}get isPlaying(){return this._isPlaying}stop(){if(this._isPlaying){try{this.source.stop()}catch{}this._isPlaying=!1}}setVolume(t){this.gainNode.gain.value=Math.max(0,Math.min(1,t))}setPosition(t,e,n){this.pannerNode&&(this.pannerNode.positionX.value=t,this.pannerNode.positionY.value=e,this.pannerNode.positionZ.value=n)}fadeOut(t,e){const n=e.currentTime;this.gainNode.gain.setValueAtTime(this.gainNode.gain.value,n),this.gainNode.gain.linearRampToValueAtTime(0,n+t),setTimeout(()=>{this.stop()},t*1e3)}}const d_=50;class f_{lastPlayTime=new Map;canPlay(t){const e=Date.now(),n=this.lastPlayTime.get(t)??0;return e-n>=d_}recordPlay(t){this.lastPlayTime.set(t,Date.now())}tryPlay(t){return this.canPlay(t)?(this.recordPlay(t),!0):!1}reset(){this.lastPlayTime.clear()}}function p_(s,t,e){const n=c_[t],i=s.sampleRate,r=e==="dig"?n.duration*.6:n.duration,o=Math.floor(i*r),a=s.createBuffer(1,o,i),l=a.getChannelData(0);let c=1;e==="place"?c=1.2:e==="dig"&&(c=.8);const h=n.baseFrequency*c,u=e==="dig"?.3:.5;for(let d=0;d<o;d++){const f=d/i;let y=0;const _=h+(Math.random()-.5)*n.frequencyRange*.1;y+=Math.sin(2*Math.PI*_*f)*(1-n.noiseMix),y+=Math.sin(2*Math.PI*_*2*f)*.3*(1-n.noiseMix),y+=Math.sin(2*Math.PI*_*.5*f)*.2*(1-n.noiseMix);const g=e==="dig"?n.noiseMix*1.5:n.noiseMix;y+=(Math.random()*2-1)*Math.min(g,1);const p=e==="dig"?n.decayRate*1.5:n.decayRate,x=Math.exp(-f*p),b=.005,S=f<b?f/b:1;l[d]=y*x*S*u}return a}function m_(s){const t=s.sampleRate,e=30,n=Math.floor(t*e),i=s.createBuffer(2,n,t),r=i.getChannelData(0),o=i.getChannelData(1),a=[[261.63,329.63,392],[293.66,349.23,440],[329.63,392,493.88],[349.23,440,523.25]],l=e/a.length;for(let c=0;c<n;c++){const h=c/t,u=Math.floor(h/l)%a.length,d=a[u];let f=0;for(const p of d)f+=Math.sin(2*Math.PI*p*h)*.1,f+=Math.sin(2*Math.PI*p*1.003*h)*.05;f+=Math.sin(2*Math.PI*65.41*h)*.15;const y=.5+.5*Math.sin(2*Math.PI*.1*h);f*=y*.3;const _=h%l/l;let g=1;_<.1&&(g=_/.1),_>.9&&(g=(1-_)/.1),f*=g,r[c]=f,o[c]=f*.95}return i}function g_(s,t){const e=s.sampleRate,i=Math.floor(e*.15),r=s.createBuffer(1,i,e),o=r.getChannelData(0);for(let a=0;a<i;a++){const l=a/e;let c=0;switch(t){case"grass":c=(Math.random()*2-1)*Math.exp(-l*30);break;case"stone":c=(Math.random()*2-1)*Math.exp(-l*50),c+=Math.sin(2*Math.PI*200*l)*Math.exp(-l*40)*.5;break;case"sand":c=(Math.random()*2-1)*Math.exp(-l*20)*.7;break;case"wood":c=Math.sin(2*Math.PI*150*l)*Math.exp(-l*25),c+=Math.sin(2*Math.PI*300*l)*Math.exp(-l*35)*.3;break}o[a]=c*.4}return r}function Uc(s,t){const e=s.sampleRate,i=Math.floor(e*(t?.5:.3)),r=s.createBuffer(1,i,e),o=r.getChannelData(0),a=t?80:120,l=t?8:15;for(let c=0;c<i;c++){const h=c/e;let u=0;u+=Math.sin(2*Math.PI*a*h)*Math.exp(-h*l),u+=(Math.random()*2-1)*Math.exp(-h*20)*.3,t&&(u+=Math.sin(2*Math.PI*a*2*h)*Math.exp(-h*12)*.3),o[c]=u*(t?.6:.4)}return r}function y_(s){const t=s.sampleRate,e=.1,n=Math.floor(t*e),i=s.createBuffer(1,n,t),r=i.getChannelData(0),o=800,a=1200;for(let l=0;l<n;l++){const c=l/t,h=c/e,u=o+(a-o)*h;let d=Math.sin(2*Math.PI*u*c);d+=Math.sin(2*Math.PI*u*2*c)*.3;const f=.01,y=c<f?c/f:1,_=Math.exp(-c*30);r[l]=d*y*_*.5}return i}function __(s,t){const e=s.sampleRate;let n=.5;const i=s.createBuffer(1,Math.floor(e*n),e),r=i.getChannelData(0);for(let o=0;o<r.length;o++){const a=o/e;let l=0;switch(t){case"cow":n=.8,l=Math.sin(2*Math.PI*150*a*(1+.1*Math.sin(5*a))),l*=Math.exp(-a*2)*(a<.1?a/.1:1);break;case"pig":l=Math.sin(2*Math.PI*300*a*(1+.3*Math.sin(20*a))),l*=Math.exp(-a*8);break;case"sheep":l=Math.sin(2*Math.PI*400*a*(1+.2*Math.sin(8*a))),l*=Math.exp(-a*4)*(a<.05?a/.05:1);break;case"chicken":l=Math.sin(2*Math.PI*600*a)*Math.exp(-a*20),a>.1&&a<.2&&(l+=Math.sin(2*Math.PI*500*a)*Math.exp(-(a-.1)*20));break;case"wolf":l=Math.sin(2*Math.PI*200*a*(1+.5*Math.sin(15*a))),l*=Math.exp(-a*6);break;case"fox":l=Math.sin(2*Math.PI*800*a*(1-.3*a)),l*=Math.exp(-a*10);break}r[o]=l*.4}return i}const Uo=2;class Ae{static instance=null;audioContext=null;masterGain=null;musicGain=null;sfxGain=null;settings;bufferCache=new Map;currentMusic=null;activeSounds=new Map;soundIdCounter=0;isInitialized=!1;initPromise=null;blockSoundThrottle=new f_;blockSoundCache=new Map;constructor(){this.settings=u_()}static getInstance(){return Ae.instance||(Ae.instance=new Ae),Ae.instance}async init(){if(!this.isInitialized)return this.initPromise?this.initPromise:(this.initPromise=this.doInit(),this.initPromise)}async doInit(){try{const t=window.AudioContext||window.webkitAudioContext;if(!t){console.warn("[AudioManager] Web Audio API not supported");return}this.audioContext=new t,this.audioContext.state==="suspended"&&await this.audioContext.resume(),this.masterGain=this.audioContext.createGain(),this.musicGain=this.audioContext.createGain(),this.sfxGain=this.audioContext.createGain(),this.musicGain.connect(this.masterGain),this.sfxGain.connect(this.masterGain),this.masterGain.connect(this.audioContext.destination),this.applySettings(),await this.preloadAssets(),this.isInitialized=!0,console.log("[AudioManager] Initialized successfully")}catch(t){console.warn("[AudioManager] Failed to initialize:",t)}}async preloadAssets(){if(!this.audioContext)return;const t=As.filter(e=>e.preload);for(const e of t)if(!await this.loadSound(e.path)){const i=this.generateSynthBuffer(e.name);i&&(this.bufferCache.set(e.path,i),console.log(`[AudioManager] Using synthesized audio for: ${e.name}`))}console.log(`[AudioManager] Preloaded ${t.length} audio assets`)}generateSynthBuffer(t){if(!this.audioContext)return null;try{if(t==="ambient")return m_(this.audioContext);if(t.startsWith("footstep_")){const e=t.replace("footstep_","");return g_(this.audioContext,e)}if(t==="fall_light")return Uc(this.audioContext,!1);if(t==="fall_heavy")return Uc(this.audioContext,!0);if(["cow","pig","sheep","chicken","wolf","fox"].includes(t))return __(this.audioContext,t)}catch(e){console.warn(`[AudioManager] Failed to generate synth audio for ${t}:`,e)}return null}async loadSound(t){if(!this.audioContext)return null;if(this.bufferCache.has(t))return this.bufferCache.get(t);try{const e="/minecraft/"+t,n=await fetch(e);if(!n.ok)throw new Error(`HTTP ${n.status}`);const i=await n.arrayBuffer(),r=await this.audioContext.decodeAudioData(i);return this.bufferCache.set(t,r),console.log(`[AudioManager] Loaded audio file: ${t}`),r}catch(e){console.log(`[AudioManager] Failed to load ${t}, generating synth fallback...`,e);const n=As.find(i=>i.path===t);if(n){const i=this.generateSynthBuffer(n.name);if(i)return this.bufferCache.set(t,i),console.log(`[AudioManager] Generated synth audio for: ${n.name}, duration: ${i.duration}`),i}return console.warn(`[AudioManager] No fallback available for: ${t}`),null}}async playMusic(t,e=!0){if(console.log(`[AudioManager] playMusic called: ${t}`),console.log(`[AudioManager] audioContext: ${!!this.audioContext}, musicGain: ${!!this.musicGain}`),!this.audioContext||!this.musicGain){console.warn("[AudioManager] Cannot play music - not initialized");return}const n=As.find(a=>a.name===t&&a.type==="music");if(!n){console.warn(`[AudioManager] Music not found: ${t}`);return}console.log(`[AudioManager] Loading music from: ${n.path}`);const i=await this.loadSound(n.path);if(console.log(`[AudioManager] Buffer loaded: ${!!i}, duration: ${i?.duration}`),!i){console.warn("[AudioManager] Failed to load music buffer");return}this.currentMusic&&this.currentMusic.isPlaying&&this.currentMusic.fadeOut(Uo,this.audioContext);const r=this.audioContext.createBufferSource();r.buffer=i,r.loop=!0;const o=this.audioContext.createGain();o.connect(this.musicGain),e&&(o.gain.setValueAtTime(0,this.audioContext.currentTime),o.gain.linearRampToValueAtTime(1,this.audioContext.currentTime+Uo)),r.connect(o),r.start(),this.currentMusic=new Jn(r,o)}stopMusic(t=!0){!this.audioContext||!this.currentMusic||(t?this.currentMusic.fadeOut(Uo,this.audioContext):this.currentMusic.stop(),this.currentMusic=null)}async playSfx(t,e={}){if(!this.audioContext||!this.sfxGain)return null;const n=As.find(c=>c.name===t);if(!n)return console.warn(`[AudioManager] Sound not found: ${t}`),null;const i=await this.loadSound(n.path);if(!i)return null;const r=this.audioContext.createBufferSource();r.buffer=i,r.loop=e.loop??!1,r.playbackRate.value=e.playbackRate??1;const o=this.audioContext.createGain();o.gain.value=e.volume??1,o.connect(this.sfxGain),r.connect(o),r.start();const a=new Jn(r,o),l=`sfx_${this.soundIdCounter++}`;return this.activeSounds.set(l,a),r.onended=()=>{this.activeSounds.delete(l)},a}async play3dSfx(t,e,n,i,r={}){if(!this.audioContext||!this.sfxGain)return null;const o=As.find(f=>f.name===t);if(!o)return console.warn(`[AudioManager] Sound not found: ${t}`),null;const a=await this.loadSound(o.path);if(!a)return null;const l=this.audioContext.createBufferSource();l.buffer=a,l.loop=r.loop??!1,l.playbackRate.value=r.playbackRate??1;const c=this.audioContext.createPanner();c.distanceModel="inverse",c.refDistance=r.refDistance??1,c.maxDistance=r.maxDistance??50,c.rolloffFactor=r.rolloffFactor??1,c.positionX.value=e,c.positionY.value=n,c.positionZ.value=i;const h=this.audioContext.createGain();h.gain.value=r.volume??1,l.connect(c),c.connect(h),h.connect(this.sfxGain),l.start();const u=new Jn(l,h,c),d=`sfx3d_${this.soundIdCounter++}`;return this.activeSounds.set(d,u),l.onended=()=>{this.activeSounds.delete(d)},u}getFootstepSound(t){return`footstep_${this.getFootstepCategory(t)}`}getFootstepCategory(t){switch(t){case m.GRASS:case m.DIRT:case m.LEAVES:case m.OAK_LEAVES:case m.BIRCH_LEAVES:case m.SPRUCE_LEAVES:case m.SNOW:return"grass";case m.STONE:case m.COBBLESTONE:case m.BRICK:case m.SANDSTONE:case m.SANDSTONE_CARVED:case m.DARK_STONE:case m.MOSSY_STONE:case m.RED_BRICK:return"stone";case m.SAND:return"sand";case m.WOOD:case m.LOG:case m.PLANKS:case m.OAK_LOG:case m.BIRCH_LOG:case m.SPRUCE_LOG:return"wood";default:return"grass"}}getAnimalSound(t){const e=["cow","pig","sheep","chicken","wolf","fox"],n=t.toLowerCase();return e.includes(n)?n:null}playBlockSound(t,e,n,i,r){if(!this.audioContext||!this.sfxGain||this.settings.muted||t===m.AIR)return;const o=h_(t);if(!this.blockSoundThrottle.tryPlay(o))return;const a=`block_${o}_${e}`;let l=this.blockSoundCache.get(a);l||(l=p_(this.audioContext,o,e),this.blockSoundCache.set(a,l));const c=this.audioContext.createBufferSource();c.buffer=l,c.playbackRate.value=.9+Math.random()*.2;const h=this.audioContext.createGain();if(h.gain.value=1,n!==void 0&&i!==void 0&&r!==void 0){const f=this.audioContext.createPanner();f.distanceModel="inverse",f.refDistance=1,f.maxDistance=50,f.rolloffFactor=1,f.positionX.value=n,f.positionY.value=i,f.positionZ.value=r,c.connect(f),f.connect(h)}else c.connect(h);h.connect(this.sfxGain),c.start();const u=new Jn(c,h),d=`block_${this.soundIdCounter++}`;this.activeSounds.set(d,u),c.onended=()=>{this.activeSounds.delete(d)},console.log(`[AudioManager] Playing block sound: ${o} ${e}`)}playPickupSound(t,e,n){if(!this.audioContext||!this.sfxGain||this.settings.muted)return;const i="pickup_sound";let r=this.blockSoundCache.get(i);r||(r=y_(this.audioContext),this.blockSoundCache.set(i,r));const o=this.audioContext.createBufferSource();o.buffer=r,o.playbackRate.value=.9+Math.random()*.2;const a=this.audioContext.createGain();if(a.gain.value=.8,t!==void 0&&e!==void 0&&n!==void 0){const h=this.audioContext.createPanner();h.distanceModel="inverse",h.refDistance=1,h.maxDistance=30,h.rolloffFactor=1,h.positionX.value=t,h.positionY.value=e,h.positionZ.value=n,o.connect(h),h.connect(a)}else o.connect(a);a.connect(this.sfxGain),o.start();const l=new Jn(o,a),c=`pickup_${this.soundIdCounter++}`;this.activeSounds.set(c,l),o.onended=()=>{this.activeSounds.delete(c)}}playAttackSound(t,e,n){if(!this.audioContext||!this.sfxGain||this.settings.muted)return;const i="attack_sound";let r=this.blockSoundCache.get(i);if(r||(r=this.generateAttackSound(),r&&this.blockSoundCache.set(i,r)),!r)return;const o=this.audioContext.createBufferSource();o.buffer=r,o.playbackRate.value=.9+Math.random()*.2;const a=this.audioContext.createGain();if(a.gain.value=.7,t!==void 0&&e!==void 0&&n!==void 0){const h=this.audioContext.createPanner();h.distanceModel="inverse",h.refDistance=1,h.maxDistance=30,h.rolloffFactor=1,h.positionX.value=t,h.positionY.value=e,h.positionZ.value=n,o.connect(h),h.connect(a)}else o.connect(a);a.connect(this.sfxGain),o.start();const l=new Jn(o,a),c=`attack_${this.soundIdCounter++}`;this.activeSounds.set(c,l),o.onended=()=>{this.activeSounds.delete(c)}}playEatingSound(){if(!this.audioContext||!this.sfxGain||this.settings.muted)return;const t="eating_sound";let e=this.blockSoundCache.get(t);if(e||(e=this.generateEatingSound(),e&&this.blockSoundCache.set(t,e)),!e)return;const n=this.audioContext.createBufferSource();n.buffer=e,n.playbackRate.value=.8+Math.random()*.4;const i=this.audioContext.createGain();i.gain.value=.5,n.connect(i),i.connect(this.sfxGain),n.start();const r=new Jn(n,i),o=`eating_${this.soundIdCounter++}`;this.activeSounds.set(o,r),n.onended=()=>{this.activeSounds.delete(o)}}playEatingCompleteSound(){if(!this.audioContext||!this.sfxGain||this.settings.muted)return;const t="eating_complete_sound";let e=this.blockSoundCache.get(t);if(e||(e=this.generateEatingCompleteSound(),e&&this.blockSoundCache.set(t,e)),!e)return;const n=this.audioContext.createBufferSource();n.buffer=e;const i=this.audioContext.createGain();i.gain.value=.6,n.connect(i),i.connect(this.sfxGain),n.start();const r=new Jn(n,i),o=`eating_complete_${this.soundIdCounter++}`;this.activeSounds.set(o,r),n.onended=()=>{this.activeSounds.delete(o)}}generateAttackSound(){if(!this.audioContext)return;const t=this.audioContext.sampleRate,n=Math.floor(t*.15),i=this.audioContext.createBuffer(1,n,t),r=i.getChannelData(0);for(let o=0;o<n;o++){const a=o/t,l=Math.exp(-a*30),c=(Math.random()*2-1)*.3,h=Math.sin(2*Math.PI*100*a)*.7;r[o]=(c+h)*l}return i}generateEatingSound(){if(!this.audioContext)return;const t=this.audioContext.sampleRate,e=.1,n=Math.floor(t*e),i=this.audioContext.createBuffer(1,n,t),r=i.getChannelData(0);for(let o=0;o<n;o++){const a=o/t,l=Math.sin(Math.PI*a/e)*Math.exp(-a*10),c=Math.random()*2-1;r[o]=c*l*.4}return i}generateEatingCompleteSound(){if(!this.audioContext)return;const t=this.audioContext.sampleRate,n=Math.floor(t*.2),i=this.audioContext.createBuffer(1,n,t),r=i.getChannelData(0);for(let o=0;o<n;o++){const a=o/t,l=Math.exp(-a*15),c=400-a*1e3,h=Math.sin(2*Math.PI*c*a);r[o]=h*l*.5}return i}updateListenerPosition(t,e,n,i,r){if(!this.audioContext)return;const o=this.audioContext.listener;o.positionX?(o.positionX.value=t,o.positionY.value=e,o.positionZ.value=n,o.forwardX.value=i,o.forwardY.value=0,o.forwardZ.value=r,o.upX.value=0,o.upY.value=1,o.upZ.value=0):(o.setPosition(t,e,n),o.setOrientation(i,0,r,0,1,0))}applySettings(){if(!this.masterGain||!this.musicGain||!this.sfxGain)return;const t=this.settings.muted?0:this.settings.masterVolume;this.masterGain.gain.value=t,this.musicGain.gain.value=this.settings.musicVolume,this.sfxGain.gain.value=this.settings.sfxVolume}setMasterVolume(t){this.settings.masterVolume=Math.max(0,Math.min(1,t)),this.applySettings(),Xi(this.settings)}setMusicVolume(t){this.settings.musicVolume=Math.max(0,Math.min(1,t)),this.applySettings(),Xi(this.settings)}setSfxVolume(t){this.settings.sfxVolume=Math.max(0,Math.min(1,t)),this.applySettings(),Xi(this.settings)}toggleMute(){this.settings.muted=!this.settings.muted,this.applySettings(),Xi(this.settings)}mute(){this.settings.muted=!0,this.applySettings(),Xi(this.settings)}unmute(){this.settings.muted=!1,this.applySettings(),Xi(this.settings)}getSettings(){return{...this.settings}}get initialized(){return this.isInitialized}async resume(){this.audioContext&&this.audioContext.state==="suspended"&&await this.audioContext.resume()}dispose(){this.stopMusic(!1),this.activeSounds.forEach(t=>t.stop()),this.activeSounds.clear(),this.audioContext&&(this.audioContext.close(),this.audioContext=null),this.bufferCache.clear(),this.blockSoundCache.clear(),this.blockSoundThrottle.reset(),this.isInitialized=!1,this.initPromise=null,Ae.instance=null}}const Er={raw_beef:{type:"raw_beef",name:"生牛肉",nameEn:"Raw Beef",hungerRestore:3,blockType:m.RAW_BEEF},raw_porkchop:{type:"raw_porkchop",name:"生猪排",nameEn:"Raw Porkchop",hungerRestore:3,blockType:m.RAW_PORKCHOP},raw_mutton:{type:"raw_mutton",name:"生羊肉",nameEn:"Raw Mutton",hungerRestore:2,blockType:m.RAW_MUTTON},raw_chicken:{type:"raw_chicken",name:"生鸡肉",nameEn:"Raw Chicken",hungerRestore:2,blockType:m.RAW_CHICKEN},raw_rabbit:{type:"raw_rabbit",name:"生兔肉",nameEn:"Raw Rabbit",hungerRestore:3,blockType:m.RAW_RABBIT},cooked_beef:{type:"cooked_beef",name:"熟牛肉",nameEn:"Cooked Beef",hungerRestore:8,blockType:m.COOKED_BEEF},cooked_porkchop:{type:"cooked_porkchop",name:"熟猪排",nameEn:"Cooked Porkchop",hungerRestore:8,blockType:m.COOKED_PORKCHOP},cooked_mutton:{type:"cooked_mutton",name:"熟羊肉",nameEn:"Cooked Mutton",hungerRestore:6,blockType:m.COOKED_MUTTON},cooked_chicken:{type:"cooked_chicken",name:"熟鸡肉",nameEn:"Cooked Chicken",hungerRestore:6,blockType:m.COOKED_CHICKEN},cooked_rabbit:{type:"cooked_rabbit",name:"熟兔肉",nameEn:"Cooked Rabbit",hungerRestore:5,blockType:m.COOKED_RABBIT}},v_={[m.RAW_BEEF]:m.COOKED_BEEF,[m.RAW_PORKCHOP]:m.COOKED_PORKCHOP,[m.RAW_MUTTON]:m.COOKED_MUTTON,[m.RAW_CHICKEN]:m.COOKED_CHICKEN,[m.RAW_RABBIT]:m.COOKED_RABBIT},S_={[Kt.COW]:"raw_beef",[Kt.PIG]:"raw_porkchop",[Kt.SHEEP]:"raw_mutton",[Kt.CHICKEN]:"raw_chicken",[Kt.RABBIT]:"raw_rabbit"};class tn{static getFood(t){return Er[t]??null}static getFoodForAnimal(t){return S_[t]??null}static getBlockTypeForFood(t){return Er[t]?.blockType??null}static isRawFood(t){return t===m.RAW_BEEF||t===m.RAW_PORKCHOP||t===m.RAW_MUTTON||t===m.RAW_CHICKEN||t===m.RAW_RABBIT}static getCookedVersion(t){return v_[t]??null}static isFoodBlock(t){return t===m.RAW_BEEF||t===m.RAW_PORKCHOP||t===m.RAW_MUTTON||t===m.RAW_CHICKEN||t===m.RAW_RABBIT||t===m.COOKED_BEEF||t===m.COOKED_PORKCHOP||t===m.COOKED_MUTTON||t===m.COOKED_CHICKEN||t===m.COOKED_RABBIT}static isFood(t){return tn.isFoodBlock(t)}static getFoodFromBlockType(t){for(const e of Object.values(Er))if(e.blockType===t)return e;return null}static getHungerRestore(t){return tn.getFoodFromBlockType(t)?.hungerRestore??0}static getAllFoods(){return Object.values(Er)}}var ge=(s=>(s.IDLE="idle",s.WALKING="walking",s.RUNNING="running",s.HURT="hurt",s.DYING="dying",s.SWIMMING="swimming",s))(ge||{});const M_={idle:{state:"idle",duration:2,loop:!0,blendTime:.2,priority:0},walking:{state:"walking",duration:1,loop:!0,blendTime:.15,priority:1},running:{state:"running",duration:.5,loop:!0,blendTime:.1,priority:2},hurt:{state:"hurt",duration:.3,loop:!1,blendTime:.05,priority:5},dying:{state:"dying",duration:1,loop:!1,blendTime:.1,priority:10},swimming:{state:"swimming",duration:1,loop:!0,blendTime:.2,priority:3}};function x_(){return{currentState:"idle",previousState:"idle",stateTime:0,blendProgress:1,legSwingAngle:0,headYaw:0,headPitch:0,bodyTilt:0}}function Fc(s){return M_[s]}function gu(s,t,e=.3){switch(s){case"walking":return Math.sin(t*8)*e;case"running":return Math.sin(t*12)*e*1.3;case"swimming":return Math.sin(t*4)*e*.5;default:return 0}}function E_(s){return 1+Math.sin(s*2)*.02}const b_=20,T_=8,A_=.3,C_=7,w_=.5,br=5,Bc=20,R_=.2,I_=1,D_=.5,zc=Math.PI/3,Gc=Math.PI/6,Hc=3;class Rn extends il{animalType;state=Te.IDLE;stateTimer;targetPosition=null;config;mesh;animationTime=0;velocity=new I(0,0,0);width=.6;height=1;isGrounded=!1;inWater=!1;jumpCooldown=0;soundTimer=0;_health=10;_maxHealth=10;_isDead=!1;damageFlashTimer=0;originalMaterials=new Map;onDeathCallback=null;animData=x_();deathAnimTimer=0;deathAnimComplete=!1;lastPlayerPosition=new I;headMesh=null;bodyMesh=null;legMeshes=[];constructor(t,e,n,i){super(sl(),e,n,i),this.animalType=t,this.config=qy(t),this.stateTimer=Oc(Te.IDLE,this.config),this.mesh=new an,this.mesh.position.set(e,n,i),this.rotation=Math.random()*Math.PI*2,this.mesh.rotation.y=this.rotation,this.soundTimer=br+Math.random()*(Bc-br),this._maxHealth=this.config.maxHealth,this._health=this._maxHealth}update(t,e,n){if(this.lastPlayerPosition.copy(e),this._isDead){this.updateDeathAnimation(t);return}if(this.updateDamageFlash(t),this.animData.currentState===ge.HURT){this.animData.stateTime+=t;const r=Fc(ge.HURT);this.animData.stateTime>=r.duration&&this.setAnimationState(this.animData.previousState)}const i=$y(this.state,this.stateTimer,t,this.position,e,this.config);i.newState!==null?(this.state=i.newState,this.stateTimer=Oc(this.state,this.config),i.targetPosition&&(this.targetPosition=i.targetPosition)):this.stateTimer-=t,this.updateMovement(t,n),this.updateAnimationState(),this.updateAnimation(t),this.updateHeadTracking(t,e),this.updateSound(t,e),this.mesh.position.set(this.position.x,this.position.y-this.height/2,this.position.z),this.mesh.rotation.y=this.rotation}updateAnimationState(){if(this.animData.currentState===ge.HURT||this.animData.currentState===ge.DYING)return;let t;this.inWater?t=ge.SWIMMING:this.state===Te.IDLE?t=ge.IDLE:this.state===Te.FLEEING?t=ge.RUNNING:t=ge.WALKING,t!==this.animData.currentState&&this.setAnimationState(t)}setAnimationState(t){t!==this.animData.currentState&&(this.animData.previousState=this.animData.currentState,this.animData.currentState=t,this.animData.stateTime=0,this.animData.blendProgress=0)}updateHeadTracking(t,e){if(!this.headMesh)return;const n=new I().subVectors(e,this.position);if(n.length()>15)this.animData.headYaw=Ii.lerp(this.animData.headYaw,0,t*2),this.animData.headPitch=Ii.lerp(this.animData.headPitch,0,t*2);else{const r=new I(n.x,0,n.z).normalize();let o=Math.atan2(r.x,r.z)-this.rotation;for(;o>Math.PI;)o-=Math.PI*2;for(;o<-Math.PI;)o+=Math.PI*2;o=Ii.clamp(o,-zc,zc);const a=Math.sqrt(n.x*n.x+n.z*n.z);let l=Math.atan2(n.y-.5,a);l=Ii.clamp(l,-Gc,Gc),this.animData.headYaw=Ii.lerp(this.animData.headYaw,o,t*Hc),this.animData.headPitch=Ii.lerp(this.animData.headPitch,l,t*Hc)}this.headMesh.rotation.y=this.animData.headYaw,this.headMesh.rotation.x=this.animData.headPitch}updateDeathAnimation(t){if(this.deathAnimComplete)return;this.deathAnimTimer+=t;const e=Math.min(this.deathAnimTimer/I_,1),n=1-Math.pow(1-e,2);this.animData.bodyTilt=n*(Math.PI/2),this.mesh.rotation.z=this.animData.bodyTilt;const i=n*.3;this.mesh.position.y-=i*t*2,e>=1&&(this.deathAnimComplete=!0,setTimeout(()=>{this.onDeathCallback},D_*1e3))}isDeathAnimationComplete(){return this.deathAnimComplete}updateSound(t,e){if(this.soundTimer-=t,this.soundTimer<=0){if(this.soundTimer=br+Math.random()*(Bc-br),this.position.distanceTo(e)>50)return;const i=Ae.getInstance(),r=i.getAnimalSound(String(this.animalType));r&&i.initialized&&i.play3dSfx(r,this.position.x,this.position.y,this.position.z,{volume:.6,refDistance:3,maxDistance:50,rolloffFactor:1})}}updateMovement(t,e){if(this.jumpCooldown>0&&(this.jumpCooldown-=t),e){if(this.inWater=fu(this,e),this.inWater)this.applyWaterPhysics(t,e);else{pu(this,t,b_);const h=this.velocity.y*t,u=hu(this,e,h);this.position.y=u.newPosition,this.velocity.y=u.newVelocity}this.isGrounded=Ua(this,e)}if(!this.targetPosition)return;const n=t_(this.state,this.config);if(n===0)return;const i=new I().subVectors(this.targetPosition,this.position);i.y=0;const r=i.length();if(r<.5){this.targetPosition=null;return}i.normalize(),this.rotation=Math.atan2(i.x,i.z);const o=this.inWater?.5:1,a=Math.min(n*o*t,r),l=i.x*a,c=i.z*a;if(e){const h=this.canMoveInDirection(e,l,0),u=this.canMoveInDirection(e,0,c),d=!h&&Math.abs(l)>.001,f=!u&&Math.abs(c)>.001;if((d||f)&&this.isGrounded&&!this.inWater&&(this.shouldJump(e,i)?this.jump():this.targetPosition=null),h){const y=uu(this,e,l);this.position.x=y.newPosition,y.collided&&this.isGrounded&&this.shouldJump(e,i)&&this.jump()}if(u){const y=du(this,e,c);this.position.z=y.newPosition,y.collided&&this.isGrounded&&this.shouldJump(e,i)&&this.jump()}}else this.position.x+=l,this.position.z+=c}jump(){this.jumpCooldown<=0&&this.isGrounded&&!this.inWater&&(this.velocity.y=C_,this.isGrounded=!1,this.jumpCooldown=w_)}shouldJump(t,e){if(this.jumpCooldown>0)return!1;const n=this.height/2,i=.5,r=this.position.x+e.x*i,o=this.position.z+e.z*i,a=Math.floor(this.position.y-n),l=t.getBlock(Math.floor(r),a,Math.floor(o)),c=t.getBlock(Math.floor(r),a+1,Math.floor(o)),h=t.getBlock(Math.floor(r),a+2,Math.floor(o)),u=l!==m.AIR&&l!==m.WATER,d=(c===m.AIR||c===m.WATER)&&(h===m.AIR||h===m.WATER),f=this.position.x+e.x*1.5,y=this.position.z+e.z*1.5,_=t.getBlock(Math.floor(f),a,Math.floor(y)),g=t.getBlock(Math.floor(f),a+1,Math.floor(y)),p=(_!==m.AIR||l!==m.AIR)&&(g===m.AIR||g===m.WATER);return u&&d&&p}applyWaterPhysics(t,e){const n=this.height/2;let i=this.position.y;for(let l=Math.floor(this.position.y);l<this.position.y+10;l++){const c=e.getBlock(Math.floor(this.position.x),l,Math.floor(this.position.z)),h=e.getBlock(Math.floor(this.position.x),l+1,Math.floor(this.position.z));if(c===m.WATER&&h!==m.WATER){i=l+1+A_;break}}const r=i+n,o=this.position.y;o<r?(this.velocity.y+=T_*t,this.velocity.y>3&&(this.velocity.y=3)):(this.velocity.y*=.9,o>r+.1&&(this.velocity.y-=2*t));const a=this.velocity.y*t;this.position.y+=a,this.position.y>r+.5&&(this.position.y=r+.5,this.velocity.y=0)}canMoveInDirection(t,e,n){const i=this.width/2,r=this.height/2,o=[Math.floor(this.position.y-r+.1),Math.floor(this.position.y),Math.floor(this.position.y+r-.1)],a=this.position.x+e,l=this.position.z+n;for(const c of o){const h=[{x:a-i,z:l-i},{x:a+i,z:l-i},{x:a-i,z:l+i},{x:a+i,z:l+i}];for(const u of h){const d=Math.floor(u.x),f=Math.floor(u.z),y=t.getBlock(d,c,f);if(y!==m.AIR&&y!==m.WATER){const _=Math.floor(this.position.x+(u.x-a)),g=Math.floor(this.position.z+(u.z-l));if(d!==_||f!==g)return!1}}}return!0}updateAnimation(t){const e=this.getAnimationSpeedMultiplier();if(this.animationTime+=t*e,this.animData.blendProgress<1){const n=Fc(this.animData.currentState);this.animData.blendProgress=Math.min(this.animData.blendProgress+t/n.blendTime,1)}this.animData.legSwingAngle=gu(this.animData.currentState,this.animationTime),this.applyLegAnimation(),this.applyBreathingAnimation()}getAnimationSpeedMultiplier(){switch(this.animData.currentState){case ge.IDLE:return .5;case ge.WALKING:return 2;case ge.RUNNING:return 3;case ge.SWIMMING:return 1.5;case ge.HURT:return 4;default:return 1}}applyLegAnimation(){if(this.legMeshes.length===0)return;const t=this.animData.legSwingAngle;this.legMeshes.length>=4?(this.legMeshes[0]&&(this.legMeshes[0].rotation.x=t),this.legMeshes[1]&&(this.legMeshes[1].rotation.x=-t),this.legMeshes[2]&&(this.legMeshes[2].rotation.x=-t),this.legMeshes[3]&&(this.legMeshes[3].rotation.x=t)):this.legMeshes.length>=2&&(this.legMeshes[0]&&(this.legMeshes[0].rotation.x=t),this.legMeshes[1]&&(this.legMeshes[1].rotation.x=-t))}applyBreathingAnimation(){if(this.bodyMesh)if(this.animData.currentState===ge.IDLE){const t=E_(this.animationTime);this.bodyMesh.scale.set(t,t,t)}else this.bodyMesh.scale.set(1,1,1)}getMesh(){return this.mesh}get health(){return this._health}get maxHealth(){return this._maxHealth}get isDead(){return this._isDead}setOnDeath(t){this.onDeathCallback=t}takeDamage(t){return this._isDead||t<=0?!1:(this._health=Math.max(0,this._health-t),this.startDamageFlash(),this.setAnimationState(ge.HURT),this._health<=0&&this.die(),!0)}startDamageFlash(){this.damageFlashTimer=R_,this.mesh.traverse(t=>{if(t instanceof V&&t.material)if(this.originalMaterials.has(t)||this.originalMaterials.set(t,t.material),Array.isArray(t.material))t.material=t.material.map(e=>{const n=e.clone();return n.color.setHex(16711680),n});else{const e=t.material.clone();e.color.setHex(16711680),t.material=e}})}updateDamageFlash(t){this.damageFlashTimer<=0||(this.damageFlashTimer-=t,this.damageFlashTimer<=0&&(this.mesh.traverse(e=>{if(e instanceof V){const n=this.originalMaterials.get(e);n&&(e.material=n)}}),this.originalMaterials.clear()))}die(){if(this._isDead)return;this._isDead=!0,this.setAnimationState(ge.DYING),this.deathAnimTimer=0,this.deathAnimComplete=!1;let t=null;if(this.config.dropsFood){const e=tn.getFoodForAnimal(this.animalType);e&&(t=e)}this.onDeathCallback&&this.onDeathCallback(this,this.position.clone(),t)}setHealth(t){this._health=Math.max(0,Math.min(this._maxHealth,t)),this._health<=0&&(this._isDead=!0)}dispose(){this.mesh.traverse(t=>{t instanceof V&&(t.geometry?.dispose(),t.material instanceof Oe?t.material.dispose():Array.isArray(t.material)&&t.material.forEach(e=>e.dispose()))})}}class P_{entities=new Map;entitiesByChunk=new Map;scene;maxPerChunk=6;constructor(t){this.scene=t}getChunkKey(t,e){return`${t},${e}`}add(t){if(this.entities.has(t.id))return console.warn(`Entity ${t.id} already exists`),!1;const e=this.getChunkKey(t.chunkX,t.chunkZ),n=this.entitiesByChunk.get(e);if(n&&n.size>=this.maxPerChunk)return!1;this.entities.set(t.id,t),this.entitiesByChunk.has(e)||this.entitiesByChunk.set(e,new Set),this.entitiesByChunk.get(e).add(t.id);const i=t.getMesh();return i&&this.scene.add(i),!0}remove(t){const e=this.entities.get(t);if(!e)return!1;const n=e.getMesh();n&&this.scene.remove(n);const i=this.getChunkKey(e.chunkX,e.chunkZ),r=this.entitiesByChunk.get(i);return r&&(r.delete(t),r.size===0&&this.entitiesByChunk.delete(i)),e.dispose(),this.entities.delete(t),!0}get(t){return this.entities.get(t)}getByChunk(t,e){const n=this.getChunkKey(t,e),i=this.entitiesByChunk.get(n);if(!i)return[];const r=[];for(const o of i){const a=this.entities.get(o);a&&r.push(a)}return r}getChunkEntityCount(t,e){const n=this.getChunkKey(t,e);return this.entitiesByChunk.get(n)?.size??0}canSpawnInChunk(t,e){return this.getChunkEntityCount(t,e)<this.maxPerChunk}update(t,e,n){const i=[];for(const r of this.entities.values()){if(!r.isActive)continue;if(r instanceof Rn&&r.isDead&&r.isDeathAnimationComplete()){i.push(r.id);continue}const o=r.chunkX,a=r.chunkZ;if(r.update(t,e,n),r.updateChunkCoordinates(),r.chunkX!==o||r.chunkZ!==a){const l=this.getChunkKey(o,a),c=this.entitiesByChunk.get(l);c&&(c.delete(r.id),c.size===0&&this.entitiesByChunk.delete(l));const h=this.getChunkKey(r.chunkX,r.chunkZ);this.entitiesByChunk.has(h)||this.entitiesByChunk.set(h,new Set),this.entitiesByChunk.get(h).add(r.id)}}for(const r of i)this.remove(r)}getAll(){return Array.from(this.entities.values())}getCount(){return this.entities.size}removeChunk(t,e){const n=this.getChunkKey(t,e),i=this.entitiesByChunk.get(n);if(!i)return;const r=Array.from(i);for(const o of r)this.remove(o)}dispose(){for(const t of this.entities.values()){const e=t.getMesh();e&&this.scene.remove(e),t.dispose()}this.entities.clear(),this.entitiesByChunk.clear()}}class L_ extends Rn{constructor(t,e,n){super(Kt.COW,t,e,n),this.width=.9,this.height=1.4,this.createMesh()}createMesh(){const t=new It({color:9127187}),e=new It({color:16777215}),n=new It({color:9127187}),i=new st(.8,.7,1.2);this.bodyMesh=new V(i,t),this.bodyMesh.position.set(0,.7,0),this.bodyMesh.castShadow=!0,this.mesh.add(this.bodyMesh);const r=new st(.3,.3,.05),o=new V(r,e);o.position.set(.2,.75,.61),this.mesh.add(o);const a=new V(r,e);a.position.set(-.15,.65,.61),this.mesh.add(a);const l=new st(.5,.5,.5);this.headMesh=new V(l,n),this.headMesh.position.set(0,.9,.75),this.headMesh.castShadow=!0,this.mesh.add(this.headMesh);const c=new st(.35,.2,.15),h=new It({color:13935988}),u=new V(c,h);u.position.set(0,.8,1.05),this.mesh.add(u);const d=new st(.08,.2,.08),f=new It({color:16119260}),y=new V(d,f);y.position.set(-.2,1.2,.75),this.mesh.add(y);const _=new V(d,f);_.position.set(.2,1.2,.75),this.mesh.add(_);const g=new st(.2,.5,.2),p=new It({color:9127187}),x=[[-.25,.25,-.4],[.25,.25,-.4],[-.25,.25,.4],[.25,.25,.4]];for(const C of x){const w=new V(g,p);w.position.set(C[0]??0,C[1]??0,C[2]??0),w.castShadow=!0,this.legMeshes.push(w),this.mesh.add(w)}const b=new st(.25,.15,.2),S=new It({color:16761035}),L=new V(b,S);L.position.set(0,.35,-.2),this.mesh.add(L)}}class O_ extends Rn{constructor(t,e,n){super(Kt.SHEEP,t,e,n),this.width=.9,this.height=1.2,this.createMesh()}createMesh(){const t=new It({color:16119285}),e=new It({color:8421504}),n=new st(.9,.7,1);this.bodyMesh=new V(n,t),this.bodyMesh.position.set(0,.65,0),this.bodyMesh.castShadow=!0,this.mesh.add(this.bodyMesh);const i=new st(.4,.4,.45);this.headMesh=new V(i,e),this.headMesh.position.set(0,.75,.65),this.headMesh.castShadow=!0,this.mesh.add(this.headMesh);const r=new st(.35,.15,.35),o=new V(r,t);o.position.set(0,1,.65),this.mesh.add(o);const a=new st(.15,.1,.05),l=new V(a,e);l.position.set(-.25,.85,.65),l.rotation.z=-.3,this.mesh.add(l);const c=new V(a,e);c.position.set(.25,.85,.65),c.rotation.z=.3,this.mesh.add(c);const h=new st(.15,.4,.15),u=[[-.3,.2,-.35],[.3,.2,-.35],[-.3,.2,.35],[.3,.2,.35]];for(const d of u){const f=new V(h,e);f.position.set(d[0]??0,d[1]??0,d[2]??0),f.castShadow=!0,this.legMeshes.push(f),this.mesh.add(f)}}}class N_ extends Rn{constructor(t,e,n){super(Kt.PIG,t,e,n),this.width=.7,this.height=1,this.createMesh()}createMesh(){const t=new It({color:16758465}),e=new It({color:16751001}),n=new st(.7,.6,1);this.bodyMesh=new V(n,t),this.bodyMesh.position.set(0,.55,0),this.bodyMesh.castShadow=!0,this.mesh.add(this.bodyMesh);const i=new st(.5,.5,.5);this.headMesh=new V(i,t),this.headMesh.position.set(0,.65,.65),this.headMesh.castShadow=!0,this.mesh.add(this.headMesh);const r=new st(.25,.2,.15),o=new V(r,e);o.position.set(0,.55,.95),this.mesh.add(o);const a=new st(.05,.05,.02),l=new It({color:4868682}),c=new V(a,l);c.position.set(-.06,.55,1.03),this.mesh.add(c);const h=new V(a,l);h.position.set(.06,.55,1.03),this.mesh.add(h);const u=new st(.15,.12,.05),d=new V(u,t);d.position.set(-.2,.95,.6),d.rotation.x=-.5,d.rotation.z=-.3,this.mesh.add(d);const f=new V(u,t);f.position.set(.2,.95,.6),f.rotation.x=-.5,f.rotation.z=.3,this.mesh.add(f);const y=new st(.15,.35,.15),_=[[-.22,.175,-.35],[.22,.175,-.35],[-.22,.175,.35],[.22,.175,.35]];for(const x of _){const b=new V(y,t);b.position.set(x[0]??0,x[1]??0,x[2]??0),b.castShadow=!0,this.legMeshes.push(b),this.mesh.add(b)}const g=new st(.08,.08,.15),p=new V(g,t);p.position.set(0,.65,-.55),p.rotation.x=.5,this.mesh.add(p)}}class k_ extends Rn{wingMeshes=[];constructor(t,e,n){super(Kt.CHICKEN,t,e,n),this.width=.4,this.height=.7,this.createMesh()}createMesh(){const t=new It({color:16777215}),e=new It({color:16711680}),n=new It({color:16753920}),i=new It({color:16753920}),r=new st(.4,.35,.5);this.bodyMesh=new V(r,t),this.bodyMesh.position.set(0,.35,0),this.bodyMesh.castShadow=!0,this.mesh.add(this.bodyMesh);const o=new st(.25,.25,.25);this.headMesh=new V(o,t),this.headMesh.position.set(0,.55,.3),this.headMesh.castShadow=!0,this.mesh.add(this.headMesh);const a=new st(.05,.12,.15),l=new V(a,e);l.position.set(0,.72,.32),this.mesh.add(l);const c=new st(.08,.1,.05),h=new V(c,e);h.position.set(0,.42,.45),this.mesh.add(h);const u=new st(.1,.08,.12),d=new V(u,n);d.position.set(0,.52,.48),this.mesh.add(d);const f=new st(.04,.04,.02),y=new It({color:0}),_=new V(f,y);_.position.set(-.1,.58,.42),this.mesh.add(_);const g=new V(f,y);g.position.set(.1,.58,.42),this.mesh.add(g);const p=new st(.05,.2,.3),x=new V(p,t);x.position.set(-.23,.35,0),this.wingMeshes.push(x),this.mesh.add(x);const b=new V(p,t);b.position.set(.23,.35,0),this.wingMeshes.push(b),this.mesh.add(b);const S=new st(.05,.2,.05),L=new V(S,i);L.position.set(-.1,.1,0),this.legMeshes.push(L),this.mesh.add(L);const C=new V(S,i);C.position.set(.1,.1,0),this.legMeshes.push(C),this.mesh.add(C);const w=new st(.15,.2,.1),P=new V(w,t);P.position.set(0,.45,-.28),P.rotation.x=-.5,this.mesh.add(P)}updateAnimation(t){super.updateAnimation(t);const e=gu(this.animData.currentState,this.animationTime,.4);this.legMeshes[0]&&(this.legMeshes[0].rotation.x=e),this.legMeshes[1]&&(this.legMeshes[1].rotation.x=-e);const n=Math.sin(this.animationTime*4)*.2;this.wingMeshes[0]&&(this.wingMeshes[0].rotation.z=n),this.wingMeshes[1]&&(this.wingMeshes[1].rotation.z=-n),this.headMesh&&(this.headMesh.position.z=.3+Math.sin(this.animationTime*6)*.03)}}class U_ extends Rn{earMeshes=[];constructor(t,e,n){super(Kt.RABBIT,t,e,n),this.width=.4,this.height=.5,this.createMesh()}createMesh(){const t=new It({color:9136404}),e=new It({color:16758465}),n=new st(.3,.25,.4);this.bodyMesh=new V(n,t),this.bodyMesh.position.set(0,.25,0),this.bodyMesh.castShadow=!0,this.mesh.add(this.bodyMesh);const i=new st(.25,.2,.2);this.headMesh=new V(i,t),this.headMesh.position.set(0,.35,.25),this.headMesh.castShadow=!0,this.mesh.add(this.headMesh);const r=new st(.06,.2,.04),o=new V(r,t);o.position.set(-.08,.55,.2),this.earMeshes.push(o),this.mesh.add(o);const a=new V(r,t);a.position.set(.08,.55,.2),this.earMeshes.push(a),this.mesh.add(a);const l=new st(.03,.15,.02),c=new V(l,e);c.position.set(-.08,.55,.22),this.mesh.add(c);const h=new V(l,e);h.position.set(.08,.55,.22),this.mesh.add(h);const u=new st(.06,.04,.04),d=new It({color:16758465}),f=new V(u,d);f.position.set(0,.32,.36),this.mesh.add(f);const y=new st(.1,.1,.1),_=new It({color:16777215}),g=new V(y,_);g.position.set(0,.25,-.25),this.mesh.add(g);const p=new st(.08,.15,.08),x=new It({color:9136404}),b=[[-.1,.075,-.12],[.1,.075,-.12],[-.1,.075,.12],[.1,.075,.12]];for(const S of b){const L=new V(p,x);L.position.set(S[0]??0,S[1]??0,S[2]??0),L.castShadow=!0,this.legMeshes.push(L),this.mesh.add(L)}}updateAnimation(t){if(super.updateAnimation(t),(this.animData.currentState===ge.WALKING||this.animData.currentState===ge.RUNNING)&&this.bodyMesh){const n=Math.sin(this.animationTime*12),i=n*.4;this.legMeshes[0]&&(this.legMeshes[0].rotation.x=i),this.legMeshes[1]&&(this.legMeshes[1].rotation.x=i),this.legMeshes[2]&&(this.legMeshes[2].rotation.x=-i),this.legMeshes[3]&&(this.legMeshes[3].rotation.x=-i),this.bodyMesh.position.y=.25+Math.abs(n)*.05}else this.bodyMesh&&(this.bodyMesh.position.y=.25);for(const n of this.earMeshes)n.rotation.z=Math.sin(this.animationTime*3+Math.random()*.1)*.1}}class F_ extends Rn{tailMesh;constructor(t,e,n){super(Kt.WOLF,t,e,n),this.width=.6,this.height=.8,this.createMesh()}createMesh(){const t=new It({color:8421504}),e=new It({color:12632256}),n=new It({color:2763306}),i=new st(.5,.45,.9);this.bodyMesh=new V(i,t),this.bodyMesh.position.set(0,.55,0),this.bodyMesh.castShadow=!0,this.mesh.add(this.bodyMesh);const r=new st(.4,.1,.7),o=new V(r,e);o.position.set(0,.35,0),this.mesh.add(o);const a=new st(.35,.3,.4);this.headMesh=new V(a,t),this.headMesh.position.set(0,.7,.55),this.headMesh.castShadow=!0,this.mesh.add(this.headMesh);const l=new st(.2,.15,.25),c=new V(l,t);c.position.set(0,.62,.8),this.mesh.add(c);const h=new st(.08,.06,.05),u=new V(h,n);u.position.set(0,.65,.93),this.mesh.add(u);const d=new st(.1,.15,.08),f=new V(d,t);f.position.set(-.12,.9,.5),f.rotation.z=-.2,this.mesh.add(f);const y=new V(d,t);y.position.set(.12,.9,.5),y.rotation.z=.2,this.mesh.add(y);const _=new st(.06,.04,.02),g=new It({color:16763904}),p=new V(_,g);p.position.set(-.1,.75,.75),this.mesh.add(p);const x=new V(_,g);x.position.set(.1,.75,.75),this.mesh.add(x);const b=new st(.15,.15,.4);this.tailMesh=new V(b,t),this.tailMesh.position.set(0,.6,-.6),this.tailMesh.rotation.x=-.3,this.mesh.add(this.tailMesh);const S=new st(.12,.35,.12),L=new It({color:8421504}),C=[[-.15,.175,-.3],[.15,.175,-.3],[-.15,.175,.3],[.15,.175,.3]];for(const w of C){const P=new V(S,L);P.position.set(w[0]??0,w[1]??0,w[2]??0),P.castShadow=!0,this.legMeshes.push(P),this.mesh.add(P)}}updateAnimation(t){super.updateAnimation(t),this.tailMesh&&(this.animData.currentState===ge.WALKING||this.animData.currentState===ge.RUNNING?this.tailMesh.rotation.y=Math.sin(this.animationTime*6)*.3:this.tailMesh.rotation.y=Math.sin(this.animationTime*2)*.15)}}class B_ extends Rn{tailMesh;constructor(t,e,n){super(Kt.FOX,t,e,n),this.width=.5,this.height=.7,this.createMesh()}createMesh(){const t=new It({color:16737792}),e=new It({color:16777215}),n=new It({color:1710618}),i=new st(.4,.35,.7);this.bodyMesh=new V(i,t),this.bodyMesh.position.set(0,.45,0),this.bodyMesh.castShadow=!0,this.mesh.add(this.bodyMesh);const r=new st(.3,.1,.5),o=new V(r,e);o.position.set(0,.3,0),this.mesh.add(o);const a=new st(.3,.25,.35);this.headMesh=new V(a,t),this.headMesh.position.set(0,.55,.45),this.headMesh.castShadow=!0,this.mesh.add(this.headMesh);const l=new st(.15,.12,.2),c=new V(l,t);c.position.set(0,.5,.68),this.mesh.add(c);const h=new st(.12,.08,.05),u=new V(h,e);u.position.set(0,.48,.78),this.mesh.add(u);const d=new st(.06,.04,.04),f=new V(d,n);f.position.set(0,.52,.8),this.mesh.add(f);const y=new st(.12,.18,.08),_=new V(y,t);_.position.set(-.1,.75,.4),this.mesh.add(_);const g=new V(y,t);g.position.set(.1,.75,.4),this.mesh.add(g);const p=new st(.1,.06,.06),x=new V(p,n);x.position.set(-.1,.85,.4),this.mesh.add(x);const b=new V(p,n);b.position.set(.1,.85,.4),this.mesh.add(b);const S=new st(.05,.04,.02),L=new It({color:4859904}),C=new V(S,L);C.position.set(-.08,.58,.62),this.mesh.add(C);const w=new V(S,L);w.position.set(.08,.58,.62),this.mesh.add(w);const P=new st(.15,.15,.5);this.tailMesh=new V(P,t),this.tailMesh.position.set(0,.45,-.55),this.tailMesh.rotation.x=.3,this.mesh.add(this.tailMesh);const T=new st(.12,.12,.15),E=new V(T,e);E.position.set(0,.5,-.85),this.mesh.add(E);const D=new st(.1,.28,.1),H=new It({color:16737792}),B=[[-.12,.14,-.22],[.12,.14,-.22],[-.12,.14,.22],[.12,.14,.22]];for(const K of B){const Z=new V(D,H);Z.position.set(K[0]??0,K[1]??0,K[2]??0),Z.castShadow=!0,this.legMeshes.push(Z),this.mesh.add(Z);const q=new st(.08,.06,.08),Q=new V(q,n);Q.position.set(K[0]??0,.03,K[2]??0),this.mesh.add(Q)}}updateAnimation(t){super.updateAnimation(t),this.tailMesh&&(this.animData.currentState===ge.WALKING||this.animData.currentState===ge.RUNNING?(this.tailMesh.rotation.y=Math.sin(this.animationTime*5)*.25,this.tailMesh.rotation.x=.3+Math.sin(this.animationTime*3)*.1):(this.tailMesh.rotation.y=Math.sin(this.animationTime*1.5)*.1,this.tailMesh.rotation.x=.3))}}const z_=10,G_=15,H_=5,W_={maxPerChunk:6,spawnChance:.25,minY:1},Wc={[ae.PLAINS]:{[Kt.COW]:3,[Kt.SHEEP]:3,[Kt.PIG]:2,[Kt.CHICKEN]:2,[Kt.RABBIT]:3,[Kt.FOX]:1},[ae.LAKE]:{[Kt.COW]:0,[Kt.SHEEP]:0,[Kt.PIG]:1,[Kt.CHICKEN]:2,[Kt.RABBIT]:1},[ae.MOUNTAIN]:{[Kt.COW]:1,[Kt.SHEEP]:3,[Kt.PIG]:0,[Kt.CHICKEN]:1,[Kt.WOLF]:3,[Kt.FOX]:2,[Kt.RABBIT]:1}};class V_{entityManager;world;config;spawnedChunks=new Set;constructor(t,e,n){this.entityManager=t,this.world=e,this.config={...W_,...n}}getChunkKey(t,e){return`${t},${e}`}spawnInChunk(t,e){const n=this.getChunkKey(t,e);if(this.spawnedChunks.has(n))return;for(let h=0;h<=2;h++)if(!this.world.isChunkLoaded(t,h,e))return;if(this.spawnedChunks.add(n),Math.random()>this.config.spawnChance)return;const i=t*16+8,r=e*16+8,o=this.world.getBiomeAt(i,r),a=Wc[o]||Wc[ae.PLAINS],l=Object.values(a).reduce((h,u)=>h+u,0);if(l===0)return;const c=1+Math.floor(Math.random()*this.config.maxPerChunk);for(let h=0;h<c&&this.entityManager.canSpawnInChunk(t,e);h++){const u=this.selectAnimalType(a,l);if(u===null)continue;const d=this.findSpawnPosition(t,e);if(!d)continue;const f=this.createAnimal(u,d.x,d.y,d.z);f&&this.entityManager.add(f)}}selectAnimalType(t,e){let n=Math.random()*e;for(const[i,r]of Object.entries(t))if(r!==void 0&&(n-=r,n<=0))return parseInt(i);return null}findSpawnPosition(t,e){for(let n=0;n<5;n++){const i=Math.floor(Math.random()*16),r=Math.floor(Math.random()*16),o=t*16+i,a=e*16+r;if(nl(o,a))continue;const l=this.world.getHeightAt(o,a);if(l<this.config.minY)continue;const c=Math.min(l+G_,127),h=Math.max(l-z_,0);let u=-1,d=!1;for(let _=c;_>=h;_--){const g=this.world.getBlock(o,_,a);if(g===m.WATER)break;if(ln(g)&&!Q0(g)&&!Oa(g)){u=_,d=!0;break}}if(!d||Math.abs(u-l)>H_)continue;const f=this.world.getBlock(o,u+1,a),y=this.world.getBlock(o,u+2,a);if(!(ln(f)||f===m.WATER)&&!(ln(y)||y===m.WATER))return new I(o+.5,u+1,a+.5)}return null}createAnimal(t,e,n,i){let r=null;switch(t){case Kt.COW:r=new L_(e,n,i);break;case Kt.SHEEP:r=new O_(e,n,i);break;case Kt.PIG:r=new N_(e,n,i);break;case Kt.CHICKEN:r=new k_(e,n,i);break;case Kt.RABBIT:r=new U_(e,n,i);break;case Kt.WOLF:r=new F_(e,n,i);break;case Kt.FOX:r=new B_(e,n,i);break;default:return null}return r&&(r.position.y=n+r.height/2),r}clearChunk(t,e){const n=this.getChunkKey(t,e);this.spawnedChunks.delete(n)}reset(){this.spawnedChunks.clear()}}var pn=(s=>(s[s.COMMON=0]="COMMON",s[s.TROPICAL=1]="TROPICAL",s))(pn||{});const X_={0:{type:0,name:"普通鱼",nameEn:"Common Fish",bodyWidth:.25,bodyHeight:.35,bodyDepth:.6,tailWidth:.04,tailHeight:.25,colors:[12632256],swimSpeed:1.5,turnRate:2},1:{type:1,name:"热带鱼",nameEn:"Tropical Fish",bodyWidth:.2,bodyHeight:.4,bodyDepth:.5,tailWidth:.04,tailHeight:.3,colors:[16737792,65535,16776960],swimSpeed:2,turnRate:2.5}};class yu extends il{fishType;config;mesh;velocity;targetDirection;animationTime=0;isTurning=!1;constructor(t,e,n,i){super(sl(),e,n,i),this.fishType=t,this.config=X_[t],this.mesh=new an;const r=Math.random()*Math.PI*2;this.velocity=new I(Math.cos(r)*this.config.swimSpeed,(Math.random()-.5)*.3,Math.sin(r)*this.config.swimSpeed),this.targetDirection=this.velocity.clone().normalize(),this.createMesh(),this.updateMeshPosition()}update(t,e,n){this.animationTime+=t,n&&this.checkWaterBoundary(n,t),this.isTurning&&(this.velocity.lerp(this.targetDirection.clone().multiplyScalar(this.config.swimSpeed),t*this.config.turnRate),this.velocity.clone().normalize().dot(this.targetDirection)>.95&&(this.isTurning=!1)),this.velocity.x+=(Math.random()-.5)*.1*t,this.velocity.z+=(Math.random()-.5)*.1*t,this.velocity.y+=(Math.random()-.5)*.05*t,this.velocity.y=Math.max(-.3,Math.min(.3,this.velocity.y)),this.velocity.length()>this.config.swimSpeed*1.2&&this.velocity.normalize().multiplyScalar(this.config.swimSpeed),this.position.add(this.velocity.clone().multiplyScalar(t)),this.velocity.lengthSq()>.001&&(this.rotation=Math.atan2(this.velocity.x,this.velocity.z)),this.updateMeshPosition(),this.updateAnimation(t)}checkWaterBoundary(t,e){const n=this.velocity.clone().normalize().multiplyScalar(1.5),i=this.position.clone().add(n),r=Math.floor(i.x),o=Math.floor(i.y),a=Math.floor(i.z);this.isWaterAt(t,r,o,a)||this.turnAround();const c=Math.floor(this.position.y+.5),h=Math.floor(this.position.y-.5);!this.isWaterAt(t,r,c,a)&&this.velocity.y>0&&(this.velocity.y=-Math.abs(this.velocity.y)),!this.isWaterAt(t,r,h,a)&&this.velocity.y<0&&(this.velocity.y=Math.abs(this.velocity.y))}isWaterAt(t,e,n,i){return"getBlock"in t?t.getBlock(e,n,i)===9:!0}turnAround(){this.targetDirection=new I(-this.velocity.x+(Math.random()-.5)*.5,(Math.random()-.5)*.2,-this.velocity.z+(Math.random()-.5)*.5).normalize(),this.isTurning=!0}updateMeshPosition(){this.mesh.position.copy(this.position),this.mesh.rotation.y=this.rotation}updateAnimation(t){}getMesh(){return this.mesh}dispose(){this.mesh.traverse(t=>{t instanceof V&&(t.geometry.dispose(),Array.isArray(t.material)?t.material.forEach(e=>e.dispose()):t.material.dispose())})}}class K_ extends yu{bodyMesh;tailMesh;finMeshes=[];constructor(t,e,n){super(pn.COMMON,t,e,n)}createMesh(){this.finMeshes=[];const t=new It({color:12632256}),e=new It({color:10526880}),n=new st(this.config.bodyWidth,this.config.bodyHeight,this.config.bodyDepth);this.bodyMesh=new V(n,t),this.bodyMesh.castShadow=!0,this.mesh.add(this.bodyMesh);const i=new st(this.config.tailWidth,this.config.tailHeight,.1);this.tailMesh=new V(i,e),this.tailMesh.position.set(0,0,-this.config.bodyDepth/2-.05),this.mesh.add(this.tailMesh);const r=new st(.02,.08,.15),o=new V(r,e);o.position.set(0,this.config.bodyHeight/2+.03,0),this.finMeshes.push(o),this.mesh.add(o);const a=new st(.08,.02,.06),l=new V(a,e);l.position.set(-this.config.bodyWidth/2-.03,0,.05),l.rotation.z=-.3,this.finMeshes.push(l),this.mesh.add(l);const c=new V(a,e);c.position.set(this.config.bodyWidth/2+.03,0,.05),c.rotation.z=.3,this.finMeshes.push(c),this.mesh.add(c);const h=new st(.03,.03,.02),u=new It({color:0}),d=new V(h,u);d.position.set(-this.config.bodyWidth/2+.01,.03,this.config.bodyDepth/2-.05),this.mesh.add(d);const f=new V(h,u);f.position.set(this.config.bodyWidth/2-.01,.03,this.config.bodyDepth/2-.05),this.mesh.add(f)}updateAnimation(t){this.tailMesh&&(this.tailMesh.rotation.y=Math.sin(this.animationTime*10)*.4),this.bodyMesh&&(this.bodyMesh.rotation.y=Math.sin(this.animationTime*8)*.1);for(let e=0;e<this.finMeshes.length;e++){const n=this.finMeshes[e];n&&e>0&&(n.rotation.z=(e===1?-.3:.3)+Math.sin(this.animationTime*6)*.15)}}}class Y_ extends yu{bodyMesh;tailMesh;finMeshes=[];primaryColor=16737792;secondaryColor=65535;constructor(t,e,n){super(pn.TROPICAL,t,e,n);const i=this.config.colors;this.primaryColor=i[Math.floor(Math.random()*i.length)]??16737792,this.secondaryColor=i[Math.floor(Math.random()*i.length)]??65535,this.updateMeshColors()}updateMeshColors(){this.bodyMesh&&this.bodyMesh.material instanceof It&&this.bodyMesh.material.color.setHex(this.primaryColor),this.mesh.traverse(t=>{t instanceof V&&t!==this.bodyMesh&&t.material instanceof It&&t.material.color.getHex()!==0&&t.material.color.setHex(this.secondaryColor)})}createMesh(){this.finMeshes=[];const t=new It({color:this.primaryColor}),e=new It({color:this.secondaryColor}),n=new st(this.config.bodyWidth,this.config.bodyHeight,this.config.bodyDepth);this.bodyMesh=new V(n,t),this.bodyMesh.castShadow=!0,this.mesh.add(this.bodyMesh);const i=new st(this.config.bodyWidth+.01,.05,this.config.bodyDepth*.8),r=new V(i,e);r.position.set(0,.05,0),this.mesh.add(r);const o=new V(i,e);o.position.set(0,-.05,0),this.mesh.add(o);const a=new st(this.config.tailWidth,this.config.tailHeight,.12);this.tailMesh=new V(a,e),this.tailMesh.position.set(0,0,-this.config.bodyDepth/2-.06),this.mesh.add(this.tailMesh);const l=new st(.02,.12,.2),c=new V(l,e);c.position.set(0,this.config.bodyHeight/2+.05,-.02),this.finMeshes.push(c),this.mesh.add(c);const h=new st(.02,.08,.1),u=new V(h,t);u.position.set(0,-this.config.bodyHeight/2-.03,.05),this.finMeshes.push(u),this.mesh.add(u);const d=new st(.1,.02,.08),f=new V(d,e);f.position.set(-this.config.bodyWidth/2-.04,0,.08),f.rotation.z=-.4,this.finMeshes.push(f),this.mesh.add(f);const y=new V(d,e);y.position.set(this.config.bodyWidth/2+.04,0,.08),y.rotation.z=.4,this.finMeshes.push(y),this.mesh.add(y);const _=new st(.04,.04,.02),g=new It({color:0}),p=new V(_,g);p.position.set(-this.config.bodyWidth/2+.01,.05,this.config.bodyDepth/2-.04),this.mesh.add(p);const x=new V(_,g);x.position.set(this.config.bodyWidth/2-.01,.05,this.config.bodyDepth/2-.04),this.mesh.add(x)}updateAnimation(t){this.tailMesh&&(this.tailMesh.rotation.y=Math.sin(this.animationTime*12)*.5),this.bodyMesh&&(this.bodyMesh.rotation.y=Math.sin(this.animationTime*10)*.12);for(let e=0;e<this.finMeshes.length;e++){const n=this.finMeshes[e];n&&(e===0?n.rotation.x=Math.sin(this.animationTime*4)*.1:e>=2&&(n.rotation.z=(e===2?-.4:.4)+Math.sin(this.animationTime*8)*.2))}}}const q_={maxPerChunk:6,spawnChance:.8,minWaterDepth:1},Vc={[ae.PLAINS]:{[pn.COMMON]:4,[pn.TROPICAL]:1},[ae.LAKE]:{[pn.COMMON]:5,[pn.TROPICAL]:2},[ae.MOUNTAIN]:{[pn.COMMON]:3,[pn.TROPICAL]:0}};class $_{entityManager;world;config;spawnedChunks=new Set;constructor(t,e,n){this.entityManager=t,this.world=e,this.config={...q_,...n}}getChunkKey(t,e){return`fish_${t},${e}`}spawnInChunk(t,e){const n=this.getChunkKey(t,e);if(this.spawnedChunks.has(n))return;this.spawnedChunks.add(n);let i=!1;for(let f=0;f<16;f+=4){for(let y=0;y<16;y+=4){const _=t*16+f,g=e*16+y;if(this.world.getHeightAt(_,g)<es){i=!0;break}}if(i)break}if(!i)return;const r=t*16+8,o=e*16+8,a=this.world.getBiomeAt(r,o),l=a===ae.LAKE?1:this.config.spawnChance;if(Math.random()>l)return;const c=Vc[a]||Vc[ae.PLAINS],h=Object.values(c).reduce((f,y)=>f+(y??0),0);if(h===0)return;const u=2+Math.floor(Math.random()*this.config.maxPerChunk);let d=0;for(let f=0;f<u;f++){const y=this.findWaterSpawnPosition(t,e);if(!y)continue;const _=this.selectFishType(c,h);if(_===null)continue;const g=this.createFish(_,y.x,y.y,y.z);g&&this.entityManager.add(g)&&d++}d>0&&console.log(`[FishSpawner] Spawned ${d} fish in chunk (${t}, ${e})`)}selectFishType(t,e){let n=Math.random()*e;for(const[i,r]of Object.entries(t))if(!(r===void 0||r===0)&&(n-=r,n<=0))return parseInt(i);return null}findWaterSpawnPosition(t,e){for(let n=0;n<20;n++){const i=Math.floor(Math.random()*16),r=Math.floor(Math.random()*16),o=t*16+i,a=e*16+r;if(nl(o,a))continue;const l=this.world.getHeightAt(o,a);if(l>=es)continue;const c=es-l;if(c<this.config.minWaterDepth)continue;const h=l+1+Math.floor(c/2);if(this.world.getBlock(o,h,a)===m.WATER)return new I(o+.5,h+.5,a+.5)}return null}createFish(t,e,n,i){switch(t){case pn.COMMON:return new K_(e,n,i);case pn.TROPICAL:return new Y_(e,n,i);default:return null}}clearChunk(t,e){const n=this.getChunkKey(t,e);this.spawnedChunks.delete(n)}reset(){this.spawnedChunks.clear()}}const Z_=`
varying vec2 vUv;
varying vec3 vWorldPosition;

void main() {
  vUv = uv;
  vec4 worldPos = modelMatrix * vec4(position, 1.0);
  vWorldPosition = worldPos.xyz;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`,j_=`
uniform float uTime;
uniform vec3 uTopColor;
uniform vec3 uHorizonColor;
uniform float uSunIntensity;
uniform vec3 uSunDirection;
uniform float uIsRaining;

varying vec2 vUv;
varying vec3 vWorldPosition;

void main() {
  vec3 viewDir = normalize(vWorldPosition);
  float heightFactor = max(0.0, viewDir.y);
  heightFactor = pow(heightFactor, 0.6);
  
  vec3 skyColor = mix(uHorizonColor, uTopColor, heightFactor);
  
  float sunDot = max(0.0, dot(viewDir, uSunDirection));
  float sunGlow = pow(sunDot, 32.0) * uSunIntensity;
  float sunHalo = pow(sunDot, 8.0) * uSunIntensity * 0.3;
  
  skyColor += vec3(1.0, 0.9, 0.7) * sunGlow;
  skyColor += vec3(1.0, 0.8, 0.6) * sunHalo;
  
  skyColor *= (1.0 - uIsRaining * 0.4);
  
  gl_FragColor = vec4(skyColor, 1.0);
}
`,J_=`
varying vec2 vUv;

void main() {
  vUv = uv;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`,Q_=`
uniform vec3 uCoreColor;
uniform vec3 uGlowColor;
uniform float uGlowIntensity;

varying vec2 vUv;

void main() {
  // Distance from center (0 at center, 1 at edge)
  float dist = length(vUv - 0.5) * 2.0;
  
  // Core: bright center with soft falloff
  float core = 1.0 - smoothstep(0.0, 0.4, dist);
  
  // Glow: extends beyond core with gradual falloff
  float glow = 1.0 - smoothstep(0.2, 1.0, dist);
  glow = pow(glow, 1.5) * uGlowIntensity;
  
  // Combine colors
  vec3 color = mix(uGlowColor, uCoreColor, core);
  
  // Alpha: solid core, fading glow
  float alpha = max(core, glow * 0.8);
  
  // Discard fully transparent pixels
  if (alpha < 0.01) discard;
  
  gl_FragColor = vec4(color, alpha);
}
`;class tv{scene;skyDome;skyMaterial;sun;sunMaterial;moon;stars;celestialGroup;skyRadius=500;celestialDistance=400;isRaining=!1;constructor(t){this.scene=t,this.celestialGroup=new an,this.scene.add(this.celestialGroup),this.skyMaterial=this.createSkyMaterial(),this.skyDome=this.createSkyDome(),this.scene.add(this.skyDome),this.sun=this.createSun(),this.celestialGroup.add(this.sun),this.moon=this.createMoon(),this.celestialGroup.add(this.moon),this.stars=this.createStars(),this.scene.add(this.stars)}createSkyMaterial(){return new wn({vertexShader:Z_,fragmentShader:j_,uniforms:{uTime:{value:0},uTopColor:{value:new Dt(8900331)},uHorizonColor:{value:new Dt(11393254)},uSunIntensity:{value:1},uSunDirection:{value:new I(0,1,0)},uIsRaining:{value:0}},side:Be,depthWrite:!1})}createSkyDome(){const t=new Fr(this.skyRadius,32,32),e=new V(t,this.skyMaterial);return e.renderOrder=-1e3,e}createSun(){const t=new Ci(60,60);this.sunMaterial=new wn({vertexShader:J_,fragmentShader:Q_,uniforms:{uCoreColor:{value:new Dt(16775920)},uGlowColor:{value:new Dt(16775388)},uGlowIntensity:{value:1}},transparent:!0,side:Ve,depthWrite:!1,blending:Ko});const e=new V(t,this.sunMaterial);return e.position.set(0,0,-this.celestialDistance),e}createMoon(){const t=new Fr(15,16,16),e=new Gs({color:15658734,fog:!1}),n=new V(t,e);return n.position.set(0,0,this.celestialDistance),n}createStars(){const e=new Float32Array(3e3),n=new Float32Array(1e3);for(let o=0;o<1e3;o++){const a=Math.random()*Math.PI*2,l=Math.acos(2*Math.random()-1),c=this.skyRadius*.95;e[o*3]=c*Math.sin(l)*Math.cos(a),e[o*3+1]=c*Math.cos(l),e[o*3+2]=c*Math.sin(l)*Math.sin(a),n[o]=1+Math.random()*2}const i=new Ke;i.setAttribute("position",new Qe(e,3)),i.setAttribute("size",new Qe(n,1));const r=new Ja({color:16777215,size:2,sizeAttenuation:!1,transparent:!0,opacity:0});return new jh(i,r)}update(t,e){this.skyDome.position.copy(e),this.celestialGroup.position.copy(e),this.stars.position.copy(e);const n=t.getSunAngle(),i=t.getTimePeriod(),r=t.getAmbientIntensity();this.celestialGroup.rotation.x=n,this.sun.lookAt(e),this.updateSunColors(i,t.getTicks()),this.updateSkyColors(i,t.getTicks());const o=new I(0,Math.sin(n),-Math.cos(n));this.skyMaterial.uniforms.uSunDirection.value.copy(o),this.skyMaterial.uniforms.uSunIntensity.value=r;let a=0;i===Se.NIGHT?a=1:i===Se.SUNSET&&(a=.5);const l=this.stars.material;l.opacity=a,this.skyMaterial.uniforms.uIsRaining.value=this.isRaining?1:0}updateSunColors(t,e){const n=xr[t];let i=n,r=0;const o=e%24e3;t===Se.SUNRISE?(r=o/2e3,i=xr[Se.DAY]):t===Se.SUNSET?(r=(o-1e4)/2e3,i=xr[Se.NIGHT]):t===Se.NIGHT&&o>22e3&&(r=(o-22e3)/2e3,i=xr[Se.SUNRISE]);const a=new Dt(n.core),l=new Dt(n.glow);r>0&&(a.lerp(new Dt(i.core),r),l.lerp(new Dt(i.glow),r)),this.sunMaterial.uniforms.uCoreColor.value.copy(a),this.sunMaterial.uniforms.uGlowColor.value.copy(l);const c=t===Se.NIGHT?.3:1;this.sunMaterial.uniforms.uGlowIntensity.value=c}updateSkyColors(t,e){const n=Mr[t];let i=0,r=n;const o=e%24e3;t===Se.SUNRISE?(i=o/2e3,r=Mr[Se.DAY]):t===Se.SUNSET?(i=(o-1e4)/2e3,r=Mr[Se.NIGHT]):t===Se.NIGHT&&o>22e3&&(i=(o-22e3)/2e3,r=Mr[Se.SUNRISE]);const a=new Dt(n.top),l=new Dt(n.horizon);i>0&&(a.lerp(new Dt(r.top),i),l.lerp(new Dt(r.horizon),i)),this.skyMaterial.uniforms.uTopColor.value.copy(a),this.skyMaterial.uniforms.uHorizonColor.value.copy(l)}setRaining(t){this.isRaining=t}getAmbientIntensity(){return this.skyMaterial.uniforms.uSunIntensity.value}dispose(){this.skyDome.geometry.dispose(),this.skyMaterial.dispose(),this.sun.geometry.dispose(),this.sunMaterial.dispose(),this.moon.geometry.dispose(),this.moon.material.dispose(),this.stars.geometry.dispose(),this.stars.material.dispose(),this.scene.remove(this.skyDome),this.scene.remove(this.celestialGroup),this.scene.remove(this.stars)}}class ev{type=ke.CLEAR;duration;transitionProgress=1;targetType=ke.CLEAR;isTransitioning=!1;constructor(){this.duration=this.getRandomDuration(ke.CLEAR)}update(t){if(this.isTransitioning){this.transitionProgress+=t/vn.TRANSITION_DURATION,this.transitionProgress>=1&&(this.transitionProgress=1,this.isTransitioning=!1,this.type=this.targetType,this.duration=this.getRandomDuration(this.type));return}this.duration-=t,this.duration<=0&&this.checkWeatherChange()}checkWeatherChange(){this.type===ke.CLEAR?Math.random()<vn.RAIN_CHANCE?this.startTransition(ke.RAIN):this.duration=this.getRandomDuration(ke.CLEAR):this.startTransition(ke.CLEAR)}startTransition(t){this.targetType=t,this.isTransitioning=!0,this.transitionProgress=0}getRandomDuration(t){return t===ke.RAIN?vn.RAIN_DURATION_MIN+Math.random()*(vn.RAIN_DURATION_MAX-vn.RAIN_DURATION_MIN):vn.CLEAR_DURATION_MIN+Math.random()*(vn.CLEAR_DURATION_MAX-vn.CLEAR_DURATION_MIN)}getType(){return this.type}getWeatherName(){return Vy(this.type)}isRaining(){return this.type===ke.RAIN||this.isTransitioning&&this.targetType===ke.RAIN&&this.transitionProgress>.5}getRainIntensity(){return this.type===ke.RAIN&&!this.isTransitioning?1:this.isTransitioning?this.targetType===ke.RAIN?this.transitionProgress:1-this.transitionProgress:0}getAmbientDimFactor(){return this.getRainIntensity()*vn.RAIN_AMBIENT_DIM}setWeather(t){this.startTransition(t)}toggleRain(){this.isRaining()?this.setWeather(ke.CLEAR):this.setWeather(ke.RAIN)}}class nv{scene;particles;geometry;material;positions;velocities;areaWidth=60;areaDepth=60;areaHeight=40;fallSpeed=25;particleCount;isVisible=!1;intensity=0;playerPosition=new I;isPlayerSubmerged=!1;constructor(t){this.scene=t,this.particleCount=vn.RAIN_PARTICLE_COUNT,this.geometry=new Ke,this.positions=new Float32Array(this.particleCount*3),this.velocities=new Float32Array(this.particleCount),this.initializeParticles(),this.material=new Ja({color:11184895,size:.15,transparent:!0,opacity:.6,sizeAttenuation:!0,depthWrite:!1}),this.particles=new jh(this.geometry,this.material),this.particles.visible=!1,this.particles.frustumCulled=!1,this.scene.add(this.particles)}initializeParticles(){for(let t=0;t<this.particleCount;t++)this.resetParticle(t),this.positions[t*3+1]=Math.random()*this.areaHeight;this.geometry.setAttribute("position",new Qe(this.positions,3))}resetParticle(t){const e=t*3;this.positions[e]=(Math.random()-.5)*this.areaWidth,this.positions[e+1]=this.areaHeight,this.positions[e+2]=(Math.random()-.5)*this.areaDepth,this.velocities[t]=this.fallSpeed*(.8+Math.random()*.4)}update(t){if(!this.isVisible||this.isPlayerSubmerged){this.particles.visible=!1;return}this.particles.visible=!0;for(let e=0;e<this.particleCount;e++){const n=e*3,i=this.velocities[e]??this.fallSpeed;this.positions[n+1]=(this.positions[n+1]??0)-i*t,this.positions[n]=(this.positions[n]??0)+(Math.random()-.5)*.1,this.positions[n+2]=(this.positions[n+2]??0)+(Math.random()-.5)*.1,(this.positions[n+1]??0)<0&&this.resetParticle(e)}this.geometry.attributes.position.needsUpdate=!0,this.particles.position.set(this.playerPosition.x,this.playerPosition.y,this.playerPosition.z),this.material.opacity=.6*this.intensity}setVisible(t){this.isVisible=t,t||(this.particles.visible=!1)}setIntensity(t){this.intensity=Math.max(0,Math.min(1,t))}setPlayerPosition(t){this.playerPosition.copy(t)}setPlayerSubmerged(t){this.isPlayerSubmerged=t}dispose(){this.geometry.dispose(),this.material.dispose(),this.scene.remove(this.particles)}}const Le=36,be=9,Ze=64,iv=2,sv=8,rv=300,Fo=.25,ov=3,av=.4,lv=.15,cv=Math.PI,hv=20,uv=500;function Nt(){return{itemType:null,count:0}}function mt(s){return s.itemType===null||s.count===0}function dv(s,t){return mt(s)?!0:s.itemType===t&&s.count<Ze}var Fa=(s=>(s.Falling="falling",s.Bouncing="bouncing",s.Resting="resting",s.BeingPickedUp="beingPickedUp",s))(Fa||{});class Hs extends il{itemType;count;spawnTime;state="falling";velocity;bounceCount=0;mesh=null;shouldBeDestroyed=!1;constructor(t,e,n,i,r=1){super(sl(),t,e,n),this.itemType=i,this.count=Math.min(r,64),this.spawnTime=Date.now(),this.velocity=new I((Math.random()-.5)*2,lv*20,(Math.random()-.5)*2),this.rotation=Math.random()*Math.PI*2,this.createMesh()}createMesh(){const t=Fo;try{const e=Hn(),n=e.getTexture(),i=e.getConfig(),r=Cn(this.itemType,"top"),o=Cn(this.itemType,"bottom"),a=Cn(this.itemType,"side"),l=1/i.columns,c=1/i.rows,h=(i.rows-1)*c,u=1,d=new st(t,t,t),f=d.getAttribute("uv"),y=f.array,_=(p,x)=>{const b=x*l,S=(x+1)*l,L=p*8;y[L+0]=b,y[L+1]=h,y[L+2]=S,y[L+3]=h,y[L+4]=b,y[L+5]=u,y[L+6]=S,y[L+7]=u};_(0,a),_(1,a),_(2,r),_(3,o),_(4,a),_(5,a),f.needsUpdate=!0;const g=new It({map:n,transparent:!1});this.mesh=new V(d,g)}catch{const e=new st(t,t,t),n=He[this.itemType]??8421504,i=new It({color:n});this.mesh=new V(e,i)}this.mesh.position.copy(this.position),this.mesh.castShadow=!0,this.mesh.receiveShadow=!0}update(t,e,n){if(!this.isActive||this.shouldBeDestroyed)return;if((Date.now()-this.spawnTime)/1e3>=rv){this.shouldBeDestroyed=!0;return}switch(this.state){case"falling":case"bouncing":this.updatePhysics(t,n);break;case"resting":this.checkPlayerProximity(e);break;case"beingPickedUp":this.updatePickup(t,e);break}this.state!=="beingPickedUp"&&(this.rotation+=cv*t),this.mesh&&(this.mesh.position.copy(this.position),this.mesh.rotation.y=this.rotation)}updatePhysics(t,e){this.velocity.y-=hv*t;const n=this.position.x+this.velocity.x*t,i=this.position.y+this.velocity.y*t,r=this.position.z+this.velocity.z*t;if(e){const o=this.findGroundLevel(e,n,i,r);i<=o+Fo/2?(this.position.y=o+Fo/2,this.bounceCount<ov&&Math.abs(this.velocity.y)>1?(this.velocity.y=-this.velocity.y*av,this.velocity.x*=.8,this.velocity.z*=.8,this.bounceCount++,this.state="bouncing"):(this.velocity.set(0,0,0),this.state="resting")):this.position.y=i,this.position.x=n,this.position.z=r}else this.position.x=n,this.position.y=Math.max(.5,i),this.position.z=r,this.position.y<=.5&&(this.velocity.set(0,0,0),this.state="resting");this.velocity.x*=.98,this.velocity.z*=.98}findGroundLevel(t,e,n,i){const r=Math.floor(e),o=Math.floor(i);for(let a=Math.floor(n);a>=0;a--){const l=t.getBlock(r,a,o);if(l!==null&&l!==m.AIR&&l!==m.WATER)return a+1}return 0}checkPlayerProximity(t){this.position.distanceTo(t)<=iv&&(this.state="beingPickedUp")}updatePickup(t,e){const n=new I().subVectors(e,this.position).normalize(),i=sv;this.position.add(n.multiplyScalar(i*t)),this.position.distanceTo(e)<.5&&(this.shouldBeDestroyed=!0)}startPickup(t){this.state="beingPickedUp"}shouldDestroy(){return this.shouldBeDestroyed}markForDestruction(){this.shouldBeDestroyed=!0}resetDestruction(){this.shouldBeDestroyed=!1}getMesh(){return this.mesh}dispose(){this.mesh&&(this.mesh.geometry&&this.mesh.geometry.dispose(),this.mesh.material&&(Array.isArray(this.mesh.material)?this.mesh.material.forEach(t=>t.dispose()):this.mesh.material.dispose()),this.mesh=null),this.isActive=!1}}class fv{world;renderer;chunkRenderer;chunkManager;underwaterEffect;timeSystem;entityManager;animalSpawner;fishSpawner;skyRenderer;weatherSystem;rainEffect;camera;isRunning=!1;lastTime=0;frameCount=0;fpsTime=0;currentFps=0;playerPosition=new I;player=null;itemEntities=new Map;updateCallback=null;constructor(t,e){this.world=new Dy(e),console.log(`[World] Seed: ${this.world.getSeed()}`),this.renderer=new Py(t),this.chunkRenderer=new By(this.renderer.getScene()),this.chunkRenderer.setWorldBlockGetter((o,a,l)=>{const c=Math.floor(o),h=Math.floor(a),u=Math.floor(l),d=Math.floor(c/16),f=Math.floor(h/16),y=Math.floor(u/16);return this.world.isChunkLoaded(d,f,y)?this.world.getBlock(o,a,l):null}),this.chunkManager=new Gy(this.world,this.chunkRenderer),this.underwaterEffect=new Hy(this.renderer.getScene()),this.timeSystem=new Xy(6e3),this.entityManager=new P_(this.renderer.getScene()),this.animalSpawner=new V_(this.entityManager,this.world),this.fishSpawner=new $_(this.entityManager,this.world),this.skyRenderer=new tv(this.renderer.getScene()),this.weatherSystem=new ev,this.rainEffect=new nv(this.renderer.getScene()),this.chunkManager.onChunkLoaded=(o,a,l)=>{a>=2&&(this.animalSpawner.spawnInChunk(o,l),this.fishSpawner.spawnInChunk(o,l))},this.chunkManager.onChunkUnloaded=(o,a,l)=>{a>=2&&(this.entityManager.removeChunk(o,l),this.animalSpawner.clearChunk(o,l),this.fishSpawner.clearChunk(o,l))};const{width:n,height:i}=this.renderer.getSize();this.camera=new We(75,n/i,.1,1e3);const r=this.world.getSpawnPosition();this.camera.position.set(r.x,r.y,r.z),this.playerPosition.copy(this.camera.position),window.addEventListener("resize",this.handleResize.bind(this)),this.chunkManager.update(r.x,r.y,r.z)}handleResize(){const{width:t,height:e}=this.renderer.getSize();this.camera.aspect=t/e,this.camera.updateProjectionMatrix()}setUpdateCallback(t){this.updateCallback=t}setPlayer(t){this.player=t}setPlayerPosition(t,e,n){this.playerPosition.set(t,e,n)}start(){this.isRunning||(this.isRunning=!0,this.lastTime=performance.now(),this.fpsTime=this.lastTime,this.gameLoop())}stop(){this.isRunning=!1}gameLoop(){if(!this.isRunning)return;requestAnimationFrame(()=>this.gameLoop());const t=performance.now(),e=(t-this.lastTime)/1e3;this.lastTime=t,this.frameCount++,t-this.fpsTime>=1e3&&(this.currentFps=this.frameCount,this.frameCount=0,this.fpsTime=t,this.updateFpsDisplay()),this.updateCallback&&this.updateCallback(e),this.timeSystem.update(e),this.entityManager.update(e,this.playerPosition,this.world),this.updateItemEntities(e),this.skyRenderer.update(this.timeSystem,this.camera.position),this.weatherSystem.update(e),this.rainEffect.setVisible(this.weatherSystem.isRaining()),this.rainEffect.setIntensity(this.weatherSystem.getRainIntensity()),this.rainEffect.setPlayerPosition(this.playerPosition),this.player&&this.rainEffect.setPlayerSubmerged(this.player.isSubmerged),this.rainEffect.update(e),this.skyRenderer.setRaining(this.weatherSystem.isRaining());const n=this.timeSystem.getAmbientIntensity(),i=1-this.weatherSystem.getAmbientDimFactor();this.renderer.setAmbientIntensity(n*i),this.player&&this.underwaterEffect.update(this.player.isSubmerged),this.chunkManager.update(this.playerPosition.x,this.playerPosition.y,this.playerPosition.z);const r=this.world.getDirtyChunks();for(const o of r)this.chunkRenderer.updateChunkMesh(o);this.chunkRenderer.update(this.camera),this.renderer.render(this.camera)}updateFpsDisplay(){const t=document.getElementById("fps-counter");if(t){const e=this.chunkManager.getLoadedCount(),n=this.chunkRenderer.getVisibleChunkCount(),i=this.entityManager.getCount(),r=this.timeSystem.getFormattedTime(),o=this.weatherSystem.getWeatherName();t.textContent=`FPS: ${this.currentFps} | Chunks: ${n}/${e} | Entities: ${i} | ${r} | ${o}`}}getCamera(){return this.camera}getWorld(){return this.world}getRenderer(){return this.renderer}getChunkRenderer(){return this.chunkRenderer}getChunkManager(){return this.chunkManager}getUnderwaterEffect(){return this.underwaterEffect}getTimeSystem(){return this.timeSystem}getEntityManager(){return this.entityManager}getSkyRenderer(){return this.skyRenderer}getWeatherSystem(){return this.weatherSystem}getFps(){return this.currentFps}addItemEntity(t){if(this.itemEntities.size>=uv){const n=this.itemEntities.keys().next().value;n&&this.removeItemEntity(n)}this.itemEntities.set(t.id,t);const e=t.getMesh();return e&&this.renderer.getScene().add(e),!0}removeItemEntity(t){const e=this.itemEntities.get(t);if(!e)return!1;const n=e.getMesh();return n&&this.renderer.getScene().remove(n),e.dispose(),this.itemEntities.delete(t),!0}updateItemEntities(t){if(!this.player)return;const e=this.playerPosition,n=[];for(const[i,r]of this.itemEntities)if(r.update(t,e,this.world),r.shouldDestroy())if(r.position.distanceTo(e)<.5){const a=this.player.inventory.addItem(r.itemType,r.count);a>0?(r.count-=a,Ae.getInstance().playPickupSound(r.position.x,r.position.y,r.position.z),r.count<=0?n.push(i):(r.state=Fa.Resting,r.resetDestruction())):(r.state=Fa.Resting,r.resetDestruction())}else n.push(i);for(const i of n)this.removeItemEntity(i)}getItemEntityCount(){return this.itemEntities.size}dispose(){this.stop(),window.removeEventListener("resize",this.handleResize.bind(this));for(const[,t]of this.itemEntities){const e=t.getMesh();e&&this.renderer.getScene().remove(e),t.dispose()}this.itemEntities.clear(),this.rainEffect.dispose(),this.skyRenderer.dispose(),this.entityManager.dispose(),this.underwaterEffect.dispose(),this.chunkRenderer.dispose(),this.world.dispose(),this.renderer.dispose()}}class pv{_slots;_selectedSlot=0;onChangeCallback=null;onSelectionChangeCallback=null;onInventoryChangeCallback=null;constructor(){this._slots=Array.from({length:Le},()=>Nt())}get slots(){return this._slots}get selectedSlot(){return this._selectedSlot}set selectedSlot(t){t>=0&&t<be&&(this._selectedSlot=t,this.notifyChange(),this.notifySelectionChange())}setOnChange(t){this.onChangeCallback=t}setOnSelectionChange(t){this.onSelectionChangeCallback=t}setOnInventoryChange(t){this.onInventoryChangeCallback=t}notifyChange(){this.onChangeCallback&&this.onChangeCallback()}notifySelectionChange(){this.onSelectionChangeCallback&&this.onSelectionChangeCallback()}notifyInventoryChange(){this.onInventoryChangeCallback&&this.onInventoryChangeCallback()}addItem(t,e){if(e<=0||t===m.AIR)return 0;let n=e,i=0;for(let r=0;r<be&&n>0;r++){const o=this._slots[r];if(o.itemType===t&&o.count<Ze){const a=Math.min(n,Ze-o.count);o.count+=a,n-=a,i+=a}}for(let r=be;r<Le&&n>0;r++){const o=this._slots[r];if(o.itemType===t&&o.count<Ze){const a=Math.min(n,Ze-o.count);o.count+=a,n-=a,i+=a}}for(let r=0;r<be&&n>0;r++){const o=this._slots[r];if(mt(o)){const a=Math.min(n,Ze);o.itemType=t,o.count=a,n-=a,i+=a}}for(let r=be;r<Le&&n>0;r++){const o=this._slots[r];if(mt(o)){const a=Math.min(n,Ze);o.itemType=t,o.count=a,n-=a,i+=a}}return i>0&&(this.notifyChange(),this.notifyInventoryChange()),i}removeItem(t,e){if(t<0||t>=Le||e<=0)return 0;const n=this._slots[t];if(mt(n))return 0;const i=Math.min(e,n.count);return n.count-=i,n.count<=0&&(n.itemType=null,n.count=0),i>0&&(this.notifyChange(),this.notifyInventoryChange()),i}swapSlots(t,e){if(t<0||t>=Le||e<0||e>=Le||t===e)return;const n=this._slots[t],i=this._slots[e];if(n.itemType!==null&&n.itemType===i.itemType&&i.count<Ze){const r=Math.min(n.count,Ze-i.count);i.count+=r,n.count-=r,n.count<=0&&(n.itemType=null,n.count=0)}else{const r=n.itemType,o=n.count;n.itemType=i.itemType,n.count=i.count,i.itemType=r,i.count=o}this.notifyChange()}getSlot(t){return t<0||t>=Le?null:this._slots[t]}setSlot(t,e){t<0||t>=Le||(this._slots[t]={...e},this.notifyChange(),this.notifyInventoryChange())}canAddItem(t,e){if(t===m.AIR||e<=0)return!1;let n=e;for(const i of this._slots)if(i.itemType===t&&i.count<Ze&&(n-=Ze-i.count,n<=0))return!0;for(const i of this._slots)if(mt(i)&&(n-=Ze,n<=0))return!0;return n<=0}addItemWithDurability(t,e,n,i){if(e<=0||t===m.AIR)return 0;let r=0;for(let o=0;o<Le&&r<e;o++){const a=this._slots[o];mt(a)&&(a.itemType=t,a.count=1,a.durability=n,a.maxDurability=i,r++)}return r>0&&(this.notifyChange(),this.notifyInventoryChange()),r}getSelectedItem(){return this._slots[this._selectedSlot]}isFull(){return this._slots.every(t=>t.itemType!==null&&t.count>=Ze)}canAccept(t){return t===m.AIR?!1:this._slots.some(e=>dv(e,t))}getItemCount(t){return this._slots.reduce((e,n)=>n.itemType===t?e+n.count:e,0)}clear(){this._slots.forEach(t=>{t.itemType=null,t.count=0}),this.notifyChange()}serialize(){return{slots:this._slots.map(t=>({itemType:t.itemType,count:t.count,durability:t.durability,maxDurability:t.maxDurability})),selectedSlot:this._selectedSlot}}deserialize(t){if(!(!t||!t.slots)){for(let e=0;e<Math.min(t.slots.length,Le);e++){const n=t.slots[e];n&&(this._slots[e]={itemType:n.itemType,count:n.count,durability:n.durability,maxDurability:n.maxDurability})}typeof t.selectedSlot=="number"&&t.selectedSlot>=0&&t.selectedSlot<be&&(this._selectedSlot=t.selectedSlot),this.notifyChange()}}}const xi=20,mv=.5,Xc=.5,gv=.3,zn=20,yv=.1,_v=.2,vv=.05,Ba=4,Sv=18,Mv=1,xv=1,Kc=4,Yc=1,bn=10,Ev=2,qc=1,$c=3,bv=1,Tv=4,Zc=.5,Av=1,Cv=.5;var ei=(s=>(s.FALL="fall",s.DROWNING="drowning",s.LAVA="lava",s.CACTUS="cactus",s.STARVATION="starvation",s.PLAYER_ATTACK="player_attack",s.GENERIC="generic",s))(ei||{});const wv=["drowning","starvation"];class Rv{_health=xi;_maxHealth=xi;_hunger=zn;_maxHunger=zn;_exhaustion=0;_oxygen=bn;_maxOxygen=bn;_invincibilityTime=0;_isDead=!1;callbacks={};constructor(){this.reset()}get health(){return this._health}get maxHealth(){return this._maxHealth}get hunger(){return this._hunger}get maxHunger(){return this._maxHunger}get exhaustion(){return this._exhaustion}get oxygen(){return this._oxygen}get maxOxygen(){return this._maxOxygen}get invincibilityTime(){return this._invincibilityTime}get isDead(){return this._isDead}setHealth(t){const e=this._health;this._health=Math.max(0,Math.min(this._maxHealth,t)),this._health!==e&&this.callbacks.onHealthChange?.(this._health,this._maxHealth),this._health<=0&&!this._isDead&&this.die()}setHunger(t){const e=this._hunger;this._hunger=Math.max(0,Math.min(this._maxHunger,t)),this._hunger!==e&&this.callbacks.onHungerChange?.(this._hunger,this._maxHunger)}setOxygen(t){const e=this._oxygen;this._oxygen=Math.max(0,Math.min(this._maxOxygen,t)),this._oxygen!==e&&this.callbacks.onOxygenChange?.(this._oxygen,this._maxOxygen)}addExhaustion(t){this._exhaustion+=t}consumeExhaustion(){const t=this._exhaustion;return this._exhaustion=0,t}takeDamage(t,e=ei.GENERIC){if(this._isDead||t<=0)return!1;const n=wv.includes(e);if(!n&&this._invincibilityTime>0)return!1;const i=this._health;return this._health=Math.max(0,this._health-t),n||(this._invincibilityTime=mv),this.callbacks.onDamage?.(t,e),this.callbacks.onHealthChange?.(this._health,this._maxHealth),this._health<=0&&i>0&&this.die(),!0}heal(t){if(this._isDead||t<=0)return;const e=this._health;this._health=Math.min(this._maxHealth,this._health+t),this._health!==e&&this.callbacks.onHealthChange?.(this._health,this._maxHealth)}die(){this._isDead||(this._isDead=!0,this._health=0,this.callbacks.onDeath?.())}respawn(){this._health=this._maxHealth,this._hunger=this._maxHunger,this._oxygen=this._maxOxygen,this._exhaustion=0,this._invincibilityTime=0,this._isDead=!1,this.callbacks.onHealthChange?.(this._health,this._maxHealth),this.callbacks.onHungerChange?.(this._hunger,this._maxHunger),this.callbacks.onOxygenChange?.(this._oxygen,this._maxOxygen)}reset(){this._health=xi,this._maxHealth=xi,this._hunger=zn,this._maxHunger=zn,this._oxygen=bn,this._maxOxygen=bn,this._exhaustion=0,this._invincibilityTime=0,this._isDead=!1}update(t){this._invincibilityTime>0&&(this._invincibilityTime=Math.max(0,this._invincibilityTime-t))}setCallbacks(t){this.callbacks={...this.callbacks,...t}}serialize(){return{health:this._health,hunger:this._hunger,oxygen:this._oxygen}}deserialize(t){t.health!==void 0&&(this._health=Math.max(0,Math.min(this._maxHealth,t.health))),t.hunger!==void 0&&(this._hunger=Math.max(0,Math.min(this._maxHunger,t.hunger))),t.oxygen!==void 0&&(this._oxygen=Math.max(0,Math.min(this._maxOxygen,t.oxygen))),this._isDead=this._health<=0,this._exhaustion=0,this._invincibilityTime=0,this.callbacks.onHealthChange?.(this._health,this._maxHealth),this.callbacks.onHungerChange?.(this._hunger,this._maxHunger),this.callbacks.onOxygenChange?.(this._oxygen,this._maxOxygen)}}const _u=1.8,Iv=.6,Dv=1.6,Bo=5,jc=.002,Pv=1.5,Lv=.5;class Ov{position;velocity;rotation;height=_u;width=Iv;eyeHeight=Dv;isGrounded=!1;isInWater=!1;isSubmerged=!1;selectedBlockType=m.GRASS;inventory;stats;constructor(t,e,n){this.position=new I(t,e,n),this.velocity=new I(0,0,0),this.rotation=new Xe(0,0,0,"YXZ"),this.inventory=new pv,this.stats=new Rv}getEyePosition(){return new I(this.position.x,this.position.y+this.eyeHeight-this.height/2,this.position.z)}getForwardDirection(){const t=new I(0,0,-1);return t.applyEuler(new Xe(0,this.rotation.y,0)),t}getLookDirection(){const t=new I(0,0,-1);return t.applyEuler(this.rotation),t}getRightDirection(){const t=new I(1,0,0);return t.applyEuler(new Xe(0,this.rotation.y,0)),t}getBoundingBox(){const t=this.width/2;return{minX:this.position.x-t,maxX:this.position.x+t,minY:this.position.y-this.height/2,maxY:this.position.y+this.height/2,minZ:this.position.z-t,maxZ:this.position.z+t}}setSelectedBlockByKey(t){let e;if(t>="1"&&t<="9")e=parseInt(t)-1;else if(t==="0")e=9;else return!1;return this.setSelectedBlockIndex(e)}setSelectedBlockIndex(t){if(t>=0&&t<Vi.length){const e=Vi[t];if(e!==void 0)return this.selectedBlockType=e,!0}return!1}getSelectedBlockIndex(){return Vi.indexOf(this.selectedBlockType)}selectNextBlock(){const e=(this.getSelectedBlockIndex()+1)%Vi.length;this.setSelectedBlockIndex(e)}selectPreviousBlock(){const e=(this.getSelectedBlockIndex()-1+Vi.length)%Vi.length;this.setSelectedBlockIndex(e)}getState(){return{position:{x:this.position.x,y:this.position.y,z:this.position.z},rotation:{yaw:this.rotation.y,pitch:this.rotation.x},selectedBlockIndex:this.getSelectedBlockIndex(),inventory:this.inventory.serialize(),stats:this.stats.serialize()}}restoreState(t){this.position.set(t.position.x,t.position.y,t.position.z),this.rotation.y=t.rotation.yaw,this.rotation.x=t.rotation.pitch,t.selectedBlockIndex!==void 0&&this.setSelectedBlockIndex(t.selectedBlockIndex),t.inventory&&this.inventory.deserialize(t.inventory),t.stats&&this.stats.deserialize(t.stats),this.velocity.set(0,0,0)}}class Nv{config;constructor(t={}){this.config={...s_,...t}}update(t,e,n,i=!1,r=!1){const o=fu(t,e),a=r_(t,e);t.isInWater=o,t.isSubmerged=a,o?o_(t,n,this.config.waterGravity,this.config.waterBuoyancy,this.config.waterTerminalVelocity,i,r):pu(t,n,this.config.gravity);const l=t.velocity.x*n,c=t.velocity.y*n,h=t.velocity.z*n,u=hu(t,e,c);t.position.y=u.newPosition,t.velocity.y=u.newVelocity;const d=uu(t,e,l);t.position.x=d.newPosition,t.velocity.x=d.newVelocity;const f=du(t,e,h);t.position.z=f.newPosition,t.velocity.z=f.newVelocity,t.isGrounded=Ua(t,e),this.handleWorldBoundary(t),!o&&t.isGrounded&&t.velocity.y<0&&l_(t)}applyJump(t){return t.isInWater||!t.isGrounded?!1:(t.velocity.y=this.config.jumpVelocity,t.isGrounded=!1,!0)}checkGrounded(t,e){return Ua(t,e)}handleWorldBoundary(t){const e=t.height/2,n=Hr+e;t.position.y<n&&(t.position.y=n,t.velocity.y=0)}getConfig(){return{...this.config}}setConfig(t){this.config={...this.config,...t}}}class kv{player;world;physics;minPitch=-Math.PI/2+.01;maxPitch=Math.PI/2-.01;constructor(t,e){this.player=t,this.world=e,this.physics=new Nv}update(t,e){this.updateRotation(t.mouseX,t.mouseY);const n=this.player.isInWater;t.jump&&!n&&this.physics.applyJump(this.getPhysicsBody()),this.updateHorizontalVelocity(t);const i=n&&t.jump,r=n&&t.sprint;this.physics.update(this.getPhysicsBody(),this.world,e,i,r),this.player.isGrounded=this.getPhysicsBody().isGrounded,this.player.isInWater=this.getPhysicsBody().isInWater??!1,this.player.isSubmerged=this.getPhysicsBody().isSubmerged??!1}getPhysicsBody(){return this.player}updateRotation(t,e){this.player.rotation.y-=t*jc,this.player.rotation.x-=e*jc,this.player.rotation.x=Math.max(this.minPitch,Math.min(this.maxPitch,this.player.rotation.x))}updateHorizontalVelocity(t){const e=new I(0,0,0);if(t.forward&&e.add(this.player.getForwardDirection()),t.backward&&e.sub(this.player.getForwardDirection()),t.right&&e.add(this.player.getRightDirection()),t.left&&e.sub(this.player.getRightDirection()),e.lengthSq()>0){e.normalize();let n=Bo;this.player.isInWater?n=Bo*Lv:t.sprint&&(n=Bo*Pv),e.multiplyScalar(n),this.player.velocity.x=e.x,this.player.velocity.z=e.z}else this.player.velocity.x=0,this.player.velocity.z=0}getPhysicsSystem(){return this.physics}}var rn=(s=>(s.FIRST_PERSON="first_person",s.THIRD_PERSON="third_person",s))(rn||{});const Jc=5,Uv=.3,Qc=1,Fv=10,th=1.5,Bv=.3,zo="webcraft_selected_character",Lr={HEAD_SIZE:.5,BODY_WIDTH:.5,BODY_HEIGHT:.75,BODY_DEPTH:.25,ARM_WIDTH:.25,ARM_HEIGHT:.75,ARM_DEPTH:.25,LEG_WIDTH:.25,LEG_HEIGHT:.75,LEG_DEPTH:.25},zv=Lr.HEAD_SIZE+Lr.BODY_HEIGHT+Lr.LEG_HEIGHT;function Gv(s){return 1-(1-s)*(1-s)}class Hv{camera;player;world;characterModel=null;_currentMode=rn.FIRST_PERSON;_thirdPersonDistance=Jc;_actualDistance=Jc;_isTransitioning=!1;transitionProgress=0;transitionStartPos=new I;raycaster=new eu;orbitYaw=0;orbitPitch=.3;lastToggleTime=0;TOGGLE_COOLDOWN=.1;constructor(t,e,n){this.camera=t,this.player=e,this.world=n}get currentMode(){return this._currentMode}get thirdPersonDistance(){return this._thirdPersonDistance}set thirdPersonDistance(t){this._thirdPersonDistance=Math.max(Qc,Math.min(Fv,t))}get actualDistance(){return this._actualDistance}get isTransitioning(){return this._isTransitioning}setCharacterModel(t){this.characterModel=t,this.updateModelVisibility()}toggleViewMode(){const t=performance.now()/1e3;t-this.lastToggleTime<this.TOGGLE_COOLDOWN||(this.lastToggleTime=t,this._currentMode===rn.FIRST_PERSON?this.setViewMode(rn.THIRD_PERSON):this.setViewMode(rn.FIRST_PERSON))}setViewMode(t){t===this._currentMode&&!this._isTransitioning||(this._currentMode=t,this._isTransitioning=!0,this.transitionProgress=0,this.transitionStartPos.copy(this.camera.position),t===rn.THIRD_PERSON&&(this.orbitYaw=this.player.rotation.y),this.updateModelVisibility())}updateModelVisibility(){this.characterModel&&(this.characterModel.visible=this._currentMode===rn.THIRD_PERSON)}update(t){this._isTransitioning&&(this.transitionProgress+=t/Uv,this.transitionProgress>=1&&(this.transitionProgress=1,this._isTransitioning=!1));let e,n;if(this._currentMode===rn.FIRST_PERSON?(e=this.getFirstPersonPosition(),n=this.getFirstPersonLookAt()):(e=this.getThirdPersonPosition(),n=this.getThirdPersonLookAt()),this._isTransitioning){const i=Gv(this.transitionProgress);this.camera.position.lerpVectors(this.transitionStartPos,e,i)}else this.camera.position.copy(e);if(this._currentMode===rn.FIRST_PERSON?this.camera.rotation.copy(this.player.rotation):this.camera.lookAt(n),this.characterModel){this.characterModel.updateTransform(this.player.position,this.player.rotation);const i=this.player.velocity.lengthSq()>.1;this.characterModel.updateAnimation(t,i)}}getFirstPersonPosition(){return this.player.getEyePosition()}getFirstPersonLookAt(){const t=this.player.getEyePosition(),e=new I(0,0,-1);return e.applyEuler(this.player.rotation),t.clone().add(e)}getThirdPersonPosition(){const t=this.player.position.clone();t.y+=th;const e=new I;e.x=Math.sin(this.orbitYaw)*Math.cos(this.orbitPitch)*this._thirdPersonDistance,e.y=Math.sin(this.orbitPitch)*this._thirdPersonDistance,e.z=Math.cos(this.orbitYaw)*Math.cos(this.orbitPitch)*this._thirdPersonDistance;const n=t.clone().add(e);return this.handleCameraCollision(t,n)}getThirdPersonLookAt(){const t=this.player.position.clone();return t.y+=th*.5,t}handleCameraCollision(t,e){const n=e.clone().sub(t).normalize(),i=t.distanceTo(e);this.raycaster.set(t,n),this.raycaster.far=i;let r=i;const o=Math.ceil(i*2);for(let a=1;a<=o;a++){const l=a/o,c=t.clone().lerp(e,l),h=Math.floor(c.x),u=Math.floor(c.y),d=Math.floor(c.z),f=this.world.getBlock(h,u,d);if(f!==null&&f!==0&&f!==8&&f!==9){const y=t.distanceTo(c)-Bv;y<r&&y>Qc&&(r=y);break}}return this._actualDistance=r,t.clone().add(n.multiplyScalar(r))}handleMouseMove(t,e){this._currentMode===rn.THIRD_PERSON&&(this.orbitYaw=this.player.rotation.y,this.orbitPitch=Math.max(-Math.PI/3,Math.min(Math.PI/3,this.orbitPitch+e*.002)))}getLookDirection(){const t=new I(0,0,-1);return t.applyQuaternion(this.camera.quaternion),t}getCamera(){return this.camera}}class Wv{keysDown=new Set;numberKeyPressed=null;tabPressed=!1;mapKeyPressed=!1;viewTogglePressed=!1;characterSelectPressed=!1;escapePressed=!1;inventoryTogglePressed=!1;constructor(){window.addEventListener("keydown",this.handleKeyDown.bind(this)),window.addEventListener("keyup",this.handleKeyUp.bind(this))}handleKeyDown(t){this.keysDown.add(t.code),t.code>="Digit1"&&t.code<="Digit9"?this.numberKeyPressed=parseInt(t.code.replace("Digit",""))-1:t.code==="Digit0"&&(this.numberKeyPressed=9),t.code==="Tab"&&(t.preventDefault(),this.tabPressed=!0),t.code==="KeyM"&&(this.mapKeyPressed=!0),t.code==="KeyV"&&(this.viewTogglePressed=!0),t.code==="KeyC"&&(this.characterSelectPressed=!0),t.code==="Escape"&&(this.escapePressed=!0),t.code==="KeyE"&&(this.inventoryTogglePressed=!0)}handleKeyUp(t){this.keysDown.delete(t.code)}isKeyDown(t){return this.keysDown.has(t)}getNumberKeyPressed(){return this.numberKeyPressed}resetNumberKey(){this.numberKeyPressed=null}wasTabPressed(){return this.tabPressed}resetTab(){this.tabPressed=!1}wasMapKeyPressed(){return this.mapKeyPressed}resetMapKey(){this.mapKeyPressed=!1}wasViewTogglePressed(){return this.viewTogglePressed}resetViewToggle(){this.viewTogglePressed=!1}wasCharacterSelectPressed(){return this.characterSelectPressed}resetCharacterSelect(){this.characterSelectPressed=!1}wasEscapePressed(){return this.escapePressed}resetEscape(){this.escapePressed=!1}wasInventoryTogglePressed(){return this.inventoryTogglePressed}resetInventoryToggle(){this.inventoryTogglePressed=!1}dispose(){window.removeEventListener("keydown",this.handleKeyDown.bind(this)),window.removeEventListener("keyup",this.handleKeyUp.bind(this))}}class Vv{canvas;deltaX=0;deltaY=0;leftClicked=!1;rightClicked=!1;leftMouseDown=!1;rightMouseDown=!1;locked=!1;lockChangeCallback=null;constructor(t){this.canvas=t,document.addEventListener("mousemove",this.handleMouseMove.bind(this)),t.addEventListener("mousedown",this.handleMouseDown.bind(this)),t.addEventListener("mouseup",this.handleMouseUp.bind(this)),document.addEventListener("pointerlockchange",this.handlePointerLockChange.bind(this)),t.addEventListener("click",this.handleCanvasClick.bind(this)),t.addEventListener("contextmenu",e=>e.preventDefault())}handleMouseMove(t){this.locked&&(this.deltaX+=t.movementX,this.deltaY+=t.movementY)}handleMouseDown(t){this.locked&&(t.button===0?(this.leftClicked=!0,this.leftMouseDown=!0):t.button===2&&(this.rightClicked=!0,this.rightMouseDown=!0))}handleMouseUp(t){t.button===0?this.leftMouseDown=!1:t.button===2&&(this.rightMouseDown=!1)}handleCanvasClick(){this.locked||this.requestLock()}handlePointerLockChange(){this.locked=document.pointerLockElement===this.canvas;const t=document.getElementById("instructions");t&&t.classList.toggle("hidden",this.locked),this.lockChangeCallback&&this.lockChangeCallback(this.locked)}requestLock(){this.canvas.requestPointerLock()}exitLock(){document.exitPointerLock()}isLocked(){return this.locked}getMouseDeltaX(){return this.deltaX}getMouseDeltaY(){return this.deltaY}wasLeftClicked(){return this.leftClicked}wasRightClicked(){return this.rightClicked}isLeftMouseDown(){return this.leftMouseDown}isRightMouseDown(){return this.rightMouseDown}resetDeltas(){this.deltaX=0,this.deltaY=0}resetClicks(){this.leftClicked=!1,this.rightClicked=!1}onLockChange(t){this.lockChangeCallback=t}dispose(){document.removeEventListener("mousemove",this.handleMouseMove.bind(this)),this.canvas.removeEventListener("mousedown",this.handleMouseDown.bind(this)),document.removeEventListener("pointerlockchange",this.handlePointerLockChange.bind(this))}}class Xv{keyboardInput;mouseInput;constructor(t){this.keyboardInput=new Wv,this.mouseInput=new Vv(t)}getState(){return{forward:this.keyboardInput.isKeyDown("KeyW")||this.keyboardInput.isKeyDown("ArrowUp"),backward:this.keyboardInput.isKeyDown("KeyS")||this.keyboardInput.isKeyDown("ArrowDown"),left:this.keyboardInput.isKeyDown("KeyA")||this.keyboardInput.isKeyDown("ArrowLeft"),right:this.keyboardInput.isKeyDown("KeyD")||this.keyboardInput.isKeyDown("ArrowRight"),jump:this.keyboardInput.isKeyDown("Space"),sprint:this.keyboardInput.isKeyDown("ShiftLeft")||this.keyboardInput.isKeyDown("ShiftRight"),mouseX:this.mouseInput.getMouseDeltaX(),mouseY:this.mouseInput.getMouseDeltaY(),leftClick:this.mouseInput.wasLeftClicked(),rightClick:this.mouseInput.wasRightClicked(),leftMouseDown:this.mouseInput.isLeftMouseDown(),rightMouseDown:this.mouseInput.isRightMouseDown(),numberKey:this.keyboardInput.getNumberKeyPressed(),tabCycle:this.keyboardInput.wasTabPressed(),mapToggle:this.keyboardInput.wasMapKeyPressed(),viewToggle:this.keyboardInput.wasViewTogglePressed(),characterSelect:this.keyboardInput.wasCharacterSelectPressed(),escapeMenu:this.keyboardInput.wasEscapePressed(),inventoryToggle:this.keyboardInput.wasInventoryTogglePressed()}}resetFrameState(){this.mouseInput.resetDeltas(),this.mouseInput.resetClicks(),this.keyboardInput.resetNumberKey(),this.keyboardInput.resetTab(),this.keyboardInput.resetMapKey(),this.keyboardInput.resetViewToggle(),this.keyboardInput.resetCharacterSelect(),this.keyboardInput.resetEscape(),this.keyboardInput.resetInventoryToggle()}isPointerLocked(){return this.mouseInput.isLocked()}requestPointerLock(){this.mouseInput.requestLock()}exitPointerLock(){this.mouseInput.exitLock()}onPointerLockChange(t){this.mouseInput.onLockChange(t)}dispose(){this.keyboardInput.dispose(),this.mouseInput.dispose()}}class Kv{element;constructor(){this.element=document.getElementById("crosshair")}show(){this.element&&(this.element.style.display="block")}hide(){this.element&&(this.element.style.display="none")}setVisible(t){t?this.show():this.hide()}}class Yv{container=null;slotElements=[];inventory=null;selectedIndex=0;texturePreviewsGenerated=!1;constructor(){this.container=document.getElementById("block-selector"),this.container&&this.createSlots()}setInventory(t){this.inventory=t,this.selectedIndex=t.selectedSlot,t.setOnChange(()=>this.update()),this.update(),setTimeout(()=>this.generateTexturePreviews(),100)}createSlots(){if(this.container){this.container.innerHTML="",this.slotElements=[];for(let t=0;t<be;t++){const e=document.createElement("div");e.className="block-slot",e.dataset.slotIndex=String(t),e.title=`${t+1}: 空`,e.style.cssText=`
        position: relative;
        width: 48px;
        height: 48px;
        background: rgba(0, 0, 0, 0.5);
        border: 2px solid #555;
        display: flex;
        justify-content: center;
        align-items: center;
        cursor: pointer;
        image-rendering: pixelated;
      `;const n=document.createElement("div");n.className="slot-icon",n.style.cssText=`
        width: 32px;
        height: 32px;
        background-size: cover;
        image-rendering: pixelated;
      `,e.appendChild(n);const i=document.createElement("span");i.className="slot-count",i.style.cssText=`
        position: absolute;
        bottom: 2px;
        right: 4px;
        font-size: 11px;
        color: white;
        text-shadow: 1px 1px 1px black;
        pointer-events: none;
      `,e.appendChild(i);const r=document.createElement("span");r.className="slot-key",r.textContent=String(t+1),r.style.cssText=`
        position: absolute;
        top: 2px;
        left: 4px;
        font-size: 10px;
        color: #aaa;
        text-shadow: 1px 1px 1px black;
        pointer-events: none;
      `,e.appendChild(r),e.addEventListener("click",()=>{this.selectSlot(t)}),this.container.appendChild(e),this.slotElements.push(e)}}}selectSlot(t){t<0||t>=be||(this.selectedIndex=t,this.inventory&&(this.inventory.selectedSlot=t),this.updateSelection())}selectNext(){this.selectSlot((this.selectedIndex+1)%be)}selectPrevious(){this.selectSlot((this.selectedIndex-1+be)%be)}updateSelection(){this.slotElements.forEach((t,e)=>{e===this.selectedIndex?(t.style.borderColor="#fff",t.style.boxShadow="0 0 8px rgba(255, 255, 255, 0.5)",t.classList.add("selected")):(t.style.borderColor="#555",t.style.boxShadow="none",t.classList.remove("selected"))})}update(){if(this.inventory){for(let t=0;t<be;t++){const e=this.inventory.getSlot(t),n=this.slotElements[t];e&&n&&this.updateSlotDisplay(n,e,t)}this.selectedIndex=this.inventory.selectedSlot,this.updateSelection()}}updateSlotDisplay(t,e,n){const i=t.querySelector(".slot-icon"),r=t.querySelector(".slot-count");mt(e)?(i&&(i.style.backgroundImage="",i.style.backgroundColor="transparent"),r&&(r.textContent=""),t.title=`${n+1}: 空`):(i&&e.itemType!==null&&(this.setSlotTexture(i,e.itemType),t.title=`${n+1}: ${tl[e.itemType]} x${e.count}`),r&&(r.textContent=e.count>1?String(e.count):""))}setSlotTexture(t,e){try{const n=Hn(),i=n.getCanvas(),r=n.getConfig(),o=Cn(e,"side"),a=document.createElement("canvas");a.width=r.tileSize,a.height=r.tileSize;const l=a.getContext("2d");if(l){const c=o*r.tileSize;l.drawImage(i,c,0,r.tileSize,r.tileSize,0,0,r.tileSize,r.tileSize),t.style.backgroundImage=`url(${a.toDataURL()})`,t.style.backgroundColor="transparent"}}catch{const n=He[e]??8421504;t.style.backgroundImage="",t.style.backgroundColor=`#${n.toString(16).padStart(6,"0")}`}}generateTexturePreviews(){this.texturePreviewsGenerated||(this.update(),this.texturePreviewsGenerated=!0)}getSelectedItemType(){return this.inventory?this.inventory.getSelectedItem().itemType:null}getSelectedIndex(){return this.selectedIndex}refresh(){this.texturePreviewsGenerated=!1,this.generateTexturePreviews()}}class qv{matches(t,e){return t.type==="shapeless"?this.matchesShapeless(t,e):this.matchesShaped(t,e)}matchesShaped(t,e){if(!t.pattern)return!1;const n=this.normalizePattern(t.pattern,t.ingredients),i=this.normalizeGrid(e);if(n.width!==i.width||n.height!==i.height)return!1;for(let r=0;r<n.height;r++)for(let o=0;o<n.width;o++){const a=n.cells[r]?.[o]??null,l=i.cells[r]?.[o]??null;if(a!==l)return!1}return!0}matchesShapeless(t,e){const n=new Map;let i=0;for(const a of e)for(const l of a)l!==null&&(n.set(l,(n.get(l)||0)+1),i++);const r=new Map;let o=0;for(const a of Object.values(t.ingredients))r.set(a,(r.get(a)||0)+1),o++;if(i!==o)return!1;for(const[a,l]of r)if((n.get(a)||0)!==l)return!1;return!0}normalizePattern(t,e){const n=[];let i=1/0,r=1/0,o=-1/0,a=-1/0;for(let u=0;u<t.length;u++){const d=[],f=t[u];for(let y=0;y<f.length;y++){const _=f[y];if(_===" ")d.push(null);else{const g=e[_];g!==void 0?(d.push(g),i=Math.min(i,y),r=Math.min(r,u),o=Math.max(o,y),a=Math.max(a,u)):d.push(null)}}n.push(d)}if(i===1/0)return{cells:[[]],width:0,height:0};const l=o-i+1,c=a-r+1,h=[];for(let u=r;u<=a;u++){const d=[];for(let f=i;f<=o;f++)d.push(n[u]?.[f]??null);h.push(d)}return{cells:h,width:l,height:c}}normalizeGrid(t){let e=1/0,n=1/0,i=-1/0,r=-1/0;for(let c=0;c<t.length;c++){const h=t[c];for(let u=0;u<h.length;u++)h[u]!==null&&(e=Math.min(e,u),n=Math.min(n,c),i=Math.max(i,u),r=Math.max(r,c))}if(e===1/0)return{cells:[[]],width:0,height:0};const o=i-e+1,a=r-n+1,l=[];for(let c=n;c<=r;c++){const h=[];for(let u=e;u<=i;u++)h.push(t[c]?.[u]??null);l.push(h)}return{cells:l,width:o,height:a}}}class xn{static instance=null;recipes=new Map;matcher;constructor(){this.matcher=new qv}static getInstance(){return xn.instance||(xn.instance=new xn),xn.instance}static resetInstance(){xn.instance=null}register(t){this.recipes.has(t.id)&&console.warn(`[RecipeRegistry] Recipe ${t.id} already registered, overwriting`),this.recipes.set(t.id,t),console.log(`[RecipeRegistry] Registered recipe: ${t.id}`)}registerAll(t){for(const e of t)this.register(e)}findMatch(t){const e=t.length;for(const n of this.recipes.values())if(!(n.gridSize>e)&&this.matcher.matches(n,t))return n;return null}getAllRecipes(){return Array.from(this.recipes.values())}get2x2Recipes(){return this.getAllRecipes().filter(t=>t.gridSize===2)}get3x3Recipes(){return this.getAllRecipes().filter(t=>t.gridSize===3)}getRecipe(t){return this.recipes.get(t)}hasRecipe(t){return this.recipes.has(t)}getRecipeCount(){return this.recipes.size}}const vu=Object.freeze(Object.defineProperty({__proto__:null,RecipeRegistry:xn},Symbol.toStringTag,{value:"Module"}));var se=(s=>(s.WOOD="wood",s.STONE="stone",s.IRON="iron",s.DIAMOND="diamond",s))(se||{}),fe=(s=>(s.PICKAXE="pickaxe",s.AXE="axe",s.SHOVEL="shovel",s.SWORD="sword",s.HOE="hoe",s))(fe||{});const Su={[se.WOOD]:60,[se.STONE]:131,[se.IRON]:250,[se.DIAMOND]:1561},$v={[se.WOOD]:2,[se.STONE]:4,[se.IRON]:6,[se.DIAMOND]:8},Zv=[m.STONE,m.COBBLESTONE,m.SANDSTONE,m.SANDSTONE_CARVED,m.BRICK,m.DARK_STONE,m.MOSSY_STONE,m.GOLD_BLOCK,m.RED_BRICK],jv=[m.LOG,m.OAK_LOG,m.BIRCH_LOG,m.SPRUCE_LOG,m.PLANKS,m.WOOD],Jv=[m.DIRT,m.GRASS,m.SAND,m.SNOW];function Qv(s){switch(s){case fe.PICKAXE:return Zv;case fe.AXE:return jv;case fe.SHOVEL:return Jv;case fe.SWORD:return[];case fe.HOE:return[];default:return[]}}const Ki=new Map;function tS(s,t){return{material:s,type:t,durability:Su[s],speedMultiplier:$v[s],effectiveBlocks:Qv(t)}}class Tn{static instance=null;initialized=!1;constructor(){}static getInstance(){return Tn.instance||(Tn.instance=new Tn),Tn.instance}initialize(){if(this.initialized)return;const t=[{blockType:m.WOODEN_PICKAXE,material:se.WOOD,type:fe.PICKAXE},{blockType:m.WOODEN_AXE,material:se.WOOD,type:fe.AXE},{blockType:m.WOODEN_SHOVEL,material:se.WOOD,type:fe.SHOVEL},{blockType:m.WOODEN_SWORD,material:se.WOOD,type:fe.SWORD},{blockType:m.WOODEN_HOE,material:se.WOOD,type:fe.HOE},{blockType:m.STONE_PICKAXE,material:se.STONE,type:fe.PICKAXE},{blockType:m.STONE_AXE,material:se.STONE,type:fe.AXE},{blockType:m.STONE_SHOVEL,material:se.STONE,type:fe.SHOVEL},{blockType:m.STONE_SWORD,material:se.STONE,type:fe.SWORD},{blockType:m.STONE_HOE,material:se.STONE,type:fe.HOE},{blockType:m.IRON_PICKAXE,material:se.IRON,type:fe.PICKAXE},{blockType:m.IRON_AXE,material:se.IRON,type:fe.AXE},{blockType:m.IRON_SHOVEL,material:se.IRON,type:fe.SHOVEL},{blockType:m.IRON_SWORD,material:se.IRON,type:fe.SWORD},{blockType:m.IRON_HOE,material:se.IRON,type:fe.HOE},{blockType:m.DIAMOND_PICKAXE,material:se.DIAMOND,type:fe.PICKAXE},{blockType:m.DIAMOND_AXE,material:se.DIAMOND,type:fe.AXE},{blockType:m.DIAMOND_SHOVEL,material:se.DIAMOND,type:fe.SHOVEL},{blockType:m.DIAMOND_SWORD,material:se.DIAMOND,type:fe.SWORD},{blockType:m.DIAMOND_HOE,material:se.DIAMOND,type:fe.HOE}];for(const e of t)Ki.set(e.blockType,tS(e.material,e.type));this.initialized=!0,console.log(`[ToolSystem] Initialized with ${Ki.size} tools`)}isTool(t){return Ki.has(t)}getProperties(t){return Ki.get(t)||null}getSpeedMultiplier(t,e){const n=Ki.get(t);return n&&n.effectiveBlocks.includes(e)?n.speedMultiplier:1}useTool(t,e){const n=e-1;return{newDurability:n,broken:n<=0}}getMaxDurability(t){const e=Ki.get(t);return e?Su[e.material]:0}hasDurability(t){return this.isTool(t)}}const Cs=4,eS=-1;class nS{container=null;overlay=null;slotElements=[];inventory=null;_isOpen=!1;craftingGrid=[];craftingSlotElements=[];craftingOutputElement=null;currentRecipe=null;draggedSlotIndex=-1;draggedElement=null;dragSource="inventory";cursorItem=Nt();cursorElement=null;tooltipElement=null;onOpenCallback=null;onCloseCallback=null;constructor(){for(let t=0;t<Cs;t++)this.craftingGrid.push(Nt());this.createUI(),this.createTooltip(),this.createCursorItem(),this.setupKeyboardListener()}createUI(){this.overlay=document.createElement("div"),this.overlay.id="inventory-overlay",this.overlay.style.cssText=`
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.7);
      display: none;
      justify-content: center;
      align-items: center;
      z-index: 1000;
    `,this.container=document.createElement("div"),this.container.id="inventory-container",this.container.style.cssText=`
      background: #8b8b8b;
      border: 4px solid #373737;
      border-radius: 4px;
      padding: 16px;
      box-shadow: 0 8px 32px rgba(0, 0, 0, 0.5);
    `;const t=document.createElement("div");t.textContent="背包",t.style.cssText=`
      color: #404040;
      font-size: 16px;
      font-weight: bold;
      margin-bottom: 12px;
      text-align: center;
    `,this.container.appendChild(t),this.createCraftingArea();const e=document.createElement("div");e.style.cssText=`
      display: grid;
      grid-template-columns: repeat(9, 48px);
      gap: 4px;
      margin-bottom: 16px;
    `;for(let o=be;o<Le;o++){const a=this.createSlot(o,"inventory");e.appendChild(a),this.slotElements[o]=a}this.container.appendChild(e);const n=document.createElement("div");n.style.cssText=`
      height: 2px;
      background: #555;
      margin: 8px 0;
    `,this.container.appendChild(n);const i=document.createElement("div");i.style.cssText=`
      display: grid;
      grid-template-columns: repeat(9, 48px);
      gap: 4px;
    `;for(let o=0;o<be;o++){const a=this.createSlot(o,"inventory");i.appendChild(a),this.slotElements[o]=a}this.container.appendChild(i);const r=document.createElement("div");r.textContent="按 E 或 ESC 关闭",r.style.cssText=`
      color: #606060;
      font-size: 12px;
      margin-top: 12px;
      text-align: center;
    `,this.container.appendChild(r),this.overlay.appendChild(this.container),document.body.appendChild(this.overlay),this.overlay.addEventListener("click",o=>{o.target===this.overlay&&this.close()}),this.overlay.addEventListener("mousemove",o=>{this.updateCursorPosition(o.clientX,o.clientY)})}createTooltip(){this.tooltipElement=document.createElement("div"),this.tooltipElement.id="inventory-tooltip",this.tooltipElement.style.cssText=`
      position: fixed;
      background: rgba(20, 0, 30, 0.94);
      border: 2px solid #28007a;
      border-radius: 4px;
      padding: 6px 10px;
      color: white;
      font-size: 14px;
      pointer-events: none;
      z-index: 1100;
      display: none;
      white-space: nowrap;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.5);
    `,document.body.appendChild(this.tooltipElement)}createCursorItem(){this.cursorElement=document.createElement("div"),this.cursorElement.id="cursor-item",this.cursorElement.style.cssText=`
      position: fixed;
      width: 32px;
      height: 32px;
      pointer-events: none;
      z-index: 1200;
      display: none;
      image-rendering: pixelated;
    `;const t=document.createElement("div");t.className="cursor-icon",t.style.cssText=`
      width: 32px;
      height: 32px;
      background-size: cover;
      image-rendering: pixelated;
    `,this.cursorElement.appendChild(t);const e=document.createElement("span");e.className="cursor-count",e.style.cssText=`
      position: absolute;
      bottom: 0;
      right: 2px;
      font-size: 12px;
      color: white;
      text-shadow: 1px 1px 1px black, -1px -1px 1px black;
    `,this.cursorElement.appendChild(e),document.body.appendChild(this.cursorElement)}updateCursorPosition(t,e){this.cursorElement&&(this.cursorElement.style.left=`${t-16}px`,this.cursorElement.style.top=`${e-16}px`)}updateCursorDisplay(){if(!this.cursorElement)return;const t=this.cursorElement.querySelector(".cursor-icon"),e=this.cursorElement.querySelector(".cursor-count");mt(this.cursorItem)?this.cursorElement.style.display="none":(this.cursorElement.style.display="block",t&&this.cursorItem.itemType!==null&&this.setSlotTexture(t,this.cursorItem.itemType),e&&(e.textContent=this.cursorItem.count>1?String(this.cursorItem.count):""))}showTooltip(t,e,n){if(!this.tooltipElement||mt(t)||t.itemType===null){this.hideTooltip();return}let r=tl[t.itemType]||`物品 #${t.itemType}`;t.durability!==void 0&&t.maxDurability!==void 0&&(r+=`
耐久度: ${t.durability}/${t.maxDurability}`),this.tooltipElement.innerHTML=r.replace(`
`,"<br>"),this.tooltipElement.style.display="block",this.tooltipElement.style.left=`${e+12}px`,this.tooltipElement.style.top=`${n+12}px`}hideTooltip(){this.tooltipElement&&(this.tooltipElement.style.display="none")}createCraftingArea(){const t=document.createElement("div");t.style.cssText=`
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 16px;
      margin-bottom: 16px;
      padding: 12px;
      background: #6b6b6b;
      border-radius: 4px;
    `;const e=document.createElement("div");e.textContent="合成",e.style.cssText=`
      color: #404040;
      font-size: 14px;
      font-weight: bold;
      writing-mode: vertical-rl;
      text-orientation: upright;
    `,t.appendChild(e);const n=document.createElement("div");n.style.cssText=`
      display: grid;
      grid-template-columns: repeat(2, 48px);
      gap: 4px;
    `;for(let r=0;r<Cs;r++){const o=this.createSlot(r,"crafting");n.appendChild(o),this.craftingSlotElements[r]=o}t.appendChild(n);const i=document.createElement("div");i.textContent="→",i.style.cssText=`
      font-size: 24px;
      color: #404040;
    `,t.appendChild(i),this.craftingOutputElement=this.createSlot(eS,"output"),this.craftingOutputElement.style.cssText+=`
      background: #a0a0a0;
      border-color: #505050;
      border-top-color: #d0d0d0;
      border-left-color: #d0d0d0;
    `,t.appendChild(this.craftingOutputElement),this.container.appendChild(t)}createSlot(t,e){const n=document.createElement("div");n.className=`${e}-slot`,n.dataset.slotIndex=String(t),n.dataset.source=e,n.style.cssText=`
      width: 48px;
      height: 48px;
      background: #8b8b8b;
      border: 2px solid #373737;
      border-top-color: #ffffff;
      border-left-color: #ffffff;
      position: relative;
      cursor: pointer;
      display: flex;
      justify-content: center;
      align-items: center;
      image-rendering: pixelated;
    `;const i=document.createElement("div");i.className="slot-icon",i.style.cssText=`
      width: 32px;
      height: 32px;
      background-size: cover;
      image-rendering: pixelated;
    `,n.appendChild(i);const r=document.createElement("span");r.className="slot-count",r.style.cssText=`
      position: absolute;
      bottom: 2px;
      right: 4px;
      font-size: 12px;
      color: white;
      text-shadow: 1px 1px 1px black, -1px -1px 1px black;
      pointer-events: none;
    `,n.appendChild(r);const o=document.createElement("div");o.className="durability-bar",o.style.cssText=`
      position: absolute;
      bottom: 4px;
      left: 4px;
      right: 4px;
      height: 3px;
      background: #333;
      display: none;
    `;const a=document.createElement("div");return a.className="durability-fill",a.style.cssText=`
      height: 100%;
      background: #4caf50;
      transition: width 0.1s;
    `,o.appendChild(a),n.appendChild(o),n.draggable=!0,n.addEventListener("dragstart",l=>this.handleDragStart(l,t,e)),n.addEventListener("dragover",l=>this.handleDragOver(l)),n.addEventListener("drop",l=>this.handleDrop(l,t,e)),n.addEventListener("dragend",()=>this.handleDragEnd()),n.addEventListener("click",l=>this.handleSlotClick(l,t,e)),n.addEventListener("contextmenu",l=>{l.preventDefault(),this.handleRightClick(t,e)}),n.addEventListener("mouseenter",l=>{const c=this.getSlotData(t,e);c&&!mt(c)&&this.showTooltip(c,l.clientX,l.clientY)}),n.addEventListener("mousemove",l=>{const c=this.getSlotData(t,e);c&&!mt(c)&&this.showTooltip(c,l.clientX,l.clientY)}),n.addEventListener("mouseleave",()=>{this.hideTooltip()}),n}getSlotData(t,e){return e==="inventory"&&this.inventory?this.inventory.getSlot(t)??null:e==="crafting"?this.craftingGrid[t]??null:e==="output"&&this.currentRecipe?{itemType:this.currentRecipe.result.item,count:this.currentRecipe.result.count}:null}handleSlotClick(t,e,n){if(n==="output"){this.handleOutputClick();return}mt(this.cursorItem)?this.pickupItem(e,n):this.placeCursorItem(e,n)}setupKeyboardListener(){document.addEventListener("keydown",t=>{this._isOpen&&(t.code==="KeyE"||t.code==="Escape")&&(t.preventDefault(),this.close())})}handleDragStart(t,e,n){if(n==="output"){t.preventDefault();return}let i=null;if(n==="inventory"&&this.inventory?i=this.inventory.getSlot(e)??null:n==="crafting"&&(i=this.craftingGrid[e]??null),!i||mt(i)){t.preventDefault();return}this.draggedSlotIndex=e,this.dragSource=n,this.draggedElement=t.target,t.dataTransfer&&(t.dataTransfer.effectAllowed="move",t.dataTransfer.setData("text/plain",`${n}:${e}`)),setTimeout(()=>{this.draggedElement&&(this.draggedElement.style.opacity="0.5")},0)}handleDragOver(t){t.preventDefault(),t.dataTransfer&&(t.dataTransfer.dropEffect="move")}handleDrop(t,e,n){if(t.preventDefault(),n==="output"||this.draggedSlotIndex<0||this.dragSource===n&&this.draggedSlotIndex===e)return;let i=null,r=null;if(this.dragSource==="inventory"&&this.inventory?i=this.inventory.getSlot(this.draggedSlotIndex)??null:this.dragSource==="crafting"&&(i=this.craftingGrid[this.draggedSlotIndex]??null),n==="inventory"&&this.inventory?r=this.inventory.getSlot(e)??null:n==="crafting"&&(r=this.craftingGrid[e]??null),!!i){if(this.dragSource==="inventory"&&n==="inventory"&&this.inventory)this.inventory.swapSlots(this.draggedSlotIndex,e);else if(this.dragSource==="crafting"&&n==="crafting"){const o=this.craftingGrid[this.draggedSlotIndex],a=this.craftingGrid[e];if(o&&a){const l={itemType:a.itemType,count:a.count,durability:a.durability,maxDurability:a.maxDurability};this.craftingGrid[e]={itemType:o.itemType,count:o.count,durability:o.durability,maxDurability:o.maxDurability},this.craftingGrid[this.draggedSlotIndex]=l}}else if(this.dragSource==="inventory"&&n==="crafting"&&this.inventory){if(r&&mt(r))this.craftingGrid[e]={itemType:i.itemType,count:i.count,durability:i.durability,maxDurability:i.maxDurability},this.inventory.setSlot(this.draggedSlotIndex,Nt());else if(r){const o={itemType:r.itemType,count:r.count,durability:r.durability,maxDurability:r.maxDurability};this.craftingGrid[e]={itemType:i.itemType,count:i.count,durability:i.durability,maxDurability:i.maxDurability},this.inventory.setSlot(this.draggedSlotIndex,o)}}else if(this.dragSource==="crafting"&&n==="inventory"&&this.inventory)if(r&&mt(r))this.inventory.setSlot(e,{itemType:i.itemType,count:i.count,durability:i.durability,maxDurability:i.maxDurability}),this.craftingGrid[this.draggedSlotIndex]=Nt();else{const o=this.inventory.getSlot(e);if(o){const a={itemType:o.itemType,count:o.count,durability:o.durability,maxDurability:o.maxDurability};this.inventory.setSlot(e,{itemType:i.itemType,count:i.count,durability:i.durability,maxDurability:i.maxDurability}),this.craftingGrid[this.draggedSlotIndex]=a}}this.updateCraftingOutput(),this.update()}}handleDragEnd(){this.draggedElement&&(this.draggedElement.style.opacity="1"),this.draggedSlotIndex=-1,this.draggedElement=null}handleOutputClick(){if(!this.currentRecipe||!this.inventory)return;const t=this.currentRecipe.result;if(!this.inventory.canAddItem(t.item,t.count)){console.log("[InventoryUI] Inventory full, cannot take crafting output");return}const n=Tn.getInstance();if(n.isTool(t.item)){const i=n.getMaxDurability(t.item);this.inventory.addItemWithDurability(t.item,t.count,i,i)}else this.inventory.addItem(t.item,t.count);this.consumeCraftingIngredients(),this.updateCraftingOutput(),this.update()}consumeCraftingIngredients(){if(this.currentRecipe)if(this.currentRecipe.type==="shaped"&&this.currentRecipe.pattern){const t=this.currentRecipe.pattern,e=this.currentRecipe.ingredients;for(let n=0;n<2;n++)for(let i=0;i<2;i++){const r=n*2+i,o=this.craftingGrid[r];if(o&&!mt(o)){for(let a=0;a<t.length&&n+a<2;a++){const l=t[a];if(l)for(let c=0;c<l.length&&i+c<2;c++){const h=l[c];if(h&&h!==" "&&e[h]){const u=(n+a)*2+(i+c),d=this.craftingGrid[u];u<4&&d&&!mt(d)&&(d.count--,d.count<=0&&(this.craftingGrid[u]=Nt()))}}}return}}}else for(let t=0;t<Cs;t++){const e=this.craftingGrid[t];e&&!mt(e)&&(e.count--,e.count<=0&&(this.craftingGrid[t]=Nt()))}}handleRightClick(t,e){if(e==="output")return;if(!mt(this.cursorItem)){this.placeOneItem(t,e);return}const n=this.getSlotData(t,e);if(!n||mt(n))return;const i=Math.ceil(n.count/2),r=n.count-i;this.cursorItem={itemType:n.itemType,count:i,durability:n.durability,maxDurability:n.maxDurability},r>0?e==="inventory"&&this.inventory?this.inventory.setSlot(t,{itemType:n.itemType,count:r,durability:n.durability,maxDurability:n.maxDurability}):e==="crafting"&&(this.craftingGrid[t]={itemType:n.itemType,count:r,durability:n.durability,maxDurability:n.maxDurability}):e==="inventory"&&this.inventory?this.inventory.setSlot(t,Nt()):e==="crafting"&&(this.craftingGrid[t]=Nt()),this.updateCursorDisplay(),this.updateCraftingOutput(),this.update()}pickupItem(t,e){const n=this.getSlotData(t,e);!n||mt(n)||(this.cursorItem={itemType:n.itemType,count:n.count,durability:n.durability,maxDurability:n.maxDurability},e==="inventory"&&this.inventory?this.inventory.setSlot(t,Nt()):e==="crafting"&&(this.craftingGrid[t]=Nt()),this.updateCursorDisplay(),this.updateCraftingOutput(),this.update())}placeCursorItem(t,e){if(mt(this.cursorItem))return;const n=this.getSlotData(t,e);if(!n||mt(n))e==="inventory"&&this.inventory?this.inventory.setSlot(t,{itemType:this.cursorItem.itemType,count:this.cursorItem.count,durability:this.cursorItem.durability,maxDurability:this.cursorItem.maxDurability}):e==="crafting"&&(this.craftingGrid[t]={itemType:this.cursorItem.itemType,count:this.cursorItem.count,durability:this.cursorItem.durability,maxDurability:this.cursorItem.maxDurability}),this.cursorItem=Nt();else if(n.itemType===this.cursorItem.itemType&&n.durability===void 0){const r=64-n.count,o=Math.min(r,this.cursorItem.count);o>0&&(e==="inventory"&&this.inventory?this.inventory.setSlot(t,{itemType:n.itemType,count:n.count+o}):e==="crafting"&&(this.craftingGrid[t]={itemType:n.itemType,count:n.count+o}),this.cursorItem.count-=o,this.cursorItem.count<=0&&(this.cursorItem=Nt()))}else{const i={itemType:n.itemType,count:n.count,durability:n.durability,maxDurability:n.maxDurability};e==="inventory"&&this.inventory?this.inventory.setSlot(t,{itemType:this.cursorItem.itemType,count:this.cursorItem.count,durability:this.cursorItem.durability,maxDurability:this.cursorItem.maxDurability}):e==="crafting"&&(this.craftingGrid[t]={itemType:this.cursorItem.itemType,count:this.cursorItem.count,durability:this.cursorItem.durability,maxDurability:this.cursorItem.maxDurability}),this.cursorItem=i}this.updateCursorDisplay(),this.updateCraftingOutput(),this.update()}placeOneItem(t,e){if(mt(this.cursorItem))return;const n=this.getSlotData(t,e);!n||mt(n)?(e==="inventory"&&this.inventory?this.inventory.setSlot(t,{itemType:this.cursorItem.itemType,count:1,durability:this.cursorItem.durability,maxDurability:this.cursorItem.maxDurability}):e==="crafting"&&(this.craftingGrid[t]={itemType:this.cursorItem.itemType,count:1,durability:this.cursorItem.durability,maxDurability:this.cursorItem.maxDurability}),this.cursorItem.count--,this.cursorItem.count<=0&&(this.cursorItem=Nt())):n.itemType===this.cursorItem.itemType&&n.count<64&&n.durability===void 0&&(e==="inventory"&&this.inventory?this.inventory.setSlot(t,{itemType:n.itemType,count:n.count+1}):e==="crafting"&&(this.craftingGrid[t]={itemType:n.itemType,count:n.count+1}),this.cursorItem.count--,this.cursorItem.count<=0&&(this.cursorItem=Nt())),this.updateCursorDisplay(),this.updateCraftingOutput(),this.update()}updateCraftingOutput(){const t=xn.getInstance(),e=[[this.craftingGrid[0]?.itemType??null,this.craftingGrid[1]?.itemType??null],[this.craftingGrid[2]?.itemType??null,this.craftingGrid[3]?.itemType??null]];if(this.currentRecipe=t.findMatch(e),this.craftingOutputElement)if(this.currentRecipe){const n={itemType:this.currentRecipe.result.item,count:this.currentRecipe.result.count};this.updateSlotDisplay(this.craftingOutputElement,n)}else this.updateSlotDisplay(this.craftingOutputElement,Nt())}open(t){this.inventory=t,this._isOpen=!0,this.overlay&&(this.overlay.style.display="flex"),this.updateCraftingOutput(),this.update(),this.onOpenCallback&&this.onOpenCallback()}close(){this.returnCursorItem(),this.returnCraftingItems(),this._isOpen=!1,this.overlay&&(this.overlay.style.display="none"),this.hideTooltip(),this.cursorElement&&(this.cursorElement.style.display="none"),this.onCloseCallback&&this.onCloseCallback()}returnCursorItem(){if(!(!this.inventory||mt(this.cursorItem))){if(this.cursorItem.itemType!==null){const t=this.inventory.addItem(this.cursorItem.itemType,this.cursorItem.count);t<this.cursorItem.count&&console.log(`[InventoryUI] Could not return ${this.cursorItem.count-t} cursor items to inventory`)}this.cursorItem=Nt(),this.updateCursorDisplay()}}returnCraftingItems(){if(this.inventory)for(let t=0;t<Cs;t++){const e=this.craftingGrid[t];if(e&&!mt(e)&&e.itemType!==null){const n=this.inventory.addItem(e.itemType,e.count);n<e.count&&console.log(`[InventoryUI] Could not return ${e.count-n} items to inventory`),this.craftingGrid[t]=Nt()}}}toggle(t){this._isOpen?this.close():this.open(t)}get isOpen(){return this._isOpen}update(){if(this.inventory){for(let t=0;t<Le;t++){const e=this.inventory.getSlot(t),n=this.slotElements[t];e&&n&&this.updateSlotDisplay(n,e)}for(let t=0;t<Cs;t++){const e=this.craftingSlotElements[t],n=this.craftingGrid[t];e&&n&&this.updateSlotDisplay(e,n)}}}updateSlotDisplay(t,e){const n=t.querySelector(".slot-icon"),i=t.querySelector(".slot-count"),r=t.querySelector(".durability-bar"),o=t.querySelector(".durability-fill");if(mt(e))n&&(n.style.backgroundImage="",n.style.backgroundColor="transparent"),i&&(i.textContent=""),r&&(r.style.display="none");else if(n&&e.itemType!==null&&this.setSlotTexture(n,e.itemType),i&&(i.textContent=e.count>1?String(e.count):""),r&&o&&e.durability!==void 0&&e.maxDurability!==void 0){const a=e.durability/e.maxDurability*100;r.style.display="block",o.style.width=`${a}%`,a>50?o.style.background="#4caf50":a>25?o.style.background="#ff9800":o.style.background="#f44336"}else r&&(r.style.display="none")}setSlotTexture(t,e){try{const n=Hn(),i=n.getCanvas(),r=n.getConfig(),o=Cn(e,"side"),a=document.createElement("canvas");a.width=r.tileSize,a.height=r.tileSize;const l=a.getContext("2d");if(l){const c=o*r.tileSize;l.drawImage(i,c,0,r.tileSize,r.tileSize,0,0,r.tileSize,r.tileSize),t.style.backgroundImage=`url(${a.toDataURL()})`,t.style.backgroundColor="transparent"}}catch{const n=He[e]??8421504;t.style.backgroundImage="",t.style.backgroundColor=`#${n.toString(16).padStart(6,"0")}`}}setOnOpen(t){this.onOpenCallback=t}setOnClose(t){this.onCloseCallback=t}dispose(){this.overlay&&this.overlay.parentNode&&this.overlay.parentNode.removeChild(this.overlay),this.tooltipElement&&this.tooltipElement.parentNode&&this.tooltipElement.parentNode.removeChild(this.tooltipElement),this.cursorElement&&this.cursorElement.parentNode&&this.cursorElement.parentNode.removeChild(this.cursorElement),this.overlay=null,this.container=null,this.tooltipElement=null,this.cursorElement=null,this.slotElements=[],this.craftingSlotElements=[],this.craftingOutputElement=null}}const ri=5;class Zr{world;stepSize=.1;constructor(t){this.world=t}cast(t,e,n=ri){const i=e.clone().normalize();let r=0,o=-1,a=-1,l=-1;for(;r<n;){const c=t.x+i.x*r,h=t.y+i.y*r,u=t.z+i.z*r,d=Math.floor(c),f=Math.floor(h),y=Math.floor(u);if(d!==o||f!==a||y!==l){const _=this.world.getBlock(d,f,y);if(_!==m.AIR){const g=this.calculateFaceNormal(c,h,u,d,f,y);return{blockX:d,blockY:f,blockZ:y,blockType:_,faceNormal:g,distance:r}}o=d,a=f,l=y}r+=this.stepSize}return null}calculateFaceNormal(t,e,n,i,r,o){const a=t-i-.5,l=e-r-.5,c=n-o-.5,h=Math.abs(a),u=Math.abs(l),d=Math.abs(c);return h>u&&h>d?new I(a>0?1:-1,0,0):u>d?new I(0,l>0?1:-1,0):new I(0,0,c>0?1:-1)}getPlacementPosition(t){return{x:t.blockX+Math.round(t.faceNormal.x),y:t.blockY+Math.round(t.faceNormal.y),z:t.blockZ+Math.round(t.faceNormal.z)}}}class iS{mesh;scene;player;raycaster;visible=!1;constructor(t,e,n){this.scene=t,this.player=e,this.raycaster=new Zr(n);const i=1.002,r=new st(i,i,i),o=new q0(r),a=new Zh({color:16776960,linewidth:2,transparent:!0,opacity:1});this.mesh=new K0(o,a),this.mesh.visible=!1,this.scene.add(this.mesh)}update(){if(!this.visible){this.mesh.visible=!1;return}const t=this.player.getEyePosition(),e=this.player.getLookDirection(),n=this.raycaster.cast(t,e);n&&n.distance<=ri?(this.mesh.position.set(n.blockX+.5,n.blockY+.5,n.blockZ+.5),this.mesh.visible=!0):this.mesh.visible=!1}setVisible(t){this.visible=t,t||(this.mesh.visible=!1)}isVisible(){return this.visible}dispose(){this.scene.remove(this.mesh),this.mesh.geometry.dispose(),this.mesh.material.dispose()}}class sS{world;player;raycaster;onWorldChange=null;onItemDrop=null;constructor(t,e,n){this.world=t,this.player=e,this.raycaster=new Zr(t)}setOnWorldChange(t){this.onWorldChange=t}setOnItemDrop(t){this.onItemDrop=t}destroyBlock(){const t=this.getTargetBlock();if(!t||t.distance>ri)return!1;const e=this.world.getBlock(t.blockX,t.blockY,t.blockZ),n=this.world.setBlock(t.blockX,t.blockY,t.blockZ,m.AIR);if(n){if(Ae.getInstance().playBlockSound(e,"break",t.blockX+.5,t.blockY+.5,t.blockZ+.5),e!==m.AIR&&this.onItemDrop){const i=new Hs(t.blockX+.5,t.blockY+.5,t.blockZ+.5,e,1);this.onItemDrop(i)}this.onWorldChange&&this.onWorldChange()}return n}placeBlock(){const t=this.getTargetBlock();if(!t||t.distance>ri)return null;const e=this.raycaster.getPlacementPosition(t);if(!this.world.isValidPosition(e.x,e.y,e.z)||ln(this.world.getBlock(e.x,e.y,e.z))||this.wouldIntersectPlayer(e.x,e.y,e.z))return null;const n=this.player.inventory.getSelectedItem();if(!n.itemType||n.count<=0)return null;const i=n.itemType;return this.world.setBlock(e.x,e.y,e.z,i)?(this.player.inventory.removeItem(this.player.inventory.selectedSlot,1),Ae.getInstance().playBlockSound(i,"place",e.x+.5,e.y+.5,e.z+.5),this.onWorldChange&&this.onWorldChange(),{x:e.x,y:e.y,z:e.z,blockType:i}):null}getTargetBlock(){const t=this.player.getEyePosition(),e=this.player.getLookDirection();return this.raycaster.cast(t,e)}wouldIntersectPlayer(t,e,n){const i=this.player.getBoundingBox(),r=t,o=t+1,a=e,l=e+1,c=n,h=n+1;return i.minX<o&&i.maxX>r&&i.minY<l&&i.maxY>a&&i.minZ<h&&i.maxZ>c}}class rS{container;audioManager;isExpanded=!1;constructor(){this.audioManager=Ae.getInstance(),this.container=this.createUI(),document.body.appendChild(this.container)}createUI(){const t=document.createElement("div");t.id="volume-control",t.style.cssText=`
      position: fixed;
      bottom: 80px;
      right: 10px;
      background: rgba(0, 0, 0, 0.7);
      border-radius: 8px;
      padding: 8px;
      display: flex;
      flex-direction: column;
      gap: 8px;
      z-index: 1000;
      font-family: sans-serif;
      font-size: 12px;
      color: white;
      pointer-events: auto;
    `;const e=document.createElement("button");e.id="volume-toggle",e.innerHTML="🔊",e.style.cssText=`
      background: rgba(255, 255, 255, 0.1);
      border: none;
      border-radius: 4px;
      padding: 8px;
      cursor: pointer;
      font-size: 20px;
      transition: background 0.2s;
    `,e.addEventListener("click",()=>this.toggleExpand()),e.addEventListener("mouseenter",()=>{e.style.background="rgba(255, 255, 255, 0.2)"}),e.addEventListener("mouseleave",()=>{e.style.background="rgba(255, 255, 255, 0.1)"}),t.appendChild(e);const n=document.createElement("div");n.id="volume-sliders",n.style.cssText=`
      display: none;
      flex-direction: column;
      gap: 8px;
      padding-top: 8px;
      border-top: 1px solid rgba(255, 255, 255, 0.2);
    `,n.appendChild(this.createSlider("主音量","master",this.audioManager.getSettings().masterVolume,r=>this.audioManager.setMasterVolume(r))),n.appendChild(this.createSlider("音乐","music",this.audioManager.getSettings().musicVolume,r=>this.audioManager.setMusicVolume(r))),n.appendChild(this.createSlider("音效","sfx",this.audioManager.getSettings().sfxVolume,r=>this.audioManager.setSfxVolume(r)));const i=document.createElement("button");return i.id="mute-btn",i.textContent=this.audioManager.getSettings().muted?"取消静音":"静音",i.style.cssText=`
      background: rgba(255, 255, 255, 0.1);
      border: 1px solid rgba(255, 255, 255, 0.3);
      border-radius: 4px;
      padding: 6px 12px;
      color: white;
      cursor: pointer;
      transition: background 0.2s;
    `,i.addEventListener("click",()=>{this.audioManager.toggleMute(),i.textContent=this.audioManager.getSettings().muted?"取消静音":"静音",this.updateToggleIcon()}),n.appendChild(i),t.appendChild(n),t}createSlider(t,e,n,i){const r=document.createElement("div");r.style.cssText=`
      display: flex;
      align-items: center;
      gap: 8px;
    `;const o=document.createElement("span");o.textContent=t,o.style.cssText=`
      width: 50px;
      text-align: right;
    `,r.appendChild(o);const a=document.createElement("input");a.type="range",a.id=`volume-${e}`,a.min="0",a.max="100",a.value=String(Math.round(n*100)),a.style.cssText=`
      width: 100px;
      cursor: pointer;
    `,a.addEventListener("input",()=>{i(parseInt(a.value)/100)}),r.appendChild(a);const l=document.createElement("span");return l.textContent=`${Math.round(n*100)}%`,l.style.width="35px",a.addEventListener("input",()=>{l.textContent=`${a.value}%`}),r.appendChild(l),r}toggleExpand(){this.isExpanded=!this.isExpanded;const t=document.getElementById("volume-sliders");t&&(t.style.display=this.isExpanded?"flex":"none")}updateToggleIcon(){const t=document.getElementById("volume-toggle");t&&(t.innerHTML=this.audioManager.getSettings().muted?"🔇":"🔊")}show(){this.container.style.display="flex"}hide(){this.container.style.display="none"}dispose(){this.container.remove()}}class oS{element;constructor(){this.element=this.createUI(),document.body.appendChild(this.element)}createUI(){const t=document.createElement("div");return t.id="coordinate-display",t.style.cssText=`
      position: fixed;
      top: 40px;
      left: 10px;
      color: white;
      font-family: monospace;
      font-size: 12px;
      background: rgba(0, 0, 0, 0.5);
      padding: 4px 8px;
      border-radius: 4px;
      text-shadow: 1px 1px 2px black;
      z-index: 100;
      pointer-events: none;
    `,t.innerHTML=`
      <div>X: <span id="coord-x">0.0</span></div>
      <div>Y: <span id="coord-y">0.0</span></div>
      <div>Z: <span id="coord-z">0.0</span></div>
    `,t}update(t,e,n){const i=document.getElementById("coord-x"),r=document.getElementById("coord-y"),o=document.getElementById("coord-z");i&&(i.textContent=t.toFixed(1)),r&&(r.textContent=e.toFixed(1)),o&&(o.textContent=n.toFixed(1))}show(){this.element.style.display="block"}hide(){this.element.style.display="none"}setVisible(t){this.element.style.display=t?"block":"none"}dispose(){this.element.remove()}}const aS={[m.AIR]:"transparent",[m.GRASS]:"#7CFC00",[m.DIRT]:"#8B4513",[m.STONE]:"#808080",[m.SAND]:"#F4A460",[m.WATER]:"#4169E1",[m.SNOW]:"#FFFAFA",[m.WOOD]:"#8B4513",[m.LOG]:"#6B4423",[m.PLANKS]:"#DEB887",[m.LEAVES]:"#228B22",[m.OAK_LOG]:"#6B4423",[m.OAK_LEAVES]:"#228B22",[m.BIRCH_LOG]:"#D2B48C",[m.BIRCH_LEAVES]:"#90EE90",[m.SPRUCE_LOG]:"#4A3728",[m.SPRUCE_LEAVES]:"#2D5A2D",[m.COBBLESTONE]:"#696969",[m.BRICK]:"#B22222",[m.GLASS]:"#87CEEB",[m.SANDSTONE]:"#D4B896",[m.SANDSTONE_CARVED]:"#C4A876",[m.RED_BRICK]:"#8B2323",[m.GOLD_BLOCK]:"#FFD700",[m.DARK_STONE]:"#4A4A4A",[m.MOSSY_STONE]:"#5A6B4A",[m.FLOWER_RED]:"#FF4444",[m.FLOWER_YELLOW]:"#FFFF44",[m.TALL_GRASS]:"#5A8F3D",[m.MUSHROOM_RED]:"#CC3333",[m.MUSHROOM_BROWN]:"#8B6914",[m.DEAD_BUSH]:"#8B6B47",[m.CACTUS]:"#2D6B2D",[m.ROSE]:"#CC0033",[m.TULIP]:"#FF69B4",[m.DAISY]:"#FFFFFF",[m.CORNFLOWER]:"#6495ED",[m.TORCH]:"#FFCC00"},lS="#404040",Mu="#1a1a1a",xu="#FF0000",eh="#FFFFFF";function Eu(s){return aS[s]??lS}const sn=150,ws=32,cS=100;class hS{container;canvas;ctx;cacheCanvas;cacheCtx;world=null;lastUpdateTime=0;lastPlayerX=0;lastPlayerZ=0;lastPlayerY=0;constructor(){this.container=document.createElement("div"),this.container.id="minimap-container",this.container.style.cssText=`
      position: fixed;
      top: 10px;
      right: 10px;
      width: ${sn}px;
      height: ${sn}px;
      border-radius: 50%;
      border: 2px solid rgba(180, 160, 120, 0.9);
      box-shadow: 
        inset 0 0 0 1px rgba(255, 255, 255, 0.15),
        0 0 0 2px rgba(60, 50, 40, 0.7),
        0 3px 15px rgba(0, 0, 0, 0.5);
      overflow: hidden;
      z-index: 100;
      pointer-events: none;
      background: rgba(20, 20, 30, 0.3);
    `,this.canvas=document.createElement("canvas"),this.canvas.width=sn,this.canvas.height=sn,this.canvas.style.cssText=`
      width: 100%;
      height: 100%;
    `,this.container.appendChild(this.canvas),this.ctx=this.canvas.getContext("2d"),this.cacheCanvas=document.createElement("canvas"),this.cacheCanvas.width=sn,this.cacheCanvas.height=sn,this.cacheCtx=this.cacheCanvas.getContext("2d"),document.body.appendChild(this.container)}setWorld(t){this.world=t}update(t,e,n,i){const r=performance.now(),o=t-this.lastPlayerX,a=n-this.lastPlayerZ,l=e-this.lastPlayerY,c=Math.sqrt(o*o+a*a)>2||Math.abs(l)>2;(r-this.lastUpdateTime>cS||c)&&(this.updateTerrainCache(t,e,n),this.lastUpdateTime=r,this.lastPlayerX=t,this.lastPlayerZ=n,this.lastPlayerY=e),this.render(i)}updateTerrainCache(t,e,n){if(!this.world)return;const i=this.cacheCtx,r=sn/2,o=sn/(ws*2);i.fillStyle=Mu,i.fillRect(0,0,sn,sn);const a=Math.floor(e)-1;for(let l=-ws;l<=ws;l++)for(let c=-ws;c<=ws;c++){const h=Math.floor(t)+l,u=Math.floor(n)+c,d=this.getTopBlock(h,a,u);if(d!==null&&d!==m.AIR){const f=r+l*o,y=r+c*o;i.fillStyle=Eu(d),i.fillRect(Math.floor(f),Math.floor(y),Math.ceil(o)+1,Math.ceil(o)+1)}}}getTopBlock(t,e,n){if(!this.world)return null;const i=Math.floor(t/16),r=Math.floor(e/16),o=Math.floor(n/16);if(!this.world.isChunkLoaded(i,r,o))return null;for(let a=e;a>=e-10;a--){const l=this.world.getBlock(t,a,n);if(l!==m.AIR&&l!==m.WATER)return l;if(l===m.WATER)return m.WATER}for(let a=e+1;a<=e+20;a++){const l=this.world.getBlock(t,a,n);if(l!==m.AIR){const c=this.world.getBlock(t,a-1,n);return c!==m.AIR?c:l}}return null}render(t){const e=this.ctx,n=sn/2,i=sn/2;e.save(),e.beginPath(),e.arc(n,n,i,0,Math.PI*2),e.clip(),e.drawImage(this.cacheCanvas,0,0),this.drawCompass(e,n,i,t),e.fillStyle=xu,e.beginPath(),e.arc(n,n,4,0,Math.PI*2),e.fill();const r=10,o=n+Math.sin(t)*r,a=n-Math.cos(t)*r;e.strokeStyle=eh,e.lineWidth=2,e.beginPath(),e.moveTo(n,n),e.lineTo(o,a),e.stroke();const l=4,c=-t+Math.PI;e.fillStyle=eh,e.beginPath(),e.moveTo(o,a),e.lineTo(o+l*Math.cos(c-.5),a+l*Math.sin(c-.5)),e.lineTo(o+l*Math.cos(c+.5),a+l*Math.sin(c+.5)),e.closePath(),e.fill(),e.restore(),e.strokeStyle="rgba(180, 160, 120, 0.6)",e.lineWidth=1,e.beginPath(),e.arc(n,n,i-2,0,Math.PI*2),e.stroke()}drawCompass(t,e,n,i){const r=[{label:"N",angle:0,color:"#ff4444"},{label:"E",angle:Math.PI/2,color:"#ffffff"},{label:"S",angle:Math.PI,color:"#ffffff"},{label:"W",angle:-Math.PI/2,color:"#ffffff"}],o=n-12;t.font="bold 10px Arial",t.textAlign="center",t.textBaseline="middle";for(const a of r){const l=a.angle-i,c=e+Math.sin(l)*o,h=e-Math.cos(l)*o;t.fillStyle="rgba(0, 0, 0, 0.7)",t.fillText(a.label,c+1,h+1),t.fillStyle=a.color,t.fillText(a.label,c,h)}}show(){this.container.style.display="block"}hide(){this.container.style.display="none"}setVisible(t){this.container.style.display=t?"block":"none"}dispose(){this.container.remove()}}const uS=.1,dS=4,nh=1,ih=.1,fS=128;class pS{overlay;canvas;ctx;world=null;isOpen=!1;zoom=nh;panOffset={x:0,y:0};playerX=0;playerY=0;playerZ=0;isDragging=!1;dragStart={x:0,y:0};panStart={x:0,y:0};constructor(){this.overlay=document.createElement("div"),this.overlay.id="world-map-overlay",this.overlay.style.cssText=`
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.85);
      z-index: 2000;
      display: none;
      justify-content: center;
      align-items: center;
      flex-direction: column;
    `,this.canvas=document.createElement("canvas"),this.canvas.style.cssText=`
      border: 2px solid rgba(255, 255, 255, 0.3);
      border-radius: 8px;
      cursor: grab;
    `,this.overlay.appendChild(this.canvas),this.ctx=this.canvas.getContext("2d");const t=document.createElement("div");t.style.cssText=`
      color: white;
      font-family: sans-serif;
      font-size: 14px;
      margin-top: 16px;
      text-align: center;
      opacity: 0.7;
    `,t.innerHTML="滚轮缩放 | 拖拽平移 | M 或 ESC 关闭",this.overlay.appendChild(t),document.body.appendChild(this.overlay),this.setupEventListeners(),this.resize(),window.addEventListener("resize",()=>this.resize())}setupEventListeners(){this.canvas.addEventListener("wheel",t=>{t.preventDefault();const e=t.deltaY>0?-ih:ih;this.zoom=Math.max(uS,Math.min(dS,this.zoom+e*this.zoom)),this.render()}),this.canvas.addEventListener("mousedown",t=>{this.isDragging=!0,this.dragStart={x:t.clientX,y:t.clientY},this.panStart={...this.panOffset},this.canvas.style.cursor="grabbing"}),window.addEventListener("mousemove",t=>{if(!this.isDragging||!this.isOpen)return;const e=t.clientX-this.dragStart.x,n=t.clientY-this.dragStart.y;this.panOffset={x:this.panStart.x+e/this.zoom,y:this.panStart.y+n/this.zoom},this.render()}),window.addEventListener("mouseup",()=>{this.isDragging=!1,this.canvas.style.cursor="grab"}),window.addEventListener("keydown",t=>{this.isOpen&&(t.key==="m"||t.key==="M"||t.key==="Escape")&&this.close()}),this.overlay.addEventListener("click",t=>{t.target===this.overlay&&this.close()})}resize(){this.canvas.width=window.innerWidth-160,this.canvas.height=window.innerHeight-160,this.isOpen&&this.render()}setWorld(t){this.world=t}updatePlayerPosition(t,e,n){this.playerX=t,this.playerY=e,this.playerZ=n,this.isOpen&&this.render()}open(){this.isOpen||(this.isOpen=!0,this.overlay.style.display="flex",this.panOffset={x:0,y:0},this.zoom=nh,this.render())}close(){this.isOpen&&(this.isOpen=!1,this.overlay.style.display="none")}toggle(){this.isOpen?this.close():this.open()}get opened(){return this.isOpen}render(){if(!this.world)return;const t=this.ctx,e=this.canvas.width,n=this.canvas.height,i=e/2,r=n/2;t.fillStyle="#1a1a2e",t.fillRect(0,0,e,n);const o=this.zoom*2,a=Math.ceil(e/o/2)+1,l=Math.ceil(n/o/2)+1,c=Math.min(fS,Math.max(a,l)),h=Math.floor(this.playerX)+this.panOffset.x,u=Math.floor(this.playerZ)+this.panOffset.y,d=Math.floor(this.playerY)-1;for(let x=-c;x<=c;x++)for(let b=-c;b<=c;b++){const S=Math.floor(h)+x,L=Math.floor(u)+b,C=i+x*o,w=r+b*o;if(C<-o||C>e+o||w<-o||w>n+o)continue;const P=this.getTopBlock(S,d,L);P!==null?t.fillStyle=Eu(P):t.fillStyle=Mu,t.fillRect(Math.floor(C-o/2),Math.floor(w-o/2),Math.ceil(o)+1,Math.ceil(o)+1)}const f=i-this.panOffset.x*o,y=r-this.panOffset.y*o,_=t.createRadialGradient(f,y,0,f,y,15);_.addColorStop(0,"rgba(255, 0, 0, 0.5)"),_.addColorStop(1,"rgba(255, 0, 0, 0)"),t.fillStyle=_,t.beginPath(),t.arc(f,y,15,0,Math.PI*2),t.fill(),t.fillStyle=xu,t.beginPath(),t.arc(f,y,6,0,Math.PI*2),t.fill(),t.strokeStyle="white",t.lineWidth=2,t.stroke(),t.fillStyle="white",t.font="14px monospace",t.textAlign="left",t.fillText(`X: ${Math.floor(this.playerX)} Y: ${Math.floor(this.playerY)} Z: ${Math.floor(this.playerZ)}`,10,25),t.fillText(`缩放: ${(this.zoom*100).toFixed(0)}%`,10,45);const g=100,p=Math.round(g/o);t.strokeStyle="white",t.lineWidth=2,t.beginPath(),t.moveTo(e-120,n-20),t.lineTo(e-120+g,n-20),t.stroke(),t.fillText(`${p} 格`,e-120,n-30)}getTopBlock(t,e,n){if(!this.world)return null;const i=Math.floor(t/16),r=Math.floor(e/16),o=Math.floor(n/16);if(!this.world.isChunkLoaded(i,r,o))return null;for(let a=e;a>=e-10;a--){const l=this.world.getBlock(t,a,n);if(l!==m.AIR&&l!==m.WATER)return l;if(l===m.WATER)return m.WATER}for(let a=e+1;a<=e+20;a++){const l=this.world.getBlock(t,a,n);if(l!==m.AIR){const c=this.world.getBlock(t,a-1,n);return c!==m.AIR?c:l}}return null}dispose(){this.overlay.remove()}}class Os{static build(t){const e=new an,n=_u/zv,i=Lr,r=new It({color:t.head}),o=new It({color:t.body}),a=new It({color:t.arms}),l=new It({color:t.legs}),c=new st(i.HEAD_SIZE*n,i.HEAD_SIZE*n,i.HEAD_SIZE*n),h=new st(i.BODY_WIDTH*n,i.BODY_HEIGHT*n,i.BODY_DEPTH*n),u=new st(i.ARM_WIDTH*n,i.ARM_HEIGHT*n,i.ARM_DEPTH*n),d=new st(i.LEG_WIDTH*n,i.LEG_HEIGHT*n,i.LEG_DEPTH*n),f=new V(c,r),y=new V(h,o),_=new V(u,a),g=new V(u,a),p=new V(d,l),x=new V(d,l);y.position.set(0,0,0);const b=(i.BODY_HEIGHT/2+i.HEAD_SIZE/2)*n;f.position.set(0,b,0);const S=(i.BODY_WIDTH/2+i.ARM_WIDTH/2)*n,L=(i.BODY_HEIGHT/2-i.ARM_HEIGHT/2)*n;_.position.set(-S,L,0),g.position.set(S,L,0);const C=-.75*n,w=i.LEG_WIDTH/2*n;if(p.position.set(-w,C,0),x.position.set(w,C,0),t.eyes!==void 0){const P=i.HEAD_SIZE*.15*n,T=new st(P,P,P*.5),E=new It({color:t.eyes}),D=new V(T,E),H=new V(T,E),B=i.HEAD_SIZE*.2*n,K=i.HEAD_SIZE*.1*n;D.position.set(-B,b+K,-.225),H.position.set(B,b+K,-.225),e.add(D),e.add(H)}return e.add(f),e.add(y),e.add(_),e.add(g),e.add(p),e.add(x),e.traverse(P=>{P instanceof V&&(P.castShadow=!0,P.receiveShadow=!0)}),{mesh:e,parts:{head:f,body:y,leftArm:_,rightArm:g,leftLeg:p,rightLeg:x}}}static dispose(t){t.mesh.traverse(e=>{e instanceof V&&(e.geometry.dispose(),e.material instanceof Oe&&e.material.dispose())})}}class mS{definition;mesh;parts;currentAnimation="idle";animationTime=0;isAttacking=!1;attackTime=0;ATTACK_DURATION=.25;_isEating=!1;initialHeadY=0;constructor(t){this.definition=t;const e=Os.build(t.colors);this.mesh=e.mesh,this.parts=e.parts,this.initialHeadY=this.parts.head.position.y,this.mesh.name=`character_${t.id}`}get visible(){return this.mesh.visible}set visible(t){this.mesh.visible=t}updateTransform(t,e){this.mesh.position.copy(t),this.mesh.rotation.set(0,e.y,0)}playAnimation(t){if(t==="attack"){this.isAttacking=!0,this.attackTime=0;return}this.currentAnimation!==t&&(this.currentAnimation=t,this.animationTime=0)}triggerAttack(){this.isAttacking=!0,this.attackTime=0}startEating(){this._isEating=!0}stopEating(){this._isEating=!1}isEating(){return this._isEating}updateAnimation(t,e){switch(this.animationTime+=t,this.isAttacking&&(this.attackTime+=t,this.attackTime>=this.ATTACK_DURATION&&(this.isAttacking=!1,this.attackTime=0)),e&&this.currentAnimation==="idle"?this.currentAnimation="walk":!e&&this.currentAnimation==="walk"&&(this.currentAnimation="idle"),this.currentAnimation){case"walk":this.applyWalkAnimation();break;case"jump":this.applyJumpAnimation();break;case"idle":default:this.applyIdleAnimation();break}this.isAttacking&&this.applyAttackAnimation(),this._isEating&&!this.isAttacking&&this.applyEatingAnimation()}applyIdleAnimation(){const t=Math.sin(this.animationTime*2)*.02;this.parts.body.position.y=t,this.parts.head.position.y=this.initialHeadY+t,this.parts.leftArm.rotation.x=0,this.parts.leftArm.rotation.z=0,this.parts.rightArm.rotation.x=0,this.parts.rightArm.rotation.z=0,this.parts.leftLeg.rotation.x=0,this.parts.rightLeg.rotation.x=0}applyWalkAnimation(){const n=Math.sin(this.animationTime*8)*.5;this.parts.leftArm.rotation.x=n,this.parts.leftArm.rotation.z=0,this.parts.rightArm.rotation.x=-n,this.parts.rightArm.rotation.z=0,this.parts.leftLeg.rotation.x=-n,this.parts.rightLeg.rotation.x=n}applyJumpAnimation(){this.parts.leftArm.rotation.x=-Math.PI*.5,this.parts.rightArm.rotation.x=-Math.PI*.5,this.parts.leftLeg.rotation.x=.2,this.parts.rightLeg.rotation.x=.2}applyAttackAnimation(){const t=this.attackTime/this.ATTACK_DURATION;let e;if(t<.4)e=-Math.PI*.6*(t/.4);else{const n=(t-.4)/.6;e=-Math.PI*.6*(1-n)}this.parts.rightArm.rotation.x=e}applyEatingAnimation(){const t=Math.sin(this.animationTime*12);this.parts.rightArm.rotation.x=-Math.PI*.5+t*.15,this.parts.rightArm.rotation.z=.3}dispose(){Os.dispose({mesh:this.mesh,parts:this.parts})}}class Ei{static instance=null;models=new Map;defaultModelId="default";constructor(){}static getInstance(){return Ei.instance||(Ei.instance=new Ei),Ei.instance}registerModel(t){this.models.has(t.id)&&console.warn(`[ModelLibrary] Model '${t.id}' already registered, overwriting`),this.models.set(t.id,t),t.isDefault&&(this.defaultModelId=t.id),console.log(`[ModelLibrary] Registered model: ${t.name} (${t.id})`)}getAvailableModels(){return Array.from(this.models.values())}getModelById(t){return this.models.get(t)}getDefaultModel(){const t=this.models.get(this.defaultModelId);if(!t){const e=this.models.values().next().value;if(!e)throw new Error("[ModelLibrary] No models registered");return e}return t}createModelInstance(t){let e=this.models.get(t);return e||(console.warn(`[ModelLibrary] Model '${t}' not found, using default`),e=this.getDefaultModel()),new mS(e)}getModelCount(){return this.models.size}hasModel(t){return this.models.has(t)}clear(){this.models.clear(),this.defaultModelId="default"}}class ni{static instance=null;static getInstance(){return ni.instance||(ni.instance=new ni),ni.instance}getPreference(){try{const t=localStorage.getItem(zo);if(!t)return null;const e=JSON.parse(t);return typeof e.selectedModelId!="string"||typeof e.savedAt!="number"?(console.warn("[PreferenceManager] Invalid preference structure, clearing"),this.clearPreference(),null):e}catch(t){return console.error("[PreferenceManager] Error reading preference:",t),null}}savePreference(t){try{const e={selectedModelId:t,savedAt:Date.now()};localStorage.setItem(zo,JSON.stringify(e)),console.log(`[PreferenceManager] Saved preference: ${t}`)}catch(e){console.error("[PreferenceManager] Error saving preference:",e)}}clearPreference(){try{localStorage.removeItem(zo),console.log("[PreferenceManager] Cleared preference")}catch(t){console.error("[PreferenceManager] Error clearing preference:",t)}}getSelectedModelId(t="default"){return this.getPreference()?.selectedModelId??t}}class gS{container;renderer;scene;camera;currentModel=null;animationId=null;rotationY=0;isDragging=!1;lastMouseX=0;constructor(t){this.container=t,this.renderer=new qh({antialias:!0,alpha:!0}),this.renderer.setPixelRatio(window.devicePixelRatio),this.renderer.setClearColor(0,0),this.scene=new $h,this.camera=new We(45,1,.1,100),this.camera.position.set(0,.5,3),this.camera.lookAt(0,0,0);const e=new tu(16777215,.6);this.scene.add(e);const n=new Qh(16777215,.8);n.position.set(2,3,2),this.scene.add(n),this.updateSize(),t.appendChild(this.renderer.domElement),this.setupMouseInteraction(),this.animate()}updateSize(){const t=this.container.clientWidth||200,e=this.container.clientHeight||200;this.renderer.setSize(t,e),this.camera.aspect=t/e,this.camera.updateProjectionMatrix()}setupMouseInteraction(){const t=this.renderer.domElement;t.addEventListener("mousedown",e=>{this.isDragging=!0,this.lastMouseX=e.clientX}),t.addEventListener("mousemove",e=>{if(this.isDragging){const n=e.clientX-this.lastMouseX;this.rotationY+=n*.01,this.lastMouseX=e.clientX}}),t.addEventListener("mouseup",()=>{this.isDragging=!1}),t.addEventListener("mouseleave",()=>{this.isDragging=!1})}setModel(t){this.currentModel&&(this.scene.remove(this.currentModel.mesh),Os.dispose(this.currentModel)),this.currentModel=Os.build(t.colors),this.scene.add(this.currentModel.mesh),this.rotationY=0}animate=()=>{this.animationId=requestAnimationFrame(this.animate),!this.isDragging&&this.currentModel&&(this.rotationY+=.005),this.currentModel&&(this.currentModel.mesh.rotation.y=this.rotationY),this.renderer.render(this.scene,this.camera)};dispose(){this.animationId!==null&&cancelAnimationFrame(this.animationId),this.currentModel&&Os.dispose(this.currentModel),this.renderer.dispose(),this.renderer.domElement.parentElement&&this.renderer.domElement.parentElement.removeChild(this.renderer.domElement)}}class yS{container;overlay=null;preview=null;models=[];selectedModelId="default";events=null;_isVisible=!1;constructor(){this.container=document.body}setModels(t){this.models=t}get isVisible(){return this._isVisible}show(t){if(this._isVisible)return;this.events=t,this._isVisible=!0;const e=ni.getInstance().getPreference();e&&(this.selectedModelId=e.selectedModelId),this.overlay=document.createElement("div"),this.overlay.id="character-select-overlay",this.overlay.innerHTML=`
      <style>
        #character-select-overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(0, 0, 0, 0.85);
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 1000;
          font-family: 'Segoe UI', Arial, sans-serif;
        }
        
        .character-select-panel {
          background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
          border-radius: 16px;
          padding: 30px;
          width: 600px;
          max-width: 90vw;
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
          border: 1px solid rgba(255, 255, 255, 0.1);
        }
        
        .character-select-title {
          color: #fff;
          font-size: 24px;
          font-weight: 600;
          margin-bottom: 20px;
          text-align: center;
        }
        
        .character-select-content {
          display: flex;
          gap: 20px;
        }
        
        .character-list {
          flex: 1;
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 10px;
          max-height: 300px;
          overflow-y: auto;
        }
        
        .character-item {
          background: rgba(255, 255, 255, 0.05);
          border: 2px solid transparent;
          border-radius: 8px;
          padding: 12px;
          cursor: pointer;
          transition: all 0.2s ease;
          text-align: center;
        }
        
        .character-item:hover {
          background: rgba(255, 255, 255, 0.1);
          border-color: rgba(255, 255, 255, 0.2);
        }
        
        .character-item.selected {
          background: rgba(74, 144, 226, 0.3);
          border-color: #4a90e2;
        }
        
        .character-item-name {
          color: #fff;
          font-size: 14px;
          margin-top: 8px;
        }
        
        .character-item-color {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          margin: 0 auto;
          border: 2px solid rgba(255, 255, 255, 0.2);
        }
        
        .character-preview-container {
          width: 200px;
          height: 300px;
          background: rgba(0, 0, 0, 0.3);
          border-radius: 8px;
          overflow: hidden;
        }
        
        .character-select-buttons {
          display: flex;
          justify-content: center;
          gap: 15px;
          margin-top: 25px;
        }
        
        .character-select-btn {
          padding: 12px 30px;
          border: none;
          border-radius: 8px;
          font-size: 16px;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.2s ease;
        }
        
        .character-select-btn.confirm {
          background: linear-gradient(135deg, #4a90e2 0%, #357abd 100%);
          color: #fff;
        }
        
        .character-select-btn.confirm:hover {
          background: linear-gradient(135deg, #5a9ff2 0%, #4589cd 100%);
          transform: translateY(-2px);
        }
        
        .character-select-btn.cancel {
          background: rgba(255, 255, 255, 0.1);
          color: #fff;
        }
        
        .character-select-btn.cancel:hover {
          background: rgba(255, 255, 255, 0.2);
        }
      </style>
      
      <div class="character-select-panel">
        <div class="character-select-title">选择角色</div>
        <div class="character-select-content">
          <div class="character-list" id="character-list"></div>
          <div class="character-preview-container" id="character-preview"></div>
        </div>
        <div class="character-select-buttons">
          <button class="character-select-btn cancel" id="btn-cancel">取消</button>
          <button class="character-select-btn confirm" id="btn-confirm">确认</button>
        </div>
      </div>
    `,this.container.appendChild(this.overlay);const n=document.getElementById("character-preview");n&&(this.preview=new gS(n)),this.renderModelList();const i=document.getElementById("btn-confirm"),r=document.getElementById("btn-cancel");i?.addEventListener("click",()=>this.handleConfirm()),r?.addEventListener("click",()=>this.handleCancel())}renderModelList(){const t=document.getElementById("character-list");if(!t)return;t.innerHTML="";for(const n of this.models){const i=document.createElement("div");i.className=`character-item ${n.id===this.selectedModelId?"selected":""}`,i.dataset.modelId=n.id,i.innerHTML=`
        <div class="character-item-color" style="background-color: #${n.colors.body.toString(16).padStart(6,"0")}"></div>
        <div class="character-item-name">${n.name}</div>
      `,i.addEventListener("click",()=>this.selectModel(n)),t.appendChild(i)}const e=this.models.find(n=>n.id===this.selectedModelId)||this.models[0];e&&this.preview&&this.preview.setModel(e)}selectModel(t){this.selectedModelId=t.id,document.querySelectorAll(".character-item").forEach(n=>{const i=n;i.classList.toggle("selected",i.dataset.modelId===t.id)}),this.preview&&this.preview.setModel(t)}handleConfirm(){ni.getInstance().savePreference(this.selectedModelId),this.events&&this.events.onConfirm(this.selectedModelId),this.hide()}handleCancel(){this.events&&this.events.onCancel(),this.hide()}hide(){this._isVisible&&(this._isVisible=!1,this.preview&&(this.preview.dispose(),this.preview=null),this.overlay&&this.overlay.parentElement&&(this.overlay.parentElement.removeChild(this.overlay),this.overlay=null),this.events=null)}dispose(){this.hide()}}const _S={id:"default",name:"默认角色",style:"blockman",isDefault:!0,colors:{head:13935988,body:8421504,arms:13935988,legs:4868682,eyes:0}},vS={id:"steve",name:"Steve",style:"blockman",isDefault:!1,colors:{head:13935988,body:4886745,arms:13935988,legs:4020864,eyes:0}},SS={id:"alex",name:"Alex",style:"blockman",isDefault:!1,colors:{head:15254688,body:6076508,arms:15254688,legs:5917242,eyes:3050327}},MS={id:"knight",name:"骑士",style:"blockman",isDefault:!1,colors:{head:12632256,body:11053224,arms:11579568,legs:8421504,eyes:1710618}},xS={id:"wizard",name:"法师",style:"blockman",isDefault:!1,colors:{head:13935988,body:7028640,arms:8081328,legs:5910416,eyes:9662683}};function ES(){const s=Ei.getInstance();s.registerModel(_S),s.registerModel(vS),s.registerModel(SS),s.registerModel(MS),s.registerModel(xS),console.log(`[Models] Initialized ${s.getModelCount()} character models`)}const bu=5,Wr=0,bS=300*1e3,TS="webcraft-saves",AS=1;function CS(){return"xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g,s=>{const t=Math.random()*16|0;return(s==="x"?t:t&3|8).toString(16)})}function wS(s){const t=new Date(s),e=t.getFullYear(),n=String(t.getMonth()+1).padStart(2,"0"),i=String(t.getDate()).padStart(2,"0"),r=String(t.getHours()).padStart(2,"0"),o=String(t.getMinutes()).padStart(2,"0");return`${e}-${n}-${i} ${r}:${o}`}function sh(s){return{id:s.id,name:s.name,slotType:s.slotType,slotNumber:s.slotNumber,updatedAt:s.updatedAt,seed:s.seed}}class Vr{db=null;initPromise=null;static isSupported(){return"indexedDB"in window&&window.indexedDB!==null}async initialize(){return this.initPromise?this.initPromise:(this.initPromise=this.doInitialize(),this.initPromise)}async doInitialize(){return Vr.isSupported()?new Promise(t=>{const e=indexedDB.open(TS,AS);e.onerror=()=>{console.error("[IndexedDBStorage] Failed to open database:",e.error),t(!1)},e.onsuccess=()=>{this.db=e.result,console.log("[IndexedDBStorage] Database opened successfully"),t(!0)},e.onupgradeneeded=n=>{const i=n.target.result;if(!i.objectStoreNames.contains("saves")){const r=i.createObjectStore("saves",{keyPath:"id"});r.createIndex("slotType","slotType",{unique:!1}),r.createIndex("slotNumber","slotNumber",{unique:!1}),r.createIndex("updatedAt","updatedAt",{unique:!1})}i.objectStoreNames.contains("chunks")||i.createObjectStore("chunks",{keyPath:["saveId","chunkKey"]}).createIndex("saveId","saveId",{unique:!1}),console.log("[IndexedDBStorage] Database schema created/upgraded")}}):(console.error("[IndexedDBStorage] IndexedDB not supported"),!1)}ensureDB(){if(!this.db)throw new Error("Database not initialized. Call initialize() first.");return this.db}async putSave(t){const e=this.ensureDB();return new Promise((n,i)=>{const a=e.transaction(["saves"],"readwrite").objectStore("saves").put(t);a.onsuccess=()=>n(),a.onerror=()=>i(a.error)})}async getSave(t){const e=this.ensureDB();return new Promise((n,i)=>{const a=e.transaction(["saves"],"readonly").objectStore("saves").get(t);a.onsuccess=()=>n(a.result||null),a.onerror=()=>i(a.error)})}async getAllSaves(){const t=this.ensureDB();return new Promise((e,n)=>{const o=t.transaction(["saves"],"readonly").objectStore("saves").getAll();o.onsuccess=()=>e(o.result||[]),o.onerror=()=>n(o.error)})}async getSaveBySlot(t){const e=this.ensureDB();return new Promise((n,i)=>{const l=e.transaction(["saves"],"readonly").objectStore("saves").index("slotNumber").get(t);l.onsuccess=()=>n(l.result||null),l.onerror=()=>i(l.error)})}async deleteSave(t){const e=this.ensureDB();return new Promise((n,i)=>{const a=e.transaction(["saves"],"readwrite").objectStore("saves").delete(t);a.onsuccess=()=>n(),a.onerror=()=>i(a.error)})}async putChunk(t){const e=this.ensureDB();return new Promise((n,i)=>{const a=e.transaction(["chunks"],"readwrite").objectStore("chunks").put(t);a.onsuccess=()=>n(),a.onerror=()=>i(a.error)})}async putChunks(t){if(t.length===0)return;const e=this.ensureDB();return new Promise((n,i)=>{const o=e.transaction(["chunks"],"readwrite").objectStore("chunks");let a=0,l=!1;for(const c of t){const h=o.put(c);h.onsuccess=()=>{a++,a===t.length&&!l&&n()},h.onerror=()=>{l||(l=!0,i(h.error))}}})}async getChunksBySaveId(t){const e=this.ensureDB();return new Promise((n,i)=>{const l=e.transaction(["chunks"],"readonly").objectStore("chunks").index("saveId").getAll(t);l.onsuccess=()=>n(l.result||[]),l.onerror=()=>i(l.error)})}async deleteChunksBySaveId(t){const e=this.ensureDB();return new Promise((n,i)=>{const l=e.transaction(["chunks"],"readwrite").objectStore("chunks").index("saveId").openCursor(IDBKeyRange.only(t));l.onsuccess=()=>{const c=l.result;c?(c.delete(),c.continue()):n()},l.onerror=()=>i(l.error)})}async clearAll(){const t=this.ensureDB();return new Promise((e,n)=>{const i=t.transaction(["saves","chunks"],"readwrite"),r=i.objectStore("saves").clear(),o=i.objectStore("chunks").clear();let a=0;const l=()=>{a++,a===2&&e()};r.onsuccess=l,o.onsuccess=l,i.onerror=()=>n(i.error)})}async getStorageEstimate(){if("storage"in navigator&&"estimate"in navigator.storage){const t=await navigator.storage.estimate();return{usage:t.usage||0,quota:t.quota||0}}return null}close(){this.db&&(this.db.close(),this.db=null,this.initPromise=null)}}class RS{storage;initialized=!1;saveLock=!1;constructor(){this.storage=new Vr}async initialize(){if(this.initialized)return!0;const t=await this.storage.initialize();return this.initialized=t,t?console.log("[SaveManager] Initialized successfully"):console.error("[SaveManager] Failed to initialize"),t}isSupported(){return Vr.isSupported()}isInitialized(){return this.initialized}async save(t,e,n){if(!this.initialized)return{success:!1,error:"Save system not initialized"};if(t<0||t>bu)return{success:!1,error:`Invalid slot number: ${t}`};const i=e.trim();if(!i||i.length>50)return{success:!1,error:"Save name must be 1-50 characters"};if(this.saveLock)return{success:!1,error:"Another save operation is in progress"};this.saveLock=!0;try{const r=t===Wr?"auto":"manual",o=Date.now(),a=await this.storage.getSaveBySlot(t);let l,c;a?(l=a.id,c=a.createdAt,await this.storage.deleteChunksBySaveId(l)):(l=CS(),c=o);const h={id:l,name:i,slotType:r,slotNumber:t,createdAt:c,updatedAt:o,seed:n.seed,playerState:n.playerState};await this.storage.putSave(h);const u=10,d=n.modifiedChunks.map(f=>({saveId:l,chunkKey:f.key,blocks:f.blocks}));for(let f=0;f<d.length;f+=u){const y=d.slice(f,f+u);await this.storage.putChunks(y)}return console.log(`[SaveManager] Saved to slot ${t}: "${i}" (${d.length} chunks)`),{success:!0,saveId:l}}catch(r){return console.error("[SaveManager] Save failed:",r),{success:!1,error:String(r)}}finally{this.saveLock=!1}}async load(t){if(!this.initialized)return{success:!1,error:"Save system not initialized"};try{const e=await this.storage.getSave(t);if(!e)return{success:!1,error:"Save not found"};const n=await this.storage.getChunksBySaveId(t);return console.log(`[SaveManager] Loaded save: "${e.name}" (${n.length} chunks)`),{success:!0,saveData:e,chunks:n}}catch(e){return console.error("[SaveManager] Load failed:",e),{success:!1,error:String(e)}}}async listSaves(){if(!this.initialized)return[];try{const e=(await this.storage.getAllSaves()).map(sh);return e.sort((n,i)=>i.updatedAt-n.updatedAt),e}catch(t){return console.error("[SaveManager] Failed to list saves:",t),[]}}async getSlot(t){if(!this.initialized)return null;try{const e=await this.storage.getSaveBySlot(t);return e?sh(e):null}catch(e){return console.error("[SaveManager] Failed to get slot:",e),null}}async getAutoSave(){return this.getSlot(Wr)}async rename(t,e){if(!this.initialized)return!1;const n=e.trim();if(!n||n.length>50)return!1;try{const i=await this.storage.getSave(t);return i?(i.name=n,i.updatedAt=Date.now(),await this.storage.putSave(i),console.log(`[SaveManager] Renamed save to: "${n}"`),!0):!1}catch(i){return console.error("[SaveManager] Rename failed:",i),!1}}async delete(t){if(!this.initialized)return!1;try{return await this.storage.deleteChunksBySaveId(t),await this.storage.deleteSave(t),console.log(`[SaveManager] Deleted save: ${t}`),!0}catch(e){return console.error("[SaveManager] Delete failed:",e),!1}}isSaving(){return this.saveLock}async getStorageEstimate(){return this.storage.getStorageEstimate()}close(){this.storage.close(),this.initialized=!1}}class IS{container;saveManager;callbacks=null;isVisible=!1;isLoading=!1;saves=[];constructor(t){this.saveManager=t,this.container=this.createUI(),document.body.appendChild(this.container)}setCallbacks(t){this.callbacks=t}createUI(){const t=document.createElement("div");t.id="save-panel",t.style.cssText=`
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 400px;
      max-height: 80vh;
      background: rgba(0, 0, 0, 0.9);
      border: 2px solid rgba(255, 255, 255, 0.3);
      border-radius: 8px;
      padding: 16px;
      display: none;
      flex-direction: column;
      gap: 12px;
      z-index: 2000;
      font-family: sans-serif;
      color: white;
      pointer-events: auto;
    `;const e=document.createElement("div");e.style.cssText=`
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding-bottom: 12px;
      border-bottom: 1px solid rgba(255, 255, 255, 0.2);
    `;const n=document.createElement("h2");n.textContent="存档管理",n.style.cssText=`
      margin: 0;
      font-size: 18px;
      font-weight: bold;
    `,e.appendChild(n);const i=document.createElement("button");i.textContent="✕",i.style.cssText=`
      background: none;
      border: none;
      color: white;
      font-size: 20px;
      cursor: pointer;
      padding: 4px 8px;
      opacity: 0.7;
      transition: opacity 0.2s;
    `,i.addEventListener("click",()=>this.hide()),i.addEventListener("mouseenter",()=>{i.style.opacity="1"}),i.addEventListener("mouseleave",()=>{i.style.opacity="0.7"}),e.appendChild(i),t.appendChild(e);const r=document.createElement("div");r.id="save-slots",r.style.cssText=`
      display: flex;
      flex-direction: column;
      gap: 8px;
      overflow-y: auto;
      max-height: 400px;
    `,t.appendChild(r);const o=document.createElement("div");o.style.cssText=`
      display: flex;
      gap: 8px;
      padding-top: 12px;
      border-top: 1px solid rgba(255, 255, 255, 0.2);
    `;const a=this.createButton("新建世界","warning");return a.addEventListener("click",()=>this.handleNewWorld()),o.appendChild(a),t.appendChild(o),t}createButton(t,e="secondary"){const n=document.createElement("button");n.textContent=t;const r={primary:{bg:"rgba(76, 175, 80, 0.8)",hover:"rgba(76, 175, 80, 1)"},secondary:{bg:"rgba(255, 255, 255, 0.1)",hover:"rgba(255, 255, 255, 0.2)"},danger:{bg:"rgba(244, 67, 54, 0.8)",hover:"rgba(244, 67, 54, 1)"},warning:{bg:"rgba(255, 152, 0, 0.8)",hover:"rgba(255, 152, 0, 1)"}}[e];return n.style.cssText=`
      background: ${r.bg};
      border: none;
      border-radius: 4px;
      padding: 8px 16px;
      color: white;
      font-size: 14px;
      cursor: pointer;
      transition: background 0.2s;
      flex: 1;
    `,n.addEventListener("mouseenter",()=>{n.style.background=r.hover}),n.addEventListener("mouseleave",()=>{n.style.background=r.bg}),n}renderSlots(){const t=document.getElementById("save-slots");if(!t)return;t.innerHTML="";const e=this.saves.find(n=>n.slotType==="auto");t.appendChild(this.createSlotElement(Wr,e,!0));for(let n=1;n<=bu;n++){const i=this.saves.find(r=>r.slotNumber===n&&r.slotType==="manual");t.appendChild(this.createSlotElement(n,i,!1))}}createSlotElement(t,e,n){const i=document.createElement("div");i.style.cssText=`
      display: flex;
      flex-direction: column;
      gap: 8px;
      padding: 12px;
      background: rgba(255, 255, 255, 0.05);
      border-radius: 4px;
      border: 1px solid rgba(255, 255, 255, 0.1);
    `;const r=document.createElement("div");r.style.cssText=`
      display: flex;
      justify-content: space-between;
      align-items: center;
    `;const o=document.createElement("span");if(o.textContent=n?"自动存档":`槽位 ${t}`,o.style.cssText=`
      font-weight: bold;
      color: ${n?"#FFA726":"#90CAF9"};
    `,r.appendChild(o),e){const a=document.createElement("span");a.textContent=wS(e.updatedAt),a.style.cssText=`
        font-size: 12px;
        color: rgba(255, 255, 255, 0.6);
      `,r.appendChild(a)}if(i.appendChild(r),e){const a=document.createElement("div");a.style.cssText=`
        display: flex;
        flex-direction: column;
        gap: 4px;
      `;const l=document.createElement("div");l.style.cssText=`
        display: flex;
        align-items: center;
        gap: 8px;
      `;const c=document.createElement("span");if(c.textContent=e.name,c.style.fontSize="14px",l.appendChild(c),!n){const f=document.createElement("button");f.textContent="✏️",f.title="重命名",f.style.cssText=`
          background: none;
          border: none;
          cursor: pointer;
          font-size: 14px;
          padding: 2px;
          opacity: 0.7;
        `,f.addEventListener("click",()=>this.handleRename(e)),l.appendChild(f)}a.appendChild(l);const h=document.createElement("span");h.textContent=`种子: ${e.seed}`,h.style.cssText=`
        font-size: 12px;
        color: rgba(255, 255, 255, 0.5);
      `,a.appendChild(h),i.appendChild(a);const u=document.createElement("div");u.style.cssText=`
        display: flex;
        gap: 8px;
        margin-top: 4px;
      `;const d=this.createButton("加载","primary");if(d.addEventListener("click",()=>this.handleLoad(e)),u.appendChild(d),!n){const f=this.createButton("覆盖保存","secondary");f.addEventListener("click",()=>this.handleSave(t,e.name)),u.appendChild(f);const y=this.createButton("删除","danger");y.addEventListener("click",()=>this.handleDelete(e)),u.appendChild(y)}i.appendChild(u)}else if(n){const a=document.createElement("span");a.textContent="暂无自动存档",a.style.cssText=`
          color: rgba(255, 255, 255, 0.4);
          font-style: italic;
        `,i.appendChild(a)}else{const a=document.createElement("span");a.textContent="空槽位",a.style.cssText=`
          color: rgba(255, 255, 255, 0.4);
          font-style: italic;
        `,i.appendChild(a);const l=this.createButton("保存到此槽位","primary");l.addEventListener("click",()=>this.handleSaveNew(t)),i.appendChild(l)}return i}async handleSaveNew(t){const e=prompt("请输入存档名称:",`存档 ${t}`);e&&await this.handleSave(t,e)}async handleSave(t,e){if(!this.callbacks||this.isLoading)return;const n=this.saves.find(i=>i.slotNumber===t&&i.slotType==="manual");if(!(n&&!confirm(`确定要覆盖存档 "${n.name}" 吗？`))){this.setLoading(!0);try{const i=await this.callbacks.onSave(t,e);i.success?(this.showToast("保存成功","success"),await this.refresh()):this.showToast(`保存失败: ${i.error}`,"error")}catch(i){this.showToast(`保存失败: ${i}`,"error")}finally{this.setLoading(!1)}}}async handleLoad(t){if(!(!this.callbacks||this.isLoading||!confirm(`确定要加载存档 "${t.name}" 吗？
当前未保存的进度将丢失。`))){this.setLoading(!0);try{await this.callbacks.onLoad(t.id),this.showToast("加载成功","success"),this.hide()}catch(n){this.showToast(`加载失败: ${n}`,"error")}finally{this.setLoading(!1)}}}async handleDelete(t){if(!(!this.callbacks||this.isLoading||!confirm(`确定要删除存档 "${t.name}" 吗？
此操作无法撤销。`))){this.setLoading(!0);try{await this.callbacks.onDelete(t.id)?(this.showToast("删除成功","success"),await this.refresh()):this.showToast("删除失败","error")}catch(n){this.showToast(`删除失败: ${n}`,"error")}finally{this.setLoading(!1)}}}async handleRename(t){if(!this.callbacks||this.isLoading)return;const e=prompt("请输入新名称:",t.name);if(!(!e||e===t.name)){this.setLoading(!0);try{await this.callbacks.onRename(t.id,e)?(this.showToast("重命名成功","success"),await this.refresh()):this.showToast("重命名失败","error")}catch(n){this.showToast(`重命名失败: ${n}`,"error")}finally{this.setLoading(!1)}}}async handleNewWorld(){if(!(!this.callbacks||this.isLoading||!confirm(`确定要创建新世界吗？
当前未保存的进度将丢失。`))){this.setLoading(!0);try{await this.callbacks.onNewWorld(),this.showToast("新世界已创建","success"),this.hide()}catch(e){this.showToast(`创建失败: ${e}`,"error")}finally{this.setLoading(!1)}}}setLoading(t){this.isLoading=t,this.container.style.opacity=t?"0.7":"1",this.container.style.pointerEvents=t?"none":"auto"}showToast(t,e){const n=document.createElement("div");n.textContent=t,n.style.cssText=`
      position: fixed;
      bottom: 20px;
      left: 50%;
      transform: translateX(-50%);
      padding: 12px 24px;
      border-radius: 4px;
      color: white;
      font-family: sans-serif;
      font-size: 14px;
      z-index: 3000;
      animation: fadeIn 0.3s ease;
      background: ${e==="success"?"rgba(76, 175, 80, 0.9)":e==="error"?"rgba(244, 67, 54, 0.9)":"rgba(33, 150, 243, 0.9)"};
    `,document.body.appendChild(n),setTimeout(()=>{n.style.opacity="0",n.style.transition="opacity 0.3s",setTimeout(()=>n.remove(),300)},2e3)}async show(){this.isVisible||(this.isVisible=!0,this.container.style.display="flex",await this.refresh())}hide(){this.isVisible&&(this.isVisible=!1,this.container.style.display="none")}async toggle(){this.isVisible?this.hide():await this.show()}isOpen(){return this.isVisible}async refresh(){this.saves=await this.saveManager.listSaves(),this.renderSlots()}dispose(){this.container.remove()}}class DS{saveManager;dataProvider=null;onComplete=null;intervalId=null;running=!1;constructor(t){this.saveManager=t}setDataProvider(t){this.dataProvider=t}onSaveComplete(t){this.onComplete=t}start(t=bS){if(this.running){console.log("[AutoSave] Already running");return}this.running=!0,console.log(`[AutoSave] Started with interval: ${t/1e3}s`),this.intervalId=setInterval(()=>{this.saveNow()},t)}stop(){this.running&&(this.intervalId!==null&&(clearInterval(this.intervalId),this.intervalId=null),this.running=!1,console.log("[AutoSave] Stopped"))}isRunning(){return this.running}async saveNow(){if(!this.dataProvider)return{success:!1,error:"No data provider set"};if(this.saveManager.isSaving())return{success:!1,error:"Another save in progress"};console.log("[AutoSave] Triggering auto-save...");try{const t=this.dataProvider(),e=await this.saveManager.save(Wr,"自动存档",t);return this.onComplete&&this.onComplete(e),e}catch(t){const e={success:!1,error:String(t)};return this.onComplete&&this.onComplete(e),e}}dispose(){this.stop(),this.dataProvider=null,this.onComplete=null}}class PS{listeners=[];applyDamage(t){const e=t.target.takeDamage(t.amount,t.source);for(const n of this.listeners)n(t,e);return e}addListener(t){this.listeners.push(t)}removeListener(t){const e=this.listeners.indexOf(t);e!==-1&&this.listeners.splice(e,1)}clearListeners(){this.listeners=[]}}let Go=null;function bi(){return Go||(Go=new PS),Go}class LS{stats;starvationTimer=0;constructor(t){this.stats=t}update(t){this.processExhaustion(),this.processStarvation(t)}processExhaustion(){const t=this.stats.exhaustion;if(t>=Ba){const e=Math.floor(t/Ba);this.stats.consumeExhaustion();const n=Math.max(0,this.stats.hunger-e);this.stats.setHunger(n)}}processStarvation(t){if(this.stats.hunger>0){this.starvationTimer=0;return}if(!(this.stats.health<=Yc)&&(this.starvationTimer+=t,this.starvationTimer>=Kc)){this.starvationTimer-=Kc;const e=Math.min(xv,this.stats.health-Yc);e>0&&bi().applyDamage({target:this.stats,amount:e,source:ei.STARVATION})}}reset(){this.starvationTimer=0}}class OS{stats;regenAccumulator=0;constructor(t){this.stats=t}update(t){if(this.stats.isDead){this.regenAccumulator=0;return}if(this.stats.health>=this.stats.maxHealth){this.regenAccumulator=0;return}if(this.stats.hunger<Sv){this.regenAccumulator=0;return}if(this.regenAccumulator+=Mv*t,this.regenAccumulator>=1){const e=Math.floor(this.regenAccumulator);this.regenAccumulator-=e,this.stats.heal(e),this.stats.addExhaustion(Ba*e*.5)}}reset(){this.regenAccumulator=0}}class NS{stats;lastGroundedY=0;wasGrounded=!0;drowningTimer=0;lavaDamageTimer=0;cactusCooldown=0;constructor(t){this.stats=t}update(t,e,n){this.cactusCooldown>0&&(this.cactusCooldown-=t),this.checkFallDamage(e),this.checkDrowning(t,e),this.checkLavaDamage(t,e,n),this.checkCactusDamage(e,n)}checkFallDamage(t){if(t.isGrounded){if(!this.wasGrounded){const e=this.lastGroundedY-t.position.y;if(e>$c){const n=Math.floor((e-$c)*bv);n>0&&bi().applyDamage({target:this.stats,amount:n,source:ei.FALL,position:{x:t.position.x,y:t.position.y,z:t.position.z}})}}this.lastGroundedY=t.position.y}else this.wasGrounded&&(this.lastGroundedY=t.position.y);!t.isGrounded&&t.velocity.y>0&&(this.lastGroundedY=Math.max(this.lastGroundedY,t.position.y)),this.wasGrounded=t.isGrounded}checkDrowning(t,e){if(e.isSubmerged){const n=Math.max(0,this.stats.oxygen-t);this.stats.setOxygen(n),this.stats.oxygen<=0&&(this.drowningTimer+=t,this.drowningTimer>=qc&&(this.drowningTimer-=qc,bi().applyDamage({target:this.stats,amount:Ev,source:ei.DROWNING,position:{x:e.position.x,y:e.position.y,z:e.position.z}})))}else{if(this.stats.oxygen<bn){const n=Math.min(bn,this.stats.oxygen+t*2);this.stats.setOxygen(n)}this.drowningTimer=0}}checkLavaDamage(t,e,n){this.isInBlock(e,n,m.LAVA)?(this.lavaDamageTimer+=t,this.lavaDamageTimer>=Zc&&(this.lavaDamageTimer-=Zc,bi().applyDamage({target:this.stats,amount:Tv,source:ei.LAVA,position:{x:e.position.x,y:e.position.y,z:e.position.z}}))):this.lavaDamageTimer=0}checkCactusDamage(t,e){if(this.cactusCooldown>0)return;this.isTouchingBlock(t,e,m.CACTUS)&&(this.cactusCooldown=Cv,bi().applyDamage({target:this.stats,amount:Av,source:ei.CACTUS,position:{x:t.position.x,y:t.position.y,z:t.position.z}}))}isInBlock(t,e,n){const i=t.width/2,r=t.height/2,o=Math.floor(t.position.x-i),a=Math.floor(t.position.x+i),l=Math.floor(t.position.y-r),c=Math.floor(t.position.y+r),h=Math.floor(t.position.z-i),u=Math.floor(t.position.z+i);for(let d=o;d<=a;d++)for(let f=l;f<=c;f++)for(let y=h;y<=u;y++)if(e.getBlock(d,f,y)===n)return!0;return!1}isTouchingBlock(t,e,n){const i=t.width/2+.1,r=t.height/2,o=Math.floor(t.position.x-i),a=Math.floor(t.position.x+i),l=Math.floor(t.position.y-r),c=Math.floor(t.position.y+r),h=Math.floor(t.position.z-i),u=Math.floor(t.position.z+i);for(let d=o;d<=a;d++)for(let f=l;f<=c;f++)for(let y=h;y<=u;y++)if(e.getBlock(d,f,y)===n)return!0;return!1}reset(t){this.lastGroundedY=t,this.wasGrounded=!0,this.drowningTimer=0,this.lavaDamageTimer=0,this.cactusCooldown=0}}const rh=10;class kS{container;hearts=[];currentHealth=xi;visible=!0;constructor(){this.container=this.createContainer(),this.createHearts(),this.update(xi)}createContainer(){const t=document.createElement("div");return t.id="health-bar",t.style.cssText=`
      position: fixed;
      bottom: 90px;
      left: calc(50% - 234px);
      display: flex;
      gap: 2px;
      z-index: 100;
      pointer-events: none;
    `,t}createHearts(){for(let t=0;t<rh;t++){const e=document.createElement("div");e.className="heart full",e.style.cssText=`
        width: 18px;
        height: 18px;
        background-size: contain;
        background-repeat: no-repeat;
        background-position: center;
        image-rendering: pixelated;
        filter: drop-shadow(1px 1px 1px rgba(0,0,0,0.5));
      `,this.setHeartState(e,"full"),this.hearts.push(e),this.container.appendChild(e)}}setHeartState(t,e){t.innerHTML=e==="empty"?"🖤":e==="half"?"💔":"❤️",t.style.fontSize="16px",t.style.textAlign="center",t.style.lineHeight="18px",t.className=`heart ${e}`}update(t){this.currentHealth=Math.max(0,Math.min(xi,t));for(let e=0;e<rh;e++){const n=this.currentHealth-e*2,i=this.hearts[e];n>=2?this.setHeartState(i,"full"):n>=1?this.setHeartState(i,"half"):this.setHeartState(i,"empty")}}getElement(){return this.container}show(){this.visible=!0,this.container.style.display="flex"}hide(){this.visible=!1,this.container.style.display="none"}isVisible(){return this.visible}dispose(){this.container.remove(),this.hearts=[]}}const oh=10;class US{container;foodIcons=[];currentHunger=zn;visible=!0;constructor(){this.container=this.createContainer(),this.createFoodIcons(),this.update(zn)}createContainer(){const t=document.createElement("div");return t.id="hunger-bar",t.style.cssText=`
      position: fixed;
      bottom: 90px;
      right: calc(50% - 234px);
      display: flex;
      flex-direction: row-reverse;
      gap: 2px;
      z-index: 100;
      pointer-events: none;
    `,t}createFoodIcons(){for(let t=0;t<oh;t++){const e=document.createElement("div");e.className="food full",e.style.cssText=`
        width: 18px;
        height: 18px;
        background-size: contain;
        background-repeat: no-repeat;
        background-position: center;
        image-rendering: pixelated;
        filter: drop-shadow(1px 1px 1px rgba(0,0,0,0.5));
      `,this.setFoodState(e,"full"),this.foodIcons.push(e),this.container.appendChild(e)}}setFoodState(t,e){t.innerHTML=e==="empty"?"🦴":e==="half"?"🍖":"🍗",t.style.fontSize="16px",t.style.textAlign="center",t.style.lineHeight="18px",t.className=`food ${e}`}update(t){this.currentHunger=Math.max(0,Math.min(zn,t));for(let e=0;e<oh;e++){const n=this.currentHunger-e*2,i=this.foodIcons[e];n>=2?this.setFoodState(i,"full"):n>=1?this.setFoodState(i,"half"):this.setFoodState(i,"empty")}}getElement(){return this.container}show(){this.visible=!0,this.container.style.display="flex"}hide(){this.visible=!1,this.container.style.display="none"}isVisible(){return this.visible}dispose(){this.container.remove(),this.foodIcons=[]}}const ah=10;class FS{container;bubbles=[];currentOxygen=bn;visible=!1;constructor(){this.container=this.createContainer(),this.createBubbles(),this.update(bn)}createContainer(){const t=document.createElement("div");return t.id="oxygen-bar",t.style.cssText=`
      position: fixed;
      bottom: 110px;
      right: calc(50% - 234px);
      display: none;
      flex-direction: row-reverse;
      gap: 2px;
      z-index: 100;
      pointer-events: none;
    `,t}createBubbles(){for(let t=0;t<ah;t++){const e=document.createElement("div");e.className="bubble full",e.style.cssText=`
        width: 18px;
        height: 18px;
        font-size: 14px;
        text-align: center;
        line-height: 18px;
        filter: drop-shadow(1px 1px 1px rgba(0,0,0,0.5));
      `,e.innerHTML="🫧",this.bubbles.push(e),this.container.appendChild(e)}}setBubbleState(t,e){t.innerHTML=e==="empty"?"💨":"🫧",t.style.opacity=e==="empty"?"0.5":"1",t.className=`bubble ${e}`}update(t){this.currentOxygen=Math.max(0,Math.min(bn,t));const e=this.currentOxygen<bn;if(e!==this.visible&&(this.visible=e,this.container.style.display=e?"flex":"none"),!!this.visible)for(let n=0;n<ah;n++){const i=this.bubbles[n];n<Math.ceil(this.currentOxygen)?this.setBubbleState(i,"full"):this.setBubbleState(i,"empty")}}getElement(){return this.container}show(){this.visible=!0,this.container.style.display="flex"}hide(){this.visible=!1,this.container.style.display="none"}isVisible(){return this.visible}dispose(){this.container.remove(),this.bubbles=[]}}class BS{overlay;isActive=!1;timer=0;delayTimer=0;constructor(){this.overlay=this.createOverlay()}createOverlay(){const t=document.createElement("div");return t.id="damage-overlay",t.style.cssText=`
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: radial-gradient(ellipse at center, transparent 0%, rgba(255, 0, 0, 0.4) 100%);
      pointer-events: none;
      z-index: 1000;
      opacity: 0;
      transition: opacity 0.1s ease-out;
    `,t}trigger(){this.isActive=!0,this.delayTimer=gv,this.timer=Xc}update(t){if(this.isActive){if(this.delayTimer>0){this.delayTimer-=t,this.delayTimer<=0&&(this.overlay.style.opacity="1");return}if(this.timer-=t,this.timer<=0)this.isActive=!1,this.overlay.style.opacity="0";else{const e=this.timer/Xc;this.overlay.style.opacity=String(e)}}}getElement(){return this.overlay}hide(){this.isActive=!1,this.timer=0,this.delayTimer=0,this.overlay.style.opacity="0"}isShowing(){return this.isActive}dispose(){this.overlay.remove()}}class zS{overlay;respawnButton;onRespawn=null;visible=!1;constructor(){this.overlay=this.createOverlay(),this.respawnButton=this.createRespawnButton(),this.overlay.appendChild(this.respawnButton)}createOverlay(){const t=document.createElement("div");t.id="death-screen",t.style.cssText=`
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(128, 0, 0, 0.7);
      display: none;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      z-index: 2000;
    `;const e=document.createElement("div");return e.textContent="你死了!",e.style.cssText=`
      font-size: 48px;
      font-weight: bold;
      color: #ffffff;
      text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.8);
      margin-bottom: 40px;
      font-family: 'Arial', sans-serif;
    `,t.appendChild(e),t}createRespawnButton(){const t=document.createElement("button");return t.textContent="重生",t.style.cssText=`
      padding: 15px 40px;
      font-size: 24px;
      font-weight: bold;
      color: #ffffff;
      background: linear-gradient(180deg, #5a5a5a 0%, #3a3a3a 100%);
      border: 3px solid #2a2a2a;
      border-radius: 5px;
      cursor: pointer;
      font-family: 'Arial', sans-serif;
      transition: all 0.2s ease;
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.4);
    `,t.addEventListener("mouseenter",()=>{t.style.background="linear-gradient(180deg, #6a6a6a 0%, #4a4a4a 100%)",t.style.transform="scale(1.05)"}),t.addEventListener("mouseleave",()=>{t.style.background="linear-gradient(180deg, #5a5a5a 0%, #3a3a3a 100%)",t.style.transform="scale(1)"}),t.addEventListener("click",()=>{this.onRespawn&&this.onRespawn()}),t}setOnRespawn(t){this.onRespawn=t}show(){this.visible=!0,this.overlay.style.display="flex",document.pointerLockElement&&document.exitPointerLock()}hide(){this.visible=!1,this.overlay.style.display="none"}isVisible(){return this.visible}getElement(){return this.overlay}dispose(){this.overlay.remove()}}class GS{player;world;spawnPosition;hungerSystem;healthRegenSystem;environmentDamage;healthBar;hungerBar;oxygenBar;damageOverlay;deathScreen;initialized=!1;onRespawnCallback;lastPosition=new I;wasJumping=!1;constructor(t){this.player=t.player,this.world=t.world,this.spawnPosition=t.spawnPosition.clone(),this.onRespawnCallback=t.onRespawn;const e=this.player.stats;this.hungerSystem=new LS(e),this.healthRegenSystem=new OS(e),this.environmentDamage=new NS(e),this.healthBar=new kS,this.hungerBar=new US,this.oxygenBar=new FS,this.damageOverlay=new BS,this.deathScreen=new zS,this.setupCallbacks(e),this.lastPosition.copy(this.player.position)}setupCallbacks(t){t.setCallbacks({onDamage:()=>{this.damageOverlay.trigger()},onDeath:()=>{this.deathScreen.show()},onHealthChange:e=>{this.healthBar.update(e)},onHungerChange:e=>{this.hungerBar.update(e)},onOxygenChange:e=>{this.oxygenBar.update(e)}}),bi().addListener((e,n)=>{n&&e.source!==ei.STARVATION&&this.damageOverlay.trigger()}),this.deathScreen.setOnRespawn(()=>{this.respawn()})}initialize(){if(this.initialized)return;document.body.appendChild(this.healthBar.getElement()),document.body.appendChild(this.hungerBar.getElement()),document.body.appendChild(this.oxygenBar.getElement()),document.body.appendChild(this.damageOverlay.getElement()),document.body.appendChild(this.deathScreen.getElement());const t=this.player.stats;this.healthBar.update(t.health),this.hungerBar.update(t.hunger),this.oxygenBar.update(t.oxygen),this.initialized=!0}update(t){if(!this.initialized||this.player.stats.isDead)return;this.player.stats.update(t),this.trackMovement(t),this.hungerSystem.update(t),this.healthRegenSystem.update(t),this.environmentDamage.update(t,{position:this.player.position,velocity:this.player.velocity,isGrounded:this.player.isGrounded,isInWater:this.player.isInWater,isSubmerged:this.player.isSubmerged,width:this.player.width,height:this.player.height},this.world),this.damageOverlay.update(t)}trackMovement(t){const e=this.player.stats,n=this.player.position,i=n.x-this.lastPosition.x,r=n.z-this.lastPosition.z,o=Math.sqrt(i*i+r*r),a=o/t>5.5,l=this.player.velocity.y>0&&!this.player.isGrounded;this.player.isInWater&&o>.01?e.addExhaustion(o*vv):a&&o>.01&&e.addExhaustion(o*yv),l&&!this.wasJumping&&this.player.isGrounded===!1&&e.addExhaustion(_v),this.lastPosition.copy(n),this.wasJumping=l}respawn(){this.player.stats.respawn(),this.hungerSystem.reset(),this.healthRegenSystem.reset(),this.environmentDamage.reset(this.spawnPosition.y),this.deathScreen.hide(),this.damageOverlay.hide(),this.player.position.copy(this.spawnPosition),this.player.velocity.set(0,0,0),this.lastPosition.copy(this.spawnPosition),this.onRespawnCallback&&this.onRespawnCallback()}setSpawnPosition(t){this.spawnPosition.copy(t)}isPlayerDead(){return this.player.stats.isDead}getStats(){return this.player.stats}hideUI(){this.healthBar.hide(),this.hungerBar.hide(),this.oxygenBar.hide()}showUI(){this.healthBar.show(),this.hungerBar.show()}dispose(){this.healthBar.dispose(),this.hungerBar.dispose(),this.oxygenBar.dispose(),this.damageOverlay.dispose(),this.deathScreen.dispose(),bi().clearListeners(),this.initialized=!1}}const lh=3,Ho=3,ch=.5;class HS{entityManager;attackCooldownTimer=0;raycaster;lastHitTime=0;HIT_MEMORY_DURATION=.3;constructor(t){this.entityManager=t,this.raycaster=new eu,this.raycaster.far=Ho}canAttack(){return this.attackCooldownTimer<=0}hasRecentHit(){return this.lastHitTime>0}update(t){this.attackCooldownTimer>0&&(this.attackCooldownTimer-=t),this.lastHitTime>0&&(this.lastHitTime-=t)}attack(t,e){const n={hit:!1,target:null,distance:0,damage:0};if(!this.canAttack())return n;this.attackCooldownTimer=ch,this.raycaster.set(t,e.normalize());const i=this.entityManager.getAll().filter(a=>a instanceof Rn&&!a.isDead);let r=null,o=Ho;for(const a of i){const l=a.getMesh();if(!l)continue;const c=new oi().setFromObject(l),h=new I;if(this.raycaster.ray.intersectBox(c,h)){const u=t.distanceTo(h);u<=Ho&&u<o&&(o=u,r=a)}}return r&&r.takeDamage(lh)&&(n.hit=!0,n.target=r,n.distance=o,n.damage=lh,this.lastHitTime=this.HIT_MEMORY_DURATION,this.playAttackSound(r.position)),n}playAttackSound(t){const e=Ae.getInstance();e.initialized&&e.playAttackSound(t.x,t.y,t.z)}getCooldownRemaining(){return Math.max(0,this.attackCooldownTimer)}getCooldownProgress(){return Math.max(0,this.attackCooldownTimer/ch)}}const WS=1.5,VS=.1;class XS{inventory;stats;context;callbacks={};lastPosition=new I;eatingTimer=0;constructor(t,e){this.inventory=t,this.stats=e,this.context={state:"idle",progress:0,targetFood:null,inventorySlot:-1}}setCallbacks(t){this.callbacks=t}getState(){return this.context.state}getProgress(){return this.context.progress}isEating(){return this.context.state==="eating"}canEat(){if(this.stats.hunger>=zn)return!1;const t=this.inventory.getSelectedItem();return t.itemType?tn.isFoodBlock(t.itemType):!1}startEating(t){if(this.context.state!=="idle"||!this.canEat())return!1;const e=this.inventory.getSelectedItem();return e.itemType?(this.context.state="eating",this.context.progress=0,this.context.targetFood=e.itemType,this.context.inventorySlot=this.inventory.selectedSlot,this.eatingTimer=0,this.lastPosition.copy(t),this.playEatingSound(),this.callbacks.onEatingStart&&this.callbacks.onEatingStart(e.itemType),!0):!1}cancelEating(){this.context.state==="eating"&&(this.context.state="idle",this.context.progress=0,this.context.targetFood=null,this.context.inventorySlot=-1,this.eatingTimer=0,this.callbacks.onEatingCancel&&this.callbacks.onEatingCancel())}update(t,e,n){if(this.context.state!=="eating")return;if(!n){this.cancelEating();return}if(e.distanceTo(this.lastPosition)/t>VS){this.cancelEating();return}this.lastPosition.copy(e);const o=this.inventory.getSlot(this.context.inventorySlot);if(!o||o.itemType!==this.context.targetFood||o.count<=0){this.cancelEating();return}this.eatingTimer+=t,this.context.progress=Math.min(1,this.eatingTimer/WS),Math.floor(this.eatingTimer*4)!==Math.floor((this.eatingTimer-t)*4)&&this.playEatingSound(),this.callbacks.onEatingProgress&&this.callbacks.onEatingProgress(this.context.progress),this.context.progress>=1&&this.completeEating()}completeEating(){const t=this.context.targetFood;if(!t){this.cancelEating();return}const e=tn.getHungerRestore(t);this.stats.setHunger(Math.min(zn,this.stats.hunger+e)),this.inventory.removeItem(this.context.inventorySlot,1),this.playEatingCompleteSound(),this.context.state="completed",this.callbacks.onEatingComplete&&this.callbacks.onEatingComplete(t,e),this.context.state="idle",this.context.progress=0,this.context.targetFood=null,this.context.inventorySlot=-1,this.eatingTimer=0}playEatingSound(){const t=Ae.getInstance();t.initialized&&t.playEatingSound()}playEatingCompleteSound(){const t=Ae.getInstance();t.initialized&&t.playEatingCompleteSound()}reset(){this.context.state="idle",this.context.progress=0,this.context.targetFood=null,this.context.inventorySlot=-1,this.eatingTimer=0}}class KS{container;progressBar;progressFill;isVisible=!1;constructor(){this.container=document.createElement("div"),this.container.id="eating-progress-ui",this.container.style.cssText=`
      position: fixed;
      bottom: 120px;
      left: 50%;
      transform: translateX(-50%);
      width: 200px;
      height: 10px;
      background: rgba(0, 0, 0, 0.5);
      border: 2px solid rgba(255, 255, 255, 0.3);
      border-radius: 5px;
      overflow: hidden;
      display: none;
      z-index: 100;
    `,this.progressBar=document.createElement("div"),this.progressBar.style.cssText=`
      width: 100%;
      height: 100%;
      background: rgba(50, 50, 50, 0.8);
      position: relative;
    `,this.progressFill=document.createElement("div"),this.progressFill.style.cssText=`
      width: 0%;
      height: 100%;
      background: linear-gradient(90deg, #8B4513, #D2691E);
      transition: width 0.05s linear;
      position: absolute;
      left: 0;
      top: 0;
    `,this.progressBar.appendChild(this.progressFill),this.container.appendChild(this.progressBar)}getElement(){return this.container}show(){this.isVisible||(this.isVisible=!0,this.container.style.display="block",this.progressFill.style.width="0%")}hide(){this.isVisible&&(this.isVisible=!1,this.container.style.display="none",this.progressFill.style.width="0%")}setProgress(t){const e=Math.max(0,Math.min(1,t));this.progressFill.style.width=`${e*100}%`}get visible(){return this.isVisible}dispose(){this.container.parentNode&&this.container.parentNode.removeChild(this.container)}}const YS=.25,qS=.15,$S=.3,ZS=10,jS=.02,JS=.03;class QS{data={state:"idle",progress:0,bobTime:0,isMoving:!1};update(t,e){if(this.data.isMoving=e,e?this.data.bobTime+=t*ZS:this.data.bobTime*=.9,this.data.state!=="idle"){const n=this.getAnimationDuration();this.data.progress+=t/n,this.data.progress>=1&&(this.data.state==="eating"?this.data.progress=0:(this.data.progress=0,this.data.state="idle"))}}getAnimationDuration(){switch(this.data.state){case"swinging":return YS;case"placing":return qS;case"eating":return $S;default:return 1}}startSwing(){console.log("[HandAnimator] startSwing(), current state:",this.data.state),this.data.state="swinging",this.data.progress=0}startEating(){console.log("[HandAnimator] startEating()"),this.data.state="eating",this.data.progress=0}stopEating(){console.log("[HandAnimator] stopEating()"),this.data.state==="eating"&&(this.data.state="idle",this.data.progress=0)}startPlace(){this.data.state==="idle"&&(this.data.state="placing",this.data.progress=0)}getState(){return this.data.state}isAnimating(){return this.data.state!=="idle"}getSwingRotation(){if(this.data.state!=="swinging")return 0;const t=this.data.progress;if(t<.4)return-Math.PI/2*(t/.4);{const e=(t-.4)/.6;return-Math.PI/2*(1-e)}}getSwingOffset(){if(this.data.state!=="swinging")return{x:0,y:0};const t=this.data.progress;return t<.4?{x:0,y:-.15*(t/.4)}:{x:0,y:-.15*(1-(t-.4)/.6)}}getPlaceOffset(){if(this.data.state!=="placing")return 0;const t=this.data.progress;return Math.sin(t*Math.PI)*.1}getEatingOffset(){if(this.data.state!=="eating")return{x:0,y:0,z:0,rotX:0};const t=this.data.progress,e=Math.sin(t*Math.PI*2);return{x:-.1,y:.15+e*.03,z:-.15+Math.abs(e)*.02,rotX:-.5+e*.1}}getBobOffset(){return!this.data.isMoving&&this.data.bobTime<.01?{x:0,y:0}:{x:Math.sin(this.data.bobTime)*jS,y:Math.abs(Math.sin(this.data.bobTime*2))*JS}}}const tM=new I(.4,-.35,-.5),eM=new Xe(-.1,-.3,.1),Wo=.25,hh=.2;class nM{container;itemMesh=null;currentItemType=null;animator;basePosition;baseRotation;_visible=!0;constructor(){this.container=new an,this.container.name="HandRenderer",this.animator=new QS,this.basePosition=tM.clone(),this.baseRotation=eM.clone()}getContainer(){return this.container}set visible(t){this._visible=t,this.container.visible=t}get visible(){return this._visible}setItem(t){t!==this.currentItemType&&(this.itemMesh&&(this.container.remove(this.itemMesh),this.itemMesh.geometry.dispose(),this.itemMesh.material instanceof Oe&&this.itemMesh.material.dispose(),this.itemMesh=null),this.currentItemType=t,!(t===null||t===m.AIR)&&(tn.isFood(t)?this.itemMesh=this.createFoodMesh(t):this.itemMesh=this.createBlockMesh(t),this.itemMesh&&(this.itemMesh.position.copy(this.basePosition),this.itemMesh.rotation.copy(this.baseRotation),this.container.add(this.itemMesh))))}createBlockMesh(t){const e=new st(Wo,Wo,Wo),i=Hn().getTexture(),r=this.createBlockMaterials(t,i),o=new V(e,r);return o.castShadow=!1,o.receiveShadow=!1,o.rotation.set(.2,.8,.1),o}createBlockMaterials(t,e){const n=Hn();return["side","side","top","bottom","side","side"].map(r=>{const o=Cn(t,r),a=n.getUVsForIndex(o),l=e.clone();return l.needsUpdate=!0,l.repeat.set(a[2]-a[0],a[3]-a[1]),l.offset.set(a[0],a[1]),new It({map:l,transparent:ti(t),side:gn})})}createFoodMesh(t){const e=new Ci(hh,hh),n=Hn(),i=n.getTexture(),r=Cn(t,"side"),o=n.getUVsForIndex(r),a=i.clone();a.needsUpdate=!0,a.repeat.set(o[2]-o[0],o[3]-o[1]),a.offset.set(o[0],o[1]);const l=new It({map:a,transparent:!0,side:Ve}),c=new V(e,l);return c.castShadow=!1,c.receiveShadow=!1,c.rotation.set(0,.3,.1),c}attack(){console.log("[HandRenderer] attack() called"),this.animator.startSwing()}place(){console.log("[HandRenderer] place() called"),this.animator.startPlace()}startEating(){console.log("[HandRenderer] startEating() called"),this.animator.startEating()}stopEating(){console.log("[HandRenderer] stopEating() called"),this.animator.stopEating()}update(t,e){if(this.animator.update(t,e),!this.itemMesh)return;this.itemMesh.position.copy(this.basePosition),this.itemMesh.rotation.copy(this.baseRotation);const n=this.animator.getBobOffset();this.itemMesh.position.x+=n.x,this.itemMesh.position.y+=n.y;const i=this.animator.getSwingRotation(),r=this.animator.getSwingOffset();i!==0&&(this.itemMesh.rotation.x+=i,this.itemMesh.position.y+=r.y);const o=this.animator.getPlaceOffset();this.itemMesh.position.z-=o;const a=this.animator.getEatingOffset();(a.x!==0||a.y!==0)&&(this.itemMesh.position.x+=a.x,this.itemMesh.position.y+=a.y,this.itemMesh.position.z+=a.z,this.itemMesh.rotation.x+=a.rotX)}dispose(){this.itemMesh&&(this.container.remove(this.itemMesh),this.itemMesh.geometry.dispose(),Array.isArray(this.itemMesh.material)?this.itemMesh.material.forEach(t=>t.dispose()):this.itemMesh.material instanceof Oe&&this.itemMesh.material.dispose(),this.itemMesh=null)}}const iM={[m.TALL_GRASS]:.1,[m.FLOWER_RED]:.1,[m.FLOWER_YELLOW]:.1,[m.ROSE]:.1,[m.TULIP]:.1,[m.DAISY]:.1,[m.CORNFLOWER]:.1,[m.DEAD_BUSH]:.1,[m.MUSHROOM_RED]:.1,[m.MUSHROOM_BROWN]:.1,[m.TORCH]:.1,[m.LEAVES]:.5,[m.OAK_LEAVES]:.5,[m.BIRCH_LEAVES]:.5,[m.SPRUCE_LEAVES]:.5,[m.SNOW]:.5,[m.DIRT]:1,[m.GRASS]:1,[m.SAND]:1,[m.CACTUS]:1,[m.CAMPFIRE]:1,[m.PLANKS]:1.5,[m.WOOD]:1.5,[m.LOG]:1.5,[m.OAK_LOG]:1.5,[m.BIRCH_LOG]:1.5,[m.SPRUCE_LOG]:1.5,[m.COBBLESTONE]:2.5,[m.STONE]:2.5,[m.BRICK]:2.5,[m.SANDSTONE]:2.5,[m.SANDSTONE_CARVED]:2.5,[m.RED_BRICK]:2.5,[m.DARK_STONE]:2.5,[m.MOSSY_STONE]:2.5,[m.GOLD_BLOCK]:3.5,[m.GLASS]:.8},sM=1.5;function rM(s){return iM[s]??sM}const uh=10;function oM(s){return Math.min(Math.floor(s*uh),uh-1)}class aM{world;player;raycaster;diggingState=null;callbacks={};particleTimer=0;PARTICLE_INTERVAL=.1;soundTimer=0;SOUND_INTERVAL=.25;constructor(t,e){this.world=t,this.player=e,this.raycaster=new Zr(t)}setCallbacks(t){this.callbacks=t}getProgress(){return this.diggingState?.progress??0}getCrackStage(){return this.diggingState?.crackStage??0}isDigging(){return this.diggingState!==null}getTargetBlock(){return this.diggingState?{x:this.diggingState.blockX,y:this.diggingState.blockY,z:this.diggingState.blockZ}:null}update(t,e){if(!e)return this.diggingState&&this.stopDigging(),!1;const n=this.getTargetBlockHit();if(!n||n.distance>ri)return this.diggingState&&this.stopDigging(),!1;const i=this.world.getBlock(n.blockX,n.blockY,n.blockZ);if(i===m.AIR||!ln(i))return this.diggingState&&this.stopDigging(),!1;this.diggingState&&(this.diggingState.blockX!==n.blockX||this.diggingState.blockY!==n.blockY||this.diggingState.blockZ!==n.blockZ)&&this.stopDigging(),this.diggingState||this.startDigging(n.blockX,n.blockY,n.blockZ,i),this.diggingState.progress+=t/this.diggingState.totalTime;const r=oM(this.diggingState.progress);return r!==this.diggingState.crackStage&&(this.diggingState.crackStage=r,this.callbacks.onProgressChange?.(this.diggingState.progress,r)),this.soundTimer+=t,this.soundTimer>=this.SOUND_INTERVAL&&(this.soundTimer=0,Ae.getInstance().playBlockSound(i,"dig",n.blockX+.5,n.blockY+.5,n.blockZ+.5)),this.particleTimer+=t,this.particleTimer>=this.PARTICLE_INTERVAL&&(this.particleTimer=0),this.diggingState.progress>=1?this.breakBlock():!1}startDigging(t,e,n,i){let r=rM(i);const o=this.player.inventory.getSelectedItem();if(o.itemType){const l=Tn.getInstance().getSpeedMultiplier(o.itemType,i);l>1&&(r=r/l)}this.diggingState={blockX:t,blockY:e,blockZ:n,blockType:i,progress:0,totalTime:r,crackStage:0},this.particleTimer=0,this.soundTimer=0,this.callbacks.onDiggingStart?.(t,e,n),this.callbacks.onProgressChange?.(0,0)}stopDigging(){this.diggingState=null,this.particleTimer=0,this.soundTimer=0,this.callbacks.onDiggingStop?.()}breakBlock(){if(!this.diggingState)return!1;const{blockX:t,blockY:e,blockZ:n,blockType:i}=this.diggingState,r=this.world.setBlock(t,e,n,m.AIR);if(r){if(Ae.getInstance().playBlockSound(i,"break",t+.5,e+.5,n+.5),this.consumeToolDurability(),i!==m.AIR&&this.callbacks.onItemDrop){const o=new Hs(t+.5,e+.5,n+.5,i,1);this.callbacks.onItemDrop(o)}this.callbacks.onBlockBreak?.(t,e,n,i)}return this.stopDigging(),r}consumeToolDurability(){const t=this.player.inventory.selectedSlot,e=this.player.inventory.getSelectedItem();if(!e.itemType)return;const n=Tn.getInstance();if(!n.isTool(e.itemType))return;const i=this.player.inventory.getSlot(t);if(!i||i.durability===void 0)return;const r=n.useTool(e.itemType,i.durability);r.broken?(this.player.inventory.setSlot(t,{itemType:null,count:0}),console.log("[DiggingManager] Tool broke!"),Ae.getInstance().playSfx("tool_break",{volume:.7})):this.player.inventory.setSlot(t,{...i,durability:r.newDurability})}getTargetBlockHit(){const t=this.player.getEyePosition(),e=this.player.getLookDirection();return this.raycaster.cast(t,e)}forceStop(){this.diggingState&&this.stopDigging()}}class lM{container;progressBar;progressFill;_visible=!1;constructor(){this.container=document.createElement("div"),this.container.style.cssText=`
      position: fixed;
      top: 55%;
      left: 50%;
      transform: translateX(-50%);
      width: 200px;
      height: 8px;
      background: rgba(0, 0, 0, 0.5);
      border: 2px solid rgba(255, 255, 255, 0.3);
      border-radius: 4px;
      overflow: hidden;
      display: none;
      z-index: 100;
    `,this.progressBar=document.createElement("div"),this.progressBar.style.cssText=`
      width: 100%;
      height: 100%;
      position: relative;
    `,this.progressFill=document.createElement("div"),this.progressFill.style.cssText=`
      width: 0%;
      height: 100%;
      background: linear-gradient(to right, #4a9eff, #00d4ff);
      transition: width 0.05s linear;
      box-shadow: 0 0 10px rgba(74, 158, 255, 0.5);
    `,this.progressBar.appendChild(this.progressFill),this.container.appendChild(this.progressBar),document.body.appendChild(this.container)}set visible(t){this._visible=t,this.container.style.display=t?"block":"none"}get visible(){return this._visible}setProgress(t){const e=Math.max(0,Math.min(1,t));this.progressFill.style.width=`${e*100}%`,e<.5?this.progressFill.style.background="linear-gradient(to right, #4a9eff, #00d4ff)":e<.8?this.progressFill.style.background="linear-gradient(to right, #00d4ff, #00ff88)":this.progressFill.style.background="linear-gradient(to right, #00ff88, #ffff00)"}show(){this.visible=!0}hide(){this.visible=!1,this.setProgress(0)}getElement(){return this.container}dispose(){this.container.parentNode&&this.container.parentNode.removeChild(this.container)}}const Vo=1.002;class cM{scene;mesh=null;material;geometry;crackStage=0;_visible=!1;constructor(t){this.scene=t,this.geometry=new st(Vo,Vo,Vo),this.material=new Gs({color:0,transparent:!0,opacity:0,depthWrite:!1,side:gn,polygonOffset:!0,polygonOffsetFactor:-1,polygonOffsetUnits:-1}),this.mesh=new V(this.geometry,this.material),this.mesh.visible=!1,this.mesh.renderOrder=1,this.scene.add(this.mesh)}set visible(t){this._visible=t,this.mesh&&(this.mesh.visible=t)}get visible(){return this._visible}setPosition(t,e,n){this.mesh&&this.mesh.position.set(t+.5,e+.5,n+.5)}setCrackStage(t){this.crackStage=Math.max(0,Math.min(9,t));const e=.1+this.crackStage/9*.6;this.material.opacity=e;const n=1-this.crackStage/9*.5;this.material.color.setRGB(n*.3,n*.3,n*.3)}hide(){this.visible=!1,this.crackStage=0,this.material.opacity=0}show(t,e,n,i){this.setPosition(t,e,n),this.setCrackStage(i),this.visible=!0}dispose(){this.mesh&&(this.scene.remove(this.mesh),this.mesh.geometry.dispose(),this.material.dispose(),this.mesh=null)}}const hM=4,uM=10;class dM{x;y;z;id;slots=[];particleGroup;particles=[];light;baseMesh;container;particleTimer=0;flickerTimer=0;constructor(t,e,n){this.x=t,this.y=e,this.z=n,this.id=`campfire_${t}_${e}_${n}`;for(let i=0;i<hM;i++)this.slots.push({rawItem:m.AIR,progress:0,active:!1});this.container=new an,this.container.position.set(t+.5,e,n+.5),this.baseMesh=this.createBase(),this.container.add(this.baseMesh),this.particleGroup=new an,this.createFireParticles(),this.container.add(this.particleGroup),this.light=new Z0(16737792,1.5,8),this.light.position.set(0,.5,0),this.container.add(this.light)}createBase(){const t=new an,e=new It({color:4863784}),n=new st(.15,.1,.8),i=new V(n,e);i.position.set(0,.05,0),t.add(i);const r=new V(n,e);r.position.set(0,.05,0),r.rotation.y=Math.PI/2,t.add(r);const o=new V(n,e);o.position.set(0,.15,0),o.rotation.y=Math.PI/4,t.add(o);const a=new V(n,e);return a.position.set(0,.15,0),a.rotation.y=-Math.PI/4,t.add(a),t}createFireParticles(){for(let e=0;e<12;e++){const n=.1+Math.random()*.15,i=new Ci(n,n*1.5),r=.05+Math.random()*.1,o=new Dt().setHSL(r,1,.5+Math.random()*.3),a=new Gs({color:o,transparent:!0,opacity:.8,side:Ve,depthWrite:!1}),l=new V(i,a);l.position.set((Math.random()-.5)*.3,.2+Math.random()*.4,(Math.random()-.5)*.3),l.userData.baseY=l.position.y,l.userData.speed=.5+Math.random()*.5,l.userData.phase=Math.random()*Math.PI*2,this.particles.push(l),this.particleGroup.add(l)}}getMesh(){return this.container}addFood(t){if(!tn.isRawFood(t))return console.log(`[Campfire] Not raw food: ${t}`),!1;for(const e of this.slots)if(!e.active)return e.rawItem=t,e.progress=0,e.active=!0,console.log(`[Campfire] Added raw food: ${t}, cooked version will be: ${tn.getCookedVersion(t)}`),!0;return!1}canAddFood(){return this.slots.some(t=>!t.active)}getActiveSlotsCount(){return this.slots.filter(t=>t.active).length}update(t){const e=[];for(const n of this.slots)if(n.active&&(n.progress+=t/uM,n.progress>=1)){const i=tn.getCookedVersion(n.rawItem);console.log(`[Campfire] Cooking complete! Raw: ${n.rawItem}, Cooked: ${i}`),i?e.push(i):(console.log("[Campfire] WARNING: No cooked version found, returning raw item"),e.push(n.rawItem)),n.rawItem=m.AIR,n.progress=0,n.active=!1}this.particleTimer+=t;for(const n of this.particles){const i=n.userData.speed,r=n.userData.phase,o=n.userData.baseY;n.position.y=o+Math.sin(this.particleTimer*i*3+r)*.1,n.position.x+=Math.sin(this.particleTimer*2+r)*.001,n.rotation.y=this.particleTimer*.5;const a=n.material;a.opacity=.6+Math.sin(this.particleTimer*i*2+r)*.3}return this.flickerTimer+=t,this.light.intensity=1.2+Math.sin(this.flickerTimer*10)*.3+Math.random()*.2,e}createDroppedItems(t){const e=[];for(let n=0;n<t.length;n++){const i=t[n];if(i===void 0)continue;const r=n/t.length*Math.PI*2,o=this.x+.5+Math.cos(r)*.8,a=this.z+.5+Math.sin(r)*.8,l=new Hs(o,this.y+.5,a,i,1);e.push(l)}return e}dispose(){this.baseMesh.traverse(t=>{t instanceof V&&(t.geometry.dispose(),t.material instanceof Oe&&t.material.dispose())});for(const t of this.particles)t.geometry.dispose(),t.material instanceof Oe&&t.material.dispose();this.light.dispose()}}class fM{scene;world;campfires=new Map;onItemDrop=null;constructor(t,e){this.scene=t,this.world=e}setOnItemDrop(t){this.onItemDrop=t}getKey(t,e,n){return`${t},${e},${n}`}createCampfire(t,e,n){const i=this.getKey(t,e,n);if(this.campfires.has(i))return this.campfires.get(i);const r=new dM(t,e,n);return this.campfires.set(i,r),this.scene.add(r.getMesh()),console.log(`[Campfire] Created at ${t}, ${e}, ${n}`),r}removeCampfire(t,e,n){const i=this.getKey(t,e,n),r=this.campfires.get(i);r&&(this.scene.remove(r.getMesh()),r.dispose(),this.campfires.delete(i),console.log(`[Campfire] Removed at ${t}, ${e}, ${n}`))}getCampfire(t,e,n){const i=this.getKey(t,e,n);return this.campfires.get(i)??null}hasCampfire(t,e,n){return this.campfires.has(this.getKey(t,e,n))}addFoodToCampfire(t,e,n,i){const r=this.getCampfire(t,e,n);return r?r.addFood(i):!1}update(t){for(const e of this.campfires.values()){const n=e.update(t);if(n.length>0&&this.onItemDrop){const i=e.createDroppedItems(n);for(const r of i)this.onItemDrop(r);console.log(`[Campfire] Cooked ${n.length} items`)}}}syncWithWorld(t,e,n){for(let i=t*n;i<(t+1)*n;i++)for(let r=e*n;r<(e+1)*n;r++)for(let o=0;o<256;o++){const a=this.world.getBlock(i,o,r),l=this.getKey(i,o,r);a===m.CAMPFIRE&&!this.campfires.has(l)?this.createCampfire(i,o,r):a!==m.CAMPFIRE&&this.campfires.has(l)&&this.removeCampfire(i,o,r)}}onBlockPlaced(t,e,n,i){i===m.CAMPFIRE&&this.createCampfire(t,e,n)}onBlockRemoved(t,e,n){this.hasCampfire(t,e,n)&&this.removeCampfire(t,e,n)}getAll(){return Array.from(this.campfires.values())}dispose(){for(const t of this.campfires.values())this.scene.remove(t.getMesh()),t.dispose();this.campfires.clear()}}function Sn(s,t,e,n,i=1){const r=Math.max(...t.map(l=>l.length)),o=t.length,a=r>2||o>2?3:2;return{id:s,type:"shaped",pattern:t,ingredients:e,result:{item:n,count:i},gridSize:a}}const pM="modulepreload",mM=function(s){return"/minecraft/"+s},dh={},Tu=function(t,e,n){let i=Promise.resolve();if(e&&e.length>0){let o=function(c){return Promise.all(c.map(h=>Promise.resolve(h).then(u=>({status:"fulfilled",value:u}),u=>({status:"rejected",reason:u}))))};document.getElementsByTagName("link");const a=document.querySelector("meta[property=csp-nonce]"),l=a?.nonce||a?.getAttribute("nonce");i=o(e.map(c=>{if(c=mM(c),c in dh)return;dh[c]=!0;const h=c.endsWith(".css"),u=h?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${c}"]${u}`))return;const d=document.createElement("link");if(d.rel=h?"stylesheet":pM,h||(d.as="script"),d.crossOrigin="",d.href=c,l&&d.setAttribute("nonce",l),document.head.appendChild(d),h)return new Promise((f,y)=>{d.addEventListener("load",f),d.addEventListener("error",()=>y(new Error(`Unable to preload CSS for ${c}`)))})}))}function r(o){const a=new Event("vite:preloadError",{cancelable:!0});if(a.payload=o,window.dispatchEvent(a),!a.defaultPrevented)throw o}return i.then(o=>{for(const a of o||[])a.status==="rejected"&&r(a.reason);return t().catch(r)})},fh=[{id:"planks_from_log",type:"shapeless",ingredients:{L:m.LOG},result:{item:m.PLANKS,count:4},gridSize:2},{id:"planks_from_oak_log",type:"shapeless",ingredients:{L:m.OAK_LOG},result:{item:m.PLANKS,count:4},gridSize:2},{id:"planks_from_birch_log",type:"shapeless",ingredients:{L:m.BIRCH_LOG},result:{item:m.PLANKS,count:4},gridSize:2},{id:"planks_from_spruce_log",type:"shapeless",ingredients:{L:m.SPRUCE_LOG},result:{item:m.PLANKS,count:4},gridSize:2},Sn("sticks",["P","P"],{P:m.PLANKS},m.STICK,4),Sn("crafting_table",["PP","PP"],{P:m.PLANKS},m.CRAFTING_TABLE,1),Sn("furnace",["CCC","C C","CCC"],{C:m.COBBLESTONE},m.FURNACE,1)];function gM(){Tu(async()=>{const{RecipeRegistry:s}=await Promise.resolve().then(()=>vu);return{RecipeRegistry:s}},void 0).then(({RecipeRegistry:s})=>{s.getInstance().registerAll(fh),console.log(`[BasicRecipes] Registered ${fh.length} basic recipes`)})}const yM={wood:m.PLANKS,stone:m.COBBLESTONE,iron:m.IRON_INGOT,diamond:m.DIAMOND},pi={pickaxe:{wood:m.WOODEN_PICKAXE,stone:m.STONE_PICKAXE,iron:m.IRON_PICKAXE,diamond:m.DIAMOND_PICKAXE},axe:{wood:m.WOODEN_AXE,stone:m.STONE_AXE,iron:m.IRON_AXE,diamond:m.DIAMOND_AXE},shovel:{wood:m.WOODEN_SHOVEL,stone:m.STONE_SHOVEL,iron:m.IRON_SHOVEL,diamond:m.DIAMOND_SHOVEL},sword:{wood:m.WOODEN_SWORD,stone:m.STONE_SWORD,iron:m.IRON_SWORD,diamond:m.DIAMOND_SWORD},hoe:{wood:m.WOODEN_HOE,stone:m.STONE_HOE,iron:m.IRON_HOE,diamond:m.DIAMOND_HOE}},mi={pickaxe:["MMM"," S "," S "],axe_left:["MM","MS"," S"],axe_right:["MM","SM"," S"],shovel:["M","S","S"],sword:["M","M","S"],hoe_left:["MM"," S"," S"],hoe_right:["MM","S ","S "]};function _M(){const s=[],t=["wood","stone","iron","diamond"];for(const e of t){const n=yM[e],i=m.STICK;s.push(Sn(`${e}_pickaxe`,mi.pickaxe,{M:n,S:i},pi.pickaxe[e],1)),s.push(Sn(`${e}_axe`,mi.axe_left,{M:n,S:i},pi.axe[e],1)),s.push(Sn(`${e}_axe_right`,mi.axe_right,{M:n,S:i},pi.axe[e],1)),s.push(Sn(`${e}_shovel`,mi.shovel,{M:n,S:i},pi.shovel[e],1)),s.push(Sn(`${e}_sword`,mi.sword,{M:n,S:i},pi.sword[e],1)),s.push(Sn(`${e}_hoe`,mi.hoe_left,{M:n,S:i},pi.hoe[e],1)),s.push(Sn(`${e}_hoe_right`,mi.hoe_right,{M:n,S:i},pi.hoe[e],1))}return s}const ph=_M();function vM(){Tu(async()=>{const{RecipeRegistry:s}=await Promise.resolve().then(()=>vu);return{RecipeRegistry:s}},void 0).then(({RecipeRegistry:s})=>{s.getInstance().registerAll(ph),console.log(`[ToolRecipes] Registered ${ph.length} tool recipes`)})}function SM(){console.log("[CraftingSystem] Initializing..."),gM(),vM();const s=xn.getInstance();console.log(`[CraftingSystem] Initialized with ${s.getRecipeCount()} recipes`)}function MM(){console.log("[ToolSystem] Initializing..."),Tn.getInstance().initialize()}const xM=[{id:"iron_ingot",input:m.IRON_ORE,output:m.IRON_INGOT,outputCount:1,smeltTime:10},{id:"cooked_beef",input:m.RAW_BEEF,output:m.COOKED_BEEF,outputCount:1,smeltTime:10},{id:"cooked_porkchop",input:m.RAW_PORKCHOP,output:m.COOKED_PORKCHOP,outputCount:1,smeltTime:10},{id:"cooked_mutton",input:m.RAW_MUTTON,output:m.COOKED_MUTTON,outputCount:1,smeltTime:10},{id:"cooked_chicken",input:m.RAW_CHICKEN,output:m.COOKED_CHICKEN,outputCount:1,smeltTime:10},{id:"cooked_rabbit",input:m.RAW_RABBIT,output:m.COOKED_RABBIT,outputCount:1,smeltTime:10},{id:"charcoal_log",input:m.LOG,output:m.CHARCOAL,outputCount:1,smeltTime:10},{id:"charcoal_oak",input:m.OAK_LOG,output:m.CHARCOAL,outputCount:1,smeltTime:10},{id:"charcoal_birch",input:m.BIRCH_LOG,output:m.CHARCOAL,outputCount:1,smeltTime:10},{id:"charcoal_spruce",input:m.SPRUCE_LOG,output:m.CHARCOAL,outputCount:1,smeltTime:10}];function Xo(s){return xM.find(t=>t.input===s)||null}const mh=[{item:m.COAL,burnTime:80},{item:m.CHARCOAL,burnTime:80},{item:m.PLANKS,burnTime:15},{item:m.LOG,burnTime:15},{item:m.OAK_LOG,burnTime:15},{item:m.BIRCH_LOG,burnTime:15},{item:m.SPRUCE_LOG,burnTime:15},{item:m.WOOD,burnTime:15},{item:m.STICK,burnTime:5}];class Zi{static instance=null;fuelMap=new Map;constructor(){for(const t of mh)this.fuelMap.set(t.item,t.burnTime)}static getInstance(){return Zi.instance||(Zi.instance=new Zi),Zi.instance}isFuel(t){return this.fuelMap.has(t)}getBurnTime(t){return this.fuelMap.get(t)||0}getAllFuels(){return[...mh]}}function gh(s){return Zi.getInstance().getBurnTime(s)}function EM(s,t,e){return{position:{x:s,y:t,z:e},fuelSlot:Nt(),inputSlot:Nt(),outputSlot:Nt(),burnTimeRemaining:0,burnTimeTotal:0,smeltProgress:0,currentRecipe:null}}class yh{state;constructor(t,e,n){this.state=EM(t,e,n)}getPositionKey(){return`${this.state.position.x},${this.state.position.y},${this.state.position.z}`}isBurning(){return this.state.burnTimeRemaining>0}canStartBurning(){if(mt(this.state.fuelSlot)||mt(this.state.inputSlot))return!1;const t=Xo(this.state.inputSlot.itemType);return!(!t||!mt(this.state.outputSlot)&&(this.state.outputSlot.itemType!==t.output||this.state.outputSlot.count>=64))}consumeFuel(){if(mt(this.state.fuelSlot))return!1;const t=gh(this.state.fuelSlot.itemType);return t<=0?!1:(this.state.fuelSlot.count--,this.state.fuelSlot.count<=0&&(this.state.fuelSlot=Nt()),this.state.burnTimeRemaining=t,this.state.burnTimeTotal=t,!0)}update(t){this.state.burnTimeRemaining>0&&(this.state.burnTimeRemaining-=t),!this.isBurning()&&this.canStartBurning()&&this.consumeFuel(),this.isBurning()&&!mt(this.state.inputSlot)?(this.state.currentRecipe||(this.state.currentRecipe=Xo(this.state.inputSlot.itemType)),this.state.currentRecipe&&(mt(this.state.outputSlot)||this.state.outputSlot.itemType===this.state.currentRecipe.output&&this.state.outputSlot.count<64)&&(this.state.smeltProgress+=t/this.state.currentRecipe.smeltTime,this.state.smeltProgress>=1&&this.completeSmelting())):this.state.smeltProgress>0&&!this.isBurning()&&(this.state.smeltProgress=0,this.state.currentRecipe=null)}completeSmelting(){this.state.currentRecipe&&(this.state.inputSlot.count--,this.state.inputSlot.count<=0&&(this.state.inputSlot=Nt()),mt(this.state.outputSlot)?this.state.outputSlot={itemType:this.state.currentRecipe.output,count:this.state.currentRecipe.outputCount}:this.state.outputSlot.count+=this.state.currentRecipe.outputCount,this.state.smeltProgress=0,(mt(this.state.inputSlot)||this.state.inputSlot.itemType!==this.state.currentRecipe.input)&&(this.state.currentRecipe=null))}addFuel(t,e){if(gh(t)<=0)return!1;if(mt(this.state.fuelSlot))return this.state.fuelSlot={itemType:t,count:e},!0;if(this.state.fuelSlot.itemType===t){const i=64-this.state.fuelSlot.count;if(i>0){const r=Math.min(e,i);return this.state.fuelSlot.count+=r,!0}}return!1}addInput(t,e){if(!Xo(t))return!1;if(mt(this.state.inputSlot))return this.state.inputSlot={itemType:t,count:e},!0;if(this.state.inputSlot.itemType===t){const n=64-this.state.inputSlot.count;if(n>0){const i=Math.min(e,n);return this.state.inputSlot.count+=i,!0}}return!1}takeOutput(){if(mt(this.state.outputSlot))return null;const t={itemType:this.state.outputSlot.itemType,count:this.state.outputSlot.count};return this.state.outputSlot=Nt(),t}getAllItems(){const t=[];return mt(this.state.fuelSlot)||t.push({itemType:this.state.fuelSlot.itemType,count:this.state.fuelSlot.count}),mt(this.state.inputSlot)||t.push({itemType:this.state.inputSlot.itemType,count:this.state.inputSlot.count}),mt(this.state.outputSlot)||t.push({itemType:this.state.outputSlot.itemType,count:this.state.outputSlot.count}),t}}class An{static instance=null;furnaces=new Map;world=null;onItemDrop=null;constructor(){}static getInstance(){return An.instance||(An.instance=new An),An.instance}initialize(t){this.world=t,console.log("[FurnaceManager] Initialized")}setOnItemDrop(t){this.onItemDrop=t}getKey(t,e,n){return`${t},${e},${n}`}createFurnace(t,e,n){const i=this.getKey(t,e,n);this.furnaces.has(i)&&this.removeFurnace(t,e,n);const r=new yh(t,e,n);return this.furnaces.set(i,r),console.log(`[FurnaceManager] Created furnace at ${i}`),r.state}removeFurnace(t,e,n){const i=this.getKey(t,e,n),r=this.furnaces.get(i);if(!r)return{items:[]};const o=r.getAllItems();if(this.furnaces.delete(i),this.onItemDrop)for(const a of o){const l=new Hs(t+.5,e+.5,n+.5,a.itemType,a.count);this.onItemDrop(l)}return console.log(`[FurnaceManager] Removed furnace at ${i}, dropped ${o.length} item types`),{items:o}}getFurnace(t,e,n){const i=this.getKey(t,e,n);return this.furnaces.get(i)?.state||null}getFurnaceInstance(t,e,n){const i=this.getKey(t,e,n);return this.furnaces.get(i)||null}update(t){for(const e of this.furnaces.values()){const n=e.isBurning();e.update(t);const i=e.isBurning();if(this.world&&n!==i){const{x:r,y:o,z:a}=e.state.position,l=i?m.FURNACE_LIT:m.FURNACE;this.world.setBlock(r,o,a,l)}}}addFuel(t,e,n,i,r){const o=this.getFurnaceInstance(t,e,n);return o?o.addFuel(i,r):!1}addInput(t,e,n,i,r){const o=this.getFurnaceInstance(t,e,n);return o?o.addInput(i,r):!1}takeOutput(t,e,n){const i=this.getFurnaceInstance(t,e,n);return i?i.takeOutput():null}onBlockPlaced(t,e,n,i){i===m.FURNACE&&this.createFurnace(t,e,n)}onBlockRemoved(t,e,n){const i=this.getKey(t,e,n);this.furnaces.has(i)&&this.removeFurnace(t,e,n)}getAllFurnaces(){return Array.from(this.furnaces.values()).map(t=>t.state)}restoreFromSave(t){this.furnaces.clear();for(const e of t){const n=new yh(e.position.x,e.position.y,e.position.z);n.state=e,this.furnaces.set(n.getPositionKey(),n)}console.log(`[FurnaceManager] Restored ${t.length} furnaces`)}getFurnaceCount(){return this.furnaces.size}}const Rs=9,bM=-1;class TM{container=null;overlay=null;slotElements=[];inventory=null;_isOpen=!1;craftingGrid=[];craftingSlotElements=[];craftingOutputElement=null;currentRecipe=null;draggedSlotIndex=-1;draggedElement=null;dragSource="inventory";cursorItem=Nt();cursorElement=null;tooltipElement=null;onOpenCallback=null;onCloseCallback=null;constructor(){for(let t=0;t<Rs;t++)this.craftingGrid.push(Nt());this.createUI(),this.createTooltip(),this.createCursorItem(),this.setupKeyboardListener()}createUI(){this.overlay=document.createElement("div"),this.overlay.id="crafting-table-overlay",this.overlay.style.cssText=`
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.7);
      display: none;
      justify-content: center;
      align-items: center;
      z-index: 1000;
    `,this.container=document.createElement("div"),this.container.id="crafting-table-container",this.container.style.cssText=`
      background: #8b8b8b;
      border: 4px solid #373737;
      border-radius: 4px;
      padding: 16px;
      box-shadow: 0 8px 32px rgba(0, 0, 0, 0.5);
    `;const t=document.createElement("div");t.textContent="工作台",t.style.cssText=`
      color: #404040;
      font-size: 16px;
      font-weight: bold;
      margin-bottom: 12px;
      text-align: center;
    `,this.container.appendChild(t),this.createCraftingArea();const e=document.createElement("div");e.style.cssText=`
      height: 2px;
      background: #555;
      margin: 16px 0;
    `,this.container.appendChild(e);const n=document.createElement("div");n.style.cssText=`
      display: grid;
      grid-template-columns: repeat(9, 48px);
      gap: 4px;
      margin-bottom: 16px;
    `;for(let o=be;o<Le;o++){const a=this.createSlot(o,"inventory");n.appendChild(a),this.slotElements[o]=a}this.container.appendChild(n);const i=document.createElement("div");i.style.cssText=`
      display: grid;
      grid-template-columns: repeat(9, 48px);
      gap: 4px;
    `;for(let o=0;o<be;o++){const a=this.createSlot(o,"inventory");i.appendChild(a),this.slotElements[o]=a}this.container.appendChild(i);const r=document.createElement("div");r.textContent="按 E 或 ESC 关闭",r.style.cssText=`
      color: #606060;
      font-size: 12px;
      margin-top: 12px;
      text-align: center;
    `,this.container.appendChild(r),this.overlay.appendChild(this.container),document.body.appendChild(this.overlay),this.overlay.addEventListener("click",o=>{o.target===this.overlay&&this.close()}),this.overlay.addEventListener("mousemove",o=>{this.updateCursorPosition(o.clientX,o.clientY)})}createTooltip(){this.tooltipElement=document.createElement("div"),this.tooltipElement.id="crafting-tooltip",this.tooltipElement.style.cssText=`
      position: fixed;
      background: rgba(20, 0, 30, 0.94);
      border: 2px solid #28007a;
      border-radius: 4px;
      padding: 6px 10px;
      color: white;
      font-size: 14px;
      pointer-events: none;
      z-index: 1100;
      display: none;
      white-space: nowrap;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.5);
    `,document.body.appendChild(this.tooltipElement)}createCursorItem(){this.cursorElement=document.createElement("div"),this.cursorElement.id="crafting-cursor-item",this.cursorElement.style.cssText=`
      position: fixed;
      width: 32px;
      height: 32px;
      pointer-events: none;
      z-index: 1200;
      display: none;
      image-rendering: pixelated;
    `;const t=document.createElement("div");t.className="cursor-icon",t.style.cssText=`
      width: 32px;
      height: 32px;
      background-size: cover;
      image-rendering: pixelated;
    `,this.cursorElement.appendChild(t);const e=document.createElement("span");e.className="cursor-count",e.style.cssText=`
      position: absolute;
      bottom: 0;
      right: 2px;
      font-size: 12px;
      color: white;
      text-shadow: 1px 1px 1px black, -1px -1px 1px black;
    `,this.cursorElement.appendChild(e),document.body.appendChild(this.cursorElement)}updateCursorPosition(t,e){this.cursorElement&&(this.cursorElement.style.left=`${t-16}px`,this.cursorElement.style.top=`${e-16}px`)}updateCursorDisplay(){if(!this.cursorElement)return;const t=this.cursorElement.querySelector(".cursor-icon"),e=this.cursorElement.querySelector(".cursor-count");mt(this.cursorItem)?this.cursorElement.style.display="none":(this.cursorElement.style.display="block",t&&this.cursorItem.itemType!==null&&this.setSlotTexture(t,this.cursorItem.itemType),e&&(e.textContent=this.cursorItem.count>1?String(this.cursorItem.count):""))}showTooltip(t,e,n){if(!this.tooltipElement||mt(t)||t.itemType===null){this.hideTooltip();return}let r=tl[t.itemType]||`物品 #${t.itemType}`;t.durability!==void 0&&t.maxDurability!==void 0&&(r+=`
耐久度: ${t.durability}/${t.maxDurability}`),this.tooltipElement.innerHTML=r.replace(`
`,"<br>"),this.tooltipElement.style.display="block",this.tooltipElement.style.left=`${e+12}px`,this.tooltipElement.style.top=`${n+12}px`}hideTooltip(){this.tooltipElement&&(this.tooltipElement.style.display="none")}createCraftingArea(){const t=document.createElement("div");t.style.cssText=`
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 24px;
      padding: 16px;
      background: #6b6b6b;
      border-radius: 4px;
    `;const e=document.createElement("div");e.style.cssText=`
      display: grid;
      grid-template-columns: repeat(3, 48px);
      gap: 4px;
    `;for(let i=0;i<Rs;i++){const r=this.createSlot(i,"crafting");e.appendChild(r),this.craftingSlotElements[i]=r}t.appendChild(e);const n=document.createElement("div");n.textContent="→",n.style.cssText=`
      font-size: 32px;
      color: #404040;
    `,t.appendChild(n),this.craftingOutputElement=this.createSlot(bM,"output"),this.craftingOutputElement.style.cssText+=`
      width: 56px;
      height: 56px;
      background: #a0a0a0;
      border-color: #505050;
      border-top-color: #d0d0d0;
      border-left-color: #d0d0d0;
    `,t.appendChild(this.craftingOutputElement),this.container.appendChild(t)}createSlot(t,e){const n=document.createElement("div");n.className=`${e}-slot`,n.dataset.slotIndex=String(t),n.dataset.source=e,n.style.cssText=`
      width: 48px;
      height: 48px;
      background: #8b8b8b;
      border: 2px solid #373737;
      border-top-color: #ffffff;
      border-left-color: #ffffff;
      position: relative;
      cursor: pointer;
      display: flex;
      justify-content: center;
      align-items: center;
      image-rendering: pixelated;
    `;const i=document.createElement("div");i.className="slot-icon",i.style.cssText=`
      width: 32px;
      height: 32px;
      background-size: cover;
      image-rendering: pixelated;
    `,n.appendChild(i);const r=document.createElement("span");r.className="slot-count",r.style.cssText=`
      position: absolute;
      bottom: 2px;
      right: 4px;
      font-size: 12px;
      color: white;
      text-shadow: 1px 1px 1px black, -1px -1px 1px black;
      pointer-events: none;
    `,n.appendChild(r);const o=document.createElement("div");o.className="durability-bar",o.style.cssText=`
      position: absolute;
      bottom: 4px;
      left: 4px;
      right: 4px;
      height: 3px;
      background: #333;
      display: none;
    `;const a=document.createElement("div");return a.className="durability-fill",a.style.cssText=`
      height: 100%;
      background: #4caf50;
      transition: width 0.1s;
    `,o.appendChild(a),n.appendChild(o),n.draggable=!0,n.addEventListener("dragstart",l=>this.handleDragStart(l,t,e)),n.addEventListener("dragover",l=>this.handleDragOver(l)),n.addEventListener("drop",l=>this.handleDrop(l,t,e)),n.addEventListener("dragend",()=>this.handleDragEnd()),n.addEventListener("click",l=>this.handleSlotClick(l,t,e)),n.addEventListener("contextmenu",l=>{l.preventDefault(),this.handleRightClick(t,e)}),n.addEventListener("mouseenter",l=>{const c=this.getSlotData(t,e);c&&!mt(c)&&this.showTooltip(c,l.clientX,l.clientY)}),n.addEventListener("mousemove",l=>{const c=this.getSlotData(t,e);c&&!mt(c)&&this.showTooltip(c,l.clientX,l.clientY)}),n.addEventListener("mouseleave",()=>{this.hideTooltip()}),n}getSlotData(t,e){return e==="inventory"&&this.inventory?this.inventory.getSlot(t)??null:e==="crafting"?this.craftingGrid[t]??null:e==="output"&&this.currentRecipe?{itemType:this.currentRecipe.result.item,count:this.currentRecipe.result.count}:null}handleSlotClick(t,e,n){if(n==="output"){this.handleOutputClick();return}mt(this.cursorItem)?this.pickupItem(e,n):this.placeCursorItem(e,n)}handleRightClick(t,e){if(e==="output")return;if(!mt(this.cursorItem)){this.placeOneItem(t,e);return}const n=this.getSlotData(t,e);if(!n||mt(n))return;const i=Math.ceil(n.count/2),r=n.count-i;this.cursorItem={itemType:n.itemType,count:i,durability:n.durability,maxDurability:n.maxDurability},r>0?e==="inventory"&&this.inventory?this.inventory.setSlot(t,{itemType:n.itemType,count:r,durability:n.durability,maxDurability:n.maxDurability}):e==="crafting"&&(this.craftingGrid[t]={itemType:n.itemType,count:r,durability:n.durability,maxDurability:n.maxDurability}):e==="inventory"&&this.inventory?this.inventory.setSlot(t,Nt()):e==="crafting"&&(this.craftingGrid[t]=Nt()),this.updateCursorDisplay(),this.updateCraftingOutput(),this.update()}pickupItem(t,e){const n=this.getSlotData(t,e);!n||mt(n)||(this.cursorItem={itemType:n.itemType,count:n.count,durability:n.durability,maxDurability:n.maxDurability},e==="inventory"&&this.inventory?this.inventory.setSlot(t,Nt()):e==="crafting"&&(this.craftingGrid[t]=Nt()),this.updateCursorDisplay(),this.updateCraftingOutput(),this.update())}placeCursorItem(t,e){if(mt(this.cursorItem))return;const n=this.getSlotData(t,e);if(!n||mt(n))e==="inventory"&&this.inventory?this.inventory.setSlot(t,{itemType:this.cursorItem.itemType,count:this.cursorItem.count,durability:this.cursorItem.durability,maxDurability:this.cursorItem.maxDurability}):e==="crafting"&&(this.craftingGrid[t]={itemType:this.cursorItem.itemType,count:this.cursorItem.count,durability:this.cursorItem.durability,maxDurability:this.cursorItem.maxDurability}),this.cursorItem=Nt();else if(n.itemType===this.cursorItem.itemType&&n.durability===void 0){const r=64-n.count,o=Math.min(r,this.cursorItem.count);o>0&&(e==="inventory"&&this.inventory?this.inventory.setSlot(t,{itemType:n.itemType,count:n.count+o}):e==="crafting"&&(this.craftingGrid[t]={itemType:n.itemType,count:n.count+o}),this.cursorItem.count-=o,this.cursorItem.count<=0&&(this.cursorItem=Nt()))}else{const i={itemType:n.itemType,count:n.count,durability:n.durability,maxDurability:n.maxDurability};e==="inventory"&&this.inventory?this.inventory.setSlot(t,{itemType:this.cursorItem.itemType,count:this.cursorItem.count,durability:this.cursorItem.durability,maxDurability:this.cursorItem.maxDurability}):e==="crafting"&&(this.craftingGrid[t]={itemType:this.cursorItem.itemType,count:this.cursorItem.count,durability:this.cursorItem.durability,maxDurability:this.cursorItem.maxDurability}),this.cursorItem=i}this.updateCursorDisplay(),this.updateCraftingOutput(),this.update()}placeOneItem(t,e){if(mt(this.cursorItem))return;const n=this.getSlotData(t,e);!n||mt(n)?(e==="inventory"&&this.inventory?this.inventory.setSlot(t,{itemType:this.cursorItem.itemType,count:1,durability:this.cursorItem.durability,maxDurability:this.cursorItem.maxDurability}):e==="crafting"&&(this.craftingGrid[t]={itemType:this.cursorItem.itemType,count:1,durability:this.cursorItem.durability,maxDurability:this.cursorItem.maxDurability}),this.cursorItem.count--,this.cursorItem.count<=0&&(this.cursorItem=Nt())):n.itemType===this.cursorItem.itemType&&n.count<64&&n.durability===void 0&&(e==="inventory"&&this.inventory?this.inventory.setSlot(t,{itemType:n.itemType,count:n.count+1}):e==="crafting"&&(this.craftingGrid[t]={itemType:n.itemType,count:n.count+1}),this.cursorItem.count--,this.cursorItem.count<=0&&(this.cursorItem=Nt())),this.updateCursorDisplay(),this.updateCraftingOutput(),this.update()}setupKeyboardListener(){document.addEventListener("keydown",t=>{this._isOpen&&(t.code==="KeyE"||t.code==="Escape")&&(t.preventDefault(),this.close())})}handleDragStart(t,e,n){if(n==="output"){t.preventDefault();return}let i=null;if(n==="inventory"&&this.inventory?i=this.inventory.getSlot(e)??null:n==="crafting"&&(i=this.craftingGrid[e]??null),!i||mt(i)){t.preventDefault();return}this.draggedSlotIndex=e,this.dragSource=n,this.draggedElement=t.target,t.dataTransfer&&(t.dataTransfer.effectAllowed="move",t.dataTransfer.setData("text/plain",`${n}:${e}`)),setTimeout(()=>{this.draggedElement&&(this.draggedElement.style.opacity="0.5")},0)}handleDragOver(t){t.preventDefault(),t.dataTransfer&&(t.dataTransfer.dropEffect="move")}handleDrop(t,e,n){if(t.preventDefault(),n==="output"||this.draggedSlotIndex<0||this.dragSource===n&&this.draggedSlotIndex===e)return;let i=null,r=null;if(this.dragSource==="inventory"&&this.inventory?i=this.inventory.getSlot(this.draggedSlotIndex)??null:this.dragSource==="crafting"&&(i=this.craftingGrid[this.draggedSlotIndex]??null),n==="inventory"&&this.inventory?r=this.inventory.getSlot(e)??null:n==="crafting"&&(r=this.craftingGrid[e]??null),!!i){if(this.dragSource==="inventory"&&n==="inventory"&&this.inventory)this.inventory.swapSlots(this.draggedSlotIndex,e);else if(this.dragSource==="crafting"&&n==="crafting"){const o=this.craftingGrid[this.draggedSlotIndex],a=this.craftingGrid[e];if(o&&a){const l={itemType:a.itemType,count:a.count,durability:a.durability,maxDurability:a.maxDurability};this.craftingGrid[e]={itemType:o.itemType,count:o.count,durability:o.durability,maxDurability:o.maxDurability},this.craftingGrid[this.draggedSlotIndex]=l}}else if(this.dragSource==="inventory"&&n==="crafting"&&this.inventory){if(r&&mt(r))this.craftingGrid[e]={itemType:i.itemType,count:i.count,durability:i.durability,maxDurability:i.maxDurability},this.inventory.setSlot(this.draggedSlotIndex,Nt());else if(r){const o={itemType:r.itemType,count:r.count,durability:r.durability,maxDurability:r.maxDurability};this.craftingGrid[e]={itemType:i.itemType,count:i.count,durability:i.durability,maxDurability:i.maxDurability},this.inventory.setSlot(this.draggedSlotIndex,o)}}else if(this.dragSource==="crafting"&&n==="inventory"&&this.inventory)if(r&&mt(r))this.inventory.setSlot(e,{itemType:i.itemType,count:i.count,durability:i.durability,maxDurability:i.maxDurability}),this.craftingGrid[this.draggedSlotIndex]=Nt();else{const o=this.inventory.getSlot(e);if(o){const a={itemType:o.itemType,count:o.count,durability:o.durability,maxDurability:o.maxDurability};this.inventory.setSlot(e,{itemType:i.itemType,count:i.count,durability:i.durability,maxDurability:i.maxDurability}),this.craftingGrid[this.draggedSlotIndex]=a}}this.updateCraftingOutput(),this.update()}}handleDragEnd(){this.draggedElement&&(this.draggedElement.style.opacity="1"),this.draggedSlotIndex=-1,this.draggedElement=null}handleOutputClick(){if(!this.currentRecipe||!this.inventory)return;const t=this.currentRecipe.result;if(!this.inventory.canAddItem(t.item,t.count)){console.log("[CraftingTableUI] Inventory full");return}const n=Tn.getInstance();if(n.isTool(t.item)){const i=n.getMaxDurability(t.item);this.inventory.addItemWithDurability(t.item,t.count,i,i)}else this.inventory.addItem(t.item,t.count);this.consumeCraftingIngredients(),this.updateCraftingOutput(),this.update()}consumeCraftingIngredients(){if(this.currentRecipe)if(this.currentRecipe.type==="shaped"&&this.currentRecipe.pattern){const t=this.currentRecipe.pattern,e=this.currentRecipe.ingredients;let n=-1,i=-1;t:for(let r=0;r<3;r++)for(let o=0;o<3;o++){const a=r*3+o,l=this.craftingGrid[a];if(l&&!mt(l)){n=r,i=o;break t}}if(n>=0&&i>=0)for(let r=0;r<t.length;r++){const o=t[r];if(o)for(let a=0;a<o.length;a++){const l=o[a];if(l&&l!==" "&&e[l]){const c=n+r,h=i+a;if(c<3&&h<3){const u=c*3+h,d=this.craftingGrid[u];d&&!mt(d)&&(d.count--,d.count<=0&&(this.craftingGrid[u]=Nt()))}}}}}else for(let t=0;t<Rs;t++){const e=this.craftingGrid[t];e&&!mt(e)&&(e.count--,e.count<=0&&(this.craftingGrid[t]=Nt()))}}updateCraftingOutput(){const t=xn.getInstance(),e=[[this.craftingGrid[0]?.itemType??null,this.craftingGrid[1]?.itemType??null,this.craftingGrid[2]?.itemType??null],[this.craftingGrid[3]?.itemType??null,this.craftingGrid[4]?.itemType??null,this.craftingGrid[5]?.itemType??null],[this.craftingGrid[6]?.itemType??null,this.craftingGrid[7]?.itemType??null,this.craftingGrid[8]?.itemType??null]];if(this.currentRecipe=t.findMatch(e),this.craftingOutputElement)if(this.currentRecipe){const n={itemType:this.currentRecipe.result.item,count:this.currentRecipe.result.count};this.updateSlotDisplay(this.craftingOutputElement,n)}else this.updateSlotDisplay(this.craftingOutputElement,Nt())}open(t){this.inventory=t,this._isOpen=!0,this.overlay&&(this.overlay.style.display="flex"),this.updateCraftingOutput(),this.update(),this.onOpenCallback&&this.onOpenCallback()}close(){this.returnCursorItem(),this.returnCraftingItems(),this._isOpen=!1,this.overlay&&(this.overlay.style.display="none"),this.hideTooltip(),this.cursorElement&&(this.cursorElement.style.display="none"),this.onCloseCallback&&this.onCloseCallback()}returnCursorItem(){if(!(!this.inventory||mt(this.cursorItem))){if(this.cursorItem.itemType!==null){const t=this.inventory.addItem(this.cursorItem.itemType,this.cursorItem.count);t<this.cursorItem.count&&console.log(`[CraftingTableUI] Could not return ${this.cursorItem.count-t} cursor items`)}this.cursorItem=Nt(),this.updateCursorDisplay()}}returnCraftingItems(){if(this.inventory)for(let t=0;t<Rs;t++){const e=this.craftingGrid[t];if(e&&!mt(e)&&e.itemType!==null){const n=this.inventory.addItem(e.itemType,e.count);n<e.count&&console.log(`[CraftingTableUI] Could not return ${e.count-n} items`),this.craftingGrid[t]=Nt()}}}get isOpen(){return this._isOpen}update(){if(this.inventory){for(let t=0;t<Le;t++){const e=this.inventory.getSlot(t),n=this.slotElements[t];e&&n&&this.updateSlotDisplay(n,e)}for(let t=0;t<Rs;t++){const e=this.craftingSlotElements[t],n=this.craftingGrid[t];e&&n&&this.updateSlotDisplay(e,n)}}}updateSlotDisplay(t,e){const n=t.querySelector(".slot-icon"),i=t.querySelector(".slot-count"),r=t.querySelector(".durability-bar"),o=t.querySelector(".durability-fill");if(mt(e))n&&(n.style.backgroundImage="",n.style.backgroundColor="transparent"),i&&(i.textContent=""),r&&(r.style.display="none");else if(n&&e.itemType!==null&&this.setSlotTexture(n,e.itemType),i&&(i.textContent=e.count>1?String(e.count):""),r&&o&&e.durability!==void 0&&e.maxDurability!==void 0){const a=e.durability/e.maxDurability*100;r.style.display="block",o.style.width=`${a}%`,a>50?o.style.background="#4caf50":a>25?o.style.background="#ff9800":o.style.background="#f44336"}else r&&(r.style.display="none")}setSlotTexture(t,e){try{const n=Hn(),i=n.getCanvas(),r=n.getConfig(),o=Cn(e,"side"),a=document.createElement("canvas");a.width=r.tileSize,a.height=r.tileSize;const l=a.getContext("2d");if(l){const c=o*r.tileSize;l.drawImage(i,c,0,r.tileSize,r.tileSize,0,0,r.tileSize,r.tileSize),t.style.backgroundImage=`url(${a.toDataURL()})`,t.style.backgroundColor="transparent"}}catch{const n=He[e]??8421504;t.style.backgroundImage="",t.style.backgroundColor=`#${n.toString(16).padStart(6,"0")}`}}setOnOpen(t){this.onOpenCallback=t}setOnClose(t){this.onCloseCallback=t}dispose(){this.overlay&&this.overlay.parentNode&&this.overlay.parentNode.removeChild(this.overlay),this.tooltipElement&&this.tooltipElement.parentNode&&this.tooltipElement.parentNode.removeChild(this.tooltipElement),this.cursorElement&&this.cursorElement.parentNode&&this.cursorElement.parentNode.removeChild(this.cursorElement),this.overlay=null,this.container=null,this.tooltipElement=null,this.cursorElement=null,this.slotElements=[],this.craftingSlotElements=[],this.craftingOutputElement=null}}class AM{container=null;overlay=null;slotElements=[];inventory=null;_isOpen=!1;furnacePosition=null;fuelSlotElement=null;inputSlotElement=null;outputSlotElement=null;burnProgressElement=null;smeltProgressElement=null;draggedSlotIndex=-1;draggedElement=null;dragSource="inventory";onOpenCallback=null;onCloseCallback=null;updateInterval=null;constructor(){this.createUI(),this.setupKeyboardListener()}createUI(){this.overlay=document.createElement("div"),this.overlay.id="furnace-overlay",this.overlay.style.cssText=`
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.7);
      display: none;
      justify-content: center;
      align-items: center;
      z-index: 1000;
    `,this.container=document.createElement("div"),this.container.id="furnace-container",this.container.style.cssText=`
      background: #8b8b8b;
      border: 4px solid #373737;
      border-radius: 4px;
      padding: 16px;
      box-shadow: 0 8px 32px rgba(0, 0, 0, 0.5);
    `;const t=document.createElement("div");t.textContent="熔炉",t.style.cssText=`
      color: #404040;
      font-size: 16px;
      font-weight: bold;
      margin-bottom: 12px;
      text-align: center;
    `,this.container.appendChild(t),this.createFurnaceArea();const e=document.createElement("div");e.style.cssText=`
      height: 2px;
      background: #555;
      margin: 16px 0;
    `,this.container.appendChild(e);const n=document.createElement("div");n.style.cssText=`
      display: grid;
      grid-template-columns: repeat(9, 48px);
      gap: 4px;
      margin-bottom: 16px;
    `;for(let o=be;o<Le;o++){const a=this.createSlot(o,"inventory");n.appendChild(a),this.slotElements[o]=a}this.container.appendChild(n);const i=document.createElement("div");i.style.cssText=`
      display: grid;
      grid-template-columns: repeat(9, 48px);
      gap: 4px;
    `;for(let o=0;o<be;o++){const a=this.createSlot(o,"inventory");i.appendChild(a),this.slotElements[o]=a}this.container.appendChild(i);const r=document.createElement("div");r.textContent="按 E 或 ESC 关闭",r.style.cssText=`
      color: #606060;
      font-size: 12px;
      margin-top: 12px;
      text-align: center;
    `,this.container.appendChild(r),this.overlay.appendChild(this.container),document.body.appendChild(this.overlay),this.overlay.addEventListener("click",o=>{o.target===this.overlay&&this.close()})}createFurnaceArea(){const t=document.createElement("div");t.style.cssText=`
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 24px;
      padding: 16px;
      background: #6b6b6b;
      border-radius: 4px;
    `;const e=document.createElement("div");e.style.cssText=`
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 8px;
    `,this.inputSlotElement=this.createSlot(-1,"input"),e.appendChild(this.inputSlotElement);const n=document.createElement("div");n.style.cssText=`
      width: 48px;
      height: 24px;
      position: relative;
      display: flex;
      justify-content: center;
      align-items: center;
    `,this.burnProgressElement=document.createElement("div"),this.burnProgressElement.style.cssText=`
      width: 20px;
      height: 20px;
      background: #333;
      clip-path: polygon(50% 0%, 100% 50%, 80% 100%, 20% 100%, 0% 50%);
      position: relative;
      overflow: hidden;
    `;const i=document.createElement("div");i.className="burn-fill",i.style.cssText=`
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      height: 0%;
      background: #ff6600;
      transition: height 0.1s;
    `,this.burnProgressElement.appendChild(i),n.appendChild(this.burnProgressElement),e.appendChild(n),this.fuelSlotElement=this.createSlot(-2,"fuel"),e.appendChild(this.fuelSlotElement),t.appendChild(e);const r=document.createElement("div");r.style.cssText=`
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 4px;
    `,this.smeltProgressElement=document.createElement("div"),this.smeltProgressElement.style.cssText=`
      width: 48px;
      height: 24px;
      background: #555;
      position: relative;
      overflow: hidden;
    `;const o=document.createElement("div");o.className="smelt-fill",o.style.cssText=`
      position: absolute;
      top: 0;
      left: 0;
      bottom: 0;
      width: 0%;
      background: #4caf50;
      transition: width 0.1s;
    `,this.smeltProgressElement.appendChild(o);const a=document.createElement("div");a.textContent="→",a.style.cssText=`
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      font-size: 20px;
      color: #888;
    `,this.smeltProgressElement.appendChild(a),r.appendChild(this.smeltProgressElement),t.appendChild(r),this.outputSlotElement=this.createSlot(-3,"output"),this.outputSlotElement.style.cssText+=`
      width: 56px;
      height: 56px;
      background: #a0a0a0;
      border-color: #505050;
      border-top-color: #d0d0d0;
      border-left-color: #d0d0d0;
    `,t.appendChild(this.outputSlotElement),this.container.appendChild(t)}createSlot(t,e){const n=document.createElement("div");n.className=`${e}-slot`,n.dataset.slotIndex=String(t),n.dataset.source=e,n.style.cssText=`
      width: 48px;
      height: 48px;
      background: #8b8b8b;
      border: 2px solid #373737;
      border-top-color: #ffffff;
      border-left-color: #ffffff;
      position: relative;
      cursor: pointer;
      display: flex;
      justify-content: center;
      align-items: center;
      image-rendering: pixelated;
    `;const i=document.createElement("div");i.className="slot-icon",i.style.cssText=`
      width: 32px;
      height: 32px;
      background-size: cover;
      image-rendering: pixelated;
    `,n.appendChild(i);const r=document.createElement("span");return r.className="slot-count",r.style.cssText=`
      position: absolute;
      bottom: 2px;
      right: 4px;
      font-size: 12px;
      color: white;
      text-shadow: 1px 1px 1px black, -1px -1px 1px black;
      pointer-events: none;
    `,n.appendChild(r),n.draggable=!0,n.addEventListener("dragstart",o=>this.handleDragStart(o,t,e)),n.addEventListener("dragover",o=>this.handleDragOver(o)),n.addEventListener("drop",o=>this.handleDrop(o,t,e)),n.addEventListener("dragend",()=>this.handleDragEnd()),e==="output"&&n.addEventListener("click",()=>this.handleOutputClick()),n}setupKeyboardListener(){document.addEventListener("keydown",t=>{this._isOpen&&(t.code==="KeyE"||t.code==="Escape")&&(t.preventDefault(),this.close())})}handleDragStart(t,e,n){if(n==="output"){t.preventDefault();return}let i=null;if(n==="inventory"&&this.inventory)i=this.inventory.getSlot(e);else if(this.furnacePosition){const r=An.getInstance().getFurnace(this.furnacePosition.x,this.furnacePosition.y,this.furnacePosition.z);r&&(n==="fuel"?i=r.fuelSlot:n==="input"&&(i=r.inputSlot))}if(!i||mt(i)){t.preventDefault();return}this.draggedSlotIndex=e,this.dragSource=n,this.draggedElement=t.target,t.dataTransfer&&(t.dataTransfer.effectAllowed="move",t.dataTransfer.setData("text/plain",`${n}:${e}`)),setTimeout(()=>{this.draggedElement&&(this.draggedElement.style.opacity="0.5")},0)}handleDragOver(t){t.preventDefault(),t.dataTransfer&&(t.dataTransfer.dropEffect="move")}handleDrop(t,e,n){if(t.preventDefault(),n==="output"||this.draggedSlotIndex<0&&this.dragSource==="inventory"||!this.furnacePosition||!this.inventory)return;const i=An.getInstance().getFurnaceInstance(this.furnacePosition.x,this.furnacePosition.y,this.furnacePosition.z);if(!i)return;let r=null;if(this.dragSource==="inventory"?r=this.inventory.getSlot(this.draggedSlotIndex):this.dragSource==="fuel"?r=i.state.fuelSlot:this.dragSource==="input"&&(r=i.state.inputSlot),!(!r||mt(r))){if(this.dragSource==="inventory"&&n==="inventory")this.inventory.swapSlots(this.draggedSlotIndex,e);else if(this.dragSource==="inventory"&&n==="fuel")i.addFuel(r.itemType,r.count)&&this.inventory.setSlot(this.draggedSlotIndex,Nt());else if(this.dragSource==="inventory"&&n==="input")i.addInput(r.itemType,r.count)&&this.inventory.setSlot(this.draggedSlotIndex,Nt());else if(this.dragSource==="fuel"&&n==="inventory"){const o=this.inventory.getSlot(e);mt(o)&&(this.inventory.setSlot(e,{...r}),i.state.fuelSlot=Nt())}else if(this.dragSource==="input"&&n==="inventory"){const o=this.inventory.getSlot(e);mt(o)&&(this.inventory.setSlot(e,{...r}),i.state.inputSlot=Nt())}this.update()}}handleDragEnd(){this.draggedElement&&(this.draggedElement.style.opacity="1"),this.draggedSlotIndex=-1,this.draggedElement=null}handleOutputClick(){if(!this.furnacePosition||!this.inventory)return;const t=An.getInstance().takeOutput(this.furnacePosition.x,this.furnacePosition.y,this.furnacePosition.z);t&&(this.inventory.addItem(t.itemType,t.count),this.update())}open(t,e,n,i){this.inventory=t,this.furnacePosition={x:e,y:n,z:i},this._isOpen=!0,this.overlay&&(this.overlay.style.display="flex"),this.updateInterval=window.setInterval(()=>this.update(),100),this.update(),this.onOpenCallback&&this.onOpenCallback()}close(){this._isOpen=!1,this.furnacePosition=null,this.overlay&&(this.overlay.style.display="none"),this.updateInterval!==null&&(window.clearInterval(this.updateInterval),this.updateInterval=null),this.onCloseCallback&&this.onCloseCallback()}get isOpen(){return this._isOpen}update(){if(!this.inventory||!this.furnacePosition)return;for(let e=0;e<Le;e++){const n=this.inventory.getSlot(e),i=this.slotElements[e];n&&i&&this.updateSlotDisplay(i,n)}const t=An.getInstance().getFurnace(this.furnacePosition.x,this.furnacePosition.y,this.furnacePosition.z);if(t){if(this.fuelSlotElement&&this.updateSlotDisplay(this.fuelSlotElement,t.fuelSlot),this.inputSlotElement&&this.updateSlotDisplay(this.inputSlotElement,t.inputSlot),this.outputSlotElement&&this.updateSlotDisplay(this.outputSlotElement,t.outputSlot),this.burnProgressElement){const e=this.burnProgressElement.querySelector(".burn-fill");if(e){const n=t.burnTimeTotal>0?t.burnTimeRemaining/t.burnTimeTotal*100:0;e.style.height=`${n}%`}}if(this.smeltProgressElement){const e=this.smeltProgressElement.querySelector(".smelt-fill");if(e){const n=t.smeltProgress*100;e.style.width=`${n}%`}}}}updateSlotDisplay(t,e){const n=t.querySelector(".slot-icon"),i=t.querySelector(".slot-count");mt(e)?(n&&(n.style.backgroundImage="",n.style.backgroundColor="transparent"),i&&(i.textContent="")):(n&&e.itemType!==null&&this.setSlotTexture(n,e.itemType),i&&(i.textContent=e.count>1?String(e.count):""))}setSlotTexture(t,e){try{const n=Hn(),i=n.getCanvas(),r=n.getConfig(),o=Cn(e,"side"),a=document.createElement("canvas");a.width=r.tileSize,a.height=r.tileSize;const l=a.getContext("2d");if(l){const c=o*r.tileSize;l.drawImage(i,c,0,r.tileSize,r.tileSize,0,0,r.tileSize,r.tileSize),t.style.backgroundImage=`url(${a.toDataURL()})`,t.style.backgroundColor="transparent"}}catch{const n=He[e]??8421504;t.style.backgroundImage="",t.style.backgroundColor=`#${n.toString(16).padStart(6,"0")}`}}setOnOpen(t){this.onOpenCallback=t}setOnClose(t){this.onCloseCallback=t}dispose(){this.updateInterval!==null&&window.clearInterval(this.updateInterval),this.overlay&&this.overlay.parentNode&&this.overlay.parentNode.removeChild(this.overlay),this.overlay=null,this.container=null,this.slotElements=[]}}document.addEventListener("DOMContentLoaded",()=>{const s=document.getElementById("game-container");if(!s){console.error("Game container not found!");return}const e=new URLSearchParams(window.location.search).get("seed"),n=e?parseInt(e,10):void 0,i=new fv(s,{seed:n});SM(),MM(),ES();const r=Ei.getInstance(),o=ni.getInstance(),a=i.getWorld().getSpawnPosition(),l=new Ov(a.x,a.y,a.z);i.setPlayer(l),l.inventory.addItem(m.LOG,16),l.inventory.addItem(m.OAK_LOG,16),l.inventory.addItem(m.COBBLESTONE,32),l.inventory.addItem(m.CAMPFIRE,4),l.inventory.addItem(m.RAW_BEEF,8),l.inventory.addItem(m.RAW_PORKCHOP,4);const c=o.getSelectedModelId("default");let h=r.createModelInstance(c);i.getRenderer().getScene().add(h.mesh);const u=new Hv(i.getCamera(),l,i.getWorld());u.setCharacterModel(h);const d=new nM;i.getCamera().add(d.getContainer());const f=()=>{const R=l.inventory.getSelectedItem();d.setItem(R.itemType)};f(),l.inventory.setOnSelectionChange(f),l.inventory.setOnInventoryChange(f);const y=new yS;y.setModels(r.getAvailableModels());const _=R=>{i.getRenderer().getScene().remove(h.mesh),h.dispose(),h=r.createModelInstance(R),i.getRenderer().getScene().add(h.mesh),u.setCharacterModel(h),console.log(`[Character] Changed to: ${R}`)},g=new kv(l,i.getWorld()),p=new GS({player:l,world:i.getWorld(),spawnPosition:new I(a.x,a.y,a.z),onRespawn:()=>{u.update(0),C.requestPointerLock()}});p.initialize();const x=new HS(i.getEntityManager()),b=()=>{const R=i.getEntityManager().getAll();for(const Ft of R)Ft instanceof Rn&&!Ft.isDead&&Ft.setOnDeath((Lt,_t,Rt)=>{if(Rt){const ne=tn.getBlockTypeForFood(Rt);if(ne){const lt=new Hs(_t.x,_t.y+.5,_t.z,ne,1);i.addItemEntity(lt),console.log(`[Combat] Animal dropped: ${Rt}`)}}i.getEntityManager().remove(Lt.id)})},S=new XS(l.inventory,l.stats),L=new KS;document.body.appendChild(L.getElement()),S.setCallbacks({onEatingStart:()=>{L.show(),d.startEating(),h.startEating()},onEatingProgress:R=>{L.setProgress(R)},onEatingComplete:(R,Ft)=>{L.hide(),d.stopEating(),h.stopEating(),console.log(`[Eating] Restored ${Ft} hunger`)},onEatingCancel:()=>{L.hide(),d.stopEating(),h.stopEating()}});const C=new Xv(i.getRenderer().getDomElement()),w=new sS(i.getWorld(),l,i.getCamera());w.setOnItemDrop(R=>{i.addItemEntity(R)});const P=new aM(i.getWorld(),l),T=new lM,E=new cM(i.getRenderer().getScene()),D=new fM(i.getRenderer().getScene(),i.getWorld());D.setOnItemDrop(R=>{i.addItemEntity(R)});let H=0;const B=.3;P.setCallbacks({onProgressChange:(R,Ft)=>{T.setProgress(R);const Lt=P.getTargetBlock();Lt&&E.show(Lt.x,Lt.y,Lt.z,Ft)},onDiggingStart:()=>{T.show(),H=0,d.attack(),h.triggerAttack()},onDiggingStop:()=>{T.hide(),E.hide(),H=0},onBlockBreak:(R,Ft,Lt,_t)=>{T.hide(),E.hide(),H=0,_t===m.CAMPFIRE&&D.onBlockRemoved(R,Ft,Lt),(_t===m.FURNACE||_t===m.FURNACE_LIT)&&rt.onBlockRemoved(R,Ft,Lt)},onItemDrop:R=>{i.addItemEntity(R)}});const K=new Kv,Z=new Yv;Z.setInventory(l.inventory);const q=new nS;q.setOnOpen(()=>{C.exitPointerLock()}),q.setOnClose(()=>{C.requestPointerLock()});const Q=new TM;Q.setOnOpen(()=>{C.exitPointerLock()}),Q.setOnClose(()=>{C.requestPointerLock()});const W=new AM;W.setOnOpen(()=>{C.exitPointerLock()}),W.setOnClose(()=>{C.requestPointerLock()});const rt=An.getInstance();rt.initialize(i.getWorld()),rt.setOnItemDrop(R=>{i.addItemEntity(R)});const ht=new iS(i.getRenderer().getScene(),l,i.getWorld()),yt=Ae.getInstance();new rS;const kt=new oS,$t=new hS;$t.setWorld(i.getWorld());const $=new pS;$.setWorld(i.getWorld());const et=new RS,gt=new IS(et),ot=new DS(et);et.initialize().then(R=>{R?(console.log("[SaveSystem] Initialized successfully"),ot.setDataProvider(()=>({seed:i.getWorld().getSeed(),playerState:l.getState(),modifiedChunks:i.getWorld().getModifiedChunks()})),ot.onSaveComplete(Ft=>{Ft.success?console.log("[AutoSave] Completed successfully"):console.error("[AutoSave] Failed:",Ft.error)}),ot.start(),et.getAutoSave().then(Ft=>{Ft&&console.log("[SaveSystem] Found auto-save from:",new Date(Ft.updatedAt).toLocaleString())})):console.warn("[SaveSystem] Not available - browser may not support IndexedDB")}),gt.setCallbacks({onSave:async(R,Ft)=>et.save(R,Ft,{seed:i.getWorld().getSeed(),playerState:l.getState(),modifiedChunks:i.getWorld().getModifiedChunks()}),onLoad:async R=>{const Ft=await et.load(R);if(!Ft.success||!Ft.saveData||!Ft.chunks)throw new Error(Ft.error||"Load failed");i.getWorld().resetWorld(),i.getChunkManager().reset(),l.restoreState(Ft.saveData.playerState),i.getChunkManager().forceLoadRadius(l.position.x,l.position.y,l.position.z,3),i.getWorld().restoreFromSave(Ft.chunks),u.update(0)},onDelete:async R=>et.delete(R),onRename:async(R,Ft)=>et.rename(R,Ft),onNewWorld:async()=>{i.getWorld().resetWorld(),i.getChunkManager().reset();const R=i.getWorld().getSpawnPosition();l.position.set(R.x,R.y,R.z),l.velocity.set(0,0,0),i.getChunkManager().forceLoadRadius(R.x,R.y,R.z,3)},getWorldData:()=>({seed:i.getWorld().getSeed(),playerState:l.getState(),modifiedChunks:i.getWorld().getModifiedChunks()})});let Et=0;const xt=.4,Vt=.25;let ce=0,Xt=!1;C.onPointerLockChange(R=>{K.setVisible(R)});const he=async()=>{await yt.init(),yt.playMusic("ambient"),document.removeEventListener("click",he),document.removeEventListener("keydown",he)};document.addEventListener("click",he),document.addEventListener("keydown",he),i.setUpdateCallback(R=>{if(p.update(R),x.update(R),D.update(R),rt.update(R),x.update(R),b(),p.isPlayerDead())return;kt.update(l.position.x,l.position.y,l.position.z),$t.update(l.position.x,l.position.y,l.position.z,l.rotation.y),$.updatePlayerPosition(l.position.x,l.position.y,l.position.z);const Ft=l.getForwardDirection();if(yt.updateListenerPosition(l.position.x,l.position.y,l.position.z,Ft.x,Ft.z),C.isPointerLocked()&&!$.opened&&!q.isOpen){const _t=C.getState();if(g.update(_t,R),_t.numberKey!==null&&_t.numberKey<9&&Z.selectSlot(_t.numberKey),_t.tabCycle&&Z.selectNext(),_t.leftClick){d.attack(),h.triggerAttack();const lt=l.getEyePosition(),A=l.getLookDirection();x.attack(lt,A).hit&&P.forceStop()}const Rt=_t.leftMouseDown&&!x.hasRecentHit();if(P.update(R,Rt),P.isDigging()&&(H+=R,H>=B&&(H=0,d.attack(),h.triggerAttack())),_t.rightClick){const lt=l.inventory.getSelectedItem(),A=lt.itemType&&tn.isRawFood(lt.itemType),v=lt.itemType&&tn.isFoodBlock(lt.itemType),Y=new Zr(i.getWorld()).cast(l.getEyePosition(),l.getLookDirection());if(Y&&Y.distance<=ri&&Y.blockType===m.CRAFTING_TABLE)Q.open(l.inventory),P.forceStop();else if(Y&&Y.distance<=ri&&(Y.blockType===m.FURNACE||Y.blockType===m.FURNACE_LIT))W.open(l.inventory,Y.blockX,Y.blockY,Y.blockZ),P.forceStop();else if(A)Y&&Y.distance<=ri&&Y.blockType===m.CAMPFIRE?D.addFoodToCampfire(Y.blockX,Y.blockY,Y.blockZ,lt.itemType)?(l.inventory.removeItem(l.inventory.selectedSlot,1),console.log("[Campfire] Added food to cook")):console.log("[Campfire] Campfire is full"):S.canEat()&&(S.isEating()||S.startEating(l.position));else if(v)S.canEat()&&(S.isEating()||S.startEating(l.position));else{const J=w.placeBlock();J&&(d.place(),J.blockType===m.CAMPFIRE&&D.onBlockPlaced(J.x,J.y,J.z,m.CAMPFIRE),J.blockType===m.FURNACE&&rt.onBlockPlaced(J.x,J.y,J.z,m.FURNACE))}}if(S.update(R,l.position,_t.rightMouseDown),_t.inventoryToggle&&(q.open(l.inventory),P.forceStop()),_t.mapToggle&&$.toggle(),_t.viewToggle){u.toggleViewMode();const lt=u.currentMode===rn.FIRST_PERSON;K.setVisible(lt),ht.setVisible(!lt),d.visible=lt}if(_t.characterSelect&&!y.isVisible&&(C.exitPointerLock(),y.show({onConfirm:lt=>{_(lt),C.requestPointerLock()},onCancel:()=>{C.requestPointerLock()}})),u.currentMode===rn.THIRD_PERSON&&u.handleMouseMove(_t.mouseX,_t.mouseY),(_t.forward||_t.backward||_t.left||_t.right)&&l.isGrounded&&!l.isInWater){if(Et-=R,Et<=0){const lt=Math.floor(l.position.y-l.height/2-.1),A=i.getWorld().getBlock(Math.floor(l.position.x),lt,Math.floor(l.position.z)),v=yt.getFootstepSound(A);yt.playSfx(v,{volume:.5,playbackRate:.9+Math.random()*.2}),Et=_t.sprint?Vt:xt}}else Et=0;if(!l.isGrounded&&!l.isInWater)Xt||(Xt=!0,ce=l.position.y);else if(Xt){const lt=ce-l.position.y;if(lt>3){const v=lt>7?"fall_heavy":"fall_light",U=Math.min(1,.3+lt*.1);yt.playSfx(v,{volume:U})}Xt=!1}}else C.getState().mapToggle&&$.toggle();C.getState().escapeMenu&&!y.isVisible&&!$.opened&&gt.toggle(),u.update(R);const Lt=l.velocity.lengthSq()>.1&&l.isGrounded;d.update(R,Lt),ht.update(),i.setPlayerPosition(l.position.x,l.position.y,l.position.z),C.resetFrameState()}),i.start(),console.log("WebCraft initialized!"),console.log("World seed:",i.getWorld().seed),console.log("Click to start, WASD to move, mouse to look around"),console.log("Left click to destroy, right click to place blocks"),console.log("Press 1-9 to switch hotbar slots, E to open inventory"),console.log("Press M to open world map"),console.log("Press V to toggle first/third person view")});

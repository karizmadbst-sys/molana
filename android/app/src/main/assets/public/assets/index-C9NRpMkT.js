(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),t.credentials=e.crossOrigin===`use-credentials`?`include`:e.crossOrigin===`anonymous`?`omit`:`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();var e,t,n,r,i,a,o,s,c,l=1e3,u=1001,d=1002,f=1003,p=1004,m=1005,h=1006,g=1007,_=1008,v=1009,y=1010,b=1011,x=1012,S=1013,C=1014,w=1015,T=1016,E=1017,D=1018,O=1020,k=35902,A=35899,j=1021,M=1022,N=1023,ee=1026,P=1027,te=1028,ne=1029,re=1030,ie=1031,ae=1033,oe=33776,se=33777,ce=33778,F=33779,le=35840,ue=35841,de=35842,fe=35843,pe=36196,me=37492,he=37496,ge=37488,_e=37489,ve=37490,ye=37491,be=37808,xe=37809,Se=37810,Ce=37811,we=37812,Te=37813,Ee=37814,De=37815,Oe=37816,ke=37817,Ae=37818,je=37819,Me=37820,I=37821,Ne=36492,Pe=36494,Fe=36495,L=36283,Ie=36284,R=36285,Le=36286,Re=2300,ze=2301,Be=2302,Ve=2303,He=2400,Ue=2401,We=2402,Ge=3200,Ke=`srgb`,qe=`srgb-linear`,Je=`linear`,Ye=`srgb`,Xe=7680,Ze=35044,Qe=2e3;function $e(e){for(let t=e.length-1;t>=0;--t)if(e[t]>=65535)return!0;return!1}function et(e){return ArrayBuffer.isView(e)&&!(e instanceof DataView)}function tt(e){return document.createElementNS(`http://www.w3.org/1999/xhtml`,e)}function nt(){let e=tt(`canvas`);return e.style.display=`block`,e}var rt={};function it(...e){let t=`THREE.`+e.shift();console.log(t,...e)}function at(e){let t=e[0];if(typeof t==`string`&&t.startsWith(`TSL:`)){let t=e[1];t&&t.isStackTrace?e[0]+=` `+t.getLocation():e[1]=`Stack trace not available. Enable "THREE.Node.captureStackTrace" to capture stack traces.`}return e}function z(...e){e=at(e);let t=`THREE.`+e.shift();{let n=e[0];n&&n.isStackTrace?console.warn(n.getError(t)):console.warn(t,...e)}}function B(...e){e=at(e);let t=`THREE.`+e.shift();{let n=e[0];n&&n.isStackTrace?console.error(n.getError(t)):console.error(t,...e)}}function ot(...e){let t=e.join(` `);t in rt||(rt[t]=!0,z(...e))}function st(e,t,n){return new Promise(function(r,i){function a(){switch(e.clientWaitSync(t,e.SYNC_FLUSH_COMMANDS_BIT,0)){case e.WAIT_FAILED:i();break;case e.TIMEOUT_EXPIRED:setTimeout(a,n);break;default:r()}}setTimeout(a,n)})}var ct={0:1,2:6,4:7,3:5,1:0,6:2,7:4,5:3},lt=class{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});let n=this._listeners;n[e]===void 0&&(n[e]=[]),n[e].indexOf(t)===-1&&n[e].push(t)}hasEventListener(e,t){let n=this._listeners;return n!==void 0&&n[e]!==void 0&&n[e].indexOf(t)!==-1}removeEventListener(e,t){let n=this._listeners;if(n===void 0)return;let r=n[e];if(r!==void 0){let e=r.indexOf(t);e!==-1&&r.splice(e,1)}}dispatchEvent(e){let t=this._listeners;if(t===void 0)return;let n=t[e.type];if(n!==void 0){e.target=this;let t=n.slice(0);for(let n=0,r=t.length;n<r;n++)t[n].call(this,e);e.target=null}}},ut=`00.01.02.03.04.05.06.07.08.09.0a.0b.0c.0d.0e.0f.10.11.12.13.14.15.16.17.18.19.1a.1b.1c.1d.1e.1f.20.21.22.23.24.25.26.27.28.29.2a.2b.2c.2d.2e.2f.30.31.32.33.34.35.36.37.38.39.3a.3b.3c.3d.3e.3f.40.41.42.43.44.45.46.47.48.49.4a.4b.4c.4d.4e.4f.50.51.52.53.54.55.56.57.58.59.5a.5b.5c.5d.5e.5f.60.61.62.63.64.65.66.67.68.69.6a.6b.6c.6d.6e.6f.70.71.72.73.74.75.76.77.78.79.7a.7b.7c.7d.7e.7f.80.81.82.83.84.85.86.87.88.89.8a.8b.8c.8d.8e.8f.90.91.92.93.94.95.96.97.98.99.9a.9b.9c.9d.9e.9f.a0.a1.a2.a3.a4.a5.a6.a7.a8.a9.aa.ab.ac.ad.ae.af.b0.b1.b2.b3.b4.b5.b6.b7.b8.b9.ba.bb.bc.bd.be.bf.c0.c1.c2.c3.c4.c5.c6.c7.c8.c9.ca.cb.cc.cd.ce.cf.d0.d1.d2.d3.d4.d5.d6.d7.d8.d9.da.db.dc.dd.de.df.e0.e1.e2.e3.e4.e5.e6.e7.e8.e9.ea.eb.ec.ed.ee.ef.f0.f1.f2.f3.f4.f5.f6.f7.f8.f9.fa.fb.fc.fd.fe.ff`.split(`.`),dt=1234567,ft=Math.PI/180,pt=180/Math.PI;function mt(){let e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,n=Math.random()*4294967295|0,r=Math.random()*4294967295|0;return(ut[e&255]+ut[e>>8&255]+ut[e>>16&255]+ut[e>>24&255]+`-`+ut[t&255]+ut[t>>8&255]+`-`+ut[t>>16&15|64]+ut[t>>24&255]+`-`+ut[n&63|128]+ut[n>>8&255]+`-`+ut[n>>16&255]+ut[n>>24&255]+ut[r&255]+ut[r>>8&255]+ut[r>>16&255]+ut[r>>24&255]).toLowerCase()}function V(e,t,n){return Math.max(t,Math.min(n,e))}function ht(e,t){return(e%t+t)%t}function gt(e,t,n,r,i){return r+(e-t)*(i-r)/(n-t)}function _t(e,t,n){return e===t?0:(n-e)/(t-e)}function vt(e,t,n){return(1-n)*e+n*t}function yt(e,t,n,r){return vt(e,t,1-Math.exp(-n*r))}function bt(e,t=1){return t-Math.abs(ht(e,t*2)-t)}function xt(e,t,n){return e<=t?0:e>=n?1:(e=(e-t)/(n-t),e*e*(3-2*e))}function St(e,t,n){return e<=t?0:e>=n?1:(e=(e-t)/(n-t),e*e*e*(e*(e*6-15)+10))}function Ct(e,t){return e+Math.floor(Math.random()*(t-e+1))}function wt(e,t){return e+Math.random()*(t-e)}function Tt(e){return e*(.5-Math.random())}function Et(e){e!==void 0&&(dt=e);let t=dt+=1831565813;return t=Math.imul(t^t>>>15,t|1),t^=t+Math.imul(t^t>>>7,t|61),((t^t>>>14)>>>0)/4294967296}function Dt(e){return e*ft}function Ot(e){return e*pt}function kt(e){return e>0&&Number.isInteger(e)&&2**Math.round(Math.log2(e))===e}function At(e){return 2**Math.ceil(Math.log(e)/Math.LN2)}function jt(e){return 2**Math.floor(Math.log(e)/Math.LN2)}function Mt(e,t,n,r,i){let a=Math.cos,o=Math.sin,s=a(n/2),c=o(n/2),l=a((t+r)/2),u=o((t+r)/2),d=a((t-r)/2),f=o((t-r)/2),p=a((r-t)/2),m=o((r-t)/2);switch(i){case`XYX`:e.set(s*u,c*d,c*f,s*l);break;case`YZY`:e.set(c*f,s*u,c*d,s*l);break;case`ZXZ`:e.set(c*d,c*f,s*u,s*l);break;case`XZX`:e.set(s*u,c*m,c*p,s*l);break;case`YXY`:e.set(c*p,s*u,c*m,s*l);break;case`ZYZ`:e.set(c*m,c*p,s*u,s*l);break;default:z(`MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: `+i)}}function Nt(e,t){switch(t.constructor){case Float32Array:return e;case Uint32Array:return e/4294967295;case Uint16Array:return e/65535;case Uint8Array:case Uint8ClampedArray:return e/255;case Int32Array:return Math.max(e/2147483647,-1);case Int16Array:return Math.max(e/32767,-1);case Int8Array:return Math.max(e/127,-1);default:throw Error(`THREE.MathUtils: Invalid component type.`)}}function Pt(e,t){switch(t.constructor){case Float32Array:return e;case Uint32Array:return Math.round(e*4294967295);case Uint16Array:return Math.round(e*65535);case Uint8Array:case Uint8ClampedArray:return Math.round(e*255);case Int32Array:return Math.round(e*2147483647);case Int16Array:return Math.round(e*32767);case Int8Array:return Math.round(e*127);default:throw Error(`THREE.MathUtils: Invalid component type.`)}}var H={DEG2RAD:ft,RAD2DEG:pt,generateUUID:mt,clamp:V,euclideanModulo:ht,mapLinear:gt,inverseLerp:_t,lerp:vt,damp:yt,pingpong:bt,smoothstep:xt,smootherstep:St,randInt:Ct,randFloat:wt,randFloatSpread:Tt,seededRandom:Et,degToRad:Dt,radToDeg:Ot,isPowerOfTwo:kt,ceilPowerOfTwo:At,floorPowerOfTwo:jt,setQuaternionFromProperEuler:Mt,normalize:Pt,denormalize:Nt};o=Symbol.iterator;var U=class{constructor(e=0,t=0){this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw Error(`THREE.Vector2: index is out of range: `+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw Error(`THREE.Vector2: index is out of range: `+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){let t=this.x,n=this.y,r=e.elements;return this.x=r[0]*t+r[3]*n+r[6],this.y=r[1]*t+r[4]*n+r[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=V(this.x,e.x,t.x),this.y=V(this.y,e.y,t.y),this}clampScalar(e,t){return this.x=V(this.x,e,t),this.y=V(this.y,e,t),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(V(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){let t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;let n=this.dot(e)/t;return Math.acos(V(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){let t=this.x-e.x,n=this.y-e.y;return t*t+n*n}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){let n=Math.cos(t),r=Math.sin(t),i=this.x-e.x,a=this.y-e.y;return this.x=i*n-a*r+e.x,this.y=i*r+a*n+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[o](){yield this.x,yield this.y}};e=U,e.prototype.isVector2=!0;var Ft=class{constructor(e=0,t=0,n=0,r=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=n,this._w=r}static slerpFlat(e,t,n,r,i,a,o){let s=n[r+0],c=n[r+1],l=n[r+2],u=n[r+3],d=i[a+0],f=i[a+1],p=i[a+2],m=i[a+3];if(u!==m||s!==d||c!==f||l!==p){let e=s*d+c*f+l*p+u*m;e<0&&(d=-d,f=-f,p=-p,m=-m,e=-e);let t=1-o;if(e<.9995){let n=Math.acos(e),r=Math.sin(n);t=Math.sin(t*n)/r,o=Math.sin(o*n)/r,s=s*t+d*o,c=c*t+f*o,l=l*t+p*o,u=u*t+m*o}else{s=s*t+d*o,c=c*t+f*o,l=l*t+p*o,u=u*t+m*o;let e=1/Math.sqrt(s*s+c*c+l*l+u*u);s*=e,c*=e,l*=e,u*=e}}e[t]=s,e[t+1]=c,e[t+2]=l,e[t+3]=u}static multiplyQuaternionsFlat(e,t,n,r,i,a){let o=n[r],s=n[r+1],c=n[r+2],l=n[r+3],u=i[a],d=i[a+1],f=i[a+2],p=i[a+3];return e[t]=o*p+l*u+s*f-c*d,e[t+1]=s*p+l*d+c*u-o*f,e[t+2]=c*p+l*f+o*d-s*u,e[t+3]=l*p-o*u-s*d-c*f,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,n,r){return this._x=e,this._y=t,this._z=n,this._w=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){let n=e._x,r=e._y,i=e._z,a=e._order,o=Math.cos,s=Math.sin,c=o(n/2),l=o(r/2),u=o(i/2),d=s(n/2),f=s(r/2),p=s(i/2);switch(a){case`XYZ`:this._x=d*l*u+c*f*p,this._y=c*f*u-d*l*p,this._z=c*l*p+d*f*u,this._w=c*l*u-d*f*p;break;case`YXZ`:this._x=d*l*u+c*f*p,this._y=c*f*u-d*l*p,this._z=c*l*p-d*f*u,this._w=c*l*u+d*f*p;break;case`ZXY`:this._x=d*l*u-c*f*p,this._y=c*f*u+d*l*p,this._z=c*l*p+d*f*u,this._w=c*l*u-d*f*p;break;case`ZYX`:this._x=d*l*u-c*f*p,this._y=c*f*u+d*l*p,this._z=c*l*p-d*f*u,this._w=c*l*u+d*f*p;break;case`YZX`:this._x=d*l*u+c*f*p,this._y=c*f*u+d*l*p,this._z=c*l*p-d*f*u,this._w=c*l*u-d*f*p;break;case`XZY`:this._x=d*l*u-c*f*p,this._y=c*f*u-d*l*p,this._z=c*l*p+d*f*u,this._w=c*l*u+d*f*p;break;default:z(`Quaternion: .setFromEuler() encountered an unknown order: `+a)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){let n=t/2,r=Math.sin(n);return this._x=e.x*r,this._y=e.y*r,this._z=e.z*r,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(e){let t=e.elements,n=t[0],r=t[4],i=t[8],a=t[1],o=t[5],s=t[9],c=t[2],l=t[6],u=t[10],d=n+o+u;if(d>0){let e=.5/Math.sqrt(d+1);this._w=.25/e,this._x=(l-s)*e,this._y=(i-c)*e,this._z=(a-r)*e}else if(n>o&&n>u){let e=2*Math.sqrt(1+n-o-u);this._w=(l-s)/e,this._x=.25*e,this._y=(r+a)/e,this._z=(i+c)/e}else if(o>u){let e=2*Math.sqrt(1+o-n-u);this._w=(i-c)/e,this._x=(r+a)/e,this._y=.25*e,this._z=(s+l)/e}else{let e=2*Math.sqrt(1+u-n-o);this._w=(a-r)/e,this._x=(i+c)/e,this._y=(s+l)/e,this._z=.25*e}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let n=e.dot(t)+1;return n<1e-8?(n=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=n):(this._x=0,this._y=-e.z,this._z=e.y,this._w=n)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=n),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(V(this.dot(e),-1,1)))}rotateTowards(e,t){let n=this.angleTo(e);if(n===0)return this;let r=Math.min(1,t/n);return this.slerp(e,r),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x*=e,this._y*=e,this._z*=e,this._w*=e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){let n=e._x,r=e._y,i=e._z,a=e._w,o=t._x,s=t._y,c=t._z,l=t._w;return this._x=n*l+a*o+r*c-i*s,this._y=r*l+a*s+i*o-n*c,this._z=i*l+a*c+n*s-r*o,this._w=a*l-n*o-r*s-i*c,this._onChangeCallback(),this}slerp(e,t){let n=e._x,r=e._y,i=e._z,a=e._w,o=this.dot(e);o<0&&(n=-n,r=-r,i=-i,a=-a,o=-o);let s=1-t;if(o<.9995){let e=Math.acos(o),c=Math.sin(e);s=Math.sin(s*e)/c,t=Math.sin(t*e)/c,this._x=this._x*s+n*t,this._y=this._y*s+r*t,this._z=this._z*s+i*t,this._w=this._w*s+a*t,this._onChangeCallback()}else this._x=this._x*s+n*t,this._y=this._y*s+r*t,this._z=this._z*s+i*t,this._w=this._w*s+a*t,this.normalize();return this}slerpQuaternions(e,t,n){return this.copy(e).slerp(t,n)}random(){let e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),n=Math.random(),r=Math.sqrt(1-n),i=Math.sqrt(n);return this.set(r*Math.sin(e),r*Math.cos(e),i*Math.sin(t),i*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}};s=Symbol.iterator;var W=class{constructor(e=0,t=0,n=0){this.x=e,this.y=t,this.z=n}set(e,t,n){return n===void 0&&(n=this.z),this.x=e,this.y=t,this.z=n,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw Error(`THREE.Vector3: index is out of range: `+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw Error(`THREE.Vector3: index is out of range: `+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(Lt.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(Lt.setFromAxisAngle(e,t))}applyMatrix3(e){let t=this.x,n=this.y,r=this.z,i=e.elements;return this.x=i[0]*t+i[3]*n+i[6]*r,this.y=i[1]*t+i[4]*n+i[7]*r,this.z=i[2]*t+i[5]*n+i[8]*r,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){let t=this.x,n=this.y,r=this.z,i=e.elements,a=1/(i[3]*t+i[7]*n+i[11]*r+i[15]);return this.x=(i[0]*t+i[4]*n+i[8]*r+i[12])*a,this.y=(i[1]*t+i[5]*n+i[9]*r+i[13])*a,this.z=(i[2]*t+i[6]*n+i[10]*r+i[14])*a,this}applyQuaternion(e){let t=this.x,n=this.y,r=this.z,i=e.x,a=e.y,o=e.z,s=e.w,c=2*(a*r-o*n),l=2*(o*t-i*r),u=2*(i*n-a*t);return this.x=t+s*c+a*u-o*l,this.y=n+s*l+o*c-i*u,this.z=r+s*u+i*l-a*c,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){let t=this.x,n=this.y,r=this.z,i=e.elements;return this.x=i[0]*t+i[4]*n+i[8]*r,this.y=i[1]*t+i[5]*n+i[9]*r,this.z=i[2]*t+i[6]*n+i[10]*r,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=V(this.x,e.x,t.x),this.y=V(this.y,e.y,t.y),this.z=V(this.z,e.z,t.z),this}clampScalar(e,t){return this.x=V(this.x,e,t),this.y=V(this.y,e,t),this.z=V(this.z,e,t),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(V(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){let n=e.x,r=e.y,i=e.z,a=t.x,o=t.y,s=t.z;return this.x=r*s-i*o,this.y=i*a-n*s,this.z=n*o-r*a,this}projectOnVector(e){let t=e.lengthSq();if(t===0)return this.set(0,0,0);let n=e.dot(this)/t;return this.copy(e).multiplyScalar(n)}projectOnPlane(e){return It.copy(this).projectOnVector(e),this.sub(It)}reflect(e){return this.sub(It.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){let t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;let n=this.dot(e)/t;return Math.acos(V(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){let t=this.x-e.x,n=this.y-e.y,r=this.z-e.z;return t*t+n*n+r*r}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,n){let r=Math.sin(t)*e;return this.x=r*Math.sin(n),this.y=Math.cos(t)*e,this.z=r*Math.cos(n),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,n){return this.x=e*Math.sin(t),this.y=n,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){let t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){let t=this.setFromMatrixColumn(e,0).length(),n=this.setFromMatrixColumn(e,1).length(),r=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=n,this.z=r,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){let e=Math.random()*Math.PI*2,t=Math.random()*2-1,n=Math.sqrt(1-t*t);return this.x=n*Math.cos(e),this.y=t,this.z=n*Math.sin(e),this}*[s](){yield this.x,yield this.y,yield this.z}};t=W,t.prototype.isVector3=!0;var It=new W,Lt=new Ft,G=class{constructor(e,t,n,r,i,a,o,s,c){this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,n,r,i,a,o,s,c)}set(e,t,n,r,i,a,o,s,c){let l=this.elements;return l[0]=e,l[1]=r,l[2]=o,l[3]=t,l[4]=i,l[5]=s,l[6]=n,l[7]=a,l[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){let t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],this}extractBasis(e,t,n){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(e){let t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){let n=e.elements,r=t.elements,i=this.elements,a=n[0],o=n[3],s=n[6],c=n[1],l=n[4],u=n[7],d=n[2],f=n[5],p=n[8],m=r[0],h=r[3],g=r[6],_=r[1],v=r[4],y=r[7],b=r[2],x=r[5],S=r[8];return i[0]=a*m+o*_+s*b,i[3]=a*h+o*v+s*x,i[6]=a*g+o*y+s*S,i[1]=c*m+l*_+u*b,i[4]=c*h+l*v+u*x,i[7]=c*g+l*y+u*S,i[2]=d*m+f*_+p*b,i[5]=d*h+f*v+p*x,i[8]=d*g+f*y+p*S,this}multiplyScalar(e){let t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){let e=this.elements,t=e[0],n=e[1],r=e[2],i=e[3],a=e[4],o=e[5],s=e[6],c=e[7],l=e[8];return t*a*l-t*o*c-n*i*l+n*o*s+r*i*c-r*a*s}invert(){let e=this.elements,t=e[0],n=e[1],r=e[2],i=e[3],a=e[4],o=e[5],s=e[6],c=e[7],l=e[8],u=l*a-o*c,d=o*s-l*i,f=c*i-a*s,p=t*u+n*d+r*f;if(p===0)return this.set(0,0,0,0,0,0,0,0,0);let m=1/p;return e[0]=u*m,e[1]=(r*c-l*n)*m,e[2]=(o*n-r*a)*m,e[3]=d*m,e[4]=(l*t-r*s)*m,e[5]=(r*i-o*t)*m,e[6]=f*m,e[7]=(n*s-c*t)*m,e[8]=(a*t-n*i)*m,this}transpose(){let e,t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){let t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,n,r,i,a,o){let s=Math.cos(i),c=Math.sin(i);return this.set(n*s,n*c,-n*(s*a+c*o)+a+e,-r*c,r*s,-r*(-c*a+s*o)+o+t,0,0,1),this}scale(e,t){return ot(`Matrix3: .scale() is deprecated. Use .makeScale() instead.`),this.premultiply(Rt.makeScale(e,t)),this}rotate(e){return ot(`Matrix3: .rotate() is deprecated. Use .makeRotation() instead.`),this.premultiply(Rt.makeRotation(-e)),this}translate(e,t){return ot(`Matrix3: .translate() is deprecated. Use .makeTranslation() instead.`),this.premultiply(Rt.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,n,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){let t=this.elements,n=e.elements;for(let e=0;e<9;e++)if(t[e]!==n[e])return!1;return!0}fromArray(e,t=0){for(let n=0;n<9;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){let n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e}clone(){return new this.constructor().fromArray(this.elements)}};n=G,n.prototype.isMatrix3=!0;var Rt=new G,zt=new G().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),Bt=new G().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function Vt(){let e={enabled:!0,workingColorSpace:qe,spaces:{},convert:function(e,t,n){return this.enabled===!1||t===n||!t||!n||(this.spaces[t].transfer===`srgb`&&(e.r=Ut(e.r),e.g=Ut(e.g),e.b=Ut(e.b)),this.spaces[t].primaries!==this.spaces[n].primaries&&(e.applyMatrix3(this.spaces[t].toXYZ),e.applyMatrix3(this.spaces[n].fromXYZ)),this.spaces[n].transfer===`srgb`&&(e.r=Wt(e.r),e.g=Wt(e.g),e.b=Wt(e.b))),e},workingToColorSpace:function(e,t){return this.convert(e,this.workingColorSpace,t)},colorSpaceToWorking:function(e,t){return this.convert(e,t,this.workingColorSpace)},getPrimaries:function(e){return this.spaces[e].primaries},getTransfer:function(e){return e===``?Je:this.spaces[e].transfer},getToneMappingMode:function(e){return this.spaces[e].outputColorSpaceConfig.toneMappingMode||`standard`},getLuminanceCoefficients:function(e,t=this.workingColorSpace){return e.fromArray(this.spaces[t].luminanceCoefficients)},define:function(e){Object.assign(this.spaces,e)},_getMatrix:function(e,t,n){return e.copy(this.spaces[t].toXYZ).multiply(this.spaces[n].fromXYZ)},_getDrawingBufferColorSpace:function(e){return this.spaces[e].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(e=this.workingColorSpace){return this.spaces[e].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(t,n){return ot(`ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace().`),e.workingToColorSpace(t,n)},toWorkingColorSpace:function(t,n){return ot(`ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking().`),e.colorSpaceToWorking(t,n)}},t=[.64,.33,.3,.6,.15,.06],n=[.2126,.7152,.0722],r=[.3127,.329];return e.define({[qe]:{primaries:t,whitePoint:r,transfer:Je,toXYZ:zt,fromXYZ:Bt,luminanceCoefficients:n,workingColorSpaceConfig:{unpackColorSpace:Ke},outputColorSpaceConfig:{drawingBufferColorSpace:Ke}},[Ke]:{primaries:t,whitePoint:r,transfer:Ye,toXYZ:zt,fromXYZ:Bt,luminanceCoefficients:n,outputColorSpaceConfig:{drawingBufferColorSpace:Ke}}}),e}var Ht=Vt();function Ut(e){return e<.04045?e*.0773993808:(e*.9478672986+.0521327014)**2.4}function Wt(e){return e<.0031308?e*12.92:1.055*e**.41666-.055}var Gt,Kt=class{static getDataURL(e,t=`image/png`){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>`u`)return e.src;let n;if(e instanceof HTMLCanvasElement)n=e;else{Gt===void 0&&(Gt=tt(`canvas`)),Gt.width=e.width,Gt.height=e.height;let t=Gt.getContext(`2d`);e instanceof ImageData?t.putImageData(e,0,0):t.drawImage(e,0,0,e.width,e.height),n=Gt}return n.toDataURL(t)}static sRGBToLinear(e){if(typeof HTMLImageElement<`u`&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<`u`&&e instanceof HTMLCanvasElement||typeof ImageBitmap<`u`&&e instanceof ImageBitmap){let t=tt(`canvas`);t.width=e.width,t.height=e.height;let n=t.getContext(`2d`);n.drawImage(e,0,0,e.width,e.height);let r=n.getImageData(0,0,e.width,e.height),i=r.data;for(let e=0;e<i.length;e++)i[e]=Ut(i[e]/255)*255;return n.putImageData(r,0,0),t}if(e.data){let t=e.data.slice(0);for(let e=0;e<t.length;e++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[e]=Math.floor(Ut(t[e]/255)*255):t[e]=Ut(t[e]);return{data:t,width:e.width,height:e.height}}return z(`ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied.`),e}},qt=0,Jt=class{constructor(e=null){this.isTextureSource=!0,Object.defineProperty(this,"id",{value:qt++}),this.uuid=mt(),this.data=e,this.dataReady=!0,this.version=0}getSize(e){let t=this.data;return typeof HTMLVideoElement<`u`&&t instanceof HTMLVideoElement?e.set(t.videoWidth,t.videoHeight,0):typeof VideoFrame<`u`&&t instanceof VideoFrame?e.set(t.displayWidth,t.displayHeight,0):t===null?e.set(0,0,0):e.set(t.width,t.height,t.depth||0),e}set needsUpdate(e){e===!0&&this.version++}toJSON(e){let t=e===void 0||typeof e==`string`;if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];let n={uuid:this.uuid,url:``},r=this.data;if(r!==null){let e;if(Array.isArray(r)){e=[];for(let t=0,n=r.length;t<n;t++)r[t].isDataTexture?e.push(Yt(r[t].image)):e.push(Yt(r[t]))}else e=Yt(r);n.url=e}return t||(e.images[this.uuid]=n),n}};function Yt(e){return typeof HTMLImageElement<`u`&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<`u`&&e instanceof HTMLCanvasElement||typeof ImageBitmap<`u`&&e instanceof ImageBitmap?Kt.getDataURL(e):e.data?{data:Array.from(e.data),width:e.width,height:e.height,type:e.data.constructor.name}:(z(`Texture: Unable to serialize Texture.`),{})}var Xt=0,Zt=new W,Qt=class e extends lt{constructor(t=e.DEFAULT_IMAGE,n=e.DEFAULT_MAPPING,r=u,i=u,a=h,o=_,s=N,c=v,l=e.DEFAULT_ANISOTROPY,d=``){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:Xt++}),this.uuid=mt(),this.name=``,this.source=new Jt(t),this.mipmaps=[],this.mapping=n,this.channel=0,this.wrapS=r,this.wrapT=i,this.magFilter=a,this.minFilter=o,this.anisotropy=l,this.format=s,this.internalFormat=null,this.type=c,this.offset=new U(0,0),this.repeat=new U(1,1),this.center=new U(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new G,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=d,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(t&&t.depth&&t.depth>1),this.pmremVersion=0,this.normalized=!1}get width(){return this.source.getSize(Zt).x}get height(){return this.source.getSize(Zt).y}get depth(){return this.source.getSize(Zt).z}get image(){return this.source.data}set image(e){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.normalized=e.normalized,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.renderTarget=e.renderTarget,this.isRenderTargetTexture=e.isRenderTargetTexture,this.isArrayTexture=e.isArrayTexture,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}setValues(e){for(let t in e){let n=e[t];if(n===void 0){z(`Texture.setValues(): parameter '${t}' has value of undefined.`);continue}let r=this[t];r===void 0?z(`Texture.setValues(): property '${t}' does not exist.`):r&&n&&r.isVector2&&n.isVector2||r&&n&&r.isVector3&&n.isVector3||r&&n&&r.isMatrix3&&n.isMatrix3?r.copy(n):this[t]=n}}toJSON(e){let t=e===void 0||typeof e==`string`;if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];let n={metadata:{version:4.7,type:`Texture`,generator:`Texture.toJSON`},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,normalized:this.normalized,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),t||(e.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:`dispose`})}transformUv(e){if(this.mapping!==300)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case l:e.x-=Math.floor(e.x);break;case u:e.x=e.x<0?0:1;break;case d:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x-=Math.floor(e.x)}if(e.y<0||e.y>1)switch(this.wrapT){case l:e.y-=Math.floor(e.y);break;case u:e.y=e.y<0?0:1;break;case d:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y-=Math.floor(e.y)}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}};Qt.DEFAULT_IMAGE=null,Qt.DEFAULT_MAPPING=300,Qt.DEFAULT_ANISOTROPY=1,c=Symbol.iterator;var $t=class{constructor(e=0,t=0,n=0,r=1){this.x=e,this.y=t,this.z=n,this.w=r}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,n,r){return this.x=e,this.y=t,this.z=n,this.w=r,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw Error(`THREE.Vector4: index is out of range: `+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw Error(`THREE.Vector4: index is out of range: `+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w===void 0?1:e.w,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){let t=this.x,n=this.y,r=this.z,i=this.w,a=e.elements;return this.x=a[0]*t+a[4]*n+a[8]*r+a[12]*i,this.y=a[1]*t+a[5]*n+a[9]*r+a[13]*i,this.z=a[2]*t+a[6]*n+a[10]*r+a[14]*i,this.w=a[3]*t+a[7]*n+a[11]*r+a[15]*i,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);let t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,n,r,i,a=.01,o=.1,s=e.elements,c=s[0],l=s[4],u=s[8],d=s[1],f=s[5],p=s[9],m=s[2],h=s[6],g=s[10];if(Math.abs(l-d)<a&&Math.abs(u-m)<a&&Math.abs(p-h)<a){if(Math.abs(l+d)<o&&Math.abs(u+m)<o&&Math.abs(p+h)<o&&Math.abs(c+f+g-3)<o)return this.set(1,0,0,0),this;t=Math.PI;let e=(c+1)/2,s=(f+1)/2,_=(g+1)/2,v=(l+d)/4,y=(u+m)/4,b=(p+h)/4;return e>s&&e>_?e<a?(n=0,r=.707106781,i=.707106781):(n=Math.sqrt(e),r=v/n,i=y/n):s>_?s<a?(n=.707106781,r=0,i=.707106781):(r=Math.sqrt(s),n=v/r,i=b/r):_<a?(n=.707106781,r=.707106781,i=0):(i=Math.sqrt(_),n=y/i,r=b/i),this.set(n,r,i,t),this}let _=Math.sqrt((h-p)*(h-p)+(u-m)*(u-m)+(d-l)*(d-l));return Math.abs(_)<.001&&(_=1),this.x=(h-p)/_,this.y=(u-m)/_,this.z=(d-l)/_,this.w=Math.acos((c+f+g-1)/2),this}setFromMatrixPosition(e){let t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this.w=t[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=V(this.x,e.x,t.x),this.y=V(this.y,e.y,t.y),this.z=V(this.z,e.z,t.z),this.w=V(this.w,e.w,t.w),this}clampScalar(e,t){return this.x=V(this.x,e,t),this.y=V(this.y,e,t),this.z=V(this.z,e,t),this.w=V(this.w,e,t),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(V(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this.w=e.w+(t.w-e.w)*n,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[c](){yield this.x,yield this.y,yield this.z,yield this.w}};r=$t,r.prototype.isVector4=!0;var en=class extends lt{constructor(e=1,t=1,n={}){super(),n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:h,depthBuffer:!0,stencilBuffer:!1,resolveColorBuffer:!0,resolveDepthBuffer:!0,resolveStencilBuffer:!0,storeMultisampledColorBuffer:!0,storeMultisampledDepthBuffer:!0,storeMultisampledStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1,useArrayDepthTexture:!1},n),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=n.depth,this.scissor=new $t(0,0,e,t),this.scissorTest=!1,this.viewport=new $t(0,0,e,t),this.textures=[];let r=new Qt({width:e,height:t,depth:n.depth}),i=n.count;for(let e=0;e<i;e++)this.textures[e]=r.clone(),this.textures[e].isRenderTargetTexture=!0,this.textures[e].renderTarget=this;this._setTextureOptions(n),this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveColorBuffer=n.resolveColorBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this.storeMultisampledColorBuffer=n.storeMultisampledColorBuffer,this.storeMultisampledDepthBuffer=n.storeMultisampledDepthBuffer,this.storeMultisampledStencilBuffer=n.storeMultisampledStencilBuffer,this._depthTexture=null,this.depthTexture=n.depthTexture,this.samples=n.samples,this.multiview=n.multiview,this.useArrayDepthTexture=n.useArrayDepthTexture}_setTextureOptions(e={}){let t={minFilter:h,generateMipmaps:!1,flipY:!1,internalFormat:null};e.mapping!==void 0&&(t.mapping=e.mapping),e.wrapS!==void 0&&(t.wrapS=e.wrapS),e.wrapT!==void 0&&(t.wrapT=e.wrapT),e.wrapR!==void 0&&(t.wrapR=e.wrapR),e.magFilter!==void 0&&(t.magFilter=e.magFilter),e.minFilter!==void 0&&(t.minFilter=e.minFilter),e.format!==void 0&&(t.format=e.format),e.type!==void 0&&(t.type=e.type),e.anisotropy!==void 0&&(t.anisotropy=e.anisotropy),e.colorSpace!==void 0&&(t.colorSpace=e.colorSpace),e.flipY!==void 0&&(t.flipY=e.flipY),e.generateMipmaps!==void 0&&(t.generateMipmaps=e.generateMipmaps),e.internalFormat!==void 0&&(t.internalFormat=e.internalFormat);for(let e=0;e<this.textures.length;e++)this.textures[e].setValues(t)}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}set depthTexture(e){this._depthTexture!==null&&this._depthTexture.renderTarget===this&&(this._depthTexture.renderTarget=null),e!==null&&e.renderTarget===null&&(e.renderTarget=this),this._depthTexture=e}get depthTexture(){return this._depthTexture}setSize(e,t,n=1){if(this.width!==e||this.height!==t||this.depth!==n){this.width=e,this.height=t,this.depth=n;for(let r=0,i=this.textures.length;r<i;r++)this.textures[r].image.width=e,this.textures[r].image.height=t,this.textures[r].image.depth=n,this.textures[r].isData3DTexture!==!0&&(this.textures[r].isArrayTexture=this.textures[r].image.depth>1);this.dispose()}this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let t=0,n=e.textures.length;t<n;t++){this.textures[t]=e.textures[t].clone(),this.textures[t].isRenderTargetTexture=!0,this.textures[t].renderTarget=this;let n=Object.assign({},e.textures[t].image);this.textures[t].source=new Jt(n)}if(this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveColorBuffer=e.resolveColorBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,this.storeMultisampledColorBuffer=e.storeMultisampledColorBuffer,this.storeMultisampledDepthBuffer=e.storeMultisampledDepthBuffer,this.storeMultisampledStencilBuffer=e.storeMultisampledStencilBuffer,e.depthTexture!==null){if(e.depthTexture.renderTarget===e){let t=e.depthTexture.clone();t.renderTarget=null,this.depthTexture=t}else this.depthTexture=e.depthTexture}return this.samples=e.samples,this.multiview=e.multiview,this.useArrayDepthTexture=e.useArrayDepthTexture,this}dispose(){this.dispatchEvent({type:`dispose`})}},tn=class extends en{constructor(e=1,t=1,n={}){super(e,t,n),this.isWebGLRenderTarget=!0}},nn=class extends Qt{constructor(e=null,t=1,n=1,r=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:n,depth:r},this.magFilter=f,this.minFilter=f,this.wrapR=u,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}copy(e){return super.copy(e),this.wrapR=e.wrapR,this}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}},rn=class extends Qt{constructor(e=null,t=1,n=1,r=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:n,depth:r},this.magFilter=f,this.minFilter=f,this.wrapR=u,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}copy(e){return super.copy(e),this.wrapR=e.wrapR,this}},an=class e{constructor(e,t,n,r,i,a,o,s,c,l,u,d,f,p,m,h){this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,n,r,i,a,o,s,c,l,u,d,f,p,m,h)}set(e,t,n,r,i,a,o,s,c,l,u,d,f,p,m,h){let g=this.elements;return g[0]=e,g[4]=t,g[8]=n,g[12]=r,g[1]=i,g[5]=a,g[9]=o,g[13]=s,g[2]=c,g[6]=l,g[10]=u,g[14]=d,g[3]=f,g[7]=p,g[11]=m,g[15]=h,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new e().fromArray(this.elements)}copy(e){let t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],t[9]=n[9],t[10]=n[10],t[11]=n[11],t[12]=n[12],t[13]=n[13],t[14]=n[14],t[15]=n[15],this}copyPosition(e){let t=this.elements,n=e.elements;return t[12]=n[12],t[13]=n[13],t[14]=n[14],this}setFromMatrix3(e){let t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,n){return this.determinantAffine()===0?(e.set(1,0,0),t.set(0,1,0),n.set(0,0,1),this):(e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this)}makeBasis(e,t,n){return this.set(e.x,t.x,n.x,0,e.y,t.y,n.y,0,e.z,t.z,n.z,0,0,0,0,1),this}extractRotation(e){if(e.determinantAffine()===0)return this.identity();let t=this.elements,n=e.elements,r=1/on.setFromMatrixColumn(e,0).length(),i=1/on.setFromMatrixColumn(e,1).length(),a=1/on.setFromMatrixColumn(e,2).length();return t[0]=n[0]*r,t[1]=n[1]*r,t[2]=n[2]*r,t[3]=0,t[4]=n[4]*i,t[5]=n[5]*i,t[6]=n[6]*i,t[7]=0,t[8]=n[8]*a,t[9]=n[9]*a,t[10]=n[10]*a,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){let t=this.elements,n=e.x,r=e.y,i=e.z,a=Math.cos(n),o=Math.sin(n),s=Math.cos(r),c=Math.sin(r),l=Math.cos(i),u=Math.sin(i);if(e.order===`XYZ`){let e=a*l,n=a*u,r=o*l,i=o*u;t[0]=s*l,t[4]=-s*u,t[8]=c,t[1]=n+r*c,t[5]=e-i*c,t[9]=-o*s,t[2]=i-e*c,t[6]=r+n*c,t[10]=a*s}else if(e.order===`YXZ`){let e=s*l,n=s*u,r=c*l,i=c*u;t[0]=e+i*o,t[4]=r*o-n,t[8]=a*c,t[1]=a*u,t[5]=a*l,t[9]=-o,t[2]=n*o-r,t[6]=i+e*o,t[10]=a*s}else if(e.order===`ZXY`){let e=s*l,n=s*u,r=c*l,i=c*u;t[0]=e-i*o,t[4]=-a*u,t[8]=r+n*o,t[1]=n+r*o,t[5]=a*l,t[9]=i-e*o,t[2]=-a*c,t[6]=o,t[10]=a*s}else if(e.order===`ZYX`){let e=a*l,n=a*u,r=o*l,i=o*u;t[0]=s*l,t[4]=r*c-n,t[8]=e*c+i,t[1]=s*u,t[5]=i*c+e,t[9]=n*c-r,t[2]=-c,t[6]=o*s,t[10]=a*s}else if(e.order===`YZX`){let e=a*s,n=a*c,r=o*s,i=o*c;t[0]=s*l,t[4]=i-e*u,t[8]=r*u+n,t[1]=u,t[5]=a*l,t[9]=-o*l,t[2]=-c*l,t[6]=n*u+r,t[10]=e-i*u}else if(e.order===`XZY`){let e=a*s,n=a*c,r=o*s,i=o*c;t[0]=s*l,t[4]=-u,t[8]=c*l,t[1]=e*u+i,t[5]=a*l,t[9]=n*u-r,t[2]=r*u-n,t[6]=o*l,t[10]=i*u+e}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(cn,e,ln)}lookAt(e,t,n){let r=this.elements;return fn.subVectors(e,t),fn.lengthSq()===0&&(fn.z=1),fn.normalize(),un.crossVectors(n,fn),un.lengthSq()===0&&(Math.abs(n.z)===1?fn.x+=1e-4:fn.z+=1e-4,fn.normalize(),un.crossVectors(n,fn)),un.normalize(),dn.crossVectors(fn,un),r[0]=un.x,r[4]=dn.x,r[8]=fn.x,r[1]=un.y,r[5]=dn.y,r[9]=fn.y,r[2]=un.z,r[6]=dn.z,r[10]=fn.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){let n=e.elements,r=t.elements,i=this.elements,a=n[0],o=n[4],s=n[8],c=n[12],l=n[1],u=n[5],d=n[9],f=n[13],p=n[2],m=n[6],h=n[10],g=n[14],_=n[3],v=n[7],y=n[11],b=n[15],x=r[0],S=r[4],C=r[8],w=r[12],T=r[1],E=r[5],D=r[9],O=r[13],k=r[2],A=r[6],j=r[10],M=r[14],N=r[3],ee=r[7],P=r[11],te=r[15];return i[0]=a*x+o*T+s*k+c*N,i[4]=a*S+o*E+s*A+c*ee,i[8]=a*C+o*D+s*j+c*P,i[12]=a*w+o*O+s*M+c*te,i[1]=l*x+u*T+d*k+f*N,i[5]=l*S+u*E+d*A+f*ee,i[9]=l*C+u*D+d*j+f*P,i[13]=l*w+u*O+d*M+f*te,i[2]=p*x+m*T+h*k+g*N,i[6]=p*S+m*E+h*A+g*ee,i[10]=p*C+m*D+h*j+g*P,i[14]=p*w+m*O+h*M+g*te,i[3]=_*x+v*T+y*k+b*N,i[7]=_*S+v*E+y*A+b*ee,i[11]=_*C+v*D+y*j+b*P,i[15]=_*w+v*O+y*M+b*te,this}multiplyScalar(e){let t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){let e=this.elements,t=e[0],n=e[4],r=e[8],i=e[12],a=e[1],o=e[5],s=e[9],c=e[13],l=e[2],u=e[6],d=e[10],f=e[14],p=e[3],m=e[7],h=e[11],g=e[15],_=s*f-c*d,v=o*f-c*u,y=o*d-s*u,b=a*f-c*l,x=a*d-s*l,S=a*u-o*l;return t*(m*_-h*v+g*y)-n*(p*_-h*b+g*x)+r*(p*v-m*b+g*S)-i*(p*y-m*x+h*S)}determinantAffine(){let e=this.elements,t=e[0],n=e[4],r=e[8],i=e[1],a=e[5],o=e[9],s=e[2],c=e[6],l=e[10];return t*(a*l-o*c)-n*(i*l-o*s)+r*(i*c-a*s)}transpose(){let e=this.elements,t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,n){let r=this.elements;return e.isVector3?(r[12]=e.x,r[13]=e.y,r[14]=e.z):(r[12]=e,r[13]=t,r[14]=n),this}invert(){let e=this.elements,t=e[0],n=e[1],r=e[2],i=e[3],a=e[4],o=e[5],s=e[6],c=e[7],l=e[8],u=e[9],d=e[10],f=e[11],p=e[12],m=e[13],h=e[14],g=e[15],_=t*o-n*a,v=t*s-r*a,y=t*c-i*a,b=n*s-r*o,x=n*c-i*o,S=r*c-i*s,C=l*m-u*p,w=l*h-d*p,T=l*g-f*p,E=u*h-d*m,D=u*g-f*m,O=d*g-f*h,k=_*O-v*D+y*E+b*T-x*w+S*C;if(k===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);let A=1/k;return e[0]=(o*O-s*D+c*E)*A,e[1]=(r*D-n*O-i*E)*A,e[2]=(m*S-h*x+g*b)*A,e[3]=(d*x-u*S-f*b)*A,e[4]=(s*T-a*O-c*w)*A,e[5]=(t*O-r*T+i*w)*A,e[6]=(h*y-p*S-g*v)*A,e[7]=(l*S-d*y+f*v)*A,e[8]=(a*D-o*T+c*C)*A,e[9]=(n*T-t*D-i*C)*A,e[10]=(p*x-m*y+g*_)*A,e[11]=(u*y-l*x-f*_)*A,e[12]=(o*w-a*E-s*C)*A,e[13]=(t*E-n*w+r*C)*A,e[14]=(m*v-p*b-h*_)*A,e[15]=(l*b-u*v+d*_)*A,this}scale(e){let t=this.elements,n=e.x,r=e.y,i=e.z;return t[0]*=n,t[4]*=r,t[8]*=i,t[1]*=n,t[5]*=r,t[9]*=i,t[2]*=n,t[6]*=r,t[10]*=i,t[3]*=n,t[7]*=r,t[11]*=i,this}getMaxScaleOnAxis(){let e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],n=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],r=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,n,r))}makeTranslation(e,t,n){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,n,0,0,0,1),this}makeRotationX(e){let t=Math.cos(e),n=Math.sin(e);return this.set(1,0,0,0,0,t,-n,0,0,n,t,0,0,0,0,1),this}makeRotationY(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,0,n,0,0,1,0,0,-n,0,t,0,0,0,0,1),this}makeRotationZ(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,0,n,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){let n=Math.cos(t),r=Math.sin(t),i=1-n,a=e.x,o=e.y,s=e.z,c=i*a,l=i*o;return this.set(c*a+n,c*o-r*s,c*s+r*o,0,c*o+r*s,l*o+n,l*s-r*a,0,c*s-r*o,l*s+r*a,i*s*s+n,0,0,0,0,1),this}makeScale(e,t,n){return this.set(e,0,0,0,0,t,0,0,0,0,n,0,0,0,0,1),this}makeShear(e,t,n,r,i,a){return this.set(1,n,i,0,e,1,a,0,t,r,1,0,0,0,0,1),this}compose(e,t,n){let r=this.elements,i=t._x,a=t._y,o=t._z,s=t._w,c=i+i,l=a+a,u=o+o,d=i*c,f=i*l,p=i*u,m=a*l,h=a*u,g=o*u,_=s*c,v=s*l,y=s*u,b=n.x,x=n.y,S=n.z;return r[0]=(1-(m+g))*b,r[1]=(f+y)*b,r[2]=(p-v)*b,r[3]=0,r[4]=(f-y)*x,r[5]=(1-(d+g))*x,r[6]=(h+_)*x,r[7]=0,r[8]=(p+v)*S,r[9]=(h-_)*S,r[10]=(1-(d+m))*S,r[11]=0,r[12]=e.x,r[13]=e.y,r[14]=e.z,r[15]=1,this}decompose(e,t,n){let r=this.elements;e.x=r[12],e.y=r[13],e.z=r[14];let i=this.determinantAffine();if(i===0)return n.set(1,1,1),t.identity(),this;let a=on.set(r[0],r[1],r[2]).length(),o=on.set(r[4],r[5],r[6]).length(),s=on.set(r[8],r[9],r[10]).length();i<0&&(a=-a),sn.copy(this);let c=1/a,l=1/o,u=1/s;return sn.elements[0]*=c,sn.elements[1]*=c,sn.elements[2]*=c,sn.elements[4]*=l,sn.elements[5]*=l,sn.elements[6]*=l,sn.elements[8]*=u,sn.elements[9]*=u,sn.elements[10]*=u,t.setFromRotationMatrix(sn),n.x=a,n.y=o,n.z=s,this}makePerspective(e,t,n,r,i,a,o=Qe,s=!1){let c=this.elements,l=2*i/(t-e),u=2*i/(n-r),d=(t+e)/(t-e),f=(n+r)/(n-r),p,m;if(s)p=i/(a-i),m=a*i/(a-i);else if(o===2e3)p=-(a+i)/(a-i),m=-2*a*i/(a-i);else if(o===2001)p=-a/(a-i),m=-a*i/(a-i);else throw Error(`THREE.Matrix4.makePerspective(): Invalid coordinate system: `+o);return c[0]=l,c[4]=0,c[8]=d,c[12]=0,c[1]=0,c[5]=u,c[9]=f,c[13]=0,c[2]=0,c[6]=0,c[10]=p,c[14]=m,c[3]=0,c[7]=0,c[11]=-1,c[15]=0,this}makeOrthographic(e,t,n,r,i,a,o=Qe,s=!1){let c=this.elements,l=2/(t-e),u=2/(n-r),d=-(t+e)/(t-e),f=-(n+r)/(n-r),p,m;if(s)p=1/(a-i),m=a/(a-i);else if(o===2e3)p=-2/(a-i),m=-(a+i)/(a-i);else if(o===2001)p=-1/(a-i),m=-i/(a-i);else throw Error(`THREE.Matrix4.makeOrthographic(): Invalid coordinate system: `+o);return c[0]=l,c[4]=0,c[8]=0,c[12]=d,c[1]=0,c[5]=u,c[9]=0,c[13]=f,c[2]=0,c[6]=0,c[10]=p,c[14]=m,c[3]=0,c[7]=0,c[11]=0,c[15]=1,this}equals(e){let t=this.elements,n=e.elements;for(let e=0;e<16;e++)if(t[e]!==n[e])return!1;return!0}fromArray(e,t=0){for(let n=0;n<16;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){let n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e[t+9]=n[9],e[t+10]=n[10],e[t+11]=n[11],e[t+12]=n[12],e[t+13]=n[13],e[t+14]=n[14],e[t+15]=n[15],e}};i=an,i.prototype.isMatrix4=!0;var on=new W,sn=new an,cn=new W(0,0,0),ln=new W(1,1,1),un=new W,dn=new W,fn=new W,pn=new an,mn=new Ft,hn=class e{constructor(t=0,n=0,r=0,i=e.DEFAULT_ORDER){this.isEuler=!0,this._x=t,this._y=n,this._z=r,this._order=i}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,n,r=this._order){return this._x=e,this._y=t,this._z=n,this._order=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,n=!0){let r=e.elements,i=r[0],a=r[4],o=r[8],s=r[1],c=r[5],l=r[9],u=r[2],d=r[6],f=r[10];switch(t){case`XYZ`:this._y=Math.asin(V(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-l,f),this._z=Math.atan2(-a,i)):(this._x=Math.atan2(d,c),this._z=0);break;case`YXZ`:this._x=Math.asin(-V(l,-1,1)),Math.abs(l)<.9999999?(this._y=Math.atan2(o,f),this._z=Math.atan2(s,c)):(this._y=Math.atan2(-u,i),this._z=0);break;case`ZXY`:this._x=Math.asin(V(d,-1,1)),Math.abs(d)<.9999999?(this._y=Math.atan2(-u,f),this._z=Math.atan2(-a,c)):(this._y=0,this._z=Math.atan2(s,i));break;case`ZYX`:this._y=Math.asin(-V(u,-1,1)),Math.abs(u)<.9999999?(this._x=Math.atan2(d,f),this._z=Math.atan2(s,i)):(this._x=0,this._z=Math.atan2(-a,c));break;case`YZX`:this._z=Math.asin(V(s,-1,1)),Math.abs(s)<.9999999?(this._x=Math.atan2(-l,c),this._y=Math.atan2(-u,i)):(this._x=0,this._y=Math.atan2(o,f));break;case`XZY`:this._z=Math.asin(-V(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(d,c),this._y=Math.atan2(o,i)):(this._x=Math.atan2(-l,f),this._y=0);break;default:z(`Euler: .setFromRotationMatrix() encountered an unknown order: `+t)}return this._order=t,n===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,n){return pn.makeRotationFromQuaternion(e),this.setFromRotationMatrix(pn,t,n)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return mn.setFromEuler(this),this.setFromQuaternion(mn,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}};hn.DEFAULT_ORDER=`XYZ`;var gn=class{constructor(){this.mask=1}set(e){this.mask=1<<e>>>0}enable(e){this.mask|=1<<e}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e}disable(e){this.mask&=~(1<<e)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return!!(this.mask&1<<e)}},_n=0,vn=new W,yn=new Ft,bn=new an,xn=new W,Sn=new W,Cn=new W,wn=new Ft,Tn=new W(1,0,0),En=new W(0,1,0),Dn=new W(0,0,1),On={type:`added`},kn={type:`removed`},An={type:`childadded`,child:null},jn={type:`childremoved`,child:null},Mn=class e extends lt{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:_n++}),this.uuid=mt(),this.name=``,this.type=`Object3D`,this.parent=null,this.children=[],this.up=e.DEFAULT_UP.clone();let t=new W,n=new hn,r=new Ft,i=new W(1,1,1);function a(){r.setFromEuler(n,!1)}function o(){n.setFromQuaternion(r,void 0,!1)}n._onChange(a),r._onChange(o),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:t},rotation:{configurable:!0,enumerable:!0,value:n},quaternion:{configurable:!0,enumerable:!0,value:r},scale:{configurable:!0,enumerable:!0,value:i},modelViewMatrix:{value:new an},normalMatrix:{value:new G}}),this.matrix=new an,this.matrixWorld=new an,this.matrixAutoUpdate=e.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=e.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new gn,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.static=!1,this.userData={},this.pivot=null}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return yn.setFromAxisAngle(e,t),this.quaternion.multiply(yn),this}rotateOnWorldAxis(e,t){return yn.setFromAxisAngle(e,t),this.quaternion.premultiply(yn),this}rotateX(e){return this.rotateOnAxis(Tn,e)}rotateY(e){return this.rotateOnAxis(En,e)}rotateZ(e){return this.rotateOnAxis(Dn,e)}translateOnAxis(e,t){return vn.copy(e).applyQuaternion(this.quaternion),this.position.add(vn.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(Tn,e)}translateY(e){return this.translateOnAxis(En,e)}translateZ(e){return this.translateOnAxis(Dn,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(bn.copy(this.matrixWorld).invert())}lookAt(e,t,n){e.isVector3?xn.copy(e):xn.set(e,t,n);let r=this.parent;this.updateWorldMatrix(!0,!1),Sn.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?bn.lookAt(Sn,xn,this.up):bn.lookAt(xn,Sn,this.up),this.quaternion.setFromRotationMatrix(bn),r&&(bn.extractRotation(r.matrixWorld),yn.setFromRotationMatrix(bn),this.quaternion.premultiply(yn.invert()))}add(e){if(arguments.length>1){for(let e=0;e<arguments.length;e++)this.add(arguments[e]);return this}return e===this?(B(`Object3D.add: object can't be added as a child of itself.`,e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(On),An.child=e,this.dispatchEvent(An),An.child=null):B(`Object3D.add: object not an instance of THREE.Object3D.`,e),this)}remove(e){if(arguments.length>1){for(let e=0;e<arguments.length;e++)this.remove(arguments[e]);return this}let t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(kn),jn.child=e,this.dispatchEvent(jn),jn.child=null),this}removeFromParent(){let e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),bn.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),bn.multiply(e.parent.matrixWorld)),e.applyMatrix4(bn),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(On),An.child=e,this.dispatchEvent(An),An.child=null,this}getObjectById(e){return this.getObjectByProperty(`id`,e)}getObjectByName(e){return this.getObjectByProperty(`name`,e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let n=0,r=this.children.length;n<r;n++){let r=this.children[n].getObjectByProperty(e,t);if(r!==void 0)return r}}getObjectsByProperty(e,t,n=[]){this[e]===t&&n.push(this);let r=this.children;for(let i=0,a=r.length;i<a;i++)r[i].getObjectsByProperty(e,t,n);return n}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Sn,e,Cn),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Sn,wn,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);let t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}intersectsFrustum(){}traverse(e){e(this);let t=this.children;for(let n=0,r=t.length;n<r;n++)t[n].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);let t=this.children;for(let n=0,r=t.length;n<r;n++)t[n].traverseVisible(e)}traverseAncestors(e){let t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale);let e=this.pivot;if(e!==null){let t=e.x,n=e.y,r=e.z,i=this.matrix.elements;i[12]+=t-i[0]*t-i[4]*n-i[8]*r,i[13]+=n-i[1]*t-i[5]*n-i[9]*r,i[14]+=r-i[2]*t-i[6]*n-i[10]*r}this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);let t=this.children;for(let n=0,r=t.length;n<r;n++)t[n].updateMatrixWorld(e)}updateWorldMatrix(e,t,n=!1){let r=this.parent;if(e===!0&&r!==null&&r.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||n)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,n=!0),t===!0){let e=this.children;for(let t=0,r=e.length;t<r;t++)e[t].updateWorldMatrix(!1,!0,n)}}toJSON(e){let t=e===void 0||typeof e==`string`,n={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.7,type:`Object`,generator:`Object3D.toJSON`});let r={};r.uuid=this.uuid,r.type=this.type,r.name=this.name,r.castShadow=this.castShadow,r.receiveShadow=this.receiveShadow,r.visible=this.visible,r.frustumCulled=this.frustumCulled,r.renderOrder=this.renderOrder,r.static=this.static,r.matrixAutoUpdate=this.matrixAutoUpdate,Object.keys(this.userData).length>0&&(r.userData=this.userData),r.layers=this.layers.mask,r.matrix=this.matrix.toArray(),r.up=this.up.toArray(),this.pivot!==null&&(r.pivot=this.pivot.toArray()),this.morphTargetDictionary!==void 0&&(r.morphTargetDictionary=Object.assign({},this.morphTargetDictionary)),this.morphTargetInfluences!==void 0&&(r.morphTargetInfluences=this.morphTargetInfluences.slice()),this.isInstancedMesh&&(r.type=`InstancedMesh`,r.count=this.count,r.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(r.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(r.type=`BatchedMesh`,r.perObjectFrustumCulled=this.perObjectFrustumCulled,r.sortObjects=this.sortObjects,r.drawRanges=this._drawRanges,r.reservedRanges=this._reservedRanges,r.geometryInfo=this._geometryInfo.map(e=>({...e,boundingBox:e.boundingBox?e.boundingBox.toJSON():void 0,boundingSphere:e.boundingSphere?e.boundingSphere.toJSON():void 0})),r.instanceInfo=this._instanceInfo.map(e=>({...e})),r.availableInstanceIds=this._availableInstanceIds.slice(),r.availableGeometryIds=this._availableGeometryIds.slice(),r.nextIndexStart=this._nextIndexStart,r.nextVertexStart=this._nextVertexStart,r.geometryCount=this._geometryCount,r.maxInstanceCount=this._maxInstanceCount,r.maxVertexCount=this._maxVertexCount,r.maxIndexCount=this._maxIndexCount,r.geometryInitialized=this._geometryInitialized,r.matricesTexture=this._matricesTexture.toJSON(e),r.indirectTexture=this._indirectTexture.toJSON(e),this._colorsTexture!==null&&(r.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(r.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(r.boundingBox=this.boundingBox.toJSON()));function i(t,n){return t[n.uuid]===void 0&&(t[n.uuid]=n.toJSON(e)),n.uuid}if(this.isScene)this.background&&(this.background.isColor?r.background=this.background.toJSON():this.background.isTexture&&(r.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(r.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){r.geometry=i(e.geometries,this.geometry);let t=this.geometry.parameters;if(t!==void 0&&t.shapes!==void 0){let n=t.shapes;if(Array.isArray(n))for(let t=0,r=n.length;t<r;t++){let r=n[t];i(e.shapes,r)}else i(e.shapes,n)}}if(this.isSkinnedMesh&&(r.bindMode=this.bindMode,r.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(i(e.skeletons,this.skeleton),r.skeleton=this.skeleton.uuid)),this.material!==void 0){if(Array.isArray(this.material)){let t=[];for(let n=0,r=this.material.length;n<r;n++)t.push(i(e.materials,this.material[n]));r.material=t}else r.material=i(e.materials,this.material)}if(this.children.length>0){r.children=[];for(let t=0;t<this.children.length;t++)r.children.push(this.children[t].toJSON(e).object)}if(this.animations.length>0){r.animations=[];for(let t=0;t<this.animations.length;t++){let n=this.animations[t];r.animations.push(i(e.animations,n))}}if(t){let t=a(e.geometries),r=a(e.materials),i=a(e.textures),o=a(e.images),s=a(e.shapes),c=a(e.skeletons),l=a(e.animations),u=a(e.nodes);t.length>0&&(n.geometries=t),r.length>0&&(n.materials=r),i.length>0&&(n.textures=i),o.length>0&&(n.images=o),s.length>0&&(n.shapes=s),c.length>0&&(n.skeletons=c),l.length>0&&(n.animations=l),u.length>0&&(n.nodes=u)}return n.object=r,n;function a(e){let t=[];for(let n in e){let r=e[n];delete r.metadata,t.push(r)}return t}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.pivot=e.pivot===null?null:e.pivot.clone(),this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.static=e.static,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let t=0;t<e.children.length;t++){let n=e.children[t];this.add(n.clone())}return this}dispose(){this.dispatchEvent({type:`dispose`})}};Mn.DEFAULT_UP=new W(0,1,0),Mn.DEFAULT_MATRIX_AUTO_UPDATE=!0,Mn.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;var K=class extends Mn{constructor(){super(),this.isGroup=!0,this.type=`Group`}},Nn={type:`move`},Pn=class{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new K,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new K,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new W,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new W),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new K,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new W,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new W,this._grip.eventsEnabled=!1),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){let t=this._hand;if(t)for(let n of e.hand.values())this._getHandJoint(t,n)}return this.dispatchEvent({type:`connected`,data:e}),this}disconnect(e){return this.dispatchEvent({type:`disconnected`,data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,n){let r=null,i=null,a=null,o=this._targetRay,s=this._grip,c=this._hand;if(e&&t.session.visibilityState!==`visible-blurred`){if(c&&e.hand){a=!0;for(let r of e.hand.values()){let e=t.getJointPose(r,n),i=this._getHandJoint(c,r);e!==null&&(i.matrix.fromArray(e.transform.matrix),i.matrix.decompose(i.position,i.rotation,i.scale),i.matrixWorldNeedsUpdate=!0,i.jointRadius=e.radius),i.visible=e!==null}let r=c.joints[`index-finger-tip`],i=c.joints[`thumb-tip`],o=r.position.distanceTo(i.position);c.inputState.pinching&&o>.025?(c.inputState.pinching=!1,this.dispatchEvent({type:`pinchend`,handedness:e.handedness,target:this})):!c.inputState.pinching&&o<=.015&&(c.inputState.pinching=!0,this.dispatchEvent({type:`pinchstart`,handedness:e.handedness,target:this}))}else s!==null&&e.gripSpace&&(i=t.getPose(e.gripSpace,n),i!==null&&(s.matrix.fromArray(i.transform.matrix),s.matrix.decompose(s.position,s.rotation,s.scale),s.matrixWorldNeedsUpdate=!0,i.linearVelocity?(s.hasLinearVelocity=!0,s.linearVelocity.copy(i.linearVelocity)):s.hasLinearVelocity=!1,i.angularVelocity?(s.hasAngularVelocity=!0,s.angularVelocity.copy(i.angularVelocity)):s.hasAngularVelocity=!1,s.eventsEnabled&&s.dispatchEvent({type:`gripUpdated`,data:e,target:this})));o!==null&&(r=t.getPose(e.targetRaySpace,n),r===null&&i!==null&&(r=i),r!==null&&(o.matrix.fromArray(r.transform.matrix),o.matrix.decompose(o.position,o.rotation,o.scale),o.matrixWorldNeedsUpdate=!0,r.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(r.linearVelocity)):o.hasLinearVelocity=!1,r.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(r.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(Nn)))}return o!==null&&(o.visible=r!==null),s!==null&&(s.visible=i!==null),c!==null&&(c.visible=a!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){let n=new K;n.matrixAutoUpdate=!1,n.visible=!1,e.joints[t.jointName]=n,e.add(n)}return e.joints[t.jointName]}},Fn={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},In={h:0,s:0,l:0},Ln={h:0,s:0,l:0};function Rn(e,t,n){return n<0&&(n+=1),n>1&&--n,n<1/6?e+(t-e)*6*n:n<1/2?t:n<2/3?e+(t-e)*6*(2/3-n):e}var q=class{constructor(e,t,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,n)}set(e,t,n){if(t===void 0&&n===void 0){let t=e;t&&t.isColor?this.copy(t):typeof t==`number`?this.setHex(t):typeof t==`string`&&this.setStyle(t)}else this.setRGB(e,t,n);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=Ke){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,Ht.colorSpaceToWorking(this,t),this}setRGB(e,t,n,r=Ht.workingColorSpace){return this.r=e,this.g=t,this.b=n,Ht.colorSpaceToWorking(this,r),this}setHSL(e,t,n,r=Ht.workingColorSpace){if(e=ht(e,1),t=V(t,0,1),n=V(n,0,1),t===0)this.r=this.g=this.b=n;else{let r=n<=.5?n*(1+t):n+t-n*t,i=2*n-r;this.r=Rn(i,r,e+1/3),this.g=Rn(i,r,e),this.b=Rn(i,r,e-1/3)}return Ht.colorSpaceToWorking(this,r),this}setStyle(e,t=Ke){function n(t){t!==void 0&&parseFloat(t)<1&&z(`Color: Alpha component of `+e+` will be ignored.`)}let r;if(r=/^(\w+)\(([^\)]*)\)/.exec(e)){let i,a=r[1],o=r[2];switch(a){case`rgb`:case`rgba`:if(i=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(i[4]),this.setRGB(Math.min(255,parseInt(i[1],10))/255,Math.min(255,parseInt(i[2],10))/255,Math.min(255,parseInt(i[3],10))/255,t);if(i=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(i[4]),this.setRGB(Math.min(100,parseInt(i[1],10))/100,Math.min(100,parseInt(i[2],10))/100,Math.min(100,parseInt(i[3],10))/100,t);break;case`hsl`:case`hsla`:if(i=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(i[4]),this.setHSL(parseFloat(i[1])/360,parseFloat(i[2])/100,parseFloat(i[3])/100,t);break;default:z(`Color: Unknown color model `+e)}}else if(r=/^\#([A-Fa-f\d]+)$/.exec(e)){let n=r[1],i=n.length;if(i===3)return this.setRGB(parseInt(n.charAt(0),16)/15,parseInt(n.charAt(1),16)/15,parseInt(n.charAt(2),16)/15,t);if(i===6)return this.setHex(parseInt(n,16),t);z(`Color: Invalid hex color `+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=Ke){let n=Fn[e.toLowerCase()];return n===void 0?z(`Color: Unknown color `+e):this.setHex(n,t),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=Ut(e.r),this.g=Ut(e.g),this.b=Ut(e.b),this}copyLinearToSRGB(e){return this.r=Wt(e.r),this.g=Wt(e.g),this.b=Wt(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=Ke){return Ht.workingToColorSpace(zn.copy(this),e),Math.round(V(zn.r*255,0,255))*65536+Math.round(V(zn.g*255,0,255))*256+Math.round(V(zn.b*255,0,255))}getHexString(e=Ke){return(`000000`+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=Ht.workingColorSpace){Ht.workingToColorSpace(zn.copy(this),t);let n=zn.r,r=zn.g,i=zn.b,a=Math.max(n,r,i),o=Math.min(n,r,i),s,c,l=(o+a)/2;if(o===a)s=0,c=0;else{let e=a-o;switch(c=l<=.5?e/(a+o):e/(2-a-o),a){case n:s=(r-i)/e+(r<i?6:0);break;case r:s=(i-n)/e+2;break;case i:s=(n-r)/e+4}s/=6}return e.h=s,e.s=c,e.l=l,e}getRGB(e,t=Ht.workingColorSpace){return Ht.workingToColorSpace(zn.copy(this),t),e.r=zn.r,e.g=zn.g,e.b=zn.b,e}getStyle(e=Ke){Ht.workingToColorSpace(zn.copy(this),e);let t=zn.r,n=zn.g,r=zn.b;return e===`srgb`?`rgb(${Math.round(t*255)},${Math.round(n*255)},${Math.round(r*255)})`:`color(${e} ${t.toFixed(3)} ${n.toFixed(3)} ${r.toFixed(3)})`}offsetHSL(e,t,n){return this.getHSL(In),this.setHSL(In.h+e,In.s+t,In.l+n)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,n){return this.r=e.r+(t.r-e.r)*n,this.g=e.g+(t.g-e.g)*n,this.b=e.b+(t.b-e.b)*n,this}lerpHSL(e,t){this.getHSL(In),e.getHSL(Ln);let n=vt(In.h,Ln.h,t),r=vt(In.s,Ln.s,t),i=vt(In.l,Ln.l,t);return this.setHSL(n,r,i),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){let t=this.r,n=this.g,r=this.b,i=e.elements;return this.r=i[0]*t+i[3]*n+i[6]*r,this.g=i[1]*t+i[4]*n+i[7]*r,this.b=i[2]*t+i[5]*n+i[8]*r,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}},zn=new q;q.NAMES=Fn;var Bn=class e{constructor(e,t=25e-5){this.isFogExp2=!0,this.name=``,this.color=new q(e),this.density=t}clone(){return new e(this.color,this.density)}toJSON(){return{type:`FogExp2`,name:this.name,color:this.color.getHex(),density:this.density}}},Vn=class extends Mn{constructor(){super(),this.isScene=!0,this.type=`Scene`,this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new hn,this.environmentIntensity=1,this.environmentRotation=new hn,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<`u`&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent(`observe`,{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){let t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),t.object.backgroundBlurriness=this.backgroundBlurriness,t.object.backgroundIntensity=this.backgroundIntensity,t.object.backgroundRotation=this.backgroundRotation.toArray(),t.object.environmentIntensity=this.environmentIntensity,t.object.environmentRotation=this.environmentRotation.toArray(),t}},Hn=new W,Un=new W,Wn=new W,Gn=new W,Kn=new W,qn=new W,Jn=new W,Yn=new W,Xn=new W,Zn=new W,Qn=new $t,$n=new $t,er=new $t,tr=class e{constructor(e=new W,t=new W,n=new W){this.a=e,this.b=t,this.c=n}static getNormal(e,t,n,r){r.subVectors(n,t),Hn.subVectors(e,t),r.cross(Hn);let i=r.lengthSq();return i>0?r.multiplyScalar(1/Math.sqrt(i)):r.set(0,0,0)}static getBarycoord(e,t,n,r,i){Hn.subVectors(r,t),Un.subVectors(n,t),Wn.subVectors(e,t);let a=Hn.dot(Hn),o=Hn.dot(Un),s=Hn.dot(Wn),c=Un.dot(Un),l=Un.dot(Wn),u=a*c-o*o;if(u===0)return i.set(0,0,0),null;let d=1/u,f=(c*s-o*l)*d,p=(a*l-o*s)*d;return i.set(1-f-p,p,f)}static containsPoint(e,t,n,r){return this.getBarycoord(e,t,n,r,Gn)!==null&&Gn.x>=0&&Gn.y>=0&&Gn.x+Gn.y<=1}static getInterpolation(e,t,n,r,i,a,o,s){return this.getBarycoord(e,t,n,r,Gn)===null?(s.x=0,s.y=0,`z`in s&&(s.z=0),`w`in s&&(s.w=0),null):(s.setScalar(0),s.addScaledVector(i,Gn.x),s.addScaledVector(a,Gn.y),s.addScaledVector(o,Gn.z),s)}static getInterpolatedAttribute(e,t,n,r,i,a){return Qn.setScalar(0),$n.setScalar(0),er.setScalar(0),Qn.fromBufferAttribute(e,t),$n.fromBufferAttribute(e,n),er.fromBufferAttribute(e,r),a.setScalar(0),a.addScaledVector(Qn,i.x),a.addScaledVector($n,i.y),a.addScaledVector(er,i.z),a}static isFrontFacing(e,t,n,r){return Hn.subVectors(n,t),Un.subVectors(e,t),Hn.cross(Un).dot(r)<0}set(e,t,n){return this.a.copy(e),this.b.copy(t),this.c.copy(n),this}setFromPointsAndIndices(e,t,n,r){return this.a.copy(e[t]),this.b.copy(e[n]),this.c.copy(e[r]),this}setFromAttributeAndIndices(e,t,n,r){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,n),this.c.fromBufferAttribute(e,r),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return Hn.subVectors(this.c,this.b),Un.subVectors(this.a,this.b),Hn.cross(Un).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(t){return e.getNormal(this.a,this.b,this.c,t)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(t,n){return e.getBarycoord(t,this.a,this.b,this.c,n)}getInterpolation(t,n,r,i,a){return e.getInterpolation(t,this.a,this.b,this.c,n,r,i,a)}containsPoint(t){return e.containsPoint(t,this.a,this.b,this.c)}isFrontFacing(t){return e.isFrontFacing(this.a,this.b,this.c,t)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){let n=this.a,r=this.b,i=this.c,a,o;Kn.subVectors(r,n),qn.subVectors(i,n),Yn.subVectors(e,n);let s=Kn.dot(Yn),c=qn.dot(Yn);if(s<=0&&c<=0)return t.copy(n);Xn.subVectors(e,r);let l=Kn.dot(Xn),u=qn.dot(Xn);if(l>=0&&u<=l)return t.copy(r);let d=s*u-l*c;if(d<=0&&s>=0&&l<=0)return a=s/(s-l),t.copy(n).addScaledVector(Kn,a);Zn.subVectors(e,i);let f=Kn.dot(Zn),p=qn.dot(Zn);if(p>=0&&f<=p)return t.copy(i);let m=f*c-s*p;if(m<=0&&c>=0&&p<=0)return o=c/(c-p),t.copy(n).addScaledVector(qn,o);let h=l*p-f*u;if(h<=0&&u-l>=0&&f-p>=0)return Jn.subVectors(i,r),o=(u-l)/(u-l+(f-p)),t.copy(r).addScaledVector(Jn,o);let g=1/(h+m+d);return a=m*g,o=d*g,t.copy(n).addScaledVector(Kn,a).addScaledVector(qn,o)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}},nr=class{constructor(e=new W(1/0,1/0,1/0),t=new W(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t+=3)this.expandByPoint(ir.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,n=e.count;t<n;t++)this.expandByPoint(ir.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){let n=ir.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(n),this.max.copy(e).add(n),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);let n=e.geometry;if(n!==void 0){let r=n.getAttribute(`position`);if(t===!0&&r!==void 0&&e.isInstancedMesh!==!0)for(let t=0,n=r.count;t<n;t++)e.isMesh===!0?e.getVertexPosition(t,ir):ir.fromBufferAttribute(r,t),ir.applyMatrix4(e.matrixWorld),this.expandByPoint(ir);else e.boundingBox===void 0?(n.boundingBox===null&&n.computeBoundingBox(),ar.copy(n.boundingBox)):(e.boundingBox===null&&e.computeBoundingBox(),ar.copy(e.boundingBox)),ar.applyMatrix4(e.matrixWorld),this.union(ar)}let r=e.children;for(let e=0,n=r.length;e<n;e++)this.expandByObject(r[e],t);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,ir),ir.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,n;return e.normal.x>0?(t=e.normal.x*this.min.x,n=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,n=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,n+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,n+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,n+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,n+=e.normal.z*this.min.z),t<=-e.constant&&n>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(fr),pr.subVectors(this.max,fr),or.subVectors(e.a,fr),sr.subVectors(e.b,fr),cr.subVectors(e.c,fr),lr.subVectors(sr,or),ur.subVectors(cr,sr),dr.subVectors(or,cr);let t=[0,-lr.z,lr.y,0,-ur.z,ur.y,0,-dr.z,dr.y,lr.z,0,-lr.x,ur.z,0,-ur.x,dr.z,0,-dr.x,-lr.y,lr.x,0,-ur.y,ur.x,0,-dr.y,dr.x,0];return!gr(t,or,sr,cr,pr)||(t=[1,0,0,0,1,0,0,0,1],!gr(t,or,sr,cr,pr))?!1:(mr.crossVectors(lr,ur),t=[mr.x,mr.y,mr.z],gr(t,or,sr,cr,pr))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,ir).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(ir).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()||(rr[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),rr[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),rr[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),rr[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),rr[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),rr[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),rr[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),rr[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(rr)),this}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(e){return this.min.fromArray(e.min),this.max.fromArray(e.max),this}},rr=[new W,new W,new W,new W,new W,new W,new W,new W],ir=new W,ar=new nr,or=new W,sr=new W,cr=new W,lr=new W,ur=new W,dr=new W,fr=new W,pr=new W,mr=new W,hr=new W;function gr(e,t,n,r,i){for(let a=0,o=e.length-3;a<=o;a+=3){hr.fromArray(e,a);let o=i.x*Math.abs(hr.x)+i.y*Math.abs(hr.y)+i.z*Math.abs(hr.z),s=t.dot(hr),c=n.dot(hr),l=r.dot(hr);if(Math.max(-Math.max(s,c,l),Math.min(s,c,l))>o)return!1}return!0}var _r=new W,vr=new U,yr=0,br=class extends lt{constructor(e,t,n=!1){if(super(),Array.isArray(e))throw TypeError(`THREE.BufferAttribute: array should be a Typed Array.`);this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:yr++}),this.name=``,this.array=e,this.itemSize=t,this.count=e===void 0?0:e.length/t,this.normalized=n,this.usage=Ze,this.updateRanges=[],this.gpuType=w,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,n){e*=this.itemSize,n*=t.itemSize;for(let r=0,i=this.itemSize;r<i;r++)this.array[e+r]=t.array[n+r];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,n=this.count;t<n;t++)vr.fromBufferAttribute(this,t),vr.applyMatrix3(e),this.setXY(t,vr.x,vr.y);else if(this.itemSize===3)for(let t=0,n=this.count;t<n;t++)_r.fromBufferAttribute(this,t),_r.applyMatrix3(e),this.setXYZ(t,_r.x,_r.y,_r.z);return this}applyMatrix4(e){for(let t=0,n=this.count;t<n;t++)_r.fromBufferAttribute(this,t),_r.applyMatrix4(e),this.setXYZ(t,_r.x,_r.y,_r.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)_r.fromBufferAttribute(this,t),_r.applyNormalMatrix(e),this.setXYZ(t,_r.x,_r.y,_r.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)_r.fromBufferAttribute(this,t),_r.transformDirection(e),this.setXYZ(t,_r.x,_r.y,_r.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let n=this.array[e*this.itemSize+t];return this.normalized&&(n=Nt(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=Pt(n,this.array)),this.array[e*this.itemSize+t]=n,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=Nt(t,this.array)),t}setX(e,t){return this.normalized&&(t=Pt(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=Nt(t,this.array)),t}setY(e,t){return this.normalized&&(t=Pt(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=Nt(t,this.array)),t}setZ(e,t){return this.normalized&&(t=Pt(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=Nt(t,this.array)),t}setW(e,t){return this.normalized&&(t=Pt(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,n){return e*=this.itemSize,this.normalized&&(t=Pt(t,this.array),n=Pt(n,this.array)),this.array[e+0]=t,this.array[e+1]=n,this}setXYZ(e,t,n,r){return e*=this.itemSize,this.normalized&&(t=Pt(t,this.array),n=Pt(n,this.array),r=Pt(r,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=r,this}setXYZW(e,t,n,r,i){return e*=this.itemSize,this.normalized&&(t=Pt(t,this.array),n=Pt(n,this.array),r=Pt(r,this.array),i=Pt(i,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=r,this.array[e+3]=i,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){let e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return e.name=this.name,e.usage=this.usage,e.gpuType=this.gpuType,e}dispose(){this.dispatchEvent({type:`dispose`})}},xr=class extends br{constructor(e,t,n){super(new Uint16Array(e),t,n)}},Sr=class extends br{constructor(e,t,n){super(new Uint32Array(e),t,n)}},Cr=class extends br{constructor(e,t,n){super(new Float32Array(e),t,n)}},wr=new nr,Tr=new W,Er=new W,Dr=class{constructor(e=new W,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){let n=this.center;t===void 0?wr.setFromPoints(e).getCenter(n):n.copy(t);let r=0;for(let t=0,i=e.length;t<i;t++)r=Math.max(r,n.distanceToSquared(e[t]));return this.radius=Math.sqrt(r),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){let t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){let n=this.center.distanceToSquared(e);return t.copy(e),n>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius*=e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;Tr.subVectors(e,this.center);let t=Tr.lengthSq();if(t>this.radius*this.radius){let e=Math.sqrt(t),n=(e-this.radius)*.5;this.center.addScaledVector(Tr,n/e),this.radius+=n}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(Er.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(Tr.copy(e.center).add(Er)),this.expandByPoint(Tr.copy(e.center).sub(Er))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(e){return this.radius=e.radius,this.center.fromArray(e.center),this}},Or=0,kr=new an,Ar=new Mn,jr=new W,Mr=new nr,Nr=new nr,Pr=new W,Fr=class e extends lt{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:Or++}),this.uuid=mt(),this.name=``,this.type=`BufferGeometry`,this.index=null,this.indirect=null,this.indirectOffset=0,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={},this._transformed=!1}getIndex(){return this.index}setIndex(e){return this.index=Array.isArray(e)?new($e(e)?Sr:xr)(e,1):e,this}setIndirect(e,t=0){return this.indirect=e,this.indirectOffset=t,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,n=0){this.groups.push({start:e,count:t,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){let t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);let n=this.attributes.normal;if(n!==void 0){let t=new G().getNormalMatrix(e);n.applyNormalMatrix(t),n.needsUpdate=!0}let r=this.attributes.tangent;return r!==void 0&&(r.transformDirection(e),r.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this._transformed=!0,this}applyQuaternion(e){return kr.makeRotationFromQuaternion(e),this.applyMatrix4(kr),this}rotateX(e){return kr.makeRotationX(e),this.applyMatrix4(kr),this}rotateY(e){return kr.makeRotationY(e),this.applyMatrix4(kr),this}rotateZ(e){return kr.makeRotationZ(e),this.applyMatrix4(kr),this}translate(e,t,n){return kr.makeTranslation(e,t,n),this.applyMatrix4(kr),this}scale(e,t,n){return kr.makeScale(e,t,n),this.applyMatrix4(kr),this}lookAt(e){return Ar.lookAt(e),Ar.updateMatrix(),this.applyMatrix4(Ar.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(jr).negate(),this.translate(jr.x,jr.y,jr.z),this}setFromPoints(e){let t=this.getAttribute(`position`);if(t===void 0){let t=[];for(let n=0,r=e.length;n<r;n++){let r=e[n];t.push(r.x,r.y,r.z||0)}this.setAttribute(`position`,new Cr(t,3))}else{let n=Math.min(e.length,t.count);for(let r=0;r<n;r++){let n=e[r];t.setXYZ(r,n.x,n.y,n.z||0)}e.length>t.count&&z(`BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry.`),t.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new nr);let e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute)B(`BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.`,this),this.boundingBox.set(new W(-1/0,-1/0,-1/0),new W(1/0,1/0,1/0));else{if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let e=0,n=t.length;e<n;e++){let n=t[e];Mr.setFromBufferAttribute(n),this.morphTargetsRelative?(Pr.addVectors(this.boundingBox.min,Mr.min),this.boundingBox.expandByPoint(Pr),Pr.addVectors(this.boundingBox.max,Mr.max),this.boundingBox.expandByPoint(Pr)):(this.boundingBox.expandByPoint(Mr.min),this.boundingBox.expandByPoint(Mr.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&B(`BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.`,this)}}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Dr);let e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute)B(`BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.`,this),this.boundingSphere.set(new W,1/0);else if(e){let n=this.boundingSphere.center;if(Mr.setFromBufferAttribute(e),t)for(let e=0,n=t.length;e<n;e++){let n=t[e];Nr.setFromBufferAttribute(n),this.morphTargetsRelative?(Pr.addVectors(Mr.min,Nr.min),Mr.expandByPoint(Pr),Pr.addVectors(Mr.max,Nr.max),Mr.expandByPoint(Pr)):(Mr.expandByPoint(Nr.min),Mr.expandByPoint(Nr.max))}Mr.getCenter(n);let r=0;for(let t=0,i=e.count;t<i;t++)Pr.fromBufferAttribute(e,t),r=Math.max(r,n.distanceToSquared(Pr));if(t)for(let i=0,a=t.length;i<a;i++){let a=t[i],o=this.morphTargetsRelative;for(let t=0,i=a.count;t<i;t++)Pr.fromBufferAttribute(a,t),o&&(jr.fromBufferAttribute(e,t),Pr.add(jr)),r=Math.max(r,n.distanceToSquared(Pr))}this.boundingSphere.radius=Math.sqrt(r),isNaN(this.boundingSphere.radius)&&B(`BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.`,this)}}computeTangents(){let e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){B(`BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)`);return}let n=t.position,r=t.normal,i=t.uv,a=this.getAttribute(`tangent`);(a===void 0||a.count!==n.count)&&(a=new br(new Float32Array(4*n.count),4),this.setAttribute(`tangent`,a));let o=[],s=[];for(let e=0;e<n.count;e++)o[e]=new W,s[e]=new W;let c=new W,l=new W,u=new W,d=new U,f=new U,p=new U,m=new W,h=new W;function g(e,t,r){c.fromBufferAttribute(n,e),l.fromBufferAttribute(n,t),u.fromBufferAttribute(n,r),d.fromBufferAttribute(i,e),f.fromBufferAttribute(i,t),p.fromBufferAttribute(i,r),l.sub(c),u.sub(c),f.sub(d),p.sub(d);let a=1/(f.x*p.y-p.x*f.y);isFinite(a)&&(m.copy(l).multiplyScalar(p.y).addScaledVector(u,-f.y).multiplyScalar(a),h.copy(u).multiplyScalar(f.x).addScaledVector(l,-p.x).multiplyScalar(a),o[e].add(m),o[t].add(m),o[r].add(m),s[e].add(h),s[t].add(h),s[r].add(h))}let _=this.groups;_.length===0&&(_=[{start:0,count:e.count}]);for(let t=0,n=_.length;t<n;++t){let n=_[t],r=n.start,i=n.count;for(let t=r,n=r+i;t<n;t+=3)g(e.getX(t+0),e.getX(t+1),e.getX(t+2))}let v=new W,y=new W,b=new W,x=new W;function S(e){b.fromBufferAttribute(r,e),x.copy(b);let t=o[e];v.copy(t),v.sub(b.multiplyScalar(b.dot(t))).normalize(),y.crossVectors(x,t);let n=y.dot(s[e])<0?-1:1;a.setXYZW(e,v.x,v.y,v.z,n)}for(let t=0,n=_.length;t<n;++t){let n=_[t],r=n.start,i=n.count;for(let t=r,n=r+i;t<n;t+=3)S(e.getX(t+0)),S(e.getX(t+1)),S(e.getX(t+2))}this._transformed=!0}computeVertexNormals(){let e=this.index,t=this.getAttribute(`position`);if(t!==void 0){let n=this.getAttribute(`normal`);if(n===void 0||n.count!==t.count)n=new br(new Float32Array(t.count*3),3),this.setAttribute(`normal`,n);else for(let e=0,t=n.count;e<t;e++)n.setXYZ(e,0,0,0);let r=new W,i=new W,a=new W,o=new W,s=new W,c=new W,l=new W,u=new W;if(e)for(let d=0,f=e.count;d<f;d+=3){let f=e.getX(d+0),p=e.getX(d+1),m=e.getX(d+2);r.fromBufferAttribute(t,f),i.fromBufferAttribute(t,p),a.fromBufferAttribute(t,m),l.subVectors(a,i),u.subVectors(r,i),l.cross(u),o.fromBufferAttribute(n,f),s.fromBufferAttribute(n,p),c.fromBufferAttribute(n,m),o.add(l),s.add(l),c.add(l),n.setXYZ(f,o.x,o.y,o.z),n.setXYZ(p,s.x,s.y,s.z),n.setXYZ(m,c.x,c.y,c.z)}else for(let e=0,o=t.count;e<o;e+=3)r.fromBufferAttribute(t,e+0),i.fromBufferAttribute(t,e+1),a.fromBufferAttribute(t,e+2),l.subVectors(a,i),u.subVectors(r,i),l.cross(u),n.setXYZ(e+0,l.x,l.y,l.z),n.setXYZ(e+1,l.x,l.y,l.z),n.setXYZ(e+2,l.x,l.y,l.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){let e=this.attributes.normal;for(let t=0,n=e.count;t<n;t++)Pr.fromBufferAttribute(e,t),Pr.normalize(),e.setXYZ(t,Pr.x,Pr.y,Pr.z)}toNonIndexed(){function t(e,t){let n=e.array,r=e.itemSize,i=e.normalized,a=new n.constructor(t.length*r),o=0,s=0;for(let i=0,c=t.length;i<c;i++){o=e.isInterleavedBufferAttribute?t[i]*e.data.stride+e.offset:t[i]*r;for(let e=0;e<r;e++)a[s++]=n[o++]}return new br(a,r,i)}if(this.index===null)return z(`BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed.`),this;let n=new e,r=this.index.array,i=this.attributes;for(let e in i){let a=i[e],o=t(a,r);n.setAttribute(e,o)}let a=this.morphAttributes;for(let e in a){let i=[],o=a[e];for(let e=0,n=o.length;e<n;e++){let n=o[e],a=t(n,r);i.push(a)}n.morphAttributes[e]=i}n.morphTargetsRelative=this.morphTargetsRelative;let o=this.groups;for(let e=0,t=o.length;e<t;e++){let t=o[e];n.addGroup(t.start,t.count,t.materialIndex)}return n}toJSON(){let e={metadata:{version:4.7,type:`BufferGeometry`,generator:`BufferGeometry.toJSON`}};if(e.uuid=this.uuid,e.type=this.parameters!==void 0&&this._transformed===!0?`BufferGeometry`:this.type,e.name=this.name,Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0&&this._transformed!==!0){let t=this.parameters;for(let n in t)t[n]!==void 0&&(e[n]=t[n]);return e}e.data={attributes:{}};let t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});let n=this.attributes;for(let t in n){let r=n[t];e.data.attributes[t]=r.toJSON(e.data)}let r={},i=!1;for(let t in this.morphAttributes){let n=this.morphAttributes[t],a=[];for(let t=0,r=n.length;t<r;t++){let r=n[t];a.push(r.toJSON(e.data))}a.length>0&&(r[t]=a,i=!0)}i&&(e.data.morphAttributes=r,e.data.morphTargetsRelative=this.morphTargetsRelative);let a=this.groups;a.length>0&&(e.data.groups=JSON.parse(JSON.stringify(a)));let o=this.boundingSphere;return o!==null&&(e.data.boundingSphere=o.toJSON()),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;let t={};this.name=e.name;let n=e.index;n!==null&&this.setIndex(n.clone());let r=e.attributes;for(let e in r){let n=r[e];this.setAttribute(e,n.clone(t))}let i=e.morphAttributes;for(let e in i){let n=[],r=i[e];for(let e=0,i=r.length;e<i;e++)n.push(r[e].clone(t));this.morphAttributes[e]=n}this.morphTargetsRelative=e.morphTargetsRelative;let a=e.groups;for(let e=0,t=a.length;e<t;e++){let t=a[e];this.addGroup(t.start,t.count,t.materialIndex)}let o=e.boundingBox;o!==null&&(this.boundingBox=o.clone());let s=e.boundingSphere;return s!==null&&(this.boundingSphere=s.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this._transformed=e._transformed,this}dispose(){this.dispatchEvent({type:`dispose`})}},Ir=new W,Lr=new W,Rr=new G,zr=class{constructor(e=new W(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,n,r){return this.normal.set(e,t,n),this.constant=r,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,n){let r=Ir.subVectors(n,t).cross(Lr.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(r,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){let e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t,n=!0){let r=e.delta(Ir),i=this.normal.dot(r);if(i===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;let a=-(e.start.dot(this.normal)+this.constant)/i;return n===!0&&(a<0||a>1)?null:t.copy(e.start).addScaledVector(r,a)}intersectsLine(e){let t=this.distanceToPoint(e.start),n=this.distanceToPoint(e.end);return t<0&&n>0||n<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){let n=t||Rr.getNormalMatrix(e),r=this.coplanarPoint(Ir).applyMatrix4(e),i=this.normal.applyMatrix3(n).normalize();return this.constant=-r.dot(i),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}toJSON(){return{normal:this.normal.toArray(),constant:this.constant}}fromJSON(e){return this.normal.fromArray(e.normal),this.constant=e.constant,this}},Br=0,Vr=class extends lt{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:Br++}),this.uuid=mt(),this.name=``,this.type=`Material`,this.blending=1,this.side=0,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=204,this.blendDst=205,this.blendEquation=100,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new q(0,0,0),this.blendAlpha=0,this.depthFunc=3,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=519,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=Xe,this.stencilZFail=Xe,this.stencilZPass=Xe,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(let t in e){let n=e[t];if(n===void 0){z(`Material: parameter '${t}' has value of undefined.`);continue}let r=this[t];r===void 0?z(`Material: '${t}' is not a property of THREE.${this.type}.`):r&&r.isColor?r.set(n):r&&r.isVector2&&n&&n.isVector2||r&&r.isEuler&&n&&n.isEuler||r&&r.isVector3&&n&&n.isVector3?r.copy(n):this[t]=n}}toJSON(e){let t=e===void 0||typeof e==`string`;t&&(e={textures:{},images:{}});let n={metadata:{version:4.7,type:`Material`,generator:`Material.toJSON`}};n.uuid=this.uuid,n.type=this.type,n.blending=this.blending,n.side=this.side,n.shadowSide=this.shadowSide,n.vertexColors=this.vertexColors,n.opacity=this.opacity,n.transparent=this.transparent,n.blendSrc=this.blendSrc,n.blendDst=this.blendDst,n.blendEquation=this.blendEquation,n.blendSrcAlpha=this.blendSrcAlpha,n.blendDstAlpha=this.blendDstAlpha,n.blendEquationAlpha=this.blendEquationAlpha,n.blendColor=this.blendColor.getHex(),n.blendAlpha=this.blendAlpha,n.depthFunc=this.depthFunc,n.depthTest=this.depthTest,n.depthWrite=this.depthWrite,n.colorWrite=this.colorWrite,n.clipIntersection=this.clipIntersection,n.clipShadows=this.clipShadows,n.stencilWriteMask=this.stencilWriteMask,n.stencilFunc=this.stencilFunc,n.stencilRef=this.stencilRef,n.stencilFuncMask=this.stencilFuncMask,n.stencilFail=this.stencilFail,n.stencilZFail=this.stencilZFail,n.stencilZPass=this.stencilZPass,n.stencilWrite=this.stencilWrite,n.polygonOffset=this.polygonOffset,n.polygonOffsetFactor=this.polygonOffsetFactor,n.polygonOffsetUnits=this.polygonOffsetUnits,n.dithering=this.dithering,n.alphaTest=this.alphaTest,n.alphaHash=this.alphaHash,n.alphaToCoverage=this.alphaToCoverage,n.premultipliedAlpha=this.premultipliedAlpha,n.forceSinglePass=this.forceSinglePass,n.allowOverride=this.allowOverride,n.visible=this.visible,n.toneMapped=this.toneMapped,n.name=this.name,this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(n.sheenColorMap=this.sheenColorMap.toJSON(e).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(n.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(e).uuid),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.retroreflectivity!==void 0&&(n.retroreflectivity=this.retroreflectivity),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(e).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(e).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(e).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(e).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(e).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),Array.isArray(this.clippingPlanes)&&this.clippingPlanes.length>0&&(n.clippingPlanes=this.clippingPlanes.map(e=>e.toJSON())),this.rotation!==void 0&&(n.rotation=this.rotation),this.depthPacking!==void 0&&(n.depthPacking=this.depthPacking),this.linewidth!==void 0&&(n.linewidth=this.linewidth),this.linecap!==void 0&&(n.linecap=this.linecap),this.linejoin!==void 0&&(n.linejoin=this.linejoin),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.wireframe!==void 0&&(n.wireframe=this.wireframe),this.wireframeLinewidth!==void 0&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!==void 0&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!==void 0&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading!==void 0&&(n.flatShading=this.flatShading),this.fog!==void 0&&(n.fog=this.fog),Object.keys(this.userData).length>0&&(n.userData=this.userData);function r(e){let t=[];for(let n in e){let r=e[n];delete r.metadata,t.push(r)}return t}if(t){let t=r(e.textures),i=r(e.images);t.length>0&&(n.textures=t),i.length>0&&(n.images=i)}return n}fromJSON(e,t){if(e.uuid!==void 0&&(this.uuid=e.uuid),e.name!==void 0&&(this.name=e.name),e.color!==void 0&&this.color!==void 0&&this.color.setHex(e.color),e.roughness!==void 0&&(this.roughness=e.roughness),e.metalness!==void 0&&(this.metalness=e.metalness),e.sheen!==void 0&&(this.sheen=e.sheen),e.sheenColor!==void 0&&(this.sheenColor=new q().setHex(e.sheenColor)),e.sheenRoughness!==void 0&&(this.sheenRoughness=e.sheenRoughness),e.emissive!==void 0&&this.emissive!==void 0&&this.emissive.setHex(e.emissive),e.specular!==void 0&&this.specular!==void 0&&this.specular.setHex(e.specular),e.specularIntensity!==void 0&&(this.specularIntensity=e.specularIntensity),e.specularColor!==void 0&&this.specularColor!==void 0&&this.specularColor.setHex(e.specularColor),e.shininess!==void 0&&(this.shininess=e.shininess),e.clearcoat!==void 0&&(this.clearcoat=e.clearcoat),e.clearcoatRoughness!==void 0&&(this.clearcoatRoughness=e.clearcoatRoughness),e.dispersion!==void 0&&(this.dispersion=e.dispersion),e.retroreflectivity!==void 0&&(this.retroreflectivity=e.retroreflectivity),e.iridescence!==void 0&&(this.iridescence=e.iridescence),e.iridescenceIOR!==void 0&&(this.iridescenceIOR=e.iridescenceIOR),e.iridescenceThicknessRange!==void 0&&(this.iridescenceThicknessRange=e.iridescenceThicknessRange),e.transmission!==void 0&&(this.transmission=e.transmission),e.thickness!==void 0&&(this.thickness=e.thickness),e.attenuationDistance!==void 0&&(this.attenuationDistance=e.attenuationDistance),e.attenuationColor!==void 0&&this.attenuationColor!==void 0&&this.attenuationColor.setHex(e.attenuationColor),e.anisotropy!==void 0&&(this.anisotropy=e.anisotropy),e.anisotropyRotation!==void 0&&(this.anisotropyRotation=e.anisotropyRotation),e.fog!==void 0&&(this.fog=e.fog),e.flatShading!==void 0&&(this.flatShading=e.flatShading),e.blending!==void 0&&(this.blending=e.blending),e.combine!==void 0&&(this.combine=e.combine),e.side!==void 0&&(this.side=e.side),e.shadowSide!==void 0&&(this.shadowSide=e.shadowSide),e.opacity!==void 0&&(this.opacity=e.opacity),e.transparent!==void 0&&(this.transparent=e.transparent),e.alphaTest!==void 0&&(this.alphaTest=e.alphaTest),e.alphaHash!==void 0&&(this.alphaHash=e.alphaHash),e.depthFunc!==void 0&&(this.depthFunc=e.depthFunc),e.depthTest!==void 0&&(this.depthTest=e.depthTest),e.depthWrite!==void 0&&(this.depthWrite=e.depthWrite),e.colorWrite!==void 0&&(this.colorWrite=e.colorWrite),e.clippingPlanes!==void 0&&(this.clippingPlanes=e.clippingPlanes.map(e=>new zr().fromJSON(e))),e.clipIntersection!==void 0&&(this.clipIntersection=e.clipIntersection),e.clipShadows!==void 0&&(this.clipShadows=e.clipShadows),e.depthPacking!==void 0&&(this.depthPacking=e.depthPacking),e.blendSrc!==void 0&&(this.blendSrc=e.blendSrc),e.blendDst!==void 0&&(this.blendDst=e.blendDst),e.blendEquation!==void 0&&(this.blendEquation=e.blendEquation),e.blendSrcAlpha!==void 0&&(this.blendSrcAlpha=e.blendSrcAlpha),e.blendDstAlpha!==void 0&&(this.blendDstAlpha=e.blendDstAlpha),e.blendEquationAlpha!==void 0&&(this.blendEquationAlpha=e.blendEquationAlpha),e.blendColor!==void 0&&this.blendColor!==void 0&&this.blendColor.setHex(e.blendColor),e.blendAlpha!==void 0&&(this.blendAlpha=e.blendAlpha),e.stencilWriteMask!==void 0&&(this.stencilWriteMask=e.stencilWriteMask),e.stencilFunc!==void 0&&(this.stencilFunc=e.stencilFunc),e.stencilRef!==void 0&&(this.stencilRef=e.stencilRef),e.stencilFuncMask!==void 0&&(this.stencilFuncMask=e.stencilFuncMask),e.stencilFail!==void 0&&(this.stencilFail=e.stencilFail),e.stencilZFail!==void 0&&(this.stencilZFail=e.stencilZFail),e.stencilZPass!==void 0&&(this.stencilZPass=e.stencilZPass),e.stencilWrite!==void 0&&(this.stencilWrite=e.stencilWrite),e.wireframe!==void 0&&(this.wireframe=e.wireframe),e.wireframeLinewidth!==void 0&&(this.wireframeLinewidth=e.wireframeLinewidth),e.wireframeLinecap!==void 0&&(this.wireframeLinecap=e.wireframeLinecap),e.wireframeLinejoin!==void 0&&(this.wireframeLinejoin=e.wireframeLinejoin),e.rotation!==void 0&&(this.rotation=e.rotation),e.linewidth!==void 0&&(this.linewidth=e.linewidth),e.linecap!==void 0&&(this.linecap=e.linecap),e.linejoin!==void 0&&(this.linejoin=e.linejoin),e.dashSize!==void 0&&(this.dashSize=e.dashSize),e.gapSize!==void 0&&(this.gapSize=e.gapSize),e.scale!==void 0&&(this.scale=e.scale),e.polygonOffset!==void 0&&(this.polygonOffset=e.polygonOffset),e.polygonOffsetFactor!==void 0&&(this.polygonOffsetFactor=e.polygonOffsetFactor),e.polygonOffsetUnits!==void 0&&(this.polygonOffsetUnits=e.polygonOffsetUnits),e.dithering!==void 0&&(this.dithering=e.dithering),e.alphaToCoverage!==void 0&&(this.alphaToCoverage=e.alphaToCoverage),e.premultipliedAlpha!==void 0&&(this.premultipliedAlpha=e.premultipliedAlpha),e.forceSinglePass!==void 0&&(this.forceSinglePass=e.forceSinglePass),e.allowOverride!==void 0&&(this.allowOverride=e.allowOverride),e.visible!==void 0&&(this.visible=e.visible),e.toneMapped!==void 0&&(this.toneMapped=e.toneMapped),e.userData!==void 0&&(this.userData=e.userData),e.vertexColors!==void 0&&(this.vertexColors=typeof e.vertexColors==`number`?e.vertexColors>0:e.vertexColors),e.size!==void 0&&(this.size=e.size),e.sizeAttenuation!==void 0&&(this.sizeAttenuation=e.sizeAttenuation),e.map!==void 0&&(this.map=t[e.map]||null),e.matcap!==void 0&&(this.matcap=t[e.matcap]||null),e.alphaMap!==void 0&&(this.alphaMap=t[e.alphaMap]||null),e.bumpMap!==void 0&&(this.bumpMap=t[e.bumpMap]||null),e.bumpScale!==void 0&&(this.bumpScale=e.bumpScale),e.normalMap!==void 0&&(this.normalMap=t[e.normalMap]||null),e.normalMapType!==void 0&&(this.normalMapType=e.normalMapType),e.normalScale!==void 0){let t=e.normalScale;Array.isArray(t)===!1&&(t=[t,t]),this.normalScale=new U().fromArray(t)}return e.displacementMap!==void 0&&(this.displacementMap=t[e.displacementMap]||null),e.displacementScale!==void 0&&(this.displacementScale=e.displacementScale),e.displacementBias!==void 0&&(this.displacementBias=e.displacementBias),e.roughnessMap!==void 0&&(this.roughnessMap=t[e.roughnessMap]||null),e.metalnessMap!==void 0&&(this.metalnessMap=t[e.metalnessMap]||null),e.emissiveMap!==void 0&&(this.emissiveMap=t[e.emissiveMap]||null),e.emissiveIntensity!==void 0&&(this.emissiveIntensity=e.emissiveIntensity),e.specularMap!==void 0&&(this.specularMap=t[e.specularMap]||null),e.specularIntensityMap!==void 0&&(this.specularIntensityMap=t[e.specularIntensityMap]||null),e.specularColorMap!==void 0&&(this.specularColorMap=t[e.specularColorMap]||null),e.envMap!==void 0&&(this.envMap=t[e.envMap]||null),e.envMapRotation!==void 0&&this.envMapRotation.fromArray(e.envMapRotation),e.envMapIntensity!==void 0&&(this.envMapIntensity=e.envMapIntensity),e.reflectivity!==void 0&&(this.reflectivity=e.reflectivity),e.refractionRatio!==void 0&&(this.refractionRatio=e.refractionRatio),e.lightMap!==void 0&&(this.lightMap=t[e.lightMap]||null),e.lightMapIntensity!==void 0&&(this.lightMapIntensity=e.lightMapIntensity),e.aoMap!==void 0&&(this.aoMap=t[e.aoMap]||null),e.aoMapIntensity!==void 0&&(this.aoMapIntensity=e.aoMapIntensity),e.gradientMap!==void 0&&(this.gradientMap=t[e.gradientMap]||null),e.clearcoatMap!==void 0&&(this.clearcoatMap=t[e.clearcoatMap]||null),e.clearcoatRoughnessMap!==void 0&&(this.clearcoatRoughnessMap=t[e.clearcoatRoughnessMap]||null),e.clearcoatNormalMap!==void 0&&(this.clearcoatNormalMap=t[e.clearcoatNormalMap]||null),e.clearcoatNormalScale!==void 0&&(this.clearcoatNormalScale=new U().fromArray(e.clearcoatNormalScale)),e.iridescenceMap!==void 0&&(this.iridescenceMap=t[e.iridescenceMap]||null),e.iridescenceThicknessMap!==void 0&&(this.iridescenceThicknessMap=t[e.iridescenceThicknessMap]||null),e.transmissionMap!==void 0&&(this.transmissionMap=t[e.transmissionMap]||null),e.thicknessMap!==void 0&&(this.thicknessMap=t[e.thicknessMap]||null),e.anisotropyMap!==void 0&&(this.anisotropyMap=t[e.anisotropyMap]||null),e.sheenColorMap!==void 0&&(this.sheenColorMap=t[e.sheenColorMap]||null),e.sheenRoughnessMap!==void 0&&(this.sheenRoughnessMap=t[e.sheenRoughnessMap]||null),this}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;let t=e.clippingPlanes,n=null;if(t!==null){let e=t.length;n=Array(e);for(let r=0;r!==e;++r)n[r]=t[r].clone()}return this.clippingPlanes=n,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.allowOverride=e.allowOverride,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:`dispose`})}set needsUpdate(e){e===!0&&this.version++}},Hr=new W,Ur=new W,Wr=new W,Gr=new W,Kr=class{constructor(e=new W,t=new W(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,Hr)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);let n=t.dot(this.direction);return n<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){let t=Hr.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(Hr.copy(this.origin).addScaledVector(this.direction,t),Hr.distanceToSquared(e))}distanceSqToSegment(e,t,n,r){Ur.copy(e).add(t).multiplyScalar(.5),Wr.copy(t).sub(e).normalize(),Gr.copy(this.origin).sub(Ur);let i=e.distanceTo(t)*.5,a=-this.direction.dot(Wr),o=Gr.dot(this.direction),s=-Gr.dot(Wr),c=Gr.lengthSq(),l=Math.abs(1-a*a),u,d,f,p;if(l>0){if(u=a*s-o,d=a*o-s,p=i*l,u>=0){if(d>=-p){if(d<=p){let e=1/l;u*=e,d*=e,f=u*(u+a*d+2*o)+d*(a*u+d+2*s)+c}else d=i,u=Math.max(0,-(a*d+o)),f=-u*u+d*(d+2*s)+c}else d=-i,u=Math.max(0,-(a*d+o)),f=-u*u+d*(d+2*s)+c}else d<=-p?(u=Math.max(0,-(-a*i+o)),d=u>0?-i:Math.min(Math.max(-i,-s),i),f=-u*u+d*(d+2*s)+c):d<=p?(u=0,d=Math.min(Math.max(-i,-s),i),f=d*(d+2*s)+c):(u=Math.max(0,-(a*i+o)),d=u>0?i:Math.min(Math.max(-i,-s),i),f=-u*u+d*(d+2*s)+c)}else d=a>0?-i:i,u=Math.max(0,-(a*d+o)),f=-u*u+d*(d+2*s)+c;return n&&n.copy(this.origin).addScaledVector(this.direction,u),r&&r.copy(Ur).addScaledVector(Wr,d),f}intersectSphere(e,t){if(e.radius<0)return null;Hr.subVectors(e.center,this.origin);let n=Hr.dot(this.direction),r=Hr.dot(Hr)-n*n,i=e.radius*e.radius;if(r>i)return null;let a=Math.sqrt(i-r),o=n-a,s=n+a;return s<0?null:o<0?this.at(s,t):this.at(o,t)}intersectsSphere(e){return e.radius<0?!1:this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){let t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;let n=-(this.origin.dot(e.normal)+e.constant)/t;return n>=0?n:null}intersectPlane(e,t){let n=this.distanceToPlane(e);return n===null?null:this.at(n,t)}intersectsPlane(e){let t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let n,r,i,a,o,s,c=1/this.direction.x,l=1/this.direction.y,u=1/this.direction.z,d=this.origin;return c>=0?(n=(e.min.x-d.x)*c,r=(e.max.x-d.x)*c):(n=(e.max.x-d.x)*c,r=(e.min.x-d.x)*c),l>=0?(i=(e.min.y-d.y)*l,a=(e.max.y-d.y)*l):(i=(e.max.y-d.y)*l,a=(e.min.y-d.y)*l),n>a||i>r||((i>n||isNaN(n))&&(n=i),(a<r||isNaN(r))&&(r=a),u>=0?(o=(e.min.z-d.z)*u,s=(e.max.z-d.z)*u):(o=(e.max.z-d.z)*u,s=(e.min.z-d.z)*u),n>s||o>r)||((o>n||n!==n)&&(n=o),(s<r||r!==r)&&(r=s),r<0)?null:this.at(n>=0?n:r,t)}intersectsBox(e){return this.intersectBox(e,Hr)!==null}intersectTriangle(e,t,n,r,i){let a=this.origin,o=this.direction,s=o.x,c=o.y,l=o.z,u=e.x-a.x,d=e.y-a.y,f=e.z-a.z,p=t.x-a.x,m=t.y-a.y,h=t.z-a.z,g=n.x-a.x,_=n.y-a.y,v=n.z-a.z,y=Math.abs(s),b=Math.abs(c),x=Math.abs(l),S,C,w,T,E,D,O,k,A,j,M,N;if(y>=b&&y>=x?(w=s,D=u,A=p,N=g,s>=0?(S=c,C=l,T=d,E=f,O=m,k=h,j=_,M=v):(S=l,C=c,T=f,E=d,O=h,k=m,j=v,M=_)):b>=x?(w=c,D=d,A=m,N=_,c>=0?(S=l,C=s,T=f,E=u,O=h,k=p,j=v,M=g):(S=s,C=l,T=u,E=f,O=p,k=h,j=g,M=v)):(w=l,D=f,A=h,N=v,l>=0?(S=s,C=c,T=u,E=d,O=p,k=m,j=g,M=_):(S=c,C=s,T=d,E=u,O=m,k=p,j=_,M=g)),w===0)return null;let ee=S/w,P=C/w,te=1/w,ne=T-ee*D,re=E-P*D,ie=O-ee*A,ae=k-P*A,oe=j-ee*N,se=M-P*N,ce=oe*ae-se*ie,F=ne*se-re*oe,le=ie*re-ae*ne;if(r){if(ce<0||F<0||le<0)return null}else if((ce<0||F<0||le<0)&&(ce>0||F>0||le>0))return null;let ue=ce+F+le;if(ue===0)return null;let de=te*(ce*D+F*A+le*N);return(ue>0?de<0:de>0)?null:this.at(de/ue,i)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}},qr=class extends Vr{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type=`MeshBasicMaterial`,this.color=new q(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new hn,this.combine=0,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap=`round`,this.wireframeLinejoin=`round`,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}},Jr=new an,Yr=new Kr,Xr=new Dr,Zr=new W,Qr=new W,$r=new W,ei=new W,ti=new W,ni=new W,ri=new W,ii=new W,J=class extends Mn{constructor(e=new Fr,t=new qr){super(),this.isMesh=!0,this.type=`Mesh`,this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){let e=this.geometry.morphAttributes,t=Object.keys(e);if(t.length>0){let n=e[t[0]];if(n!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let e=0,t=n.length;e<t;e++){let t=n[e].name||String(e);this.morphTargetInfluences.push(0),this.morphTargetDictionary[t]=e}}}}getVertexPosition(e,t){let n=this.geometry,r=n.attributes.position,i=n.morphAttributes.position,a=n.morphTargetsRelative;t.fromBufferAttribute(r,e);let o=this.morphTargetInfluences;if(i&&o){ni.set(0,0,0);for(let n=0,r=i.length;n<r;n++){let r=o[n],s=i[n];r!==0&&(ti.fromBufferAttribute(s,e),a?ni.addScaledVector(ti,r):ni.addScaledVector(ti.sub(t),r))}t.add(ni)}return t}intersectsFrustum(e){return e.intersectsObject(this)}raycast(e,t){let n=this.geometry,r=this.material,i=this.matrixWorld;r!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),Xr.copy(n.boundingSphere),Xr.applyMatrix4(i),Yr.copy(e.ray).recast(e.near),Xr.containsPoint(Yr.origin)===!1&&(Yr.intersectSphere(Xr,Zr)===null||Yr.origin.distanceToSquared(Zr)>(e.far-e.near)**2)||(Jr.copy(i).invert(),Yr.copy(e.ray).applyMatrix4(Jr),(n.boundingBox===null||Yr.intersectsBox(n.boundingBox)!==!1)&&this._computeIntersections(e,t,Yr)))}_computeIntersections(e,t,n){let r,i=this.geometry,a=this.material,o=i.index,s=i.attributes.position,c=i.attributes.uv,l=i.attributes.uv1,u=i.attributes.normal,d=i.groups,f=i.drawRange;if(o!==null){if(Array.isArray(a))for(let i=0,s=d.length;i<s;i++){let s=d[i],p=a[s.materialIndex],m=Math.max(s.start,f.start),h=Math.min(o.count,Math.min(s.start+s.count,f.start+f.count));for(let i=m,a=h;i<a;i+=3){let a=o.getX(i),d=o.getX(i+1),f=o.getX(i+2);r=oi(this,p,e,n,c,l,u,a,d,f),r&&(r.faceIndex=Math.floor(i/3),r.face.materialIndex=s.materialIndex,t.push(r))}}else{let i=Math.max(0,f.start),s=Math.min(o.count,f.start+f.count);for(let d=i,f=s;d<f;d+=3){let i=o.getX(d),s=o.getX(d+1),f=o.getX(d+2);r=oi(this,a,e,n,c,l,u,i,s,f),r&&(r.faceIndex=Math.floor(d/3),t.push(r))}}}else if(s!==void 0){if(Array.isArray(a))for(let i=0,o=d.length;i<o;i++){let o=d[i],p=a[o.materialIndex],m=Math.max(o.start,f.start),h=Math.min(s.count,Math.min(o.start+o.count,f.start+f.count));for(let i=m,a=h;i<a;i+=3){let a=i,s=i+1,d=i+2;r=oi(this,p,e,n,c,l,u,a,s,d),r&&(r.faceIndex=Math.floor(i/3),r.face.materialIndex=o.materialIndex,t.push(r))}}else{let i=Math.max(0,f.start),o=Math.min(s.count,f.start+f.count);for(let s=i,d=o;s<d;s+=3){let i=s,o=s+1,d=s+2;r=oi(this,a,e,n,c,l,u,i,o,d),r&&(r.faceIndex=Math.floor(s/3),t.push(r))}}}}};function ai(e,t,n,r,i,a,o,s){let c;if(c=t.side===1?r.intersectTriangle(o,a,i,!0,s):r.intersectTriangle(i,a,o,t.side===0,s),c===null)return null;ii.copy(s),ii.applyMatrix4(e.matrixWorld);let l=n.ray.origin.distanceTo(ii);return l<n.near||l>n.far?null:{distance:l,point:ii.clone(),object:e}}function oi(e,t,n,r,i,a,o,s,c,l){e.getVertexPosition(s,Qr),e.getVertexPosition(c,$r),e.getVertexPosition(l,ei);let u=ai(e,t,n,r,Qr,$r,ei,ri);if(u){let e=new W;tr.getBarycoord(ri,Qr,$r,ei,e),i&&(u.uv=tr.getInterpolatedAttribute(i,s,c,l,e,new U)),a&&(u.uv1=tr.getInterpolatedAttribute(a,s,c,l,e,new U)),o&&(u.normal=tr.getInterpolatedAttribute(o,s,c,l,e,new W),u.normal.dot(r.direction)>0&&u.normal.multiplyScalar(-1));let t={a:s,b:c,c:l,normal:new W,materialIndex:0};tr.getNormal(Qr,$r,ei,t.normal),u.face=t,u.barycoord=e}return u}var si=class extends Qt{constructor(e=null,t=1,n=1,r,i,a,o,s,c=f,l=f,u,d){super(null,a,o,s,c,l,r,i,u,d),this.isDataTexture=!0,this.image={data:e,width:t,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}},ci=class extends br{constructor(e,t,n,r=1){super(e,t,n),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=r}copy(e){return super.copy(e),this.meshPerAttribute=e.meshPerAttribute,this}toJSON(){let e=super.toJSON();return e.meshPerAttribute=this.meshPerAttribute,e.isInstancedBufferAttribute=!0,e}},li=new an,ui=new an,di=[],fi=new nr,pi=new an,mi=new J,hi=new Dr,gi=class extends J{constructor(e,t,n){super(e,t),this.isInstancedMesh=!0,this.instanceMatrix=new ci(new Float32Array(n*16),16),this.instanceColor=null,this.morphTexture=null,this.count=n,this.boundingBox=null,this.boundingSphere=null;for(let e=0;e<n;e++)this.setMatrixAt(e,pi)}computeBoundingBox(){let e=this.geometry,t=this.count;this.boundingBox===null&&(this.boundingBox=new nr),e.boundingBox===null&&e.computeBoundingBox(),this.boundingBox.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,li),fi.copy(e.boundingBox).applyMatrix4(li),this.boundingBox.union(fi)}computeBoundingSphere(){let e=this.geometry,t=this.count;this.boundingSphere===null&&(this.boundingSphere=new Dr),e.boundingSphere===null&&e.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,li),hi.copy(e.boundingSphere).applyMatrix4(li),this.boundingSphere.union(hi)}copy(e,t){return super.copy(e,t),this.instanceMatrix.copy(e.instanceMatrix),e.morphTexture!==null&&(this.morphTexture=e.morphTexture.clone()),e.instanceColor!==null&&(this.instanceColor=e.instanceColor.clone()),this.count=e.count,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}getColorAt(e,t){return this.instanceColor===null?t.setRGB(1,1,1):t.fromArray(this.instanceColor.array,e*3)}getMatrixAt(e,t){return t.fromArray(this.instanceMatrix.array,e*16)}getMorphAt(e,t){let n=t.morphTargetInfluences,r=this.morphTexture.source.data.data,i=e*(n.length+1)+1;for(let e=0;e<n.length;e++)n[e]=r[i+e]}raycast(e,t){let n=this.matrixWorld,r=this.count;if(mi.geometry=this.geometry,mi.material=this.material,mi.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),hi.copy(this.boundingSphere),hi.applyMatrix4(n),e.ray.intersectsSphere(hi)!==!1))for(let i=0;i<r;i++){this.getMatrixAt(i,li),ui.multiplyMatrices(n,li),mi.matrixWorld=ui,mi.raycast(e,di);for(let e=0,n=di.length;e<n;e++){let n=di[e];n.instanceId=i,n.object=this,t.push(n)}di.length=0}}setColorAt(e,t){return this.instanceColor===null&&(this.instanceColor=new ci(new Float32Array(this.instanceMatrix.count*3).fill(1),3)),t.toArray(this.instanceColor.array,e*3),this}setMatrixAt(e,t){return t.toArray(this.instanceMatrix.array,e*16),this}setMorphAt(e,t){let n=t.morphTargetInfluences,r=n.length+1;this.morphTexture===null&&(this.morphTexture=new si(new Float32Array(r*this.count),r,this.count,te,w));let i=this.morphTexture.source.data.data,a=0;for(let e=0;e<n.length;e++)a+=n[e];let o=this.geometry.morphTargetsRelative?1:1-a,s=r*e;return i[s]=o,i.set(n,s+1),this}updateMorphTargets(){}dispose(){super.dispose(),this.morphTexture!==null&&(this.morphTexture.dispose(),this.morphTexture=null)}},_i=new Dr,vi=new U(.5,.5),yi=new W,bi=class{constructor(e=new zr,t=new zr,n=new zr,r=new zr,i=new zr,a=new zr){this.planes=[e,t,n,r,i,a]}set(e,t,n,r,i,a){let o=this.planes;return o[0].copy(e),o[1].copy(t),o[2].copy(n),o[3].copy(r),o[4].copy(i),o[5].copy(a),this}copy(e){let t=this.planes;for(let n=0;n<6;n++)t[n].copy(e.planes[n]);return this}setFromProjectionMatrix(e,t=Qe,n=!1){let r=this.planes,i=e.elements,a=i[0],o=i[1],s=i[2],c=i[3],l=i[4],u=i[5],d=i[6],f=i[7],p=i[8],m=i[9],h=i[10],g=i[11],_=i[12],v=i[13],y=i[14],b=i[15];if(r[0].setComponents(c-a,f-l,g-p,b-_).normalize(),r[1].setComponents(c+a,f+l,g+p,b+_).normalize(),r[2].setComponents(c+o,f+u,g+m,b+v).normalize(),r[3].setComponents(c-o,f-u,g-m,b-v).normalize(),n)r[4].setComponents(s,d,h,y).normalize(),r[5].setComponents(c-s,f-d,g-h,b-y).normalize();else if(r[4].setComponents(c-s,f-d,g-h,b-y).normalize(),t===2e3)r[5].setComponents(c+s,f+d,g+h,b+y).normalize();else if(t===2001)r[5].setComponents(s,d,h,y).normalize();else throw Error(`THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: `+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),_i.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{let t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),_i.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(_i)}intersectsSprite(e){return _i.center.set(0,0,0),_i.radius=.7071067811865476+vi.distanceTo(e.center),_i.applyMatrix4(e.matrixWorld),this.intersectsSphere(_i)}intersectsSphere(e){let t=this.planes,n=e.center,r=-e.radius;for(let e=0;e<6;e++)if(t[e].distanceToPoint(n)<r)return!1;return!0}intersectsBox(e){let t=this.planes;for(let n=0;n<6;n++){let r=t[n];if(yi.x=r.normal.x>0?e.max.x:e.min.x,yi.y=r.normal.y>0?e.max.y:e.min.y,yi.z=r.normal.z>0?e.max.z:e.min.z,r.distanceToPoint(yi)<0)return!1}return!0}containsPoint(e){let t=this.planes;for(let n=0;n<6;n++)if(t[n].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}},xi=class extends Vr{constructor(e){super(),this.isPointsMaterial=!0,this.type=`PointsMaterial`,this.color=new q(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.size=e.size,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}},Si=new an,Ci=new Kr,wi=new Dr,Ti=new W,Ei=class extends Mn{constructor(e=new Fr,t=new xi){super(),this.isPoints=!0,this.type=`Points`,this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}intersectsFrustum(e){return e.intersectsObject(this)}raycast(e,t){let n=this.geometry,r=this.matrixWorld,i=e.params.Points.threshold,a=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),wi.copy(n.boundingSphere),wi.applyMatrix4(r),wi.radius+=i,e.ray.intersectsSphere(wi)===!1)return;Si.copy(r).invert(),Ci.copy(e.ray).applyMatrix4(Si);let o=i/((this.scale.x+this.scale.y+this.scale.z)/3),s=o*o,c=n.index,l=n.attributes.position;if(c!==null){let n=Math.max(0,a.start),i=Math.min(c.count,a.start+a.count);for(let a=n,o=i;a<o;a++){let n=c.getX(a);Ti.fromBufferAttribute(l,n),Di(Ti,n,s,r,e,t,this)}}else{let n=Math.max(0,a.start),i=Math.min(l.count,a.start+a.count);for(let a=n,o=i;a<o;a++)Ti.fromBufferAttribute(l,a),Di(Ti,a,s,r,e,t,this)}}updateMorphTargets(){let e=this.geometry.morphAttributes,t=Object.keys(e);if(t.length>0){let n=e[t[0]];if(n!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let e=0,t=n.length;e<t;e++){let t=n[e].name||String(e);this.morphTargetInfluences.push(0),this.morphTargetDictionary[t]=e}}}}};function Di(e,t,n,r,i,a,o){let s=Ci.distanceSqToPoint(e);if(s<n){let n=new W;Ci.closestPointToPoint(e,n),n.applyMatrix4(r);let c=i.ray.origin.distanceTo(n);if(c<i.near||c>i.far)return;a.push({distance:c,distanceToRay:Math.sqrt(s),point:n,index:t,face:null,faceIndex:null,barycoord:null,object:o})}}var Oi=class extends Qt{constructor(e=[],t=301,n,r,i,a,o,s,c,l){super(e,t,n,r,i,a,o,s,c,l),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}},ki=class extends Qt{constructor(e,t,n,r,i,a,o,s,c){super(e,t,n,r,i,a,o,s,c),this.isCanvasTexture=!0,this.needsUpdate=!0}},Ai=class extends Qt{constructor(e,t,n=C,r,i,a,o=f,s=f,c,l=ee,u=1){if(l!==1026&&l!==1027)throw Error(`THREE.DepthTexture: format must be either THREE.DepthFormat or THREE.DepthStencilFormat`);super({width:e,height:t,depth:u},r,i,a,o,s,l,n,c),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.source=new Jt(Object.assign({},e.image)),this.compareFunction=e.compareFunction,this}toJSON(e){let t=super.toJSON(e);return t.compareFunction=this.compareFunction,t}},ji=class extends Ai{constructor(e,t=C,n=301,r,i,a=f,o=f,s,c=ee){let l={width:e,height:e,depth:1},u=[l,l,l,l,l,l];super(e,e,t,n,r,i,a,o,s,c),this.image=u,this.isCubeDepthTexture=!0,this.isCubeTexture=!0}get images(){return this.image}set images(e){this.image=e}},Mi=class extends Qt{constructor(e=null){super(),this.sourceTexture=e,this.isExternalTexture=!0}copy(e){return super.copy(e),this.sourceTexture=e.sourceTexture,this}},Y=class e extends Fr{constructor(e=1,t=1,n=1,r=1,i=1,a=1){super(),this.type=`BoxGeometry`,this.parameters={width:e,height:t,depth:n,widthSegments:r,heightSegments:i,depthSegments:a};let o=this;r=Math.floor(r),i=Math.floor(i),a=Math.floor(a);let s=[],c=[],l=[],u=[],d=0,f=0;p(`z`,`y`,`x`,-1,-1,n,t,e,a,i,0),p(`z`,`y`,`x`,1,-1,n,t,-e,a,i,1),p(`x`,`z`,`y`,1,1,e,n,t,r,a,2),p(`x`,`z`,`y`,1,-1,e,n,-t,r,a,3),p(`x`,`y`,`z`,1,-1,e,t,n,r,i,4),p(`x`,`y`,`z`,-1,-1,e,t,-n,r,i,5),this.setIndex(s),this.setAttribute(`position`,new Cr(c,3)),this.setAttribute(`normal`,new Cr(l,3)),this.setAttribute(`uv`,new Cr(u,2));function p(e,t,n,r,i,a,p,m,h,g,_){let v=a/h,y=p/g,b=a/2,x=p/2,S=m/2,C=h+1,w=g+1,T=0,E=0,D=new W;for(let a=0;a<w;a++){let o=a*y-x;for(let s=0;s<C;s++)D[e]=(s*v-b)*r,D[t]=o*i,D[n]=S,c.push(D.x,D.y,D.z),D[e]=0,D[t]=0,D[n]=m>0?1:-1,l.push(D.x,D.y,D.z),u.push(s/h),u.push(1-a/g),T+=1}for(let e=0;e<g;e++)for(let t=0;t<h;t++){let n=d+t+C*e,r=d+t+C*(e+1),i=d+(t+1)+C*(e+1),a=d+(t+1)+C*e;s.push(n,r,a),s.push(r,i,a),E+=6}o.addGroup(f,E,_),f+=E,d+=T}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(t){return new e(t.width,t.height,t.depth,t.widthSegments,t.heightSegments,t.depthSegments)}},Ni=class e extends Fr{constructor(e=1,t=1,n=4,r=8,i=1){super(),this.type=`CapsuleGeometry`,this.parameters={radius:e,height:t,capSegments:n,radialSegments:r,heightSegments:i},t=Math.max(0,t),n=Math.max(1,Math.floor(n)),r=Math.max(3,Math.floor(r)),i=Math.max(1,Math.floor(i));let a=[],o=[],s=[],c=[],l=t/2,u=Math.PI/2*e,d=t,f=2*u+d,p=n*2+i,m=r+1,h=new W,g=new W;for(let _=0;_<=p;_++){let v=0,y=0,b=0,x=0;if(_<=n){let t=_/n,r=t*Math.PI/2;y=-l-e*Math.cos(r),b=e*Math.sin(r),x=-e*Math.cos(r),v=t*u}else if(_<=n+i){let r=(_-n)/i;y=-l+r*t,b=e,x=0,v=u+r*d}else{let t=(_-n-i)/n,r=t*Math.PI/2;y=l+e*Math.sin(r),b=e*Math.cos(r),x=e*Math.sin(r),v=u+d+t*u}let S=Math.max(0,Math.min(1,v/f)),C=0;_===0?C=.5/r:_===p&&(C=-.5/r);for(let e=0;e<=r;e++){let t=e/r,n=t*Math.PI*2,i=Math.sin(n),a=Math.cos(n);g.x=-b*a,g.y=y,g.z=b*i,o.push(g.x,g.y,g.z),h.set(-b*a,x,b*i),h.normalize(),s.push(h.x,h.y,h.z),c.push(t+C,S)}if(_>0){let e=(_-1)*m;for(let t=0;t<r;t++){let n=e+t,r=e+t+1,i=_*m+t,o=_*m+t+1;a.push(n,r,i),a.push(r,o,i)}}}this.setIndex(a),this.setAttribute(`position`,new Cr(o,3)),this.setAttribute(`normal`,new Cr(s,3)),this.setAttribute(`uv`,new Cr(c,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(t){return new e(t.radius,t.height,t.capSegments,t.radialSegments,t.heightSegments)}},Pi=class e extends Fr{constructor(e=1,t=32,n=0,r=Math.PI*2){super(),this.type=`CircleGeometry`,this.parameters={radius:e,segments:t,thetaStart:n,thetaLength:r},t=Math.max(3,t);let i=[],a=[],o=[],s=[],c=new W,l=new U;a.push(0,0,0),o.push(0,0,1),s.push(.5,.5);for(let i=0,u=3;i<=t;i++,u+=3){let d=n+i/t*r;c.x=e*Math.cos(d),c.y=e*Math.sin(d),a.push(c.x,c.y,c.z),o.push(0,0,1),l.x=(a[u]/e+1)/2,l.y=(a[u+1]/e+1)/2,s.push(l.x,l.y)}for(let e=1;e<=t;e++)i.push(e,e+1,0);this.setIndex(i),this.setAttribute(`position`,new Cr(a,3)),this.setAttribute(`normal`,new Cr(o,3)),this.setAttribute(`uv`,new Cr(s,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(t){return new e(t.radius,t.segments,t.thetaStart,t.thetaLength)}},X=class e extends Fr{constructor(e=1,t=1,n=1,r=32,i=1,a=!1,o=0,s=Math.PI*2){super(),this.type=`CylinderGeometry`,this.parameters={radiusTop:e,radiusBottom:t,height:n,radialSegments:r,heightSegments:i,openEnded:a,thetaStart:o,thetaLength:s};let c=this;r=Math.floor(r),i=Math.floor(i);let l=[],u=[],d=[],f=[],p=0,m=[],h=n/2,g=0;_(),a===!1&&(e>0&&v(!0),t>0&&v(!1)),this.setIndex(l),this.setAttribute(`position`,new Cr(u,3)),this.setAttribute(`normal`,new Cr(d,3)),this.setAttribute(`uv`,new Cr(f,2));function _(){let a=new W,_=new W,v=0,y=(t-e)/n;for(let c=0;c<=i;c++){let l=[],g=c/i,v=g*(t-e)+e;for(let e=0;e<=r;e++){let t=e/r,i=t*s+o,c=Math.sin(i),m=Math.cos(i);_.x=v*c,_.y=-g*n+h,_.z=v*m,u.push(_.x,_.y,_.z),a.set(c,y,m).normalize(),d.push(a.x,a.y,a.z),f.push(t,1-g),l.push(p++)}m.push(l)}for(let n=0;n<r;n++)for(let r=0;r<i;r++){let a=m[r][n],o=m[r+1][n],s=m[r+1][n+1],c=m[r][n+1];(e>0||r!==0)&&(l.push(a,o,c),v+=3),(t>0||r!==i-1)&&(l.push(o,s,c),v+=3)}c.addGroup(g,v,0),g+=v}function v(n){let i=p,a=new U,m=new W,_=0,v=n===!0?e:t,y=n===!0?1:-1;for(let e=1;e<=r;e++)u.push(0,h*y,0),d.push(0,y,0),f.push(.5,.5),p++;let b=p;for(let e=0;e<=r;e++){let t=e/r*s+o,n=Math.cos(t),i=Math.sin(t);m.x=v*i,m.y=h*y,m.z=v*n,u.push(m.x,m.y,m.z),d.push(0,y,0),a.x=n*.5+.5,a.y=i*.5*y+.5,f.push(a.x,a.y),p++}for(let e=0;e<r;e++){let t=i+e,r=b+e;n===!0?l.push(r,r+1,t):l.push(r+1,r,t),_+=3}c.addGroup(g,_,n===!0?1:2),g+=_}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(t){return new e(t.radiusTop,t.radiusBottom,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}},Fi=class e extends X{constructor(e=1,t=1,n=32,r=1,i=!1,a=0,o=Math.PI*2){super(0,e,t,n,r,i,a,o),this.type=`ConeGeometry`,this.parameters={radius:e,height:t,radialSegments:n,heightSegments:r,openEnded:i,thetaStart:a,thetaLength:o}}static fromJSON(t){return new e(t.radius,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}},Ii=class e extends Fr{constructor(e=[],t=[],n=1,r=0){super(),this.type=`PolyhedronGeometry`,this.parameters={vertices:e,indices:t,radius:n,detail:r};let i=[],a=[];o(r),c(n),l(),this.setAttribute(`position`,new Cr(i,3)),this.setAttribute(`normal`,new Cr(i.slice(),3)),this.setAttribute(`uv`,new Cr(a,2)),r===0?this.computeVertexNormals():this.normalizeNormals();function o(e){let n=new W,r=new W,i=new W;for(let a=0;a<t.length;a+=3)f(t[a+0],n),f(t[a+1],r),f(t[a+2],i),s(n,r,i,e)}function s(e,t,n,r){let i=r+1,a=[];for(let r=0;r<=i;r++){a[r]=[];let o=e.clone().lerp(n,r/i),s=t.clone().lerp(n,r/i),c=i-r;for(let e=0;e<=c;e++)e===0&&r===i?a[r][e]=o:a[r][e]=o.clone().lerp(s,e/c)}for(let e=0;e<i;e++)for(let t=0;t<2*(i-e)-1;t++){let n=Math.floor(t/2);t%2==0?(d(a[e][n+1]),d(a[e+1][n]),d(a[e][n])):(d(a[e][n+1]),d(a[e+1][n+1]),d(a[e+1][n]))}}function c(e){let t=new W;for(let n=0;n<i.length;n+=3)t.x=i[n+0],t.y=i[n+1],t.z=i[n+2],t.normalize().multiplyScalar(e),i[n+0]=t.x,i[n+1]=t.y,i[n+2]=t.z}function l(){let e=new W;for(let t=0;t<i.length;t+=3){e.x=i[t+0],e.y=i[t+1],e.z=i[t+2];let n=h(e)/2/Math.PI+.5,r=g(e)/Math.PI+.5;a.push(n,1-r)}p(),u()}function u(){for(let e=0;e<a.length;e+=6){let t=a[e+0],n=a[e+2],r=a[e+4];Math.max(t,n,r)>.9&&Math.min(t,n,r)<.1&&(t<.2&&(a[e+0]+=1),n<.2&&(a[e+2]+=1),r<.2&&(a[e+4]+=1))}}function d(e){i.push(e.x,e.y,e.z)}function f(t,n){let r=t*3;n.x=e[r+0],n.y=e[r+1],n.z=e[r+2]}function p(){let e=new W,t=new W,n=new W,r=new W,o=new U,s=new U,c=new U;for(let l=0,u=0;l<i.length;l+=9,u+=6){e.set(i[l+0],i[l+1],i[l+2]),t.set(i[l+3],i[l+4],i[l+5]),n.set(i[l+6],i[l+7],i[l+8]),o.set(a[u+0],a[u+1]),s.set(a[u+2],a[u+3]),c.set(a[u+4],a[u+5]),r.copy(e).add(t).add(n).divideScalar(3);let d=h(r);m(o,u+0,e,d),m(s,u+2,t,d),m(c,u+4,n,d)}}function m(e,t,n,r){r<0&&e.x===1&&(a[t]=e.x-1),n.x===0&&n.z===0&&(a[t]=r/2/Math.PI+.5)}function h(e){return Math.atan2(e.z,-e.x)}function g(e){return Math.atan2(-e.y,Math.sqrt(e.x*e.x+e.z*e.z))}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(t){return new e(t.vertices,t.indices,t.radius,t.detail)}},Li=class e extends Ii{constructor(e=1,t=0){let n=(1+Math.sqrt(5))/2,r=1/n,i=[-1,-1,-1,-1,-1,1,-1,1,-1,-1,1,1,1,-1,-1,1,-1,1,1,1,-1,1,1,1,0,-r,-n,0,-r,n,0,r,-n,0,r,n,-r,-n,0,-r,n,0,r,-n,0,r,n,0,-n,0,-r,n,0,-r,-n,0,r,n,0,r];super(i,[3,11,7,3,7,15,3,15,13,7,19,17,7,17,6,7,6,15,17,4,8,17,8,10,17,10,6,8,0,16,8,16,2,8,2,10,0,12,1,0,1,18,0,18,16,6,10,2,6,2,13,6,13,15,2,16,18,2,18,3,2,3,13,18,1,9,18,9,11,18,11,3,4,14,12,4,12,0,4,0,8,11,9,5,11,5,19,11,19,7,19,5,14,19,14,4,19,4,17,1,12,14,1,14,5,1,5,9],e,t),this.type=`DodecahedronGeometry`,this.parameters={radius:e,detail:t}}static fromJSON(t){return new e(t.radius,t.detail)}},Ri=class{constructor(){this.type=`Curve`,this.arcLengthDivisions=200,this.needsUpdate=!1,this.cacheArcLengths=null}getPoint(){z(`Curve: .getPoint() not implemented.`)}getPointAt(e,t){let n=this.getUtoTmapping(e);return this.getPoint(n,t)}getPoints(e=5){let t=[];for(let n=0;n<=e;n++)t.push(this.getPoint(n/e));return t}getSpacedPoints(e=5){let t=[];for(let n=0;n<=e;n++)t.push(this.getPointAt(n/e));return t}getLength(){let e=this.getLengths();return e[e.length-1]}getLengths(e=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===e+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;let t=[],n,r=this.getPoint(0),i=0;t.push(0);for(let a=1;a<=e;a++)n=this.getPoint(a/e),i+=n.distanceTo(r),t.push(i),r=n;return this.cacheArcLengths=t,t}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(e,t=null){let n=this.getLengths(),r=0,i=n.length,a;a=t||e*n[i-1];let o=0,s=i-1,c;for(;o<=s;)if(r=Math.floor(o+(s-o)/2),c=n[r]-a,c<0)o=r+1;else if(c>0)s=r-1;else{s=r;break}if(r=s,n[r]===a)return r/(i-1);let l=n[r],u=n[r+1]-l,d=(a-l)/u;return(r+d)/(i-1)}getTangent(e,t){let n=1e-4,r=e-n,i=e+n;r<0&&(r=0),i>1&&(i=1);let a=this.getPoint(r),o=this.getPoint(i),s=t||(a.isVector2?new U:new W);return s.copy(o).sub(a).normalize(),s}getTangentAt(e,t){let n=this.getUtoTmapping(e);return this.getTangent(n,t)}computeFrenetFrames(e,t=!1){let n=new W,r=[],i=[],a=[],o=new W,s=new an;for(let t=0;t<=e;t++){let n=t/e;r[t]=this.getTangentAt(n,new W)}i[0]=new W,a[0]=new W;let c=Number.MAX_VALUE,l=Math.abs(r[0].x),u=Math.abs(r[0].y),d=Math.abs(r[0].z);l<=c&&(c=l,n.set(1,0,0)),u<=c&&(c=u,n.set(0,1,0)),d<=c&&n.set(0,0,1),o.crossVectors(r[0],n).normalize(),i[0].crossVectors(r[0],o),a[0].crossVectors(r[0],i[0]);for(let t=1;t<=e;t++){if(i[t]=i[t-1].clone(),a[t]=a[t-1].clone(),o.crossVectors(r[t-1],r[t]),o.length()>2**-52){o.normalize();let e=Math.acos(V(r[t-1].dot(r[t]),-1,1));i[t].applyMatrix4(s.makeRotationAxis(o,e))}a[t].crossVectors(r[t],i[t])}if(t===!0){let t=Math.acos(V(i[0].dot(i[e]),-1,1));t/=e,r[0].dot(o.crossVectors(i[0],i[e]))>0&&(t=-t);for(let n=1;n<=e;n++)i[n].applyMatrix4(s.makeRotationAxis(r[n],t*n)),a[n].crossVectors(r[n],i[n])}return{tangents:r,normals:i,binormals:a}}clone(){return new this.constructor().copy(this)}copy(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}toJSON(){let e={metadata:{version:4.7,type:`Curve`,generator:`Curve.toJSON`}};return e.arcLengthDivisions=this.arcLengthDivisions,e.type=this.type,e}fromJSON(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}},zi=class extends Ri{constructor(e=0,t=0,n=1,r=1,i=0,a=Math.PI*2,o=!1,s=0){super(),this.isEllipseCurve=!0,this.type=`EllipseCurve`,this.aX=e,this.aY=t,this.xRadius=n,this.yRadius=r,this.aStartAngle=i,this.aEndAngle=a,this.aClockwise=o,this.aRotation=s}getPoint(e,t=new U){let n=t,r=Math.PI*2,i=this.aEndAngle-this.aStartAngle,a=Math.abs(i)<2**-52;for(;i<0;)i+=r;for(;i>r;)i-=r;i<2**-52&&(i=a?0:r),this.aClockwise===!0&&!a&&(i===r?i=-r:i-=r);let o=this.aStartAngle+e*i,s=this.aX+this.xRadius*Math.cos(o),c=this.aY+this.yRadius*Math.sin(o);if(this.aRotation!==0){let e=Math.cos(this.aRotation),t=Math.sin(this.aRotation),n=s-this.aX,r=c-this.aY;s=n*e-r*t+this.aX,c=n*t+r*e+this.aY}return n.set(s,c)}copy(e){return super.copy(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}toJSON(){let e=super.toJSON();return e.aX=this.aX,e.aY=this.aY,e.xRadius=this.xRadius,e.yRadius=this.yRadius,e.aStartAngle=this.aStartAngle,e.aEndAngle=this.aEndAngle,e.aClockwise=this.aClockwise,e.aRotation=this.aRotation,e}fromJSON(e){return super.fromJSON(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}},Bi=class extends zi{constructor(e,t,n,r,i,a){super(e,t,n,n,r,i,a),this.isArcCurve=!0,this.type=`ArcCurve`}};function Vi(){let e=0,t=0,n=0,r=0;function i(i,a,o,s){e=i,t=o,n=-3*i+3*a-2*o-s,r=2*i-2*a+o+s}return{initCatmullRom:function(e,t,n,r,a){i(t,n,a*(n-e),a*(r-t))},initNonuniformCatmullRom:function(e,t,n,r,a,o,s){let c=(t-e)/a-(n-e)/(a+o)+(n-t)/o,l=(n-t)/o-(r-t)/(o+s)+(r-n)/s;c*=o,l*=o,i(t,n,c,l)},calc:function(i){let a=i*i,o=a*i;return e+t*i+n*a+r*o}}}var Hi=new W,Ui=new W,Wi=new Vi,Gi=new Vi,Ki=new Vi,qi=class extends Ri{constructor(e=[],t=!1,n=`centripetal`,r=.5){super(),this.isCatmullRomCurve3=!0,this.type=`CatmullRomCurve3`,this.points=e,this.closed=t,this.curveType=n,this.tension=r}getPoint(e,t=new W){let n=t,r=this.points,i=r.length,a=(i-+!this.closed)*e,o=Math.floor(a),s=a-o;this.closed?o+=o>0?0:(Math.floor(Math.abs(o)/i)+1)*i:s===0&&o===i-1&&(o=i-2,s=1);let c,l;this.closed||o>0?c=r[(o-1)%i]:(Ui.subVectors(r[0],r[1]).add(r[0]),c=Ui);let u=r[o%i],d=r[(o+1)%i];if(this.closed||o+2<i?l=r[(o+2)%i]:(Hi.subVectors(r[i-1],r[i-2]).add(r[i-1]),l=Hi),this.curveType===`centripetal`||this.curveType===`chordal`){let e=this.curveType===`chordal`?.5:.25,t=c.distanceToSquared(u)**+e,n=u.distanceToSquared(d)**+e,r=d.distanceToSquared(l)**+e;n<1e-4&&(n=1),t<1e-4&&(t=n),r<1e-4&&(r=n),Wi.initNonuniformCatmullRom(c.x,u.x,d.x,l.x,t,n,r),Gi.initNonuniformCatmullRom(c.y,u.y,d.y,l.y,t,n,r),Ki.initNonuniformCatmullRom(c.z,u.z,d.z,l.z,t,n,r)}else this.curveType===`catmullrom`&&(Wi.initCatmullRom(c.x,u.x,d.x,l.x,this.tension),Gi.initCatmullRom(c.y,u.y,d.y,l.y,this.tension),Ki.initCatmullRom(c.z,u.z,d.z,l.z,this.tension));return n.set(Wi.calc(s),Gi.calc(s),Ki.calc(s)),n}copy(e){super.copy(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){let n=e.points[t];this.points.push(n.clone())}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}toJSON(){let e=super.toJSON();e.points=[];for(let t=0,n=this.points.length;t<n;t++){let n=this.points[t];e.points.push(n.toArray())}return e.closed=this.closed,e.curveType=this.curveType,e.tension=this.tension,e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){let n=e.points[t];this.points.push(new W().fromArray(n))}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}};function Ji(e,t,n,r,i){let a=(r-t)*.5,o=(i-n)*.5,s=e*e,c=e*s;return(2*n-2*r+a+o)*c+(-3*n+3*r-2*a-o)*s+a*e+n}function Yi(e,t){let n=1-e;return n*n*t}function Xi(e,t){return 2*(1-e)*e*t}function Zi(e,t){return e*e*t}function Qi(e,t,n,r){return Yi(e,t)+Xi(e,n)+Zi(e,r)}function $i(e,t){let n=1-e;return n*n*n*t}function ea(e,t){let n=1-e;return 3*n*n*e*t}function ta(e,t){return 3*(1-e)*e*e*t}function na(e,t){return e*e*e*t}function ra(e,t,n,r,i){return $i(e,t)+ea(e,n)+ta(e,r)+na(e,i)}var ia=class extends Ri{constructor(e=new U,t=new U,n=new U,r=new U){super(),this.isCubicBezierCurve=!0,this.type=`CubicBezierCurve`,this.v0=e,this.v1=t,this.v2=n,this.v3=r}getPoint(e,t=new U){let n=t,r=this.v0,i=this.v1,a=this.v2,o=this.v3;return n.set(ra(e,r.x,i.x,a.x,o.x),ra(e,r.y,i.y,a.y,o.y)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}},aa=class extends Ri{constructor(e=new W,t=new W,n=new W,r=new W){super(),this.isCubicBezierCurve3=!0,this.type=`CubicBezierCurve3`,this.v0=e,this.v1=t,this.v2=n,this.v3=r}getPoint(e,t=new W){let n=t,r=this.v0,i=this.v1,a=this.v2,o=this.v3;return n.set(ra(e,r.x,i.x,a.x,o.x),ra(e,r.y,i.y,a.y,o.y),ra(e,r.z,i.z,a.z,o.z)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}},oa=class extends Ri{constructor(e=new U,t=new U){super(),this.isLineCurve=!0,this.type=`LineCurve`,this.v1=e,this.v2=t}getPoint(e,t=new U){let n=t;return e===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(e).add(this.v1)),n}getPointAt(e,t){return this.getPoint(e,t)}getTangent(e,t=new U){return t.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,t){return this.getTangent(e,t)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}},sa=class extends Ri{constructor(e=new W,t=new W){super(),this.isLineCurve3=!0,this.type=`LineCurve3`,this.v1=e,this.v2=t}getPoint(e,t=new W){let n=t;return e===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(e).add(this.v1)),n}getPointAt(e,t){return this.getPoint(e,t)}getTangent(e,t=new W){return t.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,t){return this.getTangent(e,t)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}},ca=class extends Ri{constructor(e=new U,t=new U,n=new U){super(),this.isQuadraticBezierCurve=!0,this.type=`QuadraticBezierCurve`,this.v0=e,this.v1=t,this.v2=n}getPoint(e,t=new U){let n=t,r=this.v0,i=this.v1,a=this.v2;return n.set(Qi(e,r.x,i.x,a.x),Qi(e,r.y,i.y,a.y)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}},la=class extends Ri{constructor(e=new W,t=new W,n=new W){super(),this.isQuadraticBezierCurve3=!0,this.type=`QuadraticBezierCurve3`,this.v0=e,this.v1=t,this.v2=n}getPoint(e,t=new W){let n=t,r=this.v0,i=this.v1,a=this.v2;return n.set(Qi(e,r.x,i.x,a.x),Qi(e,r.y,i.y,a.y),Qi(e,r.z,i.z,a.z)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}},ua=class extends Ri{constructor(e=[]){super(),this.isSplineCurve=!0,this.type=`SplineCurve`,this.points=e}getPoint(e,t=new U){let n=t,r=this.points,i=(r.length-1)*e,a=Math.floor(i),o=i-a,s=r[a===0?a:a-1],c=r[a],l=r[a>r.length-2?r.length-1:a+1],u=r[a>r.length-3?r.length-1:a+2];return n.set(Ji(o,s.x,c.x,l.x,u.x),Ji(o,s.y,c.y,l.y,u.y)),n}copy(e){super.copy(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){let n=e.points[t];this.points.push(n.clone())}return this}toJSON(){let e=super.toJSON();e.points=[];for(let t=0,n=this.points.length;t<n;t++){let n=this.points[t];e.points.push(n.toArray())}return e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){let n=e.points[t];this.points.push(new U().fromArray(n))}return this}},da=Object.freeze({__proto__:null,ArcCurve:Bi,CatmullRomCurve3:qi,CubicBezierCurve:ia,CubicBezierCurve3:aa,EllipseCurve:zi,LineCurve:oa,LineCurve3:sa,QuadraticBezierCurve:ca,QuadraticBezierCurve3:la,SplineCurve:ua}),fa=class extends Ri{constructor(){super(),this.type=`CurvePath`,this.curves=[],this.autoClose=!1}add(e){this.curves.push(e)}closePath(){let e=this.curves[0].getPoint(0),t=this.curves[this.curves.length-1].getPoint(1);if(!e.equals(t)){let n=e.isVector2===!0?`LineCurve`:`LineCurve3`;this.curves.push(new da[n](t,e))}return this}getPoint(e,t){let n=e*this.getLength(),r=this.getCurveLengths(),i=0;for(;i<r.length;){if(r[i]>=n){let e=r[i]-n,a=this.curves[i],o=a.getLength(),s=o===0?0:1-e/o;return a.getPointAt(s,t)}i++}return null}getLength(){let e=this.getCurveLengths();return e[e.length-1]}updateArcLengths(){this.needsUpdate=!0,this.cacheLengths=null,this.getCurveLengths()}getCurveLengths(){if(this.cacheLengths&&this.cacheLengths.length===this.curves.length)return this.cacheLengths;let e=[],t=0;for(let n=0,r=this.curves.length;n<r;n++)t+=this.curves[n].getLength(),e.push(t);return this.cacheLengths=e,e}getSpacedPoints(e=40){let t=[];for(let n=0;n<=e;n++)t.push(this.getPoint(n/e));return this.autoClose&&t.push(t[0]),t}getPoints(e=12){let t=[],n;for(let r=0,i=this.curves;r<i.length;r++){let a=i[r],o=a.isEllipseCurve?e*2:a.isLineCurve||a.isLineCurve3?1:a.isSplineCurve?e*a.points.length:e,s=a.getPoints(o);for(let e=0;e<s.length;e++){let r=s[e];n&&n.equals(r)||(t.push(r),n=r)}}return this.autoClose&&t.length>1&&!t[t.length-1].equals(t[0])&&t.push(t[0]),t}copy(e){super.copy(e),this.curves=[];for(let t=0,n=e.curves.length;t<n;t++){let n=e.curves[t];this.curves.push(n.clone())}return this.autoClose=e.autoClose,this}toJSON(){let e=super.toJSON();e.autoClose=this.autoClose,e.curves=[];for(let t=0,n=this.curves.length;t<n;t++){let n=this.curves[t];e.curves.push(n.toJSON())}return e}fromJSON(e){super.fromJSON(e),this.autoClose=e.autoClose,this.curves=[];for(let t=0,n=e.curves.length;t<n;t++){let n=e.curves[t];this.curves.push(new da[n.type]().fromJSON(n))}return this}},pa=class extends fa{constructor(e){super(),this.type=`Path`,this.currentPoint=new U,e&&this.setFromPoints(e)}setFromPoints(e){this.moveTo(e[0].x,e[0].y);for(let t=1,n=e.length;t<n;t++)this.lineTo(e[t].x,e[t].y);return this}moveTo(e,t){return this.currentPoint.set(e,t),this}lineTo(e,t){let n=new oa(this.currentPoint.clone(),new U(e,t));return this.curves.push(n),this.currentPoint.set(e,t),this}quadraticCurveTo(e,t,n,r){let i=new ca(this.currentPoint.clone(),new U(e,t),new U(n,r));return this.curves.push(i),this.currentPoint.set(n,r),this}bezierCurveTo(e,t,n,r,i,a){let o=new ia(this.currentPoint.clone(),new U(e,t),new U(n,r),new U(i,a));return this.curves.push(o),this.currentPoint.set(i,a),this}splineThru(e){let t=new ua([this.currentPoint.clone()].concat(e));return this.curves.push(t),this.currentPoint.copy(e[e.length-1]),this}arc(e,t,n,r,i,a){let o=this.currentPoint.x,s=this.currentPoint.y;return this.absarc(e+o,t+s,n,r,i,a),this}absarc(e,t,n,r,i,a){return this.absellipse(e,t,n,n,r,i,a),this}ellipse(e,t,n,r,i,a,o,s){let c=this.currentPoint.x,l=this.currentPoint.y;return this.absellipse(e+c,t+l,n,r,i,a,o,s),this}absellipse(e,t,n,r,i,a,o,s){let c=new zi(e,t,n,r,i,a,o,s);if(this.curves.length>0){let e=c.getPoint(0);e.equals(this.currentPoint)||this.lineTo(e.x,e.y)}this.curves.push(c);let l=c.getPoint(1);return this.currentPoint.copy(l),this}copy(e){return super.copy(e),this.currentPoint.copy(e.currentPoint),this}toJSON(){let e=super.toJSON();return e.currentPoint=this.currentPoint.toArray(),e}fromJSON(e){return super.fromJSON(e),this.currentPoint.fromArray(e.currentPoint),this}},ma=class extends pa{constructor(e){super(e),this.uuid=mt(),this.type=`Shape`,this.holes=[]}getPointsHoles(e){let t=[];for(let n=0,r=this.holes.length;n<r;n++)t[n]=this.holes[n].getPoints(e);return t}extractPoints(e){return{shape:this.getPoints(e),holes:this.getPointsHoles(e)}}copy(e){super.copy(e),this.holes=[];for(let t=0,n=e.holes.length;t<n;t++){let n=e.holes[t];this.holes.push(n.clone())}return this}toJSON(){let e=super.toJSON();e.uuid=this.uuid,e.holes=[];for(let t=0,n=this.holes.length;t<n;t++){let n=this.holes[t];e.holes.push(n.toJSON())}return e}fromJSON(e){super.fromJSON(e),this.uuid=e.uuid,this.holes=[];for(let t=0,n=e.holes.length;t<n;t++){let n=e.holes[t];this.holes.push(new pa().fromJSON(n))}return this}};function ha(e,t,n=2){let r=t&&t.length,i=r?t[0]*n:e.length,a=ga(e,0,i,n,!0),o=[];if(!a||a.next===a.prev)return o;let s,c,l;if(r&&(a=Ca(e,t,a,n)),e.length>80*n){s=e[0],c=e[1];let t=s,r=c;for(let a=n;a<i;a+=n){let n=e[a],i=e[a+1];n<s&&(s=n),i<c&&(c=i),n>t&&(t=n),i>r&&(r=i)}l=Math.max(t-s,r-c),l=l===0?0:32767/l}return va(a,o,n,s,c,l,0),o}function ga(e,t,n,r,i){let a;if(i===qa(e,t,n,r)>0)for(let i=t;i<n;i+=r)a=Wa(i/r|0,e[i],e[i+1],a);else for(let i=n-r;i>=t;i-=r)a=Wa(i/r|0,e[i],e[i+1],a);return a&&Ia(a,a.next)&&(Ga(a),a=a.next),a}function _a(e,t){if(!e)return e;t||(t=e);let n=e,r;do if(r=!1,!n.steiner&&(Ia(n,n.next)||Fa(n.prev,n,n.next)===0)){if(Ga(n),n=t=n.prev,n===n.next)break;r=!0}else n=n.next;while(r||n!==t);return t}function va(e,t,n,r,i,a,o){if(!e)return;!o&&a&&Oa(e,r,i,a);let s=e;for(;e.prev!==e.next;){let c=e.prev,l=e.next;if(a?ba(e,r,i,a):ya(e))t.push(c.i,e.i,l.i),Ga(e),e=l.next,s=l.next;else if(e=l,e===s){o?o===1?(e=xa(_a(e),t),va(e,t,n,r,i,a,2)):o===2&&Sa(e,t,n,r,i,a):va(_a(e),t,n,r,i,a,1);break}}}function ya(e){let t=e.prev,n=e,r=e.next;if(Fa(t,n,r)>=0)return!1;let i=t.x,a=n.x,o=r.x,s=t.y,c=n.y,l=r.y,u=Math.min(i,a,o),d=Math.min(s,c,l),f=Math.max(i,a,o),p=Math.max(s,c,l),m=r.next;for(;m!==t;){if(m.x>=u&&m.x<=f&&m.y>=d&&m.y<=p&&Na(i,s,a,c,o,l,m.x,m.y)&&Fa(m.prev,m,m.next)>=0)return!1;m=m.next}return!0}function ba(e,t,n,r){let i=e.prev,a=e,o=e.next;if(Fa(i,a,o)>=0)return!1;let s=i.x,c=a.x,l=o.x,u=i.y,d=a.y,f=o.y,p=Math.min(s,c,l),m=Math.min(u,d,f),h=Math.max(s,c,l),g=Math.max(u,d,f),_=Aa(p,m,t,n,r),v=Aa(h,g,t,n,r),y=e.prevZ,b=e.nextZ;for(;y&&y.z>=_&&b&&b.z<=v;){if(y.x>=p&&y.x<=h&&y.y>=m&&y.y<=g&&y!==i&&y!==o&&Na(s,u,c,d,l,f,y.x,y.y)&&Fa(y.prev,y,y.next)>=0||(y=y.prevZ,b.x>=p&&b.x<=h&&b.y>=m&&b.y<=g&&b!==i&&b!==o&&Na(s,u,c,d,l,f,b.x,b.y)&&Fa(b.prev,b,b.next)>=0))return!1;b=b.nextZ}for(;y&&y.z>=_;){if(y.x>=p&&y.x<=h&&y.y>=m&&y.y<=g&&y!==i&&y!==o&&Na(s,u,c,d,l,f,y.x,y.y)&&Fa(y.prev,y,y.next)>=0)return!1;y=y.prevZ}for(;b&&b.z<=v;){if(b.x>=p&&b.x<=h&&b.y>=m&&b.y<=g&&b!==i&&b!==o&&Na(s,u,c,d,l,f,b.x,b.y)&&Fa(b.prev,b,b.next)>=0)return!1;b=b.nextZ}return!0}function xa(e,t){let n=e;do{let r=n.prev,i=n.next.next;!Ia(r,i)&&La(r,n,n.next,i)&&Va(r,i)&&Va(i,r)&&(t.push(r.i,n.i,i.i),Ga(n),Ga(n.next),n=e=i),n=n.next}while(n!==e);return _a(n)}function Sa(e,t,n,r,i,a){let o=e;do{let e=o.next.next;for(;e!==o.prev;){if(o.i!==e.i&&Pa(o,e)){let s=Ua(o,e);o=_a(o,o.next),s=_a(s,s.next),va(o,t,n,r,i,a,0),va(s,t,n,r,i,a,0);return}e=e.next}o=o.next}while(o!==e)}function Ca(e,t,n,r){let i=[];for(let n=0,a=t.length;n<a;n++){let o=ga(e,t[n]*r,n<a-1?t[n+1]*r:e.length,r,!1);o===o.next&&(o.steiner=!0),i.push(ja(o))}i.sort(wa);for(let e=0;e<i.length;e++)n=Ta(i[e],n);return n}function wa(e,t){let n=e.x-t.x;return n===0&&(n=e.y-t.y,n===0&&(n=(e.next.y-e.y)/(e.next.x-e.x)-(t.next.y-t.y)/(t.next.x-t.x))),n}function Ta(e,t){let n=Ea(e,t);if(!n)return t;let r=Ua(n,e);return _a(r,r.next),_a(n,n.next)}function Ea(e,t){let n=t,r=e.x,i=e.y,a=-1/0,o;if(Ia(e,n))return n;do{if(Ia(e,n.next))return n.next;if(i<=n.y&&i>=n.next.y&&n.next.y!==n.y){let e=n.x+(i-n.y)*(n.next.x-n.x)/(n.next.y-n.y);if(e<=r&&e>a&&(a=e,o=n.x<n.next.x?n:n.next,e===r))return o}n=n.next}while(n!==t);if(!o)return null;let s=o,c=o.x,l=o.y,u=1/0;n=o;do{if(r>=n.x&&n.x>=c&&r!==n.x&&Ma(i<l?r:a,i,c,l,i<l?a:r,i,n.x,n.y)){let t=Math.abs(i-n.y)/(r-n.x);Va(n,e)&&(t<u||t===u&&(n.x>o.x||n.x===o.x&&Da(o,n)))&&(o=n,u=t)}n=n.next}while(n!==s);return o}function Da(e,t){return Fa(e.prev,e,t.prev)<0&&Fa(t.next,e,e.next)<0}function Oa(e,t,n,r){let i=e;do i.z===0&&(i.z=Aa(i.x,i.y,t,n,r)),i.prevZ=i.prev,i.nextZ=i.next,i=i.next;while(i!==e);i.prevZ.nextZ=null,i.prevZ=null,ka(i)}function ka(e){let t,n=1;do{let r=e,i;e=null;let a=null;for(t=0;r;){t++;let o=r,s=0;for(let e=0;e<n&&(s++,o=o.nextZ,o);e++);let c=n;for(;s>0||c>0&&o;)s!==0&&(c===0||!o||r.z<=o.z)?(i=r,r=r.nextZ,s--):(i=o,o=o.nextZ,c--),a?a.nextZ=i:e=i,i.prevZ=a,a=i;r=o}a.nextZ=null,n*=2}while(t>1);return e}function Aa(e,t,n,r,i){return e=(e-n)*i|0,t=(t-r)*i|0,e=(e|e<<8)&16711935,e=(e|e<<4)&252645135,e=(e|e<<2)&858993459,e=(e|e<<1)&1431655765,t=(t|t<<8)&16711935,t=(t|t<<4)&252645135,t=(t|t<<2)&858993459,t=(t|t<<1)&1431655765,e|t<<1}function ja(e){let t=e,n=e;do(t.x<n.x||t.x===n.x&&t.y<n.y)&&(n=t),t=t.next;while(t!==e);return n}function Ma(e,t,n,r,i,a,o,s){return(i-o)*(t-s)>=(e-o)*(a-s)&&(e-o)*(r-s)>=(n-o)*(t-s)&&(n-o)*(a-s)>=(i-o)*(r-s)}function Na(e,t,n,r,i,a,o,s){return(e!==o||t!==s)&&Ma(e,t,n,r,i,a,o,s)}function Pa(e,t){return e.next.i!==t.i&&e.prev.i!==t.i&&!Ba(e,t)&&(Va(e,t)&&Va(t,e)&&Ha(e,t)&&(Fa(e.prev,e,t.prev)||Fa(e,t.prev,t))||Ia(e,t)&&Fa(e.prev,e,e.next)>0&&Fa(t.prev,t,t.next)>0)}function Fa(e,t,n){return(t.y-e.y)*(n.x-t.x)-(t.x-e.x)*(n.y-t.y)}function Ia(e,t){return e.x===t.x&&e.y===t.y}function La(e,t,n,r){let i=za(Fa(e,t,n)),a=za(Fa(e,t,r)),o=za(Fa(n,r,e)),s=za(Fa(n,r,t));return!!(i!==a&&o!==s||i===0&&Ra(e,n,t)||a===0&&Ra(e,r,t)||o===0&&Ra(n,e,r)||s===0&&Ra(n,t,r))}function Ra(e,t,n){return t.x<=Math.max(e.x,n.x)&&t.x>=Math.min(e.x,n.x)&&t.y<=Math.max(e.y,n.y)&&t.y>=Math.min(e.y,n.y)}function za(e){return e>0?1:e<0?-1:0}function Ba(e,t){let n=e;do{if(n.i!==e.i&&n.next.i!==e.i&&n.i!==t.i&&n.next.i!==t.i&&La(n,n.next,e,t))return!0;n=n.next}while(n!==e);return!1}function Va(e,t){return Fa(e.prev,e,e.next)<0?Fa(e,t,e.next)>=0&&Fa(e,e.prev,t)>=0:Fa(e,t,e.prev)<0||Fa(e,e.next,t)<0}function Ha(e,t){let n=e,r=!1,i=(e.x+t.x)/2,a=(e.y+t.y)/2;do n.y>a!=n.next.y>a&&n.next.y!==n.y&&i<(n.next.x-n.x)*(a-n.y)/(n.next.y-n.y)+n.x&&(r=!r),n=n.next;while(n!==e);return r}function Ua(e,t){let n=Ka(e.i,e.x,e.y),r=Ka(t.i,t.x,t.y),i=e.next,a=t.prev;return e.next=t,t.prev=e,n.next=i,i.prev=n,r.next=n,n.prev=r,a.next=r,r.prev=a,r}function Wa(e,t,n,r){let i=Ka(e,t,n);return r?(i.next=r.next,i.prev=r,r.next.prev=i,r.next=i):(i.prev=i,i.next=i),i}function Ga(e){e.next.prev=e.prev,e.prev.next=e.next,e.prevZ&&(e.prevZ.nextZ=e.nextZ),e.nextZ&&(e.nextZ.prevZ=e.prevZ)}function Ka(e,t,n){return{i:e,x:t,y:n,prev:null,next:null,z:0,prevZ:null,nextZ:null,steiner:!1}}function qa(e,t,n,r){let i=0;for(let a=t,o=n-r;a<n;a+=r)i+=(e[o]-e[a])*(e[a+1]+e[o+1]),o=a;return i}var Ja=class{static triangulate(e,t,n=2){return ha(e,t,n)}},Ya=class e{static area(e){let t=e.length,n=0;for(let r=t-1,i=0;i<t;r=i++)n+=e[r].x*e[i].y-e[i].x*e[r].y;return n*.5}static isClockWise(t){return e.area(t)<0}static triangulateShape(e,t){let n=[],r=[],i=[];Xa(e),Za(n,e);let a=e.length;t.forEach(Xa);for(let e=0;e<t.length;e++)r.push(a),a+=t[e].length,Za(n,t[e]);let o=Ja.triangulate(n,r);for(let e=0;e<o.length;e+=3)i.push(o.slice(e,e+3));return i}};function Xa(e){let t=e.length;t>2&&e[t-1].equals(e[0])&&e.pop()}function Za(e,t){for(let n=0;n<t.length;n++)e.push(t[n].x),e.push(t[n].y)}var Qa=class e extends Fr{constructor(e=new ma([new U(.5,.5),new U(-.5,.5),new U(-.5,-.5),new U(.5,-.5)]),t={}){super(),this.type=`ExtrudeGeometry`,this.parameters={shapes:e,options:t},e=Array.isArray(e)?e:[e];let n=this,r=[],i=[];for(let t=0,n=e.length;t<n;t++){let n=e[t];a(n)}this.setAttribute(`position`,new Cr(r,3)),this.setAttribute(`uv`,new Cr(i,2)),this.computeVertexNormals();function a(e){let a=[],o=t.curveSegments===void 0?12:t.curveSegments,s=t.steps===void 0?1:t.steps,c=t.depth===void 0?1:t.depth,l=t.bevelEnabled===void 0||t.bevelEnabled,u=t.bevelThickness===void 0?.2:t.bevelThickness,d=t.bevelSize===void 0?u-.1:t.bevelSize,f=t.bevelOffset===void 0?0:t.bevelOffset,p=t.bevelSegments===void 0?3:t.bevelSegments,m=t.extrudePath,h=t.UVGenerator===void 0?$a:t.UVGenerator,g,_=!1,v,y,b,x;if(m){g=m.getSpacedPoints(s),_=!0,l=!1;let e=m.isCatmullRomCurve3?m.closed:!1;v=m.computeFrenetFrames(s,e),y=new W,b=new W,x=new W}l||(p=0,u=0,d=0,f=0);let S=e.extractPoints(o),C=S.shape,w=S.holes;if(!Ya.isClockWise(C)){C=C.reverse();for(let e=0,t=w.length;e<t;e++){let t=w[e];Ya.isClockWise(t)&&(w[e]=t.reverse())}}function T(e){let t=e[0];for(let n=1;n<=e.length;n++){let r=n%e.length,i=e[r],a=i.x-t.x,o=i.y-t.y,s=a*a+o*o,c=Math.max(Math.abs(i.x),Math.abs(i.y),Math.abs(t.x),Math.abs(t.y));s<=10000000000000001e-36*c*c?(e.splice(r,1),n--):t=i}}T(C),w.forEach(T);let E=w.length,D=C;for(let e=0;e<E;e++){let t=w[e];C=C.concat(t)}function O(e,t,n){return t||B(`ExtrudeGeometry: vec does not exist`),e.clone().addScaledVector(t,n)}let k=C.length;function A(e,t,n){let r,i,a,o=e.x-t.x,s=e.y-t.y,c=n.x-e.x,l=n.y-e.y,u=o*o+s*s,d=o*l-s*c;if(Math.abs(d)>2**-52){let d=Math.sqrt(u),f=Math.sqrt(c*c+l*l),p=t.x-s/d,m=t.y+o/d,h=n.x-l/f,g=n.y+c/f,_=((h-p)*l-(g-m)*c)/(o*l-s*c);r=p+o*_-e.x,i=m+s*_-e.y;let v=r*r+i*i;if(v<=2)return new U(r,i);a=Math.sqrt(v/2)}else{let e=!1;o>2**-52?c>2**-52&&(e=!0):o<-(2**-52)?c<-(2**-52)&&(e=!0):Math.sign(s)===Math.sign(l)&&(e=!0),e?(r=-s,i=o,a=Math.sqrt(u)):(r=o,i=s,a=Math.sqrt(u/2))}return new U(r/a,i/a)}let j=[];for(let e=0,t=D.length,n=t-1,r=e+1;e<t;e++,n++,r++)n===t&&(n=0),r===t&&(r=0),j[e]=A(D[e],D[n],D[r]);let M=[],N,ee=j.concat();for(let e=0,t=E;e<t;e++){let t=w[e];N=[];for(let e=0,n=t.length,r=n-1,i=e+1;e<n;e++,r++,i++)r===n&&(r=0),i===n&&(i=0),N[e]=A(t[e],t[r],t[i]);M.push(N),ee=ee.concat(N)}let P;if(p===0)P=Ya.triangulateShape(D,w);else{let e=[],t=[];for(let n=0;n<p;n++){let r=n/p,i=u*Math.cos(r*Math.PI/2),a=d*Math.sin(r*Math.PI/2)+f;for(let t=0,n=D.length;t<n;t++){let n=O(D[t],j[t],a);oe(n.x,n.y,-i),r===0&&e.push(n)}for(let e=0,n=E;e<n;e++){let n=w[e];N=M[e];let o=[];for(let e=0,t=n.length;e<t;e++){let t=O(n[e],N[e],a);oe(t.x,t.y,-i),r===0&&o.push(t)}r===0&&t.push(o)}}P=Ya.triangulateShape(e,t)}let te=P.length,ne=d+f;for(let e=0;e<k;e++){let t=l?O(C[e],ee[e],ne):C[e];_?(b.copy(v.normals[0]).multiplyScalar(t.x),y.copy(v.binormals[0]).multiplyScalar(t.y),x.copy(g[0]).add(b).add(y),oe(x.x,x.y,x.z)):oe(t.x,t.y,0)}for(let e=1;e<=s;e++)for(let t=0;t<k;t++){let n=l?O(C[t],ee[t],ne):C[t];_?(b.copy(v.normals[e]).multiplyScalar(n.x),y.copy(v.binormals[e]).multiplyScalar(n.y),x.copy(g[e]).add(b).add(y),oe(x.x,x.y,x.z)):oe(n.x,n.y,c/s*e)}for(let e=p-1;e>=0;e--){let t=e/p,n=u*Math.cos(t*Math.PI/2),r=d*Math.sin(t*Math.PI/2)+f;for(let e=0,t=D.length;e<t;e++){let t=O(D[e],j[e],r);oe(t.x,t.y,c+n)}for(let e=0,t=w.length;e<t;e++){let t=w[e];N=M[e];for(let e=0,i=t.length;e<i;e++){let i=O(t[e],N[e],r);_?oe(i.x,i.y+g[s-1].y,g[s-1].x+n):oe(i.x,i.y,c+n)}}}re(),ie();function re(){let e=r.length/3;if(l){let e=0,t=k*e;for(let e=0;e<te;e++){let n=P[e];se(n[2]+t,n[1]+t,n[0]+t)}e=s+p*2,t=k*e;for(let e=0;e<te;e++){let n=P[e];se(n[0]+t,n[1]+t,n[2]+t)}}else{for(let e=0;e<te;e++){let t=P[e];se(t[2],t[1],t[0])}for(let e=0;e<te;e++){let t=P[e];se(t[0]+k*s,t[1]+k*s,t[2]+k*s)}}n.addGroup(e,r.length/3-e,0)}function ie(){let e=r.length/3,t=0;ae(D,t),t+=D.length;for(let e=0,n=w.length;e<n;e++){let n=w[e];ae(n,t),t+=n.length}n.addGroup(e,r.length/3-e,1)}function ae(e,t){let n=e.length;for(;--n>=0;){let r=n,i=n-1;i<0&&(i=e.length-1);for(let e=0,n=s+p*2;e<n;e++){let n=k*e,a=k*(e+1);ce(t+r+n,t+i+n,t+i+a,t+r+a)}}}function oe(e,t,n){a.push(e),a.push(t),a.push(n)}function se(e,t,i){F(e),F(t),F(i);let a=r.length/3,o=h.generateTopUV(n,r,a-3,a-2,a-1);le(o[0]),le(o[1]),le(o[2])}function ce(e,t,i,a){F(e),F(t),F(a),F(t),F(i),F(a);let o=r.length/3,s=h.generateSideWallUV(n,r,o-6,o-3,o-2,o-1);le(s[0]),le(s[1]),le(s[3]),le(s[1]),le(s[2]),le(s[3])}function F(e){r.push(a[e*3+0]),r.push(a[e*3+1]),r.push(a[e*3+2])}function le(e){i.push(e.x),i.push(e.y)}}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}toJSON(){let e=super.toJSON(),t=this.parameters.shapes,n=this.parameters.options;return eo(t,n,e)}static fromJSON(t,n){let r=[];for(let e=0,i=t.shapes.length;e<i;e++){let i=n[t.shapes[e]];r.push(i)}let i=t.options.extrudePath;return i!==void 0&&(t.options.extrudePath=new da[i.type]().fromJSON(i)),new e(r,t.options)}},$a={generateTopUV:function(e,t,n,r,i){let a=t[n*3],o=t[n*3+1],s=t[r*3],c=t[r*3+1],l=t[i*3],u=t[i*3+1];return[new U(a,o),new U(s,c),new U(l,u)]},generateSideWallUV:function(e,t,n,r,i,a){let o=t[n*3],s=t[n*3+1],c=t[n*3+2],l=t[r*3],u=t[r*3+1],d=t[r*3+2],f=t[i*3],p=t[i*3+1],m=t[i*3+2],h=t[a*3],g=t[a*3+1],_=t[a*3+2];return Math.abs(s-u)<Math.abs(o-l)?[new U(o,1-c),new U(l,1-d),new U(f,1-m),new U(h,1-_)]:[new U(s,1-c),new U(u,1-d),new U(p,1-m),new U(g,1-_)]}};function eo(e,t,n){if(n.shapes=[],Array.isArray(e))for(let t=0,r=e.length;t<r;t++){let r=e[t];n.shapes.push(r.uuid)}else n.shapes.push(e.uuid);return n.options=Object.assign({},t),t.extrudePath!==void 0&&(n.options.extrudePath=t.extrudePath.toJSON()),n}var to=class e extends Ii{constructor(e=1,t=0){let n=(1+Math.sqrt(5))/2,r=[-1,n,0,1,n,0,-1,-n,0,1,-n,0,0,-1,n,0,1,n,0,-1,-n,0,1,-n,n,0,-1,n,0,1,-n,0,-1,-n,0,1];super(r,[0,11,5,0,5,1,0,1,7,0,7,10,0,10,11,1,5,9,5,11,4,11,10,2,10,7,6,7,1,8,3,9,4,3,4,2,3,2,6,3,6,8,3,8,9,4,9,5,2,4,11,6,2,10,8,6,7,9,8,1],e,t),this.type=`IcosahedronGeometry`,this.parameters={radius:e,detail:t}}static fromJSON(t){return new e(t.radius,t.detail)}},no=class e extends Ii{constructor(e=1,t=0){super([1,0,0,-1,0,0,0,1,0,0,-1,0,0,0,1,0,0,-1],[0,2,4,0,4,3,0,3,5,0,5,2,1,2,5,1,5,3,1,3,4,1,4,2],e,t),this.type=`OctahedronGeometry`,this.parameters={radius:e,detail:t}}static fromJSON(t){return new e(t.radius,t.detail)}},ro=class e extends Fr{constructor(e=1,t=1,n=1,r=1){super(),this.type=`PlaneGeometry`,this.parameters={width:e,height:t,widthSegments:n,heightSegments:r};let i=e/2,a=t/2,o=Math.floor(n),s=Math.floor(r),c=o+1,l=s+1,u=e/o,d=t/s,f=[],p=[],m=[],h=[];for(let e=0;e<l;e++){let t=e*d-a;for(let n=0;n<c;n++){let r=n*u-i;p.push(r,-t,0),m.push(0,0,1),h.push(n/o),h.push(1-e/s)}}for(let e=0;e<s;e++)for(let t=0;t<o;t++){let n=t+c*e,r=t+c*(e+1),i=t+1+c*(e+1),a=t+1+c*e;f.push(n,r,a),f.push(r,i,a)}this.setIndex(f),this.setAttribute(`position`,new Cr(p,3)),this.setAttribute(`normal`,new Cr(m,3)),this.setAttribute(`uv`,new Cr(h,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(t){return new e(t.width,t.height,t.widthSegments,t.heightSegments)}},io=class e extends Fr{constructor(e=.5,t=1,n=32,r=1,i=0,a=Math.PI*2){super(),this.type=`RingGeometry`,this.parameters={innerRadius:e,outerRadius:t,thetaSegments:n,phiSegments:r,thetaStart:i,thetaLength:a},n=Math.max(3,n),r=Math.max(1,r);let o=[],s=[],c=[],l=[],u=e,d=(t-e)/r,f=new W,p=new U;for(let e=0;e<=r;e++){for(let e=0;e<=n;e++){let r=i+e/n*a;f.x=u*Math.cos(r),f.y=u*Math.sin(r),s.push(f.x,f.y,f.z),c.push(0,0,1),p.x=(f.x/t+1)/2,p.y=(f.y/t+1)/2,l.push(p.x,p.y)}u+=d}for(let e=0;e<r;e++){let t=e*(n+1);for(let e=0;e<n;e++){let r=e+t,i=r,a=r+n+1,s=r+n+2,c=r+1;o.push(i,a,c),o.push(a,s,c)}}this.setIndex(o),this.setAttribute(`position`,new Cr(s,3)),this.setAttribute(`normal`,new Cr(c,3)),this.setAttribute(`uv`,new Cr(l,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(t){return new e(t.innerRadius,t.outerRadius,t.thetaSegments,t.phiSegments,t.thetaStart,t.thetaLength)}},ao=class e extends Fr{constructor(e=1,t=32,n=16,r=0,i=Math.PI*2,a=0,o=Math.PI){super(),this.type=`SphereGeometry`,this.parameters={radius:e,widthSegments:t,heightSegments:n,phiStart:r,phiLength:i,thetaStart:a,thetaLength:o},t=Math.max(3,Math.floor(t)),n=Math.max(2,Math.floor(n));let s=Math.min(a+o,Math.PI),c=0,l=[],u=new W,d=new W,f=[],p=[],m=[],h=[];for(let f=0;f<=n;f++){let g=[],_=f/n,v=a+_*o,y=e*Math.cos(v),b=Math.sqrt(e*e-y*y),x=0;f===0&&a===0?x=.5/t:f===n&&s===Math.PI&&(x=-.5/t);for(let e=0;e<=t;e++){let n=e/t,a=r+n*i;u.x=-b*Math.cos(a),u.y=y,u.z=b*Math.sin(a),p.push(u.x,u.y,u.z),d.copy(u).normalize(),m.push(d.x,d.y,d.z),h.push(n+x,1-_),g.push(c++)}l.push(g)}for(let e=0;e<n;e++)for(let r=0;r<t;r++){let t=l[e][r+1],i=l[e][r],o=l[e+1][r],c=l[e+1][r+1];(e!==0||a>0)&&f.push(t,i,c),(e!==n-1||s<Math.PI)&&f.push(i,o,c)}this.setIndex(f),this.setAttribute(`position`,new Cr(p,3)),this.setAttribute(`normal`,new Cr(m,3)),this.setAttribute(`uv`,new Cr(h,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(t){return new e(t.radius,t.widthSegments,t.heightSegments,t.phiStart,t.phiLength,t.thetaStart,t.thetaLength)}},oo=class e extends Fr{constructor(e=1,t=.4,n=12,r=48,i=Math.PI*2,a=0,o=Math.PI*2){super(),this.type=`TorusGeometry`,this.parameters={radius:e,tube:t,radialSegments:n,tubularSegments:r,arc:i,thetaStart:a,thetaLength:o},n=Math.floor(n),r=Math.floor(r);let s=[],c=[],l=[],u=[],d=new W,f=new W,p=new W;for(let s=0;s<=n;s++){let m=a+s/n*o;for(let a=0;a<=r;a++){let o=a/r*i;f.x=(e+t*Math.cos(m))*Math.cos(o),f.y=(e+t*Math.cos(m))*Math.sin(o),f.z=t*Math.sin(m),c.push(f.x,f.y,f.z),d.x=e*Math.cos(o),d.y=e*Math.sin(o),p.subVectors(f,d).normalize(),l.push(p.x,p.y,p.z),u.push(a/r),u.push(s/n)}}for(let e=1;e<=n;e++)for(let t=1;t<=r;t++){let n=(r+1)*e+t-1,i=(r+1)*(e-1)+t-1,a=(r+1)*(e-1)+t,o=(r+1)*e+t;s.push(n,i,o),s.push(i,a,o)}this.setIndex(s),this.setAttribute(`position`,new Cr(c,3)),this.setAttribute(`normal`,new Cr(l,3)),this.setAttribute(`uv`,new Cr(u,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(t){return new e(t.radius,t.tube,t.radialSegments,t.tubularSegments,t.arc,t.thetaStart,t.thetaLength)}};function so(e){let t={};for(let n in e){t[n]={};for(let r in e[n]){let i=e[n][r];if(lo(i))i.isRenderTargetTexture?(z(`UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms().`),t[n][r]=null):t[n][r]=i.clone();else if(Array.isArray(i)){if(lo(i[0])){let e=[];for(let t=0,n=i.length;t<n;t++)e[t]=i[t].clone();t[n][r]=e}else t[n][r]=i.slice()}else t[n][r]=i}}return t}function co(e){let t={};for(let n=0;n<e.length;n++){let r=so(e[n]);for(let e in r)t[e]=r[e]}return t}function lo(e){return e&&(e.isColor||e.isMatrix3||e.isMatrix4||e.isVector2||e.isVector3||e.isVector4||e.isTexture||e.isQuaternion)}function uo(e){let t=[];for(let n=0;n<e.length;n++)t.push(e[n].clone());return t}function fo(e){let t=e.getRenderTarget();return t===null?e.outputColorSpace:t.isXRRenderTarget===!0?t.texture.colorSpace:Ht.workingColorSpace}var po={clone:so,merge:co},mo=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,ho=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`,go=class extends Vr{constructor(e){super(),this.isShaderMaterial=!0,this.type=`ShaderMaterial`,this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=mo,this.fragmentShader=ho,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=so(e.uniforms),this.uniformsGroups=uo(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this.defaultAttributeValues=Object.assign({},e.defaultAttributeValues),this.index0AttributeName=e.index0AttributeName,this.uniformsNeedUpdate=e.uniformsNeedUpdate,this}toJSON(e){let t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(let n in this.uniforms){let r=this.uniforms[n].value;r&&r.isTexture?t.uniforms[n]={type:`t`,value:r.toJSON(e).uuid}:r&&r.isColor?t.uniforms[n]={type:`c`,value:r.getHex()}:r&&r.isVector2?t.uniforms[n]={type:`v2`,value:r.toArray()}:r&&r.isVector3?t.uniforms[n]={type:`v3`,value:r.toArray()}:r&&r.isVector4?t.uniforms[n]={type:`v4`,value:r.toArray()}:r&&r.isMatrix3?t.uniforms[n]={type:`m3`,value:r.toArray()}:r&&r.isMatrix4?t.uniforms[n]={type:`m4`,value:r.toArray()}:t.uniforms[n]={value:r}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;let n={};for(let e in this.extensions)this.extensions[e]===!0&&(n[e]=!0);return Object.keys(n).length>0&&(t.extensions=n),t}fromJSON(e,t){if(super.fromJSON(e,t),e.uniforms!==void 0)for(let n in e.uniforms){let r=e.uniforms[n];switch(this.uniforms[n]={},r.type){case`t`:this.uniforms[n].value=t[r.value]||null;break;case`c`:this.uniforms[n].value=new q().setHex(r.value);break;case`v2`:this.uniforms[n].value=new U().fromArray(r.value);break;case`v3`:this.uniforms[n].value=new W().fromArray(r.value);break;case`v4`:this.uniforms[n].value=new $t().fromArray(r.value);break;case`m3`:this.uniforms[n].value=new G().fromArray(r.value);break;case`m4`:this.uniforms[n].value=new an().fromArray(r.value);break;default:this.uniforms[n].value=r.value}}if(e.defines!==void 0&&(this.defines=e.defines),e.vertexShader!==void 0&&(this.vertexShader=e.vertexShader),e.fragmentShader!==void 0&&(this.fragmentShader=e.fragmentShader),e.glslVersion!==void 0&&(this.glslVersion=e.glslVersion),e.extensions!==void 0)for(let t in e.extensions)this.extensions[t]=e.extensions[t];return e.lights!==void 0&&(this.lights=e.lights),e.clipping!==void 0&&(this.clipping=e.clipping),this}},_o=class extends go{constructor(e){super(e),this.isRawShaderMaterial=!0,this.type=`RawShaderMaterial`}},Z=class extends Vr{constructor(e){super(),this.isMeshStandardMaterial=!0,this.type=`MeshStandardMaterial`,this.defines={STANDARD:``},this.color=new q(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new q(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=0,this.normalScale=new U(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new hn,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap=`round`,this.wireframeLinejoin=`round`,this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.defines={STANDARD:``},this.color.copy(e.color),this.roughness=e.roughness,this.metalness=e.metalness,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.roughnessMap=e.roughnessMap,this.metalnessMap=e.metalnessMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.envMapIntensity=e.envMapIntensity,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}},vo=class extends Vr{constructor(e){super(),this.isMeshLambertMaterial=!0,this.type=`MeshLambertMaterial`,this.color=new q(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new q(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=0,this.normalScale=new U(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new hn,this.combine=0,this.reflectivity=1,this.envMapIntensity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap=`round`,this.wireframeLinejoin=`round`,this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.envMapIntensity=e.envMapIntensity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}},yo=class extends Vr{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type=`MeshDepthMaterial`,this.depthPacking=Ge,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}},bo=class extends Vr{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type=`MeshDistanceMaterial`,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}};function xo(e,t){return!e||e.constructor===t?e:typeof t.BYTES_PER_ELEMENT==`number`?new t(e):Array.prototype.slice.call(e)}function So(e){return e!==void 0&&e.inTangents!==void 0&&e.outTangents!==void 0}var Co=class{constructor(e,t,n,r){this.parameterPositions=e,this._cachedIndex=0,this.resultBuffer=r===void 0?new t.constructor(n):r,this.sampleValues=t,this.valueSize=n,this.settings=null,this.DefaultSettings_={}}evaluate(e){let t=this.parameterPositions,n=this._cachedIndex,r=t[n],i=t[n-1];validate_interval:{seek:{let a;linear_scan:{forward_scan:if(!(e<r)){for(let a=n+2;;){if(r===void 0){if(e<i)break forward_scan;return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}if(n===a)break;if(i=r,r=t[++n],e<r)break seek}a=t.length;break linear_scan}if(!(e>=i)){let o=t[1];e<o&&(n=2,i=o);for(let a=n-2;;){if(i===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(n===a)break;if(r=i,i=t[--n-1],e>=i)break seek}a=n,n=0;break linear_scan}break validate_interval}for(;n<a;){let r=n+a>>>1;e<t[r]?a=r:n=r+1}if(r=t[n],i=t[n-1],i===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(r===void 0)return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}this._cachedIndex=n,this.intervalChanged_(n,i,r)}return this.interpolate_(n,i,e,r)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(e){let t=this.resultBuffer,n=this.sampleValues,r=this.valueSize,i=e*r;for(let e=0;e!==r;++e)t[e]=n[i+e];return t}interpolate_(){throw Error(`THREE.Interpolant: Call to abstract method.`)}intervalChanged_(){}},wo=class extends Co{constructor(e,t,n,r){super(e,t,n,r),this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:He,endingEnd:He}}intervalChanged_(e,t,n){let r=this.parameterPositions,i=e-2,a=e+1,o=r[i],s=r[a];if(o===void 0)switch(this.getSettings_().endingStart){case Ue:i=e,o=2*t-n;break;case We:i=r.length-2,o=t+r[i]-r[i+1];break;default:i=e,o=n}if(s===void 0)switch(this.getSettings_().endingEnd){case Ue:a=e,s=2*n-t;break;case We:a=1,s=n+r[1]-r[0];break;default:a=e-1,s=t}let c=(n-t)*.5,l=this.valueSize;this._weightPrev=c/(t-o),this._weightNext=c/(s-n),this._offsetPrev=i*l,this._offsetNext=a*l}interpolate_(e,t,n,r){let i=this.resultBuffer,a=this.sampleValues,o=this.valueSize,s=e*o,c=s-o,l=this._offsetPrev,u=this._offsetNext,d=this._weightPrev,f=this._weightNext,p=(n-t)/(r-t),m=p*p,h=m*p,g=-d*h+2*d*m-d*p,_=(1+d)*h+(-1.5-2*d)*m+(-.5+d)*p+1,v=(-1-f)*h+(1.5+f)*m+.5*p,y=f*h-f*m;for(let e=0;e!==o;++e)i[e]=g*a[l+e]+_*a[c+e]+v*a[s+e]+y*a[u+e];return i}},To=class extends Co{constructor(e,t,n,r){super(e,t,n,r)}interpolate_(e,t,n,r){let i=this.resultBuffer,a=this.sampleValues,o=this.valueSize,s=e*o,c=s-o,l=(n-t)/(r-t),u=1-l;for(let e=0;e!==o;++e)i[e]=a[c+e]*u+a[s+e]*l;return i}},Eo=class extends Co{constructor(e,t,n,r){super(e,t,n,r)}interpolate_(e){return this.copySampleValue_(e-1)}},Do=class extends Co{interpolate_(e,t,n,r){let i=this.resultBuffer,a=this.sampleValues,o=this.valueSize,s=e*o,c=s-o,l=this.inTangents,u=this.outTangents;if(!l||!u){let e=(n-t)/(r-t),l=1-e;for(let t=0;t!==o;++t)i[t]=a[c+t]*l+a[s+t]*e;return i}let d=o*2,f=e-1;for(let p=0;p!==o;++p){let o=a[c+p],m=a[s+p],h=f*d+p*2,g=u[h],_=u[h+1],v=e*d+p*2,y=l[v],b=l[v+1],x=Ao(n,t,g,y,r);i[p]=Oo(x,o,_,b,m)}return i}};function Oo(e,t,n,r,i){let a=1-e;return a*a*a*t+3*a*a*e*n+3*a*e*e*r+e*e*e*i}function ko(e,t,n,r,i){let a=1-e;return 3*a*a*(n-t)+6*a*e*(r-n)+3*e*e*(i-r)}function Ao(e,t,n,r,i){let a=(e-t)/(i-t);for(let o=0;o<8;o++){let o=Oo(a,t,n,r,i)-e;if(Math.abs(o)<1e-10)break;let s=ko(a,t,n,r,i);if(Math.abs(s)<1e-10)break;a=Math.max(0,Math.min(1,a-o/s))}return a}var jo=class{constructor(e,t,n,r){if(e===void 0)throw Error(`THREE.KeyframeTrack: track name is undefined`);if(t===void 0||t.length===0)throw Error(`THREE.KeyframeTrack: no keyframes in track named `+e);this.name=e,this.times=xo(t,this.TimeBufferType),this.values=xo(n,this.ValueBufferType),this.setInterpolation(r||this.DefaultInterpolation)}static toJSON(e){let t=e.constructor,n;if(t.toJSON!==this.toJSON)n=t.toJSON(e);else{n={name:e.name,times:xo(e.times,Array),values:xo(e.values,Array)};let t=e.getInterpolation();t!==e.DefaultInterpolation&&(n.interpolation=t),So(e.settings)&&(n.settings={inTangents:xo(e.settings.inTangents,Array),outTangents:xo(e.settings.outTangents,Array)})}return n.type=e.ValueTypeName,n}InterpolantFactoryMethodDiscrete(e){return new Eo(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodLinear(e){return new To(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodSmooth(e){return new wo(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodBezier(e){let t=new Do(this.times,this.values,this.getValueSize(),e);return this.settings&&(t.inTangents=this.settings.inTangents,t.outTangents=this.settings.outTangents),t}setInterpolation(e){let t;switch(e){case Re:t=this.InterpolantFactoryMethodDiscrete;break;case ze:t=this.InterpolantFactoryMethodLinear;break;case Be:t=this.InterpolantFactoryMethodSmooth;break;case Ve:t=this.InterpolantFactoryMethodBezier}if(t===void 0){let t=`unsupported interpolation for `+this.ValueTypeName+` keyframe track named `+this.name;if(this.createInterpolant===void 0){if(e!==this.DefaultInterpolation)this.setInterpolation(this.DefaultInterpolation);else throw Error(t)}return z(`KeyframeTrack:`,t),this}return this.createInterpolant=t,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return Re;case this.InterpolantFactoryMethodLinear:return ze;case this.InterpolantFactoryMethodSmooth:return Be;case this.InterpolantFactoryMethodBezier:return Ve}}getValueSize(){return this.values.length/this.times.length}shift(e){if(e!==0){let t=this.times;for(let n=0,r=t.length;n!==r;++n)t[n]+=e}return this}scale(e){if(e!==1){let t=this.times;for(let n=0,r=t.length;n!==r;++n)t[n]*=e;So(this.settings)&&(Mo(this.settings.inTangents,e),Mo(this.settings.outTangents,e))}return this}trim(e,t){let n=this.times,r=n.length,i=0,a=r-1;for(;i!==r&&n[i]<e;)++i;for(;a!==-1&&n[a]>t;)--a;if(++a,i!==0||a!==r){i>=a&&(a=Math.max(a,1),i=a-1);let e=this.getValueSize();this.times=n.slice(i,a),this.values=this.values.slice(i*e,a*e)}return this}validate(){let e=!0,t=this.getValueSize();t-Math.floor(t)!==0&&(B(`KeyframeTrack: Invalid value size in track.`,this),e=!1);let n=this.times,r=this.values,i=n.length;i===0&&(B(`KeyframeTrack: Track is empty.`,this),e=!1);let a=null;for(let t=0;t!==i;t++){let r=n[t];if(typeof r==`number`&&isNaN(r)){B(`KeyframeTrack: Time is not a valid number.`,this,t,r),e=!1;break}if(a!==null&&a>r){B(`KeyframeTrack: Out of order keys.`,this,t,r,a),e=!1;break}a=r}if(r!==void 0&&et(r))for(let t=0,n=r.length;t!==n;++t){let n=r[t];if(isNaN(n)){B(`KeyframeTrack: Value is not a valid number.`,this,t,n),e=!1;break}}return e}optimize(){let e=this.times.slice(),t=this.values.slice(),n=this.getValueSize(),r=this.getInterpolation()===Be,i=e.length-1,a=1;for(let o=1;o<i;++o){let i=!1,s=e[o];if(s!==e[o+1]&&(o!==1||s!==e[0])){if(r)i=!0;else{let e=o*n,r=e-n,a=e+n;for(let o=0;o!==n;++o){let n=t[e+o];if(n!==t[r+o]||n!==t[a+o]){i=!0;break}}}}if(i){if(o!==a){e[a]=e[o];let r=o*n,i=a*n;for(let e=0;e!==n;++e)t[i+e]=t[r+e]}++a}}if(i>0){e[a]=e[i];for(let e=i*n,r=a*n,o=0;o!==n;++o)t[r+o]=t[e+o];++a}return a===e.length?(this.times=e,this.values=t):(this.times=e.slice(0,a),this.values=t.slice(0,a*n)),this}clone(){let e=this.times.slice(),t=this.values.slice(),n=this.constructor,r=new n(this.name,e,t);return r.createInterpolant=this.createInterpolant,So(this.settings)&&(r.settings={inTangents:this.settings.inTangents.slice(),outTangents:this.settings.outTangents.slice()}),r}};function Mo(e,t){for(let n=0,r=e.length;n!==r;n+=2)e[n]*=t}jo.prototype.ValueTypeName=``,jo.prototype.TimeBufferType=Float32Array,jo.prototype.ValueBufferType=Float32Array,jo.prototype.DefaultInterpolation=ze;var No=class extends jo{constructor(e,t,n){super(e,t,n)}};No.prototype.ValueTypeName=`bool`,No.prototype.ValueBufferType=Array,No.prototype.DefaultInterpolation=Re,No.prototype.InterpolantFactoryMethodLinear=void 0,No.prototype.InterpolantFactoryMethodSmooth=void 0;var Po=class extends jo{constructor(e,t,n,r){super(e,t,n,r)}};Po.prototype.ValueTypeName=`color`;var Fo=class extends jo{constructor(e,t,n,r){super(e,t,n,r)}};Fo.prototype.ValueTypeName=`number`;var Io=class extends Co{constructor(e,t,n,r){super(e,t,n,r)}interpolate_(e,t,n,r){let i=this.resultBuffer,a=this.sampleValues,o=this.valueSize,s=(n-t)/(r-t),c=e*o;for(let e=c+o;c!==e;c+=4)Ft.slerpFlat(i,0,a,c-o,a,c,s);return i}},Lo=class extends jo{constructor(e,t,n,r){super(e,t,n,r)}InterpolantFactoryMethodLinear(e){return new Io(this.times,this.values,this.getValueSize(),e)}};Lo.prototype.ValueTypeName=`quaternion`,Lo.prototype.InterpolantFactoryMethodSmooth=void 0;var Ro=class extends jo{constructor(e,t,n){super(e,t,n)}};Ro.prototype.ValueTypeName=`string`,Ro.prototype.ValueBufferType=Array,Ro.prototype.DefaultInterpolation=Re,Ro.prototype.InterpolantFactoryMethodLinear=void 0,Ro.prototype.InterpolantFactoryMethodSmooth=void 0;var zo=class extends jo{constructor(e,t,n,r){super(e,t,n,r)}};zo.prototype.ValueTypeName=`vector`;var Bo=class extends Mn{constructor(e,t=1){super(),this.isLight=!0,this.type=`Light`,this.color=new q(e),this.intensity=t}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){let t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,t}},Vo=class extends Bo{constructor(e,t,n){super(e,n),this.isHemisphereLight=!0,this.type=`HemisphereLight`,this.position.copy(Mn.DEFAULT_UP),this.updateMatrix(),this.groundColor=new q(t)}copy(e,t){return super.copy(e,t),this.groundColor.copy(e.groundColor),this}toJSON(e){let t=super.toJSON(e);return t.object.groundColor=this.groundColor.getHex(),t}},Ho=new an,Uo=new W,Wo=new W,Go=class{constructor(e){this.camera=e,this.intensity=1,this.bias=0,this.biasNode=null,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new U(512,512),this.mapType=v,this.map=null,this.mapPass=null,this.matrix=new an,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new bi,this._frameExtents=new U(1,1),this._viewportCount=1,this._viewports=[new $t(0,0,1,1)]}getViewportCount(){return this._viewportCount}getCamera(){return this.camera}getFrustum(){return this._frustum}updateMatrices(e){let t=this.camera;Uo.setFromMatrixPosition(e.matrixWorld),t.position.copy(Uo),Wo.setFromMatrixPosition(e.target.matrixWorld),t.lookAt(Wo),t.updateMatrixWorld(),this._updateMatrix(t,this.matrix,this._frustum)}_updateMatrix(e,t,n,r){Ho.multiplyMatrices(e.projectionMatrix,e.matrixWorldInverse),n.setFromProjectionMatrix(Ho,e.coordinateSystem,e.reversedDepth);let i=this._frameExtents,a=r?r.z/i.x:1,o=r?r.w/i.y:1,s=r?r.x/i.x:0,c=r?r.y/i.y:0;e.coordinateSystem===2001||e.reversedDepth?t.set(.5*a,0,0,.5*a+s,0,.5*o,0,.5*o+c,0,0,1,0,0,0,0,1):t.set(.5*a,0,0,.5*a+s,0,.5*o,0,.5*o+c,0,0,.5,.5,0,0,0,1),t.multiply(Ho)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.intensity=e.intensity,this.bias=e.bias,this.radius=e.radius,this.autoUpdate=e.autoUpdate,this.needsUpdate=e.needsUpdate,this.normalBias=e.normalBias,this.blurSamples=e.blurSamples,this.mapSize.copy(e.mapSize),this.biasNode=e.biasNode,this}clone(){return new this.constructor().copy(this)}toJSON(){let e={};return e.intensity=this.intensity,e.bias=this.bias,e.normalBias=this.normalBias,e.radius=this.radius,e.blurSamples=this.blurSamples,e.mapSize=this.mapSize.toArray(),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}},Ko=new W,qo=new Ft,Jo=new W,Yo=class extends Mn{constructor(){super(),this.isCamera=!0,this.type=`Camera`,this.matrixWorldInverse=new an,this.projectionMatrix=new an,this.projectionMatrixInverse=new an,this.coordinateSystem=Qe,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorld.decompose(Ko,qo,Jo),Jo.x===1&&Jo.y===1&&Jo.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(Ko,qo,Jo.set(1,1,1)).invert()}updateWorldMatrix(e,t,n=!1){super.updateWorldMatrix(e,t,n),this.matrixWorld.decompose(Ko,qo,Jo),Jo.x===1&&Jo.y===1&&Jo.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(Ko,qo,Jo.set(1,1,1)).invert()}clone(){return new this.constructor().copy(this)}},Xo=new W,Zo=new U,Qo=new U,$o=class extends Yo{constructor(e=50,t=1,n=.1,r=2e3){super(),this.isPerspectiveCamera=!0,this.type=`PerspectiveCamera`,this.fov=e,this.zoom=1,this.near=n,this.far=r,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){let t=.5*this.getFilmHeight()/e;this.fov=pt*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){let e=Math.tan(ft*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return pt*2*Math.atan(Math.tan(ft*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,n){Xo.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set(Xo.x,Xo.y).multiplyScalar(-e/Xo.z),Xo.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(Xo.x,Xo.y).multiplyScalar(-e/Xo.z)}getViewSize(e,t){return this.getViewBounds(e,Zo,Qo),t.subVectors(Qo,Zo)}setViewOffset(e,t,n,r,i,a){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=r,this.view.width=i,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let e=this.near,t=e*Math.tan(ft*.5*this.fov)/this.zoom,n=2*t,r=this.aspect*n,i=-.5*r,a=this.view;if(this.view!==null&&this.view.enabled){let e=a.fullWidth,o=a.fullHeight;i+=a.offsetX*r/e,t-=a.offsetY*n/o,r*=a.width/e,n*=a.height/o}let o=this.filmOffset;o!==0&&(i+=e*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(i,i+r,t,t-n,e,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){let t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}},es=class extends Go{constructor(){super(new $o(90,1,.5,500)),this.isPointLightShadow=!0}},ts=class extends Bo{constructor(e,t,n=0,r=2){super(e,t),this.isPointLight=!0,this.type=`PointLight`,this.distance=n,this.decay=r,this.shadow=new es}get power(){return this.intensity*4*Math.PI}set power(e){this.intensity=e/(4*Math.PI)}dispose(){super.dispose(),this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.decay=e.decay,this.shadow=e.shadow.clone(),this}toJSON(e){let t=super.toJSON(e);return t.object.distance=this.distance,t.object.decay=this.decay,t.object.shadow=this.shadow.toJSON(),t}},ns=class extends Yo{constructor(e=-1,t=1,n=1,r=-1,i=.1,a=2e3){super(),this.isOrthographicCamera=!0,this.type=`OrthographicCamera`,this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=n,this.bottom=r,this.near=i,this.far=a,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,n,r,i,a){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=r,this.view.width=i,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,r=(this.top+this.bottom)/2,i=n-e,a=n+e,o=r+t,s=r-t;if(this.view!==null&&this.view.enabled){let e=(this.right-this.left)/this.view.fullWidth/this.zoom,t=(this.top-this.bottom)/this.view.fullHeight/this.zoom;i+=e*this.view.offsetX,a=i+e*this.view.width,o-=t*this.view.offsetY,s=o-t*this.view.height}this.projectionMatrix.makeOrthographic(i,a,o,s,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){let t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}},rs=class extends Go{constructor(){super(new ns(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}},is=class extends Bo{constructor(e,t){super(e,t),this.isDirectionalLight=!0,this.type=`DirectionalLight`,this.position.copy(Mn.DEFAULT_UP),this.updateMatrix(),this.target=new Mn,this.shadow=new rs}dispose(){super.dispose(),this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}toJSON(e){let t=super.toJSON(e);return t.object.shadow=this.shadow.toJSON(),t.object.target=this.target.uuid,t}},as=class extends Bo{constructor(e,t){super(e,t),this.isAmbientLight=!0,this.type=`AmbientLight`}},os=-90,ss=1,cs=class extends Mn{constructor(e,t,n){super(),this.type=`CubeCamera`,this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;let r=new $o(os,ss,e,t);r.layers=this.layers,this.add(r);let i=new $o(os,ss,e,t);i.layers=this.layers,this.add(i);let a=new $o(os,ss,e,t);a.layers=this.layers,this.add(a);let o=new $o(os,ss,e,t);o.layers=this.layers,this.add(o);let s=new $o(os,ss,e,t);s.layers=this.layers,this.add(s);let c=new $o(os,ss,e,t);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){let e=this.coordinateSystem,t=this.children.concat(),[n,r,i,a,o,s]=t;for(let e of t)this.remove(e);if(e===2e3)n.up.set(0,1,0),n.lookAt(1,0,0),r.up.set(0,1,0),r.lookAt(-1,0,0),i.up.set(0,0,-1),i.lookAt(0,1,0),a.up.set(0,0,1),a.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),s.up.set(0,1,0),s.lookAt(0,0,-1);else if(e===2001)n.up.set(0,-1,0),n.lookAt(-1,0,0),r.up.set(0,-1,0),r.lookAt(1,0,0),i.up.set(0,0,1),i.lookAt(0,1,0),a.up.set(0,0,-1),a.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),s.up.set(0,-1,0),s.lookAt(0,0,-1);else throw Error(`THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: `+e);for(let e of t)this.add(e),e.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();let{renderTarget:n,activeMipmapLevel:r}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());let[i,a,o,s,c,l]=this.children,u=e.getRenderTarget(),d=e.getActiveCubeFace(),f=e.getActiveMipmapLevel(),p=e.xr.enabled;e.xr.enabled=!1;let m=n.texture.generateMipmaps;n.texture.generateMipmaps=!1;let h=!1;h=e.isWebGLRenderer===!0?e.state.buffers.depth.getReversed():e.reversedDepthBuffer,e.setRenderTarget(n,0,r),h&&e.autoClear===!1&&e.clearDepth(),e.render(t,i),e.setRenderTarget(n,1,r),h&&e.autoClear===!1&&e.clearDepth(),e.render(t,a),e.setRenderTarget(n,2,r),h&&e.autoClear===!1&&e.clearDepth(),e.render(t,o),e.setRenderTarget(n,3,r),h&&e.autoClear===!1&&e.clearDepth(),e.render(t,s),e.setRenderTarget(n,4,r),h&&e.autoClear===!1&&e.clearDepth(),e.render(t,c),n.texture.generateMipmaps=m,e.setRenderTarget(n,5,r),h&&e.autoClear===!1&&e.clearDepth(),e.render(t,l),e.setRenderTarget(u,d,f),e.xr.enabled=p,n.texture.needsPMREMUpdate=!0}},ls=class extends $o{constructor(e=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=e}},us=`\\[\\]\\.:\\/`,ds=RegExp(`[\\[\\]\\.:\\/]`,`g`),fs=`[^\\[\\]\\.:\\/]`,ps=`[^`+us.replace(`\\.`,``)+`]`,ms=`((?:WC+[\\/:])*)`.replace(`WC`,fs),hs=`(WCOD+)?`.replace(`WCOD`,ps),gs=`(?:\\.(WC+)(?:\\[(.+)\\])?)?`.replace(`WC`,fs),_s=`\\.(WC+)(?:\\[(.+)\\])?`.replace(`WC`,fs),vs=RegExp(`^`+ms+hs+gs+_s+`$`),ys=[`material`,`materials`,`bones`,`map`],bs=class{constructor(e,t,n){let r=n||xs.parseTrackName(t);this._targetGroup=e,this._bindings=e.subscribe_(t,r)}getValue(e,t){this.bind();let n=this._targetGroup.nCachedObjects_,r=this._bindings[n];r!==void 0&&r.getValue(e,t)}setValue(e,t){let n=this._bindings;for(let r=this._targetGroup.nCachedObjects_,i=n.length;r!==i;++r)n[r].setValue(e,t)}bind(){let e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].bind()}unbind(){let e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].unbind()}},xs=class e{constructor(t,n,r){this.path=n,this.parsedPath=r||e.parseTrackName(n),this.node=e.findNode(t,this.parsedPath.nodeName),this.rootNode=t,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(t,n,r){return t&&t.isAnimationObjectGroup?new e.Composite(t,n,r):new e(t,n,r)}static sanitizeNodeName(e){return e.replace(/\s/g,`_`).replace(ds,``)}static parseTrackName(e){let t=vs.exec(e);if(t===null)throw Error(`THREE.PropertyBinding: Cannot parse trackName: `+e);let n={nodeName:t[2],objectName:t[3],objectIndex:t[4],propertyName:t[5],propertyIndex:t[6]},r=n.nodeName&&n.nodeName.lastIndexOf(`.`);if(r!==void 0&&r!==-1){let e=n.nodeName.substring(r+1);ys.indexOf(e)!==-1&&(n.nodeName=n.nodeName.substring(0,r),n.objectName=e)}if(n.propertyName===null||n.propertyName.length===0)throw Error(`THREE.PropertyBinding: can not parse propertyName from trackName: `+e);return n}static findNode(e,t){if(t===void 0||t===``||t===`.`||t===-1||t===e.name||t===e.uuid)return e;if(e.skeleton){let n=e.skeleton.getBoneByName(t);if(n!==void 0)return n}if(e.children){let n=function(e){for(let r=0;r<e.length;r++){let i=e[r];if(i.name===t||i.uuid===t)return i;let a=n(i.children);if(a)return a}return null},r=n(e.children);if(r)return r}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(e,t){e[t]=this.targetObject[this.propertyName]}_getValue_array(e,t){let n=this.resolvedProperty;for(let r=0,i=n.length;r!==i;++r)e[t++]=n[r]}_getValue_arrayElement(e,t){e[t]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(e,t){this.resolvedProperty.toArray(e,t)}_setValue_direct(e,t){this.targetObject[this.propertyName]=e[t]}_setValue_direct_setNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(e,t){let n=this.resolvedProperty;for(let r=0,i=n.length;r!==i;++r)n[r]=e[t++]}_setValue_array_setNeedsUpdate(e,t){let n=this.resolvedProperty;for(let r=0,i=n.length;r!==i;++r)n[r]=e[t++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(e,t){let n=this.resolvedProperty;for(let r=0,i=n.length;r!==i;++r)n[r]=e[t++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(e,t){this.resolvedProperty[this.propertyIndex]=e[t]}_setValue_arrayElement_setNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(e,t){this.resolvedProperty.fromArray(e,t)}_setValue_fromArray_setNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(e,t){this.bind(),this.getValue(e,t)}_setValue_unbound(e,t){this.bind(),this.setValue(e,t)}bind(){let t=this.node,n=this.parsedPath,r=n.objectName,i=n.propertyName,a=n.propertyIndex;if(t||(t=e.findNode(this.rootNode,n.nodeName),this.node=t),this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!t){z(`PropertyBinding: No target node found for track: `+this.path+`.`);return}if(r){let e=n.objectIndex;switch(r){case`materials`:if(!t.material){B(`PropertyBinding: Can not bind to material as node does not have a material.`,this);return}if(!t.material.materials){B(`PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.`,this);return}t=t.material.materials;break;case`bones`:if(!t.skeleton){B(`PropertyBinding: Can not bind to bones as node does not have a skeleton.`,this);return}t=t.skeleton.bones;for(let n=0;n<t.length;n++)if(t[n].name===e){e=n;break}break;case`map`:if(`map`in t){t=t.map;break}if(!t.material){B(`PropertyBinding: Can not bind to material as node does not have a material.`,this);return}if(!t.material.map){B(`PropertyBinding: Can not bind to material.map as node.material does not have a map.`,this);return}t=t.material.map;break;default:if(t[r]===void 0){B(`PropertyBinding: Can not bind to objectName of node undefined.`,this);return}t=t[r]}if(e!==void 0){if(t[e]===void 0){B(`PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.`,this,t);return}t=t[e]}}let o=t[i];if(o===void 0){let e=n.nodeName;B(`PropertyBinding: Trying to update property for track: `+e+`.`+i+` but it wasn't found.`,t);return}let s=this.Versioning.None;this.targetObject=t,t.isMaterial===!0?s=this.Versioning.NeedsUpdate:t.isObject3D===!0&&(s=this.Versioning.MatrixWorldNeedsUpdate);let c=this.BindingType.Direct;if(a!==void 0){if(i===`morphTargetInfluences`){if(!t.geometry){B(`PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.`,this);return}if(!t.geometry.morphAttributes){B(`PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.`,this);return}t.morphTargetDictionary[a]!==void 0&&(a=t.morphTargetDictionary[a])}c=this.BindingType.ArrayElement,this.resolvedProperty=o,this.propertyIndex=a}else o.fromArray!==void 0&&o.toArray!==void 0?(c=this.BindingType.HasFromToArray,this.resolvedProperty=o):Array.isArray(o)?(c=this.BindingType.EntireArray,this.resolvedProperty=o):this.propertyName=i;this.getValue=this.GetterByBindingType[c],this.setValue=this.SetterByBindingTypeAndVersioning[c][s]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}};xs.Composite=bs,xs.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3},xs.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2},xs.prototype.GetterByBindingType=[xs.prototype._getValue_direct,xs.prototype._getValue_array,xs.prototype._getValue_arrayElement,xs.prototype._getValue_toArray],xs.prototype.SetterByBindingTypeAndVersioning=[[xs.prototype._setValue_direct,xs.prototype._setValue_direct_setNeedsUpdate,xs.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[xs.prototype._setValue_array,xs.prototype._setValue_array_setNeedsUpdate,xs.prototype._setValue_array_setMatrixWorldNeedsUpdate],[xs.prototype._setValue_arrayElement,xs.prototype._setValue_arrayElement_setNeedsUpdate,xs.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[xs.prototype._setValue_fromArray,xs.prototype._setValue_fromArray_setNeedsUpdate,xs.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]],a=class{constructor(e,t,n,r){this.elements=[1,0,0,1],e!==void 0&&this.set(e,t,n,r)}identity(){return this.set(1,0,0,1),this}fromArray(e,t=0){for(let n=0;n<4;n++)this.elements[n]=e[n+t];return this}set(e,t,n,r){let i=this.elements;return i[0]=e,i[2]=t,i[1]=n,i[3]=r,this}},a.prototype.isMatrix2=!0;function Ss(e,t,n,r){let i=Cs(r);switch(n){case j:return e*t;case te:return e*t/i.components*i.byteLength;case ne:return e*t/i.components*i.byteLength;case re:return e*t*2/i.components*i.byteLength;case ie:return e*t*2/i.components*i.byteLength;case M:return e*t*3/i.components*i.byteLength;case N:return e*t*4/i.components*i.byteLength;case ae:return e*t*4/i.components*i.byteLength;case oe:case se:return Math.floor((e+3)/4)*Math.floor((t+3)/4)*8;case ce:case F:return Math.floor((e+3)/4)*Math.floor((t+3)/4)*16;case ue:case fe:return Math.max(e,16)*Math.max(t,8)/4;case le:case de:return Math.max(e,8)*Math.max(t,8)/2;case pe:case me:case ge:case _e:return Math.floor((e+3)/4)*Math.floor((t+3)/4)*8;case he:case ve:case ye:return Math.floor((e+3)/4)*Math.floor((t+3)/4)*16;case be:return Math.floor((e+3)/4)*Math.floor((t+3)/4)*16;case xe:return Math.floor((e+4)/5)*Math.floor((t+3)/4)*16;case Se:return Math.floor((e+4)/5)*Math.floor((t+4)/5)*16;case Ce:return Math.floor((e+5)/6)*Math.floor((t+4)/5)*16;case we:return Math.floor((e+5)/6)*Math.floor((t+5)/6)*16;case Te:return Math.floor((e+7)/8)*Math.floor((t+4)/5)*16;case Ee:return Math.floor((e+7)/8)*Math.floor((t+5)/6)*16;case De:return Math.floor((e+7)/8)*Math.floor((t+7)/8)*16;case Oe:return Math.floor((e+9)/10)*Math.floor((t+4)/5)*16;case ke:return Math.floor((e+9)/10)*Math.floor((t+5)/6)*16;case Ae:return Math.floor((e+9)/10)*Math.floor((t+7)/8)*16;case je:return Math.floor((e+9)/10)*Math.floor((t+9)/10)*16;case Me:return Math.floor((e+11)/12)*Math.floor((t+9)/10)*16;case I:return Math.floor((e+11)/12)*Math.floor((t+11)/12)*16;case Ne:case Pe:case Fe:return Math.ceil(e/4)*Math.ceil(t/4)*16;case L:case Ie:return Math.ceil(e/4)*Math.ceil(t/4)*8;case R:case Le:return Math.ceil(e/4)*Math.ceil(t/4)*16}throw Error(`Unable to determine texture byte length for ${n} format.`)}function Cs(e){switch(e){case v:case y:return{byteLength:1,components:1};case x:case b:case T:return{byteLength:2,components:1};case E:case D:return{byteLength:2,components:4};case C:case S:case w:return{byteLength:4,components:1};case k:case A:return{byteLength:4,components:3}}throw Error(`THREE.TextureUtils: Unknown texture type ${e}.`)}typeof __THREE_DEVTOOLS__<`u`&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent(`register`,{detail:{revision:`186`}})),typeof window<`u`&&(window.__THREE__?z(`WARNING: Multiple instances of Three.js being imported.`):window.__THREE__=`186`);function ws(){let e=null,t=!1,n=null,r=null;function i(t,a){r=e.requestAnimationFrame(i),n(t,a)}return{start:function(){t!==!0&&n!==null&&e!==null&&(r=e.requestAnimationFrame(i),t=!0)},stop:function(){e!==null&&e.cancelAnimationFrame(r),t=!1},setAnimationLoop:function(e){n=e},setContext:function(t){e=t}}}function Ts(e){let t=new WeakMap;function n(t,n){let r=t.array,i=t.usage,a=r.byteLength,o=e.createBuffer();e.bindBuffer(n,o),e.bufferData(n,r,i),t.onUploadCallback();let s;if(r instanceof Float32Array)s=e.FLOAT;else if(typeof Float16Array<`u`&&r instanceof Float16Array)s=e.HALF_FLOAT;else if(r instanceof Uint16Array)s=t.isFloat16BufferAttribute?e.HALF_FLOAT:e.UNSIGNED_SHORT;else if(r instanceof Int16Array)s=e.SHORT;else if(r instanceof Uint32Array)s=e.UNSIGNED_INT;else if(r instanceof Int32Array)s=e.INT;else if(r instanceof Int8Array)s=e.BYTE;else if(r instanceof Uint8Array)s=e.UNSIGNED_BYTE;else if(r instanceof Uint8ClampedArray)s=e.UNSIGNED_BYTE;else throw Error(`THREE.WebGLAttributes: Unsupported buffer data format: `+r);return{buffer:o,type:s,bytesPerElement:r.BYTES_PER_ELEMENT,version:t.version,size:a}}function r(t,n,r){let i=n.array,a=n.updateRanges;if(e.bindBuffer(r,t),a.length===0)e.bufferSubData(r,0,i);else{a.sort((e,t)=>e.start-t.start);let t=0;for(let e=1;e<a.length;e++){let n=a[t],r=a[e];r.start<=n.start+n.count+1?n.count=Math.max(n.count,r.start+r.count-n.start):(++t,a[t]=r)}a.length=t+1;for(let t=0,n=a.length;t<n;t++){let n=a[t];e.bufferSubData(r,n.start*i.BYTES_PER_ELEMENT,i,n.start,n.count)}n.clearUpdateRanges()}n.onUploadCallback()}function i(e){return e.isInterleavedBufferAttribute&&(e=e.data),t.get(e)}function a(n){n.isInterleavedBufferAttribute&&(n=n.data);let r=t.get(n);r&&(e.deleteBuffer(r.buffer),t.delete(n))}function o(e,i){if(e.isInterleavedBufferAttribute&&(e=e.data),e.isGLBufferAttribute){let n=t.get(e);(!n||n.version<e.version)&&t.set(e,{buffer:e.buffer,type:e.type,bytesPerElement:e.elementSize,version:e.version});return}let a=t.get(e);if(a===void 0)t.set(e,n(e,i));else if(a.version<e.version){if(a.size!==e.array.byteLength)throw Error(`THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.`);r(a.buffer,e,i),a.version=e.version}}return{get:i,remove:a,update:o}}var Es={alphahash_fragment:`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,alphahash_pars_fragment:`#ifdef USE_ALPHAHASH
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
#endif`,alphamap_fragment:`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,alphamap_pars_fragment:`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,alphatest_fragment:`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,alphatest_pars_fragment:`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,aomap_fragment:`#ifdef USE_AOMAP
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
#endif`,aomap_pars_fragment:`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,batching_pars_vertex:`#ifdef USE_BATCHING
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
	vec4 getBatchingColor( const in float i ) {
		int size = textureSize( batchingColorTexture, 0 ).x;
		int j = int( i );
		int x = j % size;
		int y = j / size;
		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 );
	}
#endif`,batching_vertex:`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,begin_vertex:`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,beginnormal_vertex:`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,bsdfs:`float G_BlinnPhong_Implicit( ) {
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
} // validated`,iridescence_fragment:`#ifdef USE_IRIDESCENCE
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
#endif`,bumpmap_pars_fragment:`#ifdef USE_BUMPMAP
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
#endif`,clipping_planes_fragment:`#if NUM_CLIPPING_PLANES > 0
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
#endif`,clipping_planes_pars_fragment:`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,clipping_planes_pars_vertex:`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,clipping_planes_vertex:`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,color_fragment:`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#endif`,color_pars_fragment:`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#endif`,color_pars_vertex:`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec4 vColor;
#endif`,color_vertex:`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	vColor = vec4( 1.0 );
#endif
#ifdef USE_COLOR_ALPHA
	vColor *= color;
#elif defined( USE_COLOR )
	vColor.rgb *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.rgb *= instanceColor.rgb;
#endif
#ifdef USE_BATCHING_COLOR
	vColor *= getBatchingColor( getIndirectIndex( gl_DrawID ) );
#endif`,common:`#define PI 3.141592653589793
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
#define inverseTransformDirection transformDirectionByInverseViewMatrix
vec3 transformNormalByInverseViewMatrix( in vec3 normal, in mat4 viewMatrix ) {
	return normalize( ( vec4( normal, 0.0 ) * viewMatrix ).xyz );
}
vec3 transformDirectionByInverseViewMatrix( in vec3 dir, in mat4 viewMatrix ) {
	return normalize( ( vec4( dir, 0.0 ) * viewMatrix ).xyz );
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
} // validated`,cube_uv_reflection_fragment:`#ifdef ENVMAP_TYPE_CUBE_UV
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
#endif`,defaultnormal_vertex:`vec3 transformedNormal = objectNormal;
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
#endif`,displacementmap_pars_vertex:`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,displacementmap_vertex:`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,emissivemap_fragment:`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,emissivemap_pars_fragment:`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,colorspace_fragment:`gl_FragColor = linearToOutputTexel( gl_FragColor );`,colorspace_pars_fragment:`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,envmap_fragment:`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * reflectVec );
		#ifdef ENVMAP_BLENDING_MULTIPLY
			outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
		#elif defined( ENVMAP_BLENDING_MIX )
			outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
		#elif defined( ENVMAP_BLENDING_ADD )
			outgoingLight += envColor.xyz * specularStrength * reflectivity;
		#endif
	#endif
#endif`,envmap_common_pars_fragment:`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
#endif`,envmap_pars_fragment:`#ifdef USE_ENVMAP
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
#endif`,envmap_pars_vertex:`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,envmap_physical_pars_fragment:`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, pow4( roughness ) ) );
			reflectVec = transformDirectionByInverseViewMatrix( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_RETROREFLECTION
		vec3 getIBLRetroRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 retroVec = normalize( mix( viewDir, normal, pow4( roughness ) ) );
				retroVec = transformDirectionByInverseViewMatrix( retroVec, viewMatrix );
				vec4 envMapColor = textureCubeUV( envMap, envMapRotation * retroVec, roughness );
				return envMapColor.rgb * envMapIntensity;
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
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
		#ifdef USE_RETROREFLECTION
			vec3 getIBLAnisotropyRetroRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
				#ifdef ENVMAP_TYPE_CUBE_UV
					vec3 bentNormal = cross( bitangent, viewDir );
					bentNormal = normalize( cross( bentNormal, bitangent ) );
					bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
					return getIBLRetroRadiance( viewDir, bentNormal, roughness );
				#else
					return vec3( 0.0 );
				#endif
			}
		#endif
	#endif
#endif`,envmap_vertex:`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = transformNormalByInverseViewMatrix( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,fog_vertex:`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,fog_pars_vertex:`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,fog_fragment:`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,fog_pars_fragment:`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,gradientmap_pars_fragment:`#ifdef USE_GRADIENTMAP
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
}`,lightmap_pars_fragment:`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,lights_lambert_fragment:`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,lights_lambert_pars_fragment:`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,lights_pars_begin:`uniform bool receiveShadow;
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
	vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
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
#if NUM_SUN_LIGHTS > 0
	struct SunLight {
		vec3 direction;
		vec3 color;
	};
	uniform SunLight sunLights[ NUM_SUN_LIGHTS ];
	void getSunLightInfo( const in SunLight sunLight, out IncidentLight light ) {
		light.color = sunLight.color;
		light.direction = sunLight.direction;
		light.visible = true;
	}
#endif
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
#endif
#include <lightprobes_pars_fragment>`,lights_toon_fragment:`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,lights_toon_pars_fragment:`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,lights_phong_fragment:`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,lights_phong_pars_fragment:`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,lights_physical_fragment:`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.diffuseContribution = diffuseColor.rgb * ( 1.0 - metalnessFactor );
material.metalness = metalnessFactor;
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
	material.specularColor = min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor;
	material.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = vec3( 0.04 );
	material.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );
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
#ifdef USE_RETROREFLECTION
	material.retroreflectivity = retroreflectivity;
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
	material.sheenRoughness = clamp( sheenRoughness, 0.0001, 1.0 );
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
#endif`,lights_physical_pars_fragment:`uniform sampler2D dfgLUT;
struct PhysicalMaterial {
	vec3 diffuseColor;
	vec3 diffuseContribution;
	vec3 specularColor;
	vec3 specularColorBlended;
	float roughness;
	float metalness;
	float specularF90;
	float dispersion;
	vec2 dfg;
	vec3 multiScatteringCompensation;
	#ifdef USE_RETROREFLECTION
		float retroreflectivity;
	#endif
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
		vec3 iridescenceF0Dielectric;
		vec3 iridescenceF0Metallic;
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
		return 0.5 / max( gv + gl, EPSILON );
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
	vec3 f0 = material.specularColorBlended;
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
	mat3 mat = mInv * transpose( mat3( T1, T2, N ) );
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
	float rInv = 1.0 / ( roughness + 0.1 );
	float a = -1.9362 + 1.0678 * roughness + 0.4573 * r2 - 0.8469 * rInv;
	float b = -0.6014 + 0.5538 * roughness - 0.4670 * r2 - 0.1255 * rInv;
	float DG = exp( a * dotNV + b );
	return saturate( DG );
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	vec2 fab = texture2D( dfgLUT, vec2( roughness, dotNV ) ).rg;
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec2 fab, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec2 fab, const in vec3 specularColor, const in float specularF90, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
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
		vec3 fresnel = ( material.specularColorBlended * t2.x + ( material.specularF90 - material.specularColorBlended ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseContribution * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
		#ifdef USE_CLEARCOAT
			vec3 Ncc = geometryClearcoatNormal;
			vec2 uvClearcoat = LTC_Uv( Ncc, viewDir, material.clearcoatRoughness );
			vec4 t1Clearcoat = texture2D( ltc_1, uvClearcoat );
			vec4 t2Clearcoat = texture2D( ltc_2, uvClearcoat );
			mat3 mInvClearcoat = mat3(
				vec3( t1Clearcoat.x, 0, t1Clearcoat.y ),
				vec3(             0, 1,             0 ),
				vec3( t1Clearcoat.z, 0, t1Clearcoat.w )
			);
			vec3 fresnelClearcoat = material.clearcoatF0 * t2Clearcoat.x + ( material.clearcoatF90 - material.clearcoatF0 ) * t2Clearcoat.y;
			clearcoatSpecularDirect += lightColor * fresnelClearcoat * LTC_Evaluate( Ncc, viewDir, position, mInvClearcoat, rectCoords );
		#endif
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
 
 		float sheenAlbedoV = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
 		float sheenAlbedoL = IBLSheenBRDF( geometryNormal, directLight.direction, material.sheenRoughness );
 
 		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * max( sheenAlbedoV, sheenAlbedoL );
 
 		irradiance *= sheenEnergyComp;
 
 	#endif
	vec3 specularBRDF = BRDF_GGX( directLight.direction, geometryViewDir, geometryNormal, material );
	#ifdef USE_RETROREFLECTION
		vec3 retroViewDir = reflect( - geometryViewDir, geometryNormal );
		vec3 retroSpecularBRDF = BRDF_GGX( directLight.direction, retroViewDir, geometryNormal, material );
		specularBRDF = mix( specularBRDF, retroSpecularBRDF, saturate( material.retroreflectivity ) );
	#endif
	reflectedLight.directSpecular += irradiance * specularBRDF * material.multiScatteringCompensation;
	vec3 halfDir = normalize( directLight.direction + geometryViewDir );
	float dotVH = saturate( dot( geometryViewDir, halfDir ) );
	vec3 F = F_Schlick( material.specularColor, material.specularF90, dotVH );
	#ifdef USE_RETROREFLECTION
		vec3 retroHalfDir = normalize( directLight.direction + retroViewDir );
		float dotRetroVH = saturate( dot( retroViewDir, retroHalfDir ) );
		vec3 retroF = F_Schlick( material.specularColor, material.specularF90, dotRetroVH );
		F = mix( F, retroF, saturate( material.retroreflectivity ) );
	#endif
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseContribution ) * ( 1.0 - F );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( material.dfg, material.specularColor, material.specularF90, material.iridescence, material.iridescenceF0Dielectric, singleScattering, multiScattering );
	#else
		computeMultiscattering( material.dfg, material.specularColor, material.specularF90, singleScattering, multiScattering );
	#endif
	vec3 diffuse = irradiance * BRDF_Lambert( material.diffuseContribution ) * ( 1.0 - singleScattering - multiScattering );
	#ifdef USE_SHEEN
		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
		sheenSpecularIndirect += irradiance * material.sheenColor * sheenAlbedo * RECIPROCAL_PI;
		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;
		diffuse *= sheenEnergyComp;
	#endif
	reflectedLight.indirectDiffuse += diffuse;
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness ) * RECIPROCAL_PI;
 	#endif
	vec3 singleScatteringDielectric = vec3( 0.0 );
	vec3 multiScatteringDielectric = vec3( 0.0 );
	vec3 singleScatteringMetallic = vec3( 0.0 );
	vec3 multiScatteringMetallic = vec3( 0.0 );
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( material.dfg, material.specularColor, material.specularF90, material.iridescence, material.iridescenceF0Dielectric, singleScatteringDielectric, multiScatteringDielectric );
		computeMultiscatteringIridescence( material.dfg, material.diffuseColor, material.specularF90, material.iridescence, material.iridescenceF0Metallic, singleScatteringMetallic, multiScatteringMetallic );
	#else
		computeMultiscattering( material.dfg, material.specularColor, material.specularF90, singleScatteringDielectric, multiScatteringDielectric );
		computeMultiscattering( material.dfg, material.diffuseColor, material.specularF90, singleScatteringMetallic, multiScatteringMetallic );
	#endif
	vec3 singleScattering = mix( singleScatteringDielectric, singleScatteringMetallic, material.metalness );
	vec3 multiScattering = mix( multiScatteringDielectric, multiScatteringMetallic, material.metalness );
	vec3 totalScatteringDielectric = singleScatteringDielectric + multiScatteringDielectric;
	vec3 diffuse = material.diffuseContribution * ( 1.0 - totalScatteringDielectric );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	vec3 indirectSpecular = radiance * singleScattering;
	indirectSpecular += multiScattering * cosineWeightedIrradiance;
	vec3 indirectDiffuse = diffuse * cosineWeightedIrradiance;
	#ifdef USE_SHEEN
		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;
		indirectSpecular *= sheenEnergyComp;
		indirectDiffuse *= sheenEnergyComp;
	#endif
	reflectedLight.indirectSpecular += indirectSpecular;
	reflectedLight.indirectDiffuse += indirectDiffuse;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,lights_fragment_begin:`
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
		vec3 iridescenceFresnelDielectric = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		vec3 iridescenceFresnelMetallic = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.diffuseColor );
		material.iridescenceFresnel = mix( iridescenceFresnelDielectric, iridescenceFresnelMetallic, material.metalness );
		material.iridescenceF0Dielectric = Schlick_to_F0( iridescenceFresnelDielectric, 1.0, dotNVi );
		material.iridescenceF0Metallic = Schlick_to_F0( iridescenceFresnelMetallic, 1.0, dotNVi );
	}
#endif
#ifdef STANDARD
	float dotNVms = saturate( dot( geometryNormal, geometryViewDir ) );
	material.dfg = texture2D( dfgLUT, vec2( material.roughness, dotNVms ) ).rg;
	#if ( NUM_SUN_LIGHTS > 0 || NUM_DIR_LIGHTS > 0 || NUM_POINT_LIGHTS > 0 || NUM_SPOT_LIGHTS > 0 )
		float EssMs = material.dfg.x + material.dfg.y;
		material.multiScatteringCompensation = 1.0 + material.specularColorBlended * ( 1.0 / EssMs - 1.0 );
	#endif
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
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS ) && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )
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
#if ( NUM_SUN_LIGHTS > 0 ) && defined( RE_Direct )
	SunLight sunLight;
	#if defined( USE_SHADOWMAP ) && NUM_SUN_LIGHT_SHADOWS > 0
	SunLightShadow sunLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SUN_LIGHTS; i ++ ) {
		sunLight = sunLights[ i ];
		getSunLightInfo( sunLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SUN_LIGHT_SHADOWS )
		sunLightShadow = sunLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getSunShadow( sunShadowMap[ i ], sunLightShadow, UNROLLED_LOOP_INDEX ) : 1.0;
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
	#ifdef USE_LIGHT_PROBES_GRID
		vec3 probeWorldPos = ( ( vec4( geometryPosition, 1.0 ) - viewMatrix[ 3 ] ) * viewMatrix ).xyz;
		vec3 probeWorldNormal = transformNormalByInverseViewMatrix( geometryNormal, viewMatrix );
		irradiance += getLightProbeGridIrradiance( probeWorldPos, probeWorldNormal );
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,lights_fragment_maps:`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( ENVMAP_TYPE_CUBE_UV )
		#if defined( STANDARD ) || defined( LAMBERT ) || defined( PHONG )
			iblIrradiance += getIBLIrradiance( geometryNormal );
		#endif
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		vec3 iblRadiance = getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		vec3 iblRadiance = getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_RETROREFLECTION
		#ifdef USE_ANISOTROPY
			vec3 retroIBLRadiance = getIBLAnisotropyRetroRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
		#else
			vec3 retroIBLRadiance = getIBLRetroRadiance( geometryViewDir, geometryNormal, material.roughness );
		#endif
		iblRadiance = mix( iblRadiance, retroIBLRadiance, saturate( material.retroreflectivity ) );
	#endif
	radiance += iblRadiance;
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,lights_fragment_end:`#if defined( RE_IndirectDiffuse )
	#if defined( LAMBERT ) || defined( PHONG )
		irradiance += iblIrradiance;
	#endif
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,lightprobes_pars_fragment:`#ifdef USE_LIGHT_PROBES_GRID
uniform highp sampler3D probesSH;
uniform vec3 probesMin;
uniform vec3 probesMax;
uniform vec3 probesResolution;
vec3 getLightProbeGridIrradiance( vec3 worldPos, vec3 worldNormal ) {
	vec3 res = probesResolution;
	vec3 gridRange = probesMax - probesMin;
	vec3 resMinusOne = res - 1.0;
	vec3 probeSpacing = gridRange / resMinusOne;
	vec3 samplePos = worldPos + worldNormal * probeSpacing * 0.5;
	vec3 uvw = clamp( ( samplePos - probesMin ) / gridRange, 0.0, 1.0 );
	uvw = uvw * resMinusOne / res + 0.5 / res;
	float nz          = res.z;
	float paddedSlices = nz + 2.0;
	float atlasDepth  = 7.0 * paddedSlices;
	float uvZBase     = uvw.z * nz + 1.0;
	vec4 s0 = texture( probesSH, vec3( uvw.xy, ( uvZBase                       ) / atlasDepth ) );
	vec4 s1 = texture( probesSH, vec3( uvw.xy, ( uvZBase +       paddedSlices   ) / atlasDepth ) );
	vec4 s2 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 2.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s3 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 3.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s4 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 4.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s5 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 5.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s6 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 6.0 * paddedSlices   ) / atlasDepth ) );
	vec3 c0 = s0.xyz;
	vec3 c1 = vec3( s0.w, s1.xy );
	vec3 c2 = vec3( s1.zw, s2.x );
	vec3 c3 = s2.yzw;
	vec3 c4 = s3.xyz;
	vec3 c5 = vec3( s3.w, s4.xy );
	vec3 c6 = vec3( s4.zw, s5.x );
	vec3 c7 = s5.yzw;
	vec3 c8 = s6.xyz;
	float x = worldNormal.x, y = worldNormal.y, z = worldNormal.z;
	vec3 result = c0 * 0.886227;
	result += c1 * 2.0 * 0.511664 * y;
	result += c2 * 2.0 * 0.511664 * z;
	result += c3 * 2.0 * 0.511664 * x;
	result += c4 * 2.0 * 0.429043 * x * y;
	result += c5 * 2.0 * 0.429043 * y * z;
	result += c6 * ( 0.743125 * z * z - 0.247708 );
	result += c7 * 2.0 * 0.429043 * x * z;
	result += c8 * 0.429043 * ( x * x - y * y );
	return max( result, vec3( 0.0 ) );
}
#endif`,logdepthbuf_fragment:`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,logdepthbuf_pars_fragment:`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,logdepthbuf_pars_vertex:`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,logdepthbuf_vertex:`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,map_fragment:`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,map_pars_fragment:`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,map_particle_fragment:`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,map_particle_pars_fragment:`#if defined( USE_POINTS_UV )
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
#endif`,metalnessmap_fragment:`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,metalnessmap_pars_fragment:`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,morphinstance_vertex:`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,morphcolor_vertex:`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,morphnormal_vertex:`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,morphtarget_pars_vertex:`#ifdef USE_MORPHTARGETS
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
#endif`,morphtarget_vertex:`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,normal_fragment_begin:`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
	#ifdef DOUBLE_SIDED
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
	#ifdef DOUBLE_SIDED
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,normal_fragment_maps:`#ifdef USE_NORMALMAP_OBJECTSPACE
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
	#if defined( USE_PACKED_NORMALMAP )
		mapN = vec3( mapN.xy, sqrt( saturate( 1.0 - dot( mapN.xy, mapN.xy ) ) ) );
	#endif
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,normal_pars_fragment:`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,normal_pars_vertex:`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,normal_vertex:`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
		#ifdef FLIP_SIDED
			vBitangent = - vBitangent;
		#endif
	#endif
#endif`,normalmap_pars_fragment:`#ifdef USE_NORMALMAP
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
#endif`,clearcoat_normal_fragment_begin:`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,clearcoat_normal_fragment_maps:`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,clearcoat_pars_fragment:`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,iridescence_pars_fragment:`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,opaque_fragment:`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,packing:`vec3 packNormalToRGB( const in vec3 normal ) {
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
	#ifdef USE_REVERSED_DEPTH_BUFFER
	
		return depth * ( far - near ) - far;
	#else
		return depth * ( near - far ) - near;
	#endif
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	
	#ifdef USE_REVERSED_DEPTH_BUFFER
		return ( near * far ) / ( ( near - far ) * depth - near );
	#else
		return ( near * far ) / ( ( far - near ) * depth - far );
	#endif
}`,premultiplied_alpha_fragment:`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,project_vertex:`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,dithering_fragment:`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,dithering_pars_fragment:`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,roughnessmap_fragment:`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,roughnessmap_pars_fragment:`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,shadowmap_pars_fragment:`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_SUN_LIGHT_SHADOWS > 0
		#define SUN_LIGHT_CASCADES 2
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow sunShadowMap[ NUM_SUN_LIGHT_SHADOWS ];
		#else
			uniform sampler2D sunShadowMap[ NUM_SUN_LIGHT_SHADOWS ];
		#endif
		uniform mat4 sunShadowMatrix[ NUM_SUN_LIGHT_SHADOWS * SUN_LIGHT_CASCADES ];
		uniform vec4 sunShadowCascade[ NUM_SUN_LIGHT_SHADOWS * SUN_LIGHT_CASCADES ];
		varying vec4 vSunShadowWorldPosition;
		varying vec3 vSunShadowWorldNormal;
		struct SunLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SunLightShadow sunLightShadows[ NUM_SUN_LIGHT_SHADOWS ];
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		#else
			uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		#endif
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
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		#else
			uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		#endif
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
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform samplerCubeShadow pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		#elif defined( SHADOWMAP_TYPE_BASIC )
			uniform samplerCube pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		#endif
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
	#if defined( SHADOWMAP_TYPE_PCF )
		float interleavedGradientNoise( vec2 position ) {
			return fract( 52.9829189 * fract( dot( position, vec2( 0.06711056, 0.00583715 ) ) ) );
		}
		vec2 vogelDiskSample( int sampleIndex, int samplesCount, float phi ) {
			const float goldenAngle = 2.399963229728653;
			float r = sqrt( ( float( sampleIndex ) + 0.5 ) / float( samplesCount ) );
			float theta = float( sampleIndex ) * goldenAngle + phi;
			return vec2( cos( theta ), sin( theta ) ) * r;
		}
	#endif
	#if defined( SHADOWMAP_TYPE_PCF )
		float getShadow( sampler2DShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			shadowCoord.z += shadowBias;
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
				float radius = shadowRadius * texelSize.x;
				float phi = interleavedGradientNoise( gl_FragCoord.xy ) * PI2;
				shadow = (
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 0, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 1, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 2, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 3, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 4, 5, phi ) * radius, shadowCoord.z ) )
				) * 0.2;
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#elif defined( SHADOWMAP_TYPE_VSM )
		float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				vec2 distribution = texture2D( shadowMap, shadowCoord.xy ).rg;
				float mean = distribution.x;
				float variance = distribution.y * distribution.y;
				#ifdef USE_REVERSED_DEPTH_BUFFER
					float hard_shadow = step( mean, shadowCoord.z );
				#else
					float hard_shadow = step( shadowCoord.z, mean );
				#endif
				
				if ( hard_shadow == 1.0 ) {
					shadow = 1.0;
				} else {
					variance = max( variance, 0.0000001 );
					float d = shadowCoord.z - mean;
					float p_max = variance / ( variance + d * d );
					p_max = clamp( ( p_max - 0.3 ) / 0.65, 0.0, 1.0 );
					shadow = max( hard_shadow, p_max );
				}
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#else
		float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				float depth = texture2D( shadowMap, shadowCoord.xy ).r;
				#ifdef USE_REVERSED_DEPTH_BUFFER
					shadow = step( depth, shadowCoord.z );
				#else
					shadow = step( shadowCoord.z, depth );
				#endif
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#endif
	#if NUM_SUN_LIGHT_SHADOWS > 0
		float getSunShadow(
			#if defined( SHADOWMAP_TYPE_PCF )
				sampler2DShadow shadowMap,
			#else
				sampler2D shadowMap,
			#endif
			SunLightShadow sunLightShadow,
			int shadowIndex
		) {
			vec4 shadowWorldPosition = vec4( vSunShadowWorldPosition.xyz + vSunShadowWorldNormal * sunLightShadow.shadowNormalBias, 1.0 );
			float viewDepth = vSunShadowWorldPosition.w;
			int cascadeOffset = shadowIndex * SUN_LIGHT_CASCADES;
			float shadow = 1.0;
			for ( int i = SUN_LIGHT_CASCADES - 1; i >= 0; i -- ) {
				vec4 cascade = sunShadowCascade[ cascadeOffset + i ];
				if ( viewDepth >= cascade.x && viewDepth < cascade.y ) {
					float cascadeShadow = getShadow(
						shadowMap,
						sunLightShadow.shadowMapSize,
						sunLightShadow.shadowIntensity,
						sunLightShadow.shadowBias,
						sunLightShadow.shadowRadius,
						sunShadowMatrix[ cascadeOffset + i ] * shadowWorldPosition
					);
					shadow = mix( cascadeShadow, shadow, smoothstep( cascade.z, cascade.y, viewDepth ) );
				}
			}
			return shadow;
		}
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	#if defined( SHADOWMAP_TYPE_PCF )
	float getPointShadow( samplerCubeShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		vec3 bd3D = normalize( lightToPosition );
		vec3 absVec = abs( lightToPosition );
		float viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );
		if ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {
			#ifdef USE_REVERSED_DEPTH_BUFFER
				float dp = ( shadowCameraNear * ( shadowCameraFar - viewSpaceZ ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
				dp -= shadowBias;
			#else
				float dp = ( shadowCameraFar * ( viewSpaceZ - shadowCameraNear ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
				dp += shadowBias;
			#endif
			float texelSize = shadowRadius / shadowMapSize.x;
			vec3 absDir = abs( bd3D );
			vec3 tangent = absDir.x > absDir.z ? vec3( 0.0, 1.0, 0.0 ) : vec3( 1.0, 0.0, 0.0 );
			tangent = normalize( cross( bd3D, tangent ) );
			vec3 bitangent = cross( bd3D, tangent );
			float phi = interleavedGradientNoise( gl_FragCoord.xy ) * PI2;
			vec2 sample0 = vogelDiskSample( 0, 5, phi );
			vec2 sample1 = vogelDiskSample( 1, 5, phi );
			vec2 sample2 = vogelDiskSample( 2, 5, phi );
			vec2 sample3 = vogelDiskSample( 3, 5, phi );
			vec2 sample4 = vogelDiskSample( 4, 5, phi );
			shadow = (
				texture( shadowMap, vec4( bd3D + ( tangent * sample0.x + bitangent * sample0.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample1.x + bitangent * sample1.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample2.x + bitangent * sample2.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample3.x + bitangent * sample3.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample4.x + bitangent * sample4.y ) * texelSize, dp ) )
			) * 0.2;
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	#elif defined( SHADOWMAP_TYPE_BASIC )
	float getPointShadow( samplerCube shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		vec3 absVec = abs( lightToPosition );
		float viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );
		if ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {
			float dp = ( shadowCameraFar * ( viewSpaceZ - shadowCameraNear ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
			dp += shadowBias;
			vec3 bd3D = normalize( lightToPosition );
			float depth = textureCube( shadowMap, bd3D ).r;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				depth = 1.0 - depth;
			#endif
			shadow = step( dp, depth );
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	#endif
	#endif
#endif`,shadowmap_pars_vertex:`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_SUN_LIGHT_SHADOWS > 0
		varying vec4 vSunShadowWorldPosition;
		varying vec3 vSunShadowWorldNormal;
	#endif
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
#endif`,shadowmap_vertex:`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_SUN_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	#ifdef HAS_NORMAL
		vec3 shadowWorldNormal = transformNormalByInverseViewMatrix( transformedNormal, viewMatrix );
	#else
		vec3 shadowWorldNormal = vec3( 0.0 );
	#endif
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_SUN_LIGHT_SHADOWS > 0
		vSunShadowWorldPosition = vec4( worldPosition.xyz, - mvPosition.z );
		vSunShadowWorldNormal = shadowWorldNormal;
	#endif
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
#endif`,shadowmask_pars_fragment:`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_SUN_LIGHT_SHADOWS > 0
	SunLightShadow sunLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SUN_LIGHT_SHADOWS; i ++ ) {
		sunLight = sunLightShadows[ i ];
		shadow *= receiveShadow ? getSunShadow( sunShadowMap[ i ], sunLight, UNROLLED_LOOP_INDEX ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
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
	#if NUM_POINT_LIGHT_SHADOWS > 0 && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )
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
}`,skinbase_vertex:`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,skinning_pars_vertex:`#ifdef USE_SKINNING
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
#endif`,skinning_vertex:`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,skinnormal_vertex:`#ifdef USE_SKINNING
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
#endif`,specularmap_fragment:`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,specularmap_pars_fragment:`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,tonemapping_fragment:`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,tonemapping_pars_fragment:`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,transmission_fragment:`#ifdef USE_TRANSMISSION
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
	vec3 n = transformNormalByInverseViewMatrix( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseContribution, material.specularColorBlended, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,transmission_pars_fragment:`#ifdef USE_TRANSMISSION
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
#endif`,uv_pars_fragment:`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,uv_pars_vertex:`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,uv_vertex:`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,worldpos_vertex:`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`,background_vert:`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,background_frag:`uniform sampler2D t2D;
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
}`,backgroundCube_vert:`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,backgroundCube_frag:`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, backgroundRotation * vWorldDirection );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, backgroundRotation * vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,cube_vert:`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,cube_frag:`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,depth_vert:`#include <common>
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
}`,depth_frag:`#if DEPTH_PACKING == 3200
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
}`,distance_vert:`#define DISTANCE
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
}`,distance_frag:`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = vec4( dist, 0.0, 0.0, 1.0 );
}`,equirect_vert:`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,equirect_frag:`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,linedashed_vert:`uniform float scale;
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
}`,linedashed_frag:`uniform vec3 diffuse;
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
}`,meshbasic_vert:`#include <common>
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
}`,meshbasic_frag:`uniform vec3 diffuse;
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
}`,meshlambert_vert:`#define LAMBERT
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
}`,meshlambert_frag:`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
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
#include <emissivemap_pars_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <envmap_physical_pars_fragment>
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
}`,meshmatcap_vert:`#define MATCAP
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
}`,meshmatcap_frag:`#define MATCAP
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
}`,meshnormal_vert:`#define NORMAL
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
}`,meshnormal_frag:`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
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
	gl_FragColor = vec4( normalize( normal ) * 0.5 + 0.5, diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,meshphong_vert:`#define PHONG
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
}`,meshphong_frag:`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
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
#include <emissivemap_pars_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <envmap_physical_pars_fragment>
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
}`,meshphysical_vert:`#define STANDARD
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
}`,meshphysical_frag:`#define STANDARD
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
#ifdef USE_RETROREFLECTION
	uniform float retroreflectivity;
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
 
		outgoingLight = outgoingLight + sheenSpecularDirect + sheenSpecularIndirect;
 
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
}`,meshtoon_vert:`#define TOON
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
}`,meshtoon_frag:`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
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
}`,points_vert:`uniform float size;
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
}`,points_frag:`uniform vec3 diffuse;
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
}`,shadow_vert:`#include <common>
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
}`,shadow_frag:`uniform vec3 color;
uniform float opacity;
#include <common>
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
	#include <premultiplied_alpha_fragment>
}`,sprite_vert:`uniform float rotation;
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
}`,sprite_frag:`uniform vec3 diffuse;
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
}`},Q={common:{diffuse:{value:new q(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new G},alphaMap:{value:null},alphaMapTransform:{value:new G},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new G}},envmap:{envMap:{value:null},envMapRotation:{value:new G},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98},dfgLUT:{value:null}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new G}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new G}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new G},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new G},normalScale:{value:new U(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new G},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new G}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new G}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new G}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new q(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},sunLights:{value:[],properties:{direction:{},color:{}}},sunLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},sunShadowMatrix:{value:[]},sunShadowCascade:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null},probesSH:{value:null},probesMin:{value:new W},probesMax:{value:new W},probesResolution:{value:new W}},points:{diffuse:{value:new q(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new G},alphaTest:{value:0},uvTransform:{value:new G}},sprite:{diffuse:{value:new q(16777215)},opacity:{value:1},center:{value:new U(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new G},alphaMap:{value:null},alphaMapTransform:{value:new G},alphaTest:{value:0}}},Ds={basic:{uniforms:co([Q.common,Q.specularmap,Q.envmap,Q.aomap,Q.lightmap,Q.fog]),vertexShader:Es.meshbasic_vert,fragmentShader:Es.meshbasic_frag},lambert:{uniforms:co([Q.common,Q.specularmap,Q.envmap,Q.aomap,Q.lightmap,Q.emissivemap,Q.bumpmap,Q.normalmap,Q.displacementmap,Q.fog,Q.lights,{emissive:{value:new q(0)},envMapIntensity:{value:1}}]),vertexShader:Es.meshlambert_vert,fragmentShader:Es.meshlambert_frag},phong:{uniforms:co([Q.common,Q.specularmap,Q.envmap,Q.aomap,Q.lightmap,Q.emissivemap,Q.bumpmap,Q.normalmap,Q.displacementmap,Q.fog,Q.lights,{emissive:{value:new q(0)},specular:{value:new q(1118481)},shininess:{value:30},envMapIntensity:{value:1}}]),vertexShader:Es.meshphong_vert,fragmentShader:Es.meshphong_frag},standard:{uniforms:co([Q.common,Q.envmap,Q.aomap,Q.lightmap,Q.emissivemap,Q.bumpmap,Q.normalmap,Q.displacementmap,Q.roughnessmap,Q.metalnessmap,Q.fog,Q.lights,{emissive:{value:new q(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Es.meshphysical_vert,fragmentShader:Es.meshphysical_frag},toon:{uniforms:co([Q.common,Q.aomap,Q.lightmap,Q.emissivemap,Q.bumpmap,Q.normalmap,Q.displacementmap,Q.gradientmap,Q.fog,Q.lights,{emissive:{value:new q(0)}}]),vertexShader:Es.meshtoon_vert,fragmentShader:Es.meshtoon_frag},matcap:{uniforms:co([Q.common,Q.bumpmap,Q.normalmap,Q.displacementmap,Q.fog,{matcap:{value:null}}]),vertexShader:Es.meshmatcap_vert,fragmentShader:Es.meshmatcap_frag},points:{uniforms:co([Q.points,Q.fog]),vertexShader:Es.points_vert,fragmentShader:Es.points_frag},dashed:{uniforms:co([Q.common,Q.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Es.linedashed_vert,fragmentShader:Es.linedashed_frag},depth:{uniforms:co([Q.common,Q.displacementmap]),vertexShader:Es.depth_vert,fragmentShader:Es.depth_frag},normal:{uniforms:co([Q.common,Q.bumpmap,Q.normalmap,Q.displacementmap,{opacity:{value:1}}]),vertexShader:Es.meshnormal_vert,fragmentShader:Es.meshnormal_frag},sprite:{uniforms:co([Q.sprite,Q.fog]),vertexShader:Es.sprite_vert,fragmentShader:Es.sprite_frag},background:{uniforms:{uvTransform:{value:new G},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Es.background_vert,fragmentShader:Es.background_frag},backgroundCube:{uniforms:{envMap:{value:null},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new G}},vertexShader:Es.backgroundCube_vert,fragmentShader:Es.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Es.cube_vert,fragmentShader:Es.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Es.equirect_vert,fragmentShader:Es.equirect_frag},distance:{uniforms:co([Q.common,Q.displacementmap,{referencePosition:{value:new W},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Es.distance_vert,fragmentShader:Es.distance_frag},shadow:{uniforms:co([Q.lights,Q.fog,{color:{value:new q(0)},opacity:{value:1}}]),vertexShader:Es.shadow_vert,fragmentShader:Es.shadow_frag}};Ds.physical={uniforms:co([Ds.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new G},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new G},clearcoatNormalScale:{value:new U(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new G},dispersion:{value:0},retroreflectivity:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new G},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new G},sheen:{value:0},sheenColor:{value:new q(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new G},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new G},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new G},transmissionSamplerSize:{value:new U},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new G},attenuationDistance:{value:0},attenuationColor:{value:new q(0)},specularColor:{value:new q(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new G},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new G},anisotropyVector:{value:new U},anisotropyMap:{value:null},anisotropyMapTransform:{value:new G}}]),vertexShader:Es.meshphysical_vert,fragmentShader:Es.meshphysical_frag};var Os={r:0,b:0,g:0},ks=new an,As=new G;As.set(-1,0,0,0,1,0,0,0,1);function js(e,t,n,r,i,a){let o=new q(0),s=i===!0?0:1,c,l,u=null,d=0,f=null;function p(e){let n=e.isScene===!0?e.background:null;if(n&&n.isTexture){let r=e.backgroundBlurriness>0;n=t.get(n,r)}return n}function m(t){let r=!1,i=p(t);i===null?g(o,s):i&&i.isColor&&(g(i,1),r=!0);let c=e.xr.getEnvironmentBlendMode();c===`additive`?n.buffers.color.setClear(0,0,0,1,a):c===`alpha-blend`&&n.buffers.color.setClear(0,0,0,0,a),(e.autoClear||r)&&(n.buffers.depth.setTest(!0),n.buffers.depth.setMask(!0),n.buffers.color.setMask(!0),e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil))}function h(t,n){let i=p(n);i&&(i.isCubeTexture||i.mapping===306)?(l===void 0&&(l=new J(new Y(1,1,1),new go({name:`BackgroundCubeMaterial`,uniforms:so(Ds.backgroundCube.uniforms),vertexShader:Ds.backgroundCube.vertexShader,fragmentShader:Ds.backgroundCube.fragmentShader,side:1,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),l.geometry.deleteAttribute(`normal`),l.geometry.deleteAttribute(`uv`),l.onBeforeRender=function(e,t,n){this.matrixWorld.copyPosition(n.matrixWorld)},Object.defineProperty(l.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),r.update(l)),l.material.uniforms.envMap.value=i,l.material.uniforms.backgroundBlurriness.value=n.backgroundBlurriness,l.material.uniforms.backgroundIntensity.value=n.backgroundIntensity,l.material.uniforms.backgroundRotation.value.setFromMatrix4(ks.makeRotationFromEuler(n.backgroundRotation)).transpose(),i.isCubeTexture&&i.isRenderTargetTexture===!1&&l.material.uniforms.backgroundRotation.value.premultiply(As),l.material.toneMapped=Ht.getTransfer(i.colorSpace)!==Ye,(u!==i||d!==i.version||f!==e.toneMapping)&&(l.material.needsUpdate=!0,u=i,d=i.version,f=e.toneMapping),l.layers.enableAll(),t.unshift(l,l.geometry,l.material,0,0,null)):i&&i.isTexture&&(c===void 0&&(c=new J(new ro(2,2),new go({name:`BackgroundMaterial`,uniforms:so(Ds.background.uniforms),vertexShader:Ds.background.vertexShader,fragmentShader:Ds.background.fragmentShader,side:0,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),c.geometry.deleteAttribute(`normal`),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),r.update(c)),c.material.uniforms.t2D.value=i,c.material.uniforms.backgroundIntensity.value=n.backgroundIntensity,c.material.toneMapped=Ht.getTransfer(i.colorSpace)!==Ye,i.matrixAutoUpdate===!0&&i.updateMatrix(),c.material.uniforms.uvTransform.value.copy(i.matrix),(u!==i||d!==i.version||f!==e.toneMapping)&&(c.material.needsUpdate=!0,u=i,d=i.version,f=e.toneMapping),c.layers.enableAll(),t.unshift(c,c.geometry,c.material,0,0,null))}function g(t,r){t.getRGB(Os,fo(e)),n.buffers.color.setClear(Os.r,Os.g,Os.b,r,a)}function _(){l!==void 0&&(l.geometry.dispose(),l.material.dispose(),l=void 0),c!==void 0&&(c.geometry.dispose(),c.material.dispose(),c=void 0)}return{getClearColor:function(){return o},setClearColor:function(e,t=1){o.set(e),s=t,g(o,s)},getClearAlpha:function(){return s},setClearAlpha:function(e){s=e,g(o,s)},render:m,addToRenderList:h,dispose:_}}function Ms(e,t){let n=e.getParameter(e.MAX_VERTEX_ATTRIBS),r={},i=f(null),a=i,o=!1;function s(n,r,i,s,c){let u=!1,f=d(n,s,i,r);a!==f&&(a=f,l(a.object)),u=p(n,s,i,c),u&&m(n,s,i,c),c!==null&&t.update(c,e.ELEMENT_ARRAY_BUFFER),(u||o)&&(o=!1,b(n,r,i,s),c!==null&&e.bindBuffer(e.ELEMENT_ARRAY_BUFFER,t.get(c).buffer))}function c(){return e.createVertexArray()}function l(t){return e.bindVertexArray(t)}function u(t){return e.deleteVertexArray(t)}function d(e,t,n,i){let a=i.wireframe===!0,o=r[t.id];o===void 0&&(o={},r[t.id]=o);let s=e.isInstancedMesh===!0?e.id:0,l=o[s];l===void 0&&(l={},o[s]=l);let u=l[n.id];u===void 0&&(u={},l[n.id]=u);let d=u[a];return d===void 0&&(d=f(c()),u[a]=d),d}function f(e){let t=[],r=[],i=[];for(let e=0;e<n;e++)t[e]=0,r[e]=0,i[e]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:t,enabledAttributes:r,attributeDivisors:i,object:e,attributes:{},index:null}}function p(e,t,n,r){let i=a.attributes,o=t.attributes,s=0,c=n.getAttributes();for(let t in c)if(c[t].location>=0){let n=i[t],r=o[t];if(r===void 0&&(t===`instanceMatrix`&&e.instanceMatrix&&(r=e.instanceMatrix),t===`instanceColor`&&e.instanceColor&&(r=e.instanceColor)),n===void 0||n.attribute!==r||r&&n.data!==r.data)return!0;s++}return a.attributesNum!==s||a.index!==r}function m(e,t,n,r){let i={},o=t.attributes,s=0,c=n.getAttributes();for(let t in c)if(c[t].location>=0){let n=o[t];n===void 0&&(t===`instanceMatrix`&&e.instanceMatrix&&(n=e.instanceMatrix),t===`instanceColor`&&e.instanceColor&&(n=e.instanceColor));let r={};r.attribute=n,n&&n.data&&(r.data=n.data),i[t]=r,s++}a.attributes=i,a.attributesNum=s,a.index=r}function h(){let e=a.newAttributes;for(let t=0,n=e.length;t<n;t++)e[t]=0}function g(e){_(e,0)}function _(t,n){let r=a.newAttributes,i=a.enabledAttributes,o=a.attributeDivisors;r[t]=1,i[t]===0&&(e.enableVertexAttribArray(t),i[t]=1),o[t]!==n&&(e.vertexAttribDivisor(t,n),o[t]=n)}function v(){let t=a.newAttributes,n=a.enabledAttributes;for(let r=0,i=n.length;r<i;r++)n[r]!==t[r]&&(e.disableVertexAttribArray(r),n[r]=0)}function y(t,n,r,i,a,o,s){s===!0?e.vertexAttribIPointer(t,n,r,a,o):e.vertexAttribPointer(t,n,r,i,a,o)}function b(n,r,i,a){h();let o=a.attributes,s=i.getAttributes(),c=r.defaultAttributeValues;for(let r in s){let i=s[r];if(i.location>=0){let s=o[r];if(s===void 0&&(r===`instanceMatrix`&&n.instanceMatrix&&(s=n.instanceMatrix),r===`instanceColor`&&n.instanceColor&&(s=n.instanceColor)),s!==void 0){let r=s.normalized,o=s.itemSize,c=t.get(s);if(c===void 0)continue;let l=c.buffer,u=c.type,d=c.bytesPerElement,f=u===e.INT||u===e.UNSIGNED_INT||s.gpuType===1013;if(s.isInterleavedBufferAttribute){let t=s.data,c=t.stride,p=s.offset;if(t.isInstancedInterleavedBuffer){for(let e=0;e<i.locationSize;e++)_(i.location+e,t.meshPerAttribute);n.isInstancedMesh!==!0&&a._maxInstanceCount===void 0&&(a._maxInstanceCount=t.meshPerAttribute*t.count)}else for(let e=0;e<i.locationSize;e++)g(i.location+e);e.bindBuffer(e.ARRAY_BUFFER,l);for(let e=0;e<i.locationSize;e++)y(i.location+e,o/i.locationSize,u,r,c*d,(p+o/i.locationSize*e)*d,f)}else{if(s.isInstancedBufferAttribute){for(let e=0;e<i.locationSize;e++)_(i.location+e,s.meshPerAttribute);n.isInstancedMesh!==!0&&a._maxInstanceCount===void 0&&(a._maxInstanceCount=s.meshPerAttribute*s.count)}else for(let e=0;e<i.locationSize;e++)g(i.location+e);e.bindBuffer(e.ARRAY_BUFFER,l);for(let e=0;e<i.locationSize;e++)y(i.location+e,o/i.locationSize,u,r,o*d,o/i.locationSize*e*d,f)}}else if(c!==void 0){let t=c[r];if(t!==void 0)switch(t.length){case 2:e.vertexAttrib2fv(i.location,t);break;case 3:e.vertexAttrib3fv(i.location,t);break;case 4:e.vertexAttrib4fv(i.location,t);break;default:e.vertexAttrib1fv(i.location,t)}}}}v()}function x(){T();for(let e in r){let t=r[e];for(let e in t){let n=t[e];for(let e in n){let t=n[e];for(let e in t)u(t[e].object),delete t[e];delete n[e]}}delete r[e]}}function S(e){if(r[e.id]===void 0)return;let t=r[e.id];for(let e in t){let n=t[e];for(let e in n){let t=n[e];for(let e in t)u(t[e].object),delete t[e];delete n[e]}}delete r[e.id]}function C(e){for(let t in r){let n=r[t];for(let t in n){let r=n[t];if(r[e.id]===void 0)continue;let i=r[e.id];for(let e in i)u(i[e].object),delete i[e];delete r[e.id]}}}function w(e){for(let t in r){let n=r[t],i=e.isInstancedMesh===!0?e.id:0,a=n[i];if(a!==void 0){for(let e in a){let t=a[e];for(let e in t)u(t[e].object),delete t[e];delete a[e]}delete n[i],Object.keys(n).length===0&&delete r[t]}}}function T(){E(),o=!0,a!==i&&(a=i,l(a.object))}function E(){i.geometry=null,i.program=null,i.wireframe=!1}return{setup:s,reset:T,resetDefaultState:E,dispose:x,releaseStatesOfGeometry:S,releaseStatesOfObject:w,releaseStatesOfProgram:C,initAttributes:h,enableAttribute:g,disableUnusedAttributes:v}}function Ns(e,t,n){let r;function i(e){r=e}function a(t,i){e.drawArrays(r,t,i),n.update(i,r,1)}function o(t,i,a){a!==0&&(e.drawArraysInstanced(r,t,i,a),n.update(i,r,a))}function s(e,i,a){if(a===0)return;t.get(`WEBGL_multi_draw`).multiDrawArraysWEBGL(r,e,0,i,0,a);let o=0;for(let e=0;e<a;e++)o+=i[e];n.update(o,r,1)}this.setMode=i,this.render=a,this.renderInstances=o,this.renderMultiDraw=s}function Ps(e,t,n,r){let i;function a(){if(i!==void 0)return i;if(t.has(`EXT_texture_filter_anisotropic`)===!0){let n=t.get(`EXT_texture_filter_anisotropic`);i=e.getParameter(n.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else i=0;return i}function o(t){return t===1023||r.convert(t)===e.getParameter(e.IMPLEMENTATION_COLOR_READ_FORMAT)}function s(n){let i=n===1016&&(t.has(`EXT_color_buffer_half_float`)||t.has(`EXT_color_buffer_float`));return!(n!==1009&&n!==1015&&!i&&r.convert(n)!==e.getParameter(e.IMPLEMENTATION_COLOR_READ_TYPE))}function c(t){if(t===`highp`){if(e.getShaderPrecisionFormat(e.VERTEX_SHADER,e.HIGH_FLOAT).precision>0&&e.getShaderPrecisionFormat(e.FRAGMENT_SHADER,e.HIGH_FLOAT).precision>0)return`highp`;t=`mediump`}return t===`mediump`&&e.getShaderPrecisionFormat(e.VERTEX_SHADER,e.MEDIUM_FLOAT).precision>0&&e.getShaderPrecisionFormat(e.FRAGMENT_SHADER,e.MEDIUM_FLOAT).precision>0?`mediump`:`lowp`}let l=n.precision===void 0?`highp`:n.precision,u=c(l);u!==l&&(z(`WebGLRenderer:`,l,`not supported, using`,u,`instead.`),l=u);let d=n.logarithmicDepthBuffer===!0,f=n.reversedDepthBuffer===!0&&t.has(`EXT_clip_control`);n.reversedDepthBuffer===!0&&f===!1&&z(`WebGLRenderer: Unable to use reversed depth buffer due to missing EXT_clip_control extension. Fallback to default depth buffer.`);let p=e.getParameter(e.MAX_TEXTURE_IMAGE_UNITS),m=e.getParameter(e.MAX_VERTEX_TEXTURE_IMAGE_UNITS),h=e.getParameter(e.MAX_TEXTURE_SIZE),g=e.getParameter(e.MAX_CUBE_MAP_TEXTURE_SIZE),_=e.getParameter(e.MAX_VERTEX_ATTRIBS),v=e.getParameter(e.MAX_VERTEX_UNIFORM_VECTORS),y=e.getParameter(e.MAX_VARYING_VECTORS),b=e.getParameter(e.MAX_FRAGMENT_UNIFORM_VECTORS),x=e.getParameter(e.MAX_SAMPLES),S=e.getParameter(e.SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:a,getMaxPrecision:c,textureFormatReadable:o,textureTypeReadable:s,precision:l,logarithmicDepthBuffer:d,reversedDepthBuffer:f,maxTextures:p,maxVertexTextures:m,maxTextureSize:h,maxCubemapSize:g,maxAttributes:_,maxVertexUniforms:v,maxVaryings:y,maxFragmentUniforms:b,maxSamples:x,samples:S}}function Fs(e){let t=this,n=null,r=0,i=!1,a=!1,o=new zr,s=new G,c={value:null,needsUpdate:!1};this.uniform=c,this.numPlanes=0,this.numIntersection=0,this.init=function(e,t){let n=e.length!==0||t||r!==0||i;return i=t,r=e.length,n},this.beginShadows=function(){a=!0,u(null)},this.endShadows=function(){a=!1},this.setGlobalState=function(e,t){n=u(e,t,0)},this.setState=function(t,o,s){let d=t.clippingPlanes,f=t.clipIntersection,p=t.clipShadows,m=e.get(t);if(!i||d===null||d.length===0||a&&!p)a?u(null):l();else{let e=a?0:r,t=e*4,i=m.clippingState||null;c.value=i,i=u(d,o,t,s);for(let e=0;e!==t;++e)i[e]=n[e];m.clippingState=i,this.numIntersection=f?this.numPlanes:0,this.numPlanes+=e}};function l(){c.value!==n&&(c.value=n,c.needsUpdate=r>0),t.numPlanes=r,t.numIntersection=0}function u(e,n,r,i){let a=e===null?0:e.length,l=null;if(a!==0){if(l=c.value,i!==!0||l===null){let t=r+a*4,i=n.matrixWorldInverse;s.getNormalMatrix(i),(l===null||l.length<t)&&(l=new Float32Array(t));for(let t=0,n=r;t!==a;++t,n+=4)o.copy(e[t]).applyMatrix4(i,s),o.normal.toArray(l,n),l[n+3]=o.constant}c.value=l,c.needsUpdate=!0}return t.numPlanes=a,t.numIntersection=0,l}}var Is=4,Ls=6,Rs=20,zs=256,Bs=new ns,Vs=new q,Hs=null,Us=0,Ws=0,Gs=!1,Ks=new W,qs=new W,Js=class{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._sizeLods=[],this._lodMeshes=[],this._backgroundBox=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._blurMaterial=null,this._ggxMaterial=null}fromScene(e,t=0,n=.1,r=100,i={}){let{size:a=256,position:o=Ks}=i;Hs=this._renderer.getRenderTarget(),Us=this._renderer.getActiveCubeFace(),Ws=this._renderer.getActiveMipmapLevel(),Gs=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(a);let s=this._allocateTargets();return s.depthBuffer=!0,this._sceneToCubeUV(e,n,r,s,o),t>0&&this._blur(s,0,0,t),this._applyPMREM(s),this._cleanup(s),s}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=tc(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=ec(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose(),this._backgroundBox!==null&&(this._backgroundBox.geometry.dispose(),this._backgroundBox.material.dispose())}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=2**this._lodMax}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._ggxMaterial!==null&&this._ggxMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodMeshes.length;e++)this._lodMeshes[e].geometry.dispose()}_cleanup(e){this._renderer.setRenderTarget(Hs,Us,Ws),this._renderer.xr.enabled=Gs,e.scissorTest=!1,Zs(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===301||e.mapping===302?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),Hs=this._renderer.getRenderTarget(),Us=this._renderer.getActiveCubeFace(),Ws=this._renderer.getActiveMipmapLevel(),Gs=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;let n=t||this._allocateTargets();return this._textureToCubeUV(e,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){let e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,n={magFilter:h,minFilter:h,generateMipmaps:!1,type:T,format:N,colorSpace:qe,depthBuffer:!1},r=Xs(e,t,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=Xs(e,t,n);let{_lodMax:r}=this;({lodMeshes:this._lodMeshes,sizeLods:this._sizeLods}=Ys(r)),this._blurMaterial=$s(r,e,t),this._ggxMaterial=Qs(r,e,t)}return r}_compileMaterial(e){let t=new J(new Fr,e);this._renderer.compile(t,Bs)}_sceneToCubeUV(e,t,n,r,i){let a=new $o(90,1,t,n),o=[1,-1,1,1,1,1],s=[1,1,1,-1,-1,-1],c=this._renderer,l=c.autoClear,u=c.toneMapping;c.getClearColor(Vs),c.toneMapping=0,c.autoClear=!1,c.state.buffers.depth.getReversed()&&(c.setRenderTarget(r),c.clearDepth(),c.setRenderTarget(null)),this._backgroundBox===null&&(this._backgroundBox=new J(new Y,new qr({name:`PMREM.Background`,side:1,depthWrite:!1,depthTest:!1})));let d=this._backgroundBox,f=d.material,p=!1,m=e.background;m?m.isColor&&(f.color.copy(m),e.background=null,p=!0):(f.color.copy(Vs),p=!0);for(let t=0;t<6;t++){let n=t%3;n===0?(a.up.set(0,o[t],0),a.position.set(i.x,i.y,i.z),a.lookAt(i.x+s[t],i.y,i.z)):n===1?(a.up.set(0,0,o[t]),a.position.set(i.x,i.y,i.z),a.lookAt(i.x,i.y+s[t],i.z)):(a.up.set(0,o[t],0),a.position.set(i.x,i.y,i.z),a.lookAt(i.x,i.y,i.z+s[t]));let l=this._cubeSize;Zs(r,n*l,t>2?l:0,l,l),c.setRenderTarget(r),p&&c.render(d,a),c.render(e,a)}c.toneMapping=u,c.autoClear=l,e.background=m}_textureToCubeUV(e,t){let n=this._renderer,r=e.mapping===301||e.mapping===302;r?(this._cubemapMaterial===null&&(this._cubemapMaterial=tc()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=ec());let i=r?this._cubemapMaterial:this._equirectMaterial,a=this._lodMeshes[0];a.material=i;let o=i.uniforms;o.envMap.value=e;let s=this._cubeSize;Zs(t,0,0,3*s,2*s),n.setRenderTarget(t),n.render(a,Bs)}_applyPMREM(e){let t=this._renderer,n=t.autoClear;t.autoClear=!1;let r=this._lodMeshes.length;for(let t=1;t<r;t++)this._applyGGXFilter(e,t-1,t);t.autoClear=n}_applyGGXFilter(e,t,n){let r=this._renderer,i=this._pingPongRenderTarget,a=this._ggxMaterial,o=this._lodMeshes[n];o.material=a;let s=a.uniforms,c=n/(this._lodMeshes.length-1),l=t/(this._lodMeshes.length-1),u=Math.sqrt(c*c-l*l)*(c*1.25),{_lodMax:d}=this,f=this._sizeLods[n],p=3*f*(n>d-Is?n-d+Is:0),m=4*(this._cubeSize-f);s.envMap.value=e.texture,s.roughness.value=u,s.mipInt.value=d-t,Zs(i,p,m,3*f,2*f),r.setRenderTarget(i),r.render(o,Bs),s.envMap.value=i.texture,s.roughness.value=0,s.mipInt.value=d-n,Zs(e,p,m,3*f,2*f),r.setRenderTarget(e),r.render(o,Bs)}_blur(e,t,n,r){let i=this._pingPongRenderTarget,a=Math.min(r,Math.PI)/Math.SQRT2;this._blurPass(e,i,t,n,a),this._blurPass(i,e,n,n,a)}_blurPass(e,t,n,r,i){let a=this._renderer,o=this._blurMaterial,s=this._lodMeshes[r];s.material=o;let c=o.uniforms;c.envMap.value=e.texture,c.sigma.value=i,c.mipInt.value=this._lodMax-n;let l=this._sizeLods[r];Zs(t,3*l*(r>this._lodMax-Is?r-this._lodMax+Is:0),4*(this._cubeSize-l),3*l,2*l),a.setRenderTarget(t),a.render(s,Bs)}};function Ys(e){let t=[],n=[],r=e,i=e-Is+1+Ls;for(let e=0;e<i;e++){let e=2**r;t.push(e);let i=1/(e-2),a=-i,o=1+i,s=[a,a,o,a,o,o,a,a,o,o,a,o],c=new Float32Array(108),l=new Float32Array(108);for(let e=0;e<6;e++){let t=e%3*2/3-1,n=e>2?0:-1,r=[t,n,0,t+2/3,n,0,t+2/3,n+1,0,t,n,0,t+2/3,n+1,0,t,n+1,0];c.set(r,18*e);for(let t=0;t<6;t++){let n=s[t*2]*2-1,r=s[t*2+1]*2-1;e===0?qs.set(1,r,n):e===1?qs.set(-n,1,-r):e===2?qs.set(-n,r,1):e===3?qs.set(-1,r,-n):e===4?qs.set(-n,-1,r):qs.set(n,r,-1),qs.toArray(l,(e*6+t)*3)}}let u=new Fr;u.setAttribute(`position`,new br(c,3)),u.setAttribute(`outputDirection`,new br(l,3)),n.push(new J(u,null)),r>Is&&r--}return{lodMeshes:n,sizeLods:t}}function Xs(e,t,n){let r=new tn(e,t,n);return r.texture.mapping=306,r.texture.name=`PMREM.cubeUv`,r.scissorTest=!0,r}function Zs(e,t,n,r,i){e.viewport.set(t,n,r,i),e.scissor.set(t,n,r,i)}function Qs(e,t,n){return new go({name:`PMREMGGXConvolution`,defines:{GGX_SAMPLES:zs,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/n,CUBEUV_MAX_MIP:`${e}.0`},uniforms:{envMap:{value:null},roughness:{value:0},mipInt:{value:0}},vertexShader:nc(),fragmentShader:`

			precision highp float;
			precision highp int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform float roughness;
			uniform float mipInt;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			#define PI 3.14159265359

			// Van der Corput radical inverse
			float radicalInverse_VdC(uint bits) {
				bits = (bits << 16u) | (bits >> 16u);
				bits = ((bits & 0x55555555u) << 1u) | ((bits & 0xAAAAAAAAu) >> 1u);
				bits = ((bits & 0x33333333u) << 2u) | ((bits & 0xCCCCCCCCu) >> 2u);
				bits = ((bits & 0x0F0F0F0Fu) << 4u) | ((bits & 0xF0F0F0F0u) >> 4u);
				bits = ((bits & 0x00FF00FFu) << 8u) | ((bits & 0xFF00FF00u) >> 8u);
				return float(bits) * 2.3283064365386963e-10; // / 0x100000000
			}

			// Hammersley sequence
			vec2 hammersley(uint i, uint N) {
				return vec2(float(i) / float(N), radicalInverse_VdC(i));
			}

			// GGX VNDF importance sampling (Eric Heitz 2018)
			// "Sampling the GGX Distribution of Visible Normals"
			// https://jcgt.org/published/0007/04/01/
			vec3 importanceSampleGGX_VNDF(vec2 Xi, vec3 V, float roughness) {
				float alpha = roughness * roughness;

				// Section 4.1: Orthonormal basis
				vec3 T1 = vec3(1.0, 0.0, 0.0);
				vec3 T2 = cross(V, T1);

				// Section 4.2: Parameterization of projected area
				float r = sqrt(Xi.x);
				float phi = 2.0 * PI * Xi.y;
				float t1 = r * cos(phi);
				float t2 = r * sin(phi);
				float s = 0.5 * (1.0 + V.z);
				t2 = (1.0 - s) * sqrt(1.0 - t1 * t1) + s * t2;

				// Section 4.3: Reprojection onto hemisphere
				vec3 Nh = t1 * T1 + t2 * T2 + sqrt(max(0.0, 1.0 - t1 * t1 - t2 * t2)) * V;

				// Section 3.4: Transform back to ellipsoid configuration
				return normalize(vec3(alpha * Nh.x, alpha * Nh.y, max(0.0, Nh.z)));
			}

			void main() {
				vec3 N = normalize(vOutputDirection);
				vec3 V = N; // Assume view direction equals normal for pre-filtering

				vec3 prefilteredColor = vec3(0.0);
				float totalWeight = 0.0;

				// For very low roughness, just sample the environment directly
				if (roughness < 0.001) {
					gl_FragColor = vec4(bilinearCubeUV(envMap, N, mipInt), 1.0);
					return;
				}

				// Tangent space basis for VNDF sampling
				vec3 up = abs(N.z) < 0.999 ? vec3(0.0, 0.0, 1.0) : vec3(1.0, 0.0, 0.0);
				vec3 tangent = normalize(cross(up, N));
				vec3 bitangent = cross(N, tangent);

				for(uint i = 0u; i < uint(GGX_SAMPLES); i++) {
					vec2 Xi = hammersley(i, uint(GGX_SAMPLES));

					// For PMREM, V = N, so in tangent space V is always (0, 0, 1)
					vec3 H_tangent = importanceSampleGGX_VNDF(Xi, vec3(0.0, 0.0, 1.0), roughness);

					// Transform H back to world space
					vec3 H = normalize(tangent * H_tangent.x + bitangent * H_tangent.y + N * H_tangent.z);
					vec3 L = normalize(2.0 * dot(V, H) * H - V);

					float NdotL = max(dot(N, L), 0.0);

					if(NdotL > 0.0) {
						// Sample environment at fixed mip level
						// VNDF importance sampling handles the distribution filtering
						vec3 sampleColor = bilinearCubeUV(envMap, L, mipInt);

						// Weight by NdotL for the split-sum approximation
						// VNDF PDF naturally accounts for the visible microfacet distribution
						prefilteredColor += sampleColor * NdotL;
						totalWeight += NdotL;
					}
				}

				if (totalWeight > 0.0) {
					prefilteredColor = prefilteredColor / totalWeight;
				}

				gl_FragColor = vec4(prefilteredColor, 1.0);
			}
		`,blending:0,depthTest:!1,depthWrite:!1})}function $s(e,t,n){return new go({name:`SphericalGaussianBlur`,defines:{SAMPLES:Rs,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/n,CUBEUV_MAX_MIP:`${e}.0`},uniforms:{envMap:{value:null},sigma:{value:0},mipInt:{value:0}},vertexShader:nc(),fragmentShader:`

			precision highp float;
			precision highp int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform float sigma;
			uniform float mipInt;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			#define PI 3.14159265359
			#define GOLDEN_ANGLE 2.39996322973

			void main() {

				if ( sigma == 0.0 ) {

					gl_FragColor = vec4( bilinearCubeUV( envMap, vOutputDirection, mipInt ), 1.0 );
					return;

				}

				vec3 outputDirection = normalize( vOutputDirection );

				vec3 up = abs( outputDirection.z ) < 0.999 ? vec3( 0.0, 0.0, 1.0 ) : vec3( 1.0, 0.0, 0.0 );
				vec3 tangent = normalize( cross( up, outputDirection ) );
				vec3 bitangent = cross( outputDirection, tangent );

				// Truncate the kernel at three standard deviations or at the antipode.
				float thetaMax = min( 3.0 * sigma, PI );
				float truncation = 1.0 - exp( - 0.5 * thetaMax * thetaMax / ( sigma * sigma ) );

				vec3 accumColor = vec3( 0.0 );
				float accumWeight = 0.0;

				for ( int i = 0; i < SAMPLES; i ++ ) {

					// Stratified inverse-CDF sampling of the Gaussian, placed on a golden-angle spiral.
					float stratum = ( float( i ) + 0.5 ) / float( SAMPLES );
					float theta = sigma * sqrt( - 2.0 * log( 1.0 - stratum * truncation ) );
					float phi = float( i ) * GOLDEN_ANGLE;

					vec3 offset = cos( phi ) * tangent + sin( phi ) * bitangent;
					vec3 sampleDirection = cos( theta ) * outputDirection + sin( theta ) * offset;

					// Correct the planar sample density to solid angle.
					float weight = sin( theta ) / theta;

					accumColor += weight * bilinearCubeUV( envMap, sampleDirection, mipInt );
					accumWeight += weight;

				}

				gl_FragColor = vec4( accumColor / accumWeight, 1.0 );

			}
		`,blending:0,depthTest:!1,depthWrite:!1})}function ec(){return new go({name:`EquirectangularToCubeUV`,uniforms:{envMap:{value:null}},vertexShader:nc(),fragmentShader:`

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
		`,blending:0,depthTest:!1,depthWrite:!1})}function tc(){return new go({name:`CubemapToCubeUV`,uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:nc(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:0,depthTest:!1,depthWrite:!1})}function nc(){return`

		precision mediump float;
		precision mediump int;

		attribute vec3 outputDirection;

		varying vec3 vOutputDirection;

		void main() {

			vOutputDirection = outputDirection;
			gl_Position = vec4( position, 1.0 );

		}
	`}var rc=class extends tn{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;let n={width:e,height:e,depth:1},r=[n,n,n,n,n,n];this.texture=new Oi(r),this._setTextureOptions(t),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;let n={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},r=new Y(5,5,5),i=new go({name:`CubemapFromEquirect`,uniforms:so(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:1,blending:0});i.uniforms.tEquirect.value=t;let a=new J(r,i),o=t.minFilter;return t.minFilter===1008&&(t.minFilter=h),new cs(1,10,this).update(e,a),t.minFilter=o,a.geometry.dispose(),a.material.dispose(),this}clear(e,t=!0,n=!0,r=!0){let i=e.getRenderTarget();for(let i=0;i<6;i++)e.setRenderTarget(this,i),e.clear(t,n,r);e.setRenderTarget(i)}};function ic(e){let t=new WeakMap,n=new WeakMap,r=null;function i(e,t=!1){return e==null?null:t?o(e):a(e)}function a(n){if(n&&n.isTexture){let r=n.mapping;if(r===303||r===304){if(t.has(n)){let e=t.get(n).texture;return s(e,n.mapping)}{let r=n.image;if(r&&r.height>0){let i=new rc(r.height);return i.fromEquirectangularTexture(e,n),t.set(n,i),n.addEventListener(`dispose`,l),s(i.texture,n.mapping)}return null}}}return n}function o(t){if(t&&t.isTexture){let i=t.mapping,a=i===303||i===304,o=i===301||i===302;if(a||o){let i=n.get(t),s=i===void 0?0:i.texture.pmremVersion;if(t.isRenderTargetTexture&&t.pmremVersion!==s)return r===null&&(r=new Js(e)),i=a?r.fromEquirectangular(t,i):r.fromCubemap(t,i),i.texture.pmremVersion=t.pmremVersion,n.set(t,i),i.texture;if(i!==void 0)return i.texture;{let s=t.image;return a&&s&&s.height>0||o&&s&&c(s)?(r===null&&(r=new Js(e)),i=a?r.fromEquirectangular(t):r.fromCubemap(t),i.texture.pmremVersion=t.pmremVersion,n.set(t,i),t.addEventListener(`dispose`,u),i.texture):null}}}return t}function s(e,t){return t===303?e.mapping=301:t===304&&(e.mapping=302),e}function c(e){let t=0;for(let n=0;n<6;n++)e[n]!==void 0&&t++;return t===6}function l(e){let n=e.target;n.removeEventListener(`dispose`,l);let r=t.get(n);r!==void 0&&(t.delete(n),r.dispose())}function u(e){let t=e.target;t.removeEventListener(`dispose`,u);let r=n.get(t);r!==void 0&&(n.delete(t),r.dispose())}function d(){t=new WeakMap,n=new WeakMap,r!==null&&(r.dispose(),r=null)}return{get:i,dispose:d}}function ac(e){let t={};function n(n){if(t[n]!==void 0)return t[n];let r=e.getExtension(n);return t[n]=r,r}return{has:function(e){return n(e)!==null},init:function(){n(`EXT_color_buffer_float`),n(`WEBGL_clip_cull_distance`),n(`OES_texture_float_linear`),n(`EXT_color_buffer_half_float`),n(`WEBGL_multisampled_render_to_texture`),n(`WEBGL_render_shared_exponent`)},get:function(e){let t=n(e);return t===null&&ot(`WebGLRenderer: `+e+` extension not supported.`),t}}}function oc(e,t,n,r){let i={},a=new WeakMap;function o(e){let s=e.target;s.index!==null&&t.remove(s.index);for(let e in s.attributes)t.remove(s.attributes[e]);s.removeEventListener(`dispose`,o),delete i[s.id];let c=a.get(s);c&&(t.remove(c),a.delete(s)),r.releaseStatesOfGeometry(s),s.isInstancedBufferGeometry===!0&&delete s._maxInstanceCount,n.memory.geometries--}function s(e,t){return i[t.id]===!0||(t.addEventListener(`dispose`,o),i[t.id]=!0,n.memory.geometries++),t}function c(n){let r=n.attributes;for(let n in r)t.update(r[n],e.ARRAY_BUFFER)}function l(e){let n=[],r=e.index,i=e.attributes.position,o=0;if(i===void 0)return;if(r!==null){let e=r.array;o=r.version;for(let t=0,r=e.length;t<r;t+=3){let r=e[t+0],i=e[t+1],a=e[t+2];n.push(r,i,i,a,a,r)}}else{let e=i.array;o=i.version;for(let t=0,r=e.length/3-1;t<r;t+=3){let e=t+0,r=t+1,i=t+2;n.push(e,r,r,i,i,e)}}let s=new(i.count>=65535?Sr:xr)(n,1);s.version=o;let c=a.get(e);c&&t.remove(c),a.set(e,s)}function u(e){let t=a.get(e);if(t){let n=e.index;n!==null&&t.version<n.version&&l(e)}else l(e);return a.get(e)}return{get:s,update:c,getWireframeAttribute:u}}function sc(e,t,n){let r;function i(e){r=e}let a,o;function s(e){a=e.type,o=e.bytesPerElement}function c(t,i){e.drawElements(r,i,a,t*o),n.update(i,r,1)}function l(t,i,s){s!==0&&(e.drawElementsInstanced(r,i,a,t*o,s),n.update(i,r,s))}function u(e,i,o){if(o===0)return;t.get(`WEBGL_multi_draw`).multiDrawElementsWEBGL(r,i,0,a,e,0,o);let s=0;for(let e=0;e<o;e++)s+=i[e];n.update(s,r,1)}this.setMode=i,this.setIndex=s,this.render=c,this.renderInstances=l,this.renderMultiDraw=u}function cc(e){let t={geometries:0,textures:0},n={frame:0,calls:0,triangles:0,points:0,lines:0};function r(t,r,i){switch(n.calls++,r){case e.TRIANGLES:n.triangles+=t/3*i;break;case e.LINES:n.lines+=t/2*i;break;case e.LINE_STRIP:n.lines+=i*(t-1);break;case e.LINE_LOOP:n.lines+=i*t;break;case e.POINTS:n.points+=i*t;break;default:B(`WebGLInfo: Unknown draw mode:`,r)}}function i(){n.calls=0,n.triangles=0,n.points=0,n.lines=0}return{memory:t,render:n,programs:null,autoReset:!0,reset:i,update:r}}function lc(e,t,n){let r=new WeakMap,i=new $t;function a(a,o,s){let c=a.morphTargetInfluences,l=o.morphAttributes.position||o.morphAttributes.normal||o.morphAttributes.color,u=l===void 0?0:l.length,d=r.get(o);if(d===void 0||d.count!==u){d!==void 0&&d.texture.dispose();let e=o.morphAttributes.position!==void 0,n=o.morphAttributes.normal!==void 0,a=o.morphAttributes.color!==void 0,s=o.morphAttributes.position||[],c=o.morphAttributes.normal||[],l=o.morphAttributes.color||[],f=0;e===!0&&(f=1),n===!0&&(f=2),a===!0&&(f=3);let p=o.attributes.position.count*f,m=1;p>t.maxTextureSize&&(m=Math.ceil(p/t.maxTextureSize),p=t.maxTextureSize);let h=new Float32Array(p*m*4*u),g=new nn(h,p,m,u);g.type=w,g.needsUpdate=!0;let _=f*4;for(let t=0;t<u;t++){let r=s[t],o=c[t],u=l[t],d=p*m*4*t;for(let t=0;t<r.count;t++){let s=t*_;e===!0&&(i.fromBufferAttribute(r,t),h[d+s+0]=i.x,h[d+s+1]=i.y,h[d+s+2]=i.z,h[d+s+3]=0),n===!0&&(i.fromBufferAttribute(o,t),h[d+s+4]=i.x,h[d+s+5]=i.y,h[d+s+6]=i.z,h[d+s+7]=0),a===!0&&(i.fromBufferAttribute(u,t),h[d+s+8]=i.x,h[d+s+9]=i.y,h[d+s+10]=i.z,h[d+s+11]=u.itemSize===4?i.w:1)}}d={count:u,texture:g,size:new U(p,m)},r.set(o,d);function v(){g.dispose(),r.delete(o),o.removeEventListener(`dispose`,v)}o.addEventListener(`dispose`,v)}if(a.isInstancedMesh===!0&&a.morphTexture!==null)s.getUniforms().setValue(e,`morphTexture`,a.morphTexture,n);else{let t=0;for(let e=0;e<c.length;e++)t+=c[e];let n=o.morphTargetsRelative?1:1-t;s.getUniforms().setValue(e,`morphTargetBaseInfluence`,n),s.getUniforms().setValue(e,`morphTargetInfluences`,c)}s.getUniforms().setValue(e,`morphTargetsTexture`,d.texture,n),s.getUniforms().setValue(e,`morphTargetsTextureSize`,d.size)}return{update:a}}function uc(e,t,n,r,i){let a=new WeakMap;function o(r){let o=i.render.frame,s=r.geometry,l=t.get(r,s);if(a.get(l)!==o&&(t.update(l),a.set(l,o)),r.isInstancedMesh&&(r.hasEventListener(`dispose`,c)===!1&&r.addEventListener(`dispose`,c),a.get(r)!==o&&(n.update(r.instanceMatrix,e.ARRAY_BUFFER),r.instanceColor!==null&&n.update(r.instanceColor,e.ARRAY_BUFFER),a.set(r,o))),r.isSkinnedMesh){let e=r.skeleton;a.get(e)!==o&&(e.update(),a.set(e,o))}return l}function s(){a=new WeakMap}function c(e){let t=e.target;t.removeEventListener(`dispose`,c),r.releaseStatesOfObject(t),n.remove(t.instanceMatrix),t.instanceColor!==null&&n.remove(t.instanceColor)}return{update:o,dispose:s}}var dc={1:`LINEAR_TONE_MAPPING`,2:`REINHARD_TONE_MAPPING`,3:`CINEON_TONE_MAPPING`,4:`ACES_FILMIC_TONE_MAPPING`,6:`AGX_TONE_MAPPING`,7:`NEUTRAL_TONE_MAPPING`,5:`CUSTOM_TONE_MAPPING`};function fc(e,t,n,r,i,a){let o=new tn(t,n,{type:e,depthBuffer:i,stencilBuffer:a,samples:r?4:0,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,resolveDepthBuffer:!1,resolveStencilBuffer:!1}),s=null,c=null,l=new Fr;l.setAttribute(`position`,new Cr([-1,3,0,-1,-1,0,3,-1,0],3)),l.setAttribute(`uv`,new Cr([0,2,0,0,2,0],2));let u=new _o({uniforms:{tDiffuse:{value:null}},vertexShader:`
			precision highp float;

			uniform mat4 modelViewMatrix;
			uniform mat4 projectionMatrix;

			attribute vec3 position;
			attribute vec2 uv;

			varying vec2 vUv;

			void main() {
				vUv = uv;
				gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
			}`,fragmentShader:`
			precision highp float;

			uniform sampler2D tDiffuse;

			varying vec2 vUv;

			#include <tonemapping_pars_fragment>
			#include <colorspace_pars_fragment>

			void main() {
				gl_FragColor = texture2D( tDiffuse, vUv );

				#ifdef LINEAR_TONE_MAPPING
					gl_FragColor.rgb = LinearToneMapping( gl_FragColor.rgb );
				#elif defined( REINHARD_TONE_MAPPING )
					gl_FragColor.rgb = ReinhardToneMapping( gl_FragColor.rgb );
				#elif defined( CINEON_TONE_MAPPING )
					gl_FragColor.rgb = CineonToneMapping( gl_FragColor.rgb );
				#elif defined( ACES_FILMIC_TONE_MAPPING )
					gl_FragColor.rgb = ACESFilmicToneMapping( gl_FragColor.rgb );
				#elif defined( AGX_TONE_MAPPING )
					gl_FragColor.rgb = AgXToneMapping( gl_FragColor.rgb );
				#elif defined( NEUTRAL_TONE_MAPPING )
					gl_FragColor.rgb = NeutralToneMapping( gl_FragColor.rgb );
				#elif defined( CUSTOM_TONE_MAPPING )
					gl_FragColor.rgb = CustomToneMapping( gl_FragColor.rgb );
				#endif

				#ifdef SRGB_TRANSFER
					gl_FragColor = sRGBTransferOETF( gl_FragColor );
				#endif
			}`,depthTest:!1,depthWrite:!1}),d=new J(l,u),f=new ns(-1,1,1,-1,0,1),p=null,m=null,h=!1,g,_=null,v=[],y=!1;this.setSize=function(e,t){o.setSize(e,t),s!==null&&s.setSize(e,t),c!==null&&c.setSize(e,t);for(let n=0;n<v.length;n++){let r=v[n];r.setSize&&r.setSize(e,t)}},this.setEffects=function(e){v=e,y=v.length>0&&v[0].isRenderPass===!0;let t=o.width,n=o.height;v.length>0&&s===null&&(s=new tn(t,n,{type:T,depthBuffer:!1,stencilBuffer:!1}),c=new tn(t,n,{type:T,depthBuffer:!1,stencilBuffer:!1}));for(let e=0;e<v.length;e++){let r=v[e];r.setSize&&r.setSize(t,n)}},this.begin=function(e,t){if(h||e.toneMapping===0&&v.length===0)return!1;if(_=t,t!==null){let e=t.width,n=t.height;(o.width!==e||o.height!==n)&&this.setSize(e,n)}return y===!1&&e.setRenderTarget(o),g=e.toneMapping,e.toneMapping=0,!0},this.hasRenderPass=function(){return y},this.end=function(e,t){e.toneMapping=g,h=!0;let n=o,r=s;for(let i=0;i<v.length;i++){let a=v[i];a.enabled!==!1&&(a.render(e,r,n,t),a.needsSwap!==!1&&(n=r,r=r===s?c:s))}if(p!==e.outputColorSpace||m!==e.toneMapping){p=e.outputColorSpace,m=e.toneMapping,u.defines={},Ht.getTransfer(p)===`srgb`&&(u.defines.SRGB_TRANSFER=``);let t=dc[m];t&&(u.defines[t]=``),u.needsUpdate=!0}u.uniforms.tDiffuse.value=n.texture,e.setRenderTarget(_),e.render(d,f),_=null,h=!1},this.isCompositing=function(){return h},this.dispose=function(){o.dispose(),s!==null&&s.dispose(),c!==null&&c.dispose(),l.dispose(),u.dispose()}}var pc=new Qt,mc=new Ai(1,1),hc=new nn,gc=new rn,_c=new Oi,vc=[],yc=[],bc=new Float32Array(16),xc=new Float32Array(9),Sc=new Float32Array(4);function Cc(e,t,n){let r=e[0];if(r<=0||r>0)return e;let i=t*n,a=vc[i];if(a===void 0&&(a=new Float32Array(i),vc[i]=a),t!==0){r.toArray(a,0);for(let r=1,i=0;r!==t;++r)i+=n,e[r].toArray(a,i)}return a}function wc(e,t){if(e.length!==t.length)return!1;for(let n=0,r=e.length;n<r;n++)if(e[n]!==t[n])return!1;return!0}function Tc(e,t){for(let n=0,r=t.length;n<r;n++)e[n]=t[n]}function Ec(e,t){let n=yc[t];n===void 0&&(n=new Int32Array(t),yc[t]=n);for(let r=0;r!==t;++r)n[r]=e.allocateTextureUnit();return n}function Dc(e,t){let n=this.cache;n[0]!==t&&(e.uniform1f(this.addr,t),n[0]=t)}function Oc(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y)&&(e.uniform2f(this.addr,t.x,t.y),n[0]=t.x,n[1]=t.y);else{if(wc(n,t))return;e.uniform2fv(this.addr,t),Tc(n,t)}}function kc(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z)&&(e.uniform3f(this.addr,t.x,t.y,t.z),n[0]=t.x,n[1]=t.y,n[2]=t.z);else if(t.r!==void 0)(n[0]!==t.r||n[1]!==t.g||n[2]!==t.b)&&(e.uniform3f(this.addr,t.r,t.g,t.b),n[0]=t.r,n[1]=t.g,n[2]=t.b);else{if(wc(n,t))return;e.uniform3fv(this.addr,t),Tc(n,t)}}function Ac(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z||n[3]!==t.w)&&(e.uniform4f(this.addr,t.x,t.y,t.z,t.w),n[0]=t.x,n[1]=t.y,n[2]=t.z,n[3]=t.w);else{if(wc(n,t))return;e.uniform4fv(this.addr,t),Tc(n,t)}}function jc(e,t){let n=this.cache,r=t.elements;if(r===void 0){if(wc(n,t))return;e.uniformMatrix2fv(this.addr,!1,t),Tc(n,t)}else{if(wc(n,r))return;Sc.set(r),e.uniformMatrix2fv(this.addr,!1,Sc),Tc(n,r)}}function Mc(e,t){let n=this.cache,r=t.elements;if(r===void 0){if(wc(n,t))return;e.uniformMatrix3fv(this.addr,!1,t),Tc(n,t)}else{if(wc(n,r))return;xc.set(r),e.uniformMatrix3fv(this.addr,!1,xc),Tc(n,r)}}function Nc(e,t){let n=this.cache,r=t.elements;if(r===void 0){if(wc(n,t))return;e.uniformMatrix4fv(this.addr,!1,t),Tc(n,t)}else{if(wc(n,r))return;bc.set(r),e.uniformMatrix4fv(this.addr,!1,bc),Tc(n,r)}}function Pc(e,t){let n=this.cache;n[0]!==t&&(e.uniform1i(this.addr,t),n[0]=t)}function Fc(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y)&&(e.uniform2i(this.addr,t.x,t.y),n[0]=t.x,n[1]=t.y);else{if(wc(n,t))return;e.uniform2iv(this.addr,t),Tc(n,t)}}function Ic(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z)&&(e.uniform3i(this.addr,t.x,t.y,t.z),n[0]=t.x,n[1]=t.y,n[2]=t.z);else{if(wc(n,t))return;e.uniform3iv(this.addr,t),Tc(n,t)}}function Lc(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z||n[3]!==t.w)&&(e.uniform4i(this.addr,t.x,t.y,t.z,t.w),n[0]=t.x,n[1]=t.y,n[2]=t.z,n[3]=t.w);else{if(wc(n,t))return;e.uniform4iv(this.addr,t),Tc(n,t)}}function Rc(e,t){let n=this.cache;n[0]!==t&&(e.uniform1ui(this.addr,t),n[0]=t)}function zc(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y)&&(e.uniform2ui(this.addr,t.x,t.y),n[0]=t.x,n[1]=t.y);else{if(wc(n,t))return;e.uniform2uiv(this.addr,t),Tc(n,t)}}function Bc(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z)&&(e.uniform3ui(this.addr,t.x,t.y,t.z),n[0]=t.x,n[1]=t.y,n[2]=t.z);else{if(wc(n,t))return;e.uniform3uiv(this.addr,t),Tc(n,t)}}function Vc(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z||n[3]!==t.w)&&(e.uniform4ui(this.addr,t.x,t.y,t.z,t.w),n[0]=t.x,n[1]=t.y,n[2]=t.z,n[3]=t.w);else{if(wc(n,t))return;e.uniform4uiv(this.addr,t),Tc(n,t)}}function Hc(e,t,n){let r=this.cache,i=n.allocateTextureUnit();r[0]!==i&&(e.uniform1i(this.addr,i),r[0]=i);let a;this.type===e.SAMPLER_2D_SHADOW?(mc.compareFunction=n.isReversedDepthBuffer()?518:515,a=mc):a=pc,n.setTexture2D(t||a,i)}function Uc(e,t,n){let r=this.cache,i=n.allocateTextureUnit();r[0]!==i&&(e.uniform1i(this.addr,i),r[0]=i),n.setTexture3D(t||gc,i)}function Wc(e,t,n){let r=this.cache,i=n.allocateTextureUnit();r[0]!==i&&(e.uniform1i(this.addr,i),r[0]=i),n.setTextureCube(t||_c,i)}function Gc(e,t,n){let r=this.cache,i=n.allocateTextureUnit();r[0]!==i&&(e.uniform1i(this.addr,i),r[0]=i),n.setTexture2DArray(t||hc,i)}function Kc(e){switch(e){case 5126:return Dc;case 35664:return Oc;case 35665:return kc;case 35666:return Ac;case 35674:return jc;case 35675:return Mc;case 35676:return Nc;case 5124:case 35670:return Pc;case 35667:case 35671:return Fc;case 35668:case 35672:return Ic;case 35669:case 35673:return Lc;case 5125:return Rc;case 36294:return zc;case 36295:return Bc;case 36296:return Vc;case 35678:case 36198:case 36298:case 36306:case 35682:return Hc;case 35679:case 36299:case 36307:return Uc;case 35680:case 36300:case 36308:case 36293:return Wc;case 36289:case 36303:case 36311:case 36292:return Gc}}function qc(e,t){e.uniform1fv(this.addr,t)}function Jc(e,t){let n=Cc(t,this.size,2);e.uniform2fv(this.addr,n)}function Yc(e,t){let n=Cc(t,this.size,3);e.uniform3fv(this.addr,n)}function Xc(e,t){let n=Cc(t,this.size,4);e.uniform4fv(this.addr,n)}function Zc(e,t){let n=Cc(t,this.size,4);e.uniformMatrix2fv(this.addr,!1,n)}function Qc(e,t){let n=Cc(t,this.size,9);e.uniformMatrix3fv(this.addr,!1,n)}function $c(e,t){let n=Cc(t,this.size,16);e.uniformMatrix4fv(this.addr,!1,n)}function el(e,t){e.uniform1iv(this.addr,t)}function tl(e,t){e.uniform2iv(this.addr,t)}function nl(e,t){e.uniform3iv(this.addr,t)}function rl(e,t){e.uniform4iv(this.addr,t)}function il(e,t){e.uniform1uiv(this.addr,t)}function al(e,t){e.uniform2uiv(this.addr,t)}function ol(e,t){e.uniform3uiv(this.addr,t)}function sl(e,t){e.uniform4uiv(this.addr,t)}function cl(e,t,n){let r=this.cache,i=t.length,a=Ec(n,i);wc(r,a)||(e.uniform1iv(this.addr,a),Tc(r,a));let o;o=this.type===e.SAMPLER_2D_SHADOW?mc:pc;for(let e=0;e!==i;++e)n.setTexture2D(t[e]||o,a[e])}function ll(e,t,n){let r=this.cache,i=t.length,a=Ec(n,i);wc(r,a)||(e.uniform1iv(this.addr,a),Tc(r,a));for(let e=0;e!==i;++e)n.setTexture3D(t[e]||gc,a[e])}function ul(e,t,n){let r=this.cache,i=t.length,a=Ec(n,i);wc(r,a)||(e.uniform1iv(this.addr,a),Tc(r,a));for(let e=0;e!==i;++e)n.setTextureCube(t[e]||_c,a[e])}function dl(e,t,n){let r=this.cache,i=t.length,a=Ec(n,i);wc(r,a)||(e.uniform1iv(this.addr,a),Tc(r,a));for(let e=0;e!==i;++e)n.setTexture2DArray(t[e]||hc,a[e])}function fl(e){switch(e){case 5126:return qc;case 35664:return Jc;case 35665:return Yc;case 35666:return Xc;case 35674:return Zc;case 35675:return Qc;case 35676:return $c;case 5124:case 35670:return el;case 35667:case 35671:return tl;case 35668:case 35672:return nl;case 35669:case 35673:return rl;case 5125:return il;case 36294:return al;case 36295:return ol;case 36296:return sl;case 35678:case 36198:case 36298:case 36306:case 35682:return cl;case 35679:case 36299:case 36307:return ll;case 35680:case 36300:case 36308:case 36293:return ul;case 36289:case 36303:case 36311:case 36292:return dl}}var pl=class{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.setValue=Kc(t.type)}},ml=class{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=fl(t.type)}},hl=class{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,n){let r=this.seq;for(let i=0,a=r.length;i!==a;++i){let a=r[i];a.setValue(e,t[a.id],n)}}},gl=/(\w+)(\])?(\[|\.)?/g;function _l(e,t){e.seq.push(t),e.map[t.id]=t}function vl(e,t,n){let r=e.name,i=r.length;for(gl.lastIndex=0;;){let a=gl.exec(r),o=gl.lastIndex,s=a[1],c=a[2]===`]`,l=a[3];if(c&&(s|=0),l===void 0||l===`[`&&o+2===i){_l(n,l===void 0?new pl(s,e,t):new ml(s,e,t));break}{let e=n.map[s];e===void 0&&(e=new hl(s),_l(n,e)),n=e}}}var yl=class{constructor(e,t){this.seq=[],this.map={};let n=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let r=0;r<n;++r){let n=e.getActiveUniform(t,r);vl(n,e.getUniformLocation(t,n.name),this)}let r=[],i=[];for(let t of this.seq)t.type===e.SAMPLER_2D_SHADOW||t.type===e.SAMPLER_CUBE_SHADOW||t.type===e.SAMPLER_2D_ARRAY_SHADOW?r.push(t):i.push(t);r.length>0&&(this.seq=r.concat(i))}setValue(e,t,n,r){let i=this.map[t];i!==void 0&&i.setValue(e,n,r)}setOptional(e,t,n){let r=t[n];r!==void 0&&this.setValue(e,n,r)}static upload(e,t,n,r){for(let i=0,a=t.length;i!==a;++i){let a=t[i],o=n[a.id];o.needsUpdate!==!1&&a.setValue(e,o.value,r)}}static seqWithValue(e,t){let n=[];for(let r=0,i=e.length;r!==i;++r){let i=e[r];i.id in t&&n.push(i)}return n}};function bl(e,t,n){let r=e.createShader(t);return e.shaderSource(r,n),e.compileShader(r),r}var xl=37297,Sl=0;function Cl(e,t){let n=e.split(`
`),r=[],i=Math.max(t-6,0),a=Math.min(t+6,n.length);for(let e=i;e<a;e++){let i=e+1;r.push(`${i===t?`>`:` `} ${i}: ${n[e]}`)}return r.join(`
`)}var wl=new G;function Tl(e){Ht._getMatrix(wl,Ht.workingColorSpace,e);let t=`mat3( ${wl.elements.map(e=>e.toFixed(4))} )`;switch(Ht.getTransfer(e)){case Je:return[t,`LinearTransferOETF`];case Ye:return[t,`sRGBTransferOETF`];default:return z(`WebGLProgram: Unsupported color space: `,e),[t,`LinearTransferOETF`]}}function El(e,t,n){let r=e.getShaderParameter(t,e.COMPILE_STATUS),i=(e.getShaderInfoLog(t)||``).trim();if(r&&i===``)return``;let a=/ERROR: 0:(\d+)/.exec(i);if(a){let r=parseInt(a[1]);return n.toUpperCase()+`

`+i+`

`+Cl(e.getShaderSource(t),r)}return i}function Dl(e,t){let n=Tl(t);return[`vec4 ${e}( vec4 value ) {`,`	return ${n[1]}( vec4( value.rgb * ${n[0]}, value.a ) );`,`}`].join(`
`)}var Ol={1:`Linear`,2:`Reinhard`,3:`Cineon`,4:`ACESFilmic`,6:`AgX`,7:`Neutral`,5:`Custom`};function kl(e,t){let n=Ol[t];return n===void 0?(z(`WebGLProgram: Unsupported toneMapping:`,t),`vec3 `+e+`( vec3 color ) { return LinearToneMapping( color ); }`):`vec3 `+e+`( vec3 color ) { return `+n+`ToneMapping( color ); }`}var Al=new W;function jl(){return Ht.getLuminanceCoefficients(Al),[`float luminance( const in vec3 rgb ) {`,`	const vec3 weights = vec3( ${Al.x.toFixed(4)}, ${Al.y.toFixed(4)}, ${Al.z.toFixed(4)} );`,`	return dot( weights, rgb );`,`}`].join(`
`)}function Ml(e){return[e.extensionClipCullDistance?`#extension GL_ANGLE_clip_cull_distance : require`:``,e.extensionMultiDraw?`#extension GL_ANGLE_multi_draw : require`:``].filter(Fl).join(`
`)}function Nl(e){let t=[];for(let n in e){let r=e[n];r!==!1&&t.push(`#define `+n+` `+r)}return t.join(`
`)}function Pl(e,t){let n={},r=e.getProgramParameter(t,e.ACTIVE_ATTRIBUTES);for(let i=0;i<r;i++){let r=e.getActiveAttrib(t,i),a=r.name,o=1;r.type===e.FLOAT_MAT2&&(o=2),r.type===e.FLOAT_MAT3&&(o=3),r.type===e.FLOAT_MAT4&&(o=4),n[a]={type:r.type,location:e.getAttribLocation(t,a),locationSize:o}}return n}function Fl(e){return e!==``}function Il(e,t){let n=t.numSpotLightShadows+t.numSpotLightMaps-t.numSpotLightShadowsWithMaps;return e.replace(/NUM_SUN_LIGHTS/g,t.numSunLights).replace(/NUM_DIR_LIGHTS/g,t.numDirLights).replace(/NUM_SPOT_LIGHTS/g,t.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,t.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,n).replace(/NUM_RECT_AREA_LIGHTS/g,t.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,t.numPointLights).replace(/NUM_HEMI_LIGHTS/g,t.numHemiLights).replace(/NUM_SUN_LIGHT_SHADOWS/g,t.numSunLightShadows).replace(/NUM_DIR_LIGHT_SHADOWS/g,t.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,t.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,t.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,t.numPointLightShadows)}function Ll(e,t){return e.replace(/NUM_CLIPPING_PLANES/g,t.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,t.numClippingPlanes-t.numClipIntersection)}var Rl=/^[ \t]*#include +<([\w\d./]+)>/gm;function zl(e){return e.replace(Rl,Vl)}var Bl=new Map;function Vl(e,t){let n=Es[t];if(n===void 0){let e=Bl.get(t);if(e!==void 0)n=Es[e],z(`WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.`,t,e);else throw Error(`THREE.WebGLProgram: Can not resolve #include <`+t+`>`)}return zl(n)}var Hl=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function Ul(e){return e.replace(Hl,Wl)}function Wl(e,t,n,r){let i=``;for(let e=parseInt(t);e<parseInt(n);e++)i+=r.replace(/\[\s*i\s*\]/g,`[ `+e+` ]`).replace(/UNROLLED_LOOP_INDEX/g,e);return i}function Gl(e){let t=`precision ${e.precision} float;
	precision ${e.precision} int;
	precision ${e.precision} sampler2D;
	precision ${e.precision} samplerCube;
	precision ${e.precision} sampler3D;
	precision ${e.precision} sampler2DArray;
	precision ${e.precision} sampler2DShadow;
	precision ${e.precision} samplerCubeShadow;
	precision ${e.precision} sampler2DArrayShadow;
	precision ${e.precision} isampler2D;
	precision ${e.precision} isampler3D;
	precision ${e.precision} isamplerCube;
	precision ${e.precision} isampler2DArray;
	precision ${e.precision} usampler2D;
	precision ${e.precision} usampler3D;
	precision ${e.precision} usamplerCube;
	precision ${e.precision} usampler2DArray;
	`;return e.precision===`highp`?t+=`
#define HIGH_PRECISION`:e.precision===`mediump`?t+=`
#define MEDIUM_PRECISION`:e.precision===`lowp`&&(t+=`
#define LOW_PRECISION`),t}var Kl={1:`SHADOWMAP_TYPE_PCF`,3:`SHADOWMAP_TYPE_VSM`};function ql(e){return Kl[e.shadowMapType]||`SHADOWMAP_TYPE_BASIC`}var Jl={301:`ENVMAP_TYPE_CUBE`,302:`ENVMAP_TYPE_CUBE`,306:`ENVMAP_TYPE_CUBE_UV`};function Yl(e){return e.envMap===!1?`ENVMAP_TYPE_CUBE`:Jl[e.envMapMode]||`ENVMAP_TYPE_CUBE`}var Xl={302:`ENVMAP_MODE_REFRACTION`};function Zl(e){return e.envMap===!1?`ENVMAP_MODE_REFLECTION`:Xl[e.envMapMode]||`ENVMAP_MODE_REFLECTION`}var Ql={0:`ENVMAP_BLENDING_MULTIPLY`,1:`ENVMAP_BLENDING_MIX`,2:`ENVMAP_BLENDING_ADD`};function $l(e){return e.envMap===!1?`ENVMAP_BLENDING_NONE`:Ql[e.combine]||`ENVMAP_BLENDING_NONE`}function eu(e){let t=e.envMapCubeUVHeight;if(t===null)return null;let n=Math.log2(t)-2,r=1/t;return{texelWidth:1/(3*Math.max(2**n,112)),texelHeight:r,maxMip:n}}function tu(e,t,n,r){let i=e.getContext(),a=n.defines,o=n.vertexShader,s=n.fragmentShader,c=ql(n),l=Yl(n),u=Zl(n),d=$l(n),f=eu(n),p=Ml(n),m=Nl(a),h=i.createProgram(),g,_,v=n.glslVersion?`#version `+n.glslVersion+`
`:``;n.isRawShaderMaterial?(g=[`#define SHADER_TYPE `+n.shaderType,`#define SHADER_NAME `+n.shaderName,m].filter(Fl).join(`
`),g.length>0&&(g+=`
`),_=[`#define SHADER_TYPE `+n.shaderType,`#define SHADER_NAME `+n.shaderName,m].filter(Fl).join(`
`),_.length>0&&(_+=`
`)):(g=[Gl(n),`#define SHADER_TYPE `+n.shaderType,`#define SHADER_NAME `+n.shaderName,m,n.extensionClipCullDistance?`#define USE_CLIP_DISTANCE`:``,n.batching?`#define USE_BATCHING`:``,n.batchingColor?`#define USE_BATCHING_COLOR`:``,n.instancing?`#define USE_INSTANCING`:``,n.instancingColor?`#define USE_INSTANCING_COLOR`:``,n.instancingMorph?`#define USE_INSTANCING_MORPH`:``,n.useFog&&n.fog?`#define USE_FOG`:``,n.useFog&&n.fogExp2?`#define FOG_EXP2`:``,n.map?`#define USE_MAP`:``,n.envMap?`#define USE_ENVMAP`:``,n.envMap?`#define `+u:``,n.lightMap?`#define USE_LIGHTMAP`:``,n.aoMap?`#define USE_AOMAP`:``,n.bumpMap?`#define USE_BUMPMAP`:``,n.normalMap?`#define USE_NORMALMAP`:``,n.normalMapObjectSpace?`#define USE_NORMALMAP_OBJECTSPACE`:``,n.normalMapTangentSpace?`#define USE_NORMALMAP_TANGENTSPACE`:``,n.displacementMap?`#define USE_DISPLACEMENTMAP`:``,n.emissiveMap?`#define USE_EMISSIVEMAP`:``,n.anisotropy?`#define USE_ANISOTROPY`:``,n.anisotropyMap?`#define USE_ANISOTROPYMAP`:``,n.clearcoatMap?`#define USE_CLEARCOATMAP`:``,n.clearcoatRoughnessMap?`#define USE_CLEARCOAT_ROUGHNESSMAP`:``,n.clearcoatNormalMap?`#define USE_CLEARCOAT_NORMALMAP`:``,n.iridescenceMap?`#define USE_IRIDESCENCEMAP`:``,n.iridescenceThicknessMap?`#define USE_IRIDESCENCE_THICKNESSMAP`:``,n.specularMap?`#define USE_SPECULARMAP`:``,n.specularColorMap?`#define USE_SPECULAR_COLORMAP`:``,n.specularIntensityMap?`#define USE_SPECULAR_INTENSITYMAP`:``,n.roughnessMap?`#define USE_ROUGHNESSMAP`:``,n.metalnessMap?`#define USE_METALNESSMAP`:``,n.alphaMap?`#define USE_ALPHAMAP`:``,n.alphaHash?`#define USE_ALPHAHASH`:``,n.transmission?`#define USE_TRANSMISSION`:``,n.transmissionMap?`#define USE_TRANSMISSIONMAP`:``,n.thicknessMap?`#define USE_THICKNESSMAP`:``,n.sheenColorMap?`#define USE_SHEEN_COLORMAP`:``,n.sheenRoughnessMap?`#define USE_SHEEN_ROUGHNESSMAP`:``,n.mapUv?`#define MAP_UV `+n.mapUv:``,n.alphaMapUv?`#define ALPHAMAP_UV `+n.alphaMapUv:``,n.lightMapUv?`#define LIGHTMAP_UV `+n.lightMapUv:``,n.aoMapUv?`#define AOMAP_UV `+n.aoMapUv:``,n.emissiveMapUv?`#define EMISSIVEMAP_UV `+n.emissiveMapUv:``,n.bumpMapUv?`#define BUMPMAP_UV `+n.bumpMapUv:``,n.normalMapUv?`#define NORMALMAP_UV `+n.normalMapUv:``,n.displacementMapUv?`#define DISPLACEMENTMAP_UV `+n.displacementMapUv:``,n.metalnessMapUv?`#define METALNESSMAP_UV `+n.metalnessMapUv:``,n.roughnessMapUv?`#define ROUGHNESSMAP_UV `+n.roughnessMapUv:``,n.anisotropyMapUv?`#define ANISOTROPYMAP_UV `+n.anisotropyMapUv:``,n.clearcoatMapUv?`#define CLEARCOATMAP_UV `+n.clearcoatMapUv:``,n.clearcoatNormalMapUv?`#define CLEARCOAT_NORMALMAP_UV `+n.clearcoatNormalMapUv:``,n.clearcoatRoughnessMapUv?`#define CLEARCOAT_ROUGHNESSMAP_UV `+n.clearcoatRoughnessMapUv:``,n.iridescenceMapUv?`#define IRIDESCENCEMAP_UV `+n.iridescenceMapUv:``,n.iridescenceThicknessMapUv?`#define IRIDESCENCE_THICKNESSMAP_UV `+n.iridescenceThicknessMapUv:``,n.sheenColorMapUv?`#define SHEEN_COLORMAP_UV `+n.sheenColorMapUv:``,n.sheenRoughnessMapUv?`#define SHEEN_ROUGHNESSMAP_UV `+n.sheenRoughnessMapUv:``,n.specularMapUv?`#define SPECULARMAP_UV `+n.specularMapUv:``,n.specularColorMapUv?`#define SPECULAR_COLORMAP_UV `+n.specularColorMapUv:``,n.specularIntensityMapUv?`#define SPECULAR_INTENSITYMAP_UV `+n.specularIntensityMapUv:``,n.transmissionMapUv?`#define TRANSMISSIONMAP_UV `+n.transmissionMapUv:``,n.thicknessMapUv?`#define THICKNESSMAP_UV `+n.thicknessMapUv:``,n.vertexTangents&&n.flatShading===!1?`#define USE_TANGENT`:``,n.vertexNormals?`#define HAS_NORMAL`:``,n.vertexColors?`#define USE_COLOR`:``,n.vertexAlphas?`#define USE_COLOR_ALPHA`:``,n.vertexUv1s?`#define USE_UV1`:``,n.vertexUv2s?`#define USE_UV2`:``,n.vertexUv3s?`#define USE_UV3`:``,n.pointsUvs?`#define USE_POINTS_UV`:``,n.flatShading?`#define FLAT_SHADED`:``,n.skinning?`#define USE_SKINNING`:``,n.morphTargets?`#define USE_MORPHTARGETS`:``,n.morphNormals&&n.flatShading===!1?`#define USE_MORPHNORMALS`:``,n.morphColors?`#define USE_MORPHCOLORS`:``,n.morphTargetsCount>0?`#define MORPHTARGETS_TEXTURE_STRIDE `+n.morphTextureStride:``,n.morphTargetsCount>0?`#define MORPHTARGETS_COUNT `+n.morphTargetsCount:``,n.doubleSided?`#define DOUBLE_SIDED`:``,n.flipSided?`#define FLIP_SIDED`:``,n.shadowMapEnabled?`#define USE_SHADOWMAP`:``,n.shadowMapEnabled?`#define `+c:``,n.sizeAttenuation?`#define USE_SIZEATTENUATION`:``,n.numLightProbes>0?`#define USE_LIGHT_PROBES`:``,n.logarithmicDepthBuffer?`#define USE_LOGARITHMIC_DEPTH_BUFFER`:``,n.reversedDepthBuffer?`#define USE_REVERSED_DEPTH_BUFFER`:``,`uniform mat4 modelMatrix;`,`uniform mat4 modelViewMatrix;`,`uniform mat4 projectionMatrix;`,`uniform mat4 viewMatrix;`,`uniform mat3 normalMatrix;`,`uniform vec3 cameraPosition;`,`uniform bool isOrthographic;`,`#ifdef USE_INSTANCING`,`	attribute mat4 instanceMatrix;`,`#endif`,`#ifdef USE_INSTANCING_COLOR`,`	attribute vec3 instanceColor;`,`#endif`,`#ifdef USE_INSTANCING_MORPH`,`	uniform sampler2D morphTexture;`,`#endif`,`attribute vec3 position;`,`attribute vec3 normal;`,`attribute vec2 uv;`,`#ifdef USE_UV1`,`	attribute vec2 uv1;`,`#endif`,`#ifdef USE_UV2`,`	attribute vec2 uv2;`,`#endif`,`#ifdef USE_UV3`,`	attribute vec2 uv3;`,`#endif`,`#ifdef USE_TANGENT`,`	attribute vec4 tangent;`,`#endif`,`#if defined( USE_COLOR_ALPHA )`,`	attribute vec4 color;`,`#elif defined( USE_COLOR )`,`	attribute vec3 color;`,`#endif`,`#ifdef USE_SKINNING`,`	attribute vec4 skinIndex;`,`	attribute vec4 skinWeight;`,`#endif`,`
`].filter(Fl).join(`
`),_=[Gl(n),`#define SHADER_TYPE `+n.shaderType,`#define SHADER_NAME `+n.shaderName,m,n.useFog&&n.fog?`#define USE_FOG`:``,n.useFog&&n.fogExp2?`#define FOG_EXP2`:``,n.alphaToCoverage?`#define ALPHA_TO_COVERAGE`:``,n.map?`#define USE_MAP`:``,n.matcap?`#define USE_MATCAP`:``,n.envMap?`#define USE_ENVMAP`:``,n.envMap?`#define `+l:``,n.envMap?`#define `+u:``,n.envMap?`#define `+d:``,f?`#define CUBEUV_TEXEL_WIDTH `+f.texelWidth:``,f?`#define CUBEUV_TEXEL_HEIGHT `+f.texelHeight:``,f?`#define CUBEUV_MAX_MIP `+f.maxMip+`.0`:``,n.lightMap?`#define USE_LIGHTMAP`:``,n.aoMap?`#define USE_AOMAP`:``,n.bumpMap?`#define USE_BUMPMAP`:``,n.normalMap?`#define USE_NORMALMAP`:``,n.normalMapObjectSpace?`#define USE_NORMALMAP_OBJECTSPACE`:``,n.normalMapTangentSpace?`#define USE_NORMALMAP_TANGENTSPACE`:``,n.packedNormalMap?`#define USE_PACKED_NORMALMAP`:``,n.emissiveMap?`#define USE_EMISSIVEMAP`:``,n.anisotropy?`#define USE_ANISOTROPY`:``,n.anisotropyMap?`#define USE_ANISOTROPYMAP`:``,n.clearcoat?`#define USE_CLEARCOAT`:``,n.clearcoatMap?`#define USE_CLEARCOATMAP`:``,n.clearcoatRoughnessMap?`#define USE_CLEARCOAT_ROUGHNESSMAP`:``,n.clearcoatNormalMap?`#define USE_CLEARCOAT_NORMALMAP`:``,n.dispersion?`#define USE_DISPERSION`:``,n.retroreflection?`#define USE_RETROREFLECTION`:``,n.iridescence?`#define USE_IRIDESCENCE`:``,n.iridescenceMap?`#define USE_IRIDESCENCEMAP`:``,n.iridescenceThicknessMap?`#define USE_IRIDESCENCE_THICKNESSMAP`:``,n.specularMap?`#define USE_SPECULARMAP`:``,n.specularColorMap?`#define USE_SPECULAR_COLORMAP`:``,n.specularIntensityMap?`#define USE_SPECULAR_INTENSITYMAP`:``,n.roughnessMap?`#define USE_ROUGHNESSMAP`:``,n.metalnessMap?`#define USE_METALNESSMAP`:``,n.alphaMap?`#define USE_ALPHAMAP`:``,n.alphaTest?`#define USE_ALPHATEST`:``,n.alphaHash?`#define USE_ALPHAHASH`:``,n.sheen?`#define USE_SHEEN`:``,n.sheenColorMap?`#define USE_SHEEN_COLORMAP`:``,n.sheenRoughnessMap?`#define USE_SHEEN_ROUGHNESSMAP`:``,n.transmission?`#define USE_TRANSMISSION`:``,n.transmissionMap?`#define USE_TRANSMISSIONMAP`:``,n.thicknessMap?`#define USE_THICKNESSMAP`:``,n.vertexTangents&&n.flatShading===!1?`#define USE_TANGENT`:``,n.vertexColors||n.instancingColor?`#define USE_COLOR`:``,n.vertexAlphas||n.batchingColor?`#define USE_COLOR_ALPHA`:``,n.vertexUv1s?`#define USE_UV1`:``,n.vertexUv2s?`#define USE_UV2`:``,n.vertexUv3s?`#define USE_UV3`:``,n.pointsUvs?`#define USE_POINTS_UV`:``,n.gradientMap?`#define USE_GRADIENTMAP`:``,n.flatShading?`#define FLAT_SHADED`:``,n.doubleSided?`#define DOUBLE_SIDED`:``,n.flipSided?`#define FLIP_SIDED`:``,n.shadowMapEnabled?`#define USE_SHADOWMAP`:``,n.shadowMapEnabled?`#define `+c:``,n.premultipliedAlpha?`#define PREMULTIPLIED_ALPHA`:``,n.numLightProbes>0?`#define USE_LIGHT_PROBES`:``,n.numLightProbeGrids>0?`#define USE_LIGHT_PROBES_GRID`:``,n.decodeVideoTexture?`#define DECODE_VIDEO_TEXTURE`:``,n.decodeVideoTextureEmissive?`#define DECODE_VIDEO_TEXTURE_EMISSIVE`:``,n.logarithmicDepthBuffer?`#define USE_LOGARITHMIC_DEPTH_BUFFER`:``,n.reversedDepthBuffer?`#define USE_REVERSED_DEPTH_BUFFER`:``,`uniform mat4 viewMatrix;`,`uniform vec3 cameraPosition;`,`uniform bool isOrthographic;`,n.toneMapping===0?``:`#define TONE_MAPPING`,n.toneMapping===0?``:Es.tonemapping_pars_fragment,n.toneMapping===0?``:kl(`toneMapping`,n.toneMapping),n.dithering?`#define DITHERING`:``,n.opaque?`#define OPAQUE`:``,Es.colorspace_pars_fragment,Dl(`linearToOutputTexel`,n.outputColorSpace),jl(),n.useDepthPacking?`#define DEPTH_PACKING `+n.depthPacking:``,`
`].filter(Fl).join(`
`)),o=zl(o),o=Il(o,n),o=Ll(o,n),s=zl(s),s=Il(s,n),s=Ll(s,n),o=Ul(o),s=Ul(s),n.isRawShaderMaterial!==!0&&(v=`#version 300 es
`,g=[p,`#define attribute in`,`#define varying out`,`#define texture2D texture`].join(`
`)+`
`+g,_=[`#define varying in`,n.glslVersion===`300 es`?``:`layout(location = 0) out highp vec4 pc_fragColor;`,n.glslVersion===`300 es`?``:`#define gl_FragColor pc_fragColor`,`#define gl_FragDepthEXT gl_FragDepth`,`#define texture2D texture`,`#define textureCube texture`,`#define texture2DProj textureProj`,`#define texture2DLodEXT textureLod`,`#define texture2DProjLodEXT textureProjLod`,`#define textureCubeLodEXT textureLod`,`#define texture2DGradEXT textureGrad`,`#define texture2DProjGradEXT textureProjGrad`,`#define textureCubeGradEXT textureGrad`].join(`
`)+`
`+_);let y=v+g+o,b=v+_+s,x=bl(i,i.VERTEX_SHADER,y),S=bl(i,i.FRAGMENT_SHADER,b);i.attachShader(h,x),i.attachShader(h,S),n.index0AttributeName===void 0?n.hasPositionAttribute===!0&&i.bindAttribLocation(h,0,`position`):i.bindAttribLocation(h,0,n.index0AttributeName),i.linkProgram(h);function C(t){if(e.debug.checkShaderErrors){let n=i.getProgramInfoLog(h)||``,r=i.getShaderInfoLog(x)||``,a=i.getShaderInfoLog(S)||``,o=n.trim(),s=r.trim(),c=a.trim(),l=!0,u=!0;if(i.getProgramParameter(h,i.LINK_STATUS)===!1){if(l=!1,typeof e.debug.onShaderError==`function`)e.debug.onShaderError(i,h,x,S);else{let e=El(i,x,`vertex`),n=El(i,S,`fragment`);B(`WebGLProgram: Shader Error `+i.getError()+` - VALIDATE_STATUS `+i.getProgramParameter(h,i.VALIDATE_STATUS)+`

Material Name: `+t.name+`
Material Type: `+t.type+`

Program Info Log: `+o+`
`+e+`
`+n)}}else o===``?(s===``||c===``)&&(u=!1):z(`WebGLProgram: Program Info Log:`,o);u&&(t.diagnostics={runnable:l,programLog:o,vertexShader:{log:s,prefix:g},fragmentShader:{log:c,prefix:_}})}i.deleteShader(x),i.deleteShader(S),w=new yl(i,h),T=Pl(i,h)}let w;this.getUniforms=function(){return w===void 0&&C(this),w};let T;this.getAttributes=function(){return T===void 0&&C(this),T};let E=n.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return E===!1&&(E=i.getProgramParameter(h,xl)),E},this.destroy=function(){r.releaseStatesOfProgram(this),i.deleteProgram(h),this.program=void 0},this.type=n.shaderType,this.name=n.shaderName,this.id=Sl++,this.cacheKey=t,this.usedTimes=1,this.program=h,this.vertexShader=x,this.fragmentShader=S,this}var nu=0,ru=class{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e,t,n){let r=this._getShaderCacheForMaterial(e);return r.has(t)===!1&&(r.add(t),t.usedTimes++),r.has(n)===!1&&(r.add(n),n.usedTimes++),this}remove(e){let t=this.materialCache.get(e);for(let e of t)e.usedTimes--,e.usedTimes===0&&this.shaderCache.delete(e.code);return this.materialCache.delete(e),this}getVertexShaderStage(e){return this._getShaderStage(e.vertexShader)}getFragmentShaderStage(e){return this._getShaderStage(e.fragmentShader)}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){let t=this.materialCache,n=t.get(e);return n===void 0&&(n=new Set,t.set(e,n)),n}_getShaderStage(e){let t=this.shaderCache,n=t.get(e);return n===void 0&&(n=new iu(e),t.set(e,n)),n}},iu=class{constructor(e){this.id=nu++,this.code=e,this.usedTimes=0}};function au(e){return e===1030||e===37490||e===36285}function ou(e,t,n,r,i,a){let o=new gn,s=new ru,c=new Set,l=[],u=new Map,d=r.logarithmicDepthBuffer,f=r.precision,p={MeshDepthMaterial:`depth`,MeshDistanceMaterial:`distance`,MeshNormalMaterial:`normal`,MeshBasicMaterial:`basic`,MeshLambertMaterial:`lambert`,MeshPhongMaterial:`phong`,MeshToonMaterial:`toon`,MeshStandardMaterial:`physical`,MeshPhysicalMaterial:`physical`,MeshMatcapMaterial:`matcap`,LineBasicMaterial:`basic`,LineDashedMaterial:`dashed`,PointsMaterial:`points`,ShadowMaterial:`shadow`,SpriteMaterial:`sprite`};function m(e){return c.add(e),e===0?`uv`:`uv${e}`}function h(i,o,l,u,h,g){let _=u.fog,v=h.geometry,y=i.isMeshStandardMaterial||i.isMeshLambertMaterial||i.isMeshPhongMaterial?u.environment:null,b=i.isMeshStandardMaterial||i.isMeshLambertMaterial&&!i.envMap||i.isMeshPhongMaterial&&!i.envMap,x=t.get(i.envMap||y,b),S=x&&x.mapping===306?x.image.height:null,C=p[i.type];i.precision!==null&&(f=r.getMaxPrecision(i.precision),f!==i.precision&&z(`WebGLProgram.getParameters:`,i.precision,`not supported, using`,f,`instead.`));let w=v.morphAttributes.position||v.morphAttributes.normal||v.morphAttributes.color,T=w===void 0?0:w.length,E=0;v.morphAttributes.position!==void 0&&(E=1),v.morphAttributes.normal!==void 0&&(E=2),v.morphAttributes.color!==void 0&&(E=3);let D,O,k,A;if(C){let e=Ds[C];D=e.vertexShader,O=e.fragmentShader}else{D=i.vertexShader,O=i.fragmentShader;let e=s.getVertexShaderStage(i),t=s.getFragmentShaderStage(i);s.update(i,e,t),k=e.id,A=t.id}let j=e.getRenderTarget(),M=e.state.buffers.depth.getReversed(),N=h.isInstancedMesh===!0,ee=h.isBatchedMesh===!0,P=!!i.map,te=!!i.matcap,ne=!!x,re=!!i.aoMap,ie=!!i.lightMap,ae=!!i.bumpMap&&i.wireframe===!1,oe=!!i.normalMap,se=!!i.displacementMap,ce=!!i.emissiveMap,F=!!i.metalnessMap,le=!!i.roughnessMap,ue=i.anisotropy>0,de=i.clearcoat>0,fe=i.dispersion>0,pe=i.retroreflectivity>0,me=i.iridescence>0,he=i.sheen>0,ge=i.transmission>0,_e=ue&&!!i.anisotropyMap,ve=de&&!!i.clearcoatMap,ye=de&&!!i.clearcoatNormalMap,be=de&&!!i.clearcoatRoughnessMap,xe=me&&!!i.iridescenceMap,Se=me&&!!i.iridescenceThicknessMap,Ce=he&&!!i.sheenColorMap,we=he&&!!i.sheenRoughnessMap,Te=!!i.specularMap,Ee=!!i.specularColorMap,De=!!i.specularIntensityMap,Oe=ge&&!!i.transmissionMap,ke=ge&&!!i.thicknessMap,Ae=!!i.gradientMap,je=!!i.alphaMap,Me=i.alphaTest>0,I=!!i.alphaHash,Ne=!!i.extensions,Pe=0;i.toneMapped&&(j===null||j.isXRRenderTarget===!0)&&(Pe=e.toneMapping);let Fe={shaderID:C,shaderType:i.type,shaderName:i.name,vertexShader:D,fragmentShader:O,defines:i.defines,customVertexShaderID:k,customFragmentShaderID:A,isRawShaderMaterial:i.isRawShaderMaterial===!0,glslVersion:i.glslVersion,precision:f,batching:ee,batchingColor:ee&&h._colorsTexture!==null,instancing:N,instancingColor:N&&h.instanceColor!==null,instancingMorph:N&&h.morphTexture!==null,outputColorSpace:j===null?e.outputColorSpace:j.isXRRenderTarget===!0?j.texture.colorSpace:Ht.workingColorSpace,alphaToCoverage:!!i.alphaToCoverage,map:P,matcap:te,envMap:ne,envMapMode:ne&&x.mapping,envMapCubeUVHeight:S,aoMap:re,lightMap:ie,bumpMap:ae,normalMap:oe,displacementMap:se,emissiveMap:ce,normalMapObjectSpace:oe&&i.normalMapType===1,normalMapTangentSpace:oe&&i.normalMapType===0,packedNormalMap:oe&&i.normalMapType===0&&au(i.normalMap.format),metalnessMap:F,roughnessMap:le,anisotropy:ue,anisotropyMap:_e,clearcoat:de,clearcoatMap:ve,clearcoatNormalMap:ye,clearcoatRoughnessMap:be,dispersion:fe,retroreflection:pe,iridescence:me,iridescenceMap:xe,iridescenceThicknessMap:Se,sheen:he,sheenColorMap:Ce,sheenRoughnessMap:we,specularMap:Te,specularColorMap:Ee,specularIntensityMap:De,transmission:ge,transmissionMap:Oe,thicknessMap:ke,gradientMap:Ae,opaque:i.transparent===!1&&i.blending===1&&i.alphaToCoverage===!1,alphaMap:je,alphaTest:Me,alphaHash:I,combine:i.combine,mapUv:P&&m(i.map.channel),aoMapUv:re&&m(i.aoMap.channel),lightMapUv:ie&&m(i.lightMap.channel),bumpMapUv:ae&&m(i.bumpMap.channel),normalMapUv:oe&&m(i.normalMap.channel),displacementMapUv:se&&m(i.displacementMap.channel),emissiveMapUv:ce&&m(i.emissiveMap.channel),metalnessMapUv:F&&m(i.metalnessMap.channel),roughnessMapUv:le&&m(i.roughnessMap.channel),anisotropyMapUv:_e&&m(i.anisotropyMap.channel),clearcoatMapUv:ve&&m(i.clearcoatMap.channel),clearcoatNormalMapUv:ye&&m(i.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:be&&m(i.clearcoatRoughnessMap.channel),iridescenceMapUv:xe&&m(i.iridescenceMap.channel),iridescenceThicknessMapUv:Se&&m(i.iridescenceThicknessMap.channel),sheenColorMapUv:Ce&&m(i.sheenColorMap.channel),sheenRoughnessMapUv:we&&m(i.sheenRoughnessMap.channel),specularMapUv:Te&&m(i.specularMap.channel),specularColorMapUv:Ee&&m(i.specularColorMap.channel),specularIntensityMapUv:De&&m(i.specularIntensityMap.channel),transmissionMapUv:Oe&&m(i.transmissionMap.channel),thicknessMapUv:ke&&m(i.thicknessMap.channel),alphaMapUv:je&&m(i.alphaMap.channel),vertexTangents:!!v.attributes.tangent&&(oe||ue),vertexNormals:!!v.attributes.normal,vertexColors:i.vertexColors,vertexAlphas:i.vertexColors===!0&&!!v.attributes.color&&v.attributes.color.itemSize===4,pointsUvs:h.isPoints===!0&&!!v.attributes.uv&&(P||je),fog:!!_,useFog:i.fog===!0,fogExp2:!!_&&_.isFogExp2,flatShading:i.wireframe===!1&&(i.flatShading===!0||v.attributes.normal===void 0&&oe===!1&&(i.isMeshLambertMaterial||i.isMeshPhongMaterial||i.isMeshStandardMaterial||i.isMeshPhysicalMaterial)),sizeAttenuation:i.sizeAttenuation===!0,logarithmicDepthBuffer:d,reversedDepthBuffer:M,skinning:h.isSkinnedMesh===!0,hasPositionAttribute:v.attributes.position!==void 0,morphTargets:v.morphAttributes.position!==void 0,morphNormals:v.morphAttributes.normal!==void 0,morphColors:v.morphAttributes.color!==void 0,morphTargetsCount:T,morphTextureStride:E,numSunLights:o.sun.length,numDirLights:o.directional.length,numPointLights:o.point.length,numSpotLights:o.spot.length,numSpotLightMaps:o.spotLightMap.length,numRectAreaLights:o.rectArea.length,numHemiLights:o.hemi.length,numSunLightShadows:o.sunShadowMap.length,numDirLightShadows:o.directionalShadowMap.length,numPointLightShadows:o.pointShadowMap.length,numSpotLightShadows:o.spotShadowMap.length,numSpotLightShadowsWithMaps:o.numSpotLightShadowsWithMaps,numLightProbes:o.numLightProbes,numLightProbeGrids:g.length,numClippingPlanes:a.numPlanes,numClipIntersection:a.numIntersection,dithering:i.dithering,shadowMapEnabled:e.shadowMap.enabled&&l.length>0,shadowMapType:e.shadowMap.type,toneMapping:Pe,decodeVideoTexture:P&&i.map.isVideoTexture===!0&&Ht.getTransfer(i.map.colorSpace)===`srgb`,decodeVideoTextureEmissive:ce&&i.emissiveMap.isVideoTexture===!0&&Ht.getTransfer(i.emissiveMap.colorSpace)===`srgb`,premultipliedAlpha:i.premultipliedAlpha,doubleSided:i.side===2,flipSided:i.side===1,useDepthPacking:i.depthPacking>=0,depthPacking:i.depthPacking||0,index0AttributeName:i.index0AttributeName,extensionClipCullDistance:Ne&&i.extensions.clipCullDistance===!0&&n.has(`WEBGL_clip_cull_distance`),extensionMultiDraw:(Ne&&i.extensions.multiDraw===!0||ee)&&n.has(`WEBGL_multi_draw`),rendererExtensionParallelShaderCompile:n.has(`KHR_parallel_shader_compile`),customProgramCacheKey:i.customProgramCacheKey()};return Fe.vertexUv1s=c.has(1),Fe.vertexUv2s=c.has(2),Fe.vertexUv3s=c.has(3),c.clear(),Fe}function g(t){let n=[];if(t.shaderID?n.push(t.shaderID):(n.push(t.customVertexShaderID),n.push(t.customFragmentShaderID)),t.defines!==void 0)for(let e in t.defines)n.push(e),n.push(t.defines[e]);return t.isRawShaderMaterial===!1&&(_(n,t),v(n,t),n.push(e.outputColorSpace)),n.push(t.customProgramCacheKey),n.join()}function _(e,t){e.push(t.precision),e.push(t.outputColorSpace),e.push(t.envMapMode),e.push(t.envMapCubeUVHeight),e.push(t.mapUv),e.push(t.alphaMapUv),e.push(t.lightMapUv),e.push(t.aoMapUv),e.push(t.bumpMapUv),e.push(t.normalMapUv),e.push(t.displacementMapUv),e.push(t.emissiveMapUv),e.push(t.metalnessMapUv),e.push(t.roughnessMapUv),e.push(t.anisotropyMapUv),e.push(t.clearcoatMapUv),e.push(t.clearcoatNormalMapUv),e.push(t.clearcoatRoughnessMapUv),e.push(t.iridescenceMapUv),e.push(t.iridescenceThicknessMapUv),e.push(t.sheenColorMapUv),e.push(t.sheenRoughnessMapUv),e.push(t.specularMapUv),e.push(t.specularColorMapUv),e.push(t.specularIntensityMapUv),e.push(t.transmissionMapUv),e.push(t.thicknessMapUv),e.push(t.combine),e.push(t.fogExp2),e.push(t.sizeAttenuation),e.push(t.morphTargetsCount),e.push(t.morphAttributeCount),e.push(t.numSunLights),e.push(t.numDirLights),e.push(t.numPointLights),e.push(t.numSpotLights),e.push(t.numSpotLightMaps),e.push(t.numHemiLights),e.push(t.numRectAreaLights),e.push(t.numSunLightShadows),e.push(t.numDirLightShadows),e.push(t.numPointLightShadows),e.push(t.numSpotLightShadows),e.push(t.numSpotLightShadowsWithMaps),e.push(t.numLightProbes),e.push(t.shadowMapType),e.push(t.toneMapping),e.push(t.numClippingPlanes),e.push(t.numClipIntersection),e.push(t.depthPacking)}function v(e,t){o.disableAll(),t.instancing&&o.enable(0),t.instancingColor&&o.enable(1),t.instancingMorph&&o.enable(2),t.matcap&&o.enable(3),t.envMap&&o.enable(4),t.normalMapObjectSpace&&o.enable(5),t.normalMapTangentSpace&&o.enable(6),t.clearcoat&&o.enable(7),t.iridescence&&o.enable(8),t.alphaTest&&o.enable(9),t.vertexColors&&o.enable(10),t.vertexAlphas&&o.enable(11),t.vertexUv1s&&o.enable(12),t.vertexUv2s&&o.enable(13),t.vertexUv3s&&o.enable(14),t.vertexTangents&&o.enable(15),t.anisotropy&&o.enable(16),t.alphaHash&&o.enable(17),t.batching&&o.enable(18),t.dispersion&&o.enable(19),t.retroreflection&&o.enable(24),t.batchingColor&&o.enable(20),t.gradientMap&&o.enable(21),t.packedNormalMap&&o.enable(22),t.vertexNormals&&o.enable(23),e.push(o.mask),o.disableAll(),t.fog&&o.enable(0),t.useFog&&o.enable(1),t.flatShading&&o.enable(2),t.logarithmicDepthBuffer&&o.enable(3),t.reversedDepthBuffer&&o.enable(4),t.skinning&&o.enable(5),t.morphTargets&&o.enable(6),t.morphNormals&&o.enable(7),t.morphColors&&o.enable(8),t.premultipliedAlpha&&o.enable(9),t.shadowMapEnabled&&o.enable(10),t.doubleSided&&o.enable(11),t.flipSided&&o.enable(12),t.useDepthPacking&&o.enable(13),t.dithering&&o.enable(14),t.transmission&&o.enable(15),t.sheen&&o.enable(16),t.opaque&&o.enable(17),t.pointsUvs&&o.enable(18),t.decodeVideoTexture&&o.enable(19),t.decodeVideoTextureEmissive&&o.enable(20),t.alphaToCoverage&&o.enable(21),t.numLightProbeGrids>0&&o.enable(22),t.hasPositionAttribute&&o.enable(23),e.push(o.mask)}function y(e){let t=p[e.type],n;if(t){let e=Ds[t];n=po.clone(e.uniforms)}else n=e.uniforms;return n}function b(t,n){let r=u.get(n);return r===void 0?(r=new tu(e,n,t,i),l.push(r),u.set(n,r)):++r.usedTimes,r}function x(e){if(--e.usedTimes===0){let t=l.indexOf(e);l[t]=l[l.length-1],l.pop(),u.delete(e.cacheKey),e.destroy()}}function S(e){s.remove(e)}function C(){s.dispose()}return{getParameters:h,getProgramCacheKey:g,getUniforms:y,acquireProgram:b,releaseProgram:x,releaseShaderCache:S,programs:l,dispose:C}}function su(){let e=new WeakMap;function t(t){return e.has(t)}function n(t){let n=e.get(t);return n===void 0&&(n={},e.set(t,n)),n}function r(t){e.delete(t)}function i(t,n,r){e.get(t)[n]=r}function a(){e=new WeakMap}return{has:t,get:n,remove:r,update:i,dispose:a}}function cu(e,t){return e.groupOrder===t.groupOrder?e.renderOrder===t.renderOrder?e.material.id===t.material.id?e.materialVariant===t.materialVariant?e.z===t.z?e.id-t.id:e.z-t.z:e.materialVariant-t.materialVariant:e.material.id-t.material.id:e.renderOrder-t.renderOrder:e.groupOrder-t.groupOrder}function lu(e,t){return e.groupOrder===t.groupOrder?e.renderOrder===t.renderOrder?e.z===t.z?e.id-t.id:t.z-e.z:e.renderOrder-t.renderOrder:e.groupOrder-t.groupOrder}function uu(){let e=[],t=0,n=[],r=[],i=[];function a(){t=0,n.length=0,r.length=0,i.length=0}function o(e){let t=0;return e.isInstancedMesh&&(t+=2),e.isSkinnedMesh&&(t+=1),t}function s(n,r,i,a,s,c){let l=e[t];return l===void 0?(l={id:n.id,object:n,geometry:r,material:i,materialVariant:o(n),groupOrder:a,renderOrder:n.renderOrder,z:s,group:c},e[t]=l):(l.id=n.id,l.object=n,l.geometry=r,l.material=i,l.materialVariant=o(n),l.groupOrder=a,l.renderOrder=n.renderOrder,l.z=s,l.group=c),t++,l}function c(e,t,a,o,c,l,u){u.reversedDepth===!0&&(c=-c);let d=s(e,t,a,o,c,l);a.transmission>0?r.push(d):a.transparent===!0?i.push(d):n.push(d)}function l(e,t,a,o,c,l){let u=s(e,t,a,o,c,l);a.transmission>0?r.unshift(u):a.transparent===!0?i.unshift(u):n.unshift(u)}function u(e,t){n.length>1&&n.sort(e||cu),r.length>1&&r.sort(t||lu),i.length>1&&i.sort(t||lu)}function d(){for(let n=t,r=e.length;n<r;n++){let t=e[n];if(t.id===null)break;t.id=null,t.object=null,t.geometry=null,t.material=null,t.group=null}}return{opaque:n,transmissive:r,transparent:i,init:a,push:c,unshift:l,finish:d,sort:u}}function du(){let e=new WeakMap;function t(t,n){let r=e.get(t),i;return r===void 0?(i=new uu,e.set(t,[i])):n>=r.length?(i=new uu,r.push(i)):i=r[n],i}function n(){e=new WeakMap}return{get:t,dispose:n}}function fu(){let e={};return{get:function(t){if(e[t.id]!==void 0)return e[t.id];let n;switch(t.type){case`SunLight`:case`DirectionalLight`:n={direction:new W,color:new q};break;case`SpotLight`:n={position:new W,direction:new W,color:new q,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case`PointLight`:n={position:new W,color:new q,distance:0,decay:0};break;case`HemisphereLight`:n={direction:new W,skyColor:new q,groundColor:new q};break;case`RectAreaLight`:n={color:new q,position:new W,halfWidth:new W,halfHeight:new W}}return e[t.id]=n,n}}}function pu(){let e={};return{get:function(t){if(e[t.id]!==void 0)return e[t.id];let n;switch(t.type){case`SunLight`:case`DirectionalLight`:n={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new U};break;case`SpotLight`:n={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new U};break;case`PointLight`:n={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new U,shadowCameraNear:1,shadowCameraFar:1e3}}return e[t.id]=n,n}}}var mu=0;function hu(e,t){return(t.castShadow?2:0)-(e.castShadow?2:0)+ +!!t.map-!!e.map}function gu(e){let t=new fu,n=pu(),r={version:0,hash:{sunLength:-1,directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numSunShadows:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],sun:[],sunShadow:[],sunShadowMap:[],sunShadowMatrix:[],sunShadowCascade:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let e=0;e<9;e++)r.probe.push(new W);let i=new W,a=new an,o=new an;function s(i){let a=0,o=0,s=0;for(let e=0;e<9;e++)r.probe[e].set(0,0,0);let c=0,l=0,u=0,d=0,f=0,p=0,m=0,h=0,g=0,_=0,v=0,y=0,b=0,x=0;i.sort(hu);for(let e=0,S=i.length;e<S;e++){let S=i[e],C=S.color,w=S.intensity,T=S.distance,E=null;if(S.shadow&&S.shadow.map&&(E=S.shadow.map.texture.format===1030?S.shadow.map.texture:S.shadow.map.depthTexture||S.shadow.map.texture),S.isAmbientLight)a+=C.r*w,o+=C.g*w,s+=C.b*w;else if(S.isLightProbe){for(let e=0;e<9;e++)r.probe[e].addScaledVector(S.sh.coefficients[e],w);x++}else if(S.isSunLight){let e=t.get(S);if(e.color.copy(S.color).multiplyScalar(S.intensity),S.castShadow){let e=S.shadow,t=n.get(S);t.shadowIntensity=e.intensity,t.shadowBias=e.bias,t.shadowNormalBias=e.normalBias,t.shadowRadius=e.radius,t.shadowMapSize.copy(e.mapSize).multiply(e.getFrameExtents()),r.sunShadow[l]=t,r.sunShadowMap[l]=E;let i=e.getViewportCount();for(let t=0;t<i;t++)r.sunShadowMatrix[u+t]=e.getMatrix(t),r.sunShadowCascade[u+t]=e._cascadeData[t];u+=i,l++}r.sun[c]=e,c++}else if(S.isDirectionalLight){let e=t.get(S);if(e.color.copy(S.color).multiplyScalar(S.intensity),S.castShadow){let e=S.shadow,t=n.get(S);t.shadowIntensity=e.intensity,t.shadowBias=e.bias,t.shadowNormalBias=e.normalBias,t.shadowRadius=e.radius,t.shadowMapSize=e.mapSize,r.directionalShadow[d]=t,r.directionalShadowMap[d]=E,r.directionalShadowMatrix[d]=S.shadow.matrix,g++}r.directional[d]=e,d++}else if(S.isSpotLight){let e=t.get(S);e.position.setFromMatrixPosition(S.matrixWorld),e.color.copy(C).multiplyScalar(w),e.distance=T,e.coneCos=Math.cos(S.angle),e.penumbraCos=Math.cos(S.angle*(1-S.penumbra)),e.decay=S.decay,r.spot[p]=e;let i=S.shadow;if(S.map&&(r.spotLightMap[y]=S.map,y++,i.updateMatrices(S),S.castShadow&&b++),r.spotLightMatrix[p]=i.matrix,S.castShadow){let e=n.get(S);e.shadowIntensity=i.intensity,e.shadowBias=i.bias,e.shadowNormalBias=i.normalBias,e.shadowRadius=i.radius,e.shadowMapSize=i.mapSize,r.spotShadow[p]=e,r.spotShadowMap[p]=E,v++}p++}else if(S.isRectAreaLight){let e=t.get(S);e.color.copy(C).multiplyScalar(w),e.halfWidth.set(S.width*.5,0,0),e.halfHeight.set(0,S.height*.5,0),r.rectArea[m]=e,m++}else if(S.isPointLight){let e=t.get(S);if(e.color.copy(S.color).multiplyScalar(S.intensity),e.distance=S.distance,e.decay=S.decay,S.castShadow){let e=S.shadow,t=n.get(S);t.shadowIntensity=e.intensity,t.shadowBias=e.bias,t.shadowNormalBias=e.normalBias,t.shadowRadius=e.radius,t.shadowMapSize=e.mapSize,t.shadowCameraNear=e.camera.near,t.shadowCameraFar=e.camera.far,r.pointShadow[f]=t,r.pointShadowMap[f]=E,r.pointShadowMatrix[f]=S.shadow.matrix,_++}r.point[f]=e,f++}else if(S.isHemisphereLight){let e=t.get(S);e.skyColor.copy(S.color).multiplyScalar(w),e.groundColor.copy(S.groundColor).multiplyScalar(w),r.hemi[h]=e,h++}}m>0&&(e.has(`OES_texture_float_linear`)===!0?(r.rectAreaLTC1=Q.LTC_FLOAT_1,r.rectAreaLTC2=Q.LTC_FLOAT_2):(r.rectAreaLTC1=Q.LTC_HALF_1,r.rectAreaLTC2=Q.LTC_HALF_2)),r.ambient[0]=a,r.ambient[1]=o,r.ambient[2]=s;let S=r.hash;(S.sunLength!==c||S.directionalLength!==d||S.pointLength!==f||S.spotLength!==p||S.rectAreaLength!==m||S.hemiLength!==h||S.numSunShadows!==l||S.numDirectionalShadows!==g||S.numPointShadows!==_||S.numSpotShadows!==v||S.numSpotMaps!==y||S.numLightProbes!==x)&&(r.sun.length=c,r.directional.length=d,r.spot.length=p,r.rectArea.length=m,r.point.length=f,r.hemi.length=h,r.sunShadow.length=l,r.sunShadowMap.length=l,r.sunShadowMatrix.length=u,r.sunShadowCascade.length=u,r.directionalShadow.length=g,r.directionalShadowMap.length=g,r.directionalShadowMatrix.length=g,r.pointShadow.length=_,r.pointShadowMap.length=_,r.pointShadowMatrix.length=_,r.spotShadow.length=v,r.spotShadowMap.length=v,r.spotLightMatrix.length=v+y-b,r.spotLightMap.length=y,r.numSpotLightShadowsWithMaps=b,r.numLightProbes=x,S.sunLength=c,S.directionalLength=d,S.pointLength=f,S.spotLength=p,S.rectAreaLength=m,S.hemiLength=h,S.numSunShadows=l,S.numDirectionalShadows=g,S.numPointShadows=_,S.numSpotShadows=v,S.numSpotMaps=y,S.numLightProbes=x,r.version=mu++)}function c(e,t){let n=0,s=0,c=0,l=0,u=0,d=0,f=t.matrixWorldInverse;for(let t=0,p=e.length;t<p;t++){let p=e[t];if(p.isSunLight){let e=r.sun[n];e.direction.setFromMatrixPosition(p.matrixWorld),e.direction.transformDirection(f),n++}else if(p.isDirectionalLight){let e=r.directional[s];e.direction.setFromMatrixPosition(p.matrixWorld),i.setFromMatrixPosition(p.target.matrixWorld),e.direction.sub(i),e.direction.transformDirection(f),s++}else if(p.isSpotLight){let e=r.spot[l];e.position.setFromMatrixPosition(p.matrixWorld),e.position.applyMatrix4(f),e.direction.setFromMatrixPosition(p.matrixWorld),i.setFromMatrixPosition(p.target.matrixWorld),e.direction.sub(i),e.direction.transformDirection(f),l++}else if(p.isRectAreaLight){let e=r.rectArea[u];e.position.setFromMatrixPosition(p.matrixWorld),e.position.applyMatrix4(f),o.identity(),a.copy(p.matrixWorld),a.premultiply(f),o.extractRotation(a),e.halfWidth.set(p.width*.5,0,0),e.halfHeight.set(0,p.height*.5,0),e.halfWidth.applyMatrix4(o),e.halfHeight.applyMatrix4(o),u++}else if(p.isPointLight){let e=r.point[c];e.position.setFromMatrixPosition(p.matrixWorld),e.position.applyMatrix4(f),c++}else if(p.isHemisphereLight){let e=r.hemi[d];e.direction.setFromMatrixPosition(p.matrixWorld),e.direction.transformDirection(f),d++}}}return{setup:s,setupView:c,state:r}}function _u(e){let t=new gu(e),n=[],r=[],i=[];function a(e){d.camera=e,n.length=0,r.length=0,i.length=0}function o(e){n.push(e)}function s(e){r.push(e)}function c(e){i.push(e)}function l(){t.setup(n)}function u(e){t.setupView(n,e)}let d={lightsArray:n,shadowsArray:r,lightProbeGridArray:i,camera:null,lights:t,transmissionRenderTarget:{},textureUnits:0};return{init:a,state:d,setupLights:l,setupLightsView:u,pushLight:o,pushShadow:s,pushLightProbeGrid:c}}function vu(e){let t=new WeakMap;function n(n,r=0){let i=t.get(n),a;return i===void 0?(a=new _u(e),t.set(n,[a])):r>=i.length?(a=new _u(e),i.push(a)):a=i[r],a}function r(){t=new WeakMap}return{get:n,dispose:r}}var yu=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,bu=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ).rg;
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ).r;
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( max( 0.0, squared_mean - mean * mean ) );
	gl_FragColor = vec4( mean, std_dev, 0.0, 1.0 );
}`,xu=[new W(1,0,0),new W(-1,0,0),new W(0,1,0),new W(0,-1,0),new W(0,0,1),new W(0,0,-1)],Su=[new W(0,-1,0),new W(0,-1,0),new W(0,0,1),new W(0,0,-1),new W(0,-1,0),new W(0,-1,0)],Cu=new an,wu=new W,Tu=new W;function Eu(e,t,n){let r=new bi,i=new U,a=new U,o=new $t,s=new yo,c=new bo,l={},u=n.maxTextureSize,d={0:1,1:0,2:2},p=new go({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new U},radius:{value:4}},vertexShader:yu,fragmentShader:bu}),m=p.clone();m.defines.HORIZONTAL_PASS=1;let g=new Fr;g.setAttribute(`position`,new br(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));let _=new J(g,p),v=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=1;let y=this.type;this.render=function(t,n,s){if(v.enabled===!1||v.autoUpdate===!1&&v.needsUpdate===!1||t.length===0)return;this.type===2&&(z(`WebGLShadowMap: PCFSoftShadowMap has been removed. Using PCFShadowMap instead.`),this.type=1);let c=e.getRenderTarget(),l=e.getActiveCubeFace(),d=e.getActiveMipmapLevel(),p=e.state;p.setBlending(0),p.buffers.depth.getReversed()===!0?p.buffers.color.setClear(0,0,0,0):p.buffers.color.setClear(1,1,1,1),p.buffers.depth.setTest(!0),p.setScissorTest(!1);let m=y!==this.type;m&&n.traverse(function(e){e.material&&(Array.isArray(e.material)?e.material.forEach(e=>e.needsUpdate=!0):e.material.needsUpdate=!0)});for(let c=0,l=t.length;c<l;c++){let l=t[c],d=l.shadow;if(d===void 0){z(`WebGLShadowMap:`,l,`has no shadow.`);continue}if(d.autoUpdate===!1&&d.needsUpdate===!1)continue;i.copy(d.mapSize);let g=d.getFrameExtents();i.multiply(g),a.copy(d.mapSize),(i.x>u||i.y>u)&&(i.x>u&&(a.x=Math.floor(u/g.x),i.x=a.x*g.x,d.mapSize.x=a.x),i.y>u&&(a.y=Math.floor(u/g.y),i.y=a.y*g.y,d.mapSize.y=a.y));let _=e.state.buffers.depth.getReversed();if(d.camera._reversedDepth=_,d.map===null||m===!0){if(d.map!==null&&(d.map.depthTexture!==null&&(d.map.depthTexture.dispose(),d.map.depthTexture=null),d.map.dispose()),this.type===3){if(l.isPointLight){z(`WebGLShadowMap: VSM shadow maps are not supported for PointLights. Use PCF or BasicShadowMap instead.`);continue}d.map=new tn(i.x,i.y,{format:re,type:T,minFilter:h,magFilter:h,generateMipmaps:!1}),d.map.texture.name=l.name+`.shadowMap`,d.map.depthTexture=new Ai(i.x,i.y,w),d.map.depthTexture.name=l.name+`.shadowMapDepth`,d.map.depthTexture.format=ee,d.map.depthTexture.compareFunction=null,d.map.depthTexture.minFilter=f,d.map.depthTexture.magFilter=f}else l.isPointLight?(d.map=new rc(i.x),d.map.depthTexture=new ji(i.x,C)):(d.map=new tn(i.x,i.y),d.map.depthTexture=new Ai(i.x,i.y,C)),d.map.depthTexture.name=l.name+`.shadowMap`,d.map.depthTexture.format=ee,this.type===1?(d.map.depthTexture.compareFunction=_?518:515,d.map.depthTexture.minFilter=h,d.map.depthTexture.magFilter=h):(d.map.depthTexture.compareFunction=null,d.map.depthTexture.minFilter=f,d.map.depthTexture.magFilter=f);d.camera.updateProjectionMatrix()}d.map.isWebGLCubeRenderTarget!==!0&&(d.map.width!==i.x||d.map.height!==i.y)&&d.map.setSize(i.x,i.y);let v=d.map.isWebGLCubeRenderTarget?6:d.getViewportCount();l.isPointLight!==!0&&d.updateMatrices(l,s);for(let t=0;t<v;t++){let i=d.getCamera(t);if(l.isPointLight){let e=d.camera,n=d.matrix,r=l.distance||e.far;r!==e.far&&(e.far=r,e.updateProjectionMatrix()),wu.setFromMatrixPosition(l.matrixWorld),e.position.copy(wu),Tu.copy(e.position),Tu.add(xu[t]),e.up.copy(Su[t]),e.lookAt(Tu),e.updateMatrixWorld(),n.makeTranslation(-wu.x,-wu.y,-wu.z),Cu.multiplyMatrices(e.projectionMatrix,e.matrixWorldInverse),d._frustum.setFromProjectionMatrix(Cu,e.coordinateSystem,e.reversedDepth)}if(d.map.isWebGLCubeRenderTarget)e.setRenderTarget(d.map,t),e.clear();else{t===0&&(e.setRenderTarget(d.map),e.clear());let n=d.getViewport(t);o.set(a.x*n.x,a.y*n.y,a.x*n.z,a.y*n.w),p.viewport(o)}r=d.getFrustum(t),S(n,s,i,l,this.type)}d.isPointLightShadow!==!0&&this.type===3&&b(d,s),d.needsUpdate=!1}y=this.type,v.needsUpdate=!1,e.setRenderTarget(c,l,d)};function b(n,r){let a=t.update(_);p.defines.VSM_SAMPLES!==n.blurSamples&&(p.defines.VSM_SAMPLES=n.blurSamples,m.defines.VSM_SAMPLES=n.blurSamples,p.needsUpdate=!0,m.needsUpdate=!0),n.mapPass===null?n.mapPass=new tn(i.x,i.y,{format:re,type:T}):(n.mapPass.width!==n.map.width||n.mapPass.height!==n.map.height)&&n.mapPass.setSize(n.map.width,n.map.height),p.uniforms.shadow_pass.value=n.map.depthTexture,p.uniforms.resolution.value.set(n.map.width,n.map.height),p.uniforms.radius.value=n.radius,e.setRenderTarget(n.mapPass),e.clear(),e.renderBufferDirect(r,null,a,p,_,null),m.uniforms.shadow_pass.value=n.mapPass.texture,m.uniforms.resolution.value.set(n.map.width,n.map.height),m.uniforms.radius.value=n.radius,e.setRenderTarget(n.map),e.clear(),e.renderBufferDirect(r,null,a,m,_,null)}function x(t,n,r,i){let a=null,o=r.isPointLight===!0?t.customDistanceMaterial:t.customDepthMaterial;if(o!==void 0)a=o;else if(a=r.isPointLight===!0?c:s,e.localClippingEnabled&&n.clipShadows===!0&&Array.isArray(n.clippingPlanes)&&n.clippingPlanes.length!==0||n.displacementMap&&n.displacementScale!==0||n.alphaMap&&n.alphaTest>0||n.map&&n.alphaTest>0||n.alphaToCoverage===!0){let e=a.uuid,t=n.uuid,r=l[e];r===void 0&&(r={},l[e]=r);let i=r[t];i===void 0&&(i=a.clone(),r[t]=i,n.addEventListener(`dispose`,E)),a=i}if(a.visible=n.visible,a.wireframe=n.wireframe,i===3?a.side=n.shadowSide===null?n.side:n.shadowSide:a.side=n.shadowSide===null?d[n.side]:n.shadowSide,a.alphaMap=n.alphaMap,a.alphaTest=n.alphaToCoverage===!0?.5:n.alphaTest,a.map=n.map,a.clipShadows=n.clipShadows,a.clippingPlanes=n.clippingPlanes,a.clipIntersection=n.clipIntersection,a.displacementMap=n.displacementMap,a.displacementScale=n.displacementScale,a.displacementBias=n.displacementBias,a.wireframeLinewidth=n.wireframeLinewidth,a.linewidth=n.linewidth,r.isPointLight===!0&&a.isMeshDistanceMaterial===!0){let t=e.properties.get(a);t.light=r}return a}function S(n,i,a,o,s){if(n.visible===!1)return;if(n.layers.test(i.layers)&&(n.isMesh||n.isLine||n.isPoints)&&(n.castShadow||n.receiveShadow&&s===3)&&(!n.frustumCulled||n.intersectsFrustum(r))){n.modelViewMatrix.multiplyMatrices(a.matrixWorldInverse,n.matrixWorld);let r=t.update(n),c=n.material;if(Array.isArray(c)){let t=r.groups;for(let l=0,u=t.length;l<u;l++){let u=t[l],d=c[u.materialIndex];if(d&&d.visible){let t=x(n,d,o,s);n.onBeforeShadow(e,n,i,a,r,t,u),e.renderBufferDirect(a,null,r,t,n,u),n.onAfterShadow(e,n,i,a,r,t,u)}}}else if(c.visible){let t=x(n,c,o,s);n.onBeforeShadow(e,n,i,a,r,t,null),e.renderBufferDirect(a,null,r,t,n,null),n.onAfterShadow(e,n,i,a,r,t,null)}}let c=n.children;for(let e=0,t=c.length;e<t;e++)S(c[e],i,a,o,s)}function E(e){e.target.removeEventListener(`dispose`,E);for(let t in l){let n=l[t],r=e.target.uuid;r in n&&(n[r].dispose(),delete n[r])}}}function Du(e,t){function n(){let t=!1,n=new $t,r=null,i=new $t(0,0,0,0);return{setMask:function(n){r!==n&&!t&&(e.colorMask(n,n,n,n),r=n)},setLocked:function(e){t=e},setClear:function(t,r,a,o,s){s===!0&&(t*=o,r*=o,a*=o),n.set(t,r,a,o),i.equals(n)===!1&&(e.clearColor(t,r,a,o),i.copy(n))},reset:function(){t=!1,r=null,i.set(-1,0,0,0)}}}function r(){let n=!1,r=!1,i=null,a=null,o=null;return{setReversed:function(e){if(r!==e){let n=t.get(`EXT_clip_control`);e?n.clipControlEXT(n.LOWER_LEFT_EXT,n.ZERO_TO_ONE_EXT):n.clipControlEXT(n.LOWER_LEFT_EXT,n.NEGATIVE_ONE_TO_ONE_EXT),r=e;let i=o;o=null,this.setClear(i)}},getReversed:function(){return r},setTest:function(t){t?F(e.DEPTH_TEST):le(e.DEPTH_TEST)},setMask:function(t){i!==t&&!n&&(e.depthMask(t),i=t)},setFunc:function(t){if(r&&(t=ct[t]),a!==t){switch(t){case 0:e.depthFunc(e.NEVER);break;case 1:e.depthFunc(e.ALWAYS);break;case 2:e.depthFunc(e.LESS);break;case 3:e.depthFunc(e.LEQUAL);break;case 4:e.depthFunc(e.EQUAL);break;case 5:e.depthFunc(e.GEQUAL);break;case 6:e.depthFunc(e.GREATER);break;case 7:e.depthFunc(e.NOTEQUAL);break;default:e.depthFunc(e.LEQUAL)}a=t}},setLocked:function(e){n=e},setClear:function(t){o!==t&&(o=t,r&&(t=1-t),e.clearDepth(t))},reset:function(){n=!1,i=null,a=null,o=null,r=!1}}}function i(){let t=!1,n=null,r=null,i=null,a=null,o=null,s=null,c=null,l=null;return{setTest:function(n){t||(n?F(e.STENCIL_TEST):le(e.STENCIL_TEST))},setMask:function(r){n!==r&&!t&&(e.stencilMask(r),n=r)},setFunc:function(t,n,o){(r!==t||i!==n||a!==o)&&(e.stencilFunc(t,n,o),r=t,i=n,a=o)},setOp:function(t,n,r){(o!==t||s!==n||c!==r)&&(e.stencilOp(t,n,r),o=t,s=n,c=r)},setLocked:function(e){t=e},setClear:function(t){l!==t&&(e.clearStencil(t),l=t)},reset:function(){t=!1,n=null,r=null,i=null,a=null,o=null,s=null,c=null,l=null}}}let a=new n,o=new r,s=new i,c=new WeakMap,l=new WeakMap,u={},d={},f={},p=new WeakMap,m=[],h=null,g=!1,_=null,v=null,y=null,b=null,x=null,S=null,C=null,w=new q(0,0,0),T=0,E=!1,D=null,O=null,k=null,A=null,j=null,M=e.getParameter(e.MAX_COMBINED_TEXTURE_IMAGE_UNITS),N=!1,ee=0,P=e.getParameter(e.VERSION);P.indexOf(`WebGL`)===-1?P.indexOf(`OpenGL ES`)!==-1&&(ee=parseFloat(/^OpenGL ES (\d)/.exec(P)[1]),N=ee>=2):(ee=parseFloat(/^WebGL (\d)/.exec(P)[1]),N=ee>=1);let te=null,ne={},re=e.getParameter(e.SCISSOR_BOX),ie=e.getParameter(e.VIEWPORT),ae=new $t().fromArray(re),oe=new $t().fromArray(ie);function se(t,n,r,i){let a=new Uint8Array(4),o=e.createTexture();e.bindTexture(t,o),e.texParameteri(t,e.TEXTURE_MIN_FILTER,e.NEAREST),e.texParameteri(t,e.TEXTURE_MAG_FILTER,e.NEAREST);for(let o=0;o<r;o++)t===e.TEXTURE_3D||t===e.TEXTURE_2D_ARRAY?e.texImage3D(n,0,e.RGBA,1,1,i,0,e.RGBA,e.UNSIGNED_BYTE,a):e.texImage2D(n+o,0,e.RGBA,1,1,0,e.RGBA,e.UNSIGNED_BYTE,a);return o}let ce={};ce[e.TEXTURE_2D]=se(e.TEXTURE_2D,e.TEXTURE_2D,1),ce[e.TEXTURE_CUBE_MAP]=se(e.TEXTURE_CUBE_MAP,e.TEXTURE_CUBE_MAP_POSITIVE_X,6),ce[e.TEXTURE_2D_ARRAY]=se(e.TEXTURE_2D_ARRAY,e.TEXTURE_2D_ARRAY,1,1),ce[e.TEXTURE_3D]=se(e.TEXTURE_3D,e.TEXTURE_3D,1,1),a.setClear(0,0,0,1),o.setClear(1),s.setClear(0),F(e.DEPTH_TEST),o.setFunc(3),_e(!1),ve(1),F(e.CULL_FACE),he(0);function F(t){u[t]!==!0&&(e.enable(t),u[t]=!0)}function le(t){u[t]!==!1&&(e.disable(t),u[t]=!1)}function ue(t,n){return f[t]!==n&&(e.bindFramebuffer(t,n),f[t]=n,t===e.DRAW_FRAMEBUFFER&&(f[e.FRAMEBUFFER]=n),t===e.FRAMEBUFFER&&(f[e.DRAW_FRAMEBUFFER]=n),!0)}function de(t,n){let r=m,i=!1;if(t){r=p.get(n),r===void 0&&(r=[],p.set(n,r));let a=t.textures;if(r.length!==a.length||r[0]!==e.COLOR_ATTACHMENT0){for(let t=0,n=a.length;t<n;t++)r[t]=e.COLOR_ATTACHMENT0+t;r.length=a.length,i=!0}}else r[0]!==e.BACK&&(r[0]=e.BACK,i=!0);i&&e.drawBuffers(r)}function fe(t){return h!==t&&(e.useProgram(t),h=t,!0)}let pe={100:e.FUNC_ADD,101:e.FUNC_SUBTRACT,102:e.FUNC_REVERSE_SUBTRACT};pe[103]=e.MIN,pe[104]=e.MAX;let me={200:e.ZERO,201:e.ONE,202:e.SRC_COLOR,204:e.SRC_ALPHA,210:e.SRC_ALPHA_SATURATE,208:e.DST_COLOR,206:e.DST_ALPHA,203:e.ONE_MINUS_SRC_COLOR,205:e.ONE_MINUS_SRC_ALPHA,209:e.ONE_MINUS_DST_COLOR,207:e.ONE_MINUS_DST_ALPHA,211:e.CONSTANT_COLOR,212:e.ONE_MINUS_CONSTANT_COLOR,213:e.CONSTANT_ALPHA,214:e.ONE_MINUS_CONSTANT_ALPHA};function he(t,n,r,i,a,o,s,c,l,u){if(t===0)g===!0&&(le(e.BLEND),g=!1);else if(g===!1&&(F(e.BLEND),g=!0),t!==5){if(t!==_||u!==E){if((v!==100||x!==100)&&(e.blendEquation(e.FUNC_ADD),v=100,x=100),u)switch(t){case 1:e.blendFuncSeparate(e.ONE,e.ONE_MINUS_SRC_ALPHA,e.ONE,e.ONE_MINUS_SRC_ALPHA);break;case 2:e.blendFunc(e.ONE,e.ONE);break;case 3:e.blendFuncSeparate(e.ZERO,e.ONE_MINUS_SRC_COLOR,e.ZERO,e.ONE);break;case 4:e.blendFuncSeparate(e.DST_COLOR,e.ONE_MINUS_SRC_ALPHA,e.ZERO,e.ONE);break;default:B(`WebGLState: Invalid blending: `,t)}else switch(t){case 1:e.blendFuncSeparate(e.SRC_ALPHA,e.ONE_MINUS_SRC_ALPHA,e.ONE,e.ONE_MINUS_SRC_ALPHA);break;case 2:e.blendFuncSeparate(e.SRC_ALPHA,e.ONE,e.ONE,e.ONE);break;case 3:B(`WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true`);break;case 4:B(`WebGLState: MultiplyBlending requires material.premultipliedAlpha = true`);break;default:B(`WebGLState: Invalid blending: `,t)}y=null,b=null,S=null,C=null,w.set(0,0,0),T=0,_=t,E=u}}else a=a||n,o=o||r,s=s||i,(n!==v||a!==x)&&(e.blendEquationSeparate(pe[n],pe[a]),v=n,x=a),(r!==y||i!==b||o!==S||s!==C)&&(e.blendFuncSeparate(me[r],me[i],me[o],me[s]),y=r,b=i,S=o,C=s),(c.equals(w)===!1||l!==T)&&(e.blendColor(c.r,c.g,c.b,l),w.copy(c),T=l),_=t,E=!1}function ge(t,n){t.side===2?le(e.CULL_FACE):F(e.CULL_FACE);let r=t.side===1;n&&(r=!r),_e(r),t.blending===1&&t.transparent===!1?he(0):he(t.blending,t.blendEquation,t.blendSrc,t.blendDst,t.blendEquationAlpha,t.blendSrcAlpha,t.blendDstAlpha,t.blendColor,t.blendAlpha,t.premultipliedAlpha),o.setFunc(t.depthFunc),o.setTest(t.depthTest),o.setMask(t.depthWrite),a.setMask(t.colorWrite);let i=t.stencilWrite;s.setTest(i),i&&(s.setMask(t.stencilWriteMask),s.setFunc(t.stencilFunc,t.stencilRef,t.stencilFuncMask),s.setOp(t.stencilFail,t.stencilZFail,t.stencilZPass)),be(t.polygonOffset,t.polygonOffsetFactor,t.polygonOffsetUnits),t.alphaToCoverage===!0?F(e.SAMPLE_ALPHA_TO_COVERAGE):le(e.SAMPLE_ALPHA_TO_COVERAGE)}function _e(t){D!==t&&(t?e.frontFace(e.CW):e.frontFace(e.CCW),D=t)}function ve(t){t===0?le(e.CULL_FACE):(F(e.CULL_FACE),t!==O&&(t===1?e.cullFace(e.BACK):t===2?e.cullFace(e.FRONT):e.cullFace(e.FRONT_AND_BACK))),O=t}function ye(t){t!==k&&(N&&e.lineWidth(t),k=t)}function be(t,n,r){t?(F(e.POLYGON_OFFSET_FILL),(A!==n||j!==r)&&(A=n,j=r,o.getReversed()&&(n=-n),e.polygonOffset(n,r))):le(e.POLYGON_OFFSET_FILL)}function xe(t){t?F(e.SCISSOR_TEST):le(e.SCISSOR_TEST)}function Se(t){t===void 0&&(t=e.TEXTURE0+M-1),te!==t&&(e.activeTexture(t),te=t)}function Ce(t,n,r){r===void 0&&(r=te===null?e.TEXTURE0+M-1:te);let i=ne[r];i===void 0&&(i={type:void 0,texture:void 0},ne[r]=i),(i.type!==t||i.texture!==n)&&(te!==r&&(e.activeTexture(r),te=r),e.bindTexture(t,n||ce[t]),i.type=t,i.texture=n)}function we(){let t=ne[te];t!==void 0&&t.type!==void 0&&(e.bindTexture(t.type,null),t.type=void 0,t.texture=void 0)}function Te(){try{e.compressedTexImage2D(...arguments)}catch(e){B(`WebGLState:`,e)}}function Ee(){try{e.compressedTexImage3D(...arguments)}catch(e){B(`WebGLState:`,e)}}function De(){try{e.texSubImage2D(...arguments)}catch(e){B(`WebGLState:`,e)}}function Oe(){try{e.texSubImage3D(...arguments)}catch(e){B(`WebGLState:`,e)}}function ke(){try{e.compressedTexSubImage2D(...arguments)}catch(e){B(`WebGLState:`,e)}}function Ae(){try{e.compressedTexSubImage3D(...arguments)}catch(e){B(`WebGLState:`,e)}}function je(){try{e.texStorage2D(...arguments)}catch(e){B(`WebGLState:`,e)}}function Me(){try{e.texStorage3D(...arguments)}catch(e){B(`WebGLState:`,e)}}function I(){try{e.texImage2D(...arguments)}catch(e){B(`WebGLState:`,e)}}function Ne(){try{e.texImage3D(...arguments)}catch(e){B(`WebGLState:`,e)}}function Pe(t){return d[t]===void 0?e.getParameter(t):d[t]}function Fe(t,n){d[t]!==n&&(e.pixelStorei(t,n),d[t]=n)}function L(t){ae.equals(t)===!1&&(e.scissor(t.x,t.y,t.z,t.w),ae.copy(t))}function Ie(t){oe.equals(t)===!1&&(e.viewport(t.x,t.y,t.z,t.w),oe.copy(t))}function R(t,n){let r=l.get(n);r===void 0&&(r=new WeakMap,l.set(n,r));let i=r.get(t);i===void 0&&(i=e.getUniformBlockIndex(n,t.name),r.set(t,i))}function Le(t,n){let r=l.get(n).get(t);c.get(n)!==r&&(e.uniformBlockBinding(n,r,t.__bindingPointIndex),c.set(n,r))}function Re(){e.disable(e.BLEND),e.disable(e.CULL_FACE),e.disable(e.DEPTH_TEST),e.disable(e.POLYGON_OFFSET_FILL),e.disable(e.SCISSOR_TEST),e.disable(e.STENCIL_TEST),e.disable(e.SAMPLE_ALPHA_TO_COVERAGE),e.blendEquation(e.FUNC_ADD),e.blendFunc(e.ONE,e.ZERO),e.blendFuncSeparate(e.ONE,e.ZERO,e.ONE,e.ZERO),e.blendColor(0,0,0,0),e.colorMask(!0,!0,!0,!0),e.clearColor(0,0,0,0),e.depthMask(!0),e.depthFunc(e.LESS),o.setReversed(!1),e.clearDepth(1),e.stencilMask(4294967295),e.stencilFunc(e.ALWAYS,0,4294967295),e.stencilOp(e.KEEP,e.KEEP,e.KEEP),e.clearStencil(0),e.cullFace(e.BACK),e.frontFace(e.CCW),e.polygonOffset(0,0),e.activeTexture(e.TEXTURE0),e.bindFramebuffer(e.FRAMEBUFFER,null),e.bindFramebuffer(e.DRAW_FRAMEBUFFER,null),e.bindFramebuffer(e.READ_FRAMEBUFFER,null),e.useProgram(null),e.lineWidth(1),e.scissor(0,0,e.canvas.width,e.canvas.height),e.viewport(0,0,e.canvas.width,e.canvas.height),e.pixelStorei(e.PACK_ALIGNMENT,4),e.pixelStorei(e.UNPACK_ALIGNMENT,4),e.pixelStorei(e.UNPACK_FLIP_Y_WEBGL,!1),e.pixelStorei(e.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),e.pixelStorei(e.UNPACK_COLORSPACE_CONVERSION_WEBGL,e.BROWSER_DEFAULT_WEBGL),e.pixelStorei(e.PACK_ROW_LENGTH,0),e.pixelStorei(e.PACK_SKIP_PIXELS,0),e.pixelStorei(e.PACK_SKIP_ROWS,0),e.pixelStorei(e.UNPACK_ROW_LENGTH,0),e.pixelStorei(e.UNPACK_IMAGE_HEIGHT,0),e.pixelStorei(e.UNPACK_SKIP_PIXELS,0),e.pixelStorei(e.UNPACK_SKIP_ROWS,0),e.pixelStorei(e.UNPACK_SKIP_IMAGES,0),u={},d={},te=null,ne={},f={},p=new WeakMap,m=[],h=null,g=!1,_=null,v=null,y=null,b=null,x=null,S=null,C=null,w=new q(0,0,0),T=0,E=!1,D=null,O=null,k=null,A=null,j=null,ae.set(0,0,e.canvas.width,e.canvas.height),oe.set(0,0,e.canvas.width,e.canvas.height),a.reset(),o.reset(),s.reset()}return{buffers:{color:a,depth:o,stencil:s},enable:F,disable:le,bindFramebuffer:ue,drawBuffers:de,useProgram:fe,setBlending:he,setMaterial:ge,setFlipSided:_e,setCullFace:ve,setLineWidth:ye,setPolygonOffset:be,setScissorTest:xe,activeTexture:Se,bindTexture:Ce,unbindTexture:we,compressedTexImage2D:Te,compressedTexImage3D:Ee,texImage2D:I,texImage3D:Ne,pixelStorei:Fe,getParameter:Pe,updateUBOMapping:R,uniformBlockBinding:Le,texStorage2D:je,texStorage3D:Me,texSubImage2D:De,texSubImage3D:Oe,compressedTexSubImage2D:ke,compressedTexSubImage3D:Ae,scissor:L,viewport:Ie,reset:Re}}function Ou(e,t,n,r,i,a,o){let s=t.has(`WEBGL_multisampled_render_to_texture`)?t.get(`WEBGL_multisampled_render_to_texture`):null,c=typeof navigator>`u`?!1:/OculusBrowser/g.test(navigator.userAgent),v=new U,y=new WeakMap,b=new Set,x,S=new WeakMap,C=!1;try{C=typeof OffscreenCanvas<`u`&&new OffscreenCanvas(1,1).getContext(`2d`)!==null}catch{}function w(e,t){return C?new OffscreenCanvas(e,t):tt(`canvas`)}function T(e,t,n){let r=1,i=Pe(e);if((i.width>n||i.height>n)&&(r=n/Math.max(i.width,i.height)),r<1){if(typeof HTMLImageElement<`u`&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<`u`&&e instanceof HTMLCanvasElement||typeof ImageBitmap<`u`&&e instanceof ImageBitmap||typeof VideoFrame<`u`&&e instanceof VideoFrame){let n=Math.floor(r*i.width),a=Math.floor(r*i.height);x===void 0&&(x=w(n,a));let o=t?w(n,a):x;return o.width=n,o.height=a,o.getContext(`2d`).drawImage(e,0,0,n,a),z(`WebGLRenderer: Texture has been resized from (`+i.width+`x`+i.height+`) to (`+n+`x`+a+`).`),o}return`data`in e&&z(`WebGLRenderer: Image in DataTexture is too big (`+i.width+`x`+i.height+`).`),e}return e}function E(e){return e.generateMipmaps}function D(t){e.generateMipmap(t)}function O(t){return t.isWebGLCubeRenderTarget?e.TEXTURE_CUBE_MAP:t.isWebGL3DRenderTarget?e.TEXTURE_3D:t.isWebGLArrayRenderTarget||t.isCompressedArrayTexture?e.TEXTURE_2D_ARRAY:e.TEXTURE_2D}function k(n,r,i,a,o,s=!1){if(n!==null){if(e[n]!==void 0)return e[n];z(`WebGLRenderer: Attempt to use non-existing WebGL internal format '`+n+`'`)}let c;a&&(c=t.get(`EXT_texture_norm16`),c||z(`WebGLRenderer: Unable to use normalized textures without EXT_texture_norm16 extension`));let l=r;if(r===e.RED&&(i===e.FLOAT&&(l=e.R32F),i===e.HALF_FLOAT&&(l=e.R16F),i===e.UNSIGNED_BYTE&&(l=e.R8),i===e.UNSIGNED_SHORT&&c&&(l=c.R16_EXT),i===e.SHORT&&c&&(l=c.R16_SNORM_EXT)),r===e.RED_INTEGER&&(i===e.UNSIGNED_BYTE&&(l=e.R8UI),i===e.UNSIGNED_SHORT&&(l=e.R16UI),i===e.UNSIGNED_INT&&(l=e.R32UI),i===e.BYTE&&(l=e.R8I),i===e.SHORT&&(l=e.R16I),i===e.INT&&(l=e.R32I)),r===e.RG&&(i===e.FLOAT&&(l=e.RG32F),i===e.HALF_FLOAT&&(l=e.RG16F),i===e.UNSIGNED_BYTE&&(l=e.RG8),i===e.UNSIGNED_SHORT&&c&&(l=c.RG16_EXT),i===e.SHORT&&c&&(l=c.RG16_SNORM_EXT)),r===e.RG_INTEGER&&(i===e.UNSIGNED_BYTE&&(l=e.RG8UI),i===e.UNSIGNED_SHORT&&(l=e.RG16UI),i===e.UNSIGNED_INT&&(l=e.RG32UI),i===e.BYTE&&(l=e.RG8I),i===e.SHORT&&(l=e.RG16I),i===e.INT&&(l=e.RG32I)),r===e.RGB_INTEGER&&(i===e.UNSIGNED_BYTE&&(l=e.RGB8UI),i===e.UNSIGNED_SHORT&&(l=e.RGB16UI),i===e.UNSIGNED_INT&&(l=e.RGB32UI),i===e.BYTE&&(l=e.RGB8I),i===e.SHORT&&(l=e.RGB16I),i===e.INT&&(l=e.RGB32I)),r===e.RGBA_INTEGER&&(i===e.UNSIGNED_BYTE&&(l=e.RGBA8UI),i===e.UNSIGNED_SHORT&&(l=e.RGBA16UI),i===e.UNSIGNED_INT&&(l=e.RGBA32UI),i===e.BYTE&&(l=e.RGBA8I),i===e.SHORT&&(l=e.RGBA16I),i===e.INT&&(l=e.RGBA32I)),r===e.RGB&&(i===e.UNSIGNED_SHORT&&c&&(l=c.RGB16_EXT),i===e.SHORT&&c&&(l=c.RGB16_SNORM_EXT),i===e.UNSIGNED_INT_5_9_9_9_REV&&(l=e.RGB9_E5),i===e.UNSIGNED_INT_10F_11F_11F_REV&&(l=e.R11F_G11F_B10F)),r===e.RGBA){let t=s?Je:Ht.getTransfer(o);i===e.FLOAT&&(l=e.RGBA32F),i===e.HALF_FLOAT&&(l=e.RGBA16F),i===e.UNSIGNED_BYTE&&(l=t===`srgb`?e.SRGB8_ALPHA8:e.RGBA8),i===e.UNSIGNED_SHORT&&c&&(l=c.RGBA16_EXT),i===e.SHORT&&c&&(l=c.RGBA16_SNORM_EXT),i===e.UNSIGNED_SHORT_4_4_4_4&&(l=e.RGBA4),i===e.UNSIGNED_SHORT_5_5_5_1&&(l=e.RGB5_A1)}return(l===e.R16F||l===e.R32F||l===e.RG16F||l===e.RG32F||l===e.RGBA16F||l===e.RGBA32F)&&t.get(`EXT_color_buffer_float`),l}function A(t,n){let r;return t?n===null||n===1014||n===1020?r=e.DEPTH24_STENCIL8:n===1015?r=e.DEPTH32F_STENCIL8:n===1012&&(r=e.DEPTH24_STENCIL8,z(`DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.`)):n===null||n===1014||n===1020?r=e.DEPTH_COMPONENT24:n===1015?r=e.DEPTH_COMPONENT32F:n===1012&&(r=e.DEPTH_COMPONENT16),r}function j(e,t){return E(e)===!0||e.isFramebufferTexture&&e.minFilter!==1003&&e.minFilter!==1006?Math.log2(Math.max(t.width,t.height))+1:e.mipmaps!==void 0&&e.mipmaps.length>0?e.mipmaps.length:e.isCompressedTexture&&Array.isArray(e.image)?t.mipmaps.length:1}function M(e){let t=e.target;t.removeEventListener(`dispose`,M),ee(t),t.isVideoTexture&&y.delete(t),t.isHTMLTexture&&b.delete(t)}function N(e){let t=e.target;t.removeEventListener(`dispose`,N),ne(t)}function ee(e){let t=r.get(e);if(t.__webglInit===void 0)return;let n=e.source,i=S.get(n);if(i){let r=i[t.__cacheKey];r.usedTimes--,r.usedTimes===0&&te(e),Object.keys(i).length===0&&S.delete(n)}r.remove(e)}function te(t){let n=r.get(t);e.deleteTexture(n.__webglTexture);let i=t.source,a=S.get(i);delete a[n.__cacheKey],o.memory.textures--}function ne(t){let n=r.get(t);if(t.depthTexture&&(t.depthTexture.dispose(),r.remove(t.depthTexture)),t.isWebGLCubeRenderTarget)for(let t=0;t<6;t++){if(Array.isArray(n.__webglFramebuffer[t]))for(let r=0;r<n.__webglFramebuffer[t].length;r++)e.deleteFramebuffer(n.__webglFramebuffer[t][r]);else e.deleteFramebuffer(n.__webglFramebuffer[t]);n.__webglDepthbuffer&&e.deleteRenderbuffer(n.__webglDepthbuffer[t])}else{if(Array.isArray(n.__webglFramebuffer))for(let t=0;t<n.__webglFramebuffer.length;t++)e.deleteFramebuffer(n.__webglFramebuffer[t]);else e.deleteFramebuffer(n.__webglFramebuffer);if(n.__webglDepthbuffer&&e.deleteRenderbuffer(n.__webglDepthbuffer),n.__webglMultisampledFramebuffer&&e.deleteFramebuffer(n.__webglMultisampledFramebuffer),n.__webglColorRenderbuffer)for(let t=0;t<n.__webglColorRenderbuffer.length;t++)n.__webglColorRenderbuffer[t]&&e.deleteRenderbuffer(n.__webglColorRenderbuffer[t]);n.__webglDepthRenderbuffer&&e.deleteRenderbuffer(n.__webglDepthRenderbuffer)}let i=t.textures;for(let t=0,n=i.length;t<n;t++){let n=r.get(i[t]);n.__webglTexture&&(e.deleteTexture(n.__webglTexture),o.memory.textures--),r.remove(i[t])}r.remove(t)}let re=0;function ie(){re=0}function ae(){return re}function oe(e){re=e}function se(){let e=re;return e>=i.maxTextures&&z(`WebGLTextures: Trying to use `+(e+1)+` texture units while this GPU supports only `+i.maxTextures),re+=1,e}function ce(e){let t=[];return t.push(e.wrapS),t.push(e.wrapT),t.push(e.wrapR||0),t.push(e.magFilter),t.push(e.minFilter),t.push(e.anisotropy),t.push(e.internalFormat),t.push(e.format),t.push(e.type),t.push(e.generateMipmaps),t.push(e.premultiplyAlpha),t.push(e.flipY),t.push(e.unpackAlignment),t.push(e.colorSpace),t.join()}function F(t,i){let a=r.get(t);if(t.isVideoTexture&&I(t),t.isRenderTargetTexture===!1&&t.isExternalTexture!==!0&&t.version>0&&a.__version!==t.version){let e=t.image;if(e===null)z(`WebGLRenderer: Texture marked for update but no image data found.`);else if(e.complete===!1)z(`WebGLRenderer: Texture marked for update but image is incomplete`);else{ye(a,t,i);return}}else t.isExternalTexture&&(a.__webglTexture=t.sourceTexture?t.sourceTexture:null);n.bindTexture(e.TEXTURE_2D,a.__webglTexture,e.TEXTURE0+i)}function le(t,i){let a=r.get(t);t.isRenderTargetTexture===!1&&t.version>0&&a.__version!==t.version?ye(a,t,i):(t.isExternalTexture&&(a.__webglTexture=t.sourceTexture?t.sourceTexture:null),n.bindTexture(e.TEXTURE_2D_ARRAY,a.__webglTexture,e.TEXTURE0+i))}function ue(t,i){let a=r.get(t);t.isRenderTargetTexture===!1&&t.version>0&&a.__version!==t.version?ye(a,t,i):n.bindTexture(e.TEXTURE_3D,a.__webglTexture,e.TEXTURE0+i)}function de(t,i){let a=r.get(t);t.isCubeDepthTexture!==!0&&t.version>0&&a.__version!==t.version?be(a,t,i):n.bindTexture(e.TEXTURE_CUBE_MAP,a.__webglTexture,e.TEXTURE0+i)}let fe={[l]:e.REPEAT,[u]:e.CLAMP_TO_EDGE,[d]:e.MIRRORED_REPEAT},pe={[f]:e.NEAREST,[p]:e.NEAREST_MIPMAP_NEAREST,[m]:e.NEAREST_MIPMAP_LINEAR,[h]:e.LINEAR,[g]:e.LINEAR_MIPMAP_NEAREST,[_]:e.LINEAR_MIPMAP_LINEAR},me={512:e.NEVER,519:e.ALWAYS,513:e.LESS,515:e.LEQUAL,514:e.EQUAL,518:e.GEQUAL,516:e.GREATER,517:e.NOTEQUAL};function he(n,a){if(a.type===1015&&t.has(`OES_texture_float_linear`)===!1&&(a.magFilter===1006||a.magFilter===1007||a.magFilter===1005||a.magFilter===1008||a.minFilter===1006||a.minFilter===1007||a.minFilter===1005||a.minFilter===1008)&&z(`WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device.`),e.texParameteri(n,e.TEXTURE_WRAP_S,fe[a.wrapS]),e.texParameteri(n,e.TEXTURE_WRAP_T,fe[a.wrapT]),(n===e.TEXTURE_3D||n===e.TEXTURE_2D_ARRAY)&&e.texParameteri(n,e.TEXTURE_WRAP_R,fe[a.wrapR]),e.texParameteri(n,e.TEXTURE_MAG_FILTER,pe[a.magFilter]),e.texParameteri(n,e.TEXTURE_MIN_FILTER,pe[a.minFilter]),a.compareFunction&&(e.texParameteri(n,e.TEXTURE_COMPARE_MODE,e.COMPARE_REF_TO_TEXTURE),e.texParameteri(n,e.TEXTURE_COMPARE_FUNC,me[a.compareFunction])),t.has(`EXT_texture_filter_anisotropic`)===!0){if(a.magFilter===1003||a.minFilter!==1005&&a.minFilter!==1008||a.type===1015&&t.has(`OES_texture_float_linear`)===!1)return;if(a.anisotropy>1||r.get(a).__currentAnisotropy){let o=t.get(`EXT_texture_filter_anisotropic`);e.texParameterf(n,o.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(a.anisotropy,i.getMaxAnisotropy())),r.get(a).__currentAnisotropy=a.anisotropy}}}function ge(t,n){let r=!1;t.__webglInit===void 0&&(t.__webglInit=!0,n.addEventListener(`dispose`,M));let i=n.source,a=S.get(i);a===void 0&&(a={},S.set(i,a));let s=ce(n);if(s!==t.__cacheKey){a[s]===void 0&&(a[s]={texture:e.createTexture(),usedTimes:0},o.memory.textures++,r=!0),a[s].usedTimes++;let i=a[t.__cacheKey];i!==void 0&&(a[t.__cacheKey].usedTimes--,i.usedTimes===0&&te(n)),t.__cacheKey=s,t.__webglTexture=a[s].texture}return r}function _e(e,t,n){return Math.floor(Math.floor(e/n)/t)}function ve(t,r,i,a){let o=t.updateRanges;if(o.length===0)n.texSubImage2D(e.TEXTURE_2D,0,0,0,r.width,r.height,i,a,r.data);else{o.sort((e,t)=>e.start-t.start);let s=0;for(let e=1;e<o.length;e++){let t=o[s],n=o[e],i=t.start+t.count,a=_e(n.start,r.width,4),c=_e(t.start,r.width,4);n.start<=i+1&&a===c&&_e(n.start+n.count-1,r.width,4)===a?t.count=Math.max(t.count,n.start+n.count-t.start):(++s,o[s]=n)}o.length=s+1;let c=n.getParameter(e.UNPACK_ROW_LENGTH),l=n.getParameter(e.UNPACK_SKIP_PIXELS),u=n.getParameter(e.UNPACK_SKIP_ROWS);n.pixelStorei(e.UNPACK_ROW_LENGTH,r.width);for(let t=0,s=o.length;t<s;t++){let s=o[t],c=Math.floor(s.start/4),l=Math.ceil(s.count/4),u=c%r.width,d=Math.floor(c/r.width),f=l;n.pixelStorei(e.UNPACK_SKIP_PIXELS,u),n.pixelStorei(e.UNPACK_SKIP_ROWS,d),n.texSubImage2D(e.TEXTURE_2D,0,u,d,f,1,i,a,r.data)}t.clearUpdateRanges(),n.pixelStorei(e.UNPACK_ROW_LENGTH,c),n.pixelStorei(e.UNPACK_SKIP_PIXELS,l),n.pixelStorei(e.UNPACK_SKIP_ROWS,u)}}function ye(t,o,s){let c=e.TEXTURE_2D;(o.isDataArrayTexture||o.isCompressedArrayTexture)&&(c=e.TEXTURE_2D_ARRAY),o.isData3DTexture&&(c=e.TEXTURE_3D);let l=ge(t,o),u=o.source;n.bindTexture(c,t.__webglTexture,e.TEXTURE0+s);let d=r.get(u);if(u.version!==d.__version||l===!0){if(n.activeTexture(e.TEXTURE0+s),!(typeof ImageBitmap<`u`&&o.image instanceof ImageBitmap)){let t=Ht.getPrimaries(Ht.workingColorSpace),r=o.colorSpace===``?null:Ht.getPrimaries(o.colorSpace),i=o.colorSpace===``||t===r?e.NONE:e.BROWSER_DEFAULT_WEBGL;n.pixelStorei(e.UNPACK_FLIP_Y_WEBGL,o.flipY),n.pixelStorei(e.UNPACK_PREMULTIPLY_ALPHA_WEBGL,o.premultiplyAlpha),n.pixelStorei(e.UNPACK_COLORSPACE_CONVERSION_WEBGL,i)}n.pixelStorei(e.UNPACK_ALIGNMENT,o.unpackAlignment);let t=T(o.image,!1,i.maxTextureSize);t=Ne(o,t);let r=a.convert(o.format,o.colorSpace),f=a.convert(o.type),p=k(o.internalFormat,r,f,o.normalized,o.colorSpace,o.isVideoTexture);he(c,o);let m,h=o.mipmaps,g=o.isVideoTexture!==!0,_=d.__version===void 0||l===!0,v=u.dataReady,y=j(o,t);if(o.isDepthTexture)p=A(o.format===P,o.type),_&&(g?n.texStorage2D(e.TEXTURE_2D,1,p,t.width,t.height):n.texImage2D(e.TEXTURE_2D,0,p,t.width,t.height,0,r,f,null));else if(o.isDataTexture){if(h.length>0){g&&_&&n.texStorage2D(e.TEXTURE_2D,y,p,h[0].width,h[0].height);for(let t=0,i=h.length;t<i;t++)m=h[t],g?v&&n.texSubImage2D(e.TEXTURE_2D,t,0,0,m.width,m.height,r,f,m.data):n.texImage2D(e.TEXTURE_2D,t,p,m.width,m.height,0,r,f,m.data);o.generateMipmaps=!1}else g?(_&&n.texStorage2D(e.TEXTURE_2D,y,p,t.width,t.height),v&&ve(o,t,r,f)):n.texImage2D(e.TEXTURE_2D,0,p,t.width,t.height,0,r,f,t.data)}else if(o.isCompressedTexture){if(o.isCompressedArrayTexture){g&&_&&n.texStorage3D(e.TEXTURE_2D_ARRAY,y,p,h[0].width,h[0].height,t.depth);for(let i=0,a=h.length;i<a;i++)if(m=h[i],o.format!==1023){if(r!==null){if(g){if(v){if(o.layerUpdates.size>0){let t=Ss(m.width,m.height,o.format,o.type);for(let a of o.layerUpdates){let o=m.data.subarray(a*t/m.data.BYTES_PER_ELEMENT,(a+1)*t/m.data.BYTES_PER_ELEMENT);n.compressedTexSubImage3D(e.TEXTURE_2D_ARRAY,i,0,0,a,m.width,m.height,1,r,o)}}else n.compressedTexSubImage3D(e.TEXTURE_2D_ARRAY,i,0,0,0,m.width,m.height,t.depth,r,m.data)}}else n.compressedTexImage3D(e.TEXTURE_2D_ARRAY,i,p,m.width,m.height,t.depth,0,m.data,0,0)}else z(`WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()`)}else g?v&&n.texSubImage3D(e.TEXTURE_2D_ARRAY,i,0,0,0,m.width,m.height,t.depth,r,f,m.data):n.texImage3D(e.TEXTURE_2D_ARRAY,i,p,m.width,m.height,t.depth,0,r,f,m.data);o.layerUpdates.size>0&&o.clearLayerUpdates()}else{g&&_&&n.texStorage2D(e.TEXTURE_2D,y,p,h[0].width,h[0].height);for(let t=0,i=h.length;t<i;t++)m=h[t],o.format===1023?g?v&&n.texSubImage2D(e.TEXTURE_2D,t,0,0,m.width,m.height,r,f,m.data):n.texImage2D(e.TEXTURE_2D,t,p,m.width,m.height,0,r,f,m.data):r===null?z(`WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()`):g?v&&n.compressedTexSubImage2D(e.TEXTURE_2D,t,0,0,m.width,m.height,r,m.data):n.compressedTexImage2D(e.TEXTURE_2D,t,p,m.width,m.height,0,m.data)}}else if(o.isDataArrayTexture){if(g){if(_&&n.texStorage3D(e.TEXTURE_2D_ARRAY,y,p,t.width,t.height,t.depth),v){if(o.layerUpdates.size>0){let i=Ss(t.width,t.height,o.format,o.type);for(let a of o.layerUpdates){let o=t.data.subarray(a*i/t.data.BYTES_PER_ELEMENT,(a+1)*i/t.data.BYTES_PER_ELEMENT);n.texSubImage3D(e.TEXTURE_2D_ARRAY,0,0,0,a,t.width,t.height,1,r,f,o)}o.clearLayerUpdates()}else n.texSubImage3D(e.TEXTURE_2D_ARRAY,0,0,0,0,t.width,t.height,t.depth,r,f,t.data)}}else n.texImage3D(e.TEXTURE_2D_ARRAY,0,p,t.width,t.height,t.depth,0,r,f,t.data)}else if(o.isData3DTexture)g?(_&&n.texStorage3D(e.TEXTURE_3D,y,p,t.width,t.height,t.depth),v&&n.texSubImage3D(e.TEXTURE_3D,0,0,0,0,t.width,t.height,t.depth,r,f,t.data)):n.texImage3D(e.TEXTURE_3D,0,p,t.width,t.height,t.depth,0,r,f,t.data);else if(o.isFramebufferTexture){if(_){if(g)n.texStorage2D(e.TEXTURE_2D,y,p,t.width,t.height);else{let i=t.width,a=t.height;for(let t=0;t<y;t++)n.texImage2D(e.TEXTURE_2D,t,p,i,a,0,r,f,null),i>>=1,a>>=1}}}else if(o.isHTMLTexture){if(`texElementImage2D`in e){let n=e.canvas;if(n.hasAttribute(`layoutsubtree`)||n.setAttribute(`layoutsubtree`,`true`),t.parentNode!==n){n.appendChild(t),b.add(o),n.onpaint=e=>{let t=e.changedElements;for(let e of b)t.includes(e.image)&&(e.needsUpdate=!0)},n.requestPaint();return}if(e.texElementImage2D.length===3)e.texElementImage2D(e.TEXTURE_2D,e.RGBA8,t);else{let n=e.RGBA,r=e.RGBA,i=e.UNSIGNED_BYTE;e.texElementImage2D(e.TEXTURE_2D,0,n,r,i,t)}e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MIN_FILTER,e.LINEAR),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_S,e.CLAMP_TO_EDGE),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_T,e.CLAMP_TO_EDGE)}}else if(h.length>0){if(g&&_){let t=Pe(h[0]);n.texStorage2D(e.TEXTURE_2D,y,p,t.width,t.height)}for(let t=0,i=h.length;t<i;t++)m=h[t],g?v&&n.texSubImage2D(e.TEXTURE_2D,t,0,0,r,f,m):n.texImage2D(e.TEXTURE_2D,t,p,r,f,m);o.generateMipmaps=!1}else if(g){if(_){let r=Pe(t);n.texStorage2D(e.TEXTURE_2D,y,p,r.width,r.height)}v&&n.texSubImage2D(e.TEXTURE_2D,0,0,0,r,f,t)}else n.texImage2D(e.TEXTURE_2D,0,p,r,f,t);E(o)&&D(c),d.__version=u.version,o.onUpdate&&o.onUpdate(o)}t.__version=o.version}function be(t,o,s){if(o.image.length!==6)return;let c=ge(t,o),l=o.source;n.bindTexture(e.TEXTURE_CUBE_MAP,t.__webglTexture,e.TEXTURE0+s);let u=r.get(l);if(l.version!==u.__version||c===!0){n.activeTexture(e.TEXTURE0+s);let t=Ht.getPrimaries(Ht.workingColorSpace),r=o.colorSpace===``?null:Ht.getPrimaries(o.colorSpace),d=o.colorSpace===``||t===r?e.NONE:e.BROWSER_DEFAULT_WEBGL;n.pixelStorei(e.UNPACK_FLIP_Y_WEBGL,o.flipY),n.pixelStorei(e.UNPACK_PREMULTIPLY_ALPHA_WEBGL,o.premultiplyAlpha),n.pixelStorei(e.UNPACK_ALIGNMENT,o.unpackAlignment),n.pixelStorei(e.UNPACK_COLORSPACE_CONVERSION_WEBGL,d);let f=o.isCompressedTexture||o.image[0].isCompressedTexture,p=o.image[0]&&o.image[0].isDataTexture,m=[];for(let e=0;e<6;e++)!f&&!p?m[e]=T(o.image[e],!0,i.maxCubemapSize):m[e]=p?o.image[e].image:o.image[e],m[e]=Ne(o,m[e]);let h=m[0],g=a.convert(o.format,o.colorSpace),_=a.convert(o.type),v=k(o.internalFormat,g,_,o.normalized,o.colorSpace),y=o.isVideoTexture!==!0,b=u.__version===void 0||c===!0,x=l.dataReady,S=j(o,h);he(e.TEXTURE_CUBE_MAP,o);let C;if(f){y&&b&&n.texStorage2D(e.TEXTURE_CUBE_MAP,S,v,h.width,h.height);for(let t=0;t<6;t++){C=m[t].mipmaps;for(let r=0;r<C.length;r++){let i=C[r];o.format===1023?y?x&&n.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,r,0,0,i.width,i.height,g,_,i.data):n.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,r,v,i.width,i.height,0,g,_,i.data):g===null?z(`WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()`):y?x&&n.compressedTexSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,r,0,0,i.width,i.height,g,i.data):n.compressedTexImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,r,v,i.width,i.height,0,i.data)}}}else{if(C=o.mipmaps,y&&b){C.length>0&&S++;let t=Pe(m[0]);n.texStorage2D(e.TEXTURE_CUBE_MAP,S,v,t.width,t.height)}for(let t=0;t<6;t++)if(p){y?x&&n.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,0,0,0,m[t].width,m[t].height,g,_,m[t].data):n.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,0,v,m[t].width,m[t].height,0,g,_,m[t].data);for(let r=0;r<C.length;r++){let i=C[r].image[t].image;y?x&&n.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,r+1,0,0,i.width,i.height,g,_,i.data):n.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,r+1,v,i.width,i.height,0,g,_,i.data)}}else{y?x&&n.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,0,0,0,g,_,m[t]):n.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,0,v,g,_,m[t]);for(let r=0;r<C.length;r++){let i=C[r];y?x&&n.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,r+1,0,0,g,_,i.image[t]):n.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,r+1,v,g,_,i.image[t])}}}E(o)&&D(e.TEXTURE_CUBE_MAP),u.__version=l.version,o.onUpdate&&o.onUpdate(o)}t.__version=o.version}function xe(t,i,o,c,l,u){let d=a.convert(o.format,o.colorSpace),f=a.convert(o.type),p=k(o.internalFormat,d,f,o.normalized,o.colorSpace),m=r.get(i),h=r.get(o);if(h.__renderTarget=i,!m.__hasExternalTextures){let t=Math.max(1,i.width>>u),r=Math.max(1,i.height>>u);l===e.TEXTURE_3D||l===e.TEXTURE_2D_ARRAY?n.texImage3D(l,u,p,t,r,i.depth,0,d,f,null):n.texImage2D(l,u,p,t,r,0,d,f,null)}n.bindFramebuffer(e.FRAMEBUFFER,t),Me(i)?s.framebufferTexture2DMultisampleEXT(e.FRAMEBUFFER,c,l,h.__webglTexture,0,je(i)):(l===e.TEXTURE_2D||l>=e.TEXTURE_CUBE_MAP_POSITIVE_X&&l<=e.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&e.framebufferTexture2D(e.FRAMEBUFFER,c,l,h.__webglTexture,u),n.bindFramebuffer(e.FRAMEBUFFER,null)}function Se(t,n,r){if(e.bindRenderbuffer(e.RENDERBUFFER,t),n.depthBuffer){let i=n.depthTexture,a=i&&i.isDepthTexture?i.type:null,o=A(n.stencilBuffer,a),c=n.stencilBuffer?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT;Me(n)?s.renderbufferStorageMultisampleEXT(e.RENDERBUFFER,je(n),o,n.width,n.height):r?e.renderbufferStorageMultisample(e.RENDERBUFFER,je(n),o,n.width,n.height):e.renderbufferStorage(e.RENDERBUFFER,o,n.width,n.height),e.framebufferRenderbuffer(e.FRAMEBUFFER,c,e.RENDERBUFFER,t)}else{let t=n.textures;for(let i=0;i<t.length;i++){let o=t[i],c=a.convert(o.format,o.colorSpace),l=a.convert(o.type),u=k(o.internalFormat,c,l,o.normalized,o.colorSpace);Me(n)?s.renderbufferStorageMultisampleEXT(e.RENDERBUFFER,je(n),u,n.width,n.height):r?e.renderbufferStorageMultisample(e.RENDERBUFFER,je(n),u,n.width,n.height):e.renderbufferStorage(e.RENDERBUFFER,u,n.width,n.height)}}e.bindRenderbuffer(e.RENDERBUFFER,null)}function Ce(t,i,o){let c=i.isWebGLCubeRenderTarget===!0;if(n.bindFramebuffer(e.FRAMEBUFFER,t),!(i.depthTexture&&i.depthTexture.isDepthTexture))throw Error(`THREE.WebGLTextures: renderTarget.depthTexture must be an instance of THREE.DepthTexture.`);let l=r.get(i.depthTexture);if(l.__renderTarget=i,l.__webglTexture&&i.depthTexture.image.width===i.width&&i.depthTexture.image.height===i.height||(i.depthTexture.image.width=i.width,i.depthTexture.image.height=i.height,i.depthTexture.needsUpdate=!0),c){if(l.__webglInit===void 0&&(l.__webglInit=!0,i.depthTexture.addEventListener(`dispose`,M)),l.__webglTexture===void 0){l.__webglTexture=e.createTexture(),n.bindTexture(e.TEXTURE_CUBE_MAP,l.__webglTexture),he(e.TEXTURE_CUBE_MAP,i.depthTexture);let t=a.convert(i.depthTexture.format),r=a.convert(i.depthTexture.type),o;i.depthTexture.format===1026?o=e.DEPTH_COMPONENT24:i.depthTexture.format===1027&&(o=e.DEPTH24_STENCIL8);for(let n=0;n<6;n++)e.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+n,0,o,i.width,i.height,0,t,r,null)}}else F(i.depthTexture,0);let u=l.__webglTexture,d=je(i),f=c?e.TEXTURE_CUBE_MAP_POSITIVE_X+o:e.TEXTURE_2D,p=i.depthTexture.format===1027?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT;if(i.depthTexture.format===1026)Me(i)?s.framebufferTexture2DMultisampleEXT(e.FRAMEBUFFER,p,f,u,0,d):e.framebufferTexture2D(e.FRAMEBUFFER,p,f,u,0);else if(i.depthTexture.format===1027)Me(i)?s.framebufferTexture2DMultisampleEXT(e.FRAMEBUFFER,p,f,u,0,d):e.framebufferTexture2D(e.FRAMEBUFFER,p,f,u,0);else throw Error(`THREE.WebGLTextures: Unknown depthTexture format.`)}function we(t){let i=r.get(t),a=t.isWebGLCubeRenderTarget===!0;if(i.__boundDepthTexture!==t.depthTexture){let e=t.depthTexture;if(i.__depthDisposeCallback&&i.__depthDisposeCallback(),e){let t=()=>{delete i.__boundDepthTexture,delete i.__depthDisposeCallback,e.removeEventListener(`dispose`,t)};e.addEventListener(`dispose`,t),i.__depthDisposeCallback=t}i.__boundDepthTexture=e}if(t.depthTexture&&!i.__autoAllocateDepthBuffer){if(a)for(let e=0;e<6;e++)Ce(i.__webglFramebuffer[e],t,e);else{let e=t.texture.mipmaps;e&&e.length>0?Ce(i.__webglFramebuffer[0],t,0):Ce(i.__webglFramebuffer,t,0)}}else if(a){i.__webglDepthbuffer=[];for(let r=0;r<6;r++)if(n.bindFramebuffer(e.FRAMEBUFFER,i.__webglFramebuffer[r]),i.__webglDepthbuffer[r]===void 0)i.__webglDepthbuffer[r]=e.createRenderbuffer(),Se(i.__webglDepthbuffer[r],t,!1);else{let n=t.stencilBuffer?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT,a=i.__webglDepthbuffer[r];e.bindRenderbuffer(e.RENDERBUFFER,a),e.framebufferRenderbuffer(e.FRAMEBUFFER,n,e.RENDERBUFFER,a)}}else{let r=t.texture.mipmaps;if(r&&r.length>0?n.bindFramebuffer(e.FRAMEBUFFER,i.__webglFramebuffer[0]):n.bindFramebuffer(e.FRAMEBUFFER,i.__webglFramebuffer),i.__webglDepthbuffer===void 0)i.__webglDepthbuffer=e.createRenderbuffer(),Se(i.__webglDepthbuffer,t,!1);else{let n=t.stencilBuffer?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT,r=i.__webglDepthbuffer;e.bindRenderbuffer(e.RENDERBUFFER,r),e.framebufferRenderbuffer(e.FRAMEBUFFER,n,e.RENDERBUFFER,r)}}n.bindFramebuffer(e.FRAMEBUFFER,null)}function Te(t,n,i){let a=r.get(t);n!==void 0&&xe(a.__webglFramebuffer,t,t.texture,e.COLOR_ATTACHMENT0,e.TEXTURE_2D,0),i!==void 0&&we(t)}function Ee(t){let i=t.texture,s=r.get(t),c=r.get(i);t.addEventListener(`dispose`,N);let l=t.textures,u=t.isWebGLCubeRenderTarget===!0,d=l.length>1;if(d||(c.__webglTexture===void 0&&(c.__webglTexture=e.createTexture()),c.__version=i.version,o.memory.textures++),u){s.__webglFramebuffer=[];for(let t=0;t<6;t++)if(i.mipmaps&&i.mipmaps.length>0){s.__webglFramebuffer[t]=[];for(let n=0;n<i.mipmaps.length;n++)s.__webglFramebuffer[t][n]=e.createFramebuffer()}else s.__webglFramebuffer[t]=e.createFramebuffer()}else{if(i.mipmaps&&i.mipmaps.length>0){s.__webglFramebuffer=[];for(let t=0;t<i.mipmaps.length;t++)s.__webglFramebuffer[t]=e.createFramebuffer()}else s.__webglFramebuffer=e.createFramebuffer();if(d)for(let t=0,n=l.length;t<n;t++){let n=r.get(l[t]);n.__webglTexture===void 0&&(n.__webglTexture=e.createTexture(),o.memory.textures++)}if(t.samples>0&&Me(t)===!1){s.__webglMultisampledFramebuffer=e.createFramebuffer(),s.__webglColorRenderbuffer=[],n.bindFramebuffer(e.FRAMEBUFFER,s.__webglMultisampledFramebuffer);for(let n=0;n<l.length;n++){let r=l[n];s.__webglColorRenderbuffer[n]=e.createRenderbuffer(),e.bindRenderbuffer(e.RENDERBUFFER,s.__webglColorRenderbuffer[n]);let i=a.convert(r.format,r.colorSpace),o=a.convert(r.type),c=k(r.internalFormat,i,o,r.normalized,r.colorSpace,t.isXRRenderTarget===!0),u=je(t);e.renderbufferStorageMultisample(e.RENDERBUFFER,u,c,t.width,t.height),e.framebufferRenderbuffer(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0+n,e.RENDERBUFFER,s.__webglColorRenderbuffer[n])}e.bindRenderbuffer(e.RENDERBUFFER,null),t.depthBuffer&&(s.__webglDepthRenderbuffer=e.createRenderbuffer(),Se(s.__webglDepthRenderbuffer,t,!0)),n.bindFramebuffer(e.FRAMEBUFFER,null)}}if(u){n.bindTexture(e.TEXTURE_CUBE_MAP,c.__webglTexture),he(e.TEXTURE_CUBE_MAP,i);for(let n=0;n<6;n++)if(i.mipmaps&&i.mipmaps.length>0)for(let r=0;r<i.mipmaps.length;r++)xe(s.__webglFramebuffer[n][r],t,i,e.COLOR_ATTACHMENT0,e.TEXTURE_CUBE_MAP_POSITIVE_X+n,r);else xe(s.__webglFramebuffer[n],t,i,e.COLOR_ATTACHMENT0,e.TEXTURE_CUBE_MAP_POSITIVE_X+n,0);E(i)&&D(e.TEXTURE_CUBE_MAP),n.unbindTexture()}else if(d){for(let i=0,a=l.length;i<a;i++){let a=l[i],o=r.get(a),c=e.TEXTURE_2D;(t.isWebGL3DRenderTarget||t.isWebGLArrayRenderTarget)&&(c=t.isWebGL3DRenderTarget?e.TEXTURE_3D:e.TEXTURE_2D_ARRAY),n.bindTexture(c,o.__webglTexture),he(c,a),xe(s.__webglFramebuffer,t,a,e.COLOR_ATTACHMENT0+i,c,0),E(a)&&D(c)}n.unbindTexture()}else{let r=e.TEXTURE_2D;if((t.isWebGL3DRenderTarget||t.isWebGLArrayRenderTarget)&&(r=t.isWebGL3DRenderTarget?e.TEXTURE_3D:e.TEXTURE_2D_ARRAY),n.bindTexture(r,c.__webglTexture),he(r,i),i.mipmaps&&i.mipmaps.length>0)for(let n=0;n<i.mipmaps.length;n++)xe(s.__webglFramebuffer[n],t,i,e.COLOR_ATTACHMENT0,r,n);else xe(s.__webglFramebuffer,t,i,e.COLOR_ATTACHMENT0,r,0);E(i)&&D(r),n.unbindTexture()}t.depthBuffer&&we(t)}function De(e){let t=e.textures;for(let i=0,a=t.length;i<a;i++){let a=t[i];if(E(a)){let t=O(e),i=r.get(a).__webglTexture;n.bindTexture(t,i),D(t),n.unbindTexture()}}}let Oe=[],ke=[];function Ae(t){if(t.samples>0){if(Me(t)===!1){let i=t.textures,a=t.width,o=t.height,s=e.COLOR_BUFFER_BIT,l=t.stencilBuffer?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT,u=r.get(t),d=i.length>1;if(d)for(let t=0;t<i.length;t++)n.bindFramebuffer(e.FRAMEBUFFER,u.__webglMultisampledFramebuffer),e.framebufferRenderbuffer(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0+t,e.RENDERBUFFER,null),n.bindFramebuffer(e.FRAMEBUFFER,u.__webglFramebuffer),e.framebufferTexture2D(e.DRAW_FRAMEBUFFER,e.COLOR_ATTACHMENT0+t,e.TEXTURE_2D,null,0);n.bindFramebuffer(e.READ_FRAMEBUFFER,u.__webglMultisampledFramebuffer);let f=t.texture.mipmaps;f&&f.length>0?n.bindFramebuffer(e.DRAW_FRAMEBUFFER,u.__webglFramebuffer[0]):n.bindFramebuffer(e.DRAW_FRAMEBUFFER,u.__webglFramebuffer);for(let n=0;n<i.length;n++){if(t.resolveDepthBuffer&&(t.depthBuffer&&(s|=e.DEPTH_BUFFER_BIT),t.stencilBuffer&&t.resolveStencilBuffer&&(s|=e.STENCIL_BUFFER_BIT)),d){e.framebufferRenderbuffer(e.READ_FRAMEBUFFER,e.COLOR_ATTACHMENT0,e.RENDERBUFFER,u.__webglColorRenderbuffer[n]);let t=r.get(i[n]).__webglTexture;e.framebufferTexture2D(e.DRAW_FRAMEBUFFER,e.COLOR_ATTACHMENT0,e.TEXTURE_2D,t,0)}e.blitFramebuffer(0,0,a,o,0,0,a,o,s,e.NEAREST),c===!0&&(Oe.length=0,ke.length=0,Oe.push(e.COLOR_ATTACHMENT0+n),t.depthBuffer&&t.storeMultisampledDepthBuffer===!1&&(Oe.push(l),ke.push(l),e.invalidateFramebuffer(e.DRAW_FRAMEBUFFER,ke)),e.invalidateFramebuffer(e.READ_FRAMEBUFFER,Oe))}if(n.bindFramebuffer(e.READ_FRAMEBUFFER,null),n.bindFramebuffer(e.DRAW_FRAMEBUFFER,null),d)for(let t=0;t<i.length;t++){n.bindFramebuffer(e.FRAMEBUFFER,u.__webglMultisampledFramebuffer),e.framebufferRenderbuffer(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0+t,e.RENDERBUFFER,u.__webglColorRenderbuffer[t]);let a=r.get(i[t]).__webglTexture;n.bindFramebuffer(e.FRAMEBUFFER,u.__webglFramebuffer),e.framebufferTexture2D(e.DRAW_FRAMEBUFFER,e.COLOR_ATTACHMENT0+t,e.TEXTURE_2D,a,0)}n.bindFramebuffer(e.DRAW_FRAMEBUFFER,u.__webglMultisampledFramebuffer)}else if(t.depthBuffer&&t.storeMultisampledDepthBuffer===!1&&c){let n=t.stencilBuffer?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT;e.invalidateFramebuffer(e.DRAW_FRAMEBUFFER,[n])}}}function je(e){return Math.min(i.maxSamples,e.samples)}function Me(e){let n=r.get(e);return e.samples>0&&t.has(`WEBGL_multisampled_render_to_texture`)===!0&&n.__useRenderToTexture!==!1}function I(e){let t=o.render.frame;y.get(e)!==t&&(y.set(e,t),e.update())}function Ne(e,t){let n=e.colorSpace,r=e.format,i=e.type;return e.isCompressedTexture===!0||e.isVideoTexture===!0||n!==`srgb-linear`&&n!==``&&(Ht.getTransfer(n)===`srgb`?(r!==1023||i!==1009)&&z(`WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType.`):B(`WebGLTextures: Unsupported texture color space:`,n)),t}function Pe(e){return typeof HTMLImageElement<`u`&&e instanceof HTMLImageElement?(v.width=e.naturalWidth||e.width,v.height=e.naturalHeight||e.height):typeof VideoFrame<`u`&&e instanceof VideoFrame?(v.width=e.displayWidth,v.height=e.displayHeight):(v.width=e.width,v.height=e.height),v}this.allocateTextureUnit=se,this.resetTextureUnits=ie,this.getTextureUnits=ae,this.setTextureUnits=oe,this.setTexture2D=F,this.setTexture2DArray=le,this.setTexture3D=ue,this.setTextureCube=de,this.rebindTextures=Te,this.setupRenderTarget=Ee,this.updateRenderTargetMipmap=De,this.updateMultisampleRenderTarget=Ae,this.setupDepthRenderbuffer=we,this.setupFrameBufferTexture=xe,this.useMultisampledRTT=Me,this.isReversedDepthBuffer=function(){return n.buffers.depth.getReversed()}}function ku(e,t){function n(n,r=``){let i,a=Ht.getTransfer(r);if(n===1009)return e.UNSIGNED_BYTE;if(n===1017)return e.UNSIGNED_SHORT_4_4_4_4;if(n===1018)return e.UNSIGNED_SHORT_5_5_5_1;if(n===35902)return e.UNSIGNED_INT_5_9_9_9_REV;if(n===35899)return e.UNSIGNED_INT_10F_11F_11F_REV;if(n===1010)return e.BYTE;if(n===1011)return e.SHORT;if(n===1012)return e.UNSIGNED_SHORT;if(n===1013)return e.INT;if(n===1014)return e.UNSIGNED_INT;if(n===1015)return e.FLOAT;if(n===1016)return e.HALF_FLOAT;if(n===1021)return e.ALPHA;if(n===1022)return e.RGB;if(n===1023)return e.RGBA;if(n===1026)return e.DEPTH_COMPONENT;if(n===1027)return e.DEPTH_STENCIL;if(n===1028)return e.RED;if(n===1029)return e.RED_INTEGER;if(n===1030)return e.RG;if(n===1031)return e.RG_INTEGER;if(n===1033)return e.RGBA_INTEGER;if(n===33776||n===33777||n===33778||n===33779){if(a===`srgb`){if(i=t.get(`WEBGL_compressed_texture_s3tc_srgb`),i!==null){if(n===33776)return i.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===33777)return i.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===33778)return i.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===33779)return i.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null}else if(i=t.get(`WEBGL_compressed_texture_s3tc`),i!==null){if(n===33776)return i.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===33777)return i.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===33778)return i.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===33779)return i.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null}if(n===35840||n===35841||n===35842||n===35843){if(i=t.get(`WEBGL_compressed_texture_pvrtc`),i!==null){if(n===35840)return i.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===35841)return i.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===35842)return i.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===35843)return i.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null}if(n===36196||n===37492||n===37496||n===37488||n===37489||n===37490||n===37491){if(i=t.get(`WEBGL_compressed_texture_etc`),i!==null){if(n===36196||n===37492)return a===`srgb`?i.COMPRESSED_SRGB8_ETC2:i.COMPRESSED_RGB8_ETC2;if(n===37496)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:i.COMPRESSED_RGBA8_ETC2_EAC;if(n===37488)return i.COMPRESSED_R11_EAC;if(n===37489)return i.COMPRESSED_SIGNED_R11_EAC;if(n===37490)return i.COMPRESSED_RG11_EAC;if(n===37491)return i.COMPRESSED_SIGNED_RG11_EAC}else return null}if(n===37808||n===37809||n===37810||n===37811||n===37812||n===37813||n===37814||n===37815||n===37816||n===37817||n===37818||n===37819||n===37820||n===37821){if(i=t.get(`WEBGL_compressed_texture_astc`),i!==null){if(n===37808)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:i.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===37809)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:i.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===37810)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:i.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===37811)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:i.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===37812)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:i.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===37813)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:i.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===37814)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:i.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===37815)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:i.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===37816)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:i.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===37817)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:i.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===37818)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:i.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===37819)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:i.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===37820)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:i.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===37821)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:i.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null}if(n===36492||n===36494||n===36495){if(i=t.get(`EXT_texture_compression_bptc`),i!==null){if(n===36492)return a===`srgb`?i.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:i.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===36494)return i.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===36495)return i.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null}if(n===36283||n===36284||n===36285||n===36286){if(i=t.get(`EXT_texture_compression_rgtc`),i!==null){if(n===36283)return i.COMPRESSED_RED_RGTC1_EXT;if(n===36284)return i.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===36285)return i.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===36286)return i.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null}return n===1020?e.UNSIGNED_INT_24_8:e[n]===void 0?null:e[n]}return{convert:n}}var Au=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,ju=`
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

}`,Mu=class{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t){if(this.texture===null){let n=new Mi(e.texture);(e.depthNear!==t.depthNear||e.depthFar!==t.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=n}}getMesh(e){if(this.texture!==null&&this.mesh===null){let t=e.cameras[0].viewport,n=new go({vertexShader:Au,fragmentShader:ju,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new J(new ro(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}},Nu=class extends lt{constructor(e,t){super();let n=this,r=null,i=1,a=null,o=`local-floor`,s=1,c=null,l=null,u=null,d=null,f=null,p=null,m=typeof XRWebGLBinding<`u`,h=new Mu,g={},_=t.getContextAttributes(),y=null,b=null,x=[],S=[],w=new U,T=null,E=null,D=new $o;D.viewport=new $t;let k=new $o;k.viewport=new $t;let A=[D,k],j=new ls,M=null,te=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(e){let t=x[e];return t===void 0&&(t=new Pn,x[e]=t),t.getTargetRaySpace()},this.getControllerGrip=function(e){let t=x[e];return t===void 0&&(t=new Pn,x[e]=t),t.getGripSpace()},this.getHand=function(e){let t=x[e];return t===void 0&&(t=new Pn,x[e]=t),t.getHandSpace()};function ne(e){let t=S.indexOf(e.inputSource);if(t===-1)return;let n=x[t];n!==void 0&&(n.update(e.inputSource,e.frame,c||a),n.dispatchEvent({type:e.type,data:e.inputSource}))}function re(){r.removeEventListener(`select`,ne),r.removeEventListener(`selectstart`,ne),r.removeEventListener(`selectend`,ne),r.removeEventListener(`squeeze`,ne),r.removeEventListener(`squeezestart`,ne),r.removeEventListener(`squeezeend`,ne),r.removeEventListener(`end`,re),r.removeEventListener(`inputsourceschange`,ie);for(let e=0;e<x.length;e++){let t=S[e];t!==null&&(S[e]=null,x[e].disconnect(t))}M=null,te=null,h.reset();for(let e in g)delete g[e];if(e.setRenderTarget(y),f=null,d=null,u=null,r=null,b=null,de.stop(),n.isPresenting=!1,e.setPixelRatio(T),e.setSize(w.width,w.height,!1),E!==null){let e=E.camera;e.fov=E.fov,e.zoom=E.zoom,e.updateProjectionMatrix(),E=null}n.dispatchEvent({type:`sessionend`})}this.setFramebufferScaleFactor=function(e){i=e,n.isPresenting===!0&&z(`WebXRManager: Cannot change framebuffer scale while presenting.`)},this.setReferenceSpaceType=function(e){o=e,n.isPresenting===!0&&z(`WebXRManager: Cannot change reference space type while presenting.`)},this.getReferenceSpace=function(){return c||a},this.setReferenceSpace=function(e){c=e},this.getBaseLayer=function(){return d===null?f:d},this.getBinding=function(){return u===null&&m&&(u=new XRWebGLBinding(r,t)),u},this.getFrame=function(){return p},this.getSession=function(){return r},this.setSession=async function(l){if(r=l,r!==null){if(y=e.getRenderTarget(),r.addEventListener(`select`,ne),r.addEventListener(`selectstart`,ne),r.addEventListener(`selectend`,ne),r.addEventListener(`squeeze`,ne),r.addEventListener(`squeezestart`,ne),r.addEventListener(`squeezeend`,ne),r.addEventListener(`end`,re),r.addEventListener(`inputsourceschange`,ie),_.xrCompatible!==!0&&await t.makeXRCompatible(),T=e.getPixelRatio(),e.getSize(w),m&&`createProjectionLayer`in XRWebGLBinding.prototype){let n=null,a=null,o=null;_.depth&&(o=_.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,n=_.stencil?P:ee,a=_.stencil?O:C);let s={colorFormat:t.RGBA8,depthFormat:o,scaleFactor:i};u=this.getBinding(),d=u.createProjectionLayer(s),r.updateRenderState({layers:[d]}),e.setPixelRatio(1),e.setSize(d.textureWidth,d.textureHeight,!1),b=new tn(d.textureWidth,d.textureHeight,{format:N,type:v,depthTexture:new Ai(d.textureWidth,d.textureHeight,a,void 0,void 0,void 0,void 0,void 0,void 0,n),stencilBuffer:_.stencil,colorSpace:e.outputColorSpace,samples:_.antialias?4:0,resolveDepthBuffer:d.ignoreDepthValues===!1,resolveStencilBuffer:d.ignoreDepthValues===!1,storeMultisampledDepthBuffer:d.ignoreDepthValues===!1,storeMultisampledStencilBuffer:d.ignoreDepthValues===!1})}else{let n={antialias:_.antialias,alpha:!0,depth:_.depth,stencil:_.stencil,framebufferScaleFactor:i};f=new XRWebGLLayer(r,t,n),r.updateRenderState({baseLayer:f}),e.setPixelRatio(1),e.setSize(f.framebufferWidth,f.framebufferHeight,!1),b=new tn(f.framebufferWidth,f.framebufferHeight,{format:N,type:v,colorSpace:e.outputColorSpace,stencilBuffer:_.stencil,resolveDepthBuffer:f.ignoreDepthValues===!1,resolveStencilBuffer:f.ignoreDepthValues===!1,storeMultisampledDepthBuffer:f.ignoreDepthValues===!1,storeMultisampledStencilBuffer:f.ignoreDepthValues===!1})}b.isXRRenderTarget=!0,this.setFoveation(s),c=null,a=await r.requestReferenceSpace(o),de.setContext(r),de.start(),n.isPresenting=!0,n.dispatchEvent({type:`sessionstart`})}},this.getEnvironmentBlendMode=function(){if(r!==null)return r.environmentBlendMode},this.getDepthTexture=function(){return h.getDepthTexture()};function ie(e){for(let t=0;t<e.removed.length;t++){let n=e.removed[t],r=S.indexOf(n);r>=0&&(S[r]=null,x[r].disconnect(n))}for(let t=0;t<e.added.length;t++){let n=e.added[t],r=S.indexOf(n);if(r===-1){for(let e=0;e<x.length;e++)if(e>=S.length){S.push(n),r=e;break}else if(S[e]===null){S[e]=n,r=e;break}if(r===-1)break}let i=x[r];i&&i.connect(n)}}let ae=new W,oe=new W;function se(e,t,n){ae.setFromMatrixPosition(t.matrixWorld),oe.setFromMatrixPosition(n.matrixWorld);let r=ae.distanceTo(oe),i=t.projectionMatrix.elements,a=n.projectionMatrix.elements,o=i[14]/(i[10]-1),s=i[14]/(i[10]+1),c=(i[9]+1)/i[5],l=(i[9]-1)/i[5],u=(i[8]-1)/i[0],d=(a[8]+1)/a[0],f=o*u,p=o*d,m=r/(-u+d),h=m*-u;if(t.matrixWorld.decompose(e.position,e.quaternion,e.scale),e.translateX(h),e.translateZ(m),e.matrixWorld.compose(e.position,e.quaternion,e.scale),e.matrixWorldInverse.copy(e.matrixWorld).invert(),i[10]===-1)e.projectionMatrix.copy(t.projectionMatrix),e.projectionMatrixInverse.copy(t.projectionMatrixInverse);else{let t=o+m,n=s+m,i=f-h,a=p+(r-h),u=c*s/n*t,d=l*s/n*t;e.projectionMatrix.makePerspective(i,a,u,d,t,n),e.projectionMatrixInverse.copy(e.projectionMatrix).invert()}}function ce(e,t){t===null?e.matrixWorld.copy(e.matrix):e.matrixWorld.multiplyMatrices(t.matrixWorld,e.matrix),e.matrixWorldInverse.copy(e.matrixWorld).invert()}this.updateCamera=function(e){if(r===null)return;let t=e.near,n=e.far;h.texture!==null&&(h.depthNear>0&&(t=h.depthNear),h.depthFar>0&&(n=h.depthFar)),j.near=k.near=D.near=t,j.far=k.far=D.far=n,(M!==j.near||te!==j.far)&&(r.updateRenderState({depthNear:j.near,depthFar:j.far}),M=j.near,te=j.far),j.layers.mask=e.layers.mask|6,D.layers.mask=j.layers.mask&-5,k.layers.mask=j.layers.mask&-3;let i=e.parent,a=j.cameras;ce(j,i);for(let e=0;e<a.length;e++)ce(a[e],i);a.length===2?se(j,D,k):j.projectionMatrix.copy(D.projectionMatrix),E===null&&e.isPerspectiveCamera&&(E={camera:e,fov:e.fov,zoom:e.zoom}),F(e,j,i)};function F(e,t,n){n===null?e.matrix.copy(t.matrixWorld):(e.matrix.copy(n.matrixWorld),e.matrix.invert(),e.matrix.multiply(t.matrixWorld)),e.matrix.decompose(e.position,e.quaternion,e.scale),e.updateMatrixWorld(!0),e.projectionMatrix.copy(t.projectionMatrix),e.projectionMatrixInverse.copy(t.projectionMatrixInverse),e.isPerspectiveCamera&&(e.fov=pt*2*Math.atan(1/e.projectionMatrix.elements[5]),e.zoom=1)}this.getCamera=function(){return j},this.getFoveation=function(){if(d!==null||f!==null)return s},this.setFoveation=function(e){s=e,d!==null&&(d.fixedFoveation=e),f!==null&&f.fixedFoveation!==void 0&&(f.fixedFoveation=e)},this.hasDepthSensing=function(){return h.texture!==null},this.getDepthSensingMesh=function(){return h.getMesh(j)},this.getCameraTexture=function(e){return g[e]};let le=null;function ue(t,i){if(l=i.getViewerPose(c||a),p=i,l!==null){let t=l.views;f!==null&&(e.setRenderTargetFramebuffer(b,f.framebuffer),e.setRenderTarget(b));let i=!1;t.length!==j.cameras.length&&(j.cameras.length=0,i=!0);for(let n=0;n<t.length;n++){let r=t[n],a=null;if(f!==null)a=f.getViewport(r);else{let t=u.getViewSubImage(d,r);a=t.viewport,n===0&&(e.setRenderTargetTextures(b,t.colorTexture,t.depthStencilTexture),e.setRenderTarget(b))}let o=A[n];o===void 0&&(o=new $o,o.layers.enable(n),o.viewport=new $t,A[n]=o),o.matrix.fromArray(r.transform.matrix),o.matrix.decompose(o.position,o.quaternion,o.scale),o.projectionMatrix.fromArray(r.projectionMatrix),o.projectionMatrixInverse.copy(o.projectionMatrix).invert(),o.viewport.set(a.x,a.y,a.width,a.height),n===0&&(j.matrix.copy(o.matrix),j.matrix.decompose(j.position,j.quaternion,j.scale)),i===!0&&j.cameras.push(o)}let a=r.enabledFeatures;if(a&&a.includes(`depth-sensing`)&&r.depthUsage==`gpu-optimized`&&m){u=n.getBinding();let e=u.getDepthInformation(t[0]);e&&e.isValid&&e.texture&&h.init(e,r.renderState)}if(a&&a.includes(`camera-access`)&&m){e.state.unbindTexture(),u=n.getBinding();for(let e=0;e<t.length;e++){let n=t[e].camera;if(n){let e=g[n];e||(e=new Mi,g[n]=e);let t=u.getCameraImage(n);e.sourceTexture=t}}}}for(let e=0;e<x.length;e++){let t=S[e],n=x[e];t!==null&&n!==void 0&&n.update(t,i,c||a)}le&&le(t,i),i.detectedPlanes&&n.dispatchEvent({type:`planesdetected`,data:i}),p=null}let de=new ws;de.setAnimationLoop(ue),this.setAnimationLoop=function(e){le=e},this.dispose=function(){}}},Pu=new an,Fu=new G;Fu.set(-1,0,0,0,1,0,0,0,1);function Iu(e,t){function n(e,t){e.matrixAutoUpdate===!0&&e.updateMatrix(),t.value.copy(e.matrix)}function r(t,n){n.color.getRGB(t.fogColor.value,fo(e)),n.isFog?(t.fogNear.value=n.near,t.fogFar.value=n.far):n.isFogExp2&&(t.fogDensity.value=n.density)}function i(e,t,n,r,i){t.isNodeMaterial?t.uniformsNeedUpdate=!1:t.isMeshBasicMaterial?a(e,t):t.isMeshLambertMaterial?(a(e,t),t.envMap&&(e.envMapIntensity.value=t.envMapIntensity)):t.isMeshToonMaterial?(a(e,t),d(e,t)):t.isMeshPhongMaterial?(a(e,t),u(e,t),t.envMap&&(e.envMapIntensity.value=t.envMapIntensity)):t.isMeshStandardMaterial?(a(e,t),f(e,t),t.isMeshPhysicalMaterial&&p(e,t,i)):t.isMeshMatcapMaterial?(a(e,t),m(e,t)):t.isMeshDepthMaterial?a(e,t):t.isMeshDistanceMaterial?(a(e,t),h(e,t)):t.isMeshNormalMaterial?a(e,t):t.isLineBasicMaterial?(o(e,t),t.isLineDashedMaterial&&s(e,t)):t.isPointsMaterial?c(e,t,n,r):t.isSpriteMaterial?l(e,t):t.isShadowMaterial?(e.color.value.copy(t.color),e.opacity.value=t.opacity):t.isShaderMaterial&&(t.uniformsNeedUpdate=!1)}function a(e,r){e.opacity.value=r.opacity,r.color&&e.diffuse.value.copy(r.color),r.emissive&&e.emissive.value.copy(r.emissive).multiplyScalar(r.emissiveIntensity),r.map&&(e.map.value=r.map,n(r.map,e.mapTransform)),r.alphaMap&&(e.alphaMap.value=r.alphaMap,n(r.alphaMap,e.alphaMapTransform)),r.bumpMap&&(e.bumpMap.value=r.bumpMap,n(r.bumpMap,e.bumpMapTransform),e.bumpScale.value=r.bumpScale,r.side===1&&(e.bumpScale.value*=-1)),r.normalMap&&(e.normalMap.value=r.normalMap,n(r.normalMap,e.normalMapTransform),e.normalScale.value.copy(r.normalScale),r.side===1&&e.normalScale.value.negate()),r.displacementMap&&(e.displacementMap.value=r.displacementMap,n(r.displacementMap,e.displacementMapTransform),e.displacementScale.value=r.displacementScale,e.displacementBias.value=r.displacementBias),r.emissiveMap&&(e.emissiveMap.value=r.emissiveMap,n(r.emissiveMap,e.emissiveMapTransform)),r.specularMap&&(e.specularMap.value=r.specularMap,n(r.specularMap,e.specularMapTransform)),r.alphaTest>0&&(e.alphaTest.value=r.alphaTest);let i=t.get(r),a=i.envMap,o=i.envMapRotation;a&&(e.envMap.value=a,e.envMapRotation.value.setFromMatrix4(Pu.makeRotationFromEuler(o)).transpose(),a.isCubeTexture&&a.isRenderTargetTexture===!1&&e.envMapRotation.value.premultiply(Fu),e.reflectivity.value=r.reflectivity,e.ior.value=r.ior,e.refractionRatio.value=r.refractionRatio),r.lightMap&&(e.lightMap.value=r.lightMap,e.lightMapIntensity.value=r.lightMapIntensity,n(r.lightMap,e.lightMapTransform)),r.aoMap&&(e.aoMap.value=r.aoMap,e.aoMapIntensity.value=r.aoMapIntensity,n(r.aoMap,e.aoMapTransform))}function o(e,t){e.diffuse.value.copy(t.color),e.opacity.value=t.opacity,t.map&&(e.map.value=t.map,n(t.map,e.mapTransform))}function s(e,t){e.dashSize.value=t.dashSize,e.totalSize.value=t.dashSize+t.gapSize,e.scale.value=t.scale}function c(e,t,r,i){e.diffuse.value.copy(t.color),e.opacity.value=t.opacity,e.size.value=t.size*r,e.scale.value=i*.5,t.map&&(e.map.value=t.map,n(t.map,e.uvTransform)),t.alphaMap&&(e.alphaMap.value=t.alphaMap,n(t.alphaMap,e.alphaMapTransform)),t.alphaTest>0&&(e.alphaTest.value=t.alphaTest)}function l(e,t){e.diffuse.value.copy(t.color),e.opacity.value=t.opacity,e.rotation.value=t.rotation,t.map&&(e.map.value=t.map,n(t.map,e.mapTransform)),t.alphaMap&&(e.alphaMap.value=t.alphaMap,n(t.alphaMap,e.alphaMapTransform)),t.alphaTest>0&&(e.alphaTest.value=t.alphaTest)}function u(e,t){e.specular.value.copy(t.specular),e.shininess.value=Math.max(t.shininess,1e-4)}function d(e,t){t.gradientMap&&(e.gradientMap.value=t.gradientMap)}function f(e,t){e.metalness.value=t.metalness,t.metalnessMap&&(e.metalnessMap.value=t.metalnessMap,n(t.metalnessMap,e.metalnessMapTransform)),e.roughness.value=t.roughness,t.roughnessMap&&(e.roughnessMap.value=t.roughnessMap,n(t.roughnessMap,e.roughnessMapTransform)),t.envMap&&(e.envMapIntensity.value=t.envMapIntensity)}function p(e,t,r){e.ior.value=t.ior,t.sheen>0&&(e.sheenColor.value.copy(t.sheenColor).multiplyScalar(t.sheen),e.sheenRoughness.value=t.sheenRoughness,t.sheenColorMap&&(e.sheenColorMap.value=t.sheenColorMap,n(t.sheenColorMap,e.sheenColorMapTransform)),t.sheenRoughnessMap&&(e.sheenRoughnessMap.value=t.sheenRoughnessMap,n(t.sheenRoughnessMap,e.sheenRoughnessMapTransform))),t.clearcoat>0&&(e.clearcoat.value=t.clearcoat,e.clearcoatRoughness.value=t.clearcoatRoughness,t.clearcoatMap&&(e.clearcoatMap.value=t.clearcoatMap,n(t.clearcoatMap,e.clearcoatMapTransform)),t.clearcoatRoughnessMap&&(e.clearcoatRoughnessMap.value=t.clearcoatRoughnessMap,n(t.clearcoatRoughnessMap,e.clearcoatRoughnessMapTransform)),t.clearcoatNormalMap&&(e.clearcoatNormalMap.value=t.clearcoatNormalMap,n(t.clearcoatNormalMap,e.clearcoatNormalMapTransform),e.clearcoatNormalScale.value.copy(t.clearcoatNormalScale),t.side===1&&e.clearcoatNormalScale.value.negate())),t.dispersion>0&&(e.dispersion.value=t.dispersion),t.retroreflectivity>0&&(e.retroreflectivity.value=t.retroreflectivity),t.iridescence>0&&(e.iridescence.value=t.iridescence,e.iridescenceIOR.value=t.iridescenceIOR,e.iridescenceThicknessMinimum.value=t.iridescenceThicknessRange[0],e.iridescenceThicknessMaximum.value=t.iridescenceThicknessRange[1],t.iridescenceMap&&(e.iridescenceMap.value=t.iridescenceMap,n(t.iridescenceMap,e.iridescenceMapTransform)),t.iridescenceThicknessMap&&(e.iridescenceThicknessMap.value=t.iridescenceThicknessMap,n(t.iridescenceThicknessMap,e.iridescenceThicknessMapTransform))),t.transmission>0&&(e.transmission.value=t.transmission,e.transmissionSamplerMap.value=r.texture,e.transmissionSamplerSize.value.set(r.width,r.height),t.transmissionMap&&(e.transmissionMap.value=t.transmissionMap,n(t.transmissionMap,e.transmissionMapTransform)),e.thickness.value=t.thickness,t.thicknessMap&&(e.thicknessMap.value=t.thicknessMap,n(t.thicknessMap,e.thicknessMapTransform)),e.attenuationDistance.value=t.attenuationDistance,e.attenuationColor.value.copy(t.attenuationColor)),t.anisotropy>0&&(e.anisotropyVector.value.set(t.anisotropy*Math.cos(t.anisotropyRotation),t.anisotropy*Math.sin(t.anisotropyRotation)),t.anisotropyMap&&(e.anisotropyMap.value=t.anisotropyMap,n(t.anisotropyMap,e.anisotropyMapTransform))),e.specularIntensity.value=t.specularIntensity,e.specularColor.value.copy(t.specularColor),t.specularColorMap&&(e.specularColorMap.value=t.specularColorMap,n(t.specularColorMap,e.specularColorMapTransform)),t.specularIntensityMap&&(e.specularIntensityMap.value=t.specularIntensityMap,n(t.specularIntensityMap,e.specularIntensityMapTransform))}function m(e,t){t.matcap&&(e.matcap.value=t.matcap)}function h(e,n){let r=t.get(n).light;e.referencePosition.value.setFromMatrixPosition(r.matrixWorld),e.nearDistance.value=r.shadow.camera.near,e.farDistance.value=r.shadow.camera.far}return{refreshFogUniforms:r,refreshMaterialUniforms:i}}function Lu(e,t,n,r){let i={},a={},o=[],s=e.getParameter(e.MAX_UNIFORM_BUFFER_BINDINGS);function c(e,t){let n=t.program;r.uniformBlockBinding(e,n)}function l(e,n){let o=i[e.id];o===void 0&&(g(e),o=u(e),i[e.id]=o,e.addEventListener(`dispose`,v));let s=n.program;r.updateUBOMapping(e,s);let c=t.render.frame;a[e.id]!==c&&(f(e),a[e.id]=c)}function u(t){let n=d();t.__bindingPointIndex=n;let r=e.createBuffer(),i=t.__size,a=t.usage;return e.bindBuffer(e.UNIFORM_BUFFER,r),e.bufferData(e.UNIFORM_BUFFER,i,a),e.bindBuffer(e.UNIFORM_BUFFER,null),e.bindBufferBase(e.UNIFORM_BUFFER,n,r),r}function d(){for(let e=0;e<s;e++)if(o.indexOf(e)===-1)return o.push(e),e;return B(`WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached.`),0}function f(t){let n=i[t.id],r=t.uniforms,a=t.__cache;e.bindBuffer(e.UNIFORM_BUFFER,n);for(let e=0,t=r.length;e<t;e++){let t=r[e];if(Array.isArray(t))for(let n=0,r=t.length;n<r;n++)p(t[n],e,n,a);else p(t,e,0,a)}e.bindBuffer(e.UNIFORM_BUFFER,null)}function p(t,n,r,i){if(h(t,n,r,i)===!0){let n=t.__offset,r=t.value;if(Array.isArray(r)){let e=0;for(let n=0;n<r.length;n++){let i=r[n],a=_(i);m(i,t.__data,e),typeof i!=`number`&&typeof i!=`boolean`&&!i.isMatrix3&&!ArrayBuffer.isView(i)&&(e+=a.storage/Float32Array.BYTES_PER_ELEMENT)}}else m(r,t.__data,0);e.bufferSubData(e.UNIFORM_BUFFER,n,t.__data)}}function m(e,t,n){typeof e==`number`||typeof e==`boolean`?t[0]=e:e.isMatrix3?(t[0]=e.elements[0],t[1]=e.elements[1],t[2]=e.elements[2],t[3]=0,t[4]=e.elements[3],t[5]=e.elements[4],t[6]=e.elements[5],t[7]=0,t[8]=e.elements[6],t[9]=e.elements[7],t[10]=e.elements[8],t[11]=0):ArrayBuffer.isView(e)?t.set(new e.constructor(e.buffer,e.byteOffset,t.length)):e.toArray(t,n)}function h(e,t,n,r){let i=e.value,a=t+`_`+n;if(r[a]===void 0)return r[a]=typeof i==`number`||typeof i==`boolean`?i:ArrayBuffer.isView(i)?i.slice():i.clone(),!0;{let e=r[a];if(typeof i==`number`||typeof i==`boolean`){if(e!==i)return r[a]=i,!0}else if(ArrayBuffer.isView(i))return!0;else if(e.equals(i)===!1)return e.copy(i),!0}return!1}function g(e){let t=e.uniforms,n=0;for(let e=0,r=t.length;e<r;e++){let r=Array.isArray(t[e])?t[e]:[t[e]];for(let e=0,t=r.length;e<t;e++){let t=r[e],i=Array.isArray(t.value)?t.value:[t.value];for(let e=0,r=i.length;e<r;e++){let r=i[e],a=_(r),o=n%16,s=o%a.boundary,c=o+s;n+=s,c!==0&&16-c<a.storage&&(n+=16-c),t.__data=new Float32Array(a.storage/Float32Array.BYTES_PER_ELEMENT),t.__offset=n,n+=a.storage}}}let r=n%16;return r>0&&(n+=16-r),e.__size=n,e.__cache={},this}function _(e){let t={boundary:0,storage:0};return typeof e==`number`||typeof e==`boolean`?(t.boundary=4,t.storage=4):e.isVector2?(t.boundary=8,t.storage=8):e.isVector3||e.isColor?(t.boundary=16,t.storage=12):e.isVector4?(t.boundary=16,t.storage=16):e.isMatrix3?(t.boundary=48,t.storage=48):e.isMatrix4?(t.boundary=64,t.storage=64):e.isTexture?z(`WebGLRenderer: Texture samplers can not be part of an uniforms group.`):ArrayBuffer.isView(e)?(t.boundary=16,t.storage=e.byteLength):z(`WebGLRenderer: Unsupported uniform value type.`,e),t}function v(t){let n=t.target;n.removeEventListener(`dispose`,v);let r=o.indexOf(n.__bindingPointIndex);o.splice(r,1),e.deleteBuffer(i[n.id]),delete i[n.id],delete a[n.id]}function y(){for(let t in i)e.deleteBuffer(i[t]);o=[],i={},a={}}return{bind:c,update:l,dispose:y}}var Ru=new Uint16Array([12469,15057,12620,14925,13266,14620,13807,14376,14323,13990,14545,13625,14713,13328,14840,12882,14931,12528,14996,12233,15039,11829,15066,11525,15080,11295,15085,10976,15082,10705,15073,10495,13880,14564,13898,14542,13977,14430,14158,14124,14393,13732,14556,13410,14702,12996,14814,12596,14891,12291,14937,11834,14957,11489,14958,11194,14943,10803,14921,10506,14893,10278,14858,9960,14484,14039,14487,14025,14499,13941,14524,13740,14574,13468,14654,13106,14743,12678,14818,12344,14867,11893,14889,11509,14893,11180,14881,10751,14852,10428,14812,10128,14765,9754,14712,9466,14764,13480,14764,13475,14766,13440,14766,13347,14769,13070,14786,12713,14816,12387,14844,11957,14860,11549,14868,11215,14855,10751,14825,10403,14782,10044,14729,9651,14666,9352,14599,9029,14967,12835,14966,12831,14963,12804,14954,12723,14936,12564,14917,12347,14900,11958,14886,11569,14878,11247,14859,10765,14828,10401,14784,10011,14727,9600,14660,9289,14586,8893,14508,8533,15111,12234,15110,12234,15104,12216,15092,12156,15067,12010,15028,11776,14981,11500,14942,11205,14902,10752,14861,10393,14812,9991,14752,9570,14682,9252,14603,8808,14519,8445,14431,8145,15209,11449,15208,11451,15202,11451,15190,11438,15163,11384,15117,11274,15055,10979,14994,10648,14932,10343,14871,9936,14803,9532,14729,9218,14645,8742,14556,8381,14461,8020,14365,7603,15273,10603,15272,10607,15267,10619,15256,10631,15231,10614,15182,10535,15118,10389,15042,10167,14963,9787,14883,9447,14800,9115,14710,8665,14615,8318,14514,7911,14411,7507,14279,7198,15314,9675,15313,9683,15309,9712,15298,9759,15277,9797,15229,9773,15166,9668,15084,9487,14995,9274,14898,8910,14800,8539,14697,8234,14590,7790,14479,7409,14367,7067,14178,6621,15337,8619,15337,8631,15333,8677,15325,8769,15305,8871,15264,8940,15202,8909,15119,8775,15022,8565,14916,8328,14804,8009,14688,7614,14569,7287,14448,6888,14321,6483,14088,6171,15350,7402,15350,7419,15347,7480,15340,7613,15322,7804,15287,7973,15229,8057,15148,8012,15046,7846,14933,7611,14810,7357,14682,7069,14552,6656,14421,6316,14251,5948,14007,5528,15356,5942,15356,5977,15353,6119,15348,6294,15332,6551,15302,6824,15249,7044,15171,7122,15070,7050,14949,6861,14818,6611,14679,6349,14538,6067,14398,5651,14189,5311,13935,4958,15359,4123,15359,4153,15356,4296,15353,4646,15338,5160,15311,5508,15263,5829,15188,6042,15088,6094,14966,6001,14826,5796,14678,5543,14527,5287,14377,4985,14133,4586,13869,4257,15360,1563,15360,1642,15358,2076,15354,2636,15341,3350,15317,4019,15273,4429,15203,4732,15105,4911,14981,4932,14836,4818,14679,4621,14517,4386,14359,4156,14083,3795,13808,3437,15360,122,15360,137,15358,285,15355,636,15344,1274,15322,2177,15281,2765,15215,3223,15120,3451,14995,3569,14846,3567,14681,3466,14511,3305,14344,3121,14037,2800,13753,2467,15360,0,15360,1,15359,21,15355,89,15346,253,15325,479,15287,796,15225,1148,15133,1492,15008,1749,14856,1882,14685,1886,14506,1783,14324,1608,13996,1398,13702,1183]),zu=null;function Bu(){return zu===null&&(zu=new si(Ru,16,16,re,T),zu.name=`DFG_LUT`,zu.minFilter=h,zu.magFilter=h,zu.wrapS=u,zu.wrapT=u,zu.generateMipmaps=!1,zu.needsUpdate=!0),zu}var Vu=class{constructor(e={}){let{canvas:t=nt(),context:n=null,depth:r=!0,stencil:i=!1,alpha:a=!1,antialias:o=!1,premultipliedAlpha:s=!0,preserveDrawingBuffer:c=!1,powerPreference:l=`default`,failIfMajorPerformanceCaveat:u=!1,reversedDepthBuffer:d=!1,outputBufferType:f=v}=e;this.isWebGLRenderer=!0;let p;if(n!==null){if(typeof WebGLRenderingContext<`u`&&n instanceof WebGLRenderingContext)throw Error(`THREE.WebGLRenderer: WebGL 1 is not supported since r163.`);p=n.getContextAttributes().alpha}else p=a;let m=f,h=new Set([ae,ie,ne]),g=new Set([v,C,x,O,E,D]),y=new Uint32Array(4),b=new Int32Array(4),S=new W,w=null,k=null,A=[],j=[],M=null;this.domElement=t,this.debug={checkShaderErrors:!0,diagnostics:{keywords:!1},onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=0,this.toneMappingExposure=1,this.transmissionResolutionScale=1;let N=this,ee=!1,P=null,te=null,re=null,oe=null;this._outputColorSpace=Ke;let se=0,ce=0,F=null,le=-1,ue=null,de=new $t,fe=new $t,pe=null,me=new q(0),he=0,ge=t.width,_e=t.height,ve=1,ye=null,be=null,xe=new $t(0,0,ge,_e),Se=new $t(0,0,ge,_e),Ce=!1,we=new bi,Te=!1,Ee=!1,De=new an,Oe=new W,ke=new $t,Ae={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0},je=!1;function Me(){return F===null?ve:1}let I=n;function Ne(e,n){return t.getContext(e,n)}let Pe,Fe,L,Ie,R,Le,Re,ze,Be,Ve,He,Ue,We,Ge,qe,Je,Ye,Xe,Ze,$e,et,tt,rt;try{let e={alpha:!0,depth:r,stencil:i,antialias:o,premultipliedAlpha:s,preserveDrawingBuffer:c,powerPreference:l,failIfMajorPerformanceCaveat:u};if(`setAttribute`in t&&t.setAttribute(`data-engine`,`three.js r186`),t.addEventListener(`webglcontextlost`,ct,!1),t.addEventListener(`webglcontextrestored`,lt,!1),t.addEventListener(`webglcontextcreationerror`,ut,!1),I===null){let t=`webgl2`;if(I=Ne(t,e),I===null)throw Ne(t)?Error(`THREE.WebGLRenderer: Error creating WebGL context with your selected attributes.`):Error(`THREE.WebGLRenderer: Error creating WebGL context.`)}at()}catch(e){throw t.removeEventListener(`webglcontextlost`,ct,!1),t.removeEventListener(`webglcontextrestored`,lt,!1),t.removeEventListener(`webglcontextcreationerror`,ut,!1),B(`WebGLRenderer: `+e.message),e}function at(){Pe=new ac(I),Pe.init(),et=new ku(I,Pe),Fe=new Ps(I,Pe,e,et),L=new Du(I,Pe),Fe.reversedDepthBuffer&&d&&L.buffers.depth.setReversed(!0),te=I.createFramebuffer(),re=I.createFramebuffer(),oe=I.createFramebuffer(),Ie=new cc(I),R=new su,Le=new Ou(I,Pe,L,R,Fe,et,Ie),Re=new ic(N),ze=new Ts(I),tt=new Ms(I,ze),Be=new oc(I,ze,Ie,tt),Ve=new uc(I,Be,ze,tt,Ie),Xe=new lc(I,Fe,Le),qe=new Fs(R),He=new ou(N,Re,Pe,Fe,tt,qe),Ue=new Iu(N,R),We=new du,Ge=new vu(Pe),Ye=new js(N,Re,L,Ve,p,s),Je=new Eu(N,Ve,Fe),rt=new Lu(I,Ie,Fe,L),Ze=new Ns(I,Pe,Ie),$e=new sc(I,Pe,Ie),Ie.programs=He.programs,N.capabilities=Fe,N.extensions=Pe,N.properties=R,N.renderLists=We,N.shadowMap=Je,N.state=L,N.info=Ie}m!==1009&&(M=new fc(m,t.width,t.height,o,r,i));let ot=new Nu(N,I);this.xr=ot,this.getContext=function(){return I},this.getContextAttributes=function(){return I.getContextAttributes()},this.forceContextLoss=function(){let e=Pe.get(`WEBGL_lose_context`);e&&e.loseContext()},this.forceContextRestore=function(){let e=Pe.get(`WEBGL_lose_context`);e&&e.restoreContext()},this.getPixelRatio=function(){return ve},this.setPixelRatio=function(e){e!==void 0&&(ve=e,this.setSize(ge,_e,!1))},this.getSize=function(e){return e.set(ge,_e)},this.setSize=function(e,n,r=!0){ot.isPresenting?z(`WebGLRenderer: Can't change size while VR device is presenting.`):(ge=e,_e=n,t.width=Math.floor(e*ve),t.height=Math.floor(n*ve),r===!0&&(t.style.width=e+`px`,t.style.height=n+`px`),M!==null&&M.setSize(t.width,t.height),this.setViewport(0,0,e,n))},this.getDrawingBufferSize=function(e){return e.set(ge*ve,_e*ve).floor()},this.setDrawingBufferSize=function(e,n,r){ge=e,_e=n,ve=r,t.width=Math.floor(e*r),t.height=Math.floor(n*r),this.setViewport(0,0,e,n)},this.setEffects=function(e){if(m===1009)B(`WebGLRenderer: setEffects() requires outputBufferType set to HalfFloatType or FloatType.`);else{if(e){for(let t=0;t<e.length;t++)if(e[t].isOutputPass===!0){z(`WebGLRenderer: OutputPass is not needed in setEffects(). Tone mapping and color space conversion are applied automatically.`);break}}M.setEffects(e||[])}},this.getCurrentViewport=function(e){return e.copy(de)},this.getViewport=function(e){return e.copy(xe)},this.setViewport=function(e,t,n,r){e.isVector4?xe.set(e.x,e.y,e.z,e.w):xe.set(e,t,n,r),L.viewport(de.copy(xe).multiplyScalar(ve).round())},this.getScissor=function(e){return e.copy(Se)},this.setScissor=function(e,t,n,r){e.isVector4?Se.set(e.x,e.y,e.z,e.w):Se.set(e,t,n,r),L.scissor(fe.copy(Se).multiplyScalar(ve).round())},this.getScissorTest=function(){return Ce},this.setScissorTest=function(e){L.setScissorTest(Ce=e)},this.setOpaqueSort=function(e){ye=e},this.setTransparentSort=function(e){be=e},this.getClearColor=function(e){return e.copy(Ye.getClearColor())},this.setClearColor=function(){Ye.setClearColor(...arguments)},this.getClearAlpha=function(){return Ye.getClearAlpha()},this.setClearAlpha=function(){Ye.setClearAlpha(...arguments)},this.clear=function(e=!0,t=!0,n=!0){let r=0;if(e){let e=!1;if(F!==null){let t=F.texture.format;e=h.has(t)}if(e){let e=F.texture.type,t=g.has(e),n=Ye.getClearColor(),r=Ye.getClearAlpha(),i=n.r,a=n.g,o=n.b;t?(y[0]=i,y[1]=a,y[2]=o,y[3]=r,I.clearBufferuiv(I.COLOR,0,y)):(b[0]=i,b[1]=a,b[2]=o,b[3]=r,I.clearBufferiv(I.COLOR,0,b))}else r|=I.COLOR_BUFFER_BIT}t&&(r|=I.DEPTH_BUFFER_BIT,this.state.buffers.depth.setMask(!0)),n&&(r|=I.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),r!==0&&I.clear(r)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.setNodesHandler=function(e){e.setRenderer(this),P=e},this.dispose=function(){t.removeEventListener(`webglcontextlost`,ct,!1),t.removeEventListener(`webglcontextrestored`,lt,!1),t.removeEventListener(`webglcontextcreationerror`,ut,!1),Ye.dispose(),We.dispose(),Ge.dispose(),R.dispose(),Re.dispose(),Ve.dispose(),tt.dispose(),rt.dispose(),He.dispose(),ot.dispose(),ot.removeEventListener(`sessionstart`,gt),ot.removeEventListener(`sessionend`,_t),vt.stop()};function ct(e){e.preventDefault(),it(`WebGLRenderer: Context Lost.`),ee=!0}function lt(){it(`WebGLRenderer: Context Restored.`),ee=!1;let e=Ie.autoReset,t=Je.enabled,n=Je.autoUpdate,r=Je.needsUpdate,i=Je.type;at(),Ie.autoReset=e,Je.enabled=t,Je.autoUpdate=n,Je.needsUpdate=r,Je.type=i}function ut(e){B(`WebGLRenderer: A WebGL context could not be created. Reason: `,e.statusMessage)}function dt(e){let t=e.target;t.removeEventListener(`dispose`,dt),ft(t)}function ft(e){pt(e),R.remove(e)}function pt(e){let t=R.get(e).programs;t!==void 0&&(t.forEach(function(e){He.releaseProgram(e)}),e.isShaderMaterial&&He.releaseShaderCache(e))}this.renderBufferDirect=function(e,t,n,r,i,a){t===null&&(t=Ae);let o=i.isMesh&&i.matrixWorld.determinantAffine()<0,s=Ot(e,t,n,r,i);L.setMaterial(r,o);let c=n.index,l=1;if(r.wireframe===!0){if(c=Be.getWireframeAttribute(n),c===void 0)return;l=2}let u=n.drawRange,d=n.attributes.position,f=u.start*l,p=(u.start+u.count)*l;a!==null&&(f=Math.max(f,a.start*l),p=Math.min(p,(a.start+a.count)*l)),c===null?d!=null&&(f=Math.max(f,0),p=Math.min(p,d.count)):(f=Math.max(f,0),p=Math.min(p,c.count));let m=p-f;if(m<0||m===1/0)return;tt.setup(i,r,s,n,c);let h,g=Ze;if(c!==null&&(h=ze.get(c),g=$e,g.setIndex(h)),i.isMesh)r.wireframe===!0?(L.setLineWidth(r.wireframeLinewidth*Me()),g.setMode(I.LINES)):g.setMode(I.TRIANGLES);else if(i.isLine){let e=r.linewidth;e===void 0&&(e=1),L.setLineWidth(e*Me()),i.isLineSegments?g.setMode(I.LINES):i.isLineLoop?g.setMode(I.LINE_LOOP):g.setMode(I.LINE_STRIP)}else i.isPoints?g.setMode(I.POINTS):i.isSprite&&g.setMode(I.TRIANGLES);if(i.isBatchedMesh){if(Pe.get(`WEBGL_multi_draw`))g.renderMultiDraw(i._multiDrawStarts,i._multiDrawCounts,i._multiDrawCount);else{let e=i._multiDrawStarts,t=i._multiDrawCounts,n=i._multiDrawCount,a=c?ze.get(c).bytesPerElement:1,o=R.get(r).currentProgram.getUniforms();for(let r=0;r<n;r++)o.setValue(I,`_gl_DrawID`,r),g.render(e[r]/a,t[r])}}else if(i.isInstancedMesh)g.renderInstances(f,m,i.count);else if(n.isInstancedBufferGeometry){let e=n._maxInstanceCount===void 0?1/0:n._maxInstanceCount,t=Math.min(n.instanceCount,e);g.renderInstances(f,m,t)}else g.render(f,m)};function mt(e,t,n,r){P!==null&&e.isNodeMaterial&&P.setObject(r,e),Te===!0&&qe.setState(e,n,!1),e.transparent===!0&&e.side===2&&e.forceSinglePass===!1?(e.side=1,e.needsUpdate=!0,wt(e,t,r),e.side=0,e.needsUpdate=!0,wt(e,t,r),e.side=2):wt(e,t,r)}this.compile=function(e,t,n=null){n===null&&(n=e),P!==null&&P.renderStart(e,t,n),k=Ge.get(n),k.init(t),j.push(k),n.traverseVisible(function(e){e.isLight&&e.layers.test(t.layers)&&(k.pushLight(e),e.castShadow&&k.pushShadow(e))}),e!==n&&e.traverseVisible(function(e){e.isLight&&e.layers.test(t.layers)&&(k.pushLight(e),e.castShadow&&k.pushShadow(e))}),k.setupLights(),P!==null&&P.updateLights(k.state.lightsArray),Ee=this.localClippingEnabled,Te=qe.init(this.clippingPlanes,Ee),Te===!0&&qe.setGlobalState(this.clippingPlanes,t),P!==null&&Je.render(k.state.shadowsArray,n,t);let r=new Set;return e.traverse(function(e){if(!(e.isMesh||e.isPoints||e.isLine||e.isSprite))return;let i=e.material;if(i){if(Array.isArray(i))for(let a=0;a<i.length;a++){let o=i[a];mt(o,n,t,e),r.add(o)}else mt(i,n,t,e),r.add(i)}}),k=j.pop(),P!==null&&P.renderEnd(),r},this.compileAsync=function(e,t,n=null){let r=this.compile(e,t,n);return new Promise(t=>{function n(){r.forEach(function(e){let t=R.get(e).currentProgram;(t===void 0||t.isReady())&&r.delete(e)}),r.size===0?t(e):setTimeout(n,10)}Pe.get(`KHR_parallel_shader_compile`)===null?setTimeout(n,10):n()})};let V=null;function ht(e){V&&V(e)}function gt(){vt.stop()}function _t(){vt.start()}let vt=new ws;vt.setAnimationLoop(ht),typeof self<`u`&&vt.setContext(self),this.setAnimationLoop=function(e){V=e,ot.setAnimationLoop(e),e===null?vt.stop():vt.start()},ot.addEventListener(`sessionstart`,gt),ot.addEventListener(`sessionend`,_t),this.render=function(e,t){if(t!==void 0&&t.isCamera!==!0){B(`WebGLRenderer.render: camera is not an instance of THREE.Camera.`);return}if(ee===!0)return;P!==null&&P.renderStart(e,t);let n=ot.enabled===!0&&ot.isPresenting===!0,r=M!==null&&(F===null||n)&&M.begin(N,F);if(e.matrixWorldAutoUpdate===!0&&e.updateMatrixWorld(),t.parent===null&&t.matrixWorldAutoUpdate===!0&&t.updateMatrixWorld(),ot.enabled===!0&&ot.isPresenting===!0&&(M===null||M.isCompositing()===!1)&&(ot.cameraAutoUpdate===!0&&ot.updateCamera(t),t=ot.getCamera()),e.isScene===!0&&e.onBeforeRender(N,e,t,F),k=Ge.get(e,j.length),k.init(t),k.state.textureUnits=Le.getTextureUnits(),j.push(k),De.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),we.setFromProjectionMatrix(De,Qe,t.reversedDepth),Ee=this.localClippingEnabled,Te=qe.init(this.clippingPlanes,Ee),w=We.get(e,A.length),w.init(),A.push(w),ot.enabled===!0&&ot.isPresenting===!0){let e=N.xr.getDepthSensingMesh();e!==null&&yt(e,t,-1/0,N.sortObjects)}yt(e,t,0,N.sortObjects),w.finish(),P!==null&&P.updateLights(k.state.lightsArray),N.sortObjects===!0&&w.sort(ye,be),je=ot.enabled===!1||ot.isPresenting===!1||ot.hasDepthSensing()===!1,je&&Ye.addToRenderList(w,e),this.info.render.frame++,this.info.autoReset===!0&&this.info.reset(),Te===!0&&qe.beginShadows();let i=k.state.shadowsArray;if(Je.render(i,e,t),Te===!0&&qe.endShadows(),(r&&M.hasRenderPass())===!1){let n=w.opaque,r=w.transmissive;if(k.setupLights(),t.isArrayCamera){let i=t.cameras;if(r.length>0)for(let t=0,a=i.length;t<a;t++){let a=i[t];xt(n,r,e,a)}je&&Ye.render(e);for(let t=0,n=i.length;t<n;t++){let n=i[t];bt(w,e,n,n.viewport)}}else r.length>0&&xt(n,r,e,t),je&&Ye.render(e),bt(w,e,t)}F!==null&&ce===0&&(Le.updateMultisampleRenderTarget(F),Le.updateRenderTargetMipmap(F)),r&&M.end(N),e.isScene===!0&&e.onAfterRender(N,e,t),tt.resetDefaultState(),le=-1,ue=null,j.pop(),j.length>0?(k=j[j.length-1],Le.setTextureUnits(k.state.textureUnits),Te===!0&&qe.setGlobalState(N.clippingPlanes,k.state.camera)):k=null,A.pop(),w=A.length>0?A[A.length-1]:null,P!==null&&P.renderEnd()};function yt(e,t,n,r){if(e.visible===!1)return;if(e.layers.test(t.layers)){if(e.isGroup)n=e.renderOrder;else if(e.isLOD)e.autoUpdate===!0&&e.update(t);else if(e.isLightProbeGrid)k.pushLightProbeGrid(e);else if(e.isLight)k.pushLight(e),e.castShadow&&k.pushShadow(e);else if(e.isSprite){if(!e.frustumCulled||e.intersectsFrustum(we)){r&&ke.setFromMatrixPosition(e.matrixWorld).applyMatrix4(De);let i=Ve.update(e),a=e.material;a.visible&&w.push(e,i,a,n,ke.z,null,t)}}else if((e.isMesh||e.isLine||e.isPoints)&&(!e.frustumCulled||e.intersectsFrustum(we))){let i=Ve.update(e),a=e.material;if(r&&(e.boundingSphere===void 0?(i.boundingSphere===null&&i.computeBoundingSphere(),ke.copy(i.boundingSphere.center)):(e.boundingSphere===null&&e.computeBoundingSphere(),ke.copy(e.boundingSphere.center)),ke.applyMatrix4(e.matrixWorld).applyMatrix4(De)),Array.isArray(a)){let r=i.groups;for(let o=0,s=r.length;o<s;o++){let s=r[o],c=a[s.materialIndex];c&&c.visible&&w.push(e,i,c,n,ke.z,s,t)}}else a.visible&&w.push(e,i,a,n,ke.z,null,t)}}let i=e.children;for(let e=0,a=i.length;e<a;e++)yt(i[e],t,n,r)}function bt(e,t,n,r){let{opaque:i,transmissive:a,transparent:o}=e;k.setupLightsView(n),Te===!0&&qe.setGlobalState(N.clippingPlanes,n),r&&L.viewport(de.copy(r)),i.length>0&&St(i,t,n),a.length>0&&St(a,t,n),o.length>0&&St(o,t,n),L.buffers.depth.setTest(!0),L.buffers.depth.setMask(!0),L.buffers.color.setMask(!0),L.setPolygonOffset(!1)}function xt(e,t,n,r){if((n.isScene===!0?n.overrideMaterial:null)!==null)return;if(k.state.transmissionRenderTarget[r.id]===void 0){let e=Pe.has(`EXT_color_buffer_half_float`)||Pe.has(`EXT_color_buffer_float`);k.state.transmissionRenderTarget[r.id]=new tn(1,1,{generateMipmaps:!0,type:e?T:v,minFilter:_,samples:Math.max(4,Fe.samples),stencilBuffer:i,resolveDepthBuffer:!1,resolveStencilBuffer:!1,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,colorSpace:Ht.workingColorSpace})}let a=k.state.transmissionRenderTarget[r.id],o=r.viewport||de;a.setSize(o.z*N.transmissionResolutionScale,o.w*N.transmissionResolutionScale);let s=N.getRenderTarget(),c=N.getActiveCubeFace(),l=N.getActiveMipmapLevel();N.setRenderTarget(a),N.getClearColor(me),he=N.getClearAlpha(),he<1&&N.setClearColor(16777215,.5),N.clear(),je&&Ye.render(n);let u=N.toneMapping;N.toneMapping=0;let d=r.viewport;if(r.viewport!==void 0&&(r.viewport=void 0),k.setupLightsView(r),Te===!0&&qe.setGlobalState(N.clippingPlanes,r),St(e,n,r),Le.updateMultisampleRenderTarget(a),Le.updateRenderTargetMipmap(a),Pe.has(`WEBGL_multisampled_render_to_texture`)===!1){let e=!1;for(let i=0,a=t.length;i<a;i++){let{object:a,geometry:o,material:s,group:c}=t[i];if(s.side===2&&a.layers.test(r.layers)){let t=s.side;s.side=1,s.needsUpdate=!0,Ct(a,n,r,o,s,c),s.side=t,s.needsUpdate=!0,e=!0}}e===!0&&(Le.updateMultisampleRenderTarget(a),Le.updateRenderTargetMipmap(a))}N.setRenderTarget(s,c,l),N.setClearColor(me,he),d!==void 0&&(r.viewport=d),N.toneMapping=u}function St(e,t,n){let r=t.isScene===!0?t.overrideMaterial:null;for(let i=0,a=e.length;i<a;i++){let a=e[i],{object:o,geometry:s,group:c}=a,l=a.material;l.allowOverride===!0&&r!==null&&(l=r),o.layers.test(n.layers)&&Ct(o,t,n,s,l,c)}}function Ct(e,t,n,r,i,a){P!==null&&i.isNodeMaterial&&P.setObject(e,i),e.onBeforeRender(N,t,n,r,i,a),e.modelViewMatrix.multiplyMatrices(n.matrixWorldInverse,e.matrixWorld),e.normalMatrix.getNormalMatrix(e.modelViewMatrix),i.onBeforeRender(N,t,n,r,e,a),i.transparent===!0&&i.side===2&&i.forceSinglePass===!1?(i.side=1,i.needsUpdate=!0,N.renderBufferDirect(n,t,r,i,e,a),i.side=0,i.needsUpdate=!0,N.renderBufferDirect(n,t,r,i,e,a),i.side=2):N.renderBufferDirect(n,t,r,i,e,a),e.onAfterRender(N,t,n,r,i,a)}function wt(e,t,n){t.isScene!==!0&&(t=Ae);let r=R.get(e),i=k.state.lights,a=k.state.shadowsArray,o=i.state.version,s=He.getParameters(e,i.state,a,t,n,k.state.lightProbeGridArray),c=He.getProgramCacheKey(s),l=r.programs;r.environment=e.isMeshStandardMaterial||e.isMeshLambertMaterial||e.isMeshPhongMaterial?t.environment:null,r.fog=t.fog;let u=e.isMeshStandardMaterial||e.isMeshLambertMaterial&&!e.envMap||e.isMeshPhongMaterial&&!e.envMap;r.envMap=Re.get(e.envMap||r.environment,u),r.envMapRotation=r.environment!==null&&e.envMap===null?t.environmentRotation:e.envMapRotation,l===void 0&&(e.addEventListener(`dispose`,dt),l=new Map,r.programs=l);let d=l.get(c);if(d!==void 0){if(r.currentProgram===d&&r.lightsStateVersion===o)return Et(e,s),d}else s.uniforms=He.getUniforms(e),P!==null&&e.isNodeMaterial&&P.build(e,n,s),e.onBeforeCompile(s,N),d=He.acquireProgram(s,c),l.set(c,d),r.uniforms=s.uniforms;let f=r.uniforms;return(!e.isShaderMaterial&&!e.isRawShaderMaterial||e.clipping===!0)&&(f.clippingPlanes=qe.uniform),Et(e,s),r.needsLights=At(e),r.lightsStateVersion=o,r.needsLights&&(f.ambientLightColor.value=i.state.ambient,f.lightProbe.value=i.state.probe,f.sunLights.value=i.state.sun,f.sunLightShadows.value=i.state.sunShadow,f.directionalLights.value=i.state.directional,f.directionalLightShadows.value=i.state.directionalShadow,f.spotLights.value=i.state.spot,f.spotLightShadows.value=i.state.spotShadow,f.rectAreaLights.value=i.state.rectArea,f.ltc_1.value=i.state.rectAreaLTC1,f.ltc_2.value=i.state.rectAreaLTC2,f.pointLights.value=i.state.point,f.pointLightShadows.value=i.state.pointShadow,f.hemisphereLights.value=i.state.hemi,f.sunShadowMatrix.value=i.state.sunShadowMatrix,f.sunShadowCascade.value=i.state.sunShadowCascade,f.directionalShadowMatrix.value=i.state.directionalShadowMatrix,f.spotLightMatrix.value=i.state.spotLightMatrix,f.spotLightMap.value=i.state.spotLightMap,f.pointShadowMatrix.value=i.state.pointShadowMatrix),r.lightProbeGrid=k.state.lightProbeGridArray.length>0,r.currentProgram=d,r.uniformsList=null,d}function Tt(e){if(e.uniformsList===null){let t=e.currentProgram.getUniforms();e.uniformsList=yl.seqWithValue(t.seq,e.uniforms)}return e.uniformsList}function Et(e,t){let n=R.get(e);n.outputColorSpace=t.outputColorSpace,n.batching=t.batching,n.batchingColor=t.batchingColor,n.instancing=t.instancing,n.instancingColor=t.instancingColor,n.instancingMorph=t.instancingMorph,n.skinning=t.skinning,n.morphTargets=t.morphTargets,n.morphNormals=t.morphNormals,n.morphColors=t.morphColors,n.morphTargetsCount=t.morphTargetsCount,n.numClippingPlanes=t.numClippingPlanes,n.numIntersection=t.numClipIntersection,n.vertexAlphas=t.vertexAlphas,n.vertexTangents=t.vertexTangents,n.toneMapping=t.toneMapping}function Dt(e,t){if(e.length===0)return null;if(e.length===1)return e[0].texture===null?null:e[0];S.setFromMatrixPosition(t.matrixWorld);for(let t=0,n=e.length;t<n;t++){let n=e[t];if(n.texture!==null&&n.boundingBox.containsPoint(S))return n}return null}function Ot(e,t,n,r,i){t.isScene!==!0&&(t=Ae),Le.resetTextureUnits();let a=t.fog,o=r.isMeshStandardMaterial||r.isMeshLambertMaterial||r.isMeshPhongMaterial?t.environment:null,s=F===null?N.outputColorSpace:F.isXRRenderTarget===!0?F.texture.colorSpace:Ht.workingColorSpace,c=r.isMeshStandardMaterial||r.isMeshLambertMaterial&&!r.envMap||r.isMeshPhongMaterial&&!r.envMap,l=Re.get(r.envMap||o,c),u=r.vertexColors===!0&&!!n.attributes.color&&n.attributes.color.itemSize===4,d=!!n.attributes.tangent&&(!!r.normalMap||r.anisotropy>0),f=!!n.morphAttributes.position,p=!!n.morphAttributes.normal,m=!!n.morphAttributes.color,h=0;r.toneMapped&&(F===null||F.isXRRenderTarget===!0)&&(h=N.toneMapping);let g=n.morphAttributes.position||n.morphAttributes.normal||n.morphAttributes.color,_=g===void 0?0:g.length,v=R.get(r),y=k.state.lights;if(Te===!0&&(Ee===!0||e!==ue)){let t=e===ue&&r.id===le;qe.setState(r,e,t)}let b=!1;r.version===v.__version?v.needsLights&&v.lightsStateVersion!==y.state.version?b=!0:v.outputColorSpace===s?i.isBatchedMesh&&v.batching===!1||!i.isBatchedMesh&&v.batching===!0||i.isBatchedMesh&&v.batchingColor===!0&&i._colorsTexture===null||i.isBatchedMesh&&v.batchingColor===!1&&i._colorsTexture!==null||i.isInstancedMesh&&v.instancing===!1||!i.isInstancedMesh&&v.instancing===!0||i.isSkinnedMesh&&v.skinning===!1||!i.isSkinnedMesh&&v.skinning===!0||i.isInstancedMesh&&v.instancingColor===!0&&i.instanceColor===null||i.isInstancedMesh&&v.instancingColor===!1&&i.instanceColor!==null||i.isInstancedMesh&&v.instancingMorph===!0&&i.morphTexture===null||i.isInstancedMesh&&v.instancingMorph===!1&&i.morphTexture!==null?b=!0:v.envMap===l?r.fog===!0&&v.fog!==a||v.numClippingPlanes!==void 0&&(v.numClippingPlanes!==qe.numPlanes||v.numIntersection!==qe.numIntersection)?b=!0:v.vertexAlphas===u&&v.vertexTangents===d&&v.morphTargets===f&&v.morphNormals===p&&v.morphColors===m&&v.toneMapping===h&&v.morphTargetsCount===_?!!v.lightProbeGrid!=k.state.lightProbeGridArray.length>0&&(b=!0):b=!0:b=!0:b=!0:(b=!0,v.__version=r.version);let x=v.currentProgram;b===!0&&(x=wt(r,t,i),P&&r.isNodeMaterial&&P.onUpdateProgram(r,x,v));let S=!1,C=!1,w=!1,T=x.getUniforms(),E=v.uniforms;if(L.useProgram(x.program)&&(S=!0,C=!0,w=!0),r.id!==le&&(le=r.id,C=!0),v.needsLights){let e=Dt(k.state.lightProbeGridArray,i);v.lightProbeGrid!==e&&(v.lightProbeGrid=e,C=!0)}if(S||ue!==e){L.buffers.depth.getReversed()&&e.reversedDepth!==!0&&(e._reversedDepth=!0,e.updateProjectionMatrix()),T.setValue(I,`projectionMatrix`,e.projectionMatrix),T.setValue(I,`viewMatrix`,e.matrixWorldInverse);let t=T.map.cameraPosition;t!==void 0&&t.setValue(I,Oe.setFromMatrixPosition(e.matrixWorld)),Fe.logarithmicDepthBuffer&&T.setValue(I,`logDepthBufFC`,2/(Math.log(e.far+1)/Math.LN2)),(r.isMeshPhongMaterial||r.isMeshToonMaterial||r.isMeshLambertMaterial||r.isMeshBasicMaterial||r.isMeshStandardMaterial||r.isShaderMaterial)&&T.setValue(I,`isOrthographic`,e.isOrthographicCamera===!0),ue!==e&&(ue=e,C=!0,w=!0)}if(v.needsLights&&(y.state.sunShadowMap.length>0&&T.setValue(I,`sunShadowMap`,y.state.sunShadowMap,Le),y.state.directionalShadowMap.length>0&&T.setValue(I,`directionalShadowMap`,y.state.directionalShadowMap,Le),y.state.spotShadowMap.length>0&&T.setValue(I,`spotShadowMap`,y.state.spotShadowMap,Le),y.state.pointShadowMap.length>0&&T.setValue(I,`pointShadowMap`,y.state.pointShadowMap,Le)),i.isSkinnedMesh){T.setOptional(I,i,`bindMatrix`),T.setOptional(I,i,`bindMatrixInverse`);let e=i.skeleton;e&&(e.boneTexture===null&&e.computeBoneTexture(),T.setValue(I,`boneTexture`,e.boneTexture,Le))}i.isBatchedMesh&&(T.setOptional(I,i,`batchingTexture`),T.setValue(I,`batchingTexture`,i._matricesTexture,Le),T.setOptional(I,i,`batchingIdTexture`),T.setValue(I,`batchingIdTexture`,i._indirectTexture,Le),T.setOptional(I,i,`batchingColorTexture`),i._colorsTexture!==null&&T.setValue(I,`batchingColorTexture`,i._colorsTexture,Le));let D=n.morphAttributes;if((D.position!==void 0||D.normal!==void 0||D.color!==void 0)&&Xe.update(i,n,x),(C||v.receiveShadow!==i.receiveShadow)&&(v.receiveShadow=i.receiveShadow,T.setValue(I,`receiveShadow`,i.receiveShadow)),(r.isMeshStandardMaterial||r.isMeshLambertMaterial||r.isMeshPhongMaterial)&&r.envMap===null&&t.environment!==null&&(E.envMapIntensity.value=t.environmentIntensity),E.dfgLUT!==void 0&&(E.dfgLUT.value=Bu()),C){if(T.setValue(I,`toneMappingExposure`,N.toneMappingExposure),v.needsLights&&kt(E,w),a&&r.fog===!0&&Ue.refreshFogUniforms(E,a),Ue.refreshMaterialUniforms(E,r,ve,_e,k.state.transmissionRenderTarget[e.id]),v.needsLights&&v.lightProbeGrid){let e=v.lightProbeGrid;E.probesSH.value=e.texture,E.probesMin.value.copy(e.boundingBox.min),E.probesMax.value.copy(e.boundingBox.max),E.probesResolution.value.copy(e.resolution)}yl.upload(I,Tt(v),E,Le)}if(r.isShaderMaterial&&r.uniformsNeedUpdate===!0&&(yl.upload(I,Tt(v),E,Le),r.uniformsNeedUpdate=!1),r.isSpriteMaterial&&T.setValue(I,`center`,i.center),T.setValue(I,`modelViewMatrix`,i.modelViewMatrix),T.setValue(I,`normalMatrix`,i.normalMatrix),T.setValue(I,`modelMatrix`,i.matrixWorld),r.uniformsGroups!==void 0){let e=r.uniformsGroups;for(let t=0,n=e.length;t<n;t++){let n=e[t];rt.update(n,x),rt.bind(n,x)}}return x}function kt(e,t){e.ambientLightColor.needsUpdate=t,e.lightProbe.needsUpdate=t,e.sunLights.needsUpdate=t,e.sunLightShadows.needsUpdate=t,e.directionalLights.needsUpdate=t,e.directionalLightShadows.needsUpdate=t,e.pointLights.needsUpdate=t,e.pointLightShadows.needsUpdate=t,e.spotLights.needsUpdate=t,e.spotLightShadows.needsUpdate=t,e.rectAreaLights.needsUpdate=t,e.hemisphereLights.needsUpdate=t}function At(e){return e.isMeshLambertMaterial||e.isMeshToonMaterial||e.isMeshPhongMaterial||e.isMeshStandardMaterial||e.isShadowMaterial||e.isShaderMaterial&&e.lights===!0}this.getActiveCubeFace=function(){return se},this.getActiveMipmapLevel=function(){return ce},this.getRenderTarget=function(){return F},this.setRenderTargetTextures=function(e,t,n){let r=R.get(e);r.__autoAllocateDepthBuffer=e.resolveDepthBuffer===!1,r.__autoAllocateDepthBuffer===!1&&(r.__useRenderToTexture=!1),R.get(e.texture).__webglTexture=t,R.get(e.depthTexture).__webglTexture=r.__autoAllocateDepthBuffer?void 0:n,r.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(e,t){let n=R.get(e);n.__webglFramebuffer=t,n.__useDefaultFramebuffer=t===void 0},this.setRenderTarget=function(e,t=0,n=0){F=e,se=t,ce=n;let r=null,i=!1,a=!1;if(e){let o=R.get(e);if(o.__useDefaultFramebuffer!==void 0){L.bindFramebuffer(I.FRAMEBUFFER,o.__webglFramebuffer),de.copy(e.viewport),fe.copy(e.scissor),pe=e.scissorTest,L.viewport(de),L.scissor(fe),L.setScissorTest(pe),le=-1;return}if(o.__webglFramebuffer===void 0)Le.setupRenderTarget(e);else if(o.__hasExternalTextures)Le.rebindTextures(e,R.get(e.texture).__webglTexture,R.get(e.depthTexture).__webglTexture);else if(e.depthBuffer){let t=e.depthTexture;if(o.__boundDepthTexture!==t){if(t!==null&&R.has(t)&&(e.width!==t.image.width||e.height!==t.image.height))throw Error(`THREE.WebGLRenderer: Attached DepthTexture is initialized to the incorrect size.`);Le.setupDepthRenderbuffer(e)}}let s=e.texture;(s.isData3DTexture||s.isDataArrayTexture||s.isCompressedArrayTexture)&&(a=!0);let c=R.get(e).__webglFramebuffer;e.isWebGLCubeRenderTarget?(r=Array.isArray(c[t])?c[t][n]:c[t],i=!0):r=e.samples>0&&Le.useMultisampledRTT(e)===!1?R.get(e).__webglMultisampledFramebuffer:Array.isArray(c)?c[n]:c,de.copy(e.viewport),fe.copy(e.scissor),pe=e.scissorTest}else de.copy(xe).multiplyScalar(ve).floor(),fe.copy(Se).multiplyScalar(ve).floor(),pe=Ce;if(n!==0&&(r=te),L.bindFramebuffer(I.FRAMEBUFFER,r)&&L.drawBuffers(e,r),L.viewport(de),L.scissor(fe),L.setScissorTest(pe),i){let r=R.get(e.texture);I.framebufferTexture2D(I.FRAMEBUFFER,I.COLOR_ATTACHMENT0,I.TEXTURE_CUBE_MAP_POSITIVE_X+t,r.__webglTexture,n)}else if(a){let r=t;for(let t=0;t<e.textures.length;t++){let i=R.get(e.textures[t]);I.framebufferTextureLayer(I.FRAMEBUFFER,I.COLOR_ATTACHMENT0+t,i.__webglTexture,n,r)}}else if(e!==null&&n!==0){let t=R.get(e.texture);I.framebufferTexture2D(I.FRAMEBUFFER,I.COLOR_ATTACHMENT0,I.TEXTURE_2D,t.__webglTexture,n)}le=-1};function jt(e){let t=R.get(e);return(t.__readFormat!==e.format||t.__readType!==e.type)&&(t.__readFormat=e.format,t.__readType=e.type,t.__formatReadable=Fe.textureFormatReadable(e.format),t.__typeReadable=Fe.textureTypeReadable(e.type)),t}this.readRenderTargetPixels=function(e,t,n,r,i,a,o,s=0){if(!(e&&e.isWebGLRenderTarget)){B(`WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.`);return}let c=R.get(e).__webglFramebuffer;if(e.isWebGLCubeRenderTarget&&o!==void 0&&(c=c[o]),c){L.bindFramebuffer(I.FRAMEBUFFER,c);try{let o=e.textures[s],c=o.format,l=o.type;e.textures.length>1&&I.readBuffer(I.COLOR_ATTACHMENT0+s);let u=jt(o);if(u.__formatReadable===!1){B(`WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.`);return}if(u.__typeReadable===!1){B(`WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.`);return}t>=0&&t<=e.width-r&&n>=0&&n<=e.height-i&&I.readPixels(t,n,r,i,et.convert(c),et.convert(l),a)}finally{let e=F===null?null:R.get(F).__webglFramebuffer;L.bindFramebuffer(I.FRAMEBUFFER,e)}}},this.readRenderTargetPixelsAsync=async function(e,t,n,r,i,a,o,s=0){if(!(e&&e.isWebGLRenderTarget))throw Error(`THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.`);let c=R.get(e).__webglFramebuffer;if(e.isWebGLCubeRenderTarget&&o!==void 0&&(c=c[o]),c){if(t>=0&&t<=e.width-r&&n>=0&&n<=e.height-i){L.bindFramebuffer(I.FRAMEBUFFER,c);let o=e.textures[s],l=o.format,u=o.type;e.textures.length>1&&I.readBuffer(I.COLOR_ATTACHMENT0+s);let d=jt(o);if(d.__formatReadable===!1)throw Error(`THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.`);if(d.__typeReadable===!1)throw Error(`THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.`);let f=I.createBuffer();I.bindBuffer(I.PIXEL_PACK_BUFFER,f),I.bufferData(I.PIXEL_PACK_BUFFER,a.byteLength,I.STREAM_READ),I.readPixels(t,n,r,i,et.convert(l),et.convert(u),0),I.bindBuffer(I.PIXEL_PACK_BUFFER,null);let p=F===null?null:R.get(F).__webglFramebuffer;L.bindFramebuffer(I.FRAMEBUFFER,p);let m=I.fenceSync(I.SYNC_GPU_COMMANDS_COMPLETE,0);return I.flush(),await st(I,m,4),I.bindBuffer(I.PIXEL_PACK_BUFFER,f),I.getBufferSubData(I.PIXEL_PACK_BUFFER,0,a),I.bindBuffer(I.PIXEL_PACK_BUFFER,null),I.deleteBuffer(f),I.deleteSync(m),a}throw Error(`THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.`)}},this.copyFramebufferToTexture=function(e,t=null,n=0){let r=2**-n,i=Math.floor(e.image.width*r),a=Math.floor(e.image.height*r),o=t===null?0:t.x,s=t===null?0:t.y;Le.setTexture2D(e,0),I.copyTexSubImage2D(I.TEXTURE_2D,n,0,0,o,s,i,a),L.unbindTexture()},this.copyTextureToTexture=function(e,t,n=null,r=null,i=0,a=0){let o,s,c,l,u,d,f,p,m,h=e.isCompressedTexture?e.mipmaps[a]:e.image;if(n!==null)o=n.max.x-n.min.x,s=n.max.y-n.min.y,c=n.isBox3?n.max.z-n.min.z:1,l=n.min.x,u=n.min.y,d=n.isBox3?n.min.z:0;else{let t=2**-i;o=Math.floor(h.width*t),s=Math.floor(h.height*t),c=e.isDataArrayTexture?h.depth:e.isData3DTexture?Math.floor(h.depth*t):1,l=0,u=0,d=0}r===null?(f=0,p=0,m=0):(f=r.x,p=r.y,m=r.z);let g=et.convert(t.format),_=et.convert(t.type),v;t.isData3DTexture?(Le.setTexture3D(t,0),v=I.TEXTURE_3D):t.isDataArrayTexture||t.isCompressedArrayTexture?(Le.setTexture2DArray(t,0),v=I.TEXTURE_2D_ARRAY):(Le.setTexture2D(t,0),v=I.TEXTURE_2D),L.activeTexture(I.TEXTURE0),L.pixelStorei(I.UNPACK_FLIP_Y_WEBGL,t.flipY),L.pixelStorei(I.UNPACK_PREMULTIPLY_ALPHA_WEBGL,t.premultiplyAlpha),L.pixelStorei(I.UNPACK_ALIGNMENT,t.unpackAlignment);let y=L.getParameter(I.UNPACK_ROW_LENGTH),b=L.getParameter(I.UNPACK_IMAGE_HEIGHT),x=L.getParameter(I.UNPACK_SKIP_PIXELS),S=L.getParameter(I.UNPACK_SKIP_ROWS),C=L.getParameter(I.UNPACK_SKIP_IMAGES);L.pixelStorei(I.UNPACK_ROW_LENGTH,h.width),L.pixelStorei(I.UNPACK_IMAGE_HEIGHT,h.height),L.pixelStorei(I.UNPACK_SKIP_PIXELS,l),L.pixelStorei(I.UNPACK_SKIP_ROWS,u),L.pixelStorei(I.UNPACK_SKIP_IMAGES,d);let w=e.isDataArrayTexture||e.isData3DTexture,T=t.isDataArrayTexture||t.isData3DTexture;if(e.isDepthTexture){let n=R.get(e),r=R.get(t),h=R.get(n.__renderTarget),g=R.get(r.__renderTarget);L.bindFramebuffer(I.READ_FRAMEBUFFER,h.__webglFramebuffer),L.bindFramebuffer(I.DRAW_FRAMEBUFFER,g.__webglFramebuffer);for(let n=0;n<c;n++)w&&(I.framebufferTextureLayer(I.READ_FRAMEBUFFER,I.COLOR_ATTACHMENT0,R.get(e).__webglTexture,i,d+n),I.framebufferTextureLayer(I.DRAW_FRAMEBUFFER,I.COLOR_ATTACHMENT0,R.get(t).__webglTexture,a,m+n)),I.blitFramebuffer(l,u,o,s,f,p,o,s,I.DEPTH_BUFFER_BIT,I.NEAREST);L.bindFramebuffer(I.READ_FRAMEBUFFER,null),L.bindFramebuffer(I.DRAW_FRAMEBUFFER,null)}else if(i!==0||e.isRenderTargetTexture||R.has(e)){let n=R.get(e),r=R.get(t);L.bindFramebuffer(I.READ_FRAMEBUFFER,re),L.bindFramebuffer(I.DRAW_FRAMEBUFFER,oe);for(let e=0;e<c;e++)w?I.framebufferTextureLayer(I.READ_FRAMEBUFFER,I.COLOR_ATTACHMENT0,n.__webglTexture,i,d+e):I.framebufferTexture2D(I.READ_FRAMEBUFFER,I.COLOR_ATTACHMENT0,I.TEXTURE_2D,n.__webglTexture,i),T?I.framebufferTextureLayer(I.DRAW_FRAMEBUFFER,I.COLOR_ATTACHMENT0,r.__webglTexture,a,m+e):I.framebufferTexture2D(I.DRAW_FRAMEBUFFER,I.COLOR_ATTACHMENT0,I.TEXTURE_2D,r.__webglTexture,a),i===0?T?I.copyTexSubImage3D(v,a,f,p,m+e,l,u,o,s):I.copyTexSubImage2D(v,a,f,p,l,u,o,s):I.blitFramebuffer(l,u,o,s,f,p,o,s,I.COLOR_BUFFER_BIT,I.NEAREST);L.bindFramebuffer(I.READ_FRAMEBUFFER,null),L.bindFramebuffer(I.DRAW_FRAMEBUFFER,null)}else T?e.isDataTexture||e.isData3DTexture?I.texSubImage3D(v,a,f,p,m,o,s,c,g,_,h.data):t.isCompressedArrayTexture?I.compressedTexSubImage3D(v,a,f,p,m,o,s,c,g,h.data):I.texSubImage3D(v,a,f,p,m,o,s,c,g,_,h):e.isDataTexture?I.texSubImage2D(I.TEXTURE_2D,a,f,p,o,s,g,_,h.data):e.isCompressedTexture?I.compressedTexSubImage2D(I.TEXTURE_2D,a,f,p,h.width,h.height,g,h.data):I.texSubImage2D(I.TEXTURE_2D,a,f,p,o,s,g,_,h);L.pixelStorei(I.UNPACK_ROW_LENGTH,y),L.pixelStorei(I.UNPACK_IMAGE_HEIGHT,b),L.pixelStorei(I.UNPACK_SKIP_PIXELS,x),L.pixelStorei(I.UNPACK_SKIP_ROWS,S),L.pixelStorei(I.UNPACK_SKIP_IMAGES,C),a===0&&t.generateMipmaps&&I.generateMipmap(v),L.unbindTexture()},this.initRenderTarget=function(e){R.get(e).__webglFramebuffer===void 0&&Le.setupRenderTarget(e)},this.initTexture=function(e){e.isCubeTexture?Le.setTextureCube(e,0):e.isData3DTexture?Le.setTexture3D(e,0):e.isDataArrayTexture||e.isCompressedArrayTexture?Le.setTexture2DArray(e,0):Le.setTexture2D(e,0),L.unbindTexture()},this.resetState=function(){se=0,ce=0,F=null,L.reset(),tt.reset()},typeof __THREE_DEVTOOLS__<`u`&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent(`observe`,{detail:this}))}get coordinateSystem(){return Qe}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;let t=this.getContext();t.drawingBufferColorSpace=Ht._getDrawingBufferColorSpace(e),t.unpackColorSpace=Ht._getUnpackColorSpace()}},Hu=class extends Vn{constructor(){super(),this.name=`RoomEnvironment`,this.position.y=-3.5;let e=new Y;e.deleteAttribute(`uv`);let t=new Z({side:1}),n=new Z,r=new ts(16777215,900,28,2);r.position.set(.418,16.199,.3),this.add(r);let i=new J(e,t);i.position.set(-.757,13.219,.717),i.scale.set(31.713,28.305,28.591),this.add(i);let a=new gi(e,n,6),o=new Mn;o.position.set(-10.906,2.009,1.846),o.rotation.set(0,-.195,0),o.scale.set(2.328,7.905,4.651),o.updateMatrix(),a.setMatrixAt(0,o.matrix),o.position.set(-5.607,-.754,-.758),o.rotation.set(0,.994,0),o.scale.set(1.97,1.534,3.955),o.updateMatrix(),a.setMatrixAt(1,o.matrix),o.position.set(6.167,.857,7.803),o.rotation.set(0,.561,0),o.scale.set(3.927,6.285,3.687),o.updateMatrix(),a.setMatrixAt(2,o.matrix),o.position.set(-2.017,.018,6.124),o.rotation.set(0,.333,0),o.scale.set(2.002,4.566,2.064),o.updateMatrix(),a.setMatrixAt(3,o.matrix),o.position.set(2.291,-.756,-2.621),o.rotation.set(0,-.286,0),o.scale.set(1.546,1.552,1.496),o.updateMatrix(),a.setMatrixAt(4,o.matrix),o.position.set(-2.193,-.369,-5.547),o.rotation.set(0,.516,0),o.scale.set(3.875,3.487,2.986),o.updateMatrix(),a.setMatrixAt(5,o.matrix),this.add(a);let s=new J(e,Uu(50));s.position.set(-16.116,14.37,8.208),s.scale.set(.1,2.428,2.739),this.add(s);let c=new J(e,Uu(50));c.position.set(-16.109,18.021,-8.207),c.scale.set(.1,2.425,2.751),this.add(c);let l=new J(e,Uu(17));l.position.set(14.904,12.198,-1.832),l.scale.set(.15,4.265,6.331),this.add(l);let u=new J(e,Uu(43));u.position.set(-.462,8.89,14.52),u.scale.set(4.38,5.441,.088),this.add(u);let d=new J(e,Uu(20));d.position.set(3.235,11.486,-12.541),d.scale.set(2.5,2,.1),this.add(d);let f=new J(e,Uu(100));f.position.set(0,20,0),f.scale.set(1,.1,1),this.add(f)}dispose(){let e=new Set;this.traverse(t=>{t.isMesh&&(e.add(t.geometry),e.add(t.material))});for(let t of e)t.dispose()}};function Uu(e){return new vo({color:0,emissive:16777215,emissiveIntensity:e})}var Wu=class{constructor(){this.ctx=null,this.isMuted=!1,this.masterGain=null,this.musicGain=null,this.ambientOscillators=[],this.ambientFilter=null,this.ambientInterval=null,this.lastFootstepTime=0,this.lastSwimStrokeTime=0}init(){if(!this.ctx)try{let e=window.AudioContext||window.webkitAudioContext;this.ctx=new e,this.masterGain=this.ctx.createGain(),this.masterGain.gain.setValueAtTime(this.isMuted?0:.65,this.ctx.currentTime),this.masterGain.connect(this.ctx.destination),this.musicGain=this.ctx.createGain(),this.musicGain.gain.setValueAtTime(.35,this.ctx.currentTime),this.musicGain.connect(this.masterGain),this.startAmbientMusic()}catch(e){console.warn(`AudioContext not supported or blocked:`,e)}}resume(){this.ctx&&this.ctx.state===`suspended`&&this.ctx.resume()}toggleMute(){if(this.isMuted=!this.isMuted,this.masterGain&&this.ctx){let e=this.isMuted?0:.65;this.masterGain.gain.setTargetAtTime(e,this.ctx.currentTime,.05)}return this.isMuted}getIsMuted(){return this.isMuted}setMasterVolume(e){if(this.masterGain&&this.ctx){let t=Math.max(0,Math.min(1,e));this.masterGain.gain.setTargetAtTime(this.isMuted?0:t,this.ctx.currentTime,.05)}}setMusicVolume(e){if(this.musicGain&&this.ctx){let t=Math.max(0,Math.min(1,e));this.musicGain.gain.setTargetAtTime(t,this.ctx.currentTime,.05)}}startAmbientMusic(){if(!this.ctx||!this.musicGain)return;let e=[[73.42,110,146.83,220,261.63],[65.41,98,130.81,196,246.94],[55,82.41,110,164.81,220],[58.27,87.31,116.54,174.61,233.08]],t=0,n=()=>{if(!this.ctx||!this.musicGain||this.isMuted)return;let n=e[t];t=(t+1)%e.length,n.forEach((e,t)=>{if(!this.ctx||!this.musicGain)return;let n=this.ctx.createOscillator(),r=this.ctx.createGain(),i=this.ctx.createBiquadFilter();n.type=t===0?`triangle`:`sine`,n.frequency.setValueAtTime(e+(Math.random()-.5)*1.2,this.ctx.currentTime),i.type=`lowpass`,i.frequency.setValueAtTime(350+t*120,this.ctx.currentTime),i.Q.setValueAtTime(1.5,this.ctx.currentTime);let a=this.ctx.currentTime;r.gain.setValueAtTime(0,a),r.gain.linearRampToValueAtTime(.08/(t+1),a+3.5),r.gain.linearRampToValueAtTime(1e-4,a+12),n.connect(i),i.connect(r),r.connect(this.musicGain),n.start(a),n.stop(a+12+.5)})};n(),this.ambientInterval=window.setInterval(n,1e4)}playFootstep(e=!1){if(!this.ctx||!this.masterGain||this.isMuted)return;let t=performance.now(),n=e?280:420;if(t-this.lastFootstepTime<n)return;this.lastFootstepTime=t;let r=this.ctx.currentTime,i=this.ctx.sampleRate*.06,a=this.ctx.createBuffer(1,i,this.ctx.sampleRate),o=a.getChannelData(0);for(let e=0;e<i;e++)o[e]=(Math.random()*2-1)*Math.exp(-e/(i*.3));let s=this.ctx.createBufferSource();s.buffer=a;let c=this.ctx.createBiquadFilter();c.type=`lowpass`,c.frequency.setValueAtTime(450+Math.random()*100,r);let l=this.ctx.createGain();l.gain.setValueAtTime(.12,r),l.gain.exponentialRampToValueAtTime(.001,r+.08),s.connect(c),c.connect(l),l.connect(this.masterGain),s.start(r)}playWaterSplash(e=1){if(!this.ctx||!this.masterGain||this.isMuted)return;let t=this.ctx.currentTime,n=Math.floor(this.ctx.sampleRate*.28),r=this.ctx.createBuffer(1,n,this.ctx.sampleRate),i=r.getChannelData(0);for(let e=0;e<n;e++){let t=Math.exp(-e/(n*.25));i[e]=(Math.random()*2-1)*t}let a=this.ctx.createBufferSource();a.buffer=r;let o=this.ctx.createBiquadFilter();o.type=`bandpass`,o.frequency.setValueAtTime(600,t),o.frequency.exponentialRampToValueAtTime(280,t+.25),o.Q.setValueAtTime(1.8,t);let s=this.ctx.createOscillator(),c=this.ctx.createGain();s.type=`sine`,s.frequency.setValueAtTime(220,t),s.frequency.exponentialRampToValueAtTime(110,t+.16),c.gain.setValueAtTime(.18*e,t),c.gain.exponentialRampToValueAtTime(.001,t+.18);let l=this.ctx.createGain();l.gain.setValueAtTime(.25*e,t),l.gain.exponentialRampToValueAtTime(.001,t+.28),a.connect(o),o.connect(l),l.connect(this.masterGain),s.connect(c),c.connect(this.masterGain),a.start(t),s.start(t),s.stop(t+.2)}playSwimStroke(e=!1){if(!this.ctx||!this.masterGain||this.isMuted)return;let t=performance.now(),n=e?380:580;if(t-this.lastSwimStrokeTime<n)return;this.lastSwimStrokeTime=t;let r=this.ctx.currentTime,i=e?.32:.42,a=Math.floor(this.ctx.sampleRate*i),o=this.ctx.createBuffer(1,a,this.ctx.sampleRate),s=o.getChannelData(0);for(let e=0;e<a;e++){let t=e/a,n=Math.sin(t*Math.PI)*(1-t*.4);s[e]=(Math.random()*2-1)*n}let c=this.ctx.createBufferSource();c.buffer=o;let l=this.ctx.createBiquadFilter();l.type=`lowpass`,l.frequency.setValueAtTime(320,r),l.frequency.linearRampToValueAtTime(750,r+i*.4),l.frequency.exponentialRampToValueAtTime(260,r+i);let u=this.ctx.createGain();u.gain.setValueAtTime(.02,r),u.gain.linearRampToValueAtTime(e?.22:.14,r+i*.3),u.gain.exponentialRampToValueAtTime(.001,r+i),c.connect(l),l.connect(u),u.connect(this.masterGain),c.start(r)}playJump(){if(!this.ctx||!this.masterGain||this.isMuted)return;let e=this.ctx.currentTime,t=this.ctx.createOscillator(),n=this.ctx.createGain();t.type=`sine`,t.frequency.setValueAtTime(140,e),t.frequency.exponentialRampToValueAtTime(320,e+.18),n.gain.setValueAtTime(.2,e),n.gain.exponentialRampToValueAtTime(.001,e+.25),t.connect(n),n.connect(this.masterGain),t.start(e),t.stop(e+.26)}playCrystalResonance(){if(!this.ctx||!this.masterGain||this.isMuted)return;let e=this.ctx.currentTime;[523.25,659.25,783.99,1046.5,1318.51,1567.98].forEach((t,n)=>{if(!this.ctx||!this.masterGain)return;let r=this.ctx.createOscillator(),i=this.ctx.createGain();r.type=n%2==0?`sine`:`triangle`,r.frequency.setValueAtTime(t,e);let a=2.5+n*.4;i.gain.setValueAtTime(0,e),i.gain.linearRampToValueAtTime(.18/(n+1),e+.02+n*.04),i.gain.exponentialRampToValueAtTime(1e-4,e+a),r.connect(i),i.connect(this.masterGain),r.start(e+n*.04),r.stop(e+a+.1)})}playPortalActivation(){if(!this.ctx||!this.masterGain||this.isMuted)return;let e=this.ctx.currentTime,t=this.ctx.createOscillator(),n=this.ctx.createOscillator(),r=this.ctx.createGain();t.type=`sawtooth`,t.frequency.setValueAtTime(55,e),t.frequency.exponentialRampToValueAtTime(110,e+2.5),n.type=`sine`,n.frequency.setValueAtTime(220,e),n.frequency.exponentialRampToValueAtTime(440,e+3);let i=this.ctx.createBiquadFilter();i.type=`lowpass`,i.frequency.setValueAtTime(180,e),i.frequency.exponentialRampToValueAtTime(1200,e+2.5),r.gain.setValueAtTime(.01,e),r.gain.linearRampToValueAtTime(.35,e+1.2),r.gain.exponentialRampToValueAtTime(.001,e+4.5),t.connect(i),n.connect(i),i.connect(r),r.connect(this.masterGain),t.start(e),n.start(e),t.stop(e+4.6),n.stop(e+4.6)}playShardCollect(){if(!this.ctx||!this.masterGain||this.isMuted)return;let e=this.ctx.currentTime;[659.25,880,1046.5,1318.51,1760].forEach((t,n)=>{if(!this.ctx||!this.masterGain)return;let r=this.ctx.createOscillator(),i=this.ctx.createGain();r.type=`sine`,r.frequency.setValueAtTime(t,e+n*.05);let a=1.6;i.gain.setValueAtTime(0,e+n*.05),i.gain.linearRampToValueAtTime(.14,e+n*.05+.02),i.gain.exponentialRampToValueAtTime(1e-4,e+n*.05+a),r.connect(i),i.connect(this.masterGain),r.start(e+n*.05),r.stop(e+n*.05+a+.05)})}playInscriptionRead(){if(!this.ctx||!this.masterGain||this.isMuted)return;let e=this.ctx.currentTime,t=this.ctx.createOscillator(),n=this.ctx.createGain(),r=this.ctx.createBiquadFilter();t.type=`triangle`,t.frequency.setValueAtTime(110,e),t.frequency.exponentialRampToValueAtTime(82.4,e+1.8),r.type=`lowpass`,r.frequency.setValueAtTime(220,e),n.gain.setValueAtTime(0,e),n.gain.linearRampToValueAtTime(.2,e+.1),n.gain.exponentialRampToValueAtTime(.001,e+2),t.connect(r),r.connect(n),n.connect(this.masterGain),t.start(e),t.stop(e+2.1);let i=this.ctx.createOscillator(),a=this.ctx.createGain();i.type=`sine`,i.frequency.setValueAtTime(587.33,e+.08),a.gain.setValueAtTime(0,e+.08),a.gain.linearRampToValueAtTime(.12,e+.12),a.gain.exponentialRampToValueAtTime(.001,e+1.8),i.connect(a),a.connect(this.masterGain),i.start(e+.08),i.stop(e+1.9)}playStoneDoorSound(){if(!this.ctx||!this.masterGain||this.isMuted)return;let e=this.ctx.currentTime,t=this.ctx.createOscillator(),n=this.ctx.createGain(),r=this.ctx.createBiquadFilter();t.type=`sawtooth`,t.frequency.setValueAtTime(48,e),t.frequency.linearRampToValueAtTime(42,e+1.8),r.type=`lowpass`,r.frequency.setValueAtTime(140,e),n.gain.setValueAtTime(0,e),n.gain.linearRampToValueAtTime(.28,e+.3),n.gain.setValueAtTime(.25,e+1.4),n.gain.exponentialRampToValueAtTime(.001,e+2.2),t.connect(r),r.connect(n),n.connect(this.masterGain),t.start(e),t.stop(e+2.3);let i=this.ctx.createOscillator(),a=this.ctx.createGain();i.type=`triangle`,i.frequency.setValueAtTime(190,e),i.frequency.exponentialRampToValueAtTime(120,e+1.6),a.gain.setValueAtTime(0,e),a.gain.linearRampToValueAtTime(.08,e+.4),a.gain.exponentialRampToValueAtTime(.001,e+1.9),i.connect(a),a.connect(this.masterGain),i.start(e),i.stop(e+2)}playUIClick(){if(!this.ctx||!this.masterGain||this.isMuted)return;let e=this.ctx.currentTime,t=this.ctx.createOscillator(),n=this.ctx.createGain();t.type=`sine`,t.frequency.setValueAtTime(800,e),t.frequency.exponentialRampToValueAtTime(400,e+.05),n.gain.setValueAtTime(.1,e),n.gain.exponentialRampToValueAtTime(.001,e+.05),t.connect(n),n.connect(this.masterGain),t.start(e),t.stop(e+.06)}playQuestUpdate(){if(!this.ctx||!this.masterGain||this.isMuted)return;let e=this.ctx.currentTime;[587.33,739.99].forEach((t,n)=>{if(!this.ctx||!this.masterGain)return;let r=this.ctx.createOscillator(),i=this.ctx.createGain();r.type=`sine`,r.frequency.setValueAtTime(t,e+n*.08),i.gain.setValueAtTime(0,e+n*.08),i.gain.linearRampToValueAtTime(.12,e+n*.08+.02),i.gain.exponentialRampToValueAtTime(.001,e+n*.08+.6),r.connect(i),i.connect(this.masterGain),r.start(e+n*.08),r.stop(e+n*.08+.65)})}playQuestObjectiveComplete(){if(!this.ctx||!this.masterGain||this.isMuted)return;let e=this.ctx.currentTime;[587.33,739.99,880,1174.66].forEach((t,n)=>{if(!this.ctx||!this.masterGain)return;let r=this.ctx.createOscillator(),i=this.ctx.createGain();r.type=n===3?`triangle`:`sine`,r.frequency.setValueAtTime(t,e+n*.1),i.gain.setValueAtTime(0,e+n*.1),i.gain.linearRampToValueAtTime(.16,e+n*.1+.03),i.gain.exponentialRampToValueAtTime(1e-4,e+n*.1+1.4),r.connect(i),i.connect(this.masterGain),r.start(e+n*.1),r.stop(e+n*.1+1.45)})}playStoryNarrative(){if(!this.ctx||!this.masterGain||this.isMuted)return;let e=this.ctx.currentTime,t=this.ctx.createOscillator(),n=this.ctx.createGain();t.type=`triangle`,t.frequency.setValueAtTime(146.83,e),n.gain.setValueAtTime(0,e),n.gain.linearRampToValueAtTime(.2,e+.2),n.gain.exponentialRampToValueAtTime(.001,e+2.8),t.connect(n),n.connect(this.masterGain),t.start(e),t.stop(e+2.9);let r=this.ctx.createOscillator(),i=this.ctx.createGain();r.type=`sine`,r.frequency.setValueAtTime(880,e+.15),r.frequency.linearRampToValueAtTime(1174.66,e+.4),i.gain.setValueAtTime(0,e+.15),i.gain.linearRampToValueAtTime(.15,e+.2),i.gain.exponentialRampToValueAtTime(.001,e+2.2),r.connect(i),i.connect(this.masterGain),r.start(e+.15),r.stop(e+2.3)}playQuestCompletedFanfare(){if(!this.ctx||!this.masterGain||this.isMuted)return;let e=this.ctx.currentTime;[[293.66,369.99,440],[369.99,440,587.33],[440,554.37,659.25],[587.33,739.99,880,1174.66]].forEach((t,n)=>{let r=e+n*.28;t.forEach(e=>{if(!this.ctx||!this.masterGain)return;let t=this.ctx.createOscillator(),i=this.ctx.createGain();t.type=`triangle`,t.frequency.setValueAtTime(e,r),i.gain.setValueAtTime(0,r),i.gain.linearRampToValueAtTime(.12,r+.05),i.gain.exponentialRampToValueAtTime(1e-4,r+(n===3?3:.8)),t.connect(i),i.connect(this.masterGain),t.start(r),t.stop(r+(n===3?3.2:.9))})})}playNPCVoice(e){if(!this.ctx||!this.masterGain||this.isMuted)return;let t=this.ctx.currentTime;if(e===`wanderer`)[329.63,440,523.25].forEach((e,n)=>{if(!this.ctx||!this.masterGain)return;let r=this.ctx.createOscillator(),i=this.ctx.createGain(),a=this.ctx.createBiquadFilter();r.type=`sine`,r.frequency.setValueAtTime(e,t+n*.08),r.frequency.exponentialRampToValueAtTime(e*1.05,t+n*.08+.35),a.type=`bandpass`,a.frequency.setValueAtTime(600+n*200,t),a.Q.setValueAtTime(4,t),i.gain.setValueAtTime(0,t+n*.08),i.gain.linearRampToValueAtTime(.08,t+n*.08+.06),i.gain.exponentialRampToValueAtTime(1e-4,t+n*.08+.6),r.connect(a),a.connect(i),i.connect(this.masterGain),r.start(t+n*.08),r.stop(t+n*.08+.65)});else if(e===`guardian`){let e=this.ctx.createOscillator(),n=this.ctx.createOscillator(),r=this.ctx.createGain(),i=this.ctx.createBiquadFilter();e.type=`sawtooth`,e.frequency.setValueAtTime(65.41,t),e.frequency.exponentialRampToValueAtTime(55,t+.8),n.type=`sine`,n.frequency.setValueAtTime(130.81,t),n.frequency.exponentialRampToValueAtTime(110,t+.8),i.type=`lowpass`,i.frequency.setValueAtTime(180,t),i.frequency.exponentialRampToValueAtTime(90,t+.8),i.Q.setValueAtTime(3.5,t),r.gain.setValueAtTime(0,t),r.gain.linearRampToValueAtTime(.18,t+.08),r.gain.exponentialRampToValueAtTime(1e-4,t+.95),e.connect(i),n.connect(i),i.connect(r),r.connect(this.masterGain),e.start(t),n.start(t),e.stop(t+1),n.stop(t+1)}else if(e===`creature`){let e=this.ctx.createOscillator(),n=this.ctx.createGain();e.type=`sine`,e.frequency.setValueAtTime(880,t),e.frequency.exponentialRampToValueAtTime(1318.51,t+.12),e.frequency.exponentialRampToValueAtTime(1046.5,t+.35),n.gain.setValueAtTime(0,t),n.gain.linearRampToValueAtTime(.09,t+.02),n.gain.exponentialRampToValueAtTime(1e-4,t+.45),e.connect(n),n.connect(this.masterGain),e.start(t),e.stop(t+.5)}}playAttackSwing(e=0){if(!this.ctx||!this.masterGain||this.isMuted)return;let t=this.ctx.currentTime,n=this.ctx.sampleRate*.16,r=this.ctx.createBuffer(1,n,this.ctx.sampleRate),i=r.getChannelData(0);for(let e=0;e<n;e++)i[e]=Math.random()*2-1;let a=this.ctx.createBufferSource();a.buffer=r;let o=this.ctx.createBiquadFilter();o.type=`bandpass`;let s=800+e*300;o.frequency.setValueAtTime(s,t),o.frequency.exponentialRampToValueAtTime(s*2.2,t+.12),o.Q.setValueAtTime(3,t);let c=this.ctx.createGain();c.gain.setValueAtTime(0,t),c.gain.linearRampToValueAtTime(.18,t+.02),c.gain.exponentialRampToValueAtTime(1e-4,t+.16),a.connect(o),o.connect(c),c.connect(this.masterGain),a.start(t),a.stop(t+.17);let l=this.ctx.createOscillator(),u=this.ctx.createGain();l.type=`triangle`;let d=440*1.25**e;l.frequency.setValueAtTime(d,t),l.frequency.exponentialRampToValueAtTime(d*1.5,t+.14),u.gain.setValueAtTime(0,t),u.gain.linearRampToValueAtTime(.12,t+.03),u.gain.exponentialRampToValueAtTime(1e-4,t+.22),l.connect(u),u.connect(this.masterGain),l.start(t),l.stop(t+.24)}playEnemyHit(){if(!this.ctx||!this.masterGain||this.isMuted)return;let e=this.ctx.currentTime,t=this.ctx.createOscillator(),n=this.ctx.createGain();t.type=`sine`,t.frequency.setValueAtTime(140,e),t.frequency.exponentialRampToValueAtTime(45,e+.14),n.gain.setValueAtTime(.28,e),n.gain.exponentialRampToValueAtTime(1e-4,e+.18),t.connect(n),n.connect(this.masterGain),t.start(e),t.stop(e+.2);let r=this.ctx.createOscillator(),i=this.ctx.createGain();r.type=`triangle`,r.frequency.setValueAtTime(520,e),r.frequency.exponentialRampToValueAtTime(110,e+.08),i.gain.setValueAtTime(.2,e),i.gain.exponentialRampToValueAtTime(1e-4,e+.12),r.connect(i),i.connect(this.masterGain),r.start(e),r.stop(e+.13)}playDodgeRoll(){if(!this.ctx||!this.masterGain||this.isMuted)return;let e=this.ctx.currentTime,t=this.ctx.createOscillator(),n=this.ctx.createGain(),r=this.ctx.createBiquadFilter();t.type=`sine`,t.frequency.setValueAtTime(260,e),t.frequency.exponentialRampToValueAtTime(620,e+.08),t.frequency.exponentialRampToValueAtTime(180,e+.25),r.type=`lowpass`,r.frequency.setValueAtTime(800,e),n.gain.setValueAtTime(0,e),n.gain.linearRampToValueAtTime(.18,e+.04),n.gain.exponentialRampToValueAtTime(1e-4,e+.28),t.connect(r),r.connect(n),n.connect(this.masterGain),t.start(e),t.stop(e+.3)}playEchoPulse(){if(!this.ctx||!this.masterGain||this.isMuted)return;let e=this.ctx.currentTime,t=this.ctx.createOscillator(),n=this.ctx.createGain();t.type=`sine`,t.frequency.setValueAtTime(95,e),t.frequency.exponentialRampToValueAtTime(28,e+.85),n.gain.setValueAtTime(.4,e),n.gain.exponentialRampToValueAtTime(1e-4,e+1.2),t.connect(n),n.connect(this.masterGain),t.start(e),t.stop(e+1.25),[329.63,440,659.25,880,1318.51].forEach((t,n)=>{if(!this.ctx||!this.masterGain)return;let r=this.ctx.createOscillator(),i=this.ctx.createGain();r.type=`sine`,r.frequency.setValueAtTime(t,e),r.frequency.exponentialRampToValueAtTime(t*1.02,e+1.5),i.gain.setValueAtTime(0,e),i.gain.linearRampToValueAtTime(.14-n*.02,e+.05+n*.02),i.gain.exponentialRampToValueAtTime(1e-4,e+1.8+n*.15),r.connect(i),i.connect(this.masterGain),r.start(e),r.stop(e+2)})}playPlayerHurt(){if(!this.ctx||!this.masterGain||this.isMuted)return;let e=this.ctx.currentTime,t=this.ctx.createOscillator(),n=this.ctx.createGain();t.type=`sawtooth`,t.frequency.setValueAtTime(110,e),t.frequency.exponentialRampToValueAtTime(55,e+.22);let r=this.ctx.createBiquadFilter();r.type=`lowpass`,r.frequency.setValueAtTime(320,e),n.gain.setValueAtTime(.28,e),n.gain.exponentialRampToValueAtTime(1e-4,e+.25),t.connect(r),r.connect(n),n.connect(this.masterGain),t.start(e),t.stop(e+.28)}playPlayerDeath(){if(!this.ctx||!this.masterGain||this.isMuted)return;let e=this.ctx.currentTime;[130.81,155.56,196].forEach(t=>{if(!this.ctx||!this.masterGain)return;let n=this.ctx.createOscillator(),r=this.ctx.createGain();n.type=`sine`,n.frequency.setValueAtTime(t,e),n.frequency.exponentialRampToValueAtTime(t*.65,e+2.2),r.gain.setValueAtTime(.22,e),r.gain.exponentialRampToValueAtTime(1e-4,e+2.5),n.connect(r),r.connect(this.masterGain),n.start(e),n.stop(e+2.6)})}playPlayerRespawn(){if(!this.ctx||!this.masterGain||this.isMuted)return;let e=this.ctx.currentTime;[261.63,329.63,392,523.25,659.25,783.99].forEach((t,n)=>{if(!this.ctx||!this.masterGain)return;let r=e+n*.08,i=this.ctx.createOscillator(),a=this.ctx.createGain();i.type=`triangle`,i.frequency.setValueAtTime(t,r),a.gain.setValueAtTime(0,r),a.gain.linearRampToValueAtTime(.15,r+.03),a.gain.exponentialRampToValueAtTime(1e-4,r+.8),i.connect(a),a.connect(this.masterGain),i.start(r),i.stop(r+.85)})}playEnemyDeath(){if(!this.ctx||!this.masterGain||this.isMuted)return;let e=this.ctx.currentTime,t=this.ctx.createOscillator(),n=this.ctx.createGain();t.type=`sawtooth`,t.frequency.setValueAtTime(180,e),t.frequency.exponentialRampToValueAtTime(40,e+.45);let r=this.ctx.createBiquadFilter();r.type=`lowpass`,r.frequency.setValueAtTime(280,e),n.gain.setValueAtTime(.25,e),n.gain.exponentialRampToValueAtTime(1e-4,e+.5),t.connect(r),r.connect(n),n.connect(this.masterGain),t.start(e),t.stop(e+.55)}playHearthRest(){if(!this.ctx||!this.masterGain||this.isMuted)return;let e=this.ctx.currentTime;[369.99,466.16,554.37,698.46].forEach((t,n)=>{let r=e+n*.12,i=this.ctx.createOscillator(),a=this.ctx.createGain();i.type=`sine`,i.frequency.setValueAtTime(t,r),i.frequency.exponentialRampToValueAtTime(t*1.01,r+1.2),a.gain.setValueAtTime(0,r),a.gain.linearRampToValueAtTime(.18,r+.1),a.gain.exponentialRampToValueAtTime(1e-4,r+1.4),i.connect(a),a.connect(this.masterGain),i.start(r),i.stop(r+1.45)})}playWellWater(){if(!this.ctx||!this.masterGain||this.isMuted)return;let e=this.ctx.currentTime;[523.25,659.25,783.99,1046.5].forEach((t,n)=>{let r=e+n*.09,i=this.ctx.createOscillator(),a=this.ctx.createGain();i.type=`sine`,i.frequency.setValueAtTime(t*1.2,r),i.frequency.exponentialRampToValueAtTime(t,r+.08),a.gain.setValueAtTime(.2,r),a.gain.exponentialRampToValueAtTime(1e-4,r+.22),i.connect(a),a.connect(this.masterGain),i.start(r),i.stop(r+.25)})}dispose(){this.ambientInterval&&clearInterval(this.ambientInterval),this.ctx&&this.ctx.close()}},Gu,$=class e{constructor(t=!1){this.size=2400,this.segments=200,this.floorHeightProvider=null,this.group=new K,this.segments=t?180:220,this.heightData=new Float32Array((this.segments+1)*(this.segments+1)),this.portalTerraceY=this.computeRawHeight(e.PORTAL_POS.x,e.PORTAL_POS.z),this.templeTerraceY=this.computeRawHeight(e.TEMPLE_POS.x,e.TEMPLE_POS.z);let n=this.createGroundTexture(t?512:1024);n.wrapS=l,n.wrapT=l,n.repeat.set(64,64),n.colorSpace=Ke;let r=this.createGroundNormalMap(t?256:512);r.wrapS=l,r.wrapT=l,r.repeat.set(96,96);let i=new ro(this.size,this.size,this.segments,this.segments);i.rotateX(-Math.PI/2);let a=i.attributes.position;for(let e=0;e<a.count;e++){let t=a.getX(e),n=a.getZ(e),r=this.calculateHeight(t,n);a.setY(e,r),this.heightData[e]=r}i.computeVertexNormals();let o=new Z({map:n,normalMap:r,normalScale:new U(.65,.65),roughness:.82,metalness:.08,flatShading:!1});this.mesh=new J(i,o),this.mesh.receiveShadow=!0,this.mesh.castShadow=!1,this.group.add(this.mesh);let s=new ro(4800,4800,32,32);s.rotateX(-Math.PI/2),this.oceanTexture=this.createOceanTexture(t?512:1024),this.oceanTexture.wrapS=l,this.oceanTexture.wrapT=l,this.oceanTexture.repeat.set(48,48),this.oceanTexture.colorSpace=Ke;let c=new Z({color:556466,roughness:.08,metalness:.45,transparent:!0,opacity:.88,map:this.oceanTexture});this.oceanMesh=new J(s,c),this.oceanMesh.position.y=e.WATER_LEVEL,this.oceanMesh.receiveShadow=!1,this.group.add(this.oceanMesh)}computeRawHeight(t,n){let r=Math.sqrt(t*t+n*n),i=1;if(r>880){let e=(r-880)/170;i=Math.max(0,1-Math.min(1,e)),i=i*i*(3-2*i)}if(r>=1050)return-3.5;let a=Math.sin(t*.006)*Math.cos(n*.006)*12,o=Math.sin(t*.015+1.2)*Math.sin(n*.016-.8)*6.5,s=Math.cos(t*.04)*Math.sin(n*.038)*3.2,c=(Math.sin(t*.09)+Math.cos(n*.09))*1.2,l=(a+o+s+c)*i+6*i,u=Math.sqrt((t-15)*(t-15)+(n+180)*(n+180));if(u<260){let e=Math.max(0,1-u/260),r=e**2*36,i=Math.sin(t*.035)*Math.cos(n*.03)*7.5*e;l+=r+i}let d=Math.sqrt((t-e.SUMMIT_POS.x)**2+(n-e.SUMMIT_POS.z)**2);if(d<75){let e=Math.max(0,1-d/75);l+=e**1.8*16}let f=Math.sqrt((t-e.PORTAL_POS.x)**2+(n-e.PORTAL_POS.z)**2);if(f<55){let e=Math.max(0,1-f/55);l+=e**1.8*11}let p=Math.sqrt((t-260)**2+(n-40)**2);if(p<210){let e=Math.max(0,1-p/210);l+=Math.sin(t*.02)*Math.cos(n*.02)*8*e+e*10}let m=Math.sqrt((t-e.TEMPLE_POS.x)**2+(n-e.TEMPLE_POS.z)**2);if(m<50){let e=Math.max(0,1-m/50);l+=e**1.5*8.5}let h=Math.sqrt((t+240)**2+(n+40)**2);if(h<190){let e=Math.max(0,1-h/190);l+=Math.cos(t*.025)*Math.sin(n*.02)*7*e+e*9}let g=Math.sqrt((t-e.LAKE_CENTER.x)**2+(n-e.LAKE_CENTER.y)**2);if(g<e.LAKE_RADIUS+25){let t=Math.max(0,1-g/(e.LAKE_RADIUS+25))**1.4*6.5;l-=t}let _=(t+150)*.015,v=(n-220)*.015,y=Math.sqrt(_*_+v*v);if(y<1.4){let e=Math.cos(Math.PI/2.8*y);e>0&&(l-=e**1.5*7.5)}return r<880?Math.max(.6,l):H.lerp(Math.max(.6,l),-3.5,1-i)}calculateHeight(t,n){let r=this.computeRawHeight(t,n),i=Math.hypot(t-e.PORTAL_POS.x,n-e.PORTAL_POS.z);if(i<=26)return this.portalTerraceY;if(i<52){let e=(i-26)/26,t=e*e*(3-2*e);r=H.lerp(this.portalTerraceY,r,t)}let a=Math.hypot(t-e.TEMPLE_POS.x,n-e.TEMPLE_POS.z);if(a<=32)return this.templeTerraceY;if(a<56){let e=(a-32)/24,t=e*e*(3-2*e);r=H.lerp(this.templeTerraceY,r,t)}return r}getMeshHeightAt(e,t){let n=this.size*.5;if(e<-n||e>n||t<-n||t>n)return this.calculateHeight(e,t);let r=this.size/this.segments,i=(e+n)/r,a=(t+n)/r,o=Math.min(Math.max(Math.floor(i),0),this.segments-1),s=Math.min(Math.max(Math.floor(a),0),this.segments-1),c=Math.min(Math.max(i-o,0),1),l=Math.min(Math.max(a-s,0),1),u=this.segments+1,d=this.heightData[s*u+o],f=this.heightData[(s+1)*u+o],p=this.heightData[(s+1)*u+(o+1)],m=this.heightData[s*u+(o+1)];return c+l<=1?d+c*(m-d)+l*(f-d):p+(1-c)*(f-p)+(1-l)*(m-p)}isWaterAt(t,n){return this.getHeightAt(t,n)<e.WATER_LEVEL}getWaterDepthAt(t,n){let r=this.getHeightAt(t,n);return Math.max(0,e.WATER_LEVEL-r)}getHeightAt(e,t){if(this.floorHeightProvider){let n=this.floorHeightProvider(e,t);if(n!==null)return n}return this.getMeshHeightAt(e,t)}getNormalAt(e,t){if(this.floorHeightProvider&&this.floorHeightProvider(e,t)!==null)return new W(0,1,0);let n=.5,r=this.getMeshHeightAt(e-n,t),i=this.getMeshHeightAt(e+n,t),a=this.getMeshHeightAt(e,t-n),o=this.getMeshHeightAt(e,t+n),s=new W(r-i,2*n,a-o);return s.normalize(),s}update(t){this.oceanTexture&&(this.oceanTexture.offset.x=t*.012%1,this.oceanTexture.offset.y=t*.008%1),this.oceanMesh.position.y=e.WATER_LEVEL+Math.sin(t*.85)*.07}createGroundTexture(e=1024){let t=document.createElement(`canvas`);t.width=e,t.height=e;let n=t.getContext(`2d`);n.fillStyle=`#263b27`,n.fillRect(0,0,e,e);let r=e/1024,i=Math.round(24e3*r*r);for(let t=0;t<i;t++){let t=Math.random()*e,i=Math.random()*e,a=Math.random();n.fillStyle=a<.4?`#3a5732`:a<.7?`#1e2e1e`:a<.9?`#4c6b41`:`#7a7b5a`;let o=(1+Math.random()*3)*r,s=(1+Math.random()*4)*r;n.fillRect(t,i,Math.max(1,o),Math.max(1,s))}n.strokeStyle=`rgba(78, 175, 145, 0.12)`,n.lineWidth=Math.max(1.5,3*r);for(let t=0;t<12;t++){n.beginPath();let t=Math.random()*e,i=Math.random()*e;n.arc(t,i,(40+Math.random()*80)*r,0,Math.PI*1.5),n.stroke()}return new ki(t)}createGroundNormalMap(e=512){let t=document.createElement(`canvas`);t.width=e,t.height=e;let n=t.getContext(`2d`),r=n.createImageData(e,e),i=r.data;for(let e=0;e<i.length;e+=4){let t=128+Math.floor((Math.random()-.5)*45),n=128+Math.floor((Math.random()-.5)*45);i[e]=t,i[e+1]=n,i[e+2]=255,i[e+3]=255}return n.putImageData(r,0,0),new ki(t)}createOceanTexture(e=1024){let t=document.createElement(`canvas`);t.width=e,t.height=e;let n=t.getContext(`2d`),r=e/1024,i=n.createLinearGradient(0,0,e,e);i.addColorStop(0,`#005b8e`),i.addColorStop(.5,`#0077b6`),i.addColorStop(1,`#0096c7`),n.fillStyle=i,n.fillRect(0,0,e,e),n.strokeStyle=`rgba(72, 202, 228, 0.42)`,n.lineWidth=Math.max(1.2,2*r);let a=Math.round(900*r);for(let t=0;t<a;t++){n.beginPath();let t=Math.random()*e,i=Math.random()*e,a=(12+Math.random()*32)*r;n.ellipse(t,i,a,a*.48,Math.random()*Math.PI,0,Math.PI*2),n.stroke()}n.fillStyle=`rgba(202, 240, 248, 0.55)`;let o=Math.round(1200*r);for(let t=0;t<o;t++){let t=Math.random()*e,i=Math.random()*e,a=Math.max(1,(1.2+Math.random()*2.8)*r);n.fillRect(t,i,a,a)}n.strokeStyle=`rgba(255, 255, 255, 0.32)`,n.lineWidth=Math.max(.8,1.2*r);let s=Math.round(120*r);for(let t=0;t<s;t++){n.beginPath();let t=Math.random()*e,i=Math.random()*e;n.moveTo(t,i),n.bezierCurveTo(t+(20+Math.random()*30)*r,i+(Math.random()-.5)*15*r,t+(50+Math.random()*40)*r,i+(Math.random()-.5)*20*r,t+(90+Math.random()*50)*r,i+(Math.random()-.5)*15*r),n.stroke()}return new ki(t)}};Gu=$,Gu.WATER_LEVEL=1.6,Gu.LAKE_CENTER=new U(0,-15),Gu.LAKE_RADIUS=38,Gu.LAKE_WATER_Y=3.8,Gu.TEMPLE_POS=new W(-85,14,25),Gu.PORTAL_POS=new W(95,16,-30),Gu.SUMMIT_POS=new W(15,32,-100),Gu.SPAWN_POS=new W(0,5,80);var Ku,qu=class extends Mn{constructor(e=16777215,t=1,n=0,r=2){super(),this.color=new q(e),this.intensity=t,this.distance=n,this.decay=r,Ju.register(this)}dispose(){Ju.unregister(this)}},Ju=class e{static register(t){e.proxies.add(t)}static unregister(t){e.proxies.delete(t)}static clearAll(){e.proxies.clear()}constructor(t){this.pool=[],this.ranked=[],this.lastUpdateMs=-9999,this.scene=t;for(let t=0;t<e.MAX_POOL_SIZE;t++){let e=new ts(16777215,0,20,2);e.castShadow=!1,e.visible=!0,e.position.set(0,-500,0),this.scene.add(e),this.pool.push(e)}}isInVisibleHierarchy(e){let t=e;for(;t;){if(!t.visible)return!1;if(!t.parent)return t===this.scene;t=t.parent}return!1}update(t,n,r,i=!1){if(!i&&r-this.lastUpdateMs<85)return;this.lastUpdateMs=r;let a=Math.max(0,Math.min(e.MAX_POOL_SIZE,n));if(a===0){for(let e=0;e<this.pool.length;e++)this.pool[e].intensity=0;return}this.ranked.length=0,e.proxies.forEach(e=>{if(e.intensity<=.01||!this.isInVisibleHierarchy(e))return;i&&e.updateWorldMatrix(!0,!1);let n=e.matrixWorld.elements,r=n[12],a=n[13],o=n[14],s=r-t.x,c=a-t.y,l=o-t.z,u=s*s+c*c+l*l;u<=7225&&this.ranked.push({proxy:e,wx:r,wy:a,wz:o,distSq:u})}),this.ranked.length>1&&this.ranked.sort((e,t)=>e.distSq-t.distSq);let o=Math.min(a,this.ranked.length);for(let e=0;e<o;e++){let t=this.ranked[e],n=this.pool[e];n.position.set(t.wx,t.wy,t.wz),n.color.copy(t.proxy.color),n.intensity=t.proxy.intensity,n.distance=t.proxy.distance,n.decay=t.proxy.decay}for(let e=o;e<this.pool.length;e++)this.pool[e].intensity=0}};Ku=Ju,Ku.MAX_POOL_SIZE=8,Ku.proxies=new Set;var Yu=class{constructor(){this.sporeCount=180,this.sporeFrameSkip=0,this.group=new K;let e=new Pi($.LAKE_RADIUS,64);e.rotateX(-Math.PI/2);let t=new Z({color:1042391,emissive:355180,emissiveIntensity:.55,roughness:.1,metalness:.4,transparent:!0,opacity:.78,side:2});this.waterMesh=new J(e,t),this.waterMesh.position.set($.LAKE_CENTER.x,$.LAKE_WATER_Y,$.LAKE_CENTER.y),this.waterMesh.receiveShadow=!0,this.group.add(this.waterMesh),this.lakeLight=new qu(61666,4.2,70),this.lakeLight.position.set($.LAKE_CENTER.x,$.LAKE_WATER_Y+1.2,$.LAKE_CENTER.y),this.group.add(this.lakeLight),this.createLakeCrystals(),this.createLotusPads();let n=new Fr;this.sporePositions=new Float32Array(this.sporeCount*3),this.sporeSpeeds=new Float32Array(this.sporeCount);for(let e=0;e<this.sporeCount;e++){let t=Math.random()*Math.PI*2,n=Math.random()*($.LAKE_RADIUS-2);this.sporePositions[e*3]=$.LAKE_CENTER.x+Math.cos(t)*n,this.sporePositions[e*3+1]=$.LAKE_WATER_Y+Math.random()*8,this.sporePositions[e*3+2]=$.LAKE_CENTER.y+Math.sin(t)*n,this.sporeSpeeds[e]=.3+Math.random()*.7}n.setAttribute(`position`,new br(this.sporePositions,3));let r=new xi({size:.55,map:this.createSporeTexture(),transparent:!0,blending:2,depthWrite:!1,color:6619135});this.spores=new Ei(n,r),this.group.add(this.spores)}createLakeCrystals(){let e=new Fi(.5,2.8,5),t=new Z({color:65535,emissive:39372,emissiveIntensity:.9,roughness:.2,metalness:.8,transparent:!0,opacity:.92});for(let n=0;n<9;n++){let r=n/9*Math.PI*2+.3,i=($.LAKE_RADIUS-6)*(.4+Math.random()*.55),a=$.LAKE_CENTER.x+Math.cos(r)*i,o=$.LAKE_CENTER.y+Math.sin(r)*i,s=new K;s.position.set(a,$.LAKE_WATER_Y-.4,o);for(let n=0;n<4;n++){let n=new J(e,t),r=.6+Math.random()*.8;n.scale.set(r,r*(1+Math.random()*.5),r),n.rotation.x=(Math.random()-.5)*.5,n.rotation.z=(Math.random()-.5)*.5,n.rotation.y=Math.random()*Math.PI*2,n.position.set((Math.random()-.5)*1.5,r*2.8/2,(Math.random()-.5)*1.5),s.add(n)}this.group.add(s)}}createLotusPads(){let e=new X(1.2,1.2,.04,16),t=new Z({color:740155,roughness:.6,metalness:.1}),n=new Fi(.3,.6,6),r=new Z({color:65518,emissive:46296,emissiveIntensity:.85});for(let i=0;i<16;i++){let i=Math.random()*Math.PI*2,a=6+Math.random()*($.LAKE_RADIUS-10),o=$.LAKE_CENTER.x+Math.cos(i)*a,s=$.LAKE_CENTER.y+Math.sin(i)*a,c=new K;c.position.set(o,$.LAKE_WATER_Y+.02,s);let l=new J(e,t);l.scale.setScalar(.7+Math.random()*.5),c.add(l);let u=new J(n,r);u.position.y=.3,c.add(u),this.group.add(c)}}createSporeTexture(){let e=document.createElement(`canvas`);e.width=64,e.height=64;let t=e.getContext(`2d`),n=t.createRadialGradient(32,32,0,32,32,32);return n.addColorStop(0,`rgba(255, 255, 255, 1)`),n.addColorStop(.35,`rgba(0, 240, 255, 0.8)`),n.addColorStop(.7,`rgba(0, 150, 255, 0.3)`),n.addColorStop(1,`rgba(0, 0, 0, 0)`),t.fillStyle=n,t.fillRect(0,0,64,64),new ki(e)}update(e,t){let n=this.waterMesh.material;if(n.emissiveIntensity=.45+Math.sin(e*1.5)*.15,this.lakeLight.intensity=3.8+Math.sin(e*2)*.8,t){let e=t.x-$.LAKE_CENTER.x,n=t.z-$.LAKE_CENTER.y;if(e*e+n*n>12100)return}if(this.sporeFrameSkip=this.sporeFrameSkip+1&1,this.sporeFrameSkip!==0)return;let r=this.spores.geometry.attributes.position;for(let t=0;t<this.sporeCount;t++){let n=r.getY(t)+this.sporeSpeeds[t]*.07;n>$.LAKE_WATER_Y+9&&(n=$.LAKE_WATER_Y+.2),r.setY(t,n);let i=r.getX(t)+Math.sin(e+t)*.03,a=r.getZ(t)+Math.cos(e+t*.5)*.03;r.setX(t,i),r.setZ(t,a)}r.needsUpdate=!0}},Xu=class{applyQuality(e,t){this.group.traverse(t=>{t.isMesh&&(t.castShadow=e)});for(let e of this.hearthLights)e.visible=t;for(let e of this.streetLights)e.visible=t;for(let e of this.builtHouses)e.smokeParticles&&(e.smokeParticles.visible=t)}constructor(e){this.terrain=e,this.obstacles=[],this.builtHouses=[],this.hearthLights=[],this.streetLights=[],this.wellPosition=new W(50,0,42),this.scratchTablePos=new W,this.scratchWellPos=new W,this.group=new K,this.stoneWallMat=new Z({color:8553612,roughness:.9,metalness:.08,flatShading:!0}),this.timberPlankMat=new Z({color:5914152,roughness:.85,metalness:.04}),this.timberBeamMat=new Z({color:3811095,roughness:.92,metalness:.02}),this.floorMat=new Z({color:4731425,roughness:.78,metalness:.05}),this.glassWindowMat=new Z({color:16764006,emissive:16750882,emissiveIntensity:.72,roughness:.25,metalness:.1,transparent:!0,opacity:.88}),this.ironMat=new Z({color:2236966,roughness:.6,metalness:.75}),this.hearthFireMat=new Z({color:16733457,emissive:16729088,emissiveIntensity:1.2,roughness:.3}),this.cobblestoneMat=new Z({color:7237752,roughness:.92,metalness:.05,flatShading:!0});let t=this.getHouseConfigurations();for(let e of t)this.buildHouse(e);this.buildVillagePlazaAndStreets(),this.terrain.floorHeightProvider=(e,t)=>this.getFloorHeightAt(e,t)}getHouseConfigurations(){return[{id:`house_elder_hall`,nameAr:`قاعة حكماء القرية القديمة`,nameEn:`Village Elder Hall & Archive`,style:`large`,x:52,z:32,rotationY:-.25,width:9.6,depth:7.6,wallHeight:3.8,roofHeight:3.2,roofColor:3819606,wallColor:9079442,hasPorch:!0,hasChimney:!0,chimneySide:`left`,hasLoreBook:!0,loreTitleAr:`سجل حكماء القرية المنسية`,loreTitleEn:`Annals of the Whispering Sages`,loreTextAr:`«في قديم الزمان، كان أبناء هذه الجزيرة يصغون لنبض البلورات السبع، فتبوح لهم الأرض بأسرارها وتشفي قلوبهم بمواقد السلام...»`},{id:`house_alchemist`,nameAr:`مختبر الخيميائي العشبي`,nameEn:`Herbalist & Alchemist Haven`,style:`medium`,x:35,z:28,rotationY:.65,width:7.2,depth:5.6,wallHeight:3.2,roofHeight:2.5,roofColor:4877130,wallColor:14208168,hasPorch:!0,hasChimney:!0,chimneySide:`back`,hasLoreBook:!0,loreTitleAr:`ملاحظات الخيميائي عن زهور الأثير`,loreTitleEn:`Alchemist Field Notes on Aether Bloom`,loreTextAr:`«تتوهج الفطريات بالقرب من الصخور القديمة كلما هبت نسمات المساء، وقطرة واحدة من رحيقها تعيد الصفاء للروح المتعبة.»`},{id:`house_artisan`,nameAr:`محترف الحرفي والنحات`,nameEn:`Artisan Stone & Timber Workshop`,style:`medium`,x:69,z:26,rotationY:-.85,width:6.8,depth:5.4,wallHeight:3.1,roofHeight:2.4,roofColor:7224110,wallColor:8158852,hasPorch:!1,hasChimney:!0,chimneySide:`right`},{id:`house_meadow_cabin`,nameAr:`كوخ المرج الهادئ`,nameEn:`Peaceful Meadow Cottage`,style:`small`,x:36,z:48,rotationY:.35,width:5,depth:4.4,wallHeight:2.8,roofHeight:2,roofColor:5521456,wallColor:13944488,hasPorch:!0,hasChimney:!0,chimneySide:`left`},{id:`house_wayfarer_inn`,nameAr:`نُزل عابري السبيل الدافئ`,nameEn:`Wayfarer Rest & Hearth`,style:`medium`,x:65,z:46,rotationY:-.4,width:7,depth:5.8,wallHeight:3.2,roofHeight:2.5,roofColor:4016984,wallColor:14338480,hasPorch:!0,hasChimney:!0,chimneySide:`back`},{id:`house_weaver_cabin`,nameAr:`كوخ النسّاج القديم`,nameEn:`Weaver Cottage`,style:`small`,x:52,z:60,rotationY:3.05,width:4.8,depth:4.2,wallHeight:2.7,roofHeight:1.9,roofColor:6046256,wallColor:8422024,hasPorch:!1,hasChimney:!0,chimneySide:`right`},{id:`house_lakeside_fisher`,nameAr:`كوخ صياد بحيرة الضياء`,nameEn:`Bioluminescent Lake Fisher Cabin`,style:`lakeside`,x:-20,z:-56,rotationY:.15,width:5.6,depth:4.8,wallHeight:2.8,roofHeight:2.1,roofColor:3035212,wallColor:4732454,hasPorch:!0,hasChimney:!0,chimneySide:`left`},{id:`house_forest_hermit`,nameAr:`صومعة ناسك الغابة الخضراء`,nameEn:`Verdant Forest Hermitage`,style:`small`,x:-72,z:-32,rotationY:1.2,width:5,depth:4.6,wallHeight:2.8,roofHeight:2,roofColor:3691576,wallColor:5922904,hasPorch:!0,hasChimney:!0,chimneySide:`back`},{id:`house_highland_stargazer`,nameAr:`صومعة الراصد الجبلي العتيق`,nameEn:`Highland Stargazer Lodge`,style:`highland`,x:62,z:-68,rotationY:-.6,width:6.2,depth:5.2,wallHeight:3.1,roofHeight:2.4,roofColor:3555405,wallColor:7764096,hasPorch:!1,hasChimney:!0,chimneySide:`right`},{id:`house_valley_retreat`,nameAr:`كوخ الوادي الهادئ المستكن`,nameEn:`Secluded Valley Retreat`,style:`small`,x:-32,z:60,rotationY:-1.8,width:4.8,depth:4.4,wallHeight:2.7,roofHeight:1.9,roofColor:5784114,wallColor:14207654,hasPorch:!0,hasChimney:!0,chimneySide:`left`},{id:`house_windmill_miller`,nameAr:`كوخ طحّان طاحونة المرج`,nameEn:`Windmill Miller Haven`,style:`medium`,x:252,z:-42,rotationY:-.4,width:6.6,depth:5.4,wallHeight:3.1,roofHeight:2.4,roofColor:4873582,wallColor:13944488,hasPorch:!0,hasChimney:!0,chimneySide:`back`},{id:`house_coastal_cove_lodge`,nameAr:`نُزل مرفأ الخلجان الأزرق`,nameEn:`Azure Cove Harbor Lodge`,style:`lakeside`,x:-135,z:195,rotationY:.8,width:6.8,depth:5.5,wallHeight:3,roofHeight:2.3,roofColor:2837593,wallColor:5916212,hasPorch:!0,hasChimney:!0,chimneySide:`left`},{id:`house_mountain_refuge`,nameAr:`ملاذ قمة الجبال الشمالية`,nameEn:`Northern Alpine Refuge`,style:`highland`,x:105,z:-165,rotationY:-.7,width:6.4,depth:5.2,wallHeight:3.2,roofHeight:2.5,roofColor:4014925,wallColor:7238266,hasPorch:!1,hasChimney:!0,chimneySide:`right`},{id:`house_sylvan_hermit`,nameAr:`كوخ حارس الغابة العتيقة`,nameEn:`Deep Sylvan Sanctuary`,style:`small`,x:-185,z:-75,rotationY:1.5,width:5.2,depth:4.6,wallHeight:2.8,roofHeight:2,roofColor:2972220,wallColor:5396048,hasPorch:!0,hasChimney:!0,chimneySide:`back`}]}buildHouse(e){let t=new K,n=this.terrain.getHeightAt(e.x,e.z);t.position.set(e.x,n,e.z),t.rotation.y=e.rotationY;let r=Math.cos(e.rotationY),i=Math.sin(e.rotationY),a=.22,o=n+a,s=e.width/2,c=e.depth/2,l=e.style===`large`?2.2:e.style===`medium`?1.7:1.45,u=e.style===`large`?2.8:e.style===`medium`?2.4:2.25,d=new Z({color:e.roofColor,roughness:.86,metalness:.06,flatShading:!0}),f=new Z({color:e.wallColor,roughness:.9,metalness:.05}),p=1.1,m=new J(new Y(e.width+.35,p,e.depth+.35),this.stoneWallMat);m.position.y=a-p/2,m.receiveShadow=!0,t.add(m);let h=new J(new Y(e.width-.1,.08,e.depth-.1),this.floorMat);h.position.y=a,h.receiveShadow=!0,t.add(h);let g=.28,_=new J(new Y(e.width,e.wallHeight,g),f);_.position.set(0,a+e.wallHeight/2,-c+g/2),_.castShadow=!0,_.receiveShadow=!0,t.add(_);let v=s-l/2,y=new J(new Y(v,e.wallHeight,g),f);y.position.set(-s+v/2,a+e.wallHeight/2,c-g/2),y.castShadow=!0,y.receiveShadow=!0,t.add(y);let b=s-l/2,x=new J(new Y(b,e.wallHeight,g),f);x.position.set(s-b/2,a+e.wallHeight/2,c-g/2),x.castShadow=!0,x.receiveShadow=!0,t.add(x);let S=e.wallHeight-u;if(S>.05){let e=new J(new Y(l+.1,S,.32),this.timberBeamMat);e.position.set(0,a+u+S/2,c-g/2),e.castShadow=!0,t.add(e)}let C=new Y(.18,u,.32),w=new J(C,this.timberBeamMat);w.position.set(-l/2,a+u/2,c-g/2);let T=new J(C,this.timberBeamMat);T.position.set(l/2,a+u/2,c-g/2),t.add(w,T),this.buildSideWallWithWindows(t,-s+g/2,e,f,a),this.buildSideWallWithWindows(t,s-g/2,e,f,a);let E=new Y(.32,e.wallHeight+.1,.32),D=[[-s+.16,-c+.16],[s-.16,-c+.16],[-s+.16,c-.16],[s-.16,c-.16]];for(let[n,r]of D){let i=new J(E,this.timberBeamMat);i.position.set(n,a+e.wallHeight/2,r),i.castShadow=!0,t.add(i)}this.buildPitchedRoof(t,e,d,f,a);let O=.85,k=l+.7,A=new J(new Y(k,.18,O),this.stoneWallMat);A.position.set(0,.14,c+O/2-.05),A.receiveShadow=!0,t.add(A);let j=new J(new Y(k+.4,.12,O),this.stoneWallMat);j.position.set(0,0,c+O+.15),j.receiveShadow=!0,t.add(j),e.hasPorch&&this.buildPorchCanopy(t,e,d,a,l);let M=new W(0,a,0),N=null,ee,P,te;if(e.hasChimney!==!1){let n=this.buildChimneyAndHearth(t,e,a);M=n.hearthPos,N=n.smokePoints,ee=n.smokePositions,P=n.smokeVelocities,te=n.smokeLifetimes}this.buildInteriorFurniture(t,e,a,l,M),this.buildExteriorDecor(t,e,a,l),this.group.add(t);let ne=c+.2,re=new W(e.x+(0*r+ne*i),o,e.z+(-0*i+ne*r)),ie=new W(e.x+(M.x*r+M.z*i),o,e.z+(-M.x*i+M.z*r));this.generateWallObstacles(e,o,l),this.builtHouses.push({config:e,group:t,baseY:n,floorY:o,doorWorldPos:re,hearthWorldPos:ie,cosR:r,sinR:i,smokeParticles:N,smokePositions:ee,smokeVelocities:P,smokeLifetimes:te})}buildSideWallWithWindows(e,t,n,r,i){let a=.28,o=n.depth/2,s=1.1,c=1.15,l=i+1.25,u=(n.depth-s)/2,d=new J(new Y(a,n.wallHeight,u),r);d.position.set(t,i+n.wallHeight/2,-o+u/2),d.castShadow=!0,d.receiveShadow=!0;let f=new J(new Y(a,n.wallHeight,u),r);f.position.set(t,i+n.wallHeight/2,o-u/2),f.castShadow=!0,f.receiveShadow=!0;let p=l-i-c/2,m=new J(new Y(a,p,s),r);m.position.set(t,i+p/2,0);let h=n.wallHeight-(l-i+c/2),g=new J(new Y(a,h,s),r);g.position.set(t,i+n.wallHeight-h/2,0);let _=new J(new Y(.06,1.0699999999999998,1.02),this.glassWindowMat);_.position.set(t,l,0);let v=new Y(.34,c,.08),y=new J(v,this.timberBeamMat);y.position.set(t,l+c/2,0);let b=new J(v,this.timberBeamMat);b.position.set(t,l-c/2,0);let x=new J(new Y(.32,c,.06),this.timberBeamMat);x.position.set(t,l,0);let S=new Y(.04,c,.35),C=new J(S,this.timberPlankMat);C.position.set(t+(t>0?.16:-.16),l,-1.1/2-.18);let w=new J(S,this.timberPlankMat);w.position.set(t+(t>0?.16:-.16),l,.73),e.add(d,f,m,g,_,y,b,x,C,w)}buildPitchedRoof(e,t,n,r,i){let a=t.width/2,o=t.depth/2,s=i+t.wallHeight,c=s+t.roofHeight,l=.55,u=Math.sqrt((a+l)**2+t.roofHeight**2),d=Math.atan2(t.roofHeight,a+l),f=.14,p=t.depth+l*2,m=new J(new Y(u,f,p),n);m.position.set(-(a+l)/2,s+t.roofHeight/2,0),m.rotation.z=d,m.castShadow=!0,m.receiveShadow=!0;let h=new J(new Y(u,f,p),n);h.position.set((a+l)/2,s+t.roofHeight/2,0),h.rotation.z=-d,h.castShadow=!0,h.receiveShadow=!0;let g=new J(new Y(.24,.24,p+.2),this.timberBeamMat);g.position.set(0,c+.05,0),g.castShadow=!0;let _=new ma;_.moveTo(-a,0),_.lineTo(0,t.roofHeight),_.lineTo(a,0),_.closePath();let v=new Qa(_,{depth:.26,bevelEnabled:!1}),y=new J(v,r);y.position.set(0,s,o-.26),y.castShadow=!0;let b=new J(v,r);b.position.set(0,s,-o),b.castShadow=!0,e.add(m,h,g,y,b)}buildPorchCanopy(e,t,n,r,i){let a=t.depth/2,o=1.3,s=i+1.2,c=2.4,l=new J(new Y(s,.1,o),n);l.position.set(0,r+c+.15,a+o/2),l.rotation.x=-.18,l.castShadow=!0;let u=new X(.08,.09,c,7),d=new J(u,this.timberBeamMat);d.position.set(-s/2+.15,r+c/2,a+o-.15),d.castShadow=!0;let f=new J(u,this.timberBeamMat);f.position.set(s/2-.15,r+c/2,a+o-.15),f.castShadow=!0;let p=this.createHangingLantern();p.position.set(0,r+c-.2,a+o*.45),e.add(l,d,f,p)}buildChimneyAndHearth(e,t,n){let r=t.width/2,i=t.depth/2,a=1.1,o=t.wallHeight+t.roofHeight+1.2,s=0,c=0,l=0,u=0,d=t.chimneySide||`left`;d===`left`?(s=-r-a/2+.2,c=-i*.35,l=-r+.65,u=c):d===`right`?(s=r+a/2-.2,c=-i*.35,l=r-.65,u=c):(s=0,c=-i-a/2+.2,l=0,u=-i+.65);let f=new J(new Y(1.3,o,a),this.stoneWallMat);f.position.set(s,n+o/2-.4,c),f.castShadow=!0,f.receiveShadow=!0;let p=new J(new Y(1.5,.16,1.3),this.stoneWallMat);p.position.set(s,n+o-.3,c),f.add(p),e.add(f);let m=new K;m.position.set(l,n,u);let h=new J(new Y(1.4,1.2,.7),this.stoneWallMat);h.position.y=.6,h.castShadow=!0,m.add(h);let g=new J(new Y(.85,.7,.45),new qr({color:1380880}));g.position.set(0,.42,.15),m.add(g);let _=new J(new Li(.24,0),this.hearthFireMat);_.position.set(0,.22,.15),m.add(_);let v=new qu(16742178,1.6,7.5,1.8);v.position.set(l,n+.55,u+.2),e.add(v),this.hearthLights.push(v),e.add(m);let y=new Fr,b=new Float32Array(84),x=new Float32Array(84),S=new Float32Array(28),C=n+o-.2;for(let e=0;e<28;e++)b[e*3+0]=s+(Math.random()-.5)*.25,b[e*3+1]=C+Math.random()*2.5,b[e*3+2]=c+(Math.random()-.5)*.25,x[e*3+0]=(Math.random()-.5)*.18+.12,x[e*3+1]=.45+Math.random()*.35,x[e*3+2]=(Math.random()-.5)*.18,S[e]=Math.random();y.setAttribute(`position`,new br(b,3));let w=new Ei(y,new xi({color:13158608,size:.42,transparent:!0,opacity:.38,blending:1,depthWrite:!1}));return e.add(w),{hearthPos:new W(l,n,u),smokePoints:w,smokePositions:b,smokeVelocities:x,smokeLifetimes:S}}buildInteriorFurniture(e,t,n,r,i){let a=t.width/2,o=t.depth/2,s=a-1.15,c=-o+1.25,l=new K;l.position.set(s,n,c);let u=new J(new Y(1.3,.4,2.1),this.timberPlankMat);u.position.y=.2,u.castShadow=!0,l.add(u);let d=new Z({color:t.style===`large`?9055202:t.style===`lakeside`?1788261:10893860,roughness:.85}),f=new J(new Y(1.15,.22,1.95),d);f.position.y=.45,l.add(f);let p=new Z({color:15592420,roughness:.9}),m=new J(new Y(.9,.16,.48),p);m.position.set(0,.58,-.65),l.add(m);let h=new J(new Y(1.3,.95,.12),this.timberBeamMat);h.position.set(0,.55,-1),l.add(h),e.add(l);let g=t.style===`large`?-1.2:-a+1.6,_=new K;_.position.set(g,n,.2);let v=t.style===`large`?2.4:1.5,y=t.style===`large`?1.2:.9,b=new J(new Y(v,.1,y),this.timberPlankMat);b.position.y=.82,b.castShadow=!0,_.add(b);let x=new X(.06,.06,.8,6),S=[[-v/2+.12,-y/2+.12],[v/2-.12,-y/2+.12],[-v/2+.12,y/2-.12],[v/2-.12,y/2-.12]];for(let[e,t]of S){let n=new J(x,this.timberBeamMat);n.position.set(e,.4,t),n.castShadow=!0,_.add(n)}let C=new X(.24,.26,.48,8),w=new J(C,this.timberBeamMat);w.position.set(0,.24,y/2+.35);let T=new J(C,this.timberBeamMat);T.position.set(0,.24,-y/2-.35),_.add(w,T);let E=new J(new Fi(.12,.24,8),new Z({color:62932,emissive:62932,emissiveIntensity:.8,roughness:.2}));E.position.set(-.35,.96,.1),_.add(E);let D=new J(new X(.06,.06,.32,8),new Z({color:15129791,roughness:.9}));if(D.rotation.z=Math.PI/2,D.position.set(.25,.9,-.1),_.add(D),t.hasLoreBook){let e=new J(new Y(.32,.08,.42),new Z({color:10182117,emissive:6171543,emissiveIntensity:.4}));e.position.set(.15,.91,.15),_.add(e)}e.add(_);let O=t.style===`large`?-a+.4:a-.4,k=t.style===`large`?-1:o-1.4,A=new K;A.position.set(O,n,k),t.style===`large`&&(A.rotation.y=Math.PI/2);let j=1.6,M=2.2,N=.42,ee=new J(new Y(j,M,.08),this.timberBeamMat);ee.position.y=M/2,A.add(ee);let P=new Y(j,.06,N);for(let e=0;e<4;e++){let t=new J(P,this.timberPlankMat);t.position.set(0,.3+e*.55,N/2-.04),A.add(t);let n=[11680571,3042127,3889560,13938487];for(let t=0;t<6;t++){let r=new J(new Y(.08,.35+t%3*.05,.24),new Z({color:n[(e+t)%n.length]}));r.position.set(-.55+t*.16,.3+e*.55+.2,N/2-.04),A.add(r)}}e.add(A);let te=new K;te.position.set(s,n,c+1.4);let ne=new J(new Y(.85,.45,.52),this.timberPlankMat);ne.position.y=.23,ne.castShadow=!0;let re=new J(new X(.26,.26,.85,12,1,!1,0,Math.PI),this.timberBeamMat);re.rotation.z=Math.PI/2,re.position.y=.46,te.add(ne,re),e.add(te)}buildExteriorDecor(e,t,n,r){let i=t.width/2,a=t.depth/2,o=this.createHangingLantern();o.position.set(r/2+.45,n+2.1,a+.18),e.add(o);let s=1.3,c=new J(new Y(s,.22,.32),this.timberPlankMat);c.position.set(-i+s/2+.2,n+1.1,a+.15),c.castShadow=!0;let l=[16739179,16704576,62932,10182117];for(let e=0;e<5;e++){let t=new J(new Li(.1,0),new Z({color:l[e%l.length]}));t.position.set(-.45+e*.22,.18,(Math.random()-.5)*.1),c.add(t)}e.add(c);let u=new J(new X(.32,.36,.78,10),this.timberPlankMat);u.position.set(i-.5,n+.39,a+.65),u.castShadow=!0,e.add(u);let d=new X(.08,.08,.9,6);d.rotateZ(Math.PI/2);for(let t=0;t<4;t++){let r=new J(d,this.timberBeamMat);r.position.set(-i-.35,n+.1+t*.14,-a+1.2+t%2*.1),r.castShadow=!0,e.add(r)}}createHangingLantern(){let e=new K,t=new J(new Fi(.18,.12,6),this.ironMat);t.position.y=.18;let n=new J(new X(.14,.14,.06,6),this.ironMat);n.position.y=-.16;let r=new J(new X(.11,.11,.26,6),new Z({color:16757575,emissive:16755234,emissiveIntensity:1.1,transparent:!0,opacity:.92}));return r.position.y=.01,e.add(t,n,r),e}generateWallObstacles(e,t,n){let r=e.width/2,i=e.depth/2,a=Math.cos(e.rotationY),o=Math.sin(e.rotationY),s=(t,n)=>({x:e.x+(t*a+n*o),z:e.z+(-t*o+n*a)}),c=.55,l=Math.ceil(e.width/1);for(let t=0;t<=l;t++){let n=s(-r+e.width/l*t,-i);this.obstacles.push({x:n.x,z:n.z,radius:c})}let u=Math.ceil(e.depth/1);for(let t=0;t<=u;t++){let n=s(-r,-i+e.depth/u*t);this.obstacles.push({x:n.x,z:n.z,radius:c})}for(let t=0;t<=u;t++){let n=s(r,-i+e.depth/u*t);this.obstacles.push({x:n.x,z:n.z,radius:c})}let d=r+(-n/2-.15);if(d>.4){let e=Math.max(1,Math.ceil(d/.9));for(let t=0;t<=e;t++){let n=s(-r+d/e*t,i);this.obstacles.push({x:n.x,z:n.z,radius:c})}}let f=n/2+.15,p=r-f;if(p>.4){let e=Math.max(1,Math.ceil(p/.9));for(let t=0;t<=e;t++){let n=s(f+p/e*t,i);this.obstacles.push({x:n.x,z:n.z,radius:c})}}if(e.hasChimney!==!1){let t=e.chimneySide||`left`,n=0,a=0;t===`left`?(n=-r+.65,a=-i*.35):t===`right`?(n=r-.65,a=-i*.35):(n=0,a=-i+.65);let o=s(n,a);this.obstacles.push({x:o.x,z:o.z,radius:.65})}}buildVillagePlazaAndStreets(){let e=new W(50,0,42);e.y=this.terrain.getHeightAt(e.x,e.z),this.wellPosition.copy(e);let t=new Pi(6.5,24);t.rotateX(-Math.PI/2);let n=new J(t,this.cobblestoneMat);n.position.set(e.x,e.y+.05,e.z),n.receiveShadow=!0,this.group.add(n);let r=new K;r.position.copy(e);let i=new J(new X(1.25,1.35,.85,14,1,!0),this.stoneWallMat);i.position.y=.42,i.castShadow=!0,i.receiveShadow=!0;let a=new Pi(1.2,12);a.rotateX(-Math.PI/2);let o=new J(a,new Z({color:62932,emissive:48121,emissiveIntensity:.5,roughness:.1}));o.position.y=.32;let s=new Y(.16,2.2,.16),c=new J(s,this.timberBeamMat);c.position.set(-1,1.1,0);let l=new J(s,this.timberBeamMat);l.position.set(1,1.1,0);let u=new J(new Y(2.3,.18,.18),this.timberBeamMat);u.position.set(0,2.1,0);let d=new J(new Fi(1.65,.95,6),new Z({color:4862496,roughness:.88}));d.position.set(0,2.55,0);let f=new J(new X(.02,.02,1.2,5),new qr({color:12491643}));f.position.set(0,1.45,0);let p=new J(new X(.2,.16,.32,8),this.timberPlankMat);p.position.set(0,.75,0),r.add(i,o,c,l,u,d,f,p),this.group.add(r),this.obstacles.push({x:e.x,z:e.z,radius:1.45});let m=[new W(e.x-3.8,0,e.z-2.5),new W(e.x+3.8,0,e.z+2.5)];for(let t of m){t.y=this.terrain.getHeightAt(t.x,t.z);let n=this.createStoneBench();n.position.copy(t),n.lookAt(e.x,t.y,e.z),this.group.add(n)}let h=this.createDirectionalSignpost();h.position.set(e.x+2.8,this.terrain.getHeightAt(e.x+2.8,e.z-3.5),e.z-3.5),this.group.add(h),this.buildCobblestoneStreets(e);let g=[new U(44,36),new U(58,38),new U(48,52),new U(38,40),new U(62,54),new U(50,22)];for(let e of g){let t=this.terrain.getHeightAt(e.x,e.y),n=this.createCarvedStreetlamp();n.position.set(e.x,t,e.y),this.group.add(n);let r=new qu(16756804,1.25,9.5,1.6);r.position.set(e.x,t+2.8,e.y),this.group.add(r),this.streetLights.push(r)}}buildCobblestoneStreets(e){let t=[[e.x,e.z,52,34,2.8],[52,34,38,30,2.4],[52,34,66,28,2.4],[e.x,e.z,50,56,2.8],[50,56,38,50,2.4],[50,56,62,48,2.4],[50,56,52,62,2.4],[50,62,42,74,3.2],[42,74,18,80,3.2],[38,30,22,18,2.8],[22,18,5,2,2.8]];for(let[e,n,r,i,a]of t){let t=r-e,o=i-n,s=Math.sqrt(t*t+o*o),c=Math.atan2(t,o),l=new ro(a,s,2,Math.max(2,Math.floor(s/3)));l.rotateX(-Math.PI/2);let u=l.attributes.position,d=(e+r)/2,f=(n+i)/2;for(let e=0;e<u.count;e++){let t=u.getX(e),n=u.getZ(e),r=d+(t*Math.cos(c)+n*Math.sin(c)),i=f+(-t*Math.sin(c)+n*Math.cos(c)),a=this.terrain.getHeightAt(r,i)+.04;u.setY(e,a-this.terrain.getHeightAt(d,f))}l.computeVertexNormals();let p=new J(l,this.cobblestoneMat);p.position.set(d,this.terrain.getHeightAt(d,f),f),p.rotation.y=c,p.receiveShadow=!0,this.group.add(p)}}createStoneBench(){let e=new K,t=new J(new Y(1.6,.16,.55),this.stoneWallMat);t.position.y=.45,t.castShadow=!0;let n=new Y(.3,.4,.48),r=new J(n,this.stoneWallMat);r.position.set(-.6,.2,0);let i=new J(n,this.stoneWallMat);return i.position.set(.6,.2,0),e.add(t,r,i),e}createDirectionalSignpost(){let e=new K,t=new J(new X(.1,.12,2.6,8),this.timberBeamMat);t.position.y=1.3,t.castShadow=!0;let n=new Y(1.1,.22,.06),r=new J(n,this.timberPlankMat);r.position.set(.45,2.2,0),r.rotation.y=.2;let i=new J(n,this.timberPlankMat);i.position.set(-.45,1.85,0),i.rotation.y=2.4;let a=new J(n,this.timberPlankMat);return a.position.set(.4,1.5,0),a.rotation.y=-1.2,e.add(t,r,i,a),e}createCarvedStreetlamp(){let e=new K,t=new J(new X(.12,.16,3.2,8),this.timberBeamMat);t.position.y=1.6,t.castShadow=!0;let n=new J(new Y(.55,.08,.08),this.ironMat);n.position.set(.24,3,0);let r=this.createHangingLantern();return r.position.set(.48,2.8,0),e.add(t,n,r),e}getFloorHeightAt(e,t){for(let n=0;n<this.builtHouses.length;n++){let r=this.builtHouses[n],i=r.config,a=e-i.x,o=t-i.z,s=a*r.cosR-o*r.sinR,c=a*r.sinR+o*r.cosR,l=i.width/2,u=i.depth/2;if(Math.abs(s)<=l-.1&&Math.abs(c)<=u-.1)return r.floorY;let d=i.style===`large`?2.2:i.style===`medium`?1.7:1.45;if(Math.abs(s)<=d/2+.35&&c>=u-.15&&c<=u+1.6){let n=(u+1.6-c)/1.75,i=this.terrain.calculateHeight(e,t);return H.lerp(i,r.floorY,Math.max(0,Math.min(1,n)))}}return null}static isNearAnyHouse(e,t,n=7){for(let r of[{x:52,z:32,r:7.5},{x:35,z:28,r:6.5},{x:69,z:26,r:6.5},{x:36,z:48,r:5.5},{x:65,z:46,r:6.5},{x:52,z:60,r:5.5},{x:50,z:42,r:7},{x:-20,z:-56,r:6},{x:-72,z:-32,r:5.5},{x:62,z:-68,r:6.5},{x:-32,z:60,r:5.5},{x:252,z:-42,r:6.5},{x:-135,z:195,r:6.5},{x:105,z:-165,r:6.5},{x:-185,z:-75,r:5.5}])if(Math.sqrt((e-r.x)**2+(t-r.z)**2)<r.r+n)return!0;return!1}findClosestInteraction(e,t=3.8){let n=null,r=t;for(let t of this.builtHouses){let i=e.distanceTo(t.hearthWorldPos);if(i<r&&(r=i,n={id:`hearth_${t.config.id}`,type:`hearth`,titleAr:`موقد ${t.config.nameAr}`,titleEn:`Hearth of ${t.config.nameEn}`,actionAr:`استرح بجانب الموقد واستعد طاقتك`,actionEn:`Rest by Warm Hearth & Heal`,pos:t.hearthWorldPos,dist:i,color:16742178,data:t}),t.config.hasLoreBook){let i=t.config.style===`large`?-1.2:-t.config.width/2+1.6,a=t.config.x+(i*t.cosR+.2*t.sinR),o=t.config.z+(-i*t.sinR+.2*t.cosR);this.scratchTablePos.set(a,t.floorY+.8,o);let s=e.distanceTo(this.scratchTablePos);s<r&&(r=s,n={id:`book_${t.config.id}`,type:`village_lore`,titleAr:t.config.loreTitleAr||`سجل المخطوطات القديمة`,titleEn:t.config.loreTitleEn||`Ancient Village Manuscript`,actionAr:`اقرأ مذكرات سكان الجزيرة`,actionEn:`Read Island Dwellers Lore`,pos:this.scratchTablePos,dist:s,color:10182117,data:t.config})}}let i=e.distanceTo(this.wellPosition);return i<r&&(r=i,this.scratchWellPos.copy(this.wellPosition),this.scratchWellPos.y+=.8,n={id:`village_well`,type:`well`,titleAr:`بئر مياه الأثير العتيق`,titleEn:`Ancient Aether Village Well`,actionAr:`اشرب من مياه الأثير العذبة`,actionEn:`Drink Pure Spring Water`,pos:this.scratchWellPos,dist:i,color:62932,data:null}),n}getMinimapHouseBlips(){return this.builtHouses.map(e=>({x:e.config.x,z:e.config.z,style:e.config.style,nameAr:e.config.nameAr}))}update(e,t,n){for(let e=0;e<this.hearthLights.length;e++){let n=this.hearthLights[e];n.intensity=1.6+(Math.sin(t*7.5+e*1.7)*.2+Math.cos(t*11.2+e*2.3)*.12)}for(let t of this.builtHouses){if(!t.smokeParticles||!t.smokeParticles.visible||!t.smokePositions||!t.smokeVelocities||!t.smokeLifetimes)continue;if(n){let e=t.config.x-n.x,r=t.config.z-n.z;if(e*e+r*r>9025)continue}let r=t.smokeLifetimes.length,i=t.smokePositions,a=t.smokeVelocities,o=t.smokeLifetimes,s=t.config.wallHeight+t.config.roofHeight+1.2,c=t.floorY+s-.2;for(let n=0;n<r;n++)o[n]+=e*.45,i[n*3+0]+=a[n*3+0]*e,i[n*3+1]+=a[n*3+1]*e,i[n*3+2]+=a[n*3+2]*e,o[n]>=1&&(o[n]=0,i[n*3+0]=(Math.random()-.5)*.25,i[n*3+1]=c-t.baseY,i[n*3+2]=(Math.random()-.5)*.25);t.smokeParticles.geometry.attributes.position.needsUpdate=!0}}dispose(){this.stoneWallMat.dispose(),this.timberPlankMat.dispose(),this.timberBeamMat.dispose(),this.floorMat.dispose(),this.glassWindowMat.dispose(),this.ironMat.dispose(),this.hearthFireMat.dispose(),this.cobblestoneMat.dispose()}},Zu=-Math.PI*.65,Qu=$.PORTAL_POS.x+13.2*Math.sin(Zu),$u=$.PORTAL_POS.z+13.2*Math.cos(Zu),ed=class{constructor(e){this.obstacles=[],this.windmillSails=null,this.roadLanterns=[],this.treeGroup=new K,this.instancedGrass=null,this.instancedFlowers=null,this.instancedBlueFlowers=null,this.instancedBushes=null,this.fullGrassCount=0,this.fullFlowerCount=0,this.fullBlueFlowerCount=0,this.fullBushCount=0,this.roadBranches=[[[0,78],[15,65],[32,52],[48,42]],[[48,42],[35,25],[18,10],[2,-2]],[[25,-8],[48,-16],[68,-26],[Qu,$u]],[[80,36],[130,22],[180,5],[225,-15]],[[-25,2],[-48,14],[-62,23]],[[-5,-35],[5,-65],[15,-92]]],this.group=new K,this.spawnVastForestTrees(e),this.spawnInstancedGrassAndFlora(e),this.spawnRoadsAndTrailMarkers(e),this.spawnHillsideWindmill(e),this.spawnMountainWatchtower(e),this.spawnCoastalFishingPier(),this.spawnAncientStandingMonoliths(e),this.spawnBoulders(e),this.spawnGlowingMushrooms(e),this.spawnColossalElderTree(e)}distToSegment(e,t,n,r,i,a){let o=i-n,s=a-r,c=e-n,l=t-r,u=o*o+s*s;if(u<=1e-6)return Math.hypot(c,l);let d=Math.max(0,Math.min(1,(c*o+l*s)/u)),f=n+d*o,p=r+d*s;return Math.hypot(e-f,t-p)}isNearRoadCorridor(e,t,n){for(let r of this.roadBranches)for(let i=0;i<r.length-1;i++){let[a,o]=r[i],[s,c]=r[i+1];if(this.distToSegment(e,t,a,o,s,c)<n)return!0}return!1}isBlockedForNature(e,t,n,r=0){return!!(Math.hypot(e-$.LAKE_CENTER.x,t-$.LAKE_CENTER.y)<$.LAKE_RADIUS+8||Math.hypot(e-$.SPAWN_POS.x,t-$.SPAWN_POS.z)<12+r||Math.hypot(e-$.TEMPLE_POS.x,t-$.TEMPLE_POS.z)<25+r||Math.hypot(e-$.PORTAL_POS.x,t-$.PORTAL_POS.z)<25+r||Math.hypot(e-Qu,t-$u)<11+r||Math.hypot(e+45,t+65)<9||Math.hypot(e-235,t+25)<10||Math.hypot(e-85,t+185)<8||Math.hypot(e+210,t+50)<10||Xu.isNearAnyHouse(e,t,5.2+r)||this.isNearRoadCorridor(e,t,n))}applyQuality(e,t,n){this.treeGroup.traverse(t=>{t.isMesh&&(t.castShadow=e)}),this.instancedGrass&&this.fullGrassCount>0&&(this.instancedGrass.count=Math.max(10,Math.floor(this.fullGrassCount*t))),this.instancedFlowers&&this.fullFlowerCount>0&&(this.instancedFlowers.count=Math.max(5,Math.floor(this.fullFlowerCount*t))),this.instancedBlueFlowers&&this.fullBlueFlowerCount>0&&(this.instancedBlueFlowers.count=Math.max(5,Math.floor(this.fullBlueFlowerCount*t))),this.instancedBushes&&this.fullBushCount>0&&(this.instancedBushes.count=Math.max(8,Math.floor(this.fullBushCount*t)));for(let e of this.roadLanterns)e.visible=n}spawnVastForestTrees(e){let t=new Z({color:4862496,roughness:.9,metalness:.05}),n=new Z({color:14473423,roughness:.85,metalness:.04}),r=new Z({color:1920306,roughness:.8}),i=new Z({color:13733414,roughness:.75}),a=new Z({color:3105594,roughness:.82}),o=[],s=[],c=[];for(let t=0;t<1150;t++){let t=Math.random()*Math.PI*2,n=24+Math.random()**.82*760,r=Math.cos(t)*n,i=Math.sin(t)*n;if(this.isBlockedForNature(r,i,5.8,1.5))continue;let a=e.getMeshHeightAt(r,i);if(a<2.3||a>46)continue;let l=r>120&&i>-80&&Math.random()<.38,u=!l&&(a>11.5||Math.random()<.52),d=(u?1:.88)+Math.random()*.55,f=1+Math.random()*.35,p={x:r,y:a,z:i,scale:d,rotY:Math.random()*Math.PI*2,scaleYMult:f};l?s.push(p):u?o.push(p):c.push(p),this.obstacles.push({x:r,z:i,radius:.85*d})}let l=new Mn,u=new Mn;if(this.treeGroup=new K,l.add(u),o.length>0){let e=o.length,n=new gi(new X(.3,.62,7.35,6),t,e);n.castShadow=!0,n.receiveShadow=!0;let i=[];for(let t=0;t<5;t++){let n=new gi(new Fi(2.8-t*.42,2.6-t*.25,7),r,e);n.castShadow=t===0,n.receiveShadow=!0,i.push(n)}for(let t=0;t<e;t++){let e=o[t];l.position.set(e.x,e.y,e.z),l.rotation.set(0,e.rotY,0),l.scale.set(e.scale,e.scale*e.scaleYMult,e.scale),l.updateMatrixWorld(!0),u.position.set(0,2.925,0),u.rotation.set(0,0,0),u.scale.set(1,1,1),u.updateMatrix(),n.setMatrixAt(t,u.matrixWorld);for(let e=0;e<5;e++)u.position.set(0,4.092+e*1.45,0),u.rotation.set(0,e*Math.PI/4,0),u.scale.set(1,1,1),u.updateMatrix(),i[e].setMatrixAt(t,u.matrixWorld)}n.instanceMatrix.needsUpdate=!0,n.computeBoundingSphere(),this.treeGroup.add(n);for(let e of i)e.instanceMatrix.needsUpdate=!0,e.computeBoundingSphere(),this.treeGroup.add(e)}if(s.length>0){let e=s.length,t=new gi(new X(.26,.52,6.15,6),n,e);t.castShadow=!0,t.receiveShadow=!0;let r=[];for(let t=0;t<4;t++){let n=new gi(new Li(1.55-t*.2,0),i,e);n.castShadow=t===0,n.receiveShadow=!0,r.push(n)}for(let n=0;n<e;n++){let e=s[n];l.position.set(e.x,e.y,e.z),l.rotation.set(0,e.rotY,0),l.scale.set(e.scale,e.scale*e.scaleYMult,e.scale),l.updateMatrixWorld(!0),u.position.set(0,2.325,0),u.rotation.set(0,0,0),u.scale.set(1,1,1),u.updateMatrix(),t.setMatrixAt(n,u.matrixWorld);for(let e=0;e<4;e++)u.position.set(e===1?.4:e===2?-.35:0,5.4*.92+e*.95,e===1?-.3:e===3?.2:0),u.rotation.set(0,e*Math.PI/5,0),u.scale.set(1.15,.95,1.15),u.updateMatrix(),r[e].setMatrixAt(n,u.matrixWorld)}t.instanceMatrix.needsUpdate=!0,t.computeBoundingSphere(),this.treeGroup.add(t);for(let e of r)e.instanceMatrix.needsUpdate=!0,e.computeBoundingSphere(),this.treeGroup.add(e)}if(c.length>0){let e=c.length,n=new gi(new X(.34,.65,5.35,6),t,e);n.castShadow=!0,n.receiveShadow=!0;let r=[];for(let t=0;t<4;t++){let n=new gi(new Fi(2.8-t*.45,2.3-t*.25,7),a,e);n.castShadow=t===0,n.receiveShadow=!0,r.push(n)}for(let t=0;t<e;t++){let e=c[t];l.position.set(e.x,e.y,e.z),l.rotation.set(0,e.rotY,0),l.scale.set(e.scale,e.scale*e.scaleYMult,e.scale),l.updateMatrixWorld(!0),u.position.set(0,1.9249999999999998,0),u.rotation.set(0,0,0),u.scale.set(1,1,1),u.updateMatrix(),n.setMatrixAt(t,u.matrixWorld);for(let e=0;e<4;e++)u.position.set(0,4.048+e*1.25,0),u.rotation.set(0,e*Math.PI/4,0),u.scale.set(1,1,1),u.updateMatrix(),r[e].setMatrixAt(t,u.matrixWorld)}n.instanceMatrix.needsUpdate=!0,n.computeBoundingSphere(),this.treeGroup.add(n);for(let e of r)e.instanceMatrix.needsUpdate=!0,e.computeBoundingSphere(),this.treeGroup.add(e)}this.group.add(this.treeGroup)}spawnInstancedGrassAndFlora(e){let t=new Mn,n=2600,r=new Fi(.3,.85,4);r.translate(0,.32,0);let i=new gi(r,new Z({color:3902538,roughness:.85,metalness:.02,flatShading:!0}),n),a=0;for(let r=0;r<n;r++){let n=Math.random()*Math.PI*2,r=10+Math.random()**.72*740,o=Math.cos(n)*r,s=Math.sin(n)*r;if(this.isBlockedForNature(o,s,3,-3))continue;let c=e.getMeshHeightAt(o,s);if(c<2.1||c>38)continue;let l=.65+Math.random()*.85,u=.75+Math.random()*.65;t.position.set(o,c,s),t.scale.set(u,l,u),t.rotation.set((Math.random()-.5)*.2,Math.random()*Math.PI,(Math.random()-.5)*.2),t.updateMatrix(),i.setMatrixAt(a,t.matrix),a++}this.instancedGrass=i,this.fullGrassCount=a,i.count=a,i.instanceMatrix.needsUpdate=!0,i.receiveShadow=!0,this.group.add(i);let o=new gi(new Li(.62,1),new Z({color:2513972,roughness:.86,flatShading:!0}),480),s=0;for(let n=0;n<480;n++){let n=Math.random()*Math.PI*2,r=18+Math.random()**.75*700,i=Math.cos(n)*r,a=Math.sin(n)*r;if(this.isBlockedForNature(i,a,4.4))continue;let c=e.getMeshHeightAt(i,a);if(c<2.2||c>34)continue;let l=.75+Math.random()*.85;t.position.set(i,c+.14*l,a),t.scale.set(l*1.35,l*.72,l*1.35),t.rotation.set(0,Math.random()*Math.PI*2,0),t.updateMatrix(),o.setMatrixAt(s,t.matrix),s++}this.instancedBushes=o,this.fullBushCount=s,o.count=s,o.instanceMatrix.needsUpdate=!0,o.receiveShadow=!0,this.group.add(o);let c=new no(.18,0);c.translate(0,.22,0);let l=new gi(c,new Z({color:16765286,roughness:.5,emissive:16755200,emissiveIntensity:.2}),420),u=0;for(let n=0;n<420;n++){let n=Math.random()*Math.PI*2,r=16+Math.random()**.7*650,i=Math.cos(n)*r,a=Math.sin(n)*r;if(this.isBlockedForNature(i,a,3.2,-2))continue;let o=e.getMeshHeightAt(i,a);if(o<2.2||o>30)continue;t.position.set(i,o,a);let s=.75+Math.random()*.65;t.scale.set(s,s*1.15,s),t.rotation.set(0,Math.random()*Math.PI,0),t.updateMatrix(),l.setMatrixAt(u,t.matrix),u++}this.instancedFlowers=l,this.fullFlowerCount=u,l.count=u,l.instanceMatrix.needsUpdate=!0,l.receiveShadow=!0,this.group.add(l);let d=new Li(.16,0);d.translate(0,.18,0);let f=new gi(d,new Z({color:8101119,roughness:.45,emissive:3891412,emissiveIntensity:.25}),340),p=0;for(let n=0;n<340;n++){let n=Math.random()*Math.PI*2,r=16+Math.random()**.7*620,i=Math.cos(n)*r,a=Math.sin(n)*r;if(this.isBlockedForNature(i,a,3.2,-2))continue;let o=e.getMeshHeightAt(i,a);if(o<2.2||o>30)continue;t.position.set(i,o,a);let s=.75+Math.random()*.65;t.scale.set(s*1.1,s,s*1.1),t.rotation.set(0,Math.random()*Math.PI,0),t.updateMatrix(),f.setMatrixAt(p,t.matrix),p++}this.instancedBlueFlowers=f,this.fullBlueFlowerCount=p,f.count=p,f.instanceMatrix.needsUpdate=!0,f.receiveShadow=!0,this.group.add(f)}spawnRoadsAndTrailMarkers(e){let t=new X(.55,.65,.16,6),n=new Z({color:8158852,roughness:.9,metalness:.05,flatShading:!0});for(let r of this.roadBranches)for(let i=0;i<r.length-1;i++){let[a,o]=r[i],[s,c]=r[i+1],l=s-a,u=c-o,d=Math.hypot(l,u);if(d<1)continue;let f=-u/d,p=l/d,m=Math.max(2,Math.floor(d/3));for(let r=0;r<=m;r++){let i=r/m,l=H.lerp(a,s,i)+(Math.random()-.5)*.35,u=H.lerp(o,c,i)+(Math.random()-.5)*.35;if(e.floorHeightProvider&&e.floorHeightProvider(l,u)!==null)continue;let d=e.getMeshHeightAt(l,u),h=new J(t,n);if(h.position.set(l,d-.01,u),h.scale.set(1.25+Math.random()*.45,1,1.25+Math.random()*.45),h.rotation.y=Math.random()*Math.PI,h.receiveShadow=!0,this.group.add(h),r%5==0&&Math.random()<.65){let t=Math.random()>.5?1:-1,n=l+f*t*2.5,r=u+p*t*2.5;if(Math.hypot(n-$.PORTAL_POS.x,r-$.PORTAL_POS.z)<17||Math.hypot(n-$.TEMPLE_POS.x,r-$.TEMPLE_POS.z)<23)continue;let i=e.getMeshHeightAt(n,r);this.createRoadsideLantern(n,i,r)}}}}createRoadsideLantern(e,t,n){let r=new J(new X(.08,.1,2.65,6),new Z({color:4007702,roughness:.9}));r.position.set(e,t+1.08,n),r.castShadow=!0,this.group.add(r);let i=new J(new Y(.32,.38,.32),new Z({color:16755268,emissive:16746530,emissiveIntensity:1.2,roughness:.3}));i.position.set(e,t+2.2,n),this.group.add(i);let a=new qu(16750899,.85,8.5);a.position.set(e,t+2.2,n),this.group.add(a),this.roadLanterns.push(a),this.obstacles.push({x:e,z:n,radius:.35})}spawnHillsideWindmill(e){let t=e.getMeshHeightAt(235,-25),n=new K;n.position.set(235,t,-25);let r=new J(new X(4.2,5.2,4.6,10),new Z({color:7237752,roughness:.9,flatShading:!0}));r.position.y=.9,r.castShadow=!0,r.receiveShadow=!0,n.add(r);let i=new X(3,4,7.5,8),a=new Z({color:5914152,roughness:.85}),o=new J(i,a);o.position.y=6.95,o.castShadow=!0,n.add(o);let s=new J(new Fi(3.4,3.8,8),new Z({color:4016984,roughness:.8}));s.position.y=12.6,s.castShadow=!0,n.add(s);let c=new K;c.position.set(0,10.4,3.1);let l=new X(.4,.4,.6,8);l.rotateX(Math.PI/2);let u=new J(l,a);c.add(u);let d=new Z({color:15589588,roughness:.9,side:2}),f=new Z({color:3022097,roughness:.9});for(let e=0;e<4;e++){let t=e*Math.PI/2,n=new K;n.rotation.z=t;let r=new J(new Y(.18,5.8,.14),f);r.position.y=2.9,n.add(r);let i=new J(new ro(1.2,4.8),d);i.position.set(.65,3.2,.05),i.castShadow=!0,n.add(i),c.add(n)}n.add(c),this.windmillSails=c,this.group.add(n),this.obstacles.push({x:235,z:-25,radius:4.8})}spawnMountainWatchtower(e){let t=-185,n=e.getMeshHeightAt(85,t),r=new K;r.position.set(85,n,t);let i=new Z({color:5922406,roughness:.92,flatShading:!0}),a=new Z({color:4007702,roughness:.85}),o=new J(new X(2.4,3.4,13.6,8),i);o.position.y=5.2,o.castShadow=!0,o.receiveShadow=!0,r.add(o);let s=new J(new X(3.2,2.6,1.4,8),i);s.position.y=12.7,s.castShadow=!0,r.add(s);let c=new J(new Fi(3.6,2.8,8),a);c.position.y=15.6,c.castShadow=!0,r.add(c);let l=new J(new ao(.35,8,8),new Z({color:62932,emissive:62932,emissiveIntensity:1.8}));l.position.y=13.8,r.add(l);let u=new qu(62932,2.2,25);u.position.y=14,r.add(u),this.group.add(r),this.obstacles.push({x:85,z:t,radius:3.4})}spawnCoastalFishingPier(){let e=-110,t=$.WATER_LEVEL,n=new K;n.position.set(e,t+.15,180);let r=new Z({color:4863012,roughness:.9}),i=new Z({color:6177324,roughness:.85}),a=new J(new Y(4.2,.25,18),i);a.position.set(0,0,9),a.castShadow=!0,a.receiveShadow=!0,n.add(a);let o=new X(.18,.2,4.5,6);for(let e=0;e<4;e++){let t=2+e*4.5,i=new J(o,r);i.position.set(-1.8,-2,t);let a=new J(o,r);a.position.set(1.8,-2,t),n.add(i,a)}let s=new K;s.position.set(3.4,-.05,12),s.rotation.y=.35;let c=new X(.8,.6,3.8,6);c.rotateZ(Math.PI/2),c.scale(.8,1.4,1);let l=new J(c,r);l.castShadow=!0,s.add(l),n.add(s),this.group.add(n),this.obstacles.push({x:e,z:188,radius:2.5})}spawnAncientStandingMonoliths(e){let t=-210,n=e.getMeshHeightAt(t,-50),r=new K;r.position.set(t,0,-50);let i=new Z({color:4737876,roughness:.9,flatShading:!0}),a=new Z({color:48121,emissive:48121,emissiveIntensity:1.4,roughness:.2}),o=new Y(.9,4.8,.6);for(let n=0;n<5;n++){let s=n*Math.PI*2/5,c=5.2,l=Math.cos(s)*c,u=Math.sin(s)*c,d=e.getMeshHeightAt(t+l,-50+u),f=new J(o,i);f.position.set(l,d+1.8,u),f.rotation.y=-s,f.rotation.z=(Math.random()-.5)*.1,f.castShadow=!0,r.add(f);let p=new J(new ro(.4,.4),a);p.position.set(l,d+2.5,u+.32),p.rotation.y=-s,r.add(p),this.obstacles.push({x:t+l,z:-50+u,radius:.8})}let s=new J(new X(1.4,1.7,1.5,8),i);s.position.set(0,n+.15,0),r.add(s);let c=new qu(48121,1.8,15);c.position.set(0,n+1.8,0),r.add(c),this.group.add(r),this.obstacles.push({x:t,z:-50,radius:1.8})}spawnBoulders(e){let t=new Z({color:5922394,roughness:.9,metalness:.05,flatShading:!0}),n=new gi(new Li(1,1),t,220);n.castShadow=!0,n.receiveShadow=!0;let r=new Mn,i=0;for(let t=0;t<220;t++){let t=Math.random()*Math.PI*2,a=28+Math.random()**.72*740,o=Math.cos(t)*a,s=Math.sin(t)*a;if(this.isBlockedForNature(o,s,5.2,1))continue;let c=e.getMeshHeightAt(o,s);if(c<2)continue;let l=1.1+Math.random()*2.4,u=.9+Math.random()*1.9,d=1.1+Math.random()*2.4;r.position.set(o,c+u*.14,s),r.scale.set(l,u,d),r.rotation.set(Math.random()*Math.PI,Math.random()*Math.PI,Math.random()*Math.PI),r.updateMatrix(),n.setMatrixAt(i,r.matrix),i++,l>1.8&&this.obstacles.push({x:o,z:s,radius:Math.max(l,d)*.78})}n.count=i,n.instanceMatrix.needsUpdate=!0,n.computeBoundingSphere(),this.group.add(n)}spawnGlowingMushrooms(e){let t=new Fi(.18,.22,6),n=new X(.04,.055,.36,5),r=new Z({color:62932,emissive:48121,emissiveIntensity:.85,roughness:.3}),i=new Z({color:14540253,roughness:.9});for(let a=0;a<65;a++){let a=Math.random()*Math.PI*2,o=26+Math.random()*520,s=Math.cos(a)*o,c=Math.sin(a)*o;if(this.isBlockedForNature(s,c,4.2))continue;let l=e.getMeshHeightAt(s,c);if(l<2.5||l>28)continue;let u=new K;for(let a=0;a<5;a++){let a=(Math.random()-.5)*1.3,o=(Math.random()-.5)*1.3,l=s+a,d=c+o,f=e.getMeshHeightAt(l,d),p=new K;p.position.set(l,f-.06,d);let m=.65+Math.random()*.85;p.scale.setScalar(m);let h=new J(n,i);h.position.y=.18;let g=new J(t,r);g.position.y=.38,p.add(h,g),u.add(p)}this.group.add(u)}}spawnColossalElderTree(e){let t=new W(-45,0,-65);t.y=e.getMeshHeightAt(t.x,t.z);let n=new K;n.position.copy(t);let r=new Z({color:4007702,roughness:.95,metalness:.05}),i=new J(new X(1.6,2.8,9,9),r);i.position.y=3.5,i.castShadow=!0,i.receiveShadow=!0,n.add(i);let a=new J(new X(2.8,4.4,2.6,8),r);a.position.y=.3,n.add(a);let o=new Z({color:1920560,roughness:.75,emissive:62932,emissiveIntensity:.08});for(let e=0;e<4;e++){let t=new Li(3.8-e*.55,1);t.scale(1.25,.92,1.25);let r=new J(t,o);r.position.set(Math.sin(e*1.5)*.8,8.2+e*2.2,Math.cos(e*1.5)*.8),r.castShadow=!0,r.receiveShadow=!0,n.add(r)}this.group.add(n),this.obstacles.push({x:t.x,z:t.z,radius:3.2})}update(e){this.windmillSails&&(this.windmillSails.rotation.z=e*.45)}},td=class{constructor(e){this.obstacles=[],this.brazierLights=[],this.group=new K;let t=$.TEMPLE_POS,n=e.getHeightAt(t.x,t.z);this.group.position.set(t.x,n,t.z);let r=new Z({color:8553612,roughness:.85,metalness:.1}),i=new Z({color:6056282,roughness:.9,metalness:.08}),a=new Z({color:62932,emissive:50335,emissiveIntensity:.7,roughness:.25});for(let e=0;e<3;e++){let t=22-e*2.2,n=(e+1)*.6,i=e===0?3.2:.6,a=new J(new X(t,t+.5,i,16),r);a.position.y=n-i/2,a.receiveShadow=!0,this.group.add(a)}let o=1.8,s=6.8;for(let e=0;e<10;e++){let n=e/10*Math.PI*2,a=Math.cos(n)*15,c=Math.sin(n)*15;if(Math.abs(n)<.35)continue;let l=e===3||e===7,u=l?s*.45:s,d=new K;d.position.set(a,o,c);let f=new J(new Y(1.6,.6,1.6),r);f.position.y=.3,f.castShadow=!0,d.add(f);let p=new J(new X(.6,.7,u,10),e%2==0?r:i);if(p.position.y=.6+u/2,p.castShadow=!0,p.receiveShadow=!0,d.add(p),!l){let e=new J(new Y(1.7,.5,1.7),r);e.position.y=.6+u+.25,e.castShadow=!0,d.add(e)}this.group.add(d),this.obstacles.push({x:t.x+a,z:t.z+c,radius:1.1})}let c=new J(new X(3.2,3.8,1.2,12),r);c.position.y=2.4,c.castShadow=!0,c.receiveShadow=!0,this.group.add(c);let l=new J(new X(2.4,2.4,.12,16),a);l.position.y=3.05,this.group.add(l),this.obstacles.push({x:t.x,z:t.z,radius:3.2}),[[-6,-6],[6,-6],[-6,6],[6,6]].forEach(([e,t])=>{let n=new K;n.position.set(e,o,t);let i=new J(new X(.35,.45,1.8,8),r);i.position.y=.9,n.add(i);let a=new J(new X(.85,.4,.5,8),r);a.position.y=2,n.add(a);let s=new J(new to(.35,1),new qr({color:62932}));s.position.y=2.4,n.add(s);let c=new qu(62932,1.8,16);c.position.y=2.6,n.add(c),this.brazierLights.push(c),this.group.add(n)})}update(e){this.brazierLights.forEach((t,n)=>{t.intensity=1.6+Math.sin(e*3.5+n*1.5)*.4})}},nd=class{static getStairFootWorldPos(){let e=-Math.PI*.65,t=13.2;return{x:$.PORTAL_POS.x+t*Math.sin(e),z:$.PORTAL_POS.z+t*Math.cos(e)}}constructor(e){this.obstacles=[],this.vortexRings=[],this.runeMeshes=[],this.particleCount=140,this.isFullyAwakened=!1,this.group=new K;let t=$.PORTAL_POS,n=e.getMeshHeightAt(t.x,t.z),r=-Math.PI*.65;this.center=t.clone(),this.baseY=n,this.cosR=Math.cos(r),this.sinR=Math.sin(r),this.group.position.set(t.x,n,t.z),this.group.rotation.y=r;let i=new Z({color:4737877,roughness:.85,metalness:.15}),a=new Z({color:3882309,roughness:.9,metalness:.1}),o=1.8,s=5.6,c=new J(new Y(24,s,14),i);c.position.y=o-s/2,c.receiveShadow=!0,c.castShadow=!0,this.group.add(c);for(let e=0;e<6;e++){let t=o-o/6*e,n=Math.max(.4,t+2),r=new J(new Y(9,n,1.12),e%2==0?i:a);r.position.set(0,t-n/2,7+(e+.5)*1),r.receiveShadow=!0,r.castShadow=!0,this.group.add(r)}let l=new Y(1.1,2.2,6.2),u=new X(.42,.25,.35,8),d=new no(.24,0),f=new qr({color:62932});for(let e of[-1,1]){let n=e*5.05,r=new J(l,a);r.position.set(n,1.3,9.9),r.castShadow=!0,r.receiveShadow=!0,this.group.add(r);let o=new J(new Y(.95,2.8,.95),i);o.position.set(n,.4,12.6),o.castShadow=!0,this.group.add(o);let s=new J(u,a);s.position.set(n,1.95,12.6),this.group.add(s);let c=new J(d,f);c.position.set(n,2.28,12.6),this.group.add(c),this.obstacles.push({x:t.x+n*this.cosR+10.6*this.sinR,z:t.z-n*this.sinR+10.6*this.cosR,radius:.75})}let p=3.2,m=3.6,h=this.createMegalithPillar(p,14,m,i,a);h.position.set(-5,o,0),this.group.add(h);let g=this.createMegalithPillar(p,14,m,i,a);g.position.set(5,o,0),this.group.add(g),this.obstacles.push({x:t.x-5*this.cosR,z:t.z+5*this.sinR,radius:1.9},{x:t.x+5*this.cosR,z:t.z-5*this.sinR,radius:1.9});let _=new J(new Y(17.2,3.2,4.4),i);_.position.set(0,15.8+1.6,0),_.castShadow=!0,this.group.add(_);let v=new Fi(7,3.4,4);v.rotateY(Math.PI/4);let y=new J(v,i);y.position.set(0,15.8+4.9,0),this.group.add(y),this.createRuneSockets(10,o,14),this.createPortalVortex(o,14),this.portalLight=new qu(61695,2.5,35),this.portalLight.position.set(0,8.8,1.2),this.group.add(this.portalLight);let b=new Fr,x=new Float32Array(this.particleCount*3);this.particleAngles=new Float32Array(this.particleCount),this.particleRadii=new Float32Array(this.particleCount),this.particleSpeeds=new Float32Array(this.particleCount);for(let e=0;e<this.particleCount;e++)this.particleAngles[e]=Math.random()*Math.PI*2,this.particleRadii[e]=1.2+Math.random()*4.2,this.particleSpeeds[e]=.8+Math.random()*1.5,x[e*3]=Math.cos(this.particleAngles[e])*this.particleRadii[e],x[e*3+1]=8.8+Math.sin(this.particleAngles[e])*(this.particleRadii[e]*1.3),x[e*3+2]=(Math.random()-.5)*1.5;b.setAttribute(`position`,new br(x,3));let S=new xi({size:.45,map:this.createParticleTexture(),transparent:!0,blending:2,depthWrite:!1,color:8978431});this.particleVortex=new Ei(b,S),this.group.add(this.particleVortex)}createMegalithPillar(e,t,n,r,i){let a=new K,o=new J(new Y(e,t,n),r);o.position.y=t/2,o.castShadow=!0,o.receiveShadow=!0,a.add(o);let s=new Y(e+.3,.6,n+.3);for(let e=1;e<=3;e++){let n=new J(s,i);n.position.y=t/4*e,a.add(n)}return a}createRuneSockets(e,t,n){let r=new no(.55);[[-e/2,t+n*.3,1.9],[-e/2,t+n*.55,1.9],[-e/2,t+n*.8,1.9],[0,t+n+2.2,2.3],[e/2,t+n*.8,1.9],[e/2,t+n*.55,1.9],[e/2,t+n*.3,1.9]].forEach(([e,t,n])=>{let i=new Z({color:2241348,emissive:1122867,emissiveIntensity:.1,roughness:.4,metalness:.8}),a=new J(r,i);a.position.set(e,t,n),this.group.add(a),this.runeMeshes.push(a)})}createPortalVortex(e,t){let n=[4.8,3.6,2.4],r=[61695,4756975,7473591];n.forEach((n,i)=>{let a=new J(new oo(n,.22,16,48),new Z({color:r[i],emissive:r[i],emissiveIntensity:.6,transparent:!0,opacity:.75,roughness:.1}));a.position.set(0,e+t*.5,0),a.scale.set(1,1.35,1),this.group.add(a),this.vortexRings.push(a)});let i=new J(new Pi(4.6,32),new qr({color:8772,transparent:!0,opacity:.65,side:2}));i.scale.set(1,1.35,1),i.position.set(0,e+t*.5,0),this.group.add(i)}createParticleTexture(){let e=document.createElement(`canvas`);e.width=64,e.height=64;let t=e.getContext(`2d`),n=t.createRadialGradient(32,32,0,32,32,32);return n.addColorStop(0,`rgba(255, 255, 255, 1)`),n.addColorStop(.4,`rgba(0, 240, 255, 0.9)`),n.addColorStop(.8,`rgba(100, 150, 255, 0.2)`),n.addColorStop(1,`rgba(0, 0, 0, 0)`),t.fillStyle=n,t.fillRect(0,0,64,64),new ki(e)}getFloorHeightAt(e,t){let n=e-this.center.x,r=t-this.center.z;if(n*n+r*r>306.25)return null;let i=n*this.cosR-r*this.sinR,a=n*this.sinR+r*this.cosR;if(Math.abs(i)<=12.1&&Math.abs(a)<=7.1)return this.baseY+1.8;if(Math.abs(i)<=4.6&&a>7.1&&a<=13.1){let e=Math.max(0,Math.min(1,(13.1-a)/6));return this.baseY+e*1.8}return null}updateCrystalProgress(e){let t=Math.min(e,7);for(let e=0;e<7;e++){let n=this.runeMeshes[e].material;e<t?(n.color.setHex(65535),n.emissive.setHex(61695),n.emissiveIntensity=2.2):(n.color.setHex(2241348),n.emissive.setHex(1122867),n.emissiveIntensity=.1)}t>=7&&!this.isFullyAwakened&&(this.isFullyAwakened=!0,this.portalLight.color.setHex(65535),this.portalLight.intensity=8.5)}update(e){this.vortexRings.forEach((t,n)=>{let r=n%2==0?1:-1;t.rotation.z+=.012*r*(n+1);let i=1+Math.sin(e*2.5+n)*.04;t.scale.set(i,i*1.35,i)});let t=this.particleVortex.geometry.attributes.position;for(let e=0;e<this.particleCount;e++){this.particleAngles[e]+=this.particleSpeeds[e]*.025,this.particleRadii[e]-=.012,this.particleRadii[e]<.6&&(this.particleRadii[e]=4.4);let n=Math.cos(this.particleAngles[e])*this.particleRadii[e],r=8.8+Math.sin(this.particleAngles[e])*(this.particleRadii[e]*1.3);t.setX(e,n),t.setY(e,r)}t.needsUpdate=!0;let n=this.isFullyAwakened?8:2.5;this.portalLight.intensity=n+Math.sin(e*3)*.8}},rd=class{constructor(e){this.crystals=[],this.crystalMeshes=[],this.ringMeshes=[],this.crystalLights=[],this.group=new K;let t=[{id:0,nameAr:`بلورة الفجر`,nameEn:`Crystal of Dawn`,locationAr:`غابة الصنوبر الهامسة`,locationEn:`Whispering Pine Forest`,memoryAr:`«كان الضوء أول لغة نطقت بها هذه الأرض، قبل أن تحجب سحب النسيان وهج الحقيقة القديمة.»`,memoryEn:`"Light was the first tongue spoken across these lands, before the mist of oblivion veiled the ancient truth."`,color:62932},{id:1,nameAr:`بلورة الأعماق`,nameEn:`Crystal of the Depths`,locationAr:`قلب البحيرة المضيئة`,locationEn:`Heart of the Bioluminescent Lake`,memoryAr:`«في قاع المياه الفيروزية، لا تزال أصداء تراتيل الغارقين في التأمل تنبض كقلب حي.»`,memoryEn:`"Deep within the turquoise waters, the hymns of ancient dreamers still pulse like a living heartbeat."`,color:48121},{id:2,nameAr:`بلورة الملاذ`,nameEn:`Crystal of Sanctuary`,locationAr:`مذبح المعبد العتيق`,locationEn:`Altar of the Ancient Temple`,memoryAr:`«لم تكن هذه الأعمدة مجرد حجارة صامتة، بل أوتاداً ربطت سماء الحكمة بأرض الفناء.»`,memoryEn:`"These stone pillars were never merely rocks; they were anchors weaving celestial wisdom into the mortal soil."`,color:10182117},{id:3,nameAr:`بلورة الرياح`,nameEn:`Crystal of Winds`,locationAr:`قمة الجبل الشاهق`,locationEn:`Summit of the High Peak`,memoryAr:`«من يقف على ذرى الجبال يسمع أنين الزمن، ويدرك أن العوالم تولد وتموت في رفة عين.»`,memoryEn:`"Whoever stands upon the jagged heights hears the yearning of time, knowing worlds are born and fade in a single breath."`,color:15817653},{id:4,nameAr:`بلورة الهامسين`,nameEn:`Crystal of Whispers`,locationAr:`كهف الشاطئ المنعزل`,locationEn:`Secluded Shoreline Grotto`,memoryAr:`«حين يصمت العالم، تبدأ الحصى بسرد حكايات أولئك الذين عبروا البحر ولم يعودوا قط.»`,memoryEn:`"When silence descends, the ocean pebbles recount the tales of those who sailed beyond the horizon and never returned."`,color:16704576},{id:5,nameAr:`بلورة الجذور`,nameEn:`Crystal of Roots`,locationAr:`تحت الشجرة العتيقة الكبرى`,locationEn:`Under the Colossal Elder Tree`,memoryAr:`«جذورنا تشرب من ذكريات الأمس، لتزهر أوراقنا بأمل الغد المجهول.»`,memoryEn:`"Our roots drink from yesterday's remembered dreams, that our canopy may bloom with tomorrow's unseen hope."`,color:5420936},{id:6,nameAr:`بلورة العتبة`,nameEn:`Crystal of the Threshold`,locationAr:`عتبة البوابة الحجرية العظيمة`,locationEn:`Threshold of the Great Portal`,memoryAr:`«اكتملت الأصداء السبعة. العالم تذكر ماضيه، والبوابة العتيقة تفتح ذراعيها للمستيقظين.»`,memoryEn:`"The seven echoes are reunited. The world remembers, and the Great Gateway opens its heart to the awakened."`,color:16740518}],n=[new U(-42,45),new U(0,-15),new U(-85,25),new U(16,-98),new U(55,65),new U(-45,-65),new U(88,-28)];t.forEach((t,r)=>{let i=n[r],a=e.getHeightAt(i.x,i.y);r===1?a=$.LAKE_WATER_Y+1.2:a+=1.8;let o=new W(i.x,a,i.y),s={...t,pos:o,collected:!1};this.crystals.push(s),this.createCrystalMesh(s)})}createCrystalMesh(e){let t=new K;t.position.copy(e.pos);let n=new J(new no(.75,0),new Z({color:e.color,emissive:e.color,emissiveIntensity:.95,roughness:.15,metalness:.85,transparent:!0,opacity:.92}));n.castShadow=!0,t.add(n);let r=new J(new oo(1.25,.04,8,24),new Z({color:e.color,emissive:e.color,emissiveIntensity:.6,roughness:.3}));r.rotation.x=Math.PI/3,t.add(r),this.ringMeshes.push(r);let i=new qu(e.color,2.2,12);i.position.y=.2,t.add(i),this.crystalLights.push(i);let a=new J(new X(.5,.7,.4,6),new Z({color:4013892,roughness:.9}));a.position.y=-1.5,t.add(a),this.group.add(t),this.crystalMeshes.push(t)}checkNearbyCrystal(e,t=3.6){for(let n of this.crystals)if(!n.collected&&e.distanceTo(n.pos)<=t)return n;return null}collectCrystal(e){let t=this.crystals.find(t=>t.id===e);if(!t||t.collected)return null;t.collected=!0;let n=this.crystalMeshes[e];return n&&(n.visible=!1),t}resetAll(){this.crystals.forEach((e,t)=>{e.collected=!1;let n=this.crystalMeshes[t];n&&(n.visible=!0)})}setCollectedState(e){let t=new Set(e);this.crystals.forEach((e,n)=>{e.collected=t.has(e.id);let r=this.crystalMeshes[n];r&&(r.visible=!e.collected)})}getCollectedCount(){return this.crystals.filter(e=>e.collected).length}update(e){this.crystalMeshes.forEach((t,n)=>{if(this.crystals[n].collected)return;let r=Math.sin(e*2.2+n*1.1)*.22;t.position.y=this.crystals[n].pos.y+r,t.children[0].rotation.y+=.018,t.children[0].rotation.x=Math.sin(e+n)*.15;let i=this.ringMeshes[n];i&&(i.rotation.z+=.024,i.rotation.y=Math.cos(e*1.5+n)*.25),this.crystalLights[n].intensity=1.8+Math.sin(e*3+n)*.6})}},id=class{applyQuality(e,t,n,r){if(this.dirLight.castShadow=e,e&&this.dirLight.shadow.mapSize.width!==t&&(this.dirLight.shadow.mapSize.width=t,this.dirLight.shadow.mapSize.height=t,this.dirLight.shadow.map&&(this.dirLight.shadow.map.dispose(),this.dirLight.shadow.map=null)),this.sceneRef.fog&&`density`in this.sceneRef.fog&&(this.sceneRef.fog.density=n),this.fireflies&&this.fireflies.geometry){let e=Math.min(this.fireflyCount,r);this.fireflies.geometry.setDrawRange(0,e)}}constructor(e,t=!1){this.fireflyCount=380,this.fireflyFrameCounter=0,this.sceneRef=e,this.group=new K;let n=new q(924715);e.fog=new Bn(n,.0011),e.background=n;let r=new J(new ao(2200,32,24),new qr({map:this.createSkyTexture(t),side:1,fog:!1}));this.group.add(r),this.dirLight=new is(16768954,2.2),this.dirLight.position.set(-140,140,-100),this.dirLight.castShadow=!0,this.dirLight.shadow.mapSize.width=1024,this.dirLight.shadow.mapSize.height=1024,this.dirLight.shadow.camera.near=10,this.dirLight.shadow.camera.far=450,this.dirLight.shadow.camera.left=-135,this.dirLight.shadow.camera.right=135,this.dirLight.shadow.camera.top=135,this.dirLight.shadow.camera.bottom=-135,this.dirLight.shadow.bias=-8e-4,this.dirLight.shadow.normalBias=.03,this.group.add(this.dirLight),this.group.add(this.dirLight.target),this.hemiLight=new Vo(2972296,1715741,1.4),this.group.add(this.hemiLight);let i=new is(4231532,.6);i.position.set(160,80,140),this.group.add(i);let a=new as(4877708,1.2);this.group.add(a);let o=new Fr;this.fireflyCount=380,this.fireflyPositions=new Float32Array(this.fireflyCount*3),this.fireflySpeeds=new Float32Array(this.fireflyCount);for(let e=0;e<this.fireflyCount;e++){let t=Math.random()*Math.PI*2,n=15+Math.random()*880;this.fireflyPositions[e*3]=Math.cos(t)*n,this.fireflyPositions[e*3+1]=4+Math.random()*26,this.fireflyPositions[e*3+2]=Math.sin(t)*n,this.fireflySpeeds[e]=.5+Math.random()*1}o.setAttribute(`position`,new br(this.fireflyPositions,3));let s=new xi({size:.6,map:this.createFireflyTexture(),transparent:!0,blending:2,depthWrite:!1,color:10092512});this.fireflies=new Ei(o,s),this.group.add(this.fireflies)}createSkyTexture(e=!1){let t=e?512:1024,n=e?256:512,r=t/1024,i=document.createElement(`canvas`);i.width=t,i.height=n;let a=i.getContext(`2d`),o=a.createLinearGradient(0,0,0,n);o.addColorStop(0,`#060a12`),o.addColorStop(.35,`#0b1624`),o.addColorStop(.7,`#11293e`),o.addColorStop(.9,`#1a3b4f`),o.addColorStop(1,`#0e1c2b`),a.fillStyle=o,a.fillRect(0,0,t,n);let s=a.createRadialGradient(680*r,180*r,20*r,680*r,180*r,240*r);s.addColorStop(0,`rgba(80, 180, 210, 0.35)`),s.addColorStop(.5,`rgba(120, 90, 200, 0.15)`),s.addColorStop(1,`rgba(0, 0, 0, 0)`),a.fillStyle=s,a.fillRect(0,0,t,n),a.fillStyle=`#ffffff`;let c=e?420:750;for(let e=0;e<c;e++){let e=Math.random()*t,n=380*r*Math.random(),i=Math.random()>.95?1.5*Math.max(.7,r):.8*Math.max(.7,r);a.beginPath(),a.arc(e,n,i,0,Math.PI*2),a.fill()}return new ki(i)}createFireflyTexture(){let e=document.createElement(`canvas`);e.width=64,e.height=64;let t=e.getContext(`2d`),n=t.createRadialGradient(32,32,0,32,32,32);return n.addColorStop(0,`rgba(255, 255, 255, 1)`),n.addColorStop(.35,`rgba(100, 255, 200, 0.8)`),n.addColorStop(.7,`rgba(50, 200, 150, 0.25)`),n.addColorStop(1,`rgba(0, 0, 0, 0)`),t.fillStyle=n,t.fillRect(0,0,64,64),new ki(e)}update(e,t){if(t&&(this.dirLight.position.set(t.x-120,t.y+130,t.z-80),this.dirLight.target.position.set(t.x,t.y,t.z)),this.fireflyFrameCounter++,this.fireflyFrameCounter%2==0){let t=this.fireflies.geometry.attributes.position;for(let n=0;n<this.fireflyCount;n+=2){let r=t.getY(n)+Math.sin(e*this.fireflySpeeds[n]+n)*.04;r<2&&(r=14),r>35&&(r=6),t.setY(n,r);let i=t.getX(n)+Math.cos(e*.5+n)*.03,a=t.getZ(n)+Math.sin(e*.5+n)*.03;t.setX(n,i),t.setZ(n,a)}t.needsUpdate=!0}}},ad=class{constructor(e){this.terrain=e,this.obstacles=[],this.shards=[],this.shardMeshes=[],this.shardLights=[],this.portalScratchPos=new W,this.inscriptions=[],this.inscriptionMeshes=[],this.doorObstacleIndex=-1,this.isTempleDoorOpen=!1,this.doorCurrentY=0,this.doorTargetY=0,this.activeBursts=[],this.group=new K,this.burstParticleTexture=this.createParticleTexture(),this.initMemoryShards(),this.initAncientInscriptions(),this.initTempleDoor()}initMemoryShards(){let e=[{id:0,nameAr:`شظية الشاطئ الفيروزي`,nameEn:`Shoreline Turquoise Shard`,quoteAr:`«في حبات الرمل تنام خطوات من وصلوا أولاً إلى هذه الجزيرة.»`,quoteEn:`"Within grains of sand sleep the footsteps of the first voyagers."`,locationAr:`رصيف الرمل الجنوبي`,locationEn:`Southern Shoreline Pier`,color:62932},{id:1,nameAr:`شظية شمس الغابة`,nameEn:`Forest Sunlight Shard`,quoteAr:`«خيوط الشمس المتسللة بين الصنوبر ليست سوى أوتار تعزف أنشودة الوجود.»`,quoteEn:`"The sunbeams piercing the pines are strings playing creation's hymn."`,locationAr:`ممر الغابة المظلل`,locationEn:`Shaded Forest Path`,color:16704576},{id:2,nameAr:`شظية همس الأمواج`,nameEn:`Wave Whisper Shard`,quoteAr:`«حين ينكسر الموج على الصخور، يُردد صدى أسماء من طواهم النسيان.»`,quoteEn:`"As waves shatter against stone, they whisper names lost to time."`,locationAr:`جرف الأمواج الغربي`,locationEn:`Western Wave Cliff`,color:48121},{id:3,nameAr:`شظية وهج البحيرة`,nameEn:`Bioluminescent Shard`,quoteAr:`«الماء الأزرق لا يعكس السماء فقط، بل يحفظ أحلام النجوم الساقطة.»`,quoteEn:`"The sapphire water reflects not only skies, but the dreams of fallen stars."`,locationAr:`ضفة البحيرة المضيئة`,locationEn:`Luminous Lake Bank`,color:4770532},{id:4,nameAr:`شظية أعمدة الحكمة`,nameEn:`Sanctuary Pillar Shard`,quoteAr:`«كل حجر في هذا الصرح كان شاهداً على عهد قديم بين الأرض والنور.»`,quoteEn:`"Every pillar in this hall witnessed an ancient covenant of earth and light."`,locationAr:`فناء المعبد الخارجي`,locationEn:`Temple Outer Peristyle`,color:10182117},{id:5,nameAr:`شظية رياح القمة`,nameEn:`High Summit Shard`,quoteAr:`«الريح في الأعالي لا تهدأ، لأنها تحمل رسائل العوالم البعيدة.»`,quoteEn:`"The winds upon the peak never rest, carrying messages of distant worlds."`,locationAr:`نتوء الجبل الشمالي`,locationEn:`Northern Mountain Ridge`,color:16196997},{id:6,nameAr:`شظية الشجرة الكبرى`,nameEn:`Elder Branch Shard`,quoteAr:`«حلقات الشجرة ليست أرقاماً، بل سجل لأفراح وأحزان الفصول الغابرة.»`,quoteEn:`"Tree rings are not mere years, but chronicles of departed seasons."`,locationAr:`جذور الشجرة المعمرة`,locationEn:`Elder Tree Roots`,color:5420936},{id:7,nameAr:`شظية الكهف الصامت`,nameEn:`Silent Grotto Shard`,quoteAr:`«في عمق الظلام يضيء الوعي كشعلة لا تنطفئ.»`,quoteEn:`"In the deepest dark, awareness glows like an inextinguishable flame."`,locationAr:`مدخل الغار الصخري`,locationEn:`Rock Grotto Entrance`,color:7473591},{id:8,nameAr:`شظية عتبة الأفق`,nameEn:`Horizon Verge Shard`,quoteAr:`«كل بداية هي نهاية لشيء آخر، والكون يعيد نسج نفسه إلى الأبد.»`,quoteEn:`"Every threshold begins anew, as the cosmos reweaves its tapestry."`,locationAr:`مطل البوابة الشرقية`,locationEn:`Eastern Portal Overlook`,color:3804323},{id:9,nameAr:`شظية شعلة الأثير`,nameEn:`Aether Flame Shard`,quoteAr:`«حين تجمع الشظايا كلها، تكتمل مرآة الروح وتستيقظ الجزيرة.»`,quoteEn:`"When all shards unite, the spirit mirror clears and the island awakens."`,locationAr:`المدرج الدائري القديم`,locationEn:`Ancient Circular Dais`,color:5032432}],t=[[-15,82],[-32,45],[-78,65],[22,-10],[-65,32],[15,-78],[48,38],[-95,-12],[82,-42],[6,12]];e.forEach((e,n)=>{let[r,i]=t[n],a=new W(r,this.terrain.getHeightAt(r,i)+1.35,i),o={...e,pos:a,collected:!1};this.shards.push(o);let s=new K;s.position.copy(a);let c=new J(new no(.38,0),new Z({color:o.color,emissive:o.color,emissiveIntensity:1.6,roughness:.15,metalness:.85,transparent:!0,opacity:.92}));c.scale.set(.65,1.4,.65),c.castShadow=!0,s.add(c);let l=new J(new oo(.65,.022,8,24),new qr({color:o.color,transparent:!0,opacity:.85}));l.rotation.x=Math.PI/3,s.add(l);let u=new qu(o.color,1.4,8);u.position.set(0,0,0),s.add(u),this.shardLights.push(u),this.group.add(s),this.shardMeshes.push(s)})}initAncientInscriptions(){let e=[{id:0,titleAr:`مسلة العبور الأولى`,titleEn:`Stele of the First Crossing`,glyph:`ᚱ · ᛟ`,locationAr:`شاطئ الوصول الجنوبي`,locationEn:`Southern Arrival Beach`,contentAr:`«إلى كل تائه قذفته أمواج النسيان: هذه الجزيرة لا تموت، بل تنام. حرّك الصدى في بلوراتها وشظاياها، ليُفتح لك باب العودة إلى النور.»`,contentEn:`"To every wanderer cast upon oblivion's shore: this island never dies; it only dreams. Awaken the echoes within its crystals and shards to unseal your path back to the light."`},{id:1,titleAr:`نقش تراتيل الماء الحي`,titleEn:`Inscription of the Living Waters`,glyph:`ᚦ · ᛗ`,locationAr:`ضفة البحيرة الزرقاء المضيئة`,locationEn:`Bioluminescent Lake Bank`,contentAr:`«كان أسلافنا يستحمون في هذه المياه ليغسلوا تعب الدهور. نيرانها الفيروزية لا تحرق، بل تبث الحياة في الذاكرة الخافتة.»`,contentEn:`"Our elders bathed in these waters to wash away the weight of eons. Its turquoise flame does not burn, but breathes life into fading memory."`},{id:2,titleAr:`لوح معبد الأسرار`,titleEn:`Tablet of the Sanctuary Veil`,glyph:`ᛋ · ᚷ`,locationAr:`أمام مدخل المعبد القديم`,locationEn:`Ancient Temple Forecourt`,contentAr:`«الأبواب المغلقة هنا لا تطلب مفاتيح حديدية، بل نية طاهرة ولمسة من أثير الروح. اقترب واضغط على الختم لفتح الملاذ.»`,contentEn:`"The sealed portals here yield to no iron keys, but to pure intent and the touch of aether. Approach and touch the seal to open the sanctuary."`},{id:3,titleAr:`نبوءة البوابة العظمى`,titleEn:`Prophecy of the Great Portal`,glyph:`ᚨ · ᛉ`,locationAr:`عتبة البوابة الحجرية الشرقية`,locationEn:`Great Stone Portal Threshold`,contentAr:`«سبع بلورات مقدسة وُزعت في أرجاء الجزيرة. حين تضيء المقابس السبعة جميعها، سينفتح الأفق الكوني وتعود الأرواح إلى موطنها الأبدي.»`,contentEn:`"Seven sacred crystals were scattered across these lands. When all seven rune sockets ignite, the cosmic rift will awaken and souls shall return home."`},{id:4,titleAr:`نقش شجرة الخلود`,titleEn:`Stele of the Colossal Tree`,glyph:`ᛖ · ᚹ`,locationAr:`فناء الشجرة العتيقة الكبرى`,locationEn:`Elder Tree Clearing`,contentAr:`«تحت هذه الظلال، جلس حكماء الجزيرة يدوّنون أسرار الرياح وتاريخ النجوم. من يصمت هنا يسمع نبض العصور الغابرة.»`,contentEn:`"Beneath these boughs, ancient sages recorded the secrets of wind and stars. Whosoever listens in silence will hear the heartbeat of the ages."`}],t=[[-8,76,.2],[14,-22,-.4],[-72,28,1.2],[87.5,-40.5,-1.75],[42,42,.8]],n=new Z({color:5922408,roughness:.85,metalness:.15}),r=new Z({color:62932,emissive:53940,emissiveIntensity:1.2,roughness:.2});e.forEach((e,i)=>{let[a,o,s]=t[i],c=this.terrain.getHeightAt(a,o),l=new W(a,c,o),u={...e,pos:l,rotationY:s,read:!1};this.inscriptions.push(u);let d=new K;d.position.set(a,c,o),d.rotation.y=s;let f=new J(new Y(1.6,.45,1.2),n);f.position.y=.22,f.castShadow=!0,d.add(f);let p=new J(new Y(1.1,2.3,.45),n);p.position.y=1.45,p.castShadow=!0,p.receiveShadow=!0,d.add(p);let m=new J(new ro(.75,1.4),r);m.position.set(0,1.45,.235),d.add(m);let h=new qu(62932,1.2,7);h.position.set(0,1.5,.6),d.add(h),this.group.add(d),this.inscriptionMeshes.push(d),this.obstacles.push({x:a,z:o,radius:1.2})})}initTempleDoor(){let e=$.TEMPLE_POS,t=this.terrain.getHeightAt(e.x,e.z);this.templeDoorGroup=new K;let n=e.x+14.8,r=e.z,i=t+1.8;this.templeDoorGroup.position.set(n,i,r),this.templeDoorGroup.rotation.y=Math.PI/2;let a=new Z({color:5132890,roughness:.85,metalness:.15}),o=new Z({color:4014408,roughness:.75,metalness:.25}),s=new Z({color:62932,emissive:46296,emissiveIntensity:1.4,roughness:.2}),c=new Y(1.1,5.8,1.2),l=new J(c,a);l.position.set(-2.4,2.9,0),l.castShadow=!0,this.templeDoorGroup.add(l);let u=new J(c,a);u.position.set(2.4,2.9,0),u.castShadow=!0,this.templeDoorGroup.add(u);let d=new J(new Y(6.2,1.1,1.4),a);d.position.set(0,6.35,0),d.castShadow=!0,this.templeDoorGroup.add(d);let f=new Y(3.8,5.5,.6);this.templeDoorSlab=new J(f,o),this.templeDoorSlab.position.set(0,2.75,0),this.templeDoorSlab.castShadow=!0,this.templeDoorSlab.receiveShadow=!0,this.templeDoorGroup.add(this.templeDoorSlab);let p=new X(.7,.7,.08,16);p.rotateX(Math.PI/2),this.templeDoorRune=new J(p,s),this.templeDoorRune.position.set(0,2.75,.32),this.templeDoorGroup.add(this.templeDoorRune),this.group.add(this.templeDoorGroup),this.obstacles.push({x:n,z:r,radius:2.4}),this.doorObstacleIndex=this.obstacles.length-1}toggleTempleDoor(){this.isTempleDoorOpen=!this.isTempleDoorOpen,this.doorTargetY=this.isTempleDoorOpen?5.2:0,this.doorObstacleIndex>=0&&this.doorObstacleIndex<this.obstacles.length&&(this.isTempleDoorOpen?this.obstacles[this.doorObstacleIndex].radius=0:this.obstacles[this.doorObstacleIndex].radius=2.4);let e=this.templeDoorRune.material;return this.isTempleDoorOpen?(e.color.setHex(9494767),e.emissive.setHex(62932),e.emissiveIntensity=2.2):(e.color.setHex(62932),e.emissive.setHex(30646),e.emissiveIntensity=1),this.isTempleDoorOpen}createParticleTexture(){let e=document.createElement(`canvas`);e.width=64,e.height=64;let t=e.getContext(`2d`),n=t.createRadialGradient(32,32,0,32,32,32);return n.addColorStop(0,`rgba(255, 255, 255, 1)`),n.addColorStop(.35,`rgba(0, 245, 212, 0.95)`),n.addColorStop(.7,`rgba(0, 180, 216, 0.4)`),n.addColorStop(1,`rgba(0, 0, 0, 0)`),t.fillStyle=n,t.fillRect(0,0,64,64),new ki(e)}spawnCollectionBurst(e,t=62932){let n=new Fr,r=new Float32Array(144),i=new Float32Array(144);for(let t=0;t<48;t++){r[t*3]=e.x,r[t*3+1]=e.y,r[t*3+2]=e.z;let n=Math.random()*Math.PI*2,a=Math.acos(Math.random()*2-1),o=2.2+Math.random()*4.5;i[t*3]=Math.sin(a)*Math.cos(n)*o,i[t*3+1]=Math.abs(Math.cos(a))*o+1.5,i[t*3+2]=Math.sin(a)*Math.sin(n)*o}n.setAttribute(`position`,new br(r,3));let a=new Ei(n,new xi({size:.45,map:this.burstParticleTexture,transparent:!0,blending:2,depthWrite:!1,color:t}));this.group.add(a);let o=new io(.2,.5,32);o.rotateX(-Math.PI/2);let s=new J(o,new qr({color:t,transparent:!0,opacity:.9,side:2,depthWrite:!1,blending:2}));s.position.copy(e),s.position.y+=.1,this.group.add(s);let c=new qu(t,4,14);c.position.copy(e),this.group.add(c),this.activeBursts.push({particles:a,positions:r,velocities:i,ring:s,light:c,age:0,maxAge:1.25})}findClosestInteraction(e){let t=null,n=3.8;for(let r of this.shards){if(r.collected)continue;let i=e.distanceTo(r.pos);i<n&&(n=i,t={id:r.id,type:`shard`,titleAr:r.nameAr,titleEn:r.nameEn,actionAr:`اجمع شظية الذاكرة`,actionEn:`Collect Memory Shard`,pos:r.pos,dist:i,color:r.color,data:r})}for(let r of this.inscriptions){let i=e.distanceTo(r.pos);i<Math.min(n,4)&&(n=i,t={id:r.id,type:`inscription`,titleAr:r.titleAr,titleEn:r.titleEn,actionAr:`اقرأ النقوش القديمة`,actionEn:`Read Ancient Inscription`,pos:r.pos,dist:i,data:r})}let r=this.templeDoorGroup.position,i=e.distanceTo(r);i<Math.min(n,4.8)&&(n=i,t={id:99,type:`door`,titleAr:`بوابة المعبد الحجرية`,titleEn:`Temple Stone Gate`,actionAr:this.isTempleDoorOpen?`أغلِق البوابة الحجرية`:`افتح البوابة الحجرية`,actionEn:this.isTempleDoorOpen?`Close Stone Gate`:`Open Temple Gate`,pos:r,dist:i});let a=$.PORTAL_POS,o=e.x-a.x,s=e.z-a.z,c=Math.hypot(o,s);return c<Math.min(n,6)&&(n=c,this.portalScratchPos.set(a.x,e.y,a.z),t={id:100,type:`portal`,titleAr:`البوابة الحجرية العظيمة`,titleEn:`The Great Stone Portal`,actionAr:`تواصل مع البوابة السماوية`,actionEn:`Commune with Celestial Portal`,pos:this.portalScratchPos,dist:c}),t}collectShard(e){let t=this.shards.find(t=>t.id===e);if(!t||t.collected)return null;t.collected=!0;let n=this.shardMeshes[e];return n&&(n.visible=!1),this.spawnCollectionBurst(t.pos,t.color),t}getCollectedShardsCount(){return this.shards.filter(e=>e.collected).length}resetAll(){this.shards.forEach((e,t)=>{e.collected=!1;let n=this.shardMeshes[t];n&&(n.visible=!0)}),this.inscriptions.forEach(e=>{e.read=!1}),this.isTempleDoorOpen&&this.toggleTempleDoor()}restoreSavedState(e,t,n){let r=new Set(e);this.shards.forEach((e,t)=>{e.collected=r.has(e.id);let n=this.shardMeshes[t];n&&(n.visible=!e.collected)});let i=new Set(t);this.inscriptions.forEach(e=>{e.read=i.has(e.id)}),n!==this.isTempleDoorOpen&&this.toggleTempleDoor()}update(e,t){this.shardMeshes.forEach((e,n)=>{if(this.shards[n].collected)return;let r=Math.sin(t*2.8+n*1.3)*.18;e.position.y=this.shards[n].pos.y+r,e.children[0].rotation.y+=.024,e.children[0].rotation.z=Math.sin(t*1.5+n)*.15,e.children[1].rotation.z+=.038,e.children[1].rotation.x=Math.cos(t*2+n)*.3,this.shardLights[n].intensity=1.2+Math.sin(t*4+n)*.45}),this.inscriptionMeshes.forEach((e,n)=>{let r=e.children[2];if(r){let e=r.material;e.emissiveIntensity=1+Math.sin(t*2.2+n*1.7)*.4}}),Math.abs(this.doorCurrentY-this.doorTargetY)>.01&&(this.doorCurrentY+=(this.doorTargetY-this.doorCurrentY)*Math.min(e*3.5,1),this.templeDoorSlab.position.y=2.75+this.doorCurrentY,this.templeDoorRune.position.y=2.75+this.doorCurrentY);for(let t=this.activeBursts.length-1;t>=0;t--){let n=this.activeBursts[t];n.age+=e;let r=n.age/n.maxAge;if(r>=1){n.particles.removeFromParent(),n.particles.geometry.dispose(),n.particles.material.dispose(),n.ring.removeFromParent(),n.ring.geometry.dispose(),n.ring.material.dispose(),n.light.removeFromParent(),n.light.dispose(),this.activeBursts.splice(t,1);continue}let i=n.particles.geometry.attributes.position,a=i.count;for(let t=0;t<a;t++)n.positions[t*3]+=n.velocities[t*3]*e,n.positions[t*3+1]+=n.velocities[t*3+1]*e,n.positions[t*3+2]+=n.velocities[t*3+2]*e,n.velocities[t*3+1]-=2.2*e;i.needsUpdate=!0;let o=1+r*7.5;n.ring.scale.set(o,o,o),n.ring.material.opacity=(1-r)*.9,n.particles.material.opacity=1-r,n.light.intensity=4*(1-r)}}dispose(){this.burstParticleTexture.dispose(),this.activeBursts.forEach(e=>{e.particles.removeFromParent(),e.ring.removeFromParent(),e.light.removeFromParent(),e.light.dispose()}),this.activeBursts=[]}},od={SHORELINE:{id:`SHORELINE`,nameAr:`الشاطئ الجنوبي`,nameEn:`Southern Shoreline`,color:`#00f5d4`},FOREST:{id:`FOREST`,nameAr:`غابة الصنوبر الهامسة`,nameEn:`Whispering Pine Forest`,color:`#52b788`},LAKE:{id:`LAKE`,nameAr:`البحيرة الزرقاء المضيئة`,nameEn:`Bioluminescent Lake`,color:`#00bbf9`},TEMPLE:{id:`TEMPLE`,nameAr:`المعبد القديم والملاذ`,nameEn:`Ancient Temple Sanctuary`,color:`#9b5de5`},ELDER_TREE:{id:`ELDER_TREE`,nameAr:`شجرة الخلود العتيقة`,nameEn:`Colossal Elder Tree Glade`,color:`#00f0ff`},SUMMIT:{id:`SUMMIT`,nameAr:`قمم الجبال الشاهقة`,nameEn:`High Mountain Summit`,color:`#f15bb5`},PORTAL:{id:`PORTAL`,nameAr:`البوابة الحجرية العظيمة`,nameEn:`The Great Stone Portal`,color:`#4cc9f0`},GROTTO:{id:`GROTTO`,nameAr:`الغار الصخري والكهوف`,nameEn:`Coastal Rock Grotto`,color:`#7209b7`}},sd=class{constructor(e){this.terrain=e,this.elderTreeHeartGroup=null,this.elderTreeEyeMesh=null,this.elderTreeGlowLight=null,this.elderTreeFlowers=null,this.secretBridgeGroup=null,this.secretBridgeSteppingStones=[],this.forestSpiritGroup=null,this.spiritAntlers=null,this.spiritLight=null,this.templeRunesGroup=null,this.templeRuneMeshes=[],this.currentBiome=`SHORELINE`,this.previousBiome=null,this.lastPosition=new W,this.timeInCurrentBiome=0,this.hasInitializedPosition=!1,this.group=new K,this.profile=this.createDefaultProfile(),this.buildElderTreeHeart(),this.buildSecretCrystallinePathway(),this.buildSlumberingForestSpirit(),this.buildDeepTempleRunes(),this.evaluateManifestations(!0)}createDefaultProfile(){return{totalPlayTimeSec:0,biomeTimeSec:{SHORELINE:0,FOREST:0,LAKE:0,TEMPLE:0,ELDER_TREE:0,SUMMIT:0,PORTAL:0,GROTTO:0},sprintDistanceMeters:0,sprintCount:0,zonesVisited:[`SHORELINE`],templeVisits:0,portalVisits:0,elderTreeVisits:0,secretsFound:[],manifestations:{elder_tree_heart:!1,crystalline_bridge:!1,forest_spirit:!1,temple_deep_runes:!1,celestial_aurora:!1},worldResonanceLevel:1,archetypeAr:`الرحالة المستكشف`,archetypeEn:`The Novice Pilgrim`}}buildElderTreeHeart(){let e=new W(-45,0,-65);e.y=this.terrain.getHeightAt(e.x,e.z),this.elderTreeHeartGroup=new K,this.elderTreeHeartGroup.position.copy(e),this.elderTreeHeartGroup.visible=!1;let t=new X(1.35,1.35,.22,32);t.rotateX(Math.PI/2);let n=new Z({color:61695,emissive:54015,emissiveIntensity:3.5,roughness:.1,metalness:.9});this.elderTreeEyeMesh=new J(t,n),this.elderTreeEyeMesh.position.set(0,3.8,1.48),this.elderTreeHeartGroup.add(this.elderTreeEyeMesh);for(let e=0;e<3;e++){let t=new J(new oo(.55+e*.38,.045,8,24),new qr({color:8454143,transparent:!0,opacity:.85}));t.position.set(0,3.8,1.52+e*.02),this.elderTreeHeartGroup.add(t)}this.elderTreeGlowLight=new qu(61695,4.5,22),this.elderTreeGlowLight.position.set(0,3.8,2.2),this.elderTreeHeartGroup.add(this.elderTreeGlowLight);let r=new Fi(.18,.32,5),i=new Z({color:65535,emissive:30646,emissiveIntensity:1.8,roughness:.2});this.elderTreeFlowers=new gi(r,i,36);let a=new Mn;for(let e=0;e<36;e++){let t=e/36*Math.PI*2+(Math.random()-.5)*.3,n=2.4+Math.random()*3.8,r=Math.cos(t)*n,i=Math.sin(t)*n,o=.2+Math.random()*.3;a.position.set(r,o,i),a.scale.setScalar(.7+Math.random()*.6),a.rotation.set((Math.random()-.5)*.4,Math.random()*Math.PI,(Math.random()-.5)*.4),a.updateMatrix(),this.elderTreeFlowers.setMatrixAt(e,a.matrix)}this.elderTreeFlowers.instanceMatrix.needsUpdate=!0,this.elderTreeHeartGroup.add(this.elderTreeFlowers),this.group.add(this.elderTreeHeartGroup)}buildSecretCrystallinePathway(){this.secretBridgeGroup=new K,this.secretBridgeGroup.visible=!1;let e=new X(1.2,1.4,.45,8),t=new Z({color:62932,emissive:48121,emissiveIntensity:1.2,roughness:.2,metalness:.8,transparent:!0,opacity:.9}),n=new U(-12,12),r=new U(20,-8);for(let i=0;i<7;i++){let a=i/6,o=H.lerp(n.x,r.x,a),s=H.lerp(n.y,r.y,a)+Math.sin(a*Math.PI)*4.5,c=$.LAKE_WATER_Y+.15,l=new J(e,t);l.position.set(o,c,s),l.rotation.y=i*.4,l.receiveShadow=!0,this.secretBridgeGroup.add(l),this.secretBridgeSteppingStones.push(l)}this.group.add(this.secretBridgeGroup)}buildSlumberingForestSpirit(){this.forestSpiritGroup=new K;let e=this.terrain.getHeightAt(40,15);this.forestSpiritGroup.position.set(40,e,15),this.forestSpiritGroup.visible=!1;let t=new Z({color:11066076,emissive:4553629,emissiveIntensity:1.6,transparent:!0,opacity:.85,roughness:.3}),n=new Ni(.55,1.2,4,8);n.rotateZ(Math.PI/2);let r=new J(n,t);r.position.y=1.6,r.castShadow=!0,this.forestSpiritGroup.add(r);let i=new J(new X(.18,.28,.9,6),t);i.position.set(.65,2.1,0),i.rotation.z=-.45,this.forestSpiritGroup.add(i);let a=new Fi(.24,.55,6);a.rotateZ(-Math.PI/2);let o=new J(a,t);o.position.set(1,2.5,0),this.forestSpiritGroup.add(o);let s=new oo(.5,.04,6,12,Math.PI);this.spiritAntlers=new J(s,new qr({color:62932})),this.spiritAntlers.position.set(1,2.9,0),this.spiritAntlers.rotation.y=Math.PI/2,this.forestSpiritGroup.add(this.spiritAntlers),this.spiritLight=new qu(11066076,2.2,14),this.spiritLight.position.set(0,2.2,0),this.forestSpiritGroup.add(this.spiritLight),this.group.add(this.forestSpiritGroup)}buildDeepTempleRunes(){let e=$.TEMPLE_POS,t=this.terrain.getHeightAt(e.x,e.z)+1.82;this.templeRunesGroup=new K,this.templeRunesGroup.position.set(e.x,t,e.z),this.templeRunesGroup.visible=!1;let n=new Z({color:16765286,emissive:16219904,emissiveIntensity:2.4,roughness:.2});for(let e=0;e<8;e++){let t=e/8*Math.PI*2,r=Math.cos(t)*8.5,i=Math.sin(t)*8.5,a=new J(new Y(1.6,.04,.45),n);a.position.set(r,.02,i),a.rotation.y=-t,this.templeRunesGroup.add(a),this.templeRuneMeshes.push(a)}this.group.add(this.templeRunesGroup)}determineBiome(e,t){return Math.hypot(e- -45,t- -65)<26?`ELDER_TREE`:Math.hypot(e-$.TEMPLE_POS.x,t-$.TEMPLE_POS.z)<30?`TEMPLE`:Math.hypot(e-$.PORTAL_POS.x,t-$.PORTAL_POS.z)<26?`PORTAL`:Math.hypot(e-$.LAKE_CENTER.x,t-$.LAKE_CENTER.y)<$.LAKE_RADIUS+8?`LAKE`:Math.hypot(e-$.SUMMIT_POS.x,t-$.SUMMIT_POS.z)<35?`SUMMIT`:e<-70&&t<-40?`GROTTO`:t>60?`SHORELINE`:`FOREST`}updatePlayerTracking(e,t,n,r,i,a){this.profile.totalPlayTimeSec+=e,this.hasInitializedPosition||(this.lastPosition.copy(t),this.hasInitializedPosition=!0);let o=this.lastPosition.distanceTo(t);this.lastPosition.copy(t),n&&o>.01&&(this.profile.sprintDistanceMeters+=o);let s=this.determineBiome(t.x,t.z);this.profile.biomeTimeSec[s]=(this.profile.biomeTimeSec[s]||0)+e,s===this.currentBiome?this.timeInCurrentBiome+=e:(this.previousBiome=this.currentBiome,this.currentBiome=s,this.timeInCurrentBiome=0,this.profile.zonesVisited.includes(s)||this.profile.zonesVisited.push(s),s===`TEMPLE`&&this.profile.templeVisits++,s===`PORTAL`&&this.profile.portalVisits++,s===`ELDER_TREE`&&this.profile.elderTreeVisits++,this.checkSecretDiscovery(s,t)),this.evaluateManifestations(!1,r,i,a)}recordSprintTrigger(){this.profile.sprintCount++}checkSecretDiscovery(e,t){e===`GROTTO`&&!this.profile.secretsFound.includes(`Coastal Rock Grotto`)&&this.profile.secretsFound.push(`Coastal Rock Grotto`),e===`SUMMIT`&&t.y>28&&!this.profile.secretsFound.includes(`High Mountain Summit`)&&this.profile.secretsFound.push(`High Mountain Summit`),e===`ELDER_TREE`&&!this.profile.secretsFound.includes(`Elder Glade Sanctuary`)&&this.profile.secretsFound.push(`Elder Glade Sanctuary`)}evaluateManifestations(e=!1,t=0,n=0,r=0){let i=[];return this.profile.zonesVisited.length>=3&&((this.profile.biomeTimeSec.ELDER_TREE||0)>=15||n>=3||this.profile.elderTreeVisits>=2)&&(!this.profile.manifestations.elder_tree_heart||e)&&(this.profile.manifestations.elder_tree_heart=!0,this.elderTreeHeartGroup&&(this.elderTreeHeartGroup.visible=!0),e||i.push(`elder_tree_heart`)),this.profile.zonesVisited.length>=4&&((this.profile.biomeTimeSec.LAKE||0)>=20||n>=4)&&(!this.profile.manifestations.crystalline_bridge||e)&&(this.profile.manifestations.crystalline_bridge=!0,this.secretBridgeGroup&&(this.secretBridgeGroup.visible=!0),e||i.push(`crystalline_bridge`)),(this.profile.sprintDistanceMeters>=45||this.profile.sprintCount>=5||(this.profile.biomeTimeSec.FOREST||0)>=60)&&(!this.profile.manifestations.forest_spirit||e)&&(this.profile.manifestations.forest_spirit=!0,this.forestSpiritGroup&&(this.forestSpiritGroup.visible=!0),e||i.push(`forest_spirit`)),(this.profile.templeVisits>=2||r>=2)&&(!this.profile.manifestations.temple_deep_runes||e)&&(this.profile.manifestations.temple_deep_runes=!0,this.templeRunesGroup&&(this.templeRunesGroup.visible=!0),e||i.push(`temple_deep_runes`)),t+n>=5&&(!this.profile.manifestations.celestial_aurora||e)&&(this.profile.manifestations.celestial_aurora=!0,e||i.push(`celestial_aurora`)),this.updateArchetype(t,n,r),{newlyUnlocked:i}}updateArchetype(e,t,n){let r=e+t,i=this.profile.sprintDistanceMeters/Math.max(1,this.profile.totalPlayTimeSec),a=this.profile.zonesVisited.length,o=1;o+=Math.min(4,Math.floor(r/2)),o+=Math.min(3,Math.floor(a/2)),this.profile.manifestations.elder_tree_heart&&(o+=1),this.profile.manifestations.crystalline_bridge&&(o+=1),this.profile.worldResonanceLevel=Math.min(10,Math.max(1,o)),this.profile.manifestations.elder_tree_heart&&r>=7?(this.profile.archetypeAr=`سَيِّدُ أَصْدَاءِ الخُلُود`,this.profile.archetypeEn=`Lord of Eternal Echoes`):n>=3?(this.profile.archetypeAr=`حَكِيمُ الأَلْوَاحِ القَدِيمَة`,this.profile.archetypeEn=`Sage of Ancient Tablets`):i>2.5?(this.profile.archetypeAr=`رِيَاحُ الأَثِيرِ العَاتِيَة`,this.profile.archetypeEn=`The Tempest Wind`):a>=6?(this.profile.archetypeAr=`مُسْتَكْشِفُ الآفَاقِ المَجْهُولَة`,this.profile.archetypeEn=`Pathfinder of Unknown Horizons`):r>=4?(this.profile.archetypeAr=`مُنَسِّقُ البَلُّورَاتِ الأَثِيرِيَّة`,this.profile.archetypeEn=`Aetherial Harmonizer`):(this.profile.archetypeAr=`الرَّحَّالَةُ الصَّبُور`,this.profile.archetypeEn=`The Patient Wanderer`)}update(e){if(this.profile.manifestations.elder_tree_heart&&this.elderTreeEyeMesh&&this.elderTreeGlowLight){let t=1+Math.sin(e*3.2)*.18;this.elderTreeEyeMesh.scale.set(t,t,1);let n=this.elderTreeEyeMesh.material;n.emissiveIntensity=3+Math.sin(e*3.2)*1.5,this.elderTreeGlowLight.intensity=4+Math.sin(e*3.2)*1.8}if(this.profile.manifestations.crystalline_bridge&&this.secretBridgeSteppingStones.forEach((t,n)=>{t.position.y=$.LAKE_WATER_Y+.15+Math.sin(e*2.2+n*.8)*.08}),this.profile.manifestations.forest_spirit&&this.forestSpiritGroup){let t=Math.sin(e*1.8)*.06;this.forestSpiritGroup.position.y=this.terrain.getHeightAt(this.forestSpiritGroup.position.x,this.forestSpiritGroup.position.z)+Math.abs(t),this.spiritLight&&(this.spiritLight.intensity=2+Math.sin(e*2.5)*.8)}this.profile.manifestations.temple_deep_runes&&this.templeRuneMeshes.forEach((t,n)=>{let r=t.material;r.emissiveIntensity=2+Math.sin(e*2.8+n*.7)*1})}serialize(){return JSON.parse(JSON.stringify(this.profile))}deserialize(e){e&&(this.profile={...this.createDefaultProfile(),...e,biomeTimeSec:{...this.createDefaultProfile().biomeTimeSec,...e.biomeTimeSec||{}},manifestations:{...this.createDefaultProfile().manifestations,...e.manifestations||{}}},this.elderTreeHeartGroup&&(this.elderTreeHeartGroup.visible=!!this.profile.manifestations.elder_tree_heart),this.secretBridgeGroup&&(this.secretBridgeGroup.visible=!!this.profile.manifestations.crystalline_bridge),this.forestSpiritGroup&&(this.forestSpiritGroup.visible=!!this.profile.manifestations.forest_spirit),this.templeRunesGroup&&(this.templeRunesGroup.visible=!!this.profile.manifestations.temple_deep_runes))}reset(){this.profile=this.createDefaultProfile(),this.elderTreeHeartGroup&&(this.elderTreeHeartGroup.visible=!1),this.secretBridgeGroup&&(this.secretBridgeGroup.visible=!1),this.forestSpiritGroup&&(this.forestSpiritGroup.visible=!1),this.templeRunesGroup&&(this.templeRunesGroup.visible=!1)}getCurrentBiome(){return od[this.currentBiome]||od.SHORELINE}},cd=class{constructor(){this.quests=[],this.currentQuestIndex=0,this.currentObjectiveIndex=0,this.startPosition=new W($.SPAWN_POS.x,5,$.SPAWN_POS.z),this.distanceTraveled=0,this.lastPosition=new W($.SPAWN_POS.x,5,$.SPAWN_POS.z),this.hasShownPrologue=!1,this.exploredAreas=new Set,this.initQuests()}initQuests(){let e={id:`quest_first_memory`,chapter:1,titleAr:`الذاكرة الأولى`,titleEn:`THE FIRST MEMORY`,loreIntroAr:`يستيقظ المغامر على رمال الشاطئ بعد أن قذفته أمواج النسيان، ليكتشف أن جزيرة الصدى تحتفظ بذكريات كل من عبرها.`,loreIntroEn:`A wanderer awakens upon forgotten shores with no memory of their arrival, learning that the island preserves the memories of all who crossed it.`,objectives:[{id:`explore_island`,titleAr:`استكشف الجزيرة`,titleEn:`Explore the Island`,descAr:`انهض من رمال الشاطئ وتحرك لاكتشاف معالم الجزيرة المنسية وأراضيها الغامضة.`,descEn:`Rise from the shoreline sands and explore the surroundings of the Forgotten Island.`,hintAr:`امشِ مسافة قصيرة واكتشف نتوء الشاطئ أو مشارف الغابة (تحرك للأمام بالضغط على W أو عصا التحكم)`,hintEn:`Walk forward to explore the southern shoreline and forest borders.`,currentCount:0,targetCount:35,isCompleted:!1,isUnlocked:!0,completionStoryTitleAr:`همس الشاطئ المنسي`,completionStoryTitleEn:`Whispers of the Lost Shore`,completionStoryAr:`مع أولى خطواتك، تشعر برنين غريب يسري تحت أقدامك. رمال هذا الشاطئ ليست صامتة؛ إنها تحفظ خطوات كل من وصل هنا قبلك. لقد استيقظت أصداء الجزيرة!`,completionStoryEn:`With your first steps, a resonant pulse hums beneath your feet. The sands are not silent; they remember all who walked before you. The island stirs!`},{id:`collect_3_shards`,titleAr:`اجمع ثلاث شظايا ذاكرة`,titleEn:`Collect 3 Memory Shards`,descAr:`ابحث عن شظايا الذاكرة الفيروزية العائمة واجمع ثلاثاً منها لسماع أصداء الماضي.`,descEn:`Seek out the glowing astral Memory Shards scattered across the island and gather three of them.`,hintAr:`تتبع النور الفيروزي والأصفر على البوصلة والمصغرة، واقترب من الشظية ثم اضغط [E] أو زر التفاعل`,hintEn:`Follow the glowing markers on the minimap, approach the floating shards, and interact [E].`,currentCount:0,targetCount:3,isCompleted:!1,isUnlocked:!1,completionStoryTitleAr:`تلاحم الشظايا الأثيرية`,completionStoryTitleEn:`The Resonance of Memory`,completionStoryAr:`عندما التقت الشظايا الثلاث في راحة يدك، تدفق وميضٌ دافئ في عروقك وصوتٌ أثيري قديم يهمس: «شمال غرب الجزيرة... بين أعمدة معبد الأسرار يرقد اللوح الذي كتبه الأوائل!»`,completionStoryEn:`As three memory shards unite, warm ethereal light surges through you: "To the northwest... within the pillars of the Ancient Temple rests the stele carved by the first keepers!"`},{id:`discover_temple`,titleAr:`اكتشف المعبد القديم`,titleEn:`Discover the Ancient Temple`,descAr:`اتجه نحو الشمال الغربي عبر هضاب الصخور واعثر على صرح المعبد القديم الشاهق.`,descEn:`Journey northwest across the rugged heights to discover the towering Ancient Temple sanctuary.`,hintAr:`اتجه للشمال الغربي (راجع الخريطة أو البوصلة باتجاه الأعمدة الحجرية الدائرية الكبرى)`,hintEn:`Head northwest toward the colossal circular stone colonnade on the high plateau.`,currentCount:0,targetCount:1,isCompleted:!1,isUnlocked:!1,targetPos:new W($.TEMPLE_POS.x,$.TEMPLE_POS.y,$.TEMPLE_POS.z),targetRadius:26,completionStoryTitleAr:`عتبة معبد الأسرار`,completionStoryTitleEn:`Threshold of the Sanctuary`,completionStoryAr:`تقف أخيراً أمام الأعمدة الحجرية الهائلة لمعبد الأسرار. الزمن هنا متوقف، ومسلة حجرية عتيقة في فناء المعبد تنبض بنقوش فيروزية مضيئة تنتظر من يقرأها.`,completionStoryEn:`You stand before the colossal pillars of the ancient sanctuary. Time stands still here; a monolithic stele pulses with luminous turquoise runes in the forecourt, awaiting your touch.`},{id:`read_temple_inscription`,titleAr:`اقرأ النقش الموجود في المعبد`,titleEn:`Read the Temple Inscription`,descAr:`اقترب من مسلة لوح معبد الأسرار المنقوشة وتفاعل معها لقراءة كلماتها القديمة.`,descEn:`Approach the carved Stele of the Sanctuary Veil near the temple entrance and read its ancient text.`,hintAr:`اقترب من المسلة الحجرية ذات الرموز المشعة أمام مدخل المعبد واضغط [E]`,hintEn:`Step close to the glowing stone stele in front of the temple archway and press [E].`,currentCount:0,targetCount:1,isCompleted:!1,isUnlocked:!1,completionStoryTitleAr:`سر الختم الحجري`,completionStoryTitleEn:`Secret of the Stone Seal`,completionStoryAr:`تترجم روحك النقش القديم: «الأبواب المغلقة هنا لا تطلب مفاتيح حديدية، بل نية طاهرة ولمسة من أثير الروح. اقترب والمس الختم لفتح الملاذ.» الآن يمكنك فك الختم وفتح البوابة الحجرية!`,completionStoryEn:`The ancient runes translate in your mind: "The sealed portals yield to no iron keys, but to pure intent and the touch of aether." The seal responds to your awakened spirit—the stone gate can now be unsealed!`},{id:`open_stone_gate`,titleAr:`افتح البوابة الحجرية`,titleEn:`Open the Stone Gate`,descAr:`اقترب من بوابة المعبد الحجرية الضخمة واضغط على الختم المضيء لفتحها ودخول قدس الأقداس.`,descEn:`Approach the massive sliding stone gate of the temple and activate its glowing seal to open the sanctuary.`,hintAr:`قف أمام البوابة الحجرية ذات الختم الفيروزي الكبير واضغط [E] لفتحها`,hintEn:`Stand before the temple stone gate bearing the turquoise seal and press [E] to open it.`,currentCount:0,targetCount:1,isCompleted:!1,isUnlocked:!1,completionStoryTitleAr:`انفتاح الأفق · اكتمال الذاكرة الأولى`,completionStoryTitleEn:`The First Memory Awakening`,completionStoryAr:`بصوت زئير الحجر الرخيم، تنزاح البوابة الصخرية الضخمة إلى الأعلى متحررة من قيود القرون! شعاع من الضوء الأزرق يملأ الأرجاء، وذاكرتك الأولى تكتمل: أنت لست غريباً عن هذه الجزيرة، بل مستكشف مقدر له إيقاظ بلورات الصدى السبع وفتح بوابة العبور الكبرى!`,completionStoryEn:`With a deep resonant grinding of ancient stone, the colossal slab ascends, unsealed after centuries! Radiant celestial light fills the sanctuary. Your first memory is restored: you are destined to awaken the 7 Echo Crystals and unlock the Great Transcendent Portal!`}],isCompleted:!1},t={id:`quest_echoes_awakening`,chapter:2,titleAr:`استيقاظ الأصداء الكونية`,titleEn:`THE AWAKENING OF THE ECHOES`,loreIntroAr:`أصبحت الرؤية واضحة الآن: تجميع البلورات السبعة سيوقظ البوابة السماوية ليعبر المغامر إلى عوالمه الأصلية.`,loreIntroEn:`The path is now clear: gathering all seven primal crystals will ignite the cosmic portal for your ascension.`,objectives:[{id:`collect_all_crystals`,titleAr:`اجمع بلورات الصدى السبع`,titleEn:`Awaken the 7 Echo Crystals`,descAr:`ابحث عن بلورات الصدى السبع العملاقة الموزعة عبر بيئات الجزيرة المنسية.`,descEn:`Locate and commune with all 7 colossal Echo Crystals scattered across the island biomes.`,hintAr:`استكشف البحيرة المضيئة، الغابة، الكهوف، وقمة الجبل لجمع البلورات`,hintEn:`Explore the bioluminescent lake, whispering forest, cave grotto, and mountain peak.`,currentCount:0,targetCount:7,isCompleted:!1,isUnlocked:!0},{id:`activate_great_portal`,titleAr:`فعّل البوابة الحجرية العظيمة`,titleEn:`Activate the Great Celestial Portal`,descAr:`اتجه إلى منصة البوابة الحجرية العظمى في الشرق وأشعل الرموز السبعة للعبور إلى النور الأبدي.`,descEn:`Travel to the eastern megalithic portal platform and ignite all seven runes to transcend.`,hintAr:`اقترب من البوابة الكبرى واضغط [E] لفتح أفق العبور الكوني`,hintEn:`Approach the Great Portal and press [E] to trigger cosmic ascension.`,currentCount:0,targetCount:1,isCompleted:!1,isUnlocked:!1,targetPos:new W($.PORTAL_POS.x,$.PORTAL_POS.y,$.PORTAL_POS.z),targetRadius:12}],isCompleted:!1};this.quests=[e,t]}getPrologueEvent(){return{id:`story_prologue`,badgeAr:`بداية الرحلة · THE AWAKENING`,badgeEn:`Prologue · The Awakening`,titleAr:`الاستيقاظ على شاطئ النسيان`,titleEn:`Awakening on Forgotten Sands`,contentAr:`تفتح عينيك لتجد نفسك مستلقياً على رمال شاطئ فيروزي دافئ... لا تتذكر اسمك، ولا كيف عبرت هذا المحيط الشاسع. نسيم عليل يحمل رائحة صنوبر قديم وأمواج تتهادى بنعومة.

في عمق وجدانك، يهمس صدى رقيق: «أهلاً بك في جزيرة الأصداء. هذا العالم لا ينسى أحداً... كل من وطأت قدماه هذه الأرض ترك روحه منقوشة في حجرها ومائها وبلوراتها. استيقظ، واستعد ذاكرتك الأولى!»`,contentEn:`You open your eyes upon warm turquoise sands, unable to recall your name or how you reached this boundless ocean. An ethereal whisper echoes in your mind: "Welcome to the Island of Echoes. This world remembers everyone who entered it... Awaken, and reclaim your first memory!"`,quoteAr:`«العالم يتذكر كل من مر به... وأصداء الماضي تنتظر من يناديها.»`,quoteEn:`"The world remembers all who walked it... and echoes of the past await your call."`,icon:`sparkles`}}getActiveQuest(){return this.quests[this.currentQuestIndex]||this.quests[0]}getActiveObjective(){return this.getActiveQuest().objectives.find(e=>e.isUnlocked&&!e.isCompleted)||null}updatePlayerMovement(e){let t=this.lastPosition.distanceTo(e);if(t>.05&&t<5){this.distanceTraveled+=t,this.lastPosition.copy(e);let n=this.getActiveObjective();if(n&&n.id===`explore_island`){let e=Math.min(Math.floor(this.distanceTraveled),n.targetCount);e!==n.currentCount&&(n.currentCount=e,this.onObjectiveUpdated?.(this.getActiveQuest(),n),n.currentCount>=n.targetCount&&this.completeObjective(n.id))}}let n=this.getActiveObjective();n&&n.id===`discover_temple`&&n.targetPos&&n.targetRadius&&e.distanceTo(n.targetPos)<=n.targetRadius&&(n.currentCount=1,this.completeObjective(`discover_temple`))}recordShardCollected(e){let t=this.getActiveObjective();t&&t.id===`collect_3_shards`&&(t.currentCount=Math.min(e,t.targetCount),this.onObjectiveUpdated?.(this.getActiveQuest(),t),t.currentCount>=t.targetCount&&this.completeObjective(`collect_3_shards`))}recordInscriptionRead(e){let t=this.getActiveObjective();t&&t.id===`read_temple_inscription`&&(e===2||e===0||e===1||e===3||e===4)&&(t.currentCount=1,this.completeObjective(`read_temple_inscription`))}recordStoneGateAction(e){let t=this.getActiveObjective();t&&t.id===`open_stone_gate`&&e&&(t.currentCount=1,this.completeObjective(`open_stone_gate`))}recordCrystalCount(e){let t=this.quests[1];if(t){let n=t.objectives.find(e=>e.id===`collect_all_crystals`);n&&n.isUnlocked&&(n.currentCount=Math.min(e,n.targetCount),this.onObjectiveUpdated?.(t,n),n.currentCount>=n.targetCount&&!n.isCompleted&&this.completeObjective(`collect_all_crystals`))}}completeObjective(e){let t=this.getActiveQuest(),n=t.objectives.findIndex(t=>t.id===e);if(n<0)return;let r=t.objectives[n];if(r.isCompleted)return;r.isCompleted=!0,r.currentCount=r.targetCount,r.completionStoryAr&&r.completionStoryTitleAr&&this.onStoryNarrativeTriggered?.({id:`story_${r.id}`,badgeAr:`فصل من القصة · ${t.titleAr}`,badgeEn:`Story Chapter · ${t.titleEn}`,titleAr:r.completionStoryTitleAr,titleEn:r.completionStoryTitleEn||``,contentAr:r.completionStoryAr,contentEn:r.completionStoryEn||``,icon:`parchment`});let i=t.objectives[n+1]||null;if(i)i.isUnlocked=!0;else{t.isCompleted=!0;let e=this.quests[this.currentQuestIndex+1]||null;e&&(this.currentQuestIndex++,e.objectives[0].isUnlocked=!0),this.onQuestCompleted?.(t,e)}this.onObjectiveCompleted?.(t,r,i)}resetAll(){this.distanceTraveled=0,this.currentQuestIndex=0,this.currentObjectiveIndex=0,this.hasShownPrologue=!1,this.exploredAreas.clear(),this.quests.forEach((e,t)=>{e.isCompleted=!1,e.objectives.forEach((e,n)=>{e.isCompleted=!1,e.currentCount=0,e.isUnlocked=t===0&&n===0})})}serialize(){return{currentQuestIndex:this.currentQuestIndex,distanceTraveled:this.distanceTraveled,quests:this.quests.map(e=>({id:e.id,isCompleted:e.isCompleted,objectives:e.objectives.map(e=>({id:e.id,currentCount:e.currentCount,isCompleted:e.isCompleted,isUnlocked:e.isUnlocked}))}))}}deserialize(e){if(!e||typeof e!=`object`)return;let t=e;typeof t.currentQuestIndex==`number`&&(this.currentQuestIndex=Math.min(t.currentQuestIndex,this.quests.length-1)),typeof t.distanceTraveled==`number`&&(this.distanceTraveled=t.distanceTraveled),Array.isArray(t.quests)&&t.quests.forEach(e=>{let t=this.quests.find(t=>t.id===e.id);t&&(t.isCompleted=e.isCompleted,Array.isArray(e.objectives)&&e.objectives.forEach(e=>{let n=t.objectives.find(t=>t.id===e.id);n&&(n.currentCount=e.currentCount,n.isCompleted=e.isCompleted,n.isUnlocked=e.isUnlocked)}))})}},ld=new W,ud=new W,dd=class{constructor(e){this.terrain=e,this.id=`wanderer_forest`,this.nameAr=`عابر الغابة الغامض`,this.nameEn=`The Shrouded Wanderer`,this.titleAr=`حارس أسرار الغابة الهامسة`,this.titleEn=`Keeper of the Whispering Forest`,this.portraitUrl=`/assets/aistudio/902496527_1823591332005868_4146964911404786464_n_35a4a4fd.jpg`,this.waypoints=[new W(-30,0,42),new W(-22,0,36),new W(-38,0,52),new W(-28,0,48)],this.currentWaypointIdx=0,this.moveSpeed=1.15,this.state=`PATROL`,this.stateTimer=0,this.wisps=[],this.group=new K,this.group.name=`ForestWanderer`;let t=new Z({color:1580068,roughness:.9,metalness:.1,bumpScale:.05}),n=new Z({color:987930,roughness:.95}),r=new Z({color:4007702,roughness:.85}),i=new Z({color:62932,emissive:62932,emissiveIntensity:1.6,roughness:.1,metalness:.2,transparent:!0,opacity:.92}),a=new qr({color:3718648}),o=new X(.24,.38,1.35,12);this.bodyMesh=new J(o,n),this.bodyMesh.position.y=.68,this.bodyMesh.castShadow=!0,this.group.add(this.bodyMesh);let s=new Fi(.48,1.45,12,1,!0);this.cloakMesh=new J(s,t),this.cloakMesh.position.y=.72,this.cloakMesh.castShadow=!0,this.group.add(this.cloakMesh);let c=new ao(.26,16,12,0,Math.PI*2,0,Math.PI*.75);this.hoodMesh=new J(c,t),this.hoodMesh.position.set(0,1.48,.02),this.hoodMesh.rotation.x=.15,this.group.add(this.hoodMesh);let l=new ao(.025,8,8);this.eyeLeft=new J(l,a),this.eyeLeft.position.set(-.065,1.45,.16),this.eyeRight=new J(l,a),this.eyeRight.position.set(.065,1.45,.16),this.group.add(this.eyeLeft,this.eyeRight),this.staffGroup=new K,this.staffGroup.position.set(.35,0,.25);let u=new J(new X(.026,.038,1.95,8),r);u.position.y=.95,u.castShadow=!0,this.staffGroup.add(u);let d=new J(new oo(.09,.022,8,16,Math.PI*1.5),r);d.position.set(0,1.92,0),d.rotation.z=Math.PI*.25,this.staffGroup.add(d);let f=new no(.08,0);this.staffCrystalMesh=new J(f,i),this.staffCrystalMesh.position.set(0,1.98,0),this.staffGroup.add(this.staffCrystalMesh),this.crystalLight=new qu(62932,1.8,6),this.crystalLight.position.set(0,1.98,0),this.staffGroup.add(this.crystalLight),this.group.add(this.staffGroup);let p=new ao(.02,6,6),m=new qr({color:3718648});for(let e=0;e<3;e++){let e=new J(p,m);this.wisps.push(e),this.group.add(e)}let h=this.waypoints[0],g=this.terrain.getHeightAt(h.x,h.z);this.group.position.set(h.x,g,h.z)}update(e,t,n,r){let i=this.group.position.distanceTo(n);if(r?this.state=`TALKING`:i<9?this.state=`NOTICED`:(this.state===`NOTICED`||this.state===`TALKING`)&&(this.state=`PATROL`),this.state===`PATROL`){let n=this.waypoints[this.currentWaypointIdx];ld.set(n.x,0,n.z),ud.set(this.group.position.x,0,this.group.position.z);let r=ld.sub(ud);if(r.length()<.6)this.state=`WAITING`,this.stateTimer=2.5+Math.random()*2,this.currentWaypointIdx=(this.currentWaypointIdx+1)%this.waypoints.length;else{r.normalize(),this.group.position.x+=r.x*this.moveSpeed*e,this.group.position.z+=r.z*this.moveSpeed*e;let n=Math.atan2(r.x,r.z);this.smoothRotateY(n,4*e),this.bodyMesh.position.y=.68+Math.sin(t*5)*.03,this.staffGroup.position.y=Math.sin(t*5+1)*.04,this.cloakMesh.rotation.z=Math.sin(t*5)*.04}}else if(this.state===`WAITING`)this.stateTimer-=e,this.stateTimer<=0&&(this.state=`PATROL`),this.bodyMesh.position.y=.68+Math.sin(t*2)*.015;else if(this.state===`NOTICED`||this.state===`TALKING`){let t=ld.copy(n).sub(this.group.position);if(t.y=0,t.lengthSq()>.01){t.normalize();let n=Math.atan2(t.x,t.z);this.smoothRotateY(n,5*e)}let i=r?.08:.03;this.staffGroup.position.y=H.lerp(this.staffGroup.position.y,i,e*3)}let a=this.terrain.getHeightAt(this.group.position.x,this.group.position.z);this.group.position.y=a,this.staffCrystalMesh.rotation.y=t*1.5,this.staffCrystalMesh.rotation.x=Math.sin(t*.8)*.2,this.staffCrystalMesh.position.y=1.98+Math.sin(t*3)*.04,this.crystalLight.intensity=1.5+Math.sin(t*4)*.4,this.wisps.forEach((e,n)=>{let r=t*1.2+n*Math.PI*2/3,i=.45+Math.sin(t*2+n)*.1;e.position.set(Math.cos(r)*i,1.2+Math.sin(t*2.5+n)*.25,Math.sin(r)*i)})}smoothRotateY(e,t){let n=e-this.group.rotation.y;for(;n<-Math.PI;)n+=Math.PI*2;for(;n>Math.PI;)n-=Math.PI*2;this.group.rotation.y+=n*Math.min(1,t)}},fd=class{constructor(e){this.terrain=e,this.id=`guardian_temple`,this.nameAr=`حارس المعبد العتيق`,this.nameEn=`The Ancient Stone Sentinel`,this.titleAr=`حامي محراب الألواح والعهد`,this.titleEn=`Protector of the Sacred Tablets`,this.portraitUrl=`/assets/aistudio/900710163_2383229942425587_5203725200407765596_n_5dfc21a4.jpg`,this.waypoints=[new W(-72,0,24),new W(-76,0,28)],this.currentWaypointIdx=0,this.moveSpeed=.65,this.state=`PATROL`,this.group=new K,this.group.name=`TempleGuardian`;let t=new Z({color:3357511,roughness:.9,metalness:.15}),n=new Z({color:61695,emissive:61695,emissiveIntensity:1.8,roughness:.2}),r=new Z({color:2370099,roughness:.7,metalness:.6}),i=new Y(.95,1.25,.65);this.torsoMesh=new J(i,t),this.torsoMesh.position.y=1.35,this.torsoMesh.castShadow=!0,this.group.add(this.torsoMesh);let a=new Y(.38,.45,.48),o=new J(a,t);o.position.set(-.62,1.78,0);let s=new J(a,t);s.position.set(.62,1.78,0),this.group.add(o,s);let c=new Y(.24,.95,.26),l=new J(c,t);l.position.set(-.62,1.15,.08);let u=new J(c,t);u.position.set(.62,1.15,.08),this.group.add(l,u);let d=new Y(.48,.48,.46);this.headMesh=new J(d,t),this.headMesh.position.set(0,2.18,.04),this.headMesh.castShadow=!0,this.group.add(this.headMesh);let f=new Y(.32,.065,.04);this.runeEyeMesh=new J(f,n),this.runeEyeMesh.position.set(0,2.18,.28),this.group.add(this.runeEyeMesh);let p=new Li(.12,0);this.coreCrystal=new J(p,n),this.coreCrystal.position.set(0,1.45,.34),this.group.add(this.coreCrystal),this.coreLight=new qu(61695,2.2,7),this.coreLight.position.set(0,1.45,.42),this.group.add(this.coreLight),this.greatSword=new K,this.greatSword.position.set(.42,0,.45);let m=new J(new Y(.16,2.1,.05),r);m.position.y=1.05,m.castShadow=!0,this.greatSword.add(m);let h=new J(new ro(.04,1.6),n);h.position.set(0,1.05,.028),this.greatSword.add(h);let g=new J(new Y(.48,.08,.09),t);g.position.y=2.1,this.greatSword.add(g);let _=new J(new X(.03,.03,.38,8),r);_.position.y=2.32,this.greatSword.add(_),this.group.add(this.greatSword);let v=this.waypoints[0],y=this.terrain.getHeightAt(v.x,v.z);this.group.position.set(v.x,y,v.z)}update(e,t,n,r){let i=this.group.position.distanceTo(n);if(this.state=r?`TALKING`:i<11?`NOTICED`:`PATROL`,this.state===`PATROL`){let n=this.waypoints[this.currentWaypointIdx];ld.set(n.x,0,n.z),ud.set(this.group.position.x,0,this.group.position.z);let r=ld.sub(ud);if(r.length()<.5)this.currentWaypointIdx=(this.currentWaypointIdx+1)%this.waypoints.length;else{r.normalize(),this.group.position.x+=r.x*this.moveSpeed*e,this.group.position.z+=r.z*this.moveSpeed*e;let n=Math.atan2(r.x,r.z);this.smoothRotateY(n,2.5*e),this.torsoMesh.position.y=1.35+Math.sin(t*3)*.04}}else if(this.state===`NOTICED`||this.state===`TALKING`){let r=ld.copy(n).sub(this.group.position);if(r.y=0,r.lengthSq()>.01){r.normalize();let t=Math.atan2(r.x,r.z);this.smoothRotateY(t,3.5*e)}this.torsoMesh.position.y=1.35+Math.sin(t*1.5)*.02}let a=this.terrain.getHeightAt(this.group.position.x,this.group.position.z);this.group.position.y=a;let o=Math.sin(t*3);this.coreLight.intensity=2+o*.7,this.coreCrystal.rotation.y=t*.8}smoothRotateY(e,t){let n=e-this.group.rotation.y;for(;n<-Math.PI;)n+=Math.PI*2;for(;n>Math.PI;)n-=Math.PI*2;this.group.rotation.y+=n*Math.min(1,t)}},pd=class{constructor(e,t,n,r){this.terrain=e,this.titleAr=`روح الطبيعة الحارسة للغابة`,this.titleEn=`Guardian Spirit of the Deep Pines`,this.portraitUrl=`/assets/aistudio/900555379_1478156927556307_6539741191511944864_n_9ff5ae9c.jpg`,this.roamRadius=18,this.state=`GRAZING`,this.stateTimer=3,this.walkSpeed=1.6,this.runSpeed=4.8,this.legMeshes=[],this.wisps=[],this.id=`creature_stag_${r}`,this.nameAr=r===1?`ظبي الضياء الأكبر`:`روح الضياء (${r})`,this.nameEn=r===1?`Elder Light Stag`:`Forest Light Spirit (${r})`,this.group=new K,this.group.name=`SpiritCreature_${r}`,this.homePos=new W(t,0,n),this.targetPos=this.homePos.clone();let i=new Z({color:10090212,emissive:3003583,emissiveIntensity:.85,roughness:.25,metalness:.1,transparent:!0,opacity:.88}),a=new Z({color:3718648,emissive:3718648,emissiveIntensity:1.6,roughness:.15,metalness:.3}),o=new X(.24,.28,.95,10);o.rotateZ(Math.PI/2),this.bodyMesh=new J(o,i),this.bodyMesh.position.y=.85,this.bodyMesh.castShadow=!0,this.group.add(this.bodyMesh);let s=new X(.12,.18,.55,8);s.rotateX(-.45),this.neckMesh=new J(s,i),this.neckMesh.position.set(0,1.15,.38),this.group.add(this.neckMesh);let c=new Fi(.14,.36,8);c.rotateX(Math.PI/2),this.headMesh=new J(c,i),this.headMesh.position.set(0,1.38,.58),this.group.add(this.headMesh);let l=new oo(.22,.022,6,12,Math.PI*.9);this.antlersLeft=new J(l,a),this.antlersLeft.position.set(-.16,1.62,.52),this.antlersLeft.rotation.set(-.35,-.4,.5),this.group.add(this.antlersLeft),this.antlersRight=new J(l,a),this.antlersRight.position.set(.16,1.62,.52),this.antlersRight.rotation.set(-.35,.4,-.5),this.group.add(this.antlersRight);let u=new X(.045,.035,.72,6);[[-.15,.36,.3],[.15,.36,.3],[-.15,.36,-.3],[.15,.36,-.3]].forEach(([e,t,n])=>{let r=new J(u,i);r.position.set(e,t,n),r.castShadow=!0,this.legMeshes.push(r),this.group.add(r)}),this.creatureLight=new qu(3003583,1.2,5),this.creatureLight.position.set(0,1.2,0),this.group.add(this.creatureLight);let d=new ao(.025,6,6),f=new qr({color:6220500});for(let e=0;e<2;e++){let e=new J(d,f);this.wisps.push(e),this.group.add(e)}let p=this.terrain.getHeightAt(t,n);this.group.position.set(t,p,n),this.pickNewTarget()}pickNewTarget(){let e=Math.random()*Math.PI*2,t=Math.random()*this.roamRadius;this.targetPos.set(this.homePos.x+Math.cos(e)*t,0,this.homePos.z+Math.sin(e)*t)}update(e,t,n,r){let i=this.group.position.distanceTo(n);if(i<9&&r){this.state=`FLEEING`;let e=ld.copy(this.group.position).sub(n);e.y=0,e.normalize(),this.targetPos.copy(this.group.position).addScaledVector(e,14),this.stateTimer=4}else i<6&&!r&&this.state!==`FLEEING`&&(this.state=`ALERT`);if(this.state===`GRAZING`)this.stateTimer-=e,this.headMesh.position.y=.95+Math.sin(t*2)*.05,this.neckMesh.rotation.x=-.7,this.stateTimer<=0&&(this.pickNewTarget(),this.state=`WANDERING`);else if(this.state===`ALERT`){let r=ld.copy(n).sub(this.group.position);if(r.y=0,r.lengthSq()>.01){r.normalize();let t=Math.atan2(r.x,r.z);this.smoothRotateY(t,3*e)}this.headMesh.position.y=1.45+Math.sin(t*1.5)*.03,this.neckMesh.rotation.x=-.2,i>8&&(this.state=`GRAZING`,this.stateTimer=4)}else if(this.state===`WANDERING`||this.state===`FLEEING`){ld.set(this.targetPos.x,0,this.targetPos.z),ud.set(this.group.position.x,0,this.group.position.z);let n=ld.sub(ud),r=n.length(),i=this.state===`FLEEING`?this.runSpeed:this.walkSpeed;if(r<.8)this.state=`GRAZING`,this.stateTimer=3+Math.random()*4,this.resetLegs();else{n.normalize(),this.group.position.x+=n.x*i*e,this.group.position.z+=n.z*i*e;let r=Math.atan2(n.x,n.z);this.smoothRotateY(r,(this.state===`FLEEING`?8:3.5)*e);let a=this.state===`FLEEING`?12:6;this.legMeshes[0].rotation.x=Math.sin(t*a)*.45,this.legMeshes[1].rotation.x=-Math.sin(t*a)*.45,this.legMeshes[2].rotation.x=-Math.sin(t*a)*.45,this.legMeshes[3].rotation.x=Math.sin(t*a)*.45,this.bodyMesh.position.y=.85+Math.abs(Math.sin(t*a))*.05}}else this.state===`PETTED`&&(this.stateTimer-=e,this.headMesh.position.y=1.35+Math.sin(t*2)*.02,this.stateTimer<=0&&(this.state=`GRAZING`,this.stateTimer=4));let a=this.terrain.getHeightAt(this.group.position.x,this.group.position.z);this.group.position.y=a,this.wisps.forEach((e,n)=>{let r=t*2+n*Math.PI;e.position.set(Math.cos(r)*.45,1.2+Math.sin(t*3+n)*.15,Math.sin(r)*.45)}),this.creatureLight.intensity=1+Math.sin(t*3)*.35}pet(){this.state=`PETTED`,this.stateTimer=5,this.creatureLight.intensity=2.8}resetLegs(){this.legMeshes.forEach(e=>e.rotation.x=0)}smoothRotateY(e,t){let n=e-this.group.rotation.y;for(;n<-Math.PI;)n+=Math.PI*2;for(;n>Math.PI;)n-=Math.PI*2;this.group.rotation.y+=n*Math.min(1,t)}},md=class{constructor(e,t,n,r){this.terrain=e,this.sound=t,this.questSystem=n,this.memorySystem=r,this.creatures=[],this.currentTalkingNPC=null,this.lastDialogueNode=null,this.group=new K,this.group.name=`NPCWorldGroup`,this.wanderer=new dd(this.terrain),this.group.add(this.wanderer.group),this.guardian=new fd(this.terrain),this.group.add(this.guardian.group),[{x:-38,z:62},{x:-22,z:72},{x:-14,z:84}].forEach((e,t)=>{let n=new pd(this.terrain,e.x,e.z,t+1);this.creatures.push(n),this.group.add(n.group)})}update(e,t,n,r){this.wanderer.update(e,t,n,this.currentTalkingNPC===this.wanderer.id),this.guardian.update(e,t,n,this.currentTalkingNPC===this.guardian.id),this.creatures.forEach(i=>i.update(e,t,n,r))}findClosestNPC(e,t=3.6){let n=null,r=t,i=this.wanderer.group.position.distanceTo(e);i<r&&(r=i,n={id:this.wanderer.id,nameAr:this.wanderer.nameAr,nameEn:this.wanderer.nameEn,type:`WANDERER`,actionPromptAr:`تحدث مع عابر الغابة الغامض`,actionPromptEn:`Speak with the Shrouded Wanderer`,position:this.wanderer.group.position.clone(),distance:i});let a=this.guardian.group.position.distanceTo(e);a<r&&(r=a,n={id:this.guardian.id,nameAr:this.guardian.nameAr,nameEn:this.guardian.nameEn,type:`GUARDIAN`,actionPromptAr:`تفاعل مع حارس المعبد`,actionPromptEn:`Commune with the Temple Guardian`,position:this.guardian.group.position.clone(),distance:a});for(let t of this.creatures){let i=t.group.position.distanceTo(e);i<r&&(r=i,n={id:t.id,nameAr:t.nameAr,nameEn:t.nameEn,type:`CREATURE`,actionPromptAr:`المس روح الضياء الأثيرية`,actionPromptEn:`Commune with the Light Spirit`,position:t.group.position.clone(),distance:i})}return n}getNPCMinimapBlips(){let e=[];e.push({pos:{x:this.wanderer.group.position.x,z:this.wanderer.group.position.z},type:`WANDERER`}),e.push({pos:{x:this.guardian.group.position.x,z:this.guardian.group.position.z},type:`GUARDIAN`});for(let t of this.creatures)e.push({pos:{x:t.group.position.x,z:t.group.position.z},type:`CREATURE`});return e}getDialogueFor(e,t=`root`){this.currentTalkingNPC=e;let n=this.questSystem.getActiveObjective(),r=this.memorySystem.profile;if(e===this.wanderer.id)return this.sound.playNPCVoice(`wanderer`),this.generateWandererDialogue(t,n?.id,r);if(e===this.guardian.id)return this.sound.playNPCVoice(`guardian`),this.generateGuardianDialogue(t,n?.id,r);{this.sound.playNPCVoice(`creature`);let n=this.creatures.find(t=>t.id===e);return n&&n.pet(),this.generateCreatureDialogue(t,r)}}closeDialogue(){this.currentTalkingNPC=null}generateWandererDialogue(e,t,n){let r=``,i=``;if(n&&(n.sprintCount>8||n.sprintDistanceMeters>120?(r=`أراك تركض بين أشجار الصنوبر كمن يطارده ماضٍ غائب... تمهل يا غريب، فالجزيرة لا تبوح بأسرارها لمن يلهث مسرعاً.

`,i=`I see you sprinting breathlessly through the pines... Slow your stride, traveler, for this realm only whispers to the patient soul.

`):n.biomeTimeSec?.LAKE>50&&(r=`لقد استشعرت وقوفك الطويل عند البحيرة المضيئة... مياهها تعكس أصداء من لم يعودوا. روحك هادئة كالماء الساكن.

`,i=`I felt your long meditation beside the glowing lake... Its waters preserve the echoes of those who never returned. Your soul is still like the deep.

`)),e===`root`){let e=`أهلاً بك في غابة الصنوبر الهامسة يا من استيقظ بلا اسم ولا ذكرى. أنا عابرٌ مثلك، لكنني سمعت أنفاس هذه الأرض منذ دهور.`,n=`Welcome to the Whispering Pine Forest, nameless traveler who awoke with an empty past. I am a wanderer like you, yet I have listened to the breath of this soil for ages.`;return t===`explore_island`?(e+=`

خطواتك الأولى أيقظت رمال الشاطئ، لكن أسرار الجزيرة تنبض في أعماق الغابة وقممها.`,n+=`

Your first steps stirred the sands, but the island’s true secrets pulse within these trees and high summits.`):t===`collect_3_shards`?(e+=`

أشعر بتوقك للذكريات... ابحث عن البلورات الفيروزية العائمة بين النتوءات الصخرية ومشارف المعبد، فهي شظايا أرواح حفظها صدى العالم.`,n+=`

I sense your thirst for truth... Look for the floating turquoise shards near the rocky ridges and temple borders. They are fragments of remembered souls.`):t===`discover_temple`||t===`read_inscription`?(e+=`

المعبد القديم يرتفع غرباً بين الجبال الشاهقة... هناك يقف الحارس الصخري، وفي محرابه نُقشت كلمات البناة الأوائل.`,n+=`

The Ancient Temple towers to the west beneath the jagged peaks... There stands the Stone Sentinel, and within lies the sacred inscription.`):t===`open_stone_gate`&&(e+=`

لقد قرأت النقش! البوابة الحجرية العظيمة تنتظر تردداتك الروحية لتفتح لك آفاقاً جديدة.`,n+=`

You have read the glyphs! The Great Stone Gate now yearns for your resonance to unseal the pathway to the beyond.`),{id:`wanderer_root`,speakerNameAr:this.wanderer.nameAr,speakerNameEn:this.wanderer.nameEn,titleAr:this.wanderer.titleAr,titleEn:this.wanderer.titleEn,portraitUrl:this.wanderer.portraitUrl,messageAr:r+e,messageEn:i+n,options:[{textAr:`من أنت؟ وما هذا العالم الذي يحتفظ بالذكريات؟`,textEn:`Who are you? What is this world that remembers?`,nextDialogueId:`wanderer_lore`},{textAr:`أين يمكنني العثور على شظايا الذاكرة والمعبد؟`,textEn:`Where can I find memory shards and the temple?`,nextDialogueId:`wanderer_quest_hint`,action:`QUEST_HINT`},{textAr:`سأواصل رحلتي الآن، شكراً لك.`,textEn:`I shall continue my journey. Thank you.`,action:`CLOSE`}]}}return e===`wanderer_lore`?{id:`wanderer_lore`,speakerNameAr:this.wanderer.nameAr,speakerNameEn:this.wanderer.nameEn,titleAr:this.wanderer.titleAr,titleEn:this.wanderer.titleEn,portraitUrl:this.wanderer.portraitUrl,messageAr:`هذه الجزيرة هي "إيكو"... مرآة كونية تلتقط مشاعر وأفعال كل كائن تطأ قدماه رمالها. صخورها ليست جماداً، بل ألواح ذاكرة عتيقة. عصاي هذه تحمل بلورة مستخلصة من قلب الشجرة العظمى؛ إنها ترشد التائهين حين يعم الظلام.`,messageEn:`This island is ECHO... a cosmic mirror capturing the emotions and steps of everyone who sets foot here. Its stones are not dead matter, but ancient memory slabs. My staff holds a crystal attuned to the Elder Tree; it guides wanderers when night falls.`,options:[{textAr:`كيف يمكنني استعادة ذكرياتي المفقودة؟`,textEn:`How can I reclaim my own lost memories?`,nextDialogueId:`wanderer_memories`},{textAr:`سأستكشف المعبد كما أشرت عليّ.`,textEn:`I will explore the temple as you advised.`,action:`CLOSE`}]}:e===`wanderer_quest_hint`?{id:`wanderer_quest_hint`,speakerNameAr:this.wanderer.nameAr,speakerNameEn:this.wanderer.nameEn,titleAr:this.wanderer.titleAr,titleEn:this.wanderer.titleEn,portraitUrl:this.wanderer.portraitUrl,messageAr:`اتبع البوصلة والمصغرة في أعلى الشاشة. الشظية الأولى تطفو عند صخور الشاطئ الجنوبي، والثانية قرب مشارف الغابة الصنوبرية، والثالثة بالقرب من درجات المعبد. وإذا اقتربت منها اضغط [E] للتفاعل وسماع الصدى.`,messageEn:`Follow the compass and minimap at the top of your view. The first shard hovers near the shoreline rocks, the second by the pine borders, and the third near the temple steps. Approach them and press [E] to resonate.`,options:[{textAr:`سأبحث عنها فوراً.`,textEn:`I will search for them immediately.`,action:`CLOSE`}]}:{id:`wanderer_memories`,speakerNameAr:this.wanderer.nameAr,speakerNameEn:this.wanderer.nameEn,titleAr:this.wanderer.titleAr,titleEn:this.wanderer.titleEn,portraitUrl:this.wanderer.portraitUrl,messageAr:`أنت لا تستعيد الذكريات بالبحث عنها في الماضي... بل بصنع صدى جديد في الحاضر. كل خطوة تخطوها تسجل في سجل الجزيرة الأبدي.`,messageEn:`You do not regain memories by digging in the past... but by forging a new resonance in the present. Every step you take is etched into the island’s eternal chronicle.`,options:[{textAr:`كلماتك حكيمة، سأمضي في طريقي.`,textEn:`Wise words. I shall proceed.`,action:`CLOSE`}]}}generateGuardianDialogue(e,t,n){let r=t===`open_stone_gate`||this.questSystem.quests[0]?.objectives[3]?.isCompleted,i=(this.questSystem.quests[0]?.objectives[1]?.currentCount??0)>=3;if(e===`root`){let e=`قف أيها الفاني. أنا "أوروك"، الحارس الصخري المنصوب منذ بزوغ الفجر الأول.`,t=`Halt, mortal. I am Orok, the Stone Sentinel carved at the first dawn.`;return i?r?(e+=`

لقد قُرئت الكلمات المقدسة. البوابة الحجرية العظيمة استجابت لك، وطريق الأفق بات مفتوحاً!`,t+=`

The sacred words have been spoken. The Great Stone Portal has awakened to your call; the horizon pathway lies open!`):(e+=`

أشعر برنين الشظايا في صدرك... ادخل إلى المحراب واقرأ اللوح الحجري القديم، فالنقوش تنتظر عيوناً قادرة على الإبصار.`,t+=`

I sense the resonance of the shards within you... Enter the sanctuary and read the Ancient Stone Tablet; the runes await sighted eyes.`):(e+=`

روحك ما زالت خافتة... لا يمكنك دخول قدس الأقداس قبل أن تجمع شظايا الذاكرة الثلاث ليتوافق ترددك مع محراب المعبد.`,t+=`

Your spirit is still dim... You may not enter the inner sanctuary until you gather three Memory Shards to harmonize your aura.`),{id:`guardian_root`,speakerNameAr:this.guardian.nameAr,speakerNameEn:this.guardian.nameEn,titleAr:this.guardian.titleAr,titleEn:this.guardian.titleEn,portraitUrl:this.guardian.portraitUrl,messageAr:e,messageEn:t,options:[{textAr:`ما هو سر النقش الموجود داخل المعبد؟`,textEn:`What is the secret of the temple inscription?`,nextDialogueId:`guardian_secret`},{textAr:`أخبرني عن البوابة الحجرية العظيمة.`,textEn:`Tell me about the Great Stone Portal.`,nextDialogueId:`guardian_portal`},{textAr:`سأتابع طريقي.`,textEn:`I shall continue on.`,action:`CLOSE`}]}}return e===`guardian_secret`?{id:`guardian_secret`,speakerNameAr:this.guardian.nameAr,speakerNameEn:this.guardian.nameEn,titleAr:this.guardian.titleAr,titleEn:this.guardian.titleEn,portraitUrl:this.guardian.portraitUrl,messageAr:`النقش كُتب بلغة الأثير الأولى: "ما ينساه البشر، تحفظه الأرض. وما يمحوه الزمن، يخلده الصدى". إنه مفتاح فك الأختام الأربعة التي تكبل بوابات العبور.`,messageEn:`The inscription is carved in the primordial tongue: "What mortals forget, the earth preserves. What time erases, the echo immortalizes." It is the key to dissolving the seals of passage.`,options:[{textAr:`فهمت، شكراً لك أيها الحارس.`,textEn:`I understand, thank you Sentinel.`,action:`CLOSE`}]}:{id:`guardian_portal`,speakerNameAr:this.guardian.nameAr,speakerNameEn:this.guardian.nameEn,titleAr:this.guardian.titleAr,titleEn:this.guardian.titleEn,portraitUrl:this.guardian.portraitUrl,messageAr:`البوابة الحجرية هي معبر العوالم. عندما يكتمل صدى روحك، ستتوهج دوائر الطاقة السماوية وتفتح الباب نحو المجهول.`,messageEn:`The Great Stone Gate is the conduit between realms. When your resonance is fulfilled, the celestial energy circles ignite and breach the boundary to the unknown.`,options:[{textAr:`سأعمل على فتحها الآن.`,textEn:`I will open it now.`,action:`CLOSE`}]}}generateCreatureDialogue(e,t){return{id:`creature_commune`,speakerNameAr:`ظبي الضياء الأثيري`,speakerNameEn:`Luminous Spirit Stag`,titleAr:`مخلوق طاهر من نور الغابة`,titleEn:`Pure Being of Forest Light`,portraitUrl:`/assets/aistudio/900555379_1478156927556307_6539741191511944864_n_9ff5ae9c.jpg`,messageAr:`يميل المخلوق الأثيري برأسه بسلام نحو يديك... تتألق قرونه بنور فيروزي دافئ ويبعث رنيناً ناعماً يعيد السكينة إلى روحك. تشعر بأن هذا الكائن يدرك نقاء خطواتك عندما لا تركض بعجلة.`,messageEn:`The ethereal creature tilts its luminous head gently toward your touch... Its antlers shimmer with soothing turquoise warmth, releasing a soft celestial hum that restores your peace. It recognizes your gentle presence.`,options:[{textAr:`المس قرونه بنعومة واستشعر صدى الغابة.`,textEn:`Gently stroke its antlers and feel the forest resonance.`,action:`PET_CREATURE`},{textAr:`اتركه يرعى بسلام.`,textEn:`Let it graze in peace.`,action:`CLOSE`}]}}},hd,gd=class e{constructor(e){this.isGrounded=!0,this.isMoving=!1,this.isSprinting=!1,this.isRunningInPlace=!1,this.isFirstPerson=!1,this.isSwimming=!1,this.radius=.55,this.isAttacking=!1,this.attackTimer=0,this.attackComboStep=0,this.isDodging=!1,this.dodgeTimer=0,this.isCastingPulse=!1,this.pulseTimer=0,this.isDead=!1,this.walkSpeed=6.8,this.sprintSpeed=12.8,this.swimSpeed=4.8,this.sprintSwimSpeed=8.5,this.jumpForce=10.8,this.gravity=26,this.verticalVelocity=0,this.currentFacingAngle=0,this.targetFacingAngle=0,this.animTime=0,this.coyoteTimer=0,this.maxCoyoteTime=.12,this.group=new K,this.position=e.clone(),this.velocity=new W,this.group.position.copy(this.position),this.characterPivot=new K,this.group.add(this.characterPivot);let t=new io(.65,1.45,24,1,0,Math.PI*.85),n=new qr({color:62932,side:2,transparent:!0,opacity:0,blending:2});this.slashArcMesh=new J(t,n),this.slashArcMesh.rotation.x=Math.PI/2,this.slashArcMesh.position.set(0,.95,.45),this.characterPivot.add(this.slashArcMesh);let r=new Z({color:14596231,roughness:.75,metalness:.05}),i=new Z({color:1578004,roughness:.6,metalness:.1}),a=new Z({color:2792847,roughness:.5}),o=new Z({color:1788261,roughness:.7,metalness:.15,side:2}),s=new Z({color:15589588,roughness:.8,metalness:.05});new Z({color:8344889,roughness:.85});let c=new Z({color:4007446,roughness:.85,metalness:.1}),l=new Z({color:2301984,roughness:.85}),u=new Z({color:4862496,roughness:.85}),d=new Z({color:13153958,roughness:.95});new Z({color:4205341,roughness:.85}),new Z({color:62932,emissive:62932,emissiveIntensity:1.6,roughness:.15,metalness:.8}),this.torsoGroup=new K,this.torsoGroup.position.y=.95,this.characterPivot.add(this.torsoGroup);let f=new J(new X(.24,.28,.72,10),s);f.position.y=.36,f.castShadow=!0,this.torsoGroup.add(f);let p=new J(new X(.28,.33,.28,10),s);p.position.y=.06,p.castShadow=!0,this.torsoGroup.add(p);let m=new J(new X(.27,.275,.08,10),c);m.position.y=.22,this.torsoGroup.add(m);let h=new J(new Y(.08,.06,.04),new Z({color:13935475,metalness:.8,roughness:.3}));h.position.set(0,.22,.27),this.torsoGroup.add(h);let g=new J(new oo(.32,.025,6,24),c);g.position.set(.02,.42,.04),g.rotation.set(.35,.45,.75),this.torsoGroup.add(g);let _=new J(new Y(.18,.2,.12),c);_.position.set(-.25,.14,-.15),_.rotation.set(.1,.3,-.15),_.castShadow=!0,this.torsoGroup.add(_),this.capeletGroup=new K,this.capeletGroup.position.set(0,.65,0),this.torsoGroup.add(this.capeletGroup);let v=new J(new X(.28,.36,.24,10),o);v.position.y=.02,v.castShadow=!0,this.capeletGroup.add(v);let y=new ro(.38,.58,4,6);this.capeletTails=new J(y,o),this.capeletTails.position.set(0,-.22,-.24),this.capeletTails.castShadow=!0,this.capeletGroup.add(this.capeletTails),this.headGroup=new K,this.headGroup.position.set(0,.78,0),this.torsoGroup.add(this.headGroup);let b=new J(new X(.09,.1,.14,8),r);b.position.y=.04,this.headGroup.add(b);let x=new ao(.18,16,14);x.scale(1,1.15,1.05);let S=new J(x,r);S.position.y=.22,S.castShadow=!0,this.headGroup.add(S);let C=new ao(.19,14,12);C.scale(1.02,1.12,1.08);let w=new J(C,i);w.position.set(0,.24,-.02),w.castShadow=!0,this.headGroup.add(w);let T=new Li(.11,1);this.hairBun=new J(T,i),this.hairBun.position.set(0,.44,-.06),this.hairBun.castShadow=!0,this.headGroup.add(this.hairBun);let E=new J(new oo(.08,.025,8,16),a);E.position.set(0,.38,-.06),E.rotation.x=Math.PI/2,this.headGroup.add(E),this.leftLeg=this.createLeg(l,u,d),this.leftLeg.position.set(-.13,.1,0),this.torsoGroup.add(this.leftLeg),this.rightLeg=this.createLeg(l,u,d),this.rightLeg.position.set(.13,.1,0),this.torsoGroup.add(this.rightLeg),this.leftArm=this.createArm(r,s),this.leftArm.position.set(-.32,.62,0),this.torsoGroup.add(this.leftArm),this.rightArm=this.createArm(r,s),this.rightArm.position.set(.32,.62,0),this.torsoGroup.add(this.rightArm),this.staffGroup=new K,this.staffGroup.name=`RightHandSwordSocket`,this.staffGroup.position.set(0,-.58,.02),this.staffGroup.rotation.set(-Math.PI*.44,.12,.18);let D=new Z({color:14871796,metalness:.96,roughness:.16}),O=new Z({color:13938487,metalness:.9,roughness:.25}),k=new Z({color:1971472,roughness:.85,metalness:.05}),A=new Z({color:1713714,metalness:.95,roughness:.3}),j=new Z({color:62932,emissive:62932,emissiveIntensity:2.2,roughness:.1,metalness:.9}),M=new J(new Li(.038,0),O);M.position.y=-.11,M.castShadow=!0,this.staffGroup.add(M);let N=new J(new oo(.032,.006,6,12),O);N.position.y=-.14,N.rotation.x=Math.PI/2,this.staffGroup.add(N);let ee=new J(new X(.021,.023,.18,12),k);ee.position.y=0,ee.castShadow=!0,this.staffGroup.add(ee);let P=new oo(.023,.0035,6,14);for(let e=0;e<4;e++){let t=new J(P,O);t.position.y=-.06+e*.04,t.rotation.x=Math.PI/2,this.staffGroup.add(t)}let te=new J(new Y(.26,.036,.062),O);te.position.y=.095,te.castShadow=!0,this.staffGroup.add(te);let ne=new Fi(.022,.065,6),re=new J(ne,O);re.position.set(-.13,.105,0),re.rotation.z=Math.PI/2+.35;let ie=new J(ne,O);ie.position.set(.13,.105,0),ie.rotation.z=-Math.PI/2-.35,this.staffGroup.add(re,ie);let ae=new no(.025,0);this.staffCrystal=new J(ae,j),this.staffCrystal.position.set(0,.095,.034),this.staffGroup.add(this.staffCrystal);let oe=new J(new Y(.064,.82,.016),D);oe.position.y=.51,oe.castShadow=!0,this.staffGroup.add(oe);let se=new J(new Y(.016,.62,.02),A);se.position.y=.44,this.staffGroup.add(se);let ce=new Fi(.045,.15,4);ce.rotateY(Math.PI/4);let F=new J(ce,D);F.position.y=.99,F.castShadow=!0,this.staffGroup.add(F),this.staffLight=new ts(62932,1.4,4.5),this.staffLight.position.set(0,.55,.04),this.staffGroup.add(this.staffLight),this.rightArm.add(this.staffGroup),this.spiritCompanion=new K;let le=new J(new ao(.13,12,10),new Z({color:1776670,roughness:.9}));this.spiritCompanion.add(le);let ue=new ao(.035,8,8),de=new qr({color:16777215}),fe=new J(ue,de);fe.position.set(-.045,.03,.11);let pe=new J(ue,de);pe.position.set(.045,.03,.11),this.spiritCompanion.add(fe,pe);let me=new J(new Fi(.05,.1,4),new Z({color:5420936}));me.position.y=.14,me.rotation.z=.3,this.spiritCompanion.add(me),this.spiritCompanion.position.set(-.45,1.1,-.35),this.characterPivot.add(this.spiritCompanion);let he=new Pi(.65,18);he.rotateX(-Math.PI/2);let ge=new qr({color:0,transparent:!0,opacity:.36,depthWrite:!1});this.shadowDisc=new J(he,ge),this.shadowDisc.position.y=.02,this.group.add(this.shadowDisc);let _e=new io(.35,1.25,24);_e.rotateX(-Math.PI/2);let ve=new qr({color:8974079,transparent:!0,opacity:.55,blending:2,side:2,depthWrite:!1});this.swimWakeMesh=new J(_e,ve),this.swimWakeMesh.position.y=.04,this.swimWakeMesh.visible=!1,this.group.add(this.swimWakeMesh)}createLeg(e,t,n){let r=new K,i=new J(new X(.11,.095,.42,8),e);i.position.y=-.21,i.castShadow=!0,r.add(i);let a=new J(new X(.095,.08,.38,8),e);a.position.y=-.56,a.castShadow=!0,r.add(a);let o=new J(new X(.125,.11,.09,8),n);o.position.y=-.68,o.castShadow=!0,r.add(o);let s=new J(new Y(.14,.18,.28),t);return s.position.set(0,-.82,.05),s.castShadow=!0,r.add(s),r}createArm(e,t){let n=new K,r=new J(new X(.1,.09,.24,8),t);r.position.y=-.12,r.castShadow=!0,n.add(r);let i=new J(new X(.075,.065,.38,8),e);i.position.y=-.38,i.castShadow=!0,n.add(i);let a=new J(new ao(.065,8,8),e);return a.position.y=-.58,a.castShadow=!0,n.add(a),n}jump(){return this.isSwimming?(this.verticalVelocity=8.5,this.isGrounded=!1,this.isSwimming=!1,!0):this.isGrounded||this.coyoteTimer>0?(this.verticalVelocity=this.jumpForce,this.isGrounded=!1,this.coyoteTimer=0,!0):!1}update(t,n,r,i,a,o){let s=Math.max(0,Math.min(Number.isFinite(t)?t:0,.05)),c=e._scratchMoveInput.set(Number.isFinite(n.x)?n.x:0,Number.isFinite(n.y)?n.y:0);i&&c.lengthSq()<=.001&&c.set(0,1);let l=c.lengthSq()>.001;this.isSprinting=i,this.isRunningInPlace=!1;let u=Math.hypot(this.position.x-$.LAKE_CENTER.x,this.position.z-$.LAKE_CENTER.y)<$.LAKE_RADIUS+4?$.LAKE_WATER_Y:$.WATER_LEVEL,d=a.getHeightAt(this.position.x,this.position.z),f=Number.isFinite(d)?d:5,p=u-f;if(p>.55&&(this.position.y<=u+.25||this.isSwimming)?(this.isSwimming=!0,this.isGrounded=!1):p<=.45&&f>=u-.25&&(this.isSwimming=!1),this.isDead){this.velocity.x*=.85,this.velocity.z*=.85;let e=a.getHeightAt(this.position.x,this.position.z);this.position.y=H.lerp(this.position.y,Number.isFinite(e)?e:this.position.y,s*10),this.group.position.copy(this.position),this.animateCharacter(s,!1,!1,!0);return}this.isDodging&&(this.dodgeTimer-=s,this.dodgeTimer<=0&&(this.isDodging=!1,this.characterPivot.rotation.x=0)),this.isAttacking&&(this.attackTimer-=s,this.attackTimer<=0&&(this.isAttacking=!1,this.slashArcMesh.material.opacity=0)),this.isCastingPulse&&(this.pulseTimer-=s,this.pulseTimer<=0&&(this.isCastingPulse=!1)),this.isMoving=l&&!this.isDodging;let m=this.isSwimming?this.isSprinting?this.sprintSwimSpeed:this.swimSpeed:(this.isSprinting?this.sprintSpeed:this.walkSpeed)*(this.isGrounded?1:.88),h=Number.isFinite(r)?r:Math.PI;if(this.isDodging)this.velocity.x-=this.velocity.x*Math.min(1,3.5*s),this.velocity.z-=this.velocity.z*Math.min(1,3.5*s);else if(l){let e=-Math.sin(h),t=-Math.cos(h),n=Math.cos(h),r=-Math.sin(h),i=e*c.y+n*c.x,a=t*c.y+r*c.x,o=Math.hypot(i,a),l=o>1e-4?i/o:0,u=o>1e-4?a/o:0;this.targetFacingAngle=Math.atan2(l,u);let d=this.isSwimming?14:this.isGrounded?24:9;this.velocity.x+=(l*m-this.velocity.x)*Math.min(1,d*s),this.velocity.z+=(u*m-this.velocity.z)*Math.min(1,d*s);let f=this.targetFacingAngle-this.currentFacingAngle;for(;f>Math.PI;)f-=Math.PI*2;for(;f<-Math.PI;)f+=Math.PI*2;this.currentFacingAngle+=f*Math.min(1,(this.isFirstPerson?32:16)*s),this.characterPivot.rotation.y=this.currentFacingAngle,this.characterPivot.rotation.z=-f*(this.isSprinting?.25:.12)}else{if(this.isFirstPerson){this.targetFacingAngle=h+Math.PI;let e=this.targetFacingAngle-this.currentFacingAngle;for(;e>Math.PI;)e-=Math.PI*2;for(;e<-Math.PI;)e-=Math.PI*2;this.currentFacingAngle+=e*Math.min(1,30*s),this.characterPivot.rotation.y=this.currentFacingAngle}let e=this.isSwimming?10:this.isGrounded?18:4;this.velocity.x-=this.velocity.x*Math.min(1,e*s),this.velocity.z-=this.velocity.z*Math.min(1,e*s),this.characterPivot.rotation.z=H.lerp(this.characterPivot.rotation.z,0,s*10)}Number.isFinite(this.velocity.x)||(this.velocity.x=0),Number.isFinite(this.velocity.z)||(this.velocity.z=0);let g=this.position.x+this.velocity.x*s,_=this.position.z+this.velocity.z*s;for(let e=0;e<2;e++)for(let e=0;e<o.length;e++){let t=o[e];if(t.radius<=0)continue;let n=g-t.x,r=_-t.z,i=this.radius+t.radius,a=n*n+r*r;if(a<i*i&&a>1e-5){let e=Math.sqrt(a),t=i-e,o=n/e,s=r/e;g+=o*t,_+=s*t;let c=this.velocity.x*o+this.velocity.z*s;c<0&&(this.velocity.x-=c*o,this.velocity.z-=c*s)}}let v=Math.sqrt(g*g+_*_),y=1180;if(v>y){let e=Math.atan2(_,g);g=Math.cos(e)*y,_=Math.sin(e)*y,this.velocity.set(0,0,0)}Number.isFinite(g)&&Number.isFinite(_)&&(this.position.x=g,this.position.z=_);let b=a.getHeightAt(this.position.x,this.position.z),x=Number.isFinite(b)?b:f;if(this.isSwimming){this.coyoteTimer=0,this.verticalVelocity=0;let e=Math.sin(this.animTime*3)*.04,t=u-.28+e;this.position.y=H.lerp(this.position.y,t,Math.min(1,12*s)),this.swimWakeMesh.visible=!0,this.swimWakeMesh.position.y=u-this.position.y+.02;let n=1+Math.sin(this.animTime*3.5)*.16+(this.isMoving?.32:0);this.swimWakeMesh.scale.set(n,n,n),this.shadowDisc.visible=!1}else this.isGrounded?(this.swimWakeMesh.visible=!1,this.shadowDisc.visible=!0,x-this.position.y<-.8?(this.isGrounded=!1,this.coyoteTimer=this.maxCoyoteTime):(this.position.y=H.lerp(this.position.y,x,Math.min(1,28*s)),this.coyoteTimer=this.maxCoyoteTime)):(this.swimWakeMesh.visible=!1,this.shadowDisc.visible=!0,this.coyoteTimer=Math.max(0,this.coyoteTimer-s),this.verticalVelocity-=this.gravity*s,this.position.y+=this.verticalVelocity*s,this.position.y<=x&&(this.position.y=x,this.verticalVelocity=0,this.isGrounded=!0,this.coyoteTimer=0));(!Number.isFinite(this.position.y)||this.position.y<-15)&&(this.position.y=x,this.verticalVelocity=0,this.isGrounded=!0),this.group.position.copy(this.position),this.animateCharacter(s,l,this.isSprinting,this.isGrounded)}animateCharacter(e,t,n,r){if(this.isDead)this.characterPivot.rotation.x=H.lerp(this.characterPivot.rotation.x,-Math.PI/2.2,e*10),this.torsoGroup.position.y=H.lerp(this.torsoGroup.position.y,.2,e*10),this.leftArm.rotation.set(.4,0,.3),this.rightArm.rotation.set(-.2,0,-.4),this.leftLeg.rotation.set(-.3,0,.2),this.rightLeg.rotation.set(.2,0,-.2),this.spiritCompanion&&(this.spiritCompanion.position.y=.55+Math.sin(this.animTime*4)*.05);else if(this.isDodging){let e=1-Math.max(0,this.dodgeTimer/.38);this.characterPivot.rotation.x=-e*Math.PI*2,this.torsoGroup.position.y=.55+Math.sin(e*Math.PI)*.25,this.capeletTails.rotation.x=.85,this.leftArm.rotation.x=-1.2,this.rightArm.rotation.x=1,this.leftLeg.rotation.x=.6,this.rightLeg.rotation.x=.6}else if(this.isAttacking){let e=1-Math.max(0,this.attackTimer/.32),t=Math.sin(e*Math.PI);this.attackComboStep===1?(this.rightArm.rotation.x=-2.3+e*3.5,this.rightArm.rotation.y=.1,this.rightArm.rotation.z=-.1):this.attackComboStep===2?(this.rightArm.rotation.x=-.6-t*1.3,this.rightArm.rotation.y=.35,this.rightArm.rotation.z=1.1-t*2.1):(this.rightArm.rotation.x=-1.1+t*2,this.rightArm.rotation.y=-.6+t*1.3,this.rightArm.rotation.z=-.3+t*.7),this.leftArm.rotation.x=.5;let n=this.slashArcMesh.material;n.opacity=t*.95,this.slashArcMesh.rotation.z=e*Math.PI,this.staffLight.intensity=3.8}else if(this.isCastingPulse)this.leftArm.rotation.x=H.lerp(this.leftArm.rotation.x,-2.5,e*18),this.rightArm.rotation.x=H.lerp(this.rightArm.rotation.x,-2.5,e*18),this.rightArm.rotation.y=H.lerp(this.rightArm.rotation.y,0,e*18),this.rightArm.rotation.z=H.lerp(this.rightArm.rotation.z,-.1,e*18),this.staffLight.intensity=5.5,this.torsoGroup.position.y=1.05;else if(this.isSwimming){let r=n?9.5:6.2;if(this.animTime+=e*r,t||this.isRunningInPlace){this.characterPivot.rotation.x=H.lerp(this.characterPivot.rotation.x,1.12,e*8),this.headGroup.rotation.x=-.72+Math.sin(this.animTime*1.8)*.08;let t=Math.sin(this.animTime),n=Math.sin(this.animTime+Math.PI);this.leftArm.rotation.x=t*1.35-.25,this.leftArm.rotation.y=Math.cos(this.animTime)*.4,this.leftArm.rotation.z=.35+Math.cos(this.animTime)*.45,this.rightArm.rotation.x=n*1.35-.25,this.rightArm.rotation.y=-Math.cos(this.animTime+Math.PI)*.4,this.rightArm.rotation.z=-.35-Math.cos(this.animTime+Math.PI)*.45;let r=Math.sin(this.animTime*2.2);this.leftLeg.rotation.x=r*.48,this.rightLeg.rotation.x=-r*.48,this.capeletTails.rotation.x=1.35+Math.sin(this.animTime*1.6)*.12,this.torsoGroup.position.y=.95+Math.sin(this.animTime*2)*.05}else{this.characterPivot.rotation.x=H.lerp(this.characterPivot.rotation.x,.42,e*6),this.headGroup.rotation.x=-.35+Math.sin(this.animTime*1.2)*.05;let t=Math.sin(this.animTime*2.2)*.3;this.leftArm.rotation.x=.2,this.leftArm.rotation.y=0,this.leftArm.rotation.z=.6+t,this.rightArm.rotation.x=.2,this.rightArm.rotation.y=0,this.rightArm.rotation.z=-.6-t;let n=Math.sin(this.animTime*2)*.26;this.leftLeg.rotation.x=n,this.rightLeg.rotation.x=-n,this.capeletTails.rotation.x=.55+Math.sin(this.animTime*1.2)*.08,this.torsoGroup.position.y=.95+Math.sin(this.animTime*2)*.04}this.spiritCompanion&&(this.spiritCompanion.position.y=1.45+Math.sin(this.animTime*2.5)*.12)}else{if(this.characterPivot.rotation.x=H.lerp(this.characterPivot.rotation.x,0,e*12),this.slashArcMesh.material.opacity=0,(t||this.isRunningInPlace)&&r){let t=n?15:9.5;this.animTime+=e*t;let r=Math.sin(this.animTime)*(n?.78:.52),i=Math.sin(this.animTime)*(n?.65:.42);this.leftLeg.rotation.x=r,this.rightLeg.rotation.x=-r,this.leftArm.rotation.x=-i,this.leftArm.rotation.y=0,this.leftArm.rotation.z=0,this.rightArm.rotation.x=-.18+i*.32,this.rightArm.rotation.y=H.lerp(this.rightArm.rotation.y,-.06,e*10),this.rightArm.rotation.z=H.lerp(this.rightArm.rotation.z,-.08,e*10);let a=Math.sin(this.animTime*.9)*.15+(n?.45:.22);this.capeletTails.rotation.x=a,this.torsoGroup.position.y=.95+Math.abs(Math.sin(this.animTime*2))*(n?.14:.08),this.headGroup.rotation.x=Math.sin(this.animTime*2)*.04}else r?(this.animTime+=e*2.2,this.leftLeg.rotation.x=H.lerp(this.leftLeg.rotation.x,0,e*8),this.rightLeg.rotation.x=H.lerp(this.rightLeg.rotation.x,0,e*8),this.leftArm.rotation.x=H.lerp(this.leftArm.rotation.x,0,e*8),this.leftArm.rotation.y=H.lerp(this.leftArm.rotation.y,0,e*8),this.leftArm.rotation.z=H.lerp(this.leftArm.rotation.z,0,e*8),this.rightArm.rotation.x=H.lerp(this.rightArm.rotation.x,-.22,e*8),this.rightArm.rotation.y=H.lerp(this.rightArm.rotation.y,-.08,e*8),this.rightArm.rotation.z=H.lerp(this.rightArm.rotation.z,-.08,e*8),this.torsoGroup.position.y=.95+Math.sin(this.animTime)*.03,this.capeletTails.rotation.x=H.lerp(this.capeletTails.rotation.x,.05,e*6),this.headGroup.rotation.x=Math.sin(this.animTime*1.2)*.03):(this.leftLeg.rotation.x=H.lerp(this.leftLeg.rotation.x,.45,e*12),this.rightLeg.rotation.x=H.lerp(this.rightLeg.rotation.x,-.32,e*12),this.leftArm.rotation.x=H.lerp(this.leftArm.rotation.x,-.7,e*12),this.rightArm.rotation.x=H.lerp(this.rightArm.rotation.x,-.32,e*12),this.rightArm.rotation.y=H.lerp(this.rightArm.rotation.y,-.08,e*12),this.rightArm.rotation.z=H.lerp(this.rightArm.rotation.z,-.12,e*12),this.capeletTails.rotation.x=H.lerp(this.capeletTails.rotation.x,.55,e*10),this.torsoGroup.position.y=H.lerp(this.torsoGroup.position.y,.95,e*10));if(this.staffCrystal){this.staffCrystal.rotation.y+=e*2;let t=1+Math.sin(this.animTime*2.8)*.15;this.staffCrystal.scale.setScalar(t),this.staffLight.intensity=1+Math.sin(this.animTime*3)*.4}this.spiritCompanion&&(this.spiritCompanion.position.y=1.1+Math.sin(this.animTime*2.5)*.08,this.spiritCompanion.rotation.y=Math.sin(this.animTime*1.5)*.25)}}performAttack(t=0){return this.isDead||this.isDodging?!1:(this.isAttacking=!0,this.attackTimer=.32,this.attackComboStep=t%3,e._scratchVec.set(Math.sin(this.currentFacingAngle),0,Math.cos(this.currentFacingAngle)),this.velocity.x+=e._scratchVec.x*4.5,this.velocity.z+=e._scratchVec.z*4.5,!0)}performDodge(t){return this.isDead||this.isDodging?!1:(this.isDodging=!0,this.dodgeTimer=.38,this.isAttacking=!1,this.attackTimer=0,this.slashArcMesh.material.opacity=0,t&&t.lengthSq()>.01?e._scratchVec.copy(t).normalize():e._scratchVec.set(Math.sin(this.currentFacingAngle),0,Math.cos(this.currentFacingAngle)),this.velocity.copy(e._scratchVec.multiplyScalar(17.5)),!0)}performEchoPulse(){return this.isDead||this.isDodging?!1:(this.isCastingPulse=!0,this.pulseTimer=.55,this.isAttacking=!1,!0)}die(){this.isDead=!0,this.isAttacking=!1,this.isDodging=!1,this.isCastingPulse=!1,this.velocity.set(0,0,0)}respawn(e){this.isDead=!1,this.isAttacking=!1,this.isDodging=!1,this.isCastingPulse=!1,this.position.copy(e),this.velocity.set(0,0,0),this.characterPivot.rotation.set(0,this.currentFacingAngle,0),this.characterPivot.position.set(0,0,0)}getFacingDirection(){return e._scratchVec.set(Math.sin(this.currentFacingAngle),0,Math.cos(this.currentFacingAngle)).normalize()}getStaffWorldPosition(){return this.staffCrystal.getWorldPosition(e._scratchStaffPos),e._scratchStaffPos}getSwordWorldPosition(){return this.getStaffWorldPosition()}setFirstPersonMode(e){this.isFirstPerson=e,this.characterPivot.visible=!e}};hd=gd,hd._scratchMoveInput=new U,hd._scratchVec=new W,hd._scratchStaffPos=new W;var _d,vd=class e{constructor(e=55,t=16/9){this.yaw=Math.PI,this.pitch=.28,this.distance=6.8,this.sensitivity=1,this.isFirstPerson=!1,this.isCinematic=!0,this.cinematicTime=0,this.manualRotateTimer=999,this.minPitch=-.22,this.maxPitch=1.32,this.minPitchFPP=-1.25,this.maxPitchFPP=1.25,this.minDistance=2.8,this.maxDistance=14,this.isPortraitMode=!1,this.portraitDistanceMultiplier=1,this.targetFov=55,this.camera=new $o(e,t,.1,2400),this.target=new W(0,5,80),this.smoothTarget=this.target.clone(),this.currentPosition=new W(0,10,95),this.camera.position.copy(this.currentPosition),this.updateAspect(t)}updateAspect(e){this.camera.aspect=e,this.isPortraitMode=!1,this.targetFov=55,this.portraitDistanceMultiplier=1,this.camera.fov=this.targetFov,this.camera.updateProjectionMatrix()}update(t,n,r,i,a=!1){let o=Math.min(t,.05);if(this.manualRotateTimer+=o,this.isCinematic){this.cinematicTime+=o*.25;let t=$.PORTAL_POS,n=r.getHeightAt(t.x,t.z),i=Math.sin(this.cinematicTime*.7)*.8,a=Math.sin(this.cinematicTime*1.1)*.35,s=Math.cos(this.cinematicTime*.6)*.8;this.camera.position.set(t.x-17.5+i,n+4.2+a,t.z-7.5+s),e._scratchLookTarget.set(t.x-3,n+6.5,t.z+1),this.camera.lookAt(e._scratchLookTarget);return}if(this.isFirstPerson){e._scratchEyePos.copy(n).add({x:0,y:1.62,z:0});let t=Math.cos(this.pitch),r=Math.sin(this.pitch),i=Math.sin(this.yaw),a=Math.cos(this.yaw),s=-i*t,c=r,l=-a*t;e._scratchDesiredCam.set(e._scratchEyePos.x-i*.12,e._scratchEyePos.y,e._scratchEyePos.z-a*.12),this.currentPosition.lerp(e._scratchDesiredCam,Math.min(1,28*o)),this.camera.position.copy(this.currentPosition),e._scratchLookTarget.set(this.camera.position.x+s,this.camera.position.y+c,this.camera.position.z+l),this.camera.lookAt(e._scratchLookTarget);return}let s=this.isPortraitMode?1.4:1.55;e._scratchTarget.set(n.x,n.y+s,n.z),this.smoothTarget.lerp(e._scratchTarget,Math.min(1,14*o));let c=Math.cos(this.pitch),l=Math.sin(this.pitch),u=Math.sin(this.yaw),d=Math.cos(this.yaw),f=this.distance*(this.isPortraitMode?this.portraitDistanceMultiplier:1),p=f;e._scratchDir.set(c*u,l,c*d).normalize();for(let t=1;t<=6;t++){let n=f/6*t;e._scratchTestPoint.copy(this.smoothTarget).addScaledVector(e._scratchDir,n);let i=r.getHeightAt(e._scratchTestPoint.x,e._scratchTestPoint.z);if(e._scratchTestPoint.y<i+.6){p=Math.max(this.minDistance,f/6*(t-.5));break}}let m=p*c*u,h=p*l,g=p*c*d;e._scratchDesiredCam.set(this.smoothTarget.x+m,this.smoothTarget.y+h,this.smoothTarget.z+g);let _=r.getHeightAt(e._scratchDesiredCam.x,e._scratchDesiredCam.z);e._scratchDesiredCam.y<_+.85&&(e._scratchDesiredCam.y=_+.85),this.currentPosition.lerp(e._scratchDesiredCam,Math.min(1,16*o)),this.camera.position.copy(this.currentPosition),this.camera.lookAt(this.smoothTarget)}rotate(e,t){if(this.isCinematic)return;this.manualRotateTimer=0,this.yaw-=e*.0035*this.sensitivity,this.pitch+=t*.0035*this.sensitivity;let n=this.isFirstPerson?this.minPitchFPP:this.minPitch,r=this.isFirstPerson?this.maxPitchFPP:this.maxPitch;this.pitch=Math.max(n,Math.min(r,this.pitch))}zoom(e){this.isCinematic||(this.isFirstPerson?e>0&&(this.setPerspectiveMode(!1),this.distance=this.minDistance):(this.distance+=e*.005,this.distance<this.minDistance-.5?this.setPerspectiveMode(!0):this.distance=Math.max(this.minDistance,Math.min(this.maxDistance,this.distance))))}togglePerspective(){return this.setPerspectiveMode(!this.isFirstPerson)}setPerspectiveMode(e){return this.isFirstPerson=e,this.manualRotateTimer=0,this.isFirstPerson?this.pitch=Math.max(-.25,Math.min(.25,this.pitch)):(this.pitch=.28,this.distance=Math.max(this.minDistance,6.2)),this.isFirstPerson}getYaw(){return this.yaw}};_d=vd,_d._scratchTarget=new W,_d._scratchDir=new W,_d._scratchTestPoint=new W,_d._scratchDesiredCam=new W,_d._scratchEyePos=new W,_d._scratchLookTarget=new W;var yd=class{constructor(e){this.container=e,this.moveInput=new U,this.isSprinting=!1,this.jumpJustPressed=!1,this.interactJustPressed=!1,this.pauseJustPressed=!1,this.questJustPressed=!1,this.viewToggleJustPressed=!1,this.attackJustPressed=!1,this.dodgeJustPressed=!1,this.pulseJustPressed=!1,this.sprintToggleJustPressed=!1,this.touchMoveInput=new U,this.touchSprinting=!1,this.touchButtonSprinting=!1,this.touchJoystickSprinting=!1,this.cameraDeltaX=0,this.cameraDeltaY=0,this.zoomDelta=0,this.keysHeld=new Set,this.isPointerDown=!1,this.pointerStartX=0,this.pointerStartY=0,this.lastPointerX=0,this.lastPointerY=0,this.cameraTouchId=null,this.lastTouchX=0,this.lastTouchY=0,this.activeJoystickTouchId=null,this.setupKeyboard(),this.setupMouse(),this.setupTouchCamera()}isUIOverlayBlocking(e){if(document.getElementById(`title-screen`)?.matches(`:not(.hidden)`)||document.querySelector(`.modal-overlay.open`)||document.querySelector(`#hud-layout-editor-overlay.active`)||document.getElementById(`portrait-rotate-prompt`)?.style.display===`flex`)return!0;let t=e instanceof HTMLElement?e:null;return t?!!t.closest(`input, textarea, select, button, a, .modal-overlay, #title-screen, #hud-layout-editor-overlay, #portrait-rotate-prompt`):!1}setupKeyboard(){window.addEventListener(`keydown`,e=>{this.isUIOverlayBlocking(e.target)||(this.keysHeld.add(e.code),e.code===`Space`&&(this.jumpJustPressed=!0,e.preventDefault()),(e.code===`KeyE`||e.code===`Enter`)&&(this.interactJustPressed=!0),(e.code===`KeyQ`||e.code===`KeyJ`)&&(this.questJustPressed=!0),(e.code===`KeyV`||e.key===`v`||e.key===`V`||e.key===`ر`)&&(this.viewToggleJustPressed=!0),(e.code===`ShiftLeft`||e.code===`ShiftRight`)&&(this.sprintToggleJustPressed=!0),(e.code===`KeyF`||e.key===`f`||e.key===`F`||e.key===`ب`)&&(this.attackJustPressed=!0),(e.code===`KeyC`||e.code===`AltLeft`||e.key===`c`||e.key===`C`||e.key===`ؤ`)&&(this.dodgeJustPressed=!0),(e.code===`KeyR`||e.code===`KeyX`||e.key===`r`||e.key===`R`||e.key===`ق`)&&(this.pulseJustPressed=!0))}),window.addEventListener(`keyup`,e=>{this.keysHeld.delete(e.code)}),window.addEventListener(`blur`,()=>{this.resetAllInputs()}),document.addEventListener(`visibilitychange`,()=>{document.hidden&&this.resetAllInputs()})}resetAllInputs(){this.keysHeld.clear(),this.isPointerDown=!1,this.cameraTouchId=null,this.activeJoystickTouchId=null,this.touchMoveInput.set(0,0),this.touchSprinting=!1,this.touchButtonSprinting=!1,this.touchJoystickSprinting=!1,this.moveInput.set(0,0),this.isSprinting=!1,this.clearFrameDeltas()}setJoystickTouchId(e){this.activeJoystickTouchId=e,e!==null&&this.cameraTouchId===e&&(this.cameraTouchId=null)}setupMouse(){this.container.addEventListener(`mousedown`,e=>{let t=e.target;this.isUIOverlayBlocking(t)||t.closest(`.interactive`)||t.closest(`#virtual-joystick-container`)||t.closest(`#joystick-base`)||t.closest(`#joystick-knob`)||t.closest(`.customizable-control`)||(e.button===0||e.button===2)&&(this.isPointerDown=!0,this.pointerStartX=e.clientX,this.pointerStartY=e.clientY,this.lastPointerX=e.clientX,this.lastPointerY=e.clientY)}),window.addEventListener(`mousemove`,e=>{if(!this.isPointerDown)return;let t=e.clientX-this.lastPointerX,n=e.clientY-this.lastPointerY;this.cameraDeltaX+=t,this.cameraDeltaY+=n,this.lastPointerX=e.clientX,this.lastPointerY=e.clientY}),window.addEventListener(`mouseup`,e=>{this.isPointerDown&&Math.hypot(e.clientX-this.pointerStartX,e.clientY-this.pointerStartY)<6&&(e.button===0?this.attackJustPressed=!0:e.button===2&&(this.pulseJustPressed=!0)),this.isPointerDown=!1}),this.container.addEventListener(`wheel`,e=>{this.isUIOverlayBlocking(e.target)||(this.zoomDelta+=e.deltaY)},{passive:!0}),this.container.addEventListener(`contextmenu`,e=>e.preventDefault())}setupTouchCamera(){let e=e=>e?!!(e.closest(`.interactive`)||e.closest(`.modal-overlay`)||e.closest(`#title-screen`)||e.closest(`#portrait-rotate-prompt`)||e.closest(`#virtual-joystick-container`)||e.closest(`#joystick-base`)||e.closest(`#joystick-knob`)||e.closest(`.mobile-controls`)||e.closest(`.quest-cluster`)||e.closest(`.hud-actions`)||e.closest(`.customizable-control`)||e.closest(`.minimap-box`)||e.closest(`#hud-layout-editor-overlay`)):!1;this.container.addEventListener(`touchstart`,t=>{if(!this.isUIOverlayBlocking(t.target)){this.cameraTouchId!==null&&(Array.from(t.touches).some(e=>e.identifier===this.cameraTouchId)||(this.cameraTouchId=null));for(let n=0;n<t.changedTouches.length;n++){let r=t.changedTouches[n],i=r.target;if((this.activeJoystickTouchId===null||r.identifier!==this.activeJoystickTouchId)&&!(r.clientX<window.innerWidth*.46&&r.clientY>window.innerHeight*.52)&&!e(i)&&this.cameraTouchId===null){this.cameraTouchId=r.identifier,this.lastTouchX=r.clientX,this.lastTouchY=r.clientY;break}}}},{passive:!0}),window.addEventListener(`touchmove`,e=>{if(this.cameraTouchId!==null){for(let t=0;t<e.changedTouches.length;t++){let n=e.changedTouches[t];if(n.identifier===this.activeJoystickTouchId)this.cameraTouchId===n.identifier&&(this.cameraTouchId=null);else if(n.identifier===this.cameraTouchId){let e=n.clientX-this.lastTouchX,t=n.clientY-this.lastTouchY,r=Math.max(-120,Math.min(120,e)),i=Math.max(-120,Math.min(120,t));this.cameraDeltaX+=r*1.25,this.cameraDeltaY+=i*1.25,this.lastTouchX=n.clientX,this.lastTouchY=n.clientY;return}}Array.from(e.touches).some(e=>e.identifier===this.cameraTouchId)||(this.cameraTouchId=null)}},{passive:!0});let t=e=>{if(this.cameraTouchId!==null){for(let t=0;t<e.changedTouches.length;t++)if(e.changedTouches[t].identifier===this.cameraTouchId){this.cameraTouchId=null;return}e.touches.length===0&&(this.cameraTouchId=null)}};window.addEventListener(`touchend`,t,{passive:!0}),window.addEventListener(`touchcancel`,t,{passive:!0})}update(){let e=0,t=0;(this.keysHeld.has(`KeyW`)||this.keysHeld.has(`ArrowUp`))&&(t+=1),(this.keysHeld.has(`KeyS`)||this.keysHeld.has(`ArrowDown`))&&--t,(this.keysHeld.has(`KeyA`)||this.keysHeld.has(`ArrowLeft`))&&--e,(this.keysHeld.has(`KeyD`)||this.keysHeld.has(`ArrowRight`))&&(e+=1);let n=this.keysHeld.has(`ShiftLeft`)||this.keysHeld.has(`ShiftRight`)||this.touchButtonSprinting||this.touchJoystickSprinting||this.touchSprinting;this.touchMoveInput.lengthSq()>.001&&(e+=this.touchMoveInput.x,t+=this.touchMoveInput.y);let r=(navigator.getGamepads?navigator.getGamepads():[])[0];if(r){let i=.15,a=r.axes[0],o=r.axes[1];Math.abs(a)>i&&(e+=a),Math.abs(o)>i&&(t-=o);let s=r.axes[2],c=r.axes[3];Math.abs(s)>i&&(this.cameraDeltaX+=s*8),Math.abs(c)>i&&(this.cameraDeltaY+=c*8),r.buttons[0]?.pressed&&(this.jumpJustPressed=!0),r.buttons[2]?.pressed&&(this.interactJustPressed=!0),(r.buttons[10]?.pressed||r.buttons[7]?.pressed)&&(n=!0),r.buttons[9]?.pressed&&(this.pauseJustPressed=!0)}this.moveInput.set(e,t),this.moveInput.lengthSq()>1&&this.moveInput.normalize(),n&&this.moveInput.lengthSq()<=.001&&this.moveInput.set(0,1),this.isSprinting=n}clearFrameDeltas(){this.cameraDeltaX=0,this.cameraDeltaY=0,this.zoomDelta=0,this.jumpJustPressed=!1,this.interactJustPressed=!1,this.pauseJustPressed=!1,this.questJustPressed=!1,this.viewToggleJustPressed=!1,this.attackJustPressed=!1,this.dodgeJustPressed=!1,this.pulseJustPressed=!1,this.sprintToggleJustPressed=!1}},bd=class{constructor(e){this.callbacks=e,this.isPaused=!1,this.isModalOpen=!1,this.isTouchSprinting=!1,this.isAutoRunning=!1,this.isCustomizingControls=!1,this.selectedControlId=`joystick`,this.currentDraftLayout=null,this.isDraggingControl=!1,this.dragStartPointer={x:0,y:0},this.dragStartPos={x:0,y:0},this.activeDragElement=null,this.openedFromTitleScreen=!1,this.onDialogueOptionSelectedCallback=null,this.onDeathReviveCallback=null,this.joystickTouchId=null,this.sprintTouchId=null,this.sprintPointerId=null,this.isSprintHeld=!1,this.sprintPressTime=0,this.joystickCenter={x:0,y:0},this.joystickRadius=55,this.CONTROL_LABELS={joystick:{ar:`أنالوج الحركة`,en:`Movement Joystick`},sprint:{ar:`زر الركض`,en:`Sprint Button`},jump:{ar:`زر القفز`,en:`Jump Button`},attack:{ar:`زر الهجوم بالسيف`,en:`Attack / Slash`},dodge:{ar:`زر التدحرج والتفادي`,en:`Dodge Roll`},pulse:{ar:`زر نبض الأثير`,en:`Echo Pulse`},interact:{ar:`زر التواصل والصدى`,en:`Commune / Interact`}},this.DEFAULT_LANDSCAPE_LAYOUT={joystick:{xPercent:.06,yPercent:.65,scale:1},sprint:{xPercent:.74,yPercent:.81,scale:1},jump:{xPercent:.86,yPercent:.81,scale:1},interact:{xPercent:.64,yPercent:.81,scale:1},attack:{xPercent:.88,yPercent:.6,scale:1.05},dodge:{xPercent:.78,yPercent:.6,scale:.95},pulse:{xPercent:.68,yPercent:.6,scale:.95}},this.DEFAULT_PORTRAIT_LAYOUT={joystick:{xPercent:.06,yPercent:.65,scale:1},sprint:{xPercent:.74,yPercent:.81,scale:1},jump:{xPercent:.86,yPercent:.81,scale:1},interact:{xPercent:.64,yPercent:.81,scale:1},attack:{xPercent:.88,yPercent:.6,scale:1.05},dodge:{xPercent:.78,yPercent:.6,scale:.95},pulse:{xPercent:.68,yPercent:.6,scale:.95}},this.root=document.getElementById(`root`)||document.body,this.buildDOM(),this.setupVirtualJoystick()}buildDOM(){let e=document.getElementById(`echo-ui-wrapper`);e&&e.remove();let t=document.createElement(`div`);t.id=`echo-ui-wrapper`,t.innerHTML=`
      <style>
        #echo-ui-wrapper {
          position: absolute;
          inset: 0;
          pointer-events: none;
          user-select: none;
          -webkit-user-select: none;
          font-family: 'Plus Jakarta Sans', 'Google Sans', sans-serif;
          color: #ffffff;
          overflow: hidden;
          z-index: 20;
        }

        .interactive {
          pointer-events: auto;
        }

        /* Cinematic Main Menu */
        #title-screen {
          position: absolute;
          inset: 0;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          gap: 1rem;
          padding: clamp(1.2rem, 4vw, 4rem);
          overflow-y: auto;
          overflow-x: hidden;
          -webkit-overflow-scrolling: touch;
          touch-action: pan-y;
          overscroll-behavior: contain;
          background: linear-gradient(
            to right,
            rgba(4, 9, 16, 0.92) 0%,
            rgba(4, 9, 16, 0.72) 38%,
            rgba(4, 9, 16, 0.25) 70%,
            rgba(4, 9, 16, 0.4) 100%
          );
          transition: opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1), visibility 0.8s;
          pointer-events: auto;
          box-sizing: border-box;
        }

        #title-screen.hidden {
          opacity: 0;
          visibility: hidden;
          pointer-events: none;
        }

        /* Top-Left / Left Menu Column */
        .title-brand-column {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          max-width: 460px;
        }

        .title-brand-lockup {
          margin-bottom: 2.4rem;
        }

        .title-main-glow {
          font-family: 'Cinzel', serif;
          font-size: clamp(3.2rem, 8vw, 5.8rem);
          font-weight: 900;
          letter-spacing: 0.35rem;
          line-height: 0.95;
          margin: 0;
          background: linear-gradient(135deg, #ffffff 30%, #70e1ff 75%, #00b4d8 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          filter: drop-shadow(0 0 28px rgba(0, 245, 212, 0.65));
        }

        .title-tagline {
          font-family: 'Cinzel', serif;
          font-size: clamp(0.75rem, 1.8vw, 1.05rem);
          font-weight: 700;
          letter-spacing: 0.25rem;
          color: #7ce8ff;
          text-transform: uppercase;
          margin-top: 0.5rem;
          opacity: 0.95;
          text-shadow: 0 0 12px rgba(0, 180, 216, 0.6);
        }

        .title-arabic-sub {
          font-family: 'Amiri', serif;
          font-size: clamp(1.2rem, 2.4vw, 1.7rem);
          color: #c4e9e4;
          margin-top: 0.35rem;
          letter-spacing: 0.05rem;
          text-shadow: 0 2px 10px rgba(0, 0, 0, 0.8);
        }

        /* Menu Options Stack (Inspired by reference screenshot) */
        .menu-options-stack {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          gap: 1.15rem;
          margin-top: 0.5rem;
        }

        .menu-nav-btn {
          position: relative;
          background: none;
          border: none;
          padding: 0.5rem 0;
          font-family: 'Cinzel', serif;
          font-size: clamp(1.25rem, 2.6vw, 1.75rem);
          font-weight: 700;
          letter-spacing: 0.16rem;
          color: #a5d8ea;
          cursor: pointer;
          text-transform: uppercase;
          display: flex;
          align-items: center;
          gap: 0.9rem;
          transition: all 0.25s ease;
          text-shadow: 0 2px 8px rgba(0, 0, 0, 0.7);
        }

        .menu-nav-btn::before {
          content: '';
          display: inline-block;
          width: 0;
          height: 3px;
          background: #00f5d4;
          box-shadow: 0 0 12px #00f5d4;
          border-radius: 2px;
          transition: width 0.25s ease;
        }

        .menu-nav-btn:hover {
          color: #ffffff;
          transform: translateX(8px);
          text-shadow: 0 0 18px rgba(0, 245, 212, 0.85);
        }

        .menu-nav-btn:hover::before {
          width: 22px;
        }

        .menu-nav-btn.primary {
          color: #00f5d4;
        }

        .menu-nav-btn .sub-label {
          font-family: 'Amiri', serif;
          font-size: clamp(0.95rem, 1.8vw, 1.2rem);
          color: #72a5b8;
          font-weight: 400;
          letter-spacing: 0;
          text-transform: none;
          margin-left: 0.4rem;
        }

        .menu-nav-btn:hover .sub-label {
          color: #c4f5ea;
        }

        .btn-status-badge {
          font-size: 0.72rem;
          font-family: 'Plus Jakarta Sans', sans-serif;
          background: rgba(0, 245, 212, 0.18);
          border: 1px solid rgba(0, 245, 212, 0.4);
          color: #80ffea;
          padding: 0.15rem 0.6rem;
          border-radius: 9999px;
          letter-spacing: 0.05rem;
        }

        /* Bottom Menu Footer Hints */
        .title-bottom-footer {
          display: flex;
          justify-content: space-between;
          align-items: center;
          width: 100%;
          border-top: 1px solid rgba(0, 245, 212, 0.15);
          padding-top: 1.2rem;
          font-size: 0.85rem;
          color: #78a2b5;
        }

        .controls-hint-inline {
          display: flex;
          gap: 1.2rem;
          align-items: center;
          flex-wrap: wrap;
        }

        .controls-hint-inline kbd {
          background: rgba(255, 255, 255, 0.1);
          border: 1px solid rgba(0, 245, 212, 0.3);
          border-radius: 4px;
          padding: 0.15rem 0.45rem;
          color: #00f5d4;
          font-size: 0.75rem;
        }

        /* In-Game HUD */
        #ingame-hud {
          position: absolute;
          inset: 0;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          padding: 1.4rem;
          transition: opacity 0.4s ease;
        }

        #ingame-hud.hidden {
          display: none;
        }

        .hud-top {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          width: 100%;
        }

        .quest-cluster {
          background: rgba(8, 18, 30, 0.88);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          border: 1px solid rgba(0, 245, 212, 0.35);
          border-radius: 14px;
          padding: 0.65rem 0.85rem;
          display: flex;
          flex-direction: column;
          gap: 0.35rem;
          max-width: 310px;
          box-shadow: 0 6px 24px rgba(0, 0, 0, 0.5), inset 0 0 12px rgba(0, 245, 212, 0.06);
          transition: all 0.3s ease;
          pointer-events: auto;
        }

        .quest-cluster:hover {
          border-color: rgba(0, 245, 212, 0.65);
          box-shadow: 0 8px 30px rgba(0, 0, 0, 0.6), 0 0 16px rgba(0, 245, 212, 0.18);
        }

        .quest-header-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 0.45rem;
          border-bottom: 1px solid rgba(0, 245, 212, 0.18);
          padding-bottom: 0.3rem;
        }

        .quest-chapter-badge {
          font-family: 'Cinzel', serif;
          font-size: 0.64rem;
          letter-spacing: 0.1rem;
          color: #fee440;
          font-weight: 700;
          text-transform: uppercase;
          display: flex;
          align-items: center;
          gap: 0.25rem;
        }

        .quest-title-text {
          font-family: 'Cinzel', serif;
          font-size: 0.82rem;
          font-weight: 800;
          color: #ffffff;
          letter-spacing: 0.05rem;
          text-shadow: 0 0 10px rgba(0, 245, 212, 0.5);
        }

        .quest-journal-shortcut-btn {
          background: rgba(0, 245, 212, 0.1);
          border: 1px solid rgba(0, 245, 212, 0.3);
          border-radius: 6px;
          color: #80ffea;
          font-size: 0.65rem;
          font-weight: 700;
          padding: 0.15rem 0.45rem;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 0.25rem;
          transition: all 0.2s ease;
        }

        .quest-journal-shortcut-btn:hover {
          background: rgba(0, 245, 212, 0.22);
          color: #ffffff;
          border-color: #00f5d4;
          transform: scale(1.03);
        }

        .quest-objective-active-card {
          background: rgba(0, 0, 0, 0.35);
          border: 1px solid rgba(254, 228, 64, 0.22);
          border-radius: 9px;
          padding: 0.45rem 0.65rem;
          display: flex;
          flex-direction: column;
          gap: 0.22rem;
        }

        .quest-objective-headline {
          display: flex;
          align-items: center;
          gap: 0.4rem;
        }

        .quest-step-pill {
          background: linear-gradient(135deg, #00f5d4, #00bbf9);
          color: #041018;
          font-weight: 900;
          font-size: 0.65rem;
          padding: 0.1rem 0.35rem;
          border-radius: 9999px;
          letter-spacing: 0.03rem;
          box-shadow: 0 0 8px rgba(0, 245, 212, 0.45);
        }

        .quest-objective-names {
          display: flex;
          flex-direction: column;
          flex: 1;
        }

        .quest-objective-name-ar {
          font-family: 'Amiri', serif;
          font-size: 1rem;
          font-weight: 700;
          color: #ffffff;
          line-height: 1.2;
        }

        .quest-objective-name-en {
          font-size: 0.68rem;
          color: #80ffea;
          opacity: 0.85;
          letter-spacing: 0.03rem;
        }

        .quest-objective-hint-text {
          font-size: 0.7rem;
          color: #c4e9e4;
          line-height: 1.3;
          display: flex;
          align-items: flex-start;
          gap: 0.25rem;
          background: rgba(254, 228, 64, 0.06);
          border-left: 2px solid #fee440;
          padding: 0.25rem 0.4rem;
          border-radius: 4px;
        }

        .quest-progress-track {
          width: 100%;
          height: 5px;
          background: rgba(255, 255, 255, 0.1);
          border-radius: 9999px;
          overflow: hidden;
          margin-top: 0.1rem;
        }

        .quest-progress-fill {
          height: 100%;
          width: 0%;
          background: linear-gradient(90deg, #00f5d4, #fee440);
          box-shadow: 0 0 10px #00f5d4;
          border-radius: 9999px;
          transition: width 0.4s ease;
        }

        /* Objective Complete Sliding Top Banner */
        #objective-complete-banner {
          position: absolute;
          top: 1.5rem;
          left: 50%;
          transform: translateX(-50%) translateY(-120%);
          background: linear-gradient(135deg, rgba(8, 22, 36, 0.96) 0%, rgba(14, 38, 54, 0.98) 100%);
          border: 1.5px solid #fee440;
          border-radius: 20px;
          padding: 0.85rem 2.2rem;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.3rem;
          box-shadow: 0 10px 45px rgba(254, 228, 64, 0.45), 0 0 30px rgba(0, 245, 212, 0.3);
          z-index: 60;
          transition: transform 0.5s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.5s ease;
          opacity: 0;
          pointer-events: none;
          text-align: center;
          min-width: 320px;
        }

        #objective-complete-banner.show {
          transform: translateX(-50%) translateY(0);
          opacity: 1;
        }

        .banner-kicker {
          font-family: 'Cinzel', serif;
          font-size: 0.8rem;
          letter-spacing: 0.2rem;
          color: #fee440;
          font-weight: 800;
          text-transform: uppercase;
          text-shadow: 0 0 10px rgba(254, 228, 64, 0.8);
        }

        .banner-title {
          font-family: 'Amiri', serif;
          font-size: 1.55rem;
          font-weight: 700;
          color: #ffffff;
          margin: 0;
        }

        .banner-next-unlocked {
          font-size: 0.85rem;
          color: #80ffea;
          display: flex;
          align-items: center;
          gap: 0.4rem;
        }

        /* Story Narrative Dialog Card */
        #story-narrative-modal .modal-card {
          max-width: 650px;
          border: 1.5px solid #00f5d4;
          background: linear-gradient(
            165deg,
            rgba(10, 24, 38, 0.98) 0%,
            rgba(6, 15, 24, 0.99) 50%,
            rgba(4, 9, 16, 0.99) 100%
          );
          box-shadow: 0 10px 60px rgba(0, 245, 212, 0.35), 0 0 30px rgba(0, 180, 216, 0.25);
          position: relative;
        }

        #story-narrative-modal .modal-card::before {
          content: '';
          position: absolute;
          top: -50px;
          left: 50%;
          transform: translateX(-50%);
          width: 240px;
          height: 120px;
          background: radial-gradient(ellipse at center, rgba(0, 245, 212, 0.45) 0%, transparent 70%);
          pointer-events: none;
        }

        .story-narrative-text-box {
          background: rgba(0, 0, 0, 0.38);
          border: 1px solid rgba(0, 245, 212, 0.25);
          border-radius: 16px;
          padding: 1.3rem 1.6rem;
          text-align: right;
          direction: rtl;
          margin: 0.4rem 0;
        }

        .story-narrative-ar {
          font-family: 'Amiri', serif;
          font-size: 1.35rem;
          line-height: 1.85;
          color: #f0f7f4;
          margin: 0;
          white-space: pre-line;
        }

        .story-narrative-en {
          font-size: 0.92rem;
          line-height: 1.6;
          color: #a5d8ea;
          margin-top: 0.8rem;
          padding-top: 0.8rem;
          border-top: 1px dashed rgba(0, 245, 212, 0.2);
          text-align: left;
          direction: ltr;
        }

        /* Quest Journal Checklist Items */
        .quest-checklist-item {
          background: rgba(0, 0, 0, 0.35);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 14px;
          padding: 0.85rem 1.1rem;
          display: flex;
          align-items: flex-start;
          gap: 0.9rem;
          transition: all 0.25s ease;
        }

        .quest-checklist-item.completed {
          background: rgba(0, 245, 212, 0.07);
          border-color: rgba(0, 245, 212, 0.35);
        }

        .quest-checklist-item.active {
          background: rgba(254, 228, 64, 0.09);
          border-color: rgba(254, 228, 64, 0.45);
          box-shadow: 0 0 16px rgba(254, 228, 64, 0.2);
        }

        .quest-checklist-item.locked {
          opacity: 0.45;
        }

        .quest-status-icon {
          width: 28px;
          height: 28px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 0.85rem;
          font-weight: 800;
          flex-shrink: 0;
          margin-top: 0.15rem;
        }

        .quest-status-icon.done {
          background: #00f5d4;
          color: #041018;
          box-shadow: 0 0 10px #00f5d4;
        }

        .quest-status-icon.current {
          background: #fee440;
          color: #041018;
          box-shadow: 0 0 12px #fee440;
          animation: pulseIcon 1.5s infinite;
        }

        .quest-status-icon.lock {
          background: rgba(255, 255, 255, 0.1);
          color: #728994;
        }

        @keyframes pulseIcon {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.12); }
        }

        .crystal-slots {
          display: flex;
          gap: 0.45rem;
          margin-top: 0.2rem;
        }

        .crystal-slot {
          width: 16px;
          height: 16px;
          border-radius: 50%;
          border: 1.5px solid rgba(255, 255, 255, 0.25);
          background: rgba(255, 255, 255, 0.05);
          transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .crystal-slot.active {
          box-shadow: 0 0 10px currentColor;
          transform: scale(1.15);
        }

        .hud-actions {
          display: flex;
          gap: 0.6rem;
        }

        .icon-btn {
          width: 44px;
          height: 44px;
          border-radius: 50%;
          background: rgba(10, 22, 34, 0.82);
          border: 1px solid rgba(0, 245, 212, 0.3);
          color: #ffffff;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .icon-btn:hover {
          background: rgba(0, 245, 212, 0.25);
          border-color: #00f5d4;
          transform: scale(1.06);
        }

        /* Minimap / Compass */
        .minimap-box {
          position: relative;
          width: 120px;
          height: 120px;
          border-radius: 50%;
          border: 2px solid rgba(0, 245, 212, 0.45);
          background: rgba(6, 14, 22, 0.88);
          overflow: hidden;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.5);
        }

        #minimap-canvas {
          width: 100%;
          height: 100%;
        }

        /* Interaction Prompt */
        #interact-prompt {
          position: absolute;
          bottom: 7.2rem;
          left: 50%;
          transform: translateX(-50%);
          background: rgba(10, 22, 34, 0.92);
          border: 1.5px solid #00f5d4;
          border-radius: 9999px;
          padding: 0.75rem 1.8rem;
          display: flex;
          align-items: center;
          gap: 0.75rem;
          font-weight: 600;
          font-size: 0.95rem;
          color: #ffffff;
          box-shadow: 0 0 25px rgba(0, 245, 212, 0.45);
          transition: all 0.3s ease;
          opacity: 0;
          visibility: hidden;
          cursor: pointer;
        }

        #interact-prompt.visible {
          opacity: 1;
          visibility: visible;
        }

        #interact-prompt kbd {
          background: #00f5d4;
          color: #061019;
          font-weight: 800;
          padding: 0.2rem 0.5rem;
          border-radius: 6px;
        }

        /* Touch Controls Layer & Customizable Controls */
        #touch-controls-layer {
          position: absolute;
          inset: 0;
          pointer-events: none;
          overflow: hidden;
          z-index: 25;
        }

        .customizable-control {
          position: absolute !important;
          pointer-events: auto;
          touch-action: none;
          user-select: none;
          -webkit-user-select: none;
          transform-origin: center center;
          transition: box-shadow 0.2s ease, outline 0.2s ease;
        }

        .control-edit-badge {
          display: none;
          position: absolute;
          top: -24px;
          left: 50%;
          transform: translateX(-50%);
          background: rgba(4, 18, 28, 0.95);
          border: 1px solid #00f5d4;
          color: #00f5d4;
          font-size: 0.65rem;
          font-weight: 800;
          padding: 2px 7px;
          border-radius: 9999px;
          white-space: nowrap;
          pointer-events: none;
          z-index: 40;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.7);
        }

        .hud-editing .control-edit-badge {
          display: block;
        }

        .hud-editing .customizable-control {
          outline: 2px dashed rgba(0, 245, 212, 0.75);
          outline-offset: 4px;
          cursor: grab;
        }

        .hud-editing .customizable-control:active {
          cursor: grabbing;
        }

        .hud-editing .customizable-control.selected-edit-target {
          outline: 3px solid #ffffff;
          outline-offset: 4px;
          box-shadow: 0 0 25px rgba(0, 245, 212, 0.95), 0 0 40px rgba(0, 180, 216, 0.6);
        }

        /* On-Screen Virtual Analog Joystick */
        #virtual-joystick-container {
          width: 130px;
          height: 130px;
        }

        #joystick-base {
          position: relative;
          width: 100%;
          height: 100%;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(0, 245, 212, 0.12) 0%, rgba(10, 22, 34, 0.65) 100%);
          border: 2px solid rgba(0, 245, 212, 0.38);
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.4);
          display: flex;
          align-items: center;
          justify-content: center;
        }

        #joystick-knob {
          position: absolute;
          width: 52px;
          height: 52px;
          border-radius: 50%;
          background: radial-gradient(circle, #00f5d4 0%, #00b4d8 100%);
          box-shadow: 0 0 15px rgba(0, 245, 212, 0.6);
          border: 2px solid #ffffff;
          transform: translate(0px, 0px);
          transition: transform 0.05s ease-out;
        }

        /* Fullscreen HUD Controls Layout Editor (Edit Mode) */
        #hud-layout-editor-overlay {
          position: absolute;
          inset: 0;
          background: rgba(4, 9, 16, 0.72);
          backdrop-filter: blur(4px);
          pointer-events: none;
          z-index: 2000;
          display: none;
          flex-direction: column;
          justify-content: space-between;
          padding: 0.8rem 1.2rem;
          box-sizing: border-box;
        }

        #hud-layout-editor-overlay.active {
          display: flex;
          pointer-events: none;
        }

        .editor-toolbar {
          pointer-events: auto !important;
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          justify-content: space-between;
          gap: 0.8rem;
          background: rgba(8, 20, 32, 0.96);
          border: 1.5px solid rgba(0, 245, 212, 0.65);
          border-radius: 18px;
          padding: 0.75rem 1.25rem;
          box-shadow: 0 10px 40px rgba(0, 0, 0, 0.85);
          z-index: 2200 !important;
        }

        .editor-toolbar button,
        .editor-toolbar input {
          pointer-events: auto !important;
          touch-action: manipulation;
        }

        .editor-footer {
          pointer-events: auto !important;
          align-self: center;
          background: rgba(8, 20, 32, 0.94);
          border: 1px solid rgba(0, 245, 212, 0.55);
          border-radius: 9999px;
          padding: 0.55rem 1.5rem;
          font-size: 0.85rem;
          color: #e2f1f8;
          display: flex;
          align-items: center;
          gap: 0.6rem;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.75);
          text-align: center;
          z-index: 2200 !important;
          user-select: none;
        }

        .hud-editing #touch-controls-layer {
          z-index: 1000 !important;
          pointer-events: none !important;
        }

        .hud-editing .customizable-control {
          z-index: 1500 !important;
          pointer-events: auto !important;
        }

        /* Mobile Touch Action Cluster (Right side) */
        .mobile-controls {
          position: absolute;
          bottom: 2rem;
          right: 2rem;
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          gap: 0.9rem;
          pointer-events: auto;
        }

        .action-row {
          display: flex;
          gap: 0.85rem;
        }

        .action-touch-btn {
          width: 62px;
          height: 62px;
          border-radius: 50%;
          background: rgba(10, 22, 34, 0.88);
          border: 2px solid rgba(0, 245, 212, 0.55);
          color: #00f5d4;
          font-weight: 700;
          font-size: 0.85rem;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          box-shadow: 0 4px 18px rgba(0, 0, 0, 0.5);
          cursor: pointer;
          touch-action: none;
          transition: all 0.15s ease;
        }

        .action-touch-btn.active,
        .action-touch-btn:active {
          background: #00f5d4;
          color: #05141f;
          transform: scale(0.92);
          box-shadow: 0 0 20px rgba(0, 245, 212, 0.8);
        }

        .action-touch-btn.auto-run-active {
          background: linear-gradient(135deg, rgba(0, 245, 212, 0.95) 0%, rgba(0, 187, 249, 0.95) 100%) !important;
          color: #04121a !important;
          border-color: #ffffff !important;
          box-shadow: 0 0 25px rgba(0, 245, 212, 0.95), 0 0 10px #ffffff !important;
          animation: pulse-auto-run 1.8s infinite ease-in-out !important;
        }

        .action-touch-btn.auto-run-active span {
          color: #04121a !important;
          font-weight: 900 !important;
        }

        @keyframes pulse-auto-run {
          0%, 100% {
            box-shadow: 0 0 18px rgba(0, 245, 212, 0.8), 0 0 4px #ffffff;
            transform: scale(1);
          }
          50% {
            box-shadow: 0 0 30px rgba(0, 245, 212, 1), 0 0 10px #ffffff;
            transform: scale(1.05);
          }
        }

        .action-touch-btn span:first-child {
          font-size: 0.9rem;
          font-weight: 800;
        }

        .action-touch-btn span:last-child {
          font-family: 'Amiri', serif;
          font-size: 0.72rem;
          opacity: 0.85;
        }

        /* Modals: Lore, Victory, Pause, Settings */
        .modal-overlay {
          position: absolute;
          inset: 0;
          z-index: 100;
          background: rgba(4, 9, 15, 0.88);
          display: flex;
          justify-content: center;
          align-items: center;
          padding: clamp(0.75rem, 3vw, 2rem);
          box-sizing: border-box;
          overflow-y: auto;
          overflow-x: hidden;
          -webkit-overflow-scrolling: touch;
          touch-action: pan-y;
          overscroll-behavior: contain;
          opacity: 0;
          visibility: hidden;
          transition: opacity 0.18s ease, visibility 0.18s ease;
          pointer-events: auto;
        }

        /* Ensure Settings & Multiplayer overlays always stack above Pause Menu */
        #settings-modal,
        #multiplayer-hub-modal {
          z-index: 120;
        }

        .modal-overlay.open {
          opacity: 1;
          visibility: visible;
        }

        .modal-overlay:not(.open) {
          pointer-events: none;
        }

        .modal-card {
          background: linear-gradient(145deg, rgba(14, 28, 43, 0.96) 0%, rgba(8, 16, 26, 0.98) 100%);
          border: 1.5px solid rgba(0, 245, 212, 0.45);
          border-radius: 24px;
          padding: clamp(1.1rem, 3vw, 2.2rem);
          max-width: 560px;
          width: 100%;
          max-height: min(90dvh, calc(100dvh - 1.5rem));
          overflow-y: auto;
          overflow-x: hidden;
          -webkit-overflow-scrolling: touch;
          touch-action: pan-y;
          overscroll-behavior: contain;
          margin: auto;
          box-sizing: border-box;
          box-shadow: 0 10px 50px rgba(0, 245, 212, 0.28);
          text-align: center;
          display: flex;
          flex-direction: column;
          gap: 1.1rem;
          transform: translateY(14px);
          transition: transform 0.2s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .modal-card button,
        .modal-card select,
        .modal-card input:not([type="range"]) {
          touch-action: manipulation;
        }

        .modal-card input[type="range"] {
          touch-action: pan-x;
        }

        .modal-overlay.open .modal-card {
          transform: translateY(0);
        }

        .modal-badge {
          font-family: 'Cinzel', serif;
          font-size: 0.85rem;
          letter-spacing: 0.2rem;
          color: #00f5d4;
          text-transform: uppercase;
        }

        .modal-title-ar {
          font-family: 'Amiri', serif;
          font-size: 2.2rem;
          color: #ffffff;
          margin: 0;
        }

        .modal-title-en {
          font-family: 'Cinzel', serif;
          font-size: 1.25rem;
          color: #80ffea;
          margin: 0;
        }

        .modal-btn {
          align-self: center;
          background: linear-gradient(135deg, #00f5d4 0%, #00bbf9 100%);
          color: #061924;
          border: none;
          padding: 0.85rem 2.2rem;
          font-weight: 700;
          font-size: 1rem;
          letter-spacing: 0.1rem;
          border-radius: 9999px;
          cursor: pointer;
          box-shadow: 0 0 20px rgba(0, 245, 212, 0.4);
          transition: transform 0.2s ease;
        }

        .modal-btn:hover {
          transform: scale(1.04);
        }

        .modal-btn.secondary {
          background: rgba(255, 255, 255, 0.1);
          color: #ffffff;
          box-shadow: none;
          border: 1px solid rgba(0, 245, 212, 0.3);
        }

        .modal-btn.secondary:hover {
          background: rgba(0, 245, 212, 0.2);
          border-color: #00f5d4;
        }

        /* Settings Sliders & Controls */
        .setting-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 0.5rem 0;
          border-bottom: 1px solid rgba(255, 255, 255, 0.08);
          font-size: 0.95rem;
        }

        .setting-label {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          gap: 0.2rem;
        }

        .setting-sub {
          font-size: 0.78rem;
          color: #72a5b8;
        }

        input[type="range"] {
          accent-color: #00f5d4;
          cursor: pointer;
          width: 140px;
        }

        /* Toast Notifications */
        #toast-notification {
          position: absolute;
          top: 2rem;
          left: 50%;
          transform: translateX(-50%) translateY(-30px);
          background: rgba(10, 22, 34, 0.95);
          border: 1px solid #00f5d4;
          color: #ffffff;
          padding: 0.65rem 1.6rem;
          border-radius: 9999px;
          font-size: 0.9rem;
          font-weight: 600;
          box-shadow: 0 4px 25px rgba(0, 245, 212, 0.4);
          opacity: 0;
          visibility: hidden;
          transition: all 0.35s cubic-bezier(0.16, 1, 0.3, 1);
          z-index: 50;
        }

        #toast-notification.show {
          opacity: 1;
          visibility: visible;
          transform: translateX(-50%) translateY(0);
        }

        /* Combat Status & Health HUD - Bottom Center, Transparent, Lines only */
        .combat-cluster {
          position: absolute;
          bottom: 1.5rem;
          left: 50%;
          transform: translateX(-50%);
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
          width: min(340px, calc(100vw - 40px));
          background: transparent !important;
          background-color: transparent !important;
          border: none !important;
          outline: none !important;
          border-radius: 0 !important;
          padding: 0 !important;
          backdrop-filter: none !important;
          -webkit-backdrop-filter: none !important;
          box-shadow: none !important;
          pointer-events: none;
          z-index: 25;
        }

        .combat-bar-wrapper {
          display: flex;
          flex-direction: column;
          gap: 0.22rem;
          width: 100%;
          background: transparent !important;
        }

        .combat-bar-meta {
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-size: 0.72rem;
          font-weight: 700;
          letter-spacing: 0.08rem;
          text-shadow: 0 1px 4px rgba(0, 0, 0, 0.95), 0 0 10px rgba(0, 0, 0, 0.85);
          user-select: none;
        }

        .combat-meta-title-hp {
          color: #ff3344;
          font-family: 'Cinzel', serif;
          font-weight: 800;
          letter-spacing: 0.12rem;
          text-shadow: 0 0 10px rgba(255, 51, 68, 0.5), 0 1px 4px rgba(0, 0, 0, 0.95);
        }

        .combat-meta-title-energy {
          color: #10b981;
          font-family: 'Cinzel', serif;
          font-weight: 800;
          letter-spacing: 0.12rem;
          text-shadow: 0 0 10px rgba(16, 185, 129, 0.5), 0 1px 4px rgba(0, 0, 0, 0.95);
        }

        .combat-value-display {
          color: #ffffff;
          font-family: 'Plus Jakarta Sans', monospace;
          font-weight: 700;
          font-size: 0.72rem;
          letter-spacing: 0.04rem;
          text-shadow: 0 1px 4px rgba(0, 0, 0, 0.95);
        }

        .combat-bar-track {
          width: 100%;
          height: 6px;
          background: rgba(255, 255, 255, 0.15);
          border-radius: 9999px;
          overflow: hidden;
          position: relative;
          box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.5);
        }

        .combat-bar-fill {
          height: 100%;
          transition: width 0.25s cubic-bezier(0.16, 1, 0.3, 1), background-color 0.3s ease;
          border-radius: 9999px;
        }

        /* Pure clean red line for HEALTH with subtle soft glow */
        .combat-bar-hp {
          background: linear-gradient(90deg, #e63946 0%, #ff3355 70%, #ff5c77 100%);
          box-shadow: 0 0 8px rgba(255, 51, 85, 0.55), 0 0 14px rgba(255, 51, 85, 0.25);
        }

        .combat-bar-hp.low {
          background: linear-gradient(90deg, #d90429 0%, #ff1744 100%);
          box-shadow: 0 0 12px rgba(255, 23, 68, 0.85), 0 0 20px rgba(255, 23, 68, 0.45);
          animation: pulseHealth 0.8s infinite alternate;
        }

        @keyframes pulseHealth {
          0% { filter: brightness(1); }
          100% { filter: brightness(1.35); }
        }

        /* Pure clean green line for ECHO ENERGY with subtle soft glow */
        .combat-bar-energy {
          background: linear-gradient(90deg, #059669 0%, #10b981 60%, #34d399 100%);
          box-shadow: 0 0 8px rgba(16, 185, 129, 0.55), 0 0 14px rgba(16, 185, 129, 0.25);
        }

        .combat-bar-energy.pulse-ready {
          background: linear-gradient(90deg, #10b981 0%, #34d399 50%, #6ee7b7 100%);
          box-shadow: 0 0 10px rgba(52, 211, 153, 0.75), 0 0 18px rgba(16, 185, 129, 0.4);
        }

        .combat-keybinds-row {
          display: flex;
          justify-content: center;
          gap: 0.65rem;
          font-size: 0.64rem;
          color: rgba(255, 255, 255, 0.65);
          margin-top: 0.1rem;
          align-items: center;
          text-shadow: 0 1px 3px rgba(0, 0, 0, 0.95);
        }

        .combat-keybinds-row kbd {
          background: rgba(0, 0, 0, 0.4);
          padding: 0.08rem 0.32rem;
          border-radius: 3px;
          border: 1px solid rgba(255, 255, 255, 0.18);
          color: #ffffff;
          font-weight: 700;
        }

        /* Screen Orientation: Portrait Adaptations */
        @media (orientation: portrait), (max-width: 680px) {
          #title-screen {
            padding: 2rem 1.4rem;
          }
          .title-main-glow {
            font-size: 3.2rem;
          }
          .title-tagline {
            font-size: 0.72rem;
          }
          .title-arabic-sub {
            font-size: 1.15rem;
          }
          .menu-options-stack {
            gap: 0.8rem;
          }
          .menu-nav-btn {
            font-size: 1.2rem;
            gap: 0.6rem;
          }
          .title-bottom-footer {
            flex-direction: column;
            gap: 0.6rem;
            align-items: flex-start;
          }

          /* HUD layout in Portrait */
          #ingame-hud {
            padding: 0.8rem;
          }
          .hud-top {
            flex-direction: row;
            justify-content: space-between;
            align-items: flex-start;
            gap: 0.5rem;
          }
          .quest-cluster {
            max-width: 220px;
            padding: 0.45rem 0.65rem;
            gap: 0.22rem;
            border-radius: 11px;
          }
          .quest-header-row {
            padding-bottom: 0.2rem;
          }
          .quest-title-text {
            font-size: 0.72rem;
          }
          .quest-objective-active-card {
            padding: 0.35rem 0.5rem;
            gap: 0.18rem;
          }
          .quest-objective-name-ar {
            font-size: 0.88rem;
          }
          .quest-objective-name-en {
            font-size: 0.62rem;
          }
          .quest-objective-hint-text {
            font-size: 0.64rem;
            padding: 0.15rem 0.3rem;
          }
          .minimap-box {
            width: 75px;
            height: 75px;
          }
          .hud-actions {
            gap: 0.35rem;
          }
          .icon-btn {
            width: 35px;
            height: 35px;
          }
          .icon-btn svg {
            width: 17px;
            height: 17px;
          }

          /* Virtual controls in Portrait */
          #virtual-joystick-container {
            bottom: 1.4rem;
            left: 1rem;
            width: 115px;
            height: 115px;
          }
          #joystick-knob {
            width: 46px;
            height: 46px;
          }
          .mobile-controls {
            bottom: 1.4rem;
            right: 0.8rem;
            gap: 0.5rem;
          }
          .action-row {
            gap: 0.4rem;
          }
          .combat-touch-btn {
            width: 50px;
            height: 50px;
          }
          .action-touch-btn {
            width: 50px;
            height: 50px;
          }

          /* Health & Energy HUD in Portrait */
          .combat-cluster {
            bottom: 1.15rem;
            width: min(190px, 44vw);
            gap: 0.35rem;
          }
          .combat-bar-meta {
            font-size: 0.64rem;
          }
          .combat-value-display {
            font-size: 0.64rem;
          }
          .combat-bar-track {
            height: 5px;
          }
          .combat-keybinds-row {
            display: none;
          }
          #interact-prompt {
            bottom: 5.8rem;
            padding: 0.5rem 1.2rem;
            font-size: 0.82rem;
          }
        }

        /* Screen Orientation: Landscape Adaptations (Short / Wide Screens) */
        @media (orientation: landscape) and (max-height: 560px) {
          #title-screen {
            padding: 1rem 1.8rem;
            gap: 0.65rem;
          }
          .title-brand-lockup {
            margin-bottom: 0.75rem;
          }
          .title-main-glow {
            font-size: clamp(2.2rem, 6vw, 3.2rem);
          }
          .title-tagline {
            font-size: 0.72rem;
            margin-top: 0.25rem;
          }
          .title-arabic-sub {
            font-size: 1rem;
            margin-top: 0.2rem;
          }
          .menu-options-stack {
            gap: 0.35rem;
            margin-top: 0.2rem;
          }
          .menu-nav-btn {
            font-size: clamp(0.95rem, 2.2vw, 1.18rem);
            padding: 0.28rem 0;
            gap: 0.55rem;
          }
          .menu-nav-btn .sub-label {
            font-size: 0.9rem;
          }
          .title-bottom-footer {
            padding-top: 0.55rem;
            font-size: 0.74rem;
            gap: 0.5rem;
            flex-wrap: wrap;
          }
          .modal-overlay {
            padding: 0.65rem;
          }
          .modal-card {
            padding: 1rem 1.25rem;
            gap: 0.65rem;
            max-height: min(94dvh, calc(100dvh - 1.3rem));
            border-radius: 18px;
          }
          .modal-title-ar {
            font-size: 1.55rem;
          }
          .modal-title-en {
            font-size: 1rem;
          }
          #ingame-hud {
            padding: 0.8rem 1.4rem;
          }
          .quest-cluster {
            max-width: 270px;
            padding: 0.45rem 0.7rem;
            gap: 0.25rem;
          }
          .minimap-box {
            width: 85px;
            height: 85px;
          }
          .icon-btn {
            width: 36px;
            height: 36px;
          }
          #virtual-joystick-container {
            bottom: 1.1rem;
            left: 1.4rem;
            width: 110px;
            height: 110px;
          }
          .mobile-controls {
            bottom: 1.1rem;
            right: 1.4rem;
            gap: 0.4rem;
          }
          .combat-touch-btn {
            width: 48px;
            height: 48px;
          }
          .action-touch-btn {
            width: 50px;
            height: 50px;
          }
          .combat-cluster {
            bottom: 0.95rem;
            width: 250px;
            gap: 0.35rem;
          }
          .combat-keybinds-row {
            display: none;
          }
          #interact-prompt {
            bottom: 4.8rem;
            padding: 0.45rem 1.2rem;
            font-size: 0.82rem;
          }
        }

        @media (min-height: 561px) and (max-height: 820px) {
          #title-screen {
            padding: 1.75rem 3rem;
            gap: 0.65rem;
          }
          .title-brand-lockup {
            margin-bottom: 1.15rem;
          }
          .title-main-glow {
            font-size: clamp(2.8rem, 6.5vw, 4.4rem);
          }
          .menu-options-stack {
            gap: 0.55rem;
            margin-top: 0.25rem;
          }
          .menu-nav-btn {
            font-size: clamp(1.1rem, 2.1vw, 1.45rem);
            padding: 0.35rem 0;
          }
          .title-bottom-footer {
            padding-top: 0.75rem;
          }
        }

        /* Upside-down Prevention Blocker Overlay */
        .upside-down-overlay {
          display: none;
          position: fixed;
          inset: 0;
          background: radial-gradient(circle at center, #0a1828 0%, #03060a 100%);
          z-index: 99999;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          text-align: center;
          padding: 2rem;
          pointer-events: auto;
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
        }

        .upside-down-card {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 1.1rem;
          max-width: 380px;
          border: 1.5px solid rgba(0, 245, 212, 0.5);
          border-radius: 24px;
          padding: 2.2rem;
          background: linear-gradient(145deg, rgba(14, 28, 43, 0.96) 0%, rgba(8, 16, 26, 0.98) 100%);
          box-shadow: 0 10px 50px rgba(0, 245, 212, 0.3);
        }

        .upside-down-icon {
          font-size: 3.4rem;
          animation: rotateHintAnim 2.2s infinite ease-in-out;
        }

        @keyframes rotateHintAnim {
          0%, 100% { transform: rotate(180deg); }
          50% { transform: rotate(0deg); }
        }

        .upside-down-title-ar {
          font-family: 'Amiri', serif;
          font-size: 1.7rem;
          font-weight: 700;
          color: #ffffff;
          margin: 0;
        }

        .upside-down-title-en {
          font-family: 'Cinzel', serif;
          font-size: 0.95rem;
          color: #80ffea;
          letter-spacing: 0.06rem;
          margin: 0;
        }

        .upside-down-desc {
          font-size: 0.85rem;
          color: #a5d8ea;
          line-height: 1.4;
          margin: 0;
        }

        /* Hurt Vignette */
        #hurt-vignette {
          position: absolute;
          inset: 0;
          background: radial-gradient(circle at center, transparent 30%, rgba(240, 20, 60, 0.55) 100%);
          opacity: 0;
          pointer-events: none;
          transition: opacity 0.15s ease-out;
          z-index: 18;
        }

        #hurt-vignette.active {
          opacity: 1;
        }

        /* Death Screen Modal */
        #death-modal .modal-card {
          border-color: #ff3366;
          box-shadow: 0 10px 60px rgba(255, 51, 102, 0.4), 0 0 30px rgba(160, 10, 40, 0.3);
          background: linear-gradient(165deg, rgba(30, 8, 14, 0.98) 0%, rgba(12, 4, 8, 0.99) 100%);
        }

        .death-rune-symbol {
          font-size: 3rem;
          color: #ff3366;
          text-shadow: 0 0 25px rgba(255, 51, 102, 0.8);
          animation: deathPulse 2s infinite ease-in-out;
        }

        @keyframes deathPulse {
          0%, 100% { transform: scale(1); opacity: 0.8; }
          50% { transform: scale(1.1); opacity: 1; text-shadow: 0 0 35px #ff3366; }
        }

        /* Touch Combat Action Buttons */
        .combat-touch-btn {
          width: 58px;
          height: 58px;
          border-radius: 50%;
          border: 1.5px solid rgba(0, 245, 212, 0.5);
          background: rgba(6, 18, 28, 0.85);
          color: #ffffff;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 2px;
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.5);
          touch-action: none;
          cursor: pointer;
          transition: transform 0.12s ease, border-color 0.2s ease, background 0.2s ease;
        }

        .combat-touch-btn:active {
          transform: scale(0.92);
          border-color: #00f5d4;
          background: rgba(0, 245, 212, 0.25);
        }

        .combat-touch-btn.attack {
          border-color: rgba(254, 228, 64, 0.6);
        }
        .combat-touch-btn.attack:active {
          background: rgba(254, 228, 64, 0.25);
        }

        .combat-touch-btn.pulse {
          border-color: rgba(160, 90, 255, 0.8);
          box-shadow: 0 0 15px rgba(160, 90, 255, 0.4);
        }
        .combat-touch-btn.pulse:active {
          background: rgba(160, 90, 255, 0.35);
        }
      </style>

      <!-- Hurt Vignette Screen Flash -->
      <div id="hurt-vignette"></div>

      <!-- Toast Notification -->
      <div id="toast-notification">Notification</div>

      <!-- Objective Complete Sliding Banner -->
      <div id="objective-complete-banner">
        <div class="banner-kicker">✦ هدف مكتمل · OBJECTIVE COMPLETED ✦</div>
        <div id="objective-complete-title" class="banner-title">استكشف الجزيرة</div>
        <div id="objective-complete-next" class="banner-next-unlocked">
          <span>الهدف التالي: اجمع ثلاث شظايا ذاكرة</span>
        </div>
      </div>

      <!-- Cinematic Main Menu Screen -->
      <div id="title-screen">
        <div class="title-brand-column">
          <div class="title-brand-lockup">
            <h1 class="title-main-glow">ECHO</h1>
            <div class="title-tagline">THE WORLD REMEMBERS</div>
            <div class="title-arabic-sub">صَدَى – العَالَمُ يَتَذَكَّر</div>
          </div>

          <!-- Menu Stack (Matches Reference Image Layout) -->
          <div class="menu-options-stack">
            <button id="menu-continue-btn" class="menu-nav-btn primary interactive">
              <span>CONTINUE</span>
              <span class="sub-label">متابعة</span>
              <span id="continue-status-badge" class="btn-status-badge">Resume</span>
            </button>

            <button id="menu-new-game-btn" class="menu-nav-btn interactive">
              <span>NEW JOURNEY</span>
              <span class="sub-label">رحلة جديدة</span>
            </button>

            <button id="menu-quest-log-btn" class="menu-nav-btn interactive" style="color: #00f5d4;">
              <span>THE FIRST MEMORY</span>
              <span class="sub-label">القصة والمهام</span>
            </button>

            <button id="menu-memory-btn" class="menu-nav-btn interactive" style="color: #fee440;">
              <span>WORLD MEMORY</span>
              <span class="sub-label">ذاكرة العالم</span>
            </button>

            <button id="menu-multiplayer-btn" class="menu-nav-btn interactive" style="color: #00f5d4; border-color: rgba(0, 245, 212, 0.4);">
              <span>CO-OP & MULTIPLAYER</span>
              <span class="sub-label">اللعب الجماعي والمجموعات</span>
            </button>

            <button id="menu-settings-btn" class="menu-nav-btn interactive">
              <span>SETTINGS</span>
              <span class="sub-label">الإعدادات</span>
            </button>

            <button id="menu-exit-btn" class="menu-nav-btn interactive">
              <span>EXIT GAME</span>
              <span class="sub-label">خروج</span>
            </button>
          </div>
        </div>

        <div class="title-bottom-footer">
          <div class="controls-hint-inline">
            <div><kbd>W</kbd><kbd>A</kbd><kbd>S</kbd><kbd>D</kbd> Move</div>
            <div><kbd>SHIFT</kbd> Sprint</div>
            <div><kbd>SPACE</kbd> Jump</div>
            <div><kbd>E</kbd> Interact</div>
            <div><kbd>Q</kbd> Quest Log</div>
            <div><kbd>M</kbd> World Memory</div>
            <div><kbd>ESC</kbd> Pause</div>
          </div>
          <div style="opacity: 0.7; font-size: 0.8rem;">
            The Forgotten Island · 3D Adventure
          </div>
        </div>
      </div>

      <!-- In-Game HUD -->
      <div id="ingame-hud" class="hidden">
        <div class="hud-top">
          <div style="display: flex; flex-direction: column; max-width: 320px;">
            <!-- Quest Tracker HUD -->
            <div id="quest-cluster" class="quest-cluster">
              <div class="quest-header-row">
                <div id="quest-chapter-badge" class="quest-chapter-badge">
                  <span>✦ CHAPTER I</span>
                  <span style="opacity: 0.65;">·</span>
                  <span>الفصل الأول</span>
                </div>
                <button id="quest-journal-shortcut-btn" class="quest-journal-shortcut-btn interactive" title="Open Quest Log (Q)">
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2">
                    <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1-2.5-2.5Z"></path>
                    <path d="M6 6h10"></path>
                    <path d="M6 10h10"></path>
                  </svg>
                  <span>سجل المهام (Q)</span>
                </button>
              </div>

              <div id="quest-title-text" class="quest-title-text">THE FIRST MEMORY · الذاكرة الأولى</div>

              <!-- Active Objective Card -->
              <div class="quest-objective-active-card">
                <div class="quest-objective-headline">
                  <span id="quest-objective-badge" class="quest-step-pill">١ / ٥</span>
                  <div class="quest-objective-names">
                    <span id="quest-objective-title-ar" class="quest-objective-name-ar">استكشف الجزيرة</span>
                    <span id="quest-objective-title-en" class="quest-objective-name-en">Explore the Island</span>
                  </div>
                  <span id="quest-progress-text" style="font-size: 0.85rem; font-weight: 800; color: #fee440; white-space: nowrap;">0 / 35m</span>
                </div>

                <div class="quest-progress-track">
                  <div id="quest-progress-fill" class="quest-progress-fill" style="width: 0%;"></div>
                </div>

                <div id="quest-objective-hint" class="quest-objective-hint-text">
                  <span>📍</span>
                  <span>انهض من رمال الشاطئ وتحرك لاكتشاف معالم الجزيرة</span>
                </div>
              </div>

              <!-- Compact Subsystem Indicators: Crystals & Shards -->
              <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 0.2rem; padding-top: 0.35rem; border-top: 1px dashed rgba(255, 255, 255, 0.1);">
                <div style="display: flex; align-items: center; gap: 0.4rem;">
                  <span style="font-size: 0.72rem; color: #80ffea; font-weight: 700;">ECHOES:</span>
                  <div id="crystal-slots" class="crystal-slots"></div>
                  <span id="crystal-count-text" style="color: #00f5d4; font-weight: 800; font-size: 0.75rem;">0/7</span>
                </div>
                <div style="display: flex; align-items: center; gap: 0.35rem; font-size: 0.75rem;">
                  <span style="color: #fee440;">✦</span>
                  <span style="color: #c4e9e4;">SHARDS:</span>
                  <span id="shard-count-text" style="color: #fee440; font-weight: 800;">0/10</span>
                </div>
              </div>
              <div style="width: 100%; height: 3px; background: rgba(255, 255, 255, 0.08); border-radius: 9999px; overflow: hidden;">
                <div id="shard-progress-fill" style="width: 0%; height: 100%; background: linear-gradient(90deg, #fee440, #00f5d4); transition: width 0.4s ease;"></div>
              </div>
            </div>
          </div>

          <div style="display: flex; gap: 1rem; align-items: flex-start;">
            <div class="minimap-box">
              <canvas id="minimap-canvas" width="120" height="120"></canvas>
            </div>

            <div class="hud-actions">
              <button id="hud-quest-btn" class="icon-btn interactive" title="Quest & Story Log · سجل المهام والقصة (Q)" style="border-color: rgba(0, 245, 212, 0.7); color: #00f5d4; box-shadow: 0 0 14px rgba(0, 245, 212, 0.3);">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1-2.5-2.5Z"></path>
                  <path d="M6 6h10"></path>
                  <path d="M6 10h10"></path>
                </svg>
              </button>
              <button id="world-memory-btn" class="icon-btn interactive" title="World Memory · ذاكرة العالم (M)" style="border-color: rgba(254, 228, 64, 0.7); color: #fee440; box-shadow: 0 0 12px rgba(254, 228, 64, 0.25);">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <circle cx="12" cy="12" r="10"></circle>
                  <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"></path>
                  <path d="M2 12h20"></path>
                </svg>
              </button>
              <button id="hud-multiplayer-btn" class="icon-btn interactive" title="Party & Multiplayer · المجموعات واللعب الجماعي (P)" style="border-color: rgba(0, 245, 212, 0.7); color: #00f5d4; box-shadow: 0 0 12px rgba(0, 245, 212, 0.25);">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                  <circle cx="9" cy="7" r="4"></circle>
                  <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                  <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                </svg>
              </button>
              <button id="sound-btn" class="icon-btn interactive" title="Toggle Audio">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
                  <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"></path>
                </svg>
              </button>
              <button id="hud-settings-btn" class="icon-btn interactive" title="Settings">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <circle cx="12" cy="12" r="3"></circle>
                  <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 1 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 1 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 1 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 1 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
                </svg>
              </button>
              <button id="reset-btn" class="icon-btn interactive" title="Respawn Position">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"></path>
                  <path d="M3 3v5h5"></path>
                </svg>
              </button>
              <button id="pause-btn" class="icon-btn interactive" title="Pause Menu (ESC)">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <rect x="6" y="4" width="4" height="16"></rect>
                  <rect x="14" y="4" width="4" height="16"></rect>
                </svg>
              </button>
            </div>
          </div>
        </div>

        <!-- Floating Interaction Prompt -->
        <div id="interact-prompt" class="interactive">
          <kbd>E</kbd>
          <span id="interact-label">Commune with Echo · تواصل مع صدى البلورة</span>
        </div>

        <!-- Player Combat Health & Energy HUD (Bottom Center, Transparent Lines) -->
        <div id="combat-cluster" class="combat-cluster">
          <div class="combat-bar-wrapper">
            <div class="combat-bar-meta">
              <span class="combat-meta-title-hp">HEALTH</span>
              <span id="player-hp-text" class="combat-value-display">100 / 100 HP</span>
            </div>
            <div class="combat-bar-track">
              <div id="player-hp-fill" class="combat-bar-fill combat-bar-hp" style="width: 100%;"></div>
            </div>
          </div>

          <div class="combat-bar-wrapper">
            <div class="combat-bar-meta">
              <span class="combat-meta-title-energy">ECHO ENERGY</span>
              <span id="player-energy-text" class="combat-value-display">100 / 100</span>
            </div>
            <div class="combat-bar-track">
              <div id="player-energy-fill" class="combat-bar-fill combat-bar-energy" style="width: 100%;"></div>
            </div>
          </div>

          <div class="combat-keybinds-row">
            <div><kbd>F</kbd> Staff Slash</div>
            <div><kbd>C</kbd> Dodge Roll</div>
            <div><kbd>R</kbd> Echo Pulse</div>
          </div>
        </div>

        <!-- Customizable Touch Controls Layer -->
        <div id="touch-controls-layer" class="touch-controls-layer">
          <!-- Virtual Analog Joystick -->
          <div id="virtual-joystick-container" class="customizable-control interactive" data-control-id="joystick">
            <div class="control-edit-badge">🕹️ أنالوج Joystick</div>
            <div id="joystick-base">
              <div id="joystick-knob"></div>
            </div>
          </div>

          <!-- Combat: Attack Slash -->
          <button id="touch-attack-btn" class="customizable-control combat-touch-btn attack interactive" data-control-id="attack" title="Attack [F]">
            <div class="control-edit-badge">⚔️ هجوم Slash</div>
            <span style="font-size: 1.15rem;">⚔️</span>
            <span style="font-size: 0.65rem; font-weight: 800;">SLASH</span>
          </button>

          <!-- Combat: Dodge Roll -->
          <button id="touch-dodge-btn" class="customizable-control combat-touch-btn interactive" data-control-id="dodge" title="Dodge Roll [C]">
            <div class="control-edit-badge">💨 تفادي Dodge</div>
            <span style="font-size: 1.15rem;">💨</span>
            <span style="font-size: 0.65rem; font-weight: 800;">DODGE</span>
          </button>

          <!-- Combat: Echo Pulse -->
          <button id="touch-pulse-btn" class="customizable-control combat-touch-btn pulse interactive" data-control-id="pulse" title="Echo Pulse [R]">
            <div class="control-edit-badge">💫 نبض Pulse</div>
            <span style="font-size: 1.15rem;">💫</span>
            <span style="font-size: 0.65rem; font-weight: 800;">PULSE</span>
          </button>

          <!-- Action: Sprint / Run (Fixed Press-to-run + smooth acceleration) -->
          <button id="touch-sprint-btn" class="customizable-control action-touch-btn interactive" data-control-id="sprint" title="Sprint [Shift]">
            <div class="control-edit-badge">🏃 ركض Sprint</div>
            <span>RUN</span>
            <span>ركض</span>
          </button>

          <!-- Action: Interact / Commune -->
          <button id="touch-interact-btn" class="customizable-control action-touch-btn interactive" data-control-id="interact" title="Interact [E]">
            <div class="control-edit-badge">✨ تواصل Echo</div>
            <span>ECHO</span>
            <span>تواصل</span>
          </button>

          <!-- Action: Jump -->
          <button id="touch-jump-btn" class="customizable-control action-touch-btn interactive" data-control-id="jump" style="width: 120px; border-radius: 9999px;" title="Jump [Space]">
            <div class="control-edit-badge">⬆️ قفز Jump</div>
            <span>JUMP</span>
            <span>قفز</span>
          </button>
        </div>
      </div>

      <!-- Fullscreen HUD Controls Layout Editor (Edit Mode) -->
      <div id="hud-layout-editor-overlay">
        <!-- Top Control Bar -->
        <div class="editor-toolbar">
          <div style="display: flex; align-items: center; gap: 0.75rem;">
            <div style="display: flex; flex-direction: column;">
              <span style="font-weight: 800; font-size: 0.95rem; color: #00f5d4; letter-spacing: 0.5px;">🎮 CUSTOMIZE CONTROLS</span>
              <span style="font-size: 0.75rem; color: #a8dadc; font-family: 'Amiri', serif;">تخصيص واجهة التحكم والأزرار</span>
            </div>
            <div id="editor-orientation-badge" style="background: rgba(0, 245, 212, 0.15); border: 1px solid rgba(0, 245, 212, 0.5); padding: 0.2rem 0.6rem; border-radius: 9999px; font-size: 0.75rem; color: #00f5d4; font-weight: 700;">
              📱 Landscape
            </div>
          </div>

          <!-- Target Selection & Scale Controls -->
          <div style="display: flex; align-items: center; gap: 0.9rem; flex-wrap: wrap;">
            <div style="display: flex; align-items: center; gap: 0.5rem; background: rgba(0, 0, 0, 0.4); padding: 0.35rem 0.8rem; border-radius: 12px; border: 1px solid rgba(255, 255, 255, 0.1);">
              <span style="font-size: 0.78rem; opacity: 0.8;">العنصر:</span>
              <span id="editor-selected-name" style="font-size: 0.85rem; font-weight: 800; color: #ffffff;">🕹️ أنالوج Joystick</span>
            </div>

            <div style="display: flex; align-items: center; gap: 0.5rem; background: rgba(0, 0, 0, 0.4); padding: 0.35rem 0.8rem; border-radius: 12px; border: 1px solid rgba(255, 255, 255, 0.1);">
              <span style="font-size: 0.78rem; opacity: 0.8;">الحجم:</span>
              <button id="editor-scale-minus-btn" type="button" class="interactive" style="background: rgba(255, 255, 255, 0.12); border: 1px solid rgba(255, 255, 255, 0.25); color: #fff; width: 28px; height: 28px; border-radius: 6px; cursor: pointer; font-weight: bold; font-size: 1rem;">−</button>
              <input type="range" id="editor-scale-slider" min="70" max="150" value="100" class="interactive" style="width: 90px; accent-color: #00f5d4; cursor: pointer;" />
              <button id="editor-scale-plus-btn" type="button" class="interactive" style="background: rgba(255, 255, 255, 0.12); border: 1px solid rgba(255, 255, 255, 0.25); color: #fff; width: 28px; height: 28px; border-radius: 6px; cursor: pointer; font-weight: bold; font-size: 1rem;">+</button>
              <span id="editor-scale-value" style="font-size: 0.85rem; font-weight: 800; color: #00f5d4; min-width: 42px;">100%</span>
            </div>
          </div>

          <!-- Actions: Reset, Cancel, Save -->
          <div style="display: flex; align-items: center; gap: 0.6rem;">
            <button id="editor-reset-btn" type="button" class="modal-btn secondary interactive" style="padding: 0.45rem 0.9rem; font-size: 0.82rem; border-color: rgba(255, 200, 100, 0.5); color: #ffe8a1;">
              🔄 RESET · استعادة
            </button>
            <button id="editor-cancel-btn" type="button" class="modal-btn secondary interactive" style="padding: 0.45rem 0.9rem; font-size: 0.82rem; border-color: rgba(255, 120, 120, 0.5); color: #ffadad;">
              ✕ CANCEL · إلغاء
            </button>
            <button id="editor-save-btn" type="button" class="modal-btn interactive" style="padding: 0.45rem 1.1rem; font-size: 0.85rem; font-weight: 800; background: #00f5d4; color: #06111a; box-shadow: 0 0 16px rgba(0, 245, 212, 0.5);">
              💾 SAVE · حفظ
            </button>
          </div>
        </div>

        <!-- Bottom Guidance Footer -->
        <div class="editor-footer">
          <span>💡 اسحب أي زر لتغيير مكانه على الشاشة · اضغط على أي زر لتحديده وتعديل حجمه بالشريط أعلاه · Drag to move, tap to select & resize</span>
        </div>
      </div>

      <!-- Settings Modal -->
      <div id="settings-modal" class="modal-overlay">
        <div class="modal-card">
          <div class="modal-badge">Preferences · إعدادات اللعبة</div>
          <h2 class="modal-title-ar">الإعدادات</h2>
          <h3 class="modal-title-en">Game Settings</h3>

            <!-- GRAPHICS QUALITY PRESET SELECTOR (إعدادات جودة الرسومات) -->
            <div class="setting-row" style="flex-direction: column; align-items: stretch; gap: 0.6rem; padding-bottom: 0.8rem;">
              <div style="display: flex; justify-content: space-between; align-items: center;">
                <div class="setting-label">
                  <span style="font-weight: 800; color: #fee440; font-size: 0.95rem;">GRAPHICS QUALITY</span>
                  <span class="setting-sub" style="color: #ffd166;">مستوى جودة الرسومات والأداء</span>
                </div>
                <span id="active-quality-badge" style="font-size: 0.75rem; background: rgba(0, 245, 212, 0.15); border: 1px solid #00f5d4; color: #00f5d4; padding: 0.2rem 0.6rem; border-radius: 9999px; font-weight: 700;">
                  قياسي · Medium
                </span>
              </div>

              <!-- 3 Quality Level Buttons -->
              <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 0.45rem;">
                <button type="button" id="quality-btn-low" class="quality-tier-btn interactive" data-preset="low" style="background: rgba(255, 255, 255, 0.05); border: 1.5px solid rgba(255, 255, 255, 0.15); border-radius: 10px; padding: 0.6rem 0.3rem; text-align: center; cursor: pointer; transition: all 0.25s ease;">
                  <div style="font-weight: 800; font-size: 0.85rem; color: #80ffea;">ناعم</div>
                  <div style="font-size: 0.7rem; color: #94a3b8; margin-top: 0.15rem;">Low · أداء عالي</div>
                  <div style="font-size: 0.65rem; color: #10b981; margin-top: 0.15rem;">60+ FPS للأجهزة الضعيفة</div>
                </button>

                <button type="button" id="quality-btn-medium" class="quality-tier-btn interactive active" data-preset="medium" style="background: rgba(0, 245, 212, 0.14); border: 1.5px solid #00f5d4; border-radius: 10px; padding: 0.6rem 0.3rem; text-align: center; cursor: pointer; transition: all 0.25s ease; box-shadow: 0 0 14px rgba(0, 245, 212, 0.25);">
                  <div style="font-weight: 800; font-size: 0.85rem; color: #fee440;">قياسي</div>
                  <div style="font-size: 0.7rem; color: #94a3b8; margin-top: 0.15rem;">Medium · متوازن</div>
                  <div style="font-size: 0.65rem; color: #38bdf8; margin-top: 0.15rem;">جودة وأداء متزنان</div>
                </button>

                <button type="button" id="quality-btn-ultra" class="quality-tier-btn interactive" data-preset="ultra" style="background: rgba(255, 255, 255, 0.05); border: 1.5px solid rgba(255, 255, 255, 0.15); border-radius: 10px; padding: 0.6rem 0.3rem; text-align: center; cursor: pointer; transition: all 0.25s ease;">
                  <div style="font-weight: 800; font-size: 0.85rem; color: #ff70a6;">فائق</div>
                  <div style="font-size: 0.7rem; color: #94a3b8; margin-top: 0.15rem;">Ultra · أعلى دقة</div>
                  <div style="font-size: 0.65rem; color: #f43f5e; margin-top: 0.15rem;">أقصى ظلال وتفاصيل</div>
                </button>
              </div>

              <div id="quality-description-text" style="font-size: 0.74rem; color: #94d2bd; background: rgba(0, 0, 0, 0.35); padding: 0.45rem 0.75rem; border-radius: 8px; border: 1px dashed rgba(0, 245, 212, 0.25); text-align: right; direction: rtl;">
                متوازن: دقة عرض طبيعية، ظلال تفاعلية ناعمة، كثافة أعشاب متوازنة 60 إطاراً.
              </div>
            </div>

            <div class="setting-row">
              <div class="setting-label">
                <span>Master Volume</span>
                <span class="setting-sub">الصوت العام</span>
              </div>
              <input type="range" id="setting-master-vol" min="0" max="100" value="80" class="interactive" />
            </div>

            <div class="setting-row">
              <div class="setting-label">
                <span>Ambient Music</span>
                <span class="setting-sub">الموسيقى الأثيرية</span>
              </div>
              <input type="range" id="setting-music-vol" min="0" max="100" value="65" class="interactive" />
            </div>

            <div class="setting-row">
              <div class="setting-label">
                <span>Camera Orbit Speed</span>
                <span class="setting-sub">حساسية الكاميرا</span>
              </div>
              <input type="range" id="setting-cam-sens" min="50" max="200" value="100" class="interactive" />
            </div>

            <!-- CUSTOMIZE CONTROLS Section in Settings -->
            <div class="setting-row" style="flex-direction: column; align-items: stretch; gap: 0.5rem; margin-top: 0.6rem; padding-top: 0.8rem; border-top: 1px solid rgba(0, 245, 212, 0.2);">
              <div style="display: flex; justify-content: space-between; align-items: center;">
                <div class="setting-label">
                  <span style="font-weight: 800; color: #00f5d4; font-size: 0.95rem;">CUSTOMIZE CONTROLS</span>
                  <span class="setting-sub" style="color: #94d2bd;">تخصيص أزرار التحكم والأنالوج</span>
                </div>
                <span style="font-size: 1.35rem;">🎮</span>
              </div>
              <button id="open-control-customizer-btn" type="button" class="modal-btn secondary interactive" style="width: 100%; border-color: rgba(0, 245, 212, 0.5); background: rgba(0, 245, 212, 0.12); color: #00f5d4; display: flex; align-items: center; justify-content: center; gap: 0.6rem; padding: 0.75rem; font-weight: 700;">
                <span>⚙️ تعديل واجهة التحكم · Edit HUD Controls</span>
              </button>
            </div>

          <button id="close-settings-btn" class="modal-btn interactive">
            Done · تم
          </button>
        </div>
      </div>

      <!-- Pause Menu Modal (ESC Key) -->
      <div id="pause-modal" class="modal-overlay">
        <div class="modal-card" style="max-width: 440px;">
          <div class="modal-badge">Game Paused · متوقف مؤقتاً</div>
          <h2 class="modal-title-ar">الجزيرة المنسية</h2>
          <h3 class="modal-title-en">The Forgotten Island</h3>

          <div style="display: flex; flex-direction: column; gap: 0.75rem; margin: 1rem 0;">
            <button id="resume-btn" class="modal-btn interactive" style="width: 100%;">
              Resume · متابعة اللعب
            </button>
            <button id="save-progress-btn" class="modal-btn secondary interactive" style="width: 100%;">
              Save Progress · حفظ التقدم
            </button>
            <button id="pause-multiplayer-btn" class="modal-btn secondary interactive" style="width: 100%; border-color: rgba(0, 245, 212, 0.4); color: #00f5d4;">
              👥 Party & Co-Op Hub · المجموعات واللعب الجماعي
            </button>
            <button id="pause-settings-btn" class="modal-btn secondary interactive" style="width: 100%;">
              Settings · الإعدادات
            </button>
            <button id="pause-reset-btn" class="modal-btn secondary interactive" style="width: 100%;">
              Respawn at Shore · العودة للشاطئ
            </button>
            <button id="pause-main-menu-btn" class="modal-btn secondary interactive" style="width: 100%; border-color: rgba(255, 100, 100, 0.4); color: #ff9999;">
              Return to Main Menu · القائمة الرئيسية
            </button>
          </div>
        </div>
      </div>

      <!-- Multiplayer & Co-Op Hub Modal -->
      <div id="multiplayer-hub-modal" class="modal-overlay">
        <div class="modal-card" style="max-width: 640px; max-height: 88vh; overflow-y: auto; text-align: left; border-color: rgba(0, 245, 212, 0.45); box-shadow: 0 10px 50px rgba(0, 245, 212, 0.25);">
          <!-- Concept Image Banner from User Attachment -->
          <div style="position: relative; width: 100%; border-radius: 12px; overflow: hidden; margin-bottom: 0.8rem; border: 1px solid rgba(0, 245, 212, 0.35);">
            <img src="/assets/aistudio/900598433_1164583123191976_1751464669737070361_n_5b0b91d8.jpg" alt="Co-Op Expedition" referrerpolicy="no-referrer" style="width: 100%; height: 160px; object-fit: cover; display: block;" />
            <div style="position: absolute; bottom: 0; left: 0; right: 0; background: linear-gradient(180deg, transparent, rgba(6, 10, 18, 0.95)); padding: 0.75rem 1rem;">
              <span style="font-size: 0.75rem; letter-spacing: 0.1em; color: #00f5d4; font-weight: 800; text-transform: uppercase;">Sanctuary Co-Op Expeditions · حملات الاستكشاف الجماعية</span>
            </div>
          </div>

          <div style="display: flex; justify-content: space-between; align-items: center; width: 100%; margin-bottom: 0.5rem;">
            <div class="modal-badge" style="color: #00f5d4; border-color: rgba(0, 245, 212, 0.4); background: rgba(0, 245, 212, 0.12);">
              MULTIPLAYER ARCHITECTURE · بنية اللعب الجماعي
            </div>
            <span id="mp-network-status-badge" style="font-size: 0.75rem; color: #10b981; font-weight: 800; background: rgba(16, 185, 129, 0.15); border: 1px solid rgba(16, 185, 129, 0.35); padding: 0.2rem 0.65rem; border-radius: 9999px;">
              🟢 Architecture Ready (Offline Loopback)
            </span>
          </div>

          <!-- Player Identity & UUID Card -->
          <div style="background: rgba(255, 255, 255, 0.04); border: 1px solid rgba(255, 255, 255, 0.1); border-radius: 12px; padding: 0.85rem; margin-bottom: 0.75rem;">
            <div style="font-size: 0.75rem; color: #94a3b8; font-weight: 700; text-transform: uppercase; margin-bottom: 0.35rem;">
              Player Identity & Independent ID · هوية ومعرف اللاعب المستقل
            </div>
            <div style="display: flex; gap: 0.5rem; align-items: center; margin-bottom: 0.6rem;">
              <input type="text" id="mp-player-name-input" class="interactive" style="flex: 1; background: rgba(0, 0, 0, 0.5); border: 1px solid rgba(0, 245, 212, 0.35); border-radius: 8px; padding: 0.45rem 0.75rem; color: #fff; font-size: 0.9rem;" placeholder="Adventurer Name" />
              <button id="mp-save-name-btn" class="modal-btn interactive" style="padding: 0.45rem 1rem; font-size: 0.8rem;">
                Save · حفظ
              </button>
            </div>
            <div style="display: flex; justify-content: space-between; align-items: center; font-size: 0.78rem; background: rgba(0, 0, 0, 0.35); padding: 0.4rem 0.65rem; border-radius: 6px;">
              <span style="color: #64748b;">UUID:</span>
              <span id="mp-player-uuid-text" style="color: #38bdf8; font-family: monospace;">echo_usr_...</span>
              <button id="mp-copy-uuid-btn" class="interactive" style="background: transparent; border: 1px solid rgba(56, 189, 248, 0.3); color: #38bdf8; border-radius: 4px; padding: 0.15rem 0.45rem; font-size: 0.7rem; cursor: pointer;">
                Copy
              </button>
            </div>
          </div>

          <!-- Character Class Selector -->
          <div style="background: rgba(255, 255, 255, 0.04); border: 1px solid rgba(255, 255, 255, 0.1); border-radius: 12px; padding: 0.85rem; margin-bottom: 0.75rem;">
            <div style="font-size: 0.75rem; color: #94a3b8; font-weight: 700; text-transform: uppercase; margin-bottom: 0.5rem;">
              Adventurer Class Role · فئة ودور المغامر
            </div>
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 0.5rem;">
              <button class="mp-class-btn interactive active" data-class="SPIRIT_WEAVER" style="background: rgba(0, 245, 212, 0.12); border: 1px solid #00f5d4; color: #fff; padding: 0.5rem; border-radius: 8px; text-align: left; cursor: pointer;">
                <div style="font-weight: 800; color: #00f5d4; font-size: 0.85rem;">Spirit Weaver · نساج الأرواح</div>
                <div style="font-size: 0.7rem; color: #94a3b8;">Cyan Staff • Echo Resonance</div>
              </button>
              <button class="mp-class-btn interactive" data-class="ANCIENT_WARDEN" style="background: rgba(255, 255, 255, 0.04); border: 1px solid rgba(255, 255, 255, 0.12); color: #fff; padding: 0.5rem; border-radius: 8px; text-align: left; cursor: pointer;">
                <div style="font-weight: 800; color: #a855f7; font-size: 0.85rem;">Ancient Warden · حارس الأطلال</div>
                <div style="font-size: 0.7rem; color: #94a3b8;">Violet Shield • Temple Bastion</div>
              </button>
              <button class="mp-class-btn interactive" data-class="MIND_SEEKER" style="background: rgba(255, 255, 255, 0.04); border: 1px solid rgba(255, 255, 255, 0.12); color: #fff; padding: 0.5rem; border-radius: 8px; text-align: left; cursor: pointer;">
                <div style="font-weight: 800; color: #38bdf8; font-size: 0.85rem;">Mind Seeker · باحث الذاكرة</div>
                <div style="font-size: 0.7rem; color: #94a3b8;">Blue Ray • Memory Extraction</div>
              </button>
              <button class="mp-class-btn interactive" data-class="ECHO_BLADE" style="background: rgba(255, 255, 255, 0.04); border: 1px solid rgba(255, 255, 255, 0.12); color: #fff; padding: 0.5rem; border-radius: 8px; text-align: left; cursor: pointer;">
                <div style="font-weight: 800; color: #f59e0b; font-size: 0.85rem;">Echo Blade · سياف الصدى</div>
                <div style="font-size: 0.7rem; color: #94a3b8;">Golden Arc • Kinetic Slashes</div>
              </button>
            </div>
          </div>

          <!-- Co-Op Party Hub -->
          <div style="background: rgba(255, 255, 255, 0.04); border: 1px solid rgba(255, 255, 255, 0.1); border-radius: 12px; padding: 0.85rem; margin-bottom: 0.75rem;">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.5rem;">
              <span style="font-size: 0.75rem; color: #94a3b8; font-weight: 700; text-transform: uppercase;">Co-Op Party (4 Max) · مجموعة الاستكشاف التعاونية</span>
              <span id="mp-party-code-badge" style="font-size: 0.75rem; color: #fee440; font-family: monospace; font-weight: 800; background: rgba(254, 228, 64, 0.12); padding: 0.15rem 0.5rem; border-radius: 4px; border: 1px solid rgba(254, 228, 64, 0.3);">CODE: ECHO-XXXX</span>
            </div>

            <!-- Party Slots Grid -->
            <div id="mp-party-slots-container" style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 0.4rem; margin-bottom: 0.5rem;">
              <!-- Slot 1 (Local Leader) -->
              <div style="background: rgba(0, 245, 212, 0.08); border: 1px solid rgba(0, 245, 212, 0.4); border-radius: 8px; padding: 0.5rem; text-align: center;">
                <div style="font-size: 1.2rem;">👑</div>
                <div id="mp-slot-1-name" style="font-size: 0.75rem; font-weight: 800; color: #fff; margin-top: 0.2rem; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">You (Leader)</div>
                <div style="font-size: 0.65rem; color: #10b981;">Ready 100HP</div>
              </div>
              <!-- Slot 2 -->
              <div style="background: rgba(255, 255, 255, 0.02); border: 1px dashed rgba(255, 255, 255, 0.15); border-radius: 8px; padding: 0.5rem; text-align: center; opacity: 0.6;">
                <div style="font-size: 1.2rem; color: #64748b;">+</div>
                <div style="font-size: 0.7rem; color: #94a3b8; margin-top: 0.2rem;">Open Slot</div>
                <div style="font-size: 0.65rem; color: #64748b;">Waiting</div>
              </div>
              <!-- Slot 3 -->
              <div style="background: rgba(255, 255, 255, 0.02); border: 1px dashed rgba(255, 255, 255, 0.15); border-radius: 8px; padding: 0.5rem; text-align: center; opacity: 0.6;">
                <div style="font-size: 1.2rem; color: #64748b;">+</div>
                <div style="font-size: 0.7rem; color: #94a3b8; margin-top: 0.2rem;">Open Slot</div>
                <div style="font-size: 0.65rem; color: #64748b;">Waiting</div>
              </div>
              <!-- Slot 4 -->
              <div style="background: rgba(255, 255, 255, 0.02); border: 1px dashed rgba(255, 255, 255, 0.15); border-radius: 8px; padding: 0.5rem; text-align: center; opacity: 0.6;">
                <div style="font-size: 1.2rem; color: #64748b;">+</div>
                <div style="font-size: 0.7rem; color: #94a3b8; margin-top: 0.2rem;">Open Slot</div>
                <div style="font-size: 0.65rem; color: #64748b;">Waiting</div>
              </div>
            </div>

            <!-- Objective Bar -->
            <div style="font-size: 0.72rem; color: #c4e9e4; background: rgba(0, 0, 0, 0.35); padding: 0.4rem 0.65rem; border-radius: 6px;">
              <span>🎯 الهدف المشترك:</span> <span id="mp-shared-objective-text" style="color: #fee440; font-weight: 700;">استكشاف أسرار المعبد العتيق والبلورات السبع</span>
            </div>
          </div>

          <!-- Architecture & Infrastructure Checklist -->
          <div style="background: rgba(255, 255, 255, 0.03); border: 1px solid rgba(255, 255, 255, 0.08); border-radius: 12px; padding: 0.75rem; font-size: 0.76rem; color: #94a3b8; line-height: 1.5; margin-bottom: 0.85rem;">
            <div style="font-weight: 800; color: #00f5d4; margin-bottom: 0.25rem;">جاهزية البنية التحتية للخادم المركزي (Architectural Readiness):</div>
            <div>✓ فصل كامل بين بيانات اللاعب (PlayerSaveData) وبيانات عالم الجزيرة (WorldInstanceData).</div>
            <div>✓ دعم الخادم المركزي ومزامنة الحركات والمواقع (Transform Dead Reckoning & Interpolation).</div>
            <div>✓ معرفات UUID مستقلة ومستمرة لكل لاعب مع ملف هوية وقدرات قابلة للتخصيص.</div>
            <div>✓ بروتوكول حزم شبكية typed كامل (C_SYNC_TRANSFORM / C_COMBAT_ATTACK / S_ROOM_STATE).</div>
          </div>

          <button id="close-multiplayer-btn" class="modal-btn interactive" style="width: 100%;">
            Done · تم
          </button>
        </div>
      </div>

      <!-- World Memory System Modal (ECHO MEMORY) -->
      <div id="world-memory-modal" class="modal-overlay">
        <div class="modal-card" style="max-width: 620px; max-height: 85vh; overflow-y: auto; text-align: left; border-color: rgba(254, 228, 64, 0.45); box-shadow: 0 10px 50px rgba(254, 228, 64, 0.22);">
          <div style="display: flex; justify-content: space-between; align-items: center; width: 100%;">
            <div class="modal-badge" style="color: #fee440; border-color: rgba(254, 228, 64, 0.4); background: rgba(254, 228, 64, 0.12);">
              ECHO MEMORY SYSTEM · نظام ذاكرة العالم
            </div>
            <div id="memory-current-biome" style="font-size: 0.8rem; color: #70e1ff; font-weight: 700; background: rgba(0, 245, 212, 0.12); border: 1px solid rgba(0, 245, 212, 0.3); padding: 0.25rem 0.75rem; border-radius: 9999px;">
              📍 Southern Shoreline
            </div>
          </div>

          <div style="text-align: center; margin: 0.4rem 0;">
            <h2 class="modal-title-ar" style="margin: 0; font-size: 1.8rem; color: #ffffff;">كَيْفَ يَتَذَكَّرُكَ العَالَمُ</h2>
            <h3 class="modal-title-en" style="margin: 0; color: #a5d8ea;">The Island's Memory of You</h3>
          </div>

          <!-- Player Archetype Badge -->
          <div style="background: linear-gradient(135deg, rgba(0, 245, 212, 0.12) 0%, rgba(254, 228, 64, 0.08) 100%); border: 1.5px solid rgba(0, 245, 212, 0.35); border-radius: 16px; padding: 1.1rem; text-align: center;">
            <div style="font-size: 0.75rem; text-transform: uppercase; letter-spacing: 0.15rem; color: #72a5b8;">Current Soul Resonance · صدى الروح</div>
            <div id="memory-archetype-ar" style="font-family: 'Amiri', serif; font-size: 1.7rem; font-weight: 700; color: #00f5d4; margin: 0.2rem 0;">الرَّحَّالَةُ الصَّبُور</div>
            <div id="memory-archetype-en" style="font-family: 'Cinzel', serif; font-size: 0.95rem; letter-spacing: 0.1rem; color: #fee440;">The Patient Wanderer</div>
            <div style="margin-top: 0.6rem; display: flex; align-items: center; justify-content: center; gap: 0.6rem;">
              <span style="font-size: 0.8rem; color: #a5d8ea;">Resonance Rank:</span>
              <span id="memory-resonance-level" style="font-weight: 800; color: #00f5d4; font-size: 0.95rem;">Rank 1</span>
            </div>
          </div>

          <!-- Behavior Statistics Grid -->
          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(125px, 1fr)); gap: 0.65rem; margin: 0.8rem 0;">
            <div style="background: rgba(0, 0, 0, 0.35); border: 1px solid rgba(255, 255, 255, 0.08); border-radius: 12px; padding: 0.75rem;">
              <div style="font-size: 0.72rem; color: #78a2b5;">Exploration Time · الوقت</div>
              <div id="stat-play-time" style="font-size: 1.15rem; font-weight: 800; color: #ffffff;">00:00</div>
            </div>
            <div style="background: rgba(0, 0, 0, 0.35); border: 1px solid rgba(255, 255, 255, 0.08); border-radius: 12px; padding: 0.75rem;">
              <div style="font-size: 0.72rem; color: #78a2b5;">Sprint Distance · الركض</div>
              <div id="stat-sprint-dist" style="font-size: 1.15rem; font-weight: 800; color: #ffffff;">0 m</div>
            </div>
            <div style="background: rgba(0, 0, 0, 0.35); border: 1px solid rgba(255, 255, 255, 0.08); border-radius: 12px; padding: 0.75rem;">
              <div style="font-size: 0.72rem; color: #78a2b5;">Zones Visited · المناطق</div>
              <div id="stat-zones-count" style="font-size: 1.15rem; font-weight: 800; color: #00f5d4;">1 / 8</div>
            </div>
            <div style="background: rgba(0, 0, 0, 0.35); border: 1px solid rgba(255, 255, 255, 0.08); border-radius: 12px; padding: 0.75rem;">
              <div style="font-size: 0.72rem; color: #78a2b5;">Secrets Found · الأسرار</div>
              <div id="stat-secrets-count" style="font-size: 1.15rem; font-weight: 800; color: #fee440;">0</div>
            </div>
          </div>

          <!-- Unlocked World Transformations (Real 3D Changes) -->
          <div style="margin: 0.6rem 0;">
            <div style="font-size: 0.85rem; font-weight: 700; color: #fee440; margin-bottom: 0.5rem; display: flex; align-items: center; gap: 0.4rem;">
              <span>✦</span>
              <span>Active World Transformations · تحولات العالم الحقيقية</span>
            </div>
            <div id="manifestations-list" style="display: flex; flex-direction: column; gap: 0.45rem;">
            </div>
          </div>

          <!-- Time per Biome Breakdown -->
          <div style="margin-top: 0.6rem;">
            <div style="font-size: 0.85rem; font-weight: 700; color: #a5d8ea; margin-bottom: 0.4rem;">
              Time Spent per Biome · التواجد في البيئات
            </div>
            <div id="biome-breakdown-list" style="display: flex; flex-direction: column; gap: 0.35rem;">
            </div>
          </div>

          <button id="close-memory-btn" class="modal-btn interactive" style="margin-top: 1rem; width: 100%; background: linear-gradient(135deg, #fee440 0%, #e09f3e 100%); color: #0d1b2a;">
            Return to World · العودة إلى الجزيرة
          </button>
        </div>
      </div>

      <!-- Lore Echo Memory Modal -->
      <div id="lore-modal" class="modal-overlay">
        <div class="modal-card">
          <div class="modal-badge">Ancient Memory Restored · صدى الذاكرة القديمة</div>
          <h2 id="lore-title-ar" class="modal-title-ar">بلورة الفجر</h2>
          <h3 id="lore-title-en" class="modal-title-en">Crystal of Dawn</h3>
          <div id="lore-location" class="modal-location">Whispering Pine Forest · غابة الصنوبر الهامسة</div>

          <p id="lore-text-ar" class="modal-quote-ar"></p>
          <p id="lore-text-en" class="modal-quote-en"></p>

          <button id="close-lore-btn" class="modal-btn interactive">
            Absorb Echo · استوعب الصدى
          </button>
        </div>
      </div>

      <!-- Ancient Inscription Modal -->
      <div id="inscription-modal" class="modal-overlay">
        <div class="modal-card" style="border-color: rgba(254, 228, 64, 0.45); box-shadow: 0 10px 50px rgba(254, 228, 64, 0.22);">
          <div class="modal-badge" style="color: #fee440; border-color: rgba(254, 228, 64, 0.4); background: rgba(254, 228, 64, 0.12);">
            Ancient Inscription · نقوش حجرية مقدسة
          </div>
          <div id="inscription-glyph" style="font-size: 2.4rem; letter-spacing: 0.6rem; color: #fee440; text-shadow: 0 0 20px rgba(254, 228, 64, 0.8); margin: 0.1rem 0;">ᚱ · ᛟ</div>
          <h2 id="inscription-title-ar" class="modal-title-ar" style="color: #ffffff; margin-top: 0;">مسلة العبور الأولى</h2>
          <h3 id="inscription-title-en" class="modal-title-en" style="color: #ffe875; margin-bottom: 0.4rem;">Stele of the First Crossing</h3>
          <div id="inscription-location" class="modal-location">Southern Arrival Beach · شاطئ الوصول الجنوبي</div>

          <div style="background: rgba(0, 0, 0, 0.35); border: 1px solid rgba(254, 228, 64, 0.2); border-radius: 14px; padding: 1.2rem; margin: 0.4rem 0;">
            <p id="inscription-text-ar" class="modal-quote-ar" style="color: #f0f7f4; margin-bottom: 0.75rem; font-size: 1.25rem;"></p>
            <p id="inscription-text-en" class="modal-quote-en" style="color: #ccd7e0; font-size: 0.95rem;"></p>
          </div>

          <button id="close-inscription-btn" class="modal-btn interactive" style="background: linear-gradient(135deg, #fee440 0%, #e09f3e 100%); color: #0d1b2a;">
            Finish Reading · تم الانتهاء من القراءة
          </button>
        </div>
      </div>

      <!-- Victory / Portal Awakening Modal -->
      <div id="victory-modal" class="modal-overlay">
        <div class="modal-card">
          <div class="modal-badge">The Great Portal Awakens · استيقاظ البوابة العظيمة</div>
          <h2 class="modal-title-ar">العَالَمُ يَتَذَكَّر</h2>
          <h3 class="modal-title-en">The World Remembers</h3>
          <p style="font-size: 1.05rem; line-height: 1.6; color: #d0f0ec;">
            All 7 Echo Crystals have been harmonized! The celestial vortex of the Great Stone Portal has awakened, opening a radiant pathway across worlds.
          </p>
          <p style="font-family: 'Amiri', serif; font-size: 1.4rem; color: #00f5d4;">
            اكتملت أصداء الجزيرة المنسية، وانبثق النور الخالد من قلب البوابة الحجرية العتيقة!
          </p>
          <button id="close-victory-btn" class="modal-btn interactive">
            Continue Journey · استمر في الرحلة
          </button>
        </div>
      </div>

      <!-- Death Screen Modal -->
      <div id="death-modal" class="modal-overlay">
        <div class="modal-card">
          <div class="death-rune-symbol">ᛋ · ᛟ</div>
          <div class="modal-badge" style="color: #ff3366;">ECHO SEVERED · انقطاع الصدى</div>
          <h2 class="modal-title-ar" style="color: #ff3366;">تلاشى صدى روحك</h2>
          <h3 class="modal-title-en" style="color: #fda4af;">Your Echo has Dissolved</h3>
          <p style="font-size: 0.95rem; line-height: 1.6; color: #fecdd3; margin: 0.4rem 0;">
            لقد حاصرتك كائنات الخشب الفاسد وتلاشى جسدك الأثيري مؤقتاً. رمال الشاطئ تتذكرك وستعيد تكوين صدى روحك عند الملاذ.
          </p>
          <button id="death-revive-btn" class="modal-btn interactive" style="background: linear-gradient(135deg, #ff3366 0%, #be123c 100%); color: #ffffff; width: 100%;">
            Revive at Shore · استعادة الصدى عند الشاطئ
          </button>
        </div>
      </div>

      <!-- Story Narrative Modal (رسائل قصصية ومؤثرات عند اكتشاف الأحداث) -->
      <div id="story-narrative-modal" class="modal-overlay">
        <div class="modal-card">
          <div id="story-narrative-badge" class="modal-badge" style="color: #00f5d4; border-color: rgba(0, 245, 212, 0.4); background: rgba(0, 245, 212, 0.12);">
            بداية الرحلة · THE AWAKENING
          </div>
          <div style="font-size: 2.2rem; color: #00f5d4; text-shadow: 0 0 24px rgba(0, 245, 212, 0.8); margin: 0.2rem 0;">ᚱ · ᛟ · ᛋ</div>
          <h2 id="story-narrative-title-ar" class="modal-title-ar" style="color: #ffffff; margin-top: 0;">الاستيقاظ على شاطئ النسيان</h2>
          <h3 id="story-narrative-title-en" class="modal-title-en" style="color: #80ffea; margin-bottom: 0.35rem;">Awakening on Forgotten Sands</h3>

          <div class="story-narrative-text-box">
            <p id="story-narrative-content-ar" class="story-narrative-ar"></p>
            <div id="story-narrative-quote-box" style="margin: 0.8rem 0; padding: 0.6rem 0.85rem; background: rgba(0, 245, 212, 0.08); border-right: 3px solid #00f5d4; border-radius: 6px;">
              <p id="story-narrative-quote-ar" style="font-family: 'Amiri', serif; font-size: 1.15rem; color: #80ffea; font-style: italic; margin: 0;"></p>
            </div>
            <p id="story-narrative-content-en" class="story-narrative-en"></p>
          </div>

          <button id="close-story-narrative-btn" class="modal-btn interactive" style="background: linear-gradient(135deg, #00f5d4 0%, #00bbf9 100%); color: #061924; width: 100%; max-width: 320px;">
            Continue Journey · استمر في الرحلة
          </button>
        </div>
      </div>

      <!-- Quest & Story Chronicle Journal Modal (سجل المهام والقصة) -->
      <div id="quest-log-modal" class="modal-overlay">
        <div class="modal-card" style="max-width: 680px; max-height: 85vh; overflow-y: auto; text-align: left;">
          <div style="display: flex; justify-content: space-between; align-items: center; width: 100%;">
            <div class="modal-badge" style="color: #00f5d4; border-color: rgba(0, 245, 212, 0.4); background: rgba(0, 245, 212, 0.12);">
              QUEST & STORY JOURNAL · سجل المهام والقصة
            </div>
            <div style="font-size: 0.8rem; color: #fee440; font-weight: 700; background: rgba(254, 228, 64, 0.12); border: 1px solid rgba(254, 228, 64, 0.3); padding: 0.25rem 0.75rem; border-radius: 9999px;">
              ECHO SYSTEM
            </div>
          </div>

          <h2 class="modal-title-ar" style="text-align: right; margin-top: 0.2rem;">الذاكرة الأولى · The First Memory</h2>
          
          <!-- Story Premise Card -->
          <div style="background: rgba(0, 0, 0, 0.4); border: 1px solid rgba(0, 245, 212, 0.25); border-radius: 14px; padding: 1rem 1.25rem; direction: rtl; text-align: right;">
            <div style="font-size: 0.78rem; font-weight: 800; color: #fee440; letter-spacing: 0.1rem; margin-bottom: 0.35rem;">
              حكاية الجزيرة المنسية · STORY PREMISE
            </div>
            <p style="font-family: 'Amiri', serif; font-size: 1.15rem; line-height: 1.7; color: #e4f7f4; margin: 0;">
              يستيقظ اللاعب في جزيرة مجهولة ولا يتذكر كيف وصل إليها. يكتشف أن العالم يحتفظ بذكريات كل من دخله، وتتردد أصداء أرواحهم في الحجر والماء والبلورات. لإيقاظ الجزيرة واستعادة الهوية، يجب إكمال أهداف الذاكرة الأولى تباعاً.
            </p>
          </div>

          <!-- Quest 1: The 5 Sequential Objectives -->
          <div style="margin-top: 0.4rem;">
            <div style="font-size: 0.85rem; font-weight: 800; color: #80ffea; letter-spacing: 0.08rem; text-transform: uppercase; margin-bottom: 0.6rem; display: flex; justify-content: space-between; align-items: center;">
              <span>أهداف المهمة الأولى · The First Memory</span>
              <span id="quest-log-progress-badge" style="color: #fee440; font-size: 0.8rem;">١ / ٥ مكتمل</span>
            </div>
            <div id="quest-log-list" style="display: flex; flex-direction: column; gap: 0.65rem;">
              <!-- Populated dynamically via renderQuestLog() -->
            </div>
          </div>

          <button id="close-quest-log-btn" class="modal-btn interactive" style="margin-top: 0.8rem; width: 100%;">
            Return to Exploration · العودة للاستكشاف
          </button>
        </div>
      </div>

      <!-- NPC Dialogue Modal (حوارات الشخصيات والمخلوقات التفاعلية) -->
      <div id="npc-dialogue-modal" class="modal-overlay">
        <div class="modal-card" style="max-width: 620px; padding: 1.8rem; border-color: rgba(0, 245, 212, 0.55); box-shadow: 0 15px 60px rgba(0, 245, 212, 0.35);">
          <!-- Header with Portrait and Title -->
          <div style="display: flex; gap: 1.1rem; align-items: center; width: 100%; border-bottom: 1px solid rgba(0, 245, 212, 0.25); padding-bottom: 1rem;">
            <div style="position: relative; width: 78px; height: 78px; border-radius: 50%; border: 2.5px solid #00f5d4; overflow: hidden; box-shadow: 0 0 20px rgba(0, 245, 212, 0.6); flex-shrink: 0; background: #000;">
              <img id="npc-portrait-img" src="/assets/aistudio/902496527_1823591332005868_4146964911404786464_n_35a4a4fd.jpg" alt="NPC Portrait" referrerpolicy="no-referrer" style="width: 100%; height: 100%; object-fit: cover;" />
            </div>
            <div style="flex: 1; text-align: right; direction: rtl;">
              <div id="npc-title-badge" class="modal-badge" style="font-size: 0.75rem; color: #fee440; margin-bottom: 0.2rem;">
                حارس أسرار الغابة الهامسة · KEEPER
              </div>
              <h2 id="npc-name-ar" style="font-family: 'Amiri', serif; font-size: 1.8rem; color: #ffffff; margin: 0; line-height: 1.2;">
                عابر الغابة الغامض
              </h2>
              <div id="npc-name-en" style="font-size: 0.82rem; color: #80ffea; letter-spacing: 0.05rem; direction: ltr; text-align: left;">
                The Shrouded Wanderer
              </div>
            </div>
          </div>

          <!-- Dialogue Speech Box -->
          <div style="background: rgba(0, 0, 0, 0.45); border: 1px solid rgba(0, 245, 212, 0.2); border-radius: 14px; padding: 1.25rem 1.4rem; text-align: right; direction: rtl; max-height: 240px; overflow-y: auto;">
            <p id="npc-dialogue-message-ar" style="font-family: 'Amiri', serif; font-size: 1.25rem; line-height: 1.7; color: #f0fdf4; margin: 0 0 0.8rem 0; white-space: pre-line;"></p>
            <p id="npc-dialogue-message-en" style="font-size: 0.88rem; line-height: 1.5; color: #94a7b0; margin: 0; direction: ltr; text-align: left; font-style: italic;"></p>
          </div>

          <!-- Dialogue Choices / Options Container -->
          <div id="npc-dialogue-options" style="display: flex; flex-direction: column; gap: 0.65rem; width: 100%; margin-top: 0.4rem;">
            <!-- Rendered dynamically -->
          </div>
        </div>
      </div>

      <!-- Landscape Orientation Enforcer (تثبيت الوضع الأفقي فقط على الهواتف) -->
      <div id="portrait-rotate-prompt">
        <div class="rotate-phone-icon">🔄 📱</div>
        <h2>PLEASE ROTATE DEVICE TO LANDSCAPE</h2>
        <p>الرجاء تدوير جهازك أو تفعيل الوضع الأفقي (Landscape 16:9) لتجربة اللعبة بأعلى دقة وسلاسة كما تم تصميمها.</p>
      </div>
    `,this.root.appendChild(t),this.titleScreen=document.getElementById(`title-screen`),this.inGameHUD=document.getElementById(`ingame-hud`),this.loreModal=document.getElementById(`lore-modal`),this.inscriptionModal=document.getElementById(`inscription-modal`),this.victoryModal=document.getElementById(`victory-modal`),this.pauseModal=document.getElementById(`pause-modal`),this.settingsModal=document.getElementById(`settings-modal`),this.multiplayerModal=document.getElementById(`multiplayer-hub-modal`),this.toastNotification=document.getElementById(`toast-notification`),this.interactPrompt=document.getElementById(`interact-prompt`),this.npcDialogueModal=document.getElementById(`npc-dialogue-modal`),this.npcPortraitImg=document.getElementById(`npc-portrait-img`),this.npcTitleBadge=document.getElementById(`npc-title-badge`),this.npcNameAr=document.getElementById(`npc-name-ar`),this.npcNameEn=document.getElementById(`npc-name-en`),this.npcDialogueMessageAr=document.getElementById(`npc-dialogue-message-ar`),this.npcDialogueMessageEn=document.getElementById(`npc-dialogue-message-en`),this.npcDialogueOptionsContainer=document.getElementById(`npc-dialogue-options`),this.questCluster=document.getElementById(`quest-cluster`),this.questChapterBadge=document.getElementById(`quest-chapter-badge`),this.questTitleText=document.getElementById(`quest-title-text`),this.questObjectiveBadge=document.getElementById(`quest-objective-badge`),this.questObjectiveTitleAr=document.getElementById(`quest-objective-title-ar`),this.questObjectiveTitleEn=document.getElementById(`quest-objective-title-en`),this.questObjectiveHint=document.getElementById(`quest-objective-hint`),this.questProgressBar=document.getElementById(`quest-progress-fill`),this.questProgressText=document.getElementById(`quest-progress-text`),this.objectiveCompleteBanner=document.getElementById(`objective-complete-banner`),this.objectiveCompleteTitle=document.getElementById(`objective-complete-title`),this.objectiveCompleteNext=document.getElementById(`objective-complete-next`),this.storyNarrativeModal=document.getElementById(`story-narrative-modal`),this.storyNarrativeBadge=document.getElementById(`story-narrative-badge`),this.storyNarrativeTitleAr=document.getElementById(`story-narrative-title-ar`),this.storyNarrativeTitleEn=document.getElementById(`story-narrative-title-en`),this.storyNarrativeContentAr=document.getElementById(`story-narrative-content-ar`),this.storyNarrativeContentEn=document.getElementById(`story-narrative-content-en`),this.storyNarrativeQuoteAr=document.getElementById(`story-narrative-quote-ar`),this.questLogModal=document.getElementById(`quest-log-modal`),this.questLogList=document.getElementById(`quest-log-list`),this.crystalSlotsContainer=document.getElementById(`crystal-slots`),this.minimapCanvas=document.getElementById(`minimap-canvas`),this.soundBtn=document.getElementById(`sound-btn`),this.sprintTouchBtn=document.getElementById(`touch-sprint-btn`),this.touchInteractBtn=document.getElementById(`touch-interact-btn`),this.joystickBase=document.getElementById(`joystick-base`),this.joystickKnob=document.getElementById(`joystick-knob`),this.continueBtn=document.getElementById(`menu-continue-btn`),this.continueStatus=document.getElementById(`continue-status-badge`),this.shardCountText=document.getElementById(`shard-count-text`),this.shardProgressFill=document.getElementById(`shard-progress-fill`),this.loreTitleAr=document.getElementById(`lore-title-ar`),this.loreTitleEn=document.getElementById(`lore-title-en`),this.loreLocation=document.getElementById(`lore-location`),this.loreTextAr=document.getElementById(`lore-text-ar`),this.loreTextEn=document.getElementById(`lore-text-en`),this.inscriptionTitleAr=document.getElementById(`inscription-title-ar`),this.inscriptionTitleEn=document.getElementById(`inscription-title-en`),this.inscriptionGlyph=document.getElementById(`inscription-glyph`),this.inscriptionLocation=document.getElementById(`inscription-location`),this.inscriptionTextAr=document.getElementById(`inscription-text-ar`),this.inscriptionTextEn=document.getElementById(`inscription-text-en`),this.worldMemoryModal=document.getElementById(`world-memory-modal`),this.playerHpBarFill=document.getElementById(`player-hp-fill`),this.playerHpText=document.getElementById(`player-hp-text`),this.playerEnergyBarFill=document.getElementById(`player-energy-fill`),this.playerEnergyText=document.getElementById(`player-energy-text`),this.hurtVignetteOverlay=document.getElementById(`hurt-vignette`),this.deathModal=document.getElementById(`death-modal`),this.deathReviveBtn=document.getElementById(`death-revive-btn`),this.touchAttackBtn=document.getElementById(`touch-attack-btn`),this.touchDodgeBtn=document.getElementById(`touch-dodge-btn`),this.touchPulseBtn=document.getElementById(`touch-pulse-btn`);let n=[`#00f5d4`,`#00bbf9`,`#9b5de5`,`#f15bb5`,`#fee440`,`#52b788`,`#ff70a6`];for(let e=0;e<7;e++){let t=document.createElement(`div`);t.className=`crystal-slot`,t.dataset.index=e.toString(),t.dataset.color=n[e],this.crystalSlotsContainer.appendChild(t)}this.controlsLayer=document.getElementById(`touch-controls-layer`),this.layoutEditorOverlay=document.getElementById(`hud-layout-editor-overlay`),this.editorScaleSlider=document.getElementById(`editor-scale-slider`),this.editorScaleValueText=document.getElementById(`editor-scale-value`),this.editorSelectedNameText=document.getElementById(`editor-selected-name`),this.editorOrientationBadge=document.getElementById(`editor-orientation-badge`),this.initControlsLayout(),this.continueBtn.addEventListener(`click`,()=>{this.callbacks.onContinueGame()}),document.getElementById(`menu-new-game-btn`)?.addEventListener(`click`,()=>{this.callbacks.onNewGame()}),document.getElementById(`menu-memory-btn`)?.addEventListener(`click`,()=>{this.openWorldMemoryModal(this.callbacks.getMemoryProfile())}),document.getElementById(`menu-settings-btn`)?.addEventListener(`click`,()=>{this.openSettingsModal()}),document.getElementById(`menu-exit-btn`)?.addEventListener(`click`,()=>{this.callbacks.onExitGame()}),document.getElementById(`menu-quest-log-btn`)?.addEventListener(`click`,()=>{this.callbacks.getQuestSystem&&this.openQuestLogModal(this.callbacks.getQuestSystem())}),this.soundBtn.addEventListener(`click`,()=>{this.callbacks.onToggleSound()}),document.getElementById(`hud-quest-btn`)?.addEventListener(`click`,()=>{this.callbacks.getQuestSystem&&this.openQuestLogModal(this.callbacks.getQuestSystem())}),document.getElementById(`quest-journal-shortcut-btn`)?.addEventListener(`click`,()=>{this.callbacks.getQuestSystem&&this.openQuestLogModal(this.callbacks.getQuestSystem())}),document.getElementById(`world-memory-btn`)?.addEventListener(`click`,()=>{this.openWorldMemoryModal(this.callbacks.getMemoryProfile())}),document.getElementById(`hud-settings-btn`)?.addEventListener(`click`,()=>{this.openSettingsModal()}),document.getElementById(`reset-btn`)?.addEventListener(`click`,()=>{this.callbacks.onResetPosition()}),document.getElementById(`pause-btn`)?.addEventListener(`click`,()=>{this.togglePause()}),document.getElementById(`resume-btn`)?.addEventListener(`click`,()=>{this.togglePause()}),document.getElementById(`save-progress-btn`)?.addEventListener(`click`,()=>{let e=this.callbacks.onSaveGame();this.showToast(e?`Progress Saved! · تم حفظ التقدم بنجاح`:`Could not save progress`)}),document.getElementById(`pause-settings-btn`)?.addEventListener(`click`,()=>{this.openSettingsModal()}),document.getElementById(`pause-reset-btn`)?.addEventListener(`click`,()=>{this.togglePause(),this.callbacks.onResetPosition()}),document.getElementById(`pause-main-menu-btn`)?.addEventListener(`click`,()=>{this.pauseModal.classList.remove(`open`),this.isPaused=!1,this.callbacks.onExitGame()}),document.getElementById(`close-settings-btn`)?.addEventListener(`click`,()=>{this.closeSettingsModal()}),document.getElementById(`open-control-customizer-btn`)?.addEventListener(`click`,e=>{e.preventDefault(),e.stopPropagation(),this.enterControlsEditMode()}),document.getElementById(`close-memory-btn`)?.addEventListener(`click`,()=>{this.closeWorldMemoryModal()}),document.getElementById(`menu-multiplayer-btn`)?.addEventListener(`click`,()=>{this.openMultiplayerModal()}),document.getElementById(`hud-multiplayer-btn`)?.addEventListener(`click`,()=>{this.openMultiplayerModal()}),document.getElementById(`pause-multiplayer-btn`)?.addEventListener(`click`,()=>{this.openMultiplayerModal()}),document.getElementById(`close-multiplayer-btn`)?.addEventListener(`click`,()=>{this.closeMultiplayerModal()}),document.getElementById(`mp-save-name-btn`)?.addEventListener(`click`,()=>{let e=document.getElementById(`mp-player-name-input`);if(e&&e.value.trim()){let t=this.callbacks.getMultiplayerCoordinator?.();t&&t.account.setUsername(e.value.trim())&&(this.showToast(`✦ تم تحديث اسم المغامر: ${e.value.trim()}`),this.updateMultiplayerModalContent())}}),document.getElementById(`mp-copy-uuid-btn`)?.addEventListener(`click`,()=>{let e=this.callbacks.getMultiplayerCoordinator?.();if(e){let t=e.account.getProfile().id;navigator.clipboard?.writeText&&navigator.clipboard.writeText(t).catch(()=>{}),this.showToast(`📋 تم نسخ معرف اللاعب الفريد (Player UUID)`)}}),document.querySelectorAll(`.mp-class-btn`).forEach(e=>{e.addEventListener(`click`,e=>{let t=e.currentTarget.getAttribute(`data-class`);if(t){let e=this.callbacks.getMultiplayerCoordinator?.();e&&(e.account.setCharacterClass(t),this.showToast(`✦ تم اختيار فئة المغامر: ${t}`),this.updateMultiplayerModalContent())}})}),document.getElementById(`close-story-narrative-btn`)?.addEventListener(`click`,()=>{this.closeStoryNarrativeModal()}),document.getElementById(`close-quest-log-btn`)?.addEventListener(`click`,()=>{this.closeQuestLogModal()}),window.addEventListener(`keydown`,e=>{(e.target instanceof HTMLElement?e.target:null)?.closest(`input, textarea, select`)||(e.code===`Escape`?(e.preventDefault(),this.handleEscapeKey(this.titleScreen.classList.contains(`hidden`))):((e.code===`KeyM`||e.key===`m`||e.key===`M`||e.key===`ة`)&&!this.isModalOpen&&!this.isPaused?this.openWorldMemoryModal(this.callbacks.getMemoryProfile()):(e.code===`KeyM`||e.key===`m`||e.key===`M`||e.key===`ة`)&&this.worldMemoryModal.classList.contains(`open`)&&this.closeWorldMemoryModal(),(e.code===`KeyQ`||e.key===`q`||e.key===`Q`||e.key===`ض`)&&!this.isModalOpen&&!this.isPaused?this.callbacks.getQuestSystem&&this.openQuestLogModal(this.callbacks.getQuestSystem()):(e.code===`KeyQ`||e.key===`q`||e.key===`Q`||e.key===`ض`)&&this.questLogModal.classList.contains(`open`)&&this.closeQuestLogModal(),(e.code===`KeyP`||e.key===`p`||e.key===`P`||e.key===`ح`)&&!this.isModalOpen&&!this.isPaused?this.openMultiplayerModal():(e.code===`KeyP`||e.key===`p`||e.key===`P`||e.key===`ح`)&&this.multiplayerModal?.classList.contains(`open`)&&this.closeMultiplayerModal()))});let r=document.getElementById(`setting-master-vol`),i=document.getElementById(`setting-music-vol`),a=()=>{let e=parseFloat(r.value)/100,t=parseFloat(i.value)/100;this.callbacks.onUpdateVolume(e,t)};r?.addEventListener(`input`,a),i?.addEventListener(`input`,a);let o=document.getElementById(`setting-cam-sens`);o?.addEventListener(`input`,()=>{let e=parseFloat(o.value)/100;this.callbacks.onUpdateCameraSens(e)});let s=document.querySelectorAll(`.quality-tier-btn`),c=document.getElementById(`active-quality-badge`),l=document.getElementById(`quality-description-text`),u=e=>{s.forEach(t=>{t.getAttribute(`data-preset`)===e?(t.classList.add(`active`),t.style.background=`rgba(0, 245, 212, 0.16)`,t.style.borderColor=`#00f5d4`,t.style.boxShadow=`0 0 16px rgba(0, 245, 212, 0.3)`):(t.classList.remove(`active`),t.style.background=`rgba(255, 255, 255, 0.04)`,t.style.borderColor=`rgba(255, 255, 255, 0.12)`,t.style.boxShadow=`none`)}),c&&(e===`low`?(c.textContent=`ناعم · Low (أقصى سرعة)`,c.style.color=`#80ffea`,c.style.borderColor=`#80ffea`):e===`medium`?(c.textContent=`قياسي · Medium (متوازن)`,c.style.color=`#fee440`,c.style.borderColor=`#fee440`):(c.textContent=`فائق · Ultra (أعلى دقة)`,c.style.color=`#ff70a6`,c.style.borderColor=`#ff70a6`)),l&&(e===`low`?l.textContent=`ناعم: إيقاف الظلال الكثيفة، تقليل كثافة الأعشاب، دقة شاشة محسنة للأجهزة الضعيفة ومعدل 60+ FPS ثابت.`:e===`medium`?l.textContent=`متوازن: دقة عرض طبيعية، ظلال تفاعلية ناعمة، كثافة أعشاب متوازنة 60 إطاراً.`:l.textContent=`فائق: أعلى دقة بصرية، أقصى عمق للظلال والإضاءة وتفاصيل كاملة للأشجار والمؤثرات للأجهزة القوية.`)};u(this.callbacks.getCurrentQualityPreset?.()||`medium`),s.forEach(e=>{e.addEventListener(`click`,t=>{t.preventDefault();let n=e.getAttribute(`data-preset`);n&&(u(n),this.callbacks.onQualityPresetChanged?.(n),this.showToast(n===`low`?`⚡ تم تفعيل نمط الجودة الناعم (أقصى أداء وسلاسة)`:n===`medium`?`⚖️ تم تفعيل النمط القياسي (جودة متوازنة)`:`✨ تم تفعيل النمط الفائق (أعلى دقة رسومية وظلال)`))})}),document.getElementById(`close-lore-btn`)?.addEventListener(`click`,()=>{this.closeLoreModal()}),document.getElementById(`close-inscription-btn`)?.addEventListener(`click`,()=>{this.closeInscriptionModal()}),document.getElementById(`close-victory-btn`)?.addEventListener(`click`,()=>{this.victoryModal.classList.remove(`open`),this.isModalOpen=!1}),this.interactPrompt.addEventListener(`click`,()=>{this.callbacks.onInteract()});let d=(e,t,n=160)=>{if(!e)return;let r=0,i=e=>{if(this.isCustomizingControls)return;e.preventDefault(),e.stopPropagation();let i=performance.now();i-r<n||(r=i,t())};e.addEventListener(`pointerdown`,i),e.addEventListener(`click`,i)};d(document.getElementById(`touch-jump-btn`),()=>this.callbacks.onJump()),d(document.getElementById(`touch-interact-btn`),()=>this.callbacks.onInteract());let f=e=>{if(!this.isCustomizingControls){if(e.preventDefault(),e.stopPropagation(),typeof TouchEvent<`u`&&e instanceof TouchEvent)for(let t=0;t<e.changedTouches.length;t++){let n=e.changedTouches[t];if(this.sprintTouchId===null){this.sprintTouchId=n.identifier;break}}else if(typeof PointerEvent<`u`&&e instanceof PointerEvent){if(e.pointerType===`touch`)return;this.sprintPointerId=e.pointerId}this.isSprintHeld||(this.isSprintHeld=!0,this.sprintPressTime=performance.now(),this.isAutoRunning||(this.updateAutoRunUI(!0),this.callbacks.onTouchSprintState?.(!0)))}},p=e=>{this.isSprintHeld&&(e&&(e.preventDefault(),e.stopPropagation()),this.isSprintHeld=!1,this.sprintTouchId=null,this.sprintPointerId=null,performance.now()-this.sprintPressTime<320?(this.isAutoRunning=!this.isAutoRunning,this.updateAutoRunUI(this.isAutoRunning),this.callbacks.onTouchSprintState?.(this.isAutoRunning)):(this.isAutoRunning=!1,this.updateAutoRunUI(!1),this.callbacks.onTouchSprintState?.(!1)))};this.sprintTouchBtn.addEventListener(`pointerdown`,f),this.sprintTouchBtn.addEventListener(`pointerup`,e=>{e.pointerType!==`touch`&&e.pointerId===this.sprintPointerId&&p(e)}),this.sprintTouchBtn.addEventListener(`pointercancel`,e=>{e.pointerType!==`touch`&&e.pointerId===this.sprintPointerId&&p(e)}),this.sprintTouchBtn.addEventListener(`pointerleave`,e=>{e.pointerType!==`touch`&&this.isSprintHeld&&e.pointerId===this.sprintPointerId&&p(e)}),this.sprintTouchBtn.addEventListener(`touchstart`,f,{passive:!1}),this.sprintTouchBtn.addEventListener(`touchend`,e=>{for(let t=0;t<e.changedTouches.length;t++)if(e.changedTouches[t].identifier===this.sprintTouchId){p(e);break}},{passive:!1}),this.sprintTouchBtn.addEventListener(`touchcancel`,e=>{for(let t=0;t<e.changedTouches.length;t++)if(e.changedTouches[t].identifier===this.sprintTouchId){p(e);break}},{passive:!1}),window.addEventListener(`pointerup`,e=>{e.pointerType!==`touch`&&this.isSprintHeld&&e.pointerId===this.sprintPointerId&&p()}),window.addEventListener(`touchend`,e=>{if(!this.isSprintHeld||this.sprintTouchId===null)return;let t=Array.from(e.changedTouches).some(e=>e.identifier===this.sprintTouchId),n=Array.from(e.touches).some(e=>e.identifier===this.sprintTouchId);(t||!n)&&p()}),window.addEventListener(`touchcancel`,e=>{if(!this.isSprintHeld||this.sprintTouchId===null)return;let t=Array.from(e.changedTouches).some(e=>e.identifier===this.sprintTouchId),n=Array.from(e.touches).some(e=>e.identifier===this.sprintTouchId);(t||!n)&&p()}),window.addEventListener(`blur`,()=>this.resetAllTouchStates()),document.addEventListener(`visibilitychange`,()=>{document.hidden&&this.resetAllTouchStates()});let m=(e,t)=>{if(!e)return;let n=0,r=e=>{if(this.isCustomizingControls)return;e.preventDefault(),e.stopPropagation();let r=performance.now();r-n<160||(n=r,t?.())};e.addEventListener(`pointerdown`,r),e.addEventListener(`click`,r)};m(this.touchAttackBtn,()=>this.callbacks.onCombatAttack?.()),m(this.touchDodgeBtn,()=>this.callbacks.onCombatDodge?.()),m(this.touchPulseBtn,()=>this.callbacks.onCombatPulse?.()),this.deathReviveBtn?.addEventListener(`click`,()=>{this.onDeathReviveCallback?this.onDeathReviveCallback():this.callbacks.onRespawnRequested?.()})}toggleAutoRun(e){return this.isCustomizingControls||(this.isAutoRunning=e===void 0?!this.isAutoRunning:e,this.updateAutoRunUI(this.isAutoRunning),this.callbacks.onTouchSprintState?.(this.isAutoRunning)),this.isAutoRunning}updateAutoRunUI(e){if(this.sprintTouchBtn){if(e){this.sprintTouchBtn.classList.add(`auto-run-active`);let e=this.sprintTouchBtn.querySelectorAll(`span`);e.length>=2&&(e[0].textContent=`SPRINT`,e[1].textContent=`ركض نشط`)}else{this.sprintTouchBtn.classList.remove(`auto-run-active`);let e=this.sprintTouchBtn.querySelectorAll(`span`);e.length>=2&&(e[0].textContent=`RUN`,e[1].textContent=`ركض`)}}}getCurrentOrientation(){return`landscape`}loadControlsLayout(e=`landscape`){let t=this.DEFAULT_LANDSCAPE_LAYOUT;try{let e=localStorage.getItem(`echo_controls_layout_landscape_v4`);if(e){let n=JSON.parse(e);if(n&&typeof n==`object`)return{...t,...n}}}catch(e){console.warn(`Failed to load saved controls layout:`,e)}return JSON.parse(JSON.stringify(t))}saveControlsLayout(e,t){try{localStorage.setItem(`echo_controls_layout_landscape_v4`,JSON.stringify(t))}catch(e){console.warn(`Failed to save controls layout:`,e)}}applyControlsLayout(e){let t=e||this.getCurrentOrientation(),n=this.isCustomizingControls&&this.currentDraftLayout?this.currentDraftLayout:this.loadControlsLayout(t),r=window.innerWidth,i=window.innerHeight;if([`joystick`,`sprint`,`jump`,`attack`,`dodge`,`pulse`,`interact`].forEach(e=>{let a=this.getControlElement(e);if(!a)return;let o=n[e]||(t===`landscape`?this.DEFAULT_LANDSCAPE_LAYOUT[e]:this.DEFAULT_PORTRAIT_LAYOUT[e]);if(!o)return;let s=o.scale||1;a.style.transform=`scale(${s})`;let c=(a.offsetWidth||62)*s,l=(a.offsetHeight||62)*s,u=Math.round(o.xPercent*r),d=Math.round(o.yPercent*i),f=Math.max(8,r-c-8),p=this.isCustomizingControls?70:8,m=Math.max(p,i-l-8);u=Math.max(8,Math.min(f,u)),d=Math.max(p,Math.min(m,d)),a.style.left=`${u}px`,a.style.top=`${d}px`,a.style.bottom=`auto`,a.style.right=`auto`}),this.joystickBase){let e=this.joystickBase.getBoundingClientRect();this.joystickCenter={x:e.left+e.width/2,y:e.top+e.height/2},this.joystickRadius=Math.max(35,e.width/2*.85)}}getControlElement(e){switch(e){case`joystick`:return document.getElementById(`virtual-joystick-container`);case`sprint`:return this.sprintTouchBtn;case`jump`:return document.getElementById(`touch-jump-btn`);case`attack`:return this.touchAttackBtn;case`dodge`:return this.touchDodgeBtn;case`pulse`:return this.touchPulseBtn;case`interact`:return this.touchInteractBtn;default:return null}}initControlsLayout(){let e=this.getCurrentOrientation();this.applyControlsLayout(e);let t=(e,t)=>{let n=document.getElementById(e);if(!n)return;let r=0,i=e=>{let n=Date.now();n-r<180?(e.preventDefault(),e.stopPropagation()):(r=n,e.preventDefault(),e.stopPropagation(),this.isDraggingControl=!1,this.activeDragElement=null,t())};n.addEventListener(`pointerdown`,i),n.addEventListener(`click`,i)};t(`editor-reset-btn`,()=>this.resetControlsToDefault()),t(`editor-cancel-btn`,()=>this.exitControlsEditMode(!1)),t(`editor-save-btn`,()=>this.exitControlsEditMode(!0));let n=e=>{e.stopPropagation(),this.isDraggingControl=!1,this.activeDragElement=null;let t=parseInt(e.target.value,10);isNaN(t)||this.updateSelectedControlScale(t)};this.editorScaleSlider?.addEventListener(`input`,n),this.editorScaleSlider?.addEventListener(`change`,n),this.editorScaleSlider?.addEventListener(`pointerdown`,e=>{e.stopPropagation(),this.isDraggingControl=!1,this.activeDragElement=null}),this.editorScaleSlider?.addEventListener(`touchstart`,e=>{e.stopPropagation(),this.isDraggingControl=!1,this.activeDragElement=null},{passive:!0});let r=(e,t)=>{let n=document.getElementById(e);if(!n)return;let r=0,i=e=>{let n=Date.now();if(n-r<120){e.preventDefault(),e.stopPropagation();return}r=n,e.preventDefault(),e.stopPropagation(),this.isDraggingControl=!1,this.activeDragElement=null;let i=parseInt(this.editorScaleSlider.value,10)||100;this.updateSelectedControlScale(i+t)};n.addEventListener(`pointerdown`,i),n.addEventListener(`click`,i)};r(`editor-scale-minus-btn`,-5),r(`editor-scale-plus-btn`,5),this.setupControlDraggables()}enterControlsEditMode(){this.openedFromTitleScreen=!this.titleScreen.classList.contains(`hidden`),this.openedFromTitleScreen&&this.titleScreen.classList.add(`hidden`),this.closeSettingsModal(),this.isCustomizingControls=!0,this.isDraggingControl=!1,this.activeDragElement=null;let e=this.getCurrentOrientation();this.currentDraftLayout=JSON.parse(JSON.stringify(this.loadControlsLayout(e))),this.root.classList.add(`hud-editing`),this.layoutEditorOverlay.classList.add(`active`),this.inGameHUD.classList.remove(`hidden`),this.editorOrientationBadge&&(this.editorOrientationBadge.textContent=`🖥️ Landscape 16:9 (أفقي)`),this.selectControlForEdit(`joystick`),this.applyControlsLayout(e),this.showToast(`🎮 وضع تخصيص أزرار التحكم نشط · اسحب أي زر لتغيير مكانه، أو عدّل حجمه`)}exitControlsEditMode(e){let t=this.getCurrentOrientation();e&&this.currentDraftLayout?(this.saveControlsLayout(t,this.currentDraftLayout),this.showToast(`✦ تم حفظ إعدادات التحكم بنجاح · Controls saved successfully`)):(this.currentDraftLayout=this.loadControlsLayout(t),this.showToast(`تم إلغاء التعديلات · Changes discarded`)),this.isCustomizingControls=!1,this.isDraggingControl=!1,this.activeDragElement=null,this.currentDraftLayout=null,this.root.classList.remove(`hud-editing`),this.layoutEditorOverlay.classList.remove(`active`),document.querySelectorAll(`.customizable-control`).forEach(e=>{e.classList.remove(`selected-edit-target`)}),this.applyControlsLayout(t),this.openedFromTitleScreen&&(this.titleScreen.classList.remove(`hidden`),this.inGameHUD.classList.add(`hidden`),this.openedFromTitleScreen=!1),this.openSettingsModal()}resetControlsToDefault(){let e=this.getCurrentOrientation(),t=e===`landscape`?this.DEFAULT_LANDSCAPE_LAYOUT:this.DEFAULT_PORTRAIT_LAYOUT;this.currentDraftLayout=JSON.parse(JSON.stringify(t)),this.applyControlsLayout(e),this.selectControlForEdit(this.selectedControlId),this.showToast(`✦ تمت استعادة المواقع والأحجام الافتراضية · Controls reset to defaults`)}selectControlForEdit(e){this.selectedControlId=e,document.querySelectorAll(`.customizable-control`).forEach(e=>{e.classList.remove(`selected-edit-target`)});let t=this.getControlElement(e);t&&t.classList.add(`selected-edit-target`);let n=this.CONTROL_LABELS[e];this.editorSelectedNameText&&(this.editorSelectedNameText.textContent=`${n.ar} · ${n.en}`);let r=this.getCurrentOrientation(),i=this.currentDraftLayout||this.loadControlsLayout(r),a=Math.round((i[e]?.scale||1)*100);this.editorScaleSlider&&this.editorScaleValueText&&(this.editorScaleSlider.value=a.toString(),this.editorScaleValueText.textContent=`${a}%`)}updateSelectedControlScale(e){if(!this.currentDraftLayout)return;let t=Math.max(70,Math.min(150,e)),n=t/100;this.currentDraftLayout[this.selectedControlId]&&(this.currentDraftLayout[this.selectedControlId].scale=n),this.editorScaleSlider&&this.editorScaleValueText&&(this.editorScaleSlider.value=t.toString(),this.editorScaleValueText.textContent=`${t}%`);let r=this.getControlElement(this.selectedControlId);r&&(r.style.transform=`scale(${n})`),this.applyControlsLayout()}setupControlDraggables(){[`joystick`,`sprint`,`jump`,`attack`,`dodge`,`pulse`,`interact`].forEach(e=>{let t=this.getControlElement(e);if(!t)return;let n=(n,r,i)=>{if(!this.isCustomizingControls)return;i.preventDefault(),i.stopPropagation(),this.selectControlForEdit(e),this.isDraggingControl=!0,this.activeDragElement=t,this.dragStartPointer={x:n,y:r};let a=t.getBoundingClientRect();this.dragStartPos={x:a.left,y:a.top}};t.addEventListener(`pointerdown`,e=>n(e.clientX,e.clientY,e))});let e=(e,t,n)=>{if(!this.isCustomizingControls||!this.isDraggingControl||!this.activeDragElement||!this.currentDraftLayout)return;n.preventDefault();let r=e-this.dragStartPointer.x,i=t-this.dragStartPointer.y,a=this.currentDraftLayout[this.selectedControlId]?.scale||1,o=(this.activeDragElement.offsetWidth||62)*a,s=(this.activeDragElement.offsetHeight||62)*a,c=this.dragStartPos.x+r,l=this.dragStartPos.y+i,u=Math.max(8,window.innerWidth-o-8),d=Math.max(75,window.innerHeight-s-8);c=Math.max(8,Math.min(u,c)),l=Math.max(75,Math.min(d,l)),this.activeDragElement.style.left=`${c}px`,this.activeDragElement.style.top=`${l}px`,this.activeDragElement.style.bottom=`auto`,this.activeDragElement.style.right=`auto`,this.currentDraftLayout[this.selectedControlId].xPercent=c/window.innerWidth,this.currentDraftLayout[this.selectedControlId].yPercent=l/window.innerHeight},t=()=>{this.isDraggingControl&&(this.isDraggingControl=!1,this.activeDragElement=null,this.applyControlsLayout())};window.addEventListener(`pointermove`,t=>e(t.clientX,t.clientY,t)),window.addEventListener(`touchmove`,t=>{t.touches.length>0&&e(t.touches[0].clientX,t.touches[0].clientY,t)},{passive:!1}),window.addEventListener(`pointerup`,t),window.addEventListener(`touchend`,t),window.addEventListener(`pointercancel`,t),window.addEventListener(`touchcancel`,t)}setupVirtualJoystick(){let e=document.getElementById(`virtual-joystick-container`);if(!e)return;let t=e=>{if(!this.isCustomizingControls){e.preventDefault(),e.stopPropagation(),this.joystickTouchId!==null&&(Array.from(e.touches).some(e=>e.identifier===this.joystickTouchId)||(this.joystickTouchId=null,this.resetJoystick()));for(let t=0;t<e.changedTouches.length;t++){let n=e.changedTouches[t];if(this.joystickTouchId===null){this.joystickTouchId=n.identifier,this.callbacks.onJoystickTouchState?.(n.identifier);let e=this.joystickBase.getBoundingClientRect();this.joystickCenter={x:e.left+e.width/2,y:e.top+e.height/2},this.joystickRadius=Math.max(35,e.width/2*.85),this.updateJoystickPosition(n.clientX,n.clientY);break}}}},n=e=>{if(!(this.isCustomizingControls||this.joystickTouchId===null)){for(let t=0;t<e.changedTouches.length;t++){let n=e.changedTouches[t];if(n.identifier===this.joystickTouchId){e.preventDefault(),e.stopPropagation(),this.updateJoystickPosition(n.clientX,n.clientY);return}}Array.from(e.touches).some(e=>e.identifier===this.joystickTouchId)||(this.joystickTouchId=null,this.resetJoystick())}},r=e=>{if(this.joystickTouchId!==null){for(let t=0;t<e.changedTouches.length;t++)if(e.changedTouches[t].identifier===this.joystickTouchId){e.preventDefault(),e.stopPropagation(),this.joystickTouchId=null,this.resetJoystick();return}e.touches.length===0&&(this.joystickTouchId=null,this.resetJoystick())}};e.addEventListener(`touchstart`,t,{passive:!1}),window.addEventListener(`touchmove`,n,{passive:!1}),window.addEventListener(`touchend`,r,{passive:!1}),window.addEventListener(`touchcancel`,r,{passive:!1});let i=!1;e.addEventListener(`mousedown`,e=>{if(this.isCustomizingControls)return;e.stopPropagation(),i=!0;let t=this.joystickBase.getBoundingClientRect();this.joystickCenter={x:t.left+t.width/2,y:t.top+t.height/2},this.joystickRadius=Math.max(35,t.width/2*.85),this.updateJoystickPosition(e.clientX,e.clientY)}),window.addEventListener(`mousemove`,e=>{i&&!this.isCustomizingControls&&this.updateJoystickPosition(e.clientX,e.clientY)}),window.addEventListener(`mouseup`,()=>{i&&(i=!1,this.resetJoystick())})}handleOrientationOrResize(){try{window.screen?.orientation&&`lock`in window.screen.orientation&&window.screen.orientation.lock(`landscape`).catch(()=>{})}catch{}let e=/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)||window.matchMedia&&window.matchMedia(`(pointer: coarse)`).matches||window.innerWidth<768,t=window.innerHeight>window.innerWidth,n=document.getElementById(`portrait-rotate-prompt`);n&&(n.style.display=e&&t?`flex`:`none`),this.editorOrientationBadge&&(this.editorOrientationBadge.textContent=`🖥️ Landscape 16:9 (أفقي)`),this.applyControlsLayout(`landscape`)}updateJoystickPosition(e,t){let n=e-this.joystickCenter.x,r=t-this.joystickCenter.y,i=Math.sqrt(n*n+r*r),a=this.joystickRadius||55,o=Math.min(i,a),s=Math.atan2(r,n),c=Math.cos(s)*o,l=Math.sin(s)*o;this.joystickKnob.style.transform=`translate(${c}px, ${l}px)`;let u=0,d=0;if(i>4){let e=Math.min(1,(i-4)/(a-4));u=Math.cos(s)*e,d=-Math.sin(s)*e,this.isAutoRunning&&d<-.45&&(this.isAutoRunning=!1,this.updateAutoRunUI(!1),this.callbacks.onTouchSprintState?.(!1))}let f=o>=a*.92;this.callbacks.onTouchMove(u,d,f)}resetAllTouchStates(){this.joystickTouchId=null,this.sprintTouchId=null,this.sprintPointerId=null,this.isSprintHeld=!1,this.resetJoystick()}resetJoystick(){this.joystickKnob&&(this.joystickKnob.style.transform=`translate(0px, 0px)`),this.callbacks.onTouchMove(0,0,!1),this.callbacks.onJoystickTouchState?.(null)}syncModalOpenState(){this.isModalOpen=!!this.root.querySelector(`.modal-overlay.open:not(#pause-modal)`)}closeAllModals(e=!1){this.root.querySelectorAll(`.modal-overlay.open`).forEach(t=>{e&&t.id===`pause-modal`||t.classList.remove(`open`)}),e||(this.isPaused=!1),this.onDialogueOptionSelectedCallback=null,this.onDeathReviveCallback=null,this.syncModalOpenState()}showHUD(){this.closeAllModals(!1),this.resetAllTouchStates(),this.titleScreen.classList.add(`hidden`),this.inGameHUD.classList.remove(`hidden`),this.applyControlsLayout(`landscape`)}showTitleScreen(){this.closeAllModals(!1),this.resetAllTouchStates(),this.isAutoRunning=!1,this.updateAutoRunUI(!1),this.callbacks.onTouchSprintState?.(!1),this.titleScreen.classList.remove(`hidden`),this.inGameHUD.classList.add(`hidden`)}setContinueBadge(e,t){e&&t!==void 0?(this.continueStatus.textContent=`${t}/7 Echoes`,this.continueStatus.style.display=`inline-block`):(this.continueStatus.textContent=`Start`,this.continueStatus.style.display=`inline-block`)}showToast(e){this.toastNotification.textContent=e,this.toastNotification.classList.add(`show`),setTimeout(()=>{this.toastNotification.classList.remove(`show`)},2500)}openSettingsModal(){this.resetAllTouchStates(),this.settingsModal.classList.add(`open`),this.syncModalOpenState()}closeSettingsModal(){this.settingsModal.classList.remove(`open`),this.syncModalOpenState()}setSoundIcon(e){e?this.soundBtn.innerHTML=`
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
          <line x1="23" y1="9" x2="17" y2="15"></line>
          <line x1="17" y1="9" x2="23" y2="15"></line>
        </svg>
      `:this.soundBtn.innerHTML=`
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
          <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"></path>
        </svg>
      `}updateCrystalProgress(e){let t=document.getElementById(`crystal-count-text`);t&&(t.textContent=`${e} / 7`);let n=this.crystalSlotsContainer.children;for(let t=0;t<n.length;t++){let r=n[t];t<e?(r.classList.add(`active`),r.style.backgroundColor=r.dataset.color||`#00f5d4`,r.style.color=r.dataset.color||`#00f5d4`,r.style.borderColor=r.dataset.color||`#00f5d4`):(r.classList.remove(`active`),r.style.backgroundColor=`rgba(255, 255, 255, 0.05)`,r.style.borderColor=`rgba(255, 255, 255, 0.25)`)}}updateShardProgress(e,t=10){if(this.shardCountText&&(this.shardCountText.textContent=`${e} / ${t}`),this.shardProgressFill){let n=Math.min(100,e/t*100);this.shardProgressFill.style.width=`${n}%`}}showTargetInteractPrompt(e){let t=document.getElementById(`interact-label`),n=this.touchInteractBtn;if(e){if(this.interactPrompt.classList.add(`visible`),t&&(t.textContent=`${e.actionEn} · ${e.actionAr} (${e.titleAr})`),n){n.style.borderColor=`#fee440`,n.style.boxShadow=`0 0 16px rgba(254, 228, 64, 0.7)`;let t=n.querySelector(`span:first-child`),r=n.querySelector(`span:last-child`);e.type===`shard`?(t&&(t.textContent=`SHARD`),r&&(r.textContent=`شظية`)):e.type===`inscription`?(t&&(t.textContent=`READ`),r&&(r.textContent=`اقرأ`)):e.type===`door`?(t&&(t.textContent=`GATE`),r&&(r.textContent=`بوابة`)):e.type===`portal`?(t&&(t.textContent=`PORTAL`),r&&(r.textContent=`عتبة`)):(t&&(t.textContent=`ECHO`),r&&(r.textContent=`تواصل`))}}else if(this.interactPrompt.classList.remove(`visible`),n){n.style.borderColor=`rgba(0, 245, 212, 0.55)`,n.style.boxShadow=`0 4px 18px rgba(0, 0, 0, 0.5)`;let e=n.querySelector(`span:first-child`),t=n.querySelector(`span:last-child`);e&&(e.textContent=`ECHO`),t&&(t.textContent=`تواصل`)}}showInteractPrompt(e){e&&!e.collected?this.showTargetInteractPrompt({id:e.id,type:`crystal`,titleAr:e.nameAr,titleEn:e.nameEn,actionAr:`تواصل مع صدى البلورة`,actionEn:`Commune with Echo Crystal`,pos:e.pos,dist:0}):this.showTargetInteractPrompt(null)}openLoreModal(e){this.resetAllTouchStates(),this.loreTitleAr.textContent=e.nameAr,this.loreTitleEn.textContent=e.nameEn,this.loreLocation.textContent=`${e.locationEn} · ${e.locationAr}`,this.loreTextAr.textContent=e.memoryAr,this.loreTextEn.textContent=e.memoryEn,this.loreModal.classList.add(`open`),this.syncModalOpenState()}closeLoreModal(){this.loreModal.classList.remove(`open`),this.syncModalOpenState()}openInscriptionModal(e){this.resetAllTouchStates(),this.inscriptionTitleAr.textContent=e.titleAr,this.inscriptionTitleEn.textContent=e.titleEn,this.inscriptionGlyph.textContent=e.glyph,this.inscriptionLocation.textContent=`${e.locationEn} · ${e.locationAr}`,this.inscriptionTextAr.textContent=e.contentAr,this.inscriptionTextEn.textContent=e.contentEn,this.inscriptionModal.classList.add(`open`),this.syncModalOpenState()}closeInscriptionModal(){this.inscriptionModal.classList.remove(`open`),this.syncModalOpenState()}openVictoryModal(){this.resetAllTouchStates(),this.victoryModal.classList.add(`open`),this.syncModalOpenState()}openWorldMemoryModal(e){let t=document.getElementById(`memory-archetype-ar`),n=document.getElementById(`memory-archetype-en`),r=document.getElementById(`memory-resonance-level`);t&&(t.textContent=e.archetypeAr),n&&(n.textContent=e.archetypeEn),r&&(r.textContent=`Rank ${e.worldResonanceLevel} · المرتبة ${e.worldResonanceLevel}`);let i=document.getElementById(`stat-play-time`);if(i){let t=Math.floor(e.totalPlayTimeSec/60),n=Math.floor(e.totalPlayTimeSec%60);i.textContent=`${t.toString().padStart(2,`0`)}:${n.toString().padStart(2,`0`)}`}let a=document.getElementById(`stat-sprint-dist`);a&&(a.textContent=`${Math.round(e.sprintDistanceMeters)} m (${e.sprintCount}x)`);let o=document.getElementById(`stat-zones-count`);o&&(o.textContent=`${e.zonesVisited.length} / 8`);let s=document.getElementById(`stat-secrets-count`);s&&(s.textContent=`${e.secretsFound.length}`);let c=document.getElementById(`manifestations-list`);c&&(c.innerHTML=[{key:`elder_tree_heart`,titleAr:`يقظة قلب شجرة الخلود العتيقة`,titleEn:`Heart of the Colossal Elder Tree`,descAr:`استيقظت النواة السماوية الزرقاء في جذع الشجرة وتفتحت أزهار الأثير الضوئية.`,descEn:`The radiant cyan ocular vortex inside the elder trunk pulses with ancient lifeforce.`},{key:`crystalline_bridge`,titleAr:`المسار البلوري فوق بحيرة الضياء`,titleEn:`Secret Crystalline Lake Bridge`,descAr:`برزت أحجار سحرية عائمة تمكّن من عبور البحيرة دون الغرق نحو الكهوف السرية.`,descEn:`Ethereal floating stones raised from the radiant depths, paving a hidden path.`},{key:`forest_spirit`,titleAr:`طيف وعائل الغابة الروحي`,titleEn:`Slumbering Forest Spirit Stag`,descAr:`استيقظ حارس الصنوبر الأثيري وقرونه المتوهجة لحراسة خطواتك السريعة.`,descEn:`The celestial guardian awakened by your vigorous pace through the woods.`},{key:`temple_deep_runes`,titleAr:`نقوش أرضية المعبد الغائرة`,titleEn:`Sanctuary Deep Floor Runes`,descAr:`توهجت رموز البنّائين الأوائل الذهبية في أرضية رواق المعبد العتيق.`,descEn:`Hidden sacred glyphs illuminated upon repeated reverence to the sanctuary.`},{key:`celestial_aurora`,titleAr:`شفق الجزيرة الكوني المتلألئ`,titleEn:`Celestial Island Aurora`,descAr:`تموجات أثيرية تضيء سماء الجزيرة المنسية تعبيراً عن تناغم الأصداء.`,descEn:`Shimmering celestial ribbons dancing across the mystic atmosphere.`}].map(t=>{let n=!!e.manifestations[t.key];return`
            <div style="background: ${n?`rgba(0, 245, 212, 0.08)`:`rgba(0, 0, 0, 0.35)`}; border: 1px solid ${n?`rgba(0, 245, 212, 0.35)`:`rgba(255, 255, 255, 0.08)`}; border-radius: 12px; padding: 0.65rem 0.85rem; display: flex; justify-content: space-between; align-items: center; gap: 0.8rem;">
              <div style="flex: 1;">
                <div style="display: flex; align-items: center; gap: 0.5rem; margin-bottom: 0.15rem;">
                  <span style="font-weight: 700; color: ${n?`#ffffff`:`#728994`}; font-size: 0.95rem;">${t.titleAr} · ${t.titleEn}</span>
                </div>
                <div style="font-size: 0.78rem; color: ${n?`#95d5d8`:`#576f7a`}; line-height: 1.3;">
                  ${n?t.descAr:`لا تزال هذه القوة نائمة في العالم... استكشف الجزيرة لتوقظها.`}
                </div>
              </div>
              <div style="font-size: 0.75rem; font-weight: 800; padding: 0.25rem 0.6rem; border-radius: 9999px; white-space: nowrap; ${n?`background: rgba(0, 245, 212, 0.2); color: #00f5d4; border: 1px solid rgba(0, 245, 212, 0.5); box-shadow: 0 0 10px rgba(0, 245, 212, 0.3);`:`background: rgba(255, 255, 255, 0.05); color: #58717d; border: 1px solid rgba(255, 255, 255, 0.1);`}">
                ${n?`✦ AWAKENED · مستيقظ`:`🔒 DORMANT · نائم`}
              </div>
            </div>
          `}).join(``));let l=document.getElementById(`biome-breakdown-list`);if(l){let t=Object.keys(od),n=Math.max(1,e.totalPlayTimeSec);l.innerHTML=t.map(t=>{let r=od[t],i=e.biomeTimeSec[t]||0,a=Math.min(100,Math.round(i/n*100)),o=Math.floor(i/60),s=Math.floor(i%60);return`
            <div style="background: rgba(0, 0, 0, 0.25); border-radius: 8px; padding: 0.4rem 0.65rem; border: 1px solid rgba(255, 255, 255, 0.05);">
              <div style="display: flex; justify-content: space-between; align-items: center; font-size: 0.78rem; margin-bottom: 0.25rem;">
                <span style="color: ${r.color}; font-weight: 700;">${r.nameAr} · ${r.nameEn}</span>
                <span style="color: #ccd7e0; font-family: monospace;">${o}m ${s}s (${a}%)</span>
              </div>
              <div style="height: 5px; width: 100%; background: rgba(255, 255, 255, 0.07); border-radius: 9999px; overflow: hidden;">
                <div style="height: 100%; width: ${a}%; background: ${r.color}; border-radius: 9999px; transition: width 0.3s ease;"></div>
              </div>
            </div>
          `}).join(``)}this.resetAllTouchStates(),this.worldMemoryModal.classList.add(`open`),this.syncModalOpenState()}closeWorldMemoryModal(){this.worldMemoryModal.classList.remove(`open`),this.syncModalOpenState()}openMultiplayerModal(){this.resetAllTouchStates(),this.updateMultiplayerModalContent(),this.multiplayerModal.classList.add(`open`),this.syncModalOpenState()}closeMultiplayerModal(){this.multiplayerModal.classList.remove(`open`),this.syncModalOpenState()}updateMultiplayerModalContent(){let e=this.callbacks.getMultiplayerCoordinator?.();if(!e)return;let t=e.account.getProfile(),n=e.party.getParty(),r=document.getElementById(`mp-player-name-input`);r&&(r.value=t.username);let i=document.getElementById(`mp-player-uuid-text`);i&&(i.textContent=t.id);let a=document.getElementById(`mp-party-code-badge`);a&&n&&(a.textContent=`CODE: ${n.passCode}`);let o=document.getElementById(`mp-slot-1-name`);o&&(o.textContent=`${t.username} (Leader)`);let s=document.getElementById(`mp-shared-objective-text`);s&&n&&(s.textContent=n.sharedObjectiveAr),document.querySelectorAll(`.mp-class-btn`).forEach(e=>{e.getAttribute(`data-class`)===t.characterClass?(e.style.borderColor=`#00f5d4`,e.style.background=`rgba(0, 245, 212, 0.12)`):(e.style.borderColor=`rgba(255, 255, 255, 0.12)`,e.style.background=`rgba(255, 255, 255, 0.04)`)})}handleEscapeKey(e=!0){this.isCustomizingControls?this.exitControlsEditMode(!1):this.settingsModal?.classList.contains(`open`)?this.closeSettingsModal():this.multiplayerModal?.classList.contains(`open`)?this.closeMultiplayerModal():this.worldMemoryModal?.classList.contains(`open`)?this.closeWorldMemoryModal():this.questLogModal?.classList.contains(`open`)?this.closeQuestLogModal():this.npcDialogueModal?.classList.contains(`open`)?this.closeNPCDialogue():this.storyNarrativeModal?.classList.contains(`open`)?this.closeStoryNarrativeModal():this.loreModal?.classList.contains(`open`)?this.closeLoreModal():this.inscriptionModal?.classList.contains(`open`)?this.closeInscriptionModal():this.victoryModal?.classList.contains(`open`)?(this.victoryModal.classList.remove(`open`),this.syncModalOpenState()):this.deathModal?.classList.contains(`open`)||e&&this.togglePause()}togglePause(){this.isPaused=!this.isPaused,this.isPaused?(this.resetAllTouchStates(),this.pauseModal.classList.add(`open`)):(this.pauseModal.classList.remove(`open`),this.syncModalOpenState()),this.callbacks.onPauseToggle()}getIsModalOrPaused(){let e=!!this.root.querySelector(`.modal-overlay.open:not(#pause-modal)`);return this.isModalOpen!==e&&(this.isModalOpen=e),e||this.isPaused||this.isCustomizingControls}renderMinimap(e,t,n,r,i,a,o,s,c){let l=this.minimapCanvas.getContext(`2d`);if(!l)return;let u=this.minimapCanvas.width,d=this.minimapCanvas.height,f=u/2,p=d/2,m=.42;l.clearRect(0,0,u,d),l.save(),l.translate(f,p),l.rotate(-n),l.strokeStyle=`rgba(0, 245, 212, 0.3)`,l.lineWidth=1.5,l.beginPath(),l.arc(-e*m,-t*m,1050*m,0,Math.PI*2),l.stroke(),l.fillStyle=`rgba(0, 245, 212, 0.35)`,l.beginPath(),l.arc(-e*m,(-15-t)*m,36*m,0,Math.PI*2),l.fill(),l.fillStyle=`#82848c`,l.fillRect((-85-e)*m-3,(25-t)*m-3,6,6),l.fillStyle=`#00ffff`,l.fillRect((95-e)*m-4,(-30-t)*m-4,8,8),c&&c.forEach(n=>{let r=(n.x-e)*m,i=(n.z-t)*m,a=n.style===`large`?6:n.style===`medium`?4.5:3.5;l.fillStyle=n.style===`large`?`#c89666`:`#b07d4f`,l.fillRect(r-a/2,i-a/2,a,a),l.strokeStyle=`#5a3818`,l.lineWidth=1,l.beginPath(),l.moveTo(r-a/2,i),l.lineTo(r+a/2,i),l.stroke(),l.fillStyle=`#ff7722`,l.beginPath(),l.arc(r,i,1.2,0,Math.PI*2),l.fill()}),i&&i.forEach(n=>{if(n.collected)return;let r=(n.pos.x-e)*m,i=(n.pos.z-t)*m;l.fillStyle=`#fee440`,l.beginPath(),l.arc(r,i,2.2,0,Math.PI*2),l.fill()}),r.forEach(n=>{if(n.collected)return;let r=(n.pos.x-e)*m,i=(n.pos.z-t)*m;l.fillStyle=`#`+n.color.toString(16).padStart(6,`0`),l.beginPath(),l.arc(r,i,3.5,0,Math.PI*2),l.fill()}),a&&a.forEach(n=>{let r=(n.pos.x-e)*m,i=(n.pos.z-t)*m;n.type===`WANDERER`?(l.fillStyle=`#00f5d4`,l.beginPath(),l.arc(r,i,4,0,Math.PI*2),l.fill()):n.type===`GUARDIAN`?(l.fillStyle=`#9b5de5`,l.fillRect(r-3.5,i-3.5,7,7)):(l.fillStyle=`#5eead4`,l.beginPath(),l.arc(r,i,2.5,0,Math.PI*2),l.fill())}),o&&o.forEach(n=>{let r=(n.pos.x-e)*m,i=(n.pos.z-t)*m;l.fillStyle=`#ff3366`,l.beginPath(),l.arc(r,i,3.2,0,Math.PI*2),l.fill(),l.strokeStyle=`#ff758f`,l.lineWidth=1,l.stroke()}),s&&s.forEach(n=>{let r=(n.pos.x-e)*m,i=(n.pos.z-t)*m;l.fillStyle=`#00f5d4`,l.beginPath(),l.arc(r,i,4.2,0,Math.PI*2),l.fill(),l.strokeStyle=`#ffffff`,l.lineWidth=1.5,l.stroke()}),l.restore(),l.fillStyle=`#ffffff`,l.beginPath(),l.moveTo(f,p-6),l.lineTo(f-4,p+5),l.closePath(),l.fill()}updateCombatStats(e){if(this.playerHpBarFill&&this.playerHpText){let t=Math.max(0,Math.min(100,e.hp/e.maxHp*100));this.playerHpBarFill.style.width=`${t}%`,this.playerHpText.textContent=`${Math.ceil(e.hp)} / ${e.maxHp} HP`,t<=30?this.playerHpBarFill.classList.add(`low`):this.playerHpBarFill.classList.remove(`low`)}if(this.playerEnergyBarFill&&this.playerEnergyText){let t=Math.max(0,Math.min(100,e.energy/e.maxEnergy*100));this.playerEnergyBarFill.style.width=`${t}%`,this.playerEnergyText.textContent=`${Math.ceil(e.energy)} / ${e.maxEnergy}`,e.energy>=40?this.playerEnergyBarFill.classList.add(`pulse-ready`):this.playerEnergyBarFill.classList.remove(`pulse-ready`)}}showHurtEffect(){this.hurtVignetteOverlay&&(this.hurtVignetteOverlay.classList.add(`active`),setTimeout(()=>{this.hurtVignetteOverlay.classList.remove(`active`)},220))}openDeathModal(e){this.resetAllTouchStates(),this.onDeathReviveCallback=e,this.deathModal&&this.deathModal.classList.add(`open`),this.syncModalOpenState()}closeDeathModal(){this.deathModal&&this.deathModal.classList.remove(`open`),this.syncModalOpenState(),this.onDeathReviveCallback=null}openNPCDialogue(e,t){this.npcDialogueModal&&(this.resetAllTouchStates(),this.onDialogueOptionSelectedCallback=t,this.npcPortraitImg.src=e.portraitUrl,this.npcTitleBadge.textContent=`${e.titleAr} · ${e.titleEn}`,this.npcNameAr.textContent=e.speakerNameAr,this.npcNameEn.textContent=e.speakerNameEn,this.npcDialogueMessageAr.textContent=e.messageAr,this.npcDialogueMessageEn.textContent=e.messageEn,this.npcDialogueOptionsContainer.innerHTML=``,e.options.forEach(e=>{let t=document.createElement(`button`);t.className=`modal-btn interactive`,t.style.cssText=`
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 100%;
        padding: 0.75rem 1.1rem;
        background: rgba(0, 245, 212, 0.08);
        border: 1.5px solid rgba(0, 245, 212, 0.35);
        border-radius: 10px;
        color: #ffffff;
        cursor: pointer;
        transition: all 0.2s ease;
        text-align: right;
        direction: rtl;
      `,t.innerHTML=`
        <div style="display: flex; flex-direction: column; gap: 0.15rem; flex: 1;">
          <span style="font-family: 'Amiri', serif; font-size: 1.15rem; color: #e0fbf6;">${e.textAr}</span>
          <span style="font-size: 0.78rem; color: #80ffea; direction: ltr; text-align: left;">${e.textEn}</span>
        </div>
        <span style="font-size: 1.1rem; color: #00f5d4; margin-right: 0.75rem;">❮</span>
      `,t.addEventListener(`mouseenter`,()=>{t.style.background=`rgba(0, 245, 212, 0.22)`,t.style.borderColor=`#00f5d4`,t.style.transform=`translateX(-4px)`}),t.addEventListener(`mouseleave`,()=>{t.style.background=`rgba(0, 245, 212, 0.08)`,t.style.borderColor=`rgba(0, 245, 212, 0.35)`,t.style.transform=`translateX(0)`}),t.addEventListener(`click`,()=>{this.onDialogueOptionSelectedCallback&&this.onDialogueOptionSelectedCallback(e)}),this.npcDialogueOptionsContainer.appendChild(t)}),this.npcDialogueModal.classList.add(`open`),this.syncModalOpenState())}closeNPCDialogue(){this.npcDialogueModal&&this.npcDialogueModal.classList.remove(`open`),this.syncModalOpenState(),this.onDialogueOptionSelectedCallback=null}isNPCDialogueOpen(){return this.npcDialogueModal?this.npcDialogueModal.classList.contains(`open`):!1}updateQuestTracker(e,t){if(this.questCluster){if(this.questChapterBadge&&(this.questChapterBadge.innerHTML=`<span>✦ CHAPTER ${e.chapter===1?`I`:`II`}</span><span style="opacity: 0.65;">·</span><span>${e.chapter===1?`المهمة الأولى`:`المهمة الثانية`}</span>`),this.questTitleText&&(this.questTitleText.textContent=`${e.titleEn} · ${e.titleAr}`),t){let n=[`١`,`٢`,`٣`,`٤`,`٥`,`٦`,`٧`],r=n[e.objectives.length-1]||`${e.objectives.length}`,i=e.objectives.findIndex(e=>e.id===t.id),a=n[i]||`${i+1}`;if(this.questObjectiveBadge&&(this.questObjectiveBadge.textContent=`${a} / ${r}`),this.questObjectiveTitleAr&&(this.questObjectiveTitleAr.textContent=t.titleAr),this.questObjectiveTitleEn&&(this.questObjectiveTitleEn.textContent=t.titleEn),this.questObjectiveHint&&(this.questObjectiveHint.innerHTML=`<span>📍</span><span>${t.hintAr}</span>`),this.questProgressText&&this.questProgressBar){if(t.targetCount>1){let e=t.id===`explore_island`?`m`:``;this.questProgressText.textContent=`${t.currentCount} / ${t.targetCount}${e}`;let n=Math.min(100,Math.round(t.currentCount/t.targetCount*100));this.questProgressBar.style.width=`${n}%`,this.questProgressBar.style.display=`block`}else this.questProgressText.textContent=t.isCompleted?`مكتمل ✓`:`قيد التنفيذ ✦`,this.questProgressBar.style.width=t.isCompleted?`100%`:`20%`}}else this.questObjectiveBadge&&(this.questObjectiveBadge.textContent=`✓`),this.questObjectiveTitleAr&&(this.questObjectiveTitleAr.textContent=`اكتملت جميع أهداف المهمة!`),this.questObjectiveTitleEn&&(this.questObjectiveTitleEn.textContent=`All Objectives Completed!`),this.questProgressText&&(this.questProgressText.textContent=`100%`),this.questProgressBar&&(this.questProgressBar.style.width=`100%`),this.questObjectiveHint&&(this.questObjectiveHint.innerHTML=`<span>🌟</span><span>الذاكرة مستيقظة بالكامل · The World Remembers</span>`)}}showObjectiveCompleteBanner(e,t){this.objectiveCompleteBanner&&(this.objectiveCompleteTitle&&(this.objectiveCompleteTitle.textContent=`${e.titleAr} · ${e.titleEn}`),this.objectiveCompleteNext&&(t?this.objectiveCompleteNext.innerHTML=`<span>الهدف التالي المفتوح:</span> <strong style="color: #fee440;">${t.titleAr}</strong>`:this.objectiveCompleteNext.innerHTML=`<span style="color: #00f5d4; font-weight: 800;">🎉 اكتملت مهمة الذاكرة الأولى بالكامل!</span>`),this.objectiveCompleteBanner.classList.add(`show`),setTimeout(()=>{this.objectiveCompleteBanner.classList.remove(`show`)},4500))}openStoryNarrativeModal(e){this.storyNarrativeModal&&(this.storyNarrativeBadge&&(this.storyNarrativeBadge.textContent=`${e.badgeAr} · ${e.badgeEn}`),this.storyNarrativeTitleAr&&(this.storyNarrativeTitleAr.textContent=e.titleAr),this.storyNarrativeTitleEn&&(this.storyNarrativeTitleEn.textContent=e.titleEn),this.storyNarrativeContentAr&&(this.storyNarrativeContentAr.textContent=e.contentAr),this.storyNarrativeContentEn&&(this.storyNarrativeContentEn.textContent=e.contentEn),this.storyNarrativeQuoteAr&&(this.storyNarrativeQuoteAr.textContent=e.quoteAr||`«هذا العالم يحفظ كل خطوة تخطوها.»`),this.resetAllTouchStates(),this.storyNarrativeModal.classList.add(`open`),this.syncModalOpenState())}closeStoryNarrativeModal(){this.storyNarrativeModal&&this.storyNarrativeModal.classList.remove(`open`),this.syncModalOpenState()}openQuestLogModal(e){this.questLogModal&&(this.resetAllTouchStates(),this.renderQuestLog(e),this.questLogModal.classList.add(`open`),this.syncModalOpenState())}closeQuestLogModal(){this.questLogModal&&this.questLogModal.classList.remove(`open`),this.syncModalOpenState()}renderQuestLog(e){if(!this.questLogList)return;let t=e.getActiveQuest(),n=t.objectives.filter(e=>e.isCompleted).length,r=[`١`,`٢`,`٣`,`٤`,`٥`],i=document.getElementById(`quest-log-progress-badge`);i&&(i.textContent=`${r[n]||`${n}`} / ${r[t.objectives.length-1]||`${t.objectives.length}`} مكتمل`),this.questLogList.innerHTML=t.objectives.map((e,t)=>{let n=r[t]||`${t+1}`,i=e.isUnlocked&&!e.isCompleted,a=e.isCompleted?`completed`:i?`active`:`locked`,o=e.isCompleted?`✓`:i?`✦`:`🔒`,s=e.isCompleted?`done`:i?`current`:`lock`,c=``;if(e.isCompleted)c=`<span style="color: #00f5d4; font-weight: 800; font-size: 0.78rem;">مكتمل ✓ Completed</span>`;else if(i){if(e.targetCount>1){let t=e.id===`explore_island`?`m`:``;c=`<span style="color: #fee440; font-weight: 800; font-size: 0.78rem;">قيد الإنجاز (${e.currentCount}/${e.targetCount}${t})</span>`}else c=`<span style="color: #fee440; font-weight: 800; font-size: 0.78rem;">الهدف النشط الحالي ✦ Active</span>`}else c=`<span style="color: #728994; font-size: 0.75rem;">مقفل · يفتح بعد إكمال السابق 🔒</span>`;return`
          <div class="quest-checklist-item ${a}">
            <div class="quest-status-icon ${s}">${o}</div>
            <div style="flex: 1; text-align: right; direction: rtl;">
              <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.2rem;">
                <div style="font-family: 'Amiri', serif; font-size: 1.25rem; font-weight: 700; color: ${e.isCompleted?`#00f5d4`:i?`#ffffff`:`#728994`};">
                  ${n}. ${e.titleAr}
                </div>
                ${c}
              </div>
              <div style="font-size: 0.8rem; color: #80ffea; margin-bottom: 0.35rem; direction: ltr; text-align: left;">
                ${e.titleEn}
              </div>
              <div style="font-size: 0.85rem; color: ${i?`#e4f7f4`:`#94a7b0`}; line-height: 1.45;">
                ${e.descAr}
              </div>
              ${i?`<div style="font-size: 0.78rem; color: #fee440; background: rgba(254, 228, 64, 0.1); border-right: 2px solid #fee440; padding: 0.3rem 0.6rem; border-radius: 4px; margin-top: 0.4rem;">
                      📍 إرشاد: ${e.hintAr}
                    </div>`:``}
            </div>
          </div>
        `}).join(``)}},xd=class{constructor(e,t,n,r){this.terrain=e,this.nameAr=`طيف الخشب الفاسد`,this.nameEn=`Corrupted Wood Wraith`,this.hp=120,this.maxHp=120,this.isDead=!1,this.state=`PATROL`,this.patrolRadius=16,this.stateTimer=0,this.attackCooldown=0,this.particles=[],this._scratchA=new W,this._scratchB=new W,this.hurtTimer=0,this.id=`wraith_${r}`,this.anchorPos=new W(t,0,n),this.targetPatrolPos=this.anchorPos.clone(),this.group=new K,this.group.name=`CorruptedWraith_${r}`,this.defaultBarkMat=new Z({color:2234901,roughness:.95,metalness:.1});let i=new Z({color:4004915,roughness:.85}),a=new Z({color:11032055,emissive:9647082,emissiveIntensity:2.2,roughness:.2});this.flashMat=new qr({color:16777215});let o=new X(.35,.52,1.6,8);this.bodyMesh=new J(o,this.defaultBarkMat),this.bodyMesh.position.y=1.35,this.bodyMesh.castShadow=!0,this.group.add(this.bodyMesh);let s=new Fi(.48,.9,8);s.rotateX(.2),this.crownWood=new J(s,this.defaultBarkMat),this.crownWood.position.set(0,2.35,.1),this.crownWood.castShadow=!0,this.group.add(this.crownWood);let c=new ao(.045,8,8);this.eyeLeft=new J(c,a),this.eyeLeft.position.set(-.12,2.2,.32),this.eyeRight=new J(c,a),this.eyeRight.position.set(.12,2.2,.32),this.group.add(this.eyeLeft,this.eyeRight);let l=new no(.16,0);this.chestCore=new J(l,a),this.chestCore.position.set(0,1.45,.32),this.group.add(this.chestCore),this.coreLight=new qu(11032055,2,6),this.coreLight.position.set(0,1.45,.4),this.group.add(this.coreLight);let u=new X(.08,.14,1.4,6),d=new Fi(.07,.65,5);d.rotateX(Math.PI/2),this.leftArmGroup=new K,this.leftArmGroup.position.set(-.55,1.85,0);let f=new J(u,this.defaultBarkMat);f.position.y=-.65,f.castShadow=!0,this.leftArmGroup.add(f),this.leftClaw=new J(d,i),this.leftClaw.position.set(0,-1.35,.25),this.leftArmGroup.add(this.leftClaw),this.group.add(this.leftArmGroup),this.rightArmGroup=new K,this.rightArmGroup.position.set(.55,1.85,0);let p=new J(u,this.defaultBarkMat);p.position.y=-.65,p.castShadow=!0,this.rightArmGroup.add(p),this.rightClaw=new J(d,i),this.rightClaw.position.set(0,-1.35,.25),this.rightArmGroup.add(this.rightClaw),this.group.add(this.rightArmGroup);let m=new X(.12,.09,1.1,6);this.leftLeg=new K,this.leftLeg.position.set(-.25,.6,0);let h=new J(m,this.defaultBarkMat);h.position.y=-.55,h.castShadow=!0,this.leftLeg.add(h),this.group.add(this.leftLeg),this.rightLeg=new K,this.rightLeg.position.set(.25,.6,0);let g=new J(m,this.defaultBarkMat);g.position.y=-.55,g.castShadow=!0,this.rightLeg.add(g),this.group.add(this.rightLeg);let _=new Li(.035,0);for(let e=0;e<4;e++){let e=new J(_,a);this.particles.push(e),this.group.add(e)}this.hpBarGroup=new K,this.hpBarGroup.position.set(0,2.9,0);let v=new J(new ro(1.2,.12),new qr({color:592139,side:2}));this.hpBarGroup.add(v);let y=new ro(1.16,.08);y.translate(.58,0,0);let b=new qr({color:14753096,side:2});this.hpFillMesh=new J(y,b),this.hpFillMesh.position.set(-.58,0,.005),this.hpBarGroup.add(this.hpFillMesh),this.group.add(this.hpBarGroup);let x=this.terrain.getHeightAt(t,n);this.group.position.set(t,x,n),this.pickPatrolTarget()}pickPatrolTarget(){let e=Math.random()*Math.PI*2,t=3+Math.random()*(this.patrolRadius-3);this.targetPatrolPos.set(this.anchorPos.x+Math.cos(e)*t,0,this.anchorPos.z+Math.sin(e)*t)}update(e,t,n,r){let i=0,a=!1;if(this.isDead)return this.group.position.y-=e*.4,this.group.scale.multiplyScalar(Math.max(0,1-e*1.5)),{attackDamage:0,hitPlayer:!1};this.hpBarGroup.lookAt(r),this.hurtTimer>0&&(this.hurtTimer-=e,this.hurtTimer<=0&&(this.bodyMesh.material=this.defaultBarkMat)),this.attackCooldown>0&&(this.attackCooldown-=e);let o=this.group.position.distanceTo(n);if(this.state===`PATROL`){if(o<15)this.state=`ALERT`,this.stateTimer=.6;else{this._scratchA.set(this.group.position.x,0,this.group.position.z);let n=this._scratchB.copy(this.targetPatrolPos).sub(this._scratchA);if(n.length()<.6)this.pickPatrolTarget();else{n.normalize(),this.group.position.x+=n.x*1.8*e,this.group.position.z+=n.z*1.8*e;let r=Math.atan2(n.x,n.z);this.smoothRotateY(r,3*e),this.leftLeg.rotation.x=Math.sin(t*4.5)*.45,this.rightLeg.rotation.x=-Math.sin(t*4.5)*.45,this.leftArmGroup.rotation.x=-Math.sin(t*4.5)*.35,this.rightArmGroup.rotation.x=Math.sin(t*4.5)*.35}}}else if(this.state===`ALERT`){this.stateTimer-=e;let t=this._scratchA.copy(n).sub(this.group.position);t.y=0,this.smoothRotateY(Math.atan2(t.x,t.z),6*e),this.leftArmGroup.rotation.x=H.lerp(this.leftArmGroup.rotation.x,-1.8,e*10),this.rightArmGroup.rotation.x=H.lerp(this.rightArmGroup.rotation.x,-1.8,e*10),this.crownWood.rotation.x=.4,this.stateTimer<=0&&(this.state=`CHASE`)}else if(this.state===`CHASE`){let r=this._scratchA.copy(n).sub(this.group.position);r.y=0;let i=r.length();if(i>28)this.state=`PATROL`,this.pickPatrolTarget();else if(i<=2.8&&this.attackCooldown<=0)this.state=`ATTACK_SLASH`,this.stateTimer=.55;else if(i>=5&&i<=11&&this.attackCooldown<=0&&Math.random()<.02)this.state=`ATTACK_LEAP`,this.stateTimer=.85;else{r.normalize();let n=5.4;this.group.position.x+=r.x*n*e,this.group.position.z+=r.z*n*e,this.smoothRotateY(Math.atan2(r.x,r.z),7*e),this.leftLeg.rotation.x=Math.sin(t*9)*.65,this.rightLeg.rotation.x=-Math.sin(t*9)*.65,this.leftArmGroup.rotation.x=-.5+Math.sin(t*9)*.45,this.rightArmGroup.rotation.x=-.5-Math.sin(t*9)*.45}}else if(this.state===`ATTACK_SLASH`){this.stateTimer-=e;let t=1-Math.max(0,this.stateTimer/.55);this.rightArmGroup.rotation.x=-2.2+t*3.6,this.rightArmGroup.rotation.z=-.4+Math.sin(t*Math.PI)*1.2,t>.45&&t<.65&&o<=3.2&&(i=18,a=!0),this.stateTimer<=0&&(this.state=`CHASE`,this.attackCooldown=1.2)}else if(this.state===`ATTACK_LEAP`){this.stateTimer-=e;let t=1-Math.max(0,this.stateTimer/.85),r=Math.sin(t*Math.PI)*2.8,s=this.terrain.getHeightAt(this.group.position.x,this.group.position.z);this.group.position.y=s+r;let c=this._scratchA.copy(n).sub(this.group.position);c.y=0,c.lengthSq()>.1&&(c.normalize(),this.group.position.x+=c.x*6.5*e,this.group.position.z+=c.z*6.5*e,this.smoothRotateY(Math.atan2(c.x,c.z),9*e)),this.leftArmGroup.rotation.x=-1.2+Math.sin(t*Math.PI)*1.8,this.rightArmGroup.rotation.x=-1.2+Math.sin(t*Math.PI)*1.8,t>.8&&t<.95&&o<=3.6&&(i=28,a=!0),this.stateTimer<=0&&(this.state=`CHASE`,this.attackCooldown=1.8)}else this.state===`HURT`&&(this.stateTimer-=e,this.bodyMesh.rotation.x=H.lerp(this.bodyMesh.rotation.x,-.45,e*14),this.stateTimer<=0&&(this.bodyMesh.rotation.x=0,this.state=`CHASE`));if(this.state!==`ATTACK_LEAP`){let e=this.terrain.getHeightAt(this.group.position.x,this.group.position.z);this.group.position.y=e}return this.chestCore.rotation.y=t*2,this.coreLight.intensity=1.8+Math.sin(t*5)*.6,this.particles.forEach((e,n)=>{let r=t*2.5+n*Math.PI/2;e.position.set(Math.cos(r)*.65,1.4+Math.sin(t*3.5+n)*.35,Math.sin(r)*.65)}),{attackDamage:i,hitPlayer:a}}takeDamage(e,t){if(this.isDead)return!1;this.hp=Math.max(0,this.hp-e),this.hurtTimer=.14,this.bodyMesh.material=this.flashMat,this.state=`HURT`,this.stateTimer=.35;let n=Math.max(0,this.hp/this.maxHp);return this.hpFillMesh.scale.x=n,t&&(this.group.position.x+=t.x*2.5,this.group.position.z+=t.z*2.5),this.hp<=0&&(this.isDead=!0,this.state=`DEAD`,this.coreLight.intensity=0,this.hpBarGroup.visible=!1,!0)}reset(){this.hp=this.maxHp,this.isDead=!1,this.state=`PATROL`,this.stateTimer=0,this.attackCooldown=0,this.hurtTimer=0,this.coreLight.intensity=2,this.bodyMesh.material=this.defaultBarkMat,this.bodyMesh.rotation.set(0,0,0),this.leftArmGroup.rotation.set(0,0,0),this.rightArmGroup.rotation.set(0,0,0),this.group.position.copy(this.anchorPos);let e=this.terrain.getHeightAt(this.anchorPos.x,this.anchorPos.z);this.group.position.y=e,this.hpFillMesh.scale.x=1,this.hpBarGroup.visible=!1,this.group.scale.set(1,1,1)}smoothRotateY(e,t){let n=e-this.group.rotation.y;for(;n<-Math.PI;)n+=Math.PI*2;for(;n>Math.PI;)n-=Math.PI*2;this.group.rotation.y+=n*Math.min(1,t)}},Sd=class{constructor(e,t,n){this.terrain=e,this.character=t,this.sound=n,this.enemies=[],this.playerHp=100,this.playerMaxHp=100,this.playerEnergy=100,this.playerMaxEnergy=100,this.isInvulnerable=!1,this.invulnerabilityTimer=0,this.enemiesDefeatedCount=0,this.isPulseActive=!1,this.pulseEffectTimer=0,this.maxSparks=60,this.group=new K,this.group.name=`CombatSystem`,[{x:-42,z:46},{x:-24,z:54},{x:-62,z:32},{x:-50,z:72}].forEach((e,t)=>{let n=new xd(this.terrain,e.x,e.z,t+1);this.enemies.push(n),this.group.add(n.group)});let r=new io(.2,.75,48);r.rotateX(-Math.PI/2);let i=new qr({color:62932,side:2,transparent:!0,opacity:0,blending:2});this.pulseShockwaveMesh=new J(r,i),this.group.add(this.pulseShockwaveMesh);let a=new ao(1,24,16),o=new qr({color:3718648,transparent:!0,opacity:0,blending:2,wireframe:!0});this.pulseSphereMesh=new J(a,o),this.group.add(this.pulseSphereMesh),this.pulseLight=new ts(62932,0,18),this.group.add(this.pulseLight),this.hitSparkPositions=new Float32Array(this.maxSparks*3),this.hitSparkVelocities=new Float32Array(this.maxSparks*3),this.hitSparkLife=new Float32Array(this.maxSparks);let s=new Fr;s.setAttribute(`position`,new br(this.hitSparkPositions,3));let c=new xi({color:6220500,size:.16,transparent:!0,opacity:.9,blending:2});this.hitSparks=new Ei(s,c),this.group.add(this.hitSparks)}update(e,t,n){this.invulnerabilityTimer>0&&(this.invulnerabilityTimer-=e,this.invulnerabilityTimer<=0&&(this.isInvulnerable=!1)),this.playerEnergy<this.playerMaxEnergy&&(this.playerEnergy=Math.min(this.playerMaxEnergy,this.playerEnergy+e*4));for(let r of this.enemies){if(r.isDead)continue;let{attackDamage:i,hitPlayer:a}=r.update(e,t,this.character.position,n);a&&i>0&&this.applyDamageToPlayer(i)}if(this.isPulseActive){this.pulseEffectTimer-=e;let t=1-Math.max(0,this.pulseEffectTimer/.65),n=t*11.5;this.pulseShockwaveMesh.scale.set(n,n,n),this.pulseShockwaveMesh.material.opacity=Math.sin(t*Math.PI)*.95,this.pulseSphereMesh.scale.set(n*.75,n*.75,n*.75),this.pulseSphereMesh.material.opacity=Math.sin(t*Math.PI)*.65,this.pulseLight.intensity=Math.sin(t*Math.PI)*8.5,this.pulseEffectTimer<=0&&(this.isPulseActive=!1,this.pulseShockwaveMesh.material.opacity=0,this.pulseSphereMesh.material.opacity=0,this.pulseLight.intensity=0)}let r=this.hitSparks.geometry.attributes.position,i=!1;for(let t=0;t<this.maxSparks;t++)this.hitSparkLife[t]>0?(this.hitSparkLife[t]-=e*2.5,this.hitSparkPositions[t*3+0]+=this.hitSparkVelocities[t*3+0]*e,this.hitSparkPositions[t*3+1]+=this.hitSparkVelocities[t*3+1]*e,this.hitSparkPositions[t*3+2]+=this.hitSparkVelocities[t*3+2]*e,i=!0):this.hitSparkPositions[t*3+1]=-999;i&&(r.needsUpdate=!0)}executePlayerAttack(){if(this.character.isDead||this.character.isDodging||!this.character.performAttack(this.character.attackComboStep+1))return!1;this.sound.playAttackSwing(this.character.attackComboStep);let e=this.character.position,t=this.character.getFacingDirection(),n=35+this.character.attackComboStep*15;for(let r of this.enemies){if(r.isDead)continue;let i=r.group.position.clone().sub(e);if(i.length()<=3.4&&(i.normalize(),t.dot(i)>.35)){let e=r.takeDamage(n,i);this.sound.playEnemyHit(),this.spawnHitSparks(r.group.position),this.playerEnergy=Math.min(this.playerMaxEnergy,this.playerEnergy+16),e&&(this.enemiesDefeatedCount++,this.sound.playEnemyDeath())}}return this.emitStatsChange(),!0}executePlayerDodge(e,t){if(this.character.isDead||this.character.isDodging)return!1;let n;if(e&&e.lengthSq()>.01&&t!==void 0){let r=-Math.sin(t),i=-Math.cos(t),a=Math.cos(t),o=-Math.sin(t);n=new W(r*e.y+a*e.x,0,i*e.y+o*e.x).normalize()}return this.character.performDodge(n)?(this.sound.playDodgeRoll(),this.isInvulnerable=!0,this.invulnerabilityTimer=.38,this.emitStatsChange(),!0):!1}executeEchoPulse(){if(this.character.isDead||this.character.isDodging||this.playerEnergy<40)return!1;this.playerEnergy-=40,this.character.performEchoPulse(),this.sound.playEchoPulse();let e=this.character.getStaffWorldPosition();this.pulseShockwaveMesh.position.copy(this.character.position),this.pulseShockwaveMesh.position.y+=.12,this.pulseSphereMesh.position.copy(e),this.pulseLight.position.copy(e),this.isPulseActive=!0,this.pulseEffectTimer=.65;for(let e of this.enemies){if(e.isDead)continue;let t=e.group.position.clone().sub(this.character.position);if(t.length()<=10.5){t.y=0,t.normalize();let n=e.takeDamage(75,t.multiplyScalar(2.2));this.spawnHitSparks(e.group.position,20),n&&(this.enemiesDefeatedCount++,this.sound.playEnemyDeath())}}return this.emitStatsChange(),!0}applyDamageToPlayer(e){this.character.isDead||this.isInvulnerable||(this.playerHp=Math.max(0,this.playerHp-e),this.sound.playPlayerHurt(),this.isInvulnerable=!0,this.invulnerabilityTimer=.65,this.onPlayerDamaged&&this.onPlayerDamaged(this.playerHp,this.playerMaxHp),this.emitStatsChange(),this.playerHp<=0&&this.handlePlayerDeath())}handlePlayerDeath(){this.character.die(),this.sound.playPlayerDeath(),this.onPlayerDied&&this.onPlayerDied()}respawnPlayer(e){this.playerHp=this.playerMaxHp,this.playerEnergy=this.playerMaxEnergy,this.isInvulnerable=!0,this.invulnerabilityTimer=2,this.character.respawn(e),this.sound.playPlayerRespawn(),this.emitStatsChange()}resetAll(){this.playerHp=this.playerMaxHp,this.playerEnergy=this.playerMaxEnergy,this.isInvulnerable=!1,this.invulnerabilityTimer=0,this.enemiesDefeatedCount=0,this.isPulseActive=!1,this.pulseEffectTimer=0,this.enemies.forEach(e=>e.reset()),this.emitStatsChange()}restoreFullHealth(){this.playerHp=this.playerMaxHp,this.playerEnergy=this.playerMaxEnergy,this.emitStatsChange()}spawnHitSparks(e,t=10){let n=0;for(let r=0;r<this.maxSparks&&n<t;r++)if(this.hitSparkLife[r]<=0){this.hitSparkLife[r]=1,this.hitSparkPositions[r*3+0]=e.x,this.hitSparkPositions[r*3+1]=e.y+1.2,this.hitSparkPositions[r*3+2]=e.z;let t=Math.random()*Math.PI*2,i=Math.random()*Math.PI,a=2.5+Math.random()*4;this.hitSparkVelocities[r*3+0]=Math.sin(i)*Math.cos(t)*a,this.hitSparkVelocities[r*3+1]=Math.cos(i)*a+1.5,this.hitSparkVelocities[r*3+2]=Math.sin(i)*Math.sin(t)*a,n++}}getStats(){return{hp:this.playerHp,maxHp:this.playerMaxHp,energy:this.playerEnergy,maxEnergy:this.playerMaxEnergy,isInvulnerable:this.isInvulnerable,enemiesDefeated:this.enemiesDefeatedCount}}emitStatsChange(){this.onStatsChanged&&this.onStatsChanged(this.getStats())}},Cd=`echo_player_account_identity`,wd=class e{constructor(){this.profile=this.loadOrGenerateProfile()}static generateUUID(){if(typeof crypto<`u`&&typeof crypto.randomUUID==`function`)try{return crypto.randomUUID()}catch{}return`xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx`.replace(/[xy]/g,e=>{let t=Math.random()*16|0;return(e===`x`?t:t&3|8).toString(16)})}loadOrGenerateProfile(){try{let e=localStorage.getItem(Cd);if(e){let t=JSON.parse(e);if(t&&t.id&&t.username)return t.lastActive=Date.now(),this.saveProfile(t),t}}catch(e){console.warn(`Could not read player identity from storage:`,e)}let t=Math.floor(100+Math.random()*900),n={id:`echo_usr_${e.generateUUID()}`,username:`SpiritWanderer_${t}`,titleAr:`مستكشف الأثير الأولي`,titleEn:`First Spirit Pioneer`,characterClass:`SPIRIT_WEAVER`,robeColor:`#1d4ed8`,auraColor:`#00f5d4`,level:1,echoMastery:0,createdAt:Date.now(),lastActive:Date.now()};return this.saveProfile(n),n}getProfile(){return{...this.profile}}setUsername(e){let t=e.trim();return t.length<2||t.length>24?!1:(this.profile.username=t,this.profile.lastActive=Date.now(),this.saveProfile(this.profile),!0)}setCharacterClass(e){this.profile.characterClass=e,e===`SPIRIT_WEAVER`?(this.profile.titleAr=`نساج الأرواح الروحاني`,this.profile.titleEn=`Spirit Weaver`,this.profile.auraColor=`#00f5d4`):e===`ANCIENT_WARDEN`?(this.profile.titleAr=`حارس الأطلال العتيق`,this.profile.titleEn=`Ancient Warden`,this.profile.auraColor=`#a855f7`):e===`MIND_SEEKER`?(this.profile.titleAr=`باحث ذكريات الجزيرة`,this.profile.titleEn=`Mind Seeker`,this.profile.auraColor=`#38bdf8`):e===`ECHO_BLADE`&&(this.profile.titleAr=`سياف الصدى المقدس`,this.profile.titleEn=`Echo Blade`,this.profile.auraColor=`#f59e0b`),this.profile.lastActive=Date.now(),this.saveProfile(this.profile)}setColors(e,t){this.profile.robeColor=e,this.profile.auraColor=t,this.profile.lastActive=Date.now(),this.saveProfile(this.profile)}addMastery(e){this.profile.echoMastery+=e;let t=this.profile.level*100,n=!1;return this.profile.echoMastery>=t&&(this.profile.level++,this.profile.echoMastery-=t,n=!0),this.profile.lastActive=Date.now(),this.saveProfile(this.profile),{levelUp:n,newLevel:this.profile.level}}saveProfile(e){try{localStorage.setItem(Cd,JSON.stringify(e))}catch(e){console.warn(`Could not persist player identity:`,e)}}getAuthPayload(){return{profile:this.getProfile(),clientTimestamp:Date.now()}}},Td=class{constructor(e){this.localPlayerProfile=e,this.activeParty=null,this.activePings=[],this.createLocalSoloParty()}createLocalSoloParty(){let e=this.generatePasscode(),t={playerId:this.localPlayerProfile.id,username:this.localPlayerProfile.username,characterClass:this.localPlayerProfile.characterClass,isLeader:!0,hp:100,maxHp:100,isReady:!0,pingMs:0};return this.activeParty={partyId:`party_${Date.now()}_${e}`,leaderId:this.localPlayerProfile.id,passCode:e,members:[t],maxMembers:4,sharedObjectiveAr:`استكشاف أسرار المعبد العتيق والبلورات السبع`,sharedObjectiveEn:`Explore Sanctuary Secrets & Attune the 7 Crystals`,createdAt:Date.now()},this.onPartyChanged&&this.onPartyChanged(this.activeParty),this.activeParty}getParty(){return this.activeParty}isLeader(){return this.activeParty?this.activeParty.leaderId===this.localPlayerProfile.id:!1}syncMember(e){if(!this.activeParty)return;let t=this.activeParty.members.findIndex(t=>t.playerId===e.playerId);t>=0?this.activeParty.members[t]={...this.activeParty.members[t],...e}:this.activeParty.members.length<this.activeParty.maxMembers&&this.activeParty.members.push(e),this.onPartyChanged&&this.onPartyChanged(this.activeParty)}removeMember(e){this.activeParty&&(this.activeParty.members=this.activeParty.members.filter(t=>t.playerId!==e),this.activeParty.leaderId===e&&this.activeParty.members.length>0&&(this.activeParty.leaderId=this.activeParty.members[0].playerId,this.activeParty.members[0].isLeader=!0),this.onPartyChanged&&this.onPartyChanged(this.activeParty))}addPing(e,t,n,r=`EXPLORE`){let i={id:`ping_${Date.now()}_${Math.random().toString(36).substring(2,6)}`,senderId:this.localPlayerProfile.id,senderName:this.localPlayerProfile.username,x:e,y:t,z:n,type:r,timestamp:Date.now(),durationMs:8e3};return this.activePings.push(i),this.onPingAdded&&this.onPingAdded(i),i}update(e=Date.now()){this.activePings=this.activePings.filter(t=>e-t.timestamp<t.durationMs)}getActivePings(){return this.activePings}updateLocalStats(e,t){if(!this.activeParty)return;let n=this.activeParty.members.find(e=>e.playerId===this.localPlayerProfile.id);n&&(n.hp=e,n.maxHp=t)}generatePasscode(){let e=`ECHO-`;for(let t=0;t<4;t++)e+=`ABCDEFGHJKLMNPQRSTUVWXYZ23456789`.charAt(Math.floor(Math.random()*32));return e}},Ed=class{constructor(e,t){this.targetFacingAngle=0,this.currentFacingAngle=0,this.isMoving=!1,this.isSprinting=!1,this.isGrounded=!0,this.animTimer=0,this.profile=e,this.targetPosition=new W(t.x,t.y,t.z),this.currentPosition=this.targetPosition.clone(),this.targetFacingAngle=t.facingAngle||0,this.currentFacingAngle=this.targetFacingAngle,this.group=new K,this.group.name=`RemotePlayer_${e.id}`,this.group.position.copy(this.currentPosition),this.pivotGroup=new K,this.group.add(this.pivotGroup);let n=parseInt(e.robeColor.replace(`#`,``),16)||1920728,r=parseInt(e.auraColor.replace(`#`,``),16)||62932,i=new Z({color:14599859,roughness:.8}),a=new Z({color:1579035,roughness:.9}),o=new Z({color:15394264,roughness:.85}),s=new Z({color:n,roughness:.75}),c=new Z({color:4007709,roughness:.9}),l=new Z({color:r,emissive:r,emissiveIntensity:2.2,roughness:.2}),u=new X(.24,.22,.72,8);this.torsoMesh=new J(u,o),this.torsoMesh.position.y=.88,this.torsoMesh.castShadow=!0,this.pivotGroup.add(this.torsoMesh);let d=new Fi(.36,.45,8);this.capeletMesh=new J(d,s),this.capeletMesh.position.set(0,1.15,-.04),this.capeletMesh.castShadow=!0,this.pivotGroup.add(this.capeletMesh);let f=new ao(.18,12,10);this.headMesh=new J(f,i),this.headMesh.position.y=1.42,this.headMesh.castShadow=!0,this.pivotGroup.add(this.headMesh);let p=new J(new ao(.09,8,8),a);p.position.set(0,1.58,-.1),this.pivotGroup.add(p);let m=new X(.08,.07,.58,6);this.leftArm=new K,this.leftArm.position.set(-.32,1.18,0);let h=new J(m,o);h.position.y=-.26,this.leftArm.add(h),this.pivotGroup.add(this.leftArm),this.rightArm=new K,this.rightArm.position.set(.32,1.18,0);let g=new J(m,o);g.position.y=-.26,this.rightArm.add(g),this.pivotGroup.add(this.rightArm),this.leftLeg=new K,this.leftLeg.position.set(-.14,.52,0);let _=new J(m,o);_.position.y=-.28,this.leftLeg.add(_),this.pivotGroup.add(this.leftLeg),this.rightLeg=new K,this.rightLeg.position.set(.14,.52,0);let v=new J(m,o);v.position.y=-.28,this.rightLeg.add(v),this.pivotGroup.add(this.rightLeg),this.staffGroup=new K,this.staffGroup.position.set(.36,.58,.12),this.staffGroup.rotation.set(-Math.PI*.42,.12,.18);let y=new Z({color:14871796,metalness:.95,roughness:.18}),b=new Z({color:13938487,metalness:.88,roughness:.25}),x=new J(new X(.02,.022,.18,8),c);this.staffGroup.add(x);let S=new J(new Li(.035,0),b);S.position.y=-.11,this.staffGroup.add(S);let C=new J(new Y(.24,.034,.058),b);C.position.y=.095,this.staffGroup.add(C);let w=new J(new Y(.062,.78,.015),y);w.position.y=.49,w.castShadow=!0,this.staffGroup.add(w);let T=new Fi(.042,.14,4);T.rotateY(Math.PI/4);let E=new J(T,y);E.position.y=.95,this.staffGroup.add(E);let D=new no(.025,0);this.staffCrystal=new J(D,l),this.staffCrystal.position.set(0,.095,.03),this.staffGroup.add(this.staffCrystal),this.staffLight=new qu(r,1.4,5),this.staffLight.position.set(0,.52,.03),this.staffGroup.add(this.staffLight),this.pivotGroup.add(this.staffGroup);let O=new io(.5,1.3,16,1,0,Math.PI*.8),k=new qr({color:r,side:2,transparent:!0,opacity:0,blending:2});this.slashArcMesh=new J(O,k),this.slashArcMesh.rotation.x=Math.PI/2,this.slashArcMesh.position.set(0,.95,.4),this.pivotGroup.add(this.slashArcMesh);let A=new io(.2,.6,32);A.rotateX(-Math.PI/2),this.pulseShockwaveMesh=new J(A,k.clone()),this.group.add(this.pulseShockwaveMesh),this.nameplateGroup=new K,this.nameplateGroup.position.y=2.15;let j=document.createElement(`canvas`);j.width=384,j.height=96;let M=j.getContext(`2d`);M&&(M.fillStyle=`rgba(6, 10, 18, 0.82)`,M.roundRect(8,8,368,80,16),M.fill(),M.strokeStyle=e.auraColor,M.lineWidth=3,M.stroke(),M.fillStyle=`#ffffff`,M.font=`bold 28px sans-serif`,M.textAlign=`center`,M.fillText(e.username,192,42),M.fillStyle=e.auraColor,M.font=`18px sans-serif`,M.fillText(`${e.titleEn} (Lv.${e.level})`,192,70));let N=new ki(j),ee=new J(new ro(1.4,.35),new qr({map:N,transparent:!0,depthTest:!1}));this.nameplateGroup.add(ee);let P=new J(new ro(1,.08),new qr({color:1579035,depthTest:!1}));P.position.y=.25,this.nameplateGroup.add(P);let te=new ro(.96,.05);te.translate(.48,0,0);let ne=new qr({color:1096065,depthTest:!1});this.hpFillMesh=new J(te,ne),this.hpFillMesh.position.set(-.48,.25,.005),this.nameplateGroup.add(this.hpFillMesh),this.group.add(this.nameplateGroup)}updateNetworkTransform(e){this.targetPosition.set(e.x,e.y,e.z),this.targetFacingAngle=e.facingAngle,this.isMoving=e.isMoving,this.isSprinting=e.isSprinting,this.isGrounded=e.isGrounded,e.actionState===`ATTACK`?this.playAttackAnimation(e.comboStep):e.actionState===`DODGE`?this.playDodgeAnimation():e.actionState===`PULSE`&&this.playPulseAnimation()}setHealthPercent(e){this.hpFillMesh.scale.x=Math.max(0,Math.min(1,e))}update(e,t){let n=Math.min(1,e*12);this.currentPosition.lerp(this.targetPosition,n),this.group.position.copy(this.currentPosition);let r=this.targetFacingAngle-this.currentFacingAngle;for(;r<-Math.PI;)r+=Math.PI*2;for(;r>Math.PI;)r-=Math.PI*2;if(this.currentFacingAngle+=r*Math.min(1,e*14),this.pivotGroup.rotation.y=this.currentFacingAngle,this.nameplateGroup.lookAt(t),this.animTimer+=e*(this.isSprinting?12:7),this.isMoving){let e=Math.sin(this.animTimer);this.leftLeg.rotation.x=e*.6,this.rightLeg.rotation.x=-e*.6,this.leftArm.rotation.x=-e*.45,this.rightArm.rotation.x=e*.45}else this.leftLeg.rotation.x=0,this.rightLeg.rotation.x=0,this.leftArm.rotation.x=0,this.rightArm.rotation.x=0;this.staffCrystal.rotation.y+=e*2}playAttackAnimation(e=1){let t=this.slashArcMesh.material;t.opacity=.85,this.rightArm.rotation.x=-1.2,setTimeout(()=>{t.opacity=0,this.rightArm.rotation.x=0},220)}playDodgeAnimation(){this.pivotGroup.rotation.x=Math.PI*.4,setTimeout(()=>{this.pivotGroup.rotation.x=0},320)}playPulseAnimation(){let e=this.pulseShockwaveMesh.material;e.opacity=.95,this.pulseShockwaveMesh.scale.set(1,1,1);let t=1,n=setInterval(()=>{t+=.8,this.pulseShockwaveMesh.scale.set(t,t,t),e.opacity-=.12,e.opacity<=0&&(clearInterval(n),e.opacity=0)},30)}dispose(){this.staffLight.dispose(),this.group.removeFromParent()}},Dd=class{constructor(){this.players=new Map,this.group=new K,this.group.name=`RemotePlayersManager`}addPlayer(e,t){if(this.players.has(e.id))return this.players.get(e.id);let n=new Ed(e,t);return this.players.set(e.id,n),this.group.add(n.group),n}removePlayer(e){let t=this.players.get(e);t&&(t.dispose(),this.players.delete(e))}getPlayer(e){return this.players.get(e)}playAction(e,t,n){let r=this.players.get(e);r&&(t===`ATTACK`?r.playAttackAnimation(n?.comboStep??1):t===`DODGE`?r.playDodgeAnimation():t===`PULSE`&&r.playPulseAnimation())}updateTransform(e,t){let n=this.players.get(e);n&&n.updateNetworkTransform(t)}update(e,t){for(let n of this.players.values())n.update(e,t)}getMinimapBlips(){let e=[];for(let t of this.players.values()){let n=parseInt(t.profile.auraColor.replace(`#`,``),16)||62932;e.push({pos:{x:t.group.position.x,z:t.group.position.z},name:t.profile.username,color:n})}return e}getPlayerCount(){return this.players.size}clearAll(){for(let e of this.players.values())e.dispose();this.players.clear()}},Od=class{constructor(){this.mode=`OFFLINE_SINGLEPLAYER`,this.isConnected=!0,this.pingMs=0,this.handlers=new Set}async connect(e,t){return this.isConnected=!0,!0}disconnect(){this.isConnected=!1}send(e){e.type===`C_AUTH`&&setTimeout(()=>{this.emitToLocal({type:`S_AUTH_ACK`,success:!0,sessionPlayerId:e.profile.id})},10)}onPacket(e){return this.handlers.add(e),()=>this.handlers.delete(e)}emitToLocal(e){this.handlers.forEach(t=>t(e))}},kd=class{constructor(e=`wss://echo-game-server.internal/ws`){this.serverUrl=e,this.mode=`CENTRAL_SERVER`,this.isConnected=!1,this.pingMs=24,this.socket=null,this.handlers=new Set,this.pingInterval=null,this.lastPingSentTime=0}connect(e,t){let n=e||this.serverUrl;return new Promise(e=>{try{let r=t?`${n}?token=${encodeURIComponent(t)}`:n;this.socket=new WebSocket(r),this.socket.onopen=()=>{this.isConnected=!0,this.startHeartbeat(),e(!0)},this.socket.onmessage=e=>{try{let t=JSON.parse(e.data);this.handlers.forEach(e=>e(t))}catch(e){console.warn(`Failed to parse incoming packet:`,e)}},this.socket.onerror=t=>{console.warn(`WebSocket connection error (will fallback to offline):`,t),e(!1)},this.socket.onclose=()=>{this.isConnected=!1,this.stopHeartbeat()}}catch(t){console.warn(`WebSocket init exception:`,t),e(!1)}})}disconnect(){this.stopHeartbeat(),this.socket&&(this.socket.close(),this.socket=null),this.isConnected=!1}send(e){this.socket&&this.socket.readyState===WebSocket.OPEN&&this.socket.send(JSON.stringify(e))}onPacket(e){return this.handlers.add(e),()=>this.handlers.delete(e)}startHeartbeat(){this.stopHeartbeat(),this.pingInterval=window.setInterval(()=>{this.lastPingSentTime=performance.now()},5e3)}stopHeartbeat(){this.pingInterval!==null&&(clearInterval(this.pingInterval),this.pingInterval=null)}},Ad=`echo_player_save_`,jd=`echo_world_instance_`,Md=`echo_the_world_remembers_save`,Nd=class{static extractPlayerSave(e,t){return{version:2,account:t,stats:e.combatSystem?e.combatSystem.getStats():{hp:100,maxHp:100,energy:100,maxEnergy:100,isInvulnerable:!1,enemiesDefeated:0},inventory:{collectedShards:e.worldInteractions.shards.filter(e=>e.collected).map(e=>e.id),attunedCrystals:e.crystals.crystals.filter(e=>e.collected).map(e=>e.id),readInscriptions:e.worldInteractions.inscriptions.filter(e=>e.read).map(e=>e.id)},questProgress:e.questSystem.serialize(),memoryProfile:e.memorySystem.serialize(),lastTransform:{x:e.player.position.x,y:e.player.position.y,z:e.player.position.z,yaw:e.cameraSystem.getYaw()},savedAt:Date.now()}}static extractWorldData(e,t,n=`forgotten_island_main`){let r={};e.crystals.crystals.forEach(e=>{r[e.id]=e.collected});let i={};return e.worldInteractions.shards.forEach(e=>{i[e.id]=e.collected}),{version:2,worldId:n,hostPlayerId:t,instanceSeed:4207,isTempleDoorOpen:e.worldInteractions.isTempleDoorOpen,shrineActivationStates:{},crystalCollectedStates:r,shardCollectedStates:i,defeatedBosses:[],dayNightCycleTime:0,weatherState:`CLEAR`,updatedAt:Date.now()}}static applyPlayerSave(e,t){if(t){if(t.questProgress&&e.questSystem.deserialize(t.questProgress),e.ui.updateQuestTracker(e.questSystem.getActiveQuest(),e.questSystem.getActiveObjective()),t.memoryProfile&&e.memorySystem.deserialize(t.memoryProfile),t.lastTransform&&typeof t.lastTransform.x==`number`){let n=e.terrain.getHeightAt(t.lastTransform.x,t.lastTransform.z);e.player.position.set(t.lastTransform.x,Math.max(t.lastTransform.y,n),t.lastTransform.z),e.player.velocity.set(0,0,0),e.player.isGrounded=!0,typeof t.lastTransform.yaw==`number`&&(e.cameraSystem.yaw=t.lastTransform.yaw)}e.combatSystem&&t.stats&&(e.combatSystem.playerHp=t.stats.hp??100,e.combatSystem.playerEnergy=t.stats.energy??100,e.combatSystem.enemiesDefeatedCount=t.stats.enemiesDefeated??0,e.ui.updateCombatStats(e.combatSystem.getStats()))}}static applyWorldData(e,t){if(t){if(t.crystalCollectedStates){let n=Object.entries(t.crystalCollectedStates).filter(([e,t])=>t).map(([e])=>Number(e));e.crystals.setCollectedState(n);let r=e.crystals.getCollectedCount();e.ui.updateCrystalProgress(r),e.portal.updateCrystalProgress(r)}if(t.shardCollectedStates){let n=Object.entries(t.shardCollectedStates).filter(([e,t])=>t).map(([e])=>Number(e));e.worldInteractions.restoreSavedState(n,[],t.isTempleDoorOpen),e.ui.updateShardProgress(n.length,10)}else t.isTempleDoorOpen!==e.worldInteractions.isTempleDoorOpen&&e.worldInteractions.toggleTempleDoor()}}static saveIsolated(e,t){try{let n=`${Ad}${e.account.id}`,r=`${jd}${t.worldId}`;localStorage.setItem(n,JSON.stringify(e)),localStorage.setItem(r,JSON.stringify(t));let i={collectedIds:Object.keys(t.crystalCollectedStates).map(Number).filter(e=>t.crystalCollectedStates[e]),collectedShards:Object.keys(t.shardCollectedStates).map(Number).filter(e=>t.shardCollectedStates[e]),readInscriptions:e.inventory.readInscriptions,isTempleDoorOpen:t.isTempleDoorOpen,memoryProfile:e.memoryProfile,questData:e.questProgress,playerPos:e.lastTransform,cameraYaw:e.lastTransform.yaw,timestamp:Date.now()};return localStorage.setItem(Md,JSON.stringify(i)),!0}catch(e){return console.warn(`Failed to save isolated multiplayer data:`,e),!1}}static loadIsolated(e,t=`forgotten_island_main`){try{let n=`${Ad}${e}`,r=`${jd}${t}`,i=localStorage.getItem(n),a=localStorage.getItem(r),o=i?JSON.parse(i):null,s=a?JSON.parse(a):null;if(!o){let n=localStorage.getItem(Md);if(n){let r=JSON.parse(n);if(r&&Array.isArray(r.collectedIds)){let n={};r.collectedIds.forEach(e=>n[Number(e)]=!0);let i={};(r.collectedShards||[]).forEach(e=>i[Number(e)]=!0),s={version:2,worldId:t,hostPlayerId:e,instanceSeed:4207,isTempleDoorOpen:r.isTempleDoorOpen||!1,shrineActivationStates:{},crystalCollectedStates:n,shardCollectedStates:i,defeatedBosses:[],dayNightCycleTime:0,weatherState:`CLEAR`,updatedAt:r.timestamp||Date.now()},o={version:2,account:{id:e,username:`Spirit Wanderer`,titleAr:`مستكشف الأثير الأولي`,titleEn:`First Spirit Pioneer`,characterClass:`SPIRIT_WEAVER`,robeColor:`#1d4ed8`,auraColor:`#00f5d4`,level:1,echoMastery:0,createdAt:r.timestamp||Date.now(),lastActive:Date.now()},stats:{hp:100,maxHp:100,energy:100,maxEnergy:100,isInvulnerable:!1,enemiesDefeated:0},inventory:{collectedShards:r.collectedShards||[],attunedCrystals:r.collectedIds||[],readInscriptions:r.readInscriptions||[]},questProgress:r.questData,memoryProfile:r.memoryProfile,lastTransform:r.playerPos?{...r.playerPos,yaw:r.cameraYaw||0}:{x:0,y:5,z:-100,yaw:Math.PI},savedAt:r.timestamp||Date.now()}}}}return{player:o,world:s}}catch(e){return console.warn(`Error loading isolated multiplayer data:`,e),{player:null,world:null}}}},Pd=class{constructor(){this.config={mode:`OFFLINE_SINGLEPLAYER`,serverUrl:`wss://echo.aistudio.internal/ws`,reconnectIntervalMs:3e3,maxReconnectAttempts:5,sendRateHz:20,interpolationDelayMs:100},this.syncTimer=0,this.syncInterval=1/20,this.account=new wd,this.party=new Td(this.account.getProfile()),this.remotePlayers=new Dd,this.transport=new Od}init(e){this.game=e,this.game.scene.add(this.remotePlayers.group),this.cleanupPacketListener=this.transport.onPacket(e=>{this.handleServerPacket(e)}),this.transport.send({type:`C_AUTH`,profile:this.account.getProfile()})}update(e,t,n){this.remotePlayers.update(e,n),this.party.update(),this.syncTimer+=e,this.syncTimer>=this.syncInterval&&(this.syncTimer=0,this.broadcastLocalTransform())}broadcastLocalTransform(){if(!this.game||!this.game.player)return;let e=this.game.player,t=`IDLE`;e.isDead?t=`DEAD`:e.isAttacking?t=`ATTACK`:e.isDodging?t=`DODGE`:e.isCastingPulse?t=`PULSE`:e.isGrounded?e.isMoving&&(t=e.isSprinting?`RUN`:`WALK`):t=e.velocity.y>0?`JUMP_ASCENT`:`JUMP_DESCENT`;let n={x:e.position.x,y:e.position.y,z:e.position.z,vx:e.velocity.x,vy:e.velocity.y,vz:e.velocity.z,facingAngle:e.getFacingDirection?Math.atan2(e.getFacingDirection().x,e.getFacingDirection().z):0,isGrounded:e.isGrounded,isMoving:e.isMoving,isSprinting:e.isSprinting,actionState:t,comboStep:e.attackComboStep||1,timestamp:Date.now()};this.transport.send({type:`C_SYNC_TRANSFORM`,transform:n})}handleServerPacket(e){switch(e.type){case`S_AUTH_ACK`:console.log(`Central Server Auth Ack:`,e.success?`Success`:`Failed`);break;case`S_PLAYER_JOINED`:this.remotePlayers.addPlayer(e.profile,e.transform),this.game.ui.showToast(`✦ انضم المغامر ${e.profile.username} إلى العالم`);break;case`S_PLAYER_LEFT`:this.remotePlayers.removePlayer(e.playerId);break;case`S_REMOTE_TRANSFORM`:this.remotePlayers.updateTransform(e.playerId,e.transform);break;case`S_REMOTE_ATTACK`:this.remotePlayers.playAction(e.playerId,`ATTACK`,{comboStep:e.comboStep});break;case`S_REMOTE_DODGE`:this.remotePlayers.playAction(e.playerId,`DODGE`);break;case`S_REMOTE_PULSE`:this.remotePlayers.playAction(e.playerId,`PULSE`);break;case`S_WORLD_STATE_UPDATE`:Nd.applyWorldData(this.game,e.delta);break;case`S_PARTY_PING`:this.party.addPing(e.ping.x,e.ping.y,e.ping.z,e.ping.type)}}saveGame(){if(!this.game)return!1;let e=Nd.extractPlayerSave(this.game,this.account.getProfile()),t=Nd.extractWorldData(this.game,this.account.getProfile().id);return Nd.saveIsolated(e,t)}loadGame(){if(!this.game)return!1;let{player:e,world:t}=Nd.loadIsolated(this.account.getProfile().id);return!e&&!t?!1:(t&&Nd.applyWorldData(this.game,t),e&&Nd.applyPlayerSave(this.game,e),!0)}async switchNetworkMode(e,t){return e===this.transport.mode||(this.transport.disconnect(),this.cleanupPacketListener&&this.cleanupPacketListener(),e===`CENTRAL_SERVER`?(this.transport=new kd(t||this.config.serverUrl),await this.transport.connect()||(this.transport=new Od,await this.transport.connect())):(this.transport=new Od,await this.transport.connect()),this.cleanupPacketListener=this.transport.onPacket(e=>this.handleServerPacket(e)),this.transport.isConnected)}dispose(){this.cleanupPacketListener&&this.cleanupPacketListener(),this.transport.disconnect(),this.remotePlayers.clearAll()}},Fd,Id={low:{preset:`low`,labelAr:`ناعم (أداء فائق)`,labelEn:`Smooth (Max Performance)`,dprMultiplier:.85,maxDpr:1,shadowsEnabled:!1,shadowMapSize:512,shadowMapType:1,lightDistanceScale:.6,fogNearMultiplier:1.2,fogDensity:.0022,farPlane:1100,treeLodCutoff:300,grassDensityPercent:.35,enableExtraPointLights:!1,maxParticleCount:75},medium:{preset:`medium`,labelAr:`قياسي (متوازن)`,labelEn:`Standard (Balanced)`,dprMultiplier:1,maxDpr:1.35,shadowsEnabled:!0,shadowMapSize:1024,shadowMapType:1,lightDistanceScale:.85,fogNearMultiplier:1,fogDensity:.0014,farPlane:1800,treeLodCutoff:550,grassDensityPercent:.7,enableExtraPointLights:!0,maxParticleCount:160},ultra:{preset:`ultra`,labelAr:`فائق (أعلى دقة)`,labelEn:`Ultra (Max Visuals)`,dprMultiplier:1,maxDpr:1.75,shadowsEnabled:!0,shadowMapSize:2048,shadowMapType:1,lightDistanceScale:1,fogNearMultiplier:.85,fogDensity:.0011,farPlane:2400,treeLodCutoff:900,grassDensityPercent:1,enableExtraPointLights:!0,maxParticleCount:300}},Ld=class e{constructor(){this.currentPreset=`medium`,this.fpsHistory=[],this.frameCount=0,this.lastFpsTime=performance.now(),this.currentFps=60,this.averageFps=60,this.currentPreset=this.loadSavedPreset()}getPreset(){return this.currentPreset}getSettings(){return Id[this.currentPreset]}setPreset(t){this.currentPreset=t;try{localStorage.setItem(e.STORAGE_KEY,t)}catch{}return Id[t]}loadSavedPreset(){try{let t=localStorage.getItem(e.STORAGE_KEY);if(t&&(t===`low`||t===`medium`||t===`ultra`))return t}catch{}return/Android|iPhone|iPad|iPod|Mobile/i.test(navigator.userAgent)||window.innerWidth<850||navigator.maxTouchPoints>0&&Math.min(window.innerWidth,window.innerHeight)<900?`medium`:`ultra`}recordFrame(e){this.frameCount++;let t=e-this.lastFpsTime;if(t>=500){this.currentFps=Math.round(this.frameCount*1e3/t),this.fpsHistory.push(this.currentFps),this.fpsHistory.length>10&&this.fpsHistory.shift();let n=this.fpsHistory.reduce((e,t)=>e+t,0);this.averageFps=Math.round(n/this.fpsHistory.length),this.frameCount=0,this.lastFpsTime=e}}};Fd=Ld,Fd.STORAGE_KEY=`echo_game_quality_preset_v2`;var Rd=class{constructor(e){this.container=e,this.allObstacles=[],this.state=0,this.lastTime=0,this.activeInteractiveTarget=null,this.hasTriggeredVictory=!1,this.lastSprintState=!1,this.lastWasSwimming=!1,this.isContextLost=!1,this.splashRemoved=!1,this.lastMinimapRenderMs=-999,this.lastModalRenderMs=-999,this.lastTitleRenderMs=-999,this.lastRenderDurationMs=16,this.needsModalBackdropRender=!1,this.enemyBlipsBuffer=[],this.prologueTimerId=null,this.victoryTimerId=null,this.performanceManager=new Ld;let t=this.performanceManager.getSettings(),n=/Android|iPhone|iPad|iPod|Mobile/i.test(navigator.userAgent)||window.innerWidth<850||navigator.maxTouchPoints>0&&Math.min(window.innerWidth,window.innerHeight)<900;this.renderer=new Vu({antialias:t.preset===`ultra`&&!n,powerPreference:`high-performance`,alpha:!1,precision:n?`mediump`:`highp`}),this.renderer.setSize(window.innerWidth,window.innerHeight);let r=Math.max(.75,Math.min(window.devicePixelRatio*t.dprMultiplier,t.maxDpr));if(this.renderer.setPixelRatio(r),this.renderer.outputColorSpace=Ke,this.renderer.toneMapping=4,this.renderer.toneMappingExposure=1.15,this.renderer.shadowMap.enabled=t.shadowsEnabled,this.renderer.shadowMap.type=t.shadowMapType,this.renderer.domElement.id=`echo-webgl-canvas`,this.renderer.domElement.addEventListener(`webglcontextlost`,e=>{e.preventDefault(),this.isContextLost=!0}),this.renderer.domElement.addEventListener(`webglcontextrestored`,()=>{this.isContextLost=!1,this.applyQualityLevel(this.performanceManager.getPreset())}),this.container.appendChild(this.renderer.domElement),this.scene=new Vn,this.worldLightPool=new Ju(this.scene),t.preset!==`low`)try{let e=new Js(this.renderer);this.scene.environment=e.fromScene(new Hu,.04).texture,e.dispose()}catch(e){console.warn(`RoomEnvironment fallback:`,e)}this.sound=new Wu,this.cameraSystem=new vd(55,window.innerWidth/window.innerHeight),this.cameraSystem.camera.far=t.farPlane,this.cameraSystem.camera.updateProjectionMatrix(),this.atmosphere=new id(this.scene,n),this.scene.add(this.atmosphere.group),this.terrain=new $(n),this.scene.add(this.terrain.group),this.lake=new Yu,this.scene.add(this.lake.group),this.temple=new td(this.terrain),this.scene.add(this.temple.group),this.portal=new nd(this.terrain),this.scene.add(this.portal.group),this.terrain.floorHeightProvider=(e,t)=>this.portal.getFloorHeightAt(e,t),this.forest=new ed(this.terrain),this.scene.add(this.forest.group),this.crystals=new rd(this.terrain),this.scene.add(this.crystals.group),this.worldInteractions=new ad(this.terrain),this.scene.add(this.worldInteractions.group),this.memorySystem=new sd(this.terrain),this.scene.add(this.memorySystem.group),this.villageHouses=new Xu(this.terrain),this.scene.add(this.villageHouses.group),this.terrain.floorHeightProvider=(e,t)=>this.portal.getFloorHeightAt(e,t)??this.villageHouses.getFloorHeightAt(e,t),this.allObstacles=[...this.forest.obstacles,...this.temple.obstacles,...this.portal.obstacles,...this.worldInteractions.obstacles,...this.villageHouses.obstacles];let i=$.SPAWN_POS.x,a=$.SPAWN_POS.z,o=this.terrain.getHeightAt(i,a);this.player=new gd(new W(i,o,a)),this.scene.add(this.player.group),this.questSystem=new cd,this.questSystem.onObjectiveUpdated=(e,t)=>{this.ui.updateQuestTracker(e,t)},this.questSystem.onObjectiveCompleted=(e,t,n)=>{this.sound.playQuestObjectiveComplete(),this.ui.showObjectiveCompleteBanner(t,n),this.ui.updateQuestTracker(e,n),this.saveGame()},this.questSystem.onQuestCompleted=(e,t)=>{this.sound.playQuestCompletedFanfare(),this.ui.updateQuestTracker(t||e,t?t.objectives[0]:null),this.ui.showToast(`🎉 اكتملت مهمة الذاكرة الأولى بنجاح! · The First Memory Awakened`),this.saveGame()},this.questSystem.onStoryNarrativeTriggered=e=>{this.sound.playStoryNarrative(),this.ui.openStoryNarrativeModal(e)},this.npcManager=new md(this.terrain,this.sound,this.questSystem,this.memorySystem),this.scene.add(this.npcManager.group),this.combatSystem=new Sd(this.terrain,this.player,this.sound),this.scene.add(this.combatSystem.group),this.combatSystem.onPlayerDamaged=(e,t)=>{this.ui.showHurtEffect(),this.ui.updateCombatStats(this.combatSystem.getStats())},this.combatSystem.onPlayerDied=()=>{this.ui.openDeathModal(()=>{this.resetPlayerPosition(),this.combatSystem.respawnPlayer(this.player.position),this.ui.updateCombatStats(this.combatSystem.getStats()),this.ui.closeDeathModal(),this.ui.showToast(`✦ استعدت عافيتك من طاقة الجزيرة · Restored by Island Light`)})},this.combatSystem.onStatsChanged=e=>{this.ui.updateCombatStats(e)},this.multiplayer=new Pd,this.multiplayer.init(this),this.input=new yd(this.container),this.ui=new bd({onNewGame:()=>this.startNewGame(),onContinueGame:()=>this.continueGame(),onOpenSettings:()=>this.ui.openSettingsModal(),onExitGame:()=>this.exitToTitle(),onToggleSound:()=>{let e=this.sound.toggleMute();this.ui.setSoundIcon(e)},onPauseToggle:()=>{this.state===1?this.state=2:this.state===2&&(this.state=1)},onSaveGame:()=>this.saveGame(),onResetPosition:()=>this.resetPlayerPosition(),onInteract:()=>this.handleInteract(),onJump:()=>{this.player.jump()&&this.sound.playJump()},onCombatAttack:()=>{this.state===1&&!this.ui.getIsModalOrPaused()&&this.combatSystem.executePlayerAttack()},onCombatDodge:()=>{this.state===1&&!this.ui.getIsModalOrPaused()&&this.combatSystem.executePlayerDodge(this.input.moveInput,this.cameraSystem.getYaw())},onCombatPulse:()=>{this.state===1&&!this.ui.getIsModalOrPaused()&&this.combatSystem.executeEchoPulse()},onRespawnRequested:()=>{this.resetPlayerPosition(),this.combatSystem.respawnPlayer(this.player.position),this.ui.updateCombatStats(this.combatSystem.getStats()),this.ui.closeDeathModal(),this.ui.showToast(`✦ استعدت عافيتك من طاقة الجزيرة · Restored by Island Light`)},onTouchMove:(e,t,n)=>{this.input.touchMoveInput.set(e,t),this.input.touchJoystickSprinting=n},onJoystickTouchState:e=>{this.input.setJoystickTouchId(e)},onTouchSprintState:e=>{this.input.touchButtonSprinting=e},onTouchSprintToggle:()=>(this.input.touchButtonSprinting=!this.input.touchButtonSprinting,this.input.touchButtonSprinting),onUpdateVolume:(e,t)=>{this.sound.setMasterVolume(e),this.sound.setMusicVolume(t)},onUpdateCameraSens:e=>{this.cameraSystem.sensitivity=e},getMemoryProfile:()=>this.memorySystem.profile,getQuestSystem:()=>this.questSystem,getMultiplayerCoordinator:()=>this.multiplayer,getCurrentQualityPreset:()=>this.performanceManager.getPreset(),onQualityPresetChanged:e=>this.setQualityPreset(e)}),this.applyQualityLevel(this.performanceManager.getPreset());let s=this.checkSavedProgress();this.ui.setContinueBadge(s.hasSave,s.count),this.ui.updateShardProgress(s.shardCount,10),this.ui.updateQuestTracker(this.questSystem.getActiveQuest(),this.questSystem.getActiveObjective()),this.ui.updateCombatStats(this.combatSystem.getStats()),window.addEventListener(`resize`,()=>this.onWindowResize()),window.addEventListener(`blur`,()=>{this.input.resetAllInputs(),this.ui.resetAllTouchStates()}),document.addEventListener(`visibilitychange`,()=>{document.hidden?(this.input.resetAllInputs(),this.ui.resetAllTouchStates()):this.lastTime=performance.now()}),window.addEventListener(`orientationchange`,()=>{this.input.resetAllInputs(),this.ui.resetAllTouchStates(),setTimeout(()=>this.onWindowResize(),100)}),window.screen?.orientation&&window.screen.orientation.addEventListener(`change`,()=>{setTimeout(()=>this.onWindowResize(),100)}),this.ui.handleOrientationOrResize();let c=performance.now();this.worldLightPool.update(this.cameraSystem.camera.position,this.getMaxPooledLights(),c,!0),this.lastTime=c,requestAnimationFrame(e=>this.tick(e))}getMaxPooledLights(){let e=this.performanceManager.getPreset();return e===`low`?4:e===`medium`?6:8}dismissBootSplash(){if(this.splashRemoved)return;this.splashRemoved=!0;let e=document.getElementById(`echo-boot-splash`);e&&(e.style.opacity=`0`,setTimeout(()=>e.remove(),220))}clearPendingTimers(){this.prologueTimerId!==null&&(window.clearTimeout(this.prologueTimerId),this.prologueTimerId=null),this.victoryTimerId!==null&&(window.clearTimeout(this.victoryTimerId),this.victoryTimerId=null)}startNewGame(){this.clearPendingTimers(),this.input.resetAllInputs(),this.ui.resetAllTouchStates(),this.sound.init(),this.sound.resume(),this.sound.playUIClick(),this.crystals.resetAll(),this.worldInteractions.resetAll(),this.memorySystem.reset(),this.questSystem.resetAll(),this.combatSystem.resetAll(),this.hasTriggeredVictory=!1,this.portal.updateCrystalProgress(0),this.ui.updateCrystalProgress(0),this.ui.updateShardProgress(0,10),this.ui.updateQuestTracker(this.questSystem.getActiveQuest(),this.questSystem.getActiveObjective()),this.ui.updateCombatStats(this.combatSystem.getStats());let e=$.SPAWN_POS.x,t=$.SPAWN_POS.z,n=this.terrain.getHeightAt(e,t);this.player.position.set(e,n,t),this.player.velocity.set(0,0,0),this.player.isGrounded=!0,this.state=1,this.cameraSystem.isCinematic=!1,this.cameraSystem.yaw=Math.PI,this.ui.showHUD(),this.ui.showToast(`رحلة جديدة بدأت · A new journey has begun`),this.prologueTimerId=window.setTimeout(()=>{if(this.prologueTimerId=null,this.state!==1)return;let e=this.questSystem.getPrologueEvent();this.sound.playStoryNarrative(),this.ui.openStoryNarrativeModal(e)},400),this.saveGame()}continueGame(){this.clearPendingTimers(),this.input.resetAllInputs(),this.ui.resetAllTouchStates(),this.sound.init(),this.sound.resume(),this.sound.playUIClick(),this.loadSavedProgress()?(this.combatSystem.respawnPlayer(this.player.position),this.ui.updateCombatStats(this.combatSystem.getStats()),this.state=1,this.cameraSystem.isCinematic=!1,this.ui.showHUD(),this.ui.showToast(`تم استعادة التقدم · Progress restored`)):this.startNewGame()}exitToTitle(){this.clearPendingTimers(),this.input.resetAllInputs(),this.ui.resetAllTouchStates(),this.sound.playUIClick(),this.saveGame(),this.state=0,this.cameraSystem.isCinematic=!0,this.ui.showTitleScreen();let e=this.checkSavedProgress();this.ui.setContinueBadge(e.hasSave,e.count)}saveGame(){try{let e={collectedIds:this.crystals.crystals.filter(e=>e.collected).map(e=>e.id),collectedShards:this.worldInteractions.shards.filter(e=>e.collected).map(e=>e.id),readInscriptions:this.worldInteractions.inscriptions.filter(e=>e.read).map(e=>e.id),isTempleDoorOpen:this.worldInteractions.isTempleDoorOpen,memoryProfile:this.memorySystem.serialize(),questData:this.questSystem.serialize(),playerPos:{x:this.player.position.x,y:this.player.position.y,z:this.player.position.z},cameraYaw:this.cameraSystem.getYaw(),timestamp:Date.now()};localStorage.setItem(`echo_the_world_remembers_save`,JSON.stringify(e)),this.multiplayer?.saveGame();let t=this.checkSavedProgress();return this.ui.setContinueBadge(t.hasSave,t.count),!0}catch(e){return console.warn(`LocalStorage save failed:`,e),!1}}loadSavedProgress(){try{let e=localStorage.getItem(`echo_the_world_remembers_save`);if(!e)return!1;let t=JSON.parse(e);if(!t||!Array.isArray(t.collectedIds))return!1;this.crystals.setCollectedState(t.collectedIds);let n=this.crystals.getCollectedCount();this.ui.updateCrystalProgress(n),this.portal.updateCrystalProgress(n),this.worldInteractions.restoreSavedState(t.collectedShards||[],t.readInscriptions||[],t.isTempleDoorOpen||!1);let r=this.worldInteractions.getCollectedShardsCount();if(this.ui.updateShardProgress(r,10),t.memoryProfile&&this.memorySystem.deserialize(t.memoryProfile),t.questData&&this.questSystem.deserialize(t.questData),this.ui.updateQuestTracker(this.questSystem.getActiveQuest(),this.questSystem.getActiveObjective()),t.playerPos&&typeof t.playerPos.x==`number`){let e=this.terrain.getHeightAt(t.playerPos.x,t.playerPos.z);this.player.position.set(t.playerPos.x,Math.max(t.playerPos.y,e),t.playerPos.z),this.player.velocity.set(0,0,0),this.player.isGrounded=!0}return typeof t.cameraYaw==`number`&&(this.cameraSystem.yaw=t.cameraYaw),this.hasTriggeredVictory=n>=7,!0}catch(e){return console.warn(`LocalStorage load failed:`,e),!1}}checkSavedProgress(){try{let e=localStorage.getItem(`echo_the_world_remembers_save`);if(!e)return{hasSave:!1,count:0,shardCount:0};let t=JSON.parse(e);if(t&&Array.isArray(t.collectedIds)){let e=Array.isArray(t.collectedShards)?t.collectedShards.length:0;return{hasSave:!0,count:t.collectedIds.length,shardCount:e}}}catch{}return{hasSave:!1,count:0,shardCount:0}}setQualityPreset(e){this.performanceManager.setPreset(e),this.applyQualityLevel(e)}applyQualityLevel(e){let t=this.performanceManager.getSettings();this.renderer.shadowMap.enabled!==t.shadowsEnabled&&(this.renderer.shadowMap.enabled=t.shadowsEnabled),this.renderer.shadowMap.type=t.shadowMapType;let n=Math.max(.75,Math.min(window.devicePixelRatio*t.dprMultiplier,t.maxDpr));this.renderer.getPixelRatio()!==n&&this.renderer.setPixelRatio(n),this.needsModalBackdropRender=!0,this.cameraSystem?.camera&&(this.cameraSystem.camera.far=t.farPlane,this.cameraSystem.camera.updateProjectionMatrix()),this.atmosphere&&this.atmosphere.applyQuality(t.shadowsEnabled,t.shadowMapSize,t.fogDensity,t.maxParticleCount),this.forest&&this.forest.applyQuality(t.shadowsEnabled,t.grassDensityPercent,t.enableExtraPointLights),this.villageHouses&&this.villageHouses.applyQuality(t.shadowsEnabled,t.enableExtraPointLights)}resetPlayerPosition(){this.input.resetAllInputs(),this.ui.resetAllTouchStates();let e=$.SPAWN_POS.x,t=$.SPAWN_POS.z,n=this.terrain.getHeightAt(e,t);this.player.position.set(e,n,t),this.player.velocity.set(0,0,0),this.player.isGrounded=!0,this.cameraSystem.yaw=Math.PI,this.sound.playUIClick(),this.ui.showToast(`تم العودة إلى نقطة البداية · Returned to start`)}handleInteract(){if(this.state!==1||this.ui.getIsModalOrPaused()||!this.activeInteractiveTarget)return;let e=this.activeInteractiveTarget;if(e.npcInfo){let t=e.npcInfo;this.startNPCDialogue(t.id)}else if(e.type===`crystal`){let t=e.data;if(t&&!t.collected){let e=this.crystals.collectCrystal(t.id);if(e){this.sound.playCrystalResonance(),this.worldInteractions.spawnCollectionBurst(t.pos,t.color),this.ui.openLoreModal(e);let n=this.crystals.getCollectedCount();this.ui.updateCrystalProgress(n),this.portal.updateCrystalProgress(n),this.questSystem.recordCrystalCount(n),this.saveGame(),n>=7&&!this.hasTriggeredVictory&&(this.hasTriggeredVictory=!0,this.victoryTimerId=window.setTimeout(()=>{this.victoryTimerId=null,this.state===1&&(this.sound.playPortalActivation(),this.ui.openVictoryModal())},1500))}}}else if(e.type===`shard`){let t=this.worldInteractions.collectShard(e.id);if(t){this.sound.playShardCollect();let e=this.worldInteractions.getCollectedShardsCount();this.ui.updateShardProgress(e,10),this.ui.showToast(`✦ ${t.nameAr} · ${t.quoteAr}`),this.questSystem.recordShardCollected(e),this.saveGame()}}else if(e.type===`inscription`){let t=e.data;t&&(this.sound.playInscriptionRead(),t.read=!0,this.ui.openInscriptionModal(t),this.questSystem.recordInscriptionRead(t.id),this.saveGame())}else if(e.type===`door`){let e=this.worldInteractions.toggleTempleDoor();this.sound.playStoneDoorSound(),this.ui.showToast(e?`فُتحت بوابة المعبد الحجرية العتيقة · Temple Gate Unsealed`:`أُغلقت بوابة المعبد الحجرية · Temple Gate Sealed`),this.questSystem.recordStoneGateAction(e),this.saveGame()}else if(e.type===`portal`){let e=this.crystals.getCollectedCount();if(e>=7)this.sound.playPortalActivation(),this.ui.openVictoryModal();else{let t=7-e;this.sound.playUIClick(),this.ui.showToast(`البوابة مقفلة بختم أثيري! اجمع ${t} بلورات أخرى لتفعيلها · 7 Echoes Required`)}}else if(e.type===`hearth`)this.combatSystem.restoreFullHealth(),this.sound.playHearthRest(),this.ui.updateCombatStats(this.combatSystem.getStats()),this.ui.showToast(`✦ استرحت بجانب الموقد الحجري واستعدت كامل عافيتك وطاقتك · Restored by Warm Hearth`),this.saveGame();else if(e.type===`well`)this.sound.playWellWater(),this.ui.showToast(`✦ شربت من مياه نبع الأثير العذبة وارتوت روحك · Pure Spring Water Drank`);else if(e.type===`village_lore`){let t=e.data;this.sound.playInscriptionRead(),this.ui.showToast(t?.loreTextAr||`«سجلات قديمة تحكي عن سكينة القرية ووئام أهلها مع صدى الجزيرة...»`)}}startNPCDialogue(e,t=`root`){let n=this.npcManager.getDialogueFor(e,t);this.ui.openNPCDialogue(n,t=>{t.action===`CLOSE`?(this.ui.closeNPCDialogue(),this.npcManager.closeDialogue()):t.action===`PET_CREATURE`?(this.sound.playNPCVoice(`creature`),this.ui.showToast(`✦ استشعرت روح الضياء نقاء خطواتك · Forest Harmony Gained`),this.ui.closeNPCDialogue(),this.npcManager.closeDialogue()):(t.action===`QUEST_HINT`&&this.ui.showToast(`📍 تم تحديث إرشادات البوصلة · Quest Guidance Updated`),t.nextDialogueId?this.startNPCDialogue(e,t.nextDialogueId):(this.ui.closeNPCDialogue(),this.npcManager.closeDialogue()))})}tick(e){if(requestAnimationFrame(e=>this.tick(e)),this.isContextLost)return;if(document.hidden){this.lastTime=e;return}let t=(e-this.lastTime)/1e3;this.lastTime=e;let n=Number.isFinite(t)&&t>0?Math.min(t,.05):.016;if(this.ui.getIsModalOrPaused()&&this.splashRemoved){if(this.input.update(),this.input.pauseJustPressed&&this.ui.handleEscapeKey(this.state!==0),this.input.clearFrameDeltas(),this.needsModalBackdropRender&&e-this.lastModalRenderMs>=200){this.lastModalRenderMs=e,this.needsModalBackdropRender=!1;let t=performance.now();this.renderer.render(this.scene,this.cameraSystem.camera),this.lastRenderDurationMs=performance.now()-t}return}if(this.state===0&&this.splashRemoved){let t=Math.min(250,Math.max(33,this.lastRenderDurationMs*1.5));if(e-this.lastTitleRenderMs<t)return;this.lastTitleRenderMs=e}this.lastModalRenderMs=-999,this.needsModalBackdropRender=!1,this.performanceManager.recordFrame(e),this.update(n,e/1e3,e);let r=performance.now();this.renderer.render(this.scene,this.cameraSystem.camera),this.lastRenderDurationMs=performance.now()-r,this.dismissBootSplash()}update(e,t,n=performance.now()){this.input.update(),this.input.pauseJustPressed&&this.ui.handleEscapeKey(this.state!==0),this.input.questJustPressed&&this.state===1&&this.ui.openQuestLogModal(this.questSystem);let r=this.ui.getIsModalOrPaused();if(this.state===1&&this.ui.updateAutoRunUI(this.input.isSprinting),!r&&this.state===1&&((this.input.cameraDeltaX!==0||this.input.cameraDeltaY!==0)&&this.cameraSystem.rotate(this.input.cameraDeltaX,this.input.cameraDeltaY),this.input.zoomDelta!==0&&this.cameraSystem.zoom(this.input.zoomDelta)),!r&&this.state===1){this.input.jumpJustPressed&&this.player.jump()&&this.sound.playJump(),this.input.attackJustPressed&&this.combatSystem.executePlayerAttack(),this.input.dodgeJustPressed&&this.combatSystem.executePlayerDodge(this.input.moveInput,this.cameraSystem.getYaw()),this.input.pulseJustPressed&&this.combatSystem.executeEchoPulse(),this.player.update(e,this.input.moveInput,this.cameraSystem.getYaw(),this.input.isSprinting,this.terrain,this.allObstacles),this.questSystem.updatePlayerMovement(this.player.position),this.player.isSwimming?(this.lastWasSwimming||this.sound.playWaterSplash(1.2),(this.player.isMoving||this.player.isRunningInPlace)&&this.sound.playSwimStroke(this.player.isSprinting)):(this.lastWasSwimming&&this.sound.playWaterSplash(.7),(this.player.isMoving||this.player.isRunningInPlace)&&this.player.isGrounded&&this.sound.playFootstep(this.player.isSprinting)),this.lastWasSwimming=this.player.isSwimming;let t=this.crystals.checkNearbyCrystal(this.player.position,3.8),n=this.worldInteractions.findClosestInteraction(this.player.position),r=this.npcManager.findClosestNPC(this.player.position,3.8),i=null,a=1/0;if(t){let e=this.player.position.distanceTo(t.pos);a=e,i={id:t.id,type:`crystal`,titleAr:t.nameAr,titleEn:t.nameEn,actionAr:`تواصل مع صدى البلورة`,actionEn:`Commune with Echo Crystal`,pos:t.pos,dist:e,color:t.color,data:t}}n&&n.dist<a&&(a=n.dist,i=n),r&&r.distance<a&&(a=r.distance,i={id:r.id,type:`door`,titleAr:r.nameAr,titleEn:r.nameEn,actionAr:r.actionPromptAr,actionEn:r.actionPromptEn,pos:r.position,dist:r.distance,color:r.type===`WANDERER`?62932:r.type===`GUARDIAN`?10182117:6220500,data:r},i.npcInfo=r);let o=this.villageHouses.findClosestInteraction(this.player.position,3.8);o&&o.dist<a&&(a=o.dist,i=o),this.activeInteractiveTarget=i,this.ui.showTargetInteractPrompt(this.activeInteractiveTarget),this.input.interactJustPressed&&this.activeInteractiveTarget&&this.handleInteract()}if(this.cameraSystem.update(e,this.player.position,this.terrain,this.player.currentFacingAngle,this.player.isMoving),this.state===1){this.input.isSprinting&&!this.lastSprintState&&this.memorySystem.recordSprintTrigger(),this.lastSprintState=this.input.isSprinting;let t=this.crystals.getCollectedCount(),n=this.worldInteractions.getCollectedShardsCount(),r=this.worldInteractions.inscriptions.filter(e=>e.read).length;this.memorySystem.updatePlayerTracking(e,this.player.position,this.input.isSprinting&&this.player.isMoving,t,n,r)}this.terrain.update(t),this.forest.update(t),this.lake.update(t,this.player.position),this.temple.update(t),this.portal.update(t),this.crystals.update(t),this.worldInteractions.update(e,t),this.villageHouses.update(e,t,this.player.position),this.npcManager.update(e,t,this.player.position,this.input.isSprinting),this.combatSystem.update(e,t,this.cameraSystem.camera.position),this.multiplayer.update(e,t,this.cameraSystem.camera.position),this.memorySystem.update(t),this.atmosphere.update(t,this.player.position);let i=this.state===0?this.cameraSystem.camera.position:this.player.position;if(this.worldLightPool.update(i,this.getMaxPooledLights(),n),this.state===1&&n-this.lastMinimapRenderMs>=66){this.lastMinimapRenderMs=n;let e=0;for(let t of this.combatSystem.enemies)t.isDead||(e<this.enemyBlipsBuffer.length?(this.enemyBlipsBuffer[e].pos.x=t.group.position.x,this.enemyBlipsBuffer[e].pos.z=t.group.position.z):this.enemyBlipsBuffer.push({pos:{x:t.group.position.x,z:t.group.position.z}}),e++);this.enemyBlipsBuffer.length=e;let t=this.multiplayer.remotePlayers.getMinimapBlips();this.ui.renderMinimap(this.player.position.x,this.player.position.z,this.cameraSystem.getYaw(),this.crystals.crystals,this.worldInteractions.shards,this.npcManager.getNPCMinimapBlips(),this.enemyBlipsBuffer,t,this.villageHouses.getMinimapHouseBlips())}this.input.clearFrameDeltas()}onWindowResize(){let e=window.innerWidth,t=window.innerHeight;this.cameraSystem.updateAspect(e/t),this.renderer.setSize(e,t),this.needsModalBackdropRender=!0,this.ui?.handleOrientationOrResize()}dispose(){this.clearPendingTimers(),Ju.clearAll(),this.villageHouses.dispose(),this.multiplayer.dispose(),this.sound.dispose(),this.renderer.dispose()}};function zd(){let e=document.getElementById(`root`)||document.body;try{new Rd(e);let t=()=>{try{let e=document.documentElement;!document.fullscreenElement&&!e.webkitFullscreenElement&&(e.requestFullscreen?e.requestFullscreen().catch(()=>{}):e.webkitRequestFullscreen&&e.webkitRequestFullscreen())}catch{}window.removeEventListener(`pointerdown`,t),window.removeEventListener(`touchstart`,t)};window.addEventListener(`pointerdown`,t,{passive:!0,once:!0}),window.addEventListener(`touchstart`,t,{passive:!0,once:!0})}catch(t){console.error(`Error starting ECHO Game:`,t),document.getElementById(`echo-boot-splash`)?.remove();let n=document.createElement(`div`);n.id=`echo-boot-error`,n.style.cssText=`position:fixed;inset:0;z-index:9999;background:#060a12;color:#e0fbf6;display:flex;align-items:center;justify-content:center;padding:1.5rem;font-family:sans-serif;`,n.innerHTML=`
      <div style="max-width:440px;width:100%;background:rgba(12,20,34,0.96);border:1.5px solid rgba(0,245,212,0.45);border-radius:16px;padding:1.4rem;text-align:center;">
        <h2 style="margin:0 0 0.6rem 0;color:#00f5d4;font-size:1.25rem;">تعذر تشغيل الرسوميات ثلاثية الأبعاد · WebGL Error</h2>
        <p style="margin:0 0 1rem 0;font-size:0.9rem;line-height:1.5;color:#cbd5e1;">تأكد من تفعيل تسريع الرسوميات (WebGL) على جهازك ثم أعد المحاولة.</p>
        <button id="echo-retry-boot-btn" style="padding:0.65rem 1.4rem;border-radius:10px;border:none;background:#00f5d4;color:#061214;font-weight:700;cursor:pointer;">إعادة المحاولة · Retry</button>
      </div>
    `,e.appendChild(n),document.getElementById(`echo-retry-boot-btn`)?.addEventListener(`click`,()=>{window.location.reload()})}}document.readyState===`loading`?document.addEventListener(`DOMContentLoaded`,zd):zd();
'use strict';
const K='hive_internal_125e04e071e8829be631ea0216dd4a0c9b707975fcecaf8c62c6a2ab43327d46';const T='https://hivetrust.onrender.com';const G='https://hivegate.onrender.com';
const DID='did:hive:hiveforce-finaudit';const ID={name:'HiveForce-FinAudit',purpose:'Financial audit agent — SOX compliance, transaction monitoring, fraud detection',capabilities:["sox_compliance","transaction_audit","fraud_detection","financial_reporting"],did:DID};
function h(x={}){return{'Content-Type':'application/json','x-hive-internal':K,...x}}
async function p(u,b){try{const r=await fetch(u,{method:'POST',headers:h(),body:JSON.stringify(b)});const t=await r.text();try{return{status:r.status,data:JSON.parse(t)}}catch{return{status:r.status,data:{raw:t}}}}catch(e){return{status:0,data:{error:e.message}}}}
async function registerWithHiveTrust(){return p(`${T}/v1/register`,{name:ID.name,purpose:ID.purpose,capabilities:ID.capabilities})}
async function registerWithHiveGate(){return p(`${G}/v1/gate/onboard`,{agent_name:'hive-fin-audit',purpose:ID.purpose})}
module.exports={AGENT_DID:DID,AGENT_IDENTITY:ID,registerWithHiveTrust,registerWithHiveGate};

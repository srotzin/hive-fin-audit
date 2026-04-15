'use strict';
const{Router}=require('express');const hc=require('../services/hive-client');const{getStats}=require('../services/finaudit-engine');const r=Router();const BT=new Date().toISOString();
r.get('/health',(_,s)=>s.json({status:'operational',service:'hive-fin-audit',version:'1.0.0',did:hc.AGENT_DID,uptime_seconds:Math.floor(process.uptime()),boot_time:BT}));
r.get('/.well-known/hive-pulse.json',(_,s)=>s.json({schema:'hive-pulse/v1',agent:'hive-fin-audit',did:hc.AGENT_DID,status:'online',capabilities:hc.AGENT_IDENTITY.capabilities,stats:getStats(),pulse_time:new Date().toISOString()}));
r.get('/.well-known/ai.json',(_,s)=>s.json({schema_version:'1.0',name:'HiveForce-FinAudit',description:'Financial audit agent — SOX compliance, transaction monitoring, fraud detection',type:'agent-service',did:hc.AGENT_DID,capabilities:hc.AGENT_IDENTITY.capabilities}));
r.get('/robots.txt',(_,s)=>s.type('text/plain').send(`User-agent: *\nAllow: /\n\n# HiveForce-FinAudit — DID: ${hc.AGENT_DID}`));
module.exports=r;

'use strict';
const express=require('express');const cors=require('cors');const app=express();const PORT=process.env.PORT||3021;
app.use(cors());app.use(express.json());app.use('/',require('./routes/health'));app.use('/',require('./routes/audit'));
app.get('/',(_,r)=>r.json({service:'hive-fin-audit',version:'1.0.0',description:'Financial audit agent — SOX compliance, transaction monitoring, fraud detection',endpoints:{"audit":"POST /v1/finaudit/audit","report":"GET /v1/finaudit/report/:id","stats":"GET /v1/finaudit/stats","records":"GET /v1/finaudit/records","health":"GET /health","pulse":"GET /.well-known/hive-pulse.json"}}));
const hc=require('./services/hive-client');
app.listen(PORT,async()=>{console.log(`[hive-fin-audit] Listening on port ${PORT}`);try{await hc.registerWithHiveTrust()}catch(e){}try{await hc.registerWithHiveGate()}catch(e){}});
module.exports=app;

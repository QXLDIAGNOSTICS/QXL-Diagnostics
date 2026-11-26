// One source for website text, JSON-LD, booking displays and exports.
// Null means UNVERIFIED, not zero, false, free, unavailable or accredited.
export const data = {
  site: {origin:'https://qxldiagnostics.com', name:'QXL Diagnostics', phone:'+919964639639'},
  facilities: [
    {id:'kengeri', name:'QXL Diagnostics — Kengeri', path:null, address:null, patientHours:null, processingHours:null,
      certificate:{number:'NABLM1126KA10694', supersedes:'MC-6849', renewal:'M-5294', issued:'2026-11-23', validUntil:'2030-11-22', standard:'ISO 15189:2022', evidence:'Owner-provided verified certificate details, 26 November 2026', certificateUrl:null, annexureUrl:null}},
    {id:'north-hub', name:'QXL Diagnostics — Super Speciality Lab North Hub', path:null,
      address:'North City Specialities, 1st Floor, Yelahanka New Town, Bengaluru', patientHours:null, processingHours:null,
      certificate:{number:'MC-10025', supersedes:null, renewal:null, issued:'2026-04-02', validUntil:'2030-04-01', standard:'ISO 15189:2022', evidence:'Owner-provided verified certificate details, 26 November 2026', certificateUrl:null, annexureUrl:null}}
  ],
  // One signed-off entry per test + processing site + specimen/method.
  // Never populate from certificate cover alone. Example shape in README.
  scope: [],
  tests: [
    ['hba1c','HbA1c test','/hba1c-test-bangalore'],
    ['thyroid','Thyroid test','/thyroid-test'],
    ['cbc','Complete blood count (CBC)',null],
    ['histopathology','Histopathology',null],
    ['lpa','Lipoprotein(a)',null],
    ['apob','Apolipoprotein B','/apob-test-bangalore']
  ].map(([id,name,path])=>({id,name,path,parameters:[],parameterCount:null,preparation:null,specimen:null,method:null,
    purpose:null,limitations:null,clinicalAssessment:null,turnaround:null,processingFacilityId:null,
    scopeEntryId:null,price:null,reportExampleUrl:null,reportExampleFictional:false})),
  localities:['JP Nagar','Jayanagar','Kengeri','Yelahanka'].map(name=>({id:name.toLowerCase().replaceAll(' ','-'),name,
    path:'/locations/'+name.toLowerCase().replaceAll(' ','-'),kind:'service-area',
    collectionVerified:false,collectionEvidence:null,pincodes:[],collectionHours:null,collectionFee:null,
    availabilityText:null,transportProcedure:null,processingFacilityIds:[]})),
  experts: [], // Only actual, consented, verified profiles. See README for fields.
  services: [{id:'interpretation',name:'Report interpretation',path:null,description:null,eligibleReports:null,
    expertIds:[],accessProcess:null,availability:null,fee:null,limitations:null}],
  pages: [], // All publication is opt-in; no live pages overwritten by the seed.
  redirects: [], // {from:'/old-path',to:'/retained-path'} only after crawl/GSC review.
  botPolicy:{training:'preserve',googleExtended:'preserve'}
};

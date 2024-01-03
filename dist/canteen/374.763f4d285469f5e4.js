"use strict";(self.webpackChunkcanteen=self.webpackChunkcanteen||[]).push([[374],{8559:(k,f,i)=>{i.d(f,{y:()=>d});var t=i(5879),e=i(4691);let d=(()=>{class p{static#t=this.\u0275fac=function(_){return new(_||p)};static#e=this.\u0275cmp=t.Xpm({type:p,selectors:[["app-order-history"]],decls:4,vars:3,consts:[[1,"container"],[1,"row"],[3,"orderHistory","pendingOrder","userorderhistory"]],template:function(_,y){1&_&&(t.TgZ(0,"section")(1,"div",0)(2,"div",1),t._UZ(3,"app-table",2),t.qZA()()()),2&_&&(t.xp6(3),t.Q6J("orderHistory",!1)("pendingOrder",!1)("userorderhistory",!0))},dependencies:[e.a]})}return p})()},3579:(k,f,i)=>{i.d(f,{d:()=>v});var t=i(5879),e=i(8889),d=i(1896),p=i(6814);const I=function(){return["./history"]},g=function(m){return{empId:m}},_=function(){return["./wallet-history"]};let y=(()=>{class m{static#t=this.\u0275fac=function(r){return new(r||m)};static#e=this.\u0275cmp=t.Xpm({type:m,selectors:[["app-user-routes"]],inputs:{empId:"empId"},decls:14,vars:10,consts:[[1,"communication-wrapper"],[1,"container"],[1,"row"],[1,"col-12"],[1,"card"],[1,"card-body"],["id","nav-tab","role","tablist",1,"nav","nav-tabs","d-flex","flex-wrap"],["routerLinkActive","active",1,"w-100","nav-item","nav-link",2,"flex","1",3,"routerLink","queryParams"]],template:function(r,o){1&r&&(t.TgZ(0,"section",0)(1,"div",1)(2,"div",2)(3,"div",3)(4,"div",4)(5,"div",5)(6,"ul",6)(7,"li")(8,"a",7),t._uU(9," Order History "),t.qZA()(),t.TgZ(10,"li")(11,"a",7),t._uU(12," Wallet History "),t.qZA()()(),t._UZ(13,"router-outlet"),t.qZA()()()()()()),2&r&&(t.xp6(8),t.Q6J("routerLink",t.DdM(4,I))("queryParams",t.VKq(5,g,o.empId)),t.xp6(3),t.Q6J("routerLink",t.DdM(7,_))("queryParams",t.VKq(8,g,o.empId)))},dependencies:[d.lC,d.rH,d.Od]})}return m})();function P(m,C){if(1&m){const n=t.EpF();t.TgZ(0,"div",17)(1,"button",18),t.NdJ("click",function(){t.CHM(n);const o=t.oxw();return t.KtG(o.goBack())}),t._uU(2,"Back"),t.qZA()()}}let v=(()=>{class m{constructor(n,r,o){this.http=n,this.route=r,this.router=o}ngOnInit(){this.route.queryParams.subscribe(n=>{if(n.empId)this.empId=+n.empId;else{const r=localStorage.getItem("user")&&JSON.parse(localStorage.getItem("user")).data.empDetails.EmployeeId;this.empId=r}this.getUserProfile()})}isUserProfileRoute(){return"/user-profile/"===this.router.url}goBack(){this.router.navigate(["/home"])}getUserProfile(){const n=localStorage.getItem("user")?JSON.parse(localStorage.getItem("user")).data.token:"",r=this.getEmpIdFromQueryParam();try{n&&(r?this.http.userProfile(n,r).subscribe(o=>{this.handleUserProfileResponse(o)}):this.http.userProfileWithoutEmpId(n).subscribe(o=>{this.handleUserProfileResponse(o)}))}catch(o){console.log(o)}}handleUserProfileResponse(n){n&&200===n.statusCode&&n.data&&(this.userProfileInfo={_id:n.data._id,EmployeeId:n.data.EmployeeId,FirstName:n.data.FirstName,LastName:n.data.LastName,role:n.data.role,email:n.data.email,balance:n.data.balance,updatedAt:n.data.updatedAt,wallet:n.data.wallet},this.setAvatarInitial(),console.log(n.message),console.log(this.userProfileInfo,"llllllllllll"))}getEmpIdFromQueryParam(){const r=new URLSearchParams(window.location.search).get("empId");return r?+r:null}setAvatarInitial(){this.avatarInitial=this.userProfileInfo?.FirstName?this.userProfileInfo.FirstName.charAt(0):""}static#t=this.\u0275fac=function(r){return new(r||m)(t.Y36(e.R),t.Y36(d.gz),t.Y36(d.F0))};static#e=this.\u0275cmp=t.Xpm({type:m,selectors:[["app-profile"]],decls:44,vars:8,consts:[[1,"container"],[1,"row","justify-content-between","align-items-start","mt-5"],["class","col-md-12 mb-3",4,"ngIf"],[1,"col-md-2","me-5","personal-info","d-flex","justify-content-center","align-items-center"],[1,"avatar"],[1,"col-md-9"],[1,"mb-3"],[1,"d-flex","justify-content-start"],[1,"col-md-4","me-4"],[1,"card","mb-4"],[1,"card-header"],[1,"card-title"],[1,"card-subtitle","mb-2","text-muted"],[1,"col-md-4"],[1,"col-md-12"],[1,"routes"],[3,"empId"],[1,"col-md-12","mb-3"],[1,"btn","btn-primary",3,"click"]],template:function(r,o){1&r&&(t.TgZ(0,"section")(1,"div",0)(2,"div",1),t.YNc(3,P,3,0,"div",2),t.TgZ(4,"div",3)(5,"div",4)(6,"span"),t._uU(7),t.qZA()()(),t.TgZ(8,"div",5)(9,"h6",6),t._uU(10,"Employee Info"),t.qZA(),t.TgZ(11,"div",7)(12,"div",8)(13,"div",9)(14,"div",10)(15,"h5",11),t._uU(16,"Employee ID"),t.qZA(),t.TgZ(17,"p",12),t._uU(18),t.qZA()(),t.TgZ(19,"div",10)(20,"h5",11),t._uU(21,"Name"),t.qZA(),t.TgZ(22,"p",12),t._uU(23),t.qZA()(),t.TgZ(24,"div",10)(25,"h5",11),t._uU(26,"Department"),t.qZA(),t.TgZ(27,"p",12),t._uU(28,"Open Source"),t.qZA()()()(),t.TgZ(29,"div",13)(30,"div",9)(31,"div",10)(32,"h5",11),t._uU(33,"Username"),t.qZA(),t.TgZ(34,"p",12),t._uU(35),t.qZA()(),t.TgZ(36,"div",10)(37,"h5",11),t._uU(38,"Email ID"),t.qZA(),t.TgZ(39,"p",12),t._uU(40),t.qZA()()()()()(),t.TgZ(41,"div",14)(42,"div",15),t._UZ(43,"app-user-routes",16),t.qZA()()()()()),2&r&&(t.xp6(3),t.Q6J("ngIf",o.isUserProfileRoute()),t.xp6(4),t.hij(" ",o.avatarInitial," "),t.xp6(11),t.Oqu(null==o.userProfileInfo?null:o.userProfileInfo.EmployeeId),t.xp6(5),t.AsE("",null==o.userProfileInfo?null:o.userProfileInfo.FirstName," ",null==o.userProfileInfo?null:o.userProfileInfo.LastName," "),t.xp6(12),t.Oqu(null==o.userProfileInfo?null:o.userProfileInfo.EmployeeId),t.xp6(5),t.Oqu(null==o.userProfileInfo?null:o.userProfileInfo.email),t.xp6(3),t.Q6J("empId",o.empId))},dependencies:[p.O5,y],styles:["h1[_ngcontent-%COMP%], h2[_ngcontent-%COMP%], h3[_ngcontent-%COMP%], h4[_ngcontent-%COMP%], h5[_ngcontent-%COMP%], h6[_ngcontent-%COMP%], p[_ngcontent-%COMP%]{margin:0 auto}.personal-info[_ngcontent-%COMP%]{height:15rem;background-color:#9122e8;border:none;border-radius:160px;width:20%}.personal-info[_ngcontent-%COMP%]   .avatar[_ngcontent-%COMP%]   span[_ngcontent-%COMP%]{color:#fff;font-size:30px}h6[_ngcontent-%COMP%]{margin:0;font-family:Poppins;border-bottom:2px solid black;font-size:1.25rem;line-height:1.6;color:#232360;font-weight:400}.card-header[_ngcontent-%COMP%]{background-color:#fff}"]})}return m})()},491:(k,f,i)=>{i.d(f,{O:()=>A});var t=i(9538),e=i(5879),d=i(5565),p=i(6814),I=i(4819);function g(a,c){1&a&&(e.TgZ(0,"div"),e._uU(1," No items found in the wallet history. "),e.qZA())}function _(a,c){1&a&&(e.TgZ(0,"th",20),e._uU(1,"Payment"),e.qZA())}function y(a,c){if(1&a&&(e.TgZ(0,"td",21),e._uU(1),e.qZA()),2&a){const l=c.$implicit;e.xp6(1),e.Oqu(l.payment)}}function P(a,c){1&a&&(e.TgZ(0,"th",20),e._uU(1,"Wallet Balance"),e.qZA())}function v(a,c){if(1&a&&(e.TgZ(0,"td",21),e._uU(1),e.qZA()),2&a){const l=c.$implicit;e.xp6(1),e.Oqu(l.updatedWallet)}}function m(a,c){1&a&&(e.TgZ(0,"th",20),e._uU(1,"Date"),e.qZA())}function C(a,c){if(1&a&&(e.TgZ(0,"td",21),e._uU(1),e.qZA()),2&a){const l=c.$implicit;e.xp6(1),e.Oqu(l.date)}}function n(a,c){1&a&&(e.TgZ(0,"th",20),e._uU(1,"Time"),e.qZA())}function r(a,c){if(1&a&&(e.TgZ(0,"td",21),e._uU(1),e.qZA()),2&a){const l=c.$implicit;e.xp6(1),e.Oqu(l.time)}}function o(a,c){1&a&&e._UZ(0,"tr",22)}function T(a,c){1&a&&e._UZ(0,"tr",23)}const O=function(){return[5,10,20,50]};function U(a,c){if(1&a){const l=e.EpF();e.TgZ(0,"table",9),e.ynx(1,10),e.YNc(2,_,2,0,"th",11),e.YNc(3,y,2,1,"td",12),e.BQk(),e.ynx(4,13),e.YNc(5,P,2,0,"th",11),e.YNc(6,v,2,1,"td",12),e.BQk(),e.ynx(7,14),e.YNc(8,m,2,0,"th",11),e.YNc(9,C,2,1,"td",12),e.BQk(),e.ynx(10,15),e.YNc(11,n,2,0,"th",11),e.YNc(12,r,2,1,"td",12),e.BQk(),e.YNc(13,o,1,0,"tr",16),e.YNc(14,T,1,0,"tr",17),e.qZA(),e.TgZ(15,"div",18)(16,"mat-paginator",19),e.NdJ("page",function(u){e.CHM(l);const h=e.oxw();return e.KtG(h.onPageChange(u))}),e.qZA()()}if(2&a){const l=e.oxw();e.Q6J("dataSource",l.dataSource),e.xp6(13),e.Q6J("matHeaderRowDef",l.displayedColumns),e.xp6(1),e.Q6J("matRowDefColumns",l.displayedColumns),e.xp6(2),e.Q6J("length",l.totalRecords)("pageSizeOptions",e.DdM(7,O))("pageSize",l.limit)("pageIndex",l.currentPage)}}let A=(()=>{class a{constructor(l){this.http=l,this.walletHistoryData=[],this.displayedColumns=["payment","updatedWallet","date","time"],this.wallet=[],this.employeeId=0,this.totalRecords=0,this.limit=10,this.currentPage=0}ngOnInit(){const l=localStorage.getItem("user")?JSON.parse(localStorage.getItem("user")).data.token:"",s=this.getEmpIdFromQueryParam();this.employeeWaletDetails(l,null!=s?s:void 0,this.currentPage,this.limit)}getEmpIdFromQueryParam(){const s=new URLSearchParams(window.location.search).get("empId");return s?+s:null}onPageChange(l){this.currentPage=l.pageIndex,this.limit=l.pageSize;const s=localStorage.getItem("user")?JSON.parse(localStorage.getItem("user")).data.token:"",u=this.getEmpIdFromQueryParam();this.employeeWaletDetails(s,u,this.currentPage,this.limit)}employeeWaletDetails(l,s,u,h){try{const Z=localStorage.getItem("user")?JSON.parse(localStorage.getItem("user")).data.token:"";this.http.employeeWaletDetails(Z,s,u,h).subscribe(w=>{this.wallet=w.data,this.dataSource=new t.by(this.wallet),console.log(this.wallet,"kkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkk")})}catch(Z){console.error("An error occurred:",Z)}}static#t=this.\u0275fac=function(s){return new(s||a)(e.Y36(d.l))};static#e=this.\u0275cmp=e.Xpm({type:a,selectors:[["app-wallet-history"]],decls:10,vars:2,consts:[[1,"wallet-history-container","pb-4"],[1,"wallet-history-card"],[1,"row","my-4"],[1,"col-12"],[1,"card"],[1,"card-body"],[1,"table-responsive","w-100"],[4,"ngIf","ngIfElse"],["walletHistoryTable",""],["mat-table","",1,"mat-elevation-z8",3,"dataSource"],["matColumnDef","payment"],["mat-header-cell","",4,"matHeaderCellDef"],["mat-cell","",4,"matCellDef"],["matColumnDef","updatedWallet"],["matColumnDef","date"],["matColumnDef","time"],["mat-header-row","",4,"matHeaderRowDef"],["mat-row","",4,"matRowDef","matRowDefColumns"],[1,"mat-paginator"],[3,"length","pageSizeOptions","pageSize","pageIndex","page"],["mat-header-cell",""],["mat-cell",""],["mat-header-row",""],["mat-row",""]],template:function(s,u){if(1&s&&(e.TgZ(0,"section",0)(1,"div",1)(2,"div",2)(3,"div",3)(4,"div",4)(5,"div",5)(6,"div",6),e.YNc(7,g,2,0,"div",7),e.YNc(8,U,17,8,"ng-template",null,8,e.W1O),e.qZA()()()()()()()),2&s){const h=e.MAs(9);e.xp6(7),e.Q6J("ngIf",0===(null==u.dataSource||null==u.dataSource.data?null:u.dataSource.data.length))("ngIfElse",h)}},dependencies:[p.O5,I.NW,t.BZ,t.fO,t.as,t.w1,t.Dz,t.nj,t.ge,t.ev,t.XQ,t.Gk]})}return a})()}}]);
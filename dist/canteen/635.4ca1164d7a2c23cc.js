"use strict";(self.webpackChunkcanteen=self.webpackChunkcanteen||[]).push([[635],{6635:(nt,C,s)=>{s.r(C),s.d(C,{PagesModule:()=>et});var g=s(6814),p=s(1896),t=s(5879),v=s(450),u=s(2425),x=s(2536),h=s(3026),M=s(8889),O=s(242),_=s(95),P=s(4836);const b=function(){return["/admin/dashboard"]};function y(n,r){1&n&&(t.TgZ(0,"li")(1,"a",37),t._uU(2,"Admin Panel"),t.qZA()()),2&n&&(t.xp6(1),t.Q6J("routerLink",t.DdM(1,b)))}function w(n,r){if(1&n){const e=t.EpF();t.TgZ(0,"div",30)(1,"button",31)(2,"span",32),t._uU(3," person "),t.qZA(),t.TgZ(4,"span"),t._uU(5),t.qZA()(),t.TgZ(6,"ul",33)(7,"li")(8,"a",34),t._uU(9),t.ALo(10,"currency"),t.qZA()(),t.YNc(11,y,3,2,"li",35),t.TgZ(12,"li")(13,"a",36),t.NdJ("click",function(){t.CHM(e);const i=t.oxw(2);return t.KtG(i.logout())}),t._uU(14,"Logout"),t.qZA()()()()}if(2&n){const e=t.oxw(2);t.xp6(5),t.hij(" ",e.userProfileDetails.FirstName," "),t.xp6(4),t.hij("Pending Balance: ",t.xi3(10,3,null==e.userProfileInfo?null:e.userProfileInfo.balance,"INR"),""),t.xp6(2),t.Q6J("ngIf",e.isAdmin)}}function Z(n,r){if(1&n){const e=t.EpF();t.TgZ(0,"button",38),t.NdJ("click",function(i){t.CHM(e);const a=t.oxw(2);return t.KtG(a.openLoginModal(i))}),t._uU(1,"Login"),t.qZA()}}function I(n,r){1&n&&t._UZ(0,"app-loader")}function T(n,r){if(1&n){const e=t.EpF();t.TgZ(0,"div",54)(1,"div",55)(2,"p"),t._uU(3),t.ALo(4,"titlecase"),t.qZA()(),t.TgZ(5,"div",56)(6,"button",57),t.NdJ("click",function(){const a=t.CHM(e).index,c=t.oxw(4);return t.KtG(c.decreaseQuantity(a))}),t._uU(7,"-"),t.qZA(),t.TgZ(8,"input",58),t.NdJ("ngModelChange",function(i){const c=t.CHM(e).index,l=t.oxw(4);return t.KtG(l.cartItems[c].quantity=i)}),t.qZA(),t.TgZ(9,"button",57),t.NdJ("click",function(){const a=t.CHM(e).index,c=t.oxw(4);return t.KtG(c.increaseQuantity(a))}),t._uU(10,"+"),t.qZA()(),t.TgZ(11,"div",59)(12,"p"),t._uU(13),t.ALo(14,"currency"),t.qZA()(),t.TgZ(15,"button",60),t.NdJ("click",function(){const a=t.CHM(e).index,c=t.oxw(4);return t.KtG(c.deleteItem(a))}),t._UZ(16,"i",61),t.qZA()()}if(2&n){const e=r.$implicit,o=r.index,i=t.oxw(4);t.xp6(3),t.hij("",t.lcZ(4,4,e.item_name)," "),t.xp6(5),t.Q6J("ngModel",i.cartItems[o].quantity)("disabled",!i.quantity),t.xp6(5),t.hij(" ",t.xi3(14,6,e.price,"INR"),"")}}function k(n,r){if(1&n){const e=t.EpF();t.TgZ(0,"div",46),t.YNc(1,I,1,0,"app-loader",35),t.TgZ(2,"div",47)(3,"p"),t._uU(4,"Item Name"),t.qZA(),t.TgZ(5,"p"),t._uU(6,"Item Quantity"),t.qZA(),t.TgZ(7,"p"),t._uU(8,"Item Price"),t.qZA(),t._UZ(9,"p"),t.qZA(),t.YNc(10,T,17,9,"div",48),t.TgZ(11,"div",49)(12,"div",50)(13,"p"),t._uU(14),t.ALo(15,"currency"),t.qZA()()(),t.TgZ(16,"div",51)(17,"div",52)(18,"button",53),t.NdJ("click",function(){t.CHM(e);const i=t.oxw(3);return t.KtG(i.confirmOrder())}),t._uU(19," Confirm Order "),t.qZA()()()()}if(2&n){const e=t.oxw(3);t.xp6(1),t.Q6J("ngIf",e.isLoading),t.xp6(9),t.Q6J("ngForOf",e.cartItems),t.xp6(4),t.hij(" Total: ",t.xi3(15,4,e.getTotalBalance(),"INR"),""),t.xp6(4),t.Q6J("disabled",!e.hasCartItems)}}function S(n,r){1&n&&(t.TgZ(0,"div",62)(1,"p"),t._uU(2," No Items Found In The Cart "),t.qZA()())}function A(n,r){if(1&n){const e=t.EpF();t.TgZ(0,"div",39)(1,"div",40)(2,"h4",41),t._uU(3,"Order Details"),t.qZA(),t.TgZ(4,"button",42),t.NdJ("click",function(){t.CHM(e);const i=t.oxw(2);return t.KtG(i.closeCanvas())}),t._UZ(5,"img",43),t.qZA()(),t.YNc(6,k,20,7,"div",44),t.YNc(7,S,3,0,"ng-template",null,45,t.W1O),t.qZA()}if(2&n){const e=t.MAs(8),o=t.oxw(2);t.xp6(6),t.Q6J("ngIf",o.cartItems.length>0)("ngIfElse",e)}}function q(n,r){if(1&n){const e=t.EpF();t.TgZ(0,"header",1)(1,"div",2)(2,"div",3)(3,"div",4)(4,"div",5)(5,"a")(6,"h2"),t._uU(7,"Seasia"),t.qZA()()(),t.TgZ(8,"div",6)(9,"div",7)(10,"button",8),t.NdJ("click",function(){t.CHM(e);const i=t.MAs(44),a=t.oxw();return t.KtG(a.openEnd(i))}),t._UZ(11,"i",9),t.TgZ(12,"span",10),t._uU(13),t.qZA()()(),t.TgZ(14,"div",11),t.YNc(15,w,15,6,"div",12),t.YNc(16,Z,2,0,"button",13),t.qZA()()(),t.TgZ(17,"div",14)(18,"div",15)(19,"div")(20,"div")(21,"h2")(22,"span",16),t._uU(23,"Eat"),t.qZA(),t.TgZ(24,"span",17),t._uU(25,"Fresh"),t.qZA()()(),t.TgZ(26,"div",18)(27,"h3"),t._uU(28,"Stay Young"),t.qZA()(),t.TgZ(29,"div",19)(30,"button",20),t.NdJ("click",function(){t.CHM(e);const i=t.oxw();return t.KtG(i.scrollToHomeSection())}),t._uU(31,"Order Now"),t.qZA()()()(),t.TgZ(32,"div",21)(33,"div",22)(34,"div"),t._UZ(35,"img",23),t.qZA()(),t.TgZ(36,"div",24)(37,"div"),t._UZ(38,"img",25),t.qZA()(),t.TgZ(39,"div",26)(40,"div"),t._UZ(41,"img",27),t.qZA()()()(),t.TgZ(42,"div",28),t.YNc(43,A,9,2,"ng-template",null,29,t.W1O),t.qZA()()()()}if(2&n){const e=t.oxw();t.xp6(10),t.Q6J("disabled",!e.hasToken),t.xp6(3),t.hij(" ",e.cartItemCount>0?e.cartItemCount:0," "),t.xp6(2),t.Q6J("ngIf",e.hasToken),t.xp6(1),t.Q6J("ngIf",!e.hasToken)}}let U=(()=>{class n{constructor(e,o,i,a,c,l){this.modalService=e,this.offcanvasService=o,this._https=i,this.toastr=a,this.router=c,this.scrollToService=l,this.showUserSection=!0,this.showAdminSection=!0,this.cartItems=[],this.isAdmin=!1,this.selectedBillStatus="unpaid",this.isLoading=!1,this.hasWallet=!1}ngOnInit(){this.isAdmin="admin"===this.getUserRole(),this.getUserRole(),this.loadCartItems(),this.loadBillStatus(),this.getUserProfile()}getUserRole(){return localStorage.getItem("user")?JSON.parse(localStorage.getItem("user")).data.empDetails.role:""}getTotalBalance(){let e=0;return this.cartItems&&this.cartItems.forEach(o=>{e+=o.price}),e}get hasToken(){return!(!localStorage.getItem("user")||!JSON.parse(localStorage.getItem("user")).data.token)}get hasCartItems(){const e=localStorage.getItem("cartItems");return!!e&&JSON.parse(e).length>0}get cartItemCount(){const e=localStorage.getItem("cartItems");return e?JSON.parse(e).length:0}get userProfileDetails(){return localStorage.getItem("user")?JSON.parse(localStorage.getItem("user")).data.empDetails:""}get wallet(){return localStorage.getItem("user")?JSON.parse(localStorage.getItem("user")).data.empDetails.wallet:""}get totalBalance(){return localStorage.getItem("user")?JSON.parse(localStorage.getItem("user")).data.empDetails.balance:""}saveCartItems(){localStorage.setItem("cartItems",JSON.stringify(this.cartItems))}saveBillStatus(e){localStorage.setItem("selectedBillStatus",e)}loadBillStatus(){const e=localStorage.getItem("selectedBillStatus");e&&(this.selectedBillStatus=e)}loadCartItems(){const e=localStorage.getItem("cartItems");e?(this.cartItems=JSON.parse(e),this.cartItems.forEach(o=>{o.initialPrice=o.price}),this.emptyCart=!1):this.emptyCart=!0}getTotalPrice(){let e=0;return this.cartItems&&this.cartItems.forEach(o=>{e+=o.price}),e}scrollToHomeSection(){this.scrollToService.scrollTo({target:"homeSection",offset:-50,duration:0})}openEnd(e){this.offcanvasService.open(e,{panelClass:"details-panel",position:"end"}),this.loadCartItems()}openLoginModal(e){this.modalService.open(x.z,{backdrop:"static",keyboard:!1,size:"lg",windowClass:"custom-modal"}).componentInstance.modalType="login-modal"}setBillStatus(e){this.selectedBillStatus=e,this.saveBillStatus(e)}confirmOrder(){try{const e=localStorage.getItem("cartItems");if(e){const o=JSON.parse(e);if(this.isLoading=!0,o){const l={bill_status:"unpaid",order_rec:o.map(d=>({itemId:d.itemId,quantity:d.quantity?d.quantity.toString():"0",item_name:d.item_name,item_type:d.item_type,price:d.price})),emp_id:"3673"},m=localStorage.getItem("user")?JSON.parse(localStorage.getItem("user")).data.token:"";this._https.placeOrder(l,m).subscribe(d=>{console.log(d),this.isLoading=!0,localStorage.removeItem("cartItems"),this.offcanvasService.dismiss(),this.loadCartItems(),this.cartItems=[],this.toastr.success("order placed succesfully")}).add(()=>{this.isLoading=!1})}else console.log("No items in the cart.")}else console.log("No items in the cart.")}catch(e){console.error("Error placing order:",e)}}deleteItem(e){this.cartItems.splice(e,1),localStorage.setItem("cartItems",JSON.stringify(this.cartItems))}increaseQuantity(e){this.cartItems[e].quantity<10&&(this.cartItems[e].quantity++,this.updatePrice(e))}decreaseQuantity(e){this.cartItems[e].quantity>1&&(this.cartItems[e].quantity--,this.updatePrice(e))}updatePrice(e){this.cartItems[e].price=this.cartItems[e].initialPrice*this.cartItems[e].quantity,this.saveCartItems()}getUserProfile(){console.log("kkkkkkkkkkkkkkkkk"),console.log(";;;;;;;;;;;;;;;;;;;;;;;;;;");const e=localStorage.getItem("user")?JSON.parse(localStorage.getItem("user")).data.token:"",o=localStorage.getItem("user")?JSON.parse(localStorage.getItem("user")).data.empDetails.EmployeeId:"";try{e&&o&&(console.log("sss"),this._https.userProfile(e,o).subscribe(i=>{i&&i.data&&i.data.length>0&&(this.userProfileInfo=i.data[0],console.log(i.message),console.log(this.userProfileInfo,"llllllllllll"))}))}catch(i){console.log(i)}}logout(){localStorage.clear(),this.toastr.success("Log-out Successful")}closeCanvas(){this.offcanvasService.dismiss()}static#t=this.\u0275fac=function(o){return new(o||n)(t.Y36(h.FF),t.Y36(h._B),t.Y36(M.R),t.Y36(u._W),t.Y36(p.F0),t.Y36(O.ij))};static#e=this.\u0275cmp=t.Xpm({type:n,selectors:[["app-header"]],decls:1,vars:1,consts:[["id","user",4,"ngIf"],["id","user"],[1,"container"],["id","user",1,"row","justify-content-center"],[1,"upper-header","d-flex"],[1,"logo"],[1,"header-menu","d-flex","justify-content-end","align-items-center"],[1,"cart","d-flex","justify-content-end"],["type","button","data-bs-toggle","offcanvas",1,"bg-transparent","btn-outline-light","border-0",3,"disabled","click"],["aria-hidden","true",1,"fa","fa-shopping-cart","position-absolute"],[1,"badge","badge-danger","position-relative","item-counter"],[1,"login","d-flex","justify-content-end"],["class","dropdown custom-dropdown",4,"ngIf"],["class","rounded-pill btn btn-primary rounded-pill","data-toggle","modal","data-target","#loginModal",3,"click",4,"ngIf"],[1,"lower-header","d-flex"],[1,"left-text","d-flex","flex-column","justify-content-center","align-items-center"],[1,"black-text"],[1,"purple-text"],[1,"mb-5"],[1,"mb-1"],[3,"click"],[1,"right-images","d-flex","align-items-center"],[1,"left-image"],["src","assets/image 3.png","alt","nimbu-panni"],[1,"middle-image"],["src","assets/image 4.png","alt","aunty"],[1,"right-image"],["src","assets/image 1.png","alt","burger"],[1,"sidebar"],["content",""],[1,"dropdown","custom-dropdown"],["type","button","id","dropdownMenuButton1","data-bs-toggle","dropdown","aria-expanded","false",1,"btn","btn-secondary","rounded-pill","btn","btn-primary","rounded-pill","dropdown-toggle","profile-button"],[1,"material-symbols-rounded"],["aria-labelledby","dropdownMenuButton1",1,"dropdown-menu"],[1,"dropdown-item","disabled-link"],[4,"ngIf"],[1,"dropdown-item",3,"click"],["routerLinkActive","router-link-active",1,"dropdown-item",3,"routerLink"],["data-toggle","modal","data-target","#loginModal",1,"rounded-pill","btn","btn-primary","rounded-pill",3,"click"],[1,"custom-offcanvas-content"],[1,"offcanvas-header"],[1,"offcanvas-title"],["type","button",3,"click"],["src","assets/close-circle-svgrepo-com (2) 1.png","alt","close button"],["class","offcanvas-body",4,"ngIf","ngIfElse"],["emptyCart",""],[1,"offcanvas-body"],[1,"d-flex","justify-content-between","align-items-center","item-info-body","item-head"],["class","d-flex justify-content-between align-items-center item-info-body",4,"ngFor","ngForOf"],[1,"d-flex","justify-content-end","align-items-center","item-info-body"],[1,"item-name-info",2,"width","38%"],[1,"text-end","d-flex","flex-column","pt-3"],[1,"pt-2","d-grid"],[1,"btn","btn-outline-primary",3,"disabled","click"],[1,"d-flex","justify-content-between","align-items-center","item-info-body"],[1,"item-name-info"],[1,"d-flex","quantity-button","align-items-center"],[1,"quantity-btn",3,"click"],["type","number","min","1",1,"quantity-input","text-center",3,"ngModel","disabled","ngModelChange"],[2,"width","70px"],[1,"me-1","bg-transparent",3,"click"],["aria-hidden","true",1,"fa","fa-trash"],[1,"empty-cart-message","text-center"]],template:function(o,i){1&o&&t.YNc(0,q,45,4,"header",0),2&o&&t.Q6J("ngIf",i.showUserSection)},dependencies:[g.sg,g.O5,p.rH,p.Od,_.Fj,_.wV,_.JJ,_.qQ,_.On,P.R,g.rS,g.H9],styles:["header[_ngcontent-%COMP%]{background:linear-gradient(75.98deg,#ffcb46 0%,#eeb219 100.74%,#ffdc82 100.75%);height:465px}header[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]{cursor:pointer;font-family:Poppins;font-size:16px;font-weight:400}header[_ngcontent-%COMP%]   .disabled-link[_ngcontent-%COMP%]{pointer-events:none;color:#999;text-decoration:none;cursor:not-allowed}header[_ngcontent-%COMP%]   .upper-header[_ngcontent-%COMP%]{margin-top:1%}header[_ngcontent-%COMP%]   .upper-header[_ngcontent-%COMP%]   .logo[_ngcontent-%COMP%]{width:50%;display:flex;align-items:center}header[_ngcontent-%COMP%]   .upper-header[_ngcontent-%COMP%]   .logo[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%]{font-family:Poppins;font-size:24px;font-weight:400;line-height:36px;margin:0}header[_ngcontent-%COMP%]   .upper-header[_ngcontent-%COMP%]   .header-menu[_ngcontent-%COMP%]{width:50%}header[_ngcontent-%COMP%]   .upper-header[_ngcontent-%COMP%]   .header-menu[_ngcontent-%COMP%]   .cart[_ngcontent-%COMP%]{width:10%}header[_ngcontent-%COMP%]   .upper-header[_ngcontent-%COMP%]   .header-menu[_ngcontent-%COMP%]   .cart[_ngcontent-%COMP%]   i[_ngcontent-%COMP%]{margin-right:5px;font-size:30px}header[_ngcontent-%COMP%]   .upper-header[_ngcontent-%COMP%]   .header-menu[_ngcontent-%COMP%]   .login[_ngcontent-%COMP%]{width:30%}header[_ngcontent-%COMP%]   .upper-header[_ngcontent-%COMP%]   .header-menu[_ngcontent-%COMP%]   .login[_ngcontent-%COMP%]   .profile-button[_ngcontent-%COMP%]{width:100%;height:46px;border:1px;background:linear-gradient(0deg,#9122e8,#9122e8);color:#fff;font-family:Poppins;font-size:18px;font-weight:600;line-height:27px;outline:#9122e8;display:flex;align-items:center}header[_ngcontent-%COMP%]   .upper-header[_ngcontent-%COMP%]   .header-menu[_ngcontent-%COMP%]   .login[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]{width:140px;height:46px;border:1px;background:linear-gradient(0deg,#9122e8,#9122e8);color:#fff;font-family:Poppins;font-size:18px;font-weight:600;line-height:27px;outline:#9122e8}header[_ngcontent-%COMP%]   .lower-header[_ngcontent-%COMP%]{background:#ffffff;width:1200px;min-height:487px;border-radius:30px;z-index:1;margin-top:2%;box-shadow:0 10px 20px #0000001a}header[_ngcontent-%COMP%]   .lower-header[_ngcontent-%COMP%]   .left-text[_ngcontent-%COMP%]{width:40%}header[_ngcontent-%COMP%]   .lower-header[_ngcontent-%COMP%]   .left-text[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%]{font-family:PoetsenOne;font-size:96px;font-weight:400;line-height:115px;letter-spacing:2px}header[_ngcontent-%COMP%]   .lower-header[_ngcontent-%COMP%]   .left-text[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%]   .black-text[_ngcontent-%COMP%]{color:#000}header[_ngcontent-%COMP%]   .lower-header[_ngcontent-%COMP%]   .left-text[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%]   .purple-text[_ngcontent-%COMP%]{color:#9122e8}header[_ngcontent-%COMP%]   .lower-header[_ngcontent-%COMP%]   .left-text[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%]{font-family:PoetsenOne;font-size:60px;font-weight:400;line-height:72px;letter-spacing:0em;text-align:left}header[_ngcontent-%COMP%]   .lower-header[_ngcontent-%COMP%]   .left-text[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]{width:200px;height:50px;border-radius:50px;border:1px solid #9122e8;background-color:transparent;transition:all .3s ease-in-out;color:#9122e8}header[_ngcontent-%COMP%]   .lower-header[_ngcontent-%COMP%]   .left-text[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]:hover{background-color:#9122e8;color:#fff}header[_ngcontent-%COMP%]   .lower-header[_ngcontent-%COMP%]   .right-images[_ngcontent-%COMP%]{width:60%}header[_ngcontent-%COMP%]   .lower-header[_ngcontent-%COMP%]   .right-images[_ngcontent-%COMP%]   .left-image[_ngcontent-%COMP%]{height:0px;width:154px}header[_ngcontent-%COMP%]   .lower-header[_ngcontent-%COMP%]   .right-images[_ngcontent-%COMP%]   .left-image[_ngcontent-%COMP%]   div[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]{width:185.92px;height:185.92px;transform:rotate(-3.39deg)}header[_ngcontent-%COMP%]   .lower-header[_ngcontent-%COMP%]   .right-images[_ngcontent-%COMP%]   .middle-image[_ngcontent-%COMP%]{width:400px}header[_ngcontent-%COMP%]   .lower-header[_ngcontent-%COMP%]   .right-images[_ngcontent-%COMP%]   .middle-image[_ngcontent-%COMP%]   div[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]{width:484px;height:454px}header[_ngcontent-%COMP%]   .lower-header[_ngcontent-%COMP%]   .right-images[_ngcontent-%COMP%]   .right-image[_ngcontent-%COMP%]{height:22%}header[_ngcontent-%COMP%]   .lower-header[_ngcontent-%COMP%]   .right-images[_ngcontent-%COMP%]   .right-image[_ngcontent-%COMP%]   div[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]{width:225.84px;height:225.84px;transform:rotate(15.6deg)}.offcanvas-header[_ngcontent-%COMP%]{border:1px solid #dddddd}.offcanvas-header[_ngcontent-%COMP%]   h4[_ngcontent-%COMP%]{font-family:Poppins;font-size:20px;font-weight:500}.offcanvas-header[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]{background:transparent;border:1px}.offcanvas-body[_ngcontent-%COMP%]{height:93vh}.offcanvas-body[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]{margin:0 auto}.offcanvas-body[_ngcontent-%COMP%]   app-loader[_ngcontent-%COMP%]{display:flex;min-height:600px;position:absolute;width:210%;z-index:999;right:2px;align-items:center}.item-info-body[_ngcontent-%COMP%]{height:42px;border-radius:4px;border:1px solid #e2e9ef;margin-bottom:10px}.item-info-body[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]{font-family:Poppins;font-size:15px;font-weight:400}.item-info-body[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]{border:1px}.item-info-body[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]   i[_ngcontent-%COMP%]{color:red;width:18px;height:17.14px}.item-info-body[_ngcontent-%COMP%]   .item-name-info[_ngcontent-%COMP%]{margin-left:25px;width:70px}.text-end[_ngcontent-%COMP%]   .confirm-button[_ngcontent-%COMP%]{width:167px;height:40px;border:1px;border-radius:45px;color:#fff;background-color:#6d00c2;font-family:Poppins;font-size:15px;font-weight:400}.text-end[_ngcontent-%COMP%]   .cancel-button[_ngcontent-%COMP%]{width:130px;height:40px;border:1px solid #787878;border-radius:45px;background-color:#fff;color:#787878}.text-end[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]{margin:5px}.edit-field[_ngcontent-%COMP%]{position:absolute;right:-4px;top:-7px}.edit-field[_ngcontent-%COMP%]   span[_ngcontent-%COMP%]{cursor:pointer;font-size:19px}.item-head[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]{padding:10px 16px!important;font-size:14px!important;text-align:center!important;font-weight:600!important;cursor:pointer;margin:1px}.quantity-button[_ngcontent-%COMP%]{display:flex;align-items:center}.quantity-btn[_ngcontent-%COMP%]{background-color:#9122e8;color:#fff;padding:5px 10px;cursor:pointer;border:none}.quantity-btn[_ngcontent-%COMP%]:hover{background-color:#9122e8}.quantity-input[_ngcontent-%COMP%]{width:45px;margin:0 10px;padding:5px;text-align:center;border:1px solid #ccc;border-radius:4px}.quantity-input[_ngcontent-%COMP%]:disabled{background-color:#eee}.item-counter[_ngcontent-%COMP%]{right:-20px;top:-9px;background:linear-gradient(0deg,#9122e8,#9122e8);color:#fff}.admin-header[_ngcontent-%COMP%]{height:100px}.empty-cart-message[_ngcontent-%COMP%]{padding:20px;background-color:#f8d7da;border:1px solid #f5c6cb;border-radius:5px;margin:10px;color:#721c24}.empty-cart-message[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]{margin:0;font-size:16px}input[_ngcontent-%COMP%]::-webkit-outer-spin-button, input[_ngcontent-%COMP%]::-webkit-inner-spin-button{-webkit-appearance:none;margin:0}.custom-dropdown[_ngcontent-%COMP%]:after{display:none}"]})}return n})(),N=(()=>{class n{static#t=this.\u0275fac=function(o){return new(o||n)};static#e=this.\u0275cmp=t.Xpm({type:n,selectors:[["app-footer"]],decls:10,vars:0,consts:[[1,"container"],[1,"row"],[1,"d-flex","justify-content-center","align-items-center"],["aria-hidden","true",1,"fa","fa-heart"]],template:function(o,i){1&o&&(t.TgZ(0,"footer")(1,"div",0)(2,"div",1)(3,"div",2)(4,"span"),t._uU(5,"Made with"),t.qZA(),t.TgZ(6,"span"),t._UZ(7,"i",3),t.qZA(),t.TgZ(8,"span"),t._uU(9,"by OS Team"),t.qZA()()()()())},styles:["footer[_ngcontent-%COMP%]{background-color:#2f2f2f}footer[_ngcontent-%COMP%]   div[_ngcontent-%COMP%]{min-height:65px}footer[_ngcontent-%COMP%]   div[_ngcontent-%COMP%]   span[_ngcontent-%COMP%]{font-family:Poppins;font-size:16px;font-weight:300;line-height:24px;letter-spacing:.5em;color:#fff}footer[_ngcontent-%COMP%]   div[_ngcontent-%COMP%]   span[_ngcontent-%COMP%]   i[_ngcontent-%COMP%]{color:red}"]})}return n})(),J=(()=>{class n{constructor(e){this.scrollToService=e}scrollToHomeSection(){this.scrollToService.scrollTo({target:"homeSection",offset:-50,duration:0})}static#t=this.\u0275fac=function(o){return new(o||n)(t.Y36(O.ij))};static#e=this.\u0275cmp=t.Xpm({type:n,selectors:[["app-about-us"]],decls:17,vars:0,consts:[[1,"container"],[1,"row","d-flex","justify-content-center"],[1,"about-us","d-flex","justify-content-between","p-0"],[1,"employee-images"],["src","/assets/image 2.png","alt","employee photo"],[1,"team-details","d-flex","align-items-center","text-start"],[2,"height","500px"],[1,"title","d-flex","justify-content-end"],[1,"body","d-flex","justify-content-center"],[1,"footer","d-flex","justify-content-end"],[3,"click"]],template:function(o,i){1&o&&(t.TgZ(0,"section")(1,"div",0)(2,"div",1)(3,"div",2)(4,"div",3),t._UZ(5,"img",4),t.qZA(),t.TgZ(6,"div",5)(7,"div",6)(8,"div",7)(9,"h2"),t._uU(10,"Meet Our Team"),t.qZA()(),t.TgZ(11,"div",8)(12,"p"),t._uU(13,"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent tincidunt sodales est non facilisis. Maecenas hendrerit lectus sit amet nunc lacinia, a dictum ex mattis. Vestibulum a erat ac metus fermentum porta in vitae dui. Proin vulputate leo ac urna lacinia cursus. Curabitur in auctor leo. Vestibulum in sem tristique, rhoncus eros a, congue sapien. Aenean pretium porttitor mauris, id facilisis quam rhoncus ut. Sed convallis odio in augue pharetra rhoncus. Sed sagittis diam ut mauris dapibus scelerisque. "),t.qZA()(),t.TgZ(14,"div",9)(15,"button",10),t.NdJ("click",function(){return i.scrollToHomeSection()}),t._uU(16,"Order Now"),t.qZA()()()()()()()())},styles:[".about-us[_ngcontent-%COMP%]{min-height:563px;background-color:#f6f6f6;width:91%}.about-us[_ngcontent-%COMP%]   .employee-images[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]{width:579px;height:563px}.about-us[_ngcontent-%COMP%]   .team-details[_ngcontent-%COMP%]   .title[_ngcontent-%COMP%]{width:59%;height:15%}.about-us[_ngcontent-%COMP%]   .team-details[_ngcontent-%COMP%]   .title[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%]{font-family:PoetsenOne;font-size:44px;font-weight:400}.about-us[_ngcontent-%COMP%]   .team-details[_ngcontent-%COMP%]   .body[_ngcontent-%COMP%]{height:55%}.about-us[_ngcontent-%COMP%]   .team-details[_ngcontent-%COMP%]   .body[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]{width:80%;font-family:Poppins;font-size:16px;font-weight:400}.about-us[_ngcontent-%COMP%]   .team-details[_ngcontent-%COMP%]   .footer[_ngcontent-%COMP%]{width:42%}.about-us[_ngcontent-%COMP%]   .team-details[_ngcontent-%COMP%]   .footer[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]{width:200px;height:50px;border-radius:50px;border:1px solid #9122e8;background-color:transparent;color:#9122e8;transition:all .3s ease-in-out}.about-us[_ngcontent-%COMP%]   .team-details[_ngcontent-%COMP%]   .footer[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]:hover{background-color:#9122e8;color:#fff}"],changeDetection:0})}return n})(),H=(()=>{class n{constructor(e,o){this.socketService=e,this.toastr=o,this.messages=[]}ngOnInit(){this.socketService.on("message").subscribe(e=>{console.log("Received a message from the server:",e),this.messages.push(e),this.toastr.success(`New message: ${e}`)}),this.socketService.on("notification").subscribe(e=>{console.log("Received a notification from the server:",e),this.messages.push(e),this.toastr.info(`New notification: ${e}`)})}static#t=this.\u0275fac=function(o){return new(o||n)(t.Y36(v.y),t.Y36(u._W))};static#e=this.\u0275cmp=t.Xpm({type:n,selectors:[["app-routes"]],decls:7,vars:0,template:function(o,i){1&o&&(t.TgZ(0,"div"),t._UZ(1,"app-header"),t.qZA(),t.TgZ(2,"div"),t._UZ(3,"router-outlet"),t.qZA(),t.TgZ(4,"div"),t._UZ(5,"app-about-us"),t.qZA(),t._UZ(6,"app-footer"))},dependencies:[p.lC,U,N,J],styles:["div[_ngcontent-%COMP%]{min-height:600px}"]})}return n})();var z=s(5565);function j(n,r){if(1&n&&(t.TgZ(0,"div",13)(1,"p",14),t._uU(2),t.qZA(),t.TgZ(3,"p",15),t._uU(4),t.qZA()()),2&n){const e=t.oxw().$implicit,o=t.oxw(3);t.xp6(2),t.Oqu(o.selectedCategory),t.xp6(2),t.hij("Timing: ",e.time,"")}}function F(n,r){if(1&n&&(t.TgZ(0,"div"),t.YNc(1,j,5,2,"div",12),t.qZA()),2&n){const e=r.$implicit,o=t.oxw(3);t.xp6(1),t.Q6J("ngIf",e.title.toLowerCase()===o.selectedCategory.toLowerCase())}}function Y(n,r){if(1&n&&(t.TgZ(0,"div"),t.YNc(1,F,2,1,"div",11),t.qZA()),2&n){const e=t.oxw(2);t.xp6(1),t.Q6J("ngForOf",e.meals)}}function B(n,r){1&n&&(t.TgZ(0,"div",16),t._UZ(1,"app-loader"),t.qZA())}function L(n,r){1&n&&(t.TgZ(0,"div")(1,"p",21),t._uU(2,"Please wait, the menu will be updated soon!"),t.qZA()())}function Q(n,r){if(1&n){const e=t.EpF();t.TgZ(0,"div",22)(1,"div",23)(2,"div",24),t.NdJ("click",function(){const a=t.CHM(e).$implicit,c=t.oxw(5);return t.KtG(c.addItemToCart(a.item_name,a.price,a._id))}),t.TgZ(3,"div")(4,"h6",25),t._uU(5),t.ALo(6,"titlecase"),t.qZA(),t.TgZ(7,"p",21),t._uU(8),t.qZA()()()()()}if(2&n){const e=r.$implicit;t.xp6(5),t.Oqu(t.lcZ(6,2,e.item_name)),t.xp6(3),t.hij("RS. ",e.price,"")}}function R(n,r){if(1&n&&(t.TgZ(0,"div",19),t.YNc(1,L,3,0,"div",0),t.YNc(2,Q,9,4,"div",20),t.qZA()),2&n){const e=t.oxw().$implicit;t.xp6(1),t.Q6J("ngIf",!e.items.length),t.xp6(1),t.Q6J("ngForOf",e.items)}}function E(n,r){if(1&n&&(t.TgZ(0,"div"),t.YNc(1,R,3,2,"div",18),t.qZA()),2&n){const e=r.$implicit,o=t.oxw(3);t.xp6(1),t.Q6J("ngIf",e.title.toLowerCase()===o.selectedCategory.toLowerCase())}}function $(n,r){if(1&n&&(t.TgZ(0,"div",17),t.YNc(1,E,2,1,"div",11),t.qZA()),2&n){const e=t.oxw(2);t.xp6(1),t.Q6J("ngForOf",e.meals)}}function D(n,r){if(1&n&&(t.TgZ(0,"section")(1,"div",1)(2,"div",2)(3,"div",3)(4,"div",4),t._UZ(5,"img",5),t.qZA()(),t.TgZ(6,"div",6)(7,"div",7)(8,"div"),t.YNc(9,Y,2,1,"div",0),t.YNc(10,B,2,0,"div",8),t.qZA(),t.YNc(11,$,2,1,"div",9),t.TgZ(12,"div",10)(13,"p"),t._uU(14,"click item to add in menu"),t.qZA()()()()()(),t.Hsn(15),t.qZA()),2&n){const e=t.oxw();t.xp6(9),t.Q6J("ngIf",e.meals&&e.meals.length>0),t.xp6(1),t.Q6J("ngIf",!e.meals||0===e.meals.length),t.xp6(1),t.Q6J("ngIf",e.meals&&e.meals.length>0)}}const G=[[["",8,"additemtocart-meal-card"]]],K=[".addItemToCart-meal-card"];let V=(()=>{class n{constructor(e,o,i,a,c){this._https=e,this.toastr=o,this.http=i,this.modalService=a,this.router=c,this.displayNormalMealCard=!1,this.displayAddItemToCartCard=!1,this.displayTotalItems=!1,this.selectedItemChange=new t.vpe,this.meals=[],this.submenu=[],this.items=[],this.totalMeals=[]}ngOnInit(){console.log("Meals:",this.meals),console.log("Selected Category:",this.selectedCategory),this.filterMeals()}filterMeals(){try{this._https.menuList().subscribe(e=>{e.data&&e.data.length>0&&(this.meals=e.data)})}catch(e){console.error(e),this.toastr.error("An unexpected error occurred. Please try again later.")}}openLoginModal(e){this.modalService.open(x.z,{backdrop:"static",keyboard:!1,size:"lg",windowClass:"custom-modal"}).componentInstance.modalType="login-modal"}addItemToCart(e,o,i){const a=localStorage.getItem("user")?JSON.parse(localStorage.getItem("user")).data.empDetails:null;if(!a)return this.openLoginModal(event),void this.toastr.error("You must be logged in to add items to the cart.");if("admin"===a.role)return this.toastr.error("Admins are restricted from ordering items from User panel"),void this.router.navigate(["/custom-order"]);const c={item_name:e,quantity:1,price:o,itemId:i},l=localStorage.getItem("cartItems");let m=[];l&&(m=JSON.parse(l),m.some(d=>d.item_name===e))?this.toastr.error("Item with the same name is already in the cart."):(m.push(c),localStorage.setItem("cartItems",JSON.stringify(m)),this.toastr.success("Item added to cart successfully!"))}isMealCardEnabled(e){const o=new Date,i=new Date,[a,c]=e.split(" - ");o.setHours(parseInt(a.split(":")[0]),parseInt(a.split(":")[1])-15,0);const l=new Date(i);return l.setHours(parseInt(c.split(":")[0]),parseInt(c.split(":")[1])+15,0),i>=o&&i<=l}static#t=this.\u0275fac=function(o){return new(o||n)(t.Y36(M.R),t.Y36(u._W),t.Y36(z.l),t.Y36(h.FF),t.Y36(p.F0))};static#e=this.\u0275cmp=t.Xpm({type:n,selectors:[["app-meal-card"]],inputs:{selectedCategory:"selectedCategory",displayNormalMealCard:"displayNormalMealCard",displayAddItemToCartCard:"displayAddItemToCartCard",displayTotalItems:"displayTotalItems"},outputs:{selectedItemChange:"selectedItemChange"},ngContentSelectors:K,decls:1,vars:1,consts:[[4,"ngIf"],[1,"container","mt-4"],[1,"row","w-100"],[1,"col-md-4","p-0","meal-image","d-flex","justify-content-center","align-items-center"],[1,"card","border-0","bg-transparent"],["src","assets/aloo-paratha-gobi-paratha-also-known-as-potato-cauliflower-stuffed-flatbread-dish-originating-from-indian-subcontinent 1.png","alt","Image",1,"card-img-top"],[1,"col-md-8","meal-info","d-flex","align-items-center"],[1,"card","border-0","bg-transparent","w-100"],["class","d-flex justify-content-center",4,"ngIf"],["class","card-body p-0","style","min-height: 210px;",4,"ngIf"],[1,"d-flex","justify-content-end","description"],[4,"ngFor","ngForOf"],["class","d-flex justify-content-between align-items-center mb-20","style","height: 45px;",4,"ngIf"],[1,"d-flex","justify-content-between","align-items-center","mb-20",2,"height","45px"],[1,"card-title","m-0"],[1,"card-time","d-flex","align-items-center"],[1,"d-flex","justify-content-center"],[1,"card-body","p-0",2,"min-height","210px"],["class"," d-flex flex-wrap gap-3",4,"ngIf"],[1,"d-flex","flex-wrap","gap-3"],["class","card-items",4,"ngFor","ngForOf"],[1,"card-text","text-muted"],[1,"card-items"],[1,"card","border-0","shadow","h-100"],[1,"card-body","inner-body","d-flex","justify-content-center","align-items-center","text-center",3,"click"],[1,"card-subtitle","mb-2"]],template:function(o,i){1&o&&(t.F$t(G),t.YNc(0,D,16,3,"section",0)),2&o&&t.Q6J("ngIf",i.displayAddItemToCartCard)},dependencies:[g.sg,g.O5,P.R,g.rS],styles:["section[_ngcontent-%COMP%]{background-color:#f6f6f6;display:flex;flex-direction:column;width:1200px;overflow:hidden}.disabled-card[_ngcontent-%COMP%]{opacity:.5;pointer-events:none}.totalItems[_ngcontent-%COMP%]{background-color:#fff;display:flex;flex-direction:column;width:100%;overflow:hidden}.meal-image[_ngcontent-%COMP%]{min-height:286px;flex-grow:0}.meal-info[_ngcontent-%COMP%]{width:66%;flex-grow:1;overflow-y:auto}.card-title[_ngcontent-%COMP%]{padding-left:15px;font-family:Poppins;font-size:34px;font-weight:600}.card-time[_ngcontent-%COMP%]{margin:0;font-family:Poppins;font-size:16px;font-weight:400;color:#535353}.card-items[_ngcontent-%COMP%]{width:168px;border-radius:5px;border:transparent}.card[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]{width:317px;height:212px;border-radius:30px}.card[_ngcontent-%COMP%]   .card-subtitle[_ngcontent-%COMP%]{color:#6d00c2;font-family:Poppins;font-size:16px;font-weight:500}.card[_ngcontent-%COMP%]   .inner-body[_ngcontent-%COMP%]{cursor:pointer}.card[_ngcontent-%COMP%]   .description[_ngcontent-%COMP%]{width:100%;align-items:center;height:35px}.card[_ngcontent-%COMP%]   .description[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]{font-family:Poppins;font-size:13px;font-weight:500;color:#939393;margin:0}"]})}return n})();const f=function(n){return{"active-button":n}},W=[{path:"",component:H,children:[{path:"",redirectTo:"home",pathMatch:"full"},{path:"home",component:(()=>{class n{constructor(){this.isActive=!1,this.selectedCategory="Breakfast",this.currentTime=new Date}ngOnInit(){}updateSelectedCategory(e){this.selectedCategory=e,console.log("Selected Category:",this.selectedCategory)}static#t=this.\u0275fac=function(o){return new(o||n)};static#e=this.\u0275cmp=t.Xpm({type:n,selectors:[["app-home"]],decls:46,vars:12,consts:[["id","homeSection"],[1,"container"],[1,"row"],[1,"d-flex","flex-column","align-items-center"],[1,"top-menu-heading","mb-3"],[1,"menu-selection-card","d-flex","justify-content-between","mb-5"],[1,"breakfast"],[1,"breakfast",3,"ngClass","click"],["version","1.1","id","Icons","xmlns","http://www.w3.org/2000/svg",0,"xmlns","xlink","http://www.w3.org/1999/xlink","viewBox","0 0 32 32",0,"xml","space","preserve","fill","#000000"],["id","SVGRepo_bgCarrier","stroke-width","0"],["id","SVGRepo_tracerCarrier","stroke-linecap","round","stroke-linejoin","round"],["id","SVGRepo_iconCarrier"],["x1","3","y1","29","x2","23","y2","29",1,"st0"],["d","M4,11v6.2C4,22,8,26,13,26c5,0,9-4,9-8.8V11H4z",1,"st0"],["d","M25,21L25,21c-1.7,0-3-1.3-3-3v-3c0-1.6,1.3-3,3-3h0c1.6,0,3,1.3,3,3v3C28,19.7,26.7,21,25,21z",1,"st0"],["d","M13,2L13,2c-1.2,1.8-1.2,4.2,0,6l0,0",1,"st0"],["d","M9,2L9,2C7.8,3.8,7.8,6.2,9,8l0,0",1,"st0"],["d","M17,2L17,2c-1.2,1.8-1.2,4.2,0,6l0,0",1,"st0"],[1,"lunch"],[1,"lunch",3,"ngClass","click"],["fill","#000000","height","200px","width","200px","version","1.1","id","Icons","xmlns","http://www.w3.org/2000/svg",0,"xmlns","xlink","http://www.w3.org/1999/xlink","viewBox","0 0 32 32",0,"xml","space","preserve"],["d","M3,22h1.5h23.1H29c0.6,0,1-0.4,1-1s-0.4-1-1-1h-1c-0.2-5.7-4.1-10.4-9.3-11.7C18.9,7.9,19,7.5,19,7c0-1.7-1.3-3-3-3 s-3,1.3-3,3c0,0.5,0.1,0.9,0.3,1.3C8.1,9.6,4.2,14.3,4,20H3c-0.6,0-1,0.4-1,1S2.4,22,3,22z",1,"st1"],["d","M5.5,24l0.8,1.5C6.4,25.8,6.8,26,7.2,26h17.7c0.4,0,0.7-0.2,0.9-0.5l0.8-1.5H5.5z",1,"st1"],[1,"snacks"],[1,"snacks",3,"ngClass","click"],["fill","#000000","height","200px","width","200px","version","1.1","id","Layer_1","xmlns","http://www.w3.org/2000/svg",0,"xmlns","xlink","http://www.w3.org/1999/xlink","viewBox","0 0 512 512",0,"xml","space","preserve"],["d","M350.609,178.087H329.25l-6.751-20.266C306.566,110.028,262,77.913,211.62,77.913h-11.272V50.087 c0-9.206,7.49-16.696,16.696-16.696h66.783c9.217,0,16.696-7.473,16.696-16.696C300.522,7.473,293.043,0,283.826,0h-66.783 c-27.619,0-50.087,22.468-50.087,50.087v27.826h-11.272c-50.381,0-94.946,32.115-110.88,79.913l-6.751,20.261H16.696 C7.479,178.087,0,185.56,0,194.783c0,9.223,7.479,16.696,16.696,16.696h18.443l31.742,285.668 C67.827,505.603,74.968,512,83.478,512h200.348c4.501,0,8.538-1.862,11.56-4.799c-30.91-27.541-50.517-67.512-50.517-112.07 c0-5.649,0.375-11.206,0.984-16.696H87.293l-7.421-66.783h190.405c14.167-21.121,33.588-38.372,56.323-50.085l5.565-50.089h18.443 c9.217,0,16.696-7.473,16.696-16.696C367.304,185.56,359.826,178.087,350.609,178.087z M73.25,178.087l3.228-9.701 c11.391-34.141,43.217-57.081,79.206-57.081h55.935c35.989,0,67.816,22.94,79.206,57.076l3.228,9.707H73.25z",1,"st2"],["d","M395.13,278.261c-64.445,0-116.87,52.429-116.87,116.87S330.685,512,395.13,512S512,459.571,512,395.13 S459.576,278.261,395.13,278.261z M345.043,406.261c-9.22,0-16.696-7.475-16.696-16.696c0-9.22,7.475-16.696,16.696-16.696 c9.22,0,16.696,7.475,16.696,16.696C361.739,398.786,354.264,406.261,345.043,406.261z M389.565,461.913 c-9.22,0-16.696-7.475-16.696-16.696c0-9.22,7.475-16.696,16.696-16.696c9.22,0,16.696,7.475,16.696,16.696 C406.261,454.438,398.786,461.913,389.565,461.913z M400.696,361.739c-9.22,0-16.696-7.475-16.696-16.696 c0-9.22,7.475-16.696,16.696-16.696c9.22,0,16.696,7.475,16.696,16.696C417.391,354.264,409.916,361.739,400.696,361.739z M445.217,417.391c-9.22,0-16.696-7.475-16.696-16.696c0-9.22,7.475-16.696,16.696-16.696c9.22,0,16.696,7.475,16.696,16.696 C461.913,409.916,454.438,417.391,445.217,417.391z",1,"st2"],[3,"displayNormalMealCard","displayAddItemToCartCard","selectedCategory"]],template:function(o,i){1&o&&(t.TgZ(0,"section",0)(1,"div",1)(2,"div",2)(3,"div",3)(4,"div",4)(5,"h2"),t._uU(6,"Today\u2019s Menu"),t.qZA()(),t.TgZ(7,"div",5)(8,"div",6)(9,"button",7),t.NdJ("click",function(){return i.updateSelectedCategory("Breakfast")}),t.O4$(),t.TgZ(10,"svg",8),t._UZ(11,"g",9)(12,"g",10),t.TgZ(13,"g",11),t._UZ(14,"line",12)(15,"path",13)(16,"path",14)(17,"path",15)(18,"path",16)(19,"path",17),t.qZA()(),t._uU(20," Breakfast "),t.qZA()(),t.kcU(),t.TgZ(21,"div",18)(22,"button",19),t.NdJ("click",function(){return i.updateSelectedCategory("Lunch")}),t.O4$(),t.TgZ(23,"svg",20),t._UZ(24,"g",9)(25,"g",10),t.TgZ(26,"g",11)(27,"g"),t._UZ(28,"path",21)(29,"path",22),t.qZA()()(),t._uU(30," Lunch "),t.qZA()(),t.kcU(),t.TgZ(31,"div",23)(32,"button",24),t.NdJ("click",function(){return i.updateSelectedCategory("Snacks")}),t.O4$(),t.TgZ(33,"svg",25),t._UZ(34,"g",9)(35,"g",10),t.TgZ(36,"g",11)(37,"g")(38,"g"),t._UZ(39,"path",26),t.qZA()(),t.TgZ(40,"g")(41,"g"),t._UZ(42,"path",27),t.qZA()()()(),t._uU(43," Snacks "),t.qZA()()(),t.kcU(),t.TgZ(44,"div"),t._UZ(45,"app-meal-card",28),t.qZA()()()()()),2&o&&(t.xp6(9),t.Q6J("ngClass",t.VKq(6,f,"Breakfast"===i.selectedCategory)),t.xp6(13),t.Q6J("ngClass",t.VKq(8,f,"Lunch"===i.selectedCategory)),t.xp6(10),t.Q6J("ngClass",t.VKq(10,f,"Snacks"===i.selectedCategory)),t.xp6(13),t.Q6J("displayNormalMealCard",!1)("displayAddItemToCartCard",!0)("selectedCategory",i.selectedCategory))},dependencies:[g.mk,V],styles:[".top-menu-heading[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%]{font-family:PoetsenOne;font-size:44px;font-weight:400;line-height:53px;letter-spacing:0em;text-align:left}.menu-selection-card[_ngcontent-%COMP%]{width:92%}.menu-selection-card[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]{width:360px;height:172px;border-radius:20px;border:2px solid transparent;display:flex;flex-direction:column;align-items:center;justify-content:center;font-family:Poppins;font-size:22px;font-weight:600;background-color:#fff;box-shadow:0 10px 20px #0000001a;overflow:hidden}.menu-selection-card[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]   .st0[_ngcontent-%COMP%]{fill:transparent;stroke:#000;stroke-width:2;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10}.menu-selection-card[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]   svg[_ngcontent-%COMP%]{height:96px;width:96px}.menu-selection-card[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]:hover{border:1px solid #6d00c2}.menu-selection-card[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]:hover   .st0[_ngcontent-%COMP%]{fill:transparent;stroke:#6d00c2}.menu-selection-card[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]:hover   .st1[_ngcontent-%COMP%]{fill:#6d00c2}.menu-selection-card[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]:hover   .st2[_ngcontent-%COMP%]{fill:#6d00c2;stroke:#6d00c2}.menu-selection-card[_ngcontent-%COMP%]   button.active-button[_ngcontent-%COMP%]{border:1px solid #6d00c2}.menu-selection-card[_ngcontent-%COMP%]   button.active-button[_ngcontent-%COMP%]   .st0[_ngcontent-%COMP%]{fill:transparent;stroke:#6d00c2}.menu-selection-card[_ngcontent-%COMP%]   button.active-button[_ngcontent-%COMP%]   .st1[_ngcontent-%COMP%]{fill:#6d00c2}.menu-selection-card[_ngcontent-%COMP%]   button.active-button[_ngcontent-%COMP%]   .st2[_ngcontent-%COMP%]{fill:#6d00c2;stroke:#6d00c2}"]})}return n})()}]}];let X=(()=>{class n{static#t=this.\u0275fac=function(o){return new(o||n)};static#e=this.\u0275mod=t.oAB({type:n});static#n=this.\u0275inj=t.cJS({imports:[p.Bz.forChild(W),p.Bz]})}return n})();var tt=s(499);let et=(()=>{class n{static#t=this.\u0275fac=function(o){return new(o||n)};static#e=this.\u0275mod=t.oAB({type:n});static#n=this.\u0275inj=t.cJS({imports:[g.ez,X,tt.C]})}return n})()}}]);
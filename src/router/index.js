import Vue from 'vue'
import Router from 'vue-router'

import homeComponent from "../pages/home/"
import memberComponent from "../pages/member/"
import shopcarComponent from "../pages/shopcar/"
import searchComponent from "../pages/search/"
import newsListComponent from "../pages/newsList"
import newsInfoComponent from "../pages/newInfo"
import photoListComponent from "../pages/photoList"
import photoInfoComponent from "../pages/photoInfo"
import goodListComponent from "../pages/goodList"
import goodInfoComponent from "../pages/goodInfo"
import goodCommentComponent from "../pages/goodComment"
import goodDemoComponent from "../pages/goodDemo"
Vue.use(Router)

export default new Router({
  routes: [
  {path:"/",redirect:"/home"},
  {path:"/home",component:homeComponent},
  {path:"/member",component:memberComponent},
  {path:"/shopcar",component:shopcarComponent},
  {path:"/search",component:searchComponent},
  {path:"/home/newsList",component:newsListComponent},
  {path:"/home/newInfo/:id",component:newsInfoComponent},
  {path:"/home/photoList",component:photoListComponent},
  {path:"/home/photoInfo/:id",component:photoInfoComponent},
  {path:"/home/goodList",component:goodListComponent},
  {path:"/home/goodInfo/:id",component:goodInfoComponent,name:"goodInfo"},
  {path:"/home/goodComment/:id",component:goodCommentComponent,name:"goodComment"},
  {path:"/home/goodDemo/:id",component:goodDemoComponent,name:"goodDemo"}
  ],
  linkActiveClass:"mui-active"

})

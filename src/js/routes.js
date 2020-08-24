
import InstallPage from '../pages/install.vue';
import HomePage from '../pages/home.vue';
import Temp from '../pages/Temp.vue';

import NotFoundPage from '../pages/404.vue';


function checkAuth(to, from, resolve, reject) {
  var router = this;
  var app = router.app;
  console.log('***************checkAuth*****************' )


    // if (  localStorage.getItem("token") ) {
      resolve();
      app.params.is_login=true;
    // } else {
    //     reject();
    //     app.params.is_login=false;
    //     router.navigate('/login/');
    // }



}

var routes = [

  {
    path: '/install/',
    name: 'install',
    component: InstallPage,
    options:{
      animate: true,
      transition: 'f7-circle',
    },

  },

  {
    path:  '/Temp/',
    name: 'Temp',
    component: Temp,
    options:{
      animate: true,
      transition: 'f7-circle',
    },
    // detailRoutes:[
    //   {
    //     path:  '/Temp/id/:id/',
    //     name: 'Temp',
    //     component: Temp,
    //   },
    // ],
  },




  {
    path: '/',
    component: HomePage,
    options:{
      animate:true,
      transition: 'f7-circle',

      ignoreCache:true,
      reloadCurrent:true,
    },
    beforeEnter: checkAuth,
  },



  {
    path: '(.*)',
    component: NotFoundPage,
    beforeEnter: checkAuth,
  },


];

export default routes;

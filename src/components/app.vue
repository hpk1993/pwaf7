<template>
<f7-app :params="f7params"  >

  <!-- Left panel with cover effect-->
  <f7-panel left cover theme-dark >
    <f7-view>
      <f7-page>
        <f7-navbar title="Left Panel"></f7-navbar>
        <f7-block>پنل چپ</f7-block>
      </f7-page>
    </f7-view>
  </f7-panel>


  <!-- Right panel with reveal effect-->
  <f7-panel right reveal theme-light>
    <f7-view>
      <f7-page>
        <f7-navbar title="Right Panel"></f7-navbar>
        <f7-block>پنل راست</f7-block>
      </f7-page>
    </f7-view>
  </f7-panel>

  <!-- Your main view, should have "view-main" class -->

<div >
    <f7-view  main  class="safe-areas" url="/" ></f7-view>
</div>



  <!-- Popup -->
  <f7-popup id="my-popup">
    <f7-view>
      <f7-page>
        <f7-navbar title="Popup">
          <f7-nav-right>
            <f7-link popup-close>بستن</f7-link>
          </f7-nav-right>
        </f7-navbar>
        <f7-block>
          <p>Popup content goes here.</p>
        </f7-block>
      </f7-page>
    </f7-view>
  </f7-popup>

  <f7-login-screen id="my-login-screen">
    <f7-view >
      <f7-page login-screen >
        <f7-login-screen-title>ورود</f7-login-screen-title>
        <f7-list form>
          <f7-list-input
            type="text"
            name="username"
            placeholder="Your username"
            :value="username"
            @input="username = $event.target.value"
          ></f7-list-input>
          <f7-list-input
            type="password"
            name="password"
            placeholder="Your password"
            :value="password"
            @input="password = $event.target.value"
          ></f7-list-input>
        </f7-list>
        <f7-list>
          <f7-list-button title="Sign In" @click="alertLoginData"></f7-list-button>
          <f7-block-footer>
            Some text about login information.<br>Click "Sign In" to close Login Screen
          </f7-block-footer>
        </f7-list>
      </f7-page>
    </f7-view>
  </f7-login-screen>


</f7-app>
</template>
<script>

  import routes from '../js/routes.js';
  import Framework7 from 'f7rtl/framework7-lite.esm.bundle.js';
  export default {
    data() {
      return {
        installPromptEvent: undefined,
        Version_app: "1.0.0",


        // Framework7 Parameters
        f7params: {
          name: " App name", // App name
          id: 'hpksoftware.pwa.f7pwa',
          version: this.Version_app,
          theme: 'auto', // Automatic theme detection
          is_login: false,


          // App routes
          routes: routes,
          // Register service worker
          serviceWorker: {
            path: '/service-worker.js',
          },

          view: {
            // pushState: true,
            // pushStateRoot: '',
            // pushStateOnLoad: false,
            //pushStateSeparator: '#!',
          },


        statusbar: {
          iosOverlaysWebview: true,
        },

        on: {
          init: function () {
            console.log('App initialized');
            // Framework7.request.setup({
            //     headers: {
            //       'Authorization': 'Bearer ' + localStorage.getItem("token"),
            //       'Accept': 'application/json',
            //       'Content-Type' : 'application/json'
            //         }
            //   });
          },
        },

        // dialog: {
        //   title: '',
        // },



        }, // End App Parameter

        // Login screen data
        username: '',
        password: '',

      }
    },


methods: {

  alertLoginData() {
      this.$f7.dialog.alert('Username: ' + this.username + '<br>Password: ' + this.password, () => {
      this.$f7.loginScreen.close();
    });
  },

  Get_url_app(){
    return window.location.href ;
  },

  async copyToClipboard() {
    let stringToCopy=window.location.href;
    if (navigator.clipboard) {
      try {
        await navigator.clipboard.writeText(stringToCopy);
        this.$f7.dialog.alert('آدرس نصب کپی شد.آن را در مرورگر کروم پیست کنید' ,'توجه' );
        console.log('string copied to clipboard');
      } catch (err) {
        console.error('Failed to copy: ', err);
      }
    }
  },


  Is_ios(){
    return Framework7.device.ios
  },

  is_installed(){
    return Framework7.device.standalone;
  },

  get_device() {
      let obj = Framework7.device;
      let os_name= ''; //window.navigator.userAgent
      for (var prop in obj)
        {
          // if (!obj.hasOwnProperty(prop)) continue;
          // if (obj[prop] == true && prop !== 'webview' && prop !=='webView' && prop !== 'statusbar' && prop !== 'pixelRatio') {
            // console.log(prop)
            os_name += prop + " = " + obj[prop] + "<br>";
          // }
        }
        return os_name;
  },


  click_install() {
        let self = this;
        self.initialize_install();
        console.log('click_install' , self.installPromptEvent);
          if (self.installPromptEvent) {
            self.installPromptEvent.prompt();
            self.installPromptEvent.userChoice.then(choiceResult => {
              if (choiceResult.outcome === 'accepted') {
                console.log('User Accepted');
              } else {
                console.log('User dismissed');
              }
              console.log('before install prompt event: ', self.installPromptEvent);
            self.installPromptEvent = null;
            });
          } // if

  },

  Is_Chrome(){
      let isChrome=true ;

      let isChromium = window.chrome;
      let winNav = window.navigator;
      let vendorName = winNav.vendor;
      let isOpera = typeof window.opr !== "undefined";
      let isIEedge = winNav.userAgent.indexOf("Edge") > -1;
      let isIOSChrome = winNav.userAgent.match("CriOS");

      if (isIOSChrome) {
        // is Google Chrome on IOS
        isChrome=true;
      }
      else if( isChromium !== null && typeof isChromium !== "undefined" && vendorName === "Google Inc." &&  isOpera === false &&  isIEedge === false )
      {
        // is Google Chrome
        isChrome=true;
          console.log( ' is Google Chrome'  )
      } else {
        // not Google Chrome
        isChrome=false;
          console.log( 'not Google Chrome ' )
      }

      return  isChrome;
  },


  initialize_install (){
      let self=this;
      window.addEventListener('beforeinstallprompt',(e) => {
        e.preventDefault();
        self.installPromptEvent = e;

      });

  } ,

  handleBackButton(e) {
    // self.$f7router.back();
      const self = this;
      const app = self.$f7;
      const $$ = this.Dom7;

    //#region
      const panel_left = app.panel.get('.panel-left');
      const panel_right = app.panel.get('.panel-right');
      if ($$('.modal-in').length <= 0 && (panel_left==undefined || panel_left.opened==false )  && (panel_right==undefined || panel_right.opened==false ) ) {
        // console.log('***********pushState' , app.views.main.router);
        window.history.back();
        app.views.main.router.back();
        return false;
      } else{
          window.history.pushState({}   , '');
      }



      if (panel_left.opened || panel_right.opened) {
        console.log( 'panel_left.opened' , panel_left.opened);
        console.log( 'panel_right.opened' , panel_right.opened);

          app.panel.close();
          return false;
      }


      if ($$('.modal-in').length > 0) {
        console.log( 'modal' , $$('.modal-in').length);
        app.dialog.close();
        app.popup.close();
        return false;

      }
    //#endregion
  },

  IS_SamsungBrowser() {
    let str = navigator.appVersion ;
    let n = str.search("SamsungBrowser");
    if (n > 0) {
      return true;
    } else{
      return false;
    };
  }

}, //methods

    mounted() {
      this.$f7ready((f7) => {
        // Call F7 APIs here
        this.initialize_install();

      });
    // app.utils.colorThemeCSSProperties('#f00');

    const app=this.$f7;
    console.log("$f7: " , app	)
    console.log("Connected: " , app.online	)
    app.statusbar.show();


    app.on('connection', function (isOnline) {
    console.log('isOnline app: ' , isOnline);
  });

  // app.request.json('https://app.asa-andish.com/api/ostadkar/list-suggestion?user_id=668', function (data) {
  //   console.log('request data : ' , data);
  // } );



    // **************handle Back Button mobile & browser**************
      // if(window.history.state==null){
      //     window.history.pushState(  { isBackPage: false } , '');
      //     // window.history.pushState(  { isBackPage2: false } , '');

      // }
      // else{
      //     window.history.pushState(null,'')
      // }
      window.addEventListener('popstate', this.handleBackButton);
    // **************END handle Back Button mobile & browser*****************


  },


  }
</script>
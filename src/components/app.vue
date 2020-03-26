<template>
<f7-app :params="f7params"  :push-state="true" >

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
  <f7-view main class="safe-areas" url="/" :push-state="true" v-if="is_installed()==true"></f7-view>
  <!-- <f7-view main class="safe-areas" url="/"  :push-state="true"></f7-view> -->

  <!-- نصب خودکار برنامه -->
  <f7-view style="overflow: scroll;" init :push-state="true"   v-if="is_installed()==false ">
    <f7-page >

      <f7-block-title  large  v-show="Is_ios()" class="text-color-primary padding ">مراحل نصب</f7-block-title>
      <f7-block-title  xsmall v-show="Is_ios()"  class="text-color-green ">نسخه {{Version_app}} </f7-block-title>
      <img src="static/install_banners/install_ios.png" class="center" alt=""  v-show="Is_ios()" style="left: 10%;position: absolute;width: 80%;right: 10%;margin-top: 25%;">


      <f7-block-title  v-show="!Is_ios()"  large class="text-color-primary padding">مراحل نصب</f7-block-title>
      <f7-block-title  v-show="!Is_ios()"  xsmall class="text-color-green ">نسخه {{Version_app}} </f7-block-title>
      <f7-block-title  v-show="!Is_ios()"  class="text-color-primary "> روش نصب در مرورگر گوگل کروم</f7-block-title>
      <f7-block inset v-show="!Is_ios()">
        <p>
            1. بر روی دکمه نصب کلیک کنید
        </p>
        <p>
            2. و بعد از نمایش کادر آیکون برنامه گزینه اضافه کردن به صفحه یا Add را بزنید
        </p>
        <p>
            نکته : اگر در کروم دکمه نصب عمل نکرد صفحه را مجدد بارگذاری کنید (Refresh)
        </p>

          <f7-block>
            <f7-button  fill raised  @click.prevent="click_install()" v-if="is_installed()==false">نصب</f7-button>
          </f7-block>
        </f7-block>
        <br >
        <f7-block-title v-show="!Is_ios()">دیگر روش های نصب</f7-block-title>
        <f7-list accordion-list v-show="!Is_ios()">

          <f7-list-item class="text-color-primary" accordion-item title="در مرورگر سامسونگ">
            <f7-accordion-content>
              <f7-block>
                    <img src="static/install_banners/samsung-install.jpg" alt="" style="max-width:100%;">
              </f7-block>
            </f7-accordion-content>
          </f7-list-item>


          <f7-list-item class="text-color-primary" accordion-item title="در مرورگر فایرفاکس">
            <f7-accordion-content>
              <f7-block>
                    <img src="static/install_banners/fireFox-banner.png" alt="" style="max-width:100%;">
              </f7-block>
            </f7-accordion-content>
          </f7-list-item>

          <f7-list-item class="text-color-primary" accordion-item title="در سایر مرورگرها">
            <f7-accordion-content class="text-color-gray">
              <f7-block>
                  <p>
                      1. منو تنظیمات مرورگر را باز کنید
                  </p>
                  <p>
                      2. بر روی گزینه اضافه کردن به صفحه اصلی یا Add to home Screen کلیک کنید
                </p>
              </f7-block>
            </f7-accordion-content>
          </f7-list-item>

        </f7-list>

    </f7-page>
  </f7-view>
<!-- ******************************* -->



  <!-- Popup -->
  <f7-popup id="my-popup">
    <f7-view>
      <f7-page>
        <f7-navbar title="Popup">
          <f7-nav-right>
            <f7-link popup-close>Close</f7-link>
          </f7-nav-right>
        </f7-navbar>
        <f7-block>
          <p>Popup content goes here.</p>
        </f7-block>
      </f7-page>
    </f7-view>
  </f7-popup>

  <f7-login-screen id="my-login-screen">
    <f7-view>
      <f7-page login-screen>
        <f7-login-screen-title>Login</f7-login-screen-title>
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
        Version_app: '1.5',

        // Framework7 Parameters
        f7params: {
          name: 'First App', // App name
          theme: 'auto', // Automatic theme detection
          pushState: true,

          // App routes
          routes: routes,
          // Register service worker
          serviceWorker: {
            path: '/service-worker.js',
          },
        },

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
          if (!obj.hasOwnProperty(prop)) continue;
          if (obj[prop] == true && prop !== 'webview' && prop !=='webView' && prop !== 'statusbar' && prop !== 'pixelRatio') {
            // console.log(prop)
            os_name += prop + " | "
          }
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

      console.log('///////////////'  , app.panel );

      if ($$('.modal-in').length <= 0 && (panel_left==undefined || panel_left.opened==false )  && (panel_right==undefined || panel_right.opened==false ) ) {
        console.log('///////  if  ////////'  );
                // for (let index = 0; index < 5; index++) {
                  // setTimeout(() => {
                    // window.history.back();
                    window.history.back();
                  // }, 200);

              // }

      } else{
                console.log('pushState');
                window.history.pushState({}   , '');
      }



      if (panel_left.opened || panel_right.opened) {
        console.log( 'panel_left.opened' , panel_left.opened);
        console.log( 'panel_right.opened' , panel_right.opened);

          // panel_left.close(true);
          // panel_right.close(true);
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


}, //methods

    mounted() {
      this.$f7ready((f7) => {
        // Call F7 APIs here
        this.initialize_install();
      });


    // **************handle Back Button mobile & browser**************
      if(window.history.state==null){
          window.history.pushState(  { isBackPage: false } , '');
          window.history.pushState(  { isBackPage2: false } , '');
      }
      else{
          window.history.pushState(null,'')
      }
      window.addEventListener('popstate', this.handleBackButton);
    // **************END handle Back Button mobile & browser*****************


  },


  }
</script>
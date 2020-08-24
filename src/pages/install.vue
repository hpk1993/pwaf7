<template>
<f7-page class="">


        <!-- اگر مرورگر  سامسونگ  باشد -->
          <f7-card v-if="IS_SamsungBrowser()==true" class="bg-color-red text-color-white   padding" style="margin-top:1%;">
                  لطفا برای نصب این برنامه ، لینک نصب را با مرورگر کروم باز کنید
              <br><span class="float-left" id="mylocation">
                  {{ Get_url_app() }}
              </span> <br>  &nbsp; &nbsp;<h4>کپی  <f7-link @click="copyToClipboard()" icon-f7="doc_on_clipboard" icon-color="white"> </f7-link></h4>
          </f7-card>
        <!--************سامسونگ**************-->

        <!-- نصب خودکار برنامه -->
          <div v-if="is_installed()==false && IS_SamsungBrowser()==false ">
              <f7-block-title  large  v-show="Is_ios()==true" class="text-color-primary padding ">مراحل نصب</f7-block-title>
              <f7-block-title  xsmall v-show="Is_ios()==true" class="text-color-green ">نسخه {{Version_app}} </f7-block-title>
              <img src="static/install_banners/install_ios.png" class="center" alt=""  v-show="Is_ios()==true" style="left: 10%;position: absolute;width: 80%;right: 10%;margin-top: 25%;">


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




          </div>

</f7-page>
</template>
<script>

  import routes from '../js/routes.js';
  import Framework7 from 'f7rtl/framework7-lite.esm.bundle.js';
  export default {
    data() {
      return {
        installPromptEvent: undefined,
      }
    },


methods: {


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
            os_name += prop + " = " + obj[prop] + "<br>";
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

    this.initialize_install();

    const app=this.$f7;
    console.log("$f7: " , app	)
    console.log("Connected: " , app.online	)

  // app.request.json('https://app.asa-andish.com/api/ostadkar/list-suggestion?user_id=668', function (data) {
  //   console.log('request data : ' , data);
  // } );

      // window.addEventListener('popstate', this.handleBackButton);

      console.log('install page'  )



  },


  }
</script>
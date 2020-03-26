// Import Vue
import Vue from 'vue';

// Import Framework7
import Framework7 from 'f7rtl/framework7-lite.esm.bundle.js';

// Import Framework7-Vue Plugin
import Framework7Vue from 'framework7-vue/framework7-vue.esm.bundle.js';

// Import Framework7 Styles
import 'f7rtl/css/framework7.bundle.rtl.css';

// Import Icons and App Custom Styles
import '../css/icons.css';
import '../css/app.css';

// Import App Component
import App from '../components/app.vue';

// Init Framework7-Vue Plugin
Framework7.use(Framework7Vue);



//#region  توابع پرکاربرد

  // *************************************** Prototype **********************************************
String.prototype.toEnglishDigit = function()
{
  var find = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
  var replace = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
  var replaceString = this;
  var regex;
  for (var i = 0; i < find.length; i++) {
      regex = new RegExp(find[i], "g");
      replaceString = replaceString.replace(regex, replace[i]);
      }
  return replaceString;
};

String.prototype.toPersinaDigit= function()
{
  var id= ['۰','۱','۲','۳','۴','۵','۶','۷','۸','۹'];
  return this.replace(/[0-9]/g, function(w)  { return id[+w]  });
};

String.prototype.tomanPay= function()
{
var str=this.valueOf();
var objRegex = new RegExp( '(-?[0-9]+)([0-9]{3})' );
while( objRegex.test( str ) ) {
  str = str.replace( objRegex, '$1,$2' );
}
return str;
};

Vue.prototype.$getIdentifireID = function() {
//async function() {
return window.navigator.userAgent.replace(/\D+/g, '');
};

Vue.prototype.$is_IOS = function() {
if (Framework7.device.ios ) {
  return true;
} else {
  return false;
}
};

Vue.prototype.$is_Desktop = function() {
console.log(Framework7.device)
if (Framework7.device.desktop == true && Framework7.device.android == false && Framework7.device.ios==false) {
  return true;
} else {
  return false;
}
};

Vue.prototype.$checkConnection = function() {
return navigator.onLine ? true : false;
};



Vue.prototype.$click_install= function()  {
  const self = this;
    if (self.installPromptEvent) {
      self.installPromptEvent.prompt();
      self.installPromptEvent.userChoice.then(choiceResult => {
        if (choiceResult.outcome === 'accepted') {
          console.log('User Accepted');
        } else {
          console.log('User dismissed');
        }

        self.installPromptEvent = null;
      });
    } // if
},


  // *************************************** END Prototype *****************************************

//#endregion

// Init App
new Vue({
  el: '#app',

  data() {
    return {
      myPushid: '123456789',
      installPromptEvent: undefined ,
    }
  },

  render: (h) => h(App),

  // Register App Component
  components: {
    app: App
  },
  mounted () {
      this.initialize_install();

  },

  methods: {



  initialize_install (){
      let self=this;
      //#region  Install Button
      window.addEventListener('beforeinstallprompt',(e) => {
        e.preventDefault();
        console.log('before install prompt event');
        self.installPromptEvent = e;
      });

      console.log('before install prompt event: ', self.installPromptEvent);
      // self.init_Install_btn();
    //#endregion
  } ,


  },
});
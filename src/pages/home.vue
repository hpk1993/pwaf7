<template>
<!-- theme-dark class="color-theme-tgray " theme-dark -->
  <f7-page  :page-content="true"  class="bg-color-white" hide-navbar-on-scroll  >
    <f7-navbar title="عنوان" >
        <!-- <f7-subnavbar   :inner="false" class="padding-bottom " >
            <div class="searchbar searchbar-input-wrap row margin-top" style="padding:0px;margin:10px margin-top:15px;" >
            <f7-button style="margin-top:5px;" class="col-5 no-padding no-margin-left margin-right " @click="search_product(text_search)"><f7-icon f7="search" size="32px" color="black" ></f7-icon></f7-button>
              <f7-input @input="text_search=$event.target.value" type="text" placeholder="جستجوی " class="col-80 no-margin-right margin-left" clear-button></f7-input>
            </div>
        </f7-subnavbar> -->
        <f7-nav-right ></f7-nav-right>
        <f7-nav-left > </f7-nav-left>
    </f7-navbar>

    <f7-block-title> Hello world</f7-block-title>



<f7-toolbar position="bottom" tabbar labels>
      <f7-link tab-link href="/#android" tab-link-active  text="گزینه 1" icon-f7="house_alt"></f7-link>
      <f7-link tab-link href="/cart/"   text="گزینه2" icon-f7="square_stack_3d_down_dottedline"></f7-link>
      <f7-link tab-link href="/cart/"   text="گزینه 3" icon-f7="square_stack_3d_down_dottedline"></f7-link>
  </f7-toolbar>


  </f7-page>
</template>

<script>
import Framework7 from 'f7rtl/framework7-lite.esm.bundle.js';

export default {

  data() {
      return{
        // User_Type: localStorage.getItem('ut'),

      }
  },

  mounted() {
    window.history.pushState('/home/','')
    window.history.pushState('/home/','')
    const app=this.$f7;
    const self = this;
    const  $$ = this.Dom7;

  },

  methods:{



  IS_Desktop(){
      if ( this.$f7route.hash=='android') {
        this.$root.isAndroid=true;
      }else{
        this.$root.isAndroid=false;
      }
    },


  }
}
</script>

<style >



.searchbar input[type="text"], .searchbar input[type="search"] {
    box-sizing: border-box;
    width: 100%;
    /* height: 100%; */
    display: block;
    border: var(--f7-searchbar-input-border-width) solid var(--f7-searchbar-input-border-color);
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    font-family: inherit;
    font-weight: normal;
    color: var(--f7-searchbar-input-text-color);
    font-size: 14px ;  /*var(--f7-searchbar-input-font-size); */
    background-color: var(--f7-searchbar-input-bg-color);
    border-radius: var(--f7-searchbar-input-border-radius);
    position: relative;
    padding: 0;
    /* padding-left: calc(var(--f7-searchbar-input-padding-horizontal) + var(--f7-searchbar-input-extra-padding-right, 0px)); */
    padding-right: 7px;
    /* calc(var(--f7-searchbar-input-padding-horizontal) + var(--f7-searchbar-input-extra-padding-left, 0px)); */
}

</style>
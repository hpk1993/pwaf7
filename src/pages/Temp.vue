<template>
  <f7-page>
    <f7-navbar :title="title_page" back-link="بازگشت"></f7-navbar>

  </f7-page>
</template>
<script>
import Framework7 from 'f7rtl/framework7-lite.esm.bundle.js';

export default {
  data() {
      return{

      }
  },

  mounted() {
    window.history.pushState('//','')

    const app=this.$f7;
    const self = this;
    const  $$ = this.Dom7;

  },

  methods:{


  },
}
</script>



<style scoped>

</style>
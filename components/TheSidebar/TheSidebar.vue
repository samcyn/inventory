<template>
  <aside class="menu" id="rightSideBar">
    <Menus/>
  </aside>
</template>

<script>
import Menus from '../TheHeader/Menus';

export default {
  
  name: 'TheSidebar',
  components: {
    Menus
  }
}
</script>
<style scoped lang="scss">
  #rightSideBar{
    display: none;
  }
  @media (max-width: 1024px){ 
    #rightSideBar {
      position: fixed;
      display: block !important;
      top: 0;
      height: 100%;
      width: $sideBarWidth;
      right: 0;
      z-index: 1032;
      visibility: visible;
      background: #FFFFFF;
      overflow-y: visible;
      border-top: none;
      text-align: left;
      padding: 12px;
      -webkit-box-shadow: -31px -9px 9px -34px rgba(0,0,0,0.26);
      -moz-box-shadow: -31px -9px 9px -34px rgba(0,0,0,0.26);
      box-shadow: -31px -9px 9px -34px rgba(0,0,0,0.26);
      -webkit-transform: translate3d(#{$sideBarWidth}, 0, 0);
      -moz-transform: translate3d(#{$sideBarWidth}, 0, 0);
      -o-transform: translate3d(#{$sideBarWidth}, 0, 0);
      -ms-transform: translate3d(#{$sideBarWidth}, 0, 0);
      transform: translate3d(#{$sideBarWidth}, 0, 0);
      -webkit-transition: all 0.33s cubic-bezier(0.685, 0.0473, 0.346, 1);
      -moz-transition: all 0.33s cubic-bezier(0.685, 0.0473, 0.346, 1);
      -o-transition: all 0.33s cubic-bezier(0.685, 0.0473, 0.346, 1);
      -ms-transition: all 0.33s cubic-bezier(0.685, 0.0473, 0.346, 1);
      transition: all 0.33s cubic-bezier(0.685, 0.0473, 0.346, 1);
    }
    .nav-open #rightSideBar {
      -webkit-transform: translate3d(0px, 0, 0);
      -moz-transform: translate3d(0px, 0, 0);
      -o-transform: translate3d(0px, 0, 0);
      -ms-transform: translate3d(0px, 0, 0);
      transform: translate3d(0px, 0, 0);
    }
  }
</style>


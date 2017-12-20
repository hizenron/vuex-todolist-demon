<template>
  <div id="app">
    <listMenue></listMenue>
  </div>
</template>

<script>
  import Lists from './components/Lists.vue'
export default {
  name: 'app',
  components:{
    'listMenue':Lists,
  },
  data () {
    return {

    }
  }
}
</script>

<style>
  body{
    font-family: 'yahei';
    color: #555;
  }
</style>

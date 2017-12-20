<template>
  <div id="listMenu">
    <h2>Show Lists Menue</h2>
    <input type="text" v-model="addlists"  @keyup.enter="_addList" placeholder="please add list..." >
    <ul>
      <li v-for='(list,index) in lists' :class="{finished:list.isFinished}" type="1" @click="doneList(list.id)">
        <!--<input type="checkbox" :checked="{checked: list.isShow}">-->
        <label >{{list.name}}</label>
        <div class="delbtn" @click="delList(list.id,index)">del</div>
      </li>
    </ul>
    <button @click="showAll">showAll</button>
    <button @click="activeList">showActive</button>
    <button @click="completedList">showCompleted</button>
  </div>
</template>

<script>

  import { mapGetters, mapActions, mapMutations } from 'vuex'

  export default {
    data() {
      return {
        addlists:'',
      }
    },
    computed: {
      ...mapGetters([
        "lists"
      ])
    },
    methods: {
      ...mapMutations([

      ]),
      ...mapActions({
        getLists:'getLists',
        add:'addList',
        delList:'delList',
        showAll:'showAll',
        activeList:'activeList',
        completedList:'completedList',
        doneList:'doneList'
      }),
      _addList(){
        if(this.addlists){
          this.add(this.addlists);
        }
        this.addlists='';
      }
    },
    mounted(){
      this.getLists()
    }
  }
</script>
<style scoped>
  #listMenu>input{
    width: 240px;
    height: 35px;
    line-height: 60px;
    font-size:  20px;
    padding-left: 10px;
    box-sizing: border-box;
  }
  #listMenu {
    background: #FFF8B1;
    box-shadow: 1px 2px 3px rgba(0, 0, 0, 0.2);
    margin-bottom: 30px;
    padding: 10px 20px;
  }

  #listMenu ul {
    padding: 0;
  }

  .delbtn:hover{
    background: #555;
    color:#fff;
  }

  .delbtn{
    position: absolute;
    right: 0;
    top: 0;
    background: #eee;
    width: 50px;
    height: 61px;
    text-align: center;
    line-height: 61px;
    transition: 0.2s;
    cursor: pointer;
  }

  #listMenu li {
    width: 200px;
    margin-top: 10px;
    padding: 20px;
    background: rgba(255, 255, 255, 0.7);
    text-align: center;
    position:relative;
  }

  #listMenu li input {
    display: inline-block;
    width: 20px;
    height: 20px;
  }

  #listMenu li span {
    font-size: 20px;
  }
  #listMenu ul li input{
    position: absolute;
    top: 25%;
    left: 0;

  }
  .finished {
    background: #bbb !important;
    opacity: 0.8;
    transition: all .3s;
    text-decoration: line-through;
  }
</style>

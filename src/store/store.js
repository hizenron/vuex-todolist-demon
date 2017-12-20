import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios';

const host = 'http://localhost:3001';

Vue.use(Vuex);

export const store = new Vuex.Store({
  state:{
    lists:[]
  },

  getters:{
    lists: (state) =>{
      let lists = state.lists.map(list =>{
        return {
          id:list.id,
          name: list.name,
          isFinished: list.isFinished,
          isShow: list.isShow
        };
      });
      return lists;
    }
  },
  mutations:{
    //获取数据库信息
    showdata:(state, data)=>{
      state.lists = data;
    }
  },
  actions:{
    //查询数据
    getLists: ({commit})=>{
      axios.get(host + '/todolist')
        .then((response) => {
          let data = response.data;
          commit('showdata', data);
        })
        .catch( error => {
          console.log(error)
        })
    },
    //增加数据
    addList: ({commit}, data) => {
      axios.post(host + '/addlist?name='+data)
        .then(function (response) {
          if(response.status===200){
            commit('showdata', response.data);
          }
        })
        .catch(function (response) {
          console.log(response);
        });
    },
    //删除数据
    delList:({commit},data)=>{
      axios.post(host + '/dellist?id='+data)
        .then(function (response) {
          if(response.status===200){
            commit('showdata', response.data);
          }
        })
        .catch(function (response) {
          console.log(response);
        });
    },
    //显示未完成
    activeList: ({commit}) => {
      axios.get(host + '/activelist')
        .then(function (response) {
          if(response.status===200){
            commit('showdata', response.data);
          }
        })
        .catch(function (response) {
          console.log(response);
        });
    },
    //显示已完成
    completedList: ({commit}) => {
      axios.get(host + '/completedlist')
        .then(function (response) {
          if(response.status===200){
            commit('showdata', response.data);
          }
        })
        .catch(function (response) {
          console.log(response);
        });
    },
    //显示所有
    showAll: ({commit}) => {
      axios.get(host + '/showall')
        .then(function (response) {
          if(response.status===200){
            commit('showdata', response.data);
          }
        })
        .catch(function (response) {
          console.log(response);
        });
    },
    //显示删除线及数据修改isFinished=true
    doneList: ({commit},data)=>{
      axios.post(host + '/doneList?id='+ data)
      .then(function (response) {
        if(response.status===200){
          commit('showdata', response.data);
        }
      })
      .catch(function (response) {
        console.log(response);
      });
    },

  }
});

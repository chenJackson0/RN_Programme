// import React, { Component } from 'react';
// import { AsyncStorage } from 'react-native';
// import Storage from 'react-native-storage';
// var storage = new Storage({
//   // 最大容量，默认值1000条数据循环存储
//   size: 1000,
//   // 存储引擎：对于RN使用AsyncStorage，对于web使用window.localStorage
//   // 如果不指定则数据只会保存在内存中，重启后即丢失
//   storageBackend: AsyncStorage,
//   // 数据过期时间，默认一整天（1000 * 3600 * 24 毫秒），设为null则永不过期
//   defaultExpires: 1000 * 24 * 3600,
//   // 读写时在内存中缓存数据。默认启用。
//   enableCache: true,
// })
// const storageG = {
//   storage : storage,
//   array : [],
//   username:"czg"
// }
import Constants from '.././globalStorage.js'
global.list = [];
function runAsync(){
    var p = new Promise(function(resolve, reject){
        //做一些异步操作
        Constants.storage.load({
          key: 'username',
          autoSync: true,
          syncInBackground: true,
        	syncParams: {
        	  extraFetchOptions: {
        	    // 各种参数
        	  },
        	  someFlag: true,
        	},
        }).then(ret => {
            resolve(ret);
        })
    });
    return p;
}
const s = {
  getSet : runAsync().then(function(data){
    list = data
  }),
  Set : function(){
    return list
  }
}

export default s

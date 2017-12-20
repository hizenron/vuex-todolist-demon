const express = require('express');
const mysql = require('mysql');
const dbConfig = require('./db/dbConfig');
const bodyParser = require('body-parser');

const getTodolist = 'SELECT * FROM vxdata where del=false ORDER BY id DESC';
const insertTodolist = 'INSERT INTO vxdata (name,isFinished,isShow,del) VALUES (?,?,?,?)';
const activeList = 'SELECT * FROM vxdata WHERE isFinished=false AND del=false ORDER BY id DESC';
const completedlist = 'SELECT * FROM vxdata WHERE isFinished=true ORDER BY id DESC';
const showall = 'SELECT * FROM vxdata WHERE del=false ORDER BY id DESC';

const server = express();
server.use(bodyParser.urlencoded({ extended: false }));


//连接数据库
let connection = mysql.createConnection(dbConfig);

server.all('*', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
  res.header("X-Powered-By",' 3.2.1');
  res.header("Content-Type", "application/json;charset=utf-8");
  next();
});


// sel todolist
server.get('/todolist', function(req, res) {
  connection.query(getTodolist, function(error, results, fields) {
    if(error) return error;
    res.json(results);
  });
});

//add todolist
server.post('/addlist', function(req, res) {
  let reqParam=[req.query.name,0,0,0];
  connection.query(insertTodolist, reqParam, function(error, results, fields) {
    if(error) throw error;
    //获取todolist
    connection.query(getTodolist, function(error, results, fields) {
      if(error) return error;
      res.json(results);
    })
  });
});

//del todolist
server.post('/dellist', function(req, res) {
  connection.query('update vxdata set del=true where id=?', [req.query.id], function(error, results, fields) {
    if(error) throw error;
    connection.query(getTodolist, function(error, results, fields) {
      if(error) return error;
      res.json(results);
    })
  })
});
// sel isFinished=true lists
server.get('/activelist', function(req, res) {
  connection.query(activeList, function(error, results, fields) {
    if(error) return error;
    res.json(results);
  });
});

// sel isFinished=false lists
server.get('/completedlist', function(req, res) {
  connection.query(completedlist, function(error, results, fields) {
    if(error) return error;
    res.json(results);
  });
});

// sel all
server.get('/showall', function(req, res) {
  connection.query(showall, function(error, results, fields) {
    if(error) return error;
    res.json(results);
  });
});

//显示删除线及数据修改isFinished=true
server.post('/doneList', function(req, res) {
  connection.query('update vxdata set isFinished=!isFinished WHERE id=?',[req.query.id],function(error, results, fields){
    if(error) throw error;
    connection.query(getTodolist, function(error, results, fields) {
      if(error) return error;
      res.json(results);
    })
  });
});

//链接错误提示
connection.connect(function(err) {
  if (err) {
    console.error('error connecting: ' + err.stack);
    return;
  }
  console.log('connected as id ' + connection.threadId);
});

//监听端口
server.listen(3001, function() {
  console.log('listening: 3001');
});



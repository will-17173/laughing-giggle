const express = require('express')
const app = express()
const port = 3000
const fs = require('fs');
const path = require('path')
const photoDir = path.join(__dirname, '../../services/photo');

console.log(photoDir)

fs.readdir(photoDir, function(err,files){
  //获取目录所有图片，并生成文件
  // console.log(files);
  var msg = JSON.stringify(files);
  console.log(msg)
  // fs.writeFile("img/图片名字.json", msg, function(){
  //   console.log("添加日志成功");
  // });
})

app.use('/public', express.static(__dirname + '../../services/photo'))

app.get('/', (req, res) => {
  res.send('hello world')
})

app.listen(port)
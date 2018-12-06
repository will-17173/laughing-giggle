const express = require('express')
const app = express()
const port = 3000

var fs = require('fs');
var path = __dirname + '../../services/photo';

fs.readdir(path,function(err,files){
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
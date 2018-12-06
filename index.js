const express = require('express')
const app = express()
const port = 3000
const fs = require('fs')
const path = require('path')
// const photoDir = path.join(__dirname, '../../services/photo/JianGuo');
const photoDir = '../../services/photo/JianGuo'

function readFileList (path, filesList) {
  var files = fs.readdirSync(path)
  files.forEach(function (itm, index) {
    var stat = fs.statSync(path + itm)
    if (stat.isDirectory()) {
      // 递归读取文件
      readFileList(path + itm + '/', filesList)
    } else {
      var obj = {} // 定义一个对象存放文件的路径和名字
      obj.path = path // 路径
      obj.filename = itm // 名字
      filesList.push(obj)
    }
  })
}
var getFiles = {
  // 获取文件夹下的所有文件
  getFileList: function (path) {
    var filesList = []
    readFileList(path, filesList)
    return filesList
  },
  // 获取文件夹下的所有图片
  getImageFiles: function (path) {
    var imageList = []

    this.getFileList(path).forEach(item => {
      var ms = image(fs.readFileSync(item.path + item.filename))

      ms.mimeType && imageList.push(item.filename)
    })
    return imageList
  }
}

console.log(getFiles.getImageFiles(photoDir))

app.use('/public', express.static(__dirname + '../../services/photo'))

app.get('/', (req, res) => {
  res.send('hello world')
})

app.listen(port)

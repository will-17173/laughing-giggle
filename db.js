const fs = require('fs')
const path = require('path')

const dirs = [
  '../../services/photo/JianGuo/',
  '../../services/photo/PRO7/'
]

const names = [
  'JianGuo',
  'PRO7'
]

function makeJSON(dir, i){
  const files = fs.readdirSync(dir);
  var fileList = []
  files.forEach((file, j) => {
    if(path.extname(file).toLowerCase() === '.jpg'){
      fileList.push(path.basename(file))
    }
  })
  fs.writeFileSync(`./db/${names[i]}.json`, JSON.stringify(fileList))
}

dirs.forEach((dir, i) => {
  makeJSON(dir, i)
})
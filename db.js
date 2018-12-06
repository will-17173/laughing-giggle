const fs = require('fs')
const path = require('path')

const dirs = [
  '../../services/photo/JianGuo/',
  '../../services/photo/PRO7/',
  '../../services/photo/5c/',
  '../../services/photo/6s/',
  '../../services/photo/JianguoPro2/',
  '../../services/photo/MI8/',
  '../../services/photo/Note6/',
]

const names = [
  'JianGuo',
  'PRO7',
  '5c',
  '6s',
  'JianguoPro2',
  'MI8',
  'Note6',
]

function makeJSON(dir, i){
  const files = fs.readdirSync(dir);
  var fileList = []
  files.forEach((file, j) => {
    if(path.extname(file).toLowerCase() === '.jpg'){
      fileList.push(path.basename(file))
    }
  })
  fs.writeFileSync(`../../services/photo/${names[i]}.json`, JSON.stringify(fileList))
}

dirs.forEach((dir, i) => {
  makeJSON(dir, i)
})
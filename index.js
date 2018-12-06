const express = require('express')
const app = express()
const port = 3000
const fs = require('fs');
const path = require('path')
const photoDir = path.join(__dirname, '../../services/photo');
// const photoDir = __dirname;

// 获取指定路径 path 下的，默认深度为 3 的目录 JSON
function getIndexByPath(dir, deep = 3) {
    let dirDevide = dir.split('/');
    let preDir = dirDevide.splice(0, dirDevide.length - 1).join('/');
    let index = {};
    getIndexOfPathByDeep(index, path.join(__dirname, preDir), dirDevide[0], deep + 1);
    return index;
}
// 开始对指定 path 递归查找深度为 deep 深度
function getIndexOfPathByDeep(obj, dir, curDir, deep) {
    let curPath = path.join(dir, curDir);
    // 达到搜索深度，停止
    if(deep) {
        obj[curDir] = curDir;
        if(fs.statSync(curPath).isDirectory()) {
            obj[curDir] = {};
            let lists = fs.readdirSync(curPath);
            lists.forEach(list => getIndexOfPathByDeep(obj[curDir], curPath, list, deep - 1))
        }
    }
}

console.log(getIndexByPath('./../../services/photo'))

app.use('/public', express.static(__dirname + '../../services/photo'))

app.get('/', (req, res) => {
  res.send('hello world')
})

app.listen(port)
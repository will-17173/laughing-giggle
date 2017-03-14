var browserSync = require('browser-sync');

browserSync({
    server: {
        baseDir: "src",
        index: "index.html"
    },
    proxy: 'http://onfocus.win',
    port:10001,
    files: ["src/*.html", "src/css/*.css", "src/app.dist.js"]
});

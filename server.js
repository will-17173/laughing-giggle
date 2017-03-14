var browserSync = require('browser-sync');

browserSync({
    server: {
        baseDir: "src",
        index: "index.html"
    },
    port:10001,
    files: ["src/*.html", "src/css/*.css", "src/app.dist.js"]
});

var browserSync = require('browser-sync');

browserSync({
    server: {
        baseDir: "src",
        index: "index.html"
    },
    files: ["src/*.html", "src/css/*.css", "src/app.dist.js"]
});

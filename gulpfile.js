const {src, dest, series, watch} = require('gulp')
const del = require('del')
const browserSync = require('browser-sync').create()
const reload = browserSync.reload
// gulp-uglify => plugins.uglify = require('gulp-uglify')
const plugins = require('gulp-load-plugins')()

// 压缩js uglifyjs
function js(cb) {
  src('js/*.js')
    // 下一个处理环节
    .pipe(plugins.uglify())
    .pipe(dest('./dist/js'))
    .pipe(reload({stream: true}))
    cb()
}

// 对scss/less编译，压缩，输出css文件
function css(cb) {
  src('css/*.scss')
  .pipe(plugins.sass({ outputStyle: 'compressed' }))
  .pipe(plugins.autoprefixer({
    cascade: false,
    remove: false
  }))
  .pipe(dest('./dist/css'))
  .pipe(reload({stream: true}))
  cb()
}

// 监听文件变化
function watcher(cb) {
  watch('js/*.js', js)
  watch('css/*.scss', css)
  cb()
}

// 删除dist目录中的内容
function clean(cb) {
  del('./dist')
  cb()
}

function serve(cb) {
  browserSync.init({
    server: {
      baseDir: './'
    }
  })
  cb()
}

exports.scripts = js
exports.styles = css
exports.clean = clean
exports.default = series([
  clean,
  js,
  css,
  serve,
  watcher
])
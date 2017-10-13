//创建一个gulp对象
var gulp = require('gulp');
/*
	引入图片压缩的插件
*/
var imagemin = require("gulp-imagemin");

//实现对index.html首页的拷贝
gulp.task('index',function(){
	return gulp.src('html/index.html')
	       .pipe(connect.reload());
});
//实现对图片的压缩
gulp.task('images',function(){
	return gulp.src('images/**/*')
//		  .pipe(imagemin())
	      .pipe(gulp.dest('dist/images/'))
	      .pipe(connect.reload());

});
/*
	拷贝两个文件夹中的文件到一个目的文件夹中
*/

gulp.task("data", function(){
	return gulp.src('data/**/*')
	.pipe(gulp.dest("dist/data"))
	.pipe(connect.reload());
});
gulp.task("css", function(){
	return gulp.src('css/**/*')
	.pipe(gulp.dest("dist/css"))
	.pipe(connect.reload());
});
gulp.task("js", function(){
	return gulp.src('js/**/*')
	.pipe(gulp.dest("dist/js"))
	.pipe(connect.reload());
});
gulp.task("html", function(){
	return gulp.src('html/**/*')
	.pipe(gulp.dest("dist/html"))
	.pipe(connect.reload());
});

var scss=require('gulp-scss');
var minifycss = require("gulp-minify-css");
var uglify = require("gulp-uglify");
var rename = require("gulp-rename");



gulp.task('scss',function(){
return gulp.src('scss/*.scss')
	   .pipe(scss())
	   .pipe(gulp.dest('css'))
	   .pipe(minifycss())
	   .pipe(rename('index.min.css'))
	   .pipe(gulp.dest('dist/css'))
	   .pipe(connect.reload());

});
gulp.task('watch',function(){
	gulp.watch("html/index.html", ['index']);
	gulp.watch('scss/*.scss',['scss']);
	gulp.watch('css/*.css',['css']);
	gulp.watch('js/*.js',['js']);
	gulp.watch('html/*.html',['html']);
	gulp.watch('data/**/*',['data']);

});
var connect=require('gulp-connect');
gulp.task('server',function(){
	connect.server({
		root:'dist',//声明服务器的根目录
		livereload:true //开启直播
	})
});
gulp.task('default',['server','watch','index','scss','css','js','html','data']);
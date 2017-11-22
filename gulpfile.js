var gulp=require('gulp');
var webserver=require('gulp-webserver');
var url = require('url');
var fs = require('fs');
gulp.task('webserver',function(){
    gulp.src('.')
        .pipe(webserver({
            port:8080,
            host:'localhost',
            middleware:function(req,res,next){
                var obj = url.parse(req.url);
                if(req.method=='GET'){
                    if(obj.pathname=='/getdata'){
                        res.end(fs.readFileSync('data.json'))
                    }else if(obj.pathname=='/'){
                        res.end(fs.readFileSync('index.html'))
                    }else{
                        next();
                    }
                }else{
                    next();
                }
            }
        }))
})
gulp.task('default',['webserver'])
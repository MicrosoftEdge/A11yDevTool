var gulp =  require('gulp');
var exec = require('gulp-exec');
var fs = require('fs');
var builder = require('xmlbuilder');

gulp.task('buildStrings', function(){    
    /*
    Example xml string
        
    <string id="202" name="BreakpointsWindowTitle">
        <value>Breakpoints</value>
        <comment></comment>
    </string>  
    */
    fs.readFile('PropertyMapping.json', 'utf8', function (err,data) {
        var items = JSON.parse(data);
        var outputPath = 'dist';
        var outputFileName = 'accessibilityTool.strings'; 
        var startingIdNumber = 1000;  
        var jsonA11yProps = [];  
        
        var xmlDoc = builder.create('resources');
        var id = startingIdNumber;
        
        jsonA11yProps.forEach(function(items){
            id++;
            var name = 'a11y_' + item.displayName + '_tooltip';
            var stringItem = xmlDoc.ele('string', {
                'id': id,
                'name': name
            },);
            stringItem.ele('value', {},  item.description);
            stringItem.ele('comment', {},  '');
            stringItem.end({ pretty: true});
        });    
            
        console.log(xmlDoc);    
    });
});

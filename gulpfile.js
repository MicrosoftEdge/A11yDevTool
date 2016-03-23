var gulp = require('gulp');
var fs = require('fs');
var builder = require('xmlbuilder');

var outputFileName = 'accessibilityTool.strings'; 
var startingIdNumber = 1000;  

gulp.task('buildStrings', function(){    
    /*
    Example xml string
        
    <string id="202" name="BreakpointsWindowTitle">
        <value>Breakpoints</value>
        <comment></comment>
    </string>  
    */
    fs.readFile('PropertyMapping.json', 'utf8', function (err, data) {
        var jsonA11yProps = JSON.parse(data);
        var jsonA11yPropsKeys = Object.keys(jsonA11yProps);
        
        var id = startingIdNumber;
        
        var rootEl  = builder.create('resources');
        jsonA11yPropsKeys.forEach(function(key){
            var item = jsonA11yProps[key];
            var name = 'a11y_' + key + '_tooltip';      
            
            var stringObject = {
                'string': {
                    '@id': id,
                    '@name': name,                   
                    'value': item.description,
                    'comment': ''
                }
            };
            
            rootEl.ele(stringObject);
            
            id++;          
        });    
        rootEl.end({ pretty: true});
        
        fs.writeFile(outputFileName, rootEl, function(err){
            if(err) {
                return console.log(err);
            }
            
            console.log("Saved resource strings to file.");
        }); 
    });
});

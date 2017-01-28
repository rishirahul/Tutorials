/**************installing npm packages*******************
Package installation
    -> global mode (system wide)
                    npm install -g <package name>>
                    npm uninstall -g <package name>>
                    npm update -g <package name>>

    -> local mode (in current module)
        -> command line
                    npm install  <package name>>
                    npm uninstall  <package name>>
                    npm update  <package name>>
        -> using package.json
                    {
                        "name" : "MyApp",
                        "version" : "1.0.0",
                        "dependencies" : {
                            "sax" : "0.3.x",        //x means any
                            "nano" : "*",           //latest version
                            "request" : ">0.2.0"    //any version grater than
                        }
                    }
                    // now at application root run
                    npm install
                    
*********************************************************/

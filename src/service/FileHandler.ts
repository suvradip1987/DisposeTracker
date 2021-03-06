import multer = require('multer');

export class FileHandler {

    public static Configure() {
        var customStorage = this.CreateCustomStorage();      
        return multer({
            storage: customStorage,
            limits: {
                // 50 Mb is currently the max size
                fileSize: 52428800
            },
            fileFilter(req :Express.Request, file: Express.Multer.File, callback: multer.FileFilterCallback) {                     
                if (!file.originalname.endsWith('.log')) {                           
                    return callback(new Error('Please upload Portal Profiler log.'));
                }
                callback(null, true);
            }
        }).single('file');       
    }

    private static CreateCustomStorage() {
        return multer.diskStorage({
            destination: function (req, file, cb) {                                                    
                cb(null, './temp');
            },
            filename: function (req, file, cb) {               
                var fileName= Math.random() + file.originalname;                                             
                cb(null, fileName);
                file.originalname = fileName;                              
            }
        });
    }   
}
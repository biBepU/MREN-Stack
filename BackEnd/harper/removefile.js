const fs = require('fs').promises;
const removeFile = async(path)=>{
    let fileExit;
   
    try{
      await fs.access(path);
      fileExit = true;

    }catch(e){
      fileExit = false;
    }
    if (fileExit){
      fs.unlink(path);
    }
}


module.exports = removeFile;
module.exports = app => {
    const fs = require('fs')
    const util = require('util')
    const unlinkFile = util.promisify(fs.unlink)
    const Dish = require('../models/dish.model')
    const multer = require('multer')
    const upload = multer({ dest: 'uploads/' })

    const {uploadFile, getFileStream} = require('../controller/s3.js')

    app.post('/dish/images', upload.single('image'), async (req, res) => {
        const file = req.file
        console.log("++++++",file)
        console.log("Here inside routes")
        const result = await uploadFile(file)
        await unlinkFile(file.path)
        console.log(result)
        Dish.addpic(result.key,req.body.dishId, (err,data) => {
          if(err) {
            res.status(500).send({
              message : err.message
            })
          }
          else {
            console.log("----",data)
            res.json({
              message: "Image uploaded",
              key: result.key
            })
          }
        })
      }) 
}
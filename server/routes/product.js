const router = require('express').Router();
const Product = require('../models/product');


//Upload Photo
const upload = require('../middlewares/upload-photo')


router.post('/products',upload.single("photo"), async (req, res) => {
    try {
        let product = new Product();
        product.title = req.body.title;
        product.description = req.body.description;
        product.photo = req.file.location;
        product.stockQuantity = req.body.stockQuantity;

        await product.save()

        res.status(200).json({status: true, message: "Successfully save"})

    } catch (err) {
        res.status(500).json(err);
    }
})


module.exports = router;

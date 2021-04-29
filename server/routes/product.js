const router = require('express').Router();
const Product = require('../models/product');


//Upload Photo
const upload = require('../middlewares/upload-photo')


router.post('/products', upload.single("photo"), async (req, res) => {
    try {
        let product = new Product();
        product.ownerID = req.body.ownerID;
        product.categoryID = req.body.categoryID;
        product.price = req.body.price;
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


router.get('/products', async (req, res) => {
    try {
        let products = await Product.find();

        res.json({
            products: products
        })
    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message
        })
    }
})


router.get('/products/:id', async (req, res) => {
    try {
        let product = await Product.findOne({_id: req.params.id});
        res.json({
            success: true,
            product: product
        })
    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message
        })
    }
})

router.put("/products/:id", upload.single("photo"), async (req, res) => {
    try {
        let product = await Product.findOneAndUpdate(
            {_id: req.params.id},
            {
                $set: {
                    title: req.body.title,
                    price: req.body.price,
                    category: req.body.categoryID,
                    description: req.body.description,
                    photo: req.file.location,
                    stockQuantity: req.body.stockQuantity,
                    owner: req.body.ownerID
                }
            },
            {upsert: true}
        );

        res.json({
            success: true,
            updatedProduct: product
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
});

router.delete('/products/:id', async (req, res) => {
    try {
        let product = await Product.findOneAndDelete({_id: req.params.id});

        if (product) {
            res.json({
                success: true,
                message: "product successfully deleted"
            })
        } else {
            res.json({
                success: false,
                message: "Product exist"
            })
        }
    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message
        })
    }
})


module.exports = router;

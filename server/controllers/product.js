const Product = require('../models/product');
const User = require('../models/user');
const {getPagination} = require('../utils/query')
const APIFeatures = require('../utils/apiFeatures')

exports.setProductUserId = (req, res, next) => {
    if(req.session.user) {       
        req.body.user = req.session.user
    }
    next()
}

exports.createProduct = async(req, res) => {    
    try { 
        const product = await Product.create(req.body);

        res.status(201).json({
            product
        })
    } catch (error) {
        console.log(error.message)
        res.status(400).json({
            message: error
        })
    }
};

exports.getAllProducts = async(req, res) => {
    const { skip, limit } = getPagination(req.query)
    let filter = {};

    try {
        if (req.params.tourId){
            filter = { tour: req.params.tourId }; 
        };

        const features = new APIFeatures(Product.find({},  {'__v': 0 }), req.query)
        .filter()
        .sort()
        .limitFields()
        .paginate();

        // const products = await Product.find({},  {'__v': 0 })
        // .skip(skip)
        // .limit(limit);
        const products = await features.query;

        res.status(200).json({
            status: 'success',
            products
        })
    } catch (error) {
        console.error(error)
        res.status(400).json({
            message: error
        })
    }
};

exports.getOneProduct = async(req, res) => {
    const productId = req.params.id;

    try {
        const product = await Product.findById(productId).populate('user');

        res.status(200).json({
            product
        })
    } catch (error) {
        res.status(404).json({
            message: error
        })
    } 
};

exports.updateOneProduct = async(req, res) => {
    const productId = req.params.id;
    try {
        const updateProduct = await Product.findByIdAndUpdate(productId, req.body, {
                new: true,
                runValidators: true,
                
                    // $set: req.body
                    // },
                    // {
                    //     new: true
                    // }
        });

        res.status(200).json({
            data: updateProduct
        })
    } catch (error) {
        res.status(400).json({ 
            message: error
        })
    }
};

exports.deleteImageProduct = async(req, res) => {
    const productId = req.params.id;

    try {
        const product = await Product.findById(productId);
        const productsImages = product.images;
        productsImages = productsImages.filter((img) => img !== req.body)
        product.images = productsImages
        product.save()


        res.status(200).json({
            message: "seccess"
        })
    } catch (error) {
        res.status(400).json({
            message: error
        })
    }
};

exports.deleteOneProduct = async(req, res) => {
    const productId = req.params.id;

    try {
        await Product.findByIdAndDelete(productId);

        res.status(200).json({
            message: "seccess"
        })
    } catch (error) {
        res.status(400).json({
            message: error
        })
    }
};

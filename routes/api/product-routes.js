const router = require('express').Router();
const {Product, Category, Tag, ProductTag} = require('../../models');

router.get('/', async (req, res, next) => {
    try {
        const products = await Product.findAll({
            include: { all: true },
        })
        res.send({ products })
    }
    catch (error) {
        next(error)
    }
});


router.get('/:id', async (req, res, next) => {
    try {
        let id = req.params.id;
        const data = await Product.findByPk(id, {
            include: { all: true }
        })
        if (!data) {
            res.status(404).json({ error: 'Product not found.' })
        }
        else {
            res.send({ data });
        }
    }
    catch (error) {
        next(error)
    }
});


router.post('/', async (req, res, next) => {
    try {
        const product = await Product.create(req.body)

        if (req.body.tags?.length) {
            const productTagIdArr = req.body.tags.map((tag_id) => {
                return {
                    product_id: product.id,
                    tag_id,
                };
            });
            await ProductTag.bulkCreate(productTagIdArr);
        }

        res.json({ created: product });
    }
    catch (error) {
        next(error)
    }
});


router.put('/:id', async (req, res, next) => {
    try {
        const updated = await Product.update(req.body, {
            where: {
                id: req.params.id,
            },
        })

        const productTagsSaved = await ProductTag.findAll({ 
            where: { product_id: req.params.id }
        });

        if (req.body.tags) {
            const productTagIDs = productTagsSaved.map(({ tag_id }) => tag_id);
            const newProductTags = req.body.tags
                .filter(tag_id => !productTagIDs.includes(tag_id))
                .map(tag_id => {
                    return {
                        product_id: req.params.id,
                        tag_id,
                    };
                });

            const productTagsToRemove = productTagsSaved
                .filter(({ tag_id }) => !req.body.tags.includes(tag_id))
                .map(({ id }) => id);

                console.log('productTagsToRemove', productTagsToRemove);
    
            const updatedProductTags = await Promise.all([
                ProductTag.destroy({ where: { id: productTagsToRemove } }),
                ProductTag.bulkCreate(newProductTags),
            ]);
        }

        const product = await Product.findByPk(req.params.id);

        res.json({ product })
    }
    catch (error) {
        next(error)
    }
});

router.delete('/:id', async (req, res, next) => {
    try {
        const id = req.params.id;
        const product = await Product.findByPk(id)
        
        ProductTag.destroy({
            where: { product_id: product.id }
        });
        const deleted = await product.destroy();

        res.send({ deleted })
    }
    catch (error) {
        next(error)
    }
});

module.exports = router;
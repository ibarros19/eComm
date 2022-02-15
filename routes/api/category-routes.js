const router = require('express').Router();
const { Category, Product } = require('../../models');

router.get('/', async (req, res, next) => {
    try {
        const categories = await Category.findAll({ include: Product })
        res.send({ categories })
    }
    catch (error) {
        next(error)
    }
});

router.get('/:id', async (req, res, next) => {
    try {
        const data = await Category.findByPk(req.params.id, { include: Product })
        if (!data) {
            res.status(404).json({ error: 'Category not found.' })
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
        let category_name = req.body.category_name;
        const data = await Category.findOrCreate({
            where: { category_name }
        })
        res.send({ created: data[0] });
    }
    catch (error) {
        next(error)
    }
});

router.put('/:id', async (req, res, next) => {
    try {
        const category = await Category.findByPk(req.params.id)
        category.category_name = req.body.category_name;
        if (category instanceof Category) {
            await category.save();
        }
        res.send({ category });
    }
    catch (error) {
        next(error)
    }
});

router.delete('/:id', async (req, res, next) => {
    try {
        const id = req.params.id;

        const category = await Category.findByPk(id)
        if (!category) {
            res.status(404).json({ error: 'Category not found.' })
            return
        }

        const deleted = await category.destroy()
        res.send({ deleted })
    }
    catch (error) {
        next(error)
    }
});

module.exports = router;
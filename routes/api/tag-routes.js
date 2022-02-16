const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

router.get('/', async (req, res, next) => {
    try {
        const tags = await Tag.findAll({include: Product});
        res.send({ tags })
    }
    catch (error) {
        next(error)
    }
});

router.get('/:id', async (req, res, next) => {
    try {
        let id = req.params.id;
        const data = await Tag.findByPk(id, { include: Product });
        if (!data) {
            res.status(404).json({ error: 'Tag not found.' })
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
        let tag_name = req.body.tag_name;
        const tag = await Tag.findOrCreate({
            where: { tag_name }
        });
        res.send({ created: tag[0] });
    }
    catch (error) {
        next(error)
    }
});

router.put('/:id', async (req, res, next) => {
    try {
        let id = req.params.id;
        let tag_name = req.body.tag_name;
        let tag = await Tag.findByPk(id);
        tag.tag_name = tag_name;
        if (tag instanceof Tag){
            tag.save();
        }
        res.send({ tag });
    }
    catch (error) {
        next(error)
    }
});

router.delete('/:id', async (req, res, next) => {
    try {
        const id = req.params.id;
        const tag = await Tag.findByPk(id)
        const deleted = await tag.destroy();
        res.send({ deleted })
    }
    catch (error) {
        next(error)
    }
});

module.exports = router;
const assert = require('assert')
const api = require('./api.js')

describe('Products', () => {

  var product_id
  var tag_id

  it('Create a product', async () => {
    const resTag = await api.post('tags', { tag_name: 'iPhone' })
    tag_id = resTag.data.created.id
  
    const resCategory = await api.post('categories', { category_name: 'iPhone Pro' })
    category_id = resCategory.data.created.id
  
    const res = await api.post('products', { 
      product_name: 'iPhone 13',
      price: 1200,
      stock: 30,
      tags: [tag_id],
      category_id
    })
    assert.equal(res.status, 200)
    assert.ok(res.data.created)
    assert.ok(res.data.created.id)
    assert.equal(res.data.created.product_name, 'iPhone 13')
    assert.ok(res.data.created.category_id)
    assert.equal(res.data.created.category_id, category_id)
    product_id = res.data.created.id
  })

  it('Get a product', async () => {
    const res = await api.get('products/' + product_id)
    assert.equal(res.status, 200)
    assert.ok(res.data.data)
    assert.ok(res.data.data.id)
    assert.equal(res.data.data.product_name, 'iPhone 13')
  })

  it('Verify the tag insertion', async () => {
    const res = await api.get('products/' + product_id)
    assert.equal(res.status, 200)
    assert.ok(res.data.data)
    assert.ok(res.data.data.id)
    assert.ok(res.data.data.tags)
    assert.equal(res.data.data.tags.length, 1)
    assert.equal(res.data.data.tags[0].tag_name, 'iPhone')
  })

  it('Get the product list', async () => {
    const res = await api.get('products')
    assert.equal(res.status, 200)
    assert.ok(res.data.products)
    assert.ok(Array.isArray(res.data.products))
    assert.ok(res.data.products.length > 0)
    assert.ok(res.data.products.find(x => x.product_name === 'iPhone 13'))
  })

  it('Update a product', async () => {
    const res = await api.put('products/' + product_id, {
      product_name: 'iPhone 13X',
      tags: []
    })
    assert.equal(res.status, 200)
    assert.ok(res.data.product)
    assert.ok(res.data.product.id)
    assert.equal(res.data.product.id, product_id)
    assert.equal(res.data.product.product_name, 'iPhone 13X')
    assert.ok(!res.data.product.tags)
  })

  it('Delete a product', async () => {
    const res = await api.delete('products/' + product_id)
    assert.equal(res.status, 200)
    assert.ok(res.data.deleted)
    assert.ok(res.data.deleted.id)
    assert.equal(res.data.deleted.id, product_id)
    
    try {
      await api.get('products/' + product_id)
    }
    catch (e) {
      assert.equal(e.response.status, 404)
    }

    await api.delete('tags/' + tag_id)
    await api.delete('categories/' + category_id)
  })

})
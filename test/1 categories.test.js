const assert = require('assert')
const api = require('./api.js')

describe('Categories', () => {

  var category_id

  it('Create a category', async () => {
    const res = await api.post('categories', { category_name: 'iPhone' })
    assert.equal(res.status, 200)
    assert.ok(res.data.created)
    assert.ok(res.data.created.id)
    assert.equal(res.data.created.category_name, 'iPhone')
    category_id = res.data.created.id
  })

  it('Get a category', async () => {
    const res = await api.get('categories/' + category_id)
    assert.equal(res.status, 200)
    assert.ok(res.data.data)
    assert.ok(res.data.data.id)
    assert.equal(res.data.data.category_name, 'iPhone')
  })

  it('Get the category list', async () => {
    const res = await api.get('categories')
    assert.equal(res.status, 200)
    assert.ok(res.data.categories)
    assert.ok(Array.isArray(res.data.categories))
    assert.ok(res.data.categories.length > 0)
    assert.ok(res.data.categories.find(x => x.category_name === 'iPhone'))
  })

  it('Update a category', async () => {
    const res = await api.put('categories/' + category_id, { category_name: 'iPhoneX' })
    assert.equal(res.status, 200)
    assert.ok(res.data.category)
    assert.ok(res.data.category.id)
    assert.equal(res.data.category.id, category_id)
    assert.equal(res.data.category.category_name, 'iPhoneX')
  })

  it('Delete a category', async () => {
    const res = await api.delete('categories/' + category_id)
    assert.equal(res.status, 200)
    assert.ok(res.data.deleted)
    assert.ok(res.data.deleted.id)
    assert.equal(res.data.deleted.id, category_id)
    
    try {
      await api.get('categories/' + category_id)
    }
    catch (e) {
      assert.equal(e.response.status, 404)
    }

  })

})
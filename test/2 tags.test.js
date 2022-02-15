const assert = require('assert')
const api = require('./api.js')

describe('Tags', () => {

  var tag_id

  it('Create a tag', async () => {
    const res = await api.post('tags', { name: 'mobile' })
    assert.equal(res.status, 200)
    assert.ok(res.data.created)
    assert.ok(res.data.created.id)
    assert.equal(res.data.created.name, 'mobile')
    tag_id = res.data.created.id
  })

  it('Get a tag', async () => {
    const res = await api.get('tags/' + tag_id)
    assert.equal(res.status, 200)
    assert.ok(res.data.data)
    assert.ok(res.data.data.id)
    assert.equal(res.data.data.name, 'mobile')
  })

  it('Get the tag list', async () => {
    const res = await api.get('tags')
    assert.equal(res.status, 200)
    assert.ok(res.data.tags)
    assert.ok(Array.isArray(res.data.tags))
    assert.ok(res.data.tags.length > 0)
    assert.ok(res.data.tags.find(x => x.name === 'mobile'))
  })

  it('Update a tag', async () => {
    const res = await api.put('tags/' + tag_id, { name: 'mobileX' })
    assert.equal(res.status, 200)
    assert.ok(res.data.tag)
    assert.ok(res.data.tag.id)
    assert.equal(res.data.tag.id, tag_id)
    assert.equal(res.data.tag.name, 'mobileX')
  })

  it('Delete a tag', async () => {
    const res = await api.delete('tags/' + tag_id)
    assert.equal(res.status, 200)
    assert.ok(res.data.deleted)
    assert.ok(res.data.deleted.id)
    assert.equal(res.data.deleted.id, tag_id)
    
    try {
      await api.get('tags/' + tag_id)
    }
    catch (e) {
      assert.equal(e.response.status, 404)
    }

  })

})
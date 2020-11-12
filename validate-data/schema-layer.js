module.exports = {
  $id: '/layer',
  type: 'object',
  additionalProperties: true,
  required: [
    'id',
    'name',
    'layer',
    'url'
  ],
  properties: {
    id: { type: 'string' },
    name: { type: 'string' },
    layer: { type: 'string' },
    url: { type: 'string' },
  }
}
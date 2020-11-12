module.exports = {
  $id: '/layer-group',
  type: 'object',
  additionalProperties: true,
  required: [
    'id',
    'name',
    'children',
  ],
  properties: {
    id: { type: 'string' },
    name: { type: 'string' },
    children: { 
      type: 'array', 
      items: {
        type: 'object',
        oneOf: [
          { $ref: '/layer' },
          { $ref: '/layer-group' },
        ]
      }
    }
  }
}
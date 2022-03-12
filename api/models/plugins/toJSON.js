/**
 * A mongoose schema plugin which applies the following in the toJSON transform call:
 *  - replaces _id with id
 *  - removes __v, _id
 */

const toJSON = (schema) => {
  let transform;
  if (schema.options.toJSON && schema.options.toJSON.transform) {
    transform = schema.options.toJSON.transform;
  }

  schema.options.toJSON = Object.assign(schema.options.toJSON || {}, {
    transform(doc, ret, options) {
      ret.id = ret._id.toString();
      delete ret._id;
      delete ret.__v;
      
      if (transform) {
        return transform(doc, ret, options);
      }
    },
  });
};

module.exports = toJSON;
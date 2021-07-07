

class DataModel {
    constructor(schema) {
      this.schema = schema;
    }
  
    get(_id) {
      if (_id) {
        return this.schema.findById(_id);
      } else {
        return this.schema.find({});
      }
    }
  
    create(record) {
      let item = new this.schema(record);
      return item.save();
    }
  
    update(_id, record) {
      return this.schema.findByIdAndUpdate(_id, record, { new: true });
    }
  
    delete(_id) {
      return this.schema.findByIdAndDelete(_id);
    }
  }
  
  module.exports = DataModel;
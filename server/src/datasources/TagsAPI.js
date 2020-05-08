import { DataSource } from 'apollo-datasource';

class TagsAPI extends DataSource {
  constructor({ store }) {
    super();
    this.store = store;
  }

  async getAllTags({ type }) {
    const tagType = await this.store.TagType.findOne({
      where: { label: type },
    });
    const tagArray = await this.store.Tag.findAll({
      where: { typeid: tagType.id },
    });
    return Array.isArray(tagArray)
      ? tagArray.map((tag) => this.tagReducer(tag))
      : [];
  }

  async addTag({ type, label }) {
    const tagType = await this.store.TagType.findOne({
      where: { label: type },
    });
    const tag = await this.store.Tag.create({
      typeid: tagType.id,
      label,
    });
    return this.tagReducer(tag);
  }

  async deleteTag({ id }) {
    const tag = await this.store.Tag.findByPk(id);
    if (!tag) {
      return 'ID not found';
    }
    await tag.destroy();
    return 'Success!';
  }

  async updateTag({ id, typeid, label }) {
    let tag = await this.store.Tag.findByPk(id);
    if (!tag) {
      // TODO handle errors
    }
    const updatedFields = {};
    if (typeid !== undefined) {
      updatedFields.typeid = typeid;
    }
    if (label !== undefined) {
      updatedFields.label = label;
    }
    await tag.update(updatedFields);
    tag = await this.store.Tag.findByPk(id);
    return this.tagReducer(tag);
  }

  tagReducer(tag) {
    return {
      id: tag.id,
      typeid: tag.typeid,
      label: tag.label,
    };
  }
}

export default TagsAPI;

import { DataSource } from 'apollo-datasource';
import { tagReducer, tagMutationReducer } from './TagsReducer';

class TagsAPI extends DataSource {
  constructor({ store }) {
    super();
    this.store = store;
  }

  async getAllTags({ typeid }) {
    const tagType = await this.store.TagType.findByPk(typeid);
    if (!tagType) {
      return [];
    }
    const tagArray = await this.store.Tag.findAll({
      where: { tagTypeId: tagType.id },
    });
    return Array.isArray(tagArray)
      ? tagArray.map((tag) => tagReducer(tag))
      : [];
  }

  async addTag({ typeid, label }) {
    const tagType = await this.store.TagType.findByPk(typeid);
    if (!tagType) {
      return tagMutationReducer({
        success: false,
        message: 'Type ID does not exist',
      });
    }
    const tag = await this.store.Tag.create({
      tagTypeId: tagType.id,
      label,
    });

    return tagMutationReducer({
      success: true,
      tag,
    });
  }

  async deleteTag({ id }) {
    const tag = await this.store.Tag.findByPk(id);
    if (!tag) {
      return tagMutationReducer({
        success: false,
        message: 'ID not found',
      });
    }
    await tag.destroy();
    return tagMutationReducer({
      success: true,
    });
  }

  async updateTag({ id, label }) {
    let tag = await this.store.Tag.findByPk(id);
    if (!tag) {
      return tagMutationReducer({
        success: false,
        message: 'ID does not exist',
      });
    }
    await tag.update({ label });
    tag = await this.store.Tag.findByPk(id);
    return tagMutationReducer({ tag, success: true });
  }
}

export default TagsAPI;

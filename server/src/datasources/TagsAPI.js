import { DataSource } from 'apollo-datasource';

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
      where: { typeid: tagType.id },
    });
    return Array.isArray(tagArray)
      ? tagArray.map((tag) => this.tagReducer(tag))
      : [];
  }

  async addTag({ typeid, label }) {
    const tagType = await this.store.TagType.findByPk(typeid);
    if (!tagType) {
      return this.tagMutationReducer({
        success: false,
        message: 'Type ID does not exist',
      });
    }
    const tag = await this.store.Tag.create({
      typeid: tagType.id,
      label,
    });

    return this.tagMutationReducer({
      success: true,
      tag,
    });
  }

  async deleteTag({ id }) {
    const tag = await this.store.Tag.findByPk(id);
    if (!tag) {
      return this.tagMutationReducer({
        success: false,
        message: 'ID not found',
      });
    }
    await tag.destroy();
    return this.tagMutationReducer({
      success: true,
    });
  }

  async updateTag({ id, label }) {
    let tag = await this.store.Tag.findByPk(id);
    if (!tag) {
      return this.tagMutationReducer({
        success: false,
        message: 'ID does not exist',
      });
    }
    await tag.update({ label });
    tag = await this.store.Tag.findByPk(id);
    return this.tagMutationReducer({ tag, success: true });
  }

  tagReducer(tag) {
    if (!tag) {
      return null;
    }
    return {
      id: tag.id,
      typeid: tag.typeid,
      label: tag.label,
    };
  }

  tagMutationReducer({ success = false, message = undefined, tag = null }) {
    return {
      success,
      message,
      tag: this.tagReducer(tag),
    };
  }
}

export default TagsAPI;

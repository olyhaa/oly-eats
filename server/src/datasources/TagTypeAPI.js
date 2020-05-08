import { DataSource } from 'apollo-datasource';

class TagTypeAPI extends DataSource {
  constructor({ store }) {
    super();
    this.store = store;
  }

  async getAllTagTypes() {
    const tagTypeArray = await this.store.TagType.findAll();

    return Array.isArray(tagTypeArray)
      ? tagTypeArray.map((tag_type) => this.tagTypeReducer(tag_type))
      : [];
  }

  async addTagType({ label }) {
    const tagType = await this.store.TagType.create({
      label,
    });

    return this.tagTypeMutationReducer({
      success: true,
      tagType,
    });
  }

  async deleteTagType({ id }) {
    const tagType = await this.store.TagType.findByPk(id);
    if (!tagType) {
      return this.tagTypeMutationReducer({
        success: false,
        message: 'ID not found',
      });
    }
    await tagType.destroy();
    return this.tagTypeMutationReducer({
      success: true,
    });
  }

  async updateTagType({ id, label }) {
    let tagType = await this.store.TagType.findByPk(id);
    if (!tagType) {
      return this.tagTypeMutationReducer({
        success: false,
        message: 'ID not found',
      });
    }
    await tagType.update({ label: label });
    tagType = await this.store.TagType.findByPk(id);
    return this.tagTypeMutationReducer({ tagType, success: true });
  }

  tagTypeReducer(tagType) {
    if (!tagType) {
      return null;
    }
    return {
      id: tagType.id,
      label: tagType.label,
    };
  }

  tagTypeMutationReducer({
    success = false,
    message = undefined,
    tagType = null,
  }) {
    return {
      success,
      message,
      tagType: this.tagTypeReducer(tagType),
    };
  }
}

export default TagTypeAPI;

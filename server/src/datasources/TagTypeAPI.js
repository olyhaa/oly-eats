import { tagTypeReducer, tagTypeMutationReducer } from './TagTypeReducer';

class TagTypeAPI {
  constructor({ store }) {
    this.store = store;
  }

  async getAllTagTypes() {
    const tagTypeArray = await this.store.TagType.findAll();

    return Array.isArray(tagTypeArray)
      ? tagTypeArray.map((tag_type) => tagTypeReducer(tag_type))
      : [];
  }

  async addTagType({ label }) {
    const tagType = await this.store.TagType.create({
      label,
    });

    return tagTypeMutationReducer({
      success: true,
      tagType,
    });
  }

  async deleteTagType({ id }) {
    const tagType = await this.store.TagType.findByPk(id);
    if (!tagType) {
      return tagTypeMutationReducer({
        success: false,
        message: 'ID not found',
      });
    }
    await tagType.destroy();
    return tagTypeMutationReducer({
      success: true,
    });
  }

  async updateTagType({ id, label }) {
    let tagType = await this.store.TagType.findByPk(id);
    if (!tagType) {
      return tagTypeMutationReducer({
        success: false,
        message: 'ID not found',
      });
    }
    await tagType.update({ label: label });
    tagType = await this.store.TagType.findByPk(id);
    return tagTypeMutationReducer({ tagType, success: true });
  }
}

export default TagTypeAPI;

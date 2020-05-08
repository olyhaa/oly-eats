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

    return this.tagTypeReducer(tagType);
  }

  async deleteTagType({ id }) {
    const tagType = await this.store.TagType.findByPk(id);
    if (!tagType) {
      return 'ID not found';
    }
    await tagType.destroy();
    return 'Success!';
  }

  async updateTagType({ id, label }) {
    let tagType = await this.store.TagType.findByPk(id);
    if (!tagType) {
      // TODO handle errors
    }
    await tagType.update({ label: label });
    tagType = await this.store.TagType.findByPk(id);
    return this.tagTypeReducer(tagType);
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
}

export default TagTypeAPI;

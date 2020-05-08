import { DataSource } from 'apollo-datasource';

class TagsAPI extends DataSource {
  constructor({ store }) {
    super();
    this.store = store;
  }

  async getAllTagTypes() {
    const response = await this.store.TagType.findAll();
    // TODO handle errors
    return Array.isArray(response)
      ? response.map((tag_type) => this.tagTypeReducer(tag_type))
      : [];
  }

  async addTagType({ label }) {
    const response = await this.store.TagType.create({
      label,
    });
    // TODO handle errors
    return this.tagTypeReducer(response);
  }

  async deleteTagType({ id }) {
    const response = await this.store.TagType.destroy({ where: { id: id } });
    // TODO handle errors
    return 'Success!';
  }

  async updateTagType({ id, label }) {
    let response = await this.store.TagType.update(
      { label: label },
      {
        where: { id: id },
      }
    );
    // TODO handle errors
    response = await this.store.TagType.findByPk(id);
    return this.tagTypeReducer(response);
  }

  async getAllTags({ type }) {
    const tagType = await this.store.TagType.findOne({
      where: { label: type },
    });
    const response = await this.store.Tag.findAll({
      where: { typeid: tagType.id },
    });
    return Array.isArray(response)
      ? response.map((tag) => this.tagReducer(tag))
      : [];
  }

  async addTag({ type, label }) {
    const tagType = await this.store.TagType.findOne({
      where: { label: type },
    });
    const response = await this.store.Tag.create({
      typeid: tagType.id,
      label,
    });
    return this.tagReducer(response);
  }

  async deleteTag({ id }) {
    const response = await this.store.Tag.destroy({ where: { id: id } });
    // TODO handle errors
    return 'Success!';
  }

  async updateTag({ id, typeid, label }) {
    const tag = await this.store.Tag.findByPk(id);
    if (!tag) {
      // TODO handle errors
    }
    if (typeid !== undefined) {
      tag.typeid = typeid;
    }
    if (label !== undefined) {
      tag.label = label;
    }
    let response = await this.store.Tag.update(
      { label: tag.label, typeid: tag.typeid },
      {
        where: { id: id },
      }
    );
    // TODO handle errors
    response = await this.store.Tag.findByPk(id);
    return this.tagReducer(response);
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

  tagReducer(tag) {
    return {
      id: tag.id,
      typeid: tag.typeid,
      label: tag.label,
    };
  }
}

export default TagsAPI;

export default class Book {
  constructor(book) {
    this.id = book.id;
    this.images = {
      cover: this.getCover(book),
      pages: this.getPageImages(book),
    };
    this.media_id = book.media_id;
    this.num_favorites = book.num_favorites;
    this.num_pages = book.num_pages;
    this.scanlator = book.scanlator;
    this.tags = book.tags.filter(tag => tag.type === 'tag');
    this.category = book.tags.filter(tag => tag.type === 'category');
    this.language = book.tags.filter(tag => tag.type === 'language');
    this.parody = book.tags.filter(tag => tag.type === 'parody');
    this.artist = book.tags.filter(tag => tag.type === 'artist');
    this.group = book.tags.filter(tag => tag.type === 'group');
    this.character = book.tags.filter(tag => tag.type === 'character');
    this.title = book.title;
  }

  getCover(book) {
    const coverBaseLink = `https://t.nhent.ai/galleries/${book.media_id}/cover`;
    const extension = this.getExtension(book.images.cover.t);
    const coverLink = coverBaseLink + extension;
    return {
      ...book.images.cover,
      link: coverLink,
    };
  }

  getPageImages(book) {
    const galleryBaseLink = `https://cdn.nhent.ai/galleries/${book.media_id}/`;
    const {pages} = book.images;
    const newPages = pages.map((page, index) => {
      return {
        ...page,
        link: galleryBaseLink + (index + 1) + this.getExtension(page.t),
      };
    });
    return newPages;
  }

  getExtension(t) {
    switch (t) {
      case 'j':
        return '.jpg';
      case 'p':
        return '.png';
      default:
        return '.jpg';
    }
  }
}

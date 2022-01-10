class Urls {
    constructor() {
        this.url = 'http://localhost:8000/';
    }

    categories() {
        return `${this.url}api/categories/`
    }

    category(id) {
        return `${this.url}api/categories/${id}/`
    }
    news() {
        return `${this.url}api/news/`
    }

    one_news(id) {
        return `${this.url}api/news/${id}/`
    }
    comments() {
        return `${this.url}api/comments/`
    }
    users() {
        return `${this.url}api/users/`
    }
    user(id) {
        return `${this.url}api/users/${id}/`
    }
}

export const urls = new Urls()
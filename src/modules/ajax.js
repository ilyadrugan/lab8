class Ajax {
    async get(url) {
        const response = await fetch(url, {
            method: "GET"
        });
        const responseData = await response.json();

        return {
            status: response.status,
            data: responseData
        };
    }
    async post(url,data) {
        const response = await fetch(url, {
            method: "POST",body: JSON.stringify(data)
        });
        const responseData = await response.json();

        return {
            status: response.status,
            data: responseData
        };
    }
}

export const ajax = new Ajax();
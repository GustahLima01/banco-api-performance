const confLocal = JSON.parse(open('../config/config.local.json'));

export function pegarBaseUrl() {
    const baseURL = __ENV.BASE_URL || confLocal.baseUrl;
    return baseURL;
}
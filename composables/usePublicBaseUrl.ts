export const usePublicBaseUrl = (url: string) => {
    const config = useRuntimeConfig();

    if (config.app.baseURL.length > 1) {
        return config.app.baseURL + url
    }

    return url
}
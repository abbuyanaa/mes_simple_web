module.exports = {
  development: {
    AXIOS_BASE_HOST_PORT: process.env.NEXT_PUBLIC_DEV_AXIOS_BASE_HOST_PORT,
    SERVER_PROTOCOL: process.env.NEXT_PUBLIC_DEV_SERVER_PROTOCOL,
    HTTP_SERVER_PORT: process.env.NEXT_PUBLIC_DEV_HTTP_SERVER_PORT,
    HTTPS_SERVER_PORT: process.env.NEXT_PUBLIC_DEV_HTTPS_SERVER_PORT,
  },
  production: {
    AXIOS_BASE_HOST_PORT: process.env.NEXT_PUBLIC_AXIOS_BASE_HOST_PORT,
    SERVER_PROTOCOL: process.env.NEXT_PUBLIC_SERVER_PROTOCOL,
    HTTP_SERVER_PORT: process.env.NEXT_PUBLIC_HTTP_SERVER_PORT,
    HTTPS_SERVER_PORT: process.env.NEXT_PUBLIC_HTTPS_SERVER_PORT,
  },
};

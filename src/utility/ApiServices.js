import { api } from "./ApiConfing";

export const ProtectedRoutes = async () => {
  const response = await api.request({
    url: "/api/get-subscriptions",
    method: "GET",
  });

  return response.data;
};

export const OpenRoute = {
  filter: async function ({ key, value }) {
    const response = await api.request({
      url: `/api/get-subscriptions?${key}=${value}`,
      method: "GET",
    });
    return response;
  },

  blogs: async function ({ limit, catfilter }) {
    let url;
    if (catfilter === "") {
      url = `/api/get-blogs?offset=&limit=${limit}`;
    } else {
      let spl = catfilter?.split(" ");
      url = `/api/get-blogs?offset=0&limit=${limit}&category=${spl[0]} %26 ${spl[2]}`;
    }

    const response = await api.request({
      url: url,
      method: "GET",
    });

    return response;
  },

  subscriptionByName: async function ({ name }) {
    const response = await api.request({
      url: `/api/get-subscription-details?name=${name}`,
      method: "GET",
    });

    return response;
  },
  newsLetter: async function ({ email }) {
    const requestBody = JSON.stringify({ email });

    const response = await api.request({
      url: `/api/newsletter`,
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      data: requestBody,
    });

    return response;
  },

  forgotPassword: async function ({ email }) {
    const requestBody = JSON.stringify({ email });
    const customHeaders = {
      "Content-Type": "application/json",
    };
    const response = await api.request({
      url: "/api/auth/forgot-password",
      method: "POST",
      headers: customHeaders,
      data: requestBody,
    });
    return response;
  },

  signinWithProvider: async function ({ email, name, provider }) {
    const requestBody = JSON.stringify({
      email,
      name,
      provider,
    });

    const customHeaders = {
      "Content-Type": "application/json",
    };

    const response = await api.request({
      url: "/api/auth/sso",
      method: "POST",
      headers: customHeaders,
      data: requestBody,
    });

    return response;
  },

  investerHub: async function ({ email }) {
    const requestBody = JSON.stringify({ email });

    const response = await api.request({
      url: `/api/download-pitch-request`,
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      data: requestBody,
    });

    return response;
  },

  FooterPages: async function () {
    const response = await api.request({
      url: `/api/get-pages`,
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    return response;
  },
  FooterPage: async function ({ name }) {
    const response = await api.request({
      url: `/api/get-page?page_name=${name}`,
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response;
  },
};

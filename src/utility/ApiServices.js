import { method } from "lodash";
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
    // console.log(key, value);
    // let r = `/api/get-subscriptions?${key}=${value}`;
    // console.log(r);
    const response = await api.request({
      url: `/api/get-subscriptions?${key}=${value}`,
      method: "GET",
      // signal: cancel ? cancelApiObject[this.get.name].handleRequestCancellation().signal : undefined,
    });
    return response;
  },

  blogs: async function () {
    const response = await api.request({
      url: `/api/get-blogs`,
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
};

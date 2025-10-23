import { CookieHelper } from "../../helper/cookie.helper";
import { Fetch } from "../../lib/Fetch";

const config = {
  headers: {
    "Content-Type": "application/json",
  },
};

export const UserService = {
  login: async ({ email, password }: { email: string; password: string }) => {
    const data = {
      email: email,
      password: password,
    };
    return await Fetch.post("/auth/login", data, config);
  },

  register: async ({
    username,
    email,
    password,
  }: {
    username: string;
    email: string;
    password: string;
  }) => {
    const data = {
      username: username,
      email: email,
      password: password,
    };
    return await Fetch.post("/auth/register", data, config);
  },

  logout: (context = null) => {
    CookieHelper.destroy({ key: "token", context });
  },
  // get user details
  getData: async (endpoint , token ) => {
    // const userToken = CookieHelper.get({ key: "token", context });
    const userToken = token;

    const _config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + userToken,
      },
    };

    return await Fetch.get(`${endpoint}`, _config);
  },
  getEnquiriesData: async (queryString, token) => {
    const userToken = token;

    const _config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + userToken,
      },
    };

    // Ensure query string starts with ? if it has parameters
    const endpoint = queryString ? `/admin/get-all-enquiries?${queryString}` : '/admin/get-all-enquiries';
    return await Fetch.get(endpoint, _config);
  },
  getBiodataList: async (queryString, token) => {
    const userToken = token;

    const _config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + userToken,
      },
    };

    // Ensure query string starts with ? if it has parameters
    const endpoint = queryString ? `/admin/get-bio-list?${queryString}` : '/admin/get-bio-list';
    return await Fetch.get(endpoint, _config);
  },
  getBiodata: async (id, token) => {
    const userToken = token;

    const _config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + userToken,
      },
    };

    return await Fetch.get(`/admin/get-bio-data/${id}`, _config);
  },
 getSingleBiodata: async (id: string, token: string) => {
    const userToken = token;

    const _config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + userToken,
      },
    };

    return await Fetch.get(`/admin/get-bio-data/${id}`, _config);
  },

  addEnquiry: async (formData, token) => {
    const userToken = token;

    const _config = {
      headers: {
        Authorization: "Bearer " + userToken,
         "content-type": "multipart/form-data",
      },
    };

    return await Fetch.post("/admin/add-enquiry", formData, _config);
  },
  updateEnquiry: async (id: string, formData: any, token: string) => {
    const userToken = token;

    const _config = {
      headers: {
        Authorization: "Bearer " + userToken,
        "content-type": "multipart/form-data",
      },
    };

    return await Fetch.patch(`/admin/edit-enquiry/${id}`, formData, _config);
  },
  changeEnquiryStatus: async (id: string, status: string, token: string) => {
    const userToken = token;

    const _config = {
      headers: {
        Authorization: "Bearer " + userToken,
        "Content-Type": "application/json",
      },
    };

    return await Fetch.patch(`/admin/change-enquiry-status/${id}`, { status }, _config);
  },

  addBiodata: async (formData, token) => {
    const userToken = token;
    const _config = {
      headers: {
        Authorization: "Bearer " + userToken,
        "content-type": "multipart/form-data",
      },
    };
    return await Fetch.post("/admin/add-bio", formData, _config);
  },
  updateBiodata: async (id: string, formData: any, token: string) => {
    const userToken = token;
    const _config = {
      headers: {
        Authorization: "Bearer " + userToken,
        "content-type": "multipart/form-data",
      },
    };
    return await Fetch.patch(`/admin/edit-bio-data-by-id/${id}`, formData, _config);
  },
  getUserDetails: async (token = "") => {
    // const userToken = CookieHelper.get({ key: "token", context });
    const userToken = token;

    const _config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + userToken,
      },
    };

    return await Fetch.get(`/auth/get-logged-in-user-details`, _config);
  },

  deleteBiodata: async (id: string, token) => {
    const userToken = token;
    const _config = {
      headers: {
         "Content-Type": "application/json",
        Authorization: "Bearer " + userToken,
      },
    };
    return await Fetch.delete(`/admin/delete-bio-data/${id}`, _config);
  },

  updateAvatar: async (data: any, context = null) => {
    const userToken = CookieHelper.get({ key: "token", context });

    const _config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + userToken,
        "content-type": "multipart/form-data",
      },
    };

    return await Fetch.patch(`/user/avatar`, data, _config);
  },

  //
  create: async (
    {
      fname,
      lname,
      username,
      email,
      role_id,
    }: {
      fname: string;
      lname: string;
      username: string;
      email: string;
      role_id: number;
    },
    context: any = null
  ) => {
    const userToken = CookieHelper.get({ key: "token", context });

    const _config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + userToken,
      },
    };
    const data = {
      fname: fname,
      lname: lname,
      username: username,
      email: email,
      role_id: role_id,
    };

    return await Fetch.post(`/user`, data, _config);
  },

  // TODO
  confirm: async (
    {
      id,
      token,
      email,
      password,
    }: { id: number; token: string; email: string; password: string },
    context: any = null
  ) => {
    const userToken = CookieHelper.get({ key: "token", context });

    const _config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + userToken,
      },
    };

    const data = {
      id: id,
      token: token,
      email: email,
      password: password,
    };

    return await Fetch.patch(`/user/${id}/password`, data, _config);
  },
};

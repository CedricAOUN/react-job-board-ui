import axios from "axios";
import url from "./urlService";

export async function authLogin(email, password): Promise<any> {
  return await axios.post(`${url}auth`, {
    email: `${email}`,
    password: `${password}`,
  });
}
export async function createUser(
  name,
  password,
  email,
  userType
): Promise<any> {
  return await axios.post(`${url}createUser`, {
    email: `${email}`,
    password: `${password}`,
    name: `${name}`,
    userType: `${!userType ? "regular" : "recruiter"}`,
  });
}

export async function deleteUser(email): Promise<any> {
  return await axios.post(`${url}deleteUser`, {
    email: `${email}`,
  });
}

export async function uploadFile(iduser, fileData): Promise<any> {
  const formData = new FormData();
  formData.append("iduser", iduser);
  formData.append("file", fileData);
  return await axios.post(`${url}upload`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
}

export async function cvExists(user_id): Promise<any> {
  return await axios.post(`${url}checkCV`, {
    user_id: user_id,
  });
}

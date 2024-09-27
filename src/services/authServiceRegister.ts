import axios from "axios";

const API_URL = "http://localhost:4000/graphql";

export const registerUser = async (
  name: string,
  password: string,
  role: string
) => {
  try {
    const response = await axios.post(API_URL, {
      query: `
        mutation {
          registerUser(role: "${role}", name: "${name}", password: "${password}") {
            id
            name
            role
          }
        }
      `,
    });

    return response.data.data.registerUser;
  } catch (error) {
    console.error("Error registering user:", error);
    throw new Error("Failed to register user");
  }
};

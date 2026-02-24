import { auth } from "../../lib/auth";

interface LoginPayload {
  email: string;
  password: string;
}
interface RegisterPayload {
  email: string;
  password: string;
  name: string;
  image?: string;
  phone?: string;
}

const login = async (payload: LoginPayload) => {
  const { email, password } = payload;
   console.log(payload);

  const data = await auth.api.signInEmail({
    asResponse: true,
    body: {
      email,
      password,
    },
  });

 
   console.log(data);

  return data;
};

const register = async (payload: RegisterPayload) => {
  const { name, email, password } = payload;

  const data = await auth.api.signUpEmail({
    asResponse: true,
    body: {
      name,
      email,
      password,
    },
  });
  
  return data;
};
export const AuthService = {
    login,register
};

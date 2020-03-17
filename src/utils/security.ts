import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

class Secutiy {
  static hashPasword = async (password: string): Promise<string> => {
    return await bcrypt.hash(password, 10);
  };

  static comparePassword = async (inputed: string, realPassword: string): Promise<boolean> => {
    return await bcrypt.compare(inputed, realPassword);
  };

  static generateToken = (payload: { id: number; role: string }): string => {
    return jwt.sign(payload, "my-secret-key");
  };
}

export default Secutiy;

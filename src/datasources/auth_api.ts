import { RESTDataSource } from "@apollo/datasource-rest";

export class AuthAPI extends RESTDataSource {  
  override baseURL = "http://localhost:8000"; 

  async verifyToken(token: string) {
    return this.get("/token", {
      headers: { Authorization: `Bearer ${token}` },
    });
  }

  async signin(email: string, password: string) {
    const body = new URLSearchParams();
    body.append('username', email);
    body.append('password', password);

    return this.post("/signin", {
      body: body.toString(),
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });
  }

  async signup(input: { email: string; password: string }) {
    return this.post("/signup", { body: input });
  }
}
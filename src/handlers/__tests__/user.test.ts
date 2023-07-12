import * as user from "../user";

describe("user handlers", () => {
  it("should create new user", async () => {
    const req = {
      body: {
        username: "hello",
        password: "hi",
      },
    };
    const res = {
      json({ token }) {
        console.log(token);
        
        expect(token).toBeTruthy(); // checks if token is not null
      },
    };

    await user.createNewUser(req, res, () => {});
  });
});

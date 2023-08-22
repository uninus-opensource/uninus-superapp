import { Test, TestingModule } from "@nestjs/testing";
import { UserController } from ".";
import { UserService } from "@uninus/api/services";
import { TReqToken } from "@uninus/entities";

describe("UserController", () => {
  let userController: UserController;
  let userService: UserService;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        {
          provide: UserService,
          useValue: {
            getUser: jest.fn(),
            getUsers: jest.fn(),
            getUserById: jest.fn(),
            createUser: jest.fn(),
            updateUser: jest.fn(),
            deleteUser: jest.fn(),
          },
        },
      ],
    }).compile();

    userController = app.get<UserController>(UserController);
    userService = app.get<UserService>(UserService);
  });

  describe("Get User", () => {
    it("should return user and return 200 Ok", async () => {
      const mockToken: TReqToken = {
        user: {
          sub: "a4444283-efbb-4c07-b45e-25af46db8dcf",
          email: "sugiartofahmi@gmail.com",
          role: "New Student",
        },
      };

      const expectedResult = {
        registration_status: "Belum Membayar",
        id: "b22e28a2-ab1c-4c2a-a31b-3230b03bda41",
        fullname: "Fahmi Sugiarto",
        email: "sugiartofahmi@gmail.com",
        avatar:
          "https://res.cloudinary.com/dyominih0/image/upload/v1688846789/MaleProfileDefault_hxtqcy.png",
      };

      jest.spyOn(userService, "getUser").mockResolvedValue(expectedResult);

      const response = await userController.getUser(mockToken);

      expect(response).toEqual(expectedResult);
    });
  });

  describe("Get Paginated User", () => {
    it("should return paginated user", async () => {
      const payload = {
        page: 1,
        perPage: 10,
        orderBy: "asc",
        filterBy: "createdAt",
        search: "Alyaa",
      };

      const expectedResult = {
        data: [
          {
            id: "3f8b0fb0-08e6-43e1-9e79-eb0cbd1b9bf6",
            email: "alyaningrum17@gmail.com",
            fullname: "Alyaa",
            password:
              "$argon2id$v=19$m=65536,t=3,p=4$3Wqd+6vKiUEAzhS4DkNPbg$DCItGAtc09xjz27jcjI5cbbg5xRTs/9dtJTT8tjTdyw",
            refresh_token:
              "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIzZjhiMGZiMC0wOGU2LTQzZTEtOWU3OS1lYjBjYmQxYjliZjYiLCJlbWFpbCI6ImFseWFuaW5ncnVtMTdAZ21haWwuY29tIiwicm9sZSI6Ik5ldyBTdHVkZW50IiwiaWF0IjoxNjkyNDQyOTU2LCJleHAiOjE2OTMwNDc3NTZ9.gisNqi6qWNhhnuhKiqf-i9FN7SlhQrBT0cQTwBj-Xy4",
            role_id: 1,
            createdAt: "2023-08-16T05:27:22.318Z",
            avatar:
              "https://res.cloudinary.com/dyominih0/image/upload/v1688846789/MaleProfileDefault_hxtqcy.png",
            isVerified: true,
          },
        ],
        meta: {
          total: 1,
          lastPage: 1,
          currentPage: 1,
          perPage: 10,
          prev: null,
          next: null,
        },
      };

      jest.spyOn(userService, "getUsers").mockResolvedValue(expectedResult);

      const response = await userController.getAllData(
        payload.page,
        payload.perPage,
        payload.orderBy as "asc" | "desc",
        payload.filterBy,
        payload.search,
      );

      expect(response).toEqual({
        data: expect.arrayContaining([
          expect.objectContaining({
            id: expect.any(String),
            email: expect.any(String),
            fullname: expect.any(String),
            avatar: expect.any(String),
            isVerified: expect.any(Boolean),
            role_id: expect.any(Number),
          }),
        ]),
        meta: expect.objectContaining({
          total: expect.any(Number),
          lastPage: expect.any(Number),
          currentPage: expect.any(Number),
          perPage: expect.any(Number),
          prev: null,
          next: null,
        }),
      });
    });
  });

  describe("Get Data By Id", () => {
    it("Should be return user by id and status 200", async () => {
      const id = "b22e28a2-ab1c-4c2a-a31b-3230b03bda41";

      const expectedResult = {
        registration_status: "Belum Membayar",
        id: "b22e28a2-ab1c-4c2a-a31b-3230b03bda41",
        fullname: "Fahmi Sugiarto",
        email: "sugiartofahmi@gmail.com",
        avatar:
          "https://res.cloudinary.com/dyominih0/image/upload/v1688846789/MaleProfileDefault_hxtqcy.png",
      };

      jest.spyOn(userService, "getUser").mockResolvedValue(expectedResult);

      const response = await userController.getDataById(id);

      expect(response).toEqual(expectedResult);
    });
  });

  describe("Created Data", () => {
    it("should create user and return status 201 Created", async () => {
      const payload = {
        email: "Yusronsronz7@gmail.com",
        fullname: "YusronF",
        phone_number: "81234567890",
        password: "Password123",
        role_id: 1,
      };

      const expectedResult = {
        id: "3a8a479c-920e-4782-adaa-1cf70036cb3a",
        email: "Yusronsronz7@gmail.com",
        fullname: "YusronF",
        password:
          "$argon2id$v=19$m=65536,t=3,p=4$OJrYreiiJkbX4iOBOXZapg$yQyXGhaUA7UmUz2erc9ZxX5XdKKEruWPgUeL6b1nPAs",
        refresh_token: null,
        role_id: 1,
        createdAt: "2023-08-22T04:15:40.134Z",
        avatar:
          "https://res.cloudinary.com/dyominih0/image/upload/v1688846789/MaleProfileDefault_hxtqcy.png",
        isVerified: false,
      };

      (userService.createUser as jest.Mock).mockResolvedValue(expectedResult);

      const response = await userController.createData(payload);

      expect(response).toEqual(expectedResult);
    });
  });

  describe("Update User", () => {
    it("should update a user successfully and return the updated user", async () => {
      const id = "c4e046f0-c69c-4db4-821c-fb7b4946e255";
      const payload = {
        email: "Yusronsronz7@gmail.com",
        fullname: "YusronF",
        password: "Password123",
        role_id: 1,
        photo: "",
      };

      const expectedResult = {
        data: {
          id: "c4e046f0-c69c-4db4-821c-fb7b4946e255",
          email: "Yusronsronz7@gmail.cpom",
          fullname: "YusronFN",
          password: "Password123",
          refresh_token: null,
          role_id: 1,
          createdAt: "2023-08-21T09:44:58.176Z",
          avatar: null,
          isVerified: false,
        },
        message: "Berhasil update user",
      };

      (userService.updateUser as jest.Mock).mockResolvedValue(expectedResult);

      const response = await userController.updateData(id, payload);

      expect(response).toEqual(expectedResult);
    });
  });

  describe("Delete User", () => {
    it("should delete a user successfully and return the deleted user", async () => {
      const id = "c4e046f0-c69c-4db4-821c-fb7b4946e255";

      const expectedResult = {
        data: {
          id: "c4e046f0-c69c-4db4-821c-fb7b4946e255",
          fullname: "YusronFN",
          email: "Yusronsronz7@gmail.cpom",
        },
        message: "Berhasil delete user",
      };

      (userService.deleteUser as jest.Mock).mockResolvedValue(expectedResult);

      const response = await userController.deleteData(id);

      expect(response).toEqual(expectedResult);
    });
  });
});

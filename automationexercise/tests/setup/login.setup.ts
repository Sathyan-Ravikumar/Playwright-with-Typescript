import { test as setup } from '../../fixtures/loginFixture';
import { DataProvider } from "../../utils/DataProvider";
import dotenv from "dotenv";

dotenv.config();
const jsonData = DataProvider.getTestDataFromJson("testdata/credentials.json");

setup.use({
  loginOptions: {
    email: jsonData.ValidUser.email,
    password: jsonData.ValidUser.password,
    name: jsonData.ValidUser.name,
  },
});

setup("login setup to create storage state", async ({ loggedInPage }) => {
  await loggedInPage.context().storageState({ path: ".auth/storage.json" });
});

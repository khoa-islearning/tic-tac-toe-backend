import admin from "firebase-admin";

const mockUserList = [
  {
    email: "user@example.com",
    password: "123456",
  },
];

const seedUser = async () => {
  const auth = admin.auth();
  await Promise.all(mockUserList.map((userInfo) => auth.createUser(userInfo)));
};

const enum MockInfo {
  CollectionName = "mockInfoCollection",
  DocName = "mockInfo",
}

interface MockInfoSchema {
  isSeeded: boolean;
}

export const seedStuff = async () => {
  console.info("Start seeding...");
  const db = admin.firestore();

  const mockDocRef = db
    .collection(MockInfo.CollectionName)
    .doc(MockInfo.DocName);
  const mockInfo = (await mockDocRef.get()).data() as
    | MockInfoSchema
    | undefined;
  if (mockInfo?.isSeeded) {
    // * Already seeded, no point of seed again
    console.info("Already seeded, exiting...");
    return;
  }

  console.info("Seeding users...");
  await seedUser();

  const newMockInfo: MockInfoSchema = {
    isSeeded: true,
  };
  await mockDocRef.set(newMockInfo);
};

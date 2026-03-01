import { assertEquals } from "jsr:@std/assert";
import { beforeEach, describe, it } from "jsr:@std/testing/bdd";
import { insertIntoUsers, usersList } from "../src/users_queries.js";
import { createDB, createTables } from "../src/common_queries.js";

describe("test for the users table : ", () => {
  let db;

  beforeEach(() => {
    db = createDB(":memory:");
    createTables(db);
  });

  describe("test for the insert username into the users table : ", () => {
    it("==> should insert the praveen name as a record in the users table : ", () => {
      const actual = insertIntoUsers(db, "praveen", "104");
      const expected = 1;
      assertEquals(actual.lastInsertRowid, expected);
    });
  });

  describe("test for the list functionality", () => {
    it("==> should return empty array ", () => {
      const actual = usersList(db);
      const expected = [];
      assertEquals(actual, expected);
    });

    it("==> should return the length as 1 ", () => {
      db.prepare(`insert into users (name, password) values (?, ?)`).run(
        "praveen",
        "104",
      );
      const actual = usersList(db);
      const expected = 1;
      assertEquals(actual.length, expected);
    });
  });
});

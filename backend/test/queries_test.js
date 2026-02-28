import { assertEquals } from "jsr:@std/assert";
import { beforeEach, describe, it } from "jsr:@std/testing/bdd";
import { createDB, createTables, insertIntoUsers } from "../src/queries.js";

describe("testing the database", () => {
  let db;

  beforeEach(() => {
    db = createDB(":memory:");
    createTables(db);
  });

  describe("tests for the create Tables", () => {
    it("should create two tables users and notes", () => {
      const query = `SELECT name FROM sqlite_master where name not like 'sql%'`;
      const actualTables = db.prepare(query).all();
      const expectedTables = ["notes", "users"];
      const result = actualTables.every(({ name }) =>
        expectedTables.includes(name)
      );
      assertEquals(true, result);
    });
  });

  describe("test for the insert username into the users table : ", () => {
    it("should insert the praveen name as a record in the users table : ", () => {
      const actual = insertIntoUsers(db, "praveen");
      const expected = 1;
      assertEquals(actual.lastInsertRowid, expected)
    });
  });
});

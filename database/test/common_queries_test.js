import { assertEquals } from "jsr:@std/assert";
import { beforeEach, describe, it } from "jsr:@std/testing/bdd";
import {
  createDB,
  createTables,
} from "../src/common_queries.js";

describe("testing the database", () => {
  let db;

  beforeEach(() => {
    db = createDB(":memory:");
    createTables(db);
  });

  describe("tests for the create Tables", () => {
    it("==> should create two tables users and notes", () => {
      const query = `SELECT name FROM sqlite_master where name not like 'sql%'`;
      const actualTables = db.prepare(query).all();
      const expectedTables = ["notes", "users"];
      const result = actualTables.every(({ name }) =>
        expectedTables.includes(name)
      );
      assertEquals(true, result);
    });
  });

});

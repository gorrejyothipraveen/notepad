import { assertEquals } from "jsr:@std/assert";
import { beforeEach, describe, it } from "jsr:@std/testing/bdd";
import { createDB, createTables } from "../src/queries.js";
import { table } from "node:console";

describe("testing the database", () => {
  let db;
  beforeEach(() => {
    db = createDB(":memory:");
    createTables(db);
  });
  describe("tests for the create Tables", () => {
    it("should create two tables users and notes", () => {
      const query = `SELECT name FROM sqlite_master where name not like 'sql%'`;
      const tables = db.prepare(query).all();
      const actualTables = ["notes", "users"];
      const result = tables.every(({ name }) => actualTables.includes(name));
      assertEquals(true, result);
    });
  });
});

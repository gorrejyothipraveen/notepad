import { assertEquals } from "jsr:@std/assert";
import { beforeEach, describe, it } from "jsr:@std/testing/bdd";
import { insertIntoNotes, notesList } from "../src/notes.queries.js";
import { createDB, createTables } from "../src/common_queries.js";

describe("test for the notes table : ", () => {
  let db;

  beforeEach(() => {
    db = createDB(":memory:");
    createTables(db);
  });
  
  describe("test for the insert functionality :", () => {
    it("==> should return last insert id as 1 : ", () => {
      db.prepare(`insert into users (name, password) values (?, ?)`).run("praveen", "104");
      const actual = insertIntoNotes(db, "js", "hello world", 1);
      const expected = 1;
      assertEquals(actual.lastInsertRowid, expected);
    });
  });

  describe("test fot the list functionality : ", () => {
    it("==> should return empty list : ", () => {
      db.prepare(`insert into users (name, password) values (?, ?)`).run("praveen", "104");
      const actual = notesList(db, 1);
      const expected = [];
      assertEquals(actual, expected);
    });

    it("==> should return 1 record : ", () => {
      db.prepare(`insert into users (name, password) values (?, ?)`).run("praveen", "104");
      db.prepare(`insert into notes (name, note, user_id) values (?, ?, ?)`)
        .run("js", "hello world", 1);
      const actual = notesList(db, 1);
      const expected = 1;
      assertEquals(actual.length, expected);
    });
  });
});

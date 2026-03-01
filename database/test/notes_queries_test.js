import { assertEquals } from "jsr:@std/assert";
import { beforeEach, describe, it } from "jsr:@std/testing/bdd";
import {
  getNote,
  insertIntoNotes,
  notesList,
  updateNote,
} from "../src/notes.queries.js";
import { createDB, createTables } from "../src/common_queries.js";

describe("test for the notes table : ", () => {
  let db;

  beforeEach(() => {
    db = createDB(":memory:");
    createTables(db);
  });

  describe("test for the insert functionality :", () => {
    it("==> should return last insert id as 1 : ", () => {
      db.prepare(`insert into users (name, password) values (?, ?)`).run(
        "praveen",
        "104",
      );
      const actual = insertIntoNotes(db, "js", "hello world", 1);
      const expected = 1;
      assertEquals(actual.lastInsertRowid, expected);
    });
  });

  describe("test fot the list functionality : ", () => {
    it("==> should return empty list : ", () => {
      db.prepare(`insert into users (name, password) values (?, ?)`).run(
        "praveen",
        "104",
      );
      const actual = notesList(db, 1);
      const expected = [];
      assertEquals(actual, expected);
    });

    it("==> should return 1 record : ", () => {
      db.prepare(`insert into users (name, password) values (?, ?)`).run(
        "praveen",
        "104",
      );
      db.prepare(`insert into notes (name, note, user_id) values (?, ?, ?)`)
        .run("js", "hello world", 1);
      const actual = notesList(db, 1);
      const expected = 1;
      assertEquals(actual.length, expected);
    });
  });

  describe("retrieving the single record", () => {
    it("should return undefined", () => {
      const actual = getNote(db, 1);
      const expected = undefined;
      assertEquals(actual, expected);
    });

    it("should return 1 record : ", () => {
      db.prepare(`insert into users (name, password) values (?, ?)`).run(
        "praveen",
        "104",
      );
      db.prepare(`insert into notes (name, note, user_id) values (?, ?, ?)`)
        .run("js", "hello world", 1);
      const actual = getNote(db, 1);
      const expected = "js";
      assertEquals(actual.name, expected);
    });
  });

  describe("test for the update note : ", () => {
    it("should return an error : ", () => {
      const actual = updateNote(db, 1, "hello world");
      const expected = 0;
      assertEquals(actual.changes, expected);
    });

    it("should update  the note 1 content :", () => {
      db.prepare(`insert into users (name, password) values (?, ?)`).run(
        "praveen",
        "104",
      );
      db.prepare(`insert into notes (name, note, user_id) values (?, ?, ?)`)
        .run("js", "hello world", 1);

      const actual = updateNote(db, 1, "js content");
      const expected = 1;
      assertEquals(actual.changes, expected);
    });
  });
});

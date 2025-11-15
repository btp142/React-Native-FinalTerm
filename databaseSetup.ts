// init.ts
import { db } from "./db";

export const initDB = () => {
  // Tạo bảng
  db.execSync(`
    CREATE TABLE IF NOT EXISTS movies (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      year INTEGER,
      watched INTEGER DEFAULT 0,
      rating INTEGER,
      created_at INTEGER
    );
  `);

  // Seed dữ liệu
  db.execSync(`
    INSERT INTO movies (title, year, watched, rating, created_at)
    SELECT 'Inception', 2010, 0, 5, strftime('%s','now')
    WHERE NOT EXISTS (SELECT 1 FROM movies WHERE title = 'Inception');
  `);

  db.execSync(`
    INSERT INTO movies (title, year, watched, rating, created_at)
    SELECT 'Interstellar', 2014, 0, 5, strftime('%s','now')
    WHERE NOT EXISTS (SELECT 1 FROM movies WHERE title = 'Interstellar');
  `);
};

import { open, Database } from 'sqlite';
import sqlite3 from 'sqlite3';

let instance: Database | null = null;

export async function connect() {
    if (instance) return instance;

    const db = await open({
        filename: 'database.sqlite',
        driver: sqlite3.Database
    });

    await db.exec(`
        CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT,
            email TEXT NOT NULL UNIQUE,
            password TEXT
        );
    
        CREATE TABLE IF NOT EXISTS episodes (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            title TEXT NOT NULL,
            date TEXT NOT NULL,
            description TEXT NOT NULL
        );
    
        CREATE TABLE IF NOT EXISTS characters (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL
        );
    
        CREATE TABLE IF NOT EXISTS episode_characters (
            episode_id INTEGER,
            character_id INTEGER,
            PRIMARY KEY (episode_id, character_id), 
            FOREIGN KEY (episode_id) REFERENCES episodes(id),
            FOREIGN KEY (character_id) REFERENCES characters(id)
        );
    `);
    

    instance = db;
    return db;
}

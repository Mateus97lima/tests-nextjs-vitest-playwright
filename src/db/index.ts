import { todoTableSchema } from "@/core/todo/schemas/drizzle-todo-table.schema";
import { getFullEnv } from "@/env/config"
import Database from "better-sqlite3";
import { drizzle } from "drizzle-orm/better-sqlite3";
import { migrate } from "drizzle-orm/better-sqlite3/migrator";


const makeDrizzle = () => {
 const {databaseFile, drizzleMigrationFolder, currentEnv} = getFullEnv();
 const sqliteDatabase = new Database(databaseFile);

 const db = drizzle(sqliteDatabase, {
    schema: {todo: todoTableSchema},

 });

 if(['test', 'e2e'].includes(currentEnv)) {
    migrate(db, {migrationsFolder: drizzleMigrationFolder});
 }

 return db;
};

declare global {
    // eslint-disable-next-line no-var
    var __DB__: DrizzleDatabase;
}

if(!global.__DB__) {
    globalThis.__DB__ = makeDrizzle();  // para evitar múltplas conexões em dev e test //
}

export const drizzleDatabase = { //exportando objetos com a conexão e os schemas
    db: globalThis.__DB__,
    todoTableSchema,
};

export type DrizzleDatabase = ReturnType<typeof makeDrizzle>; 




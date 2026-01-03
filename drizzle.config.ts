import { getFullEnv } from '@/env/config'
import {defineConfig} from 'drizzle-kit'

const {databaseFile, drizzleMigrationFolder, drizzleSchemasFile} = getFullEnv()

export default defineConfig({ 
    out: drizzleMigrationFolder,
    schema: drizzleSchemasFile,
    dialect: 'sqlite',
    dbCredentials: {
        url: databaseFile,
    },
});
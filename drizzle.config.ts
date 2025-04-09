import {defineConfig} from 'drizzle-kit'

export default defineConfig({
    schema:'./src/lib/drizzle/schema.ts',
    out:"./migrations",
    dialect:'postgresql',
    dbCredentials:{
        url:process.env.DATABASE_URL as string,

    },
    verbose:true,
    strict:true
})
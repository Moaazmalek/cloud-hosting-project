import {pgTable,unique,integer,varchar,serial, boolean, text, timestamp, uuid} from 'drizzle-orm/pg-core'

export const UserTable =pgTable("user",{
    //auto increment
    id:serial("id").primaryKey(),
    email:varchar('email',{length:255}).notNull().unique(),
    username:varchar('username',{length:100}).notNull(),
    password:text('password').notNull(),
    isAdmin:boolean('is_admin').notNull().default(false),
    createdAt:timestamp('created_at').defaultNow(),
    updatedAt:timestamp("updated_at").defaultNow()
})
export const ArticleTable=pgTable("article",{
    id:serial("id").primaryKey(),
    title:varchar("title",{length:200}).notNull(),
    description:text("description").notNull(),
    createdAt:timestamp('created_at').defaultNow().notNull(),
    updatedAt:timestamp("updated_at").defaultNow().notNull(),
    userId:integer("user_id").references(() => UserTable.id).notNull()
})
export const CommentTable=pgTable("comment",{
    id:serial("id").primaryKey(),
    text:varchar("title",{length:100}).notNull(),
    articleId:integer("article_id").references(() => ArticleTable.id),
    userId:integer("user_id").references(() => UserTable.id),
    createdAt:timestamp('created_at').defaultNow(),
    updatedAt:timestamp("updated_at").defaultNow(),

})

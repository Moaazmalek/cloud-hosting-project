import {pgTable,unique,integer,varchar,serial, boolean, text, timestamp, uuid} from 'drizzle-orm/pg-core'
import {relations} from 'drizzle-orm'

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
    userId:integer("user_id").references(() => UserTable.id,{onDelete:'cascade'}).notNull()
})
export const CommentTable=pgTable("comment",{
    id:serial("id").primaryKey(),
    text:varchar("title",{length:100}).notNull(),
    articleId:integer("article_id").references(() => ArticleTable.id,{onDelete:'cascade'}),
    userId:integer("user_id").references(() => UserTable.id,{onDelete:'cascade'}),
    createdAt:timestamp('created_at').defaultNow(),
    updatedAt:timestamp("updated_at").defaultNow(),

})

//relations 
export const userRelations=relations(UserTable,({many}) => ({
   articles:many(ArticleTable),
   comments:many(CommentTable)
}));
export const articleRelations=relations(ArticleTable,({one,many}) => ({
    user:one(UserTable,{
        fields:[ArticleTable.userId],
        references:[UserTable.id]
    }),
    comments:many(CommentTable)
}))
export const commentRelations=relations(CommentTable,({one}) => ({
    article:one(ArticleTable,{
        fields:[CommentTable.articleId],
        references:[ArticleTable.id]
    }),
    user:one(UserTable,{
        fields:[CommentTable.id],
        references:[UserTable.id]
    })
}))
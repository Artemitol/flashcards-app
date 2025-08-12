CREATE TABLE "question" (
	"id" serial PRIMARY KEY NOT NULL,
	"question" varchar(100),
	"answer" varchar(300),
	"created_at" timestamp DEFAULT now() NOT NULL,
	"creator_id" integer
);
--> statement-breakpoint
CREATE TABLE "user" (
	"id" serial PRIMARY KEY NOT NULL,
	"username" varchar(20),
	"email" text,
	"password" text NOT NULL,
	"salt" text NOT NULL,
	"bio" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "user_username_unique" UNIQUE("username"),
	CONSTRAINT "user_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE UNIQUE INDEX "username_idx" ON "user" USING btree ("username");
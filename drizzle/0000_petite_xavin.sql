CREATE TABLE "question_tag" (
	"question_id" integer,
	"tag_id" integer,
	CONSTRAINT "question_tag_question_id_tag_id_pk" PRIMARY KEY("question_id","tag_id")
);
--> statement-breakpoint
CREATE TABLE "question" (
	"id" serial PRIMARY KEY NOT NULL,
	"question" varchar(100),
	"answer" varchar(300),
	"created_at" timestamp DEFAULT now() NOT NULL,
	"creator_id" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE "quiz_question" (
	"quiz_id" integer,
	"question_id" integer,
	CONSTRAINT "quiz_question_question_id_quiz_id_pk" PRIMARY KEY("question_id","quiz_id")
);
--> statement-breakpoint
CREATE TABLE "quiz" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" varchar(200),
	"description" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"creator_id" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE "tag" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text,
	"created_at" timestamp DEFAULT now() NOT NULL
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

ALTER TABLE "question_tag" ALTER COLUMN "question_id" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "question_tag" ALTER COLUMN "tag_id" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "question" ALTER COLUMN "question" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "question" ALTER COLUMN "question" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "question" ALTER COLUMN "answer" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "question" ALTER COLUMN "answer" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "quiz_question" ALTER COLUMN "quiz_id" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "quiz_question" ALTER COLUMN "question_id" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "quiz" ALTER COLUMN "title" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "tag" ALTER COLUMN "name" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "user" ALTER COLUMN "username" SET DATA TYPE text;
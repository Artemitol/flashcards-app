CREATE TABLE "admin_quizzes" (
	"admin_id" integer,
	"quiz_id" integer,
	CONSTRAINT "admin_quizzes_admin_id_quiz_id_pk" PRIMARY KEY("admin_id","quiz_id")
);

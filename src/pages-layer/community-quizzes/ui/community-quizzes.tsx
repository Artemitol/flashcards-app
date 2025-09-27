import { Typography } from "@shared/ui/typography"
import cl from "./community-quizzes.module.scss"
import clsx from "clsx"
import { CreateQuizRedirect } from "@features/quiz/create"

export function CommunityQuizzes() {
    return (
        <section className={cl.communityQuizzesPage}>
            <div
                className={clsx(
                    cl.communityQuizzesPage__actionsBar,
                    cl.actionsBar
                )}
            >
                <CreateQuizRedirect />
            </div>
            <div className={cl.communityQuizzesPage__content}>
                <Typography variant='h3'>
                    Now this feature in production, come back later, but you can
                    create quiz
                </Typography>
            </div>
        </section>
    )
}

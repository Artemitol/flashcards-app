import { Typography } from "@shared/ui/typography"
import cl from "./community-quizzes.module.scss"
import clsx from "clsx"
import { CreateQuizModal_server } from "@features/quiz/create/server"
import { Suspense } from "react"

export function CommunityQuizzes() {
    return (
        <section className={cl.communityQuizzesPage}>
            <div
                className={clsx(
                    cl.communityQuizzesPage__actionsBar,
                    cl.actionsBar
                )}
            >
                <Suspense fallback={"loading..."}>
                    <CreateQuizModal_server />
                </Suspense>
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

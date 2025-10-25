import cl from "./community-quizzes.module.scss"
import clsx from "clsx"
import { CreateQuizRedirect } from "@features/quiz/create"
import { CommunityQuizzes_server } from "@features/quiz/get-all-community/server"
import { Typography } from "@shared/ui/typography"

export function CommunityQuizzesPage() {
    return (
        <section className={cl.communityQuizzesPage}>
            <div
                className={clsx(
                    cl.communityQuizzesPage__actionsBar,
                    cl.actionsBar
                )}
            >
                <Typography variant='h2'>Community quizzes</Typography>
                <CreateQuizRedirect />
            </div>
            <div className={cl.communityQuizzesPage__content}>
                <CommunityQuizzes_server />
            </div>
        </section>
    )
}

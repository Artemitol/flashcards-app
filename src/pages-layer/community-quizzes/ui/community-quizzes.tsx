import cl from "./community-quizzes.module.scss"
import clsx from "clsx"
import { CreateQuizRedirect } from "@features/quiz/create"
import { CommunityQuizzes_server } from "@features/quiz/get-all-community/server"

export function CommunityQuizzesPage() {
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
                <CommunityQuizzes_server />
            </div>
        </section>
    )
}

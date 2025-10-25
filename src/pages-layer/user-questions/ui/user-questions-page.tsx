import { CreateNewQuestion } from "@features/question/create-new"
import { QuestionsTableWidget } from "@widgets/questions-table"
import { Typography } from "@shared/ui/typography"
import cl from "./user-questions-page.module.scss"

export function UserQuestionsPage() {
    return (
        <>
            <div className={cl.title}>
                <Typography variant='h2'>
                    Questions that was created by you
                </Typography>
                <CreateNewQuestion />
            </div>
            <QuestionsTableWidget />
        </>
    )
}

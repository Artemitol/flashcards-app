import { CreateNewQuestion } from "@features/question/create-new"
import { QuestionsTableWidget } from "@widgets/questions-table"
import { Typography } from "@shared/ui/typography"

export function UserQuestionsPage() {
    return (
        <>
            <Typography variant='h2'>
                Questions that was created by you
            </Typography>
            <CreateNewQuestion />
            <QuestionsTableWidget />
        </>
    )
}

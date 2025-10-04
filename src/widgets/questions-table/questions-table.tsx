import { LoginModal } from "@features/auth/log-in"
import { verifyUser } from "@features/auth/verify-user/server"
import { QuestionsByUserList_server } from "@features/question/get-by-user/server"
import { Typography } from "@shared/ui/typography"

type QuestionsTableWidgetProps = {
    forbiddenText?: string
    forbiddenRender?: React.ReactNode
}

export async function QuestionsTableWidget(props: QuestionsTableWidgetProps) {
    const { forbiddenText, forbiddenRender } = props

    const verify = await verifyUser()

    if (verify.type === "left") {
        return (
            <>
                {forbiddenRender || (
                    <div>
                        <Typography>
                            {forbiddenText ||
                                "Cant show your questions, because you aren`t authorized"}
                        </Typography>
                        <LoginModal />
                    </div>
                )}
            </>
        )
    }

    return <QuestionsByUserList_server userId={verify.value.userId} />
}

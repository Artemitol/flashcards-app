import { Typography } from "@shared/ui/typography"
import { CreateQuizWidget_server } from "@widgets/create-quiz/server"

export function CreateQuizPage() {
    return (
        <section>
            <Typography variant='h1'>Here you can create new quiz</Typography>
            <CreateQuizWidget_server />
        </section>
    )
}

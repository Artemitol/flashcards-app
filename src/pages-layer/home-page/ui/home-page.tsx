import clsx from "clsx"
import { Typography } from "@shared/ui/typography"
import cl from "./home-page.module.scss"
import { OrbGroup } from "./orb-group/orb-group"

export function HomePage() {
    return (
        <div className={cl.homepage}>
            <section className={clsx(cl.homepage__section, cl.mainSection)}>
                <Typography variant='h1' className={cl.mainSection__title}>
                    <span>Build Custom Quizzes</span>
                    <span>in Minutes</span>
                </Typography>
                <OrbGroup />
            </section>
        </div>
    )
}

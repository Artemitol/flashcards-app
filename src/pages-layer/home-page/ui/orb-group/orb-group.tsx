"use client"

import { Button } from "@shared/ui/button"
import { useRouter } from "next/navigation"
import cl from "./orb-group.module.scss"
import { Orb } from "@shared/ui/orb"
import { useIsMobile } from "@shared/lib/shadcn"

export function OrbGroup() {
    const isMobile = useIsMobile()
    const router = useRouter()

    function onClick() {
        router.push("/community-quizzes")
    }

    return (
        <div className={cl.orbGroup} onClick={onClick}>
            <Button className={cl.orbGroup__button}>Get started</Button>
            {!isMobile && (
                <div className={cl.orbGroup__orbWrapper}>
                    <Orb className={cl.orbGroup__orb} hoverIntensity={1.5} />
                </div>
            )}
        </div>
    )
}

import { NavLink } from "@shared/ui/nav-main"
import { BookOpen, Settings2, Star, User, Users } from "lucide-react"

export const NavBarConfig: NavLink[] = [
    {
        title: "Core quizzes",
        url: "/quizzes",
        icon: <BookOpen />,
        isActive: true,
    },
    {
        title: "Community quizzes",
        url: "/community-quizzes",
        icon: <Users />,
        isActive: true,
    },
    {
        title: "Your questions",
        url: "/my-questions",
        icon: <Star />,
        isProtected: true,
    },
    {
        title: "Profile",
        url: "/profile",
        icon: <User />,
        isProtected: true,
    },
    {
        title: "Settings",
        url: "/settings",
        icon: <Settings2 />,
        isProtected: true,
    },
]

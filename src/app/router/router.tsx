import { CardsPage } from "@pages/cards"
import { AppLayout } from "@shared/ui/app-layout"
import { createBrowserRouter } from "react-router-dom"

export const router = createBrowserRouter([
    {
        path: "/",
        element: <AppLayout />,
        children: [
            {
                index: true,
                element: <CardsPage />,
            },
            {
                path: "*",
                element: <div>something went wrong...</div>,
            },
        ],
    },
])

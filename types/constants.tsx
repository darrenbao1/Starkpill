import { Page } from "./interfaces";

export abstract class Constants { 
    static readonly ACTIVE_PAGES : Page[] = [
            {
                title: "about",
                link: "/about",
                isActive: true,
            },
            {
                title: "cabinet",
                link: "/cabinet",
                isActive: true,
            },
    ]
}
import {
    AccountCircleRounded,
    DevicesRounded,
    LocalOfferRounded,
    SvgIconComponent,
} from "@mui/icons-material";
import { ReactElement } from "react";

interface Item {
    description: string;
    icon: ReactElement;
    imageDark: string;
    imageLight: string;
    title: string;
}

export const items: Item[] = [
    {
        description: "Tag-based discovery for topics and technologies.",
        icon: <LocalOfferRounded />,
        imageDark: `url(/static/images/dash-dark.png)`,
        imageLight: `url(/static/images/dash-light.png)`,
        title: "Tag",
    },
    {
        description:
            "User profiles showcasing authors’ expertise and contributions.",
        icon: <AccountCircleRounded />,
        imageDark: `url(/static/images/mobile-dark.png)`,
        imageLight: `url(/static/images/mobile-light.png)`,
        title: "Profiles",
    },
    {
        description: "Responsive design for seamless reading on any device.",
        icon: <DevicesRounded />,
        imageDark: `url(/static/images/devices-dark.png)`,
        imageLight: `url(/static/images/devices-light.png)`,
        title: "Available on all platforms",
    },
];

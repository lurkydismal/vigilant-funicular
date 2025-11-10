import Avatar from "@mui/material/Avatar";
import AvatarGroup from "@mui/material/AvatarGroup";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { TypographyVariant } from "@mui/material/styles";

export interface Author {
    name: string;
    avatar?: string;
};

export function Author({ authors, variant }: { authors: Author[], variant?: TypographyVariant }) {
    return (
        <Box
            sx={{
                alignItems: 'center',
                display: 'flex',
                flexDirection: 'row',
                gap: 2,
                justifyContent: 'space-between',
                padding: '16px',
            }}
        >
            <Box
                sx={{ display: 'flex', flexDirection: 'row', gap: 1, alignItems: 'center' }}
            >
                <AvatarGroup max={3}>
                    {authors.map((author, index) => (
                        <Avatar
                            alt={author.name}
                            key={index}
                            src={author.avatar}
                            sx={{ width: 24, height: 24 }}
                        />
                    ))}
                </AvatarGroup>
                <Typography variant={variant ?? "caption"}>
                    {authors.map((author) => author.name).join(', ')}
                </Typography>
            </Box>
        </Box>
    );
}

// TODO: Real date
export function AuthorWithDate({ authors, variant }: { authors: Author[], variant?: TypographyVariant }) {
    return (
        <Box
            sx={{
                alignItems: 'center',
                display: 'flex',
                flexDirection: 'row',
                gap: 2,
                justifyContent: 'space-between',
                padding: '16px',
            }}
        >
            <Box
                sx={{ display: 'flex', flexDirection: 'row', gap: 1, alignItems: 'center' }}
            >
                <AvatarGroup max={3}>
                    {authors.map((author, index) => (
                        <Avatar
                            alt={author.name}
                            key={index}
                            src={author.avatar}
                            sx={{ width: 24, height: 24 }}
                        />
                    ))}
                </AvatarGroup>
                <Typography variant={variant ?? "caption"}>
                    {authors.map((author) => author.name).join(', ')}
                </Typography>
            </Box>
            <Typography variant={variant ?? "caption"}>
                {
                    new Date().toLocaleDateString("en-US", {
                        month: "long",
                        day: "numeric",
                        year: "numeric",
                    })
                }
            </Typography>
        </Box>
    );
}

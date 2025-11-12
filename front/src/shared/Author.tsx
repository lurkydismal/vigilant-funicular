import * as ReactRouter from 'react-router-dom';
import Avatar from "@mui/material/Avatar";
import AvatarGroup from "@mui/material/AvatarGroup";
import Box from "@mui/material/Box";
import FollowButton from '../shared/FollowButton';
import Typography from "@mui/material/Typography";
import { TypographyVariant } from "@mui/material/styles";
import Link from '@mui/material/Link';

export interface Author {
    id: number;
    name: string;
    avatar?: string;
}

// // TODO: Accept Element to simplify other Author functions
// export function Author({ author, variant, avatarWidth, avatarHeight }: { author: Author, variant?: TypographyVariant, avatarWidth?: number, avatarHeight?: number }) {
//     const width = avatarWidth ?? 24;
//     const height = avatarHeight ?? 24;
//
//     return (
//         <Box
//             sx={{
//                 alignItems: 'center',
//                 display: 'flex',
//                 flexDirection: 'row',
//                 gap: 2,
//                 justifyContent: 'space-between',
//                 padding: '16px',
//             }}
//         >
//             <Box
//                 sx={{ display: 'flex', flexDirection: 'row', gap: 1, alignItems: 'center' }}
//             >
//                 <Avatar
//                     alt={author.name}
//                     src={author.avatar}
//                     sx={{ width, height }}
//                 />
//                 <Typography variant={variant ?? "caption"}>
//                     {author.name}
//                 </Typography>
//             </Box>
//         </Box>
//     );
// }
//
// export function Authors({ authors, variant, avatarWidth, avatarHeight }: { authors: Author[], variant?: TypographyVariant, avatarWidth?: number, avatarHeight?: number }) {
//     const width = avatarWidth ?? 24;
//     const height = avatarHeight ?? 24;
//
//     return (
//         <Box
//             sx={{
//                 alignItems: 'center',
//                 display: 'flex',
//                 flexDirection: 'row',
//                 gap: 2,
//                 justifyContent: 'space-between',
//                 padding: '16px',
//             }}
//         >
//             <Box
//                 sx={{ display: 'flex', flexDirection: 'row', gap: 1, alignItems: 'center' }}
//             >
//                 <AvatarGroup max={3}>
//                     {authors.map((author, index) => (
//                         <Avatar
//                             alt={author.name}
//                             key={index}
//                             src={author.avatar}
//                             sx={{ width, height }}
//                         />
//                     ))}
//                 </AvatarGroup>
//                 <Typography variant={variant ?? "caption"}>
//                     {authors.map((author) => author.name).join(', ')}
//                 </Typography>
//             </Box>
//         </Box>
//     );
// }
//
// // TODO: Real date
// export function AuthorWithDate({ author, variant, avatarWidth, avatarHeight }: { author: Author, variant?: TypographyVariant, avatarWidth?: number, avatarHeight?: number }) {
//     const width = avatarWidth ?? 24;
//     const height = avatarHeight ?? 24;
//
//     return (
//         <Box
//             sx={{
//                 alignItems: 'center',
//                 display: 'flex',
//                 flexDirection: 'row',
//                 gap: 2,
//                 justifyContent: 'space-between',
//                 padding: '16px',
//             }}
//         >
//             <Box
//                 sx={{ display: 'flex', flexDirection: 'row', gap: 1, alignItems: 'center' }}
//             >
//                 <Avatar
//                     alt={author.name}
//                     src={author.avatar}
//                     sx={{ width, height }}
//                 />
//                 <Typography variant={variant ?? "caption"}>
//                     {author.name}
//                 </Typography>
//             </Box>
//             <Typography variant={variant ?? "caption"}>
//                 {
//                     new Date().toLocaleDateString("en-US", {
//                         month: "long",
//                         day: "numeric",
//                         year: "numeric",
//                     })
//                 }
//             </Typography>
//         </Box>
//     );
// }
//
// // TODO: Author id
// export function AuthorWithDateAndLink({ author, variant, avatarWidth, avatarHeight }: { author: Author, variant?: TypographyVariant, avatarWidth?: number, avatarHeight?: number }) {
//     const navigate = ReactRouter.useNavigate();
//
//     const width = avatarWidth ?? 24;
//     const height = avatarHeight ?? 24;
//
//     return (
//         <Box
//             sx={{
//                 alignItems: 'center',
//                 display: 'flex',
//                 flexDirection: 'row',
//                 gap: 2,
//                 justifyContent: 'space-between',
//                 padding: '16px',
//             }}
//         >
//             <Link
//                 onClick={() => { navigate(`/profile/${1}`) }}
//                 underline='none'
//                 href="#"
//             >
//                 <Box
//                     sx={{ display: 'flex', flexDirection: 'row', gap: 1, alignItems: 'center' }}
//                 >
//                     <Avatar
//                         alt={author.name}
//                         src={author.avatar}
//                         sx={{ width, height }}
//                     />
//                     <Typography variant={variant ?? "caption"}>
//                         {author.name}
//                     </Typography>
//                 </Box>
//             </Link>
//             <Typography variant={variant ?? "caption"}>
//                 {
//                     new Date().toLocaleDateString("en-US", {
//                         month: "long",
//                         day: "numeric",
//                         year: "numeric",
//                     })
//                 }
//             </Typography>
//         </Box>
//     );
// }
//
// export function AuthorsWithDate({ authors, variant, avatarWidth, avatarHeight }: { authors: Author[], variant?: TypographyVariant, avatarWidth?: number, avatarHeight?: number }) {
//     const width = avatarWidth ?? 24;
//     const height = avatarHeight ?? 24;
//
//     return (
//         <Box
//             sx={{
//                 alignItems: 'center',
//                 display: 'flex',
//                 flexDirection: 'row',
//                 gap: 2,
//                 justifyContent: 'space-between',
//                 padding: '16px',
//             }}
//         >
//             <Box
//                 sx={{ display: 'flex', flexDirection: 'row', gap: 1, alignItems: 'center' }}
//             >
//                 <AvatarGroup max={3}>
//                     {authors.map((author, index) => (
//                         <Avatar
//                             alt={author.name}
//                             key={index}
//                             src={author.avatar}
//                             sx={{ width, height }}
//                         />
//                     ))}
//                 </AvatarGroup>
//                 <Typography variant={variant ?? "caption"}>
//                     {authors.map((author) => author.name).join(', ')}
//                 </Typography>
//             </Box>
//             <Typography variant={variant ?? "caption"}>
//                 {
//                     new Date().toLocaleDateString("en-US", {
//                         month: "long",
//                         day: "numeric",
//                         year: "numeric",
//                     })
//                 }
//             </Typography>
//         </Box>
//     );
// }
//
// export function AuthorWithFollow({ author, variant, avatarWidth, avatarHeight, doesFollow }: { author: Author, variant?: TypographyVariant, avatarWidth?: number, avatarHeight?: number, doesFollow: boolean }) {
//     const width = avatarWidth ?? 24;
//     const height = avatarHeight ?? 24;
//
//
//     // TODO: Implement author id
//     return (
//         <Box
//             sx={{
//                 alignItems: 'center',
//                 display: 'flex',
//                 flexDirection: 'row',
//                 gap: 2,
//                 justifyContent: 'space-between',
//                 padding: '16px',
//             }}
//         >
//             <Box
//                 sx={{ display: 'flex', flexDirection: 'row', gap: 1, alignItems: 'center' }}
//             >
//                 <Avatar
//                     alt={author.name}
//                     src={author.avatar}
//                     sx={{ width, height }}
//                 />
//                 <Typography variant={variant ?? "caption"}>
//                     {author.name}
//                 </Typography>
//             </Box>
//             <FollowButton id={Math.floor(Math.random() * 1000)} doesFollow={doesFollow} size='large'></FollowButton>
//         </Box>
//     );
// }
//
// // TODO: Author id
// export function AuthorWithFollowAndLink({ author, variant, avatarWidth, avatarHeight, doesFollow }: { author: Author, variant?: TypographyVariant, avatarWidth?: number, avatarHeight?: number, doesFollow: boolean }) {
//     const navigate = ReactRouter.useNavigate();
//     // href={`/profile/${id}`}
//
//     const width = avatarWidth ?? 24;
//     const height = avatarHeight ?? 24;
//
//
//     // TODO: Implement author id
//     return (
//         <Box
//             sx={{
//                 alignItems: 'center',
//                 display: 'flex',
//                 flexDirection: 'row',
//                 gap: 2,
//                 justifyContent: 'space-between',
//                 padding: '16px',
//             }}
//         >
//             <Link
//                 onClick={() => { navigate(`/profile/${1}`) }}
//                 underline='none'
//                 href="#"
//             >
//                 <Box
//                     sx={{ display: 'flex', flexDirection: 'row', gap: 1, alignItems: 'center' }}
//                 >
//                     <Avatar
//                         alt={author.name}
//                         src={author.avatar}
//                         sx={{ width, height }}
//                     />
//                     <Typography variant={variant ?? "caption"}>
//                         {author.name}
//                     </Typography>
//                 </Box>
//             </Link>
//             <FollowButton id={Math.floor(Math.random() * 1000)} doesFollow={doesFollow}></FollowButton>
//         </Box>
//     );
// }

// Helper: base container for an author row.
function AuthorRow({ left, right }: { left: React.ReactNode; right?: React.ReactNode }) {
    return (
        <Box sx={{
            alignItems: 'center',
            display: 'flex',
            flexDirection: 'row',
            gap: 2,
            justifyContent: 'space-between',
            padding: '16px'
        }}>
            {left}
            {right && right}
        </Box>
    );
}

// Helper: single author avatar + name.
function AuthorInfo({
    author,
    variant = "caption",
    avatarWidth = 24,
    avatarHeight = 24
}: {
    author: Author;
    variant?: TypographyVariant;
    avatarWidth?: number;
    avatarHeight?: number;
}) {
    return (
        <Box sx={{ display: 'flex', flexDirection: 'row', gap: 1, alignItems: 'center' }}>
            <Avatar alt={author.name} src={author.avatar} sx={{ width: avatarWidth, height: avatarHeight }} />
            <Typography variant={variant}>{author.name}</Typography>
        </Box>
    );
}

// Helper: multiple authors (AvatarGroup + names).
function AuthorsInfo({
    authors,
    variant = "caption",
    avatarWidth = 24,
    avatarHeight = 24
}: {
    authors: Author[];
    variant?: TypographyVariant;
    avatarWidth?: number;
    avatarHeight?: number;
}) {
    return (
        <Box sx={{ display: 'flex', flexDirection: 'row', gap: 1, alignItems: 'center' }}>
            <AvatarGroup max={3}>
                {authors.map((author) => (
                    <Avatar
                        key={author.id}
                        alt={author.name}
                        src={author.avatar}
                        sx={{ width: avatarWidth, height: avatarHeight }}
                    />
                ))}
            </AvatarGroup>
            <Typography variant={variant}>
                {authors.map((author) => author.name).join(', ')}
            </Typography>
        </Box>
    );
}

// Refactored components using the helpers:

export function Author({ author, variant, avatarWidth, avatarHeight }: {
    author: Author;
    variant?: TypographyVariant;
    avatarWidth?: number;
    avatarHeight?: number;
}) {
    return <AuthorRow left={<AuthorInfo author={author} variant={variant} avatarWidth={avatarWidth} avatarHeight={avatarHeight} />} />;
}

export function Authors({ authors, variant, avatarWidth, avatarHeight }: {
    authors: Author[];
    variant?: TypographyVariant;
    avatarWidth?: number;
    avatarHeight?: number;
}) {
    return <AuthorRow left={<AuthorsInfo authors={authors} variant={variant} avatarWidth={avatarWidth} avatarHeight={avatarHeight} />} />;
}

export function AuthorWithDate({ author, date = new Date(), variant, avatarWidth, avatarHeight }: {
    author: Author;
    date?: Date;
    variant?: TypographyVariant;
    avatarWidth?: number;
    avatarHeight?: number;
}) {
    return (
        <AuthorRow
            left={<AuthorInfo author={author} variant={variant} avatarWidth={avatarWidth} avatarHeight={avatarHeight} />}
            right={<Typography variant={variant ?? "caption"}>
                {date.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
            </Typography>}
        />
    );
}

export function AuthorWithDateAndLink({ author, date = new Date(), variant, avatarWidth, avatarHeight }: {
    author: Author;
    date?: Date;
    variant?: TypographyVariant;
    avatarWidth?: number;
    avatarHeight?: number;
}) {
    const navigate = ReactRouter.useNavigate();

    return (
        <AuthorRow
            left={
                <Link onClick={() => navigate(`/profile/${author.id}`)} underline="none" href="#">
                    <AuthorInfo author={author} variant={variant} avatarWidth={avatarWidth} avatarHeight={avatarHeight} />
                </Link>
            }
            right={<Typography variant={variant ?? "caption"}>
                {date.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
            </Typography>}
        />
    );
}

export function AuthorsWithDate({ authors, date = new Date(), variant, avatarWidth, avatarHeight }: {
    authors: Author[];
    date?: Date;
    variant?: TypographyVariant;
    avatarWidth?: number;
    avatarHeight?: number;
}) {
    return (
        <AuthorRow
            left={<AuthorsInfo authors={authors} variant={variant} avatarWidth={avatarWidth} avatarHeight={avatarHeight} />}
            right={<Typography variant={variant ?? "caption"}>
                {date.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
            </Typography>}
        />
    );
}

export function AuthorWithFollow({ author, variant, avatarWidth, avatarHeight, doesFollow }: {
    author: Author;
    variant?: TypographyVariant;
    avatarWidth?: number;
    avatarHeight?: number;
    doesFollow: boolean;
}) {
    return (
        <AuthorRow
            left={<AuthorInfo author={author} variant={variant} avatarWidth={avatarWidth} avatarHeight={avatarHeight} />}
            right={<FollowButton id={author.id} doesFollow={doesFollow} size='large' />}
        />
    );
}

export function AuthorWithFollowAndLink({ author, variant, avatarWidth, avatarHeight, doesFollow }: {
    author: Author;
    variant?: TypographyVariant;
    avatarWidth?: number;
    avatarHeight?: number;
    doesFollow: boolean;
}) {
    const navigate = ReactRouter.useNavigate();

    return (
        <AuthorRow
            left={
                <Link onClick={() => navigate(`/profile/${author.id}`)} underline='none' href="#">
                    <AuthorInfo author={author} variant={variant} avatarWidth={avatarWidth} avatarHeight={avatarHeight} />
                </Link>
            }
            right={<FollowButton id={author.id} doesFollow={doesFollow} size='large' />}
        />
    );
}

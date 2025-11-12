import * as React from 'react';
import * as ReactRouter from 'react-router-dom';
import Box from '@mui/material/Box';
import CardMedia from '@mui/material/CardMedia';
import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';
import Link from '@mui/material/Link';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Paper from '@mui/material/Paper';
import ReactMarkdown from 'react-markdown';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import mermaid from 'mermaid';
import rehypeKatex from 'rehype-katex';
import remarkGFM from 'remark-gfm';
import remarkMath from 'remark-math';
import { AuthorsWithDate } from '../../shared/Author';
import { Post } from '../../shared/Posts';
import { PrismAsync as SyntaxHighlighter } from 'react-syntax-highlighter'; // TODO: Maybe import Light version instead
import { oneDark as darkTheme, oneLight as lightTheme } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { postsData } from '../../shared/TestData';
import { useTheme } from '@mui/material/styles';

function Mermaid({ chart }: any) {
    const theme = useTheme();
    const container = React.useRef<HTMLDivElement | null>(null);

    React.useEffect(() => {
        if (!container.current) return;

        mermaid.initialize({
            startOnLoad: false, // We render manually
            theme: (theme.palette.mode === 'dark') ? "dark" : "default",
        });

        const id = "mermaid-" + Math.random().toString(36).substring(2, 11);

        mermaid.render(
            id,
            chart,
        ).then((result) => {
            container.current!.innerHTML = result.svg;
        }).catch((err) => {
            container.current!.innerHTML = `<pre style="color:red;">${err instanceof Error ? err.message : String(err)
                }</pre>`;
        });
    }, [chart, theme]);

    return (
        <Container
            sx={{
                zoom: '90%',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                width: '100%',
                height: '100%',
            }}
            ref={container}
        />
    );
}

// TODO: Copy button
function CodeBlock({ inline, className, children, ...props }: {
    inline?: boolean,
    className?: string,
    children?: React.ReactNode,
    node?: unknown,
    [key: string]: any,
}) {
    const theme = useTheme();

    // Detect language dynamically
    const match = /language-(\w+)/.exec(className || "");

    if (inline || !match) {
        return (
            <Typography
                {...props}
                component="code"
                sx={{
                    fontSize: '0.875rem',
                    backgroundColor: (theme.palette.mode === 'dark') ? 'grey.800' : 'grey.200',
                    color: (theme.palette.mode === 'dark') ? 'grey.100' : 'grey.900',
                    borderRadius: 1,
                    px: 1,
                    py: 0,
                }}
            >
                {children}
            </Typography>
        );
    }

    const lang = match[1];

    if (lang === "mermaid") {
        return <Mermaid chart={String(children).trim()} />;
    }

    const text = Array.isArray(children) ? children.join("") : String(children);

    const lineAmount = text.trimEnd().split("\n").length;

    return (
        <SyntaxHighlighter
            {...props}
            PreTag="div"
            showLineNumbers={lineAmount > 1}
            style={(theme.palette.mode === 'dark') ? darkTheme : lightTheme}
            language={lang}
        >
            {text.trimEnd()}
        </SyntaxHighlighter>
    );
}

const MarkdownComponents = {
    // Code
    code: CodeBlock,

    // Heading
    h1: ({ children }: any) => (
        <Typography variant="h3" gutterBottom>{children}</Typography>
    ),
    h2: ({ children }: any) => (
        <Typography variant="h4" gutterBottom>{children}</Typography>
    ),
    h3: ({ children }: any) => (
        <Typography variant="h5" gutterBottom>{children}</Typography>
    ),
    h4: ({ children }: any) => (
        <Typography variant="h6" gutterBottom>{children}</Typography>
    ),
    h5: ({ children }: any) => (
        <Typography variant="subtitle1" gutterBottom>{children}</Typography>
    ),
    h6: ({ children }: any) => (
        <Typography variant="subtitle2" gutterBottom>{children}</Typography>
    ),

    // Paragraph
    p: ({ children }: any) => (
        <Typography variant="subtitle1">{children}</Typography>
    ),

    // Link
    // TODO: Sanitize link maybe
    a: ({ href, children }: any) => (
        <Link href={href} target="_blank" rel="noopener noreferrer">{children}</Link>
    ),

    // Lists
    // TODO: Ordered list
    ul: ({ children }: any) => <ListItem><ListItemText>{children}</ListItemText></ListItem>,
    ol: ({ children }: any) => <ListItem><ListItemText>{children}</ListItemText></ListItem>,
    li: ({ children }: any) => <List>{children}</List>,

    // Blockquote
    blockquote: ({ children }: any) => (
        <Typography
            component="blockquote"
            sx={{ borderLeft: '4px solid', paddingLeft: 2, color: 'text.secondary', fontStyle: 'italic' }}
        >
            {children}
        </Typography>
    ),

    // Horizontal rule
    hr: () => (
        <Divider sx={{ borderColor: '#ccc', margin: '16px 0' }} />
    ),

    // Image
    // TODO: Make zoomable
    img: ({ src, alt }: any) => (
        <CardMedia
            component="img"
            image={src}
            alt={alt}
            sx={{
                minWidth: '10%',
                maxWidth: '50%',
                borderRadius: 4,
            }}
        />
    ),

    // remark-gfm
    // Table
    table: ({ children }: any) => (
        <TableContainer component={Paper}>
            <Table
                stickyHeader
                sx={{ minWidth: 650 }}
            >
                {children}
            </Table>
        </TableContainer>
    ),
    thead: ({ children }: any) => <TableHead>{children}</TableHead>,
    tbody: ({ children }: any) => <TableBody>{children}</TableBody>,
    tr: ({ children }: any) => <TableRow>{children}</TableRow>,
    th: ({ children }: any) => <TableCell>{children}</TableCell>,
    td: ({ children }: any) => <TableCell>{children}</TableCell>,

    del: ({ node, ...props }: any) => (
        <del {...props} ></del>
    ),

    // Math
    // TODO: Block math size
    // math: ({ node, ...props }: any) => (
    //     <del {...props} ></del>
    // ),
};

export default function MainContent() {
    const { id } = ReactRouter.useParams();
    const post: Post = postsData[Number(id!)];

    const properties = {
        authors: post.authors,
        variant: 'h4',
        avatarWidth: 36,
        avatarHeight: 36,
    } satisfies React.ComponentProps<typeof AuthorsWithDate>;

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <AuthorsWithDate {...properties} />
            <Typography variant="subtitle1" component="div">
                {post.tag}
            </Typography>
            <Typography
                gutterBottom
                tabIndex={0}
                variant="h3"
            >
                {post.title}
            </Typography>
            <CardMedia
                alt="green iguana"
                component="img"
                image={post.imageUrl ?? `https://picsum.photos/2400/1800?random=${post.id}`}
                sx={{
                    aspectRatio: '12 / 6',
                    borderBottom: '1px solid',
                    borderColor: 'divider',
                }}
            />
            <Box
                sx={{
                    typography: 'subtitle1',
                    '& math': {
                        fontSize: '1.8rem',
                    },
                }}
            >
                <ReactMarkdown
                    remarkPlugins={[remarkGFM, remarkMath]}
                    rehypePlugins={[[rehypeKatex, { output: "mathml" }]]}
                    components={{ ...MarkdownComponents }}
                >
                    {post.content}
                </ReactMarkdown>
            </Box>
        </Box >
    );
}

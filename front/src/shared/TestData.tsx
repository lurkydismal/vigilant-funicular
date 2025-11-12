export const user = {
    id: 1,
    username: "TestUser",
};

const postsDataTemp = [
    {
        description: 'Our latest engineering tools are designed to streamline workflows and boost productivity. Discover how these innovations are transforming the software development landscape.',
        content: `
\`\`\`mermaid
graph TD
    A[Start] --> B{Is it working?}
    B -->|Yes| C[Great!]
    B -->|No| D[Fix it]
\`\`\`

This is inline math: $E = mc^2$

And a block formula:
$$
\\int_0^\\infty x^2 e^{-x} \\, dx = 2
$$

Absolutely! Here's a **comprehensive Markdown text** designed to test **all common ReactMarkdown components**, including headings, paragraphs, links, inline code, code blocks, lists, blockquotes, tables, horizontal rules, images, and more. You can paste this directly into your renderer:

# Heading 1

## Heading 2

### Heading 3

#### Heading 4

##### Heading 5

###### Heading 6

---

This is a paragraph of text in Markdown. You can also include **bold** text, *italic* text, and ~~strikethrough~~.

Here is an [external link](https://example.com) and here is an inline code snippet: \`const x = 42;\`.

> This is a blockquote. It should stand out from regular text.

---

### Lists

**Unordered list:**

- Item 1
- Item 2
  - Nested item 2a
  - Nested item 2b
- Item 3

**Ordered list:**

1. First
2. Second
3. Third
   1. Subitem a
   2. Subitem b

---

### Code Blocks

**JavaScript example:**

\`\`\`javascript
function add(a, b) {
  return a + b;
}
console.log(add(2, 3));
\`\`\`

**Python example:**

\`\`\`python
def greet(name):
    return f"Hello, {name}!"

print(greet("World"))
\`\`\`

**No language specified:**

\`\`\`
This is a code block without language
\`\`\`

Inline code example: \`console.log("Hello World")\`

---

### Tables

| Name    | Age | City          |
| ------- | --- | ------------- |
| Alice   | 25  | New York      |
| Bob     | 30  | San Francisco |
| Charlie | 35  | London        |

---

### Images

![React Logo](https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg)

---

### Horizontal Rule

---

### Miscellaneous

Some \`inline code\` inside a paragraph.

A fenced code block:

\`\`\`bash
echo "Hello, world!"
\`\`\`

Emoji test: 😄 🎉 🚀

Links with title: [Google](https://google.com "Go to Google")

---

# Welcome
Here is a \`code\` block:

\`\`\`js
console.log("Hello!");
\`\`\`

**Our** latest *engineering* tools are designed to streamline workflows and boost productivity. Discover how these innovations are transforming the software development landscape.
`,
        tag: 'Engineering',
        title: 'Revolutionizing software development with cutting-edge tools',
        authors: [
            { id: 1, name: 'Remy Sharp', avatar: '/static/images/avatar/1.jpg' },
            { id: 1, name: 'Travis Howard', avatar: '/static/images/avatar/2.jpg' },
        ],
        createdAt: new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" }),
    },
    {
        authors: [{ id: 1, name: 'Erica Johns', avatar: '/static/images/avatar/6.jpg' }],
        description: 'Explore the key features of our latest product release that are helping businesses achieve their goals. From user-friendly interfaces to robust functionality, learn why our product stands out.',
        content: 'Our latest engineering tools are designed to streamline workflows and boost productivity. Discover how these innovations are transforming the software development landscape.',
        tag: 'Product',
        title: 'Innovative product features that drive success',
        createdAt: new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" }),
    },
    {
        authors: [{ id: 1, name: 'Kate Morrison', avatar: '/static/images/avatar/7.jpg' }],
        description: 'Stay ahead of the curve with the latest design trends and insights. Our design team shares their expertise on creating intuitive and visually stunning user experiences.',
        content: 'Our latest engineering tools are designed to streamline workflows and boost productivity. Discover how these innovations are transforming the software development landscape.',
        tag: 'Design',
        title: 'Designing for the future: trends and insights',
        createdAt: new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" }),
    },
    {
        authors: [{ id: 1, name: 'Cindy Baker', avatar: '/static/images/avatar/3.jpg' }],
        description: "Take a look at our company's journey and the milestones we've achieved along the way. From humble beginnings to industry leader, discover our story of growth and success.",
        content: 'Our latest engineering tools are designed to streamline workflows and boost productivity. Discover how these innovations are transforming the software development landscape.',
        tag: 'Company',
        title: "Our company's journey: milestones and achievements",
        createdAt: new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" }),
    },
    {
        description: "Learn about our commitment to sustainability and the innovative engineering solutions we're implementing to create a greener future. Discover the impact of our eco-friendly initiatives.",
        content: 'Our latest engineering tools are designed to streamline workflows and boost productivity. Discover how these innovations are transforming the software development landscape.',
        tag: 'Engineering',
        title: 'Pioneering sustainable engineering solutions',
        authors: [
            { id: 1, name: 'Agnes Walker', avatar: '/static/images/avatar/4.jpg' },
            { id: 1, name: 'Trevor Henderson', avatar: '/static/images/avatar/5.jpg' },
        ],
        createdAt: new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" }),
    },
    {
        authors: [{ id: 1, name: 'Travis Howard', avatar: '/static/images/avatar/2.jpg' }],
        description: 'Our recent product updates are designed to help you maximize efficiency and achieve more. Get a detailed overview of the new features and improvements that can elevate your workflow.',
        content: 'Our latest engineering tools are designed to streamline workflows and boost productivity. Discover how these innovations are transforming the software development landscape.',
        tag: 'Product',
        title: 'Maximizing efficiency with our latest product updates',
        createdAt: new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" }),
    },
    {
        authors: [{ id: 1, name: 'Erica Johns', avatar: '/static/images/avatar/6.jpg' }],
        description: 'Explore the key features of our latest product release that are helping businesses achieve their goals. From user-friendly interfaces to robust functionality, learn why our product stands out.',
        content: 'Our latest engineering tools are designed to streamline workflows and boost productivity. Discover how these innovations are transforming the software development landscape.',
        tag: 'Product',
        title: 'Innovative product features that drive success',
        createdAt: new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" }),
    },
    {
        authors: [{ id: 1, name: 'Kate Morrison', avatar: '/static/images/avatar/7.jpg' }],
        description: 'Stay ahead of the curve with the latest design trends and insights. Our design team shares their expertise on creating intuitive and visually stunning user experiences.',
        content: 'Our latest engineering tools are designed to streamline workflows and boost productivity. Discover how these innovations are transforming the software development landscape.',
        tag: 'Design',
        title: 'Designing for the future: trends and insights',
        createdAt: new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" }),
    },
    {
        authors: [{ id: 1, name: 'Cindy Baker', avatar: '/static/images/avatar/3.jpg' }],
        description: "Take a look at our company's journey and the milestones we've achieved along the way. From humble beginnings to industry leader, discover our story of growth and success.",
        content: 'Our latest engineering tools are designed to streamline workflows and boost productivity. Discover how these innovations are transforming the software development landscape.',
        tag: 'Company',
        title: "Our company's journey: milestones and achievements",
        createdAt: new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" }),
    },
    {
        description: "Learn about our commitment to sustainability and the innovative engineering solutions we're implementing to create a greener future. Discover the impact of our eco-friendly initiatives.",
        content: 'Our latest engineering tools are designed to streamline workflows and boost productivity. Discover how these innovations are transforming the software development landscape.',
        tag: 'Engineering',
        title: 'Pioneering sustainable engineering solutions',
        authors: [
            { id: 1, name: 'Agnes Walker', avatar: '/static/images/avatar/4.jpg' },
            { id: 1, name: 'Trevor Henderson', avatar: '/static/images/avatar/5.jpg' },
        ],
        createdAt: new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" }),
    },
    {
        authors: [{ id: 1, name: 'Travis Howard', avatar: '/static/images/avatar/2.jpg' }],
        description: 'Our recent product updates are designed to help you maximize efficiency and achieve more. Get a detailed overview of the new features and improvements that can elevate your workflow.',
        content: 'Our latest engineering tools are designed to streamline workflows and boost productivity. Discover how these innovations are transforming the software development landscape.',
        tag: 'Product',
        title: 'Maximizing efficiency with our latest product updates',
        createdAt: new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" }),
    },
    {
        description: 'Our latest engineering tools are designed to streamline workflows and boost productivity. Discover how these innovations are transforming the software development landscape.',
        content: 'Our latest engineering tools are designed to streamline workflows and boost productivity. Discover how these innovations are transforming the software development landscape.',
        tag: 'Engineering',
        title: 'Revolutionizing software development with cutting-edge tools',
        authors: [
            { id: 1, name: 'Remy Sharp', avatar: '/static/images/avatar/1.jpg' },
            { id: 1, name: 'Travis Howard', avatar: '/static/images/avatar/2.jpg' },
        ],
        createdAt: new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" }),
    },
    {
        authors: [{ id: 1, name: 'Erica Johns', avatar: '/static/images/avatar/6.jpg' }],
        description: 'Explore the key features of our latest product release that are helping businesses achieve their goals. From user-friendly interfaces to robust functionality, learn why our product stands out.',
        content: 'Our latest engineering tools are designed to streamline workflows and boost productivity. Discover how these innovations are transforming the software development landscape.',
        tag: 'Product',
        title: 'Innovative product features that drive success',
        createdAt: new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" }),
    },
    {
        authors: [{ id: 1, name: 'Kate Morrison', avatar: '/static/images/avatar/7.jpg' }],
        description: 'Stay ahead of the curve with the latest design trends and insights. Our design team shares their expertise on creating intuitive and visually stunning user experiences.',
        content: 'Our latest engineering tools are designed to streamline workflows and boost productivity. Discover how these innovations are transforming the software development landscape.',
        tag: 'Design',
        title: 'Designing for the future: trends and insights',
        createdAt: new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" }),
    },
    {
        authors: [{ id: 1, name: 'Cindy Baker', avatar: '/static/images/avatar/3.jpg' }],
        description: "Take a look at our company's journey and the milestones we've achieved along the way. From humble beginnings to industry leader, discover our story of growth and success.",
        content: 'Our latest engineering tools are designed to streamline workflows and boost productivity. Discover how these innovations are transforming the software development landscape.',
        tag: 'Company',
        title: "Our company's journey: milestones and achievements",
        createdAt: new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" }),
    },
    {
        description: "Learn about our commitment to sustainability and the innovative engineering solutions we're implementing to create a greener future. Discover the impact of our eco-friendly initiatives.",
        content: 'Our latest engineering tools are designed to streamline workflows and boost productivity. Discover how these innovations are transforming the software development landscape.',
        tag: 'Engineering',
        title: 'Pioneering sustainable engineering solutions',
        authors: [
            { id: 1, name: 'Agnes Walker', avatar: '/static/images/avatar/4.jpg' },
            { id: 1, name: 'Trevor Henderson', avatar: '/static/images/avatar/5.jpg' },
        ],
        createdAt: new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" }),
    },
    {
        authors: [{ id: 1, name: 'Travis Howard', avatar: '/static/images/avatar/2.jpg' }],
        description: 'Our recent product updates are designed to help you maximize efficiency and achieve more. Get a detailed overview of the new features and improvements that can elevate your workflow.',
        content: 'Our latest engineering tools are designed to streamline workflows and boost productivity. Discover how these innovations are transforming the software development landscape.',
        tag: 'Product',
        title: 'Maximizing efficiency with our latest product updates',
        createdAt: new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" }),
    },
    {
        description: 'Our latest engineering tools are designed to streamline workflows and boost productivity. Discover how these innovations are transforming the software development landscape.',
        content: 'Our latest engineering tools are designed to streamline workflows and boost productivity. Discover how these innovations are transforming the software development landscape.',
        tag: 'Engineering',
        title: 'Revolutionizing software development with cutting-edge tools',
        authors: [
            { id: 1, name: 'Remy Sharp', avatar: '/static/images/avatar/1.jpg' },
            { id: 1, name: 'Travis Howard', avatar: '/static/images/avatar/2.jpg' },
        ],
        createdAt: new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" }),
    },
    {
        authors: [{ id: 1, name: 'Erica Johns', avatar: '/static/images/avatar/6.jpg' }],
        description: 'Explore the key features of our latest product release that are helping businesses achieve their goals. From user-friendly interfaces to robust functionality, learn why our product stands out.',
        content: 'Our latest engineering tools are designed to streamline workflows and boost productivity. Discover how these innovations are transforming the software development landscape.',
        tag: 'Product',
        title: 'Innovative product features that drive success',
        createdAt: new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" }),
    },
    {
        authors: [{ id: 1, name: 'Kate Morrison', avatar: '/static/images/avatar/7.jpg' }],
        description: 'Stay ahead of the curve with the latest design trends and insights. Our design team shares their expertise on creating intuitive and visually stunning user experiences.',
        content: 'Our latest engineering tools are designed to streamline workflows and boost productivity. Discover how these innovations are transforming the software development landscape.',
        tag: 'Design',
        title: 'Designing for the future: trends and insights',
        createdAt: new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" }),
    },
    {
        authors: [{ id: 1, name: 'Cindy Baker', avatar: '/static/images/avatar/3.jpg' }],
        description: "Take a look at our company's journey and the milestones we've achieved along the way. From humble beginnings to industry leader, discover our story of growth and success.",
        content: 'Our latest engineering tools are designed to streamline workflows and boost productivity. Discover how these innovations are transforming the software development landscape.',
        tag: 'Company',
        title: "Our company's journey: milestones and achievements",
        createdAt: new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" }),
    },
    {
        description: "Learn about our commitment to sustainability and the innovative engineering solutions we're implementing to create a greener future. Discover the impact of our eco-friendly initiatives.",
        content: 'Our latest engineering tools are designed to streamline workflows and boost productivity. Discover how these innovations are transforming the software development landscape.',
        tag: 'Engineering',
        title: 'Pioneering sustainable engineering solutions',
        authors: [
            { id: 1, name: 'Agnes Walker', avatar: '/static/images/avatar/4.jpg' },
            { id: 1, name: 'Trevor Henderson', avatar: '/static/images/avatar/5.jpg' },
        ],
        createdAt: new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" }),
    },
    {
        authors: [{ id: 1, name: 'Travis Howard', avatar: '/static/images/avatar/2.jpg' }],
        description: 'Our recent product updates are designed to help you maximize efficiency and achieve more. Get a detailed overview of the new features and improvements that can elevate your workflow.',
        content: 'Our latest engineering tools are designed to streamline workflows and boost productivity. Discover how these innovations are transforming the software development landscape.',
        tag: 'Product',
        title: 'Maximizing efficiency with our latest product updates',
        createdAt: new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" }),
    },
    {
        description: 'Our latest engineering tools are designed to streamline workflows and boost productivity. Discover how these innovations are transforming the software development landscape.',
        content: 'Our latest engineering tools are designed to streamline workflows and boost productivity. Discover how these innovations are transforming the software development landscape.',
        tag: 'Engineering',
        title: 'Revolutionizing software development with cutting-edge tools',
        authors: [
            { id: 1, name: 'Remy Sharp', avatar: '/static/images/avatar/1.jpg' },
            { id: 1, name: 'Travis Howard', avatar: '/static/images/avatar/2.jpg' },
        ],
        createdAt: new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" }),
    },
    {
        authors: [{ id: 1, name: 'Erica Johns', avatar: '/static/images/avatar/6.jpg' }],
        description: 'Explore the key features of our latest product release that are helping businesses achieve their goals. From user-friendly interfaces to robust functionality, learn why our product stands out.',
        content: 'Our latest engineering tools are designed to streamline workflows and boost productivity. Discover how these innovations are transforming the software development landscape.',
        tag: 'Product',
        title: 'Innovative product features that drive success',
        createdAt: new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" }),
    },
    {
        authors: [{ id: 1, name: 'Kate Morrison', avatar: '/static/images/avatar/7.jpg' }],
        description: 'Stay ahead of the curve with the latest design trends and insights. Our design team shares their expertise on creating intuitive and visually stunning user experiences.',
        content: 'Our latest engineering tools are designed to streamline workflows and boost productivity. Discover how these innovations are transforming the software development landscape.',
        tag: 'Design',
        title: 'Designing for the future: trends and insights',
        createdAt: new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" }),
    },
    {
        authors: [{ id: 1, name: 'Cindy Baker', avatar: '/static/images/avatar/3.jpg' }],
        description: "Take a look at our company's journey and the milestones we've achieved along the way. From humble beginnings to industry leader, discover our story of growth and success.",
        content: 'Our latest engineering tools are designed to streamline workflows and boost productivity. Discover how these innovations are transforming the software development landscape.',
        tag: 'Company',
        title: "Our company's journey: milestones and achievements",
        createdAt: new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" }),
    },
    {
        description: "Learn about our commitment to sustainability and the innovative engineering solutions we're implementing to create a greener future. Discover the impact of our eco-friendly initiatives.",
        content: 'Our latest engineering tools are designed to streamline workflows and boost productivity. Discover how these innovations are transforming the software development landscape.',
        tag: 'Engineering',
        title: 'Pioneering sustainable engineering solutions',
        authors: [
            { id: 1, name: 'Agnes Walker', avatar: '/static/images/avatar/4.jpg' },
            { id: 1, name: 'Trevor Henderson', avatar: '/static/images/avatar/5.jpg' },
        ],
        createdAt: new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" }),
    },
    {
        authors: [{ id: 1, name: 'Travis Howard', avatar: '/static/images/avatar/2.jpg' }],
        description: 'Our recent product updates are designed to help you maximize efficiency and achieve more. Get a detailed overview of the new features and improvements that can elevate your workflow.',
        content: 'Our latest engineering tools are designed to streamline workflows and boost productivity. Discover how these innovations are transforming the software development landscape.',
        tag: 'Product',
        title: 'Maximizing efficiency with our latest product updates',
        createdAt: new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" }),
    },
    {
        description: 'Our latest engineering tools are designed to streamline workflows and boost productivity. Discover how these innovations are transforming the software development landscape.',
        content: 'Our latest engineering tools are designed to streamline workflows and boost productivity. Discover how these innovations are transforming the software development landscape.',
        tag: 'Engineering',
        title: 'Revolutionizing software development with cutting-edge tools',
        authors: [
            { id: 1, name: 'Remy Sharp', avatar: '/static/images/avatar/1.jpg' },
            { id: 1, name: 'Travis Howard', avatar: '/static/images/avatar/2.jpg' },
        ],
        createdAt: new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" }),
    },
    {
        authors: [{ id: 1, name: 'Erica Johns', avatar: '/static/images/avatar/6.jpg' }],
        description: 'Explore the key features of our latest product release that are helping businesses achieve their goals. From user-friendly interfaces to robust functionality, learn why our product stands out.',
        content: 'Our latest engineering tools are designed to streamline workflows and boost productivity. Discover how these innovations are transforming the software development landscape.',
        tag: 'Product',
        title: 'Innovative product features that drive success',
        createdAt: new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" }),
    },
    {
        authors: [{ id: 1, name: 'Kate Morrison', avatar: '/static/images/avatar/7.jpg' }],
        description: 'Stay ahead of the curve with the latest design trends and insights. Our design team shares their expertise on creating intuitive and visually stunning user experiences.',
        content: 'Our latest engineering tools are designed to streamline workflows and boost productivity. Discover how these innovations are transforming the software development landscape.',
        tag: 'Design',
        title: 'Designing for the future: trends and insights',
        createdAt: new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" }),
    },
    {
        authors: [{ id: 1, name: 'Cindy Baker', avatar: '/static/images/avatar/3.jpg' }],
        description: "Take a look at our company's journey and the milestones we've achieved along the way. From humble beginnings to industry leader, discover our story of growth and success.",
        content: 'Our latest engineering tools are designed to streamline workflows and boost productivity. Discover how these innovations are transforming the software development landscape.',
        tag: 'Company',
        title: "Our company's journey: milestones and achievements",
        createdAt: new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" }),
    },
    {
        description: "Learn about our commitment to sustainability and the innovative engineering solutions we're implementing to create a greener future. Discover the impact of our eco-friendly initiatives.",
        content: 'Our latest engineering tools are designed to streamline workflows and boost productivity. Discover how these innovations are transforming the software development landscape.',
        tag: 'Engineering',
        title: 'Pioneering sustainable engineering solutions',
        authors: [
            { id: 1, name: 'Agnes Walker', avatar: '/static/images/avatar/4.jpg' },
            { id: 1, name: 'Trevor Henderson', avatar: '/static/images/avatar/5.jpg' },
        ],
        createdAt: new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" }),
    },
    {
        authors: [{ id: 1, name: 'Travis Howard', avatar: '/static/images/avatar/2.jpg' }],
        description: 'Our recent product updates are designed to help you maximize efficiency and achieve more. Get a detailed overview of the new features and improvements that can elevate your workflow.',
        content: 'Our latest engineering tools are designed to streamline workflows and boost productivity. Discover how these innovations are transforming the software development landscape.',
        tag: 'Product',
        title: 'Maximizing efficiency with our latest product updates',
        createdAt: new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" }),
    },
    {
        description: 'Our latest engineering tools are designed to streamline workflows and boost productivity. Discover how these innovations are transforming the software development landscape.',
        content: 'Our latest engineering tools are designed to streamline workflows and boost productivity. Discover how these innovations are transforming the software development landscape.',
        tag: 'Engineering',
        title: 'Revolutionizing software development with cutting-edge tools',
        authors: [
            { id: 1, name: 'Remy Sharp', avatar: '/static/images/avatar/1.jpg' },
            { id: 1, name: 'Travis Howard', avatar: '/static/images/avatar/2.jpg' },
        ],
        createdAt: new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" }),
    },
    {
        authors: [{ id: 1, name: 'Erica Johns', avatar: '/static/images/avatar/6.jpg' }],
        description: 'Explore the key features of our latest product release that are helping businesses achieve their goals. From user-friendly interfaces to robust functionality, learn why our product stands out.',
        content: 'Our latest engineering tools are designed to streamline workflows and boost productivity. Discover how these innovations are transforming the software development landscape.',
        tag: 'Product',
        title: 'Innovative product features that drive success',
        createdAt: new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" }),
    },
    {
        authors: [{ id: 1, name: 'Kate Morrison', avatar: '/static/images/avatar/7.jpg' }],
        description: 'Stay ahead of the curve with the latest design trends and insights. Our design team shares their expertise on creating intuitive and visually stunning user experiences.',
        content: 'Our latest engineering tools are designed to streamline workflows and boost productivity. Discover how these innovations are transforming the software development landscape.',
        tag: 'Design',
        title: 'Designing for the future: trends and insights',
        createdAt: new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" }),
    },
    {
        authors: [{ id: 1, name: 'Cindy Baker', avatar: '/static/images/avatar/3.jpg' }],
        description: "Take a look at our company's journey and the milestones we've achieved along the way. From humble beginnings to industry leader, discover our story of growth and success.",
        content: 'Our latest engineering tools are designed to streamline workflows and boost productivity. Discover how these innovations are transforming the software development landscape.',
        tag: 'Company',
        title: "Our company's journey: milestones and achievements",
        createdAt: new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" }),
    },
    {
        description: "Learn about our commitment to sustainability and the innovative engineering solutions we're implementing to create a greener future. Discover the impact of our eco-friendly initiatives.",
        content: 'Our latest engineering tools are designed to streamline workflows and boost productivity. Discover how these innovations are transforming the software development landscape.',
        tag: 'Engineering',
        title: 'Pioneering sustainable engineering solutions',
        authors: [
            { id: 1, name: 'Agnes Walker', avatar: '/static/images/avatar/4.jpg' },
            { id: 1, name: 'Trevor Henderson', avatar: '/static/images/avatar/5.jpg' },
        ],
        createdAt: new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" }),
    },
    {
        authors: [{ id: 1, name: 'Travis Howard', avatar: '/static/images/avatar/2.jpg' }],
        description: 'Our recent product updates are designed to help you maximize efficiency and achieve more. Get a detailed overview of the new features and improvements that can elevate your workflow.',
        content: 'Our latest engineering tools are designed to streamline workflows and boost productivity. Discover how these innovations are transforming the software development landscape.',
        tag: 'Product',
        title: 'Maximizing efficiency with our latest product updates',
        createdAt: new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" }),
    },
    {
        description: 'Our latest engineering tools are designed to streamline workflows and boost productivity. Discover how these innovations are transforming the software development landscape.',
        content: 'Our latest engineering tools are designed to streamline workflows and boost productivity. Discover how these innovations are transforming the software development landscape.',
        tag: 'Engineering',
        title: 'Revolutionizing software development with cutting-edge tools',
        authors: [
            { id: 1, name: 'Remy Sharp', avatar: '/static/images/avatar/1.jpg' },
            { id: 1, name: 'Travis Howard', avatar: '/static/images/avatar/2.jpg' },
        ],
        createdAt: new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" }),
    },
    {
        authors: [{ id: 1, name: 'Erica Johns', avatar: '/static/images/avatar/6.jpg' }],
        description: 'Explore the key features of our latest product release that are helping businesses achieve their goals. From user-friendly interfaces to robust functionality, learn why our product stands out.',
        content: 'Our latest engineering tools are designed to streamline workflows and boost productivity. Discover how these innovations are transforming the software development landscape.',
        tag: 'Product',
        title: 'Innovative product features that drive success',
        createdAt: new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" }),
    },
    {
        authors: [{ id: 1, name: 'Kate Morrison', avatar: '/static/images/avatar/7.jpg' }],
        description: 'Stay ahead of the curve with the latest design trends and insights. Our design team shares their expertise on creating intuitive and visually stunning user experiences.',
        content: 'Our latest engineering tools are designed to streamline workflows and boost productivity. Discover how these innovations are transforming the software development landscape.',
        tag: 'Design',
        title: 'Designing for the future: trends and insights',
        createdAt: new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" }),
    },
    {
        authors: [{ id: 1, name: 'Cindy Baker', avatar: '/static/images/avatar/3.jpg' }],
        description: "Take a look at our company's journey and the milestones we've achieved along the way. From humble beginnings to industry leader, discover our story of growth and success.",
        content: 'Our latest engineering tools are designed to streamline workflows and boost productivity. Discover how these innovations are transforming the software development landscape.',
        tag: 'Company',
        title: "Our company's journey: milestones and achievements",
        createdAt: new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" }),
    },
    {
        description: "Learn about our commitment to sustainability and the innovative engineering solutions we're implementing to create a greener future. Discover the impact of our eco-friendly initiatives.",
        content: 'Our latest engineering tools are designed to streamline workflows and boost productivity. Discover how these innovations are transforming the software development landscape.',
        tag: 'Engineering',
        title: 'Pioneering sustainable engineering solutions',
        authors: [
            { id: 1, name: 'Agnes Walker', avatar: '/static/images/avatar/4.jpg' },
            { id: 1, name: 'Trevor Henderson', avatar: '/static/images/avatar/5.jpg' },
        ],
        createdAt: new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" }),
    },
    {
        authors: [{ id: 1, name: 'Travis Howard', avatar: '/static/images/avatar/2.jpg' }],
        description: 'Our recent product updates are designed to help you maximize efficiency and achieve more. Get a detailed overview of the new features and improvements that can elevate your workflow.',
        content: 'Our latest engineering tools are designed to streamline workflows and boost productivity. Discover how these innovations are transforming the software development landscape.',
        tag: 'Product',
        title: 'Maximizing efficiency with our latest product updates',
        createdAt: new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" }),
    },
];

export const postsData = postsDataTemp.map((post, index) => ({
    ...post,
    id: index,
}));

export const tags = [
    {
        id: 1,
        name: 'Engineering',
    },
    {
        id: 2,
        name: 'Product',
    },
    {
        id: 3,
        name: 'Design',
    },
    {
        id: 4,
        name: 'Company',
    },
];

export const follows = postsData.map((post) => (
    {
        author: post.authors[0],
        post,
    }
));

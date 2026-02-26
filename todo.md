For a **blog post creation flow** in a social network, split the problem into:

1. **Content**
2. **Metadata**
3. **Distribution**
4. **Social / Collaboration**
5. **SEO / Platform**

Your current setup mixes critical and non-critical inputs too early. Co-author, category, and preview image are not primary authoring tasks — content is.

---

## Recommended Flow (2–3 Steps)

### **Step 1 — Write (Primary Task)**

This must be frictionless and immediate.

**Fields (top → bottom):**

* **Title** *(required)*
* **Subtitle / Description** *(optional, short summary — also reused as meta description)*
* **Content editor (Markdown)**
* Live preview toggle *(not split 50/50 by default — preview on demand or resizable)*

**Inline / contextual:**

* Reading time (auto)
* Word count (auto)
* Estimated publish date (if scheduled later)

Do **not** ask for:

* Category
* Co-authors
* Preview image
* Tags
  before the user even writes anything.

---

### **Step 2 — Post Settings (Metadata & Distribution)**

Group by intent.

#### A. **Visibility**

* Visibility:

  * Public
  * Followers
  * Unlisted (link only)
  * Private (draft / collaborators only)
* Allow comments (on/off)
* Content warning (optional)

---

#### B. **Organization**

* Category *(single select preferred)*
* Tags *(multi-select or freeform)*

Avoid forcing taxonomy here — users often don't know categories until the post is done.

---

#### C. **Preview / Card**

Controls how the post appears in feeds.

* Cover image

  * Upload **or** URL
* Social title *(defaults to Title)*
* Social description *(defaults to Subtitle)*
* Custom preview image *(optional override)*

---

#### D. **Publishing**

* Publish now
* Schedule date/time
* Save draft

---

#### E. **Collaboration**

* Co-authors
* Editors (optional advanced)
* Attribution note *(e.g. “Originally published on …”)*

This should be last — it's an edge case.

---

## Layout Recommendations

### Step 1

```
[ Title                       ]

[ Subtitle / Description      ]

[ Markdown Editor        ][Preview]
[                       ][       ]
[                       ][       ]
```

Preview:

* Hidden by default on small screens
* Toggle or draggable split

---

### Step 2

Use grouped accordion or tabs:

```
Post Settings
 ├─ Visibility
 ├─ Organization
 ├─ Preview Card
 ├─ Publishing
 └─ Collaboration
```

Keep:

* Left: form
* Right: feed card preview (how it will look in timeline)

---

## Auto-Derived (Don’t Ask User)

Compute automatically:

* Slug (from title)
* Reading time
* Table of contents
* First image fallback as cover
* OpenGraph meta
* Canonical URL

---

## Draft UX You Should Have

* Autosave
* “Last saved at …”
* Restore previous version
* Dirty state warning on exit
* Keyboard publish shortcut

---

## Validation Rules

* Title required
* Content required
* Cover optional
* Category optional (unless platform needs it)

---

## Database-Level Fields (Minimum)

```
title
subtitle
content_markdown
content_html (cached)
cover_image_url
author_id
co_author_ids[]
category_id
tags[]
visibility
allow_comments
scheduled_at
published_at
slug
reading_time
is_draft
```

Optional but useful:

```
social_title
social_description
custom_og_image
content_warning
```

---

**Key change:** Make writing the first step. Everything else is post-authoring configuration. Your current order optimizes metadata before content, which increases abandonment and slows experienced users.


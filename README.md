# Web Development Lab & Practice Collection

A collection of HTML, CSS, and JavaScript work from Web Development and Design (WDD) lab sessions, along with additional independent practice projects. The repository is organised so that individual exercises can be opened and tested without needing a framework or build tool.

## What's inside

### 1. Lab work and classroom examples

The original folders and filenames from the supplied lab archive have been retained wherever possible. They include introductory HTML, CSS examples, forms, tables, JavaScript exercises, practice questions, portfolio versions, a student portal, a student scoring page, and the PrepMate and VAHANA projects.

| Folder | Contents |
| --- | --- |
| `Intro/` | Introductory HTML pages and snippets |
| `MTT/` | HTML basics, forms, tables, and CSS examples |
| `css/` | CSS practice page and stylesheet |
| `java_script/` | JavaScript samples and exercises |
| `Demojs/` and `NJS/` | JavaScript demonstrations |
| `PracticeQuesttion/` and `PYQ/` | Small practice questions and previous-question exercises |
| `Student Form/` | Student registration form |
| `StudentPortal/` | Multi-page college/student portal practice |
| `student scoring page/` and `task/` | Student marks/result pages using JavaScript |
| `Portfolio/` | Portfolio page iterations |
| `PrepMate/` | Question-practice interface with a sample CSV dataset |
| `VAHANA_WDD_Project/` | Vehicle rental website with HTML, CSS, JavaScript, CSV data, and images |
| `PAGE/` and `Validation/` | Additional page and form-validation exercises |

Some files are experiments or alternate versions of the same idea. They are kept as part of the learning trail rather than merged into one file.

### 2. Additional practice projects

These four projects use plain HTML, CSS, and JavaScript. Each has its own folder and can be run independently.

#### `Practice_Projects/01_Event_Registration/`
A campus events landing page with event previews and a registration form. Includes required-field checks, email input validation from the browser, and a confirmation message.

#### `Practice_Projects/02_Cafe_Menu/`
A cafe menu with category filters, add/remove item controls, a live item count, and a running total. The order is a front-end demonstration only.

#### `Practice_Projects/03_Trip_Planner/`
A trip-planning form with destination, date, duration, travel style, budget, and notes. It creates a trip summary on the page; it does not make bookings or check live prices.

#### `Practice_Projects/04_Student_Result_Calculator/`
A student score sheet that calculates total marks and percentage, displays subject-wise scores, and applies a simple practice pass rule and performance label.

## Technologies used

- **HTML5** for page structure, links, forms, and content.
- **CSS3** for layout, typography, colours, responsive styling, and hover states.
- **JavaScript** for form handling, input checks, filters, calculations, and dynamic page updates.
- **CSV** for sample tabular data in exercises that use it.

No package installation or framework is required for the practice projects.

## How to run the projects

1. Download or clone this repository.
2. Open the folder in VS Code or another editor.
3. Open an individual project's `index.html` file in a browser, or use the VS Code **Live Server** extension.
4. For the additional projects, keep each `index.html`, `style.css`, and `script.js` in the same project folder.
5. For multi-page lab work, navigate using the links provided in that exercise. Some exercises may rely on relative paths to images, stylesheets, JavaScript files, or CSV data, so keep the folder structure intact.

Example using Git:

```bash
git clone <repository-url>
cd WDD_Lab_and_Practice
```

Replace `<repository-url>` with the URL of your GitHub repository.

## Suggested repository map

```text
WDD_Lab_and_Practice/
├── Intro/
├── MTT/
├── css/
├── java_script/
├── Demojs/
├── PracticeQuesttion/
├── PYQ/
├── Student Form/
├── StudentPortal/
├── student scoring page/
├── Portfolio/
├── PrepMate/
├── VAHANA_WDD_Project/
├── PAGE/
├── Validation/
├── task/
├── Practice_Projects/
│   ├── 01_Event_Registration/
│   ├── 02_Cafe_Menu/
│   ├── 03_Trip_Planner/
│   └── 04_Student_Result_Calculator/
└── README.md
```

The exact set of folders reflects the contents of the supplied lab archive; minor filename differences may exist between individual exercises.

## Learning outcomes covered

- Building a page with headings, paragraphs, images, links, and lists.
- Applying CSS selectors, spacing, colours, typography, and layout rules.
- Creating forms with text, email, date, number, checkbox, and select inputs.
- Using JavaScript event listeners and reading values from form controls.
- Performing simple calculations and displaying results dynamically.
- Filtering visible content and updating a small cart/order summary.
- Organising a website into separate HTML, CSS, JavaScript, and asset files.
- Practising responsive design for smaller screens.

## Notes and limitations

- The four additional practice projects are front-end demonstrations. They do not use a server, database, real authentication, online payments, or external booking services.
- The student result calculator uses a simple example grading rule; it is not an official college grading policy.
- Sample data and form submissions are handled in the browser and are not sent to a remote service.
- Some original classroom exercises may be intentionally basic or incomplete because they represent practice examples and iterations.
- Images, CSV files, and other local assets should remain in their relative folders for pages that reference them.

## Repository purpose

This repository brings together WDD classroom exercises and additional practice in one place for revision, experimentation, and demonstrating familiarity with foundational front-end web development. The original lab exercises and the additional projects are separated so that classroom examples remain distinguishable from later practice work.

## Author

Shourya Deepak Salunke

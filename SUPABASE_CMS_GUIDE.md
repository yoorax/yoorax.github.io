# Supabase CMS Data Entry & Hierarchy Guide

This guide visualizes the database structure (hierarchy) of your portfolio sections. It serves as your manual for entering new projects, certifications, experiences, or activities in the **Supabase Table Editor**.

---

## 🗺️ High-Level Section Map

Here is how your portfolio pages map to Supabase tables:

```text
Portfolio Site
├── Projects Page ──────────> Table: project_categories & Table: projects
├── Education Page
│   ├── Academic ───────────> Table: academic_education
│   ├── Bootcamps ──────────> Table: bootcamps
│   └── Certifications ─────> Table: certifications
├── Experience Page ────────> Table: experiences
└── Blog & Activities Page ─> Table: extracurricular_activities
```

---

## 📂 1. Projects Section (Nested Hierarchy)

Projects are organized into **Categories** (folders). Each project belongs to one category.

```text
[project_categories] (e.g. Robotics & Control Systems)
   │
   └───► [projects] (e.g. Robot Arm Optimization)
            ├── Thumbnail Image
            ├── Name
            ├── Description
            ├── breif_description
            ├── Tools (Skills)
            └── External Link
```
note 1 for adding a feature on my portfolio website project section: here in this section I want card of the project only have a rectengle container with the thumbnail image inside it and when i click on the card it open the project in a pop up rounded corner rectengle tab that takes 70% of the screenwidth and 70% of the screen height in the middle of the screen with all the description of the project and can be scrollable in it with everthing organized in a good design and good color scheme, the description should have the title of the project, the description of the project, the tools used in the project, the external link to the project, i want this popup also have a close button as red cercle with an X letter inside it at the top right corner to close the popup and return to the projects page) and this pop up can be closed also by clicking outside of it on the space between the popup and the edges of the screen

### Table: `project_categories`
Create these categories first. They group your projects on the page.

| Column | Data Type | Example Value | Description |
| :--- | :--- | :--- | :--- |
| `id` (Primary Key) | Text | `robotics` | A unique short ID (lowercase, no spaces). |
| `category_name` | Text | `Robotics & Control Systems` | The header title shown on the page. |
| `category_description` | Text | `Design, simulation, and control...` | Subtitle for this category. |
| `display_order` | Integer | `1` | Order of appearance on the page (1, 2, 3, etc.). |


### Table: `projects`
This holds the actual projects. Make sure the `category_id` matches the category ID above!

| Column | Data Type | Example Value | Description |
| :--- | :--- | :--- | :--- |
| `id` (Primary Key) | Text (or UUID) | `robot-arm-optimization` | Unique ID. |
| `category_id` | Text (Foreign Key) | `robotics` | **Must match** an `id` in `project_categories`. |
| `name` | Text | `Robot Arm Design Optimization` | Project title. |
| `description` | Text | `Enhanced articulated robot arms...` | Description paragraph. |
| `tools` | Array of Text (`[]`) | `["SolidWorks", "Fusion 360"]` | Tools/Skills list (shows as tags on the card). |
| `project_category` | Text | `Robotics` | Short tag shown in the header. |
| `thumbnail` | Text (URL) | `https://.../robot-arm.png` | Public URL to image in Storage bucket. *(Optional)* |
| `project_link` | Text (URL) | `https://github.com/yoorax/...` | Link to GitHub, video, or demo. *(Optional)* |
| `link_name` | Text | `GitHub` or `View Demo` | Text for the link. *(Optional)* |
| `display_order` | Integer | `1` | Order of sorting inside this category. |

---
note for the project actegory table : I want to add a column for category icon png image as url from the bucket storage

## 🎓 2. Education Section

The Education page has three distinct parts. Each has its own table.

### Table: `academic_education`
For university degrees.

| Column | Data Type | Example Value | Description |
| :--- | :--- | :--- | :--- |
| `id` (Primary Key) | Text | `masters` | Unique identifier. |
| `level` | Text | `Master's Degree` | Main card title (e.g. Master's, Bachelor's). |
| `speciality` | Text | `Mechanical Engineering` | Field of study. |
| `department` | Text | `Mechanical Engineering Dept` | Department name. |
| `school` | Text | `ENSET Mohammedia` | School name. |
| `university` | Text | `Hassan II University` | University name. |
| `location city` | Text | `Mohammedia` | City. |
| `location country` | Text | `Morocco` | Country. |
| `period` | Text | `2023 – 2025` | Duration of study. |
| `description` | Text | `Pursued an advanced engineering...` | Paragraph summary. |
| `skills` | Array of Text (`[]`) | `["SolidWorks", "Python"]` | Skills acquired (shown as tags). |
| `display_order` | Integer | `1` | Order on page (lower numbers show first). |

### Table: `bootcamps`
For specialized training programs (e.g., Simplon).

| Column | Data Type | Example Value | Description |
| :--- | :--- | :--- | :--- |
| `id` (Primary Key) | Text | `simplon` | Unique identifier. |
| `title` | Text | `Data Analyst Training Program` | Program title. |
| `format` | Text | `In-person (40h/week)` | Study format. |
| `site name` | Text | `TechnoPark` | Site name. |
| `location city` | Text | `Agadir` | Location. |
| `location country` | Text | `Morocco` | Location. |
| `operator` | Text | `Simplon Maghreb` | Organization hosting it. |
| `start_date` | Text | `2026-01` | Start date. | 
| `end_date` | Text | `2026-07` | End date. |
| `description` | Text | `Enrolled in an intensive...` | Paragraph summary. |
| `skills` | Array of Text (`[]`) | `["SQL", "Python", "Power BI"]` | Skills acquired. |
| `display_order` | Integer | `1` | Order. |

note : I want every column that has a date to contain to columns start and end dates only in months and years as date format for exmple "2026-01" and "2026-07" if that is possible and i want the UI to display it as "Jan 2026 - July 2026" in the frontend only not in the database.

### Table: `certifications_categories`
categories for me are like robotics, data analysis, cad, soft skills, etc..
For certificates categories.

| Column | Data Type | Example Value | Description |
| :--- | :--- | :--- | :--- |
| `id` (Primary Key) | Text | `robotics` | Unique identifier. |
| `category_name` | Text | `Robotics` | Name of the category. |
| `category_description` | Text | `Description of the category.` | Description of the category. |
| `display_order` | Integer | `1` | Order. |

### Table: `certifications`
For course certificates (e.g., Udemy).

| Column | Data Type | Example Value | Description |
| :--- | :--- | :--- | :--- |
| `id` (Primary Key) | Text | `cert-plc-tia` | Unique identifier. |
| `title` | Text | `Siemens S7-1200 PLC Programming` | Name of the certificate. |
| `provider` | Text | `Udemy` | Where you got it (Udemy, Coursera, etc.). |
| `skills` | Array of Text (`[]`) | `["TIA Portal", "Siemens PLC"]` | Skills acquired. |
| `category_id` | Text (Foreign Key) | `robotics` | **Must match** an `id` in `certifications_categories`. |
| `certificate_link` | Text (URL) | `https://www.udemy.com/certificate/cert-plc-tia` | Link to the certificate. |
| `display_order` | Integer | `1` | Order. |
---

## 💼 3. Experience Section

For internships and work experiences.

### Table: `experiences`

| Column | Data Type | Example Value | Description |
| :--- | :--- | :--- | :--- |
| `id` (Primary Key) | Text | `ocp-group` | Unique identifier. |
| `title` | Text | `Industrial Automation Engineer` | Job title. |
| `company` | Text | `OCP Group` | Full company name. |
| `company_short` | Text | `OCP` | Abbreviation shown on the logo bubble. |
| `site_location` | Text | `OCP Industrial Site` | Site name. |
| `location city` | Text | `Safi` | City. |
| `location country` | Text | `Morocco` | Country. |
| `type` | Text | `On-site` | On-site, Hybrid, or Remote. |
| `job_type` | Text | `End-of-Study Internship (PFE)`| Job classification. |
| `start_date` | Text | `2025-03` | Start date. |
| `end_date` | Text | `2025-07` | End date (or "Present"). |
| `duration` | Text | `5 months` | Total duration. |
| `description` | Text | `Designed and deployed a...` | Paragraph describing the role. |
| `responsibilities` | Array of Text (`[]`) | `["Designed SQL database...", "Built pipeline..."]` | Bullet points of what you did. |
| `skills` | Array of Text (`[]`) | `["SQL Server", "Power BI"]` | Tools and technologies used. |
| `display_order` | Integer | `1` | Order. |

---

## ⚡ 4. Blog & Activities Section

For extracurricular leadership, clubs, and volunteer work.

### Table: `extracurricular_activities`

| Column | Data Type | Example Value | Description |
| :--- | :--- | :--- | :--- |
| `id` (Primary Key) | Text | `wris-club` | Unique identifier. |
| `title` | Text | `Founder & President — WRIS Club` | Leadership role title. |
| `subtitle` | Text | `Waste Recycling Solutions Club` | Sub-header details. |
| `organization` | Text | `ENSET Mohammedia` | Host organization. |
| `start_date` | Text | `Nov 2024` | Start date. |
| `end_date` | Text | `June 2025` | End date (or "Present"). |
| `description` | Text | `Founded and led a 60+ member...` | Paragraph description. |
| `highlights` | Array of Text (`[]`) | `["Led 60+ member team...", "Designed vertical farm..."]` | Bullet points of achievements. |
| `tags` | Array of Text (`[]`) | `["Leadership", "Sustainability"]`| Skill tags. |
| `display_order` | Integer | `1` | Order. |

---

## 💡 Pro-Tips for Data Entry in Supabase

1. **Creating Lists (`Array of Text`)**:
   In the Supabase Table Editor, columns that store arrays (like `skills`, `tools`, `responsibilities`) will open a visual list editor when you double-click them. You can click **"Add item"** to add list entries (like strings) individually.
2. **Sorting (`display_order`)**:
   Always fill in the `display_order` with numbers (1, 2, 3...) to control the order in which items show up on your website. 
3. **Saving**:
   Make sure you click **"Save"** or hit Enter after writing data in a row. It syncs to your live portfolio instantly!

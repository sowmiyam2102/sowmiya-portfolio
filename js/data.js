/* ==========================================================================
   VERIFIED PORTFOLIO DATA - SOWMIYA M
   ========================================================================== */

const PORTFOLIO_DATA = {
    profile: {
        name: "SOWMIYA M",
        primaryTitle: "Data Analyst",
        secondaryPositioning: "SQL | Python | Power BI | Tableau | ETL",
        heroStatement: "Turning data into actionable business insights.",
        introText: "Analytics-driven professional with hands-on experience in SQL, Python, ETL workflows, data analysis, dashboard development, and machine learning across banking, retail, and HR domains.",
        supportingText: "Proficient in Power BI, Tableau, Excel, PostgreSQL, MySQL, and Apache Airflow for data extraction, transformation, visualization, and reporting.",
        additionalPositioning: "Strong foundation in data modeling, data validation, KPI reporting, predictive analytics, and database management.",
        location: "Chennai, India",
        phone: "+91 6374630969",
        email: "sowmiyam0204@gmail.com",
        linkedIn: "https://www.linkedin.com/in/sowmiyam2102/",
        gitHub: "https://github.com/sowmiyam2102/",
        resumeUrl: "assets/resume/Sowmiya_Manikandan_Resume.pdf"
    },

    kpis: [
        { id: "kpi-records", label: "Records Processed", value: "60,000+", subtext: "HR, Retail & Banking Datasets", icon: "database" },
        { id: "kpi-dashboards", label: "Interactive Dashboards", value: "6+", subtext: "Power BI & Tableau Platforms", icon: "dashboard" },
        { id: "kpi-rbi", label: "RBI Datasets Analyzed", value: "40+", subtext: "Transactions & Digital Adoption", icon: "flag" },
        { id: "kpi-banks", label: "Banks Covered", value: "50+", subtext: "Performance & Channel Benchmarking", icon: "bank" },
        { id: "kpi-retail", label: "Retail Records", value: "30,000+", subtext: "Sales Trends & Demand Forecasting", icon: "shopping-bag" }
    ],

    projects: [
        {
            id: "proj-1",
            title: "Crypto Data Pipeline & Power BI Dashboard",
            category: "pipeline",
            categoryName: "Data Pipeline & ML Analytics",

            image: "assets/components/crypto/image.png",
            githubUrl: "https://github.com/sowmiyam2102/crypto-data-pipeline",

            shortDesc: "An end-to-end cryptocurrency data pipeline and Power BI analytics solution visualizing actual vs. predicted price trends.",
            tech: ["Python", "PostgreSQL", "Docker", "Apache Airflow", "Power BI", "Git"],
            metricBadge: "End-to-End Bronze-Silver-Gold Pipeline",

            details: {
                overview: "Engineered an end-to-end Bronze–Silver–Gold data pipeline using PostgreSQL, Docker, and Apache Airflow to automate cryptocurrency data ingestion and analytics.",
                architecture: "Bronze Layer (Raw Ingestion) ➔ Silver Layer (Transformed & Validated PostgreSQL tables) ➔ Gold Layer (Aggregated Analytics & ML Predictions) ➔ Power BI Dashboards.",
                keyWork: [
                    "Engineered an end-to-end Bronze–Silver–Gold data pipeline using PostgreSQL, Docker, and Apache Airflow.",
                    "Automated data ingestion and validation workflows to process daily cryptocurrency datasets using Apache Airflow and PostgreSQL.",
                    "Visualized actual vs. predicted cryptocurrency price trends from a machine learning model using Power BI dashboards."
                ],
                pipelineSteps: [
                    { name: "Ingest", tool: "Apache Airflow" },
                    { name: "Store Raw", tool: "Bronze Layer" },
                    { name: "Transform", tool: "PostgreSQL" },
                    { name: "Predict", tool: "Python ML" },
                    { name: "Visualize", tool: "Power BI" }
                ],
                dashboardStatus: "Power BI Dashboard Analytics Solution"
            }
        },
        {
            id: "proj-2",
            title: "Banking Systems & Performance Analysis Dashboard",
            category: "bi",
            categoryName: "Banking Business Intelligence",
            image: [
                "assets/components/bank/bank1.png",
                "assets/components/bank/bank2.png",
                "assets/components/bank/bank3.png"
            ],
            githubUrl: "https://github.com/sowmiyam2102/Banking-Transaction-and-Infrastructure-Analysis-in-India",
            shortDesc: "Interactive banking analytics solution built using 40+ RBI datasets to analyze transactions, infrastructure, digital adoption, and performance across 50+ banks.",
            tech: ["Tableau", "Tableau Prep", "SQL", "Excel"],
            metricBadge: "40+ RBI Datasets • 50+ Banks",
            details: {
                overview: "Analyzed 40+ RBI datasets covering banking transactions, infrastructure, and digital adoption across 50+ banks into actionable business intelligence through ETL workflows.",
                architecture: "Multi-Source RBI Datasets ➔ Tableau Prep ETL & Cleaning ➔ SQL Validation ➔ 5 Interactive Tableau Dashboards.",
                keyWork: [
                    "Analyzed 40+ RBI datasets covering banking transactions, infrastructure, and digital adoption across 50+ banks.",
                    "Transformed large-scale datasets into actionable business intelligence through ETL workflows.",
                    "Created 5 interactive Tableau dashboards utilizing LOD expressions, dynamic parameters, and advanced calculations.",
                    "Presented insights on YoY growth, channel performance, customer adoption, and benchmarking across 50+ banks."
                ],
                pipelineSteps: [
                    { name: "40+ Datasets", tool: "RBI Records" },
                    { name: "ETL", tool: "Tableau Prep" },
                    { name: "Validate", tool: "SQL" },
                    { name: "Analyze", tool: "LOD & Parameters" },
                    { name: "5 Dashboards", tool: "Tableau" }
                ],
                dashboardStatus: "5 Interactive Tableau Dashboards",
            }
        },
        {
            id: "proj-3",
            title: "Retail Industry Dashboard",
            category: "bi",
            categoryName: "Retail & Demand Forecasting",
            image: "assets/components/retail/retail1.png",
            shortDesc: "Interactive retail analytics solution focused on sales trends, customer behavior, business performance, and next-year demand forecasting.",
            tech: ["Power BI", "MySQL", "Python"],
            metricBadge: "30,000+ Retail Records",
            details: {
                overview: "Cleaned and preprocessed 30,000+ retail records using MySQL to support interactive Power BI dashboarding and predictive demand forecasting models in Python.",
                architecture: "Raw Retail Sales Data ➔ MySQL Data Cleaning (30,000+ Records) ➔ Python Regression Modeling ➔ 4 Interactive Power BI Dashboards.",
                keyWork: [
                    "Cleaned and preprocessed 30,000+ retail records using MySQL to ensure data quality and consistency for analysis.",
                    "Designed 4 interactive Power BI dashboards to visualize sales trends, customer behavior, and key business performance indicators.",
                    "Developed a next-year demand forecasting model using Python and evaluated its performance using regression metrics.",
                    "Delivered actionable insights to support inventory planning, sales analysis, and business decision-making."
                ],
                pipelineSteps: [
                    { name: "30K+ Records", tool: "Retail Data" },
                    { name: "Clean & Quality", tool: "MySQL" },
                    { name: "Forecasting", tool: "Python Regression" },
                    { name: "4 Dashboards", tool: "Power BI" },
                    { name: "Planning", tool: "Inventory Insights" }
                ],
                dashboardStatus: "4 Interactive Power BI Dashboards",

            }
        }
    ],
    otherProjects: [
        {
            id: "other-1",
            title: "AI-Powered Water Quality Monitoring System",
            category: "Full Stack",
            subCategory: "Full Stack + Machine Learning",
            featured: false,
            images: [
                "assets/components/waterproject/water1.jpeg",
                "assets/components/waterproject/water2.jpeg",
                "assets/components/waterproject/water3.jpeg",
                "assets/components/waterproject/water4.jpeg",
                "assets/components/waterproject/water5.jpeg",
                "assets/components/waterproject/water6.jpeg",
                "assets/components/waterproject/water7.jpeg"
            ],
            tech: [
                "Java",
                "Spring Boot",
                "React.js",
                "Flask",
                "MySQL",
                "REST APIs",
                "TensorFlow"
            ],
            description:
                "Developed a full-stack water quality prediction platform combining Spring Boot APIs, Flask-based machine learning services, React frontend, and MySQL database.",
            highlights: [
                "REST API Development",
                "Machine Learning Integration",
                "React Dashboard",
                "MySQL Data Storage",
                "Real-Time Prediction",
                "80% Prediction Accuracy",
                "Processed 60,000+ records"
            ],
            githubUrl:
                "https://github.com/sowmiyam2102/AI-Powered-water-quality"
        },

        {
            id: "other-2",
            title: "AI & Text Detection",
            category: "Machine Learning",
            featured: false,
            images: [
                "assets/components/aitext/aitext1.png"
            ],
            tech: [
                "Python",
                "NLP",
                "Scikit-learn",
                "Pandas"
            ],
            description:
                "Built a machine learning and NLP solution to classify AI-generated and human-written text using TF-IDF vectorization, Logistic Regression, and Random Forest algorithms.",
            highlights: [
                "NLP Classification",
                "TF-IDF Feature Engineering",
                "Model Comparison",
                "Logistic Regression",
                "Random Forest"
            ],
            githubUrl:
                "https://github.com/sowmiyam2102/AI-Text-detection"
        },

        {
            id: "other-3",
            title: "Mystery Script Game",
            category: "Mobile Development",
            subCategory: "Android Application",
            featured: false,
            images: [
                "assets/components/android/mobile1.png",
                "assets/components/android/mobile2.png"
            ],
            tech: [
                "Java",
                "Android Studio",
                "XML"
            ],
            description:
                "Developed a detective-themed Android application featuring quizzes, image-based clue analysis, score tracking, timers, and level progression.",
            highlights: [
                "Detective-themed Gameplay",
                "Quiz Engine",
                "Timer System",
                "Score Tracking",
                "Level Progression",
                "Image Clue Analysis"
            ],
            githubUrl:
                "https://github.com/sowmiyam2102/Mystery-Script"
        },

        {
            id: "other-4",
            title: "Epiphany UI/UX",
            category: "UI/UX",
            featured: false,
            images: [
                "assets/components/uiux/ui1.png",
                "assets/components/uiux/ui2.png",
                "assets/components/uiux/ui3.png",
                "assets/components/uiux/ui4.png",
                "assets/components/uiux/ui5.png",
                "assets/components/uiux/ui6.png",
                "assets/components/uiux/ui7.png",
                "assets/components/uiux/ui8.png",
                "assets/components/uiux/ui9.png"
            ],
            tech: [
                "Figma",
                "UI Design",
                "UX Design",
                "Prototyping"
            ],
            description:
                "Designed a reader-and-writer platform featuring content discovery, bookmarking, personalized reading experiences, creator dashboards, and monetization workflows.",
            highlights: [
                "Creator Dashboard Layouts",
                "Monetization Workflows",
                "High-fidelity Prototypes",
                "User-centered Content Discovery"
            ],
            githubUrl:
                "https://github.com/sowmiyam2102/Epiphany-UI-UX-Project"
        }
    ],

    experience: [
        {
            company: "Bilight Solutions",
            location: "Chennai",
            role: "Student Intern",
            period: "Feb 2025 – Apr 2026",
            type: "On-Site",
            responsibilities: [
                "Developed and optimized SQL queries using MySQL to process and manage 60,000+ records across HR, retail, and banking datasets.",
                "Designed ETL workflows using MySQL, Tableau Prep, and Power Query to transform and validate data across three business domains.",
                "Created 6+ interactive dashboards using Power BI and Tableau to visualize KPIs, business performance, and operational trends.",
                "Performed data cleaning, validation, and quality checks on 60,000+ records, improving data consistency for dashboards and reporting."
            ],
            techTags: ["MySQL", "SQL Optimization", "Tableau Prep", "Power Query", "Power BI", "Tableau", "Data Quality"]
        }
    ],

    skills: {
        analyticsBI: {
            title: "Data Analytics & BI",
            icon: "📊",
            items: ["Power BI", "Tableau", "Looker", "Tableau Prep", "Microsoft Excel", "Power Query", "Power Pivot", "DAX"]
        },
        dataEngineering: {
            title: "Data Engineering & ETL",
            icon: "⚙️",
            items: ["ETL", "Apache Airflow", "Data Pipelines", "Data Ingestion", "Data Transformation", "Data Validation"]
        },
        programming: {
            title: "Programming Languages",
            icon: "💻",
            items: ["Python", "SQL", "Java"]
        },
        databases: {
            title: "Databases & Management",
            icon: "🛢️",
            items: ["MySQL", "PostgreSQL", "Relational Database Design", "SQL Query Optimization"]
        },
        machineLearning: {
            title: "Machine Learning & Predictive",
            icon: "🤖",
            items: ["Scikit-learn", "TensorFlow", "Predictive Analytics"]
        },
        tools: {
            title: "Tools & Environment",
            icon: "🛠️",
            items: ["Git", "GitHub", "Docker", "Figma", "VS Code"]
        },
        coreConcepts: {
            title: "Core Analytical Concepts",
            icon: "🧠",
            items: ["Data Modeling", "Data Warehousing", "Business Intelligence", "KPI Reporting", "Database Normalization", "Data Quality", "REST APIs", "SDLC", "Agile Methodologies"]
        }
    },

    education: [
        {
            degree: "Master of Computer Applications (MCA)",
            institution: "Dwaraka Doss Goverdhan Doss Vaishnav College",
            location: "Chennai, India",
            grade: "89%",
            period: "Aug 2024 – Apr 2026"
        },
        {
            degree: "Bachelor of Science — Computer Science",
            institution: "Chevalier T. Thomas Elizabeth College for Women",
            location: "Chennai, India",
            grade: "85%",
            period: "Aug 2021 – Apr 2024"
        }
    ],

    certifications: [
        {
            title: "Certified Generative AI Professional",
            issuer: "Oracle",
            icon: "🏆"
        },
        {
            title: "Database Management Systems",
            issuer: "NPTEL",
            icon: "🎓"
        },
        {
            title: "CRM",
            issuer: "Honeywell Program",
            icon: "💼"
        }
    ],

    achievements: [
        {
            title: "3rd Place — InLustro 2025",
            awardBadge: "3rd Place",
            icon: "🥇",
            description: "Achieved 3rd Place at InLustro (2025) for presenting an AI-Powered Water Quality Monitoring System, effectively communicating the project’s design, functionality, and real-world impact to evaluators."
        },
        {
            title: "Best Social Media Coordinator",
            awardBadge: "College Award",
            icon: "⭐",
            description: "Awarded Best Social Media Coordinator for managing photography, video editing, and digital content creation for official college social media platforms."
        }
    ]
};

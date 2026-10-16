/* ==========================================================================
   MAIN DASHBOARD APPLICATION LOGIC
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

    prepareProjectsData();

    initNavigation();
    initClock();

    renderProjects('all');
    renderSkillsMatrix();

    initSearchFilter();
    initMobileMenu();

});


/* ==========================================================================
   PREPARE / NORMALIZE PROJECT DATA

   Main projects:
   PORTFOLIO_DATA.projects

   Other projects:
   PORTFOLIO_DATA.otherProjects

   allProjects:
   Automatically generated combined list used for global search.
   ========================================================================== */

function prepareProjectsData() {

    const mainProjects =
        Array.isArray(PORTFOLIO_DATA.projects)
            ? PORTFOLIO_DATA.projects
            : [];

    const additionalProjects =
        Array.isArray(PORTFOLIO_DATA.otherProjects)
            ? PORTFOLIO_DATA.otherProjects
            : [];


    /* ----------------------------------------------------------------------
       NORMALIZE PROJECT
       ---------------------------------------------------------------------- */

    function normalizeProject(project, index) {

        project.id =
            String(
                project.id ||
                `project-${index + 1}`
            );


        /* Category */

        if (!project.categoryName) {

            project.categoryName =
                project.subCategory ||
                project.category ||
                "Project";

        }


        /* Description */

        if (!project.shortDesc) {

            project.shortDesc =
                project.description ||
                "";

        }


        /* Metric */

        if (!project.metricBadge) {

            if (
                Array.isArray(project.highlights) &&
                project.highlights.length > 0
            ) {

                project.metricBadge =
                    project.highlights[0];

            } else {

                project.metricBadge = "";

            }

        }


        /* Technologies */

        if (!Array.isArray(project.tech)) {
            project.tech = [];
        }


        /* Images */

        if (
            !Array.isArray(project.images) &&
            project.image
        ) {

            project.images =
                Array.isArray(project.image)
                    ? project.image
                    : [project.image];

        }


        if (!Array.isArray(project.images)) {
            project.images = [];
        }


        /* GitHub */

        if (!project.githubUrl) {
            project.githubUrl = "";
        }


        /* ------------------------------------------------------------------
           MODAL COMPATIBILITY
           ------------------------------------------------------------------ */

        if (!project.details) {

            project.details = {

                overview:
                    project.description ||
                    project.shortDesc ||
                    "",

                architecture:
                    project.subCategory ||
                    project.categoryName ||
                    "Project",

                keyWork:
                    Array.isArray(project.highlights)
                        ? project.highlights
                        : [],

                pipelineSteps:
                    (
                        Array.isArray(project.highlights)
                            ? project.highlights
                            : []
                    )
                        .slice(0, 5)
                        .map(
                            (item, i) => ({
                                name:
                                    `Step ${i + 1}`,
                                tool:
                                    item
                            })
                        ),

                dashboardStatus:
                    project.categoryName ||
                    project.category ||
                    "Project"

            };

        }


        return project;

    }


    /* ----------------------------------------------------------------------
       NORMALIZE MAIN PROJECTS
       ---------------------------------------------------------------------- */

    PORTFOLIO_DATA.projects =
        mainProjects.map((p, i) => {
            const norm = normalizeProject(p, i);
            norm.isOther = false;
            norm.projectGroup = 'main';
            return norm;
        });


    /* ----------------------------------------------------------------------
       NORMALIZE OTHER PROJECTS
       ---------------------------------------------------------------------- */

    PORTFOLIO_DATA.otherProjects =
        additionalProjects.map((p, i) => {
            const norm = normalizeProject(p, i);
            norm.isOther = true;
            norm.projectGroup = 'other';
            return norm;
        });


    /* ----------------------------------------------------------------------
       CREATE COMBINED SEARCH LIST
       ---------------------------------------------------------------------- */

    PORTFOLIO_DATA.allProjects = [

        ...PORTFOLIO_DATA.projects,

        ...PORTFOLIO_DATA.otherProjects

    ];

    /* Update sidebar project badge */
    const projectsNavBadge =
        document.querySelector('.nav-item[data-tab="projects"] .nav-badge');
    if (projectsNavBadge) {
        projectsNavBadge.textContent = "7 Projects";
    }

}


/* ==========================================================================
   TAB NAVIGATION
   ========================================================================== */

function switchTab(tabId) {

    const navItems =
        document.querySelectorAll('.nav-item');

    const viewPanels =
        document.querySelectorAll('.view-panel');

    const breadcrumbActive =
        document.getElementById('currentViewName');


    /* Active navigation */

    navItems.forEach(item => {

        const isTarget =
            item.getAttribute('data-tab') === tabId;

        item.classList.toggle(
            'active',
            isTarget
        );

        item.setAttribute(
            'aria-selected',
            isTarget ? 'true' : 'false'
        );

    });


    /* Active panel */

    viewPanels.forEach(panel => {

        panel.classList.toggle(
            'active',
            panel.id === `view-${tabId}`
        );

    });


    /* Breadcrumb */

    if (breadcrumbActive) {

        const tabNames = {

            home: 'Executive Overview',
            about: 'About Analyst',
            projects: 'Analytics Projects',
            experience: 'Work Experience',
            workflow: 'Data Analytics Workflow',
            skills: 'Skills Matrix',
            education: 'Education',
            certifications: 'Certifications',
            achievements: 'Achievements',
            resume: 'Resume View',
            contact: 'Contact Me'

        };

        breadcrumbActive.textContent =
            tabNames[tabId] ||
            'Dashboard';

    }


    /* Scroll dashboard to top */

    const dashBody =
        document.querySelector(
            '.dashboard-body'
        );

    if (dashBody) {
        dashBody.scrollTop = 0;
    }


    /* Close mobile menu */

    const sidebar =
        document.getElementById(
            'appSidebar'
        );

    if (
        sidebar &&
        sidebar.classList.contains(
            'mobile-open'
        )
    ) {

        sidebar.classList.remove(
            'mobile-open'
        );

    }

}


/* ==========================================================================
   NAVIGATION
   ========================================================================== */

function initNavigation() {

    const navItems =
        document.querySelectorAll(
            '.nav-item'
        );

    navItems.forEach(btn => {

        btn.addEventListener(
            'click',
            () => {

                const tabId =
                    btn.getAttribute(
                        'data-tab'
                    );

                if (tabId) {
                    switchTab(tabId);
                }

            }
        );

    });

}


/* ==========================================================================
   PROJECT CARD
   ========================================================================== */

function createProjectCard(project) {

    const firstImage =
        project.images &&
            project.images.length > 0
            ? project.images[0]
            : "";


    /* ----------------------------------------------------------------------
       IMAGE
       ---------------------------------------------------------------------- */

    const imageHTML =
        firstImage
            ? `
                <div class="project-image-wrapper">

                    <img
                        src="${firstImage}"
                        alt="${project.title}"
                        class="project-image"
                        loading="lazy"
                        onerror="
                            this.parentElement.style.display='none';
                        "
                    >

                </div>
            `
            : "";


    /* ----------------------------------------------------------------------
       GITHUB BUTTON
       ---------------------------------------------------------------------- */

    const githubHTML =
        project.githubUrl
            ? `
                <a
                    href="${project.githubUrl}"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="btn btn-secondary btn-sm project-github-btn"
                    onclick="event.stopPropagation();"
                >

                    <svg
                        width="15"
                        height="15"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                    >

                        <path
                            d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"
                        />

                    </svg>

                    GitHub

                </a>
            `
            : "";


    /* ----------------------------------------------------------------------
       TECHNOLOGY TAGS
       ---------------------------------------------------------------------- */

    const techHTML =
        project.tech
            .map(
                tech => `
                    <span class="project-tech-tag">
                        ${tech}
                    </span>
                `
            )
            .join('');


    /* ----------------------------------------------------------------------
       PROJECT CARD
       ---------------------------------------------------------------------- */

    return `

        <div
            class="project-card"
            data-id="${project.id}"
        >

            ${imageHTML}


            <div class="project-card-content">

                <div class="project-card-header">

                    <span class="project-cat-tag">
                        ${project.categoryName}
                    </span>

                    <h3 class="project-card-title">
                        ${project.title}
                    </h3>

                </div>


                <p class="project-card-desc">
                    ${project.shortDesc}
                </p>


                ${project.metricBadge
            ? `

                            <div class="project-metric-banner">

                                <svg
                                    width="14"
                                    height="14"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    stroke-width="2"
                                >

                                    <polyline
                                        points="22 12 18 12 15 21 9 3 6 12 2 12"
                                    />

                                </svg>

                                <span>
                                    ${project.metricBadge}
                                </span>

                            </div>

                        `
            : ""
        }


                <div class="project-tech-tags">

                    ${techHTML}

                </div>

            </div>


            <div class="project-card-footer">

                <button
                    class="btn btn-primary btn-sm"
                    onclick="openProjectModal('${project.id}')"
                    style="flex: 1;"
                >

                    <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                    >

                        <path
                            d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"
                        />

                        <circle
                            cx="12"
                            cy="12"
                            r="3"
                        />

                    </svg>

                    View Details

                </button>


                ${githubHTML}

            </div>

        </div>

    `;

}


/* ==========================================================================
   OTHER PROJECTS CONTAINER
   ========================================================================== */

function ensureOtherProjectsContainer() {

    const mainGrid =
        document.getElementById(
            'projectsGrid'
        );

    if (!mainGrid) {
        return null;
    }


    let otherSection =
        document.getElementById(
            'otherProjectsSection'
        );


    if (!otherSection) {

        otherSection =
            document.createElement(
                'section'
            );

        otherSection.id =
            'otherProjectsSection';

        otherSection.className =
            'other-projects-section';


        otherSection.innerHTML = `

            <div class="view-header-bar other-projects-header" style="margin-top: 2rem; margin-bottom: 1.25rem;">

                <div>

                    <h2 class="section-title">
                        Other Projects
                    </h2>

                    <p class="section-desc">
                        Additional academic, development, machine learning, and UI/UX projects.
                    </p>

                </div>

            </div>


            <div
                id="otherProjectsGrid"
                class="projects-grid"
            ></div>

        `;


        mainGrid.parentNode.insertBefore(
            otherSection,
            mainGrid.nextSibling
        );

    }


    return document.getElementById(
        'otherProjectsGrid'
    );

}


/* ==========================================================================
   PROJECT SEARCH TEXT
   ========================================================================== */

function getProjectSearchText(project) {

    const details =
        project.details || {};


    return [

        project.title,

        project.category,

        project.categoryName,

        project.subCategory,

        project.shortDesc,

        project.description,

        project.metricBadge,

        ...(project.tech || []),

        ...(project.highlights || []),

        details.overview,

        details.architecture,

        details.dashboardStatus,

        ...(details.keyWork || [])

    ]
        .filter(Boolean)
        .join(' ')
        .toLowerCase();

}


/* ==========================================================================
   RENDER PROJECTS

   Main:
   PORTFOLIO_DATA.projects

   Other:
   PORTFOLIO_DATA.otherProjects
   ========================================================================== */

function renderProjects(filter = 'all') {

    const grid =
        document.getElementById(
            'projectsGrid'
        );

    if (!grid) {
        return;
    }


    const otherGrid =
        ensureOtherProjectsContainer();


    const otherSection =
        document.getElementById(
            'otherProjectsSection'
        );

    const mainProjects =
        Array.isArray(PORTFOLIO_DATA.projects)
            ? PORTFOLIO_DATA.projects
            : [];

    const additionalProjects =
        Array.isArray(PORTFOLIO_DATA.otherProjects)
            ? PORTFOLIO_DATA.otherProjects
            : [];


    if (filter === 'all') {

        /* Show main analytics projects in top grid */
        grid.innerHTML =
            mainProjects.length > 0
                ? mainProjects.map(createProjectCard).join('')
                : '<div class="project-empty-state">No analytics projects found.</div>';

        /* Show other projects section */
        if (otherSection) {
            otherSection.style.display = 'block';
        }

        if (otherGrid) {
            otherGrid.innerHTML =
                additionalProjects.map(createProjectCard).join('');
        }

    } else if (filter === 'other') {

        /* User clicked "Other Projects (4)": render all other projects into main grid */
        grid.innerHTML =
            additionalProjects.length > 0
                ? additionalProjects.map(createProjectCard).join('')
                : '<div class="project-empty-state">No other projects found.</div>';

        if (otherSection) {
            otherSection.style.display = 'none';
        }

        if (otherGrid) {
            otherGrid.innerHTML = '';
        }

    } else {

        /* Category filter (e.g. 'bi', 'pipeline') */
        const filteredMain =
            mainProjects.filter(project => (
                project.category === filter ||
                project.categoryName === filter ||
                project.subCategory === filter
            ));

        const filteredOther =
            additionalProjects.filter(project => (
                project.category === filter ||
                project.categoryName === filter ||
                project.subCategory === filter
            ));

        const matchedProjects = [
            ...filteredMain,
            ...filteredOther
        ];

        if (matchedProjects.length > 0) {
            grid.innerHTML =
                matchedProjects.map(createProjectCard).join('');
        } else {
            grid.innerHTML = `
                <div class="project-empty-state">
                    No projects found for category "${filter}".
                </div>
            `;
        }

        if (otherSection) {
            otherSection.style.display = 'none';
        }

        if (otherGrid) {
            otherGrid.innerHTML = '';
        }

    }


    /* ----------------------------------------------------------------------
       FILTER BUTTONS
       ---------------------------------------------------------------------- */

    const filterBtns =
        document.querySelectorAll(
            '#projectFilterGroup .filter-btn'
        );

    filterBtns.forEach(btn => {
        const btnFilter = btn.getAttribute('data-filter');
        btn.classList.toggle('active', btnFilter === filter);

        btn.onclick = () => {
            const targetFilter = btn.getAttribute('data-filter');
            renderProjects(targetFilter);
        };
    });

}


/* ==========================================================================
   RENDER SKILLS MATRIX
   ========================================================================== */

function renderSkillsMatrix() {

    const container =
        document.getElementById(
            'skillsMatrixGrid'
        );

    if (!container) {
        return;
    }


    const categories =
        Object.values(
            PORTFOLIO_DATA.skills
        );


    container.innerHTML =
        categories
            .map(
                cat => `

                    <div class="skill-category-card">

                        <div class="category-title-bar">

                            <span class="category-icon">
                                ${cat.icon}
                            </span>

                            <h3>
                                ${cat.title}
                            </h3>

                        </div>


                        <div class="skill-tags-flex">

                            ${cat.items
                        .map(
                            item => `

                                        <span
                                            class="skill-tag-item"
                                        >
                                            ${item}
                                        </span>

                                    `
                        )
                        .join('')}

                        </div>

                    </div>

                `
            )
            .join('');

}


/* ==========================================================================
   LIVE CLOCK
   ========================================================================== */

function initClock() {

    const clockEl =
        document.getElementById(
            'clockTime'
        );

    if (!clockEl) {
        return;
    }


    function update() {

        const now =
            new Date();


        clockEl.textContent =
            now.toLocaleTimeString(
                'en-US',
                {
                    hour12: false
                }
            );

    }


    update();

    setInterval(
        update,
        1000
    );

}


/* ==========================================================================
   GLOBAL SEARCH
   ========================================================================== */

function initSearchFilter() {

    const searchInput =
        document.getElementById(
            'globalSearchInput'
        );

    if (!searchInput) {
        return;
    }


    searchInput.addEventListener(
        'input',
        e => {

            const rawQuery =
                e.target.value;


            const query =
                rawQuery
                    .toLowerCase()
                    .trim();


            /* ----------------------------------------------------------------
               RESET SKILL HIGHLIGHTS
               ---------------------------------------------------------------- */

            document
                .querySelectorAll(
                    '.skill-tag-item'
                )
                .forEach(item => {

                    item.style.backgroundColor =
                        '';

                    item.style.color =
                        '';

                });


            /* ----------------------------------------------------------------
               RESET PROJECT HIGHLIGHTS
               ---------------------------------------------------------------- */

            document
                .querySelectorAll(
                    '.project-card'
                )
                .forEach(card => {

                    card.style.borderColor =
                        '';

                    card.style.boxShadow =
                        '';

                });


            if (!query) {
                return;
            }


            /* ================================================================
               SEARCH ALL PROJECTS
               ================================================================ */

            const allProjects =
                Array.isArray(
                    PORTFOLIO_DATA.allProjects
                )
                    ? PORTFOLIO_DATA.allProjects
                    : [];


            const projectMatches =
                allProjects.filter(
                    project =>
                        getProjectSearchText(
                            project
                        ).includes(query)
                );


            /* ================================================================
               SEARCH SKILLS
               ================================================================ */

            let skillMatch =
                false;


            document
                .querySelectorAll(
                    '.skill-tag-item'
                )
                .forEach(item => {

                    const text =
                        item.textContent
                            .toLowerCase()
                            .trim();


                    if (
                        text.includes(query)
                    ) {

                        item.style.backgroundColor =
                            'var(--accent-blue)';

                        item.style.color =
                            '#FFFFFF';

                        skillMatch =
                            true;

                    }

                });


            /* ================================================================
               SEARCH EXPERIENCE
               ================================================================ */

            let experienceMatch =
                false;


            if (
                Array.isArray(
                    PORTFOLIO_DATA.experience
                )
            ) {

                experienceMatch =
                    PORTFOLIO_DATA.experience.some(
                        exp => {

                            const text = [

                                exp.company,

                                exp.role,

                                exp.location,

                                ...(exp.responsibilities || []),

                                ...(exp.techTags || [])

                            ]
                                .filter(Boolean)
                                .join(' ')
                                .toLowerCase();


                            return text.includes(
                                query
                            );

                        }
                    );

            }


            /* ================================================================
               PROJECTS HAVE PRIORITY

               Example:
               "Python"

               Can match:
               - Python skill
               - Crypto project
               - Retail project
               - AI & Text Detection

               Projects are shown first.
               ================================================================ */

            if (
                projectMatches.length > 0
            ) {

                switchTab(
                    'projects'
                );


                /* Show all projects */

                renderProjects(
                    'all'
                );


                /* Highlight matching projects */

                setTimeout(
                    () => {

                        document
                            .querySelectorAll(
                                '.project-card'
                            )
                            .forEach(card => {

                                const project =
                                    allProjects.find(
                                        p =>
                                            String(p.id) ===
                                            String(
                                                card.dataset.id
                                            )
                                    );


                                if (!project) {
                                    return;
                                }


                                const searchableText =
                                    getProjectSearchText(
                                        project
                                    );


                                if (
                                    searchableText.includes(
                                        query
                                    )
                                ) {

                                    card.style.borderColor =
                                        'var(--accent-blue)';


                                    card.style.boxShadow =
                                        '0 0 0 2px rgba(59, 130, 246, 0.15)';

                                }

                            });

                    },
                    50
                );


                return;

            }


            /* ================================================================
               SKILLS
               ================================================================ */

            if (skillMatch) {

                switchTab(
                    'skills'
                );

                return;

            }


            /* ================================================================
               EXPERIENCE
               ================================================================ */

            if (experienceMatch) {

                switchTab(
                    'experience'
                );

                return;

            }


            /* ================================================================
               NOTHING FOUND
               ================================================================ */

            showToast(
                `No results found for "${rawQuery}"`
            );

        }
    );


    /* ----------------------------------------------------------------------
       CTRL + K / CMD + K
       ---------------------------------------------------------------------- */

    document.addEventListener(
        'keydown',
        e => {

            if (
                (e.ctrlKey || e.metaKey) &&
                e.key.toLowerCase() === 'k'
            ) {

                e.preventDefault();

                searchInput.focus();

                searchInput.select();

            }

        }
    );

}


/* ==========================================================================
   MOBILE MENU
   ========================================================================== */

function initMobileMenu() {

    const toggleBtn =
        document.getElementById(
            'mobileMenuToggle'
        );

    const sidebar =
        document.getElementById(
            'appSidebar'
        );


    if (
        toggleBtn &&
        sidebar
    ) {

        toggleBtn.addEventListener(
            'click',
            () => {

                sidebar.classList.toggle(
                    'mobile-open'
                );

            }
        );

    }

}


/* ==========================================================================
   TOAST NOTIFICATIONS
   ========================================================================== */

function showToast(message) {

    const container =
        document.getElementById(
            'toastContainer'
        );

    if (!container) {
        return;
    }


    const toast =
        document.createElement(
            'div'
        );


    toast.className =
        'toast';


    toast.innerHTML = `

        <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="var(--accent-emerald)"
            stroke-width="2"
        >

            <path
                d="M22 11.08V12a10 10 0 1 1-5.93-9.14"
            />

            <polyline
                points="22 4 12 14.01 9 11.01"
            />

        </svg>


        <span>
            ${message}
        </span>

    `;


    container.appendChild(
        toast
    );


    setTimeout(
        () => {

            toast.style.opacity =
                '0';

            toast.style.transform =
                'translateY(10px)';


            setTimeout(
                () => toast.remove(),
                300
            );

        },
        3000
    );

}


/* ==========================================================================
   COPY CONTACT
   ========================================================================== */

function copyContact(
    text,
    label
) {

    navigator.clipboard
        .writeText(text)
        .then(
            () => {

                showToast(
                    `${label} copied to clipboard: ${text}`
                );

            }
        )
        .catch(
            () => {

                showToast(
                    `Copied ${label}: ${text}`
                );

            }
        );

}


/* ==========================================================================
   COPY RESUME SUMMARY
   ========================================================================== */

function copyResumeSummary() {

    const summary = `

${PORTFOLIO_DATA.profile.name} -
${PORTFOLIO_DATA.profile.primaryTitle}

${PORTFOLIO_DATA.profile.introText}

Email: ${PORTFOLIO_DATA.profile.email}
Phone: ${PORTFOLIO_DATA.profile.phone}

    `.trim();


    navigator.clipboard
        .writeText(summary)
        .then(
            () => {

                showToast(
                    'Professional summary copied to clipboard!'
                );

            }
        );

}


/* ==========================================================================
   GLOBAL FUNCTIONS
   ========================================================================== */

window.switchTab =
    switchTab;

window.copyContact =
    copyContact;

window.copyResumeSummary =
    copyResumeSummary;

window.renderProjects =
    renderProjects;
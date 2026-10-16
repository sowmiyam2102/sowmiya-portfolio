/* ==========================================================================
   PROJECT MODAL & DRAWER HANDLERS
   ========================================================================== */


/* ==========================================================================
   OPEN PROJECT MODAL
   Supports:
   - PORTFOLIO_DATA.projects
   - PORTFOLIO_DATA.otherProjects
   - PORTFOLIO_DATA.allProjects
   - image / images
   ========================================================================== */

function openProjectModal(projectId) {

    /* ----------------------------------------------------------------------
       FIND PROJECT
       ---------------------------------------------------------------------- */

    const allProjects =
        Array.isArray(PORTFOLIO_DATA.allProjects)
            ? PORTFOLIO_DATA.allProjects
            : [
                ...(Array.isArray(PORTFOLIO_DATA.projects)
                    ? PORTFOLIO_DATA.projects
                    : []),

                ...(Array.isArray(PORTFOLIO_DATA.otherProjects)
                    ? PORTFOLIO_DATA.otherProjects
                    : [])
            ];


    const project =
        allProjects.find(
            p =>
                String(p.id) ===
                String(projectId)
        );


    /* ----------------------------------------------------------------------
       SAFETY CHECK
       ---------------------------------------------------------------------- */

    if (!project) {

        console.error(
            "Project not found:",
            projectId
        );

        if (typeof showToast === "function") {

            showToast(
                "Project details could not be loaded."
            );

        }

        return;

    }


    /* ----------------------------------------------------------------------
       NORMALIZE PROJECT DATA
       ---------------------------------------------------------------------- */

    const details =
        project.details || {

            overview:
                project.description ||
                project.shortDesc ||
                "",

            architecture:
                project.subCategory ||
                project.categoryName ||
                project.category ||
                "Project",

            keyWork:
                Array.isArray(project.highlights)
                    ? project.highlights
                    : [],

            pipelineSteps: [],

            dashboardStatus:
                project.categoryName ||
                project.category ||
                "Project"

        };


    const tech =
        Array.isArray(project.tech)
            ? project.tech
            : [];


    /* ----------------------------------------------------------------------
       IMAGES
       Supports both:

       image: "image.png"

       OR

       images: [
           "image1.png",
           "image2.png"
       ]
       ---------------------------------------------------------------------- */

    let images = [];


    if (Array.isArray(project.images)) {

        images =
            project.images.filter(Boolean);

    } else if (project.image) {

        images =
            Array.isArray(project.image)
                ? project.image.filter(Boolean)
                : [project.image];

    }


    /* ----------------------------------------------------------------------
       MODAL ELEMENTS
       ---------------------------------------------------------------------- */

    const backdrop =
        document.getElementById(
            'projectModalBackdrop'
        );

    const modalCategory =
        document.getElementById(
            'modalCategory'
        );

    const modalTitle =
        document.getElementById(
            'modalTitle'
        );

    const modalTags =
        document.getElementById(
            'modalTags'
        );

    const modalBody =
        document.getElementById(
            'modalBody'
        );


    if (
        !backdrop ||
        !modalBody
    ) {

        console.error(
            "Project modal elements are missing from HTML."
        );

        return;

    }


    /* ==========================================================================
       HEADER
       ========================================================================== */

    if (modalCategory) {

        modalCategory.textContent =
            project.categoryName ||
            project.subCategory ||
            project.category ||
            "Project";

    }


    if (modalTitle) {

        modalTitle.textContent =
            project.title ||
            "Project";

    }


    if (modalTags) {

        modalTags.innerHTML =
            tech
                .map(
                    techItem => `
                        <span class="skill-pill highlight">
                            ${techItem}
                        </span>
                    `
                )
                .join('');

    }


    /* ==========================================================================
       PIPELINE / WORKFLOW
       ========================================================================== */

    let pipelineHTML = "";


    if (
        Array.isArray(
            details.pipelineSteps
        ) &&
        details.pipelineSteps.length > 0
    ) {

        pipelineHTML = `

            <div class="modal-section">

                <h4>
                    Analytics & Pipeline Workflow
                </h4>


                <div class="modal-pipeline-box">

                    ${details.pipelineSteps
                .map(
                    (step, index) => `

                                <div class="pipeline-node">

                                    <span class="pipeline-node-icon">
                                        🔹
                                    </span>

                                    <span class="pipeline-node-title">
                                        ${step.name || `Step ${index + 1}`}
                                    </span>

                                    <span class="pipeline-node-sub">
                                        ${step.tool || ""}
                                    </span>

                                </div>


                                ${index <
                            details.pipelineSteps.length - 1
                            ? '<span class="pipeline-arrow">➔</span>'
                            : ''
                        }

                            `
                )
                .join('')}

                </div>

            </div>

        `;

    }


    /* ==========================================================================
       KEY WORK / HIGHLIGHTS
       ========================================================================== */

    const keyWork =
        Array.isArray(details.keyWork)
            ? details.keyWork
            : [];


    const keyWorkHTML =
        keyWork
            .map(
                item => `

                    <li>

                        <span class="bullet-icon">
                            ▹
                        </span>

                        <span>
                            ${item}
                        </span>

                    </li>

                `
            )
            .join('');


    let keyWorkSection = "";


    if (keyWork.length > 0) {

        keyWorkSection = `

            <div class="modal-section">

                <h4>
                    Key Responsibilities & Deliverables
                </h4>


                <ul class="exp-responsibilities">

                    ${keyWorkHTML}

                </ul>

            </div>

        `;

    }


    /* ==========================================================================
       PROJECT IMAGES
       ========================================================================== */

    let imageHTML = "";


    if (images.length > 0) {

        imageHTML = `

            <div class="modal-project-images">

                ${images
                .map(
                    (img, index) => `

                            <img
                                src="${img}"
                                alt="${project.title} preview ${index + 1}"
                                class="modal-dashboard-image"
                                loading="lazy"
                                onerror="
                                    this.style.display='none';
                                "
                            >

                        `
                )
                .join('')}

            </div>

        `;

    } else {

        imageHTML = `

            <div class="modal-preview-placeholder">

                <span class="preview-icon">
                    📊
                </span>

                <span class="preview-title">
                    ${details.dashboardStatus || project.categoryName || "Project"}
                </span>

                <span class="preview-desc">
                    Project developed using ${tech.join(', ')}
                </span>

            </div>

        `;

    }


    /* ==========================================================================
       GITHUB BUTTON
       ========================================================================== */

    let githubHTML = "";


    if (project.githubUrl) {

        githubHTML = `

            <div
                class="modal-section"
                style="margin-top: 0.5rem;"
            >

                <a
                    href="${project.githubUrl}"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="btn btn-secondary"
                    style="
                        width: 100%;
                        text-decoration: none;
                    "
                >

                    <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                        width="18"
                        height="18"
                    >

                        <path
                            d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"
                        />

                        <path
                            d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"
                        />

                    </svg>


                    View Project on GitHub

                </a>

            </div>

        `;

    }


    /* ==========================================================================
       MODAL BODY
       ========================================================================== */

    modalBody.innerHTML = `

        <!-- PROJECT OVERVIEW -->

        <div class="modal-section">

            <h4>
                Project Overview
            </h4>

            <p>
                ${details.overview || "Project details available in the GitHub repository."}
            </p>

        </div>


        <!-- ARCHITECTURE -->

        <div class="modal-section">

            <h4>
                Architecture & Data Workflow
            </h4>

            <p>
                ${details.architecture || "Project architecture and implementation details."}
            </p>

        </div>


        <!-- PIPELINE -->

        ${pipelineHTML}


        <!-- KEY WORK -->

        ${keyWorkSection}


        <!-- PROJECT PREVIEW -->

        <div class="modal-section">

            <h4>
                Project Preview & Interface
            </h4>


            ${imageHTML}


            ${details.dashboardStatus
            ? `

                        <div class="modal-dashboard-caption">

                            <span class="preview-title">
                                ${details.dashboardStatus}
                            </span>

                            <span class="preview-desc">

                                Built with
                                ${tech.join(', ')}

                            </span>

                        </div>

                    `
            : ''
        }

        </div>


        <!-- GITHUB -->

        ${githubHTML}

    `;


    /* ==========================================================================
       SHOW MODAL
       ========================================================================== */

    backdrop.classList.add(
        'active'
    );


    document.body.style.overflow =
        'hidden';

}


/* ==========================================================================
   CLOSE MODAL
   ========================================================================== */

function closeProjectModal() {

    const backdrop =
        document.getElementById(
            'projectModalBackdrop'
        );


    if (backdrop) {

        backdrop.classList.remove(
            'active'
        );

    }


    document.body.style.overflow =
        'auto';

}


/* ==========================================================================
   MODAL EVENT HANDLERS
   ========================================================================== */

document.addEventListener(
    'DOMContentLoaded',
    () => {

        const closeBtn =
            document.getElementById(
                'modalCloseBtn'
            );


        const backdrop =
            document.getElementById(
                'projectModalBackdrop'
            );


        /* ------------------------------------------------------------------
           CLOSE BUTTON
           ------------------------------------------------------------------ */

        if (closeBtn) {

            closeBtn.addEventListener(
                'click',
                closeProjectModal
            );

        }


        /* ------------------------------------------------------------------
           CLICK OUTSIDE MODAL
           ------------------------------------------------------------------ */

        if (backdrop) {

            backdrop.addEventListener(
                'click',
                event => {

                    if (
                        event.target ===
                        backdrop
                    ) {

                        closeProjectModal();

                    }

                }
            );

        }


        /* ------------------------------------------------------------------
           ESCAPE KEY
           ------------------------------------------------------------------ */

        document.addEventListener(
            'keydown',
            event => {

                if (
                    event.key ===
                    'Escape'
                ) {

                    closeProjectModal();

                }

            }
        );

    }
);


/* ==========================================================================
   GLOBAL FUNCTIONS
   ========================================================================== */

window.openProjectModal =
    openProjectModal;


window.closeProjectModal =
    closeProjectModal;
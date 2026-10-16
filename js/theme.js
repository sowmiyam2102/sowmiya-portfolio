/* ==========================================================================
   THEME MANAGER (LIGHT / DARK THEME)
   ========================================================================== */

(function () {
    const THEME_KEY = 'sowmiya_portfolio_theme';

    function getInitialTheme() {
        const savedTheme = localStorage.getItem(THEME_KEY);
        if (savedTheme === 'light' || savedTheme === 'dark') {
            return savedTheme;
        }
        return 'dark'; // Default theme
    }

    function setTheme(theme) {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem(THEME_KEY, theme);
        updateToggleUI(theme);
        
        // Re-render chart colors if charts exist
        if (window.renderHomeScaleChart) {
            window.renderHomeScaleChart();
        }
    }

    function updateToggleUI(theme) {
        const sidebarToggle = document.getElementById('themeToggleSidebar');
        if (sidebarToggle) {
            sidebarToggle.setAttribute('aria-label', `Switch to ${theme === 'dark' ? 'Light' : 'Dark'} Mode`);
        }
    }

    function toggleTheme() {
        const currentTheme = document.documentElement.getAttribute('data-theme') || 'dark';
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        setTheme(newTheme);
    }

    // Initialize Theme on load
    document.addEventListener('DOMContentLoaded', () => {
        const initialTheme = getInitialTheme();
        setTheme(initialTheme);

        const lightOption = document.querySelector('.toggle-option.light');
        const darkOption = document.querySelector('.toggle-option.dark');

        if (lightOption) {
            lightOption.addEventListener('click', (e) => {
                e.stopPropagation();
                setTheme('light');
            });
        }

        if (darkOption) {
            darkOption.addEventListener('click', (e) => {
                e.stopPropagation();
                setTheme('dark');
            });
        }

        const sidebarToggleBtn = document.getElementById('themeToggleSidebar');
        if (sidebarToggleBtn) {
            sidebarToggleBtn.addEventListener('click', toggleTheme);
        }

        const mobileToggleBtn = document.getElementById('themeToggleMobile');
        if (mobileToggleBtn) {
            mobileToggleBtn.addEventListener('click', toggleTheme);
        }
    });

    window.portfolioTheme = {
        setTheme,
        toggleTheme
    };
})();

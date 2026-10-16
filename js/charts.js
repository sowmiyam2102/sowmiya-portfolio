/* ==========================================================================
   INTERACTIVE SVG CHARTS - VERIFIED DATA ONLY
   ========================================================================== */

function renderHomeScaleChart() {
    const container = document.getElementById('homeScaleChart');
    if (!container) return;

    const isLight = document.documentElement.getAttribute('data-theme') === 'light';
    
    // Verified stats data points
    const chartData = [
        { label: 'Internship Records', value: 60000, display: '60,000+', color: isLight ? '#2563EB' : '#3B82F6' },
        { label: 'Retail Records', value: 30000, display: '30,000+', color: isLight ? '#0284C7' : '#06B6D4' },
        { label: 'Banks Covered', value: 50, display: '50+', color: isLight ? '#059669' : '#10B981' },
        { label: 'RBI Datasets', value: 40, display: '40+', color: isLight ? '#7C3AED' : '#8B5CF6' },
        { label: 'Dashboards', value: 6, display: '6+', color: isLight ? '#D97706' : '#F59E0B' }
    ];

    const textColor = isLight ? '#475569' : '#9CA3AF';
    const gridColor = isLight ? 'rgba(0, 0, 0, 0.06)' : 'rgba(255, 255, 255, 0.06)';

    // Build responsive SVG Horizontal Bar Chart
    const svgWidth = 460;
    const svgHeight = 170;
    const barHeight = 20;
    const gap = 12;
    const labelWidth = 120;
    const chartWidth = svgWidth - labelWidth - 70;

    const maxVal = 60000;

    let barsHTML = '';
    chartData.forEach((item, index) => {
        const y = index * (barHeight + gap) + 10;
        const width = Math.max((item.value / maxVal) * chartWidth, 12);

        barsHTML += `
            <g class="chart-group" data-label="${item.label}" data-val="${item.display}">
                <!-- Label -->
                <text x="${labelWidth - 10}" y="${y + 14}" text-anchor="end" fill="${textColor}" font-size="11" font-weight="600" font-family="Inter, sans-serif">${item.label}</text>
                
                <!-- Track background -->
                <rect x="${labelWidth}" y="${y}" width="${chartWidth}" height="${barHeight}" rx="4" fill="${gridColor}" />
                
                <!-- Animated Fill Bar -->
                <rect x="${labelWidth}" y="${y}" width="${width}" height="${barHeight}" rx="4" fill="${item.color}" opacity="0.9">
                    <animate attributeName="width" from="0" to="${width}" dur="0.8s" fill="freeze" calcMode="spline" keySplines="0.16 1 0.3 1" />
                </rect>
                
                <!-- Value Text -->
                <text x="${labelWidth + width + 8}" y="${y + 14}" fill="${textColor}" font-size="11" font-weight="700" font-family="JetBrains Mono, monospace">${item.display}</text>
            </g>
        `;
    });

    container.innerHTML = `
        <svg viewBox="0 0 ${svgWidth} ${svgHeight}" width="100%" height="100%" preserveAspectRatio="xMidYMid meet" style="overflow: visible;">
            ${barsHTML}
        </svg>
    `;
}

document.addEventListener('DOMContentLoaded', () => {
    renderHomeScaleChart();
});

window.renderHomeScaleChart = renderHomeScaleChart;

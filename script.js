const palette = {
    cyan: '#35dfff',
    blue: '#5a8cff',
    violet: '#a78bfa',
    pink: '#ff83c8',
    green: '#6ee7b7',
    orange: '#fb923c',
    muted: '#7890b2',
    grid: 'rgba(133,165,211,.12)',
    text: '#91a4c6'
};
const base = {
    revenue: 218.2648,
    profit: 49.2457,
    orders: 5000,
    customers: 1001,
    months: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    revenueTrend: [18.4, 16.2, 18.1, 17.3, 18.2, 17.7, 20.1, 17.5, 18.4, 13.1, 12.3, 15.2],
    targetTrend: [18.2, 18.0, 18.0, 18.0, 18.2, 18.1, 18.5, 18.0, 18.1, 13.2, 13.0, 15.0],
    regions: ['North', 'West', 'East', 'South'],
    regionValues: [60.2, 55.8, 53.1, 47.4],
    years: ['2024', '2025', '2026'],
    annual: [80.5, 77.9, 56.2],
    targets: [80, 78.5, 56],
    categories: ['Electronics', 'Home & Kitchen', 'Sports', 'Fashion', 'Beauty', 'Books'],
    categoryValues: [142.49, 30.85, 21.42, 11.07, 5.2, 7.23],
    products: ['Electronics_Product_01', 'Electronics_Product_19', 'Electronics_Product_25', 'Electronics_Product_13', 'Electronics_Product_31'],
    productValues: [41.2, 32.1, 27.4, 26.7, 11.9],
    segments: ['Small Business', 'Corporate', 'Consumer'],
    segmentValues: [2550, 2810, 2660],
    returnCategories: ['Electronics', 'Home & Kitchen', 'Sports', 'Beauty', 'Fashion', 'Books'],
    returnValues: [4.3, 1.2, .9, .35, .3, .15]
};
const moneyM = v => `₹${v.toFixed(2)}M`;
const numberFormat = v => new Intl.NumberFormat('en-IN').format(v);
const chartText = () => document.body.classList.contains('light-mode') ? '#61728d' : '#91a4c6';
const chartGrid = () => document.body.classList.contains('light-mode') ? 'rgba(50,78,119,.12)' : 'rgba(133,165,211,.12)';
const chartDefaults = {
    responsive: true,
    maintainAspectRatio: false,
    animation: {
        duration: 750,
        easing: 'easeOutQuart'
    },
    plugins: {
        legend: {
            display: false
        },
        tooltip: {
            backgroundColor: '#101a2e',
            titleColor: '#eaf5ff',
            bodyColor: '#b5c8e3',
            borderColor: 'rgba(53,223,255,.25)',
            borderWidth: 1,
            padding: 11,
            displayColors: true,
            cornerRadius: 9
        }
    },
    scales: {
        x: {
            ticks: {
                color: chartText(),
                font: {
                    family: 'DM Sans',
                    size: 9
                }
            },
            grid: {
                color: chartGrid(),
                drawBorder: false
            },
            border: {
                display: false
            }
        },
        y: {
            ticks: {
                color: chartText(),
                font: {
                    family: 'DM Sans',
                    size: 9
                }
            },
            grid: {
                color: chartGrid(),
                drawBorder: false
            },
            border: {
                display: false
            }
        }
    }
};
const chartInstances = {};
function opts(extra={}) {
    return {
        ...structuredClone(chartDefaults),
        ...extra
    };
}
function initCharts() {
    chartInstances.trend = new Chart(document.getElementById('trendChart'),{
        type: 'line',
        data: {
            labels: base.months,
            datasets: [{
                label: 'Net revenue',
                data: base.revenueTrend,
                borderColor: palette.cyan,
                backgroundColor: 'rgba(53,223,255,.08)',
                fill: true,
                tension: .38,
                borderWidth: 2.5,
                pointRadius: 0,
                pointHoverRadius: 4,
                pointHoverBackgroundColor: palette.cyan
            }, {
                label: 'Sales target',
                data: base.targetTrend,
                borderColor: palette.violet,
                borderDash: [5, 5],
                tension: .35,
                borderWidth: 1.7,
                pointRadius: 0,
                pointHoverRadius: 3
            }]
        },
        options: opts({
            interaction: {
                mode: 'index',
                intersect: false
            },
            scales: {
                x: {
                    ...chartDefaults.scales.x,
                    grid: {
                        display: false
                    },
                    ticks: {
                        ...chartDefaults.scales.x.ticks,
                        maxRotation: 0
                    }
                },
                y: {
                    ...chartDefaults.scales.y,
                    beginAtZero: true,
                    ticks: {
                        ...chartDefaults.scales.y.ticks,
                        callback: v => `₹${v}M`
                    }
                }
            }
        })
    });
    chartInstances.region = new Chart(document.getElementById('regionChart'),{
        type: 'bar',
        data: {
            labels: base.regions,
            datasets: [{
                data: base.regionValues,
                backgroundColor: [palette.cyan, palette.blue, '#4567b4', '#304a81'],
                borderRadius: 5,
                barThickness: 13,
                hoverBackgroundColor: palette.cyan
            }]
        },
        options: opts({
            indexAxis: 'y',
            scales: {
                x: {
                    ...chartDefaults.scales.x,
                    beginAtZero: true,
                    ticks: {
                        ...chartDefaults.scales.x.ticks,
                        callback: v => `₹${v}M`
                    }
                },
                y: {
                    ...chartDefaults.scales.y,
                    grid: {
                        display: false
                    },
                    ticks: {
                        ...chartDefaults.scales.y.ticks,
                        color: chartText()
                    }
                }
            }
        })
    });
    chartInstances.target = new Chart(document.getElementById('targetChart'),{
        type: 'bar',
        data: {
            labels: base.years,
            datasets: [{
                label: 'Revenue',
                data: base.annual,
                backgroundColor: palette.blue,
                borderRadius: 4,
                barPercentage: .6,
                categoryPercentage: .62
            }, {
                label: 'Target',
                data: base.targets,
                backgroundColor: palette.violet,
                borderRadius: 4,
                barPercentage: .6,
                categoryPercentage: .62
            }]
        },
        options: opts({
            scales: {
                x: {
                    ...chartDefaults.scales.x,
                    grid: {
                        display: false
                    }
                },
                y: {
                    ...chartDefaults.scales.y,
                    beginAtZero: true,
                    ticks: {
                        ...chartDefaults.scales.y.ticks,
                        callback: v => `₹${v}M`
                    }
                }
            },
            plugins: {
                ...chartDefaults.plugins,
                legend: {
                    display: true,
                    position: 'bottom',
                    labels: {
                        color: chartText(),
                        usePointStyle: true,
                        pointStyle: 'circle',
                        boxWidth: 6,
                        padding: 14,
                        font: {
                            size: 9
                        }
                    }
                }
            }
        })
    });
    chartInstances.category = new Chart(document.getElementById('categoryChart'),{
        type: 'doughnut',
        data: {
            labels: base.categories,
            datasets: [{
                data: base.categoryValues,
                backgroundColor: [palette.cyan, palette.blue, palette.violet, palette.pink, palette.green, palette.orange],
                borderColor: '#111c31',
                borderWidth: 3,
                hoverOffset: 5,
                spacing: 2
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            cutout: '73%',
            plugins: {
                legend: {
                    display: false
                },
                tooltip: chartDefaults.plugins.tooltip
            }
        }
    });
    chartInstances.products = new Chart(document.getElementById('productsChart'),{
        type: 'bar',
        data: {
            labels: base.products,
            datasets: [{
                data: base.productValues,
                backgroundColor: [palette.cyan, palette.blue, '#4f75ce', '#405da6', '#344d84'],
                borderRadius: 5,
                barThickness: 13,
                hoverBackgroundColor: palette.cyan
            }]
        },
        options: opts({
            indexAxis: 'y',
            scales: {
                x: {
                    ...chartDefaults.scales.x,
                    beginAtZero: true,
                    ticks: {
                        ...chartDefaults.scales.x.ticks,
                        callback: v => `₹${v}M`
                    }
                },
                y: {
                    ...chartDefaults.scales.y,
                    grid: {
                        display: false
                    },
                    ticks: {
                        ...chartDefaults.scales.y.ticks,
                        font: {
                            size: 8
                        }
                    }
                }
            }
        })
    });
    const points = Array.from({
        length: 30
    }, (_, i) => ({
        x: 10 + (i * 17 % 390) / 10,
        y: 4 + (i * 29 % 260) / 10
    }));
    chartInstances.scatter = new Chart(document.getElementById('scatterChart'),{
        type: 'scatter',
        data: {
            datasets: [{
                label: 'Products',
                data: points,
                backgroundColor: 'rgba(53,223,255,.8)',
                borderColor: 'rgba(53,223,255,.95)',
                pointRadius: 4,
                pointHoverRadius: 6
            }]
        },
        options: opts({
            scales: {
                x: {
                    ...chartDefaults.scales.x,
                    min: 0,
                    max: 50,
                    title: {
                        display: true,
                        text: 'Profit margin (%)',
                        color: chartText(),
                        font: {
                            size: 9
                        }
                    },
                    ticks: {
                        ...chartDefaults.scales.x.ticks,
                        callback: v => `${v}%`
                    }
                },
                y: {
                    ...chartDefaults.scales.y,
                    min: 0,
                    max: 35,
                    title: {
                        display: true,
                        text: 'Discount (%)',
                        color: chartText(),
                        font: {
                            size: 9
                        }
                    },
                    ticks: {
                        ...chartDefaults.scales.y.ticks,
                        callback: v => `${v}%`
                    }
                }
            }
        })
    });
    chartInstances.segment = new Chart(document.getElementById('segmentChart'),{
        type: 'doughnut',
        data: {
            labels: base.segments,
            datasets: [{
                data: base.segmentValues,
                backgroundColor: [palette.cyan, palette.blue, palette.violet],
                borderColor: '#111c31',
                borderWidth: 3,
                hoverOffset: 5,
                spacing: 2
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            cutout: '73%',
            plugins: {
                legend: {
                    display: false
                },
                tooltip: chartDefaults.plugins.tooltip
            }
        }
    });
    chartInstances.returns = new Chart(document.getElementById('returnsChart'),{
        type: 'bar',
        data: {
            labels: base.returnCategories,
            datasets: [{
                data: base.returnValues,
                backgroundColor: [palette.pink, palette.violet, palette.blue, '#4266a8', '#344d84', '#293c63'],
                borderRadius: 5,
                barThickness: 13,
                hoverBackgroundColor: palette.pink
            }]
        },
        options: opts({
            indexAxis: 'y',
            scales: {
                x: {
                    ...chartDefaults.scales.x,
                    beginAtZero: true,
                    ticks: {
                        ...chartDefaults.scales.x.ticks,
                        callback: v => `₹${v}M`
                    }
                },
                y: {
                    ...chartDefaults.scales.y,
                    grid: {
                        display: false
                    }
                }
            }
        })
    });
    buildLegend('categoryLegend', base.categories, [palette.cyan, palette.blue, palette.violet, palette.pink, palette.green, palette.orange], base.categoryValues, true);
    buildLegend('segmentLegend', base.segments, [palette.cyan, palette.blue, palette.violet], base.segmentValues, false);
}
function buildLegend(id, labels, colors, values, showPercent) {
    const el = document.getElementById(id);
    el.innerHTML = '';
    labels.forEach( (label, i) => {
        const row = document.createElement('div');
        row.className = 'legend-row';
        const dot = document.createElement('i');
        dot.className = 'legend-color';
        dot.style.background = colors[i];
        dot.style.color = colors[i];
        const name = document.createElement('span');
        name.textContent = label;
        row.append(dot, name);
        if (showPercent) {
            const pct = document.createElement('span');
            pct.style.marginLeft = 'auto';
            pct.style.color = chartText();
            pct.textContent = `${Math.round(values[i] / values.reduce( (a, b) => a + b, 0) * 100)}%`;
            row.append(pct)
        }
        el.append(row)
    }
    )
}
function showToast(message) {
    const toast = document.getElementById('toast');
    toast.textContent = message;
    toast.classList.add('show');
    clearTimeout(showToast.timer);
    showToast.timer = setTimeout( () => toast.classList.remove('show'), 2600)
}
function refreshChartTheme() {
    Object.values(chartInstances).forEach(c => {
        if (!c.options.scales)
            return;
        for (const axis of Object.values(c.options.scales)) {
            if (axis.ticks)
                axis.ticks.color = chartText();
            if (axis.grid)
                axis.grid.color = chartGrid();
            if (axis.title)
                axis.title.color = chartText()
        }
        if (c.options.plugins?.legend?.labels)
            c.options.plugins.legend.labels.color = chartText();
        c.update('none')
    }
    );
}
function applyFilters() {
    const vals = {
        year: document.getElementById('yearFilter').value,
        region: document.getElementById('regionFilter').value,
        category: document.getElementById('categoryFilter').value,
        segment: document.getElementById('segmentFilter').value,
        payment: document.getElementById('paymentFilter').value
    };
    const active = Object.values(vals).filter(v => v !== 'all').length;
    const note = document.getElementById('filterNote');
    note.innerHTML = `<span class="note-pulse"></span> ${active ? `${active} filter${active > 1 ? 's' : ''} selected` : 'Showing all available sales data'} <span class="preview-note">Preview filters update the view labels; connect your dataset for live recalculation</span>`;
    // These are intentionally demo figures: filters show interaction state but do not pretend to recalculate unavailable row-level data.
    document.querySelector('.date-chip b').textContent = vals.year === 'all' ? '2024 — 2026' : vals.year;
    document.querySelector('.panel-foot b').innerHTML = (vals.region === 'all' ? 'North' : vals.region) + ' <i>·</i> ' + (vals.region === 'all' ? '₹60M' : 'Region selected');
    showToast(active ? 'Filters selected — connect sales data for live metric updates.' : 'All filters reset.');
}
function exportSummary() {
    const lines = ['Cognitive Capital — Sales Intelligence Summary', '', `Total Revenue: ₹${base.revenue.toFixed(2)}M`, `Total Profit: ₹${base.profit.toFixed(2)}M`, `Total Orders: ${numberFormat(base.orders)}+`, `Profit Margin: ${(base.profit / base.revenue * 100).toFixed(2)}%`, `Unique Customers: ${numberFormat(base.customers)}`, '', 'Note: Dashboard preview values and chart series are illustrative. Connect the cleaned dataset before using for reporting.'];
    const blob = new Blob([lines.join('\n')],{
        type: 'text/plain;charset=utf-8'
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'cognitive-capital-sales-summary.txt';
    a.click();
    URL.revokeObjectURL(url);
    showToast('Summary exported.');
}
document.addEventListener('DOMContentLoaded', () => {
    initCharts();
    ['yearFilter', 'regionFilter', 'categoryFilter', 'segmentFilter', 'paymentFilter'].forEach(id => document.getElementById(id).addEventListener('change', applyFilters));
    document.getElementById('resetFilters').addEventListener('click', () => {
        ['yearFilter', 'regionFilter', 'categoryFilter', 'segmentFilter', 'paymentFilter'].forEach(id => document.getElementById(id).value = 'all');
        applyFilters()
    }
    );
    document.getElementById('themeToggle').addEventListener('click', () => {
        document.body.classList.toggle('light-mode');
        refreshChartTheme();
        showToast(document.body.classList.contains('light-mode') ? 'Light theme enabled.' : 'Dark theme enabled.')
    }
    );
    document.getElementById('exportBtn').addEventListener('click', exportSummary);
    document.querySelectorAll('.nav-item').forEach(item => item.addEventListener('click', () => {
        document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
        item.classList.add('active')
    }
    ));
}
);

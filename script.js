import { Chart, registerables } from 'https://cdn.jsdelivr.net/npm/chart.js/+esm';

Chart.register(...registerables);

let plot = null;

function calculate() {
    const p_percent = parseFloat(document.getElementById('prob').value);
    const pulls = parseFloat(document.getElementById('pulls').value);
    const p = p_percent / 100;

    const successProb = (1 - Math.pow((1 - p), pulls)) * 100;

    document.getElementById('result').innerHTML = `가챠로 하나 이상 획득할 확률: 약 ${successProb.toFixed(2)}%`;

    const labels = [];
    const data = [];
    const step = Math.max(1, Math.floor(pulls / 20));

    for (let i = 0; i <= pulls; i += step) {
        labels.push(i);
        const prob_at_i = (1 - Math.pow((1 - p), i)) * 100;
        data.push(prob_at_i);
    }

    const ctx = document.getElementById('plot').getContext('2d');

    if (plot) {
        plot.destroy();
    }

    plot = new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                label: '누적 획득 확률 (%)',
                data: data,
                borderColor: '#1ab7ea',
                backgroundColor: 'rgba(26, 183, 234, 0.1)',
                fill: true,
                tension: 0.3
            }]
        },
        options: {
            responsive: true,
            scales: {
                y: { beginAtZero: true, max: 100 }
            }
        }
    });
}

document.getElementById('calcBtn').addEventListener('click', calculate);
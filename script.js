document.addEventListener("DOMContentLoaded", function() {
    // 1. CONFIGURACIÓN DEL GRÁFICO (Tráfico de Red)
    let trafficHistory = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

    const options = {
        series: [{ name: 'Kbps', data: trafficHistory }],
        chart: {
            type: 'area',
            height: 150,
            sparkline: { enabled: true },
            animations: {
                enabled: true,
                easing: 'linear',
                dynamicAnimation: { speed: 1000 }
            }
        },
        colors: ['#6c5ce7'],
        stroke: { curve: 'smooth', width: 2 },
        fill: {
            type: 'gradient',
            gradient: { opacityFrom: 0.6, opacityTo: 0.1 }
        }
    };

    const trafficChart = new ApexCharts(document.querySelector("#traffic-chart"), options);
    trafficChart.render();

    // 2. FUNCIÓN MAESTRA DE ACTUALIZACIÓN
    function updateDashboard() {
        // Definimos las variables de simulación
        const currentCPU = Math.floor(Math.random() * 100);
        const currentUsers = Math.floor(Math.random() * (1500 - 1200) + 1200);
        const currentTraffic = Math.floor(Math.random() * 90) + 10;

        // --- ACTUALIZAR CPU (Texto, Header y Gráfico Circular) ---
        const cpuMain = document.getElementById('cpu-load-main');
        const cpuHeader = document.getElementById('cpu-load-header');
        const cpuCircleText = document.getElementById('cpu-percent');
        const cpuCircle = document.querySelector('.card svg circle:not(.background)');

        if(cpuMain) cpuMain.innerText = currentCPU + "%";
        if(cpuHeader) cpuHeader.innerText = "CPU: " + currentCPU + "%";
        if(cpuCircleText) cpuCircleText.innerText = currentCPU + "%";

        // ... dentro de updateDashboard
        if(cpuCircle) {
            const totalCircunferencia = 226; // Ajustado para radio 36
            const offset = totalCircunferencia - (totalCircunferencia * currentCPU / 100);
            cpuCircle.style.strokeDashoffset = offset;
        }
// ...

        // --- ACTUALIZAR USUARIOS ---
        const userEl = document.getElementById('active-users-count');
        if(userEl) userEl.innerText = currentUsers.toLocaleString();

        // --- ACTUALIZAR GRÁFICO DE TRÁFICO (Efecto flujo) ---
        trafficHistory.push(currentTraffic);
        trafficHistory.shift();
        trafficChart.updateSeries([{ data: trafficHistory }]);
    }

    // Intervalo de 3 segundos para un ritmo relajado
    setInterval(updateDashboard, 3000);
    updateDashboard();

    // 3. LÓGICA DEL MODO OSCURO
    const themeToggler = document.querySelector(".theme-toggler");
    if(themeToggler) {
        themeToggler.addEventListener('click', () => {
            document.body.classList.toggle('dark-theme-variables');
            themeToggler.querySelector('span:nth-child(1)').classList.toggle('active');
            themeToggler.querySelector('span:nth-child(2)').classList.toggle('active');
        });
    }

    // 4. MENÚ HAMBURGUESA (Aside)
    const sideMenu = document.querySelector("#aside-menu");
    const menuBtn = document.querySelector("#menu-bar");
    const closeBtn = document.querySelector("#close-btn");

    if(menuBtn && sideMenu) {
        menuBtn.addEventListener('click', () => sideMenu.classList.add('show-menu'));
    }
    if(closeBtn && sideMenu) {
        closeBtn.addEventListener('click', () => sideMenu.classList.remove('show-menu'));
    }
});//cierre
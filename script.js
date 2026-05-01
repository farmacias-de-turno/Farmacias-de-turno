const farmaciaElemento = document.getElementById("nombre-farmacia");
const fechaElemento = document.getElementById("fecha");
const btnMaps = document.getElementById("btn-maps");
const btnWpp = document.getElementById("btn-wpp");
const logoRed = document.getElementById('logo-red-wrapper');
const cardElemento = document.getElementById("turno-card");
const turnoTimer = document.getElementById("turno-timer");

const TURNO_TIMEZONE = "America/Argentina/Buenos_Aires";
const CLASES_AJUSTE_TARJETA = ["layout-compact", "layout-tight"];

let ajusteTarjetaPendiente = false;

/* ===============================
   BASE DE DATOS MAYO 2026
   ================================= */
const turnos = {
    "2026-05-01":{farmacia:"Red Farmako Farmacia Central",maps:"https://maps.app.goo.gl/tEC8riH4RKpigxkw9",whatsapp:"https://wa.link/qpba4b"},
    "2026-05-02":{farmacia:"Farmanat",maps:"https://maps.app.goo.gl/mDYA4AhvEz3kJPRH9",whatsapp:"https://wa.link/7g8t67"},
    "2026-05-03":{farmacia:"Red Farmako Farmavida",maps:"https://maps.app.goo.gl/tuUsAGeGT3jeeg7B8",whatsapp:"https://wa.link/mpvw1p"},
    "2026-05-04":{farmacia:"Red Farmako Libertad",maps:"https://maps.app.goo.gl/yzxJ5dzcD6AhPzae6",whatsapp:"https://wa.link/wts1ui"},
    "2026-05-05":{farmacia:"Farma Fiorella (Ex Sol Del Norte)",maps:"https://maps.app.goo.gl/SG5ZjdTk6BvRHFAaA",whatsapp:"https://wa.link/vyzpgz"},
    "2026-05-06":{farmacia:"Farmacia Vital",maps:"https://maps.app.goo.gl/rEbphDL5EbjfG1YZA",whatsapp:"https://wa.me/543757442816"},
    "2026-05-07":{farmacia:"Andresito",maps:"https://maps.app.goo.gl/LvWpQRcGqmw3KtP9A",whatsapp:"https://wa.link/ilssy6"},
    "2026-05-08":{farmacia:"Avenida",maps:"https://maps.app.goo.gl/5bQAsLomLDrukSbV9",whatsapp:"https://wa.link/sgxtlc"},
    "2026-05-09":{farmacia:"Red Farmako Farmacia Central",maps:"https://maps.app.goo.gl/tEC8riH4RKpigxkw9",whatsapp:"https://wa.link/qpba4b"},
    "2026-05-10":{farmacia:"Farmanat",maps:"https://maps.app.goo.gl/mDYA4AhvEz3kJPRH9",whatsapp:"https://wa.link/7g8t67"},
    "2026-05-11":{farmacia:"Red Farmako Farmavida",maps:"https://maps.app.goo.gl/tuUsAGeGT3jeeg7B8",whatsapp:"https://wa.link/mpvw1p"},
    "2026-05-12":{farmacia:"Red Farmako Libertad",maps:"https://maps.app.goo.gl/yzxJ5dzcD6AhPzae6",whatsapp:"https://wa.link/wts1ui"},
    "2026-05-13":{farmacia:"Farma Fiorella (Ex Sol Del Norte)",maps:"https://maps.app.goo.gl/SG5ZjdTk6BvRHFAaA",whatsapp:"https://wa.link/vyzpgz"},
    "2026-05-14":{farmacia:"Farmacia Vital",maps:"https://maps.app.goo.gl/rEbphDL5EbjfG1YZA",whatsapp:"https://wa.me/543757442816"},
    "2026-05-15":{farmacia:"Andresito",maps:"https://maps.app.goo.gl/LvWpQRcGqmw3KtP9A",whatsapp:"https://wa.link/ilssy6"},
    "2026-05-16":{farmacia:"Avenida",maps:"https://maps.app.goo.gl/5bQAsLomLDrukSbV9",whatsapp:"https://wa.link/sgxtlc"},
    "2026-05-17":{farmacia:"Red Farmako Libertad",maps:"https://maps.app.goo.gl/yzxJ5dzcD6AhPzae6",whatsapp:"https://wa.link/wts1ui"},
    "2026-05-18":{farmacia:"Farmanat",maps:"https://maps.app.goo.gl/mDYA4AhvEz3kJPRH9",whatsapp:"https://wa.link/7g8t67"},
    "2026-05-19":{farmacia:"Red Farmako Farmavida",maps:"https://maps.app.goo.gl/tuUsAGeGT3jeeg7B8",whatsapp:"https://wa.link/mpvw1p"},
    "2026-05-20":{farmacia:"Red Farmako Libertad",maps:"https://maps.app.goo.gl/yzxJ5dzcD6AhPzae6",whatsapp:"https://wa.link/wts1ui"},
    "2026-05-21":{farmacia:"Farma Fiorella (Ex Sol Del Norte)",maps:"https://maps.app.goo.gl/SG5ZjdTk6BvRHFAaA",whatsapp:"https://wa.link/vyzpgz"},
    "2026-05-22":{farmacia:"Farmacia Vital",maps:"https://maps.app.goo.gl/rEbphDL5EbjfG1YZA",whatsapp:"https://wa.me/543757442816"},
    "2026-05-23":{farmacia:"Andresito",maps:"https://maps.app.goo.gl/LvWpQRcGqmw3KtP9A",whatsapp:"https://wa.link/ilssy6"},
    "2026-05-24":{farmacia:"Avenida",maps:"https://maps.app.goo.gl/5bQAsLomLDrukSbV9",whatsapp:"https://wa.link/sgxtlc"},
    "2026-05-25":{farmacia:"Red Farmako Farmacia Central",maps:"https://maps.app.goo.gl/tEC8riH4RKpigxkw9",whatsapp:"https://wa.link/qpba4b"},
    "2026-05-26":{farmacia:"Farmanat",maps:"https://maps.app.goo.gl/mDYA4AhvEz3kJPRH9",whatsapp:"https://wa.link/7g8t67"},
    "2026-05-27":{farmacia:"Red Farmako Farmavida",maps:"https://maps.app.goo.gl/tuUsAGeGT3jeeg7B8",whatsapp:"https://wa.link/mpvw1p"},
    "2026-05-28":{farmacia:"Red Farmako Libertad",maps:"https://maps.app.goo.gl/yzxJ5dzcD6AhPzae6",whatsapp:"https://wa.link/wts1ui"},
    "2026-05-29":{farmacia:"Farma Fiorella (Ex Sol Del Norte)",maps:"https://maps.app.goo.gl/SG5ZjdTk6BvRHFAaA",whatsapp:"https://wa.link/vyzpgz"},
    "2026-05-30":{farmacia:"Farmacia Vital",maps:"https://maps.app.goo.gl/rEbphDL5EbjfG1YZA",whatsapp:"https://wa.me/543757442816"},
    "2026-05-31":{farmacia:"Andresito",maps:"https://maps.app.goo.gl/LvWpQRcGqmw3KtP9A",whatsapp:"https://wa.link/ilssy6"}
};

/* ===============================
   LOGICA DE TURNO (REGLA 08:00 AM)
   ================================= */

function obtenerAhoraArgentina() {
    const partes = new Intl.DateTimeFormat("en-CA", {
        timeZone: TURNO_TIMEZONE,
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hourCycle: "h23"
    }).formatToParts(new Date()).reduce((acumulado, parte) => {
        if (parte.type !== "literal") {
            acumulado[parte.type] = parte.value;
        }

        return acumulado;
    }, {});

    return new Date(
        Number(partes.year),
        Number(partes.month) - 1,
        Number(partes.day),
        Number(partes.hour),
        Number(partes.minute),
        Number(partes.second)
    );
}

function construirFechaISO(fecha) {
    const año = fecha.getFullYear();
    const mes = String(fecha.getMonth() + 1).padStart(2, "0");
    const dia = String(fecha.getDate()).padStart(2, "0");
    return `${año}-${mes}-${dia}`;
}

function desactivarAcciones() {
    btnMaps.onclick = null;
    btnWpp.onclick = null;
    btnMaps.disabled = true;
    btnWpp.disabled = true;
}

function activarAcciones(info) {
    btnMaps.disabled = false;
    btnWpp.disabled = false;
    btnMaps.onclick = () => window.open(info.maps, "_blank");
    btnWpp.onclick = () => window.open(info.whatsapp, "_blank");
}

function reiniciarAjusteTarjeta() {
    if (!cardElemento) {
        return;
    }

    cardElemento.classList.remove(...CLASES_AJUSTE_TARJETA);
    cardElemento.scrollTop = 0;
}

function actualizarTimer() {
    if (!turnoTimer) return;
    
    const ahora = obtenerAhoraArgentina();
    const fechaConAjuste = new Date(ahora.getTime() - (8 * 60 * 60 * 1000));
    const fechaISO = construirFechaISO(fechaConAjuste);
    
    if (!turnos[fechaISO]) {
        turnoTimer.style.display = 'none';
        return;
    }
    
    const horaActual = ahora.getHours();
    const minutoActual = ahora.getMinutes();
    const segundoActual = ahora.getSeconds();
    
    let horasRestantes, minutosRestantes, segundosRestantes;
    
    if (horaActual < 8) {
        horasRestantes = (8 - horaActual - 1);
        minutosRestantes = 60 - minutoActual;
        segundosRestantes = 60 - segundoActual;
    } else {
        horasRestantes = (24 - horaActual + 8 - 1);
        minutosRestantes = 60 - minutoActual;
        segundosRestantes = 60 - segundoActual;
    }
    
    if (horasRestantes < 0) horasRestantes = 0;
    if (minutosRestantes === 60) minutosRestantes = 0;
    if (segundosRestantes === 60) segundosRestantes = 0;
    
    const esUrgente = horasRestantes <= 2;
    
    const h = String(horasRestantes).padStart(2, '0');
    const m = String(minutosRestantes).padStart(2, '0');
    const s = String(segundosRestantes).padStart(2, '0');
    
    turnoTimer.innerHTML = `<i class="fa-regular fa-clock"></i> Finaliza en ${h}:${m}:${s}`;
    turnoTimer.style.display = 'flex';
    
    if (esUrgente) {
        turnoTimer.classList.add('urgente');
    } else {
        turnoTimer.classList.remove('urgente');
    }
}

function tarjetaDesbordada() {
    if (!cardElemento || !farmaciaElemento) {
        return false;
    }

    const cardRect = cardElemento.getBoundingClientRect();
    const nombreRect = farmaciaElemento.getBoundingClientRect();
    const margenVisible = 16;
    const nombreFueraDeVista = nombreRect.bottom > cardRect.bottom - margenVisible;

    return cardElemento.scrollHeight > cardElemento.clientHeight + 2 || nombreFueraDeVista;
}

function asegurarContenidoVisible() {
    if (!cardElemento) {
        return;
    }

    reiniciarAjusteTarjeta();

    if (!tarjetaDesbordada()) {
        return;
    }

    cardElemento.classList.add("layout-compact");
    cardElemento.scrollTop = 0;

    if (!tarjetaDesbordada()) {
        return;
    }

    cardElemento.classList.add("layout-tight");
    cardElemento.scrollTop = 0;
}

function programarAjusteTarjeta() {
    if (!cardElemento || ajusteTarjetaPendiente) {
        return;
    }

    ajusteTarjetaPendiente = true;

    requestAnimationFrame(() => {
        ajusteTarjetaPendiente = false;
        asegurarContenidoVisible();
    });
}

function actualizarTurno() {
    const ahora = obtenerAhoraArgentina();
    
    // RESTAMOS 8 HORAS para manejar el turno correctamente.
    // Si son las 07:00 AM, el sistema "pensará" que son las 23:00 del día anterior.
    const fechaConAjuste = new Date(ahora.getTime() - (8 * 60 * 60 * 1000));
    const fechaISO = construirFechaISO(fechaConAjuste);

    // Mostrar fecha actual en la UI (No la ajustada, la real para el usuario)
    const opciones = { weekday:'long', year:'numeric', month:'long', day:'numeric' };
    let fechaTexto = ahora.toLocaleDateString('es-AR', opciones);
    fechaElemento.textContent = fechaTexto.charAt(0).toUpperCase() + fechaTexto.slice(1);

    if (turnos[fechaISO]) {
        const info = turnos[fechaISO];
        let nombreMostrar = info.farmacia;

        if (info.farmacia.includes("Red Farmako")) {
            logoRed.style.display = "flex";
            cardElemento.classList.add("card--rmk");
            farmaciaElemento.classList.add("nombre-farmacia--rmk");
            nombreMostrar = info.farmacia
                .replace("Red Farmako", "")
                .replace("Farmacia", "")
                .trim();
            lanzarConfetti();
        } else {
            logoRed.style.display = "none";
            cardElemento.classList.remove("card--rmk");
            farmaciaElemento.classList.remove("nombre-farmacia--rmk");
            if (!/^(farmacia|farma)/i.test(nombreMostrar)) {
                nombreMostrar = "Farmacia " + nombreMostrar;
            }
        }

        farmaciaElemento.textContent = nombreMostrar;
        activarAcciones(info);
    } else {
        farmaciaElemento.textContent = "Sin turno cargado";
        logoRed.style.display = "none";
        desactivarAcciones();
    }

    programarAjusteTarjeta();
}

// Ejecutar al cargar
actualizarTurno();
actualizarTimer();

// Actualizar timer cada segundo, turno cada minuto
setInterval(() => {
    actualizarTimer();
}, 1000);

setInterval(() => {
    actualizarTurno();
}, 60000);

window.addEventListener("resize", programarAjusteTarjeta);
window.addEventListener("orientationchange", programarAjusteTarjeta);

/* ===============================
   CONFETTI
   ================================= */
function lanzarConfetti(){
    const colores=["#72bd99","#5da685","#8fd6b7","#4fae88"];
    const cantidad=80; // Más confetti para efecto de lluvia

    for(let i=0;i<cantidad;i++){
        const confetti=document.createElement("div");
        confetti.classList.add("confetti");
        
        // Posición horizontal aleatorea en toda la pantalla (0 a 100vw)
        confetti.style.left=(Math.random()*100)+"vw";
        
        // Variación en tamaño
        confetti.style.width=(Math.random()*6+3)+"px";
        confetti.style.height=(Math.random()*10+5)+"px";
        
        // Color aleatorio
        confetti.style.backgroundColor=colores[Math.floor(Math.random()*colores.length)];
        
        // Duración variable para más movimiento natural
        const duracion=Math.random()*3+3;
        confetti.style.animationDuration=duracion+"s";
        
        // Agregar delay para que no caiga todo junto
        const delay=Math.random()*0.5;
        confetti.style.animationDelay=delay+"s";
        
        document.body.appendChild(confetti);
        setTimeout(()=>confetti.remove(),duracion*1000+delay*1000);
    }
}
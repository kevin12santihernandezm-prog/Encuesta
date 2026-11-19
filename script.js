let preguntaActual = 0;

const pasos = document.querySelectorAll(".step");
const feedback = document.getElementById("feedback");

function mostrarPregunta() {
    pasos.forEach(paso => paso.classList.remove("active"));

    pasos[preguntaActual].classList.add("active");

    const progreso = preguntaActual / 5 * 100;

    document.getElementById("progress").style.width =
        progreso + "%";

    document.getElementById("progressText").textContent =
        preguntaActual === 0
        ? "Datos iniciales"
        : `Pregunta ${preguntaActual} de 4`;

    feedback.textContent = "";
}

function siguiente() {
    const nombre = document.getElementById("nombre").value.trim();
    const parentesco = document.getElementById("parentesco").value.trim();
    const cuantos = document.getElementById("cuantos").value;

    if (nombre === "" || parentesco === "" || cuantos === "") {
        feedback.textContent = "Completa todos los campos.";
        feedback.style.color = "#ff7070";
        return;
    }

    if (Number(cuantos) < 0) {
        feedback.textContent = "Ingresa una cantidad válida de años.";
        feedback.style.color = "#ff7070";
        return;
    }

    preguntaActual++;
    mostrarPregunta();
}

function verificarNumero(id, respuestaCorrecta) {
    const respuesta = document.getElementById(id).value;

    if (respuesta === "") {
        mostrarError("Escribe una respuesta.");
        return;
    }

    if (Number(respuesta) === respuestaCorrecta) {
        respuestaCorrectaFuncion();
    } else {
        mostrarError("❌ Incorrecto, intenta nuevamente.");
    }
}

function verificarOpcion(nombre, respuestasCorrectas) {
    const seleccion = document.querySelector(
        `input[name="${nombre}"]:checked`
    );

    if (!seleccion) {
        mostrarError("Selecciona una opción.");
        return;
    }

    if (respuestasCorrectas.includes(Number(seleccion.value))) {
        respuestaCorrectaFuncion();
    } else {
        mostrarError("❌ Incorrecto, intenta nuevamente.");
    }
}

function mostrarError(mensaje) {
    feedback.textContent = mensaje;
    feedback.style.color = "#ff7070";
}

function respuestaCorrectaFuncion() {
    feedback.textContent = "✅ ¡Correcto!";
    feedback.style.color = "#4ade80";

    setTimeout(() => {
        preguntaActual++;

        if (preguntaActual < pasos.length - 1) {
            mostrarPregunta();
        } else {
            finalizarEncuesta();
        }
    }, 700);
}

function finalizarEncuesta() {
    const nombre = document.getElementById("nombre").value;

    pasos.forEach(paso => paso.classList.remove("active"));

    pasos[pasos.length - 1].classList.add("active");

    document.getElementById("mensajeFinal").textContent =
        `¡Excelente, ${nombre}! Has terminado todas las preguntas.`;

    document.getElementById("progress").style.width = "100%";
    document.getElementById("progressText").textContent =
        "Encuesta completada";

    feedback.textContent = "";
}
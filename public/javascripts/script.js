const ceremonia = document.getElementById("btnCeremonia");
const btnClose = document.querySelector(".closeBtn");
const btnCloseForm = document.querySelector(".closeBtnForm");
const fiesta = document.getElementById("btnFiesta");
const codigoNovios = document.getElementById("btnCodigo");
const confirmar = document.getElementById("btnConfirmar");
const modal = document.querySelector(".modal-overlay");
const form = document.querySelector(".form-overlay");
const tabs = document.getElementsByClassName("tab");
const invitacionForm = document.getElementById("invitacion-form");
let currentTab = 0;

ceremonia.addEventListener("click", () => {
  toggleClass(modal);
  document.querySelector(".modal-title").innerHTML = ceremoniaTitle();
  document.querySelector(".modal-body").innerHTML = ceremoniaBody();
  setTimeout(() => {
    ceremonia.checked = false;
  }, 500);
});

fiesta.addEventListener("click", () => {
  toggleClass(modal);
  document.querySelector(".modal-title").innerHTML = fiestaTitle();
  document.querySelector(".modal-body").innerHTML = fiestaBody();
  setTimeout(() => {
    fiesta.checked = false;
  }, 500);
});

codigoNovios.addEventListener("click", () => {
  toggleClass(modal);
  document.querySelector(".modal-title").innerHTML = codigoTitle();
  document.querySelector(".modal-body").innerHTML = codigoBody();
  setTimeout(() => {
    codigoNovios.checked = false;
  }, 500);
});

confirmar.addEventListener("click", () => {
  toggleClass(form);

  document.querySelector(".form-title").innerHTML = formTitle();
  document.querySelector(".form-body").innerHTML = formBody();
  if (!Array.from(tabs[0].classList).find((e) => e === "active")) {
    toggleClass(tabs[0]);
  }
  tabs[0].style.display = "block";
  setTimeout(() => {}, 500);

  setTimeout(() => {
    confirmar.checked = false;
  }, 500);
});

btnClose.addEventListener("click", () => {
  toggleClass(modal);
});
btnCloseForm.addEventListener("click", () => {
  
  toggleClass(form);
});

function siguienteTab() {
  if (checkInputs()) {
    if (document.getElementById("invitado").checked) {
      tabs[currentTab + 2].style.display = "block";
      setTimeout(() => {
        toggleClassSiguiente(tabs[currentTab]);
        toggleClass(tabs[currentTab + 2]);
        currentTab += 2;
      }, 500);
    } else {
      tabs[currentTab + 1].style.display = "block";
      setTimeout(() => {
        toggleClassSiguiente(tabs[currentTab]);
        toggleClass(tabs[currentTab + 1]);
        currentTab += 1;
      }, 500);
    }
  } else {
    alert("todos los campos son obligatorios");
  }
}

function checkInputs() {
  let i;
  let valid = true;
  const x = document.getElementsByClassName("tab");
  const y = x[currentTab].getElementsByTagName("input");
  let radio = x[currentTab].querySelectorAll(".radio").length;
  let comparador = 0;
  for (i = 0; i < y.length; i++) {
    if (y[i].value == "") {
      y[i].className += " invalid";
      valid = false;
    }
    if (y[i].type === "radio" && !y[i].checked) {
      comparador += 1;
    }
  }
  if (comparador === radio) {
    valid = false;
  }
  return valid;
}

function anteriorTab() {
  if (document.getElementById("invitado").checked) {
    //TODO s checked false
    if (currentTab === 1) {
      setTimeout(() => {
        toggleClass(tabs[currentTab]);
        toggleClassSiguiente(tabs[currentTab - 1]);
        document.getElementById("invitado").checked = false;
        currentTab -= 1;
      }, 500);
    }else{
      setTimeout(() => {
        toggleClass(tabs[currentTab]);
        toggleClassSiguiente(tabs[currentTab - 2]);
        currentTab -= 2;
      }, 500);
    }
  } else {
    setTimeout(() => {
      toggleClass(tabs[currentTab]);
      toggleClassSiguiente(tabs[currentTab - 1]);
      currentTab -= 1;
    }, 500);
  }
}

function toggleClass(item) {
  item.classList.toggle("active");
}
function toggleClassSiguiente(item) {
  item.classList.toggle("siguiente");
}

function submit() {
  invitacionForm.submit();
}

function ceremoniaTitle() {
  return `<h1>¡Agenda el día!</h1>`;
}
function ceremoniaBody() {
  return `               
  <p>Te invitamos a acompañarnos en nuestra ceremonia el día 28 de enero de 2023 a las 18:30 hrs en la parroquía Nuestra señora de las Mercedes de Concón:</p>
  <h2>Dirección</h2>
  <div class="direccion"><img src="/images/map_pin.svg"><p>Calle Maroto 950, Concón</p></div>
  <a class="btn-blanco" target="_blank" href="https://goo.gl/maps/y23i38gL4VSJq91RA"><button class="ripple">Ver en Google Maps</button></a>
  <a class="btn-transparente" target="_blank" href="https://calendar.google.com/calendar/event?action=TEMPLATE&tmeid=N2gyMmk4ZXRvNHZvN2lsanBwZXRqcWd0cGUgbWF0cmljYXJvbHlkYW5pZWxAbQ&tmsrc=matricarolydaniel%40gmail.com"><button class="ripple">Agrega a tu calendario de Google</button></a>
  `;
}
function fiestaTitle() {
  return `<h1>¡Vamos a celebrar!</h1>`;
}
function fiestaBody() {
  return `               
  <p>Después de la ceremonia los esperamos para disfrutar una rica cena en el Centro de eventos Chapanay a las 20:00 hrs.</p>
  <h2>Dirección</h2>
  <div class="direccion"><img src="/images/map_pin.svg"><p>Las Palmeras s/n, Quintero, Valparaíso</p></div>
  <a class="btn-blanco" target="_blank" href="https://goo.gl/maps/dE3AHZPRmtcRVXWs6"><button class="ripple">Ver en Google Maps</button></a>
  `;
}
function codigoTitle() {
  return `<h1>Código Novios</h1>`;
}
function codigoBody() {
  return `               
  <p>Si quieres dejarnos un regalito o compras regularmente en tiendas Paris te invitamos a dejar nuestro código de novios:</p>
  <a class="btn-transparente"><button class="ripple">4911261</button></a>
  <p>Puedes utilizarlo en cualquier tienda de Chile</p>

  `;
}
function formTitle() {
  return `<h1>Confirma <br> tu asistencia</h1>
  <p>llenando el siguiente formulario.</p>

  `;
}
function formBody() {
  return `               
  <form action="/form" id="invitacion-form" method="post">
                    <div class="tab">
                        <div class="input-group">
                            <label for="nombre">Nombre</label>
                            <input type="text" name="nombre" id="nombre"  placeholder="Ingresa tu nombre aquí...">
                        </div>
                        <div class="input-group">
                            <label for="apellido">Apellido</label>
                            <input type="text" name="apellido" id="apellido" placeholder="Ingresa tu apellido aquí...">
                        </div>
                        <div class="input-group radio">
                                <legend>¿Necesitas un menú especial?</legend>
                                <label>
                                    <input type="radio" class="radio" name="menu" value="NORMAL"> No
                                </label>
                                <label>
                                    <input type="radio" class="radio" name="menu" value="vegetariano"> Vegetariano
                                </label>
                                <label>
                                    <input type="radio" class="radio" name="menu" value="Sin gluten"> Sin gluten
                                </label>
                                <label>
                                    <input type="radio" class="radio" name="menu" value="Sin azucar"> Sin azúcar
                                </label>
                                <label>
                                    <input type="radio" class="radio" name="menu" value="Sin Lacteos"> Sin Lacteos
                                </label>
                                <label>
                                    <input type="radio" class="radio" name="menu" value="Otro"> Otro
                                </label>
                        </div>
                        <a class="btn-blanco" onclick='siguienteTab()' id="siguiente"><div class="button ripple"><p>Siguiente</p></div></a>
                    </div>
                    <div class="tab" id="llevas-acompañante">
                        <h1>¿Llevas acompañante?</h1>
                        <label>
                            <input class="radio" type="radio"  name="tieneAcompanante" value="true"> ¡Sí!
                        </label>
                        <label>
                            <input class="radio" type="radio" id="invitado" name="tieneAcompanante" value="false"> Esta vez no
                        </label>
                        <a class="btn-blanco" onclick='siguienteTab()'><div class="button ripple"><p>Siguiente</p></div></a>

                        <a class="atras" onclick='anteriorTab()'><div class="button ripple"><img src="/images/atras.png" alt="ir a la hoja de formulario anterior"></div></a>

                    </div>
                    <div class="tab">
                        <h1>Datos de tu
                            acompañante</h1>
                        <div class="input-group">
                            <label for="nombreAcomp">Nombre:</label>
                            <input type="text" name="nombreAcomp" id="nombre" placeholder="Ingresa su nombre aquí...">
                        </div>
                        <div class="input-group">
                            <label for="apellidoAcomp">Apellido:</label>
                            <input type="text" name="apellidoAcomp" id="apellido" placeholder="Ingresa su apellido aquí...">
                        </div>
                        <div class="input-group radio">
                                <legend>¿Necesitas un menú especial?</legend>
                                <label>
                                    <input class="radio" type="radio" name="menuAcomp" value="NORMAL"> No
                                </label>
                                <label>
                                    <input class="radio" type="radio" name="menuAcomp" value="vegetariano"> Vegetariano
                                </label>
                                <label>
                                    <input class="radio" type="radio" name="menuAcomp" value="Sin gluten"> Sin gluten
                                </label>
                                <label>
                                    <input class="radio" type="radio" name="menuAcomp" value="Sin azucar"> Sin azúcar
                                </label>
                                <label>
                                    <input class="radio" type="radio" name="menuAcomp" value="Sin Lacteos"> Sin Lacteos
                                </label>
                                <label>
                                    <input class="radio" type="radio" name="menuAcomp" value="Otro"> Otro
                                </label>
                        </div>
                        <a class="btn-blanco" onclick='siguienteTab()' id="siguiente"><div class="button ripple"><p>Siguiente</p></div></a>
                        <a class="atras" onclick='anteriorTab()'><div class="button ripple"><img src="/images/atras.png" alt="ir a la hoja de formulario anterior"></div></a>

                    </div>
               
                    <div class="tab" id= "ingresar-mail">
                        <h1>¡Sólo un 
                            paso más!</h1>
                        <p>Dejanos tu mail para enviarte la invitación</p>
                        <div class="input-group">
                            <input type="text" name="mail" id="mail" placeholder="Ingresa tu email aquí...">
                        </div>

                        <div class="btn-blanco" id="siguiente"><div class="button ripple"><button type="submit">Confirmar</button></div></div>
                        <a class="atras" onclick='anteriorTab()'><div class="button ripple"><img src="/images/atras.png" alt="ir a la hoja de formulario anterior"></div></a>

                    </div>
                    
                </form>

  `;
}

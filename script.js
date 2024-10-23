// variables del programa
let listaTemAgua = document.querySelector(".lis-tem-agu");
let materiTuberia = document.querySelector(".mat-tube");
let lisAcceSiste = document.querySelector(".lista-ime");

//Variables relacionadas con el calculo
// Relaciones en accesorios
let listaAccesoriosComunes = ["SALIDA DE TANQUE o Entrada Tuberia que se proyecta hacia dentro", " Entrada con bordes afilados", " Entrada achaflanada", " Entrada redondeada", 
    " Valvula globo--abierta por completo", " Válvula de ángulo--abierta por completo", " Válvula de compuerta--abierta por completo", 
    " --3/4 abierta", "--1/2 abierta", " --1/4 abierta", " Válvula de verificación--tipo giratorio", 
    " Válvula de verificación--tipo bola", " Válvula de mariposa--abierta por completo, 2 a 8 pulg", " --10 a 14 pulg", " --16 a 24 pulg", " Válvula de pie--tipo disco de vástago", 
    " Válvila de pie--tipo disco bisagra", " Codo de 90°", " Codo de 90° de radio largo", " Codo roscado a 90°", " Codo estandar a 45°", " Codo roscado a 45°", " Vuelta cerrada en retorno", 
    " Te estándar--con flujo directo", "--con flujo ramal"
];

let leDAccesorios = [1, 0.5, 0.25, 0.6, 340, 150, 8, 35, 160, 900, 100, 150, 45, 35, 
25, 420, 75, 30, 20, 50, 16, 26, 50, 20, 60];

//Propiedades del agua
let tempetaturaAgua = [0, 5, 10, 15, 20, 25, 35, 45, 50, 55, 60, 65, 70,
75, 80, 85, 90, 95, 100];

let pesoEspecificoAgua = [9.81, 9.81, 9.81, 9.81, 9.79, 9.78, 9.77, 
9.75, 9.73, 9.71, 9.69, 9.67, 9.65, 9.62, 9.59, 9.56, 9.53, 9.50,9.47,
9.44, 9.40];

let densidadAgua = [1000, 1000, 1000, 1000, 998, 997, 996, 994, 992, 
    990, 988, 986, 984, 981, 978, 975, 971, 968, 965, 962, 958];

let viscosidadDinamicaAgua = [1.75*10**-3, 1.52*10**-3, 1.30*10**-3, 1.15*10**-3, 
1.02*10**-3, 8.91*10**-4, 8.00*10**-4, 7.18*10**-4, 6.51*10**-4, 5.94*10**-4,
5.41*10**-4, 4.98*10**-4, 4.60*10**-4, 4.31*10**-4, 4.02*10**-4, 3.73*10**-4,
3.50*10**-4, 3.30*10**-4, 3.11*10**-4, 2.92*10**-4, 2.82*10**-4];

let viscosidadCinematica = [1.75*10**-6, 1.52*10**-6, 1.30*10**-6, 1.15*10**-5, 
1.02*10**-6, 8.94*10**-7, 8.03*10**-7, 7.22*10**-7, 6.56*10**-7, 6.00*10**-7, 
5.48*10**-7, 5.0*10**-7, 4.67*10**-7, 4.39*10**-7, 4.11*10**-7, 3.83*10**-7, 
3.60*10**-7, 3.41*10**-7, 3.22*10**-7, 3.04*10**-7, 2.94*10**-7];

// Propiedades de los materiales
let materialTub = ["Vidrio", "Plástico", "Tubo extruido, cobre, latón, y acero", 
"Acero, comercial o soldado", "Hierro galvanizado", "Hierro ductil, recubierto", 
"Hierro ductil, no recubierto", "Concreto, bien fabricado", "Acero remachado"];

let Rugosidad = ["Liso", 3.0*10**-7, 1.5*10**-6, 4.6*10**-5, 1.5*10**-4,
1.2*10**-4, 2.4*10**-4, 1.2*10**-4, 1.8*10**-3];

// Variales para el funsionamiento del DOM
let botonSiguienteTramo = document.querySelector(".boton-siguiente-tramos");
let botonCalcular = document.querySelector(".boton-calcular");
let entradaCaudal = document.querySelector(".entrada-caudal");
let entradaDiametro = document.querySelector(".entrada-diam");
let entradaLongitud = document.querySelector(".entrada-long");
let selectParaIntroduccionDeParametros = document.querySelectorAll(".lis-selecc-parametros");
let conta = 0;
let energiasEnCadaTramo = [];
let erEneras = 0;

// FUNCIONES PARA EL CALCULO DE SISTEMAS DE TUEBERIAS EN SERIE
// Se debe introducir en unidades de m y segundos
function calcularVelosidadEnBaseACaudal (Q, D) {
    return Q / ((Math.PI * D**2)/4);
}

// Funcion para el cauculo de cabeza de presión
function calculoCabezaPresion (p, gama) {
    return p / gama
}

//Calculo de cabeza de velocidad en el sistema
function calcularCabezaDeVelocidad (v) {
    return (v**2) / (2*9.81);
}

// Funcion para el calculo de ha, en el sistema         ESTA ES LA FUNSIÓN MAS IMPORTANTE PARA EL CALCULO DE HA Y ES LA UNICA QUE SE USA
function calculoHaEnSistema (p1, z1, v1, p2, z2, v2, gama, hl) {
    console.log("Cabeza pr2 " + calculoCabezaPresion(p2, gama));
    console.log("Cabeza v2 " + calcularCabezaDeVelocidad(v2));
    console.log("Cabeza pr1 " + calculoCabezaPresion(p1, gama));
    console.log("Cabeza v1 " + calcularCabezaDeVelocidad(v1));
    console.log("elev 2: " + z2);

    return calculoCabezaPresion(p2, gama) + z2 + calcularCabezaDeVelocidad(v2) - calculoCabezaPresion(p1, gama) - z1 - calcularCabezaDeVelocidad(v1) + hl;
}

// FUNSIONES PARA EL CALCULO DE SISTEMAS CLASE I
/* FUNSIONES PARA EL CALCULO DE PERDIDAS DE ENERGIA EN SISTEMAS DE TUBERIAS */
// Calculo de Numero de Reinolds
function calcularNumeroReinolds (D, v, p, u) {
    return (D * v * p) / u;
}

// Calculo de f (factor de fricción)
function calcularFactorFriccion (D, v, p, u, e) {
    let numeroReinolds = calcularNumeroReinolds(D, v, p, u);
    // Mediante este if, se define si es laminar o turbulento y calcula en base a ello
    if (numeroReinolds < 2000) {
        return 64 / numeroReinolds;
    }

    else if (numeroReinolds > 4000) {
        return 0.25 / (Math.log10((e/(3.71*D)) + (5.74/(numeroReinolds**0.9)))) ** 2;
    }
}

// Factor k, en perdidas por longitud
function calculoDeKFriccion (D, v, p, u, e, L) {
    let factorFriccion = calcularFactorFriccion(D, v, p, u, e);
    return factorFriccion * (L / D);
}
 
// Factor k, en perdidas por accesorios
function calculoDeKAccesorios (D, v, p, u, e, leD) {
    let factorFriccion = calcularFactorFriccion(D, v, p, u, e);
    return factorFriccion * leD;
}

// ########### ESTAS SON LAS ECUACIONES MAS IMPORTANTES PARA EL CALCULO DE PERDIDAS DE ENERGIA #######################
// Peridas de energia por longitud
function calculoPerdidadEnergiPorFriccion (D, v, p, u, e, L) {
    let factorK = calculoDeKFriccion(D, v, p, u, e, L);
    return factorK * ((v**2) / (2 * 9.81));
}

// Perdidas de energia por accesorios
function calculoPerdidadEnergiPorAccesorio (D, v, p, u, e, leD) {
    let factorK = calculoDeKAccesorios (D, v, p, u, e, leD);
    return factorK * (v**2) / (2 * 9.81);
}

// Perdidas de energia en entradas y salidas de tanques
function calculoDePerdidasEntradasTanques (k, v) {
    return k * (v**2 / (2*9.81));
}

// FUNCIONES EXTRAS Y ASOCIADAS CON EL DOM #####################
// Crea los elementos que hacen parte de la lista seleccionable
function crearListaSelect (listaSele, arrayContenido) {
    for (i in arrayContenido) {
        let opcion = document.createElement("option");
        opcion.innerHTML = arrayContenido[i];
        listaSele.appendChild(opcion);
    }
}

// Creá la lista de accesorios, para seleccionar, ademas de entrada para el numero de estos
function crearOpciones (liscontenidoItems, contenedorOpciones) {
    let item, labelItem, entradaDos; 
    for (i in liscontenidoItems) {
        item = document.createElement("li");
        labelItem = document.createElement("label");
        labelItem.classList.add("laber-acce")
        labelItem.innerHTML = liscontenidoItems[i];
        entradaDos = document.createElement("input");
        entradaDos.type = "number";
        entradaDos.classList.add("numero-elementos-acce");
        item.appendChild(labelItem);
        item.appendChild(entradaDos);
        item.classList.add("items-acce");
        contenedorOpciones.appendChild(item);
    }
}

// En cuentra la posicion de un elemento en una lista
function encontrarEenBaseaMaterial (material, arrayBusque) {
    return arrayBusque.indexOf(material);
}


// EJECUCIÓN DE LAS FUNSIONES
crearListaSelect(listaTemAgua, tempetaturaAgua);
crearListaSelect(materiTuberia, materialTub);
crearOpciones(listaAccesoriosComunes, lisAcceSiste);

/* PROGRAMACIÓN DE EVENTOS PARA EL FUNSIONAMIENTO DEL PROGRAMA */
// Evento para reconocer el numero de tramos
botonSiguienteTramo.addEventListener("click", function(){
    // Obtenga los valores de las entradas que se tienen
    let Q = parseFloat(entradaCaudal.value);
    let e = parseFloat(Rugosidad[encontrarEenBaseaMaterial (materiTuberia.value, materialTub)]);
    let p = parseFloat(densidadAgua[encontrarEenBaseaMaterial (parseFloat(listaTemAgua.value), tempetaturaAgua)]);
    let u = parseFloat(viscosidadDinamicaAgua[encontrarEenBaseaMaterial (parseFloat(listaTemAgua.value), tempetaturaAgua)]);
    // Las dos siguientes variables, se tienen que cambiar ##***#**#*;
    // let p = 789;
    // let u = 5.60*10**-4;
    let D = parseFloat(entradaDiametro.value);
    let L = parseFloat(entradaLongitud.value);
    entradaDiametro.value = "";
    entradaLongitud.value = "";

    let valoresDeEntradasAccesorios = document.querySelectorAll(".numero-elementos-acce");
    let obtenidosEntradas = [];
    let nombreAccesorio = [];

    for (i in valoresDeEntradasAccesorios) {
        if (isNaN(parseInt(valoresDeEntradasAccesorios[i].value))) {

        }

        else {
            nombreAccesorio.push(valoresDeEntradasAccesorios[i].previousElementSibling.textContent);
            obtenidosEntradas.push(parseInt(valoresDeEntradasAccesorios[i].value))
            valoresDeEntradasAccesorios[i].value = "";
        }
    }
    
    // Función para obtener los valores de LeD, de cada uno se los elementos
    let LeDsDelSistema = [];
    for (i of nombreAccesorio) {
        let po = listaAccesoriosComunes.indexOf(i);
        LeDsDelSistema.push(leDAccesorios[po]);
    }

    // Calculo de factor de fricción en el sistema
    let v = calcularVelosidadEnBaseACaudal(Q, D);
    let listaPedidasAccesorios = [];
    let arrayPerdidasFinalesMenores = [];

    for (i in LeDsDelSistema) {
        if (LeDsDelSistema[i] <= 1) {
            let ner = calculoDePerdidasEntradasTanques(LeDsDelSistema[i], v);
            listaPedidasAccesorios.push(ner);

        }
        
        else if (LeDsDelSistema[i] > 1) {
            let perdidaAccesorios = calculoPerdidadEnergiPorAccesorio(D, v, p, u, e, LeDsDelSistema[i]);
            listaPedidasAccesorios.push(perdidaAccesorios);
        }
    }

    for (i in LeDsDelSistema) {
        arrayPerdidasFinalesMenores.push(parseFloat(obtenidosEntradas[i]) * parseFloat(listaPedidasAccesorios[i]))
    }

    let reusultadoEnergia =  0;
    for (i of arrayPerdidasFinalesMenores) {
        reusultadoEnergia += i;
    }

    let energiasPorFriccion = calculoPerdidadEnergiPorFriccion(D, v, p, u, e, L);
    reusultadoEnergia += energiasPorFriccion;
    energiasEnCadaTramo.push(reusultadoEnergia);
    
});

let valorSelecciónConcaudal = [];
// Seleccina las variables necesarias para el calculo
selectParaIntroduccionDeParametros.forEach(function(parSelecci){
    parSelecci.addEventListener("click", function(){
        conta += 1;
        if (conta%2 == 0) {
            valorSelecciónConcaudal.push(this.value);
            let conteVariables = this.nextElementSibling;
            if (this.value == "Con caudal (Q)") {
                let entradaPara;
                for (let i = 0; i<2; i++) {
                    let conten = document.createElement("div");
                    conten.classList.add("parametro");
                    let labePara = document.createElement("label");
                    labePara.classList.add("lab-entra");
                    if (i == 1) {
                        if (conta <= 2) {
                            labePara.innerHTML = "Q1 (m3 / s): ";
                            labePara.classList.add("lab-entra");
                            entradaPara = document.createElement("input");
                            entradaPara.classList.add("entrada-caudal", "entrd-conten");
                        }

                        else {
                            labePara.innerHTML = "Q2 (m3 / s): ";
                            labePara.classList.add("lab-entra");
                            entradaPara = document.createElement("input");
                            entradaPara.classList.add("entrada-caudal", "entrd-conten");
                        }
                    }

                    else {
                        if (conta <= 2) {
                            labePara.innerHTML = "D1 (m): ";
                            labePara.classList.add("lab-entra");
                            entradaPara = document.createElement("input");
                            entradaPara.classList.add("entrada-diametro", "entrd-conten");
                        }

                        else {
                            labePara.innerHTML = "D2 (m): ";
                            labePara.classList.add("lab-entra");
                            entradaPara = document.createElement("input");
                            entradaPara.classList.add("entrada-diametro", "entrd-conten")
                        }
                    }
                    
                    conten.appendChild(labePara);
                    conten.appendChild(entradaPara);
                    conteVariables.appendChild(conten);
                }
            }

            else { 
                let conten = document.createElement("div");
                    conten.classList.add("parametro");
                    let labePara = document.createElement("label");
                    labePara.classList.add("lab-entra");
                    let entradaPara;
                    if (conta <= 2) {
                        labePara.innerHTML = "V1 (m / s): ";
                        labePara.classList.add("lab-entra");
                        entradaPara = document.createElement("input");
                        entradaPara.classList.add("entrada-velocidad", "entrd-conten");
                    }

                    else {
                        labePara.innerHTML = "V2 (m / s): ";
                        labePara.classList.add("lab-entra");
                        entradaPara = document.createElement("input");
                        entradaPara.classList.add("entrada-velocidad", "entrd-conten");
                    }
                    
                    conten.appendChild(labePara);
                    conten.appendChild(entradaPara);
                    conteVariables.appendChild(conten);
            }
        }

        else {
        }
    })
});


botonCalcular.addEventListener("click", function(){
    let campoMostrarResultado = document.querySelector(".res-real");
    for (i of energiasEnCadaTramo) {
        erEneras += i;
    }
    console.error(erEneras);
    /************************************************** */
    let velosidadesSistema
    let caudalesSistema;
    let diametrosSistema;
    let vds;
    let Qles;
    let Dms;
    let gama = 7740;

    for (i in valorSelecciónConcaudal) {
        if (valorSelecciónConcaudal[i] == "Con caudal (Q)") {
            caudalesSistema = document.querySelectorAll(".entrada-caudal");
            diametrosSistema = document.querySelectorAll(".entrada-diametro");
            Qles = [parseFloat(caudalesSistema[0].value), parseFloat(caudalesSistema[1].value)];
            Dms = [parseFloat(diametrosSistema[0].value), parseFloat(diametrosSistema[1].value)];
        }

        else if (valorSelecciónConcaudal[i] == "Con velocidad (V)") {
            velosidadesSistema = document.querySelectorAll(".entrada-velocidad");
            vds = [parseFloat(velosidadesSistema[0].value), parseFloat(velosidadesSistema[1].value)];

        }
    }
    


    let presionesSistema = document.querySelectorAll(".entrada-presion");
    let elevacionesSistema = document.querySelectorAll(".entrada-elevacion");

    let pns = [parseFloat(presionesSistema[0].value), parseFloat(presionesSistema[1].value)];
    let zns = [parseFloat(elevacionesSistema[0].value), parseFloat(elevacionesSistema[1].value)];
    let efici = document.querySelector(".entrada-eficiencia");
    let Qobten = document.querySelector(".entrada-caudal");
    if (Qles == undefined) {
        console.log("Des: " + zns)
        console.log("Resul: " + calculoHaEnSistema (pns[0], zns[0], vds[0], pns[1], zns[1], vds[1], gama, erEneras))
        let resultado = calculoHaEnSistema (pns[0], zns[0], vds[0], pns[1], zns[1], vds[1], gama, erEneras);
        let resPotenci = (resultado*parseFloat(Qobten.value)*gama).toFixed(2);
        campoMostrarResultado.innerHTML = "Ha: " + resultado.toFixed(2) + " m<br>" + "Potencia Bomba: " + resPotenci
        + " wats <br>" + "Potensia Final: " + (resPotenci / (parseFloat(efici.value)/100)).toFixed(2) + " wats";
    }
    console.group("Variables tomadoas de la interfaz");
    console.log("Caudales: " + Qles);
    console.log("Diametros: " + Dms);
    console.log("Presiones: " + pns);
    console.log("Elevaciones: " + zns);
    console.log("Velocidades: " + vds);

    // SE DEBE USAR ESTA FUNSIÓN PARA EL CALCULO DE SISTEMAS DE TUBERIAS
  
})


























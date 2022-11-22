const URL = "http://localhost:3000/cartas"


function imprimirDatos(data){
    data.forEach(carta => {
        document.getElementById("zonaMostrarCartas").innerHTML += 
        `
        <div class="card">
        <img src=${carta.imagenURL}>
        <h2>${carta.nombre}</h2>
        <p><button onclick='modificarCarta(${carta.id})'>Modificar</button><button onclick='borrarCarta(${carta.id})'>Borrar</button></p>
        <div class="ataque">${carta.ataque}</div>
        <div class="vida">${carta.vida}</div>
        </div>
        `
    });
}

function buscarNombre(data, nombreCarta){
    let encontrado = false
    let contador = 0
    

    while(!encontrado && contador < data.length){
        let name = data[contador].nombre
        console.log(name)
        console.log(nombreCarta)
        if(name.toUpperCase() == nombreCarta.toUpperCase()){
            encontrado = true
        }else{
            contador++;
            if(contador == data.length){        
                alert("No se encontró la carta")
            }
        }
    }

    return contador;
}


function getAll(url){
    fetch(url)
        .then(res => res.json())
        .then(data => {
            imprimirDatos(data)
        })
        .catch(e => {
            console.log("Error en el fetch "+e)
        })
}


function getOne(){
    let nombreCarta = document.getElementById("nombreBusqueda").value

    if(nombreCarta != ""){
        fetch(URL)
            .then(res => res.json())
            .then(data =>{
                let numeroCarta = buscarNombre(data, nombreCarta)
                if(numeroCarta < data.length){
                    borrarVisualmente()
                    imprimirDatos([data[numeroCarta]])
                }
                
            })
    }else{
        borrarVisualmente()
        getAll(URL)
    }
    
        
}

function borrarVisualmente(){
    document.getElementById("zonaMostrarCartas").innerHTML = ""
}



getAll(URL)

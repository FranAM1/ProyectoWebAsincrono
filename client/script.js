const URL = "http://localhost:3000/cartas/"


function imprimirDatos(data){
    data.forEach(carta => {
        document.getElementById("zonaMostrarCartas").innerHTML += 
        `
        <div class="card">
        <img src=${carta.imagenURL}>
        <h2>${carta.nombre}</h2>
        <p>Funciones: <button onclick='abrirModificar(${carta.id})'>Modificar</button><button onclick='deleteOne(${carta.id})'>Borrar</button></p>
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



function borrarVisualmente(){
    document.getElementById("zonaMostrarCartas").innerHTML = ""
}



function getAll(){
    fetch(URL)
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

function postCard(){
    let urlImagen = document.getElementById("imagenURL").value
    let nombre = document.getElementById("nombre").value
    let ataque = document.getElementById("ataque").value
    let vida = document.getElementById("vida").value

    carta = {
        imagenURL: urlImagen,
        nombre: nombre,
        ataque: ataque,
        vida: vida
    }

    fetch(URL, {
        method: 'POST',
        body: JSON.stringify(carta),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        }
    })
        .then(res => res.json())
        .then(data => console.log(data))
}

function deleteAll(){
    fetch(URL)
        .then(res => res.json())
        .then(data => {
            data.forEach(e => {
                deleteOne(e.id)
            })
        })

    
}

function deleteOne(id){
    fetch(URL+id, {
        method: 'DELETE'
    })
        .then(res => res.json())
        .then(data => console.log(data))
}

getAll(URL)

function cerrarModificar(){
    document.getElementById("formModificar").className = "ocultar";
    document.getElementById("overlayModificar").className = "ocultar";
}

function abrirModificar(id){
    document.getElementById("formModificar").className = "formularioModificar";
    document.getElementById("overlayModificar").className = "overlay";
    document.getElementById("idModificando").value = id
}


/*

{
    Cartas basica por si se borran con galactus
  {
    "id": 1,
    "imagenURL": "https://i.pinimg.com/474x/26/13/d2/2613d2bf113d294f8dc489e51ebc7179.jpg",
    "nombre": "Miles Morales",
    "ataque": 50,
    "vida": 50
  },
  {
    "id": 2,
    "imagenURL": "https://cdn.discordapp.com/attachments/780806875251343412/1044633025385865286/image.png",
    "nombre": "Venom",
    "ataque": 100,
    "vida": 100
  }
}

*/


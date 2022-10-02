let carrito = [];

function activar(elemento)
{
    let activo = document.querySelector('.active');
    //desactivar
    if (activo != null)
        activo.classList.remove('active');
    elemento.classList.add('active')
    
}

function comprar(elemento){

    if (carrito[elemento.id] != null){
        carrito[elemento.id]["cantidad"] += parseInt(document.getElementById("cantidad" + elemento.id).value);
    }
    else{
        carrito[elemento.id] = [];
        carrito[elemento.id]["nombre"] = document.getElementById("nombre" + elemento.id).textContent;
        carrito[elemento.id]["cantidad"] =  parseInt(document.getElementById("cantidad" + elemento.id).value);
        carrito[elemento.id]["precio"] =  document.getElementById("precio" + elemento.id).textContent;
        
    }

    actualizarCarrito();
}

function actualizarCarrito(){
    let listaProductos = document.getElementById("productos");
    while( listaProductos.firstChild ){
        listaProductos.removeChild( listaProductos.firstChild );
      }

      
      carrito.forEach(crearElemento, listaProductos);
      
      actualizaResumen();
}

function crearElemento(item, index, arr) {
       var li = document.createElement('li');
        li.setAttribute('id', index);

        var div = document.createElement('div');
        div.classList.add("form-inline");

        var div2 = document.createElement('div');
        var texto = document.createTextNode(item["nombre"] + " - " + item["cantidad"] + " - " + item["precio"]);
        div2.appendChild(texto);

        var a = document.createElement('a');
        //a.onclick = borrar;
        a.addEventListener("click", function() { borrar( index);});
        var texto2 = document.createTextNode("\u00a0x");
        a.appendChild(texto2);
        a.setAttribute('href','#');

        div2.appendChild(a);
        div.appendChild(div2);

        li.appendChild(div);

     
      this.appendChild(li);
}


function actualizaResumen(){
    var suma = 0;
    var nproductos = 0;
    for(var producto in carrito) {
        if (producto!=null)
        {
            suma = suma + carrito[producto]["cantidad"]*carrito[producto]["precio"];
            nproductos = nproductos + carrito[producto]["cantidad"];
        }
    }
    document.getElementById("resumen").textContent = nproductos + " productos | " + suma + "€";
}


function borrar(elemento_id){
    delete carrito[elemento_id];
    actualizarCarrito();
}


var xmlHttp;
let productos;

//Código AJAX

    $(document).ready(function(){
        $.getJSON("http://localhost:3000/productos",data=>mostrarProductos(data));
    });

    function GetXmlHttpObject() {
        var objXMLHttp=null;
        if (window.XMLHttpRequest) {
        objXMLHttp=new XMLHttpRequest();
        }
        else if (window.ActiveXObject) {
        objXMLHttp=new ActiveXObject("Microsoft.XMLHTTP");
        }
        return objXMLHttp;
    } 

function mostrarProductos(datos) {
    var catalogo = document.getElementById("catalogo");
    catalogo.innerHTML = "";
    
    for(var i=0;i<datos.length;i++) {
         catalogo.innerHTML += 
         '<div class="col-lg-3 col-md-4 col-sm-6 col-xs-12">'+
         '<article id="articulo'+ datos[i].id + '" style="text-align:center;">'+
         '<img src="' + datos[i].imagen +'" class="img-thumbnail" alt="movil1" width="120px" height="130px">'+ 
         '<div id="nombre'+datos[i].id + '" class="nombre">'+datos[i].nombre+'</div>'+
         '<div id="precio'+datos[i].id + '" class="precio" >'+datos[i].precio +'</div>'+
         '<div class="form-inline center-block">'+
         '<input id="cantidad'+datos[i].id+'" class="form-control w-25 centrado" type="number" value="1" size="1"/>'+
         '<button id="'+datos[i].id+'" type="button" class="btn btn-primary w-50" onclick="comprar(this)">Comprar</button>'+
         '</div>'+
         '</article>'+
         '</div>';      
    }
}
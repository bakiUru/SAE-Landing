const form = document.getElementById('formContacto');
const btnEnviar = document.getElementById('btnEnviar');

//capturamos inputs del form
const inputs = document.querySelectorAll('#formContacto input');

//Objeto de expresiones Regulares
const expresiones = {
    nombreApellido: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, // Letras y espacios, pueden llevar acentos.
    correo: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/
}
//OBJETOS DE VALIDACIONES
const camposOK = {
    nombre: null,
    correo: null,
    msg: null
}


//CONTROL CORREO Y NOMBRE
const controlEnvio_Inputs = (e) => {
    switch (e.target.name) {
        case 'nombreContacto':
            if (!expresiones.nombreApellido.test(e.target.value))
            {
                e.target.classList.add('invalid');
                camposOK.nombre = false;
            }
                
            else {
                camposOK.nombre = true;

            }

            break;
        case 'emailContacto':
            if (!expresiones.correo.test(e.target.value))
            {
                e.target.classList.add('invalid');
                camposOK.correo = false;
            }
            else {
                camposOK.correo = true;

            }

            break;
    }
};

inputs.forEach((input) => {
    input.addEventListener('keyup', controlEnvio_Inputs);
    input.addEventListener('blur', controlEnvio_Inputs);
    input.addEventListener('focus',()=>{
        $('.formularioContacto').css("filter","none");
    });

});
 

//evento SUBMIT
form.addEventListener('submit', (event) => {
    event.preventDefault();

    //CONTROL MENSAJE
    if(document.getElementById('consulContacto').value == '') {
        Swal.fire({
            icon: 'error',
            title: '¡Mensaje Vacío!',
        });
        camposOK.correo = null;
    }else
        camposOK.msg = true;
    
    if (camposOK.nombre && camposOK.correo && camposOK.msg) {
        //SI todo esta OK
        renderAlert();
               //Desactivo boton enviar
               btnEnviar.disabled = true;
               btnEnviar.innerText = "Enviando...";
        setTimeout(() => {
            form.submit();
            enviarMail();
            form.reset();

        }, 3000)
    } else {

        if (document.getElementById('nombreContacto').value == '') {
            Swal.fire({
                icon: 'error',
                title: '¡Nombre Vacío!',
            });
            camposOK.nombre = null;
         } if (camposOK.nombre == false) {
                Swal.fire({
                    icon: 'error',
                    title: '¡Nombre Erroneo!',
                });
            
        } else if (document.getElementById('emailContacto').value == '') {
            Swal.fire({
                icon: 'error',
                title: '¡Correo Vacío!',
            });
            camposOK.correo = null;
        }    if (camposOK.correo == false) {
                Swal.fire({
                    icon: 'error',
                    title: '¡Correo Erroneo!',
                });
                } 
             
        
        }

});


//funcion 
const enviarMail = () => {
    const div = document.querySelector("body");
    $("body").addClass("hidden");
    div.innerHTML = `<div class="contenedor">
    <div class="loadingio-spinner-eclipse-j5pkfeanw9">
        <div class="ldio-q21rjymq5dq">
        <div></div>
        </div></div>
        <h3>Estamos enviando la consulta, Gracias</h3> 
        
    </div>`
    $('.contenedor').fadeIn("slow");
    setTimeout(()=>{
        $('.contenedor').fadeOut("slow");
        $("body").removeClass("hidden");
        window.location = "/" ;

    },2000)
};

//renderizado de datos en sweel alert
function renderAlert() {
    Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: `Enviando Consulta...`,
        showConfirmButton: false,
        timer: 2200
    })


}
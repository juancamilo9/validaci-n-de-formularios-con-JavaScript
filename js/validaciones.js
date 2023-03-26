export function valida(input) {
    const tipoDeInput = input.dataset.tipo;
    if (validadores[tipoDeInput]) {
        validadores[tipoDeInput](input);
    }
    if(input.validity.valid){
        input.parentElement.classList.remove('input-container--invalid');
        input.parentElement.querySelector('.input-message-error').innerHTML = '';
    }else{
        input.parentElement.classList.add('input-container--invalid');
        input.parentElement.querySelector('.input-message-error').innerHTML = mostrarError(tipoDeInput,input)
    }
}

const tipoDeErrores = [
    'valueMissing',
    'typeMismatch',
    'patternMismatch',
    'customError',
]

const mensajesError ={
    nombre:{
        valueMissing:'El campo nombre no puede estar vacío'
    },
    email: {
        valueMissing:'Este campo de correo no puede estar vacío',
        typeMismatch: 'El correo no es valído'
    },
    password: {
        valueMissing:'Este campo contraseña no puede estar vacío',
        patternMismatch: 'Al menos 6 caracteres, máximo 12, debe contener una letra minúscula, una letra mayúscula, un número y no puede contener caracteres especiales.'
    },
    nacimiento:{
        valueMissing:'Este campo no puede estar vacío',
        customError:'debes tener al menos 18 años de edad'
    },
    numero:{
        valueMissing:"Esta campo no puede estar vacío",
        patternMismatch:"Solo se permiten números en este campo"
    },
    direccion:{
        valueMissing:"Este campo no puede estar vacío",
        patternMismatch:"La dirección de residencia debe de tener entre 10 y 40 caracteres"
    },
    ciudad:{
        valueMissing:"Este campo no puede estar vacío",
    },
    estado:{
        valueMissing:"Este campo no puede estar vacío",
    }
}

function mostrarError(tipoDeInput, input) {
    let mensaje='';
    tipoDeErrores.forEach((error)=>{
        if(input.validity[error]){
            mensaje = mensajesError[tipoDeInput][error];
        }
    })
    return mensaje;
}

const validadores = {
    nacimiento: (input) => validarNacimiento(input),
};

function validarNacimiento(input) {
    const fechaCliente = new Date(input.value);
    let mensaje = "";
    if (!mayorDeEdad(fechaCliente)) {
        mensaje = "Debes tener al menos 18 años de edad";
    }

    input.setCustomValidity(mensaje);
}  

function mayorDeEdad(fecha) {
    const fechaActual = new Date();
    const diferenciaFechas = new Date(
        fecha.getUTCFullYear() + 18,
        fecha.getUTCMonth(),
        fecha.getUTCDate()
    );
    return diferenciaFechas <= fechaActual;
}
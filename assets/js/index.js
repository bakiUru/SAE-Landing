$(document).ready(function () {
    $('.sidenav').sidenav();

    $('.parallax').parallax();

    $('btn-flotante').floatingActionButton();
    //Para que cuando el scroll no este activado no muestre el boton
    mostarAnimacion();



});

//animaciones btn flotante
let btnFloating = document.getElementById("btn-flotante");
function mostarAnimacion(){
    //guardo en la variable la cantida de scroll 
    let scrollTop = document.documentElement.scrollTop;
    if (scrollTop < 800 )
    
        btnFloating.style.display = "none";
    else{
        btnFloating.style.display = "block"
    }
        
}



//cuando capture el evento scroll 
window.addEventListener('scroll',mostarAnimacion);

//mensajes en Areas
document.getElementsByClassName('box a1')[0].addEventListener('click', function (event) {
    Swal.fire({
        title: 'Ventajas en Tus Jardines',
        html: ' <div class="modal-content"></div>' +
            ' <h4 style="color: #000000;text-shadow: 2px 2px rgb(255 255 255 / 68%)"><b>.Control en Tiempo de Riego <br>.Control en el Volumen de Agua<br>.Apagado y encendido Automatico<br>.Menos Consumo de Energía</b><b><br>.Ahorro en Costos</b></h4>',
        width: 600,
        padding: '3em',
        color: '#716add',
        background: '#fff url(assets/img/meadow-2184989_1920.jpg',
        backdrop: `
          rgba(0,0,123,0.4)
          left top
          no-repeat
        `
    })

});

document.getElementsByClassName('box a2')[0].addEventListener('click', function (event) {
    Swal.fire({
        title: 'Ventajas en Tus Complejos Deportivos',
        html: ' <div class="modal-content"></div>' +
            ' <h4 style="color: #000000;text-shadow: 2px 2px rgb(255 255 255 / 68%)"><b>.Control de Bombeo <br>.Control en el Volumen de Agua<br>.Apagado y encendido de Bombas<br>.Control de Presión</b><b><br>.Sensores Nivel de Tanque</b></h4>',
        width: 600,
        padding: '3em',
        color: '#716add',
        background: '#fff url(assets/img/meadow-2184989_1920.jpg',
        backdrop: `
                  rgba(0,0,123,0.4)
                  left top
                  no-repeat
                `
    })

});

document.getElementsByClassName('box a3')[0].addEventListener('click', function (event) {
    Swal.fire({
        title: 'Ventajas en Tus Cultivos',
        html: ' <div class="modal-content"></div>' +
            ' <h4 style=" color: #000000;text-shadow: 2px 2px rgb(255 255 255 / 68%)"><b>.Control Humedad Tierra <br>.Control PH del Agua<br>.Apagado y encendido de Bombas<br>.Utilización de Paneles Solares</b><b><br>.Control Tiempo de Riego</b></h4>',
        width: 600,
        padding: '3em',
        color: '#716add',
        background: '#fff url(assets/img/meadow-2184989_1920.jpg',
        backdrop: `
                                  rgba(0,0,123,0.4)
                                `
    })

});

document.getElementsByClassName('box a4')[0].addEventListener('click', function (event) {
    Swal.fire({
        title: 'AutoCultivo Cannabico',
        html: ' <div class="modal-content"></div>' +
            ' <h5 style="color: yellow;text-shadow: 2px 1px rgba(0, 0, 0, 0.14)"><b>¡EN DESARROLLO!</b></h5>',
        width: 600,
        padding: '3em',
        color: '#716add',
        background: '#fff url(assets/img/meadow-2184989_1920.jpg',
        backdrop: `
                  rgba(0,0,123,0.4)
                `
    })

});

//CARRUSEL
let activeIndex = 0
let limit = 0
let disabled = false
let $stage
let $controls
let canvas = false

const SPIN_FORWARD_CLASS = 'js-spin-fwd'
const SPIN_BACKWARD_CLASS = 'js-spin-bwd'
const DISABLE_TRANSITIONS_CLASS = 'js-transitions-disabled'
const SPIN_DUR = 1000

const appendControls = () => {
    for (let i = 0; i < limit; i++) {
        $('.carousel__control').append(`<a href="#" data-index="${i}"></a>`)
    }
    let height = $('.carousel__control').children().last().outerHeight()

    $('.carousel__control').css('height', (30 + (limit * height)))
    $controls = $('.carousel__control').children()
    $controls.eq(activeIndex).addClass('active')
}

const setIndexes = () => {
    $('.spinner').children().each((i, el) => {
        $(el).attr('data-index', i)
        limit++
    })
}

const duplicateSpinner = () => {
    const $el = $('.spinner').parent()
    const html = $('.spinner').parent().html()
    $el.append(html)
    $('.spinner').last().addClass('spinner--right')
    $('.spinner--right').removeClass('spinner--left')
}

const paintFaces = () => {
    $('.spinner__face').each((i, el) => {
        const $el = $(el)
        let color = $(el).attr('data-bg')
        $el.children().css('backgroundImage', `url(${getBase64PixelByColor(color)})`)
    })
}

const getBase64PixelByColor = (hex) => {
    if (!canvas) {
        canvas = document.createElement('canvas')
        canvas.height = 1
        canvas.width = 1
    }
    if (canvas.getContext) {
        const ctx = canvas.getContext('2d')
        ctx.fillStyle = hex
        ctx.fillRect(0, 0, 1, 1)
        return canvas.toDataURL()
    }
    return false
}

const prepareDom = () => {
    setIndexes()
    paintFaces()
    duplicateSpinner()
    appendControls()
}

const spin = (inc = 1) => {
    if (disabled) return
    if (!inc) return
    activeIndex += inc
    disabled = true

    if (activeIndex >= limit) {
        activeIndex = 0
    }

    if (activeIndex < 0) {
        activeIndex = (limit - 1)
    }

    const $activeEls = $('.spinner__face.js-active')
    const $nextEls = $(`.spinner__face[data-index=${activeIndex}]`)
    $nextEls.addClass('js-next')

    if (inc > 0) {
        $stage.addClass(SPIN_FORWARD_CLASS)
    } else {
        $stage.addClass(SPIN_BACKWARD_CLASS)
    }

    $controls.removeClass('active')
    $controls.eq(activeIndex).addClass('active')

    setTimeout(() => {
        spinCallback(inc)
    }, SPIN_DUR, inc)
}

const spinCallback = (inc) => {

    $('.js-active').removeClass('js-active')
    $('.js-next').removeClass('js-next').addClass('js-active')
    $stage
        .addClass(DISABLE_TRANSITIONS_CLASS)
        .removeClass(SPIN_FORWARD_CLASS)
        .removeClass(SPIN_BACKWARD_CLASS)

    $('.js-active').each((i, el) => {
        const $el = $(el)
        $el.prependTo($el.parent())
    })
    setTimeout(() => {
        $stage.removeClass(DISABLE_TRANSITIONS_CLASS)
        disabled = false
    }, 100)

}

const attachListeners = () => {

    document.onkeyup = (e) => {
        switch (e.keyCode) {
            case 38:
                spin(-1)
                break
            case 40:
                spin(1)
                break
        }
    }

    $controls.on('click', (e) => {
        e.preventDefault()
        if (disabled) return
        const $el = $(e.target)
        const toIndex = parseInt($el.attr('data-index'), 10)
        spin(toIndex - activeIndex)

    })
}

const assignEls = () => {
    $stage = $('.carousel__stage')
}

const init = () => {
    assignEls()
    prepareDom()
    attachListeners()
}



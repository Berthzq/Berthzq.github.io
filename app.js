function calcularEdad() {
    // Obtener la fecha de nacimiento desde el input
    const birthdateInput = document.getElementById("birthdate").value;
    
    // Si no se ha seleccionado una fecha, mostrar un mensaje y salir de la función
    if (!birthdateInput) {
        alert("Por favor, selecciona una fecha de nacimiento.");
        return;
    }

    // Convertir la fecha de nacimiento a un objeto Date
    const birthdate = new Date(birthdateInput);
    birthdate.setDate(birthdate.getDate() + 1); // Ajustar un día para evitar problemas con la zona horaria
    
    // Obtener la fecha actual
    const today = new Date();
    
    // Calcular los años de diferencia entre la fecha de nacimiento y la fecha actual
    let age = today.getFullYear() - birthdate.getFullYear();
    const month = today.getMonth(); // Obtener el mes actual
    const day = today.getDate(); // Obtener el día actual

    // Ajustar la edad si aún no ha pasado el cumpleaños de este año
    if (month < birthdate.getMonth() || (month === birthdate.getMonth() && day < birthdate.getDate())) {
        age--;
    }

    // Calcular los meses
    let months = today.getMonth() - birthdate.getMonth();
    if (months < 0) {
        months += 12; // Si el mes es negativo (el cumpleaños aún no ha llegado este año), se ajusta a 12 meses
    }

    // Calcular los días
    let days = today.getDate() - birthdate.getDate();
    if (days < 0) {
        const lastMonth = new Date(today.getFullYear(), today.getMonth(), 0); // Último día del mes anterior
        days += lastMonth.getDate(); // Añadir los días del mes anterior
        months--; // Ajustar el mes
        if (months < 0) {
            months = 11; // Ajustar el mes si es negativo
            age--; // Ajustar la edad si también es necesario
        }
    }

    // Actualizar el contenido del HTML con los resultados de la edad
    document.getElementById("edad").textContent = `${age} años, ${months} meses y ${days} días`;
    
    // Calcular los días vividos desde la fecha de nacimiento
    const timeDifference = today - birthdate;
    const daysLived = Math.floor(timeDifference / (1000 * 60 * 60 * 24)); // Convertir milisegundos a días
    document.getElementById("diasVividos").textContent = `${daysLived} días`;

    // Calcular el próximo cumpleaños
    const nextBirthday = new Date(birthdate);
    nextBirthday.setFullYear(today.getFullYear()); // Establecer el año actual para el próximo cumpleaños

    // Si el cumpleaños ya pasó este año, ajustar para el próximo año
    if (today > nextBirthday) {
        nextBirthday.setFullYear(today.getFullYear() + 1);
    }

    // Calcular los días restantes hasta el próximo cumpleaños
    const timeUntilNextBirthday = nextBirthday - today;
    const daysUntilNextBirthday = Math.floor(timeUntilNextBirthday / (1000 * 60 * 60 * 24)); // Convertir milisegundos a días
    document.getElementById("proximoCumple").textContent = `Faltan ${daysUntilNextBirthday} días`;

    // Determinar la generación aproximada según el año de nacimiento
    const generation = (birthdate.getFullYear() >= 1946 && birthdate.getFullYear() <= 1964) ? 'Baby Boomers' :
                       (birthdate.getFullYear() >= 1965 && birthdate.getFullYear() <= 1979) ? 'Generación X' :
                       (birthdate.getFullYear() >= 1980 && birthdate.getFullYear() <= 1996) ? 'Millennials' :
                       (birthdate.getFullYear() >= 1997 && birthdate.getFullYear() <= 2012) ? 'Generación Z' :
                       (birthdate.getFullYear() >= 2013) ? 'Generación Alpha' : 
                       'Desconocida'; // En caso de una fecha fuera del rango

    // Definir los signos zodiacales y sus fechas de inicio y fin
    const zodiacSigns = [
        { name: 'Aries', start: [3, 21], end: [4, 19] },
        { name: 'Tauro', start: [4, 20], end: [5, 20] },
        { name: 'Géminis', start: [5, 21], end: [6, 20] },
        { name: 'Cáncer', start: [6, 21], end: [7, 22] },
        { name: 'Leo', start: [7, 23], end: [8, 22] },
        { name: 'Virgo', start: [8, 23], end: [9, 22] },
        { name: 'Libra', start: [9, 23], end: [10, 22] },
        { name: 'Escorpio', start: [10, 23], end: [11, 21] },
        { name: 'Sagitario', start: [11, 22], end: [12, 21] },
        { name: 'Capricornio', start: [12, 22], end: [1, 19] },
        { name: 'Acuario', start: [1, 20], end: [2, 18] },
        { name: 'Piscis', start: [2, 19], end: [3, 20] }
    ];

    // Determinar el signo zodiacal según el mes y día de nacimiento
    let zodiacSign = '';
    const birthMonth = birthdate.getMonth() + 1; // Los meses comienzan desde 0
    const birthDay = birthdate.getDate();

    for (let i = 0; i < zodiacSigns.length; i++) {
        const sign = zodiacSigns[i];
        if ((birthMonth === sign.start[0] && birthDay >= sign.start[1]) || 
            (birthMonth === sign.end[0] && birthDay <= sign.end[1]) ||
            (birthMonth > sign.start[0] && birthMonth < sign.end[0])) {
            zodiacSign = sign.name;
            break;
        }
    }

    // Obtener el día de la semana de la fecha de nacimiento
    const options = { weekday: 'long' }; // Obtener el nombre completo del día (e.g., "Lunes")
    const diaNacimiento = birthdate.toLocaleDateString('es-ES', options).replace(/^([a-záéíóú])/i, (match) => match.toUpperCase());

    // Actualizar el HTML con los resultados calculados
    document.getElementById("diaNacimiento").textContent = diaNacimiento;  // Mostrar solo el día
    document.getElementById("generacion").textContent = `${generation}`;
    document.getElementById("signoZodiacal").textContent = `${zodiacSign}`;
    
    // Definir las imágenes correspondientes a cada signo zodiacal
    const zodiacImages = {
        Aries: "images/aries.png",
        Tauro: "images/tauro.png",
        Géminis: "images/geminis.png",
        Cáncer: "images/cancer.png",
        Leo: "images/leo.png",
        Virgo: "images/virgo.png",
        Libra: "images/libra.png",
        Escorpio: "images/escorpio.png",
        Sagitario: "images/sagitario.png",
        Capricornio: "images/capricornio.png",
        Acuario: "images/acuario.png",
        Piscis: "images/piscis.png"
    };
    
    // Mostrar la imagen correspondiente al signo zodiacal
    const zodiacImageElement = document.getElementById("zodiacImage");
    zodiacImageElement.src = zodiacImages[zodiacSign] || ''; // Establecer la imagen según el signo

    // Reducir el tamaño de la imagen al 25% de su tamaño original
    zodiacImageElement.onload = function() {
        const width = zodiacImageElement.naturalWidth * 0.23;  // Reducir al 25% del tamaño original
        const height = zodiacImageElement.naturalHeight * 0.23;
        
        zodiacImageElement.width = width;
        zodiacImageElement.height = height;

        // Centrar la imagen en la página
        zodiacImageElement.style.display = 'block';  // Mostrar la imagen como bloque
        zodiacImageElement.style.margin = '0 auto';  // Centrarla horizontalmente
    };
}

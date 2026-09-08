## Reflexión sobre el desarrollo del sitio web Artisan Crust

### 1. ¿Qué partes del diseño de Stitch logró implementar?

Logré implementar las principales secciones propuestas en el diseño de Stitch.

### 2. ¿Qué cambios realizó y por qué?

Realicé algunos cambios al diseño original para mejorar la organización y la adaptación del sitio a diferentes tamaños de pantalla. Por ejemplo, organicé los productos utilizando CSS Grid para que puedan mostrarse en tres columnas en pantallas grandes, dos columnas en ciertos tamaños de tableta y una sola columna en teléfonos.

También agregué un menú desplegable para dispositivos móviles, ya que mantener todos los enlaces del menú visibles podía provocar problemas de espacio en pantallas pequeñas. Además, ajusté tamaños de imágenes, textos, espacios internos y márgenes para evitar desbordamientos y mejorar la lectura.

Otro cambio fue incluir información adicional en el pie de página sobre las fuentes de las imágenes utilizadas, con el objetivo de dar referencia a los recursos externos utilizados en el proyecto.

### 3. ¿Qué etiquetas semánticas utilizó?

Utilicé `<header>`,`<nav>`, `<main>`, `<section>`, `<article>`, `<footer>`, `<address>`,`<h2>` y `<h3>`.

### 4. ¿Qué medidas de accesibilidad incorporó?

Se incorporaron diferentes medidas de accesibilidad. La etiqueta `<html>` utiliza el atributo `lang="es"` para indicar que el idioma principal de la página es español.

Todas las imágenes incluyen el atributo `alt` con una descripción de su contenido. En el formulario, cada campo posee una etiqueta `<label>` asociada mediante los atributos `for` e `id`, y también se utilizan campos obligatorios mediante el atributo `required`. Adicionalmente, se agregó un mensaje que indica que los campos marcados con un asterisco son obligatorios.

También se implementaron estilos mediante `:focus-visible` para que los enlaces, botones y campos puedan mostrar claramente cuándo tienen el foco durante la navegación con teclado.

### 5. ¿Qué cambios se producen mediante las media queries?

Las media queries permiten que el sitio cambie su distribución dependiendo del tamaño de la pantalla.

Para pantallas menores a `56.25rem`, la cuadrícula de productos cambia de tres columnas a dos columnas. Además, la sección de contacto pasa de dos columnas a una sola y los elementos del pie de página se acomodan verticalmente.

En pantallas menores a `48rem`, aparece el botón del menú móvil y el menú de navegación normal se oculta. Cuando el menú está activo, los enlaces se muestran de manera vertical. En este tamaño también la sección de productos cambia a una sola columna, se reducen algunos espacios y se modifican tamaños de texto e imágenes.

Finalmente, para pantallas menores a `30rem`, se realizan ajustes adicionales para teléfonos pequeños, como reducir el tamaño del logotipo, el título principal, las imágenes, los espacios internos de las tarjetas y del formulario. También se cambia la distribución de algunos enlaces del pie de página para que se presenten verticalmente.

### 6. ¿Cuál fue la principal dificultad encontrada?

La principal dificultad fue lograr que el mismo diseño se adaptara correctamente a diferentes tamaños de pantalla sin que los elementos se desbordaran o perdieran su organización.

Especialmente fue necesario ajustar la cuadrícula de productos, la sección de contacto y el menú de navegación para dispositivos móviles. Esto implicó probar diferentes tamaños y utilizar media queries para cambiar la distribución, los espacios y algunos tamaños de los elementos.

Este proceso me ayudó a comprender mejor cómo funcionan las unidades relativas, Flexbox, CSS Grid y las media queries para desarrollar una página que pueda utilizarse tanto en computadora como en tableta y teléfono.

### 7. Uso de Inteligencia Artificial

Durante el desarrollo del proyecto se utilizó ChatGPT, como herramienta de apoyo.

La Inteligencia Artificial fue utilizada principalmente para:

Revisar la estructura del código HTML.
Identificar errores y aspectos que podían mejorarse.
Revisar el cumplimiento de los requisitos de HTML5 y CSS3.
Apoyar en la adaptación del diseño para dispositivos móviles, tablets y computadoras.
Ayudar a corregir el funcionamiento del menú de navegación en dispositivos pequeños mediante JavaScript.
Verificar aspectos básicos de accesibilidad, como textos alternativos en imágenes, etiquetas de formularios y navegación.
Sugerir mejoras en la organización y estructura del código.
Revisar el proyecto en relación con los requisitos establecidos para la tarea.

La IA fue utilizada como herramienta de apoyo y revisión.
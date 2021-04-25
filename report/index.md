# DSI 2021: Práctica 6 - Clases e interfaces genéricas. Principios SOLID (prct06-generics-solid)

## Introducción

El objetivo de esta práctica es familiarizarse con las clases e interfaces genéricas, además de con los [principios de diseño SOLID [1]](https://samueleresca.net/solid-principles-using-typescript/).

Para ello se pide resolver tres ejercicios que requerirán el uso de dichos tipos de datos. Además, se deberá documentar el código y usar la metodología TDD de desarrollo, por lo que se han de escribir purebas unitarias para comprobar el correcto funcionamiento del código. También se pide hacer uso de las herramientas Istanbul y Coveralls para analizar el porcentaje de código que cubre dichas pruebas

Este informe se ha desarrollado en base al contenido de la [guía de la práctica [2]](https://ull-esit-inf-dsi-2021.github.io/prct06-generics-solid/) en Github.

## Objetivos

- Realizar los ejemplos propuestos para familiarizarse con las clases e interfaces genéricas, y con los principios de diseño SOLID.
- Familiarizarse con el uso de la herramienta de comprobación de cubrimiento de código Istambul y Coveralls

## Desarrollo

### Prerrequisitos: Instalación y configuración de Istanbul y Coveralls

Antes de iniciar la práctica es conveniente instalar [Istanbul [3]](https://istanbul.js.org) y [Coveralls [4]](https://coveralls.io).

Para ello usaremos el siguiente comando para añadirlas como dependencias de desarrollo a nuestro proyecto:

```bash
npm install --save-dev nyc coveralls
```

Para usar Istambul podemos hacerlo directamente con el comando

```bash
nyc mocha
```

Y tars ejecutarlo nos mostrará por línea de comandos una tabla resumen con el porcentaje de cubrición de cada archivo y/o las líneas de código que no están siendo probadas.

![Antes](/docs/antes.png)

En este ejemplo podemos ver que hay un fichero en el que so se están probando todas las líneas. Si añadimos un par de tests al fichero de pruebas y volvemos a ejecutar Istanbul, vemos que se ha corregido:

![Después](/docs/despues.png)

Para poder usar Coveralls deberemos iniciar sesión en Coveralls con nuestro usuario de Github, seleccionar el repositorio que queremos monitorizar y copiar el idendificador que nos proporciona la página en un fichero `.coveralls.yml`

Tras ello, añadimos en el fichero `package.json` la siguiente línea en el apartado `scripts`:

```json
"coverage": "nyc npm test && nyc report --reporter=text-lcov | coveralls && rm -rf .nyc_output"
```
Y ejecutando `npm coverage` se lanzará la prueba para comprobar el porcentaje de cubrición del código.

En este caso al ser un repositorio privado perteneciente a ULL-ESIT-INF-DSI-2021 Coveralls no permite obtener el porcentaje de cubrición del código, pero este sería el procedimiento para obtenerlo.

### Ejercicio 2

En este ejercicio se pide:

```

Considere una herramienta que nos permita realizar las conversiones de unidades o sistemas de medición 
para distintas magnitudes físicas. Las más comunes pueden ser:

- Velocidad
- Masa
- Longitud
- Tiempo
- Temperatura
- Fuerza
- Volumen

Diseñe una interfaz genérica `isConvertible` que permita realizar conversiones entre sistemas para cada
magnitud considerada. La interfaz debe definirse de modo que, aquellas clases que la implementen, ofrezcan
la posibilidad de hacer cambios entre, al menos, dos sistemas o unidades diferentes como, por ejemplo, en 
el caso de la velocidad, de millas por horas a kilómetros por hora. 

A continuación, diseñe diferentes clases, una por magnitud física, que implementen dicha interfaz. 
El desarrollo propuesto deberá incluir las siguientes funcionalidades:

- Una clase para cada magnitud considerada.
- Se pide ser capaz de poder cambiar, al menos, entre dos unidades o sistemas de medición por cada magnitud.
- El software deberá seguir los principios SOLID Single Responsability and Open-Closed.
```

Para ello se ha implementado la interfaz genérica `isConvertible` de manera que sólo contenga la variable par clave-valor donde se almacenarán los factores de conversión y la función genérica de conversión, que será implementada después por cada magnitud:

```typescript
export interface isConvertible<T> {
    factores: {[key: string]: number};
    convert(input:T, output:string):T;
}
```

Se han implementado también tres magnitudes: *Masa*, *Velocidad* y *Temperatura*; cada una de las cuales implementa una función `convert()` diferente:

En el caso de la magnitud **Masa** el código desarrollado es:

```typescript
export class Masa implements isConvertible<{unidad:string, valor:number}>{

    factores: {[key:string]: number};

    constructor(){ this.factores = { tn: 1000, kg: 1, lb: 0.454, oz: 0.02834, g: 0.001 } }

    convert(input:{unidad:string, valor:number}, output:string): {unidad:string, valor:number}{
        return {unidad: output, valor: this.factores[input.unidad].valueOf() * input.valor.valueOf() / this.factores[output].valueOf()};
    }
}
```

Esta función permite convertir entre toneladas métricas, Kilogramos, libras, onzas y gramos. Los factores de conversión se han establecido en base al SI (kg), y para cada unidad se almacena su equivalencia en kg.

La función de conversión es la siguiente:

```
Factor de conversión unidad de entrada * Cantidad a convertir / Factor conversión unidad de salida
```


En el caso de la magnitud **Velocidad** el código desarrollado es:

```typescript
export class Velocidad implements isConvertible<{unidad:string, valor:number}>{

    factores: {[key:string]: number};

    constructor(){ this.factores = { mps: 1, kph: 3.6, mph: 2.2369, kn: 1.94384 } }

    convert(input:{unidad:string, valor:number}, output:string): {unidad:string, valor:number}{
        return {unidad: output, valor: input.valor.valueOf() / this.factores[input.unidad].valueOf() * this.factores[output].valueOf()};
    }

}
```

Esta función permite convertir entre metros por segundo, kilómetros por hora, millas por hora y nudos náuticos. Los factores de conversión se han establecido en base al SI (m/s), y para cada unidad se almacena su equivalencia en m/s. Por ello ha sido necesario modificar la fórmula de cálculo de la conversión de forma que queda:

```
Cantidad a convertir / Factor de conversión unidad de entrada * Factor conversión unidad de salida
```

Finalmente, en el caso de la magnitud **Temperatura** el código desarrollado es:

```typescript
export class Temperatura implements isConvertible<{unidad:string, valor:number}>{

    factores: {[key:string]: number};

    constructor(){this.factores = { celsius: 1, farenheit: 2, kelvin: 3,}}

    convert(input:{unidad:string, valor:number}, output:string): {unidad:string, valor:number}{
        
        let valor_: number;
        
        if (input.unidad == "celsius"){
            if (output == "farenheit")
                valor_ = input.valor.valueOf()*(9/5)+32;
            else if (output == "kelvin")
                valor_ = input.valor.valueOf()+273.15;
        }
        else if (input.unidad == "farenheit"){
            if (output == "celsius")
                valor_ = (input.valor.valueOf()-32)*(5/9);
            else if (output == "kelvin")
                valor_ = (input.valor.valueOf()-32)*(5/9)+273.15;
        }
        
        else if (input.unidad == "kelvin"){
            if (output == "farenheit")
                valor_ = (input.valor.valueOf()-273.15)*(9/5)+32;
            else if (output == "celsius")
                valor_ = input.valor.valueOf()-273.15;
        }
        return {unidad: output, valor: valor_};
    }
}

```

Esta función permite convertir entre grados Celsius, grados Farenheit y Kelvin. Puesto que no se puede convertir directamente con factores ha sido necesario implementar manualmente las conversiones para cada par de unidades "entrada-salida".

Las pruebas TDD implementadas con Mocha para comprobar el funcionamiento son:

```typescript
describe('Pruebas E2 - Masa', () => {
    let M = new Masa(); 
    it("Conversión g a kg", () => {
        expect(M.convert({unidad: "g", valor: 200}, "kg").unidad).to.be.equal("kg");
        expect(M.convert({unidad: "g", valor: 200}, "kg").valor).to.be.equal(0.2);
    });
    it("Conversión tn a kg", () => {
        expect(M.convert({unidad: "tn", valor: 0.3}, "kg").unidad).to.be.equal("kg");
        expect(M.convert({unidad: "tn", valor: 0.3}, "kg").valor).to.be.equal(300);
    });
    it("Conversión tn a lb", () => {
        expect(M.convert({unidad: "tn", valor: 0.3}, "lb").unidad).to.be.equal("lb");
        expect(M.convert({unidad: "tn", valor: 0.3}, "lb").valor.toFixed(2)).to.be.equal("660.79");
    });

});

describe('Pruebas E2 - Velocidad', () => {
    let M = new Velocidad(); 
    it("Conversión m/s a km/h", () => {
        expect(M.convert({unidad: "mph", valor: 100}, "kph").unidad).to.be.equal("kph");
        expect(M.convert({unidad: "mph", valor: 100}, "kph").valor.toFixed(2)).to.be.equal("160.94");
    });
    it("Conversión km/h a mph", () => {
        expect(M.convert({unidad: "kph", valor: 120}, "mph").unidad).to.be.equal("mph");
        expect(M.convert({unidad: "kph", valor: 120}, "mph").valor.toFixed(2)).to.be.equal("74.56");
    });
    it("Conversión kn a kph", () => {
        expect(M.convert({unidad: "kn", valor: 29.5}, "kph").unidad).to.be.equal("kph");
        expect(M.convert({unidad: "kn", valor: 29.5}, "kph").valor.toFixed(2)).to.be.equal("54.63");
    });

});

describe('Pruebas E2 - Temperatura', () => {
    let M = new Temperatura(); 
    it("Conversión ºC a ºF", () => {
        expect(M.convert({unidad: "celsius", valor: 100}, "farenheit").unidad).to.be.equal("farenheit");
        expect(M.convert({unidad: "celsius", valor: 100}, "farenheit").valor.toFixed(2)).to.be.equal("212.00");
    });
    it("Conversión K a ºF", () => {
        expect(M.convert({unidad: "kelvin", valor: 120}, "farenheit").unidad).to.be.equal("farenheit");
        expect(M.convert({unidad: "kelvin", valor: 120}, "farenheit").valor.toFixed(2)).to.be.equal("-243.67");
    });
    it("Conversión ºC a K", () => {
        expect(M.convert({unidad: "celsius", valor: 29.5}, "kelvin").unidad).to.be.equal("kelvin");
        expect(M.convert({unidad: "celsius", valor: 29.5}, "kelvin").valor.toFixed(2)).to.be.equal("302.65");
    });
    it("Conversión ºF a K", () => {
        expect(M.convert({unidad: "farenheit", valor: 32}, "kelvin").unidad).to.be.equal("kelvin");
        expect(M.convert({unidad: "farenheit", valor: 32}, "kelvin").valor.toFixed(2)).to.be.equal("273.15");
    });
    it("Conversión ºF a ºC", () => {
        expect(M.convert({unidad: "farenheit", valor: 32}, "celsius").unidad).to.be.equal("celsius");
        expect(M.convert({unidad: "farenheit", valor: 32}, "celsius").valor.toFixed(2)).to.be.equal("0.00");
    });
    it("Conversión K a ºC", () => {
        expect(M.convert({unidad: "kelvin", valor: 295}, "celsius").unidad).to.be.equal("celsius");
        expect(M.convert({unidad: "kelvin", valor: 295}, "celsius").valor.toFixed(2)).to.be.equal("21.85");
    });

});
```

Se puede comprobar que dichas pruebas cubren por completo el código:

![Pruebas Istanbul](/docs/istanbul.png)

## Conclusiones

Esta práctica sirve de familiarización con las interfaces y clases genéricas en Typescript, el análogo a las plantillas de clase de C++ vistas en asignaturas anteriores. Por desgracia por motivos personales no me ha sido posible realizar el resto de ejercicios.

También ha sido necesaria el uso de Istanbul y Coveralls para comprobar que los test están probando realmente todo el código escrito, y en ese sentido son extremadamente útiles puesto que muestran de manera clara qué código no se está comprobando.

## Referencias

[1] Principios de diseño SOLID [https://samueleresca.net/solid-principles-using-typescript/](https://samueleresca.net/solid-principles-using-typescript/)
[2] Guión de la práctica -  [https://ull-esit-inf-dsi-2021.github.io/prct06-generics-solid/](https://ull-esit-inf-dsi-2021.github.io/prct06-generics-solid/)
[3] Istanbul - [https://istanbul.js.org](https://istanbul.js.org)
[4] Coveralls - [https://coveralls.io](https://coveralls.io)
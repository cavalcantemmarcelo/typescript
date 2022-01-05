/*
 * declaração que pode ser anexada numa classe ou ação
 * tem a função de fazer anotações
 * trabalha com tipo diferentes
 * recebe parâmetros obrigatórios para iniciar
 * tipos decorator: Class, Property, Method, Parameter, Acessor
 */


// Factory
function log(prefix: string) {
    return (target) => {
        console.log(`prefix: ${prefix}, target: ${target}`)
    }
}

@log('decorator')
class Foo {}

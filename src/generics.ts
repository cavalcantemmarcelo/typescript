function identity <T, M>(value: T, message: M) : T {
    return value;
}

console.log(identity(34, 'valor inicial'));
console.log(identity('teste', 34));

identity<Number, string>(42, 'teste');

interface GenericInterface<U> {
    value: U
    getIdentity: () =>  U
}



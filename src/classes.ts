class UserAccount {

    id: number;
    readonly name: string;

    constructor(id: number, name: string){
        this.id = id;
        this.name = name;
    }

    logUser(): void {
        console.log(`O usuário ${this.name} recebeu o identificador ${this.id}`);
    }

}

const u1 = new UserAccount( 1, "Fulano");
u1.logUser();

const u2 = new UserAccount(2, "João");
u2.logUser()

import bcrypt from 'bcrypt';

export class Password{
    private static saltRounds: number = 1;

    public static async compare(hash: string, enteredPassword: string): Promise<boolean>{
        let result  = await bcrypt.compare(enteredPassword, hash);

        return result;
    }

    public static async hash(enteredPassword: string){
        let hash = await bcrypt.hash(enteredPassword, this.saltRounds);

        return hash;
    }
}
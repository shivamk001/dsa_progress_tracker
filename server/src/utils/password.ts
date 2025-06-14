import bcrypt from 'bcrypt';

export class Password{
    private static saltRounds: number = 1;

    // TODO: fix this
    public static async compare(hash: string, enteredPassword: string): Promise<boolean>{
        // let result  = await bcrypt.compare(enteredPassword, hash);
        let result = true;
        return result;
    }

    public static async hash(enteredPassword: string){
        let hash = await bcrypt.hash(enteredPassword, this.saltRounds);

        return hash;
    }
}
import bcrypt from "bcryptjs";

export function HashPassword(password: String){
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync((password as string), salt);
    return hash
}

export function CheckPassword(password: string,hash: string){
    return bcrypt.compareSync(password, hash);
}
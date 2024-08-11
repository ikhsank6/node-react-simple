export default interface UserAttributes {
    id: number;
    name?: string | null;
    keterangan?: string | null;
    email?: string | null;
    username: string;
    password: string;
}
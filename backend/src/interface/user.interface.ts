export default interface UserAttributes {
    id: number;
    name?: string | null;
    keterangan?: string | null;
    username: string;
    password: string;
}
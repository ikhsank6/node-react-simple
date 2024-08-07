import Meta from "./meta.interface";

export default interface ApiResponse {
    meta: Meta;
    data?: any;
}
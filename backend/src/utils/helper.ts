export const mappingErrors = (errors: Array<any>) => {
    return errors.map(error => error.msg).join(', ');
}
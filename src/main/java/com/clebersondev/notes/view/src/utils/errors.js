export const findErrorFactory = (errors) => ( 
    (field) => errors && errors.find(err => field === err.field)
);

export const errorMessages = {
    duplicate: 'Já existente, insira outro',
    empty: 'Campo obrigatório. Insira um valor'
};

type validadeTodoDescriptionProps= {
    success: boolean,
    errors: string[]
}

export function validadeTodoDescription(description: string): validadeTodoDescriptionProps {
const errors = [];

if(description.length <= 3) {
errors.push('Descrição precisa ter mais de 3 caracteres')
}


return {
    success: errors.length === 0,
    errors,
}
}
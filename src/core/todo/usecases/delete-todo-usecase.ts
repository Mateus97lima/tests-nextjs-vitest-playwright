
import { sanitizeStr } from "@/utils/sanitize-str";
import { todoRepository } from "../repositories/default.repository";

export async function deleteTodoUseCase(id: string) {
    const clearId = sanitizeStr(id);

    if(!clearId) {
        return {
            success:false,
            errors: ['ID inválido']
        }
    }

    const deleteResult = await todoRepository.remove(id)

    return deleteResult

}
export function sanitizeStr (s: string) { // checar o tipo //
const clean = !s || typeof s !== 'string' ? '' : s.trim().normalize();

return clean;
}


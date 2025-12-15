import { sanitizeStr } from "./sanitize-str";

describe('sanitezeStr (unit)', () => { 

test('retorna uma string vazia quando receber um valor false', () => {

   // @ts-expect-error testado o retorno do teste
expect(sanitizeStr()).toBe(' ');
});

test('retorna uma string vazia quando receber um valor que não e uma string', () => {

   // @ts-expect-error testado o retorno do teste
expect(sanitizeStr(123)).toBe('');
});

test('retorna uma string quando receber um valor que e uma string', () => {


expect(sanitizeStr(' ola ')).toBe('ola');
});

test('garanta que a string é normalizada com nfc', () => {
    const original ='e\u0301';
    const expected = 'é'

expect(expected).toBe(sanitizeStr(original));
})

});
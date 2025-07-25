/**
 * CNPJ Alfanumérico Validator Library
 * Versão única em JavaScript para inclusão via <script>
 * @version 1.0.0
 * @author https://github.com/viniciusvams
 * @license MIT
 */

(function(global) {
    'use strict';

    const Utils = {
        onlyNumbers: (str) => str.replace(/\D/g, ''),
        clean: (str, pattern) => str.replace(pattern, ''),
        allSameDigits: (str) => /^(\d)\1+$/.test(str),
        randomInt: (min, max) => Math.floor(Math.random() * (max - min + 1)) + min
    };

    const CPF = {
        validate(cpf) {
            if (!cpf) return false;
            const cleanCPF = Utils.onlyNumbers(cpf);
            if (cleanCPF.length !== 11 || Utils.allSameDigits(cleanCPF)) return false;
            let soma = 0;
            for (let i = 0; i < 9; i++) soma += parseInt(cleanCPF.charAt(i)) * (10 - i);
            let dv1 = (soma * 10) % 11;
            if (dv1 === 10) dv1 = 0;
            if (dv1 !== parseInt(cleanCPF.charAt(9))) return false;
            soma = 0;
            for (let i = 0; i < 10; i++) soma += parseInt(cleanCPF.charAt(i)) * (11 - i);
            let dv2 = (soma * 10) % 11;
            if (dv2 === 10) dv2 = 0;
            return dv2 === parseInt(cleanCPF.charAt(10));
        },

        generate(options = { formatted: true }) {
            const numbers = [];
            for (let i = 0; i < 9; i++) numbers.push(Utils.randomInt(0, 9));
            let soma = numbers.reduce((acc, num, i) => acc + num * (10 - i), 0);
            let dv1 = (soma * 10) % 11;
            if (dv1 === 10) dv1 = 0;
            numbers.push(dv1);
            soma = numbers.reduce((acc, num, i) => acc + num * (11 - i), 0);
            let dv2 = (soma * 10) % 11;
            if (dv2 === 10) dv2 = 0;
            numbers.push(dv2);
            const cpf = numbers.join('');
            return options.formatted ? this.format(cpf) : cpf;
        },

        format(cpf) {
            const cleanCPF = Utils.onlyNumbers(cpf);
            return cleanCPF.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
        },

        clean(cpf) {
            return Utils.onlyNumbers(cpf);
        }
    };

    const CNPJ = {
        validate(cnpj) {
            if (!cnpj) return false;
            const cleanCNPJ = Utils.onlyNumbers(cnpj);
            if (cleanCNPJ.length !== 14 || Utils.allSameDigits(cleanCNPJ)) return false;
            let tamanho = 12;
            let numeros = cleanCNPJ.substring(0, tamanho);
            let digitos = cleanCNPJ.substring(tamanho);
            let soma = 0;
            let pos = tamanho - 7;
            for (let i = tamanho; i >= 1; i--) {
                soma += parseInt(numeros.charAt(tamanho - i)) * pos--;
                if (pos < 2) pos = 9;
            }
            let dv1 = soma % 11 < 2 ? 0 : 11 - soma % 11;
            if (dv1 !== parseInt(digitos.charAt(0))) return false;
            tamanho++;
            numeros = cleanCNPJ.substring(0, tamanho);
            soma = 0;
            pos = tamanho - 7;
            for (let i = tamanho; i >= 1; i--) {
                soma += parseInt(numeros.charAt(tamanho - i)) * pos--;
                if (pos < 2) pos = 9;
            }
            let dv2 = soma % 11 < 2 ? 0 : 11 - soma % 11;
            return dv2 === parseInt(digitos.charAt(1));
        },

        generate(options = { formatted: true }) {
            const numbers = [];
            for (let i = 0; i < 12; i++) numbers.push(Utils.randomInt(0, 9));
            let soma = 0;
            let pos = 5;
            for (let i = 0; i < 12; i++) {
                soma += numbers[i] * pos--;
                if (pos < 2) pos = 9;
            }
            let dv1 = soma % 11 < 2 ? 0 : 11 - soma % 11;
            numbers.push(dv1);
            soma = 0;
            pos = 6;
            for (let i = 0; i < 13; i++) {
                soma += numbers[i] * pos--;
                if (pos < 2) pos = 9;
            }
            let dv2 = soma % 11 < 2 ? 0 : 11 - soma % 11;
            numbers.push(dv2);
            const cnpj = numbers.join('');
            return options.formatted ? this.format(cnpj) : cnpj;
        },

        format(cnpj) {
            const cleanCNPJ = Utils.onlyNumbers(cnpj);
            return cleanCNPJ.replace(/^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})$/, '$1.$2.$3/$4-$5');
        },

        clean(cnpj) {
            return Utils.onlyNumbers(cnpj);
        }
    };

    const CNPJAlpha = {
        _charToValue(char) {
            return char.charCodeAt(0) - 48;
        },

        _calculateDigits(base) {
            const valores = base.split('').map(this._charToValue);
            const pesos1 = [5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
            let soma1 = valores.reduce((acc, val, i) => acc + val * pesos1[i], 0);
            let resto1 = soma1 % 11;
            let dv1 = (resto1 === 0 || resto1 === 1) ? 0 : 11 - resto1;
            valores.push(dv1);
            const pesos2 = [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
            let soma2 = valores.reduce((acc, val, i) => acc + val * pesos2[i], 0);
            let resto2 = soma2 % 11;
            let dv2 = (resto2 === 0 || resto2 === 1) ? 0 : 11 - resto2;
            return `${dv1}${dv2}`;
        },

        validate(cnpj) {
            if (!cnpj) return false;
            const cleanCNPJ = Utils.clean(cnpj, /[^\w]/g).toUpperCase();
            if (!/^[A-Z0-9]{12}\d{2}$/.test(cleanCNPJ)) return false;
            const base = cleanCNPJ.slice(0, 12);
            const digits = cleanCNPJ.slice(12, 14);
            const calculatedDigits = this._calculateDigits(base);
            return digits === calculatedDigits;
        },

        generate(options = { formatted: true }) {
            const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
            const chars = [];
            for (let i = 0; i < 12; i++) {
                chars.push(Math.random() < 0.5
                    ? letters.charAt(Utils.randomInt(0, 25))
                    : Utils.randomInt(0, 9).toString()
                );
            }
            const base = chars.join('');
            const digits = this._calculateDigits(base);
            const cnpj = base + digits;
            return options.formatted ? this.format(cnpj) : cnpj;
        },

        format(cnpj) {
            const cleanCNPJ = Utils.clean(cnpj, /[^\w]/g).toUpperCase();
            return cleanCNPJ.replace(/^(.{2})(.{3})(.{3})(.{4})(.{2})$/, '$1.$2.$3/$4-$5');
        },

        clean(cnpj) {
            return Utils.clean(cnpj, /[^\w]/g).toUpperCase();
        }
    };

    global.CNPJValidator = { CPF, CNPJNumerico: CNPJ, CNPJAlfanumerico: CNPJAlpha, Utils };

})(typeof window !== 'undefined' ? window : globalThis);

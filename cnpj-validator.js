/**
 * Validação de CNPJ Alfanumérico
 * Biblioteca JavaScript especializada em CNPJ alfanumérico, com suporte completo para CNPJ numérico e CPF
 * @version 1.0.0
 * @author https://github.com/viniciusvams
 * @license MIT
 */

(function (global, factory) {
  if (typeof exports === 'object' && typeof module !== 'undefined') {
    // Para uso com Node.js (CommonJS)
    module.exports = factory();
  } else if (typeof define === 'function' && define.amd) {
    // Para uso com AMD (RequireJS)
    define(factory);
  } else {
    // Para uso direto no navegador
    global.CNPJValidator = factory();
  }
}(typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : this, function () {
  'use strict';

  /**
   * 🛠️ UTILITÁRIOS GERAIS
   * Funções auxiliares que ajudam na manipulação de strings e números
   */
  const UtilitariosGerais = {
    
    /**
     * Limpa uma string deixando apenas números
     * Exemplo: "123.456.789-01" vira "12345678901"
     */
    apenasNumeros: function(texto) {
      if (!texto) return '';
      return texto.replace(/\D/g, '');
    },

    /**
     * Remove caracteres especiais usando um padrão personalizado
     * Útil para limpeza mais específica de documentos
     */
    limparComPadrao: function(texto, padrao) {
      if (!texto) return '';
      return texto.replace(padrao, '');
    },

    /**
     * Verifica se todos os dígitos de uma string são iguais
     * Exemplo: "111111111" retorna true, "123456789" retorna false
     */
    todosDigitosIguais: function(texto) {
      if (!texto) return false;
      return /^(\d)\1+$/.test(texto);
    },

    /**
     * Gera um número aleatório entre o mínimo e máximo (inclusivo)
     * Usado para gerar dígitos aleatórios nos documentos
     */
    numeroAleatorio: function(minimo, maximo) {
      return Math.floor(Math.random() * (maximo - minimo + 1)) + minimo;
    },

    /**
     * Converte texto para maiúsculas de forma segura
     * Protege contra valores null ou undefined
     */
    converterParaMaiuscula: function(texto) {
      if (!texto) return '';
      return texto.toString().toUpperCase();
    }
  };

  /**
   * 📄 VALIDADOR E GERADOR DE CPF
   * Funções específicas para trabalhar com Cadastro de Pessoa Física
   */
  const CPF = {
    
    /**
     * Valida se um CPF é válido ou não
     * @param {string} cpf - O CPF a ser validado (pode ter formatação ou não)
     * @returns {boolean} - true se válido, false se inválido
     */
    validate: function(cpf) {
      // Se não foi fornecido um CPF, consideramos inválido
      if (!cpf) {
        return false;
      }
      
      // Remove toda a formatação, deixando apenas números
      const cpfLimpo = UtilitariosGerais.apenasNumeros(cpf);
      
      // Um CPF válido deve ter exatamente 11 dígitos
      if (cpfLimpo.length !== 11) {
        return false;
      }
      
      // CPFs com todos os dígitos iguais são inválidos (ex: 111.111.111-11)
      if (UtilitariosGerais.todosDigitosIguais(cpfLimpo)) {
        return false;
      }

      // CÁLCULO DO PRIMEIRO DÍGITO VERIFICADOR
      // Multiplica cada um dos 9 primeiros dígitos por pesos decrescentes (10, 9, 8, ..., 2)
      let somaParaPrimeiroDV = 0;
      for (let posicao = 0; posicao < 9; posicao++) {
        const digito = parseInt(cpfLimpo.charAt(posicao));
        const peso = 10 - posicao; // Pesos: 10, 9, 8, 7, 6, 5, 4, 3, 2
        somaParaPrimeiroDV += digito * peso;
      }
      
      // Calcula o primeiro dígito verificador
      let primeiroDV = (somaParaPrimeiroDV * 10) % 11;
      if (primeiroDV === 10) {
        primeiroDV = 0; // Se der 10, vira 0
      }
      
      // Compara com o 10º dígito do CPF
      if (primeiroDV !== parseInt(cpfLimpo.charAt(9))) {
        return false;
      }

      // CÁLCULO DO SEGUNDO DÍGITO VERIFICADOR
      // Multiplica cada um dos 10 primeiros dígitos por pesos decrescentes (11, 10, 9, ..., 2)
      let somaParaSegundoDV = 0;
      for (let posicao = 0; posicao < 10; posicao++) {
        const digito = parseInt(cpfLimpo.charAt(posicao));
        const peso = 11 - posicao; // Pesos: 11, 10, 9, 8, 7, 6, 5, 4, 3, 2
        somaParaSegundoDV += digito * peso;
      }
      
      // Calcula o segundo dígito verificador
      let segundoDV = (somaParaSegundoDV * 10) % 11;
      if (segundoDV === 10) {
        segundoDV = 0; // Se der 10, vira 0
      }

      // Compara com o 11º dígito do CPF
      return segundoDV === parseInt(cpfLimpo.charAt(10));
    },

    /**
     * Gera um CPF válido aleatório
     * @param {Object} opcoes - Configurações para geração
     * @param {boolean} opcoes.formatted - Se deve retornar formatado (padrão: true)
     * @returns {string} - CPF gerado
     */
    generate: function(opcoes = { formatted: true }) {
      const numerosGerados = [];
      
      // Gera os primeiros 9 dígitos aleatoriamente
      console.log('🎲 Gerando os 9 primeiros dígitos do CPF...');
      for (let i = 0; i < 9; i++) {
        const digitoAleatorio = UtilitariosGerais.numeroAleatorio(0, 9);
        numerosGerados.push(digitoAleatorio);
      }

      // Calcula o primeiro dígito verificador usando a mesma lógica da validação
      console.log('🔢 Calculando primeiro dígito verificador...');
      let somaParaPrimeiroDV = 0;
      for (let i = 0; i < 9; i++) {
        somaParaPrimeiroDV += numerosGerados[i] * (10 - i);
      }
      let primeiroDV = (somaParaPrimeiroDV * 10) % 11;
      if (primeiroDV === 10) primeiroDV = 0;
      numerosGerados.push(primeiroDV);

      // Calcula o segundo dígito verificador
      console.log('🔢 Calculando segundo dígito verificador...');
      let somaParaSegundoDV = 0;
      for (let i = 0; i < 10; i++) {
        somaParaSegundoDV += numerosGerados[i] * (11 - i);
      }
      let segundoDV = (somaParaSegundoDV * 10) % 11;
      if (segundoDV === 10) segundoDV = 0;
      numerosGerados.push(segundoDV);

      // Junta todos os números
      const cpfCompleto = numerosGerados.join('');
      
      // Retorna formatado ou não, conforme solicitado
      return opcoes.formatted ? this.format(cpfCompleto) : cpfCompleto;
    },

    /**
     * Formata um CPF adicionando pontos e hífen
     * @param {string} cpf - CPF sem formatação
     * @returns {string} - CPF formatado (000.000.000-00)
     */
    format: function(cpf) {
      const cpfLimpo = UtilitariosGerais.apen
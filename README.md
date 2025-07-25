# 🏢 Validação de CNPJ Alfanumérico

[![NPM Version](https://img.shields.io/npm/v/cnpj-alfanumerico-validator.svg)](https://www.npmjs.com/package/cnpj-alfanumerico-validator)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Build Status](https://img.shields.io/badge/build-passing-brightgreen.svg)]()

Uma biblioteca JavaScript **especializada em CNPJ alfanumérico**, com validação completa de CNPJ numérico e CPF.

## 🌟 Características Principais

- 🎯 **Foco em CNPJ Alfanumérico** - Nossa especialidade principal
- ✅ **Validação precisa** de CNPJ numérico tradicional  
- 👥 **Suporte adicional** para CPF
- 🚀 **Geração** de documentos válidos
- 🎨 **Formatação automática** (com ou sem máscara)
- 🧹 **Limpeza** de caracteres especiais
- 📦 **Sem dependências** - biblioteca leve e rápida
- 🔧 **TypeScript friendly**
- 🧪 **Bem testado** - suíte completa de testes

## 📋 Índice

- [Instalação](#-instalação)
- [Como usar](#-como-usar)
- [API Completa](#-api-completa)
- [Exemplos Práticos](#-exemplos-práticos)
- [Demo Online](#-demo-online)
- [Testes](#-testes)
- [Contribuindo](#-contribuindo)

## 📦 Instalação

### Download Direto
```html
<script src="https://github.com/viniciusvams/cnpj-alfanumerico-validator/releases/latest/download/cnpj-validator.js"></script>
```

## 🚀 Como usar

### Importação

#### Browser (CDN)
```javascript
const { CPF, CNPJNumerico, CNPJAlfanumerico } = CNPJValidator;
```

#### ES6 Modules
```javascript
import { CPF, CNPJNumerico, CNPJAlfanumerico } from 'cnpj-alfanumerico-validator';
```

#### CommonJS (Node.js)
```javascript
const { CPF, CNPJNumerico, CNPJAlfanumerico } = require('cnpj-alfanumerico-validator');
```

### Uso Básico

```javascript
// 🏢 CNPJ Alfanumérico (FOCO PRINCIPAL)
console.log(CNPJAlfanumerico.validate('AB.CDE.FGH/1234-56')); // true/false
const novoAlpha = CNPJAlfanumerico.generate(); // 'XY.ZAB.CDE/5678-90'

// 🏭 CNPJ Numérico
console.log(CNPJNumerico.validate('11.222.333/0001-81')); // true/false
const novoCNPJ = CNPJNumerico.generate(); // '12.345.678/0001-90'

// 👤 CPF (Suporte adicional)
console.log(CPF.validate('123.456.789-09')); // true/false
const novoCPF = CPF.generate(); // '987.654.321-00'
```

## 🔧 API Completa

### CNPJAlfanumerico (Principal)

| Método | Descrição | Parâmetros | Retorno |
|--------|-----------|------------|---------|
| `validate(cnpj)` | Valida CNPJ alfanumérico | `string` | `boolean` |
| `generate(options?)` | Gera CNPJ alfanumérico válido | `{formatted?: boolean}` | `string` |
| `format(cnpj)` | Adiciona formatação | `string` | `string` |
| `clean(cnpj)` | Remove formatação | `string` | `string` |

### CNPJNumerico

| Método | Descrição | Parâmetros | Retorno |
|--------|-----------|------------|---------|
| `validate(cnpj)` | Valida CNPJ numérico | `string` | `boolean` |
| `generate(options?)` | Gera CNPJ numérico válido | `{formatted?: boolean}` | `string` |
| `format(cnpj)` | Adiciona formatação | `string` | `string` |
| `clean(cnpj)` | Remove formatação | `string` | `string` |

### CPF (Suporte Adicional)

| Método | Descrição | Parâmetros | Retorno |
|--------|-----------|------------|---------|
| `validate(cpf)` | Valida CPF | `string` | `boolean` |
| `generate(options?)` | Gera CPF válido | `{formatted?: boolean}` | `string` |
| `format(cpf)` | Adiciona formatação | `string` | `string` |
| `clean(cpf)` | Remove formatação | `string` | `string` |

## 💡 Exemplos Práticos

### Validação de Formulário

```javascript
function validarFormulario() {
    const cnpjAlpha = document.getElementById('cnpj-alpha').value;
    const cnpjNumerico = document.getElementById('cnpj-numerico').value;
    const cpf = document.getElementById('cpf').value;

    // Validações
    const cnpjAlphaValido = CNPJAlfanumerico.validate(cnpjAlpha);
    const cnpjNumericoValido = CNPJNumerico.validate(cnpjNumerico);
    const cpfValido = CPF.validate(cpf);

    if (cnpjAlphaValido) {
        console.log('✅ CNPJ Alfanumérico válido!');
    }
    
    if (cnpjNumericoValido) {
        console.log('✅ CNPJ Numérico válido!');
    }
    
    if (cpfValido) {
        console.log('✅ CPF válido!');
    }
}
```

### Sistema de Geração em Lote

```javascript
function gerarDocumentosEmLote(quantidade = 10) {
    const documentos = {
        cnpjsAlfanumericos: [],
        cnpjsNumericos: [],
        cpfs: []
    };

    for (let i = 0; i < quantidade; i++) {
        documentos.cnpjsAlfanumericos.push(CNPJAlfanumerico.generate());
        documentos.cnpjsNumericos.push(CNPJNumerico.generate());
        documentos.cpfs.push(CPF.generate());
    }

    return documentos;
}

// Gerar 5 documentos de cada tipo
const docs = gerarDocumentosEmLote(5);
console.log(docs);
```

### Limpeza e Formatação

```javascript
function processarDocumento(documento, tipo) {
    let processado;
    
    switch(tipo) {
        case 'cnpj-alpha':
            // Remove formatação, valida e reformata
            const limpo = CNPJAlfanumerico.clean(documento);
            const valido = CNPJAlfanumerico.validate(limpo);
            processado = valido ? CNPJAlfanumerico.format(limpo) : null;
            break;
            
        case 'cnpj-numerico':
            const limpoNum = CNPJNumerico.clean(documento);
            const validoNum = CNPJNum
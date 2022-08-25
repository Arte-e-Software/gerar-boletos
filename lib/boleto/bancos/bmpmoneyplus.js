const path = require('path');
const StringUtils = require('../../utils/string-utils');
const pad = StringUtils.pad;

const CodigoDeBarrasBuilder = require('../codigo-de-barras-builder');

var Bmpmoneyplus = (function() {
    var NUMERO_BMPMONEYPLUS = '274',
        BIGITO_BMPMONEYPLUS = '7';

    function Bmpmoneyplus() {

    }

    Bmpmoneyplus.prototype.getTitulos = function() {
        return {
            instrucoes: 'Informações de responsabilidade do beneficiário',
            nomeDoPagador: 'Nome do Pagador',
            especie: 'Moeda',
            quantidade: 'Quantidade',
            valor: 'Valor',
            moraMulta: '(+) Juros / Multa'
        };
    };

    Bmpmoneyplus.prototype.exibirReciboDoPagadorCompleto = function() {
        return true;
    };

    Bmpmoneyplus.prototype.exibirCampoCip = function() {
        return true;
    };

    Bmpmoneyplus.prototype.geraCodigoDeBarrasPara = function(boleto) {
        var beneficiario = boleto.getBeneficiario(),
            campoLivre = [];

        campoLivre.push(beneficiario.getAgenciaFormatada());
        campoLivre.push(this.getCarteiraFormatado(beneficiario));
        campoLivre.push(this.getNossoNumeroFormatado(beneficiario));
        campoLivre.push(this.getCodigoFormatado(beneficiario));
        campoLivre.push('0');

        return new CodigoDeBarrasBuilder(boleto).comCampoLivre(campoLivre);
    };

    Bmpmoneyplus.prototype.getNumeroFormatadoComDigito = function() {
        return [
            NUMERO_BMPMONEYPLUS,
            BIGITO_BMPMONEYPLUS
        ].join('-');
    };

    Bmpmoneyplus.prototype.getNumeroFormatado = function() {
        return NUMERO_BMPMONEYPLUS;
    };

    Bmpmoneyplus.prototype.getCarteiraFormatado = function(beneficiario) {
        return pad(beneficiario.getCarteira(), 2, '0');
    };

    Bmpmoneyplus.prototype.getCarteiraTexto = function(beneficiario) {
        return pad(beneficiario.getCarteira(), 2, '0');
    };

    Bmpmoneyplus.prototype.getCodigoFormatado = function(beneficiario) {
        return pad(beneficiario.getCodigoBeneficiario(), 7, '0');
    };

    Bmpmoneyplus.prototype.getImagem = function() {
        return path.join(__dirname, 'logotipos/bmp-money-plus.png');
    };

    Bmpmoneyplus.prototype.getNossoNumeroFormatado = function(beneficiario) {
        return pad(beneficiario.getNossoNumero(), 11, '0');
    };

    Bmpmoneyplus.prototype.getNossoNumeroECodigoDocumento = function(boleto) {
        var beneficiario = boleto.getBeneficiario();

        return this.getCarteiraFormatado(beneficiario) + '/' + [
            this.getNossoNumeroFormatado(beneficiario),
            beneficiario.getDigitoNossoNumero()
        ].join('-');
    };

    Bmpmoneyplus.prototype.getNome = function() {
        return 'Banco Bmpmoneyplus S.A.';
    };

    Bmpmoneyplus.prototype.getImprimirNome = function() {
        return false;
    };

    Bmpmoneyplus.prototype.getAgenciaECodigoBeneficiario = function(boleto) {
        var beneficiario = boleto.getBeneficiario(),

            codigo = this.getCodigoFormatado(beneficiario),
            digitoCodigo = beneficiario.getDigitoCodigoBeneficiario();

        if (digitoCodigo) {
            codigo += '-' + digitoCodigo;
        }

        return beneficiario.getAgenciaFormatada() + '/' + codigo;
    };

    Bmpmoneyplus.Bovobmpmoneyplus = function() {
        return new Bmpmoneyplus();
    };

    return Bmpmoneyplus;
})();

module.exports = Bmpmoneyplus;
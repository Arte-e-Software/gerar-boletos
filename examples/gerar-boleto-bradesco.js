const { Bancos, Boletos, streamToPromise } = require('../lib/index');

const boleto = {
    banco: new Bancos.Bradesco(),
    pagador: {
        nome: 'Pedro Silva',
        RegistroNacional: '12345678',
        endereco: {
            logradouro: 'Rua Pedro, 1',
            bairro: 'Centro',
            cidade: 'São Paulo',
            estadoUF: 'SP',
            cep: '01000-000'
        }
    },
    instrucoes: ['Após o vencimento Mora dia R$ 1,59', 'Após o vencimento, multa de 2%'],
    beneficiario: {
        nome: 'Empresa Fictícia LTDA',
        cnpj: '43576788000191',
        dadosBancarios: {
            carteira: '09',
            agencia: '0101',
            agenciaDigito: '5',
            conta: '0326446',
            contaDigito: '0',
            nossoNumero: '00000000061',
            nossoNumeroDigito: '8'
        },
        endereco: {
            logradouro: 'Rua Pedro, 2',
            bairro: 'Centro',
            cidade: 'São Paulo',
            estadoUF: 'SP',
            cep: '010000-000'
        }
    },
    boleto: {
        numeroDocumento: '1001',
        especieDocumento: 'DM',
        valor: 110.00,
        datas: {
            vencimento: '12-08-2022',
            processamento: '12-08-2022',
            documentos: '12-08-2022'
        }
    }
};

const novoBoleto = new Boletos(boleto);
novoBoleto.gerarBoleto();

novoBoleto.pdfFile().then(async({ stream }) => {
    // ctx.res.set('Content-type', 'application/pdf');	
    await streamToPromise(stream);
}).catch((error) => {
    return error;
});
const { Bancos, Boletos, streamToPromise } = require('../lib/index');

const boleto = {
    banco: new Bancos.Bmpmoneyplus(),
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
            carteira: '01',
            agencia: '0001',
            agenciaDigito: '',
            conta: '08195047',
            contaDigito: '9',
            nossoNumero: '888889',
            nossoNumeroDigito: '6'
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
        numeroDocumento: '1022027K22',
        especieDocumento: 'DM',
        valor: 1036.00,
        datas: {
            vencimento: '11-01-2022',
            processamento: '11-01-2022',
            documentos: '11-01-2022'
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
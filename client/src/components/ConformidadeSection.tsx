import { motion } from 'framer-motion';
import { Shield, Lock, FileCheck, CheckCircle2, AlertCircle, Code2 } from 'lucide-react';

export default function ConformidadeSection() {
  const conformidades = [
    {
      id: 'cpp',
      titulo: 'Art. 158-B do Código de Processo Penal',
      subtitulo: 'Cadeia de Custódia e Admissibilidade',
      icon: <Shield className="w-6 h-6" />,
      descricao: 'Conformidade total com a legislação brasileira que estabelece as etapas para o tratamento de vestígios digitais.',
      norma: 'Art. 158-B CPP: "A cadeia de custódia compreende o rastreamento do vestígio para garantir sua integridade e autenticidade."',
      requisitos: [
        'Fixação: Descrição detalhada do vestígio no momento da coleta',
        'Coleta: Registro imediato do Hash SHA-256',
        'Preservação: Garantia de imutabilidade através de lacre digital',
        'Rastreabilidade: Registro de quem e quando acessou a evidência'
      ],
      beneficios: [
        'Princípio da Mesmidade: Prova de que o arquivo é o mesmo da coleta',
        'Impossibilidade de contestação por quebra de custódia',
        'Proteção contra anulação de provas por erro de manuseio',
        'Admissibilidade garantida em laudos e petições'
      ],
      implementacao: [
        'SafeHash automatiza a etapa de Fixação e Coleta do vestígio',
        'Geração de Protocolo de Integridade com Lacre Digital SHA-256',
        'Documentação técnica robusta para fundamentação de laudos',
        'Trilha de auditoria que comprova conformidade com Art. 158-B'
      ]
    },
    {
      id: 'integridade-temporal',
      titulo: 'Registro de Integridade Temporal',
      subtitulo: 'Prova de Tempestividade Forense',
      icon: <FileCheck className="w-6 h-6" />,
      descricao: 'Sistema de marcação temporal vinculado ao hash do arquivo, garantindo a ordem cronológica dos fatos.',
      norma: 'RFC 3161 / ISO 27037: Diretrizes internacionais para preservação e registro de tempo imutável em evidências digitais',
      requisitos: [
        'Assinatura digital interna do sistema SafeHash',
        'Sincronização com servidores de tempo confiáveis',
        'Impossibilidade de alteração retroativa da data de custódia',
        'Vínculo matemático entre o tempo e o hash do arquivo'
      ],
      beneficios: [
        'Prova irrefutável de QUANDO a evidência foi registrada',
        'Reconhecimento do padrão internacional RFC 3161',
        'Impossibilidade de negar a tempestividade da prova',
        'Auditabilidade perpétua do registro temporal'
      ],
      implementacao: [
        'Cada prova recebe assinatura temporal SAFEHASH-AUTH',
        'Timestamp vinculado matematicamente ao Hash do arquivo',
        'Trilha de auditoria imutável gravada no banco de dados',
        'Verificação pública da integridade temporal via plataforma'
      ]
    },
    {
      id: 'sha256',
      titulo: 'Criptografia SHA-256',
      subtitulo: 'Integridade Criptográfica de Nível Militar',
      icon: <Lock className="w-6 h-6" />,
      descricao: 'Algoritmo de hash de 256 bits que garante a integridade absoluta e irrefutável de arquivos digitais.',
      norma: 'NIST FIPS 180-4: Padrão de criptografia recomendado para segurança de dados críticos e forenses',
      requisitos: [
        'Hash de 256 bits (impossível encontrar colisão)',
        'Processamento local no navegador (privacidade forense)',
        'Qualquer alteração no arquivo invalida o hash original',
        'Verificação independente sem necessidade de servidor'
      ],
      beneficios: [
        'Padrão mundial de integridade (NSA Suite B)',
        'Impossível adulterar o arquivo sem quebrar o lacre digital',
        'Privacidade total: o arquivo original nunca sai do seu PC',
        'Verificação pública e matemática da integridade'
      ],
      implementacao: [
        'Cálculo do hash SHA-256 localmente via Web Crypto API',
        'Algoritmo implementado conforme padrão FIPS 180-4',
        'Hash incluído no Protocolo de Integridade imutável',
        'Verificador público permite validação por qualquer perito'
      ]
    }
  ];

  return (
    <section className="py-20 md:py-28 bg-white">
      <div className="container mx-auto px-4">
        <motion.div
          className="mb-20"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
            Conformidade e Segurança Forense
          </h1>
          <div className="w-16 h-1 bg-blue-900 mb-6"></div>
          <p className="text-lg text-slate-600 max-w-3xl leading-relaxed">
            O SafeHash atende aos requisitos do Art. 158-B do CPP e às diretrizes da ISO 27037, 
            garantindo que suas provas digitais possuam admissibilidade jurídica e integridade inatacável.
          </p>
        </motion.div>

        <div className="space-y-12">
          {conformidades.map((conf, idx) => (
            <motion.div
              key={conf.id}
              className="border border-slate-200 rounded-2xl overflow-hidden shadow-sm"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              viewport={{ once: true }}
            >
              <div className="bg-gradient-to-r from-slate-900 to-blue-900 px-8 py-8 text-white">
                <div className="flex items-start gap-4 mb-4">
                  <div className="p-3 bg-white/10 rounded-lg">{conf.icon}</div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold mb-1">{conf.titulo}</h3>
                    <p className="text-blue-100 text-sm font-semibold">{conf.subtitulo}</p>
                  </div>
                </div>
                <p className="text-blue-50 leading-relaxed">{conf.descricao}</p>
              </div>

              <div className="bg-slate-50 px-8 py-6 border-b border-slate-200">
                <div className="flex gap-3">
                  <Code2 className="w-5 h-5 text-blue-900 flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-bold text-slate-900 text-sm mb-1">Norma Técnica</h4>
                    <p className="text-slate-700 text-sm leading-relaxed italic">{conf.norma}</p>
                  </div>
                </div>
              </div>

              <div className="p-8">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  <div>
                    <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-4 flex items-center gap-2">
                      <AlertCircle className="w-4 h-4 text-amber-600" />
                      Requisitos de Custódia
                    </h4>
                    <ul className="space-y-3">
                      {conf.requisitos.map((req, i) => (
                        <li key={i} className="text-sm text-slate-700 leading-relaxed">
                          • {req}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-4 flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-green-600" />
                      Benefícios Jurídicos
                    </h4>
                    <ul className="space-y-3">
                      {conf.beneficios.map((ben, i) => (
                        <li key={i} className="text-sm text-slate-700 leading-relaxed">
                          • {ben}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-4 flex items-center gap-2">
                      <Shield className="w-4 h-4 text-blue-600" />
                      Implementação SafeHash
                    </h4>
                    <ul className="space-y-3">
                      {conf.implementacao.map((impl, i) => (
                        <li key={i} className="text-sm text-slate-700 leading-relaxed font-medium">
                          • {impl}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="mt-20 p-8 bg-slate-50 rounded-2xl border border-slate-200"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h3 className="text-2xl font-bold text-slate-900 mb-8">Matriz de Conformidade Técnica</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b-2 border-slate-300">
                  <th className="text-left py-4 px-4 font-bold text-slate-900">Padrão / Norma</th>
                  <th className="text-center py-4 px-4 font-bold text-slate-900">Status</th>
                  <th className="text-left py-4 px-4 font-bold text-slate-900">Escopo Forense</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { norma: 'Art. 158-B CPP', conf: '✓ Atendido', escopo: 'Admissibilidade de provas digitais e Cadeia de Custódia' },
                  { norma: 'ISO/IEC 27037', conf: '✓ Atendido', escopo: 'Identificação, Coleta, Aquisição e Preservação Digital' },
                  { norma: 'RFC 3161', conf: '✓ Preparado', escopo: 'Arquitetura para Registro Temporal e Tempestividade' },
                  { norma: 'FIPS 180-4', conf: '✓ Atendido', escopo: 'Algoritmo SHA-256 de integridade criptográfica' },
                  { norma: 'LGPD', conf: '✓ Atendido', escopo: 'Privacidade forense: processamento local de dados' },
                ].map((row, i) => (
                  <tr key={i} className={`border-b border-slate-200 ${i % 2 === 0 ? 'bg-white' : 'bg-slate-50'}`}>
                    <td className="py-4 px-4 font-semibold text-slate-900">{row.norma}</td>
                    <td className="py-4 px-4 text-center text-green-600 font-bold">{row.conf}</td>
                    <td className="py-4 px-4 text-slate-700">{row.escopo}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

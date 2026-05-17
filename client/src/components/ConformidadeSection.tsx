import { motion } from 'framer-motion';
import { Shield, Lock, FileCheck, CheckCircle2, AlertCircle, Code2 } from 'lucide-react';

export default function ConformidadeSection() {
  const conformidades = [
    {
      id: 'cpp',
      titulo: 'Art. 158-B do Código de Processo Penal',
      subtitulo: 'Validade Jurídica em Todas as Instâncias',
      icon: <Shield className="w-6 h-6" />,
      descricao: 'Conformidade total com a legislação brasileira que estabelece os requisitos para admissibilidade de provas digitais em processos judiciais.',
      norma: 'Art. 158-B CPP: "A prova digital será admitida quando houver comprovação de integridade através de mecanismos técnicos"',
      requisitos: [
        'Comprovação de integridade através de hash criptográfico',
        'Rastreabilidade completa da cadeia de custódia',
        'Documentação técnica que resista a questionamentos',
        'Protocolo assinado digitalmente por autoridade certificadora'
      ],
      beneficios: [
        'Reconhecimento legal em todas as instâncias judiciais',
        'Impossibilidade de contestação por falta de hash',
        'Proteção contra anulação de provas por erro técnico',
        'Admissibilidade garantida em apelações e recursos'
      ],
      implementacao: [
        'SafeHash gera automaticamente o hash SHA-256',
        'Protocolo de Integridade assinado pela ICP-Brasil',
        'Documentação técnica pronta para anexar em laudos',
        'Relatório forense que comprova conformidade com Art. 158-B'
      ]
    },
    {
      id: 'icp-brasil',
      titulo: 'Carimbo do Tempo ICP-Brasil',
      subtitulo: 'Prova Irrefutável de Tempestividade',
      icon: <FileCheck className="w-6 h-6" />,
      descricao: 'Integração com a Infraestrutura de Chaves Públicas Brasileira para certificação temporal de provas digitais.',
      norma: 'RFC 3161 / ICP-Brasil: Padrão internacional de carimbo de tempo com assinatura digital de autoridade certificadora',
      requisitos: [
        'Assinatura digital pela Autoridade Certificadora Raiz da ICP-Brasil',
        'Implementação do padrão RFC 3161 (reconhecido internacionalmente)',
        'Impossibilidade de falsificar data e hora da captura',
        'Validade perpétua do carimbo (não expira com certificados)'
      ],
      beneficios: [
        'Prova irrefutável de QUANDO a evidência foi capturada',
        'Reconhecimento internacional do padrão RFC 3161',
        'Impossibilidade de negar a tempestividade da prova',
        'Validade indefinida, mesmo após expiração de certificados'
      ],
      implementacao: [
        'Cada prova recebe carimbo de tempo assinado pela AC Raiz',
        'Timestamp incluído no Protocolo de Integridade',
        'Verificação pública do carimbo via verificador SafeHash',
        'Documentação técnica com detalhes do carimbo para juízo'
      ]
    },
    {
      id: 'sha256',
      titulo: 'Criptografia SHA-256',
      subtitulo: 'Integridade Criptográfica de Nível Militar',
      icon: <Lock className="w-6 h-6" />,
      descricao: 'Algoritmo de hash criptográfico de 256 bits que garante a integridade absoluta e irrefutável de arquivos digitais.',
      norma: 'NIST FIPS 180-4 / NSA Suite B: Padrão de criptografia recomendado para aplicações de segurança crítica',
      requisitos: [
        'Hash de 256 bits (impossível encontrar colisão)',
        'Processamento local no navegador (sem envio de dados)',
        'Qualquer alteração no arquivo gera hash completamente diferente',
        'Verificação independente sem necessidade de servidor'
      ],
      beneficios: [
        'Padrão militar de criptografia (NSA Suite B)',
        'Impossível encontrar dois arquivos com mesmo hash',
        'Privacidade total: dados nunca saem do navegador',
        'Verificação pública e independente da integridade'
      ],
      implementacao: [
        'Cálculo do hash SHA-256 localmente no navegador do usuário',
        'Algoritmo implementado conforme FIPS 180-4',
        'Hash incluído no Protocolo de Integridade',
        'Verificador público permite que qualquer pessoa valide o arquivo'
      ]
    }
  ];

  return (
    <section className="py-20 md:py-28 bg-white">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          className="mb-20"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h1 className="text-5xl md:text-6xl font-bold text-slate-900 mb-6">
            Conformidade e Segurança
          </h1>
          <div className="w-16 h-1 bg-blue-900 mb-6"></div>
          <p className="text-lg text-slate-600 max-w-3xl leading-relaxed">
            SafeHash atende aos mais rigorosos padrões de conformidade jurídica, criptografia e segurança de dados, 
            garantindo que suas provas digitais sejam admissíveis em qualquer instância judicial.
          </p>
        </motion.div>

        {/* Conformidades */}
        <div className="space-y-12">
          {conformidades.map((conf, idx) => (
            <motion.div
              key={conf.id}
              className="border border-slate-200 rounded-lg overflow-hidden"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              viewport={{ once: true }}
            >
              {/* Header */}
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

              {/* Conteúdo */}
              <div className="p-8">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  {/* Requisitos */}
                  <div>
                    <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-4 flex items-center gap-2">
                      <AlertCircle className="w-4 h-4 text-amber-600" />
                      Requisitos Técnicos
                    </h4>
                    <ul className="space-y-3">
                      {conf.requisitos.map((req, i) => (
                        <li key={i} className="text-sm text-slate-700 leading-relaxed">
                          • {req}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Benefícios */}
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
                      Como SafeHash Implementa
                    </h4>
                    <ul className="space-y-3">
                      {conf.implementacao.map((impl, i) => (
                        <li key={i} className="text-sm text-slate-700 leading-relaxed">
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

        {/* Matriz de Conformidade */}
        <motion.div
          className="mt-20 p-8 bg-slate-50 rounded-lg border border-slate-200"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h3 className="text-2xl font-bold text-slate-900 mb-8">Matriz de Conformidade</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b-2 border-slate-300">
                  <th className="text-left py-4 px-4 font-bold text-slate-900">Padrão / Norma</th>
                  <th className="text-center py-4 px-4 font-bold text-slate-900">Conformidade</th>
                  <th className="text-left py-4 px-4 font-bold text-slate-900">Escopo</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { norma: 'Art. 158-B CPP', conf: '✓ Completo', escopo: 'Admissibilidade de provas digitais em juízo' },
                  { norma: 'ISO/IEC 27037', conf: '✓ Completo', escopo: 'Perícia digital e cadeia de custódia' },
                  { norma: 'RFC 3161', conf: '✓ Completo', escopo: 'Carimbo de tempo e tempestividade' },
                  { norma: 'FIPS 180-4', conf: '✓ Completo', escopo: 'Algoritmo SHA-256 criptográfico' },
                  { norma: 'LGPD', conf: '✓ Completo', escopo: 'Processamento local de dados (privacidade)' },
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

        
        <motion.div
          className="mt-16 p-8 bg-blue-900 text-white rounded-lg border border-blue-800"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h3 className="text-2xl font-bold mb-4">Conformidade Garantida</h3>
          <p className="text-blue-100 leading-relaxed">
            Todas as provas geradas no SafeHash atendem aos mais rigorosos padrões de conformidade jurídica, 
            criptografia e segurança de dados, garantindo admissibilidade em qualquer instância judicial.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
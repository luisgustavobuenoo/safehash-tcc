import { motion } from 'framer-motion';
import { FileText, Users, Camera, CheckCircle2, AlertCircle } from 'lucide-react';

export default function SolucoesSection() {
  const solucoes = [
    {
      id: 'advogados',
      titulo: 'Para Advogados Criminalistas',
      subtitulo: 'Preservação de Provas Digitais com Validade Jurídica',
      descricao: 'Ferramenta especializada para garantir a integridade de provas digitais apresentadas em juízo, conforme Art. 158-B do Código de Processo Penal.',
      icon: <FileText className="w-6 h-6" />,
      desafios: [
        'Juízes anulando provas por falta de hash criptográfico',
        'Contestação da autenticidade de prints por parte da defesa',
        'Impossibilidade de comprovar a cadeia de custódia digital',
        'Necessidade de ferramentas complexas e caras (FTK, EnCase)'
      ],
      solucao: [
        'Geração automática de hash SHA-256 com Carimbo do Tempo ICP-Brasil',
        'Protocolo de Integridade assinado digitalmente, pronto para anexar em laudos',
        'Rastreabilidade completa desde a captura até a apresentação em juízo',
        'Interface simples, sem necessidade de conhecimento técnico profundo'
      ],
      casos: [
        'Prints de conversas de WhatsApp e redes sociais',
        'Capturas de telas de websites e transações online',
        'Documentos digitais em PDF com metadados preservados',
        'Evidências de transferências bancárias e fraudes'
      ]
    },
    {
      id: 'peritos',
      titulo: 'Para Peritos Assistentes',
      subtitulo: 'Laudos Técnicos e Cadeia de Custódia Imutável',
      descricao: 'Plataforma para perícia digital assistencial com conformidade total à ISO/IEC 27037 e legislação brasileira.',
      icon: <Users className="w-6 h-6" />,
      desafios: [
        'Necessidade de documentar a cadeia de custódia de forma irrefutável',
        'Conformidade com normas internacionais de perícia digital (ISO/IEC 27037)',
        'Geração de relatórios técnicos que resistam a questionamentos judiciais',
        'Integração com fluxos de investigação criminal'
      ],
      solucao: [
        'Trilha de Auditoria Imutável: registro de todos os eventos da evidência',
        'Conformidade certificada com ISO/IEC 27037 e Art. 158-B CPP',
        'Geração automática de relatórios forenses em PDF prontos para juízo',
        'Verificador de Integridade Público: qualquer juiz pode validar a prova'
      ],
      casos: [
        'Perícia digital em investigações de crimes cibernéticos',
        'Análise forense de dispositivos móveis e computadores',
        'Documentação de cenas de crime fotografadas digitalmente',
        'Investigações de fraude eletrônica e estelionato'
      ]
    },
    {
      id: 'captura',
      titulo: 'Captura e Validação de Imagens',
      subtitulo: 'Integridade Garantida de Fotos e Screenshots',
      descricao: 'Ferramenta especializada em validação de autenticidade de imagens digitais, detectando manipulações e preservando metadados.',
      icon: <Camera className="w-6 h-6" />,
      desafios: [
        'Impossibilidade de comprovar se uma imagem foi editada ou alterada',
        'Perda de metadados críticos (data, hora, localização)',
        'Contestação da autenticidade de fotos de documentos',
        'Falta de rastreabilidade entre a captura original e a versão apresentada'
      ],
      solucao: [
        'Detecção automática de manipulação ou edição de imagens',
        'Preservação de metadados EXIF com timestamp verificável',
        'Hash criptográfico que prova a integridade da imagem original',
        'Relatório técnico comprovando autenticidade para apresentação em juízo'
      ],
      casos: [
        'Documentação fotográfica de cenas de crime',
        'Validação de fotos de documentos em processos de fraude',
        'Comprovação de estado de bens em ações de indenização',
        'Registro de evidências visuais em investigações policiais'
      ]
    }
  ];

  return (
    <section className="py-20 md:py-28 bg-gradient-to-b from-slate-50 to-white">
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
            Soluções Especializadas
          </h1>
          <div className="w-16 h-1 bg-blue-900 mb-6"></div>
          <p className="text-lg text-slate-600 max-w-3xl leading-relaxed">
            SafeHash oferece soluções específicas para cada ator do sistema de justiça criminal, 
            garantindo a conformidade com o Art. 158-B do CPP e normas internacionais de perícia digital.
          </p>
        </motion.div>

        {/* Soluções */}
        <div className="space-y-16">
          {solucoes.map((sol, idx) => (
            <motion.div
              key={sol.id}
              className="border border-slate-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow bg-white"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              viewport={{ once: true }}
            >
              {/* Header da Solução */}
              <div className="bg-gradient-to-r from-slate-900 to-blue-900 px-8 py-8 text-white">
                <div className="flex items-start gap-4 mb-4">
                  <div className="p-3 bg-white/10 rounded-lg">{sol.icon}</div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold mb-1">{sol.titulo}</h3>
                    <p className="text-blue-100 text-sm font-semibold">{sol.subtitulo}</p>
                  </div>
                </div>
                <p className="text-blue-50 leading-relaxed">{sol.descricao}</p>
              </div>

              {/* Conteúdo */}
              <div className="p-8">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  {/* Desafios */}
                  <div>
                    <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-4 flex items-center gap-2">
                      <AlertCircle className="w-4 h-4 text-red-600" />
                      Desafios Enfrentados
                    </h4>
                    <ul className="space-y-3">
                      {sol.desafios.map((desafio, i) => (
                        <li key={i} className="text-sm text-slate-700 leading-relaxed">
                          • {desafio}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Solução */}
                  <div>
                    <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-4 flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-green-600" />
                      Como SafeHash Resolve
                    </h4>
                    <ul className="space-y-3">
                      {sol.solucao.map((item, i) => (
                        <li key={i} className="text-sm text-slate-700 leading-relaxed">
                          • {item}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Casos de Uso */}
                  <div>
                    <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-4 flex items-center gap-2">
                      <FileText className="w-4 h-4 text-blue-600" />
                      Casos de Uso
                    </h4>
                    <ul className="space-y-3">
                      {sol.casos.map((caso, i) => (
                        <li key={i} className="text-sm text-slate-700 leading-relaxed">
                          • {caso}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Seção de Conformidade */}
        <motion.div
          className="mt-20 p-8 bg-blue-900 text-white rounded-lg border border-blue-800"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h3 className="text-2xl font-bold mb-4">Conformidade Garantida</h3>
          <p className="text-blue-100 mb-6 leading-relaxed">
            Todas as soluções SafeHash atendem aos requisitos legais e técnicos mais rigorosos:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { label: 'Art. 158-B CPP', desc: 'Legislação Brasileira' },
              { label: 'ISO/IEC 27037', desc: 'Perícia Digital' },
              { label: 'RFC 3161', desc: 'Carimbo de Tempo' },
              { label: 'SHA-256', desc: 'Criptografia Militar' }
            ].map((item, i) => (
              <div key={i} className="bg-white/10 rounded p-4 border border-white/20">
                <div className="font-bold text-sm mb-1">{item.label}</div>
                <div className="text-xs text-blue-200">{item.desc}</div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BookOpen, FileText, Lightbulb, Clock, Shield, Lock, FileCheck, X, CheckCircle2, AlertCircle, Info, Camera } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function RecursosSection() {
  const [selectedItem, setSelectedItem] = useState<any>(null);

  const categorias = [
    {
      id: 'guias',
      titulo: 'Guias Técnicos e Tutoriais',
      descricao: 'Documentação prática para implementação de SafeHash em fluxos de perícia criminal focada em imagens.',
      icon: <BookOpen className="w-6 h-6" />,
      recursos: [
        {
          titulo: 'Como Funciona o SHA-256 em Imagens Forenses',
          tipo: 'Guia Técnico',
          duracao: '12 min',
          descricao: 'Explicação detalhada do algoritmo SHA-256 aplicado a arquivos PNG e JPG, garantindo a integridade absoluta de cada pixel.',
          tags: ['Criptografia', 'Imagens', 'Técnico'],
          conteudo: [
            { type: 'h3', text: 'O Algoritmo SHA-256 na Forense de Imagens' },
            { type: 'p', text: 'O SHA-256 (Secure Hash Algorithm 256-bit) é o padrão ouro para garantir a integridade de evidências visuais. Ele gera uma "impressão digital" única de 64 caracteres hexadecimais para qualquer arquivo de imagem.' },
            { type: 'h4', text: 'Por que o SHA-256 é Inviolável em PNG e JPG?' },
            { type: 'li', text: 'Resistência a Colisões: É matematicamente impossível encontrar duas imagens diferentes que gerem o mesmo hash.' },
            { type: 'li', text: 'Efeito Avalanche: Se você alterar um único pixel em uma foto JPG ou um canal de transparência em um PNG, o hash resultante será completamente diferente.' },
            { type: 'li', text: 'Determinismo: O mesmo arquivo de imagem sempre gerará o mesmo hash, permitindo auditorias futuras por qualquer autoridade judicial.' },
            { type: 'h4', text: 'Implementação SafeHash (Local-First)' },
            { type: 'p', text: 'Diferente de outras ferramentas, o SafeHash processa o cálculo do hash diretamente no seu navegador. Isso significa que a imagem original (PNG ou JPG) nunca sai do seu computador, garantindo conformidade total com a LGPD e o sigilo profissional pericial.' }
          ]
        },
        {
          titulo: 'Cadeia de Custódia para Evidências Visuais',
          tipo: 'Guia Prático',
          duracao: '18 min',
          descricao: 'Passo a passo para manter a rastreabilidade completa de fotos e screenshots conforme ISO/IEC 27037.',
          tags: ['Cadeia de Custódia', 'Imagens', 'Legal'],
          conteudo: [
            { type: 'h3', text: 'Cadeia de Custódia de Imagens conforme ISO/IEC 27037' },
            { type: 'p', text: 'A cadeia de custódia é o conjunto de todos os procedimentos utilizados para manter e documentar a história cronológica da evidência visual, para evitar qualquer alegação de adulteração ou substituição.' },
            { type: 'h4', text: 'As 4 Fases da Preservação de Imagens:' },
            { type: 'li', text: 'Identificação: Localizar e identificar a imagem potencial (ex: um print de WhatsApp em PNG ou uma foto de cena de crime em JPG).' },
            { type: 'li', text: 'Coleta: O ato de remover a imagem do seu local original para um ambiente controlado de registro.' },
            { type: 'li', text: 'Aquisição: O processo de registrar o estado original da imagem através de hash criptográfico e carimbo do tempo.' },
            { type: 'li', text: 'Preservação: Garantir que a imagem não sofra alterações durante todo o processo judicial, mantendo o hash original.' },
            { type: 'h4', text: 'SafeHash e o Art. 158-B do CPP' },
            { type: 'p', text: 'O SafeHash automatiza a fase de Aquisição e Preservação de imagens, gerando o Protocolo de Integridade que serve como o documento mestre da cadeia de custódia, registrando o "quem", "quando" e "o quê" de forma imutável.' }
          ]
        },
        {
          titulo: 'Registrando Prints com Validade Jurídica',
          tipo: 'Tutorial',
          duracao: '10 min',
          descricao: 'Como capturar e registrar screenshots (PNG) de redes sociais e conversas com conformidade Art. 158-B CPP.',
          tags: ['Prints', 'WhatsApp', 'PNG'],
          conteudo: [
            { type: 'h3', text: 'Validade Jurídica de Capturas de Tela (Screenshots)' },
            { type: 'p', text: 'Prints de tela em formato PNG são frequentemente contestados em juízo sob a alegação de que podem ser facilmente editados. Para que tenham valor probatório, precisam de camadas de autenticação técnica.' },
            { type: 'h4', text: 'Requisitos para Admissibilidade de Prints:' },
            { type: 'li', text: 'Metadados Preservados: Data, hora e origem da captura registrados no protocolo.' },
            { type: 'li', text: 'Integridade Criptográfica: Hash SHA-256 gerado no momento exato do registro do print.' },
            { type: 'li', text: 'Tempestividade: Carimbo do tempo assinado por autoridade certificadora (ICP-Brasil) vinculado ao arquivo PNG.' },
            { type: 'h4', text: 'Procedimento Recomendado:' },
            { type: 'p', text: 'Ao utilizar o SafeHash para registrar um print PNG, o sistema gera um Protocolo de Integridade que vincula a imagem ao hash e ao carimbo do tempo. Isso cria uma prova robusta que inverte o ônus da prova: a outra parte precisará provar tecnicamente que o hash é falso, o que é matematicamente impossível.' }
          ]
        },
        {
          titulo: 'Integridade de Fotos de Cenas de Crime',
          tipo: 'Guia Técnico',
          duracao: '15 min',
          descricao: 'Técnicas para preservar a integridade de fotos JPG e metadados críticos EXIF para fins periciais criminais.',
          tags: ['Fotos', 'JPG', 'Forense'],
          conteudo: [
            { type: 'h3', text: 'Análise de Integridade de Fotos JPG' },
            { type: 'p', text: 'Fotos digitais em formato JPG contêm informações ocultas chamadas metadados (EXIF), que registram o modelo da câmera, coordenadas GPS e data de criação.' },
            { type: 'h4', text: 'O que o SafeHash Valida em Fotos JPG:' },
            { type: 'li', text: 'Preservação de Metadados: Garante que as informações originais de captura não foram alteradas.' },
            { type: 'li', text: 'Consistência de Hash: Prova que a foto JPG apresentada em juízo é bit-a-bit idêntica à foto coletada originalmente.' },
            { type: 'li', text: 'Rastreabilidade Temporal: Vincula a foto a um carimbo do tempo ICP-Brasil, provando a existência da imagem naquela data.' },
            { type: 'h4', text: 'Importância para o Perito:' },
            { type: 'p', text: 'Em investigações criminais, a validação da foto JPG impede que a defesa alegue "montagem" ou "edição". O SafeHash fornece o laudo técnico de integridade que acompanha a imagem, simplificando o trabalho do perito assistente.' }
          ]
        }
      ]
    },
    {
      id: 'docs',
      titulo: 'Documentação Técnica e Normativa',
      descricao: 'Referência completa de especificações técnicas e conformidade com legislação para imagens.',
      icon: <FileText className="w-6 h-6" />,
      recursos: [
        {
          titulo: 'Especificação do Protocolo de Integridade SafeHash',
          tipo: 'Documentação Técnica',
          duracao: 'Referência',
          descricao: 'Detalhamento completo da estrutura, assinatura digital e validação do Protocolo de Integridade para arquivos PNG e JPG.',
          tags: ['Protocolo', 'Assinatura Digital', 'ICP-Brasil'],
          conteudo: [
            { type: 'h3', text: 'Especificação Técnica do Protocolo SafeHash' },
            { type: 'p', text: 'O Protocolo de Integridade SafeHash é um documento estruturado que consolida todas as informações forenses de uma evidência visual (PNG ou JPG).' },
            { type: 'h4', text: 'Estrutura do Documento para Imagens:' },
            { type: 'li', text: 'Header: Versão do protocolo e identificador único do registro.' },
            { type: 'li', text: 'Image Metadata: Nome original, tamanho, tipo MIME (image/png ou image/jpeg) e metadados EXIF.' },
            { type: 'li', text: 'Cryptographic Proof: Hash SHA-256 calculado localmente sobre o binário da imagem.' },
            { type: 'li', text: 'Temporal Proof: Token de Carimbo do Tempo (RFC 3161) assinado pela ICP-Brasil.' },
            { type: 'li', text: 'Digital Signature: Assinatura digital do SafeHash garantindo a autenticidade do protocolo.' },
            { type: 'h4', text: 'Validação Pública:' },
            { type: 'p', text: 'O protocolo pode ser validado de forma independente através do nosso Verificador Público ou por qualquer ferramenta que suporte o padrão RFC 3161 e SHA-256, garantindo que a prova não dependa exclusivamente do SafeHash para existir.' }
          ]
        },
        {
          titulo: 'Conformidade com Art. 158-B do CPP',
          tipo: 'Documentação Legal',
          duracao: 'Referência',
          descricao: 'Análise jurídica completa de como SafeHash atende aos requisitos do Art. 158-B CPP para provas visuais.',
          tags: ['Legislação', 'CPP', 'Admissibilidade'],
          conteudo: [
            { type: 'h3', text: 'Análise Jurídica: SafeHash e o Pacote Anticrime' },
            { type: 'p', text: 'A Lei 13.964/2019 (Pacote Anticrime) introduziu o Art. 158-B no Código de Processo Penal, definindo as etapas da cadeia de custódia para vestígios digitais.' },
            { type: 'h4', text: 'Requisitos Legais Atendidos para Imagens:' },
            { type: 'li', text: 'Fixação: Descrição detalhada da imagem e sua origem (Metadados SafeHash).' },
            { type: 'li', text: 'Coleta: Registro do momento exato da coleta da imagem (Carimbo do Tempo).' },
            { type: 'li', text: 'Acondicionamento: Garantia de que a imagem PNG/JPG não será alterada (Hash SHA-256).' },
            { type: 'li', text: 'Rastreamento: Identificação de quem realizou o registro da evidência (Logs de Auditoria).' },
            { type: 'h4', text: 'Jurisprudência:' },
            { type: 'p', text: 'Tribunais Superiores têm anulado provas visuais que não apresentam hash criptográfico. O uso do SafeHash elimina esse risco jurídico, fornecendo a prova técnica de integridade exigida pelos magistrados modernos.' }
          ]
        },
        {
          titulo: 'Implementação de ISO/IEC 27037 em SafeHash',
          tipo: 'Documentação Técnica',
          duracao: 'Referência',
          descricao: 'Mapeamento das práticas de perícia digital conforme norma internacional ISO/IEC 27037 para imagens.',
          tags: ['ISO/IEC 27037', 'Perícia', 'Norma'],
          conteudo: [
            { type: 'h3', text: 'Padrões Internacionais: ISO/IEC 27037' },
            { type: 'p', text: 'A norma ISO/IEC 27037 fornece diretrizes para atividades específicas no manuseio de evidências digitais, com foco em confiabilidade e repetibilidade.' },
            { type: 'h4', text: 'Princípios Fundamentais Aplicados a Imagens:' },
            { type: 'li', text: 'Relevância: A imagem deve ser coletada de forma a manter sua utilidade em juízo.' },
            { type: 'li', text: 'Confiabilidade: O processo de aquisição do hash da imagem deve ser repetível e auditável.' },
            { type: 'li', text: 'Suficiência: Devem ser coletados metadados suficientes para contextualizar a foto ou print.' },
            { type: 'h4', text: 'Auditoria de Processo:' },
            { type: 'p', text: 'O SafeHash foi desenhado seguindo o workflow da ISO 27037, garantindo que mesmo usuários não-técnicos sigam as melhores práticas internacionais de forense digital ao realizar um registro de imagem.' }
          ]
        },
        {
          titulo: 'Formatos Suportados: PNG e JPG',
          tipo: 'Referência Técnica',
          duracao: 'Referência',
          descricao: 'Detalhamento técnico de como arquivos PNG e JPG são processados para garantir a imutabilidade do hash.',
          tags: ['PNG', 'JPG', 'Técnico'],
          conteudo: [
            { type: 'h3', text: 'Matriz de Compatibilidade de Imagens' },
            { type: 'p', text: 'O SafeHash foca nos dois formatos de imagem mais utilizados no sistema de justiça para garantir máxima compatibilidade e rigor técnico.' },
            { type: 'h4', text: 'Formatos Suportados:' },
            { type: 'li', text: 'PNG (Portable Network Graphics): Ideal para screenshots e prints de tela, preservando transparência e sem perda de qualidade por compressão.' },
            { type: 'li', text: 'JPG/JPEG (Joint Photographic Experts Group): O padrão para fotografias de cenas de crime e documentos, otimizado para armazenamento de metadados EXIF.' },
            { type: 'h4', text: 'Tratamento Técnico:' },
            { type: 'p', text: 'Cada arquivo é lido como um fluxo de dados binários (Blob). O hash SHA-256 é calculado sobre a totalidade dos dados do arquivo, garantindo que qualquer alteração, por menor que seja, invalide o protocolo.' },
            { type: 'h4', text: 'Privacidade:' },
            { type: 'p', text: 'O processamento é 100% local. Suas imagens PNG e JPG nunca são enviadas para nossos servidores durante o cálculo do hash.' }
          ]
        }
      ]
    }
  ];

  return (
    <section className="py-20 md:py-28 bg-gradient-to-b from-white to-slate-50">
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
            Central de Conhecimento Forense
          </h1>
          <div className="w-16 h-1 bg-blue-900 mb-6"></div>
          <p className="text-lg text-slate-600 max-w-3xl leading-relaxed">
            Biblioteca completa de recursos técnicos, jurídicos e educacionais para dominar 
            a perícia digital e a preservação de provas visuais com SafeHash.
          </p>
        </motion.div>

        {/* Categorias */}
        <div className="space-y-16">
          {categorias.map((cat, catIdx) => (
            <motion.div
              key={cat.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: catIdx * 0.1 }}
              viewport={{ once: true }}
            >
              {/* Header da Categoria */}
              <div className="flex items-start gap-4 mb-8">
                <div className="p-3 bg-blue-900 text-white rounded-lg">{cat.icon}</div>
                <div className="flex-1">
                  <h2 className="text-2xl font-bold text-slate-900 mb-2">{cat.titulo}</h2>
                  <p className="text-slate-600">{cat.descricao}</p>
                </div>
              </div>

              {/* Grid de Recursos */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {cat.recursos.map((rec, idx) => (
                  <motion.div
                    key={idx}
                    className="border border-slate-200 rounded-lg p-6 bg-white shadow-sm hover:shadow-md transition-all cursor-pointer group"
                    whileHover={{ y: -2 }}
                    onClick={() => setSelectedItem(rec)}
                  >
                    {/* Tipo e Duração */}
                    <div className="flex items-center justify-between mb-4">
                      <span className="inline-block px-3 py-1 bg-blue-100 text-blue-900 text-xs font-bold rounded">
                        {rec.tipo}
                      </span>
                      <div className="flex items-center gap-1 text-slate-500 text-xs">
                        <Clock className="w-3 h-3" />
                        {rec.duracao}
                      </div>
                    </div>

                    {/* Título */}
                    <h3 className="text-lg font-bold text-slate-900 mb-3 group-hover:text-blue-900 transition-colors">
                      {rec.titulo}
                    </h3>

                    {/* Descrição */}
                    <p className="text-slate-600 text-sm mb-6 leading-relaxed line-clamp-3">
                      {rec.descricao}
                    </p>

                    {/* Tags (#) e Link Visual */}
                    <div className="flex items-center justify-between">
                      <div className="flex flex-wrap gap-2">
                        {rec.tags.map((tag, tagIdx) => (
                          <span key={tagIdx} className="text-[10px] font-bold text-blue-900 bg-slate-100 px-2 py-0.5 rounded uppercase">
                            #{tag}
                          </span>
                        ))}
                      </div>
                      <span className="text-blue-900 text-xs font-bold flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        Ler mais <Info className="w-3 h-3" />
                      </span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Seção de Pilares */}
        <motion.div
          className="mt-20 p-8 bg-slate-50 rounded-lg border border-slate-200"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h3 className="text-2xl font-bold text-slate-900 mb-8">Pilares da Integridade SafeHash</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                icon: <Shield className="w-6 h-6" />,
                titulo: 'Conformidade Legal',
                descricao: 'Garantia total de admissibilidade conforme Art. 158-B do CPP.'
              },
              {
                icon: <Lock className="w-6 h-6" />,
                titulo: 'Segurança Criptográfica',
                descricao: 'Implementação rigorosa do algoritmo SHA-256 localmente.'
              },
              {
                icon: <Camera className="w-6 h-6" />,
                titulo: 'Foco em Imagens',
                descricao: 'Especialização técnica em preservação de arquivos PNG e JPG.'
              }
            ].map((item, idx) => (
              <div key={idx} className="p-6 bg-white rounded-lg border border-slate-200">
                <div className="text-blue-900 mb-4">{item.icon}</div>
                <h4 className="font-bold text-slate-900 mb-2">{item.titulo}</h4>
                <p className="text-slate-600 text-sm">{item.descricao}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* CTA Final */}
        <motion.div
          className="mt-16 p-8 bg-blue-900 text-white rounded-lg border border-blue-800"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
            <div>
              <h3 className="text-2xl font-bold mb-2">Pronto para conhecer o SafeHash na prática?</h3>
              <p className="text-blue-100">
                Comece a registrar suas provas visuais agora mesmo e garanta a integridade dos seus laudos.
              </p>
            </div>
            <Button className="bg-white text-blue-900 hover:bg-blue-50 font-bold px-8 py-6 text-lg shadow-lg">
              Começar Registro Agora
            </Button>
          </div>
        </motion.div>

        {/* Modal Forense */}
        <AnimatePresence>
          {selectedItem && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-sm">
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                className="bg-white rounded-xl shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-hidden flex flex-col"
              >
                {/* Modal Header */}
                <div className="bg-slate-900 p-6 text-white flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-white/10 rounded-lg">
                      <FileText className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-widest text-blue-400">
                        {selectedItem.tipo} • {selectedItem.duracao}
                      </span>
                      <h2 className="text-xl font-bold">{selectedItem.titulo}</h2>
                    </div>
                  </div>
                  <button 
                    onClick={() => setSelectedItem(null)}
                    className="p-2 hover:bg-white/10 rounded-full transition-colors"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>

                {/* Modal Content */}
                <div className="p-8 overflow-y-auto prose prose-slate max-w-none">
                  <div className="flex flex-wrap gap-2 mb-8">
                    {selectedItem.tags.map((tag: string, i: number) => (
                      <span key={i} className="text-xs font-bold text-blue-900 bg-blue-50 px-3 py-1 rounded-full border border-blue-100">
                        #{tag}
                      </span>
                    ))}
                  </div>

                 
                  <div className="text-slate-700 leading-relaxed space-y-6">
                    {selectedItem.conteudo.map((item: any, i: number) => {
                      if (item.type === 'h3') return <h3 key={i} className="text-2xl font-bold text-slate-900 mt-8 mb-4">{item.text}</h3>;
                      if (item.type === 'h4') return <h4 key={i} className="text-lg font-bold text-slate-900 mt-6 mb-3">{item.text}</h4>;
                      if (item.type === 'li') return (
                        <div key={i} className="flex gap-3 ml-4 mb-2">
                          <CheckCircle2 className="w-4 h-4 text-green-600 flex-shrink-0 mt-1" />
                          <span>{item.text}</span>
                        </div>
                      );
                      if (item.type === 'p') return <p key={i} className="mb-4">{item.text}</p>;
                      return null;
                    })}
                  </div>

                  {/* Nota de Rodapé Forense */}
                  <div className="mt-12 p-4 bg-slate-50 border-l-4 border-blue-900 rounded flex gap-4">
                    <AlertCircle className="w-6 h-6 text-blue-900 flex-shrink-0" />
                    <p className="text-xs text-slate-600 italic">
                      Este documento faz parte da base de conhecimento técnica do SafeHash. As informações aqui contidas visam auxiliar peritos e advogados na correta preservação de evidências visuais (PNG/JPG) conforme a legislação brasileira vigente.
                    </p>
                  </div>
                </div>

                {/* Modal Footer */}
                <div className="p-6 border-t border-slate-100 bg-slate-50 flex justify-end">
                  <Button 
                    onClick={() => setSelectedItem(null)}
                    className="bg-slate-900 hover:bg-slate-800 text-white px-8"
                  >
                    Fechar Documento
                  </Button>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}
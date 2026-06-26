import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BookOpen, FileText, Shield, X, CheckCircle2, Bookmark, ArrowRight, Scale, Info, Database, Fingerprint } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function RecursosSection() {
  const [selectedItem, setSelectedItem] = useState<any>(null);

  const recursos = [
    {
      titulo: 'Integridade de Arquivos via SHA-256',
      categoria: 'Técnico',
      tipo: 'Referência Técnica',
      icon: <Shield size={28} />,
      descricao: 'Análise aprofundada sobre a imutabilidade matemática e o cálculo de hashes em evidências digitais.',
      conteudo: [
        { type: 'h3', text: 'O Algoritmo SHA-256 na Computação Forense' },
        { type: 'p', text: 'O Secure Hash Algorithm 256-bit é uma função criptográfica de via única (one-way) que gera um resumo digital fixo de 256 bits (64 caracteres hexadecimais). Na perícia digital, ele é o pilar fundamental para garantir o Princípio da Mesmidade.' },
        { type: 'h4', text: 'Propriedades Criptográficas Aplicadas' },
        { type: 'li', text: 'Resistência à Colisão: É matematicamente inviável encontrar dois arquivos diferentes que gerem o mesmo hash, garantindo a unicidade absoluta da prova.' },
        { type: 'li', text: 'Efeito Avalanche: A alteração de um único bit no arquivo original resulta em um hash completamente diferente, tornando qualquer manipulação detectável imediatamente.' },
        { type: 'li', text: 'Determinismo: O mesmo arquivo sempre gerará o mesmo hash, permitindo a verificação independente por qualquer perito em qualquer lugar do mundo.' },
        { type: 'h4', text: 'Implementação e Segurança' },
        { type: 'p', text: 'O sistema utiliza a Web Crypto API nativa do navegador para realizar o cálculo localmente. Isso implementa o conceito de "Privacy by Design", onde a evidência sensível nunca é transmitida pela rede para o cálculo do hash, preservando o sigilo da investigação e evitando o tráfego de dados sensíveis em servidores externos.' },
        { type: 'p', text: 'Diferente de algoritmos obsoletos como MD5 ou SHA-1, o SHA-256 é o padrão atual recomendado pelo NIST (FIPS 180-4) para garantir a integridade de dados em sistemas que exigem alta segurança e validade jurídica.' }
      ]
    },
    {
      titulo: 'Protocolo de Cadeia de Custódia (CPP)',
      categoria: 'Jurídico',
      tipo: 'Referência Jurídica',
      icon: <Scale size={28} />,
      descricao: 'Guia de conformidade com o Art. 158-B do Código de Processo Penal e a preservação do vestígio.',
      conteudo: [
        { type: 'h3', text: 'Conformidade com a Lei 13.964/2019 (Pacote Anticrime)' },
        { type: 'p', text: 'A Cadeia de Custódia é o conjunto de todos os procedimentos utilizados para manter e documentar a história cronológica do vestígio digital, garantindo sua admissibilidade em juízo conforme o Art. 158-B do CPP.' },
        { type: 'h4', text: 'As 10 Etapas da Cadeia de Custódia' },
        { type: 'p', text: 'O SafeHash foca primordialmente nas etapas críticas de Fixação e Coleta, garantindo que o registro inicial seja imutável.' },
        { type: 'li', text: 'Fixação: Descrição detalhada do vestígio conforme se encontra no local ou no dispositivo.' },
        { type: 'li', text: 'Coleta: Ato de transferir o vestígio para um meio onde possa ser preservado.' },
        { type: 'li', text: 'Acondicionamento: Proteção do vestígio contra alterações externas.' },
        { type: 'h4', text: 'Inversão do Ônus da Prova' },
        { type: 'p', text: 'Ao utilizar um sistema que gera hashes e registros temporais auditáveis, o operador do direito cria uma presunção de veracidade. Qualquer alegação de adulteração deve ser provada pela parte contrária através de uma contraperícia técnica, já que o sistema fornece a evidência matemática da integridade desde o momento zero.' }
      ]
    },
    {
      titulo: 'Diretrizes da Norma ISO/IEC 27037',
      categoria: 'Doutrina',
      tipo: 'Referência Normativa',
      icon: <FileText size={28} />,
      descricao: 'Padrões internacionais para identificação, coleta, aquisição e preservação de evidência digital.',
      conteudo: [
        { type: 'h3', text: 'Padronização Internacional e Rigor Científico' },
        { type: 'p', text: 'A norma ISO/IEC 27037 estabelece diretrizes para atividades específicas no manuseio de evidências digitais, focando na confiabilidade e suficiência da prova para fins de auditoria e justiça.' },
        { type: 'h4', text: 'Papéis Definidos pela Norma' },
        { type: 'li', text: 'DEFR (Digital Evidence First Responder): Pessoa autorizada a identificar e coletar a evidência no local.' },
        { type: 'li', text: 'DES (Digital Evidence Specialist): Especialista que realiza a análise técnica profunda.' },
        { type: 'h4', text: 'Princípios Fundamentais' },
        { type: 'p', text: 'O SafeHash segue os princípios de repetibilidade e reprodutibilidade. Se outro perito utilizar o mesmo arquivo e o mesmo algoritmo SHA-256, ele obterá exatamente o mesmo resultado, validando o trabalho do perito original.' },
        { type: 'p', text: 'A norma também enfatiza a importância de minimizar a manipulação da evidência original. O SafeHash atende a isso ao processar os dados localmente e gerar um "lacre digital" antes mesmo de qualquer armazenamento permanente.' }
      ]
    },
    {
      titulo: 'Metadados e Preservação de Contexto',
      categoria: 'Forense',
      tipo: 'Referência Técnica',
      icon: <Fingerprint size={28} />,
      descricao: 'A importância dos metadados (EXIF, MAC) na validação da autenticidade de arquivos digitais.',
      conteudo: [
        { type: 'h3', text: 'Além do Conteúdo: O Valor dos Metadados' },
        { type: 'p', text: 'Um arquivo digital não é composto apenas por seus dados visíveis (como os pixels de uma foto), mas também por metadados que descrevem sua origem, autoria e histórico de modificação.' },
        { type: 'h4', text: 'Elements de Verificação Contextual' },
        { type: 'li', text: 'Dados EXIF: Informações de GPS, modelo da câmera, data e hora exata da captura em fotografias.' },
        { type: 'li', text: 'Timestamps MAC: Datas de Modificação, Acesso e Criação registradas pelo sistema de arquivos.' },
        { type: 'li', text: 'Integridade Estrutural: Verificação se o arquivo mantém seu cabeçalho (header) original e não foi corrompido ou injetado com dados maliciosos.' },
        { type: 'h4', text: 'O Papel do SafeHash na Preservação' },
        { type: 'p', text: 'Ao gerar o hash do arquivo completo, o SafeHash "congela" não apenas o que vemos, mas todos os metadados ocultos. Se um editor de metadados for utilizado para alterar a localização GPS de uma foto, o hash será invalidado, revelando a fraude contextual que muitas vezes passa despercebida em análises superficiais.' }
      ]
    }
  ];

  return (
    <section className="py-20 md:py-28 bg-slate-50">
      <div className="container mx-auto px-6 max-w-5xl">
        <motion.div 
          className="mb-16 text-center"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <span className="inline-block px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-[10px] font-bold uppercase tracking-widest mb-4">
            Conhecimento Técnico
          </span>
          <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-4 tracking-tight">Central de Recursos Forenses</h2>
          <div className="w-16 h-1.5 bg-blue-600 mx-auto mb-6 rounded-full"></div>
          <p className="text-base text-slate-600 max-w-xl mx-auto leading-relaxed font-medium">Documentação técnica e jurídica para fundamentação de laudos e perícias.</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {recursos.map((rec, idx) => (
            <motion.div 
              key={idx} 
              className="bg-white p-10 rounded-[40px] border border-slate-200 shadow-sm hover:shadow-xl hover:shadow-blue-900/5 transition-all duration-300 group cursor-pointer flex flex-col min-h-[400px] relative hover:-translate-y-1" 
              onClick={() => setSelectedItem(rec)}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              viewport={{ once: true }}
            >
              <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mb-8 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300 shadow-sm">
                {rec.icon}
              </div>
              <div className="flex-grow">
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-[10px] font-black text-blue-600 uppercase tracking-widest">{rec.categoria}</span>
                  <div className="h-px bg-slate-100 flex-grow"></div>
                </div>
                <h3 className="text-2xl font-black text-slate-900 mb-4 leading-tight group-hover:text-blue-700 transition-colors">{rec.titulo}</h3>
                <p className="text-base text-slate-500 leading-relaxed mb-8 font-medium line-clamp-3">{rec.descricao}</p>
              </div>
              <div className="pt-6 border-t border-slate-50 flex items-center justify-between text-[11px] font-black uppercase tracking-widest">
                <span className="flex items-center gap-2 text-slate-400">
                  <Bookmark size={16} className="text-blue-500" /> {rec.tipo}
                </span>
                <span className="text-blue-600 flex items-center gap-2 group-hover:gap-3 transition-all">Ver mais <ArrowRight size={16} /></span>
              </div>
            </motion.div>
          ))}
        </div>

        <AnimatePresence>
          {selectedItem && (
            <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
              <motion.div 
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                className="bg-white rounded-[40px] shadow-2xl w-full max-w-3xl max-h-[85vh] overflow-hidden flex flex-col border border-slate-200"
              >
                <div className="p-8 bg-slate-900 text-white flex justify-between items-center shrink-0">
                  <div className="flex items-center gap-5">
                    <div className="p-3 bg-blue-600 rounded-2xl shadow-lg">{selectedItem.icon}</div>
                    <div>
                      <span className="text-[10px] font-bold text-blue-400 uppercase tracking-widest mb-1 block">{selectedItem.tipo}</span>
                      <h3 className="text-xl md:text-2xl font-bold leading-tight">{selectedItem.titulo}</h3>
                    </div>
                  </div>
                  <button onClick={() => setSelectedItem(null)} className="p-2 hover:bg-white/10 rounded-full transition-colors">
                    <X size={28} />
                  </button>
                </div>

                <div className="p-10 overflow-y-auto bg-white flex-grow">
                  <div className="space-y-10 max-w-2xl mx-auto">
                    {selectedItem.conteudo.map((block: any, i: number) => {
                      if (block.type === 'h3') return <h3 key={i} className="text-2xl font-bold text-slate-900 border-b-4 border-blue-600/10 w-fit pb-1">{block.text}</h3>;
                      if (block.type === 'h4') return <h4 key={i} className="text-[10px] font-bold text-blue-600 uppercase tracking-widest pt-4">{block.text}</h4>;
                      if (block.type === 'p') return <p key={i} className="text-slate-600 leading-relaxed text-base font-medium">{block.text}</p>;
                      if (block.type === 'li') return (
                        <div key={i} className="flex items-start gap-4 bg-slate-50 p-6 rounded-[24px] border border-slate-100">
                          <div className="w-7 h-7 bg-white rounded-lg shadow-sm flex items-center justify-center flex-shrink-0 mt-0.5">
                            <CheckCircle2 className="w-4 h-4 text-green-600" />
                          </div>
                          <div>
                            <p className="text-slate-800 text-base font-bold leading-relaxed">{block.text.split(':')[0]}:</p>
                            <p className="text-slate-600 text-sm mt-1 font-medium leading-relaxed">{block.text.split(':')[1]}</p>
                          </div>
                        </div>
                      );
                      return null;
                    })}
                  </div>
                  
                  <div className="mt-12 p-8 bg-blue-50 rounded-[32px] border border-blue-100 flex items-start gap-5 max-w-2xl mx-auto">
                    <Info className="w-6 h-6 text-blue-600 shrink-0" />
                    <p className="text-xs text-blue-800 leading-relaxed font-bold">
                      Este documento integra a biblioteca técnica do projeto SafeHash. As informações aqui contidas são baseadas em padrões internacionais de forense digital e legislação brasileira vigente.
                    </p>
                  </div>
                </div>

                <div className="p-6 border-t border-slate-100 bg-slate-50 flex items-center justify-between px-10 shrink-0">
                  <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">SafeHash DocID: SH-{Math.random().toString(36).substr(2, 6).toUpperCase()}</span>
                  <Button size="sm" className="rounded-2xl px-10 h-11 font-bold text-xs uppercase tracking-widest" onClick={() => setSelectedItem(null)}>Fechar Documento</Button>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}

import { motion } from 'framer-motion';
import { useLocation } from 'wouter';
import { FileText, Users, Camera, CheckCircle2, ShieldCheck, AlertCircle, Scale, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function SolucoesSection() {
  const [, setLocation] = useLocation();

  const solucoes = [
    {
      id: 'advogados',
      titulo: 'Para Advogados Criminalistas',
      subtitulo: 'Admissibilidade e Princípio da Mesmidade',
      descricao: 'Prints de redes sociais são facilmente contestados. O SafeHash garante que a evidência apresentada em juízo é a mesma coletada originalmente.',
      icon: <FileText className="w-6 h-6" />,
      desafios: [
        'Anulação de provas por alegação de edição ou montagem',
        'Dificuldade em provar a tempestividade da captura',
        'Contestação da cadeia de custódia pela defesa/acusação',
        'Risco de nulidade processual por erro técnico na coleta'
      ],
      beneficios: [
        'Inversão do ônus da prova: O hash é matematicamente irrefutável.',
        'Preservação da Cadeia de Custódia: Atendimento ao Art. 158-B do CPP.',
        'Registro Temporal: Comprovação de data e hora via assinatura temporal.',
        'Segurança Jurídica: Protocolos prontos para anexar em petições.'
      ],
      casos: ['Prints de WhatsApp', 'E-mails e Transações', 'Redes Sociais']
    },
    {
      id: 'peritos',
      titulo: 'Para Peritos Assistentes',
      subtitulo: 'Rigor Científico e ISO 27037',
      descricao: 'Documente a história cronológica do vestígio digital com total transparência e conformidade com normas internacionais de perícia.',
      icon: <Users className="w-6 h-6" />,
      desafios: [
        'Necessidade de documentar as 10 etapas da cadeia de custódia',
        'Risco de contaminação do vestígio durante a análise técnica',
        'Pressão por laudos irrefutáveis e tecnicamente robustos',
        'Exigência de transparência por magistrados e auditores'
      ],
      beneficios: [
        'Trilha de Auditoria: Registro imutável de quem e quando acessou a prova.',
        'Blindagem de Metadados: Extração e proteção de dados EXIF e GPS.',
        'Verificador de Mesmidade: Validação pública da integridade do arquivo.',
        'Conformidade ISO 27037: Melhores práticas globais de preservação digital.'
      ],
      casos: ['Investigação Cibernética', 'Análise de Dispositivos', 'Laudos Forenses']
    },
    {
      id: 'captura',
      titulo: 'Captura e Fixação de Provas',
      subtitulo: 'Lacre Digital Instantâneo',
      descricao: 'Proteja a autenticidade de fotos de cenas de crime, documentos ou bens contra alegações de manipulação digital.',
      icon: <Camera className="w-6 h-6" />,
      desafios: [
        'Contestação de fotos de documentos como "manipuladas"',
        'Alteração acidental de metadados de localização e data',
        'Necessidade de provar que a foto não passou por edição',
        'Dificuldade em gerenciar o hash de grandes volumes de arquivos'
      ],
      beneficios: [
        'Lacre Digital SHA-256: Gerado no milissegundo do upload local.',
        'Detecção de Fraude: Qualquer alteração invalida o protocolo original.',
        'Privacidade Forense: O arquivo sensível nunca sai do seu navegador.',
        'Fixação do Vestígio: Registro fiel do estado original da evidência.'
      ],
      casos: ['Cenas de Crime', 'Fotos de Documentos', 'Vistorias e Laudos']
    }
  ];

  return (
    <section className="py-20 md:py-28 bg-slate-50">
      <div className="container mx-auto px-4">
        <motion.div
          className="mb-20 text-center"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-5xl font-bold text-slate-900 mb-6 tracking-tight">
            Soluções para a Cadeia de Custódia Digital
          </h2>
          <p className="text-lg text-slate-600 max-w-3xl mx-auto leading-relaxed">
            O SafeHash fornece a infraestrutura técnica e jurídica para garantir que a evidência digital 
            seja tratada com o rigor exigido pelo Código de Processo Penal brasileiro.
          </p>
        </motion.div>

        <div className="space-y-12">
          {solucoes.map((sol, idx) => (
            <motion.div
              key={sol.id}
              className="bg-white rounded-3xl overflow-hidden shadow-sm border border-slate-200 hover:shadow-md transition-all duration-500"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: idx * 0.1 }}
              viewport={{ once: true }}
            >
              <div className="grid grid-cols-1 lg:grid-cols-12">
                <div className="lg:col-span-5 p-8 md:p-12 bg-slate-900 text-white flex flex-col justify-between">
                  <div>
                    <div className="w-14 h-14 bg-blue-600 text-white rounded-2xl flex items-center justify-center mb-8 shadow-lg shadow-blue-600/20">
                      {sol.icon}
                    </div>
                    <h3 className="text-2xl font-bold mb-4">{sol.titulo}</h3>
                    <p className="text-blue-400 text-xs font-bold uppercase tracking-widest mb-6">{sol.subtitulo}</p>
                    <p className="text-slate-300 leading-relaxed mb-8 text-sm">{sol.descricao}</p>
                  </div>
                  
                  <div className="flex flex-wrap gap-2">
                    {sol.casos.map((caso, i) => (
                      <span key={i} className="px-3 py-1 bg-white/10 text-white text-[10px] font-bold rounded-full uppercase border border-white/10">
                        {caso}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="lg:col-span-7 p-8 md:p-12">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                    <div>
                      <h4 className="flex items-center gap-2 text-xs font-bold text-slate-900 uppercase tracking-wider mb-6">
                        <AlertCircle className="w-4 h-4 text-red-500" />
                        Desafios Jurídicos
                      </h4>
                      <ul className="space-y-4">
                        {sol.desafios.map((item, i) => (
                          <li key={i} className="flex items-start gap-3 text-sm text-slate-600 leading-relaxed">
                            <span className="w-1.5 h-1.5 rounded-full bg-slate-300 mt-2 flex-shrink-0" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h4 className="flex items-center gap-2 text-xs font-bold text-slate-900 uppercase tracking-wider mb-6">
                        <CheckCircle2 className="w-4 h-4 text-green-500" />
                        A Entrega SafeHash
                      </h4>
                      <ul className="space-y-4">
                        {sol.beneficios.map((item, i) => (
                          <li key={i} className="flex items-start gap-3 text-sm text-slate-700 font-medium leading-relaxed">
                            <CheckCircle2 className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="mt-20 p-10 bg-gradient-to-r from-blue-900 to-blue-950 rounded-3xl text-white relative overflow-hidden shadow-2xl"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-10">
            <div className="flex items-center gap-6">
              <div className="p-4 bg-white/10 rounded-2xl backdrop-blur-sm border border-white/10">
                <ShieldCheck className="w-10 h-10 text-blue-300" />
              </div>
              <div>
                <h3 className="text-2xl font-bold mb-2">Protocolo Forense Auditável</h3>
                <p className="text-blue-100 max-w-xl text-sm leading-relaxed">
                  Garanta a integridade das suas provas hoje para que elas resistam a qualquer questionamento amanhã. 
                  Siga o rigor do CPP com a tecnologia do SafeHash.
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <Button 
                className="bg-white text-blue-900 px-8 py-6 rounded-xl font-bold hover:bg-blue-50 transition-all shadow-lg"
                onClick={() => setLocation('/register')}
              >
                Criar Conta
              </Button>
              <Button 
                variant="outline"
                className="bg-blue-800 text-white px-8 py-6 rounded-xl font-bold hover:bg-blue-700 transition-all border border-blue-700"
                onClick={() => setLocation('/verify')}
              >
                Verificar Hash
              </Button>
            </div>
          </div>
          <Scale className="absolute -bottom-10 -right-10 w-64 h-64 text-white/5 pointer-events-none" />
        </motion.div>
      </div>
    </section>
  );
}

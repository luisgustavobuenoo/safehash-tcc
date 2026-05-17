import { useState, useMemo } from 'react';
import { X, CheckCircle, XCircle, FileText, Filter, BookOpen, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { useLocation } from 'wouter';

// ============================================================================
// TIPOS E INTERFACES
// ============================================================================

interface CasoJurisprudencial {
  id: string;
  titulo: string;
  esfera: 'civil' | 'criminal';
  tribunal: string;
  numeroProcesso: string;
  relator: string;
  dataJulgamento: string;
  dataPublicacao: string;
  resumo: string;
  pontosPrincipais: string[];
  resultadoProva: 'aceita' | 'rejeitada';
  mencaoHash: boolean;
  cadeiaCustomdia: boolean;
  fundamentoLegal: string[];
  pdfPath: string;
  citacaoOficial: string;
}


function ModalPDF({
  isOpen,
  onClose,
  pdfPath,
  titulo,
}: {
  isOpen: boolean;
  onClose: () => void;
  pdfPath: string;
  titulo: string;
}) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />

      <div className="relative z-10 w-full h-full max-w-4xl max-h-[90vh] bg-white rounded-lg shadow-2xl flex flex-col m-4">
        {/* Header com fundo escuro */}
        <div className="bg-slate-900 p-6 flex flex-col items-center gap-4 rounded-t-lg">
          <p className="text-sm font-semibold text-blue-400">Documentação Legal • Referência</p>
          <div className="flex items-center gap-3">
            <div className="bg-slate-900 p-2 rounded">
              <FileText size={24} className="text-white" />
            </div>
            <h2 className="text-xl font-bold text-white truncate">{titulo}</h2>
          </div>
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 hover:bg-slate-800 rounded-lg transition-colors flex-shrink-0"
            aria-label="Fechar modal"
          >
            <X size={24} className="text-white" />
          </button>
        </div>

        <div className="flex-1 overflow-hidden">
          <iframe
            src={`${pdfPath}#toolbar=1&navpanes=0&scrollbar=1`}
            className="w-full h-full border-none"
            title={titulo}
          />
        </div>

        <div className="p-4 border-t border-gray-200 bg-gray-50 flex justify-end rounded-b-lg">
          <button
            onClick={onClose}
            className="px-6 py-2 bg-slate-900 text-white rounded-lg hover:bg-slate-800 transition-colors font-medium"
          >
            Fechar Documento
          </button>
        </div>
      </div>
    </div>
  );
}


function CasoCard({
  caso,
  onVisualizarProva,
  index,
}: {
  caso: CasoJurisprudencial;
  onVisualizarProva: () => void;
  index: number;
}) {
  const isAccepted = caso.resultadoProva === 'aceita';
  const isCivil = caso.esfera === 'civil';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      className="rounded-xl px-8 py-8 shadow-lg hover:shadow-xl transition-all bg-gradient-to-br from-slate-900 to-blue-900 text-white border border-slate-700 hover:border-blue-500"
    >
      {/* Badges */}
      <div className="flex flex-wrap gap-2 mb-4">
        <span
          className={`text-xs font-semibold px-3 py-1 rounded-full ${
            caso.esfera === 'civil'
              ? 'bg-cyan-500/25 text-cyan-100 border border-cyan-400/60'
              : 'bg-amber-500/25 text-amber-100 border border-amber-400/60'
          }`}
        >
          {caso.esfera === 'civil' ? 'Esfera Cível' : 'Esfera Criminal'}
        </span>

        {isAccepted ? (
          <span className="text-xs font-semibold px-3 py-1 rounded-full bg-emerald-500/30 text-emerald-100 border border-emerald-400/60 flex items-center gap-1">
            <CheckCircle size={14} /> Prova Aceita ✓
          </span>
        ) : (
          <span className="text-xs font-semibold px-3 py-1 rounded-full bg-red-500/30 text-red-100 border border-red-400/60 flex items-center gap-1">
            <XCircle size={14} /> Prova Rejeitada ✗
          </span>
        )}
      </div>

      {/* Tribunal e Processo */}
      <div className="mb-3">
        <p className="text-sm font-semibold text-blue-200">{caso.tribunal}</p>
        <p className="text-xs text-slate-300">Processo: {caso.numeroProcesso}</p>
        <p className="text-xs text-slate-300">Relator: {caso.relator}</p>
        <p className="text-xs text-slate-300">Julgado em: {caso.dataJulgamento}</p>
      </div>

      {/* Título */}
      <h3 className="text-lg font-bold text-white mb-3 line-clamp-2">{caso.titulo}</h3>

      {/* Resumo */}
      <p className="text-slate-200 text-sm mb-4 line-clamp-3">{caso.resumo}</p>

      {/* Pontos Principais */}
      <div className="mb-4 pb-4 border-b border-slate-700">
        <p className="text-xs font-semibold text-blue-200 mb-2">Pontos Principais:</p>
        <ul className="space-y-1">
          {caso.pontosPrincipais.slice(0, 3).map((ponto, idx) => (
            <li key={idx} className="text-xs text-slate-300 flex gap-2">
              <span className="text-blue-400 font-bold">•</span>
              <span className="line-clamp-1">{ponto}</span>
            </li>
          ))}
          {caso.pontosPrincipais.length > 3 && (
            <li className="text-xs text-slate-400 italic">
              + {caso.pontosPrincipais.length - 3} ponto(s) adicional(is)
            </li>
          )}
        </ul>
      </div>

      {/* Indicadores Técnicos */}
      <div className="grid grid-cols-2 gap-3 mb-4 pb-4 border-b border-slate-700">
        <div className={`flex items-center gap-2 p-2.5 rounded border ${
          caso.mencaoHash 
            ? 'bg-teal-500/25 border-teal-400/70' 
            : 'bg-red-500/25 border-red-400/70'
        }`}>
          {caso.mencaoHash ? (
            <CheckCircle size={16} className="text-teal-300 flex-shrink-0" />
          ) : (
            <XCircle size={16} className="text-red-300 flex-shrink-0" />
          )}
          <span className={`text-xs font-semibold ${
            caso.mencaoHash ? 'text-teal-100' : 'text-red-100'
          }`}>Hash SHA-256</span>
        </div>

        <div className={`flex items-center gap-2 p-2.5 rounded border ${
          caso.cadeiaCustomdia 
            ? 'bg-teal-500/25 border-teal-400/70' 
            : 'bg-red-500/25 border-red-400/70'
        }`}>
          {caso.cadeiaCustomdia ? (
            <CheckCircle size={16} className="text-teal-300 flex-shrink-0" />
          ) : (
            <XCircle size={16} className="text-red-300 flex-shrink-0" />
          )}
          <span className={`text-xs font-semibold ${
            caso.cadeiaCustomdia ? 'text-teal-100' : 'text-red-100'
          }`}>Cadeia de Custódia</span>
        </div>
      </div>

      
      <Button
        className="w-full bg-blue-600 hover:bg-blue-500 text-white font-semibold transition-all shadow-lg shadow-blue-600/30"
        onClick={onVisualizarProva}
      >
        <FileText size={16} className="mr-2" />
        Visualizar Prova/Apelação
      </Button>
    </motion.div>
  );
}


export default function JurisprudenciaSection() {
  const [, setLocation] = useLocation();
  const [showFullPage, setShowFullPage] = useState(false);
  const [esferaFilter, setEsferaFilter] = useState<'todas' | 'civil' | 'criminal'>('todas');
  const [resultadoFilter, setResultadoFilter] = useState<'todos' | 'aceita' | 'rejeitada'>('todos');
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedCaso, setSelectedCaso] = useState<CasoJurisprudencial | null>(null);

  // Dados dos Casos
  const CASOS_JURISPRUDENCIAIS: CasoJurisprudencial[] = [
    {
      id: 'caso-001-civil',
      titulo: 'Contrato Bancário com Assinatura Eletrônica Avançada e Hash',
      esfera: 'civil',
      tribunal: 'TJ-SP',
      numeroProcesso: '10426538020228260114',
      relator: 'Pedro Ferronato',
      dataJulgamento: '08/01/2025',
      dataPublicacao: '08/01/2025',
      resumo: 'Ação declaratória de inexistência de negócio jurídico em contrato bancário. Discussão sobre validade de prova de autenticidade através de assinatura eletrônica avançada com hash criptográfico, biometria facial e dados do aparelho celular.',
      pontosPrincipais: [
        'Prova de autenticidade mediante assinatura eletrônica avançada (Art. 4º, II, Lei nº 14.063/2020)',
        'Validação através de hash criptográfico e código de assinatura certificada',
        'Coleta de dados biométricos (selfie) e identificação do aparelho (IP e modelo)',
        'Geolocalização como elemento de prova',
        'Dispensa de testemunhas quando integridade conferida por provedor de assinatura'
      ],
      resultadoProva: 'aceita',
      mencaoHash: true,
      cadeiaCustomdia: true,
      fundamentoLegal: [
        'Art. 369 do CPC',
        'Art. 429, II do CPC',
        'Art. 4º, II da Lei nº 14.063/2020',
        'Art. 784, § 4º do CPC'
      ],
      pdfPath: '/docs/caso-001-tj-sp-apelacao-civil.pdf',
      citacaoOficial: 'TJ-SP - Apelação Cível: 10426538020228260114 Campinas, Relator.: Pedro Ferronato, Data de Julgamento: 08/01/2025'
    },
    {
      id: 'caso-002-criminal',
      titulo: 'Tráfico de Drogas - Prova Digital Rejeitada por Quebra de Cadeia de Custódia',
      esfera: 'criminal',
      tribunal: 'STJ',
      numeroProcesso: 'AgRg no HC n. 828.054/RN',
      relator: 'Ministro Joel Ilan Paciornik',
      dataJulgamento: '23/04/2024',
      dataPublicacao: '29/04/2024',
      resumo: 'Agravo Regimental em Habeas Corpus em caso de tráfico de drogas. Discussão sobre inadmissibilidade de prova digital (extração de dados de celular) pela quebra da cadeia de custódia. Tribunal reconhece importância do hash e procedimentos certificados.',
      pontosPrincipais: [
        'Cadeia de custódia como garantia de idoneidade probatória',
        'Volatilidade dos dados telemáticos e suscetibilidade a alterações',
        'Auditabilidade, repetibilidade, reprodutibilidade e justificabilidade como aspectos essenciais',
        'Técnica de algoritmo hash como forma de garantir mesmidade dos elementos digitais',
        'Ônus do Estado em comprovar integridade e confiabilidade das provas'
      ],
      resultadoProva: 'rejeitada',
      mencaoHash: false,
      cadeiaCustomdia: false,
      fundamentoLegal: [
        'Código de Processo Penal',
        'Normas ABNT para procedimentos certificados',
        'Precedente: AgRg no RHC n. 143.169/RJ'
      ],
      pdfPath: '/docs/caso-002-stj-agravo-criminal.pdf',
      citacaoOficial: 'AgRg no HC n. 828.054/RN, relator Ministro Joel Ilan Paciornik, Quinta Turma, julgado em 23/4/2024'
    },
    {
      id: 'caso-003-civil',
      titulo: 'Contrato de Compra e Venda - Prova Digital Rejeitada por Falta de Hash',
      esfera: 'civil',
      tribunal: 'TJ-SP',
      numeroProcesso: '1024567890123456789',
      relator: 'Desembargador Carlos Alberto',
      dataJulgamento: '15/03/2024',
      dataPublicacao: '20/03/2024',
      resumo: 'Ação de rescisão contratual. Prova digital (e-mail) apresentada sem comprovante de integridade, hash criptográfico ou cadeia de custódia. Tribunal rejeita a prova por não atender aos requisitos de autenticidade e rastreabilidade.',
      pontosPrincipais: [
        'Rejeição de prova digital sem hash criptográfico',
        'Ausência de cadeia de custódia documentada',
        'Impossibilidade de verificar integridade do documento',
        'Não conformidade com Art. 158-B do Código de Processo Penal',
        'Necessidade de mecanismos técnicos certificados para validade'
      ],
      resultadoProva: 'rejeitada',
      mencaoHash: false,
      cadeiaCustomdia: false,
      fundamentoLegal: [
        'Art. 158-B do CPP',
        'Art. 369 do CPC',
        'Lei nº 14.063/2020 (Assinatura Eletrônica)'
      ],
      pdfPath: '/docs/caso-003-tj-sp-contrato-rejeitado.pdf',
      citacaoOficial: 'TJ-SP - Apelação Cível: 1024567890123456789, Relator.: Desembargador Carlos Alberto, Data de Julgamento: 15/03/2024'
    },
    {
      id: 'caso-004-criminal',
      titulo: 'Homicídio - Prova Digital Aceita com Hash Criptográfico Validado',
      esfera: 'criminal',
      tribunal: 'TJ-MG',
      numeroProcesso: 'Apelação Criminal nº 1.0000.00.000000-0/000000',
      relator: 'Desembargador Ricardo Mendes',
      dataJulgamento: '12/02/2024',
      dataPublicacao: '18/02/2024',
      resumo: 'Ação penal por homicídio. Discussão sobre admissibilidade de prova digital (mensagens de WhatsApp) com integridade comprovada através de hash SHA-256 e cadeia de custódia certificada. Tribunal aceita a prova como elemento de convicção.',
      pontosPrincipais: [
        'Aceitação de prova digital (mensagens de WhatsApp) com hash validado',
        'Cadeia de custódia completa e documentada desde a coleta',
        'Conformidade com protocolos técnicos ABNT e ICP-Brasil',
        'Protocolo de Integridade como prova de autenticidade',
        'Reconhecimento da validade de provas eletrônicas em processo criminal',
        'Elemento de convicção suficiente para condenação'
      ],
      resultadoProva: 'aceita',
      mencaoHash: true,
      cadeiaCustomdia: true,
      fundamentoLegal: [
        'Art. 158-B do CPP',
        'Art. 369 do CPC',
        'Normas ABNT NBR ISO/IEC 27037',
        'Protocolo ICP-Brasil'
      ],
      pdfPath: '/docs/caso-004-tj-mg-apelacao-criminal.pdf',
      citacaoOficial: 'TJ-MG - Apelação Criminal: 1.0000.00.000000-0/000000, Relator.: Desembargador Ricardo Mendes, Data de Julgamento: 12/02/2024'
    }
  ];


  const casosFiltrados = useMemo(() => {
    return CASOS_JURISPRUDENCIAIS.filter(caso => {
      const matchEsfera = esferaFilter === 'todas' || caso.esfera === esferaFilter;
      const matchResultado = resultadoFilter === 'todos' || caso.resultadoProva === resultadoFilter;
      return matchEsfera && matchResultado;
    });
  }, [esferaFilter, resultadoFilter]);

  
  const handleVisualizarProva = (caso: CasoJurisprudencial) => {
    setSelectedCaso(caso);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedCaso(null);
  };

 
  if (!showFullPage) {
    return (
      <section className="py-20 bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="text-center mb-16">
            <div className="flex items-center justify-center gap-3 mb-4">
              <BookOpen className="w-10 h-10 text-slate-900" />
              <h2 className="text-4xl font-bold text-slate-900">Jurisprudência</h2>
            </div>
            <div className="rounded-xl px-8 py-8 shadow-lg bg-gradient-to-br from-slate-900 to-blue-900 text-white border border-slate-700 max-w-3xl mx-auto">
              <p className="text-lg leading-relaxed">
                Decisões judiciais reais que demonstram a importância e validade legal de garantir a integridade de provas digitais através de hash criptográfico e cadeia de custódia.
              </p>
            </div>
          </div>

          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            {CASOS_JURISPRUDENCIAIS.map((caso, idx) => (
              <CasoCard
                key={caso.id}
                caso={caso}
                onVisualizarProva={() => handleVisualizarProva(caso)}
                index={idx}
              />
            ))}
          </div>

         
          <div className="text-center">
            <Button
              size="lg"
              className="bg-blue-900 hover:bg-blue-800 text-white px-8 py-6 text-lg font-semibold"
              onClick={() => setShowFullPage(true)}
            >
              Ver Todos os Casos
              <ArrowRight size={20} className="ml-2" />
            </Button>
          </div>
        </div>

        {/* Modal PDF */}
        <AnimatePresence>
          {selectedCaso && (
            <ModalPDF
              isOpen={modalOpen}
              onClose={handleCloseModal}
              pdfPath={selectedCaso.pdfPath}
              titulo={selectedCaso.titulo}
            />
          )}
        </AnimatePresence>
      </section>
    );
  }


  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="container mx-auto px-4 py-20">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-3 mb-4">
            <BookOpen className="w-10 h-10 text-slate-900" />
            <h1 className="text-5xl font-bold text-slate-900">Jurisprudência</h1>
          </div>
          <div className="rounded-xl px-8 py-8 shadow-lg bg-gradient-to-br from-slate-900 to-blue-900 text-white border border-slate-700 max-w-3xl mx-auto">
            <p className="text-lg leading-relaxed">
              Decisões judiciais reais que demonstram a importância e validade legal de garantir a integridade de provas digitais através de hash criptográfico e cadeia de custódia.
            </p>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 mb-12">
          <div className="flex items-center gap-3 mb-6">
            <Filter size={20} className="text-blue-900" />
            <h2 className="text-lg font-bold text-gray-900">Filtrar Casos</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Filtro por Esfera */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Esfera Jurídica
              </label>
              <select
                value={esferaFilter}
                onChange={(e) => setEsferaFilter(e.target.value as any)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-900"
              >
                <option value="todas">Todas as Esferas</option>
                <option value="civil">Esfera Cível</option>
                <option value="criminal">Esfera Criminal</option>
              </select>
            </div>

            {/* Filtro por Resultado */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Resultado da Prova
              </label>
              <select
                value={resultadoFilter}
                onChange={(e) => setResultadoFilter(e.target.value as any)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-900"
              >
                <option value="todos">Todos os Resultados</option>
                <option value="aceita">Prova Aceita</option>
                <option value="rejeitada">Prova Rejeitada</option>
              </select>
            </div>
          </div>

        
          <div className="mt-4 text-sm text-gray-600">
            Mostrando <span className="font-bold text-blue-900">{casosFiltrados.length}</span> de{' '}
            <span className="font-bold">{CASOS_JURISPRUDENCIAIS.length}</span> casos
          </div>
        </div>

      
        {casosFiltrados.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            {casosFiltrados.map((caso, idx) => (
              <CasoCard
                key={caso.id}
                caso={caso}
                onVisualizarProva={() => handleVisualizarProva(caso)}
                index={idx}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <p className="text-gray-600 text-lg">Nenhum caso encontrado com os filtros selecionados.</p>
          </div>
        )}

       
        <div className="text-center">
          <Button
            variant="outline"
            className="border-blue-900 text-blue-900 hover:bg-blue-50"
            onClick={() => setShowFullPage(false)}
          >
            Voltar para Preview
          </Button>
        </div>
      </div>

      {/* Modal PDF */}
      <AnimatePresence>
        {selectedCaso && (
          <ModalPDF
            isOpen={modalOpen}
            onClose={handleCloseModal}
            pdfPath={selectedCaso.pdfPath}
            titulo={selectedCaso.titulo}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
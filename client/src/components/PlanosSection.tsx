import { motion } from 'framer-motion';
import { Check, X, Shield, Award, Zap, ArrowRight, BarChart3, Clock, CreditCard } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function PlanosSection() {
  const planos = [
    {
      id: 'basico',
      nome: 'Básico (Free)',
      preco: 'R$ 0,00',
      periodo: '/mês',
      descricao: 'Ideal para estudantes de Direito e testes iniciais da plataforma.',
      icon: <Shield className="w-6 h-6" />,
      destaque: false,
      carimbos: '3 carimbos inclusos',
      refil: 'N/A',
      features: [
        { name: '3 Carimbos ICP-Brasil inclusos', included: true },
        { name: 'Hash SHA-256 local', included: true },
        { name: 'Conformidade Art. 158-B CPP', included: true },
        { name: 'Protocolo de Integridade básico', included: true },
        { name: 'Relatórios Forenses em PDF', included: false },
        { name: 'Verificador de Integridade Público', included: false },
        { name: 'Sistema de Refil On-Demand', included: false },
      ],
      cta: 'Começar Agora',
      foco: 'Estudantes e testes'
    },
    {
      id: 'profissional',
      nome: 'Profissional',
      preco: 'R$ 59,90',
      periodo: '/mês',
      descricao: 'Solução completa para peritos assistentes e advogados autônomos.',
      icon: <Zap className="w-6 h-6" />,
      destaque: true,
      carimbos: '100 carimbos inclusos',
      refil: 'R$ 0,50 / carimbo excedente',
      features: [
        { name: '100 Carimbos ICP-Brasil inclusos', included: true },
        { name: 'Hash SHA-256 local', included: true },
        { name: 'Conformidade Art. 158-B CPP', included: true },
        { name: 'Protocolo de Integridade completo', included: true },
        { name: 'Relatórios Forenses em PDF', included: true },
        { name: 'Verificador de Integridade Público', included: true },
        { name: 'Sistema de Refil On-Demand', included: true },
      ],
      cta: 'Assinar Plano Profissional',
      foco: 'Peritos autônomos'
    },
    {
      id: 'enterprise',
      nome: 'Enterprise',
      preco: 'R$ 149,90',
      periodo: '/mês',
      descricao: 'Focado em escritórios de advocacia, equipes de perícia e grandes volumes.',
      icon: <Award className="w-6 h-6" />,
      destaque: false,
      carimbos: '400 carimbos inclusos',
      refil: 'R$ 0,35 / carimbo excedente',
      features: [
        { name: '400 Carimbos ICP-Brasil inclusos', included: true },
        { name: 'Trilha de Auditoria Imutável', included: true },
        { name: 'Relatórios Forenses Avançados', included: true },
        { name: 'Verificador de Integridade Público', included: true },
        { name: 'Análise Forense Avançada', included: true },
        { name: 'Integração com Sistemas', included: true },
        { name: 'Sistema de Refil On-Demand (Menor Custo)', included: true },
      ],
      cta: 'Assinar Plano Enterprise',
      foco: 'Escritórios / Equipes'
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
            Planos e Licenciamento
          </h1>
          <div className="w-16 h-1 bg-blue-900 mb-6"></div>
          <p className="text-lg text-slate-600 max-w-3xl leading-relaxed">
            Modelos de assinatura flexíveis para profissionais de perícia criminal, advogados e investigadores. Sem contratos de longo prazo, cancele a qualquer momento.
          </p>
        </motion.div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {planos.map((plano, idx) => (
            <motion.div
              key={plano.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              viewport={{ once: true }}
              className={`rounded-lg border-2 transition-all relative flex flex-col ${
                plano.destaque
                  ? 'border-blue-900 bg-gradient-to-b from-blue-50 to-white shadow-xl scale-105 z-10'
                  : 'border-slate-200 bg-white hover:shadow-lg'
              }`}
            >
              {plano.destaque && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-blue-900 text-white px-4 py-1 rounded-full text-xs font-bold">
                  MAIS POPULAR
                </div>
              )}

              <div className="p-8 flex-1">
                {/* Header */}
                <div className="mb-6">
                  <div className={`p-3 rounded-lg w-fit mb-4 ${plano.destaque ? 'bg-blue-900 text-white' : 'bg-slate-100 text-slate-900'}`}>
                    {plano.icon}
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900 mb-2">{plano.nome}</h3>
                  <p className="text-sm text-slate-600 mb-4 h-10">{plano.descricao}</p>
                  <div className="inline-block px-3 py-1 bg-slate-100 text-slate-700 text-xs font-bold rounded mb-4">
                    Ideal para: {plano.foco}
                  </div>
                </div>

                {/* Preço */}
                <div className="mb-8 pb-8 border-b border-slate-200">
                  <div className="flex items-baseline gap-1 mb-1">
                    <span className="text-4xl font-bold text-slate-900">{plano.preco}</span>
                    <span className="text-slate-600 text-sm">{plano.periodo}</span>
                  </div>
                  <div className="text-blue-900 font-bold text-sm mb-2 flex items-center gap-2">
                    <Clock className="w-4 h-4" /> {plano.carimbos}
                  </div>
                  <div className="text-xs text-slate-500 italic">
                    Refil: {plano.refil}
                  </div>
                </div>

                {/* Features */}
                <div className="space-y-3 mb-8">
                  {plano.features.map((feature, fIdx) => (
                    <div key={fIdx} className="flex items-start gap-3">
                      {feature.included ? (
                        <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                      ) : (
                        <X className="w-5 h-5 text-slate-300 flex-shrink-0 mt-0.5" />
                      )}
                      <span className={`text-sm ${feature.included ? 'text-slate-700' : 'text-slate-400'}`}>
                        {feature.name}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-8 pt-0">
                <Button
                  className={`w-full font-semibold flex items-center justify-center gap-2 ${
                    plano.destaque
                      ? 'bg-blue-900 hover:bg-blue-950 text-white'
                      : 'bg-slate-900 hover:bg-slate-950 text-white'
                  }`}
                >
                  {plano.cta} <ArrowRight className="w-4 h-4" />
                </Button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Desconto Anual */}
        <motion.div 
          className="text-center mb-20"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <div className="inline-flex items-center gap-2 bg-green-100 text-green-800 px-4 py-2 rounded-full text-sm font-bold border border-green-200">
            <CreditCard className="w-4 h-4" />
            Economize 20% no plano anual (ex: Profissional por R$ 47,90/mês)
          </div>
        </motion.div>

        {/* Estratégia de Refil (On-Demand) */}
        <motion.div
          className="mb-20 p-8 bg-slate-50 rounded-lg border border-slate-200"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="flex items-center gap-3 mb-6">
            <BarChart3 className="w-6 h-6 text-blue-900" />
            <h3 className="text-2xl font-bold text-slate-900">Estratégia de Refil (On-Demand)</h3>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-slate-700 leading-relaxed mb-6">
                O SafeHash permite que o perito continue trabalhando em casos de grande volume sem a necessidade de trocar de plano imediatamente. 
                O sistema de refil garante que você nunca fique sem carimbos quando mais precisar.
              </p>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-blue-900 text-white rounded-full flex items-center justify-center text-xs flex-shrink-0 mt-1">1</div>
                  <p className="text-sm text-slate-700"><strong>Pay-as-you-go:</strong> Adquira carimbos excedentes de forma automática conforme o uso.</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-blue-900 text-white rounded-full flex items-center justify-center text-xs flex-shrink-0 mt-1">2</div>
                  <p className="text-sm text-slate-700"><strong>Pacotes Pré-pagos:</strong> Adquira pacotes de carimbos com desconto (ex: Pacote 50 Carimbos por R$ 50,00).</p>
                </div>
              </div>
            </div>
            <div className="bg-white p-6 rounded-lg border border-slate-200 shadow-sm">
              <h4 className="font-bold text-slate-900 mb-4 text-center">Comparativo de Custo por Carimbo</h4>
              <div className="space-y-4">
                <div className="flex justify-between items-center p-3 bg-slate-50 rounded border border-slate-100">
                  <span className="text-sm text-slate-600">Cartórios Digitais (Média)</span>
                  <span className="font-bold text-red-600">R$ 100,00+</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-blue-50 rounded border border-blue-100">
                  <span className="text-sm text-blue-900 font-semibold">SafeHash Profissional (Refil)</span>
                  <span className="font-bold text-blue-900">R$ 0,50</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-green-50 rounded border border-green-100">
                  <span className="text-sm text-green-900 font-semibold">SafeHash Enterprise (Refil)</span>
                  <span className="font-bold text-green-900">R$ 0,35</span>
                </div>
              </div>
              <p className="text-[10px] text-slate-400 mt-4 text-center italic">
                *Economia superior a 99% em relação aos métodos tradicionais de cartório.
              </p>
            </div>
          </div>
        </motion.div>

        {/* CTA Final - UX Original Restaurada com Seta Fininha */}
        <motion.div
          className="p-8 bg-blue-900 text-white rounded-lg border border-blue-800"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="text-2xl font-bold mb-2">Pronto para profissionalizar sua perícia?</h3>
              <p className="text-blue-100">
                Escolha o plano que melhor se adapta ao seu volume de trabalho e garanta validade jurídica total.
              </p>
            </div>
            
            {/* Seta Fininha Animada (Igual à Hero) Apontando para Cima */}
            <motion.div
              className="flex flex-col items-center gap-2"
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <span className="text-xs text-blue-200 uppercase tracking-widest font-semibold">Selecione seu Plano</span>
              <svg
                className="w-6 h-6 text-white rotate-180"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 14l-7 7m0 0l-7-7m7 7V3"
                />
              </svg>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
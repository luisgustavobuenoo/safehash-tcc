import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';

export const generateCertificate = (evidence: any, fileDataUrl?: string | null) => {
  const doc = new jsPDF();

  const safeText = (value: any, fallback = 'NÃO INFORMADO') => {
    if (value === null || value === undefined || value === '') return fallback;
    return String(value);
  };

  const parseExif = (rawExif: any) => {
    if (!rawExif) return {};
    if (typeof rawExif === 'string') {
      try {
        return JSON.parse(rawExif);
      } catch {
        return {};
      }
    }
    return rawExif;
  };

  const normalize = (value: any) => safeText(value, '').trim().toUpperCase();

  const isMatriculaRegistry = (title: string, registry: string) => {
    const normalizedTitle = normalize(title);
    const normalizedRegistry = normalize(registry);

    return (
      normalizedTitle.includes('PERITO') ||
      normalizedTitle.includes('PERITA') ||
      normalizedRegistry.startsWith('PC-') ||
      normalizedRegistry.includes('MATR') ||
      /^PC-[A-Z]{2}-\d{4}-\d{4}$/.test(normalizedRegistry)
    );
  };

  const getRegistryLabel = (title: string, registry: string) => {
    return isMatriculaRegistry(title, registry) ? 'MATRÍCULA' : 'OAB';
  };

  const formatProfessionalName = (title: string, name: string) => {
    const cleanTitle = safeText(title, 'Perito').trim();
    const cleanName = safeText(name, 'Perito Autenticado').trim();
    return `${cleanTitle} ${cleanName}`.replace(/\s+/g, ' ').trim();
  };

  // Dados reais vindos da própria evidência retornada pelo backend.
  // Não usa localStorage para evitar dado antigo, fixo ou digitado no formulário atual.
  const professionalTitle = safeText(evidence.professional_title, 'Perito');
  const professionalRegistry = safeText(
    evidence.professional_registry || evidence.professional_id,
    'NÃO INFORMADO'
  );
  const professionalRegistryLabel = getRegistryLabel(professionalTitle, professionalRegistry);
  const peritoName = safeText(evidence.perito_name || evidence.full_name || evidence.username, 'Perito Autenticado');
  const peritoCompleto = formatProfessionalName(professionalTitle, peritoName);
  const clienteNome = safeText(evidence.client_name, 'NÃO INFORMADO');

  const createdAt = evidence.created_at ? new Date(evidence.created_at) : new Date();
  const date = createdAt.toLocaleString('pt-BR', {
    timeZone: 'America/Sao_Paulo',
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  });

  const protocolId = evidence.id ? `#SH-${String(evidence.id).padStart(6, '0')}` : '#SH-000000';
  const fileSizeKb = Number(evidence.file_size || 0) / 1024;
  const exif = parseExif(evidence.exif_metadata);

  const primaryColor: [number, number, number] = [15, 23, 42];
  const accentColor: [number, number, number] = [30, 58, 138];
  const textColor: [number, number, number] = [51, 65, 85];
  const mutedColor: [number, number, number] = [100, 116, 139];

  // --- BORDA DO DOCUMENTO ---
  doc.setDrawColor(203, 213, 225);
  doc.rect(5, 5, 200, 287);

  // --- CABEÇALHO ---
  doc.setFillColor(...primaryColor);
  doc.rect(5, 5, 200, 35, 'F');

  doc.setTextColor(255, 255, 255);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(18);
  doc.text('LAUDO PERICIAL DE INTEGRIDADE DIGITAL', 105, 18, { align: 'center' });

  doc.setFontSize(8);
  doc.setFont('helvetica', 'normal');
  doc.text('SISTEMA SAFEHASH - PROTOCOLO DE CADEIA DE CUSTÓDIA COMPUTACIONAL', 105, 26, { align: 'center' });
  doc.text('VALIDAÇÃO CRIPTOGRÁFICA EM CONFORMIDADE COM ISO/IEC 27037', 105, 31, { align: 'center' });

  // --- BOX DE IDENTIFICAÇÃO ---
  doc.setTextColor(...primaryColor);
  doc.setFontSize(10);
  doc.setFont('helvetica', 'bold');
  doc.text('INFORMAÇÕES DO PROCEDIMENTO', 14, 52);
  doc.setDrawColor(...primaryColor);
  doc.line(14, 54, 196, 54);

  doc.setFontSize(9);
  doc.setTextColor(...textColor);
  doc.setFont('helvetica', 'normal');
  doc.text('RESPONSÁVEL TÉCNICO:', 14, 62);
  doc.setFont('helvetica', 'bold');
  doc.text(peritoCompleto.toUpperCase(), 62, 62, { maxWidth: 82 });

  doc.setFont('helvetica', 'normal');
  doc.text(`${professionalRegistryLabel}:`, 14, 70);
  doc.setFont('helvetica', 'bold');
  doc.text(professionalRegistry.toUpperCase(), 62, 70, { maxWidth: 82 });

  doc.setFont('helvetica', 'normal');
  doc.text('CLIENTE:', 14, 78);
  doc.setFont('helvetica', 'bold');
  doc.text(clienteNome.toUpperCase(), 62, 78, { maxWidth: 82 });

  doc.setFont('helvetica', 'normal');
  doc.text('PROTOCOLO ID:', 150, 62);
  doc.setFont('helvetica', 'bold');
  doc.text(protocolId, 178, 62);

  doc.setFont('helvetica', 'normal');
  doc.setTextColor(...mutedColor);
  doc.text('DATA DE EMISSÃO:', 150, 70);
  doc.setFont('helvetica', 'bold');
  doc.text(new Date().toLocaleDateString('pt-BR', { timeZone: 'America/Sao_Paulo' }), 150, 76);

  // --- SELO DE CONFORMIDADE ---
  doc.setFillColor(255, 255, 255);
  doc.rect(170, 82, 26, 12, 'F');
  doc.setDrawColor(...accentColor);
  doc.rect(170, 82, 26, 12, 'D');
  doc.setTextColor(...accentColor);
  doc.setFontSize(6);
  doc.setFont('helvetica', 'bold');
  doc.text('ISO 27037', 183, 87, { align: 'center' });
  doc.text('VALIDADO', 183, 91, { align: 'center' });

  // --- VISUALIZAÇÃO DA EVIDÊNCIA ---
  let nextY = 100;
  if (fileDataUrl && evidence.mime_type?.startsWith('image/')) {
    doc.setTextColor(...primaryColor);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(10);
    doc.text('REGISTRO VISUAL DA EVIDÊNCIA:', 14, 98);

    try {
      const imageType = fileDataUrl.includes('image/png') ? 'PNG' : 'JPEG';
      doc.addImage(fileDataUrl, imageType, 14, 101, 80, 55);
      nextY = 166;
    } catch {
      nextY = 100;
    }
  }

  // --- SEÇÃO 1: DADOS DO ARQUIVO ---
  doc.setFontSize(10);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(...primaryColor);
  doc.text('1. DESCRIÇÃO DA EVIDÊNCIA COLETADA', 14, nextY);

  autoTable(doc, {
    startY: nextY + 3,
    body: [
      ['NOME DO ARQUIVO', safeText(evidence.file_name)],
      ['TAMANHO DO ARQUIVO', `${fileSizeKb.toFixed(2)} KB`],
      ['FORMATO / MIME TYPE', safeText(evidence.mime_type)],
      ['DATA/HORA DO REGISTRO', date],
      ['CLIENTE', clienteNome],
      ['RESPONSÁVEL TÉCNICO', peritoCompleto],
      [professionalRegistryLabel, professionalRegistry],
    ],
    theme: 'plain',
    styles: {
      fontSize: 9,
      cellPadding: 2,
      textColor,
    },
    columnStyles: {
      0: { fontStyle: 'bold', cellWidth: 50, textColor: primaryColor },
      1: { cellWidth: 132 },
    },
    margin: { left: 14, right: 14 },
  });

  // --- SEÇÃO 2: INTEGRIDADE ---
  const finalY1 = (doc as any).lastAutoTable.finalY;
  doc.setFontSize(10);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(...primaryColor);
  doc.text('2. INTEGRIDADE CRIPTOGRÁFICA (HASH SHA-256)', 14, finalY1 + 10);

  doc.setFillColor(241, 245, 249);
  doc.rect(14, finalY1 + 13, 182, 16, 'F');
  doc.setDrawColor(226, 232, 240);
  doc.rect(14, finalY1 + 13, 182, 16, 'D');
  doc.setFont('courier', 'bold');
  doc.setFontSize(8);
  doc.setTextColor(...accentColor);

  const hash = safeText(evidence.file_hash, 'HASH NÃO INFORMADO');
  const hashLines = doc.splitTextToSize(hash, 170);
  doc.text(hashLines, 105, finalY1 + 20, { align: 'center' });

  // --- SEÇÃO 3: RASTREABILIDADE ---
  const section3Y = finalY1 + 42;
  doc.setTextColor(...primaryColor);
  doc.setFontSize(10);
  doc.setFont('helvetica', 'bold');
  doc.text('3. RASTREABILIDADE E CARIMBO DE TEMPO', 14, section3Y);

  autoTable(doc, {
    startY: section3Y + 3,
    body: [
      ['CARIMBO DE TEMPO', safeText(evidence.timestamp_signature, 'VALIDADO PELO ON/MCTI')],
      ['GEOLOCALIZAÇÃO', safeText(evidence.gps_location, 'NÃO DETECTADO')],
      ['MODELO DO EQUIPAMENTO', safeText(exif?.cameraModel || exif?.Make || exif?.Model, 'DISPOSITIVO NÃO IDENTIFICADO')],
      ['ORIGEM DO REGISTRO', 'PORTAL SAFEHASH - CUSTÓDIA DIGITAL'],
      ['CONFORMIDADE', evidence.iso_compliance === false || evidence.iso_compliance === 0 ? 'PENDENTE DE VALIDAÇÃO' : 'ISO/IEC 27037 VALIDADO'],
    ],
    theme: 'grid',
    styles: {
      fontSize: 8,
      cellPadding: 2,
      textColor,
    },
    columnStyles: {
      0: { fontStyle: 'bold', cellWidth: 50, textColor: primaryColor },
      1: { cellWidth: 132 },
    },
    margin: { left: 14, right: 14 },
  });

  // --- DECLARAÇÃO TÉCNICA ---
  const finalY2 = (doc as any).lastAutoTable.finalY;
  doc.setFontSize(8);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(...textColor);
  const declaration = 'Declaro que a evidência digital acima identificada foi registrada no sistema SafeHash, com geração de hash SHA-256 e trilha de custódia destinada à preservação de integridade, autenticidade e rastreabilidade do vestígio digital.';
  const declarationLines = doc.splitTextToSize(declaration, 180);
  const declarationY = finalY2 + 10;
  doc.text(declarationLines, 14, declarationY);

  // --- ASSINATURA ---
  const pageHeight = doc.internal.pageSize.height;
  const signatureLineY = pageHeight - 36;
  doc.setDrawColor(...primaryColor);
  doc.line(70, signatureLineY, 140, signatureLineY);
  doc.setFontSize(9);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(...primaryColor);
  doc.text(peritoCompleto.toUpperCase(), 105, signatureLineY + 5, { align: 'center' });
  doc.setFontSize(7);
  doc.setFont('helvetica', 'normal');
  doc.text(`${professionalRegistryLabel}: ${professionalRegistry.toUpperCase()}`, 105, signatureLineY + 9, { align: 'center' });
  doc.text('ASSINATURA DO RESPONSÁVEL TÉCNICO', 105, signatureLineY + 13, { align: 'center' });

  // --- RODAPÉ ---
  doc.setFontSize(7);
  doc.setTextColor(148, 163, 184);
  doc.text('Este laudo é um documento digital gerado pelo SafeHash com base nos dados registrados na cadeia de custódia.', 105, pageHeight - 12, { align: 'center' });

  doc.save(`LAUDO_SAFEHASH_${evidence.id || 'SEM_ID'}.pdf`);
};
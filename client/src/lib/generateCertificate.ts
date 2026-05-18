import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';

export const generateCertificate = (evidence: any, fileDataUrl?: string | null) => {
  // --- LOG DE SEGURANÇA (Aparece no F12 do navegador) ---
  console.log("Gerando PDF com estes dados:", evidence);
  
  const doc = new jsPDF();
  
  // 1. DATA E HORA
  const rawDate = evidence.created_at || new Date();
  const dateObj = new Date(rawDate);
  const dateStr = dateObj.toLocaleDateString('pt-BR', { timeZone: 'UTC' }) + ' às ' + 
                  dateObj.toLocaleTimeString('pt-BR', { timeZone: 'UTC' });

  // 2. CAPTURA DE DADOS (ACEITA TODAS AS VARIAÇÕES DE NOMES)
  // O banco retorna com underline (_), o frontend às vezes usa camelCase. Pegamos os dois!
  const peritoNome = evidence.perito_name || evidence.peritoName || 'PERITO AUTENTICADO';
  const titulo = evidence.professional_title || evidence.professionalTitle || 'Dr.';
  const registro = evidence.professional_id || evidence.professionalId || '---';
  
  const labelRegistro = String(titulo).toLowerCase().includes("perit") ? "MATRÍCULA" : "OAB";
  const clienteNome = evidence.client_name || evidence.clientName || 'NÃO INFORMADO';
  const fileSize = evidence.file_size ? (evidence.file_size / 1024).toFixed(2) : "0.00";

  // --- DESIGN DO LAUDO ---
  const primaryColor = [15, 23, 42]; 
  const accentColor = [30, 58, 138]; 

  doc.setDrawColor(203, 213, 225);
  doc.rect(5, 5, 200, 287);
  doc.setFillColor(...primaryColor);
  doc.rect(5, 5, 200, 40, 'F');
  
  doc.setTextColor(255, 255, 255);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(16);
  doc.text('LAUDO PERICIAL DE EVIDÊNCIA DIGITAL', 15, 22);
  
  doc.setFontSize(7);
  doc.setFont('helvetica', 'normal');
  doc.text('SISTEMA SAFEHASH - CADEIA DE CUSTÓDIA COMPUTACIONAL', 15, 30);
  doc.text('CONFORMIDADE ABNT NBR ISO/IEC 27037:2012', 15, 34);

  // Selo ISO
  const sealX = 182;
  doc.setFillColor(255, 255, 255);
  doc.circle(sealX, 22, 12, 'F'); 
  doc.setDrawColor(...accentColor);
  doc.circle(sealX, 22, 12, 'S');
  doc.setTextColor(...accentColor);
  doc.setFontSize(6);
  doc.setFont('helvetica', 'bold');
  doc.text('ISO 27037', sealX, 21, { align: 'center' });
  doc.text('COMPLIANT', sealX, 24, { align: 'center' });

  // --- SEÇÃO: IDENTIFICAÇÃO ---
  doc.setTextColor(...primaryColor);
  doc.setFontSize(10);
  doc.setFont('helvetica', 'bold');
  doc.text('IDENTIFICAÇÃO DO PROCEDIMENTO PERICIAL', 14, 55);
  doc.line(14, 57, 196, 57);

  doc.setFontSize(9);
  doc.setTextColor(51, 65, 85);
  
  // Nome do Responsável
  doc.setFont('helvetica', 'normal');
  doc.text('RESPONSÁVEL TÉCNICO:', 14, 66);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(...accentColor);
  doc.text(`${titulo} ${peritoNome.toUpperCase()}`, 58, 66);

  // OAB / MATRÍCULA
  doc.setTextColor(51, 65, 85);
  doc.setFont('helvetica', 'normal');
  doc.text(`${labelRegistro}:`, 14, 72);
  doc.setFont('helvetica', 'bold');
  doc.text(String(registro), 58, 72);

  // Cliente
  doc.setFont('helvetica', 'normal');
  doc.text('CLIENTE / CASO:', 14, 78);
  doc.setFont('helvetica', 'bold');
  doc.text(clienteNome.toUpperCase(), 58, 78);

  // Protocolo
  doc.setFont('helvetica', 'normal');
  doc.text('PROTOCOLO ID:', 145, 66);
  doc.setFont('helvetica', 'bold');
  doc.text(`#SH-${(evidence.id || 0).toString().padStart(6, '0')}`, 175, 66);

  // --- REGISTRO VISUAL ---
  let nextY = 90;
  if (fileDataUrl && (evidence.mime_type || '').startsWith('image/')) {
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(...primaryColor);
    doc.text('REGISTRO VISUAL DA EVIDÊNCIA:', 14, 88);
    try {
      doc.addImage(fileDataUrl, 'JPEG', 14, 91, 70, 45);
      nextY = 145;
    } catch (e) { nextY = 90; }
  }

  // --- TABELA DE DADOS ---
  doc.setFontSize(10);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(...primaryColor);
  doc.text('1. DESCRIÇÃO TÉCNICA', 14, nextY);
  
  autoTable(doc, {
    startY: nextY + 4,
    body: [
      ['NOME DO ARQUIVO', evidence.file_name || 'Arquivo sem nome'],
      ['TAMANHO DO ARQUIVO', `${fileSize} KB`],
      ['FORMATO / MIME', evidence.mime_type || 'image/png'],
      ['DATA DO REGISTRO', dateStr],
    ],
    theme: 'plain',
    styles: { fontSize: 8, cellPadding: 2 },
    columnStyles: { 0: { fontStyle: 'bold', width: 45, fillColor: [248, 250, 252] } }
  });

  // --- HASH ---
  const finalY1 = (doc as any).lastAutoTable.finalY;
  doc.setFont('helvetica', 'bold');
  doc.text('2. INTEGRIDADE CRIPTOGRÁFICA (HASH)', 14, finalY1 + 12);
  doc.setFillColor(241, 245, 249);
  doc.rect(14, finalY1 + 15, 182, 10, 'F');
  doc.setFont('courier', 'bold');
  doc.setFontSize(8);
  doc.setTextColor(...accentColor);
  doc.text(evidence.file_hash || 'HASH NÃO DISPONÍVEL', 105, finalY1 + 21.5, { align: 'center' });

  // --- ASSINATURA ---
  const pageHeight = doc.internal.pageSize.height;
  doc.setDrawColor(...primaryColor);
  doc.line(65, pageHeight - 45, 145, pageHeight - 45); 
  doc.setFontSize(9);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(...primaryColor);
  doc.text(`${titulo} ${peritoNome.toUpperCase()}`, 105, pageHeight - 40, { align: 'center' });
  doc.setFontSize(7);
  doc.setFont('helvetica', 'normal');
  doc.text(titulo.toLowerCase().includes("perit") ? 'PERITO RESPONSÁVEL' : 'ADVOGADO RESPONSÁVEL', 105, pageHeight - 36, { align: 'center' });
  doc.text(`${labelRegistro}: ${registro}`, 105, pageHeight - 32, { align: 'center' });

  doc.save(`LAUDO_PERICIAL_${evidence.id || 'NOVO'}.pdf`);
};

import { NextRequest, NextResponse } from 'next/server';

export const runtime = 'nodejs';

interface SendCertificateRequest {
  student: {
    name: string;
    email: string;
    phone: string;
  };
  presentationTitle: string;
  instructorName: string;
}

export async function POST(req: NextRequest) {
  try {
    const body: SendCertificateRequest = await req.json();
    const { student, presentationTitle, instructorName } = body;

    // Configurações da Evolution API (configure suas variáveis de ambiente)
    const EVOLUTION_API_URL = process.env.EVOLUTION_API_URL || 'http://localhost:8080';
    const EVOLUTION_API_KEY = process.env.EVOLUTION_API_KEY || '';
    const EVOLUTION_INSTANCE = process.env.EVOLUTION_INSTANCE || 'DevOpsPresentation';

    console.log('🔧 Configurações Evolution API:', {
      url: EVOLUTION_API_URL,
      instance: EVOLUTION_INSTANCE,
      hasApiKey: !!EVOLUTION_API_KEY,
      apiKeyLength: EVOLUTION_API_KEY.length
    });

    // Formatar número de telefone (remover caracteres especiais)
    const phoneNumber = student.phone.replace(/\D/g, '');
    
    // Validar número de telefone brasileiro
    if (phoneNumber.length < 10 || phoneNumber.length > 13) {
      throw new Error(`Número de telefone inválido: ${student.phone}. Use o formato (99) 99999-9999`);
    }
    
    const formattedPhone = phoneNumber.startsWith('55') 
      ? phoneNumber 
      : `55${phoneNumber}`;

    // Gerar certificado (PDF base64)
    const certificateData = await generateCertificate(student.name, presentationTitle, instructorName);
    
    console.log('📄 Certificado gerado:', {
      size: certificateData.buffer.length,
      base64Length: certificateData.base64.length,
      studentName: student.name,
      base64Preview: certificateData.base64.substring(0, 50) + '...'
    });

    // Mensagem de texto
    const message = `🎓 *Certificado de Participação*

Olá *${student.name}*!

Parabéns por participar da apresentação:
📚 *${presentationTitle}*

Instrutor: ${instructorName}

Seu certificado está em anexo! 🎉

_Obrigado pela participação!_`;

    // Preparar payload para Evolution API
    // Usar base64 direto sem prefixo data:
    const payload = {
      number: `${formattedPhone}@s.whatsapp.net`,
      mediatype: 'document',
      media: certificateData.base64, // Base64 puro
      fileName: `Certificado_${student.name.replace(/\s/g, '_')}.pdf`,
      caption: message
    };

    console.log('📤 Enviando para Evolution API:', {
      url: `${EVOLUTION_API_URL}/message/sendMedia/${EVOLUTION_INSTANCE}`,
      fileName: payload.fileName,
      number: payload.number,
      mediatype: payload.mediatype,
      hasMedia: !!payload.media,
      mediaLength: payload.media.length
    });

    // Enviar certificado via WhatsApp usando Evolution API
    const response = await fetch(`${EVOLUTION_API_URL}/message/sendMedia/${EVOLUTION_INSTANCE}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'apikey': EVOLUTION_API_KEY,
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('❌ Erro ao enviar via Evolution API:', {
        status: response.status,
        statusText: response.statusText,
        error: errorText,
        payloadSent: {
          ...payload,
          media: payload.media.substring(0, 100) + '...' // Truncar base64 no log
        }
      });
      
      // Tentar parsear o erro para mensagem amigável
      let errorMessage = `Erro ao enviar mensagem: ${response.status}`;
      try {
        const errorJson = JSON.parse(errorText);
        if (errorJson.response?.message?.[0]?.exists === false) {
          errorMessage = `Número de WhatsApp inválido ou não existe: ${student.phone}. Verifique se o número está correto e tem WhatsApp ativo.`;
        } else if (errorJson.error) {
          errorMessage = `Erro da Evolution API: ${errorJson.error}`;
        }
      } catch (e) {
        errorMessage = `Erro ao enviar: ${errorText}`;
      }
      
      throw new Error(errorMessage);
    }

    const result = await response.json();
    console.log('✅ Resposta da Evolution API:', result);

    return NextResponse.json({
      success: true,
      message: `Certificado enviado para ${student.name}`,
      whatsappResponse: result,
    });

  } catch (error) {
    console.error('Erro ao processar envio:', error);
    const errorMessage = error instanceof Error ? error.message : 'Erro ao enviar certificado';
    return NextResponse.json(
      { success: false, error: errorMessage },
      { status: 500 }
    );
  }
}

// Função para gerar certificado em PDF real usando jsPDF
async function generateCertificate(
  studentName: string,
  presentationTitle: string,
  instructorName: string
): Promise<{ base64: string; buffer: Buffer }> {
  // Importar módulos necessários
  const jsPDF = (await import('jspdf')).default;
  const fs = await import('fs');
  const path = await import('path');
  
  // Criar documento PDF em formato paisagem (landscape)
  const doc = new jsPDF({
    orientation: 'landscape',
    unit: 'mm',
    format: 'a4'
  });

  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();

  // =============== FUNDO ESCURO MODERNO ===============
  // Fundo preto/cinza escuro
  doc.setFillColor(20, 20, 20); // #141414
  doc.rect(0, 0, pageWidth, pageHeight, 'F');
  
  // Linhas diagonais decorativas (estilo da imagem)
  doc.setDrawColor(40, 40, 40); // Cinza mais claro
  doc.setLineWidth(0.3);
  
  // Múltiplas linhas diagonais
  for (let i = -50; i < pageWidth + 50; i += 10) {
    doc.line(i, 0, i + pageHeight, pageHeight);
  }

  // =============== HEADER - ANO ===============
  doc.setFontSize(10);
  doc.setTextColor(150, 150, 150);
  doc.setFont('helvetica', 'normal');
  doc.text('2025', pageWidth - 20, 15, { align: 'right' });

  // =============== TÍTULO PRINCIPAL ===============
  // "CERTIFICADO" em ciano/turquesa
  doc.setFontSize(56);
  doc.setTextColor(0, 217, 255); // #00D9FF - Ciano
  doc.setFont('helvetica', 'bold');
  doc.text('CERTIFICADO', pageWidth / 2, 50, { align: 'center' });

  // "DE PARTICIPAÇÃO" em cinza claro
  doc.setFontSize(28);
  doc.setTextColor(200, 200, 200);
  doc.setFont('helvetica', 'normal');
  doc.text('DE PARTICIPAÇÃO', pageWidth / 2, 65, { align: 'center' });

  // =============== CARD CENTRAL COM MOLDURA ===============
  // Card com fundo semi-transparente
  doc.setFillColor(30, 30, 30); // Cinza escuro
  doc.setDrawColor(0, 217, 255); // Borda ciano
  doc.setLineWidth(0.5);
  doc.roundedRect(40, 75, pageWidth - 80, 80, 5, 5, 'FD');

  // =============== CONTEÚDO DO CARD ===============
  // Texto "Certificamos que"
  doc.setFontSize(14);
  doc.setTextColor(180, 180, 180);
  doc.setFont('helvetica', 'normal');
  doc.text('Certificamos que', pageWidth / 2, 90, { align: 'center' });

  // Nome do aluno em DESTAQUE (Ciano)
  doc.setFontSize(36);
  doc.setTextColor(0, 217, 255); // Ciano
  doc.setFont('helvetica', 'bold');
  const nameLines = doc.splitTextToSize(studentName.toUpperCase(), pageWidth - 100);
  doc.text(nameLines, pageWidth / 2, 110, { align: 'center' });

  // Texto "Participou da"
  const nameHeight = nameLines.length * 12;
  doc.setFontSize(13);
  doc.setTextColor(180, 180, 180);
  doc.setFont('helvetica', 'normal');
  doc.text('Participou da apresentação:', pageWidth / 2, 110 + nameHeight, { align: 'center' });

  // Título da apresentação
  doc.setFontSize(16);
  doc.setTextColor(255, 255, 255);
  doc.setFont('helvetica', 'bold');
  const titleLines = doc.splitTextToSize(`"${presentationTitle}"`, pageWidth - 100);
  doc.text(titleLines, pageWidth / 2, 120 + nameHeight, { align: 'center' });

  // =============== RODAPÉ - INSTRUTOR E DATA ===============
  const footerY = pageHeight - 35;
  
  // Linha divisória
  doc.setDrawColor(0, 217, 255);
  doc.setLineWidth(0.5);
  doc.line(pageWidth / 2 - 60, footerY, pageWidth / 2 + 60, footerY);

  // Nome do instrutor
  doc.setFontSize(14);
  doc.setTextColor(200, 200, 200);
  doc.setFont('helvetica', 'bold');
  doc.text(instructorName, pageWidth / 2, footerY + 8, { align: 'center' });

  // Cargo
  doc.setFontSize(11);
  doc.setTextColor(150, 150, 150);
  doc.setFont('helvetica', 'normal');
  doc.text('Instrutor', pageWidth / 2, footerY + 15, { align: 'center' });

  // Data
  doc.setFontSize(9);
  doc.setTextColor(120, 120, 120);
  const date = new Date().toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: 'long',
    year: 'numeric'
  });
  doc.text(date, pageWidth / 2, footerY + 21, { align: 'center' });

  // =============== LOGOS NO RODAPÉ ===============
  try {
    const publicPath = path.join(process.cwd(), 'public');
    
    // Tentar carregar logo FACIMP
    try {
      const logoFacimpPath = path.join(publicPath, 'logofacimp.png');
      if (fs.existsSync(logoFacimpPath)) {
        const logoFacimpData = fs.readFileSync(logoFacimpPath);
        const logoFacimpBase64 = `data:image/png;base64,${logoFacimpData.toString('base64')}`;
        doc.addImage(logoFacimpBase64, 'PNG', 20, pageHeight - 25, 25, 15);
      }
    } catch (e) {
      console.log('Logo FACIMP não encontrada');
    }

    // Tentar carregar logo SCS
    try {
      const logoScsPath = path.join(publicPath, 'logoscs.png');
      if (fs.existsSync(logoScsPath)) {
        const logoScsData = fs.readFileSync(logoScsPath);
        const logoScsBase64 = `data:image/png;base64,${logoScsData.toString('base64')}`;
        doc.addImage(logoScsBase64, 'PNG', pageWidth - 45, pageHeight - 25, 25, 15);
      }
    } catch (e) {
      console.log('Logo SCS não encontrada');
    }
  } catch (error) {
    console.log('Erro ao carregar logos:', error);
  }

  // Converter para buffer e base64
  const pdfArrayBuffer = doc.output('arraybuffer');
  const pdfBuffer = Buffer.from(pdfArrayBuffer);
  const pdfBase64 = pdfBuffer.toString('base64');
  
  return {
    base64: pdfBase64,
    buffer: pdfBuffer,
  };
}

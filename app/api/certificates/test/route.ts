import { NextRequest, NextResponse } from 'next/server';

export const runtime = 'nodejs';

export async function GET(req: NextRequest) {
  try {
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
    const studentName = 'TESTE - SEU NOME AQUI';
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
    const presentationTitle = 'Aplicando Modelos de Inteligência Artificial no Aprendizado de DevOps';
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
    const instructorName = 'Sandro Souza - CloudServo Remote System';
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

    // Converter para buffer
    const pdfBuffer = doc.output('arraybuffer');
    
    // Retornar PDF para download
    return new NextResponse(pdfBuffer, {
      status: 200,
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': 'attachment; filename="Certificado_Teste.pdf"',
      },
    });

  } catch (error) {
    console.error('Erro ao gerar certificado:', error);
    return NextResponse.json(
      { error: 'Erro ao gerar certificado de teste' },
      { status: 500 }
    );
  }
}

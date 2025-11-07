import { NextRequest, NextResponse } from 'next/server';

export const runtime = 'nodejs';

interface ValidatePhoneRequest {
  phone: string;
}

export async function POST(req: NextRequest) {
  try {
    const body: ValidatePhoneRequest = await req.json();
    const { phone } = body;

    // Configurações da Evolution API
    const EVOLUTION_API_URL = process.env.EVOLUTION_API_URL || 'http://localhost:8080';
    const EVOLUTION_API_KEY = process.env.EVOLUTION_API_KEY || '';
    const EVOLUTION_INSTANCE = process.env.EVOLUTION_INSTANCE || 'DevOpsPresentation';

    // Formatar número de telefone
    const phoneNumber = phone.replace(/\D/g, '');
    
    // Validar formato
    if (phoneNumber.length < 10 || phoneNumber.length > 13) {
      return NextResponse.json({
        valid: false,
        error: 'Número de telefone inválido. Use o formato (99) 99999-9999'
      });
    }
    
    const formattedPhone = phoneNumber.startsWith('55') 
      ? phoneNumber 
      : `55${phoneNumber}`;

    console.log('🔍 Validando número:', formattedPhone);

    // Verificar se o número existe no WhatsApp
    const response = await fetch(`${EVOLUTION_API_URL}/chat/whatsappNumbers/${EVOLUTION_INSTANCE}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'apikey': EVOLUTION_API_KEY,
      },
      body: JSON.stringify({
        numbers: [`${formattedPhone}@s.whatsapp.net`]
      }),
    });

    if (!response.ok) {
      console.error('❌ Erro ao validar número:', response.status);
      return NextResponse.json({
        valid: false,
        error: 'Erro ao validar número. Verifique a conexão com WhatsApp.'
      });
    }

    const result = await response.json();
    console.log('✅ Resultado da validação:', result);

    // Verificar se o número existe
    const numberExists = result?.[0]?.exists === true;

    return NextResponse.json({
      valid: numberExists,
      phone: formattedPhone,
      message: numberExists 
        ? 'Número válido e possui WhatsApp' 
        : 'Número não encontrado no WhatsApp',
      details: result?.[0]
    });

  } catch (error) {
    console.error('Erro ao validar número:', error);
    return NextResponse.json(
      { 
        valid: false, 
        error: error instanceof Error ? error.message : 'Erro ao validar número' 
      },
      { status: 500 }
    );
  }
}

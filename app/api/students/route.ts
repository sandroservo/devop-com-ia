import { NextRequest, NextResponse } from 'next/server';
import { writeFile, readFile, mkdir } from 'fs/promises';
import { existsSync } from 'fs';
import path from 'path';

const DATA_DIR = path.join(process.cwd(), 'data');
const STUDENTS_FILE = path.join(DATA_DIR, 'students.json');

interface Student {
  id: string;
  name: string;
  email: string;
  phone: string;
  registeredAt: string;
  certificateSent: boolean;
}

// Garantir que o diretório data existe
async function ensureDataDir() {
  if (!existsSync(DATA_DIR)) {
    await mkdir(DATA_DIR, { recursive: true });
  }
}

// GET - Listar todos os alunos
export async function GET(req: NextRequest) {
  try {
    await ensureDataDir();
    
    if (!existsSync(STUDENTS_FILE)) {
      return NextResponse.json([]);
    }

    const data = await readFile(STUDENTS_FILE, 'utf-8');
    const students: Student[] = JSON.parse(data);
    
    return NextResponse.json(students);
  } catch (error) {
    console.error('Erro ao ler alunos:', error);
    return NextResponse.json([], { status: 500 });
  }
}

// POST - Adicionar novo aluno
export async function POST(req: NextRequest) {
  try {
    await ensureDataDir();
    
    const newStudent = await req.json();
    
    // Ler alunos existentes
    let students: Student[] = [];
    if (existsSync(STUDENTS_FILE)) {
      const data = await readFile(STUDENTS_FILE, 'utf-8');
      students = JSON.parse(data);
    }
    
    // Adicionar novo aluno
    students.push(newStudent);
    
    // Salvar de volta
    await writeFile(STUDENTS_FILE, JSON.stringify(students, null, 2));
    
    return NextResponse.json({ success: true, student: newStudent });
  } catch (error) {
    console.error('Erro ao adicionar aluno:', error);
    return NextResponse.json({ success: false }, { status: 500 });
  }
}

// PUT - Atualizar aluno (dados completos ou apenas status)
export async function PUT(req: NextRequest) {
  try {
    await ensureDataDir();
    
    const updateData = await req.json();
    const { id } = updateData;
    
    if (!id) {
      return NextResponse.json({ success: false, error: 'ID obrigatório' }, { status: 400 });
    }
    
    if (!existsSync(STUDENTS_FILE)) {
      return NextResponse.json({ success: false }, { status: 404 });
    }
    
    // Ler alunos
    const data = await readFile(STUDENTS_FILE, 'utf-8');
    let students: Student[] = JSON.parse(data);
    
    // Atualizar aluno (merge com dados existentes)
    students = students.map(s => {
      if (s.id === id) {
        return {
          ...s,
          ...updateData,
          id: s.id, // Garantir que o ID não mude
          registeredAt: s.registeredAt, // Manter data original
        };
      }
      return s;
    });
    
    // Salvar
    await writeFile(STUDENTS_FILE, JSON.stringify(students, null, 2));
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Erro ao atualizar aluno:', error);
    return NextResponse.json({ success: false }, { status: 500 });
  }
}

// DELETE - Remover aluno
export async function DELETE(req: NextRequest) {
  try {
    await ensureDataDir();
    
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');
    
    if (!id || !existsSync(STUDENTS_FILE)) {
      return NextResponse.json({ success: false }, { status: 404 });
    }
    
    // Ler alunos
    const data = await readFile(STUDENTS_FILE, 'utf-8');
    let students: Student[] = JSON.parse(data);
    
    // Remover aluno
    students = students.filter(s => s.id !== id);
    
    // Salvar
    await writeFile(STUDENTS_FILE, JSON.stringify(students, null, 2));
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Erro ao remover aluno:', error);
    return NextResponse.json({ success: false }, { status: 500 });
  }
}

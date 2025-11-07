'use client';

import { useState, useEffect } from 'react';
import { Award, Users, Send, X, Check, Clock, Edit, RefreshCw } from 'lucide-react';

interface Student {
  id: string;
  name: string;
  email: string;
  phone: string;
  registeredAt: Date;
  certificateSent: boolean;
}

interface CertificateModuleProps {
  presentationTitle: string;
  instructorName: string;
}

export default function CertificateModule({ presentationTitle, instructorName }: CertificateModuleProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [students, setStudents] = useState<Student[]>([]);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
  });
  const [isSending, setIsSending] = useState(false);
  const [sendStatus, setSendStatus] = useState('');
  const [editingStudent, setEditingStudent] = useState<Student | null>(null);
  const [sendingStudentId, setSendingStudentId] = useState<string | null>(null);
  const [phoneError, setPhoneError] = useState('');

  // Função para formatar telefone brasileiro
  const formatPhoneNumber = (value: string): string => {
    // Remove tudo que não é número
    const numbers = value.replace(/\D/g, '');
    
    // Limita a 11 dígitos (DDD + número)
    const limited = numbers.slice(0, 11);
    
    // Aplica a máscara
    if (limited.length <= 2) {
      return limited;
    } else if (limited.length <= 7) {
      return `(${limited.slice(0, 2)}) ${limited.slice(2)}`;
    } else if (limited.length <= 11) {
      return `(${limited.slice(0, 2)}) ${limited.slice(2, 7)}-${limited.slice(7)}`;
    }
    
    return limited;
  };

  // Validar telefone brasileiro
  const validatePhone = (phone: string): boolean => {
    const numbers = phone.replace(/\D/g, '');
    // Deve ter 10 ou 11 dígitos (DDD + 8 ou 9 dígitos)
    return numbers.length === 10 || numbers.length === 11;
  };

  // Handler para mudança no telefone
  const handlePhoneChange = (value: string, isEdit = false) => {
    const formatted = formatPhoneNumber(value);
    const numbers = formatted.replace(/\D/g, '');
    
    if (isEdit && editingStudent) {
      setEditingStudent({ ...editingStudent, phone: formatted });
    } else {
      setFormData({ ...formData, phone: formatted });
    }
    
    // Validar quando completar
    if (numbers.length === 10 || numbers.length === 11) {
      if (validatePhone(formatted)) {
        setPhoneError('');
      } else {
        setPhoneError('Número inválido');
      }
    } else if (numbers.length > 0) {
      setPhoneError('Digite o DDD e o número completo');
    } else {
      setPhoneError('');
    }
  };

  // Carregar alunos do arquivo JSON ao montar
  useEffect(() => {
    loadStudents();
  }, []);

  const loadStudents = async () => {
    try {
      const response = await fetch('/api/students');
      const data = await response.json();
      const studentsWithDates = data.map((s: any) => ({
        ...s,
        registeredAt: new Date(s.registeredAt)
      }));
      setStudents(studentsWithDates);
    } catch (error) {
      console.error('Erro ao carregar alunos:', error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validar telefone antes de enviar
    if (!validatePhone(formData.phone)) {
      setPhoneError('Número de telefone inválido. Use (99) 99999-9999');
      setSendStatus('❌ Corrija o número de telefone antes de cadastrar');
      setTimeout(() => setSendStatus(''), 3000);
      return;
    }
    
    const newStudent: Student = {
      id: Date.now().toString(),
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      registeredAt: new Date(),
      certificateSent: false,
    };

    try {
      // Salvar no arquivo JSON via API
      await fetch('/api/students', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newStudent),
      });

      // Atualizar lista local
      setStudents(prev => [...prev, newStudent]);
      setFormData({ name: '', email: '', phone: '' });
      setSendStatus(`✅ ${formData.name} cadastrado com sucesso!`);
      
      setTimeout(() => setSendStatus(''), 3000);
    } catch (error) {
      console.error('Erro ao cadastrar aluno:', error);
      setSendStatus('❌ Erro ao cadastrar aluno');
      setTimeout(() => setSendStatus(''), 3000);
    }
  };

  // Editar aluno
  const handleEditStudent = (student: Student) => {
    setEditingStudent(student);
    setShowForm(false);
  };

  // Salvar edição
  const handleSaveEdit = async () => {
    if (!editingStudent) return;

    // Validar telefone antes de salvar
    if (!validatePhone(editingStudent.phone)) {
      setPhoneError('Número de telefone inválido. Use (99) 99999-9999');
      setSendStatus('❌ Corrija o número de telefone antes de salvar');
      setTimeout(() => setSendStatus(''), 3000);
      return;
    }

    try {
      // Atualizar no servidor
      await fetch('/api/students', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: editingStudent.id,
          name: editingStudent.name,
          email: editingStudent.email,
          phone: editingStudent.phone,
        }),
      });

      // Atualizar localmente
      setStudents(prev => prev.map(s => 
        s.id === editingStudent.id ? editingStudent : s
      ));

      setEditingStudent(null);
      setSendStatus('✅ Dados atualizados com sucesso!');
      setTimeout(() => setSendStatus(''), 3000);
    } catch (error) {
      console.error('Erro ao editar aluno:', error);
      setSendStatus('❌ Erro ao atualizar dados');
      setTimeout(() => setSendStatus(''), 3000);
    }
  };

  // Cancelar edição
  const handleCancelEdit = () => {
    setEditingStudent(null);
  };

  // Reenviar certificado individual
  const handleResendCertificate = async (student: Student) => {
    setSendingStudentId(student.id);
    setSendStatus(`📤 Reenviando certificado para ${student.name}...`);

    try {
      const sendResponse = await fetch('/api/certificates/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          student,
          presentationTitle,
          instructorName,
        }),
      });

      if (!sendResponse.ok) {
        const errorData = await sendResponse.json();
        throw new Error(errorData.error || 'Erro ao enviar certificado');
      }

      // Atualizar status
      await fetch('/api/students', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: student.id,
          certificateSent: true,
        }),
      });

      setStudents(prev => prev.map(s => 
        s.id === student.id ? { ...s, certificateSent: true } : s
      ));

      setSendStatus(`✅ Certificado reenviado para ${student.name}!`);
      setTimeout(() => setSendStatus(''), 3000);
    } catch (error) {
      console.error('Erro ao reenviar:', error);
      setSendStatus(`❌ Erro ao reenviar para ${student.name}: ${error instanceof Error ? error.message : 'Erro desconhecido'}`);
      setTimeout(() => setSendStatus(''), 5000);
    } finally {
      setSendingStudentId(null);
    }
  };

  const sendCertificates = async () => {
    setIsSending(true);
    setSendStatus('📤 Iniciando envio de certificados...');

    const unsent = students.filter(s => !s.certificateSent);
    
    for (let i = 0; i < unsent.length; i++) {
      const student = unsent[i];
      const delay = Math.random() * 5000 + 2000; // 2-7 segundos randômico
      
      setSendStatus(`📤 Enviando para ${student.name} (${i + 1}/${unsent.length})...`);
      
      await new Promise(resolve => setTimeout(resolve, delay));
      
      try {
        // Chamar API de envio
        const sendResponse = await fetch('/api/certificates/send', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            student,
            presentationTitle,
            instructorName,
          }),
        });

        if (!sendResponse.ok) {
          const errorData = await sendResponse.json();
          throw new Error(errorData.error || 'Erro ao enviar certificado');
        }

        // Atualizar status no arquivo JSON
        await fetch('/api/students', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            id: student.id,
            certificateSent: true,
          }),
        });

        // Atualizar status local
        setStudents(prev => prev.map(s => 
          s.id === student.id ? { ...s, certificateSent: true } : s
        ));
        
        setSendStatus(`✅ Enviado para ${student.name} (${i + 1}/${unsent.length})`);
      } catch (error) {
        console.error('Erro ao enviar:', error);
        setSendStatus(`❌ Erro ao enviar para ${student.name}: ${error instanceof Error ? error.message : 'Erro desconhecido'}`);
      }
      
      await new Promise(resolve => setTimeout(resolve, 1000));
    }

    setSendStatus('🎉 Todos os certificados foram enviados!');
    setIsSending(false);
  };

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-20 right-4 sm:bottom-8 sm:right-28 z-40 p-4 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full shadow-2xl hover:scale-110 active:scale-95 transition-transform group"
        title="Certificados"
      >
        <Award className="text-white w-6 h-6 sm:w-8 sm:h-8" />
        {students.length > 0 && (
          <span className="absolute -top-2 -left-2 w-6 h-6 bg-red-500 text-white text-xs rounded-full flex items-center justify-center font-bold">
            {students.length}
          </span>
        )}
        <div className="hidden sm:block absolute bottom-full right-0 mb-2 px-4 py-2 bg-gray-900 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
          📜 Certificados ({students.length} alunos)
        </div>
      </button>
    );
  }

  return (
    <div className="fixed inset-0 z-40 bg-black/90 flex items-end sm:items-center justify-center">
      <div className="bg-gray-900 rounded-t-3xl sm:rounded-2xl shadow-2xl w-full sm:max-w-4xl h-[90vh] sm:max-h-[90vh] overflow-hidden flex flex-col border-t-4 sm:border border-purple-500">
        {/* Header */}
        <div className="flex items-center justify-between p-4 sm:p-6 border-b border-gray-700 bg-gradient-to-r from-purple-600/20 to-pink-600/20">
          <div className="flex items-center gap-2 sm:gap-3">
            <Award className="text-purple-400 w-6 h-6 sm:w-8 sm:h-8" />
            <div>
              <h2 className="text-base sm:text-2xl font-bold text-white">Certificados</h2>
              <p className="text-xs sm:text-sm text-gray-400">{students.length} alunos</p>
            </div>
          </div>
          <button
            onClick={() => setIsOpen(false)}
            className="p-2 hover:bg-gray-800 rounded-lg transition-colors active:scale-95"
          >
            <X className="text-gray-400 w-5 h-5 sm:w-6 sm:h-6" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-3 sm:p-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
            {/* Formulário */}
            <div className="space-y-3 sm:space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-base sm:text-lg font-semibold text-white flex items-center gap-2">
                  <Users size={18} className="text-purple-400" />
                  <span className="hidden sm:inline">Cadastrar Aluno</span>
                  <span className="sm:hidden">Alunos</span>
                </h3>
                <button
                  onClick={() => setShowForm(!showForm)}
                  className="px-3 py-1.5 sm:px-4 sm:py-2 bg-purple-600 hover:bg-purple-700 rounded-lg text-white text-xs sm:text-sm transition-colors"
                >
                  {showForm ? 'Ocultar' : 'Adicionar'}
                </button>
              </div>

              {showForm && (
                <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4 bg-gray-800/50 p-3 sm:p-4 rounded-xl border border-gray-700">
                  <div>
                    <label className="block text-xs sm:text-sm text-gray-300 mb-1.5 sm:mb-2">Nome Completo</label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full bg-gray-800 text-white text-sm sm:text-base rounded-lg px-3 py-2 sm:px-4 sm:py-3 border border-gray-600 focus:border-purple-500 focus:outline-none"
                      placeholder="João da Silva"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-xs sm:text-sm text-gray-300 mb-1.5 sm:mb-2">Email</label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full bg-gray-800 text-white text-sm sm:text-base rounded-lg px-3 py-2 sm:px-4 sm:py-3 border border-gray-600 focus:border-purple-500 focus:outline-none"
                      placeholder="joao@exemplo.com"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-xs sm:text-sm text-gray-300 mb-1.5 sm:mb-2">WhatsApp (com DDD)</label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => handlePhoneChange(e.target.value, false)}
                      className={`w-full bg-gray-800 text-white text-sm sm:text-base rounded-lg px-3 py-2 sm:px-4 sm:py-3 border ${
                        phoneError ? 'border-red-500' : 'border-gray-600'
                      } focus:border-purple-500 focus:outline-none`}
                      placeholder="(99) 99999-9999"
                      required
                    />
                    {phoneError && (
                      <p className="text-red-400 text-xs mt-1">✗ {phoneError}</p>
                    )}
                    {formData.phone && !phoneError && validatePhone(formData.phone) && (
                      <p className="text-green-400 text-xs mt-1">✓ Número válido</p>
                    )}
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold py-2.5 sm:py-3 text-sm sm:text-base rounded-lg transition-all flex items-center justify-center gap-2"
                  >
                    <Check size={18} />
                    <span className="hidden sm:inline">Cadastrar Aluno</span>
                    <span className="sm:hidden">Cadastrar</span>
                  </button>
                </form>
              )}

              {/* Formulário de Edição */}
              {editingStudent && (
                <div className="bg-blue-900/20 border border-blue-500/30 rounded-xl p-6 space-y-4">
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="text-lg font-semibold text-white">Editar Aluno</h4>
                    <button
                      onClick={handleCancelEdit}
                      className="text-gray-400 hover:text-white transition-colors"
                    >
                      <X size={20} />
                    </button>
                  </div>

                  <div>
                    <label className="block text-sm text-gray-300 mb-2">Nome Completo</label>
                    <input
                      type="text"
                      value={editingStudent.name}
                      onChange={(e) => setEditingStudent({ ...editingStudent, name: e.target.value })}
                      className="w-full bg-gray-800 text-white rounded-lg px-4 py-3 border border-gray-600 focus:border-blue-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-sm text-gray-300 mb-2">Email</label>
                    <input
                      type="email"
                      value={editingStudent.email}
                      onChange={(e) => setEditingStudent({ ...editingStudent, email: e.target.value })}
                      className="w-full bg-gray-800 text-white rounded-lg px-4 py-3 border border-gray-600 focus:border-blue-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-sm text-gray-300 mb-2">WhatsApp (com DDD)</label>
                    <input
                      type="tel"
                      value={editingStudent.phone}
                      onChange={(e) => handlePhoneChange(e.target.value, true)}
                      className={`w-full bg-gray-800 text-white rounded-lg px-4 py-3 border ${
                        phoneError ? 'border-red-500' : 'border-gray-600'
                      } focus:border-blue-500 focus:outline-none`}
                      placeholder="(99) 99999-9999"
                    />
                    {phoneError && (
                      <p className="text-red-400 text-xs mt-1">✗ {phoneError}</p>
                    )}
                    {editingStudent.phone && !phoneError && validatePhone(editingStudent.phone) && (
                      <p className="text-green-400 text-xs mt-1">✓ Número válido</p>
                    )}
                  </div>

                  <div className="flex gap-2">
                    <button
                      onClick={handleCancelEdit}
                      className="flex-1 bg-gray-700 hover:bg-gray-600 text-white font-semibold py-3 rounded-lg transition-all"
                    >
                      Cancelar
                    </button>
                    <button
                      onClick={handleSaveEdit}
                      className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition-all flex items-center justify-center gap-2"
                    >
                      <Check size={20} />
                      Salvar Alterações
                    </button>
                  </div>
                </div>
              )}

              {sendStatus && (
                <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
                  <p className="text-blue-300 text-sm">{sendStatus}</p>
                </div>
              )}
            </div>

            {/* Lista de Alunos */}
            <div className="space-y-3 sm:space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                <h3 className="text-base sm:text-lg font-semibold text-white">
                  Alunos ({students.length})
                </h3>
                {students.length > 0 && (
                  <button
                    onClick={sendCertificates}
                    disabled={isSending || students.every(s => s.certificateSent)}
                    className="px-3 py-2 sm:px-4 bg-green-600 hover:bg-green-700 disabled:bg-gray-600 disabled:cursor-not-allowed rounded-lg text-white text-xs sm:text-sm transition-colors flex items-center justify-center gap-2 active:scale-95"
                  >
                    {isSending ? (
                      <>
                        <Clock className="w-4 h-4 animate-spin" />
                        <span className="hidden sm:inline">Enviando...</span>
                        <span className="sm:hidden">Enviando</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span className="hidden sm:inline">Enviar Certificados</span>
                        <span className="sm:hidden">Enviar Todos</span>
                      </>
                    )}
                  </button>
                )}
              </div>

              <div className="space-y-2 max-h-[400px] overflow-y-auto">
                {students.length === 0 ? (
                  <div className="text-center py-12 text-gray-400">
                    <Users size={48} className="mx-auto mb-4 opacity-50" />
                    <p>Nenhum aluno cadastrado ainda</p>
                    <p className="text-sm mt-2">Adicione alunos para gerar certificados</p>
                  </div>
                ) : (
                  students.map((student) => (
                    <div
                      key={student.id}
                      className="bg-gray-800/50 rounded-lg p-3 sm:p-4 border border-gray-700 hover:border-purple-500/50 transition-all"
                    >
                      <div className="flex items-start justify-between mb-2 sm:mb-3">
                        <div className="flex-1 min-w-0">
                          <h4 className="text-white font-semibold text-sm sm:text-base truncate">{student.name}</h4>
                          <p className="text-xs sm:text-sm text-gray-400 truncate">{student.email}</p>
                          <p className="text-xs sm:text-sm text-gray-400">📱 {student.phone}</p>
                        </div>
                        <div className="text-right ml-2 flex-shrink-0">
                          {student.certificateSent ? (
                            <span className="inline-flex items-center gap-1 px-2 py-1 bg-green-500/20 text-green-400 rounded-full text-xs">
                              <Check className="w-3 h-3" />
                              <span className="hidden sm:inline">Enviado</span>
                              <span className="sm:hidden">✓</span>
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1 px-2 py-1 bg-yellow-500/20 text-yellow-400 rounded-full text-xs">
                              <Clock className="w-3 h-3" />
                              <span className="hidden sm:inline">Pendente</span>
                              <span className="sm:hidden">⏱</span>
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Botões de ação */}
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleEditStudent(student)}
                          className="flex-1 px-2 py-1.5 sm:px-3 sm:py-2 bg-blue-600/20 hover:bg-blue-600/30 text-blue-400 rounded-lg text-xs transition-colors flex items-center justify-center gap-1 active:scale-95"
                        >
                          <Edit className="w-3 h-3 sm:w-4 sm:h-4" />
                          <span className="hidden sm:inline">Editar</span>
                        </button>
                        
                        <button
                          onClick={() => handleResendCertificate(student)}
                          disabled={sendingStudentId === student.id}
                          className="flex-1 px-2 py-1.5 sm:px-3 sm:py-2 bg-purple-600/20 hover:bg-purple-600/30 text-purple-400 rounded-lg text-xs transition-colors flex items-center justify-center gap-1 disabled:opacity-50 disabled:cursor-not-allowed active:scale-95"
                        >
                          {sendingStudentId === student.id ? (
                            <>
                              <Clock className="w-3 h-3 sm:w-4 sm:h-4 animate-spin" />
                              <span className="hidden sm:inline">Enviando...</span>
                            </>
                          ) : (
                            <>
                              <RefreshCw className="w-3 h-3 sm:w-4 sm:h-4" />
                              <span className="hidden sm:inline">Reenviar</span>
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Footer Stats */}
        <div className="border-t border-gray-700 p-4 bg-gray-800/50">
          <div className="flex items-center justify-around text-center">
            <div>
              <p className="text-2xl font-bold text-white">{students.length}</p>
              <p className="text-xs text-gray-400">Total de Alunos</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-green-400">
                {students.filter(s => s.certificateSent).length}
              </p>
              <p className="text-xs text-gray-400">Certificados Enviados</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-yellow-400">
                {students.filter(s => !s.certificateSent).length}
              </p>
              <p className="text-xs text-gray-400">Pendentes</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

import React, { useState } from 'react';

interface ConciergeChatModalProps {
  isOpen: boolean;
  onClose: () => void;
  hostName: string;
  vehicleName: string;
}

interface Message {
  id: string;
  sender: 'user' | 'host';
  text: string;
  time: string;
}

export const ConciergeChatModal: React.FC<ConciergeChatModalProps> = ({
  isOpen,
  onClose,
  hostName,
  vehicleName,
}) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'm1',
      sender: 'host',
      text: `¡Hola Ignacio! Un placer coordinar contigo la experiencia con el ${vehicleName}. La unidad se encuentra impecable y con tanque completo.`,
      time: '10:14 hs',
    },
    {
      id: 'm2',
      sender: 'host',
      text: '¿A qué hora estimas llegar al punto de retiro en Recoleta? Te aguardo personalmente o puedes retirar con el código digital si prefieres.',
      time: '10:15 hs',
    },
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  if (!isOpen) return null;

  const handleSendMessage = (textToSend?: string) => {
    const text = textToSend || inputText;
    if (!text.trim()) return;

    const userMsg: Message = {
      id: `m_${Date.now()}`,
      sender: 'user',
      text: text.trim(),
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInputText('');

    // Simulate polite host answer
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      const responses = [
        '¡Perfecto, anotado! Ya dejé la autorización firmada en la portería con el pase de ingreso.',
        'Excelente. El vehículo cuenta con cable lightning y USB-C además de cargador inalámbrico para tu comodidad.',
        'Sin problema. Recuerda que la cochera tiene rampa amplia con seguridad 24 hs.',
        'Coordinado. ¡Que disfrutes del viaje! Ante cualquier consulta en el camino, quedo a tu entera disposición por aquí.',
      ];
      const randomReply = responses[Math.floor(Math.random() * responses.length)];
      const hostMsg: Message = {
        id: `m_${Date.now() + 1}`,
        sender: 'host',
        text: randomReply,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, hostMsg]);
    }, 1200);
  };

  const quickPrompts = [
    'Llegaré alrededor de las 10:30 hs',
    '¿El auto cuenta con telepase activo?',
    '¿Dónde retiro la llave exactamente?',
  ];

  return (
    <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-lg w-full h-[620px] max-h-[90vh] flex flex-col shadow-2xl overflow-hidden border border-[#cec5bc]/40">
        {/* Header */}
        <div className="p-4 px-6 bg-[#15110d] text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#755a2a] text-white flex items-center justify-center font-bold text-sm">
              {hostName.charAt(0)}
            </div>
            <div>
              <h3 className="font-serif text-[16px] font-semibold text-white">{hostName}</h3>
              <span className="text-[11px] text-[#2b7a4b] font-medium flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-[#2b7a4b]"></span>
                En línea • Anfitrión Verificado
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <a
              href="tel:+5491148219900"
              className="p-2 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors"
              title="Llamar al anfitrión"
            >
              <span className="material-symbols-outlined text-[18px]">call</span>
            </a>
            <button
              onClick={onClose}
              className="p-2 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
            >
              <span className="material-symbols-outlined text-[18px]">close</span>
            </button>
          </div>
        </div>

        {/* Vehicle Context Bar */}
        <div className="px-6 py-2.5 bg-[#f5f3f0] border-b border-[#ece8e2] text-[11px] text-[#5d564e] flex items-center justify-between">
          <span className="truncate">
            Conversación sobre: <strong className="text-[#15110d]">{vehicleName}</strong>
          </span>
          <span className="text-[#755a2a] font-semibold shrink-0">Reserva Protegida</span>
        </div>

        {/* Message Thread */}
        <div className="flex-1 p-6 overflow-y-auto space-y-4 bg-[#fbf9f6]">
          {messages.map((msg) => {
            const isMe = msg.sender === 'user';
            return (
              <div
                key={msg.id}
                className={`flex flex-col ${isMe ? 'items-end' : 'items-start'}`}
              >
                <div
                  className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-[13px] leading-relaxed shadow-xs ${
                    isMe
                      ? 'bg-[#15110d] text-white rounded-br-xs'
                      : 'bg-white text-[#15110d] border border-[#ece8e2] rounded-bl-xs'
                  }`}
                >
                  {msg.text}
                </div>
                <span className="text-[10px] text-[#9e968d] mt-1 px-1">{msg.time}</span>
              </div>
            );
          })}

          {isTyping && (
            <div className="flex items-center gap-2 text-[12px] text-[#7d766e] italic">
              <span className="material-symbols-outlined text-[16px] animate-bounce">chat_bubble</span>
              {hostName} está escribiendo...
            </div>
          )}
        </div>

        {/* Quick prompt chips */}
        <div className="px-4 py-2 bg-white border-t border-[#ece8e2] flex items-center gap-2 overflow-x-auto scrollbar-none">
          {quickPrompts.map((p, idx) => (
            <button
              key={idx}
              onClick={() => handleSendMessage(p)}
              className="px-3 py-1 rounded-full bg-[#f5f3f0] hover:bg-[#ede9e3] text-[#5d564e] text-[11px] whitespace-nowrap transition-colors cursor-pointer"
            >
              {p}
            </button>
          ))}
        </div>

        {/* Input Bar */}
        <div className="p-4 bg-white border-t border-[#ece8e2] flex items-center gap-3">
          <input
            type="text"
            placeholder="Escriba un mensaje al anfitrión..."
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') handleSendMessage();
            }}
            className="flex-1 px-4 py-2.5 rounded-xl bg-[#f5f3f0] border border-[#cec5bc]/50 text-[13px] text-[#1b1c1a] focus:outline-none focus:border-[#15110d]"
          />
          <button
            type="button"
            onClick={() => handleSendMessage()}
            className="p-2.5 rounded-xl bg-[#15110d] text-white hover:bg-[#2a2621] transition-colors cursor-pointer"
          >
            <span className="material-symbols-outlined text-[20px]">send</span>
          </button>
        </div>
      </div>
    </div>
  );
};

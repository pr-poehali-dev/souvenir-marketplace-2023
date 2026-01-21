import Icon from "@/components/ui/icon";

interface WhatsAppButtonProps {
  phoneNumber?: string;
  message?: string;
}

const WhatsAppButton = ({ 
  phoneNumber = "79503171377",
  message = "Здравствуйте! Хочу узнать подробнее о товарах БАЗА маркетплейс"
}: WhatsAppButtonProps) => {
  const handleClick = () => {
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <button
      onClick={handleClick}
      className="fixed bottom-6 right-6 z-50 bg-[#25D366] hover:bg-[#20BA5A] text-white p-4 rounded-full shadow-2xl transition-all duration-300 hover:scale-110 animate-fade-in group"
      aria-label="Написать в WhatsApp"
    >
      <Icon name="MessageCircle" size={28} className="drop-shadow-lg" />
      <span className="absolute right-full mr-3 top-1/2 -translate-y-1/2 bg-background text-foreground px-4 py-2 rounded-lg shadow-lg font-bold whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
        Написать в WhatsApp
      </span>
    </button>
  );
};

export default WhatsAppButton;

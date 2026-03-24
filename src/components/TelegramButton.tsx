import Icon from "@/components/ui/icon";

interface TelegramButtonProps {
  username?: string;
  message?: string;
}

const TelegramButton = ({ 
  username = "nkbaza",
  message = "Здравствуйте! Хочу узнать подробнее о товарах БАЗА маркетплейс"
}: TelegramButtonProps) => {
  const handleClick = () => {
    const encodedMessage = encodeURIComponent(message);
    const telegramUrl = `https://t.me/${username}?text=${encodedMessage}`;
    window.open(telegramUrl, '_blank');
  };

  return (
    <button
      onClick={handleClick}
      className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-40 bg-[#0088cc] hover:bg-[#006699] text-white p-3 sm:p-4 rounded-full shadow-2xl transition-all duration-300 hover:scale-110 animate-fade-in group"
      aria-label="Написать в Telegram"
    >
      <Icon name="Send" size={28} className="drop-shadow-lg" />
      <span className="absolute right-full mr-3 top-1/2 -translate-y-1/2 bg-background text-foreground px-4 py-2 rounded-lg shadow-lg font-bold whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
        Написать в Telegram
      </span>
    </button>
  );
};

export default TelegramButton;
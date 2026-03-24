import { useState } from "react";
import { Link } from "react-router-dom";
import Icon from "@/components/ui/icon";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import TelegramButton from "@/components/TelegramButton";
import MaxButton from "@/components/MaxButton";

const Contacts = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [agreed, setAgreed] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch("https://functions.poehali.dev/7a7e92f5-c4f6-4262-b962-162f0d4ace8c", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.ok) {
        toast({
          title: "Сообщение отправлено!",
          description: "Мы свяжемся с вами в ближайшее время",
          duration: 4000,
        });
        setFormData({ name: "", email: "", phone: "", message: "" });
      } else {
        throw new Error(result.error || "Ошибка отправки");
      }
    } catch (error) {
      toast({
        title: "Ошибка",
        description: "Не удалось отправить сообщение. Попробуйте позже.",
        variant: "destructive",
        duration: 4000,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <div className="min-h-screen bg-background">
      <div
        className="fixed inset-0 opacity-10 pointer-events-none"
        style={{
          backgroundImage:
            'url("data:image/svg+xml,%3Csvg width="100" height="100" xmlns="http://www.w3.org/2000/svg"%3E%3Cfilter id="noise"%3E%3CfeTurbulence baseFrequency="0.9" numOctaves="4"/%3E%3C/filter%3E%3Crect width="100" height="100" filter="url(%23noise)" opacity="0.4"/%3E%3C/svg%3E")',
          backgroundRepeat: "repeat",
        }}
      />

      <header className="sticky top-0 z-50 bg-background/95 backdrop-blur border-b border-border">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-20">
            <Link to="/" className="flex items-center gap-2 sm:gap-3">
              <img 
                src="https://cdn.poehali.dev/projects/ef132fe9-5a9c-48f7-aa3a-1ab89d055fa5/bucket/7ba2c399-7e05-4810-bdb1-aaf9ff685cb8.jpg" 
                alt="БАЗА" 
                className="h-12 sm:h-16 w-auto object-contain"
              />
              <div className="text-xl sm:text-2xl font-black tracking-tight">
                <span className="text-primary">БАЗА</span>
                <span className="text-foreground text-xs block leading-none mt-1">
                  МАРКЕТПЛЕЙС
                </span>
              </div>
            </Link>

            <nav className="flex items-center gap-6">
              <Link
                to="/"
                className="hover:text-primary transition-colors font-medium"
              >
                Каталог
              </Link>
              <Link
                to="/masters"
                className="hover:text-primary transition-colors font-medium"
              >
                Мастера
              </Link>
              <Link
                to="/about"
                className="hover:text-primary transition-colors font-medium"
              >
                О центре
              </Link>
              <Link
                to="/contacts"
                className="text-primary transition-colors font-medium"
              >
                Контакты
              </Link>
            </nav>

            <div className="flex items-center gap-2">
              <a href="https://vk.com/bazik_nk" target="_blank" rel="noopener noreferrer" className="hidden lg:flex items-center justify-center w-9 h-9 rounded-md hover:bg-accent transition-colors text-muted-foreground hover:text-primary">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12.785 16.241s.288-.032.436-.194c.136-.148.132-.427.132-.427s-.02-1.304.587-1.496c.6-.19 1.37 1.261 2.185 1.818.616.42 1.085.328 1.085.328l2.177-.03s1.137-.071.598-.964c-.044-.073-.314-.661-1.618-1.869-1.366-1.265-1.182-1.06.462-3.248.999-1.332 1.398-2.145 1.273-2.493-.12-.332-.855-.244-.855-.244l-2.451.015s-.182-.025-.317.056c-.132.079-.217.264-.217.264s-.387 1.028-.903 1.904c-1.088 1.85-1.524 1.948-1.703 1.834-.414-.267-.31-1.075-.31-1.648 0-1.793.272-2.54-.529-2.733-.266-.064-.461-.107-1.141-.114-.872-.009-1.609.003-2.027.207-.278.136-.492.439-.362.456.161.021.527.099.721.363.25.341.241 1.107.241 1.107s.144 2.112-.335 2.372c-.329.178-.779-.185-1.747-1.845-.496-.859-.871-1.811-.871-1.811s-.072-.176-.202-.271c-.157-.115-.376-.151-.376-.151l-2.328.015s-.35.01-.478.162C3.005 8.93 3.122 9.26 3.122 9.26s1.82 4.26 3.881 6.406c1.89 1.97 4.04 1.84 4.04 1.84l1.742-.031z"/></svg>
              </a>
              <a href="https://t.me/nkBaza" target="_blank" rel="noopener noreferrer" className="hidden lg:flex items-center justify-center w-9 h-9 rounded-md hover:bg-accent transition-colors text-muted-foreground hover:text-primary">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.894 8.221-1.97 9.28c-.145.658-.537.818-1.084.508l-3-2.21-1.447 1.394c-.16.16-.295.295-.605.295l.213-3.053 5.56-5.023c.242-.213-.054-.333-.373-.12L7.26 13.5l-2.956-.924c-.643-.204-.657-.643.136-.953l11.57-4.461c.537-.194 1.006.131.884.059z"/></svg>
              </a>
              <a href="https://max.ru/id1651051381_gos" target="_blank" rel="noopener noreferrer" className="hidden lg:flex items-center justify-center w-9 h-9 rounded-md hover:bg-accent transition-colors text-muted-foreground hover:text-primary">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="24" height="24" rx="6" fill="#7B2BF9"/><text x="12" y="17" textAnchor="middle" fill="white" fontSize="13" fontWeight="bold" fontFamily="Arial, sans-serif">M</text></svg>
              </a>
            </div>
          </div>
        </div>
      </header>

      <section className="py-12 sm:py-20 relative">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10 sm:mb-16">
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black mb-4 sm:mb-6 tracking-tight">
              КОНТАКТЫ
            </h1>
            <p className="text-base sm:text-xl text-muted-foreground max-w-2xl mx-auto">
              Свяжитесь с нами удобным способом
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 max-w-6xl mx-auto">
            <div className="space-y-6 sm:space-y-8">
              <a
                href="https://yandex.ru/maps/?text=Нижнекамск+ул.+Лесная+53"
                target="_blank"
                rel="noopener noreferrer"
                className="block"
              >
                <Card className="p-5 sm:p-8 border-2 border-border hover:border-primary transition-all cursor-pointer">
                  <div className="flex items-start gap-4">
                    <div className="bg-primary/10 p-4 rounded-lg">
                      <Icon
                        name="MapPin"
                        size={32}
                        className="text-primary"
                      />
                    </div>
                    <div>
                      <h3 className="text-lg sm:text-xl font-bold mb-2">АДРЕС</h3>
                      <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                        г. Нижнекамск, ул. Лесная 53, 55
                        <br />
                        Центр креативных индустрий «База»
                      </p>
                      <p className="text-xs text-primary mt-2 font-medium">Открыть в Яндекс Картах →</p>
                    </div>
                  </div>
                </Card>
              </a>

              <Card className="p-5 sm:p-8 border-2 border-border hover:border-primary transition-all">
                <div className="flex items-start gap-4">
                  <div className="bg-primary/10 p-4 rounded-lg">
                    <Icon name="Phone" size={32} className="text-primary" />
                  </div>
                  <div>
                    <h3 className="text-lg sm:text-xl font-bold mb-2">ТЕЛЕФОНЫ</h3>
                    <div className="space-y-1">
                      <a
                        href="tel:+79503171377"
                        className="block text-muted-foreground hover:text-primary transition-colors"
                      >
                        +7 950 317-13-77
                      </a>
                      <a
                        href="tel:+78555323848"
                        className="block text-muted-foreground hover:text-primary transition-colors"
                      >
                        +7 (8555) 32-38-48
                      </a>
                    </div>
                  </div>
                </div>
              </Card>

              <Card className="p-5 sm:p-8 border-2 border-border hover:border-primary transition-all">
                <div className="flex items-start gap-4">
                  <div className="bg-primary/10 p-4 rounded-lg">
                    <Icon name="Mail" size={32} className="text-primary" />
                  </div>
                  <div>
                    <h3 className="text-lg sm:text-xl font-bold mb-2">EMAIL</h3>
                    <a
                      href="mailto:nk.baza@mail.ru"
                      className="text-muted-foreground hover:text-primary transition-colors"
                    >
                      nk.baza@mail.ru
                    </a>
                  </div>
                </div>
              </Card>

              <Card className="p-5 sm:p-8 border-2 border-border hover:border-primary transition-all">
                <div className="flex items-start gap-4">
                  <div className="bg-primary/10 p-4 rounded-lg">
                    <Icon name="Clock" size={32} className="text-primary" />
                  </div>
                  <div>
                    <h3 className="text-lg sm:text-xl font-bold mb-2">ВРЕМЯ РАБОТЫ</h3>
                    <div className="text-sm sm:text-base text-muted-foreground space-y-1">
                      <p>Ежедневно: 10:00 — 22:00</p>
                      <p>Без обеда и выходных</p>
                    </div>
                  </div>
                </div>
              </Card>

              <Card className="p-5 sm:p-8 border-2 border-border hover:border-primary transition-all">
                <div className="flex items-start gap-4">
                  <div className="bg-primary/10 p-4 rounded-lg">
                    <Icon name="MessageCircle" size={32} className="text-primary" />
                  </div>
                  <div>
                    <h3 className="text-lg sm:text-xl font-bold mb-2">СОЦИАЛЬНЫЕ СЕТИ</h3>
                    <div className="flex gap-4 mt-3">
                      <a
                        href="https://vk.com/bazik_nk"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-primary/10 hover:bg-primary/20 p-3 rounded-lg transition-colors flex items-center gap-2"
                      >
                        <Icon name="Users" size={24} className="text-primary" />
                        <span className="text-sm font-medium text-primary">ВКонтакте</span>
                      </a>
                      <a
                        href="https://t.me/nkBaza"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-primary/10 hover:bg-primary/20 p-3 rounded-lg transition-colors flex items-center gap-2"
                      >
                        <Icon name="Send" size={24} className="text-primary" />
                        <span className="text-sm font-medium text-primary">Telegram</span>
                      </a>
                    </div>
                  </div>
                </div>
              </Card>
            </div>

            <div>
              <Card className="p-5 sm:p-8 border-2 border-border">
                <h2 className="text-2xl sm:text-3xl font-black mb-5 sm:mb-6">
                  НАПИШИТЕ НАМ
                </h2>
                <form onSubmit={handleSubmit} className="space-y-5 sm:space-y-6">
                  <div>
                    <label className="block text-sm font-bold mb-2">
                      ИМЯ *
                    </label>
                    <Input
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Ваше имя"
                      required
                      className="border-2"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-bold mb-2">
                      EMAIL *
                    </label>
                    <Input
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="your@email.com"
                      required
                      className="border-2"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-bold mb-2">
                      ТЕЛЕФОН
                    </label>
                    <Input
                      name="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="+7 900 000-00-00"
                      className="border-2"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-bold mb-2">
                      СООБЩЕНИЕ *
                    </label>
                    <Textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Расскажите, чем мы можем помочь"
                      rows={6}
                      required
                      className="border-2 resize-none"
                    />
                  </div>

                  <div className="flex items-start gap-3">
                    <input
                      type="checkbox"
                      id="agree"
                      checked={agreed}
                      onChange={(e) => setAgreed(e.target.checked)}
                      className="mt-1 h-4 w-4 cursor-pointer accent-primary flex-shrink-0"
                      required
                    />
                    <label htmlFor="agree" className="text-sm text-muted-foreground leading-snug cursor-pointer">
                      Я согласен(а) на{" "}
                      <a
                        href="/privacy"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary underline underline-offset-2 hover:opacity-80"
                      >
                        обработку персональных данных
                      </a>
                    </label>
                  </div>

                  <Button
                    type="submit"
                    disabled={isSubmitting || !agreed}
                    className="w-full bg-primary text-primary-foreground hover:bg-primary/90 font-bold py-6 text-lg disabled:opacity-50"
                  >
                    {isSubmitting ? "ОТПРАВКА..." : "ОТПРАВИТЬ"}
                  </Button>
                </form>
              </Card>

              <Card className="p-6 border-2 border-border mt-6">
                <div className="aspect-video bg-muted rounded-lg overflow-hidden">
                  <iframe
                    src="https://yandex.ru/map-widget/v1/?ll=51.818889%2C55.640111&z=13&l=map"
                    width="100%"
                    height="100%"
                    frameBorder="0"
                    allowFullScreen
                    className="w-full h-full"
                  ></iframe>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <TelegramButton />
      <MaxButton />

      <footer className="bg-card border-t border-border py-12 mt-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div>
              <h4 className="text-xl font-bold mb-4 text-primary">БАЗА</h4>
              <p className="text-sm text-muted-foreground">
                Центр креативных индустрий в Нижнекамске
              </p>
            </div>
            <div>
              <h5 className="font-bold mb-4">РАЗДЕЛЫ</h5>
              <div className="flex flex-col gap-2 text-sm">
                <Link to="/" className="hover:text-primary transition-colors">
                  Каталог товаров
                </Link>
                <Link
                  to="/masters"
                  className="hover:text-primary transition-colors"
                >
                  Мастера
                </Link>
                <Link
                  to="/about"
                  className="hover:text-primary transition-colors"
                >
                  О центре
                </Link>
              </div>
            </div>
            <div>
              <h5 className="font-bold mb-4">ИНФОРМАЦИЯ</h5>
              <div className="flex flex-col gap-2 text-sm">
                <Link to="/" className="hover:text-primary transition-colors">
                  Доставка и оплата
                </Link>
                <Link
                  to="/contacts"
                  className="hover:text-primary transition-colors"
                >
                  Контакты
                </Link>
                <Link
                  to="/profile"
                  className="hover:text-primary transition-colors"
                >
                  Личный кабинет
                </Link>
              </div>
            </div>
            <div>
              <h5 className="font-bold mb-4">КОНТАКТЫ</h5>
              <div className="flex flex-col gap-2 text-sm text-muted-foreground">
                <p>+7 950 317-13-77</p>
                <p>+7 (8555) 32-38-48</p>
                <p>@nkbaza</p>
              </div>
            </div>
          </div>
          <Separator className="my-8" />
          <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4 text-sm text-muted-foreground">
            <span>© 2026 Центр креативных индустрий «База». Нижнекамск</span>
            <span className="hidden sm:inline">·</span>
            <Link to="/privacy" className="hover:text-primary transition-colors underline underline-offset-2">
              Политика конфиденциальности
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Contacts;
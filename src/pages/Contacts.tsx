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

const Contacts = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

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
            <Link to="/" className="flex items-center gap-8">
              <div className="text-3xl font-black tracking-tight">
                <span className="text-primary">БАЗА</span>
                <span className="text-foreground text-sm block leading-none mt-1">
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
          </div>
        </div>
      </header>

      <section className="py-20 relative">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h1 className="text-6xl font-black mb-6 tracking-tight">
              КОНТАКТЫ
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Свяжитесь с нами удобным способом
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
            <div className="space-y-8">
              <Card className="p-8 border-2 border-border hover:border-primary transition-all">
                <div className="flex items-start gap-4">
                  <div className="bg-primary/10 p-4 rounded-lg">
                    <Icon
                      name="MapPin"
                      size={32}
                      className="text-primary"
                    />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">АДРЕС</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      г. Нижнекамск, Республика Татарстан
                      <br />
                      Центр креативных индустрий «База»
                    </p>
                  </div>
                </div>
              </Card>

              <Card className="p-8 border-2 border-border hover:border-primary transition-all">
                <div className="flex items-start gap-4">
                  <div className="bg-primary/10 p-4 rounded-lg">
                    <Icon name="Phone" size={32} className="text-primary" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">ТЕЛЕФОНЫ</h3>
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

              <Card className="p-8 border-2 border-border hover:border-primary transition-all">
                <div className="flex items-start gap-4">
                  <div className="bg-primary/10 p-4 rounded-lg">
                    <Icon name="Mail" size={32} className="text-primary" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">EMAIL</h3>
                    <a
                      href="mailto:@nkbaza"
                      className="text-muted-foreground hover:text-primary transition-colors"
                    >
                      @nkbaza
                    </a>
                  </div>
                </div>
              </Card>

              <Card className="p-8 border-2 border-border hover:border-primary transition-all">
                <div className="flex items-start gap-4">
                  <div className="bg-primary/10 p-4 rounded-lg">
                    <Icon name="Clock" size={32} className="text-primary" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">ВРЕМЯ РАБОТЫ</h3>
                    <div className="text-muted-foreground space-y-1">
                      <p>Понедельник - Пятница: 10:00 - 19:00</p>
                      <p>Суббота: 11:00 - 17:00</p>
                      <p>Воскресенье: выходной</p>
                    </div>
                  </div>
                </div>
              </Card>

              <Card className="p-8 border-2 border-border hover:border-primary transition-all">
                <div className="flex items-start gap-4">
                  <div className="bg-primary/10 p-4 rounded-lg">
                    <Icon name="MessageCircle" size={32} className="text-primary" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">СОЦИАЛЬНЫЕ СЕТИ</h3>
                    <div className="flex gap-4 mt-3">
                      <a
                        href="#"
                        className="bg-primary/10 hover:bg-primary/20 p-3 rounded-lg transition-colors"
                      >
                        <Icon name="Instagram" size={24} className="text-primary" />
                      </a>
                      <a
                        href="#"
                        className="bg-primary/10 hover:bg-primary/20 p-3 rounded-lg transition-colors"
                      >
                        <Icon name="MessageCircle" size={24} className="text-primary" />
                      </a>
                    </div>
                  </div>
                </div>
              </Card>
            </div>

            <div>
              <Card className="p-8 border-2 border-border">
                <h2 className="text-3xl font-black mb-6">
                  НАПИШИТЕ НАМ
                </h2>
                <form onSubmit={handleSubmit} className="space-y-6">
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

                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-primary text-primary-foreground hover:bg-primary/90 font-bold py-6 text-lg"
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
          <div className="text-center text-sm text-muted-foreground">
            © 2026 Центр креативных индустрий «База». Нижнекамск
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Contacts;
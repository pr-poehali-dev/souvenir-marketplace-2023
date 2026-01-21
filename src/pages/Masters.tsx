import { useState } from "react";
import { Link } from "react-router-dom";
import Icon from "@/components/ui/icon";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import TelegramButton from "@/components/WhatsAppButton";

const masters = [
  {
    id: 1,
    name: "Анна Смирнова",
    specialty: "Керамика",
    bio: "Создаю авторскую керамику с 2015 года. Работаю с глиной, создавая уникальные вазы, тарелки и декоративные элементы. Вдохновляюсь природой и геометрическими формами.",
    experience: "8 лет",
    productsCount: 24,
    image: "https://cdn.poehali.dev/projects/ef132fe9-5a9c-48f7-aa3a-1ab89d055fa5/files/845a6166-c30a-43f1-92a6-4b70e95c5a04.jpg",
    portfolio: [
      {
        id: 1,
        image: "https://cdn.poehali.dev/projects/ef132fe9-5a9c-48f7-aa3a-1ab89d055fa5/files/ca008c16-00de-496c-8e5a-d91430bb1ec0.jpg",
        title: "Ваза «Геометрия»",
        price: 3500,
      },
      {
        id: 2,
        image: "https://cdn.poehali.dev/projects/ef132fe9-5a9c-48f7-aa3a-1ab89d055fa5/files/ca008c16-00de-496c-8e5a-d91430bb1ec0.jpg",
        title: "Тарелка «Лес»",
        price: 2200,
      },
    ],
    achievements: ["Участник выставки «Арт-Казань 2023»", "Резидент «База» с 2020 года"],
  },
  {
    id: 2,
    name: "Сергей Петров",
    specialty: "Дерево",
    bio: "Мастер по дереву, специализируюсь на изделиях из массива дуба и ореха. Создаю функциональные предметы интерьера: разделочные доски, шкатулки, полки.",
    experience: "12 лет",
    productsCount: 31,
    image: "https://cdn.poehali.dev/projects/ef132fe9-5a9c-48f7-aa3a-1ab89d055fa5/files/8a635412-7a6f-4c8f-bcce-23d46448d921.jpg",
    portfolio: [
      {
        id: 3,
        image: "https://cdn.poehali.dev/projects/ef132fe9-5a9c-48f7-aa3a-1ab89d055fa5/files/411954cf-4b2f-4ba5-8933-b2a8e3c3642b.jpg",
        title: "Доска из дуба",
        price: 2800,
      },
      {
        id: 4,
        image: "https://cdn.poehali.dev/projects/ef132fe9-5a9c-48f7-aa3a-1ab89d055fa5/files/411954cf-4b2f-4ba5-8933-b2a8e3c3642b.jpg",
        title: "Шкатулка",
        price: 3200,
      },
    ],
    achievements: ["Мастер года «База» 2022", "Участник ярмарки «Сделано в Татарстане»"],
  },
  {
    id: 3,
    name: "Мария Иванова",
    specialty: "Текстиль",
    bio: "Создаю текстильные изделия с авторскими принтами и вышивкой. Работаю с натуральными тканями: хлопок, лён. Каждое изделие — уникально.",
    experience: "5 лет",
    productsCount: 18,
    image: "https://cdn.poehali.dev/projects/ef132fe9-5a9c-48f7-aa3a-1ab89d055fa5/files/95dadd00-58f5-49c1-b174-60b7b7d628b8.jpg",
    portfolio: [
      {
        id: 5,
        image: "https://cdn.poehali.dev/projects/ef132fe9-5a9c-48f7-aa3a-1ab89d055fa5/files/f318b2e5-f056-481f-84f0-ff007e635906.jpg",
        title: "Сумка-шоппер",
        price: 1500,
      },
      {
        id: 6,
        image: "https://cdn.poehali.dev/projects/ef132fe9-5a9c-48f7-aa3a-1ab89d055fa5/files/f318b2e5-f056-481f-84f0-ff007e635906.jpg",
        title: "Подушка «Узоры»",
        price: 1800,
      },
    ],
    achievements: ["Лауреат конкурса «Молодые мастера 2023»"],
  },
];

const Masters = () => {
  const [cartCount] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [selectedSpecialty, setSelectedSpecialty] = useState("Все");

  const specialties = ["Все", "Керамика", "Дерево", "Текстиль"];

  const filteredMasters =
    selectedSpecialty === "Все"
      ? masters
      : masters.filter((master) => master.specialty === selectedSpecialty);

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

            <nav className="hidden lg:flex items-center gap-6">
              <Link to="/" className="hover:text-primary transition-colors font-medium">
                Каталог
              </Link>
              <Link
                to="/masters"
                className="text-primary hover:text-primary transition-colors font-medium"
              >
                Мастера
              </Link>
              <a href="#about" className="hover:text-primary transition-colors font-medium">
                О центре
              </a>
              <a href="#delivery" className="hover:text-primary transition-colors font-medium">
                Доставка
              </a>
              <a href="#contacts" className="hover:text-primary transition-colors font-medium">
                Контакты
              </a>
            </nav>

            <div className="flex items-center gap-4">
              <Button variant="ghost" size="icon" className="relative">
                <Icon name="ShoppingCart" size={24} />
                {cartCount > 0 && (
                  <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 bg-primary text-primary-foreground">
                    {cartCount}
                  </Badge>
                )}
              </Button>
              <Button variant="ghost" size="icon">
                <Icon name="User" size={24} />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="lg:hidden"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                <Icon name="Menu" size={24} />
              </Button>
            </div>
          </div>

          {mobileMenuOpen && (
            <nav className="lg:hidden py-4 border-t border-border animate-fade-in">
              <div className="flex flex-col gap-4">
                <Link to="/" className="hover:text-primary transition-colors font-medium">
                  Каталог
                </Link>
                <Link
                  to="/masters"
                  className="text-primary hover:text-primary transition-colors font-medium"
                >
                  Мастера
                </Link>
                <a href="#about" className="hover:text-primary transition-colors font-medium">
                  О центре
                </a>
                <a href="#delivery" className="hover:text-primary transition-colors font-medium">
                  Доставка
                </a>
                <a href="#contacts" className="hover:text-primary transition-colors font-medium">
                  Контакты
                </a>
              </div>
            </nav>
          )}
        </div>
      </header>

      <section className="relative py-20 overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mb-12">
            <h1 className="text-5xl lg:text-7xl font-black mb-6 leading-tight">
              НАШИ <span className="text-primary">МАСТЕРА</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl">
              Талантливые резиденты Центра креативных индустрий «База», создающие уникальные
              изделия ручной работы
            </p>
          </div>

          <div className="flex flex-wrap gap-3 mb-12">
            {specialties.map((specialty) => (
              <Button
                key={specialty}
                variant={selectedSpecialty === specialty ? "default" : "outline"}
                onClick={() => setSelectedSpecialty(specialty)}
                className="font-bold"
              >
                {specialty}
              </Button>
            ))}
          </div>

          <div className="space-y-12">
            {filteredMasters.map((master, index) => (
              <Card
                key={master.id}
                className="overflow-hidden animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="grid lg:grid-cols-[400px_1fr] gap-8 p-8">
                  <div>
                    <div className="aspect-square overflow-hidden bg-muted mb-6">
                      <img
                        src={master.image}
                        alt={master.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="space-y-4">
                      <div>
                        <p className="text-sm text-muted-foreground mb-1">ОПЫТ</p>
                        <p className="font-bold text-lg">{master.experience}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground mb-1">ТОВАРОВ</p>
                        <p className="font-bold text-lg">{master.productsCount}</p>
                      </div>
                      <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90 font-bold">
                        СМОТРЕТЬ ВСЕ ТОВАРЫ
                      </Button>
                    </div>
                  </div>

                  <div>
                    <Badge className="mb-4 bg-primary text-primary-foreground">
                      {master.specialty}
                    </Badge>
                    <h2 className="text-4xl font-black mb-4">{master.name}</h2>
                    <p className="text-lg text-muted-foreground mb-8">{master.bio}</p>

                    <Tabs defaultValue="portfolio" className="w-full">
                      <TabsList className="w-full justify-start mb-6">
                        <TabsTrigger value="portfolio" className="font-bold">
                          ПОРТФОЛИО
                        </TabsTrigger>
                        <TabsTrigger value="achievements" className="font-bold">
                          ДОСТИЖЕНИЯ
                        </TabsTrigger>
                      </TabsList>

                      <TabsContent value="portfolio">
                        <div className="grid grid-cols-2 gap-4">
                          {master.portfolio.map((item) => (
                            <Card
                              key={item.id}
                              className="overflow-hidden group hover:border-primary transition-all"
                            >
                              <div className="aspect-square overflow-hidden bg-muted">
                                <img
                                  src={item.image}
                                  alt={item.title}
                                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                />
                              </div>
                              <div className="p-4">
                                <h3 className="font-bold mb-2 group-hover:text-primary transition-colors">
                                  {item.title}
                                </h3>
                                <p className="text-xl font-black text-primary">
                                  {item.price.toLocaleString()}₽
                                </p>
                              </div>
                            </Card>
                          ))}
                        </div>
                      </TabsContent>

                      <TabsContent value="achievements">
                        <div className="space-y-3">
                          {master.achievements.map((achievement, idx) => (
                            <div key={idx} className="flex items-start gap-3">
                              <Icon
                                name="Award"
                                size={20}
                                className="text-primary mt-1 shrink-0"
                              />
                              <p className="text-muted-foreground">{achievement}</p>
                            </div>
                          ))}
                        </div>
                      </TabsContent>
                    </Tabs>
                  </div>
                </div>
              </Card>
            ))}
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
                <Link to="/masters" className="hover:text-primary transition-colors">
                  Мастера
                </Link>
                <a href="#about" className="hover:text-primary transition-colors">
                  О центре
                </a>
              </div>
            </div>
            <div>
              <h5 className="font-bold mb-4">ИНФОРМАЦИЯ</h5>
              <div className="flex flex-col gap-2 text-sm">
                <a href="#delivery" className="hover:text-primary transition-colors">
                  Доставка и оплата
                </a>
                <a href="#contacts" className="hover:text-primary transition-colors">
                  Контакты
                </a>
                <a href="#" className="hover:text-primary transition-colors">
                  Личный кабинет
                </a>
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

export default Masters;
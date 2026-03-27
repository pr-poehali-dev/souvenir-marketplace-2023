import { useState } from "react";
import { Link } from "react-router-dom";
import Icon from "@/components/ui/icon";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import TelegramButton from "@/components/TelegramButton";
import MaxButton from "@/components/MaxButton";

const masters = [
  {
    id: 1,
    name: "Канарцева Дарья и Сибгатуллина Эльвира",
    specialty: "Керамика",
    bio: "Творческая группа, создающая посуду и предметы интерьера ручной работы из глины. Стаж работы более 6 лет. Работаем с разными видами глин и в разных техниках.",
    experience: "6+ лет",
    productsCount: 24,
    image: "https://cdn.poehali.dev/projects/ef132fe9-5a9c-48f7-aa3a-1ab89d055fa5/bucket/d2692826-f5e4-4bfd-8b6d-ab45f19debac.jpg",
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
    name: "Кристина Родихина, мастерская МаРо",
    specialty: "Ювелирное дело",
    bio: "Художник-ювелир, создаёт авторские украшения из серебра с филигранью. Популяризирует украшения с древним филигранным узором, отражающие дыхание нового времени. Примерить и приобрести украшения можно в мастерской. Также мастер проводит мастер-классы для взрослых по созданию уникальных колец с чеканкой — каждый может попробовать себя в роли ювелира.",
    experience: "",
    productsCount: 0,
    image: "https://cdn.poehali.dev/projects/ef132fe9-5a9c-48f7-aa3a-1ab89d055fa5/bucket/597e384f-183a-4a43-8754-06e4bdfd27d2.jpg",
    portfolio: [],
    achievements: ["Авторские украшения из серебра с филигранью", "Мастер-классы по созданию колец с чеканкой"],
  },
  {
    id: 3,
    name: "Мастерская БайБикә",
    specialty: "Текстиль",
    bio: "Мы создаём особенные вещи, в которых живёт душа и любовь: открытка-картина с авторской сказкой — двойной сюрприз с нашим искусством в рисунке и вашими чувствами в личной истории; намазные носки из натуральной кожи ручной работы, индивидуальный пошив на заказ. Творчество, несущее тепло и частичку нашего Татарстана.",
    experience: "5 лет",
    productsCount: 18,
    image: "https://cdn.poehali.dev/projects/ef132fe9-5a9c-48f7-aa3a-1ab89d055fa5/bucket/78ae5f90-a228-4d1b-9132-0ab65c32e39e.jpg",
    portfolio: [
      {
        id: 5,
        image: "https://cdn.poehali.dev/projects/ef132fe9-5a9c-48f7-aa3a-1ab89d055fa5/files/f318b2e5-f056-481f-84f0-ff007e635906.jpg",
        title: "Открытка-картина",
        price: 1500,
      },
      {
        id: 6,
        image: "https://cdn.poehali.dev/projects/ef132fe9-5a9c-48f7-aa3a-1ab89d055fa5/files/f318b2e5-f056-481f-84f0-ff007e635906.jpg",
        title: "Намазные носки",
        price: 1800,
      },
    ],
    achievements: ["Резидент «База» с 2020 года"],
  },
  {
    id: 4,
    name: "Творческая группа Indie art",
    specialty: "Текстиль",
    bio: "Объединяет профессиональных художников с высшим профильным образованием — членов профессиональных художественных сообществ. Создаём уникальную авторскую графику со смыслом: принты для одежды, текстильные аксессуары (платки, банданы), роспись домашнего текстиля, батик, художественная роспись кожи. Гармонично соединяем национальный колорит и современные художественные практики.",
    experience: "17 лет",
    productsCount: 32,
    image: "https://cdn.poehali.dev/projects/ef132fe9-5a9c-48f7-aa3a-1ab89d055fa5/bucket/154d280a-1b5a-4539-9a19-8848fe54bab5.jpg",
    portfolio: [
      {
        id: 7,
        image: "https://cdn.poehali.dev/projects/ef132fe9-5a9c-48f7-aa3a-1ab89d055fa5/bucket/c652b4d9-b946-4a00-a4d6-9c0fec1d7179.jpg",
        title: "Серия «Milli mon» — полотно №1\nШёлковая живопись • холодный батик • 50×100 см • натуральный шёлк туаль • гусиные перья • бамбуковые палочки\nАвторская работа с чертами национальных традиций.\n«Milli mon»: воплощение души татарского народа в авторском видении художника Диляры Закировой",
        price: 12000,
        contain: true,
      },
      {
        id: 71,
        image: "https://cdn.poehali.dev/projects/ef132fe9-5a9c-48f7-aa3a-1ab89d055fa5/bucket/009b0cc1-1ab3-484b-8cd0-1d1f3ff437ac.jpg",
        title: "Серия «Milli mon» — полотно №2\nШёлковая живопись • холодный батик • 50×100 см • натуральный шёлк туаль • гусиные перья • бамбуковые палочки\nАвторская работа с чертами национальных традиций.",
        price: 12000,
        contain: true,
      },
      {
        id: 72,
        image: "https://cdn.poehali.dev/projects/ef132fe9-5a9c-48f7-aa3a-1ab89d055fa5/bucket/70b001bc-a1d7-4637-820b-abbf3729016f.jpg",
        title: "Серия «Milli mon» — полотно №3\nШёлковая живопись • холодный батик • 50×100 см • натуральный шёлк туаль • гусиные перья • бамбуковые палочки\nАвторская работа с чертами национальных традиций.",
        price: 12000,
        contain: true,
      },
      {
        id: 73,
        image: "https://cdn.poehali.dev/projects/ef132fe9-5a9c-48f7-aa3a-1ab89d055fa5/bucket/c077b329-dc23-4b0b-986a-b2357cf31d72.jpg",
        title: "Серия «Milli mon» — полотно №4\nШёлковая живопись • холодный батик • 50×100 см • натуральный шёлк туаль • гусиные перья • бамбуковые палочки\nАвторская работа с чертами национальных традиций.",
        price: 12000,
        contain: true,
      },
      {
        id: 8,
        image: "https://cdn.poehali.dev/projects/ef132fe9-5a9c-48f7-aa3a-1ab89d055fa5/bucket/60789abd-db38-4128-86fd-66eaaaa3fe87.jpg",
        title: "«Мой Барсик»\nШёлковый платок 50×50 см • холодный батик • натуральный шёлк\nВ центре — белый барс, символ Татарстана, в игривой и образной манере. Национальные мотивы, переосмысленные в современном ключе. Ручная роспись подчёркивает индивидуальность каждого изделия.",
        price: 2000,
        contain: true,
      },
      {
        id: 9,
        image: "https://cdn.poehali.dev/projects/ef132fe9-5a9c-48f7-aa3a-1ab89d055fa5/bucket/0d7c079f-8d97-4982-b366-2f4807d7d22e.jpg",
        title: "«Мечеть Джамиг»\nШёлковый платок 50×50 см • холодный батик • натуральный шёлк\nОбраз мечети Джамиг в современной интерпретации. Добавьте в свой гардероб частичку архитектурного наследия и духовной красоты!",
        price: 2000,
        contain: true,
      },
      {
        id: 10,
        image: "https://cdn.poehali.dev/projects/ef132fe9-5a9c-48f7-aa3a-1ab89d055fa5/bucket/07757c26-de03-4bef-91e0-cb9d50667e89.jpg",
        title: "«Промзона» — авторская работа Диляры Закировой\nХолст • акрил • 60×80 см\nСредневековые чайники как метафора индустриального пейзажа: их формы перекликаются с очертаниями заводских труб, резервуаров и конструкций. Выразительная текстура полотна добавляет глубину и тактильность образу.",
        price: 24000,
        contain: true,
      },
    ],
    achievements: [
      "Художник года 2025 (Нижнекамск)",
      "Победители всероссийских и республиканских конкурсов изобразительного искусства",
      "Участник международной лаборатории для молодых художников Bahsnya",
      "Член союза художников РТ",
      "Член международного союза педагогов-художников",
      "Резидент «База» с 2018 года"
    ],
  },
];

const Masters = () => {
  const [cartCount, setCartCount] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [selectedSpecialty, setSelectedSpecialty] = useState("Все");
  const [notification, setNotification] = useState<{ show: boolean; title: string }>({ show: false, title: "" });

  const addToCart = (item: { id: number; title: string; price: number }) => {
    setCartCount((prev) => prev + 1);
    setNotification({ show: true, title: item.title });
    setTimeout(() => {
      setNotification({ show: false, title: "" });
    }, 3000);
  };

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
              <a href="/#about" className="hover:text-primary transition-colors font-medium">
                О центре
              </a>
              <a href="/#delivery" className="hover:text-primary transition-colors font-medium">
                Доставка
              </a>
              <a href="/#contacts" className="hover:text-primary transition-colors font-medium">
                Контакты
              </a>
            </nav>

            <div className="flex items-center gap-4">
              <a href="https://vk.com/bazik_nk" target="_blank" rel="noopener noreferrer" className="hidden lg:flex items-center justify-center w-9 h-9 rounded-md hover:bg-accent transition-colors text-muted-foreground hover:text-primary">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12.785 16.241s.288-.032.436-.194c.136-.148.132-.427.132-.427s-.02-1.304.587-1.496c.6-.19 1.37 1.261 2.185 1.818.616.42 1.085.328 1.085.328l2.177-.03s1.137-.071.598-.964c-.044-.073-.314-.661-1.618-1.869-1.366-1.265-1.182-1.06.462-3.248.999-1.332 1.398-2.145 1.273-2.493-.12-.332-.855-.244-.855-.244l-2.451.015s-.182-.025-.317.056c-.132.079-.217.264-.217.264s-.387 1.028-.903 1.904c-1.088 1.85-1.524 1.948-1.703 1.834-.414-.267-.31-1.075-.31-1.648 0-1.793.272-2.54-.529-2.733-.266-.064-.461-.107-1.141-.114-.872-.009-1.609.003-2.027.207-.278.136-.492.439-.362.456.161.021.527.099.721.363.25.341.241 1.107.241 1.107s.144 2.112-.335 2.372c-.329.178-.779-.185-1.747-1.845-.496-.859-.871-1.811-.871-1.811s-.072-.176-.202-.271c-.157-.115-.376-.151-.376-.151l-2.328.015s-.35.01-.478.162C3.005 8.93 3.122 9.26 3.122 9.26s1.82 4.26 3.881 6.406c1.89 1.97 4.04 1.84 4.04 1.84l1.742-.031z"/></svg>
              </a>
              <a href="https://t.me/nkBaza" target="_blank" rel="noopener noreferrer" className="hidden lg:flex items-center justify-center w-9 h-9 rounded-md hover:bg-accent transition-colors text-muted-foreground hover:text-primary">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.894 8.221-1.97 9.28c-.145.658-.537.818-1.084.508l-3-2.21-1.447 1.394c-.16.16-.295.295-.605.295l.213-3.053 5.56-5.023c.242-.213-.054-.333-.373-.12L7.26 13.5l-2.956-.924c-.643-.204-.657-.643.136-.953l11.57-4.461c.537-.194 1.006.131.884.059z"/></svg>
              </a>
              <a href="https://max.ru/id1651051381_gos" target="_blank" rel="noopener noreferrer" className="hidden lg:flex items-center justify-center w-9 h-9 rounded-md hover:bg-accent transition-colors text-muted-foreground hover:text-primary">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="24" height="24" rx="6" fill="#7B2BF9"/><text x="12" y="17" textAnchor="middle" fill="white" fontSize="13" fontWeight="bold" fontFamily="Arial, sans-serif">M</text></svg>
              </a>
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
                <a href="/#about" className="hover:text-primary transition-colors font-medium">
                  О центре
                </a>
                <a href="/#delivery" className="hover:text-primary transition-colors font-medium">
                  Доставка
                </a>
                <a href="/#contacts" className="hover:text-primary transition-colors font-medium">
                  Контакты
                </a>
                <div className="flex gap-3 pt-2 border-t border-border">
                  <a href="https://vk.com/bazik_nk" target="_blank" rel="noopener noreferrer" className="flex-1 flex items-center justify-center gap-2 py-2 px-3 rounded-lg text-white font-medium transition-opacity hover:opacity-90" style={{backgroundColor: '#0077FF'}}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12.785 16.241s.288-.032.436-.194c.136-.148.132-.427.132-.427s-.02-1.304.587-1.496c.6-.19 1.37 1.261 2.185 1.818.616.42 1.085.328 1.085.328l2.177-.03s1.137-.071.598-.964c-.044-.073-.314-.661-1.618-1.869-1.366-1.265-1.182-1.06.462-3.248.999-1.332 1.398-2.145 1.273-2.493-.12-.332-.855-.244-.855-.244l-2.451.015s-.182-.025-.317.056c-.132.079-.217.264-.217.264s-.387 1.028-.903 1.904c-1.088 1.85-1.524 1.948-1.703 1.834-.414-.267-.31-1.075-.31-1.648 0-1.793.272-2.54-.529-2.733-.266-.064-.461-.107-1.141-.114-.872-.009-1.609.003-2.027.207-.278.136-.492.439-.362.456.161.021.527.099.721.363.25.341.241 1.107.241 1.107s.144 2.112-.335 2.372c-.329.178-.779-.185-1.747-1.845-.496-.859-.871-1.811-.871-1.811s-.072-.176-.202-.271c-.157-.115-.376-.151-.376-.151l-2.328.015s-.35.01-.478.162C3.005 8.93 3.122 9.26 3.122 9.26s1.82 4.26 3.881 6.406c1.89 1.97 4.04 1.84 4.04 1.84l1.742-.031z"/></svg>
                    ВКонтакте
                  </a>
                  <a href="https://t.me/nkBaza" target="_blank" rel="noopener noreferrer" className="flex-1 flex items-center justify-center gap-2 py-2 px-3 rounded-lg text-white font-medium transition-opacity hover:opacity-90" style={{backgroundColor: '#2AABEE'}}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.894 8.221-1.97 9.28c-.145.658-.537.818-1.084.508l-3-2.21-1.447 1.394c-.16.16-.295.295-.605.295l.213-3.053 5.56-5.023c.242-.213-.054-.333-.373-.12L7.26 13.5l-2.956-.924c-.643-.204-.657-.643.136-.953l11.57-4.461c.537-.194 1.006.131.884.059z"/></svg>
                    Telegram
                  </a>
                  <a href="https://max.ru/id1651051381_gos" target="_blank" rel="noopener noreferrer" className="flex-1 flex items-center justify-center gap-2 py-2 px-3 rounded-lg text-white font-medium transition-opacity hover:opacity-90" style={{backgroundColor: '#7B2BF9'}}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><rect width="24" height="24" rx="6" fill="white" fillOpacity="0.2"/><text x="12" y="17" textAnchor="middle" fill="white" fontSize="13" fontWeight="bold" fontFamily="Arial, sans-serif">M</text></svg>
                    MAX
                  </a>
                </div>
              </div>
            </nav>
          )}
        </div>
      </header>

      <section className="relative py-12 sm:py-20 overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mb-8 sm:mb-12">
            <h1 className="text-3xl sm:text-5xl lg:text-7xl font-black mb-4 sm:mb-6 leading-tight">
              НАШИ <span className="text-primary">МАСТЕРА</span>
            </h1>
            <p className="text-base sm:text-xl text-muted-foreground max-w-2xl">
              Талантливые резиденты Центра креативных индустрий «База», создающие уникальные
              изделия ручной работы
            </p>
          </div>

          <div className="flex flex-wrap gap-2 sm:gap-3 mb-8 sm:mb-12">
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

          <div className="space-y-8 sm:space-y-12">
            {filteredMasters.map((master, index) => (
              <Card
                key={master.id}
                className="overflow-hidden animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="grid lg:grid-cols-[400px_1fr] gap-6 sm:gap-8 p-5 sm:p-8">
                  <div>
                    <div className="overflow-hidden bg-muted mb-6 rounded-lg">
                      <img
                        src={master.image}
                        alt={master.name}
                        className="w-full h-auto object-contain"
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
                    <Badge className="mb-3 sm:mb-4 bg-primary text-primary-foreground text-xs sm:text-sm">
                      {master.specialty}
                    </Badge>
                    <h2 className="text-2xl sm:text-4xl font-black mb-3 sm:mb-4">{master.name}</h2>
                    <p className="text-sm sm:text-lg text-muted-foreground mb-6 sm:mb-8">{master.bio}</p>

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
                        {master.id === 4 && (
                          <Card className="mb-4 p-3 sm:p-4 border-primary border-2 bg-primary/5">
                            <div className="flex flex-col gap-3">
                              <div>
                                <p className="font-black text-base sm:text-lg">Вся серия «Milli mon»</p>
                                <p className="text-xs sm:text-sm text-muted-foreground mt-0.5">4 авторских полотна · холодный батик · шёлк туаль</p>
                              </div>
                              <div className="flex items-center justify-between gap-3">
                                <p className="text-xl sm:text-2xl font-black text-primary">42 000₽</p>
                                <Button
                                  onClick={() => addToCart({ id: 999, title: "Серия «Milli mon» — 4 полотна", price: 42000 })}
                                  className="bg-primary text-primary-foreground hover:bg-primary/90 font-bold text-xs sm:text-sm"
                                >
                                  <Icon name="ShoppingCart" size={16} className="mr-1.5" />
                                  КУПИТЬ ВСЮ СЕРИЮ
                                </Button>
                              </div>
                            </div>
                          </Card>
                        )}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                          {master.portfolio.map((item) => (
                            <Card
                              key={item.id}
                              className="overflow-hidden group hover:border-primary transition-all"
                            >
                              <div className={`overflow-hidden bg-muted flex items-center justify-center ${"contain" in item && item.contain ? "p-2" : "aspect-square"}`}>
                                <img
                                  src={item.image}
                                  alt={item.title}
                                  className={`group-hover:scale-105 transition-transform duration-300 ${"contain" in item && item.contain ? "w-full h-auto object-contain" : "w-full h-full object-cover"}`}
                                />
                              </div>
                              <div className="p-3 sm:p-4">
                                <h3 className="font-bold text-sm sm:text-base mb-2 group-hover:text-primary transition-colors whitespace-pre-line">
                                  {item.title}
                                </h3>
                                <div className="flex items-center justify-between gap-2 mb-1">
                                  <p className="text-lg sm:text-xl font-black text-primary">
                                    {item.price.toLocaleString()}₽{"contain" in item && item.contain && item.id >= 7 && item.id <= 73 ? "/полотно" : ""}
                                  </p>
                                </div>
                                {"contain" in item && item.contain && item.id >= 7 && item.id <= 73 && (
                                  <p className="text-xs text-muted-foreground mb-3">Вся серия «Milli mon» (4 полотна) — 42&nbsp;000₽</p>
                                )}
                                {(!("contain" in item && item.contain && item.id >= 7 && item.id <= 73)) && <div className="mb-3" />}
                                <Button
                                  onClick={() => addToCart(item)}
                                  className="w-full bg-primary text-primary-foreground hover:bg-primary/90 font-bold"
                                >
                                  <Icon name="ShoppingCart" size={18} className="mr-2" />
                                  В КОРЗИНУ
                                </Button>
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

      {notification.show && (
        <div className="fixed bottom-4 right-4 sm:bottom-8 sm:right-8 z-50 animate-fade-in">
          <Card className="p-4 shadow-lg border-primary bg-card">
            <div className="flex items-center gap-3">
              <div className="bg-primary/10 p-2 rounded-full">
                <Icon name="CheckCircle" size={24} className="text-primary" />
              </div>
              <div>
                <p className="font-bold">Добавлено в корзину</p>
                <p className="text-sm text-muted-foreground">{notification.title}</p>
              </div>
            </div>
          </Card>
        </div>
      )}

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
                <a href="https://vk.com/bazik_nk" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">ВКонтакте</a>
                <a href="https://t.me/nkBaza" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">Telegram</a>
                <a href="https://max.ru/id1651051381_gos" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">MAX</a>
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

export default Masters;
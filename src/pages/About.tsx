import { useState } from "react";
import { Link } from "react-router-dom";
import Icon from "@/components/ui/icon";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import TelegramButton from "@/components/TelegramButton";
import MaxButton from "@/components/MaxButton";

const About = () => {
  const [cartItems] = useState([]);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const stats = [
    { value: "10 000+", label: "Кв. метров площади" },
    { value: "21", label: "Постоянных резидентов" },
    { value: "500+", label: "Мероприятий за 2024–2025 г." },
    { value: "120 000+", label: "Человек охвачено" },
  ];

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
              <Link to="/masters" className="hover:text-primary transition-colors font-medium">
                Мастера
              </Link>
              <Link
                to="/about"
                className="text-primary hover:text-primary transition-colors font-medium"
              >
                О центре
              </Link>
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
                {cartItems.length > 0 && (
                  <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 bg-primary text-primary-foreground">
                    {cartItems.length}
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
                <Link to="/masters" className="hover:text-primary transition-colors font-medium">
                  Мастера
                </Link>
                <Link
                  to="/about"
                  className="text-primary hover:text-primary transition-colors font-medium"
                >
                  О центре
                </Link>
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

      <section className="relative py-12 sm:py-20 lg:py-32 overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mb-12 sm:mb-16">
            <h1 className="text-3xl sm:text-5xl lg:text-7xl font-black mb-4 sm:mb-6 leading-tight">
              ЦЕНТР КРЕАТИВНЫХ ИНДУСТРИЙ{" "}
              <span className="text-primary">«БАЗА»</span>
            </h1>
            <p className="text-base sm:text-xl text-muted-foreground mb-6 sm:mb-8">
              Место, где процветает творческий потенциал и воплощаются самые смелые идеи.
              Точка притяжения для резидентов, где каждый может реализовать свои творческие
              идеи в различных сферах искусства.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
              <Button
                size="lg"
                className="bg-primary text-primary-foreground hover:bg-primary/90 font-bold w-full sm:w-auto"
                asChild
              >
                <Link to="/masters">НАШИ МАСТЕРА</Link>
              </Button>
              <Button size="lg" variant="outline" className="font-bold w-full sm:w-auto" asChild>
                <Link to="/">СМОТРЕТЬ ТОВАРЫ</Link>
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 mb-12 sm:mb-20">
            {stats.map((stat, index) => (
              <Card
                key={index}
                className="p-4 sm:p-6 text-center animate-scale-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="text-2xl sm:text-4xl font-black text-primary mb-1 sm:mb-2">{stat.value}</div>
                <div className="text-xs sm:text-sm text-muted-foreground">{stat.label}</div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 sm:py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl sm:text-4xl font-black mb-8 sm:mb-12">О ЦЕНТРЕ</h2>

            <div className="space-y-6 sm:space-y-8 text-base sm:text-lg">
              <div>
                <h3 className="text-2xl font-bold mb-4 text-primary">О центре</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Муниципальное автономное учреждение «Центр креативных индустрий «База» — это новый уникальный проект в Республике Татарстан, появившийся в г. Нижнекамск благодаря поддержке руководства Республики Татарстан и ПАО «СИБУР Холдинг».
                </p>
                <p className="text-muted-foreground leading-relaxed mt-3">
                  Объект представляет собой комплекс из 3 основных зданий, 2 ангаров и 36 боксов (общей площадью более 10 тысяч кв.м.) и более 2 га придомовой территории — специализированную площадку для поддержки и развития креативных индустрий в Нижнекамском муниципальном районе.
                </p>
              </div>

              <Separator />

              <div>
                <h3 className="text-2xl font-bold mb-4 text-primary">Наша миссия</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Основная миссия «Базы» — содействие в создании благоприятных условий для реализации творческих способностей и профессиональных навыков предпринимателей, занятых в сфере креативных индустрий. На «Базе» предоставляется возможность для обучения, обмена опытом и разработки новых проектов и стартапов в области креативной экономики.
                </p>
              </div>

              <Separator />

              <div>
                <h3 className="text-2xl font-bold mb-4 text-primary">Задачи центра</h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li className="flex items-start gap-3">
                    <Icon name="Check" size={20} className="text-primary mt-1 shrink-0" />
                    <span>Создание условий для развития творческих индустрий</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Icon name="Check" size={20} className="text-primary mt-1 shrink-0" />
                    <span>Развитие инфраструктуры для творческих индустрий</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Icon name="Check" size={20} className="text-primary mt-1 shrink-0" />
                    <span>Продвижение творческих индустрий на рынке</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Icon name="Check" size={20} className="text-primary mt-1 shrink-0" />
                    <span>Сотрудничество с другими организациями</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Icon name="Check" size={20} className="text-primary mt-1 shrink-0" />
                    <span>Обучение и развитие специалистов в творческих индустриях</span>
                  </li>
                </ul>
              </div>

              <Separator />

              <div>
                <h3 className="text-2xl font-bold mb-4 text-primary">Инфраструктура</h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li className="flex items-start gap-3">
                    <Icon name="Check" size={20} className="text-primary mt-1 shrink-0" />
                    <span>Два больших универсальных зала для концертов, тренингов, семинаров и конференций</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Icon name="Check" size={20} className="text-primary mt-1 shrink-0" />
                    <span>Школа креативных индустрий: студии современной электронной музыки, звукорежиссуры, 2D/3D анимации, фото и видеопроизводства, интерактивных цифровых технологий и графического дизайна</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Icon name="Check" size={20} className="text-primary mt-1 shrink-0" />
                    <span>Кафе и коворкинг-зона для работы и отдыха</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Icon name="Check" size={20} className="text-primary mt-1 shrink-0" />
                    <span>Универсальные помещения и Event-холл для мероприятий</span>
                  </li>
                </ul>
              </div>

              <Separator />

              <div>
                <h3 className="text-2xl font-bold mb-4 text-primary">Резиденты</h3>
                <p className="text-muted-foreground leading-relaxed mb-3">
                  На сегодняшний день на «Базе» уже <strong className="text-foreground">21 резидент</strong> ведёт свою деятельность на постоянной основе: гончарная и ювелирная мастерские, художественные студии, студия видеопродакшена полного цикла, школы барменов и паркура, детские развивающие центры, семейная фотостудия, школа иностранных языков, центр по работе с релокантами «Локация», вокальная студия, музыкально-продюсерский центр, фитнес-центр, студии танцев.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  Суммарная выручка постоянных резидентов за 2025 год превысила <strong className="text-foreground">16 млн рублей</strong>.
                </p>
              </div>

              <Separator />

              <div>
                <h3 className="text-2xl font-bold mb-4 text-primary">Мероприятия</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Более 100 резидентов разово организовали свои мероприятия на «Базе». За 2024–2025 гг. прошло более <strong className="text-foreground">500 мероприятий</strong> различного формата, из них 74 крупных и знаковых для Нижнекамска и Республики Татарстан в целом. Проведено <strong className="text-foreground">962 мастер-класса</strong> по различным видам изобразительного и прикладного творчества. Общий охват населения — более <strong className="text-foreground">120 000 человек</strong>.
                </p>
              </div>

              <Separator />

              <div>
                <h3 className="text-2xl font-bold mb-4 text-primary">Целевая аудитория</h3>
                <p className="text-muted-foreground leading-relaxed mb-3">«База» открыта для тех, кто:</p>
                <ul className="space-y-2 text-muted-foreground">
                  <li className="flex items-start gap-3">
                    <Icon name="Check" size={20} className="text-primary mt-1 shrink-0" />
                    <span>Уже реализует себя в творческом направлении и хочет развиваться</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Icon name="Check" size={20} className="text-primary mt-1 shrink-0" />
                    <span>Имеет интересные идеи или проекты</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Icon name="Check" size={20} className="text-primary mt-1 shrink-0" />
                    <span>Стремится к творческой самореализации</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Icon name="Check" size={20} className="text-primary mt-1 shrink-0" />
                    <span>Желает развивать креативные компетенции</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Icon name="Check" size={20} className="text-primary mt-1 shrink-0" />
                    <span>Хочет развиваться в сфере креативных индустрий</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 sm:py-20 bg-card">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl sm:text-4xl font-black mb-6 sm:mb-8">СТАТЬ РЕЗИДЕНТОМ</h2>
            <p className="text-base sm:text-xl text-muted-foreground mb-6 sm:mb-8">
              Хотите стать частью творческого сообщества «База»? Свяжитесь с нами!
            </p>
            <div className="flex flex-col items-center gap-4">
              <div className="flex items-center gap-3">
                <Icon name="Phone" size={24} className="text-primary" />
                <a href="tel:+78555323848" className="text-lg hover:text-primary transition-colors">
                  +7 (8555) 32-38-48
                </a>
              </div>
              <div className="flex items-center gap-3">
                <Icon name="Phone" size={24} className="text-primary" />
                <a href="tel:+79872636313" className="text-lg hover:text-primary transition-colors">
                  +7 (987) 263-63-13
                </a>
              </div>
              <div className="flex items-center gap-3">
                <Icon name="MessageCircle" size={24} className="text-primary" />
                <a
                  href="https://t.me/nkBaza"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-lg hover:text-primary transition-colors"
                >
                  Telegram
                </a>
              </div>
              <div className="flex items-center gap-3">
                <Icon name="Users" size={24} className="text-primary" />
                <a
                  href="https://vk.com/bazik_nk"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-lg hover:text-primary transition-colors"
                >
                  ВКонтакте
                </a>
              </div>
              <div className="flex items-center gap-3">
                <Icon name="Zap" size={24} className="text-primary" />
                <a
                  href="https://max.ru/id1651051381_gos"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-lg hover:text-primary transition-colors"
                >
                  MAX
                </a>
              </div>
              <div className="flex items-center gap-3">
                <Icon name="MapPin" size={24} className="text-primary" />
                <span className="text-lg">Нижнекамск, ул. Лесная, 53, 55</span>
              </div>
            </div>
            <p className="text-sm text-muted-foreground mt-8">
              Режим работы: ежедневно с 10:00 до 22:00
            </p>
          </div>
        </div>
      </section>

      <TelegramButton />
      <MaxButton />

      <footer className="bg-card border-t border-border py-8 sm:py-12 mt-10 sm:mt-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
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
                <Link to="/about" className="hover:text-primary transition-colors">
                  О центре
                </Link>
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

export default About;
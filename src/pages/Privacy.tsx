import { Link } from "react-router-dom";
import { useState } from "react";
import Icon from "@/components/ui/icon";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

const Privacy = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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
            <Link to="/" className="flex items-center gap-3">
              <img
                src="https://cdn.poehali.dev/projects/ef132fe9-5a9c-48f7-aa3a-1ab89d055fa5/bucket/7ba2c399-7e05-4810-bdb1-aaf9ff685cb8.jpg"
                alt="БАЗА"
                className="h-16 w-auto object-contain"
              />
              <div className="text-2xl font-black tracking-tight">
                <span className="text-primary">БАЗА</span>
                <span className="text-foreground text-xs block leading-none mt-1">
                  МАРКЕТПЛЕЙС
                </span>
              </div>
            </Link>

            <nav className="hidden lg:flex items-center gap-6">
              <Link to="/" className="hover:text-primary transition-colors font-medium">Каталог</Link>
              <Link to="/masters" className="hover:text-primary transition-colors font-medium">Мастера</Link>
              <Link to="/about" className="hover:text-primary transition-colors font-medium">О центре</Link>
            </nav>

            <div className="flex items-center gap-4">
              <Button variant="ghost" size="icon" asChild>
                <Link to="/"><Icon name="ShoppingCart" size={24} /></Link>
              </Button>
              <Button variant="ghost" size="icon" asChild>
                <Link to="/profile"><Icon name="User" size={24} /></Link>
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
                <Link to="/" className="hover:text-primary transition-colors font-medium" onClick={() => setMobileMenuOpen(false)}>Каталог</Link>
                <Link to="/masters" className="hover:text-primary transition-colors font-medium" onClick={() => setMobileMenuOpen(false)}>Мастера</Link>
                <Link to="/about" className="hover:text-primary transition-colors font-medium" onClick={() => setMobileMenuOpen(false)}>О центре</Link>
              </div>
            </nav>
          )}
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 sm:py-12">
        <div className="max-w-3xl mx-auto">
          <div className="mb-6 sm:mb-10">
            <h1 className="text-2xl sm:text-4xl font-black mb-3">ПОЛИТИКА КОНФИДЕНЦИАЛЬНОСТИ</h1>
            <p className="text-muted-foreground">
              Последнее обновление: март 2026 г.
            </p>
          </div>

          <div className="space-y-8 text-sm leading-relaxed">

            <section>
              <h2 className="text-xl font-black mb-3">1. ОБЩИЕ ПОЛОЖЕНИЯ</h2>
              <p className="text-muted-foreground">
                Настоящая Политика конфиденциальности (далее — «Политика») определяет порядок обработки персональных данных пользователей маркетплейса БАЗА (далее — «Оператор», «мы»). Обработка персональных данных осуществляется в соответствии с Федеральным законом от 27.07.2006 № 152-ФЗ «О персональных данных».
              </p>
            </section>

            <Separator />

            <section>
              <h2 className="text-xl font-black mb-3">2. ОПЕРАТОР ПЕРСОНАЛЬНЫХ ДАННЫХ</h2>
              <div className="text-muted-foreground space-y-1">
                <p><span className="font-semibold text-foreground">Наименование:</span> Центр креативных индустрий «БАЗА»</p>
                <p><span className="font-semibold text-foreground">Адрес:</span> г. Нижнекамск</p>
                <p><span className="font-semibold text-foreground">Email:</span> info@baza-market.ru</p>
              </div>
            </section>

            <Separator />

            <section>
              <h2 className="text-xl font-black mb-3">3. КАКИЕ ДАННЫЕ МЫ СОБИРАЕМ</h2>
              <ul className="text-muted-foreground space-y-2">
                <li className="flex items-start gap-2"><Icon name="Dot" size={20} className="text-primary flex-shrink-0 mt-0.5" /><span>Фамилия, имя, отчество</span></li>
                <li className="flex items-start gap-2"><Icon name="Dot" size={20} className="text-primary flex-shrink-0 mt-0.5" /><span>Адрес электронной почты (email)</span></li>
                <li className="flex items-start gap-2"><Icon name="Dot" size={20} className="text-primary flex-shrink-0 mt-0.5" /><span>Номер телефона</span></li>
                <li className="flex items-start gap-2"><Icon name="Dot" size={20} className="text-primary flex-shrink-0 mt-0.5" /><span>Адрес доставки</span></li>
                <li className="flex items-start gap-2"><Icon name="Dot" size={20} className="text-primary flex-shrink-0 mt-0.5" /><span>История заказов</span></li>
              </ul>
            </section>

            <Separator />

            <section>
              <h2 className="text-xl font-black mb-3">4. ЦЕЛИ ОБРАБОТКИ ДАННЫХ</h2>
              <ul className="text-muted-foreground space-y-2">
                <li className="flex items-start gap-2"><Icon name="Dot" size={20} className="text-primary flex-shrink-0 mt-0.5" /><span>Регистрация и идентификация пользователя на сайте</span></li>
                <li className="flex items-start gap-2"><Icon name="Dot" size={20} className="text-primary flex-shrink-0 mt-0.5" /><span>Оформление, обработка и доставка заказов</span></li>
                <li className="flex items-start gap-2"><Icon name="Dot" size={20} className="text-primary flex-shrink-0 mt-0.5" /><span>Отправка уведомлений о статусе заказов</span></li>
                <li className="flex items-start gap-2"><Icon name="Dot" size={20} className="text-primary flex-shrink-0 mt-0.5" /><span>Связь с пользователем по вопросам покупок</span></li>
                <li className="flex items-start gap-2"><Icon name="Dot" size={20} className="text-primary flex-shrink-0 mt-0.5" /><span>Улучшение качества обслуживания</span></li>
              </ul>
            </section>

            <Separator />

            <section>
              <h2 className="text-xl font-black mb-3">5. ОСНОВАНИЯ ОБРАБОТКИ</h2>
              <p className="text-muted-foreground">
                Обработка персональных данных осуществляется на основании добровольного согласия субъекта персональных данных (ст. 9 ФЗ № 152-ФЗ). Согласие предоставляется пользователем при регистрации на сайте путём проставления отметки в соответствующем поле.
              </p>
            </section>

            <Separator />

            <section>
              <h2 className="text-xl font-black mb-3">6. ПЕРЕДАЧА ДАННЫХ ТРЕТЬИМ ЛИЦАМ</h2>
              <p className="text-muted-foreground">
                Персональные данные не передаются третьим лицам, за исключением случаев, предусмотренных действующим законодательством РФ, а также партнёрам-мастерам маркетплейса в объёме, необходимом для исполнения заказа (имя, телефон, адрес доставки).
              </p>
            </section>

            <Separator />

            <section>
              <h2 className="text-xl font-black mb-3">7. ХРАНЕНИЕ И ЗАЩИТА ДАННЫХ</h2>
              <p className="text-muted-foreground">
                Персональные данные хранятся на защищённых серверах с применением современных методов шифрования. Доступ к данным имеют только уполномоченные сотрудники. Данные хранятся в течение срока действия договорных отношений и 3 лет после их завершения, если иное не предусмотрено законодательством.
              </p>
            </section>

            <Separator />

            <section>
              <h2 className="text-xl font-black mb-3">8. ПРАВА ПОЛЬЗОВАТЕЛЯ</h2>
              <p className="text-muted-foreground mb-3">Вы вправе в любое время:</p>
              <ul className="text-muted-foreground space-y-2">
                <li className="flex items-start gap-2"><Icon name="Dot" size={20} className="text-primary flex-shrink-0 mt-0.5" /><span>Получить информацию об обработке ваших персональных данных</span></li>
                <li className="flex items-start gap-2"><Icon name="Dot" size={20} className="text-primary flex-shrink-0 mt-0.5" /><span>Потребовать уточнения, блокирования или уничтожения данных</span></li>
                <li className="flex items-start gap-2"><Icon name="Dot" size={20} className="text-primary flex-shrink-0 mt-0.5" /><span>Отозвать согласие на обработку через личный кабинет (вкладка «Согласие»)</span></li>
                <li className="flex items-start gap-2"><Icon name="Dot" size={20} className="text-primary flex-shrink-0 mt-0.5" /><span>Обратиться с жалобой в Роскомнадзор</span></li>
              </ul>
            </section>

            <Separator />

            <section>
              <h2 className="text-xl font-black mb-3">9. КОНТАКТЫ</h2>
              <p className="text-muted-foreground">
                По всем вопросам обработки персональных данных обращайтесь по адресу: <span className="font-semibold text-foreground">info@baza-market.ru</span>
              </p>
            </section>

          </div>

          <div className="mt-12 flex gap-4">
            <Button asChild variant="outline" className="font-bold">
              <Link to="/login">← ВЕРНУТЬСЯ К РЕГИСТРАЦИИ</Link>
            </Button>
            <Button asChild className="font-bold bg-primary text-primary-foreground hover:bg-primary/90">
              <Link to="/">НА ГЛАВНУЮ</Link>
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Privacy;
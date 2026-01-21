import { useState } from "react";
import { Link } from "react-router-dom";
import Icon from "@/components/ui/icon";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";

const products = [
  {
    id: 1,
    name: "Керамическая ваза «Геометрия»",
    price: 3500,
    master: "Анна Смирнова",
    category: "Керамика",
    material: "Глина",
    image: "https://cdn.poehali.dev/projects/ef132fe9-5a9c-48f7-aa3a-1ab89d055fa5/files/ca008c16-00de-496c-8e5a-d91430bb1ec0.jpg",
  },
  {
    id: 2,
    name: "Разделочная доска из дуба",
    price: 2800,
    master: "Сергей Петров",
    category: "Дерево",
    material: "Дуб",
    image: "https://cdn.poehali.dev/projects/ef132fe9-5a9c-48f7-aa3a-1ab89d055fa5/files/411954cf-4b2f-4ba5-8933-b2a8e3c3642b.jpg",
  },
  {
    id: 3,
    name: "Текстильная сумка-шоппер",
    price: 1500,
    master: "Мария Иванова",
    category: "Текстиль",
    material: "Хлопок",
    image: "https://cdn.poehali.dev/projects/ef132fe9-5a9c-48f7-aa3a-1ab89d055fa5/files/f318b2e5-f056-481f-84f0-ff007e635906.jpg",
  },
  {
    id: 4,
    name: "Керамическая тарелка «Лес»",
    price: 2200,
    master: "Анна Смирнова",
    category: "Керамика",
    material: "Глина",
    image: "https://cdn.poehali.dev/projects/ef132fe9-5a9c-48f7-aa3a-1ab89d055fa5/files/ca008c16-00de-496c-8e5a-d91430bb1ec0.jpg",
  },
  {
    id: 5,
    name: "Деревянная шкатулка",
    price: 3200,
    master: "Сергей Петров",
    category: "Дерево",
    material: "Орех",
    image: "https://cdn.poehali.dev/projects/ef132fe9-5a9c-48f7-aa3a-1ab89d055fa5/files/411954cf-4b2f-4ba5-8933-b2a8e3c3642b.jpg",
  },
  {
    id: 6,
    name: "Вышитая подушка «Узоры»",
    price: 1800,
    master: "Мария Иванова",
    category: "Текстиль",
    material: "Лён",
    image: "https://cdn.poehali.dev/projects/ef132fe9-5a9c-48f7-aa3a-1ab89d055fa5/files/f318b2e5-f056-481f-84f0-ff007e635906.jpg",
  },
];

const categories = ["Все", "Керамика", "Дерево", "Текстиль"];
const masters = ["Все мастера", "Анна Смирнова", "Сергей Петров", "Мария Иванова"];
const materials = ["Все материалы", "Глина", "Дуб", "Орех", "Хлопок", "Лён"];

const Index = () => {
  const [selectedCategory, setSelectedCategory] = useState("Все");
  const [selectedMaster, setSelectedMaster] = useState("Все мастера");
  const [selectedMaterial, setSelectedMaterial] = useState("Все материалы");
  const [priceRange, setPriceRange] = useState([0, 5000]);
  const [cartCount, setCartCount] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const filteredProducts = products.filter((product) => {
    const categoryMatch = selectedCategory === "Все" || product.category === selectedCategory;
    const masterMatch = selectedMaster === "Все мастера" || product.master === selectedMaster;
    const materialMatch = selectedMaterial === "Все материалы" || product.material === selectedMaterial;
    const priceMatch = product.price >= priceRange[0] && product.price <= priceRange[1];
    return categoryMatch && masterMatch && materialMatch && priceMatch;
  });

  return (
    <div className="min-h-screen bg-background">
      <div 
        className="fixed inset-0 opacity-10 pointer-events-none"
        style={{
          backgroundImage: 'url("data:image/svg+xml,%3Csvg width="100" height="100" xmlns="http://www.w3.org/2000/svg"%3E%3Cfilter id="noise"%3E%3CfeTurbulence baseFrequency="0.9" numOctaves="4"/%3E%3C/filter%3E%3Crect width="100" height="100" filter="url(%23noise)" opacity="0.4"/%3E%3C/svg%3E")',
          backgroundRepeat: 'repeat',
        }}
      />

      <header className="sticky top-0 z-50 bg-background/95 backdrop-blur border-b border-border">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-20">
            <div className="flex items-center gap-8">
              <div className="text-3xl font-black tracking-tight">
                <span className="text-primary">БАЗА</span>
                <span className="text-foreground text-sm block leading-none mt-1">
                  МАРКЕТПЛЕЙС
                </span>
              </div>
            </div>

            <nav className="hidden lg:flex items-center gap-6">
              <a href="#catalog" className="hover:text-primary transition-colors font-medium">
                Каталог
              </a>
              <Link to="/masters" className="hover:text-primary transition-colors font-medium">
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
                <a href="#catalog" className="hover:text-primary transition-colors font-medium">
                  Каталог
                </a>
                <Link to="/masters" className="hover:text-primary transition-colors font-medium">
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

      <section className="relative py-20 lg:py-32 overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl">
            <h1 className="text-5xl lg:text-7xl font-black mb-6 leading-tight">
              СУВЕНИРЫ ОТ РЕЗИДЕНТОВ{" "}
              <span className="text-primary">БАЗЫ</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl">
              Уникальные изделия ручной работы от мастеров Центра креативных индустрий в Нижнекамске
            </p>
            <div className="flex flex-wrap gap-4">
              <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 font-bold" asChild>
                <a href="#catalog">СМОТРЕТЬ КАТАЛОГ</a>
              </Button>
              <Button size="lg" variant="outline" className="font-bold" asChild>
                <Link to="/masters">О МАСТЕРАХ</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section id="catalog" className="py-16 relative">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-8">
            <aside className="lg:w-80 shrink-0">
              <Card className="p-6 bg-card sticky top-24">
                <h3 className="text-xl font-bold mb-6">ФИЛЬТРЫ</h3>

                <div className="space-y-6">
                  <div>
                    <label className="text-sm font-bold mb-3 block">КАТЕГОРИЯ</label>
                    <div className="flex flex-wrap gap-2">
                      {categories.map((cat) => (
                        <Button
                          key={cat}
                          variant={selectedCategory === cat ? "default" : "outline"}
                          size="sm"
                          onClick={() => setSelectedCategory(cat)}
                          className="font-medium"
                        >
                          {cat}
                        </Button>
                      ))}
                    </div>
                  </div>

                  <Separator />

                  <div>
                    <label className="text-sm font-bold mb-3 block">МАСТЕР</label>
                    <Select value={selectedMaster} onValueChange={setSelectedMaster}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {masters.map((master) => (
                          <SelectItem key={master} value={master}>
                            {master}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <Separator />

                  <div>
                    <label className="text-sm font-bold mb-3 block">МАТЕРИАЛ</label>
                    <Select value={selectedMaterial} onValueChange={setSelectedMaterial}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {materials.map((material) => (
                          <SelectItem key={material} value={material}>
                            {material}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <Separator />

                  <div>
                    <label className="text-sm font-bold mb-3 block">
                      ЦЕНА: {priceRange[0]}₽ - {priceRange[1]}₽
                    </label>
                    <Slider
                      value={priceRange}
                      onValueChange={setPriceRange}
                      max={5000}
                      step={100}
                      className="mt-4"
                    />
                  </div>

                  <Button
                    variant="outline"
                    className="w-full font-bold"
                    onClick={() => {
                      setSelectedCategory("Все");
                      setSelectedMaster("Все мастера");
                      setSelectedMaterial("Все материалы");
                      setPriceRange([0, 5000]);
                    }}
                  >
                    СБРОСИТЬ ФИЛЬТРЫ
                  </Button>
                </div>
              </Card>
            </aside>

            <div className="flex-1">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-3xl font-bold">
                  НАЙДЕНО: <span className="text-primary">{filteredProducts.length}</span>
                </h2>
                <div className="flex items-center gap-2">
                  <Icon name="Grid3x3" size={20} className="text-muted-foreground" />
                  <Input
                    placeholder="Поиск..."
                    className="w-64"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredProducts.map((product) => (
                  <Card
                    key={product.id}
                    className="group overflow-hidden hover:border-primary transition-all duration-300 animate-fade-in"
                  >
                    <div className="aspect-square overflow-hidden bg-muted">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <div className="p-6">
                      <Badge className="mb-3 bg-secondary text-secondary-foreground">
                        {product.category}
                      </Badge>
                      <h3 className="text-lg font-bold mb-2 group-hover:text-primary transition-colors">
                        {product.name}
                      </h3>
                      <p className="text-sm text-muted-foreground mb-2">
                        Мастер: {product.master}
                      </p>
                      <p className="text-sm text-muted-foreground mb-4">
                        Материал: {product.material}
                      </p>
                      <div className="flex items-center justify-between">
                        <span className="text-2xl font-black text-primary">
                          {product.price.toLocaleString()}₽
                        </span>
                        <Button
                          size="sm"
                          className="bg-primary text-primary-foreground hover:bg-primary/90 font-bold"
                          onClick={() => setCartCount(cartCount + 1)}
                        >
                          КУПИТЬ
                        </Button>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

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
                <a href="#catalog" className="hover:text-primary transition-colors">
                  Каталог товаров
                </a>
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
                <a href="#" className="hover:text-primary transition-colors">
                  Доставка и оплата
                </a>
                <a href="#" className="hover:text-primary transition-colors">
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

export default Index;
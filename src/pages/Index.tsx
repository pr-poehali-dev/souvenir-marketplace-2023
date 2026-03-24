import { useState, useEffect } from "react";
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
import { CartDrawer, CartItem } from "@/components/CartDrawer";
import { useToast } from "@/hooks/use-toast";
import { auth } from "@/lib/auth";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import TelegramButton from "@/components/TelegramButton";
import MaxButton from "@/components/MaxButton";
import { ScrollReveal } from "@/components/ScrollReveal";

const products = [
  {
    id: 1,
    name: "Керамическая ваза «Геометрия»",
    price: 3500,
    master: "Анна Смирнова",
    category: "Керамика",
    material: "Глина",
    image: "https://cdn.poehali.dev/projects/ef132fe9-5a9c-48f7-aa3a-1ab89d055fa5/files/ca008c16-00de-496c-8e5a-d91430bb1ec0.jpg",
    rating: 4.8,
    reviewCount: 12,
    reviews: [
      { author: "Елена К.", text: "Потрясающая работа! Качество на высоте.", rating: 5 },
      { author: "Игорь М.", text: "Очень красивая ваза, отличное дополнение к интерьеру.", rating: 5 },
      { author: "Ольга П.", text: "Хорошая вещь, но ожидала чуть большего размера.", rating: 4 },
    ],
  },
  {
    id: 2,
    name: "Разделочная доска из дуба",
    price: 2800,
    master: "Сергей Петров",
    category: "Дерево",
    material: "Дуб",
    image: "https://cdn.poehali.dev/projects/ef132fe9-5a9c-48f7-aa3a-1ab89d055fa5/files/411954cf-4b2f-4ba5-8933-b2a8e3c3642b.jpg",
    rating: 5.0,
    reviewCount: 18,
    reviews: [
      { author: "Дмитрий В.", text: "Супер качество! Массив дуба, отличная обработка.", rating: 5 },
      { author: "Анна С.", text: "Лучшая доска, которую я покупала. Рекомендую!", rating: 5 },
    ],
  },
  {
    id: 3,
    name: "Текстильная сумка-шоппер",
    price: 1500,
    master: "Мария Иванова",
    category: "Текстиль",
    material: "Хлопок",
    image: "https://cdn.poehali.dev/projects/ef132fe9-5a9c-48f7-aa3a-1ab89d055fa5/files/f318b2e5-f056-481f-84f0-ff007e635906.jpg",
    rating: 4.5,
    reviewCount: 8,
    reviews: [
      { author: "Мария Л.", text: "Удобная и вместительная сумка. Беру вторую!", rating: 5 },
      { author: "Виктория Т.", text: "Качество хорошее, но хотелось бы больше расцветок.", rating: 4 },
    ],
  },
  {
    id: 4,
    name: "Керамическая тарелка «Лес»",
    price: 2200,
    master: "Анна Смирнова",
    category: "Керамика",
    material: "Глина",
    image: "https://cdn.poehali.dev/projects/ef132fe9-5a9c-48f7-aa3a-1ab89d055fa5/files/ca008c16-00de-496c-8e5a-d91430bb1ec0.jpg",
    rating: 4.9,
    reviewCount: 15,
    reviews: [
      { author: "Светлана Б.", text: "Шикарная авторская работа! Очень довольна.", rating: 5 },
      { author: "Алексей Н.", text: "Красивый дизайн, качественная керамика.", rating: 5 },
    ],
  },
  {
    id: 5,
    name: "Деревянная шкатулка",
    price: 3200,
    master: "Сергей Петров",
    category: "Дерево",
    material: "Орех",
    image: "https://cdn.poehali.dev/projects/ef132fe9-5a9c-48f7-aa3a-1ab89d055fa5/files/411954cf-4b2f-4ba5-8933-b2a8e3c3642b.jpg",
    rating: 4.7,
    reviewCount: 10,
    reviews: [
      { author: "Татьяна К.", text: "Отличная работа мастера. Шкатулка прочная и красивая.", rating: 5 },
      { author: "Роман Г.", text: "Хорошее качество, но цена немного завышена.", rating: 4 },
    ],
  },
  {
    id: 6,
    name: "Вышитая подушка «Узоры»",
    price: 1800,
    master: "Мария Иванова",
    category: "Текстиль",
    material: "Лён",
    image: "https://cdn.poehali.dev/projects/ef132fe9-5a9c-48f7-aa3a-1ab89d055fa5/files/f318b2e5-f056-481f-84f0-ff007e635906.jpg",
    rating: 4.6,
    reviewCount: 7,
    reviews: [
      { author: "Ирина Д.", text: "Красивая подушка, вышивка аккуратная.", rating: 5 },
      { author: "Максим П.", text: "Качество отличное, но размер маловат.", rating: 4 },
    ],
  },
];

const categories = ["Все", "Керамика", "Дерево", "Текстиль"];
const masters = ["Все мастера", "Анна Смирнова", "Сергей Петров", "Мария Иванова"];
const materials = ["Все материалы", "Глина", "Дуб", "Орех", "Хлопок", "Лён"];

const Index = () => {
  const { toast } = useToast();
  const [selectedCategory, setSelectedCategory] = useState("Все");
  const [selectedMaster, setSelectedMaster] = useState("Все мастера");
  const [selectedMaterial, setSelectedMaterial] = useState("Все материалы");
  const [priceRange, setPriceRange] = useState([0, 5000]);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<typeof products[0] | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    setIsAuthenticated(auth.isAuthenticated());
  }, []);

  const addToCart = (product: typeof products[0]) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        toast({
          title: "Товар добавлен",
          description: `${product.name} добавлен в корзину`,
          duration: 2000,
        });
        return prev.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      toast({
        title: "Товар добавлен",
        description: `${product.name} добавлен в корзину`,
        duration: 2000,
      });
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const updateQuantity = (id: number, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(id);
      return;
    }
    setCartItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, quantity } : item))
    );
  };

  const removeFromCart = (id: number) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const clearCart = () => {
    setCartItems([]);
  };

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
              <a href="#catalog" className="hover:text-primary transition-colors font-medium">
                Каталог
              </a>
              <Link to="/masters" className="hover:text-primary transition-colors font-medium">
                Мастера
              </Link>
              <Link to="/about" className="hover:text-primary transition-colors font-medium">
                О центре
              </Link>
              <a href="#delivery" className="hover:text-primary transition-colors font-medium">
                Доставка
              </a>
              <Link to="/contacts" className="hover:text-primary transition-colors font-medium">
                Контакты
              </Link>
            </nav>

            <div className="flex items-center gap-4">
              <a href="https://vk.com/bazik_nk" target="_blank" rel="noopener noreferrer" className="hidden lg:flex items-center justify-center w-9 h-9 rounded-md hover:bg-accent transition-colors text-muted-foreground hover:text-primary">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12.785 16.241s.288-.032.436-.194c.136-.148.132-.427.132-.427s-.02-1.304.587-1.496c.6-.19 1.37 1.261 2.185 1.818.616.42 1.085.328 1.085.328l2.177-.03s1.137-.071.598-.964c-.044-.073-.314-.661-1.618-1.869-1.366-1.265-1.182-1.06.462-3.248.999-1.332 1.398-2.145 1.273-2.493-.12-.332-.855-.244-.855-.244l-2.451.015s-.182-.025-.317.056c-.132.079-.217.264-.217.264s-.387 1.028-.903 1.904c-1.088 1.85-1.524 1.948-1.703 1.834-.414-.267-.31-1.075-.31-1.648 0-1.793.272-2.54-.529-2.733-.266-.064-.461-.107-1.141-.114-.872-.009-1.609.003-2.027.207-.278.136-.492.439-.362.456.161.021.527.099.721.363.25.341.241 1.107.241 1.107s.144 2.112-.335 2.372c-.329.178-.779-.185-1.747-1.845-.496-.859-.871-1.811-.871-1.811s-.072-.176-.202-.271c-.157-.115-.376-.151-.376-.151l-2.328.015s-.35.01-.478.162C3.005 8.93 3.122 9.26 3.122 9.26s1.82 4.26 3.881 6.406c1.89 1.97 4.04 1.84 4.04 1.84l1.742-.031z"/></svg>
              </a>
              <a href="https://t.me/nkBaza" target="_blank" rel="noopener noreferrer" className="hidden lg:flex items-center justify-center w-9 h-9 rounded-md hover:bg-accent transition-colors text-muted-foreground hover:text-primary">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.894 8.221-1.97 9.28c-.145.658-.537.818-1.084.508l-3-2.21-1.447 1.394c-.16.16-.295.295-.605.295l.213-3.053 5.56-5.023c.242-.213-.054-.333-.373-.12L7.26 13.5l-2.956-.924c-.643-.204-.657-.643.136-.953l11.57-4.461c.537-.194 1.006.131.884.059z"/></svg>
              </a>
              <Button
                variant="ghost"
                size="icon"
                className="relative"
                onClick={() => setIsCartOpen(true)}
              >
                <Icon name="ShoppingCart" size={24} />
                {cartItems.length > 0 && (
                  <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 bg-primary text-primary-foreground">
                    {cartItems.length}
                  </Badge>
                )}
              </Button>
              <Button variant="ghost" size="icon" asChild>
                <Link to={isAuthenticated ? "/profile" : "/login"}>
                  <Icon name="User" size={24} />
                </Link>
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
                <Link to="/about" className="hover:text-primary transition-colors font-medium">
                  О центре
                </Link>
                <a href="#delivery" className="hover:text-primary transition-colors font-medium">
                  Доставка
                </a>
                <Link to="/contacts" className="hover:text-primary transition-colors font-medium">
                  Контакты
                </Link>
                <div className="flex items-center gap-3 pt-2 border-t border-border">
                  <a href="https://vk.com/bazik_nk" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-primary transition-colors text-muted-foreground font-medium">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12.785 16.241s.288-.032.436-.194c.136-.148.132-.427.132-.427s-.02-1.304.587-1.496c.6-.19 1.37 1.261 2.185 1.818.616.42 1.085.328 1.085.328l2.177-.03s1.137-.071.598-.964c-.044-.073-.314-.661-1.618-1.869-1.366-1.265-1.182-1.06.462-3.248.999-1.332 1.398-2.145 1.273-2.493-.12-.332-.855-.244-.855-.244l-2.451.015s-.182-.025-.317.056c-.132.079-.217.264-.217.264s-.387 1.028-.903 1.904c-1.088 1.85-1.524 1.948-1.703 1.834-.414-.267-.31-1.075-.31-1.648 0-1.793.272-2.54-.529-2.733-.266-.064-.461-.107-1.141-.114-.872-.009-1.609.003-2.027.207-.278.136-.492.439-.362.456.161.021.527.099.721.363.25.341.241 1.107.241 1.107s.144 2.112-.335 2.372c-.329.178-.779-.185-1.747-1.845-.496-.859-.871-1.811-.871-1.811s-.072-.176-.202-.271c-.157-.115-.376-.151-.376-.151l-2.328.015s-.35.01-.478.162C3.005 8.93 3.122 9.26 3.122 9.26s1.82 4.26 3.881 6.406c1.89 1.97 4.04 1.84 4.04 1.84l1.742-.031z"/></svg>
                    ВКонтакте
                  </a>
                  <a href="https://t.me/nkBaza" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-primary transition-colors text-muted-foreground font-medium">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.894 8.221-1.97 9.28c-.145.658-.537.818-1.084.508l-3-2.21-1.447 1.394c-.16.16-.295.295-.605.295l.213-3.053 5.56-5.023c.242-.213-.054-.333-.373-.12L7.26 13.5l-2.956-.924c-.643-.204-.657-.643.136-.953l11.57-4.461c.537-.194 1.006.131.884.059z"/></svg>
                    Telegram
                  </a>
                </div>
              </div>
            </nav>
          )}
        </div>
      </header>

      <section className="relative py-12 sm:py-20 lg:py-32 overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl">
            <h1 className="text-3xl sm:text-5xl lg:text-7xl font-black mb-4 sm:mb-6 leading-tight">
              СУВЕНИРЫ ОТ РЕЗИДЕНТОВ{" "}
              <span className="text-primary">БАЗЫ</span>
            </h1>
            <p className="text-base sm:text-xl text-muted-foreground mb-6 sm:mb-8 max-w-2xl">
              Уникальные изделия ручной работы от мастеров Центра креативных индустрий в Нижнекамске
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
              <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 font-bold w-full sm:w-auto" asChild>
                <a href="#catalog">СМОТРЕТЬ КАТАЛОГ</a>
              </Button>
              <Button size="lg" variant="outline" className="font-bold w-full sm:w-auto" asChild>
                <Link to="/masters">О МАСТЕРАХ</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section id="catalog" className="py-8 sm:py-16 relative">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
            <aside className="lg:w-80 shrink-0">
              <Card className="p-4 sm:p-6 bg-card lg:sticky lg:top-24">
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
              <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 sm:mb-8 gap-4">
                <h2 className="text-xl sm:text-3xl font-bold">
                  НАЙДЕНО: <span className="text-primary">{filteredProducts.length}</span>
                </h2>
                <div className="flex items-center gap-2">
                  <Icon name="Grid3x3" size={20} className="text-muted-foreground hidden sm:block" />
                  <Input
                    placeholder="Поиск..."
                    className="w-full sm:w-64"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredProducts.map((product, index) => (
                  <ScrollReveal key={product.id} delay={index * 50}>
                    <Card
                      className="group overflow-hidden hover:border-primary transition-all duration-300 cursor-pointer h-full"
                      onClick={() => setSelectedProduct(product)}
                    >
                    <div className="aspect-square overflow-hidden bg-muted">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <div className="p-4 sm:p-6">
                      <div className="flex items-center justify-between mb-3">
                        <Badge className="bg-secondary text-secondary-foreground">
                          {product.category}
                        </Badge>
                        <div className="flex items-center gap-1">
                          <Icon name="Star" size={16} className="text-primary fill-primary" />
                          <span className="font-bold text-sm">{product.rating}</span>
                          <span className="text-xs text-muted-foreground">({product.reviewCount})</span>
                        </div>
                      </div>
                      <h3 className="text-base sm:text-lg font-bold mb-2 group-hover:text-primary transition-colors">
                        {product.name}
                      </h3>
                      <p className="text-sm text-muted-foreground mb-2">
                        Мастер: {product.master}
                      </p>
                      <p className="text-sm text-muted-foreground mb-3">
                        Материал: {product.material}
                      </p>
                      
                      {product.reviews.length > 0 && (
                        <div className="mb-4 p-3 bg-muted/50 rounded">
                          <p className="text-xs text-muted-foreground mb-1">
                            <Icon name="MessageSquare" size={12} className="inline mr-1" />
                            {product.reviews[0].author}
                          </p>
                          <p className="text-sm line-clamp-2">"{product.reviews[0].text}"</p>
                        </div>
                      )}
                      
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-xl sm:text-2xl font-black text-primary">
                          {product.price.toLocaleString()}₽
                        </span>
                        <Button
                          size="sm"
                          className="bg-primary text-primary-foreground hover:bg-primary/90 font-bold text-xs sm:text-sm"
                          onClick={() => addToCart(product)}
                        >
                          КУПИТЬ
                        </Button>
                      </div>
                    </div>
                  </Card>
                  </ScrollReveal>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={updateQuantity}
        onRemoveItem={removeFromCart}
        onClearCart={clearCart}
      />

      <Dialog open={!!selectedProduct} onOpenChange={(open) => !open && setSelectedProduct(null)}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto w-[95vw] sm:w-full">
          {selectedProduct && (
            <div>
              <DialogHeader>
                <DialogTitle className="text-3xl font-black">{selectedProduct.name}</DialogTitle>
              </DialogHeader>
              
              <div className="grid md:grid-cols-2 gap-8 mt-6">
                <div>
                  <div className="aspect-square overflow-hidden bg-muted rounded-lg mb-4">
                    <img
                      src={selectedProduct.image}
                      alt={selectedProduct.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <Badge className="bg-secondary text-secondary-foreground">
                        {selectedProduct.category}
                      </Badge>
                      <div className="flex items-center gap-1">
                        <Icon name="Star" size={18} className="text-primary fill-primary" />
                        <span className="font-bold">{selectedProduct.rating}</span>
                        <span className="text-sm text-muted-foreground">({selectedProduct.reviewCount} отзывов)</span>
                      </div>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Мастер</p>
                      <p className="font-bold">{selectedProduct.master}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Материал</p>
                      <p className="font-bold">{selectedProduct.material}</p>
                    </div>
                    <Separator />
                    <div className="flex items-center justify-between">
                      <span className="text-3xl font-black text-primary">
                        {selectedProduct.price.toLocaleString()}₽
                      </span>
                      <Button
                        size="lg"
                        className="bg-primary text-primary-foreground hover:bg-primary/90 font-bold"
                        onClick={(e) => {
                          e.stopPropagation();
                          addToCart(selectedProduct);
                        }}
                      >
                        ДОБАВИТЬ В КОРЗИНУ
                      </Button>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-xl font-bold mb-4">ОТЗЫВЫ ПОКУПАТЕЛЕЙ</h3>
                  <div className="space-y-4">
                    {selectedProduct.reviews.map((review, idx) => (
                      <Card key={idx} className="p-4">
                        <div className="flex items-start justify-between mb-2">
                          <p className="font-bold">{review.author}</p>
                          <div className="flex items-center gap-1">
                            {Array.from({ length: 5 }).map((_, i) => (
                              <Icon
                                key={i}
                                name="Star"
                                size={14}
                                className={i < review.rating ? "text-primary fill-primary" : "text-muted-foreground"}
                              />
                            ))}
                          </div>
                        </div>
                        <p className="text-muted-foreground">{review.text}</p>
                      </Card>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      <section className="py-20 bg-card border-y border-border">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-12">
            <h2 className="text-4xl lg:text-5xl font-black mb-6">
              О ЦЕНТРЕ <span className="text-primary">«БАЗА»</span>
            </h2>
            <p className="text-xl text-muted-foreground">
              Центр креативных индустрий в Нижнекамске — это место, где процветает творческий потенциал и воплощаются самые смелые идеи
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
            <Card className="p-6 text-center bg-background">
              <div className="text-4xl font-black text-primary mb-2">2000+</div>
              <div className="text-sm text-muted-foreground">Кв. метров пространства</div>
            </Card>
            <Card className="p-6 text-center bg-background">
              <div className="text-4xl font-black text-primary mb-2">50+</div>
              <div className="text-sm text-muted-foreground">Творческих резидентов</div>
            </Card>
            <Card className="p-6 text-center bg-background">
              <div className="text-4xl font-black text-primary mb-2">100+</div>
              <div className="text-sm text-muted-foreground">Мероприятий в месяц</div>
            </Card>
            <Card className="p-6 text-center bg-background">
              <div className="text-4xl font-black text-primary mb-2">5000+</div>
              <div className="text-sm text-muted-foreground">Посетителей ежемесячно</div>
            </Card>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <Card className="p-6 bg-background">
              <div className="w-14 h-14 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                <Icon name="Palette" size={28} className="text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-3">Дизайн и искусство</h3>
              <p className="text-muted-foreground">Мастерские художников, дизайнеров и керамистов с профессиональным оборудованием</p>
            </Card>
            <Card className="p-6 bg-background">
              <div className="w-14 h-14 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                <Icon name="Scissors" size={28} className="text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-3">Текстиль</h3>
              <p className="text-muted-foreground">Швейные мастерские для создания уникальной одежды и текстильных изделий</p>
            </Card>
            <Card className="p-6 bg-background">
              <div className="w-14 h-14 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                <Icon name="Music" size={28} className="text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-3">Музыка и танцы</h3>
              <p className="text-muted-foreground">Студия звукозаписи, концертные залы и танцевальные пространства</p>
            </Card>
          </div>

          <div className="text-center">
            <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 font-bold" asChild>
              <Link to="/about">УЗНАТЬ БОЛЬШЕ О ЦЕНТРЕ</Link>
            </Button>
          </div>
        </div>
      </section>

      <section id="delivery" className="py-12 sm:py-20 bg-background">
        <div className="container mx-auto px-4">
          <ScrollReveal>
            <div className="max-w-4xl mx-auto text-center mb-8 sm:mb-12">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black mb-4 sm:mb-6">
                ДОСТАВКА И <span className="text-primary">ОПЛАТА</span>
              </h2>
              <p className="text-base sm:text-xl text-muted-foreground">
                Удобные способы получения и оплаты ваших заказов
              </p>
            </div>
          </ScrollReveal>

          <div className="grid md:grid-cols-2 gap-6 sm:gap-8 mb-8 sm:mb-12">
            <ScrollReveal delay={100}>
              <Card className="p-5 sm:p-8 bg-card h-full">
              <div className="flex items-center gap-3 sm:gap-4 mb-4 sm:mb-6">
                <div className="w-12 h-12 sm:w-14 sm:h-14 bg-primary/10 rounded-full flex items-center justify-center">
                  <Icon name="Package" size={24} className="text-primary sm:w-7 sm:h-7" />
                </div>
                <h3 className="text-xl sm:text-2xl font-bold">ДОСТАВКА</h3>
              </div>
              <div className="space-y-4 text-muted-foreground">
                <div className="flex items-start gap-3">
                  <Icon name="Check" size={20} className="text-primary mt-1 flex-shrink-0" />
                  <div>
                    <p className="font-semibold text-foreground">Самовывоз из центра</p>
                    <p className="text-sm">Бесплатно. Готово к выдаче в течение 1 часа</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Icon name="Check" size={20} className="text-primary mt-1 flex-shrink-0" />
                  <div>
                    <p className="font-semibold text-foreground">Доставка по Нижнекамску</p>
                    <p className="text-sm">300 ₽. Доставим в течение 1-2 дней</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Icon name="Check" size={20} className="text-primary mt-1 flex-shrink-0" />
                  <div>
                    <p className="font-semibold text-foreground">Доставка по России</p>
                    <p className="text-sm">От 500 ₽. Почта России или СДЭК (3-7 дней)</p>
                  </div>
                </div>
              </div>
            </Card>
            </ScrollReveal>

            <ScrollReveal delay={200}>
              <Card className="p-5 sm:p-8 bg-card h-full">
                <div className="flex items-center gap-3 sm:gap-4 mb-4 sm:mb-6">
                  <div className="w-12 h-12 sm:w-14 sm:h-14 bg-primary/10 rounded-full flex items-center justify-center">
                    <Icon name="CreditCard" size={24} className="text-primary sm:w-7 sm:h-7" />
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold">ОПЛАТА</h3>
                </div>
                <div className="space-y-4 text-muted-foreground">
                  <div className="flex items-start gap-3">
                    <Icon name="Check" size={20} className="text-primary mt-1 flex-shrink-0" />
                    <div>
                      <p className="font-semibold text-foreground">Онлайн-оплата картой</p>
                      <p className="text-sm">Безопасная оплата через платежную систему</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Icon name="Check" size={20} className="text-primary mt-1 flex-shrink-0" />
                    <div>
                      <p className="font-semibold text-foreground">Оплата при получении</p>
                      <p className="text-sm">Наличными или картой при самовывозе</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Icon name="Check" size={20} className="text-primary mt-1 flex-shrink-0" />
                    <div>
                      <p className="font-semibold text-foreground">Оплата по счету</p>
                      <p className="text-sm">Для юридических лиц с НДС</p>
                    </div>
                  </div>
                </div>
              </Card>
            </ScrollReveal>
          </div>

          <ScrollReveal delay={300}>
            <Card className="p-5 sm:p-8 bg-primary/5 border-primary/20">
              <div className="flex items-start gap-4">
                <Icon name="Info" size={24} className="text-primary mt-1 flex-shrink-0" />
                <div>
                  <h4 className="font-bold text-lg mb-2">ВАЖНАЯ ИНФОРМАЦИЯ</h4>
                  <div className="space-y-2 text-sm text-muted-foreground">
                    <p>• Бесплатная доставка по Нижнекамску при заказе от 5000 ₽</p>
                    <p>• Возврат товара возможен в течение 14 дней при сохранении товарного вида</p>
                    <p>• Авторские изделия изготавливаются на заказ, срок изготовления 3-7 дней</p>
                    <p>• При оформлении заказа вы получите СМС с трек-номером для отслеживания</p>
                  </div>
                </div>
              </div>
            </Card>
          </ScrollReveal>
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
                <a href="#catalog" className="hover:text-primary transition-colors">
                  Каталог товаров
                </a>
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
                <Link to="/contacts" className="hover:text-primary transition-colors">
                  Контакты
                </Link>
                <Link to={isAuthenticated ? "/profile" : "/login"} className="hover:text-primary transition-colors">
                  Личный кабинет
                </Link>
              </div>
            </div>
            <div>
              <h5 className="font-bold mb-4">КОНТАКТЫ</h5>
              <div className="flex flex-col gap-2 text-sm text-muted-foreground">
                <p>+7 950 317-13-77</p>
                <p>+7 (8555) 32-38-48</p>
                <a href="https://vk.com/bazik_nk" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">ВКонтакте</a>
                <a href="https://t.me/nkBaza" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">Telegram</a>
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

export default Index;
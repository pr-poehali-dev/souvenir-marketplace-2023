import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Icon from "@/components/ui/icon";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { auth } from "@/lib/auth";
import { ordersAPI, Order } from "@/lib/api";
import { useToast } from "@/hooks/use-toast";

const Profile = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [user, setUser] = useState(auth.getUser());
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }

    loadOrders();
  }, [user, navigate]);

  const loadOrders = async () => {
    if (!user) return;
    
    try {
      const data = await ordersAPI.getOrders(user.id);
      setOrders(data.orders);
    } catch (error) {
      toast({
        title: "Ошибка",
        description: "Не удалось загрузить заказы",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    auth.logout();
    toast({
      title: "Выход выполнен",
      description: "Вы успешно вышли из аккаунта",
    });
    navigate('/');
  };

  const getStatusLabel = (status: string) => {
    const labels: Record<string, string> = {
      pending: 'В обработке',
      confirmed: 'Подтвержден',
      shipped: 'Отправлен',
      delivered: 'Доставлен',
      cancelled: 'Отменен',
    };
    return labels[status] || status;
  };

  const getStatusVariant = (status: string) => {
    const variants: Record<string, string> = {
      pending: 'secondary',
      confirmed: 'default',
      shipped: 'default',
      delivered: 'default',
      cancelled: 'destructive',
    };
    return variants[status] || 'secondary';
  };

  if (!user) return null;

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
              <Link to="/masters" className="hover:text-primary transition-colors font-medium">
                Мастера
              </Link>
              <Link to="/about" className="hover:text-primary transition-colors font-medium">
                О центре
              </Link>
            </nav>

            <div className="flex items-center gap-4">
              <Button variant="ghost" size="icon" asChild>
                <Link to="/">
                  <Icon name="ShoppingCart" size={24} />
                </Link>
              </Button>
              <Button variant="default" size="icon">
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
                <Link to="/about" className="hover:text-primary transition-colors font-medium">
                  О центре
                </Link>
              </div>
            </nav>
          )}
        </div>
      </header>

      <main className="container mx-auto px-4 py-12">
        <div className="max-w-5xl mx-auto">
          <div className="mb-8">
            <h1 className="text-4xl font-black mb-2">ЛИЧНЫЙ КАБИНЕТ</h1>
            <p className="text-muted-foreground">
              Добро пожаловать, <span className="font-bold">{user.full_name}</span>!
            </p>
          </div>

          <Tabs defaultValue="orders" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-8">
              <TabsTrigger value="orders" className="font-bold">
                МОИ ЗАКАЗЫ
              </TabsTrigger>
              <TabsTrigger value="profile" className="font-bold">
                ПРОФИЛЬ
              </TabsTrigger>
            </TabsList>

            <TabsContent value="orders">
              {loading ? (
                <div className="text-center py-12">
                  <p className="text-muted-foreground">Загрузка заказов...</p>
                </div>
              ) : orders.length === 0 ? (
                <Card className="p-12 text-center">
                  <Icon name="ShoppingBag" size={64} className="mx-auto mb-4 text-muted-foreground" />
                  <h3 className="text-2xl font-bold mb-2">У вас пока нет заказов</h3>
                  <p className="text-muted-foreground mb-6">
                    Начните покупки в нашем маркетплейсе!
                  </p>
                  <Button asChild className="bg-primary text-primary-foreground hover:bg-primary/90 font-bold">
                    <Link to="/">ПЕРЕЙТИ В КАТАЛОГ</Link>
                  </Button>
                </Card>
              ) : (
                <div className="space-y-6">
                  {orders.map((order) => (
                    <Card key={order.id} className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="text-xl font-bold">Заказ #{order.id}</h3>
                            <Badge variant={getStatusVariant(order.status) as any}>
                              {getStatusLabel(order.status)}
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground">
                            {new Date(order.created_at).toLocaleDateString('ru-RU', {
                              year: 'numeric',
                              month: 'long',
                              day: 'numeric',
                              hour: '2-digit',
                              minute: '2-digit',
                            })}
                          </p>
                        </div>
                        <div className="text-right">
                          <div className="text-2xl font-black text-primary">
                            {order.total_amount.toLocaleString()}₽
                          </div>
                        </div>
                      </div>

                      <Separator className="my-4" />

                      <div className="space-y-3 mb-4">
                        {order.items.map((item, idx) => (
                          <div key={idx} className="flex justify-between items-center">
                            <div>
                              <p className="font-bold">{item.product_name}</p>
                              <p className="text-sm text-muted-foreground">
                                Количество: {item.quantity}
                              </p>
                            </div>
                            <p className="font-bold">{item.product_price.toLocaleString()}₽</p>
                          </div>
                        ))}
                      </div>

                      <Separator className="my-4" />

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                        <div>
                          <p className="text-muted-foreground mb-1">Доставка:</p>
                          <p className="font-bold">
                            {order.delivery_method === 'delivery' ? 'Курьером' : 'Самовывоз'}
                          </p>
                          {order.delivery_address && (
                            <p className="text-muted-foreground mt-1">{order.delivery_address}</p>
                          )}
                        </div>
                        <div>
                          <p className="text-muted-foreground mb-1">Оплата:</p>
                          <p className="font-bold">
                            {order.payment_method === 'card' ? 'Картой онлайн' : 'Наличными'}
                          </p>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              )}
            </TabsContent>

            <TabsContent value="profile">
              <Card className="p-8">
                <h2 className="text-2xl font-black mb-6">ИНФОРМАЦИЯ О ПРОФИЛЕ</h2>
                
                <div className="space-y-6">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Полное имя</p>
                    <p className="text-lg font-bold">{user.full_name}</p>
                  </div>

                  <Separator />

                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Email</p>
                    <p className="text-lg font-bold">{user.email}</p>
                  </div>

                  <Separator />

                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Телефон</p>
                    <p className="text-lg font-bold">{user.phone || 'Не указан'}</p>
                  </div>

                  <Separator />

                  <Button
                    variant="destructive"
                    className="font-bold"
                    onClick={handleLogout}
                  >
                    <Icon name="LogOut" size={20} className="mr-2" />
                    ВЫЙТИ ИЗ АККАУНТА
                  </Button>
                </div>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
};

export default Profile;

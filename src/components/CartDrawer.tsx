import Icon from "@/components/ui/icon";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "@/lib/auth";
import { ordersAPI } from "@/lib/api";
import { useToast } from "@/hooks/use-toast";

export interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
  master: string;
}

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (id: number, quantity: number) => void;
  onRemoveItem: (id: number) => void;
  onClearCart: () => void;
}

export const CartDrawer = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
}: CartDrawerProps) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isCheckout, setIsCheckout] = useState(false);
  const [deliveryMethod] = useState("pickup");
  const [paymentMethod] = useState("cash");
  const [formData, setFormData] = useState({
    address: "",
    comment: "",
  });
  const [loading, setLoading] = useState(false);

  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const user = auth.getUser();
    if (!user) {
      toast({
        title: "Необходима авторизация",
        description: "Войдите или зарегистрируйтесь для оформления заказа",
        variant: "destructive",
      });
      navigate('/login');
      onClose();
      return;
    }

    setLoading(true);

    try {
      const orderItems = items.map(item => ({
        name: item.name,
        price: item.price,
        quantity: item.quantity,
      }));

      const result = await ordersAPI.createOrder(
        user.id,
        orderItems,
        total,
        'Самовывоз из центра «БАЗА»',
        'pickup',
        'cash'
      );

      if (result.success) {
        toast({
          title: "Заказ оформлен!",
          description: `Заказ #${result.order_id} успешно создан. Проверьте личный кабинет.`,
        });
        onClearCart();
        setFormData({ address: "", comment: "" });
        setIsCheckout(false);
        onClose();
      } else {
        toast({
          title: "Ошибка",
          description: "Не удалось создать заказ",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Ошибка",
        description: "Произошла ошибка при оформлении заказа",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="w-full sm:max-w-lg">
        <SheetHeader>
          <SheetTitle className="text-2xl font-black uppercase">
            {isCheckout ? "Оформление заказа" : "Корзина"}
          </SheetTitle>
          <SheetDescription>
            {isCheckout
              ? "Заполните данные для доставки"
              : `Товаров в корзине: ${items.length}`}
          </SheetDescription>
        </SheetHeader>

        <div className="flex flex-col h-[calc(100dvh-120px)] mt-6">
          {!isCheckout ? (
            <>
              <div className="flex-1 overflow-auto space-y-4">
                {items.length === 0 ? (
                  <div className="flex flex-col items-center justify-center h-full text-center">
                    <Icon name="ShoppingCart" size={64} className="text-muted-foreground mb-4" />
                    <p className="text-lg text-muted-foreground">Корзина пуста</p>
                  </div>
                ) : (
                  items.map((item) => (
                    <div
                      key={item.id}
                      className="flex gap-4 p-4 bg-card border border-border rounded animate-fade-in"
                    >
                      <div className="w-20 h-20 shrink-0 overflow-hidden bg-muted rounded">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-bold mb-1 truncate">{item.name}</h4>
                        <p className="text-sm text-muted-foreground mb-2">
                          Мастер: {item.master}
                        </p>
                        <div className="flex items-center gap-2">
                          <Button
                            size="icon"
                            variant="outline"
                            className="h-10 w-10"
                            onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                            disabled={item.quantity <= 1}
                          >
                            <Icon name="Minus" size={16} />
                          </Button>
                          <span className="w-8 text-center font-bold">{item.quantity}</span>
                          <Button
                            size="icon"
                            variant="outline"
                            className="h-10 w-10"
                            onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                          >
                            <Icon name="Plus" size={16} />
                          </Button>
                        </div>
                      </div>
                      <div className="flex flex-col items-end justify-between">
                        <Button
                          size="icon"
                          variant="ghost"
                          className="h-10 w-10"
                          onClick={() => onRemoveItem(item.id)}
                        >
                          <Icon name="X" size={16} />
                        </Button>
                        <p className="font-black text-primary text-lg">
                          {(item.price * item.quantity).toLocaleString()}₽
                        </p>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {items.length > 0 && (
                <div className="border-t border-border pt-4 mt-4 space-y-4">
                  <div className="flex items-center justify-between text-lg">
                    <span className="font-bold">ИТОГО:</span>
                    <span className="font-black text-primary text-2xl">
                      {total.toLocaleString()}₽
                    </span>
                  </div>
                  <Button
                    className="w-full bg-primary text-primary-foreground hover:bg-primary/90 font-bold"
                    size="lg"
                    onClick={() => setIsCheckout(true)}
                  >
                    ОФОРМИТЬ ЗАКАЗ
                  </Button>
                </div>
              )}
            </>
          ) : (
            <>
              <div className="flex-1 overflow-auto">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="bg-muted/50 p-4 rounded border border-border">
                    <p className="text-sm text-muted-foreground">
                      <Icon name="User" size={16} className="inline mr-2" />
                      Данные для доставки будут взяты из вашего профиля
                    </p>
                  </div>

                  <div className="bg-primary/10 p-4 rounded border border-primary/20">
                    <div className="flex items-start gap-3">
                      <Icon name="MapPin" size={20} className="text-primary mt-0.5" />
                      <div>
                        <p className="font-bold text-sm mb-2">САМОВЫВОЗ ИЗ ЦЕНТРА «БАЗА»</p>
                        <p className="text-sm text-muted-foreground mb-1">
                          г. Нижнекамск, улица Лесная, 53
                        </p>
                        <p className="text-sm text-muted-foreground">
                          Пн-Пт: 10:00-20:00, Сб-Вс: 11:00-18:00
                        </p>
                        <p className="text-sm text-primary font-medium mt-2">
                          Тел: +7 (8555) 123-456
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-primary/10 p-4 rounded border border-primary/20">
                    <div className="flex items-start gap-3">
                      <Icon name="Wallet" size={20} className="text-primary mt-0.5" />
                      <div>
                        <p className="font-bold text-sm mb-1">ОПЛАТА НАЛИЧНЫМИ</p>
                        <p className="text-sm text-muted-foreground">
                          Оплата наличными при получении заказа
                        </p>
                      </div>
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="comment" className="font-bold">
                      КОММЕНТАРИЙ К ЗАКАЗУ
                    </Label>
                    <Input
                      id="comment"
                      value={formData.comment}
                      onChange={(e) => setFormData({ ...formData, comment: e.target.value })}
                      placeholder="Дополнительная информация"
                    />
                  </div>

                  <Separator />

                  <div className="space-y-2">
                    <h4 className="font-bold text-sm">ВАШ ЗАКАЗ:</h4>
                    {items.map((item) => (
                      <div key={item.id} className="flex justify-between text-sm">
                        <span>
                          {item.name} x{item.quantity}
                        </span>
                        <span className="font-bold">
                          {(item.price * item.quantity).toLocaleString()}₽
                        </span>
                      </div>
                    ))}
                  </div>

                  <Separator />

                  <div className="flex justify-between text-lg">
                    <span className="font-bold">ИТОГО:</span>
                    <span className="font-black text-primary text-2xl">
                      {total.toLocaleString()}₽
                    </span>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-2 pt-4">
                    <Button
                      type="submit"
                      size="lg"
                      className="w-full bg-primary text-primary-foreground hover:bg-primary/90 font-bold"
                      disabled={loading}
                    >
                      {loading ? 'ОФОРМЛЯЕМ...' : 'ПОДТВЕРДИТЬ ЗАКАЗ'}
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      className="w-full font-bold sm:w-auto"
                      onClick={() => setIsCheckout(false)}
                    >
                      НАЗАД
                    </Button>
                  </div>
                </form>
              </div>
            </>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
};